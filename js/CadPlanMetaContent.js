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
          section: 'tech_showcase_philosophy',
          partLabel: 'Chapter 0 • Core Philosophy',
          title: 'The Living Document as the Ultimate Technology Showcase',
          blocks: [
            { id: 'p_showcase_philosophy_1', type: 'p' },
            { id: 'p_showcase_philosophy_2', type: 'p' },
            { id: 'sidebar_showcase_vision', type: 'sidebar', kicker: 'Showcase Architecture', title: 'Showcasing the Full Suite: Luno, Aardvark, ColorPicker, & AccuDraw' }
          ]
        },
        {
          section: 'living_spec_paradigm',
          partLabel: 'Chapter 0 • Next-Gen AI Workflow',
          title: 'Rethinking Prompt Engineering: The Living Specification Loop',
          blocks: [
            { id: 'p_living_spec_paradigm_1', type: 'p' },
            { id: 'p_html_roadmap_1', type: 'p' },
            { id: 'sidebar_living_prompt_loop', type: 'sidebar', kicker: 'AI Methodology', title: 'The Human-in-the-Loop Living Specification Cycle' }
          ]
        },
        {
          section: 'inverted_luno_architecture',
          partLabel: 'Chapter 0 • Workspace Inversion',
          title: 'Inverted Luno Integration: In-Process Panel & Zero-Iframe Mandate',
          blocks: [
            { id: 'p_inverted_luno_1', type: 'p' },
            { id: 'sidebar_zero_iframe_mandate', type: 'sidebar', kicker: 'Container Inversion', title: 'The Zero-Iframe Mandate & In-Process Cockpit Drawer' }
          ]
        },
        {
          section: 'anti_redundancy_mandate',
          partLabel: 'Chapter 0 • Architectural Law',
          title: 'The Anti-Redundancy Mandate: Single Source of Truth & Modular Instruments',
          blocks: [
            { id: 'p_anti_redundancy_1', type: 'p' },
            { id: 'p_anti_redundancy_2', type: 'p' },
            { id: 'sidebar_anti_redundancy_mandate', type: 'sidebar', kicker: 'Engineering Invariant', title: 'The Anti-Redundancy & Reusability Mandate' }
          ]
        },
        {
          section: 'html_protocol_roadmap',
          partLabel: 'Chapter 0 • Dossier Architecture',
          title: 'The 5-Step HTML & In-Situ Aardvark Evolution Roadmap',
          blocks: [
            { id: 'sidebar_5_step_roadmap', type: 'sidebar', kicker: 'System Blueprint', title: 'The 5-Step Master Roadmap' },
            { id: 'p_html_roadmap_2', type: 'p' },
            { id: 'sidebar_data_attribute_registry', type: 'sidebar', kicker: 'Shallow Scan Math', title: 'Level-by-Level Data-Attribute Registry' }
          ]
        },
        {
          section: 'meta_self_upgrade',
          partLabel: 'Chapter 0 • Self-Upgrading Dossier',
          title: 'Self-Upgrading Engine: Luno HTML Protocol & Cross-Project Migration',
          blocks: [
            { id: 'p_meta_self_upgrade_1', type: 'p' },
            { id: 'p_meta_self_upgrade_2', type: 'p' },
            { id: 'sidebar_self_upgrade_spec', type: 'sidebar', kicker: 'Engine Blueprint', title: 'Luno HTML Protocol & Server Runner Directives' },
            { id: 'sidebar_aardvark_smart_hud', type: 'sidebar', kicker: 'Aardvark Integration', title: 'Smart Element Cyan Detection & Key Coexistence' }
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
        "To ensure seamless continuity across collaboration threads, CadPlan maintains a complete directory of all working applications, historical archives, cloned open-source repositories, and proprietary engines residing on the local workstation.",
        "**MANDATE FOR FUTURE AI THREADS:** When inspecting code from these reference repositories or requesting workspace files, **always request full files rather than small fragments or snippets**. Full files eliminate truncation errors, provide complete class context, and ensure that mathematical invariants, event handlers, and data structures are understood in their entirety."
      ];
    }

  static sidebar_local_asset_topology() {
      return [
        "Verified Workstation File & Repository Directory:\n" +
        "• 1. Authentic Aardvark Reference Implementation:\n" +
        "   - Path: `AardvarkExtension/` & `aardvarkBookmarklet/`\n" +
        "   - Key Files: `AardvarkExtension/features/Aardvark.js`, `AardvarkOverlay.js`, `AardvarkActions.js`, `AardvarkRadialMenu.js`.\n" +
        "   - Note: Contains the original key-in feedback, red outline, yellow label tags, and animations to restore.\n" +
        "• 2. CADCraft Pure-Rust Workspace (v0.7.0):\n" +
        "   - Path: `/Users/rob/bin/cadcraft_repo`\n" +
        "   - Key Crates: `cadcraft-geom` (mat.rs, fillet.rs), `cadcraft-engine` (pointmod.rs, snap.rs, cmd/), `cadcraft-doc` (store.rs, entity.rs), `cadcraft-render` (wgpu), `cadcraft-mcp`, and `apps/cadcraft-web`.\n" +
        "• 3. Bentley Systems Production Reference:\n" +
        "   - Path: `/Users/rob/bin/itwin_reference/`\n" +
        "   - Source: `AccuDraw.ts` (3,862 lines), `AccuSnap.ts` (1,352 lines), `AccuDrawTool.ts`.\n" +
        "• 4. Authentic CurveDrawer Engine:\n" +
        "   - Path: `/Users/rob/source/recursi copy/web/DrawingApp/` & `CadPlan/js/curve/`\n" +
        "   - Key Files: `js/CurveDraw.js`, `js/curve/BezierVertex.js`, `js/curve/UpdateControlPoints.js`.\n" +
        "• 5. accuCad Production 3D WebGL Workstation:\n" +
        "   - Path: `accuCad/`\n" +
        "   - Key Files: `Main.js`, `BaseController.js`, `AccuDraw.js`, `accudraw/AccuDrawLogic.js`, `EventHandlers.js`, `SmartDrawKeys.js`, `TentativePointHandler.js`, `RoundingUtils3D.js`.\n" +
        "• 6. TouchController Remote Companion:\n" +
        "   - Path: `TouchController/`\n" +
        "   - Key Files: `js/TouchController.js`, `signal-server.js`.\n" +
        "• 7. Luno Cockpit Core & Class Patcher:\n" +
        "   - Path: `Luno/`\n" +
        "   - Key Files: `app/ClientApp.js`, `app/ClientAppUI.js`, `app/ClientAppPaster.js`, `app/OutboxQueue.js`, `app/LunoManifestDecisionEngine.js`, `core/LunoClassPatcher.js`.\n" +
        "• 8. Shared Library Hub:\n" +
        "   - Path: `Library/`\n" +
        "   - Key Files: `DomBasics.js`, `UITools.js`, `ThreeJSLoader.js`, `DocumentReader.js`, `DictationWidget.js`, `ColorPicker.js`, `SliderControl.js`."
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

  static p_html_roadmap_1() {
      return [
        "The next major milestone is **Deep Luno Interconnection with Universal Free-Form Comments**. Instead of keeping document notes isolated in local dialogs, any comment, sketch, or voice directive attached to any paragraph, diagram, or canvas will push directly into Luno's Outbox.",
        "Luno will act as an in-process continuous development engine: the human author tours the living specification, attaches free-form thoughts anywhere across the DOM, and with one tap dispatches an aggregated prompt bundle to the AI. The AI streams back surgical class method and HTML template patches, and Luno compiles them straight into local files in real time."
      ];
    }
  static p_html_roadmap_2() {
      return [
        "Instead of cluttering the document with in-situ edit buttons beside every single paragraph, we have integrated **Aardvark** directly into CadPlan. By tapping **🔍 Aardvark Note Picker** in the header (or hitting `Ctrl+Shift+A`), you enter live spatial inspection mode: hover over any sentence, diagram, or canvas, use `W` (Wider) or `N` (Narrower) to traverse the exact DOM branch, and hit `M` to append a voice or written directive to that exact block.",
        "Furthermore, converting existing chapters from JavaScript string methods into clean HTML templates **does not require an LLM**. Using `CadPlanContentConverter.convertAllChaptersToStorage()`, you can execute an automated, zero-token in-browser reflection that exports every section into clean, unescaped HTML files on disk."
      ];
    }

  static sidebar_5_step_roadmap() {
      return [
        "Master Roadmap for Upcoming Threads:\n" +
        "• 1. Deep Luno Interconnection:\n" +
        "   - Native cockpit drawer (no nested iframes).\n" +
        "   - Free-form comments anywhere in the DOM compiled directly into Luno Outbox.\n" +
        "   - Closed-loop AI iteration: Notes -> Outbox -> LLM Surgical Patches -> Direct Disk Saves.\n" +
        "• 2. Authentic Aardvark Legacy Restoration:\n" +
        "   - Restore original key-in feedback, animations, red outline, and yellow label tag from `AardvarkExtension/`.\n" +
        "   - Element locking: Selecting an element freezes hover and gives the dialog exclusive focus.\n" +
        "   - Non-crossing outer corner boundary lines connecting element to dialog behind the window.\n" +
        "   - Persistent blue/cyan border on any element with active comments until resolved.\n" +
        "• 3. Multi-Instance Native accuCad (No Iframes):\n" +
        "   - Multiple native `accuCad` instances running concurrently across chapters.\n" +
        "   - Centralized keyboard router: only the active, on-screen canvas receives single-stroke CAD keys.\n" +
        "   - Automatic suspension of off-screen render loops via IntersectionObserver.\n" +
        "• 4. Decoupled Tool Dialogs:\n" +
        "   - Canvases can be placed in one location and tool settings/dialogs docked elsewhere in the layout.\n" +
        "• 5. File Request Protocol:\n" +
        "   - Always request full files when reading reference repositories to guarantee complete context."
      ];
    }
  static sidebar_data_attribute_registry() {
      return [
        "Shallow-Preference Data-Attribute Registry:\n" +
        "• Bounded Breadth-First Search: Inspects root children before descending deeper, pruning UI overlays and dialogs.\n" +
        "• Attribute Hierarchy: Resolves data-block -> data-section -> data-page -> data-visibility.\n" +
        "• In-Memory Index Caching: Caches resolved element references for zero-overhead repeat lookups.\n" +
        "• Universal Compatibility: Works seamlessly across pure HTML files, SVG stages, and DocumentReader chapters."
      ];
    }

  static p_meta_self_upgrade_1() {
      return [
        "A distinguishing trait of CadPlan is that the specification is genuinely meta: **it documents how it upgrades itself, and how its architecture upgrades other projects across the workspace** (such as situation, EconomicsOfAutomation, and accudraw). Instead of maintaining separate script utilities or disparate wiki documents, the dossier embeds the exact algorithms and container protocols needed to evolve the software.",
        "By extending Luno's core HTML container protocol, content blocks can now be patched using the exact same declarative syntax used for ES6 JavaScript methods. An LLM emits `<template data-file=\"CadPlan/content/origins.html\" data-block=\"p_rob_intro_1\" data-action=\"patch\">`, and Luno's `LunoClassPatcher.patchHtmlInSource` splices the target block in place without requiring JavaScript string escaping or full-file rewrites."
      ];
    }

  static p_meta_self_upgrade_2() {
      return [
        "Crucially, **migrating existing projects does not require burning LLM tokens**. The automated reflection engine (`CadPlanContentConverter.js`) inspects any content class, reads its manifests, and formats the output into clean, semantically nested HTML templates. Furthermore, using Luno's privileged server runner container (`<script data-file=\"RUN: SERVER\" data-action=\"run-server\">`), the system can initialize directories, verify file trees, and batch-migrate entire sibling projects in milliseconds.",
        "When the browser client or server executes an incoming payload, it dispatches structured feedback back to the LLM (reporting target blocks, mode of application, and verification metrics), guaranteeing that human and AI collaborators remain in lockstep."
      ];
    }

  static sidebar_self_upgrade_spec() {
      return [
        "Self-Upgrading Dossier & HTML Protocol Spec:\n" +
        "• HTML Container Syntax:\n" +
        "  <template data-file=\"Project/content/page.html\" data-block=\"block_id\" data-action=\"patch\">\n" +
        "    <p data-block=\"block_id\">Updated unescaped prose...</p>\n" +
        "  </template>\n" +
        "• Zero-Token In-Browser Conversion:\n" +
        "  - CadPlanContentConverter.runSelfUpgrade('ProjectName') translates existing string methods into clean HTML files.\n" +
        "• Privileged Server Execution:\n" +
        "  - <script data-file=\"RUN: SERVER\" data-action=\"run-server\"> creates content directories and writes files directly in Node.js.\n" +
        "• Closed-Loop Telemetry:\n" +
        "  - Client browser returns exact status (e.g. 'direct-html-apply', 'patchlog-journal') for prompt verification."
      ];
    }

  static sidebar_aardvark_smart_hud() {
      return [
        "Aardvark Smart Element & Coexistence Engine:\n" +
        "• Keyboard Coexistence: Pauses KeyCommandHandler upon activation so W/N/M/E/T keys never fire background CAD commands.\n" +
        "• Smart Element Cyan HUD: Elements with data-block or data-component glow cyan (#00f2fe) with a [SMART BLOCK] badge.\n" +
        "• Traversal Stack: W (Wider: parent container) and N (Narrower: child node) with traversal history preservation.\n" +
        "• Zero-Fluff UI: Removes inline clutter from paragraphs; editing ([E]), noting ([M]), and patch generation ([T]) are accessed ambiently through Aardvark."
      ];
    }

  static p_anti_redundancy_1() {
      return [
        "A core architectural invariant of this codebase is **absolute non-redundancy**. In many software projects, developers create simplified mock-ups or duplicate parallel versions of core algorithms for individual demos—such as writing an ad-hoc 3D compass in a demo component that reorients on `Q` using fabricated math, rather than running the authentic AccuDraw compass from `accuCad`. This is strictly forbidden.",
        "There is only one authentic `accuCad`. Rather than spawning duplicate implementations, our architecture requires that every demonstration, lab, and viewport draws directly from the exact same modular source files (`SquircleArc.js`, `AccuDrawLogic.js`, `RoundingUtils3D.js`, `KeyCommandHandler.js`). If a component needs to show a specialized subset—such as an isolated view of the compass or an on-curve spline—it must configure and render that subset using the original production classes."
      ];
    }

  static p_anti_redundancy_2() {
      return [
        "This modular reusability extends across the entire ecosystem. Components such as `ColorPicker.js` (with its RYB hue ring and barycentric tint/shade triangle) and `SliderControl.js` (with direct numerical entry and inertia wheels) are used inside `accuCad`, but they are built as **general-purpose instruments**.",
        "Because they are modular, we can instantiate and test them independently anywhere on the web, embed them throughout documentation chapters, and wire them directly to our low-latency mobile `TouchController` trackpad deck over local Wi-Fi. Every tool stands on its own, shares the single source of truth, and eliminates duplicate code maintenance."
      ];
    }

  static sidebar_anti_redundancy_mandate() {
      return [
        "The Anti-Redundancy & Reusability Mandate:\n" +
        "1. Single Source of Truth:\n" +
        "   • Never create duplicate or mock versions of core CAD math (SquircleArc, AccuDraw, RoundingUtils3D).\n" +
        "   • Every lab or demonstration mounts the authentic modular class with tailored options rather than reimplementing behavior.\n" +
        "2. Modular Component Hierarchy:\n" +
        "   • Instruments like ColorPicker and SliderControl are general-purpose building blocks shared across CAD, UI, and mobile touch surfaces.\n" +
        "   • Viewports can isolate a specific subsystem (e.g. 3D compass orientation without mesh clutter) while maintaining 100% mathematical fidelity.\n" +
        "3. True Outbox Integration:\n" +
        "   • Actions labeled 'Send to Outbox' communicate directly with Luno's OutboxQueue across iframes and windows rather than simply dumping text to the clipboard."
      ];
    }

  static p_showcase_philosophy_1() {
      return [
        "A core tenet of my engineering philosophy is that **this document must aggressively showcase as much of our technology as humanly possible**. When engineers write specifications, they typically produce passive text, static diagrams, and dry API tables. That is fundamentally obsolete.",
        "Because we have absolute ownership and control over the codebase and the presentation layer, the document itself is a live, high-fidelity gallery of our entire technological stack: **Luno Workspace, Aardvark, the ColorPicker, the CurveDrawer, and CAD spatial engines—including AccuDraw and SmartLine—running concurrently in both procedural SVG and hardware-accelerated Three.js WebGL**."
      ];
    }

  static p_showcase_philosophy_2() {
      return [
        "Rather than burdening every chapter with the full, heavy `accuCad` workstation, our architecture creates **focused, interactive sub-views that showcase specific subsets of capability**:",
        "1. **The Animated Compass Choreography:** A dedicated viewport where the compass is wired to an automated animation loop—demonstrating single-stroke 3D plane rotations (Top, Front, Side), polar-to-rectangular superellipse morphing, and axis-locking pulses without distracting drawing geometry.",
        "2. **The Deconstructed Squircle Laboratory:** An interactive view derived from our standalone Squircle app that draws the radial projection lines to the centers of all 8 circular arcs, highlighting the exact tangency junction dots. This is not built into `accuCad`'s core production loop, but it is built into the document so anyone can intuitively understand the math behind the squircle.",
        "3. **Extensible Custom Cursor Showcase:** A playful, pluggable demonstration that replaces the standard AccuDraw reticle with an intricate steampunk brass mechanical indicator. This proves to developers that our cursor HUD is an open, extensible plugin layer that can be customized for any domain.",
        "Throughout the entire document, code is continuously exposed on the page with syntax highlighting, and live interactive widgets respond to user input, demonstrating an unprecedented level of specification craftsmanship."
      ];
    }

  static sidebar_showcase_vision() {
      return [
        "Showcasing the Full Technological Suite:\n" +
        "• 1. Luno: Browser-based AST method patching, outbox queuing, and local git checkpoints.\n" +
        "• 2. Aardvark: Universal element inspection, electric blue semantic recognition, and in-situ commenting.\n" +
        "• 3. ColorPicker: RYB hue ring and barycentric tint/shade triangle controlling live 3D PBR materials.\n" +
        "• 4. SliderControl: Continuous variable scrubbing with direct numerical valuation popups and MIDI-CC mapping.\n" +
        "• 5. CurveDrawer: On-curve G1 through-point relaxation and low-pass kinetic string dragging.\n" +
        "• 6. AccuDraw & SmartLine: 3D direction cosines, closest-point tangent arc swings, and universal DXF bulge factors."
      ];
    }

  static p_living_spec_paradigm_1() {
      return [
        "This architecture fundamentally **rethinks the entire concept of prompt engineering**. Traditional prompt engineering is a brittle exercise in writing repetitive chat prompts, hoping an LLM understands your architecture from memory. Our approach is vastly superior: **the running application IS the prompt, and the prompt IS the running application**.",
        "In this paradigm, the human author interacts directly with the live document. You read the technical text, test the interactive laboratories, and use Aardvark to attach living directives and voice notes directly to specific paragraphs, canvas stages, or DOM elements. The system packages the entire state—including exact DOM XPath locators, code contexts, and author ideas—into an immense, mathematically grounded prompt bundle.",
        "The LLM's role is not to write code blindly from a blank slate. Its mission is to **enter the specification loop with the human inventor**, re-architecting and refining the specification itself before writing production code. The specification contains rich English prose, exact mathematical derivations, interactive component mounts, and full codebase references, creating a human-in-the-loop workflow that is orders of magnitude more sophisticated than anything in modern software engineering."
      ];
    }

  static sidebar_living_prompt_loop() {
      return [
        "The Human-in-the-Loop Living Specification Cycle:\n" +
        "1. Interactive Review: The inventor reads the technical dossier and tests live interactive viewports.\n" +
        "2. Universal Annotation: Aardvark pins directives directly to specific paragraphs, diagrams, or DOM nodes.\n" +
        "3. Automated Outbox Compilation: CadPlan compiles all notes, XPaths, and code contexts into a single payload.\n" +
        "4. AI Spec Refinement: The LLM refines the architectural specification, resolving edge cases and updating chapters.\n" +
        "5. Client-Side Splicing: Luno merges surgical class method and HTML template patches with zero token waste."
      ];
    }

  static p_inverted_luno_1() {
      return [
        "To maximize performance and developer flow, we are inverting the relationship between Luno and the documentation: **instead of embedding CadPlan inside an iframe within Luno, CadPlan embeds Luno natively**.",
        "Within CadPlan, there are no nested iframes. All 3D viewports, SVG laboratories, and documentation sections run in-process within the same DOM and WebGL memory context. When you want to inspect Luno, queue outbox payloads, or review git checkpoints, you tap a dedicated **`🌙 Luno`** cockpit button in the header. Luno slides open as an in-process control drawer directly in the active window. You maintain a unified workspace on desktop without window juggling, while mobile phone companion surfaces remain cleanly decoupled over WebRTC."
      ];
    }

  static sidebar_zero_iframe_mandate() {
      return [
        "The Zero-Iframe Mandate & In-Process Cockpit Drawer:\n" +
        "• 1. In-Process Execution: Eliminates all iframes inside CadPlan; 3D viewports and DOM share single-thread V8 heap.\n" +
        "• 2. Native Luno Cockpit Drawer: Tapping '🌙 Luno' in the header slides out the Luno control deck as a native UI drawer.\n" +
        "• 3. Zero-Latency Communication: Direct method calls between CadPlan and OutboxQueue with zero postMessage serialization.\n" +
        "• 4. Decoupled Mobile Companion: Desktop workspace remains consolidated, while smartphone trackpads connect over low-latency WebRTC."
      ];
    }
}

globalThis.CadPlanMetaContent = CadPlanMetaContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlanMetaContent;