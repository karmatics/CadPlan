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
      "Chorded Clicks & Escape Hierarchy (EventHandlers.js):\n• 50ms Chord Window: In `handleMouseDown`, I set a 50ms threshold. If the left (data) and right (reset) buttons are pressed almost simultaneously, single clicks are bypassed and `TentativePointHandler.handleTentativePoint()` fires immediately, snapping to the nearest element.\n• Left Click: Commits a data point, clears tentative markers, and resets temporary locks.\n• Right Click: Acts as a graduated reset—first releasing tentative points, then clearing AccuDraw input buffers, and finally resetting the active tool.\n• 4-Tier Escape Cascade: Pressing Escape 1) cancels active numerical typing, 2) unlocks the currently focused axis, 3) closes any active popup, or 4) resets the active tool command."
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
      "Smart Lock (L) Implementation Details:\n• When you press 'L' (`handleSmartLock`), the system checks if any planar lock is already active. If so, it unlocks all planar axes.\n• If unlocked in rectangular mode, it checks whether `|lx| > |ly|`: if true, it locks `Y = 0` (holding the cursor to the X axis); if false, it locks `X = 0`.\n• In polar mode, it locks the active radial angle, leaving distance free.\n• Direct Number Entry: Regex `/[0-9.\-+]/.test(event.key)` captures keystrokes directly into `inputBuffer` without requiring focus in a text field, while smart backspace truncates digits cleanly."
    ];
  }

  static p_audit_math_3() {
    return [
      "The visual compass is rendered by `AccuDraw.js` and `Squircle3D.js`. Rather than a simple 2D circle, I implemented an animated 3D squircle (blending between a square in rectangular mode and a circle in polar mode) that stays coplanar with the active drawing plane. Pulsing tick marks along the primary axes oscillate when an axis lock is engaged, giving an immediate tactile sense of constraint."
    ];
  }

  static p_audit_snap_1() {
    return [
      "In `TentativePointHandler.js`, I implemented precision snapping. When the user initiates a tentative point (via chorded click), the handler first fires a standard 3D raycast against all snappable candidate objects. But because thin wireframe lines and curves present microscopic hit targets in 3D perspective views, I added an essential fallback: `_findClosestElementByScreenSegments`."
    ];
  }

  static p_audit_snap_2() {
    return [
      "This fallback projects candidate element line segments into 2D screen coordinates and measures the perpendicular pixel distance from the cursor to each segment within a 10-pixel threshold. This provides reliable 'thick picking' without requiring heavy invisible collider hulls. Once an element is picked, `_findClosestVertexScreenSpace` locates the nearest vertex in screen pixels, providing crisp magnetic snapping."
    ];
  }

  static sidebar_mini_jack_vis() {
    return [
      "Visual Cues (The Mini-Jack & Z-Projection):\n• When a candidate snap point is locked but the mouse cursor is pulled away, `AccuDraw.js` renders a 3-axis 'Mini-Jack' cursor at the constrained world location, with a connecting line back to the cursor.\n• If the Z-plane is locked (`zPlaneLocked`), `TentativePointHandler` drops a perpendicular dashed projection line from the 3D tentative point down to the working plane, making height offsets completely clear."
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
}

globalThis.AccuCadAuditContent = AccuCadAuditContent;
if (typeof module !== 'undefined' && module.exports) module.exports = AccuCadAuditContent;