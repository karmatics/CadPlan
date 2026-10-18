class CadPlanDocumentEditor {
  /**
   * In-Situ Document Editing & Disk Compilation Engine for CadPlan.
   * Stores paragraph/section overrides in IndexedDB/localStorage,
   * badges edited blocks in the DocumentReader, and compiles edits into
   * surgical method patches (<script data-file="..." data-method="..." data-action="patch">)
   * that write directly to local disk or copy into prompt bundles.
   */
  static DB_NAME = 'CadPlan_DocumentEdits_DB';
  static STORE_NAME = 'block_edits';
  static LOCAL_STORAGE_KEY = 'cadplan_document_block_overrides';

  static getOverridesMap() {
    try {
      const raw = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  static getOverride(pageId, blockId) {
    const map = this.getOverridesMap();
    const key = `${pageId}:${blockId}`;
    return map[key] || null;
  }

  static saveOverride(pageId, blockId, text, docClassName = null) {
    const map = this.getOverridesMap();
    const key = `${pageId}:${blockId}`;
    map[key] = {
      pageId,
      blockId,
      docClassName: docClassName || (globalThis[pageId] ? globalThis[pageId].name : null),
      text,
      timestamp: Date.now()
    };
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(map));
  }

  static removeOverride(pageId, blockId) {
    const map = this.getOverridesMap();
    const key = `${pageId}:${blockId}`;
    delete map[key];
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(map));
  }

  static clearAllOverrides() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }

  /**
   * Compiles all customized blocks across all chapters into Luno HTML Surgical Method Patches.
   */
  static generateSurgicalPatches() {
    const map = this.getOverridesMap();
    const keys = Object.keys(map);
    if (keys.length === 0) return '';

    let patchBundle = '';
    const classMethodMap = {};

    keys.forEach(key => {
      const item = map[key];
      // Resolve class name
      let className = item.docClassName;
      if (!className) {
        // Derive from pageId
        const pageClassNames = {
          meta: 'CadPlanMetaContent',
          origins: 'CadOriginsContent',
          philosophy: 'AccuDrawPhilosophyContent',
          accucad: 'AccuCadAuditContent',
          shortcuts: 'KeyCommandEngineContent',
          curvedrawer: 'CadCurveDrawerContent',
          touchp2p: 'CadTouchP2PContent',
          demos: 'CadInteractiveDemoContent',
          ecosystem: 'CadLunoEcosystemContent',
          architecture: 'CadArchitectureDecisionsContent',
          cadcraft: 'CadCraftIntegrationContent',
          itwin: 'CadITwinParityContent',
          interview: 'CadVisionInterviewContent'
        };
        className = pageClassNames[item.pageId] || 'CadPlanContent';
      }

      classMethodMap[className] = classMethodMap[className] || [];
      classMethodMap[className].push(item);
    });

    for (const [clsName, items] of Object.entries(classMethodMap)) {
      items.forEach(item => {
        const filePath = `CadPlan/js/${clsName}.js`;
        const methodSignature = `${clsName}.${item.blockId}`;
        const escapedText = JSON.stringify(item.text);

        patchBundle += `<` + `script data-file="${filePath}" data-method="${methodSignature}" data-action="patch">\n`;
        patchBundle += `  static ${item.blockId}() {\n`;
        patchBundle += `    return [\n`;
        patchBundle += `      ${escapedText}\n`;
        patchBundle += `    ];\n`;
        patchBundle += `  }\n`;
        patchBundle += `<` + `/script>\n\n`;
      });
    }

    return patchBundle.trim();
  }

  /**
   * Opens the in-situ block editor modal for a specific paragraph.
   */
  static openBlockEditor(pageId, blockId, currentDoc, onSaved) {
    const hostContainer = document.body;
    const docName = currentDoc?.name || (typeof currentDoc === 'function' ? currentDoc.name : 'DocumentContent');
    const existingOverride = this.getOverride(pageId, blockId);

    // Get source text
    let originalText = '';
    if (currentDoc && typeof currentDoc[blockId] === 'function') {
      const variants = currentDoc[blockId]();
      originalText = Array.isArray(variants) ? variants[0] : String(variants);
    }

    const initialVal = existingOverride ? existingOverride.text : originalText;

    const wrap = makeElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
        color: '#e2e8f0',
        fontFamily: 'var(--dr-font-sans)'
      }
    });

    const header = makeElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 4px',
        borderBottom: '1px solid #232d3f',
        fontSize: '11px',
        color: '#94a3b8'
      }
    }, [
      makeElement('div', {}, [
        makeElement('span', { style: { color: '#38bdf8', fontWeight: 'bold' } }, `${docName}.${blockId}()`),
        existingOverride ? makeElement('span', { style: { color: '#f59e0b', marginLeft: '6px', fontWeight: 'bold' } }, '[Custom Revision Active]') : null
      ]),
      makeElement('span', { id: 'block-editor-char-count' }, `${initialVal.length} chars`)
    ]);
    wrap.appendChild(header);

    const textarea = makeElement('textarea', {
      style: {
        flex: 1,
        minHeight: '260px',
        background: '#090d16',
        color: '#f8fafc',
        border: '1.5px solid #232d3f',
        borderRadius: '8px',
        padding: '12px',
        fontFamily: 'var(--dr-font-body)',
        fontSize: '14px',
        lineHeight: '1.6',
        resize: 'none',
        outline: 'none'
      }
    });
    textarea.value = initialVal;
    textarea.oninput = (e) => {
      const countEl = document.getElementById('block-editor-char-count');
      if (countEl) countEl.textContent = `${e.target.value.length} chars`;
    };
    wrap.appendChild(textarea);

    const footer = makeElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '6px',
        borderTop: '1px solid #232d3f',
        gap: '8px',
        flexWrap: 'wrap'
      }
    });

    const leftGroup = makeElement('div', { style: { display: 'flex', gap: '6px' } });
    if (existingOverride) {
      const btnRevert = makeElement('button', {
        className: 'dr-nav-btn',
        style: { color: '#ef4444', borderColor: '#ef444466', fontSize: '11px' },
        onclick: () => {
          if (confirm('Revert this paragraph back to original source code?')) {
            this.removeOverride(pageId, blockId);
            if (onSaved) onSaved();
            dlg.close();
          }
        }
      }, '↺ Revert to Source');
      leftGroup.appendChild(btnRevert);
    }
    footer.appendChild(leftGroup);

    const rightGroup = makeElement('div', { style: { display: 'flex', gap: '8px' } }, [
      makeElement('button', {
        className: 'dr-nav-btn',
        onclick: () => dlg.close()
      }, 'Cancel'),

      makeElement('button', {
        className: 'dr-nav-btn primary',
        onclick: () => {
          const newText = textarea.value.trim();
          this.saveOverride(pageId, blockId, newText, docName);
          if (onSaved) onSaved();
          dlg.close();
        }
      }, '✓ Save Revision')
    ]);
    footer.appendChild(rightGroup);
    wrap.appendChild(footer);

    const dlg = UITools.makeDialog({
      title: '✏️ In-Situ Paragraph Editor',
      size: [560, 440],
      position: [Math.max(20, (window.innerWidth - 560) / 2), 70],
      contentElement: wrap,
      appendTo: hostContainer
    });

    return dlg;
  }

  /**
   * Opens the Document Revision Manager dialog listing all edits across all chapters,
   * allowing one-click compilation and disk saving.
   */
  static openRevisionManager(onUpdated) {
    const hostContainer = document.body;
    const map = this.getOverridesMap();
    const keys = Object.keys(map);

    const wrap = makeElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        height: '100%',
        color: '#e2e8f0',
        fontFamily: 'var(--dr-font-sans)'
      }
    });

    const header = makeElement('div', {
      style: {
        padding: '6px 4px',
        borderBottom: '1px solid #232d3f',
        fontSize: '12px',
        color: '#94a3b8',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, [
      makeElement('span', {}, `Customized Paragraphs & Revisions: ${keys.length}`),
      makeElement('span', { style: { color: '#10b981', fontWeight: 'bold' } }, 'Ready to Compile')
    ]);
    wrap.appendChild(header);

    const listContainer = makeElement('div', {
      style: {
        flex: 1,
        minHeight: '260px',
        maxHeight: '380px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }
    });

    if (keys.length === 0) {
      listContainer.appendChild(makeElement('div', {
        style: { padding: '24px', textAlign: 'center', color: '#64748b', fontStyle: 'italic', fontSize: '12px' }
      }, 'No custom revisions active. Click the pencil icon on any paragraph to edit in-situ.'));
    } else {
      keys.forEach(k => {
        const item = map[k];
        const card = makeElement('div', {
          style: {
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid #1e293b',
            borderRadius: '6px',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }
        }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
            makeElement('strong', { style: { fontSize: '12px', color: '#38bdf8', fontFamily: 'monospace' } }, `${item.pageId} / ${item.blockId}`),
            makeElement('button', {
              className: 'dr-nav-btn',
              style: { padding: '2px 6px', fontSize: '10px', color: '#ef4444' },
              onclick: () => {
                this.removeOverride(item.pageId, item.blockId);
                if (onUpdated) onUpdated();
                dlg.close();
                CadPlanDocumentEditor.openRevisionManager(onUpdated);
              }
            }, 'Remove')
          ]),
          makeElement('div', {
            style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
          }, item.text)
        ]);
        listContainer.appendChild(card);
      });
    }
    wrap.appendChild(listContainer);

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
    }, [
      makeElement('button', {
        className: 'dr-nav-btn',
        style: { color: '#f59e0b', fontSize: '11px' },
        onclick: (e) => {
          const btn = e.currentTarget;
          const patches = this.generateSurgicalPatches();
          if (!patches) {
            alert('No active revisions to compile.');
            return;
          }
          navigator.clipboard.writeText(patches).then(() => {
            const orig = btn.textContent;
            btn.textContent = '✓ Copied Patches!';
            setTimeout(() => { btn.textContent = orig; }, 1800);
          });
        }
      }, '📋 Copy Surgical Patches'),

      makeElement('div', { style: { display: 'flex', gap: '8px' } }, [
        makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { fontWeight: 'bold' },
          onclick: async () => {
            const patches = this.generateSurgicalPatches();
            if (!patches) {
              alert('No active revisions to compile.');
              return;
            }

            // If Luno client parser is active, push directly to Outbox or trigger server execution
            if (typeof OutboxQueue !== 'undefined' && OutboxQueue.addBundle) {
              OutboxQueue.addBundle('CadPlan In-Situ Revisions', patches, { priority: 'high' });
              alert('✓ Compiled revisions dispatched directly to Luno Outbox!');
            } else {
              navigator.clipboard.writeText(patches);
              alert('✓ Compiled revisions generated as surgical patches and copied to clipboard!');
            }
            dlg.close();
          }
        }, '💾 Compile & Save Changes')
      ])
    ]);
    wrap.appendChild(footer);

    const dlg = UITools.makeDialog({
      title: '📑 CadPlan Document Revision Manager',
      size: [580, 500],
      position: [Math.max(20, (window.innerWidth - 580) / 2), 70],
      contentElement: wrap,
      appendTo: hostContainer
    });

    return dlg;
  }
}

globalThis.CadPlanDocumentEditor = CadPlanDocumentEditor;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlanDocumentEditor;