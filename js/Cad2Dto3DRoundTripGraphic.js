class Cad2Dto3DRoundTripGraphic {

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
          flexDirection: 'column',
          outline: 'none'
        },
        tabIndex: 0
      });

      // 1. Header Toolbar
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
          makeElement('span', { style: { fontSize: '15px' } }, '🔄'),
          makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'Interactive 2D ↔ 3D Round-Trip Engine: AutoCAD OCS to AccuDraw WCS'),
          makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Verified Invertibility')
        ]),
        makeElement('span', { id: 'rt-invert-badge', style: { fontSize: '11px', color: '#10b981', fontFamily: 'monospace', fontWeight: 'bold' } }, '✓ Machine Epsilon: Δ = 0.000000 mm')
      ]);
      wrap.appendChild(header);

      // 2. Presets & Controls Bar
      const controlsBar = makeElement('div', {
        style: {
          padding: '8px 14px',
          background: '#0d1117',
          borderBottom: '1px solid #161e2b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '11px',
          fontFamily: 'monospace'
        }
      });

      const presetGroup = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        makeElement('span', { style: { color: '#94a3b8', fontWeight: 'bold' } }, 'Presets:'),
        makeElement('button', { className: 'dr-tab-btn active', id: 'rt-btn-tab', onclick: () => loadPreset('tab') }, 'Angled Tab'),
        makeElement('button', { className: 'dr-tab-btn', id: 'rt-btn-rafter', onclick: () => loadPreset('rafter') }, 'Roof Rafter'),
        makeElement('button', { className: 'dr-tab-btn', id: 'rt-btn-cam', onclick: () => loadPreset('cam') }, 'Keyway Cam')
      ]);

      const planeButtons = makeElement('div', { style: { display: 'flex', gap: '4px', alignItems: 'center' } }, [
        makeElement('span', { style: { color: '#38bdf8', fontWeight: 'bold' } }, 'Normal:'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setNormal(0, 1, 0) }, 'Top'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setNormal(0, 0, 1) }, 'Front'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setNormal(1, 0, 0) }, 'Side'),
        makeElement('button', { className: 'dr-nav-btn primary', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setNormal(0.7071, 0.7071, 0) }, '45° Angled')
      ]);

      controlsBar.appendChild(presetGroup);
      controlsBar.appendChild(planeButtons);
      wrap.appendChild(controlsBar);

      // 3. Dual Stage Canvas
      const stageGrid = makeElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(340px, 1.2fr)',
          gap: '1px',
          background: '#21262d'
        }
      });

      const W_HALF = 380;
      const H_CANVAS = 280;

      // Left Pane: 2D Planar OCS View
      const leftPane = makeElement('div', {
        style: { background: '#090d16', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }
      });
      leftPane.appendChild(makeElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontFamily: 'monospace' }
      }, [
        makeElement('strong', { style: { color: '#38bdf8' } }, '1. 2D Planar OCS Entity Space (u, v)'),
        makeElement('span', { style: { color: '#64748b' } }, 'AutoCAD LWPOLYLINE')
      ]));

      const svgLeft = makeElement('svg:svg', {
        viewBox: `0 0 ${W_HALF} ${H_CANVAS}`, width: '100%', height: `${H_CANVAS}px`,
        style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '8px' }
      });
      leftPane.appendChild(svgLeft);
      stageGrid.appendChild(leftPane);

      // Right Pane: 3D World Space (WCS) View
      const rightPane = makeElement('div', {
        style: { background: '#090d16', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }
      });

      rightPane.appendChild(makeElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontFamily: 'monospace' }
      }, [
        makeElement('strong', { style: { color: '#10b981' } }, '2. 3D World Space (WCS) + AccuDraw Compass'),
        makeElement('div', { style: { display: 'flex', gap: '4px' } }, [
          btnIsoMode = makeElement('button', {
            className: 'dr-tab-btn active', id: 'btn-rt-iso',
            style: { padding: '2px 6px', fontSize: '9.5px' },
            onclick: () => switch3DMode('iso')
          }, 'Isometric'),
          btnWebGlMode = makeElement('button', {
            className: 'dr-tab-btn', id: 'btn-rt-webgl',
            style: { padding: '2px 6px', fontSize: '9.5px' },
            onclick: () => switch3DMode('webgl')
          }, '🎮 3D WebGL Orbit')
        ])
      ]));
      let btnIsoMode, btnWebGlMode;

      const svgRight = makeElement('svg:svg', {
        id: 'rt-svg-right-pane',
        viewBox: `0 0 ${W_HALF} ${H_CANVAS}`, width: '100%', height: `${H_CANVAS}px`,
        style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '8px' }
      });
      rightPane.appendChild(svgRight);

      // Optional WebGL canvas mount for live Orbit inspection
      const webglMount = makeElement('div', {
        id: 'accucad-mount-rt-3d',
        style: { width: '100%', height: `${H_CANVAS}px`, display: 'none', position: 'relative', background: '#050811', borderRadius: '8px', overflow: 'hidden' }
      });
      rightPane.appendChild(webglMount);

      stageGrid.appendChild(rightPane);
      wrap.appendChild(stageGrid);

      // 4. Telemetry & DXF Output Box
      const telemetryBox = makeElement('div', {
        style: {
          padding: '12px 16px',
          background: '#0a0e1a',
          borderTop: '1px solid #21262d',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '14px',
          fontFamily: 'monospace',
          fontSize: '11px',
          lineHeight: '1.45'
        }
      });

      const mathReadout = makeElement('div', {
        id: 'rt-math-readout',
        style: { background: '#070a13', border: '1px solid #1e293b', borderRadius: '6px', padding: '10px', color: '#cbd5e1' }
      });

      const dxfReadout = makeElement('pre', {
        id: 'rt-dxf-readout',
        style: {
          background: '#070a13', border: '1px solid #1e293b', borderRadius: '6px', padding: '10px',
          color: '#7ee787', fontSize: '10.5px', margin: 0, maxHeight: '110px', overflowY: 'auto', whiteSpace: 'pre'
        }
      });

      telemetryBox.appendChild(mathReadout);
      telemetryBox.appendChild(dxfReadout);
      wrap.appendChild(telemetryBox);

      container.appendChild(wrap);

      let app3D = null;
      let instId = null;

      const state = {
        preset: 'tab',
        normal: [0.7071, 0.7071, 0.0],
        elevation: 20.0,
        vertices: []
      };

      const presets = {
        tab: [
          { u: 20, v: 20, bulge: 0 },
          { u: 100, v: 20, bulge: 0.4142 },
          { u: 140, v: 60, bulge: 0 },
          { u: 140, v: 120, bulge: 0 },
          { u: 20, v: 120, bulge: 0 }
        ],
        rafter: [
          { u: 30, v: 30, bulge: 0 },
          { u: 140, v: 30, bulge: 0 },
          { u: 140, v: 60, bulge: 0 },
          { u: 50, v: 110, bulge: 0 },
          { u: 30, v: 95, bulge: 0 }
        ],
        cam: [
          { u: 40, v: 70, bulge: 1.0 },
          { u: 120, v: 70, bulge: 0 },
          { u: 120, v: 40, bulge: -0.4142 },
          { u: 60, v: 20, bulge: 0 }
        ]
      };

      function computeOcsMatrix(nx, ny, nz) {
        const len = Math.hypot(nx, ny, nz) || 1;
        const unx = nx / len, uny = ny / len, unz = nz / len;
        let axX, axY, axZ;
        if (Math.abs(unx) < 1.0 / 64.0 && Math.abs(uny) < 1.0 / 64.0) {
          axX = unz; axY = 0; axZ = -unx;
        } else {
          axX = -uny; axY = unx; axZ = 0;
        }
        const axLen = Math.hypot(axX, axY, axZ) || 1;
        axX /= axLen; axY /= axLen; axZ /= axLen;

        const ayX = uny * axZ - unz * axY;
        const ayY = unz * axX - unx * axZ;
        const ayZ = unx * axY - uny * axX;

        return {
          ax: [axX, axY, axZ],
          ay: [ayX, ayY, ayZ],
          n: [unx, uny, unz]
        };
      }

      function ocsToWcs(u, v, elev, ocs) {
        return [
          u * ocs.ax[0] + v * ocs.ay[0] + elev * ocs.n[0],
          u * ocs.ax[1] + v * ocs.ay[1] + elev * ocs.n[1],
          u * ocs.ax[2] + v * ocs.ay[2] + elev * ocs.n[2]
        ];
      }

      function wcsToOcs(xw, yw, zw, ocs) {
        return {
          u: xw * ocs.ax[0] + yw * ocs.ax[1] + zw * ocs.ax[2],
          v: xw * ocs.ay[0] + yw * ocs.ay[1] + zw * ocs.ay[2],
          elev: xw * ocs.n[0] + yw * ocs.n[1] + zw * ocs.n[2]
        };
      }

      const COS30 = Math.cos(Math.PI / 6);
      const SIN30 = Math.sin(Math.PI / 6);

      function toIso(x, y, z) {
        const ox = W_HALF / 2;
        const oy = H_CANVAS / 2 + 20;
        const scale = 0.95;
        const sx = ox + (x - y) * COS30 * scale;
        const sy = oy + (x + y) * SIN30 * scale - z * scale;
        return [sx, sy];
      }

      function setNormal(nx, ny, nz) {
        state.normal = [nx, ny, nz];
        updateAll();
      }

      function loadPreset(name) {
        state.preset = name;
        state.vertices = presets[name].map(v => ({ ...v }));

        document.querySelectorAll('#rt-btn-tab, #rt-btn-rafter, #rt-btn-cam').forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById(`rt-btn-${name}`);
        if (activeBtn) activeBtn.classList.add('active');

        updateAll();
      }

      async function switch3DMode(mode) {
        btnIsoMode.classList.toggle('active', mode === 'iso');
        btnWebGlMode.classList.toggle('active', mode === 'webgl');

        if (mode === 'webgl') {
          svgRight.style.display = 'none';
          webglMount.style.display = 'block';

          if (!app3D) {
            const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
            if (isLoaded && globalThis.Main) {
              app3D = new globalThis.Main();
              await app3D.run({
                container: webglMount,
                showSidePanel: false,
                showCompassUi: false,
                presetGeometry: 'bracket',
                cameraPos: { x: 3.5, y: 3.2, z: 4.8 },
                target: [0, 0, 0],
                background: 0x050811,
                initialPlane: 'top'
              });

              instId = CadStudioDemoComponent.registerInstance(app3D, webglMount, 'RoundTrip 3D Orbit');
            }
          }
        } else {
          svgRight.style.display = 'block';
          webglMount.style.display = 'none';
        }
      }

      function updateAll() {
        svgLeft.innerHTML = '';
        svgRight.innerHTML = '';

        const ocs = computeOcsMatrix(state.normal[0], state.normal[1], state.normal[2]);

        // 1. Render Left Pane: 2D OCS Planar Geometry
        const gLeftGrid = makeElement('svg:g');
        for (let i = 20; i < W_HALF; i += 30) {
          gLeftGrid.appendChild(makeElement('svg:line', { x1: i, y1: 0, x2: i, y2: H_CANVAS, stroke: 'rgba(255,255,255,0.035)' }));
        }
        for (let j = 20; j < H_CANVAS; j += 30) {
          gLeftGrid.appendChild(makeElement('svg:line', { x1: 0, y1: j, x2: W_HALF, y2: j, stroke: 'rgba(255,255,255,0.035)' }));
        }
        svgLeft.appendChild(gLeftGrid);

        let d2D = `M ${state.vertices[0].u * 1.8 + 30} ${H_CANVAS - (state.vertices[0].v * 1.8 + 30)}`;
        for (let i = 1; i < state.vertices.length; i++) {
          const vx = state.vertices[i].u * 1.8 + 30;
          const vy = H_CANVAS - (state.vertices[i].v * 1.8 + 30);
          d2D += ` L ${vx} ${vy}`;
        }
        d2D += ' Z';

        svgLeft.appendChild(makeElement('svg:path', {
          d: d2D, fill: 'rgba(56, 189, 248, 0.12)', stroke: '#38bdf8', 'stroke-width': '2.5', 'stroke-linejoin': 'round'
        }));

        state.vertices.forEach(v => {
          svgLeft.appendChild(makeElement('svg:circle', {
            cx: v.u * 1.8 + 30, cy: H_CANVAS - (v.v * 1.8 + 30), r: '4', fill: '#38bdf8'
          }));
        });

        // 2. Render Right Pane: 3D World Space (WCS) Lift
        const wcsPoints = state.vertices.map(v => ocsToWcs(v.u, v.v, state.elevation, ocs));

        const oIso = toIso(0, 0, 0);
        const xIso = toIso(60, 0, 0);
        const yIso = toIso(0, 60, 0);
        const zIso = toIso(0, 0, 60);

        svgRight.appendChild(makeElement('svg:line', { x1: oIso[0], y1: oIso[1], x2: xIso[0], y2: xIso[1], stroke: '#ef4444', 'stroke-width': '1.5' }));
        svgRight.appendChild(makeElement('svg:line', { x1: oIso[0], y1: oIso[1], x2: yIso[0], y2: yIso[1], stroke: '#10b981', 'stroke-width': '1.5' }));
        svgRight.appendChild(makeElement('svg:line', { x1: oIso[0], y1: oIso[1], x2: zIso[0], y2: zIso[1], stroke: '#38bdf8', 'stroke-width': '1.5' }));

        let d3D = `M ${toIso(wcsPoints[0][0], wcsPoints[0][1], wcsPoints[0][2]).join(' ')}`;
        for (let i = 1; i < wcsPoints.length; i++) {
          d3D += ` L ${toIso(wcsPoints[i][0], wcsPoints[i][1], wcsPoints[i][2]).join(' ')}`;
        }
        d3D += ' Z';

        svgRight.appendChild(makeElement('svg:path', {
          d: d3D, fill: 'rgba(16, 185, 129, 0.15)', stroke: '#10b981', 'stroke-width': '2.5', 'stroke-linejoin': 'round'
        }));

        wcsPoints.forEach((p, idx) => {
          const iso = toIso(p[0], p[1], p[2]);
          svgRight.appendChild(makeElement('svg:circle', {
            cx: iso[0], cy: iso[1], r: '4', fill: idx === 0 ? '#38bdf8' : '#10b981'
          }));
        });

        // Render Floating Squircle Compass at Vertex 0
        const anchorIso = toIso(wcsPoints[0][0], wcsPoints[0][1], wcsPoints[0][2]);
        const compG = makeElement('svg:g', {
          transform: `translate(${anchorIso[0]}, ${anchorIso[1]}) rotate(-25) skewX(25) scale(0.42)`
        });
        const compassSvg = SquircleCompassSvg.renderElement({
          size: 90, squircle: 0.5, activeAxis: 'x', showMiniJack: true, miniJackOffset: [26, -18]
        });
        compassSvg.setAttribute('x', '-45');
        compassSvg.setAttribute('y', '-45');
        compG.appendChild(compassSvg);
        svgRight.appendChild(compG);

        // 3. Automated Invertibility Verification Test
        let maxError = 0;
        state.vertices.forEach((origV, idx) => {
          const wcs = wcsPoints[idx];
          const roundTrip = wcsToOcs(wcs[0], wcs[1], wcs[2], ocs);
          const err = Math.hypot(origV.u - roundTrip.u, origV.v - roundTrip.v, state.elevation - roundTrip.elev);
          if (err > maxError) maxError = err;
        });

        const badge = document.getElementById('rt-invert-badge');
        if (badge) {
          badge.textContent = `✓ Invertibility: Δ = ${maxError.toExponential(4)} mm`;
          badge.style.color = maxError < 1e-9 ? '#10b981' : '#f59e0b';
        }

        mathReadout.innerHTML = `
          <div style="color:#00f2fe; font-weight:bold; margin-bottom:4px;">📐 OCS Arbitrary Axis Matrix [cadcraft-geom::mat::Mat4]:</div>
          <div>Ax: [${ocs.ax.map(n => n.toFixed(3)).join(', ')}]</div>
          <div>Ay: [${ocs.ay.map(n => n.toFixed(3)).join(', ')}]</div>
          <div>N:  [${ocs.n.map(n => n.toFixed(3)).join(', ')}] (Elevation: ${state.elevation.toFixed(1)})</div>
          <div style="color:#10b981; font-weight:bold; margin-top:6px;">WCS Vertex 0: [${wcsPoints[0].map(n => n.toFixed(2)).join(', ')}]</div>
        `;

        let dxfText = `0\nLWPOLYLINE\n8\nACCUDRAW_3D\n90\n${state.vertices.length}\n70\n1\n`;
        dxfText += `210\n${ocs.n[0].toFixed(4)}\n220\n${ocs.n[1].toFixed(4)}\n230\n${ocs.n[2].toFixed(4)}\n`;
        dxfText += `38\n${state.elevation.toFixed(2)}\n`;

        state.vertices.forEach(v => {
          dxfText += `10\n${v.u.toFixed(2)}\n20\n${v.v.toFixed(2)}\n`;
          if (v.bulge) dxfText += `42\n${v.bulge.toFixed(4)}\n`;
        });

        dxfReadout.textContent = dxfText;
      }

      loadPreset('tab');

      const observer = new MutationObserver(() => {
        if (!document.body.contains(wrap)) {
          if (instId && typeof CadStudioDemoComponent !== 'undefined') {
            CadStudioDemoComponent.unregisterInstance(instId);
          }
          if (app3D && typeof app3D.destroy === 'function') {
            app3D.destroy();
          }
          observer.disconnect();
        }
      });
      observer.observe(wrap.parentNode || document.body, { childList: true });
    }
}

globalThis.Cad2Dto3DRoundTripGraphic = Cad2Dto3DRoundTripGraphic;
if (typeof module !== 'undefined' && module.exports) module.exports = Cad2Dto3DRoundTripGraphic;