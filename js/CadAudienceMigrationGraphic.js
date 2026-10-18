class CadAudienceMigrationGraphic {
  /**
   * Strategic Leverage & Audience Migration Graphic.
   * Visualizes Rob Brown's market strategy:
   * 1. The Disillusioned Audience (fleeing $10k legacy subscriptions).
   * 2. The Clone Landing Pad (AutoCAD compatibility for zero-friction landing).
   * 3. The Inventor's Giveaway (AccuDraw & SmartLine gifted to open source).
   * 4. The Vibe Coding Accelerator (detailed specification + LLM = immense speed).
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
        makeElement('span', { style: { fontSize: '15px' } }, '⚡'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'Market Strategy: The Audience Capture & Vibe-Coding Flywheel'),
        makeElement('span', { style: { fontSize: '10px', background: '#e11d48', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Strategic Leverage')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#10b981', fontFamily: 'monospace' } }, 'Open-Source Gift from the Inventor')
    ]);
    wrap.appendChild(header);

    const stage = makeElement('div', {
      style: { padding: '16px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '12px' }
    });

    const svgW = 740, svgH = 210;
    const svg = makeElement('svg:svg', {
      viewBox: `0 0 ${svgW} ${svgH}`, width: '100%', height: '210px',
      style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '10px' }
    });

    // Step 1: Legacy Squeeze
    const s1 = makeElement('svg:g', { transform: 'translate(15, 25)' });
    s1.appendChild(makeElement('svg:rect', { width: '160', height: '155', rx: '8', fill: '#0a0d16', stroke: '#ef4444', 'stroke-width': '1.5' }));
    s1.appendChild(makeElement('svg:text', { x: '80', y: '26', fill: '#ef4444', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '1. LEGACY SQUEEZE'));
    s1.appendChild(makeElement('svg:text', { x: '80', y: '48', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '• $10,000/seat/year'));
    s1.appendChild(makeElement('svg:text', { x: '80', y: '66', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '• Bloated desktop suites'));
    s1.appendChild(makeElement('svg:text', { x: '80', y: '84', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '• Customer resentment'));
    s1.appendChild(makeElement('svg:text', { x: '80', y: '110', fill: '#f59e0b', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'Audience is already'));
    s1.appendChild(makeElement('svg:text', { x: '80', y: '124', fill: '#f59e0b', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'looking to escape!'));
    svg.appendChild(s1);

    // Arrow 1
    svg.appendChild(makeElement('svg:line', { x1: '180', y1: '102', x2: '200', y2: '102', stroke: '#38bdf8', 'stroke-width': '2', 'stroke-dasharray': '3,3' }));

    // Step 2: Clone Landing Pad
    const s2 = makeElement('svg:g', { transform: 'translate(205, 25)' });
    s2.appendChild(makeElement('svg:rect', { width: '160', height: '155', rx: '8', fill: '#0a0d16', stroke: '#38bdf8', 'stroke-width': '1.5' }));
    s2.appendChild(makeElement('svg:text', { x: '80', y: '26', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '2. ZERO-SHOCK PAD'));
    s2.appendChild(makeElement('svg:text', { x: '80', y: '48', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '• Drop into AutoCAD mode'));
    s2.appendChild(makeElement('svg:text', { x: '80', y: '66', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '• Free & familiar'));
    s2.appendChild(makeElement('svg:text', { x: '80', y: '84', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '• Commands & DWG/DXF'));
    s2.appendChild(makeElement('svg:text', { x: '80', y: '110', fill: '#10b981', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'Captures the fleeing'));
    s2.appendChild(makeElement('svg:text', { x: '80', y: '124', fill: '#10b981', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'CAD drafters instantly'));
    svg.appendChild(s2);

    // Arrow 2
    svg.appendChild(makeElement('svg:line', { x1: '370', y1: '102', x2: '390', y2: '102', stroke: '#10b981', 'stroke-width': '2', 'stroke-dasharray': '3,3' }));

    // Step 3: The Inventor's Giveaway
    const s3 = makeElement('svg:g', { transform: 'translate(395, 25)' });
    s3.appendChild(makeElement('svg:rect', { width: '160', height: '155', rx: '8', fill: '#0a101d', stroke: '#10b981', 'stroke-width': '1.8' }));
    s3.appendChild(makeElement('svg:text', { x: '80', y: '26', fill: '#10b981', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '3. INVENTOR GIVEAWAY'));
    s3.appendChild(makeElement('svg:text', { x: '80', y: '48', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '• AccuDraw 3D Compass'));
    s3.appendChild(makeElement('svg:text', { x: '80', y: '66', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '• On-curve splines'));
    s3.appendChild(makeElement('svg:text', { x: '80', y: '84', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '• Not a generic clone'));
    s3.appendChild(makeElement('svg:text', { x: '80', y: '110', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'Massive Leverage:'));
    s3.appendChild(makeElement('svg:text', { x: '80', y: '124', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'Free from Rob Brown'));
    svg.appendChild(s3);

    // Arrow 3
    svg.appendChild(makeElement('svg:line', { x1: '560', y1: '102', x2: '580', y2: '102', stroke: '#a855f7', 'stroke-width': '2', 'stroke-dasharray': '3,3' }));

    // Step 4: Vibe Coding Accelerator
    const s4 = makeElement('svg:g', { transform: 'translate(585, 25)' });
    s4.appendChild(makeElement('svg:rect', { width: '140', height: '155', rx: '8', fill: '#0f172a', stroke: '#a855f7', 'stroke-width': '1.8' }));
    s4.appendChild(makeElement('svg:text', { x: '70', y: '26', fill: '#a855f7', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '4. VIBE CODING'));
    s4.appendChild(makeElement('svg:text', { x: '70', y: '48', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, 'Hyper-detailed spec'));
    s4.appendChild(makeElement('svg:text', { x: '70', y: '66', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '+ modern LLMs'));
    s4.appendChild(makeElement('svg:text', { x: '70', y: '84', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '= Agile build loop'));
    s4.appendChild(makeElement('svg:text', { x: '70', y: '110', fill: '#10b981', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'Builds in weeks what'));
    s4.appendChild(makeElement('svg:text', { x: '70', y: '124', fill: '#10b981', 'font-family': 'monospace', 'font-size': '9px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'took 100 people years'));
    svg.appendChild(s4);

    stage.appendChild(svg);

    const desc = makeElement('div', {
      style: {
        background: '#0a0e1a', border: '1px solid #1e293b', borderRadius: '8px',
        padding: '12px 14px', fontSize: '11.5px', color: '#cbd5e1', lineHeight: '1.55'
      }
    }, [
      makeElement('strong', { style: { color: '#38bdf8', display: 'block', marginBottom: '4px' } }, 'Rob Brown: Capturing the Migration Wave with Vibe Coding Velocity'),
      'Legacy CAD vendors live in constant fear of losing their customer base. Users are already eager to leave expensive recurring subscriptions. We give them an effortless landing pad by matching the AutoCAD baseline, and then gift them AccuDraw spatial superpowers as an open-source offering from the original inventor. Sure, a vibe-coded version might initially miss an obscure legacy edge case, but it gains an overwhelming amount of speed, openness, and modern capability because ',
      makeElement('strong', { style: { color: '#a855f7' } }, 'vibe coding guided by a hyper-detailed specification like CadPlan actually works'),
      '.'
    ]);
    stage.appendChild(desc);

    wrap.appendChild(stage);
    container.appendChild(wrap);
  }
}

globalThis.CadAudienceMigrationGraphic = CadAudienceMigrationGraphic;
if (typeof module !== 'undefined' && module.exports) module.exports = CadAudienceMigrationGraphic;