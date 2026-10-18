class CadPluginHookSpecGraphic {

  static render(container) {
      container.innerHTML = '';

      const wrap = makeElement('div', {
        style: {
          background: '#070a13',
          border: '1.5px solid #21262d',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
          display: 'flex',
          flexDirection: 'column'
        }
      });

      const header = makeElement('div', {
        style: {
          padding: '10px 16px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid #21262d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('span', { style: { fontSize: '15px' } }, '🔌'),
          makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'The 3 Upstream Hooks: Zero-Drift Plugin Contract'),
          makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Overnight Agent Integration')
        ]),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { fontSize: '11px', padding: '3px 8px', color: '#a855f7', borderColor: '#a855f766' },
          onclick: () => showRustHooks()
        }, '📋 Pop-up Rust Hook Specs')
      ]);
      wrap.appendChild(header);

      const stage = makeElement('div', {
        style: { padding: '16px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '12px' }
      });

      const svgW = 740, svgH = 210;
      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${svgW} ${svgH}`, width: '100%', height: '210px',
        style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '10px' }
      });

      // Left: Upstream Host Engine (CADCraft)
      const gHost = makeElement('svg:g', { transform: 'translate(20, 20)' });
      gHost.appendChild(makeElement('svg:rect', { width: '220', height: '170', rx: '8', fill: '#0a0d16', stroke: '#38bdf8', 'stroke-width': '1.5' }));
      gHost.appendChild(makeElement('svg:text', { x: '110', y: '24', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '10.5px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'UPSTREAM HOST ENGINE'));
      gHost.appendChild(makeElement('svg:text', { x: '110', y: '38', fill: '#64748b', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '(CADCraft v0.7.0 / FreeCAD / Web CAD)'));

      gHost.appendChild(makeElement('svg:rect', { x: '12', y: '50', width: '196', height: '32', rx: '4', fill: '#070a13', stroke: '#21262d' }));
      gHost.appendChild(makeElement('svg:text', { x: '22', y: '70', fill: '#cbd5e1', 'font-family': 'monospace', 'font-size': '9px' }, '• Event Loop / session.rs'));

      gHost.appendChild(makeElement('svg:rect', { x: '12', y: '88', width: '196', height: '32', rx: '4', fill: '#070a13', stroke: '#21262d' }));
      gHost.appendChild(makeElement('svg:text', { x: '22', y: '108', fill: '#cbd5e1', 'font-family': 'monospace', 'font-size': '9px' }, '• Render Passes / render.rs'));

      gHost.appendChild(makeElement('svg:rect', { x: '12', y: '126', width: '196', height: '32', rx: '4', fill: '#070a13', stroke: '#21262d' }));
      gHost.appendChild(makeElement('svg:text', { x: '22', y: '146', fill: '#cbd5e1', 'font-family': 'monospace', 'font-size': '9px' }, '• Command Loop / cmd/draw.rs'));
      svg.appendChild(gHost);

      // Center: The 3 Non-Invasive Hooks
      const gHooks = makeElement('svg:g', { transform: 'translate(255, 20)' });
      gHooks.appendChild(makeElement('svg:rect', { width: '230', height: '170', rx: '8', fill: '#0d1726', stroke: '#10b981', 'stroke-width': '2' }));
      gHooks.appendChild(makeElement('svg:text', { x: '115', y: '24', fill: '#10b981', 'font-family': 'monospace', 'font-size': '10.5px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'THE 3 PLUG-IN HOOKS'));

      // Hook 1
      gHooks.appendChild(makeElement('svg:rect', { x: '10', y: '48', width: '210', height: '34', rx: '6', fill: '#070a13', stroke: '#38bdf8', 'stroke-width': '1.2' }));
      gHooks.appendChild(makeElement('svg:text', { x: '20', y: '64', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold' }, 'Hook 1: PointInterceptor'));
      gHooks.appendChild(makeElement('svg:text', { x: '20', y: '75', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8px' }, 'Resolves points before Accept::POINT'));

      // Hook 2
      gHooks.appendChild(makeElement('svg:rect', { x: '10', y: '88', width: '210', height: '34', rx: '6', fill: '#070a13', stroke: '#f59e0b', 'stroke-width': '1.2' }));
      gHooks.appendChild(makeElement('svg:text', { x: '20', y: '104', fill: '#f59e0b', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold' }, 'Hook 2: RenderOverlay'));
      gHooks.appendChild(makeElement('svg:text', { x: '20', y: '115', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8px' }, 'Top wgpu pass for Squircle Compass'));

      // Hook 3
      gHooks.appendChild(makeElement('svg:rect', { x: '10', y: '128', width: '210', height: '34', rx: '6', fill: '#070a13', stroke: '#a855f7', 'stroke-width': '1.2' }));
      gHooks.appendChild(makeElement('svg:text', { x: '20', y: '144', fill: '#a855f7', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold' }, 'Hook 3: CommandHint'));
      gHooks.appendChild(makeElement('svg:text', { x: '20', y: '155', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8px' }, 'Tools pass exit tangents & origins'));
      svg.appendChild(gHooks);

      // Right: The CompassDraw Superpowers
      const gPower = makeElement('svg:g', { transform: 'translate(500, 20)' });
      gPower.appendChild(makeElement('svg:rect', { width: '220', height: '170', rx: '8', fill: '#0a101d', stroke: '#a855f7', 'stroke-width': '1.5' }));
      gPower.appendChild(makeElement('svg:text', { x: '110', y: '24', fill: '#a855f7', 'font-family': 'monospace', 'font-size': '10.5px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'SUPERPOWERS UNLOCKED'));

      gPower.appendChild(makeElement('svg:text', { x: '15', y: '56', fill: '#10b981', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold' }, '✓ 3D AccuDraw Compass'));
      gPower.appendChild(makeElement('svg:text', { x: '15', y: '74', fill: '#cbd5e1', 'font-family': 'monospace', 'font-size': '8.5px' }, '  Single-stroke planes [T/F/S/V]'));

      gPower.appendChild(makeElement('svg:text', { x: '15', y: '96', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold' }, '✓ On-Curve Splines'));
      gPower.appendChild(makeElement('svg:text', { x: '15', y: '114', fill: '#cbd5e1', 'font-family': 'monospace', 'font-size': '8.5px' }, '  Through-point G1 relaxation'));

      gPower.appendChild(makeElement('svg:text', { x: '15', y: '136', fill: '#f59e0b', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold' }, '✓ Two-Handed Mobile Glass'));
      gPower.appendChild(makeElement('svg:text', { x: '15', y: '154', fill: '#cbd5e1', 'font-family': 'monospace', 'font-size': '8.5px' }, '  Sub-ms analog P2P control'));
      svg.appendChild(gPower);

      stage.appendChild(svg);

      const desc = makeElement('div', {
        style: {
          background: '#0a0e1a', border: '1px solid #1e293b', borderRadius: '8px',
          padding: '12px 14px', fontSize: '11.5px', color: '#cbd5e1', lineHeight: '1.55'
        }
      }, [
        makeElement('strong', { style: { color: '#38bdf8', display: 'block', marginBottom: '4px' } }, 'Rob Brown: Convincing the World to Put the Hooks In'),
        'We do not need to build an entire CAD clone—developers like Brandon Thomas with CADCraft have already done great work on that. What we need is to ',
        makeElement('strong', { style: { color: '#10b981' } }, 'convince toolmakers to put these three clean hooks in'),
        '. Because this specification has zero ambiguity, a modern AI agent can open a PR implementing these hooks into CADCraft or any host engine ',
        makeElement('strong', { style: { color: '#a855f7' } }, 'overnight'),
        '. The host engine maintains 100% of its native command compatibility, but instantly gains 3D spatial alignment superpowers that legacy vendors charge $10,000 for.'
      ]);
      stage.appendChild(desc);

      wrap.appendChild(stage);
      container.appendChild(wrap);

      function showRustHooks() {
        const code =
  `// === The 3 Upstream Clean Plugin Traits for CADCraft (crates/engine) ===

  // 1. Point Interception Hook (session.rs)
  pub trait PointInterceptor {
      fn filter_point(
          &mut self,
          raw_world_point: [f64; 3],
          ray_origin: [f64; 3],
          ray_direction: [f64; 3],
          is_tentative_active: bool,
      ) -> Option<[f64; 3]>;

      fn handle_key_down(&mut self, key: &str, ctrl: bool, shift: bool) -> bool;
  }

  // 2. Render Overlay Pass (render/wgpu)
  pub trait ViewportOverlayPass {
      fn render_overlay(
          &mut self,
          encoder: &mut wgpu::CommandEncoder,
          view: &wgpu::TextureView,
          compass_data: &CompassDrawVisualState,
      );
  }

  // 3. Command Hint Dispatcher (cmd/traits.rs)
  pub trait CommandHintEmitter {
      fn emit_hint(&mut self, hint: AccuDrawHint);
  }`;

        navigator.clipboard.writeText(code);
        alert('✓ Copied Upstream Rust Plugin Hook Specification to clipboard for LLM synthesis!');
      }
    }
}

globalThis.CadPluginHookSpecGraphic = CadPluginHookSpecGraphic;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPluginHookSpecGraphic;