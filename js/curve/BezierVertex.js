var BezierVertex = class BezierVertex {
  constructor(point, pointType = 'click') {
    this.point = point ? point.slice() : [0, 0, 0];
    this.controlPoints = [this.point.slice(), this.point.slice()];
    this.tangents = [null, null];
    this.curvature = 1.0;
    this.balance = 1.0;
    this.pointType = pointType;
    this.isTentative = false;
    this.tangentAngleOffset = 0;
  }

  toJSON() {
    return {
      point: this.point,
      controlPoints: this.controlPoints,
      tangents: this.tangents,
      curvature: this.curvature,
      balance: this.balance,
      pointType: this.pointType,
      isTentative: this.isTentative,
      tangentAngleOffset: this.tangentAngleOffset
    };
  }

  static fromJSON(obj) {
    if (!obj) return new BezierVertex([0, 0, 0]);
    const v = new BezierVertex(obj.point, obj.pointType || 'click');
    if (Array.isArray(obj.controlPoints)) {
      v.controlPoints = [
        obj.controlPoints[0] ? obj.controlPoints[0].slice() : v.point.slice(),
        obj.controlPoints[1] ? obj.controlPoints[1].slice() : v.point.slice()
      ];
    }
    if (Array.isArray(obj.tangents)) {
      v.tangents = obj.tangents.slice();
    }
    if (typeof obj.curvature === 'number') v.curvature = obj.curvature;
    if (typeof obj.balance === 'number') v.balance = obj.balance;
    if (typeof obj.isTentative === 'boolean') v.isTentative = obj.isTentative;
    if (typeof obj.tangentAngleOffset === 'number') v.tangentAngleOffset = obj.tangentAngleOffset;
    return v;
  }
};

globalThis.BezierVertex = BezierVertex;
if (typeof module !== 'undefined' && module.exports) module.exports = BezierVertex;