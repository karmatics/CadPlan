class AccuDrawAnalysisContent {
  static getMeta() {
    return {
      kicker: 'Prototype Analysis',
      title: 'accuCad Architecture & AccuDraw Audit',
      subtitle: 'A deep architectural deconstruction of the existing accuCad prototype: controllers, snapping matrices, and coordinate mechanics.'
    };
  }

  static manifest() {
    return [
      {
        section: 'controller',
        partLabel: 'Architecture',
        title: 'The Controller & Event Loop Pipeline',
        blocks: [
          { id: 'p_audit_controller_1', type: 'p' },
          { id: 'p_audit_controller_2', type: 'p' },
          { id: 'sidebar_chord_clicks', type: 'sidebar', kicker: 'Interaction Mechanics', title: 'Chorded Mouse Clicks & Button Multiplexing' }
        ]
      },
      {
        section: 'accudraw_math',
        partLabel: 'Constraint Engine',
        title: 'AccuDraw: Mathematics of the Floating Frame',
        blocks: [
          { id: 'p_audit_accudraw_1', type: 'p' },
          { id: 'p_audit_accudraw_2', type: 'p' },
          { id: 'sidebar_smart_lock', type: 'sidebar', kicker: 'Coordinate Math', title: 'Smart Lock (L) & Axis Indexing Logic' },
          { id: 'p_audit_accudraw_3', type: 'p' }
        ]
      },
      {
        section: 'snapping',
        partLabel: 'Snapping Engine',
        title: 'Tentative Snapping & Thick Picking',
        blocks: [
          { id: 'p_audit_snapping_1', type: 'p' },
          { id: 'p_audit_snapping_2', type: 'p' },
          { id: 'sidebar_mini_jack', type: 'sidebar', kicker: 'Visual Feedback', title: 'The Mini-Jack & Projection Line' }
        ]
      }
    ];
  }

  static p_audit_controller_1() {
    return [
      "In the accuCad prototype, the core interaction loop is managed by `BaseController.js` and `EventHandlers.js`. The controller coordinates the active drawing command, maintains the scene elements list (`this.cadElements`), and holds the active spatial drawing orientation (`this.rotationMatrix`) and origin (`this.origin`). Drawing planes ('top', 'front', 'side') are defined as 3×3 direction cosine basis matrices."
    ];
  }

  static p_audit_controller_2() {
    return [
      "During mouse movement, `EventHandlers.handleMouseMove` converts screen coordinates into a 3D ray through `GeneratePoint.generate()`. If the cursor aligns closely with either basis axis within a tolerance threshold, an axis index is computed. The raw 3D point is then fed into `AccuDrawLogic.onMotion()`, which evaluates active locks and directional deltas. Finally, `getConstrainedPoint()` computes the definitive world coordinate, which is passed down to the active command's `onPoint({ mode: 'hover', ... })` method."
    ];
  }

  static sidebar_chord_clicks() {
    return [
      "Chorded Mouse Button Mechanics in EventHandlers.js:\n• Chord Detection: In `handleMouseDown`, a 50ms chord threshold checks whether the left (data) and right (reset) buttons are pressed almost simultaneously. If detected, it bypasses the single-click actions and fires `TentativePointHandler.handleTentativePoint()`.\n• Single Click Timing: If a button is pressed without a second button within 50ms, a timer resolves the click to `_processSingleLeftClick` (committing a point) or `_processSingleRightClick` (releasing tentative point, clearing input buffer, or resetting the active tool).\n• The Escape Hierarchy in handleKeyDown: Pressing Escape follows a strict four-level cascade:\n  1. If currently typing a number, cancel the typing session and restore cursor tracking.\n  2. If an axis is locked, unlock that specific axis.\n  3. If a shortcut dialogue is open, close it.\n  4. If no locks or inputs are active, reset the active drawing command."
    ];
  }

  static p_audit_accudraw_1() {
    return [
      "`AccuDrawLogic.js` serves as the analytical brain of the constraint system. It tracks the local delta vector relative to `this.origin` by projecting the mouse coordinate against the current rotation basis: `localX = delta · X_axis`, `localY = delta · Y_axis`, and `localZ = delta · Z_axis`. In polar mode, the distance is calculated as `√(lx² + ly²)` and the angle as `atan2(ly, lx) * 180 / π`."
    ];
  }

  static p_audit_accudraw_2() {
    return [
      "A standout ergonomic feature is Smart Focus: as the user moves the mouse without active locks, `onMotion` continuously compares `|localX|` against `|localY|`. If the mouse pulls more strongly in X, the X field receives focus; if it pulls in Y, the Y field takes focus. When the user starts typing numbers, `typingMouseAnchor` captures the initial cursor coordinate. If the user then deliberately drags the mouse along the perpendicular axis past a threshold, the logic automatically commits the typed value and transfers active focus to the secondary axis."
    ];
  }

  static sidebar_smart_lock() {
    return [
      "Smart Lock (L) and Axis Indexing Hierarchy:\n• When the user presses 'L' (`handleSmartLock`), the system checks if any planar lock is already active. If so, it unlocks all planar axes.\n• If no axes are locked, it evaluates whether the cursor is closer to the X or Y axis: if `|x| > |y|`, it locks `Y = 0` (holding the cursor to the X axis); if `|y| > |x|`, it locks `X = 0`.\n• In polar mode, it locks the current angle to whatever radial direction the cursor is pointing, leaving distance free.\n• Index Line Visibility: The white constraint indicator line (`indexIndicator`) rendered by `AccuDraw.js` only appears when an axis is indexed or locked to zero, floating at the exact Z-height of the constrained coordinate."
    ];
  }

  static p_audit_accudraw_3() {
    return [
      "The visual compass is handled in `AccuDraw.js` and `Squircle3D.js`. Rather than a simple 2D circle, the compass is rendered as a 3D squircle (interpolating smoothly between a square in rectangular mode and a circle in polar mode) that stays coplanar with the active drawing basis. Pulsing tick marks along the primary axes oscillate when an axis lock is engaged, giving an immediate tactile sense of constraint."
    ];
  }

  static p_audit_snapping_1() {
    return [
      "`TentativePointHandler.js` implements precision snapping. When the user initiates a tentative point, the handler first executes a standard 3D raycast against all snappable candidate objects. However, because thin lines, wireframe rectangles, and curves present tiny hit targets in 3D, it incorporates a crucial screen-space fallback: `_findClosestElementByScreenSegments`."
    ];
  }

  static p_audit_snapping_2() {
    return [
      "This screen-space fallback projects candidate element line segments into 2D viewport coordinates and tests the pixel distance from the cursor to each segment within a 10-pixel threshold. This provides 'thick picking' without requiring bloated invisible collider meshes. Once an element is identified, `_findClosestVertexScreenSpace` locates the nearest vertex in screen pixels, ensuring crisp snapping even under steep camera angles."
    ];
  }

  static sidebar_mini_jack() {
    return [
      "Visualizing Snap & Plane Offsets (The Mini-Jack):\n• When a candidate snap point is locked but the raw mouse cursor is pulled away, `AccuDraw.js` displays a 3-axis 'Mini-Jack' cursor (`_createMiniJack()`) at the constrained world location, while maintaining a line back to the pointer.\n• If the Z-plane is locked (`zPlaneLocked`), `TentativePointHandler` drops a dashed perpendicular projection line from the 3D tentative point down to the active working plane, making 3D spatial height relationships immediately legible."
    ];
  }
}

globalThis.AccuDrawAnalysisContent = AccuDrawAnalysisContent;
if (typeof module !== 'undefined' && module.exports) module.exports = AccuDrawAnalysisContent;