class AccuCadAuditContent {
  static getMeta() {
    return {
      kicker: 'Prototype Deconstruction & Math Audit',
      title: 'Inside accuCad: How the Prototype Works',
      subtitle: 'A thorough first-person technical walkthrough of the accuCad codebase: controllers, direction-cosine matrices, chorded clicks, and snapping.'
    };
  }

  static manifest() {
        return [
          {
            section: 'snapping_lab_top',
            partLabel: 'Chapter 3 • Interactive Snapping Lab',
            title: 'TentativePointHandler: 50ms Chord Snap & 3-Axis Mini-Jack',
            blocks: [
              { id: 'comp_tentative_snapping_lab', type: 'component', component: 'TentativeSnappingLab' }
            ]
          },
          {
            section: 'nearest_intersection_section',
            partLabel: 'Chapter 3 • Ray-Curve Math',
            title: 'Nearest Snap ("N"): Quadratic Ray-Arc Intersections & Root Heuristic',
            blocks: [
              { id: 'comp_nearest_intersection_lab', type: 'component', component: 'CadNearestIntersectionLab' }
            ]
          },
          {
            section: 'surface_normal_section',
            partLabel: 'Chapter 3 • Surface Latching',
            title: 'Surface Normal Alignment ("Q"): Gram-Schmidt Non-Flipping Axes & Reset Reversion',
            blocks: [
              { id: 'comp_surface_normal_lab', type: 'component', component: 'CadSurfaceNormalLab' }
            ]
          },
          {
            section: 'controller',
            partLabel: 'Chapter 3 • Pipeline',
            title: 'The Controller & 50ms Chord Loop',
            blocks: [
              { id: 'p_audit_ctrl_1', type: 'p' },
              { id: 'p_audit_ctrl_2', type: 'p' },
              { id: 'sidebar_chord_mechanics', type: 'sidebar', kicker: 'Event Handling', title: 'Chorded Clicks & The 4-Tier Escape Cascade' }
            ]
          },
          {
            section: 'math',
            partLabel: 'Chapter 3 • Constraint Engine',
            title: 'AccuDrawLogic: Relative Vectors & Smart Lock',
            blocks: [
              { id: 'p_audit_math_1', type: 'p' },
              { id: 'p_audit_math_2', type: 'p' },
              { id: 'sidebar_smart_lock_math', type: 'sidebar', kicker: 'Constraint Logic', title: 'Smart Lock (L) & Typing Gesture Anchors' },
              { id: 'p_audit_math_3', type: 'p' }
            ]
          },
          {
            section: 'snapping',
            partLabel: 'Chapter 3 • Snapping',
            title: 'TentativePointHandler: 3D Raycasting & 2D Screen Picking',
            blocks: [
              { id: 'p_audit_snap_1', type: 'p' },
              { id: 'p_audit_snap_2', type: 'p' },
              { id: 'sidebar_mini_jack_vis', type: 'sidebar', kicker: 'Visual Cues', title: 'The Mini-Jack & Z-Plane Projection Guides' }
            ]
          },
          {
            section: 'live_dimension_hud',
            partLabel: 'Chapter 3 • Dynamic Telemetry',
            title: 'Dynamic Dimension HUD & Real-Time Distance Memory Lab',
            blocks: [
              { id: 'comp_dynamic_dimension_hud_lab', type: 'component', component: 'CadDynamicDimensionHudLab' }
            ]
          },
          {
            section: 'tools',
            partLabel: 'Chapter 3 • Tools & Camera',
            title: 'Drawing Commands & Camera Oscillation',
            blocks: [
              { id: 'p_audit_tools_1', type: 'p' },
              { id: 'p_audit_tools_2', type: 'p' }
            ]
          }
        ];
      }
  static p_audit_ctrl_1() {
    return [
      "In `accuCad`, I built `BaseController.js` as the central coordinator. It holds the element registry (`this.cadElements`), the floating origin (`this.origin = [0, 0, 0]`), the active drawing orientation (`this.rotationMatrix` as a 3×3 direction cosine matrix), and the registered tool instances (rectangle, arc, path, curve, circle, capsule, move, rotate, scale, delete)."
    ];
  }

  static p_audit_ctrl_2() {
    return [
      "Input flows through `EventHandlers.js`. When the mouse moves, screen pixels are unprojected into a 3D ray by `GeneratePoint.generate()`. The ray's intersection with the active drawing plane yields a raw point. That point feeds directly into `AccuDrawLogic.onMotion()`, which evaluates active axis locks and directional deltas. Finally, `getConstrainedPoint()` calculates the definitive 3D coordinate and forwards it to the active command's `onPoint({ mode: 'hover' })` handler.",
      "When explicit orientation changes occur, the engine supports both **Rotate Quick (`RQ`)**—which preserves the current plane normal $\\vec{Z}$ and rotates $\\hat{X}$ toward a picked reference point—and **Rotate Axes (`RA`)**, which allows three arbitrary points to define an origin, primary axis, and planar orientation deterministically via cross-product math.",
      "• **The Context-Sensitivity Reset Reversion Invariant (Rob Brown's Rule)**: While an element is being drawn with Context Sensitivity active, AccuDraw rotates its axes to match each newly committed segment. However, the moment the user hits **Reset** (via right-click or `Escape`), the engine **automatically reverts the compass back to the baseline construction plane** (Top, Front, Side, View, or custom ACS) that was active before the element was initiated. This prevents the coordinate system from becoming stranded at an arbitrary skew when an operation is cancelled."
    ];
  }

  static sidebar_chord_mechanics() {
    return [
      "Event Loop & Reset Reversion Rules:\n" +
      "• Perpendicular Projection (Default Snap):\n" +
      "  - Snapping to an off-axis point drops a 90° normal onto the locked trajectory in 3D world space, strictly view-independent.\n" +
      "• Nearest Snap ('N') Ray-Curve Intersection:\n" +
      "  - Solves quadratic ray-arc intersections: ||Origin + t*u - Center||² = R².\n" +
      "• The Reset Reversion Invariant:\n" +
      "  - While drafting, compass aligns to the last segment drawn.\n" +
      "  - On Reset (Right-Click / Esc), compass reverts automatically to the prior baseline plane (Top, Front, Side, View, or ACS).\n" +
      "• The 4-Tier Escape Cascade:\n" +
      "  - Escape 1: Cancels active numeric typing.\n" +
      "  - Escape 2: Unlocks currently focused axis.\n" +
      "  - Escape 3: Releases tentative snapping point.\n" +
      "  - Escape 4: Resets active tool and reverts compass to baseline plane."
    ];
  }
  static p_audit_math_1() {
    return [
      "I wrote `AccuDrawLogic.js` to manage the mathematics of the floating frame. It doesn't calculate in absolute world space. Instead, it computes the delta vector between the cursor and `this.origin`, then projects that vector against the orientation matrix's basis vectors: `lx = delta · X_axis`, `ly = delta · Y_axis`, and `lz = delta · Z_axis`. In polar mode, it computes distance `√(lx² + ly²)` and angle `atan2(ly, lx) * 180 / π`."
    ];
  }

  static p_audit_math_2() {
      return [
        "My Smart Focus logic handles intent dynamically: as the user moves the mouse freely, `onMotion` continuously compares `|lx|` against `|ly|`. If the mouse pulls more strongly horizontally, the X coordinate receives focus; if it pulls vertically, Y receives focus. When you start typing a number, `typingMouseAnchor` captures the initial cursor coordinate. If you then deliberately drag the mouse along the perpendicular axis past a threshold, the system automatically commits the typed number and shifts active focus to the other axis.",
        "For recurring dimensions (like drafting repeated 10-foot bays), AccuDraw features **Distance Memory Indexing**. As Rob Brown explains, this hysteresis is calculated strictly in **screen space** (pixels on screen) rather than world coordinates. If it were in model units, zooming in or out would make the magnetic snap zone either an overwhelming trap or an invisible sliver. By evaluating screen-distance proximity, the magnetic pull remains tight and unobtrusive.",
        "To prevent drafters from getting trapped when intentionally placing a slightly different dimension (such as 10.2 instead of 10.0), AccuDraw provides an **Axis-Lock Isolation Shortcut**: tapping `L` (or the axis key) fixes and locks the directional axis trajectory while explicitly disengaging the distance memory snap. The cursor can then glide freely along the locked line to 10.2 without being sucked back into 10.0."
      ];
    }

  static sidebar_smart_lock_math() {
      return [
        "Smart Lock (L), Screen-Space Hysteresis & Breaking Free:\n" +
        "• Smart Lock (L):\n" +
        "  - Rectangular Mode: Evaluates |lx| vs. |ly|. If |lx| > |ly|, locks Y = 0 (free along X); otherwise locks X = 0.\n" +
        "  - Polar Mode: Locks active angular vector, leaving radial distance free.\n" +
        "• Screen-Space Hysteresis Metric:\n" +
        "  - Indexing tolerance is evaluated in screen pixels, keeping magnetic pull consistent across all zoom levels.\n" +
        "  - The cursor must be genuinely close on screen to catch an index tick, preventing magnetic interference.\n" +
        "• Breaking Free from Distance Traps:\n" +
        "  - Tapping 'L' while indexed fixes the axis constraint while disengaging the sticky distance memory.\n" +
        "  - Allows the drafter to slide along the locked axis to 10.2 without getting sucked into a cached 10.0.\n" +
        "• Constrained Point Readout Invariant:\n" +
        "  - AccuDraw always displays the constrained point coordinates relative to origin—NEVER an unused diagonal distance.\n" +
        "• Typed Override Hierarchy:\n" +
        "  - Direct key-ins override snap distances on locked axes, with automatic focus advancement to free coordinates."
      ];
    }
  static p_audit_math_3() {
      return [
        "A vital mathematical distinction in AccuDraw is how locked axes interact with snapped elements. When a draftsperson has an axis or angle locked and snaps to an off-axis vertex, the engine performs **Model-Space Perpendicular Projection**:",
        "$$\\vec{P}_{\\text{constrained}} = \\vec{Origin} + \\left((\\vec{P}_{\\text{snap}} - \\vec{Origin}) \\cdot \\hat{u}\\right) \\hat{u}$$",
        "Crucially, this projection completely ignores the camera view direction—it is calculated purely against the 3D vector basis of the constraint line in model space.",
        "However, if the draftsperson activates **Nearest Snap (`N`)** while an axis is locked, AccuDraw transitions into a ray-curve intersection solver. Instead of projecting back, it calculates the points where the locked ray $\\vec{R}(t) = \\vec{Origin} + t\\hat{u}$ intersects the target element (line, arc, or spline). Because curves can produce multiple intersection roots, AccuDraw uses the live cursor position as an under-constrained heuristic to select the closest valid intersection root."
      ];
    }

  static p_audit_snap_1() {
      return [
        "In `TentativePointHandler.js`, we implemented precision snapping with strict **Active Plane Discipline**. In early CAD, draftspersons were plagued by passive snap engines (such as Bentley's later `AccuSnap`) that aggressively jumped the working plane off onto background geometry simply because the cursor hovered over an unrelated element. That behavior is disorienting and breaks drafting rhythm.",
        "In our engine, free cursor motion stays strictly coplanar with the active working plane. Snapping to a 3D feature is an intentional gesture executed via the 50ms two-button chord or `Ctrl` hover. Crucially, as Rob Brown confirms, **tentative snapping does NOT move the compass origin on its own**. The origin only moves to the snapped vertex when the drafter explicitly invokes the 'Set Origin' shortcut (`O` in MicroStation, `G` for home-row 'Go' in accuCad). And when you press `O` or `G`, **it strictly translates the origin point without reorienting the compass**, leaving your active construction plane untouched."
      ];
    }

  static p_audit_snap_2() {
    return [
      "This intentional discipline extends into element manipulation and drawing continuity through two independent settings: **Floating Origin** and **Context Sensitivity**.",
      "• **Floating Origin (`floatingOrigin`)**: Moves the compass origin automatically to the last placed data point when placing an element. This keeps local relative coordinates at $(0, 0, 0)$ for subsequent dimensions. Drafters almost never turn this off.",
      "• **Context Sensitivity (`contextSensitivity`)**: Automatically rotates the compass axes to match the segment orientation of newly drawn or modified elements. When drafting orthogonal walls or structural grids, drafters often disable context sensitivity so the compass remains locked to orthogonal coordinates while the origin continues to float.",
      "• **The Z-Lock Plane Projection Invariant (Rob Brown's Rule)**: When $Z$ is locked, any coordinate is forced onto the active $Z$ construction plane (typically $Z=0$ relative to the origin, though any arbitrary elevation $Z_e$ may be active). Crucially, the mode of projection depends on whether the coordinate is snapped: **if it is a snap to off-plane 3D geometry, it drops perpendicularly along the plane normal $\\vec{Z}_c$**, completely independent of the camera view angle. **If it is un-snapped free cursor motion, it projects along the camera's line-of-sight ray**. This guarantees that snapping to elevated geometry never skews or distorts planar dimensions."
    ];
  }

  static sidebar_mini_jack_vis() {
    return [
      "AccuDraw Depth, Snapping & Z-Lock Invariant:\n" +
      "• Tentative Snap is Non-Destructive: Snapping to a candidate vertex does NOT move the origin automatically.\n" +
      "• Set Origin (O / G): Only pressing O (or G on home row) moves the origin to the tentative point, strictly preserving existing compass orientation without rotating.\n" +
      "• The Z-Lock Dual-Projection Invariant (Rob Brown's Rule):\n" +
      "  1. Snapped Coordinate: Drops perpendicularly onto the active Z plane along plane normal Z_c: P_flat = P_snap - ((P_snap - Origin) · Z_c) * Z_c.\n" +
      "     - Strictly model-space perpendicular: Camera tilt/spin has zero effect on the snap coordinate.\n" +
      "  2. Un-snapped Free Cursor: Projects to the plane along the camera perspective raycast.\n" +
      "• The Mini-Jack Cursor: When an axis or snap point is locked and the mouse pulls away, a 3-axis mini-jack renders at the constrained world location, with a perpendicular dashed projection line down to the working plane."
    ];
  }
  static p_audit_tools_1() {
    return [
      "The tool commands follow a clean lifecycle. In `DrawPathCommand.js`, vertices are placed with a radius property, allowing continuous lines with real-time rounded corner fillets calculated via `RoundingUtils3D.getRoundingData`. In `DrawRectangleCommand.js`, rectangles are placed with arbitrary 3D orientation matrices rather than simple screen-aligned boxes, allowing boxes and slabs to be built across any face."
    ];
  }

  static p_audit_tools_2() {
    return [
      "For camera control, `ViewManipulator.js` handles smooth panning and rotation (Alt/Meta for orbit, Shift for pan), while `CameraOrbitAnimator.js` provides gentle, continuous oscillation around the target point. A key detail in `CameraOrbitAnimator` is its self-healing re-anchoring: if the user pans or rotates while oscillation is running, the math recalculates the phase offset without resetting the camera violently."
    ];
  }

  js() {}
}

globalThis.AccuCadAuditContent = AccuCadAuditContent;
if (typeof module !== 'undefined' && module.exports) module.exports = AccuCadAuditContent;