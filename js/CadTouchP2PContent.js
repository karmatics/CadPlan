class CadTouchP2PContent {
  static getMeta() {
    return {
      kicker: 'Two-Handed CAD & Wireless Ergonomics',
      title: '6. Wireless TouchController: Dual-Trackpad P2P Modulation',
      subtitle: 'Freeing the left hand from passive keyboard hovering: low-latency WebRTC data channels, analog parameter scrubbing, and mobile glass ergonomics.'
    };
  }

  static manifest() {
      return [
        {
          section: 'touch_hero_top',
          partLabel: 'Chapter 6 • Ergonomics Lab',
          title: 'Two-Handed CAD: Precision Mouse + Mobile Glass Deck',
          blocks: [
            { id: 'comp_touch_graphic', type: 'component', component: 'CadTouchP2PGraphicComponent' }
          ]
        },
        {
          section: 'two_handed_cad',
          partLabel: 'Chapter 6 • Ergonomics',
          title: 'Two-Handed CAD: Pen Precision Meets Analog Modulation',
          blocks: [
            { id: 'p_p2p_ergonomics_1', type: 'p' },
            { id: 'p_p2p_ergonomics_2', type: 'p' },
            { id: 'sidebar_two_handed_cad', type: 'sidebar', kicker: 'Physical Workflow', title: 'The Two-Handed Bandwidth Multiplier' }
          ]
        },
        {
          section: 'trackpad_schema',
          partLabel: 'Chapter 6 • Architecture',
          title: 'Dual-Trackpad Protocol: Navigation & Encoders',
          blocks: [
            { id: 'p_trackpad_schema_1', type: 'p' },
            { id: 'p_trackpad_schema_2', type: 'p' },
            { id: 'sidebar_trackpad_mapping', type: 'sidebar', kicker: 'WebRTC Protocol', title: 'Left vs. Right Trackpad Event Mapping' }
          ]
        },
        {
          section: 'video_touch_clip',
          partLabel: 'Chapter 6 • Video Grounding',
          title: 'Video Demonstration: Real-Time Mobile Modulation',
          blocks: [
            { id: 'video_touch_demo', type: 'video', videoId: 'touch_controller_pairing' }
          ]
        }
      ];
    }
  static p_p2p_ergonomics_1() {
    return [
      "In modern desktop computing, your left hand is usually idle or hovering over a keyboard while your right hand does 95% of the physical work on the mouse. In CAD, this is an enormous waste of human bandwidth. To adjust a curve tension, line thickness, or 3D camera depth, traditional software forces you to stop drawing, move your mouse away from the geometry, click an input field, type a number, and return to find where you were."
    ];
  }

  static p_p2p_ergonomics_2() {
    return [
      "With `TouchController`, your phone connects over a low-latency WebRTC data channel and becomes a wireless analog modulation deck for your left hand. While your right hand uses the mouse with the fine motor precision of a pen (clicking points, locking axes, and snapping geometry), your left hand rests on the glass, fluidly scrubbing continuous parameters—curve curvature, corner fillet radius, or 3D elevation Z—without ever taking your eyes off the drawing."
    ];
  }

  static sidebar_two_handed_cad() {
    return [
      "Two-Handed CAD Bandwidth Division:\n" +
      "• Right Hand (Mouse / Stylus):\n" +
      "  - Discrete, precision spatial operations: vertex picking, tentative chord snapping, axis alignment.\n" +
      "• Left Hand (Mobile Glass Trackpad):\n" +
      "  - Continuous analog variables: curve tension, fillet radius, infinite Z-elevation wheel.\n" +
      "• Zero Friction: No stopping to select numerical textboxes; adjust parameters while the rubber-band line is live."
    ];
  }

  static p_trackpad_schema_1() {
    return [
      "The mobile interface is partitioned into two specialized zones: the Left Trackpad for 3D Camera Navigation, and the Right Trackpad for Parameter Modulation.",
      "The Left Trackpad supports multi-touch gestures: 1-finger orbit, 2-finger pan, pinch-zoom, 3-finger FOV lens perspective, and 4-finger vertical swipe for infinite AccuDraw Z-elevation translation."
    ];
  }

  static p_trackpad_schema_2() {
    return [
      "The Right Trackpad acts as an array of virtual rotary encoders: vertical swiping selects which active tool slider to modulate (showing a glowing green dashed guide line across the desktop screen), horizontal scrubbing dials the value, and a quick tap toggles booleans or opens direct entry."
    ];
  }

  static sidebar_trackpad_mapping() {
    return [
      "P2P Event Dispatch Table:\n" +
      "• `drag`: View orbit (spin/tilt) or pan translation.\n" +
      "• `zoom`: Focal ratio scaling.\n" +
      "• `perspective`: Camera FOV lens distortion.\n" +
      "• `accudrawZ`: 4-finger vertical swipe rolling the infinite elevation wheel.\n" +
      "• `sliderDragStart` / `sliderDragMove`: Vertical slider selection with desktop on-screen indicator line.\n" +
      "• `sliderAdjust`: Real-time analog parameter scrubbing."
    ];
  }
}

globalThis.CadTouchP2PContent = CadTouchP2PContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadTouchP2PContent;