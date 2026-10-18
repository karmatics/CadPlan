class CadPlanItemNotes {
  /**
   * Persistent IndexedDB & LocalStorage Item-Notes Engine for CadPlan.
   * Manages the Living Specification lifecycle: attaching thoughts to specific blocks,
   * touring notes sequentially, and compiling them into AI patch prompts.
   */
  static DB_NAME = 'CadPlan_ItemNotes_DB';
  static DB_VERSION = 1;
  static STORE_NAME = 'item_notes';
  static LOCAL_STORAGE_KEY = 'cadplan_item_notes_v1';
  static _subscribers = new Set();
  static _dbPromise = null;

  static async getDB() {
    if (this._dbPromise) return this._dbPromise;
    this._dbPromise = new Promise((resolve) => {
      if (typeof indexedDB === 'undefined') {
        resolve(null);
        return;
      }
      const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
          store.createIndex('blockKey', 'blockKey', { unique: false });
          store.createIndex('pageId', 'pageId', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => {
        console.warn('[CadPlanItemNotes] IndexedDB open error, falling back to localStorage');
        resolve(null);
      };
    });
    return this._dbPromise;
  }

  static getLocalMap() {
    try {
      const raw = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  static saveLocalMap(map) {
    try {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(map));
    } catch (e) {}
  }

  static async getAllNotes(dossierFilter = null) {
    const db = await this.getDB();
    let list = [];

    if (!db) {
      const map = this.getLocalMap();
      Object.values(map).forEach(notes => list.push(...notes));
    } else {
      list = await new Promise((resolve) => {
        const tx = db.transaction(this.STORE_NAME, 'readonly');
        const store = tx.objectStore(this.STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => {
          const map = this.getLocalMap();
          const fallback = [];
          Object.values(map).forEach(notes => fallback.push(...notes));
          resolve(fallback);
        };
      });
    }

    if (dossierFilter) {
      list = list.filter(n => !n.dossierId || n.dossierId === dossierFilter);
    }

    return list.sort((a, b) => a.timestamp - b.timestamp);
  }

  static async getNotesForBlock(pageId, blockId, dossierId = 'CadPlan') {
    const blockKey = `${pageId}:${blockId}`;
    const all = await this.getAllNotes(dossierId);
    return all.filter(n => n.blockKey === blockKey && (!n.dossierId || n.dossierId === dossierId));
  }
  static async getAnnotatedBlocks() {
    const all = await this.getAllNotes();
    const active = all.filter(n => n.status !== 'resolved');
    const seen = new Map();
    active.forEach(n => {
      if (!seen.has(n.blockKey)) {
        seen.set(n.blockKey, {
          blockKey: n.blockKey,
          pageId: n.pageId,
          blockId: n.blockId,
          notes: []
        });
      }
      seen.get(n.blockKey).notes.push(n);
    });
    return Array.from(seen.values());
  }

  static async addNote(pageId, blockId, text, options = {}) {
    if (!text || !text.trim()) return null;
    const dossierId = options.dossierId || 'CadPlan';
    const blockKey = `${pageId}:${blockId}`;
    const id = 'note_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();

    const entry = {
      id,
      blockKey,
      pageId,
      blockId,
      dossierId,
      text: text.trim(),
      timestamp: Date.now(),
      status: options.status || 'active', // 'active' | 'pending_cleanup' | 'accepted' | 'resolved'
      author: options.author || (options.isLLM ? 'LLM' : 'Author / Drafter'),
      isLLM: Boolean(options.isLLM || options.author === 'LLM'),
      type: options.type || (options.isLLM ? 'proposal' : 'note'), // 'note' | 'proposal' | 'patch' | 'critique'
      proposedPatch: options.proposedPatch || null,
      proposedText: options.proposedText || null,
      videoLink: options.videoLink || null,
      blockPreview: options.blockPreview || ''
    };

    const map = this.getLocalMap();
    const storageCompositeKey = `${dossierId}:${blockKey}`;
    map[storageCompositeKey] = map[storageCompositeKey] || [];
    map[storageCompositeKey].push(entry);
    this.saveLocalMap(map);

    const db = await this.getDB();
    if (db) {
      try {
        const tx = db.transaction(this.STORE_NAME, 'readwrite');
        tx.objectStore(this.STORE_NAME).put(entry);
      } catch (err) {}
    }

    this._notify();
    return entry;
  }
  static async updateNote(noteId, updates) {
    const all = await this.getAllNotes();
    const note = all.find(n => n.id === noteId);
    if (!note) return null;

    Object.assign(note, updates, { updatedTimestamp: Date.now() });

    const map = this.getLocalMap();
    if (map[note.blockKey]) {
      const idx = map[note.blockKey].findIndex(n => n.id === noteId);
      if (idx !== -1) map[note.blockKey][idx] = note;
      this.saveLocalMap(map);
    }

    const db = await this.getDB();
    if (db) {
      try {
        const tx = db.transaction(this.STORE_NAME, 'readwrite');
        tx.objectStore(this.STORE_NAME).put(note);
      } catch (err) {}
    }

    this._notify();
    return note;
  }

  static async deleteNote(noteId) {
    const all = await this.getAllNotes();
    const note = all.find(n => n.id === noteId);
    if (!note) return false;

    const map = this.getLocalMap();
    if (map[note.blockKey]) {
      map[note.blockKey] = map[note.blockKey].filter(n => n.id !== noteId);
      if (map[note.blockKey].length === 0) delete map[note.blockKey];
      this.saveLocalMap(map);
    }

    const db = await this.getDB();
    if (db) {
      try {
        const tx = db.transaction(this.STORE_NAME, 'readwrite');
        tx.objectStore(this.STORE_NAME).delete(noteId);
      } catch (err) {}
    }

    this._notify();
    return true;
  }

  static subscribe(fn) {
    this._subscribers.add(fn);
    return () => this._subscribers.delete(fn);
  }

  static _notify() {
    this._subscribers.forEach(fn => {
      try { fn(); } catch (e) {}
    });
  }

  static async buildNotesDirectivePrompt(docReader = null) {
      const dossierId = docReader?.options?.dossierId || docReader?.brandTitle || 'CadPlan';
      const all = await this.getAllNotes(dossierId);
      const active = all.filter(n => n.status !== 'resolved');
      if (active.length === 0) {
        return `# NO ACTIVE LIVING SPEC DIRECTIVES\nThere are currently no active author notes or revision directives attached in the living dossier [${dossierId}].`;
      }

      let out = `# 🎯 LIVING SPECIFICATION EVOLUTION: AUTHOR DIRECTIVES & COMPONENT NOTES\n`;
      out += `**Dossier:** ${dossierId} • **Generated:** ${new Date().toISOString()} • **Author/Inventor:** Rob Brown\n`;
      out += `**Active Directives:** ${active.length} notes across ${new Set(active.map(n => n.blockKey)).size} locations\n`;
      out += '**Execution Directive:** Incorporate the following author directives directly into the specified source files and class methods. Keep all existing verified mathematics, direction cosines, and repository connections fully intact.\n\n';
      out += '---\n\n';

      const grouped = {};
      active.forEach(n => {
        grouped[n.blockKey] = grouped[n.blockKey] || [];
        grouped[n.blockKey].push(n);
      });

      // Component Registry: Maps interactive blocks to their real standalone classes & files
      const componentClassMap = {
        comp_tentative_snapping_lab: { cls: 'TentativeSnappingLab', file: 'CadPlan/js/TentativeSnappingLab.js', desc: 'Interactive Snapping Lab (50ms chorded clicks & thick picking)' },
        comp_model_studio: { cls: 'CadModelStudioComponent', file: 'CadPlan/js/CadModelStudioComponent.js', desc: '3D Model Studio (PBR materials, GLB loading & face snapping [Q])' },
        comp_cad_studio_demo: { cls: 'CadStudioDemoComponent', file: 'CadPlan/js/CadStudioDemoComponent.js', desc: 'Production Studio (Live accuCad iframe & 3D parallax curves)' },
        comp_code_viewer: { cls: 'CadCodeViewerComponent', file: 'CadPlan/js/CadCodeViewerComponent.js', desc: 'Code Viewer & Rust Crate Hooks (PointInterceptor, wgpu_overlay, pointmod)' },
        comp_svg_smartline_lab: { cls: 'SvgSmartLineLab', file: 'CadPlan/js/SvgSmartLineLab.js', desc: 'Pure SVG SmartLine Lab (Continuous chaining, tangent arcs & DXF bulges)' },
        comp_animated_svg_compass: { cls: 'CadAnimatedSvgCompassLab', file: 'CadPlan/js/CadAnimatedSvgCompassLab.js', desc: 'Animated SVG Compass Lab (Superellipse morphing & Mini-Jack)' },
        comp_isolated_compass_3d: { cls: 'CadIsolatedCompass3DComponent', file: 'CadPlan/js/CadIsolatedCompass3DComponent.js', desc: 'Isolated 3D Compass Viewport (High-contrast direction cosines)' },
        comp_agent_telemetry_lab: { cls: 'CadAgentTelemetryLab', file: 'CadPlan/js/CadAgentTelemetryLab.js', desc: 'Autonomous AI Drafting Lab (MCP stream & relative vectors)' },
        comp_roundtrip_superpower: { cls: 'Cad2Dto3DRoundTripGraphic', file: 'CadPlan/js/Cad2Dto3DRoundTripGraphic.js', desc: '2D OCS to 3D WCS Round-Trip Engine (AutoCAD compatibility)' },
        comp_kch_interactive_lab: { cls: 'KeyCommandInteractiveLab', file: 'CadPlan/js/KeyCommandInteractiveLab.js', desc: 'Single-Stroke Key Command Engine Sandbox (No Enter key)' },
        comp_curve_drawer_lab: { cls: 'CurveDrawerLabComponent', file: 'CadPlan/js/CurveDrawerLabComponent.js', desc: 'On-Curve Spline Relaxation & Kinetic Tether Lab' },
        comp_number_stream_lab: { cls: 'AccuDrawNumberStreamLab', file: 'CadPlan/js/AccuDrawNumberStreamLab.js', desc: 'Numerical Command Stream & Decimal Parser' },
        comp_compass_anatomy: { cls: 'CompassAnatomyComponent', file: 'CadPlan/js/CompassAnatomyComponent.js', desc: 'The Squircle Compass Anatomical Deconstruction' },
        comp_master_showcase: { cls: 'CadMasterShowcaseComponent', file: 'CadPlan/js/CadMasterShowcaseComponent.js', desc: 'CadPlan Master Showcase & Dual-Audience Engine' },
        comp_touch_graphic: { cls: 'CadTouchP2PGraphicComponent', file: 'CadPlan/js/CadTouchP2PGraphicComponent.js', desc: 'Two-Handed CAD Architecture & TouchController Graphic' },
        comp_vision_hero: { cls: 'CadVisionHeroGraphic', file: 'CadPlan/js/CadVisionHeroGraphic.js', desc: 'The Expandable Dual-Mode CAD Engine Graphic' },
        comp_audience_migration: { cls: 'CadAudienceMigrationGraphic', file: 'CadPlan/js/CadAudienceMigrationGraphic.js', desc: 'Audience Capture & Vibe-Coding Flywheel Graphic' },
        comp_plugin_hooks: { cls: 'CadPluginHookSpecGraphic', file: 'CadPlan/js/CadPluginHookSpecGraphic.js', desc: 'The 3 Clean Upstream Hooks Plugin Spec Graphic' },
        comp_freedom_graphic: { cls: 'CadErgonomicFreedomGraphic', file: 'CadPlan/js/CadErgonomicFreedomGraphic.js', desc: 'Ergonomic Freedom & Composable Instruments Graphic' },
        comp_coordinate_converter: { cls: 'CadCoordinateConverterLab', file: 'CadPlan/js/CadCoordinateConverterLab.js', desc: 'Universal Arc & Coordinate Transformation Engine' },
        comp_runtime_matrix: { cls: 'CadRuntimeMatrixGraphic', file: 'CadPlan/js/CadRuntimeMatrixGraphic.js', desc: 'Execution Environment Matrix & Pipeline Decoupling' },
        comp_ecosystem_graphic: { cls: 'CadEcosystemGraphicComponent', file: 'CadPlan/js/CadEcosystemGraphicComponent.js', desc: 'Federated Multi-App Topology Map' },
        comp_architecture_graphic: { cls: 'CadArchitectureGraphicComponent', file: 'CadPlan/js/CadArchitectureGraphicComponent.js', desc: '4-Layer Headless Geometric Kernel Stack' },
        comp_origins_graphic: { cls: 'CadOriginsGraphicComponent', file: 'CadPlan/js/CadOriginsGraphicComponent.js', desc: '1995 Milestone & 3D Design Cube Graphic' }
      };

      // Chapter Document Class Map (for text paragraphs and sidebars)
      const pageClassMap = {
        meta: { cls: 'CadPlanMetaContent', file: 'CadPlan/js/CadPlanMetaContent.js' },
        origins: { cls: 'CadOriginsContent', file: 'CadPlan/js/CadOriginsContent.js' },
        philosophy: { cls: 'AccuDrawPhilosophyContent', file: 'CadPlan/js/AccuDrawPhilosophyContent.js' },
        accucad: { cls: 'AccuCadAuditContent', file: 'CadPlan/js/AccuCadAuditContent.js' },
        shortcuts: { cls: 'KeyCommandEngineContent', file: 'CadPlan/js/KeyCommandEngineContent.js' },
        curvedrawer: { cls: 'CadCurveDrawerContent', file: 'CadPlan/js/CadCurveDrawerContent.js' },
        touchp2p: { cls: 'CadTouchP2PContent', file: 'CadPlan/js/CadTouchP2PContent.js' },
        demos: { cls: 'CadInteractiveDemoContent', file: 'CadPlan/js/CadInteractiveDemoContent.js' },
        ecosystem: { cls: 'CadLunoEcosystemContent', file: 'CadPlan/js/CadLunoEcosystemContent.js' },
        architecture: { cls: 'CadArchitectureDecisionsContent', file: 'CadPlan/js/CadArchitectureDecisionsContent.js' },
        cadcraft: { cls: 'CadCraftIntegrationContent', file: 'CadPlan/js/CadCraftIntegrationContent.js' },
        itwin: { cls: 'CadITwinParityContent', file: 'CadPlan/js/CadITwinParityContent.js' },
        interview: { cls: 'CadVisionInterviewContent', file: 'CadPlan/js/CadVisionInterviewContent.js' }
      };

      let itemNumber = 1;

      for (const [key, notes] of Object.entries(grouped)) {
        const [pageId, blockId] = key.split(':');
        const isComponent = Boolean(componentClassMap[blockId] || blockId.startsWith('comp_'));

        let targetCls = '';
        let targetFile = '';
        let targetDesc = '';
        let previewText = '';

        if (isComponent && componentClassMap[blockId]) {
          targetCls = componentClassMap[blockId].cls;
          targetFile = componentClassMap[blockId].file;
          targetDesc = componentClassMap[blockId].desc;
        } else {
          const mapping = pageClassMap[pageId] || {
            cls: pageId.charAt(0).toUpperCase() + pageId.slice(1) + 'Content',
            file: `${dossierId}/js/${pageId.charAt(0).toUpperCase() + pageId.slice(1)}Content.js`
          };
          targetCls = mapping.cls;
          targetFile = mapping.file;

          const docCls = globalThis[targetCls];
          if (docCls && typeof docCls[blockId] === 'function') {
            const val = docCls[blockId]();
            previewText = Array.isArray(val) ? val.join('\n\n') : String(val);
          }
        }

        if (!previewText && notes[0]?.blockPreview) {
          previewText = notes[0].blockPreview;
        }

        out += `## ${itemNumber++}. Target: \`${targetCls}${isComponent ? '' : '.' + blockId}\`\n`;
        out += `**Target File:** \`${targetFile}\`\n`;
        if (targetDesc) out += `**Component Role:** *${targetDesc}*\n`;
        out += '\n';

        if (previewText) {
          out += '### Existing Context / Code Reference:\n';
          out += '> ' + previewText.replace(/\n+/g, '\n> ') + '\n\n';
        }

        out += '### Author Directives & Ideas (Attached During Document Review):\n';
        notes.sort((a, b) => a.timestamp - b.timestamp).forEach((note, idx) => {
          const timeStr = new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const cleanTag = note.status === 'pending_cleanup' ? ' `[🧹 MARKED FOR ARCHIVE]`' : '';
          out += `${idx + 1}. **(${timeStr})${cleanTag}:** ${note.text}\n`;
          if (note.videoLink) {
            out += `   - 📹 *Video Anchor:* \`${note.videoLink.videoId}\` @ **${note.videoLink.time}s** (${note.videoLink.label || 'Timestamp'})\n`;
          }
        });
        out += '\n';

        out += '### Expected Implementation Output Container:\n';
        out += '<' + `script data-file="${targetFile}" data-method="${targetCls}.${isComponent ? 'render' : blockId}" data-action="patch">\n`;
        out += `// Updated implementation incorporating author directives...\n`;
        out += '<' + '/script>\n\n';
        out += '---\n\n';
      }

      return out.trim();
    }
  static async openPromptBuilderDialog(docReader = null) {
    const hostContainer = document.body;
    const promptText = await this.buildNotesDirectivePrompt(docReader);
    const dossierId = docReader?.options?.dossierId || docReader?.brandTitle || 'CadPlan';
    const allNotes = await this.getAllNotes(dossierId);
    const activeNotes = allNotes.filter(n => n.status !== 'resolved');

    const wrap = makeElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        height: '100%',
        color: '#e2e8f0',
        fontFamily: 'var(--dr-font-sans, system-ui, sans-serif)'
      }
    });

    const topBar = makeElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 4px',
        borderBottom: '1px solid #232d3f',
        fontSize: '11.5px',
        fontFamily: 'monospace'
      }
    }, [
      makeElement('span', { style: { color: '#00f2fe', fontWeight: 'bold' } }, `⚡ Active Living Directives [${dossierId}]: ${activeNotes.length}`),
      makeElement('span', { style: { color: '#10b981' } }, 'Ready for Multi-Channel Compilation')
    ]);
    wrap.appendChild(topBar);

    const desc = makeElement('div', {
      style: {
        fontSize: '11px',
        color: '#94a3b8',
        lineHeight: '1.4',
        background: 'rgba(0, 242, 254, 0.05)',
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid rgba(0, 242, 254, 0.2)'
      }
    }, 'Packages all dictated notes and block contexts into a compilable payload. Push to Luno Outbox, write to disk directly via Node.js server save, or copy to clipboard.');
    wrap.appendChild(desc);

    const codeArea = makeElement('textarea', {
      style: {
        flex: 1,
        minHeight: '320px',
        background: '#090d16',
        color: '#7ee787',
        border: '1.5px solid #232d3f',
        borderRadius: '8px',
        padding: '12px',
        fontFamily: 'var(--dr-font-mono, monospace)',
        fontSize: '12px',
        lineHeight: '1.5',
        resize: 'vertical',
        outline: 'none',
        whiteSpace: 'pre'
      },
      readonly: true,
      spellcheck: false
    });
    codeArea.value = promptText;
    wrap.appendChild(codeArea);

    const footer = makeElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '8px',
        borderTop: '1px solid #232d3f',
        gap: '8px',
        flexWrap: 'wrap'
      }
    });

    const leftButtons = makeElement('div', { style: { display: 'flex', gap: '8px' } }, [
      makeElement('button', {
        className: 'dr-nav-btn',
        style: { color: '#f59e0b', borderColor: '#f59e0b66', fontSize: '11px' },
        onclick: async () => {
          if (confirm(`Archive/mark all ${activeNotes.length} active notes in [${dossierId}] as incorporated?`)) {
            for (const n of activeNotes) {
              await CadPlanItemNotes.updateNote(n.id, { status: 'resolved' });
            }
            alert(`✓ Directives for [${dossierId}] archived.`);
            dlg.close();
            if (docReader && typeof docReader._updateBlockNoteBadges === 'function') {
              docReader._updateBlockNoteBadges();
            }
          }
        }
      }, '🧹 Mark Incorporated')
    ]);

    const rightButtons = makeElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } }, [
      // 1. Push to Luno Outbox
      makeElement('button', {
        className: 'dr-nav-btn',
        style: { background: '#271052', color: '#d2a8ff', borderColor: '#8257e5', fontSize: '11px' },
        onclick: () => {
          if (typeof OutboxQueue !== 'undefined' && OutboxQueue.addBundle) {
            OutboxQueue.addBundle(`${dossierId} Living Spec Directives`, promptText, { priority: 'high' });
            alert(`✓ Dispatched evolution prompt to Luno Outbox for [${dossierId}]!`);
            dlg.close();
          } else {
            navigator.clipboard.writeText(promptText);
            alert('✓ Copied evolution prompt to clipboard!');
            dlg.close();
          }
        }
      }, '📤 Push to Outbox'),

      // 2. Direct In-Page / Server Save
      makeElement('button', {
        className: 'dr-nav-btn',
        style: { background: '#0a233a', color: '#38bdf8', borderColor: '#0284c7', fontSize: '11px' },
        onclick: async () => {
          const dumpPath = `PromptDumps/${dossierId}_EvolutionDirectives.md`;
          let savedSuccessfully = false;

          // Try direct Luno server save endpoint first
          try {
            const res = await fetch(`/api/save?project=${encodeURIComponent(dossierId)}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                files: [{ path: dumpPath, content: promptText }]
              })
            });
            const data = await res.json();
            if (data && data.success) {
              savedSuccessfully = true;
            }
          } catch (e) {}

          // Fallback to RunOnServerTools if available
          if (!savedSuccessfully && typeof RunOnServerTools !== 'undefined') {
            try {
              const rost = new RunOnServerTools();
              const serverCode = `
                const fs = require('fs');
                const path = require('path');
                const dumpDir = path.join(process.cwd(), 'PromptDumps');
                if (!fs.existsSync(dumpDir)) fs.mkdirSync(dumpDir, { recursive: true });
                fs.writeFileSync(path.join(process.cwd(), '${dumpPath}'), ${JSON.stringify(promptText)}, 'utf8');
                return { success: true };
              `;
              const rRes = await rost.executeServerScript(serverCode, dossierId);
              if (rRes && rRes.success) savedSuccessfully = true;
            } catch (e) {}
          }

          if (savedSuccessfully) {
            alert(`✓ Written directly to local disk at ${dumpPath}!`);
            dlg.close();
          } else {
            // Client-side file download fallback
            const blob = new Blob([promptText], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = makeElement('a', { href: url, download: `${dossierId}_Directives_${Date.now()}.md` });
            a.click();
            URL.revokeObjectURL(url);
            dlg.close();
          }
        }
      }, '⚡ Execute In-Page / Save Disk'),

      // 3. Copy to Clipboard
      makeElement('button', {
        className: 'dr-nav-btn primary',
        style: { fontWeight: 'bold' },
        onclick: (e) => {
          const btn = e.currentTarget;
          navigator.clipboard.writeText(promptText).then(() => {
            btn.textContent = '✓ Copied!';
            setTimeout(() => { btn.textContent = '📋 Copy Evolution Prompt'; }, 1800);
          });
        }
      }, '📋 Copy Evolution Prompt')
    ]);

    footer.appendChild(leftButtons);
    footer.appendChild(rightButtons);
    wrap.appendChild(footer);

    const dlg = UITools.makeDialog({
      title: `⚡ Living Specification Evolution Deck [${dossierId}]`,
      size: [660, 580],
      position: [Math.max(20, (window.innerWidth - 660) / 2), 50],
      contentElement: wrap,
      appendTo: hostContainer
    });

    return dlg;
  }

  static async openBlockNotesDialog(pageId, blockId, currentDoc, onUpdated, hostReader = null) {
    const dossierId = hostReader?.options?.dossierId || currentDoc?.name || 'CadPlan';
    const blockKey = `${pageId}:${blockId}`;
    const docName = currentDoc?.name || (typeof currentDoc === 'function' ? currentDoc.name : 'DocumentContent');
    const existing = await this.getNotesForBlock(pageId, blockId, dossierId);

    let excerpt = '';
    if (currentDoc && typeof currentDoc[blockId] === 'function') {
      const val = currentDoc[blockId]();
      excerpt = Array.isArray(val) ? val.join(' ') : String(val);
    }
    if (!excerpt && existing[0]?.blockPreview) {
      excerpt = existing[0].blockPreview;
    }
    if (excerpt.length > 160) excerpt = excerpt.substring(0, 160) + '...';

    const wrap = makeElement('div', {
      style: {
        display: 'flex', flexDirection: 'column', height: '100%',
        color: '#e2e8f0', fontFamily: 'var(--dr-font-sans, system-ui, sans-serif)', gap: '10px'
      }
    });

    // Top Navigation Bar
    const humanCount = existing.filter(n => !n.isLLM).length;
    const aiCount = existing.filter(n => n.isLLM).length;

    const topBar = makeElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingBottom: '8px', borderBottom: '1px solid #232d3f', fontSize: '11px', fontFamily: 'monospace'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' } }, [
        makeElement('span', { style: { color: '#00f2fe', fontWeight: 'bold' } }, `Target: ${docName}.${blockId}`),
        makeElement('span', { 
          style: { color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '1px 6px', borderRadius: '10px' } 
        }, `👤 ${humanCount} Note${humanCount === 1 ? '' : 's'}`),
        aiCount > 0 ? makeElement('span', { 
          style: { color: '#c084fc', background: 'rgba(168, 85, 247, 0.2)', padding: '1px 6px', borderRadius: '10px', border: '1px solid #c084fc66' } 
        }, `🤖 ${aiCount} AI Proposal${aiCount === 1 ? '' : 's'}`) : null
      ]),
      makeElement('span', { style: { color: '#64748b', fontSize: '10px' } }, `[${dossierId}]`)
    ]);
    wrap.appendChild(topBar);

    if (excerpt) {
      wrap.appendChild(makeElement('div', {
        style: {
          background: 'rgba(0, 242, 254, 0.04)', borderLeft: '3px solid #00f2fe',
          padding: '6px 10px', fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', borderRadius: '4px'
        }
      }, `"${excerpt}"`));
    }

    // Conversation Thread List
    const threadList = makeElement('div', {
      id: 'item-notes-thread-list',
      style: {
        flex: 1, minHeight: '160px', maxHeight: '240px', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px'
      }
    });
    wrap.appendChild(threadList);

    const renderThread = async () => {
      threadList.innerHTML = '';
      const notes = await CadPlanItemNotes.getNotesForBlock(pageId, blockId, dossierId);

      if (notes.length === 0) {
        threadList.appendChild(makeElement('div', {
          style: { padding: '20px 10px', textAlign: 'center', color: '#64748b', fontStyle: 'italic', fontSize: '11.5px' }
        }, 'No notes attached to this block yet. Dictate a thought below, or request an AI revision proposal.'));
        return;
      }

      notes.forEach((note, idx) => {
        const timeStr = new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const isLLM = Boolean(note.isLLM || note.author === 'LLM');
        const isCleanup = note.status === 'pending_cleanup';

        const borderCol = isLLM ? '#a855f7' : (isCleanup ? '#f59e0b' : '#1e293b');
        const bgCol = isLLM ? 'rgba(168, 85, 247, 0.08)' : (isCleanup ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255, 255, 255, 0.03)');

        const itemBox = makeElement('div', {
          style: {
            background: bgCol,
            border: `1px solid ${borderCol}`,
            borderLeft: `4px solid ${isLLM ? '#c084fc' : (isCleanup ? '#f59e0b' : '#38bdf8')}`,
            borderRadius: '6px', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '4px'
          }
        }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
            makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [
              makeElement('span', { 
                style: { 
                  fontSize: '9.5px', fontWeight: 'bold', textTransform: 'uppercase',
                  color: isLLM ? '#c084fc' : '#38bdf8' 
                } 
              }, isLLM ? '🤖 AI Staged Proposal' : `👤 ${note.author}`),
              makeElement('span', { style: { fontSize: '9px', color: '#64748b' } }, `• ${timeStr}`)
            ]),
            makeElement('div', { style: { display: 'flex', gap: '4px', alignItems: 'center' } }, [
              // If proposal has text/patch, allow live testing in memory
              isLLM ? makeElement('button', {
                className: 'dr-nav-btn',
                style: { padding: '1px 6px', fontSize: '9.5px', color: '#38bdf8', borderColor: '#38bdf866' },
                title: 'Test this proposal live in browser memory right now',
                onclick: () => {
                  if (typeof CadPlanDocumentEditor !== 'undefined' && CadPlanDocumentEditor.saveOverride) {
                    CadPlanDocumentEditor.saveOverride(pageId, blockId, note.text, docName, dossierId);
                    if (onUpdated) onUpdated();
                    alert(`✓ Staged proposal applied live in browser memory! Check block #${blockId}.`);
                  }
                }
              }, '👁️ Test In-Memory') : null,

              makeElement('button', {
                className: 'dr-nav-btn',
                style: { padding: '1px 5px', fontSize: '9.5px', color: '#ef4444' },
                title: 'Delete note from IndexedDB',
                onclick: async () => {
                  if (confirm('Delete this note?')) {
                    await CadPlanItemNotes.deleteNote(note.id);
                    renderThread();
                    if (onUpdated) onUpdated();
                  }
                }
              }, '✕')
            ])
          ]),
          makeElement('div', { style: { fontSize: '11.5px', color: '#f8fafc', lineHeight: '1.45', whiteSpace: 'pre-wrap' } }, note.text)
        ]);

        if (note.videoLink) {
          itemBox.appendChild(makeElement('div', {
            style: { fontSize: '10px', color: '#38bdf8', marginTop: '2px' }
          }, `📹 Anchor: ${note.videoLink.label || note.videoLink.videoId} @ ${note.videoLink.time}s`));
        }

        threadList.appendChild(itemBox);
      });
    };

    await renderThread();

    // Bottom Input Area (DictationWidget or Text Input)
    const dictationMount = makeElement('div', {
      style: { minHeight: '110px', display: 'flex', flexDirection: 'column' }
    });
    wrap.appendChild(dictationMount);

    let dictationWidget = null;
    if (typeof DictationWidget !== 'undefined') {
      dictationWidget = new DictationWidget({
        compact: true,
        placeholder: '🎙️ Dictate directive, or type instruction for this block...'
      });
      dictationMount.appendChild(dictationWidget.getElement());
    } else {
      const textarea = makeElement('textarea', {
        id: 'append-item-note-textarea',
        placeholder: 'Type directive or staging note for this block...',
        style: {
          width: '100%', minHeight: '90px', background: '#090d16', color: '#f8fafc',
          border: '1px solid #232d3f', borderRadius: '6px', padding: '8px',
          fontFamily: 'var(--dr-font-sans)', fontSize: '12px', outline: 'none'
        }
      });
      dictationMount.appendChild(textarea);
    }

    // Footer Actions Bar
    const footer = makeElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: '6px', borderTop: '1px solid #232d3f', gap: '8px', flexWrap: 'wrap'
      }
    });

    const authorSelect = makeElement('select', {
      style: { background: '#070a13', color: '#e2e8f0', border: '1px solid #30363d', borderRadius: '4px', padding: '3px 6px', fontSize: '10.5px' }
    }, [
      makeElement('option', { value: 'Author' }, '👤 Author Note'),
      makeElement('option', { value: 'LLM' }, '🤖 AI Staged Proposal')
    ]);

    const leftControls = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
      authorSelect,
      makeElement('button', {
        className: 'dr-nav-btn',
        style: { padding: '3px 8px', fontSize: '10px', color: '#a855f7', borderColor: '#a855f766' },
        title: 'Queue a prompt asking AI to draft an improvement for this block',
        onclick: () => {
          const promptForAI = `Please review paragraph #${blockId} in [${dossierId}]:\n\n"${excerpt}"\n\nDraft an improved, more articulate version and provide it as an AI proposal.`;
          if (navigator.clipboard) {
            navigator.clipboard.writeText(promptForAI);
            alert('✓ Copied block revision prompt to clipboard! Paste it to your LLM.');
          }
        }
      }, '🤖 Ask AI')
    ]);

    const rightControls = makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
      makeElement('button', {
        className: 'dr-nav-btn',
        onclick: () => dlg.close()
      }, 'Close'),

      makeElement('button', {
        className: 'dr-nav-btn primary',
        style: { fontWeight: 'bold' },
        onclick: async () => {
          let txt = '';
          if (dictationWidget) {
            txt = dictationWidget.getText().trim();
          } else {
            const ta = document.getElementById('append-item-note-textarea');
            txt = ta ? ta.value.trim() : '';
          }

          if (!txt) {
            alert('Please dictate or type a note before appending.');
            return;
          }

          const isLLM = authorSelect.value === 'LLM';
          await CadPlanItemNotes.addNote(pageId, blockId, txt, {
            dossierId,
            isLLM,
            author: isLLM ? 'LLM' : 'Author',
            type: isLLM ? 'proposal' : 'note',
            blockPreview: excerpt
          });

          if (dictationWidget) dictationWidget.clearContent();
          else {
            const ta = document.getElementById('append-item-note-textarea');
            if (ta) ta.value = '';
          }

          await renderThread();
          if (onUpdated) onUpdated();
        }
      }, '💾 + Append')
    ]);

    footer.appendChild(leftControls);
    footer.appendChild(rightControls);
    wrap.appendChild(footer);

    const dlg = UITools.makeDialog({
      title: `📝 Block Directives & Staged Memory [${dossierId}]`,
      size: [580, 560],
      position: [Math.max(20, (window.innerWidth - 580) / 2), 50],
      contentElement: wrap,
      appendTo: document.body,
      onClose: () => {
        if (dictationWidget && typeof dictationWidget.destroy === 'function') {
          dictationWidget.destroy();
        }
      }
    });

    return dlg;
  }
  static async addAIProposal(pageId, blockId, proposalText, options = {}) {
    return await this.addNote(pageId, blockId, proposalText, {
      ...options,
      author: 'LLM',
      isLLM: true,
      type: options.type || 'proposal',
      status: 'active'
    });
  }

  static async compactDossier(dossierId, options = {}) {
    const all = await this.getAllNotes(dossierId);
    const active = all.filter(n => n.status !== 'resolved');
    if (active.length === 0) {
      return { success: true, count: 0, message: 'No active notes or proposals to compact.' };
    }

    // 1. Generate consolidated surgical method patch bundle
    const patchBundle = await this.buildNotesDirectivePrompt({ options: { dossierId } });

    // 2. If direct server write is requested/available, write to local file
    let wroteToDisk = false;
    if (!options.dryRun) {
      try {
        const dumpPath = `PromptDumps/${dossierId}_CompactedBundle.md`;
        const res = await fetch(`/api/save?project=${encodeURIComponent(dossierId)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            files: [{ path: dumpPath, content: patchBundle }]
          })
        });
        const data = await res.json();
        if (data && data.success) {
          wroteToDisk = true;
        }
      } catch (e) {}

      // 3. Mark compacted notes as resolved in IndexedDB
      for (const note of active) {
        await this.updateNote(note.id, { 
          status: 'resolved', 
          compactedTimestamp: Date.now() 
        });
      }
    }

    this._notify();
    return {
      success: true,
      compactedCount: active.length,
      wroteToDisk,
      patchBundle
    };
  }

  static createNoteTrigger(pageId, blockId, componentName = '', label = '📝 Note') {
      const btn = document.createElement('button');
      btn.className = 'dr-nav-btn';
      btn.style.cssText = 'padding: 3px 8px; font-size: 10px; font-weight: bold; font-family: monospace; color: #38bdf8; border-color: rgba(56, 189, 248, 0.4); background: rgba(56, 189, 248, 0.08); border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;';
      btn.title = `Add a note to ${componentName || blockId}`;
      btn.innerHTML = `<span>${label}</span>`;

      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const docCls = globalThis[componentName] || { name: componentName || blockId };
        CadPlanItemNotes.openBlockNotesDialog(pageId, blockId, docCls, () => {
          CadPlanItemNotes._notify();
        });
      };

      return btn;
    }
}

globalThis.CadPlanItemNotes = CadPlanItemNotes;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlanItemNotes;