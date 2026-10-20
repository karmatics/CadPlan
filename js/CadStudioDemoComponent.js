class CadStudioDemoComponent {

  static async render(container) {
      container.innerHTML = '';

      const wrap = makeElement('div', {
        style: {
          width: '100%',
          minHeight: '720px',
          position: 'relative',
          background: '#090d16',
          borderRadius: '12px',
          border: '1.5px solid #21262d',
          overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
          display: 'flex',
          flexDirection: 'column'
        }
      });
      container.appendChild(wrap);

      const tabsBar = makeElement('div', {
        style: {
          minHeight: '46px',
          background: 'rgba(15, 20, 28, 0.96)',
          borderBottom: '1px solid #21262d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 14px',
          zIndex: '50',
          flexWrap: 'wrap',
          gap: '6px'
        }
      });

      const tabsGroup = makeElement('div', {
        style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }
      });

      const makeTabBtn = (label, id, isActive = false) => makeElement('button', {
        id: id,
        className: `dr-tab-btn ${isActive ? 'active' : ''}`,
        style: {
          borderRadius: '6px',
          padding: '5px 12px',
          fontFamily: 'monospace',
          fontSize: '11px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }
      }, label);

      const tabFull = makeTabBtn('📐 accuCad (Full Workstation)', 'studio-tab-full', true);
      const tabSnap = makeTabBtn('🎯 Snapping & Tentative Gym', 'studio-tab-snap');
      const tabCompass = makeTabBtn('🧭 3D Compass Gymnastics', 'studio-tab-compass');
      const tabSvg = makeTabBtn('🌐 Pure SVG AccuDraw', 'studio-tab-svg');
      const tabSpline = makeTabBtn('✍️ On-Curve Spline & Parallax', 'studio-tab-spline');

      tabsGroup.appendChild(tabFull);
      tabsGroup.appendChild(tabSnap);
      tabsGroup.appendChild(tabCompass);
      tabsGroup.appendChild(tabSvg);
      tabsGroup.appendChild(tabSpline);

      const rightControls = makeElement('div', {
        style: { display: 'flex', gap: '8px', alignItems: 'center' }
      });

      const openStandaloneBtn = makeElement('a', {
        href: '../accuCad/index.html',
        target: '_blank',
        style: {
          background: '#1e293b',
          color: '#38bdf8',
          border: '1px solid #38bdf866',
          borderRadius: '6px',
          padding: '5px 10px',
          fontFamily: 'monospace',
          fontSize: '10px',
          fontWeight: 'bold',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }
      }, '↗ Standalone accuCad');

      rightControls.appendChild(openStandaloneBtn);
      tabsBar.appendChild(tabsGroup);
      tabsBar.appendChild(rightControls);
      wrap.appendChild(tabsBar);

      const stage = makeElement('div', {
        style: {
          flex: '1',
          width: '100%',
          minHeight: '674px',
          position: 'relative',
          background: '#090d16'
        }
      });
      wrap.appendChild(stage);

      const tabButtons = [tabFull, tabSnap, tabCompass, tabSvg, tabSpline];

      function switchView(viewName) {
        // Cleanly unregister any active instances in stage before clearing
        stage.querySelectorAll('[id^="accucad-mount-"]').forEach(mountEl => {
          if (mountEl._accuCadId) {
            CadStudioDemoComponent.unregisterInstance(mountEl._accuCadId);
          }
        });

        stage.innerHTML = '';
        tabButtons.forEach(b => b.classList.remove('active'));

        if (viewName === 'full') {
          tabFull.classList.add('active');
          openStandaloneBtn.style.display = 'inline-flex';
          CadStudioDemoComponent._renderAccuCadIframe(stage);
        } else if (viewName === 'snap') {
          tabSnap.classList.add('active');
          openStandaloneBtn.style.display = 'none';
          CadStudioDemoComponent._renderSnappingGym(stage);
        } else if (viewName === 'compass') {
          tabCompass.classList.add('active');
          openStandaloneBtn.style.display = 'none';
          CadStudioDemoComponent._renderCompassGym(stage);
        } else if (viewName === 'svg') {
          tabSvg.classList.add('active');
          openStandaloneBtn.style.display = 'none';
          CadStudioDemoComponent._renderSvgAccuDrawView(stage);
        } else {
          tabSpline.classList.add('active');
          openStandaloneBtn.style.display = 'none';
          CadStudioDemoComponent._renderAuthenticCurveAndParallaxLab(stage);
        }
      }

      tabFull.onclick = () => switchView('full');
      tabSnap.onclick = () => switchView('snap');
      tabCompass.onclick = () => switchView('compass');
      tabSvg.onclick = () => switchView('svg');
      tabSpline.onclick = () => switchView('spline');

      switchView('full');
    }

  static async _renderAccuCadIframe(container) {
      container.innerHTML = '';

      const frameWrap = makeElement('div', {
        style: {
          width: '100%',
          minHeight: '640px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          background: '#0d1117'
        }
      });

      const statusHeader = makeElement('div', {
        style: {
          padding: '8px 14px',
          background: '#161b22',
          borderBottom: '1px solid #30363d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          fontFamily: 'monospace',
          color: '#8b949e',
          flexWrap: 'wrap',
          gap: '8px'
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('strong', { style: { color: '#00f2fe' } }, '📐 accuCad [Instance 2: Production Studio] • Native Embedded'),
          makeElement('span', { id: 'accucad-inst2-focus', style: { color: '#10b981' } }, '● Active Focus')
        ]),
        makeElement('span', { style: { color: '#64748b' } }, 'Click canvas to focus keyboard shortcuts [T/F/S/L/Space/O/G]')
      ]);
      frameWrap.appendChild(statusHeader);

      const appMount = makeElement('div', {
        id: 'accucad-mount-instance-2',
        style: {
          flex: 1,
          width: '100%',
          minHeight: '600px',
          position: 'relative',
          border: '1.5px solid #21262d',
          transition: 'border-color 0.2s, box-shadow 0.2s'
        }
      });
      frameWrap.appendChild(appMount);
      container.appendChild(frameWrap);

      let activeApp = null;
      let instId = null;

      const isLoaded = await CadStudioDemoComponent.ensureAccuCadLoaded();
      if (isLoaded && globalThis.Main) {
        activeApp = new globalThis.Main();
        await activeApp.run({ container: appMount, showSidePanel: true, background: 0x0d1117 });
        instId = CadStudioDemoComponent.registerInstance(activeApp, appMount, 'Instance 2: Production Studio');
      }

      const observer = new MutationObserver(() => {
        if (!document.body.contains(frameWrap)) {
          if (instId) CadStudioDemoComponent.unregisterInstance(instId);
          observer.disconnect();
        }
      });
      observer.observe(frameWrap.parentNode || document.body, { childList: true });
    }
  static async _renderAuthenticCurveAndParallaxLab(container) {
      container.innerHTML = '';

      const wrap = makeElement('div', {
        style: {
          width: '100%', height: '100%', minHeight: '640px', position: 'relative',
          display: 'flex', flexDirection: 'column', background: '#090d16'
        }
      });

      const hud = makeElement('div', {
        style: {
          padding: '8px 14px', background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid #21262d',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
          fontSize: '11px', fontFamily: 'monospace', zIndex: 10
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('strong', { style: { color: '#10b981' } }, '✍️ accuCad [Sub-View: On-Curve Splines & Motion Parallax]'),
          makeElement('span', { style: { color: '#00f2fe' } }, '● Active Tool: DrawCurveCommand (G1 Relaxation)')
        ]),
        makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '3px 8px', fontSize: '10px' },
            onclick: () => app?.baseController?.setDrawingPlane('top')
          }, 'T: Top'),
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '3px 8px', fontSize: '10px' },
            onclick: () => app?.baseController?.setDrawingPlane('front')
          }, 'F: Front'),
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '3px 8px', fontSize: '10px' },
            onclick: () => app?.baseController?.setDrawingPlane('side')
          }, 'S: Side'),
          makeElement('button', {
            className: 'dr-nav-btn primary',
            id: 'btn-lab-parallax-toggle',
            style: { padding: '3px 8px', fontSize: '10px' },
            onclick: () => toggleParallax()
          }, '🔄 Parallax: ON')
        ])
      ]);
      wrap.appendChild(hud);

      const canvasMount = makeElement('div', {
        id: 'accucad-mount-spline-parallax-gym',
        style: { flex: 1, width: '100%', minHeight: '580px', position: 'relative', background: '#050811' }
      });
      wrap.appendChild(canvasMount);
      container.appendChild(wrap);

      let app = null;
      let instId = null;

      const boot = async () => {
        await CadStudioDemoComponent.ensureAccuCadLoaded();
        if (globalThis.Main) {
          app = new globalThis.Main();
          await app.run({
            container: canvasMount,
            showSidePanel: false,
            showCompassUi: false,
            initialTool: 'curve',
            presetGeometry: 'primitives',
            cameraPos: { x: 3.5, y: 3.5, z: 4.8 },
            target: [0, 0.4, 0],
            background: 0x050811,
            initialPlane: 'top'
          });

          instId = CadStudioDemoComponent.registerInstance(app, canvasMount, 'Spline & Parallax Lab');

          if (typeof CameraOrbitAnimator !== 'undefined') {
            CameraOrbitAnimator.start();
          }
        }
      };

      boot();

      function toggleParallax() {
        if (typeof CameraOrbitAnimator !== 'undefined') {
          CameraOrbitAnimator.toggle();
          const btn = document.getElementById('btn-lab-parallax-toggle');
          if (btn) {
            const isRunning = CameraOrbitAnimator._running;
            btn.textContent = isRunning ? '🔄 Parallax: ON' : '○ Parallax: OFF';
            btn.style.color = isRunning ? '#ffffff' : '#94a3b8';
          }
        }
      }

      const observer = new MutationObserver(() => {
        if (!document.body.contains(wrap)) {
          if (instId) CadStudioDemoComponent.unregisterInstance(instId);
          if (typeof CameraOrbitAnimator !== 'undefined') CameraOrbitAnimator.stop();
          if (app && typeof app.destroy === 'function') app.destroy();
          observer.disconnect();
        }
      });
      observer.observe(wrap.parentNode || document.body, { childList: true });
  }
  static exportToDxf(vertices) {
    if (!vertices || vertices.length < 2) return;

    const solver = (typeof UpdateControlPoints !== 'undefined') ? UpdateControlPoints : globalThis.UpdateControlPoints;
    solver.run(vertices, 8);

    let dxf = "0\nSECTION\n2\nHEADER\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n";
    const segSteps = 16;

    for (let i = 0; i < vertices.length - 1; i++) {
      const v0 = vertices[i].point;
      const cp1 = vertices[i].controlPoints[1];
      const cp2 = vertices[i + 1].controlPoints[0];
      const v1 = vertices[i + 1].point;

      let prevX = v0[0], prevY = v0[1], prevZ = v0[2] || 0;

      for (let s = 1; s <= segSteps; s++) {
        const t = s / segSteps;
        const mt = 1 - t;

        const curX = mt*mt*mt*v0[0] + 3*mt*mt*t*cp1[0] + 3*mt*t*t*cp2[0] + t*t*t*v1[0];
        const curY = mt*mt*mt*v0[1] + 3*mt*mt*t*cp1[1] + 3*mt*t*t*cp2[1] + t*t*t*v1[1];
        const curZ = mt*mt*mt*(v0[2]||0) + 3*mt*mt*t*(cp1[2]||0) + 3*mt*t*t*(cp2[2]||0) + t*t*t*(v1[2]||0);

        dxf += "0\nLINE\n8\nCOMPASSDRAW_CURVES\n";
        dxf += `10\n${prevX.toFixed(4)}\n20\n${prevY.toFixed(4)}\n30\n${prevZ.toFixed(4)}\n`;
        dxf += `11\n${curX.toFixed(4)}\n21\n${curY.toFixed(4)}\n31\n${curZ.toFixed(4)}\n`;

        prevX = curX; prevY = curY; prevZ = curZ;
      }
    }

    dxf += "0\nENDSEC\n0\nEOF\n";

    const blob = new Blob([dxf], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CompassDraw_Export_${Date.now()}.dxf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static async ensureAccuCadLoaded() {
      if (globalThis.Main && globalThis.BaseController && globalThis.AccuDrawLogic) {
        return true;
      }
      if (CadStudioDemoComponent._accuCadLoadPromise) {
        return CadStudioDemoComponent._accuCadLoadPromise;
      }

      CadStudioDemoComponent._accuCadLoadPromise = (async () => {
        try {
          const response = await fetch('/accuCad/luno.json');
          if (!response.ok) {
            throw new Error(`Failed to fetch /accuCad/luno.json: HTTP ${response.status}`);
          }
          const meta = await response.json();

          const libs = (meta.library || []).map(lib => {
            const clean = lib.replace(/^(?:Library|library)[\/\\]/i, '');
            return typeof LunoLoader !== 'undefined'
              ? LunoLoader.resolveScriptUrl('Library/' + clean)
              : '/Library/' + clean;
          });

          if (typeof LunoLoader !== 'undefined' && LunoLoader.loadScriptsInOrder) {
            await LunoLoader.loadScriptsInOrder(libs);
          }

          const mainUrls = (meta.main || []).map(file => {
            if (file.startsWith('http://') || file.startsWith('https://')) return file;
            return '/accuCad/' + file.replace(/^\/+/, '');
          });

          if (typeof LunoLoader !== 'undefined' && LunoLoader.loadScriptsInOrder) {
            await LunoLoader.loadScriptsInOrder(mainUrls);
          }

          return Boolean(globalThis.Main);
        } catch (err) {
          console.error('[CadStudioDemoComponent] Load exception:', err);
          return false;
        }
      })();

      return CadStudioDemoComponent._accuCadLoadPromise;
    }
  static _renderSnappingGym(stage) {
      stage.innerHTML = '';
      const gymWrap = makeElement('div', {
        style: { width: '100%', height: '100%', minHeight: '660px', position: 'relative', display: 'flex', flexDirection: 'column' }
      });

      const hud = makeElement('div', {
        style: {
          padding: '8px 14px', background: '#0c1220', borderBottom: '1px solid #1e293b',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace'
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('strong', { style: { color: '#00f2fe' } }, '🎯 Focused Snapping & Tentative Workbench:'),
          makeElement('span', {}, 'Hover wireframes • 50ms Chord / Ctrl Snaps • [G] Origin • Pull away to test Mini-Jack')
        ]),
        makeElement('span', { style: { color: '#10b981', fontWeight: 'bold' } }, '● Screen-Space 14px Thick Pick')
      ]);
      gymWrap.appendChild(hud);

      const mountPoint = makeElement('div', { style: { flex: 1, position: 'relative' } });
      gymWrap.appendChild(mountPoint);
      stage.appendChild(gymWrap);

      if (typeof TentativeSnappingLab !== 'undefined' && TentativeSnappingLab.render) {
        TentativeSnappingLab.render(mountPoint);
      }
    }

  static _renderCompassGym(stage) {
      stage.innerHTML = '';
      const compWrap = makeElement('div', {
        style: { width: '100%', height: '100%', minHeight: '660px', position: 'relative', display: 'flex', flexDirection: 'column' }
      });

      const hud = makeElement('div', {
        style: {
          padding: '8px 14px', background: '#0c1220', borderBottom: '1px solid #1e293b',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace'
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('strong', { style: { color: '#38bdf8' } }, '🧭 3D Compass Gymnastics & Plane Rotation:'),
          makeElement('span', {}, 'Single-stroke planes [T/F/S/V] • Surface Alignment [Q] • Orbit without scene clutter')
        ]),
        makeElement('span', { style: { color: '#f59e0b', fontWeight: 'bold' } }, '● ThreeAxes Direction Cosines')
      ]);
      compWrap.appendChild(hud);

      const mountPoint = makeElement('div', { style: { flex: 1, position: 'relative' } });
      compWrap.appendChild(mountPoint);
      stage.appendChild(compWrap);

      if (typeof CadIsolatedCompass3DComponent !== 'undefined' && CadIsolatedCompass3DComponent.render) {
        CadIsolatedCompass3DComponent.render(mountPoint);
      }
    }

  static _renderSvgAccuDrawView(stage) {
      stage.innerHTML = '';
      const svgWrap = makeElement('div', {
        style: { width: '100%', height: '100%', minHeight: '660px', position: 'relative', display: 'flex', flexDirection: 'column' }
      });

      const hud = makeElement('div', {
        style: {
          padding: '8px 14px', background: '#0c1220', borderBottom: '1px solid #1e293b',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace'
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
          makeElement('strong', { style: { color: '#10b981' } }, '🌐 Pure SVG AccuDraw Studio:'),
          makeElement('span', {}, 'Resolution-independent vector drafting • Zero WebGL overhead • Real DXF bulge exports')
        ]),
        makeElement('span', { style: { color: '#00f2fe', fontWeight: 'bold' } }, '● Superellipse Squircle Math')
      ]);
      svgWrap.appendChild(hud);

      const mountPoint = makeElement('div', { style: { flex: 1, position: 'relative' } });
      svgWrap.appendChild(mountPoint);
      stage.appendChild(svgWrap);

      if (typeof SvgSmartLineLab !== 'undefined' && SvgSmartLineLab.render) {
        SvgSmartLineLab.render(mountPoint);
      }
    }

  static registerInstance(app, container, name = 'accuCad') {
      if (!CadStudioDemoComponent._instances) {
        CadStudioDemoComponent._instances = new Map();
        CadStudioDemoComponent._activeInst = null;

        window.addEventListener('keydown', (e) => {
          const tag = e.target?.tagName;
          if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;
          if (globalThis._cadPlanInstance?.aardvark?.isActive) return;

          const cur = CadStudioDemoComponent._activeInst;
          if (!cur || cur.isSuspended || !cur.app?.baseController) return;

          const isInteracting = cur.container.contains(document.activeElement) ||
                                cur.container.matches(':hover');
          if (!isInteracting) return;

          if (typeof cur.app.baseController.handleKeyDown === 'function') {
            cur.app.baseController.handleKeyDown(e);
          }
        }, { capture: true });

        window.addEventListener('pointerdown', (e) => {
          const cur = CadStudioDemoComponent._activeInst;
          if (cur && cur.container) {
            const isInsideCanvas = cur.container.contains(e.target);
            const isInsideAccuDrawUi = Boolean(e.target.closest && e.target.closest('.accudraw-ui, .accudraw-dialog, [id*="accudraw"], .uw-dialog'));
            if (!isInsideCanvas && !isInsideAccuDrawUi) {
              CadStudioDemoComponent.setActiveInstance(null);
              CadStudioDemoComponent.dismissAccuDrawUi(cur.app);
            }
          }
        }, { capture: true });

        CadStudioDemoComponent._observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const item = CadStudioDemoComponent._instances.get(entry.target._accuCadId);
            if (item) {
              item.isSuspended = !entry.isIntersecting;
              if (item.app?.threeLoader) {
                item.app.threeLoader.isPaused = item.isSuspended;
              }
              if (item.isSuspended && CadStudioDemoComponent._activeInst === item) {
                CadStudioDemoComponent.setActiveInstance(null);
                CadStudioDemoComponent.dismissAccuDrawUi(item.app);
              }
            }
          });
        }, { threshold: 0.15 });
      }

      const id = 'inst_' + Math.random().toString(36).substr(2, 8);
      container._accuCadId = id;
      container.tabIndex = 0;
      container.style.outline = 'none';

      const item = { id, app, container, name, isSuspended: false };
      CadStudioDemoComponent._instances.set(id, item);

      if (CadStudioDemoComponent._observer) {
        CadStudioDemoComponent._observer.observe(container);
      }

      container.addEventListener('pointerdown', () => {
        CadStudioDemoComponent.setActiveInstance(item);
      });

      container.addEventListener('focus', () => {
        CadStudioDemoComponent.setActiveInstance(item);
      });

      return id;
    }

  static setActiveInstance(item) {
      if (CadStudioDemoComponent._instances) {
        CadStudioDemoComponent._instances.forEach(inst => {
          if (inst.container) {
            inst.container.style.boxShadow = 'none';
            inst.container.style.borderColor = '#21262d';
          }
        });
      }

      if (CadStudioDemoComponent._activeInst && CadStudioDemoComponent._activeInst !== item) {
        CadStudioDemoComponent.dismissAccuDrawUi(CadStudioDemoComponent._activeInst.app);
      }

      CadStudioDemoComponent._activeInst = item;

      if (item && item.container) {
        item.container.style.boxShadow = '0 0 16px rgba(0, 242, 254, 0.45)';
        item.container.style.borderColor = '#00f2fe';
        if (item.app?.baseController) {
          window.baseController = item.app.baseController;
        }
      }
    }

  static unregisterInstance(id) {
      if (!CadStudioDemoComponent._instances) return;
      const item = CadStudioDemoComponent._instances.get(id);
      if (item) {
        if (CadStudioDemoComponent._observer && item.container) {
          CadStudioDemoComponent._observer.unobserve(item.container);
        }
        if (CadStudioDemoComponent._activeInst === item) {
          CadStudioDemoComponent._activeInst = null;
        }
        CadStudioDemoComponent.dismissAccuDrawUi(item.app);
        if (item.app && typeof item.app.destroy === 'function') {
          try { item.app.destroy(); } catch(e) {}
        }
        CadStudioDemoComponent._instances.delete(id);
      }
    }
  static dismissAccuDrawUi(app = null) {
      if (app?.baseController) {
        const bc = app.baseController;
        if (bc.accuDrawUi) {
          if (typeof bc.accuDrawUi.hide === 'function') bc.accuDrawUi.hide();
          if (typeof bc.accuDrawUi.close === 'function') bc.accuDrawUi.close();
          if (bc.accuDrawUi.dialog && typeof bc.accuDrawUi.dialog.close === 'function') bc.accuDrawUi.dialog.close();
          if (bc.accuDrawUi.element) bc.accuDrawUi.element.style.display = 'none';
          if (bc.accuDrawUi.domElement) bc.accuDrawUi.domElement.style.display = 'none';
        }
        if (bc.accuDraw?.ui) {
          if (typeof bc.accuDraw.ui.hide === 'function') bc.accuDraw.ui.hide();
          if (bc.accuDraw.ui.element) bc.accuDraw.ui.element.style.display = 'none';
        }
      }

      document.querySelectorAll('.accudraw-ui, .accudraw-ui-container, .accudraw-dialog, [id*="accudraw-ui"], [id*="accudraw_ui"]').forEach(el => {
        el.style.display = 'none';
      });

      if (typeof UITools !== 'undefined') {
        UITools._getState()?.all?.forEach(w => {
          const title = (w.options?.title || '').toLowerCase();
          if (title.includes('accudraw') || title.includes('coordinate') || w.element?.querySelector('.accudrawInput')) {
            w.element.style.display = 'none';
          }
        });
      }
    }
}

globalThis.CadStudioDemoComponent = CadStudioDemoComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadStudioDemoComponent;