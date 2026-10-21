class CadIsolatedCompass3DComponent {

  static async render(container) {
    container.innerHTML = '';

    let isFullscreen = false;
    let isShowPlaying = false;
    let showRafId = null;
    let showStartTime = 0;

    const wrap = makeElement('div', {
      style: {
        background: '#070a13',
        border: '1.5px solid #21262d',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }
    });

    const toggleExpand = () => {
      isFullscreen = !isFullscreen;
      if (isFullscreen) {
        wrap.style.position = 'fixed';
        wrap.style.top = '0';
        wrap.style.left = '0';
        wrap.style.width = '100vw';
        wrap.style.height = '100vh';
        wrap.style.zIndex = '999999';
        btnExpand.textContent = '✕ Exit Fullscreen';
        btnExpand.style.color = '#ef4444';
        btnExpand.style.borderColor = '#ef444466';
      } else {
        wrap.style.position = 'relative';
        wrap.style.top = 'auto';
        wrap.style.left = 'auto';
        wrap.style.width = '100%';
        wrap.style.height = 'auto';
        wrap.style.zIndex = 'auto';
        btnExpand.textContent = '⛶ Fullscreen';
        btnExpand.style.color = '#38bdf8';
        btnExpand.style.borderColor = '#38bdf866';
      }
      setTimeout(() => {
        if (app?.app?.resize) {
          const r = canvasMount.getBoundingClientRect();
          app.app.resize(r.width, r.height);
        }
      }, 100);
    };

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
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'accuCad [Sub-View: 3D Squircle Compass Showcase]'),
        makeElement('span', { id: 'compass-show-status', style: { fontSize: '10px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, 'Interactive Manual Mode')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        btnShow = makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '4px 10px', fontSize: '10.5px', fontWeight: '800' },
          onclick: () => toggleShowMode()
        }, '🎭 Start Compass Show'),
        btnExpand = makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 8px', fontSize: '10px', color: '#38bdf8', borderColor: '#38bdf866' },
          onclick: toggleExpand
        }, '⛶ Fullscreen')
      ])
    ]);
    let btnShow, btnExpand;
    wrap.appendChild(header);

    const canvasMount = makeElement('div', {
      id: 'accucad-mount-isolated-compass',
      style: { width: '100%', height: '420px', minHeight: '380px', position: 'relative', background: '#050811' }
    });
    wrap.appendChild(canvasMount);

    // Progressive Disclosure: Quick Camera & Styling Toolbar
    const quickToolbar = makeElement('div', {
      style: {
        padding: '8px 14px', background: '#0d1117', borderTop: '1px solid #161e2b',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '10px', fontSize: '11px', fontFamily: 'monospace', zIndex: 10
      }
    }, [
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        makeElement('span', { style: { color: '#94a3b8', fontWeight: 'bold' } }, 'Plane:'),
        makeElement('button', { className: 'dr-nav-btn primary', onclick: () => { pauseShow(); app?.baseController?.setDrawingPlane('top'); updateTelemetry(); } }, '[T] Top'),
        makeElement('button', { className: 'dr-nav-btn', onclick: () => { pauseShow(); app?.baseController?.setDrawingPlane('front'); updateTelemetry(); } }, '[F] Front'),
        makeElement('button', { className: 'dr-nav-btn', onclick: () => { pauseShow(); app?.baseController?.setDrawingPlane('side'); updateTelemetry(); } }, '[S] Side'),
        makeElement('button', { className: 'dr-nav-btn', onclick: () => { pauseShow(); app?.baseController?.setDrawingPlane('view'); updateTelemetry(); } }, '[V] View'),
        makeElement('button', { className: 'dr-nav-btn', style: { color: '#f59e0b', borderColor: '#f59e0b55' }, onclick: () => togglePulse() }, 'Pulse [X/Y]')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        makeElement('span', { style: { color: '#c084fc', fontWeight: 'bold' } }, 'Style:'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setStyle('cyber') }, 'Cyber'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px', color: '#d4af37' }, onclick: () => setStyle('steampunk') }, 'Brass ⚙️'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setStyle('classic') }, '1995'),
        makeElement('button', {
          className: 'dr-nav-btn',
          id: 'btn-toggle-telemetry-drawer',
          style: { padding: '2px 8px', fontSize: '10px', color: '#10b981', borderColor: '#10b98166' },
          onclick: () => toggleTelemetryDrawer()
        }, '📐 Matrix Math ▾')
      ])
    ]);
    wrap.appendChild(quickToolbar);

    // Progressive Disclosure Drawer: 3D Direction-Cosine Vector Telemetry
    const telemetryDrawer = makeElement('div', {
      id: 'compass-telemetry-drawer',
      style: {
        background: '#090d16', borderTop: '1px solid #232d3f', padding: '12px 16px',
        display: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px',
        fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.5'
      }
    }, [
      makeElement('div', { id: 'tel-basis-x', style: { background: '#050811', border: '1px solid #1e293b', padding: '8px', borderRadius: '6px', color: '#ef4444' } }, 'X Basis: [1.00, 0.00, 0.00]'),
      makeElement('div', { id: 'tel-basis-y', style: { background: '#050811', border: '1px solid #1e293b', padding: '8px', borderRadius: '6px', color: '#10b981' } }, 'Y Basis: [0.00, 0.00, -1.00]'),
      makeElement('div', { id: 'tel-basis-z', style: { background: '#050811', border: '1px solid #1e293b', padding: '8px', borderRadius: '6px', color: '#38bdf8' } }, 'Z Normal: [0.00, 1.00, 0.00]'),
      makeElement('div', { id: 'tel-origin', style: { background: '#050811', border: '1px solid #1e293b', padding: '8px', borderRadius: '6px', color: '#f8fafc' } }, 'Origin: [0.00, 0.00, 0.00]')
    ]);
    wrap.appendChild(telemetryDrawer);
    container.appendChild(wrap);

    let app = null;
    let instId = null;

    const boot = async () => {
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
        updateTelemetry();
      }
    };

    boot();

    let isPulsing = false;
    function togglePulse() {
      isPulsing = !isPulsing;
      if (app?.baseController?.accuDraw?.setAxisAnimation) {
        app.baseController.accuDraw.setAxisAnimation(isPulsing ? 'xy' : null);
      }
    }

    function setStyle(preset) {
      if (app?.baseController?.accuDraw?.setStylePreset) {
        app.baseController.accuDraw.setStylePreset(preset);
      }
    }

    function toggleTelemetryDrawer() {
      const isHidden = telemetryDrawer.style.display === 'none';
      telemetryDrawer.style.display = isHidden ? 'grid' : 'none';
      const btn = document.getElementById('btn-toggle-telemetry-drawer');
      if (btn) btn.textContent = isHidden ? '📐 Matrix Math ▴' : '📐 Matrix Math ▾';
      updateTelemetry();
    }

    function updateTelemetry() {
      if (!app?.baseController) return;
      const rm = app.baseController.rotationMatrix || [ [1,0,0], [0,1,0], [0,0,1] ];
      const o = app.baseController.origin || [0,0,0];

      const elX = document.getElementById('tel-basis-x');
      const elY = document.getElementById('tel-basis-y');
      const elZ = document.getElementById('tel-basis-z');
      const elO = document.getElementById('tel-origin');

      if (elX) elX.textContent = `X Basis: [${rm[0].map(n => n.toFixed(2)).join(', ')}]`;
      if (elY) elY.textContent = `Y Basis: [${rm[1].map(n => n.toFixed(2)).join(', ')}]`;
      if (elZ) elZ.textContent = `Z Normal: [${rm[2].map(n => n.toFixed(2)).join(', ')}]`;
      if (elO) elO.textContent = `Origin: [${o.map(n => n.toFixed(2)).join(', ')}]`;
    }

    function toggleShowMode() {
      isShowPlaying = !isShowPlaying;
      if (isShowPlaying) {
        btnShow.textContent = '⏸ Pause Show';
        btnShow.style.background = '#f59e0b';
        btnShow.style.color = '#000';
        const status = document.getElementById('compass-show-status');
        if (status) status.textContent = '🎭 Autonomous Choreography Playing (Touch to override)';
        startShowChoreography();
      } else {
        pauseShow();
      }
    }

    function pauseShow() {
      isShowPlaying = false;
      if (showRafId) cancelAnimationFrame(showRafId);
      showRafId = null;
      if (btnShow) {
        btnShow.textContent = '🎭 Start Compass Show';
        btnShow.style.background = '';
        btnShow.style.color = '';
      }
      const status = document.getElementById('compass-show-status');
      if (status) status.textContent = 'Interactive Manual Mode';
    }

    function startShowChoreography() {
      showStartTime = performance.now();
      let lastStep = -1;

      const step = (now) => {
        if (!isShowPlaying || !app?.baseController?.accuDraw) return;

        const elapsed = (now - showStartTime) / 1000;
        const phase = Math.floor(elapsed / 2.5) % 6;

        if (phase !== lastStep) {
          lastStep = phase;
          if (phase === 0) {
            app.baseController.setDrawingPlane('top');
            app.baseController.accuDraw.setSquircleAnimated(0.15, 0.4);
            app.baseController.accuDraw.setAxisAnimation('x');
          } else if (phase === 1) {
            app.baseController.setDrawingPlane('front');
            app.baseController.accuDraw.setSquircleAnimated(0.5, 0.4);
            app.baseController.accuDraw.setAxisAnimation(null);
          } else if (phase === 2) {
            app.baseController.setDrawingPlane('side');
            app.baseController.accuDraw.setSquircleAnimated(1.0, 0.4); // Polar Circle
            app.baseController.accuDraw.setAxisAnimation('y');
          } else if (phase === 3) {
            app.baseController.setDrawingPlane('top');
            app.baseController.accuDraw.setSquircleAnimated(0.5, 0.4);
            app.baseController.accuDraw.setAxisAnimation('xy'); // Origin Snap
          } else if (phase === 4) {
            app.baseController.setDrawingPlane('view');
            app.baseController.accuDraw.setSquircleAnimated(0.35, 0.4);
            app.baseController.accuDraw.setAxisAnimation(null);
          } else if (phase === 5) {
            // Camera gentle pan
            TransformView.transform({ spin: 12, tilt: -6 }, app.threeDView);
          }
          updateTelemetry();
        }

        showRafId = requestAnimationFrame(step);
      };

      showRafId = requestAnimationFrame(step);
    }

    // Seamless Takeover: Mouse or touch interaction immediately pauses autonomous show
    canvasMount.addEventListener('pointerdown', () => pauseShow());

    const observer = new MutationObserver(() => {
      if (!document.body.contains(wrap)) {
        pauseShow();
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