/* ============ models3d_hd.js — hand-finished aircraft ============
   Loaded AFTER units3d.js so these override anything the model packs define.
   Real dimensions in metres. +X nose, +Y left, +Z up. No landing gear:
   these render airborne.                                                    */
var HD_MODELS = (typeof HD_MODELS !== "undefined") ? HD_MODELS : {};

(function () {
  const M = Models3D;

  /* ---------- shared painted-skin helpers ---------- */
  function noiseOn(c, w, h, alpha, seed) {
    for (let i = 0; i < w * h / 60; i++) {
      const x = (Math.sin(seed + i * 127.1) * 0.5 + 0.5) * w;
      const y = (Math.sin(seed * 3 + i * 311.7) * 0.5 + 0.5) * h;
      const v = (Math.sin(seed * 7 + i * 74.7) * 0.5 + 0.5);
      c.fillStyle = "rgba(" + (v > 0.5 ? "255,255,255" : "0,0,0") + "," + alpha + ")";
      c.fillRect(x, y, 2, 2);
    }
  }
  /* generic low-observable skin: tonal patchwork + panel seams + staining */
  function loSkin(THREE, base, opts) {
    opts = opts || {};
    const W = 1024, H = 256;
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const c = cv.getContext("2d");
    c.fillStyle = base; c.fillRect(0, 0, W, H);
    /* faceted tonal patches — stealth jets are visibly a patchwork of panels */
    const patch = [[0.04, 0, 0.09, 1, 5], [0.15, 0.45, 0.10, 0.55, -6], [0.27, 0, 0.11, 0.5, 6],
                   [0.40, 0.5, 0.12, 0.5, -5], [0.52, 0.1, 0.10, 0.55, 5], [0.64, 0, 0.10, 1, -4],
                   [0.75, 0.35, 0.09, 0.6, 6], [0.33, 0.42, 0.18, 0.16, 8]];
    for (const [u, v, du, dv, tone] of patch) {
      c.fillStyle = "rgba(" + (tone > 0 ? "255,255,255" : "0,0,0") + "," + Math.abs(tone) / 100 + ")";
      c.fillRect(u * W, v * H, du * W, dv * H);
    }
    /* saw-tooth panel seams: the signature look of a stealth skin */
    c.strokeStyle = "rgba(16,19,22,0.4)"; c.lineWidth = 1.4;
    for (const u of [0.09, 0.18, 0.28, 0.38, 0.5, 0.62, 0.72, 0.83, 0.91]) {
      c.beginPath();
      let x = u * W;
      for (let y = 0; y <= H; y += 22) {
        const zig = (y / 22) % 2 ? 7 : -7;
        y === 0 ? c.moveTo(x + zig, y) : c.lineTo(x + zig, y);
      }
      c.stroke();
    }
    c.strokeStyle = "rgba(16,19,22,0.26)"; c.lineWidth = 1.1;
    for (const v of [0.06, 0.26, 0.48, 0.52, 0.74, 0.94]) {
      c.beginPath(); c.moveTo(0.05 * W, v * H); c.lineTo(0.95 * W, v * H); c.stroke();
    }
    /* access hatches + stencils */
    c.strokeStyle = "rgba(16,19,22,0.32)"; c.lineWidth = 1;
    for (const [u, v, w2, h2] of [[0.66, 0.2, 26, 12], [0.55, 0.66, 20, 11], [0.44, 0.24, 16, 14],
                                  [0.3, 0.7, 24, 10], [0.72, 0.72, 14, 12]]) {
      c.strokeRect(u * W, v * H, w2, h2);
    }
    c.fillStyle = "rgba(24,28,32,0.5)";
    for (let i = 0; i < 8; i++) c.fillRect(0.78 * W + (i % 3) * 9, 0.6 * H + ((i / 3) | 0) * 5, 6, 2);
    /* exhaust heat staining aft */
    const g = c.createLinearGradient(0, 0, 0.14 * W, 0);
    g.addColorStop(0, "rgba(34,30,27,0.55)"); g.addColorStop(1, "rgba(34,30,27,0)");
    c.fillStyle = g; c.fillRect(0, 0, 0.14 * W, H);
    if (opts.antiGlare) {
      c.fillStyle = "rgba(18,20,23,0.9)";
      c.fillRect(0.86 * W, 0.2 * H, 0.09 * W, 0.1 * H);
    }
    noiseOn(c, W, H, 0.03, 3.1);
    const t = new THREE.CanvasTexture(cv); t.anisotropy = 8;
    return t;
  }
  /* wing skin painted in shape space, clamped onto the outline's bbox */
  function wingSkin(THREE, bb, base, lines, teamColor) {
    const S = 26;
    const cv = document.createElement("canvas");
    cv.width = Math.max(8, Math.ceil(bb.w * S)); cv.height = Math.max(8, Math.ceil(bb.h * S));
    const c = cv.getContext("2d");
    const px = (x, y) => [(x - bb.x0) * S, (y - bb.y0) * S];
    c.fillStyle = base; c.fillRect(0, 0, cv.width, cv.height);
    c.fillStyle = "rgba(255,255,255,0.045)";
    c.fillRect(0, 0, cv.width, cv.height * 0.42);
    c.fillStyle = "rgba(0,0,0,0.05)";
    c.fillRect(0, cv.height * 0.62, cv.width, cv.height * 0.38);
    c.strokeStyle = "rgba(16,19,22,0.34)"; c.lineWidth = 1.3;
    for (const [a, b] of (lines || [])) {
      const p1 = px(a[0], a[1]), p2 = px(b[0], b[1]);
      c.beginPath(); c.moveTo(p1[0], p1[1]); c.lineTo(p2[0], p2[1]); c.stroke();
    }
    if (teamColor) {
      /* low-visibility roundel outline */
      c.strokeStyle = teamColor; c.lineWidth = 2.2;
      const ctr = px(bb.x0 + bb.w * 0.45, bb.y0 + bb.h * 0.42);
      c.beginPath(); c.arc(ctr[0], ctr[1], 9, 0, 7); c.stroke();
    }
    noiseOn(c, cv.width, cv.height, 0.035, 7.7);
    const t = new THREE.CanvasTexture(cv); t.anisotropy = 8;
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1 / bb.w, 1 / bb.h);
    t.offset.set(-bb.x0 / bb.w, -bb.y0 / bb.h);
    return t;
  }
  function bbox(pts) {
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    for (const p of pts) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
    return { x0, x1, y0, y1, w: x1 - x0, h: y1 - y0 };
  }
  function mirrorY(pts) { return pts.map(p => [p[0], -p[1]]); }
  function navLights(THREE, root, xL, yL, zL) {
    const mk = (col, x, y, z) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8),
        new THREE.MeshBasicMaterial({ color: col }));
      m.position.set(x, y, z);
      root.add(m);
    };
    mk(0x2bd44a, xL, yL, zL);      // +Y is left in model space -> starboard green mirrored below
    mk(0xff3b30, xL, -yL, zL);
  }

  /* =================================================================== B-2 */
  HD_MODELS["sbomber_n"] = {
    len: 21.0,
    build: function (THREE, M2, C) {
      const root = new THREE.Group();
      const BASE = "#42464b";

      const skinTex = loSkin(THREE, BASE, {});
      const body = new THREE.MeshStandardMaterial({
        color: 0xffffff, map: skinTex, metalness: 0.22, roughness: 0.62, envMapIntensity: 0.4,
      });
      const dark = new THREE.MeshStandardMaterial({ color: 0x25282c, metalness: 0.3, roughness: 0.55 });
      const vdark = new THREE.MeshStandardMaterial({ color: 0x101317, metalness: 0.2, roughness: 0.85 });

      /* ---- flying-wing planform: 33 deg leading edge, double-W trailing edge ---- */
      const leHalf = [[10.5, 0], [7.3, 5.0], [4.1, 10.0], [0.8, 15.0], [-2.4, 20.0],
                      [-5.2, 24.2], [-6.4, 26.2]];
      const teHalf = [[-8.6, 26.2], [-11.0, 20.0], [-8.0, 14.5], [-12.0, 9.5],
                      [-8.5, 4.5], [-12.5, 0]];
      const outline = leHalf.concat(teHalf,
        mirrorY(teHalf).reverse().slice(1),
        mirrorY(leHalf).reverse().slice(1, -1));

      const bb = bbox(outline);
      const seams = [];
      for (const y of [5, 10, 15, 20]) {
        seams.push([[10.5 - 0.649 * y + 1.2, y], [-12.0 + 0.35 * y, y]]);
        seams.push([[10.5 - 0.649 * y + 1.2, -y], [-12.0 + 0.35 * y, -y]]);
      }
      const wingMat = new THREE.MeshStandardMaterial({
        color: 0xffffff, map: wingSkin(THREE, bb, BASE, seams, C.team),
        metalness: 0.22, roughness: 0.62, envMapIntensity: 0.4,
      });
      const wing = new THREE.Mesh(M2.slab(THREE, outline, 0.62), wingMat);
      wing.position.z = -0.31;
      root.add(wing);

      /* ---- blended centre body ---- */
      root.add(new THREE.Mesh(M2.loft(THREE, [
        { x: 10.4, w: 0.18, h: 0.12, zc: 0.0 },
        { x: 8.2, w: 1.5, h: 0.52, zc: 0.16, sq: 0.8 },
        { x: 5.4, w: 3.1, h: 0.92, zc: 0.26, sq: 0.8 },
        { x: 2.2, w: 4.7, h: 1.14, zc: 0.26, sq: 0.85 },
        { x: -1.0, w: 5.5, h: 1.20, zc: 0.22, sq: 0.85 },
        { x: -4.2, w: 5.2, h: 1.00, zc: 0.16, sq: 0.85 },
        { x: -7.4, w: 4.3, h: 0.74, zc: 0.10, sq: 0.9 },
        { x: -10.4, w: 2.9, h: 0.48, zc: 0.05 },
        { x: -12.4, w: 1.1, h: 0.22, zc: 0.0 },
      ], 26), body));

      /* ---- cockpit: two flat windscreen panes low on the spine ---- */
      const glass = new THREE.MeshPhysicalMaterial({
        color: 0x14181c, metalness: 0.3, roughness: 0.08,
        envMapIntensity: 1.5, clearcoat: 1, clearcoatRoughness: 0.06,
      });
      const can = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), glass);
      can.scale.set(1.55, 1.05, 0.42);
      can.position.set(7.0, 0, 0.72);
      root.add(can);
      for (const sgn of [-1, 1]) {
        const side = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 0.5), glass);
        side.position.set(6.6, sgn * 1.02, 0.62);
        side.rotation.x = sgn * 0.25;
        root.add(side);
      }
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.2, 0.16), dark);
      frame.position.set(7.05, 0, 0.94);
      root.add(frame);

      /* ---- upper-surface intakes: two boxy fairings, dark serrated mouths ---- */
      for (const sgn of [-1, 1]) {
        const fair = new THREE.Mesh(M2.loft(THREE, [
          { x: 4.6, w: 1.5, h: 0.30, zc: 1.10, sq: 0.85 },
          { x: 3.2, w: 1.7, h: 0.52, zc: 1.20, sq: 0.85 },
          { x: 1.2, w: 1.7, h: 0.55, zc: 1.20, sq: 0.85 },
          { x: -0.8, w: 1.5, h: 0.42, zc: 1.10, sq: 0.9 },
        ], 18), body);
        fair.position.y = sgn * 5.6;
        root.add(fair);
        const mouth = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.62), vdark);
        mouth.rotation.y = -Math.PI / 2 + 0.35;
        mouth.rotation.z = Math.PI / 2;
        mouth.position.set(4.5, sgn * 5.6, 1.12);
        root.add(mouth);
        /* serrated lip */
        for (let i = 0; i < 5; i++) {
          const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.5, 3), dark);
          tooth.rotation.z = -Math.PI / 2;
          tooth.position.set(4.75, sgn * 5.6 - 1.0 + i * 0.5, 1.16);
          root.add(tooth);
        }
      }

      /* ---- exhaust trenches: shallow dark troughs on the upper aft surface ---- */
      for (const sgn of [-1, 1]) {
        const trench = new THREE.Mesh(new THREE.BoxGeometry(5.4, 2.2, 0.16), vdark);
        trench.position.set(-4.6, sgn * 5.6, 0.86);
        root.add(trench);
        const lipL = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.16, 0.3), dark);
        lipL.position.set(-4.6, sgn * 5.6 + 1.1, 0.92); root.add(lipL);
        const lipR = lipL.clone(); lipR.position.y = sgn * 5.6 - 1.1; root.add(lipR);
        /* heat tiles behind the trench */
        const tiles = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.3, 0.08),
          new THREE.MeshStandardMaterial({ color: 0x2f3136, roughness: 0.9 }));
        tiles.position.set(-8.6, sgn * 5.6, 0.36);
        root.add(tiles);
      }

      /* ---- weapons bay doors on the belly ---- */
      for (const sgn of [-1, 1]) {
        const bay = new THREE.Mesh(new THREE.BoxGeometry(6.2, 1.9, 0.1), dark);
        bay.position.set(-0.5, sgn * 2.4, -0.66);
        root.add(bay);
      }
      /* ---- GPS/antenna blisters + air data ports ---- */
      for (const [x, y] of [[3.0, 0], [-2.5, 0], [-6.0, 2.0], [-6.0, -2.0]]) {
        const bl = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), dark);
        bl.position.set(x, y, 1.02);
        root.add(bl);
      }
      navLights(THREE, root, -6.2, 25.6, 0.1);
      root.userData.len = 21.0;
      return root;
    },
  };

  /* ================================================================== F-22 */
  HD_MODELS["stealth_n"] = {
    len: 18.9,
    build: function (THREE, M2, C) {
      const root = new THREE.Group();
      const BASE = "#6e747b";

      const body = new THREE.MeshStandardMaterial({
        color: 0xffffff, map: loSkin(THREE, BASE, { antiGlare: true }),
        metalness: 0.34, roughness: 0.5, envMapIntensity: 0.55,
      });
      const body2 = new THREE.MeshStandardMaterial({ color: 0x5f656c, metalness: 0.34, roughness: 0.52 });
      const dark = new THREE.MeshStandardMaterial({ color: 0x2a2e33, metalness: 0.4, roughness: 0.5 });
      const vdark = new THREE.MeshStandardMaterial({ color: 0x0e1114, roughness: 0.9 });
      const steel = new THREE.MeshStandardMaterial({ color: 0x8b9197, metalness: 0.85, roughness: 0.32 });

      /* ---- faceted chined fuselage ---- */
      root.add(new THREE.Mesh(M2.loft(THREE, [
        { x: 9.45, w: 0.09, h: 0.07, zc: 0.0 },
        { x: 8.4, w: 0.42, h: 0.26, zc: 0.02, sq: 0.7 },
        { x: 7.0, w: 0.82, h: 0.48, zc: 0.06, sq: 0.65 },
        { x: 5.2, w: 1.18, h: 0.66, zc: 0.10, sq: 0.62 },
        { x: 3.0, w: 1.62, h: 0.80, zc: 0.06, sq: 0.6 },
        { x: 0.6, w: 1.86, h: 0.86, zc: 0.0, sq: 0.62 },
        { x: -2.0, w: 1.84, h: 0.84, zc: 0.0, sq: 0.65 },
        { x: -4.6, w: 1.70, h: 0.78, zc: 0.02, sq: 0.7 },
        { x: -7.0, w: 1.50, h: 0.68, zc: 0.04, sq: 0.75 },
        { x: -9.0, w: 1.34, h: 0.58, zc: 0.04, sq: 0.8 },
        { x: -9.45, w: 1.30, h: 0.55, zc: 0.04, sq: 0.8 },
      ], 22), body));

      /* ---- diamond wing: 42 deg LE, forward-swept TE ---- */
      const wingPts = [[2.6, 1.75], [-1.8, 6.78], [-3.6, 6.78], [-5.15, 1.95], [-4.6, 1.7]];
      const bbW = bbox(wingPts);
      const seams = [[[1.4, 2.4], [-3.9, 6.2]], [[-0.2, 2.2], [-2.6, 4.6]],
                     [[-3.9, 2.1], [-3.1, 6.3]]];
      const wMatR = new THREE.MeshStandardMaterial({
        color: 0xffffff, map: wingSkin(THREE, bbW, BASE, seams, C.team),
        metalness: 0.34, roughness: 0.5, envMapIntensity: 0.55,
      });
      const wr = new THREE.Mesh(M2.slab(THREE, wingPts, 0.20), wMatR);
      wr.position.z = -0.1; root.add(wr);
      const wingL = mirrorY(wingPts).reverse();
      const bbL = bbox(wingL);
      const wMatL = new THREE.MeshStandardMaterial({
        color: 0xffffff, map: wingSkin(THREE, bbL, BASE, seams.map(s => [[s[0][0], -s[0][1]], [s[1][0], -s[1][1]]]), C.team),
        metalness: 0.34, roughness: 0.5, envMapIntensity: 0.55,
      });
      const wl = new THREE.Mesh(M2.slab(THREE, wingL, 0.20), wMatL);
      wl.position.z = -0.1; root.add(wl);

      /* ---- LERX / forebody chines running to the nose ---- */
      for (const sgn of [-1, 1]) {
        const lerx = M2.slab(THREE, sgn > 0
          ? [[8.0, 0.28], [2.7, 1.80], [2.7, 1.05]]
          : [[8.0, -0.28], [2.7, -1.05], [2.7, -1.80]], 0.10);
        const m = new THREE.Mesh(lerx, body2);
        m.position.z = 0.02; root.add(m);
      }

      /* ---- all-moving stabilators ---- */
      for (const sgn of [-1, 1]) {
        const pts = sgn > 0
          ? [[-5.4, 1.55], [-8.2, 4.35], [-9.5, 4.35], [-9.4, 1.5]]
          : [[-5.4, -1.55], [-9.4, -1.5], [-9.5, -4.35], [-8.2, -4.35]];
        const m = new THREE.Mesh(M2.slab(THREE, pts, 0.16), body2);
        m.position.z = -0.05; root.add(m);
      }

      /* ---- twin canted vertical tails ---- */
      for (const sgn of [-1, 1]) {
        const fin = M2.slab(THREE, [[-3.3, 0.15], [-6.4, 3.25], [-7.9, 3.25], [-7.6, 0.15]], 0.16, "xz");
        const m = new THREE.Mesh(fin, body2);
        m.position.set(0, sgn * 1.75, 0.35);
        m.rotation.x = sgn * 0.49;                 // 28 degrees outward cant
        root.add(m);
        /* fin flash */
        const flash = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.5),
          new THREE.MeshStandardMaterial({ color: C.team, roughness: 0.6, side: THREE.DoubleSide }));
        flash.rotation.y = Math.PI / 2;
        flash.position.set(-6.9, sgn * 1.75 + sgn * 1.35, 2.9);
        flash.rotation.x = sgn * 0.49;
        root.add(flash);
      }

      /* ---- caret intakes: rearward-raked trapezoid mouths ---- */
      for (const sgn of [-1, 1]) {
        const duct = M2.loft(THREE, [
          { x: 4.5, w: 0.52, h: 0.46, zc: -0.18, sq: 0.62 },
          { x: 3.0, w: 0.60, h: 0.52, zc: -0.16, sq: 0.62 },
          { x: 0.5, w: 0.60, h: 0.50, zc: -0.12, sq: 0.65 },
          { x: -1.8, w: 0.52, h: 0.44, zc: -0.08, sq: 0.7 },
        ], 16);
        const d = new THREE.Mesh(duct, body2);
        d.position.y = sgn * 1.62;
        root.add(d);
        const mouth = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.9), vdark);
        mouth.rotation.y = -Math.PI / 2;
        mouth.rotation.z = sgn * 0.30;             // raked caret
        mouth.position.set(4.52, sgn * 1.62, -0.18);
        root.add(mouth);
        /* diverterless ramp lip */
        const lip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.9), dark);
        lip.position.set(4.55, sgn * 2.12, -0.18);
        lip.rotation.x = sgn * 0.3;
        root.add(lip);
      }

      /* ---- 2D thrust-vectoring nozzles with serrated edges ---- */
      for (const sgn of [-1, 1]) {
        const noz = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.86, 0.66), steel);
        noz.position.set(-9.9, sgn * 0.72, 0.02);
        root.add(noz);
        const core = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.54),
          new THREE.MeshStandardMaterial({ color: 0x191413, emissive: 0x2a1206, roughness: 1 }));
        core.rotation.y = Math.PI / 2;
        core.position.set(-10.66, sgn * 0.72, 0.02);
        root.add(core);
        for (let i = 0; i < 4; i++) {
          const t1 = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.36, 3), steel);
          t1.rotation.z = Math.PI / 2;
          t1.position.set(-10.75, sgn * 0.72 - 0.33 + i * 0.22, 0.36);
          root.add(t1);
          const t2 = t1.clone(); t2.position.z = -0.32; root.add(t2);
        }
      }

      /* ---- bubble canopy: gold-tinted, framed, with a seat inside ---- */
      const tub = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.72, 0.46),
        new THREE.MeshStandardMaterial({ color: 0x14171b, roughness: 0.9 }));
      tub.position.set(6.1, 0, 0.42); root.add(tub);
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x1d2126, roughness: 0.85 }));
      seat.position.set(5.5, 0, 0.72); seat.rotation.y = 0.2; root.add(seat);
      const helm = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10),
        new THREE.MeshStandardMaterial({ color: 0x3b4046, roughness: 0.5 }));
      helm.position.set(5.95, 0, 0.92); root.add(helm);

      const canMat = new THREE.MeshPhysicalMaterial({
        color: 0x2b2418, metalness: 0.3, roughness: 0.07,
        transparent: true, opacity: 0.6, envMapIntensity: 1.6,
        clearcoat: 1, clearcoatRoughness: 0.05, side: THREE.DoubleSide,
      });
      const can = new THREE.Mesh(new THREE.SphereGeometry(1, 26, 18), canMat);
      can.scale.set(1.75, 0.62, 0.58);
      can.position.set(6.3, 0, 0.66);
      can.castShadow = false;
      root.add(can);
      const bow = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.035, 8, 22, Math.PI), dark);
      bow.rotation.y = Math.PI / 2; bow.rotation.z = Math.PI / 2;
      bow.position.set(7.55, 0, 0.5);
      root.add(bow);
      /* spine fairing behind the canopy */
      root.add(new THREE.Mesh(M2.loft(THREE, [
        { x: 4.9, w: 0.55, h: 0.34, zc: 0.5 },
        { x: 2.4, w: 0.5, h: 0.22, zc: 0.42 },
        { x: -0.6, w: 0.42, h: 0.12, zc: 0.32 },
      ], 14), body2));

      /* ---- radome + air data probes ---- */
      root.add(new THREE.Mesh(M2.loft(THREE, [
        { x: 9.5, w: 0.05, h: 0.04, zc: 0 },
        { x: 8.7, w: 0.32, h: 0.2, zc: 0.02, sq: 0.7 },
        { x: 8.0, w: 0.5, h: 0.31, zc: 0.04, sq: 0.68 },
      ], 16), new THREE.MeshStandardMaterial({ color: 0x4e545a, roughness: 0.72 })));
      for (const sgn of [-1, 1]) {
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.32, 6), steel);
        p.rotation.z = Math.PI / 2;
        p.position.set(8.5, sgn * 0.3, 0.05);
        root.add(p);
      }
      /* gun port shoulder bulge, starboard wing root */
      const gunB = new THREE.Mesh(new THREE.SphereGeometry(0.26, 10, 8), body2);
      gunB.scale.set(1.6, 1, 0.7);
      gunB.position.set(2.9, -1.5, 0.42);
      root.add(gunB);
      navLights(THREE, root, -2.6, 6.6, 0.0);
      root.userData.len = 18.9;
      return root;
    },
  };

  /* ---- publish: HD models win over anything the generated packs defined ---- */
  function publish() {
    if (typeof UNIT_MODELS === "undefined") return;
    for (const k in HD_MODELS) {
      if (k === "__publish" || typeof HD_MODELS[k] !== "object") continue;
      UNIT_MODELS[k] = HD_MODELS[k];
    }
    /* the hand-built F-16 lives in models3d.js — expose it the same way */
    if (Models3D && Models3D.buildF16) {
      UNIT_MODELS["fighter_n"] = {
        len: 15.0,
        build: function (THREE, M2, C) {
          const g = Models3D.buildF16(THREE, { teamColor: C.team, gear: false });
          g.userData.len = 15.0;
          return g;
        },
      };
    }
  }
  publish();
  HD_MODELS.__publish = publish;   // called again if a pack loads late
})();
