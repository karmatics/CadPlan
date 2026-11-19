class CadTouchLegoWidget {
  /**
   * Slick Lego Mini-Widget: On-Demand TouchController P2P Slice.
   * Starts as a lean ThreeJSLoader + AccuDraw scene (zero PeerJS/QRCode loaded).
   * Clicking "Connect Phone" snaps in Library/QRCodeGenerator + Library/P2PConnector on demand.
   */
  static async render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        width: '100%',
        background: '#070a13',
        border: '1.5px solid #21262d',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 14px 36px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column'
      }
    });

    let statusPill, btnLoadTouch;

    const header = makeElement('div', {
      style: {
        padding: '9px 14px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid #21262d',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' } }, [
        makeElement('span', { style: { fontSize: '14px' } }, '📱'),
        makeElement('strong', { style: { fontSize: '12.5px', color: '#00f2fe', fontFamily: 'monospace' } }, 'Lego Slice: On-Demand P2P TouchController'),
        statusPill = makeElement('span', {
          style: { fontSize: '10px', background: 'rgba(56, 189, 248, 0.14)', color: '#38bdf8', border: '1px solid #38bdf844', padding: '2px 7px', borderRadius: '10px', fontFamily: 'monospace' }
        }, 'Touch Slice: Not Loaded')
      ]),
      btnLoadTouch = makeElement('button', {
        className: 'dr-nav-btn primary',
        style: { padding: '4px 10px', fontSize: '10.5px', fontWeight: 'bold' },
        onclick: () => loadTouchSlice()
      }, '📱 Snap In TouchController')
    ]);
    wrap.appendChild(header);

    const grid = makeElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: '210px 1fr',
        minHeight: '300px',
        background: '#0d1117',
        gap: '1px'
      }
    });

    const phoneTray = makeElement('div', {
      style: {
        background: '#0f141e',
        borderRight: '1px solid #21262d',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'monospace',
        fontSize: '10.5px',
        color: '#94a3b8',
        textAlign: 'center'
      }
    }, [
      makeElement('div', { style: { color: '#f8fafc', fontWeight: 'bold' } }, 'Zero Preloaded WebRTC'),
      makeElement('div', {}, 'PeerJS & QRCode stay unloaded until you click "Snap In TouchController".')
    ]);

    const canvasId = 'lego-touch-widget-' + Math.random().toString(36).slice(2);
    const mount = makeElement('div', {
      id: canvasId,
      tabIndex: 0,
      style: { width: '100%', height: '300px', position: 'relative', background: '#050811', outline: 'none' }
    });

    grid.appendChild(phoneTray);
    grid.appendChild(mount);
    wrap.appendChild(grid);
    container.appendChild(wrap);

    let threeApp = null;
    let slice = null;
    let touchLoaded = false;

    async function loadTouchSlice() {
      if (!slice || touchLoaded) return;
      btnLoadTouch.textContent = '⏳ Loading P2P Slice...';
      try {
        await slice.loadTouchController(phoneTray);
        touchLoaded = true;
        btnLoadTouch.textContent = '✓ Touch Slice Loaded';
        statusPill.textContent = 'Touch Slice: QR Active';
        statusPill.style.color = '#10b981';
        statusPill.style.borderColor = '#10b98144';
      } catch (err) {
        btnLoadTouch.textContent = '📱 Snap In TouchController';
        statusPill.textContent = 'Error: ' + err.message;
      }
    }

    const boot = async () => {
      if (typeof ThreeJSLoader === 'undefined') return;
      threeApp = new ThreeJSLoader(canvasId, {
        cameraPos: { x: 2.2, y: 2.0, z: 2.8 },
        enableControls: true,
        useThickLines: true,
        environment: false,
        lighting: true
      });
      await threeApp.init(mount);
      if (!wrap.isConnected) { threeApp.destroy(); return; }

      const THREE = threeApp.THREE;
      threeApp.scene.background = new THREE.Color(0x050811);

      if (typeof Simple3dShapes !== 'undefined') {
        Simple3dShapes.buildPrimitives(threeApp, threeApp.scene);
      }

      slice = await threeApp.loadAccuDraw({
        size: 0.8,
        center: [0, 0.02, 0],
        showUi: false,
        keyboard: true,
        snapping: true,
        wheelZoomMode: 'when-focused',
        keyboardContainer: mount,
        extraContainers: [wrap]
      });
    };

    boot();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (threeApp) threeApp.isPaused = !entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    io.observe(wrap);

    const observer = new MutationObserver(() => {
      if (!document.body.contains(wrap)) {
        io.disconnect();
        if (slice) try { slice.destroy(); } catch (e) {}
        if (threeApp) try { threeApp.destroy(); } catch (e) {}
        observer.disconnect();
      }
    });
    observer.observe(wrap.parentNode || document.body, { childList: true });
  }
}

globalThis.CadTouchLegoWidget = CadTouchLegoWidget;
if (typeof module !== 'undefined' && module.exports) module.exports = CadTouchLegoWidget;