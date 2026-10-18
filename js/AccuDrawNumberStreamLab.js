class AccuDrawNumberStreamLab {
  /**
   * Interactive Laboratory demonstrating single-stroke parameter scaling
   * (e.g. piano-style V5 for 50%, V9 for 90%, and decimal continuation V9.5),
   * exponential compass sizing (S #0-9), and direct numerical coordinate streams.
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
        makeElement('span', { style: { fontSize: '15px' } }, '🔢'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'Numerical Command Stream & Decimal Parser'),
        makeElement('span', { style: { fontSize: '10px', background: '#f59e0b', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Dynamic Ranges & Continuation')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' } }, 'Click inside and test: V + 0-9 (Volume), S + 0-9 (Size), or type coordinates')
    ]);
    wrap.appendChild(header);

    // 2. Interactive Body Grid
    const body = makeElement('div', {
      style: {
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        background: '#090d16'
      }
    });

    // Left Column: Interactive Mode Presets & Keypad
    const leftCol = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } });

    const presetsBox = makeElement('div', {
      style: {
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }
    }, [
      makeElement('div', { style: { fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.06em' } }, 'Test Modes & Dynamic Bindings'),
      makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [
        makeElement('button', {
          className: 'dr-tab-btn active',
          id: 'btn-num-mode-volume',
          onclick: () => setTestMode('volume')
        }, '🎹 Piano Parameter (V + #0-9)'),
        makeElement('button', {
          className: 'dr-tab-btn',
          id: 'btn-num-mode-size',
          onclick: () => setTestMode('size')
        }, '🧭 Compass Size (S + #0-9)'),
        makeElement('button', {
          className: 'dr-tab-btn',
          id: 'btn-num-mode-coord',
          onclick: () => setTestMode('coord')
        }, '📐 Direct Inset (X/Y Stream)')
      ])
    ]);
    leftCol.appendChild(presetsBox);

    // Virtual Number Keypad
    const keypadBox = makeElement('div', {
      style: {
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        padding: '12px'
      }
    });
    keypadBox.appendChild(makeElement('div', {
      style: { fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.06em' }
    }, 'Virtual Keystroke Pad (or use real keyboard)'));

    const padRow1 = makeElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '6px' } });
    ['7', '8', '9', 'V'].forEach(k => {
      padRow1.appendChild(makeElement('button', {
        className: 'dr-nav-btn',
        style: { padding: '8px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '13px', textAlign: 'center' },
        onclick: () => handleInput(k)
      }, k));
    });

    const padRow2 = makeElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '6px' } });
    ['4', '5', '6', 'S'].forEach(k => {
      padRow2.appendChild(makeElement('button', {
        className: 'dr-nav-btn',
        style: { padding: '8px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '13px', textAlign: 'center' },
        onclick: () => handleInput(k)
      }, k));
    });

    const padRow3 = makeElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '6px' } });
    ['1', '2', '3', '.'].forEach(k => {
      padRow3.appendChild(makeElement('button', {
        className: 'dr-nav-btn',
        style: { padding: '8px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '13px', textAlign: 'center' },
        onclick: () => handleInput(k)
      }, k));
    });

    const padRow4 = makeElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' } });
    ['0', '⌫ Backspace', 'Esc', 'Tab'].forEach(k => {
      padRow4.appendChild(makeElement('button', {
        className: 'dr-nav-btn',
        style: { padding: '8px 4px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '11px', textAlign: 'center' },
        onclick: () => handleInput(k.startsWith('⌫') ? 'Backspace' : k)
      }, k));
    });

    keypadBox.appendChild(padRow1);
    keypadBox.appendChild(padRow2);
    keypadBox.appendChild(padRow3);
    keypadBox.appendChild(padRow4);
    leftCol.appendChild(keypadBox);

    body.appendChild(leftCol);

    // Right Column: Live Stream Visualizer & Value Gauge
    const rightCol = makeElement('div', {
      style: {
        background: '#050811',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }
    });

    // Value Display Box
    const readoutCard = makeElement('div', {
      style: {
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1.5px solid #0284c7',
        borderRadius: '8px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }
    });

    const readoutHeader = makeElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    }, [
      makeElement('span', { id: 'num-stream-label', style: { fontSize: '11px', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 'bold' } }, 'Active Target: Parameter Volume'),
      makeElement('span', { id: 'num-stream-mode', style: { fontSize: '10px', color: '#10b981', fontFamily: 'monospace' } }, 'Mode: Continuous Scale')
    ]);
    readoutCard.appendChild(readoutHeader);

    // Glowing Caret Inset Display
    const textBufferDisplay = makeElement('div', {
      id: 'num-stream-buffer-display',
      style: {
        fontSize: '26px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        minHeight: '36px'
      }
    });
    readoutCard.appendChild(textBufferDisplay);

    // Visual Percentage / Value Gauge Bar
    const gaugeTrack = makeElement('div', {
      style: { width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }
    });
    const gaugeFill = makeElement('div', {
      id: 'num-stream-gauge',
      style: { width: '50%', height: '100%', background: 'linear-gradient(90deg, #38bdf8, #10b981)', transition: 'width 0.15s ease' }
    });
    gaugeTrack.appendChild(gaugeFill);
    readoutCard.appendChild(gaugeTrack);

    rightCol.appendChild(readoutCard);

    // Stream Log
    const logContainer = makeElement('div', {
      style: {
        flex: 1,
        minHeight: '160px',
        maxHeight: '220px',
        overflowY: 'auto',
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#e2e8f0',
        background: '#090d16',
        borderRadius: '6px',
        padding: '8px 10px',
        border: '1px solid #161e2b',
        lineHeight: '1.5'
      }
    });
    rightCol.appendChild(logContainer);

    body.appendChild(rightCol);
    wrap.appendChild(body);

    // Internal State
    let state = {
      testMode: 'volume', // 'volume' | 'size' | 'coord'
      prefix: '',
      buffer: '',
      resolvedValue: 50,
      activeAxis: 'X',
      log: []
    };

    function setTestMode(mode) {
      state.testMode = mode;
      state.buffer = '';
      state.prefix = '';

      document.querySelectorAll('#btn-num-mode-volume, #btn-num-mode-size, #btn-num-mode-coord').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById(`btn-num-mode-${mode}`);
      if (activeBtn) activeBtn.classList.add('active');

      const labelEl = document.getElementById('num-stream-label');
      const modeEl = document.getElementById('num-stream-mode');

      if (mode === 'volume') {
        labelEl.textContent = 'Active Target: Parameter Scale [V]';
        modeEl.textContent = 'Formula: V + 0-9 (0%–90%, decimal continuation)';
        state.resolvedValue = 50;
      } else if (mode === 'size') {
        labelEl.textContent = 'Active Target: Compass Size [S]';
        modeEl.textContent = 'Formula: S + #0-9 (1.5px – 300px exponential)';
        state.resolvedValue = 60;
      } else if (mode === 'coord') {
        labelEl.textContent = `Active Target: Distance Offset [${state.activeAxis}]`;
        modeEl.textContent = 'Mode: Direct Millimeter Inset Stream';
        state.resolvedValue = 0;
      }
      renderDisplay();
    }

    function renderDisplay() {
      textBufferDisplay.innerHTML = '';
      const textSpan = makeElement('span', {}, state.buffer || (state.prefix ? state.prefix : '0'));
      const caret = makeElement('span', { className: 'accudrawCaret' }, '\u200b');
      textBufferDisplay.appendChild(textSpan);
      textBufferDisplay.appendChild(caret);

      // Gauge Bar
      let pct = 50;
      if (state.testMode === 'volume') {
        pct = Math.max(0, Math.min(100, state.resolvedValue));
      } else if (state.testMode === 'size') {
        pct = Math.max(0, Math.min(100, (state.resolvedValue / 300) * 100));
      } else {
        pct = Math.max(0, Math.min(100, (state.resolvedValue / 100) * 100));
      }
      gaugeFill.style.width = `${pct}%`;
    }

    function addLog(key, action, result) {
      const ts = (performance.now() / 1000).toFixed(2);
      state.log.unshift({ ts, key, action, result });
      if (state.log.length > 20) state.log.length = 20;

      logContainer.innerHTML = '';
      state.log.forEach(item => {
        logContainer.appendChild(makeElement('div', { style: { borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '2px 0' } }, [
          makeElement('span', { style: { color: '#64748b', marginRight: '6px' } }, item.ts),
          makeElement('span', { style: { color: '#38bdf8', fontWeight: 'bold' } }, `[${item.key}]`),
          makeElement('span', { style: { color: '#94a3b8', margin: '0 6px' } }, '➔'),
          makeElement('span', { style: { color: '#10b981' } }, item.result)
        ]));
      });
    }

    function handleInput(k) {
      const upper = k.toUpperCase();

      if (upper === 'V') {
        state.testMode = 'volume';
        setTestMode('volume');
        state.prefix = 'V';
        state.buffer = 'V';
        addLog('V', 'Prefix engaged', 'Awaiting parameter level 0-9...');
        renderDisplay();
        return;
      }

      if (upper === 'S') {
        state.testMode = 'size';
        setTestMode('size');
        state.prefix = 'S';
        state.buffer = 'S';
        addLog('S', 'Prefix engaged', 'Awaiting compass size exponent 0-9...');
        renderDisplay();
        return;
      }

      if (upper === 'TAB') {
        state.activeAxis = state.activeAxis === 'X' ? 'Y' : 'X';
        addLog('Tab', 'Switched Axis', `Active axis is now ${state.activeAxis}`);
        if (state.testMode === 'coord') {
          document.getElementById('num-stream-label').textContent = `Active Target: Distance Offset [${state.activeAxis}]`;
        }
        return;
      }

      if (upper === 'ESC' || upper === 'ESCAPE') {
        state.buffer = '';
        state.prefix = '';
        addLog('Esc', 'Hierarchical Clear', 'Input buffer reset');
        renderDisplay();
        return;
      }

      if (upper === 'BACKSPACE') {
        if (state.buffer.length > 0) {
          state.buffer = state.buffer.slice(0, -1);
          addLog('Backspace', 'Truncate digit', `Buffer: "${state.buffer}"`);
        } else {
          // CAD Smart Backspace on committed float
          let currentStr = state.resolvedValue.toString();
          if (currentStr.length > 1) {
            currentStr = currentStr.slice(0, -1);
            state.resolvedValue = parseFloat(currentStr) || 0;
            state.buffer = currentStr;
            addLog('Smart Backspace', 'Truncated live value', `Truncated to ${state.resolvedValue}`);
          }
        }
        renderDisplay();
        return;
      }

      // Digits and Decimals
      if (/^[0-9.]$/.test(upper)) {
        state.buffer += upper;

        if (state.testMode === 'volume') {
          // Parse piano volume scale: V + single digit => 10*digit % (e.g. V5 => 50%, V9 => 90%)
          // With decimal continuation: V9.5 => 95%
          const numPart = state.buffer.replace(/^V/i, '');
          const val = parseFloat(numPart);
          if (!isNaN(val)) {
            if (numPart.length === 1) {
              state.resolvedValue = val * 10;
            } else {
              state.resolvedValue = val * 10; // e.g. 9.5 -> 95%
            }
            addLog(upper, 'Parsed Parameter Scale', `Level = ${state.resolvedValue.toFixed(1)}%`);
          }
        } else if (state.testMode === 'size') {
          const numPart = state.buffer.replace(/^S/i, '');
          const digit = parseInt(numPart);
          if (!isNaN(digit)) {
            state.resolvedValue = Math.round(1.5 * Math.pow(300 / 1.5, Math.min(9, digit) / 9));
            addLog(upper, 'Parsed Exponential Size', `Compass size = ${state.resolvedValue}px`);
          }
        } else {
          const val = parseFloat(state.buffer);
          if (!isNaN(val)) {
            state.resolvedValue = val;
            addLog(upper, 'Direct Inset', `${state.activeAxis} = ${val} mm`);
          }
        }

        renderDisplay();
      }
    }

    wrap.addEventListener('keydown', (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      e.stopPropagation();
      handleInput(e.key);
    });

    container.appendChild(wrap);
    setTestMode('volume');
  }
}

globalThis.AccuDrawNumberStreamLab = AccuDrawNumberStreamLab;
if (typeof module !== 'undefined' && module.exports) module.exports = AccuDrawNumberStreamLab;