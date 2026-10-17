class CadITwinParityContent {
  static getMeta() {
    return {
      kicker: 'Lineage Parity & SmartLine Specification',
      title: '10. iTwin Parity Audit & SmartLine Spec',
      subtitle: 'Auditing Bentley’s 3,862-line TypeScript AccuDraw engine, formalizing the SmartLine state machine, and blueprinting compassdraw-core in Rust.'
    };
  }

  static manifest() {
      return [
        {
          section: 'itwin_audit',
          partLabel: 'Chapter 10 • Lineage',
          title: 'Inside Bentley iTwin AccuDraw.ts (3,862 Lines)',
          blocks: [
            { id: 'p_itwin_1', type: 'p' },
            { id: 'p_itwin_2', type: 'p' },
            { id: 'sidebar_itwin_architecture', type: 'sidebar', kicker: 'iTwin Symbols', title: 'AccuDraw.ts & AccuSnap.ts Core Topology' }
          ]
        },
        {
          section: 'accusnap_pipeline',
          partLabel: 'Chapter 10 • Spatial Snapping',
          title: 'AccuSnap Proximity Raycasting vs. Tentative Latching',
          blocks: [
            { id: 'p_snap_pipeline_1', type: 'p' },
            { id: 'p_snap_pipeline_2', type: 'p' },
            { id: 'sidebar_accusnap_pipeline', type: 'sidebar', kicker: 'Snapping Core', title: 'AccuSnap.ts testHit & Tentative Latch' }
          ]
        },
        {
          section: 'accudraw_tool',
          partLabel: 'Chapter 10 • Tool Actions',
          title: 'AccuDrawTool.ts: The Complete Interactive Action Suite',
          blocks: [
            { id: 'p_tool_actions_1', type: 'p' },
            { id: 'p_tool_actions_2', type: 'p' },
            { id: 'sidebar_tool_actions', type: 'sidebar', kicker: 'Tool Hierarchy', title: 'Bentley AccuDrawTool Classes & Shortcuts' }
          ]
        },
        {
          section: 'construction_planes',
          partLabel: 'Chapter 10 • 3D Spatial Math',
          title: 'Hard vs. Soft Construction Planes & Axis Flashing',
          blocks: [
            { id: 'p_plane_math_1', type: 'p' },
            { id: 'p_plane_math_2', type: 'p' },
            { id: 'sidebar_plane_math_code', type: 'sidebar', kicker: 'Spatial Algorithms', title: 'rotateAxesByPoint & LockedStates.X_BM Flash' }
          ]
        },
        {
          section: 'value_history',
          partLabel: 'Chapter 10 • Memory Stack',
          title: 'Value History Cycling & Viewport Decoration',
          blocks: [
            { id: 'p_val_history_1', type: 'p' },
            { id: 'p_val_history_2', type: 'p' },
            { id: 'sidebar_val_history_code', type: 'sidebar', kicker: 'Memory & Decoration', title: 'choosePreviousValue & decorate() Context Pipeline' }
          ]
        },
        {
          section: 'adaptive_contrast',
          partLabel: 'Chapter 10 • Visual Engine',
          title: 'Adaptive Luminance Contrast (adjustedForContrast)',
          blocks: [
            { id: 'p_contrast_1', type: 'p' },
            { id: 'p_contrast_2', type: 'p' },
            { id: 'sidebar_contrast_math', type: 'sidebar', kicker: 'Visual Legibility', title: 'Luminance Delta Ratios & Viewport Legibility' }
          ]
        },
        {
          section: 'smart_keyin',
          partLabel: 'Chapter 10 • Ergonomics',
          title: 'SmartKeyin: Directional Sign Inference & SavedState',
          blocks: [
            { id: 'p_smart_keyin_1', type: 'p' },
            { id: 'p_smart_keyin_2', type: 'p' },
            { id: 'sidebar_smart_keyin_math', type: 'sidebar', kicker: 'Math & State Stack', title: 'SmartKeyin Quadrant Inference & SavedState' }
          ]
        },
        {
          section: 'hint_builder',
          partLabel: 'Chapter 10 • Protocol',
          title: 'The AccuDrawHintBuilder Context Protocol',
          blocks: [
            { id: 'p_hint_protocol_1', type: 'p' },
            { id: 'p_hint_protocol_2', type: 'p' },
            { id: 'sidebar_hint_protocol', type: 'sidebar', kicker: 'Context API', title: 'The AccuDrawHintBuilder Contract' }
          ]
        },
        {
          section: 'fillet_comparison',
          partLabel: 'Chapter 10 • Mathematics',
          title: 'Fillet Geometry: CADCraft Newton-Raphson vs. Analytic Bisector',
          blocks: [
            { id: 'p_fillet_comp_1', type: 'p' },
            { id: 'p_fillet_comp_2', type: 'p' },
            { id: 'sidebar_fillet_comparison', type: 'sidebar', kicker: 'Algorithm Audit', title: 'CornerFit (Rust) vs. RoundingUtils3D (JS)' }
          ]
        },
        {
          section: 'smartline_spec',
          partLabel: 'Chapter 10 • SmartLine',
          title: 'The SmartLine Continuous Chaining State Machine',
          blocks: [
            { id: 'p_smartline_1', type: 'p' },
            { id: 'p_smartline_2', type: 'p' },
            { id: 'sidebar_smartline_transitions', type: 'sidebar', kicker: 'State Machine', title: 'SmartLine Continuous Geometry Transitions' },
            { id: 'p_smartline_3', type: 'p' }
          ]
        },
        {
          section: 'mcp_agents',
          partLabel: 'Chapter 10 • AI Agents',
          title: 'MCP Autonomous Drafting & Compass Constraints',
          blocks: [
            { id: 'p_mcp_agent_spec_1', type: 'p' },
            { id: 'p_mcp_agent_spec_2', type: 'p' },
            { id: 'sidebar_mcp_compass_tools', type: 'sidebar', kicker: 'Agent API', title: 'Model Context Protocol Compass Endpoints' }
          ]
        },
        {
          section: 'rust_core',
          partLabel: 'Chapter 10 • Rust Blueprint',
          title: 'compassdraw-core: The Headless Rust Crate',
          blocks: [
            { id: 'p_rust_crate_1', type: 'p' },
            { id: 'p_rust_crate_2', type: 'p' },
            { id: 'sidebar_rust_crate_api', type: 'sidebar', kicker: 'Rust Architecture', title: 'compassdraw-core Crate Specification' }
          ]
        }
      ];
    }
  static p_itwin_1() {
    return [
      "With the direct download of Bentley's `@itwin/core-frontend` production source into our workspace (`itwin_reference/AccuDraw.ts` and `AccuSnap.ts`), we can compare my original 1990s C implementation, our modern WebGL `accuCad` prototype, and Bentley's active 3,862-line TypeScript engine side-by-side."
    ];
  }

  static p_itwin_2() {
      return [
        "Our direct code inspection of Bentley's `AccuDraw.ts` confirms the five foundational pillars of the engine:",
        "1. **`ThreeAxes` (3D Direction Cosines):** Maintains three orthonormal unit vectors (`x`, `y`, `z`) derived from `Matrix3d`. It provides `fromMatrix3d`, `toMatrix3d`, and `equals`, allowing the compass plane to rotate into Top, Front, Side, View, or arbitrary surface normals without gimbal lock.",
        "2. **`RoundOff` (Precision Inset & Snapping):** Computes distance and angle round-offs, applying hysteresis thresholds so the cursor cleanly indexes to recurring dimensional intervals without jitter.",
        "3. **`ItemField` & `KeyinStatus`:** Tracks the active input focus across X, Y, Distance, Angle, and Z. Distinguishes between dynamic coordinate tracking (`KeyinStatus.Dynamic`) and hard numerical locks (`KeyinStatus.Locked`).",
        "4. **`AccuDrawHintBuilder`:** The standardized protocol whereby interactive CAD drawing tools communicate contextual intent to the compass—such as anchoring origin to the prior vertex, aligning orientation to the current stroke segment, or locking polar angles.",
        "5. **`SavedState`:** A transactional state stack that allows AccuDraw to push and pop coordinate frames across view manipulation and nested sub-commands."
      ];
    }

  static sidebar_itwin_architecture() {
      return [
        "Verified Bentley iTwin Production Architecture (itwinjs-core):\n" +
        "• `ThreeAxes`: True 3×3 direction-cosine basis managing spatial orientation vectors.\n" +
        "• `RoundOff`: Distance & angle roundoff engine with dynamic hysteresis tolerance.\n" +
        "• `AccuDrawFlags`: Packed state flags for auto-orientation, floating vs. fixed origin, and polar mode.\n" +
        "• `AccuDrawHintBuilder`: Methods including `setOrigin`, `setRotation`, `setLockAngle`, `setMode`, and `sendHints`.\n" +
        "• `AccuSnap.ts`: Proximity-based candidate element harvesting and tentative point latching."
      ];
    }
  static p_smartline_1() {
    return [
      "In 1994, alongside AccuDraw, I invented SmartLine. Prior to SmartLine, CAD users had to draw lines, circles, and arcs with separate disconnected tools, manually trimming intersections and using fillet commands to round corners afterwards. SmartLine combined all linear geometry into a single continuous gesture."
    ];
  }

  static p_smartline_2() {
    return [
      "In SmartLine, while laying down continuous segments, the user can toggle between sharp polylines, circular tangent arcs, 3-point arcs, and chamfers without interrupting the placement lifecycle. Each placed vertex stores a discrete radius property (`v.radius`), letting sharp corners transition into dynamic arcs that preserve $G^1$ tangency in real time."
    ];
  }

  static sidebar_smartline_transitions() {
    return [
      "SmartLine State Machine Lifecycle:\n" +
      "1. Segment Mode: `Line` (sharp orthogonal or angled segment) or `Arc` (tangent to prior segment vector or 3-point defined).\n" +
      "2. Corner Vertex Treatment:\n" +
      "   • `Sharp`: Standard polygonal miter joint.\n" +
      "   • `Fillet (Radius)`: Dynamic circular arc connecting segment bisectors via `RoundingUtils3D`.\n" +
      "   • `Chamfer`: Symmetrical bevel cutting across incoming and outgoing segment vectors.\n" +
      "3. Auto-Close Snap: When the cursor approaches within snap tolerance of Vertex 0, SmartLine previews a closed planar profile or 3D face, committing an enclosed boundary on click."
    ];
  }

  static p_smartline_3() {
      return [
        "In CADCraft's codebase, our server scan discovered that `crates/geom/src/fillet.rs` already contains clean pure-Rust 2D arc filleting algorithms! Furthermore, `crates/geom/src/spline_fit.rs` provides cubic spline interpolation.",
        "What CADCraft is currently missing is the interactive glue: the **SmartLine continuous chaining state machine** and the **kinetic 3D direction-cosine basis**. Right now, CADCraft's commands (`draw.rs`, `pline_opts.rs`) prompt modally via the command line. By wrapping `cadcraft-geom`'s existing fillet math in our AccuDraw kinetic frame, we can deliver seamless SmartLine drafting without reinventing low-level circle-tangent mathematics."
      ];
    }
  static p_rust_crate_1() {
    return [
      "To bridge our interaction design into CADCraft and the broader Rust CAD ecosystem, we are blueprinting `compassdraw-core`—a standalone, pure-Rust crate with `no_std` compatibility that compiles to native desktop binaries as well as WebAssembly."
    ];
  }

  static p_rust_crate_2() {
      return [
        "Because `compassdraw-core` will be a decoupled, pure-Rust crate with `no_std` support, it establishes a bidirectional bridge:",
        "1. **Input Interceptor:** Sits in `cadcraft-engine` above `pointmod.rs`, transforming mouse and keyboard events into resolved 3D points without modal prompts.",
        "2. **SmartLine Bulge Pipeline:** Converts continuous on-curve tangent arcs directly into CADCraft's `arc_to_bulge` tuples, committing clean `LwPolyline` entities into `cadcraft-doc`.",
        "3. **Persistent Constraint Bridge:** Emits geometric relationships directly into `cadcraft-constraints::lm` for parametric re-solving.",
        "4. **AI Agent Channel:** Exposes relative vector navigation to `cadcraft-mcp`, allowing coding agents to draft with zero spatial hallucinations."
      ];
    }
  static sidebar_rust_crate_api() {
      return [
        "compassdraw-core Rust Crate Architecture (crates/compassdraw-core):\n" +
        "```rust\n" +
        "pub struct ThreeAxes {\n" +
        "    pub x: [f64; 3],\n" +
        "    pub y: [f64; 3],\n" +
        "    pub z: [f64; 3],\n" +
        "}\n\n" +
        "pub struct CompassDraw {\n" +
        "    pub origin: [f64; 3],\n" +
        "    pub axes: ThreeAxes,\n" +
        "    pub mode: CompassMode, // Rectangular | Polar | Mixed\n" +
        "    pub active_field: ItemField, // X | Y | Dist | Angle | Z\n" +
        "    pub locks: CoordinateLocks,\n" +
        "    pub roundoff: RoundOffEngine,\n" +
        "    pub smartline: SmartLineStateMachine,\n" +
        "}\n\n" +
        "impl CompassDraw {\n" +
        "    pub fn on_pointer_motion(&mut self, ray_origin: [f64; 3], ray_dir: [f64; 3]) -> ResolvedPoint;\n" +
        "    pub fn handle_key_stroke(&mut self, key: KeyCode) -> KeyResult;\n" +
        "    pub fn handle_smart_lock(&mut self);\n" +
        "    pub fn apply_hint(&mut self, hint: AccuDrawHint);\n" +
        "    pub fn compute_squircle(&self, t: f64) -> Vec<Segment2D>;\n" +
        "}\n" +
        "```\n" +
        "• Intercepts `cadcraft-engine::pointmod::Frame` directly.\n" +
        "• Connects to CADCraft's `crates/geom/src/fillet.rs` for dynamic SmartLine filleting."
      ];
    }

  static p_hint_protocol_1() {
      return [
        "A critical discovery in Bentley's `AccuDraw.ts` is `AccuDrawHintBuilder`. In inferior CAD systems, drafting tools and coordinate inputs are tightly coupled: a line tool has to know how to draw a rubber-band, how to calculate orthogonal axes, and how to snap. In AccuDraw, tools communicate with the compass via an inverted dependency called Hints."
      ];
    }

  static p_hint_protocol_2() {
      return [
        "Inside `AccuDraw.ts`, the `doProcessHints()` method reveals the exact execution sequence when hints are received:",
        "1. `flags.autoOrient`: If the hint requests auto-orientation, it evaluates the active tool's geometry to determine whether the compass should align with the current line segment vector (`setXAxis`) or surface normal (`setRotation`).",
        "2. `flags.setOrigin`: If the tool specifies a new origin (or user placement occurs), it updates `this.origin` and resets distance/delta buffers.",
        "3. `flags.lockDistance` / `flags.lockAngle`: Immediately locks polar coordinates to the tool's prescribed increments.",
        "4. `flags.smartRotation`: Preserves context rotation across viewports so moving between isometric and top views smoothly reorients the drawing plane without jarring coordinate jumps."
      ];
    }
  static sidebar_hint_protocol() {
      return [
        "The AccuDrawHintBuilder Context Protocol:\n" +
        "```typescript\n" +
        "export class AccuDrawHintBuilder {\n" +
        "  public setOrigin(origin: Point3d): void;\n" +
        "  public setRotation(rowMatrix: Matrix3d): void;\n" +
        "  public setXAxis(xAxis: Vector3d): void;\n" +
        "  public setLockDistance: boolean;\n" +
        "  public setLockAngle: boolean;\n" +
        "  public enableSmartRotation: boolean;\n" +
        "  public sendHints(activate = true): boolean;\n" +
        "}\n" +
        "```\n" +
        "• Decoupled Inversion of Control: Tools never calculate compass orientations directly; they send geometric hints.\n" +
        "• Hysteresis Zoom Round-Off (`RoundOff`): Uses dynamic `units: Set<number>` to snap to the smallest discernible unit at the current viewport zoom level."
      ];
    }

  static p_fillet_comp_1() {
      return [
        "Our inspection of CADCraft's `crates/geom/src/fillet.rs` reveals a sophisticated numerical solver. Rather than just supporting simple circular arc fillets between straight line segments, CADCraft's `CornerFit` computes circles tangent across any combination of Lines, Circles, Ellipses, and Splines (`TanCurve`) using a 40-step damped Newton-Raphson method on exact offset curves."
      ];
    }

  static p_fillet_comp_2() {
      return [
        "By contrast, in `accuCad/js/RoundingUtils3D.js`, our 3D path filleting algorithm is closed-form and analytic: it calculates the 3D angle bisector between incoming and outgoing unit vectors (`uv1` and `uv2`), directly projecting tangent touch points `p1` and `p2`. This is ultra-fast ($O(1)$) and works across arbitrary 3D planes. By combining both approaches, `compassdraw-core` can use analytic 3D bisectors for real-time mouse hover previews, and CADCraft's Newton solver for complex spline/ellipse boundary fillets."
      ];
    }

  static sidebar_fillet_comparison() {
      return [
        "Fillet Mathematics Comparison:\n" +
        "• CADCraft (`crates/geom/src/fillet.rs`):\n" +
        "  - Multi-curve support: Lines, Circles, Ellipses, NURBS Splines.\n" +
        "  - Damped Newton-Raphson iteration (40 steps max) on offset curves.\n" +
        "  - Evaluates finite-difference Jacobian for non-linear curvatures.\n" +
        "• accuCad (`RoundingUtils3D.js`):\n" +
        "  - True 3D spatial vector bisector calculation.\n" +
        "  - Closed-form analytic solution ($O(1)$ speed, zero iterations).\n" +
        "  - Ideal for real-time 60 FPS interactive mouse cursor previewing."
      ];
    }

  static p_mcp_agent_spec_1() {
      return [
        "CADCraft includes `cadcraft-mcp`—a native Model Context Protocol server. Currently, AI agents interact with CADCraft using raw absolute coordinates (e.g. `create_line(x1, y1, x2, y2)`). Anyone who has watched an LLM draft knows the problem: models struggle with exact spatial trigonometry, producing misaligned corners, small gaps, and overlapping lines."
      ];
    }

  static p_mcp_agent_spec_2() {
      return [
        "By exposing CompassDraw endpoints to the MCP server (`compass_origin`, `compass_align`, `compass_lock_axis`, `smartline_segment`), the AI agent drafts using relative vectors: 'Move origin to vertex A, lock X-axis, offset 42.5 units, tangent arc of radius 10 to vertex B.' This allows the AI agent to produce geometrically perfect, manifold drawings on the first pass without spatial hallucinations."
      ];
    }

  static sidebar_mcp_compass_tools() {
      return [
        "MCP CompassDraw Tool Extensions (crates/mcp/src/tools.rs):\n" +
        "• `compass_set_origin(handle, vertex_index)`: Anchors compass to an element vertex.\n" +
        "• `compass_orient_plane(plane)`: Sets Front, Top, Side, or element normal.\n" +
        "• `compass_vector_input(distance, angle | dx, dy)`: Commits constrained displacement.\n" +
        "• `smartline_chain(points, radii, auto_close)`: Commits multi-segment tangent path.\n" +
        "• Result: Autonomous AI coding agents achieve CAD precision without coordinate math errors."
      ];
    }

  static p_smart_keyin_1() {
      return [
        "One of the most elegant interaction design details in AccuDraw—preserved in Bentley's `AccuDraw.ts` under `public smartKeyin = true`—is automatic directional sign inference. When drafting precisely, forcing a user to type `-12.5` versus `12.5` based on Cartesian signs breaks drafting rhythm. Your eyes are on the geometry, not on coordinate signs."
      ];
    }

  static p_smart_keyin_2() {
      return [
        "In `AccuDraw.ts`, when `smartKeyin` is active, the engine checks whether the current cursor delta vector points along the negative axis: `this._xIsNegative === (this.delta.x >= 0.0)`. If the user moves the mouse to the left and types `5`, AccuDraw automatically multiplies the value by `-1`. The sign is inferred entirely from physical human motion.",
        "Furthermore, `AccuDraw.ts` maintains `savedStateViewTool` and `savedStateInputCollector`. When the user pans, zooms, rotates the view, or runs a nested query command, AccuDraw pushes its coordinate frame to a state stack, restoring origin, locks, and orientation without resetting the active drawing command."
      ];
    }

  static sidebar_smart_keyin_math() {
      return [
        "SmartKeyin & SavedState Mechanics (itwin_reference/AccuDraw.ts):\n" +
        "• Directional Sign Inference:\n" +
        "  - When a user enters a positive scalar without an explicit sign, `AccuDraw` checks the quadrant of the mouse vector relative to the floating origin.\n" +
        "  - `delta.x < 0.0 ? -abs(val) : abs(val)`: Eliminates 100% of negative key-ins during drafting.\n" +
        "• Context Preservation (`SavedState`):\n" +
        "  - `savedStateViewTool`: Restores active compass frame after view manipulation (Pan, Zoom, Orbit).\n" +
        "  - `savedStateInputCollector`: Preserves origin and locks across nested measurement tools without resetting drawing progress."
      ];
    }

  static p_tool_actions_1() {
      return [
        "In `itwin_reference/AccuDrawTool.ts`, Bentley Systems encapsulates the interactive tool suite that drives AccuDraw during active drafting sessions. Instead of embedding shortcut logic directly into viewport event handlers, each AccuDraw operation is an independent, transaction-safe `InputCollector` or `PrimitiveTool` subclass."
      ];
    }

  static p_tool_actions_2() {
      return [
        "This architecture confirms why AccuDraw remains so resilient: when a user triggers Rotate Element (`R, E`) or Align to Surface (`R, Q`), a transient tool instance runs, snaps to the target element's normal vector, updates `ThreeAxes`, and immediately pops back to the primary drawing command via `SavedState`. The active line, polyline, or polygon placement is never broken."
      ];
    }

  static sidebar_tool_actions() {
      return [
        "Bentley AccuDrawTool Subsystem (itwin_reference/AccuDrawTool.ts):\n" +
        "• Coordinate Locks: `AccuDrawSetLockXTool` (X), `AccuDrawSetLockYTool` (Y), `AccuDrawSetLockZTool` (Z), `AccuDrawSetLockDistanceTool` (D), `AccuDrawSetLockAngleTool` (A), `AccuDrawSetLockSmartTool` (Enter/L).\n" +
        "• Spatial Plane Rotations: `AccuDrawRotateTopTool` (T), `AccuDrawRotateFrontTool` (F), `AccuDrawRotateSideTool` (S), `AccuDrawRotateViewTool` (V), `AccuDrawRotateCycleTool` (C).\n" +
        "• 90° Plane Stepping: `AccuDrawRotate90AboutXTool` (RX), `AccuDrawRotate90AboutYTool` (RY), `AccuDrawRotate90AboutZTool` (RZ).\n" +
        "• Interactive Collectors: `AccuDrawRotateAxesTool` (RA), `AccuDrawRotateElementTool` (RE), `AccuDrawRotatePointsTool` (RP), `AccuDrawSetOriginTool` (O).\n" +
        "• Modes & State: `AccuDrawChangeModeTool` (Space/P), `AccuDrawSuspendToggleTool` (WA)."
      ];
    }

  static p_plane_math_1() {
      return [
        "Our inspection of `AccuDrawShortcuts.rotateAxesByPoint` in `itwin_reference/AccuDrawTool.ts` reveals a subtle mathematical distinction that made original AccuDraw feel so natural in 3D: the difference between **Hard** and **Soft** construction planes.",
        "When a user rotates the compass by snapping to a reference point or element, AccuDraw checks `aboutCurrentZ`: if true, it applies a *soft construction plane*—keeping the current drawing plane's normal intact while spinning the X/Y axes. If false, it applies a *hard construction plane*—reorienting the entire 3D plane into alignment with the snapped entity's surface normal."
      ];
    }

  static p_plane_math_2() {
      return [
        "Another crucial UX feedback mechanism in `AccuDrawTool.ts` is the automatic **Index Line Flash**: `accudraw.indexed |= LockedStates.X_BM`. When a rotation shortcut executes, changing the rotation matrix would normally clear all dynamic line decorations. AccuDraw explicitly sets the X-axis indexed bitmask so the white index indicator line immediately flashes along the new X-axis, giving the user instant visual confirmation before they even move the mouse."
      ];
    }

  static sidebar_plane_math_code() {
      return [
        "Verbatim Plane Rotation Mechanics (itwin_reference/AccuDrawTool.ts):\n" +
        "```typescript\n" +
        "if (aboutCurrentZ)\n" +
        "  accudraw.hardConstructionPlane(point, point, accudraw.planePt, accudraw.axes.z, vp, isSnapped);\n" +
        "else\n" +
        "  accudraw.softConstructionPlane(point, point, accudraw.planePt, accudraw.axes.z, vp, isSnapped);\n\n" +
        "accudraw.axes.x.setFrom(xVec);\n" +
        "accudraw.setRotationMode(RotationMode.Context);\n" +
        "accudraw.flags.contextRotMode = ContextMode.XAxis;\n" +
        "accudraw.updateRotation();\n" +
        "// Immediate visual feedback flash\n" +
        "accudraw.indexed |= LockedStates.X_BM;\n" +
        "```\n" +
        "• Soft Plane: Spins X/Y axes while locking the active Z working depth.\n" +
        "• Hard Plane: Reorients the 3D plane normal to the snapped entity.\n" +
        "• Index Flash: Triggers instant visual pulse along the new primary axis."
      ];
    }

  static p_val_history_1() {
      return [
        "A standout usability feature in `AccuDrawTool.ts` is the **Value Memory Stack**: `choosePreviousValue(index: ItemField)` and `chooseNextValue(index: ItemField)`. In high-production civil and architectural drafting, drafters repeatedly place geometry with recurring dimensions (e.g. wall thicknesses of 6\", door clearances of 36\", or column bays of 24')."
      ];
    }

  static p_val_history_2() {
      return [
        "Instead of forcing the user to retype numbers, AccuDraw caches a ring buffer of historical inputs per field. Tapping the Up or Down arrow keys instantly cycles through previously accepted distances or angles on that specific axis.",
        "Furthermore, `AccuDraw.ts` implements the `decorate(context: DecorateContext)` lifecycle method: it builds graphic overlays for the dynamic compass circle/square, primary axis cylinders, and index guidelines, drawing them as viewport decorators with independent z-buffer rendering so they remain crisp and visible above dense model geometry."
      ];
    }

  static sidebar_val_history_code() {
      return [
        "Value History & Decorator Pipeline:\n" +
        "• `choosePreviousValue(index)` / `chooseNextValue(index)`:\n" +
        "  - Caches a ring buffer of previously committed scalar inputs per `ItemField`.\n" +
        "  - Arrow keys cycle historical values into the input buffer on the fly.\n" +
        "• `decorate(context: DecorateContext)`:\n" +
        "  - Viewport-independent overlay pass (`GraphicType.Overlay`).\n" +
        "  - Renders compass frame, pulsing tick cylinders, and white index line with custom depth priorities."
      ];
    }

  static p_contrast_1() {
      return [
        "In `AccuDraw.ts`, Bentley’s `decorate(context: DecorateContext)` implements automatic luminance adaptation via `adjustedForContrast(bgColor, delta)`. When drafting on computers, backgrounds vary wildly: engineers frequently switch between pure black (`#000000`), drafting gray (`#222222`), architectural white (`#ffffff`), or blueprint navy."
      ];
    }

  static p_contrast_2() {
      return [
        "Instead of forcing users to customize compass colors or squint at washed-out lines, AccuDraw calculates the luminance of the viewport background and dynamically computes contrast offsets: delta `155` for high-contrast compass borders and primary X/Y axis lines, and delta `75` for the translucent compass body fill.",
        "The result is perfect visual contrast on any background color with zero configuration. In `compassdraw-core`, we preserve this exact luminance equation for both our Three.js WebGL overlay and CADCraft's `wgpu` shaders."
      ];
    }

  static sidebar_contrast_math() {
      return [
        "Luminance Adaptation Algorithm (AccuDraw.ts):\n" +
        "```typescript\n" +
        "const frameColor = (hasFocus ? this._frameColor : this._frameColorNoFocus).adjustedForContrast(bgColor, 155);\n" +
        "const fillColor = (hasFocus ? this._fillColor : this._fillColorNoFocus).adjustedForContrast(bgColor, 75);\n" +
        "const xColor = (hasFocus ? this._xColor : this._frameColorNoFocus).adjustedForContrast(bgColor, 155);\n" +
        "const yColor = (hasFocus ? this._yColor : this._frameColorNoFocus).adjustedForContrast(bgColor, 155);\n" +
        "```\n" +
        "• Delta 155: Guaranteed high-contrast borders and axis tick marks.\n" +
        "• Delta 75: Subtle translucent interior fill.\n" +
        "• Contrast Independence: Legible on pure black, bright white, or gradient viewports."
      ];
    }

  static p_snap_pipeline_1() {
      return [
        "In `itwin_reference/AccuSnap.ts` (1,352 lines), Bentley separates snapping into two synchronized subsystems: passive proximity pre-highlighting (`AccuSnap`) and active coordinate capture (`TentativePoint`).",
        "When the mouse moves freely, `AccuSnap.testHit` fires screen-space proximity tests against geometric display paths. When a valid vertex or edge falls within the snap aperture, it builds a `SnapDetail` and pre-highlights the element."
      ];
    }

  static p_snap_pipeline_2() {
      return [
        "When the user initiates a tentative point (via chorded click or shortcut), `AccuSnap` promotes the active `SnapDetail` into `IModelApp.tentativePoint`. This immediately calls `AccuDraw.onTentative()`, anchors the compass origin, and renders the 3-axis Mini-Jack cursor.",
        "In `accuCad/js/TentativePointHandler.js`, we implemented the identical dual-phase pipeline: standard 3D raycasting with a 10-pixel screen-space segment fallback (`_findClosestElementByScreenSegments`) for reliable wireframe picking."
      ];
    }

  static sidebar_accusnap_pipeline() {
      return [
        "AccuSnap Snapping Architecture (itwin_reference/AccuSnap.ts):\n" +
        "• Dual-Phase Latching:\n" +
        "  1. Passive Discovery: `AccuSnap.testHit()` scans candidate geometry within screen-space aperture.\n" +
        "  2. Active Tentative: Mouse chord promotes candidate to `IModelApp.tentativePoint`.\n" +
        "• `SnapDetail`: Records snap mode, element handle, world hit point, and normal vector.\n" +
        "• AccuDraw Handshake: `AccuDraw.onTentative()` grabs focus and updates the kinetic origin.\n" +
        "• Reset Cascade: Right-click calls `tentativePoint.clear(true)`, cleanly releasing the anchor."
      ];
    }
}

globalThis.CadITwinParityContent = CadITwinParityContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadITwinParityContent;