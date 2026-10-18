class CadTouchP2PGraphicComponent {
  /**
   * Hero Visual Graphic for Chapter 6 (TouchController & Two-Handed CAD).
   * Displays the mobile glass companion deck in action alongside desktop mouse interaction:
   * Left hand resting on mobile touchzones (Orbit, Pan, Z-Elevation Wheel, Parameter Scrubbing)
   * while Right hand drives precision cursor snapping on the desktop.
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
        makeElement('span', { style: { fontSize: '15px' } }, '📱'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'Two-Handed CAD Architecture: Precision Mouse + Mobile Glass Deck'),
        makeElement('span', { style: { fontSize: '10px', background: '#f59e0b', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Sub-Millisecond WebRTC')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#10b981', fontFamily: 'monospace' } }, 'Concurrent Analog Modulation')
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

    // 1. Left Section: Left Hand on Smartphone Glass
    const phoneG = makeElement('svg:g', { transform: 'translate(30, 20)' });
    phoneG.appendChild(makeElement('svg:rect', { width: '220', height: '175', rx: '14', fill: '#0a0d16', stroke: '#38bdf8', 'stroke-width': '2' }));
    phoneG.appendChild(makeElement('svg:rect', { x: '10', y: '12', width: '95', height: '150', rx: '8', fill: '#161e2b', stroke: 'rgba(56, 189, 248, 0.4)', 'stroke-width': '1' }));
    phoneG.appendChild(makeElement('svg:rect', { x: '115', y: '12', width: '95', height: '150', rx: '8', fill: '#161e2b', stroke: 'rgba(16, 185, 129, 0.4)', 'stroke-width': '1' }));

    phoneG.appendChild(makeElement('svg:text', { x: '57', y: '32', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'LEFT TRACKPAD'));
    phoneG.appendChild(makeElement('svg:text', { x: '57', y: '52', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '1-Finger Orbit'));
    phoneG.appendChild(makeElement('svg:text', { x: '57', y: '70', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '2-Finger Zoom'));
    phoneG.appendChild(makeElement('svg:text', { x: '57', y: '88', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '3-Finger FOV Lens'));
    phoneG.appendChild(makeElement('svg:text', { x: '57', y: '106', fill: '#f59e0b', 'font-family': 'monospace', 'font-size': '8.5px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '4-Finger Z-Wheel'));

    phoneG.appendChild(makeElement('svg:text', { x: '162', y: '32', fill: '#10b981', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'RIGHT TRACKPAD'));
    phoneG.appendChild(makeElement('svg:text', { x: '162', y: '56', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '↕ Vertical Swipe:'));
    phoneG.appendChild(makeElement('svg:text', { x: '162', y: '72', fill: '#cbd5e1', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, 'Select Active Slider'));
    phoneG.appendChild(makeElement('svg:text', { x: '162', y: '96', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, '↔ Horizontal Scrub:'));
    phoneG.appendChild(makeElement('svg:text', { x: '162', y: '112', fill: '#cbd5e1', 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle' }, 'Dial Continuous Value'));
    phoneG.appendChild(makeElement('svg:text', { x: '162', y: '136', fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '8.5px', 'font-weight': 'bold', 'text-anchor': 'middle' }, '● Tap: Toggle / Inset'));
    svg.appendChild(phoneG);

    // 2. Center: WebRTC P2P Data Channel Arrow
    const pipeG = makeElement('svg:g');
    pipeG.appendChild(makeElement('svg:line', {
      x1: '255', y1: '105', x2: '465', y2: '105',
      stroke: '#00e676', 'stroke-width': '2.5', 'stroke-dasharray': '5,4'
    }));
    pipeG.appendChild(makeElement('svg:rect', { x: '305', y: '88', width: '115', height: '34', rx: '6', fill: '#070a13', stroke: '#00e676', 'stroke-width': '1.5' }));
    pipeG.appendChild(makeElement('svg:text', { x: '362', y: '104', fill: '#00e676', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'WebRTC DataChannel'));
    pipeG.appendChild(makeElement('svg:text', { x: '362', y: '116', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8px', 'text-anchor': 'middle' }, '< 1ms Local LAN SSE'));
    svg.appendChild(pipeG);

    // 3. Right Section: Desktop 3D Viewport with Live Snapping
    const desktopG = makeElement('svg:g', { transform: 'translate(470, 20)' });
    desktopG.appendChild(makeElement('svg:rect', { width: '240', height: '175', rx: '10', fill: '#0d1117', stroke: '#21262d', 'stroke-width': '2' }));

    // Viewport CAD Canvas
    desktopG.appendChild(makeElement('svg:rect', { x: '10', y: '12', width: '220', height: '150', rx: '6', fill: '#050811', stroke: '#1e293b', 'stroke-width': '1' }));

    // Green On-Screen Slider Guide Line
    desktopG.appendChild(makeElement('svg:line', {
      x1: '10', y1: '55', x2: '230', y2: '55',
      stroke: '#00e676', 'stroke-width': '1.5', 'stroke-dasharray': '4,3', opacity: '0.8'
    }));

    // Live Spline Being Drawn with Right-Hand Mouse
    desktopG.appendChild(makeElement('svg:path', {
      d: 'M 35 125 C 75 40, 140 145, 195 75',
      fill: 'none', stroke: '#38bdf8', 'stroke-width': '3', 'stroke-linecap': 'round'
    }));
    desktopG.appendChild(makeElement('svg:circle', { cx: '195', cy: '75', r: '4', fill: '#00e676' }));

    desktopG.appendChild(makeElement('svg:text', { x: '120', y: '145', fill: '#cbd5e1', 'font-family': 'monospace', 'font-size': '9.5px', 'text-anchor': 'middle', 'font-weight': 'bold' }, 'Right Hand: Precision Mouse'));
    desktopG.appendChild(makeElement('svg:text', { x: '120', y: '26', fill: '#00e676', 'font-family': 'monospace', 'font-size': '9px', 'text-anchor': 'middle' }, 'Glowing Active Slider Guide Line'));
    svg.appendChild(desktopG);

    stage.appendChild(svg);

    const descCard = makeElement('div', {
      style: {
        background: '#0a0e1a', border: '1px solid #1e293b', borderRadius: '8px',
        padding: '12px 14px', fontSize: '11.5px', color: '#cbd5e1', lineHeight: '1.55'
      }
    }, [
      makeElement('strong', { style: { color: '#38bdf8', display: 'block', marginBottom: '4px' } }, 'The Two-Handed Bandwidth Multiplier'),
      'In traditional CAD, your left hand sits idle hovering over a keyboard while your right hand does 95% of the physical work. Adjusting a parameter forces you to stop drawing, move the cursor away, click a slider, and re-acquire your place. With TouchController, your left hand on your phone fluidly dials continuous variables—curve tension, corner fillets, or the 3D elevation Z-wheel—while your right hand never takes its eyes off the geometry.'
    ]);
    stage.appendChild(descCard);

    wrap.appendChild(stage);
    container.appendChild(wrap);
  }
}

globalThis.CadTouchP2PGraphicComponent = CadTouchP2PGraphicComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadTouchP2PGraphicComponent;