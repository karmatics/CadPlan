class CadModelStudioComponent {

  static async render(container) {
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
          makeElement('span', { style: { fontSize: '15px' } }, '📦'),
          makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, '3D Model Studio: PBR Materials & AccuDraw Face Snapping [Q]'),
          makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Surface Kinematics')
        ]),
        makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { fontSize: '11px', padding: '3px 8px', color: '#a855f7', borderColor: '#a855f766' },
            onclick: () => showModelCode()
          }, '📋 Pop-up LLM Code')
        ])
      ]);
      wrap.appendChild(header);

      // 2. Stage Grid (Viewport + Right Sidebar)
      const stage = makeElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) 290px',
          minHeight: '520px',
          background: '#090d16'
        }
      });

      const canvasMount = makeElement('div', {
        style: { width: '100%', height: '100%', minHeight: '520px', position: 'relative', overflow: 'hidden', cursor: 'crosshair' }
      });
      stage.appendChild(canvasMount);

      // Top Viewport Floating Hint
      const floatHint = makeElement('div', {
        style: {
          position: 'absolute', top: '12px', left: '14px', zIndex: '20',
          background: 'rgba(15, 23, 42, 0.92)', border: '1px solid #38bdf8',
          borderRadius: '20px', padding: '4px 14px', fontSize: '11px',
          fontFamily: 'monospace', color: '#e2e8f0', pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }
      }, 'Hover over 3D model • Tap [Q] to align compass flush to face • [T/F/S] Planes');
      canvasMount.appendChild(floatHint);

      // Right Sidebar Deck
      const sidebar = makeElement('div', {
        style: {
          background: '#0a0e1a', borderLeft: '1px solid #21262d', padding: '14px',
          display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto',
          fontFamily: 'monospace', fontSize: '11px', color: '#cbd5e1'
        }
      });

      // Model Selector & Upload
      const modelSection = makeElement('div', {
        style: { display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }
      }, [
        makeElement('strong', { style: { color: '#38bdf8', fontSize: '11px' } }, '1. MODEL PRESET & IMPORT:'),
        makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
          makeElement('select', {
            id: 'model-studio-preset-select',
            style: { flex: 1, background: '#070a13', color: '#f8fafc', border: '1px solid #30363d', borderRadius: '4px', padding: '4px', fontSize: '11px', outline: 'none' },
            onchange: (e) => loadPresetModel(e.target.value)
          }, [
            makeElement('option', { value: 'primitives' }, '📦 Geometric Primitives'),
            makeElement('option', { value: 'bracket' }, '🔩 Machined Bracket'),
            makeElement('option', { value: 'teacup' }, '☕ Utah Teacup Mesh')
          ]),
          makeElement('button', {
            className: 'dr-nav-btn primary',
            style: { padding: '3px 8px', fontSize: '10px' },
            onclick: () => fileInput.click()
          }, '📂 GLB')
        ])
      ]);
      sidebar.appendChild(modelSection);

      const fileInput = makeElement('input', {
        type: 'file', accept: '.glb,.gltf', style: { display: 'none' },
        onchange: (e) => {
          const file = e.target.files[0];
          if (file) handleCustomFileUpload(file);
        }
      });
      sidebar.appendChild(fileInput);

      // Active Surface Snapping Telemetry Card
      const snapSection = makeElement('div', {
        style: {
          background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '6px', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '4px'
        }
      }, [
        makeElement('strong', { style: { color: '#10b981', fontSize: '10px' } }, '🎯 SURFACE SNAPPING & NORMAL [Q]:'),
        makeElement('div', { id: 'studio-snap-coord' }, 'Point: None'),
        makeElement('div', { id: 'studio-snap-normal' }, 'Normal: None'),
        makeElement('div', { id: 'studio-snap-type', style: { color: '#f59e0b' } }, 'Status: Ready to latch'),
        makeElement('button', {
          className: 'dr-nav-btn primary',
          id: 'studio-btn-align-face',
          style: { marginTop: '4px', padding: '4px', fontSize: '10px', fontWeight: 'bold' },
          onclick: () => alignCompassToSurfaceNormal()
        }, '📐 Align Compass to Face [Q]')
      ]);
      sidebar.appendChild(snapSection);

      // Dimension Callouts Deck
      const dimSection = makeElement('div', {
        style: {
          background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '6px', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '4px'
        }
      }, [
        makeElement('strong', { style: { color: '#38bdf8', fontSize: '10px' } }, '📏 MODEL BOUNDS (DX / DY / DZ):'),
        makeElement('div', { id: 'studio-dim-dx' }, 'DX: 1.60 m'),
        makeElement('div', { id: 'studio-dim-dy' }, 'DY: 0.80 m'),
        makeElement('div', { id: 'studio-dim-dz' }, 'DZ: 1.60 m'),
        makeElement('div', { id: 'studio-dim-diag', style: { color: '#f59e0b', fontWeight: 'bold' } }, 'Diagonal: 2.40 m')
      ]);
      sidebar.appendChild(dimSection);

      // Material Controls
      const matSection = makeElement('div', {
        style: { display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }
      }, [
        makeElement('strong', { style: { color: '#10b981', fontSize: '11px' } }, '2. PBR MATERIAL PROPERTIES:'),
        makeElement('label', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          'Roughness:',
          makeElement('input', {
            type: 'range', min: '0.0', max: '1.0', step: '0.02', value: '0.18',
            style: { width: '90px', accentColor: '#10b981' },
            oninput: (e) => updateMaterial({ roughness: parseFloat(e.target.value) })
          })
        ]),
        makeElement('label', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          'Metalness:',
          makeElement('input', {
            type: 'range', min: '0.0', max: '1.0', step: '0.02', value: '0.0',
            style: { width: '90px', accentColor: '#38bdf8' },
            oninput: (e) => updateMaterial({ metalness: parseFloat(e.target.value) })
          })
        ]),
        makeElement('label', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          'Clearcoat Gloss:',
          makeElement('input', {
            type: 'range', min: '0.0', max: '1.0', step: '0.05', value: '1.0',
            style: { width: '90px', accentColor: '#f59e0b' },
            oninput: (e) => updateMaterial({ clearcoat: parseFloat(e.target.value) })
          })
        ]),
        makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' } }, [
          makeElement('input', {
            type: 'checkbox', style: { accentColor: '#10b981' },
            onchange: (e) => updateMaterial({ wireframe: e.target.checked })
          }),
          'Show Wireframe Edges'
        ])
      ]);
      sidebar.appendChild(matSection);

      // Studio Lighting Controls
      const lightSection = makeElement('div', {
        style: { display: 'flex', flexDirection: 'column', gap: '6px' }
      }, [
        makeElement('strong', { style: { color: '#f59e0b', fontSize: '11px' } }, '3. STUDIO LIGHTING RIG:'),
        makeElement('label', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          'Key Light:',
          makeElement('input', {
            type: 'range', min: '0.0', max: '2.0', step: '0.1', value: '0.8',
            style: { width: '90px', accentColor: '#f59e0b' },
            oninput: (e) => updateLighting({ keyIntensity: parseFloat(e.target.value) })
          })
        ]),
        makeElement('label', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
          'Fill Light:',
          makeElement('input', {
            type: 'range', min: '0.0', max: '1.5', step: '0.1', value: '0.4',
            style: { width: '90px', accentColor: '#38bdf8' },
            oninput: (e) => updateLighting({ fillIntensity: parseFloat(e.target.value) })
          })
        ])
      ]);
      sidebar.appendChild(lightSection);

      stage.appendChild(sidebar);
      wrap.appendChild(stage);
      container.appendChild(wrap);

      // Three.js State
      let threeLoader = null;
      let loadedModelGroup = null;
      let keyLight = null, fillLight = null, hemiLight = null;
      let activeMaterials = [];
      let compassGroup = null;
      let squircleLine = null;
      let miniJack = null;

      let state = {
        hoverPoint: null,
        hoverNormal: null,
        isVertexSnap: false,
        compassOrigin: [0, 0.4, 0],
        compassNormal: [0, 1, 0],
        compassSquircle: 0.45,
        activeAxisPulse: null
      };

      async function initStudio() {
        threeLoader = new ThreeJSLoader(null, {
          cameraPos: { x: 2.8, y: 2.2, z: 3.6 },
          enableControls: true,
          useThickLines: true,
          lighting: false,
          environment: false
        });

        await threeLoader.init(canvasMount);
        const THREE = threeLoader.THREE;
        threeLoader.scene.background = new THREE.Color(0x090d16);

        // Studio Lighting Rig
        hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 0.4);
        threeLoader.scene.add(hemiLight);

        keyLight = new THREE.DirectionalLight(0xfffaed, 0.8);
        keyLight.position.set(5, 8, 5);
        threeLoader.scene.add(keyLight);

        fillLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
        fillLight.position.set(-5, 3, -4);
        threeLoader.scene.add(fillLight);

        // Ground Grid
        const grid = new THREE.GridHelper(8, 16, 0x00f2fe, 0x1e293b);
        grid.position.y = -0.01;
        threeLoader.scene.add(grid);

        // Build 3D AccuDraw Squircle Compass directly in Three.js
        build3DAccuDrawCompass();

        // Load Initial Preset
        loadPresetModel('primitives');
      }

      function build3DAccuDrawCompass() {
        if (!threeLoader?.THREE) return;
        const THREE = threeLoader.THREE;

        if (compassGroup) {
          threeLoader.scene.remove(compassGroup);
        }

        compassGroup = new THREE.Group();
        compassGroup.position.set(state.compassOrigin[0], state.compassOrigin[1], state.compassOrigin[2]);

        // 1. Squircle Perimeter
        const squircleRadius = 0.42;
        const squircleShape = new THREE.Shape();
        const s = squircleRadius;
        const cornerR = (1 - state.compassSquircle) * (s * 0.25) + state.compassSquircle * s;

        squircleShape.moveTo(-s + cornerR, -s);
        squircleShape.lineTo(s - cornerR, -s);
        squircleShape.quadraticCurveTo(s, -s, s, -s + cornerR);
        squircleShape.lineTo(s, s - cornerR);
        squircleShape.quadraticCurveTo(s, s, s - cornerR, s);
        squircleShape.lineTo(-s + cornerR, s);
        squircleShape.quadraticCurveTo(-s, s, -s, s - cornerR);
        squircleShape.lineTo(-s, -s + cornerR);
        squircleShape.quadraticCurveTo(-s, -s, -s + cornerR, -s);

        const squircleGeom = new THREE.BufferGeometry().setFromPoints(squircleShape.getPoints(64));
        const squircleMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
        squircleLine = new THREE.LineLoop(squircleGeom, squircleMat);
        squircleLine.rotation.x = Math.PI / 2; // Flat on plane
        compassGroup.add(squircleLine);

        // 2. Primary Axis Tick Cylinders
        const tickLen = 0.12;
        const tickR = 0.012;

        // Positive X (Red)
        const xGeom = new THREE.CylinderGeometry(tickR, tickR, tickLen, 16);
        xGeom.rotateZ(-Math.PI / 2);
        const xTick = new THREE.Mesh(xGeom, new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        xTick.position.set(s, 0, 0);
        compassGroup.add(xTick);

        // Negative X (Gray)
        const nxTick = new THREE.Mesh(xGeom, new THREE.MeshBasicMaterial({ color: 0x64748b }));
        nxTick.position.set(-s, 0, 0);
        compassGroup.add(nxTick);

        // Positive Y / Forward Z (Green)
        const yGeom = new THREE.CylinderGeometry(tickR, tickR, tickLen, 16);
        yGeom.rotateX(Math.PI / 2);
        const yTick = new THREE.Mesh(yGeom, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
        yTick.position.set(0, 0, -s);
        compassGroup.add(yTick);

        // Negative Y (Gray)
        const nyTick = new THREE.Mesh(yGeom, new THREE.MeshBasicMaterial({ color: 0x64748b }));
        nyTick.position.set(0, 0, s);
        compassGroup.add(nyTick);

        // 3. Center White Origin Dot
        const centerDot = new THREE.Mesh(
          new THREE.SphereGeometry(0.025, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        compassGroup.add(centerDot);

        // 4. 3-Axis Mini-Jack Cursor
        miniJack = new THREE.Group();
        const armLen = 0.08;
        const armR = 0.006;

        const jX = new THREE.Mesh(new THREE.CylinderGeometry(armR, armR, armLen, 8).rotateZ(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        const jY = new THREE.Mesh(new THREE.CylinderGeometry(armR, armR, armLen, 8), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
        const jZ = new THREE.Mesh(new THREE.CylinderGeometry(armR, armR, armLen, 8).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        miniJack.add(jX, jY, jZ);
        compassGroup.add(miniJack);

        threeLoader.scene.add(compassGroup);
      }

      function alignCompassToSurfaceNormal() {
        if (!state.hoverNormal || !threeLoader?.THREE) {
          alert('Hover over a face on the 3D model first, then press Q (or tap Align Face)!');
          return;
        }
        const THREE = threeLoader.THREE;
        state.compassNormal = state.hoverNormal.slice();

        const zAxis = new THREE.Vector3(...state.compassNormal).normalize();
        const up = Math.abs(zAxis.y) > 0.98 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0);
        const xAxis = new THREE.Vector3().crossVectors(up, zAxis).normalize();
        const yAxis = new THREE.Vector3().crossVectors(zAxis, xAxis).normalize();

        const rotMatrix = new THREE.Matrix4().makeBasis(xAxis, zAxis, yAxis.clone().negate());
        compassGroup.quaternion.setFromRotationMatrix(rotMatrix);

        const statusEl = document.getElementById('studio-snap-type');
        if (statusEl) {
          statusEl.textContent = '✓ Aligned flush to face [Q active]';
          statusEl.style.color = '#38bdf8';
        }
      }

      function setCompassPlane(name) {
        if (!threeLoader?.THREE || !compassGroup) return;
        const THREE = threeLoader.THREE;

        if (name === 'top') {
          compassGroup.rotation.set(0, 0, 0);
          state.compassNormal = [0, 1, 0];
        } else if (name === 'front') {
          compassGroup.rotation.set(Math.PI / 2, 0, 0);
          state.compassNormal = [0, 0, 1];
        } else if (name === 'side') {
          compassGroup.rotation.set(0, 0, -Math.PI / 2);
          state.compassNormal = [1, 0, 0];
        }

        const statusEl = document.getElementById('studio-snap-type');
        if (statusEl) {
          statusEl.textContent = `Plane set to ${name.toUpperCase()}`;
          statusEl.style.color = '#10b981';
        }
      }

      function updateMaterial(props) {
        activeMaterials.forEach(mat => {
          if (props.roughness !== undefined) mat.roughness = props.roughness;
          if (props.metalness !== undefined) mat.metalness = props.metalness;
          if (props.clearcoat !== undefined) mat.clearcoat = props.clearcoat;
          if (props.wireframe !== undefined) mat.wireframe = props.wireframe;
          mat.needsUpdate = true;
        });
      }

      function updateLighting(props) {
        if (props.keyIntensity !== undefined && keyLight) keyLight.intensity = props.keyIntensity;
        if (props.fillIntensity !== undefined && fillLight) fillLight.intensity = props.fillIntensity;
      }

      function calculateBounds(group) {
        if (!threeLoader?.THREE || !group) return;
        const THREE = threeLoader.THREE;
        const box = new THREE.Box3().setFromObject(group);
        const size = new THREE.Vector3();
        box.getSize(size);
        const diag = box.min.distanceTo(box.max);

        const dxEl = document.getElementById('studio-dim-dx');
        const dyEl = document.getElementById('studio-dim-dy');
        const dzEl = document.getElementById('studio-dim-dz');
        const diagEl = document.getElementById('studio-dim-diag');

        if (dxEl) dxEl.textContent = `DX: ${size.x.toFixed(2)} m`;
        if (dyEl) dyEl.textContent = `DY: ${size.y.toFixed(2)} m`;
        if (dzEl) dzEl.textContent = `DZ: ${size.z.toFixed(2)} m`;
        if (diagEl) diagEl.textContent = `Diagonal: ${diag.toFixed(2)} m`;
      }

      function loadPresetModel(name) {
        if (!threeLoader?.THREE) return;
        const THREE = threeLoader.THREE;

        if (loadedModelGroup) {
          threeLoader.scene.remove(loadedModelGroup);
        }
        activeMaterials = [];

        loadedModelGroup = new THREE.Group();

        const glossyMat = new THREE.MeshPhysicalMaterial({
          color: 0x38bdf8,
          metalness: 0.0,
          roughness: 0.18,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08
        });
        activeMaterials.push(glossyMat);

        if (name === 'bracket') {
          const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.25, 1.2), glossyMat);
          const upright = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.0, 1.2), glossyMat);
          upright.position.set(-0.675, 0.5, 0);
          base.position.y = 0.125;
          loadedModelGroup.add(base);
          loadedModelGroup.add(upright);
        } else if (name === 'teacup') {
          const torus = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.25, 24, 48), glossyMat);
          torus.rotation.x = Math.PI / 2;
          torus.position.y = 0.4;
          loadedModelGroup.add(torus);
        } else {
          const s = 0.7;
          const cube = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), glossyMat);
          cube.position.set(-0.6, s / 2, 0);
          const sphere = new THREE.Mesh(new THREE.SphereGeometry(s * 0.55, 32, 32), glossyMat);
          sphere.position.set(0.6, s * 0.55, 0);
          loadedModelGroup.add(cube);
          loadedModelGroup.add(sphere);
        }

        threeLoader.scene.add(loadedModelGroup);
        calculateBounds(loadedModelGroup);
      }

      function handleCustomFileUpload(file) {
        if (typeof ModelLoader !== 'undefined' && threeLoader) {
          ModelLoader.loadGLB(file, threeLoader, null, (loadedModel) => {
            if (loadedModelGroup) threeLoader.scene.remove(loadedModelGroup);
            loadedModelGroup = loadedModel;
            threeLoader.scene.add(loadedModelGroup);
            calculateBounds(loadedModelGroup);
          });
        }
      }

      // Interactive Raycaster for Face & Vertex Snapping
      const raycaster = new (threeLoader?.THREE || globalThis.THREE).Raycaster();
      const mouse = new (threeLoader?.THREE || globalThis.THREE).Vector2();

      canvasMount.addEventListener('pointermove', (e) => {
        if (!threeLoader?.camera || !loadedModelGroup) return;
        const THREE = threeLoader.THREE;

        const rect = canvasMount.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, threeLoader.camera);

        const hits = raycaster.intersectObjects(loadedModelGroup.children, true);
        const coordEl = document.getElementById('studio-snap-coord');
        const normalEl = document.getElementById('studio-snap-normal');
        const typeEl = document.getElementById('studio-snap-type');

        if (hits.length > 0) {
          const hit = hits[0];
          let snapPos = [hit.point.x, hit.point.y, hit.point.z];
          let isVert = false;

          // Transform face normal into world coordinates
          let worldNormal = [0, 1, 0];
          if (hit.face) {
            const wNorm = hit.face.normal.clone()
              .transformDirection(hit.object.matrixWorld)
              .normalize();
            worldNormal = [wNorm.x, wNorm.y, wNorm.z];
          }

          // Test vertex proximity for magnetic latch
          const geom = hit.object.geometry;
          if (geom && geom.attributes && geom.attributes.position && hit.face) {
            const posAttr = geom.attributes.position;
            const vA = new THREE.Vector3().fromBufferAttribute(posAttr, hit.face.a).applyMatrix4(hit.object.matrixWorld);
            const vB = new THREE.Vector3().fromBufferAttribute(posAttr, hit.face.b).applyMatrix4(hit.object.matrixWorld);
            const vC = new THREE.Vector3().fromBufferAttribute(posAttr, hit.face.c).applyMatrix4(hit.object.matrixWorld);

            const dA = vA.distanceTo(hit.point);
            const dB = vB.distanceTo(hit.point);
            const dC = vC.distanceTo(hit.point);

            const snapThreshold = 0.18;
            if (dA < snapThreshold && dA <= dB && dA <= dC) {
              snapPos = [vA.x, vA.y, vA.z]; isVert = true;
            } else if (dB < snapThreshold && dB <= dA && dB <= dC) {
              snapPos = [vB.x, vB.y, vB.z]; isVert = true;
            } else if (dC < snapThreshold && dC <= dA && dC <= dB) {
              snapPos = [vC.x, vC.y, vC.z]; isVert = true;
            }
          }

          state.hoverPoint = snapPos;
          state.hoverNormal = worldNormal;
          state.isVertexSnap = isVert;

          // Move floating 3D AccuDraw compass to the snapped coordinate
          if (compassGroup) {
            compassGroup.position.set(snapPos[0], snapPos[1], snapPos[2]);
          }

          if (coordEl) coordEl.textContent = `Point: [${snapPos.map(n => n.toFixed(2)).join(', ')}]`;
          if (normalEl) normalEl.textContent = `Normal: [${worldNormal.map(n => n.toFixed(2)).join(', ')}]`;
          if (typeEl) {
            typeEl.textContent = isVert ? '🧲 Latching on Mesh Vertex' : 'Surface Face (Tap Q to align)';
            typeEl.style.color = isVert ? '#10b981' : '#f59e0b';
          }
        } else {
          state.hoverPoint = null;
          state.hoverNormal = null;
          if (coordEl) coordEl.textContent = 'Point: None';
          if (normalEl) normalEl.textContent = 'Normal: None';
          if (typeEl) {
            typeEl.textContent = 'Status: Ready to latch';
            typeEl.style.color = '#8b949e';
          }
        }
      });

      wrap.addEventListener('keydown', (e) => {
        const k = e.key.toUpperCase();
        if (k === 'Q') {
          alignCompassToSurfaceNormal();
        } else if (k === 'T') {
          setCompassPlane('top');
        } else if (k === 'F') {
          setCompassPlane('front');
        } else if (k === 'S') {
          setCompassPlane('side');
        }
      });

      function showModelCode() {
        const code =
  `// === PBR MeshPhysicalMaterial & AccuDraw Inspection Spec ===
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    metalness: 0.0,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08
  });

  // Calculate Bounding Vector & Plane Dimensions:
  const box = new THREE.Box3().setFromObject(loadedModel);
  const size = box.getSize(new THREE.Vector3());
  const dx = size.x;
  const dy = size.y;
  const dz = size.z;`;

        navigator.clipboard.writeText(code);
        alert('✓ Copied 3D Model Studio & PBR Material spec to clipboard for LLM synthesis!');
      }

      initStudio();

      const observer = new MutationObserver(() => {
        if (!document.body.contains(wrap)) {
          if (threeLoader) threeLoader.destroy();
          observer.disconnect();
        }
      });
      observer.observe(wrap.parentNode || document.body, { childList: true });
    }
}

globalThis.CadModelStudioComponent = CadModelStudioComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadModelStudioComponent;