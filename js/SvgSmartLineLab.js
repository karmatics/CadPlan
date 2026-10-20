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

      // 1. Header Toolbar
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
        className: 'dr-tab-btn active', id: 'sml-btn-line',
        style: { fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }
      }, '📏 Line [L]');

      const btnArc = makeElement('button', {
        className: 'dr-tab-btn', id: 'sml-btn-arc',
        style: { fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }
      }, '⌒ Tangent Arc [A / ~]');

      const btnClose = makeElement('button', {
        className: 'dr-nav-btn', id: 'sml-btn-close-loop',
        style: { fontSize: '11px', padding: '4px 10px', color: '#00f2fe', borderColor: '#00f2fe66' }
      }, '🔒 Close Loop [C]');

      modeGroup.appendChild(btnLine);
      modeGroup.appendChild(btnArc);
      modeGroup.appendChild(btnClose);

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
      }, 'Mode: Line • Click points to draw, click near start to close');

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
      toolbar.appendChild(rightControls);
      wrap.appendChild(toolbar);

      // 2. Sub-Bar (Fillet Radius with Rob Brown's Trailing Corner Live Adjustment)
      const subBar = makeElement('div', {
        style: {
          padding: '6px 14px',
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

      let filletValLabel;
      const filletControl = makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { color: '#00f2fe', fontWeight: 'bold' } }, 'Corner Fillet Radius:'),
        makeElement('input', {
          type: 'range', min: '0', max: '60', value: '25',
          style: { width: '90px', accentColor: '#00f2fe', cursor: 'pointer' },
          oninput: (e) => {
            state.filletRadius = parseFloat(e.target.value);
            if (filletValLabel) filletValLabel.textContent = `${state.filletRadius}px`;
            renderPermanent();
          }
        }),
        filletValLabel = makeElement('span', { style: { color: '#f8fafc', fontWeight: 'bold' } }, '25px'),
        makeElement('span', { style: { color: '#64748b', fontSize: '10px' } }, '(Trailing corner live-tunable after placement)')
      ]);

      const shortcutHints = makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setPlane('top') }, 'T: Top'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setPlane('front') }, 'F: Front'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px', color: '#10b981' }, onclick: () => jumpOrigin() }, 'G: Origin')
      ]);

      subBar.appendChild(filletControl);
      subBar.appendChild(shortcutHints);
      wrap.appendChild(subBar);

      // 3. SVG Stage
      const svgArea = makeElement('div', {
        style: { flex: 1, width: '100%', height: '520px', position: 'relative', background: '#090d16', overflow: 'hidden' }
      });
      wrap.appendChild(svgArea);

      const W = 800, H = 520;
      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${W} ${H}`, width: '100%', height: '100%', style: { display: 'block', cursor: 'crosshair' }
      });

      const gridPattern = makeElement('svg:pattern', {
        id: 'smartline-grid-pat', width: '25', height: '25', patternUnits: 'userSpaceOnUse'
      }, [
        makeElement('svg:path', { d: 'M 25 0 L 0 0 0 25', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '1' })
      ]);
      svg.appendChild(makeElement('svg:defs', {}, gridPattern));
      svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#smartline-grid-pat)' }));

      const guidesLayer = makeElement('svg:g');
      const permanentLayer = makeElement('svg:g');
      const previewLayer = makeElement('svg:g');
      const compassLayer = makeElement('svg:g');

      svg.appendChild(guidesLayer);
      svg.appendChild(permanentLayer);
      svg.appendChild(previewLayer);
      svg.appendChild(compassLayer);
      svgArea.appendChild(svg);

      const state = {
        mode: 'line',
        points: [], // [{ x, y, type: 'line'|'arc', bulge: 0, radius: 0, center: null }]
        isClosed: false,
        filletRadius: 25,
        exitTangent: [1, 0],
        compassAngleDeg: 0,
        compassSquircle: 0.35,
        hoverPt: [200, 200],
        liveArc: null,
        isNearStart: false
      };

      function setMode(newMode) {
        state.mode = newMode;
        btnLine.classList.toggle('active', newMode === 'line');
        btnArc.classList.toggle('active', newMode === 'arc');
        state.compassSquircle = newMode === 'arc' ? 1.0 : 0.35;
        statusBadge.textContent = newMode === 'arc'
          ? 'Mode: Tangent Arc (Polar) • Swing cursor to preview radius & sweep'
          : 'Mode: Line • Click points to draw, click near start to close';
        renderCompass();
      }

      btnLine.onclick = () => setMode('line');
      btnArc.onclick = () => setMode('arc');

      function closeLoop() {
        if (state.points.length >= 3 && !state.isClosed) {
          state.isClosed = true;
          renderPermanent();
          statusBadge.textContent = '✓ Loop Closed! Trailing corner is live-tunable with Fillet Radius slider.';
        }
      }
      btnClose.onclick = closeLoop;

      function jumpOrigin() {
        if (state.points.length > 0) {
          const last = state.points[state.points.length - 1];
          statusBadge.textContent = `✓ Origin relocated [G] to (${last.x.toFixed(0)}, ${last.y.toFixed(0)})`;
          renderCompass();
        }
      }

      function setPlane(plane) {
        if (plane === 'top') state.compassAngleDeg = 0;
        else if (plane === 'front') state.compassAngleDeg = 90;
        renderCompass();
      }

      btnClear.onclick = () => {
        state.points = [];
        state.isClosed = false;
        state.exitTangent = [1, 0];
        state.compassAngleDeg = 0;
        permanentLayer.innerHTML = '';
        previewLayer.innerHTML = '';
        guidesLayer.innerHTML = '';
        compassLayer.innerHTML = '';
        statusBadge.textContent = 'Cleared • Click anywhere to begin drafting';
      };

      btnExportDxf.onclick = () => {
        if (state.points.length < 2) {
          alert('Draw at least 2 points to export DXF.');
          return;
        }
        exportDxf();
      };

      function exportDxf() {
        let dxf = "0\nSECTION\n2\nENTITIES\n0\nLWPOLYLINE\n8\nSMARTLINE\n";
        dxf += `90\n${state.points.length}\n70\n${state.isClosed ? 1 : 0}\n`;
        state.points.forEach(p => {
          dxf += `10\n${p.x.toFixed(4)}\n20\n${p.y.toFixed(4)}\n`;
          if (p.bulge && Math.abs(p.bulge) > 1e-5) dxf += `42\n${p.bulge.toFixed(6)}\n`;
        });
        dxf += "0\nENDSEC\n0\nEOF\n";

        const blob = new Blob([dxf], { type: 'application/dxf' });
        const url = URL.createObjectURL(blob);
        const a = makeElement('a', { href: url, download: `SmartLine_${Date.now()}.dxf` });
        a.click();
        URL.revokeObjectURL(url);
        statusBadge.textContent = '✓ Exported AutoCAD DXF with authentic tangent bulges!';
      }

      function calculateTangentArc(p0, p1, inTangent) {
        const vx = p1[0] - p0[0];
        const vy = p1[1] - p0[1];
        const chord = Math.hypot(vx, vy);
        if (chord < 1e-4) return null;

        const tx = inTangent[0], ty = inTangent[1];
        const vPar = vx * tx + vy * ty;
        const vPerp = -vx * ty + vy * tx;
        const denom = chord + vPar;
        if (Math.abs(denom) < 1e-6) return null;

        let bulge = vPerp / denom;
        if (Math.abs(bulge) < 1e-5) bulge = 0.0;
        const theta = 4 * Math.atan(bulge);
        const radius = chord / (2 * Math.sin(Math.abs(theta) / 2));

        const midX = (p0[0] + p1[0]) / 2;
        const midY = (p0[1] + p1[1]) / 2;
        const sagitta = (chord / 2) * Math.abs(bulge);
        const distToCenter = radius - sagitta;
        const perpX = -vy / chord, perpY = vx / chord;
        const sign = bulge > 0 ? 1 : -1;
        const cx = midX - sign * distToCenter * perpX;
        const cy = midY - sign * distToCenter * perpY;

        const cosT = Math.cos(theta), sinT = Math.sin(theta);
        const outTx = tx * cosT - ty * sinT;
        const outTy = tx * sinT + ty * cosT;

        return {
          bulge, theta, radius, center: [cx, cy],
          exitTangent: [outTx, outTy],
          largeArc: Math.abs(theta) > Math.PI ? 1 : 0,
          sweep: bulge < 0 ? 0 : 1
        };
      }

      function renderPermanent() {
        permanentLayer.innerHTML = '';
        if (state.points.length === 0) return;

        const pts = state.points.slice();
        if (state.isClosed && pts.length >= 3) {
          pts.push({ x: pts[0].x, y: pts[0].y, type: 'line', bulge: 0 });
        }

        let pathCommands = [];
        let skippedFillets = 0;
        let appliedFillets = 0;

        pathCommands.push(`M ${pts[0].x} ${pts[0].y}`);

        for (let i = 1; i < pts.length; i++) {
          const pPrev = pts[i - 1];
          const pCurr = pts[i];
          const pNext = pts[i + 1];

          if (pCurr.type === 'arc' && pCurr.radius && Math.abs(pCurr.bulge) > 1e-5) {
            const largeArc = Math.abs(pCurr.theta) > Math.PI ? 1 : 0;
            const sweep = pCurr.bulge < 0 ? 0 : 1;
            pathCommands.push(`A ${pCurr.radius.toFixed(1)} ${pCurr.radius.toFixed(1)} 0 ${largeArc} ${sweep} ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)}`);
          } else if (pNext && state.filletRadius > 0 && pCurr.type !== 'arc') {
            // Rob Brown's Corner Fillet Calculation with Short-Segment Sharp Fallback
            const v1x = pCurr.x - pPrev.x, v1y = pCurr.y - pPrev.y;
            const v2x = pNext.x - pCurr.x, v2y = pNext.y - pCurr.y;
            const l1 = Math.hypot(v1x, v1y), l2 = Math.hypot(v2x, v2y);

            const u1x = v1x / l1, u1y = v1y / l1;
            const u2x = v2x / l2, u2y = v2y / l2;
            const dot = Math.max(-1, Math.min(1, u1x * u2x + u1y * u2y));
            const turningAngle = Math.acos(dot);

            if (turningAngle > 0.05 && turningAngle < Math.PI - 0.05) {
              const halfAngle = (Math.PI - turningAngle) / 2;
              const setback = state.filletRadius / Math.tan(halfAngle);

              // Rob Brown's Rule: If setback exceeds half of either segment, leave a sharp corner!
              if (setback > l1 * 0.48 || setback > l2 * 0.48) {
                pathCommands.push(`L ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)}`);
                skippedFillets++;
                permanentLayer.appendChild(makeElement('svg:circle', {
                  cx: pCurr.x, cy: pCurr.y, r: 8, fill: 'none', stroke: '#ef4444', 'stroke-width': 1.5, 'stroke-dasharray': '2,2'
                }));
                permanentLayer.appendChild(makeElement('svg:text', {
                  x: pCurr.x + 10, y: pCurr.y - 6, fill: '#ef4444', 'font-family': 'monospace', 'font-size': '9px'
                }, 'Sharp (Too short)'));
              } else {
                const t1x = pCurr.x - setback * u1x;
                const t1y = pCurr.y - setback * u1y;
                const t2x = pCurr.x + setback * u2x;
                const t2y = pCurr.y + setback * u2y;

                const cross = u1x * u2y - u1y * u2x;
                const sweep = cross > 0 ? 1 : 0;

                pathCommands.push(`L ${t1x.toFixed(1)} ${t1y.toFixed(1)}`);
                pathCommands.push(`A ${state.filletRadius} ${state.filletRadius} 0 0 ${sweep} ${t2x.toFixed(1)} ${t2y.toFixed(1)}`);
                appliedFillets++;
              }
            } else {
              pathCommands.push(`L ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)}`);
            }
          } else {
            pathCommands.push(`L ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)}`);
          }
        }

        if (state.isClosed) pathCommands.push('Z');

        permanentLayer.appendChild(makeElement('svg:path', {
          d: pathCommands.join(' '), fill: state.isClosed ? 'rgba(16, 185, 129, 0.12)' : 'none',
          stroke: '#10b981', 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
        }));

        state.points.forEach((p, idx) => {
          permanentLayer.appendChild(makeElement('svg:circle', {
            cx: p.x, cy: p.y, r: 4, fill: idx === state.points.length - 1 ? '#00f2fe' : '#10b981'
          }));
        });

        if (state.points.length >= 3) {
          const closedNote = state.isClosed ? ' • 🔒 Closed Loop (Trailing corner live-tunable)' : '';
          statusBadge.textContent = `SmartLine: ${appliedFillets} fillet(s) • ${skippedFillets} sharp (too short for R=${state.filletRadius})${closedNote}`;
        }
      }

      function renderCompass() {
        compassLayer.innerHTML = '';
        if (state.points.length === 0 || state.isClosed) return;

        const last = state.points[state.points.length - 1];
        const g = makeElement('svg:g', {
          transform: `translate(${last.x}, ${last.y}) rotate(${state.compassAngleDeg})`
        });

        const compass = SquircleCompassSvg.renderElement({
          size: 80,
          squircle: state.compassSquircle,
          activeAxis: state.mode === 'arc' ? 'xy' : null,
          showMiniJack: false
        });
        compass.setAttribute('x', '-40');
        compass.setAttribute('y', '-40');
        g.appendChild(compass);
        compassLayer.appendChild(g);
      }

      svgArea.addEventListener('pointermove', (e) => {
        const rect = svg.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (W / rect.width);
        const y = (e.clientY - rect.top) * (H / rect.height);
        state.hoverPt = [x, y];

        previewLayer.innerHTML = '';
        if (state.points.length === 0 || state.isClosed) return;

        const last = state.points[state.points.length - 1];
        const p0 = state.points[0];
        const distToStart = Math.hypot(x - p0.x, y - p0.y);
        state.isNearStart = (state.points.length >= 3 && distToStart < 18);

        let targetPt = state.isNearStart ? [p0.x, p0.y] : [x, y];

        if (state.isNearStart) {
          previewLayer.appendChild(makeElement('svg:circle', {
            cx: p0.x, cy: p0.y, r: 10, fill: 'none', stroke: '#00f2fe', 'stroke-width': 2, 'stroke-dasharray': '3,3'
          }));
        }

        if (state.mode === 'arc') {
          const arc = calculateTangentArc([last.x, last.y], targetPt, state.exitTangent);
          state.liveArc = arc;

          if (arc && Math.abs(arc.bulge) > 1e-4) {
            const d = `M ${last.x} ${last.y} A ${arc.radius.toFixed(1)} ${arc.radius.toFixed(1)} 0 ${arc.largeArc} ${arc.sweep} ${targetPt[0].toFixed(1)} ${targetPt[1].toFixed(1)}`;
            previewLayer.appendChild(makeElement('svg:path', {
              d: d, fill: 'none', stroke: '#00f2fe', 'stroke-width': '2.5', 'stroke-dasharray': '4,3'
            }));
            previewLayer.appendChild(makeElement('svg:circle', { cx: arc.center[0], cy: arc.center[1], r: 3, fill: '#f59e0b' }));
          }
        } else {
          previewLayer.appendChild(makeElement('svg:line', {
            x1: last.x, y1: last.y, x2: targetPt[0], y2: targetPt[1],
            stroke: '#00f2fe', 'stroke-width': '2', 'stroke-dasharray': '4,4'
          }));
        }
      });

      svgArea.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        if (state.isClosed) {
          // Start fresh drawing if clicked after closing
          state.points = [];
          state.isClosed = false;
        }

        const rect = svg.getBoundingClientRect();
        const x = Math.round((e.clientX - rect.left) * (W / rect.width));
        const y = Math.round((e.clientY - rect.top) * (H / rect.height));

        if (state.isNearStart && state.points.length >= 3) {
          closeLoop();
          previewLayer.innerHTML = '';
          return;
        }

        if (state.mode === 'arc' && state.points.length >= 1 && state.liveArc) {
          const arc = state.liveArc;
          state.points.push({
            x, y, type: 'arc', bulge: arc.bulge, theta: arc.theta, radius: arc.radius, center: arc.center
          });
          state.exitTangent = arc.exitTangent.slice();
          const rad = Math.atan2(state.exitTangent[1], state.exitTangent[0]);
          state.compassAngleDeg = (rad * 180) / Math.PI;
        } else {
          state.points.push({ x, y, type: 'line', bulge: 0 });
          if (state.points.length >= 2) {
            const pPrev = state.points[state.points.length - 2];
            const dx = x - pPrev.x, dy = y - pPrev.y;
            const len = Math.hypot(dx, dy);
            if (len > 1e-4) {
              state.exitTangent = [dx / len, dy / len];
              state.compassAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
            }
          }
        }

        renderPermanent();
        renderCompass();
        previewLayer.innerHTML = '';
      });

      wrap.addEventListener('keydown', (e) => {
        const k = e.key.toUpperCase();
        if (k === 'A' || e.key === '~') setMode('arc');
        else if (k === 'L') setMode('line');
        else if (k === 'C') closeLoop();
        else if (k === 'G') jumpOrigin();
        else if (k === 'T') setPlane('top');
        else if (k === 'F') setPlane('front');
      });

      container.appendChild(wrap);
    }
}

globalThis.SvgSmartLineLab = SvgSmartLineLab;
if (typeof module !== 'undefined' && module.exports) module.exports = SvgSmartLineLab;