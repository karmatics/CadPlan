class SvgSmartLineLab {

  static render(container) {
      container.innerHTML = '';

      const wrap = makeElement('div', {
        style: {
          width: '100%',
          minHeight: '660px',
          background: '#070a13',
          borderRadius: '12px',
          border: '1.5px solid #21262d',
          boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          outline: 'none'
        },
        tabIndex: 0
      });

      // 1. Primary Header Toolbar
      const toolbar = makeElement('div', {
        style: {
          padding: '8px 14px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid #21262d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          zIndex: 10
        }
      });

      const modeGroup = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } });

      const btnLine = makeElement('button', {
        className: 'dr-tab-btn active',
        id: 'sml-btn-line',
        style: { fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }
      }, '📏 Line [L]');

      const btnArc = makeElement('button', {
        className: 'dr-tab-btn',
        id: 'sml-btn-arc',
        style: { fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }
      }, '⌒ Tangent Arc [A / ~]');

      const btnSpline = makeElement('button', {
        className: 'dr-tab-btn',
        id: 'sml-btn-spline',
        style: { fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }
      }, '✍️ On-Curve Spline [C]');

      modeGroup.appendChild(btnLine);
      modeGroup.appendChild(btnArc);
      modeGroup.appendChild(btnSpline);

      const viewToggleGroup = makeElement('div', { style: { display: 'flex', gap: '4px', alignItems: 'center' } });
      const btn2D = makeElement('button', {
        className: 'dr-nav-btn primary',
        style: { fontSize: '10px', padding: '3px 8px' }
      }, '2D Planar');
      const btn3D = makeElement('button', {
        className: 'dr-nav-btn',
        style: { fontSize: '10px', padding: '3px 8px' }
      }, '3D Isometric');
      viewToggleGroup.appendChild(btn2D);
      viewToggleGroup.appendChild(btn3D);

      const rightControls = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } });
      const statusBadge = makeElement('span', {
        id: 'sml-status-badge',
        style: {
          fontSize: '11px',
          fontFamily: 'monospace',
          color: '#10b981',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '3px 8px',
          borderRadius: '12px'
        }
      }, 'Mode: Line [2D] • Tap [A] for Tangent Arc • [G] Origin');

      const btnClear = makeElement('button', {
        className: 'dr-nav-btn',
        style: { padding: '3px 8px', fontSize: '10px', color: '#ef4444' }
      }, '🗑️ Clear');

      const btnExportDxf = makeElement('button', {
        className: 'dr-nav-btn primary',
        style: { padding: '3px 8px', fontSize: '10px' }
      }, '📤 DXF Bulges');

      rightControls.appendChild(statusBadge);
      rightControls.appendChild(btnClear);
      rightControls.appendChild(btnExportDxf);

      toolbar.appendChild(modeGroup);
      toolbar.appendChild(viewToggleGroup);
      toolbar.appendChild(rightControls);
      wrap.appendChild(toolbar);

      // 2. Secondary Sub-Bar (Planes, Z-Depth & TouchDeck)
      const subBar = makeElement('div', {
        style: {
          padding: '5px 14px',
          background: '#0d1117',
          borderBottom: '1px solid #161e2b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#94a3b8',
          fontFamily: 'monospace',
          flexWrap: 'wrap',
          gap: '8px'
        }
      });

      const planeButtons = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        makeElement('span', { style: { color: '#38bdf8', fontWeight: 'bold' } }, 'Plane:'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setPlane('top') }, '[T] Top'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setPlane('front') }, '[F] Front'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setPlane('side') }, '[S] Side'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px', color: '#f59e0b', borderColor: '#f59e0b66' }, onclick: () => setPlane('tangent') }, '[R] Exit Tangent'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px', color: '#10b981', borderColor: '#10b98166' }, onclick: () => jumpOriginHomeRow() }, '[G] Origin')
      ]);

      const touchDeck = makeElement('div', {
        style: {
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.03)',
          padding: '2px 10px',
          borderRadius: '8px',
          border: '1px solid #21262d'
        }
      }, [
        makeElement('span', { style: { color: '#f59e0b', fontWeight: 'bold' } }, '📱 TouchDeck:'),
        makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' } }, [
          'Z: ',
          makeElement('input', {
            id: 'smartline-slider-z',
            type: 'range', min: '-100', max: '100', value: '0',
            style: { width: '55px', accentColor: '#38bdf8', cursor: 'pointer' },
            oninput: (e) => { state.currentZ = parseFloat(e.target.value); updateDynamics(); }
          })
        ]),
        makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' } }, [
          'Fillet: ',
          makeElement('input', {
            id: 'smartline-slider-fillet',
            type: 'range', min: '0', max: '50', value: '15',
            style: { width: '55px', accentColor: '#10b981', cursor: 'pointer' },
            oninput: (e) => { state.filletRadius = parseFloat(e.target.value); renderPermanent(); }
          })
        ]),
        makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' } }, [
          'Tension: ',
          makeElement('input', {
            id: 'smartline-slider-tension',
            type: 'range', min: '0.2', max: '2.0', step: '0.1', value: '1.0',
            style: { width: '55px', accentColor: '#f59e0b', cursor: 'pointer' },
            oninput: (e) => { state.splineTension = parseFloat(e.target.value); renderPermanent(); }
          })
        ])
      ]);

      subBar.appendChild(planeButtons);
      subBar.appendChild(touchDeck);
      wrap.appendChild(subBar);

      // 3. SVG Canvas Stage
      const svgArea = makeElement('div', {
        style: {
          flex: 1,
          width: '100%',
          height: '520px',
          position: 'relative',
          background: '#090d16',
          overflow: 'hidden'
        }
      });
      wrap.appendChild(svgArea);

      const W = 800;
      const H = 520;
      const ORIGIN_3D = [400, 320];

      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${W} ${H}`,
        width: '100%',
        height: '100%',
        style: { display: 'block', cursor: 'crosshair' }
      });

      const gridPattern = makeElement('svg:pattern', {
        id: 'smartline-iso-grid', width: '34.64', height: '20', patternUnits: 'userSpaceOnUse'
      }, [
        makeElement('svg:path', { d: 'M 17.32 0 L 34.64 10 L 17.32 20 L 0 10 Z', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '0.75' })
      ]);

      const defs = makeElement('svg:defs', {}, gridPattern);
      svg.appendChild(defs);
      svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#smartline-iso-grid)' }));

      const axes3DLayer = makeElement('svg:g', { id: 'svg-iso-axes-layer' });
      const guidesLayer = makeElement('svg:g', { id: 'svg-guides-layer' });
      const permanentLayer = makeElement('svg:g', { id: 'svg-permanent-layer' });
      const previewLayer = makeElement('svg:g', { id: 'svg-preview-layer' });
      const compassLayer = makeElement('svg:g', { id: 'svg-compass-layer' });

      svg.appendChild(axes3DLayer);
      svg.appendChild(guidesLayer);
      svg.appendChild(permanentLayer);
      svg.appendChild(previewLayer);
      svg.appendChild(compassLayer);
      svgArea.appendChild(svg);

      // State Machine
      const state = {
        is3D: false,
        mode: 'line', // 'line' | 'arc' | 'spline'
        plane: 'top',
        points: [], // Array of { point3D: [x,y,z], type: 'line'|'arc', bulge: f64, radius: f64, center: [cx,cy] }
        splineVertices: [],
        exitTangent2D: [1, 0],
        currentZ: 0,
        filletRadius: 15,
        splineTension: 1.0,
        hoverScreenPt: null,
        hoverWorldPt: null,
        compassSquircle: 0.35,
        compassAngleDeg: 0,
        isNearVertexZero: false,
        nearestIntersectionSnap: false,
        liveArcData: null
      };

      const COS30 = Math.cos(Math.PI / 6);
      const SIN30 = Math.sin(Math.PI / 6);

      function project3DToScreen(p) {
        if (!state.is3D) return [p[0], p[1]];
        const sx = ORIGIN_3D[0] + (p[0] - p[1]) * COS30;
        const sy = ORIGIN_3D[1] + (p[0] + p[1]) * SIN30 - (p[2] || 0);
        return [sx, sy];
      }

      function unprojectScreenTo3D(sx, sy) {
        if (!state.is3D) return [sx, sy, state.currentZ];
        const curZ = state.currentZ;
        const adjSy = sy - ORIGIN_3D[1] + curZ;
        const adjSx = sx - ORIGIN_3D[0];

        if (state.plane === 'top') {
          const x = (adjSy / SIN30 + adjSx / COS30) / 2;
          const y = (adjSy / SIN30 - adjSx / COS30) / 2;
          return [x, y, curZ];
        } else if (state.plane === 'front') {
          const x = adjSx / COS30;
          const z = -adjSy;
          return [x, 0, z];
        } else {
          const y = -adjSx / COS30;
          const z = -adjSy;
          return [0, y, z];
        }
      }

      function setMode(newMode) {
        state.mode = newMode;
        btnLine.classList.toggle('active', newMode === 'line');
        btnArc.classList.toggle('active', newMode === 'arc');
        btnSpline.classList.toggle('active', newMode === 'spline');

        if (newMode === 'arc') {
          state.compassSquircle = 1.0; // Auto-shift to Polar circle for arcs!
          statusBadge.textContent = 'Mode: Tangent Arc (Polar) • Swing cursor to preview radius & sweep';
        } else if (newMode === 'spline') {
          state.compassSquircle = 0.5;
          statusBadge.textContent = 'Mode: On-Curve Spline • Click through-points with G1 relaxation';
        } else {
          state.compassSquircle = 0.35; // Rectangular squircle for lines
          statusBadge.textContent = 'Mode: Line [2D] • Tap [A] for Tangent Arc • [G] Origin';
        }

        renderCompass();
        renderGuides();
      }

      btnLine.onclick = () => setMode('line');
      btnArc.onclick = () => setMode('arc');
      btnSpline.onclick = () => setMode('spline');

      function setViewMode(is3DMode) {
        state.is3D = is3DMode;
        btn2D.classList.toggle('primary', !is3DMode);
        btn3D.classList.toggle('primary', is3DMode);

        render3DAxes();
        renderPermanent();
        renderCompass();
        renderGuides();
        statusBadge.textContent = is3DMode ? 'Mode: 3D Isometric [XY/XZ/YZ Planes]' : 'Mode: 2D Planar [Tap G Origin • A Arc]';
      }

      btn2D.onclick = () => setViewMode(false);
      btn3D.onclick = () => setViewMode(true);

      function setPlane(planeName) {
        state.plane = planeName;
        if (planeName === 'top') {
          state.compassAngleDeg = 0;
        } else if (planeName === 'front') {
          state.compassAngleDeg = 90;
        } else if (planeName === 'side') {
          state.compassAngleDeg = -90;
        } else if (planeName === 'tangent') {
          const rad = Math.atan2(state.exitTangent2D[1], state.exitTangent2D[0]);
          state.compassAngleDeg = (rad * 180) / Math.PI;
        }
        renderCompass();
        renderGuides();
      }

      function jumpOriginHomeRow() {
        if (state.hoverWorldPt) {
          state.points.push({ point3D: state.hoverWorldPt.slice(), type: 'line', bulge: 0 });
          statusBadge.textContent = '✓ Origin jumped [G Home-Row] to active coordinate';
          renderCompass();
          renderPermanent();
        }
      }

      btnClear.onclick = () => {
        state.points = [];
        state.splineVertices = [];
        state.exitTangent2D = [1, 0];
        state.compassAngleDeg = 0;
        permanentLayer.innerHTML = '';
        previewLayer.innerHTML = '';
        guidesLayer.innerHTML = '';
        compassLayer.innerHTML = '';
        statusBadge.textContent = 'Cleared • Click anywhere to start drawing';
      };

      btnExportDxf.onclick = () => {
        if (state.points.length < 2) {
          alert('Draw at least 2 points to export a DXF drawing.');
          return;
        }
        exportDxfWithBulges();
      };

      function exportDxfWithBulges() {
        let dxf = "0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n";
        dxf += "0\nLWPOLYLINE\n8\nSMARTLINE_DXF\n";
        dxf += `90\n${state.points.length}\n`;
        dxf += `70\n${state.isNearVertexZero ? 1 : 0}\n`;

        state.points.forEach((pt) => {
          dxf += `10\n${pt.point3D[0].toFixed(4)}\n`;
          dxf += `20\n${pt.point3D[1].toFixed(4)}\n`;
          if (pt.bulge && Math.abs(pt.bulge) > 1e-6) {
            dxf += `42\n${pt.bulge.toFixed(6)}\n`;
          }
        });

        dxf += "0\nENDSEC\n0\nEOF\n";

        const blob = new Blob([dxf], { type: 'application/dxf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SmartLine_Bulges_${Date.now()}.dxf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        statusBadge.textContent = '✓ Exported AutoCAD DXF with authentic bulges!';
      }

      // Rob Brown's Closest-Point Sweep Calculation
      function calculateTangentArc(p0, p1, inTangent) {
        const vx = p1[0] - p0[0];
        const vy = p1[1] - p0[1];
        const chord = Math.hypot(vx, vy);
        if (chord < 1e-4) return null;

        const tx = inTangent[0];
        const ty = inTangent[1];
        const nx = -ty;
        const ny = tx;

        const vPar = vx * tx + vy * ty;
        const vPerp = vx * nx + vy * ny;

        // Closed-form Smooth Bulge Theorem: bulge = vPerp / (chord + vPar)
        const denom = chord + vPar;
        if (Math.abs(denom) < 1e-6) return null;

        let bulge = vPerp / denom;
        if (Math.abs(bulge) < 1e-5) bulge = 0.0;

        const theta = 4 * Math.atan(bulge);
        const radius = chord / (2 * Math.sin(Math.abs(theta) / 2));

        // Calculate circle center
        const midX = (p0[0] + p1[0]) / 2;
        const midY = (p0[1] + p1[1]) / 2;
        const sagitta = (chord / 2) * Math.abs(bulge);
        const distToCenter = radius - sagitta;
        const perpChordX = -vy / chord;
        const perpChordY = vx / chord;
        const sign = bulge > 0 ? 1 : -1;
        const cx = midX - sign * distToCenter * perpChordX;
        const cy = midY - sign * distToCenter * perpChordY;

        // Derive Exit Tangent Vector: rotate inTangent by theta
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);
        const outTx = tx * cosT - ty * sinT;
        const outTy = tx * sinT + ty * cosT;

        return {
          bulge,
          theta,
          radius,
          center: [cx, cy],
          exitTangent: [outTx, outTy],
          largeArc: Math.abs(theta) > Math.PI ? 1 : 0,
          sweep: bulge < 0 ? 0 : 1 // SVG coordinate convention
        };
      }

      function render3DAxes() {
        axes3DLayer.innerHTML = '';
        if (!state.is3D) return;

        const len = 140;
        const o = ORIGIN_3D;
        const pX = project3DToScreen([len, 0, 0]);
        const pY = project3DToScreen([0, len, 0]);
        const pZ = project3DToScreen([0, 0, len]);

        axes3DLayer.appendChild(makeElement('svg:line', { x1: o[0], y1: o[1], x2: pX[0], y2: pX[1], stroke: '#ef4444', 'stroke-width': '2' }));
        axes3DLayer.appendChild(makeElement('svg:text', { x: pX[0] + 8, y: pX[1], fill: '#ef4444', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, 'X'));

        axes3DLayer.appendChild(makeElement('svg:line', { x1: o[0], y1: o[1], x2: pY[0], y2: pY[1], stroke: '#10b981', 'stroke-width': '2' }));
        axes3DLayer.appendChild(makeElement('svg:text', { x: pY[0] - 12, y: pY[1], fill: '#10b981', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, 'Y'));

        axes3DLayer.appendChild(makeElement('svg:line', { x1: o[0], y1: o[1], x2: pZ[0], y2: pZ[1], stroke: '#38bdf8', 'stroke-width': '2' }));
        axes3DLayer.appendChild(makeElement('svg:text', { x: pZ[0], y: pZ[1] - 8, fill: '#38bdf8', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, 'Z'));
      }

      function renderCompass() {
        compassLayer.innerHTML = '';
        if (state.points.length === 0 && !state.hoverScreenPt) return;

        const lastSeg = state.points[state.points.length - 1];
        const screenPos = lastSeg ? project3DToScreen(lastSeg.point3D) : (state.hoverScreenPt || [200, 200]);

        let transformStr = `translate(${screenPos[0]}, ${screenPos[1]})`;
        if (state.is3D) {
          if (state.plane === 'top') {
            transformStr += ' rotate(-30) skewX(30) scale(1, 0.866)';
          } else if (state.plane === 'front') {
            transformStr += ' rotate(30) skewX(-30) scale(1, 0.866)';
          }
        } else {
          transformStr += ` rotate(${state.compassAngleDeg})`;
        }

        const compassG = makeElement('svg:g', { transform: transformStr });
        const compassSvg = SquircleCompassSvg.renderElement({
          size: 90,
          squircle: state.compassSquircle,
          activeAxis: state.mode === 'arc' ? 'xy' : null,
          showMiniJack: false
        });

        compassSvg.setAttribute('x', '-45');
        compassSvg.setAttribute('y', '-45');
        compassG.appendChild(compassSvg);
        compassLayer.appendChild(compassG);
      }

      function renderGuides() {
        guidesLayer.innerHTML = '';
        if (state.points.length === 0) return;

        const lastSeg = state.points[state.points.length - 1];
        const s0 = project3DToScreen(lastSeg.point3D);
        const rad = (state.compassAngleDeg * Math.PI) / 180;

        const tx = Math.cos(rad);
        const ty = Math.sin(rad);
        const nx = -ty;
        const ny = tx;
        const len = 300;

        // Model-space primary tangent constraint guideline
        guidesLayer.appendChild(makeElement('svg:line', {
          x1: s0[0] - tx * 30, y1: s0[1] - ty * 30,
          x2: s0[0] + tx * len, y2: s0[1] + ty * len,
          stroke: 'rgba(56, 189, 248, 0.45)', 'stroke-width': '1.5', 'stroke-dasharray': '6,4'
        }));

        // Normal 90° perpendicular guideline
        guidesLayer.appendChild(makeElement('svg:line', {
          x1: s0[0] - nx * len, y1: s0[1] - ny * len,
          x2: s0[0] + nx * len, y2: s0[1] + ny * len,
          stroke: 'rgba(236, 72, 153, 0.35)', 'stroke-width': '1.5', 'stroke-dasharray': '4,4'
        }));
      }

      function renderPermanent() {
        permanentLayer.innerHTML = '';
        if (state.points.length === 0) return;

        const pts = state.points;
        const s0 = project3DToScreen(pts[0].point3D);
        let d = `M ${s0[0]} ${s0[1]}`;

        for (let i = 1; i < pts.length; i++) {
          const seg = pts[i];
          const sp = project3DToScreen(seg.point3D);

          if (seg.type === 'arc' && seg.radius && Math.abs(seg.bulge) > 1e-5) {
            const sPrev = project3DToScreen(pts[i - 1].point3D);
            const chord = Math.hypot(sp[0] - sPrev[0], sp[1] - sPrev[1]);
            const rScreen = (seg.radius / Math.hypot(seg.point3D[0] - pts[i-1].point3D[0], seg.point3D[1] - pts[i-1].point3D[1])) * chord;
            const largeArc = Math.abs(seg.theta) > Math.PI ? 1 : 0;
            const sweep = seg.bulge < 0 ? 0 : 1;
            d += ` A ${rScreen.toFixed(1)} ${rScreen.toFixed(1)} 0 ${largeArc} ${sweep} ${sp[0].toFixed(1)} ${sp[1].toFixed(1)}`;
          } else {
            d += ` L ${sp[0].toFixed(1)} ${sp[1].toFixed(1)}`;
          }
        }

        permanentLayer.appendChild(makeElement('svg:path', {
          d: d, fill: 'none', stroke: '#10b981', 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
        }));

        pts.forEach((seg, idx) => {
          const p = project3DToScreen(seg.point3D);
          permanentLayer.appendChild(makeElement('svg:circle', {
            cx: p[0], cy: p[1], r: '4', fill: idx === pts.length - 1 ? '#38bdf8' : '#10b981'
          }));
        });
      }

      function updateDynamics() {
        render3DAxes();
        renderGuides();
        renderCompass();
        renderPermanent();
      }

      svgArea.addEventListener('pointermove', (e) => {
        const rect = svg.getBoundingClientRect();
        const sx = (e.clientX - rect.left) * (W / rect.width);
        const sy = (e.clientY - rect.top) * (H / rect.height);
        state.hoverScreenPt = [sx, sy];
        state.hoverWorldPt = unprojectScreenTo3D(sx, sy);

        previewLayer.innerHTML = '';
        if (state.points.length === 0) return;

        const lastSeg = state.points[state.points.length - 1];
        const s0 = project3DToScreen(lastSeg.point3D);

        const v0 = project3DToScreen(state.points[0].point3D);
        const d0 = Math.hypot(sx - v0[0], sy - v0[1]);
        state.isNearVertexZero = (state.points.length >= 2 && d0 < 14);

        let targetScreen = state.isNearVertexZero ? v0 : [sx, sy];

        if (state.mode === 'arc') {
          const arc = calculateTangentArc(s0, targetScreen, state.exitTangent2D);
          state.liveArcData = arc;

          if (arc && Math.abs(arc.bulge) > 1e-4) {
            const dArc = `M ${s0[0]} ${s0[1]} A ${arc.radius.toFixed(1)} ${arc.radius.toFixed(1)} 0 ${arc.largeArc} ${arc.sweep} ${targetScreen[0].toFixed(1)} ${targetScreen[1].toFixed(1)}`;
            previewLayer.appendChild(makeElement('svg:path', {
              d: dArc, fill: 'none', stroke: '#38bdf8', 'stroke-width': '2.5', 'stroke-dasharray': '5,4'
            }));

            // Render center dot & radial guideline
            previewLayer.appendChild(makeElement('svg:circle', { cx: arc.center[0], cy: arc.center[1], r: '2.5', fill: '#f59e0b' }));
            previewLayer.appendChild(makeElement('svg:line', {
              x1: arc.center[0], y1: arc.center[1], x2: targetScreen[0], y2: targetScreen[1],
              stroke: 'rgba(245, 158, 11, 0.4)', 'stroke-width': '1', 'stroke-dasharray': '2,2'
            }));
          } else {
            previewLayer.appendChild(makeElement('svg:line', {
              x1: s0[0], y1: s0[1], x2: targetScreen[0], y2: targetScreen[1],
              stroke: '#38bdf8', 'stroke-width': '2.5', 'stroke-dasharray': '5,4'
            }));
          }
        } else {
          // Line Mode (with Perpendicular Projection Lock)
          if (!state.nearestIntersectionSnap) {
            const rad = (state.compassAngleDeg * Math.PI) / 180;
            const ux = Math.cos(rad);
            const uy = Math.sin(rad);
            const vMouseX = targetScreen[0] - s0[0];
            const vMouseY = targetScreen[1] - s0[1];
            const projLen = vMouseX * ux + vMouseY * uy;

            if (Math.abs(vMouseX * -uy + vMouseY * ux) < 18) {
              targetScreen = [s0[0] + projLen * ux, s0[1] + projLen * uy];
            }
          }

          previewLayer.appendChild(makeElement('svg:line', {
            x1: s0[0], y1: s0[1], x2: targetScreen[0], y2: targetScreen[1],
            stroke: '#38bdf8', 'stroke-width': '2.5', 'stroke-dasharray': '5,4'
          }));
        }

        if (state.isNearVertexZero) {
          previewLayer.appendChild(makeElement('svg:circle', {
            cx: v0[0], cy: v0[1], r: '10', fill: 'none', stroke: '#10b981', 'stroke-width': '2.5', 'stroke-dasharray': '3,3'
          }));
        }
      });

      svgArea.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        const rect = svg.getBoundingClientRect();
        const sx = (e.clientX - rect.left) * (W / rect.width);
        const sy = (e.clientY - rect.top) * (H / rect.height);

        let worldPt = unprojectScreenTo3D(sx, sy);
        if (state.isNearVertexZero) {
          worldPt = state.points[0].point3D.slice();
        }

        if (state.mode === 'arc' && state.points.length >= 1 && state.liveArcData) {
          const arc = state.liveArcData;
          state.points.push({
            point3D: worldPt,
            type: 'arc',
            bulge: arc.bulge,
            theta: arc.theta,
            radius: arc.radius,
            center: arc.center
          });

          // SmartLine Auto-Orientation: Compass aligns to exit tangent vector!
          state.exitTangent2D = arc.exitTangent.slice();
          const rad = Math.atan2(state.exitTangent2D[1], state.exitTangent2D[0]);
          state.compassAngleDeg = (rad * 180) / Math.PI;

          statusBadge.textContent = `✓ Committed Tangent Arc (Bulge: ${arc.bulge.toFixed(4)}) • Compass rotated to exit tangent`;
        } else {
          state.points.push({ point3D: worldPt, type: 'line', bulge: 0 });

          if (state.points.length >= 2) {
            const pPrev = state.points[state.points.length - 2].point3D;
            const dx = worldPt[0] - pPrev[0];
            const dy = worldPt[1] - pPrev[1];
            const len = Math.hypot(dx, dy);
            if (len > 1e-4) {
              state.exitTangent2D = [dx / len, dy / len];
              const rad = Math.atan2(dy, dx);
              state.compassAngleDeg = (rad * 180) / Math.PI;
            }
          }
        }

        renderPermanent();
        renderGuides();
        renderCompass();
        previewLayer.innerHTML = '';
      });

      wrap.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        const k = e.key.toUpperCase();

        if (k === 'G') { jumpOriginHomeRow(); }
        else if (k === 'L') { setMode('line'); }
        else if (k === 'A' || e.key === '~' || e.key === '`') { setMode('arc'); }
        else if (k === 'C') { setMode('spline'); }
        else if (k === 'T') { setPlane('top'); }
        else if (k === 'F') { setPlane('front'); }
        else if (k === 'S') { setPlane('side'); }
        else if (k === 'R') { setPlane('tangent'); }
        else if (e.key === 'Backspace') {
          if (state.points.length > 0) {
            state.points.pop();
            renderPermanent();
            renderGuides();
            renderCompass();
            statusBadge.textContent = 'Undid segment [Backspace]';
          }
        }
        else if (e.key === ' ') {
          e.preventDefault();
          state.compassSquircle = state.compassSquircle >= 0.9 ? 0.2 : (state.compassSquircle <= 0.3 ? 0.5 : 1.0);
          renderCompass();
        }
      });

      container.appendChild(wrap);
      setViewMode(false);
    }
}

globalThis.SvgSmartLineLab = SvgSmartLineLab;
if (typeof module !== 'undefined' && module.exports) module.exports = SvgSmartLineLab;