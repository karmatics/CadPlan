# Modular 3D & CAD Lego Architecture — Handoff & File Map

This document summarizes the modular Lego decomposition across `Library`, `Basic3D`, `accuCad`, and `CadPlan` so any engineer or fresh AI thread can jump right in without re-reading the entire codebase.

---

## 1. Where Everything Lives (File Map)

### A. Shared Lego Core (`Library/`)
- **`Library/CadModules.js`** — The canonical dynamic Lego loader and slice registry.
  - Exposes `getSliceManifest()`, `getToolManifest()`, `loadSlices(...)`, `loadToolSlice(name)`, `mountOnThreeJSLoader(threeApp, options)`, and `embed(container, options)`.
  - Loads files from `Library/cad/` first, transparently falling back to `accuCad/js/` if needed.
- **`Library/cad/`** — Self-contained copy of the modular CAD slices (`AccuDraw.js`, `Squircle3D.js`, `accudraw/AccuDrawLogic.js`, `TentativePointHandler.js`, `SmartDrawKeys.js`, `EventHandlers.js`, `elements/*`, `commands/*`, etc.).
- **`Library/ThreeJSLoader.js`** — Base 3D WebGL viewport (`OrbitControls`, `Line2`, `GLTFLoader`, `RGBELoader`).
  - Automatically updates `Line2`/`LineMaterial.resolution` on `_onResize()`.
  - Exposes `threeApp.loadAccuDraw(options)` (loads `Library/CadModules.js` on demand).
- **`Library/KeyCommandHandler.js`** — Cooperative multi-scope shortcut engine.
  - `createScope(id, { container, extraContainers, requireFocusOrHover, onFocusChange })`
  - Only fires shortcuts for the currently hovered/focused/active container, ignores `<input>`/`<textarea>`/`contentEditable`/Aardvark/OS modifiers, clears stuck state on `window` `blur`, and leaves non-matching keys untouched for the host page.
- **`Library/P2PConnector.js` & `Library/QRCodeGenerator.js`** — Optional `touch` slice for wireless WebRTC phone trackpad control.
- **`Library/DocumentReader.js`, `CadPlanDocumentEditor.js`, `CadPlanItemNotes.js`, `CadPlanAardvark.js`** — The living document reader, in-situ text editor, note system, and DOM inspector.

### B. Minimal Host App (`Basic3D/`)
- **`Basic3D/Basic3d.js`** — Lean 3D viewer (`cube`, `sphere`, `cylinder`, `grid`, `thickLine`, `.glb` drop).
  - Preloads **zero** CAD/AccuDraw/KeyCommandHandler dependencies (`Basic3D/luno.json` only includes `DomBasics`, `UITools`, `ThreeJSLoader`).
  - Buttons snap in `🧭 Load AccuDraw`, `🛠️ CAD Tools (Lazy)` (each tool loads only its own files on click, plus `+ All`), and `📱` (`TouchController`).
  - Supports `env.inlineUi` / `env.uiContainer` for embedding directly inside documents, AND supports `<iframe>` URL parameters (`?inline=1&hideUi=1&accudraw=1&tool=rectangle&viewMode=smart-drag&keys=0`) and `postMessage` commands (`basic3d:loadAccuDraw`, `basic3d:loadTool`, `basic3d:setPlane`, `basic3d:setViewMode`, `basic3d:setKeyboard`).

### C. Document Showcase Widgets (`CadPlan/js/`)
- **`CadBasic3dEmbedComponent.js`** — Mounts `Basic3D/Basic3d.js` inline inside `CadPlan` Chapter 0 (`anti_redundancy_mandate`).
- **`CadSurfaceLatchLegoWidget.js`** — Compact `Q`-Surface-Normal snap & draw Lego mini-widget.
- **`CadTouchLegoWidget.js`** — Compact on-demand `TouchController` QR pairing Lego mini-widget.

---

## 2. Quick Lego Usage Recipes

### Recipe 1: Drop AccuDraw + 1 Single Command onto any `ThreeJSLoader`

    const slice = await threeApp.loadAccuDraw({
      size: 0.9,
      center: [0, 0.02, 0],
      tool: 'rectangle',       // Loads ONLY RectangleElement + DrawRectangleCommand!
      keyboard: true,          // Cooperative scoped shortcuts (T/F/S/V/Space/L/G/Q/X/Y/Z/?)
      viewMode: 'smart-drag',  // Click=Draw, L-Drag=Orbit, R-Drag=Pan, L+R Chord=Snap
      wheelZoomMode: 'when-focused'
    });

### Recipe 2: Register ONE Custom Command (Without Loading Any Built-In Commands)

    const slice = await threeApp.loadAccuDraw({ keyboard: true });
    slice.registerCustomCommand('myPin', {
      onPoint({ mode, point }) {
        if (mode === 'click' && point) {
          // Place custom pin/marker at constrained 3D point
        }
      }
    }, { hotkey: 'p', desc: 'Drop Custom Pin', activate: true });

### Recipe 3: Zero-Boilerplate Document Embed (`CadModules.embed`)

    const embed = await CadModules.embed(containerEl, {
      primitives: true,
      accudraw: true,
      tool: 'curve',           // Only loads CurveElement + UpdateControlPoints + DrawCurveCommand
      viewMode: 'smart-drag',
      wheelZoomMode: 'when-focused'
    });

### Recipe 4: Feature via `<iframe>` in Any Page

    <iframe src="/Basic3D/index.html?accudraw=1&tool=rectangle&inline=1&viewMode=smart-drag"></iframe>

---

## 3. View Control & Zoom Modes (Eliminating Modifier Overloads)
- **`viewMode: 'smart-drag'` (Default):** Left-Click (`< 5px`) = Data Point; Left-Drag (`>= 5px`) = Orbit; Right-Click (`< 5px`) = Reset; Right-Drag (`>= 5px`) = Pan; Left+Right 50ms Chord = Tentative Snap.
- **`viewMode: 'middle-right'`:** Left-Click always draws; Right-Drag (`>= 5px`) = Orbit; Middle-Drag = Pan.
- **`viewMode: 'modifiers'`:** `Alt+Drag` = Orbit; `Shift+Drag` = Pan.
- **`wheelZoomMode`:** `'always'` (standalone apps), `'when-focused'` (embedded in scrollable documents), or `'alt'`.

---

## 4. Checklist for Next Thread
1. Sync `Library/cad/*` whenever editing `accuCad/js/*` (or gradually retire `accuCad/js/*` duplicates once everything points to `Library/cad/`).
2. Add optional `CadStorageManager` (DXF/JSON export) and `ViewControls` (size/transparency/squircle sliders) as standalone Lego slices in `Library/CadModules.js`.
3. Add a custom command tutorial/playground widget in `CadPlan` demonstrating `slice.registerCustomCommand(...)` live.