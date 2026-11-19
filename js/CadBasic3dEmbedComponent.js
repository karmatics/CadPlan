class CadBasic3dEmbedComponent {
  /**
   * Modular Lego 3D Embed Component for DocumentReader / CadPlan.
   * Mounts Basic3D cleanly without preloading AccuDraw or CAD Tools.
   * Demonstrates on-demand Lego composition:
   * 1. Base 3D Scene (Basic3d)
   * 2. + AccuDraw Compass & Cooperative Scoped Keyboard
   * 3. + CAD Drawing & Modify Tools + Nav Mode Switcher
   */
  static _loadPromise = null;

  static resolveBasic3dUrl(relPath = 'Basic3d.js') {
    const clean = String(relPath).replace(/^\/+/, '');
    if (typeof window !== 'undefined' && window.location) {
      const host = window.location.hostname || '';
      if (host.endsWith('.github.io')) {
        const user = host.split('.')[0] || 'karmatics';
        return `https://${user}.github.io/Basic3D/${clean}`;
      }
      if (window.location.protocol === 'about:') {
        try {
          const pHost = window.parent?.location?.hostname || '';
          if (pHost.endsWith('.github.io')) {
            return `https://${pHost.split('.')[0] || 'karmatics'}.github.io/Basic3D/${clean}`;
          }
          if (window.parent?.location?.origin && window.parent.location.origin !== 'null') {
            return `${window.parent.location.origin}/Basic3D/${clean}`;
          }
        } catch (e) {}
        return `https://karmatics.github.io/Basic3D/${clean}`;
      }
    }
    return `/Basic3D/${clean}`;
  }

  static async ensureBasic3dLoaded() {
    if (typeof globalThis.Basic3d !== 'undefined') return true;
    if (this._loadPromise) return await this._loadPromise;

    this._loadPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = this.resolveBasic3dUrl('Basic3d.js');
      s.onload = () => resolve(Boolean(globalThis.Basic3d));
      s.onerror = () => reject(new Error('Failed to load Basic3D/Basic3d.js'));
      document.head.appendChild(s);
    });
    return await this._loadPromise;
  }

  static async render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        width: '100%',
        background: '#070a13',
        border: '1.5px solid #21262d',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }
    });

    let sliceStatusBadge, keyFocusBadge;

    const header = makeElement('div', {
      style: {
        padding: '10px 14px',
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
        makeElement('span', { style: { fontSize: '15px' } }, '🧱'),
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'Basic3D Lego Embed (Composable CAD)'),
        sliceStatusBadge = makeElement('span', {
          style: {
            fontSize: '10px',
            background: 'rgba(56, 189, 248, 0.14)',
            color: '#38bdf8',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            padding: '2px 8px',
            borderRadius: '12px',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }
        }, 'Base: Lean 3D Scene')
      ]),
      keyFocusBadge = makeElement('span', {
        style: {
          fontSize: '10px',
          background: 'rgba(100, 116, 139, 0.15)',
          color: '#94a3b8',
          border: '1px solid #334155',
          padding: '2px 8px',
          borderRadius: '12px',
          fontFamily: 'monospace'
        }
      }, '⌨️ Keys: Yielded to Document')
    ]);
    wrap.appendChild(header);

    const grid = makeElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: '245px 1fr',
        minHeight: '460px',
        background: '#0d1117',
        gap: '1px'
      }
    });

    const uiTray = makeElement('div', {
      style: {
        background: '#0f141e',
        borderRight: '1px solid #21262d',
        overflowY: 'auto',
        maxHeight: '520px'
      }
    });

    const canvasMount = makeElement('div', {
      style: {
        position: 'relative',
        minHeight: '460px',
        width: '100%',
        background: '#161b22'
      }
    });

    grid.appendChild(uiTray);
    grid.appendChild(canvasMount);
    wrap.appendChild(grid);

    const footer = makeElement('div', {
      style: {
        padding: '7px 14px',
        background: '#0a0e1a',
        borderTop: '1px solid #21262d',
        fontSize: '11px',
        fontFamily: 'monospace',
        color: '#94a3b8',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('span', {}, 'Click "Load AccuDraw" or "Load CAD Tools" on the left to snap capabilities onto Basic3D.'),
      makeElement('span', { style: { color: '#10b981' } }, 'Click outside to return keyboard & wheel scroll to document')
    ]);
    wrap.appendChild(footer);

    container.appendChild(wrap);

    let basic3dInstance = null;
    let isSuspended = false;

    const boot = async () => {
      try {
        await this.ensureBasic3dLoaded();
        if (!wrap.isConnected) return;

        basic3dInstance = new globalThis.Basic3d();
        await basic3dInstance.run({
          container: canvasMount,
          inlineUi: true,
          uiContainer: uiTray,
          onSliceStateChange: ({ accuDraw, tools }) => {
            if (!accuDraw) {
              sliceStatusBadge.textContent = 'Base: Lean 3D Scene';
              sliceStatusBadge.style.color = '#38bdf8';
            } else if (!tools) {
              sliceStatusBadge.textContent = '+ AccuDraw + Keys';
              sliceStatusBadge.style.color = '#00f2fe';
            } else {
              sliceStatusBadge.textContent = '+ AccuDraw + Keys + CAD Tools';
              sliceStatusBadge.style.color = '#10b981';
            }
          },
          onKeyboardFocusChange: (focused) => {
            if (focused) {
              keyFocusBadge.textContent = '⌨️ Keys: Active on 3D View';
              keyFocusBadge.style.color = '#10b981';
              keyFocusBadge.style.borderColor = '#10b98166';
            } else {
              keyFocusBadge.textContent = '⌨️ Keys: Yielded to Document';
              keyFocusBadge.style.color = '#94a3b8';
              keyFocusBadge.style.borderColor = '#334155';
            }
          }
        });
      } catch (err) {
        canvasMount.innerHTML = `<div style="padding:20px;color:#ff7b72;font-family:monospace;">Could not load Basic3D embed: ${err.message}</div>`;
      }
    };

    boot();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isSuspended = !entry.isIntersecting;
        if (basic3dInstance?.app) {
          basic3dInstance.app.isPaused = isSuspended;
        }
      });
    }, { threshold: 0.1 });
    io.observe(wrap);

    const observer = new MutationObserver(() => {
      if (!document.body.contains(wrap)) {
        io.disconnect();
        if (basic3dInstance && typeof basic3dInstance.destroy === 'function') {
          try { basic3dInstance.destroy(); } catch (e) {}
        }
        observer.disconnect();
      }
    });
    observer.observe(wrap.parentNode || document.body, { childList: true });
  }
}

globalThis.CadBasic3dEmbedComponent = CadBasic3dEmbedComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadBasic3dEmbedComponent;