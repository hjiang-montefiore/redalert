/* ============ models3d.js — hand-finished procedural 3D models ============
   Real dimensions in metres. Model space: +X nose, +Y left, +Z up.
   Every surface detail is generated: painted UV textures (panels, stains,
   stencils), bump & roughness maps, cockpit interior, stores, gear.        */
var Models3D = (function () {

  /* ---------- lofted body with cylindrical UVs (u: length, v: around) ---------- */
  function loft(THREE, sections, segs, uvSpan) {
    segs = segs || 28;
    const pos = [], uv = [], idx = [];
    const x0 = sections[0].x, x1 = sections[sections.length - 1].x;
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      for (let j = 0; j <= segs; j++) {
        const t = j / segs * Math.PI * 2;
        const cy = Math.cos(t), sz = Math.sin(t);
        const e = s.sq || 1;
        const y = s.w * Math.sign(cy) * Math.pow(Math.abs(cy), e);
        const z = (s.zc || 0) + s.h * Math.sign(sz) * Math.pow(Math.abs(sz), e);
        pos.push(s.x, y, z);
        uv.push((s.x - x0) / (x1 - x0), j / segs);
      }
    }
    const ring = segs + 1;
    for (let i = 0; i < sections.length - 1; i++)
      for (let j = 0; j < segs; j++) {
        const a = i * ring + j, b = a + 1, c = a + ring, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* ---------- thin aerofoil slab from 2D outline ---------- */
  function slab(THREE, pts, thickness, plane) {
    const shape = new THREE.Shape();
    shape.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
    shape.closePath();
    /* The bevel used to scale with the extrusion depth. That is harmless on a
       thin surface — a wing 8 cm thick gets a 4 cm rounding — but ruinous on
       anything solid: a Bradley hull extruded 2.5 m across was rounded by
       1.25 m in EVERY direction, so it came out as a faceted boulder with the
       tracks buried in it, and a wing panel extruded 18 m grew a 9 m lip.
       Clamping the bevel to a fraction of the outline's own size leaves thin
       surfaces exactly as they were and stops thick bodies bloating. */
    const bb = bbox(pts);
    const lim = Math.max(1e-4, Math.min(bb.w, bb.h) * 0.05);
    const bs = Math.min(thickness * 0.5, lim);
    const bt = Math.min(thickness * 0.4, lim);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: thickness, bevelEnabled: bs > 1e-4,
      bevelThickness: bt, bevelSize: bs, bevelSegments: 2,
    });
    if (plane === "xz") g.rotateX(Math.PI / 2);
    g.computeVertexNormals();
    return g;
  }
  function bbox(pts) {
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    for (const p of pts) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
    return { x0, x1, y0, y1, w: x1 - x0, h: y1 - y0 };
  }
  /* clamp a texture so shape-space UVs (raw XY coords) sample the painted box */
  function fitTex(THREE, tex, bb) {
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1 / bb.w, 1 / bb.h);
    tex.offset.set(-bb.x0 / bb.w, -bb.y0 / bb.h);
    return tex;
  }

  /* =============================================================== textures */
  function noiseOn(c, w, h, alpha, seed) {
    for (let i = 0; i < w * h / 46; i++) {
      const x = (Math.sin(seed + i * 127.1) * 0.5 + 0.5) * w;
      const y = (Math.sin(seed * 3 + i * 311.7) * 0.5 + 0.5) * h;
      const v = (Math.sin(seed * 7 + i * 74.7) * 0.5 + 0.5);
      c.fillStyle = "rgba(" + (v > 0.5 ? "255,255,255" : "0,0,0") + "," + alpha + ")";
      c.fillRect(x, y, 2.2, 2.2);
    }
  }

  /* fuselage skin: 1024x256, u = tail->nose, v = around (0.25 = top, 0.75 = belly) */
  function fuselageTex(THREE, base) {
    const W = 1024, H = 256;
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const c = cv.getContext("2d");
    c.fillStyle = base; c.fillRect(0, 0, W, H);
    /* tonal patchwork: panels weather differently */
    const patches = [
      [0.05, 0.0, 0.10, 1.0, 4], [0.16, 0.5, 0.09, 0.5, -5], [0.30, 0.0, 0.12, 0.45, 5],
      [0.44, 0.6, 0.10, 0.4, -6], [0.55, 0.15, 0.08, 0.55, 6], [0.66, 0.0, 0.09, 1.0, -4],
      [0.76, 0.4, 0.08, 0.6, 5], [0.36, 0.45, 0.2, 0.15, 8],
    ];
    for (const [u, v, du, dv, tone] of patches) {
      c.fillStyle = "rgba(" + (tone > 0 ? "255,255,255" : "0,0,0") + "," + Math.abs(tone) / 100 + ")";
      c.fillRect(u * W, v * H, du * W, dv * H);
    }
    /* transverse station seams */
    c.strokeStyle = "rgba(20,24,28,0.34)"; c.lineWidth = 1.4;
    [0.055, 0.115, 0.19, 0.27, 0.36, 0.45, 0.545, 0.65, 0.75, 0.815, 0.9].forEach(u => {
      c.beginPath(); c.moveTo(u * W, 0); c.lineTo(u * W, H); c.stroke();
    });
    /* longitudinal seams: spine, waterline, belly */
    c.strokeStyle = "rgba(20,24,28,0.25)"; c.lineWidth = 1.2;
    [0.03, 0.25, 0.47, 0.53, 0.75, 0.97].forEach(v => {
      c.beginPath(); c.moveTo(0.05 * W, v * H); c.lineTo(0.95 * W, v * H); c.stroke();
    });
    /* access hatches */
    c.strokeStyle = "rgba(20,24,28,0.3)"; c.lineWidth = 1;
    [[0.7, 0.18, 26, 12], [0.62, 0.3, 18, 10], [0.5, 0.68, 22, 12], [0.33, 0.2, 16, 16],
     [0.42, 0.78, 26, 10], [0.6, 0.74, 14, 14], [0.26, 0.62, 20, 9]].forEach(([u, v, w2, h2]) => {
      c.strokeRect(u * W, v * H, w2, h2);
      c.beginPath(); c.arc(u * W + 4, v * H + 4, 1.4, 0, 7); c.stroke();
    });
    /* anti-glare panel ahead of canopy (top of nose) */
    c.fillStyle = "rgba(26,29,33,0.92)";
    c.beginPath();
    c.moveTo(0.845 * W, 0.185 * H); c.lineTo(0.93 * W, 0.21 * H);
    c.lineTo(0.93 * W, 0.29 * H); c.lineTo(0.845 * W, 0.315 * H);
    c.closePath(); c.fill();
    /* exhaust heat staining at the tail */
    const g2 = c.createLinearGradient(0, 0, 0.16 * W, 0);
    g2.addColorStop(0, "rgba(48,40,34,0.55)"); g2.addColorStop(1, "rgba(48,40,34,0)");
    c.fillStyle = g2; c.fillRect(0, 0, 0.16 * W, H);
    /* stencil rows (unreadable at scale, read as maintenance markings) */
    c.fillStyle = "rgba(30,34,38,0.5)";
    for (let i = 0; i < 9; i++) c.fillRect(0.78 * W + (i % 3) * 9, 0.62 * H + (i / 3 | 0) * 5, 6, 2);
    for (let i = 0; i < 6; i++) c.fillRect(0.57 * W + (i % 2) * 10, 0.4 * H + (i / 2 | 0) * 5, 7, 2);
    /* rescue arrow + canopy warning triangle */
    c.strokeStyle = "rgba(150,120,30,0.75)"; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(0.80 * W, 0.34 * H); c.lineTo(0.815 * W, 0.30 * H); c.lineTo(0.83 * W, 0.34 * H);
    c.closePath(); c.stroke();
    noiseOn(c, W, H, 0.028, 1.7);
    const t = new THREE.CanvasTexture(cv); t.anisotropy = 8;
    return t;
  }
  function fuselageBump(THREE) {
    const W = 1024, H = 256;
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const c = cv.getContext("2d");
    c.fillStyle = "#808080"; c.fillRect(0, 0, W, H);
    c.strokeStyle = "#5c5c5c"; c.lineWidth = 1.6;
    [0.055, 0.115, 0.19, 0.27, 0.36, 0.45, 0.545, 0.65, 0.75, 0.815, 0.9].forEach(u => {
      c.beginPath(); c.moveTo(u * W, 0); c.lineTo(u * W, H); c.stroke();
    });
    [0.03, 0.25, 0.47, 0.53, 0.75, 0.97].forEach(v => {
      c.beginPath(); c.moveTo(0.05 * W, v * H); c.lineTo(0.95 * W, v * H); c.stroke();
    });
    const t = new THREE.CanvasTexture(cv); t.anisotropy = 4;
    return t;
  }
  function fuselageRough(THREE) {
    const W = 512, H = 128;
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const c = cv.getContext("2d");
    c.fillStyle = "#8d8d8d"; c.fillRect(0, 0, W, H);   // ~0.55 roughness
    const rp = [[0.06, 0, 0.1, 1, "#9c9c9c"], [0.3, 0, 0.12, 0.5, "#7f7f7f"], [0.55, 0.15, 0.08, 0.55, "#a4a4a4"],
                [0.66, 0, 0.09, 1, "#7a7a7a"], [0.44, 0.6, 0.1, 0.4, "#989898"]];
    for (const [u, v, du, dv, col] of rp) { c.fillStyle = col; c.fillRect(u * W, v * H, du * W, dv * H); }
    const t = new THREE.CanvasTexture(cv);
    return t;
  }

  /* wing skin painted in shape space; sgn=+1 right wing */
  function wingTex(THREE, bb, base, teamColor, sgn, star) {
    const S = 56;                       // px per metre
    const cv = document.createElement("canvas");
    cv.width = Math.ceil(bb.w * S); cv.height = Math.ceil(bb.h * S);
    const c = cv.getContext("2d");
    const px = (x, y) => [(x - bb.x0) * S, (y - bb.y0) * S];
    c.fillStyle = base; c.fillRect(0, 0, cv.width, cv.height);
    /* spanwise rib seams + spar lines */
    c.strokeStyle = "rgba(20,24,28,0.3)"; c.lineWidth = 1.2;
    for (let i = 1; i < 6; i++) {
      const f = i / 6;
      const a = px(1.35 - 5.6 * f, sgn * (0.95 + 3.6 * f * 0));
      c.beginPath();
      const p1 = px(1.35 + (-2.95 - 1.35) * f, sgn * (0.95 + (4.55 - 0.95) * f));
      const p2 = px(-3.9 + (-4.05 + 3.9) * f, sgn * (0.9 + (4.55 - 0.9) * f));
      c.moveTo(p1[0], p1[1]); c.lineTo(p2[0], p2[1]); c.stroke();
    }
    /* flaperon + LE flap boundaries */
    c.strokeStyle = "rgba(20,24,28,0.42)"; c.lineWidth = 1.6;
    let a1 = px(-3.55, sgn * 1.35), a2 = px(-3.3, sgn * 4.3);
    c.beginPath(); c.moveTo(a1[0], a1[1]); c.lineTo(a2[0], a2[1]); c.stroke();
    a1 = px(0.4, sgn * 1.7); a2 = px(-2.4, sgn * 4.2);
    c.beginPath(); c.moveTo(a1[0], a1[1]); c.lineTo(a2[0], a2[1]); c.stroke();
    /* leading-edge wear strip */
    c.strokeStyle = "rgba(52,56,60,0.8)"; c.lineWidth = 3.2;
    a1 = px(1.35, sgn * 0.95); a2 = px(-2.95, sgn * 4.55);
    c.beginPath(); c.moveTo(a1[0], a1[1]); c.lineTo(a2[0], a2[1]); c.stroke();
    /* walkway line near root */
    c.strokeStyle = "rgba(30,34,38,0.5)"; c.lineWidth = 1;
    c.setLineDash([5, 4]);
    a1 = px(1.0, sgn * 1.25); a2 = px(-3.9, sgn * 1.5);
    c.beginPath(); c.moveTo(a1[0], a1[1]); c.lineTo(a2[0], a2[1]); c.stroke();
    c.setLineDash([]);
    /* star-and-bar insignia */
    if (star) {
      const ctr = px(-1.7, sgn * 2.9);
      drawInsignia(c, ctr[0], ctr[1], 0.62 * S, teamColor, sgn > 0 ? -0.25 : 0.25);
    }
    noiseOn(c, cv.width, cv.height, 0.03, sgn * 3.3);
    const t = new THREE.CanvasTexture(cv); t.anisotropy = 8;
    return t;
  }

  /* USAF-style low-visibility star-and-bar in a single colour */
  function drawInsignia(c, x, y, r, color, rot) {
    c.save(); c.translate(x, y); c.rotate(rot || 0);
    c.strokeStyle = color; c.fillStyle = color; c.lineWidth = Math.max(1.4, r * 0.1);
    /* side bars */
    c.fillRect(-2.1 * r, -0.42 * r, 1.35 * r, 0.84 * r);
    c.fillRect(0.75 * r, -0.42 * r, 1.35 * r, 0.84 * r);
    /* disc + star */
    c.beginPath(); c.arc(0, 0, 0.78 * r, 0, 7); c.stroke();
    c.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + i * (Math.PI * 4 / 5);
      const X = Math.cos(a) * 0.72 * r, Y = Math.sin(a) * 0.72 * r;
      i === 0 ? c.moveTo(X, Y) : c.lineTo(X, Y);
    }
    c.closePath(); c.fill();
    c.restore();
  }

  /* fin: tail code + fin flash, painted in XZ shape space */
  function finTex(THREE, bb, base, teamColor) {
    const S = 64;
    const cv = document.createElement("canvas");
    cv.width = Math.ceil(bb.w * S); cv.height = Math.ceil(bb.h * S);
    const c = cv.getContext("2d");
    const px = (x, z) => [(x - bb.x0) * S, (bb.y1 - z) * S];   // z up -> canvas down
    c.fillStyle = base; c.fillRect(0, 0, cv.width, cv.height);
    /* fin cap flash */
    c.fillStyle = teamColor;
    c.globalAlpha = 0.85;
    const t1 = px(-5.75, 3.2), t2 = px(-6.9, 3.2);
    c.fillRect(t2[0], t2[1], t1[0] - t2[0] + 16, 0.24 * S);
    c.globalAlpha = 1;
    /* rudder hinge line */
    c.strokeStyle = "rgba(20,24,28,0.4)"; c.lineWidth = 1.6;
    let a1 = px(-6.05, 0.6), a2 = px(-6.6, 3.1);
    c.beginPath(); c.moveTo(a1[0], a1[1]); c.lineTo(a2[0], a2[1]); c.stroke();
    /* tail code */
    c.fillStyle = "rgba(38,42,46,0.9)";
    c.font = "bold " + (0.62 * S) + "px 'Arial Narrow',sans-serif";
    c.textAlign = "center";
    const tc = px(-5.35, 1.7);
    c.fillText("IF", tc[0], tc[1]);
    c.font = (0.2 * S) + "px sans-serif";
    const sn = px(-5.3, 0.95);
    c.fillText("87-241", sn[0], sn[1]);
    noiseOn(c, cv.width, cv.height, 0.03, 9.1);
    const t = new THREE.CanvasTexture(cv); t.anisotropy = 8;
    return t;
  }

  /* afterburner interior: concentric petal rings */
  function burnerTex(THREE) {
    const cv = document.createElement("canvas"); cv.width = cv.height = 128;
    const c = cv.getContext("2d");
    const g = c.createRadialGradient(64, 64, 4, 64, 64, 62);
    g.addColorStop(0, "#241209"); g.addColorStop(0.45, "#170e08"); g.addColorStop(0.72, "#241d16"); g.addColorStop(1, "#0c0a08");
    c.fillStyle = g; c.fillRect(0, 0, 128, 128);
    c.strokeStyle = "rgba(120,90,50,0.35)";
    for (let r = 14; r < 62; r += 9) { c.beginPath(); c.arc(64, 64, r, 0, 7); c.stroke(); }
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * Math.PI * 2;
      c.beginPath(); c.moveTo(64 + Math.cos(a) * 18, 64 + Math.sin(a) * 18);
      c.lineTo(64 + Math.cos(a) * 60, 64 + Math.sin(a) * 60); c.stroke();
    }
    return new THREE.CanvasTexture(cv);
  }

  /* =============================================================== the jet */
  function buildF16(THREE, opts) {
    opts = opts || {};
    const teamColor = opts.teamColor || "#4b8fe0";
    const gear = opts.gear !== false;
    const root = new THREE.Group();
    const BASE = "#7a8087", BASE2 = "#6d7379";

    const mat = (o) => { const m = new THREE.MeshStandardMaterial(o); return m; };
    const skinF = mat({ color: 0xffffff, metalness: 0.32, roughness: 1.0, envMapIntensity: 0.6 });
    skinF.map = fuselageTex(THREE, BASE);
    skinF.bumpMap = fuselageBump(THREE); skinF.bumpScale = -0.012;
    skinF.roughnessMap = fuselageRough(THREE);
    const skin2 = mat({ color: 0x687076, metalness: 0.3, roughness: 0.55, envMapIntensity: 0.55 });
    const dark = mat({ color: 0x33383e, metalness: 0.45, roughness: 0.45, envMapIntensity: 0.5 });
    const radome = mat({ color: 0x4c5156, metalness: 0.12, roughness: 0.72, envMapIntensity: 0.4 });
    const steel = mat({ color: 0x8f9499, metalness: 0.85, roughness: 0.32 });

    /* ---------------- fuselage ---------------- */
    const fus = loft(THREE, [
      { x: 6.20, w: 0.27, h: 0.26, zc: 0.01 },
      { x: 5.50, w: 0.42, h: 0.40, zc: 0.04 },
      { x: 4.70, w: 0.54, h: 0.50, zc: 0.08, sq: 0.9 },
      { x: 3.80, w: 0.64, h: 0.56, zc: 0.08, sq: 0.85 },
      { x: 2.80, w: 0.76, h: 0.66, zc: 0.02, sq: 0.8 },
      { x: 1.60, w: 0.90, h: 0.78, zc: -0.03, sq: 0.75 },
      { x: 0.20, w: 0.97, h: 0.82, zc: -0.03, sq: 0.75 },
      { x: -1.40, w: 0.96, h: 0.81, zc: -0.01, sq: 0.78 },
      { x: -3.00, w: 0.90, h: 0.77, zc: 0.02, sq: 0.8 },
      { x: -4.60, w: 0.80, h: 0.70, zc: 0.05, sq: 0.85 },
      { x: -6.00, w: 0.64, h: 0.58, zc: 0.06, sq: 0.9 },
      { x: -7.00, w: 0.48, h: 0.47, zc: 0.05 },
      { x: -7.50, w: 0.41, h: 0.41, zc: 0.05 },
    ], 30);
    root.add(new THREE.Mesh(fus, skinF));

    /* radome */
    const nose = loft(THREE, [
      { x: 7.52, w: 0.012, h: 0.012, zc: 0 },
      { x: 7.05, w: 0.115, h: 0.115, zc: 0 },
      { x: 6.15, w: 0.272, h: 0.262, zc: 0.01 },
    ], 24);
    root.add(new THREE.Mesh(nose, radome));
    const pit = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.9, 6), dark);
    pit.rotation.z = Math.PI / 2; pit.position.set(7.9, 0, 0);
    root.add(pit);
    /* AoA probes */
    for (const sgn of [-1, 1]) {
      const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.28, 6), steel);
      p2.rotation.z = Math.PI / 2;
      p2.position.set(6.45, sgn * 0.24, 0.02);
      root.add(p2);
    }

    /* ---------------- cockpit interior (visible through the glass) ---------------- */
    const tub = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.62, 0.5),
      mat({ color: 0x14171b, roughness: 0.9 }));
    tub.position.set(4.25, 0, 0.28);
    root.add(tub);
    const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.5, 0.75),
      mat({ color: 0x1d2126, roughness: 0.85 }));
    seatBack.position.set(3.62, 0, 0.55);
    seatBack.rotation.y = 0.22;
    root.add(seatBack);
    const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 0.24),
      mat({ color: 0x2a2016, roughness: 0.8 }));
    headrest.position.set(3.58, 0, 0.92);
    root.add(headrest);
    /* pilot helmet hint */
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10),
      mat({ color: 0x3c4046, roughness: 0.5 }));
    helmet.position.set(3.95, 0, 0.78);
    root.add(helmet);
    /* HUD */
    const hud = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.2),
      new THREE.MeshPhysicalMaterial({ color: 0x2a4a3a, transparent: true, opacity: 0.45, roughness: 0.1, metalness: 0.2 }));
    hud.rotation.y = -0.35; hud.rotation.z = Math.PI / 2;
    hud.position.set(4.85, 0, 0.62);
    root.add(hud);

    /* ---------------- canopy: gold-smoked TRANSPARENT acrylic ---------------- */
    const canMat = new THREE.MeshPhysicalMaterial({
      color: 0x2a2418, metalness: 0.25, roughness: 0.08,
      transparent: true, opacity: 0.62,
      envMapIntensity: 1.5, clearcoat: 1, clearcoatRoughness: 0.06, side: THREE.DoubleSide,
    });
    const can = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 20), canMat);
    can.scale.set(1.62, 0.46, 0.50);
    can.position.set(4.15, 0, 0.52);
    can.castShadow = false;
    root.add(can);
    const fairing = loft(THREE, [
      { x: 3.10, w: 0.42, h: 0.34, zc: 0.42 },
      { x: 2.30, w: 0.40, h: 0.26, zc: 0.34 },
      { x: 1.20, w: 0.36, h: 0.16, zc: 0.24 },
      { x: 0.00, w: 0.30, h: 0.08, zc: 0.16 },
    ]);
    root.add(new THREE.Mesh(fairing, skin2));
    const sill = loft(THREE, [
      { x: 5.55, w: 0.34, h: 0.045, zc: 0.235 },
      { x: 4.30, w: 0.475, h: 0.05, zc: 0.26 },
      { x: 3.05, w: 0.44, h: 0.045, zc: 0.30 },
    ]);
    root.add(new THREE.Mesh(sill, dark));
    const bow = new THREE.Mesh(new THREE.TorusGeometry(0.40, 0.030, 8, 24, Math.PI), dark);
    bow.rotation.y = Math.PI / 2; bow.rotation.z = Math.PI / 2;
    bow.scale.set(1, 1.25, 1);
    bow.position.set(5.25, 0, 0.34);
    root.add(bow);

    /* ---------------- chin intake with splitter ---------------- */
    const duct = loft(THREE, [
      { x: 2.75, w: 0.46, h: 0.34, zc: -0.78, sq: 0.8 },
      { x: 1.80, w: 0.50, h: 0.38, zc: -0.72, sq: 0.8 },
      { x: 0.20, w: 0.52, h: 0.36, zc: -0.62, sq: 0.8 },
      { x: -1.20, w: 0.46, h: 0.28, zc: -0.55, sq: 0.85 },
    ]);
    root.add(new THREE.Mesh(duct, skin2));
    const lip = new THREE.Mesh(new THREE.TorusGeometry(0.40, 0.045, 10, 24), skin2);
    lip.rotation.y = Math.PI / 2; lip.scale.set(1.15, 0.8, 1);
    lip.position.set(2.78, 0, -0.78);
    root.add(lip);
    const mouth = new THREE.Mesh(new THREE.CircleGeometry(0.40, 24),
      mat({ color: 0x08090b, roughness: 0.95 }));
    mouth.scale.set(1.12, 0.8, 1);
    mouth.rotation.y = Math.PI / 2;
    mouth.position.set(2.81, 0, -0.78);
    root.add(mouth);
    /* boundary-layer splitter plate */
    const split = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.52, 0.03), dark);
    split.position.set(2.6, 0, -0.44);
    root.add(split);

    /* ---------------- wings with painted skins ---------------- */
    const wingPtsR = [[1.35, 0.95], [-2.95, 4.55], [-4.05, 4.55], [-4.45, 1.05], [-3.9, 0.9]];
    const wingPtsL = wingPtsR.map(p => [p[0], -p[1]]).reverse();
    const bbR = bbox(wingPtsR), bbL = bbox(wingPtsL);
    const wingMatR = mat({ color: 0xffffff, metalness: 0.32, roughness: 0.55, envMapIntensity: 0.6 });
    wingMatR.map = fitTex(THREE, wingTex(THREE, bbR, BASE, teamColor, 1, true), bbR);
    const wingMatL = mat({ color: 0xffffff, metalness: 0.32, roughness: 0.55, envMapIntensity: 0.6 });
    wingMatL.map = fitTex(THREE, wingTex(THREE, bbL, BASE, teamColor, -1, true), bbL);
    const wr = new THREE.Mesh(slab(THREE, wingPtsR, 0.09), wingMatR); wr.position.z = -0.06; root.add(wr);
    const wl = new THREE.Mesh(slab(THREE, wingPtsL, 0.09), wingMatL); wl.position.z = -0.06; root.add(wl);
    /* LERX */
    const lr = new THREE.Mesh(slab(THREE, [[4.85, 0.30], [1.30, 1.00], [1.30, 0.42]], 0.05), skin2);
    lr.position.z = 0.02; root.add(lr);
    const ll = new THREE.Mesh(slab(THREE, [[4.85, -0.30], [1.30, -0.42], [1.30, -1.00]], 0.05), skin2);
    ll.position.z = 0.02; root.add(ll);
    /* gun port on the left LERX root */
    const gun = new THREE.Mesh(new THREE.CircleGeometry(0.07, 10), mat({ color: 0x0c0d0f, roughness: 0.9 }));
    gun.position.set(2.4, -0.75, 0.34);
    gun.rotation.x = 0.35;
    root.add(gun);

    /* ---------------- stabilators + fin ---------------- */
    const sr = new THREE.Mesh(slab(THREE, [[-5.35, 0.75], [-6.85, 2.85], [-7.55, 2.85], [-7.5, 0.8]], 0.07), skin2);
    sr.position.z = -0.05; root.add(sr);
    const sl = new THREE.Mesh(slab(THREE, [[-5.35, -0.75], [-7.5, -0.8], [-7.55, -2.85], [-6.85, -2.85]], 0.07), skin2);
    sl.position.z = -0.05; root.add(sl);

    const finPts = [[-3.45, 0.55], [-5.9, 3.20], [-6.75, 3.20], [-6.6, 0.55]];
    const bbF = bbox(finPts);
    const finMat = mat({ color: 0xffffff, metalness: 0.3, roughness: 0.55, envMapIntensity: 0.6 });
    finMat.map = fitTex(THREE, finTex(THREE, bbF, BASE, teamColor), bbF);
    finMat.side = THREE.DoubleSide;
    root.add(new THREE.Mesh(slab(THREE, finPts, 0.08, "xz"), finMat));
    const fair2 = slab(THREE, [[-2.1, 0.42], [-6.4, 0.62], [-6.4, 0.34], [-2.6, 0.30]], 0.15, "xz");
    root.add(new THREE.Mesh(fair2, skin2));
    /* ECS fairing at fin root trailing edge */
    const ecs = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.14, 0.34), skin2);
    ecs.position.set(-6.85, 0, 0.72);
    root.add(ecs);
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.10, 0.12), dark);
    tip.position.set(-6.35, 0, 3.22);
    root.add(tip);
    /* ventral fins */
    for (const sgn of [-1, 1]) {
      const vf = slab(THREE, [[-4.3, -0.72], [-5.7, -1.30], [-5.85, -0.72]], 0.045, "xz");
      const m = new THREE.Mesh(vf, skin2);
      m.position.y = sgn * 0.42;
      m.rotation.x = sgn * 0.35;
      root.add(m);
    }

    /* ---------------- nozzle: turkey-feather petals + burner ---------------- */
    const nozGroup = new THREE.Group();
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * Math.PI * 2;
      const petal = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.21), steel);
      petal.material = steel;
      const r0 = 0.40;
      petal.position.set(-0.3, Math.cos(a) * r0 * 0.92, Math.sin(a) * r0 * 0.92);
      petal.rotation.x = -a + Math.PI / 2;
      petal.rotation.y = Math.PI / 2 - 0.22;
      nozGroup.add(petal);
    }
    const nozRing = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.14, 20), dark);
    nozRing.rotation.z = Math.PI / 2;
    nozRing.position.x = 0.05;
    nozGroup.add(nozRing);
    const burner = new THREE.Mesh(new THREE.CircleGeometry(0.34, 20),
      new THREE.MeshBasicMaterial({ map: burnerTex(THREE) }));
    burner.rotation.y = -Math.PI / 2;
    burner.position.x = -0.42;
    nozGroup.add(burner);
    nozGroup.position.set(-7.55, 0, 0.05);
    root.add(nozGroup);

    /* ---------------- stores: pylons + 370gal drop tanks ---------------- */
    for (const sgn of [-1, 1]) {
      const py = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.09, 0.34), skin2);
      py.position.set(-1.5, sgn * 2.35, -0.32);
      root.add(py);
      const tank = loft(THREE, [
        { x: 1.6, w: 0.01, h: 0.01, zc: 0 },
        { x: 1.1, w: 0.16, h: 0.16, zc: 0 },
        { x: 0.3, w: 0.29, h: 0.29, zc: 0 },
        { x: -0.9, w: 0.29, h: 0.29, zc: 0 },
        { x: -1.7, w: 0.17, h: 0.17, zc: 0 },
        { x: -2.1, w: 0.02, h: 0.02, zc: 0 },
      ], 16);
      const tm = new THREE.Mesh(tank, skin2);
      tm.position.set(-1.3, sgn * 2.35, -0.68);
      root.add(tm);
      for (let k = 0; k < 4; k++) {
        const fin2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.015, 0.2), skin2);
        const fa = k * Math.PI / 2 + Math.PI / 4;
        fin2.position.set(-3.0, sgn * 2.35 + Math.cos(fa) * 0.2, -0.68 + Math.sin(fa) * 0.2);
        fin2.rotation.x = fa;
        root.add(fin2);
      }
    }

    /* ---------------- wingtip rails + AIM-120 ---------------- */
    for (const sgn of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.09, 0.13), skin2);
      rail.position.set(-3.4, sgn * 4.62, -0.06);
      root.add(rail);
      const mis = new THREE.Group();
      const mBody = mat({ color: 0xc9cdd1, metalness: 0.25, roughness: 0.4 });
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 3.0, 12), mBody);
      body.rotation.z = Math.PI / 2;
      mis.add(body);
      const nc = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.5, 12), mBody);
      nc.rotation.z = -Math.PI / 2; nc.position.x = 1.75;
      mis.add(nc);
      /* seeker band */
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.088, 0.1, 12),
        mat({ color: 0x30343a, roughness: 0.5 }));
      band.rotation.z = Math.PI / 2; band.position.x = 1.45;
      mis.add(band);
      for (let k = 0; k < 4; k++) {
        const mkFin = (fx, fw) => {
          const f2 = new THREE.Mesh(new THREE.BoxGeometry(fw, 0.014, 0.2), mBody);
          f2.position.x = fx;
          f2.rotation.x = k * Math.PI / 2 + Math.PI / 4;
          f2.position.z = 0.13 * Math.sin(k * Math.PI / 2 + Math.PI / 4);
          f2.position.y = 0.13 * Math.cos(k * Math.PI / 2 + Math.PI / 4);
          mis.add(f2);
        };
        mkFin(-1.32, 0.34); mkFin(0.35, 0.3);
      }
      mis.position.set(-3.1, sgn * 4.62, -0.19);
      root.add(mis);
    }

    /* ---------------- navigation lights ---------------- */
    const lite = (color, x, y, z) => {
      const L = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8),
        new THREE.MeshBasicMaterial({ color }));
      L.position.set(x, y, z);
      root.add(L);
    };
    lite(0x2bd44a, -3.5, 4.66, 0.02);      // right tip green
    lite(0xff3b30, -3.5, -4.66, 0.02);     // left tip red
    lite(0xf5f7fa, -7.4, 0, 3.05);         // fin white
    lite(0xff3b30, 1.5, 0, 0.2);           // spine beacon

    /* ---------------- landing gear ---------------- */
    if (gear) {
      const tyre = mat({ color: 0x141518, roughness: 0.9 });
      const hub = mat({ color: 0x9aa0a6, metalness: 0.6, roughness: 0.35 });
      const strutM = steel;
      const wheel = (r, w2) => {
        const g2 = new THREE.Group();
        const ty = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w2, 16), tyre);
        g2.add(ty);
        const hb = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.45, r * 0.45, w2 + 0.02, 12), hub);
        g2.add(hb);
        return g2;
      };
      /* nose gear */
      const ns = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.25, 8), strutM);
      ns.rotation.x = Math.PI / 2;               // strut vertical (model z-up)
      ns.position.set(3.3, 0, -1.4);
      root.add(ns);
      const nw = wheel(0.26, 0.14);
      nw.position.set(3.36, 0, -2.05);
      root.add(nw);
      /* nose gear door hangs beside the strut */
      const nd = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 0.7), skin2);
      nd.position.set(3.1, 0.34, -1.5);
      nd.rotation.x = Math.PI / 2 - 0.15;
      root.add(nd);
      /* main gear */
      for (const sgn of [-1, 1]) {
        const ms = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.35, 8), strutM);
        ms.rotation.x = Math.PI / 2 + sgn * 0.28;
        ms.position.set(-0.9, sgn * 0.95, -1.35);
        root.add(ms);
        const mw = wheel(0.35, 0.22);
        mw.position.set(-0.85, sgn * 1.25, -2.0);
        root.add(mw);
        const md = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.75), skin2);
        md.position.set(-0.7, sgn * 0.75, -1.45);
        md.rotation.x = Math.PI / 2 - sgn * 0.2;
        root.add(md);
      }
    }

    /* sRGB conversion, once per material */
    root.traverse(o2 => {
      if (o2.isMesh) {
        if (o2.castShadow !== false) o2.castShadow = true;
        o2.receiveShadow = true;
        const m = o2.material;
        if (m && !m.userData._srgbDone) {
          m.userData._srgbDone = true;
          if (m.color) m.color.convertSRGBToLinear();
          if (m.emissive) m.emissive.convertSRGBToLinear();
          if (m.map) m.map.encoding = THREE.sRGBEncoding;
        }
      }
    });
    return root;
  }

  return { buildF16, loft, slab };
})();
