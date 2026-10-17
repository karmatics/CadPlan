class AccuDrawDemoComponent {
  static render(containerElement) {
    const instance = new AccuDrawDemoComponent(containerElement);
    instance.init();
    return instance;
  }

  constructor(container) {
    this.container = container;
    this.isAutoPlaying = true;
    this.currentMode = 'rectangular'; // 'rectangular' | 'polar'
    this.activeAxisLock = null;
    this.canvasApp = null;
    this.simulatedTime = 0;
  }

  init() {
    this.container.innerHTML = '';
    this.renderLayout();
  }

  renderLayout() {
    const card = makeElement('div', {
      style: {
        background: 'var(--dr-surface, #171f2c)',
        border: '1.5px solid var(--dr-accent, #38bdf8)',
        borderRadius: '12px',
        padding: '18px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: 'var(--dr-font-sans, sans-serif)'
      }
    });

    // Header & Toolbar
    const topBar = makeElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '1.2rem' } }, '🎛️'),
        makeElement('strong', { style: { fontSize: '1rem', color: 'var(--dr-text, #f8fafc)' } }, 'Live AccuDraw Compass Demonstration'),
        makeElement('span', {
          style: {
            fontSize: '0.68rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px',
            background: 'rgba(56,189,248,0.15)', color: 'var(--dr-accent, #38bdf8)', border: '1px solid rgba(56,189,248,0.3)'
          }
        }, 'Interactive WebGL Canvas')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
        this.btnTogglePlay = makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 10px', fontSize: '0.75rem', fontWeight: 'bold' },
          onclick: () => this.togglePlayback()
        }, this.isAutoPlaying ? '⏸ Pause Auto Demo' : '▶ Play Auto Demo'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 10px', fontSize: '0.75rem' },
          onclick: () => this.switchMode()
        }, 'Space: Toggle Mode')
      ])
    ]);
    card.appendChild(topBar);

    // Callout badge explaining the active animation state
    this.statusCallout = makeElement('div', {
      style: {
        background: 'var(--dr-card-bg, #161e2b)',
        borderLeft: '4px solid var(--dr-accent, #38bdf8)',
        padding: '8px 12px',
        borderRadius: '0 6px 6px 0',
        fontSize: '0.82rem',
        color: 'var(--dr-text-subtle, #cbd5e1)'
      }
    }, 'Auto Demo: Demonstrating rectangular mode with dynamic X/Y axis indexing.');
    card.appendChild(this.statusCallout);

    // Canvas Container
    const canvasWrap = makeElement('div', {
      id: 'accudraw-live-demo-canvas-wrap',
      style: {
        width: '100%',
        height: '320px',
        background: '#070a13',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--dr-border, #334155)'
      }
    });

    // 2D SVG Compass Simulation (works instantly without WebGL loading latency)
    this.svgStage = makeElement('svg:svg', {
      viewBox: '-160 -160 320 320',
      style: { width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }
    });

    this._setupSvgCompass();
    canvasWrap.appendChild(this.svgStage);
    card.appendChild(canvasWrap);

    // Controls Legend
    const legend = makeElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '8px', fontSize: '0.74rem', color: 'var(--dr-muted, #94a3b8)',
        borderTop: '1px solid var(--dr-border, #334155)', paddingTop: '8px'
      }
    }, [
      makeElement('span', {}, 'Controls: [Space] Morph Squircle • [L] Smart Lock • [X / Y] Lock Axis • Mouse to drag target'),
      this.modeBadge = makeElement('span', {
        style: { fontWeight: 'bold', color: '#10b981', fontVariantNumeric: 'tabular-nums' }
      }, 'Mode: Rectangular (Square) | Locks: None')
    ]);
    card.appendChild(legend);

    this.container.appendChild(card);
    this._startDemoLoop();
  }

  _setupSvgCompass() {
    this.svgStage.innerHTML = '';

    // Background Grid
    for (let i = -140; i <= 140; i += 28) {
      this.svgStage.appendChild(makeElement('svg:line', {
        x1: -160, y1: i, x2: 160, y2: i, stroke: '#1e293b', 'stroke-width': 0.75
      }));
      this.svgStage.appendChild(makeElement('svg:line', {
        x1: i, y1: -160, x2: i, y2: 160, stroke: '#1e293b', 'stroke-width': 0.75
      }));
    }

    // Dynamic Squircle Path Element
    this.squirclePath = makeElement('svg:path', {
      d: '',
      fill: 'rgba(56, 189, 248, 0.08)',
      stroke: '#38bdf8',
      'stroke-width': 2.5
    });
    this.svgStage.appendChild(this.squirclePath);

    // Axis Lines & Pulsing Ticks
    this.axisLineX = makeElement('svg:line', {
      x1: -120, y1: 0, x2: 120, y2: 0, stroke: 'rgba(239, 68, 68, 0.4)', 'stroke-width': 1.5, 'stroke-dasharray': '3 3'
    });
    this.axisLineY = makeElement('svg:line', {
      x1: 0, y1: -120, x2: 0, y2: 120, stroke: 'rgba(34, 197, 94, 0.4)', 'stroke-width': 1.5, 'stroke-dasharray': '3 3'
    });
    this.svgStage.appendChild(this.axisLineX);
    this.svgStage.appendChild(this.axisLineY);

    // Index Indicator Line (thick white line)
    this.indexIndicator = makeElement('svg:line', {
      x1: 0, y1: 0, x2: 0, y2: 0, stroke: '#ffffff', 'stroke-width': 3.5, opacity: 0
    });
    this.svgStage.appendChild(this.indexIndicator);

    // Mini-Jack Cursor
    this.miniJackGroup = makeElement('svg:g', { style: { pointerEvents: 'none' } });
    this.miniJackGroup.appendChild(makeElement('svg:circle', { cx: 0, cy: 0, r: 4, fill: '#f59e0b' }));
    this.miniJackGroup.appendChild(makeElement('svg:line', { x1: -8, y1: 0, x2: 8, y2: 0, stroke: '#f59e0b', 'stroke-width': 1.5 }));
    this.miniJackGroup.appendChild(makeElement('svg:line', { x1: 0, y1: -8, x2: 0, y2: 8, stroke: '#f59e0b', 'stroke-width': 1.5 }));
    this.svgStage.appendChild(this.miniJackGroup);

    // Center Origin Dot
    this.svgStage.appendChild(makeElement('svg:circle', { cx: 0, cy: 0, r: 3.5, fill: '#ffffff' }));

    // Interactive Mouse Tracking
    this.svgStage.addEventListener('mousemove', (e) => {
      if (this.isAutoPlaying) return;
      const rect = this.svgStage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 320 - 160;
      const y = ((e.clientY - rect.top) / rect.height) * 320 - 160;
      this._updateManualPoint(x, y);
    });

    window.addEventListener('keydown', (e) => {
      if (!this.container.isConnected) return;
      if (e.key === ' ') {
        e.preventDefault();
        this.switchMode();
      } else if (e.key === 'l' || e.key === 'L') {
        this.smartLock();
      }
    });
  }

  _startDemoLoop() {
    const loop = (time) => {
      if (!this.container.isConnected) return;

      if (this.isAutoPlaying) {
        this.simulatedTime = time * 0.0015;
        const radius = 70;
        const speed = 1.2;

        // Auto Demo switches modes every 8 seconds
        const modeCycle = Math.floor(this.simulatedTime / 4) % 2;
        const targetMode = modeCycle === 0 ? 'rectangular' : 'polar';
        if (this.currentMode !== targetMode) {
          this.currentMode = targetMode;
        }

        const simX = Math.cos(this.simulatedTime * speed) * radius * 1.2;
        const simY = Math.sin(this.simulatedTime * speed * 0.7) * radius;

        this._updateSimulation(simX, simY);
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  _updateSimulation(cursorX, cursorY) {
    const isPolar = this.currentMode === 'polar';
    const squircleT = isPolar ? 1.0 : 0.15;

    this._drawSquircle(squircleT, 65);

    let constrainedX = cursorX;
    let constrainedY = cursorY;
    let isIndexed = false;
    let axis = null;

    // Proximity indexing
    if (Math.abs(cursorY) < 14) {
      constrainedY = 0;
      isIndexed = true;
      axis = 'x';
    } else if (Math.abs(cursorX) < 14) {
      constrainedX = 0;
      isIndexed = true;
      axis = 'y';
    }

    if (isIndexed) {
      this.indexIndicator.setAttribute('x1', '0');
      this.indexIndicator.setAttribute('y1', '0');
      this.indexIndicator.setAttribute('x2', String(constrainedX));
      this.indexIndicator.setAttribute('y2', String(constrainedY));
      this.indexIndicator.setAttribute('opacity', '1');
      this.statusCallout.textContent = `Auto Demo: Cursor indexed to ${axis.toUpperCase()} axis (perpendicular offset locked to zero).`;
    } else {
      this.indexIndicator.setAttribute('opacity', '0');
      this.statusCallout.textContent = `Auto Demo: Active Mode = ${isPolar ? 'POLAR (Distance & Angle)' : 'RECTANGULAR (X & Y)'}. Squircle morphs smoothly.`;
    }

    this.miniJackGroup.setAttribute('transform', `translate(${constrainedX}, ${constrainedY})`);
    this.modeBadge.textContent = `Mode: ${isPolar ? 'Polar (Circle)' : 'Rectangular (Squircle)'} | Index: ${axis ? axis.toUpperCase() : 'None'}`;
  }

  _updateManualPoint(x, y) {
    let cx = x;
    let cy = y;
    let axis = null;

    if (this.activeAxisLock === 'x') {
      cy = 0;
      axis = 'x';
    } else if (this.activeAxisLock === 'y') {
      cx = 0;
      axis = 'y';
    } else {
      if (Math.abs(y) < 12) { cy = 0; axis = 'x'; }
      else if (Math.abs(x) < 12) { cx = 0; axis = 'y'; }
    }

    if (axis) {
      this.indexIndicator.setAttribute('x1', '0');
      this.indexIndicator.setAttribute('y1', '0');
      this.indexIndicator.setAttribute('x2', String(cx));
      this.indexIndicator.setAttribute('y2', String(cy));
      this.indexIndicator.setAttribute('opacity', '1');
      this.statusCallout.textContent = `Interactive: Cursor snapped to ${axis.toUpperCase()} axis! Tap Space to toggle shape.`;
    } else {
      this.indexIndicator.setAttribute('opacity', '0');
      this.statusCallout.textContent = `Interactive: Move mouse near axes to index. Press 'L' to smart lock.`;
    }

    this.miniJackGroup.setAttribute('transform', `translate(${cx}, ${cy})`);
    this.modeBadge.textContent = `Interactive | X: ${cx.toFixed(1)} | Y: ${cy.toFixed(1)} | Mode: ${this.currentMode}`;
  }

  _drawSquircle(t, size) {
    // Generates superellipse / rounded squircle path in SVG
    const r = size;
    const cornerR = (1 - t) * (size * 0.25) + t * size;
    const d = `M ${-r + cornerR} ${-r} ` +
              `L ${r - cornerR} ${-r} Q ${r} ${-r} ${r} ${-r + cornerR} ` +
              `L ${r} ${r - cornerR} Q ${r} ${r} ${r - cornerR} ${r} ` +
              `L ${-r + cornerR} ${r} Q ${-r} ${r} ${-r} ${r - cornerR} ` +
              `L ${-r} ${-r + cornerR} Q ${-r} ${-r} ${-r + cornerR} ${-r} Z`;

    this.squirclePath.setAttribute('d', d);
  }

  switchMode() {
    this.currentMode = this.currentMode === 'rectangular' ? 'polar' : 'rectangular';
    this._drawSquircle(this.currentMode === 'polar' ? 1.0 : 0.15, 65);
    this.statusCallout.textContent = `Mode switched to ${this.currentMode.toUpperCase()}. Compass morphed.`;
  }

  smartLock() {
    this.activeAxisLock = this.activeAxisLock ? null : 'x';
    this.statusCallout.textContent = this.activeAxisLock ? 'Smart Lock active: Locked to X axis.' : 'Unlocked all axes.';
  }

  togglePlayback() {
    this.isAutoPlaying = !this.isAutoPlaying;
    this.btnTogglePlay.textContent = this.isAutoPlaying ? '⏸ Pause Auto Demo' : '▶ Play Auto Demo';
    if (!this.isAutoPlaying) {
      this.statusCallout.textContent = 'Manual Mode: Move your mouse across the canvas to test AccuDraw!';
    }
  }
}

globalThis.AccuDrawDemoComponent = AccuDrawDemoComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = AccuDrawDemoComponent;