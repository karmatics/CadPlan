class Curve {
  /**
   * Continuous Cubic Bézier Curve Engine.
   * Manages a sequence of on-curve BezierVertex instances, relaxing tangents
   * and generating parametric evaluations for WebGL and SVG.
   */
  constructor(vertices = [], closed = false) {
    this.vertices = [];
    this.closed = Boolean(closed);
    this.color = '#10b981';
    this.lineWidth = 3;

    const vertexClass = (typeof BezierVertex !== 'undefined') ? BezierVertex : globalThis.BezierVertex;
    if (Array.isArray(vertices)) {
      vertices.forEach(v => {
        if (v instanceof vertexClass) {
          this.vertices.push(v);
        } else if (v && v.point) {
          this.vertices.push(vertexClass.fromJSON(v));
        } else if (Array.isArray(v)) {
          this.vertices.push(new vertexClass(v));
        }
      });
    }
  }

  addVertex(v) {
    const vertexClass = (typeof BezierVertex !== 'undefined') ? BezierVertex : globalThis.BezierVertex;
    const vertex = (v instanceof vertexClass) ? v : new vertexClass(v);
    this.vertices.push(vertex);
    this.update();
    return vertex;
  }

  update(iterations = 8) {
    if (this.vertices.length < 2) return;
    const solver = (typeof UpdateControlPoints !== 'undefined') ? UpdateControlPoints : globalThis.UpdateControlPoints;
    if (solver && typeof solver.run === 'function') {
      solver.run(this.vertices, iterations);
    }
  }

  getPoints(segmentsPerSpan = 20) {
    if (this.vertices.length < 2) return [];
    this.update(8);

    const points = [];
    for (let i = 0; i < this.vertices.length - 1; i++) {
      const v0 = this.vertices[i];
      const v1 = this.vertices[i + 1];

      const p0 = v0.point;
      const p1 = v0.controlPoints[1];
      const p2 = v1.controlPoints[0];
      const p3 = v1.point;

      for (let s = (i === 0 ? 0 : 1); s <= segmentsPerSpan; s++) {
        const t = s / segmentsPerSpan;
        const mt = 1 - t;
        const mt2 = mt * mt;
        const t2 = t * t;

        const x = mt2 * mt * p0[0] + 3 * mt2 * t * p1[0] + 3 * mt * t2 * p2[0] + t2 * t * p3[0];
        const y = mt2 * mt * p0[1] + 3 * mt2 * t * p1[1] + 3 * mt * t2 * p2[1] + t2 * t * p3[1];
        const z = mt2 * mt * (p0[2] || 0) + 3 * mt2 * t * (p1[2] || 0) + 3 * mt * t2 * (p2[2] || 0) + t2 * t * (p3[2] || 0);

        points.push([x, y, z]);
      }
    }
    return points;
  }

  getSvgPathData() {
    if (this.vertices.length < 2) return '';
    this.update(8);

    let d = `M ${this.vertices[0].point[0]} ${this.vertices[0].point[1]}`;
    for (let i = 0; i < this.vertices.length - 1; i++) {
      const v0 = this.vertices[i];
      const v1 = this.vertices[i + 1];
      d += ` C ${v0.controlPoints[1][0]} ${v0.controlPoints[1][1]}, ${v1.controlPoints[0][0]} ${v1.controlPoints[0][1]}, ${v1.point[0]} ${v1.point[1]}`;
    }
    if (this.closed) d += ' Z';
    return d;
  }

  toJSON() {
    return {
      vertices: this.vertices.map(v => v.toJSON()),
      closed: this.closed,
      color: this.color,
      lineWidth: this.lineWidth
    };
  }

  static fromJSON(data) {
    if (!data) return new Curve();
    const c = new Curve(data.vertices || [], data.closed);
    if (data.color) c.color = data.color;
    if (data.lineWidth) c.lineWidth = data.lineWidth;
    return c;
  }
}

globalThis.Curve = Curve;
if (typeof module !== 'undefined' && module.exports) module.exports = Curve;