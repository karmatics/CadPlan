class CadPromptBundlerDialog {

  static open(baseController = null) {
        const hostContainer = document.body;

        const content = makeElement('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            color: '#c9d1d9',
            fontFamily: 'system-ui, -apple-system, monospace',
            fontSize: '12px'
          }
        });

        // Preset Selector
        const presetRow = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } }, [
          makeElement('label', { style: { fontWeight: 'bold', color: '#00f2fe' } }, '🎯 Context Granularity & Starter Prompt Preset:'),
          makeElement('select', {
            id: 'cp-bundle-preset',
            style: {
              background: '#0d1117',
              color: '#f0f6fc',
              border: '1px solid #30363d',
              padding: '6px 8px',
              borderRadius: '6px',
              fontFamily: 'monospace'
            },
            onchange: (e) => {
              CadPromptBundlerDialog._applyPreset(e.target.value);
            }
          }, [
            makeElement('option', { value: 'starter' }, '🌱 Starter Prompt (Seeding Next-Level Sub-Task Threads • ~16.5k tokens)'),
            makeElement('option', { value: 'full', selected: true }, '📚 Full Master System Dossier (All Chapters • ~95k tokens)'),
            makeElement('option', { value: 'cadcraft_spec' }, '🦀 Deep CADCraft Rust, Wasm & wgpu Spec (~45k tokens)'),
            makeElement('option', { value: 'spec' }, '📐 Core Geometry & Constraint Spec (~28k tokens)'),
            makeElement('option', { value: 'lean' }, '⚡ Lean Executive Summary & Directives (~5.5k tokens)'),
            makeElement('option', { value: 'code' }, '💻 Deep Technical Bundle with Source Code Embeds (~125k+ tokens)')
          ])
        ]);
        content.appendChild(presetRow);

        // Section Checklist
        const checkGrid = makeElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            background: '#070a13',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #21262d',
            maxHeight: '380px',
            overflowY: 'auto'
          }
        });

        const options = [
          { id: 'opt_meta', label: '0. Living Dossier & Methodology', default: true },
          { id: 'opt_origins', label: '1. Rob Brown Story & Playbook', default: true },
          { id: 'opt_philosophy', label: '2. AccuDraw / CompassDraw Math', default: true },
          { id: 'opt_accucad', label: '3. accuCad Architecture Audit', default: true },
          { id: 'opt_shortcuts', label: '4. Key Command Engine (& Syntax)', default: true },
          { id: 'opt_curvetouch', label: '5. On-Curve Drafting & Touch', default: true },
          { id: 'opt_touch_webrtc', label: '6. P2P TouchController Protocol', default: true },
          { id: 'opt_ecosystem', label: '7. Luno Loop & Container Protocol', default: true },
          { id: 'opt_architecture', label: '8. 4-Layer Headless Kernel', default: true },
          { id: 'opt_cadcraft', label: '9. CADCraft Rust Crate Topology', default: true },
          { id: 'opt_cadcraft_store', label: '• EntityStore CoW & Handles', default: true },
          { id: 'opt_cadcraft_osmode', label: '• 14-Bit OSMODE & Anchors', default: true },
          { id: 'opt_cadcraft_render', label: '• cadcraft-render (wgpu)', default: true },
          { id: 'opt_cadcraft_plinem', label: '• PlineM & Mat4::ocs 3D Plane', default: true },
          { id: 'opt_cadcraft_accept', label: '• Accept::POINT State Loop', default: true },
          { id: 'opt_cadcraft_lisp', label: '• Pure-Rust AutoLISP Engine', default: true },
          { id: 'opt_cadcraft_bulge', label: '• Bulge Arc Factor tan(θ/4)', default: true },
          { id: 'opt_cadcraft_constraints', label: '• Parametric Taxonomy (GC / DC)', default: true },
          { id: 'opt_itwin', label: '10. iTwin Parity & SmartLine Spec', default: true },
          { id: 'opt_itwin_snap', label: '• AccuSnap.ts testHit & Latch', default: true },
          { id: 'opt_itwin_contrast', label: '• Adaptive Contrast Luminance', default: true },
          { id: 'opt_itwin_history', label: '• Value History Cycling', default: true },
          { id: 'opt_itwin_tool', label: '• AccuDrawTool.ts Actions', default: true },
          { id: 'opt_plane_math', label: '• Hard vs. Soft Construction Planes', default: true },
          { id: 'opt_smart_keyin', label: '• SmartKeyin Sign Inference', default: true },
          { id: 'opt_itwin_hints', label: '• AccuDrawHintBuilder Protocol', default: true },
          { id: 'opt_fillet_math', label: '• Newton Fillet vs. 3D Bisector', default: true },
          { id: 'opt_mcp_spec', label: '• MCP Autonomous Agent Tools', default: true },
          { id: 'opt_interview', label: "11. Inventor's Vision & Roadmap", default: true },
          { id: 'opt_embed_source', label: '📦 Embed Raw Source Code Methods', default: false }
        ];

        options.forEach(opt => {
          const chk = makeElement('input', {
            type: 'checkbox',
            id: opt.id,
            checked: opt.default,
            style: { accentColor: '#00f2fe', cursor: 'pointer' }
          });
          const lbl = makeElement('label', {
            htmlFor: opt.id,
            style: {
              cursor: 'pointer',
              fontSize: '11px',
              color: opt.id === 'opt_embed_source' ? '#e3b341' : (opt.id === 'opt_interview' || opt.id === 'opt_meta' ? '#00f2fe' : (opt.id.startsWith('opt_cadcraft_') || opt.id.startsWith('opt_itwin_') ? '#7ee787' : '#c9d1d9'))
            }
          }, opt.label);

          checkGrid.appendChild(makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [chk, lbl]));
        });

        content.appendChild(checkGrid);

        const statsBox = makeElement('div', {
          id: 'cp-bundle-stats',
          style: { fontSize: '11px', color: '#8b949e', fontStyle: 'italic', textAlign: 'right' }
        }, 'Estimated payload: ~95,000 tokens • Complete System Context');
        content.appendChild(statsBox);

        const btnRow = makeElement('div', {
          style: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }
        }, [
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '6px 12px', background: '#271052', color: '#d2a8ff', borderColor: '#8257e5' },
            onclick: () => {
              const text = CadPromptBundlerDialog._generateMarkdownBundle();
              if (typeof OutboxQueue !== 'undefined' && OutboxQueue.addBundle) {
                OutboxQueue.addBundle('CadPlan Master Specification Bundle', text, { priority: 'high' });
                alert('Pushed bundle directly to Luno Outbox!');
                dlg.close();
              } else {
                CadPromptBundlerDialog._copyText(text);
                dlg.close();
              }
            }
          }, '📤 Send to Outbox'),
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '6px 14px', background: '#238636', color: '#fff', fontWeight: 'bold' },
            onclick: () => {
              const text = CadPromptBundlerDialog._generateMarkdownBundle();
              CadPromptBundlerDialog._copyText(text);
              dlg.close();
            }
          }, '📋 Copy Configured Markdown')
        ]);
        content.appendChild(btnRow);

        const dlg = UITools.makeDialog({
          title: '📋 Configure CadPlan Agentic Specification & Starter Prompt Bundle',
          size: [640, 720],
          position: [Math.max(20, (window.innerWidth - 640) / 2), Math.max(10, (window.innerHeight - 720) / 2)],
          contentElement: content,
          appendTo: hostContainer
        });
      }
  static _applyPreset(preset) {
        const setChecked = (id, val) => {
          const el = document.getElementById(id);
          if (el) el.checked = val;
        };

        if (preset === 'starter') {
          // Recursive Sub-Task Starter Prompt Preset
          setChecked('opt_meta', true);
          setChecked('opt_origins', true);
          setChecked('opt_philosophy', true);
          setChecked('opt_accucad', false);
          setChecked('opt_shortcuts', true);
          setChecked('opt_curvetouch', false);
          setChecked('opt_touch_webrtc', false);
          setChecked('opt_ecosystem', true);
          setChecked('opt_architecture', true);
          setChecked('opt_cadcraft', true);
          setChecked('opt_itwin', true);
          setChecked('opt_cadcraft_store', false);
          setChecked('opt_cadcraft_osmode', false);
          setChecked('opt_cadcraft_render', false);
          setChecked('opt_cadcraft_plinem', true);
          setChecked('opt_cadcraft_accept', true);
          setChecked('opt_cadcraft_lisp', false);
          setChecked('opt_cadcraft_bulge', true);
          setChecked('opt_cadcraft_constraints', false);
          setChecked('opt_itwin_snap', false);
          setChecked('opt_itwin_contrast', false);
          setChecked('opt_itwin_history', false);
          setChecked('opt_itwin_tool', false);
          setChecked('opt_plane_math', true);
          setChecked('opt_smart_keyin', true);
          setChecked('opt_itwin_hints', true);
          setChecked('opt_fillet_math', true);
          setChecked('opt_mcp_spec', true);
          setChecked('opt_interview', true);
          setChecked('opt_embed_source', false);
          document.getElementById('cp-bundle-stats').textContent = 'Estimated payload: ~16,500 tokens (🌱 Recursive Starter Prompt for Sub-Task Threads)';
        } else if (preset === 'lean') {
          setChecked('opt_meta', true);
          setChecked('opt_origins', true);
          setChecked('opt_philosophy', false);
          setChecked('opt_accucad', false);
          setChecked('opt_shortcuts', false);
          setChecked('opt_curvetouch', false);
          setChecked('opt_touch_webrtc', false);
          setChecked('opt_ecosystem', true);
          setChecked('opt_architecture', true);
          setChecked('opt_cadcraft', true);
          setChecked('opt_itwin', false);
          setChecked('opt_embed_source', false);
          document.getElementById('cp-bundle-stats').textContent = 'Estimated payload: ~5,500 tokens (Lean Executive Briefing)';
        } else if (preset === 'spec') {
          setChecked('opt_meta', true);
          setChecked('opt_origins', true);
          setChecked('opt_philosophy', true);
          setChecked('opt_accucad', true);
          setChecked('opt_shortcuts', true);
          setChecked('opt_curvetouch', true);
          setChecked('opt_touch_webrtc', true);
          setChecked('opt_ecosystem', false);
          setChecked('opt_architecture', true);
          setChecked('opt_cadcraft', true);
          setChecked('opt_itwin', true);
          setChecked('opt_embed_source', false);
          document.getElementById('cp-bundle-stats').textContent = 'Estimated payload: ~28,000 tokens (Core Geometry Spec)';
        } else if (preset === 'cadcraft_spec') {
          setChecked('opt_meta', true);
          setChecked('opt_origins', true);
          setChecked('opt_philosophy', true);
          setChecked('opt_accucad', false);
          setChecked('opt_shortcuts', false);
          setChecked('opt_curvetouch', false);
          setChecked('opt_touch_webrtc', true);
          setChecked('opt_ecosystem', false);
          setChecked('opt_architecture', true);
          setChecked('opt_cadcraft', true);
          setChecked('opt_itwin', true);
          setChecked('opt_embed_source', false);
          document.getElementById('cp-bundle-stats').textContent = 'Estimated payload: ~45,000 tokens (Deep CADCraft Rust & iTwin Parity Focus)';
        } else if (preset === 'full') {
          const checkboxes = document.querySelectorAll('#cp-bundle-preset ~ div input[type="checkbox"]');
          checkboxes.forEach(cb => {
            if (cb.id !== 'opt_embed_source') cb.checked = true;
          });
          setChecked('opt_embed_source', false);
          document.getElementById('cp-bundle-stats').textContent = 'Estimated payload: ~95,000 tokens (Full Master Living Dossier)';
        } else if (preset === 'code') {
          const checkboxes = document.querySelectorAll('#cp-bundle-preset ~ div input[type="checkbox"]');
          checkboxes.forEach(cb => cb.checked = true);
          document.getElementById('cp-bundle-stats').textContent = 'Estimated payload: ~125,000+ tokens (Includes Production Source Code Embeds)';
        }
      }
  static _generateMarkdownBundle() {
      let out = '# CADPLAN: NEXT-GENERATION CAD ARCHITECTURAL SPECIFICATION & AGENT DIRECTIVE\n';
      out += `Generated: ${new Date().toISOString()} • Author: Rob Brown (Inventor of AccuDraw, SmartLine)\n`;
      out += 'Target Systems: ArtCraft CADCraft v0.7.0 (Rust/Wasm) • accuCad (Three.js/WebGL) • Bentley iTwin Reference • TouchController (WebRTC P2P)\n\n';
      out += '---\n\n';

      const isChecked = (id) => {
        const el = document.getElementById(id);
        return el ? el.checked : false;
      };

      // Inject Author Notes if present
      if (globalThis.CadPlanNotesManager) {
        const notes = CadPlanNotesManager.getNotes();
        if (notes && notes.trim().length > 0) {
          out += '## AUTHOR & INVENTOR WORKING NOTES (DIRECT DIRECTIVES)\n\n';
          out += notes.trim() + '\n\n';
          out += '---\n\n';
        }
      }

      if (isChecked('opt_meta') && globalThis.CadPlanMetaContent) {
        out += '## CHAPTER 0: THE LIVING DOSSIER & AGENT SPECIFICATION METHODOLOGY\n\n';
        out += CadPlanMetaContent.p_meta_dossier_1().join('\n\n') + '\n\n';
        out += CadPlanMetaContent.p_meta_dossier_2().join('\n\n') + '\n\n';
        out += '> **Specification Thesis:** ' + CadPlanMetaContent.sidebar_unified_spec().join('\n> ') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_origins') && globalThis.CadOriginsContent) {
        out += '## CHAPTER 1: PROVENANCE, BENTLEY PLAYBOOK & STRATEGIC HORIZON\n\n';
        out += CadOriginsContent.p_rob_intro_1().join('\n\n') + '\n\n';
        out += CadOriginsContent.p_rob_intro_2().join('\n\n') + '\n\n';
        out += '> **Patent Milestone:** ' + CadOriginsContent.sidebar_patent_milestone().join('\n> ') + '\n\n';
        out += CadOriginsContent.p_bentley_playbook_1().join('\n\n') + '\n\n';
        out += CadOriginsContent.p_bentley_playbook_2().join('\n\n') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_philosophy') && globalThis.AccuDrawPhilosophyContent) {
        out += '## CHAPTER 2: THE SQUIRCLE COMPASS PHILOSOPHY & MATHEMATICS\n\n';
        out += AccuDrawPhilosophyContent.p_phil_challenge_1().join('\n\n') + '\n\n';
        out += AccuDrawPhilosophyContent.p_phil_synthesis_1().join('\n\n') + '\n\n';
        out += AccuDrawPhilosophyContent.p_squircle_1().join('\n\n') + '\n\n';
        out += AccuDrawPhilosophyContent.p_squircle_2().join('\n\n') + '\n\n';
        out += '> **Morphing Geometry:** ' + AccuDrawPhilosophyContent.sidebar_squircle_math().join('\n> ') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_accucad') && globalThis.AccuCadAuditContent) {
        out += '## CHAPTER 3: ACCUCAD PRODUCTION KERNEL AUDIT\n\n';
        out += AccuCadAuditContent.p_audit_ctrl_1().join('\n\n') + '\n\n';
        out += AccuCadAuditContent.p_audit_math_1().join('\n\n') + '\n\n';
        out += AccuCadAuditContent.p_audit_math_2().join('\n\n') + '\n\n';
        out += '> **Smart Lock & Indexing:** ' + AccuCadAuditContent.sidebar_smart_lock_math().join('\n> ') + '\n\n';
        out += AccuCadAuditContent.p_audit_snap_1().join('\n\n') + '\n\n';
        out += AccuCadAuditContent.p_audit_snap_2().join('\n\n') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_shortcuts') && globalThis.KeyCommandEngineContent) {
        out += '## CHAPTER 4: UNIVERSAL SINGLE-STROKE KEY COMMAND ENGINE\n\n';
        out += KeyCommandEngineContent.p_kch_1().join('\n\n') + '\n\n';
        out += KeyCommandEngineContent.p_kch_2().join('\n\n') + '\n\n';
        out += '> **& Hotkey Syntax:** ' + KeyCommandEngineContent.sidebar_kch_syntax().join('\n> ') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_curvetouch') && globalThis.CurveTouchContent) {
        out += '## CHAPTER 5: ON-CURVE DRAFTING & REAL-TIME PARAMETER MODULATION\n\n';
        out += CurveTouchContent.p_pen_problem_1().join('\n\n') + '\n\n';
        out += CurveTouchContent.p_pen_problem_2().join('\n\n') + '\n\n';
        out += CurveTouchContent.p_touch_synergy_1().join('\n\n') + '\n\n';
        out += CurveTouchContent.p_touch_synergy_2().join('\n\n') + '\n\n';
        out += CurveTouchContent.p_touch_synergy_3().join('\n\n') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_touch_webrtc')) {
        out += '## CHAPTER 6: WIRELESS P2P TOUCHCONTROLLER PROTOCOL & WEBRTC\n\n';
        out += '* **Left Trackpad (Navigation):** 1-finger orbit, 2-finger pinch zoom, 3-finger FOV, 4-finger Z-elevation translation.\n';
        out += '* **Right Trackpad (Encoders):** Vertical swipe scrolls through active tool sliders; horizontal swipe dials values; tap toggles booleans.\n';
        out += '* **Local LAN Signaling Relay:** Hosts `TouchController/signal-server.js` on local port 3000 with sub-millisecond UDP latency.\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_cadcraft') && globalThis.CadCraftIntegrationContent) {
        out += '## CHAPTER 7: ARTCRAFT CADCRAFT v0.7.0 (PURE RUST) & COMPASS HOOK\n\n';
        out += CadCraftIntegrationContent.p_artcraft_1().join('\n\n') + '\n\n';
        out += CadCraftIntegrationContent.p_crate_arch_1().join('\n\n') + '\n\n';
        out += '> **Crate Topology:** ' + CadCraftIntegrationContent.sidebar_cadcraft_crates().join('\n> ') + '\n\n';
        out += CadCraftIntegrationContent.p_pointmod_1().join('\n\n') + '\n\n';
        out += '> **PointMod Hook:** ' + CadCraftIntegrationContent.sidebar_pointmod_hook().join('\n> ') + '\n\n';

        if (isChecked('opt_cadcraft_bulge')) {
          out += CadCraftIntegrationContent.p_bulge_1().join('\n\n') + '\n\n';
          out += '> **Bulge Arc tan(θ/4):** ' + CadCraftIntegrationContent.sidebar_bulge_math().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_cadcraft_plinem')) {
          out += CadCraftIntegrationContent.p_plinem_1().join('\n\n') + '\n\n';
          out += '> **PlineM & Mat4::ocs:** ' + CadCraftIntegrationContent.sidebar_plinem_pipeline().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_cadcraft_store')) {
          out += CadCraftIntegrationContent.p_store_1().join('\n\n') + '\n\n';
          out += CadCraftIntegrationContent.p_store_2().join('\n\n') + '\n\n';
          out += '> **EntityStore Architecture:** ' + CadCraftIntegrationContent.sidebar_store_architecture().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_cadcraft_accept')) {
          out += CadCraftIntegrationContent.p_accept_1().join('\n\n') + '\n\n';
          out += '> **Accept::POINT Loop:** ' + CadCraftIntegrationContent.sidebar_accept_loop().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_cadcraft_osmode')) {
          out += CadCraftIntegrationContent.p_osmode_1().join('\n\n') + '\n\n';
          out += CadCraftIntegrationContent.p_osmode_2().join('\n\n') + '\n\n';
          out += '> **14-Bit OSMODE Table:** ' + CadCraftIntegrationContent.sidebar_osmode_table().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_cadcraft_render')) {
          out += CadCraftIntegrationContent.p_render_1().join('\n\n') + '\n\n';
          out += '> **wgpu Rendering Pipeline:** ' + CadCraftIntegrationContent.sidebar_render_wgpu().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_cadcraft_lisp')) {
          out += CadCraftIntegrationContent.p_lisp_1().join('\n\n') + '\n\n';
          out += '> **AutoLISP in Rust:** ' + CadCraftIntegrationContent.sidebar_lisp_architecture().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_cadcraft_constraints')) {
          out += CadCraftIntegrationContent.p_tax_1().join('\n\n') + '\n\n';
          out += '> **Parametric Taxonomy:** ' + CadCraftIntegrationContent.sidebar_constraint_taxonomy().join('\n> ') + '\n\n';
        }

        out += CadCraftIntegrationContent.p_lm_solver_1().join('\n\n') + '\n\n';
        out += '> **Constraints Solver:** ' + CadCraftIntegrationContent.sidebar_constraints_solver().join('\n> ') + '\n\n';
        out += CadCraftIntegrationContent.p_mcp_1().join('\n\n') + '\n\n';
        out += '> **MCP Endpoints:** ' + CadCraftIntegrationContent.sidebar_mcp_endpoints().join('\n> ') + '\n\n';
        out += CadCraftIntegrationContent.p_spec_1().join('\n\n') + '\n\n';
        out += '> **Interception Contract:** ' + CadCraftIntegrationContent.sidebar_interception_contract().join('\n> ') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_architecture') && globalThis.CadArchitectureDecisionsContent) {
        out += '## CHAPTER 8: 4-LAYER HEADLESS GEOMETRIC KERNEL ARCHITECTURE\n\n';
        out += CadArchitectureDecisionsContent.p_arch_layers_1().join('\n\n') + '\n\n';
        out += CadArchitectureDecisionsContent.p_arch_layers_2().join('\n\n') + '\n\n';
        out += '\n' + CadArchitectureDecisionsContent.getMasterMarkdown() + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_itwin') && globalThis.CadITwinParityContent) {
        out += '## CHAPTER 10: BENTLEY ITWIN PARITY AUDIT & SMARTLINE SPECIFICATION\n\n';
        out += CadITwinParityContent.p_itwin_1().join('\n\n') + '\n\n';
        out += '> **iTwin Symbols:** ' + CadITwinParityContent.sidebar_itwin_architecture().join('\n> ') + '\n\n';

        if (isChecked('opt_itwin_snap')) {
          out += CadITwinParityContent.p_snap_pipeline_1().join('\n\n') + '\n\n';
          out += CadITwinParityContent.p_snap_pipeline_2().join('\n\n') + '\n\n';
          out += '> **AccuSnap Pipeline:** ' + CadITwinParityContent.sidebar_accusnap_pipeline().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_itwin_tool')) {
          out += CadITwinParityContent.p_tool_actions_1().join('\n\n') + '\n\n';
          out += CadITwinParityContent.p_tool_actions_2().join('\n\n') + '\n\n';
          out += '> **AccuDrawTool Actions:** ' + CadITwinParityContent.sidebar_tool_actions().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_itwin_history')) {
          out += CadITwinParityContent.p_val_history_1().join('\n\n') + '\n\n';
          out += CadITwinParityContent.p_val_history_2().join('\n\n') + '\n\n';
          out += '> **Value Memory Stack:** ' + CadITwinParityContent.sidebar_val_history_code().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_itwin_contrast')) {
          out += CadITwinParityContent.p_contrast_1().join('\n\n') + '\n\n';
          out += CadITwinParityContent.p_contrast_2().join('\n\n') + '\n\n';
          out += '> **Adaptive Luminance Contrast:** ' + CadITwinParityContent.sidebar_contrast_math().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_plane_math')) {
          out += CadITwinParityContent.p_plane_math_1().join('\n\n') + '\n\n';
          out += CadITwinParityContent.p_plane_math_2().join('\n\n') + '\n\n';
          out += '> **Hard vs. Soft Construction Planes:** ' + CadITwinParityContent.sidebar_plane_math_code().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_smart_keyin')) {
          out += CadITwinParityContent.p_smart_keyin_1().join('\n\n') + '\n\n';
          out += CadITwinParityContent.p_smart_keyin_2().join('\n\n') + '\n\n';
          out += '> **SmartKeyin & SavedState:** ' + CadITwinParityContent.sidebar_smart_keyin_math().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_itwin_hints')) {
          out += CadITwinParityContent.p_hint_protocol_1().join('\n\n') + '\n\n';
          out += CadITwinParityContent.p_hint_protocol_2().join('\n\n') + '\n\n';
          out += '> **HintBuilder Protocol:** ' + CadITwinParityContent.sidebar_hint_protocol().join('\n> ') + '\n\n';
        }

        if (isChecked('opt_fillet_math')) {
          out += CadITwinParityContent.p_fillet_comp_1().join('\n\n') + '\n\n';
          out += CadITwinParityContent.p_fillet_comp_2().join('\n\n') + '\n\n';
          out += '> **Fillet Mathematics:** ' + CadITwinParityContent.sidebar_fillet_comparison().join('\n> ') + '\n\n';
        }

        out += CadITwinParityContent.p_smartline_1().join('\n\n') + '\n\n';
        out += '> **SmartLine State Transitions:** ' + CadITwinParityContent.sidebar_smartline_transitions().join('\n> ') + '\n\n';

        if (isChecked('opt_mcp_spec')) {
          out += CadITwinParityContent.p_mcp_agent_spec_1().join('\n\n') + '\n\n';
          out += CadITwinParityContent.p_mcp_agent_spec_2().join('\n\n') + '\n\n';
          out += '> **MCP Agent Endpoints:** ' + CadITwinParityContent.sidebar_mcp_compass_tools().join('\n> ') + '\n\n';
        }

        out += CadITwinParityContent.p_rust_crate_1().join('\n\n') + '\n\n';
        out += '> **compassdraw-core Rust Crate:** ' + CadITwinParityContent.sidebar_rust_crate_api().join('\n> ') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_interview') && globalThis.CadVisionInterviewContent) {
        out += '## CHAPTER 11: INVENTOR\'S VISION, STRATEGY & THE OPEN CAD HORIZON\n\n';
        out += CadVisionInterviewContent.p_interview_strategy_1().join('\n\n') + '\n\n';
        out += '> **Platform Strategy:** ' + CadVisionInterviewContent.sidebar_host_strategy().join('\n> ') + '\n\n';
        out += CadVisionInterviewContent.p_interview_engine_1().join('\n\n') + '\n\n';
        out += '> **Rendering Verdict:** ' + CadVisionInterviewContent.sidebar_render_verdict().join('\n> ') + '\n\n';
        out += CadVisionInterviewContent.p_interview_smartline_1().join('\n\n') + '\n\n';
        out += '> **SmartLine Continuity:** ' + CadVisionInterviewContent.sidebar_smartline_spec().join('\n> ') + '\n\n';
        out += CadVisionInterviewContent.p_interview_touch_1().join('\n\n') + '\n\n';
        out += CadVisionInterviewContent.p_interview_touch_2().join('\n\n') + '\n\n';
        out += '> **Two-Handed Ergonomics:** ' + CadVisionInterviewContent.sidebar_touch_ergonomics().join('\n> ') + '\n\n';
        out += CadVisionInterviewContent.p_interview_agents_1().join('\n\n') + '\n\n';
        out += CadVisionInterviewContent.p_interview_agents_2().join('\n\n') + '\n\n';
        out += '> **Agent MCP Integration:** ' + CadVisionInterviewContent.sidebar_agent_mcp().join('\n> ') + '\n\n';
        out += CadVisionInterviewContent.p_interview_endgame_1().join('\n\n') + '\n\n';
        out += '> *"' + CadVisionInterviewContent.quote_interview_summary().join(' ') + '"*\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_embed_source')) {
        out += '## EMBEDDED PRODUCTION CODE METHOD EXCERPTS\n\n';
        out += '### 1. AccuDrawLogic.js (Relative Direction-Cosine Delta Calculation)\n```javascript\n';
        if (typeof AccuDrawLogic !== 'undefined' && AccuDrawLogic.prototype.onMotion) {
          out += AccuDrawLogic.prototype.onMotion.toString() + '\n';
        }
        out += '```\n\n';

        out += '### 2. RoundingUtils3D.js (Dynamic Curve Arc Fillet Computation)\n```javascript\n';
        if (typeof RoundingUtils3D !== 'undefined' && RoundingUtils3D.getRoundingData) {
          out += RoundingUtils3D.getRoundingData.toString() + '\n';
        }
        out += '```\n\n';
      }

      return out;
    }
  static _copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert('📋 Copied configured CadPlan prompt bundle to clipboard!');
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('📋 Copied configured CadPlan prompt bundle to clipboard!');
    }
  }
}

globalThis.CadPromptBundlerDialog = CadPromptBundlerDialog;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPromptBundlerDialog;