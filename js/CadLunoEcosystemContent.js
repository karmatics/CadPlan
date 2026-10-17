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
        partLabel: 'Chapter 7 • Self-Replication',
        title: 'The Living, Self-Replicating Blueprint',
        blocks: [
          { id: 'p_self_rep_1', type: 'p' },
          { id: 'p_self_rep_2', type: 'p' },
          { id: 'sidebar_self_rep_philosophy', type: 'sidebar', kicker: 'Methodology', title: 'Why The Plan Is The Application' }
        ]
      },
      {
        section: 'luno_loop',
        partLabel: 'Chapter 7 • Workflow',
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
      "This application—CAD Plan—has a unique dual nature. It is both a comprehensive architectural specification and a functioning software laboratory. It doesn't describe AccuDraw in abstract terms; it runs the math in live interactive components. It doesn't theorize about curve fitting; it renders the curves on the screen."
    ];
  }

  static p_self_rep_2() {
    return [
      "More importantly, it is built to self-replicate and improve itself using Luno. Because every section, demo, and paragraph is an independent static method in a JavaScript class, an LLM can inspect, refine, or add new capabilities with surgical precision. When you start a fresh conversation with an AI, you don't need to paste 600,000 tokens of chat history. You simply bundle `CadPlan`, and the AI immediately receives 100% of the project's history, philosophy, prototype audits, and live demos in a lean 25k-token payload."
    ];
  }

  static sidebar_self_rep_philosophy() {
    return [
      "Principles of the Self-Replicating Plan:\n1. Self-Contained Knowledge: All architectural decisions, code audits, patent history, and interactive test benches reside in this single repository.\n2. In-Situ Live Testing: Demonstrations of new geometric algorithms are built directly into document chapters, letting you verify behavior before committing to production code.\n3. Frictionless Handoff: A fresh thread starts instantly with complete context, allowing continuous incremental progress across multiple AI collaboration sessions."
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