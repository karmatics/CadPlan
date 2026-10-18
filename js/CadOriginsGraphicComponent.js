class CadOriginsGraphicComponent {
  /**
   * Visual Component for Chapter 1 (Origins).
   * Renders the 1995 MicroStation 3D Design Cube, US Patent #5,754,182 milestone,
   * and an animated vector compass illustrating the breakthrough from command line to floating compass.
   */
  static render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        background: '#070a13',
        border: '1.5px solid #21262d',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column'
      }
    });

    const header = makeElement('div', {
      style: {
        padding: '10px 16px', background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid #21262d',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '15px' } }, '🏛️'),
        makeElement('strong', { style: { fontSize: '12px', color: '#38bdf8', fontFamily: 'monospace' } }, '1995 Milestone: US Patent #5,754,182 & MicroStation 3D Cube')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#10b981', fontFamily: 'monospace', fontWeight: 'bold' } }, 'Sole Inventor: Robert J. Brown')
    ]);
    wrap.appendChild(header);

    const stage = makeElement('div', {
      style: {
        display: 'grid', gridTemplateColumns: 'minmax(280px, 360px) 1fr', gap: '1px', background: '#21262d'
      }
    });

    // Left SVG: 1995 3D Design Cube & Floating Compass
    const svgBox = makeElement('div', {
      style: { background: '#090d16', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
    });

    const svg = makeElement('svg:svg', {
      viewBox: '0 0 320 260', width: '100%', height: '240px', style: { display: 'block' }
    });

    // Isometric Cube Wireframe
    const oX = 160, oY = 130;
    const s = 65;
    const cos = 0.866, sin = 0.5;

    const p0 = [oX, oY]; // center front
    const pTop = [oX, oY - s];
    const pBottom = [oX, oY + s];
    const pNE = [oX + s * cos, oY - s * sin];
    const pNW = [oX - s * cos, oY - s * sin];
    const pSE = [oX + s * cos, oY + s * sin];
    const pSW = [oX - s * cos, oY + s * sin];
    const pFarTop = [oX, oY - 2 * s * sin - s];

    const polyLine = (pts, col, dash) => makeElement('svg:polyline', {
      points: pts.map(p => p.join(',')).join(' '), fill: 'none', stroke: col, 'stroke-width': '1.5', 'stroke-dasharray': dash || 'none'
    });

    // Cube edges
    svg.appendChild(polyLine([pNW, pTop, pNE, p0, pNW], '#38bdf8'));
    svg.appendChild(polyLine([pNW, pSW, pBottom, pSE, pNE], 'rgba(56, 189, 248, 0.4)'));
    svg.appendChild(polyLine([p0, pBottom], '#38bdf8'));

    // Floating AccuDraw Compass at Front Corner
    const compassG = makeElement('svg:g', { transform: `translate(${p0[0]}, ${p0[1]}) scale(0.6)` });
    const compassSvg = SquircleCompassSvg.renderElement({ size: 90, squircle: 0.45, activeAxis: 'x', showMiniJack: true, miniJackOffset: [36, -20] });
    compassSvg.setAttribute('x', '-45');
    compassSvg.setAttribute('y', '-45');
    compassG.appendChild(compassSvg);
    svg.appendChild(compassG);

    // Dynamic Pulsing Dimension Annotation
    svg.appendChild(makeElement('svg:text', { x: '180', y: '110', fill: '#ef4444', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, 'DX=12.50'));

    svgBox.appendChild(svg);
    stage.appendChild(svgBox);

    // Right Box: Historical Synthesis
    const descBox = makeElement('div', {
      style: { background: '#0a0e1a', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', color: '#cbd5e1', lineHeight: '1.55' }
    }, [
      makeElement('div', { style: { color: '#f8fafc', fontWeight: 'bold', fontSize: '13px' } }, 'The Ergonomic Revolution in 3D Modeling'),
      makeElement('p', { style: { margin: '0' } }, 'Before AccuDraw, 3D computer drafting was an agonizing exercise in typing blind coordinates (DX=, DL=, active depth commands) or constructing temporary scratch geometry. AccuDraw brought the coordinate system directly to the cursor tip, evaluating mouse motion and indexing axes automatically.'),
      makeElement('div', {
        style: { background: 'rgba(56, 189, 248, 0.08)', borderLeft: '3px solid #38bdf8', padding: '8px 10px', borderRadius: '4px', fontSize: '11px', color: '#94a3b8' }
      }, '• Patent Awarded: US #5,754,182 (Sole Inventor: Robert J. Brown)\n• Bentley corporate first patent\n• Public Domain: Statutory 20-year exclusivity term expired May 2018.')
    ]);
    stage.appendChild(descBox);

    wrap.appendChild(stage);
    container.appendChild(wrap);
  }
}

globalThis.CadOriginsGraphicComponent = CadOriginsGraphicComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadOriginsGraphicComponent;