class CadSurfaceNormalLab {
  /**
   * Interactive 3D Surface Normal Alignment ('Q' Key) Laboratory.
   * Demonstrates:
   * 1. Loading an inclined mechanical bracket with multi-angle planar faces (30°, 45°, 60°).
   * 2. Raycasting against face normals in real-time.
   * 3. Pressing 'Q' executes Gram-Schmidt orthogonalization without gimbal flips:
   *    Z_c = normal; X_c = normalize(up x normal); Y_c = Z_c x X_c.
   * 4. The AccuDraw squircle compass smoothly glides and tilts flush against that angled face.
   * 5. The Reset Reversion Invariant: Right-click / Esc smoothly un-tilts the compass back to baseline!
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
        makeElement('span', { style: { fontSize: '15px' } }, '⚡'),
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'accuCad [Sub-View: Surface Normal Alignment ("Q" Key) & Reset Reversion]'),
        makeElement('span', { id: 'surface-lab-status-badge', style: { fontSize: '10px', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, 'Top Baseline Plane')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        makeElement('button', {
          className: 'dr-nav-btn primary',
          id: 'btn-surface-align-q',
          style: { padding: '3px 8px', fontSize: '10px', fontWeight: 'bold' },
          onclick: () => triggerFaceAlign()
        }, '[Q] Latch Surface Normal'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px', color: '#f59e0b', borderColor: '#f59e0b66' },
          onclick: () => triggerResetReversion()
        }, 'Esc / Reset Reversion')
      ])
    ]);
    wrap.appendChild(header);

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
      id: 'accucad-mount-surface-latch-gym',
      style: { width: '100%', height: '100%', minHeight: '480px', position: 'relative', background: '#050811' }
    });
    stageGrid.appendChild(canvasMount);

    // Right Column: Surface Normal Telemetry & Quick Chamfers
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

    const telemetryCard = makeElement('div', {
      style: {
        background: '#070a13', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px',
        display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.5'
      }
    }, [
      makeElement('strong', { style: { color: '#00f2fe' } }, 'SURFACE NORMAL & GRAM-SCHMIDT MATRIX:'),
      hitFaceLabel = makeElement('div', { style: { color: '#38bdf8' } }, 'Candidate Surface: Hover 3D chamfers'),
      normalVectorLabel = makeElement('div', { style: { color: '#10b981' } }, 'Normal Vector (Z_c): [0.00, 1.00, 0.00]'),
      basisXLabel = makeElement('div', {}, 'Tangent Vector (X_c): [1.00, 0.00, 0.00]'),
      basisYLabel = makeElement('div', {}, 'Bitangent Vector (Y_c): [0.00, 0.00, -1.00]')
    ]);
    let hitFaceLabel, normalVectorLabel, basisXLabel, basisYLabel;
    rightCol.appendChild(telemetryCard);

    // Quick Chamfer Buttons
    const presetsCard = makeElement('div', {
      style: {
        background: '#070a13', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px',
        display: 'flex', flexDirection: 'column', gap: '8px'
      }
    }, [
      makeElement('strong', { style: { color: '#f59e0b' } }, 'QUICK TEST PLANES:'),
      makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 8px', fontSize: '10px' },
          onclick: () => setManualPlane([0, 1, 0], 'Top Floor (Z=Up)')
        }, 'Top (0, 1, 0)'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 8px', fontSize: '10px' },
          onclick: () => setManualPlane([0.7071, 0.7071, 0], '45° Roof Chamfer')
        }, '45° Chamfer'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 8px', fontSize: '10px' },
          onclick: () => setManualPlane([0, 0.5, 0.866], '60° Sloped Ramp')
        }, '60° Ramp')
      ])
    ]);
    rightCol.appendChild(presetsCard);

    // Explanatory Note
    const noteCard = makeElement('div', {
      style: {
        background: 'rgba(0, 242, 254, 0.05)', borderLeft: '3px solid #00f2fe',
        padding: '10px 12px', borderRadius: '4px', fontSize: '10.5px', color: '#cbd5e1', lineHeight: '1.5'
      }
    }, [
      makeElement('strong', { style: { color: '#00f2fe', display: 'block', marginBottom: '2px' } }, 'Rob Brown\'s Reset Reversion Invariant:'),
      'In legacy CAD, rotating a plane was destructive: if you cancelled the tool, your coordinate system remained stranded at an awkward skew. In AccuDraw, ',
      makeElement('strong', { style: { color: '#fff' } }, 'Reset (Right-Click / Esc) instantly unwinds context rotation'),
      ', restoring the baseline plane you were working on.'
    ]);
    rightCol.appendChild(noteCard);

    stageGrid.appendChild(rightCol);
    wrap.appendChild(stageGrid);
    container.appendChild(wrap);

    let app = null;
    let instId = null;
    let lastHitNormal = null;

    const boot = async () => {
      const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
      if (isLoaded && globalThis.Main) {
        app = new globalThis.Main();
        await app.run({
          container: canvasMount,
          showSidePanel: false,
          showCompassUi: false,
          presetGeometry: 'bracket',
          cameraPos: { x: 3.5, y: 3.2, z: 4.8 },
          target: [0, 0.4, 0],
          background: 0x050811,
          initialPlane: 'top'
        });

        instId = CadStudioDemoComponent.registerInstance(app, canvasMount, 'Surface Latch Gym');
        buildInclinedChamferModel(app.baseController, app.THREE);
      }
    };

    boot();

    function buildInclinedChamferModel(bc, THREE) {
      if (!bc || !THREE) return;

      // Build 45° beveled chamfer wedge
      const shape = new THREE.Shape();
      shape.moveTo(-1.0, 0.0);
      shape.lineTo(1.0, 0.0);
      shape.lineTo(1.0, 0.8);
      shape.lineTo(-0.2, 1.6);
      shape.lineTo(-1.0, 1.6);
      shape.closePath();

      const extrudeSettings = { depth: 1.6, bevelEnabled: false };
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();

      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        metalness: 0.1,
        roughness: 0.18,
        clearcoat: 0.9,
        clearcoatRoughness: 0.08,
        reflectivity: 0.9
      });

      const wedgeMesh = new THREE.Mesh(geom, mat);
      wedgeMesh.position.set(0, 0.8, 0);
      wedgeMesh.userData.isPickable = true;
      bc.view.scene.add(wedgeMesh);
    }

    function triggerFaceAlign() {
      if (!lastHitNormal || !app?.baseController) {
        alert('Hover over any 3D face first, then click [Q] to latch plane!');
        return;
      }
      const matrix = app.baseController.alignToSurfaceNormal(lastHitNormal);
      updateTelemetry(matrix, 'Latched to Face Normal [Q]');
      if (typeof CompassSkinAddons !== 'undefined') {
        CompassSkinAddons.playSnapPop(720, 0.04);
      }
    }

    function triggerResetReversion() {
      if (!app?.baseController) return;
      const matrix = app.baseController.resetOrientationToBasePlane(true);
      updateTelemetry(matrix, 'Reverted to Baseline Plane (Rob Brown Invariant)');
      if (typeof CompassSkinAddons !== 'undefined') {
        CompassSkinAddons.playSnapPop(440, 0.05);
      }
    }

    function setManualPlane(normalArr, label) {
      if (!app?.baseController) return;
      const matrix = app.baseController.alignToSurfaceNormal(normalArr);
      updateTelemetry(matrix, label);
    }

    function updateTelemetry(matrix, statusMsg) {
      const bc = app?.baseController;
      if (!bc) return;

      const rm = matrix || bc.rotationMatrix || [[1,0,0],[0,1,0],[0,0,1]];
      normalVectorLabel.textContent = `Normal Vector (Z_c): [${rm[2].map(n => n.toFixed(2)).join(', ')}]`;
      basisXLabel.textContent = `Tangent Vector (X_c): [${rm[0].map(n => n.toFixed(2)).join(', ')}]`;
      basisYLabel.textContent = `Bitangent Vector (Y_c): [${rm[1].map(n => n.toFixed(2)).join(', ')}]`;

      const badge = document.getElementById('surface-lab-status-badge');
      if (badge && statusMsg) {
        badge.textContent = statusMsg;
      }
    }

    canvasMount.addEventListener('pointermove', (e) => {
      if (!app?.threeDView?.camera || !app?.threeDView?.scene) return;
      const camera = app.threeDView.camera;
      const scene = app.threeDView.scene;
      const THREE = app.THREE;

      const rect = canvasMount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      const snappable = [];
      scene.traverse(child => {
        if (child.isMesh && child.userData.isPickable !== false && !child.userData.isCompassPart) {
          snappable.push(child);
        }
      });

      const hits = raycaster.intersectObjects(snappable, true);
      if (hits.length > 0 && hits[0].face) {
        const hit = hits[0];
        lastHitNormal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize();

        hitFaceLabel.textContent = `Candidate Surface: Normal [${lastHitNormal.x.toFixed(2)}, ${lastHitNormal.y.toFixed(2)}, ${lastHitNormal.z.toFixed(2)}]`;
        hitFaceLabel.style.color = '#00f2fe';
      }
    });

    canvasMount.addEventListener('pointerdown', (e) => {
      if (e.button === 0 && e.altKey) {
        triggerFaceAlign();
      }
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

globalThis.CadSurfaceNormalLab = CadSurfaceNormalLab;
if (typeof module !== 'undefined' && module.exports) module.exports = CadSurfaceNormalLab;