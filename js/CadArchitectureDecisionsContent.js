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
        partLabel: 'Chapter 8 • Architecture',
        title: 'The 4-Layer Headless Geometric Kernel',
        blocks: [
          { id: 'p_arch_layers_1', type: 'p' },
          { id: 'sidebar_layered_kernel', type: 'sidebar', kicker: 'System Boundary', title: 'The Clean 4-Layer Boundary' },
          { id: 'p_arch_layers_2', type: 'p' }
        ]
      },
      {
        section: 'open_source',
        partLabel: 'Chapter 8 • Foundations',
        title: 'Tapping into Solid Open-Source CAD Engines',
        blocks: [
          { id: 'p_open_source_1', type: 'p' },
          { id: 'p_open_source_2', type: 'p' }
        ]
      },
      {
        section: 'handoff',
        partLabel: 'Chapter 8 • Handoff',
        title: 'Fresh-Thread Handoff & Discovery Agenda',
        blocks: [
          { id: 'p_handoff_1', type: 'p' },
          { id: 'sidebar_next_thread_checklist', type: 'sidebar', kicker: 'Checklist for Next Thread', title: 'Starting Lean: Key Interview Topics' },
          { id: 'comp_master_prompt_box', type: 'markdown-box', title: 'Master Handoff Prompt for Next Thread' }
        ]
      }
    ];
  }

  static getMasterMarkdown() {
      return `# MASTER ARCHITECTURAL DIRECTIVE & INVENTOR'S MANDATE
  **Author & Inventor:** Rob Brown (Inventor of AccuDraw, SmartLine, US Patent #5,754,182)
  **Project Dossier:** CadPlan (11 Chapters • Unified CAD Architecture & Vision)
  **Core Mandate:** One Unified Tool — Full AutoCAD Parity Foundation + AccuDraw/SmartLine Superpowers

  ---

  ## 1. THE UNIFIED PRODUCT THESIS
  1. **Best of Both Worlds:** The software is ONE coherent product. Users can operate entirely in classic AutoCAD mode (commands, prompts, DWG/DXF, 2D drafting) OR engage CompassDraw (AccuDraw 3D spatial alignment, single-stroke shortcuts, floating squircle compass).
  2. **AutoCAD as the User Growth Foundation:** We do not start with zero users. By matching AutoCAD capability and tapping into existing open-source work (like CADCraft), existing CAD drafters can adopt it immediately with zero workflow disruption and discover AccuDraw on top.
  3. **No Reinventing the Curve Drawer or SmartLine:**
     - Do NOT speculate or substitute generic Catmull-Rom splines or naive polyline bulges.
     - Rob Brown's curve drawer is a proprietary **iterative solver** that derives control points and tangencies directly through on-curve user clicks, providing full tactile control.
  4. **Web-First Presentation with High-End PBR:**
     - Initial demos must run in the browser using Three.js with full material rendering, studio lighting, and glossy PBR clearcoats to prove immediately that this is on an entirely different level than flat AutoCAD.
     - The geometric math remains decoupled so it can cleanly bypass the browser and run natively in Rust/wgpu later.

  ---

  ## 2. THE DEMOCRATIC MISSION & TIMELINE
  - **Fast Timeline:** Launch and demonstrate well under 12 months.
  - **Democratizing CAD:** High school students and young makers must not be locked out of precision drafting by thousand-dollar corporate subscription paywalls.
  - **The Luno Workflow:** Built using local agentic AI collaboration and free models to prove that a master designer can build world-class tools with zero friction.`;
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
      "This concludes our initial architectural survey in `CadPlan`. You are now equipped with the complete story: my invention of AccuDraw, the subtle Bentley playbook, the `accuCad` code deconstruction, the live interactive demos, and the 4-layer production architecture. When starting a fresh conversation thread, you can copy the master prompt below and bundle `CadPlan` to begin immediately with lean, laser-focused context."
    ];
  }

  static sidebar_next_thread_checklist() {
      return [
        "Checklist for Fresh Thread Kickoff:\n" +
        "1. Ground Truth Verified on Local Disk:\n" +
        "   • CADCraft v0.7.0: `/Users/rob/bin/cadcraft_repo` (all 12 crates + apps/cadcraft-web).\n" +
        "   • Bentley iTwin Production: `/Users/rob/bin/itwin_reference/` (AccuDraw.ts, AccuSnap.ts, AccuDrawTool.ts).\n" +
        "   • accuCad Prototype: `accuCad/js/` (AccuDrawLogic, Squircle3D, RoundingUtils3D, TentativePointHandler).\n" +
        "2. Immediate Implementation Milestones:\n" +
        "   • Phase 1 (Zero-Fork Web MVP): Launch `cadcraft-web` in an iframe with `?host=parent&webgl`, overlaying our Three.js CompassDraw squircle HUD via `postMessage`.\n" +
        "   • Phase 2 (Rust Crate `compassdraw-core`): Implement the `ThreeAxes` direction-cosine basis, SmartLock (L), and SmartKeyin quadrant inference in a standalone `no_std` Rust crate.\n" +
        "   • Phase 3 (SmartLine Bulge Pipeline): Wire on-curve continuous filleting directly to CADCraft's `PolyVertex { point, bulge: tan(θ/4) }`.\n" +
        "   • Phase 4 (MCP Agent Endpoints): Expose relative vector drafting to `cadcraft-mcp` for hallucination-free autonomous agent drafting."
      ];
    }
}

globalThis.CadArchitectureDecisionsContent = CadArchitectureDecisionsContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadArchitectureDecisionsContent;