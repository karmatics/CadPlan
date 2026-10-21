class CadChoreographyDemoComponent {
  /**
   * Production Showcase Component for Chapter 7.
   * Embeds an authentic 3D accuCad viewport wired directly to the CadChoreographyEngine,
   * running multi-scenario automated ghost drafter demonstrations with human takeover.
   */
  static async render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        width: '100%',
        minHeight: '620px',
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

    const toolbar = makeElement('div', {
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
        makeElement('span', { style: { fontSize: '15px' } }, '🎭'),
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'accuCad Autonomous Choreography & Takeover Studio'),
        makeElement('span', { id: 'choreo-status-badge', style: { fontSize: '10px', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, 'Ghost Drafter Playing')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        btnPlay = makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '4px 10px', fontSize: '10.5px', fontWeight: '800' },
          onclick: () => togglePlay()
        }, '⏸ Pause Tour'),
        scenarioSelect = makeElement('select', {
          style: {
            background: '#070a13', color: '#00f2fe', border: '1px solid rgba(0, 242, 254, 0.4)',
            borderRadius: '4px', padding: '3px 8px', fontSize: '10.5px', fontFamily: 'monospace', outline: 'none'
          },
          onchange: (e) => switchScenario(e.target.value)
        }, [
          makeElement('option', { value: 'plane_tour' }, 'Tour 1: 3D Planes (T, F, S, V)'),
          makeElement('option', { value: 'chord_snap' }, 'Tour 2: 50ms Chord Snap & Mini-Jack'),
          makeElement('option', { value: 'smart_lock' }, 'Tour 3: Smart Lock & Polar Squircle')
        ])
      ])
    ]);
    let btnPlay, scenarioSelect;
    wrap.appendChild(toolbar);

    const canvasMount = makeElement('div', {
      id: 'accucad-mount-choreography-studio',
      style: { width: '100%', height: '540px', minHeight: '480px', position: 'relative', background: '#050811' }
    });
    wrap.appendChild(canvasMount);

    const footer = makeElement('div', {
      style: {
        padding: '8px 14px', background: '#0d1117', borderTop: '1px solid #161e2b',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8'
      }
    }, [
      makeElement('span', {}, '💡 Hover or click canvas to take command manually. Tour resumes when idle.'),
      makeElement('span', { style: { color: '#10b981' } }, '● 60 FPS Native WebGL + AccuDrawLogic')
    ]);
    wrap.appendChild(footer);

    container.appendChild(wrap);

    let app = null;
    let instId = null;
    let engine = null;

    const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
    if (isLoaded && globalThis.Main) {
      app = new globalThis.Main();
      await app.run({
        container: canvasMount,
        showSidePanel: false,
        showCompassUi: false,
        presetGeometry: 'bracket',
        cameraPos: { x: 4.0, y: 3.5, z: 5.2 },
        target: [0, 0, 0],
        background: 0x050811,
        initialPlane: 'top'
      });

      instId = CadStudioDemoComponent.registerInstance(app, canvasMount, 'Choreography Studio');

      // Boot choreography engine
      engine = new CadChoreographyEngine(app, canvasMount, { scenario: 'plane_tour' });
      engine.start();
    }

    function togglePlay() {
      if (!engine) return;
      engine.toggle();
      btnPlay.textContent = engine.isPlaying ? '⏸ Pause Tour' : '▶ Play Tour';
      const badge = document.getElementById('choreo-status-badge');
      if (badge) {
        badge.textContent = engine.isPlaying ? 'Ghost Drafter Playing' : 'Manual / Paused';
      }
    }

    function switchScenario(key) {
      if (!engine) return;
      engine.start(key);
      btnPlay.textContent = '⏸ Pause Tour';
      const badge = document.getElementById('choreo-status-badge');
      if (badge) badge.textContent = 'Ghost Drafter Playing';
    }

    const observer = new MutationObserver(() => {
      if (!document.body.contains(wrap)) {
        if (engine) engine.destroy();
        if (instId) CadStudioDemoComponent.unregisterInstance(instId);
        if (app && typeof app.destroy === 'function') app.destroy();
        observer.disconnect();
      }
    });
    observer.observe(wrap.parentNode || document.body, { childList: true });
  }
}

globalThis.CadChoreographyDemoComponent = CadChoreographyDemoComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadChoreographyDemoComponent;