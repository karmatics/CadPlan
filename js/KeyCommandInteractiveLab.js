class KeyCommandInteractiveLab {
  /**
   * Interactive Sandbox for the Universal Single-Stroke Key Command Engine.
   * Demonstrates instant key execution without Enter, two-level hierarchical menus,
   * numerical range bindings (#0-9), and parameter scaling.
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

    // 1. Header
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
        makeElement('span', { style: { fontSize: '15px' } }, '⌨️'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'KeyCommandEngine: Interactive Dispatch Sandbox'),
        makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'No Enter Key Required')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' } }, 'Click inside & type on your keyboard, or click the virtual keys')
    ]);
    wrap.appendChild(header);

    // 2. Main Visualizer Stage
    const stage = makeElement('div', {
      style: {
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        background: '#090d16'
      }
    });

    // Left Column: Command Tree & Interactive Key Pills
    const leftCol = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } });

    const keySection = (title, keys) => {
      const box = makeElement('div', {
        style: {
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid #1e293b',
          borderRadius: '8px',
          padding: '10px 12px'
        }
      });
      box.appendChild(makeElement('div', {
        style: { fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.06em' }
      }, title));

      const row = makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } });
      keys.forEach(k => {
        const btn = makeElement('button', {
          className: 'dr-nav-btn',
          style: {
            padding: '4px 8px', fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold',
            background: '#0f172a', borderColor: '#334155', color: '#f8fafc'
          },
          onclick: () => processKey(k.char)
        }, [
          makeElement('span', { style: { color: '#38bdf8' } }, k.char),
          makeElement('span', { style: { color: '#94a3b8', fontSize: '9px', marginLeft: '4px' } }, k.label)
        ]);
        row.appendChild(btn);
      });
      box.appendChild(row);
      return box;
    };

    leftCol.appendChild(keySection('1. Principal 3D Planes (Single Stroke)', [
      { char: 'T', label: 'Top' },
      { char: 'F', label: 'Front' },
      { char: 'S', label: 'Side' },
      { char: 'V', label: 'View' }
    ]));

    leftCol.appendChild(keySection('2. Compass Constraints & Modes', [
      { char: 'Space', label: 'Toggle Mode' },
      { char: 'L', label: 'SmartLock' },
      { char: 'O', label: 'Set Origin' },
      { char: 'X', label: 'Lock X' },
      { char: 'Y', label: 'Lock Y' }
    ]));

    leftCol.appendChild(keySection('3. Sub-Menu Branching & Numerical Ranges', [
      { char: 'V', label: 'View Menu' },
      { char: 'C', label: 'Command Menu' },
      { char: 'S', label: 'Size #0-9' },
      { char: '0', label: 'Scale 0' },
      { char: '5', label: 'Scale 5' },
      { char: '9', label: 'Scale 9' }
    ]));

    stage.appendChild(leftCol);

    // Right Column: Live Dispatch Monitor & Breadcrumbs
    const rightCol = makeElement('div', {
      style: {
        background: '#050811',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }
    });

    const monitorHeader = makeElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #161e2b', paddingBottom: '6px'
      }
    }, [
      makeElement('span', { style: { fontSize: '11px', color: '#38bdf8', fontWeight: 'bold', fontFamily: 'monospace' } }, 'DISPATCH EXECUTION MONITOR'),
      makeElement('span', { id: 'kch-status-indicator', style: { fontSize: '10px', color: '#10b981', fontFamily: 'monospace' } }, '● Ready')
    ]);
    rightCol.appendChild(monitorHeader);

    // Visual Popup Box Simulator (recreates PopupBox topLevel and secondLevel)
    const popupSimulator = makeElement('div', {
      style: {
        minHeight: '80px',
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px dashed #21262d',
        borderRadius: '6px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }
    });
    rightCol.appendChild(popupSimulator);

    const logBox = makeElement('div', {
      id: 'kch-log-stream',
      style: {
        flex: 1,
        minHeight: '160px',
        maxHeight: '220px',
        overflowY: 'auto',
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#e2e8f0',
        lineHeight: '1.5'
      }
    });
    rightCol.appendChild(logBox);

    stage.appendChild(rightCol);
    wrap.appendChild(stage);

    // Interactive State
    let pendingMenu = null;
    let logEntries = [];

    function addLog(key, action, result, isNum = false) {
      const ts = (performance.now() / 1000).toFixed(2);
      logEntries.unshift({ ts, key, action, result, isNum });
      if (logEntries.length > 20) logEntries.length = 20;

      logBox.innerHTML = '';
      logEntries.forEach(item => {
        logBox.appendChild(makeElement('div', { style: { borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '2px 0' } }, [
          makeElement('span', { style: { color: '#64748b', marginRight: '6px' } }, item.ts),
          makeElement('span', { style: { color: item.isNum ? '#f59e0b' : '#38bdf8', fontWeight: 'bold' } }, `[${item.key}]`),
          makeElement('span', { style: { color: '#94a3b8', margin: '0 6px' } }, '➔'),
          makeElement('span', { style: { color: item.result ? '#10b981' : '#e2e8f0' } }, item.result || item.action)
        ]));
      });
    }

    function processKey(keyStr) {
      const upper = keyStr.toUpperCase();

      // Clear popup simulator
      popupSimulator.innerHTML = '';

      if (pendingMenu) {
        // Second level execution
        const parentKey = pendingMenu;
        pendingMenu = null;

        if (parentKey === 'V') {
          if (upper === 'O') {
            addLog(`${parentKey}${upper}`, 'View -> Oscillate', 'Toggled Motion Parallax Oscillation');
            renderPopup(`${parentKey} VIEW`, 'O OSCILLATE', 'Camera Orbit Animator Active');
            return;
          } else if (upper === 'C') {
            addLog(`${parentKey}${upper}`, 'View -> Center', 'Animated View Center to Point');
            renderPopup(`${parentKey} VIEW`, 'C CENTER', 'Target Re-centered');
            return;
          }
        } else if (parentKey === 'C') {
          if (upper === 'R') {
            addLog(`${parentKey}${upper}`, 'Command -> Rectangle', 'Switched Tool: Rectangle');
            renderPopup(`${parentKey} CMD`, 'R RECTANGLE', 'Tool Activated');
            return;
          } else if (upper === 'L') {
            addLog(`${parentKey}${upper}`, 'Command -> Line', 'Switched Tool: SmartLine');
            renderPopup(`${parentKey} CMD`, 'L LINE', 'SmartLine Activated');
            return;
          }
        } else if (parentKey === 'S') {
          // Number Range evaluation: S + [0-9]
          if (/^[0-9]$/.test(upper)) {
            const digit = parseInt(upper);
            const scale = Math.round(1.5 * Math.pow(300 / 1.5, digit / 9));
            addLog(`S${digit}`, `accudraw size #${digit}`, `Compass Size scaled to ${scale}px`, true);
            renderPopup(`S SIZE`, `#${digit}`, `Scale Factor: ${scale}px`);
            return;
          }
        }
      }

      // First Level Commands
      if (upper === 'T') {
        addLog('T', 'top plane', 'Orientation: TOP [Z=Up]');
        renderPopup('T TOP', null, 'Drawing Plane: Top (Horizontal)');
      } else if (upper === 'F') {
        addLog('F', 'front plane', 'Orientation: FRONT [Z=Out]');
        renderPopup('F FRONT', null, 'Drawing Plane: Front');
      } else if (upper === 'S') {
        // If typed standalone, open Sub-menu for size range or side view
        pendingMenu = 'S';
        addLog('S', 'size/side menu', 'Awaiting digit #0-9 or second key...');
        renderPopup('S SIZE/SIDE', 'Type [0-9] for size or [S] for Side', 'Menu Pending');
      } else if (upper === 'V') {
        pendingMenu = 'V';
        addLog('V', 'view menu', 'Awaiting second stroke [C=Center, O=Oscillate]...');
        renderPopup('V VIEW MENU', '[C] Center  [O] Oscillate  [P] Plane', 'Menu Pending');
      } else if (upper === 'C') {
        pendingMenu = 'C';
        addLog('C', 'command menu', 'Awaiting tool stroke [R=Rect, L=Line, S=Scale]...');
        renderPopup('C COMMAND', '[R] Rect  [L] Line  [S] Scale', 'Menu Pending');
      } else if (upper === 'L') {
        addLog('L', 'smart lock', 'SmartLock Engaged (Locked nearest axis)');
        renderPopup('L SMARTLOCK', null, 'Axis Constraint Engaged');
      } else if (upper === 'SPACE') {
        addLog('Space', 'mode toggle', 'Toggled Squircle (Rectangular ↔ Polar ↔ Mixed)');
        renderPopup('SPACE', null, 'Compass Mode Switched');
      } else if (upper === 'O') {
        addLog('O', 'set origin', 'Kinetic Origin Relocated to Cursor');
        renderPopup('O ORIGIN', null, 'Floating Origin Anchored');
      } else if (/^[0-9]$/.test(upper)) {
        addLog(upper, `direct digit`, `Parameter / Distance Input Buffer: ${upper}`, true);
        renderPopup(`DIGIT ${upper}`, null, `Direct Numerical Inset: ${upper}`);
      } else {
        addLog(upper, 'unbound key', 'No binding mapped');
      }
    }

    function renderPopup(topText, subText, followup) {
      popupSimulator.innerHTML = '';
      const topBox = makeElement('div', {
        style: {
          background: 'rgba(255, 235, 0, 0.95)', color: '#000',
          padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)', fontFamily: 'monospace'
        }
      }, topText);
      popupSimulator.appendChild(topBox);

      if (subText) {
        const subBox = makeElement('div', {
          style: {
            background: 'rgba(0, 246, 0, 0.95)', color: '#000',
            padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)', fontFamily: 'monospace'
          }
        }, subText);
        popupSimulator.appendChild(subBox);
      }

      if (followup) {
        const followBox = makeElement('div', {
          style: {
            background: 'rgba(190, 0, 255, 0.95)', color: '#fff',
            padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)', fontFamily: 'monospace'
          }
        }, followup);
        popupSimulator.appendChild(followBox);
      }
    }

    // Keyboard capture on wrap
    wrap.addEventListener('keydown', (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      e.stopPropagation();

      const key = e.key === ' ' ? 'Space' : e.key;
      processKey(key);
    });

    container.appendChild(wrap);
    addLog('Init', 'KeyCommandEngine Ready', 'Listening for single keystrokes without Enter...');
  }
}

globalThis.KeyCommandInteractiveLab = KeyCommandInteractiveLab;
if (typeof module !== 'undefined' && module.exports) module.exports = KeyCommandInteractiveLab;