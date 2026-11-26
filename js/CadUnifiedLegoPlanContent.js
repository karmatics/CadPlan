class CadUnifiedLegoPlanContent {
  static getMeta() {
    return {
      kicker: 'Master Integration Blueprint & Thread Guide',
      title: '14. Unified 3D Lego & Multi-App Plan',
      subtitle: 'Consolidating accuCad, human, Gears, elf house, workshop, GLB prop drop-in, and Gemini/Nano Banana wireframe round-tripping into one modular Lego architecture.'
    };
  }

  static manifest() {
    return [
      {
        section: 'unified_vision',
        partLabel: 'Chapter 14 • Big-Picture Architecture',
        title: 'The Composable 3D Lego Ecosystem',
        blocks: [
          { id: 'p_unified_vision_1', type: 'p' },
          { id: 'sidebar_unified_goals', type: 'sidebar', kicker: 'System Goals', title: 'Everything Working Together Without Coupling' }
        ]
      },
      {
        section: 'redundancy_audit',
        partLabel: 'Chapter 14 • Consolidation',
        title: 'Redundancy Audit: Merge & Promote to Library/',
        blocks: [
          { id: 'p_redundancy_1', type: 'p' },
          { id: 'sidebar_redundancy_matrix', type: 'sidebar', kicker: 'Single Source of Truth', title: '4 Consolidations Identified Across Current Apps' }
        ]
      },
      {
        section: 'server_and_slices',
        partLabel: 'Chapter 14 • Server & Manifest Contract',
        title: 'Server-Side App Discovery & Viewer vs. Editor Slices',
        blocks: [
          { id: 'p_server_slices_1', type: 'p' },
          { id: 'sidebar_slice_contract', type: 'sidebar', kicker: 'luno.json Slices', title: 'How Sibling Apps Expose Viewer & Editor Bricks' }
        ]
      },
      {
        section: 'gemini_wireframe_pipeline',
        partLabel: 'Chapter 14 • AI Rendering Loop',
        title: 'Sketchfab Props, Human Posing, Room Building & Gemini / Nano Banana Wireframes',
        blocks: [
          { id: 'p_gemini_loop_1', type: 'p' },
          { id: 'sidebar_gemini_capture', type: 'sidebar', kicker: '3D Consistency', title: 'Unified Wireframe & Multi-View Capture Tool' }
        ]
      },
      {
        section: 'phased_roadmap',
        partLabel: 'Chapter 14 • Execution Order',
        title: 'Phased Execution Roadmap & Lean Thread Pull Guide',
        blocks: [
          { id: 'p_phases_1', type: 'p' },
          { id: 'sidebar_lean_pulls', type: 'sidebar', kicker: 'Lean Context Strategy', title: 'What Files to Pull Per Thread' }
        ]
      }
    ];
  }

  static p_unified_vision_1() {
    return [
      "The objective is to turn our separate 3D applications—`accuCad`, `human`, `Gears`, `elf house`, and `workshop`—into interoperable Lego bricks that work both standalone and inside each other without hard-coded monolith coupling.",
      "Any app can run on its own, snap in `accuCad`'s `AccuDraw` + `ViewControls` + `TouchController` + drawing/snapping tools into its viewport, or act as a host that discovers sibling directories via a server API and drops them into a single shared Three.js scene (for example: importing a Sketchfab chair `.glb`, seating a posed `Human` on it, drafting a room around them with `AccuDraw`, or showcasing the `Gears` hypoid assembly side-by-side)."
    ];
  }

  static sidebar_unified_goals() {
    return [
      "Core Integration Invariants:\n" +
      "• Loose Discovery: `accuCad` never assumes `human` or `Gears` is present; it checks a server/registry API and lazily loads available apps on demand.\n" +
      "• Bidirectional Composition: `accuCad` can host `human`/`Gears`/`elf house`/`workshop`, AND those apps can mount `accuCad` (`AccuDraw`, `ViewControls`, `TentativePointHandler`, drawing tools) inside their own scenes.\n" +
      "• Viewer vs. Full Editor Split: Importing a posed `Human` into a room scene loads only the lightweight mesh builder (`Human.buildInto`), deferring `HumanUI`/`RotationGizmo`/`TorsoTweaker` unless the user clicks to edit.\n" +
      "• Zero Duplicate Plumbing: One GLB drop-in prop manager, one slice loader (`Library/CadModules.js`), and one multi-view wireframe capture tool."
    ];
  }

  static p_redundancy_1() {
    return [
      "Full-context auditing across `human`, `Gears`, `accuCad`, `CadPlan`, and `Library` uncovered four concrete redundancies that we should collapse into shared `Library/` bricks before scaling further:"
    ];
  }

  static sidebar_redundancy_matrix() {
    return [
      "4 Redundancies to Consolidate:\n" +
      "1. GLB/GLTF Importing (4 copies → 1 shared `Library/DropInAsset.js`):\n" +
      "   • Currently split across `Gears/DropInAsset.js` (advanced drag-drop, DRACO, floor-stripping, cutaway, transforms), `accuCad/js/ModelLoader.js` (file-picker only), `Gears/ModelLoader.js`, and `CadPlan/ModelLoader.js`.\n" +
      "   • Upgrade `DropInAsset` into a multi-instance scene prop manager shared by `accuCad` (Sketchfab chairs/props), `Gears` (car cutaway), and `elf house`/`workshop`.\n" +
      "2. Dynamic Slice Loading (`accuCad/js/AccuCadSlices.js` → `Library/CadModules.js`):\n" +
      "   • Unify on `Library/CadModules.js` as the single loader for `accuCad` slices, `ViewControls`, `DropInAsset`, and sibling app slices.\n" +
      "3. Multi-View & Wireframe Snapshot Capture (`human/src/GeometryInspector.js` → `Library/GeometryInspector.js`):\n" +
      "   • `GeometryInspector` already has `captureCurrentView()`, `captureMultiViewSheet()`, and shading toggles (`solidWire`, `wireOnly`, `xray`, `flat`, `solid`). Generalize it in `Library/` so `accuCad`, `elf house`, `workshop`, and `Gears` all share the exact same Gemini/Nano Banana wireframe exporter.\n" +
      "4. Scene Shell & View Controls (`accuCad/js/Main.js` vs `Gears.js` vs `Human.js`):\n" +
      "   • Break `ViewControls` + `SpinnerWidget` + `P2PConnector` + `CadStorageManager` out as composable slices so any app can mount `accuCad`'s controls instead of building custom sliders."
    ];
  }

  static p_server_slices_1() {
    return [
      "Because sibling projects live in separate workspace directories, the Node server (Luno server) should expose a lightweight app/slice discovery endpoint—scanning project `luno.json` files for a declared `slices` (or `lego`) map. That way `accuCad` can query `/api/apps` (with static-hosting fallback) to list installed 3D apps and load just the requested slice."
    ];
  }

  static sidebar_slice_contract() {
    return [
      "Standard `luno.json` Slice Contract:\n" +
      "• `human`:\n" +
      "  - `slices.viewer`: `SquircleSurface.js`, `HumanPresets.js`, `HeadBuilder.js`, `TorsoBuilder.js`, `HandBuilder.js`, `FootBuilder.js`, `Human.js` → exposes `Human.buildInto(THREE, parentObj)` + pose/transform API with zero editor UI.\n" +
      "  - `slices.editor`: lazily loads `HumanUI.js`, `RotationGizmo.js`, `HumanHistory.js`, `GeometryInspector.js`, `TorsoTweaker.js`.\n" +
      "• `Gears`:\n" +
      "  - `slices.viewer`: `BezierSurface.js`, `HypoidGearGenerator.js`, plus `Gears.buildInto(THREE, parentObj)` (optional animation tick + later AccuDraw-axis-driven gear placement).\n" +
      "• `elf house` & `workshop`:\n" +
      "  - Expose `buildInto(THREE, parentObj)` + wireframe material/overlay hooks for `accuCad` and Gemini/Nano Banana export.\n" +
      "• `accuCad`:\n" +
      "  - Exposes `AccuDraw`, `snapping`, `tools`, `viewControls`, `propImporter`, and `sceneCapture` slices via `Library/CadModules.js`."
    ];
  }

  static p_gemini_loop_1() {
    return [
      "A major workflow driver is 3D-consistent AI rendering with Gemini / Nano Banana: assembling a real 3D scene—Sketchfab `.glb` furniture, a posed `Human`, a drafted room, or programmatic `elf house` / `workshop` geometry—toggling clean wireframe or clay/shaded modes, and capturing consistent multi-perspective views (plus camera/bounds JSON) to iterate back and forth with Gemini."
    ];
  }

  static sidebar_gemini_capture() {
    return [
      "End-to-End Scene-to-Gemini Pipeline:\n" +
      "1. Drop in Sketchfab `.glb` props via unified `DropInAsset` (auto-scale, floor-strip, snap-to-surface).\n" +
      "2. Snap onto prop surfaces with `accuCad`'s `TentativePointHandler` + `Q` (surface normal alignment) and place a posed `Human` (`viewer` slice) or draft walls/props.\n" +
      "3. Toggle scene-wide Wireframe / Hidden-Edge / Clay / Shaded mode (extending `GeometryInspector` + `ElementOperations.wireframeElement`).\n" +
      "4. Click `Copy Multi-View Sheet` or `Copy View + Camera JSON` to feed Gemini / Nano Banana consistent perspectives from the exact same 3D scene."
    ];
  }

  static p_phases_1() {
    return [
      "To keep future threads lean and focused (pulling only the files needed for each step), we will execute this integration in four sequential phases:"
    ];
  }

  static sidebar_lean_pulls() {
    return [
      "Phased Execution & Lean File Pull Guide:\n" +
      "• Phase 1 — Server Discovery & `CadModules` Alignment:\n" +
      "  - Pull via `RUN: SERVER`: Luno Node server file(s), `Library/LunoLoader.js`, `Library/CadModules.js`, `Library/cad/` listing, and `elf house` / `workshop` directory trees.\n" +
      "  - Deliverable: Server `/api/apps` slice discovery endpoint + unified slice manifest in `Library/CadModules.js`.\n" +
      "• Phase 2 — Polish `accuCad` + Unified GLB Props + Multi-View Wireframe Exporter:\n" +
      "  - Pull: `accuCad` (`Main.js`, `BaseController.js`, `EventHandlers.js`, `TentativePointHandler.js`, `ElementOperations.js`, `ui/ViewControls.js`), `Gears/DropInAsset.js`, `human/src/GeometryInspector.js`.\n" +
      "  - Deliverable: Polished `accuCad` + shared `Library/DropInAsset.js` (multi-prop) + `Library/GeometryInspector.js` (scene-wide wireframe & Gemini/Nano Banana multi-view export) + `ViewControls` slice.\n" +
      "• Phase 3 — `human` (Viewer/Editor Slices) & `Gears` (`buildInto` + AccuDraw Host):\n" +
      "  - Pull: `human/luno.json` + `human/src/Human.js` first; then `Gears/luno.json` + `Gears/Gears.js`.\n" +
      "  - Deliverable: Spawn posed `Human` or `Gears` inside `accuCad`, lazy-load `Human` editor on demand, and mount `AccuDraw` + `ViewControls` inside `Gears`/`human`.\n" +
      "• Phase 4 — `elf house` & `workshop` Integration:\n" +
      "  - Pull: `elf house` and `workshop` files only.\n" +
      "  - Deliverable: Plug both into `accuCad` + shared Wireframe/Nano Banana multi-view capture pipeline."
    ];
  }
}

globalThis.CadUnifiedLegoPlanContent = CadUnifiedLegoPlanContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadUnifiedLegoPlanContent;