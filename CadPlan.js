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

      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflowY = 'auto';

      // The root element acts as the full workspace wrapper; DocumentReader will handle its inner flex container cleanly
      this.rootElement.style.overflowX = 'hidden';
      this.rootElement.style.overflowY = 'visible';
      this.rootElement.style.height = 'auto';
      this.rootElement.style.minHeight = '100vh';
      this.rootElement.style.boxSizing = 'border-box';
      this.rootElement.style.marginLeft = '0px';
      this.rootElement.style.width = '100%';

      KeyCommandHandler.setPaused(true);

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

      this.reader = new DocumentReader({
        container: env.container,
        brandTitle: 'Next-Gen CAD Architecture',
        brandIcon: '📐',
        dossierId: 'CadPlan',
        pages: pages
      });

      await this.reader.init();

      this.sidePanel = new SidePanel('left', 320, null);
      this._buildSidePanelNavigation(pages);
      this.sidePanel.open();

      this.aardvark = new CadPlanAardvark({ container: this.rootElement, dossierId: 'CadPlan' });
      this.aardvark.init();

      this._setupHeaderToggleButton();
      return this;
    }

  _buildSidePanelNavigation(pages) {
      if (!this.sidePanel) return;

      globalThis._cadPlanInstance = this;

      this.sidePanel.header.innerHTML = '';
      const headerTitle = document.createElement('div');
      headerTitle.style.cssText = 'font-family: var(--cp-font-mono, monospace); font-size: 11px; font-weight: 800; color: #00f2fe; display: flex; align-items: center; gap: 8px; flex: 1;';
      headerTitle.innerHTML = '<span>📐</span><span>CadPlan Workspace</span>';

      const closeBtn = document.createElement('button');
      closeBtn.className = 'dr-nav-btn';
      closeBtn.style.cssText = 'padding: 3px 8px; font-size: 10px; border-radius: 4px;';
      closeBtn.textContent = '✕';
      closeBtn.onclick = () => this.sidePanel.close();

      this.sidePanel.header.appendChild(headerTitle);
      this.sidePanel.header.appendChild(closeBtn);

      const container = this.sidePanel.contentContainer;
      container.innerHTML = '';
      container.style.cssText = 'flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px; display: flex; flex-direction: column; gap: 10px; font-family: var(--cp-font-sans, system-ui);';

      CommunityOracle.loadProfiles();
      const activeProfile = CommunityOracle.getAllProfiles()[0] || null;

      const identityBox = document.createElement('div');
      identityBox.style.cssText = 'background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 8px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-family: monospace;';

      const idText = activeProfile ? `${activeProfile.name} #${activeProfile.tag}` : 'Rob Brown #1001';
      const idRep = activeProfile ? Math.round((activeProfile.reputation || 0.98) * 100) : 98;

      identityBox.innerHTML = `
        <div>
          <strong style="color: #00f2fe; display: block;">🌐 ${idText}</strong>
          <span style="color: #10b981; font-size: 10px;">${idRep}% Rep Weight</span>
        </div>
      `;

      const btnSwitch = document.createElement('button');
      btnSwitch.className = 'dr-nav-btn';
      btnSwitch.style.cssText = 'font-size: 10px; padding: 3px 8px; color: #00f2fe;';
      btnSwitch.textContent = 'Switch';
      btnSwitch.onclick = () => {
        const content = makeElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' } });
        CommunityOracle.getAllProfiles().forEach(p => {
          content.appendChild(makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '6px 8px', textAlign: 'left', display: 'flex', flexDirection: 'column' },
            onclick: () => {
              identityBox.querySelector('strong').textContent = `🌐 ${p.name} #${p.tag}`;
              identityBox.querySelector('span').textContent = `${Math.round((p.reputation || 0.5) * 100)}% Rep Weight`;
              dlg.close();
            }
          }, [
            makeElement('strong', { style: { color: '#00f2fe', fontSize: '11px' } }, `${p.name} #${p.tag}`),
            makeElement('span', { style: { color: '#10b981', fontSize: '9px', fontFamily: 'monospace' } }, `${Math.round((p.reputation || 0.5) * 100)}% Rep`)
          ]));
        });

        const dlg = UITools.makeDialog({
          title: 'Switch Community Identity',
          contentElement: content,
          width: '380px'
        });
      };

      identityBox.appendChild(btnSwitch);
      container.appendChild(identityBox);

      const searchInput = document.createElement('input');
      searchInput.className = 'cp-sidebar-search';
      searchInput.placeholder = '🔍 Filter chapters, labs, or topics...';
      searchInput.oninput = (e) => {
        const q = e.target.value.toLowerCase().trim();
        container.querySelectorAll('.cp-chapter-card').forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = (!q || text.includes(q)) ? 'block' : 'none';
        });
      };
      container.appendChild(searchInput);

      const chaptersWrapper = document.createElement('div');
      chaptersWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

      const localMap = CadPlanItemNotes.getLocalMap();

      pages.forEach((page) => {
        const doc = page.docClass ? page.docClass() : null;
        const manifest = doc?.manifest ? doc.manifest() : [];
        const isCur = page.id === this.activePageId;

        let chapterNotesCount = 0;
        Object.keys(localMap).forEach(k => {
          if (k.includes(`:${page.id}:`)) {
            chapterNotesCount += (localMap[k] || []).filter(n => n.status !== 'resolved').length;
          }
        });

        const hasLab = manifest.some(sec => (sec.blocks || []).some(b => b.type === 'component'));

        const card = document.createElement('div');
        card.className = `cp-chapter-card ${isCur ? 'active' : ''}`;
        card.dataset.pageId = page.id;

        const headerRow = document.createElement('div');
        headerRow.className = 'cp-chapter-header-row';

        const leftGroup = document.createElement('div');
        leftGroup.style.cssText = 'display: flex; align-items: flex-start; gap: 8px; flex: 1; min-width: 0;';

        const chevron = document.createElement('span');
        chevron.className = 'cp-chapter-chevron';
        chevron.style.cssText = 'font-size: 9px; color: #64748b; width: 10px; flex-shrink: 0; margin-top: 2px;';
        chevron.textContent = isCur ? '▼' : '▶';

        // Parse chapter number vs title text cleanly
        const titleParts = page.title.split('.');
        const chapterNum = titleParts[0].trim();
        const chapterName = titleParts.slice(1).join('.').trim() || page.title;

        const numBadge = document.createElement('span');
        numBadge.className = 'cp-chapter-num-badge';
        numBadge.textContent = chapterNum;

        const titleText = document.createElement('span');
        titleText.className = 'cp-chapter-title-text';
        titleText.textContent = chapterName;

        leftGroup.appendChild(chevron);
        leftGroup.appendChild(numBadge);
        leftGroup.appendChild(titleText);
        headerRow.appendChild(leftGroup);

        const badgesGroup = document.createElement('div');
        badgesGroup.style.cssText = 'display: flex; gap: 4px; align-items: center; flex-shrink: 0; margin-top: 1px;';

        if (hasLab) {
          const labBadge = document.createElement('span');
          labBadge.style.cssText = 'background: rgba(245, 158, 11, 0.18); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.4); font-size: 8.5px; padding: 1px 5px; border-radius: 4px; font-weight: 800; font-family: var(--cp-font-mono);';
          labBadge.textContent = '⚡ Lab';
          badgesGroup.appendChild(labBadge);
        }

        if (chapterNotesCount > 0) {
          const noteBadge = document.createElement('span');
          noteBadge.style.cssText = 'background: rgba(0, 242, 254, 0.2); color: #00f2fe; border: 1px solid #00f2fe88; font-size: 9px; padding: 1px 6px; border-radius: 10px; font-weight: 800; font-family: monospace;';
          noteBadge.textContent = `${chapterNotesCount} 📝`;
          badgesGroup.appendChild(noteBadge);
        }

        headerRow.appendChild(badgesGroup);
        card.appendChild(headerRow);

        const sectionsList = document.createElement('div');
        sectionsList.className = 'cp-chapter-sections-list';
        sectionsList.style.display = isCur ? 'flex' : 'none';

        manifest.forEach((sec) => {
          const secItem = document.createElement('div');
          secItem.className = 'cp-section-item';
          secItem.textContent = `• ${sec.title}`;
          secItem.title = sec.title;
          secItem.dataset.sectionTitle = sec.title;

          secItem.onclick = (e) => {
            e.stopPropagation();
            const firstBlockId = sec.blocks?.[0]?.id || (sec.section ? `sec-${sec.section}` : null);
            this.selectChapter(page.id, firstBlockId);
          };

          sectionsList.appendChild(secItem);
        });

        card.appendChild(sectionsList);

        headerRow.onclick = (e) => {
          this.selectChapter(page.id, null);
        };

        chaptersWrapper.appendChild(card);
      });
      container.appendChild(chaptersWrapper);

      // Hook reactive scroll-spy highlighting
      if (!this._scrollSpyBound) {
        this._scrollSpyBound = true;
        window.addEventListener('cadplan-section-visible', (e) => {
          const { pageId, sectionTitle } = e.detail || {};
          if (pageId === this.activePageId && this.sidePanel) {
            this.sidePanel.contentContainer.querySelectorAll('.cp-section-item').forEach(item => {
              const match = item.dataset.sectionTitle === sectionTitle;
              item.classList.toggle('active-subchapter', match);
            });
          }
        });
      }

      const settingsDet = document.createElement('details');
      settingsDet.open = true;
      settingsDet.style.cssText = 'margin-top: 10px; border: 1px solid #1e293b; background: #080c16; border-radius: 8px; overflow: hidden;';

      const settingsSummary = document.createElement('summary');
      settingsSummary.style.cssText = 'padding: 8px 12px; font-family: var(--cp-font-mono); font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; cursor: pointer; user-select: none; background: #0f172a;';
      settingsSummary.textContent = '⚙️ Settings & Tools';
      settingsDet.appendChild(settingsSummary);

      const settingsBody = document.createElement('div');
      settingsBody.style.cssText = 'padding: 10px; display: flex; flex-direction: column; gap: 8px; font-family: var(--cp-font-sans); font-size: 11px;';

      const toolsGrid = document.createElement('div');
      toolsGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 6px;';

      const makeToolBtn = (label, icon, color, onClick) => {
        const b = document.createElement('button');
        b.className = 'dr-nav-btn';
        b.style.cssText = `padding: 6px 8px; font-size: 10px; justify-content: center; color: ${color}; border-color: ${color}44; border-radius: 6px; font-family: monospace; font-weight: bold;`;
        b.innerHTML = `<span>${icon}</span> <span>${label}</span>`;
        b.onclick = onClick;
        return b;
      };

      toolsGrid.appendChild(makeToolBtn('Living Spec', '⚡', '#00f2fe', () => {
        CadPlanItemNotes.openPromptBuilderDialog(this.reader);
      }));

      toolsGrid.appendChild(makeToolBtn('Bundler', '📋', '#38bdf8', () => {
        CadPromptBundlerDialog.open();
      }));

      toolsGrid.appendChild(makeToolBtn('Voice Notes', '🎙️', '#10b981', () => {
        CadPlanNotesManager.openDialog();
      }));

      toolsGrid.appendChild(makeToolBtn('Touch Pair', '📱', '#c084fc', () => {
        CadTouchPairingDialog.open();
      }));

      settingsBody.appendChild(toolsGrid);
      settingsDet.appendChild(settingsBody);
      container.appendChild(settingsDet);
  }

  selectChapter(pageId, targetBlockId = null) {
      const isPageChange = (this.activePageId !== pageId);
      this.activePageId = pageId;

      if (typeof CadStudioDemoComponent !== 'undefined' && typeof CadStudioDemoComponent.dismissAccuDrawUi === 'function') {
        CadStudioDemoComponent.dismissAccuDrawUi();
      }

      if (this.sidePanel) {
        this.sidePanel.contentContainer.querySelectorAll('.cp-chapter-card').forEach(card => {
          const isCur = card.dataset.pageId === pageId;
          card.classList.toggle('active', isCur);
          const list = card.querySelector('.cp-chapter-sections-list');
          if (list) list.style.display = isCur ? 'flex' : 'none';
          const chevron = card.querySelector('.cp-chapter-chevron');
          if (chevron) chevron.textContent = isCur ? '▼' : '▶';
        });
      }

      if (this.reader && typeof this.reader.switchPage === 'function') {
        if (isPageChange) {
          this.reader.switchPage(pageId, true);
        }
      }

      if (targetBlockId) {
        const delay = isPageChange ? 220 : 50;
        setTimeout(() => {
          if (this.reader && typeof this.reader.highlightTarget === 'function') {
            this.reader.highlightTarget(targetBlockId);
          }
        }, delay);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }
  _setupHeaderToggleButton() {
      // Top bar header is cleanly configured inside DocumentReader._renderChrome
      return true;
  }
  destroy() {
      if (this._safeAreaHandler) {
        window.removeEventListener('layout-safe-area-change', this._safeAreaHandler);
        this._safeAreaHandler = null;
      }

      if (this.aardvark) {
        this.aardvark.destroy();
        this.aardvark = null;
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

      if (typeof UITools !== 'undefined' && typeof UITools.setSafeArea === 'function') {
        UITools.setSafeArea({ left: 0, right: 0, top: 0, bottom: 0 });
      }

      this.rootElement = null;
    }
}

globalThis.CadPlan = CadPlan;
window.CadPlan = CadPlan;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlan;