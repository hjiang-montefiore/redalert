/* ============ us_virginia_ssn.js -- HERO model: Virginia-class SSN ============
   Two rows, one hull:
     - nato_e00_sub  USS Virginia (SSN-774) as commissioned in 2004: Block I, twelve
                     single Tomahawk tubes in the bow.
     - sub_n         the 2020s row, "SSN-774 Virginia class, Block IV/V": drawn as a
                     Block IV boat (USS Vermont SSN-792, commissioned 2020; USS Montana
                     SSN-794), with the two 87-inch Virginia Payload Tubes of Block III on.
   Block V's Virginia Payload Module (the 140 m hull) is NOT drawn: the class article puts
   the module on Block V from the second boat, SSN-803, and no commissioned SSN-803-or-later
   boat has a photograph on Commons (the Oklahoma and Arizona categories are empty). So the
   2020s row gets the 114.9 m Block IV hull the photographs show.

   References (Wikimedia Commons, small thumbnails, in scratchpad/q_virginia_ref):
     - "SSN774.svg" (port profile of USS Virginia, bow right, 1280 px render): THE source for
       every station. Bow tip 1278 px, after tip of the propulsor hub 1 px, so with the
       published 114.91 m it is 11.113 px/m along the length; the parallel body is 113 px deep,
       scaled to the published 10.36 m beam (10.91 px/m upright). Read off it: the long
       parallel hull, the gently tapering forebody that ends in the bluff round bow dome (joint
       at 1197 px), the chin fairing under the bow (flat-bottomed, ends square at 1236 px), the
       sail 935-1040 px with the leading-edge fillet sweeping forward to 1078 px, the five
       raised masts and their heights, the cruciform stern (upper rudder 7.4 m and lower
       5.45 m from the axis, both 95-136 px), the stern-plane root chord (104-159 px), the
       pump-jet duct (14-60 px, 5.8 m across at its lip), the bow-plane recess and the two
       torpedo-tube shutters a side, the three wide-aperture array panels low on each flank.
     - "US Navy 030803-N-0000X-002" and "-003" (Virginia rolled out, 2003, bow quarter and
       bow-on): the hemispherical bow dome, the fillet, the sail's flat sides, the bow-
       plane recess high on the bow, the horizontal stern plane with its tip fitting.
     - "US Navy 070202-N-8467N-001" (aerial, Virginia moored, 2007, snow on the hull): the
       anechoic tile courses, large rectangular tiles all over the hull.
     - "Virginia-class-SSN-9.jpg" (Virginia leaving Portsmouth, 2013, beam on): trim and sail
       height (6.2-6.5 m over the crown against the drawing's 5.5 m: 6.2 m is drawn), the
       pale dots on the sail cheeks, the upper rudder standing clear aft.
     - "USS Vermont (SSN-792) underway on the Thames River ... 201015-N-AY957-202" (Block IV,
       beam on): 2.3-2.4 m of hull over the water at the sail, same sail, fillet, masts and
       sail dots as Block I.
     - "USS Montana (SSN-794) conducts initial sea trials ... 220201-O-NO101-150" (Block IV
       from above the bow): the pale smooth panel on the forward casing with the two big
       round payload-tube hatches in line on the centre line.
     - "USS John Warner (SSN 785) is moved to ... floating dry dock" (Block III, bow quarter)
       and "US Navy 100414-N-3944N-002" (USS Hawaii in dry dock): bow dome, bow-plane recess,
       black tile finish all the way down, no red anti-fouling.
     - "Virginia class submarine.jpg" (US Navy conceptual drawing): the cruciform stern in a
       ring with the duct, the extended bow plane high on the bow, the chin fairing, the three
       flank array panels.
   Dimensions: 114.91 m long, 10.36 m beam (class article). Trim: the axis sits 2.88 m under
   the water line, so the crown stands 2.30 m clear as both beam photographs show; the keel
   draws 8.06 m (the published 9.8 m draught is the deep figure).

   RECOGNITION (each one shows on the final sheets):
     1. Long parallel hull, gently tapering forebody, bluff round bow dome (SSN774.svg; 030803).
     2. The sail: flat-sided, flat-topped, rounded top edges, vertical after edge, NO sail
        planes (SSN774.svg; Vermont; Montana).
     3. The leading-edge fillet sweeping the sail's fore edge down into the hull (SSN774.svg;
        Vermont; conceptual drawing).
     4. Photonics masts, no periscope through the hull: five raised masts on the sail top,
        two run up with whips, two with pale heads (SSN774.svg; Vermont).
     5. Bow weapons by block: twelve VLS hatches, two rows of six (Block I), or the pale
        panel with two 2.4 m Virginia Payload Tube hatches in line (Block IV; Montana).
     6. Cruciform stern: tall upper rudder, shorter lower rudder, horizontal stern planes with
        tip fittings, all ahead of the propulsor (SSN774.svg; 030803; John Warner).
     7. Pump-jet duct round the tail cone: a short fat ring, wider at its lip (SSN774.svg).
     8. Chin fairing under the bow, flat bottom, square front (SSN774.svg; conceptual drawing).
     9. Three wide-aperture array panels low on each flank (SSN774.svg; class article: "three
        flat panels mounted low along either side of the hull").
    10. Bow-plane recess high on the bow (bow planes retract; 030803; John Warner).
    11. Anechoic tile finish: matte black, large rectangular tiles, tonal patchwork (aerial).
    12. The pale dots on the sail cheeks (Virginia 2013, Vermont 2020).

   Also off the profile: the three low hatch fairings on the crown (its top line steps up
   0.18 m at 410-440, 720-750 and 870-890 px), the flat-bottomed ventral fairing ahead of
   the lower rudder (136-185 px, 3.62 m under the axis), the small spike on the upper rudder.

   ESTIMATED, not measured: the stern-plane span (+-6.6 m, read off the conceptual drawing
   against the duct; the profile cannot show it); the sail width (3.0 m, 4.0 m at the fillet
   foot; the Montana and bow-on rollout photographs give 2.6-3.2 m); the twelve VLS hatches
   as two rows of six over 7 m of the forward crown, where the profile draws hatch outlines
   at 1100-1190 px (no plan or photograph of the open hatches was found); which masts are
   the photonics masts (the profile paints two masts pale; they get the pale heads).
   NOT DRAWN: hull numbers, names, flags, draft marks; the propulsor's rotor and stator
   blades (no reference gives the counts, so the duct shows only its dark interior); the
   towed-array fairing, a dry-deck shelter, the bridge windscreen; the extended bow plane
   (the boats are photographed surfaced with it housed). The row is not turret:true, so
   nothing is named "turret".
   Model space +X bow, +Y port, +Z up, metres; water line z = 0. render3d scales a submarine
   by UNIT_MODELS[key].len, set to the measured X extent (114.96 m). Merged per material:
   7 draw calls for Block I, 8 for Block IV (the payload panel's own pale grey). Paint: the
   tile black sampled off the Vermont and Hawaii photographs is about (56,48,48); taken to
   0.9 for the ACES lift that is #2c2e31. ASCII only. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroVirginiaSSN = (function () {
  "use strict";

  var PI = Math.PI;
  var PXM = 11.113;                    /* drawing px per metre along the length */
  var PXV = 10.906;                    /* drawing px per metre upright (113 px = 10.36 m) */
  var XC = 639.5;                      /* drawing column of model x = 0 */
  var R = 5.18;                        /* hull radius, 10.36 m beam */
  var ZA = -2.88;                      /* hull axis: crown 2.30 m over the water line */
  var CROWN = ZA + R;
  var SAILH = 6.20;                    /* sail top over the crown */
  var ZT = CROWN + SAILH;

  function X(px) { return (px - XC) / PXM; }

  /* [drawing column, radius px] off the profile (mean of the top and keel lines where the
     chin fairing does not interfere); px 1-60 is the hub inside the duct */
  var STA = [
    [0.8, 0.2], [2, 2.0], [6, 3.5], [12, 5.0], [20, 8.0], [40, 12.0], [60, 16.0], [70, 18.0],
    [80, 20.0], [90, 22.0], [100, 24.5], [110, 27.0], [120, 29.5], [130, 31.5], [140, 33.5],
    [150, 35.5], [160, 37.8], [170, 39.5], [180, 42.0], [190, 43.5], [200, 45.3], [210, 47.0],
    [220, 48.8], [230, 49.8], [240, 51.0], [250, 52.0], [260, 53.0], [270, 54.0], [280, 54.6],
    [290, 55.4], [300, 55.8], [320, 56.5], [1100, 56.5], [1110, 55.4], [1120, 54.6], [1130, 53.6], [1140, 52.6], [1150, 51.6],
    [1160, 50.4], [1170, 49.1], [1180, 47.7], [1190, 46.6], [1200, 45.4], [1210, 44.2],
    [1220, 42.6], [1230, 40.6], [1236, 39.0], [1240, 37.2], [1245, 35.4], [1250, 33.4],
    [1254, 31.4], [1258, 29.6], [1262, 27.0], [1266, 24.0], [1270, 20.6], [1272, 18.6],
    [1274, 16.2], [1276, 12.4], [1277, 9.6], [1277.7, 6.4], [1278.1, 3.0], [1278.3, 0.3]
  ];
  var TAB = [], ti;
  for (ti = 0; ti < STA.length; ti++) TAB.push([X(STA[ti][0]), STA[ti][1] / PXV * (R / (56.5 / PXV))]);
  var XS = TAB[0][0], XB = TAB[TAB.length - 1][0];

  function hullR(x) {
    var i;
    if (x <= TAB[0][0]) return TAB[0][1];
    for (i = 1; i < TAB.length; i++) {
      if (x <= TAB[i][0]) {
        var a = TAB[i - 1], b = TAB[i], t = (x - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return TAB[TAB.length - 1][1];
  }
  function topAt(x, y) { var r = hullR(x); return ZA + Math.sqrt(Math.max(0.0001, r * r - y * y)); }
  function sideY(x, z) { var r = hullR(x), d = z - ZA; return Math.sqrt(Math.max(0.0001, r * r - d * d)); }

  /* ---------------------------------------------------------------- textures */
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  var _tex = {};

  /* Hull skin: u runs stern to bow over the loft (XS..XB), v round the girth (0.25 crown).
     Large rectangular tiles in courses (the snow on the 2007 aerial shows them), replaced
     tiles a shade off, and the bow dome forward of its joint smooth, without tiles. */
  function hullTex(THREE) {
    if (_tex.hull) return _tex.hull;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(77401), i, j;
    g.fillStyle = "#2c2e31"; g.fillRect(0, 0, W, H);
    var L = XB - XS, xd = (X(1197) - XS) / L * W;       /* dome joint column */
    var tw = 1.35 / L * W, th = H / 30;                 /* ~1.35 m tiles, 30 courses */
    for (j = 0; j < 30; j++) {
      var off = (j % 2) ? tw * 0.5 : 0;
      for (i = -1; i * tw < xd; i++) {
        var x0 = i * tw + off, x1 = Math.min(x0 + tw, xd);
        if (x1 <= 0) continue;
        var v = R1();
        g.fillStyle = v < 0.5 ? "rgba(255,255,255," + (0.010 + R1() * 0.028).toFixed(3) + ")"
                              : "rgba(0,0,0," + (0.03 + R1() * 0.06).toFixed(3) + ")";
        g.fillRect(x0 + 0.6, j * th + 0.6, x1 - x0 - 1.2, th - 1.2);
      }
    }
    /* patchwork: blocks of replaced tiles */
    for (i = 0; i < 46; i++) {
      var bx = R1() * (xd - 40), by = R1() * H, bw = tw * (2 + Math.floor(R1() * 5)), bh = th * (1 + Math.floor(R1() * 3));
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.10)";
      g.fillRect(bx, by, Math.min(bw, xd - bx), bh);
    }
    g.strokeStyle = "rgba(0,0,0,0.38)"; g.lineWidth = 1;
    for (j = 0; j <= 30; j++) { g.beginPath(); g.moveTo(0, j * th); g.lineTo(xd, j * th); g.stroke(); }
    for (j = 0; j < 30; j++) {
      var o2 = (j % 2) ? tw * 0.5 : 0;
      for (i = 0; i * tw + o2 < xd; i++) {
        g.beginPath(); g.moveTo(i * tw + o2, j * th); g.lineTo(i * tw + o2, (j + 1) * th); g.stroke();
      }
    }
    /* the dome: smooth, a touch deeper black */
    g.fillStyle = "#26282b"; g.fillRect(xd, 0, W - xd, H);
    g.fillStyle = "rgba(0,0,0,0.55)"; g.fillRect(xd - 1, 0, 3, H);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _tex.hull = t;
    return t;
  }

  /* 2 m tile patch for parts with metre UVs: the sail shell, fins, duct, chin fairing */
  function tileTex(THREE) {
    if (_tex.tile) return _tex.tile;
    var S = 128, cv = cvs(S, S), g = cv.getContext("2d");
    var R1 = rng(5523), i, j;
    g.fillStyle = "#2b2d30"; g.fillRect(0, 0, S, S);
    for (j = 0; j < 3; j++) {
      for (i = 0; i < 2; i++) {
        var o = (j % 2) ? 32 : 0;
        g.fillStyle = R1() < 0.5 ? "rgba(255,255,255," + (0.012 + R1() * 0.03).toFixed(3) + ")"
                                 : "rgba(0,0,0," + (0.03 + R1() * 0.06).toFixed(3) + ")";
        g.fillRect((i * 64 + o) % S + 1, j * 43 + 1, 62, 41);
      }
    }
    g.strokeStyle = "rgba(0,0,0,0.40)"; g.lineWidth = 1.2;
    for (j = 0; j <= 3; j++) { g.beginPath(); g.moveTo(0, j * 43); g.lineTo(S, j * 43); g.stroke(); }
    for (j = 0; j < 3; j++) {
      var oo = (j % 2) ? 32 : 0;
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * 64 + oo, j * 43); g.lineTo(i * 64 + oo, (j + 1) * 43); g.stroke(); }
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.repeat.set(0.5, 0.5);
    t.anisotropy = 4;
    _tex.tile = t;
    return t;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.9, metalness: 0.05 }),
      tile:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: tileTex(THREE), roughness: 0.9, metalness: 0.05 }),
      dark:  std(0x0f1113, 0.80, 0.20),     /* recesses, slots, hatch rims, duct interior */
      panel: std(0x3d4145, 0.85, 0.10),     /* hatch lids, array panels, shutters */
      metal: std(0x3a4147, 0.55, 0.45),     /* masts */
      cap:   std(0x9ca2a6, 0.70, 0.10),     /* the pale mast heads and sail dots */
      pale:  std(0x5a5f63, 0.80, 0.08),     /* the smooth payload-tube panel (Montana) */
      team:  std(team, 0.86, 0.06)
    };
  }

  /* ------------------------------------------------------ merge machinery */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, sc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        p.set(x || 0, y || 0, z || 0);
        if (sc) s.set(sc[0], sc[1], sc[2]); else s.set(1, 1, 1);
        m.compose(p, q, s);
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        (by[mat] = by[mat] || []).push(geo);
      },
      addQ: function (mat, geo, x, y, z, quat) {
        m.compose(p.set(x, y, z), quat, s.set(1, 1, 1));
        geo.applyMatrix4(m);
        if (geo.index) geo = geo.toNonIndexed();
        (by[mat] = by[mat] || []).push(geo);
      },
      done: function (T, g) {
        var k;
        for (k in by) {
          var list = by[k], n = 0, i, j;
          for (i = 0; i < list.length; i++) n += list[i].attributes.position.count;
          var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
          for (i = 0; i < list.length; i++) {
            var a = list[i].attributes, c = a.position.count;
            for (j = 0; j < c * 3; j++) { P[o * 3 + j] = a.position.array[j]; N[o * 3 + j] = a.normal.array[j]; }
            if (a.uv) for (j = 0; j < c * 2; j++) U[o * 2 + j] = a.uv.array[j];
            o += c;
          }
          var G = new THREE.BufferGeometry();
          G.setAttribute("position", new THREE.BufferAttribute(P, 3));
          G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
          G.setAttribute("uv", new THREE.BufferAttribute(U, 2));
          var mesh = new THREE.Mesh(G, T[k]);
          mesh.name = "m_" + k;
          mesh.castShadow = true; mesh.receiveShadow = true;
          g.add(mesh);
        }
      }
    };
  }

  /* lofted body with the winding flipped so FrontSide faces outward */
  function body(THREE, M, secs, segs) {
    var g = M.loft(THREE, secs, segs);
    var ix = g.getIndex(), a = ix.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    ix.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }
  /* loft UVs (0..1 both ways) to metres, for the 2 m tile patch */
  function metreUV(g, len, girth) {
    var uv = g.attributes.uv, i;
    for (i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * len, uv.getY(i) * girth);
    uv.needsUpdate = true;
    return g;
  }
  function flip(g) {
    var ix = g.getIndex(), a = ix.array, i, t;
    for (i = 0; i < a.length; i += 3) { t = a[i + 1]; a[i + 1] = a[i + 2]; a[i + 2] = t; }
    ix.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }

  /* closed stack of horizontal outlines (counter-clockwise from above), metre UVs, top cap */
  function shell(THREE, rings) {
    var N = rings[0].pts.length, L = rings.length, ring = N + 1;
    var pos = [], uv = [], idx = [], i, j, p;
    for (i = 0; i < L; i++) {
      var run = 0, prev = rings[i].pts[0];
      for (j = 0; j <= N; j++) {
        p = rings[i].pts[j % N];
        run += Math.sqrt((p[0] - prev[0]) * (p[0] - prev[0]) + (p[1] - prev[1]) * (p[1] - prev[1]));
        prev = p;
        pos.push(p[0], p[1], rings[i].z); uv.push(run, rings[i].z);
      }
    }
    for (i = 0; i < L - 1; i++) {
      for (j = 0; j < N; j++) {
        var q = i * ring + j;
        idx.push(q, q + 1, q + ring, q + 1, q + ring + 1, q + ring);
      }
    }
    var top = rings[L - 1], base = pos.length / 3, cx = 0, cy = 0, k;
    for (k = 0; k < N; k++) { cx += top.pts[k][0]; cy += top.pts[k][1]; }
    cx /= N; cy /= N;
    pos.push(cx, cy, top.z); uv.push(cx, cy);
    for (k = 0; k < N; k++) { pos.push(top.pts[k][0], top.pts[k][1], top.z); uv.push(top.pts[k][0], top.pts[k][1]); }
    for (k = 0; k < N; k++) idx.push(base, base + 1 + k, base + 1 + ((k + 1) % N));
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  /* flat extrusion of an outline (bevel off); xz: the outline is (x, z), thickness toward -y */
  function ext(THREE, pts, depth, xz) {
    var sh = new THREE.Shape(), i;
    sh.moveTo(pts[0][0], pts[0][1]);
    for (i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
    sh.closePath();
    var g = new THREE.ExtrudeGeometry(sh, { depth: depth, bevelEnabled: false });
    if (xz) g.rotateX(PI / 2);
    g.computeVertexNormals();
    return g;
  }

  /* thin patch on the hull flank: x0..x1, z0..z1, 'off' proud (sign +1 port) */
  function sidePatch(THREE, sign, x0, x1, z0, z1, off) {
    var nx = 6, nz = 4, pos = [], idx = [], i, j, x, z;
    for (j = 0; j <= nz; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx; z = z0 + (z1 - z0) * j / nz;
        pos.push(x, sign * (sideY(x, z) + off), z);
      }
    }
    for (j = 0; j < nz; j++) {
      for (i = 0; i < nx; i++) {
        var a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
        if (sign > 0) idx.push(a, c, b, b, c, d); else idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* thin patch on the crown: x0..x1, y0..y1 (y0 < y1), 'off' proud, normals up */
  function crownPatch(THREE, x0, x1, y0, y1, off, nx, ny) {
    var pos = [], idx = [], i, j, x, y;
    for (j = 0; j <= ny; j++) {
      for (i = 0; i <= nx; i++) {
        x = x0 + (x1 - x0) * i / nx; y = y0 + (y1 - y0) * j / ny;
        pos.push(x, y, topAt(x, y) + off);
      }
    }
    for (j = 0; j < ny; j++) {
      for (i = 0; i < nx; i++) {
        var a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  /* a round hatch on the crown at (cx, cy), every vertex on the hull surface + off:
     a dark rim ring and a lid disc, so a 2.5 m payload hatch hugs the curve too */
  function crownDisc(THREE, cx, cy, r0, r1, off, seg) {
    var pos = [], idx = [], k, a;
    for (k = 0; k <= seg; k++) {
      a = k / seg * PI * 2;
      var xo = cx + r1 * Math.cos(a), yo = cy + r1 * Math.sin(a);
      var xi = cx + r0 * Math.cos(a), yi = cy + r0 * Math.sin(a);
      pos.push(xo, yo, topAt(xo, yo) + off, xi, yi, topAt(xi, yi) + off);
    }
    for (k = 0; k < seg; k++) {
      var o = k * 2, iI = o + 1, o2 = o + 2, i2 = o + 3;
      if (r0 > 0) idx.push(o, o2, iI, iI, o2, i2); else idx.push(o, o2, iI);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function hatch(THREE, A, x, y, rad, lidMat) {
    A.add("dark", crownDisc(THREE, x, y, rad * 0.86, rad, 0.08, 18), 0, 0, 0);
    A.add(lidMat, crownDisc(THREE, x, y, 0, rad * 0.86, 0.06, 18), 0, 0, 0);
  }

  function cylZ(THREE, A, mat, r1, r2, len, seg, x, y, z) {
    A.add(mat, new THREE.CylinderGeometry(r1, r2, len, seg), x, y, z, PI / 2, 0, 0);
  }

  /* ---- the sail and its fillet as one shell ----
     ext(h): how far the fillet carries the fore edge ahead of the sail's own (36.04 m) at
     h metres over the crown, read off the profile row by row; the plan half-width grows
     toward the foot so the fillet spreads into the hull. */
  var FIL = [[-1.0, 3.42], [0.0, 3.42], [0.18, 2.70], [0.37, 2.16], [0.55, 1.62], [0.73, 1.26],
             [0.92, 0.99], [1.28, 0.54], [1.65, 0.18], [2.2, 0.0], [99, 0.0]];
  function filExt(h) {
    var i;
    for (i = 1; i < FIL.length; i++) {
      if (h <= FIL[i][0]) {
        var a = FIL[i - 1], b = FIL[i], t = (h - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * Math.max(0, Math.min(1, t));
      }
    }
    return 0;
  }
  var SX0 = X(935), SX1 = X(1040), SHW = 1.50;
  /* plan outline: elliptic nose of length ln, straight sides, rounded tail of length lt */
  function sailRing(xa, xf, hw, ln, lt, n) {
    var pts = [], k, a;
    var nn = Math.round(n * 0.25), ns = Math.round(n * 0.06), nt = n / 2 - nn - ns;
    /* port half from the nose tip aft, then the starboard half forward */
    for (k = 0; k < nn; k++) { a = k / nn * PI / 2; pts.push([xf - ln + ln * Math.cos(a), hw * Math.sin(a)]); }
    for (k = 0; k < ns; k++) { pts.push([xf - ln - (xf - ln - (xa + lt)) * k / ns, hw]); }
    for (k = 0; k < nt; k++) { a = k / nt * PI / 2; pts.push([xa + lt - lt * Math.sin(a), hw * Math.cos(a)]); }
    var half = pts.length, out = pts.slice();
    out.push([xa, 0]);
    for (k = half - 1; k >= 1; k--) out.push([pts[k][0], -pts[k][1]]);
    return out;
  }

  function build(THREE, M, C, blk) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, k, s, x, y, z;

    /* ---- hull: one lofted body of revolution from the hub tip to the bow dome ---- */
    var secs = [];
    for (i = 0; i < TAB.length; i++) secs.push({ x: TAB[i][0], w: TAB[i][1], h: TAB[i][1], zc: ZA, sq: 1.0 });
    A.add("skin", body(THREE, M, secs, 40), 0, 0, 0);

    /* ---- chin fairing under the bow: flat bottom 4.2 m under the axis, square front ---- */
    var cs = [], cx;
    var CH = [[45.4, 0.05], [46.4, 0.45], [47.4, 0.80], [48.4, 0.97], [49.4, 1.0], [52.6, 1.0], [53.5, 0.96], [53.72, 0.86]];
    for (i = 0; i < CH.length; i++) {
      cs.push({ x: CH[i][0], w: 1.75 * CH[i][1], h: 1.55 * Math.max(0.2, CH[i][1]), zc: ZA - 4.18 + 1.55 * Math.max(0.2, CH[i][1]), sq: 0.75 });
    }
    A.add("tile", metreUV(body(THREE, M, cs, 24), 8.3, 10.0), 0, 0, 0);
    A.add("tile", new THREE.CircleGeometry(1.0, 16), 53.72, 0, ZA - 2.85, 0, PI / 2, 0, [1.33, 1.5, 1]);

    /* ---- dome joint ring and the bow-plane recess, torpedo shutters ---- */
    var xj = X(1197);
    /* the dome flange: a pale band 0.45 m wide (030803, Hawaii in dock) */
    var jb = new THREE.CylinderGeometry(hullR(xj + 0.22) + 0.04, hullR(xj - 0.22) + 0.04, 0.45, 40, 1, true);
    A.add("panel", jb, xj, 0, ZA, 0, 0, -PI / 2);
    for (s = -1; s <= 1; s += 2) {
      /* bow-plane door: the recess the retracted plane sits in (profile 1075-1114 px, 030803) */
      A.add("dark", sidePatch(THREE, s, X(1075), X(1115), ZA + 0.85, ZA + 2.45, 0.07), 0, 0, 0);
      A.add("panel", sidePatch(THREE, s, X(1081), X(1108), ZA + 1.50, ZA + 1.80, 0.10), 0, 0, 0);
      A.add("panel", sidePatch(THREE, s, X(1103), X(1153), ZA - 2.95, ZA - 2.25, 0.07), 0, 0, 0);
      A.add("panel", sidePatch(THREE, s, X(1129), X(1179), ZA - 1.35, ZA - 0.65, 0.07), 0, 0, 0);
      /* three wide-aperture array panels low on each flank */
      var WA = [[318, 500], [598, 778], [880, 1010]];
      for (k = 0; k < WA.length; k++) {
        A.add("panel", sidePatch(THREE, s, X(WA[k][0]), X(WA[k][1]), ZA - 4.55, ZA - 0.25, 0.15), 0, 0, 0);
      }
    }

    /* ---- bow weapons by block ---- */
    if (blk >= 3) {
      /* Block III on: the pale smooth panel with the two 87-inch payload tubes in line
         (USS Montana, 2022, from above the bow) */
      A.add("pale", crownPatch(THREE, 40.7, 47.5, -1.75, 1.75, 0.05, 8, 6), 0, 0, 0);
      hatch(THREE, A, 42.75, 0, 1.25, "pale");
      hatch(THREE, A, 45.55, 0, 1.25, "pale");
      A.add("dark", new THREE.BoxGeometry(1.0, 0.75, 0.05), 46.9, -1.15, topAt(46.9, -1.15) + 0.02);
    } else {
      /* Block I-II: twelve single Tomahawk tubes, two rows of six */
      for (k = 0; k < 6; k++) {
        for (s = -1; s <= 1; s += 2) hatch(THREE, A, 42.1 + k * 1.16, s * 0.64, 0.47, "panel");
      }
    }

    /* ---- the sail with its leading-edge fillet ---- */
    var zl = [1.40, 1.85, CROWN, CROWN + 0.18, CROWN + 0.37, CROWN + 0.55, CROWN + 0.73, CROWN + 0.92,
              CROWN + 1.28, CROWN + 1.65, CROWN + 2.2, CROWN + 3.6, ZT - 0.5];
    var RT = 0.5, tops = [0.42, 0.74, 0.94, 1.0], rings = [];
    for (i = 0; i < tops.length; i++) zl.push(ZT - RT + RT * tops[i]);
    for (i = 0; i < zl.length; i++) {
      z = zl[i];
      var h = z - CROWN, e2 = filExt(h), fl = 0.50 * Math.pow(e2 / 3.42, 1.3);
      var ee = Math.max(0, z - (ZT - RT)) / RT, sh = RT * (1 - Math.sqrt(Math.max(0, 1 - ee * ee)));
      var xf = SX1 + e2 - sh, xa = SX0 + sh * 0.6, hw = SHW + fl - sh * 0.7;
      rings.push({ z: z, pts: sailRing(xa, xf, hw, 2.3 + e2 * 0.85, 0.55, 56) });
    }
    A.add("tile", shell(THREE, rings), 0, 0, 0);
    /* pale dots on the cheeks: a column toward the fore end and a row near the top */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 8; k++) A.add("cap", new THREE.BoxGeometry(0.22, 0.04, 0.22), 32.4, s * (SHW + 0.01), CROWN + 0.6 + k * 0.52);
      for (k = 0; k < 5; k++) A.add("cap", new THREE.BoxGeometry(0.22, 0.04, 0.22), 29.6 + k * 0.56, s * (SHW + 0.01), CROWN + 4.25);
      /* sail-top access hatches seen on the profile */
      A.add("dark", new THREE.BoxGeometry(0.9, 0.04, 0.5), 28.0, s * (SHW + 0.01), CROWN + 3.0);
    }

    /* ---- masts, aft to fore off the profile: [px, radius, height over the sail top, kind] ---- */
    var MS = [[962, 0.42, 3.5, "head"], [974, 0.26, 4.6, "whip"], [984, 0.26, 4.8, "pale"],
              [993, 0.26, 4.6, "whip"], [1003, 0.26, 5.1, "pale"], [1011, 0.22, 0.55, "stub"]];
    for (k = 0; k < MS.length; k++) {
      var mx = X(MS[k][0]), mr = MS[k][1], mh = MS[k][2], kd = MS[k][3];
      cylZ(THREE, A, "metal", mr, mr * 1.08, mh + 0.3, 12, mx, 0, ZT + mh / 2 - 0.15);
      if (kd === "head") {
        /* the offset head the profile draws on the after mast */
        A.add("metal", new THREE.BoxGeometry(1.15, 0.62, 0.55), mx + 0.25, 0, ZT + mh - 0.1);
        A.add("dark", new THREE.BoxGeometry(0.05, 0.40, 0.30), mx + 0.84, 0, ZT + mh - 0.1);
      } else if (kd === "whip") {
        cylZ(THREE, A, "metal", 0.05, 0.07, 2.7, 6, mx, 0, ZT + mh + 1.3);
        A.add("dark", new THREE.SphereGeometry(mr * 1.15, 10, 6), mx, 0, ZT + mh);
      } else if (kd === "pale") {
        cylZ(THREE, A, "cap", mr * 1.12, mr * 1.12, 1.3, 12, mx, 0, ZT + mh - 0.75);
        A.add("cap", new THREE.SphereGeometry(mr * 1.12, 12, 6, 0, PI * 2, 0, PI / 2), mx, 0, ZT + mh - 0.1, PI / 2, 0, 0);
      }
    }

    /* ---- cruciform stern off the profile: rudders 95-136 px, stern planes 104-159 px ---- */
    var up = [[X(95), 1.6 + ZA], [X(95), 7.35 + ZA], [X(121), 7.35 + ZA], [X(125), 7.0 + ZA], [X(136), 3.2 + ZA], [X(139), 2.4 + ZA]];
    A.add("tile", ext(THREE, up, 0.55, true), 0, 0.275, 0);
    var lo = [[X(95), -1.6 + ZA], [X(139), -2.4 + ZA], [X(134.5), -3.9 + ZA], [X(130.5), -5.45 + ZA], [X(95), -5.45 + ZA]];
    lo.reverse();
    A.add("tile", ext(THREE, lo, 0.55, true), 0, 0.275, 0);
    var SPY = 6.6;
    var sp = [[X(159), 1.6], [X(136), SPY], [X(100), SPY], [X(100), -SPY], [X(136), -SPY], [X(159), -1.6]];
    sp.reverse();
    A.add("tile", ext(THREE, sp, 0.42), 0, 0, ZA - 0.21);
    /* the small spike on the upper rudder's tip and the flat-bottomed ventral fairing
       ahead of the lower rudder (profile, 136-185 px, keel line 3.62 m under the axis) */
    A.add("tile", new THREE.BoxGeometry(0.30, 0.20, 0.42), X(121.5), 0, ZA + 7.52);
    var vf = [], VF = [[X(136), 0.55], [X(150), 0.62], [X(165), 0.55], [X(180), 0.40], [X(192), 0.05]];
    for (i = 0; i < VF.length; i++) {
      var vb = ZA - 3.62, vt = ZA - hullR(VF[i][0]) + 0.6;
      vf.push({ x: VF[i][0], w: VF[i][1], h: Math.max(0.05, (vt - vb) / 2), zc: (vt + vb) / 2, sq: 0.6 });
    }
    A.add("tile", metreUV(body(THREE, M, vf, 12), 6.0, 3.0), 0, 0, 0);
    /* low hatch fairings on the crown, where the profile's top line steps up 0.18 m */
    var HF = [[410, 440], [720, 750], [870, 890]];
    for (k = 0; k < HF.length; k++) {
      var hx = (X(HF[k][0]) + X(HF[k][1])) / 2, hl = (X(HF[k][1]) - X(HF[k][0])) / 2 + 0.3;
      A.add("tile", new THREE.SphereGeometry(1, 16, 6, 0, PI * 2, 0, PI / 2), hx, 0, CROWN - 0.06, PI / 2, 0, 0, [hl, 0.26, 0.95]);
    }
    /* the tip fittings both rollout photographs show on the stern planes */
    for (s = -1; s <= 1; s += 2) {
      A.add("tile", new THREE.SphereGeometry(1, 12, 6), X(118), s * SPY, ZA, 0, 0, 0, [1.75, 0.26, 0.26]);
    }

    /* ---- pump-jet duct: lathe of its section, lip forward; dark rotor plane inside ---- */
    var dp = [[2.12, X(14)], [2.30, X(18)], [2.55, X(26)], [2.76, X(40)], [2.88, X(52)], [2.90, X(57)],
              [2.84, X(60.5)], [2.70, X(61.5)], [2.56, X(60.5)], [2.52, X(56)], [2.45, X(44)],
              [2.28, X(28)], [2.05, X(17)], [2.00, X(14.5)]];
    var lp = [];
    for (i = 0; i < dp.length; i++) lp.push(new THREE.Vector2(dp[i][0], dp[i][1]));
    lp.push(new THREE.Vector2(dp[0][0], dp[0][1]));
    var lath = new THREE.LatheGeometry(lp, 32);
    lath.rotateZ(-PI / 2);
    var ua = lath.attributes.uv;
    for (i = 0; i < ua.count; i++) ua.setXY(i, ua.getX(i) * 17.0, ua.getY(i) * 4.0);
    A.add("tile", lath, 0, 0, ZA);
    A.add("dark", new THREE.RingGeometry(0.75, 2.42, 28), X(36), 0, ZA, 0, -PI / 2, 0);
    A.add("dark", new THREE.RingGeometry(0.75, 2.42, 28), X(36), 0, ZA, 0, PI / 2, 0);

    /* ---- modest team strips on the crown fore and aft of the sail, and on the sail top ---- */
    A.add("team", crownPatch(THREE, 13.5, 16.5, -0.5, 0.5, 0.03, 2, 2), 0, 0, 0);
    A.add("team", crownPatch(THREE, -30.0, -27.0, -0.5, 0.5, 0.03, 2, 2), 0, 0, 0);
    A.add("team", new THREE.BoxGeometry(1.5, 1.6, 0.04), 27.85, 0, ZT + 0.02);

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the measured X extent (hub tip to bow dome): render3d scales a submarine by it. */
UNIT_MODELS["nato_e00_sub"] = {
  len: 114.96,
  build: function (THREE, M, C) { return HeroVirginiaSSN.build(THREE, M, C, 1); }
};
UNIT_MODELS["sub_n"] = {
  len: 114.96,
  build: function (THREE, M, C) { return HeroVirginiaSSN.build(THREE, M, C, 4); }
};
