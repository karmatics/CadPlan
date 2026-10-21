class CompassAnatomyComponent {

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
        flexDirection: 'column',
        position: 'relative'
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
        makeElement('span', { style: { fontSize: '15px' } }, '🧭'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'The Squircle Compass: Deconstructed Geometric Anatomy'),
        makeElement('span', { id: 'deconstruct-status-badge', style: { fontSize: '10px', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, '8-Arc Superellipse')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        btnMorph = makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '4px 10px', fontSize: '10px', fontWeight: 'bold' },
          onclick: () => toggleMorphLoop()
        }, '▶ Morph Loop'),
        makeElement('button', {
          className: 'dr-nav-btn',
          id: 'btn-toggle-vectors',
          style: { padding: '4px 8px', fontSize: '10px', color: '#f59e0b', borderColor: '#f59e0b66' },
          onclick: () => toggleVectors()
        }, '📐 Hide Vectors')
      ])
    ]);
    let btnMorph;
    wrap.appendChild(header);

    const body = makeElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(280px, 1fr)',
        gap: '1px',
        background: '#21262d'
      }
    });

    // Left Stage: Deconstructed Vector Geometry Viewport
    const stageLeft = makeElement('div', {
      style: {
        background: '#090d16',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'relative'
      }
    });

    const controlsRow = makeElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8', flexWrap: 'wrap', gap: '8px'
      }
    }, [
      makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [
        'Morph (t): ',
        sliderT = makeElement('input', {
          type: 'range', min: '0', max: '1', step: '0.01', value: '0.5',
          style: { width: '90px', accentColor: '#00f2fe', cursor: 'pointer' },
          oninput: (e) => {
            stopMorphLoop();
            state.squircle = parseFloat(e.target.value);
            lblT.textContent = state.squircle.toFixed(2);
            updateDeconstructedView();
          }
        }),
        lblT = makeElement('span', { style: { color: '#00f2fe', width: '32px', fontWeight: 'bold' } }, '0.50')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '4px' } }, [
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setT(0.0) }, 'Square'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setT(0.5) }, 'Squircle'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setT(1.0) }, 'Circle')
      ])
    ]);
    let sliderT, lblT;
    stageLeft.appendChild(controlsRow);

    const W = 420, H = 340;
    const svg = makeElement('svg:svg', {
      viewBox: `0 0 ${W} ${H}`, width: '100%', height: '340px',
      style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '8px' }
    });

    const defs = makeElement('svg:defs', {},
      makeElement('svg:pattern', { id: 'deconstruct-grid', width: '20', height: '20', patternUnits: 'userSpaceOnUse' },
        makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '1' })
      ),
      makeElement('svg:filter', { id: 'deconstruct-glow', x: '-20%', y: '-20%', width: '140%', height: '140%' },
        makeElement('svg:feGaussianBlur', { stdDeviation: '3', result: 'blur' }),
        makeElement('svg:feMerge', {},
          makeElement('svg:feMergeNode', { in: 'blur' }),
          makeElement('svg:feMergeNode', { in: 'SourceGraphic' })
        )
      )
    );
    svg.appendChild(defs);
    svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#deconstruct-grid)' }));

    const vectorsLayer = makeElement('svg:g');
    const frameLayer = makeElement('svg:g');
    const centersLayer = makeElement('svg:g');
    const junctionsLayer = makeElement('svg:g');

    svg.appendChild(vectorsLayer);
    svg.appendChild(frameLayer);
    svg.appendChild(centersLayer);
    svg.appendChild(junctionsLayer);
    stageLeft.appendChild(svg);
    body.appendChild(stageLeft);

    // Right Column: Anatomical Part Cards with Active Highlight
    const cardsRight = makeElement('div', {
      style: {
        background: '#0a0e1a',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxHeight: '400px',
        overflowY: 'auto'
      }
    });

    const parts = [
      {
        id: 'squircle_frame',
        title: '1. The 8-Arc Morphing Boundary',
        kicker: 'Rob Brown SquircleArc Engine',
        color: '#00f2fe',
        equation: '4 Edge Arcs + 4 Corner Arcs',
        desc: 'Formed by 8 circular arcs. The 4 edge centers sit along primary axes, while 4 corner fillet centers ride along 45° diagonals, ensuring seamless G1 tangency at every junction dot.'
      },
      {
        id: 'corner_centers',
        title: '2. Corner Fillet Centers (Amber Vectors)',
        kicker: 'Corner Setback Centerpoints',
        color: '#f59e0b',
        equation: 'C_corner(t) = intersection(R_prev, R_next)',
        desc: 'Centers of the 4 corner fillets. At t=0, they sit at the square corners; as t approaches 1.0 (circle), they slide inward until coinciding at the origin (0,0).'
      },
      {
        id: 'edge_centers',
        title: '3. Primary Edge Centers (Cyan Vectors)',
        kicker: 'Orthogonal Axis Radials',
        color: '#38bdf8',
        equation: 'C_edge(t) = (0, ±(R - r_edge))',
        desc: 'Centers of the 4 flat edge arcs. When t=0, their radius is infinite (straight line); as t increases, they curve outward into circular arcs.'
      },
      {
        id: 'tangency_junctions',
        title: '4. G1 Tangency Junction Dots (Green)',
        kicker: 'Continuous Derivative Points',
        color: '#10b981',
        equation: '||P_junction - C_edge|| = ||P_junction - C_corner||',
        desc: 'The exact mathematical points where corner fillets meet edge arcs. At these 8 dots, tangents match with zero curvature discontinuity.'
      }
    ];

    let selectedPartId = 'squircle_frame';

    parts.forEach(part => {
      const card = makeElement('div', {
        className: 'compass-part-card',
        id: `part-card-${part.id}`,
        style: {
          background: part.id === selectedPartId ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.02)',
          border: part.id === selectedPartId ? `1.5px solid ${part.color}` : '1px solid #1e293b',
          borderRadius: '8px',
          padding: '10px 12px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        },
        onclick: () => {
          selectedPartId = part.id;
          parts.forEach(p => {
            const c = document.getElementById(`part-card-${p.id}`);
            if (c) {
              const isCur = p.id === selectedPartId;
              c.style.background = isCur ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.02)';
              c.style.borderColor = isCur ? p.color : '#1e293b';
            }
          });
          updateDeconstructedView();
        }
      }, [
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' } }, [
          makeElement('span', { style: { fontSize: '10px', textTransform: 'uppercase', color: part.color, fontWeight: 'bold' } }, part.kicker),
          makeElement('span', { style: { fontSize: '9.5px', fontFamily: 'monospace', color: '#64748b' } }, part.equation)
        ]),
        makeElement('div', { style: { fontSize: '12px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '3px' } }, part.title),
        makeElement('div', { style: { fontSize: '11px', color: '#94a3b8', lineHeight: '1.45' } }, part.desc)
      ]);
      cardsRight.appendChild(card);
    });

    body.appendChild(cardsRight);
    wrap.appendChild(body);
    container.appendChild(wrap);

    const state = {
      cx: W / 2,
      cy: H / 2,
      radius: 95,
      squircle: 0.5,
      showVectors: true,
      isMorphing: false
    };

    let morphRafId = null;
    let morphStartTime = 0;

    function setT(val) {
      stopMorphLoop();
      state.squircle = val;
      sliderT.value = val.toString();
      lblT.textContent = val.toFixed(2);
      updateDeconstructedView();
    }

    function toggleVectors() {
      state.showVectors = !state.showVectors;
      const btn = document.getElementById('btn-toggle-vectors');
      if (btn) {
        btn.textContent = state.showVectors ? '📐 Hide Vectors' : '📐 Show Vectors';
        btn.style.color = state.showVectors ? '#f59e0b' : '#94a3b8';
      }
      updateDeconstructedView();
    }

    function toggleMorphLoop() {
      state.isMorphing = !state.isMorphing;
      if (state.isMorphing) {
        btnMorph.textContent = '⏸ Pause Morph';
        btnMorph.style.background = '#f59e0b';
        btnMorph.style.color = '#000';
        morphStartTime = performance.now();
        runMorphStep();
      } else {
        stopMorphLoop();
      }
    }

    function stopMorphLoop() {
      state.isMorphing = false;
      if (morphRafId) cancelAnimationFrame(morphRafId);
      morphRafId = null;
      if (btnMorph) {
        btnMorph.textContent = '▶ Morph Loop';
        btnMorph.style.background = '';
        btnMorph.style.color = '';
      }
    }

    function runMorphStep() {
      if (!state.isMorphing) return;
      const elapsed = (performance.now() - morphStartTime) / 1000;
      // Sinusoidal breathing between 0.05 and 0.98
      const t = 0.5 + 0.45 * Math.sin(elapsed * 1.5);
      state.squircle = Math.max(0.01, Math.min(0.99, t));
      sliderT.value = state.squircle.toFixed(2);
      lblT.textContent = state.squircle.toFixed(2);
      updateDeconstructedView();
      morphRafId = requestAnimationFrame(runMorphStep);
    }

    function updateDeconstructedView() {
      vectorsLayer.innerHTML = '';
      frameLayer.innerHTML = '';
      centersLayer.innerHTML = '';
      junctionsLayer.innerHTML = '';

      const squircleCalc = (typeof SquircleArc !== 'undefined') ? new SquircleArc() : new globalThis.SquircleArc();
      const paths = squircleCalc.getPaths(state.squircle, false, state.radius);
      const arcParams = squircleCalc.getArcParameters();

      // 1. Draw Axis Reference Grid
      vectorsLayer.appendChild(makeElement('svg:line', {
        x1: state.cx - state.radius - 24, y1: state.cy, x2: state.cx + state.radius + 24, y2: state.cy,
        stroke: 'rgba(239, 68, 68, 0.45)', 'stroke-width': 1.5, 'stroke-dasharray': '3,3'
      }));
      vectorsLayer.appendChild(makeElement('svg:line', {
        x1: state.cx, y1: state.cy - state.radius - 24, x2: state.cx, y2: state.cy + state.radius + 24,
        stroke: 'rgba(16, 185, 129, 0.45)', 'stroke-width': 1.5, 'stroke-dasharray': '3,3'
      }));

      // 2. Render each of the 8 constituent arcs
      (paths || []).forEach((pStr, idx) => {
        const isCorner = idx % 2 === 1;
        const arcColor = isCorner ? '#f59e0b' : '#00f2fe';

        const g = makeElement('svg:g', { transform: `translate(${state.cx}, ${state.cy})` });
        g.appendChild(makeElement('svg:path', {
          d: pStr, fill: 'none', stroke: arcColor,
          'stroke-width': selectedPartId === (isCorner ? 'corner_centers' : 'edge_centers') ? 4 : 2.5,
          'stroke-linecap': 'round'
        }));
        frameLayer.appendChild(g);
      });

      // 3. Render Centers, Radial Lines & Junctions if enabled
      if (state.showVectors && arcParams && arcParams.length === 8) {
        arcParams.forEach((params, idx) => {
          if (!params || !params.center) return;

          const isCorner = idx % 2 === 1;
          const color = isCorner ? '#f59e0b' : '#38bdf8';
          const centerWorld = [state.cx + params.center.x, state.cy + params.center.y];

          // Center dot
          centersLayer.appendChild(makeElement('svg:circle', {
            cx: centerWorld[0], cy: centerWorld[1], r: 3.5,
            fill: color, stroke: '#070a13', 'stroke-width': 1.5
          }));

          // Radial lines to arc endpoints
          const p1World = [
            state.cx + params.center.x + params.radius * Math.cos(params.startAngle),
            state.cy + params.center.y + params.radius * Math.sin(params.startAngle)
          ];
          const p2World = [
            state.cx + params.center.x + params.radius * Math.cos(params.endAngle),
            state.cy + params.center.y + params.radius * Math.sin(params.endAngle)
          ];

          vectorsLayer.appendChild(makeElement('svg:line', {
            x1: centerWorld[0], y1: centerWorld[1], x2: p1World[0], y2: p1World[1],
            stroke: color, 'stroke-width': 1.2, 'stroke-dasharray': '2,3', opacity: 0.65
          }));
          vectorsLayer.appendChild(makeElement('svg:line', {
            x1: centerWorld[0], y1: centerWorld[1], x2: p2World[0], y2: p2World[1],
            stroke: color, 'stroke-width': 1.2, 'stroke-dasharray': '2,3', opacity: 0.65
          }));

          // G1 Tangency Junction Dot
          junctionsLayer.appendChild(makeElement('svg:circle', {
            cx: p1World[0], cy: p1World[1], r: 3,
            fill: '#10b981', stroke: '#050811', 'stroke-width': 1.5
          }));
        });
      }

      // Center Origin Point
      junctionsLayer.appendChild(makeElement('svg:circle', {
        cx: state.cx, cy: state.cy, r: 4, fill: '#ffffff', stroke: '#0284c7', 'stroke-width': 2
      }));

      const badge = document.getElementById('deconstruct-status-badge');
      if (badge) {
        badge.textContent = state.squircle > 0.95 ? 'Circle Mode (t=1.0)' : (state.squircle < 0.05 ? 'Square Mode (t=0.0)' : `Squircle Mode (t=${state.squircle.toFixed(2)})`);
      }
    }

    updateDeconstructedView();

    const observer = new MutationObserver(() => {
      if (!document.body.contains(wrap)) {
        stopMorphLoop();
        observer.disconnect();
      }
    });
    observer.observe(wrap.parentNode || document.body, { childList: true });
  }
}

globalThis.CompassAnatomyComponent = CompassAnatomyComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CompassAnatomyComponent;