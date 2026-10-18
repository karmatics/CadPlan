class CurveTouchContent {
  static getMeta() {
    return {
      kicker: 'Geometric Innovation & Multi-Touch Synergy',
      title: 'The Pen Tool Replacement & Multi-Touch',
      subtitle: 'Replacing 40 years of Bezier handle frustration with on-curve drafting, and pairing it with TouchController to modulate multiple parameters in real time.'
    };
  }

  static manifest() {
    return [
      {
        section: 'pen_replacement',
        partLabel: 'Chapter 5 • Curve Design',
        title: 'Rethinking the Bezier Pen Tool',
        blocks: [
          { id: 'p_pen_problem_1', type: 'p' },
          { id: 'p_pen_problem_2', type: 'p' },
          { id: 'sidebar_on_curve_math', type: 'sidebar', kicker: 'Geometry Innovation', title: 'Why On-Curve Point Placement Wins' }
        ]
      },
      {
        section: 'touch_synergy',
        partLabel: 'Chapter 5 • Multi-Touch',
        title: 'Two-Handed CAD with TouchController',
        blocks: [
          { id: 'p_touch_synergy_1', type: 'p' },
          { id: 'p_touch_synergy_2', type: 'p' },
          { id: 'sidebar_touch_controller_mechanics', type: 'sidebar', kicker: 'P2P Remote Pipeline', title: 'Controlling Three Parameters at Once' },
          { id: 'p_touch_synergy_3', type: 'p' }
        ]
      }
    ];
  }

  static p_pen_problem_1() {
    return [
      "For forty years, digital curve creation has been dominated by the standard Bezier 'pen tool' found in Illustrator, Photoshop, AutoCAD, and CorelDRAW. And for forty years, it has tortured users. To draw a curve, you click an anchor point, hold the mouse down, drag out an invisible tangent handle into empty space, release, click another point, drag another handle, and hope the resulting arc resembles what you had in your head."
    ];
  }

  static p_pen_problem_2() {
      return [
        "Nobody thinks in off-curve tangent handles. When an artist sketches on paper, their pencil follows the line itself. In my software architecture, I developed two completely distinct, revolutionary ways of drawing digital curves without off-curve handle wrestling:",
        "**Method 1: Interactive On-Curve Through-Points.** In `DrawingApp/js/CurveDraw.js`, every click places an anchor strictly *on the curve itself*. Through `BezierVertex.js` and `UpdateControlPoints.js`, an 8-iteration relaxation solver evaluates the sequence of through-points and derives the exact cubic Bézier control points and $G^1$ tangencies in real time. Rather than global settings, you can target individual vertices to adjust curvature (how far control points push out) and balance (weighting between incoming and outgoing chords). For endpoints, intelligent exit vectors prevent the curve from curling back awkwardly.",
        "**Method 2: The Kinetic Tether ('String-Drag').** Pressing the `Control` key freezes the tip of the curve and lets you extend a dynamic dashed string to your mouse. Releasing `Control` pulls the curve tip forward as if towing it with an elastic rope: the longer the string, the smoother the curve, naturally dampening micro-tremors while letting you make deliberate sharp cusps by pulling at acute angles. Holding `Shift` lets you push backward along the trajectory to interactively undo glitches, re-aim the string, and pull again. When finished, our Bézier solver converts that clean physical motion into exact mathematical splines."
      ];
    }

  static sidebar_on_curve_math() {
      return [
        "The Two Authentic Curve Modalities (DrawingApp & CadPlan):\n" +
        "• Modality 1 (On-Curve Relaxation):\n" +
        "  - Anchor Placement: Click through-points directly on the curve.\n" +
        "  - Relaxation Engine: `UpdateControlPoints.js` computes G1 tangents and chord distances iteratively.\n" +
        "  - Vertex-Targeted Tuning: Curvature (fullness) and Balance (tangency weighting) can target specific vertices rather than applying globally.\n" +
        "  - Endpoint Exit Vectors: Natural uncurled default tangencies for boundary nodes.\n" +
        "• Modality 2 (The Kinetic String-Drag / Tether):\n" +
        "  - `Ctrl` Drag: Anchors curve tip; extends elastic dashed string to mouse cursor.\n" +
        "  - `Ctrl` Release: Towing action pulls curve tip; string length acts as low-pass mechanical filter.\n" +
        "  - `Shift` Push: Reverse scrubbing interactively undos recent points for seamless correction.\n" +
        "  - Bézier Conversion: The resulting smoothed stream resolves into optimized cubic Bézier segments."
      ];
    }
  static p_touch_synergy_1() {
    return [
      "Now, combine that on-curve drafting tool with another major piece of technology in my world: `TouchController.js` and `P2PConnector.js`. In modern desktop computing, your left hand is usually idle or hovering over a keyboard while your right hand does 95% of the physical work on the mouse. That is an enormous waste of human bandwidth."
    ];
  }

  static p_touch_synergy_2() {
    return [
      "With `TouchController`, your phone connects over a low-latency WebRTC data channel and becomes an analog modulation deck for the curve engine. While your right hand uses the mouse to lay down on-curve vertices in the 3D viewport, your left hand on the phone can fluidly scrub `currentCurvature` (fullness) and `currentBalance` (tangent weighting) across fingers, modulating the line dynamically as it is drawn."
    ];
  }
  static sidebar_touch_controller_mechanics() {
    return [
      "Three Parameters at Once with TouchController:\n• Hand 1 (Mouse): Right hand clicks natural through-points along the curve in the 3D viewport with full AccuDraw snapping.\n• Hand 2 (Touch Surface): Left hand rests on the phone's glass. With different fingers resting on responsive touch zones, you can:\n  1. Modulate curve tension / fullness with Finger 1.\n  2. Adjust line weight or corner fillet radius with Finger 2.\n  3. Adjust 3D working depth, compass tilt, or camera orbit with a two-finger swipe.\n• All three adjustments occur simultaneously in real time while the curve is being drawn!"
    ];
  }

  static p_touch_synergy_3() {
    return [
      "Imagine the tactile reality of that: you are laying down a complex 3D curve with your mouse, and with your left hand on your phone, you are fluidly bending its fullness, fattening its stroke, and tilting the working plane into third-dimensional depth—all at the exact same moment. It completely breaks the old 'click, stop, find a slider, click, adjust' pattern. It turns 3D CAD into a live, expressive, two-handed performance."
    ];
  }
}

globalThis.CurveTouchContent = CurveTouchContent;
if (typeof module !== "undefined" && module.exports) module.exports = CurveTouchContent;