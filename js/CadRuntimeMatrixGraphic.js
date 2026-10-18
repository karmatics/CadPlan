class CadRuntimeMatrixGraphic {
  /**
   * Interactive Architectural Matrix:
   * Compares the 4 execution tiers across Browser JS, Rust/Wasm, Desktop wgpu, and Headless AST.
   */
  static render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        background: '#070a13',
        border: '1.5px solid #21262d',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
        display: 'flex',
        flexDirection: 'column'
      }
    });

    const header = makeElement('div', {
      style: {
        padding: '10px 16px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid #21262d',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '15px' } }, '⚙️'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'Execution Environment Matrix & Pipeline Decoupling'),
        makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Pure Math vs. Renderers')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' } }, 'Click any tier to inspect data flow & memory boundaries')
    ]);
    wrap.appendChild(header);

    const body = makeElement('div', {
      style: { padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#090d16' }
    });

    const tiers = [
      {
        id: 'tier_js_webgl',
        name: 'Tier 1: Browser JavaScript & Three.js WebGL',
        badge: 'Zero-Install Web',
        color: '#38bdf8',
        role: 'Instant user onboarding, WebRTC mobile pairing, and realistic physical materials.',
        memory: 'Garbage-collected V8 heap, Float64Array vectors, Line2 screen-space miter buffers.',
        tradeoffs: 'High visual agility, fast iteration, direct DOM accessibility; dependent on browser runtime.'
      },
      {
        id: 'tier_rust_wasm',
        name: 'Tier 2: Pure Rust (no_std) compiled to WebAssembly',
        badge: 'compassdraw-core (Wasm)',
        color: '#10b981',
        role: 'Deterministic constraint solving, Levenberg-Marquardt LM optimization, zero garbage collection.',
        memory: 'Linear Wasm memory heap, contiguous [f64; 3] arrays, zero-copy pointer transfers.',
        tradeoffs: 'Identical mathematical behavior across browser and native targets; requires boundary bindings.'
      },
      {
        id: 'tier_native_wgpu',
        name: 'Tier 3: Native Desktop Rust & wgpu (CADCraft)',
        badge: 'Native Binaries (macOS/Win/Linux)',
        color: '#f59e0b',
        role: 'Direct GPU pipeline, WGSL shader triangle strip tessellation, native DWG/DXF streaming.',
        memory: 'Rust memory safety, generational EntityStore handles, copy-on-write snapshot stacks.',
        tradeoffs: 'Raw desktop speed, tiny standalone executables; complex custom shaders for PBR materials.'
      },
      {
        id: 'tier_headless_agent',
        name: 'Tier 4: Headless AST Kernel & MCP Agent Endpoints',
        badge: 'Model Context Protocol (JSON-RPC)',
        color: '#a855f7',
        role: 'Autonomous AI drafting, surgical class method patching, and automated regression testing.',
        memory: 'Acorn JavaScript ASTs, JSON-RPC stdio transports, zero WebGL/DOM rendering allocations.',
        tradeoffs: 'Infinite scalability for background agents; operates strictly via coordinate events.'
      }
    ];

    let selectedTierId = 'tier_js_webgl';

    const cardsContainer = makeElement('div', {
      style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }
    });

    const detailBox = makeElement('div', {
      id: 'matrix-tier-detail',
      style: {
        background: '#0a0e1a',
        border: '1.5px solid #38bdf8',
        borderRadius: '8px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontFamily: 'monospace'
      }
    });

    function renderTiers() {
      cardsContainer.innerHTML = '';
      tiers.forEach(t => {
        const isSel = t.id === selectedTierId;
        const card = makeElement('div', {
          style: {
            background: isSel ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.02)',
            border: isSel ? `1.5px solid ${t.color}` : '1px solid #1e293b',
            borderRadius: '8px',
            padding: '12px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          },
          onclick: () => {
            selectedTierId = t.id;
            renderTiers();
          }
        }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' } }, [
            makeElement('strong', { style: { fontSize: '12px', color: '#f8fafc' } }, t.name.split(':')[0]),
            makeElement('span', { style: { fontSize: '9px', background: t.color + '22', color: t.color, border: `1px solid ${t.color}55`, padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, t.badge)
          ]),
          makeElement('div', { style: { fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' } }, t.role)
        ]);
        cardsContainer.appendChild(card);
      });

      const selObj = tiers.find(t => t.id === selectedTierId) || tiers[0];
      detailBox.style.borderColor = selObj.color;
      detailBox.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong style="color:${selObj.color};font-size:13px;">${selObj.name}</strong>
          <span style="font-size:10px;color:#94a3b8;">${selObj.badge}</span>
        </div>
        <div style="font-size:11px;color:#cbd5e1;line-height:1.5;"><strong>Core Mission:</strong> ${selObj.role}</div>
        <div style="font-size:11px;color:#94a3b8;line-height:1.5;"><strong>Memory Model:</strong> ${selObj.memory}</div>
        <div style="font-size:11px;color:#f59e0b;line-height:1.5;"><strong>Architectural Balance:</strong> ${selObj.tradeoffs}</div>
      `;
    }

    body.appendChild(cardsContainer);
    body.appendChild(detailBox);
    wrap.appendChild(body);
    container.appendChild(wrap);
    renderTiers();
  }
}

globalThis.CadRuntimeMatrixGraphic = CadRuntimeMatrixGraphic;
if (typeof module !== 'undefined' && module.exports) module.exports = CadRuntimeMatrixGraphic;