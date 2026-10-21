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
          },
          {
            section: 'genetic_recombination',
            partLabel: 'Chapter 8 • Evolutionary Computing',
            title: 'The Genetic Mutation & Cross-Thread Recombination Protocol',
            blocks: [
              { id: 'p_mutation_1', type: 'p' },
              { id: 'sidebar_genetic_recombination', type: 'sidebar', kicker: 'Evolutionary Loop', title: 'Fork, Mutate, and Recombine via LLM Context' },
              { id: 'p_mutation_2', type: 'p' }
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

  static p_mutation_1() {
      return [
        "Here is where this software architecture enters a truly revolutionary frontier: **the document itself can copy itself, mutate inside an AI conversation, and recombine seamlessly with other mutated copies.**",
        "In traditional development, collaborating across experimental branches requires complex Git merges, resolving conflicting lines of code, and risking broken builds. With CadPlan and Luno, software evolution mirrors biological reproduction. Because the living specification is composed of modular, addressable components—each paragraph, mathematical calculator, and Three.js viewport being an isolated method or template block—you can copy the whole organism into an LLM, instruct the model to explore a mutation (such as inventing a new clockwork steampunk compass reticle or optimizing ray-curve snapping), and test that mutated branch independently."
      ];
    }

  static p_mutation_2() {
      return [
        "When you are ready to bring those experimental threads together, you don't fight merge tools. You simply take the surgical container outputs from both threads, paste them into a large context window, and say: *'Merge these two capabilities into one unified system.'*",
        "The LLM evaluates the AST differences, verifies that neither mutation breaks the core direction-cosine or snapping invariants, and produces a single, reconciled patch bundle. With one click of 'Paste from Chatbot', Luno splices the unified genetic code into the live files in browser memory, and the evolved application boots instantly without reload friction."
      ];
    }

  static sidebar_genetic_recombination() {
      return [
        "The Genetic Recombination Protocol for Living Software:\n" +
        "• 1. Living State Extraction: The author captures the active organism (code, DOM XPaths, user directives) in a lean Outbox payload.\n" +
        "• 2. Divergent Mutation: Fork the payload across parallel AI chats (e.g., Thread A builds Rust Wasm bindings, Thread B invents two-handed mobile gestures).\n" +
        "• 3. Granular AST Containerization: Each thread outputs isolated patches using the HTML container protocol (<script data-method=\"...\">).\n" +
        "• 4. Recombination Synthesis: Feed both patch logs into an LLM context to synthesize a conflict-free hybrid.\n" +
        "• 5. Instant In-Situ Compilation: Luno splices the reconciled methods into the runtime heap—completing the evolutionary loop!"
      ];
    }
}

globalThis.CadLunoEcosystemContent = CadLunoEcosystemContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadLunoEcosystemContent;