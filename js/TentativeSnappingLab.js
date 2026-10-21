class TentativeSnappingLab {

  static async render(container) {
      container.innerHTML = '';

      let isFullscreen = false;
      let btnExpand = null;
      let chordVal = null;
      let apertureVal = null;
      let snapApertureVal = 14;
      let scriptBox = null;
      let scriptStatus = null;
      let app = null;
      let instId = null;

      const wrap = makeElement('div', {
        style: {
          width: '100%',
          minHeight: '640px',
          background: '#070a13',
          borderRadius: '12px',
          border: '1.5px solid #21262d',
          overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }
      });

      const toggleExpand = () => {
        isFullscreen = !isFullscreen;
        if (isFullscreen) {
          wrap.style.position = 'fixed';
          wrap.style.top = '0';
          wrap.style.left = '0';
          wrap.style.width = '100vw';
          wrap.style.height = '100vh';
          wrap.style.zIndex = '999999';
          btnExpand.textContent = '✕ Exit Fullscreen';
          btnExpand.style.color = '#ef4444';
          btnExpand.style.borderColor = '#ef444466';
        } else {
          wrap.style.position = 'relative';
          wrap.style.top = 'auto';
          wrap.style.left = 'auto';
          wrap.style.width = '100%';
          wrap.style.height = 'auto';
          wrap.style.minHeight = '640px';
          wrap.style.zIndex = 'auto';
          btnExpand.textContent = '⛶ Fullscreen';
          btnExpand.style.color = '#38bdf8';
          btnExpand.style.borderColor = '#38bdf866';
        }
        setTimeout(() => {
          if (app?.app?.resize) {
            const r = canvasMount.getBoundingClientRect();
            app.app.resize(r.width, r.height);
          }
        }, 100);
      };

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
          }, 'Clear Snap'),
          btnExpand = makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '3px 8px', fontSize: '10px', color: '#38bdf8', borderColor: '#38bdf866' },
            onclick: toggleExpand
          }, '⛶ Fullscreen')
        ])
      ]);
      wrap.appendChild(topBar);

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

      const canvasMount = makeElement('div', {
        id: 'accucad-mount-snapping-gym',
        style: { width: '100%', height: '100%', minHeight: '480px', position: 'relative', background: '#050811' }
      });
      stageGrid.appendChild(canvasMount);

      const rightCol = makeElement('div', {
        style: {
          background: '#0a0e1a',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          fontFamily: 'monospace',
          fontSize: '11px',
          color: '#cbd5e1'
        }
      });

      const controlsCard = makeElement('div', {
        style: {
          background: '#070a13', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px',
          display: 'flex', flexDirection: 'column', gap: '8px'
        }
      }, [
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          makeElement('strong', { style: { color: '#00f2fe' } }, 'LIVE SNAPPING CONTROLS'),
          makeElement('span', { style: { color: '#64748b', fontSize: '10px' } }, 'BaseController Link')
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
          id: 'snap-projection-mode-badge',
          style: {
            fontSize: '10px', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)',
            padding: '3px 6px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)'
          }
        }, 'Projection: Camera Raycast (Free Float)'),
        makeElement('div', {
          id: 'snap-coords-readout',
          style: {
            padding: '6px', background: 'rgba(0, 242, 254, 0.08)',
            border: '1px solid rgba(0, 242, 254, 0.25)', borderRadius: '4px', color: '#00f2fe',
            fontSize: '11px'
          }
        }, 'Snapped Vertex: None')
      ]);
      rightCol.appendChild(controlsCard);

      const scriptCard = makeElement('div', {
        style: {
          flex: 1, minHeight: '160px', background: '#070a13', border: '1px solid #1e293b',
          borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px'
        }
      }, [
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          makeElement('strong', { style: { color: '#10b981' } }, '⚡ Live Snapping Script Runner:'),
          makeElement('button', {
            className: 'dr-nav-btn primary',
            style: { padding: '2px 8px', fontSize: '10px' },
            onclick: () => {
              if (app?.baseController) {
                const res = app.baseController.executeScript(scriptBox.value);
                if (res.success) {
                  scriptStatus.textContent = '✓ Executed successfully.';
                  scriptStatus.style.color = '#10b981';
                } else {
                  scriptStatus.textContent = `Error: ${res.error}`;
                  scriptStatus.style.color = '#ef4444';
                }
              }
            }
          }, '▶ Run Script')
        ]),
        scriptBox = makeElement('textarea', {
          style: {
            width: '100%', flex: 1, minHeight: '100px', background: '#050811', color: '#7ee787',
            border: '1px solid #1e293b', borderRadius: '4px', padding: '6px', fontSize: '10.5px', outline: 'none'
          },
          spellcheck: false
        }),
        scriptStatus = makeElement('div', { style: { color: '#64748b', fontSize: '10px' } }, 'Ready.')
      ]);
      scriptBox.value = `// Relocate origin to first snapped vertex and lock X-axis
  const bc = app.baseController;
  const snapped = bc._tentativeOriginalPoint || [-1.2, -0.8, 0];
  bc.setOrigin(snapped);
  bc.accuDrawLogic?.toggleLock('x');`;
      rightCol.appendChild(scriptCard);

      stageGrid.appendChild(rightCol);
      wrap.appendChild(stageGrid);
      container.appendChild(wrap);

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
        updateTelemetry();
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
        const projBadge = document.getElementById('snap-projection-mode-badge');
        if (!app?.baseController || !coords) return;

        const hasSnap = Boolean(app.baseController._tentativeOriginalPoint);
        const zLocked = Boolean(app.baseController.zPlaneLocked);

        if (projBadge) {
          if (zLocked) {
            if (hasSnap) {
              projBadge.textContent = 'Projection: 3D Perpendicular Normal Drop (Rob Brown Snap Invariant)';
              projBadge.style.color = '#00f2fe';
              projBadge.style.borderColor = '#00f2fe66';
            } else {
              projBadge.textContent = 'Projection: Line-of-Sight Camera Raycast (Free Float)';
              projBadge.style.color = '#10b981';
              projBadge.style.borderColor = '#10b98166';
            }
          } else {
            projBadge.textContent = 'Projection: Free 3D Spatial Trajectory (Z Unlocked)';
            projBadge.style.color = '#94a3b8';
            projBadge.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }
        }

        if (hasSnap) {
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