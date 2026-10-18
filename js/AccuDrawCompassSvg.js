class AccuDrawCompassSvg {
  /**
   * Generates a clean, resolution-independent SVG representation of the AccuDraw Compass.
   * Accurately depicts the morphing squircle frame, red X-axis and green Y-axis tick cylinders,
   * negative gray ticks, center reference origin dot, and optional Mini-Jack cursor.
   *
   * @param {Object} options
   * @param {number} [options.size=140] - Width and height in CSS pixels
   * @param {number} [options.squircle=0.45] - Morph amount: 0.0 (pure square), 0.5 (squircle), 1.0 (pure circle)
   * @param {string} [options.mode='rectangular'] - 'rectangular' | 'polar' | 'mixed'
   * @param {string|null} [options.activeAxis=null] - 'x' | 'y' | 'xy' | null (triggers animated glow/pulse)
   * @param {boolean} [options.showMiniJack=false] - Whether to render the constrained 3-axis Mini-Jack cursor
   * @param {number} [options.miniJackOffset=[45, -30]] - [x, y] offset of the Mini-Jack relative to origin
   * @param {string} [options.className=''] - Custom CSS class
   * @returns {string} SVG markup string
   */
  static generateSvgString(options = {}) {
    const size = options.size || 140;
    const squircle = options.squircle !== undefined ? options.squircle : (options.mode === 'polar' ? 1.0 : (options.mode === 'mixed' ? 0.5 : 0.35));
    const activeAxis = options.activeAxis || null;
    const showMiniJack = !!options.showMiniJack;
    const miniJackOffset = options.miniJackOffset || [45, -30];
    const className = options.className || 'accudraw-svg-compass';

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.38;

    // Squircle corner curvature calculation (superellipse blend)
    // Corner radius interpolates from small chamfer (square) to R (full circle)
    const cornerRadius = (12 * (1 - squircle)) + (R * squircle);

    const xPulse = (activeAxis === 'x' || activeAxis === 'xy');
    const yPulse = (activeAxis === 'y' || activeAxis === 'xy');

    // Tick dimensions
    const tickLen = size * 0.12;
    const tickW = size * 0.035;

    let svg = `<svg class="${className}" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<defs>
      <filter id="ad-glow-${size}" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="ad-frame-grad-${size}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#0284c7" stop-opacity="0.45"/>
      </linearGradient>
    </defs>`;

    // Subtle background halo
    svg += `<circle cx="${cx}" cy="${cy}" r="${R + 10}" fill="rgba(2, 132, 199, 0.06)" />`;

    // Morphing Squircle boundary frame
    const boxSize = R * 2;
    const boxX = cx - R;
    const boxY = cy - R;
    svg += `<rect x="${boxX}" y="${boxY}" width="${boxSize}" height="${boxSize}" rx="${cornerRadius}" ry="${cornerRadius}"
      fill="rgba(15, 23, 42, 0.65)" stroke="url(#ad-frame-grad-${size})" stroke-width="2.5" />`;

    // Index lines if axis is constrained
    if (xPulse) {
      svg += `<line x1="${cx - R - 14}" y1="${cy}" x2="${cx + R + 14}" y2="${cy}" stroke="#ffffff" stroke-width="2" stroke-dasharray="4,3" opacity="0.9" filter="url(#ad-glow-${size})"/>`;
    }
    if (yPulse) {
      svg += `<line x1="${cx}" y1="${cy - R - 14}" x2="${cx}" y2="${cy + R + 14}" stroke="#ffffff" stroke-width="2" stroke-dasharray="4,3" opacity="0.9" filter="url(#ad-glow-${size})"/>`;
    }

    // Negative X Tick (Gray)
    svg += `<rect x="${cx - R - tickLen/2}" y="${cy - tickW/2}" width="${tickLen}" height="${tickW}" rx="${tickW/2}" fill="#64748b" />`;
    // Positive X Tick (Red - AccuDraw primary X)
    svg += `<rect x="${cx + R - tickLen/2}" y="${cy - tickW/2}" width="${tickLen}" height="${tickW}" rx="${tickW/2}" fill="#ef4444" ${xPulse ? `filter="url(#ad-glow-${size})"` : ''}/>`;

    // Negative Y Tick (Gray)
    svg += `<rect x="${cx - tickW/2}" y="${cy + R - tickLen/2}" width="${tickW}" height="${tickLen}" rx="${tickW/2}" fill="#64748b" />`;
    // Positive Y Tick (Green - AccuDraw primary Y)
    svg += `<rect x="${cx - tickW/2}" y="${cy - R - tickLen/2}" width="${tickW}" height="${tickLen}" rx="${tickW/2}" fill="#10b981" ${yPulse ? `filter="url(#ad-glow-${size})"` : ''}/>`;

    // Primary Axis Labels
    svg += `<text x="${cx + R + 14}" y="${cy + 4}" fill="#ef4444" font-family="monospace" font-size="${size * 0.08}" font-weight="bold" text-anchor="middle">X</text>`;
    svg += `<text x="${cx}" y="${cy - R - 12}" fill="#10b981" font-family="monospace" font-size="${size * 0.08}" font-weight="bold" text-anchor="middle">Y</text>`;

    // Center Origin Reference Dot
    svg += `<circle cx="${cx}" cy="${cy}" r="${size * 0.035}" fill="#ffffff" stroke="#0284c7" stroke-width="2" />`;

    // Optional Mini-Jack Indicator (3-Axis Constraint Cursor)
    if (showMiniJack) {
      const jx = cx + miniJackOffset[0];
      const jy = cy + miniJackOffset[1];
      const jArm = size * 0.07;
      svg += `<g stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.6">
        <line x1="${cx}" y1="${cy}" x2="${jx}" y2="${jy}" />
      </g>`;
      // 3-axis jack
      svg += `<g stroke="#ffffff" stroke-width="2" stroke-linecap="round" filter="url(#ad-glow-${size})">
        <line x1="${jx - jArm}" y1="${jy}" x2="${jx + jArm}" y2="${jy}" stroke="#ef4444" />
        <line x1="${jx}" y1="${jy - jArm}" x2="${jx}" y2="${jy + jArm}" stroke="#10b981" />
        <line x1="${jx - jArm*0.7}" y1="${jy - jArm*0.7}" x2="${jx + jArm*0.7}" y2="${jy + jArm*0.7}" stroke="#38bdf8" />
        <circle cx="${jx}" cy="${jy}" r="2" fill="#ffffff" />
      </g>`;
    }

    svg += `</svg>`;
    return svg;
  }

  /**
   * Mounts a live interactive AccuDraw compass widget into a container.
   */
  static renderInteractiveWidget(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid #232d3f',
        borderRadius: '12px'
      }
    });

    const displayWrap = makeElement('div', { id: 'ad-svg-display-target' });
    wrap.appendChild(displayWrap);

    let currentSquircle = 0.45;
    let currentAxis = null;
    let showJack = true;

    function refresh() {
      displayWrap.innerHTML = AccuDrawCompassSvg.generateSvgString({
        size: 160,
        squircle: currentSquircle,
        activeAxis: currentAxis,
        showMiniJack: showJack,
        miniJackOffset: [50, -36]
      });
    }

    const controls = makeElement('div', {
      style: { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }
    });

    const btnRect = makeElement('button', {
      className: 'dr-nav-btn',
      onclick: () => { currentSquircle = 0.15; currentAxis = null; refresh(); }
    }, 'Square Mode (t=0.15)');

    const btnSquircle = makeElement('button', {
      className: 'dr-nav-btn',
      onclick: () => { currentSquircle = 0.5; currentAxis = null; refresh(); }
    }, 'Squircle Mode (t=0.5)');

    const btnPolar = makeElement('button', {
      className: 'dr-nav-btn',
      onclick: () => { currentSquircle = 1.0; currentAxis = null; refresh(); }
    }, 'Polar Circle (t=1.0)');

    const btnLockX = makeElement('button', {
      className: 'dr-nav-btn',
      style: { color: '#ef4444', borderColor: '#ef444466' },
      onclick: () => { currentAxis = currentAxis === 'x' ? null : 'x'; refresh(); }
    }, 'Lock X Axis (Red)');

    const btnLockY = makeElement('button', {
      className: 'dr-nav-btn',
      style: { color: '#10b981', borderColor: '#10b98166' },
      onclick: () => { currentAxis = currentAxis === 'y' ? null : 'y'; refresh(); }
    }, 'Lock Y Axis (Green)');

    controls.appendChild(btnRect);
    controls.appendChild(btnSquircle);
    controls.appendChild(btnPolar);
    controls.appendChild(btnLockX);
    controls.appendChild(btnLockY);

    wrap.appendChild(controls);
    container.appendChild(wrap);
    refresh();
  }
}

globalThis.AccuDrawCompassSvg = AccuDrawCompassSvg;
if (typeof module !== 'undefined' && module.exports) module.exports = AccuDrawCompassSvg;