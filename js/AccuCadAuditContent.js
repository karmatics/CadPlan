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
      "Input flows through `EventHandlers.js`. When the mouse moves, screen pixels are unprojected into a 3D ray by `GeneratePoint.generate()`. The ray's intersection with the active drawing plane yields a raw point. That point feeds directly into `AccuDrawLogic.onMotion()`, which evaluates active axis locks and directional deltas. Finally, `getConstrainedPoint()` calculates the definitive 3D coordinate and forwards it to the active command's `onPoint({ mode: 'hover' })` handler."
    ];
  }

  static sidebar_chord_mechanics() {
      return [
        "Locked Axis Snapping & Collision Mechanics:\n" +
        "• Perpendicular Projection (Default Snap):\n" +
        "  - Snapping to an off-axis point drops a 90° normal onto the locked trajectory in 3D world space.\n" +
        "  - Strictly view-independent: camera rotation/tilt has zero effect on the mathematical projection.\n" +
        "• Nearest Snap ('N') Ray-Curve Intersection:\n" +
        "  - Finds points where the locked ray penetrates the target element.\n" +
        "  - Solves quadratic ray-arc intersections: ||Origin + t*u - Center||² = R².\n" +
        "  - Resolves multi-root ambiguity by selecting the intersection point closest to cursor position.\n" +
        "• The 4-Tier Escape Cascade:\n" +
        "  - Escape 1: Cancels active numeric typing.\n" +
        "  - Escape 2: Unlocks currently focused axis.\n" +
        "  - Escape 3: Releases tentative snapping point.\n" +
        "  - Escape 4: Resets the active drawing command."
      ];
    }
  static p_audit_math_1() {
    return [
      "I wrote `AccuDrawLogic.js` to manage the mathematics of the floating frame. It doesn't calculate in absolute world space. Instead, it computes the delta vector between the cursor and `this.origin`, then projects that vector against the orientation matrix's basis vectors: `lx = delta · X_axis`, `ly = delta · Y_axis`, and `lz = delta · Z_axis`. In polar mode, it computes distance `√(lx² + ly²)` and angle `atan2(ly, lx) * 180 / π`."
    ];
  }

  static p_audit_math_2() {
    return [
      "My Smart Focus logic handles intent dynamically: as the user moves the mouse freely, `onMotion` continuously compares `|lx|` against `|ly|`. If the mouse pulls more strongly horizontally, the X coordinate receives focus; if it pulls vertically, Y receives focus. When you start typing a number, `typingMouseAnchor` captures the initial cursor coordinate. If you then deliberately drag the mouse along the perpendicular axis past a threshold, the system automatically commits the typed number and shifts active focus to the other axis."
    ];
  }

  static sidebar_smart_lock_math() {
      return [
        "Smart Lock (L), Distance Memory & Hysteresis:\n" +
        "• Smart Lock (L):\n" +
        "  - Rectangular Mode: Evaluates |lx| vs. |ly|. If |lx| > |ly|, locks Y = 0 (free along X); otherwise locks X = 0.\n" +
        "  - Polar Mode: Locks active angular vector, leaving radial distance free.\n" +
        "• Distance Memory Hysteresis & 'Sticky' Index Snapping:\n" +
        "  - AccuDraw caches recent distance scalars in memory, snapping magnetically as the cursor approaches that distance.\n" +
        "  - Breaking Free: The 'L' shortcut allows a single keystroke to lock whatever is currently locked into an 'unlocked' state so the draftsperson can move near an index without getting trapped by sticky distance memory.\n" +
        "• 3D Apparent Crossings:\n" +
        "  - When elements cross in perspective without physically touching in 3D, AccuDraw presents an interactive two-way UI choice (Enter for Element 1, Arrow for Element 2), allowing camera orbit verification before committing."
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
        "In our engine, free cursor motion stays strictly coplanar with the active working plane. Snapping to a 3D feature is an intentional gesture executed via the 50ms two-button chord or `Ctrl` hover. When snapped, the compass does not wander: pressing **`G`** (or `O`) immediately jumps the compass origin and its 3D working depth directly to that snapped vertex."
      ];
    }

  static p_audit_snap_2() {
      return [
        "This intentional discipline extends into element manipulation. In `MoveElementCommand` and `ModifyElementCommand`, when a draftsperson clicks an element, the engine automatically identifies the nearest topological feature (vertex, midpoint, or arc center) and anchors AccuDraw directly at that position with its native 3D depth.",
        "Because the compass is automatically positioned at the feature being modified, the draftsperson can immediately lock an indexed axis and type a dimension (e.g. typing `1.0` to translate exactly 1 unit). The combination of home-row **`G`** origin latching and automatic topological anchoring delivers speed without accidental depth jumps."
      ];
    }

  static sidebar_mini_jack_vis() {
      return [
        "AccuDraw Depth & Snapping Discipline:\n" +
        "• Active Plane Discipline: Mousing over background geometry never knocks the compass off its active construction plane.\n" +
        "• Left-Hand Home-Row 'G' (Go/Origin): Replacing the reach across to 'O', 'G' sits adjacent to F on the home row, jumping origin and 3D depth to the tentative point with zero hand travel.\n" +
        "• Topological Feature Anchoring: Manipulation tools (Move, Rotate, Scale) automatically place the compass at the picked element's primary vertex or center.\n" +
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