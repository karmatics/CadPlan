class CadArchitectureDecisionsContent {
  static getMeta() {
    return {
      kicker: 'Production Roadmap & Fresh-Thread Handoff',
      title: 'Production Architecture & Handoff',
      subtitle: 'The master handoff blueprint: decoupling the headless kernel, integrating open-source tools, and next-thread discovery agenda.'
    };
  }

  static manifest() {
      return [
        {
          section: 'decoupling',
          partLabel: 'Chapter 9 • Architecture',
          title: 'The 4-Layer Headless Geometric Kernel',
          blocks: [
            { id: 'comp_architecture_graphic', type: 'component', component: 'CadArchitectureGraphicComponent' },
            { id: 'p_arch_layers_1', type: 'p' },
            { id: 'sidebar_layered_kernel', type: 'sidebar', kicker: 'System Boundary', title: 'The Clean 4-Layer Boundary' },
            { id: 'p_arch_layers_2', type: 'p' }
          ]
        },
        {
          section: 'windowing_pipeline',
          partLabel: 'Chapter 9 • Windowing & Viewports',
          title: 'Cross-Platform Windowing: Native wgpu & The 2D/3D Unified Viewport',
          blocks: [
            { id: 'p_windowing_1', type: 'p' },
            { id: 'sidebar_windowing_matrix', type: 'sidebar', kicker: 'Windowing & Pipeline Matrix', title: 'The Desktop wgpu & Web Wasm Windowing Stack' },
            { id: 'p_windowing_2', type: 'p' }
          ]
        },
        {
          section: 'open_source',
          partLabel: 'Chapter 9 • Foundations',
          title: 'Tapping into Solid Open-Source CAD Engines',
          blocks: [
            { id: 'p_open_source_1', type: 'p' },
            { id: 'p_open_source_2', type: 'p' }
          ]
        },
        {
          section: 'handoff',
          partLabel: 'Chapter 9 • Handoff',
          title: 'The Master Architectural Specification',
          blocks: [
            { id: 'p_handoff_1', type: 'p' },
            { id: 'sidebar_next_thread_checklist', type: 'sidebar', kicker: 'Checklist for Next Thread', title: 'Starting Lean: Key Interview Topics' },
            { id: 'comp_master_prompt_box', type: 'markdown-box', title: 'Master Specification Payload' }
          ]
        }
      ];
    }

  static getMasterMarkdown() {
      return `# CADPLAN: MASTER ARCHITECTURAL DOSSIER & INVENTOR DIRECTIVE
  **Author & Inventor:** Rob Brown (Inventor of AccuDraw, SmartLine, US Patent #5,754,182)
  **Project Dossier:** CadPlan (13 Chapters • Complete Executable Living Specification)
  **System Mandate:** One Unified Tool — 100% AutoCAD Parity Baseline + AccuDraw/SmartLine Spatial Superpowers
  **Core Strategy:** AI Rebuilding and Democratizing Proven CAD Tools for Everyone

  ---

  ## 1. THE UNIFIED DUAL-MODE PRODUCT ARCHITECTURE
  1. **Best of Both Worlds:** The software is ONE coherent product. It will just drop into classic AutoCAD mode (commands, prompts, DWG/DXF fidelity, 2D drafting) if the user wants it to, but can expand into this really smart AccuDraw spatial mode (3D alignment, single-stroke shortcuts, floating squircle compass).
  2. **AutoCAD as the Built-In Adoption Gateway:** We do not start with zero users. By matching AutoCAD capability and building on existing open-source work (like CADCraft v0.7.0), drafters adopt it immediately with zero workflow shock and discover AccuDraw on top.
  3. **AI as the Engine Builder:** AI's primary mission here is not speculative autonomous drafting—it is empowering a solo inventor to rebuild, synthesize, and democratize a multi-billion-dollar CAD tool, making professional spatial drafting freely accessible to everyone.
  4. **The Sophistication of the Living Specification:** CadPlan is so mathematically rigorous and complete that an LLM can consume this entire document as an immense prompt payload and build production software without hallucinating coordinate conventions or tool semantics.

  ---

  ## 2. CROSS-PLATFORM WINDOWING & DUAL 2D/3D VIEWPORT ARCHITECTURE
  1. **Unified Viewport Principle (2D is a Sub-State of 3D):**
     - 2D is never a separate engine or SVG canvas. It is a 3D orthographic camera locked to a 3D construction plane at $Z=0$.
     - 2D Mode: Orthographic camera, Top plane (\`[ [1,0,0], [0,1,0], [0,0,1] ]\`), outputting \`Vec2(x, y)\` into CADCraft commands (\`LINE\`, \`CIRCLE\`, \`OFFSET\`, \`TRIM\`).
     - 3D Mode: Perspective orbit with motion parallax oscillation, floating origin, plane rotation (\`T\`, \`F\`, \`S\`, \`V\`, \`Q\`), and CADCraft \`Mat4::ocs\` 3D extrusion.
  2. **The Multiplatform Windowing Matrix:**
     - **Native Desktop (macOS, Windows, Linux):** \`winit\` event loop + \`wgpu\` graphics + \`cadcraft-ui-egui\` chrome. Viewport renders document entities plus native \`CompassDrawOverlayPass\` for the 3D squircle compass and Mini-Jack.
     - **Browser WebAssembly (\`cadcraft-web\`):** Compiled via \`trunk\` to Wasm/WebGPU with WebGL2 fallback (\`?webgl\`). Runs identical \`compassdraw-core\` in-process.
     - **WebViews / Electron / Three.js Studio:** Uses CADCraft's \`apps/cadcraft-web/src/host.rs\` bridge (\`?host=parent&webgl\`), overlaying Three.js PBR physical materials and WebRTC phone pairing via \`postMessage\`.
  3. **Role of SVG:** Restricted to headless vector export and 2D UI instrument widgets. All 60 FPS viewport rendering is GPU-driven.

  ---

  ## 3. MATHEMATICAL & GEOMETRIC GROUND TRUTH
  1. **SmartLine Tangent Arcs (Closest-Point Sweep Principle):**
     - Tangent arc orientation is governed by finding the candidate circle where the cursor is as close as possible to a point on the circumference.
     - Naturally sweeps from 0° to +5° or backs up across the tangent line to -6° with zero deadband jitter.
     - Eye-perpendicular viewing angles are handled as natural degenerate projection limits.
  2. **Corner Fillets vs. Arcs:**
     - Type A: Rounded Corner Fillets calculated via closed-form O(1) 3D vector bisector math.
     - Type B: Tangent Arc Segments calculated via cursor-swing proximity, auto-orienting the compass to the exit tangent vector upon placement.
  3. **Universal Bulge Representation:**
     - All arc transitions serialize into standard DXF / CADCraft \`PolyVertex { point, bulge: tan(θ/4) }\`.
  4. **On-Curve Cubic Spline Relaxation:**
     - Proprietary 8-iteration solver (\`UpdateControlPoints.js\`) deriving exact cubic Bézier control points and continuous G1 tangencies directly through on-curve user through-points.

  ---

  ## 4. LOCAL CODEBASE & REPOSITORY TOPOLOGY
  1. **CADCraft Pure-Rust Workspace (v0.7.0):** \`/Users/rob/bin/cadcraft_repo\` (crates: \`geom\`, \`engine\`, \`constraints\`, \`doc\`, \`render\`, \`mcp\`, \`apps/cadcraft-web\`).
  2. **Bentley Systems Production Reference:** \`/Users/rob/bin/itwin_reference/\` (\`AccuDraw.ts\` [3,862 lines], \`AccuSnap.ts\`, \`AccuDrawTool.ts\`).
  3. **AccuDraw Historical Archive:** \`accudraw/\` (Patents US #5,754,182, US #5,371,845, and 1995–1996 *MicroStation Manager* articles).
  4. **accuCad WebGL Workstation:** \`accuCad/\` (\`AccuDrawLogic.js\`, \`Squircle3D.js\`, \`RoundingUtils3D.js\`, \`TentativePointHandler.js\`, \`SmartDrawKeys.js\`).
  5. **Curve Drawer Engine:** \`/Users/rob/source/recursi copy/web/DrawingApp/\` & \`CadPlan/js/curve/\` (\`CurveDraw.js\`, \`BezierVertex.js\`, \`UpdateControlPoints.js\`).
  6. **TouchController:** \`/TouchController/?room=...\` (WebRTC P2P two-handed modulation).`;
    }
  static p_arch_layers_1() {
    return [
      "Our working `accuCad` prototype proved the interaction ergonomics, but coupled the mathematics directly to Three.js scene objects. For the production engine, the most important architectural mandate is decoupling: the geometric and constraint kernel must have zero rendering dependencies."
    ];
  }

  static sidebar_layered_kernel() {
      return [
        "The Clean 4-Layer Boundary:\n" +
        "• Layer 1: Pure Geometry & Constraint Kernel (compassdraw-core):\n" +
        "  - Headless, pure mathematical functions operating on raw numbers or typed Float64Arrays ([x, y, z]).\n" +
        "  - Manages AccuDraw direction cosines, floating origin translation, and ray-plane intersections.\n" +
        "  - Audited against Bentley iTwin AccuDraw.ts (3,100+ lines) for exact mathematical parity.\n" +
        "  - Runs with zero WebGL/DOM dependencies in WebAssembly, Web Workers, or headless Rust CLI.\n" +
        "• Layer 2: Command & Tool Pipeline:\n" +
        "  - Manages active drawing commands, single-stroke hierarchical shortcuts (KeyCommandHandler without Enter),\n" +
        "  - SmartLine multi-segment continuous chaining (lines, arcs, fillets), and 50ms chorded tentative snapping.\n" +
        "• Layer 3: Render Adapter:\n" +
        "  - Browser: Three.js WebGL with Line2 thick anti-aliased wireframes.\n" +
        "  - CADCraft Native: Connects to cadcraft-render and wgpu vertex/index buffers.\n" +
        "• Layer 4: UI & Ergonomics Shell:\n" +
        "  - Morphing squircle compass (Squircle3D.js), glowing cursor caret, coordinate readouts,\n" +
        "  - and P2P dual-trackpad TouchController over low-latency WebRTC."
      ];
    }

  static p_arch_layers_2() {
    return [
      "By establishing this 4-layer boundary, our core drafting, constraint, and SmartLine mathematics can run anywhere with 100% interoperability:",
      "1. **CADCraft Direct Entity Mapping:** A continuous path drawn in accuCad maps 1:1 into CADCraft's `LwPolyline` with `PolyVertex { point, bulge: tan(θ/4) }` through `RoundingUtils3D.arcToBulge`.",
      "2. **Bentley iTwin Parity:** AccuDraw's 3D orientation matrices translate directly into `ThreeAxes`, while `SmartKeyin` eliminates 100% of negative coordinate typing across viewports.",
      "3. **Zero UI / DOM Pollution:** The geometric solver runs headless in WebAssembly, background Web Workers, or Node.js server scripts without touching Three.js objects or browser DOM elements."
    ];
  }
  static p_open_source_1() {
    return [
      "We do not need to reinvent basic low-level geometry algorithms from scratch. A major part of our strategy is evaluating and tapping into existing high-quality open-source CAD and geometric kernels (such as OpenCascade.js, ManifoldCAD, or modern WebAssembly boundary-representation libraries)."
    ];
  }

  static p_open_source_2() {
    return [
      "Our unique competitive advantage is the interaction engine: the AccuDraw floating compass, the chorded tentative snapping, the on-curve pen replacement, and the multi-touch phone controller. By layering my proven interaction paradigm on top of solid open-source geometric backends, we can achieve high-end CAD capability in record time."
    ];
  }

  static p_handoff_1() {
      return [
        "This concludes our architectural survey across the CadPlan dossier. You are equipped with the complete foundation: the invention of AccuDraw, the subtle Bentley playbook, the accuCad code audit, the live interactive WebGL test bench, the CADCraft Rust crate topology, and the 4-layer headless production architecture.",
        "Because CadPlan is a self-contained, living repository, starting a new thread or collaborating with an AI coding partner requires no token fragmentation. The entire specification—or a chosen granularity—can be bundled directly from the Outbox dialog to provide instant, uncompromised context."
      ];
    }

  static sidebar_next_thread_checklist() {
      return [
        "Checklist for Fresh Thread Kickoff:\n" +
        "1. Ground Truth Verified on Local Workstation:\n" +
        "   • CADCraft v0.7.0: `/Users/rob/bin/cadcraft_repo` (all 12 crates + apps/cadcraft-web).\n" +
        "   • Bentley iTwin Production: `/Users/rob/bin/itwin_reference/` (AccuDraw.ts, AccuSnap.ts, AccuDrawTool.ts).\n" +
        "   • accuCad Prototype: `accuCad/js/` (AccuDrawLogic, Squircle3D, RoundingUtils3D, TentativePointHandler).\n" +
        "   • DrawingApp Curves: `/Users/rob/source/recursi copy/web/DrawingApp/` (CurveDraw, UpdateControlPoints, BezierVertex).\n" +
        "2. Immediate Implementation Milestones:\n" +
        "   • Phase 1 (Zero-Fork Web MVP): Launch `cadcraft-web` in an iframe with `?host=parent&webgl`, overlaying our Three.js/SVG Squircle Compass HUD via `postMessage`.\n" +
        "   • Phase 2 (Rust Crate `compassdraw-core`): Implement the `ThreeAxes` direction-cosine basis, SmartLock (L), and SmartKeyin quadrant inference in a standalone `no_std` Rust crate.\n" +
        "   • Phase 3 (SmartLine Bulge Pipeline): Wire on-curve continuous filleting directly to CADCraft's `PolyVertex { point, bulge: tan(θ/4) }`.\n" +
        "   • Phase 4 (MCP Agent Endpoints): Expose relative vector drafting to `cadcraft-mcp` for hallucination-free autonomous agent drafting."
      ];
    }

  static p_windowing_1() {
      return [
        "A critical decision in this architecture is resolving the relationship between 2D drafting and 3D modeling. The foundational mistake CAD vendors made in the 1980s was maintaining separate 2D drafting engines and 3D solid modelers. In our architecture, **2D is not a separate engine, nor is it an SVG viewport—it is simply a 3D orthographic camera locked to a 3D construction plane at $Z = 0$.**",
        "When a drafter works in 'Classic 2D Mode', the camera is locked into top orthographic alignment. The AccuDraw compass sits on the Top plane basis, emitting standard 2D coordinates (`Vec2(x, y)`) directly into CADCraft commands (`LINE`, `CIRCLE`, `OFFSET`, `TRIM`). When the user engages 3D, the camera transitions to perspective orbit, the compass tilts to Front (`F`), Side (`S`), or Surface Normal (`Q`), and CADCraft's `Mat4::ocs` maps the planar polyline vertices (`PolyVertex { point, bulge }`) into 3D world space. There is only one mathematical pipeline."
      ];
    }

  static sidebar_windowing_matrix() {
      return [
        "The Cross-Platform Windowing & Viewport Matrix:\n" +
        "• 1. Native Desktop Binaries (macOS, Windows, Linux):\n" +
        "  - Windowing & Event Loop: `winit` (handles Cocoa, Win32, X11/Wayland).\n" +
        "  - UI Chrome: `cadcraft-ui-egui` (toolbars, command prompt, layer palettes).\n" +
        "  - GPU Renderer: Native `wgpu` (Metal on Mac, DX12/Vulkan on Windows, Vulkan on Linux).\n" +
        "  - 3D AccuDraw Pass: Custom WGSL shader overlay in `cadcraft-render` drawing the squircle compass, tick cylinders, and Mini-Jack.\n" +
        "• 2. Browser WebAssembly (cadcraft-web via trunk):\n" +
        "  - Canvas Runner: `eframe` WebGPU with WebGL2 fallback (`?webgl`).\n" +
        "  - Kernel Execution: `compassdraw-core` compiled directly to Wasm in-process.\n" +
        "• 3. WebViews, Electron & Three.js Studio Mode:\n" +
        "  - Embedded Host Bridge: Uses CADCraft's `apps/cadcraft-web/src/host.rs` with `?host=parent&webgl`.\n" +
        "  - Three.js Overlay: Host frame renders high-fidelity PBR clearcoat materials and studio lighting.\n" +
        "  - IPC / postMessage Bridge: Coordinates flow via `{ type: 'cadcraft:inject_point', point }` and `{ type: 'cadcraft:save', bytes }`.\n" +
        "• 4. Headless SVG Export:\n" +
        "  - SVG is reserved exclusively for vector plotting and UI badges, never as the interactive viewport engine."
      ];
    }

  static p_windowing_2() {
      return [
        "By decoupling windowing and rendering through this matrix, AI coding agents can develop and maintain both native and web targets without branching business logic. The `compassdraw-core` crate remains completely headless (`no_std` compatible pure Rust).",
        "On native desktop systems, `winit` and `wgpu` deliver high-frame-rate, sub-millisecond drawing response with minimal memory footprint. In browser and Electron environments, the same coordinate constraint logic drives WebGL/Three.js viewports and pairs seamlessly with our WebRTC mobile `TouchController` over local Wi-Fi. The draftsperson gets identical single-stroke ergonomics on any machine."
      ];
    }
}

globalThis.CadArchitectureDecisionsContent = CadArchitectureDecisionsContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadArchitectureDecisionsContent;