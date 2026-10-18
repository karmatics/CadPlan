class KeyCommandEngineContent {
  static getMeta() {
    return {
      kicker: 'Ergonomic Engine & Interaction Architecture',
      title: 'The Universal Key Command Engine',
      subtitle: 'How single-stroke hierarchical shortcuts operate without the Enter key, the & display syntax, and why this system transcends CAD to power creative software everywhere.'
    };
  }

  static manifest() {
      return [
        {
          section: 'shortcut_philosophy',
          partLabel: 'Chapter 4 • Key Engine',
          title: 'Single-Stroke Hierarchical Commands',
          blocks: [
            { id: 'comp_kch_interactive_lab', type: 'component', component: 'KeyCommandInteractiveLab' },
            { id: 'p_kch_1', type: 'p' },
            { id: 'p_kch_2', type: 'p' },
            { id: 'sidebar_kch_syntax', type: 'sidebar', kicker: 'Syntax & Parser', title: 'The & Hotkey Syntax & Numerical Range Parsing' }
          ]
        },
        {
          section: 'numerical_continuation',
          partLabel: 'Chapter 4 • Numerical Stream',
          title: 'Dynamic Parameter Scaling & Decimal Precision',
          blocks: [
            { id: 'comp_number_stream_lab', type: 'component', component: 'AccuDrawNumberStreamLab' },
            { id: 'p_kch_universal_1', type: 'p' },
            { id: 'p_kch_universal_2', type: 'p' },
            { id: 'quote_shortcut_freedom', type: 'quote' }
          ]
        }
      ];
    }
  static p_kch_1() {
    return [
      "One of the crown jewels of AccuDraw—and of my wider software architecture—is how keyboard shortcuts are handled. In traditional programs, keyboard shortcuts are an afterthought: awkward multi-finger finger-twisters like Ctrl+Alt+Shift+P, or command-line key-ins that force you to press `<Enter>` after every word. That ruins drafting speed. When you are drawing, your right hand is on the mouse and your left hand rests on the home row. You shouldn't have to reach across the keyboard to hit Enter, and you shouldn't have to look down."
    ];
  }

  static p_kch_2() {
    return [
      "In `KeyCommandHandler.js` and `SmartDrawKeys.js`, I architected a hierarchical shortcut dispatch tree that executes instantly on keypress. Tapping `T` instantly sets Top view. Tapping `S` sets Side view. Tapping `F` sets Front view. Tapping `O` moves the origin. Tapping `Space` toggles polar/rectangular mode. For deeper commands, shortcuts branch cleanly: typing `V` opens the View menu, and the very next keystroke (`C` for Center, `D` for Depth, `O` for Oscillate) executes immediately. There is no Enter key, no dialog popup latency, and no mode lock."
    ];
  }

  static sidebar_kch_syntax() {
    return [
      "The Clever Mechanics of KeyCommandHandler:\n• The `&` Underline Syntax: When defining commands like `kch.addKeyCommand('ca&psule', '', ...)` or `&keyboard shortcuts`, the ampersand indicates which letter serves as the hotkey. In the UI menu, that specific letter is cleanly highlighted or underlined, allowing hotkeys to be placed anywhere in a command word.\n• Numerical Range Parsing: Commands can bind continuous numerical ranges, such as `accudraw size #0-9`. When the user types any digit 0 through 9 after the prefix, the handler extracts the argument dynamically without hardcoding ten separate handlers.\n• Progressive Learning: The shortcuts dialog (`?` key) lists every command, its key path, and description. Beginners can look them up, but once memorized, they execute with raw reflex speed."
    ];
  }

  static p_kch_universal_1() {
    return [
      "I want to make a critical architectural point about this shortcut engine: it is not exclusive to CAD. I designed and use this shortcut philosophy more widely across my entire development world. It works just as effectively in vector illustration tools, image editing (a Photoshop alternative), sound design, or window management."
    ];
  }

  static p_kch_universal_2() {
    return [
      "Because this interaction model is shared across multiple projects, we must keep the core `KeyCommandHandler` clean, modular, and uncoupled from CAD-specific assumptions. When an artist or engineer sits down at any tool built on this architecture, their left hand has the exact same fluid, single-stroke command vocabulary. That kind of cross-application muscle memory is extraordinarily rare in software today."
    ];
  }

  static quote_shortcut_freedom() {
    return [
      "If you have to press Enter to confirm a shortcut, your interface has failed. Precision shortcuts should fire with the instantaneous response of a musical instrument."
    ];
  }
}

globalThis.KeyCommandEngineContent = KeyCommandEngineContent;
if (typeof module !== "undefined" && module.exports) module.exports = KeyCommandEngineContent;