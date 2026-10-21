class CadDynamicDimensionHudLab {
  /**
   * Interactive Laboratory for Chapter 3.
   * Runs an authentic 3D accuCad instance with real-time dimension badges,
   * distance memory indexing, and chorded snapping feedback.
   */
  static async render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        width: '100%',
        minHeight: '580px',
        background: '#070a13',
        borderRadius: '12px',
        border: '1.5px solid #21262d',
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
        makeElement('span', { style: { fontSize: '15px' } }, '📐'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'accuCad Dynamic Dimension HUD & Distance Memory Lab'),
        makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Real-Time Vector Inset')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => app?.baseController?.setDrawingPlane('top')
        }, 'T: Top'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => app?.baseController?.setDrawingPlane('front')
        }, 'F: Front'),
        makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => {
            if (app?.baseController?.accuDrawLogic) {
              app.baseController.accuDrawLogic.handleSmartLock();
            }
          }
        }, '[L] Smart Lock')
      ])
    ]);
    wrap.appendChild(header);

    const canvasMount = makeElement('div', {
      id: 'accucad-mount-dimension-hud-lab',
      style: { width: '100%', height: '500px', minHeight: '440px', position: 'relative', background: '#050811' }
    });
    wrap.appendChild(canvasMount);

    // Floating Dimension Telemetry Overlay
    const overlay = makeElement('div', {
      style: {
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        background: 'rgba(15, 23, 42, 0.94)',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        borderRadius: '8px',
        padding: '8px 12px',
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#f8fafc',
        zIndex: 100,
        pointerEvents: 'none',
        lineHeight: '1.45',
        boxShadow: '0 4px 16px rgba(0,0,0,0.6)'
      }
    }, [
      makeElement('div', { style: { color: '#38bdf8', fontWeight: 'bold', marginBottom: '2px' } }, 'RELATIVE VECTOR DELTA:'),
      dimensionReadout = makeElement('div', {}, 'DX: +0.0000 | DY: +0.0000 | DZ: +0.0000'),
      polarReadout = makeElement('div', { style: { color: '#f59e0b', fontSize: '10px' } }, 'Dist: 0.0000 | Angle: 0.00°')
    ]);
    let dimensionReadout, polarReadout;
    wrap.appendChild(overlay);

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
        presetGeometry: 'bracket',
        cameraPos: { x: 3.2, y: 2.8, z: 4.2 },
        target: [0, 0, 0],
        background: 0x050811,
        initialPlane: 'top'
      });

      instId = CadStudioDemoComponent.registerInstance(app, canvasMount, 'Dimension HUD Lab');

      // Hook real-time cursor tracking for HUD overlay
      canvasMount.addEventListener('pointermove', () => {
        if (!app?.baseController?.accuDrawLogic) return;
        const logic = app.baseController.accuDrawLogic;
        const d = logic.lastLocalDelta || { x: 0, y: 0, z: 0 };
        const dist = Math.hypot(d.x, d.y);
        const angle = ((Math.atan2(d.y, d.x) * 180 / Math.PI) + 360) % 360;

        dimensionReadout.textContent = `DX: ${d.x >= 0 ? '+' : ''}${d.x.toFixed(4)} | DY: ${d.y >= 0 ? '+' : ''}${d.y.toFixed(4)} | DZ: ${d.z >= 0 ? '+' : ''}${d.z.toFixed(4)}`;
        polarReadout.textContent = `Dist: ${dist.toFixed(4)} | Angle: ${angle.toFixed(2)}° | Plane: ${app.baseController.rotationMatrix ? 'Aligned' : 'Default'}`;
      });
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

globalThis.CadDynamicDimensionHudLab = CadDynamicDimensionHudLab;
if (typeof module !== 'undefined' && module.exports) module.exports = CadDynamicDimensionHudLab;