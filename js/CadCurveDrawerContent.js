class CadCurveDrawerContent {
  static getMeta() {
    return {
      kicker: 'Proprietary Curve Mathematics',
      title: '5. The Curve Drawer: On-Curve Anchors & The Kinetic Tether',
      subtitle: 'Replacing 40 years of Bézier handle frustration: on-curve through-point relaxation, vertex-targeted modulation, and the low-pass kinetic string drag.'
    };
  }

  static manifest() {
      return [
        {
          section: 'curve_laboratory',
          partLabel: 'Chapter 5 • Interactive Laboratory',
          title: 'Live Curve Laboratory: On-Curve Relaxation & Kinetic Tether',
          blocks: [
            { id: 'comp_curve_drawer_lab', type: 'component', component: 'CurveDrawerLabComponent' }
          ]
        },
        {
          section: 'two_modalities',
          partLabel: 'Chapter 5 • Foundations',
          title: 'Two Distinct Modalities of Curve Creation',
          blocks: [
            { id: 'p_curve_modalities_1', type: 'p' },
            { id: 'p_curve_modalities_2', type: 'p' },
            { id: 'sidebar_curve_modalities', type: 'sidebar', kicker: 'Proprietary Math', title: 'On-Curve Relaxation vs. The Kinetic Tether' }
          ]
        },
        {
          section: 'string_drag',
          partLabel: 'Chapter 5 • Kinetic Drag',
          title: 'The Kinetic String-Drag & Reverse-Undo Scrubbing',
          blocks: [
            { id: 'p_string_drag_1', type: 'p' },
            { id: 'p_string_drag_2', type: 'p' },
            { id: 'sidebar_string_mechanics', type: 'sidebar', kicker: 'Mechanical Filter', title: 'Low-Pass Mechanical Filtering with Ctrl & Shift' }
          ]
        },
        {
          section: 'endpoint_tangency',
          partLabel: 'Chapter 5 • Boundary Conditions',
          title: 'Endpoint Tangencies & Natural Uncurled Exit Vectors',
          blocks: [
            { id: 'p_endpoints_1', type: 'p' },
            { id: 'sidebar_endpoint_math', type: 'sidebar', kicker: 'Boundary Math', title: 'Preventing Unwanted Curl on Boundary Vertices' }
          ]
        }
      ];
    }
  static p_curve_modalities_1() {
    return [
      "For forty years, digital curve creation has been held hostage by the standard Bézier 'pen tool' found in Illustrator, Photoshop, AutoCAD, and CorelDRAW. To draw a curve, you click an anchor, hold the mouse down, drag an invisible off-curve tangent handle into empty space, release, click another point, drag another handle, and hope the resulting arc resembles what you had in your head. Nobody thinks in off-curve tangent handles. When an artist sketches on paper, their pencil follows the line itself."
    ];
  }

  static p_curve_modalities_2() {
    return [
      "In my software architecture, I solved this by developing two completely distinct, revolutionary curve modalities:",
      "1. **Modality 1: Interactive On-Curve Through-Points.** Every click places an anchor strictly *on the curve itself*. An 8-iteration relaxation solver (`UpdateControlPoints.js`) evaluates adjacent through-points and derives the exact cubic Bézier control points and $G^1$ tangencies in real time. Unlike legacy CAD tools where curvature settings applied globally, our engine allows **vertex-targeted parameter modulation**: you can select and tune curvature (fullness) and balance (chord weighting) for any specific vertex.",
      "2. **Modality 2: The Kinetic Tether ('String-Drag').** Pressing `Ctrl` freezes the tip of the curve and extends an elastic dashed tether to the cursor. Releasing `Ctrl` pulls the curve tip forward as if towing it with a string: the longer the string, the smoother the curve, mechanically filtering micro-tremors while allowing sharp cusps by pulling at acute angles. Holding `Shift` lets you push backward along the path to interactively undo glitches, re-aim, and pull again."
    ];
  }

  static sidebar_curve_modalities() {
    return [
      "Summary of Curve Modalities:\n" +
      "• Modality 1 (On-Curve Relaxation):\n" +
      "  - Click through-points directly on the curve itself.\n" +
      "  - Iterative G1 tangent relaxation through adjacent chords.\n" +
      "  - Vertex-targeted curvature (pushing control points out) and balance (weighting incoming vs. outgoing segments).\n" +
      "• Modality 2 (The Kinetic Tether / String Drag):\n" +
      "  - Hold `Ctrl`: Extends dashed elastic string from stationary curve tip.\n" +
      "  - Release `Ctrl`: Cursor pulls curve tip; string length acts as low-pass physical filter.\n" +
      "  - Hold `Shift`: Push backward along the trajectory to interactively undo samples.\n" +
      "  - Bézier Fitting: At release, the clean trajectory resolves into exact cubic Bézier curves."
    ];
  }

  static p_string_drag_1() {
    return [
      "The kinetic tether modality solves the fundamental problem of freehand digital drawing: mouse and stylus hand jitter. When someone attempts to draw a smooth curve by freehand dragging, human micro-tremors introduce high-frequency wobbles that naive polynomial smoothers distort into muddy lumps."
    ];
  }

  static p_string_drag_2() {
    return [
      "With the kinetic string-drag, the string length establishes a mechanical low-pass filter: a 50-pixel string absorbs hand fluctuations while maintaining the overall sweeping arc. If you make a mistake, you don't hit `Ctrl+Z` to destroy the whole line; you simply press `Shift` and push the mouse backward. The tip backtracks along its trajectory, unwinding recent points. You re-orient the string in the direction you want, release `Shift`, and continue pulling."
    ];
  }

  static sidebar_string_mechanics() {
    return [
      "Kinetic Tether Algorithm Mechanics:\n" +
      "• String Vector: $\\vec{S} = \\vec{P}_{\\text{cursor}} - \\vec{P}_{\\text{tip}}$ with length $L = \\|\\vec{S}\\|$.\n" +
      "• Towing Threshold: If $L > L_{\\text{string}}$, tip moves along unit vector $\\hat{S}$ by $\\Delta d = L - L_{\\text{string}}$.\n" +
      "• Reverse Scrubbing (`Shift`): When moving opposite to $\\hat{S}$, pops recorded points from trajectory queue.\n" +
      "• Cusp Creation: Back up, hold `Ctrl` to swivel string angle sharply, and pull in the new direction."
    ];
  }

  static p_endpoints_1() {
    return [
      "A classic weakness of on-curve through-point algorithms is the boundary condition at the endpoints. Because the first and last points lack an adjacent segment on one side, naive tangent solvers often calculate tangents that curl inward or push out awkwardly.",
      "In our engine, endpoints are given intelligent default exit vectors derived from the natural curve curvature, while still allowing the draftsperson to explicitly lock or override the boundary tangent vector using AccuDraw."
    ];
  }

  static sidebar_endpoint_math() {
    return [
      "Boundary Tangency Rules:\n" +
      "• Start Point (Vertex 0): Tangent derived from forward chord $P_1 - P_0$ blended with curvature scale.\n" +
      "• End Point (Vertex N): Tangent projected along outgoing trajectory without inward curling.\n" +
      "• AccuDraw Tangent Handshake: When AccuDraw is active, boundary tangencies can be locked to standard planes (`T`, `F`, `S`, `V`) or surface normals (`Q`)."
    ];
  }
}

globalThis.CadCurveDrawerContent = CadCurveDrawerContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadCurveDrawerContent;