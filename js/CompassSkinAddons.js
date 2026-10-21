class CompassSkinAddons {
  /**
   * External Decorator & Override Hub for AccuDraw.
   * 
   * ARCHITECTURAL INVARIANT:
   * This module is completely external. The core AccuDraw drafting engine
   * remains pure, mathematical, and unbloated. These decorators demonstrate
   * that any developer or AI can take the baseline compass and override its
   * visual presentation dynamically at runtime via simple composition.
   */

  /**
   * Non-invasively attaches an external 3D visual decorator to an AccuDraw instance.
   * If the decorator is removed, the compass reverts instantly to its lean baseline.
   */
  static attachDecorator(accuDraw, decoratorKey = 'default', options = {}) {
    if (!accuDraw || !accuDraw.compassGroup) return;
    const THREE = globalThis.THREE || window.THREE;
    if (!THREE) return;

    // 1. Detach and dispose any active external decorator group
    if (accuDraw._activeDecoratorGroup) {
      accuDraw.compassGroup.remove(accuDraw._activeDecoratorGroup);
      accuDraw._activeDecoratorGroup.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
      });
      accuDraw._activeDecoratorGroup = null;
      accuDraw._decoratorAnimationTick = null;
    }

    // Baseline Mode: ensure clean core visuals are visible
    if (!decoratorKey || decoratorKey === 'default') {
      CompassSkinAddons._setBaselineCoreVisibility(accuDraw, true);
      return;
    }

    // 2. Instantiate isolated decorator group
    const decoratorGroup = new THREE.Group();
    decoratorGroup.name = `ext_decorator_${decoratorKey}`;

    if (decoratorKey === 'steampunk') {
      CompassSkinAddons._setBaselineCoreVisibility(accuDraw, false);
      CompassSkinAddons._mountSteampunkFlywheel(decoratorGroup, THREE, accuDraw, options);
    } else if (decoratorKey === 'artnouveau') {
      CompassSkinAddons._setBaselineCoreVisibility(accuDraw, false);
      CompassSkinAddons._mountArtNouveauVines(decoratorGroup, THREE, accuDraw, options);
    } else if (decoratorKey === 'cyberpunk') {
      CompassSkinAddons._setBaselineCoreVisibility(accuDraw, true);
      CompassSkinAddons._mountCyberpunkHologram(decoratorGroup, THREE, accuDraw, options);
    }

    accuDraw.compassGroup.add(decoratorGroup);
    accuDraw._activeDecoratorGroup = decoratorGroup;
  }

  static _setBaselineCoreVisibility(accuDraw, isVisible) {
    if (accuDraw.xTick) accuDraw.xTick.visible = isVisible;
    if (accuDraw.yTick) accuDraw.yTick.visible = isVisible;
    if (accuDraw.zTick) accuDraw.zTick.visible = isVisible;
    if (accuDraw.squircleMesh) accuDraw.squircleMesh.visible = isVisible;
  }

  /**
   * EXTERNAL OVERRIDE 1: Steampunk Mechanical Flywheel
   * Attaches external 3D extruded brass gears with rotational momentum physics.
   */
  static _mountSteampunkFlywheel(group, THREE, accuDraw, options) {
    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95
    });

    const copperMat = new THREE.MeshPhysicalMaterial({
      color: 0xcd7f32,
      metalness: 0.92,
      roughness: 0.28,
      clearcoat: 0.5
    });

    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x1f1408,
      roughness: 0.55,
      metalness: 0.65
    });

    const R = 0.85;

    // Bezel & perimeter rivets
    const bezel = new THREE.Mesh(new THREE.TorusGeometry(R + 0.14, 0.024, 16, 64), brassMat);
    group.add(bezel);

    for (let i = 0; i < 16; i++) {
      const ang = (i * Math.PI * 2) / 16;
      const rivet = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 8), copperMat);
      rivet.position.set((R + 0.14) * Math.cos(ang), (R + 0.14) * Math.sin(ang), 0.018);
      group.add(rivet);
    }

    // Procedural gear helper
    const createGear = (radius, teeth, depth, mat) => {
      const shape = new THREE.Shape();
      const rOuter = radius + 0.06;
      const rInner = radius - 0.03;
      for (let i = 0; i < teeth * 2; i++) {
        const theta = (i * Math.PI) / teeth;
        const rad = (i % 2 === 0) ? rOuter : rInner;
        const x = rad * Math.cos(theta);
        const y = rad * Math.sin(theta);
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();
      const hole = new THREE.Path();
      hole.absarc(0, 0, radius * 0.72, 0, Math.PI * 2, true);
      shape.holes.push(hole);

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.006, bevelThickness: 0.006
      });
      geo.center();
      return new THREE.Mesh(geo, mat);
    };

    const mainGear = createGear(R + 0.02, 24, 0.028, brassMat);
    group.add(mainGear);

    const pinionRadius = R * 0.38;
    const pinionGear = createGear(pinionRadius, 12, 0.024, copperMat);
    const pinionDist = R + pinionRadius + 0.03;
    pinionGear.position.set(pinionDist * Math.cos(Math.PI / 3), pinionDist * Math.sin(Math.PI / 3), 0);
    group.add(pinionGear);

    // Center hub
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.045, 32), copperMat);
    hub.geometry.rotateX(Math.PI / 2);
    hub.position.z = 0.025;
    group.add(hub);

    // Steam needle
    const needleGeo = new THREE.ConeGeometry(0.022, R * 0.72, 8);
    needleGeo.translate(0, (R * 0.72) / 2, 0);
    needleGeo.rotateZ(-Math.PI / 4);
    const needle = new THREE.Mesh(needleGeo, new THREE.MeshBasicMaterial({ color: 0xff3322 }));
    needle.position.z = 0.048;
    group.add(needle);

    // Flywheel physics momentum state
    const flywheel = {
      angle: 0,
      velocity: 0.035,
      friction: 0.965
    };

    accuDraw.addFlywheelTorque = (torque) => {
      flywheel.velocity += torque;
    };

    accuDraw._decoratorAnimationTick = (delta) => {
      flywheel.velocity *= flywheel.friction;
      if (Math.abs(flywheel.velocity) < 0.001) flywheel.velocity = 0.003;
      flywheel.angle += flywheel.velocity;
      mainGear.rotation.z = flywheel.angle;
      pinionGear.rotation.z = -flywheel.angle * 2.0;

      needle.rotation.z = -Math.PI / 4 + Math.sin(performance.now() * 0.003) * 0.25;
    };
  }

  /**
   * EXTERNAL OVERRIDE 2: Art Nouveau Botanical Vines
   */
  static _mountArtNouveauVines(group, THREE, accuDraw, options) {
    const goldVineMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0x78350f,
      emissiveIntensity: 0.25,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 1.0
    });

    const jadeMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      roughness: 0.15,
      transmission: 0.35,
      thickness: 0.7,
      clearcoat: 1.0
    });

    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.08,
      clearcoat: 1.0
    });

    const R = 0.85;
    const cornerAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];

    cornerAngles.forEach((ang) => {
      const cosA = Math.cos(ang), sinA = Math.sin(ang);
      const points = [
        new THREE.Vector3(cosA * R * 0.35, sinA * R * 0.35, 0.0),
        new THREE.Vector3(cosA * R * 0.75 + 0.12 * -sinA, sinA * R * 0.75 + 0.12 * cosA, 0.04),
        new THREE.Vector3(cosA * R * 1.15 + 0.22 * sinA, sinA * R * 1.15 - 0.22 * cosA, 0.02),
        new THREE.Vector3(cosA * R * 1.35, sinA * R * 1.35, 0.08)
      ];
      const spline = new THREE.CatmullRomCurve3(points);
      const tube = new THREE.Mesh(new THREE.TubeGeometry(spline, 32, 0.018, 8, false), goldVineMat);
      group.add(tube);

      const bud = new THREE.Mesh(new THREE.SphereGeometry(0.042, 16, 16), jadeMat);
      bud.scale.set(1, 1.8, 0.7);
      bud.position.copy(points[3]);
      group.add(bud);
    });

    // Center pearl origin
    const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.085, 32, 32), pearlMat);
    pearl.position.z = 0.025;
    group.add(pearl);

    accuDraw._decoratorAnimationTick = (delta) => {
      const t = performance.now() * 0.002;
      group.scale.setScalar(1.0 + 0.02 * Math.sin(t * 2));
    };
  }

  /**
   * EXTERNAL OVERRIDE 3: Cyberpunk Neon Hologram (with Bloom support)
   */
  static _mountCyberpunkHologram(group, THREE, accuDraw, options) {
    const R = 0.85;

    const neonPinkMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
    const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });

    const ringOuter = new THREE.Mesh(new THREE.TorusGeometry(R + 0.15, 0.007, 8, 64), neonPinkMat);
    group.add(ringOuter);

    // 4 Corner Laser Crosshairs
    const corners = [[R, R], [-R, R], [-R, -R], [R, -R]];
    corners.forEach(([cx, cy]) => {
      const cross = new THREE.Group();
      cross.add(new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.008, 0.008), neonCyanMat));
      cross.add(new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.14, 0.008), neonCyanMat));
      cross.position.set(cx, cy, 0.015);
      group.add(cross);
    });

    accuDraw._decoratorAnimationTick = (delta) => {
      const pulse = 0.8 + 0.35 * Math.sin(performance.now() * 0.006);
      neonPinkMat.color.setHex(0xff007f).multiplyScalar(pulse);
      neonCyanMat.color.setHex(0x00f2fe).multiplyScalar(1.3 - pulse * 0.3);
    };
  }

  static playSnapPop(freq = 520, duration = 0.04) {
      try {
        if (!this._audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) this._audioCtx = new AudioContext();
        }
        if (!this._audioCtx || this._audioCtx.state === 'suspended') {
          if (this._audioCtx) this._audioCtx.resume();
          return;
        }

        const ctx = this._audioCtx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.45, ctx.currentTime + duration);

        gain.gain.setValueAtTime(0.045, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {
        // Audio autoplay policy fallback
      }
    }

  static createGhostBox(scene, THREE) {
      const group = new THREE.Group();
      group.name = 'accudraw_ghost_box_system';
      group.userData.isPickable = false;

      // Glowing edge wireframe lines
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.55,
        depthTest: true
      });

      const boxGeo = new THREE.BoxGeometry(1, 1, 1);
      const edgesGeo = new THREE.EdgesGeometry(boxGeo);
      const wireframe = new THREE.LineSegments(edgesGeo, lineMat);
      group.add(wireframe);

      // Translucent glass face fill
      const faceMat = new THREE.MeshPhysicalMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.08,
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 1.0,
        depthTest: true,
        side: THREE.DoubleSide
      });
      const fillMesh = new THREE.Mesh(boxGeo, faceMat);
      group.add(fillMesh);

      // 8 Corner Anchor Spheres
      const cornerGeo = new THREE.SphereGeometry(0.035, 12, 12);
      const cornerMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
      const corners = [];

      for (let i = 0; i < 8; i++) {
        const sp = new THREE.Mesh(cornerGeo, cornerMat);
        group.add(sp);
        corners.push(sp);
      }

      scene.add(group);

      return {
        group,
        update(pMin, pMax) {
          const minX = Math.min(pMin.x, pMax.x);
          const maxX = Math.max(pMin.x, pMax.x);
          const minY = Math.min(pMin.y, pMax.y);
          const maxY = Math.max(pMin.y, pMax.y);
          const minZ = Math.min(pMin.z, pMax.z);
          const maxZ = Math.max(pMin.z, pMax.z);

          const sx = Math.max(0.001, maxX - minX);
          const sy = Math.max(0.001, maxY - minY);
          const sz = Math.max(0.001, maxZ - minZ);

          wireframe.scale.set(sx, sy, sz);
          fillMesh.scale.set(sx, sy, sz);

          const cx = (minX + maxX) / 2;
          const cy = (minY + maxY) / 2;
          const cz = (minZ + maxZ) / 2;
          group.position.set(cx, cy, cz);

          // Position corner spheres relative to center
          const hx = sx / 2, hy = sy / 2, hz = sz / 2;
          const offsets = [
            [-hx, -hy, -hz], [hx, -hy, -hz], [hx, hy, -hz], [-hx, hy, -hz],
            [-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz]
          ];
          corners.forEach((c, i) => {
            c.position.set(offsets[i][0], offsets[i][1], offsets[i][2]);
          });
        },
        setVisible(visible) {
          group.visible = Boolean(visible);
        },
        destroy() {
          if (group.parent) group.parent.remove(group);
          boxGeo.dispose();
          edgesGeo.dispose();
          lineMat.dispose();
          faceMat.dispose();
          cornerGeo.dispose();
          cornerMat.dispose();
        }
      };
    }
}

globalThis.CompassSkinAddons = CompassSkinAddons;
if (typeof module !== 'undefined' && module.exports) module.exports = CompassSkinAddons;