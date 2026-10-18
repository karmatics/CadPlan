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

        if (typeof KeyCommandHandler !== 'undefined' && typeof KeyCommandHandler.setPaused === 'function') {
          KeyCommandHandler.setPaused(true);
        }

        // Launch DocumentReader with clearly partitioned, dedicated standalone chapters
        this.reader = new DocumentReader({
          container: env.container,
          brandTitle: 'Next-Gen CAD Architecture',
          brandIcon: '📐',
          pages: [
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
          ]
        });

        await this.reader.init();

        requestAnimationFrame(() => {
          const copyBtn = document.getElementById('btn-copy-markdown');
          if (copyBtn) {
            copyBtn.onclick = (e) => {
              e.preventDefault();
              e.stopPropagation();
              CadPromptBundlerDialog.open();
            };
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