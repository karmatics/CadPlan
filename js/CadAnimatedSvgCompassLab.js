class CadAnimatedSvgCompassLab {

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
          flexDirection: 'column'
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
          makeElement('span', { style: { fontSize: '15px' } }, '🧭'),
          makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'Procedural Animated SVG AccuDraw Compass'),
          makeElement('span', { style: { fontSize: '10px', background: '#0284c7', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Authentic AccuDraw Visuals')
        ])
      ]);
      wrap.appendChild(header);

      // Toolbar
      const toolbar = makeElement('div', {
        style: {
          padding: '8px 14px', background: '#0d1117', borderBottom: '1px solid #161e2b',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '8px', fontSize: '11px', fontFamily: 'monospace'
        }
      });

      const modeButtons = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        makeElement('button', { className: 'dr-tab-btn', onclick: () => setSquircle(0.0) }, 'Square [t=0]'),
        makeElement('button', { className: 'dr-tab-btn active', id: 'btn-svg-squircle', onclick: () => setSquircle(0.5) }, 'Squircle [t=0.5]'),
        makeElement('button', { className: 'dr-tab-btn', onclick: () => setSquircle(1.0) }, 'Circle [t=1]'),
        makeElement('button', {
          className: 'dr-nav-btn', style: { color: '#ef4444', borderColor: '#ef444466', padding: '2px 6px' },
          onclick: () => toggleLock('x')
        }, 'Lock X'),
        makeElement('button', {
          className: 'dr-nav-btn', style: { color: '#10b981', borderColor: '#10b98166', padding: '2px 6px' },
          onclick: () => toggleLock('y')
        }, 'Lock Y')
      ]);

      const statusBadge = makeElement('span', {
        id: 'svg-compass-status',
        style: { color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 8px', borderRadius: '12px' }
      }, 'Mode: Rectangular (DX/DY)');

      toolbar.appendChild(modeButtons);
      toolbar.appendChild(statusBadge);
      wrap.appendChild(toolbar);

      // SVG Stage
      const W = 740, H = 340;
      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${W} ${H}`, width: '100%', height: '340px',
        style: { display: 'block', background: '#050811', cursor: 'crosshair' }
      });

      const defs = makeElement('svg:defs', {},
        makeElement('svg:pattern', { id: 'anim-svg-grid', width: '20', height: '20', patternUnits: 'userSpaceOnUse' },
          makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '1' })
        ),
        makeElement('svg:filter', { id: 'glow-svg-comp', x: '-20%', y: '-20%', width: '140%', height: '140%' },
          makeElement('svg:feGaussianBlur', { stdDeviation: '3', result: 'blur' }),
          makeElement('svg:feMerge', {},
            makeElement('svg:feMergeNode', { in: 'blur' }),
            makeElement('svg:feMergeNode', { in: 'SourceGraphic' })
          )
        )
      );
      svg.appendChild(defs);
      svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#anim-svg-grid)' }));

      const compassGroup = makeElement('svg:g', { id: 'anim-svg-compass-root' });
      const guidesGroup = makeElement('svg:g', { id: 'anim-svg-guides' });
      const hudGroup = makeElement('svg:g', { id: 'anim-svg-hud' });

      svg.appendChild(guidesGroup);
      svg.appendChild(compassGroup);
      svg.appendChild(hudGroup);
      wrap.appendChild(svg);
      container.appendChild(wrap);

      const state = {
        cx: W / 2,
        cy: H / 2,
        squircle: 0.5,
        activeAxis: null,
        radius: 80,
        mouseX: W / 2,
        mouseY: H / 2
      };

      function setSquircle(val) {
        state.squircle = val;
        statusBadge.textContent = val >= 0.9 ? 'Mode: Polar (Distance / Angle)' : (val <= 0.1 ? 'Mode: Pure Square' : 'Mode: Squircle (Mixed)');
        renderCompass();
      }

      function toggleLock(axis) {
        state.activeAxis = state.activeAxis === axis ? null : axis;
        renderCompass();
        updateDynamics();
      }

      function renderCompass() {
        compassGroup.innerHTML = '';

        const squircleCalc = (typeof SquircleArc !== 'undefined') ? new SquircleArc() : new globalThis.SquircleArc();
        const paths = squircleCalc.getPaths(state.squircle, true, state.radius);
        const d = paths && paths[0] ? paths[0] : `M ${-state.radius} ${-state.radius} L ${state.radius} ${-state.radius} L ${state.radius} ${state.radius} L ${-state.radius} ${state.radius} Z`;

        const frameG = makeElement('svg:g', { transform: `translate(${state.cx}, ${state.cy})` });

        frameG.appendChild(makeElement('svg:path', {
          d: d, fill: 'rgba(15, 23, 42, 0.75)', stroke: '#38bdf8', 'stroke-width': '2.5', 'stroke-linejoin': 'round'
        }));

        // Ticks
        const tickL = 18, tickW = 5;
        frameG.appendChild(makeElement('svg:rect', { x: -state.radius - tickL / 2, y: -tickW / 2, width: tickL, height: tickW, rx: '2.5', fill: '#64748b' }));
        const xAttrs = { x: state.radius - tickL / 2, y: -tickW / 2, width: tickL, height: tickW, rx: '2.5', fill: '#ef4444' };
        if (state.activeAxis === 'x') xAttrs.filter = 'url(#glow-svg-comp)';
        frameG.appendChild(makeElement('svg:rect', xAttrs));

        frameG.appendChild(makeElement('svg:rect', { x: -tickW / 2, y: state.radius - tickL / 2, width: tickW, height: tickL, rx: '2.5', fill: '#64748b' }));
        const yAttrs = { x: -tickW / 2, y: -state.radius - tickL / 2, width: tickW, height: tickL, rx: '2.5', fill: '#10b981' };
        if (state.activeAxis === 'y') yAttrs.filter = 'url(#glow-svg-comp)';
        frameG.appendChild(makeElement('svg:rect', yAttrs));

        // Center Origin
        frameG.appendChild(makeElement('svg:circle', { cx: '0', cy: '0', r: '4', fill: '#ffffff', stroke: '#0284c7', 'stroke-width': '1.5' }));

        // Axis labels
        frameG.appendChild(makeElement('svg:text', { x: state.radius + 18, y: '4', fill: '#ef4444', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, 'X'));
        frameG.appendChild(makeElement('svg:text', { x: '0', y: -state.radius - 14, fill: '#10b981', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'Y'));

        compassGroup.appendChild(frameG);
      }

      function updateDynamics() {
        guidesGroup.innerHTML = '';
        hudGroup.innerHTML = '';

        const dx = state.mouseX - state.cx;
        const dy = state.mouseY - state.cy;
        const dist = Math.hypot(dx, dy);
        const angleDeg = ((Math.atan2(-dy, dx) * 180 / Math.PI) + 360) % 360;

        hudGroup.appendChild(makeElement('svg:text', {
          x: Math.min(W - 130, Math.max(10, state.mouseX + 14)),
          y: Math.max(20, state.mouseY - 10),
          fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold'
        }, `DX=${dx > 0 ? '+' : ''}${dx.toFixed(1)}  DY=${-dy > 0 ? '+' : ''}${-dy.toFixed(1)}`));

        hudGroup.appendChild(makeElement('svg:text', {
          x: Math.min(W - 130, Math.max(10, state.mouseX + 14)),
          y: Math.max(34, state.mouseY + 4),
          fill: '#f59e0b', 'font-family': 'monospace', 'font-size': '9.5px'
        }, `Dist=${dist.toFixed(1)}  θ=${angleDeg.toFixed(1)}°`));

        if (state.activeAxis) {
          if (state.activeAxis === 'x') {
            guidesGroup.appendChild(makeElement('svg:line', {
              x1: '0', y1: state.cy, x2: `${W}`, y2: state.cy,
              stroke: '#ffffff', 'stroke-width': '2', 'stroke-dasharray': '5,4', filter: 'url(#glow-svg-comp)'
            }));
          } else if (state.activeAxis === 'y') {
            guidesGroup.appendChild(makeElement('svg:line', {
              x1: state.cx, y1: '0', x2: state.cx, y2: `${H}`,
              stroke: '#ffffff', 'stroke-width': '2', 'stroke-dasharray': '5,4', filter: 'url(#glow-svg-comp)'
            }));
          }
        }
      }

      svg.addEventListener('pointermove', (e) => {
        const rect = svg.getBoundingClientRect();
        state.mouseX = (e.clientX - rect.left) * (W / rect.width);
        state.mouseY = (e.clientY - rect.top) * (H / rect.height);
        updateDynamics();
      });

      renderCompass();
      updateDynamics();
    }
}

globalThis.CadAnimatedSvgCompassLab = CadAnimatedSvgCompassLab;
if (typeof module !== 'undefined' && module.exports) module.exports = CadAnimatedSvgCompassLab;