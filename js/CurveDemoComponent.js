class CurveDemoComponent {
  static render(containerElement) {
    const instance = new CurveDemoComponent(containerElement);
    instance.init();
    return instance;
  }

  constructor(container) {
    this.container = container;
    this.points = [
      { x: -110, y: 40 },
      { x: -40, y: -60 },
      { x: 40, y: 50 },
      { x: 110, y: -30 }
    ];
    this.tension = 0.5;
    this.lineWidth = 4;
    this.isAutoPlaying = true;
    this.simTime = 0;
  }

  init() {
    this.container.innerHTML = '';
    this.renderLayout();
  }

  renderLayout() {
    const card = makeElement('div', {
      style: {
        background: 'var(--dr-surface, #171f2c)',
        border: '1.5px solid var(--dr-accent, #10b981)',
        borderRadius: '12px',
        padding: '18px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: 'var(--dr-font-sans, sans-serif)'
      }
    });

    const topBar = makeElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '1.2rem' } }, '🖋️'),
        makeElement('strong', { style: { fontSize: '1rem', color: 'var(--dr-text, #f8fafc)' } }, 'The Pen Tool Replacement: On-Curve Drafting'),
        makeElement('span', {
          style: {
            fontSize: '0.68rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px',
            background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)'
          }
        }, 'No Bezier Tangent Handles')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
        this.btnPlay = makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 10px', fontSize: '0.75rem', fontWeight: 'bold' },
          onclick: () => this.toggleAuto()
        }, this.isAutoPlaying ? '⏸ Pause Auto Demo' : '▶ Play Auto Demo'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 10px', fontSize: '0.75rem' },
          onclick: () => this.resetPoints()
        }, 'Clear Points')
      ])
    ]);
    card.appendChild(topBar);

    this.callout = makeElement('div', {
      style: {
        background: 'var(--dr-card-bg, #161e2b)',
        borderLeft: '4px solid #10b981',
        padding: '8px 12px',
        borderRadius: '0 6px 6px 0',
        fontSize: '0.82rem',
        color: 'var(--dr-text-subtle, #cbd5e1)'
      }
    }, 'Demo: Click points strictly ON the curve. The algorithm fits continuous natural curvature automatically.');
    card.appendChild(this.callout);

    // Multi-Touch Phone Trackpad Simulation Overlay
    const stageWrap = makeElement('div', {
      style: {
        width: '100%',
        height: '280px',
        background: '#070a13',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--dr-border, #334155)'
      }
    });

    this.svgCanvas = makeElement('svg:svg', {
      viewBox: '-150 -120 300 240',
      style: { width: '100%', height: '100%', display: 'block', cursor: 'pointer' }
    });

    this.curvePath = makeElement('svg:path', {
      d: '',
      fill: 'none',
      stroke: '#10b981',
      'stroke-width': 4,
      'stroke-linecap': 'round'
    });
    this.svgCanvas.appendChild(this.curvePath);

    this.pointsGroup = makeElement('svg:g');
    this.svgCanvas.appendChild(this.pointsGroup);

    this.svgCanvas.addEventListener('click', (e) => {
      this.isAutoPlaying = false;
      this.btnPlay.textContent = '▶ Play Auto Demo';
      const rect = this.svgCanvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 300 - 150;
      const y = ((e.clientY - rect.top) / rect.height) * 240 - 120;
      this.points.push({ x, y });
      if (this.points.length > 8) this.points.shift();
      this._updateCurve();
      this.callout.textContent = `Point placed at (${x.toFixed(0)}, ${y.toFixed(0)}). Continuous smooth tangent solved in real time.`;
    });

    stageWrap.appendChild(this.svgCanvas);
    card.appendChild(stageWrap);

    // Two-Handed Multi-Touch Sliders (Simulating TouchController)
    const touchPanel = makeElement('div', {
      style: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px', background: 'var(--dr-card-bg)', padding: '12px', borderRadius: '8px',
        border: '1px solid var(--dr-border)'
      }
    }, [
      makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } }, [
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold' } }, [
          makeElement('span', { style: { color: '#10b981' } }, '📱 Finger 1: Curve Tension / Fullness'),
          this.lblTension = makeElement('span', {}, '0.50')
        ]),
        makeElement('input', {
          type: 'range', min: '0.1', max: '1.0', step: '0.05', value: '0.5',
          style: { width: '100%', accentColor: '#10b981', cursor: 'pointer' },
          oninput: (e) => {
            this.tension = parseFloat(e.target.value);
            this.lblTension.textContent = this.tension.toFixed(2);
            this._updateCurve();
          }
        })
      ]),
      makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } }, [
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold' } }, [
          makeElement('span', { style: { color: '#38bdf8' } }, '📱 Finger 2: Stroke Line Width'),
          this.lblWidth = makeElement('span', {}, '4 px')
        ]),
        makeElement('input', {
          type: 'range', min: '1', max: '16', step: '1', value: '4',
          style: { width: '100%', accentColor: '#38bdf8', cursor: 'pointer' },
          oninput: (e) => {
            this.lineWidth = parseInt(e.target.value);
            this.lblWidth.textContent = `${this.lineWidth} px`;
            this.curvePath.setAttribute('stroke-width', String(this.lineWidth));
          }
        })
      ])
    ]);
    card.appendChild(touchPanel);

    this.container.appendChild(card);
    this._startLoop();
  }

  _startLoop() {
    const loop = (time) => {
      if (!this.container.isConnected) return;
      if (this.isAutoPlaying) {
        this.simTime = time * 0.002;
        this.points[1].y = -60 + Math.sin(this.simTime * 2) * 25;
        this.points[2].y = 50 + Math.cos(this.simTime * 1.8) * 20;
        this._updateCurve();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  _updateCurve() {
    if (this.points.length < 2) return;

    this.pointsGroup.innerHTML = '';
    this.points.forEach((pt, i) => {
      this.pointsGroup.appendChild(makeElement('svg:circle', {
        cx: pt.x, cy: pt.y, r: 4.5, fill: '#ffffff', stroke: '#070a13', 'stroke-width': 1.5
      }));
    });

    // Catmull-Rom to Cubic Bezier conversion for on-curve interpolation
    let d = `M ${this.points[0].x} ${this.points[0].y} `;
    for (let i = 0; i < this.points.length - 1; i++) {
      const p0 = i > 0 ? this.points[i - 1] : this.points[i];
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const p3 = (i < this.points.length - 2) ? this.points[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) * (this.tension / 3);
      const cp1y = p1.y + (p2.y - p0.y) * (this.tension / 3);
      const cp2x = p2.x - (p3.x - p1.x) * (this.tension / 3);
      const cp2y = p2.y - (p3.y - p1.y) * (this.tension / 3);

      d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} `;
    }

    this.curvePath.setAttribute('d', d);
  }

  resetPoints() {
    this.points = [
      { x: -100, y: 0 },
      { x: 100, y: 0 }
    ];
    this.isAutoPlaying = false;
    this.btnPlay.textContent = '▶ Play Auto Demo';
    this._updateCurve();
    this.callout.textContent = 'Canvas cleared. Click anywhere to add through-points to your curve!';
  }

  toggleAuto() {
    this.isAutoPlaying = !this.isAutoPlaying;
    this.btnPlay.textContent = this.isAutoPlaying ? '⏸ Pause Auto Demo' : '▶ Play Auto Demo';
  }
}

globalThis.CurveDemoComponent = CurveDemoComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CurveDemoComponent;