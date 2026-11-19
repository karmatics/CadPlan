class CadCustomCommandLegoWidget {
  /**
   * Demonstrates registering ONE standalone custom CAD command ('pin')
   * using Library/CadModules.embed() without loading any of the 10 built-in CAD tools.
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

    let statusPill, countPill;
    let pinCount = 0;

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
        makeElement('span', { style: { fontSize: '14px' } }, '📍'),
        makeElement('strong', { style: { fontSize: '12.5px', color: '#00f2fe', fontFamily: 'monospace' } }, 'Lego Slice: 1 Custom Command ("Pin")'),
        statusPill = makeElement('span', {
          style: { fontSize: '10px', background: 'rgba(16, 185, 129, 0.14)', color: '#10b981', border: '1px solid #10b98144', padding: '2px 7px', borderRadius: '10px', fontFamily: 'monospace' }
        }, '0 Built-In Tools Loaded')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        countPill = makeElement('span', { style: { fontSize: '10.5px', color: '#f59e0b', fontFamily: 'monospace' } }, 'Pins: 0'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => embed?.slice?.setPlane('top')
        }, 'T: Top'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => embed?.slice?.setPlane('front')
        }, 'F: Front'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '3px 8px', fontSize: '10px', color: '#ff7b72' },
          onclick: () => clearPins()
        }, 'Clear Pins')
      ])
    ]);
    wrap.appendChild(header);

    const mountHost = makeElement('div', {
      style: { width: '100%', height: '310px', position: 'relative', background: '#050811' }
    });
    wrap.appendChild(mountHost);

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
      makeElement('span', {}, 'Click to drop a constrained 3D Pin • Drag to Orbit • L+R chord snaps to cube/sphere'),
      makeElement('span', { style: { color: '#38bdf8' } }, 'Powered by CadModules.embed()')
    ]);
    wrap.appendChild(footer);

    container.appendChild(wrap);

    let embed = null;
    const pinMeshes = [];

    function clearPins() {
      if (!embed?.threeApp?.scene) return;
      while (pinMeshes.length > 0) {
        const m = pinMeshes.pop();
        embed.threeApp.scene.remove(m);
        if (m.geometry) m.geometry.dispose();
        if (m.material) m.material.dispose();
      }
      pinCount = 0;
      countPill.textContent = 'Pins: 0';
    }

    const ensureCadModules = async () => {
      if (typeof globalThis.CadModules !== 'undefined') return true;
      const url = typeof LunoLoader !== 'undefined' && LunoLoader.resolveScriptUrl
        ? LunoLoader.resolveScriptUrl('Library/CadModules.js')
        : '/Library/CadModules.js';
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = url;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load Library/CadModules.js'));
        document.head.appendChild(s);
      });
      return typeof globalThis.CadModules !== 'undefined';
    };

    const boot = async () => {
      try {
        await ensureCadModules();
        if (!wrap.isConnected) return;

        embed = await globalThis.CadModules.embed(mountHost, {
          primitives: true,
          accudraw: true,
          keyboard: true,
          snapping: true,
          viewMode: 'smart-drag',
          wheelZoomMode: 'when-focused',
          extraContainers: [wrap]
        });

        const THREE = embed.threeApp.THREE;
        const pinGeo = new THREE.OctahedronGeometry(0.09, 0);

        embed.slice.registerCustomCommand('pin', {
          onPoint({ mode, point }) {
            if (mode !== 'click' || !point) return;
            const mat = new THREE.MeshPhysicalMaterial({
              color: 0xf59e0b,
              emissive: 0x78350f,
              roughness: 0.2,
              clearcoat: 1.0
            });
            const pin = new THREE.Mesh(pinGeo, mat);
            pin.position.set(point[0], point[1], point[2]);
            embed.threeApp.scene.add(pin);
            pinMeshes.push(pin);
            embed.slice.setOrigin(point);
            pinCount++;
            countPill.textContent = `Pins: ${pinCount}`;
            statusPill.textContent = `Pinned [${point.map(n => n.toFixed(2)).join(', ')}]`;
          }
        }, { hotkey: 'p', desc: 'Place Custom 3D Pin', activate: true });
      } catch (err) {
        mountHost.innerHTML = `<div style="padding:16px;color:#ff7b72;font-family:monospace;">Custom Lego demo error: ${err.message}</div>`;
      }
    };

    boot();

    const observer = new MutationObserver(() => {
      if (!document.body.contains(wrap)) {
        clearPins();
        if (embed && typeof embed.destroy === 'function') embed.destroy();
        observer.disconnect();
      }
    });
    observer.observe(wrap.parentNode || document.body, { childList: true });
  }
}

globalThis.CadCustomCommandLegoWidget = CadCustomCommandLegoWidget;
if (typeof module !== 'undefined' && module.exports) module.exports = CadCustomCommandLegoWidget;