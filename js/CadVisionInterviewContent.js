class CadVisionInterviewContent {
  static getMeta() {
    return {
      kicker: "The Inventor's Agenda • Direct Interview",
      title: "11. Vision, Strategy & The Open CAD Horizon",
      subtitle: "Rob Brown's direct perspective on CADCraft integration, graphics engine tradeoffs, two-handed ergonomics, and autonomous agent drafting."
    };
  }

  static manifest() {
    return [
      {
        section: "strategy_vehicle",
        partLabel: "Chapter 11 • Strategy",
        title: "The Host Platform: CADCraft vs. Standalone Web",
        blocks: [
          { id: "p_interview_strategy_1", type: "p" },
          { id: "p_interview_strategy_2", type: "p" },
          { id: "sidebar_host_strategy", type: "sidebar", kicker: "Platform Strategy", title: "Zero-Fork Upstream Bridge vs. Independent Horizon" }
        ]
      },
      {
        section: "engine_tradeoffs",
        partLabel: "Chapter 11 • Rendering Stack",
        title: "Graphics Engine: Three.js PBR vs. Pure Rust wgpu",
        blocks: [
          { id: "p_interview_engine_1", type: "p" },
          { id: "p_interview_engine_2", type: "p" },
          { id: "sidebar_render_verdict", type: "sidebar", kicker: "Visual Fidelity", title: "Thick Line Antialiasing & PBR Material Strategy" }
        ]
      },
      {
        section: "smartline_evolution",
        partLabel: "Chapter 11 • Geometry & Continuity",
        title: "SmartLine 3D Evolution & Continuous Curvature",
        blocks: [
          { id: "p_interview_smartline_1", type: "p" },
          { id: "p_interview_smartline_2", type: "p" },
          { id: "sidebar_smartline_spec", type: "sidebar", kicker: "Geometric Continuity", title: "G1/G2 Tangency & Dynamic Corner Fillet Radii" }
        ]
      },
      {
        section: "workstation_ergonomics",
        partLabel: "Chapter 11 • Physical Ergonomics",
        title: "Two-Handed CAD & The Wireless TouchController",
        blocks: [
          { id: "p_interview_touch_1", type: "p" },
          { id: "p_interview_touch_2", type: "p" },
          { id: "sidebar_touch_ergonomics", type: "sidebar", kicker: "Ergonomics Blueprint", title: "Single-Stroke Key Home Row vs. Mobile Glass Surface" }
        ]
      },
      {
        section: "agentic_future",
        partLabel: "Chapter 11 • AI Collaboration",
        title: "Agentic AI Drafting & Model Context Protocol",
        blocks: [
          { id: "p_interview_agents_1", type: "p" },
          { id: "p_interview_agents_2", type: "p" },
          { id: "sidebar_agent_mcp", type: "sidebar", kicker: "Agent Protocol", title: "Relative Vector Constraint Navigation for LLMs" }
        ]
      },
      {
        section: "endgame_perspective",
        partLabel: "Chapter 11 • Industry Verdict",
        title: "The 30-Year Arc: From Exton to Open Source",
        blocks: [
          { id: "p_interview_endgame_1", type: "p" },
          { id: "p_interview_endgame_2", type: "p" },
          { id: "quote_interview_summary", type: "quote" }
        ]
      }
    ];
  }

  static p_interview_strategy_1() {
    return [
      "We are going to make this one unified product. It will be able to work in AccuDraw/MicroStation mode—or CompassDraw—or it can work just like AutoCAD. The goal is the best of both worlds: if someone only knows AutoCAD, they can fall back on working the AutoCAD way, and it won't be lesser than AutoCAD in any way. That gives us a solid, proven starting point."
    ];
  }

  static p_interview_strategy_2() {
    return [
      "Starting from an established AutoCAD foundation solves the biggest problem any new CAD system faces: where do you get your users from? If you start completely from scratch, user adoption is an uphill battle. By tapping into existing open tools that other people have built, users can adopt this immediately as a capable free tool, and then effortlessly discover AccuDraw and SmartLine capabilities on top. We will eventually bring in veterans who know both AutoCAD and MicroStation deeply to help refine that synthesis. AutoCAD currently operates primarily in 2D in these open tools, but as they expand into 3D, we will maintain parity and lead the way in 3D spatial alignment."
    ];
  }

  static sidebar_host_strategy() {
    return [
      "The Unified Fallback Architecture:\n" +
      "• Parity Baseline: 100% AutoCAD workflow parity—commands, prompts, DWG/DXF fidelity, and layer models.\n" +
      "• Zero-Risk Fallback: AutoCAD users never feel alienated; their muscle memory works immediately.\n" +
      "• Layered Superpower: CompassDraw and SmartLine activate seamlessly over the baseline without breaking AutoCAD semantics.\n" +
      "• Built-In Audience: Converts an existing global CAD user base rather than fighting to build one from zero."
    ];
  }

  static p_interview_engine_1() {
    return [
      "For the engine and presentation, we are going web-first with Three.js. For our hero demo, we will use our existing 3D primitives and GLB importer, but with a critical upgrade: adding tentative coordinate and normal snapping directly to loaded GLB meshes. Currently, imported GLB geometry does not support tentative point latching. By enabling raycasted vertex, edge, and surface-normal snapping on GLB models, users will be able to load any complex 3D assembly, snap the squircle compass onto any face, and draw precision geometry directly off it with realistic PBR materials, clearcoats, and studio lighting."
    ];
  }
  static p_interview_engine_2() {
    return [
      "At the same time, we will architect the system cleanly so it can bypass the browser and Three.js down the road if we want to run purely inside native Rust and wgpu. We don't have to build that native bypass first—we will focus on making the web experience extraordinary, while keeping the mathematical kernel modular so it integrates cleanly with native Rust builds whenever we are ready."
    ];
  }

  static sidebar_render_verdict() {
    return [
      "Graphics & Viewport Roadmap:\n" +
      "• Phase 1 (Web-First Shock & Awe): Three.js WebGL/WebGPU viewport with PBR physical materials, environment lighting, and Line2 antialiased wireframes.\n" +
      "• Presentation Standard: Studio-lit 3D assemblies that stand in sharp aesthetic contrast to legacy monochrome CAD.\n" +
      "• Phase 2 (Engine Decoupling): Pure mathematical kernel in Rust/Wasm capable of feeding either browser WebGL or native desktop wgpu vertex buffers."
    ];
  }

  static p_interview_smartline_1() {
    return [
      "A crucial rule for this project: do not get carried away trying to reinvent SmartLine or the curve drawer from high-level summaries. SmartLine is something I put an immense amount of thought and labor into at Bentley, and it is far more than standard polyline bulge math."
    ];
  }

  static p_interview_smartline_2() {
    return [
      "The authentic Curve Drawer lives in my DrawingApp codebase at `/Users/rob/source/recursi copy/web/DrawingApp/js/CurveDraw.js` and its dedicated `curve/` directory. It is not an off-the-shelf Catmull-Rom spline or generic polynomial fit. It is my proprietary iterative solver that calculates the exact control points and continuous tangencies while the user defines through-points directly along the curve. The result is fluid, natural, and gives the designer full interactive control without having to wrestle with clumsy off-curve Bezier handles. We will incorporate that exact architecture directly into our shared geometry layer."
    ];
  }

  static sidebar_smartline_spec() {
    return [
      "Authentic Curve Drawer Provenance:\n" +
      "• Source Location: `/Users/rob/source/recursi copy/web/DrawingApp/js/CurveDraw.js` & `curve/`\n" +
      "• Proprietary Iterative Engine: Derives exact Bezier control points and $G^1$/$G^2$ tangencies iteratively through on-curve user points.\n" +
      "• No Guesswork: Bypasses naive Catmull-Rom or generic polyline bulges in favor of Rob Brown's proven interactive curve solver."
    ];
  }

  static p_interview_touch_1() {
    return [
      "The TouchController is a central pillar of the public presentation. Being able to hold a phone in your left hand and fluidly scrub curve tension, line weights, or 3D camera depth while placing points with the mouse is a game-changing demonstration of two-handed CAD. While GitHub Pages is ideal for static hosting, we will set up a minimal-cost (or free serverless) signaling relay so pairing the phone takes a single QR code scan with zero manual IP setup."
    ];
  }

  static p_interview_touch_2() {
    return [
      "When you hold the phone in your left hand while your right hand holds the mouse, drafting becomes a continuous rhythmic dialogue. Your right hand has the fine motor precision of a pen: it snaps to vertices, aligns to axes, and clicks data points. Your left hand on the glass controls the continuous variables: with a thumb swipe you scrub curve tension, dial a corner fillet radius, or nudge the Z-elevation wheel. In traditional CAD, changing a parameter forces you to move your mouse away from the drawing, click an input field, type a number, and return to find where you were. With two hands operating concurrently, you dial the dimension as you're looking at the curve, and click the data point the exact split-second the shape looks right. You never look away from the model."
    ];
  }
  static sidebar_touch_ergonomics() {
    return [
      "TouchController & Low-Cost Infrastructure:\n" +
      "• Frictionless Pairing: Desktop viewport displays a dynamic QR code; phone camera scan opens the WebRTC trackpad instantly.\n" +
      "• Minimal Infrastructure Cost: Static frontend on GitHub Pages backed by a free Cloudflare Worker / tiny Node relay for WebRTC signaling and public user comments.\n" +
      "• Two-Handed Cadence: Right hand drives mouse snapping; left hand modulates continuous geometric tension and 3D camera rotation."
    ];
  }
  static p_interview_agents_1() {
    return [
      "Regarding autonomous agent drafting: Current LLMs struggle with absolute trigonometry. When an AI tries to generate CAD models using raw coordinates, tiny floating-point rounding errors create microscopic gaps at vertices, ruining manifold geometry and breaking 3D solids."
    ];
  }

  static p_interview_agents_2() {
    return [
      "With AccuDraw and the Model Context Protocol, the AI agent doesn't need to do fuzzy absolute coordinate math in its neural weights. Instead of prompting an LLM to calculate 'the coordinate of an arc tangent to point (12.435, 9.871) with a radius of 2.5,' the agent issues relative AccuDraw directives: origin_at(v1), lock_axis('X', 10.0), smartline_arc(radius=2.5, tangent=true). AccuDraw's spatial constraint engine does what it was born to do: it enforces exact millimeter tangencies and planar geometry deterministically. The AI provides high-level architectural intent and topology, while CompassDraw guarantees mathematical precision."
    ];
  }
  static sidebar_agent_mcp() {
    return [
      "Autonomous Agent Benefits:\n" +
      "• Eliminates Trigonometric Hallucinations: Agents issue relative displacement vectors rather than computing absolute coordinates.\n" +
      "• Perfect Snapping: The compass anchors the origin directly to reference vertices.\n" +
      "• Natural Language to Precision Geometry: Human intent converts cleanly into AccuDraw hints."
    ];
  }

  static p_interview_endgame_1() {
    return [
      "Regarding Bentley Systems and the industry horizon: my timeline is much tighter than 12 to 24 months—I want to get this software built, out in the open, and seen quickly. On a public level, I maintain a respectful diplomatic face toward Bentley Systems and Ray Bentley. Privately, my focus is entirely on moving forward with full creative independence rather than looking backward. I am not interested in cloning; other open-source developers have taken on the cloning work, and we are simply building on top of what is out there."
    ];
  }

  static p_interview_endgame_2() {
    return [
      "The core message I want people to take away is inspiration and openness. When I was a kid, I fell in love with drafting. Today, high school kids and young people are locked out of professional-grade drafting because legacy CAD vendors lock everything behind expensive subscription paywalls. That is wrong. Using the Luno environment and free LLMs, we can build professional spatial tools that anyone can play with and learn from for free. If this inspires other developers and makes spatial drafting accessible to the world without proprietary barriers, that is the real victory."
    ];
  }

  static quote_interview_summary() {
    return [
      "I was drafting when I was a kid, but today kids are locked out by expensive software. This shouldn't be a closed world. One unified tool, free access, and the freedom to create."
    ];
  }
}

globalThis.CadVisionInterviewContent = CadVisionInterviewContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadVisionInterviewContent;