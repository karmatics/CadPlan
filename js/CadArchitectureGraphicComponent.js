class CadArchitectureGraphicComponent {

  static render(container) {
      container.innerHTML = '';

      const wrap = makeElement('div', {
        style: {
          background: '#070a13', border: '1.5px solid #21262d', borderRadius: '12px', overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(0,0,0,0.65)', display: 'flex', flexDirection: 'column'
        }
      });

      const header = makeElement('div', {
        style: {
          padding: '10px 16px', background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid #21262d',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('span', { style: { fontSize: '15px' } }, '📐'),
          makeElement('strong', { style: { color: '#00f2fe', fontSize: '13px', fontFamily: 'monospace' } }, 'Interactive 4-Layer Headless Geometric Stack Studio'),
          makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Zero WebGL Coupling')
        ]),
        makeElement('button', {
          className: 'dr-nav-btn primary',
          id: 'btn-pulse-pipeline-beam',
          style: { padding: '3px 10px', fontSize: '10px', fontWeight: '800' },
          onclick: () => firePipelineParticleBeam()
        }, '⚡ Fire Pipeline Particle Beam')
      ]);
      wrap.appendChild(header);

      const body = makeElement('div', {
        style: {
          display: 'grid', gridTemplateColumns: 'minmax(320px, 1.2fr) minmax(280px, 1fr)', gap: '1px', background: '#21262d'
        }
      });

      // Left: The 4 Interactive Layers
      const stackBox = makeElement('div', {
        style: { background: '#090d16', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }
      });

      const layers = [
        {
          num: '4', name: 'UI & Ergonomics Shell', tech: 'Three.js / WebGL / SVG',
          role: 'Morphing squircle compass, glowing caret, and P2P mobile phone controller over WebRTC.',
          col: '#c084fc',
          code: `// Layer 4: UI & Ergonomics
  const compass = new Squircle3D(view, { squircle: 0.5, size: 1.0 });
  const p2pDeck = new TouchController(); // Two-handed glass scrub`
        },
        {
          num: '3', name: 'Render Adapter Pipeline', tech: 'wgpu / WebGL2 Line2',
          role: 'Screen-space thick anti-aliased wireframes, PBR clearcoats, and GPU vertex strip tessellation.',
          col: '#00f2fe',
          code: `// Layer 3: Render Adapter
  const line = new Line2(geom, new LineMaterial({ linewidth: 4 }));
  // Native Desktop: cadcraft-render wgpu triangle strip pass`
        },
        {
          num: '2', name: 'Command & Tool Machines', tech: 'State Machines & AST',
          role: 'SmartLine continuous chaining (lines, tangent arcs, fillets), single-stroke keys without Enter, 50ms chording.',
          col: '#10b981',
          code: `// Layer 2: Tool State Machines
  cmd.step(&mut session, Input::Point(Vec2::new(u, v)));
  // Evaluates Closest-Point tangent arc sweeps & DXF bulges`
        },
        {
          num: '1', name: 'Pure Geometry & Constraints', tech: 'compassdraw-core (Rust no_std)',
          role: 'Headless direction cosines (ThreeAxes), ray-curve quadratic intersections, and relative vectors.',
          col: '#f59e0b',
          code: `// Layer 1: Pure Headless Mathematics (no_std)
  pub struct ThreeAxes { pub x: [f64; 3], pub y: [f64; 3], pub z: [f64; 3] }
  // Delta projection: lx = delta · X_axis; ly = delta · Y_axis`
        }
      ];

      let activeLayerIdx = 0;

      const renderLayerCards = () => {
        stackBox.innerHTML = '';
        layers.forEach((l, idx) => {
          const isCur = idx === activeLayerIdx;
          const card = makeElement('div', {
            id: `arch-layer-card-${l.num}`,
            style: {
              background: isCur ? 'rgba(0, 242, 254, 0.12)' : '#0d1117',
              border: `1.5px solid ${isCur ? l.col : '#1e293b'}`,
              borderRadius: '8px', padding: '10px 14px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              cursor: 'pointer', transition: 'all 0.15s ease'
            },
            onclick: () => {
              activeLayerIdx = idx;
              renderLayerCards();
              updateDetail();
            }
          }, [
            makeElement('div', {}, [
              makeElement('span', { style: { fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: l.col, marginRight: '8px' } }, `Layer ${l.num}`),
              makeElement('strong', { style: { fontSize: '12.5px', color: '#f8fafc', fontFamily: 'monospace' } }, l.name),
              makeElement('div', { style: { fontSize: '11px', color: '#94a3b8', marginTop: '2px' } }, l.role)
            ]),
            makeElement('span', {
              style: { fontSize: '10px', background: l.col + '22', color: l.col, border: `1px solid ${l.col}44`, padding: '2px 8px', borderRadius: '12px', fontFamily: 'monospace', fontWeight: 'bold' }
            }, l.tech)
          ]);
          stackBox.appendChild(card);
        });
      };

      renderLayerCards();
      body.appendChild(stackBox);

      // Right: Active Layer Code Inspector
      const rightCol = makeElement('div', {
        style: { background: '#0a0e1a', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }
      });

      rightCol.appendChild(makeElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
      }, [
        detailTitle = makeElement('strong', { style: { color: '#00f2fe', fontFamily: 'monospace', fontSize: '12px' } }, 'Layer 4: UI & Ergonomics Shell'),
        makeElement('span', { id: 'beam-status-pill', style: { color: '#10b981', fontSize: '10px', fontFamily: 'monospace' } }, '● Pipeline Synced')
      ]));
      let detailTitle;

      const detailDesc = makeElement('div', {
        id: 'arch-detail-desc',
        style: { fontSize: '11px', color: '#cbd5e1', lineHeight: '1.45' }
      }, layers[0].role);
      rightCol.appendChild(detailDesc);

      const codeInspector = makeElement('pre', {
        id: 'arch-code-inspector',
        style: {
          flex: 1, margin: 0, minHeight: '220px', background: '#050811', border: '1px solid #1e293b',
          borderRadius: '6px', padding: '10px', color: '#7ee787', fontSize: '11px', fontFamily: 'monospace',
          lineHeight: '1.45', overflowX: 'auto'
        }
      }, layers[0].code);
      rightCol.appendChild(codeInspector);
      body.appendChild(rightCol);

      wrap.appendChild(body);
      container.appendChild(wrap);

      function updateDetail() {
        const l = layers[activeLayerIdx];
        detailTitle.textContent = `Layer ${l.num}: ${l.name}`;
        detailTitle.style.color = l.col;
        detailDesc.textContent = l.role;
        codeInspector.textContent = l.code;
        codeInspector.style.borderColor = l.col + '66';
        if (typeof CompassSkinAddons !== 'undefined') {
          CompassSkinAddons.playSnapPop(520 + activeLayerIdx * 120, 0.03);
        }
      }

      function firePipelineParticleBeam() {
        let idx = 3; // Start from Layer 1 (bottom) to Layer 4 (top)
        const beamPill = document.getElementById('beam-status-pill');

        const step = () => {
          if (idx < 0) {
            if (beamPill) {
              beamPill.textContent = '✓ Packet Dispatched to GPU & HUD!';
              beamPill.style.color = '#00f2fe';
            }
            if (typeof CompassSkinAddons !== 'undefined') {
              CompassSkinAddons.playSnapPop(880, 0.06);
            }
            return;
          }

          activeLayerIdx = idx;
          renderLayerCards();
          updateDetail();
          if (beamPill) {
            beamPill.textContent = `⚡ Processing in Layer ${layers[idx].num}...`;
            beamPill.style.color = layers[idx].col;
          }

          idx--;
          setTimeout(step, 450);
        };

        step();
      }
    }
}

globalThis.CadArchitectureGraphicComponent = CadArchitectureGraphicComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadArchitectureGraphicComponent;