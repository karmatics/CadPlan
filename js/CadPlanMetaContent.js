class CadPlanMetaContent {
  static getMeta() {
    return {
      kicker: 'The Architecture of the Architecture',
      title: '0. The Living Dossier: CadPlan as the Master Specification',
      subtitle: 'Why this application is the specification: combining multi-granular agent prompts, interactive laboratories, vector compass components, and code references.'
    };
  }

  static manifest() {
        return [
          {
            section: 'master_showcase',
            partLabel: 'Chapter 0 • System Showcase',
            title: 'The Dual-Audience Master Living Specification Engine',
            blocks: [
              { id: 'comp_master_showcase', type: 'component', component: 'CadMasterShowcaseComponent' },
              { id: 'p_meta_dossier_1', type: 'p' },
              { id: 'p_meta_dossier_2', type: 'p' },
              { id: 'sidebar_unified_spec', type: 'sidebar', kicker: 'Methodology', title: 'Why The Whole Specification Is Delivered Together' }
            ]
          },
          {
            section: 'compass_vector',
            partLabel: 'Chapter 0 • Vector Instruments',
            title: 'The Squircle Compass (Vector Instrument)',
            blocks: [
              { id: 'comp_interactive_compass', type: 'component', component: 'SquircleCompassSvg' },
              { id: 'p_compass_desc_1', type: 'p' },
              { id: 'sidebar_svg_instrument', type: 'sidebar', kicker: 'Vector Graphics', title: 'Procedural Superellipses & Dynamic Viewport Badges' }
            ]
          },
          {
            section: 'runtime_matrix_section',
            partLabel: 'Chapter 0 • Execution Matrix',
            title: 'Execution Environment Matrix & Decoupled Tiers',
            blocks: [
              { id: 'comp_runtime_matrix', type: 'component', component: 'CadRuntimeMatrixGraphic' }
            ]
          },
          {
            section: 'asset_directory',
            partLabel: 'Chapter 0 • Repository Directory',
            title: 'Complete Local Repository & Prototype Topology',
            blocks: [
              { id: 'p_meta_assets_1', type: 'p' },
              { id: 'sidebar_local_asset_topology', type: 'sidebar', kicker: 'Filesystem Directory', title: 'Verified Local Codebases & Reference Repositories' },
              { id: 'sidebar_interview_protocol', type: 'sidebar', kicker: 'Agent Protocol', title: 'The Active Inventor-Interview Collaboration Mandate' }
            ]
          },
          {
            section: 'code_and_video',
            partLabel: 'Chapter 0 • Verification Assets',
            title: 'Verified Code Referencing & Rust Topology',
            blocks: [
              { id: 'comp_code_viewer', type: 'component', component: 'CadCodeViewerComponent' },
              { id: 'p_code_and_video_1', type: 'p' },
              { id: 'sidebar_agent_grounding', type: 'sidebar', kicker: 'Agent Alignment', title: 'Grounding Autonomous Agents with Exact Rust Code' }
            ]
          }
        ];
      }

  static p_meta_dossier_1() {
      return [
        "In traditional software engineering, architectural specifications are static PDF documents or wiki pages that quickly rot and diverge from actual code. When developers collaborate with large language models, this creates confusion: developers copy-paste fragmentary prompt instructions or snippets, leading to hallucinated geometric methods, Catmull-Rom approximations, or broken coordinate models.",
        "What makes `CadPlan` extraordinary is the **sheer sophistication of the product specification itself**. It is not a speculative wish list. It is an executable living blueprint that unifies a complete AutoCAD baseline with AccuDraw's 3D spatial superpowers, providing an immense, mathematically grounded payload that an AI can ingest and immediately construct without guesswork."
      ];
    }

  static p_meta_dossier_2() {
      return [
        "The core architectural vision is centered on **democratizing proven CAD tools through AI acceleration**:",
        "1. **The Expandable Dual-Mode Tool:** People have built AutoCAD clones, but nobody thought to build a new tool that does both: it seamlessly drops into classic AutoCAD mode if you want it to, but can instantly expand into this really smart AccuDraw spatial mode. Users adopt it with zero workflow shock, then discover single-keystroke 3D planes, squircle compasses, and on-curve splines.",
        "2. **AI as the Engine Builder:** This is not about speculative autonomous AI drafting—it is about **using AI to rebuild and synthesize a proven, multi-billion-dollar CAD tool and make it accessible to everyone**. A solo developer, equipped with domain experience and an exhaustive living specification, can now build what once took an army of graphics programmers decades to assemble.",
        "3. **Zero Token Fragmentation:** Because every class, mathematical audit, and interactive laboratory is self-contained in this dossier, an LLM receives 100% of the system context in one coherent payload, turning the specification itself into the ultimate engineering prompt."
      ];
    }

  static sidebar_unified_spec() {
      return [
        "Principles of the Master CadPlan Living Specification:\n" +
        "1. The Expandable Dual-Mode Tool:\n" +
        "   • Drops into 100% AutoCAD baseline mode for familiar 2D commands, prompts, and DXF/DWG compatibility.\n" +
        "   • Expands into AccuDraw/SmartLine 3D mode with kinetic compasses, on-curve relaxation, and single-stroke shortcuts.\n" +
        "2. AI Building the Tool for Everyone:\n" +
        "   • AI is the builder, breaking down the barrier to entry so a solo inventor can democratize enterprise CAD power.\n" +
        "   • Bypasses $10,000/seat legacy licensing to bring spatial drafting to students, hobbyists, and professionals worldwide.\n" +
        "3. Unrivaled Specification Sophistication:\n" +
        "   • Every mathematical equation (direction cosines, closest-point tangent arc swings, bulge factors) is explicitly solved.\n" +
        "   • Feeding this dossier into an LLM provides an immense, verifiable payload that enables rapid, error-free code generation."
      ];
    }
  static p_compass_desc_1() {
    return [
      "Above is our authentic vector AccuDraw compass rendered purely in procedural SVG. Notice how it captures the core visual language of the invention: the morphing squircle boundary (transitioning smoothly between a square in rectangular mode and a circle in polar mode), the primary red X-axis and green Y-axis tick cylinders, negative gray orientation indicators, and the 3-axis Mini-Jack cursor that marks where a constrained point will land."
    ];
  }

  static sidebar_svg_instrument() {
    return [
      "Vector Instrument Specifications (AccuDrawCompassSvg):\n" +
      "• Superellipse Blend: Interpolates corner sweep radii from sharp chamfers ($t=0.15$) to pure circular radii ($t=1.0$).\n" +
      "• Resolution Independent: Can be rendered as an inline prose icon, docked into viewport corners, or drawn at full screen resolution.\n" +
      "• Visual Feedback: White index indicator dashed lines and glow filters trigger when axes are locked."
    ];
  }

  static p_code_and_video_1() {
    return [
      "In the code explorer above, we examine CADCraft's pure-Rust coordinate filter architecture (`cadcraft-engine/src/pointmod.rs`). Historically, CAD systems handled axis locking via modal command-line prompt loops. By inspecting the actual Rust code and contrasting it with our JavaScript and WebGL implementations, coding agents can directly implement `compassdraw-core` in Rust without guessing at data structures or trait signatures."
    ];
  }

  static sidebar_agent_grounding() {
    return [
      "Agent Grounding Pipeline:\n" +
      "• Exact Rust Topology: AI models inspect CADCraft's `Frame`, `Mat4::ocs`, `PolyVertex`, and `CornerFit` directly.\n" +
      "• Zero Hallucinations: Mathematical formulas (analytic 3D bisectors, bulge factors, direction cosines) are fully written out.\n" +
      "• Video Grounding: Real-world demonstrations and benchmark recordings establish tangible behavioral ground truth."
    ];
  }

  static p_meta_assets_1() {
      return [
        "To ensure that fresh AI collaboration threads never guess or search blindly, CadPlan maintains a rigorous directory of all working applications, historical archives, cloned open-source repositories, and proprietary engines residing on the local workstation.",
        "Whether an AI coding agent is tasked with compiling pure-Rust crates, verifying patent milestones, inspecting original 1995 magazine renditions, or testing WebGL prototypes, every single source file has an unambiguous, verified path."
      ];
    }

  static sidebar_local_asset_topology() {
      return [
        "Verified Local Codebases & Prototype Paths:\n" +
        "1. CADCraft Pure-Rust Workspace (v0.7.0):\n" +
        "   • Path: `/Users/rob/bin/cadcraft_repo`\n" +
        "   • All 12 Crates: `cadcraft-geom`, `cadcraft-engine` (pointmod.rs, snap.rs, cmd/), `cadcraft-constraints` (lm.rs, dof.rs), `cadcraft-doc` (store.rs, entity.rs), `cadcraft-render` (wgpu), `cadcraft-mcp`, and `apps/cadcraft-web`.\n" +
        "2. Bentley Systems Production Reference:\n" +
        "   • Path: `/Users/rob/bin/itwin_reference/`\n" +
        "   • Production Source: `AccuDraw.ts` (3,862 lines), `AccuSnap.ts` (1,352 lines), `AccuDrawTool.ts`.\n" +
        "3. AccuDraw Historical Archive App:\n" +
        "   • Workspace App: `accudraw/`\n" +
        "   • Assets: US Patent #5,754,182, US #5,371,845, and verbatim 1995–1996 MicroStation Manager HTML magazine articles (`accudraw_page1.html` through `accudraw3d_page3.html`).\n" +
        "4. ValuationOfAccudraw App:\n" +
        "   • Workspace App: `ValuationOfAccudraw/`\n" +
        "   • Documentation: Cross-model consensus ($2.0B–$8.5B enterprise valuation contribution, 5,000x–10,000x payroll ROI) with live links to Claude, Gemini, and ChatGPT sessions.\n" +
        "5. accuCad Production 3D WebGL Workstation:\n" +
        "   • Workspace App: `accuCad/`\n" +
        "   • Classes: `AccuDrawLogic.js`, `Squircle3D.js`, `RoundingUtils3D.js`, `TentativePointHandler.js`, `ViewControls.js`, `DrawPathCommand.js`, `CameraOrbitAnimator.js`.\n" +
        "6. Authentic Curve Drawer Engine:\n" +
        "   • Path: `/Users/rob/source/recursi copy/web/DrawingApp/` & `CadPlan/js/curve/`\n" +
        "   • Classes: `CurveDraw.js`, `BezierVertex.js`, `UpdateControlPoints.js`.\n" +
        "7. TouchController Remote Interface:\n" +
        "   • Workspace App: `/TouchController/?room=...` with WebRTC P2P dual-trackpad modulation."
      ];
    }

  static sidebar_interview_protocol() {
      return [
        "The Active Inventor-Interview Protocol (Agent Collaboration Mandate):\n" +
        "1. Ground Truth from the Source: Rob Brown is the sole inventor of AccuDraw and SmartLine. On every prompt turn, the AI agent must ask exactly ONE penetrating, domain-specific interview question.\n" +
        "2. Never Speculate: Do not substitute generic CAD conventions, naive Catmull-Rom splines, or off-the-shelf bulge math without verifying Rob Brown's exact interaction mechanics.\n" +
        "3. Record Insights Permanently: Every answer provided by the inventor is integrated directly into the permanent specification chapters.\n" +
        "4. Hold to Account: If an interview question is bypassed, the AI agent must politely follow up and hold the inventor to the technical detail."
      ];
    }
}

globalThis.CadPlanMetaContent = CadPlanMetaContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlanMetaContent;