class CurveDrawerLabComponent {

  static render(container) {
      container.innerHTML = '';

      const wrap = makeElement('div', {
        style: {
          width: '100%',
          minHeight: '620px',
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

      const modeGroup = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        btnPoints = makeElement('button', {
          className: 'dr-tab-btn active', id: 'btn-curve-lab-points',
          onclick: () => setToolMode('points')
        }, '✍️ On-Curve Points'),
        btnTether = makeElement('button', {
          className: 'dr-tab-btn', id: 'btn-curve-lab-tether',
          onclick: () => setToolMode('tether')
        }, '🪢 Kinetic String-Drag [Ctrl/Shift]'),
        btn3D = makeElement('button', {
          className: 'dr-tab-btn', id: 'btn-curve-lab-3d',
          onclick: () => setToolMode('3d')
        }, '🌐 3D Spline & Parallax (accuCad)')
      ]);
      let btnPoints, btnTether, btn3D;

      const statusEl = makeElement('span', {
        id: 'curve-lab-status',
        style: { fontSize: '11px', fontFamily: 'monospace', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '12px' }
      }, 'Mode: On-Curve Points • Click on-curve to relax G1 tangents');

      const rightControls = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        statusEl,
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px', color: '#ef4444' },
          onclick: () => resetLab()
        }, '🗑️ Clear')
      ]);

      toolbar.appendChild(modeGroup);
      toolbar.appendChild(rightControls);
      wrap.appendChild(toolbar);

      const hintEl = makeElement('span', { id: 'tether-hint', style: { color: '#a855f7', display: 'none', fontSize: '10.5px' } }, 'Hold [Ctrl] to extend string • Release to pull • Hold [Shift] to backtrack/undo');

      const subBar = makeElement('div', {
        id: 'curve-lab-subbar',
        style: {
          padding: '6px 14px', background: '#0d1117', borderBottom: '1px solid #161e2b',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px'
        }
      });

      const slidersHolder = makeElement('div', {
        style: { display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }
      });

      const curvMount = makeElement('div', { style: { width: '170px' } });
      new SliderControl({
        label: 'Curvature', min: 0.1, max: 2.5, initialValue: 1.0, showValue: true, directEntry: true,
        callback: (v) => { state.currentCurvature = v; updateSpline(); }
      }).appendTo(curvMount);
      slidersHolder.appendChild(curvMount);

      const balMount = makeElement('div', { style: { width: '170px' } });
      new SliderControl({
        label: 'Balance', min: 0.1, max: 1.9, initialValue: 1.0, showValue: true, directEntry: true,
        callback: (v) => { state.currentBalance = v; updateSpline(); }
      }).appendTo(balMount);
      slidersHolder.appendChild(balMount);

      subBar.appendChild(slidersHolder);
      subBar.appendChild(hintEl);
      wrap.appendChild(subBar);

      const W = 800;
      const H = 460;

      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${W} ${H}`,
        width: '100%',
        height: '460px',
        style: { display: 'block', background: '#090d16', cursor: 'crosshair' }
      });

      const gridPattern = makeElement('svg:pattern', {
        id: 'curve-lab-grid', width: '20', height: '20', patternUnits: 'userSpaceOnUse'
      }, [
        makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.04)', 'stroke-width': '1' })
      ]);
      svg.appendChild(makeElement('svg:defs', {}, gridPattern));
      svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#curve-lab-grid)' }));

      const tetherLayer = makeElement('svg:g');
      const splineLayer = makeElement('svg:g');
      const controlPolygonLayer = makeElement('svg:g');
      const verticesLayer = makeElement('svg:g');

      svg.appendChild(tetherLayer);
      svg.appendChild(splineLayer);
      svg.appendChild(controlPolygonLayer);
      svg.appendChild(verticesLayer);
      wrap.appendChild(svg);

      // Live 3D accuCad mount
      const mount3D = makeElement('div', {
        id: 'accucad-mount-curvedrawer-3d',
        style: { width: '100%', height: '460px', display: 'none', position: 'relative', background: '#050811' }
      });
      wrap.appendChild(mount3D);

      container.appendChild(wrap);

      let app3D = null;
      let instId = null;

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

      async function setToolMode(mode) {
        state.toolMode = mode;
        btnPoints.classList.toggle('active', mode === 'points');
        btnTether.classList.toggle('active', mode === 'tether');
        btn3D.classList.toggle('active', mode === '3d');

        if (mode === '3d') {
          svg.style.display = 'none';
          subBar.style.display = 'none';
          mount3D.style.display = 'block';
          statusEl.textContent = 'Mode: 3D On-Curve Spline (accuCad) • Camera Parallax Oscillation Active';

          if (!app3D) {
            const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
            if (isLoaded && globalThis.Main) {
              app3D = new globalThis.Main();
              await app3D.run({
                container: mount3D,
                showSidePanel: false,
                showCompassUi: false,
                initialTool: 'curve',
                cameraPos: { x: 3.5, y: 3.2, z: 4.8 },
                target: [0, 0, 0],
                background: 0x050811,
                initialPlane: 'top'
              });

              instId = CadStudioDemoComponent.registerInstance(app3D, mount3D, 'Curve Drawer 3D Parallax');
              if (typeof CameraOrbitAnimator !== 'undefined') {
                CameraOrbitAnimator.start();
              }
            }
          }
        } else {
          svg.style.display = 'block';
          subBar.style.display = 'flex';
          mount3D.style.display = 'none';

          if (mode === 'tether') {
            hintEl.style.display = 'inline';
            statusEl.textContent = 'Mode: Kinetic Tether [Hold Ctrl to set string, drag to tow curve]';
          } else {
            hintEl.style.display = 'none';
            statusEl.textContent = 'Mode: On-Curve Points • Click on curve to relax G1 tangents';
          }
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

        UpdateControlPoints.run(state.vertices, 8);

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

        const v = new BezierVertex([x, y]);
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

            const lastVertex = state.vertices[state.vertices.length - 1];
            const distToLast = lastVertex ? Math.hypot(state.curveTip[0] - lastVertex.point[0], state.curveTip[1] - lastVertex.point[1]) : Infinity;

            if (distToLast > 40) {
              const v = new BezierVertex([state.curveTip[0], state.curveTip[1]]);
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

      const observer = new MutationObserver(() => {
        if (!document.body.contains(wrap)) {
          if (instId && typeof CadStudioDemoComponent !== 'undefined') {
            CadStudioDemoComponent.unregisterInstance(instId);
          }
          if (typeof CameraOrbitAnimator !== 'undefined') {
            CameraOrbitAnimator.stop();
          }
          if (app3D && typeof app3D.destroy === 'function') {
            app3D.destroy();
          }
          observer.disconnect();
        }
      });
      observer.observe(wrap.parentNode || document.body, { childList: true });
    }
}

globalThis.CurveDrawerLabComponent = CurveDrawerLabComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CurveDrawerLabComponent;