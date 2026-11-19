class CadSurfaceLatchLegoWidget {
  /**
   * Slick Lego Mini-Widget: Q-Surface-Normal Snap & Draw.
   * Built directly from ThreeJSLoader + Library/CadModules slices (zero accuCad shell).
   */
  static async render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        width: '100%',
        background: '#070a13',
        border: '1.5px solid #21262d',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 14px 36px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column'
      }
    });

    let statusPill, latchBtn;
    const toolBtns = {};

    const header = makeElement('div', {
      style: {
        padding: '9px 14px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid #21262d',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' } }, [
        makeElement('span', { style: { fontSize: '14px' } }, '📐'),
        makeElement('strong', { style: { fontSize: '12.5px', color: '#00f2fe', fontFamily: 'monospace' } }, 'Lego Slice: Q-Surface-Normal Snap & Draw'),
        statusPill = makeElement('span', {
          style: { fontSize: '10px', background: 'rgba(16, 185, 129, 0.14)', color: '#10b981', border: '1px solid #10b98144', padding: '2px 7px', borderRadius: '10px', fontFamily: 'monospace' }
        }, 'ThreeJSLoader + AccuDraw + Snapping + Draw')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '5px', flexWrap: 'wrap' } }, [
        latchBtn = makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '3px 9px', fontSize: '10.5px', fontWeight: 'bold' },
          onclick: () => alignToLastHit()
        }, '[Q] Latch Face'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10.5px' },
          onclick: () => { slice?.setPlane('top'); statusPill.textContent = 'Plane: Top [0, 1, 0]'; }
        }, '[T] Reset Top')
      ])
    ]);
    wrap.appendChild(header);

    const toolbar = makeElement('div', {
      style: {
        padding: '6px 14px',
        background: '#0d1117',
        borderBottom: '1px solid #161e2b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        fontFamily: 'monospace',
        fontSize: '10.5px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', gap: '5px', alignItems: 'center' } }, [
        makeElement('span', { style: { color: '#94a3b8' } }, 'Draw on Face:'),
        ...['rectangle', 'path', 'circle', 'orbit'].map(t => {
          const b = makeElement('button', {
            className: `dr-tab-btn ${t === 'rectangle' ? 'active' : ''}`,
            style: { padding: '2px 8px', fontSize: '10px' },
            onclick: () => selectTool(t)
          }, t === 'orbit' ? '🖱️ Orbit' : t);
          toolBtns[t] = b;
          return b;
        })
      ]),
      makeElement('span', { style: { color: '#64748b' } }, 'Hover 45° slope + [Q] or click preset:')
    ]);
    wrap.appendChild(toolbar);

    const canvasId = 'lego-surface-latch-' + Math.random().toString(36).slice(2);
    const mount = makeElement('div', {
      id: canvasId,
      tabIndex: 0,
      style: { width: '100%', height: '320px', position: 'relative', background: '#050811', outline: 'none' }
    });
    wrap.appendChild(mount);

    const footer = makeElement('div', {
      style: {
        padding: '6px 14px',
        background: '#0a0e1a',
        borderTop: '1px solid #21262d',
        fontFamily: 'monospace',
        fontSize: '10.5px',
        color: '#94a3b8',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '6px'
      }
    }, [
      makeElement('span', {}, 'Quick Latch: '),
      makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 7px', fontSize: '10px' }, onclick: () => latchManual([0.7071, 0.7071, 0], '45° Chamfer') }, '45° Chamfer'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 7px', fontSize: '10px' }, onclick: () => latchManual([0, 0.5, 0.866], '60° Ramp') }, '60° Ramp'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 7px', fontSize: '10px', color: '#ff7b72' }, onclick: () => slice?.clearElements() }, 'Clear Drawn')
      ])
    ]);
    wrap.appendChild(footer);

    container.appendChild(wrap);

    let threeApp = null;
    let slice = null;
    let lastNormal = null;
    let lastPoint = null;

    function selectTool(t) {
      slice?.setTool(t);
      Object.entries(toolBtns).forEach(([k, b]) => b.classList.toggle('active', k === t));
    }

    function latchManual(normalArr, label) {
      if (!slice) return;
      slice.adapter.alignToSurfaceNormal(normalArr);
      slice.setOrigin([0, 0.3, 0]);
      statusPill.textContent = `Latched: ${label}`;
    }

    function alignToLastHit() {
      if (!slice || !lastNormal) {
        latchManual([0.7071, 0.7071, 0], '45° Chamfer');
        return;
      }
      slice.adapter.alignToSurfaceNormal(lastNormal);
      if (lastPoint) slice.setOrigin(lastPoint);
      statusPill.textContent = `Normal Latched: [${lastNormal.x.toFixed(2)}, ${lastNormal.y.toFixed(2)}, ${lastNormal.z.toFixed(2)}]`;
    }

    const boot = async () => {
      if (typeof ThreeJSLoader === 'undefined') return;
      threeApp = new ThreeJSLoader(canvasId, {
        cameraPos: { x: 2.6, y: 2.4, z: 3.4 },
        enableControls: true,
        useThickLines: true,
        useRaycaster: true,
        environment: false,
        lighting: true
      });
      await threeApp.init(mount);
      if (!wrap.isConnected) { threeApp.destroy(); return; }

      const THREE = threeApp.THREE;
      threeApp.scene.background = new THREE.Color(0x050811);

      // Chamfered 45° test wedge
      const shape = new THREE.Shape();
      shape.moveTo(-1.0, 0.0);
      shape.lineTo(1.0, 0.0);
      shape.lineTo(1.0, 0.65);
      shape.lineTo(-0.15, 1.35);
      shape.lineTo(-1.0, 1.35);
      shape.closePath();
      const geom = new THREE.ExtrudeGeometry(shape, { depth: 1.4, bevelEnabled: false });
      geom.translate(0, 0, -0.7);
      const mesh = new THREE.Mesh(geom, new THREE.MeshPhysicalMaterial({
        color: 0x1e3a5f,
        metalness: 0.15,
        roughness: 0.25,
        clearcoat: 0.85,
        transparent: true,
        opacity: 0.88
      }));
      threeApp.scene.add(mesh);

      const grid = new THREE.GridHelper(6, 12, 0x00f2fe, 0x1e293b);
      grid.position.y = -0.01;
      threeApp.scene.add(grid);

      slice = await threeApp.loadAccuDraw({
        size: 0.75,
        center: [0, 0.02, 0],
        showUi: false,
        keyboard: true,
        snapping: true,
        tools: true,
        initialTool: 'rectangle',
        viewMode: 'smart-drag',
        wheelZoomMode: 'when-focused',
        keyboardContainer: mount,
        extraContainers: [wrap]
      });

      mount.addEventListener('pointermove', (e) => {
        if (!threeApp?.camera || !threeApp?.THREE) return;
        const rect = mount.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        const rc = new THREE.Raycaster();
        rc.setFromCamera(new THREE.Vector2(x, y), threeApp.camera);
        const hits = rc.intersectObject(mesh, false);
        if (hits.length > 0 && hits[0].face) {
          lastNormal = hits[0].face.normal.clone().transformDirection(mesh.matrixWorld).normalize();
          lastPoint = [hits[0].point.x, hits[0].point.y, hits[0].point.z];
          slice.adapter._tentativeNormal = [lastNormal.x, lastNormal.y, lastNormal.z];
        }
      });
    };

    boot();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (threeApp) threeApp.isPaused = !entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    io.observe(wrap);

    const observer = new MutationObserver(() => {
      if (!document.body.contains(wrap)) {
        io.disconnect();
        if (slice) try { slice.destroy(); } catch (e) {}
        if (threeApp) try { threeApp.destroy(); } catch (e) {}
        observer.disconnect();
      }
    });
    observer.observe(wrap.parentNode || document.body, { childList: true });
  }
}

globalThis.CadSurfaceLatchLegoWidget = CadSurfaceLatchLegoWidget;
if (typeof module !== 'undefined' && module.exports) module.exports = CadSurfaceLatchLegoWidget;