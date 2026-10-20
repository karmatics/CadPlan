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
          section: 'universal_converter_top',
          partLabel: 'Chapter 10 • Transformation Lab',
          title: 'Universal Arc & Coordinate Transformation Engine',
          blocks: [
            { id: 'comp_coordinate_converter', type: 'component', component: 'CadCoordinateConverterLab' }
          ]
        },
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
          section: 'smartline_spec',
          partLabel: 'Chapter 10 • SmartLine',
          title: 'The SmartLine Continuous Chaining State Machine',
          blocks: [
            { id: 'comp_svg_smartline_lab', type: 'component', component: 'SvgSmartLineLab' },
            { id: 'p_smartline_1', type: 'p' },
            { id: 'p_smartline_2', type: 'p' },
            { id: 'sidebar_smartline_transitions', type: 'sidebar', kicker: 'State Machine', title: 'SmartLine Continuous Geometry Transitions' },
            { id: 'p_smartline_3', type: 'p' }
          ]
        },
        {
          section: 'surface_and_state',
          partLabel: 'Chapter 10 • Surface Kinematics & State',
          title: 'Surface Normal Alignment (Q), Transactional Undo & winit Key Interception',
          blocks: [
            { id: 'p_surface_normal_1', type: 'p' },
            { id: 'sidebar_surface_normal_math', type: 'sidebar', kicker: 'Gram-Schmidt Math', title: '3D Face Normal Derivation & Non-Flipping Axes' },
            { id: 'p_state_stack_1', type: 'p' },
            { id: 'sidebar_smart_backspace_winit', type: 'sidebar', kicker: 'Event Interception', title: 'Single-Stroke Typing & Smart Backspace in winit' }
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
        "2. **`RoundOff` (Screen-Space Inset & Hysteresis):** Computes distance and angle round-offs. As Rob Brown emphasizes, indexing hysteresis is evaluated in screen-space pixels to maintain uniform tactile feel across zoom ratios, preventing magnetic traps through single-keystroke axis isolation.",
        "3. **`ItemField` & `KeyinStatus`:** Tracks the active input focus across X, Y, Distance, Angle, and Z. Distinguishes between dynamic coordinate tracking (`KeyinStatus.Dynamic`) and hard numerical locks (`KeyinStatus.Locked`).",
        "4. **`AccuDrawHintBuilder`:** The standardized protocol whereby interactive CAD drawing tools communicate contextual intent to the compass—such as anchoring origin to the prior vertex, aligning orientation to the current stroke segment, or locking polar angles.",
        "5. **`SavedState`:** A transactional state stack that allows AccuDraw to push and pop coordinate frames across view manipulation and nested sub-commands."
      ];
    }

  static sidebar_itwin_architecture() {
      return [
        "Verified Bentley iTwin Production Architecture (itwinjs-core):\n" +
        "• `ThreeAxes`: True 3×3 direction-cosine basis managing spatial orientation vectors.\n" +
        "• `RoundOff`: Distance & angle roundoff engine with screen-space hysteresis tolerance.\n" +
        "• `AccuDrawFlags`: Packed state flags for auto-orientation, floating vs. fixed origin, and polar mode.\n" +
        "• Axis Lock Isolation: Single-stroke shortcut locks the axis constraint while disengaging distance indexing traps.\n" +
        "• `AccuDrawHintBuilder`: Methods including `setOrigin`, `setRotation`, `setLockAngle`, `setMode`, and `sendHints`.\n" +
        "• `AccuSnap.ts`: Proximity-based candidate element harvesting and tentative point latching."
      ];
    }

  static p_smartline_1() {
      return [
        "In 1994, alongside AccuDraw, I invented SmartLine. Prior to SmartLine, CAD users were forced to draw individual straight lines, circles, and arcs using separate disconnected tools, manually trimming intersections and using fillet commands to round corners afterwards. SmartLine combined all linear geometry into a single continuous gesture.",
        "Within SmartLine, there are two distinct kinds of arcs: **Rounded Corner Fillets** and **Independent Tangent Arc Segments**. If a rounded corner could do it, that's what was done—it was by far the most common architectural transition. But when an independent arc segment was required, SmartLine seamlessly transitioned into it without interrupting the placement command loop.",
        "Crucially, for corner fillets, **if a segment was too short to physically fit the requested rounding radius, SmartLine simply rendered a clean, sharp corner**. It did not distort the drafter's requested radius, push adjacent vertices, or interrupt the user with modal error dialogs. The geometry stayed clean, predictable, and fast."
      ];
    }

  static p_smartline_2() {
      return [
        "Arc segments were remarkably easy to make tangent to the previous segment because AccuDraw automatically oriented itself with the tangent vector of the prior line. Crucially, as soon as you switched into Arc mode, AccuDraw flipped into **Polar mode**, letting the draftsperson immediately type the radius or chord distance directly without looking at a command prompt.",
        "SmartLine arc segments are governed by **Rob Brown's Closest-Point Sweep Principle**: the orientation is solved by finding the candidate tangent arc where the cursor is as close as possible to a point along the circumference. As you pull the mouse away from the start point, the arc naturally opens out from $0^\\circ$ to $+5^\\circ$; if you back up and cross the tangent line, it smoothly flips to $-6^\\circ$. There is zero deadband jitter near zero because the math evaluates continuous proximity to the candidate circle rather than arbitrary boolean sign toggling, while edge-on view angles are handled cleanly as natural projection limits.",
        "Upon clicking the endpoint to commit the arc, the compass **automatically oriented itself to the exit tangent vector**. This meant the draftsperson could continue drawing tangent ($G^1$) or perpendicular (90°) into the next line or arc effortlessly. If they wanted to make a sharp break away from the curve, a single keystroke—**`T`** for Top plane or **`V`** for View plane—immediately reset the compass to global orthogonal axes without breaking the continuous polyline chain.",
        "For closed shapes, Rob Brown solved a notorious CAD edge case through **Trailing Corner Live Adjustment**: when closing a shape back onto the starting point $P_0$, the closing corner defaults to the active fillet radius. However, SmartLine keeps a live modification hook on that final corner: if the drafter adjusts the radius slider or turns a wheel immediately after closing, the trailing corner dynamically recalculates and redraws in real time until a new element is initiated."
      ];
    }

  static sidebar_smartline_transitions() {
      return [
        "SmartLine Geometry & Corner Fillet Rules:\n" +
        "1. Type A: Rounded Corner Fillets:\n" +
        "   • Tangent circular arc connecting incoming and outgoing segment bisectors.\n" +
        "   • Tangent Setback: $T = R \\tan(\\theta / 2)$ where $\\theta$ is the turning angle.\n" +
        "   • Short-Segment Fallback (Rob Brown's Rule): If $T > \\text{segment length} / 2$, the fillet is suppressed and a clean sharp corner is rendered.\n" +
        "2. Trailing Corner Live Adjustment (Post-Closure Hook):\n" +
        "   • Closing a loop applies the active fillet radius to the closing vertex $P_0$.\n" +
        "   • Adjusting the radius immediately after placement dynamically tunes that trailing corner until a new command begins.\n" +
        "3. Type B: Tangent Arc Segments (Closest-Point Heuristic):\n" +
        "   • Minimizes distance between cursor and candidate arc circumference.\n" +
        "   • Smooth transitions across zero: sweeps from 0° to +5° or backs up across the line to -6° with zero deadband jitter.\n" +
        "4. Post-Arc Exit Tangent Orientation:\n" +
        "   • Compass automatically aligns primary axis to the exit tangent vector of the placed arc.\n" +
        "5. Single-Stroke Escapes & Planes:\n" +
        "   • 'T' (Top), 'F' (Front), 'S' (Side), or 'V' (View) snaps compass back to orthogonal planes without breaking the polyline chain."
      ];
    }
  static p_smartline_3() {
      return [
        "To bring this interaction model into the modern open ecosystem, we implement the entire 2D drafting engine in pure SVG. In the live laboratory above, you can lay down lines, press `A` or `~` to swing dynamic tangent arcs, watch the Squircle Compass rotate to align with exit tangents, and press `T` or `V` to break onto standard planes.",
        "Each segment drawn in the SVG canvas maps 1:1 into CADCraft's `LwPolyline` with `PolyVertex { point, bulge: tan(θ/4) }`. When the user is drafting, they can swing arcs intuitively with their cursor, and the underlying mathematical engine preserves exact CAD fidelity for export."
      ];
    }

  static p_rust_crate_1() {
      return [
        "To bridge our interaction design into CADCraft and the broader Rust CAD ecosystem, we are blueprinting `compassdraw-core`—a standalone, pure-Rust crate with `no_std` compatibility that compiles to native desktop binaries (macOS Metal, Windows DX12, Linux Vulkan via `winit`/`wgpu`) as well as WebAssembly.",
        "The crate contains zero UI, windowing, or DOM allocations. It takes ray origins, ray directions, and key codes, and returns constrained coordinates, direction-cosine matrix bases, and arc bulge factors."
      ];
    }

  static p_rust_crate_2() {
      return [
        "Because `compassdraw-core` is decoupled from both the GPU and windowing systems, it satisfies both requirements simultaneously:",
        "1. **2D Drafting Replacement:** In 2D mode, it locks the projection plane to Top ($Z=0$), converting 3D ray intersections into 2D planar coordinates (`[x, y, 0.0]`) that feed directly into CADCraft's standard `Vec2` command machines.",
        "2. **3D Spatial Navigation:** In 3D mode, single-keystroke inputs (`T`, `F`, `S`, `V`, `Q`) reorient `ThreeAxes`, allowing `PlineM` and CADCraft's `Mat4::ocs` to extrude angled faces with exact topological continuity.",
        "3. **Dual Host Support:** The same crate feeds CADCraft's native `wgpu` overlay pass on desktop and drives Three.js / WebGL viewports via our `host.rs` postMessage bridge on the web."
      ];
    }

  static sidebar_rust_crate_api() {
      return [
        "compassdraw-core Rust Crate Blueprint (crates/compassdraw-core):\n" +
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
        "    pub is_3d: bool, // When false, clamps Z=0 for classic 2D AutoCAD mode\n" +
        "    pub locks: CoordinateLocks,\n" +
        "    pub roundoff: RoundOffEngine,\n" +
        "    pub smartline: SmartLineStateMachine,\n" +
        "}\n\n" +
        "impl CompassDraw {\n" +
        "    /// Intercepts mouse raycasts from winit or WebGL canvas\n" +
        "    pub fn on_pointer_motion(\n" +
        "        &mut self,\n" +
        "        ray_origin: [f64; 3],\n" +
        "        ray_dir: [f64; 3],\n" +
        "    ) -> ResolvedCoordinate;\n\n" +
        "    /// Single-stroke key execution (T, F, S, V, Space, L, X, Y, Z, G, N)\n" +
        "    pub fn handle_key_stroke(&mut self, key: &str) -> bool;\n" +
        "    pub fn handle_smart_lock(&mut self);\n" +
        "    pub fn apply_hint(&mut self, hint: AccuDrawHint);\n" +
        "    pub fn arc_to_bulge(&self, start: [f64; 2], end: [f64; 2], center: [f64; 2], cw: bool) -> f64;\n" +
        "}\n" +
        "```\n" +
        "• `no_std` compatible: Pure mathematical core with zero heap/OS bindings.\n" +
        "• Interoperable: Feeds `winit` on desktop and WebAssembly in browser viewports."
      ];
    }

  static p_hint_protocol_1() {
      return [
        "A critical discovery in Bentley's `AccuDraw.ts` is `AccuDrawHintBuilder` and the architectural separation between `floatingOrigin` and `contextSensitivity`. In inferior CAD systems, coordinate origins and axis rotations are mashed together into a monolithic state. In AccuDraw, they are governed by independent boolean flags.",
        "Tools communicate with the compass via an inverted dependency called Hints. When an element is drawn or snapped, the tool dispatches hints (`setOrigin`, `setRotation`). How AccuDraw acts on those hints depends strictly on whether the user has enabled **Context Sensitivity** (reorienting the axes) and **Floating Origin** (advancing the reference coordinate)."
      ];
    }

  static p_hint_protocol_2() {
      return [
        "Inside `AccuDraw.ts`, the `doProcessHints()` method reveals the exact execution sequence when hints are received:",
        "1. `flags.autoOrient`: If context sensitivity is enabled, it rotates the compass axes to align with the current segment vector (`setXAxis`) or surface normal (`setRotation`). When context sensitivity is disabled, orientation hints are ignored, keeping the construction plane locked.",
        "2. `flags.setOrigin`: If floating origin is enabled (or the user presses `O`/`G`), `this.origin` updates to the specified point, while delta buffers reset to $(0, 0, 0)$. As Rob Brown emphasized, moving the origin never forces an axis reorientation.",
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
        "• Floating Origin vs. Context Sensitivity:\n" +
        "  - `flags.floatingOrigin`: Automatic origin tracking to last data point.\n" +
        "  - `flags.contextSensitivity`: Reorients compass to element vectors (independently toggleable).\n" +
        "• Set Origin (O / G): Moving origin to a tentative point preserves existing axis orientation.\n" +
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
        "In AccuDraw, explicit spatial rotation is governed by two distinct, highly optimized commands: **Rotate Quick (`RQ`)** and **Rotate Axes (`RA`)**.",
        "• **Rotate Quick (`RQ`)**: Designed for fast, in-plane reorientation. It takes the active compass origin $\\vec{O}$ and a single data point $\\vec{P}$ to establish the new primary $X$-axis: $\\hat{X} = \\text{normalize}(\\vec{P} - \\vec{O})$. To preserve stability and avoid sudden gimbal flips, it preserves the active construction plane's normal (whether Top, Front, Side, or custom) and computes the perpendicular axis via cross product: $\\hat{Y} = \\text{normalize}(\\vec{Z}_{\\text{current}} \\times \\hat{X})$. It strictly avoids view-dependent calculations unless the compass was explicitly placed in View mode (`V`).",
        "• **Rotate Axes (`RA`)**: An explicit 3D 3-point coordinate system builder that does not require using the current origin. Point 1 defines the new origin $\\vec{O}$; Point 2 defines the primary $X$-axis direction $\\hat{X} = \\text{normalize}(\\vec{P}_2 - \\vec{P}_1)$; and Point 3 establishes the construction plane and positive $Y$ half-space."
      ];
    }

  static p_plane_math_2() {
      return [
        "A vital insight from Rob Brown regarding `RA` is that **Point 3 does not need to be perpendicular to the $X$-axis**. Requiring the user to eyeball or construct an exact 90° third point would be clumsy and defeat the purpose.",
        "As long as Point 3 is not collinear with $\\vec{P}_1 \\to \\vec{P}_2$ (which would produce a degenerate cross product), AccuDraw computes the plane normal deterministically: $\\vec{Z} = \\text{normalize}(\\hat{X} \\times (\\vec{P}_3 - \\vec{P}_1))$, and then derives the true orthogonal $Y$-axis via $\\hat{Y} = \\hat{Z} \\times \\hat{X}$.",
        "Additionally, upon executing any rotation command, AccuDraw triggers an immediate **Index Line Flash** (`accudraw.indexed |= LockedStates.X_BM`), ensuring the primary indicator line pulses along the new $X$-axis so the drafter receives instant visual confirmation before moving the mouse."
      ];
    }

  static sidebar_plane_math_code() {
      return [
        "Explicit Plane Rotation Mechanics: RQ vs. RA:\n" +
        "• 1. Rotate Quick (RQ — In-Plane 1-Point Reorientation):\n" +
        "  - $\\hat{X} = \\text{normalize}(\\vec{P} - \\vec{O})$ using active origin $\\vec{O}$.\n" +
        "  - $\\hat{Y} = \\text{normalize}(\\vec{Z}_{\\text{current}} \\times \\hat{X})$ preserving active plane normal.\n" +
        "  - $\\hat{Z} = \\hat{X} \\times \\hat{Y}$.\n" +
        "  - Avoids view-dependent shifts unless in explicit View mode ('V').\n" +
        "• 2. Rotate Axes (RA — 3-Point 3D Construction System):\n" +
        "  - Point 1: Sets new Origin $\\vec{O} = \\vec{P}_1$.\n" +
        "  - Point 2: Defines X-axis direction $\\hat{X} = \\text{normalize}(\\vec{P}_2 - \\vec{P}_1)$.\n" +
        "  - Point 3: Defines Y half-plane (does NOT need to be perpendicular to X).\n" +
        "  - Vector Normal: $\\hat{Z} = \\text{normalize}(\\hat{X} \\times (\\vec{P}_3 - \\vec{P}_1))$.\n" +
        "  - Derived Y-Axis: $\\hat{Y} = \\hat{Z} \\times \\hat{X}$.\n" +
        "• Index Line Flash: Immediate visual feedback along the new primary axis upon rotation commit."
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

  static p_surface_normal_1() {
      return [
        "A primary capability proven in our `accuCad` prototype is **Instant Surface Normal Alignment (`Q`)**. When drafting in 3D, a user clicks or tentative-snaps onto an angled face of a 3D solid or imported assembly, and taps `Q`. The compass immediately tilts flush against that surface.",
        "The challenge in 3D space is that a face hit provides only a single vector: the surface normal $\\vec{n}$. To construct a stable drafting plane, we must derive two orthogonal tangent vectors ($\\vec{X}_c, \\vec{Y}_c$) without gimbal lock or sudden axis flipping as the camera moves."
      ];
    }

  static sidebar_surface_normal_math() {
      return [
        "Surface Normal Alignment & Non-Flipping Gram-Schmidt Math:\n" +
        "```rust\n" +
        "impl ThreeAxes {\n" +
        "    /// Derives stable, non-flipping 3D drafting axes from a surface hit normal.\n" +
        "    pub fn from_surface_normal(normal: [f64; 3]) -> Self {\n" +
        "        let z_c = normalize(normal);\n" +
        "        // Choose reference up vector to avoid collinear cross product\n" +
        "        let up = if z_c[1].abs() > 0.98 { [0.0, 0.0, 1.0] } else { [0.0, 1.0, 0.0] };\n" +
        "        let x_c = normalize(cross(up, z_c));\n" +
        "        let y_c = cross(z_c, x_c);\n" +
        "        Self { x: x_c, y: y_c, z: z_c }\n" +
        "    }\n" +
        "}\n" +
        "```\n" +
        "• Stable Orientation: Prevents compass jitter when snapping across adjacent angled faces.\n" +
        "• Automatic OCS Handshake: Feeds normal vector directly to CADCraft's `Mat4::ocs`."
      ];
    }

  static p_state_stack_1() {
      return [
        "To preserve continuity between AutoCAD and AccuDraw, we synchronize their state stacks. In CADCraft, drawing operations commit changes to `cadcraft-doc::EntityStore` with incremental transaction IDs.",
        "In `compassdraw-core`, we maintain a parallel **`SavedState` stack**. Whenever an entity point is committed, AccuDraw records its floating origin, active `ThreeAxes`, and coordinate locks. If the user invokes AutoCAD's `UNDO` command (`s.doc_mut()?.undo()`), CADCraft notifies CompassDraw, which pops its state stack to the matching transaction ID—instantly returning the compass origin and working depth to the prior vertex."
      ];
    }

  static sidebar_smart_backspace_winit() {
      return [
        "Single-Stroke Key Interception & Smart Backspace in winit:\n" +
        "```rust\n" +
        "// In PointInterceptor::handle_key_down\n" +
        "pub fn handle_key_down(&mut self, key: &str, ctrl: bool, shift: bool) -> bool {\n" +
        "    // 1. Intercept numbers without opening a command prompt\n" +
        "    if is_numeric_char(key) && !ctrl {\n" +
        "        self.typing_buffer.push_str(key);\n" +
        "        self.is_locked[self.active_axis] = true;\n" +
        "        self.apply_directional_sign(self.active_axis);\n" +
        "        return true; // Consumed: CADCraft prompt never sees this keystroke!\n" +
        "    }\n\n" +
        "    // 2. CAD Smart Backspace\n" +
        "    if key == \"Backspace\" {\n" +
        "        if !self.typing_buffer.is_empty() {\n" +
        "            self.typing_buffer.pop();\n" +
        "        } else {\n" +
        "            // Truncate least significant digit of live dynamic coordinate\n" +
        "            let val = self.last_delta[self.active_axis];\n" +
        "            self.typing_buffer = format!(\"{:.4}\", val);\n" +
        "            self.typing_buffer.pop(); // Remove last digit\n" +
        "            self.is_locked[self.active_axis] = true;\n" +
        "        }\n" +
        "        return true;\n" +
        "    }\n" +
        "    false\n" +
        "}\n" +
        "```\n" +
        "• Zero Double-Typing: Eliminates key conflicts between AccuDraw and CADCraft.\n" +
        "• Seamless Dimension Trimming: Smart Backspace allows rounding live measurements on the fly."
      ];
    }
}

globalThis.CadITwinParityContent = CadITwinParityContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadITwinParityContent;