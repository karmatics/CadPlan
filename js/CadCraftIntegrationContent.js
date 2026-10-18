class CadCraftIntegrationContent {
  static getMeta() {
    return {
      kicker: 'ArtCraft Ecosystem & CompassDraw Integration',
      title: '9. ArtCraft CADCraft & CompassDraw Roadmap',
      subtitle: 'Technical audit of CADCraft v0.7.0 pure-Rust crates, pointmod.rs coordinate filters, host.rs postMessage bridge, and MCP agents.'
    };
  }

  static manifest() {
      return [
        {
          section: 'upstream_hook_top',
          partLabel: 'Chapter 9 • Plugin Architecture',
          title: 'The 3 Clean Upstream Hooks: Zero-Drift Plugin Contract',
          blocks: [
            { id: 'comp_plugin_hooks', type: 'component', component: 'CadPluginHookSpecGraphic' }
          ]
        },
        {
          section: 'mcp_telemetry_top',
          partLabel: 'Chapter 9 • Agent Telemetry Lab',
          title: 'Autonomous AI Drafting & Relative Vector Constraints',
          blocks: [
            { id: 'comp_agent_telemetry_lab', type: 'component', component: 'CadAgentTelemetryLab' }
          ]
        },
        {
          section: 'cadcraft_overview',
          partLabel: 'Chapter 9 • Context',
          title: 'The ArtCraft Phenomenon & CADCraft Opportunity',
          blocks: [
            { id: 'p_artcraft_1', type: 'p' },
            { id: 'p_artcraft_2', type: 'p' },
            { id: 'sidebar_cadcraft_spec', type: 'sidebar', kicker: 'ArtCraft Spec Sheet', title: 'Inside CADCraft v0.7.0 (storytold/cadcraft)' }
          ]
        },
        {
          section: 'crate_architecture',
          partLabel: 'Chapter 9 • Rust Internals',
          title: 'CADCraft Crate Topology & The Constraint Hook',
          blocks: [
            { id: 'p_crate_arch_1', type: 'p' },
            { id: 'p_crate_arch_2', type: 'p' },
            { id: 'sidebar_cadcraft_crates', type: 'sidebar', kicker: 'Rust Crate Architecture', title: 'Verified CADCraft Workspace Crate Map' },
            { id: 'p_crate_arch_3', type: 'p' }
          ]
        },
        {
          section: 'pointmod_hook',
          partLabel: 'Chapter 9 • Interception Details',
          title: 'PointMod.rs: The Coordinate Filter Interception Point',
          blocks: [
            { id: 'p_pointmod_1', type: 'p' },
            { id: 'p_pointmod_2', type: 'p' },
            { id: 'sidebar_pointmod_hook', type: 'sidebar', kicker: 'Rust Engine Hook', title: 'PointMod.rs vs. CompassDraw Kinetic Frame' },
            { id: 'p_pointmod_3', type: 'p' }
          ]
        },
        {
          section: 'bulge_arcs',
          partLabel: 'Chapter 9 • Polyline Geometry',
          title: 'Polyline Arc Segments & The Universal Bulge Factor',
          blocks: [
            { id: 'p_bulge_1', type: 'p' },
            { id: 'p_bulge_2', type: 'p' },
            { id: 'sidebar_bulge_math', type: 'sidebar', kicker: 'Arc Representation', title: 'DXF Bulge tan(θ/4) vs. SmartLine Continuous Fillets' }
          ]
        },
        {
          section: 'plinem_state',
          partLabel: 'Chapter 9 • Polyline Pipeline',
          title: 'PlineM & Mat4::ocs 3D Plane Extrusion Pipeline',
          blocks: [
            { id: 'p_plinem_1', type: 'p' },
            { id: 'p_plinem_2', type: 'p' },
            { id: 'sidebar_plinem_pipeline', type: 'sidebar', kicker: 'Rust Pipeline', title: 'PlineM Machine & Mat4::ocs Normal Basis' }
          ]
        },
        {
          section: 'paradigm_bridge',
          partLabel: 'Chapter 9 • Two-Way Paradigm Bridge',
          title: 'The Bi-Directional Dialogue: Making AccuDraw Feel Native to AutoCAD',
          blocks: [
            { id: 'p_bridge_paradigm_1', type: 'p' },
            { id: 'sidebar_two_way_contract', type: 'sidebar', kicker: 'Runtime Architecture', title: 'The Reactive AutoCAD Prompt ↔ AccuDraw Contract' },
            { id: 'p_bridge_paradigm_2', type: 'p' },
            { id: 'sidebar_coordinate_translation_math', type: 'sidebar', kicker: 'Mathematical Bridge', title: 'The Universal CoordinateBridge (WCS ↔ Compass ↔ OCS)' }
          ]
        },
        {
          section: 'engineering_hazards',
          partLabel: 'Chapter 9 • Deep Reconnaissance',
          title: 'Engineering Hazards: The 4 Tricky Traps Where CAD Integrations Fail',
          blocks: [
            { id: 'p_hazard_overview', type: 'p' },
            { id: 'sidebar_arbitrary_axis_hazard', type: 'sidebar', kicker: 'Singularity Trap', title: 'Hazard 1: The OCS Arbitrary Axis Discontinuity Jump' },
            { id: 'p_hazard_apparent_skew', type: 'p' },
            { id: 'sidebar_apparent_skew_hazard', type: 'sidebar', kicker: '3D Projection Trap', title: 'Hazard 2: 3D Skew Lines vs. Apparent 2D Crossings' },
            { id: 'sidebar_bulge_singularity_hazard', type: 'sidebar', kicker: 'Mathematical Limit', title: 'Hazard 3: The 360° Bulge Singularity & Inflection Noise' },
            { id: 'sidebar_dpi_scaling_hazard', type: 'sidebar', kicker: 'Display Scaling', title: 'Hazard 4: Retina & High-DPI Snap Aperture Scaling' }
          ]
        },
        {
          section: 'entity_store',
          partLabel: 'Chapter 9 • Memory Model',
          title: 'EntityStore: Copy-on-Write Database & Zero-Cost Undo Snapshots',
          blocks: [
            { id: 'p_store_1', type: 'p' },
            { id: 'p_store_2', type: 'p' },
            { id: 'sidebar_store_architecture', type: 'sidebar', kicker: 'Memory Architecture', title: 'EntityStore Generational Handles & CoW Snapshots' }
          ]
        },
        {
          section: 'command_pipeline',
          partLabel: 'Chapter 9 • Commands & Tools',
          title: 'CADCraft Command Execution & draw.rs / curves.rs',
          blocks: [
            { id: 'p_cmds_1', type: 'p' },
            { id: 'p_cmds_2', type: 'p' },
            { id: 'sidebar_cmds_map', type: 'sidebar', kicker: 'Engine Commands', title: 'CADCraft Command Modules in crates/engine/src/cmd' }
          ]
        },
        {
          section: 'accept_loop',
          partLabel: 'Chapter 9 • Event Dispatch',
          title: 'Accept::POINT & The Native Command State Machine',
          blocks: [
            { id: 'p_accept_1', type: 'p' },
            { id: 'p_accept_2', type: 'p' },
            { id: 'sidebar_accept_loop', type: 'sidebar', kicker: 'Command Loop', title: 'The LINE Command Machine (draw.rs)' }
          ]
        },
        {
          section: 'osmode_table',
          partLabel: 'Chapter 9 • Spatial Snapping',
          title: 'The 14-Bit OSMODE Table & Active Spatial Anchoring',
          blocks: [
            { id: 'p_osmode_1', type: 'p' },
            { id: 'p_osmode_2', type: 'p' },
            { id: 'sidebar_osmode_table', type: 'sidebar', kicker: 'Snapping Table', title: 'CADCraft 14-Bit OSMODE vs. CompassDraw Tentative Anchor' }
          ]
        },
        {
          section: 'render_pipeline',
          partLabel: 'Chapter 9 • Viewport Rendering',
          title: 'cadcraft-render (wgpu) & Screen-Space Thick Wireframes',
          blocks: [
            { id: 'p_render_1', type: 'p' },
            { id: 'p_render_2', type: 'p' },
            { id: 'sidebar_render_wgpu', type: 'sidebar', kicker: 'wgpu Shaders', title: 'CADCraft wgpu Graphics Pipeline (crates/render)' }
          ]
        },
        {
          section: 'autolisp_engine',
          partLabel: 'Chapter 9 • Scripting Engine',
          title: 'Pure-Rust AutoLISP Interpreter in cmd/lisp.rs',
          blocks: [
            { id: 'p_lisp_1', type: 'p' },
            { id: 'p_lisp_2', type: 'p' },
            { id: 'sidebar_lisp_architecture', type: 'sidebar', kicker: 'Scripting Integration', title: 'AutoLISP in Rust & AccuDraw Key-ins' }
          ]
        },
        {
          section: 'constraints_solver',
          partLabel: 'Chapter 9 • Constraint Engine',
          title: 'The Levenberg-Marquardt Solver in cadcraft-constraints',
          blocks: [
            { id: 'p_lm_solver_1', type: 'p' },
            { id: 'p_lm_solver_2', type: 'p' },
            { id: 'sidebar_constraints_solver', type: 'sidebar', kicker: 'Constraint Math', title: 'Degrees of Freedom (dof.rs) & LM Non-Linear Solver' }
          ]
        },
        {
          section: 'constraint_taxonomy',
          partLabel: 'Chapter 9 • Parametric Schema',
          title: 'CADCraft Parametric Taxonomy: Geometric (GC) & Dimensional (DC)',
          blocks: [
            { id: 'p_tax_1', type: 'p' },
            { id: 'p_tax_2', type: 'p' },
            { id: 'sidebar_constraint_taxonomy', type: 'sidebar', kicker: 'Parametric Schema', title: 'Verified CADCraft Constraint Kinds (cadcraft-doc)' }
          ]
        },
        {
          section: 'mcp_agents',
          partLabel: 'Chapter 9 • Agent Integration',
          title: 'CADCraft MCP Server & Autonomous Agent Drafting',
          blocks: [
            { id: 'p_mcp_1', type: 'p' },
            { id: 'p_mcp_2', type: 'p' },
            { id: 'sidebar_mcp_endpoints', type: 'sidebar', kicker: 'Agent Protocol', title: 'cadcraft-mcp Tool Endpoints & CompassDraw' }
          ]
        },
        {
          section: 'interception_spec',
          partLabel: 'Chapter 9 • Integration Spec',
          title: 'The Clean Tack-On Specification: Zero Upstream Fork Drift',
          blocks: [
            { id: 'p_spec_1', type: 'p' },
            { id: 'p_spec_2', type: 'p' },
            { id: 'sidebar_interception_contract', type: 'sidebar', kicker: 'Integration Contract', title: 'The CompassDraw Interception Hook Contract' }
          ]
        },
        {
          section: 'trademark',
          partLabel: 'Chapter 9 • Strategy',
          title: 'CompassDraw: The Public Domain Playbook',
          blocks: [
            { id: 'p_trademark_1', type: 'p' },
            { id: 'p_trademark_2', type: 'p' },
            { id: 'sidebar_trademark_vs_patent', type: 'sidebar', kicker: 'IP Distinction', title: 'Why CompassDraw Is Legally Bulletproof' }
          ]
        }
      ];
    }
  static p_artcraft_1() {
    return [
      "In late 2026, developer Brandon Thomas launched ArtCraft—a suite of clean-room, pure-Rust applications created to take on Adobe and Autodesk subscription models. Among tools like PhotoCraft, VectorCraft, and FilmCraft, the flagship engineering tool is CADCraft (v0.7.0, hosted at `github.com/storytold/cadcraft` and `getartcraft.com`). It is a fast, multiplatform AutoCAD alternative that compiles to native binaries on macOS, Windows, Linux, and FreeBSD, as well as to WebAssembly for the browser."
    ];
  }

  static p_artcraft_2() {
      return [
        "CADCraft recreates AutoCAD's workflow: command-line prompt loops (`LINE`, `CIRCLE`, `OFFSET`, `TRIM`), layers, dimensions, and DXF/DWG file handling via acadrust. However, it inherits AutoCAD's historic constraints: drafting is largely confined to 2D planes, lacks kinetic 3D construction plane rotation, has no context-aware floating compass, and requires typing coordinate offsets like `@5<45`.",
        "Our objective is not to compete with CADCraft or build another clone from scratch. Our mission is to **convince the ArtCraft and open-source CAD community to put three clean, non-invasive hooks into their architecture**. If those hooks exist, CompassDraw can be distributed as a drop-in plugin that unlocks 3D spatial superpowers with zero upstream fork drift. Because this specification is mathematically rigorous and complete, a modern AI agent can implement these hooks into CADCraft **overnight**, leaving only verification and testing for the maintainers."
      ];
    }

  static sidebar_cadcraft_spec() {
      return [
        "The Upstream Partnership Thesis (ArtCraft & Rob Brown):\n" +
        "• The Official 3D Engine: The ideal path is ArtCraft adopting CompassDraw as its official built-in 3D spatial drafting engine, with inventor Rob Brown leading the spatial interaction roadmap.\n" +
        "• Zero-Drift Plugin Superpower: CADCraft remains 100% AutoCAD-compatible. No commands or data structures are altered.\n" +
        "• The 3 Clean Hooks: PointInterceptor (filters points before Accept::POINT), RenderOverlay (top wgpu pass for the compass), and CommandHint (tools dispatch exit tangents).\n" +
        "• Overnight Agent Implementation: An AI coding agent can implement these three traits in a clean PR in hours because CadPlan provides the exact mathematical derivations.\n" +
        "• Strategic Win-Win: Gives ArtCraft the 30-year usability moat that kept Bentley customers loyal, while giving Rob Brown the platform to run with modern spatial CAD."
      ];
    }
  static p_crate_arch_1() {
    return [
      "Our inspection of the cloned CADCraft repository confirms a modern, modular Rust workspace. Instead of a monolithic executable, the system is partitioned into discrete domain crates. At the mathematical foundation sits `cadcraft-geom`, which manages 64-bit double-precision (`f64`) vector geometry, transformation matrices, and spline interpolation."
    ];
  }

  static p_crate_arch_2() {
    return [
      "Crucially, the workspace contains both `cadcraft-engine` (which drives the interactive event loop, tool state machines, and cursor hit-testing) and `cadcraft-constraints`. This demonstrates that CADCraft's architectural roadmap is actively looking toward constraint-based workflows, making it the ideal host for CompassDraw."
    ];
  }

  static sidebar_cadcraft_crates() {
    return [
      "Verified CADCraft v0.7.0 Crate Map:\n• `cadcraft-geom`: Pure 64-bit geometric primitives, vectors (`Vec2`), rays, bounds, and transformation matrices (`Mat3`).\n• `cadcraft-constraints`: Geometric relationship and dimensional constraint solver using damped Gauss-Newton minimization (`lm.rs`).\n• `cadcraft-doc`: High-performance copy-on-write document database (layers, blocks, undo/redo).\n• `cadcraft-engine`: Interactive tool state machines, mouse/keyboard event loops, coordinate filters (`pointmod.rs`), and vertex snapping.\n• `cadcraft-render`: Viewport rendering abstraction built on `wgpu`.\n• `cadcraft-ui-egui`: Immediate-mode desktop UI shell.\n• `cadcraft-mcp`: Model Context Protocol server exposing CAD endpoints to AI coding agents."
    ];
  }

  static p_crate_arch_3() {
    return [
      "Because `cadcraft-engine` handles coordinate inputs through discrete event streams, CompassDraw does not need to alter how DWG entities or document layers are serialized. We hook directly into `cadcraft-engine`'s point-input pipeline: when a command requests a coordinate, CompassDraw resolves the point using direction cosines and active constraints, then delivers the clean 3D coordinate."
    ];
  }

  static p_pointmod_1() {
    return [
      "Inside `cadcraft-engine/src/pointmod.rs`, CADCraft implements standard AutoCAD point modifiers. In AutoCAD, point modifiers allow users to filter incoming points (e.g., typing `.x` to lock the X coordinate of a reference vertex, or engaging Ortho mode with F8 to restrict movement to horizontal or vertical axes)."
    ];
  }

  static p_pointmod_2() {
    return [
      "In CADCraft's source code, `Session::point_mods` stores an active stack of `Frame` enums representing active `.X`, `.Y`, `FROM`, or `M2P` modifiers. While a frame is pending, CADCraft halts normal command execution and displays modal sub-prompts. CompassDraw bypasses this friction by maintaining a live 3D floating orientation frame (`Mat3`): single-key shortcuts (`X`, `Y`, `Z`, `L`) lock dimensions instantaneously without prompting, passing resolved coordinates directly to the command."
    ];
  }

  static sidebar_pointmod_hook() {
    return [
      "Verified cadcraft-engine::pointmod::Frame Enum:\n```rust\npub enum Frame {\n    From { base: Option<Vec2> },\n    Mid { first: Option<Vec2> },\n    Filter { keep: Axes, first: Option<Vec2> },\n    Angle { base: Vec2, dir: Vec2 },\n    Snap { mode: u32 },\n    TempTrack,\n    Track { last: Option<Vec2> },\n}\n```\n• 2D Limitation: CADCraft coordinates are strictly `Vec2`. All point filters assume a flat planar projection.\n• Modal Prompting: While frames are pending, the engine prompts for missing axes (e.g. '.X of', '(need YZ):').\n• The CompassDraw Upgrade: Replaces modal prompt waiting with a kinetic 3D direction-cosine basis (`Mat3`). Cursor motion and single-key locks immediately resolve 3D coordinates into `Accept::POINT` without typing."
    ];
  }

  static p_pointmod_3() {
    return [
      "Notice that CADCraft's `pointmod.rs` currently relies strictly on 2D coordinates (`Vec2`). By introducing CompassDraw's 3D direction-cosine basis (`T`, `F`, `S`, `V`), we expand CADCraft from planar 2D drafting into full 3D spatial construction planes without modifying AutoCAD command semantics."
    ];
  }

  static p_cmds_1() {
      return [
        "A complete inspection of `cadcraft-engine/src/cmd` reveals how native AutoCAD commands are structured. For example, in `draw.rs`, the `LINE` command registers an initial prompt ('Specify first point:') requiring `Accept::POINT`. Once satisfied, it transitions into an iterative segment loop ('Specify next point or [Undo]:') until the user presses Enter or Escape."
      ];
    }
  static p_cmds_2() {
    return [
      "Each command in `cadcraft-engine/src/cmd` follows a standardized execution lifecycle: it registers required inputs via `Session::prompt`, queries whether `Accept::POINT` is active, and receives coordinates dispatched through the engine's event loop. When paired with CompassDraw and our local LAN TouchController, the designer can navigate 3D construction planes and modulate parameters with their left hand on their phone while their right hand snaps geometry with zero modal interruptions."
    ];
  }

  static sidebar_cmds_map() {
    return [
      "CADCraft Command Map (crates/engine/src/cmd):\n• `draw.rs` & `draw2.rs`: Primitive drafting (LINE, RECTANG, POLYGON, POINT).\n• `curves.rs`: Circular arcs, 3-point arcs, full circles, and ellipses.\n• `pline_opts.rs`: Continuous polylines with inline arc segment switching.\n• `spline_opts.rs`: NURBS spline curve generation with fit points and control vertices.\n• `trimextend.rs`: Boundary trimming and edge extension.\n• `constraints.rs`: Command interface connecting entities to the Levenberg-Marquardt solver."
    ];
  }

  static p_doc_1() {
    return [
      "In `cadcraft-doc`, CADCraft uses a high-performance copy-on-write document architecture. Geometric primitives are stored as discrete, immutable records indexed by a generational entity handle (`Handle`). When an entity is drawn, modified, or deleted, a lightweight delta transaction is committed to the drawing database, allowing instant multi-level undo and redo."
    ];
  }

  static p_doc_2() {
    return [
      "Our inspection of `cadcraft-doc/src/entity.rs` confirms a comprehensive 30-variant `EntityKind` enum representing the complete AutoCAD entity taxonomy: from standard `Line`, `Arc`, and `Circle` primitives, to `LwPolyline`, `Polyline3d`, `Spline`, `Helix`, and `Dimension` objects. CompassDraw targets these entities directly, resolving constraints in real time and committing pure geometric vectors to the document store."
    ];
  }

  static sidebar_doc_entities() {
    return [
      "Verified cadcraft-doc::EntityKind Enum (30 Variants):\n```rust\npub enum EntityKind {\n    Line(Line), Point(Point), Circle(Circle), Arc(Arc), Ellipse(Ellipse),\n    LwPolyline(LwPolyline), Polyline3d(Polyline3d), Spline(GSpline), Helix(Helix),\n    Ray(RayLine), XLine(RayLine), Text(Text), MText(MText), AttDef(Attrib),\n    Insert(Insert), Dimension(Dimension), MLine(MLine), Leader(Leader),\n    MLeader(MLeader), Hatch(Hatch), Solid(Solid), Trace(Solid), Face3d(Face3d),\n    Region(Region), Viewport(Viewport), Image(Image), Wipeout(Wipeout),\n    Table(Table), Tolerance(Tolerance), Unknown(Unknown)\n}\n```\n• Generational Handles: Every entity is addressed via numeric `Handle`, eliminating dangling pointers.\n• Copy-on-Write: Whole-drawing clones are lightweight pointer copies, enabling instant undo/redo snapshots."
    ];
  }

  static p_snap_comp_1() {
    return [
      "In `cadcraft-engine/src/snap.rs`, CADCraft implements traditional AutoCAD object snaps (O-snaps). It queries an R-tree spatial index (`spatial.rs`) to find nearby geometry features: endpoints, midpoints, centers, perpendicular projections, and intersections. However, standard O-snaps are passive: they only trigger when the cursor happens to land directly on top of existing geometry."
    ];
  }

  static p_snap_comp_2() {
    return [
      "CompassDraw radically elevates this through tentative snapping and active projection guides. In our prototype (`TentativePointHandler.js`), chorded clicks (or dedicated hotkeys) initiate a tentative point. If an element's wireframe is thin, screen-space segment thresholding performs a 'thick pick' within a 10-pixel radius, snapping to the element and dropping dynamic perpendicular projection lines down to the working plane."
    ];
  }

  static sidebar_snap_mechanics() {
    return [
      "Snapping Comparison:\n• CADCraft O-Snaps (`snap.rs`): Passive proximity testing against an R-tree index. Rigid, screen-planar, and requires the mouse to stay hovering over the target vertex.\n• CompassDraw Tentative Snapping (`TentativePointHandler.js`): Active spatial anchoring. Captures a candidate vertex, anchors the floating origin, renders a 3-axis Mini-Jack cursor, and allows the mouse to pull away along locked axes while maintaining the exact coordinate anchor."
    ];
  }

  static p_wasm_1() {
      return [
        "In `apps/cadcraft-web`, CADCraft provides its official WebAssembly browser application. Built using `trunk build --release`, the app runs the identical `cadcraft_ui_egui::CadApp` as the desktop binary through eframe's web runner, supporting WebGPU where available with an automatic WebGL2 fallback via the `?webgl` URL parameter."
      ];
    }
  static p_wasm_2() {
    return [
      "By deploying CompassDraw as a WebAssembly-compatible input module, we can run our complete 3D constraint engine directly inside `cadcraft-web`. Users accessing CADCraft in the browser get immediate AccuDraw-style single-key plane switching (`T`, `F`, `S`, `V`), squircle polar/rectangular transitions, and P2P mobile phone control with zero local installation."
    ];
  }

  static sidebar_wasm_interface() {
      return [
        "Verified apps/cadcraft-web Architecture:\n• Toolchain: Compiled with `trunk build --release` from `apps/cadcraft-web` (output in `dist/web`).\n• GPU Pipeline: eframe web runner with WebGPU primary and WebGL2 fallback (`?webgl` flag).\n• Runtime URL Flags:\n  - `?host=parent`: Activates `host.rs` iframe parent bridge.\n  - `?webgl`: Forces WebGL2 mode across older browsers.\n  - `?cpu`: Draws canvas via CPU rasterization with egui shapes.\n  - `?sample`: Pre-loads CADCraft sample drawing.\n• Zero-Fork Embedding: Parent page loads `iframe src=\"cadcraft-web/?host=parent&webgl\"` and controls drawing state via postMessage."
      ];
    }
  static p_pm_1() {
    return [
      "Our inspection of `apps/cadcraft-web/src/host.rs` revealed an extraordinary integration asset: CADCraft's web build already includes a native `postMessage` bridge for same-origin parent pages when launched with `?host=parent` (originally designed for embedding in iframe containers like Nextcloud apps)."
    ];
  }

  static p_pm_2() {
      return [
        "Inside `apps/cadcraft-web/src/host.rs`, a thread-local `BRIDGE` intercepts the engine's file delivery hook (`deliver`). When running under `?host=parent`, CADCraft dispatches `cadcraft:ready` with its engine version. The parent page can inject drawings by posting `{ type: 'cadcraft:open', name: 'model.dwg', bytes: arrayBuffer }`. Whenever the user triggers `SAVE`, `SAVEAS`, or export, CADCraft intercepts browser downloads and transfers the raw `ArrayBuffer` directly to the parent page via `cadcraft:save`, while `cadcraft:dirty` reports unsaved state changes."
      ];
    }

  static sidebar_postmessage_protocol() {
      return [
        "Verified apps/cadcraft-web/src/host.rs Implementation:\n```javascript\n// Parent Shell (Luno / Three.js) Integration Recipe:\nconst iframe = document.createElement('iframe');\niframe.src = '/cadcraft-web/index.html?host=parent&webgl';\ndocument.body.appendChild(iframe);\n\nwindow.addEventListener('message', (e) => {\n  if (e.origin !== window.location.origin) return;\n  const { type, name, bytes, dirty, version } = e.data;\n\n  if (type === 'cadcraft:ready') {\n    console.log(`CADCraft v${version} engine initialized.`);\n    // Send DWG/DXF ArrayBuffer to open\n    iframe.contentWindow.postMessage({\n      type: 'cadcraft:open',\n      name: 'chassis.dwg',\n      bytes: drawingArrayBuffer\n    }, window.location.origin);\n  }\n  else if (type === 'cadcraft:save') {\n    // Intercepts SAVE/EXPORT commands with zero-copy ArrayBuffer transfer\n    console.log(`Received saved binary for ${name} (${bytes.byteLength} bytes)`);\n    CadStorageManager.saveDrawingBinary(name, bytes);\n  }\n  else if (type === 'cadcraft:dirty') {\n    updateUnsavedStatus(dirty);\n  }\n});\n```\n• Zero-Copy: Uses post_message_with_transfer(&[buffer]) in Rust for instantaneous binary I/O.\n• Zero Upstream Drift: CADCraft requires zero source code modifications to embed into our workspace."
      ];
    }

  static p_pm_3() {
      return [
        "This postMessage protocol establishes our Phase 1 zero-fork integration architecture: our workspace embeds unmodified `cadcraft-web` inside an iframe with `?host=parent&webgl`, overlays our Three.js CompassDraw squircle HUD and P2P mobile touch controller directly above the iframe canvas, and routes drawing files via zero-copy `ArrayBuffer` transfers without touching a single line of CADCraft's upstream Rust code."
      ];
    }
  static p_lm_solver_1() {
    return [
      "A notable discovery in the CADCraft codebase is `cadcraft-constraints`. The crate includes `lm.rs` (a Levenberg-Marquardt non-linear least-squares solver) and `dof.rs` (a Degrees-of-Freedom analyzer). This shows CADCraft is already laying the foundation for parametric constraint solving."
    ];
  }

  static p_lm_solver_2() {
      return [
        "Inside CADCraft's `crates/constraints/src/lm.rs`, the Levenberg-Marquardt solver minimizes non-linear geometric residuals using a damped Gauss-Newton step: `Δx = −W⁻¹ Jᵀ (J W⁻¹ Jᵀ + μ I)⁻¹ r` with finite-difference Jacobians. Under-constrained drawings move as little as possible, and recently placed vertices are heavily weighted.",
        "This creates a direct synergy with CompassDraw: when a user snaps an AccuDraw parallel, perpendicular, or distance lock, CompassDraw resolves the instantaneous 3D point for the command loop, and simultaneously posts a residual constraint to `cadcraft-constraints` for persistent parametric updates."
      ];
    }
  static sidebar_constraints_solver() {
    return [
      "CADCraft Constraint Engine Internals:\n• `lm.rs`: Dampened non-linear least-squares optimization minimizing geometric residual equations.\n• `dof.rs`: Tracks unconstrained degrees of freedom across topological vertices.\n• `residual.rs`: Calculates geometric divergence (distance deltas, angle errors) for solver iterations.\n• Synergy with CompassDraw: CompassDraw establishes transient drafting constraints in real time, which can then be serialized into `cadcraft-constraints` for persistent parametric editing."
    ];
  }

  static p_mcp_1() {
    return [
      "One of CADCraft's most forward-looking components is `cadcraft-mcp`. The Model Context Protocol (MCP) crate provides a standardized server interface allowing external AI models (like Claude or local LLMs) to inspect drawing state, query layers, and execute drafting operations through structured JSON-RPC calls."
    ];
  }

  static p_mcp_2() {
    return [
      "Historically, CAD automation was restricted to LISP scripts or heavy C++ ARX plugins that required intricate manual scripting. Under CADCraft's MCP architecture, an AI agent can read drawing geometry, infer design intent, and issue drawing commands directly. When paired with CompassDraw, the agent can specify relative vectors and alignment locks using the same geometric vocabulary as a human drafter."
    ];
  }

  static sidebar_mcp_endpoints() {
    return [
      "cadcraft-mcp Architecture:\n• Model Context Protocol Server: Exposes drawing sessions to AI coding agents via standard stdio JSON-RPC transport.\n• Tool Endpoints: `tool_definitions()`, `call_tool()`, and `command_matches()` for querying entities, creating lines/arcs, applying layers, and reading bounds.\n• CompassDraw Agent Synergy: Allows autonomous AI agents to drive the AccuDraw/CompassDraw constraint engine programmatically, producing perfectly snapped, non-overlapping geometry without trial-and-error coordinate typing."
    ];
  }

  static p_spec_1() {
      return [
        "The primary architectural requirement for the upstream integration is maintaining **zero fork drift**: CADCraft's command loop, document schema, and file parsers must remain completely unmodified. CompassDraw sits in `cadcraft-engine` as an optional input filter.",
        "When a user is in classic AutoCAD mode, raw mouse events flow directly into `pointmod.rs` as normal. But when CompassDraw is engaged, it intercepts mouse coordinates and keyboard strokes before CADCraft's prompt state machine can enter a modal waiting state."
      ];
    }

  static p_spec_2() {
      return [
        "To achieve this, our AI agents will submit a clean pull request implementing the `PointInterceptor` trait in `cadcraft-engine/src/interceptor.rs`. In `session.rs`, before `Session::step` evaluates input modifiers, it checks `interceptor.filter_point(...)`.",
        "If the compass has an active axis lock, tentative point, or distance constraint, it returns the resolved coordinate. The command receives a valid coordinate satisfying `Accept::POINT` on the first click. Single-keystroke commands (`T`, `F`, `S`, `V`, `L`, `Space`) return `true` from `handle_key(...)`, intercepting the keystroke before it can clutter the AutoCAD command-line prompt buffer."
      ];
    }

  static sidebar_interception_contract() {
      return [
        "The Upstream PointInterceptor Trait Contract:\n" +
        "```rust\n" +
        "// crates/engine/src/interceptor.rs\n" +
        "pub trait PointInterceptor {\n" +
        "    /// Resolves raw viewport raycasts into constrained 3D/2D coordinates.\n" +
        "    fn filter_point(\n" +
        "        &mut self,\n" +
        "        raw_world_point: [f64; 3],\n" +
        "        ray_origin: [f64; 3],\n" +
        "        ray_direction: [f64; 3],\n" +
        "        is_tentative_active: bool,\n" +
        "    ) -> Option<[f64; 3]>;\n\n" +
        "    /// Captures single-stroke shortcuts without waiting for Enter.\n" +
        "    fn handle_key_down(&mut self, key: &str, ctrl: bool, shift: bool) -> bool;\n" +
        "}\n\n" +
        "// crates/engine/src/cmd/traits.rs\n" +
        "pub trait CommandHintEmitter {\n" +
        "    /// Allows tools like LineM and PlineM to inform CompassDraw\n" +
        "    /// of segment exit tangents, origins, and polar lock hints.\n" +
        "    fn emit_hint(&mut self, hint: AccuDrawHint);\n" +
        "}\n" +
        "```\n" +
        "• 2D/3D Harmony: In 2D mode, `filter_point` clamps $Z=0$ and returns `[x, y, 0]`, mapping seamlessly to CADCraft's `Vec2`.\n" +
        "• Zero Command Drift: Commands like `LineM` remain 100% standard AutoCAD code."
      ];
    }
  static p_trademark_1() {
    return [
      "A key strategic decision is naming. Bentley Systems holds the trademark on 'AccuDraw'. However, my foundational patent (US Patent #5,754,182, issued in 1998) has reached the end of its 20-year statutory term and is now in the public domain. The mathematics—floating origin translation, direction-cosine matrix projections, smart locks, and polar/rectangular squircle transitions—can be implemented freely by anyone."
    ];
  }

  static p_trademark_2() {
    return [
      "By rebranding our implementation as CompassDraw (or SmartCompass / Compass CAD), we eliminate any trademark friction with Bentley while bringing the functionality to CADCraft and AutoCAD users. The name communicates the function immediately: an intelligent, floating 3D kinetic compass that guides the cursor."
    ];
  }

  static sidebar_trademark_vs_patent() {
    return [
      "IP Analysis:\n1. Patents (Expired): US Patent #5,754,182 (Robert J. Brown, Bentley Systems). The 20-year exclusivity period has expired. The underlying algorithms and user interface mechanics are public domain.\n2. Trademarks (Active): 'AccuDraw', 'MicroStation', and 'SmartLine' remain active marks of Bentley Systems.\n3. Brand Independence: Using 'CompassDraw' allows us to distribute the tool freely across open-source ecosystems without trademark complications."
    ];
  }

  static p_engine_1() {
    return [
      "A central engineering question is whether to build purely in Rust or maintain a browser-first Three.js architecture. Pure Rust (`wgpu` / Bevy / `femtovg`) creates fast, self-contained desktop executables without a browser runtime. However, rebuilding Three.js's 3D visual capabilities from scratch in Rust requires significant graphics engineering."
    ];
  }

  static p_engine_2() {
    return [
      "In Three.js, loading a glTF/GLB model with realistic PBR materials, clearcoat reflections, and directional shadows requires just a few lines of code. More importantly, Three.js provides `Line2`—anti-aliased, screen-space thick line rendering with accurate miter joints and depth testing. In raw `wgpu`, implementing resolution-independent line thickness across 3D perspective projections requires custom vertex shader expansion pipelines and fragment distance fields."
    ];
  }

  static sidebar_engine_comparison() {
    return [
      "Pipeline Comparison:\n• Pure Rust (`wgpu`): High desktop performance, small binary size, direct native CADCraft integration. Trade-offs: Complex custom shaders for thick wireframes, manual glTF/PBR material pipelines, and higher maintenance.\n• Three.js (WebGL/WebGPU): Rapid iteration, built-in PBR materials (`MeshPhysicalMaterial`), glTF/Draco loaders, native WebRTC P2P for phone controllers, and instant zero-install web distribution.\n• The Hybrid Solution: Implement the CompassDraw constraint math as a decoupled module (or Rust crate compiled to WebAssembly). On desktop, it drives CADCraft's native viewport; in the web sandbox, it drives Three.js with full PBR rendering."
    ];
  }

  static p_engine_3() {
    return [
      "The hybrid model allows us to deploy CompassDraw everywhere: CADCraft desktop users get native snap constraints inside their command loop, while web users access our full studio workspace featuring GLB model loading, multi-touch phone control, and real-time PBR material rendering. By replacing failing public relay proxies with local LAN SSE signaling (via `TouchController/signal-server.js`), mobile devices pair instantaneously over Wi-Fi with sub-millisecond input response."
    ];
  }

  static p_bulge_1() {
      return [
        "Our inspection of CADCraft's `crates/engine/src/cmd/pline_opts.rs` revealed how native polyline arc segments are stored. CADCraft uses the universal CAD bulge factor: `cadcraft_geom::arc_to_bulge` and `bulge_to_arc`."
      ];
    }

  static p_bulge_2() {
      return [
        "In AutoCAD and CADCraft's `LwPolyline`, every vertex is stored as `(x, y, bulge)`. When `bulge = 0.0`, the segment is a straight line. When `bulge != 0.0`, it encodes a circular arc whose included sweep angle is $\\theta = 4 \\arctan(\\text{bulge})$ (positive for counter-clockwise, negative for clockwise). This is mathematically elegant: a single scalar encodes whether a segment is straight or an arc without allocating separate entities."
      ];
    }

  static sidebar_bulge_math() {
      return [
        "The Bulge Factor tan(θ/4) Representation:\n" +
        "• Definition: `bulge = tan(θ / 4) = (2 * height) / chord_length`\n" +
        "• Advantages:\n" +
        "  1. Exact Geometry: Lossless round-tripping through DXF and binary DWG.\n" +
        "  2. Zero Allocation: A polyline with 50 arcs and lines is a single contiguous array of `(x, y, bulge)` tuples.\n" +
        "  3. SmartLine Parity: When SmartLine transitions from a line to an arc, it simply computes the tangent bulge and writes it to the prior vertex!"
      ];
    }

  static p_lisp_1() {
      return [
        "A fascinating discovery in CADCraft's command directory (`crates/engine/src/cmd/lisp.rs`) is an embedded AutoLISP evaluation engine implemented completely in pure Rust. Historically, AutoCAD's dominance in civil and architectural workflows was cemented by hundreds of thousands of legacy `.lsp` utility scripts."
      ];
    }

  static p_lisp_2() {
      return [
        "Because CADCraft parses and evaluates LISP S-expressions in-process, we can expose CompassDraw's constraint and coordinate functions directly as native AutoLISP primitives (e.g. `(compass-set-origin pt)`, `(compass-lock-axis \"X\" val)`, `(smartline-segment end-pt radius)`). Drafting automation routines can now leverage AccuDraw's 3D spatial alignment directly from script."
      ];
    }

  static sidebar_lisp_architecture() {
      return [
        "CADCraft AutoLISP Engine (`crates/engine/src/cmd/lisp.rs`):\n" +
        "• In-Process S-Expression Evaluator: Parses and runs classic AutoLISP scripts without external C/ARX runtimes.\n" +
        "• Command Interception: Evaluates `(command \"LINE\" ...)` and routes inputs into `Session::command_line`.\n" +
        "• CompassDraw LISP Primitives:\n" +
        "  - `(cd:origin [x y z])`: Relocates the kinetic compass origin.\n" +
        "  - `(cd:plane 'top | 'front | 'side | matrix)`: Reorients the construction plane.\n" +
        "  - `(cd:smart-lock)`: Evaluates dynamic Smart Lock in script.\n" +
        "  - `(cd:smartline pts radii)`: Creates multi-segment tangent-arc polylines."
      ];
    }

  static p_tax_1() {
      return [
        "Our inspection of `cadcraft-engine/src/cmd/constraints.rs` (1,175 lines) reveals how CADCraft organizes parametric rules. Following AutoCAD conventions, it partitions constraints into Geometric Constraints (GC) and Dimensional Constraints (DC), implemented via the `gc!` and `dc!` macros."
      ];
    }

  static p_tax_2() {
      return [
        "Each command takes parameters referencing entity handles (`h1`, `h2`) and geometric sub-elements (`\"start\"`, `\"end\"`, `\"mid\"`, `\"center\"`, `\"seg<i>\"`). When an edit occurs, the `after_command` hook calls the Levenberg-Marquardt solver in `cadcraft-constraints`, preserving all geometric rules while minimizing vertex displacement. By pairing CompassDraw with this pipeline, drafting gestures immediately convert into persistent parametric constraints."
      ];
    }

  static sidebar_constraint_taxonomy() {
      return [
        "CADCraft Parametric Constraints Schema (cadcraft-doc & cmd/constraints.rs):\n" +
        "• Geometric Constraints (GC):\n" +
        "  - `GCCOINCIDENT`: Point-to-point or point-to-curve coincident latching.\n" +
        "  - `GCCOLINEAR`: Constrains lines to lie on the same infinite axis.\n" +
        "  - `GCCONCENTRIC`: Equal center points across circles and arcs.\n" +
        "  - `GCPARALLEL`: Parallel slope alignment.\n" +
        "  - `GCPERPENDICULAR`: Orthogonal 90° vector constraint.\n" +
        "  - `GCTANGENT`: Tangency across line-arc or curve-curve intersections.\n" +
        "  - `GCSMOOTH`: Continuous $G^2$ curvature tangency across splines.\n" +
        "  - `GCSYMMETRIC`: Mirror symmetry relative to an axis.\n" +
        "  - `GCEQUAL`: Equal length or radius matching.\n" +
        "  - `GCFIX`: Pins a vertex to an absolute world coordinate.\n" +
        "• Dimensional Constraints (DC):\n" +
        "  - `DCLINEAR`, `DCALIGNED`, `DCHORIZONTAL`, `DCVERTICAL`: Distance constraints.\n" +
        "  - `DCANGULAR`: Preserves angular relationships.\n" +
        "  - `DCRADIUS`, `DCDIAMETER`: Preserves circular dimensions."
      ];
    }

  static p_accept_1() {
      return [
        "To understand how input is dispatched on the other side, we examine CADCraft's command loop in `crates/engine/src/cmd/draw.rs` and `session.rs`. Every interactive tool implements the `Interactive` trait, declaring an input state machine driven by `Prompt`:",
        "```rust\n" +
        "impl Interactive for LineM {\n" +
        "    fn prompt(&self) -> Prompt {\n" +
        "        match self.st {\n" +
        "            None => Prompt::new(\"Specify first point:\").accepts(Accept::POINT),\n" +
        "            Some(_) => Prompt::new(\"Specify next point or [Close/Undo]:\")\n" +
        "                .accepts(Accept::POINT | Accept::KEYWORD)\n" +
        "                .keywords(&[\"Close\", \"Undo\"]),\n" +
        "        }\n" +
        "    }\n" +
        "    fn step(&mut self, s: &mut Session, input: Input) -> Result<Step>;\n" +
        "}\n" +
        "```",
        "When a user clicks the mouse, the engine dispatches `Input::Point(Vec2)`. The command machine updates its internal vertex buffer and commits changes to the document database."
      ];
    }

  static p_accept_2() {
      return [
        "Our `PointInterceptor` hook sits in `crates/engine/src/session.rs` immediately above this event loop. Here is the exact runtime wiring:",
        "1. The OS window (`winit`) fires `WindowEvent::CursorMoved { position, .. }` or `MouseInput`.",
        "2. The camera unprojects the 2D cursor coordinate into a 3D ray `(ray_origin, ray_direction)` in WCS.",
        "3. `PointInterceptor::filter_point` tests the ray against CompassDraw's active construction plane $(\\vec{P} - \\vec{O}_c) \\cdot \\vec{Z}_c = 0$, evaluates active locks (`X`, `Y`, `Z`, `Dist`, `Angle`), and calculates snapping proximity.",
        "4. If constrained, it transforms the 3D coordinate into CADCraft's OCS plane `(u, v)` and hands `Input::Point(Vec2::new(u, v))` to `step(&mut self, s, input)`.",
        "5. The command receives a valid point on the very first frame without CADCraft ever pausing to display a modal prompt!"
      ];
    }

  static sidebar_accept_loop() {
      return [
        "End-to-End Event Wire-Up (winit ➔ AccuDraw ➔ CADCraft):\n" +
        "1. winit Window Event:\n" +
        "   • Receives physical mouse pixel (x, y) or keyboard character.\n" +
        "2. Camera Unprojection:\n" +
        "   • Generates 3D ray in World Space: ray = (ray_origin, ray_dir).\n" +
        "3. CompassDraw PointInterceptor:\n" +
        "   • Calculates plane intersection: P = ray_origin + t * ray_dir.\n" +
        "   • Applies AccuDraw delta: lx = (P - Origin) · X_c, ly = (P - Origin) · Y_c.\n" +
        "   • Applies SmartLock (L), numerical locks, or tentative vertex snaps.\n" +
        "4. Transform to CADCraft OCS:\n" +
        "   • u = (P_constrained - WCS_origin) · ax, v = (P_constrained - WCS_origin) · ay.\n" +
        "5. CADCraft Command Step:\n" +
        "   • Invokes cmd.step(&mut session, Input::Point(Vec2::new(u, v))).\n" +
        "   • Satisfies Accept::POINT instantly with zero command-line prompt lag!"
      ];
    }
  static p_plinem_1() {
      return [
        "To wire CompassDraw into CADCraft, we must understand how AutoCAD and CADCraft represent 3D geometry. CADCraft adopts AutoCAD's historical coordinate hierarchy:",
        "1. **WCS (World Coordinate System):** The immutable 3D Cartesian frame $(X_w, Y_w, Z_w)$ shared by all entities.",
        "2. **UCS (User Coordinate System):** A movable 3D frame with an origin $\\vec{O}_{ucs}$ and orientation matrix. In legacy AutoCAD, moving the UCS was modal and cumbersome.",
        "3. **OCS / ECS (Object/Entity Coordinate System):** An ingenious 2.5D storage optimization. Instead of storing bloated 3D $(x, y, z)$ coordinates for every node of a planar entity (`LWPOLYLINE`, `CIRCLE`, `ARC`, `HATCH`), CADCraft stores an **Extrusion Normal Vector** $\\vec{N} = (N_x, N_y, N_z)$, an **Elevation** scalar $Z_e$, and compact 2D $(u, v)$ coordinates on that plane.",
        "4. **DCS (Display Coordinate System):** The viewport projection space (orthographic or perspective) where 3D world geometry is mapped to 2D screen pixels."
      ];
    }

  static p_plinem_2() {
      return [
        "To convert between 2D OCS $(u, v)$ and 3D WCS $(X_w, Y_w, Z_w)$, CADCraft implements AutoCAD's **Arbitrary Axis Algorithm** in `crates/geom/src/mat.rs` via `Mat4::ocs(normal: Vec3)`. Given a unit normal $\\vec{N}$:",
        "• If $|N_x| < \\frac{1}{64}$ and $|N_y| < \\frac{1}{64}$, $\\vec{A}_x = \\vec{Y} \\times \\vec{N} = (0, 1, 0) \\times \\vec{N}$.",
        "• Otherwise, $\\vec{A}_x = \\vec{Z} \\times \\vec{N} = (0, 0, 1) \\times \\vec{N}$.",
        "• $\\vec{A}_x = \\text{normalize}(\\vec{A}_x)$, and $\\vec{A}_y = \\vec{N} \\times \\vec{A}_x$.",
        "The resulting matrix $[\\vec{A}_x, \\vec{A}_y, \\vec{N}]$ establishes an orthonormal basis on any angled face. When CompassDraw is active, our `ThreeAxes` $[\vec{X}_c, \\vec{Y}_c, \\vec{Z}_c]$ sets $\\vec{Z}_c = \\vec{N}$. Every 3D point $\\vec{P}$ resolved by AccuDraw is projected into CADCraft's OCS plane using $u = (\\vec{P} - \\vec{O}_w) \\cdot \\vec{A}_x$ and $v = (\\vec{P} - \\vec{O}_w) \\cdot \\vec{A}_y$. CADCraft saves the entity as a native `LwPolyline`, and standard AutoCAD renders the 3D angled geometry losslessly!"
      ];
    }

  static sidebar_plinem_pipeline() {
      return [
        "AutoCAD / CADCraft Transformation Pipeline & OCS Derivation:\n" +
        "```rust\n" +
        "// In cadcraft-geom/src/mat.rs:\n" +
        "impl Mat4 {\n" +
        "    /// OCS (Object Coordinate System) Arbitrary Axis Algorithm.\n" +
        "    /// Maps 2D planar polyline vertices (u, v) into 3D World Space (X, Y, Z).\n" +
        "    pub fn ocs(normal: Vec3) -> Mat4 {\n" +
        "        let n = normal.normalized();\n" +
        "        let ax = if n.x.abs() < 1.0/64.0 && n.y.abs() < 1.0/64.0 {\n" +
        "            Vec3::Y.cross(n)\n" +
        "        } else {\n" +
        "            Vec3::Z.cross(n)\n" +
        "        }.normalized();\n" +
        "        let ay = n.cross(ax).normalized();\n" +
        "        Mat4 {\n" +
        "            m: [\n" +
        "                [ax.x, ay.x, n.x, 0.0],\n" +
        "                [ax.y, ay.y, n.y, 0.0],\n" +
        "                [ax.z, ay.z, n.z, 0.0],\n" +
        "                [0.0,  0.0,  0.0, 1.0],\n" +
        "            ],\n" +
        "        }\n" +
        "    }\n" +
        "}\n\n" +
        "// Mathematical Bridge to AccuDraw:\n" +
        "// 1. CompassDraw ThreeAxes sets: Z_c = normal (N)\n" +
        "// 2. 3D World Point P is projected into CADCraft OCS 2D:\n" +
        "//    u = (P - Origin) · ax\n" +
        "//    v = (P - Origin) · ay\n" +
        "// 3. Serializes as standard CADCraft LwPolyline:\n" +
        "//    PolyVertex { point: Vec2::new(u, v), bulge: tan(θ/4) }\n" +
        "```\n" +
        "• 100% AutoCAD Parity: Zero custom entities required; standard DWG/DXF readers open it in true 3D."
      ];
    }
  static p_render_1() {
      return [
        "Our inspection of `crates/render/src/lib.rs` and `apps/cadcraft-desktop` confirms how CADCraft manages windowing and GPU dispatch. On desktop (macOS, Windows, Linux), CADCraft uses **`winit`** for OS window creation and the event pump, driving a **`wgpu`** surface (Metal on Mac, DirectX 12 on Windows, Vulkan on Linux) with **`cadcraft-ui-egui`** for toolbars and palettes.",
        "Unlike WebGL viewports that use simple 2D canvas primitives or Three.js lines, CADCraft's native renderer tessellates linear entities into screen-space triangle strips directly on the GPU to maintain crisp, resolution-independent anti-aliased wireframes."
      ];
    }

  static p_render_2() {
      return [
        "To bring CompassDraw into CADCraft without altering its core renderer, we insert a dedicated **`CompassDrawOverlayPass`** at the tail of CADCraft's frame graph. After CADCraft draws its document entities into the primary texture view, our overlay pass executes with its own depth priority.",
        "In 2D mode, this pass draws the squircle compass flat against the active working plane with orthographic projection. In 3D mode, it renders the 3-axis Mini-Jack, white index constraint lines, and tick cylinders in perspective. When running in a browser or Electron shell via `apps/cadcraft-web/src/host.rs`, this exact same render contract can be mirrored by our Three.js overlay via `postMessage`, giving draftspersons identical visual cues on desktop and web."
      ];
    }

  static sidebar_render_wgpu() {
      return [
        "Native Desktop wgpu & winit Pipeline Blueprint:\n" +
        "```rust\n" +
        "// crates/render/src/overlay.rs\n" +
        "pub struct CompassDrawOverlayPass {\n" +
        "    pipeline: wgpu::RenderPipeline,\n" +
        "    vertex_buffer: wgpu::Buffer,\n" +
        "    index_buffer: wgpu::Buffer,\n" +
        "    uniform_buffer: wgpu::Buffer, // Mat4 projection & view matrices\n" +
        "}\n\n" +
        "impl CompassDrawOverlayPass {\n" +
        "    pub fn render(\n" +
        "        &mut self,\n" +
        "        encoder: &mut wgpu::CommandEncoder,\n" +
        "        view: &wgpu::TextureView,\n" +
        "        compass_data: &CompassDrawVisualState,\n" +
        "    ) {\n" +
        "        let mut rpass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {\n" +
        "            label: Some(\"CompassDraw Overlay Pass\"),\n" +
        "            color_attachments: &[Some(wgpu::RenderPassColorAttachment {\n" +
        "                view,\n" +
        "                resolve_target: None,\n" +
        "                ops: wgpu::Operations {\n" +
        "                    load: wgpu::LoadOp::Load, // Preserve CADCraft drawing!\n" +
        "                    store: wgpu::StoreOp::Store,\n" +
        "                },\n" +
        "            })],\n" +
        "            depth_stencil_attachment: None,\n" +
        "            timestamp_writes: None,\n" +
        "            occlusion_query_set: None,\n" +
        "        });\n" +
        "        // Renders squircle boundary, pulsing ticks, and Mini-Jack\n" +
        "        rpass.set_pipeline(&self.pipeline);\n" +
        "        rpass.draw(0..compass_data.vertex_count, 0..1);\n" +
        "    }\n" +
        "}\n" +
        "```\n" +
        "• Non-Destructive LoadOp::Load: Draws directly over CADCraft entities without clearing the color buffer.\n" +
        "• Resolution Independent: Uniform buffer recalculates on every winit Resized event."
      ];
    }
  static p_osmode_1() {
      return [
        "Our inspection of `crates/engine/src/snap.rs` (1,189 lines) confirms CADCraft’s complete 14-bit OSMODE implementation: Endpoint (`1`), Midpoint (`2`), Center (`4`), Geometric Center (`1024`), Node (`8`), Quadrant (`16`), Intersection (`32`), Extension (`4096`), Insertion (`64`), Perpendicular (`128`), Tangent (`256`), Nearest (`512`), Apparent Intersection (`2048`), and Parallel (`8192`)."
      ];
    }

  static p_osmode_2() {
      return [
        "In standard AutoCAD and CADCraft, these snap modes are purely passive: the mouse must hover directly over geometry, and pulling the mouse away immediately loses the coordinate. CompassDraw upgrades this into an **Active Spatial Anchor**:",
        "A chorded click captures any active OSMODE vertex, anchors the floating compass origin, and renders the 3-axis Mini-Jack cursor. The draftsman is then free to pull the mouse away along locked axes or polar angles while maintaining the exact coordinate anchor point."
      ];
    }

  static sidebar_osmode_table() {
      return [
        "CADCraft 14-Bit OSMODE Bitmask (crates/engine/src/snap.rs):\n" +
        "• `END: 1` (Endpoint), `MID: 2` (Midpoint), `CEN: 4` (Center)\n" +
        "• `GCEN: 1024` (Polyline centroid), `NOD: 8` (Point entity)\n" +
        "• `QUA: 16` (0°, 90°, 180°, 270° quadrant), `INT: 32` (Intersection)\n" +
        "• `PER: 128` (Normal 90° projection), `TAN: 256` (Curve tangency)\n" +
        "• `NEA: 512` (Closest point on curve), `PAR: 8192` (Parallel alignment)\n" +
        "• CompassDraw Upgrade: Converts passive proximity snapping into active floating spatial origin locks."
      ];
    }

  static p_store_1() {
      return [
        "Our inspection of `cadcraft-doc/src/store.rs` confirms CADCraft's copy-on-write memory model (`EntityStore`). In traditional CAD databases, undo/redo stacks require heavy deep-cloning of entire drawing trees or complex reverse-delta journals that easily desynchronize after topological edits."
      ];
    }

  static p_store_2() {
      return [
        "In CADCraft, entities are immutable records indexed by generational handles (`Handle`). Taking an undo snapshot is a cheap pointer clone of the `EntityStore`. Modifying an entity creates a localized copy-on-write branch. This provides instant multi-level undo/redo during rapid CompassDraw drafting sessions with zero garbage collection overhead."
      ];
    }

  static sidebar_store_architecture() {
      return [
        "EntityStore Memory Architecture (cadcraft-doc/src/store.rs):\n" +
        "• Generational Handles: `Handle(u32)` eliminates dangling pointers and protects against iterator invalidation.\n" +
        "• Copy-on-Write (CoW): Entire drawing states clone in sub-microsecond time as pointer copies.\n" +
        "• Transaction Safety: Tool commands commit clean transactional deltas (`s.doc_mut()?.modify_entity(...)`).\n" +
        "• Zero Upstream Drift: CompassDraw emits standard entities via handles without modifying store internals."
      ];
    }

  static p_hazard_overview() {
      return [
        "When building a precision 3D CAD engine on top of AutoCAD data structures, simple vector math often fails at edge cases. Because CAD systems rely on zero-tolerance geometric invariants, minor mathematical discontinuities cause catastrophic visual glitches: polylines suddenly rotating 90 degrees when tilted past vertical, infinite tangents on circular arcs, and snap cursors jumping into empty background space.",
        "In this section, we document the four most dangerous engineering hazards discovered during our code audit of CADCraft and AutoCAD DXF specifications, and provide the exact algorithms used by `compassdraw-core` to resolve them."
      ];
    }

  static sidebar_arbitrary_axis_hazard() {
      return [
        "Hazard 1: The OCS Arbitrary Axis 1/64 Discontinuity Jump:\n" +
        "• The Trap:\n" +
        "  - AutoCAD's Arbitrary Axis Algorithm switches reference cross-vectors when $|N_x| < 1/64$ and $|N_y| < 1/64$.\n" +
        "  - If a surface normal tilts across this boundary, $\\vec{A}_x$ abruptly jumps by $90^\\circ$ from $(0, 1, 0) \\times \\vec{N}$ to $(0, 0, 1) \\times \\vec{N}$.\n" +
        "  - Naive CAD importers experience an instant $90^\\circ$ rotation of polylines!\n" +
        "• The compassdraw-core Solution:\n" +
        "  1. AccuDraw's `ThreeAxes` basis $[\\vec{X}_c, \\vec{Y}_c, \\vec{Z}_c]$ maintains continuous orientation throughout interaction.\n" +
        "  2. At export time, we derive OCS basis $[\\vec{A}_x, \\vec{A}_y, \\vec{N}] = \\text{Mat4::ocs}(\\vec{Z}_c)$.\n" +
        "  3. We calculate phase offset angle $\\phi = \\text{atan2}(\\vec{X}_c \\cdot \\vec{A}_y, \\vec{X}_c \\cdot \\vec{A}_x)$.\n" +
        "  4. Every 2D vertex $(u, v)$ is rotated by $-\\phi$ before writing to `PolyVertex`.\n" +
        "  - Result: When AutoCAD applies `Mat4::ocs`, the $90^\\circ$ axis jump is exactly cancelled out by $-\\phi$, keeping the polyline stationary in 3D world space!"
      ];
    }

  static p_hazard_apparent_skew() {
      return [
        "The second hazard occurs during snapping in 3D perspective views. In 2D drafting, any two non-parallel lines intersect at a point. In 3D space, two line entities almost never intersect—they are **skew lines** separated by an arbitrary 3D distance vector.",
        "On a 2D computer monitor, their visual screen projections cross. If an interactive snap engine naively tests for raycast intersections, it latches onto one of the background vertices. This immediately pulls the AccuDraw compass off its active construction plane, disrupting the user's working depth."
      ];
    }

  static sidebar_apparent_skew_hazard() {
      return [
        "Hazard 2: 3D Skew Lines vs. Apparent 2D Crossings:\n" +
        "• The Trap:\n" +
        "  - Two lines $L_1$ and $L_2$ appear to cross on screen, but have minimum distance $d > 0$ in 3D world space.\n" +
        "  - Naive snapping picks the 3D coordinate of $L_1$ or $L_2$, yanking the working plane off onto background geometry.\n" +
        "• The compassdraw-core Solution (Active Plane Discipline):\n" +
        "  1. The user's active construction plane is governed by plane point $\\vec{O}_c$ and normal $\\vec{Z}_c$.\n" +
        "  2. Lines $L_1$ and $L_2$ are projected onto the active plane along the plane normal $\\vec{Z}_c$ (or camera view ray if in View mode `V`).\n" +
        "  3. The intersection point $\\vec{P}_{\\text{int}}$ is solved strictly in the 2D plane coordinate system.\n" +
        "  - Result: Snapping to apparent intersections never pulls the compass off its active working depth."
      ];
    }

  static sidebar_bulge_singularity_hazard() {
      return [
        "Hazard 3: The 360° Bulge Singularity & Tangency Deadband:\n" +
        "• Semicircle: Sweep $\\theta = 180^\\circ \\implies \\text{bulge} = \\tan(45^\\circ) = 1.0$.\n" +
        "• Full Circle Singularity: As sweep $\\theta \\to 360^\\circ$, $\\theta/4 \\to 90^\\circ$, so $\\text{bulge} = \\tan(90^\\circ) \\to \\infty$ (`f64::INFINITY`).\n" +
        "  - A full circle CANNOT be represented as a single `PolyVertex` segment in AutoCAD DXF.\n" +
        "  - Solution: If an arc sweep exceeds $359.9^\\circ$, SmartLine automatically splits it into two $180^\\circ$ segments (both $\\text{bulge} = 1.0$), or commits a native `cadcraft-doc::Circle`.\n" +
        "• Straight Line Deadband: Hand jitter can emit $\\text{bulge} = 0.0000002$, causing micro-curvature artifacts.\n" +
        "  - Solution: Enforce deadband threshold: if $|\\text{bulge}| < 10^{-5}$, clamp $\\text{bulge} = 0.0$."
      ];
    }

  static sidebar_dpi_scaling_hazard() {
      return [
        "Hazard 4: Retina & High-DPI Snap Aperture Scaling:\n" +
        "• The Trap:\n" +
        "  - macOS Retina and 4K displays have device pixel ratios of 2.0x or 3.0x.\n" +
        "  - A fixed 10-pixel snap aperture becomes an ultra-tiny 5-pixel target on Retina screens.\n" +
        "• The compassdraw-core Solution:\n" +
        "  - Screen-space picking threshold in `winit` is multiplied by `window.scale_factor()`.\n" +
        "  - Guarantees uniform physical finger and mouse picking tolerances across 1080p, 4K, and Retina displays."
      ];
    }

  static p_bridge_paradigm_1() {
      return [
        "To make AccuDraw feel completely native inside an AutoCAD runtime like CADCraft, we must solve a profound interaction conflict. Historically, AutoCAD is a **prompt-driven** engine: tools like `LINE` and `PLINE` sit in a passive waiting loop, printing prompts like `'Specify next point or [Arc/Close/Undo]:'` and expecting typed coordinates or keywords followed by Enter.",
        "AccuDraw is a **kinetic, event-driven HUD**: it floats an origin at the cursor, locks axes on the fly, and computes relative vector displacements in real time. If we treated AutoCAD as a black box and simply simulated keystrokes, the interface would feel clunky. The breakthrough in our architecture is making **CADCraft's command prompt a reactive event listener for AccuDraw**."
      ];
    }

  static sidebar_two_way_contract() {
      return [
        "The Bi-Directional Dialogue (CADCraft ↔ CompassDraw):\n" +
        "1. AutoCAD to CompassDraw (Reverse Context Dialogue):\n" +
        "   • When a command steps and returns `Step::Next(Prompt)`:\n" +
        "     - If `prompt.accepts.contains(Accept::POINT)`: CompassDraw wakes up, places the squircle compass, and tracks cursor deltas.\n" +
        "     - If `prompt.keywords` contains `[\"Arc\", \"Close\", \"Undo\"]`: CompassDraw maps single-stroke shortcuts (`A`, `C`, `U`) directly to those keywords without requiring Enter!\n" +
        "     - When AutoCAD commits a point: `on_point_committed(pt)` automatically shifts the floating origin to `pt`, resets local deltas to 0.0000, and pushes the coordinate to the undo stack.\n" +
        "2. CompassDraw to AutoCAD (Forward Coordinate Synthesis):\n" +
        "   • Resolves constraints in 3D world space (WCS), projects to active construction plane, and dispatches `Input::Point(Vec2)`.\n" +
        "   • If user types a pure scalar distance (e.g. `12.5`): Evaluates directional sign inference and passes `Input::Point` along the locked axis without opening a text prompt.\n" +
        "3. Undo Synchronization:\n" +
        "   • When AutoCAD executes `s.doc_mut()?.undo()`: CompassDraw pops its `SavedState` stack in lockstep, returning the compass origin to the prior vertex."
      ];
    }

  static p_bridge_paradigm_2() {
      return [
        "On the data side, we keep the coordinate system clean and high-level. Tools, scripts, and AI coding agents should never have to manually write out matrix equations to place a line or arc. In `compassdraw-core`, we define a universal **`CoordinateBridge`**.",
        "The `CoordinateBridge` operates on pure, unadorned `[f64; 3]` arrays. It provides instantaneous bidirectional translations between **World Coordinates (WCS)**, **Local Compass Deltas $(dx, dy, dz)$**, **AutoCAD Planar Object Coordinates (OCS)**, and **Screen Pixels (DCS)**. Whether a developer is working with raw numbers in Rust, Three.js vectors in a browser, or DXF bulge factors, the coordinate engine handles all projection math under the hood."
      ];
    }

  static sidebar_coordinate_translation_math() {
      return [
        "Universal CoordinateBridge Architecture (crates/compassdraw-core):\n" +
        "```rust\n" +
        "pub struct CoordinateBridge;\n\n" +
        "impl CoordinateBridge {\n" +
        "    /// World Coordinate (WCS) -> Local Compass Delta (dx, dy, dz)\n" +
        "    #[inline]\n" +
        "    pub fn wcs_to_compass(p_wcs: [f64; 3], origin: [f64; 3], axes: &ThreeAxes) -> [f64; 3] {\n" +
        "        let d = [p_wcs[0] - origin[0], p_wcs[1] - origin[1], p_wcs[2] - origin[2]];\n" +
        "        [\n" +
        "            d[0]*axes.x[0] + d[1]*axes.x[1] + d[2]*axes.x[2],\n" +
        "            d[0]*axes.y[0] + d[1]*axes.y[1] + d[2]*axes.y[2],\n" +
        "            d[0]*axes.z[0] + d[1]*axes.z[1] + d[2]*axes.z[2],\n" +
        "        ]\n" +
        "    }\n\n" +
        "    /// Local Compass Delta (dx, dy, dz) -> World Coordinate (WCS)\n" +
        "    #[inline]\n" +
        "    pub fn compass_to_wcs(delta: [f64; 3], origin: [f64; 3], axes: &ThreeAxes) -> [f64; 3] {\n" +
        "        [\n" +
        "            origin[0] + delta[0]*axes.x[0] + delta[1]*axes.y[0] + delta[2]*axes.z[0],\n" +
        "            origin[1] + delta[0]*axes.x[1] + delta[1]*axes.y[1] + delta[2]*axes.z[1],\n" +
        "            origin[2] + delta[0]*axes.x[2] + delta[1]*axes.y[2] + delta[2]*axes.z[2],\n" +
        "        ]\n" +
        "    }\n\n" +
        "    /// World Coordinate (WCS) -> AutoCAD OCS Planar Vertex (u, v) + Elevation\n" +
        "    #[inline]\n" +
        "    pub fn wcs_to_ocs(p_wcs: [f64; 3], normal: [f64; 3]) -> ([f64; 2], f64) {\n" +
        "        let ocs_axes = ThreeAxes::from_normal(normal);\n" +
        "        let u = p_wcs[0]*ocs_axes.x[0] + p_wcs[1]*ocs_axes.x[1] + p_wcs[2]*ocs_axes.x[2];\n" +
        "        let v = p_wcs[0]*ocs_axes.y[0] + p_wcs[1]*ocs_axes.y[1] + p_wcs[2]*ocs_axes.y[2];\n" +
        "        let elev = p_wcs[0]*normal[0] + p_wcs[1]*normal[1] + p_wcs[2]*normal[2];\n" +
        "        ([u, v], elev)\n" +
        "    }\n" +
        "}\n" +
        "```\n" +
        "• Operates on raw arrays: Zero allocation, inline SIMD vectorization.\n" +
        "• Bidirectional: Reconstructs exact 3D models from 2.5D AutoCAD polylines."
      ];
    }
}

globalThis.CadCraftIntegrationContent = CadCraftIntegrationContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadCraftIntegrationContent;