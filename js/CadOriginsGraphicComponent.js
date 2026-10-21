class CadOriginsGraphicComponent {

  static render(container) {
      container.innerHTML = '';

      let btn2D = null;
      let btn3D = null;
      let app3D = null;
      let instId = null;

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
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('span', { style: { fontSize: '15px' } }, '🏛️'),
          makeElement('strong', { style: { fontSize: '12px', color: '#00f2fe', fontFamily: 'monospace' } }, '1995 Milestone: US Patent #5,754,182 & MicroStation 3D Cube')
        ]),
        makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
          btn2D = makeElement('button', {
            className: 'dr-tab-btn active', id: 'btn-origins-2d-view',
            onclick: () => switchView('2d')
          }, '2D Milestone'),
          btn3D = makeElement('button', {
            className: 'dr-tab-btn', id: 'btn-origins-3d-view',
            onclick: () => switchView('3d')
          }, '📐 Live 3D Workstation')
        ])
      ]);
      wrap.appendChild(header);

      const stage = makeElement('div', {
        id: 'origins-stage-container',
        style: {
          display: 'grid', gridTemplateColumns: 'minmax(280px, 360px) 1fr', gap: '1px', background: '#21262d'
        }
      });

      // Left SVG: 1995 3D Design Cube & Floating Compass
      const svgBox = makeElement('div', {
        id: 'origins-svg-box',
        style: { background: '#090d16', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
      });

      const svg = makeElement('svg:svg', {
        viewBox: '0 0 320 260', width: '100%', height: '240px', style: { display: 'block' }
      });

      // Isometric Cube Wireframe
      const oX = 160, oY = 130;
      const s = 65;
      const cos = 0.866;

      const p0 = [oX, oY];
      const pTop = [oX, oY - s];
      const pBottom = [oX, oY + s];
      const pNE = [oX + s * cos, oY - s * 0.5];
      const pNW = [oX - s * cos, oY - s * 0.5];
      const pSE = [oX + s * cos, oY + s * 0.5];
      const pSW = [oX - s * cos, oY + s * 0.5];

      const polyLine = (pts, col, dash) => makeElement('svg:polyline', {
        points: pts.map(p => p.join(',')).join(' '), fill: 'none', stroke: col, 'stroke-width': '1.5', 'stroke-dasharray': dash || 'none'
      });

      svg.appendChild(polyLine([pNW, pTop, pNE, p0, pNW], '#38bdf8'));
      svg.appendChild(polyLine([pNW, pSW, pBottom, pSE, pNE], 'rgba(56, 189, 248, 0.4)'));
      svg.appendChild(polyLine([p0, pBottom], '#38bdf8'));

      const compassG = makeElement('svg:g', { transform: `translate(${p0[0]}, ${p0[1]}) scale(0.6)` });
      const compassSvg = SquircleCompassSvg.renderElement({ size: 90, squircle: 0.45, activeAxis: 'x', showMiniJack: true, miniJackOffset: [36, -20] });
      compassSvg.setAttribute('x', '-45');
      compassSvg.setAttribute('y', '-45');
      compassG.appendChild(compassSvg);
      svg.appendChild(compassG);

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

      // Live 3D Workstation Mount
      const mount3D = makeElement('div', {
        id: 'accucad-mount-origins-live',
        style: { width: '100%', height: '380px', display: 'none', position: 'relative', background: '#050811' }
      });
      wrap.appendChild(mount3D);

      container.appendChild(wrap);

      async function switchView(mode) {
        btn2D.classList.toggle('active', mode === '2d');
        btn3D.classList.toggle('active', mode === '3d');

        if (mode === '3d') {
          stage.style.display = 'none';
          mount3D.style.display = 'block';

          if (!app3D) {
            const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
            if (isLoaded && globalThis.Main) {
              app3D = new globalThis.Main();
              await app3D.run({
                container: mount3D,
                showSidePanel: false,
                showCompassUi: false,
                presetGeometry: 'bracket',
                cameraPos: { x: 3.5, y: 3.0, z: 4.5 },
                target: [0, 0, 0],
                background: 0x050811,
                initialPlane: 'top'
              });
              instId = CadStudioDemoComponent.registerInstance(app3D, mount3D, 'Origins 3D Workstation');
            }
          }
        } else {
          stage.style.display = 'grid';
          mount3D.style.display = 'none';
        }
      }

      const observer = new MutationObserver(() => {
        if (!document.body.contains(wrap)) {
          if (instId) CadStudioDemoComponent.unregisterInstance(instId);
          if (app3D && typeof app3D.destroy === 'function') app3D.destroy();
          observer.disconnect();
        }
      });
      observer.observe(wrap.parentNode || document.body, { childList: true });
    }
}

globalThis.CadOriginsGraphicComponent = CadOriginsGraphicComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadOriginsGraphicComponent;