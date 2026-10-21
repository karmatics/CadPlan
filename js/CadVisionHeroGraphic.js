class CadVisionHeroGraphic {

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

      let currentMode = 'accudraw'; // 'autocad' | 'accudraw'

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
          makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'The Expandable Dual-Mode CAD Engine: Workflow Morph Simulator'),
          makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, '3x-4x Velocity')
        ]),
        makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
          btnCad = makeElement('button', {
            className: 'dr-tab-btn', id: 'btn-mode-autocad',
            onclick: () => setMode('autocad')
          }, '1980s AutoCAD Mode'),
          btnAccu = makeElement('button', {
            className: 'dr-tab-btn active', id: 'btn-mode-accudraw',
            style: { color: '#00f2fe' },
            onclick: () => setMode('accudraw')
          }, '⚡ AccuDraw 3D Mode')
        ])
      ]);
      let btnCad, btnAccu;
      wrap.appendChild(header);

      const stage = makeElement('div', {
        style: { padding: '16px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '12px' }
      });

      const svgW = 740, svgH = 200;
      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${svgW} ${svgH}`, width: '100%', height: '200px',
        style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '10px' }
      });

      const drawGroup = makeElement('svg:g');
      svg.appendChild(drawGroup);
      stage.appendChild(svg);

      const descCard = makeElement('div', {
        style: {
          background: '#0a0e1a', border: '1px solid #1e293b', borderRadius: '8px',
          padding: '12px 14px', fontSize: '11.5px', color: '#cbd5e1', lineHeight: '1.55'
        }
      });
      stage.appendChild(descCard);

      wrap.appendChild(stage);
      container.appendChild(wrap);

      function setMode(mode) {
        currentMode = mode;
        btnCad.classList.toggle('active', mode === 'autocad');
        btnAccu.classList.toggle('active', mode === 'accudraw');
        renderSimulator();
        if (typeof CompassSkinAddons !== 'undefined') {
          CompassSkinAddons.playSnapPop(mode === 'accudraw' ? 680 : 380, 0.04);
        }
      }

      function renderSimulator() {
        drawGroup.innerHTML = '';

        if (currentMode === 'autocad') {
          // Render 1980s AutoCAD Command Prompt simulation
          const b1 = makeElement('svg:g', { transform: 'translate(40, 25)' });
          b1.appendChild(makeElement('svg:rect', { width: '660', height: '150', rx: '8', fill: '#0c0f17', stroke: '#ef4444', 'stroke-width': '1.5' }));
          b1.appendChild(makeElement('svg:text', { x: '30', y: '30', fill: '#ef4444', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, 'CLASSIC AUTOCAD PROMPT LOOP (1980s PARADIGM):'));
          b1.appendChild(makeElement('svg:text', { x: '30', y: '58', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '10px' }, 'Command: LINE'));
          b1.appendChild(makeElement('svg:text', { x: '30', y: '78', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '10px' }, 'Specify first point: 100,100,0 <Enter>'));
          b1.appendChild(makeElement('svg:text', { x: '30', y: '98', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '10px' }, 'Specify next point or [Undo]: @15.5<45 <Enter>'));
          b1.appendChild(makeElement('svg:text', { x: '30', y: '118', fill: '#f59e0b', 'font-family': 'monospace', 'font-size': '10px' }, 'Command: UCS -> 3point -> Pick origin -> Pick X -> Pick Y <Enter> (Modal UCS shift)'));
          b1.appendChild(makeElement('svg:text', { x: '30', y: '140', fill: '#ef4444', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold' }, 'Result: Constant keyboard reaching, modal prompts, and broken drafting rhythm.'));
          drawGroup.appendChild(b1);

          descCard.style.borderColor = '#ef4444';
          descCard.innerHTML = `
            <strong style="color:#ef4444;display:block;margin-bottom:4px;">Classic AutoCAD Mode: 100% Familiar Landing Pad</strong>
            Provides the clean-room AutoCAD baseline (prompts, commands, DXF/DWG entities) so fleeing users adopt the platform with zero workflow shock. But it reveals why users find legacy CAD exhausting: every dimension demands looking away to type coordinates followed by the Enter key.
          `;
        } else {
          // Render AccuDraw 3D Spatial Cockpit simulation
          const b2 = makeElement('svg:g', { transform: 'translate(40, 25)' });
          b2.appendChild(makeElement('svg:rect', { width: '660', height: '150', rx: '8', fill: '#0a101d', stroke: '#00f2fe', 'stroke-width': '1.8' }));
          b2.appendChild(makeElement('svg:text', { x: '30', y: '30', fill: '#00f2fe', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, 'ACCUDRAW 3D SPATIAL COCKPIT (THE SUPERPOWER PLUGIN):'));

          // Mini Compass SVG
          const compG = makeElement('svg:g', { transform: 'translate(80, 85) scale(0.55)' });
          const compSvg = SquircleCompassSvg.renderElement({ size: 90, squircle: 0.5, activeAxis: 'x', showMiniJack: true, miniJackOffset: [36, -20] });
          compSvg.setAttribute('x', '-45');
          compSvg.setAttribute('y', '-45');
          compG.appendChild(compSvg);
          b2.appendChild(compG);

          b2.appendChild(makeElement('svg:text', { x: '160', y: '60', fill: '#10b981', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold' }, '✓ Floating 3D Squircle Compass at cursor'));
          b2.appendChild(makeElement('svg:text', { x: '160', y: '80', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '10px' }, '• Single-stroke planes: [T] Top, [F] Front, [S] Side, [V] View'));
          b2.appendChild(makeElement('svg:text', { x: '160', y: '100', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '10px' }, '• [L] Smart Lock clamps axis to 0 • [Space] Morphs between rect & polar'));
          b2.appendChild(makeElement('svg:text', { x: '160', y: '120', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '10px' }, '• On-curve spline relaxation • Two-handed mobile trackpad deck over local Wi-Fi'));
          b2.appendChild(makeElement('svg:text', { x: '160', y: '140', fill: '#00f2fe', 'font-family': 'monospace', 'font-size': '10.5px', 'font-weight': 'bold' }, 'Velocity Multiplier: 2x to 4x Drafting Speed with Zero Enter Keys!'));
          drawGroup.appendChild(b2);

          descCard.style.borderColor = '#00f2fe';
          descCard.innerHTML = `
            <strong style="color:#00f2fe;display:block;margin-bottom:4px;">AccuDraw Smart Mode: The Inventor's Gift Unlocked</strong>
            The prompt disappears. The cursor carries the floating coordinate frame directly into 3D model space. Draftspersons navigate planes and lock dimensions with reflex muscle memory, outputting exact AutoCAD DXF polylines with circular bulges that open losslessly in any standard CAD suite.
          `;
        }
      }

      renderSimulator();
    }
}

globalThis.CadVisionHeroGraphic = CadVisionHeroGraphic;
if (typeof module !== 'undefined' && module.exports) module.exports = CadVisionHeroGraphic;