class CadIsolatedCompass3DComponent {

  static async render(container) {
        container.innerHTML = '';

        let isFullscreen = false;
        let isShowPlaying = false;
        let showRafId = null;
        let showStartTime = 0;
        let currentSkin = 'default';
        let soundEnabled = true;
        let currentSquircleT = 0.5;
        let btnShow = null;
        let btnExpand = null;
        let morphSlider = null;
        let morphLabel = null;
        let app = null;
        let instId = null;
        let ghostBoxSystem = null;
        let showGhostBox = true;
        let lastCameraAngle = 0;

        const wrap = makeElement('div', {
          style: {
            background: '#070a13',
            border: '1.5px solid #21262d',
            borderRadius: '12px',
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

        const header = makeElement('div', {
          style: {
            padding: '10px 16px',
            background: 'rgba(15, 23, 42, 0.95)',
            borderBottom: '1.5px solid #21262d',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            zIndex: 10
          }
        }, [
          makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' } }, [
            makeElement('span', { style: { fontSize: '15px' } }, '🧭'),
            makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'accuCad 3D Compass Studio: The Spec As Software'),
            makeElement('span', { id: 'compass-show-status', style: { fontSize: '10px', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, 'Interactive 3D Viewport')
          ]),
          makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
            btnShow = makeElement('button', {
              className: 'dr-nav-btn primary',
              style: { padding: '4px 10px', fontSize: '10.5px', fontWeight: '800' },
              onclick: () => toggleShowMode()
            }, '🎭 Start Compass Show'),
            btnExpand = makeElement('button', {
              className: 'dr-nav-btn',
              style: { padding: '4px 8px', fontSize: '10px', color: '#38bdf8', borderColor: '#38bdf866' },
              onclick: toggleExpand
            }, '⛶ Fullscreen')
          ])
        ]);
        wrap.appendChild(header);

        const canvasMount = makeElement('div', {
          id: 'accucad-mount-isolated-compass',
          style: { width: '100%', height: '440px', minHeight: '380px', position: 'relative', background: '#050811' }
        });
        wrap.appendChild(canvasMount);

        // External Decorator Switcher
        const skinBar = makeElement('div', {
          style: {
            padding: '8px 14px', background: '#090d16', borderTop: '1px solid #1e293b',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '8px', fontSize: '11px', fontFamily: 'monospace', zIndex: 10
          }
        }, [
          makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } }, [
            makeElement('span', { style: { color: '#00f2fe', fontWeight: 'bold' } }, 'Decorators:'),
            makeElement('button', { className: 'dr-tab-btn active', id: 'btn-skin-default', onclick: () => setSkin('default') }, 'Lean Core'),
            makeElement('button', { className: 'dr-tab-btn', id: 'btn-skin-steampunk', style: { color: '#d4af37' }, onclick: () => setSkin('steampunk') }, '⚙️ Steampunk Flywheels'),
            makeElement('button', { className: 'dr-tab-btn', id: 'btn-skin-artnouveau', style: { color: '#86efac' }, onclick: () => setSkin('artnouveau') }, '🌿 Art Nouveau'),
            makeElement('button', { className: 'dr-tab-btn', id: 'btn-skin-cyberpunk', style: { color: '#ff007f' }, onclick: () => setSkin('cyberpunk') }, '⚡ Cyber Bloom')
          ]),
          makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
            makeElement('button', {
              className: 'dr-nav-btn',
              id: 'btn-toggle-ghost-box',
              style: { padding: '3px 8px', fontSize: '10px', color: '#10b981', borderColor: '#10b98166' },
              onclick: () => toggleGhostBox()
            }, '📦 Ghost Box: ON'),
            makeElement('button', {
              className: 'dr-nav-btn',
              id: 'btn-toggle-sound',
              style: { padding: '3px 8px', fontSize: '10px', color: soundEnabled ? '#38bdf8' : '#64748b' },
              onclick: () => toggleSound()
            }, soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF')
          ])
        ]);
        wrap.appendChild(skinBar);

        // Plane & Squircle Morph Strip
        const quickToolbar = makeElement('div', {
          style: {
            padding: '8px 14px', background: '#0d1117', borderTop: '1px solid #161e2b',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '10px', fontSize: '11px', fontFamily: 'monospace', zIndex: 10
          }
        }, [
          makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } }, [
            makeElement('span', { style: { color: '#94a3b8', fontWeight: 'bold' } }, 'Plane:'),
            makeElement('button', { className: 'dr-nav-btn primary', onclick: () => { pauseShow(); app?.baseController?.setDrawingPlane('top'); onAction('top'); } }, '[T] Top'),
            makeElement('button', { className: 'dr-nav-btn', onclick: () => { pauseShow(); app?.baseController?.setDrawingPlane('front'); onAction('front'); } }, '[F] Front'),
            makeElement('button', { className: 'dr-nav-btn', onclick: () => { pauseShow(); app?.baseController?.setDrawingPlane('side'); onAction('side'); } }, '[S] Side'),
            makeElement('button', { className: 'dr-nav-btn', onclick: () => { pauseShow(); app?.baseController?.setDrawingPlane('view'); onAction('view'); } }, '[V] View'),
            makeElement('button', {
              className: 'dr-nav-btn', id: 'btn-compass-space-toggle',
              style: { color: '#f59e0b', borderColor: '#f59e0b66', fontWeight: 'bold' },
              onclick: () => toggleSpaceMorph()
            }, '[Space] Morph Mode')
          ]),
          makeElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } }, [
            makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px', color: '#00f2fe' } }, [
              'Squircle (t): ',
              morphSlider = makeElement('input', {
                type: 'range', min: '0', max: '1', step: '0.02', value: '0.5',
                style: { width: '80px', accentColor: '#00f2fe', cursor: 'pointer' },
                oninput: (e) => {
                  pauseShow();
                  currentSquircleT = parseFloat(e.target.value);
                  morphLabel.textContent = currentSquircleT.toFixed(2);
                  if (app?.baseController?.accuDraw) {
                    app.baseController.accuDraw.setSquircleAnimated(currentSquircleT, 0.1);
                  }
                }
              }),
              morphLabel = makeElement('span', { style: { width: '30px', fontWeight: 'bold' } }, '0.50')
            ]),
            makeElement('button', {
              className: 'dr-nav-btn',
              id: 'btn-toggle-telemetry-drawer',
              style: { padding: '2px 8px', fontSize: '10px', color: '#10b981', borderColor: '#10b98166' },
              onclick: () => toggleTelemetryDrawer()
            }, '📐 3D Cosines ▾')
          ])
        ]);
        wrap.appendChild(quickToolbar);

        // Telemetry Drawer
        const telemetryDrawer = makeElement('div', {
          id: 'compass-telemetry-drawer',
          style: {
            background: '#090d16', borderTop: '1px solid #232d3f', padding: '12px 16px',
            display: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px',
            fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.5'
          }
        }, [
          makeElement('div', { id: 'tel-basis-x', style: { background: '#050811', border: '1px solid #ef444455', padding: '8px', borderRadius: '6px', color: '#ef4444' } }, 'X Axis (Red): [1.00, 0.00, 0.00]'),
          makeElement('div', { id: 'tel-basis-y', style: { background: '#050811', border: '1px solid #10b98155', padding: '8px', borderRadius: '6px', color: '#10b981' } }, 'Y Axis (Green): [0.00, 0.00, -1.00]'),
          makeElement('div', { id: 'tel-basis-z', style: { background: '#050811', border: '1px solid #0080ff55', padding: '8px', borderRadius: '6px', color: '#0080ff', fontWeight: 'bold' } }, 'Z Axis (Rich Blue): [0.00, 1.00, 0.00]'),
          makeElement('div', { id: 'tel-origin', style: { background: '#050811', border: '1px solid #38bdf855', padding: '8px', borderRadius: '6px', color: '#f8fafc' } }, 'Origin: [0.00, 0.00, 0.00]')
        ]);
        wrap.appendChild(telemetryDrawer);
        container.appendChild(wrap);

        const boot = async () => {
          const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
          if (isLoaded && globalThis.Main) {
            app = new globalThis.Main();
            await app.run({
              container: canvasMount,
              showSidePanel: false,
              showCompassUi: false,
              cameraPos: { x: 0, y: 1.6, z: 2.8 },
              target: [0, 0, 0],
              compassSize: 1.0,
              squircle: 0.5,
              background: 0x050811,
              initialPlane: 'top'
            });
            instId = CadStudioDemoComponent.registerInstance(app, canvasMount, 'Isolated Compass View');

            setupZTickMark(app.baseController?.accuDraw);

            if (app.threeDView?.scene) {
              ghostBoxSystem = CompassSkinAddons.createGhostBox(app.threeDView.scene, app.THREE);
              ghostBoxSystem.update(new app.THREE.Vector3(0, 0, 0), new app.THREE.Vector3(0.8, 0.5, 0.6));
            }

            if (app.threeDView?.camera) {
              const cam = app.threeDView.camera;
              lastCameraAngle = Math.atan2(cam.position.x, cam.position.z);
            }

            if (app.threeLoader) {
              const originalUpdate = app.threeLoader.onUpdateCallback;
              app.threeLoader.onUpdateCallback = () => {
                if (originalUpdate) originalUpdate();

                if (app.threeDView?.camera && app.baseController?.accuDraw?.addFlywheelTorque) {
                  const cam = app.threeDView.camera;
                  const currentAngle = Math.atan2(cam.position.x, cam.position.z);
                  let delta = currentAngle - lastCameraAngle;
                  if (delta > Math.PI) delta -= Math.PI * 2;
                  if (delta < -Math.PI) delta += Math.PI * 2;

                  if (Math.abs(delta) > 0.002) {
                    app.baseController.accuDraw.addFlywheelTorque(delta * 1.8);
                  }
                  lastCameraAngle = currentAngle;
                }

                if (app.baseController?.accuDraw?._decoratorAnimationTick) {
                  app.baseController.accuDraw._decoratorAnimationTick(0.016);
                }
              };
            }

            updateTelemetry();
          }
        };

        boot();

        function setupZTickMark(accuDraw) {
          if (!accuDraw || !accuDraw.compassGroup) return;
          const THREE = globalThis.THREE || window.THREE;
          if (!THREE) return;

          if (accuDraw.zTick) {
            accuDraw.compassGroup.remove(accuDraw.zTick);
          }

          const richBlueMat = new THREE.MeshPhysicalMaterial({
            color: 0x0080ff,
            emissive: 0x0040aa,
            emissiveIntensity: 0.6,
            metalness: 0.15,
            roughness: 0.18,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05
          });

          const zTickGeo = new THREE.CylinderGeometry(0.026, 0.026, 0.32, 16);
          zTickGeo.rotateX(Math.PI / 2);
          const zTickMesh = new THREE.Mesh(zTickGeo, richBlueMat);
          zTickMesh.name = 'accudraw_z_tick';
          accuDraw.compassGroup.add(zTickMesh);
          accuDraw.zTick = zTickMesh;

          const capGeo = new THREE.ConeGeometry(0.045, 0.09, 16);
          capGeo.rotateX(Math.PI / 2);
          const capMesh = new THREE.Mesh(capGeo, richBlueMat);
          capMesh.position.z = 0.18;
          accuDraw.zTick.add(capMesh);
        }

        function setSkin(skinName) {
          currentSkin = skinName;
          document.querySelectorAll('#btn-skin-default, #btn-skin-steampunk, #btn-skin-artnouveau, #btn-skin-cyberpunk').forEach(b => b.classList.remove('active'));
          const activeBtn = document.getElementById(`btn-skin-${skinName}`);
          if (activeBtn) activeBtn.classList.add('active');

          if (app?.baseController?.accuDraw) {
            CompassSkinAddons.attachDecorator(app.baseController.accuDraw, skinName);
          }

          if (app?.threeLoader) {
            if (skinName === 'cyberpunk') {
              app.threeLoader.setBloom(true);
            } else {
              app.threeLoader.setBloom(false);
            }
          }

          if (soundEnabled) {
            CompassSkinAddons.playSnapPop(skinName === 'steampunk' ? 320 : 640, 0.05);
          }
        }

        function toggleSpaceMorph() {
          pauseShow();
          currentSquircleT = currentSquircleT >= 0.8 ? 0.2 : (currentSquircleT < 0.4 ? 0.5 : 1.0);
          morphSlider.value = currentSquircleT.toString();
          morphLabel.textContent = currentSquircleT.toFixed(2);
          if (app?.baseController?.accuDraw) {
            app.baseController.accuDraw.setSquircleAnimated(currentSquircleT, 0.25);
          }
          if (soundEnabled) CompassSkinAddons.playSnapPop(520, 0.03);
        }

        function toggleGhostBox() {
          showGhostBox = !showGhostBox;
          if (ghostBoxSystem) ghostBoxSystem.setVisible(showGhostBox);
          const btn = document.getElementById('btn-toggle-ghost-box');
          if (btn) {
            btn.textContent = `📦 Ghost Box: ${showGhostBox ? 'ON' : 'OFF'}`;
            btn.style.color = showGhostBox ? '#10b981' : '#94a3b8';
          }
        }

        function toggleSound() {
          soundEnabled = !soundEnabled;
          const btn = document.getElementById('btn-toggle-sound');
          if (btn) {
            btn.textContent = soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
            btn.style.color = soundEnabled ? '#38bdf8' : '#64748b';
          }
        }

        function onAction(plane) {
          if (soundEnabled) CompassSkinAddons.playSnapPop(480, 0.04);
          updateTelemetry();
        }

        function toggleTelemetryDrawer() {
          const isHidden = telemetryDrawer.style.display === 'none';
          telemetryDrawer.style.display = isHidden ? 'grid' : 'none';
          const btn = document.getElementById('btn-toggle-telemetry-drawer');
          if (btn) btn.textContent = isHidden ? '📐 3D Cosines ▴' : '📐 3D Cosines ▾';
          updateTelemetry();
        }

        function updateTelemetry() {
          if (!app?.baseController) return;
          const rm = app.baseController.rotationMatrix || [ [1,0,0], [0,1,0], [0,0,1] ];
          const o = app.baseController.origin || [0,0,0];

          const elX = document.getElementById('tel-basis-x');
          const elY = document.getElementById('tel-basis-y');
          const elZ = document.getElementById('tel-basis-z');
          const elO = document.getElementById('tel-origin');

          if (elX) elX.textContent = `X Axis (Red): [${rm[0].map(n => n.toFixed(2)).join(', ')}]`;
          if (elY) elY.textContent = `Y Axis (Green): [${rm[1].map(n => n.toFixed(2)).join(', ')}]`;
          if (elZ) elZ.textContent = `Z Axis (Rich Blue): [${rm[2].map(n => n.toFixed(2)).join(', ')}]`;
          if (elO) elO.textContent = `Origin: [${o.map(n => n.toFixed(2)).join(', ')}]`;
        }

        function toggleShowMode() {
          isShowPlaying = !isShowPlaying;
          if (isShowPlaying) {
            btnShow.textContent = '⏸ Pause Show';
            btnShow.style.background = '#f59e0b';
            btnShow.style.color = '#000';
            const status = document.getElementById('compass-show-status');
            if (status) status.textContent = '🎭 Autonomous 3D Tour Playing';
            startShowChoreography();
          } else {
            pauseShow();
          }
        }

        function pauseShow() {
          isShowPlaying = false;
          if (showRafId) cancelAnimationFrame(showRafId);
          showRafId = null;
          if (btnShow) {
            btnShow.textContent = '🎭 Start Compass Show';
            btnShow.style.background = '';
            btnShow.style.color = '';
          }
          const status = document.getElementById('compass-show-status');
          if (status) status.textContent = 'Interactive 3D Viewport';
        }

        function startShowChoreography() {
          showStartTime = performance.now();
          let lastStep = -1;

          const step = (now) => {
            if (!isShowPlaying || !app?.baseController?.accuDraw) return;

            const elapsed = (now - showStartTime) / 1000;
            const phase = Math.floor(elapsed / 3.0) % 6;

            if (phase !== lastStep) {
              lastStep = phase;
              const THREE = globalThis.THREE || window.THREE;
              if (phase === 0) {
                app.baseController.setDrawingPlane('top');
                setSkin('default');
                if (ghostBoxSystem) ghostBoxSystem.update(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.6, 0.4, 0.3));
              } else if (phase === 1) {
                app.baseController.setDrawingPlane('front');
                setSkin('steampunk');
                if (ghostBoxSystem) ghostBoxSystem.update(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.8, 0.6, -0.4));
              } else if (phase === 2) {
                app.baseController.setDrawingPlane('side');
                setSkin('artnouveau');
                if (ghostBoxSystem) ghostBoxSystem.update(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-0.5, 0.7, 0.5));
              } else if (phase === 3) {
                app.baseController.setDrawingPlane('top');
                setSkin('cyberpunk');
                if (ghostBoxSystem) ghostBoxSystem.update(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.9, -0.4, 0.8));
              } else if (phase === 4) {
                app.baseController.setDrawingPlane('view');
              }
              updateTelemetry();
            }

            showRafId = requestAnimationFrame(step);
          };

          showRafId = requestAnimationFrame(step);
        }

        canvasMount.addEventListener('pointermove', (e) => {
          if (isShowPlaying || !ghostBoxSystem || !app?.threeDView?.camera) return;
          const rect = canvasMount.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

          const THREE = globalThis.THREE || window.THREE;
          const targetP1 = new THREE.Vector3(x * 1.4, y * 1.1, (x + y) * 0.45);
          ghostBoxSystem.update(new THREE.Vector3(0, 0, 0), targetP1);
        });

        canvasMount.addEventListener('pointerdown', () => pauseShow());

        const observer = new MutationObserver(() => {
          if (!document.body.contains(wrap)) {
            pauseShow();
            if (instId) CadStudioDemoComponent.unregisterInstance(instId);
            if (ghostBoxSystem) ghostBoxSystem.destroy();
            if (app && typeof app.destroy === 'function') app.destroy();
            observer.disconnect();
          }
        });
        observer.observe(wrap.parentNode || document.body, { childList: true });
    }
}

globalThis.CadIsolatedCompass3DComponent = CadIsolatedCompass3DComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadIsolatedCompass3DComponent;