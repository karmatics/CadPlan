class AccuDrawPhilosophyContent {
  static getMeta() {
    return {
      kicker: 'Design Heritage & Interaction Philosophy',
      title: 'The AccuDraw Philosophy & The Squircle',
      subtitle: 'How precision married intuition, why rectangular meets polar, and the real reason behind the animated squircle compass.'
    };
  }

  static manifest() {
        return [
          {
            section: 'isolated_compass_top',
            partLabel: 'Chapter 2 • 3D Instrument View',
            title: 'Isolated 3D AccuDraw Compass (Zoomed Viewport)',
            blocks: [
              { id: 'comp_isolated_compass_3d', type: 'component', component: 'CadIsolatedCompass3DComponent' }
            ]
          },
          {
            section: 'freedom_graphic_section',
            partLabel: 'Chapter 2 • Human Ergonomics',
            title: 'Freedom Over Monoliths: Composable Interactive Instruments',
            blocks: [
              { id: 'comp_freedom_graphic', type: 'component', component: 'CadErgonomicFreedomGraphic' }
            ]
          },
          {
            section: 'animated_svg_compass',
            partLabel: 'Chapter 2 • Procedural Vector Lab',
            title: 'Animated SVG Compass: Superellipse Morphing & Mini-Jack',
            blocks: [
              { id: 'comp_animated_svg_compass', type: 'component', component: 'CadAnimatedSvgCompassLab' }
            ]
          },
          {
            section: 'compass_anatomy_deconstruction',
            partLabel: 'Chapter 2 • Anatomical Deconstruction',
            title: 'The Squircle Compass: Visual Language & Geometry',
            blocks: [
              { id: 'comp_compass_anatomy', type: 'component', component: 'CompassAnatomyComponent' }
            ]
          },
          {
            section: 'challenge',
            partLabel: 'Chapter 2 • Foundations',
            title: 'The Challenge of Drawing on a Computer',
            blocks: [
              { id: 'p_phil_challenge_1', type: 'p' },
              { id: 'p_phil_challenge_2', type: 'p' },
              { id: 'sidebar_1995_reprint', type: 'sidebar', kicker: 'February 1995 MicroStation Manager', title: 'From My Original Article: A PowerDraft Highlight' }
            ]
          },
          {
            section: 'solution',
            partLabel: 'Chapter 2 • Synthesis',
            title: 'Marrying Keyboard Precision and Mouse Intuition',
            blocks: [
              { id: 'p_phil_synthesis_1', type: 'p' },
              { id: 'p_phil_synthesis_2', type: 'p' },
              { id: 'sidebar_scott_williams', type: 'sidebar', kicker: 'December 1996 MicroStation Manager', title: 'Scott Williams: The 3D Thinking Tool & AccuDreamer' }
            ]
          },
          {
            section: 'squircle_story',
            partLabel: 'Chapter 2 • The Compass',
            title: 'The Story of the Squircle Compass',
            blocks: [
              { id: 'p_squircle_1', type: 'p' },
              { id: 'p_squircle_2', type: 'p' },
              { id: 'sidebar_squircle_math', type: 'sidebar', kicker: 'Geometry & Math', title: 'Squircle3D, ArcSquircleCalc, and BezierSquircleCalc' },
              { id: 'p_squircle_3', type: 'p' }
            ]
          }
        ];
      }
  static p_phil_challenge_1() {
    return [
      "When I sat down to write 'A PowerDraft Highlight: AccuDraw' for the February 1995 issue of MicroStation Manager, I started with the fundamental challenge of our medium. On paper, precision drafting had centuries of physical tools: T-squares, triangles, scales, and drafting machines. In early CAD systems, there was no direct equivalent. We had a keyboard and a mouse, and they were fighting each other."
    ];
  }

  static p_phil_challenge_2() {
    return [
      "The mouse gave you dynamic rubber-banding and visual intuition, but was inherently imprecise and limited to two dimensions on a flat screen. The keyboard gave you exact coordinates, but having to type `DX=12.5`, `DL=4.25<45`, or active depth commands completely broke the creative flow. I realized that forcing users to type numbers into rigid command lines wasn't drawing—it was glorified bookkeeping."
    ];
  }

  static sidebar_1995_reprint() {
    return [
      "Excerpts from My February 1995 Article:\n'At the heart of the interface to any CAD system is precision data point input—the main point of drafting being to draw geometry precisely... On computers, the physical interface is typically a keyboard and a mouse. Traditionally, CAD systems use the keyboard for precision input, and the mouse for freehand work. Using the mouse is certainly easier and more intuitive... The problem is it's not very useful for \"real work,\" which has to be precise. Working in 3D, the mouse has another limitation: it is inherently a 2D input device. Most input, therefore, comes from the keyboard... But \"drawing\" by keyboard input is hardly drawing at all; it is simply not as interactive and visual as drawing with the mouse. So the need is for a comprehensive tool allowing keyboard and mouse to work together, without sacrificing the precision, speed, and 3D capabilities of keyboard input, or the intuitive nature, interactivity, and feedback of mouse drawing.'"
    ];
  }

  static p_phil_synthesis_1() {
    return [
      "My solution was AccuDraw. It consolidated and effectively replaced dozens of separate dialog boxes: precision input prompts, unit locks, axis locks, active depth, and auxiliary coordinate planes. Most importantly, it eliminated construction lines: drafters no longer had to draw temporary lines across their drawings just to find an intersection and delete them later. The compass anticipated what you were doing, indexed axes automatically, and let you lock dimensions with single keystrokes."
    ];
  }

  static p_phil_synthesis_2() {
    return [
      "In December 1996, Scott Williams published 'AccuDraw: The 3D Thinking Tool' in MicroStation Manager, featuring a profile on my work called 'AccuDreamer.' Scott described how AccuDraw's 3D compass allowed designers to navigate 3D space with the ease of 2D: tapping T for Top, F for Front, or S for Side rotated the drawing plane instantly, while O moved the origin anywhere in 3D space. The compass dealt with all the navigation and data input, allowing users to think directly in geometry."
    ];
  }

  static sidebar_scott_williams() {
    return [
      "From Scott Williams' December 1996 Profile:\n'Brown was frustrated with the complexity that has always plagued 3D. And so, inevitably, he had that inspiring thought that has brought us many wonderful inventions: There must be an easier way to do this! Intrigued, Brown went about learning MDL programming—and emerged on the other end of the process with AccuDraw... AccuDraw represents a new drafting philosophy. It eliminates the mathematical frustration of 3D space, letting designers think directly in geometry.'"
    ];
  }

  static p_squircle_1() {
    return [
      "Now, let's talk about the compass itself and why it looks the way it does. People often ask me about the squircle—the rounded geometric frame that floats at the cursor. In original AccuDraw, rectangular coordinates were naturally represented by a rectangle, and polar coordinates (distance and angle) were represented by a circle. It was an immediate visual shorthand: glance at the screen, and you instantly knew whether you were working in orthogonal X/Y offsets or radial vectors."
    ];
  }

  static p_squircle_2() {
    return [
      "Sometimes there is an overlap between them—what I call 'mixed mode,' where you might lock an X or Y distance while simultaneously reading an angle, or vice versa. But if I'm being completely honest, that wasn't the main reason I built the squircle. The real reason is simpler: I wanted it to animate beautifully between them."
    ];
  }

  static sidebar_squircle_math() {
    return [
      "The Mathematics of Morphing (ArcSquircleCalc & BezierSquircleCalc):\n• In `accuCad`, I wrote two dedicated mathematical calculators: `ArcSquircleCalc.js` and `BezierSquircleCalc.js`.\n• When you hit Space to toggle between rectangular and polar modes, or when `setSquircleAnimated(t, duration)` runs, the parameter `t` smoothly interpolates from 0.0 (pure square) to 1.0 (pure circle), with 0.5 representing a perfect superellipse (squircle).\n• `ArcSquircleCalc` divides the boundary into 8 segments: 4 straight edges that expand into arcs, and 4 corner fillets whose sweep angle morphs from 90° down to 45° with non-linear blend distortion.\n• The result is an organic, tactile transformation: the compass breathes and morphs in 3D space without jarring visual cuts."
    ];
  }

  static p_squircle_3() {
    return [
      "When an interface responds to user intent with smooth, continuous motion rather than abrupt state changes, it enters the realm of muscle memory. The squircle compass doesn't feel like software ticking off boolean flags; it feels like an elastic physical instrument resting lightly on your drawing plane."
    ];
  }
}

globalThis.AccuDrawPhilosophyContent = AccuDrawPhilosophyContent;
if (typeof module !== 'undefined' && module.exports) module.exports = AccuDrawPhilosophyContent;