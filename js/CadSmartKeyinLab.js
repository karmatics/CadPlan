class CadSmartKeyinLab {
  /**
   * Interactive SmartKeyin Directional Sign Inference & Smart Backspace Laboratory.
   * Demonstrates:
   * 1. Quadrant Directional Sign Inference (Bentley AccuDraw.ts parity):
   *    Drafters never type negative signs. Typing "15" while pulling left/down infers -15.0000.
   * 2. The CAD Smart Backspace:
   *    Pressing Backspace without typing captures the live dynamic coordinate,
   *    truncates the least significant digit, and locks into an active editing session.
   * 3. Value Memory Ring Buffer:
   *    ArrowUp / ArrowDown cycles previously confirmed dimensions on that axis.
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
        makeElement('span', { style: { fontSize: '15px' } }, '🔀'),
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'accuCad [Sub-View: SmartKeyin Sign Inference & Smart Backspace]'),
        makeElement('span', { id: 'smartkeyin-badge', style: { fontSize: '10px', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, 'Quadrant 1 (+,+)')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => triggerSmartBackspace()
        }, '⌫ Smart Backspace'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px', color: '#f59e0b', borderColor: '#f59e0b66' },
          onclick: () => cycleHistory(1)
        }, '▲ Prev Value'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px', color: '#f59e0b', borderColor: '#f59e0b66' },
          onclick: () => cycleHistory(-1)
        }, '▼ Next Value'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px', color: '#ef4444' },
          onclick: () => resetStream()
        }, 'Reset [Esc]')
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

    // Left Column: Interactive 2D Vector Compass Stage
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
      makeElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } }, [
        makeElement('span', { style: { color: '#00f2fe', fontWeight: 'bold' } }, 'Active Axis:'),
        btnAxisX = makeElement('button', {
          className: 'dr-tab-btn active', id: 'btn-axis-x',
          style: { padding: '2px 8px', fontSize: '10px' },
          onclick: () => setAxis('X')
        }, 'X Axis [Red]'),
        btnAxisY = makeElement('button', {
          className: 'dr-tab-btn', id: 'btn-axis-y',
          style: { padding: '2px 8px', fontSize: '10px' },
          onclick: () => setAxis('Y')
        }, 'Y Axis [Green]')
      ]),
      makeElement('span', { style: { color: '#64748b' } }, 'Move cursor across quadrants & type numbers')
    ]);
    let btnAxisX, btnAxisY;
    leftStage.appendChild(toolbar);

    const W = 460, H = 380;
    const svg = makeElement('svg:svg', {
      id: 'smartkeyin-svg-stage',
      viewBox: `0 0 ${W} ${H}`, width: '100%', height: '380px',
      style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '8px', cursor: 'crosshair' }
    });

    const defs = makeElement('svg:defs', {},
      makeElement('svg:pattern', { id: 'smartkeyin-grid', width: '20', height: '20', patternUnits: 'userSpaceOnUse' },
        makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '1' })
      ),
      makeElement('svg:filter', { id: 'smartkeyin-glow', x: '-20%', y: '-20%', width: '140%', height: '140%' },
        makeElement('svg:feGaussianBlur', { stdDeviation: '3', result: 'blur' }),
        makeElement('svg:feMerge', {},
          makeElement('svg:feMergeNode', { in: 'blur' }),
          makeElement('svg:feMergeNode', { in: 'SourceGraphic' })
        )
      )
    );
    svg.appendChild(defs);
    svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#smartkeyin-grid)' }));

    const quadrantLayer = makeElement('svg:g');
    const axesLayer = makeElement('svg:g');
    const dynamicVectorLayer = makeElement('svg:g');
    const compassLayer = makeElement('svg:g');
    const cursorLayer = makeElement('svg:g');

    svg.appendChild(quadrantLayer);
    svg.appendChild(axesLayer);
    svg.appendChild(dynamicVectorLayer);
    svg.appendChild(compassLayer);
    svg.appendChild(cursorLayer);
    leftStage.appendChild(svg);
    stageGrid.appendChild(leftStage);

    // Right Column: Live Typing Stream, Inferred Vector & Memory Stack
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

    // Inferred Vector Display Card
    const readoutCard = makeElement('div', {
      style: {
        background: '#070a13', border: '1.5px solid #00f2fe', borderRadius: '8px', padding: '12px',
        display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: '1.5',
        boxShadow: '0 0 16px rgba(0, 242, 254, 0.15)'
      }
    }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
        makeElement('strong', { style: { color: '#00f2fe' } }, 'SMARTKEYIN INFERENCE ENGINE:'),
        typingStatusLabel = makeElement('span', { style: { color: '#10b981', fontWeight: 'bold' } }, '● Dynamic Tracking')
      ]),
      typedInputLabel = makeElement('div', { style: { fontSize: '18px', fontWeight: 'bold', color: '#f8fafc', minHeight: '28px', display: 'flex', alignItems: 'center' } }),
      inferredResultLabel = makeElement('div', { style: { color: '#10b981', fontWeight: 'bold' } }, 'Inferred Vector Delta: DX = +145.20mm'),
      signReasonLabel = makeElement('div', { style: { color: '#94a3b8', fontSize: '10px' } }, 'Physical cursor is displaced in positive direction (No sign required)')
    ]);
    let typingStatusLabel, typedInputLabel, inferredResultLabel, signReasonLabel;
    rightCol.appendChild(readoutCard);

    // Value History Stack Card
    const historyCard = makeElement('div', {
      style: {
        background: '#070a13', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px',
        display: 'flex', flexDirection: 'column', gap: '6px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
        makeElement('strong', { style: { color: '#f59e0b' } }, 'VALUE MEMORY RING BUFFER (UP/DOWN):'),
        makeElement('span', { id: 'history-count-badge', style: { color: '#64748b', fontSize: '10px' } }, '4 items')
      ]),
      historyListEl = makeElement('div', {
        style: { display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }
      })
    ]);
    let historyListEl;
    rightCol.appendChild(historyCard);

    // Educational Principle Box
    const noteCard = makeElement('div', {
      style: {
        background: 'rgba(0, 242, 254, 0.05)', borderLeft: '3px solid #00f2fe',
        padding: '10px 12px', borderRadius: '4px', fontSize: '10.5px', color: '#cbd5e1', lineHeight: '1.5'
      }
    }, [
      makeElement('strong', { style: { color: '#00f2fe', display: 'block', marginBottom: '2px' } }, 'Why Drafters Never Type Minus Signs:'),
      'When drafting on paper or computer, you pull your pencil or mouse in the direction of the wall or bracket. In AccuDraw, ',
      makeElement('strong', { style: { color: '#fff' } }, 'the sign is inferred from physical motion'),
      '. Typing "25" while pulling left results in -25.000. Pressing ',
      makeElement('strong', { style: { color: '#10b981' } }, 'Backspace'),
      ' without typing immediately captures the live coordinate, trims the last decimal digit, and initiates an in-situ numerical edit!'
    ]);
    rightCol.appendChild(noteCard);

    stageGrid.appendChild(rightCol);
    wrap.appendChild(stageGrid);
    container.appendChild(wrap);

    const state = {
      cx: W / 2,
      cy: H / 2,
      activeAxis: 'X',
      cursorPos: [W / 2 + 120, H / 2 - 80],
      isTyping: false,
      typedBuffer: '',
      history: [10.0, 25.0, 50.0, 100.0],
      historyIdx: -1
    };

    function setAxis(ax) {
      state.activeAxis = ax;
      btnAxisX.classList.toggle('active', ax === 'X');
      btnAxisY.classList.toggle('active', ax === 'Y');
      updateSimulation();
    }

    function renderHistoryPills() {
      historyListEl.innerHTML = '';
      state.history.forEach((val, idx) => {
        const isSelected = idx === state.historyIdx;
        const pill = makeElement('button', {
          className: 'dr-nav-btn',
          style: {
            padding: '2px 8px', fontSize: '10px',
            background: isSelected ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
            color: isSelected ? '#f59e0b' : '#94a3b8',
            borderColor: isSelected ? '#f59e0b' : '#1e293b'
          },
          onclick: () => {
            state.historyIdx = idx;
            state.isTyping = true;
            state.typedBuffer = val.toFixed(1);
            renderHistoryPills();
            updateSimulation();
          }
        }, `${val.toFixed(1)}mm`);
        historyListEl.appendChild(pill);
      });
      document.getElementById('history-count-badge').textContent = `${state.history.length} items`;
    }

    function cycleHistory(dir) {
      if (state.history.length === 0) return;
      state.historyIdx = (state.historyIdx + dir + state.history.length) % state.history.length;
      state.isTyping = true;
      state.typedBuffer = state.history[state.historyIdx].toString();
      renderHistoryPills();
      updateSimulation();
      if (typeof CompassSkinAddons !== 'undefined') {
        CompassSkinAddons.playSnapPop(640, 0.03);
      }
    }

    function triggerSmartBackspace() {
      const dx = state.cursorPos[0] - state.cx;
      const dy = -(state.cursorPos[1] - state.cy);
      const liveVal = state.activeAxis === 'X' ? dx : dy;

      if (!state.isTyping) {
        // Smart Backspace: Capture live coordinate, truncate least significant digit
        const rawStr = Math.abs(liveVal).toFixed(2);
        state.typedBuffer = rawStr.slice(0, -1); // e.g. 14.2 -> 14.
        state.isTyping = true;
      } else {
        if (state.typedBuffer.length > 0) {
          state.typedBuffer = state.typedBuffer.slice(0, -1);
        }
        if (state.typedBuffer.length === 0) {
          state.isTyping = false;
        }
      }
      updateSimulation();
      if (typeof CompassSkinAddons !== 'undefined') {
        CompassSkinAddons.playSnapPop(520, 0.03);
      }
    }

    function resetStream() {
      state.isTyping = false;
      state.typedBuffer = '';
      state.historyIdx = -1;
      renderHistoryPills();
      updateSimulation();
    }

    function updateSimulation() {
      quadrantLayer.innerHTML = '';
      axesLayer.innerHTML = '';
      dynamicVectorLayer.innerHTML = '';
      compassLayer.innerHTML = '';
      cursorLayer.innerHTML = '';

      const dx = state.cursorPos[0] - state.cx;
      const dy = -(state.cursorPos[1] - state.cy); // positive up

      // 1. Quadrant background tint
      const qX = dx >= 0 ? state.cx : 0;
      const qY = dy >= 0 ? 0 : state.cy;
      const qW = state.cx;
      const qH = state.cy;

      quadrantLayer.appendChild(makeElement('svg:rect', {
        x: qX, y: qY, width: qW, height: qH,
        fill: 'rgba(56, 189, 248, 0.04)', stroke: 'none'
      }));

      // 2. Axes
      axesLayer.appendChild(makeElement('svg:line', {
        x1: 0, y1: state.cy, x2: W, y2: state.cy,
        stroke: state.activeAxis === 'X' ? '#ef4444' : 'rgba(239, 68, 68, 0.35)',
        'stroke-width': state.activeAxis === 'X' ? 2 : 1.2
      }));
      axesLayer.appendChild(makeElement('svg:line', {
        x1: state.cx, y1: 0, x2: state.cx, y2: H,
        stroke: state.activeAxis === 'Y' ? '#10b981' : 'rgba(16, 185, 129, 0.35)',
        'stroke-width': state.activeAxis === 'Y' ? 2 : 1.2
      }));

      // Axis labels
      axesLayer.appendChild(makeElement('svg:text', { x: W - 18, y: state.cy - 6, fill: '#ef4444', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, '+X'));
      axesLayer.appendChild(makeElement('svg:text', { x: 12, y: state.cy - 6, fill: '#64748b', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, '-X'));
      axesLayer.appendChild(makeElement('svg:text', { x: state.cx + 6, y: 18, fill: '#10b981', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, '+Y'));
      axesLayer.appendChild(makeElement('svg:text', { x: state.cx + 6, y: H - 12, fill: '#64748b', 'font-family': 'monospace', 'font-size': '11px', 'font-weight': 'bold' }, '-Y'));

      // 3. Central AccuDraw Compass Reticle
      const compG = makeElement('svg:g', { transform: `translate(${state.cx}, ${state.cy}) scale(0.48)` });
      const compassSvg = SquircleCompassSvg.renderElement({
        size: 90, squircle: 0.5, activeAxis: state.activeAxis.toLowerCase()
      });
      compassSvg.setAttribute('x', '-45');
      compassSvg.setAttribute('y', '-45');
      compG.appendChild(compassSvg);
      compassLayer.appendChild(compG);

      // 4. Resolve SmartKeyin Sign Inference
      let magnitude = 0;
      let isNegative = false;

      if (state.isTyping && state.typedBuffer.length > 0) {
        magnitude = parseFloat(state.typedBuffer) || 0;
        const currentDelta = state.activeAxis === 'X' ? dx : dy;
        isNegative = currentDelta < 0;
      } else {
        magnitude = Math.abs(state.activeAxis === 'X' ? dx : dy);
        isNegative = (state.activeAxis === 'X' ? dx : dy) < 0;
      }

      const signedValue = isNegative ? -magnitude : magnitude;

      // 5. Draw Dynamic Trajectory Line
      let targetX = state.cursorPos[0];
      let targetY = state.cursorPos[1];

      if (state.isTyping) {
        if (state.activeAxis === 'X') {
          targetX = state.cx + signedValue;
          targetY = state.cy;
        } else {
          targetX = state.cx;
          targetY = state.cy - signedValue;
        }
      }

      dynamicVectorLayer.appendChild(makeElement('svg:line', {
        x1: state.cx, y1: state.cy, x2: targetX, y2: targetY,
        stroke: '#00f2fe', 'stroke-width': '2.5', 'stroke-linecap': 'round'
      }));

      // Render 3-Axis Mini-Jack at resolved destination
      const jSize = 8;
      cursorLayer.appendChild(makeElement('svg:line', {
        x1: targetX - jSize, y1: targetY, x2: targetX + jSize, y2: targetY,
        stroke: '#ef4444', 'stroke-width': '2'
      }));
      cursorLayer.appendChild(makeElement('svg:line', {
        x1: targetX, y1: targetY - jSize, x2: targetX, y2: targetY + jSize,
        stroke: '#10b981', 'stroke-width': '2'
      }));
      cursorLayer.appendChild(makeElement('svg:circle', {
        cx: targetX, cy: targetY, r: 3, fill: '#ffffff', stroke: '#00f2fe', 'stroke-width': '1.5'
      }));

      // Update Quadrant Badge
      const qName = (dx >= 0 && dy >= 0) ? 'Q1 (+X, +Y)' :
                    (dx < 0 && dy >= 0) ? 'Q2 (-X, +Y)' :
                    (dx < 0 && dy < 0) ? 'Q3 (-X, -Y)' : 'Q4 (+X, -Y)';
      document.getElementById('smartkeyin-badge').textContent = qName;

      // Update Typing Readout UI
      typedInputLabel.innerHTML = '';
      if (state.isTyping) {
        typedInputLabel.appendChild(makeElement('span', { style: { color: '#00f2fe' } }, `Typed: "${state.typedBuffer}"`));
        typedInputLabel.appendChild(makeElement('span', { className: 'accudrawCaret' }, '\u200b'));
        typingStatusLabel.textContent = '🔒 NUMERIC ENTRY LOCKED';
        typingStatusLabel.style.color = '#f59e0b';
      } else {
        typedInputLabel.appendChild(makeElement('span', { style: { color: '#94a3b8' } }, `Live Dynamic: ${magnitude.toFixed(2)}`));
        typingStatusLabel.textContent = '● Dynamic Mouse Tracking';
        typingStatusLabel.style.color = '#10b981';
      }

      inferredResultLabel.textContent = `Inferred Vector Delta: D${state.activeAxis} = ${signedValue >= 0 ? '+' : ''}${signedValue.toFixed(2)}mm`;
      signReasonLabel.textContent = isNegative
        ? `Cursor pulled in negative direction: negative sign automatically multiplied (Bentley smartKeyin algorithm)`
        : `Cursor pulled in positive direction: positive value applied without typing signs`;
    }

    svg.addEventListener('pointermove', (e) => {
      const rect = svg.getBoundingClientRect();
      state.cursorPos = [
        (e.clientX - rect.left) * (W / rect.width),
        (e.clientY - rect.top) * (H / rect.height)
      ];
      updateSimulation();
    });

    wrap.addEventListener('keydown', (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      const k = e.key;

      if (k === 'ArrowUp') {
        e.preventDefault();
        cycleHistory(1);
        return;
      }
      if (k === 'ArrowDown') {
        e.preventDefault();
        cycleHistory(-1);
        return;
      }
      if (k === 'Backspace') {
        e.preventDefault();
        triggerSmartBackspace();
        return;
      }
      if (k === 'Escape') {
        e.preventDefault();
        resetStream();
        return;
      }
      if (k === 'Tab') {
        e.preventDefault();
        setAxis(state.activeAxis === 'X' ? 'Y' : 'X');
        return;
      }
      if (k === 'Enter') {
        e.preventDefault();
        if (state.isTyping && state.typedBuffer) {
          const val = parseFloat(state.typedBuffer);
          if (!isNaN(val) && !state.history.includes(val)) {
            state.history.unshift(val);
            if (state.history.length > 8) state.history.pop();
            renderHistoryPills();
          }
          resetStream();
          if (typeof CompassSkinAddons !== 'undefined') {
            CompassSkinAddons.playSnapPop(880, 0.05);
          }
        }
        return;
      }

      // Digits & Decimal
      if (/^[0-9.]$/.test(k)) {
        e.preventDefault();
        if (!state.isTyping) {
          state.isTyping = true;
          state.typedBuffer = '';
        }
        state.typedBuffer += k;
        updateSimulation();
        if (typeof CompassSkinAddons !== 'undefined') {
          CompassSkinAddons.playSnapPop(580, 0.02);
        }
      }
    });

    renderHistoryPills();
    updateSimulation();
  }
}

globalThis.CadSmartKeyinLab = CadSmartKeyinLab;
if (typeof module !== 'undefined' && module.exports) module.exports = CadSmartKeyinLab;