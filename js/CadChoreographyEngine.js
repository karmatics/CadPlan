class CadChoreographyEngine {
  /**
   * Autonomous Choreography & Ghost Drafter Engine for accuCad.
   * Drives simulated mouse trajectories, clicks, plane turns, and axis locks at 60 FPS,
   * yielding instantly to the human user whenever mouse input is detected.
   */
  constructor(app, mountContainer, options = {}) {
    this.app = app;
    this.container = mountContainer;
    this.options = options;
    this.baseController = app.baseController;
    
    this.isPlaying = false;
    this.isHumanTakeover = false;
    this.currentScenarioKey = options.scenario || 'plane_tour';
    this.loopRafId = null;
    this.scenarioStepIdx = 0;
    this.scenarioStartTime = 0;
    this.idleResumeTimer = null;

    this._createGhostCursorDom();
    this._bindTakeoverListeners();
  }

  _createGhostCursorDom() {
    this.ghostCursor = document.createElement('div');
    this.ghostCursor.className = 'cad-ghost-cursor';
    this.ghostCursor.style.cssText = `
      position: absolute;
      width: 22px;
      height: 22px;
      margin-left: -11px;
      margin-top: -11px;
      pointer-events: none;
      z-index: 1000;
      display: none;
      transition: transform 0.04s linear;
    `;
    this.ghostCursor.innerHTML = `
      <svg viewBox="0 0 24 24" width="22" height="22">
        <circle cx="12" cy="12" r="9" fill="none" stroke="#00f2fe" stroke-width="1.8" stroke-dasharray="3,2"/>
        <circle cx="12" cy="12" r="2.5" fill="#00f2fe"/>
        <line x1="12" y1="1" x2="12" y2="6" stroke="#00f2fe" stroke-width="1.5"/>
        <line x1="12" y1="18" x2="12" y2="23" stroke="#00f2fe" stroke-width="1.5"/>
        <line x1="1" y1="12" x2="6" y2="12" stroke="#00f2fe" stroke-width="1.5"/>
        <line x1="18" y1="12" x2="23" y2="12" stroke="#00f2fe" stroke-width="1.5"/>
      </svg>
    `;
    this.container.appendChild(this.ghostCursor);

    this.calloutBadge = document.createElement('div');
    this.calloutBadge.className = 'cad-ghost-badge';
    this.calloutBadge.style.cssText = `
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(15, 23, 42, 0.92);
      border: 1px solid rgba(0, 242, 254, 0.35);
      border-radius: 6px;
      padding: 4px 10px;
      font-family: var(--cp-font-mono, monospace);
      font-size: 10.5px;
      color: #00f2fe;
      pointer-events: none;
      z-index: 1001;
      display: none;
      backdrop-filter: blur(8px);
    `;
    this.container.appendChild(this.calloutBadge);
  }

  _bindTakeoverListeners() {
    const handleHumanAction = () => {
      if (!this.isPlaying) return;
      this.isHumanTakeover = true;
      this.ghostCursor.style.display = 'none';
      this.calloutBadge.textContent = '🎮 Human Takeover Active — Draw Freely';
      this.calloutBadge.style.display = 'block';

      if (this.idleResumeTimer) clearTimeout(this.idleResumeTimer);
      this.idleResumeTimer = setTimeout(() => {
        if (this.isPlaying && this.isHumanTakeover) {
          this.isHumanTakeover = false;
          this.scenarioStartTime = performance.now();
          this.ghostCursor.style.display = 'block';
        }
      }, 5000);
    };

    this.container.addEventListener('pointerdown', handleHumanAction, { capture: true, passive: true });
    this.container.addEventListener('keydown', handleHumanAction, { capture: true, passive: true });
  }

  start(scenarioKey = null) {
    if (scenarioKey) this.currentScenarioKey = scenarioKey;
    this.isPlaying = true;
    this.isHumanTakeover = false;
    this.scenarioStepIdx = 0;
    this.scenarioStartTime = performance.now();
    this.ghostCursor.style.display = 'block';
    this.calloutBadge.style.display = 'block';

    const loop = (now) => {
      if (!this.isPlaying) return;
      if (!this.isHumanTakeover) {
        this._tickScenario(now);
      }
      this.loopRafId = requestAnimationFrame(loop);
    };
    this.loopRafId = requestAnimationFrame(loop);
  }

  pause() {
    this.isPlaying = false;
    if (this.loopRafId) cancelAnimationFrame(this.loopRafId);
    this.loopRafId = null;
    this.ghostCursor.style.display = 'none';
    this.calloutBadge.style.display = 'none';
  }

  toggle() {
    if (this.isPlaying) this.pause();
    else this.start();
  }

  _tickScenario(now) {
      const bc = this.baseController;
      if (!bc || !this.app?.threeDView) return;

      const scenarios = this._getScenarioDefinitions();
      const scenario = scenarios[this.currentScenarioKey] || scenarios['plane_tour'];
      const steps = scenario.steps;

      const elapsedTotal = (now - this.scenarioStartTime) / 1000;
      let accumulatedTime = 0;
      let activeStep = steps[steps.length - 1];
      let stepProgress = 1.0;

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        if (elapsedTotal >= accumulatedTime && elapsedTotal < accumulatedTime + step.duration) {
          activeStep = step;
          stepProgress = (elapsedTotal - accumulatedTime) / step.duration;
          break;
        }
        accumulatedTime += step.duration;
      }

      if (elapsedTotal >= accumulatedTime + activeStep.duration) {
        this.scenarioStartTime = now;
        if (scenario.onLoop) scenario.onLoop(bc);
        return;
      }

      const rect = this.container.getBoundingClientRect();
      const startX = activeStep.from ? activeStep.from[0] : (rect.width / 2);
      const startY = activeStep.from ? activeStep.from[1] : (rect.height / 2);
      const endX = activeStep.to ? activeStep.to[0] : startX;
      const endY = activeStep.to ? activeStep.to[1] : startY;

      // Smooth sinusoidal motion curve
      const ease = 0.5 - 0.5 * Math.cos(stepProgress * Math.PI);
      const curX = startX + (endX - startX) * ease;
      const curY = startY + (endY - startY) * ease;

      this.ghostCursor.style.left = `${curX}px`;
      this.ghostCursor.style.top = `${curY}px`;

      // Emit glowing motion trail particle
      if (Math.random() < 0.35) {
        const dot = document.createElement('div');
        dot.className = 'cad-ghost-trail-dot';
        dot.style.left = `${curX}px`;
        dot.style.top = `${curY}px`;
        this.container.appendChild(dot);
        setTimeout(() => dot.remove(), 500);
      }

      if (activeStep.action && !activeStep._fired) {
        activeStep.action(bc, this);
        activeStep._fired = true;
      }

      steps.forEach(s => {
        if (s !== activeStep) s._fired = false;
      });

      this.calloutBadge.textContent = `⚡ Ghost Drafter: ${activeStep.label || 'Kinematic CAD Tour'}`;

      const fakeEvent = {
        clientX: rect.left + curX,
        clientY: rect.top + curY,
        altKey: false,
        shiftKey: false
      };
      if (typeof EventHandlers !== 'undefined' && typeof EventHandlers.handleMouseMove === 'function') {
        EventHandlers.handleMouseMove(bc, fakeEvent);
      }
    }

  _getScenarioDefinitions() {
      const W = this.container.clientWidth || 600;
      const H = this.container.clientHeight || 400;

      return {
        plane_tour: {
          title: '3D Construction Planes (T, F, S, V)',
          onLoop: (bc) => {
            bc.setDrawingPlane('top');
          },
          steps: [
            { duration: 2.0, from: [W * 0.3, H * 0.5], to: [W * 0.7, H * 0.5], label: '[T] Top Plane Construction (Horizontal Z=0)', action: (bc) => bc.setDrawingPlane('top') },
            { duration: 2.2, from: [W * 0.7, H * 0.5], to: [W * 0.7, H * 0.25], label: '[F] Front Plane Reorientation (Vertical Z=Out)', action: (bc) => bc.setDrawingPlane('front') },
            { duration: 2.2, from: [W * 0.7, H * 0.25], to: [W * 0.3, H * 0.25], label: '[S] Side Plane Alignment (Lateral Z=Right)', action: (bc) => bc.setDrawingPlane('side') },
            { duration: 2.0, from: [W * 0.3, H * 0.25], to: [W * 0.5, H * 0.5], label: '[V] Camera View Plane (Normal to Eye Vector)', action: (bc) => bc.setDrawingPlane('view') }
          ]
        },
        chord_snap: {
          title: '50ms Chord Snap & Mini-Jack',
          onLoop: (bc) => {
            if (typeof TentativePointHandler !== 'undefined') TentativePointHandler._clearTentativePoint(bc);
          },
          steps: [
            { duration: 1.8, from: [W * 0.2, H * 0.7], to: [W * 0.5, H * 0.5], label: 'Approaching existing vertex...', action: (bc) => {} },
            { duration: 1.5, from: [W * 0.5, H * 0.5], to: [W * 0.5, H * 0.5], label: '⚡ 50ms Two-Button Chord Snap Triggered!', action: (bc, engine) => {
              const rect = engine.container.getBoundingClientRect();
              const fakeEvent = { clientX: rect.left + W * 0.5, clientY: rect.top + H * 0.5, button: 0, preventDefault: () => {} };
              if (typeof TentativePointHandler !== 'undefined') TentativePointHandler.handleTentativePoint(bc, fakeEvent);
            }},
            { duration: 2.5, from: [W * 0.5, H * 0.5], to: [W * 0.75, H * 0.3], label: 'Pulling away: 3-Axis Mini-Jack projected to plane', action: () => {} },
            { duration: 1.8, from: [W * 0.75, H * 0.3], to: [W * 0.75, H * 0.3], label: '[G] Set Origin without rotating compass plane', action: (bc) => {
              const pt = bc._tentativeOriginalPoint || bc.getLastWorldPoint();
              if (pt) bc.setOrigin(pt);
            }}
          ]
        },
        smart_lock: {
          title: 'Smart Lock (L) & Polar Tangents',
          onLoop: (bc) => {
            if (bc.accuDrawLogic) bc.accuDrawLogic.reset();
          },
          steps: [
            { duration: 2.0, from: [W * 0.5, H * 0.5], to: [W * 0.8, H * 0.52], label: 'Sliding horizontally: mouse pulls along X...', action: () => {} },
            { duration: 1.5, from: [W * 0.8, H * 0.52], to: [W * 0.8, H * 0.5], label: '[L] Smart Lock engaged! Y clamped strictly to 0', action: (bc) => {
              if (bc.accuDrawLogic) bc.accuDrawLogic.handleSmartLock();
            }},
            { duration: 2.0, from: [W * 0.8, H * 0.5], to: [W * 0.65, H * 0.3], label: '[Space] Polar mode: Squircle morphs to circle', action: (bc) => {
              if (bc.accuDrawLogic) bc.accuDrawLogic.switchMode();
            }},
            { duration: 2.0, from: [W * 0.65, H * 0.3], to: [W * 0.5, H * 0.5], label: 'Radial distance & angle tracking active', action: () => {} }
          ]
        },
        living_spec_mutation: {
          title: '🧬 Living Spec Mutation Cycle',
          onLoop: (bc) => {},
          steps: [
            { duration: 2.0, from: [W * 0.3, H * 0.6], to: [W * 0.5, H * 0.4], label: '1. Human author attaches live directive via Aardvark [C]', action: () => {} },
            { duration: 2.2, from: [W * 0.5, H * 0.4], to: [W * 0.5, H * 0.4], label: '2. Crawling-ants highlight element; notes stored in IndexedDB', action: (bc) => {
              if (bc.accuDraw) bc.accuDraw.setSquircleAnimated(0.5, 0.3);
            }},
            { duration: 2.5, from: [W * 0.5, H * 0.4], to: [W * 0.7, H * 0.6], label: '3. Outbox aggregates delta payload; AI computes surgical patch', action: (bc) => {
              bc.setDrawingPlane('front');
            }},
            { duration: 2.2, from: [W * 0.7, H * 0.6], to: [W * 0.3, H * 0.6], label: '4. AST Class Patcher hot-reloads method: Living system evolved!', action: (bc) => {
              bc.setDrawingPlane('top');
            }}
          ]
        }
      };
    }
  destroy() {
    this.pause();
    if (this.idleResumeTimer) clearTimeout(this.idleResumeTimer);
    if (this.ghostCursor) this.ghostCursor.remove();
    if (this.calloutBadge) this.calloutBadge.remove();
    this.ghostCursor = null;
    this.calloutBadge = null;
    this.app = null;
    this.baseController = null;
  }
}

globalThis.CadChoreographyEngine = CadChoreographyEngine;
if (typeof module !== 'undefined' && module.exports) module.exports = CadChoreographyEngine;