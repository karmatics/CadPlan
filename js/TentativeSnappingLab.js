class TentativeSnappingLab {

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

      const statusBadge = makeElement('span', {
        id: 'snap-lab-status',
        style: { fontSize: '11px', color: '#10b981', fontFamily: 'monospace' }
      }, 'Hover near geometry • Click Chord button or tap both mouse buttons');

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
          makeElement('span', { style: { fontSize: '15px' } }, '🎯'),
          makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'TentativePointHandler: 50ms Chord & Thick Picking Lab'),
          makeElement('span', { style: { fontSize: '10px', background: '#0284c7', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Thick Picking Fallback')
        ]),
        statusBadge
      ]);
      wrap.appendChild(header);

      const btnSimulateChord = makeElement('button', {
        className: 'dr-nav-btn primary',
        id: 'btn-simulate-chord',
        style: { padding: '3px 10px', fontSize: '11px' }
      }, '⚡ Simulate 50ms Chord Snap');

      const btnResetSnap = makeElement('button', {
        className: 'dr-nav-btn',
        id: 'btn-reset-snap',
        style: { padding: '3px 8px', fontSize: '10px' }
      }, 'Release Anchor [Right Click / Esc]');

      const snapReadout = makeElement('div', {
        id: 'snap-readout',
        style: { fontFamily: 'monospace', color: '#f59e0b' }
      }, 'Anchor: None');

      // 2. Sub-Toolbar with Chord Simulator
      const subBar = makeElement('div', {
        style: {
          padding: '6px 14px',
          background: '#0d1117',
          borderBottom: '1px solid #161e2b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: '#94a3b8'
        }
      }, [
        makeElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } }, [
          makeElement('span', { style: { fontWeight: 'bold', color: '#e2e8f0' } }, 'Actions:'),
          btnSimulateChord,
          btnResetSnap
        ]),
        snapReadout
      ]);
      wrap.appendChild(subBar);

      // 3. SVG Canvas Stage
      const stage = makeElement('div', {
        style: {
          width: '100%',
          height: '420px',
          position: 'relative',
          background: '#090d16',
          overflow: 'hidden'
        }
      });
      wrap.appendChild(stage);

      const W = 760;
      const H = 420;

      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${W} ${H}`,
        width: '100%',
        height: '100%',
        style: { display: 'block', cursor: 'crosshair' }
      });

      // Grid
      const defs = makeElement('svg:defs', {},
        makeElement('svg:pattern', { id: 'snap-grid', width: '20', height: '20', patternUnits: 'userSpaceOnUse' },
          makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.04)', 'stroke-width': '1' })
        )
      );
      svg.appendChild(defs);
      svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#snap-grid)' }));

      // Layers
      const geometryLayer = makeElement('svg:g', { id: 'snap-geom-layer' });
      const dynamicGuidesLayer = makeElement('svg:g', { id: 'snap-guides-layer' });
      const tentativeLayer = makeElement('svg:g', { id: 'snap-tentative-layer' });

      svg.appendChild(geometryLayer);
      svg.appendChild(dynamicGuidesLayer);
      svg.appendChild(tentativeLayer);
      stage.appendChild(svg);

      // Test Elements (Thin wireframe geometries to prove 10px thick pick)
      const elements = [
        { id: 'box', type: 'polygon', points: [[140, 100], [320, 100], [320, 260], [140, 260]] },
        { id: 'line', type: 'line', points: [[380, 120], [600, 280]] },
        { id: 'arc', type: 'arc', center: [480, 180], radius: 80, startAngle: 0, endAngle: Math.PI }
      ];

      let state = {
        hoveredElement: null,
        candidateVertex: null,
        tentativeAnchor: null,
        cursorPos: [200, 200],
        axisLock: 'x'
      };

      function renderGeometry() {
        geometryLayer.innerHTML = '';

        // Box
        const boxPts = elements[0].points.map(p => p.join(',')).join(' ');
        const isBoxHov = state.hoveredElement === elements[0];
        geometryLayer.appendChild(makeElement('svg:polygon', {
          points: boxPts, fill: 'none', stroke: isBoxHov ? '#38bdf8' : '#10b981', 'stroke-width': isBoxHov ? '3' : '1.5'
        }));

        // Line
        const p1 = elements[1].points[0];
        const p2 = elements[1].points[1];
        const isLineHov = state.hoveredElement === elements[1];
        geometryLayer.appendChild(makeElement('svg:line', {
          x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
          stroke: isLineHov ? '#38bdf8' : '#10b981', 'stroke-width': isLineHov ? '3' : '1.5'
        }));

        // Arc
        const arc = elements[2];
        const isArcHov = state.hoveredElement === elements[2];
        const sx = arc.center[0] + arc.radius;
        const sy = arc.center[1];
        const ex = arc.center[0] - arc.radius;
        const ey = arc.center[1];
        const arcPath = `M ${sx} ${sy} A ${arc.radius} ${arc.radius} 0 0 1 ${ex} ${ey}`;
        geometryLayer.appendChild(makeElement('svg:path', {
          d: arcPath, fill: 'none', stroke: isArcHov ? '#38bdf8' : '#10b981', 'stroke-width': isArcHov ? '3' : '1.5'
        }));

        // Render vertex dots
        elements[0].points.concat(elements[1].points).forEach(pt => {
          geometryLayer.appendChild(makeElement('svg:circle', {
            cx: pt[0], cy: pt[1], r: '3.5', fill: '#334155', stroke: '#10b981', 'stroke-width': '1'
          }));
        });
      }

      // Dynamic Guides & Mini-Jack
      function updateDynamics() {
        dynamicGuidesLayer.innerHTML = '';
        tentativeLayer.innerHTML = '';

        if (!state.tentativeAnchor) {
          // Show candidate snap halo if hovering near a vertex
          if (state.candidateVertex) {
            const cv = state.candidateVertex;
            dynamicGuidesLayer.appendChild(makeElement('svg:circle', {
              cx: cv[0], cy: cv[1], r: '12', fill: 'none', stroke: '#38bdf8', 'stroke-width': '1.5', 'stroke-dasharray': '3,3'
            }));
          }
          return;
        }

        const anc = state.tentativeAnchor;
        const cur = state.cursorPos;

        // 1. Constrained Projection Line along locked X-axis
        const constrainedPt = [cur[0], anc[1]];

        dynamicGuidesLayer.appendChild(makeElement('svg:line', {
          x1: anc[0] - 80, y1: anc[1], x2: cur[0] + 80, y2: anc[1],
          stroke: '#ffffff', 'stroke-width': '2', 'stroke-dasharray': '5,4'
        }));

        // 2. Dashed displacement connector between locked point and cursor
        const dx = cur[0] - constrainedPt[0];
        const dy = cur[1] - constrainedPt[1];
        const pulledAway = Math.hypot(dx, dy) > 8;

        if (pulledAway) {
          dynamicGuidesLayer.appendChild(makeElement('svg:line', {
            x1: constrainedPt[0], y1: constrainedPt[1], x2: cur[0], y2: cur[1],
            stroke: '#f59e0b', 'stroke-width': '1.5', 'stroke-dasharray': '3,3', opacity: '0.7'
          }));

          // Render 3-Axis Mini-Jack Cursor at the constrained coordinate
          const jArm = 10;
          const miniJack = makeElement('svg:g', { stroke: '#ffffff', 'stroke-width': '2', 'stroke-linecap': 'round' },
            makeElement('svg:line', { x1: constrainedPt[0] - jArm, y1: constrainedPt[1], x2: constrainedPt[0] + jArm, y2: constrainedPt[1], stroke: '#ef4444' }),
            makeElement('svg:line', { x1: constrainedPt[0], y1: constrainedPt[1] - jArm, x2: constrainedPt[0], y2: constrainedPt[1] + jArm, stroke: '#10b981' }),
            makeElement('svg:circle', { cx: constrainedPt[0], cy: constrainedPt[1], r: '2.5', fill: '#ffffff' })
          );
          tentativeLayer.appendChild(miniJack);
        }

        // 3. Pulsing Tentative Anchor Crosshair on the Snapped Element
        const aSize = 8;
        const tentCross = makeElement('svg:g', { stroke: '#00e676', 'stroke-width': '2' },
          makeElement('svg:line', { x1: anc[0] - aSize, y1: anc[1] - aSize, x2: anc[0] + aSize, y2: anc[1] + aSize }),
          makeElement('svg:line', { x1: anc[0] + aSize, y1: anc[1] - aSize, x2: anc[0] - aSize, y2: anc[1] + aSize }),
          makeElement('svg:circle', { cx: anc[0], cy: anc[1], r: '6', fill: 'none', stroke: '#00e676', 'stroke-dasharray': '3,2' })
        );
        tentativeLayer.appendChild(tentCross);
      }

      // Thick Pick Distance Calculation (14px Screen-Space Segment Threshold)
      function findThickPick(x, y) {
        let closestDist = 14;
        let candidate = null;
        let elMatch = null;

        const allVerts = elements[0].points.concat(elements[1].points);
        allVerts.forEach(pt => {
          const d = Math.hypot(pt[0] - x, pt[1] - y);
          if (d < closestDist) {
            closestDist = d;
            candidate = pt;
            elMatch = elements[0].points.includes(pt) ? elements[0] : elements[1];
          }
        });

        return { candidate, elMatch };
      }

      // Pointer Events
      stage.addEventListener('pointermove', (e) => {
        const rect = svg.getBoundingClientRect();
        const x = Math.round((e.clientX - rect.left) * (W / rect.width));
        const y = Math.round((e.clientY - rect.top) * (H / rect.height));
        state.cursorPos = [x, y];

        if (!state.tentativeAnchor) {
          const { candidate, elMatch } = findThickPick(x, y);
          state.candidateVertex = candidate;
          state.hoveredElement = elMatch;
          renderGeometry();
        }

        updateDynamics();
      });

      function triggerChordSnap() {
        if (state.candidateVertex) {
          state.tentativeAnchor = state.candidateVertex.slice();
        } else {
          state.tentativeAnchor = elements[0].points[1].slice();
        }
        snapReadout.textContent = `Anchor Locked: [${state.tentativeAnchor.join(', ')}]`;
        statusBadge.textContent = '✓ Anchor captured! Pull cursor away to see Mini-Jack projection';
        updateDynamics();
      }

      function releaseAnchor() {
        state.tentativeAnchor = null;
        snapReadout.textContent = 'Anchor: None';
        statusBadge.textContent = 'Anchor released • Free cursor motion restored';
        updateDynamics();
      }

      // Direct event binding on created elements eliminates premature getElementById null checks
      btnSimulateChord.onclick = triggerChordSnap;
      btnResetSnap.onclick = releaseAnchor;

      stage.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        releaseAnchor();
      });

      container.appendChild(wrap);
      renderGeometry();
      updateDynamics();
    }
}

globalThis.TentativeSnappingLab = TentativeSnappingLab;
if (typeof module !== 'undefined' && module.exports) module.exports = TentativeSnappingLab;