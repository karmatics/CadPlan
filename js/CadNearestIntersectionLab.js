class CadNearestIntersectionLab {
  /**
   * Interactive 3D / 2D AccuDraw Nearest Ray-Curve Intersection Laboratory.
   * Demonstrates:
   * 1. Locking a directional axis or polar angle (e.g. 30° ray from Origin).
   * 2. Tapping 'N' (Nearest Intersection Snap) against circular arcs or circles.
   * 3. Solving the quadratic ray-sphere / ray-cylinder intersection equation in model space:
   *    ||Origin + t*u - Center||² = R²  =>  t² + 2t(u · (Origin - Center)) + ||Origin - Center||² - R² = 0
   * 4. Displaying both algebraic roots (t1, t2) as ghost spheres and using cursor proximity
   *    as an under-constrained heuristic to select the intended intersection point.
   */
  static async render(container) {
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
        position: 'relative'
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
        gap: '8px',
        zIndex: 10
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '15px' } }, '🎯'),
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'accuCad [Sub-View: Nearest Ray-Arc Intersection Snap ("N" Key)]'),
        makeElement('span', { id: 'nearest-root-badge', style: { fontSize: '10px', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, '2 Roots Solved')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        makeElement('button', {
          className: 'dr-tab-btn active', id: 'btn-nearest-shape-circle',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => setShape('circle')
        }, 'Full Circle'),
        makeElement('button', {
          className: 'dr-tab-btn', id: 'btn-nearest-shape-arc',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => setShape('arc')
        }, 'Tangent Arc'),
        makeElement('button', {
          className: 'dr-nav-btn primary',
          id: 'btn-nearest-view-3d',
          style: { padding: '3px 8px', fontSize: '10px', fontWeight: 'bold' },
          onclick: () => toggle3DView()
        }, '🎮 3D WebGL View')
      ])
    ]);
    wrap.appendChild(header);

    const stageGrid = makeElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1.3fr) minmax(280px, 1fr)',
        flex: 1,
        minHeight: '480px',
        background: '#21262d',
        gap: '1px'
      }
    });

    const leftStage = makeElement('div', {
      style: {
        background: '#090d16',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'relative'
      }
    });

    const toolbar = makeElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8', flexWrap: 'wrap', gap: '8px'
      }
    }, [
      makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [
        'Ray Angle (θ): ',
        angleSlider = makeElement('input', {
          type: 'range', min: '-85', max: '85', step: '1', value: '30',
          style: { width: '90px', accentColor: '#00f2fe', cursor: 'pointer' },
          oninput: (e) => {
            state.rayAngleDeg = parseFloat(e.target.value);
            angleLabel.textContent = `${state.rayAngleDeg}°`;
            updateSimulation();
          }
        }),
        angleLabel = makeElement('span', { style: { color: '#00f2fe', width: '32px', fontWeight: 'bold' } }, '30°')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '4px' } }, [
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setRayAngle(0) }, '0° (X-Axis)'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setRayAngle(45) }, '45°'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setRayAngle(-30) }, '-30°')
      ])
    ]);
    let angleSlider, angleLabel;
    leftStage.appendChild(toolbar);

    const W = 460, H = 380;
    const svg = makeElement('svg:svg', {
      id: 'nearest-svg-stage',
      viewBox: `0 0 ${W} ${H}`, width: '100%', height: '380px',
      style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '8px', cursor: 'crosshair' }
    });

    const defs = makeElement('svg:defs', {},
      makeElement('svg:pattern', { id: 'nearest-grid', width: '20', height: '20', patternUnits: 'userSpaceOnUse' },
        makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '1' })
      ),
      makeElement('svg:filter', { id: 'nearest-glow', x: '-20%', y: '-20%', width: '140%', height: '140%' },
        makeElement('svg:feGaussianBlur', { stdDeviation: '3', result: 'blur' }),
        makeElement('svg:feMerge', {},
          makeElement('svg:feMergeNode', { in: 'blur' }),
          makeElement('svg:feMergeNode', { in: 'SourceGraphic' })
        )
      )
    );
    svg.appendChild(defs);
    svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#nearest-grid)' }));

    const rayLayer = makeElement('svg:g');
    const shapeLayer = makeElement('svg:g');
    const rootsLayer = makeElement('svg:g');
    const jackLayer = makeElement('svg:g');
    svg.appendChild(shapeLayer);
    svg.appendChild(rayLayer);
    svg.appendChild(rootsLayer);
    svg.appendChild(jackLayer);
    leftStage.appendChild(svg);

    // Live 3D WebGL mount for accuCad
    const webglMount = makeElement('div', {
      id: 'accucad-mount-nearest-3d',
      style: { width: '100%', height: '380px', display: 'none', position: 'relative', background: '#050811', borderRadius: '8px', overflow: 'hidden' }
    });
    leftStage.appendChild(webglMount);

    stageGrid.appendChild(leftStage);

    // Right Column: Live Quadratic Math Telemetry & Heuristic
    const rightCol = makeElement('div', {
      style: {
        background: '#0a0e1a',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#cbd5e1'
      }
    });

    const mathCard = makeElement('div', {
      style: {
        background: '#070a13', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px',
        display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: '1.5'
      }
    }, [
      makeElement('strong', { style: { color: '#00f2fe' } }, 'QUADRATIC RAY-CURVE SOLVER:'),
      makeElement('div', { style: { color: '#94a3b8', fontSize: '10px' } }, '||Origin + t*u - Center||² = R²'),
      discrimLabel = makeElement('div', { style: { color: '#f8fafc' } }, 'Discriminant Δ = b² - 4ac: 14,250 > 0 (2 Real Roots)'),
      root1Label = makeElement('div', { style: { color: '#f59e0b' } }, 'Root 1 (t1): t = 142.3px -> [283.4, 218.8]'),
      root2Label = makeElement('div', { style: { color: '#f59e0b' } }, 'Root 2 (t2): t = 265.8px -> [390.4, 280.6]'),
      selectedRootLabel = makeElement('div', { style: { color: '#10b981', fontWeight: 'bold', marginTop: '4px' } }, 'Latching Mini-Jack: Root 1 (Closest to cursor)')
    ]);
    let discrimLabel, root1Label, root2Label, selectedRootLabel;
    rightCol.appendChild(mathCard);

    const explanationCard = makeElement('div', {
      style: {
        background: 'rgba(0, 242, 254, 0.05)', borderLeft: '3px solid #00f2fe',
        padding: '10px 12px', borderRadius: '4px', fontSize: '10.5px', color: '#cbd5e1', lineHeight: '1.5'
      }
    }, [
      makeElement('strong', { style: { color: '#00f2fe', display: 'block', marginBottom: '2px' } }, 'Why This Matters in 3D CAD:'),
      'In traditional drafting, finding where an angled trajectory hits a curve required drawing construction circles, trimming lines, and picking intersections. With AccuDraw, locking an axis and pressing ',
      makeElement('strong', { style: { color: '#fff' } }, 'N'),
      ' calculates the exact quadratic intersection in model space. The live mouse position acts as an under-constrained heuristic to select the intended root without modal prompt loops.'
    ]);
    rightCol.appendChild(explanationCard);

    stageGrid.appendChild(rightCol);
    wrap.appendChild(stageGrid);
    container.appendChild(wrap);

    let is3DActive = false;
    let app3D = null;
    let instId = null;

    const state = {
      shapeType: 'circle',
      origin: [80, 240],
      rayAngleDeg: 30,
      center: [280, 160],
      radius: 90,
      cursorPos: [260, 180]
    };

    function setShape(type) {
      state.shapeType = type;
      document.getElementById('btn-nearest-shape-circle').classList.toggle('active', type === 'circle');
      document.getElementById('btn-nearest-shape-arc').classList.toggle('active', type === 'arc');
      updateSimulation();
    }

    function setRayAngle(deg) {
      state.rayAngleDeg = deg;
      angleSlider.value = deg.toString();
      angleLabel.textContent = `${deg}°`;
      updateSimulation();
    }

    async function toggle3DView() {
      is3DActive = !is3DActive;
      const btn = document.getElementById('btn-nearest-view-3d');

      if (is3DActive) {
        svg.style.display = 'none';
        webglMount.style.display = 'block';
        if (btn) {
          btn.textContent = '📐 2D Math Plane';
          btn.className = 'dr-nav-btn';
        }

        if (!app3D) {
          const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
          if (isLoaded && globalThis.Main) {
            app3D = new globalThis.Main();
            await app3D.run({
              container: webglMount,
              showSidePanel: false,
              showCompassUi: false,
              presetGeometry: 'bracket',
              cameraPos: { x: 3.5, y: 3.0, z: 4.8 },
              target: [0, 0, 0],
              background: 0x050811,
              initialPlane: 'top'
            });
            instId = CadStudioDemoComponent.registerInstance(app3D, webglMount, 'Nearest Snap 3D Viewport');
          }
        }
      } else {
        svg.style.display = 'block';
        webglMount.style.display = 'none';
        if (btn) {
          btn.textContent = '🎮 3D WebGL View';
          btn.className = 'dr-nav-btn primary';
        }
      }
    }

    function updateSimulation() {
      rayLayer.innerHTML = '';
      shapeLayer.innerHTML = '';
      rootsLayer.innerHTML = '';
      jackLayer.innerHTML = '';

      const rad = (-state.rayAngleDeg * Math.PI) / 180;
      const ux = Math.cos(rad);
      const uy = Math.sin(rad);

      // 1. Draw Target Geometry (Circle or Arc)
      if (state.shapeType === 'circle') {
        shapeLayer.appendChild(makeElement('svg:circle', {
          cx: state.center[0], cy: state.center[1], r: state.radius,
          fill: 'rgba(56, 189, 248, 0.08)', stroke: '#38bdf8', 'stroke-width': '2.5'
        }));
      } else {
        const startAng = Math.PI * 0.2;
        const endAng = Math.PI * 1.35;
        const x1 = state.center[0] + state.radius * Math.cos(startAng);
        const y1 = state.center[1] + state.radius * Math.sin(startAng);
        const x2 = state.center[0] + state.radius * Math.cos(endAng);
        const y2 = state.center[1] + state.radius * Math.sin(endAng);
        shapeLayer.appendChild(makeElement('svg:path', {
          d: `M ${x1} ${y1} A ${state.radius} ${state.radius} 0 1 1 ${x2} ${y2}`,
          fill: 'none', stroke: '#38bdf8', 'stroke-width': '3', 'stroke-linecap': 'round'
        }));
      }

      shapeLayer.appendChild(makeElement('svg:circle', {
        cx: state.center[0], cy: state.center[1], r: 3.5, fill: '#64748b'
      }));

      // 2. Draw AccuDraw Origin & Locked Ray
      const rayLen = 420;
      rayLayer.appendChild(makeElement('svg:line', {
        x1: state.origin[0], y1: state.origin[1],
        x2: state.origin[0] + ux * rayLen, y2: state.origin[1] + uy * rayLen,
        stroke: '#ffffff', 'stroke-width': '2', 'stroke-dasharray': '5,4', filter: 'url(#nearest-glow)'
      }));

      // AccuDraw Origin reticle
      const origG = makeElement('svg:g', { transform: `translate(${state.origin[0]}, ${state.origin[1]}) scale(0.42)` });
      const compSvg = SquircleCompassSvg.renderElement({ size: 90, squircle: 0.5, activeAxis: 'x' });
      compSvg.setAttribute('x', '-45');
      compSvg.setAttribute('y', '-45');
      origG.appendChild(compSvg);
      rayLayer.appendChild(origG);

      // 3. Solve Quadratic Ray-Circle Intersection:
      // P(t) = O + t*u.
      // (O.x + t*ux - C.x)² + (O.y + t*uy - C.y)² = R²
      const dx = state.origin[0] - state.center[0];
      const dy = state.origin[1] - state.center[1];

      const a = ux * ux + uy * uy; // = 1.0 since unit vector
      const b = 2 * (ux * dx + uy * dy);
      const c = dx * dx + dy * dy - state.radius * state.radius;

      const discriminant = b * b - 4 * a * c;

      if (discriminant < 0) {
        discrimLabel.textContent = `Discriminant Δ = ${discriminant.toFixed(1)} < 0 (No Real Intersections)`;
        root1Label.textContent = 'Root 1: None (Ray misses circle)';
        root2Label.textContent = 'Root 2: None';
        selectedRootLabel.textContent = 'Latching Mini-Jack: Ray does not intersect target curve';
        selectedRootLabel.style.color = '#ef4444';
        document.getElementById('nearest-root-badge').textContent = '0 Roots (Miss)';
        document.getElementById('nearest-root-badge').style.color = '#ef4444';
        return;
      }

      const sqrtD = Math.sqrt(discriminant);
      const t1 = (-b - sqrtD) / (2 * a);
      const t2 = (-b + sqrtD) / (2 * a);

      const p1 = [state.origin[0] + ux * t1, state.origin[1] + uy * t1];
      const p2 = [state.origin[0] + ux * t2, state.origin[1] + uy * t2];

      discrimLabel.textContent = `Discriminant Δ = ${discriminant.toFixed(0)} > 0 (2 Real Roots Solved)`;
      root1Label.textContent = `Root 1 (t1 = ${t1.toFixed(1)}px): [${p1[0].toFixed(1)}, ${p1[1].toFixed(1)}]`;
      root2Label.textContent = `Root 2 (t2 = ${t2.toFixed(1)}px): [${p2[0].toFixed(1)}, ${p2[1].toFixed(1)}]`;

      // Ghost spheres at both roots
      [p1, p2].forEach((p, i) => {
        rootsLayer.appendChild(makeElement('svg:circle', {
          cx: p[0], cy: p[1], r: 6, fill: 'none', stroke: '#f59e0b', 'stroke-width': 1.5, 'stroke-dasharray': '2,2'
        }));
      });

      // 4. Cursor Proximity Heuristic: Select closest root to mouse
      const d1 = Math.hypot(state.cursorPos[0] - p1[0], state.cursorPos[1] - p1[1]);
      const d2 = Math.hypot(state.cursorPos[0] - p2[0], state.cursorPos[1] - p2[1]);
      const chosen = d1 <= d2 ? p1 : p2;
      const chosenIdx = d1 <= d2 ? 1 : 2;

      selectedRootLabel.textContent = `Latching Mini-Jack: Root ${chosenIdx} (Closest to cursor: ${Math.min(d1, d2).toFixed(0)}px away)`;
      selectedRootLabel.style.color = '#10b981';

      document.getElementById('nearest-root-badge').textContent = `Root ${chosenIdx} Latched [N]`;
      document.getElementById('nearest-root-badge').style.color = '#10b981';

      // 5. Draw 3-Axis Mini-Jack at chosen root
      const jSize = 10;
      jackLayer.appendChild(makeElement('svg:line', {
        x1: chosen[0] - jSize, y1: chosen[1], x2: chosen[0] + jSize, y2: chosen[1],
        stroke: '#ef4444', 'stroke-width': '2.5'
      }));
      jackLayer.appendChild(makeElement('svg:line', {
        x1: chosen[0], y1: chosen[1] - jSize, x2: chosen[0], y2: chosen[1] + jSize,
        stroke: '#10b981', 'stroke-width': '2.5'
      }));
      jackLayer.appendChild(makeElement('svg:circle', {
        cx: chosen[0], cy: chosen[1], r: '3.5', fill: '#ffffff', stroke: '#00f2fe', 'stroke-width': '1.5'
      }));

      // Connector from cursor to Mini-Jack
      jackLayer.appendChild(makeElement('svg:line', {
        x1: state.cursorPos[0], y1: state.cursorPos[1], x2: chosen[0], y2: chosen[1],
        stroke: '#00f2fe', 'stroke-width': '1.2', 'stroke-dasharray': '3,3', opacity: '0.65'
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

    updateSimulation();

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

globalThis.CadNearestIntersectionLab = CadNearestIntersectionLab;
if (typeof module !== 'undefined' && module.exports) module.exports = CadNearestIntersectionLab;