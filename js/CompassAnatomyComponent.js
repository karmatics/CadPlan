class CompassAnatomyComponent {

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
          flexDirection: 'column',
          gap: '0'
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
          makeElement('span', { style: { fontSize: '15px' } }, '🧭'),
          makeElement('strong', { style: { fontSize: '13px', color: '#38bdf8', fontFamily: 'monospace' } }, 'The Squircle Compass: Anatomical Deconstruction'),
          makeElement('span', { style: { fontSize: '10px', background: '#0284c7', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'AccuDraw Anatomy')
        ]),
        makeElement('span', { style: { fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' } }, 'Click any component below to highlight & inspect')
      ]);
      wrap.appendChild(header);

      const body = makeElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 320px) 1fr',
          gap: '1px',
          background: '#21262d'
        }
      });

      const stageLeft = makeElement('div', {
        style: {
          background: '#090d16',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          position: 'relative'
        }
      });

      const compassTarget = makeElement('div', {
        id: 'compass-anatomy-svg-target',
        style: { width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
      });
      stageLeft.appendChild(compassTarget);

      const stageStatus = makeElement('div', {
        id: 'compass-anatomy-status',
        style: {
          fontSize: '11px',
          fontFamily: 'monospace',
          color: '#38bdf8',
          textAlign: 'center',
          background: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          padding: '4px 10px',
          borderRadius: '6px'
        }
      }, 'Active Part: Full Instrument');
      stageLeft.appendChild(stageStatus);

      body.appendChild(stageLeft);

      const cardsRight = makeElement('div', {
        style: {
          background: '#0a0e1a',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxHeight: '440px',
          overflowY: 'auto'
        }
      });

      const parts = [
        {
          id: 'squircle_frame',
          title: '1. Morphing Squircle Boundary',
          kicker: 'Visual Mode Frame',
          color: '#38bdf8',
          equation: 'Superellipse: (x/R)^r + (y/R)^r = 1 • t ∈ [0.15, 1.0]',
          desc: 'Blends between an orthogonal square in rectangular delta mode (t=0.15) and a circle in polar radial mode (t=1.0). Provides continuous visual confirmation of active coordinate mode without reading text labels.'
        },
        {
          id: 'x_axis_tick',
          title: '2. Primary X-Axis (Red Tick Cylinder)',
          kicker: 'Direction Cosine Basis',
          color: '#ef4444',
          equation: 'X_axis = [R_00, R_01, R_02] • (P - Origin) · X',
          desc: 'Cylinder and tick marking positive displacement along the primary drawing axis. Pulses along the axis when locked via single keystroke X or SmartLock L.'
        },
        {
          id: 'y_axis_tick',
          title: '3. Primary Y-Axis (Green Tick Cylinder)',
          kicker: 'Perpendicular Normal Basis',
          color: '#10b981',
          equation: 'Y_axis = [R_10, R_11, R_12] • (P - Origin) · Y',
          desc: 'Cylinder and tick marking positive perpendicular displacement. Provides instant 90° normal alignment off lines, tangent arcs, and surface faces.'
        },
        {
          id: 'negative_ticks',
          title: '4. Negative Direction Indicators (Gray Ticks)',
          kicker: 'Cartesian Orientation',
          color: '#64748b',
          equation: 'Negative unit vectors: -X_axis, -Y_axis',
          desc: 'Muted gray cylinders indicating negative Cartesian quadrants. Allows SmartKeyin to infer negative signs automatically from physical cursor pulling without typing minus signs.'
        },
        {
          id: 'origin_dot',
          title: '5. Kinetic Floating Origin',
          kicker: 'Local Reference Point',
          color: '#ffffff',
          equation: 'Origin = [x, y, z] • Relocated with G / O key',
          desc: 'Center reference zero point. Translates to prior vertices automatically or jumps to reference locations via single-key origin moves without rotating axes.'
        },
        {
          id: 'index_line',
          title: '6. Pulsing Axis Constraint Line',
          kicker: 'Kinetic Feedback',
          color: '#ffffff',
          equation: 'IndexedToAxis = "x" | "y"',
          desc: 'Dynamic white dashed line and oscillating tick markers that fire when the mouse cursor enters the angular capture threshold of a primary axis, indicating magnetic axis lock.'
        }
      ];

      let activePartId = 'squircle_frame';

      function refresh() {
        compassTarget.innerHTML = '';

        let squircleVal = 0.45;
        let activeAxis = null;

        if (activePartId === 'squircle_frame') squircleVal = 0.5;
        if (activePartId === 'x_axis_tick' || activePartId === 'index_line') { activeAxis = 'x'; squircleVal = 0.35; }
        if (activePartId === 'y_axis_tick') { activeAxis = 'y'; squircleVal = 0.35; }

        const svgEl = SquircleCompassSvg.renderElement({
          size: 190,
          squircle: squircleVal,
          activeAxis: activeAxis
        });
        compassTarget.appendChild(svgEl);

        const activeObj = parts.find(p => p.id === activePartId) || parts[0];
        stageStatus.textContent = activeObj.title;
        stageStatus.style.color = activeObj.color;
        stageStatus.style.borderColor = activeObj.color + '66';
        stageStatus.style.background = activeObj.color + '15';
      }

      parts.forEach(part => {
        const card = makeElement('div', {
          className: 'compass-part-card',
          style: {
            background: part.id === activePartId ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.02)',
            border: part.id === activePartId ? `1.5px solid ${part.color}` : '1px solid #1e293b',
            borderRadius: '8px',
            padding: '10px 12px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          },
          onclick: () => {
            activePartId = part.id;
            cardsRight.querySelectorAll('.compass-part-card').forEach((c, idx) => {
              const p = parts[idx];
              const isSel = p.id === activePartId;
              c.style.background = isSel ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.02)';
              c.style.borderColor = isSel ? p.color : '#1e293b';
            });
            refresh();
          }
        }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' } }, [
            makeElement('span', { style: { fontSize: '10px', textTransform: 'uppercase', color: part.color, fontWeight: 'bold' } }, part.kicker),
            makeElement('span', { style: { fontSize: '10px', fontFamily: 'monospace', color: '#64748b' } }, part.equation)
          ]),
          makeElement('div', { style: { fontSize: '13px', fontWeight: 'bold', color: '#f8fafc', marginBottom: '4px' } }, part.title),
          makeElement('div', { style: { fontSize: '11px', color: '#94a3b8', lineHeight: '1.45' } }, part.desc)
        ]);

        cardsRight.appendChild(card);
      });

      body.appendChild(cardsRight);
      wrap.appendChild(body);
      container.appendChild(wrap);
      refresh();
    }
}

globalThis.CompassAnatomyComponent = CompassAnatomyComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CompassAnatomyComponent;