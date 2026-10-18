class CadErgonomicFreedomGraphic {
  /**
   * Hero Graphic: The Freedom to Hook It Together.
   * Visually contrasts the Monolithic CAD Desktop Box with
   * Composable Human-Interactive Instruments that adapt to the creator.
   */
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
        makeElement('span', { style: { fontSize: '15px' } }, '🎛️'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'Beyond Monoliths: Composable Human-Interactive Instruments'),
        makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Ergonomic Freedom')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' } }, 'Precision is table stakes; freedom is the revolution')
    ]);
    wrap.appendChild(header);

    const stage = makeElement('div', {
      style: { padding: '16px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '12px' }
    });

    const svgW = 740, svgH = 220;
    const svg = makeElement('svg:svg', {
      viewBox: `0 0 ${svgW} ${svgH}`, width: '100%', height: '220px',
      style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '10px' }
    });

    // Left: Monolithic CAD (Bentley / Autodesk)
    const gMonolith = makeElement('svg:g', { transform: 'translate(25, 25)' });
    gMonolith.appendChild(makeElement('svg:rect', { width: '220', height: '170', rx: '8', fill: '#0c0f17', stroke: '#ef4444', 'stroke-width': '1.5' }));
    gMonolith.appendChild(makeElement('svg:text', { x: '110', y: '26', fill: '#ef4444', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'THE MONOLITHIC BOX'));
    gMonolith.appendChild(makeElement('svg:text', { x: '110', y: '42', fill: '#64748b', 'font-family': 'monospace', 'font-size': '9px', 'text-anchor': 'middle' }, '(MicroStation / AutoCAD / Revit)'));

    gMonolith.appendChild(makeElement('svg:rect', { x: '15', y: '52', width: '190', height: '100', rx: '4', fill: '#070a13', stroke: '#21262d' }));
    gMonolith.appendChild(makeElement('svg:text', { x: '105', y: '75', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9px', 'text-anchor': 'middle' }, '• 20GB desktop installer'));
    gMonolith.appendChild(makeElement('svg:text', { x: '105', y: '95', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9px', 'text-anchor': 'middle' }, '• $10,000/seat recurring tax'));
    gMonolith.appendChild(makeElement('svg:text', { x: '105', y: '115', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9px', 'text-anchor': 'middle' }, '• Trapped in single desktop window'));
    gMonolith.appendChild(makeElement('svg:text', { x: '105', y: '135', fill: '#ef4444', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'Rigid, Frozen in Time'));
    svg.appendChild(gMonolith);

    // Center VS indicator
    const gVs = makeElement('svg:g', { transform: 'translate(260, 95)' });
    gVs.appendChild(makeElement('svg:circle', { cx: '25', cy: '15', r: '18', fill: '#161e2b', stroke: '#38bdf8', 'stroke-width': '1.5' }));
    gVs.appendChild(makeElement('svg:text', { x: '25', y: '19', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'VS'));
    svg.appendChild(gVs);

    // Right: Composable Interactive Instruments
    const gFreedom = makeElement('svg:g', { transform: 'translate(330, 25)' });
    gFreedom.appendChild(makeElement('svg:rect', { width: '385', height: '170', rx: '8', fill: '#0a101d', stroke: '#10b981', 'stroke-width': '1.8' }));
    gFreedom.appendChild(makeElement('svg:text', { x: '192', y: '26', fill: '#10b981', 'font-family': 'monospace', 'font-size': '11.5px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'COMPOSABLE HUMAN-INTERACTIVE INSTRUMENTS'));
    gFreedom.appendChild(makeElement('svg:text', { x: '192', y: '42', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '9px', 'text-anchor': 'middle' }, '(Our Architecture • The Creator Hooks It Together)'));

    const makeInstrumentPill = (x, y, w, h, title, sub, col) => {
      const g = makeElement('svg:g', { transform: `translate(${x}, ${y})` });
      g.appendChild(makeElement('svg:rect', { width: w, height: h, rx: '6', fill: '#070a13', stroke: col, 'stroke-width': '1.2' }));
      g.appendChild(makeElement('svg:text', { x: w/2, y: 15, fill: col, 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold', 'text-anchor': 'middle' }, title));
      g.appendChild(makeElement('svg:text', { x: w/2, y: 28, fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8px', 'text-anchor': 'middle' }, sub));
      return g;
    };

    gFreedom.appendChild(makeInstrumentPill(15, 55, 115, 36, '1. Squircle Compass', 'Cursor 3D HUD', '#38bdf8'));
    gFreedom.appendChild(makeInstrumentPill(138, 55, 115, 36, '2. Phone Glass Deck', 'Left-Hand Analog', '#f59e0b'));
    gFreedom.appendChild(makeInstrumentPill(260, 55, 110, 36, '3. Precision Mouse', 'Right-Hand Snap', '#10b981'));

    gFreedom.appendChild(makeInstrumentPill(15, 102, 115, 36, '4. On-Curve Splines', 'Through-Point G1', '#a855f7'));
    gFreedom.appendChild(makeInstrumentPill(138, 102, 115, 36, '5. PBR Studio', 'Materials & Lights', '#ec4899'));
    gFreedom.appendChild(makeInstrumentPill(260, 102, 110, 36, '6. Key Command Tree', 'Instant Single-Key', '#00f2fe'));

    gFreedom.appendChild(makeElement('svg:text', { x: '192', y: '158', fill: '#10b981', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '✓ Run in docs, browsers, tablets, or native shells'));
    svg.appendChild(gFreedom);

    stage.appendChild(svg);

    const desc = makeElement('div', {
      style: {
        background: '#0a0e1a', border: '1px solid #1e293b', borderRadius: '8px',
        padding: '12px 14px', fontSize: '11.5px', color: '#cbd5e1', lineHeight: '1.55'
      }
    }, [
      makeElement('strong', { style: { color: '#38bdf8', display: 'block', marginBottom: '4px' } }, 'Rob Brown: Freedom Over Abstract Mathematics'),
      'Precision in CAD is assumed—any serious tool must handle hard numbers, snaps, and exact vectors. But the real breakthrough is not abstract mathematics; it is ',
      makeElement('strong', { style: { color: '#10b981' } }, 'human-interactive instruments'),
      '. Bentley Systems locked AccuDraw inside a monolithic $10,000 desktop suite for thirty years. Our architecture frees these instruments into composable, tactile tools that you can hook together in whatever way works best for you—on your phone, across browser tabs, or embedded in live documentation.'
    ]);
    stage.appendChild(desc);

    wrap.appendChild(stage);
    container.appendChild(wrap);
  }
}

globalThis.CadErgonomicFreedomGraphic = CadErgonomicFreedomGraphic;
if (typeof module !== 'undefined' && module.exports) module.exports = CadErgonomicFreedomGraphic;