class CadArchitectureGraphicComponent {
  /**
   * Visual Component for Chapter 9 (Production Architecture).
   * Renders the Clean 4-Layer Headless Geometric Stack separating
   * pure geometry, command machines, render adapters, and UI ergonomics.
   */
  static render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        background: '#070a13', border: '1.5px solid #21262d', borderRadius: '12px', overflow: 'hidden',
        boxShadow: '0 12px 32px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', padding: '16px', gap: '12px'
      }
    });

    wrap.appendChild(makeElement('strong', {
      style: { color: '#38bdf8', fontSize: '13px', fontFamily: 'monospace' }
    }, '📐 The Clean 4-Layer Headless Kernel Architecture'));

    const stackBox = makeElement('div', {
      style: { display: 'flex', flexDirection: 'column', gap: '8px' }
    });

    const layerCard = (num, name, tech, role, col) => makeElement('div', {
      style: {
        background: '#0d1117', border: `1.5px solid ${col}`, borderRadius: '8px', padding: '10px 14px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
      }
    }, [
      makeElement('div', {}, [
        makeElement('span', { style: { fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: col, marginRight: '8px' } }, `Layer ${num}`),
        makeElement('strong', { style: { fontSize: '13px', color: '#f8fafc', fontFamily: 'monospace' } }, name),
        makeElement('div', { style: { fontSize: '11px', color: '#94a3b8', marginTop: '2px' } }, role)
      ]),
      makeElement('span', { style: { fontSize: '10px', background: col + '22', color: col, border: `1px solid ${col}44`, padding: '2px 8px', borderRadius: '12px', fontFamily: 'monospace', fontWeight: 'bold' } }, tech)
    ]);

    stackBox.appendChild(layerCard('4', 'UI & Ergonomics Shell', 'Three.js / DOM HUD', 'Squircle3D, glowing carets, and P2P mobile phone controller', '#a855f7'));
    stackBox.appendChild(layerCard('3', 'Render Adapter Pipeline', 'wgpu / WebGL2', 'Screen-space thick wireframes, PBR clearcoats, and vertex strip tessellation', '#38bdf8'));
    stackBox.appendChild(layerCard('2', 'Command & Tool Machines', 'State Machines', 'SmartLine tangent chaining, KeyCommandHandler without Enter, and 50ms chording', '#10b981'));
    stackBox.appendChild(layerCard('1', 'Pure Geometry & Constraints', 'compassdraw-core (no_std Rust)', 'ThreeAxes direction cosines, ray-curve intersection solving, and relative vectors', '#f59e0b'));

    wrap.appendChild(stackBox);
    container.appendChild(wrap);
  }
}

globalThis.CadArchitectureGraphicComponent = CadArchitectureGraphicComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadArchitectureGraphicComponent;