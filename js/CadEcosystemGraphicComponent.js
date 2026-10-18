class CadEcosystemGraphicComponent {

  static render(container) {
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
          makeElement('span', { style: { fontSize: '15px' } }, '🧩'),
          makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'Federated Multi-App Architecture: Decomposing the Monolith'),
          makeElement('span', { style: { fontSize: '10px', background: '#8257e5', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, '6 Standalone Sub-Apps')
        ]),
        makeElement('span', { style: { fontSize: '11px', color: '#10b981', fontFamily: 'monospace' } }, 'The Document is the Living Orchestrator')
      ]);
      wrap.appendChild(header);

      // 2. Sub-App Switcher Tabs
      const subAppTabs = makeElement('div', {
        style: {
          padding: '8px 14px',
          background: '#0d1117',
          borderBottom: '1px solid #161e2b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '11px',
          fontFamily: 'monospace'
        }
      });

      const tabButtonsGroup = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } });

      const btnArchMap = makeElement('button', { className: 'dr-tab-btn active', id: 'eco-btn-map', onclick: () => showView('map') }, '🗺️ Ecosystem Map');
      const btnCompass = makeElement('button', { className: 'dr-tab-btn', id: 'eco-btn-compass', onclick: () => showView('compass') }, '🧭 CompassApp');
      const btnKeyCmd = makeElement('button', { className: 'dr-tab-btn', id: 'eco-btn-keycmd', onclick: () => showView('keycmd') }, '⌨️ KeyCommandApp');
      const btnAccuCad = makeElement('button', { className: 'dr-tab-btn', id: 'eco-btn-accucad', onclick: () => showView('accucad') }, '📐 accuCad (Full)');
      const btnTouch = makeElement('button', { className: 'dr-tab-btn', id: 'eco-btn-touch', onclick: () => showView('touch') }, '📱 TouchController');

      tabButtonsGroup.appendChild(btnArchMap);
      tabButtonsGroup.appendChild(btnCompass);
      tabButtonsGroup.appendChild(btnKeyCmd);
      tabButtonsGroup.appendChild(btnAccuCad);
      tabButtonsGroup.appendChild(btnTouch);

      const rightBadge = makeElement('span', {
        id: 'eco-view-badge',
        style: { color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 8px', borderRadius: '12px' }
      }, 'Viewing: Ecosystem Topology Map');

      subAppTabs.appendChild(tabButtonsGroup);
      subAppTabs.appendChild(rightBadge);
      wrap.appendChild(subAppTabs);

      // 3. Stage Mount Area
      const stageArea = makeElement('div', {
        id: 'eco-stage-mount',
        style: {
          flex: 1,
          width: '100%',
          minHeight: '420px',
          position: 'relative',
          background: '#090d16',
          overflow: 'hidden'
        }
      });
      wrap.appendChild(stageArea);

      container.appendChild(wrap);

      function showView(viewId) {
        stageArea.innerHTML = '';

        document.querySelectorAll('#eco-btn-map, #eco-btn-compass, #eco-btn-keycmd, #eco-btn-accucad, #eco-btn-touch').forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById(`eco-btn-${viewId}`);
        if (activeBtn) activeBtn.classList.add('active');

        const badge = document.getElementById('eco-view-badge');

        if (viewId === 'map') {
          if (badge) badge.textContent = 'Viewing: Ecosystem Topology Map';
          renderTopologyMap(stageArea);
        } else if (viewId === 'compass') {
          if (badge) badge.textContent = 'Embedded App: CompassApp (Isolated Squircle Studio)';
          renderIframeEmbed(stageArea, '../Luno/CompassApp/index.html', 'CompassApp Standalone Viewport');
        } else if (viewId === 'keycmd') {
          if (badge) badge.textContent = 'Embedded App: KeyCommandApp (Single-Stroke Dispatch Engine)';
          renderIframeEmbed(stageArea, '../Luno/KeyCommandApp/index.html', 'KeyCommandApp Standalone Harness');
        } else if (viewId === 'accucad') {
          if (badge) badge.textContent = 'Embedded App: accuCad (Full CAD Workstation)';
          renderIframeEmbed(stageArea, '../accuCad/index.html', 'accuCad Full Production Workstation');
        } else if (viewId === 'touch') {
          if (badge) badge.textContent = 'Embedded App: TouchController (Two-Handed Glass Surface)';
          renderTouchEmbed(stageArea);
        }
      }

      function renderIframeEmbed(target, srcUrl, title) {
        const topBar = makeElement('div', {
          style: {
            padding: '6px 14px', background: '#0a0e1a', borderBottom: '1px solid #1e293b',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontFamily: 'monospace'
          }
        }, [
          makeElement('span', { style: { color: '#cbd5e1' } }, `📱 Live Sub-App Mount: ${srcUrl}`),
          makeElement('a', {
            href: srcUrl, target: '_blank',
            style: { color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }
          }, '↗ Open Standalone Tab')
        ]);

        const iframe = makeElement('iframe', {
          src: srcUrl,
          style: { width: '100%', height: '420px', border: 'none', display: 'block', background: '#070a13' },
          title: title
        });

        target.appendChild(topBar);
        target.appendChild(iframe);
      }

      function renderTouchEmbed(target) {
        const roomId = 'cad_demo_' + Math.random().toString(36).substring(2, 6);
        const hostIp = window.location.hostname || 'localhost';
        const touchUrl = `http://${hostIp}:${window.location.port || 3000}/TouchController/?room=${roomId}`;
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(touchUrl)}`;

        const card = makeElement('div', {
          style: {
            padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '14px', color: '#e2e8f0', fontFamily: 'monospace'
          }
        }, [
          makeElement('strong', { style: { color: '#f59e0b', fontSize: '13px' } }, '📱 Live TouchController P2P Pairing'),
          makeElement('div', { style: { background: '#fff', padding: '10px', borderRadius: '10px' } }, [
            makeElement('img', { src: qrApiUrl, style: { width: '160px', height: '160px', display: 'block' } })
          ]),
          makeElement('div', { style: { fontSize: '11px', color: '#94a3b8', textAlign: 'center' } }, [
            'Scan with your phone camera on the same Wi-Fi to test the mobile trackpad surface live.<br>',
            makeElement('a', { href: touchUrl, target: '_blank', style: { color: '#38bdf8' } }, 'Or open mobile simulator in new tab ↗')
          ])
        ]);

        target.appendChild(card);
      }

      function renderTopologyMap(target) {
        const W = 760, H = 380;
        const svg = makeElement('svg:svg', {
          viewBox: `0 0 ${W} ${H}`, width: '100%', height: '380px',
          style: { display: 'block', background: '#050811' }
        });

        const makeCard = (x, y, w, h, icon, title, subtitle, pathStr, col) => {
          const g = makeElement('svg:g', { transform: `translate(${x}, ${y})` });
          g.appendChild(makeElement('svg:rect', {
            width: w, height: h, rx: '8', fill: '#0a0d16', stroke: col, 'stroke-width': '1.5'
          }));
          g.appendChild(makeElement('svg:text', { x: 14, y: 22, fill: col, 'font-family': 'monospace', 'font-size': '12px', 'font-weight': 'bold' }, `${icon} ${title}`));
          g.appendChild(makeElement('svg:text', { x: 14, y: 38, fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold' }, subtitle));
          g.appendChild(makeElement('svg:text', { x: 14, y: 54, fill: '#64748b', 'font-family': 'monospace', 'font-size': '9px' }, pathStr));
          return g;
        };

        const connect = (x1, y1, x2, y2, col) => makeElement('svg:line', {
          x1, y1, x2, y2, stroke: col, 'stroke-width': '1.5', 'stroke-dasharray': '4,3', opacity: '0.7'
        });

        // Central Hub: CadPlan (The Master Document & Orchestrator)
        svg.appendChild(makeCard(270, 150, 220, 68, '📐', 'CadPlan (Document)', 'The Master Living Specification', 'CadPlan/ • DocumentReader', '#00f2fe'));

        // Sub-App 1: CompassApp
        svg.appendChild(makeCard(30, 30, 210, 64, '🧭', 'CompassApp', 'Isolated 3D Squircle Studio', 'Luno/CompassApp/ • Three.js', '#38bdf8'));
        svg.appendChild(connect(240, 62, 270, 160, '#38bdf8'));

        // Sub-App 2: KeyCommandApp
        svg.appendChild(makeCard(275, 30, 210, 64, '⌨️', 'KeyCommandApp', 'Single-Stroke Key Engine', 'Luno/KeyCommandApp/ • & Syntax', '#f59e0b'));
        svg.appendChild(connect(380, 94, 380, 150, '#f59e0b'));

        // Sub-App 3: TouchController
        svg.appendChild(makeCard(520, 30, 210, 64, '📱', 'TouchController', 'Mobile WebRTC Glass Deck', 'TouchController/ • Two-Handed', '#10b981'));
        svg.appendChild(connect(520, 62, 490, 160, '#10b981'));

        // Sub-App 4: accuCad
        svg.appendChild(makeCard(30, 270, 210, 64, '🏛️', 'accuCad', 'Full 3D CAD Workstation', 'accuCad/ • All Instruments Joined', '#a855f7'));
        svg.appendChild(connect(240, 302, 270, 200, '#a855f7'));

        // Sub-App 5: Library
        svg.appendChild(makeCard(520, 270, 210, 64, '📚', 'Library (Shared Hub)', 'Zero-Copy Dependency Modules', 'Library/ • DomBasics / ThreeJSLoader', '#e11d48'));
        svg.appendChild(connect(520, 302, 490, 200, '#e11d48'));

        target.appendChild(svg);
      }

      showView('map');
    }
}

globalThis.CadEcosystemGraphicComponent = CadEcosystemGraphicComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadEcosystemGraphicComponent;