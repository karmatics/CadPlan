class CadAgentTelemetryLab {
  /**
   * Interactive Sandbox demonstrating autonomous AI agent drafting via
   * AccuDraw relative vector telemetry and Model Context Protocol (MCP) stream.
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
        makeElement('span', { style: { fontSize: '15px' } }, '🤖'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'Autonomous AI Drafting & MCP Event Stream Simulator'),
        makeElement('span', { style: { fontSize: '10px', background: '#a855f7', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Zero Trigonometric Hallucinations')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#10b981', fontFamily: 'monospace' } }, 'Relative Vector Navigation Engine')
    ]);
    wrap.appendChild(header);

    const stage = makeElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1px',
        background: '#21262d'
      }
    });

    // Left Column: Interactive Simulation Controls & Canvas
    const leftCol = makeElement('div', {
      style: { background: '#090d16', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }
    });

    leftCol.appendChild(makeElement('div', {
      style: { fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' }
    }, 'Select an architectural directive. The simulator drives AccuDraw relative hints, executing gap-free drafting deterministically:'));

    const buttonsRow = makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [
      makeElement('button', {
        className: 'dr-nav-btn primary',
        onclick: () => runSimulation('chassis')
      }, '▶ Draft Machined Bracket'),
      makeElement('button', {
        className: 'dr-nav-btn',
        onclick: () => runSimulation('fillet_plate')
      }, '▶ Draft Tangent Arc Plate'),
      makeElement('button', {
        className: 'dr-nav-btn',
        style: { color: '#ef4444' },
        onclick: () => resetSim()
      }, '🗑️ Reset')
    ]);
    leftCol.appendChild(buttonsRow);

    const svgW = 360, svgH = 260;
    const svg = makeElement('svg:svg', {
      viewBox: `0 0 ${svgW} ${svgH}`, width: '100%', height: '260px',
      style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '8px' }
    });

    const svgDefs = makeElement('svg:defs', {},
      makeElement('svg:pattern', { id: 'agent-grid', width: '20', height: '20', patternUnits: 'userSpaceOnUse' },
        makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '1' })
      )
    );
    svg.appendChild(svgDefs);
    svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#agent-grid)' }));

    const drawLayer = makeElement('svg:g');
    const compassLayer = makeElement('svg:g');
    svg.appendChild(drawLayer);
    svg.appendChild(compassLayer);
    leftCol.appendChild(svg);
    stage.appendChild(leftCol);

    // Right Column: Live MCP JSON-RPC Stream
    const rightCol = makeElement('div', {
      style: { background: '#0a0e1a', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }
    });

    rightCol.appendChild(makeElement('div', {
      style: { fontSize: '11px', textTransform: 'uppercase', color: '#a855f7', fontWeight: 'bold', letterSpacing: '0.06em' }
    }, 'Live MCP JSON-RPC Telemetry Pipe'));

    const logBox = makeElement('div', {
      id: 'agent-mcp-log',
      style: {
        flex: 1, minHeight: '300px', maxHeight: '330px', overflowY: 'auto',
        background: '#070a13', border: '1px solid #1e293b', borderRadius: '6px',
        padding: '10px', fontFamily: 'monospace', fontSize: '10.5px', color: '#e2e8f0',
        lineHeight: '1.45'
      }
    });
    rightCol.appendChild(logBox);
    stage.appendChild(rightCol);

    wrap.appendChild(stage);
    container.appendChild(wrap);

    let simTimer = null;

    function resetSim() {
      if (simTimer) clearTimeout(simTimer);
      drawLayer.innerHTML = '';
      compassLayer.innerHTML = '';
      logBox.innerHTML = '<div style="color:#64748b;font-style:italic;">Awaiting agent directive execution...</div>';
    }

    function addMcpLog(type, method, payload, result) {
      const entry = makeElement('div', {
        style: { borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '4px 0' }
      }, [
        makeElement('span', { style: { color: type === 'call' ? '#38bdf8' : '#10b981', fontWeight: 'bold' } }, `[${type.toUpperCase()}] `),
        makeElement('span', { style: { color: '#f8fafc', fontWeight: 'bold' } }, method),
        makeElement('div', { style: { color: '#94a3b8', fontSize: '10px' } }, JSON.stringify(payload)),
        result ? makeElement('div', { style: { color: '#10b981', fontSize: '10px' } }, `↳ result: ${JSON.stringify(result)}`) : null
      ]);
      logBox.appendChild(entry);
      logBox.scrollTop = logBox.scrollHeight;
    }

    function runSimulation(scriptName) {
      resetSim();
      logBox.innerHTML = '';

      const steps = scriptName === 'chassis' ? [
        { method: 'compass_set_origin', params: { x: 80, y: 180, z: 0 }, result: { origin: [80, 180, 0] } },
        { method: 'compass_lock_axis', params: { axis: 'x', value: 160 }, result: { locked: 'x', value: 160 }, draw: { type: 'line', x1: 80, y1: 180, x2: 240, y2: 180 } },
        { method: 'compass_set_origin', params: { x: 240, y: 180, z: 0 }, result: { origin: [240, 180, 0] } },
        { method: 'compass_lock_axis', params: { axis: 'y', value: -100 }, result: { locked: 'y', value: -100 }, draw: { type: 'line', x1: 240, y1: 180, x2: 240, y2: 80 } },
        { method: 'smartline_segment', params: { point: [140, 80], bulge: 0.4142 }, result: { arc: 'tangent', radius: 30 }, draw: { type: 'line', x1: 240, y1: 80, x2: 140, y2: 80 } },
        { method: 'compass_set_origin', params: { x: 140, y: 80, z: 0 }, result: { origin: [140, 80, 0] } },
        { method: 'smartline_chain', params: { close_to_origin: true }, result: { closed: true, manifold: true }, draw: { type: 'line', x1: 140, y1: 80, x2: 80, y2: 180 } }
      ] : [
        { method: 'compass_orient_plane', params: { plane: 'top' }, result: { plane: 'TOP', normal: [0, 1, 0] } },
        { method: 'compass_set_origin', params: { x: 90, y: 160, z: 0 }, result: { origin: [90, 160, 0] } },
        { method: 'compass_vector_input', params: { distance: 180, angle: 0 }, result: { target: [270, 160, 0] }, draw: { type: 'line', x1: 90, y1: 160, x2: 270, y2: 160 } },
        { method: 'smartline_arc', params: { radius: 45, sweep: 90, clockwise: false }, result: { bulge: 0.4142 }, draw: { type: 'arc', cx: 270, cy: 115, r: 45, p1: [270, 160], p2: [315, 115] } }
      ];

      let idx = 0;
      function nextStep() {
        if (idx >= steps.length) {
          addMcpLog('complete', 'session_commit', { status: '100% Manifold Precision Guaranteed' });
          return;
        }

        const s = steps[idx];
        addMcpLog('call', s.method, s.params, s.result);

        if (s.draw) {
          if (s.draw.type === 'line') {
            drawLayer.appendChild(makeElement('svg:line', {
              x1: s.draw.x1, y1: s.draw.y1, x2: s.draw.x2, y2: s.draw.y2,
              stroke: '#10b981', 'stroke-width': '2.5', 'stroke-linecap': 'round'
            }));
            [ [s.draw.x1, s.draw.y1], [s.draw.x2, s.draw.y2] ].forEach(pt => {
              drawLayer.appendChild(makeElement('svg:circle', {
                cx: pt[0], cy: pt[1], r: '3.5', fill: '#090d16', stroke: '#38bdf8', 'stroke-width': '1.5'
              }));
            });
          } else if (s.draw.type === 'arc') {
            drawLayer.appendChild(makeElement('svg:path', {
              d: `M ${s.draw.p1[0]} ${s.draw.p1[1]} A ${s.draw.r} ${s.draw.r} 0 0 0 ${s.draw.p2[0]} ${s.draw.p2[1]}`,
              fill: 'none', stroke: '#10b981', 'stroke-width': '2.5', 'stroke-linecap': 'round'
            }));
          }
        }

        if (s.params && s.params.x && s.params.y) {
          compassLayer.innerHTML = '';
          const compG = makeElement('svg:g', { transform: `translate(${s.params.x}, ${s.params.y}) scale(0.35)` });
          const compSvg = SquircleCompassSvg.renderElement({ size: 90, squircle: 0.45, activeAxis: 'x' });
          compSvg.setAttribute('x', '-45');
          compSvg.setAttribute('y', '-45');
          compG.appendChild(compSvg);
          compassLayer.appendChild(compG);
        }

        idx++;
        simTimer = setTimeout(nextStep, 650);
      }

      nextStep();
    }

    resetSim();
  }
}

globalThis.CadAgentTelemetryLab = CadAgentTelemetryLab;
if (typeof module !== 'undefined' && module.exports) module.exports = CadAgentTelemetryLab;