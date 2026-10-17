class UpdateControlPoints {
  /**
   * Iterative relaxation solver for on-curve cubic Bezier splines.
   * Derived from Rob Brown's DrawingApp engine.
   *
   * @param {Array<BezierVertex>} vertices - Array of on-curve BezierVertex instances
   * @param {number} iterations - Number of relaxation passes (typically 8 for final, 4 for live preview)
   */
  static run(vertices, iterations = 8) {
    if (!vertices || vertices.length === 0) return;
    if (vertices.length === 1) {
      vertices[0].controlPoints = [
        vertices[0].point.slice(),
        vertices[0].point.slice()
      ];
      return;
    }

    // Initialize control points to copies of anchor points if missing
    for (const v of vertices) {
      if (!v.controlPoints || v.controlPoints.length < 2) {
        v.controlPoints = [v.point.slice(), v.point.slice()];
      }
    }

    for (let iter = 0; iter < iterations; iter++) {
      for (let i = 0; i < vertices.length; i++) {
        const vertex = vertices[i];
        const prevVertex = vertices[i - 1];
        const nextVertex = vertices[i + 1];

        let tangent;

        if (vertex.tangents && vertex.tangents[1]) {
          tangent = vertex.tangents[1];
        } else if (prevVertex && nextVertex) {
          const toNext = UpdateControlPoints._makeUnitVector(
            nextVertex.controlPoints[0],
            vertex.point
          );
          const fromPrev = UpdateControlPoints._makeUnitVector(
            vertex.point,
            prevVertex.controlPoints[1]
          );
          tangent = UpdateControlPoints._normalize(
            UpdateControlPoints._addVectors(toNext, fromPrev)
          );
        } else if (nextVertex) {
          tangent = UpdateControlPoints._makeUnitVector(
            nextVertex.controlPoints[0],
            vertex.point
          );
        } else if (prevVertex) {
          tangent = UpdateControlPoints._makeUnitVector(
            vertex.point,
            prevVertex.controlPoints[1]
          );
        }

        if (!tangent) continue;

        // Apply tangent angle offset if specified
        if (vertex.tangentAngleOffset) {
          tangent = UpdateControlPoints._rotateVector(tangent, vertex.tangentAngleOffset);
        }

        const balance = vertex.balance || 1;
        const curvature = vertex.curvature || 1;
        const reversedTangent = [-tangent[0], -tangent[1], -(tangent[2] || 0)];

        if (nextVertex) {
          const dist = UpdateControlPoints._getDistance(vertex.point, nextVertex.point);
          const scale = (dist / 3) * curvature * (2 - balance);
          vertex.controlPoints[1] = UpdateControlPoints._projectPoint(
            vertex.point,
            tangent,
            scale
          );
        } else {
          vertex.controlPoints[1] = vertex.point.slice();
        }

        if (prevVertex) {
          const dist = UpdateControlPoints._getDistance(vertex.point, prevVertex.point);
          const scale = (dist / 3) * curvature * balance;
          vertex.controlPoints[0] = UpdateControlPoints._projectPoint(
            vertex.point,
            reversedTangent,
            scale
          );
        } else {
          vertex.controlPoints[0] = vertex.point.slice();
        }
      }
    }
  }

  // --- Built-in 2D/3D Vector Math Helpers ---
  static _getDistance(p1, p2) {
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dz = (p2[2] || 0) - (p1[2] || 0);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  static _makeUnitVector(target, origin) {
    const v = [
      target[0] - origin[0],
      target[1] - origin[1],
      (target[2] || 0) - (origin[2] || 0)
    ];
    return UpdateControlPoints._normalize(v);
  }

  static _normalize(v) {
    const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + (v[2] || 0) * (v[2] || 0));
    if (len === 0) return [1, 0, 0];
    return [v[0] / len, v[1] / len, (v[2] || 0) / len];
  }

  static _addVectors(v1, v2) {
    return [
      v1[0] + v2[0],
      v1[1] + v2[1],
      (v1[2] || 0) + (v2[2] || 0)
    ];
  }

  static _projectPoint(point, dir, dist) {
    return [
      point[0] + dir[0] * dist,
      point[1] + dir[1] * dist,
      (point[2] || 0) + (dir[2] || 0) * dist
    ];
  }

  static _rotateVector(v, angleRad) {
    // 2D planar rotation about Z axis
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return [
      v[0] * cos - v[1] * sin,
      v[0] * sin + v[1] * cos,
      v[2] || 0
    ];
  }
}

globalThis.UpdateControlPoints = UpdateControlPoints;
if (typeof module !== 'undefined' && module.exports) module.exports = UpdateControlPoints;