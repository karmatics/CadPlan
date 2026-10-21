class CadTouchP2PGraphicComponent {

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
          userSelect: 'none'
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
          makeElement('span', { style: { fontSize: '15px' } }, '📱'),
          makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'Two-Handed CAD & TouchController Live Studio'),
          makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Kinetic Inertia')
        ]),
        makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
          btnSim = makeElement('button', {
            className: 'dr-tab-btn active', id: 'btn-touch-tab-sim',
            onclick: () => switchView('sim')
          }, '📱 Touch Trackpads'),
          btnLive = makeElement('button', {
            className: 'dr-tab-btn', id: 'btn-touch-tab-live',
            onclick: () => switchView('live')
          }, '🎮 Live 3D accuCad Engine')
        ])
      ]);
      let btnSim, btnLive;
      wrap.appendChild(header);

      const stage = makeElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 360px) 1fr',
          minHeight: '380px',
          background: '#090d16',
          borderBottom: '1px solid #21262d'
        }
      });

      const phoneShell = makeElement('div', {
        style: {
          padding: '16px',
          background: '#0c1220',
          borderRight: '1px solid #21262d',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }
      });

      phoneShell.appendChild(makeElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }
      }, [
        makeElement('strong', { style: { color: '#00f2fe' } }, 'TOUCH CONTROLLER (LEFT HAND)'),
        makeElement('span', { style: { color: '#10b981', fontSize: '10px' } }, '● P2P Active')
      ]));

      const trackpadsBox = makeElement('div', {
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', flex: 1, minHeight: '260px' }
      });

      const leftPad = makeElement('div', {
        id: 'sim-left-trackpad',
        style: {
          background: '#161e2b',
          border: '1.5px solid rgba(56, 189, 248, 0.4)',
          borderRadius: '10px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'grab',
          touchAction: 'none',
          position: 'relative'
        }
      }, [
        makeElement('div', { style: { fontSize: '10px', fontWeight: 'bold', color: '#38bdf8', fontFamily: 'monospace' } }, 'LEFT TRACKPAD\n[Navigation]'),
        makeElement('div', { style: { fontSize: '9px', color: '#64748b', textAlign: 'center', lineHeight: '1.4' } }, 'Drag/Flick: Orbit\nWheel: Zoom\nDouble-tap: Mode'),
        makeElement('div', { id: 'sim-left-status', style: { fontSize: '9px', color: '#10b981', fontFamily: 'monospace', textAlign: 'center' } }, 'Orbit: active')
      ]);

      const rightPad = makeElement('div', {
        id: 'sim-right-trackpad',
        style: {
          background: '#161e2b',
          border: '1.5px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '10px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'ew-resize',
          touchAction: 'none',
          position: 'relative'
        }
      }, [
        makeElement('div', { style: { fontSize: '10px', fontWeight: 'bold', color: '#10b981', fontFamily: 'monospace' } }, 'RIGHT TRACKPAD\n[Sliders & Tools]'),
        makeElement('div', { style: { fontSize: '9px', color: '#64748b', textAlign: 'center', lineHeight: '1.4' } }, '↕ Vertical: Pick Slider\n↔ Horiz: Scrub Value'),
        makeElement('div', { id: 'sim-right-status', style: { fontSize: '9px', color: '#f59e0b', fontFamily: 'monospace', textAlign: 'center' } }, 'Target: Fillet R')
      ]);

      trackpadsBox.appendChild(leftPad);
      trackpadsBox.appendChild(rightPad);
      phoneShell.appendChild(trackpadsBox);
      stage.appendChild(phoneShell);

      const viewportArea = makeElement('div', {
        id: 'touch-viewport-host-area',
        style: { flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }
      });

      const svgW = 420, svgH = 300;
      const svg = makeElement('svg:svg', {
        id: 'touch-sim-svg',
        viewBox: `0 0 ${svgW} ${svgH}`, width: '100%', height: '300px',
        style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '8px' }
      });

      const gridPat = makeElement('svg:pattern', { id: 'sim-grid-pat', width: '20', height: '20', patternUnits: 'userSpaceOnUse' },
        makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '1' })
      );
      svg.appendChild(makeElement('svg:defs', {}, gridPat));
      svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#sim-grid-pat)' }));

      const liveModelLayer = makeElement('svg:g');
      svg.appendChild(liveModelLayer);
      viewportArea.appendChild(svg);

      // Live 3D WebGL mount for accuCad
      const liveMount3D = makeElement('div', {
        id: 'accucad-mount-touch-p2p-live',
        style: { width: '100%', height: '300px', display: 'none', position: 'relative', background: '#050811', borderRadius: '8px', overflow: 'hidden' }
      });
      viewportArea.appendChild(liveMount3D);

      stage.appendChild(viewportArea);
      wrap.appendChild(stage);

      const slidersDeck = makeElement('div', {
        style: {
          padding: '10px 16px', background: '#0a0e1a', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
          fontSize: '11px', fontFamily: 'monospace'
        }
      });

      const slider1 = makeElement('div', { id: 'sim-slider-row-0', style: { padding: '4px 8px', borderRadius: '4px', border: '1px solid #00f2fe' } }, [
        makeElement('span', { style: { color: '#00f2fe', fontWeight: 'bold' } }, '1. Corner Fillet R: '),
        makeElement('span', { id: 'sim-val-fillet' }, '25px')
      ]);

      const slider2 = makeElement('div', { id: 'sim-slider-row-1', style: { padding: '4px 8px', borderRadius: '4px', border: '1px solid #334155' } }, [
        makeElement('span', { style: { color: '#10b981', fontWeight: 'bold' } }, '2. Line Width: '),
        makeElement('span', { id: 'sim-val-depth' }, '4px')
      ]);

      const slider3 = makeElement('div', { id: 'sim-slider-row-2', style: { padding: '4px 8px', borderRadius: '4px', border: '1px solid #334155' } }, [
        makeElement('span', { style: { color: '#f59e0b', fontWeight: 'bold' } }, '3. AccuDraw Z: '),
        makeElement('span', { id: 'sim-val-z' }, '0mm')
      ]);

      slidersDeck.appendChild(slider1);
      slidersDeck.appendChild(slider2);
      slidersDeck.appendChild(slider3);
      wrap.appendChild(slidersDeck);

      container.appendChild(wrap);

      let app = null;
      let instId = null;

      const state = {
        rotX: 25, rotY: -35, velX: 0, velY: 0, zoom: 1.0,
        activeSliderIdx: 0, filletR: 25, lineWidth: 4, elevationZ: 0,
        inertiaId: null
      };

      function render3DModel() {
        liveModelLayer.innerHTML = '';
        const cx = svgW / 2;
        const cy = svgH / 2 + 10 - state.elevationZ * 0.4;
        const scale = 0.9 * state.zoom;

        const radX = (state.rotX * Math.PI) / 180;
        const radY = (state.rotY * Math.PI) / 180;

        const project = (x, y, z) => {
          const x1 = x * Math.cos(radY) + z * Math.sin(radY);
          const z1 = -x * Math.sin(radY) + z * Math.cos(radY);
          const y2 = y * Math.cos(radX) - z1 * Math.sin(radX);
          const z2 = y * Math.sin(radX) + z1 * Math.cos(radX);
          return [cx + x1 * scale, cy - y2 * scale];
        };

        const w = 90, h = 60, d = 40;

        const p1 = project(-w, -h, -d);
        const p2 = project(w, -h, -d);
        const p3 = project(w, h, -d);
        const p4 = project(-w, h, -d);
        const p5 = project(-w, -h, d);
        const p6 = project(w, -h, d);
        const p7 = project(w, h, d);
        const p8 = project(-w, h, d);

        [ [p1, p2], [p2, p3], [p3, p4], [p4, p1] ].forEach(pair => {
          liveModelLayer.appendChild(makeElement('svg:line', {
            x1: pair[0][0], y1: pair[0][1], x2: pair[1][0], y2: pair[1][1],
            stroke: 'rgba(56, 189, 248, 0.25)', 'stroke-width': '1.5', 'stroke-dasharray': '3,3'
          }));
        });

        [ [p1, p5], [p2, p6], [p3, p7], [p4, p8] ].forEach(pair => {
          liveModelLayer.appendChild(makeElement('svg:line', {
            x1: pair[0][0], y1: pair[0][1], x2: pair[1][0], y2: pair[1][1],
            stroke: '#38bdf8', 'stroke-width': String(state.lineWidth * 0.5)
          }));
        });

        liveModelLayer.appendChild(makeElement('svg:polygon', {
          points: `${p5[0]},${p5[1]} ${p6[0]},${p6[1]} ${p7[0]},${p7[1]} ${p8[0]},${p8[1]}`,
          fill: 'rgba(0, 242, 254, 0.12)', stroke: '#00f2fe', 'stroke-width': String(state.lineWidth * 0.6)
        }));

        const compG = makeElement('svg:g', {
          transform: `translate(${p7[0]}, ${p7[1]}) rotate(${state.rotY * 0.5}) scale(0.42)`
        });
        const compassSvg = SquircleCompassSvg.renderElement({ size: 90, squircle: 0.45, activeAxis: 'x' });
        compassSvg.setAttribute('x', '-45');
        compassSvg.setAttribute('y', '-45');
        compG.appendChild(compassSvg);
        liveModelLayer.appendChild(compG);
      }

      function startInertia() {
        if (state.inertiaId) cancelAnimationFrame(state.inertiaId);
        const friction = 0.94;

        const step = () => {
          state.velX *= friction;
          state.velY *= friction;

          if (Math.hypot(state.velX, state.velY) < 0.08) {
            state.inertiaId = null;
            return;
          }

          state.rotY += state.velX;
          state.rotX = Math.max(-80, Math.min(80, state.rotX - state.velY));

          if (app?.baseController) {
            app.baseController.handleRemoteDrag(state.velX * 0.8, -state.velY * 0.8, 'rotate');
          }

          render3DModel();
          state.inertiaId = requestAnimationFrame(step);
        };
        state.inertiaId = requestAnimationFrame(step);
      }

      let leftDragging = false;
      let leftStartX = 0, leftStartY = 0;

      leftPad.addEventListener('pointerdown', (e) => {
        leftDragging = true;
        if (state.inertiaId) cancelAnimationFrame(state.inertiaId);
        leftStartX = e.clientX;
        leftStartY = e.clientY;
        state.velX = 0;
        state.velY = 0;
        leftPad.style.cursor = 'grabbing';
        leftPad.setPointerCapture(e.pointerId);
      });

      leftPad.addEventListener('pointermove', (e) => {
        if (!leftDragging) return;
        const dx = (e.clientX - leftStartX) * 0.8;
        const dy = (e.clientY - leftStartY) * 0.8;
        leftStartX = e.clientX;
        leftStartY = e.clientY;

        state.velX = state.velX * 0.3 + dx * 0.7;
        state.velY = state.velY * 0.3 + dy * 0.7;

        state.rotY += dx;
        state.rotX = Math.max(-80, Math.min(80, state.rotX - dy));

        if (app?.baseController) {
          app.baseController.handleRemoteDrag(dx * 1.2, -dy * 1.2, 'rotate');
        }

        render3DModel();
        document.getElementById('sim-left-status').textContent = `Rot: ${state.rotX.toFixed(0)}°, ${state.rotY.toFixed(0)}°`;
      });

      leftPad.addEventListener('pointerup', () => {
        leftDragging = false;
        leftPad.style.cursor = 'grab';
        if (Math.hypot(state.velX, state.velY) > 0.5) {
          startInertia();
        }
      });

      leftPad.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomFactor = 1.0 - e.deltaY * 0.0015;
        state.zoom = Math.max(0.5, Math.min(2.5, state.zoom * zoomFactor));

        if (app?.baseController) {
          app.baseController.handleRemoteZoom(zoomFactor);
        }
        render3DModel();
      }, { passive: false });

      let rightDragging = false;
      let rightStartX = 0, rightStartY = 0;

      rightPad.addEventListener('pointerdown', (e) => {
        rightDragging = true;
        rightStartX = e.clientX;
        rightStartY = e.clientY;
        rightPad.setPointerCapture(e.pointerId);
      });

      rightPad.addEventListener('pointermove', (e) => {
        if (!rightDragging) return;
        const dx = e.clientX - rightStartX;
        const dy = e.clientY - rightStartY;

        if (Math.abs(dy) > Math.abs(dx) * 1.5 && Math.abs(dy) > 20) {
          rightStartY = e.clientY;
          if (dy > 0) state.activeSliderIdx = (state.activeSliderIdx + 1) % 3;
          else state.activeSliderIdx = (state.activeSliderIdx - 1 + 3) % 3;

          [0, 1, 2].forEach(i => {
            const row = document.getElementById(`sim-slider-row-${i}`);
            if (row) row.style.borderColor = i === state.activeSliderIdx ? '#00f2fe' : '#334155';
          });

          const names = ['Fillet R', 'Line Width', 'AccuDraw Z'];
          document.getElementById('sim-right-status').textContent = `Active: ${names[state.activeSliderIdx]}`;
        } else if (Math.abs(dx) > 2) {
          rightStartX = e.clientX;
          if (state.activeSliderIdx === 0) {
            state.filletR = Math.max(0, Math.min(60, state.filletR + dx * 0.5));
            document.getElementById('sim-val-fillet').textContent = `${state.filletR.toFixed(0)}px`;
            if (app?.baseController) app.baseController.commandControlValue = state.filletR * 0.05;
          } else if (state.activeSliderIdx === 1) {
            state.lineWidth = Math.max(1, Math.min(16, state.lineWidth + dx * 0.2));
            document.getElementById('sim-val-depth').textContent = `${state.lineWidth.toFixed(0)}px`;
            if (app?.baseController) app.baseController.setLineWidth(Math.round(state.lineWidth));
          } else {
            state.elevationZ = Math.max(-50, Math.min(50, state.elevationZ + dx * 0.5));
            document.getElementById('sim-val-z').textContent = `${state.elevationZ.toFixed(0)}mm`;
            if (app?.baseController) app.baseController.handleRemoteDrag(0, -dx * 0.2, 'pan');
          }
          render3DModel();
        }
      });

      rightPad.addEventListener('pointerup', () => {
        rightDragging = false;
      });

      async function switchView(mode) {
        btnSim.classList.toggle('active', mode === 'sim');
        btnLive.classList.toggle('active', mode === 'live');

        if (mode === 'live') {
          svg.style.display = 'none';
          liveMount3D.style.display = 'block';

          if (!app) {
            const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
            if (isLoaded && globalThis.Main) {
              app = new globalThis.Main();
              await app.run({
                container: liveMount3D,
                showSidePanel: false,
                showCompassUi: false,
                presetGeometry: 'bracket',
                cameraPos: { x: 3.8, y: 3.2, z: 4.8 },
                target: [0, 0, 0],
                background: 0x050811,
                initialPlane: 'top'
              });

              instId = CadStudioDemoComponent.registerInstance(app, liveMount3D, 'Touch P2P Live Viewport');
            }
          }
        } else {
          svg.style.display = 'block';
          liveMount3D.style.display = 'none';
        }
      }

      render3DModel();

      const observer = new MutationObserver(() => {
        if (!document.body.contains(wrap)) {
          if (instId && typeof CadStudioDemoComponent !== 'undefined') {
            CadStudioDemoComponent.unregisterInstance(instId);
          }
          if (app && typeof app.destroy === 'function') {
            app.destroy();
          }
          observer.disconnect();
        }
      });
      observer.observe(wrap.parentNode || document.body, { childList: true });
    }
}

globalThis.CadTouchP2PGraphicComponent = CadTouchP2PGraphicComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadTouchP2PGraphicComponent;