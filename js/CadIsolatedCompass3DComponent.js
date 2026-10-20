class CadIsolatedCompass3DComponent {

  static async render(container) {
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
          gap: '8px',
          zIndex: 10
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('span', { style: { fontSize: '15px' } }, '🧭'),
          makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'accuCad [Sub-View: Zoomed 3D Squircle Compass]'),
          makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Single-Source accuCad Instance')
        ]),
        makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' } }, 'Single-stroke plane keys [T/F/S/V] • Space toggles squircle')
      ]);
      wrap.appendChild(header);

      const canvasMount = makeElement('div', {
        id: 'accucad-mount-isolated-compass',
        style: { width: '100%', height: '360px', position: 'relative', background: '#050811' }
      });
      wrap.appendChild(canvasMount);

      const hud = makeElement('div', {
        style: {
          padding: '8px 14px', background: '#0d1117', borderTop: '1px solid #161e2b',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '8px', fontSize: '11px', fontFamily: 'monospace', zIndex: 10
        }
      }, [
        makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
          makeElement('span', { style: { color: '#94a3b8' } }, 'Plane:'),
          makeElement('button', { className: 'dr-nav-btn primary', onclick: () => app?.baseController?.setDrawingPlane('top') }, '[T] Top'),
          makeElement('button', { className: 'dr-nav-btn', onclick: () => app?.baseController?.setDrawingPlane('front') }, '[F] Front'),
          makeElement('button', { className: 'dr-nav-btn', onclick: () => app?.baseController?.setDrawingPlane('side') }, '[S] Side'),
          makeElement('button', { className: 'dr-nav-btn', onclick: () => togglePulse() }, 'Pulse Ticks')
        ]),
        makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8' } }, [
          'Squircle: ',
          makeElement('input', {
            type: 'range', min: '0', max: '1', step: '0.05', value: '0.5',
            style: { width: '80px', accentColor: '#38bdf8', cursor: 'pointer' },
            oninput: (e) => {
              if (app?.baseController?.accuDraw?.setSquircleAnimated) {
                app.baseController.accuDraw.setSquircleAnimated(parseFloat(e.target.value), 0);
              }
            }
          })
        ])
      ]);
      wrap.appendChild(hud);
      container.appendChild(wrap);

      let app = null;
      let instId = null;

      const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
      if (isLoaded && globalThis.Main) {
        app = new globalThis.Main();
        await app.run({
          container: canvasMount,
          showSidePanel: false,
          showCompassUi: false,
          cameraPos: { x: 0, y: 1.4, z: 2.2 },
          target: [0, 0, 0],
          compassSize: 0.95,
          squircle: 0.5,
          background: 0x050811,
          initialPlane: 'top'
        });
        instId = CadStudioDemoComponent.registerInstance(app, canvasMount, 'Isolated Compass View');
      }

      let isPulsing = false;
      function togglePulse() {
        isPulsing = !isPulsing;
        if (app?.baseController?.accuDraw?.setAxisAnimation) {
          app.baseController.accuDraw.setAxisAnimation(isPulsing ? 'x' : null);
        }
      }

      const observer = new MutationObserver(() => {
        if (!document.body.contains(wrap)) {
          if (instId) CadStudioDemoComponent.unregisterInstance(instId);
          if (app && typeof app.destroy === 'function') app.destroy();
          observer.disconnect();
        }
      });
      observer.observe(wrap.parentNode || document.body, { childList: true });
    }
}

globalThis.CadIsolatedCompass3DComponent = CadIsolatedCompass3DComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadIsolatedCompass3DComponent;