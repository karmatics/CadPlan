class CadPlanRoadmapContent {
  static getMeta() {
    return {
      kicker: 'Kernel Design & Technical Debt',
      title: 'Prototype State & Architectural Decisions',
      subtitle: 'Analyzing what must be preserved, what must be refactored, and the foundational engineering decisions ahead.'
    };
  }

  static manifest() {
    return [
      {
        section: 'status',
        partLabel: 'Status Assessment',
        title: 'Prototype Reality: Getting It Working vs. Production',
        blocks: [
          { id: 'p_status_1', type: 'p' },
          { id: 'p_status_2', type: 'p' },
          { id: 'sidebar_prototype_strengths', type: 'sidebar', kicker: 'Audit Summary', title: 'Proven Concepts vs. Technical Debt in accuCad' }
        ]
      },
      {
        section: 'typescript',
        partLabel: 'Language Architecture',
        title: 'JavaScript vs. TypeScript for the Kernel',
        blocks: [
          { id: 'p_lang_1', type: 'p' },
          { id: 'p_lang_2', type: 'p' }
        ]
      },
      {
        section: 'decoupling',
        partLabel: 'Engine Independence',
        title: 'Decoupling Geometry from Three.js',
        blocks: [
          { id: 'p_decoupling_1', type: 'p' },
          { id: 'p_decoupling_2', type: 'p' },
          { id: 'sidebar_renderer_independence', type: 'sidebar', kicker: 'System Boundary', title: 'The Clean Kernel Boundary' }
        ]
      },
      {
        section: 'interview_agenda',
        partLabel: 'Next Steps',
        title: 'Collaborative Discovery Agenda',
        blocks: [
          { id: 'p_agenda_1', type: 'p' },
          { id: 'p_agenda_2', type: 'p' }
        ]
      }
    ];
  }

  static p_status_1() {
    return [
      "It is critical to be honest about the state of the existing `accuCad` code: it was built to prove interaction concepts and get things working. The fact that you can open the browser, click two points, dynamically snap to edges, and see an animated squircle compass prove that the core ergonomic vision is sound. But the implementation reflects the hallmarks of rapid prototyping: ad-hoc data structures, DOM coupling inside geometric classes, and overlapping responsibilities."
    ];
  }

  static p_status_2() {
    return [
      "For example, elements (`RectangleElement`, `PathElement`, `CapsuleElement`) maintain their own ad-hoc `points` arrays and handle their own visual Three.js mesh generation inside command callbacks. Drawing commands mix user interaction event handling with direct scene graph mutations. Before moving to a production engine, we must separate pure geometric modeling, constraint calculation, and visual scene rendering into clean, testable layers."
    ];
  }

  static sidebar_prototype_strengths() {
    return [
      "Key accuCad Concepts to Preserve & Refactor:\n1. AccuDraw Math: The relative vector projection and smart lock state machine in `AccuDrawLogic.js` are mathematically solid and should form the direct basis of the constraint pipeline.\n2. Chorded & Tentative Snapping: The 50ms chorded click and screen-space segment thresholding in `TentativePointHandler.js` deliver the exact 'thick pick' responsiveness required.\n3. The Tool Lifecycle: Commands implementing `onMouseDown`, `onMouseMove`, `reset`, and `finalize` provide a clean command pattern, but must be decoupled from direct Three.js scene creation.\n4. AccuDrawUi Drag & Layout: The floating coordinate box with SVG locks and blinking caret cursor works well, but should be driven by reactive state rather than direct DOM mutations."
    ];
  }

  static p_lang_1() {
    return [
      "A primary architectural question is whether the core engine should remain in standard ES6 JavaScript or migrate to TypeScript. In rapid prototyping, vanilla JavaScript provides unmatched agility—especially inside environments like Luno where code updates can be hot-patched in milliseconds without a build or transpilation step."
    ];
  }

  static p_lang_2() {
    return [
      "However, a precision CAD kernel involves dense mathematical invariants: 3D point tuples, transformation matrices, raycast hit descriptors, and topological edge/vertex graphs. Introducing TypeScript (or strict JSDoc typing) for the geometric kernel would prevent an entire class of runtime coordinate errors, provide autocomplete for complex vector math, and ensure that custom tool developers adhere to strict command contracts."
    ];
  }

  static p_decoupling_1() {
    return [
      "Currently, `accuCad` is tightly coupled to Three.js. Mathematical functions frequently instantiate `new THREE.Vector3()`, `new THREE.Matrix4()`, and `new THREE.Raycaster()`. Visual lines rely directly on Three.js addons (`Line2`, `LineGeometry`, `LineMaterial`). If Three.js is swapped, updated, or if we want to run the geometric constraint engine headless on a Node.js server, this tight coupling creates major hurdles."
    ];
  }

  static p_decoupling_2() {
    return [
      "A superior long-term architecture is a decoupled, headless geometric kernel. The kernel operates purely on lightweight arrays or typed Float64Arrays (`[x, y, z]`), performing all vector projection, intersection math, and AccuDraw frame transformations without knowing anything about WebGL, shaders, or cameras. The rendering layer becomes a clean adapter: it listens to kernel events and renders visual representations using Three.js, WebGPU, or whatever rendering backend is best suited for the target platform."
    ];
  }

  static sidebar_renderer_independence() {
    return [
      "The Decoupled Architecture Model:\n• Layer 1: Pure Geometry & Math Kernel (Headless, zero dependencies, pure vector/matrix operations, AccuDraw constraint logic, B-Rep/CSG topological models).\n• Layer 2: Command & Interaction Engine (Active tools, undo/redo stacks, chorded click multiplexing, numerical input buffers).\n• Layer 3: Render Adapter (Translates kernel entities into GPU scene objects—Three.js WebGL today, WebGPU compute passes or headless SVG export tomorrow).\n• Layer 4: UI & Tooling Shell (Coordinate overlays, slider panels, touch/P2P remote controllers)."
    ];
  }

  static p_agenda_1() {
    return [
      "Before writing this new kernel, we will conduct structured technical interviews to map out every requirement. In upcoming sessions, we will focus on specific technical domains: entity data models (B-Rep solids vs. polygonal meshes vs. NURBS curves), the exact numerical precision limits (float32 vs. float64 for CAD accuracy), and how parametric history should be recorded."
    ];
  }

  static p_agenda_2() {
    return [
      "Every answer and decision will be documented directly into this interactive specification dossier. Because this application is powered by our method-based JavaScript document architecture, we can continuously refine individual paragraphs, add architectural diagrams, and update technical requirements with surgical precision."
    ];
  }
}

globalThis.CadPlanRoadmapContent = CadPlanRoadmapContent;
if (typeof module !== "undefined" && module.exports) module.exports = CadPlanRoadmapContent;