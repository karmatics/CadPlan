class CadCoordinateConverterLab {
  /**
   * Interactive Mathematical Converter & Coordinate Transformation Lab.
   * Demonstrates the multi-representation equivalence:
   * 1. 3D Float64 Arrays [x, y, z]
   * 2. Three.js 3D Vector Arcs (rotated in 3D via orthonormal basis u, v, n)
   * 3. Procedural SVG Path syntax (A rx ry 0 largeArc sweep x y)
   * 4. AutoCAD / CADCraft Polyline Bulge Factor: tan(theta / 4)
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
        makeElement('span', { style: { fontSize: '15px' } }, '🔄'),
        makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'Universal Coordinate & Arc Tangency Converter'),
        makeElement('span', { style: { fontSize: '10px', background: '#0284c7', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, '3D Vector ↔ SVG ↔ DXF Bulge')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#10b981', fontFamily: 'monospace' } }, 'Drag handles or sliders to inspect live translations')
    ]);
    wrap.appendChild(header);

    const stageGrid = makeElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)',
        gap: '1px',
        background: '#21262d'
      }
    });

    // Left Box: Interactive Visual Stage
    const visualBox = makeElement('div', {
      style: { background: '#090d16', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }
    });

    const controlsRow = makeElement('div', {
      style: { display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }
    }, [
      makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px' } }, [
        'Radius: ',
        makeElement('input', {
          id: 'conv-slider-r', type: 'range', min: '20', max: '140', value: '70',
          style: { width: '65px', accentColor: '#38bdf8' },
          oninput: (e) => { state.radius = parseFloat(e.target.value); update(); }
        })
      ]),
      makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px' } }, [
        'Sweep (θ): ',
        makeElement('input', {
          id: 'conv-slider-theta', type: 'range', min: '15', max: '315', value: '90',
          style: { width: '75px', accentColor: '#10b981' },
          oninput: (e) => { state.sweepDeg = parseFloat(e.target.value); update(); }
        })
      ]),
      makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' } }, [
        makeElement('input', {
          id: 'conv-chk-cw', type: 'checkbox',
          style: { accentColor: '#f59e0b', cursor: 'pointer' },
          onchange: (e) => { state.clockwise = e.target.checked; update(); }
        }),
        'Clockwise'
      ])
    ]);
    visualBox.appendChild(controlsRow);

    const svgW = 380, svgH = 300;
    const svg = makeElement('svg:svg', {
      viewBox: `0 0 ${svgW} ${svgH}`, width: '100%', height: '300px',
      style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '8px' }
    });

    const svgDefs = makeElement('svg:defs', {},
      makeElement('svg:pattern', { id: 'conv-grid', width: '20', height: '20', patternUnits: 'userSpaceOnUse' },
        makeElement('svg:path', { d: 'M 20 0 L 0 0 0 20', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '1' })
      )
    );
    svg.appendChild(svgDefs);
    svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#conv-grid)' }));

    const arcLayer = makeElement('svg:g');
    const chordLayer = makeElement('svg:g');
    const textLayer = makeElement('svg:g');
    svg.appendChild(chordLayer);
    svg.appendChild(arcLayer);
    svg.appendChild(textLayer);
    visualBox.appendChild(svg);
    stageGrid.appendChild(visualBox);

    // Right Box: Synchronized Code & Point Systems
    const codeBox = makeElement('div', {
      style: { background: '#0a0e1a', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }
    });

    const tabsRow = makeElement('div', { style: { display: 'flex', gap: '6px' } });
    const tabButtons = {};
    ['rust', 'js', 'svg', 'dxf'].forEach(lang => {
      const btn = makeElement('button', {
        className: `dr-tab-btn ${lang === 'rust' ? 'active' : ''}`,
        style: { fontSize: '10px', padding: '3px 8px' },
        onclick: () => setLang(lang)
      }, lang.toUpperCase());
      tabButtons[lang] = btn;
      tabsRow.appendChild(btn);
    });
    codeBox.appendChild(tabsRow);

    const codeSnippetPre = makeElement('pre', {
      id: 'conv-code-snippet',
      style: {
        flex: 1, minHeight: '260px', margin: 0, padding: '12px',
        background: '#070a13', border: '1px solid #1e293b', borderRadius: '6px',
        fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.45',
        color: '#e2e8f0', overflowX: 'auto', whiteSpace: 'pre'
      }
    });
    codeBox.appendChild(codeSnippetPre);

    const statsFooter = makeElement('div', {
      id: 'conv-stats-footer',
      style: {
        padding: '6px 10px', background: 'rgba(56, 189, 248, 0.08)',
        border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '6px',
        fontSize: '11px', fontFamily: 'monospace', color: '#38bdf8', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center'
      }
    });
    codeBox.appendChild(statsFooter);
    stageGrid.appendChild(codeBox);

    wrap.appendChild(stageGrid);
    container.appendChild(wrap);

    const state = {
      cx: 190,
      cy: 150,
      radius: 70,
      sweepDeg: 90,
      clockwise: false,
      activeLang: 'rust'
    };

    function setLang(lang) {
      state.activeLang = lang;
      Object.keys(tabButtons).forEach(k => tabButtons[k].classList.toggle('active', k === lang));
      update();
    }

    function update() {
      arcLayer.innerHTML = '';
      chordLayer.innerHTML = '';
      textLayer.innerHTML = '';

      const rad = (state.sweepDeg * Math.PI) / 180;
      const startAngle = -rad / 2;
      const endAngle = rad / 2;

      const p1 = {
        x: Math.round(state.cx + state.radius * Math.cos(startAngle)),
        y: Math.round(state.cy - state.radius * Math.sin(startAngle))
      };
      const p2 = {
        x: Math.round(state.cx + state.radius * Math.cos(endAngle)),
        y: Math.round(state.cy - state.radius * Math.sin(endAngle))
      };

      const chordLen = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const bulge = Math.tan((rad / 4)) * (state.clockwise ? -1 : 1);
      const sagitta = (chordLen / 2) * Math.abs(bulge);

      // SVG Arc flags
      const largeArcFlag = state.sweepDeg > 180 ? 1 : 0;
      const sweepFlag = state.clockwise ? 1 : 0;
      const svgPathD = `M ${p1.x} ${p1.y} A ${state.radius} ${state.radius} 0 ${largeArcFlag} ${sweepFlag} ${p2.x} ${p2.y}`;

      // Render Chord Line
      chordLayer.appendChild(makeElement('svg:line', {
        x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
        stroke: '#f59e0b', 'stroke-width': '1.5', 'stroke-dasharray': '3,3'
      }));

      // Render Radius Radii to Center
      chordLayer.appendChild(makeElement('svg:line', {
        x1: state.cx, y1: state.cy, x2: p1.x, y2: p1.y,
        stroke: 'rgba(255,255,255,0.15)', 'stroke-width': '1'
      }));
      chordLayer.appendChild(makeElement('svg:line', {
        x1: state.cx, y1: state.cy, x2: p2.x, y2: p2.y,
        stroke: 'rgba(255,255,255,0.15)', 'stroke-width': '1'
      }));

      // Render Arc Path
      arcLayer.appendChild(makeElement('svg:path', {
        d: svgPathD, fill: 'none', stroke: '#10b981', 'stroke-width': '3', 'stroke-linecap': 'round'
      }));

      // Vertex Markers
      [p1, p2].forEach(p => {
        arcLayer.appendChild(makeElement('svg:circle', {
          cx: p.x, cy: p.y, r: '4', fill: '#090d16', stroke: '#38bdf8', 'stroke-width': '2'
        }));
      });

      // Center Dot
      arcLayer.appendChild(makeElement('svg:circle', {
        cx: state.cx, cy: state.cy, r: '3', fill: '#ffffff'
      }));

      // Annotations
      textLayer.appendChild(makeElement('svg:text', {
        x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 - 8,
        fill: '#f59e0b', 'font-family': 'monospace', 'font-size': '10px', 'text-anchor': 'middle'
      }, `Chord: ${chordLen.toFixed(1)} px`));

      textLayer.appendChild(makeElement('svg:text', {
        x: state.cx, y: state.cy + 18,
        fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '10px', 'text-anchor': 'middle'
      }, `R: ${state.radius.toFixed(0)} | θ: ${state.sweepDeg.toFixed(0)}°`));

      // Update Code Pre
      let codeText = '';
      if (state.activeLang === 'rust') {
        codeText =
`// --- CADCraft v0.7.0 Pure-Rust Representation ---
// PolyVertex stores raw point + tangent bulge tan(θ/4)
let start_pt = Vec2::new(${p1.x}.0, ${p1.y}.0);
let end_pt   = Vec2::new(${p2.x}.0, ${p2.y}.0);

// Bulge factor scalar (negative for clockwise):
let bulge = ${bulge.toFixed(6)};

let v0 = PolyVertex { point: start_pt, bulge };
let v1 = PolyVertex { point: end_pt,   bulge: 0.0 };

// CADCraft LwPolyline entity commit:
let polyline = LwPolyline::new(vec![v0, v1], false);`;
      } else if (state.activeLang === 'js') {
        codeText =
`// --- Three.js & accuCad 3D Vector Representation ---
// Point representation: raw Float64Arrays [x, y, z]
const pStart  = [${p1.x}, ${p1.y}, 0];
const pCenter = [${state.cx}, ${state.cy}, 0];
const pEnd    = [${p2.x}, ${p2.y}, 0];

// Closed-form 3D vector bisector calculation:
const arcData = RoundingUtils3D.getRoundingData(v1, v2, v3);
const bulge   = RoundingUtils3D.arcToBulge(pStart, pEnd, pCenter, ${state.clockwise});

// Parametric Three.js 3D ArcCurve:
const arc = new THREE.ArcCurve(0, 0, ${state.radius}, ${startAngle.toFixed(3)}, ${endAngle.toFixed(3)}, ${state.clockwise});`;
      } else if (state.activeLang === 'svg') {
        codeText =
`<!-- Procedural SVG Vector Representation -->
<!-- M startX startY A rx ry x-axis-rotation large-arc sweep endX endY -->
<path
  d="${svgPathD}"
  fill="none"
  stroke="#10b981"
  stroke-width="3"
  stroke-linecap="round"
/>`;
      } else if (state.activeLang === 'dxf') {
        codeText =
`0
LWPOLYLINE
8
0
90
2
70
0
10
${p1.x.toFixed(4)}
20
${p1.y.toFixed(4)}
42
${bulge.toFixed(6)}
10
${p2.x.toFixed(4)}
20
${p2.y.toFixed(4)}`;
      }

      codeSnippetPre.textContent = codeText;
      statsFooter.innerHTML = `<span>Bulge: <strong>${bulge.toFixed(4)}</strong></span><span>Sagitta: <strong>${sagitta.toFixed(2)}px</strong></span><span>Arc Len: <strong>${(state.radius * rad).toFixed(1)}px</strong></span>`;
    }

    update();
  }
}

globalThis.CadCoordinateConverterLab = CadCoordinateConverterLab;
if (typeof module !== 'undefined' && module.exports) module.exports = CadCoordinateConverterLab;