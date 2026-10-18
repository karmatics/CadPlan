class CadPlan {
  constructor() {
    this.reader = null;
    this.sidePanel = null;
    this.rootElement = null;
    this.activePageId = 'meta';
    this._safeAreaHandler = null;
  }

  async run(env) {
    if (this.rootElement) {
      this.destroy();
    }

    if (!env || !env.container) {
      throw new Error('[CadPlan] run() requires an environment object with a valid container.');
    }

    this.env = env;
    this.rootElement = env.container;

    this.rootElement.style.overflowY = 'auto';
    this.rootElement.style.height = 'auto';
    this.rootElement.style.minHeight = '100vh';
    this.rootElement.style.boxSizing = 'border-box';
    this.rootElement.style.transition = 'margin-left 0.25s cubic-bezier(0.2, 0.0, 0.2, 1), width 0.25s cubic-bezier(0.2, 0.0, 0.2, 1)';

    if (typeof KeyCommandHandler !== 'undefined' && typeof KeyCommandHandler.setPaused === 'function') {
      KeyCommandHandler.setPaused(true);
    }

    const pages = [
      { id: 'meta', title: '0. Living Dossier & Methodology', docClass: () => globalThis.CadPlanMetaContent },
      { id: 'origins', title: '1. My Story & The Playbook', docClass: () => globalThis.CadOriginsContent },
      { id: 'philosophy', title: '2. The Squircle Compass', docClass: () => globalThis.AccuDrawPhilosophyContent },
      { id: 'accucad', title: '3. Inside accuCad (Snapping & Kinematics)', docClass: () => globalThis.AccuCadAuditContent },
      { id: 'shortcuts', title: '4. Key Command Engine (Single Stroke & Ranges)', docClass: () => globalThis.KeyCommandEngineContent },
      { id: 'curvedrawer', title: '5. The Curve Drawer (On-Curve & Kinetic String)', docClass: () => globalThis.CadCurveDrawerContent },
      { id: 'touchp2p', title: '6. Wireless TouchController (Two-Handed CAD)', docClass: () => globalThis.CadTouchP2PContent },
      { id: 'demos', title: '7. Production Studio (AccuDraw & 3D Parallax)', docClass: () => globalThis.CadInteractiveDemoContent },
      { id: 'ecosystem', title: '8. Luno Loop & Self-Replication', docClass: () => globalThis.CadLunoEcosystemContent },
      { id: 'architecture', title: '9. Headless Kernel & Open Architecture', docClass: () => globalThis.CadArchitectureDecisionsContent },
      { id: 'cadcraft', title: '10. ArtCraft CADCraft & CompassDraw', docClass: () => globalThis.CadCraftIntegrationContent },
      { id: 'itwin', title: '11. iTwin Parity & SmartLine Spec', docClass: () => globalThis.CadITwinParityContent },
      { id: 'interview', title: "12. Inventor's Vision & Roadmap", docClass: () => globalThis.CadVisionInterviewContent }
    ];

    // 1. Launch DocumentReader
    this.reader = new DocumentReader({
      container: env.container,
      brandTitle: 'Next-Gen CAD Architecture',
      brandIcon: '📐',
      pages: pages
    });

    await this.reader.init();

    // 2. Instantiate SidePanel from Library/SidePanel.js
    if (typeof SidePanel !== 'undefined') {
      // Pass null for env so the side panel mounts to document.body with position: fixed
      this.sidePanel = new SidePanel('left', 340, null);
      this._buildSidePanelNavigation(pages);

      // Listen for safe-area changes so the main document canvas shifts smoothly
      this._safeAreaHandler = (e) => {
        const left = e.detail?.left || 0;
        if (this.rootElement) {
          this.rootElement.style.marginLeft = `${left}px`;
          this.rootElement.style.width = left > 0 ? `calc(100% - ${left}px)` : '100%';
        }
      };
      window.addEventListener('layout-safe-area-change', this._safeAreaHandler);

      // Open the side panel by default on launch
      this.sidePanel.open();
    }

    // 3. Add '☰ Chapters' toggle button to DocumentReader header
    this._setupHeaderToggleButton();

    return this;
  }

  _buildSidePanelNavigation(pages) {
    if (!this.sidePanel) return;

    // Custom SidePanel Header title
    const headerTitle = document.createElement('div');
    headerTitle.style.cssText = 'font-family: monospace; font-size: 11px; font-weight: bold; color: #38bdf8; display: flex; align-items: center; gap: 6px;';
    headerTitle.innerHTML = '<span>📐</span><span>CadPlan Chapters</span>';
    this.sidePanel.header.insertBefore(headerTitle, this.sidePanel.header.firstChild);

    const container = this.sidePanel.contentContainer;
    container.innerHTML = '';
    container.style.cssText = 'flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px; display: flex; flexDirection: column; gap: 8px;';

    // Top Brand Card
    const brandCard = document.createElement('div');
    brandCard.style.cssText = 'background: rgba(15, 23, 42, 0.7); border: 1px solid #1e293b; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px;';
    brandCard.innerHTML = `
      <div style="font-size: 11.5px; font-weight: bold; color: #f8fafc; font-family: monospace; display: flex; align-items: center; gap: 6px;">
        <span>📐</span> Next-Gen CAD Architecture
      </div>
      <div style="font-size: 10px; color: #94a3b8; margin-top: 4px; line-height: 1.4;">
        Rob Brown • 13 Chapters Living Specification &amp; Interactive Engineering Dossier
      </div>
    `;
    container.appendChild(brandCard);

    // Section 1: Chapters List
    const chaptersWrapper = document.createElement('div');
    chaptersWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';

    pages.forEach((page) => {
      const btn = document.createElement('button');
      btn.className = 'cadplan-chapter-item';
      btn.dataset.pageId = page.id;
      const isCur = page.id === this.activePageId;

      btn.style.cssText = `
        text-align: left;
        background: ${isCur ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.02)'};
        border: 1px solid ${isCur ? '#38bdf8' : '#1e293b'};
        color: ${isCur ? '#38bdf8' : '#cbd5e1'};
        padding: 8px 10px;
        border-radius: 6px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
        font-size: 11px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
        line-height: 1.35;
        display: block;
        width: 100%;
        box-sizing: border-box;
      `;

      btn.textContent = page.title;

      btn.onmouseenter = () => {
        if (btn.dataset.pageId !== this.activePageId) {
          btn.style.background = 'rgba(255, 255, 255, 0.06)';
          btn.style.borderColor = '#334155';
          btn.style.color = '#f8fafc';
        }
      };
      btn.onmouseleave = () => {
        if (btn.dataset.pageId !== this.activePageId) {
          btn.style.background = 'rgba(255, 255, 255, 0.02)';
          btn.style.borderColor = '#1e293b';
          btn.style.color = '#cbd5e1';
        }
      };

      btn.onclick = () => {
        this.selectChapter(page.id);
      };

      chaptersWrapper.appendChild(btn);
    });
    container.appendChild(chaptersWrapper);

    // Section 2: Action Tools Deck
    const toolsBox = document.createElement('div');
    toolsBox.style.cssText = 'margin-top: 14px; padding-top: 10px; border-top: 1px solid #1e293b; display: flex; flex-direction: column; gap: 6px;';

    const toolTitle = document.createElement('div');
    toolTitle.style.cssText = 'font-size: 9.5px; text-transform: uppercase; color: #64748b; font-weight: bold; letter-spacing: 0.06em; margin-bottom: 2px;';
    toolTitle.textContent = 'Dossier Tools & Dialogs';
    toolsBox.appendChild(toolTitle);

    const makeToolBtn = (label, icon, color, onClick) => {
      const b = document.createElement('button');
      b.style.cssText = `
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid ${color}44;
        background: ${color}11;
        color: ${color};
        font-family: monospace;
        font-size: 10.5px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.15s ease;
        text-align: left;
      `;
      b.innerHTML = `<span>${icon}</span><span>${label}</span>`;
      b.onmouseenter = () => { b.style.background = `${color}25`; };
      b.onmouseleave = () => { b.style.background = `${color}11`; };
      b.onclick = onClick;
      return b;
    };

    toolsBox.appendChild(makeToolBtn('Prompt Bundler', '📋', '#38bdf8', () => {
      if (typeof CadPromptBundlerDialog !== 'undefined') CadPromptBundlerDialog.open();
    }));

    toolsBox.appendChild(makeToolBtn('Author Voice Notes', '🎙️', '#f59e0b', () => {
      if (typeof CadPlanNotesManager !== 'undefined') CadPlanNotesManager.openDialog();
    }));

    toolsBox.appendChild(makeToolBtn('Evolution Directives', '⚡', '#10b981', () => {
      if (typeof CadPlanItemNotes !== 'undefined') CadPlanItemNotes.openPromptBuilderDialog(this.reader);
    }));

    toolsBox.appendChild(makeToolBtn('Touch Controller Pair', '📱', '#a855f7', () => {
      if (typeof CadTouchPairingDialog !== 'undefined') CadTouchPairingDialog.open();
    }));

    container.appendChild(toolsBox);
  }

  selectChapter(pageId) {
    this.activePageId = pageId;

    // 1. Invoke DocumentReader's page switching
    if (this.reader) {
      if (typeof this.reader.selectPage === 'function') {
        try { this.reader.selectPage(pageId); } catch(e) {}
      } else if (typeof this.reader.setPage === 'function') {
        try { this.reader.setPage(pageId); } catch(e) {}
      } else if (typeof this.reader.goToPage === 'function') {
        try { this.reader.goToPage(pageId); } catch(e) {}
      } else if (typeof this.reader.openPage === 'function') {
        try { this.reader.openPage(pageId); } catch(e) {}
      }
    }

    // 2. Click matching DOM tab button in DocumentReader if present
    const navContainer = this.rootElement?.querySelector('.dr-header-nav, .dr-nav-tabs, .dr-tabs, header nav, nav');
    if (navContainer) {
      const btns = Array.from(navContainer.querySelectorAll('button, .dr-tab-btn, .dr-nav-btn, .dr-tab'));
      const target = btns.find(b =>
        b.dataset?.pageId === pageId ||
        b.dataset?.id === pageId ||
        b.getAttribute('data-id') === pageId ||
        b.textContent.toLowerCase().includes(pageId.toLowerCase())
      );
      if (target) {
        target.click();
      }
    }

    // 3. Update active highlight in SidePanel
    if (this.sidePanel) {
      const items = this.sidePanel.contentContainer.querySelectorAll('.cadplan-chapter-item');
      items.forEach(btn => {
        const isCur = btn.dataset.pageId === pageId;
        btn.style.background = isCur ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.02)';
        btn.style.borderColor = isCur ? '#38bdf8' : '#1e293b';
        btn.style.color = isCur ? '#38bdf8' : '#cbd5e1';
      });
    }

    // 4. Scroll reading container to top smoothly
    if (this.rootElement) {
      this.rootElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  _setupHeaderToggleButton() {
    requestAnimationFrame(() => {
      const headerNav = this.rootElement?.querySelector('header.dr-header, .dr-header');
      if (headerNav && !headerNav.querySelector('#btn-toggle-chapters-sidepanel')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'btn-toggle-chapters-sidepanel';
        toggleBtn.style.cssText = `
          background: #161e2b;
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.4);
          padding: 4px 10px;
          border-radius: 6px;
          font-family: monospace;
          font-size: 11px;
          font-weight: bold;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-right: 8px;
        `;
        toggleBtn.innerHTML = '<span>☰</span><span>Chapters</span>';
        toggleBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (this.sidePanel) {
            if (this.sidePanel.isOpen) {
              this.sidePanel.close();
            } else {
              this.sidePanel.open();
            }
          }
        };

        headerNav.insertBefore(toggleBtn, headerNav.firstChild);
      }

      const copyBtn = document.getElementById('btn-copy-markdown');
      if (copyBtn) {
        copyBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (typeof CadPromptBundlerDialog !== 'undefined') {
            CadPromptBundlerDialog.open();
          }
        };
      }
    });
  }

  destroy() {
    if (this._safeAreaHandler) {
      window.removeEventListener('layout-safe-area-change', this._safeAreaHandler);
      this._safeAreaHandler = null;
    }

    if (this.sidePanel) {
      this.sidePanel.destroy();
      this.sidePanel = null;
    }

    if (this.reader && typeof this.reader.destroy === 'function') {
      try {
        this.reader.destroy();
      } catch (e) {}
      this.reader = null;
    }

    // Reset safe area when unmounted
    if (typeof UITools !== 'undefined' && typeof UITools.setSafeArea === 'function') {
      UITools.setSafeArea({ left: 0, right: 0, top: 0, bottom: 0 });
    }

    this.rootElement = null;
  }
}

globalThis.CadPlan = CadPlan;
window.CadPlan = CadPlan;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlan;