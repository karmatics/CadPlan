class CadModelStudioComponent {

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
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 16px 40px rgba(0,0,0,0.65)'
        }
      });

      const topBar = makeElement('div', {
        style: {
          padding: '10px 16px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid #21262d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          fontFamily: 'monospace',
          color: '#8b949e',
          flexWrap: 'wrap',
          gap: '8px',
          zIndex: 10
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('strong', { style: { color: '#00f2fe' } }, '📦 accuCad [Sub-View: Model Studio & PBR Assembly]'),
          makeElement('span', { style: { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' } }, '● Single-Source accuCad Instance')
        ]),
        makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
          makeElement('button', {
            className: 'dr-nav-btn primary',
            style: { padding: '3px 8px', fontSize: '10px' },
            onclick: () => app?.baseController?.setMaterialPreset('clearcoat')
          }, '✨ Clearcoat'),
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '3px 8px', fontSize: '10px' },
            onclick: () => app?.baseController?.setMaterialPreset('titanium')
          }, '⚙️ Titanium'),
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '3px 8px', fontSize: '10px' },
            onclick: () => app?.baseController?.setMaterialPreset('clay')
          }, '🗿 Clay'),
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '3px 8px', fontSize: '10px', color: '#c084fc', borderColor: '#c084fc66' },
            onclick: () => triggerFaceAlign()
          }, '[Q] Align Compass to Face')
        ])
      ]);
      wrap.appendChild(topBar);

      const appMount = makeElement('div', {
        id: 'accucad-mount-model-studio',
        style: {
          flex: 1,
          width: '100%',
          minHeight: '520px',
          position: 'relative',
          background: '#050811'
        }
      });
      wrap.appendChild(appMount);

      const bottomBar = makeElement('div', {
        style: {
          padding: '8px 14px', background: '#0d1117', borderTop: '1px solid #161e2b',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8'
        }
      }, [
        makeElement('span', { id: 'model-studio-face-label' }, 'Hover or click any 3D face, then press [Q] to align compass.'),
        makeElement('span', { id: 'model-studio-normal-label', style: { color: '#00f2fe' } }, 'Plane Normal: [0.00, 1.00, 0.00] (Top)')
      ]);
      wrap.appendChild(bottomBar);
      container.appendChild(wrap);

      let app = null;
      let instId = null;
      let lastHitNormal = null;

      const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
      if (isLoaded && globalThis.Main) {
        app = new globalThis.Main();
        await app.run({
          container: appMount,
          showSidePanel: false,
          showCompassUi: false,
          presetGeometry: 'primitives',
          cameraPos: { x: 3.5, y: 3.2, z: 4.5 },
          target: [0, 0.4, 0],
          background: 0x050811,
          initialPlane: 'top'
        });
        instId = CadStudioDemoComponent.registerInstance(app, appMount, 'Model Studio');
      }

      function triggerFaceAlign() {
        if (!lastHitNormal || !app?.baseController) {
          alert('Hover or click any 3D mesh surface first!');
          return;
        }
        app.baseController.alignToSurfaceNormal(lastHitNormal);

        const normLabel = document.getElementById('model-studio-normal-label');
        if (normLabel) {
          normLabel.textContent = `Plane Normal: [${lastHitNormal.x.toFixed(2)}, ${lastHitNormal.y.toFixed(2)}, ${lastHitNormal.z.toFixed(2)}]`;
        }
      }

      appMount.addEventListener('pointermove', (e) => {
        if (!app?.threeDView?.camera || !app?.threeDView?.scene) return;
        const camera = app.threeDView.camera;
        const scene = app.threeDView.scene;
        const THREE = app.THREE;

        const rect = appMount.getBoundingClientRect();
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

          const faceLbl = document.getElementById('model-studio-face-label');
          if (faceLbl) {
            faceLbl.textContent = `Surface Detected: ${hit.object.geometry?.type || 'Mesh Face'} (Click or press Q to align)`;
            faceLbl.style.color = '#f8fafc';
          }
        }
      });

      appMount.addEventListener('pointerdown', () => {
        if (lastHitNormal) {
          triggerFaceAlign();
        }
      });

      const observer = new MutationObserver(() => {
        if (!document.body.contains(wrap)) {
          if (instId) CadStudioDemoComponent.unregisterInstance(instId);
          if (app && typeof app.destroy === 'function') app.destroy();
          observer.disconnect();
        }
      });
      observer.observe(wrap.parentNode || document.body, { childList: true });
    }
}

globalThis.CadModelStudioComponent = CadModelStudioComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadModelStudioComponent;