class CadVisionHeroGraphic {
  /**
   * Hero Visual Graphic for Chapter 12 (Inventor's Vision & Endgame).
   * Displays the Expandable Dual-Mode Tool architecture:
   * Left: 100% AutoCAD baseline mode (universal familiarity, zero friction).
   * Center: The Expandable Gateway.
   * Right: The AccuDraw 3D Spatial Superpower (kinetic compass, on-curve splines).
   * Bottom: AI building the old tool for everyone without $10,000 paywalls.
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
        makeElement('span', { style: { fontSize: '15px' } }, '🚀'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'The Expandable Dual-Mode CAD Engine: AutoCAD Baseline ↔ AccuDraw Superpowers'),
        makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'One Unified Product')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' } }, 'Democratizing Proven CAD for Everyone')
    ]);
    wrap.appendChild(header);

    const stage = makeElement('div', {
      style: { padding: '16px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '12px' }
    });

    const svgW = 740, svgH = 200;
    const svg = makeElement('svg:svg', {
      viewBox: `0 0 ${svgW} ${svgH}`, width: '100%', height: '200px',
      style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '10px' }
    });

    // Box 1: AutoCAD Baseline Mode
    const b1 = makeElement('svg:g', { transform: 'translate(25, 25)' });
    b1.appendChild(makeElement('svg:rect', { width: '210', height: '145', rx: '8', fill: '#0a0d16', stroke: '#38bdf8', 'stroke-width': '1.5' }));
    b1.appendChild(makeElement('svg:text', { x: '105', y: '26', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '11.5px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '1. THE AUTOCAD BASELINE'));
    b1.appendChild(makeElement('svg:text', { x: '105', y: '46', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9.5px', 'text-anchor': 'middle' }, '• Familiar 2D drafting & prompts'));
    b1.appendChild(makeElement('svg:text', { x: '105', y: '64', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9.5px', 'text-anchor': 'middle' }, '• LINE, CIRCLE, OFFSET, TRIM'));
    b1.appendChild(makeElement('svg:text', { x: '105', y: '82', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9.5px', 'text-anchor': 'middle' }, '• Native DWG/DXF layer fidelity'));
    b1.appendChild(makeElement('svg:text', { x: '105', y: '100', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9.5px', 'text-anchor': 'middle' }, '• Zero workflow shock'));
    b1.appendChild(makeElement('svg:text', { x: '105', y: '126', fill: '#10b981', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '✓ Millions of Existing Users'));
    svg.appendChild(b1);

    // Center Expansion Arrow
    const centerG = makeElement('svg:g', { transform: 'translate(245, 75)' });
    centerG.appendChild(makeElement('svg:line', { x1: '0', y1: '25', x2: '130', y2: '25', stroke: '#f59e0b', 'stroke-width': '2.5', 'stroke-dasharray': '5,3' }));
    centerG.appendChild(makeElement('svg:rect', { x: '25', y: '10', width: '80', height: '30', rx: '6', fill: '#070a13', stroke: '#f59e0b', 'stroke-width': '1.5' }));
    centerG.appendChild(makeElement('svg:text', { x: '65', y: '28', fill: '#f59e0b', 'font-family': 'monospace', 'font-size': '9.5px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'EXPANDS TO'));
    svg.appendChild(centerG);

    // Box 2: AccuDraw Smart Mode
    const b2 = makeElement('svg:g', { transform: 'translate(385, 25)' });
    b2.appendChild(makeElement('svg:rect', { width: '220', height: '145', rx: '8', fill: '#0a0d16', stroke: '#10b981', 'stroke-width': '1.5' }));
    b2.appendChild(makeElement('svg:text', { x: '110', y: '26', fill: '#10b981', 'font-family': 'monospace', 'font-size': '11.5px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '2. ACCUDRAW SMART MODE'));
    b2.appendChild(makeElement('svg:text', { x: '110', y: '46', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9.5px', 'text-anchor': 'middle' }, '• Floating Squircle 3D Compass'));
    b2.appendChild(makeElement('svg:text', { x: '110', y: '64', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9.5px', 'text-anchor': 'middle' }, '• Single-stroke plane turns (T/F/S/V)'));
    b2.appendChild(makeElement('svg:text', { x: '110', y: '82', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9.5px', 'text-anchor': 'middle' }, '• On-curve through-point relaxation'));
    b2.appendChild(makeElement('svg:text', { x: '110', y: '100', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9.5px', 'text-anchor': 'middle' }, '• Two-handed P2P mobile modulation'));
    b2.appendChild(makeElement('svg:text', { x: '110', y: '126', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '✓ 30-Year Usability Moat'));
    svg.appendChild(b2);

    // Box 3: AI Builder Catalyst
    const b3 = makeElement('svg:g', { transform: 'translate(615, 25)' });
    b3.appendChild(makeElement('svg:rect', { width: '100', height: '145', rx: '8', fill: '#0f172a', stroke: '#a855f7', 'stroke-width': '1.5' }));
    b3.appendChild(makeElement('svg:text', { x: '50', y: '26', fill: '#a855f7', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'AI BUILDER'));
    b3.appendChild(makeElement('svg:text', { x: '50', y: '55', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '9px', 'text-anchor': 'middle' }, 'Solo dev'));
    b3.appendChild(makeElement('svg:text', { x: '50', y: '70', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '9px', 'text-anchor': 'middle' }, 'scaling to'));
    b3.appendChild(makeElement('svg:text', { x: '50', y: '85', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '9px', 'text-anchor': 'middle' }, '100-person'));
    b3.appendChild(makeElement('svg:text', { x: '50', y: '100', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '9px', 'text-anchor': 'middle' }, 'output'));
    b3.appendChild(makeElement('svg:text', { x: '50', y: '126', fill: '#10b981', 'font-family': 'monospace', 'font-size': '9.5px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'Free to All'));
    svg.appendChild(b3);

    stage.appendChild(svg);
    wrap.appendChild(stage);
    container.appendChild(wrap);
  }
}

globalThis.CadVisionHeroGraphic = CadVisionHeroGraphic;
if (typeof module !== 'undefined' && module.exports) module.exports = CadVisionHeroGraphic;