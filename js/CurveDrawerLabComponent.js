class CurveDrawerLabComponent {

  static render(container) {
      container.innerHTML = '';

      const wrap = makeElement('div', {
        style: {
          width: '100%',
          minHeight: '580px',
          background: '#070a13',
          borderRadius: '12px',
          border: '1.5px solid #21262d',
          boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          outline: 'none'
        },
        tabIndex: 0
      });

      const toolbar = makeElement('div', {
        style: {
          padding: '8px 14px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid #21262d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          zIndex: 10
        }
      });

      const btnPoints = makeElement('button', {
        className: 'dr-tab-btn active', id: 'btn-curve-lab-points',
        onclick: () => setToolMode('points')
      }, '✍️ On-Curve Through-Points');

      const btnTether = makeElement('button', {
        className: 'dr-tab-btn', id: 'btn-curve-lab-tether',
        onclick: () => setToolMode('tether')
      }, '🪢 Kinetic String-Drag [Ctrl / Shift]');

      const modeGroup = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        btnPoints, btnTether
      ]);

      const statusEl = makeElement('span', {
        id: 'curve-lab-status',
        style: { fontSize: '11px', fontFamily: 'monospace', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '12px' }
      }, 'Mode: On-Curve Points • Click on-curve to relax');

      const rightControls = makeElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } }, [
        statusEl,
        makeElement('button', {
          className: 'dr-nav-btn', style: { padding: '3px 8px', fontSize: '10px', color: '#ef4444' },
          onclick: () => resetLab()
        }, '🗑️ Clear')
      ]);

      toolbar.appendChild(modeGroup);
      toolbar.appendChild(rightControls);
      wrap.appendChild(toolbar);

      const hintEl = makeElement('span', { id: 'tether-hint', style: { color: '#a855f7', display: 'none' } }, 'Hold [Ctrl] to extend string • Release to pull • Hold [Shift] to backtrack/undo');

      const subBar = makeElement('div', {
        style: {
          padding: '5px 14px', background: '#0d1117', borderBottom: '1px solid #161e2b',
          display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace'
        }
      }, [
        makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' } }, [
          'Curvature: ',
          makeElement('input', {
            id: 'curve-slider-curv', type: 'range', min: '0.1', max: '2.5', step: '0.05', value: '1.0',
            style: { width: '70px', accentColor: '#38bdf8' },
            oninput: (e) => { state.currentCurvature = parseFloat(e.target.value); updateSpline(); }
          })
        ]),
        makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' } }, [
          'Balance: ',
          makeElement('input', {
            id: 'curve-slider-bal', type: 'range', min: '0.1', max: '1.9', step: '0.05', value: '1.0',
            style: { width: '70px', accentColor: '#f59e0b' },
            oninput: (e) => { state.currentBalance = parseFloat(e.target.value); updateSpline(); }
          })
        ]),
        hintEl
      ]);
      wrap.appendChild(subBar);

      const W = 800;
      const H = 480;

      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${W} ${H}`,
        width: '100%',
        height: '480px',
        style: { display: 'block', background: '#090d16', cursor: 'crosshair' }
      });

      const gridPattern = makeElement('svg:pattern', {
        id: 'curve-lab-grid', width: '20', height: '20', patternUnits: 'userSpaceOnUse'
      }, [
        makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.04)', 'stroke-width': '1' })
      ]);
      svg.appendChild(makeElement('svg:defs', {}, gridPattern));
      svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#curve-lab-grid)' }));

      const tetherLayer = makeElement('svg:g', { id: 'curve-lab-tether-layer' });
      const splineLayer = makeElement('svg:g', { id: 'curve-lab-spline-layer' });
      const controlPolygonLayer = makeElement('svg:g', { id: 'curve-lab-handles-layer' });
      const verticesLayer = makeElement('svg:g', { id: 'curve-lab-verts-layer' });

      svg.appendChild(tetherLayer);
      svg.appendChild(splineLayer);
      svg.appendChild(controlPolygonLayer);
      svg.appendChild(verticesLayer);
      wrap.appendChild(svg);

      const state = {
        toolMode: 'points',
        vertices: [],
        currentCurvature: 1.0,
        currentBalance: 1.0,
        isCtrlDown: false,
        isShiftDown: false,
        stringLength: 50,
        curveTip: null,
        cursorPos: [200, 200],
        tetherStream: []
      };

      function setToolMode(mode) {
        state.toolMode = mode;
        btnPoints.classList.toggle('active', mode === 'points');
        btnTether.classList.toggle('active', mode === 'tether');

        if (mode === 'tether') {
          hintEl.style.display = 'inline';
          statusEl.textContent = 'Mode: Kinetic Tether [Hold Ctrl to set string, drag to tow curve]';
        } else {
          hintEl.style.display = 'none';
          statusEl.textContent = 'Mode: On-Curve Points • Click on curve to relax G1 tangents';
        }
      }

      function resetLab() {
        state.vertices = [];
        state.tetherStream = [];
        state.curveTip = null;
        splineLayer.innerHTML = '';
        controlPolygonLayer.innerHTML = '';
        verticesLayer.innerHTML = '';
        tetherLayer.innerHTML = '';
      }

      function updateSpline() {
        splineLayer.innerHTML = '';
        controlPolygonLayer.innerHTML = '';
        verticesLayer.innerHTML = '';

        if (state.vertices.length < 2) return;

        const solver = (typeof UpdateControlPoints !== 'undefined') ? UpdateControlPoints : globalThis.UpdateControlPoints;
        solver.run(state.vertices, 8);

        let d = `M ${state.vertices[0].point[0]} ${state.vertices[0].point[1]}`;
        for (let i = 0; i < state.vertices.length - 1; i++) {
          const v0 = state.vertices[i];
          const v1 = state.vertices[i + 1];
          d += ` C ${v0.controlPoints[1][0]} ${v0.controlPoints[1][1]}, ${v1.controlPoints[0][0]} ${v1.controlPoints[0][1]}, ${v1.point[0]} ${v1.point[1]}`;

          controlPolygonLayer.appendChild(makeElement('svg:line', {
            x1: v0.point[0], y1: v0.point[1], x2: v0.controlPoints[1][0], y2: v0.controlPoints[1][1],
            stroke: 'rgba(56, 189, 248, 0.35)', 'stroke-width': '1.2', 'stroke-dasharray': '2,2'
          }));
          controlPolygonLayer.appendChild(makeElement('svg:line', {
            x1: v1.point[0], y1: v1.point[1], x2: v1.controlPoints[0][0], y2: v1.controlPoints[0][1],
            stroke: 'rgba(245, 158, 11, 0.35)', 'stroke-width': '1.2', 'stroke-dasharray': '2,2'
          }));
        }

        splineLayer.appendChild(makeElement('svg:path', {
          d: d, fill: 'none', stroke: '#10b981', 'stroke-width': '3', 'stroke-linecap': 'round'
        }));

        state.vertices.forEach((v) => {
          verticesLayer.appendChild(makeElement('svg:circle', {
            cx: v.point[0], cy: v.point[1], r: '4.5', fill: '#090d16', stroke: '#10b981', 'stroke-width': '2'
          }));
        });
      }

      svg.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        const rect = svg.getBoundingClientRect();
        const x = Math.round((e.clientX - rect.left) * (W / rect.width));
        const y = Math.round((e.clientY - rect.top) * (H / rect.height));

        const vertexClass = (typeof BezierVertex !== 'undefined') ? BezierVertex : globalThis.BezierVertex;
        const v = new vertexClass([x, y]);
        v.curvature = state.currentCurvature;
        v.balance = state.currentBalance;
        state.vertices.push(v);
        state.curveTip = [x, y];

        updateSpline();
      });

      svg.addEventListener('pointermove', (e) => {
        const rect = svg.getBoundingClientRect();
        const x = Math.round((e.clientX - rect.left) * (W / rect.width));
        const y = Math.round((e.clientY - rect.top) * (H / rect.height));
        state.cursorPos = [x, y];

        tetherLayer.innerHTML = '';

        if (state.toolMode === 'tether' && state.curveTip) {
          const dx = x - state.curveTip[0];
          const dy = y - state.curveTip[1];
          const dist = Math.hypot(dx, dy);

          if (state.isCtrlDown) {
            state.stringLength = Math.max(15, dist);
            tetherLayer.appendChild(makeElement('svg:line', {
              x1: state.curveTip[0], y1: state.curveTip[1], x2: x, y2: y,
              stroke: '#a855f7', 'stroke-width': '2', 'stroke-dasharray': '4,4'
            }));
          } else if (dist > state.stringLength) {
            const pull = dist - state.stringLength;
            const ux = dx / dist;
            const uy = dy / dist;
            state.curveTip[0] += ux * pull;
            state.curveTip[1] += uy * pull;

            state.tetherStream.push([state.curveTip[0], state.curveTip[1]]);

            tetherLayer.appendChild(makeElement('svg:line', {
              x1: state.curveTip[0], y1: state.curveTip[1], x2: x, y2: y,
              stroke: '#38bdf8', 'stroke-width': '1.5', 'stroke-dasharray': '3,3'
            }));

            if (state.vertices.length === 0 || Math.hypot(state.curveTip[0] - state.vertices[state.vertices.length - 1].point[0], state.curveTip[1] - state.vertices[state.vertices.length - 1].point[1]) > 45) {
              const vertexClass = (typeof BezierVertex !== 'undefined') ? BezierVertex : globalThis.BezierVertex;
              const v = new vertexClass([state.curveTip[0], state.curveTip[1]]);
              v.curvature = state.currentCurvature;
              v.balance = state.currentBalance;
              state.vertices.push(v);
              updateSpline();
            }
          }
        }
      });

      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Control') state.isCtrlDown = true;
        if (e.key === 'Shift') {
          state.isShiftDown = true;
          if (state.vertices.length > 1) {
            state.vertices.pop();
            state.curveTip = state.vertices[state.vertices.length - 1].point.slice();
            updateSpline();
          }
        }
      });

      wrap.addEventListener('keyup', (e) => {
        if (e.key === 'Control') state.isCtrlDown = false;
        if (e.key === 'Shift') state.isShiftDown = false;
      });

      container.appendChild(wrap);
    }
}

globalThis.CurveDrawerLabComponent = CurveDrawerLabComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CurveDrawerLabComponent;