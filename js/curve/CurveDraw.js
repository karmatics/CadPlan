class CurveDraw {
  /**
   * Rob Brown's Authentic Interactive Curve Drawer Engine.
   * Implements both:
   * 1. On-Curve Through-Point Relaxation with vertex-targeted curvature & balance.
   * 2. The Kinetic Tether ('String-Drag') tool with Ctrl elastic tow and Shift backtrack undo.
   */
  constructor(options = {}) {
    this.options = options;
    this.curve = new Curve();
    this.mode = 'points'; // 'points' | 'tether'
    this.curvature = 1.0;
    this.balance = 1.0;

    // Tether state
    this.stringLength = 50;
    this.curveTip = null;
    this.isCtrlDown = false;
    this.isShiftDown = false;
    this.tetherStream = [];
    this.sampleDecimation = 40;
  }

  addThroughPoint(point) {
    const vertexClass = (typeof BezierVertex !== 'undefined') ? BezierVertex : globalThis.BezierVertex;
    const v = new vertexClass(point);
    v.curvature = this.curvature;
    v.balance = this.balance;
    this.curve.addVertex(v);
    this.curveTip = point.slice();
    return v;
  }

  onPointerMove(x, y, isCtrl = false, isShift = false) {
    this.isCtrlDown = isCtrl;
    this.isShiftDown = isShift;

    if (this.mode !== 'tether' || !this.curveTip) {
      return { action: 'hover', point: [x, y] };
    }

    const dx = x - this.curveTip[0];
    const dy = y - this.curveTip[1];
    const dist = Math.hypot(dx, dy);

    if (this.isCtrlDown) {
      // Setting elastic string length and angle
      this.stringLength = Math.max(15, dist);
      return {
        action: 'tether_stretch',
        tip: this.curveTip.slice(),
        cursor: [x, y],
        stringLength: this.stringLength
      };
    }

    if (this.isShiftDown) {
      // Backtrack / Undo along recorded trajectory
      if (this.curve.vertices.length > 1) {
        this.curve.vertices.pop();
        this.curveTip = this.curve.vertices[this.curve.vertices.length - 1].point.slice();
        this.curve.update();
        return { action: 'tether_backtrack', tip: this.curveTip.slice() };
      }
    }

    if (dist > this.stringLength) {
      // Pulling the curve tip forward
      const pull = dist - this.stringLength;
      const ux = dx / dist;
      const uy = dy / dist;
      this.curveTip[0] += ux * pull;
      this.curveTip[1] += uy * pull;

      this.tetherStream.push([this.curveTip[0], this.curveTip[1]]);

      // Decimate and commit vertex
      const lastVertex = this.curve.vertices[this.curve.vertices.length - 1];
      const distToLast = lastVertex ? Math.hypot(this.curveTip[0] - lastVertex.point[0], this.curveTip[1] - lastVertex.point[1]) : Infinity;

      if (distToLast > this.sampleDecimation) {
        this.addThroughPoint(this.curveTip.slice());
      }

      return {
        action: 'tether_pull',
        tip: this.curveTip.slice(),
        cursor: [x, y],
        stringLength: this.stringLength
      };
    }

    return { action: 'tether_idle', tip: this.curveTip.slice(), cursor: [x, y] };
  }

  finish() {
    this.curve.update(8);
    const finalCurve = this.curve;
    this.curve = new Curve();
    this.curveTip = null;
    this.tetherStream = [];
    return finalCurve;
  }
}

globalThis.CurveDraw = CurveDraw;
if (typeof module !== 'undefined' && module.exports) module.exports = CurveDraw;