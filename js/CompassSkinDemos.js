class CadSteampunkCompassComponent {
  /**
   * Chapter 2 Custom Steampunk Compass Viewport.
   * Directly mounts an accuCad 3D viewport showcasing the clockwork brass flywheels and inertia physics.
   */
  static async render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        width: '100%',
        minHeight: '440px',
        background: '#070a13',
        borderRadius: '12px',
        border: '1.5px solid #d4af3744',
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
        background: 'rgba(20, 16, 8, 0.95)',
        borderBottom: '1px solid #d4af3744',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '15px' } }, '⚙️'),
        makeElement('strong', { style: { fontSize: '13px', color: '#d4af37', fontFamily: 'monospace' } }, 'accuCad Steampunk Flywheel Decorator (Pluggable HUD)'),
        makeElement('span', { style: { fontSize: '10px', background: 'rgba(212, 175, 55, 0.15)', color: '#d4af37', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, 'Kinetic Momentum')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' } }, 'Orbit camera to impart rotational torque to the gears')
    ]);
    wrap.appendChild(header);

    const canvasMount = makeElement('div', {
      id: 'accucad-mount-steampunk-demo',
      style: { width: '100%', height: '390px', minHeight: '340px', position: 'relative', background: '#050811' }
    });
    wrap.appendChild(canvasMount);
    container.appendChild(wrap);

    let app = null;
    let instId = null;

    const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
    if (isLoaded && globalThis.Main) {
      app = new globalThis.Main();
      await app.run({
        container: canvasMount,
        showSidePanel: false,
        showCompassUi: false,
        cameraPos: { x: 0, y: 1.4, z: 2.2 },
        target: [0, 0, 0],
        background: 0x050811,
        initialPlane: 'top'
      });

      instId = CadStudioDemoComponent.registerInstance(app, canvasMount, 'Steampunk Demo');

      // Mount Steampunk Flywheels using CompassSkinAddons
      if (app.baseController?.accuDraw && typeof CompassSkinAddons !== 'undefined') {
        CompassSkinAddons.attachDecorator(app.baseController.accuDraw, 'steampunk');
      }

      // Track camera spin to impart torque
      let lastAngle = 0;
      if (app.threeLoader) {
        app.threeLoader.onUpdateCallback = () => {
          if (app.threeDView?.camera && app.baseController?.accuDraw?.addFlywheelTorque) {
            const cam = app.threeDView.camera;
            const currentAngle = Math.atan2(cam.position.x, cam.position.z);
            let delta = currentAngle - lastAngle;
            if (delta > Math.PI) delta -= Math.PI * 2;
            if (delta < -Math.PI) delta += Math.PI * 2;

            if (Math.abs(delta) > 0.002) {
              app.baseController.accuDraw.addFlywheelTorque(delta * 2.2);
            }
            lastAngle = currentAngle;
          }

          if (app.baseController?.accuDraw?._decoratorAnimationTick) {
            app.baseController.accuDraw._decoratorAnimationTick(0.016);
          }
        };
      }
    }

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

class CadArtNouveauCompassComponent {
  /**
   * Chapter 2 Custom Art Nouveau Compass Viewport.
   * Showcases the botanical golden vines and organic jade buds.
   */
  static async render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        width: '100%',
        minHeight: '440px',
        background: '#070a13',
        borderRadius: '12px',
        border: '1.5px solid #10b98144',
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
        background: 'rgba(8, 20, 14, 0.95)',
        borderBottom: '1px solid #10b98144',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '15px' } }, '🌿'),
        makeElement('strong', { style: { fontSize: '13px', color: '#86efac', fontFamily: 'monospace' } }, 'accuCad Art Nouveau Botanical Decorator'),
        makeElement('span', { style: { fontSize: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, 'Curved Organic Tendrils')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' } }, 'Golden vines & jade nodes demonstrating aesthetic decoupling')
    ]);
    wrap.appendChild(header);

    const canvasMount = makeElement('div', {
      id: 'accucad-mount-artnouveau-demo',
      style: { width: '100%', height: '390px', minHeight: '340px', position: 'relative', background: '#050811' }
    });
    wrap.appendChild(canvasMount);
    container.appendChild(wrap);

    let app = null;
    let instId = null;

    const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
    if (isLoaded && globalThis.Main) {
      app = new globalThis.Main();
      await app.run({
        container: canvasMount,
        showSidePanel: false,
        showCompassUi: false,
        cameraPos: { x: 0, y: 1.4, z: 2.2 },
        target: [0, 0, 0],
        background: 0x050811,
        initialPlane: 'top'
      });

      instId = CadStudioDemoComponent.registerInstance(app, canvasMount, 'Art Nouveau Demo');

      // Mount Art Nouveau vines
      if (app.baseController?.accuDraw && typeof CompassSkinAddons !== 'undefined') {
        CompassSkinAddons.attachDecorator(app.baseController.accuDraw, 'artnouveau');
      }

      if (app.threeLoader) {
        app.threeLoader.onUpdateCallback = () => {
          if (app.baseController?.accuDraw?._decoratorAnimationTick) {
            app.baseController.accuDraw._decoratorAnimationTick(0.016);
          }
        };
      }
    }

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

globalThis.CadSteampunkCompassComponent = CadSteampunkCompassComponent;
globalThis.CadArtNouveauCompassComponent = CadArtNouveauCompassComponent;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CadSteampunkCompassComponent, CadArtNouveauCompassComponent };
}