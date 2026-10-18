class CadInteractiveDemoContent {
  static getMeta() {
    return {
      kicker: 'Production Component Inspection',
      title: '6. Production Components (AccuDraw & Continuous Curves)',
      subtitle: 'Inspecting our actual accuCad production classes: AccuDraw.js, Squircle3D.js, RoundingUtils3D.js, and DrawPathCommand.js.'
    };
  }

  static manifest() {
      return [
        {
          section: 'interactive_studio',
          partLabel: 'Chapter 7 • Interactive Studio Laboratory',
          title: 'Live 3D Viewport: CompassDraw & On-Curve Splines',
          blocks: [
            { id: 'comp_cad_studio_demo', type: 'component', component: 'CadStudioDemoComponent' },
            { id: 'p_real_accudraw_1', type: 'p' },
            { id: 'sidebar_real_accudraw_math', type: 'sidebar', kicker: 'accuCad Classes', title: 'AccuDraw.js & Squircle3D.js Internals' }
          ]
        },
        {
          section: 'model_studio_section',
          partLabel: 'Chapter 7 • Inspection Deck',
          title: '3D Model Studio: PBR Materials & AccuDraw Dimensions',
          blocks: [
            { id: 'comp_model_studio', type: 'component', component: 'CadModelStudioComponent' }
          ]
        },
        {
          section: 'curve_real',
          partLabel: 'Chapter 7 • Continuous Mathematics',
          title: 'Iterative G1 Relaxation Solver & On-Curve Math',
          blocks: [
            { id: 'p_real_curve_1', type: 'p' },
            { id: 'p_real_curve_2', type: 'p' },
            { id: 'sidebar_real_curve_math', type: 'sidebar', kicker: 'accuCad Classes', title: 'RoundingUtils3D & UpdateControlPoints Internals' }
          ]
        }
      ];
    }
  static p_real_accudraw_1() {
    return [
      "Rather than running an isolated, simplified toy mock-up, our studio laboratory directly runs the authentic production engine from `accuCad`. The live viewport above embeds the actual `accuCad` environment: its full direction-cosine matrix basis (`BaseController.js`), dynamic coordinate constraint engine (`AccuDrawLogic.js`), animated squircle compass (`Squircle3D.js`), side panel tool settings, and the complete single-stroke keyboard command dispatch tree (`T`, `F`, `S`, `L`, `Space`, `O`)."
    ];
  }

  static p_real_accudraw_2() {
    return [
      "A fundamental distinction in our graphics engine is the difference between turntable rotation and **motion parallax oscillation**. Turntable rotation is a display gimmick that spins the object away from the draftsman, destroying spatial drafting context. In our engine (implemented in `CameraOrbitAnimator.js`), true oscillation wiggles the eye position in a small disk (3–5% of the viewing distance) strictly perpendicular to the current line of sight. The user controls the general direction they are looking from, and the subtle parallax oscillation lets the human visual cortex perceive genuine 3D spatial depth through natural motion parallax without stereoscopic glasses."
    ];
  }

  static sidebar_real_accudraw_math() {
    return [
      "Parallax Oscillation vs. Turntable Rotation:\n" +
      "• Line of Sight Vector: `D = CamPos - TargetPos` with unit normal `N = D / ||D||`.\n" +
      "• Perpendicular Basis: Derives tangent `U` and bitangent `V` orthonormal to `N`.\n" +
      "• Motion Parallax Offset: `Offset = U * cos(θ) * R + V * sin(θ) * R` where `R = ||D|| * 0.045`.\n" +
      "• Cognitive Benefit: Maintains the user's selected viewing perspective while continuously revealing 3D spatial relationships via monocular depth cues."
    ];
  }
  static p_real_curve_1() {
    return [
      "For curve and line drafting, our architecture eliminates traditional Bezier tangent handles through `DrawPathCommand.js` and `RoundingUtils3D.js`. When a user clicks points, they place anchors strictly *on the curve itself*. Each vertex carries an optional dynamic radius property (`v.radius`), allowing sharp polylines to be rounded into true circular arcs on the fly."
    ];
  }

  static p_real_curve_2() {
    return [
      "In the Dynamic On-Curve Spline Lab tab, the curve does not calculate blindly on point commits alone. As the draftsman moves the cursor, the spline rubber-bands dynamically at 60 FPS, with `UpdateControlPoints.run` continuously deriving G1 tangent vectors through the floating candidate point. When you adjust the Curvature (tension) or Balance (tangency weighting) sliders, the entire spline morphs smoothly in real time without manual handle wrestling, matching the authentic behavior of Rob Brown's `DrawingApp`."
    ];
  }
  static sidebar_real_curve_math() {
    return [
      "Production Curve Engine in CadPlan:\n" +
      "• `BezierVertex.js`: Stores on-curve through-points, control points [CP0, CP1], curvature, and balance.\n" +
      "• `UpdateControlPoints.js`: 8-iteration relaxation solver deriving exact cubic Bezier tangents and arc fractions.\n" +
      "• `RoundingUtils3D.js`: Closed-form 3D vector bisector math for sharp corner fillets.\n" +
      "• `DrawPathCommand.js`: Continuous line chaining, auto-close snapping, and dynamic preview geometry."
    ];
  }
}

globalThis.CadInteractiveDemoContent = CadInteractiveDemoContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadInteractiveDemoContent;