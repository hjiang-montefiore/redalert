/* ============ us_sturgeon_ssn.js -- HERO model: USS Sturgeon (SSN-637) (nato_e60_sub) ============
   The lead boat of the Sturgeon class as commissioned on 3 March 1967: the SHORT hull
   (292 ft 3 in). The long-hull boats from SSN-678 on are a different row and are not drawn.

   References (fetched small into scratchpad/q_sturgeon_ref, generic User-Agent only):
     - "SSN637.svg" (Wikimedia Commons, "Sturgeon-class submarine profile"): THE side
       elevation. Rendered at 3399 px for 89.08 m, so 38.08 px/m, hull axis on row 688.5.
       Every hull station, the sail, the sail plane, the masts, the rudders, the stern
       planes with their end plates and the screw below are read off it.
     - "USS Sturgeon (SSN-637).jpg" (Commons, USN NPC K-36125, shakedown trials,
       15 Feb 1967): head-on from above. Tall narrow sail with a round front, the open
       bridge cockpit and windscreen at the top front, the big tapered sail planes LOW on
       the sail with thick roots, swept leading edges and square trailing edges, black
       finish, upper rudder standing clear aft.
     - NavSource 0863705 (sea trials 1966-67, colour) and 0863719 (commissioning,
       3 Mar 1967): dull black hull and sail, the sail planes from the bow quarter, the
       broad rounded casing forward.
     - NavSource 0863712 (launch, 26 Feb 1966, from high over the bow): the sail and
       its planes head-on, the hull dark all over down to the water.
     - "USS Drum (SSN-677).jpg" (Commons, the last short-hull boat, entering port):
       near-orthogonal side view, bow to the left. The very low casing, the sail a quarter of the way
       back, rungs up the forward sail side, the upper rudder well aft of the casing.
     - "Sail of USS Sturgeon (SSN-637)" (Commons, Keyport museum, 2012): plate seams,
       the rung ladder near the leading edge, the hatch row at the sail base, the sail
       plane's thick rounded root and pointed tip, the mast fairings in the after half.
     - Port-quarter view of a Sturgeon-class boat (Commons, DPLA, 1992) and the
       tender photograph NH 107771-KN (1980s, planes turned vertical): four masts raised
       in the after half of the sail; the planes do rotate to vertical.
     - "USS STURGEON (SSN-637) underway off Long Island" (Commons, 1991): the sail
       nearly side-on, planes about 40 per cent of the way up it.
     - NavSource line art (globalsecurity): rudders with raked leading edges.
   Published (NavSource): length 292 ft 3 in = 89.08 m, beam 31 ft 8 in = 9.65 m,
   draft 28 ft 8 in = 8.74 m, one S5W, ONE screw.

   RECOGNITION LIST (each one is in the model):
     1. Albacore-type teardrop: a long ELLIPTICAL bow that reaches the full 9.65 m only
        17 m aft of the stem, a parallel middle body to 55 m, then an almost straight
        conical run to the screw (station table below; SSN637.svg).
     2. The tall slab sail, 8.6 m chord and 5.6-6.0 m over the casing, set a quarter of
        the length back (17.4-26.0 m from the stem); flat sides, round front, top rising
        slightly forward (SSN637.svg; Drum; 1991 photograph).
     3. Sail planes mounted LOW, 46 per cent of the way up the sail, on round hinge discs
        (they turn vertical to come up through ice): thick round root, swept leading
        edge, square trailing edge, strong taper (SSN637.svg root section; 1967 bow view;
        commissioning; museum).
     4. The bridge cockpit and windscreen at the top front of the sail (1967 bow view).
     5. Rung ladder up the forward sail side, the hatch row along the sail base, plate
        seams and the forward side panel (museum; Drum; SSN637.svg) - sail texture.
     6. Masts in the after half of the sail: two periscopes, a whip, the ESM head on its
        fairing (SSN637.svg positions and heights; 1992 photograph).
     7. Cruciform stern: tall upper and lower rudders with raked leading edges and
        vertical trailing edges; stern planes on the axis with END PLATES at the tips
        (SSN637.svg; rudders also in the line art).
     8. ONE seven-bladed skewed bronze screw with a long pointed hub cone (SSN637.svg).
     9. The casing: a narrow flat walking deck along the crown, three raised hatch
        trunks aft of the sail, flush hatches fore and aft (SSN637.svg; Drum).
    10. Finish of the period: dull black above, red-brown anti-fouling below the axis
        line with the bow sonar dome left black, as the drawing paints it; black as the
        1966-67 photographs show (no hull number drawn).
    11. Very low freeboard: the hull axis 3.85 m under the water line, so the crown is
        just under 1 m out and the keel draws 8.7 m (published draft 8.74 m).

   STATION TABLE [s = metres aft of the stem, r = radius in metres]: read off the drawing
   at every metre (the top and bottom edges agree to a pixel, so the hull is a body of
   revolution on a straight axis) and taken by 0.995 so the 9.74 m drawn diameter is the
   published 9.65 m beam. Between 81 and 85 m, where the rudders hide the outline, the
   straight taper is carried through (it is 0.24 m per metre either side).

   Estimated, not measured (no plan view was found): the sail width (1.6 m) and the
   sail plane span (10.6 m). Both come off the head-on 1967 photograph scaled by the
   drawing's sail height: 240 px for the 5.6 m of sail out of the water, the sail 1.3-1.7 m
   across above the planes, the planes 455 px = 10.5 m tip to tip;
   the stern plane span (9.2 m, about the beam), the end-plate spacing on it, the
   aft-end taper of the sail. Not confirmed and so NOT drawn: the BPS radar mast is
   left housed (the drawing raises it at the front of the sail, but every 1967
   photograph shows the bridge cockpit there and no mast up); no towed-array fairing
   (later), no camouflage on the masts (the drawing and the museum show a later
   mottle; drawn dark), no hull number, no draft marks, no flag, no rails.
   Resting on the drawing alone: the stern-plane END PLATES (the simplified line art
   does not show them) and the red under the axis line (no period photograph shows the
   lower hull; the 1966 launch view is dark down to the water, above the axis).
   The screw's blade count is read from the drawing's profile, not a photograph.
   The row is not turret:true, so nothing is named "turret". ASCII only.
   Model space +X bow, +Y port, +Z up, metres; water line z = 0. render3d scales a
   submarine by UNIT_MODELS[key].len, which is the measured X extent of 89.1 m.
   Merged per material: 6 draw calls. */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSturgeon637 = (function () {
  "use strict";

  var PI = Math.PI;
  var XB = 44.55;              /* stem; the screw's hub cone ends at -44.55            */
  var LH = 86.6;               /* hull length to the end of the tail cone            */
  var ZA = -3.85;              /* hull axis: crown just under 1 m out, keel at -8.7  */
  var DECK = 0.06;             /* the casing deck is a flat this far under the crown */

  /* ---- station table off SSN637.svg (see header) ---- */
  var STA = [
    [0.00, 0.17], [0.10, 0.54], [0.25, 0.81], [0.50, 1.10], [0.75, 1.36], [1.00, 1.54],
    [1.50, 1.86], [2.00, 2.12], [2.50, 2.34], [3.00, 2.54], [3.50, 2.72], [4.00, 2.88],
    [5.00, 3.14], [6.00, 3.37], [7.00, 3.59], [8.00, 3.78], [9.00, 3.95], [10.0, 4.09],
    [11.0, 4.22], [12.0, 4.34], [13.0, 4.43], [14.0, 4.51], [15.0, 4.59], [16.0, 4.66],
    [17.0, 4.72], [18.0, 4.77], [19.0, 4.80], [20.0, 4.815], [22.0, 4.826], [55.0, 4.826],
    [56.0, 4.82], [57.0, 4.81], [58.0, 4.795], [59.0, 4.77], [60.0, 4.73], [61.0, 4.69],
    [62.0, 4.64], [63.0, 4.59], [64.0, 4.53], [65.0, 4.46], [66.0, 4.38], [67.0, 4.30],
    [68.0, 4.22], [69.0, 4.14], [70.0, 4.04], [71.0, 3.93], [72.0, 3.80], [73.0, 3.66],
    [74.0, 3.49], [75.0, 3.32], [76.0, 3.14], [77.0, 2.94], [78.0, 2.73], [79.0, 2.52],
    [80.0, 2.31], [81.0, 2.08], [82.0, 1.84], [83.0, 1.60], [84.0, 1.36], [85.0, 1.12],
    [86.0, 0.87], [86.6, 0.74]
  ];
  function rOf(s) {
    var i;
    if (s <= 0) return STA[0][1];
    for (i = 1; i < STA.length; i++) {
      if (s <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], t = (s - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return STA[STA.length - 1][1];
  }
  function sOf(x) { return XB - x; }
  function hullR(x) { return rOf(sOf(x)); }
  /* the casing deck: flat from 3 m aft of the stem to the start of the tail cone */
  function deckDrop(s) {
    if (s < 1.5 || s > 78) return 0;
    if (s < 3) return DECK * (s - 1.5) / 1.5;
    if (s > 72) return DECK * (78 - s) / 6;
    return DECK;
  }
  function crownZ(x) { var s = sOf(x); return ZA + rOf(s) - deckDrop(s); }
  function sideY(x, z) {
    var r = hullR(x), dz = z - ZA, v = r * r - dz * dz;
    return Math.sqrt(Math.max(v, 0.01));
  }

  /* ---- the sail (all off the drawing except the width) ---- */
  var SX_LE = XB - 17.40, SX_TE = XB - 26.00, SCH = SX_LE - SX_TE;   /* 27.15 .. 18.55 */
  var SHW = 0.80;              /* half width, estimated (see header)                  */
  var SZ0 = 0.30;              /* sail shell starts inside the hull                   */
  var SZT_A = ZA + 10.49, SZT_F = ZA + 10.89;  /* top aft 6.64, top forward 7.04     */
  function sailTop(x) {
    var t = Math.max(0, Math.min(1, (x - SX_TE) / SCH));
    return SZT_A + (SZT_F - SZT_A) * Math.sin(Math.min(1, t / 0.6) * PI / 2);
  }
  var PL_X = XB - 21.09, PL_Z = ZA + 7.64;     /* sail plane root centre (drawing)   */

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function cvs(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }

  /* ================================================================ textures */
  var BLACK = "#2c2d30";       /* Keyport sail sampled (49,50,53), taken to 0.9       */
  var AFRED = "#5e2a1e";       /* the drawing's anti-fouling red, toned down          */
  var _hull = null, _sail = null;

  /* hull: u = s / LH (stem at u = 0), v = angle / 2PI from the keel round the port
     side (0.25 port beam, 0.5 crown, 0.75 starboard beam). Canvas row = (1 - v) H. */
  function hullTex(THREE) {
    if (_hull) return _hull;
    var W = 1024, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(6370), i, s, x, k;
    var PXM = W / LH;
    function col(sm) { return sm * PXM; }
    function row(v) { return (1 - v) * H; }
    g.fillStyle = BLACK; g.fillRect(0, 0, W, H);
    /* red below the axis (v < 0.25 and v > 0.75), the dome forward of 7.3 m left black */
    g.fillStyle = AFRED;
    g.fillRect(col(7.3), row(0.25), W - col(7.3), H - row(0.25));
    g.fillRect(col(7.3), 0, W - col(7.3), row(0.75));
    /* weathering: paint is never one flat black */
    for (i = 0; i < 700; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.06)";
      g.fillRect(R1() * W, R1() * H, 6 + R1() * 26, 2 + R1() * 5);
    }
    /* the dome joint, a line round the hull at 7.3 m (drawing) */
    g.fillStyle = "rgba(0,0,0,0.45)"; g.fillRect(col(7.3) - 1, 0, 2, H);
    /* faint plate butts round the girth and seams along it */
    g.fillStyle = "rgba(0,0,0,0.16)";
    for (s = 10; s < LH - 4; s += 4.2) g.fillRect(col(s), 0, 1, H);
    for (k = 1; k < 8; k++) g.fillRect(0, (k / 8) * H, W, 1);
    /* the casing deck along the crown: a slightly worn strip with its edge lines */
    var dv = 0.026;            /* acos(1 - DECK / r) / 2PI at the full radius        */
    g.fillStyle = "rgba(255,255,255,0.045)";
    g.fillRect(col(3), row(0.5 + dv), col(72) - col(3), (2 * dv) * H);
    g.fillStyle = "rgba(0,0,0,0.35)";
    g.fillRect(col(3), row(0.5 + dv), col(72) - col(3), 1);
    g.fillRect(col(3), row(0.5 - dv), col(72) - col(3), 1);
    /* flush hatches on the crown: forward escape and loading hatches, after hatch */
    function hatch(s0, s1) {
      g.strokeStyle = "rgba(0,0,0,0.6)"; g.lineWidth = 1.2;
      g.beginPath();
      g.ellipse((col(s0) + col(s1)) / 2, row(0.5), (col(s1) - col(s0)) / 2, dv * H * 0.8, 0, 0, PI * 2);
      g.stroke();
    }
    hatch(9.9, 11.6); hatch(13.6, 14.6); hatch(52.4, 54.1); hatch(60.5, 61.4);
    /* torpedo tube shutters amidships-forward, under the axis, both sides (drawing) */
    function shutter(s0, s1, v) {
      g.strokeStyle = "rgba(0,0,0,0.55)"; g.lineWidth = 1.5;
      for (k = 0; k < 2; k++) {
        var vv = k ? 1 - v : v, y = row(vv);
        g.beginPath();
        g.moveTo(col(s1), y - 3); g.lineTo(col(s0) + 4, y - 3);
        g.quadraticCurveTo(col(s0) - 1, y, col(s0) + 4, y + 3);
        g.lineTo(col(s1), y + 3); g.closePath(); g.stroke();
      }
    }
    shutter(11.3, 13.5, 0.224); shutter(12.7, 15.0, 0.188);
    /* hydrophone and sonar openings on the lower hull, as drawn */
    var holes = [[47.6, 0.16, 2.2], [52.3, 0.11, 1.6], [56.4, 0.13, 1.4], [33.2, 0.14, 1.0], [62.2, 0.18, 1.0]];
    for (i = 0; i < holes.length; i++) {
      for (k = 0; k < 2; k++) {
        g.fillStyle = "rgba(0,0,0,0.55)";
        g.beginPath();
        g.arc(col(holes[i][0]), row(k ? 1 - holes[i][1] : holes[i][1]), holes[i][2], 0, PI * 2);
        g.fill();
      }
    }
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _hull = t;
    return t;
  }

  /* sail: a side elevation, u = (x - trailing edge) / chord, v = (z - SZ0) / height.
     Both sides share it (the fittings are symmetrical). The top-left corner stays a
     plain black swatch for the planes, rudders and fairings (uv 0.02, 0.985). */
  function sailTex(THREE) {
    if (_sail) return _sail;
    var W = 512, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R1 = rng(637), i, k;
    var HT = SZT_F - SZ0;
    function U(x) { return (x - SX_TE) / SCH * W; }
    function V(z) { return (1 - (z - SZ0) / HT) * H; }
    g.fillStyle = BLACK; g.fillRect(0, 0, W, H);
    for (i = 0; i < 260; i++) {
      g.fillStyle = R1() < 0.5 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.06)";
      g.fillRect(16 + R1() * (W - 16), 8 + R1() * (H - 8), 4 + R1() * 18, 2 + R1() * 4);
    }
    /* plate seams (museum): strakes about 1.2 m deep, butts about 1.8 m apart */
    g.fillStyle = "rgba(0,0,0,0.30)";
    for (k = 1; k < 6; k++) g.fillRect(16, V(SZ0 + 0.55 + k * 1.15), W - 16, 1);
    for (k = 1; k < 5; k++) g.fillRect(U(SX_TE + k * 1.75), 10, 1, H - 10);
    /* rung ladder near the leading edge, nine rungs (drawing) */
    g.fillStyle = "rgba(0,0,0,0.75)";
    for (k = 0; k < 9; k++) g.fillRect(U(SX_LE - 1.82), V(ZA + 7.79 + k * 0.33) - 1, U(SX_LE - 1.40) - U(SX_LE - 1.82), 2);
    /* hatch row along the base (four, drawing; the museum sail shows the same) */
    var hx = [19.73, 21.28, 22.12, 22.91];
    g.strokeStyle = "rgba(0,0,0,0.65)"; g.lineWidth = 1.5;
    for (k = 0; k < hx.length; k++) g.strokeRect(U(hx[k] - 0.27), V(ZA + 5.55), U(hx[k] + 0.27) - U(hx[k] - 0.27), V(ZA + 5.03) - V(ZA + 5.55));
    /* forward side panel (drawing; dark plate in the museum photograph) */
    g.strokeRect(U(25.93), V(ZA + 8.6), U(27.0) - U(25.93), V(ZA + 7.2) - V(ZA + 8.6));
    /* the plane's hinge disc and a few round ports high up */
    g.beginPath(); g.arc(U(PL_X), V(PL_Z), 0.62 / SCH * W, 0, PI * 2); g.stroke();
    var ports = [[20.9, 9.75], [21.9, 9.95], [21.9, 9.62], [22.9, 9.4], [24.1, 9.6]];
    g.fillStyle = "rgba(0,0,0,0.5)";
    for (k = 0; k < ports.length; k++) { g.beginPath(); g.arc(U(ports[k][0]), V(ZA + ports[k][1]), 2.2, 0, PI * 2); g.fill(); }
    /* plain swatch for the plain parts */
    g.fillStyle = BLACK; g.fillRect(0, 0, 16, 10);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    _sail = t;
    return t;
  }

  function materials(THREE, C) {
    var team = (C && C.team) || 0x3f7fd0;
    var std = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m });
    };
    return {
      skin:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: hullTex(THREE), roughness: 0.9, metalness: 0.05 }),
      sail:  new THREE.MeshStandardMaterial({ color: 0xffffff, map: sailTex(THREE), roughness: 0.88, metalness: 0.06 }),
      dark:  std(0x101214, 0.80, 0.20),     /* cockpit well, mast wells, shaft gland */
      metal: std(0x3d4349, 0.50, 0.50),     /* periscopes, whip, windscreen frame    */
      screw: std(0x6a5a34, 0.50, 0.60),     /* bronze, as the drawing colours it     */
      team:  std(team, 0.86, 0.06)
    };
  }

  /* ------------------------------------------------------ merge machinery */
  function Acc(THREE) {
    var by = {}, q = new THREE.Quaternion(), e = new THREE.Euler(), m = new THREE.Matrix4(),
        p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
    function push(mat, geo, uvc) {
      if (geo.index) geo = geo.toNonIndexed();
      if (uvc) {
        var n = geo.attributes.position.count, U = new Float32Array(n * 2), i;
        for (i = 0; i < n; i++) { U[i * 2] = uvc[0]; U[i * 2 + 1] = uvc[1]; }
        geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
      }
      (by[mat] = by[mat] || []).push(geo);
    }
    return {
      add: function (mat, geo, x, y, z, rx, ry, rz, uvc) {
        e.set(rx || 0, ry || 0, rz || 0, "XYZ"); q.setFromEuler(e);
        m.compose(p.set(x || 0, y || 0, z || 0), q, s);
        geo.applyMatrix4(m);
        push(mat, geo, uvc);
      },
      addQ: function (mat, geo, x, y, z, quat, uvc) {
        m.compose(p.set(x, y, z), quat, s);
        geo.applyMatrix4(m);
        push(mat, geo, uvc);
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

  /* make a closed indexed solid face outward: flip the winding if its signed volume
     is negative, then recompute smooth normals */
  function outward(geo) {
    var P = geo.attributes.position.array, I = geo.index.array, v = 0, i;
    for (i = 0; i < I.length; i += 3) {
      var a = I[i] * 3, b = I[i + 1] * 3, c = I[i + 2] * 3;
      v += P[a] * (P[b + 1] * P[c + 2] - P[b + 2] * P[c + 1]) -
           P[a + 1] * (P[b] * P[c + 2] - P[b + 2] * P[c]) +
           P[a + 2] * (P[b] * P[c + 1] - P[b + 1] * P[c]);
    }
    if (v < 0) {
      for (i = 0; i < I.length; i += 3) { var t = I[i + 1]; I[i + 1] = I[i + 2]; I[i + 2] = t; }
      geo.index.needsUpdate = true;
    }
    geo.computeVertexNormals();
    return geo;
  }
  function mkGeo(THREE, pos, uv, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    return g;
  }
  /* fan cap over ring [b0, b0 + n) round a centre point. The cap on the FIRST ring
     of a loft is wound the other way from the cap on the last, so the solid is
     consistent; outward() then turns the whole of it the right way out. */
  function fan(pos, uv, idx, b0, n, cx, cy, cz, cu, cv, first) {
    var c = pos.length / 3, k;
    pos.push(cx, cy, cz); uv.push(cu, cv);
    for (k = 0; k < n; k++) {
      if (first) idx.push(c, b0 + ((k + 1) % n), b0 + k);
      else idx.push(c, b0 + k, b0 + ((k + 1) % n));
    }
  }

  /* ---- hull: rings of revolution with the crown flattened into the casing deck ---- */
  function hullGeo(THREE) {
    var ss = [0, 0.05, 0.1, 0.18, 0.25, 0.35, 0.5, 0.65, 0.8, 1.0, 1.25, 1.5, 1.8, 2.1, 2.5,
              3.0, 3.5, 4.0, 4.6, 5.2, 6.0, 7.0, 8.0, 9.0, 10, 11, 12, 13.5, 15, 16.5, 18, 20, 22],
        i, j, s;
    for (s = 25; s <= 55; s += 3) ss.push(s);
    for (s = 57; s <= 86; s += 1.5) ss.push(s);
    ss.push(86.6);
    var N1 = 20, N2 = 6, NR = 2 * N1 + N2;          /* 46 round each ring       */
    var pos = [], uv = [], idx = [];
    for (i = 0; i < ss.length; i++) {
      s = ss[i];
      var r = rOf(s), d = deckDrop(s), x = XB - s;
      var te = Math.max(0.12, Math.acos(Math.max(-1, 1 - d / r)));
      for (j = 0; j <= NR; j++) {
        var psi;
        if (j < N1) psi = (PI - te) * j / N1;
        else if (j < N1 + N2) psi = PI - te + 2 * te * (j - N1) / N2;
        else psi = PI + te + (PI - te) * (j - N1 - N2) / N1;
        var y = r * Math.sin(psi), zl = -r * Math.cos(psi);
        if (zl > r - d) zl = r - d;
        pos.push(x, y, ZA + zl);
        uv.push(s / LH, psi / (2 * PI));
      }
    }
    /* each ring carries a duplicate seam vertex on the keel (v = 0 and v = 1), so
       the texture does not smear right round the girth across the seam */
    var RW = NR + 1;
    for (i = 0; i < ss.length - 1; i++) {
      for (j = 0; j < NR; j++) {
        var a = i * RW + j, b = a + 1, c = a + RW, e = b + RW;
        idx.push(a, c, b, b, c, e);
      }
    }
    fan(pos, uv, idx, 0, NR, XB, 0, ZA, 0, 0.5, true);                              /* stem */
    var last = (ss.length - 1) * RW;
    fan(pos, uv, idx, last, NR, XB - 86.6, 0, ZA, 1, 0.5);                     /* tail */
    return outward(mkGeo(THREE, pos, uv, idx));
  }

  /* ---- sail outline (seen from above, counter-clockwise): round nose, flat sides,
     a short taper to a blunt rounded after end ---- */
  function sailOutline(n, trimF, trimS) {
    var hw = SHW - trimS, ha = 0.60 - trimS, ra = 0.35, ln = 1.25 - trimF * 0.4;
    var xle = SX_LE - trimF, xte = SX_TE + trimS * 0.5;
    var half = [], k, t;
    for (k = 0; k <= 6; k++) { t = k / 6 * PI / 2; half.push([xte + ra * (1 - Math.cos(t)), -ha * Math.sin(t)]); }
    half.push([xte + 2.2, -hw]);
    half.push([xle - ln, -hw]);
    for (k = 1; k <= 10; k++) { t = k / 10 * PI / 2; half.push([xle - ln + ln * Math.sin(t), -hw * Math.cos(t)]); }
    /* resample to equal arc length */
    var L = [0], tot = 0;
    for (k = 1; k < half.length; k++) {
      tot += Math.hypot(half[k][0] - half[k - 1][0], half[k][1] - half[k - 1][1]); L.push(tot);
    }
    var m = n / 2, res = [], q = 0;
    for (k = 0; k <= m; k++) {
      var d = tot * k / m;
      while (q < L.length - 2 && L[q + 1] < d) q++;
      var f = (d - L[q]) / Math.max(1e-6, L[q + 1] - L[q]);
      res.push([half[q][0] + (half[q + 1][0] - half[q][0]) * f, half[q][1] + (half[q + 1][1] - half[q][1]) * f]);
    }
    var out = res.slice(0);                               /* aft centre -> nose      */
    for (k = m - 1; k >= 1; k--) out.push([res[k][0], -res[k][1]]);  /* nose -> aft, port */
    return out;
  }
  function sailGeo(THREE) {
    var n = 44, RF = 0.6, RS = 0.14;
    var depths = [-1, 2.4, 1.2, 0.6, 0.42, 0.27, 0.14, 0.05, 0];   /* -1 = the base */
    var pos = [], uv = [], idx = [], i, j, HT = SZT_F - SZ0;
    for (i = 0; i < depths.length; i++) {
      var dl = depths[i];
      var tf = dl >= 0 && dl < RF ? RF - Math.sqrt(RF * RF - (RF - dl) * (RF - dl)) : 0;
      var ts = dl >= 0 && dl < RS ? RS - Math.sqrt(RS * RS - (RS - dl) * (RS - dl)) : 0;
      var pts = sailOutline(n, tf, ts);
      for (j = 0; j < n; j++) {
        var x = pts[j][0], y = pts[j][1], z = dl < 0 ? SZ0 : sailTop(x) - dl;
        pos.push(x, y, z);
        uv.push((x - SX_TE) / SCH, (z - SZ0) / HT);
      }
    }
    for (i = 0; i < depths.length - 1; i++) {
      for (j = 0; j < n; j++) {
        var a = i * n + j, b = i * n + (j + 1) % n;
        idx.push(a, b, a + n, b, b + n, a + n);
      }
    }
    var top = (depths.length - 1) * n, cx = (SX_LE + SX_TE) / 2;
    fan(pos, uv, idx, top, n, cx, 0, sailTop(cx) + 0.02, 0.02, 0.985);
    fan(pos, uv, idx, 0, n, cx, 0, SZ0, 0.02, 0.985, true);
    /* the top fan's ring copies take the plain swatch too */
    var g = mkGeo(THREE, pos, uv, idx);
    return outward(g);
  }

  /* ---- a foil (plane, rudder, end plate) lofted along its span from symmetric
     sections. st: [{sp, xle, c, t}]; axis "y": span along y, thickness along z about
     zc (planes); axis "z": span along z, thickness along y about yc (rudders, plates). */
  function foil(THREE, st, axis, c0, sgn) {
    var NS = 14, pos = [], uv = [], idx = [], i, k;
    function h(xf) {
      return 5 * (0.2969 * Math.sqrt(xf) - 0.1260 * xf - 0.3516 * xf * xf + 0.2843 * xf * xf * xf - 0.1036 * xf * xf * xf * xf);
    }
    for (i = 0; i < st.length; i++) {
      var S = st[i];
      for (k = 0; k < NS; k++) {
        var th = k / NS * 2 * PI, xf = (1 + Math.cos(th)) / 2;
        var off = S.t * h(xf) * (Math.sin(th) >= 0 ? 1 : -1);
        if (k === 0) off = 0;
        var x = S.xle - xf * S.c;
        if (axis === "y") pos.push(x, sgn * S.sp, c0 + off);
        else pos.push(x, c0 + off, S.sp);
        uv.push(0.02, 0.985);
      }
    }
    for (i = 0; i < st.length - 1; i++) {
      for (k = 0; k < NS; k++) {
        var a = i * NS + k, b = i * NS + (k + 1) % NS;
        idx.push(a, b, a + NS, b, b + NS, a + NS);
      }
    }
    var L = st.length - 1, S0 = st[0], SL = st[L];
    if (axis === "y") {
      fan(pos, uv, idx, 0, NS, S0.xle - S0.c * 0.4, sgn * S0.sp, c0, 0.02, 0.985, true);
      fan(pos, uv, idx, L * NS, NS, SL.xle - SL.c * 0.4, sgn * SL.sp, c0, 0.02, 0.985);
    } else {
      fan(pos, uv, idx, 0, NS, S0.xle - S0.c * 0.4, c0, S0.sp, 0.02, 0.985, true);
      fan(pos, uv, idx, L * NS, NS, SL.xle - SL.c * 0.4, c0, SL.sp, 0.02, 0.985);
    }
    return outward(mkGeo(THREE, pos, uv, idx));
  }

  /* cylinder between two points */
  function strut(THREE, A, mat, r1, r2, a, b, seg, uvc) {
    var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    var len = d.length(), q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    A.addQ(mat, new THREE.CylinderGeometry(r2, r1, len, seg || 8), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, q, uvc);
  }
  var PLAIN = [0.02, 0.985];

  function build(THREE, M, C) {
    var g = new THREE.Group();
    var T = materials(THREE, C || {});
    var A = Acc(THREE);
    var i, k, x, z, sp;

    /* ---- 1. hull ---- */
    A.add("skin", hullGeo(THREE), 0, 0, 0);

    /* ---- 9. casing: three raised hatch trunks aft of the sail (drawing) ---- */
    var trunks = [[6.40, 1.05], [-6.40, 0.75], [-20.10, 1.00]];
    for (i = 0; i < trunks.length; i++) {
      x = trunks[i][0]; z = crownZ(x);
      var tg = new THREE.CylinderGeometry(0.45, 0.45, trunks[i][1], 14, 1);
      tg.rotateZ(PI / 2); tg.scale(1, 1, 0.42);              /* a low rounded hump */
      A.add("sail", tg, x, 0, z + 0.11, 0, 0, 0, PLAIN);
    }

    /* ---- 2. sail ---- */
    A.add("sail", sailGeo(THREE), 0, 0, 0);

    /* ---- 4. bridge cockpit and windscreen at the top front (1967 bow view) ---- */
    var ckA = SX_LE - 1.75, ckF = SX_LE - 0.62;
    A.add("dark", new THREE.BoxGeometry(ckF - ckA, 0.86, 0.30), (ckA + ckF) / 2, 0, sailTop(ckF) - 0.12);
    for (k = -1; k <= 1; k += 2) {
      strut(THREE, A, "metal", 0.03, 0.03, [ckF + 0.05, k * 0.38, sailTop(ckF)], [ckF - 0.05, k * 0.43, sailTop(ckF) + 0.32], 5);
    }
    strut(THREE, A, "metal", 0.035, 0.035, [ckF - 0.05, -0.43, sailTop(ckF) + 0.32], [ckF - 0.05, 0.43, sailTop(ckF) + 0.32], 5);
    strut(THREE, A, "metal", 0.03, 0.03, [ckF + 0.12, -0.36, sailTop(ckF) + 0.02], [ckF + 0.12, 0.36, sailTop(ckF) + 0.02], 5);

    /* ---- team: a modest patch on the sail top between the cockpit and the masts,
       and a strip on the after casing, both facing the camera ---- */
    A.add("team", new THREE.BoxGeometry(1.6, 1.0, 0.04), 24.45, 0, sailTop(24.45) + 0.03);
    A.add("team", new THREE.BoxGeometry(3.0, 0.8, 0.04), -14.0, 0, crownZ(-14.0) + 0.02);

    /* ---- 3. sail planes, low on the sail, on their hinge discs ---- */
    var PLE = PL_X + 1.655, PC = 3.31, PT = 0.68, PSPAN = 5.3, PTC = 1.0;
    for (k = -1; k <= 1; k += 2) {
      var pst = [];
      var ys = [0.5, SHW, 1.4, 2.2, 3.0, 3.8, 4.6, PSPAN];
      for (i = 0; i < ys.length; i++) {
        var f = Math.max(0, (ys[i] - SHW) / (PSPAN - SHW));
        var ch = PC + (PTC - PC) * f;
        var te = PLE - PC;                                   /* square trailing edge */
        var tip = ys[i] === PSPAN ? 0.88 : 1;
        pst.push({ sp: ys[i], xle: te + ch * tip + (1 - tip) * 0.06, c: ch * tip, t: (PT + (0.20 - PT) * Math.pow(f, 0.8)) * (tip < 1 ? 0.7 : 1) });
      }
      A.add("sail", foil(THREE, pst, "y", PL_Z, k), 0, 0, 0);
      /* hinge disc boss, just proud of the sail side */
      A.add("sail", new THREE.CylinderGeometry(0.62, 0.62, 0.06, 18), PL_X, k * (SHW + 0.02), PL_Z, 0, 0, 0, PLAIN);
    }

    /* ---- 6. masts: four up in the after half of the sail (drawing x and heights) ---- */
    var masts = [
      /* x,     fairing top z, r,    kind */
      [20.31, ZA + 14.48, 0.33, "scope"],
      [21.20, ZA + 14.22, 0.36, "whip"],
      [22.05, ZA + 14.27, 0.33, "scope2"],
      [22.96, ZA + 14.27, 0.35, "esm"]
    ];
    for (i = 0; i < masts.length; i++) {
      var mx = masts[i][0], mt = masts[i][1], mr = masts[i][2], st0 = sailTop(mx) - 0.2;
      strut(THREE, A, "sail", mr, mr * 0.96, [mx, 0, st0], [mx, 0, mt], 14, PLAIN);
      A.add("dark", new THREE.CircleGeometry(mr * 0.85, 12), mx, 0, mt + 0.005);
      A.add("dark", new THREE.CylinderGeometry(mr + 0.05, mr + 0.05, 0.05, 14), mx, 0, sailTop(mx) + 0.01, PI / 2, 0, 0);
      if (masts[i][3] === "scope") {                 /* search periscope, run right up */
        strut(THREE, A, "metal", 0.13, 0.12, [mx, 0, mt - 0.1], [mx, 0, ZA + 17.6], 10);
        strut(THREE, A, "metal", 0.12, 0.16, [mx, 0, ZA + 17.6], [mx, 0, ZA + 17.95], 10);
      } else if (masts[i][3] === "whip") {           /* thin whip aerial */
        strut(THREE, A, "metal", 0.07, 0.025, [mx, 0, mt - 0.1], [mx, 0, ZA + 17.0], 6);
      } else if (masts[i][3] === "scope2") {         /* attack periscope, slim head */
        strut(THREE, A, "metal", 0.08, 0.06, [mx, 0, mt - 0.1], [mx, 0, ZA + 16.05], 8);
        strut(THREE, A, "metal", 0.06, 0.03, [mx, 0, ZA + 16.05], [mx - 0.08, 0, ZA + 16.45], 6);
      } else {                                         /* ESM head: bulb and flat cap */
        strut(THREE, A, "metal", 0.10, 0.10, [mx, 0, mt - 0.1], [mx, 0, mt + 0.25], 8);
        A.add("metal", new THREE.SphereGeometry(0.22, 12, 8), mx, 0, mt + 0.50, 0, 0, 0);
        A.add("metal", new THREE.CylinderGeometry(0.20, 0.22, 0.45, 12), mx, 0, mt + 0.30, PI / 2, 0, 0);
        strut(THREE, A, "metal", 0.06, 0.06, [mx, 0, mt + 0.6], [mx, 0, mt + 0.95], 6);
        A.add("metal", new THREE.CylinderGeometry(0.42, 0.42, 0.06, 14), mx, 0, mt + 0.98, PI / 2, 0, 0);
      }
    }

    /* ---- 7. cruciform stern (drawing): rudders, planes with end plates ---- */
    var XTE = XB - 84.64;                                   /* common trailing edge */
    /* upper rudder: root on the axis, raked leading edge, top 5.42 m over the axis */
    var ur = [];
    for (i = 0; i <= 5; i++) {
      z = ZA + 0.3 + (5.42 - 0.3) * i / 5;
      var xle = (XB - 81.15) + (z - (ZA + 2.06)) * (-0.152);
      ur.push({ sp: z, xle: xle, c: xle - XTE, t: 0.42 - 0.20 * i / 5 });
    }
    ur[5].c *= 0.97; ur[5].t *= 0.75;
    A.add("sail", foil(THREE, ur, "z", 0, 1), 0, 0, 0);
    var lr = [];
    for (i = 0; i <= 5; i++) {
      z = ZA - 0.3 - (5.42 - 0.3) * i / 5;
      var xl2 = (XB - 81.15) + ((2 * ZA - z) - (ZA + 2.06)) * (-0.152);
      lr.push({ sp: z, xle: xl2, c: xl2 - XTE, t: 0.42 - 0.20 * i / 5 });
    }
    lr[5].c *= 0.97; lr[5].t *= 0.75;
    A.add("sail", foil(THREE, lr, "z", 0, 1), 0, 0, 0);
    /* stern planes on the axis: root leading edge at 79.2 m (the drawing's root
       fairing), tip 81.3 m, straight trailing edge with the rudders */
    var SSPAN = 4.6;
    for (k = -1; k <= 1; k += 2) {
      var sps = [];
      var yy = [0.3, 1.2, 2.2, 3.2, 4.0, SSPAN];
      for (i = 0; i < yy.length; i++) {
        var fy = yy[i] / SSPAN, xl3 = (XB - 79.2) + ((XB - 81.3) - (XB - 79.2)) * Math.pow(fy, 0.8);
        sps.push({ sp: yy[i], xle: xl3, c: xl3 - XTE, t: 0.9 - 0.62 * Math.pow(fy, 0.6) });
      }
      A.add("sail", foil(THREE, sps, "y", ZA, k), 0, 0, 0);
      /* end plate at the tip: 3.45 m chord, 2.76 m tall, front edge curved (drawing) */
      var ep = [];
      for (i = 0; i <= 6; i++) {
        var u = -1 + 2 * i / 6;
        var xe = (XB - 81.3) - 0.28 * u * u;
        ep.push({ sp: ZA + 1.38 * u, xle: xe, c: xe - (XB - 84.75), t: 0.24 });
      }
      A.add("sail", foil(THREE, ep, "z", k * (SSPAN + 0.02), 1), 0, 0, 0);
    }

    /* ---- 8. the single screw: shaft gland, hub, long cone, seven skewed blades ---- */
    var hx0 = XB - 86.6, hx1 = XB - 87.75;
    A.add("dark", new THREE.CylinderGeometry(0.70, 0.74, 0.25, 16), hx0 - 0.1, 0, ZA, 0, 0, PI / 2);
    A.add("screw", new THREE.CylinderGeometry(0.78, 0.70, hx0 - hx1 - 0.2, 16), (hx0 + hx1) / 2 - 0.1, 0, ZA, 0, 0, PI / 2);
    A.add("screw", new THREE.ConeGeometry(0.76, XB - 87.75 - (-XB), 16), (hx1 + (-XB)) / 2, 0, ZA, 0, 0, PI / 2);
    /* blade outline in (along-shaft, radial): root on the hub, scimitar skew to a
       tip 2.23 m out (drawing) */
    var bl = [[0.35, 0.62], [0.05, 1.05], [-0.18, 1.55], [-0.22, 1.95], [-0.05, 2.23],
              [0.20, 2.12], [0.34, 1.70], [0.42, 1.15], [0.48, 0.62]];
    for (i = 0; i < 7; i++) {
      var sh = new THREE.Shape();
      sh.moveTo(bl[0][0], bl[0][1]);
      for (k = 1; k < bl.length; k++) sh.lineTo(bl[k][0], bl[k][1]);
      sh.closePath();
      var gb = new THREE.ExtrudeGeometry(sh, { depth: 0.07, bevelEnabled: false });
      gb.translate(0, 0, -0.035);
      gb.rotateY(-0.65);                                    /* blade pitch */
      gb.rotateX(i * 2 * PI / 7);
      A.add("screw", gb, (hx0 + hx1) / 2 - 0.15, 0, ZA);
    }

    A.done(T, g);
    return g;
  }

  return { build: build };
})();

/* len is the true 89.1 m and the model's X extent: render3d scales a submarine by it. */
UNIT_MODELS["nato_e60_sub"] = {
  len: 89.1,
  build: function (THREE, M, C) { return HeroSturgeon637.build(THREE, M, C); }
};
