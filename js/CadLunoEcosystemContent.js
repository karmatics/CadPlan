class CadLunoEcosystemContent {
  static getMeta() {
    return {
      kicker: 'Self-Replicating Blueprint Architecture',
      title: 'Luno Loop & Self-Replication',
      subtitle: 'The plan is the application: how CAD Plan self-replicates, tests its own geometry, and evolves through surgical LLM collaboration.'
    };
  }

  static manifest() {
      return [
        {
          section: 'self_rep',
          partLabel: 'Chapter 8 • Self-Replication',
          title: 'The Living, Self-Replicating Blueprint',
          blocks: [
            { id: 'comp_ecosystem_graphic', type: 'component', component: 'CadEcosystemGraphicComponent' },
            { id: 'p_self_rep_1', type: 'p' },
            { id: 'p_self_rep_2', type: 'p' },
            { id: 'sidebar_self_rep_philosophy', type: 'sidebar', kicker: 'Methodology', title: 'Why The Plan Is The Application' }
          ]
        },
        {
          section: 'luno_loop',
          partLabel: 'Chapter 8 • Workflow',
          title: 'Surgical Patching & Instant Iteration',
          blocks: [
            { id: 'p_luno_loop_1', type: 'p' },
            { id: 'p_luno_loop_2', type: 'p' },
            { id: 'sidebar_container_protocol', type: 'sidebar', kicker: 'Protocol Architecture', title: 'Surgical Method Patch Containers' },
            { id: 'p_luno_loop_3', type: 'p' }
          ]
        }
      ];
    }

  static p_self_rep_1() {
      return [
        "In traditional software engineering, developers build monolithic applications and write separate, static documentation that rots within months. In our architecture, **the document is the primary deliverable, not a secondary byproduct.**",
        "Notice how the application ecosystem is structured: we have decomposed the monolithic CAD suite into focused, testable **sub-applications** (`CompassApp`, `KeyCommandApp`, `TouchController`, and `accuCad`), unified by the shared `Library` hub. And `CadPlan` is the living master orchestrator that embeds, audits, and runs all of these instruments side-by-side in real time."
      ];
    }
  static p_self_rep_2() {
    return [
      "More importantly, it is built to self-replicate and improve itself using Luno. Because every section, demo, and paragraph is an independent static method in a JavaScript class, an LLM can inspect, refine, or add new capabilities with surgical precision. When you start a fresh conversation with an AI, you don't need to paste 600,000 tokens of chat history. You simply bundle `CadPlan`, and the AI immediately receives 100% of the project's history, philosophy, prototype audits, and live demos in a lean 25k-token payload."
    ];
  }

  static sidebar_self_rep_philosophy() {
      return [
        "The Decomposed Multi-App Topology:\n" +
        "1. `CompassApp` (`Luno/CompassApp/`):\n" +
        "   • Standalone 3D Squircle Studio isolating compass geometry and morphing.\n" +
        "2. `KeyCommandApp` (`Luno/KeyCommandApp/`):\n" +
        "   • Standalone Keystroke Engine testing single-stroke commands without Enter.\n" +
        "3. `TouchController` (`/TouchController/?room=...`):\n" +
        "   • Standalone Mobile WebRTC Glass Deck for two-handed analog parameter scrubbing.\n" +
        "4. `accuCad` (`accuCad/`):\n" +
        "   • The unified CAD workstation combining snapping, solids, curves, and tools.\n" +
        "5. `Library` (`Library/`):\n" +
        "   • Central shared dependency repository (`DomBasics`, `ThreeJSLoader`, `UITools`).\n" +
        "6. `CadPlan` (`CadPlan/`):\n" +
        "   • The Living Master Specification that embeds, tests, and documents every tool!"
      ];
    }
  static p_luno_loop_1() {
    return [
      "The engine driving this rapid evolution is Luno's copy-paste loop. Luno runs on a local Node.js server, stores projects in IndexedDB or direct disk files, and provides an isolated preview iframe where the application updates live."
    ];
  }

  static p_luno_loop_2() {
    return [
      "The workflow is simple: I copy a prompt or code bundle from Luno's Outbox, paste it to an LLM, copy the AI's response, and tap 'Paste from Chatbot' in Luno. Luno parses the response in browser client JavaScript using the HTML Container Protocol, extracting `<script data-file=\"...\" data-method=\"...\" data-action=\"patch\">` tags."
    ];
  }

  static sidebar_container_protocol() {
    return [
      "The HTML Container Protocol in Action:\n• Surgical Class Method Patches: Instead of re-streaming 50KB files, the LLM outputs only the modified method:\n  <script data-file=\"CadPlan/js/AccuCadAuditContent.js\" data-method=\"AccuCadAuditContent.p_audit_math_1\" data-action=\"patch\">\n  static p_audit_math_1() { /* complete updated method */ }\n  <\\/script>\n• Client-Side AST Merging: Luno's `LunoClassPatcher` parses the target file's AST using Acorn, splices the updated method into place, verifies syntax, and saves the file.\n• Instant Hot-Reload: The preview iframe reloads in milliseconds, allowing continuous real-time iteration."
    ];
  }

  static p_luno_loop_3() {
    return [
      "This workflow eliminates the token bloat and context fatigue that plague traditional AI programming. A single developer, equipped with domain experience and supported by an agentic AI partner through Luno, can build, audit, and evolve complex CAD software at unprecedented speed."
    ];
  }
}

globalThis.CadLunoEcosystemContent = CadLunoEcosystemContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadLunoEcosystemContent;