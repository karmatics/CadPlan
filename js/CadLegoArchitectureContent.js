class CadLegoArchitectureContent {
  static getMeta() {
    return {
      kicker: 'Composable Architecture & Thread Handoff',
      title: '13. Modular Lego Architecture & File Map',
      subtitle: 'How Basic3D, Library/CadModules, single-command loading, cooperative keyboard scopes, and document/iframe embeds fit together like Lego bricks.'
    };
  }

  static manifest() {
    return [
      {
        section: 'lego_custom_cmd_demo',
        partLabel: 'Chapter 13 • Live Custom Tool Demo',
        title: 'Live Demo: Single Custom Command (Zero Built-In Tools Loaded)',
        blocks: [
          { id: 'comp_custom_cmd_lego', type: 'component', component: 'CadCustomCommandLegoWidget' },
          { id: 'p_lego_custom_1', type: 'p' }
        ]
      },
      {
        section: 'lego_file_map',
        partLabel: 'Chapter 13 • File Map',
        title: 'Where Everything Lives (Verified File Map)',
        blocks: [
          { id: 'p_lego_map_1', type: 'p' },
          { id: 'sidebar_lego_file_map', type: 'sidebar', kicker: 'Directory Topology', title: 'Core Lego Modules & Responsibilities' }
        ]
      },
      {
        section: 'lego_recipes',
        partLabel: 'Chapter 13 • Composable Recipes',
        title: 'Composable Recipes: Slices, Single Tools & Iframes',
        blocks: [
          { id: 'p_lego_recipes_1', type: 'p' },
          { id: 'sidebar_lego_recipes', type: 'sidebar', kicker: 'Integration Patterns', title: '4 Ways to Feature 3D & CAD in Documents or Apps' }
        ]
      },
      {
        section: 'lego_view_modes',
        partLabel: 'Chapter 13 • View Controls & Handoff',
        title: 'Conflict-Free View Controls & Next-Thread Handoff',
        blocks: [
          { id: 'p_lego_view_1', type: 'p' },
          { id: 'sidebar_lego_handoff', type: 'sidebar', kicker: 'Handoff Checklist', title: 'View Modes & Next-Thread Priorities' }
        ]
      }
    ];
  }

  static p_lego_custom_1() {
    return [
      "This viewport uses `CadModules.embed(...)` and `slice.registerCustomCommand('pin', ...)` to attach a brand-new 3D Pin command directly onto `ThreeJSLoader` + `AccuDraw` + `TentativePointHandler` + scoped `KeyCommandHandler`—without loading `DrawRectangleCommand`, `DrawPathCommand`, or any of the other built-in tools."
    ];
  }

  static p_lego_map_1() {
    return [
      "Instead of keeping all CAD features trapped inside the monolithic `accuCad` app folder, the reusable Lego pieces now live inside `Library/` and load dynamically on demand. Apps like `Basic3D` stay lean at startup and do not require AccuDraw or CAD tools to be preloaded or even present unless requested."
    ];
  }

  static sidebar_lego_file_map() {
    return [
      "Core Lego Modules & Responsibilities:\n" +
      "• `Library/CadModules.js`: Canonical dynamic slice loader (`getSliceManifest`, `getToolManifest`, `loadToolSlice`, `mountOnThreeJSLoader`, `embed`). Loads from `Library/cad/` with automatic fallback to `accuCad/js/`.\n" +
      "• `Library/cad/`: Standalone CAD slices (`AccuDraw.js`, `Squircle3D.js`, `accudraw/AccuDrawLogic.js`, `TentativePointHandler.js`, `SmartDrawKeys.js`, `EventHandlers.js`, `elements/*`, `commands/*`).\n" +
      "• `Library/ThreeJSLoader.js`: Base WebGL viewport with auto-updating `Line2` resolutions on resize and `threeApp.loadAccuDraw(options)`.\n" +
      "• `Library/KeyCommandHandler.js`: Cooperative multi-scope shortcut router (`createScope`, `setActiveScope`, `window.blur` cleanup) that yields to host pages, inputs, Aardvark, and sibling widgets.\n" +
      "• `Basic3D/Basic3d.js`: Minimal 3D host with lazy buttons for AccuDraw, per-tool CAD loading, TouchController, inline document mode, and iframe URL/postMessage API."
    ];
  }

  static p_lego_recipes_1() {
    return [
      "Every capability can be snapped in independently: just the AccuDraw compass + cooperative keyboard, a single built-in tool via `slice.loadTool('rectangle')`, a single custom command via `slice.registerCustomCommand(...)`, or wireless phone pairing via `slice.loadTouchController(tray)`."
    ];
  }

  static sidebar_lego_recipes() {
    return [
      "4 Ways to Feature 3D & CAD in Documents or Apps:\n" +
      "• 1. Single Built-In Command: `await threeApp.loadAccuDraw({ tool: 'rectangle', keyboard: true, wheelZoomMode: 'when-focused' })` loads only `RectangleElement` and `DrawRectangleCommand`.\n" +
      "• 2. Single Custom Command: `slice.registerCustomCommand('pin', handler, { hotkey: 'p' })` wires AccuDraw constraints + snapping into your own tool.\n" +
      "• 3. Zero-Boilerplate Document Embed: `await CadModules.embed(el, { primitives: true, tool: 'curve' })` includes IntersectionObserver off-screen GPU pause and automatic cleanup.\n" +
      "• 4. Iframe Embed + URL Params: Load `/Basic3D/index.html?accudraw=1&tool=rectangle&inline=1&viewMode=smart-drag` or drive via `postMessage` (`basic3d:loadAccuDraw`, `basic3d:loadTool`, `basic3d:setPlane`, `basic3d:setViewMode`, `basic3d:setKeyboard`)."
    ];
  }

  static p_lego_view_1() {
    return [
      "To avoid overloading `Shift` (which Basic3D uses for Shift-paint) or fighting Left-Click data points, `EventHandlers` and `CadModules` distinguish clicks (< 5px) from drags (>= 5px) and expose explicit navigation and wheel-zoom options."
    ];
  }

  static sidebar_lego_handoff() {
    return [
      "View Modes & Next-Thread Priorities:\n" +
      "• `viewMode: 'smart-drag'` (Default): Left-Click = Draw, Left-Drag = Orbit, Right-Click = Reset, Right-Drag = Pan, Left+Right 50ms Chord = Tentative Snap.\n" +
      "• `viewMode: 'middle-right'`: Left-Click always draws; Right-Drag = Orbit; Middle-Drag = Pan.\n" +
      "• `viewMode: 'modifiers'`: Alt+Drag = Orbit; Shift+Drag = Pan.\n" +
      "• `wheelZoomMode`: `'always'` (standalone), `'when-focused'` (in scrollable documents), or `'alt'`.\n" +
      "• Next Thread Priorities: Keep `Library/cad/*` synced with `accuCad/js/*`, and break out `CadStorageManager` (DXF/JSON) and `ViewControls` sliders as optional Lego slices."
    ];
  }
}

globalThis.CadLegoArchitectureContent = CadLegoArchitectureContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadLegoArchitectureContent;