class CadPlan {
  constructor() {
    this.reader = null;
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

      // Launch DocumentReader with all 11 chapters and custom bundler
      this.reader = new DocumentReader({
        container: env.container,
        brandTitle: 'Next-Gen CAD Architecture',
        brandIcon: '📐',
        pages: [
          { id: 'origins', title: '1. My Story & The Playbook', docClass: () => globalThis.CadOriginsContent },
          { id: 'philosophy', title: '2. The AccuDraw Philosophy & Squircle', docClass: () => globalThis.AccuDrawPhilosophyContent },
          { id: 'accucad', title: '3. Inside accuCad', docClass: () => globalThis.AccuCadAuditContent },
          { id: 'shortcuts', title: '4. The Universal Key Command Engine', docClass: () => globalThis.KeyCommandEngineContent },
          { id: 'curvetouch', title: '5. The Pen Tool Replacement & Multi-Touch', docClass: () => globalThis.CurveTouchContent },
          { id: 'demos', title: '6. Production Components (AccuDraw & Curves)', docClass: () => globalThis.CadInteractiveDemoContent },
          { id: 'ecosystem', title: '7. Luno Loop & Self-Replication', docClass: () => globalThis.CadLunoEcosystemContent },
          { id: 'architecture', title: '8. Production Architecture & Handoff', docClass: () => globalThis.CadArchitectureDecisionsContent },
          { id: 'cadcraft', title: '9. ArtCraft CADCraft & CompassDraw', docClass: () => globalThis.CadCraftIntegrationContent },
          { id: 'itwin', title: '10. iTwin Parity & SmartLine Spec', docClass: () => globalThis.CadITwinParityContent },
          { id: 'interview', title: "11. Inventor's Vision & Roadmap", docClass: () => globalThis.CadVisionInterviewContent }
        ]
      });

      await this.reader.init();

      // Hook custom prompt bundler modal to toolbar copy action
      requestAnimationFrame(() => {
        const copyBtn = env.container.querySelector('#btn-copy-markdown, .btn-copy, .dr-copy-btn');
        if (copyBtn) {
          copyBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            CadPromptBundlerDialog.open();
          };
        }

        const navEl = env.container.querySelector('.dr-header-nav, .dr-nav-tabs, .dr-tabs, .dr-header nav, nav');
        if (navEl) {
          this._navWheelHandler = (e) => {
            if (e.deltaY !== 0 && !e.shiftKey) {
              e.preventDefault();
              navEl.scrollLeft += e.deltaY * 0.8;
            }
          };
          navEl.addEventListener('wheel', this._navWheelHandler, { passive: false });
        }
      });

      return this;
    }
  destroy() {
      if (this._navWheelHandler && this.rootElement) {
        const navEl = this.rootElement.querySelector('.dr-header-nav, .dr-nav-tabs, .dr-tabs, .dr-header nav, nav');
        if (navEl) {
          navEl.removeEventListener('wheel', this._navWheelHandler);
        }
        this._navWheelHandler = null;
      }

      if (this.reader && typeof this.reader.destroy === 'function') {
        try {
          this.reader.destroy();
        } catch (e) {}
        this.reader = null;
      }
      this.rootElement = null;
    }
}

globalThis.CadPlan = CadPlan;
window.CadPlan = CadPlan;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlan;