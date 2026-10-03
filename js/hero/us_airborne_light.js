/* ============ us_airborne_light.js - HERO models: the US airborne light armour ============
   The two airborne-division tank killers of the 1950s-1990s, in three guises:
     nato_e50_tankdestroyer   M56 Scorpion          (1957)  90 mm M54 gun, open chassis, no turret
     nato_e60_lighttank       M551 Sheridan         (1967)  152 mm gun/launcher, aluminium hull
     nato_e80_lighttank       M551A1 Sheridan (TTS) (1980s) same hull, thermal-sight housing, MERDC paint
   (nato_e50_tankdestroyer used to borrow atgmv_n, the Stryker ATGM carrier.)

   Reference photographs (Wikimedia Commons, all looked at before drawing):
     M551: the Yuma Proving Ground museum vehicle (3/11 ACR, olive drab, front right);
     the Fort Lewis museum vehicle (woodland, left side); the Armor and Cavalry
     Collection vehicle at Fort Benning (olive drab, front left); an M551A1 of the 73rd
     Armor, 82nd Airborne, in Honduras in 1988 (head-on); an M551A1 of the 82nd as
     opposing force at JRTC (woodland, front left).  Checked again against two period
     photographs of the early M551: a 3/4 Cavalry vehicle in Vietnam, December 1969
     (olive drab, front left) and a close-up of an early turret at Cu Chi (4 smoke tubes
     on the front flank, a box on the front of the roof, the cupola plates).
     M56: two views of a museum vehicle (front right, front left) and the American
     Armored Foundation Tank Museum vehicle at Danville (front left, with crew figures).
   Published figures used (Wikipedia infoboxes, from Hunnicutt for the Sheridan):
     M551A1  hull 6.30 m (248 in), width 2.80 m (110 in), height 2.95 m (116 in) over
             the commander's .50, ground clearance 0.48 m (19 in), 15.2 t; the gun
             overhang of 1.22 m is the usually quoted 7.52 m gun-forward length less the
             hull (the cached infobox gives the hull only, so that figure is unconfirmed)
     M56     hull 4.55 m without the gun, 5.84 m with it, width 2.57 m, height 2.05 m
             over the gun shield, ground clearance 0.32 m, 7.1 t, 90 mm M54, 4 crew,
             rubber-tyred run-flat road wheels, front drive sprocket

   What has to read at a glance:
     Sheridan - a very long, very low wedge: a shallow glacis with the folded
       flotation "surfboard" and a driver's hatch on it, sloped upper hull sides over
       the tracks, FIVE big road wheels a side nearly touching, the drive sprocket raised
       at the front, NO return rollers (a flat track), and a low mushroom turret with a
       fat 152 mm gun that sticks 1.2 m past the nose, the commander's cupola with its
       .50 and a three-plate shield on the right rear, smoke dischargers on the front
       corners.  The A1 (TTS) carries the thermal-sight housing on the right front of
       the turret roof, the 1980s woodland scheme and the canvas stowage box.
     Scorpion - a flat open tub on four big rubber-tyred wheels a side, a wide sloped
       nose with two engine-grille panels and "wings" over the front tracks, a
       boxy gun shield on top, a LONG 90 mm barrel travelling forward on its A-frame
       lock, the recoil cylinder riding above the tube.  No roof, no turret: the
       model has no "turret" node, so nothing trains.

   NOT confirmed from the references (drawn as the nearest plain thing):
     - what the thermal-sight housing measures; it is placed and sized from the 1988
       and JRTC photographs.  The small box on the front of the roof of the early M551
       is there in the 1969 photographs, but whether it is the searchlight housing or
       a sight, and what it measures, is not confirmed, so it is only a plain box;
     - the smoke dischargers: four a side on BOTH guises, because the 1969 Vietnam
       photographs, the Fort Lewis A1 and the 1988 Honduras A1 each show four.  They are
       drawn as a compact 2 x 2 block, not the row of big tubes the Fort Lewis and 1969
       photographs show, and the JRTC vehicle's larger cluster of small tubes is not
       copied (nothing ties it to the thermal sight), so the A1 does NOT differ from the
       early vehicle here.  The position of the canvas stowage box is approximate too;
     - the Sheridan searchlight, the belly mine plates and the Vietnam-era birdcage
       are left off; the plain three-plate commander's shield IS drawn because every
       photograph shows it;
     - the M56 track width (0.42 m) and wheel diameter (0.74 m) are read off the
       photographs, not from a table.

   Built from a handful of primitives per MATERIAL: the hull, the turret and each pair
   of road wheels are separate nodes ("turret", "roadwheel"), every node carries one
   mesh per material, so a Sheridan costs 14 draw calls and a Scorpion 9 (five
   materials each; the parametric Sheridan was 127-133).  Team colour is the plain
   C.team material (era paint leaves it alone), on the roof panels, the glacis and the
   engine deck.  The Sheridan road wheels are one dark mesh: a second material for the
   olive-drab discs inside the rubber would cost five more draw calls.

   Model space: +X nose, +Y left, +Z up, metres, tracks on z = 0.
   ASCII only: a stray byte in a hex literal has broken this project before.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroAirborneLight = (function () {
  "use strict";

  var TAU = Math.PI * 2;

  /* ------------------------------------------------------------ variants */
  var VARIANTS = {
    M551: { kind: "sheridan", tts: false, smoke: 4, tarp: false,
            paint: { base: "#4f5639", blots: [["#474d33", 9, 1], ["#596043", 8, 1]], seed: 61 } },
    A1:   { kind: "sheridan", tts: true,  smoke: 4, tarp: true,
            paint: { base: "#a08c62", blots: [["#4f5b39", 5, 1.0], ["#5b4630", 4, 0.9], ["#20211a", 3, 0.7]], seed: 73, us: 0.20 } },
    M56:  { kind: "scorpion",
            paint: { base: "#4a5136", blots: [["#42482f", 9, 1], ["#575f41", 8, 1]], seed: 83 } }
  };

  /* -------------------------------------------------------- geometry kit */
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function unit(v) { var l = Math.sqrt(dot(v, v)) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function sgn(v) { return v < 0 ? -1 : 1; }

  /* one bin of triangles per material; the painted bin also gets planar UVs
     taken from the dominant axis of each face, so camouflage never stretches */
  function Bin(mat, uv, us) { this.mat = mat; this.P = []; this.N = []; this.U = uv ? [] : null; this.us = us || 0.34; }
  Bin.prototype.tri = function (a, b, c, na, nb, nc) {
    var f = unit(cross(sub(b, a), sub(c, a))), v = [a, b, c], n = [na || f, nb || f, nc || f];
    var i, q, ax = Math.abs(f[0]), ay = Math.abs(f[1]), az = Math.abs(f[2]), k = this.us;
    for (i = 0; i < 3; i++) {
      q = v[i];
      this.P.push(q[0], q[1], q[2]);
      this.N.push(n[i][0], n[i][1], n[i][2]);
      if (this.U) {
        if (az >= ax && az >= ay) this.U.push(q[0] * k, q[1] * k);
        else if (ay >= ax) this.U.push(q[0] * k, q[2] * k);
        else this.U.push(q[1] * k, q[2] * k);
      }
    }
  };

  /* a closed solid: whatever order the corners came in, the signed volume
     says whether the faces point out, and they are turned if they do not */
  function solid(bin, V, F, Nv) {
    var vol = 0, i, f, a, b, c;
    for (i = 0; i < F.length; i++) { f = F[i]; vol += dot(V[f[0]], cross(V[f[1]], V[f[2]])); }
    for (i = 0; i < F.length; i++) {
      f = F[i];
      a = f[0]; b = vol < 0 ? f[2] : f[1]; c = vol < 0 ? f[1] : f[2];
      bin.tri(V[a], V[b], V[c], Nv && Nv[a], Nv && Nv[b], Nv && Nv[c]);
    }
    return vol;
  }

  var HEXF = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [1, 2, 6], [1, 6, 5],
              [0, 4, 7], [0, 7, 3], [0, 1, 5], [0, 5, 4], [3, 7, 6], [3, 6, 2]];
  function hexa(bin, P) { solid(bin, P, HEXF); }
  function box(bin, x0, x1, y0, y1, z0, z1) {
    hexa(bin, [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
               [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]]);
  }
  /* a box turned about Z: centre (cx, cy), half sizes hx (along ang), hy */
  function rbox(bin, cx, cy, hx, hy, ang, z0, z1) {
    var c = Math.cos(ang), s = Math.sin(ang), k, q = [[-hx, -hy], [hx, -hy], [hx, hy], [-hx, hy]], P = [];
    for (k = 0; k < 8; k++) {
      var e = q[k % 4];
      P.push([cx + e[0] * c - e[1] * s, cy + e[0] * s + e[1] * c, k < 4 ? z0 : z1]);
    }
    hexa(bin, P);
  }
  /* a box on a tilted plane: origin P0, in-plane axes U and W, normal N */
  function planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1) {
    function pt(u, w, h) {
      return [P0[0] + U[0] * u + W[0] * w + N[0] * h, P0[1] + U[1] * u + W[1] * w + N[1] * h,
              P0[2] + U[2] * u + W[2] * w + N[2] * h];
    }
    hexa(bin, [pt(u0, w0, h0), pt(u1, w0, h0), pt(u1, w1, h0), pt(u0, w1, h0),
               pt(u0, w0, h1), pt(u1, w0, h1), pt(u1, w1, h1), pt(u0, w1, h1)]);
  }
  /* a slab along a line in the XZ plane, thickness th, spanning y0..y1: track runs */
  function belt(bin, x0, z0, x1, z1, y0, y1, th) {
    var dx = x1 - x0, dz = z1 - z0, l = Math.sqrt(dx * dx + dz * dz), nx = -dz / l * th / 2, nz = dx / l * th / 2;
    hexa(bin, [[x0 - nx, y0, z0 - nz], [x1 - nx, y0, z1 - nz], [x1 - nx, y1, z1 - nz], [x0 - nx, y1, z0 - nz],
               [x0 + nx, y0, z0 + nz], [x1 + nx, y0, z1 + nz], [x1 + nx, y1, z1 + nz], [x0 + nx, y1, z0 + nz]]);
  }
  /* a capped cylinder or cone between two centres, smooth round the side */
  function cyl(bin, A, B, r0, r1, seg, nocap) {
    var ax = unit(sub(B, A)), t = Math.abs(ax[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    var u = unit(cross(ax, t)), v = cross(ax, u), V = [], N = [], F = [], i, j, c, s, rn, base, rA, rB, na;
    for (i = 0; i < seg; i++) {
      c = Math.cos(i / seg * TAU); s = Math.sin(i / seg * TAU);
      rn = [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s];
      V.push([A[0] + rn[0] * r0, A[1] + rn[1] * r0, A[2] + rn[2] * r0]); N.push(rn);
      V.push([B[0] + rn[0] * r1, B[1] + rn[1] * r1, B[2] + rn[2] * r1]); N.push(rn);
    }
    for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([2 * i, 2 * j, 2 * j + 1], [2 * i, 2 * j + 1, 2 * i + 1]); }
    if (!nocap) {
      base = V.length; na = [-ax[0], -ax[1], -ax[2]];
      V.push(A, B); N.push(na, ax);
      rA = base + 2; rB = base + 2 + seg;
      for (i = 0; i < seg; i++) { V.push(V[2 * i]); N.push(na); }
      for (i = 0; i < seg; i++) { V.push(V[2 * i + 1]); N.push(ax); }
      for (i = 0; i < seg; i++) { j = (i + 1) % seg; F.push([base, rA + j, rA + i], [base + 1, rB + i, rB + j]); }
    }
    solid(bin, V, F, N);
  }
  function cylY(bin, x, y0, y1, z, r, seg) { cyl(bin, [x, y0, z], [x, y1, z], r, r, seg); }
  function cylZ(bin, x, y, z0, z1, r, seg) { cyl(bin, [x, y, z0], [x, y, z1], r, r, seg); }
  function cylX(bin, x0, x1, y, z, r, seg) { cyl(bin, [x0, y, z], [x1, y, z], r, r, seg); }

  /* a loft of equal-count rings (x increasing nose-ward), the end rings capped
     by the fans in `capIdx` (index lists into a ring); the ring winding is the
     one us_bradley.js uses, so the signed volume sorts out the facing */
  function loftRings(bin, rings, capIdx) {
    var n = rings[0].length, m = rings.length, V = [], F = [], i, k, k1;
    for (i = 0; i < m; i++) for (k = 0; k < n; k++) V.push(rings[i][k]);
    for (i = 0; i + 1 < m; i++) {
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n;
        F.push([i * n + k, i * n + k1, (i + 1) * n + k1], [i * n + k, (i + 1) * n + k1, (i + 1) * n + k]);
      }
    }
    function cap(base, idx, dir) {
      var ids = idx.map(function (q) { return base + q; }), j;
      var nv = cross(sub(V[ids[1]], V[ids[0]]), sub(V[ids[2]], V[ids[0]]));
      if (nv[0] * dir < 0) ids.reverse();
      for (j = 1; j + 1 < ids.length; j++) F.push([ids[0], ids[j], ids[j + 1]]);
    }
    for (i = 0; i < capIdx.length; i++) { cap(0, capIdx[i], -1); cap((m - 1) * n, capIdx[i], 1); }
    return solid(bin, V, F);
  }

  /* an oval ring about (cx, cy) at height z, a little squared off (pw < 1) */
  function oval(cx, cy, ax, ay, z, n, pw) {
    var P = [], k, t, c, s;
    for (k = 0; k < n; k++) {
      t = k / n * TAU; c = Math.cos(t); s = Math.sin(t);
      P.push([cx + ax * sgn(c) * Math.pow(Math.abs(c), pw), cy + ay * sgn(s) * Math.pow(Math.abs(s), pw), z]);
    }
    return P;
  }
  /* a stack of oval rings rising in z, smooth round the flank and flat on both
     caps: the turret body */
  function ovalStack(bin, rings) {
    var n = rings[0].length, m = rings.length, V = [], F = [], Nv = [], i, k, k1, f, w, c0 = [0, 0, 0], c1 = [0, 0, 0];
    for (i = 0; i < m; i++) for (k = 0; k < n; k++) V.push(rings[i][k]);
    for (i = 0; i + 1 < m; i++) {
      for (k = 0; k < n; k++) {
        k1 = (k + 1) % n;
        F.push([i * n + k, i * n + k1, (i + 1) * n + k1], [i * n + k, (i + 1) * n + k1, (i + 1) * n + k]);
      }
    }
    for (i = 0; i < V.length; i++) Nv.push([0, 0, 0]);
    for (i = 0; i < F.length; i++) {
      f = F[i]; w = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
      for (k = 0; k < 3; k++) { Nv[f[k]][0] += w[0]; Nv[f[k]][1] += w[1]; Nv[f[k]][2] += w[2]; }
    }
    for (i = 0; i < Nv.length; i++) Nv[i] = unit(Nv[i]);
    for (i = 0; i < F.length; i++) {
      f = F[i]; bin.tri(V[f[0]], V[f[1]], V[f[2]], Nv[f[0]], Nv[f[1]], Nv[f[2]]);
    }
    for (k = 0; k < n; k++) {
      c0[0] += rings[0][k][0] / n; c0[1] += rings[0][k][1] / n; c0[2] = rings[0][k][2];
      c1[0] += rings[m - 1][k][0] / n; c1[1] += rings[m - 1][k][1] / n; c1[2] = rings[m - 1][k][2];
    }
    for (k = 0; k < n; k++) {
      k1 = (k + 1) % n;
      bin.tri(c0, rings[0][k1], rings[0][k]);
      bin.tri(c1, rings[m - 1][k], rings[m - 1][k1]);
    }
  }

  /* one road wheel station, both sides: two tyred discs round a hub on the
     axle (local Y), five bolts on each outer face.  The engine spins the node. */
  function roadWheel(bin, TYc, R, hubR, wd, gap, seg) {
    var s, y0, k, ba, bx, bz;
    for (s = -1; s <= 1; s += 2) {
      y0 = s * TYc;
      cylY(bin, 0, y0 - gap - wd, y0 - gap, 0, R, seg);
      cylY(bin, 0, y0 + gap, y0 + gap + wd, 0, R, seg);
      cylY(bin, 0, y0 - gap - wd - 0.02, y0 + gap + wd + 0.02, 0, hubR, 12);
      for (k = 0; k < 5; k++) {
        ba = k / 5 * TAU + 0.3; bx = Math.cos(ba) * hubR * 0.62; bz = Math.sin(ba) * hubR * 0.62;
        box(bin, bx - 0.022, bx + 0.022, y0 + s * (gap + wd + 0.02), y0 + s * (gap + wd + 0.035), bz - 0.022, bz + 0.022);
      }
    }
  }

  /* ----------------------------------------------------------- materials */
  var _tex = {};
  function paintTex(THREE, P) {
    var key = P.base + P.seed;
    if (_tex[key] !== undefined) return _tex[key];
    var t = null;
    try {
      var cv = document.createElement("canvas");
      cv.width = 256; cv.height = 256;
      var q = cv.getContext("2d"), s = P.seed >>> 0, i, k, a, x, y, rr, ang, rd, b;
      var R = function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
      q.fillStyle = P.base; q.fillRect(0, 0, 256, 256);
      for (k = 0; k < P.blots.length; k++) {
        b = P.blots[k];
        q.fillStyle = b[0];
        for (i = 0; i < b[1]; i++) {
          x = R() * 256; y = R() * 256; rr = (16 + R() * 34) * b[2];
          q.beginPath();
          for (a = 0; a < 7; a++) {
            ang = a / 7 * TAU; rd = rr * (0.55 + R() * 0.7);
            if (a === 0) q.moveTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
            else q.lineTo(x + Math.cos(ang) * rd * 1.4, y + Math.sin(ang) * rd);
          }
          q.closePath(); q.fill();
        }
      }
      for (i = 0; i < 70; i++) {
        q.fillStyle = (i % 2) ? "rgba(15,14,10,0.07)" : "rgba(240,236,215,0.05)";
        q.fillRect(R() * 256, R() * 256, 3 + R() * 30, 2 + R() * 18);
      }
      t = new THREE.CanvasTexture(cv);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
      t.anisotropy = 4;
    } catch (e) { t = null; }
    _tex[key] = t;
    return t;
  }

  /* five materials: PAINT (textured), DARK (rubber, gun, grilles), TRACK, GLASS
     (sights, vision blocks) and the team colour, exactly as handed in, so the era
     kit can leave it alone when this hull stands in for another army's tank */
  function materials(THREE, C, V) {
    var T = {}, tx = paintTex(THREE, V.paint);
    T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
    if (tx) T.paint.map = tx; else T.paint.color.set(V.paint.base);
    T.dark = new THREE.MeshStandardMaterial({ color: 0x25272a, roughness: 0.78, metalness: 0.3 });
    T.track = new THREE.MeshStandardMaterial({ color: 0x322f2a, roughness: 0.86, metalness: 0.25 });
    T.glass = new THREE.MeshStandardMaterial({ color: 0x1d2a33, roughness: 0.14, metalness: 0.35 });
    T.team = new THREE.MeshStandardMaterial({ color: (C && C.team !== undefined) ? C.team : 0x3f7fd0, roughness: 0.84, metalness: 0.06 });
    return T;
  }
  function bins(T, V) {
    return { paint: new Bin(T.paint, true, V.paint.us), dark: new Bin(T.dark, false), track: new Bin(T.track, false),
             glass: new Bin(T.glass, false), team: new Bin(T.team, false) };
  }
  function flush(THREE, group, B) {
    var k, b, geo;
    for (k in B) {
      b = B[k];
      if (!b.P.length) continue;
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b.P), 3));
      geo.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b.N), 3));
      if (b.U) geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(b.U), 2));
      group.add(new THREE.Mesh(geo, b.mat));
    }
  }

  /* ================================================================ SHERIDAN */
  /* hull 6.30 m: nose x = +3.15, tail x = -3.15.  Five road wheels on 0.74 m
     centres, the sprocket raised at the front, the idler low at the rear; the
     track is 0.53 m wide (21 in, from memory) and the 2.80 m overall width is the hull
     shelf over the tracks. */
  var SH = {
    XW: [1.50, 0.76, 0.02, -0.72, -1.46], ZW: 0.40, RW: 0.34, TY: 1.105,
    TX: 0.35, TZ: 1.40,                       /* turret ring: a touch ahead of mid-hull */
    GZ: 0.45                                  /* bore axis above the ring */
  };

  function addSheridanHull(V, B, WB) {
    var HL = 3.15, i, k, s;
    var st = [
      { x: -HL,  zB: 0.55, zSB: 0.98, zST: 1.03, zT: 1.40, w: 0.84, s: 1.39, r: 0.92 },
      { x: 1.30, zB: 0.50, zSB: 0.98, zST: 1.03, zT: 1.40, w: 0.90, s: 1.40, r: 0.92 },
      { x: 2.95, zB: 0.52, zSB: 0.88, zST: 0.93, zT: 1.00, w: 0.98, s: 1.40, r: 1.26 },
      { x: HL,   zB: 0.66, zSB: 0.80, zST: 0.88, zT: 0.94, w: 0.95, s: 1.37, r: 1.30 }
    ];
    var rings = st.map(function (S) {
      return [[S.x, S.w, S.zB], [S.x, S.w, S.zSB], [S.x, S.s, S.zSB], [S.x, S.s, S.zST], [S.x, S.r, S.zT],
              [S.x, -S.r, S.zT], [S.x, -S.s, S.zST], [S.x, -S.s, S.zSB], [S.x, -S.w, S.zSB], [S.x, -S.w, S.zB]];
    });
    loftRings(B.paint, rings, [[0, 1, 8, 9], [4, 5, 6, 7, 8, 1, 2, 3]]);

    /* the glacis: one plane from the foot at x 1.30 (z 1.40) down to x 2.95 (z 1.00) */
    var phi = Math.atan2(0.40, 1.65), cp = Math.cos(phi), sp = Math.sin(phi), slope = 0.40 / 1.65;
    var P0 = [2.95, 0, 1.00], U = [-cp, 0, sp], W = [0, 1, 0], N = [sp, 0, cp];
    function gb(bin, u0, u1, w0, w1, h0, h1) { planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1); }
    function zGl(x) { return 1.00 + (2.95 - x) * slope; }
    /* the flotation screen, folded flat on the nose: a slab with a ridge at its hinge */
    gb(B.paint, 0.05, 0.60, -0.92, 0.92, 0.0, 0.05);
    gb(B.dark, 0.60, 0.68, -0.92, 0.92, 0.0, 0.075);
    gb(B.dark, 0.05, 0.60, -0.94, -0.90, 0.0, 0.06);
    gb(B.dark, 0.05, 0.60, 0.90, 0.94, 0.0, 0.06);
    gb(B.team, 0.14, 0.50, 0.25, 0.80, 0.05, 0.062);
    gb(B.team, 0.14, 0.50, -0.80, -0.25, 0.05, 0.062);
    /* the driver's hatch, centred, with three vision blocks on its front */
    var hz = zGl(2.05);
    cylZ(B.paint, 2.05, 0, hz - 0.07, hz + 0.10, 0.27, 14);
    cylZ(B.dark, 2.05, 0, hz + 0.10, hz + 0.13, 0.20, 12);
    for (i = 0; i < 3; i++) box(B.glass, 2.28, 2.34, -0.17 + i * 0.17, -0.17 + i * 0.17 + 0.12, hz + 0.02, hz + 0.10);
    /* the lamps at the nose corners behind their guards, tow eyes on the nose plate */
    for (s = -1; s <= 1; s += 2) {
      cylX(B.dark, 2.80, 2.98, s * 1.02, zGl(2.88) + 0.06, 0.075, 10);
      cylX(B.glass, 2.98, 3.00, s * 1.02, zGl(2.88) + 0.06, 0.058, 10);
      box(B.dark, 3.15, 3.22, s * 0.55 - 0.07, s * 0.55 + 0.07, 0.70, 0.78);
    }
    /* the engine deck: a raised access panel, the grille and the team marking */
    box(B.paint, -2.95, -0.95, -0.72, 0.72, 1.40, 1.418);
    box(B.dark, -2.80, -1.80, -0.60, 0.60, 1.40, 1.42);
    for (i = 0; i < 5; i++) box(B.paint, -2.75 + i * 0.20, -2.69 + i * 0.20, -0.58, 0.58, 1.42, 1.442);
    box(B.team, -1.60, -1.00, -0.70, 0.70, 1.418, 1.430);

    /* running gear, both sides: the flat track (no return rollers), raised sprocket, low idler */
    var path = [[1.95, 0.035], [-2.25, 0.035], [-2.60, 0.34], [-2.32, 0.665], [-1.46, 0.78], [1.50, 0.78],
                [2.50, 0.935], [2.855, 0.60], [2.70, 0.33]];
    for (s = -1; s <= 1; s += 2) {
      var yc = s * SH.TY, ya = yc - 0.265, yb = yc + 0.265;
      for (i = 0; i < path.length; i++) {
        var p = path[i], q = path[(i + 1) % path.length];
        belt(B.track, p[0], p[1], q[0], q[1], ya, yb, 0.07);
      }
      for (i = 0; i < 28; i++) {                 /* the track-block ribs on the lower run */
        var rx = -2.20 + i * 0.148;
        box(B.track, rx, rx + 0.07, s > 0 ? yb : ya - 0.01, s > 0 ? yb + 0.01 : ya, 0.0, 0.10);
      }
      cylY(B.dark, -2.30, yc - 0.20, yc + 0.20, 0.35, 0.28, 20);          /* the idler */
      cylY(B.dark, -2.30, yc - 0.23, yc + 0.23, 0.35, 0.13, 12);
      cylY(B.dark, 2.52, yc - 0.20, yc + 0.20, 0.60, 0.30, 20);          /* the raised sprocket */
      cylY(B.dark, 2.52, yc - 0.24, yc + 0.24, 0.60, 0.13, 12);
      for (i = 0; i < 12; i++) {
        var ta = i / 12 * TAU, tx = 2.52 + Math.cos(ta) * 0.32, tz = 0.60 + Math.sin(ta) * 0.32;
        box(B.dark, tx - 0.04, tx + 0.04, yc - 0.17, yc + 0.17, tz - 0.04, tz + 0.04);
      }
    }
    /* road wheels: one node per station so the engine spins both of the pair */
    for (i = 0; i < SH.XW.length; i++) roadWheel(WB[i], SH.TY, SH.RW, 0.17, 0.19, 0.05, 20);
  }

  /* turret: origin on the ring centre, z = 0 on the hull deck, gun along +X */
  function addSheridanTurret(V, TB) {
    var P = TB.paint, D = TB.dark, G = TB.glass, T = TB.team, i, s, k, a;
    /* the low mushroom: round flare at the ring, a sloped flank, a flat roof at 0.86 */
    ovalStack(P, [oval(0.05, 0, 1.04, 0.97, -0.03, 22, 0.9), oval(0.05, 0, 1.04, 0.97, 0.28, 22, 0.9),
                  oval(0.10, 0, 0.92, 0.84, 0.60, 22, 0.9), oval(0.15, 0, 0.74, 0.62, 0.86, 22, 0.9)]);
    var gz = SH.GZ;
    /* the mantlet casting, the round collar and the gun: sleeve, tube, muzzle ring (muzzle at world x 4.37) */
    hexa(P, [[0.80, -0.46, 0.14], [1.28, -0.46, 0.14], [1.28, 0.46, 0.14], [0.80, 0.46, 0.14],
             [0.80, -0.38, 0.72], [1.22, -0.38, 0.72], [1.22, 0.38, 0.72], [0.80, 0.38, 0.72]]);
    cylX(P, 1.20, 1.36, 0, gz, 0.27, 16);
    cylX(D, 1.30, 1.95, 0, gz, 0.19, 14);
    cyl(D, [1.95, 0, gz], [3.90, 0, gz], 0.14, 0.115, 14);
    cylX(D, 3.88, 4.02, 0, gz, 0.13, 14);
    cylX(D, 1.34, 1.52, 0.27, gz - 0.06, 0.022, 6);                 /* the coaxial machine gun */

    /* the sight housing on the right front of the roof.  The early M551 carries the
       small box, the M551A1 (TTS) the large one with its window on the front face */
    if (V.tts) {
      box(P, 0.28, 0.92, -0.56, -0.12, 0.70, 1.12);
      box(G, 0.92, 0.945, -0.50, -0.20, 0.88, 1.04);
      box(D, 0.40, 0.78, -0.50, -0.18, 1.12, 1.135);                 /* the hinged cover, dark seam round it */
      box(P, 0.43, 0.75, -0.47, -0.21, 1.135, 1.150);
    } else {
      box(P, 0.45, 0.90, -0.46, -0.14, 0.70, 0.98);
      box(G, 0.90, 0.915, -0.40, -0.20, 0.80, 0.92);
    }

    /* smoke dischargers on the front corners: four a side on both guises, as a 2 x 2 block */
    var cols = 2, ela = 0.50;
    for (s = -1; s <= 1; s += 2) {
      box(D, 0.62, 0.84, s > 0 ? 0.60 : -0.80, s > 0 ? 0.80 : -0.60, 0.34, 0.66);
      for (k = 0; k < V.smoke; k++) {
        var cc = k % cols, rr = (k / cols) | 0;
        var yy = s * 0.70 + (cc - (cols - 1) / 2) * 0.09, zz = 0.50 + rr * 0.12;
        cyl(D, [0.80, yy, zz], [0.80 + 0.30 * Math.cos(ela), yy, zz + 0.30 * Math.sin(ela)], 0.038, 0.038, 8);
      }
    }

    /* the commander's cupola, right rear, and its .50 under the three-plate shield */
    var cx = -0.30, cy = -0.40;
    cylZ(P, cx, cy, 0.50, 1.00, 0.31, 16);
    cylZ(D, cx, cy, 1.00, 1.04, 0.25, 14);
    for (i = 0; i < 6; i++) {
      a = i / 6 * TAU + 0.52;
      box(G, cx + Math.cos(a) * 0.31 - 0.04, cx + Math.cos(a) * 0.31 + 0.04,
          cy + Math.sin(a) * 0.31 - 0.04, cy + Math.sin(a) * 0.31 + 0.04, 0.84, 0.94);
    }
    /* the shield plates stand on the flank round the cupola, so their feet go down into it */
    box(P, cx - 0.52, cx - 0.48, cy - 0.44, cy + 0.44, 0.52, 1.40);          /* rear plate */
    box(P, cx - 0.52, cx + 0.14, cy - 0.46, cy - 0.42, 0.52, 1.40);          /* right plate */
    box(P, cx - 0.52, cx + 0.14, cy + 0.42, cy + 0.46, 0.52, 1.40);          /* left plate */
    cylZ(D, cx + 0.06, cy, 1.04, 1.18, 0.035, 6);                            /* the pintle post */
    var el = 0.30, ce = Math.cos(el), se = Math.sin(el), M0 = [cx + 0.06, cy, 1.20];
    cyl(D, [M0[0] - 0.30 * ce, M0[1], M0[2] - 0.30 * se], [M0[0] + 0.10 * ce, M0[1], M0[2] + 0.10 * se], 0.06, 0.06, 8);
    cyl(D, [M0[0] + 0.10 * ce, M0[1], M0[2] + 0.10 * se], [M0[0] + 1.15 * ce, M0[1], M0[2] + 1.15 * se], 0.022, 0.022, 6);

    /* the loader's hatch, left rear */
    cylZ(P, -0.36, 0.40, 0.52, 0.92, 0.23, 14);
    cylZ(D, -0.36, 0.40, 0.92, 0.95, 0.18, 12);
    /* the A1 carries the canvas-covered stowage box behind the loader */
    if (V.tarp) box(P, -0.96, -0.56, 0.12, 0.62, 0.40, 0.84);
    /* team panel on the roof, front left, facing up */
    box(T, 0.02, 0.50, 0.12, 0.54, 0.86, 0.872);
  }

  /* ================================================================ SCORPION */
  /* hull 4.55 m (x -2.275 .. +2.275), 2.57 m over the fenders; muzzle at x 3.565 */
  var SC = {
    XW: [-1.20, -0.40, 0.40, 1.20], ZW: 0.435, RW: 0.37, TY: 1.065, HW: 2.275,
    GZ: 1.76, MUZ: 3.565
  };

  function addScorpionHull(V, B, WB) {
    var HL = SC.HW, i, s, k;
    /* the lower tub: straight sides, the deck at 1.14, the long front slope to the nose */
    var stn = [
      { x: -HL,  zB: 0.34, zT: 1.14, w: 0.86 },
      { x: 1.05, zB: 0.32, zT: 1.14, w: 0.86 },
      { x: 2.08, zB: 0.36, zT: 0.84, w: 0.88 },
      { x: HL,   zB: 0.46, zT: 0.74, w: 0.90 }
    ];
    var rings = stn.map(function (S) {
      return [[S.x, S.w - 0.10, S.zB], [S.x, S.w, S.zB + 0.10], [S.x, S.w, S.zT], [S.x, -S.w, S.zT],
              [S.x, -S.w, S.zB + 0.10], [S.x, -(S.w - 0.10), S.zB]];
    });
    loftRings(B.paint, rings, [[0, 1, 2, 3, 4, 5]]);

    /* fenders over the tracks: flat plates, and the "wings" dropping at the front */
    var wb = Math.atan2(0.28, 0.80), cw = Math.cos(wb), sw = Math.sin(wb);
    for (s = -1; s <= 1; s += 2) {
      var y0 = s > 0 ? 0.86 : -1.285, y1 = s > 0 ? 1.285 : -0.86;
      box(B.paint, -2.20, 1.50, y0, y1, 0.97, 1.01);
      planeBox(B.paint, [1.50, 0, 1.01], [cw, 0, -sw], [0, 1, 0], [sw, 0, cw], 0.0, 0.83, y0, y1, -0.04, 0.0);
      box(B.dark, -2.20, 1.50, s > 0 ? 1.265 : -1.285, s > 0 ? 1.285 : -1.265, 1.01, 1.05);   /* the rolled edge */
    }

    /* the front slope: grille panels over the engine, the lamps, the tow shackles */
    var phi = Math.atan2(0.30, 1.03), cp = Math.cos(phi), sp = Math.sin(phi);
    var P0 = [2.08, 0, 0.84], U = [-cp, 0, sp], W = [0, 1, 0], N = [sp, 0, cp];
    function gb(bin, u0, u1, w0, w1, h0, h1) { planeBox(bin, P0, U, W, N, u0, u1, w0, w1, h0, h1); }
    for (s = -1; s <= 1; s += 2) {
      var g0 = s > 0 ? 0.14 : -0.80, g1 = s > 0 ? 0.80 : -0.14;
      gb(B.dark, 0.14, 0.98, g0, g1, 0.0, 0.03);
      for (i = 0; i < 6; i++) gb(B.paint, 0.20 + i * 0.13, 0.25 + i * 0.13, g0 + 0.02, g1 - 0.02, 0.03, 0.05);
      cylX(B.dark, 2.14, 2.26, s * 0.78, 0.80, 0.075, 10);                /* the lamp, with its guard */
      cylX(B.glass, 2.26, 2.28, s * 0.78, 0.80, 0.058, 10);
      box(B.dark, 2.275, 2.34, s * 0.45 - 0.07, s * 0.45 + 0.07, 0.52, 0.60);
    }
    gb(B.team, 1.10, 1.50, -0.08, 0.08, 0.03, 0.042);

    /* the open fighting compartment: rear locker, the two side lockers, the dark floor and seats */
    box(B.paint, -2.05, -1.70, -0.85, 0.85, 1.14, 1.55);
    box(B.dark, -1.70, 0.55, -0.60, 0.60, 1.13, 1.15);
    box(B.dark, -1.55, -1.25, -0.60, -0.20, 1.15, 1.40);
    box(B.dark, -1.55, -1.25, 0.20, 0.60, 1.15, 1.40);
    for (s = -1; s <= 1; s += 2) {
      box(B.paint, -1.70, 0.25, s > 0 ? 0.55 : -0.92, s > 0 ? 0.92 : -0.55, 1.14, 1.52);
      for (i = 0; i < 2; i++) cylY(B.dark, -1.15 + i * 0.75, s * 0.92, s * 0.94, 1.33, 0.07, 10);
    }
    box(B.team, -1.68, -1.10, -0.40, 0.40, 1.55, 1.562);                   /* rear locker top */

    /* the gun shield: a boxy hood on the pedestal, front face leaning back, windows in the cheeks */
    var xf = function (z) { return 0.60 - 0.18 * (z - 1.14) / 0.91; };
    hexa(B.paint, [[-0.55, -0.58, 1.14], [0.60, -0.58, 1.14], [0.60, 0.58, 1.14], [-0.55, 0.58, 1.14],
                   [-0.45, -0.50, 2.05], [0.42, -0.50, 2.05], [0.42, 0.50, 2.05], [-0.45, 0.50, 2.05]]);
    hexa(B.dark, [[-0.556, -0.46, 1.18], [-0.50, -0.46, 1.18], [-0.50, 0.46, 1.18], [-0.556, 0.46, 1.18],
                  [-0.468, -0.46, 1.98], [-0.42, -0.46, 1.98], [-0.42, 0.46, 1.98], [-0.468, 0.46, 1.98]]);   /* the open back, dark inside, flush with the leaning rear face */
    for (s = -1; s <= 1; s += 2) box(B.glass, 0.02, 0.36, s * 0.53, s * 0.545, 1.62, 1.90);
    cylX(B.dark, xf(SC.GZ) - 0.02, xf(SC.GZ) + 0.03, 0, SC.GZ, 0.21, 14);  /* the gun port */
    box(B.team, -0.30, 0.30, -0.36, 0.36, 2.05, 2.062);                    /* shield roof */

    /* the 90 mm M54: tube from the shield to the muzzle, the recoil cylinder above it */
    cyl(B.dark, [0.45, 0, SC.GZ], [SC.MUZ - 0.15, 0, SC.GZ], 0.095, 0.072, 12);
    cylX(B.dark, SC.MUZ - 0.17, SC.MUZ, 0, SC.GZ, 0.100, 12);
    cylX(B.dark, -0.20, 1.15, 0, 1.94, 0.07, 10);

    /* the A-frame travel lock: two legs from the front slope to a saddle under the tube */
    for (s = -1; s <= 1; s += 2) {
      cyl(B.dark, [1.70, s * 0.55, 0.93], [2.55, s * 0.06, SC.GZ - 0.09], 0.022, 0.022, 6);
    }
    cyl(B.dark, [1.98, -0.38, 1.13], [1.98, 0.38, 1.13], 0.018, 0.018, 6);
    box(B.dark, 2.49, 2.61, -0.10, 0.10, SC.GZ - 0.13, SC.GZ - 0.075);

    /* running gear, both sides: four big tyred wheels, front sprocket, rear idler, no return rollers */
    var path = [[1.45, 0.0325], [-1.95, 0.0325], [-2.30, 0.385], [-1.95, 0.738], [-1.20, 0.8375],
                [1.20, 0.8375], [1.95, 0.8125], [2.26, 0.50], [2.05, 0.19]];
    for (s = -1; s <= 1; s += 2) {
      var yc = s * SC.TY, ya = yc - 0.21, yb = yc + 0.21;
      for (i = 0; i < path.length; i++) {
        var p = path[i], q = path[(i + 1) % path.length];
        belt(B.track, p[0], p[1], q[0], q[1], ya, yb, 0.065);
      }
      for (i = 0; i < 26; i++) {
        var rx = -1.95 + i * 0.13;
        box(B.track, rx, rx + 0.06, s > 0 ? yb : ya - 0.01, s > 0 ? yb + 0.01 : ya, 0.0, 0.09);
      }
      cylY(B.dark, -1.95, yc - 0.17, yc + 0.17, 0.385, 0.32, 20);         /* the idler */
      cylY(B.dark, -1.95, yc - 0.20, yc + 0.20, 0.385, 0.14, 12);
      cylY(B.dark, 1.95, yc - 0.17, yc + 0.17, 0.50, 0.28, 20);           /* the sprocket */
      cylY(B.dark, 1.95, yc - 0.20, yc + 0.20, 0.50, 0.12, 12);
      for (i = 0; i < 11; i++) {
        var ta = i / 11 * TAU, tx = 1.95 + Math.cos(ta) * 0.29, tz = 0.50 + Math.sin(ta) * 0.29;
        box(B.dark, tx - 0.035, tx + 0.035, yc - 0.15, yc + 0.15, tz - 0.035, tz + 0.035);
      }
    }
    for (i = 0; i < SC.XW.length; i++) roadWheel(WB[i], SC.TY, SC.RW, 0.20, 0.15, 0.03, 30);
  }

  /* --------------------------------------------------------------- build */
  function build(THREE, M, C, which) {
    var V = VARIANTS[which] || VARIANTS.A1, T = materials(THREE, C, V), g = new THREE.Group();
    var HB = bins(T, V), WB = [], TB, i, wg, tg, tab, nW;
    if (V.kind === "scorpion") {
      nW = SC.XW.length;
      for (i = 0; i < nW; i++) WB.push(new Bin(T.dark, false));
      addScorpionHull(V, HB, WB);
      flush(THREE, g, HB);
      for (i = 0; i < nW; i++) {
        wg = new THREE.Group();
        wg.name = "roadwheel";
        wg.position.set(SC.XW[i], 0, SC.ZW);
        flush(THREE, wg, { dark: WB[i] });
        g.add(wg);
      }
      return g;
    }
    nW = SH.XW.length;
    for (i = 0; i < nW; i++) WB.push(new Bin(T.dark, false));
    addSheridanHull(V, HB, WB);
    flush(THREE, g, HB);
    for (i = 0; i < nW; i++) {
      wg = new THREE.Group();
      wg.name = "roadwheel";
      wg.position.set(SH.XW[i], 0, SH.ZW);
      flush(THREE, wg, { dark: WB[i] });
      g.add(wg);
    }
    TB = bins(T, V);
    addSheridanTurret(V, TB);
    tg = new THREE.Group();
    tg.name = "turret";
    tg.position.set(SH.TX, 0, SH.TZ);
    flush(THREE, tg, TB);
    g.add(tg);
    return g;
  }

  return { build: build, variants: VARIANTS };
})();

/* len is the measured X extent of each guise */
UNIT_MODELS["nato_e50_tankdestroyer"] = {
  len: 5.89,
  build: function (THREE, M, C) { return HeroAirborneLight.build(THREE, M, C, "M56"); }
};
UNIT_MODELS["nato_e60_lighttank"] = {
  len: 7.52,
  build: function (THREE, M, C) { return HeroAirborneLight.build(THREE, M, C, "M551"); }
};
UNIT_MODELS["nato_e80_lighttank"] = {
  len: 7.52,
  build: function (THREE, M, C) { return HeroAirborneLight.build(THREE, M, C, "A1"); }
};
