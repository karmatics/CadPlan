class CadCodeViewerComponent {

  static render(container, options = {}) {
      const snippets = this.getSnippets();
      let activeKey = options.snippet || 'interceptor_hook';
      if (!snippets[activeKey]) activeKey = 'interceptor_hook';

      container.innerHTML = '';
      const wrap = makeElement('div', {
        style: {
          background: '#070a13',
          border: '1.5px solid rgba(0, 242, 254, 0.3)',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(0,0,0,0.7), 0 0 16px rgba(0,242,254,0.15)',
          display: 'flex',
          flexDirection: 'column'
        }
      });

      const header = makeElement('div', {
        style: {
          padding: '10px 14px',
          background: '#0d1117',
          borderBottom: '1px solid #21262d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }
      });

      const snippetSelect = makeElement('select', {
        id: 'code-viewer-snippet-select',
        style: {
          background: '#070a13',
          color: '#00f2fe',
          border: '1px solid rgba(0, 242, 254, 0.4)',
          borderRadius: '6px',
          padding: '4px 10px',
          fontFamily: 'monospace',
          fontSize: '11px',
          fontWeight: 'bold',
          cursor: 'pointer',
          outline: 'none'
        },
        onchange: (e) => {
          CadCodeViewerComponent.render(container, { snippet: e.target.value });
        }
      }, [
        makeElement('option', { value: 'interceptor_hook', selected: activeKey === 'interceptor_hook' }, '🦀 Hook 1: PointInterceptor (crates/engine)'),
        makeElement('option', { value: 'wgpu_overlay', selected: activeKey === 'wgpu_overlay' }, '🦀 Hook 2: CompassDrawOverlayPass (crates/render)'),
        makeElement('option', { value: 'pointmod', selected: activeKey === 'pointmod' }, '🦀 CADCraft pointmod.rs Frame Enum'),
        makeElement('option', { value: 'ocs_matrix', selected: activeKey === 'ocs_matrix' }, '🦀 Mat4::ocs Normal Derivation (crates/geom)'),
        makeElement('option', { value: 'bulge_arc', selected: activeKey === 'bulge_arc' }, '🦀 PolyVertex Arc Bulge tan(θ/4)')
      ]);

      const titleGroup = makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', {
          id: 'code-viewer-lang-badge',
          style: {
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#f59e0b',
            fontFamily: 'monospace',
            fontSize: '10px',
            fontWeight: 'bold'
          }
        }, '🦀 Rust Engine'),
        snippetSelect
      ]);

      const copyBtn = makeElement('button', {
        className: 'dr-nav-btn primary',
        style: { padding: '4px 12px', fontSize: '10px', fontWeight: '800' },
        onclick: (e) => {
          const active = snippets[activeKey];
          navigator.clipboard.writeText(active.code).then(() => {
            const btn = e.currentTarget;
            const orig = btn.textContent;
            btn.textContent = '✓ Copied!';
            setTimeout(() => { btn.textContent = orig; }, 1800);
          });
        }
      }, '📋 Copy Snippet');

      header.appendChild(titleGroup);
      header.appendChild(copyBtn);
      wrap.appendChild(header);

      const active = snippets[activeKey];

      const pathBar = makeElement('div', {
        style: {
          padding: '6px 14px',
          background: '#090d16',
          borderBottom: '1px solid #161e2b',
          fontFamily: 'monospace',
          fontSize: '11px',
          color: '#f8fafc',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, [
        makeElement('span', {}, `📁 ${active.filePath}`),
        makeElement('span', { style: { color: '#64748b', fontSize: '10px', fontWeight: 'normal' } }, `${active.code.split('\n').length} lines`)
      ]);
      wrap.appendChild(pathBar);

      const desc = makeElement('div', {
        style: {
          padding: '8px 14px',
          fontSize: '11.5px',
          color: '#cbd5e1',
          background: 'rgba(15, 23, 42, 0.45)',
          borderBottom: '1px solid #161e2b',
          lineHeight: '1.45'
        }
      }, active.explanation);
      wrap.appendChild(desc);

      const editorMount = makeElement('div', {
        style: { height: '320px', minHeight: '320px', width: '100%' }
      });
      wrap.appendChild(editorMount);

      container.appendChild(wrap);

      // Mount CodeMirror with Syntax Highlighting if available, fallback to pre
      if (typeof CodeMirrorWidget !== 'undefined') {
        new CodeMirrorWidget({
          host: editorMount,
          content: active.code,
          mode: 'javascript',
          readOnly: true,
          wrap: false
        });
      } else {
        const codeWrap = makeElement('pre', {
          style: {
            margin: '0',
            padding: '12px 14px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '11.5px',
            lineHeight: '1.5',
            color: '#7ee787',
            overflowX: 'auto',
            background: '#070a13'
          }
        }, active.code);
        editorMount.appendChild(codeWrap);
      }
  }
  static getSnippets() {
      return {
        interceptor_hook: {
          lang: 'rust',
          filePath: 'cadcraft_repo/crates/engine/src/interceptor.rs',
          explanation: 'Hook 1 in cadcraft-engine: Intercepts raw winit pointer coordinates and single-stroke hotkeys before CADCraft prompt loops, resolving 2D Vec2 for classic AutoCAD commands or 3D [f64; 3] for CompassDraw.',
          code: `// crates/engine/src/interceptor.rs
  use cadcraft_geom::{Vec2, Vec3};

  pub trait PointInterceptor {
      /// Intercepts raw mouse movement and raycasts.
      /// In 2D Mode: returns [x, y, 0.0], matching CADCraft's Vec2.
      /// In 3D Mode: returns the constrained world coordinate along active axes.
      fn filter_point(
          &mut self,
          raw_point: [f64; 3],
          ray_origin: [f64; 3],
          ray_dir: [f64; 3],
          is_tentative_active: bool,
      ) -> Option<[f64; 3]>;

      /// Intercepts single-stroke hotkeys (T, F, S, V, Space, L, G, N)
      /// without waiting for the Enter key.
      fn handle_key_down(&mut self, key: &str, ctrl: bool, shift: bool) -> bool;
  }

  // In crates/engine/src/session.rs:
  // Before checking session.point_mods Frame waiting loops:
  if let Some(interceptor) = &mut self.point_interceptor {
      if let Some(pt) = interceptor.filter_point(raw_pt, ray_o, ray_d, has_tentative) {
          // Satisfies Accept::POINT instantly on click without modal prompts!
          return self.step_active_command(Input::Point(Vec2::new(pt[0], pt[1])));
      }
  }`
        },
        wgpu_overlay: {
          lang: 'rust',
          filePath: 'cadcraft_repo/crates/render/src/overlay.rs',
          explanation: 'Hook 2 in cadcraft-render: The native wgpu overlay render pass. Executes at the tail of CADCraft\'s frame graph using LoadOp::Load, drawing the 3D squircle compass, tick cylinders, and Mini-Jack directly over document geometry.',
          code: `// crates/render/src/overlay.rs
  use wgpu::*;

  pub struct CompassDrawOverlayPass {
      pipeline: RenderPipeline,
      vertex_buffer: Buffer,
      index_buffer: Buffer,
      uniform_buffer: Buffer, // 4x4 View & Projection matrices
  }

  impl CompassDrawOverlayPass {
      pub fn render(
          &mut self,
          encoder: &mut CommandEncoder,
          view: &TextureView,
          compass_data: &CompassDrawVisualState,
      ) {
          let mut rpass = encoder.begin_render_pass(&RenderPassDescriptor {
              label: Some("CompassDraw Overlay Pass"),
              color_attachments: &[Some(RenderPassColorAttachment {
                  view,
                  resolve_target: None,
                  ops: Operations {
                      load: LoadOp::Load, // Preserve CADCraft drawing entities!
                      store: StoreOp::Store,
                  },
              })],
              depth_stencil_attachment: None,
              timestamp_writes: None,
              occlusion_query_set: None,
          });

          rpass.set_pipeline(&self.pipeline);
          rpass.set_bind_group(0, &self.uniform_bind_group, &[]);
          rpass.set_vertex_buffer(0, self.vertex_buffer.slice(..));
          rpass.set_index_buffer(self.index_buffer.slice(..), IndexFormat::Uint32);
          rpass.draw_indexed(0..compass_data.index_count, 0, 0..1);
      }
  }`
        },
        pointmod: {
          lang: 'rust',
          filePath: 'cadcraft_repo/crates/engine/src/pointmod.rs',
          explanation: 'CADCraft v0.7.0 point modifier stack. Frames pause interactive execution and wait for modal sub-prompts. CompassDraw replaces this modal delay by streaming live 3D coordinates.',
          code: `pub enum Frame {
      From { base: Option<Vec2> },
      Mid { first: Option<Vec2> },
      Filter { keep: Axes, first: Option<Vec2> },
      Angle { base: Vec2, dir: Vec2 },
      Snap { mode: u32 },
      TempTrack,
      Track { last: Option<Vec2> },
  }

  // In Session::step_point_mods:
  // When point modifiers are active, CADCraft asks:
  // '(need YZ):' or 'From base point:'
  // CompassDraw resolves constraints with single-stroke keys without prompt waiting!`
        },
        ocs_matrix: {
          lang: 'rust',
          filePath: 'cadcraft_repo/crates/geom/src/mat.rs',
          explanation: 'AutoCAD Object Coordinate System (OCS) normal matrix derivation in pure Rust. Derives the 3D direction cosines for any arbitrary extrusion normal vector.',
          code: `impl Mat4 {
      /// OCS (Object Coordinate System) matrix for an extrusion normal vector.
      /// Matches the AutoCAD Arbitrary Axis Algorithm.
      pub fn ocs(normal: Vec3) -> Mat4 {
          let n = normal.normalized();
          let ax = if n.x.abs() < 1.0/64.0 && n.y.abs() < 1.0/64.0 {
              Vec3::Y.cross(n)
          } else {
              Vec3::Z.cross(n)
          }.normalized();
          let ay = n.cross(ax).normalized();
          Mat4 {
              m: [
                  [ax.x, ay.x, n.x, 0.0],
                  [ax.y, ay.y, n.y, 0.0],
                  [ax.z, ay.z, n.z, 0.0],
                  [0.0,  0.0,  0.0, 1.0],
              ],
          }
      }
  }`
        },
        bulge_arc: {
          lang: 'rust',
          filePath: 'cadcraft_repo/crates/engine/src/cmd/pline_opts.rs',
          explanation: 'Universal CAD polyline vertex bulge factor tan(θ/4). SmartLine transitions from lines to arcs by computing and storing this scalar on each vertex.',
          code: `// PolyVertex tuple: (point: Vec2, bulge: f64)
  // bulge = tan(theta / 4) = (2 * height) / chord_length

  pub fn arc_to_bulge(start: Vec2, end: Vec2, center: Vec2, clockwise: bool) -> f64 {
      let v1 = (start - center).normalized();
      let v2 = (end - center).normalized();
      let dot = v1.dot(v2).clamp(-1.0, 1.0);
      let mut theta = dot.acos();
      if clockwise {
          theta = -theta;
      }
      (theta / 4.0).tan()
  }`
        }
      };
    }
}

globalThis.CadCodeViewerComponent = CadCodeViewerComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadCodeViewerComponent;