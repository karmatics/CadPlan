class CadOriginsContent {
  static getMeta() {
    return {
      kicker: 'Personal Provenance & Strategic Horizon',
      title: 'My Story: AccuDraw, Bentley, and the New Frontier',
      subtitle: 'How inventing AccuDraw in the 1990s shaped CAD history, the subtle parallel to Bentley’s early success, and how agentic AI opens up the next chapter.'
    };
  }

  static manifest() {
      return [
        {
          section: 'provenance',
          partLabel: 'Chapter 1 • Origins',
          title: 'Inventing AccuDraw & SmartLine',
          blocks: [
            { id: 'comp_origins_graphic', type: 'component', component: 'CadOriginsGraphicComponent' },
            { id: 'p_rob_intro_1', type: 'p' },
            { id: 'p_rob_intro_2', type: 'p' },
            { id: 'sidebar_patent_milestone', type: 'sidebar', kicker: 'Intellectual Property', title: 'US Patent #5,754,182 & The 30-Year Moat' }
          ]
        },
        {
          section: 'playbook',
          partLabel: 'Chapter 1 • Evolution',
          title: 'A Familiar Playbook: From Workstations to the Open Web',
          blocks: [
            { id: 'p_bentley_playbook_1', type: 'p' },
            { id: 'p_bentley_playbook_2', type: 'p' },
            { id: 'sidebar_bentley_relation', type: 'sidebar', kicker: 'Industry Relationship', title: 'A Constructive Relationship & Strategic Leverage' }
          ]
        },
        {
          section: 'modern_tools',
          partLabel: 'Chapter 1 • Catalysts',
          title: 'Agentic AI & The Power to Build Alone',
          blocks: [
            { id: 'p_agentic_power_1', type: 'p' },
            { id: 'p_agentic_power_2', type: 'p' },
            { id: 'quote_origin_verdict', type: 'quote' }
          ]
        }
      ];
    }
  static p_rob_intro_1() {
    return [
      "I'm Rob Brown. In the mid-1990s, while working as a software interface designer at Bentley Systems in Exton, Pennsylvania, I invented AccuDraw and SmartLine. At the time, working in CAD was an exercise in frustration. If you wanted to draw precisely on a computer, you were forced to type repetitive command-line coordinate codes—like DX=10.5, DL=4.25, or @distance<angle—or construct disposable scratch lines just to snap to an intersection and delete them later. The mouse gave you visual rubber-banding, but was imprecise. The keyboard gave you precision, but typing coordinates wasn't drawing."
    ];
  }

  static p_rob_intro_2() {
    return [
      "I taught myself MDL programming because I knew there had to be a better way: a way to let the keyboard and mouse work together as a seamless team. I created a floating, context-sensitive compass that stayed right at the cursor, evaluated mouse movement, and locked onto drawing axes with single keystrokes without needing the Enter key. That invention became Bentley Systems' first issued patent in corporate history (US Patent #5,754,182). It defined the drafting experience of MicroStation 95, PowerDraft, and every subsequent release for over thirty years, becoming the core usability moat that kept departments of transportation and global engineering firms loyal."
    ];
  }

  static sidebar_patent_milestone() {
    return [
      "Historical Provenance & Patents:\n• US Patent #5,371,845: Conceived and filed while I was at Intergraph, laying the early groundwork for dynamic constraints.\n• US Patent #5,754,182: Issued May 19, 1998, to Bentley Systems. Sole inventor: Robert J. Brown. Established the patent foundation for AccuDraw, defining automated coordinate indexing, floating origin translation, and dynamic polar/rectangular alignment.\n• Current Status: These original patents have now legally expired, placing the foundational constraint and compass mechanics cleanly into the public domain."
    ];
  }

  static p_bentley_playbook_1() {
    return [
      "There is a fascinating historical parallel to what I am doing today. Back in the 1980s, Intergraph dominated high-end infrastructure CAD on proprietary Unix graphics workstations that cost tens of thousands of dollars. Bentley Systems built its initial success through a brilliant technological transition: they made software that allowed those same Intergraph IGDS workflows and files to run smoothly on standard, inexpensive personal computers. They didn't destroy Intergraph; they expanded the entire market by making powerful CAD accessible on commodity PC hardware."
    ];
  }

  static p_bentley_playbook_2() {
      return [
        "Today, a similar shift is underway, but with a critical distinction: **I am not positioning myself as bringing another AutoCAD clone to market**. Clones already exist (like CADCraft and various DWG viewers). What I am creating is the **superpower plugin layer on top of them** that makes them extraordinarily capable in 3D.",
        "What we are demonstrating is that an everyday drafter can sketch a 2D profile using standard AutoCAD conventions, immediately lift it into 3D with the AccuDraw floating compass, and then save it right back into standard 3D and 2D DXF/DWG format so that standard AutoCAD or MicroStation opens it losslessly. People who already know AutoCAD can use this with zero friction—even though I don't personally know the internal mechanics of AutoCAD, the open-source tools and AI handle the AutoCAD plumbing, while I supply the 3D spatial interaction engine that makes it magical."
      ];
    }
  static sidebar_bentley_relation() {
      return [
        "Industry Leverage & The Audience Capture Strategy:\n" +
        "• Capturing the Migration Wave: Legacy CAD companies live in fear of losing their captive audience. Users are already eager to escape $10,000/seat subscriptions. By offering a familiar AutoCAD-compatible baseline and gifting AccuDraw openly, we capture the audience that was ready to leave anyway.\n" +
        "• The Inventor's Giveaway: This is not just another generic clone; it is an open-source gift from the original inventor of AccuDraw himself, creating immense strategic leverage.\n" +
        "• Constructive Relations: While maintaining respect for Ray Bentley and what Bentley Systems built, this project demonstrates that the AccuDraw paradigm thrives on open web standards. It provides a credible, agile alternative that keeps the entire industry on its toes."
      ];
    }
  static p_agentic_power_1() {
    return [
      "What makes this moment uniquely exciting is agentic AI. In the 1990s, building a new CAD platform required an army of specialized graphics programmers, compilers, and years of manual coding. Today, using modern LLMs and my local Luno workspace environment, I can prototype, refactor, and audit complex mathematical engines at a speed that simply wasn't possible before."
    ];
  }

  static p_agentic_power_2() {
    return [
      "In just a matter of weeks, I was able to build `accuCad`—a working 3D WebGL implementation of AccuDraw, tentative snapping, and drawing tools running right in the browser. Furthermore, solid open-source geometric libraries and WebGPU capabilities are maturing rapidly. The barrier to entry has collapsed. By pairing my original interaction design with modern AI-accelerated development, I can build an open, accessible CAD platform from first principles."
    ];
  }

  static quote_origin_verdict() {
    return [
      "Bentley broadened the CAD world thirty years ago by bringing workstation power to the PC. Today, expired patents and agentic AI allow me to bring that same drafting freedom to the open web."
    ];
  }
}

globalThis.CadOriginsContent = CadOriginsContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadOriginsContent;