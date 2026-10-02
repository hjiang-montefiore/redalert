/* ================= us_b2_spirit.js  -  HERO MODEL =================
   Northrop Grumman B-2A Spirit, the flying wing. One airframe for both rows:

     nato_e90_stealthbomber  B-2A, e90-e00 (service 1997; first combat Kosovo 1999)
     sbomber_n               B-2A, present day

   The aeroplane did not change outwardly between the two: the same 21 airframes,
   the same dark grey, the same planform. What was added later (stand-off weapons,
   the 14 t GBU-57) rides inside the two weapons bays, whose doors are closed in
   every photograph of an aircraft in transit. So one builder, two registrations.

   References (Wikimedia Commons, each fetched once):
     - "Northrop B-2 3-view line drawing.png" and its 2957 x 2087 redraw
       "NORTHROP B-2-fr.png": plan, front and bottom views dimensioned 52.4 m
       span (172 ft), 21.03 m length (69 ft), 5.18 m height (17 ft). The
       planform below is traced from the high-resolution plan view with a
       silhouette flood-fill and straight-line fits to each edge, then scaled
       to those three published numbers (the drawing is isotropic: 33.6 px/m
       both ways once the outer lobes, not the centre tail, are taken as the
       aft-most points of the 21.03 m). The traced vertices, (half span, metres
       aft of the nose): tip (26.2, 18.2), outer lobe (22.0, 21.05), outer
       notch (13.4, 15.1), inner lobe (7.0, 19.85), inner notch (4.05, 17.85),
       centre tail (0, 20.6). Every edge comes out within 2 deg of +-35 deg to
       the span axis, the design rule of the aeroplane (leading edge and every
       trailing-edge saw-tooth parallel). Read off the same sheet: the
       cockpit glazing as an arc 1.3 m to 4.2 m behind the nose; two serrated
       intake lips at about 6 m, 2.7 m to 5.5 m off the centreline; the
       exhaust troughs over the last third of the chord at the same lateral
       stations; a rectangular slot on the centreline 7 m to 9 m back; the
       weapons bays 5.8 m to 13 m back and about 12.8 m across, closed by a
       run of doors either side of the centreline; the nose gear well 1.4 m to
       5 m back; main gear about 11.4 m back and 6.2 m out, a bogie of two
       tyres in line and two abreast (the side and front views).
     - "B-2A Spirit rear view at RIAT 1999.jpg": the three humps seen from
       behind (cockpit hump tallest, an engine hump 4.6 m either side of it and
       about a metre lower), the wing at the gear about 3.4 m off the ground,
       the belly about 1.9 m up, the two wide dark exhaust slots at the
       trailing edge of the engine humps.
     - "B-2 Spirit of Kansas.jpg": the head-on view on the ramp - nose leg on
       the centreline, the two main gear 12 m apart, the wing sloping away
       to tips lower than the roots, the dark intake slots on the engine humps.
     - "B-2 Spirit Dyess AFB.jpg": the underside plan, the all-dark skin and
       the three-point trailing edge from below.
   Fitted to these: the wing mid-plane stands 2.9 m on its tyres, the cockpit
   hump tops at 5.18 m, the belly hangs 2.1 m up; the four F118 engines are
   buried (two a side, one hump a side, no nacelles); there are no fins, no
   tails, no guns, no pylons. Four glazed panes, no more.

   Checked afterwards, by laying the built top view over the dimensioned plan
   view at 33.4 px/m: trailing edge within 0.13 m rms (0.42 m worst), leading
   edge within 0.15 m. The planform area comes to 490 m2 against the published
   478 m2; the drawing is followed, not the rounded figure. Residuals that are
   left, all inside the scatter of the sources: the line drawing's side and
   front views come out about 12 percent lower than the published 5.18 m, so
   the centre body is fitted to that height and the photographs, and with the
   side view scaled to 5.18 m its silhouette stands up to half a metre above
   this model aft of the cockpit; the engine humps (0.6 m) are a little lower
   than the head-on photograph shows (about 0.8 m); the nose leg stands 3.5 m
   back, where the bottom view puts the well, though the side view draws it
   nearer the nose; the main legs, 6.2 m out and 11.4 m back, are about a
   metre aft of the side view's.

   Model space: +X nose, +Y left, +Z up, real metres; the nose tip is at
   X = 10.5 and every station below is a, metres aft of it. z = 0 is the
   wing's mid-plane, so the tyres touch at z = -2.9.
   Paint: the skin is one dark grey; the intake mouths and exhaust troughs
   are near-black (the troughs are heat-resistant tile); the team flash is a
   strip along each outer wing's upper surface, exactly C.team.
   Everything is baked into one mesh per material before it is returned
   (mergeByMaterial), the gear in a group of its own so the renderer can
   stow it: 7 materials and 7 draw calls.
   ========================================================================= */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroB2 = (function () {
  "use strict";

  var NOSE = 10.5;         /* X of the nose tip                                  */
  var ZMID = 2.9;          /* height of the wing mid-plane over the tyres' contact */
  var HALF = 26.2;         /* half span                                            */
  var TAN = 0.693;         /* leading edge: a = TAN * |y|  (34.7 deg of sweep)      */
  /* the saw-tooth trailing edge, (|y|, a): centre tail, inner notch, inner lobe,
     outer notch, outer lobe, wing tip. The tip is where the leading edge ends. */
  var TEV = [[0, 20.6], [4.05, 17.85], [7.0, 19.85], [13.4, 15.1], [22.0, 21.05], [HALF, TAN * HALF]];
  /* spanwise stations, |y|: every vertex of the planform and every edge of a
     painted region (trough 3.0 to 5.25, team flash 14.5 to 21.0) is on one */
  var STA = [0, 0.75, 1.5, 2.25, 3.0, 3.75, 4.05, 4.5, 5.25, 6.0, 6.75, 7.0, 7.75, 8.75, 9.75, 10.75,
             11.75, 12.75, 13.4, 14.5, 15.5, 16.5, 17.5, 18.5, 19.5, 20.5, 21.0, 22.0, 23.1, 24.2, 25.2, HALF];

  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function smooth(e0, e1, x) { var t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); }
  function rngFor(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  /* ============================================================ planform == */
  function leA(y) { return TAN * Math.abs(y); }
  function teA(y) {
    var ay = Math.abs(y), i;
    for (i = 1; i < TEV.length; i++) {
      if (ay <= TEV[i][0] + 1e-9) {
        var p = TEV[i - 1], q = TEV[i];
        return p[1] + (q[1] - p[1]) * (ay - p[0]) / (q[0] - p[0]);
      }
    }
    return TEV[TEV.length - 1][1];
  }
  function chord(y) { return teA(y) - leA(y); }
  function uOf(a, y) { var c = chord(y); return c < 1e-6 ? 0 : clamp((a - leA(y)) / c, 0, 1); }

  /* ========================================================== the height ==
     z over the tyres, from the plan position (a, y). The wing is a thin
     section 8.5 percent of its local chord with its sharpest part at the
     leading edge, the mid-plane drooping 2.75 cm a metre outboard of 8 m (the
     tips stand 2.4 m up). On it three humps: the cockpit and centre-body
     hump (1.37 m, tallest around 8 m back, which makes 5.18 m overall) and
     an engine hump either side (0.6 m, 4.4 m off the centreline, flat-topped
     from 6 m to 17 m back, so the rear view reads as three humps).
     The exhaust trough takes the engine hump away over the last third of the
     chord, leaving its two side rails standing, so the exhaust runs aft in a
     recess instead of over a bulge.                                        */
  function prof(u) { u = clamp(u, 0, 1); return 2.857 * Math.pow(u, 0.55) * Math.pow(1 - u, 1.1); }
  function zmid(y) { return ZMID - 0.0275 * Math.max(0, Math.abs(y) - 8); }
  function hump(a, y) {
    var ay = Math.abs(y), fe = smooth(0, 2.2, a - leA(y)) * smooth(0, 3.0, teA(y) - a);
    var c = 1.37 * Math.exp(-Math.pow((a - 8.0) / 5.2, 2)) * Math.exp(-Math.pow(y / 2.1, 2));
    var e = 0.60 * Math.exp(-Math.pow((a - 11.5) / 5.3, 4)) * Math.exp(-Math.pow((ay - 4.4) / 1.6, 2));
    return (c + e) * fe;
  }
  function trough(y, u) {
    var ay = Math.abs(y);
    return smooth(2.75, 3.15, ay) * (1 - smooth(5.1, 5.5, ay)) * smooth(0.62, 0.74, u);
  }
  function zTop(a, y) {
    var u = uOf(a, y), t = 0.085 * chord(y);
    return zmid(y) + 0.5 * t * prof(u) + hump(a, y) * (1 - trough(y, u));
  }
  function zBot(a, y) {
    var u = uOf(a, y), t = 0.085 * chord(y);
    return zmid(y) - 0.45 * t * prof(u);
  }

  /* ============================================================== paint ==
     Planar UVs (u = a/32, v = y/32, repeating) so the sheet is the aircraft
     seen from above: the mottle lands on the wing as mottle. Cached at
     module scope: build() runs per key, team and era.                      */
  var SHEETS = {
    top: { base: "#454b50", spots: [["#4b5257", 26, 14, 40], ["#3f4549", 26, 14, 40]], seam: 0.09, seed: 7101 },
    low: { base: "#4a5055", spots: [["#444a4f", 14, 24, 50]], seam: 0.07, seed: 7102 }
  };
  var _sheets = {};
  function blob(g, cx, cy, r, R, S) {
    var n = 12, pts = [], i, ox, oy;
    for (i = 0; i < n; i++) {
      var an = i / n * Math.PI * 2, rr = r * (0.7 + 0.5 * R());
      pts.push([Math.cos(an) * rr * 1.4, Math.sin(an) * rr]);
    }
    for (ox = -S; ox <= S; ox += S) for (oy = -S; oy <= S; oy += S) {
      if (cx + ox + 2 * r < 0 || cx + ox - 2 * r > S || cy + oy + 2 * r < 0 || cy + oy - 2 * r > S) continue;
      g.beginPath();
      g.moveTo(cx + ox + pts[0][0], cy + oy + pts[0][1]);
      for (i = 1; i < n; i++) g.lineTo(cx + ox + pts[i][0], cy + oy + pts[i][1]);
      g.closePath(); g.fill();
    }
  }
  function sheet(THREE, key, P) {
    if (_sheets[key] !== undefined) return _sheets[key];
    var tex = null;
    try {
      var S = 512, cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      var g = cv.getContext("2d"), R = rngFor(P.seed), i, k;
      g.fillStyle = P.base; g.fillRect(0, 0, S, S);
      for (i = 0; i < P.spots.length; i++) {
        g.fillStyle = P.spots[i][0];
        for (k = 0; k < P.spots[i][1]; k++)
          blob(g, R() * S, R() * S, P.spots[i][2] + (P.spots[i][3] - P.spots[i][2]) * R(), R, S);
      }
      /* panel seams every 2.4 m each way: the B-2's panels are big and flush */
      g.strokeStyle = "rgba(0,0,0," + P.seam + ")"; g.lineWidth = 1;
      for (i = 0; i < S; i += 38) {
        g.beginPath(); g.moveTo(i + 0.5, 0); g.lineTo(i + 0.5, S); g.stroke();
        g.beginPath(); g.moveTo(0, i + 0.5); g.lineTo(S, i + 0.5); g.stroke();
      }
      tex = new THREE.CanvasTexture(cv);
      tex.encoding = THREE.sRGBEncoding;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = 4;
    } catch (e) { tex = null; }
    _sheets[key] = tex;
    return tex;
  }

  /* ========================================================== materials ==
     SKIN: the two coats and the team flash. INK: intake mouths, trough
     floors, door lines. GLASS. METAL and TYRE for the gear. Untextured
     values are dark on purpose: this three.js lifts a flat hex two to three
     stops on screen (see js/hero/pact_e90_fighter.js).                     */
  function materials(THREE, C) {
    function coat(which) {
      var t = sheet(THREE, which, SHEETS[which]);
      var m = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.74, metalness: 0.10, side: THREE.DoubleSide });
      if (t) m.map = t; else m.color.set(SHEETS[which].base);
      return m;
    }
    return {
      top: coat("top"),
      low: coat("low"),
      /* exactly C.team, so eraPaint's team test leaves it alone */
      team: new THREE.MeshStandardMaterial({
        color: new THREE.Color((C && C.team !== undefined) ? C.team : 0x3f7fd0),
        roughness: 0.82, metalness: 0.06, side: THREE.DoubleSide }),
      ink: new THREE.MeshStandardMaterial({ color: 0x131517, roughness: 0.92, metalness: 0.05, side: THREE.DoubleSide }),
      glass: new THREE.MeshStandardMaterial({ color: 0x1b262c, roughness: 0.16, metalness: 0.45, side: THREE.DoubleSide }),
      metal: new THREE.MeshStandardMaterial({ color: 0x474d52, roughness: 0.52, metalness: 0.55, side: THREE.DoubleSide }),
      tyre: new THREE.MeshStandardMaterial({ color: 0x070809, roughness: 0.95, metalness: 0.04 })
    };
  }

  /* ========================================================== geometry == */
  function planarUV(THREE, g) {
    var p = g.attributes.position.array, n = p.length / 3, uv = new Float32Array(n * 2), i;
    for (i = 0; i < n; i++) { uv[2 * i] = (NOSE - p[3 * i]) / 32; uv[2 * i + 1] = p[3 * i + 1] / 32; }
    g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  }
  function triArea(p, A, B, C) {
    var ux = p[3 * B] - p[3 * A], uy = p[3 * B + 1] - p[3 * A + 1], uz = p[3 * B + 2] - p[3 * A + 2];
    var vx = p[3 * C] - p[3 * A], vy = p[3 * C + 1] - p[3 * A + 1], vz = p[3 * C + 2] - p[3 * A + 2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    return Math.sqrt(nx * nx + ny * ny + nz * nz) / 2;
  }
  /* turn every triangle of an indexed part so that, summed, they face up
     (up) or down; a sheet is open, so the sign of its area is all there is */
  function facing(pos, idx, up) {
    var s = 0, i;
    for (i = 0; i < idx.length; i += 3) {
      var a = 3 * idx[i], b = 3 * idx[i + 1], c = 3 * idx[i + 2];
      s += (pos[b] - pos[a]) * (pos[c + 1] - pos[a + 1]) - (pos[b + 1] - pos[a + 1]) * (pos[c] - pos[a]);
    }
    if ((s > 0) !== !!up) for (i = 0; i < idx.length; i += 3) { var t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
  }
  /* The skin: stations across the whole span, chord samples from the leading
     edge to the trailing edge at each (clustered at the leading edge, where
     the section is sharpest). Cells are shared out between the coat, the
     trough floor and the team flash by cls(y, u). */
  function skin(THREE, grp, ys, nu, zf, up, cls, T) {
    var ni = ys.length, nj = nu + 1, pos = new Float32Array(ni * nj * 3), i, j, k;
    for (i = 0; i < ni; i++) {
      var y = ys[i], le = leA(y), te = teA(y);
      for (j = 0; j < nj; j++) {
        var u = Math.pow(j / nu, 1.3), a = le + (te - le) * u;
        k = i * nj + j;
        pos[3 * k] = NOSE - a; pos[3 * k + 1] = y; pos[3 * k + 2] = zf(a, y) - ZMID;
      }
    }
    var out = {}, order = [], all = [];
    for (i = 0; i < ni - 1; i++) for (j = 0; j < nu; j++) {
      var A = i * nj + j, B = A + 1, Cc = A + nj, D = Cc + 1;
      var ym = (ys[i] + ys[i + 1]) / 2, um = (Math.pow(j / nu, 1.3) + Math.pow((j + 1) / nu, 1.3)) / 2;
      var key = cls(ym, um);
      if (!out[key]) { out[key] = []; order.push(key); }
      if (triArea(pos, A, B, Cc) > 1e-7) out[key].push(A, B, Cc);
      if (triArea(pos, B, D, Cc) > 1e-7) out[key].push(B, D, Cc);
    }
    for (k = 0; k < order.length; k++) {
      facing(pos, out[order[k]], up);
      for (i = 0; i < out[order[k]].length; i++) all.push(out[order[k]][i]);
    }
    var g0 = new THREE.BufferGeometry();
    g0.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g0.setIndex(all);
    g0.computeVertexNormals();
    planarUV(THREE, g0);
    for (k = 0; k < order.length; k++) {
      var s = new THREE.BufferGeometry();
      s.setAttribute("position", g0.attributes.position);
      s.setAttribute("normal", g0.attributes.normal);
      s.setAttribute("uv", g0.attributes.uv);
      s.setIndex(out[order[k]]);
      grp.add(new THREE.Mesh(s, T[order[k]]));
    }
  }
  /* A strip laid on the skin: y0 to y1 in ny steps, from aF(y) to aB(y) in nr
     rows, dz off the surface (up on the top skin, down under the belly). */
  function patch(THREE, grp, mat, y0, y1, ny, aF, aB, nr, up, dz) {
    var pos = [], idx = [], i, j, nj = nr + 1;
    for (i = 0; i <= ny; i++) {
      var y = y0 + (y1 - y0) * i / ny, af = aF(y), ab = aB(y);
      for (j = 0; j <= nr; j++) {
        var a = af + (ab - af) * j / nr;
        pos.push(NOSE - a, y, (up ? zTop(a, y) + dz : zBot(a, y) - dz) - ZMID);
      }
    }
    for (i = 0; i < ny; i++) for (j = 0; j < nr; j++) {
      var A = i * nj + j, B = A + 1, Cc = A + nj, D = Cc + 1;
      idx.push(A, B, Cc, B, D, Cc);
    }
    facing(pos, idx, up);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    planarUV(THREE, g);
    grp.add(new THREE.Mesh(g, mat));
  }
  function constant(v) { return function () { return v; }; }

  function addSkin(THREE, grp, T) {
    var ys = [], i;
    for (i = STA.length - 1; i > 0; i--) ys.push(-STA[i]);
    for (i = 0; i < STA.length; i++) ys.push(STA[i]);
    skin(THREE, grp, ys, 34, zTop, true, function (y, u) {
      var ay = Math.abs(y);
      if (ay >= 3.0 && ay <= 5.25 && u >= 0.70) return "ink";            /* exhaust trough floor */
      if (ay >= 14.5 && ay <= 21.0 && u >= 0.20 && u <= 0.42) return "team";  /* outer-wing flash */
      return "top";
    }, T);
    skin(THREE, grp, ys, 14, zBot, false, function () { return "low"; }, T);
  }

  /* ========================================================== the details ==
     Glass: the pilots' two forward panes in a V and the two cheek panes
     (the sheet draws the glazing as a black arc 1.3 m to 4.2 m behind the
     nose). Intake mouths: one a side, 2.7 m wide, five saw-teeth on the lip.
     The refuelling slot sits on the centreline behind the cockpit. Under the
     belly: the bays' door lines and the three gear-well doors.             */
  function addDetails(THREE, grp, T) {
    var s, k;
    for (s = -1; s <= 1; s += 2) {
      patch(THREE, grp, T.glass, s * 0.15, s * 1.05, 3,
        function (y) { return 1.55 + 0.55 * Math.abs(y); }, function (y) { return 2.12 + 0.55 * Math.abs(y); }, 2, true, 0.05);
      patch(THREE, grp, T.glass, s * 1.1, s * 1.8, 2,
        function (y) { return 2.2 + 1.9 * (Math.abs(y) - 1.1); }, function (y) { return 2.75 + 1.9 * (Math.abs(y) - 1.1); }, 2, true, 0.05);
      /* the intake: lip teeth 0.54 m apart, 0.3 m deep, mouth 1.2 m behind the tips */
      patch(THREE, grp, T.ink, s * 2.9, s * 5.6, 10,
        function (y) {
          var t = (Math.abs(y) - 2.9) / 0.54, f = t - Math.floor(t);
          return 6.15 - 0.30 * (1 - Math.abs(2 * f - 1));
        }, constant(7.35), 2, true, 0.05);
    }
    patch(THREE, grp, T.ink, -0.45, 0.45, 2, constant(7.0), constant(8.7), 2, true, 0.04);   /* refuelling slot */
    /* under the belly */
    var lines = [[0, 5.9, 13.0], [2.55, 5.9, 13.0], [-2.55, 5.9, 13.0], [4.4, 6.8, 12.2], [-4.4, 6.8, 12.2], [6.4, 8.0, 11.0], [-6.4, 8.0, 11.0]];
    for (k = 0; k < lines.length; k++) {
      (function (L) {
        patch(THREE, grp, T.ink, L[0] - 0.045, L[0] + 0.045, 1, constant(L[1]), constant(L[2]), 3, false, 0.05);
      })(lines[k]);
    }
    patch(THREE, grp, T.ink, -4.4, 4.4, 4, constant(5.86), constant(5.95), 1, false, 0.05);   /* bay front, behind the nose well */
    patch(THREE, grp, T.ink, -0.55, 0.55, 2, constant(1.6), constant(4.6), 3, false, 0.05);   /* nose gear well doors */
    for (s = -1; s <= 1; s += 2)
      patch(THREE, grp, T.ink, s * 5.5, s * 6.9, 2, constant(10.2), constant(12.6), 2, false, 0.05);   /* main gear well doors */
  }

  /* ============================================================= the gear ==
     Nose leg 3.5 m back on the centreline, twin wheels, leaning forward; two
     main legs 11.4 m back and 6.2 m out, each a two-by-two bogie (the side
     view of the sheet shows two tyres in line on a beam). Tyres 0.84 m nose,
     1.1 m main; the lowest opaque point of the aircraft, as the renderer
     wants, at z = -2.9. */
  function strut(THREE, mat, a, b, r, seg) {
    var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 6, 1), mat);
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
    return m;
  }
  function wheel(THREE, mat, r, w, x, y, z) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, 12, 1), mat);   /* axle along Y */
    m.position.set(x, y, z);
    return m;
  }
  function box(THREE, mat, sx, sy, sz, px, py, pz) {
    var m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(px, py, pz);
    return m;
  }
  function addGear(THREE, root, T) {
    var gear = new THREE.Group(), G = -ZMID, s, a0;
    gear.name = "gear";
    function belly(a, y) { return zBot(a, y) - ZMID + 0.12; }
    /* nose leg: top 3.95 m back, axle 3.55 m back, a drag brace behind it */
    gear.add(strut(THREE, T.metal, [NOSE - 3.95, 0, belly(3.95, 0)], [NOSE - 3.55, 0, G + 0.45], 0.1, 8));
    gear.add(strut(THREE, T.metal, [NOSE - 4.6, 0, belly(4.6, 0)], [NOSE - 3.7, 0, G + 1.25], 0.045, 6));
    gear.add(strut(THREE, T.metal, [NOSE - 3.55, -0.2, G + 0.42], [NOSE - 3.55, 0.2, G + 0.42], 0.05, 6));
    gear.add(wheel(THREE, T.tyre, 0.42, 0.28, NOSE - 3.55, -0.24, G + 0.42));
    gear.add(wheel(THREE, T.tyre, 0.42, 0.28, NOSE - 3.55, 0.24, G + 0.42));
    for (s = -1; s <= 1; s += 2) {
      var y0 = s * 6.2, bz = belly(11.4, y0);
      gear.add(strut(THREE, T.metal, [NOSE - 11.4, y0, bz], [NOSE - 11.4, y0, G + 0.9], 0.13, 8));
      gear.add(strut(THREE, T.metal, [NOSE - 10.2, y0, belly(10.2, y0)], [NOSE - 11.4, y0, G + 1.35], 0.05, 6));
      gear.add(strut(THREE, T.metal, [NOSE - 11.4, y0 - s * 1.0, belly(11.4, y0 - s * 1.0)], [NOSE - 11.4, y0, G + 1.5], 0.045, 6));
      gear.add(box(THREE, T.metal, 1.5, 0.14, 0.14, NOSE - 11.4, y0, G + 0.62));
      for (a0 = -1; a0 <= 1; a0 += 2) {
        gear.add(strut(THREE, T.metal, [NOSE - 11.4 - a0 * 0.7, y0 - 0.37, G + 0.55], [NOSE - 11.4 - a0 * 0.7, y0 + 0.37, G + 0.55], 0.06, 6));
        gear.add(wheel(THREE, T.tyre, 0.55, 0.4, NOSE - 11.4 - a0 * 0.7, y0 - 0.27, G + 0.55));
        gear.add(wheel(THREE, T.tyre, 0.55, 0.4, NOSE - 11.4 - a0 * 0.7, y0 + 0.27, G + 0.55));
      }
    }
    root.add(gear);
  }

  /* ===================================================== merge by material ==
     Each mesh costs a draw call, and one more for the shadow pass, per
     aircraft on screen: everything sharing a material becomes one geometry,
     the "gear" group kept a group of its own so the renderer can stow it.
     (The same merge as js/hero/us_b52_stratofortress.js.)                  */
  function mergeByMaterial(THREE, root) {
    var main = { order: [], by: {} }, gear = { order: [], by: {} };
    (function walk(node, pm, inGear) {
      for (var i = 0; i < node.children.length; i++) {
        var c = node.children[i];
        c.updateMatrix();
        var m = pm.clone().multiply(c.matrix);
        var ing = inGear || c.name === "gear";
        if (c.isMesh) {
          var b = ing ? gear : main, key = c.material.uuid;
          if (!b.by[key]) { b.by[key] = { mat: c.material, parts: [] }; b.order.push(key); }
          var geo = c.geometry.index ? c.geometry.toNonIndexed() : c.geometry.clone();
          geo.applyMatrix4(m);
          b.by[key].parts.push(geo);
        } else walk(c, m, ing);
      }
    })(root, new THREE.Matrix4(), false);
    function out(bucket, into) {
      for (var i = 0; i < bucket.order.length; i++) {
        var e = bucket.by[bucket.order[i]], n = 0, k, o = 0;
        for (k = 0; k < e.parts.length; k++) n += e.parts[k].attributes.position.count;
        var P = new Float32Array(n * 3), N = new Float32Array(n * 3), U = new Float32Array(n * 2);
        for (k = 0; k < e.parts.length; k++) {
          var a = e.parts[k].attributes;
          P.set(a.position.array, o * 3);
          N.set(a.normal.array, o * 3);
          if (a.uv) U.set(a.uv.array, o * 2);
          o += a.position.count;
        }
        var geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(P, 3));
        geo.setAttribute("normal", new THREE.BufferAttribute(N, 3));
        geo.setAttribute("uv", new THREE.BufferAttribute(U, 2));
        into.add(new THREE.Mesh(geo, e.mat));
      }
    }
    var res = new THREE.Group();
    out(main, res);
    var gr = new THREE.Group();
    gr.name = "gear";
    out(gear, gr);
    res.add(gr);
    return res;
  }

  /* ============================================================= build == */
  function build(THREE, M, C) {
    var T = materials(THREE, C);
    var g = new THREE.Group();
    addSkin(THREE, g, T);
    addDetails(THREE, g, T);
    addGear(THREE, g, T);
    return mergeByMaterial(THREE, g);
  }

  return { build: build };
})();

/* len: the measured X extent, nose tip to the outer trailing-edge lobes
   (the drawing's 21.03 m is to those, not to the centre tail) */
UNIT_MODELS["nato_e90_stealthbomber"] = {
  len: 21.05,
  build: function (THREE, M, C) { return HeroB2.build(THREE, M, C); }
};
UNIT_MODELS["sbomber_n"] = {
  len: 21.05,
  build: function (THREE, M, C) { return HeroB2.build(THREE, M, C); }
};
