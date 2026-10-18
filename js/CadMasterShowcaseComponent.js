class CadMasterShowcaseComponent {

  static render(container) {
      container.innerHTML = '';

      const wrap = makeElement('div', {
        style: {
          background: '#070a13',
          border: '1.5px solid #21262d',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column'
        }
      });

      const header = makeElement('div', {
        style: {
          padding: '12px 18px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid #21262d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }
      });

      const titleGroup = makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } }, [
        makeElement('span', { style: { fontSize: '18px' } }, '🏛️'),
        makeElement('div', {}, [
          makeElement('strong', { style: { fontSize: '13px', color: '#f8fafc', fontFamily: 'monospace', display: 'block' } }, 'CadPlan: The Living Master Specification Engine'),
          makeElement('span', { style: { fontSize: '11px', color: '#94a3b8' } }, 'AI Rebuilding & Democratizing Proven CAD Tools for Everyone')
        ])
      ]);

      const modeSelector = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        makeElement('span', { style: { fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' } }, 'Audience Lens:'),
        makeElement('button', {
          className: 'dr-tab-btn active', id: 'btn-showcase-human',
          onclick: () => setLens('human')
        }, '👤 Human Stakeholder Lens'),
        makeElement('button', {
          className: 'dr-tab-btn', id: 'btn-showcase-agent',
          onclick: () => setLens('agent')
        }, '🤖 AI Engineering Builder Lens')
      ]);

      header.appendChild(titleGroup);
      header.appendChild(modeSelector);
      wrap.appendChild(header);

      // Interactive Stage
      const stage = makeElement('div', {
        style: { padding: '18px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '14px' }
      });

      // Top Architecture Banner SVG
      const svgW = 760, svgH = 220;
      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${svgW} ${svgH}`, width: '100%', height: '220px',
        style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '10px' }
      });

      const defs = makeElement('svg:defs', {},
        makeElement('svg:linearGradient', { id: 'grad-showcase-human', x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
          makeElement('svg:stop', { offset: '0%', 'stop-color': '#38bdf8', 'stop-opacity': '0.9' }),
          makeElement('svg:stop', { offset: '100%', 'stop-color': '#0284c7', 'stop-opacity': '0.3' })
        ),
        makeElement('svg:linearGradient', { id: 'grad-showcase-agent', x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
          makeElement('svg:stop', { offset: '0%', 'stop-color': '#10b981', 'stop-opacity': '0.9' }),
          makeElement('svg:stop', { offset: '100%', 'stop-color': '#059669', 'stop-opacity': '0.3' })
        )
      );
      svg.appendChild(defs);

      const nodeG = makeElement('svg:g', { id: 'showcase-nodes-layer' });
      const connG = makeElement('svg:g', { id: 'showcase-conns-layer' });
      svg.appendChild(connG);
      svg.appendChild(nodeG);
      stage.appendChild(svg);

      // Bottom Detailed Explanation Card
      const infoCard = makeElement('div', {
        id: 'showcase-info-card',
        style: {
          background: '#0a0e1a', border: '1.5px solid #38bdf8', borderRadius: '8px',
          padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.5'
        }
      });
      stage.appendChild(infoCard);
      wrap.appendChild(stage);
      container.appendChild(wrap);

      let activeLens = 'human';

      function setLens(lens) {
        activeLens = lens;
        document.getElementById('btn-showcase-human').classList.toggle('active', lens === 'human');
        document.getElementById('btn-showcase-agent').classList.toggle('active', lens === 'agent');
        drawGraph();
      }

      function drawGraph() {
        nodeG.innerHTML = '';
        connG.innerHTML = '';

        const makeNode = (x, y, w, h, title, subtitle, col, isCenter = false) => {
          const g = makeElement('svg:g', { transform: `translate(${x}, ${y})` });
          g.appendChild(makeElement('svg:rect', {
            width: w, height: h, rx: '8', fill: isCenter ? 'rgba(15, 23, 42, 0.95)' : '#070a13',
            stroke: col, 'stroke-width': isCenter ? '2.5' : '1.5',
            filter: isCenter ? 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.4))' : 'none'
          }));
          g.appendChild(makeElement('svg:text', {
            x: w / 2, y: isCenter ? 26 : 22, fill: '#f8fafc', 'font-family': 'monospace',
            'font-size': isCenter ? '12px' : '10.5px', 'font-weight': 'bold', 'text-anchor': 'middle'
          }, title));
          g.appendChild(makeElement('svg:text', {
            x: w / 2, y: isCenter ? 46 : 42, fill: col, 'font-family': 'monospace',
            'font-size': isCenter ? '10px' : '9px', 'text-anchor': 'middle'
          }, subtitle));
          return g;
        };

        const makeArrow = (x1, y1, x2, y2, col) => makeElement('svg:line', {
          x1, y1, x2, y2, stroke: col, 'stroke-width': '2', 'stroke-dasharray': '5,3', opacity: '0.85'
        });

        // Center Core Node: Unified Tool Engine
        nodeG.appendChild(makeNode(280, 75, 200, 68, 'One Unified Tool', 'AutoCAD Mode ↔ AccuDraw', '#38bdf8', true));

        if (activeLens === 'human') {
          // Human Experience Branches
          nodeG.appendChild(makeNode(20, 25, 200, 56, '1. Drops into AutoCAD', 'Zero Workflow Friction', '#10b981'));
          connG.appendChild(makeArrow(220, 53, 280, 95, '#10b981'));

          nodeG.appendChild(makeNode(20, 135, 200, 56, '2. Expands to Smart Mode', 'AccuDraw 3D Spatial Compass', '#f59e0b'));
          connG.appendChild(makeArrow(220, 163, 280, 125, '#f59e0b'));

          nodeG.appendChild(makeNode(540, 25, 200, 56, '3. Democratized Access', 'No $10k Paywalls (Open Web)', '#38bdf8'));
          connG.appendChild(makeArrow(480, 95, 540, 53, '#38bdf8'));

          nodeG.appendChild(makeNode(540, 135, 200, 56, '4. Master Specification', 'Unmatched Technical Depth', '#e11d48'));
          connG.appendChild(makeArrow(480, 125, 540, 163, '#e11d48'));

          infoCard.style.borderColor = '#38bdf8';
          infoCard.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong style="color:#38bdf8;font-size:13px;font-family:monospace;">👤 Human Drafter & Industry Stakeholder Lens: The Expandable Dual-Mode Tool</strong>
              <span style="font-size:10px;background:#38bdf822;color:#38bdf8;padding:2px 8px;border-radius:12px;font-weight:bold;">Universal Adoption Baseline</span>
            </div>
            <div style="font-size:12px;color:#cbd5e1;">
              People are already building AutoCAD clones, but <strong>nobody thought to build one tool that seamlessly drops into AutoCAD mode if you want it to, and then expands into this really smart AccuDraw spatial mode</strong>.
              Users adopt it instantly with zero workflow shock, and then discover single-keystroke 3D construction planes, squircle compasses, and on-curve splines right inside their workflow.
            </div>
            <div style="font-size:11px;color:#94a3b8;border-left:3px solid #38bdf8;padding-left:10px;margin-top:4px;">
              • Democratized Freedom: Makes enterprise CAD power accessible to every student, hobbyist, and professional without prohibitive $10,000/seat subscriptions.<br>
              • Unrivaled Specification Polish: Delivers an interactive living document that commands immediate authority among senior engineers and investors.
            </div>
          `;
        } else {
          // AI Engineering Builder Branches
          nodeG.appendChild(makeNode(20, 25, 210, 56, '1. AI as the Engine Builder', 'One Developer + LLM Scaling', '#10b981'));
          connG.appendChild(makeArrow(230, 53, 280, 95, '#10b981'));

          nodeG.appendChild(makeNode(20, 135, 210, 56, '2. Verifiable Math Contracts', 'Direction Cosines & Bulge tan(θ/4)', '#38bdf8'));
          connG.appendChild(makeArrow(230, 163, 280, 125, '#38bdf8'));

          nodeG.appendChild(makeNode(530, 25, 210, 56, '3. Surgical Method Patches', 'AST Client Splicing via Acorn', '#f59e0b'));
          connG.appendChild(makeArrow(480, 95, 530, 53, '#f59e0b'));

          nodeG.appendChild(makeNode(530, 135, 210, 56, '4. Zero Speculative Gaps', 'The Plan IS The Working Prompt', '#a855f7'));
          connG.appendChild(makeArrow(480, 125, 530, 163, '#a855f7'));

          infoCard.style.borderColor = '#10b981';
          infoCard.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong style="color:#10b981;font-size:13px;font-family:monospace;">🤖 AI Engineering Builder Lens: The Specification As The Complete Prompt</strong>
              <span style="font-size:10px;background:#10b98122;color:#10b981;padding:2px 8px;border-radius:12px;font-weight:bold;">Immense Ground-Truth Payload</span>
            </div>
            <div style="font-size:12px;color:#cbd5e1;">
              This is <strong>AI building an established, proven CAD tool and making it available to everyone</strong>.
              The immense sophistication of CadPlan means you can feed the entire specification into an LLM and give it an enormous amount to work on without the model hallucinating coordinate conventions or guessing at architecture.
            </div>
            <div style="font-size:11px;color:#94a3b8;border-left:3px solid #10b981;padding-left:10px;margin-top:4px;">
              • Zero Fragmentation: The AI receives the complete architectural thesis, Rust crate map, and exact mathematical derivations.<br>
              • Surgical Evolution: Luno's HTML container protocol merges class patches directly into client files, enabling continuous rapid iteration.
            </div>
          `;
        }
      }

      drawGraph();
    }
}

globalThis.CadMasterShowcaseComponent = CadMasterShowcaseComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadMasterShowcaseComponent;