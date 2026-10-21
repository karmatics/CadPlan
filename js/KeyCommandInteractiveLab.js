class KeyCommandInteractiveLab {

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
          makeElement('span', { style: { fontSize: '15px' } }, '⌨️'),
          makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'KeyCommandEngine: Interactive 3D Dispatch Studio'),
          makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Live WebGL Connection')
        ]),
        makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' } }, 'Type keys or click pills — 3D viewport responds instantly without Enter')
      ]);
      wrap.appendChild(header);

      // 2. Main Visualizer Grid (Left: Keypad & Log, Right: Live 3D accuCad Viewport)
      const stage = makeElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 380px) 1fr',
          gap: '1px',
          background: '#21262d',
          minHeight: '440px'
        }
      });

      // Left Column: Command Tree & Interactive Key Pills
      const leftCol = makeElement('div', {
        style: {
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          background: '#090d16',
          maxHeight: '480px',
          overflowY: 'auto'
        }
      });

      const keySection = (title, keys) => {
        const box = makeElement('div', {
          style: {
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            padding: '8px 10px'
          }
        });
        box.appendChild(makeElement('div', {
          style: { fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '0.06em' }
        }, title));

        const row = makeElement('div', { style: { display: 'flex', gap: '5px', flexWrap: 'wrap' } });
        keys.forEach(k => {
          const btn = makeElement('button', {
            className: 'dr-nav-btn',
            style: {
              padding: '4px 8px', fontSize: '10.5px', fontFamily: 'monospace', fontWeight: 'bold',
              background: '#0f172a', borderColor: '#334155', color: '#f8fafc'
            },
            onclick: () => processKey(k.char)
          }, [
            makeElement('span', { style: { color: '#00f2fe' } }, k.char),
            makeElement('span', { style: { color: '#94a3b8', fontSize: '9px', marginLeft: '4px' } }, k.label)
          ]);
          row.appendChild(btn);
        });
        box.appendChild(row);
        return box;
      };

      leftCol.appendChild(keySection('1. 3D Construction Planes (Single-Stroke)', [
        { char: 'T', label: 'Top' },
        { char: 'F', label: 'Front' },
        { char: 'S', label: 'Side' },
        { char: 'V', label: 'View' }
      ]));

      leftCol.appendChild(keySection('2. Compass Constraints & Modes', [
        { char: 'Space', label: 'Toggle Mode' },
        { char: 'L', label: 'SmartLock' },
        { char: 'G', label: 'Origin [Home-Row]' },
        { char: 'X', label: 'Lock X' },
        { char: 'Y', label: 'Lock Y' }
      ]));

      leftCol.appendChild(keySection('3. Sub-Menus & Numerical Ranges', [
        { char: 'V', label: 'View Menu' },
        { char: 'C', label: 'Command Menu' },
        { char: '0', label: 'Scale 0' },
        { char: '5', label: 'Scale 5' },
        { char: '9', label: 'Scale 9' }
      ]));

      // Dispatch Monitor inside left column
      const monitorCard = makeElement('div', {
        style: {
          background: '#050811', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px',
          display: 'flex', flexDirection: 'column', gap: '6px'
        }
      });

      const popupSimulator = makeElement('div', {
        style: {
          minHeight: '38px', background: 'rgba(15, 23, 42, 0.4)', border: '1px dashed #21262d',
          borderRadius: '6px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
        }
      });
      monitorCard.appendChild(popupSimulator);

      const logBox = makeElement('div', {
        id: 'kch-log-stream',
        style: {
          minHeight: '80px', maxHeight: '110px', overflowY: 'auto', fontFamily: 'monospace',
          fontSize: '10.5px', color: '#e2e8f0', lineHeight: '1.4'
        }
      });
      monitorCard.appendChild(logBox);
      leftCol.appendChild(monitorCard);

      stage.appendChild(leftCol);

      // Right Column: Live 3D accuCad Canvas
      const canvasMount = makeElement('div', {
        id: 'accucad-mount-kch-live-3d',
        style: { width: '100%', height: '100%', minHeight: '440px', position: 'relative', background: '#050811' }
      });
      stage.appendChild(canvasMount);

      wrap.appendChild(stage);
      container.appendChild(wrap);

      let app = null;
      let instId = null;
      let pendingMenu = null;
      const logEntries = [];

      // Boot live 3D accuCad instance
      (async () => {
        const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
        if (isLoaded && globalThis.Main) {
          app = new globalThis.Main();
          await app.run({
            container: canvasMount,
            showSidePanel: false,
            showCompassUi: false,
            presetGeometry: 'bracket',
            cameraPos: { x: 3.5, y: 3.0, z: 4.8 },
            target: [0, 0, 0],
            background: 0x050811,
            initialPlane: 'top'
          });

          instId = CadStudioDemoComponent.registerInstance(app, canvasMount, 'Key Command 3D Studio');
        }
      })();

      function addLog(key, action, result, isNum = false) {
        const ts = (performance.now() / 1000).toFixed(2);
        logEntries.unshift({ ts, key, action, result, isNum });
        if (logEntries.length > 15) logEntries.length = 15;

        logBox.innerHTML = '';
        logEntries.forEach(item => {
          logBox.appendChild(makeElement('div', { style: { borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '2px 0' } }, [
            makeElement('span', { style: { color: '#64748b', marginRight: '6px' } }, item.ts),
            makeElement('span', { style: { color: item.isNum ? '#f59e0b' : '#00f2fe', fontWeight: 'bold' } }, `[${item.key}]`),
            makeElement('span', { style: { color: '#94a3b8', margin: '0 4px' } }, '➔'),
            makeElement('span', { style: { color: item.result ? '#10b981' : '#e2e8f0' } }, item.result || item.action)
          ]));
        });
      }

      function processKey(keyStr) {
        const upper = keyStr.toUpperCase();
        const bc = app?.baseController;

        popupSimulator.innerHTML = '';

        if (pendingMenu) {
          const parentKey = pendingMenu;
          pendingMenu = null;

          if (parentKey === 'V') {
            if (upper === 'O') {
              addLog(`${parentKey}${upper}`, 'View -> Oscillate', 'Motion Parallax Toggled');
              renderPopup(`${parentKey} VIEW`, 'O OSCILLATE', 'Camera Orbit Animator Active');
              if (typeof CameraOrbitAnimator !== 'undefined') CameraOrbitAnimator.toggle();
              return;
            } else if (upper === 'C') {
              addLog(`${parentKey}${upper}`, 'View -> Center', 'Target Re-centered');
              renderPopup(`${parentKey} VIEW`, 'C CENTER', 'Camera Center Point');
              if (bc) TransformView.animateTransformToPoint([0, 0, 0], 0.3, app.threeDView);
              return;
            }
          } else if (parentKey === 'C') {
            if (upper === 'R') {
              addLog(`${parentKey}${upper}`, 'Command -> Rectangle', 'Rectangle Tool Active');
              renderPopup(`${parentKey} CMD`, 'R RECTANGLE', 'DrawRectangleCommand');
              if (bc) bc.setCommandByName('rectangle');
              return;
            } else if (upper === 'L') {
              addLog(`${parentKey}${upper}`, 'Command -> Spline', 'On-Curve Spline Tool Active');
              renderPopup(`${parentKey} CMD`, 'L SPLINE', 'DrawCurveCommand');
              if (bc) bc.setCommandByName('curve');
              return;
            }
          }
        }

        // First Level Commands directly driving 3D AccuDraw
        if (upper === 'T') {
          addLog('T', 'top plane', 'Drawing Plane: TOP [Z=Up]');
          renderPopup('T TOP', null, 'Orientation: Top (Horizontal)');
          if (bc) bc.setDrawingPlane('top');
        } else if (upper === 'F') {
          addLog('F', 'front plane', 'Drawing Plane: FRONT [Z=Out]');
          renderPopup('F FRONT', null, 'Orientation: Front (Vertical)');
          if (bc) bc.setDrawingPlane('front');
        } else if (upper === 'S') {
          pendingMenu = 'S';
          addLog('S', 'side plane', 'Drawing Plane: SIDE [Z=Right]');
          renderPopup('S SIDE', null, 'Orientation: Side (Lateral)');
          if (bc) bc.setDrawingPlane('side');
        } else if (upper === 'V') {
          pendingMenu = 'V';
          addLog('V', 'view menu', 'Awaiting second stroke [C=Center, O=Oscillate]...');
          renderPopup('V VIEW MENU', '[C] Center  [O] Oscillate', 'Menu Pending');
          if (bc) bc.setDrawingPlane('view');
        } else if (upper === 'C') {
          pendingMenu = 'C';
          addLog('C', 'command menu', 'Awaiting tool stroke [R=Rect, L=Spline]...');
          renderPopup('C COMMAND', '[R] Rect  [L] Spline', 'Menu Pending');
        } else if (upper === 'L') {
          addLog('L', 'smart lock', 'SmartLock Engaged (Clamped axis to 0)');
          renderPopup('L SMARTLOCK', null, 'Axis Constraint Locked');
          if (bc?.accuDrawLogic) bc.accuDrawLogic.handleSmartLock();
        } else if (upper === 'SPACE') {
          addLog('Space', 'mode toggle', 'Squircle Morphed (Rect ↔ Polar)');
          renderPopup('SPACE', null, 'Compass Mode Switched');
          if (bc?.accuDrawLogic) bc.accuDrawLogic.switchMode();
        } else if (upper === 'O' || upper === 'G') {
          addLog(upper, 'set origin', 'Floating Origin Relocated to Cursor');
          renderPopup(`${upper} ORIGIN`, null, 'Origin Anchored');
          if (bc) bc.setOrigin([0.4, 0.4, 0]);
        } else if (upper === 'X' || upper === 'Y') {
          addLog(upper, `lock ${upper}`, `Axis ${upper} Toggled`);
          renderPopup(upper, null, `Axis ${upper} Locked`);
          if (bc?.accuDrawLogic) bc.accuDrawLogic.toggleLock(upper.toLowerCase());
        } else if (/^[0-9]$/.test(upper)) {
          addLog(upper, 'direct digit', `Parameter Scale Factor: #${upper}`, true);
          renderPopup(`DIGIT ${upper}`, null, `Scale Exponent: #${upper}`);
          if (bc?.accuDraw) {
            const digit = parseInt(upper);
            const size = 0.4 + (digit / 9) * 0.8;
            bc.accuDraw.setSizeAnimated(size, 0.2);
          }
        } else {
          addLog(upper, 'unbound key', 'No binding mapped');
        }
      }

      function renderPopup(topText, subText, followup) {
        popupSimulator.innerHTML = '';
        const topBox = makeElement('div', {
          style: {
            background: 'rgba(255, 235, 0, 0.95)', color: '#000',
            padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '10.5px', fontFamily: 'monospace'
          }
        }, topText);
        popupSimulator.appendChild(topBox);

        if (subText) {
          popupSimulator.appendChild(makeElement('div', {
            style: {
              background: 'rgba(0, 246, 0, 0.95)', color: '#000',
              padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '10.5px', fontFamily: 'monospace'
            }
          }, subText));
        }

        if (followup) {
          popupSimulator.appendChild(makeElement('div', {
            style: {
              background: 'rgba(190, 0, 255, 0.95)', color: '#fff',
              padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '10.5px', fontFamily: 'monospace'
            }
          }, followup));
        }
      }

      wrap.addEventListener('keydown', (e) => {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        e.stopPropagation();
        const key = e.key === ' ' ? 'Space' : e.key;
        processKey(key);
      });

      const observer = new MutationObserver(() => {
        if (!document.body.contains(wrap)) {
          if (instId && typeof CadStudioDemoComponent !== 'undefined') {
            CadStudioDemoComponent.unregisterInstance(instId);
          }
          if (app && typeof app.destroy === 'function') {
            app.destroy();
          }
          observer.disconnect();
        }
      });
      observer.observe(wrap.parentNode || document.body, { childList: true });
    }
}

globalThis.KeyCommandInteractiveLab = KeyCommandInteractiveLab;
if (typeof module !== 'undefined' && module.exports) module.exports = KeyCommandInteractiveLab;