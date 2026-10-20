class SquircleCompassSvg {

  static renderElement(options = {}) {
      const size = options.size || 160;
      const squircle = options.squircle !== undefined ? options.squircle : (options.mode === 'polar' ? 1.0 : (options.mode === 'mixed' ? 0.5 : 0.35));
      const activeAxis = options.activeAxis || null;
      const className = options.className || 'squircle-compass-svg';

      const cx = size / 2;
      const cy = size / 2;
      const R = size * 0.38;

      const xPulse = (activeAxis === 'x' || activeAxis === 'xy');
      const yPulse = (activeAxis === 'y' || activeAxis === 'xy');

      const tickLen = size * 0.12;
      const tickW = size * 0.035;
      const filterId = `squircle-glow-${size}-${Math.random().toString(36).substr(2, 5)}`;
      const gradId = `squircle-grad-${size}-${Math.random().toString(36).substr(2, 5)}`;

      const svg = makeElement('svg:svg', {
        className: className,
        viewBox: `0 0 ${size} ${size}`,
        width: `${size}`,
        height: `${size}`,
        style: { display: 'block', overflow: 'visible', userSelect: 'none' }
      });

      const feBlur = makeElement('svg:feGaussianBlur', { stdDeviation: '3', result: 'blur' });
      const feMerge = makeElement('svg:feMerge', {},
        makeElement('svg:feMergeNode', { in: 'blur' }),
        makeElement('svg:feMergeNode', { in: 'SourceGraphic' })
      );
      const filter = makeElement('svg:filter', { id: filterId, x: '-30%', y: '-30%', width: '160%', height: '160%' }, feBlur, feMerge);

      const grad = makeElement('svg:linearGradient', { id: gradId, x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
        makeElement('svg:stop', { offset: '0%', 'stop-color': '#38bdf8', 'stop-opacity': '0.9' }),
        makeElement('svg:stop', { offset: '100%', 'stop-color': '#0284c7', 'stop-opacity': '0.4' })
      );

      const defs = makeElement('svg:defs', {}, filter, grad);
      svg.appendChild(defs);

      // Subtle background halo
      svg.appendChild(makeElement('svg:circle', {
        cx: cx, cy: cy, r: R + 10, fill: 'rgba(2, 132, 199, 0.05)'
      }));

      // Authentic 8-Arc Squircle Path using Rob Brown's SquircleArc
      const squircleCalc = (typeof SquircleArc !== 'undefined') ? new SquircleArc() : new globalThis.SquircleArc();
      const paths = squircleCalc.getPaths(squircle, true, R);
      const squirclePathData = paths && paths[0] ? paths[0] : `M ${-R} ${-R} L ${R} ${-R} L ${R} ${R} L ${-R} ${R} Z`;

      const squircleG = makeElement('svg:g', {
        transform: `translate(${cx}, ${cy})`
      });

      squircleG.appendChild(makeElement('svg:path', {
        d: squirclePathData,
        fill: 'rgba(15, 23, 42, 0.72)',
        stroke: `url(#${gradId})`,
        'stroke-width': '2.5',
        'stroke-linejoin': 'round'
      }));
      svg.appendChild(squircleG);

      // White Constraint Index Guidelines
      if (xPulse) {
        svg.appendChild(makeElement('svg:line', {
          x1: cx - R - 16, y1: cy, x2: cx + R + 16, y2: cy,
          stroke: '#ffffff', 'stroke-width': '2', 'stroke-dasharray': '4,3',
          filter: `url(#${filterId})`
        }));
      }
      if (yPulse) {
        svg.appendChild(makeElement('svg:line', {
          x1: cx, y1: cy - R - 16, x2: cx, y2: cy + R + 16,
          stroke: '#ffffff', 'stroke-width': '2', 'stroke-dasharray': '4,3',
          filter: `url(#${filterId})`
        }));
      }

      // Negative X Axis Tick (Gray)
      svg.appendChild(makeElement('svg:rect', {
        x: cx - R - tickLen / 2, y: cy - tickW / 2, width: tickLen, height: tickW, rx: tickW / 2, fill: '#64748b'
      }));
      // Positive X Axis Tick (Red Cylinder)
      const xTickAttrs = {
        x: cx + R - tickLen / 2, y: cy - tickW / 2, width: tickLen, height: tickW, rx: tickW / 2, fill: '#ef4444'
      };
      if (xPulse) xTickAttrs.filter = `url(#${filterId})`;
      svg.appendChild(makeElement('svg:rect', xTickAttrs));

      // Negative Y Axis Tick (Gray)
      svg.appendChild(makeElement('svg:rect', {
        x: cx - tickW / 2, y: cy + R - tickLen / 2, width: tickW, height: tickLen, rx: tickW / 2, fill: '#64748b'
      }));
      // Positive Y Axis Tick (Green Cylinder)
      const yTickAttrs = {
        x: cx - tickW / 2, y: cy - R - tickLen / 2, width: tickW, height: tickLen, rx: tickW / 2, fill: '#10b981'
      };
      if (yPulse) yTickAttrs.filter = `url(#${filterId})`;
      svg.appendChild(makeElement('svg:rect', yTickAttrs));

      // Axis Labels
      svg.appendChild(makeElement('svg:text', {
        x: cx + R + 16, y: cy + 4, fill: '#ef4444',
        'font-family': 'monospace', 'font-size': `${size * 0.08}px`, 'font-weight': 'bold', 'text-anchor': 'middle'
      }, 'X'));

      svg.appendChild(makeElement('svg:text', {
        x: cx, y: cy - R - 12, fill: '#10b981',
        'font-family': 'monospace', 'font-size': `${size * 0.08}px`, 'font-weight': 'bold', 'text-anchor': 'middle'
      }, 'Y'));

      // Center Reference Origin Dot
      svg.appendChild(makeElement('svg:circle', {
        cx: cx, cy: cy, r: size * 0.035, fill: '#ffffff', stroke: '#0284c7', 'stroke-width': '2'
      }));

      return svg;
    }
  static generateSvgString(options = {}) {
    const el = this.renderElement(options);
    return el.outerHTML;
  }

  static renderInteractiveWidget(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        padding: '16px',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1.5px solid #21262d',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
      }
    });

    const displayTarget = makeElement('div', {
      style: { width: '190px', height: '190px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
    });
    wrap.appendChild(displayTarget);

    let state = {
      squircle: 0.45,
      activeAxis: null,
      showMiniJack: true
    };

    function update() {
      displayTarget.innerHTML = '';
      const svgEl = SquircleCompassSvg.renderElement({
        size: 175,
        squircle: state.squircle,
        activeAxis: state.activeAxis,
        showMiniJack: state.showMiniJack,
        miniJackOffset: [50, -35]
      });
      displayTarget.appendChild(svgEl);
    }

    const controls = makeElement('div', {
      style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }
    });

    const btnSquare = makeElement('button', {
      className: 'dr-nav-btn',
      onclick: () => { state.squircle = 0.0; state.activeAxis = null; update(); }
    }, 'Square [t=0.0]');

    const btnSquircle = makeElement('button', {
      className: 'dr-nav-btn',
      onclick: () => { state.squircle = 0.5; state.activeAxis = null; update(); }
    }, 'Squircle [t=0.5]');

    const btnCircle = makeElement('button', {
      className: 'dr-nav-btn',
      onclick: () => { state.squircle = 1.0; state.activeAxis = null; update(); }
    }, 'Circle [t=1.0]');

    const btnLockX = makeElement('button', {
      className: 'dr-nav-btn',
      style: { color: '#ef4444', borderColor: '#ef444466' },
      onclick: () => { state.activeAxis = state.activeAxis === 'x' ? null : 'x'; update(); }
    }, 'Lock X');

    const btnLockY = makeElement('button', {
      className: 'dr-nav-btn',
      style: { color: '#10b981', borderColor: '#10b98166' },
      onclick: () => { state.activeAxis = state.activeAxis === 'y' ? null : 'y'; update(); }
    }, 'Lock Y');

    const btnJack = makeElement('button', {
      className: 'dr-nav-btn',
      style: { color: '#38bdf8', borderColor: '#38bdf866' },
      onclick: () => { state.showMiniJack = !state.showMiniJack; update(); }
    }, 'Toggle Mini-Jack');

    controls.appendChild(btnSquare);
    controls.appendChild(btnSquircle);
    controls.appendChild(btnCircle);
    controls.appendChild(btnLockX);
    controls.appendChild(btnLockY);
    controls.appendChild(btnJack);

    wrap.appendChild(controls);
    container.appendChild(wrap);
    update();
  }
}

globalThis.SquircleCompassSvg = SquircleCompassSvg;
globalThis.AccuDrawCompassSvg = SquircleCompassSvg;
if (typeof module !== 'undefined' && module.exports) module.exports = SquircleCompassSvg;