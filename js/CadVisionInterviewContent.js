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
          section: "roundtrip_superpower_top",
          partLabel: "Chapter 12 • The Plugin Superpower",
          title: "The 2D-to-3D Round-Trip: The Superpower Plugin Layer",
          blocks: [
            { id: "comp_roundtrip_superpower", type: "component", component: "Cad2Dto3DRoundTripGraphic" }
          ]
        },
        {
          section: "audience_migration_section",
          partLabel: "Chapter 12 • Strategic Leverage",
          title: "The Audience Capture & Vibe-Coding Flywheel",
          blocks: [
            { id: "comp_audience_migration", type: "component", component: "CadAudienceMigrationGraphic" }
          ]
        },
        {
          section: "vision_hero_top",
          partLabel: "Chapter 12 • The Strategic Horizon",
          title: "The Expandable Dual-Mode Tool Architecture",
          blocks: [
            { id: "comp_vision_hero", type: "component", component: "CadVisionHeroGraphic" }
          ]
        },
        {
          section: "strategy_vehicle",
          partLabel: "Chapter 12 • Strategy",
          title: "The Host Platform: CADCraft vs. Standalone Web",
          blocks: [
            { id: "p_interview_strategy_1", type: "p" },
            { id: "p_interview_strategy_2", type: "p" },
            { id: "sidebar_host_strategy", type: "sidebar", kicker: "Platform Strategy", title: "Zero-Fork Upstream Bridge vs. Independent Horizon" }
          ]
        },
        {
          section: "engine_tradeoffs",
          partLabel: "Chapter 12 • Rendering Stack",
          title: "Graphics Engine: Three.js PBR vs. Pure Rust wgpu",
          blocks: [
            { id: "p_interview_engine_1", type: "p" },
            { id: "p_interview_engine_2", type: "p" },
            { id: "sidebar_render_verdict", type: "sidebar", kicker: "Visual Fidelity", title: "Thick Line Antialiasing & PBR Material Strategy" }
          ]
        },
        {
          section: "smartline_evolution",
          partLabel: "Chapter 12 • Geometry & Continuity",
          title: "SmartLine 3D Evolution & Continuous Curvature",
          blocks: [
            { id: "p_interview_smartline_1", type: "p" },
            { id: "p_interview_smartline_2", type: "p" },
            { id: "sidebar_smartline_spec", type: "sidebar", kicker: "Geometric Continuity", title: "G1/G2 Tangency & Dynamic Corner Fillet Radii" }
          ]
        },
        {
          section: "workstation_ergonomics",
          partLabel: "Chapter 12 • Physical Ergonomics",
          title: "Two-Handed CAD & The Wireless TouchController",
          blocks: [
            { id: "p_interview_touch_1", type: "p" },
            { id: "p_interview_touch_2", type: "p" },
            { id: "sidebar_touch_ergonomics", type: "sidebar", kicker: "Ergonomics Blueprint", title: "Single-Stroke Key Home Row vs. Mobile Glass Surface" }
          ]
        },
        {
          section: "agentic_future",
          partLabel: "Chapter 12 • AI Collaboration",
          title: "Agentic AI Drafting & Model Context Protocol",
          blocks: [
            { id: "p_interview_agents_1", type: "p" },
            { id: "p_interview_agents_2", type: "p" },
            { id: "sidebar_agent_mcp", type: "sidebar", kicker: "Agent Protocol", title: "Relative Vector Constraint Navigation for LLMs" }
          ]
        },
        {
          section: "endgame_perspective",
          partLabel: "Chapter 12 • Industry Verdict",
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
        "I want to be completely clear about my positioning: I am not bringing another AutoCAD clone to market. Clones already exist, and people have done solid work building them. What I am creating is the **superpower plugin on top of existing tools** that makes them super powerful in 3D.",
        "As demonstrated in our interactive round-trip test bench above, a user can go straight from 2D AutoCAD drafting to this 3D spatial environment, construct with single-keystroke construction planes and on-curve relaxation, and then save it right back into standard 3D and 2D DXF/DWG format so that standard AutoCAD opens it seamlessly. People who already know AutoCAD can use this immediately without retraining. I don't need to know the intricacies of how AutoCAD works—the AI and open-source engines handle the AutoCAD syntax, while I supply the proprietary 3D spatial interaction engine."
      ];
    }
  static p_interview_strategy_2() {
      return [
        "Starting from an established AutoCAD foundation solves the biggest adoption problem in CAD: where do you get your users from? If you start completely from scratch with a foreign interface, user adoption is an uphill battle. But legacy CAD companies are terrified of losing their audience, and what I am doing is grabbing the audience that was already ready to leave anyway.",
        "Users are eager to escape $10,000/seat subscriptions, but they need familiarity. We give them a tool that drops into AutoCAD mode if they want it, but then we say: 'Hey, look at this stuff too: here is AccuDraw and SmartLine as an open-source giveaway from the original inventor.' That gives us immense power over legacy vendors because it's not just another clone—it's an evolutionary leap gifted freely by the person who created it.",
        "Furthermore, when you use modern 'vibe coding' backed by an exhaustive specification like CadPlan, the build velocity is staggering. Sure, a vibe-coded system might initially miss some obscure dialog box or legacy edge case that took a 100-person team twenty years to bloat into a desktop installer. But it gains an overwhelming amount of speed, openness, and capability because it's built cleanly on the web—and because vibe coding with a hyper-detailed specification like this actually works."
      ];
    }

  static sidebar_host_strategy() {
      return [
        "The Audience Capture & Vibe-Coding Strategy:\n" +
        "• Capture Fleeing Drafters: Grab the audience that was already looking to leave expensive $10k/seat subscriptions.\n" +
        "• Zero Workflow Shock: AutoCAD clone baseline gives users an immediate, comfortable landing pad.\n" +
        "• The Inventor's Gift: AccuDraw and SmartLine open-sourced freely by Rob Brown, creating immense leverage over legacy monopolies.\n" +
        "• The Vibe-Coding Advantage: Minor legacy edge cases are dwarfed by massive gains in speed, openness, and modern ergonomics, driven by an executable master specification."
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
        "Regarding the adoption roadmap: right now, the primary goal is **convincing the CAD world and open-source toolmakers that the hooks have to be put in**. I would love for the ArtCraft people (Brandon Thomas and the CADCraft community) to add these three lightweight hooks so this can be distributed as a drop-in plugin that unlocks 3D superpowers.",
        "As for whether this stays an independent companion project or becomes the official 3D engine for ArtCraft: I am open to whichever path works best for me. If Brandon and the ArtCraft team say 'yes, let's make this the official 3D spatial drafting engine of ArtCraft' and I get to just run with it—leading that spatial roadmap with full creative freedom—that would be an amazing partnership.",
        "And because this specification is so thorough, mathematically rigorous, and explicit, **this is the exact kind of project that a modern AI agent can implement overnight**. The agent writes the hook traits and event pump interception cleanly, and all it takes is a little testing to verify. Once those hooks exist, the floodgates open."
      ];
    }
  static p_interview_endgame_2() {
      return [
        "People often talk about CAD in terms of abstract mathematics—spline algorithms, transformation matrices, and boundary solvers. But I don't think of these as mathematical modules; I think of them as **human interactive instruments**. Precision isn't the primary thing to concentrate on, even though it was called AccuDraw. Obviously, you have to have precision—snapping to vertices, hard numbers, and locked axes are table stakes for any serious CAD tool.",
        "The real breakthrough is **giving the creator the freedom to hook the system together in whatever way works best for them**. Bentley Systems took AccuDraw and locked it inside their monolithic MicroStation executable for thirty years, freezing it in place. By deconstructing the compass, the two-handed phone surface, and the on-curve spline engine into composable interactive instruments, we give creators a flexible freedom that is fundamentally more powerful than anything Bentley has ever built."
      ];
    }

  static quote_interview_summary() {
      return [
        "I'm open to whichever path works best. But if this becomes the official 3D spatial drafting engine for ArtCraft and I get to just run with it—leading the spatial roadmap for a whole new generation—that would be amazing."
      ];
    }
}

globalThis.CadVisionInterviewContent = CadVisionInterviewContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadVisionInterviewContent;