class CadPlanDataRegistry {
  /**
   * Shallow-Preference Level-by-Level Data-Attribute Scanner & Registry.
   * Walks the DOM hierarchy level-by-level (breadth-first with depth bounds)
   * to resolve data-block, data-section, and data-page anchors without
   * costly full-tree scans, favoring root-proximate semantic containers.
   */
  static _cache = new Map();

  static findShallowestBlock(rootElement, targetKey, maxDepth = 6) {
    if (!rootElement || !targetKey) return null;
    const cleanKey = String(targetKey).trim().toLowerCase();

    // Fast-path: Check registry cache
    if (this._cache.has(cleanKey)) {
      const cachedEl = this._cache.get(cleanKey);
      if (cachedEl && cachedEl.isConnected && (rootElement.contains(cachedEl) || rootElement === cachedEl)) {
        return cachedEl;
      }
      this._cache.delete(cleanKey);
    }

    // Queue for breadth-first level-by-level traversal: [element, depth]
    const queue = [[rootElement, 0]];

    while (queue.length > 0) {
      const [current, depth] = queue.shift();

      if (current instanceof Element) {
        const blockId = (current.getAttribute('data-block') ||
                         current.getAttribute('data-block-id') ||
                         current.getAttribute('data-id') ||
                         current.id || '').toLowerCase();

        if (blockId === cleanKey) {
          this._cache.set(cleanKey, current);
          return current;
        }

        // Only traverse down if within bounded depth limit
        if (depth < maxDepth && current.children && current.children.length > 0) {
          for (let i = 0; i < current.children.length; i++) {
            const child = current.children[i];
            // Prune excluded UI components (Aardvark UI, dialogs, overlays)
            if (!child.hasAttribute('data-style-exclude') && !child.classList.contains('aardvark_highlight')) {
              queue.push([child, depth + 1]);
            }
          }
        }
      }
    }

    return null;
  }

  static getElementContext(element, rootBoundary = document.body) {
    if (!element || !(element instanceof Element)) return null;

    let curr = element;
    let blockId = null;
    let sectionId = null;
    let pageId = null;
    let visibility = null;
    let depth = 0;

    while (curr && curr !== rootBoundary && depth < 12) {
      if (!blockId) {
        blockId = curr.getAttribute('data-block') ||
                  curr.getAttribute('data-block-id') ||
                  curr.getAttribute('data-id') ||
                  curr.id;
      }
      if (!sectionId) {
        sectionId = curr.getAttribute('data-section');
      }
      if (!pageId) {
        pageId = curr.getAttribute('data-page') || curr.getAttribute('data-page-id');
      }
      if (!visibility) {
        visibility = curr.getAttribute('data-visibility');
      }
      curr = curr.parentElement;
      depth++;
    }

    return {
      blockId: blockId || `auto_${element.tagName.toLowerCase()}_${Date.now() % 10000}`,
      sectionId: sectionId || 'general',
      pageId: pageId || 'meta',
      visibility: visibility || 'public',
      tagName: element.tagName.toLowerCase()
    };
  }

  static clearCache() {
    this._cache.clear();
  }
}

globalThis.CadPlanDataRegistry = CadPlanDataRegistry;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlanDataRegistry;