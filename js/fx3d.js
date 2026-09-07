/* ============ fx3d.js — ordnance geometry ============
   Every projectile used to be a sphere. Each type now gets real geometry,
   oriented along its velocity, with the effects that actually sell it:
   rocket exhaust, tracer burn, tumbling shells, propeller wash.

   Sizes are in metres but multiplied by VIS: a real AMRAAM is 3.7 m long and
   180 mm across, which is a single pixel at RTS zoom. Ordnance is drawn
   oversized on purpose so you can read what is in the air.                  */
var FX3D = (function () {
  const VIS = 2.6;                       // readability multiplier
  let mats = null;

  function materials(THREE) {
    if (mats) return mats;
    const M = (o) => {
      const m = new THREE.MeshStandardMaterial(o);
      if (m.color) m.color.convertSRGBToLinear();
      if (m.emissive) m.emissive.convertSRGBToLinear();
      return m;
    };
    const B = (c, op) => {
      const m = new THREE.MeshBasicMaterial({
        color: c, transparent: true, opacity: op === undefined ? 1 : op,
        depthWrite: false, blending: THREE.AdditiveBlending,
      });
      m.color.convertSRGBToLinear();
      return m;
    };
    mats = {
      missileBody: M({ color: 0xd6dae0, metalness: 0.35, roughness: 0.45 }),
      missileNose: M({ color: 0x3a4046, metalness: 0.3, roughness: 0.5 }),
      missileFin: M({ color: 0xb8bec4, metalness: 0.4, roughness: 0.4 }),
      shellBody: M({ color: 0x5c5f56, metalness: 0.55, roughness: 0.42 }),
      shellTip: M({ color: 0x33372f, metalness: 0.5, roughness: 0.5 }),
      bombBody: M({ color: 0x585d52, metalness: 0.3, roughness: 0.6 }),
      torpBody: M({ color: 0x4a5058, metalness: 0.45, roughness: 0.45 }),
      brass: M({ color: 0x9a7b3c, metalness: 0.8, roughness: 0.35 }),
      flame: B(0xffb24a, 0.95),
      flameCore: B(0xfff0c0, 0.95),
      tracer: B(0xffd070, 0.9),
      tracerRed: B(0xff7040, 0.85),
      wake: B(0xcfe6f2, 0.5),
    };
    return mats;
  }

  /* four fins evenly around the body */
  function addFins(THREE, grp, mat, x, span, chord, thick) {
    for (let i = 0; i < 4; i++) {
      const f = new THREE.Mesh(new THREE.BoxGeometry(chord, thick, span), mat);
      f.position.set(x, 0, 0);
      f.rotation.x = i * Math.PI / 2;
      f.position.y = Math.cos(i * Math.PI / 2) * span * 0.5;
      f.position.z = Math.sin(i * Math.PI / 2) * span * 0.5;
      grp.add(f);
    }
  }

  /* ---------------- per-type builders ---------------- */
  /* A missile's shape follows its job, so the player can tell what is coming
     at them: a stubby sea-skimmer with folding wings, a slim winged cruise
     missile, a ramjet-nosed supersonic round, a finless ballistic body, or a
     slender interceptor that is all fins. */
  function buildByProfile(THREE, m, w) {
    const prof = (w && w.profile) || (w && w.dmg > 200 ? "loft" : "pop");
    const big = !!(w && w.dmg > 200);
    const g = buildMissile(THREE, m, big);
    const S = VIS;
    const wingMat = m.missileBody;
    const addWings = (span, chord, at, thick) => {
      for (let sd = -1; sd <= 1; sd += 2) {
        const wg = new THREE.Mesh(
          new THREE.BoxGeometry(chord * S, (thick || 0.05) * S, span * S), wingMat);
        wg.position.set(at * S, 0, sd * span * S * 0.5);
        g.add(wg);
      }
    };
    const addFins = (n, span, chord, at) => {
      for (let i = 0; i < n; i++) {
        const f = new THREE.Mesh(
          new THREE.BoxGeometry(chord * S, 0.05 * S, span * S), wingMat);
        f.position.x = at * S;
        f.rotation.x = i * Math.PI * 2 / n;
        f.translateZ(span * S * 0.5);
        g.add(f);
      }
    };
    if (prof === "skim") {
      /* short, fat, cruciform tail fins and small stub wings */
      addWings(0.55, 0.30, 0.05, 0.05);
      addFins(4, 0.34, 0.26, -0.95);
    } else if (prof === "cruise") {
      /* long slim body, mid-mounted straight wings, ventral intake */
      addWings(1.30, 0.26, -0.05, 0.045);
      addFins(4, 0.30, 0.22, -1.05);
      const intake = new THREE.Mesh(
        new THREE.BoxGeometry(0.5 * S, 0.16 * S, 0.20 * S), m.missileNose);
      intake.position.set(-0.55 * S, -0.16 * S, 0);
      g.add(intake);
    } else if (prof === "loft") {
      /* supersonic: an annular ramjet intake at the nose and small fins */
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.20 * S, 0.045 * S, 6, 14), m.missileNose);
      ring.rotation.y = Math.PI / 2;
      ring.position.x = 0.72 * S;
      g.add(ring);
      addFins(4, 0.26, 0.24, -0.95);
    } else if (prof === "ballistic") {
      /* a re-entry body: blunt, finless up front, big stabilisers aft */
      const rv = new THREE.Mesh(new THREE.ConeGeometry(0.24 * S, 0.7 * S, 12), m.missileNose);
      rv.rotation.z = -Math.PI / 2;
      rv.position.x = 1.0 * S;
      g.add(rv);
      addFins(4, 0.42, 0.34, -1.05);
    } else {
      /* interceptor: slender, long cruciform control fins fore and aft */
      addFins(4, 0.30, 0.20, 0.35);
      addFins(4, 0.36, 0.26, -0.95);
    }
    g.userData.profile = prof;
    return g;
  }

  function buildMissile(THREE, m, big) {
    const g = new THREE.Group();
    const L = (big ? 4.4 : 2.8) * VIS, R = (big ? 0.17 : 0.11) * VIS;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(R, R, L * 0.74, 10), m.missileBody);
    body.rotation.z = Math.PI / 2;
    g.add(body);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(R, L * 0.26, 10), m.missileNose);
    nose.rotation.z = -Math.PI / 2;
    nose.position.x = L * 0.5;
    g.add(nose);
    /* seeker band and mid-body wings */
    const band = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.04, R * 1.04, L * 0.05, 10),
      m.missileNose);
    band.rotation.z = Math.PI / 2; band.position.x = L * 0.3;
    g.add(band);
    addFins(THREE, g, m.missileFin, L * 0.06, R * 3.4, L * 0.16, R * 0.16);
    addFins(THREE, g, m.missileFin, -L * 0.3, R * 4.2, L * 0.2, R * 0.16);
    /* exhaust: bright core inside a longer flame cone, both additive */
    const flame = new THREE.Mesh(new THREE.ConeGeometry(R * 1.5, L * 0.9, 8), m.flame);
    flame.rotation.z = Math.PI / 2;
    flame.position.x = -L * 0.85;
    flame.name = "flame";
    g.add(flame);
    const core = new THREE.Mesh(new THREE.ConeGeometry(R * 0.8, L * 0.45, 8), m.flameCore);
    core.rotation.z = Math.PI / 2;
    core.position.x = -L * 0.62;
    core.name = "core";
    g.add(core);
    g.userData.len = L;
    return g;
  }

  function buildShell(THREE, m, arc) {
    const g = new THREE.Group();
    const L = (arc ? 1.5 : 1.0) * VIS, R = (arc ? 0.16 : 0.10) * VIS;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 0.94, L * 0.66, 9), m.shellBody);
    body.rotation.z = Math.PI / 2;
    g.add(body);
    const ogive = new THREE.Mesh(new THREE.ConeGeometry(R, L * 0.42, 9), m.shellTip);
    ogive.rotation.z = -Math.PI / 2;
    ogive.position.x = L * 0.5;
    g.add(ogive);
    /* driving band */
    const band = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.08, R * 1.08, L * 0.08, 9), m.brass);
    band.rotation.z = Math.PI / 2; band.position.x = -L * 0.2;
    g.add(band);
    if (!arc) {
      /* direct-fire rounds carry a base tracer */
      const tr = new THREE.Mesh(new THREE.SphereGeometry(R * 0.85, 7, 6), m.tracer);
      tr.position.x = -L * 0.36;
      tr.name = "flame";
      g.add(tr);
    }
    g.userData.len = L;
    g.userData.spin = arc ? 6 : 22;      // shells are spin-stabilised
    return g;
  }

  function buildBomb(THREE, m) {
    const g = new THREE.Group();
    const L = 2.2 * VIS, R = 0.20 * VIS;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 0.9, L * 0.6, 10), m.bombBody);
    body.rotation.z = Math.PI / 2;
    g.add(body);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(R, 10, 8), m.bombBody);
    nose.scale.x = 1.5; nose.position.x = L * 0.34;
    g.add(nose);
    /* boxed tail fin assembly, the JDAM look */
    for (let i = 0; i < 4; i++) {
      const f = new THREE.Mesh(new THREE.BoxGeometry(L * 0.24, R * 0.1, R * 2.6), m.missileFin);
      f.rotation.x = i * Math.PI / 2 + Math.PI / 4;
      f.position.set(-L * 0.34, 0, 0);
      f.position.y = Math.cos(i * Math.PI / 2 + Math.PI / 4) * R * 1.3;
      f.position.z = Math.sin(i * Math.PI / 2 + Math.PI / 4) * R * 1.3;
      g.add(f);
    }
    const ring = new THREE.Mesh(new THREE.TorusGeometry(R * 1.5, R * 0.12, 6, 12), m.missileFin);
    ring.rotation.y = Math.PI / 2;
    ring.position.x = -L * 0.44;
    g.add(ring);
    g.userData.len = L;
    return g;
  }

  function buildTorpedo(THREE, m) {
    const g = new THREE.Group();
    const L = 3.2 * VIS, R = 0.16 * VIS;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 0.85, L * 0.78, 10), m.torpBody);
    body.rotation.z = Math.PI / 2;
    g.add(body);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(R, 10, 8), m.torpBody);
    nose.scale.x = 1.3; nose.position.x = L * 0.42;
    g.add(nose);
    addFins(THREE, g, m.missileFin, -L * 0.36, R * 2.6, L * 0.14, R * 0.14);
    /* contra-rotating propellers */
    const prop = new THREE.Group();
    prop.name = "prop";
    for (let i = 0; i < 4; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(R * 0.14, R * 0.06, R * 1.5), m.brass);
      b.rotation.x = i * Math.PI / 2;
      b.position.z = Math.sin(i * Math.PI / 2) * R * 0.75;
      b.position.y = Math.cos(i * Math.PI / 2) * R * 0.75;
      prop.add(b);
    }
    prop.position.x = -L * 0.46;
    g.add(prop);
    g.userData.len = L;
    return g;
  }

  function buildDepth(THREE, m) {
    const g = new THREE.Group();
    const R = 0.32 * VIS, L = 0.9 * VIS;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(R, R, L, 12), m.bombBody);
    body.rotation.z = Math.PI / 2;
    g.add(body);
    for (const x of [-L * 0.5, L * 0.5]) {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(R * 1.02, R * 0.1, 6, 12), m.brass);
      rim.rotation.y = Math.PI / 2; rim.position.x = x;
      g.add(rim);
    }
    g.userData.len = L;
    return g;
  }

  /* ---------------- public ---------------- */
  /* a projectile mesh for p, already oriented; caller adds it to the scene */
  function create(THREE, p) {
    const m = materials(THREE);
    let g;
    switch (p.type) {
      case "missile": g = buildByProfile(THREE, m, p.w); break;
      case "arc":     g = buildShell(THREE, m, true); break;
      case "bomb":    g = buildBomb(THREE, m); break;
      case "torpedo": g = buildTorpedo(THREE, m); break;
      case "depth":   g = buildDepth(THREE, m); break;
      default:        g = buildShell(THREE, m, false); break;
    }
    g.userData.type = p.type;
    return g;
  }

  /* point the model along its travel vector and animate its moving parts */
  function orient(g, vx, vy, vz, dt, t) {
    const hyp = Math.sqrt(vx * vx + vz * vz);
    g.rotation.y = Math.atan2(-vz, vx);
    g.rotation.z = Math.atan2(vy, hyp || 0.0001);
    const d = g.userData;
    if (d.spin) g.rotation.x += d.spin * dt;
    const prop = g.getObjectByName("prop");
    if (prop) prop.rotation.x += dt * 34;
    /* exhaust flicker */
    const fl = g.getObjectByName("flame");
    if (fl) {
      const k = 0.75 + Math.sin(t * 60 + g.id) * 0.25;
      fl.scale.set(k, 1, 1);
      if (fl.material) fl.material.opacity = 0.65 + k * 0.3;
    }
    const co = g.getObjectByName("core");
    if (co) co.scale.set(0.8 + Math.sin(t * 90 + g.id) * 0.2, 1, 1);
  }

  /* a stretched glowing streak for hitscan fire, in metres */
  function tracer(THREE, ax, ay, az, bx, by, bz, heavy) {
    const m = materials(THREE);
    const dx = bx - ax, dy = by - ay, dz = bz - az;
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;
    const r = heavy ? 0.16 : 0.075;
    const g = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.4, len, 5),
      heavy ? m.tracerRed : m.tracer);
    /* cylinder is Y-up: lay it along the shot line */
    g.rotation.z = Math.PI / 2;
    const wrap = new THREE.Group();
    wrap.add(g);
    g.position.x = len / 2;
    wrap.position.set(ax, ay, az);
    wrap.rotation.y = Math.atan2(-dz, dx);
    wrap.rotation.z = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz) || 0.0001);
    return wrap;
  }

  /* muzzle blast: a short flame cone plus a smoke ball */
  function muzzle(THREE, big) {
    const m = materials(THREE);
    const g = new THREE.Group();
    const s = big ? 1.9 : 1.0;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.5 * s, 1.9 * s, 7), m.flameCore);
    cone.rotation.z = -Math.PI / 2;
    cone.position.x = 0.9 * s;
    g.add(cone);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.55 * s, 8, 6), m.flame);
    g.add(ball);
    return g;
  }

  return { create, orient, tracer, muzzle, VIS };
})();
