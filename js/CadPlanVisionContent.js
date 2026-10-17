class CadPlanVisionContent {
  static getMeta() {
    return {
      kicker: 'CAD Architecture & Specification',
      title: 'Vision & Spatial Drafting Philosophy',
      subtitle: 'Designing a modern CAD system that unifies high-speed spatial drafting, dynamic geometric constraints, and responsive 3D interaction.'
    };
  }

  static manifest() {
    return [
      {
        section: 'vision',
        partLabel: 'Part One',
        title: 'The Challenge of Modern CAD',
        blocks: [
          { id: 'p_cad_problem_1', type: 'p' },
          { id: 'p_cad_problem_2', type: 'p' },
          { id: 'sidebar_cad_philosophy', type: 'sidebar', kicker: 'Core Principle', title: 'The Speed-of-Thought Drafting Mandate' }
        ]
      },
      {
        section: 'ergonomics',
        partLabel: 'Part Two',
        title: 'Dynamic Constraints vs. Modal Clutter',
        blocks: [
          { id: 'p_ergonomics_1', type: 'p' },
          { id: 'p_ergonomics_2', type: 'p' },
          { id: 'quote_spatial_freedom', type: 'quote' }
        ]
      }
    ];
  }

  static p_cad_problem_1() {
    return [
      "Traditional 3D CAD software suffers from an enduring usability divide. Mechanical packages like SolidWorks, Inventor, and Onshape offer robust parametric constraints and feature trees, but impose rigid modal workflows: to draw anything, the user must first define a sketch plane, enter a distinct 2D sketch mode, apply constraints through nested menus, and exit the sketch before generating 3D mass. Meanwhile, direct modeling tools like SketchUp or Blender offer fluid spatial manipulation, but often lack dimensional precision and constraint-driven accuracy."
    ];
  }

  static p_cad_problem_2() {
    return [
      "The goal of this project is to eliminate that friction by developing a CAD environment where precision 3D drafting happens continuously and in-place. The user should never have to stop drawing to enter an isolated modal sub-editor or manually type absolute global coordinates into a command prompt. By giving the cursor an intelligent, context-aware constraint frame that understands direction, intent, and proximity, drafting in 3D can feel as natural as freehand sketching while maintaining exact millimeter precision."
    ];
  }

  static sidebar_cad_philosophy() {
    return [
      "The Speed-of-Thought Mandate:\n1. Zero Modal Disruption: Drawing, snapping, constraining, and viewing occur in the same unified spatial viewport without switching modes.\n2. In-Situ Construction: The coordinate system moves to the point of active work via a floating origin, allowing relative dimensions to be entered effortlessly.\n3. Transient vs. Permanent Constraints: Instantaneous alignment locks (X, Y, Z, distance, angle) guide individual operations, while underlying geometric relationships are captured cleanly for subsequent editing."
    ];
  }

  static p_ergonomics_1() {
    return [
      "Key to this approach is how constraints are communicated to the user. Rather than forcing the designer to navigate floating toolbars or look away at property panels, visual feedback must be concentrated right at the active cursor. Pulsing axis indicators, dynamic index lines, and transient snap markers tell the user exactly what the software is inferring before they commit a point."
    ];
  }

  static p_ergonomics_2() {
    return [
      "Furthermore, keyboard entry must be seamless: typing numbers while drawing should instantly populate the active constraint dimension without requiring the user to click into a text box. A smart backspace key should allow rapid adjustments without canceling the command, and tapping single-key shortcuts (like L for lock, or Space for polar mode) must feel as immediate as playing a musical instrument."
    ];
  }

  static quote_spatial_freedom() {
    return [
      "Drafting in 3D should not feel like programming a spreadsheet. The software should anticipate the designer's geometric intent at every instant."
    ];
  }
}

globalThis.CadPlanVisionContent = CadPlanVisionContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPlanVisionContent;