class CadTangentArcSwingLab {
  /**
   * Interactive Closest-Point Tangent Arc Swing Laboratory.
   * Demonstrates:
   * 1. Rob Brown's Closest-Point Sweep Principle:
   *    Evaluates the candidate tangent circle whose circumference is closest to the cursor.
   *    Naturally sweeps from 0° to +5° or backs up across the tangent line to -6° with zero deadband jitter.
   * 2. Automatic Exit Tangent Orientation:
   *    Upon arc commit, the AccuDraw compass reticle rotates to match the exit tangent vector.
   * 3. Universal DXF Bulge tan(θ/4) telemetry.
   */
  static render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        width: '100%',
        minHeight: '620px',
        background: '#070a13',
        borderRadius: '12px',
        border: '1.5px solid #21262d',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        outline: 'none'
      },
      tabIndex: 0
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
        gap: '8px',
        zIndex: 10
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '15px' } }, '⌒'),
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'accuCad [Sub-View: Closest-Point Tangent Arc Swing & Bulge Math]'),
        makeElement('span', { id: 'arc-swing-badge', style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Bulge: +0.4142')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => setInTangent(1, 0, 'Horizontal (0°)')
        }, 'Tangent: 0°'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => setInTangent(0.7071, -0.7071, 'Angled (-45°)')
        }, 'Tangent: 45°'),
        makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '3px 8px', fontSize: '10px', fontWeight: 'bold' },
          onclick: () => commitArc()
        }, '✓ Commit Arc Segment')
      ])
    ]);
    wrap.appendChild(header);

    const stageGrid = makeElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1.35fr) minmax(280px, 1fr)',
        flex: 1,
        minHeight: '480px',
        background: '#21262d',
        gap: '1px'
      }
    });

    // Left Column: 2D Interactive SVG Stage
    const leftStage = makeElement('div', {
      style: {
        background: '#090d16',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative'
      }
    });

    const W = 460, H = 400;
    const svg = makeElement('svg:svg', {
      id: 'tangent-arc-svg-stage',
      viewBox: `0 0 ${W} ${H}`, width: '100%', height: '400px',
      style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '8px', cursor: 'crosshair' }
    });

    const defs = makeElement('svg:defs', {},
      makeElement('svg:pattern', { id: 'arc-swing-grid', width: '20', height: '20', patternUnits: 'userSpaceOnUse' },
        makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '1' })
      ),
      makeElement('svg:filter', { id: 'arc-swing-glow', x: '-20%', y: '-20%', width: '140%', height: '140%' },
        makeElement('svg:feGaussianBlur', { stdDeviation: '3', result: 'blur' }),
        makeElement('svg:feMerge', {},
          makeElement('svg:feMergeNode', { in: 'blur' }),
          makeElement('svg:feMergeNode', { in: 'SourceGraphic' })
        )
      )
    );
    svg.appendChild(defs);
    svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#arc-swing-grid)' }));

    const committedLayer = makeElement('svg:g');
    const candidateCircleLayer = makeElement('svg:g');
    const candidateArcLayer = makeElement('svg:g');
    const tangentVectorsLayer = makeElement('svg:g');
    const compassLayer = makeElement('svg:g');

    svg.appendChild(candidateCircleLayer);
    svg.appendChild(committedLayer);
    svg.appendChild(candidateArcLayer);
    svg.appendChild(tangentVectorsLayer);
    svg.appendChild(compassLayer);
    leftStage.appendChild(svg);
    stageGrid.appendChild(leftStage);

    // Right Column: Live Math & Tangency Telemetry
    const rightCol = makeElement('div', {
      style: {
        background: '#0a0e1a',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#cbd5e1'
      }
    });

    const telemetryCard = makeElement('div', {
      style: {
        background: '#070a13', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px',
        display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: '1.5'
      }
    }, [
      makeElement('strong', { style: { color: '#00f2fe' } }, 'TANGENT ARC MATHEMATICS:'),
      sweepAngleLabel = makeElement('div', { style: { color: '#f8fafc' } }, 'Included Sweep (θ): 90.0° (Quarter Circle)'),
      arcRadiusLabel = makeElement('div', { style: { color: '#38bdf8' } }, 'Arc Radius (R): 120.0px'),
      bulgeFactorLabel = makeElement('div', { style: { color: '#10b981', fontWeight: 'bold' } }, 'DXF Bulge tan(θ/4): +0.4142'),
      exitTangentLabel = makeElement('div', { style: { color: '#f59e0b' } }, 'Exit Tangent Vector: [0.00, -1.00]')
    ]);
    let sweepAngleLabel, arcRadiusLabel, bulgeFactorLabel, exitTangentLabel;
    rightCol.appendChild(telemetryCard);

    // Closest-Point Principle Card
    const principleCard = makeElement('div', {
      style: {
        background: 'rgba(0, 242, 254, 0.05)', borderLeft: '3px solid #00f2fe',
        padding: '10px 12px', borderRadius: '4px', fontSize: '10.5px', color: '#cbd5e1', lineHeight: '1.5'
      }
    }, [
      makeElement('strong', { style: { color: '#00f2fe', display: 'block', marginBottom: '2px' } }, 'Closest-Point Sweep Principle:'),
      'The arc orientation is determined by finding the candidate circle where the cursor is as close as possible to the circumference. Crossing the tangent line flips curvature from convex to concave with ',
      makeElement('strong', { style: { color: '#fff' } }, 'zero deadband jitter'),
      '. When committed, the compass auto-orients to the exit tangent, enabling continuous tangency into the next stroke.'
    ]);
    rightCol.appendChild(principleCard);

    stageGrid.appendChild(rightCol);
    wrap.appendChild(stageGrid);
    container.appendChild(wrap);

    const state = {
      p0: [120, 240],
      inTangent: [1.0, 0.0],
      cursorPos: [280, 160],
      committedArcs: [],
      currentArcData: null
    };

    function setInTangent(tx, ty, label) {
      state.inTangent = [tx, ty];
      updateSimulation();
      if (typeof CompassSkinAddons !== 'undefined') {
        CompassSkinAddons.playSnapPop(480, 0.03);
      }
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
        sweep: bulge < 0 ? 0 : 1,
        p0, p1
      };
    }

    function commitArc() {
      if (!state.currentArcData) return;
      state.committedArcs.push(state.currentArcData);
      state.p0 = state.currentArcData.p1.slice();
      state.inTangent = state.currentArcData.exitTangent.slice();
      updateSimulation();
      if (typeof CompassSkinAddons !== 'undefined') {
        CompassSkinAddons.playSnapPop(880, 0.05);
      }
    }

    function updateSimulation() {
      committedLayer.innerHTML = '';
      candidateCircleLayer.innerHTML = '';
      candidateArcLayer.innerHTML = '';
      tangentVectorsLayer.innerHTML = '';
      compassLayer.innerHTML = '';

      // 1. Render previously committed segments
      state.committedArcs.forEach(arc => {
        const d = `M ${arc.p0[0]} ${arc.p0[1]} A ${arc.radius.toFixed(1)} ${arc.radius.toFixed(1)} 0 ${arc.largeArc} ${arc.sweep} ${arc.p1[0]} ${arc.p1[1]}`;
        committedLayer.appendChild(makeElement('svg:path', {
          d, fill: 'none', stroke: '#10b981', 'stroke-width': '3', 'stroke-linecap': 'round'
        }));
      });

      // 2. Solve candidate tangent arc
      const arc = calculateTangentArc(state.p0, state.cursorPos, state.inTangent);
      state.currentArcData = arc;

      // Draw incoming tangent vector arrow
      const arrowLen = 60;
      tangentVectorsLayer.appendChild(makeElement('svg:line', {
        x1: state.p0[0], y1: state.p0[1],
        x2: state.p0[0] + state.inTangent[0] * arrowLen,
        y2: state.p0[1] + state.inTangent[1] * arrowLen,
        stroke: '#38bdf8', 'stroke-width': '2', 'stroke-dasharray': '3,3'
      }));

      if (arc && Math.abs(arc.bulge) > 1e-4) {
        // Full candidate circle ghost
        candidateCircleLayer.appendChild(makeElement('svg:circle', {
          cx: arc.center[0], cy: arc.center[1], r: arc.radius,
          fill: 'none', stroke: 'rgba(56, 189, 248, 0.15)', 'stroke-width': '1', 'stroke-dasharray': '4,4'
        }));

        // Candidate arc
        const d = `M ${state.p0[0]} ${state.p0[1]} A ${arc.radius.toFixed(1)} ${arc.radius.toFixed(1)} 0 ${arc.largeArc} ${arc.sweep} ${state.cursorPos[0]} ${state.cursorPos[1]}`;
        candidateArcLayer.appendChild(makeElement('svg:path', {
          d, fill: 'none', stroke: '#00f2fe', 'stroke-width': '3', 'stroke-linecap': 'round',
          filter: 'url(#arc-swing-glow)'
        }));

        // Exit Tangent Arrow
        tangentVectorsLayer.appendChild(makeElement('svg:line', {
          x1: state.cursorPos[0], y1: state.cursorPos[1],
          x2: state.cursorPos[0] + arc.exitTangent[0] * arrowLen,
          y2: state.cursorPos[1] + arc.exitTangent[1] * arrowLen,
          stroke: '#f59e0b', 'stroke-width': '2'
        }));

        // Exit AccuDraw Compass Reticle (aligned to exit tangent!)
        const radOut = Math.atan2(arc.exitTangent[1], arc.exitTangent[0]);
        const degOut = (radOut * 180) / Math.PI;

        const compG = makeElement('svg:g', {
          transform: `translate(${state.cursorPos[0]}, ${state.cursorPos[1]}) rotate(${degOut}) scale(0.42)`
        });
        const compSvg = SquircleCompassSvg.renderElement({ size: 90, squircle: 0.5, activeAxis: 'x' });
        compSvg.setAttribute('x', '-45');
        compSvg.setAttribute('y', '-45');
        compG.appendChild(compSvg);
        compassLayer.appendChild(compG);

        // Telemetry Update
        const sweepDeg = (Math.abs(arc.theta) * 180) / Math.PI;
        sweepAngleLabel.textContent = `Included Sweep (θ): ${sweepDeg.toFixed(1)}° (${arc.bulge > 0 ? 'CCW' : 'CW'})`;
        arcRadiusLabel.textContent = `Arc Radius (R): ${arc.radius.toFixed(1)}px`;
        bulgeFactorLabel.textContent = `DXF Bulge tan(θ/4): ${arc.bulge >= 0 ? '+' : ''}${arc.bulge.toFixed(4)}`;
        exitTangentLabel.textContent = `Exit Tangent Vector: [${arc.exitTangent[0].toFixed(2)}, ${arc.exitTangent[1].toFixed(2)}] (${degOut.toFixed(0)}°)`;

        document.getElementById('arc-swing-badge').textContent = `Bulge: ${arc.bulge >= 0 ? '+' : ''}${arc.bulge.toFixed(4)}`;
        document.getElementById('arc-swing-badge').style.color = '#00f2fe';
      } else {
        // Fallback straight tangent line
        candidateArcLayer.appendChild(makeElement('svg:line', {
          x1: state.p0[0], y1: state.p0[1], x2: state.cursorPos[0], y2: state.cursorPos[1],
          stroke: '#00f2fe', 'stroke-width': '2.5'
        }));
      }

      // Start Anchor Sphere
      candidateArcLayer.appendChild(makeElement('svg:circle', {
        cx: state.p0[0], cy: state.p0[1], r: 4, fill: '#38bdf8'
      }));
    }

    svg.addEventListener('pointermove', (e) => {
      const rect = svg.getBoundingClientRect();
      state.cursorPos = [
        (e.clientX - rect.left) * (W / rect.width),
        (e.clientY - rect.top) * (H / rect.height)
      ];
      updateSimulation();
    });

    svg.addEventListener('pointerdown', (e) => {
      if (e.button === 0) commitArc();
    });

    updateSimulation();
  }
}

globalThis.CadTangentArcSwingLab = CadTangentArcSwingLab;
if (typeof module !== 'undefined' && module.exports) module.exports = CadTangentArcSwingLab;