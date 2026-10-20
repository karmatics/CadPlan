class TentativeSnappingLab {

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
          position: 'relative',
          outline: 'none'
        },
        tabIndex: 0
      });

      // 1. Header Toolbar
      const topBar = makeElement('div', {
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
          makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'accuCad [Sub-View: Snapping & Tentative Kinematics]'),
          makeElement('span', { id: 'snap-chord-badge', style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, '○ Free Cursor')
        ]),
        makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
          makeElement('button', {
            className: 'dr-nav-btn primary',
            style: { padding: '3px 8px', fontSize: '10px' },
            onclick: () => triggerSimulatedChord()
          }, '⚡ 50ms Chord Snap'),
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '3px 8px', fontSize: '10px', color: '#ef4444' },
            onclick: () => clearSnap()
          }, 'Clear Snap')
        ])
      ]);
      wrap.appendChild(topBar);

      // 2. Stage Grid
      const stageGrid = makeElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.35fr) minmax(280px, 1fr)',
          flex: 1,
          minHeight: '560px',
          background: '#21262d',
          gap: '1px'
        }
      });

      const canvasMount = makeElement('div', {
        id: 'accucad-mount-snapping-gym',
        style: { width: '100%', height: '100%', minHeight: '560px', position: 'relative', background: '#050811' }
      });
      stageGrid.appendChild(canvasMount);

      // Right Column: Live Parameters & Mathematical Inspection
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

      // Interactive Tuning Deck (directly adjusting app.baseController in real time)
      const controlsCard = makeElement('div', {
        style: {
          background: '#070a13', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px',
          display: 'flex', flexDirection: 'column', gap: '8px'
        }
      }, [
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          makeElement('strong', { style: { color: '#00f2fe' } }, 'LIVE SNAPPING CONTROLS'),
          makeElement('span', { style: { color: '#64748b', fontSize: '10px' } }, 'Direct BaseController Link')
        ]),
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          makeElement('span', {}, 'Chord Window:'),
          makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px' } }, [
            makeElement('input', {
              type: 'range', min: '20', max: '150', value: '50',
              style: { width: '80px', accentColor: '#00f2fe' },
              oninput: (e) => {
                if (app?.baseController) {
                  app.baseController.chordThreshold = parseInt(e.target.value);
                  chordVal.textContent = `${e.target.value}ms`;
                }
              }
            }),
            chordVal = makeElement('span', { style: { color: '#00f2fe', width: '36px' } }, '50ms')
          ])
        ]),
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          makeElement('span', {}, 'Snap Aperture:'),
          makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px' } }, [
            makeElement('input', {
              type: 'range', min: '5', max: '35', value: '14',
              style: { width: '80px', accentColor: '#10b981' },
              oninput: (e) => {
                snapApertureVal = parseInt(e.target.value);
                apertureVal.textContent = `${e.target.value}px`;
              }
            }),
            apertureVal = makeElement('span', { style: { color: '#10b981', width: '36px' } }, '14px')
          ])
        ]),
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          makeElement('span', {}, 'Z-Plane Lock:'),
          makeElement('button', {
            className: 'dr-nav-btn',
            id: 'btn-toggle-zlock',
            style: { padding: '2px 8px', fontSize: '10px' },
            onclick: () => toggleZLock()
          }, 'Z-Lock: OFF')
        ]),
        makeElement('div', {
          id: 'snap-coords-readout',
          style: {
            marginTop: '4px', padding: '6px', background: 'rgba(0, 242, 254, 0.08)',
            border: '1px solid rgba(0, 242, 254, 0.25)', borderRadius: '4px', color: '#00f2fe',
            fontSize: '11px'
          }
        }, 'Snapped Vertex: None')
      ]);
      rightCol.appendChild(controlsCard);

      // Live Math Inspection Box
      const codeBox = makeElement('div', {
        style: {
          flex: 1, minHeight: '200px', background: '#070a13', border: '1px solid #1e293b',
          borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px'
        }
      }, [
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          makeElement('strong', { style: { color: '#10b981' } }, '🦀 Model-Space Projection Math'),
          makeElement('span', { style: { color: '#64748b', fontSize: '10px' } }, 'Zero Viewport Skew')
        ]),
        makeElement('pre', {
          style: {
            flex: 1, margin: 0, padding: '8px', background: '#050811', border: '1px solid #161e2b',
            borderRadius: '4px', color: '#7ee787', fontSize: '10.5px', lineHeight: '1.45',
            overflowY: 'auto', whiteSpace: 'pre'
          }
        }, `// Perpendicular Projection onto Active Drawing Plane:
  // Ignores camera view angles, preserving true 3D planar alignment
  const toPoint = [
    point[0] - planeOrigin[0],
    point[1] - planeOrigin[1],
    point[2] - planeOrigin[2],
  ];
  const dist = toPoint[0]*normal[0] + toPoint[1]*normal[1] + toPoint[2]*normal[2];

  const projectedPoint = [
    point[0] - dist * normal[0],
    point[1] - dist * normal[1],
    point[2] - dist * normal[2],
  ];`)
      ]);
      rightCol.appendChild(codeBox);

      stageGrid.appendChild(rightCol);
      wrap.appendChild(stageGrid);
      container.appendChild(wrap);

      let app = null;
      let instId = null;
      let chordVal, apertureVal;
      let snapApertureVal = 14;

      const boot = async () => {
        if (typeof CadStudioDemoComponent !== 'undefined') {
          await CadStudioDemoComponent.ensureAccuCadLoaded();
        }

        if (globalThis.Main) {
          app = new globalThis.Main();
          await app.run({
            container: canvasMount,
            showSidePanel: false,
            showCompassUi: false,
            presetGeometry: 'bracket',
            cameraPos: { x: 3.8, y: 3.2, z: 4.8 },
            target: [0, 0, 0],
            background: 0x050811,
            initialPlane: 'top'
          });

          if (typeof CadStudioDemoComponent !== 'undefined') {
            instId = CadStudioDemoComponent.registerInstance(app, canvasMount, 'Snapping Lab');
          }
        }
      };

      boot();

      function toggleZLock() {
        if (!app?.baseController) return;
        app.baseController.zPlaneLocked = !app.baseController.zPlaneLocked;
        const btn = document.getElementById('btn-toggle-zlock');
        if (btn) {
          btn.textContent = `Z-Lock: ${app.baseController.zPlaneLocked ? 'ON' : 'OFF'}`;
          btn.style.color = app.baseController.zPlaneLocked ? '#00f2fe' : '#94a3b8';
          btn.style.borderColor = app.baseController.zPlaneLocked ? '#00f2fe' : '#21262d';
        }
        app.baseController.refreshMousePosition();
      }

      function triggerSimulatedChord() {
        if (!app?.baseController) return;
        const fakeEvent = {
          clientX: canvasMount.getBoundingClientRect().left + canvasMount.clientWidth * 0.45,
          clientY: canvasMount.getBoundingClientRect().top + canvasMount.clientHeight * 0.45,
          button: 0,
          preventDefault: () => {}
        };
        TentativePointHandler.handleTentativePoint(app.baseController, fakeEvent);
        updateTelemetry();
      }

      function clearSnap() {
        if (!app?.baseController) return;
        TentativePointHandler._clearTentativePoint(app.baseController);
        updateTelemetry();
      }

      function updateTelemetry() {
        const badge = document.getElementById('snap-chord-badge');
        const coords = document.getElementById('snap-coords-readout');
        if (!app?.baseController || !coords) return;

        if (app.baseController._tentativeOriginalPoint) {
          const pt = app.baseController._tentativeOriginalPoint;
          if (badge) {
            badge.textContent = '● Latched (Chord Snap)';
            badge.style.color = '#00f2fe';
            badge.style.background = 'rgba(0, 242, 254, 0.15)';
          }
          coords.textContent = `Snapped Vertex: [${pt.map(n => n.toFixed(3)).join(', ')}]`;
          coords.style.borderColor = '#00f2fe';
        } else {
          if (badge) {
            badge.textContent = '○ Free Cursor';
            badge.style.color = '#64748b';
            badge.style.background = 'rgba(255, 255, 255, 0.05)';
          }
          coords.textContent = 'Snapped Vertex: None (Hold Ctrl / Chord Click to Latch)';
          coords.style.borderColor = 'rgba(0, 242, 254, 0.25)';
        }
      }

      canvasMount.addEventListener('pointerup', () => {
        setTimeout(updateTelemetry, 40);
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

globalThis.TentativeSnappingLab = TentativeSnappingLab;
if (typeof module !== 'undefined' && module.exports) module.exports = TentativeSnappingLab;