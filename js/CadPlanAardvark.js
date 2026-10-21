class CadPlanAardvark {
  /**
   * Upgraded Aardvark Inspector for CadPlan & DocumentReader.
   * Incorporates authentic Aardvark traversal:
   * - W (Wider: navigate to parent container)
   * - N (Narrower: navigate down history stack to child)
   * - M / A: Attach a note/directive via CadPlanItemNotes
   * - Right-Click: Opens a contextual Radial Menu with element breadcrumbs
   * - Ambient Data-Attribute HUD showing [dossier > page > section > block]
   */
  constructor(options = {}) {
    this.options = options || {};
    this.isActive = false;
    this.currentElement = null;
    this.widerStack = [];
    this.overlayElement = null;
    this.hudElement = null;
    this.radialMenuElement = null;

    this._onMouseMove = this._handleMouseMove.bind(this);
    this._onKeyDown = this._handleKeyDown.bind(this);
    this._onContextMenu = this._handleContextMenu.bind(this);
    this._onClickOutside = this._handleClickOutside.bind(this);
  }

  init() {
    this._injectStyles();
    this._createDomElements();
  }

  activate() {
      if (this.isActive) return;
      this.isActive = true;
      this.widerStack = [];
      this.isElementLocked = false;
      this.lockedElement = null;

      if (typeof KeyCommandHandler !== 'undefined' && typeof KeyCommandHandler.setPaused === 'function') {
        KeyCommandHandler.setPaused(true);
        this._restoredKeyCommand = true;
      }

      this._onClick = this._handleClick.bind(this);
      document.addEventListener('mousemove', this._onMouseMove, true);
      document.addEventListener('keydown', this._onKeyDown, true);
      document.addEventListener('contextmenu', this._onContextMenu, true);
      document.addEventListener('click', this._onClick, true);

      this._highlightAnnotatedElements();
      this._showHudMessage("🔍 Aardvark Active: Click or press 'C' to add note | 'W' wider | 'N' narrower | 'Esc' to exit");
    }

  deactivate() {
      if (!this.isActive) return;
      this.isActive = false;
      this.isElementLocked = false;
      this.lockedElement = null;

      if (this._restoredKeyCommand && typeof KeyCommandHandler !== 'undefined' && typeof KeyCommandHandler.setPaused === 'function') {
        KeyCommandHandler.setPaused(false);
        this._restoredKeyCommand = false;
      }

      document.removeEventListener('mousemove', this._onMouseMove, true);
      document.removeEventListener('keydown', this._onKeyDown, true);
      document.removeEventListener('contextmenu', this._onContextMenu, true);
      if (this._onClick) document.removeEventListener('click', this._onClick, true);

      this._hideOverlay();
      this._hideHud();
      this._closeRadialMenu();
      // Do NOT clear .cadplan-has-note-marker: active notes retain their persistent cyan borders!
    }
  toggle() {
    if (this.isActive) this.deactivate();
    else this.activate();
  }

  _injectStyles() {
      const css = `
        .cadplan-aardvark-overlay {
          position: fixed;
          pointer-events: none;
          z-index: 999980;
          border: 2px solid #ef4444;
          background: rgba(239, 68, 68, 0.08);
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.35);
          border-radius: 3px;
          transition: top 0.04s ease-out, left 0.04s ease-out, width 0.04s ease-out, height 0.04s ease-out;
          display: none;
          box-sizing: border-box;
        }
        .cadplan-aardvark-tag {
          position: absolute;
          top: -18px;
          left: -2px;
          background: #ffd700;
          color: #000000;
          font-family: monospace;
          font-size: 10.5px;
          font-weight: bold;
          padding: 1px 6px;
          border-radius: 3px 3px 0 0;
          white-space: nowrap;
          pointer-events: none;
        }
        .cadplan-aardvark-overlay.locked {
          border: 2.5px solid #00f2fe !important;
          background: rgba(0, 242, 254, 0.12) !important;
          box-shadow: 0 0 18px rgba(0, 242, 254, 0.5) !important;
        }
        .cadplan-aardvark-overlay.locked .cadplan-aardvark-tag {
          background: #00f2fe !important;
          color: #070a13 !important;
        }
        .cadplan-has-note-marker {
          outline: 2px solid #00f2fe !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 12px rgba(0, 242, 254, 0.35) !important;
        }
        .cadplan-aardvark-hud {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999995;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid #334155;
          color: #f8fafc;
          border-radius: 20px;
          padding: 6px 18px;
          font-family: monospace;
          font-size: 11px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
          pointer-events: none;
          display: none;
          white-space: nowrap;
        }
      `;
      if (typeof applyCss === 'function') {
        applyCss(css, 'CadPlanAardvarkStyles');
      }
    }

  _createDomElements() {
      if (!this.overlayElement) {
        this.overlayElement = document.createElement('div');
        this.overlayElement.className = 'cadplan-aardvark-overlay';
        this.overlayElement.setAttribute('data-style-exclude', '');

        this.tagElement = document.createElement('div');
        this.tagElement.className = 'cadplan-aardvark-tag';
        this.overlayElement.appendChild(this.tagElement);

        document.body.appendChild(this.overlayElement);
      }
      if (!this.hudElement) {
        this.hudElement = document.createElement('div');
        this.hudElement.className = 'cadplan-aardvark-hud';
        this.hudElement.setAttribute('data-style-exclude', '');
        document.body.appendChild(this.hudElement);
      }
      if (!this.radialMenuElement) {
        this.radialMenuElement = document.createElement('div');
        this.radialMenuElement.className = 'cadplan-aardvark-radial';
        this.radialMenuElement.setAttribute('data-style-exclude', '');
        document.body.appendChild(this.radialMenuElement);
      }
    }

  _handleMouseMove(e) {
      if (!this.isActive) return;
      // When locked onto an element (dialog open), do not move hover
      if (this.isElementLocked || this.lockedElement) return;

      if (this.radialMenuElement && this.radialMenuElement.style.display === 'flex') return;

      const target = e.target;
      if (!target || target.hasAttribute('data-style-exclude') || target.closest('[data-style-exclude], .uw-dialog, .cadplan-aardvark-radial')) {
        return;
      }
      this.currentElement = target;
      this.widerStack = [];
      this._highlightElement(target);
    }

  _highlightElement(el) {
      if (!el || !this.overlayElement) return;
      const rect = el.getBoundingClientRect();
      this.overlayElement.style.display = 'block';
      this.overlayElement.style.top = `${rect.top}px`;
      this.overlayElement.style.left = `${rect.left}px`;
      this.overlayElement.style.width = `${rect.width}px`;
      this.overlayElement.style.height = `${rect.height}px`;

      const blockId = el.getAttribute('data-block') || el.getAttribute('data-block-id') || (el.id && !el.id.startsWith('uw') ? el.id : '');
      const tagName = el.tagName.toLowerCase();
      const tagDisplay = blockId ? `${tagName}#${blockId}` : tagName;

      if (this.tagElement) {
        this.tagElement.textContent = `<${tagDisplay}>`;
      }

      let noteBadge = '';
      const notes = CadPlanItemNotes.getLocalMap();
      let count = 0;
      Object.keys(notes).forEach(k => {
        if (blockId && k.endsWith(':' + blockId)) {
          count += (notes[k] || []).filter(n => n.status !== 'resolved').length;
        }
      });
      if (count > 0) {
        noteBadge = ` • 📝 ${count} note${count > 1 ? 's' : ''}`;
      }

      if (this.isElementLocked) {
        this.overlayElement.classList.add('locked');
        this._showHudMessage(`[LOCKED] <${tagDisplay}>${noteBadge} — Dialog has focus • Press Esc to unlock`);
      } else {
        this.overlayElement.classList.remove('locked');
        this._showHudMessage(`<${tagDisplay}>${noteBadge} — Press 'C' to add note | 'W' wider | 'N' narrower | 'Esc' to exit`);
      }
    }
  _selectParent() {
    if (this.currentElement && this.currentElement.parentElement && this.currentElement.tagName !== 'BODY') {
      this.widerStack.push(this.currentElement);
      this.currentElement = this.currentElement.parentElement;
      this._highlightElement(this.currentElement);
    }
  }

  _selectChild() {
    if (this.widerStack.length > 0) {
      this.currentElement = this.widerStack.pop();
      this._highlightElement(this.currentElement);
    }
  }

  _handleKeyDown(e) {
    if (!this.isActive) return;
    const key = e.key.toLowerCase();

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      if (this.radialMenuElement && this.radialMenuElement.style.display === 'flex') {
        this._closeRadialMenu();
      } else {
        this.deactivate();
      }
      return;
    }

    // C or M or A: Open Author Note / Directive Dialog on Selected Element
    if (key === 'c' || key === 'm' || key === 'a') {
      e.preventDefault();
      e.stopPropagation();
      this._openNoteOnSelected();
      return;
    }

    // W: Traverse to Parent Container (Wider)
    if (key === 'w') {
      e.preventDefault();
      e.stopPropagation();
      this._selectParent();
      return;
    }

    // N: Traverse down child history stack (Narrower)
    if (key === 'n') {
      e.preventDefault();
      e.stopPropagation();
      this._selectChild();
      return;
    }

    // E: Edit paragraph in-situ
    if (key === 'e') {
      e.preventDefault();
      e.stopPropagation();
      this._openEditOnSelected();
      return;
    }

    // T: Copy Selector / Patch Template
    if (key === 't') {
      e.preventDefault();
      e.stopPropagation();
      this._copyPatchSnippetOnSelected();
      return;
    }
  }
  _handleContextMenu(e) {
    if (!this.isActive || !this.currentElement) return;
    e.preventDefault();
    e.stopPropagation();
    this._openRadialMenu(e.clientX, e.clientY);
  }

  _openRadialMenu(x, y) {
      if (!this.radialMenuElement || !this.currentElement) return;
      const el = this.currentElement;

      const loc = CadPlanItemNotes.generateElementLocator(el);
      const ctx = CadPlanDataRegistry.getElementContext(el);

      const dossierId = this.options.dossierId || 'CadPlan';
      const localMap = CadPlanItemNotes.getLocalMap();
      const notes = localMap[`${dossierId}:${ctx.pageId}:${loc.key}`] || [];
      const notesCount = notes.filter(n => n.status !== 'resolved').length;

      this.radialMenuElement.innerHTML = '';

      const header = document.createElement('div');
      header.style.cssText = 'color:#00f2fe; font-weight:800; border-bottom:1px solid #232d3f; padding-bottom:5px; margin-bottom:4px; font-size:10.5px; display:flex; justify-content:space-between; align-items:center;';
      header.innerHTML = `<span>🧭 Target: <strong>${loc.key}</strong></span> ${notesCount > 0 ? `<span style="color:#00f2fe; background:rgba(0,242,254,0.18); padding:1px 6px; border-radius:10px;">${notesCount} 📝</span>` : ''}`;
      this.radialMenuElement.appendChild(header);

      const makeBtn = (label, icon, shortcut, isElectric, onClick) => {
        const b = document.createElement('button');
        if (isElectric) b.classList.add('has-notes');
        b.innerHTML = `<span>${icon} ${label}</span> <span style="color:${isElectric ? '#00f2fe' : '#64748b'}; font-size:9.5px;">[${shortcut}]</span>`;
        b.onclick = (e) => {
          e.stopPropagation();
          this._closeRadialMenu();
          onClick();
        };
        return b;
      };

      const noteLabel = notesCount > 0 ? `Author Directives (${notesCount})` : 'Attach Note / Directive';
      this.radialMenuElement.appendChild(makeBtn(noteLabel, '📝', 'C', notesCount > 0, () => this._openNoteOnSelected()));
      this.radialMenuElement.appendChild(makeBtn('Wider (Parent Node)', '⬆️', 'W', false, () => this._selectParent()));
      if (this.widerStack.length > 0) {
        this.radialMenuElement.appendChild(makeBtn('Narrower (Child Node)', '⬇️', 'N', false, () => this._selectChild()));
      }
      this.radialMenuElement.appendChild(makeBtn('Edit in-situ', '✏️', 'E', false, () => this._openEditOnSelected()));
      this.radialMenuElement.appendChild(makeBtn('Copy Selector', '📋', 'T', false, () => this._copyPatchSnippetOnSelected()));

      const pad = 12;
      const left = Math.min(x, window.innerWidth - 250 - pad);
      const top = Math.min(y, window.innerHeight - 240 - pad);

      this.radialMenuElement.style.left = `${left}px`;
      this.radialMenuElement.style.top = `${top}px`;
      this.radialMenuElement.style.display = 'flex';
    }
  _closeRadialMenu() {
    if (this.radialMenuElement) {
      this.radialMenuElement.style.display = 'none';
    }
  }

  _handleClickOutside(e) {
    if (this.radialMenuElement && this.radialMenuElement.style.display === 'flex') {
      if (!this.radialMenuElement.contains(e.target)) {
        this._closeRadialMenu();
      }
    }
  }

  _openNoteOnSelected() {
      if (!this.currentElement) return;
      const el = this.currentElement;

      this.isElementLocked = true;
      this.lockedElement = el;
      this._highlightElement(el);
      this._closeRadialMenu();

      const loc = CadPlanItemNotes.generateElementLocator(el);
      const ctx = CadPlanDataRegistry.getElementContext(el);

      let clearConnectors = null;

      const dlg = CadPlanItemNotes.openBlockNotesDialog(
        ctx.pageId,
        loc.key,
        globalThis.CadPlan || { name: 'CadPlan' },
        () => {
          this._highlightAnnotatedElements();
          CadPlanItemNotes._notify();
        },
        null,
        { targetElement: el, locator: loc }
      );

      if (dlg && dlg.element) {
        clearConnectors = this._drawOuterCornerConnectors(el, dlg.element);

        const origClose = dlg.options.onClose;
        dlg.options.onClose = () => {
          if (clearConnectors) clearConnectors();
          this.isElementLocked = false;
          this.lockedElement = null;
          if (this.isActive) this._highlightElement(el);
          if (typeof origClose === 'function') origClose();
        };
      }
    }
  _showHudMessage(text) {
    if (this.hudElement) {
      this.hudElement.textContent = text;
      this.hudElement.style.display = 'block';
    }
  }

  _hideHud() {
    if (this.hudElement) this.hudElement.style.display = 'none';
  }

  _hideOverlay() {
    if (this.overlayElement) this.overlayElement.style.display = 'none';
  }

  destroy() {
    this.deactivate();
    if (this.overlayElement) this.overlayElement.remove();
    if (this.hudElement) this.hudElement.remove();
    if (this.radialMenuElement) this.radialMenuElement.remove();
    this.overlayElement = null;
    this.hudElement = null;
    this.radialMenuElement = null;
  }

  _copyPatchSnippetOnSelected() {
      if (!this.currentElement) return;
      const el = this.currentElement;
      const ctx = CadPlanDataRegistry.getElementContext(el);

      const patchSnippet = `<template data-file="CadPlan/content/${ctx.pageId}.html" data-block="${ctx.blockId}" data-action="patch">\n  <div data-block="${ctx.blockId}">\n    <!-- Content -->\n  </div>\n</template>`;

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(patchSnippet);
        this._showHudMessage(`📋 Copied LLM Patch Template for [${ctx.blockId}] to clipboard!`);
      }
    }
  _openEditOnSelected() {
      if (!this.currentElement) return;
      const el = this.currentElement;

      this.isElementLocked = true;
      this.lockedElement = el;
      this._highlightElement(el);
      this._closeRadialMenu();

      const ctx = CadPlanDataRegistry.getElementContext(el);

      let clearConnectors = null;

      const dlg = CadPlanDocumentEditor.openBlockEditor(ctx.pageId, ctx.blockId, globalThis.CadPlan, () => {
        if (this.isActive && this.currentElement) {
          this._highlightElement(this.currentElement);
        }
      });

      if (dlg && dlg.element) {
        clearConnectors = this._drawOuterCornerConnectors(el, dlg.element);

        const origClose = dlg.options.onClose;
        dlg.options.onClose = () => {
          if (clearConnectors) clearConnectors();
          this.isElementLocked = false;
          this.lockedElement = null;
          if (this.isActive) this._highlightElement(el);
          if (typeof origClose === 'function') origClose();
        };
      }
    }

  _highlightAnnotatedElements() {
      // Clear legacy highlights
      document.querySelectorAll('.cadplan-has-note-marker').forEach(el => {
        el.classList.remove('cadplan-has-note-marker', 'proposal-mode');
      });

      if (typeof CadPlanItemNotes === 'undefined') return;

      const localMap = CadPlanItemNotes.getLocalMap();

      Object.keys(localMap).forEach(key => {
        const notes = (localMap[key] || []).filter(n => n.status !== 'resolved');
        if (notes.length === 0) return;

        const firstNote = notes[0];
        const hasAiProposal = notes.some(n => n.isLLM);
        let targetEl = null;

        if (firstNote.blockId) {
          targetEl = document.querySelector(`[data-block-id="${firstNote.blockId}"]`) ||
                     document.querySelector(`[data-block="${firstNote.blockId}"]`) ||
                     document.getElementById(`block-${firstNote.blockId}`) ||
                     document.getElementById(firstNote.blockId);
        }

        if (!targetEl && firstNote.xpath) {
          try {
            const res = document.evaluate(firstNote.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            if (res.singleNodeValue instanceof Element) targetEl = res.singleNodeValue;
          } catch (e) {}
        }

        if (targetEl instanceof Element) {
          // Apply the crawling ants animation border to the annotated element
          targetEl.classList.add('cadplan-has-note-marker');
          if (hasAiProposal) {
            targetEl.classList.add('proposal-mode');
          }
        }
      });
    }
  _drawOuterCornerConnectors(element, dialogElement) {
      let svg = document.getElementById('cadplan-outer-corners-svg');
      if (!svg) {
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'cadplan-outer-corners-svg';
        svg.setAttribute('style', 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:999970;overflow:visible;');

        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.id = 'cadplan-outer-line-1';
        line1.setAttribute('stroke', '#00f2fe');
        line1.setAttribute('stroke-width', '1.5');
        line1.setAttribute('stroke-dasharray', '4,3');
        line1.setAttribute('opacity', '0.75');

        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.id = 'cadplan-outer-line-2';
        line2.setAttribute('stroke', '#00f2fe');
        line2.setAttribute('stroke-width', '1.5');
        line2.setAttribute('stroke-dasharray', '4,3');
        line2.setAttribute('opacity', '0.75');

        svg.appendChild(line1);
        svg.appendChild(line2);
        document.body.appendChild(svg);
      }

      let rafId = null;

      // Mathematical 16-pair external common tangent solver between two disjoint rectangles
      const findExternalTangents = (rA, rB) => {
        const vA = [
          { x: rA.left,  y: rA.top },
          { x: rA.right, y: rA.top },
          { x: rA.right, y: rA.bottom },
          { x: rA.left,  y: rA.bottom }
        ];
        const vB = [
          { x: rB.left,  y: rB.top },
          { x: rB.right, y: rB.top },
          { x: rB.right, y: rB.bottom },
          { x: rB.left,  y: rB.bottom }
        ];

        const cross = (p1, p2, p) => (p2.x - p1.x) * (p.y - p1.y) - (p2.y - p1.y) * (p.x - p1.x);

        const tangents = [];

        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const p1 = vA[i];
            const p2 = vB[j];

            let sideA = 0;
            let validA = true;
            for (let a = 0; a < 4; a++) {
              const cp = cross(p1, p2, vA[a]);
              if (Math.abs(cp) > 1e-4) {
                const sign = cp > 0 ? 1 : -1;
                if (sideA === 0) sideA = sign;
                else if (sideA !== sign) { validA = false; break; }
              }
            }
            if (!validA) continue;

            let sideB = 0;
            let validB = true;
            for (let b = 0; b < 4; b++) {
              const cp = cross(p1, p2, vB[b]);
              if (Math.abs(cp) > 1e-4) {
                const sign = cp > 0 ? 1 : -1;
                if (sideB === 0) sideB = sign;
                else if (sideB !== sign) { validB = false; break; }
              }
            }
            if (!validB) continue;

            // External tangent requires all vertices of both shapes to lie on the same side
            if (sideA === 0 || sideB === 0 || sideA === sideB) {
              tangents.push({ p1, p2 });
            }
          }
        }

        return tangents;
      };

      const updateFrame = () => {
        if (!element || !element.isConnected || !dialogElement || !dialogElement.isConnected) {
          if (svg) svg.remove();
          return;
        }

        const eRect = element.getBoundingClientRect();
        const dRect = dialogElement.getBoundingClientRect();

        const tangents = findExternalTangents(eRect, dRect);

        const l1 = document.getElementById('cadplan-outer-line-1');
        const l2 = document.getElementById('cadplan-outer-line-2');

        if (tangents.length >= 2 && l1 && l2) {
          l1.style.display = 'block';
          l2.style.display = 'block';

          l1.setAttribute('x1', tangents[0].p1.x);
          l1.setAttribute('y1', tangents[0].p1.y);
          l1.setAttribute('x2', tangents[0].p2.x);
          l1.setAttribute('y2', tangents[0].p2.y);

          l2.setAttribute('x1', tangents[1].p1.x);
          l2.setAttribute('y1', tangents[1].p1.y);
          l2.setAttribute('x2', tangents[1].p2.x);
          l2.setAttribute('y2', tangents[1].p2.y);
        } else if (l1 && l2) {
          // Fallback for overlapping geometry
          l1.style.display = 'none';
          l2.style.display = 'none';
        }

        rafId = requestAnimationFrame(updateFrame);
      };

      rafId = requestAnimationFrame(updateFrame);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        const s = document.getElementById('cadplan-outer-corners-svg');
        if (s) s.remove();
      };
    }

  _handleClick(e) {
      if (!this.isActive) return;

      // Never intercept clicks inside dialog boxes, radial menus, or controls
      if (e.target.closest('[data-style-exclude], .uw-dialog, .cadplan-aardvark-radial, #dr-header-overflow-menu, .dr-nav-bar')) {
        if (this.radialMenuElement && this.radialMenuElement.style.display === 'flex') {
          if (!this.radialMenuElement.contains(e.target)) {
            this._closeRadialMenu();
          }
        }
        return;
      }

      // If an element is already locked with an open dialog, ignore background clicks
      if (this.isElementLocked) return;

      e.preventDefault();
      e.stopPropagation();
      this.currentElement = e.target;
      this._openNoteOnSelected();
    }

  _openThreadOnSelected() {
    if (!this.currentElement) return;
    const el = this.currentElement;

    this.isElementLocked = true;
    this.lockedElement = el;
    this._highlightElement(el);
    this._closeRadialMenu();

    const loc = (typeof CadPlanItemNotes !== 'undefined' && typeof CadPlanItemNotes.generateElementLocator === 'function')
      ? CadPlanItemNotes.generateElementLocator(el)
      : { key: el.id || 'target_block', isOfficial: false, xpath: '' };

    const ctx = (typeof CadPlanDataRegistry !== 'undefined')
      ? CadPlanDataRegistry.getElementContext(el)
      : { blockId: loc.key, pageId: 'meta' };

    const dossierId = this.options?.dossierId || 'CadPlan';
    const anchorThreadId = `thread_${dossierId}_${ctx.pageId}_${loc.key}`.replace(/[^a-zA-Z0-9_-]/g, '_');

    const content = makeElement('div', {
      style: {
        padding: '8px',
        minHeight: '340px',
        maxHeight: '520px',
        overflowY: 'auto',
        background: '#070a13',
        color: '#e2e8f0'
      }
    });

    let clearConnectors = null;

    const dlg = UITools.makeDialog({
      title: `💬 In-Situ Discussion [${loc.key}]`,
      size: [600, 520],
      position: [Math.max(20, (window.innerWidth - 600) / 2), 60],
      contentElement: content,
      appendTo: document.body,
      onClose: () => {
        if (clearConnectors) clearConnectors();
        this.isElementLocked = false;
        this.lockedElement = null;
        if (this.isActive) this._highlightElement(el);
      }
    });

    if (dlg && dlg.element) {
      clearConnectors = this._drawOuterCornerConnectors(el, dlg.element);
    }

    if (typeof Comments !== 'undefined') {
      const threadApp = new Comments();
      threadApp.init(content, {
        threadId: anchorThreadId,
        showTitle: false,
        elementAnchor: `${dossierId}:${ctx.pageId}:${loc.key}`
      });
    } else {
      content.innerHTML = '<div style="padding:24px;text-align:center;color:#00f2fe;font-family:monospace;">⚡ Connecting to Comments engine...</div>';
    }
  }
}

globalThis.CadPlanAardvark = CadPlanAardvark;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlanAardvark;