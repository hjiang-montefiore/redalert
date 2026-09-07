/* ============ models3d_east.js — Eastern & PLA fifth-gen and heavy bombers ============
   Su-57, J-20, Tu-160M, H-6N. Loaded after models3d_hd.js; registered into
   UNIT_MODELS by the shared publish() hook.                                */
var HD_MODELS = (typeof HD_MODELS !== "undefined") ? HD_MODELS : {};

HD_MODELS["sbomber_p"] = { len: 54.1, build: function (THREE, M, C) {
  var G = new THREE.Group();
  var PI = Math.PI, i, x;

  function mesh(g, m) {
    if (g && g.isObject3D) { g.traverse(function (o) { if (o.isMesh) { o.material = m; } }); return g; }
    return new THREE.Mesh(g, m);
  }
  function put(g, m, px, py, pz, par) {
    var o = mesh(g, m);
    o.position.set(px, py, pz);
    (par || G).add(o);
    return o;
  }
  function mir(p) { var r = [], k; for (k = p.length - 1; k >= 0; k--) { r.push([p[k][0], -p[k][1]]); } return r; }
  /* half-hoop standing in the YZ plane, arching over +Z */
  function bowGeo(R, t) { return new THREE.TorusGeometry(R, t, 5, 16, PI).rotateZ(PI / 2).rotateY(PI / 2); }

  /* ---------------- painted skin ---------------- */
  function skinTex(base, line, stain) {
    var cv = document.createElement("canvas");
    cv.width = 1024; cv.height = 512;
    var g = cv.getContext("2d"), n, ax, ay, aw, ah, al, gr, words;
    g.fillStyle = base; g.fillRect(0, 0, 1024, 512);
    for (n = 0; n < 120; n++) {                                    /* tonal patches, 3-8% */
      ax = Math.random() * 1024; ay = Math.random() * 512;
      aw = 22 + Math.random() * 150; ah = 14 + Math.random() * 70;
      al = 0.03 + Math.random() * 0.05;
      g.fillStyle = (n % 3 === 0 ? "rgba(255,255,255," : "rgba(0,0,0,") + al.toFixed(3) + ")";
      g.fillRect(ax, ay, aw, ah);
    }
    g.lineWidth = 1;
    for (ay = 0; ay <= 512; ay += 32) {                            /* stringer seams */
      g.strokeStyle = "rgba(" + line + "," + (ay % 64 === 0 ? 0.36 : 0.2) + ")";
      g.beginPath(); g.moveTo(0, ay + 0.5); g.lineTo(1024, ay + 0.5); g.stroke();
    }
    for (ax = 0; ax <= 1024; ax += 34) {                           /* frame seams */
      g.strokeStyle = "rgba(" + line + "," + (ax % 102 === 0 ? 0.36 : 0.18) + ")";
      g.beginPath(); g.moveTo(ax + 0.5, 0); g.lineTo(ax + 0.5, 512); g.stroke();
    }
    for (n = 0; n < 30; n++) {                                     /* access hatches */
      ax = Math.round(Math.random() * 29) * 34; ay = Math.round(Math.random() * 14) * 32;
      aw = 34 * (1 + ((Math.random() * 2) | 0)); ah = 32;
      g.fillStyle = "rgba(0,0,0,0.05)"; g.fillRect(ax, ay, aw, ah);
      g.strokeStyle = "rgba(" + line + ",0.5)"; g.strokeRect(ax + 0.5, ay + 0.5, aw, ah);
    }
    g.fillStyle = "rgba(" + line + ",0.16)";                       /* rivet runs */
    for (ay = 16; ay < 512; ay += 64) { for (ax = 4; ax < 1024; ax += 7) { g.fillRect(ax, ay, 1, 1); } }
    if (g.fillText) {                                              /* stencils */
      words = ["NO STEP", "RESCUE", "GROUND", "FUEL", "INTAKE", "SERVICE", "OIL"];
      g.font = "bold 10px monospace";
      for (n = 0; n < 26; n++) {
        g.fillStyle = "rgba(" + line + ",0.55)";
        g.fillText(words[n % 7], Math.random() * 940, 14 + Math.random() * 486);
      }
      g.fillStyle = "rgba(150,32,28,0.5)";
      for (n = 0; n < 9; n++) { g.fillText("DANGER", Math.random() * 940, 14 + Math.random() * 486); }
    }
    gr = g.createLinearGradient(650, 0, 1024, 0);                  /* exhaust staining aft */
    gr.addColorStop(0, "rgba(" + stain + ",0)");
    gr.addColorStop(1, "rgba(" + stain + ",0.30)");
    g.fillStyle = gr; g.fillRect(650, 0, 374, 512);
    for (n = 0; n < 50; n++) {
      ay = Math.random() * 512;
      g.fillStyle = "rgba(" + stain + "," + (0.03 + Math.random() * 0.06).toFixed(3) + ")";
      g.fillRect(690 + Math.random() * 240, ay, 60 + Math.random() * 280, 2 + Math.random() * 5);
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 4;
    return t;
  }

  var matSkin = new THREE.MeshStandardMaterial({ map: skinTex("#e9e7df", "84,90,98", "48,42,38"), color: 0xffffff, metalness: 0.28, roughness: 0.52, side: THREE.DoubleSide });
  var matDark = new THREE.MeshStandardMaterial({ color: 0x474d53, metalness: 0.3, roughness: 0.58, side: THREE.DoubleSide });
  var matHot  = new THREE.MeshStandardMaterial({ color: 0x2b2d2f, metalness: 0.4, roughness: 0.45, side: THREE.DoubleSide });
  var matVoid = new THREE.MeshStandardMaterial({ color: 0x0a0b0c, metalness: 0.25, roughness: 0.92, emissive: 0x140b06, emissiveIntensity: 0.4, side: THREE.DoubleSide });
  var matGlass = new THREE.MeshPhysicalMaterial({ color: 0x141c22, metalness: 0.35, roughness: 0.09, clearcoat: 1, clearcoatRoughness: 0.06, transparent: true, opacity: 0.86 });
  var matTeam = new THREE.MeshStandardMaterial({ color: new THREE.Color(C && C.team ? C.team : "#b03a30"), metalness: 0.25, roughness: 0.6, side: THREE.DoubleSide });
  var matNavR = new THREE.MeshStandardMaterial({ color: 0x400808, emissive: 0xff2010, emissiveIntensity: 1.1, roughness: 0.4 });
  var matNavG = new THREE.MeshStandardMaterial({ color: 0x063a12, emissive: 0x18ff40, emissiveIntensity: 1.1, roughness: 0.4 });

  /* ---------------- long area-ruled blended fuselage ---------------- */
  var FS = [
    { x:  20.20, w: 1.50, h: 1.30, zc: 0.30, sq: 0.70 },
    { x:  18.60, w: 1.68, h: 1.46, zc: 0.34, sq: 0.72 },
    { x:  17.00, w: 1.82, h: 1.60, zc: 0.42, sq: 0.74 },
    { x:  15.20, w: 1.92, h: 1.72, zc: 0.46, sq: 0.76 },
    { x:  13.00, w: 2.00, h: 1.78, zc: 0.38, sq: 0.78 },
    { x:  10.00, w: 2.10, h: 1.86, zc: 0.26, sq: 0.80 },
    { x:   6.00, w: 2.24, h: 1.94, zc: 0.12, sq: 0.84 },
    { x:   2.00, w: 2.34, h: 1.94, zc: 0.05, sq: 0.86 },
    { x:  -2.00, w: 2.36, h: 1.92, zc: 0.03, sq: 0.86 },
    { x:  -6.00, w: 2.32, h: 1.90, zc: 0.03, sq: 0.86 },
    { x: -10.00, w: 2.20, h: 1.84, zc: 0.06, sq: 0.84 },
    { x: -14.00, w: 1.98, h: 1.68, zc: 0.12, sq: 0.82 },
    { x: -18.00, w: 1.66, h: 1.44, zc: 0.20, sq: 0.78 },
    { x: -21.50, w: 1.28, h: 1.14, zc: 0.28, sq: 0.74 },
    { x: -24.50, w: 0.86, h: 0.80, zc: 0.34, sq: 0.72 },
    { x: -26.40, w: 0.52, h: 0.50, zc: 0.38, sq: 0.70 },
    { x: -27.05, w: 0.26, h: 0.26, zc: 0.40, sq: 0.70 }
  ];
  function fs(xx, key) {
    var a, b, t, k;
    if (xx >= FS[0].x) { return FS[0][key]; }
    if (xx <= FS[FS.length - 1].x) { return FS[FS.length - 1][key]; }
    for (k = 0; k < FS.length - 1; k++) {
      a = FS[k]; b = FS[k + 1];
      if (xx <= a.x && xx >= b.x) { t = (xx - a.x) / (b.x - a.x); return a[key] + (b[key] - a[key]) * t; }
    }
    return FS[0][key];
  }
  function belly(xx) { return fs(xx, "zc") - fs(xx, "h"); }
  function crown(xx) { return fs(xx, "zc") + fs(xx, "h"); }

  put(M.loft(THREE, FS, 28), matSkin, 0, 0, 0);

  /* sharply pointed dark radome */
  put(M.loft(THREE, [
    { x: 27.05, w: 0.05, h: 0.05, zc: 0.10, sq: 0.60 },
    { x: 26.20, w: 0.26, h: 0.26, zc: 0.12, sq: 0.60 },
    { x: 24.60, w: 0.58, h: 0.56, zc: 0.16, sq: 0.62 },
    { x: 22.80, w: 0.94, h: 0.86, zc: 0.20, sq: 0.65 },
    { x: 21.40, w: 1.22, h: 1.08, zc: 0.24, sq: 0.68 },
    { x: 20.20, w: 1.47, h: 1.28, zc: 0.29, sq: 0.70 },
    { x: 19.60, w: 1.55, h: 1.33, zc: 0.31, sq: 0.70 }
  ], 24), matDark, 0, 0, 0);

  /* ---------------- wide fixed glove ---------------- */
  var glove = [[10.6, 0.0], [9.4, 1.4], [7.0, 3.0], [3.6, 5.1], [2.2, 6.05],
               [-1.0, 6.30], [-8.4, 6.30], [-11.6, 3.4], [-13.4, 0.0]];
  put(M.slab(THREE, glove, 0.95), matSkin, 0, 0, -0.20);
  put(M.slab(THREE, mir(glove), 0.95), matSkin, 0, 0, -0.20);

  /* ---------------- variable-geometry outer panels, ~35 deg ---------------- */
  var panel = [[2.10, 5.90], [-12.60, 24.20], [-13.60, 24.85], [-15.60, 24.50], [-8.40, 5.90]];
  function outerWing(sd) {
    var g0 = new THREE.Group(), lt, rd;
    g0.add(mesh(M.slab(THREE, sd > 0 ? panel : mir(panel), 0.50), matSkin));
    lt = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), sd > 0 ? matNavR : matNavG);
    lt.position.set(-13.15, sd * 24.55, 0.05);
    g0.add(lt);
    rd = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.055, 18), matTeam);
    rd.rotation.x = PI / 2;
    rd.position.set(-6.4, sd * 12.0, 0.27);
    g0.add(rd);
    g0.position.set(0, 0, -0.18);
    g0.rotation.x = sd * 0.036;
    G.add(g0);
  }
  outerWing(1); outerWing(-1);

  /* pivot fairings over the glove joint */
  var pf = [
    { x:  4.20, w: 0.22, h: 0.16, zc: 0, sq: 0.7 },
    { x:  2.00, w: 0.50, h: 0.36, zc: 0, sq: 0.75 },
    { x: -3.00, w: 0.56, h: 0.42, zc: 0, sq: 0.8 },
    { x: -7.00, w: 0.48, h: 0.36, zc: 0, sq: 0.8 },
    { x: -9.60, w: 0.20, h: 0.15, zc: 0, sq: 0.75 }
  ];
  put(M.loft(THREE, pf, 12), matSkin, 0, 5.85, 0.30);
  put(M.loft(THREE, pf, 12), matSkin, 0, -5.85, 0.30);

  /* ---------------- two paired nacelle boxes = four engines ---------------- */
  var NB = [
    { x:   3.90, w: 1.60, h: 0.84, zc: 0, sq: 0.86 },
    { x:   3.00, w: 1.74, h: 0.94, zc: 0, sq: 0.86 },
    { x:  -2.00, w: 1.78, h: 0.97, zc: 0, sq: 0.86 },
    { x:  -8.00, w: 1.76, h: 0.96, zc: 0, sq: 0.84 },
    { x: -12.00, w: 1.68, h: 0.92, zc: 0, sq: 0.80 },
    { x: -14.60, w: 1.58, h: 0.86, zc: 0, sq: 0.76 }
  ];
  function nacelle(sd) {
    var yc = sd * 3.70, zc = -1.36, dy, k;
    put(M.loft(THREE, NB, 20), matSkin, 0, yc, zc);
    for (k = -1; k <= 1; k += 2) {
      dy = yc + k * 0.86;
      /* round intake: proud lip, dark recessed throat */
      put(new THREE.CylinderGeometry(0.80, 0.80, 0.36, 18, 1, true).rotateZ(-PI / 2), matSkin, 3.86, dy, zc);
      put(new THREE.CylinderGeometry(0.72, 0.72, 1.30, 18, 1, true).rotateZ(-PI / 2), matHot, 3.35, dy, zc);
      put(new THREE.CircleGeometry(0.72, 18).rotateY(PI / 2), matVoid, 2.80, dy, zc);
      /* round nozzle: darker converging ring, dark core */
      put(new THREE.CylinderGeometry(0.80, 0.62, 1.25, 18, 1, true).rotateZ(-PI / 2), matHot, -15.15, dy, zc);
      put(new THREE.CircleGeometry(0.60, 18).rotateY(-PI / 2), matVoid, -15.60, dy, zc);
    }
    put(new THREE.BoxGeometry(1.5, 0.10, 0.80), matHot, 3.30, yc, zc);   /* splitter */
  }
  nacelle(1); nacelle(-1);

  /* ---------------- two long weapons-bay doors ---------------- */
  function bay(x0, x1) {
    var s = [], k, xx;
    for (k = 0; k <= 6; k++) {
      xx = x0 + (x1 - x0) * k / 6;
      s.push({ x: xx, w: (k === 0 || k === 6) ? 0.92 : 1.12, h: 0.09, zc: belly(xx) + 0.05, sq: 0.9 });
    }
    put(M.loft(THREE, s, 10), matSkin, 0, 0, 0);
    s = [];
    for (k = 0; k <= 6; k++) {
      xx = x0 + (x1 - x0) * k / 6;
      s.push({ x: xx, w: 0.045, h: 0.10, zc: belly(xx) + 0.05, sq: 0.9 });
    }
    put(M.loft(THREE, s, 6), matHot, 0, 0, 0);
    put(new THREE.BoxGeometry(0.07, 2.24, 0.11), matHot, x0, 0, belly(x0) + 0.05);
    put(new THREE.BoxGeometry(0.07, 2.24, 0.11), matHot, x1, 0, belly(x1) + 0.05);
  }
  bay(8.6, -2.6); bay(-3.4, -14.2);

  /* ---------------- fin junction fairing + tall swept fin ---------------- */
  var spine = [];
  for (i = 0; i <= 7; i++) { x = -1.0 - i * 2.0; spine.push({ x: x, w: 0.44 - i * 0.014, h: 0.34, zc: crown(x) - 0.17, sq: 0.8 }); }
  put(M.loft(THREE, spine, 12), matSkin, 0, 0, 0);

  put(M.slab(THREE, [[-9.20, 1.20], [-14.00, 5.15], [-19.85, 5.15], [-20.35, 1.20]], 0.46, "xz"), matSkin, 0, 0, 0);
  put(M.slab(THREE, [[-14.15, 5.32], [-17.35, 9.00], [-18.50, 9.30], [-20.40, 9.05], [-20.05, 5.32]], 0.40, "xz"), matSkin, 0, 0, 0);
  put(new THREE.BoxGeometry(6.1, 0.50, 0.07), matHot, -17.10, 0, 5.24);        /* all-moving joint */
  put(M.loft(THREE, [
    { x: -16.90, w: 0.14, h: 0.14, zc: 0, sq: 0.7 },
    { x: -18.20, w: 0.26, h: 0.26, zc: 0, sq: 0.7 },
    { x: -20.60, w: 0.20, h: 0.20, zc: 0, sq: 0.7 }
  ], 10), matDark, 0, 0, 9.34);
  put(new THREE.BoxGeometry(1.7, 0.43, 1.0), matTeam, -18.60, 0, 7.50);        /* fin flash */

  /* ---------------- low-set all-moving stabilizers ---------------- */
  var stab = [[-13.60, 0.90], [-19.10, 6.20], [-20.20, 6.60], [-21.80, 6.30], [-19.30, 0.90]];
  function tailplane(sd) {
    var o = put(M.slab(THREE, sd > 0 ? stab : mir(stab), 0.36), matSkin, 0, 0, -0.38);
    o.rotation.x = -sd * 0.06;
  }
  tailplane(1); tailplane(-1);

  /* ---------------- cockpit glazing ---------------- */
  put(M.loft(THREE, [
    { x: 18.40, w: 0.50, h: 0.52, zc: 1.30, sq: 0.72 },
    { x: 17.20, w: 0.95, h: 0.55, zc: 1.62, sq: 0.74 },
    { x: 16.00, w: 1.20, h: 0.55, zc: 1.72, sq: 0.78 },
    { x: 14.60, w: 1.25, h: 0.55, zc: 1.80, sq: 0.80 },
    { x: 13.40, w: 1.10, h: 0.50, zc: 1.78, sq: 0.80 },
    { x: 12.40, w: 0.85, h: 0.42, zc: 1.72, sq: 0.78 }
  ], 18), matGlass, 0, 0, 0);
  put(bowGeo(1.20, 0.05), matSkin, 16.60, 0, 1.78).scale.set(1, 1, 0.42);
  put(bowGeo(1.14, 0.05), matSkin, 14.10, 0, 1.80).scale.set(1, 1, 0.46);

  /* ---------------- small kit ---------------- */
  put(new THREE.BoxGeometry(0.90, 0.06, 0.42), matSkin, 8.50, 0, crown(8.50) + 0.14);
  put(new THREE.BoxGeometry(0.70, 0.06, 0.34), matSkin, 4.00, 0, crown(4.00) + 0.12);
  put(new THREE.BoxGeometry(0.80, 0.06, 0.38), matDark, 12.00, 0, belly(12.00) - 0.14);
  put(new THREE.BoxGeometry(0.50, 0.05, 0.26), matDark, -19.50, 0, belly(-19.50) - 0.10);
  for (i = -1; i <= 1; i += 2) {
    put(new THREE.CylinderGeometry(0.035, 0.035, 0.55, 6), matHot, 22.60, i * 0.72, 0.35);
  }
  put(new THREE.SphereGeometry(0.12, 8, 6), matNavR, -20.55, 0, 9.05);
  put(new THREE.SphereGeometry(0.14, 8, 6), matVoid, -27.00, 0, 0.40);

  return G;
} };

HD_MODELS["sbomber_c"] = { len: 34.8, build: function (THREE, M, C) {
  var G = new THREE.Group();
  var PI = Math.PI, i, x;

  function mesh(g, m) {
    if (g && g.isObject3D) { g.traverse(function (o) { if (o.isMesh) { o.material = m; } }); return g; }
    return new THREE.Mesh(g, m);
  }
  function put(g, m, px, py, pz, par) {
    var o = mesh(g, m);
    o.position.set(px, py, pz);
    (par || G).add(o);
    return o;
  }
  function mir(p) { var r = [], k; for (k = p.length - 1; k >= 0; k--) { r.push([p[k][0], -p[k][1]]); } return r; }
  function bowGeo(R, t) { return new THREE.TorusGeometry(R, t, 5, 14, PI).rotateZ(PI / 2).rotateY(PI / 2); }

  function skinTex(base, line, stain) {
    var cv = document.createElement("canvas");
    cv.width = 1024; cv.height = 512;
    var g = cv.getContext("2d"), n, ax, ay, aw, ah, al, gr, words;
    g.fillStyle = base; g.fillRect(0, 0, 1024, 512);
    for (n = 0; n < 120; n++) {
      ax = Math.random() * 1024; ay = Math.random() * 512;
      aw = 22 + Math.random() * 150; ah = 14 + Math.random() * 70;
      al = 0.03 + Math.random() * 0.05;
      g.fillStyle = (n % 3 === 0 ? "rgba(255,255,255," : "rgba(0,0,0,") + al.toFixed(3) + ")";
      g.fillRect(ax, ay, aw, ah);
    }
    g.lineWidth = 1;
    for (ay = 0; ay <= 512; ay += 30) {
      g.strokeStyle = "rgba(" + line + "," + (ay % 60 === 0 ? 0.38 : 0.22) + ")";
      g.beginPath(); g.moveTo(0, ay + 0.5); g.lineTo(1024, ay + 0.5); g.stroke();
    }
    for (ax = 0; ax <= 1024; ax += 30) {
      g.strokeStyle = "rgba(" + line + "," + (ax % 90 === 0 ? 0.38 : 0.2) + ")";
      g.beginPath(); g.moveTo(ax + 0.5, 0); g.lineTo(ax + 0.5, 512); g.stroke();
    }
    for (n = 0; n < 32; n++) {
      ax = Math.round(Math.random() * 33) * 30; ay = Math.round(Math.random() * 16) * 30;
      aw = 30 * (1 + ((Math.random() * 2) | 0)); ah = 30;
      g.fillStyle = "rgba(0,0,0,0.055)"; g.fillRect(ax, ay, aw, ah);
      g.strokeStyle = "rgba(" + line + ",0.5)"; g.strokeRect(ax + 0.5, ay + 0.5, aw, ah);
    }
    g.fillStyle = "rgba(" + line + ",0.18)";
    for (ay = 15; ay < 512; ay += 60) { for (ax = 4; ax < 1024; ax += 7) { g.fillRect(ax, ay, 1, 1); } }
    if (g.fillText) {
      words = ["NO STEP", "RESCUE", "GROUND", "FUEL", "INTAKE", "SERVICE", "OIL"];
      g.font = "bold 10px monospace";
      for (n = 0; n < 24; n++) {
        g.fillStyle = "rgba(" + line + ",0.5)";
        g.fillText(words[n % 7], Math.random() * 940, 14 + Math.random() * 486);
      }
      g.fillStyle = "rgba(140,30,26,0.5)";
      for (n = 0; n < 8; n++) { g.fillText("DANGER", Math.random() * 940, 14 + Math.random() * 486); }
    }
    gr = g.createLinearGradient(620, 0, 1024, 0);
    gr.addColorStop(0, "rgba(" + stain + ",0)");
    gr.addColorStop(1, "rgba(" + stain + ",0.34)");
    g.fillStyle = gr; g.fillRect(620, 0, 404, 512);
    for (n = 0; n < 54; n++) {
      ay = Math.random() * 512;
      g.fillStyle = "rgba(" + stain + "," + (0.03 + Math.random() * 0.07).toFixed(3) + ")";
      g.fillRect(660 + Math.random() * 260, ay, 60 + Math.random() * 300, 2 + Math.random() * 5);
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 4;
    return t;
  }

  var matSkin = new THREE.MeshStandardMaterial({ map: skinTex("#9ba394", "62,68,58", "42,40,34"), color: 0xffffff, metalness: 0.3, roughness: 0.55, side: THREE.DoubleSide });
  var matDark = new THREE.MeshStandardMaterial({ color: 0x33382f, metalness: 0.28, roughness: 0.62, side: THREE.DoubleSide });
  var matHot  = new THREE.MeshStandardMaterial({ color: 0x2c2e2e, metalness: 0.4, roughness: 0.45, side: THREE.DoubleSide });
  var matVoid = new THREE.MeshStandardMaterial({ color: 0x0a0b0b, metalness: 0.25, roughness: 0.92, emissive: 0x140b06, emissiveIntensity: 0.4, side: THREE.DoubleSide });
  var matGlass = new THREE.MeshPhysicalMaterial({ color: 0x1a2830, metalness: 0.25, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.05, transparent: true, opacity: 0.62 });
  var matTeam = new THREE.MeshStandardMaterial({ color: new THREE.Color(C && C.team ? C.team : "#b03a30"), metalness: 0.25, roughness: 0.6, side: THREE.DoubleSide });
  var matNavR = new THREE.MeshStandardMaterial({ color: 0x400808, emissive: 0xff2010, emissiveIntensity: 1.1, roughness: 0.4 });
  var matNavG = new THREE.MeshStandardMaterial({ color: 0x063a12, emissive: 0x18ff40, emissiveIntensity: 1.1, roughness: 0.4 });

  /* ---------------- cigar fuselage ---------------- */
  var FS = [
    { x:  14.60, w: 1.44, h: 1.46, zc: 0.22, sq: 0.72 },
    { x:  13.20, w: 1.54, h: 1.58, zc: 0.16, sq: 0.74 },
    { x:  11.00, w: 1.62, h: 1.68, zc: 0.08, sq: 0.76 },
    { x:   8.00, w: 1.66, h: 1.72, zc: 0.03, sq: 0.78 },
    { x:   3.00, w: 1.68, h: 1.74, zc: 0.00, sq: 0.78 },
    { x:  -2.00, w: 1.68, h: 1.74, zc: 0.00, sq: 0.78 },
    { x:  -6.00, w: 1.63, h: 1.70, zc: 0.02, sq: 0.78 },
    { x:  -9.50, w: 1.48, h: 1.56, zc: 0.10, sq: 0.76 },
    { x: -12.50, w: 1.22, h: 1.32, zc: 0.22, sq: 0.74 },
    { x: -15.00, w: 0.92, h: 1.02, zc: 0.34, sq: 0.72 },
    { x: -16.60, w: 0.66, h: 0.74, zc: 0.44, sq: 0.70 },
    { x: -17.40, w: 0.44, h: 0.50, zc: 0.50, sq: 0.70 }
  ];
  function fs(xx, key) {
    var a, b, t, k;
    if (xx >= FS[0].x) { return FS[0][key]; }
    if (xx <= FS[FS.length - 1].x) { return FS[FS.length - 1][key]; }
    for (k = 0; k < FS.length - 1; k++) {
      a = FS[k]; b = FS[k + 1];
      if (xx <= a.x && xx >= b.x) { t = (xx - a.x) / (b.x - a.x); return a[key] + (b[key] - a[key]) * t; }
    }
    return FS[0][key];
  }
  function belly(xx) { return fs(xx, "zc") - fs(xx, "h"); }
  function crown(xx) { return fs(xx, "zc") + fs(xx, "h"); }

  put(M.loft(THREE, FS, 26), matSkin, 0, 0, 0);

  /* ---------------- heavily glazed bomber nose ---------------- */
  put(M.loft(THREE, [
    { x: 17.03, w: 0.22, h: 0.22, zc: 0.62, sq: 0.60 },
    { x: 16.70, w: 0.55, h: 0.52, zc: 0.58, sq: 0.62 },
    { x: 16.20, w: 0.90, h: 0.86, zc: 0.50, sq: 0.65 },
    { x: 15.50, w: 1.20, h: 1.18, zc: 0.38, sq: 0.68 },
    { x: 14.80, w: 1.38, h: 1.38, zc: 0.26, sq: 0.70 },
    { x: 14.30, w: 1.46, h: 1.48, zc: 0.20, sq: 0.72 }
  ], 22), matGlass, 0, 0, 0);
  /* glazing frame rings */
  put(new THREE.TorusGeometry(0.66, 0.04, 5, 18).rotateY(PI / 2), matSkin, 16.55, 0, 0.556);
  put(new THREE.TorusGeometry(0.945, 0.04, 5, 18).rotateY(PI / 2), matSkin, 16.10, 0, 0.483);
  put(new THREE.TorusGeometry(1.230, 0.04, 5, 18).rotateY(PI / 2), matSkin, 15.40, 0, 0.363);
  put(new THREE.TorusGeometry(1.415, 0.05, 5, 18).rotateY(PI / 2), matSkin, 14.60, 0, 0.236);
  /* dark anti-glare decking capping the top of the nose glazing */
  put(new THREE.CylinderGeometry(0.80, 1.22, 0.95, 16, 1, true, -0.44, 0.88).rotateZ(-PI / 2), matDark, 15.975, 0, 0.435).rotation.y = -0.115;
  put(new THREE.CylinderGeometry(1.22, 1.52, 1.15, 16, 1, true, -0.44, 0.88).rotateZ(-PI / 2), matDark, 14.925, 0, 0.295).rotation.y = -0.146;

  /* chin radome */
  put(M.loft(THREE, [
    { x: 14.60, w: 0.30, h: 0.16, zc: 0, sq: 0.70 },
    { x: 13.60, w: 0.66, h: 0.34, zc: 0, sq: 0.75 },
    { x: 11.60, w: 0.72, h: 0.38, zc: 0, sq: 0.78 },
    { x: 10.40, w: 0.40, h: 0.20, zc: 0, sq: 0.75 }
  ], 12), matDark, 0, 0, -1.42);

  /* refuelling probe */
  put(new THREE.CylinderGeometry(0.055, 0.11, 3.05, 10).rotateZ(-PI / 2), matHot, 15.85, 0, 1.34).rotation.y = -0.165;
  put(M.loft(THREE, [
    { x: 15.40, w: 0.14, h: 0.14, zc: 0, sq: 0.7 },
    { x: 14.60, w: 0.26, h: 0.24, zc: 0, sq: 0.7 },
    { x: 13.60, w: 0.18, h: 0.16, zc: 0, sq: 0.7 }
  ], 10), matSkin, 0, 0, 1.20);

  /* ---------------- cockpit ---------------- */
  put(M.loft(THREE, [
    { x: 14.50, w: 0.50, h: 0.42, zc: 1.28, sq: 0.72 },
    { x: 13.80, w: 0.85, h: 0.48, zc: 1.42, sq: 0.75 },
    { x: 13.00, w: 0.92, h: 0.48, zc: 1.44, sq: 0.78 },
    { x: 12.20, w: 0.78, h: 0.42, zc: 1.40, sq: 0.78 },
    { x: 11.60, w: 0.55, h: 0.32, zc: 1.34, sq: 0.75 }
  ], 16), matGlass, 0, 0, 0);
  put(bowGeo(0.90, 0.045), matSkin, 13.45, 0, 1.46).scale.set(1, 1, 0.50);

  /* ---------------- mid-mounted swept wings with fences ---------------- */
  var wing = [[5.40, 1.55], [-6.00, 15.90], [-6.90, 16.50], [-8.90, 16.30], [-4.00, 1.55]];
  function mainWing(sd) {
    var g0 = new THREE.Group(), fy = [6.0, 10.8], k, fx, fn, lt, rd;
    g0.add(mesh(M.slab(THREE, sd > 0 ? wing : mir(wing), 0.62), matSkin));
    for (k = 0; k < 2; k++) {
      fx = 5.40 - (fy[k] - 1.55) * 0.794;
      fn = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.06, 0.36), matSkin);
      fn.position.set(fx - 1.45, sd * fy[k], 0.46);
      g0.add(fn);
    }
    lt = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), sd > 0 ? matNavR : matNavG);
    lt.position.set(-6.72, sd * 16.35, 0.06);
    g0.add(lt);
    rd = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.06, 18), matTeam);
    rd.rotation.x = PI / 2;
    rd.position.set(-2.60, sd * 8.40, 0.33);
    g0.add(rd);
    g0.rotation.x = -sd * 0.052;
    G.add(g0);
  }
  mainWing(1); mainWing(-1);

  /* ---------------- engines buried in the wing roots ---------------- */
  var EN = [
    { x:  7.60, w: 0.60, h: 0.84, zc: 0, sq: 0.70 },
    { x:  6.60, w: 0.76, h: 1.00, zc: 0, sq: 0.72 },
    { x:  3.00, w: 0.82, h: 1.06, zc: 0, sq: 0.74 },
    { x: -1.00, w: 0.80, h: 1.02, zc: 0, sq: 0.74 },
    { x: -3.60, w: 0.72, h: 0.90, zc: 0, sq: 0.72 },
    { x: -5.20, w: 0.62, h: 0.76, zc: 0, sq: 0.70 }
  ];
  function engine(sd) {
    var yc = sd * 1.95;
    put(M.loft(THREE, EN, 18), matSkin, 0, yc, -0.10);
    /* oval intake mouth right beside the fuselage */
    put(new THREE.CylinderGeometry(0.62, 0.62, 0.30, 18, 1, true).rotateZ(-PI / 2), matSkin, 7.62, yc, -0.06).scale.set(1, 0.95, 1.34);
    put(new THREE.CylinderGeometry(0.56, 0.56, 1.20, 18, 1, true).rotateZ(-PI / 2), matHot, 7.15, yc, -0.06).scale.set(1, 0.95, 1.34);
    put(new THREE.CircleGeometry(0.56, 18).rotateY(PI / 2), matVoid, 6.62, yc, -0.06).scale.set(1, 0.95, 1.34);
    /* nozzle exiting at the wing trailing-edge root */
    put(new THREE.CylinderGeometry(0.60, 0.48, 1.10, 18, 1, true).rotateZ(-PI / 2), matHot, -5.60, yc, -0.14).rotation.z = -sd * 0.035;
    put(new THREE.CircleGeometry(0.46, 18).rotateY(-PI / 2), matVoid, -6.10, yc + sd * 0.03, -0.15);
  }
  engine(1); engine(-1);

  /* ---------------- tall swept fin, dorsal fillet, tailplane ---------------- */
  var spine = [];
  for (i = 0; i <= 5; i++) { x = -2.5 - i * 1.7; spine.push({ x: x, w: 0.34 - i * 0.012, h: 0.30, zc: crown(x) - 0.16, sq: 0.8 }); }
  put(M.loft(THREE, spine, 12), matSkin, 0, 0, 0);

  put(M.slab(THREE, [[-8.60, 1.00], [-13.90, 6.80], [-14.60, 7.05], [-16.10, 6.85], [-16.40, 1.00]], 0.42, "xz"), matSkin, 0, 0, 0);
  put(new THREE.BoxGeometry(1.5, 0.44, 0.9), matTeam, -14.55, 0, 5.55);
  put(M.loft(THREE, [
    { x: -13.70, w: 0.12, h: 0.12, zc: 0, sq: 0.7 },
    { x: -14.60, w: 0.22, h: 0.22, zc: 0, sq: 0.7 },
    { x: -16.20, w: 0.16, h: 0.16, zc: 0, sq: 0.7 }
  ], 10), matDark, 0, 0, 7.08);
  put(new THREE.SphereGeometry(0.11, 8, 6), matNavR, -16.00, 0, 6.85);

  var stab = [[-10.60, 0.85], [-14.90, 5.55], [-15.70, 5.90], [-16.90, 5.70], [-14.80, 0.85]];
  function tailplane(sd) {
    put(M.slab(THREE, sd > 0 ? stab : mir(stab), 0.34), matSkin, 0, 0, 0.95).rotation.x = sd * 0.05;
  }
  tailplane(1); tailplane(-1);

  put(M.loft(THREE, [
    { x: -16.80, w: 0.40, h: 0.44, zc: 0, sq: 0.7 },
    { x: -17.15, w: 0.30, h: 0.34, zc: 0, sq: 0.7 },
    { x: -17.40, w: 0.14, h: 0.16, zc: 0, sq: 0.7 }
  ], 12), matDark, 0, 0, 0.52);

  /* ---------------- belly recess + one very large ALCM ---------------- */
  var rec = [];
  for (i = 0; i <= 6; i++) {
    x = 6.4 - i * 2.3;
    rec.push({ x: x, w: (i === 0 || i === 6) ? 0.55 : 1.00, h: 0.30, zc: belly(x) - 0.06, sq: 0.85 });
  }
  put(M.loft(THREE, rec, 12), matSkin, 0, 0, 0);
  for (i = -1; i <= 1; i += 2) {
    put(new THREE.BoxGeometry(11.0, 0.06, 0.42), matDark, -0.20, i * 0.86, belly(-0.20) - 0.20);
  }

  var msl = new THREE.Group(), f, k;
  msl.add(mesh(M.loft(THREE, [
    { x:  5.20, w: 0.05, h: 0.05, zc: 0, sq: 0.6 },
    { x:  4.60, w: 0.24, h: 0.24, zc: 0, sq: 0.6 },
    { x:  3.60, w: 0.46, h: 0.46, zc: 0, sq: 0.6 },
    { x:  2.40, w: 0.62, h: 0.62, zc: 0, sq: 0.6 },
    { x:  1.00, w: 0.68, h: 0.68, zc: 0, sq: 0.6 },
    { x: -3.00, w: 0.68, h: 0.68, zc: 0, sq: 0.6 },
    { x: -5.00, w: 0.66, h: 0.66, zc: 0, sq: 0.6 },
    { x: -5.80, w: 0.58, h: 0.58, zc: 0, sq: 0.6 }
  ], 18), matSkin));
  msl.add(mesh(new THREE.CircleGeometry(0.56, 16).rotateY(-PI / 2), matVoid).translateX(-5.85));
  msl.add(mesh(new THREE.TorusGeometry(0.685, 0.03, 4, 16).rotateY(PI / 2), matHot).translateX(-1.40));
  for (k = 0; k < 4; k++) {
    f = mesh(M.slab(THREE, [[-3.40, 0.58], [-5.10, 1.34], [-5.75, 1.34], [-5.75, 0.58]], 0.09), matSkin);
    f.rotation.x = PI / 4 + k * PI / 2;
    msl.add(f);
    f = mesh(M.slab(THREE, [[0.90, 0.62], [-0.60, 1.26], [-1.30, 1.26], [-1.30, 0.62]], 0.08), matSkin);
    f.rotation.x = PI / 4 + k * PI / 2;
    msl.add(f);
  }
  msl.position.set(0, 0, -2.52);
  G.add(msl);

  /* ---------------- small kit ---------------- */
  put(new THREE.BoxGeometry(0.70, 0.05, 0.34), matSkin, 9.60, 0, crown(9.60) + 0.13);
  put(new THREE.BoxGeometry(0.55, 0.05, 0.28), matSkin, 6.00, 0, crown(6.00) + 0.11);
  put(new THREE.BoxGeometry(0.60, 0.05, 0.30), matDark, -8.60, 0, belly(-8.60) - 0.12);
  put(M.loft(THREE, [
    { x:  -9.50, w: 0.30, h: 0.20, zc: 0, sq: 0.75 },
    { x: -11.20, w: 0.52, h: 0.34, zc: 0, sq: 0.80 },
    { x: -13.40, w: 0.34, h: 0.22, zc: 0, sq: 0.75 }
  ], 12), matSkin, 0, 0, crown(-11.20) - 0.12);
  for (i = -1; i <= 1; i += 2) {
    put(new THREE.CylinderGeometry(0.03, 0.03, 0.45, 6), matHot, 13.00, i * 1.50, 0.55);
  }

  return G;
} };

HD_MODELS["stealth_p"] = {
  len: 20.1,
  build: function (THREE, M, C) {
    var G = new THREE.Group(), PI = Math.PI;
    var TEAM = (C && C.team) || "#c8322f";

    /* ---------- deterministic rng + canvas helpers ---------- */
    var sd = 20575;
    function R() { sd = (sd * 1664525 + 1013904223) % 4294967296; return sd / 4294967296; }
    function CV(w, h, f) {
      var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      f(cv.getContext("2d"), w, h);
      var t = new THREE.CanvasTexture(cv); t.anisotropy = 8; return t;
    }
    function BB(p) {
      var i, x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      for (i = 0; i < p.length; i++) {
        x0 = Math.min(x0, p[i][0]); x1 = Math.max(x1, p[i][0]);
        y0 = Math.min(y0, p[i][1]); y1 = Math.max(y1, p[i][1]);
      }
      return { x0: x0, x1: x1, y0: y0, y1: y1, w: x1 - x0, h: y1 - y0 };
    }
    function FIT(t, bb) {
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      t.repeat.set(1 / bb.w, 1 / bb.h);
      t.offset.set(-bb.x0 / bb.w, -bb.y0 / bb.h);
      return t;
    }
    function MIR(p) { var q = [], i; for (i = p.length - 1; i >= 0; i--) q.push([p[i][0], -p[i][1]]); return q; }

    /* ---------- splinter camouflage painter (hard-edged angular patches) ---------- */
    var CA = "#59636f", CB = "#38414d", CC = "#7c8794";
    function camo(x, W, H, n, sc) {
      var i;
      x.fillStyle = CA; x.fillRect(0, 0, W, H);
      for (i = 0; i < n; i++) {
        var cx = R() * W, cy = R() * H;
        var ang = (i % 2 ? 2.30 : 0.72) + (R() - 0.5) * 0.8;
        var L = (0.06 + R() * 0.13) * W * sc, T = (0.10 + R() * 0.22) * H * sc;
        x.save(); x.translate(cx, cy); x.rotate(ang);
        x.fillStyle = (i % 3 === 0) ? CC : CB;
        x.beginPath();
        x.moveTo(-L, -T * (0.5 + R() * 0.5));
        x.lineTo(L * (0.4 + R() * 0.6), -T);
        x.lineTo(L, T * (0.3 + R() * 0.7));
        x.lineTo(-L * (0.5 + R() * 0.5), T * (0.6 + R() * 0.4));
        x.closePath(); x.fill();
        x.restore();
      }
    }
    function grime(x, W, H, a) {
      var i;
      x.fillStyle = "rgba(255,255,255," + a + ")";
      for (i = 0; i < 10; i++) x.fillRect(R() * W, R() * H, W * (0.03 + R() * 0.09), H * (0.05 + R() * 0.16));
      x.fillStyle = "rgba(0,0,0," + a + ")";
      for (i = 0; i < 12; i++) x.fillRect(R() * W, R() * H, W * (0.03 + R() * 0.10), H * (0.05 + R() * 0.18));
    }
    function stencil(x, px, py, n, w, h) {
      var i;
      x.fillStyle = "rgba(226,232,238,0.32)";
      for (i = 0; i < n; i++) x.fillRect(px, py + i * (h + 2), w, h);
    }
    function zig(x, ax, ay, bx, by, n, amp) {
      var i, dx = (bx - ax) / n, dy = (by - ay) / n;
      var nx = -dy, ny = dx, L = Math.sqrt(nx * nx + ny * ny) || 1;
      nx = nx / L * amp; ny = ny / L * amp;
      x.beginPath(); x.moveTo(ax, ay);
      for (i = 0; i < n; i++) {
        x.lineTo(ax + dx * (i + 0.5) + nx, ay + dy * (i + 0.5) + ny);
        x.lineTo(ax + dx * (i + 1), ay + dy * (i + 1));
      }
      x.stroke();
    }
    function star(x, cx, cy, r, col, rot) {
      var i;
      x.save(); x.translate(cx, cy); x.rotate(rot || 0);
      x.beginPath();
      for (i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, rr = (i % 2 ? r * 0.40 : r);
        if (i === 0) x.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
        else x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
      }
      x.closePath();
      x.fillStyle = col; x.fill();
      x.lineWidth = Math.max(1, r * 0.10); x.strokeStyle = "rgba(232,236,240,0.65)"; x.stroke();
    }

    /* ---------- fuselage skin: u = nose(0) -> tail(1), v: 0 left, .25 top, .5 right, .75 belly ---- */
    var FX0 = 9.55, FX1 = -9.40;
    function fu(x) { return (FX0 - x) / (FX0 - FX1); }
    var skinTex = CV(1024, 256, function (x, W, H) {
      var i, u;
      camo(x, W, H, 34, 1);
      /* dielectric radome + chine dielectric panels */
      x.fillStyle = "#2f353c"; x.fillRect(0, 0, fu(8.15) * W, H);
      x.fillStyle = "rgba(38,44,50,0.85)";
      x.fillRect(fu(8.15) * W, 0.44 * H, (fu(4.6) - fu(8.15)) * W, 0.12 * H);
      x.fillRect(fu(8.15) * W, 0.94 * H, (fu(4.6) - fu(8.15)) * W, 0.06 * H);
      /* anti-glare panel ahead of the windscreen */
      x.fillStyle = "rgba(28,32,36,0.92)";
      x.fillRect(fu(9.0) * W, 0.20 * H, (fu(7.6) - fu(9.0)) * W, 0.10 * H);
      /* weapons-bay door outline in the flat tunnel (belly) */
      x.strokeStyle = "rgba(16,20,24,0.62)"; x.lineWidth = 2.0;
      zig(x, fu(2.6) * W, 0.665 * H, fu(2.6) * W, 0.835 * H, 5, 7);
      zig(x, fu(-4.4) * W, 0.665 * H, fu(-4.4) * W, 0.835 * H, 5, -7);
      x.beginPath(); x.moveTo(fu(2.6) * W, 0.665 * H); x.lineTo(fu(-4.4) * W, 0.665 * H); x.stroke();
      x.beginPath(); x.moveTo(fu(2.6) * W, 0.835 * H); x.lineTo(fu(-4.4) * W, 0.835 * H); x.stroke();
      x.beginPath(); x.moveTo(fu(-0.9) * W, 0.665 * H); x.lineTo(fu(-0.9) * W, 0.835 * H); x.stroke();
      x.beginPath(); x.moveTo(fu(2.6) * W, 0.75 * H); x.lineTo(fu(-4.4) * W, 0.75 * H); x.stroke();
      /* transverse station seams */
      x.strokeStyle = "rgba(18,22,27,0.42)"; x.lineWidth = 1.3;
      var st = [8.6, 7.5, 6.4, 5.2, 4.0, 2.6, 1.1, -0.5, -2.1, -3.7, -5.1, -6.4, -7.8];
      for (i = 0; i < st.length; i++) { u = fu(st[i]) * W; x.beginPath(); x.moveTo(u, 0); x.lineTo(u, H); x.stroke(); }
      /* longitudinal seams: spine, chine waterline, belly keel */
      x.strokeStyle = "rgba(18,22,27,0.34)"; x.lineWidth = 1.2;
      var lg = [0.02, 0.145, 0.355, 0.50, 0.645, 0.855, 0.985];
      for (i = 0; i < lg.length; i++) { x.beginPath(); x.moveTo(fu(9.2) * W, lg[i] * H); x.lineTo(fu(-8.6) * W, lg[i] * H); x.stroke(); }
      /* access hatches */
      x.strokeStyle = "rgba(18,22,27,0.4)"; x.lineWidth = 1;
      var hz = [[5.6, 0.30], [3.9, 0.19], [1.4, 0.28], [-1.2, 0.16], [-3.4, 0.30], [2.2, 0.56], [-2.6, 0.60], [0.2, 0.90], [-5.4, 0.22]];
      for (i = 0; i < hz.length; i++) {
        var hx = fu(hz[i][0]) * W;
        x.strokeRect(hx, hz[i][1] * H, 24, 13);
        x.beginPath(); x.arc(hx + 4, hz[i][1] * H + 4, 1.5, 0, 7); x.stroke();
      }
      /* exhaust / gun-gas heat staining aft */
      var g2 = x.createLinearGradient(fu(-4.0) * W, 0, W, 0);
      g2.addColorStop(0, "rgba(40,34,30,0)"); g2.addColorStop(1, "rgba(36,30,26,0.55)");
      x.fillStyle = g2; x.fillRect(fu(-4.0) * W, 0, W - fu(-4.0) * W, H);
      /* stencils */
      stencil(x, fu(6.0) * W, 0.34 * H, 4, 15, 3);
      stencil(x, fu(1.5) * W, 0.62 * H, 3, 18, 3);
      stencil(x, fu(-3.0) * W, 0.20 * H, 3, 14, 3);
      /* red rescue arrows near the cockpit */
      x.fillStyle = "rgba(196,58,44,0.75)";
      x.fillRect(fu(5.4) * W, 0.185 * H, 16, 4);
      x.fillRect(fu(5.4) * W, 0.315 * H, 16, 4);
      grime(x, W, H, 0.05);
    });
    var roughTex = CV(256, 64, function (x, W, H) {
      var i;
      x.fillStyle = "#f2f2f2"; x.fillRect(0, 0, W, H);
      for (i = 0; i < 26; i++) {
        x.fillStyle = R() > 0.5 ? "#ffffff" : "#cdcdcd";
        x.fillRect(R() * W, R() * H, 10 + R() * 40, 6 + R() * 22);
      }
    });
    /* nacelle skin: u = intake(0) -> nozzle(1) */
    var nacTex = CV(512, 256, function (x, W, H) {
      var i;
      camo(x, W, H, 16, 1.1);
      x.fillStyle = "rgba(22,26,30,0.9)"; x.fillRect(0, 0, 0.035 * W, H);
      x.strokeStyle = "rgba(18,22,27,0.42)"; x.lineWidth = 1.3;
      for (i = 1; i < 11; i++) { x.beginPath(); x.moveTo(i / 11 * W, 0); x.lineTo(i / 11 * W, H); x.stroke(); }
      x.strokeStyle = "rgba(18,22,27,0.3)"; x.lineWidth = 1.1;
      for (i = 1; i < 6; i++) { x.beginPath(); x.moveTo(0.05 * W, i / 6 * H); x.lineTo(0.98 * W, i / 6 * H); x.stroke(); }
      var g2 = x.createLinearGradient(0.55 * W, 0, W, 0);
      g2.addColorStop(0, "rgba(44,36,30,0)"); g2.addColorStop(0.6, "rgba(40,33,27,0.45)"); g2.addColorStop(1, "rgba(30,26,24,0.72)");
      x.fillStyle = g2; x.fillRect(0.55 * W, 0, 0.45 * W, H);
      stencil(x, 0.30 * W, 0.30 * H, 3, 14, 3);
      grime(x, W, H, 0.05);
    });
    /* nozzle petals: u along, v around */
    var nozTex = CV(256, 128, function (x, W, H) {
      var i;
      x.fillStyle = "#8d857a"; x.fillRect(0, 0, W, H);
      var g2 = x.createLinearGradient(0, 0, W, 0);
      g2.addColorStop(0, "rgba(90,84,76,0.35)"); g2.addColorStop(0.5, "rgba(120,96,70,0.35)"); g2.addColorStop(1, "rgba(52,44,38,0.75)");
      x.fillStyle = g2; x.fillRect(0, 0, W, H);
      x.strokeStyle = "rgba(30,26,22,0.75)"; x.lineWidth = 2;
      for (i = 0; i < 16; i++) { x.beginPath(); x.moveTo(0, i / 16 * H); x.lineTo(W, i / 16 * H); x.stroke(); }
      x.strokeStyle = "rgba(210,200,186,0.25)"; x.lineWidth = 1;
      for (i = 0; i < 16; i++) { x.beginPath(); x.moveTo(0, (i + 0.5) / 16 * H); x.lineTo(W, (i + 0.5) / 16 * H); x.stroke(); }
      for (i = 0; i < 40; i++) { x.fillStyle = "rgba(60,48,40," + (0.05 + R() * 0.12) + ")"; x.fillRect(R() * W, R() * H, 6 + R() * 26, 3 + R() * 8); }
    });
    var burnTex = CV(128, 128, function (x, W, H) {
      var i;
      var g2 = x.createRadialGradient(64, 64, 3, 64, 64, 63);
      g2.addColorStop(0, "#2a1408"); g2.addColorStop(0.4, "#180f09"); g2.addColorStop(0.75, "#221b14"); g2.addColorStop(1, "#0a0908");
      x.fillStyle = g2; x.fillRect(0, 0, W, H);
      x.strokeStyle = "rgba(128,94,52,0.32)";
      for (i = 14; i < 62; i += 8) { x.beginPath(); x.arc(64, 64, i, 0, 7); x.stroke(); }
      for (i = 0; i < 18; i++) {
        var a = i / 18 * PI * 2;
        x.beginPath(); x.moveTo(64 + Math.cos(a) * 16, 64 + Math.sin(a) * 16);
        x.lineTo(64 + Math.cos(a) * 62, 64 + Math.sin(a) * 62); x.stroke();
      }
    });

    /* ---------- materials ---------- */
    var mSkin = new THREE.MeshStandardMaterial({ map: skinTex, roughnessMap: roughTex, metalness: 0.34, roughness: 0.54 });
    var mNac = new THREE.MeshStandardMaterial({ map: nacTex, roughnessMap: roughTex, metalness: 0.34, roughness: 0.54 });
    var mPlain = new THREE.MeshStandardMaterial({ color: 0x4f5964, metalness: 0.32, roughness: 0.55 });
    var mDark = new THREE.MeshStandardMaterial({ color: 0x232830, metalness: 0.3, roughness: 0.6 });
    var mVoid = new THREE.MeshStandardMaterial({ color: 0x07080a, metalness: 0.1, roughness: 0.95 });
    var mMetal = new THREE.MeshStandardMaterial({ map: nozTex, metalness: 0.78, roughness: 0.42 });
    var mMetal2 = new THREE.MeshStandardMaterial({ color: 0x9aa0a4, metalness: 0.8, roughness: 0.38 });
    var mGlass = new THREE.MeshPhysicalMaterial({
      color: 0x2b2a1c, metalness: 0.35, roughness: 0.07, transparent: true, opacity: 0.58,
      clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.4
    });
    var mBurn = new THREE.MeshBasicMaterial({ map: burnTex });
    var mSeat = new THREE.MeshStandardMaterial({ color: 0x1d2228, metalness: 0.2, roughness: 0.88 });
    var mHud = new THREE.MeshPhysicalMaterial({ color: 0x2c4c3c, transparent: true, opacity: 0.45, metalness: 0.2, roughness: 0.1 });
    var mTeeth = new THREE.MeshStandardMaterial({ color: 0x8b8377, metalness: 0.78, roughness: 0.44, side: THREE.DoubleSide });
    var mStore = new THREE.MeshStandardMaterial({ color: 0xb9bdc2, metalness: 0.3, roughness: 0.45 });
    var mStoreD = new THREE.MeshStandardMaterial({ color: 0x3b4046, metalness: 0.3, roughness: 0.5 });

    function put(geo, mat, x, y, z) {
      var m = new THREE.Mesh(geo, mat);
      if (x !== undefined) m.position.set(x, y || 0, z || 0);
      G.add(m); return m;
    }
    function plate(pts, th, mat, z, rx) {
      var m = new THREE.Mesh(M.slab(THREE, pts, th), mat);
      m.position.z = -th / 2;
      if (rx) { var g = new THREE.Group(); g.add(m); g.rotation.x = rx; g.position.z = z || 0; G.add(g); return g; }
      m.position.z = (z || 0) - th / 2; G.add(m); return m;
    }
    function vplate(pts, th, mat, y, z, rx) {
      var m = new THREE.Mesh(M.slab(THREE, pts, th, "xz"), mat);
      m.position.y = th / 2;
      var g = new THREE.Group(); g.add(m);
      g.position.set(0, y, z); g.rotation.x = rx || 0; G.add(g); return g;
    }

    /* ================= broad flat blended fuselage ================= */
    var FS = [
      { x: 9.55, w: 0.035, h: 0.035, zc: 0.00 },
      { x: 9.10, w: 0.17, h: 0.15, zc: 0.01, sq: 0.86 },
      { x: 8.30, w: 0.38, h: 0.30, zc: 0.03, sq: 0.78 },
      { x: 7.40, w: 0.58, h: 0.44, zc: 0.05, sq: 0.74 },
      { x: 6.50, w: 0.78, h: 0.56, zc: 0.07, sq: 0.72 },
      { x: 5.50, w: 0.96, h: 0.65, zc: 0.06, sq: 0.71 },
      { x: 4.50, w: 1.25, h: 0.73, zc: 0.03, sq: 0.70 },
      { x: 3.40, w: 1.74, h: 0.79, zc: 0.01, sq: 0.69 },
      { x: 2.00, w: 2.14, h: 0.83, zc: 0.02, sq: 0.68 },
      { x: 0.40, w: 2.28, h: 0.84, zc: 0.03, sq: 0.68 },
      { x: -1.40, w: 2.27, h: 0.82, zc: 0.04, sq: 0.68 },
      { x: -3.10, w: 2.05, h: 0.74, zc: 0.06, sq: 0.70 },
      { x: -4.70, w: 1.58, h: 0.60, zc: 0.09, sq: 0.73 },
      { x: -6.20, w: 1.02, h: 0.44, zc: 0.12, sq: 0.78 },
      { x: -7.60, w: 0.70, h: 0.27, zc: 0.13, sq: 0.82 },
      { x: -8.80, w: 0.48, h: 0.17, zc: 0.13, sq: 0.86 },
      { x: -9.40, w: 0.05, h: 0.04, zc: 0.13, sq: 0.9 }
    ];
    put(M.loft(THREE, FS, 30), mSkin);

    /* pitot boom + AoA vanes */
    var boom = put(new THREE.CylinderGeometry(0.018, 0.030, 0.52, 8), mMetal2, 9.73, 0, 0.005);
    boom.rotation.z = PI / 2;
    for (var s0 = -1; s0 <= 1; s0 += 2) {
      var av = put(new THREE.CylinderGeometry(0.016, 0.016, 0.20, 6), mMetal2, 8.55, s0 * 0.30, 0.05);
      av.rotation.z = PI / 2;
      var vane = put(new THREE.BoxGeometry(0.14, 0.02, 0.09), mDark, 8.50, s0 * 0.40, 0.05);
      vane.rotation.x = 0;
    }

    /* forward-fuselage chine strakes (sharp planform edge) */
    var chineL = [[9.42, 0.05], [8.20, 0.48], [6.60, 0.87], [4.90, 1.24], [4.30, 1.40], [4.30, 1.22], [4.90, 1.04], [6.60, 0.69], [8.20, 0.32], [9.38, 0.02]];
    plate(chineL, 0.07, mPlain, 0.05);
    plate(MIR(chineL), 0.07, mPlain, 0.05);

    /* ================= engine nacelles, widely spaced, flat tunnel between ============= */
    var NS = [
      { x: 4.62, w: 0.60, h: 0.44, zc: -0.30, sq: 0.60 },
      { x: 3.40, w: 0.70, h: 0.50, zc: -0.34, sq: 0.65 },
      { x: 1.60, w: 0.77, h: 0.58, zc: -0.38, sq: 0.72 },
      { x: -0.60, w: 0.79, h: 0.64, zc: -0.36, sq: 0.80 },
      { x: -3.00, w: 0.77, h: 0.66, zc: -0.32, sq: 0.88 },
      { x: -5.20, w: 0.73, h: 0.67, zc: -0.24, sq: 0.94 },
      { x: -7.00, w: 0.70, h: 0.68, zc: -0.16, sq: 1 },
      { x: -8.40, w: 0.68, h: 0.68, zc: -0.12, sq: 1 },
      { x: -8.95, w: 0.67, h: 0.67, zc: -0.12, sq: 1 }
    ];
    var NY = 1.56;
    for (var sg = -1; sg <= 1; sg += 2) {
      put(M.loft(THREE, NS, 24), mNac, 0, sg * NY, 0);
      /* recessed dark intake mouth seen through the open duct rim */
      var mouth = put(new THREE.PlaneGeometry(0.90, 1.26), mVoid, 4.24, sg * NY, -0.30);
      mouth.rotation.y = PI / 2;
      /* boundary-layer diverter plate between nacelle and fuselage */
      var div = put(new THREE.BoxGeometry(1.5, 0.05, 0.58), mDark, 4.05, sg * 0.98, -0.30);
      /* caret intake lower lip */
      var lip = put(new THREE.BoxGeometry(0.34, 1.30, 0.07), mPlain, 4.72, sg * NY, -0.70);
      lip.rotation.y = -0.30;
      /* upper cowl rake */
      var rake = put(new THREE.BoxGeometry(0.5, 1.30, 0.07), mPlain, 4.50, sg * NY, 0.10);
      rake.rotation.y = 0.22;
    }

    /* weapons-bay doors in the flat tunnel */
    put(new THREE.BoxGeometry(6.9, 1.76, 0.07), mPlain, -0.9, 0, -0.750);
    put(new THREE.BoxGeometry(6.9, 0.05, 0.03), mVoid, -0.9, 0, -0.790);
    put(new THREE.BoxGeometry(0.05, 1.76, 0.03), mVoid, 2.55, 0, -0.790);
    put(new THREE.BoxGeometry(0.05, 1.76, 0.03), mVoid, -4.35, 0, -0.790);

    /* ================= LERX + movable LEVCON canards ================= */
    for (sg = -1; sg <= 1; sg += 2) {
      var lerx = [[6.35, 0.72], [3.00, 2.08], [3.00, 1.30], [5.60, 0.62]];
      plate(sg > 0 ? lerx : MIR(lerx), 0.10, mPlain, 0.10);
      /* LEVCON: hinged panel at the LERX leading edge, drooped a few degrees */
      var lev = [[5.95, 0.95], [3.15, 2.28], [2.95, 2.02], [5.45, 0.80]];
      var lm = new THREE.Mesh(M.slab(THREE, sg > 0 ? lev : MIR(lev), 0.08), mPlain);
      lm.rotation.y = 0.055;
      lm.position.z = 0.10 - 0.04 + 3.05 * 0.055;
      G.add(lm);
      /* hinge line */
      var hg = put(new THREE.BoxGeometry(0.07, 2.70, 0.05), mDark, 4.20, sg * 1.41, 0.11);
      hg.rotation.z = sg > 0 ? 1.11 : -1.11;
    }

    /* ================= trapezoidal mid-mounted wings ================= */
    var WPL = [[2.95, 2.05], [-2.27, 6.75], [-3.75, 6.75], [-4.55, 2.10]];
    var WPR = MIR(WPL);
    function wingTex(bb, sg2) {
      var S = 46;
      return CV(Math.ceil(bb.w * S), Math.ceil(bb.h * S), function (x, W, H) {
        var i;
        function px(ax, ay) { return [(ax - bb.x0) * S, (bb.y1 - ay) * S]; }
        camo(x, W, H, 13, 1.2);
        /* leading-edge wear strip */
        x.strokeStyle = "rgba(46,52,58,0.85)"; x.lineWidth = 4;
        var a = px(2.95, sg2 * 2.05), b = px(-2.27, sg2 * 6.75);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        /* flaperon + aileron hinge lines */
        x.strokeStyle = "rgba(16,20,25,0.55)"; x.lineWidth = 2;
        a = px(-3.35, sg2 * 2.15); b = px(-2.95, sg2 * 6.60);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        a = px(-3.55, sg2 * 4.35); b = px(-2.55, sg2 * 4.35);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        /* leading-edge flap line */
        x.strokeStyle = "rgba(16,20,25,0.45)"; x.lineWidth = 1.6;
        a = px(2.30, sg2 * 2.20); b = px(-2.55, sg2 * 6.55);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        /* spar / rib seams */
        x.strokeStyle = "rgba(16,20,25,0.32)"; x.lineWidth = 1.2;
        for (i = 1; i < 6; i++) {
          var f = i / 6;
          var p1 = px(2.95 + (-2.27 - 2.95) * f, sg2 * (2.05 + (6.75 - 2.05) * f));
          var p2 = px(-4.55 + (-3.75 + 4.55) * f, sg2 * (2.10 + (6.75 - 2.10) * f));
          x.beginPath(); x.moveTo(p1[0], p1[1]); x.lineTo(p2[0], p2[1]); x.stroke();
        }
        /* walkway dashes at the root */
        x.setLineDash([6, 5]); x.strokeStyle = "rgba(20,24,28,0.5)"; x.lineWidth = 1.2;
        a = px(1.6, sg2 * 2.35); b = px(-4.0, sg2 * 2.45);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        x.setLineDash([]);
        /* national star */
        var c0 = px(-1.35, sg2 * 4.55);
        star(x, c0[0], c0[1], 0.55 * S, TEAM, 0);
        stencil(x, px(0.4, sg2 * 2.6)[0], px(0.4, sg2 * 2.6)[1], 3, 13, 3);
        grime(x, W, H, 0.045);
      });
    }
    var bbL = BB(WPL), bbR = BB(WPR);
    var mWL = new THREE.MeshStandardMaterial({ map: FIT(wingTex(bbL, 1), bbL), metalness: 0.32, roughness: 0.54 });
    var mWR = new THREE.MeshStandardMaterial({ map: FIT(wingTex(bbR, -1), bbR), metalness: 0.32, roughness: 0.54 });
    put(M.slab(THREE, WPL, 0.13), mWL, 0, 0, -0.065);
    put(M.slab(THREE, WPR, 0.13), mWR, 0, 0, -0.065);

    /* wingtip EW pods */
    for (sg = -1; sg <= 1; sg += 2) {
      var pod = M.loft(THREE, [
        { x: -1.55, w: 0.03, h: 0.03 }, { x: -1.15, w: 0.10, h: 0.09 },
        { x: -0.30, w: 0.15, h: 0.13 }, { x: 1.05, w: 0.15, h: 0.13 },
        { x: 1.75, w: 0.09, h: 0.08 }, { x: 2.05, w: 0.02, h: 0.02 }
      ], 14);
      put(pod, mPlain, -1.85, sg * 6.90, -0.02);
    }

    /* ================= all-moving stabilators ================= */
    var STL = [[-4.90, 2.35], [-7.60, 5.05], [-8.55, 5.05], [-8.35, 2.40]];
    for (sg = -1; sg <= 1; sg += 2) {
      var pts = sg > 0 ? STL : MIR(STL);
      var sm = new THREE.Mesh(M.slab(THREE, pts, 0.11), mPlain);
      sm.position.z = -0.055;
      var sgp = new THREE.Group(); sgp.add(sm);
      sgp.rotation.x = -sg * 0.07; sgp.position.z = -0.06;
      G.add(sgp);
    }

    /* ================= twin all-moving fins, canted 26 deg outward ================= */
    var FINP = [[-4.20, 0.05], [-6.90, 1.85], [-7.72, 1.85], [-7.35, 0.00]];
    function finTex(bb) {
      var S = 58;
      return CV(Math.ceil(bb.w * S), Math.ceil(bb.h * S), function (x, W, H) {
        function px(ax, az) { return [(ax - bb.x0) * S, (bb.y1 - az) * S]; }
        camo(x, W, H, 8, 1.3);
        x.strokeStyle = "rgba(16,20,25,0.55)"; x.lineWidth = 2;
        var a = px(-6.55, 0.02), b = px(-7.35, 1.80);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        x.strokeStyle = "rgba(16,20,25,0.35)"; x.lineWidth = 1.2;
        a = px(-4.6, 0.55); b = px(-7.5, 0.95);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        /* tip RWR fairing band */
        x.fillStyle = "rgba(30,35,41,0.9)";
        var t0 = px(-7.72, 1.86), t1 = px(-6.30, 1.60);
        x.fillRect(t0[0], t0[1], t1[0] - t0[0], (t1[1] - t0[1]));
        var c0 = px(-5.85, 0.95);
        star(x, c0[0], c0[1], 0.40 * S, TEAM, 0);
        x.fillStyle = "rgba(228,232,236,0.55)";
        x.font = "bold " + (0.34 * S) + "px 'Arial Narrow',Arial,sans-serif";
        var n0 = px(-5.05, 0.35); x.fillText("054", n0[0], n0[1]);
        grime(x, W, H, 0.04);
      });
    }
    var bbF = BB(FINP);
    var mFin = new THREE.MeshStandardMaterial({ map: FIT(finTex(bbF), bbF), metalness: 0.32, roughness: 0.54, side: THREE.DoubleSide });
    for (sg = -1; sg <= 1; sg += 2) vplate(FINP, 0.10, mFin, sg * 1.72, 0.28, -sg * 0.454);

    /* ================= nozzles: round C-D petals with serrated edges ================= */
    function nozzle(cy, cz) {
      var g = new THREE.Group();
      var bell = M.loft(THREE, [
        { x: 0.00, w: 0.70, h: 0.70 },
        { x: -0.45, w: 0.67, h: 0.67 },
        { x: -0.85, w: 0.53, h: 0.53 },
        { x: -1.10, w: 0.575, h: 0.575 }
      ], 18);
      g.add(new THREE.Mesh(bell, mMetal));
      /* serrated petal tips */
      var n = 16, pos = [], i;
      for (i = 0; i < n; i++) {
        var a0 = (i + 0.07) / n * PI * 2, a1 = (i + 0.93) / n * PI * 2, am = (i + 0.5) / n * PI * 2;
        pos.push(-1.10, Math.cos(a0) * 0.575, Math.sin(a0) * 0.575);
        pos.push(-1.10, Math.cos(a1) * 0.575, Math.sin(a1) * 0.575);
        pos.push(-1.26, Math.cos(am) * 0.545, Math.sin(am) * 0.545);
      }
      var tg = new THREE.BufferGeometry();
      tg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      tg.computeVertexNormals();
      g.add(new THREE.Mesh(tg, mTeeth));
      /* inner liner + burner core */
      var liner = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.62, 0.9, 18, 1, true), mVoid);
      liner.rotation.z = PI / 2; liner.position.x = -0.62;
      g.add(liner);
      var core = new THREE.Mesh(new THREE.CircleGeometry(0.50, 20), mBurn);
      core.rotation.y = -PI / 2; core.position.x = -0.72;
      g.add(core);
      /* actuator fairings */
      for (i = 0; i < 4; i++) {
        var aa = i / 4 * PI * 2 + PI / 4;
        var act = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.09, 0.09), mMetal2);
        act.position.set(-0.35, Math.cos(aa) * 0.70, Math.sin(aa) * 0.70);
        g.add(act);
      }
      g.position.set(-8.95, cy, cz);
      G.add(g);
      return g;
    }
    nozzle(NY, -0.12); nozzle(-NY, -0.12);

    /* ================= cockpit: tub, seat, HUD ================= */
    put(new THREE.BoxGeometry(2.1, 0.72, 0.55), mVoid, 6.55, 0, 0.36);
    var seat = put(new THREE.BoxGeometry(0.30, 0.56, 0.82), mSeat, 5.85, 0, 0.64);
    seat.rotation.y = 0.20;
    put(new THREE.BoxGeometry(0.24, 0.34, 0.26), mSeat, 5.82, 0, 1.01);
    put(new THREE.SphereGeometry(0.17, 12, 10), mPlain, 6.25, 0, 0.88);
    var hud = put(new THREE.PlaneGeometry(0.30, 0.22), mHud, 7.20, 0, 0.72);
    hud.rotation.z = PI / 2; hud.rotation.y = -0.32;

    /* canopy: long bubble well forward + windscreen bow frame */
    var can = M.loft(THREE, [
      { x: 8.35, w: 0.10, h: 0.10, zc: 0.38 },
      { x: 7.80, w: 0.34, h: 0.27, zc: 0.48 },
      { x: 7.10, w: 0.50, h: 0.42, zc: 0.50 },
      { x: 6.30, w: 0.56, h: 0.47, zc: 0.50 },
      { x: 5.60, w: 0.52, h: 0.40, zc: 0.50 },
      { x: 5.05, w: 0.42, h: 0.26, zc: 0.50 }
    ], 22);
    put(can, mGlass);
    var bow = put(new THREE.TorusGeometry(0.38, 0.033, 8, 20, PI), mDark, 7.58, 0, 0.42);
    bow.rotation.y = PI / 2; bow.rotation.z = PI / 2; bow.scale.set(1, 1.05, 1);
    var sill = M.loft(THREE, [
      { x: 8.25, w: 0.14, h: 0.035, zc: 0.40 },
      { x: 7.10, w: 0.52, h: 0.04, zc: 0.48 },
      { x: 6.30, w: 0.58, h: 0.04, zc: 0.48 },
      { x: 5.02, w: 0.44, h: 0.04, zc: 0.48 }
    ], 14);
    put(sill, mDark);
    /* canopy spine fairing aft */
    put(M.loft(THREE, [
      { x: 5.10, w: 0.42, h: 0.28, zc: 0.48 },
      { x: 4.10, w: 0.44, h: 0.24, zc: 0.44 },
      { x: 2.60, w: 0.42, h: 0.18, zc: 0.38 },
      { x: 0.80, w: 0.36, h: 0.10, zc: 0.30 }
    ], 18), mPlain);

    /* IRST ball offset to starboard, blade antennas, RWR facets */
    var irst = put(new THREE.SphereGeometry(0.19, 14, 10), mPlain, 8.15, -0.24, 0.30);
    irst.scale.set(1.25, 1, 1);
    var irg = put(new THREE.SphereGeometry(0.155, 12, 8, 0, PI * 2, 0, PI * 0.55), new THREE.MeshPhysicalMaterial({ color: 0x111a1e, metalness: 0.4, roughness: 0.08, clearcoat: 1 }), 8.30, -0.24, 0.30);
    irg.rotation.z = -PI / 2; irg.rotation.y = 0.35;
    var ant1 = put(new THREE.BoxGeometry(0.34, 0.04, 0.20), mPlain, 1.60, 0, 0.84);
    var ant2 = put(new THREE.BoxGeometry(0.28, 0.04, 0.16), mPlain, -3.60, 0, -0.78);
    for (sg = -1; sg <= 1; sg += 2) {
      put(new THREE.BoxGeometry(0.42, 0.06, 0.16), mDark, 7.10, sg * 0.62, 0.14);
      put(new THREE.BoxGeometry(0.36, 0.06, 0.14), mDark, -5.40, sg * 1.28, 0.24);
    }

    /* ================= underwing pylons + R-77M rounds ================= */
    function msl(x, y, z, L, D) {
      var g = new THREE.Group(), i;
      var mm = mStore;
      var bd = new THREE.Mesh(new THREE.CylinderGeometry(D, D, L, 12), mm);
      bd.rotation.z = PI / 2; g.add(bd);
      var nc = new THREE.Mesh(new THREE.ConeGeometry(D, D * 5.0, 12), mm);
      nc.rotation.z = -PI / 2; nc.position.x = L / 2 + D * 2.5; g.add(nc);
      var bn = new THREE.Mesh(new THREE.CylinderGeometry(D * 1.04, D * 1.04, 0.10, 12), mStoreD);
      bn.rotation.z = PI / 2; bn.position.x = L / 2 - 0.25; g.add(bn);
      for (i = 0; i < 4; i++) {
        var a = i * PI / 2 + PI / 4;
        var f1 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.015, 0.26), mm);
        f1.position.set(0.30, Math.cos(a) * D * 1.7, Math.sin(a) * D * 1.7);
        f1.rotation.x = a; g.add(f1);
        var f2 = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.015, 0.30), mm);
        f2.position.set(-L / 2 + 0.22, Math.cos(a) * D * 1.9, Math.sin(a) * D * 1.9);
        f2.rotation.x = a; g.add(f2);
      }
      g.position.set(x, y, z);
      G.add(g); return g;
    }
    for (sg = -1; sg <= 1; sg += 2) {
      put(new THREE.BoxGeometry(1.30, 0.10, 0.34), mPlain, -0.85, sg * 3.55, -0.28);
      msl(-0.75, sg * 3.55, -0.62, 3.10, 0.10);
    }

    /* ================= navigation lights ================= */
    function lamp(col, x, y, z) {
      put(new THREE.SphereGeometry(0.055, 7, 6), new THREE.MeshBasicMaterial({ color: col }), x, y, z);
    }
    lamp(0xff3b30, -2.60, 7.02, 0.02);
    lamp(0x2bd44a, -2.60, -7.02, 0.02);
    lamp(0xf2f6fa, -9.20, 0, 0.16);
    lamp(0xff3b30, 1.40, 0, 0.90);

    return G;
  }
};

HD_MODELS["stealth_c"] = {
  len: 21.2,
  build: function (THREE, M, C) {
    var G = new THREE.Group(), PI = Math.PI;
    var TEAM = (C && C.team) || "#c8322f";

    /* ---------- deterministic rng + canvas helpers ---------- */
    var sd = 91133;
    function R() { sd = (sd * 1664525 + 1013904223) % 4294967296; return sd / 4294967296; }
    function CV(w, h, f) {
      var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      f(cv.getContext("2d"), w, h);
      var t = new THREE.CanvasTexture(cv); t.anisotropy = 8; return t;
    }
    function BB(p) {
      var i, x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      for (i = 0; i < p.length; i++) {
        x0 = Math.min(x0, p[i][0]); x1 = Math.max(x1, p[i][0]);
        y0 = Math.min(y0, p[i][1]); y1 = Math.max(y1, p[i][1]);
      }
      return { x0: x0, x1: x1, y0: y0, y1: y1, w: x1 - x0, h: y1 - y0 };
    }
    function FIT(t, bb) {
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      t.repeat.set(1 / bb.w, 1 / bb.h);
      t.offset.set(-bb.x0 / bb.w, -bb.y0 / bb.h);
      return t;
    }
    function MIR(p) { var q = [], i; for (i = p.length - 1; i >= 0; i--) q.push([p[i][0], -p[i][1]]); return q; }

    /* ---------- low-visibility grey paint painter ---------- */
    var GREY = "#4c525a";
    function base(x, W, H, n) {
      var i;
      x.fillStyle = GREY; x.fillRect(0, 0, W, H);
      /* tonal patchwork: 4-8% alpha so the skin is never one flat colour */
      for (i = 0; i < n; i++) {
        x.globalAlpha = 0.04 + R() * 0.04;
        x.fillStyle = (i % 3 === 0) ? "#c8d2dc" : "#151a20";
        x.fillRect(R() * W, R() * H, W * (0.05 + R() * 0.14), H * (0.08 + R() * 0.30));
      }
      x.globalAlpha = 1;
    }
    function stencil(x, px, py, n, w, h) {
      var i;
      x.fillStyle = "rgba(214,222,230,0.30)";
      for (i = 0; i < n; i++) x.fillRect(px, py + i * (h + 2), w, h);
    }
    function zig(x, ax, ay, bx, by, n, amp) {
      var i, dx = (bx - ax) / n, dy = (by - ay) / n;
      var nx = -dy, ny = dx, L = Math.sqrt(nx * nx + ny * ny) || 1;
      nx = nx / L * amp; ny = ny / L * amp;
      x.beginPath(); x.moveTo(ax, ay);
      for (i = 0; i < n; i++) {
        x.lineTo(ax + dx * (i + 0.5) + nx, ay + dy * (i + 0.5) + ny);
        x.lineTo(ax + dx * (i + 1), ay + dy * (i + 1));
      }
      x.stroke();
    }
    function grime(x, W, H, a) {
      var i;
      x.fillStyle = "rgba(0,0,0," + a + ")";
      for (i = 0; i < 16; i++) x.fillRect(R() * W, R() * H, 2 + R() * 4, H * (0.05 + R() * 0.18));
    }
    function star(x, cx, cy, r, col) {
      var i;
      x.save(); x.translate(cx, cy);
      x.beginPath();
      for (i = 0; i < 10; i++) {
        var a = -PI / 2 + i * PI / 5, rr = (i % 2 ? r * 0.40 : r);
        if (i === 0) x.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
        else x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
      }
      x.closePath();
      x.fillStyle = col; x.fill();
      /* two low-vis bars, PLAAF style */
      x.fillRect(-r * 2.3, -r * 0.30, r * 1.15, r * 0.60);
      x.fillRect(r * 1.15, -r * 0.30, r * 1.15, r * 0.60);
      x.restore();
    }

    /* ---------- fuselage skin: u = nose(0) -> tail(1) ---------- */
    var FX0 = 10.55, FX1 = -10.30;
    function fu(x) { return (FX0 - x) / (FX0 - FX1); }
    var skinTex = CV(1024, 256, function (x, W, H) {
      var i, u;
      base(x, W, H, 30);
      /* darker radome + dielectric chine panels */
      x.fillStyle = "#3a4046"; x.fillRect(0, 0, fu(8.85) * W, H);
      x.fillStyle = "rgba(58,64,70,0.85)";
      x.fillRect(fu(8.85) * W, 0.45 * H, (fu(5.4) - fu(8.85)) * W, 0.10 * H);
      x.fillRect(fu(8.85) * W, 0.95 * H, (fu(5.4) - fu(8.85)) * W, 0.05 * H);
      /* anti-glare panel ahead of the windscreen */
      x.fillStyle = "rgba(26,30,34,0.9)";
      x.fillRect(fu(9.9) * W, 0.205 * H, (fu(8.5) - fu(9.9)) * W, 0.09 * H);
      /* main weapons-bay doors on the belly */
      x.strokeStyle = "rgba(14,18,22,0.6)"; x.lineWidth = 2;
      zig(x, fu(3.4) * W, 0.685 * H, fu(3.4) * W, 0.815 * H, 5, 7);
      zig(x, fu(-2.6) * W, 0.685 * H, fu(-2.6) * W, 0.815 * H, 5, -7);
      x.beginPath(); x.moveTo(fu(3.4) * W, 0.685 * H); x.lineTo(fu(-2.6) * W, 0.685 * H); x.stroke();
      x.beginPath(); x.moveTo(fu(3.4) * W, 0.815 * H); x.lineTo(fu(-2.6) * W, 0.815 * H); x.stroke();
      x.beginPath(); x.moveTo(fu(0.4) * W, 0.685 * H); x.lineTo(fu(0.4) * W, 0.815 * H); x.stroke();
      x.beginPath(); x.moveTo(fu(3.4) * W, 0.75 * H); x.lineTo(fu(-2.6) * W, 0.75 * H); x.stroke();
      /* side bay outlines */
      x.strokeRect(fu(3.6) * W, 0.545 * H, (fu(0.6) - fu(3.6)) * W, 0.075 * H);
      x.strokeRect(fu(3.6) * W, 0.885 * H, (fu(0.6) - fu(3.6)) * W, 0.075 * H);
      /* transverse station seams */
      x.strokeStyle = "rgba(16,20,25,0.45)"; x.lineWidth = 1.3;
      var st = [9.6, 8.5, 7.4, 6.2, 5.0, 3.7, 2.3, 0.8, -0.8, -2.4, -4.0, -5.6, -7.0, -8.4];
      for (i = 0; i < st.length; i++) { u = fu(st[i]) * W; x.beginPath(); x.moveTo(u, 0); x.lineTo(u, H); x.stroke(); }
      /* longitudinal seams */
      x.strokeStyle = "rgba(16,20,25,0.34)"; x.lineWidth = 1.2;
      var lg = [0.02, 0.15, 0.35, 0.50, 0.65, 0.85, 0.985];
      for (i = 0; i < lg.length; i++) { x.beginPath(); x.moveTo(fu(10.1) * W, lg[i] * H); x.lineTo(fu(-9.6) * W, lg[i] * H); x.stroke(); }
      /* access hatches */
      x.strokeStyle = "rgba(16,20,25,0.4)"; x.lineWidth = 1;
      var hz = [[6.4, 0.30], [4.6, 0.18], [2.0, 0.27], [-0.6, 0.15], [-3.2, 0.29], [1.2, 0.57], [-2.2, 0.61], [-5.0, 0.21], [-6.6, 0.34]];
      for (i = 0; i < hz.length; i++) {
        var hx = fu(hz[i][0]) * W;
        x.strokeRect(hx, hz[i][1] * H, 22, 12);
        x.beginPath(); x.arc(hx + 4, hz[i][1] * H + 4, 1.4, 0, 7); x.stroke();
      }
      /* exhaust heat staining aft */
      var g2 = x.createLinearGradient(fu(-4.5) * W, 0, W, 0);
      g2.addColorStop(0, "rgba(36,32,30,0)"); g2.addColorStop(1, "rgba(30,26,24,0.6)");
      x.fillStyle = g2; x.fillRect(fu(-4.5) * W, 0, W - fu(-4.5) * W, H);
      /* stencils + serial */
      stencil(x, fu(7.0) * W, 0.33 * H, 4, 14, 3);
      stencil(x, fu(2.6) * W, 0.62 * H, 3, 17, 3);
      stencil(x, fu(-4.0) * W, 0.19 * H, 3, 13, 3);
      x.fillStyle = "rgba(198,206,214,0.42)";
      x.font = "bold 13px Arial,sans-serif";
      x.fillText("2017", fu(4.3) * W, 0.375 * H);
      x.fillStyle = "rgba(190,60,48,0.7)";
      x.fillRect(fu(6.2) * W, 0.185 * H, 15, 4);
      x.fillRect(fu(6.2) * W, 0.315 * H, 15, 4);
      grime(x, W, H, 0.07);
    });
    var roughTex = CV(256, 64, function (x, W, H) {
      var i;
      x.fillStyle = "#eeeeee"; x.fillRect(0, 0, W, H);
      for (i = 0; i < 30; i++) {
        x.fillStyle = R() > 0.5 ? "#ffffff" : "#c6c6c6";
        x.fillRect(R() * W, R() * H, 8 + R() * 44, 5 + R() * 24);
      }
    });
    /* intake duct skin */
    var ductTex = CV(256, 256, function (x, W, H) {
      var i;
      base(x, W, H, 12);
      x.fillStyle = "rgba(20,24,28,0.85)"; x.fillRect(0, 0, 0.05 * W, H);
      x.strokeStyle = "rgba(16,20,25,0.4)"; x.lineWidth = 1.3;
      for (i = 1; i < 7; i++) { x.beginPath(); x.moveTo(i / 7 * W, 0); x.lineTo(i / 7 * W, H); x.stroke(); }
      for (i = 1; i < 5; i++) { x.beginPath(); x.moveTo(0.05 * W, i / 5 * H); x.lineTo(W, i / 5 * H); x.stroke(); }
      grime(x, W, H, 0.06);
    });
    /* nozzle petals */
    var nozTex = CV(256, 128, function (x, W, H) {
      var i;
      x.fillStyle = "#8a857d"; x.fillRect(0, 0, W, H);
      var g2 = x.createLinearGradient(0, 0, W, 0);
      g2.addColorStop(0, "rgba(88,84,78,0.35)"); g2.addColorStop(0.5, "rgba(116,94,70,0.32)"); g2.addColorStop(1, "rgba(48,42,38,0.78)");
      x.fillStyle = g2; x.fillRect(0, 0, W, H);
      x.strokeStyle = "rgba(28,25,22,0.75)"; x.lineWidth = 2;
      for (i = 0; i < 18; i++) { x.beginPath(); x.moveTo(0, i / 18 * H); x.lineTo(W, i / 18 * H); x.stroke(); }
      x.strokeStyle = "rgba(206,198,186,0.22)"; x.lineWidth = 1;
      for (i = 0; i < 18; i++) { x.beginPath(); x.moveTo(0, (i + 0.5) / 18 * H); x.lineTo(W, (i + 0.5) / 18 * H); x.stroke(); }
      for (i = 0; i < 36; i++) { x.fillStyle = "rgba(56,46,38," + (0.05 + R() * 0.12) + ")"; x.fillRect(R() * W, R() * H, 6 + R() * 24, 3 + R() * 8); }
    });
    var burnTex = CV(128, 128, function (x, W, H) {
      var i;
      var g2 = x.createRadialGradient(64, 64, 3, 64, 64, 63);
      g2.addColorStop(0, "#2a1508"); g2.addColorStop(0.4, "#170e08"); g2.addColorStop(0.75, "#211a13"); g2.addColorStop(1, "#0a0908");
      x.fillStyle = g2; x.fillRect(0, 0, W, H);
      x.strokeStyle = "rgba(124,92,50,0.30)";
      for (i = 14; i < 62; i += 8) { x.beginPath(); x.arc(64, 64, i, 0, 7); x.stroke(); }
      for (i = 0; i < 18; i++) {
        var a = i / 18 * PI * 2;
        x.beginPath(); x.moveTo(64 + Math.cos(a) * 16, 64 + Math.sin(a) * 16);
        x.lineTo(64 + Math.cos(a) * 62, 64 + Math.sin(a) * 62); x.stroke();
      }
    });

    /* ---------- materials: dark grey with a faint metallic sheen ---------- */
    var mSkin = new THREE.MeshStandardMaterial({ map: skinTex, roughnessMap: roughTex, metalness: 0.40, roughness: 0.48 });
    var mDuct = new THREE.MeshStandardMaterial({ map: ductTex, metalness: 0.40, roughness: 0.48 });
    var mPlain = new THREE.MeshStandardMaterial({ color: 0x474d55, metalness: 0.38, roughness: 0.50 });
    var mDark = new THREE.MeshStandardMaterial({ color: 0x22262c, metalness: 0.3, roughness: 0.6 });
    var mVoid = new THREE.MeshStandardMaterial({ color: 0x07080a, metalness: 0.1, roughness: 0.95 });
    var mMetal = new THREE.MeshStandardMaterial({ map: nozTex, metalness: 0.78, roughness: 0.42 });
    var mMetal2 = new THREE.MeshStandardMaterial({ color: 0x9aa0a4, metalness: 0.8, roughness: 0.38 });
    var mGlass = new THREE.MeshPhysicalMaterial({
      color: 0x1d2530, metalness: 0.35, roughness: 0.07, transparent: true, opacity: 0.56,
      clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.4
    });
    var mSensor = new THREE.MeshPhysicalMaterial({ color: 0x0f161c, metalness: 0.45, roughness: 0.09, clearcoat: 1 });
    var mBurn = new THREE.MeshBasicMaterial({ map: burnTex });
    var mSeat = new THREE.MeshStandardMaterial({ color: 0x1c2127, metalness: 0.2, roughness: 0.88 });
    var mHud = new THREE.MeshPhysicalMaterial({ color: 0x2c4c3c, transparent: true, opacity: 0.45, metalness: 0.2, roughness: 0.1 });
    var mTeeth = new THREE.MeshStandardMaterial({ color: 0x8b8377, metalness: 0.78, roughness: 0.44, side: THREE.DoubleSide });
    var mStore = new THREE.MeshStandardMaterial({ color: 0xb4b9be, metalness: 0.3, roughness: 0.45 });

    function put(geo, mat, x, y, z) {
      var m = new THREE.Mesh(geo, mat);
      if (x !== undefined) m.position.set(x, y || 0, z || 0);
      G.add(m); return m;
    }
    function vplate(pts, th, mat, y, z, rx) {
      var m = new THREE.Mesh(M.slab(THREE, pts, th, "xz"), mat);
      m.position.y = th / 2;
      var g = new THREE.Group(); g.add(m);
      g.position.set(0, y, z); g.rotation.x = rx || 0; G.add(g); return g;
    }

    /* ================= long slender chined fuselage ================= */
    var FS = [
      { x: 10.55, w: 0.05, h: 0.045, zc: 0.00 },
      { x: 10.10, w: 0.20, h: 0.17, zc: 0.00, sq: 0.82 },
      { x: 9.30, w: 0.40, h: 0.31, zc: 0.02, sq: 0.72 },
      { x: 8.40, w: 0.51, h: 0.40, zc: 0.05, sq: 0.70 },
      { x: 7.20, w: 0.65, h: 0.53, zc: 0.07, sq: 0.68 },
      { x: 6.00, w: 0.75, h: 0.60, zc: 0.07, sq: 0.68 },
      { x: 4.80, w: 0.91, h: 0.66, zc: 0.04, sq: 0.69 },
      { x: 3.60, w: 1.17, h: 0.72, zc: 0.01, sq: 0.70 },
      { x: 2.20, w: 1.37, h: 0.76, zc: 0.00, sq: 0.70 },
      { x: 0.60, w: 1.53, h: 0.79, zc: 0.00, sq: 0.70 },
      { x: -1.20, w: 1.61, h: 0.79, zc: 0.01, sq: 0.72 },
      { x: -3.20, w: 1.62, h: 0.77, zc: 0.03, sq: 0.74 },
      { x: -5.20, w: 1.56, h: 0.71, zc: 0.05, sq: 0.78 },
      { x: -7.20, w: 1.42, h: 0.61, zc: 0.06, sq: 0.82 },
      { x: -8.80, w: 1.22, h: 0.45, zc: 0.07, sq: 0.86 },
      { x: -9.80, w: 0.96, h: 0.34, zc: 0.08, sq: 0.90 },
      { x: -10.30, w: 0.62, h: 0.20, zc: 0.09, sq: 0.90 }
    ];
    put(M.loft(THREE, FS, 30), mSkin);

    /* engine nacelle bulges under the broad aft body */
    for (var sg = -1; sg <= 1; sg += 2) {
      put(M.loft(THREE, [
        { x: -3.60, w: 0.50, h: 0.48, zc: -0.22, sq: 0.8 },
        { x: -5.80, w: 0.55, h: 0.53, zc: -0.18, sq: 0.9 },
        { x: -7.80, w: 0.56, h: 0.55, zc: -0.12, sq: 1 },
        { x: -9.55, w: 0.545, h: 0.545, zc: -0.07, sq: 1 }
      ], 20), mPlain, 0, sg * 0.86, 0);
    }

    /* nose probes */
    for (sg = -1; sg <= 1; sg += 2) {
      var av = put(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 6), mMetal2, 9.55, sg * 0.30, 0.06);
      av.rotation.z = PI / 2;
    }
    var tip = put(new THREE.CylinderGeometry(0.012, 0.026, 0.26, 8), mMetal2, 10.50, 0, 0);
    tip.rotation.z = PI / 2;

    /* chine strakes down the forward fuselage */
    var chineL = [[10.44, 0.04], [9.20, 0.50], [7.60, 0.84], [6.00, 1.04], [4.95, 1.16], [4.95, 0.96], [6.00, 0.86], [7.60, 0.64], [9.20, 0.32], [10.40, 0.01]];
    var chm = new THREE.Mesh(M.slab(THREE, chineL, 0.07), mPlain); chm.position.z = 0.045; G.add(chm);
    var chm2 = new THREE.Mesh(M.slab(THREE, MIR(chineL), 0.07), mPlain); chm2.position.z = 0.045; G.add(chm2);

    /* ================= DSI side intakes: bump + recessed mouth ================= */
    var DS = [
      { x: 4.62, w: 0.40, h: 0.48, zc: -0.16, sq: 0.75 },
      { x: 3.20, w: 0.46, h: 0.52, zc: -0.18, sq: 0.80 },
      { x: 1.20, w: 0.50, h: 0.54, zc: -0.16, sq: 0.86 },
      { x: -1.20, w: 0.46, h: 0.50, zc: -0.10, sq: 0.92 }
    ];
    for (sg = -1; sg <= 1; sg += 2) {
      put(M.loft(THREE, DS, 20), mDuct, 0, sg * 1.15, 0);
      /* dark recessed mouth face seen through the duct rim */
      var mouth = put(new THREE.PlaneGeometry(0.96, 0.82), mVoid, 4.28, sg * 1.15, -0.16);
      mouth.rotation.y = PI / 2;
      /* DSI compression bump: rounded bulge just ahead of the mouth */
      var bump = put(new THREE.SphereGeometry(0.52, 14, 10), mPlain, 5.05, sg * 1.02, -0.14);
      bump.scale.set(1.45, 0.62, 0.78);
      /* swept cowl lip */
      var lip = put(new THREE.BoxGeometry(0.30, 0.10, 1.02), mPlain, 4.66, sg * 1.50, -0.16);
      lip.rotation.z = sg * 0.12;
      var lip2 = put(new THREE.BoxGeometry(0.30, 0.86, 0.10), mPlain, 4.66, sg * 1.15, -0.62);
      lip2.rotation.y = -0.18;
    }

    /* main + side weapons-bay doors (closed, flush, with seams) */
    put(new THREE.BoxGeometry(6.0, 1.30, 0.06), mPlain, 0.4, 0, -0.775);
    put(new THREE.BoxGeometry(6.0, 0.05, 0.03), mVoid, 0.4, 0, -0.805);
    put(new THREE.BoxGeometry(0.05, 1.30, 0.03), mVoid, 3.35, 0, -0.805);
    put(new THREE.BoxGeometry(0.05, 1.30, 0.03), mVoid, -2.55, 0, -0.805);

    /* ================= long-coupled canards, set high, with anhedral ================= */
    var CPL = [[4.55, 1.24], [2.20, 3.62], [1.30, 3.62], [1.95, 1.32]];
    function canardTex(bb, sg2) {
      var S = 60;
      return CV(Math.ceil(bb.w * S), Math.ceil(bb.h * S), function (x, W, H) {
        function px(ax, ay) { return [(ax - bb.x0) * S, (bb.y1 - ay) * S]; }
        base(x, W, H, 8);
        x.strokeStyle = "rgba(44,50,57,0.85)"; x.lineWidth = 3.4;
        var a = px(4.55, sg2 * 1.24), b = px(2.20, sg2 * 3.62);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        x.strokeStyle = "rgba(16,20,25,0.35)"; x.lineWidth = 1.2;
        var i;
        for (i = 1; i < 4; i++) {
          var f = i / 4;
          var p1 = px(4.55 + (2.20 - 4.55) * f, sg2 * (1.24 + (3.62 - 1.24) * f));
          var p2 = px(1.95 + (1.30 - 1.95) * f, sg2 * (1.32 + (3.62 - 1.32) * f));
          x.beginPath(); x.moveTo(p1[0], p1[1]); x.lineTo(p2[0], p2[1]); x.stroke();
        }
        grime(x, W, H, 0.05);
      });
    }
    for (sg = -1; sg <= 1; sg += 2) {
      var cp = sg > 0 ? CPL : MIR(CPL);
      var cbb = BB(cp);
      var mC = new THREE.MeshStandardMaterial({ map: FIT(canardTex(cbb, sg), cbb), metalness: 0.38, roughness: 0.50 });
      var cm = new THREE.Mesh(M.slab(THREE, cp, 0.10), mC);
      cm.position.z = -0.05;
      var cg = new THREE.Group(); cg.add(cm);
      cg.position.z = 0.26; cg.rotation.x = -sg * 0.17;
      G.add(cg);
    }

    /* ================= large delta wing ================= */
    var WPL = [[0.65, 1.45], [-4.28, 6.42], [-5.32, 6.42], [-6.35, 1.55]];
    var WPR = MIR(WPL);
    function wingTex(bb, sg2) {
      var S = 44;
      return CV(Math.ceil(bb.w * S), Math.ceil(bb.h * S), function (x, W, H) {
        var i;
        function px(ax, ay) { return [(ax - bb.x0) * S, (bb.y1 - ay) * S]; }
        base(x, W, H, 16);
        /* leading-edge wear strip */
        x.strokeStyle = "rgba(42,48,55,0.9)"; x.lineWidth = 4.2;
        var a = px(0.65, sg2 * 1.45), b = px(-4.28, sg2 * 6.42);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        /* leading-edge flap hinge */
        x.strokeStyle = "rgba(16,20,25,0.42)"; x.lineWidth = 1.6;
        a = px(-0.15, sg2 * 1.60); b = px(-4.52, sg2 * 6.24);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        /* flaperon + aileron hinge lines */
        x.strokeStyle = "rgba(16,20,25,0.55)"; x.lineWidth = 2;
        a = px(-5.45, sg2 * 1.60); b = px(-4.72, sg2 * 6.27);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        a = px(-5.60, sg2 * 4.10); b = px(-4.35, sg2 * 4.10);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        /* rib seams */
        x.strokeStyle = "rgba(16,20,25,0.30)"; x.lineWidth = 1.2;
        for (i = 1; i < 6; i++) {
          var f = i / 6;
          var p1 = px(0.65 + (-4.28 - 0.65) * f, sg2 * (1.45 + (6.42 - 1.45) * f));
          var p2 = px(-6.35 + (-5.32 + 6.35) * f, sg2 * (1.55 + (6.42 - 1.55) * f));
          x.beginPath(); x.moveTo(p1[0], p1[1]); x.lineTo(p2[0], p2[1]); x.stroke();
        }
        /* root walkway */
        x.setLineDash([6, 5]); x.strokeStyle = "rgba(18,22,26,0.5)"; x.lineWidth = 1.2;
        a = px(-0.6, sg2 * 1.85); b = px(-5.7, sg2 * 1.95);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        x.setLineDash([]);
        /* PLAAF star and bars */
        var c0 = px(-3.10, sg2 * 4.30);
        star(x, c0[0], c0[1], 0.50 * S, TEAM);
        stencil(x, px(-1.4, sg2 * 2.2)[0], px(-1.4, sg2 * 2.2)[1], 3, 12, 3);
        grime(x, W, H, 0.05);
      });
    }
    var bbL = BB(WPL), bbR = BB(WPR);
    var mWL = new THREE.MeshStandardMaterial({ map: FIT(wingTex(bbL, 1), bbL), metalness: 0.38, roughness: 0.50 });
    var mWR = new THREE.MeshStandardMaterial({ map: FIT(wingTex(bbR, -1), bbR), metalness: 0.38, roughness: 0.50 });
    put(M.slab(THREE, WPL, 0.14), mWL, 0, 0, -0.16);
    put(M.slab(THREE, WPR, 0.14), mWR, 0, 0, -0.16);

    /* ================= small all-moving fins, canted out, far aft ================= */
    var FINP = [[-5.60, 0.08], [-8.20, 1.48], [-8.95, 1.48], [-8.62, 0.00]];
    function finTex(bb) {
      var S = 62;
      return CV(Math.ceil(bb.w * S), Math.ceil(bb.h * S), function (x, W, H) {
        function px(ax, az) { return [(ax - bb.x0) * S, (bb.y1 - az) * S]; }
        base(x, W, H, 6);
        x.strokeStyle = "rgba(16,20,25,0.5)"; x.lineWidth = 1.8;
        var a = px(-8.05, 0.05), b = px(-8.62, 1.44);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        x.strokeStyle = "rgba(16,20,25,0.32)"; x.lineWidth = 1.1;
        a = px(-5.9, 0.60); b = px(-8.7, 0.85);
        x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke();
        /* tip antenna fairing */
        x.fillStyle = "rgba(30,34,40,0.9)";
        var t0 = px(-8.95, 1.50), t1 = px(-7.70, 1.30);
        x.fillRect(t0[0], t0[1], t1[0] - t0[0], t1[1] - t0[1]);
        x.fillStyle = "rgba(206,214,222,0.55)";
        x.font = "bold " + (0.40 * S) + "px 'Arial Narrow',Arial,sans-serif";
        var n0 = px(-7.15, 0.42); x.fillText("2017", n0[0], n0[1]);
        var c0 = px(-6.35, 1.05);
        star(x, c0[0], c0[1], 0.26 * S, TEAM);
        grime(x, W, H, 0.05);
      });
    }
    var bbF = BB(FINP);
    var mFin = new THREE.MeshStandardMaterial({ map: FIT(finTex(bbF), bbF), metalness: 0.38, roughness: 0.50, side: THREE.DoubleSide });
    for (sg = -1; sg <= 1; sg += 2) vplate(FINP, 0.09, mFin, sg * 1.16, 0.30, -sg * 0.35);

    /* ================= prominent ventral fins below the tails ================= */
    var VFP = [[-6.55, -0.10], [-8.25, -0.90], [-8.92, -0.90], [-8.68, -0.05]];
    for (sg = -1; sg <= 1; sg += 2) vplate(VFP, 0.08, mPlain, sg * 1.02, -0.34, sg * 0.42);

    /* ================= twin round nozzles ================= */
    function nozzle(cy, cz) {
      var g = new THREE.Group(), i;
      var bell = M.loft(THREE, [
        { x: 0.00, w: 0.575, h: 0.575 },
        { x: -0.40, w: 0.55, h: 0.55 },
        { x: -0.75, w: 0.45, h: 0.45 },
        { x: -0.95, w: 0.485, h: 0.485 }
      ], 18);
      g.add(new THREE.Mesh(bell, mMetal));
      var n = 18, pos = [];
      for (i = 0; i < n; i++) {
        var a0 = (i + 0.09) / n * PI * 2, a1 = (i + 0.91) / n * PI * 2, am = (i + 0.5) / n * PI * 2;
        pos.push(-0.95, Math.cos(a0) * 0.485, Math.sin(a0) * 0.485);
        pos.push(-0.95, Math.cos(a1) * 0.485, Math.sin(a1) * 0.485);
        pos.push(-1.05, Math.cos(am) * 0.465, Math.sin(am) * 0.465);
      }
      var tg = new THREE.BufferGeometry();
      tg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      tg.computeVertexNormals();
      g.add(new THREE.Mesh(tg, mTeeth));
      var liner = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.52, 0.8, 18, 1, true), mVoid);
      liner.rotation.z = PI / 2; liner.position.x = -0.55;
      g.add(liner);
      var core = new THREE.Mesh(new THREE.CircleGeometry(0.42, 20), mBurn);
      core.rotation.y = -PI / 2; core.position.x = -0.64;
      g.add(core);
      for (i = 0; i < 4; i++) {
        var aa = i / 4 * PI * 2 + PI / 4;
        var act = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.08), mMetal2);
        act.position.set(-0.30, Math.cos(aa) * 0.58, Math.sin(aa) * 0.58);
        g.add(act);
      }
      g.position.set(-9.55, cy, cz);
      G.add(g);
      return g;
    }
    nozzle(0.86, -0.07); nozzle(-0.86, -0.07);

    /* ================= cockpit + one-piece canopy ================= */
    put(new THREE.BoxGeometry(2.2, 0.70, 0.55), mVoid, 7.30, 0, 0.34);
    var seat = put(new THREE.BoxGeometry(0.30, 0.54, 0.80), mSeat, 6.60, 0, 0.62);
    seat.rotation.y = 0.20;
    put(new THREE.BoxGeometry(0.24, 0.32, 0.26), mSeat, 6.57, 0, 0.98);
    put(new THREE.SphereGeometry(0.17, 12, 10), mPlain, 7.00, 0, 0.86);
    var hud = put(new THREE.PlaneGeometry(0.32, 0.24), mHud, 7.95, 0, 0.70);
    hud.rotation.z = PI / 2; hud.rotation.y = -0.32;
    put(M.loft(THREE, [
      { x: 8.95, w: 0.11, h: 0.09, zc: 0.40 },
      { x: 8.40, w: 0.32, h: 0.25, zc: 0.46 },
      { x: 7.70, w: 0.46, h: 0.38, zc: 0.50 },
      { x: 7.00, w: 0.50, h: 0.42, zc: 0.50 },
      { x: 6.30, w: 0.46, h: 0.33, zc: 0.50 },
      { x: 5.85, w: 0.36, h: 0.20, zc: 0.50 }
    ], 22), mGlass);
    var bow = put(new THREE.TorusGeometry(0.35, 0.032, 8, 20, PI), mDark, 8.26, 0, 0.42);
    bow.rotation.y = PI / 2; bow.rotation.z = PI / 2; bow.scale.set(1, 1.06, 1);
    put(M.loft(THREE, [
      { x: 8.85, w: 0.13, h: 0.03, zc: 0.41 },
      { x: 7.70, w: 0.48, h: 0.035, zc: 0.46 },
      { x: 7.00, w: 0.52, h: 0.035, zc: 0.47 },
      { x: 5.82, w: 0.38, h: 0.035, zc: 0.47 }
    ], 14), mDark);
    /* spine fairing aft of the canopy */
    put(M.loft(THREE, [
      { x: 5.90, w: 0.36, h: 0.24, zc: 0.47 },
      { x: 4.60, w: 0.40, h: 0.20, zc: 0.42 },
      { x: 3.00, w: 0.40, h: 0.14, zc: 0.35 },
      { x: 1.00, w: 0.34, h: 0.08, zc: 0.28 }
    ], 18), mPlain);

    /* ================= EOTS window + EODAS apertures + antennas ================= */
    var eots = put(new THREE.SphereGeometry(0.30, 7, 4, 0, PI * 2, 0, PI * 0.5), mSensor, 9.25, 0, -0.17);
    eots.rotation.z = PI; eots.scale.set(1.5, 0.85, 0.85);
    function facet(x, y, z, ry, rz) {
      var f = put(new THREE.BoxGeometry(0.30, 0.24, 0.05), mSensor, x, y, z);
      f.rotation.y = ry || 0; f.rotation.z = rz || 0; f.rotation.x = 0;
      return f;
    }
    facet(8.55, 0.46, 0.24, 0, 0.5);
    facet(8.55, -0.46, 0.24, 0, -0.5);
    facet(8.75, 0.44, -0.26, 0, 0.5);
    facet(8.75, -0.44, -0.26, 0, -0.5);
    facet(5.20, 0, 0.52, 0, 0);
    facet(-6.60, 0, -0.50, 0, 0);
    put(new THREE.BoxGeometry(0.32, 0.04, 0.20), mPlain, 2.10, 0, 0.76);
    put(new THREE.BoxGeometry(0.26, 0.04, 0.15), mPlain, -4.20, 0, -0.74);
    for (sg = -1; sg <= 1; sg += 2) {
      put(new THREE.BoxGeometry(0.40, 0.06, 0.14), mDark, 7.55, sg * 0.60, 0.14);
      put(new THREE.BoxGeometry(0.34, 0.06, 0.12), mDark, -5.90, sg * 1.30, 0.26);
    }

    /* ================= side bays: PL-10 on extended rails ================= */
    function msl(x, y, z, L, D) {
      var g = new THREE.Group(), i;
      var mm = mStore;
      var bd = new THREE.Mesh(new THREE.CylinderGeometry(D, D, L, 12), mm);
      bd.rotation.z = PI / 2; g.add(bd);
      var nc = new THREE.Mesh(new THREE.ConeGeometry(D, D * 4.0, 12), mSensor);
      nc.rotation.z = -PI / 2; nc.position.x = L / 2 + D * 2.0; g.add(nc);
      for (i = 0; i < 4; i++) {
        var a = i * PI / 2 + PI / 4;
        var f1 = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.014, 0.22), mm);
        f1.position.set(L / 2 - 0.45, Math.cos(a) * D * 1.6, Math.sin(a) * D * 1.6);
        f1.rotation.x = a; g.add(f1);
        var f2 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.014, 0.26), mm);
        f2.position.set(-L / 2 + 0.20, Math.cos(a) * D * 1.8, Math.sin(a) * D * 1.8);
        f2.rotation.x = a; g.add(f2);
      }
      g.position.set(x, y, z);
      G.add(g); return g;
    }
    for (sg = -1; sg <= 1; sg += 2) {
      /* open side-bay door hanging outboard */
      var door = put(new THREE.BoxGeometry(2.6, 0.05, 0.62), mDark, 2.05, sg * 1.74, -0.42);
      door.rotation.x = sg * 0.5;
      /* launch rail swung out of the bay */
      put(new THREE.BoxGeometry(2.0, 0.10, 0.16), mPlain, 2.05, sg * 1.52, -0.62);
      msl(2.10, sg * 1.58, -0.80, 2.60, 0.085);
    }

    /* ================= navigation lights ================= */
    function lamp(col, x, y, z) {
      put(new THREE.SphereGeometry(0.055, 7, 6), new THREE.MeshBasicMaterial({ color: col }), x, y, z);
    }
    lamp(0xff3b30, -4.68, 6.44, -0.13);
    lamp(0x2bd44a, -4.68, -6.44, -0.13);
    lamp(0xf2f6fa, -10.15, 0, 0.14);
    lamp(0xff3b30, 1.90, 0, 0.82);

    return G;
  }
};

/* re-publish so these override anything the generated packs defined */
if (typeof HD_MODELS.__publish === "function") HD_MODELS.__publish();
else if (typeof UNIT_MODELS !== "undefined") {
  for (var _k in HD_MODELS) if (_k !== "__publish") UNIT_MODELS[_k] = HD_MODELS[_k];
}
