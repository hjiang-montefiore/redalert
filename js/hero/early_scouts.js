/* ======= early_scouts.js - HERO models: the first missile helicopters =======
   Two defs that had no model of their own, so render3d.js modelKeyFor fell
   back to the first gunship peer and drew both of them as the AH-64E
   Longbow Apache (hero/nato_e20_gunship_ah64e.js), repainted by ERA_KIT:

     fra_e50_gunship  Sud-Est SE.3130 Alouette II with four Nord AS.11,
                      the first armed helicopter anywhere (ALAT, Algeria,
                      from 1958)
     gbr_e60_gunship  Westland Scout AH.1 with four Nord SS.11 and the
                      AF.120 roof sight (Army Air Corps, 1960s-70s)

   A model registered under the def's own id is the one modelKeyFor
   returns, so each def now gets its own airframe. With the key equal to
   the def id no ERA_KIT repaint runs, so the period paint is built in:
   ALAT olive drab on the Alouette; on the Scout the Army Air Corps'
   plain olive drab of 1969-73, when the SS.11 fit came in (see THE PERIOD
   in the Scout's notes).

   REFERENCES (checked against photographs; the corrections to the brief
   are listed at the end of each machine's notes).
   Alouette II, SE.3130:
     main rotor   10.20 m, three blades, turning CLOCKWISE seen from above
                  (thisdayinaviation.com, SE.3130 entry; Jane's 1966-67)
     tail rotor    1.81 m, two blades (heli-archive.ch technical article)
     length       12.05 m rotors turning, 9.66 m fuselage (Jane's)
     height        2.75 m to the top of the rotor head
     skid track    2.08 m (6 ft 10 in)
     cabin         1.30 x 1.96 x 1.33 m inside (heli-archive.ch)
   Stations were measured off the Wikimedia Commons three-view
   "Alouette2-schema.png" (scaled on the 10.20 m rotor), the in-flight side
   views of Belgian A-79 and ex-Swiss V-54 (2-BVSD), and the Bueckeburg
   museum's Heeresflieger 75+46 photographed square-on ("SNCASE SE3130
   Alouette II (cn 1363, 75+46) 2012-09-08 Andre Gerwing Collection ID
   017713"). The AS.11 fit is from the 1958 Swedish demonstration series
   ("Alouette II AS.11 demonstration, Sweden, 1958" and "Alouette II
   demonstration, Sweden 1958 1/2") and the Heer's "AloutteIIBundeswehr".
   Scout AH.1:
     main rotor    9.83 m, four blades (Jane's 1965-66), turning
                  ANTI-clockwise seen from above as Westland rotors do
                  (aerospaceweb.org, rotation conventions)
     tail rotor    2.29 m, two blades (flugzeuginfo.net data sheet)
     length       12.29 m rotors turning, 9.24 m fuselage
     height        2.72 m to the top of the rotor head
   Stations from the Commons three-view "Westland Scout 3-view line
   drawing" (scaled on the 9.83 m rotor, which puts the hubs 6.3 m apart
   against the 6.23 m the published lengths give), the side-on in-flight
   view of XT626 ("Westland Scout AH1, Historic Army Aircraft Flight"),
   XR635's tail at the Midland Air Museum, XT630 parked with its AF.120
   head still on the roof, and the Royal Marines' "Scout with SS.11s"
   series (1978) for the missile fit and the sight. The period finish is
   from "Westland Scout XR628 Habilayn" (1967) and "663 AAC Squadron
   Scout AH.1" (1969), and the tail rotor bands from Wikipedia's Westland
   Scout article.

   Model space: +X nose, +Y LEFT (port), +Z up, real metres. The origin is
   the point the aircraft is flown at, under the mast at about the height
   of the centre of mass. render3d.js stands the model up with
   rotation.x = -PI/2 and scales it by the measured X extent.

   WHAT SETS THE SCALE. The faint rotor disc is the front of the box on
   both machines. On the Alouette the tail rotor guard hoop, 0.15 m behind
   the tail rotor's own disc, is the back of it: 12.21 m against the
   published 12.05 m to the tail rotor tip. On the Scout one tail rotor
   blade is built pointing straight aft, as on the AH-64E hero, so the
   extent is the published 12.29 m. Main blades sit at 60/180/300 degrees
   (Alouette) and 45/135/225/315 (Scout), so none sets it.

   NAMED NODES, as on the AH-64E and Mi-28N heroes:
     rotor      render3d.js turns it with rotateOnWorldAxis(scene up), which
                three.js applies in the PARENT's frame. The head hangs in a
                mount turned about X: -PI/2 on the Alouette puts the spin
                axis on the DOWNWARD mast, so it turns clockwise from above
                as a French rotor does (the Mi-28N mount); +PI/2 on the
                Scout turns it anti-clockwise (the AH-64E mount). Inside the
                mount a group turned back by the same angle puts the head
                into model axes.
     rotordisc  inside the rotor, on its own transparent, depthWrite:false
                material, which the renderer fades with rpm.
     tailrotor  the asw_helo_fit.js tail mount (+PI/2 about X); hub axis
                along local Z, the model's lateral axis. Local +Z is the
                model's RIGHT: the Alouette's rotor is outboard on +Z
                (starboard), the Scout's on -Z (port).
   The skids are NOT named "gear": they are fixed, and the renderer hides
   a "gear" node above 18 m.

   Materials are the house tiers: SKIN (one procedural CanvasTexture per
   machine, roughness 0.86, metalness 0.08), the plain PAINT of tubes and
   skids, METAL and DARK fittings, the BLADE finish, a STORES finish for
   the missiles, GLASS, the TEAM flash and the DISC. Nine per machine, and
   everything that shares a material is merged: twelve draw calls each.
   The team material is exactly C.team, as on every hero. The Alouette's
   SKIN is DoubleSide, because its cabin tub is seen from inside through
   the clear bubble; the Scout's tail rotor blades are on its SKIN, banded
   red and white through UVs of their own.
   ASCII only.                                                              */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroEarlyScouts = (function () {
  "use strict";

  var PI = Math.PI, D2R = PI / 180;
  var V = null;                            /* the THREE build() is handed */

  /* =========================================================== paint ===
     One 1024 x 1024 sheet per machine in four 256-pixel bands, each a
     projection of the airframe in model metres, as on the AH-64E hero:
        band 0  TOP        x across, y down the band (port at the top)
        band 1  PORT side  x across, z down the band
        band 2  STARBOARD  x across, z down the band
        band 3  BELLY      x across, y down the band
     projUV() picks the band from each triangle's face normal. */
  var TW = 1024, TH = 1024, BAND = 256;
  function sheet(ux0, ux1, qy, qz0, qz1) {
    var s = { sx: TW / (ux1 - ux0) };
    s.x = function (x) { return (x - ux0) * s.sx; };
    s.top = function (y) { return (qy - y) / (2 * qy) * BAND; };
    s.side = function (z, b) { return b * BAND + (qz1 - z) / (qz1 - qz0) * BAND; };
    s.belly = function (y) { return 3 * BAND + (qy - y) / (2 * qy) * BAND; };
    s.sz = BAND / (qz1 - qz0);             /* px per metre, side bands  */
    s.sq = BAND / (2 * qy);                /* px per metre, top/belly   */
    return s;
  }

  function rngFor(seed) {
    var s = (seed >>> 0) || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* hard-edged camouflage blob: an irregular polygon, longer along x */
  function blob(g, cx, cy, rx, ry, rot, R) {
    var n = 12, i, pts = [];
    for (i = 0; i < n; i++) {
      var a = i / n * PI * 2, k = 0.70 + R() * 0.50;
      pts.push([Math.cos(a) * rx * k, Math.sin(a) * ry * k]);
    }
    var c = Math.cos(rot), s = Math.sin(rot);
    g.beginPath();
    for (i = 0; i < n; i++) {
      var x = cx + pts[i][0] * c - pts[i][1] * s, y = cy + pts[i][0] * s + pts[i][1] * c;
      if (i) g.lineTo(x, y); else g.moveTo(x, y);
    }
    g.closePath();
    g.fill();
  }
  function roundel(g, cx, cy, r, rings) {
    for (var i = 0; i < rings.length; i++) {
      g.fillStyle = rings[i][0];
      g.beginPath(); g.arc(cx, cy, r * rings[i][1], 0, PI * 2); g.fill();
    }
  }
  /* panel seams at real frame stations, stringers, hatches and grime */
  function seams(g, S, R, frames, sideH, Z, nHatch) {
    var i, x, y;
    g.lineWidth = 1.5;
    for (i = 0; i < frames.length; i++) {
      x = S.x(frames[i]);
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, TH); g.stroke();
      g.strokeStyle = "rgba(255,255,240,0.07)";
      g.beginPath(); g.moveTo(x + 2, 0); g.lineTo(x + 2, TH); g.stroke();
      g.fillStyle = "rgba(0,0,0,0.22)";
      for (y = 3; y < TH; y += 7) g.fillRect(x - 4, y, 1.5, 1.5);
    }
    g.strokeStyle = "rgba(0,0,0,0.24)"; g.lineWidth = 1.3;
    sideH.forEach(function (h) {
      for (var b = 1; b <= 2; b++) {
        var yy = S.side(Z(h), b);
        g.beginPath(); g.moveTo(0, yy); g.lineTo(TW, yy); g.stroke();
      }
    });
    for (i = 0; i < nHatch; i++) {
      var hx = R() * TW, hy = R() * TH, hw = 10 + R() * 30, hh = 8 + R() * 20;
      g.strokeStyle = "rgba(0,0,0,0.32)"; g.strokeRect(hx, hy, hw, hh);
      g.fillStyle = "rgba(0,0,0,0.24)";
      g.fillRect(hx + 2, hy + 2, 2, 2); g.fillRect(hx + hw - 4, hy + hh - 4, 2, 2);
    }
    for (i = 0; i < 150; i++) {
      g.fillStyle = "rgba(22,22,18," + (0.04 + R() * 0.07).toFixed(3) + ")";
      g.fillRect(R() * TW, BAND + R() * 2 * BAND, 2 + R() * 4, 8 + R() * 36);
    }
  }
  function texFrom(cv) {
    var t = new V.CanvasTexture(cv);
    t.wrapS = t.wrapT = V.ClampToEdgeWrapping;
    t.anisotropy = 4;
    /* r148: Texture.colorSpace does nothing yet; encoding is what works */
    if (V.sRGBEncoding !== undefined) t.encoding = V.sRGBEncoding;
    return t;
  }

  /* Face-normal projection into the four bands. Faces looking mostly fore
     or aft would collapse to a line under an x projection, so they are
     laid out along x + y. */
  function projUV(geo, S, Z0, Z1) {
    var p = geo.attributes.position.array;
    var uv = new Float32Array(p.length / 3 * 2);
    var t, k;
    for (t = 0; t < p.length; t += 9) {
      var ux = p[t + 3] - p[t], uy = p[t + 4] - p[t + 1], uz = p[t + 5] - p[t + 2];
      var vx = p[t + 6] - p[t], vy = p[t + 7] - p[t + 1], vz = p[t + 8] - p[t + 2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var band = nz > 0.55 ? 0 : nz < -0.55 ? 3 : (ny >= 0 ? 1 : 2);
      var endOn = Math.abs(nx) > Math.abs(ny) * 1.4;
      for (k = 0; k < 3; k++) {
        var x = p[t + 3 * k], y = p[t + 3 * k + 1], z = p[t + 3 * k + 2];
        var U, W, lo = band * BAND + 2, hi = (band + 1) * BAND - 2;
        if (band === 0)      { U = S.x(x); W = S.top(y); }
        else if (band === 3) { U = S.x(x); W = S.belly(y); }
        else                 { U = S.x(endOn ? x + y : x); W = S.side(z, band); }
        U = Math.max(2, Math.min(TW - 2, U));
        W = Math.max(lo, Math.min(hi, W));
        uv[(t / 3 + k) * 2]     = U / TW;
        uv[(t / 3 + k) * 2 + 1] = 1 - W / TH;
      }
    }
    geo.setAttribute("uv", new V.BufferAttribute(uv, 2));
    return geo;
  }

  /* ====================================================== geometry kit ==
     The AH-64E hero's kit: every closed piece is wound outward and checked
     with the model tool's backface view. */
  function place(geo, x, y, z, rx, ry, rz) {
    if (rx || ry || rz)
      geo.applyMatrix4(new V.Matrix4().makeRotationFromEuler(new V.Euler(rx || 0, ry || 0, rz || 0)));
    if (x || y || z) geo.translate(x || 0, y || 0, z || 0);
    return geo;
  }
  function box(sx, sy, sz, x, y, z, rx, ry, rz) {
    return place(new V.BoxGeometry(sx, sy, sz), x, y, z, rx, ry, rz);
  }
  /* a cylinder along model x, y or z; r0 is the end toward +axis */
  function cyl(r0, r1, len, seg, axis, x, y, z, open) {
    var g = new V.CylinderGeometry(r0, r1, len, seg, 1, !!open);
    if (axis === "x") g.rotateZ(-PI / 2);
    else if (axis === "z") g.rotateX(PI / 2);
    return place(g, x, y, z);
  }
  function sph(r, ws, hs, x, y, z, sx, sy, sz) {
    var g = new V.SphereGeometry(r, ws, hs);
    g.scale(sx || 1, sy || 1, sz || 1);
    return place(g, x, y, z);
  }
  /* a round bar from p to q; open-ended unless capped */
  function bar(p, q, r, seg, capped) {
    var dx = q[0] - p[0], dy = q[1] - p[1], dz = q[2] - p[2];
    var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-4;
    var g = new V.CylinderGeometry(r, r, L, seg || 6, 1, !capped);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(
      new V.Vector3(0, 1, 0), new V.Vector3(dx / L, dy / L, dz / L)));
    g.translate((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
    return g;
  }
  /* a bent tube through a list of points: skid upturns, the guard hoop.
     The joints overlap, so only the two free ends are capped. */
  function tube(list, pts, r, seg) {
    var n = pts.length - 1;
    for (var i = 0; i < n; i++) list.push(bar(pts[i], pts[i + 1], r, seg || 6, i === 0 || i === n - 1));
  }
  /* a flat disc facing along the unit normal n */
  function disc(r, seg, c, n) {
    var g = new V.CircleGeometry(r, seg);
    g.applyQuaternion(new V.Quaternion().setFromUnitVectors(new V.Vector3(0, 0, 1),
      new V.Vector3(n[0], n[1], n[2]).normalize()));
    g.translate(c[0], c[1], c[2]);
    return g;
  }
  function flat(geo) { return geo.index ? geo.toNonIndexed() : geo; }
  /* the same surface wound to face the other way: the lining of a duct */
  function inward(geo) {
    var g = flat(geo);
    var p = g.attributes.position.array, n = g.attributes.normal.array, t, k, tmp;
    for (t = 0; t < p.length / 9; t++) for (k = 0; k < 3; k++) {
      tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
    }
    for (t = 0; t < n.length; t++) n[t] = -n[t];
    return g;
  }
  /* The starboard twin of a port part. Negating y turns the part inside
     out, so each triangle's last two corners are swapped back. */
  function mirrorY(geo) {
    var g = geo.index ? geo.toNonIndexed() : geo.clone();
    var p = g.attributes.position.array;
    var n = g.attributes.normal ? g.attributes.normal.array : null;
    var u = g.attributes.uv ? g.attributes.uv.array : null;
    var i, t, k, tmp;
    for (i = 0; i < p.length; i += 3) { p[i + 1] = -p[i + 1]; if (n) n[i + 1] = -n[i + 1]; }
    for (t = 0; t < p.length / 9; t++) {
      for (k = 0; k < 3; k++) {
        tmp = p[t * 9 + 3 + k]; p[t * 9 + 3 + k] = p[t * 9 + 6 + k]; p[t * 9 + 6 + k] = tmp;
        if (n) { tmp = n[t * 9 + 3 + k]; n[t * 9 + 3 + k] = n[t * 9 + 6 + k]; n[t * 9 + 6 + k] = tmp; }
      }
      if (u) for (k = 0; k < 2; k++) {
        tmp = u[t * 6 + 2 + k]; u[t * 6 + 2 + k] = u[t * 6 + 4 + k]; u[t * 6 + 4 + k] = tmp;
      }
    }
    return g;
  }
  function both(list, geo) { list.push(geo); list.push(mirrorY(geo)); }
  /* one buffer per material and assembly: a single draw call (and one
     shadow draw) for what would otherwise be dozens */
  function merge(list) {
    var pos = [], nor = [], uvs = [], i, j;
    for (i = 0; i < list.length; i++) {
      var g = flat(list[i]);
      if (!g.attributes.normal) g.computeVertexNormals();
      var p = g.attributes.position.array, n = g.attributes.normal.array;
      var u = g.attributes.uv ? g.attributes.uv.array : null;
      for (j = 0; j < p.length; j++) { pos.push(p[j]); nor.push(n[j]); }
      for (j = 0; j < p.length / 3 * 2; j++) uvs.push(u ? u[j] : 0);
    }
    var out = new V.BufferGeometry();
    out.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    out.setAttribute("normal", new V.Float32BufferAttribute(nor, 3));
    out.setAttribute("uv", new V.Float32BufferAttribute(uvs, 2));
    return out;
  }
  function mesh(parent, list, mat, name, S) {
    if (!list.length) return null;
    var geo = merge(list);
    if (S) projUV(geo, S);
    var m = new V.Mesh(geo, mat);
    if (name) m.name = name;
    parent.add(m);
    return m;
  }
  /* flat-shaded triangles from a list of corners, three per triangle */
  function tris(pts) {
    var pos = [], i;
    for (i = 0; i < pts.length; i++) pos.push(pts[i][0], pts[i][1], pts[i][2]);
    var g = new V.BufferGeometry();
    g.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  }
  /* A convex solid from its faces, each wound away from the centre. */
  function convex(faces) {
    var c = [0, 0, 0], n = 0, i, j, out = [];
    for (i = 0; i < faces.length; i++) for (j = 0; j < faces[i].length; j++) {
      c[0] += faces[i][j][0]; c[1] += faces[i][j][1]; c[2] += faces[i][j][2]; n++;
    }
    c[0] /= n; c[1] /= n; c[2] /= n;
    for (i = 0; i < faces.length; i++) {
      var f = faces[i], a = f[0];
      for (j = 1; j < f.length - 1; j++) {
        var b = f[j], d = f[j + 1];
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        var vx = d[0] - a[0], vy = d[1] - a[1], vz = d[2] - a[2];
        var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        var out1 = (a[0] - c[0]) * nx + (a[1] - c[1]) * ny + (a[2] - c[2]) * nz;
        if (out1 >= 0) out.push(a, b, d); else out.push(a, d, b);
      }
    }
    return tris(out);
  }
  /* a closed solid between two convex sections with the same corner count */
  function solid(A, B) {
    var faces = [A.slice(), B.slice()], i, n = A.length;
    for (i = 0; i < n; i++) faces.push([A[i], A[(i + 1) % n], B[(i + 1) % n], B[i]]);
    return convex(faces);
  }
  /* six-cornered aerofoil: leading edge, crest 15% back, after-body at
     75%, a sharp trailing edge; at(x, z, k) lays thickness k out in space */
  function foil(le, te, t, at) {
    function p(f, k) { return at(le[0] + (te[0] - le[0]) * f, le[1] + (te[1] - le[1]) * f, k); }
    return [p(0, 0), p(0.15, t / 2), p(0.75, t * 0.38), p(1, 0), p(0.75, -t * 0.38), p(0.15, -t / 2)];
  }
  /* ---- the loft: superelliptic sections run NOSE TO TAIL (decreasing x),
     quads wound (a, c, b), which for that order puts every normal outward.
       zb, zt   belly and top (model z)     zm   height of the widest point
       wb, wm, wt  half-widths at belly corner, widest point, top corner
       e        corner exponent: boxy when low, round near 1              */
  function ringOf(s, n) {
    var pts = [], i;
    for (i = 0; i <= n; i++) {
      var th = -PI / 2 + PI * i / n, c = Math.cos(th), sn = Math.sin(th);
      var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
      var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
      var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
      pts.push([W * Math.pow(Math.abs(c), s.e), z]);
    }
    for (i = n - 1; i >= 1; i--) pts.push([-pts[i][0], pts[i][1]]);
    return pts;
  }
  /* A ring through chosen angles instead of evenly spaced ones: the
     Scout's cabin puts a row of vertices exactly on each window sill and
     head, so the glazing is cut from the loft itself with a straight edge. */
  function ringAng(s, angs) {
    var pts = [], i, n = angs.length - 1;
    for (i = 0; i <= n; i++) {
      var th = angs[i], c = Math.cos(th), sn = Math.sin(th);
      var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
      var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
      var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
      pts.push([W * Math.pow(Math.abs(c), s.e), z]);
    }
    for (i = n - 1; i >= 1; i--) pts.push([-pts[i][0], pts[i][1]]);
    return pts;
  }
  function loft(secs, n, noseDx, tailDx, angFn) {
    function ringFor(s) { return angFn ? ringAng(s, angFn(s)) : ringOf(s, n); }
    if (angFn) n = angFn(secs[0]).length - 1;
    var pos = [], idx = [], rl = 2 * n, i, j;
    for (i = 0; i < secs.length; i++) {
      var r = ringFor(secs[i]);
      for (j = 0; j < rl; j++) pos.push(secs[i].x, r[j][0], r[j][1]);
    }
    for (i = 0; i < secs.length - 1; i++) for (j = 0; j < rl; j++) {
      var a = i * rl + j, b = i * rl + (j + 1) % rl, c = (i + 1) * rl + j, d = (i + 1) * rl + (j + 1) % rl;
      idx.push(a, c, b, b, c, d);
    }
    var geo = new V.BufferGeometry();
    geo.setAttribute("position", new V.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    var out = [geo];
    function cap(k, dx, front) {
      var s = secs[k], rr = ringFor(s), t = [], cy = 0, cz = 0;
      for (j = 0; j < rl; j++) { cy += rr[j][0]; cz += rr[j][1]; }
      var o = [s.x + dx, cy / rl, cz / rl];
      for (j = 0; j < rl; j++) {
        var p0 = [s.x, rr[j][0], rr[j][1]], p1 = [s.x, rr[(j + 1) % rl][0], rr[(j + 1) % rl][1]];
        if (front) t.push(o, p0, p1); else t.push(o, p1, p0);
      }
      out.push(tris(t));
    }
    if (noseDx !== null) cap(0, noseDx, true);
    if (tailDx !== null) cap(secs.length - 1, -tailDx, false);
    return out;
  }
  /* the section at any x between two of a loft's sections */
  function secAt(secs, x) {
    for (var q = 0; q < secs.length - 1; q++) {
      var A = secs[q], B = secs[q + 1];
      if (x <= A.x && x >= B.x) {
        var f = (A.x - x) / (A.x - B.x), o = {};
        ["x", "zb", "zt", "zm", "wb", "wm", "wt", "e"].forEach(function (k) { o[k] = A[k] + (B[k] - A[k]) * f; });
        return o;
      }
    }
    return null;
  }
  /* A band cut from a loft's own sections, a few percent oversize: the
     team flash round a tail boom, as on the AH-64E and Mi-28N heroes. */
  function band(secs, x0, x1, n, grow) {
    var bs = [], xs = [x0, x1], i;
    for (i = 0; i < 2; i++) {
      var B0 = secAt(secs, xs[i]), zm = B0.zm;
      bs.push({ x: xs[i], zm: zm, zb: zm - (zm - B0.zb) * grow, zt: zm + (B0.zt - zm) * grow,
                wb: B0.wb * grow, wm: B0.wm * grow, wt: B0.wt * grow, e: B0.e });
    }
    return loft(bs, n, null, null)[0];
  }
  /* Cut flat triangle arrays (positions P, normals N) by the horizontal
     plane z = zc, only where a triangle's centre lies between x0 and x1:
     a triangle across the plane becomes a triangle on one side and a quad
     (two triangles) on the other, wound as the original was, normals
     interpolated along the cut edges. */
  function cutZ(P, N, zc, x0, x1) {
    var oP = [], oN = [], t, k, j;
    function vtx(t, k) { return [P.slice(t + k * 3, t + k * 3 + 3), N.slice(t + k * 3, t + k * 3 + 3)]; }
    function emit(poly) {
      for (j = 1; j < poly.length - 1; j++) [poly[0], poly[j], poly[j + 1]].forEach(function (v) {
        oP.push(v[0][0], v[0][1], v[0][2]); oN.push(v[1][0], v[1][1], v[1][2]);
      });
    }
    for (t = 0; t < P.length; t += 9) {
      var cx = (P[t] + P[t + 3] + P[t + 6]) / 3, d = [], sgn = [], lo = false, hi = false;
      for (k = 0; k < 3; k++) {
        d.push(P[t + k * 3 + 2] - zc);
        sgn.push(d[k] > 1e-6 ? 1 : d[k] < -1e-6 ? -1 : 0);
        if (sgn[k] > 0) hi = true; if (sgn[k] < 0) lo = true;
      }
      if (!(hi && lo) || cx < x0 || cx > x1) { emit([vtx(t, 0), vtx(t, 1), vtx(t, 2)]); continue; }
      var up = [], dn = [];
      for (k = 0; k < 3; k++) {
        var k2 = (k + 1) % 3, A = vtx(t, k), B = vtx(t, k2);
        if (sgn[k] >= 0) up.push(A);
        if (sgn[k] <= 0) dn.push(A);
        if (sgn[k] * sgn[k2] < 0) {
          var f = d[k] / (d[k] - d[k2]), I = [[], []];
          for (j = 0; j < 3; j++) { I[0].push(A[0][j] + (B[0][j] - A[0][j]) * f); I[1].push(A[1][j] + (B[1][j] - A[1][j]) * f); }
          up.push(I); dn.push(I);
        }
      }
      emit(up); emit(dn);
    }
    return [oP, oN];
  }
  /* Split a loft skin between two materials by a test on each triangle's
     centre: where the glazing of a cabin meets its metal. cuts, if given,
     are [z, x0, x1] planes the triangles are first cut along, so that a
     window edge at that height is a straight line even where no vertex
     row of the loft falls on it. */
  function split(geos, isB, A, B, cuts) {
    for (var gi = 0; gi < geos.length; gi++) {
      var g = flat(geos[gi]), p = g.attributes.position.array, n = g.attributes.normal.array;
      var pa = [], na = [], pb = [], nb = [], t, k;
      if (cuts) {
        p = Array.prototype.slice.call(p); n = Array.prototype.slice.call(n);
        for (k = 0; k < cuts.length; k++) { var c = cutZ(p, n, cuts[k][0], cuts[k][1], cuts[k][2]); p = c[0]; n = c[1]; }
      }
      for (t = 0; t < p.length; t += 9) {
        var cx = (p[t] + p[t + 3] + p[t + 6]) / 3, cy = (p[t + 1] + p[t + 4] + p[t + 7]) / 3,
            cz = (p[t + 2] + p[t + 5] + p[t + 8]) / 3;
        var to = isB(cx, cy, cz) ? [pb, nb] : [pa, na];
        for (k = 0; k < 9; k++) { to[0].push(p[t + k]); to[1].push(n[t + k]); }
      }
      [[pa, na, A], [pb, nb, B]].forEach(function (q) {
        if (!q[0].length) return;
        var o = new V.BufferGeometry();
        o.setAttribute("position", new V.Float32BufferAttribute(q[0], 3));
        o.setAttribute("normal", new V.Float32BufferAttribute(q[1], 3));
        q[2].push(o);
      });
    }
  }
  /* ---- points on a loft's own surface. thAt() inverts ringOf() for the
     ring angle at a height, so a cabin can be lofted with a row of
     vertices on each window sill (loft with angFn); ptAt() is ringOf() at
     any angle on the port side, pushed off the skin by off, for frames
     that ride on the surface. */
  function thAt(s, z) {
    var zn;
    if (z >= s.zm) { zn = Math.min(1, (z - s.zm) / (s.zt - s.zm)); return Math.asin(Math.pow(zn, 1 / s.e)); }
    zn = Math.min(1, (s.zm - z) / (s.zm - s.zb));
    return -Math.asin(Math.pow(zn, 1 / s.e));
  }
  function ptAt(s, th, off) {
    var c = Math.cos(th), sn = Math.sin(th);
    var zn = (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), s.e);
    var z = s.zm + zn * (sn > 0 ? s.zt - s.zm : s.zm - s.zb);
    var W = s.wm + ((sn > 0 ? s.wt : s.wb) - s.wm) * Math.abs(zn);
    var y = W * Math.pow(Math.abs(c), s.e), dz = z - s.zm, d = Math.sqrt(y * y + dz * dz) || 1;
    return [s.x, y + y / d * off, z + dz / d * off];
  }
  /* a solid of revolution about model x from an (x, r) profile, front to
     back; LatheGeometry turns about Y, so it is built there and laid down */
  function latheX(prof, seg, y, z) {
    var lp = [], i;
    for (i = 0; i < prof.length; i++) lp.push(new V.Vector2(Math.max(prof[i][1], 0.0005), -prof[i][0]));
    var g = new V.LatheGeometry(lp, seg);
    g.rotateZ(PI / 2);                       /* lathe -Y (front) -> model +X */
    g.translate(0, y, z);
    return g;
  }

  /* ---- the Nord SS.11 / AS.11: the same round from both launchers.
     1.20 m long, 0.164 m across the body, four swept wings of 0.50 m span
     set as an X at the tail, and the tracer flare pot in the tail cone
     that the gunner steers by. xn is the nose station. */
  function ss11(store, dark, xn, y, z) {
    store.push(latheX([[xn, 0], [xn - 0.07, 0.056], [xn - 0.22, 0.082],
                       [xn - 1.12, 0.082], [xn - 1.20, 0.050], [xn - 1.20, 0]], 8, y, z));
    for (var s = -1; s <= 1; s += 2) {
      store.push(place(new V.BoxGeometry(0.30, 0.50, 0.008), xn - 0.98, y, z, s * PI / 4, 0, 0));
    }
    dark.push(disc(0.038, 8, [xn - 1.205, y, z], [-1, 0, 0]));
  }

  function discMat() {
    return new V.MeshStandardMaterial({ color: 0xd6dde3, roughness: 0.40, metalness: 0.08,
                                         transparent: true, opacity: 0.05, depthWrite: false });
  }
  function teamMat(C) {
    /* exactly C.team; the emissive keeps it from greying out under ACES */
    var tc = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    return new V.MeshStandardMaterial({ color: new V.Color(tc), roughness: 0.58, metalness: 0.15,
                                        emissive: new V.Color(tc), emissiveIntensity: 0.10 });
  }

  /* One upward face is all a camera above the machine ever sees, and it
     casts no shadow (the AH-64E hero explains why). */
  function rotorDisc(head, R, mat) {
    mesh(head, [place(new V.CircleGeometry(R, 48), 0, 0, 0.03)], mat, "rotordisc");
  }
  /* A main blade: its outline (blade along +X) as a flat prism t thick,
     28 triangles. Models3D.slab's bevel added 64 more to every blade for
     a 2 mm rounding no camera can see on a 4 cm thick blade. */
  function bladeOf(BP, t) {
    return solid(BP.map(function (q) { return [q[0], q[1], -t / 2]; }),
                 BP.map(function (q) { return [q[0], q[1], t / 2]; }));
  }

  /* ####################################################################
     ####  SE.3130 ALOUETTE II  (fra_e50_gunship)                     ####
     ####################################################################
     The "goldfish bowl": a big plexiglass bubble on a shallow metal tub,
     an open tubular centre section carrying the fuel tank, the main
     gearbox and, on a deck above them, the Artouste II turboshaft in the
     open with its jet pipe pointing aft; a triangular-section welded tube
     truss for a tail boom, a tailplane with round end plates, a two-blade
     tail rotor on the RIGHT of the boom end, and a hoop under it to keep
     it off the ground. Skids, with the ground-handling wheels left on.

     The AS.11 fit, from the 1958 photographs: a cross tube runs through
     the centre section at deck height, 4.6 m across, and each end carries
     two launchers side by side, each hanging a missile under a deep
     housing, all four outboard of the skids. A stay from each half up to
     the gearbox head and a strut down to the lower frame brace it. There
     is no sight: the gunner flew the missile by eye and joystick.

     CHECKED against the brief's notes: the 10.20 m three-blade rotor, the
     truss boom, the bare Artouste, the bubble, the skids and the two-blade
     tail rotor are right, and 12.1 m rounds the published 12.05 m. The
     brief gave the tail rotor no side; photographs of A-79 and V-54 from
     both sides show it on the STARBOARD side, a pusher, as a clockwise
     French rotor wants. The brief's "2 each side on side rails" is right
     in number; they hang from launchers on the ends of a cross tube
     behind the cabin, not on rails along the fuselage, and not on the
     skids as the def's own description has it. The model's 12.21 m is
     the published 12.05 m to the tail rotor tip plus the guard hoop.

     REVISED after review, each against the photographs named where it is
     built: the cabin tub is drawn from inside too, with a floor, so the
     ground no longer shows through the bubble; the tail cone's sides are
     true mirror images, so its team band is whole on both sides; the
     Artouste is 0.28 m lower, on the deck, and slimmer, to the A-79
     side-on measurements; the launchers are 0.28-0.34 m further out and
     the upper stays are fitted; the head is 7 cm lower, at 2.75 m. */
  var AL = {
    GROUND: -1.05,                         /* skid bottoms                */
    /* the blade plane: 2.60 m on the three-view and on A-79 side-on, so
       the head's cap, 0.15 m above it, tops out at the published 2.75 m */
    HUB_H: 2.60,
    R: 5.10, CHORD: 0.33,
    TR_X: -6.05, TR_Y: -0.26, TR_H: 1.75, TR_R: 0.905, TR_CH: 0.14,
    NOSE: 2.80
  };
  var AL_S = sheet(-7.4, 3.0, 2.2, -1.1, 1.8);
  var _cvA = null, _texA = null;
  function alouetteCanvas() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), S = AL_S, R = rngFor(3130), i, b;
    function Z(h) { return AL.GROUND + h; }
    /* ALAT olive drab, taken darker than the paint chip for the ACES lift;
       the repaint of a hard-used 1950s airframe is patchy panel by panel */
    g.fillStyle = "#474b35"; g.fillRect(0, 0, TW, TH);
    for (i = 0; i < 140; i++) {
      g.fillStyle = (i & 1) ? "#52563d" : "#3c402d";
      g.globalAlpha = 0.25 + R() * 0.35;
      g.fillRect(R() * TW, R() * TH, (0.3 + R() * 1.0) * S.sx, 10 + R() * 30);
    }
    g.globalAlpha = 1;
    g.fillStyle = "rgba(255,255,236,0.05)"; g.fillRect(0, 0, TW, BAND);
    seams(g, S, R, [2.40, 2.00, 1.55, 1.10, 0.66, 0.42, 0.00, -0.46, -0.62, -1.00, -1.35, -1.67,
                    -4.72, -5.20], [0.55, 0.95, 1.25], Z, 50);
    /* soot from the Artouste's jet pipe streams back over the deck edge,
       the tail cone and the first bays of the truss */
    for (b = 1; b <= 2; b++) {
      var sg = g.createLinearGradient(S.x(-1.2), 0, S.x(-2.6), 0);
      sg.addColorStop(0, "rgba(20,18,15,0.45)"); sg.addColorStop(1, "rgba(20,18,15,0)");
      g.fillStyle = sg;
      g.fillRect(S.x(-2.6), S.side(Z(1.55), b), S.x(-1.2) - S.x(-2.6), S.side(Z(1.05), b) - S.side(Z(1.55), b));
    }
    /* the cocarde on each side of the tail cone, where the ALAT carried it */
    for (b = 1; b <= 2; b++)
      roundel(g, S.x(-0.98), S.side(Z(1.08), b), 0.20 * S.sz,
              [["#a8322a", 1.0], ["#e6e3d8", 0.66], ["#26407e", 0.33]]);
    /* the belly: the same olive, oil-streaked under the gearbox */
    for (i = 0; i < 90; i++) {
      g.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.06).toFixed(3) + ")";
      g.fillRect(R() * TW, 3 * BAND + R() * BAND, 16 + R() * 70, 5 + R() * 16);
    }
    return cv;
  }

  function alouetteMats(C) {
    var m = {};
    if (_texA === null) {
      try { if (!_cvA) _cvA = alouetteCanvas(); _texA = texFrom(_cvA); } catch (e) { _texA = false; }
    }
    /* DoubleSide, as the conventions allow an aircraft skin: the cabin tub
       is seen from INSIDE through the clear bubble, so its inner face is
       the cabin floor, the sides under the sill and the rear wall. Drawn
       one-sided, the game camera looked through the bubble and the tub
       and saw the ground under the helicopter, with the seats floating
       over it. Every other skin piece is a closed solid, so its inside is
       never in view and costs only fill. */
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08,
                                          side: V.DoubleSide });
    if (_texA) m.skin.map = _texA; else m.skin.color.setHex(0x474b35);
    /* the welded tube of the frame, boom and skids, in the same olive */
    m.paint = new V.MeshStandardMaterial({ color: 0x454933, roughness: 0.80, metalness: 0.12 });
    m.metal = new V.MeshStandardMaterial({ color: 0x5e625e, roughness: 0.46, metalness: 0.60 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x1c1e1c, roughness: 0.70, metalness: 0.25 });
    /* metal blades in olive, worn flat */
    m.blade = new V.MeshStandardMaterial({ color: 0x3a3d30, roughness: 0.78, metalness: 0.15 });
    /* AS.11 rounds and launchers: ordnance olive, a shade off the airframe */
    m.store = new V.MeshStandardMaterial({ color: 0x5a5d42, roughness: 0.74, metalness: 0.12 });
    /* The bubble is clear plexiglass, and seeing the crew through it is
       half of what makes an Alouette read as one. Tinted, glossy, and
       drawn without depth writes over the cabin furniture. */
    m.glass = new V.MeshPhysicalMaterial({ color: 0x8ea3aa, roughness: 0.06, metalness: 0.0,
                                           clearcoat: 1.0, clearcoatRoughness: 0.04,
                                           transparent: true, opacity: 0.30, depthWrite: false });
    m.team = teamMat(C);
    m.disc = discMat();
    return m;
  }

  function buildAlouette(THREE, M, C) {
    V = THREE;
    var T = alouetteMats(C);
    var g = new V.Group();
    g.name = "alouette2";
    var GR = AL.GROUND;
    function Z(h) { return GR + h; }
    function P(x, y, h) { return [x, y, Z(h)]; }
    var i, k, s, a;
    var skin = [], glass = [], paint = [], metal = [], dark = [], store = [], team = [];

    /* ------------------------------------------------------- the bubble --
       Sections from the three-view and 75+46: the nose 2.80 m ahead of the
       mast at 0.95 m, the bubble 1.94 m high and 1.44 m across, the cabin
       floor 0.42 m off the ground, the rear bulkhead 0.42 m ahead of the
       mast.        x      zb    zt    zm    wb    wm    wt    e          */
    function sec(x, zb, zt, zm, wb, wm, wt, e) {
      return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e };
    }
    var CAB = [
      sec(2.80, 0.84, 1.06, 0.95, 0.07, 0.10, 0.07, 0.90),
      sec(2.74, 0.62, 1.32, 0.96, 0.25, 0.33, 0.24, 0.86),
      sec(2.62, 0.52, 1.54, 1.00, 0.41, 0.51, 0.38, 0.82),
      sec(2.40, 0.45, 1.73, 1.04, 0.55, 0.63, 0.50, 0.80),
      sec(2.10, 0.43, 1.86, 1.08, 0.61, 0.69, 0.56, 0.78),
      sec(1.70, 0.42, 1.92, 1.10, 0.63, 0.71, 0.58, 0.77),
      sec(1.52, 0.42, 1.93, 1.11, 0.63, 0.72, 0.58, 0.77),
      sec(1.20, 0.42, 1.94, 1.12, 0.63, 0.72, 0.58, 0.77),
      sec(0.80, 0.42, 1.93, 1.12, 0.62, 0.71, 0.56, 0.78),
      sec(0.64, 0.43, 1.90, 1.12, 0.61, 0.69, 0.54, 0.78),
      sec(0.42, 0.44, 1.84, 1.12, 0.58, 0.66, 0.50, 0.80),
    ];
    /* As on the Scout, a row of vertices on the sill (0.62 m) and on the
       door bar (1.22 m), and a section at the rear frame (x 0.64), so the
       glazing is cut from the bubble with straight edges; the rows above
       close in on the crown to keep it round. */
    var LEVELS = [0.52, 0.62, 0.80, 1.00, 1.22, 1.45, 1.65, 1.80, 1.88, 1.925];
    function cabAngles(q) {
      var A = [], k0 = -1, k1 = LEVELS.length, j;
      for (j = 0; j < LEVELS.length; j++) {
        var z = Z(LEVELS[j]);
        if (z > q.zb + 0.008 && z < q.zt - 0.008) { A.push(thAt(q, z)); if (k0 < 0) k0 = j; k1 = j; }
        else A.push(null);
      }
      var lo = k0 < 0 ? -PI / 2 : A[k0], hi = k0 < 0 ? PI / 2 : A[k1];
      if (k0 < 0) { k0 = LEVELS.length; k1 = -1; }
      for (j = 0; j < k0; j++) A[j] = -PI / 2 + (lo + PI / 2) * (j + 1) / (k0 + 1);
      for (j = k1 + 1; j < LEVELS.length; j++)
        A[j] = hi + (PI / 2 - hi) * (j - k1) / (LEVELS.length - k1);
      return [-PI / 2].concat(A, [PI / 2]);
    }
    var cab = loft(CAB, 0, 0.03, 0.0, cabAngles);
    /* Metal where the photographs show paint: the shallow tub up to the
       sill, rising at the chin to the nose panel, and the olive band of
       the rear cabin frame; plexiglass everywhere else. The steps in the
       sill fall on the level rows and the sections, so they stay clean. */
    split(cab, function (x, y, z) {
      var h = z - GR;
      if (x < 0.64) return false;
      return h > (x > 2.74 ? 0.95 : x > 2.62 ? 0.80 : 0.62);
    }, skin, glass);
    /* the frames: the door-front arch over the roof, the sill rail, the
       bar across each door window at 1.22 m, and the frame strip up the
       middle of the nose. The ring runs from the belly up the port side,
       over the top and down the starboard side, so the arch points above
       the sill come out in order. */
    function onSkin(x, h, side) {
      var q = secAt(CAB, x), p = ptAt(q, thAt(q, Z(h)), 0.012);
      return [x, side * p[1], p[2]];
    }
    var ar = ringAng(secAt(CAB, 1.52), cabAngles(secAt(CAB, 1.52))), ap = [];
    for (i = 0; i < ar.length; i++) if (ar[i][1] > Z(0.61)) ap.push([1.52, ar[i][0] * 1.012, ar[i][1] + 0.006]);
    tube(skin, ap, 0.030, 5);
    for (s = -1; s <= 1; s += 2) {
      tube(skin, [2.62, 2.40, 2.10, 1.70, 1.20, 0.80, 0.64].map(function (xx) { return onSkin(xx, 0.62, s); }), 0.026, 5);
      tube(skin, [1.52, 1.20, 0.80, 0.64].map(function (xx) { return onSkin(xx, 1.22, s); }), 0.022, 5);
    }
    tube(skin, [[2.80, 0, Z(0.90)], [2.81, 0, Z(1.02)], [2.765, 0, Z(1.18)], [2.69, 0, Z(1.36)]], 0.035, 5);
    /* the rotating beacon on the cabin roof */
    dark.push(cyl(0.05, 0.06, 0.10, 8, "z", 0.55, 0, Z(1.90)));

    /* the cabin furniture seen through the bubble: two front seats, the
       rear bench, the instrument pedestal, and the crew - the pilot in the
       right-hand seat, the missile aimer beside him on the left */
    both(dark, box(0.46, 0.42, 0.08, 1.30, 0.33, Z(0.74)));
    both(dark, box(0.08, 0.42, 0.62, 1.05, 0.33, Z(1.06), 0, -0.12, 0));
    dark.push(box(0.42, 1.10, 0.08, 0.72, 0, Z(0.72)));
    dark.push(box(0.08, 1.10, 0.55, 0.50, 0, Z(1.00)));
    dark.push(box(0.30, 0.46, 0.46, 2.36, 0, Z(0.80), 0, 0.35, 0));
    for (s = -1; s <= 1; s += 2) {
      dark.push(box(0.26, 0.34, 0.48, 1.20, s * 0.33, Z(1.06), 0, -0.10, 0));
      dark.push(sph(0.12, 7, 5, 1.22, s * 0.33, Z(1.46)));
    }
    /* The floor, a plate 0.55 m up cut to the tub's own width at that
       height (ptAt on each section, a centimetre inboard), and the seat
       frames standing on it. Seen through the bubble from above, this and
       the inside of the tub are what the crew sit in. */
    var fh = 0.55, flLo = [], flHi = [];
    [0.46, 0.64, 1.20, 1.70, 2.10, 2.40].forEach(function (xx) {
      var fq = secAt(CAB, xx), fp = ptAt(fq, thAt(fq, Z(fh)), -0.012);
      flLo.push([xx, fp[1], Z(fh)]); flHi.push([xx, fp[1], Z(fh + 0.02)]);
    });
    for (i = flLo.length - 1; i >= 0; i--) {
      flLo.push([flLo[i][0], -flLo[i][1], flLo[i][2]]); flHi.push([flHi[i][0], -flHi[i][1], flHi[i][2]]);
    }
    paint.push(solid(flLo, flHi));
    both(dark, box(0.36, 0.34, 0.15, 1.30, 0.33, Z(0.645)));
    dark.push(box(0.34, 1.00, 0.13, 0.72, 0, Z(0.635)));

    /* ------------------------------------------------ the centre section --
       Behind the bulkhead the airframe is an open welded frame: a keel at
       floor height, four posts up to the engine deck at 1.52 m, the fuel
       tank between them, and diagonal bracing on both faces. */
    skin.push(box(1.10, 0.86, 0.10, -0.12, 0, Z(0.47)));
    /* the tank, with its corners rounded off */
    var TK = [[0.36, 0.34], [0.30, 0.40], [-0.40, 0.40], [-0.46, 0.34]];
    var tkLo = [], tkHi = [];
    for (i = 0; i < TK.length; i++) { tkLo.push(P(TK[i][0], TK[i][1], 0.52)); tkHi.push(P(TK[i][0], TK[i][1], 1.42)); }
    for (i = TK.length - 1; i >= 0; i--) { tkLo.push(P(TK[i][0], -TK[i][1], 0.52)); tkHi.push(P(TK[i][0], -TK[i][1], 1.42)); }
    skin.push(solid(tkLo, tkHi));
    var DK = 1.52;                         /* engine deck                  */
    for (s = -1; s <= 1; s += 2) {
      paint.push(bar(P(0.42, s * 0.44, 0.47), P(0.42, s * 0.44, DK), 0.032, 5, false));
      paint.push(bar(P(-0.62, s * 0.44, 0.47), P(-0.62, s * 0.44, DK), 0.032, 5, false));
      paint.push(bar(P(0.42, s * 0.44, DK), P(-1.62, s * 0.30, DK), 0.030, 5, false));
      paint.push(bar(P(0.40, s * 0.45, DK - 0.02), P(-0.60, s * 0.45, 0.52), 0.024, 5, false));
    }
    paint.push(bar(P(0.42, 0.44, DK), P(0.42, -0.44, DK), 0.030, 5, false));
    paint.push(bar(P(-0.62, 0.44, DK), P(-0.62, -0.44, DK), 0.030, 5, false));
    /* the deck plate the engine stands on */
    skin.push(box(1.20, 0.62, 0.04, -1.02, 0, Z(DK)));

    /* ------------------------------------------ gearbox and fixed mast --
       The main gearbox sits on four struts from the deck corners; above
       it the mast, the fixed swashplate ring and the scissors. */
    metal.push(cyl(0.20, 0.25, 0.46, 10, "z", 0, 0, Z(DK + 0.26)));
    metal.push(cyl(0.12, 0.20, 0.16, 10, "z", 0, 0, Z(DK + 0.57)));
    metal.push(cyl(0.075, 0.08, AL.HUB_H - DK - 0.60, 10, "z", 0, 0, Z((AL.HUB_H + DK + 0.60) / 2)));
    metal.push(cyl(0.20, 0.20, 0.04, 16, "z", 0, 0, Z(AL.HUB_H - 0.31)));
    for (s = -1; s <= 1; s += 2) for (k = -1; k <= 1; k += 2)
      paint.push(bar(P(k * 0.40, s * 0.40, DK), P(k * 0.16, s * 0.16, DK + 0.40), 0.026, 5, false));
    /* the drive from the engine's front output to the gearbox */
    metal.push(bar(P(-0.62, 0, 1.82), P(-0.16, 0, 1.80), 0.04, 6, true));

    /* ------------------------------------------------ the Artouste II ----
       Laid along the deck. Measured off A-79 side-on in flight (Commons
       "2007, A79, Alouette II, Belgium, Kleine-Brogel - 1020489", scaled
       on the 2.60 m blade plane): the axis 1.82 m up, so the intake bell's
       underside sits on the 1.52 m deck; the reduction gearbox at the
       front 0.62-0.90 m behind the mast, the intake bell 0.52 m across,
       the compressor, the slimmer turbine casing and the jet pipe, 0.34 m
       across and flared at its mouth 2.31 m aft. The square sand filter
       stands on the intake's left (Heer 7668; the 1958 Swedish series). */
    var EH = Z(1.82);
    var art = latheX([[-0.60, 0.0], [-0.60, 0.12], [-0.64, 0.14], [-0.90, 0.14], [-0.92, 0.19],
                      [-1.02, 0.26], [-1.18, 0.26], [-1.21, 0.20], [-1.45, 0.19], [-1.49, 0.16],
                      [-1.86, 0.155], [-2.12, 0.16], [-2.31, 0.185]], 12, 0, 0);
    /* the jet pipe's soot-black lining, and a bulkhead where it ends, so a
       look up the pipe never shows daylight */
    var jpIn = inward(latheX([[-1.98, 0.138], [-2.30, 0.171]], 12, 0, 0));
    var jpEnd = disc(0.14, 12, [-1.99, 0, 0], [-1, 0, 0]);
    [art, jpIn, jpEnd].forEach(function (q) { q.rotateY(-2 * D2R); q.translate(0, 0, EH); });
    metal.push(art); dark.push(jpIn); dark.push(jpEnd);
    metal.push(box(0.26, 0.14, 0.34, -1.08, 0.33, EH + 0.02));
    dark.push(box(0.20, 0.02, 0.26, -1.08, 0.405, EH + 0.02));
    /* the accessories and plumbing slung along the compressor's flanks */
    dark.push(cyl(0.07, 0.07, 0.50, 8, "x", -1.32, -0.19, EH - 0.10));
    /* the engine bearers down to the deck */
    for (s = -1; s <= 1; s += 2) {
      paint.push(bar(P(-0.72, s * 0.26, DK), P(-0.76, s * 0.10, 1.70), 0.022, 5, false));
      paint.push(bar(P(-1.50, s * 0.28, DK), P(-1.44, s * 0.12, 1.68), 0.022, 5, false));
    }

    /* ------------------------------------------------- the tail cone ----
       The skinned fairing under the engine that carries the boom: deep and
       square at the front, falling to the bottom longeron at the back. */
    function tcs(x, ht, hb, wt, wb) {
      return [P(x, wt, ht), P(x, wb, hb), P(x, -wb, hb), P(x, -wt, ht)];
    }
    var TC0 = tcs(-0.62, 1.50, 0.44, 0.42, 0.30);
    var TC1 = tcs(-1.67, 1.50, 0.64, 0.30, 0.06);
    /* The side panels are not flat (depth and width taper at different
       rates), so each is two triangles, split along the diagonal that
       makes the crease CONVEX: bottom-front to top-back, A1-B0 to port and
       its mirror A2-B3 to starboard. solid() fanned every face from its
       first corner, which creased the port side inward and the starboard
       side outward, and the team band laid over them from its own four
       corners sank up to 2.7 cm under the skin on the starboard side. */
    function tcSolid(A, B) {
      return convex([A.slice(), B.slice(),
                     [A[1], B[1], B[0], A[0]],      /* port, split A1-B0      */
                     [A[2], A[3], B[3], B[2]],      /* starboard, split A2-B3 */
                     [A[3], A[0], B[0], B[3]],      /* top, flat              */
                     [A[1], A[2], B[2], B[1]]]);    /* bottom, flat           */
    }
    skin.push(tcSolid(TC0, TC1));
    /* The team band round its back half is the cone's own surface between
       x -1.30 and -1.58, cut at the two creases as well as the four edges
       (so each band face lies in the plane of one skin face), then scaled
       4% about a line through the cone. The cone is convex, so every band
       face stands 1-2 cm clear of the skin it covers, on both sides. */
    function onEdge(P0, P1, x) {
      var f = (x - P0[0]) / (P1[0] - P0[0]);
      return [x, P0[1] + (P1[1] - P0[1]) * f, P0[2] + (P1[2] - P0[2]) * f];
    }
    function bandSec(x) {
      var q = [onEdge(TC0[0], TC1[0], x), onEdge(TC0[1], TC1[0], x), onEdge(TC0[1], TC1[1], x),
               onEdge(TC0[2], TC1[2], x), onEdge(TC0[2], TC1[3], x), onEdge(TC0[3], TC1[3], x)];
      var zc = Z(1.00);
      return q.map(function (p) { return [p[0], p[1] * 1.04, zc + (p[2] - zc) * 1.04]; });
    }
    team.push(solid(bandSec(-1.30), bandSec(-1.58)));

    /* ------------------------------------------------ the truss boom ----
       Welded tube, triangular in section: two top longerons 0.60 m apart
       at the root closing to 0.20 m at the tail, one bottom longeron that
       climbs from 0.64 m to meet them, a triangular frame at each of eight
       stations, and a diagonal in every bay of all three faces. */
    var ST = [-1.67, -2.25, -2.85, -3.45, -4.05, -4.65, -5.25, -5.85];
    function topY(x) { return 0.30 + (0.10 - 0.30) * (x + 1.67) / (-5.95 + 1.67); }
    function topH(x) { return 1.50 + (1.70 - 1.50) * (x + 1.67) / (-5.95 + 1.67); }
    function botH(x) { return 0.64 + (1.40 - 0.64) * (x + 1.67) / (-5.85 + 1.67); }
    var RL = 0.040, RD = 0.026;
    for (s = -1; s <= 1; s += 2) paint.push(bar(P(-1.67, s * topY(-1.67), topH(-1.67)), P(-5.98, s * 0.10, 1.70), RL, 5, false));
    paint.push(bar(P(-1.67, 0, botH(-1.67)), P(-5.85, 0, botH(-5.85)), RL, 5, false));
    for (i = 0; i < ST.length; i++) {
      var x0 = ST[i];
      var tl = P(x0, topY(x0), topH(x0)), tr = P(x0, -topY(x0), topH(x0)), bt = P(x0, 0, botH(x0));
      paint.push(bar(tl, tr, RD, 5, false));
      paint.push(bar(tl, bt, RD, 5, false));
      paint.push(bar(tr, bt, RD, 5, false));
      if (i < ST.length - 1) {
        var x1 = ST[i + 1];
        var tl1 = P(x1, topY(x1), topH(x1)), tr1 = P(x1, -topY(x1), topH(x1)), bt1 = P(x1, 0, botH(x1));
        paint.push(bar(tl, bt1, RD * 0.9, 5, false));
        paint.push(bar(tr, bt1, RD * 0.9, 5, false));
        paint.push(bar((i & 1) ? tl : tr, (i & 1) ? tr1 : tl1, RD * 0.9, 5, false));
      }
    }
    /* the boom end: a post up to the tail gearbox */
    paint.push(bar(P(-5.85, 0, botH(-5.85)), P(-5.98, 0, 1.70), RD, 5, false));

    /* ------------------------------------------- tailplane and gearbox --
       A small fixed tailplane across the top longerons 4.7-5.2 m aft,
       1.58 m span, with a round end plate at each tip; the tail gearbox
       on the end of the boom with its output shaft to the right. */
    function stabAt(y) { return function (x, z, kk) { return [x, y, Z(1.64) + kk]; }; }
    var stR = foil([-4.70, 0], [-5.20, 0], 0.07, stabAt(0.0));
    var stT = foil([-4.72, 0], [-5.20, 0], 0.06, stabAt(0.75));
    both(skin, solid(stR, stT));
    both(team, cyl(0.15, 0.15, 0.02, 10, "y", -4.96, 0.77, Z(1.64)));
    /* the team flash on each tailplane top, 1 cm clear of the skin */
    both(team, box(0.30, 0.46, 0.012, -4.95, 0.36, Z(1.64) + 0.040));
    metal.push(sph(0.12, 10, 6, -6.00, -0.02, Z(1.72), 1.3, 1.0, 1.1));
    metal.push(cyl(0.035, 0.035, 0.20, 8, "y", -6.05, AL.TR_Y + 0.12, Z(AL.TR_H)));

    /* --------------------------------------------- tail rotor guard ----
       The hoop that keeps the rotor off the ground in a flare: down from
       the bottom longeron, round under and behind the rotor, back up to
       the boom end, with two struts to its low point. Later operators
       painted it a high-visibility colour (the Belgian and Swiss machines'
       yellow); here it carries the team colour instead, the biggest flash
       a truss boom can take, and one that reads from above and the side. */
    tube(team, [P(-5.00, 0, 1.20), P(-5.55, 0, 0.78), P(-6.05, 0, 0.44), P(-6.55, 0, 0.48),
                 P(-6.92, 0, 0.72), P(-7.08, 0, 1.00), P(-6.98, 0, 1.25), P(-6.55, 0, 1.38),
                 P(-6.05, 0, 1.40), P(-5.90, 0, 1.48)], 0.030, 6);
    paint.push(bar(P(-5.40, 0, botH(-5.40)), P(-6.05, 0, 0.44), 0.022, 5, false));
    paint.push(bar(P(-5.62, 0, botH(-5.62)), P(-6.05, 0, 0.44), 0.022, 5, false));

    /* ------------------------------------------------------- the skids --
       2.08 m track, 3.45 m long, turned up at the front; two arched cross
       tubes, and the ground-handling wheels on the rear one. */
    for (s = -1; s <= 1; s += 2) {
      var sy = s * 1.04;
      tube(paint, [P(-1.05, sy, 0.045), P(2.45, sy, 0.045), P(2.62, sy, 0.08), P(2.74, sy, 0.18), P(2.78, sy, 0.28)], 0.042, 6);
      [1.50, -0.35].forEach(function (xx) {
        paint.push(bar(P(xx, sy, 0.045), P(xx, s * 0.84, 0.34), 0.036, 5, false));
        paint.push(bar(P(xx, s * 0.84, 0.34), P(xx, s * 0.50, 0.42), 0.036, 5, false));
      });
      dark.push(cyl(0.15, 0.15, 0.07, 10, "y", -0.30, s * 1.15, Z(0.20)));
      metal.push(bar(P(-0.30, s * 1.06, 0.20), P(-0.30, s * 1.19, 0.20), 0.03, 6, true));
    }
    [1.50, -0.35].forEach(function (xx) { paint.push(bar(P(xx, 0.50, 0.42), P(xx, -0.50, 0.42), 0.036, 6, true)); });

    /* --------------------------------------------------- the AS.11 fit --
       From the 1958 Swedish demonstration series. A cross tube runs across
       the centre section at deck height, 0.28 m behind the mast. Each end
       carries two launchers, one just outboard of the skid and one 0.54 m
       further out. The head-on view, yaw cancelled on the 2.08 m skid
       track, puts the rounds at least 1.50 and 2.04 m out before any
       allowance for their being 3 m further from the lens than the skid
       tips: 1.58 and 2.12 m here. The close-ups show each launcher as a
       tube running forward from the cross tube over a deep housing, the
       round hung under it with its nose 0.83 m ahead of the cross tube.
       Each half of the cross tube is held by a stay up to the gearbox
       head and a strut down to the lower frame (1958 head-on; the Heer's
       PQ-141 from below). */
    var LX = -0.28, LH = 1.52, MY = [1.58, 2.12];
    store.push(bar(P(LX, 2.30, LH), P(LX, -2.30, LH), 0.052, 8, true));
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) {
        var my = s * MY[k];
        store.push(cyl(0.055, 0.055, 0.50, 8, "x", LX + 0.18, my, Z(LH)));
        store.push(box(0.74, 0.12, 0.19, LX + 0.08, my, Z(LH - 0.145)));
        ss11(store, dark, LX + 0.83, my, Z(LH - 0.33));
      }
      store.push(bar(P(LX, s * 1.50, LH + 0.03), P(-0.04, s * 0.16, 2.14), 0.020, 5, true));
      store.push(bar(P(LX, s * 1.50, LH), P(-0.55, s * 0.46, 0.56), 0.026, 5, true));
    }

    /* --------------------------------------------- airframe meshes ---- */
    mesh(g, skin, T.skin, "airframe", AL_S);
    mesh(g, paint, T.paint, "frame");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, store, T.store, "stores");
    mesh(g, team, T.team, "team");
    mesh(g, glass, T.glass, "glass");

    /* ======================================================= main rotor ==
       Mi-28N mount: -PI/2 about X lands the renderer's spin axis on the
       DOWNWARD mast, so the head turns clockwise from above, as every
       Alouette's does; head undoes the turn. Three metal blades of 0.33 m
       chord on a fully articulated head. Turning clockwise, the leading
       edge is on the -Y side. */
    var mnt = new V.Group();
    mnt.position.set(0, 0, Z(AL.HUB_H));
    mnt.rotation.x = -PI / 2;
    g.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = PI / 2;
    rotor.add(head);
    var hub = [], blades = [];
    hub.push(cyl(0.15, 0.17, 0.22, 10, "z", 0, 0, 0));
    hub.push(cyl(0.07, 0.12, 0.08, 8, "z", 0, 0, 0.11));         /* cap, top +0.15 */
    hub.push(cyl(0.20, 0.20, 0.035, 12, "z", 0, 0, -0.27));      /* turning ring */
    var CH = AL.CHORD, LE = -CH * 0.25, TE = LE + CH, Rr = AL.R;
    var BP = [[0.95, TE - 0.05], [1.35, TE], [Rr - 0.12, TE], [Rr, TE - 0.10],
              [Rr, LE + 0.03], [Rr - 0.06, LE], [1.35, LE], [0.95, LE + 0.02]];
    for (k = 0; k < 3; k++) {
      a = (60 + 120 * k) * D2R;
      var bl = bladeOf(BP, 0.04);
      bl.rotateZ(a);
      blades.push(bl);
      /* the flapping arm, the blade sleeve, the drag damper on the
         trailing side and the pitch link down to the swashplate */
      var parts = [box(0.50, 0.12, 0.09, 0.38, 0, 0), box(0.40, 0.15, 0.10, 0.82, 0, 0),
                   cyl(0.035, 0.035, 0.42, 6, "x", 0.56, 0.13, 0.03),
                   box(0.10, 0.12, 0.04, 0.60, -0.10, -0.05),
                   cyl(0.018, 0.018, 0.24, 4, "z", 0.60, -0.15, -0.16)];
      for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); hub.push(parts[i]); }
    }
    mesh(head, hub, T.metal, "hub");
    mesh(head, blades, T.blade, "blades");
    rotorDisc(head, Rr, T.disc);

    /* ======================================================= tail rotor ==
       asw_helo_fit.js tail mount: +PI/2 about X, so local X is the model's
       X, local Y its up and local Z its RIGHT. The rotor is on the right
       of the boom end, so the hub is outboard toward local +Z. Two metal
       blades of 0.14 m chord, set near upright as built. */
    var tm = new V.Group();
    tm.position.set(AL.TR_X, AL.TR_Y, Z(AL.TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.06, 0.07, 0.16, 10, "z", 0, 0, -0.02), cyl(0.05, 0.02, 0.07, 8, "z", 0, 0, 0.09)];
    var trB = [];
    var tAng = [80, 260];
    for (k = 0; k < 2; k++) {
      var tb = box(AL.TR_R - 0.10, AL.TR_CH, 0.025, 0.10 + (AL.TR_R - 0.10) / 2, 0, 0);
      tb.rotateX(8 * D2R);
      tb.rotateZ(tAng[k] * D2R);
      tb.translate(0, 0, 0.02);
      trB.push(tb);
      var cuff = box(0.16, 0.07, 0.06, 0.10, 0, 0);
      cuff.rotateZ(tAng[k] * D2R);
      cuff.translate(0, 0, 0.02);
      trM.push(cuff);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    mesh(trot, trB, T.blade, "tailrotor_blades");
    return g;
  }

  /* ####################################################################
     ####  WESTLAND SCOUT AH.1  (gbr_e60_gunship)                     ####
     ####################################################################
     A slab-sided five-seat cabin with a raked two-piece windscreen and
     chin windows, the Nimbus turboshaft lying bare on the deck behind the
     rotor mast with its jet pipe pointing aft, a skinned tail boom tapering
     to a swept fin, the two-blade tail rotor on the LEFT of the fin tip,
     and a tailplane with oval end plates slung under the end of the boom.
     Skids on two cross beams, V-strutted to the cabin sides.

     The anti-tank fit from the Royal Marines and Army photographs: a
     support boom out of each side of the rear fuselage under the engine,
     each carrying a launcher frame with two SS.11 side by side under it,
     all four well outboard of the skids and behind the mast; a stay from
     the top of the rear fuselage out to each boom and a brace down to
     the rear cross beam. The observer aimed them through the AF.120
     stabilised sight, a periscope head on the cabin roof above the
     left-hand front seat, right over the A pillar.

     THE PERIOD. The def is e60 ("1960s-70s") only, and the SS.11 fit came
     in from 1969 (Flight International, 24 July 1969, "Army Aviation's
     New Role: Anti-tank Missile Arm"; barmavn's Scout history). The Scout
     is shown as it was then: BS 381C 298 olive drab all over, as XR628
     at Habilayn in 1967 and a 663 Squadron Scout in 1969 show it on
     Commons, with the full red, white and blue roundel, "ARMY" on the
     boom, the white DANGER panel by the tail rotor, and tail rotor blades
     banded red and white, the scheme until September 1973 (Wikipedia,
     Westland Scout). The olive drab and black disruptive scheme came in
     only in the early 1970s, the black and white tail rotor bands after
     1973, and the red and blue roundel XT630 wears later still.

     CHECKED against the brief's notes. The tail rotor IS on the port side
     (XR635's tail, XT630 and XT646 in the air), the SS.11s are on side
     booms and the AF.120 is on the roof, as the brief says. Corrected:
     the windscreen is a raked two-piece V, not stepped; the fixed
     tailplane hangs under the boom end with an oval end plate on each
     tip, 2.2 m across, rather than sitting on the fin; the 1960s-70s
     colours are the olive drab of THE PERIOD above, not a green and black
     camouflage; and the 3.56 m height some data sheets give is the
     Wasp's on its tall wheeled gear - the Scout's three-view and side-on
     photographs put its tail rotor hub 2.1 m up.

     REVISED after review: cabin and boom are one loft, so no doubled skin
     or slivers at the join; the windscreen's lower edge is cut straight;
     the launchers are 0.36-0.38 m further out, with the upper stays; the
     AF.120 sits 0.58 m further forward, over the A pillar; the head is
     9 cm lower, at 2.72 m; and the livery is the 1969-73 one. */
  var SC = {
    GROUND: -1.10,                         /* skid bottoms                */
    /* the blade plane: 2.56 m on the three-view, scaled on the 6.23 m
       between the hubs, and the head's cap 0.16 m above it at the
       published 2.72 m (Jane's 1965-66) */
    HUB_H: 2.56,
    R: 4.915, CHORD: 0.35,
    TR_X: -6.23, TR_Y: 0.30, TR_H: 2.10, TR_R: 1.145, TR_CH: 0.19,
    NOSE: 2.98
  };
  var SC_S = sheet(-6.6, 3.2, 2.0, -1.2, 1.4);
  var _cvS = null, _texS = null;
  /* Where the tail rotor's red and white bands are painted: a strip of
     the belly band far outboard (|y| 1.55-1.95 m), which no skin face of
     the Scout ever projects into. The tail rotor blades carry UVs of
     their own that run root to tip along it (see the tail rotor). */
  var TRB = { u0: 24, u1: 520, v0: 774, v1: 794 };
  /* Block capitals on a 5-high grid, one cell = one stroke: the "ARMY"
     title painted on the boom. Each letter is a list of [col, row, w, h]
     cells and a width in cells. */
  var GLYPH = {
    A: [4, [[0, 1, 1, 4], [3, 1, 1, 4], [1, 0, 2, 1], [1, 2, 2, 1]]],
    R: [4, [[0, 0, 1, 5], [1, 0, 2, 1], [3, 1, 1, 1], [1, 2, 2, 1], [2, 3, 1, 1], [3, 4, 1, 1]]],
    M: [5, [[0, 0, 1, 5], [4, 0, 1, 5], [1, 1, 1, 1], [3, 1, 1, 1], [2, 2, 1, 1]]],
    Y: [5, [[0, 0, 1, 1], [4, 0, 1, 1], [1, 1, 1, 1], [3, 1, 1, 1], [2, 2, 1, 3]]]
  };
  /* A word whose letters are h px tall, starting at canvas x0 and running
     toward +x (nose-ward). mirror draws it for the PORT band: seen from
     the port side the band runs nose to the viewer's left, so the word is
     laid down back to front and each letter reversed to read correctly. */
  function word(g, text, x0, yc, h, mirror) {
    var cell = h / 5, gap = cell, w = 0, i, k;
    for (i = 0; i < text.length; i++) w += GLYPH[text[i]][0] * cell + (i ? gap : 0);
    var x = x0;
    for (i = 0; i < text.length; i++) {
      var gl = GLYPH[text[mirror ? text.length - 1 - i : i]], lw = gl[0] * cell;
      for (k = 0; k < gl[1].length; k++) {
        var c = gl[1][k], cx = mirror ? (gl[0] - c[0] - c[2]) : c[0];
        g.fillRect(x + cx * cell, yc - h / 2 + c[1] * cell, c[2] * cell, c[3] * cell);
      }
      x += lw + gap;
    }
    return w;
  }
  function scoutCanvas() {
    var cv = document.createElement("canvas");
    cv.width = TW; cv.height = TH;
    var g = cv.getContext("2d"), S = SC_S, R = rngFor(1963), i, b, k;
    function Z(h) { return SC.GROUND + h; }
    /* BS 381C 298 olive drab all over, top and belly alike, the Army Air
       Corps finish from the Scout's service entry in 1963 until the olive
       drab and black disruptive scheme came in in the early 1970s: the
       Commons photographs of XR628 at Habilayn in 1967 and of a 663
       Squadron Scout in 1969 show it plain. Taken darker than the chip for
       the ACES lift, and patchy panel by panel as a hard-used airframe is. */
    g.fillStyle = "#43412f"; g.fillRect(0, 0, TW, TH);
    for (i = 0; i < 140; i++) {
      g.fillStyle = (i & 1) ? "#4c4a36" : "#3a3828";
      g.globalAlpha = 0.25 + R() * 0.35;
      g.fillRect(R() * TW, R() * TH, (0.3 + R() * 1.0) * S.sx, 10 + R() * 30);
    }
    g.globalAlpha = 1;
    g.fillStyle = "rgba(255,255,236,0.05)"; g.fillRect(0, 0, TW, BAND);
    seams(g, S, R, [2.66, 1.92, 1.02, 0.08, -0.50, -1.20, -2.00, -3.00, -4.00, -4.90],
          [0.80, 1.20, 1.45], Z, 45);
    /* the jet pipe's soot along the top of the boom */
    var sg = g.createLinearGradient(S.x(-2.2), 0, S.x(-4.2), 0);
    sg.addColorStop(0, "rgba(16,15,13,0.45)"); sg.addColorStop(1, "rgba(16,15,13,0)");
    g.fillStyle = sg;
    g.fillRect(S.x(-4.2), S.top(0.35), S.x(-2.2) - S.x(-4.2), S.top(-0.35) - S.top(0.35));
    for (b = 1; b <= 2; b++) {
      /* the full red, white and blue roundel of the 1960s, on the rear
         fuselage below the engine (XR628, 1967; 663 Sqn, 1969) */
      roundel(g, S.x(-1.95), S.side(Z(1.25), b), 0.16 * S.sz,
              [["#2b3a6a", 1.0], ["#e6e3d8", 0.667], ["#a8322a", 0.333]]);
      /* "ARMY" in black on the boom just behind it, 0.17 m capitals */
      g.fillStyle = "#141412";
      word(g, "ARMY", S.x(-3.12), S.side(Z(1.20), b), 0.17 * S.sz, b === 1);
      /* the white DANGER panel warning of the tail rotor, near the tail */
      g.fillStyle = "#e3e0d6";
      g.fillRect(S.x(-5.10), S.side(Z(1.31), b), S.x(-4.55) - S.x(-5.10), S.side(Z(1.18), b) - S.side(Z(1.31), b));
      g.fillStyle = "#a8322a";
      g.fillRect(S.x(-5.04), S.side(Z(1.27), b), S.x(-4.61) - S.x(-5.04), S.side(Z(1.22), b) - S.side(Z(1.27), b));
    }
    /* The tail rotor's bands: red and white, five along the blade, red at
       root and tip. Wikipedia's Westland Scout article: the scheme was
       red and white bands until a ground accident in September 1973
       changed it to black and white; 663 Sqn's Scout shows them in 1969. */
    for (k = 0; k < 5; k++) {
      g.fillStyle = (k & 1) ? "#e6e3d8" : "#b0302a";
      var ua = TRB.u0 + (TRB.u1 - TRB.u0) * k / 5, ub = TRB.u0 + (TRB.u1 - TRB.u0) * (k + 1) / 5;
      g.fillRect(ua, TRB.v0, ub - ua, TRB.v1 - TRB.v0);
    }
    return cv;
  }

  function scoutMats(C) {
    var m = {};
    if (_texS === null) {
      try { if (!_cvS) _cvS = scoutCanvas(); _texS = texFrom(_cvS); } catch (e) { _texS = false; }
    }
    m.skin = new V.MeshStandardMaterial({ color: 0xffffff, roughness: 0.86, metalness: 0.08 });
    if (_texS) m.skin.map = _texS; else m.skin.color.setHex(0x43412f);
    /* skids, struts and booms in the same olive drab */
    m.paint = new V.MeshStandardMaterial({ color: 0x3f3d2c, roughness: 0.80, metalness: 0.12 });
    /* the Nimbus and its jet pipe are bare, weathered metal */
    m.metal = new V.MeshStandardMaterial({ color: 0x6a6660, roughness: 0.48, metalness: 0.58 });
    m.dark  = new V.MeshStandardMaterial({ color: 0x1c1e1c, roughness: 0.68, metalness: 0.28 });
    m.blade = new V.MeshStandardMaterial({ color: 0x2c302a, roughness: 0.80, metalness: 0.10 });
    /* SS.11 rounds and launchers: the pale finish of the rounds in the
       Royal Marines' "Scout with SS.11s" photographs */
    m.store = new V.MeshStandardMaterial({ color: 0x7c7f76, roughness: 0.70, metalness: 0.10 });
    m.glass = new V.MeshPhysicalMaterial({ color: 0x1b2a31, roughness: 0.08, metalness: 0.20,
                                           clearcoat: 1.0, clearcoatRoughness: 0.05 });
    m.team = teamMat(C);
    m.disc = discMat();
    return m;
  }

  function buildScout(THREE, M, C) {
    V = THREE;
    var T = scoutMats(C);
    var g = new V.Group();
    g.name = "scout_ah1";
    var GR = SC.GROUND;
    function Z(h) { return GR + h; }
    function P(x, y, h) { return [x, y, Z(h)]; }
    var i, k, s, a;
    var skin = [], glass = [], paint = [], metal = [], dark = [], store = [], team = [];

    /* ------------------------------------------------------ the fuselage --
       From the three-view and XT626 side-on: the nose 2.98 m ahead of the
       mast, the windscreen from 1.38 m at x 2.66 raked back to the roof at
       2.22 m over x 1.92, a flat roof at 2.27 m back to the rear door, the
       belly 0.54 m off the ground under the cabin rising into the boom,
       the boom a tapering oval that ends under the fin 5.9 m aft.
                    x      zb    zt    zm    wb    wm    wt    e          */
    function sec(x, zb, zt, zm, wb, wm, wt, e) {
      return { x: x, zb: Z(zb), zt: Z(zt), zm: Z(zm), wb: wb, wm: wm, wt: wt, e: e };
    }
    var FUS = [
      sec( 2.98, 0.74, 1.06, 0.90, 0.22, 0.32, 0.24, 0.70),
      sec( 2.90, 0.63, 1.20, 0.93, 0.38, 0.54, 0.42, 0.55),
      sec( 2.78, 0.57, 1.30, 0.97, 0.48, 0.68, 0.54, 0.48),
      sec( 2.66, 0.55, 1.38, 1.00, 0.52, 0.73, 0.58, 0.45),
      sec( 2.40, 0.54, 1.66, 1.06, 0.55, 0.78, 0.61, 0.42),
      sec( 2.15, 0.54, 1.94, 1.10, 0.57, 0.80, 0.63, 0.42),
      sec( 1.92, 0.54, 2.22, 1.14, 0.58, 0.81, 0.65, 0.42),
      sec( 1.60, 0.54, 2.27, 1.16, 0.58, 0.82, 0.66, 0.42),
      sec( 1.02, 0.54, 2.28, 1.16, 0.58, 0.82, 0.66, 0.42),
      sec( 0.50, 0.55, 2.27, 1.16, 0.58, 0.82, 0.65, 0.42),
      sec( 0.08, 0.57, 2.22, 1.16, 0.57, 0.81, 0.63, 0.43),
      sec(-0.20, 0.60, 1.98, 1.15, 0.53, 0.76, 0.56, 0.45),
      sec(-0.50, 0.64, 1.66, 1.14, 0.48, 0.66, 0.48, 0.47),
      sec(-1.20, 0.72, 1.60, 1.15, 0.40, 0.52, 0.40, 0.50),
      sec(-2.00, 0.80, 1.56, 1.16, 0.28, 0.34, 0.28, 0.55),
      sec(-3.00, 0.88, 1.52, 1.19, 0.25, 0.31, 0.25, 0.60),
      sec(-4.00, 0.96, 1.48, 1.22, 0.21, 0.26, 0.20, 0.62),
      sec(-4.90, 1.03, 1.44, 1.24, 0.15, 0.18, 0.15, 0.66),
      sec(-5.45, 1.10, 1.42, 1.26, 0.11, 0.13, 0.11, 0.70),
      sec(-5.90, 1.18, 1.40, 1.29, 0.06, 0.08, 0.06, 0.80),
    ];
    /* The cabin is lofted with a row of vertices on every window sill and
       head (heights above the ground in LEVELS) and a section at every
       window's front and back edge, so the glazing below is cut from the
       loft itself: flush, with straight edges, and nothing to z-fight.
       Where a level is off the top or bottom of a section (the nose), its
       vertex is spread evenly into the gap instead. The boom behind is a
       plain loft that starts inside the cabin's open back end. */
    var LEVELS = [0.70, 0.94, 1.28, 1.44, 1.52, 1.84, 2.15, 2.215];
    function cabAngles(q) {
      var A = [], k0 = -1, k1 = LEVELS.length, j;
      for (j = 0; j < LEVELS.length; j++) {
        var z = Z(LEVELS[j]);
        if (z > q.zb + 0.012 && z < q.zt - 0.012) { A.push(thAt(q, z)); if (k0 < 0) k0 = j; k1 = j; }
        else A.push(null);
      }
      var lo = k0 < 0 ? -PI / 2 : A[k0], hi = k0 < 0 ? PI / 2 : A[k1];
      if (k0 < 0) { k0 = LEVELS.length; k1 = -1; }
      for (j = 0; j < k0; j++) A[j] = -PI / 2 + (lo + PI / 2) * (j + 1) / (k0 + 1);
      for (j = k1 + 1; j < LEVELS.length; j++)
        A[j] = hi + (PI / 2 - hi) * (j - k1) / (LEVELS.length - k1);
      return [-PI / 2].concat(A, [PI / 2]);
    }
    /* Cabin and boom are ONE loft: behind the cabin (x < -0.50) the rings
       fall back to ten evenly spaced angles, the same count, so the skin
       runs on into the boom with no open end and no second skin laid
       inside the first. (A separate boom starting inside the cabin's open
       back end left 10 cm of doubled skin and slivers of the cabin's
       culled inside showing at the join.) */
    var CAB = [2.98, 2.90, 2.78, 2.72, 2.66, 2.52, 2.40, 2.28, 2.20, 2.04, 1.94, 1.88, 1.60, 1.33,
               1.06, 0.96, 0.70, 0.42, 0.14, 0.08, -0.20, -0.50].map(function (x) { return secAt(FUS, x); })
              .concat(FUS.filter(function (q) { return q.x < -0.50; }));
    var NR = LEVELS.length + 1;             /* ring steps a side: 9      */
    function fusAngles(q) {
      if (q.x >= -0.50) return cabAngles(q);
      var A = [], j;
      for (j = 0; j <= NR; j++) A.push(-PI / 2 + PI * j / NR);
      return A;
    }
    var cab = loft(CAB, 0, 0.03, 0.04, fusAngles);
    /* The glazing, from XT626 side-on: the windscreen wrapping round into
       its quarter lights back to x 1.94, the front door window, the rear
       door window, the tinted front half of the roof, and the chin windows
       in the lower nose. */
    split(cab, function (x, y, z) {
      var h = z - GR;
      if (x > 1.94 && x < 2.66 && h > 1.44) return true;
      if (x > 1.06 && x < 1.88 && h > 1.52 && h < 2.15) return true;
      if (x > 0.14 && x < 0.96 && h > 1.44 && h < 2.15) return true;
      if (x > 1.06 && x < 1.88 && h > 2.215) return true;
      if (x > 2.20 && x < 2.72 && h > 0.94 && h < 1.28) return true;
      return false;
    }, skin, glass, [[Z(1.44), 1.94, 2.66], [Z(0.94), 2.20, 2.72], [Z(1.28), 2.20, 2.72]]);
    /* the frames: the windscreen's centre post, the A pillar, and the sill
       rail under the windscreen and door windows, riding on the skin */
    function top(x) { return secAt(FUS, x).zt; }
    function onSkin(x, h, side) {
      var q = secAt(FUS, x), p = ptAt(q, thAt(q, Z(h)), 0.018);
      return [x, side * p[1], p[2]];
    }
    tube(skin, [[2.64, 0, top(2.64) + 0.02], [2.40, 0, top(2.40) + 0.02], [2.15, 0, top(2.15) + 0.02],
                [1.94, 0, top(1.94) + 0.02]], 0.028, 4);
    for (s = -1; s <= 1; s += 2) {
      tube(skin, [onSkin(1.91, 1.46, s), onSkin(1.91, 2.16, s), onSkin(1.91, 2.21, s)], 0.034, 4);
      tube(skin, [onSkin(2.58, 1.44, s), onSkin(2.40, 1.44, s), onSkin(1.94, 1.46, s), onSkin(1.88, 1.52, s),
                  onSkin(1.06, 1.52, s)], 0.022, 4);
    }
    /* the gearbox cowl on the roof behind the cabin */
    skin.push(box(0.50, 0.70, 0.12, 0.00, 0, Z(2.20)));

    /* -------------------------------------------- the AF.120 roof sight --
       The observer's gyro-stabilised periscope head, on the roof above the
       left-hand front seat and right over the A pillar, so he looks up
       into it just ahead of his face: the Royal Marines' 1978 "Scout with
       SS.11s" (side and head-on) and XT630, which still carries it. A low
       collar on the roof, the head on it 0.29 m across and about 0.2 m
       tall under a flat hood, its window facing forward. The hood stays
       10 cm under the blade plane. */
    var AFX = 1.78, AFY = 0.30, rf = top(AFX);
    skin.push(cyl(0.17, 0.18, 0.045, 12, "z", AFX, AFY, rf + 0.012));
    metal.push(cyl(0.145, 0.145, 0.15, 12, "z", AFX, AFY, rf + 0.11));
    metal.push(box(0.31, 0.29, 0.025, AFX + 0.01, AFY, rf + 0.197));
    glass.push(box(0.03, 0.13, 0.08, AFX + 0.135, AFY, rf + 0.11));

    /* ------------------------------------------ gearbox and fixed mast -- */
    metal.push(cyl(0.085, 0.09, SC.HUB_H - 2.20, 10, "z", 0, 0, Z((SC.HUB_H + 2.20) / 2)));
    metal.push(cyl(0.22, 0.22, 0.04, 16, "z", 0, 0, Z(SC.HUB_H - 0.28)));
    for (s = -1; s <= 1; s += 2) metal.push(bar(P(0.14, s * 0.18, 2.26), P(0.10, s * 0.16, 2.38), 0.018, 4, false));

    /* ------------------------------------------------------ the Nimbus ---
       On the deck behind the mast, 1.95 m up: the big intake drum at the
       front, the casing with its plumbing, the oil tank and accessories
       slung under it, and the jet pipe out to 2.24 m behind the mast. */
    var EH = Z(1.97);
    metal.push(cyl(0.30, 0.30, 0.40, 14, "x", -0.48, 0, EH));
    dark.push(disc(0.26, 14, [-0.275, 0, EH], [1, 0, 0]));
    metal.push(cyl(0.24, 0.26, 0.64, 12, "x", -1.00, 0, EH - 0.02));
    dark.push(box(1.20, 0.40, 0.20, -1.20, 0, Z(1.70)));
    dark.push(cyl(0.09, 0.09, 0.70, 8, "x", -1.05, 0.22, Z(1.74)));
    for (i = 0; i < 3; i++) metal.push(bar(P(-0.70 - i * 0.22, 0.26, 2.10), P(-0.78 - i * 0.22, 0.24, 1.72), 0.022, 4, false));
    var jp = latheX([[-1.30, 0.21], [-1.70, 0.22], [-2.05, 0.24], [-2.24, 0.26]], 12, 0, EH);
    metal.push(jp);
    /* a short soot-black lining inside the mouth, and a dark bulkhead
       where it ends, so looking up the pipe never shows daylight */
    dark.push(inward(latheX([[-1.86, 0.19], [-2.23, 0.23]], 12, 0, EH)));
    dark.push(disc(0.19, 12, [-1.87, 0, EH], [-1, 0, 0]));
    for (s = -1; s <= 1; s += 2) {
      paint.push(bar(P(-0.55, s * 0.30, 1.62), P(-0.60, s * 0.20, 1.84), 0.022, 4, false));
      paint.push(bar(P(-1.55, s * 0.26, 1.58), P(-1.45, s * 0.18, 1.84), 0.022, 4, false));
    }

    /* ------------------------------------------------ fin and tailplane --
       The fin is swept about 60 degrees, from the top of the boom end to the
       tail rotor gearbox at its tip; the tailplane hangs under the boom
       end, 2.23 m across the oval end plates (three-view). */
    function finAt(x, z, kk) { return [x, kk, z]; }
    var finRoot = foil([-4.88, Z(1.42)], [-5.92, Z(1.30)], 0.14, finAt);
    var finTip = foil([-6.06, Z(2.04)], [-6.40, Z(1.98)], 0.09, finAt);
    skin.push(solid(finRoot, finTip));
    skin.push(sph(0.12, 10, 6, -6.23, 0.06, Z(SC.TR_H), 1.5, 1.0, 1.0));
    metal.push(cyl(0.04, 0.04, 0.18, 8, "y", -6.23, SC.TR_Y - 0.12, Z(SC.TR_H)));
    /* the anti-collision beacon housing on top of the tail gearbox */
    dark.push(cyl(0.04, 0.05, 0.08, 8, "z", -6.26, 0.04, Z(SC.TR_H + 0.16)));
    function stabAt(y) { return function (x, z, kk) { return [x, y, Z(1.02) + kk]; }; }
    var stR = foil([-4.84, 0], [-5.30, 0], 0.06, stabAt(0.0));
    var stT = foil([-4.86, 0], [-5.28, 0], 0.05, stabAt(1.10));
    both(skin, solid(stR, stT));
    /* the oval end plates carry the team colour, like the flash on each
       tailplane top (laid 1 cm clear of the skin) */
    both(team, sph(0.26, 10, 6, -5.08, 1.115, Z(1.02), 1.0, 0.08, 0.62));
    both(team, box(0.26, 0.70, 0.012, -5.06, 0.62, Z(1.02) + 0.036));
    /* the tail bumper that saves the rotor in a nose-high landing */
    tube(paint, [P(-5.45, 0, 1.10), P(-5.98, 0, 0.66), P(-6.08, 0, 0.64), P(-6.14, 0, 0.72)], 0.028, 4);
    /* the team band round the boom, cut from its own sections on the
       boom's own ring angles, 3.5% oversize, within one bay of the loft */
    team.push(band(FUS, -3.30, -3.95, NR, 1.035));

    /* ------------------------------------------------------- the skids --
       2.41 m track, 3.2 m long and turned up at the front; the cross
       beams 1.44 m ahead of and 0.30 m behind the mast (three-view),
       V-strutted up to the cabin sides, and the ground-handling wheels
       left on the rear legs. */
    for (s = -1; s <= 1; s += 2) {
      var sy = s * 1.205;
      tube(paint, [P(-1.02, sy, 0.045), P(1.96, sy, 0.045), P(2.10, sy, 0.09), P(2.19, sy, 0.19), P(2.22, sy, 0.30)], 0.045, 6);
      [1.44, -0.30].forEach(function (xx) {
        paint.push(bar(P(xx, sy, 0.045), P(xx, sy, 0.45), 0.040, 6, false));
        paint.push(bar(P(xx, sy * 0.98, 0.45), P(xx, s * 0.74, 1.05), 0.032, 6, false));
        dark.push(cyl(0.045, 0.045, 0.22, 8, "z", xx, sy, Z(0.30)));
      });
      dark.push(cyl(0.18, 0.18, 0.08, 10, "y", -0.30, s * 1.32, Z(0.20)));
      metal.push(bar(P(-0.30, s * 1.24, 0.20), P(-0.30, s * 1.37, 0.20), 0.03, 6, true));
    }
    [1.44, -0.30].forEach(function (xx) { paint.push(bar(P(xx, 1.205, 0.45), P(xx, -1.205, 0.45), 0.042, 6, true)); });

    /* -------------------------------------------------- the SS.11 fit ---
       A support boom out of each side of the rear fuselage 1.2 m behind
       the mast, a launcher frame on it hanging two rounds side by side,
       noses 0.72 m behind the mast. The Royal Marines' head-on 1978 view
       ("Scout with SS.11s-3"), yaw cancelled on the 2.41 m skid track,
       puts the rounds 1.74 and 2.21 m out, before any allowance for their
       standing 3 m further from the lens than the skid tips: 1.76 and
       2.22 m here, the booms out to 2.45 m. A stay runs from the top of
       the rear fuselage out to each boom and a brace down to the rear
       cross beam (the same series, side-on and from behind). */
    var LX = -1.22, LH = 1.14, MY = [1.76, 2.22], LY = (MY[0] + MY[1]) / 2;
    for (s = -1; s <= 1; s += 2) {
      store.push(bar(P(LX, s * 0.40, LH), P(LX, s * 2.45, LH), 0.042, 6, true));
      store.push(box(0.10, 0.72, 0.10, LX - 0.40, s * LY, Z(LH - 0.06)));
      store.push(box(0.10, 0.72, 0.10, LX + 0.40, s * LY, Z(LH - 0.06)));
      for (k = 0; k < 2; k++) {
        var my = s * MY[k];
        store.push(box(0.98, 0.07, 0.07, LX - 0.02, my, Z(LH - 0.10)));
        ss11(store, dark, LX + 0.50, my, Z(LH - 0.22));
      }
      /* the stay from the top of the rear fuselage out to the boom, and
         the brace down to the rear cross beam */
      store.push(bar(P(-0.40, s * 0.50, 1.80), P(LX, s * 1.95, LH + 0.03), 0.022, 5, true));
      store.push(bar(P(LX, s * 1.76, LH), P(-0.30, s * 0.95, 0.45), 0.028, 5, true));
    }

    /* --------------------------------------------- airframe meshes ---- */
    mesh(g, skin, T.skin, "airframe", SC_S);
    mesh(g, paint, T.paint, "frame");
    mesh(g, metal, T.metal, "fittings");
    mesh(g, dark, T.dark, "fittings_dark");
    mesh(g, store, T.store, "stores");
    mesh(g, team, T.team, "team");
    mesh(g, glass, T.glass, "glass");

    /* ======================================================= main rotor ==
       AH-64E mount: +PI/2 about X lands the renderer's spin axis on the
       UPWARD mast, so the head turns anti-clockwise from above; head undoes
       the turn. Four blades of 0.35 m chord on an articulated head, set at
       45 degrees. Turning anti-clockwise, the leading edge is on +Y. */
    var mnt = new V.Group();
    mnt.position.set(0, 0, Z(SC.HUB_H));
    mnt.rotation.x = PI / 2;
    g.add(mnt);
    var rotor = new V.Group();
    rotor.name = "rotor";
    mnt.add(rotor);
    var head = new V.Group();
    head.rotation.x = -PI / 2;
    rotor.add(head);
    var hub = [], blades = [];
    hub.push(cyl(0.16, 0.17, 0.20, 10, "z", 0, 0, 0));
    hub.push(cyl(0.06, 0.10, 0.08, 8, "z", 0, 0, 0.12));         /* cap, top +0.16 */
    hub.push(cyl(0.21, 0.21, 0.035, 12, "z", 0, 0, -0.24));      /* turning ring */
    var CH = SC.CHORD, LE = CH * 0.25, TE = LE - CH, Rr = SC.R;
    var BP = [[0.85, TE + 0.05], [1.25, TE], [Rr - 0.12, TE], [Rr, TE + 0.10],
              [Rr, LE - 0.03], [Rr - 0.06, LE], [1.25, LE], [0.85, LE - 0.02]];
    for (k = 0; k < 4; k++) {
      a = (45 + 90 * k) * D2R;
      var bl = bladeOf(BP, 0.04);
      bl.rotateZ(a);
      blades.push(bl);
      var parts = [box(0.44, 0.12, 0.09, 0.36, 0, 0), box(0.36, 0.15, 0.10, 0.74, 0, 0),
                   cyl(0.032, 0.032, 0.36, 5, "x", 0.50, -0.12, 0.03),
                   box(0.10, 0.12, 0.04, 0.52, 0.10, -0.05),
                   cyl(0.016, 0.016, 0.20, 4, "z", 0.52, 0.14, -0.14)];
      for (i = 0; i < parts.length; i++) { parts[i].rotateZ(a); hub.push(parts[i]); }
    }
    mesh(head, hub, T.metal, "hub");
    mesh(head, blades, T.blade, "blades");
    rotorDisc(head, Rr, T.disc);

    /* ======================================================= tail rotor ==
       asw_helo_fit.js tail mount: local Z is the model's RIGHT, and this
       rotor is on the LEFT of the fin, so the hub is outboard toward local
       -Z. One blade points straight aft as built: see WHAT SETS THE SCALE. */
    var tm = new V.Group();
    tm.position.set(SC.TR_X, SC.TR_Y, Z(SC.TR_H));
    tm.rotation.x = PI / 2;
    g.add(tm);
    var trot = new V.Group();
    trot.name = "tailrotor";
    tm.add(trot);
    var trM = [cyl(0.07, 0.08, 0.18, 10, "z", 0, 0, 0.02), cyl(0.02, 0.06, 0.08, 8, "z", 0, 0, -0.11)];
    var trB = [];
    var tAng = [180, 0];
    for (k = 0; k < 2; k++) {
      var tb = box(SC.TR_R - 0.12, SC.TR_CH, 0.028, 0.12 + (SC.TR_R - 0.12) / 2, 0, 0);
      /* the red and white bands: before it is turned, a vertex's x is its
         distance out along the blade, which runs it root to tip along the
         banded strip of the skin sheet (TRB) */
      var tp = tb.attributes.position.array, tuv = tb.attributes.uv.array, q;
      for (q = 0; q < tp.length / 3; q++) {
        var f = Math.max(0, Math.min(1, (tp[q * 3] - 0.12) / (SC.TR_R - 0.12)));
        tuv[q * 2] = (TRB.u0 + 2 + (TRB.u1 - TRB.u0 - 4) * f) / TW;
        tuv[q * 2 + 1] = 1 - (TRB.v0 + TRB.v1) / 2 / TH;
      }
      tb.rotateX(-8 * D2R);
      tb.rotateZ(tAng[k] * D2R);
      tb.translate(0, 0, -0.02);
      trB.push(tb);
      var cuff = box(0.18, 0.08, 0.07, 0.11, 0, 0);
      cuff.rotateZ(tAng[k] * D2R);
      cuff.translate(0, 0, -0.02);
      trM.push(cuff);
    }
    mesh(trot, trM, T.metal, "tailrotor_hub");
    /* on the skin material, with the UVs above (no projection) */
    mesh(trot, trB, T.skin, "tailrotor_blades");
    return g;
  }

  return { alouette: buildAlouette, scout: buildScout };
})();

/* len is the MEASURED x extent (rotor disc front to the tail rotor guard
   on the Alouette, to the aft tail rotor blade tip on the Scout);
   render3d.js normalises on the measurement anyway. */
UNIT_MODELS["fra_e50_gunship"] = { len: 12.21, build: HeroEarlyScouts.alouette };
UNIT_MODELS["gbr_e60_gunship"] = { len: 12.29, build: HeroEarlyScouts.scout };
