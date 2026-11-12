/* ==================== js/hero/support_naval.js ==========================
   HERO MODELS -- the four shared naval support rows.  Every one of these
   rows is fac:"both" (js/rules.js), so every army fields the same model:
   each build below is a STAND-IN for a cross-army row, drawn as ONE real
   class picked to fit the row's desc, painted a neutral naval grey with no
   hull numbers, names, crests, funnel bands or flags, and C.team in small
   roof strips only.

     minesweeper   "Mine Countermeasures Vessel"   -> Avenger class (MCM-1),
                   US Navy, 1987-.  The row "hunts and destroys sea mines
                   ahead of the fleet": the Avenger is a mine hunter-killer
                   that finds, classifies and destroys moored and bottom
                   mines (en.wikipedia) and also sweeps (the big cable reel
                   and the floats on the quarterdeck), so it does both jobs
                   the row describes.  Chosen over the Hunt class because
                   its photographs here are side-on and scale cleanly.
     navminelayer  "Naval Minelayer" (Mine Transport) -> Vidar class
                   (HNoMS Vidar / Vale, 1977-78; Lithuanian Jotvingis and
                   Latvian Virsaitis since 2003-06).  A purpose-built NATO
                   minelayer whose mines are rolled off the stern on three
                   launching rails (en.wikipedia), still in service, so it
                   reads for every period the row covers.  The German
                   Type 762 Sachsenwald ("Minentransporter") was tried
                   first: its photographs are here but no published length
                   could be reached, so it could not be scaled.
     repair_sea    "Salvage and Repair Tender" -> Safeguard class (ARS-50),
                   US Navy, 1985-.  A salvage and rescue ship that tows
                   cripples, lifts with two booms and mends alongside; the
                   row "repairs friendly ships ... and tops up their bunkers".
     oiler         "Replenishment Oiler", from e50 -> Henry J. Kaiser class
                   (T-AO-187), 1986-.  Chosen over the Cimarron and the
                   Wichita because it serves the longest (still the US
                   fleet oiler) and has the best broadside photographs; the
                   row's e50 start is a game era, not this ship's.

   Load order: none.  The file is self-contained (no other hero module
   draws any of these hulls) and can load anywhere after three.js.

   Model space for all four: +X bow, +Y port, +Z up, metres, WATERLINE at
   z = 0.  Kit (geoOf, box, cyl*, strut, hexa, tprism, polyPrism, ringLoft,
   superRing, bake, dish, latticeMast, boat) copied from js/hero/ru_riga.js;
   the hull section table / lofted shell / deck sheet of ru_riga.js is
   generalised into makeHull() so each ship is one station table.  Every
   static part is baked to one mesh per material; the two rows with a gun
   (minesweeper navgun_57, navminelayer hmg) carry the group named
   "turret", origin on its ring, barrel along +X.  ASCII only.

   Paint (all four): the same neutral naval grey, a shade darker deck, black
   boot topping, red-brown antifouling; working gear the colour it is in the
   photographs (orange salvage pontoons and lifeboats, white floats and
   radomes) because those are equipment, not markings.

   ------------------------------------------------------------------------
   AVENGER (minesweeper)
   Published (en.wikipedia "Avenger-class mine countermeasures ship"):
   224 ft (68.3 m) long, 39 ft (11.9 m) beam, 15 ft (4.6 m) draught,
   1,312 t; 4 diesels, 2 shafts with CP propellers, a bow thruster; "mine
   neutralization system, 4 x .50 caliber machine guns".
   References (Commons, fetched at 1200-1400 px):
     [A1] "USS Avenger MCM-1.jpg" (= the DPLA "Portside view ... RIMPAC
          2004"): port beam, slightly from above, bow left.  Hull stem to
          transom 1140 px = 68.3 m (16.69 px/m).  Stations read off it, d =
          metres aft of the stem head: stem at the waterline d 2.6; the
          hull top 5.3 m over the water at the stem, 4.1 at d 28, 3.7 at d
          54, then a step down to the quarterdeck at 2.7 m from d 54.6 to
          the transom; the 01 deckhouse d 14-50 (roof 7.0 m); the bridge
          block d 14.5-33 (roof 10.0 m, an open flying bridge on it); the
          raked trapezoid stack d 34.2-41.5 at its foot, d 35.4-39.1 at its
          top (15.4 m) with three exhaust cowls; the four-legged lattice
          mast d 19.8-24 from the bridge roof to a platform at 16 m, a
          second platform with the surface radar at 20-21.8 m, the pole to
          30.4 m with yards at 24 and 28.6 m; a white radome d 47.8 (10.5
          m) and a searchlight d 45.5; the big sweep-cable reel d 51.4-55.3
          (centre 5.8 m, 4 m across); two white sweep floats d 58.5-65 on a
          rack; a light davit at the stern; a RHIB slung outboard on the
          port side d 44-49.5; the bow pole at d 3 to about 15.5 m.
     [A2] "Avenger-class ship USS Dextrous (MCM 13).jpg" (from above, port
          bow): the plan - a full, round-bilged hull, the forecastle with
          its windlass and bitts, narrow side decks beside the 01 house, the
          mast's four splayed legs, the reel and floats on the centreline
          of the quarterdeck, a square transom.
     [A3] "US Navy 110429-N-SP676-099 ... USS Avenger (MCM 1) raises the
          orange.jpg" (port bow from near the water): the stem rake, the
          deep forefoot, the house front and the wedge-shaped stack seen end
          on (about 3 m wide at its top), the bow pole and its stays.
   RECOGNITION LIST:
     1. Tall, full hull with a flat sheer and a step down to a low
        quarterdeck aft [A1][A3] - AV_STA.
     2. A forward superstructure in two steps with the bridge at its front
        and the open flying bridge on top [A1][A2][A3].
     3. The four-legged lattice mast with two platforms and a tall pole
        [A1][A2][A3] - latticeMast().
     4. The tall raked trapezoid stack with three cowls [A1][A3].
     5. The quarterdeck sweep gear: the big cable reel and the two white
        floats [A1][A2].
     6. The RHIB on the port side, the radome abaft the stack [A1].
   NOT CONFIRMED: the stack's breadth at its foot (only [A3] shows it end
   on); the underwater body (the keel is drawn at 3.6 m and two skegs and
   rudders to 4.2 m; the published 4.6 m is taken to include the sonar and
   propellers, which no photograph shows); the .50 cal named "turret" is
   put on the forecastle ahead of the house where [A3] shows a round fitting
   - its exact position is not resolved; the starboard side (no photograph
   of it here): the RHIB is drawn on the port side only.  The mine
   neutralisation vehicle and the retractable sonar are not drawn.

   ------------------------------------------------------------------------
   VIDAR (navminelayer)
   Published (en.wikipedia "Vidar-class minelayer", Gardiner/Couhat/Saunders):
   64.8 m overall (60.0 m pp), 12.0 m beam, 4.6 m draught; 1,500 t
   standard, 1,722 t full; two 40 mm Bofors L/70 single mounts, Mistral;
   "320 naval mines on three decks with automatic hoists between the decks
   feeding three mine launching rails ... loaded via hatches forward and
   aft which were served by a crane"; Decca TM 1226 radar, TVT300 optronic
   directors.
   References (Commons):
     [V1] "Jotvingis (N42).jpg": starboard beam, bow right, from near the
          water.  Transom to stem head 1165 px = 64.8 m (17.98 px/m).
          Stations, d aft of the stem head: stem at the waterline d 3.6;
          hull top 7.5 m at the stem, the forecastle bulwark falling to
          5.3 m at d 15, then 5.0 m flat to the square transom; a rubbing
          strake at 2.5 m; the 40 mm on its raised round gun deck d 11-14.5
          at 7.0 m; the 01 house d 15-57 (roof 7.3 m), the 02 d 20-45 (9.7
          m), the 03 d 21-38.6 (12.8 m), the bridge d 21.2-30.5 (roof 15.0
          m, windows 13.3-14.4 m); the mast d 27.8 to 25.5 m with a
          platform at 17.2 m and the radar yard at 19.2 m; radomes d 32.4
          (14.6 m) and d 37.8 (15.4 m); the funnel d 46.7-50.3 (top 13.9 m,
          its top falling forward); the workboat in its davit on the 02
          roof d 37.8-44.7; an orange RHIB aft on the 01 roof d 51.5-56; a
          forecastle crane d 9.4 and an after crane d 60.
     [V2] "N42 Jotvingis.jpg" (from above, starboard bow): the plan - the
          bulwarked forecastle with the crane, windlass and capstans, the
          rounded raised gun deck at the front of the house with the
          shielded 40 mm, the stepped houses, the funnel, the open deck
          aft.
     [V3] "LVNS Virsaitis 5949.JPG" and "Virsaitis (A53).jpg" (port bow and
          port beam): the same profile from the other side, the port
          workboat davit, the funnel.
     [V4] "N42 Jotvingis NOCO2014 01.JPG" (port side alongside): the house
          sides with racks of white life-raft canisters and the funnel.
   NOT CONFIRMED and NOT DRAWN: the three mine-rail exits in the transom
   (no stern photograph was found, so the transom is drawn plain); the
   second 40 mm (Gardiner) - no photograph here shows where it is; the
   Mistral; the underwater body (keel at 4.1 m from the published 4.6 m
   draught; two shafts and rudders as conventional).  The "turret" is the
   forward 40 mm (the row's weapon is "hmg": the Browning on the bridge
   wing seen in Commons "N42 Jotvingis NOCO2014 04 Browning M2.JPG" was not
   fetched, so the gun drawn is the one the photographs show).

   ------------------------------------------------------------------------
   SAFEGUARD (repair_sea)
   Published (en.wikipedia "Safeguard-class rescue and salvage ship"):
   255 ft (77.7 m) o/a, 50 ft (15.2 m) beam, 15 ft 6 in (4.7 m) draught,
   3,282 t full; 4 Caterpillar 399 diesels, two shafts; 68 t bollard pull;
   "two vertical stern rollers ... and two Norman pin rollers"; 2 x Mk 38.
   References (Commons):
     [S1] "US Navy 030606-N-0493B-002 USS Safeguard (ARS 50) passes a Royal
          Thai Navy warship ..." : starboard beam from near the water, bow
          right.  Transom to stem 1084 px = 77.7 m (13.95 px/m).  Stations:
          stem at the waterline d 3.0; the forecastle 6.9 m at the stem,
          6.3 m to its break at d 27; the main deck 5.0 m to d 60; the
          after deck 4.1 m to the transom; the 01 house d 27-50.5 (7.6 m)
          with a boat deck abaft it to d 58; the 02 d 30-47 (10.2 m); the
          bridge d 33-45 (12.8 m, windows 11.0-12.2 m); the exhaust housing
          d 40-44.5 to 18.5 m; the lattice mast at d 39 to a broad yard at
          24-25.5 m, the pole to 29.6 m; the radome d 37.8 at 17.7 m; the
          two orange salvage pontoons d 38.5-45.3 (2.4 m across, centre
          8.6 m) on the starboard side; the forward kingpost d 15.5 to 18.9
          m with its boom stowed aft to d 29.5; the after kingpost d 55.3 to
          22 m and its pole to 34 m; the heavy after boom from d 56 (7.2 m)
          to its head at d 65 (24.2 m); the workboat by the after kingpost.
     [S2] "USS SAFEGUARD (ARS 50), steams off the coast of Kyushu ..." and
          "Uss safeguard.jpg" (starboard bow, from above): the plan - the
          forecastle bulwark, two gooseneck vents, the stepped house, the
          boat on the boat deck outboard of the after kingpost, the long
          open after deck with its rails and the stern rollers.
     [S3] "US Navy 050724-N-4772B-022 ... Java Sea" (starboard bow): the
          wide yard of the lattice mast, the booms rigged, the pontoons.
   NOT CONFIRMED: the port side (all photographs here show the starboard
   side): the pontoons are drawn on the starboard side only; the forecastle
   bulwark is drawn as the hull top; the towing machine under the after
   deck and the beach gear are not drawn; the two Mk 38 are not drawn (the
   row has no weapon and no photograph resolves them).  No group is named
   "turret": repair_sea has weapons:[].

   ------------------------------------------------------------------------
   HENRY J. KAISER (oiler)
   Published (en.wikipedia "Henry J. Kaiser-class replenishment oiler"):
   677 ft (206.3 m) long, 97 ft 5 in (29.7 m) beam, 35 ft (10.7 m)
   maximum draught, 9,500 t light; two Colt-Pielstick diesels, two shafts.
   206.5 m is used (the old model's length; within 0.2 m).
   References (Commons):
     [K1] "USNS Henry J. Kaiser (T-AO-187).jpg" (534 px; starboard beam,
          slightly from above, bow left; hull 470 px = 206.5 m, 2.28
          px/m, read at 3x).  Stations, d aft of the stem: the foremast d
          21; the replenishment kingposts at d 48.5, 61.8, 75, 82.4, 90.7,
          99.5, 108.5 and 118.6; the superstructure d 122-167; the funnel d
          140.5-157.5 at its foot, d 143-155 at its top; the flight deck
          from d 167 to the stern; the covered side passage along the hull
          just under the deck d 18-121.  Heights from it: freeboard 7.3 m
          aft, about 8.5-9.3 amidships; the house roof about 22 m and the
          funnel top 38.7 m over the deck as seen (both read on the far
          edge; corrected for the camera's height to about 18.5 and 34 m).
     [K2] "USNS Laramie T-AO-203.jpg" (from astern, port quarter): the
          height check against the 29.7 m beam - flight deck 5.9 m over the
          water at the transom, house roof about 24-26 m and funnel top
          about 36-40 m over the water.
     [K3] "US Navy 110419-N-GW695-072 ... Henry J. Kaiser (T-AO 187)
          transits the Gulf of Aden.jpg" and "USNS Big Horn (T-AO 198).jpg"
          (port and starboard quarters): the house as a near-full-width
          block stepped back in terraces aft, the bridge on top, the mast
          ahead of the tapered funnel with a radome, the enclosed lifeboats
          in davits on the house side, the transom with the mooring-deck
          openings under the flight deck.
     [K4] "USNS Big Horn T-AO-198.jpg" and "US Navy 040407-N-9851B-001 ...
          Laramie ... alongside the USS Harry S. Truman" (a stitched
          panorama, used for layout only - its ends are compressed): the
          kingposts with their outboard arms and hanging hose bundles on
          both sides, the forecastle and the foremast with its platform.
   NOT CONFIRMED: every height of this ship is an estimate from [K1] and
   [K2] (no line drawing was found and the two disagree by about 10 per
   cent); the kingposts' arms are simplified to one cross-arm and strut a
   side; the hose bundles are drawn at five stations; the underwater body
   (keel at 10.5 m, two shafts, two rudders; no bulb is drawn - none is
   visible); the house windows are a pattern, not a count.  The funnel's
   blue and gold bands are a marking and are left off.
======================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroSupportNaval = (function () {
  "use strict";
  var PI = Math.PI;

  /* ---------------------------------------------------------- textures */
  var TEX = {};
  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function canvasTex(THREE, key, W0, H0, draw) {
    if (TEX[key]) return TEX[key];
    var cv = document.createElement("canvas"); cv.width = W0; cv.height = H0;
    draw(cv.getContext("2d"), W0, H0);
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    TEX[key] = t; return t;
  }
  function hullTex(THREE) {
    return canvasTex(THREE, "sn_hull", 512, 256, function (g, w, h) {
      var R = rng(7101), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.13; g.strokeStyle = "#000000"; g.lineWidth = 1.2;
      for (i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, i * h / 5); g.lineTo(w, i * h / 5); g.stroke(); }
      for (i = 0; i < 5; i++) {
        var xx = i * w / 5 + (i % 2) * 18;
        g.beginPath(); g.moveTo(xx, 0); g.lineTo(xx, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 46; i++) {
        g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff";
        g.fillRect(R() * w, R() * h, 2 + R() * 5, 18 + R() * 80);
      }
      g.globalAlpha = 1;
    });
  }
  function plateTex(THREE) {
    return canvasTex(THREE, "sn_plate", 256, 256, function (g, w, h) {
      var R = rng(7117), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.14; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
      for (i = 1; i < 4; i++) {
        g.beginPath(); g.moveTo(0, i * h / 4); g.lineTo(w, i * h / 4); g.stroke();
        g.beginPath(); g.moveTo(i * w / 4, 0); g.lineTo(i * w / 4, h); g.stroke();
      }
      g.globalAlpha = 0.07;
      for (i = 0; i < 26; i++) {
        g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
        g.fillRect(R() * w, R() * h, 12 + R() * 50, 8 + R() * 30);
      }
      g.globalAlpha = 1;
    });
  }
  function deckTex(THREE) {
    return canvasTex(THREE, "sn_deck", 256, 256, function (g, w, h) {
      var R = rng(7111), i;
      g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
      g.globalAlpha = 0.12; g.strokeStyle = "#000000"; g.lineWidth = 1;
      for (i = 1; i < 8; i++) { g.beginPath(); g.moveTo(0, i * h / 8); g.lineTo(w, i * h / 8); g.stroke(); }
      for (i = 0; i < 3; i++) { g.beginPath(); g.moveTo(i * w / 3 + 30, 0); g.lineTo(i * w / 3 + 30, h); g.stroke(); }
      g.globalAlpha = 0.08;
      for (i = 0; i < 30; i++) { g.fillStyle = R() < 0.6 ? "#000000" : "#ffffff"; g.fillRect(R() * w, R() * h, 20 + R() * 60, 4 + R() * 16); }
      g.globalAlpha = 1;
    });
  }
  function grilleTex(THREE) {
    return canvasTex(THREE, "sn_grille", 128, 128, function (g, w, h) {
      var i;
      g.fillStyle = "#1c1e1f"; g.fillRect(0, 0, w, h);
      g.fillStyle = "#060707";
      for (i = 0; i < 14; i++) g.fillRect(4, 4 + i * 8.8, w - 8, 5);
      g.fillStyle = "#303335"; g.fillRect(w / 2 - 2, 0, 4, h);
    });
  }

  /* neutral naval grey for all four (no navy's exact shade) */
  var PAINT = { hull: 0x8b9196, sup: 0x969ca1, deck: 0x50555a, soot: 0x26292c };
  function makeMats(THREE, C) {
    var team = (C && C.team !== undefined) ? C.team : 0x3f7fd0;
    var skin = function (col, tex, r) {
      return new THREE.MeshStandardMaterial({ color: col, map: tex, roughness: r, metalness: 0.06 });
    };
    var metal = function (col, r, m) {
      return new THREE.MeshStandardMaterial({ color: col, roughness: r, metalness: m, side: THREE.DoubleSide });
    };
    return {
      hull:   skin(PAINT.hull, hullTex(THREE), 0.86),
      boot:   skin(0x0c0d0f, hullTex(THREE), 0.9),
      under:  skin(0x4a1c16, hullTex(THREE), 0.9),
      sup:    skin(PAINT.sup, plateTex(THREE), 0.86),
      deck:   skin(PAINT.deck, deckTex(THREE), 0.95),
      dark:   skin(0xffffff, grilleTex(THREE), 0.9),
      team:   skin(team, plateTex(THREE), 0.84),
      metal:  metal(0x5c636a, 0.52, 0.55),
      soot:   metal(PAINT.soot, 0.7, 0.35),
      gun:    metal(0x3b4146, 0.48, 0.60),
      orange: skin(0xd8551e, plateTex(THREE), 0.7),
      white:  skin(0xe6e8e8, plateTex(THREE), 0.6),
      glass:  new THREE.MeshPhysicalMaterial({ color: 0x05090b, roughness: 0.1, metalness: 0,
                                               transparent: true, opacity: 0.84 })
    };
  }
  function sealMats(M) {
    for (var k in M) if (M.hasOwnProperty(k)) {
      M[k].userData = M[k].userData || {}; M[k].userData._srgbDone = true;
    }
    return M;
  }

  /* ------------------------------------------------------------ helpers */
  function geoOf(THREE, pos, uv, idx) {
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    if (idx) g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  function box(THREE, p, lx, ly, lz, m, x, y, z, rz) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(lx, ly, lz), m);
    b.position.set(x, y, z); if (rz) b.rotation.z = rz; p.add(b); return b;
  }
  function cylZ(THREE, p, rt, rb, h, seg, m, x, y, z) {
    var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1); g.rotateX(PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylX(THREE, p, rt, rb, len, seg, m, x, y, z, open) {
    var g = new THREE.CylinderGeometry(rt, rb, len, seg, 1, !!open); g.rotateZ(-PI / 2);
    var c = new THREE.Mesh(g, m); c.position.set(x, y, z); p.add(c); return c;
  }
  function cylY(THREE, p, r, len, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg, 1), m);
    c.position.set(x, y, z); p.add(c); return c;
  }
  function sphere(THREE, p, r, m, x, y, z) {
    var s = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 8), m);
    s.position.set(x, y, z); p.add(s); return s;
  }
  function strut(THREE, p, m, ax, ay, az, bx, by, bz, r, seg) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, seg || 4, 1, true), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  /* a square-section beam between two points */
  function beam(THREE, p, m, ax, ay, az, bx, by, bz, w) {
    var dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (L < 1e-4) return null;
    var s = new THREE.Mesh(new THREE.BoxGeometry(w, L, w), m);
    s.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
    s.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx, dy, dz).normalize());
    p.add(s); return s;
  }
  /* box with 8 given corners (bottom 0-3, top 4-7, CCW from above) */
  function hexa(THREE, p, m, V) {
    var F = [[0, 3, 2], [0, 2, 1], [4, 5, 6], [4, 6, 7], [0, 1, 5], [0, 5, 4],
             [1, 2, 6], [1, 6, 5], [2, 3, 7], [2, 7, 6], [3, 0, 4], [3, 4, 7]];
    var pos = [], uv = [], i, j, v;
    for (i = 0; i < F.length; i++) for (j = 0; j < 3; j++) {
      v = V[F[i][j]]; pos.push(v[0], v[1], v[2]);
      if (i < 4) uv.push(v[0] * 0.16, v[1] * 0.16);
      else if (i < 8) uv.push(v[0] * 0.16, v[2] * 0.16);
      else uv.push(v[1] * 0.16, v[2] * 0.16);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  /* a box tapering in x and y from bottom (lx0, ly0) to top (lx1, ly1),
     the top centre shifted dx forward of the bottom centre */
  function taper(THREE, p, m, x, y, z0, z1, lx0, ly0, lx1, ly1, dx) {
    var ax = lx0 / 2, ay = ly0 / 2, bx = lx1 / 2, by = ly1 / 2, t = x + (dx || 0);
    return hexa(THREE, p, m, [[x - ax, y - ay, z0], [x + ax, y - ay, z0], [x + ax, y + ay, z0], [x - ax, y + ay, z0],
                              [t - bx, y - by, z1], [t + bx, y - by, z1], [t + bx, y + by, z1], [t - bx, y + by, z1]]);
  }
  /* convex polygon (CCW from above) extruded z0..z1 */
  function polyPrism(THREE, p, m, pts, z0, z1) {
    var pos = [], uv = [], n = pts.length, i, a, b;
    function tri(P, Q, R, side) {
      var v = [P, Q, R], k;
      for (k = 0; k < 3; k++) {
        pos.push(v[k][0], v[k][1], v[k][2]);
        if (side) uv.push(v[k][0] * 0.16 + v[k][1] * 0.16, v[k][2] * 0.16); else uv.push(v[k][0] * 0.16, v[k][1] * 0.16);
      }
    }
    for (i = 1; i < n - 1; i++) {
      tri([pts[0][0], pts[0][1], z1], [pts[i][0], pts[i][1], z1], [pts[i + 1][0], pts[i + 1][1], z1], false);
      tri([pts[0][0], pts[0][1], z0], [pts[i + 1][0], pts[i + 1][1], z0], [pts[i][0], pts[i][1], z0], false);
    }
    for (i = 0; i < n; i++) {
      a = pts[i]; b = pts[(i + 1) % n];
      tri([a[0], a[1], z0], [b[0], b[1], z0], [b[0], b[1], z1], true);
      tri([a[0], a[1], z0], [b[0], b[1], z1], [a[0], a[1], z1], true);
    }
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv), m); p.add(mm); return mm;
  }
  /* a deckhouse: x0 aft, x1 forward, half breadth hw, the forward corners
     chamfered by c */
  function house(THREE, p, m, x0, x1, hw, c, z0, z1) {
    return polyPrism(THREE, p, m, [[x0, -hw], [x1 - c, -hw], [x1, -hw + c], [x1, hw - c], [x1 - c, hw], [x0, hw]], z0, z1);
  }
  /* rings lofted along X (each ring a closed list of [y,z]); capped ends */
  function ringLoft(THREE, p, m, xs, rings, cap) {
    var pos = [], uv = [], idx = [], n = rings[0].length, i, j;
    for (i = 0; i < xs.length; i++) for (j = 0; j < n; j++) {
      pos.push(xs[i], rings[i][j][0], rings[i][j][1]); uv.push(xs[i] * 0.2, j / n);
    }
    for (i = 0; i < xs.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, c = a + n, d = b + n;
      idx.push(a, b, c, b, d, c);
    }
    if (cap) [0, xs.length - 1].forEach(function (i0, e) {
      var c0 = pos.length / 3, k, sy = 0, sz = 0;
      for (k = 0; k < n; k++) { sy += rings[i0][k][0]; sz += rings[i0][k][1]; }
      pos.push(xs[i0], sy / n, sz / n); uv.push(0, 0);
      for (k = 0; k < n; k++) {
        var q = i0 * n + k, r = i0 * n + (k + 1) % n;
        if (e === 0) idx.push(c0, r, q); else idx.push(c0, q, r);
      }
    });
    var mm = new THREE.Mesh(geoOf(THREE, pos, uv, idx), m); p.add(mm); return mm;
  }
  function superRing(w, h, zc, e, n) {
    var r = [], j, t;
    for (j = 0; j < n; j++) {
      t = j / n * PI * 2;
      var c = Math.cos(t), s = Math.sin(t);
      r.push([w * Math.sign(c) * Math.pow(Math.abs(c), e), zc + h * Math.sign(s) * Math.pow(Math.abs(s), e)]);
    }
    return r;
  }
  /* rounded-rectangle rings stacked up Z (a funnel): lv = [[z, cx, hx, hy], ...],
     superellipse exponent e; the top is capped in `capM` */
  function zLoft(THREE, p, m, capM, lv, e, n) {
    var pos = [], uv = [], idx = [], i, j;
    for (i = 0; i < lv.length; i++) for (j = 0; j < n; j++) {
      var t = j / n * PI * 2, c = Math.cos(t), s = Math.sin(t);
      pos.push(lv[i][1] + lv[i][2] * Math.sign(c) * Math.pow(Math.abs(c), e),
               lv[i][3] * Math.sign(s) * Math.pow(Math.abs(s), e), lv[i][0]);
      uv.push(j / n * 4, lv[i][0] / 6);
    }
    for (i = 0; i < lv.length - 1; i++) for (j = 0; j < n; j++) {
      var a = i * n + j, b = i * n + (j + 1) % n, cc = a + n, d = b + n;
      idx.push(a, b, d, a, d, cc);
    }
    p.add(new THREE.Mesh(geoOf(THREE, pos, uv, idx), m));
    var top = lv[lv.length - 1], cp = [], cu = [];
    for (j = 0; j < n; j++) {
      var t0 = j / n * PI * 2, t1 = (j + 1) / n * PI * 2;
      var f = function (t) {
        var c = Math.cos(t), s = Math.sin(t);
        return [top[1] + top[2] * 0.97 * Math.sign(c) * Math.pow(Math.abs(c), e), top[3] * 0.97 * Math.sign(s) * Math.pow(Math.abs(s), e)];
      };
      var A = f(t0), B = f(t1);
      cp.push(top[1], 0, top[0] - 0.1, A[0], A[1], top[0] - 0.1, B[0], B[1], top[0] - 0.1);
      cu.push(0.5, 0.5, 0, 0, 1, 1);
    }
    p.add(new THREE.Mesh(geoOf(THREE, cp, cu), capM));
  }

  /* ---------------------------------------------------------------- hull
     A generalised ru_riga.js hull.  STA rows are
       [d (metres aft of the stem head), deck z at the side, half beam at
        the deck edge, half beam at the waterline, bottom z on the
        centreline, bilge fullness]
     xWL / xST are the stem and the transom at the waterline (d), sternZ the
     transom's bottom edge. */
  function makeHull(L, rows, dWL, dST, sternZ) {
    var H = L / 2, STA = rows.map(function (r) { return [H - r[0], r[1], r[2], r[3], r[4], r[5]]; });
    STA.sort(function (a, b) { return a[0] - b[0]; });
    var XS0 = -H, XS1 = H, XWL = H - dWL, XST = H - dST;
    function pick(x, k) {
      var i;
      if (x <= STA[0][0]) return STA[0][k];
      for (i = 1; i < STA.length; i++) if (x <= STA[i][0]) {
        var a = STA[i - 1], b = STA[i], f = (x - a[0]) / (b[0] - a[0]);
        return a[k] + (b[k] - a[k]) * f;
      }
      return STA[STA.length - 1][k];
    }
    function deckZ(x) { return pick(x, 1); }
    function halfB(x) { return pick(x, 2); }
    var kST = pick(XST, 4);
    function zBot(x) {
      if (x > XWL) return deckZ(XS1) * (x - XWL) / (XS1 - XWL);
      if (x < XST) return kST + (sternZ - kST) * (XST - x) / (XST - XS0);
      return pick(x, 4);
    }
    function W(x, z) {
      var zd = deckZ(x), bd = pick(x, 2), bw = pick(x, 3), zb = zBot(x);
      if (z >= zd) return bd;
      if (z <= zb) return 0;
      if (x > XWL) return bd * Math.pow((z - zb) / (zd - zb), 0.62);
      if (x < XST) {
        var f = (XST - x) / (XST - XS0);
        return bd * Math.pow((z - zb) / (zd - zb), 0.2 + 0.3 * f);
      }
      if (z >= 0) return bw + (bd - bw) * Math.pow(z / zd, 1.5);
      var n = pick(x, 5), t = Math.min(1, z / zb);
      return bw * Math.pow(Math.max(0, 1 - Math.pow(t, n)), 1 / n);
    }
    var XS = null;
    function hullXs() {
      if (XS) return XS;
      var xs = [], x, i, st = L / 42;
      for (x = XS0; x < XS1 - 0.01; x += st) xs.push(x);
      for (i = 0; i < STA.length; i++) xs.push(STA[i][0]);
      for (x = XWL - L * 0.06; x < XS1; x += L / 110) xs.push(x);
      for (x = XS0; x < XST; x += Math.max(0.2, (XST - XS0) / 4)) xs.push(x);
      xs.push(XS1);
      xs.sort(function (a, b) { return a - b; });
      XS = xs.filter(function (v, k) { return k === 0 || v - xs[k - 1] > 0.05; });
      return XS;
    }
    function shellBand(THREE, m, zlo, zhi, rows) {
      var xs = hullXs(), pos = [], uv = [], idx = [], i, j, s, NR = rows + 1;
      for (s = -1; s <= 1; s += 2) {
        var base = pos.length / 3;
        for (i = 0; i < xs.length; i++) {
          var x = xs[i], zb = zBot(x), zd = deckZ(x);
          var a = Math.min(Math.max(zlo, zb), zd), b = Math.min(Math.max(zhi, zb), zd);
          for (j = 0; j < NR; j++) {
            var z = a + (b - a) * j / rows;
            pos.push(x, s * W(x, z), z); uv.push(x / 24, z / 8);
          }
        }
        for (i = 0; i < xs.length - 1; i++) for (j = 0; j < rows; j++) {
          var p0 = base + i * NR + j, p1 = p0 + 1, p2 = p0 + NR, p3 = p2 + 1;
          if (s > 0) idx.push(p0, p1, p2, p1, p3, p2); else idx.push(p0, p2, p1, p1, p2, p3);
        }
      }
      var keep = [];
      for (i = 0; i < idx.length; i += 3) {
        var A = idx[i] * 3, B = idx[i + 1] * 3, Cc = idx[i + 2] * 3;
        var ux = pos[B] - pos[A], uy = pos[B + 1] - pos[A + 1], uz = pos[B + 2] - pos[A + 2];
        var vx = pos[Cc] - pos[A], vy = pos[Cc + 1] - pos[A + 1], vz = pos[Cc + 2] - pos[A + 2];
        var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
        if (cx * cx + cy * cy + cz * cz > 1e-8) keep.push(idx[i], idx[i + 1], idx[i + 2]);
      }
      return new THREE.Mesh(geoOf(THREE, pos, uv, keep), m);
    }
    function deckSheet(THREE, m) {
      var xs = hullXs(), pos = [], uv = [], idx = [], i, j, NC = 4;
      for (i = 0; i < xs.length; i++) {
        var x = xs[i], w = halfB(x), z = deckZ(x);
        for (j = 0; j <= NC; j++) { pos.push(x, w * (1 - 2 * j / NC), z); uv.push(x / 8, (w * (1 - 2 * j / NC)) / 8); }
      }
      for (i = 0; i < xs.length - 1; i++) for (j = 0; j < NC; j++) {
        var a = i * (NC + 1) + j, b = a + 1, c = a + NC + 1, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
      return new THREE.Mesh(geoOf(THREE, pos, uv, idx), m);
    }
    function transom(THREE, g, mHull, mBoot) {
      var x = XS0, zb = zBot(x), zd = deckZ(x), N = 8, j, k;
      var P = { h: [], b: [] }, U = { h: [], b: [] };
      for (j = 0; j < N; j++) {
        var z0 = zb + (zd - zb) * j / N, z1 = zb + (zd - zb) * (j + 1) / N;
        var w0 = W(x + 0.001, z0), w1 = W(x + 0.001, z1), key = z1 <= 0.6 ? "b" : "h";
        P[key].push(x, -w0, z0, x, w1, z1, x, w0, z0, x, -w0, z0, x, -w1, z1, x, w1, z1);
        var L0 = P[key].length;
        for (k = 0; k < 6; k++) U[key].push(P[key][L0 - 18 + k * 3 + 1] / 24, P[key][L0 - 18 + k * 3 + 2] / 8);
      }
      if (P.h.length) g.add(new THREE.Mesh(geoOf(THREE, P.h, U.h), mHull));
      if (P.b.length) g.add(new THREE.Mesh(geoOf(THREE, P.b, U.b), mBoot || mHull));
    }
    function edgeY(x) { return Math.max(0.1, halfB(x) - 0.15); }
    function railRun(THREE, g, T, x0, x1, step, hgt) {
      var n = Math.max(2, Math.round((x1 - x0) / step)), s, i, prev, x, y, z;
      for (s = -1; s <= 1; s += 2) {
        prev = null;
        for (i = 0; i <= n; i++) {
          x = x0 + (x1 - x0) * i / n; y = s * edgeY(x); z = deckZ(x);
          strut(THREE, g, T.metal, x, y, z, x, y, z + hgt, 0.035, 3);
          if (prev) {
            strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.98, x, y, z + hgt * 0.98, 0.022, 3);
            strut(THREE, g, T.metal, prev[0], prev[1], prev[2] + hgt * 0.5, x, y, z + hgt * 0.5, 0.018, 3);
          }
          prev = [x, y, z];
        }
      }
    }
    /* shell, boot topping, deck, transom */
    function shell(THREE, g, T) {
      var top = 0, i;
      for (i = 0; i < STA.length; i++) top = Math.max(top, STA[i][1]);
      g.add(shellBand(THREE, T.under, -20, -0.3, 5));
      g.add(shellBand(THREE, T.boot, -0.3, 0.45, 1));
      g.add(shellBand(THREE, T.hull, 0.45, top + 1, 6));
      transom(THREE, g, T.hull, T.boot);
      g.add(deckSheet(THREE, T.deck));
    }
    return { X: function (d) { return H - d; }, deckZ: deckZ, halfB: halfB, W: W, zBot: zBot,
             edgeY: edgeY, railRun: railRun, shell: shell, XS0: XS0, XS1: XS1 };
  }

  function roofRail(THREE, g, T, pts, z, hgt) {
    var i, k;
    for (i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / 2.6));
      for (k = 0; k <= n; k++) {
        if (i > 0 && k === 0) continue;
        var px = a[0] + (b[0] - a[0]) * k / n, py = a[1] + (b[1] - a[1]) * k / n;
        strut(THREE, g, T.metal, px, py, z, px, py, z + hgt, 0.028, 3);
      }
      strut(THREE, g, T.metal, a[0], a[1], z + hgt, b[0], b[1], z + hgt, 0.02, 3);
    }
  }
  /* rail round a rectangle x0..x1, +-hw at height z */
  function rectRail(THREE, g, T, x0, x1, hw, z) {
    roofRail(THREE, g, T, [[x1, hw], [x0, hw], [x0, -hw], [x1, -hw], [x1, hw]], z, 0.95);
  }
  /* windows in a row on a side face (y = s * yy) or a front face */
  function sideWindows(THREE, g, T, x0, x1, n, yy, z, w, h) {
    var s, i;
    for (s = -1; s <= 1; s += 2) for (i = 0; i < n; i++)
      box(THREE, g, w, 0.06, h, T.dark, x0 + (x1 - x0) * (i + 0.5) / n, s * (yy + 0.02), z);
  }

  /* One mesh per material: bake every mesh under root into merged geometry
     in root's frame. */
  function bake(THREE, root) {
    root.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    var bins = {}, order = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      if (!geo.attributes.normal) geo.computeVertexNormals();
      geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
      var id = o.material.uuid;
      if (!bins[id]) { bins[id] = { m: o.material, P: [], N: [], U: [] }; order.push(id); }
      var b = bins[id], pa = geo.attributes.position.array, na = geo.attributes.normal.array;
      var ua = geo.attributes.uv ? geo.attributes.uv.array : null, i;
      for (i = 0; i < pa.length; i++) { b.P.push(pa[i]); b.N.push(na[i]); }
      for (i = 0; i < pa.length / 3; i++) b.U.push(ua ? ua[i * 2] : 0, ua ? ua[i * 2 + 1] : 0);
    });
    var out = new THREE.Group();
    order.forEach(function (id) {
      var b = bins[id], g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(b.P, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(b.N, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(b.U, 2));
      var me = new THREE.Mesh(g, b.m); me.castShadow = true; me.receiveShadow = true; out.add(me);
    });
    return out;
  }
  function finish(THREE, g, tw) {
    g.updateMatrixWorld(true);
    var root = bake(THREE, g);
    if (tw) {
      var tb = bake(THREE, tw);
      tw.children.slice().forEach(function (c) { tw.remove(c); });
      tb.children.slice().forEach(function (c) { tw.add(c); });
      root.add(tw);
    }
    return root;
  }

  /* ------------------------------------------------------------ fittings */
  function dish(THREE, g, m, rad, x, y, z, tilt) {
    var dg = new THREE.SphereGeometry(rad, 14, 4, 0, PI * 2, 0, PI / 3.4);
    dg.scale(1, 0.4, 1); dg.rotateZ(PI / 2);
    if (tilt) dg.rotateY(-tilt);
    var d = new THREE.Mesh(dg, m); d.position.set(x, y, z); g.add(d); return d;
  }
  /* a radome on a short pedestal from z0 */
  function radome(THREE, g, T, x, y, z0, zc, r) {
    cylZ(THREE, g, r * 0.35, r * 0.45, zc - z0, 8, T.metal, x, y, (z0 + zc) / 2);
    sphere(THREE, g, r, T.white, x, y, zc + r * 0.6);
  }
  /* small boat on chocks: lofted hull and canopy */
  function boat(THREE, g, m, mTop, x, y, z, L, B, canopy) {
    var xs = [], rings = [], i, n = 9;
    for (i = 0; i <= n; i++) {
      var t = i / n, xx = x - L / 2 + L * t;
      var wf = t > 0.65 ? Math.max(0.08, 1 - Math.pow((t - 0.65) / 0.35, 1.6)) : (t < 0.08 ? 0.75 + t * 3 : 1);
      xs.push(xx); rings.push(superRing(B / 2 * wf, B * 0.26, z + B * 0.26, 0.8, 12).map(function (p) { return [p[0] + y, p[1]]; }));
    }
    ringLoft(THREE, g, m, xs, rings, true);
    if (canopy) {
      var cx = [], cr = [];
      for (i = 0; i <= 6; i++) {
        var u = i / 6, xc = x - L * 0.42 + L * 0.8 * u, f = Math.sin(PI * (0.1 + 0.8 * u));
        cx.push(xc); cr.push(superRing(B * 0.46 * (0.6 + 0.4 * f), B * 0.32 * f + 0.05, z + B * 0.5, 0.9, 12).map(function (p) { return [p[0] + y, Math.max(z + B * 0.45, p[1])]; }));
      }
      ringLoft(THREE, g, mTop, cx, cr, true);
    }
  }
  /* four-legged lattice mast tapering to a platform at zt (ru_riga.js) */
  function latticeMast(THREE, g, T, xa, xf, w, z0, xta, xtf, wt, zt, n) {
    var legs = [[xa, -w, xta, -wt], [xf, -w, xtf, -wt], [xf, w, xtf, wt], [xa, w, xta, wt]], i, k;
    n = n || 5;
    function at(L, f) { return [L[0] + (L[2] - L[0]) * f, L[1] + (L[3] - L[1]) * f, z0 + (zt - z0) * f]; }
    for (i = 0; i < 4; i++) {
      var a = at(legs[i], 0), b = at(legs[i], 1);
      strut(THREE, g, T.metal, a[0], a[1], a[2], b[0], b[1], b[2], 0.11, 5);
    }
    for (k = 0; k <= n; k++) {
      var f = k / n;
      for (i = 0; i < 4; i++) {
        var p = at(legs[i], f), q = at(legs[(i + 1) % 4], f);
        strut(THREE, g, T.metal, p[0], p[1], p[2], q[0], q[1], q[2], 0.05, 3);
        if (k < n) {
          var r = at(legs[(i + 1) % 4], (k + 1) / n);
          strut(THREE, g, T.metal, p[0], p[1], p[2], r[0], r[1], r[2], 0.035, 3);
        }
      }
    }
  }
  /* a platform with a rail */
  function platform(THREE, g, T, x, y, z, lx, ly) {
    box(THREE, g, lx, ly, 0.12, T.metal, x, y, z);
    roofRail(THREE, g, T, [[x + lx / 2, y + ly / 2], [x - lx / 2, y + ly / 2], [x - lx / 2, y - ly / 2], [x + lx / 2, y - ly / 2], [x + lx / 2, y + ly / 2]], z + 0.06, 0.8);
  }
  /* bridge windows round the front of a block: front face at xf, half
     breadth hw, chamfer c, window band z0..z1 */
  function bridgeGlass(THREE, g, T, xf, hw, c, z0, z1, sideLen) {
    var zc = (z0 + z1) / 2, h = z1 - z0, s;
    box(THREE, g, 0.07, 2 * (hw - c) - 0.3, h, T.glass, xf + 0.03, 0, zc);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, c * 1.3, 0.07, h, T.glass, xf - c / 2 + 0.02, s * (hw - c / 2 + 0.02), zc, -s * PI / 4);
      if (sideLen) box(THREE, g, sideLen, 0.07, h, T.glass, xf - c - sideLen / 2 - 0.2, s * (hw + 0.03), zc);
    }
  }
  /* shafts on A-brackets, screws, rudders */
  function screws(THREE, g, T, xp, yS, zS, xr, len, rp, rh) {
    var s, i;
    for (s = -1; s <= 1; s += 2) {
      cylX(THREE, g, 0.16, 0.16, len, 8, T.metal, xp + len / 2, s * yS, zS);
      strut(THREE, g, T.metal, xp + 1.6, s * yS, zS, xp + 1.6, s * (yS + 0.4), zS + 1.4, 0.1, 4);
      cylX(THREE, g, 0.22, 0.32, 0.6, 8, T.metal, xp, s * yS, zS);
      for (i = 0; i < 4; i++) {
        var bl = new THREE.Mesh(new THREE.BoxGeometry(0.1, rp * 0.5, rp), T.metal);
        bl.position.set(xp, s * yS, zS); bl.rotation.x = i * PI / 2 + 0.3;
        bl.translateZ(rp * 0.55); bl.rotation.y = 0.45; g.add(bl);
      }
      box(THREE, g, rh * 0.8, 0.16, rh, T.metal, xr, s * yS * 0.9, zS + rh * 0.35);
    }
  }
  /* a pintle .50 cal machine gun, origin on the pedestal foot, along +X */
  function mg50(THREE, g, T) {
    cylZ(THREE, g, 0.12, 0.16, 1.0, 8, T.gun, 0, 0, 0.5);
    box(THREE, g, 0.5, 0.42, 0.06, T.gun, 0.05, 0, 1.0);
    box(THREE, g, 0.95, 0.18, 0.22, T.gun, 0.1, 0, 1.16);
    cylX(THREE, g, 0.025, 0.03, 1.15, 6, T.gun, 1.12, 0, 1.17);
    box(THREE, g, 0.06, 0.55, 0.42, T.gun, 0.42, 0, 1.25);
    box(THREE, g, 0.25, 0.22, 0.16, T.gun, 0.05, 0.2, 1.1);
  }
  /* single 40 mm Bofors L/70 in its rounded shield (Vidar [V2]) */
  function bofors40(THREE, g, T) {
    cylZ(THREE, g, 1.05, 1.15, 0.4, 16, T.sup, 0, 0, 0.2);
    var xs = [-1.45, -1.35, -0.7, 0.2, 0.9, 1.2], rings = [];
    var S = [[0.8, 0.7], [0.95, 0.8], [1.05, 0.85], [1.05, 0.85], [0.95, 0.72], [0.7, 0.5]];
    S.forEach(function (q) { rings.push(superRing(q[0], q[1], 1.15, 0.55, 16)); });
    ringLoft(THREE, g, T.sup, xs, rings, true);
    box(THREE, g, 0.2, 0.36, 0.55, T.dark, 1.15, 0, 1.15);
    var bar = new THREE.Group(); bar.position.set(1.0, 0, 1.15); bar.rotation.y = -0.12;
    cylX(THREE, bar, 0.1, 0.12, 0.7, 8, T.gun, 0.35, 0, 0);
    cylX(THREE, bar, 0.05, 0.06, 2.4, 8, T.gun, 1.85, 0, 0, true);
    cylX(THREE, bar, 0.08, 0.08, 0.35, 8, T.gun, 3.1, 0, 0);
    g.add(bar);
  }
  /* life-raft canisters on a rack, n along X centred on x */
  function raftRack(THREE, g, T, x, y, z, n) {
    var i;
    box(THREE, g, n * 0.75 + 0.2, 0.9, 0.08, T.metal, x, y, z - 0.38);
    for (i = 0; i < n; i++) {
      var c = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.25, 10), T.white);
      c.position.set(x - (n - 1) * 0.375 + i * 0.75, y, z); g.add(c);
    }
  }

  /* ====================================================== AVENGER (MCM) */
  var AV_L = 68.3;
  var AV_STA = [
    /* d,    deck, hbDeck, hbWL, keel, n */
    [0.0,  5.35, 0.12, 0.00,  0.00, 1.2],
    [2.6,  5.18, 1.30, 0.00,  0.00, 1.3],
    [6.0,  4.98, 2.95, 1.60, -1.70, 1.6],
    [12.0, 4.68, 4.50, 3.60, -3.00, 2.0],
    [20.0, 4.35, 5.55, 5.00, -3.45, 2.6],
    [28.0, 4.12, 5.95, 5.45, -3.60, 3.0],
    [45.0, 3.86, 5.95, 5.45, -3.60, 3.0],
    [54.4, 3.70, 5.85, 5.30, -3.40, 3.0],
    [54.7, 2.75, 5.85, 5.30, -3.40, 3.0],
    [62.0, 2.72, 5.65, 4.90, -2.40, 3.2],
    [67.6, 2.70, 5.40, 4.50, -0.40, 3.4],
    [68.3, 2.70, 5.30, 4.40,  0.40, 3.4]
  ];
  function buildAvenger(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C));
    var h = makeHull(AV_L, AV_STA, 2.6, 67.6, 0.4), X = h.X, s, i, x;
    h.shell(THREE, g, T);
    var R01 = 7.0, R02 = 10.0;

    /* 01 deckhouse d 14-50, inset for the narrow side decks [A1][A2] */
    house(THREE, g, T.sup, X(50), X(14), 4.85, 1.4, 3.5, R01);
    sideWindows(THREE, g, T, X(48), X(22), 9, 4.85, 5.6, 0.45, 0.45);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.9, 0.06, 1.8, T.dark, X(30), s * 4.88, 4.9);
    rectRail(THREE, g, T, X(50) + 0.1, X(33) , 4.7, R01);
    /* the bridge block d 14.5-33 and its windows; the flying bridge [A1][A3] */
    house(THREE, g, T.sup, X(33), X(14.5), 4.35, 1.3, R01 - 0.05, R02);
    bridgeGlass(THREE, g, T, X(14.5), 4.35, 1.3, 8.35, 9.35, 3.2);
    sideWindows(THREE, g, T, X(31), X(21), 4, 4.35, 8.8, 0.5, 0.5);
    rectRail(THREE, g, T, X(33) + 0.1, X(14.6), 4.2, R02);
    box(THREE, g, 1.6, 2.2, 1.1, T.sup, X(16.2), 0, R02 + 0.55);
    box(THREE, g, 0.06, 1.9, 0.4, T.glass, X(15.4) + 0.02, 0, R02 + 0.75);

    /* the four-legged lattice mast from the bridge roof, its two platforms,
       the surface radar and the pole [A1][A2][A3] */
    latticeMast(THREE, g, T, X(24.0), X(19.8), 1.9, R02, X(23.2), X(20.6), 1.0, 16.0, 4);
    platform(THREE, g, T, X(21.9), 0, 16.0, 3.4, 2.8);
    latticeMast(THREE, g, T, X(22.7), X(21.1), 0.65, 16.0, X(22.5), X(21.3), 0.45, 20.0, 2);
    platform(THREE, g, T, X(21.9), 0, 20.0, 2.6, 2.4);
    cylZ(THREE, g, 0.18, 0.22, 0.8, 8, T.metal, X(21.6), 0, 20.45);
    box(THREE, g, 0.35, 3.4, 0.32, T.metal, X(21.6), 0, 21.0);
    strut(THREE, g, T.metal, X(22.0), 0, 20.0, X(22.0), 0, 30.4, 0.11, 6);
    box(THREE, g, 0.1, 4.0, 0.1, T.metal, X(22.0), 0, 24.0);
    box(THREE, g, 0.08, 3.0, 0.08, T.metal, X(22.0), 0, 28.6);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, X(22.0), 0, 26.5, X(21.4), s * 1.8, R02 + 0.1, 0.025, 3);

    /* the raked trapezoid stack, its cowls and dark top [A1][A3] */
    hexa(THREE, g, T.sup, [[X(41.5), -2.3, R01 - 0.05], [X(34.2), -2.3, R01 - 0.05], [X(34.2), 2.3, R01 - 0.05], [X(41.5), 2.3, R01 - 0.05],
                           [X(39.1), -1.5, 15.4], [X(35.4), -1.5, 15.4], [X(35.4), 1.5, 15.4], [X(39.1), 1.5, 15.4]]);
    box(THREE, g, 3.5, 2.8, 0.08, T.soot, X(37.25), 0, 15.42);
    for (i = 0; i < 3; i++) {
      var cx = X(36.0 + i * 1.1);
      taper(THREE, g, T.soot, cx, 0, 15.4, 16.4, 0.8, 0.7, 0.45, 0.5, 0.25);
    }
    box(THREE, g, 0.06, 1.2, 1.0, T.dark, X(36.3) + 0.04, 0, 12.4);

    /* abaft the stack: searchlight and radome on posts [A1] */
    cylZ(THREE, g, 0.1, 0.12, 1.6, 6, T.metal, X(45.5), 1.5, R01 + 0.8);
    cylX(THREE, g, 0.35, 0.35, 0.5, 10, T.metal, X(45.5), 1.5, R01 + 1.8);
    radome(THREE, g, T, X(47.8), -1.2, R01, 9.9, 0.75);

    /* the sweep-cable reel on the centreline d 51.4-55.3 [A1][A2] */
    var rx = X(53.35), rz = 5.8;
    for (s = -1; s <= 1; s += 2) {
      cylY(THREE, g, 2.0, 0.12, 22, T.metal, rx, s * 1.3, rz);
      beam(THREE, g, T.sup, rx - 1.5, s * 1.45, 3.7, rx, s * 1.45, rz, 0.3);
      beam(THREE, g, T.sup, rx + 1.5, s * 1.45, 3.7, rx, s * 1.45, rz, 0.3);
    }
    cylY(THREE, g, 1.65, 2.5, 20, T.gun, rx, 0, rz);
    cylY(THREE, g, 0.4, 3.1, 10, T.metal, rx, 0, rz);

    /* quarterdeck: the float rack and the two white sweep floats, the
       stern davit [A1][A2] */
    var qz = h.deckZ(X(60));
    box(THREE, g, X(58.3) - X(65.2), 5.6, 0.15, T.metal, (X(58.3) + X(65.2)) / 2, 0, 4.55);
    for (i = 0; i < 3; i++) for (s = -1; s <= 1; s += 2)
      strut(THREE, g, T.metal, X(58.8 + i * 3), s * 2.6, qz, X(58.8 + i * 3), s * 2.6, 4.5, 0.07, 4);
    for (s = -1; s <= 1; s += 2) {
      var fl = [], fr = [], k;
      for (k = 0; k <= 8; k++) {
        var u = k / 8, fx = X(64.8) + (X(58.8) - X(64.8)) * u;
        var rr = 0.6 * Math.pow(Math.sin(PI * (0.04 + 0.92 * u)), 0.5);
        fl.push(fx); fr.push(superRing(rr, rr, 5.2, 1, 12).map(function (p) { return [p[0] + s * 1.6, p[1]]; }));
      }
      ringLoft(THREE, g, T.white, fl, fr, true);
    }
    strut(THREE, g, T.metal, X(66.6), 4.4, qz, X(67.8), 4.4, 7.3, 0.12, 6);
    strut(THREE, g, T.metal, X(67.8), 4.4, 7.3, X(68.4), 4.4, 6.4, 0.04, 3);
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.18, 0.18, 0.45, 6, T.metal, X(66), s * 4.4, qz + 0.22);

    /* the RHIB slung outboard on the port side, its davit [A1] */
    boat(THREE, g, T.gun, T.gun, X(46.75), 6.45, 2.9, 5.6, 2.0, false);
    strut(THREE, g, T.metal, X(46.75), 4.7, R01, X(46.75), 6.3, R01 + 0.8, 0.09, 5);
    strut(THREE, g, T.metal, X(46.75), 6.3, R01 + 0.8, X(46.75), 6.4, 3.8, 0.02, 3);

    /* forecastle: the bow pole and its stays, the windlass and bitts [A2][A3] */
    strut(THREE, g, T.metal, X(3.0), 0, h.deckZ(X(3.0)), X(3.0), 0, 15.5, 0.08, 5);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, X(3.0), 0, 13.5, X(7.0), s * 2.4, h.deckZ(X(7.0)), 0.02, 3);
    box(THREE, g, 1.5, 2.6, 0.7, T.metal, X(8.0), 0, h.deckZ(X(8.0)) + 0.35);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.42, 0.48, 0.5, 10, T.metal, X(6.0), s * 1.0, h.deckZ(X(6.0)) + 0.25);
      for (i = 0; i < 2; i++) cylZ(THREE, g, 0.15, 0.15, 0.45, 6, T.metal, X(10.5 + i * 0.6), s * 3.6, h.deckZ(X(10.5)) + 0.22);
      box(THREE, g, 1.2, 0.12, 0.9, T.dark, X(3.6), s * (h.W(X(3.6), 3.9) + 0.02), 3.9, -s * 0.25);
    }
    /* scuttles forward */
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 5; i++) {
      x = X(6 + i * 2.0); box(THREE, g, 0.3, 0.06, 0.3, T.dark, x, s * (h.W(x, 3.6) + 0.01), 3.6);
    }

    /* rails: forecastle, 01 side decks, quarterdeck */
    h.railRun(THREE, g, T, X(14.0), X(0.6), 2.6, 1.0);
    h.railRun(THREE, g, T, X(54.4), X(14.0), 3.0, 1.0);
    h.railRun(THREE, g, T, X(68.1), X(54.9), 2.6, 1.0);

    /* underwater: two skegs, shafts, screws and rudders [published 2 shafts] */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 9.0, 0.25, 0.9, T.under, X(58), s * 1.9, -3.3);
    screws(THREE, g, T, X(61.6), 1.9, -3.1, X(64.2), 6.0, 1.0, 2.0);

    /* team strips */
    box(THREE, g, 2.4, 1.2, 0.04, T.team, X(28.0), 0, R02 + 0.03);
    box(THREE, g, 2.2, 1.1, 0.04, T.team, X(44.0), 0, R01 + 0.03);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, X(61.0), 0, 4.65);

    /* trained mount: a pintle .50 cal on the forecastle ahead of the house
       (position NOT CONFIRMED, see header) */
    cylZ(THREE, g, 0.6, 0.7, 0.25, 12, T.sup, X(12.6), 0, h.deckZ(X(12.6)) + 0.1);
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(X(12.6), 0, h.deckZ(X(12.6)) + 0.22); mg50(THREE, tw, T);
    return finish(THREE, g, tw);
  }

  /* ====================================================== VIDAR (minelayer) */
  var VI_L = 64.8;
  var VI_STA = [
    [0.0,  7.50, 0.15, 0.00,  0.00, 1.2],
    [3.6,  7.10, 1.70, 0.00,  0.00, 1.3],
    [7.0,  6.60, 3.70, 2.30, -2.50, 1.6],
    [11.0, 6.00, 5.05, 4.25, -3.70, 2.0],
    [15.0, 5.30, 5.80, 5.40, -4.05, 2.6],
    [20.0, 5.05, 6.00, 5.80, -4.10, 3.0],
    [50.0, 5.00, 6.00, 5.80, -4.10, 3.0],
    [58.0, 5.00, 5.85, 5.40, -3.30, 3.0],
    [64.2, 5.00, 5.45, 4.70, -0.30, 3.2],
    [64.8, 5.00, 5.35, 4.60,  0.40, 3.2]
  ];
  function buildVidar(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C));
    var h = makeHull(VI_L, VI_STA, 3.6, 64.2, 0.4), X = h.X, s, i, x;
    h.shell(THREE, g, T);
    var R01 = 7.3, R02 = 9.7, R03 = 12.8, RBR = 15.0;
    /* rubbing strake [V1][V3] */
    for (s = -1; s <= 1; s += 2) {
      var sx = [], sr = [];
      for (i = 0; i <= 12; i++) {
        x = X(64.6) + (X(8) - X(64.6)) * i / 12; sx.push(x);
        sr.push(superRing(0.07, 0.07, 2.5, 1, 6).map(function (p) { return [p[0] + s * (h.W(x, 2.5) + 0.03), p[1]]; }));
      }
      ringLoft(THREE, g, T.metal, sx, sr, true);
    }

    /* 01 house d 15-57 with the raised round gun deck at its front
       (d 11-14.5, 7.0 m) [V1][V2] */
    house(THREE, g, T.sup, X(57), X(15), 5.25, 0.8, 4.6, R01);
    var gx = X(12.8), gp = [], k;
    for (k = 0; k <= 10; k++) { var a = -PI / 2 + PI * k / 10; gp.push([gx + 1.8 * Math.cos(a), 3.4 * Math.sin(a)]); }
    polyPrism(THREE, g, T.sup, gp.concat([[X(15.2), 3.4], [X(15.2), -3.4]]), 5.0, 7.0);
    roofRail(THREE, g, T, gp, 7.0, 0.9);
    sideWindows(THREE, g, T, X(55), X(17), 12, 5.25, 6.2, 0.4, 0.4);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.9, 0.06, 1.8, T.dark, X(24), s * 5.28, 5.9);
    rectRail(THREE, g, T, X(57) + 0.1, X(45.2), 5.1, R01);
    /* life-raft racks on the 01 deck sides [V4] */
    for (s = -1; s <= 1; s += 2) { raftRack(THREE, g, T, X(33), s * 4.5, R01 + 0.55, 3); raftRack(THREE, g, T, X(41), s * 4.5, R01 + 0.55, 2); }

    /* 02 d 20-45, 03 d 21-38.6, bridge d 21.2-30.5 [V1][V2][V3] */
    house(THREE, g, T.sup, X(45), X(20), 4.6, 0.9, R01 - 0.05, R02);
    sideWindows(THREE, g, T, X(43), X(23), 6, 4.6, 8.6, 0.45, 0.45);
    rectRail(THREE, g, T, X(45) + 0.1, X(38.8), 4.45, R02);
    house(THREE, g, T.sup, X(38.6), X(20.8), 4.0, 1.0, R02 - 0.05, R03);
    sideWindows(THREE, g, T, X(37), X(31), 2, 4.0, 11.3, 0.45, 0.45);
    house(THREE, g, T.sup, X(30.5), X(21.2), 3.8, 1.1, R03 - 0.05, RBR);
    bridgeGlass(THREE, g, T, X(21.2), 3.8, 1.1, 13.3, 14.4, 4.2);
    rectRail(THREE, g, T, X(38.4), X(30.7), 3.85, R03);
    box(THREE, g, 8.0, 6.6, 0.1, T.metal, X(25.85), 0, RBR + 0.05);

    /* the mast from the bridge roof: platform, radar yard, pole [V1][V3] */
    taper(THREE, g, T.sup, X(27.8), 0, RBR, 17.2, 1.2, 1.4, 0.7, 0.8, 0);
    platform(THREE, g, T, X(27.8), 0, 17.2, 2.4, 2.4);
    strut(THREE, g, T.metal, X(27.8), 0, 17.2, X(27.8), 0, 25.5, 0.1, 6);
    box(THREE, g, 3.0, 0.3, 0.28, T.metal, X(27.6), 0, 19.2);
    cylZ(THREE, g, 0.14, 0.14, 0.4, 6, T.metal, X(27.6), 0, 18.95);
    box(THREE, g, 0.08, 2.6, 0.08, T.metal, X(27.8), 0, 22.5);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, X(26.4), s * 0.4, RBR + 0.1, X(27.8), 0, 19.8, 0.05, 4);
    /* the radomes [V1] */
    radome(THREE, g, T, X(32.4), 0, R03, 14.0, 0.5);
    radome(THREE, g, T, X(37.8), 0, R03, 14.6, 0.8);

    /* the funnel d 46.7-50.3, its top falling forward, soot cap [V1][V4] */
    hexa(THREE, g, T.sup, [[X(50.3), -1.5, R01 - 0.05], [X(46.7), -1.5, R01 - 0.05], [X(46.7), 1.5, R01 - 0.05], [X(50.3), 1.5, R01 - 0.05],
                           [X(50.1), -1.35, 13.9], [X(46.9), -1.35, 13.2], [X(46.9), 1.35, 13.2], [X(50.1), 1.35, 13.9]]);
    hexa(THREE, g, T.soot, [[X(50.1), -1.33, 13.88], [X(46.9), -1.33, 13.18], [X(46.9), 1.33, 13.18], [X(50.1), 1.33, 13.88],
                            [X(50.1), -1.33, 13.98], [X(46.9), -1.33, 13.28], [X(46.9), 1.33, 13.28], [X(50.1), 1.33, 13.98]]);

    /* the workboat in its davit on the 02 roof, starboard [V1][V2]; the
       orange RHIB aft on the 01 roof [V1] */
    boat(THREE, g, T.sup, T.sup, X(41.25), -3.0, R02 + 0.6, 6.9, 2.4, true);
    for (i = 0; i < 2; i++) box(THREE, g, 0.4, 2.0, 0.6, T.metal, X(39.5 + i * 3.5), -3.0, R02 + 0.3);
    strut(THREE, g, T.metal, X(41.25), -1.2, R02, X(41.25), -1.4, 12.6, 0.14, 6);
    beam(THREE, g, T.metal, X(41.25), -1.4, 12.6, X(41.25), -3.6, 12.9, 0.22);
    boat(THREE, g, T.orange, T.orange, X(53.75), -1.8, R01 + 0.3, 4.5, 1.8, false);
    for (i = 0; i < 2; i++) box(THREE, g, 0.3, 1.5, 0.35, T.metal, X(52.6 + i * 2.3), -1.8, R01 + 0.17);

    /* the forecastle crane (mines are struck down through the hatches
       forward and aft by a crane [published]), windlass, capstans [V1][V2] */
    var fz = h.deckZ(X(9.4));
    cylZ(THREE, g, 0.4, 0.5, 1.8, 10, T.sup, X(9.4), -2.8, fz + 0.9);
    beam(THREE, g, T.sup, X(9.4), -2.8, fz + 1.7, X(6.6), -2.4, fz + 3.0, 0.32);
    box(THREE, g, 2.2, 2.0, 0.08, T.dark, X(9.0), 1.4, h.deckZ(X(9.0)) + 0.03);
    box(THREE, g, 1.4, 2.4, 0.7, T.metal, X(5.6), 0, h.deckZ(X(5.6)) + 0.35);
    for (s = -1; s <= 1; s += 2) {
      cylZ(THREE, g, 0.35, 0.42, 0.45, 10, T.metal, X(4.0), s * 0.8, h.deckZ(X(4.0)) + 0.22);
      box(THREE, g, 1.0, 0.12, 0.8, T.dark, X(4.2), s * (h.W(X(4.2), 4.6) + 0.02), 4.6, -s * 0.25);
    }
    /* after deck: the after crane and a hatch [V1] */
    cylZ(THREE, g, 0.35, 0.45, 1.6, 10, T.sup, X(60.0), 2.4, 5.8);
    beam(THREE, g, T.sup, X(60.0), 2.4, 6.5, X(57.6), 2.0, 8.0, 0.28);
    box(THREE, g, 3.0, 2.6, 0.08, T.dark, X(61.5), -1.2, 5.04);

    /* rails */
    h.railRun(THREE, g, T, X(57.2), X(15.4), 3.0, 1.0);
    h.railRun(THREE, g, T, X(64.6), X(57.2), 2.4, 1.0);

    /* underwater: two shafts, screws and rudders */
    screws(THREE, g, T, X(58.6), 2.0, -3.0, X(61.6), 7.0, 1.1, 2.2);

    /* team strips */
    box(THREE, g, 2.2, 1.2, 0.04, T.team, X(23.5), 0, RBR + 0.12);
    box(THREE, g, 2.0, 1.1, 0.04, T.team, X(43.0), 0, R02 + 0.03);
    box(THREE, g, 1.8, 1.0, 0.04, T.team, X(62.0), 1.5, 5.04);

    /* trained mount: the 40 mm Bofors on the raised gun deck [V1][V2] */
    var tw = new THREE.Group(); tw.name = "turret";
    tw.position.set(gx, 0, 7.0); bofors40(THREE, tw, T);
    return finish(THREE, g, tw);
  }

  /* ==================================================== SAFEGUARD (ARS) */
  var SG_L = 77.7;
  var SG_STA = [
    [0.0,  6.95, 0.15, 0.00,  0.00, 1.2],
    [3.0,  6.75, 1.90, 0.00,  0.00, 1.3],
    [7.0,  6.55, 4.40, 2.80, -2.60, 1.6],
    [13.0, 6.40, 6.30, 5.30, -3.90, 2.0],
    [20.0, 6.32, 7.30, 6.80, -4.20, 2.6],
    [26.8, 6.30, 7.60, 7.30, -4.30, 3.0],
    [27.1, 5.00, 7.60, 7.35, -4.30, 3.0],
    [60.0, 5.00, 7.55, 7.20, -4.20, 3.0],
    [60.3, 4.10, 7.55, 7.20, -4.20, 3.0],
    [70.0, 4.05, 7.25, 6.50, -3.00, 3.0],
    [76.6, 4.00, 6.70, 5.60, -0.40, 3.2],
    [77.7, 4.00, 6.50, 5.40,  0.60, 3.2]
  ];
  function buildSafeguard(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C));
    var h = makeHull(SG_L, SG_STA, 3.0, 76.6, 0.6), X = h.X, s, i;
    h.shell(THREE, g, T);
    var R01 = 7.6, R02 = 10.2, R03 = 12.8;

    /* 01 house d 27-50.5 and the boat deck abaft it to d 58 [S1][S2] */
    house(THREE, g, T.sup, X(50.5), X(27.1), 6.0, 1.2, 4.8, R01);
    house(THREE, g, T.sup, X(58.0), X(50.6), 4.6, 0.0, 4.8, R01);
    sideWindows(THREE, g, T, X(49), X(29), 8, 6.0, 6.2, 0.45, 0.45);
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.9, 0.06, 1.8, T.dark, X(47.5), s * 6.03, 5.9);
    roofRail(THREE, g, T, [[X(47.2), 5.9], [X(58.0), 4.5], [X(58.0), -4.5], [X(47.2), -5.9]], R01, 0.95);
    /* 02 d 30-47, bridge d 33-45 with its windows and wings [S1][S2] */
    house(THREE, g, T.sup, X(47), X(30), 5.6, 1.2, R01 - 0.05, R02);
    sideWindows(THREE, g, T, X(45), X(32), 6, 5.6, 9.0, 0.5, 0.5);
    house(THREE, g, T.sup, X(45), X(33), 5.0, 1.2, R02 - 0.05, R03);
    bridgeGlass(THREE, g, T, X(33), 5.0, 1.2, 11.0, 12.2, 6.5);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 3.0, 2.4, 0.14, T.sup, X(34.6), s * 6.2, R02 + 0.07);
      box(THREE, g, 3.0, 0.08, 1.0, T.sup, X(34.6), s * 7.38, R02 + 0.55);
    }
    rectRail(THREE, g, T, X(45) + 0.1, X(33.2), 4.9, R03);
    rectRail(THREE, g, T, X(47) + 0.1, X(45.2), 5.5, R02);

    /* exhaust housing d 40-44.5 to 18.5 m with two pipes [S1][S3] */
    taper(THREE, g, T.sup, (X(40) + X(44.5)) / 2, 0, R03 - 0.05, 18.0, 4.5, 4.4, 3.6, 3.2, 0);
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.4, 0.4, 0.9, 10, T.soot, X(42.6), s * 0.8, 18.4);
    /* the lattice mast at its front, the broad yard, the pole [S1][S3] */
    latticeMast(THREE, g, T, X(40.2), X(38.0), 1.4, R03, X(39.6), X(38.6), 0.55, 24.0, 4);
    platform(THREE, g, T, X(39.1), 0, 24.0, 2.4, 2.4);
    box(THREE, g, 0.16, 9.0, 0.16, T.metal, X(39.1), 0, 25.4);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 3; i++) strut(THREE, g, T.metal, X(39.1), s * (1.6 + i * 1.3), 25.4, X(39.1), s * (1.6 + i * 1.3), 24.3, 0.02, 3);
    strut(THREE, g, T.metal, X(39.1), 0, 24.0, X(39.1), 0, 29.6, 0.09, 5);
    radome(THREE, g, T, X(37.4), -1.6, R03, 17.2, 0.9);

    /* the two orange salvage pontoons on the starboard side, on legs to the
       main deck [S1][S2][S3] (port side NOT CONFIRMED) */
    [39.2, 43.0].forEach(function (pd) {
      var px = X(pd), xs = [], rr = [], k;
      for (k = 0; k <= 6; k++) {
        var u = k / 6, r = 1.2 * Math.pow(Math.max(0.05, Math.sin(PI * (0.03 + 0.94 * u))), 0.3);
        xs.push(px - 1.65 + 3.3 * u); rr.push(superRing(r, r, 8.6, 1, 14).map(function (p) { return [p[0] - 6.6, p[1]]; }));
      }
      ringLoft(THREE, g, T.orange, xs, rr, true);
      strut(THREE, g, T.metal, px - 0.9, -6.6, 5.0, px - 0.9, -6.6, 7.5, 0.1, 4);
      strut(THREE, g, T.metal, px + 0.9, -6.6, 5.0, px + 0.9, -6.6, 7.5, 0.1, 4);
    });

    /* the forward kingpost and its boom stowed aft onto the house [S1][S2] */
    var kx = X(15.5), kz = h.deckZ(kx);
    taper(THREE, g, T.sup, kx, 0, kz, 18.9, 0.9, 0.9, 0.55, 0.55, 0);
    box(THREE, g, 0.4, 2.6, 0.3, T.metal, kx, 0, 18.3);
    strut(THREE, g, T.metal, X(16.4), 0, 7.6, X(29.5), 0, 11.3, 0.2, 8);
    strut(THREE, g, T.metal, kx, 0, 18.6, X(29.4), 0, 11.5, 0.03, 3);
    box(THREE, g, 0.6, 1.0, 0.8, T.metal, X(29.6), 0, 10.9);
    /* the two gooseneck vents on the forecastle, starboard [S2] */
    [6.0, 9.0].forEach(function (vd) {
      var vx = X(vd), vz = h.deckZ(vx);
      cylZ(THREE, g, 0.22, 0.22, 2.0, 8, T.sup, vx, -5.0, vz + 1.0);
      cylY(THREE, g, 0.22, 0.6, 8, T.sup, vx, -4.8, vz + 2.0);
      cylZ(THREE, g, 0.24, 0.24, 0.4, 8, T.sup, vx, -4.5, vz + 1.8);
    });
    /* windlass, bitts, the starboard anchor [S1][S2] */
    box(THREE, g, 1.6, 3.2, 0.8, T.metal, X(7.5), 0, h.deckZ(X(7.5)) + 0.4);
    for (s = -1; s <= 1; s += 2) cylZ(THREE, g, 0.45, 0.52, 0.5, 10, T.metal, X(5.2), s * 1.1, h.deckZ(X(5.2)) + 0.25);
    box(THREE, g, 1.3, 0.14, 1.0, T.gun, X(4.0), -(h.W(X(4.0), 4.6) + 0.04), 4.6, 0.25);

    /* the after kingpost on the boat deck, its pole; the heavy after boom
       raised over the after deck with its topping lift [S1][S2][S3] */
    var ax = X(55.3);
    taper(THREE, g, T.sup, ax, 0, R01, 22.0, 1.6, 1.6, 1.1, 1.1, 0);
    strut(THREE, g, T.metal, ax, 0, 22.0, ax, 0, 34.0, 0.12, 6);
    box(THREE, g, 0.4, 3.0, 0.3, T.metal, ax, 0, 21.4);
    strut(THREE, g, T.metal, X(56.0), 0, 7.9, X(65.0), 0, 24.2, 0.32, 8);
    box(THREE, g, 0.9, 0.8, 1.0, T.metal, X(65.2), 0, 23.8);
    for (s = -1; s <= 1; s += 2) strut(THREE, g, T.metal, ax, s * 0.4, 21.8, X(64.8), s * 0.2, 24.3, 0.04, 3);
    strut(THREE, g, T.metal, X(65.1), 0, 23.4, X(65.1), 0, 9.0, 0.03, 3);
    box(THREE, g, 0.7, 0.7, 0.9, T.gun, X(65.1), 0, 8.6);
    /* the workboat on the boat deck outboard of the kingpost [S2] */
    boat(THREE, g, T.sup, T.sup, X(53.8), -2.8, R01 + 0.4, 7.0, 2.5, true);
    for (i = 0; i < 2; i++) box(THREE, g, 0.4, 2.0, 0.45, T.metal, X(52.0 + i * 3.6), -2.8, R01 + 0.22);

    /* the after deck: bulwark, the two vertical stern rollers and the
       Norman pins [S2][published] */
    for (s = -1; s <= 1; s += 2) {
      var bx0 = X(77.4), bx1 = X(60.4), n = 8, k;
      for (k = 0; k < n; k++) {
        var xa = bx0 + (bx1 - bx0) * k / n, xb = bx0 + (bx1 - bx0) * (k + 1) / n;
        var ya = s * (h.halfB(xa) - 0.1), yb = s * (h.halfB(xb) - 0.1);
        hexa(THREE, g, T.hull, s > 0
          ? [[xa, ya - 0.12, 4.0], [xb, yb - 0.12, 4.0], [xb, yb, 4.0], [xa, ya, 4.0], [xa, ya - 0.12, 5.1], [xb, yb - 0.12, 5.1], [xb, yb, 5.1], [xa, ya, 5.1]]
          : [[xb, yb + 0.12, 4.0], [xa, ya + 0.12, 4.0], [xa, ya, 4.0], [xb, yb, 4.0], [xb, yb + 0.12, 5.1], [xa, ya + 0.12, 5.1], [xa, ya, 5.1], [xb, yb, 5.1]]);
      }
      cylZ(THREE, g, 0.35, 0.35, 1.5, 12, T.metal, X(77.1), s * 1.6, 4.75);
      cylZ(THREE, g, 0.22, 0.22, 1.2, 10, T.metal, X(74.0), s * 2.6, 4.6);
      cylZ(THREE, g, 0.2, 0.2, 0.5, 6, T.metal, X(66.0), s * 5.8, 4.3);
      cylZ(THREE, g, 0.2, 0.2, 0.5, 6, T.metal, X(70.5), s * 5.6, 4.3);
    }
    for (s = -1; s <= 1; s += 2) box(THREE, g, 0.2, 4.0, 1.1, T.hull, X(77.55), s * 4.3, 4.55);

    /* rails: forecastle, main deck sides */
    h.railRun(THREE, g, T, X(26.9), X(0.6), 2.8, 1.0);
    h.railRun(THREE, g, T, X(59.9), X(27.3), 3.0, 1.0);

    /* underwater: two shafts, screws, rudders [published two shafts] */
    for (s = -1; s <= 1; s += 2) box(THREE, g, 10.0, 0.25, 0.8, T.under, X(66), s * 2.2, -3.9);
    screws(THREE, g, T, X(69.8), 2.4, -3.2, X(72.8), 7.0, 1.3, 2.4);

    /* team strips */
    box(THREE, g, 2.6, 1.3, 0.04, T.team, X(43.6), 2.2, R03 + 0.12);
    box(THREE, g, 2.4, 1.2, 0.04, T.team, X(70.0), 0, 4.08);
    box(THREE, g, 2.0, 1.0, 0.04, T.team, X(21.0), 0, h.deckZ(X(21)) + 0.03);
    return finish(THREE, g, null);
  }

  /* ================================================ HENRY J. KAISER (T-AO) */
  var HK_L = 206.5;
  var HK_STA = [
    [0.0,   10.6, 0.30,  0.00,   0.0, 1.2],
    [5.5,   10.3, 3.50,  0.00,   0.0, 1.3],
    [12.0,   9.9, 8.20,  5.20,  -7.0, 1.6],
    [22.0,   9.4, 11.8,  9.80, -10.0, 2.2],
    [35.0,   8.9, 14.1, 13.30, -10.5, 2.8],
    [50.0,   8.6, 14.85, 14.60, -10.5, 3.5],
    [165.0,  8.5, 14.85, 14.60, -10.5, 3.5],
    [185.0,  8.5, 14.60, 13.60,  -9.0, 3.0],
    [198.0,  8.5, 13.80, 11.00,  -4.0, 2.8],
    [204.5,  8.5, 13.00,  9.50,  -0.6, 3.0],
    [206.5,  8.5, 12.60,  9.00,   1.5, 3.0]
  ];
  var HK_POSTS = [48.5, 61.8, 75.0, 82.4, 90.7, 99.5, 108.5, 118.6];
  var HK_HOSES = { 61.8: 1, 75.0: 1, 90.7: 1, 99.5: 1, 108.5: 1 };
  function buildKaiser(THREE, M, C) {
    var g = new THREE.Group(), T = sealMats(makeMats(THREE, C));
    var h = makeHull(HK_L, HK_STA, 5.5, 204.5, 1.5), X = h.X, s, i, k, x;
    h.shell(THREE, g, T);
    var RA = 20.5, RB = 26.0, RC = 29.0;

    /* the covered side passage just under the deck d 18-121 [K1][K4] */
    for (s = -1; s <= 1; s += 2) {
      var px = [], pr = [];
      for (k = 0; k <= 16; k++) {
        x = X(121) + (X(18) - X(121)) * k / 16; px.push(x);
        var yy = h.W(x, 7.2) + 0.03;
        pr.push([[s * yy, 6.4], [s * (yy + 0.02), 6.4], [s * (yy + 0.02), 8.0], [s * yy, 8.0]]);
      }
      ringLoft(THREE, g, T.dark, px, pr, true);
      for (k = 0; k < 26; k++) { x = X(22 + k * 3.9); box(THREE, g, 0.3, 0.12, 1.6, T.hull, x, s * (h.W(x, 7.2) + 0.06), 7.2); }
    }

    /* the superstructure, stepped back in terraces aft [K1][K3] */
    house(THREE, g, T.sup, X(167), X(122), 13.6, 1.5, 8.2, RA);
    house(THREE, g, T.sup, X(161), X(122.2), 13.0, 1.5, RA - 0.05, RB);
    house(THREE, g, T.sup, X(147), X(122.4), 11.5, 1.5, RB - 0.05, RC);
    bridgeGlass(THREE, g, T, X(122.4), 11.5, 1.5, 27.0, 28.3, 6.0);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 4.0, 2.0, 0.2, T.sup, X(124.4), s * 14.0, RB + 0.1);
      box(THREE, g, 4.0, 0.1, 1.1, T.sup, X(124.4), s * 14.95, RB + 0.65);
      for (k = 0; k < 4; k++) sideWindows(THREE, g, T, X(164), X(125), 12, 13.6, 10.6 + k * 2.6, 0.7, 0.7);
      sideWindows(THREE, g, T, X(159), X(126), 10, 13.0, 23.0, 0.7, 0.7);
    }
    for (k = 0; k < 4; k++) for (i = 0; i < 8; i++)
      box(THREE, g, 0.06, 0.7, 0.7, T.dark, X(122) + 0.03, -10 + i * 2.85, 11 + k * 2.6);
    rectRail(THREE, g, T, X(167) + 0.1, X(161.2), 13.4, RA);
    rectRail(THREE, g, T, X(161) + 0.1, X(147.2), 12.8, RB);
    rectRail(THREE, g, T, X(147) + 0.1, X(122.6), 11.3, RC);
    /* ladders down the aft terraces [K3] */
    for (s = -1; s <= 1; s += 2) {
      strut(THREE, g, T.metal, X(161.3), s * 9, RB, X(165.0), s * 9, RA, 0.15, 4);
      strut(THREE, g, T.metal, X(167.3), s * 11, RA, X(167.3) - 4.0, s * 11, 8.5, 0.15, 4);
    }

    /* the funnel d 140.5-157.5 on the B roof, tapering to d 143-155 at
       42 m, a dark top; the bands are left off [K1][K3] */
    zLoft(THREE, g, T.sup, T.soot, [[RB - 0.05, X(149.0), 8.5, 4.7], [34.0, X(149.0), 7.4, 4.25], [40.6, X(149.0), 6.2, 3.7]], 0.55, 20);
    zLoft(THREE, g, T.soot, T.dark, [[40.55, X(149.0), 6.22, 3.72], [42.0, X(149.0), 6.0, 3.6]], 0.55, 20);
    /* the mast ahead of the funnel, its platform and radome [K3] */
    cylZ(THREE, g, 0.45, 0.6, 9.0, 8, T.metal, X(137.5), 0, RC + 4.5);
    platform(THREE, g, T, X(137.8), 0, 35.0, 3.0, 4.0);
    box(THREE, g, 0.14, 7.0, 0.14, T.metal, X(137.5), 0, 36.4);
    radome(THREE, g, T, X(137.5), 0, RC + 9.0, 38.6, 0.9);
    box(THREE, g, 0.4, 3.8, 0.3, T.metal, X(136.6), 0, 35.6);
    radome(THREE, g, T, X(163.5), 9.5, RA, 22.2, 0.9);

    /* enclosed lifeboats in davits on the house sides [K3][K4] */
    for (s = -1; s <= 1; s += 2) [129.8, 137.8].forEach(function (bd) {
      boat(THREE, g, T.orange, T.orange, X(bd), s * 15.0, 13.6, 7.6, 2.8, true);
      for (k = -1; k <= 1; k += 2) {
        strut(THREE, g, T.metal, X(bd) + k * 2.6, s * 13.65, 12.6, X(bd) + k * 2.6, s * 15.2, 17.6, 0.15, 4);
      }
      box(THREE, g, 8.0, 0.4, 0.4, T.metal, X(bd), s * 15.1, 17.7);
    });

    /* the replenishment kingposts: a post, a cross-arm out over each side
       with its strut, hose bundles at the fuel stations [K1][K3][K4] */
    HK_POSTS.forEach(function (pd, n) {
      var kx = X(pd), top = (n === 0 || n === 1 || n === 4) ? 26.5 : 24.5;
      taper(THREE, g, T.sup, kx, 0, 8.4, top, 1.5, 1.5, 1.1, 1.1, 0);
      box(THREE, g, 1.5, 3.2, 0.6, T.sup, kx, 0, top - 0.3);
      for (s = -1; s <= 1; s += 2) {
        beam(THREE, g, T.sup, kx, s * 1.4, top - 0.5, kx, s * 10.5, top + 0.6, 0.6);
        beam(THREE, g, T.metal, kx, s * 0.6, top - 7.0, kx, s * 7.5, top + 0.2, 0.28);
        box(THREE, g, 0.8, 0.8, 0.8, T.metal, kx, s * 10.6, top + 0.3);
        if (HK_HOSES[pd]) for (k = 0; k < 3; k++) {
          var hy = s * (6.5 + k * 1.3);
          strut(THREE, g, T.gun, kx + 0.3 * (k - 1), hy, top, kx + 0.3 * (k - 1), hy * 1.05, 11.0, 0.22, 6);
        }
      }
    });

    /* the foremast with its platform; ground tackle [K1][K4] */
    cylZ(THREE, g, 0.35, 0.55, 15.0, 8, T.metal, X(21), 0, h.deckZ(X(21)) + 7.5);
    platform(THREE, g, T, X(21), 0, 22.2, 2.4, 3.2);
    box(THREE, g, 0.12, 5.0, 0.12, T.metal, X(21), 0, 23.6);
    for (s = -1; s <= 1; s += 2) {
      box(THREE, g, 2.4, 2.4, 1.2, T.metal, X(10), s * 2.4, h.deckZ(X(10)) + 0.6);
      box(THREE, g, 2.2, 0.2, 1.8, T.gun, X(7.0), s * (h.W(X(7.0), 7.0) + 0.05), 7.0, -s * 0.3);
      for (k = 0; k < 3; k++) cylZ(THREE, g, 0.3, 0.3, 0.6, 8, T.metal, X(16 + k * 1.2), s * 9.5, h.deckZ(X(16)) + 0.3);
    }

    /* the flight deck from the house to the stern: edge nets; the mooring
       deck openings under it in the transom and quarters [K3] */
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 8; k++) {
        var n0 = X(167.5 + k * 4.85), n1 = X(167.5 + (k + 1) * 4.85);
        beam(THREE, g, T.metal, n0, s * (h.halfB(n0) + 0.45), 8.4, n1, s * (h.halfB(n1) + 0.45), 8.4, 0.08);
        box(THREE, g, 4.8, 0.9, 0.04, T.metal, (n0 + n1) / 2, s * ((h.halfB(n0) + h.halfB(n1)) / 2 + 0.2), 8.45);
      }
      for (k = 0; k < 4; k++) { x = X(190 + k * 4); box(THREE, g, 2.6, 0.08, 1.4, T.dark, x, s * (h.W(x, 6.3) + 0.03), 6.3); }
    }
    for (k = 0; k < 5; k++) box(THREE, g, 0.1, 2.6, 1.6, T.dark, h.XS0 - 0.03, -8.0 + k * 4.0, 6.4);
    box(THREE, g, 0.1, 22.0, 0.15, T.metal, h.XS0 - 0.05, 0, 8.4);

    /* rails: forecastle and deck edges */
    h.railRun(THREE, g, T, X(205.8), X(0.8), 4.5, 1.1);

    /* underwater: two shafts, screws, rudders [published two shafts] */
    screws(THREE, g, T, X(195), 5.0, -7.0, X(199.5), 16.0, 3.0, 6.0);

    /* team strips */
    box(THREE, g, 6.0, 3.0, 0.06, T.team, X(140), 0, RC + 0.05);
    box(THREE, g, 6.0, 3.0, 0.06, T.team, X(195), 0, 8.54);
    box(THREE, g, 5.0, 2.6, 0.06, T.team, X(164), 0, RA + 0.05);
    return finish(THREE, g, null);
  }

  return {
    avenger: buildAvenger, vidar: buildVidar, safeguard: buildSafeguard, kaiser: buildKaiser,
    len: { minesweeper: AV_L, navminelayer: VI_L, repair_sea: SG_L, oiler: HK_L }
  };
})();

/* Registration: len is each class's published length overall. */
UNIT_MODELS["minesweeper"] = { len: 68.3, build: function (THREE, M, C) { return HeroSupportNaval.avenger(THREE, M, C); } };
UNIT_MODELS["navminelayer"] = { len: 64.8, build: function (THREE, M, C) { return HeroSupportNaval.vidar(THREE, M, C); } };
UNIT_MODELS["repair_sea"] = { len: 77.7, build: function (THREE, M, C) { return HeroSupportNaval.safeguard(THREE, M, C); } };
UNIT_MODELS["oiler"] = { len: 206.5, build: function (THREE, M, C) { return HeroSupportNaval.kaiser(THREE, M, C); } };
