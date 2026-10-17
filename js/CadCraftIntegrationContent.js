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
      "CADCraft recreates AutoCAD's workflow: command-line prompt loops (`LINE`, `CIRCLE`, `OFFSET`, `TRIM`), layers, dimensions, and DXF/DWG file handling via acadrust. However, it inherits AutoCAD's historic constraints: drafting is largely confined to 2D planes, lacks kinetic 3D construction plane rotation, has no context-aware floating compass, and requires typing coordinate offsets like `@5<45`. This provides a natural opportunity to introduce our spatial constraint mechanics into that ecosystem."
    ];
  }

  static sidebar_cadcraft_spec() {
    return [
      "CADCraft v0.7.0 Architecture Summary:\n• Core Language: Pure Rust (Edition 2024, Rust 1.90) with Wasm compilation target.\n• File Formats: Native DXF reading/writing, binary DWG round-tripping via `cadcraft-dwg`, and vector PDF plotting.\n• Command Architecture: Classic AutoCAD key-ins with AutoComplete and keyword options (`[Close/Undo]`).\n• Agent Support: First-class Model Context Protocol (`cadcraft-mcp`) endpoints allowing LLMs to drive drafting programmatically.\n• Primary Limitation: No 3D floating constraint compass, no single-stroke plane switching, and reliance on command-line prompts."
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
      "The architectural mandate for our integration is non-invasive modularity: we must never maintain a fragile, monolithic fork of CADCraft that creates upstream merge conflicts. CompassDraw is designed as an independent coordinate interceptor that plugs into CADCraft's event lifecycle via a minimal, well-defined interface contract."
    ];
  }

  static p_spec_2() {
    return [
      "Whenever CADCraft releases an upstream update, our automated agent can re-apply the CompassDraw interception hook across `cadcraft-engine`'s event pump and verify integration tests in seconds. This allows us to benefit from upstream improvements in DWG parsing, PDF plotting, and renderer optimizations while preserving our spatial constraint engine."
    ];
  }

  static sidebar_interception_contract() {
    return [
      "The Live CompassDraw Interception Contract (CompassDrawBridge.js):\n" +
      "1. Bentley Hint Protocol: Tools dispatch contextual constraints via `createHintBuilder()` (`setOrigin`, `setRotation`, `setXAxis`, `setLockDistance`, `setLockAngle`).\n" +
      "2. CADCraft OCS Normal Matrix: Computes arbitrary 3D plane alignment via `computeOcsMatrix(normal)` matching CADCraft `Mat4::ocs`.\n" +
      "3. PolyVertex Arc Bulges: Emits `PolyVertex { point: [x, y], bulge: tan(θ/4) }` for native CADCraft `LwPolyline` serialization.\n" +
      "4. MCP Agent Endpoints: Exposes JSON-RPC endpoints (`compass_set_origin`, `compass_orient_plane`, `compass_lock_axis`, `smartline_segment`) so autonomous coding agents draft with deterministic CAD accuracy without coordinate hallucinations."
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
        "Our inspection of `cadcraft-engine/src/cmd/draw.rs` reveals how native drawing tools execute. In `draw.rs`, commands are state machines implementing the `Interactive` trait. When `LINE` starts (`run_line`), it pushes a `LineM` machine into the session.",
        "The machine issues a `Prompt` asking for a point. The prompt's acceptance criteria are governed by `Accept::POINT | Accept::KEYWORD`. Crucially, CADCraft's event loop in `session.rs` checks `Session::point_mods` before handing coordinates to the command machine."
      ];
    }

  static p_accept_2() {
      return [
        "In standard CADCraft, if no point modifier is active, the mouse raycasts to the 2D working plane and passes raw `Vec2` coordinates into `LineM::step`. When a modifier like `.X` is active, CADCraft halts and prompts `'(need YZ):'`. CompassDraw replaces this modal delay: it resolves all directional constraints and 3D basis projections in real time, satisfying `Accept::POINT` on every click without sub-prompt interruptions."
      ];
    }

  static sidebar_accept_loop() {
      return [
        "CADCraft Command State Machine (crates/engine/src/cmd/draw.rs):\n" +
        "```rust\n" +
        "pub struct LineM {\n" +
        "    st: Option<Vec2>,\n" +
        "    first: Option<Vec2>,\n" +
        "    count: usize,\n" +
        "}\n\n" +
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
        "```\n" +
        "• Non-Invasive Interception: CompassDraw provides coordinates directly to `step(&mut self, s, Input::Point(pt))`.\n" +
        "• Zero Command Drift: Commands like `LineM` remain completely unmodified."
      ];
    }

  static p_plinem_1() {
      return [
        "Inside `cadcraft-engine/src/cmd/draw.rs`, the polyline machine `PlineM` records points and arc bulges into a vector of vertices: `Vec<PolyVertex>`. When the command finishes or closes, it commits an `LwPolyline` directly into `cadcraft-doc` via `s.add_entity(k)`.",
        "Furthermore, in `crates/geom/src/mat.rs`, CADCraft provides `Mat4::ocs(normal: Vec3)`—the AutoCAD Object Coordinate System algorithm, which derives the direction cosines for any arbitrary 3D extrusion vector."
      ];
    }

  static p_plinem_2() {
      return [
        "This establishes our 3D extrusion pipeline: when SmartLine draws a 2D planar profile across an angled face (using CompassDraw's `ThreeAxes`), CADCraft's `Mat4::ocs` maps the planar `PolyVertex` points directly into 3D world space, preserving thickness, elevation, and normal orientations without loss of parametric fidelity."
      ];
    }

  static sidebar_plinem_pipeline() {
      return [
        "PlineM & Mat4::ocs Architecture:\n" +
        "```rust\n" +
        "// In cadcraft-geom/src/mat.rs:\n" +
        "impl Mat4 {\n" +
        "    /// OCS (Object Coordinate System) matrix for an extrusion normal vector.\n" +
        "    pub fn ocs(normal: Vec3) -> Mat4 {\n" +
        "        let n = normal.normalized();\n" +
        "        let ax = if n.x.abs() < 1.0/64.0 && n.y.abs() < 1.0/64.0 {\n" +
        "            Vec3::Y.cross(n)\n" +
        "        } else {\n" +
        "            Vec3::Z.cross(n)\n" +
        "        }.normalized();\n" +
        "        let ay = n.cross(ax).normalized();\n" +
        "        Mat4 { m: [[ax.x, ay.x, n.x, 0.0], [ax.y, ay.y, n.y, 0.0], [ax.z, ay.z, n.z, 0.0], [0.0, 0.0, 0.0, 1.0]] }\n" +
        "    }\n" +
        "}\n" +
        "```\n" +
        "• SmartLine direct emission: Each completed line or arc writes `PolyVertex { point, bulge }`.\n" +
        "• 3D Plane orientation: Handled by `Mat4::ocs(normal)` matching CompassDraw's `ThreeAxes`."
      ];
    }

  static p_render_1() {
      return [
        "Our inspection of `crates/render/src/lib.rs` reveals how CADCraft draws into the viewport. Unlike WebGL engines that use canvas 2D contexts or Three.js lines, CADCraft is built on raw WebGPU (`wgpu`) using custom vertex and fragment shaders."
      ];
    }

  static p_render_2() {
      return [
        "`cadcraft-render` tessellates lines and arcs into triangle strips on the GPU to achieve resolution-independent line thickness and smooth anti-aliased miters. When CompassDraw overlays its animated 3D squircle compass and white index guidelines, it registers as a dedicated render overlay pass directly above the CADCraft vertex buffers."
      ];
    }

  static sidebar_render_wgpu() {
      return [
        "CADCraft wgpu Rendering Pipeline (crates/render):\n" +
        "• Core Engine: Pure `wgpu` with WGSL shaders.\n" +
        "• Line Tessellation: Dynamic vertex expansion into screen-space triangle strips for anti-aliased thick lines.\n" +
        "• Layer Stacking:\n" +
        "  1. Document Geometry: Cached vertex/index buffers for DWG entities.\n" +
        "  2. Dynamic Preview: Fast-path buffer for interactive rubber-banding.\n" +
        "  3. CompassDraw HUD: Topmost overlay pass rendering the squircle compass, pulsing ticks, and Mini-Jack."
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
}

globalThis.CadCraftIntegrationContent = CadCraftIntegrationContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadCraftIntegrationContent;