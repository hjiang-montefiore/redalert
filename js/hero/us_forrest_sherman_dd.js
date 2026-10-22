/* ============================================================================
   us_forrest_sherman_dd.js -- HERO model: the Forrest Sherman-class destroyer,
   USS Forrest Sherman (DD-931) herself, for nato_e50_destroyer, in her fit as
   built (commissioned 9 November 1955) as the photographs of 1955-58 show her.

   THE FIT, and why. The row is "USS Forrest Sherman (DD-931)", service 1955,
   era e50: the last all-gun US destroyers. Her own record (en.wikipedia,
   USS Forrest Sherman (DD-931), infobox): three 5-inch/54 Mk 42 in single
   mounts, two twin 3-inch/50, two Hedgehogs and "4 single 21-inch tubes
   amidships as built". The class article: one 5-inch forward and two aft;
   the 3-inch and the Hedgehogs went in the 1960s and 1970s, the fixed tubes
   gave way to two triple Mk 32, four ships became DDGs (SCB 240) and eight
   were rebuilt for ASW (SCB 251) - all of that is later and NONE is drawn.

   References (Wikimedia Commons; US Navy, NHHC and HAER):
     d2  HAER WA-210 sheet 2, USS Turner Joy (DD-951), "Forrest Sherman-Class
         Destroyer, 1959", inboard profile, main deck and 01-04 level plans
         with a 407 ft 5 in waterline bar: the sheer, keel, stem, the
         deck-edge plan, the deckhouse outline, the stacks, the gun stations;
     d4  HAER WA-210 sheet 4, midship and typical sections, frames 4, 34, 65,
         82, 102, 113, 138, 153 and 199.5: the station table below;
     p1  DD-931 at Bath, inclining experiment, 28 October 1955, starboard
         beam (as built, light ship): freeboards, the heights of the stacks;
     p2  DD-931 underway c1956, port beam: the profile, the gun positions;
     p3  DD-931 underway c1957, port side: the masts and radars;
     p4  DD-931 underway c1958 from above her starboard bow: the plan, the
         dark weather decks, the forward 01 deck with the 3-inch;
     p5  DD-931 bow on beside USS Willis A. Lee, 1957: the foremast, the
         flare of her bow, the forecastle lifelines;
     p6  DD-931 underway 1962 (NH 54120), starboard bow: her tripods, the
         stack caps, the boat abaft the after stack, the after guns;
     p7  USS Davis (DD-937), July 1957, port bow: the rounded 3-inch tub at
         the fore end of the 01 deck;
     p8  USS Decatur (DD-936), 30 November 1956, port quarter: the after
         director, the aft 3-inch, mounts 52 and 53, the whaleboat davits;
     p9  USS Du Pont (DD-941), 17 May 1957, starboard bow: the foremast with
         the SPS-6 and SPS-10, the after tripod, the bridge front;
     p10 USS Barry (DD-933), 27 July 1956, from above abeam: the stations of
         every gun, stack and mast along the hull (measured, 8.2 px/m).
   Turner Joy is an SCB 85A ship ("modified hurricane bow/anchor
   configuration", directors reversed); her hull lines are the class's and
   are used below, her later deckhouse enlargements are not.
   Published figures: 418 ft (127.4 m) overall, 407 ft (124 m) waterline,
   45 ft (13.7 m) beam, 20 ft (6.1 m) draught as built to the bottom of the
   sonar dome; warship_specs.js has 127.4 x 13.8 m.

   RECOGNITION - what makes her a Forrest Sherman at game zoom:
     1. the flush-decked hull, the long rise of the sheer from amidships to
        a high, raked, strongly flared bow (d2 profile, d4 frames 4 and 34,
        p1, p5), the rounded stern (d2 main deck);
     2. three single 5-inch/54 Mk 42 mounts - the boxy gunhouse with its two
        round sight hoods: 51 on the forecastle, 52 superfiring on the 01
        deck aft, 53 on the main deck at the stern, both aft mounts trained
        aft (p2, p6, p8, p10);
     3. two twin 3-inch/50 Mk 33: one in the rounded tub at the fore end of
        the 01 deck before the bridge, one on the 01 deck abaft the after
        director, pointing aft (p2, p6, p7, p8, d2);
     4. the two tall oval stacks, raked aft, with black caps (p1, p6, p8, p9);
     5. two tripod masts: the foremast just abaft the bridge, its legs
        straddling the forward stack, a broad yard, the SPS-6 air-search
        bedspring on a forward platform and the SPS-10 at the masthead; the
        shorter after tripod forward of the after stack with its yards and a
        small radome can (p3, p5, p6, p8, p9);
     6. the long main-deck deckhouse from the forecastle break to abaft mount
        52, its after end tapered (d2 01-level plan), walkways outboard;
     7. the bridge block: two levels with rounded fronts, round ports in the
        pilot house, an open bridge with the forward gun director (p6, p9);
     8. the after gun director on its own house abaft the after stack (p6,
        p8);
     9. two Hedgehogs on the 01 deck either side of the forward 3-inch (d2,
        "Hedgehogs port and stbd (removed)");
    10. four single 21-inch torpedo tubes amidships (her record), two a side
        on the 01 deck where d2 sites the later tubes;
    11. a 26-ft motor whaleboat in davits each side abaft the after stack
        (p6, p8, p10; d2 "26 ft motor whaleboat" port and starboard).

   Model space: +X bow, +Y port, +Z up, metres, waterline z = 0, keel -4.2,
   sonar dome to -5.9. render3d.js stands the model up with rotation.x =
   -PI/2 and scales it by its measured X extent, so nothing stands past the
   stem or the transom: both after barrels end inside the fantail.

   Paint: 1950s haze grey (5-H). The references are black-and-white, so no
   colour could be sampled off them; the haze grey is the one the accepted
   Spruance hero uses for the same Navy paint, taken to 0.9 of its level
   because the renderer's ACES pass lifts mid greys about 1.8x: hull canvas
   #6b7177, deckhouses #747a80, weather decks the darker deck grey p4 shows
   (#474c51), stack caps black, black boot topping. No hull number, name or
   flag: the 931 her photographs carry is left off.

   Materials (7): painted hull, deck, deckhouse plate, black, bare metal,
   glass and the team material, exactly C.team. Every static part is merged
   into one mesh per material; the forward 5-inch is the named "turret" with
   its own three. ASCII only.
============================================================================ */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroForrestShermanDD = (function () {
  "use strict";

  var PI = Math.PI;
  var LOA = 127.4, XB = LOA * 0.5;
  var ZTOP = 8.6, ZBOT = -1.5;  /* vertical span the hull texture covers     */

  /* ----------------------------------------------------------- hull curves */
  function tbl(k, t) {
    var i;
    if (t <= k[0][0]) return k[0][1];
    for (i = 1; i < k.length; i++) {
      if (t <= k[i][0]) {
        var u = (t - k[i - 1][0]) / (k[i][0] - k[i - 1][0]);
        return k[i - 1][1] + (k[i][1] - k[i - 1][1]) * u;
      }
    }
    return k[k.length - 1][1];
  }
  function tOf(x) { return (x + XB) / LOA; }

  /* half breadth at the deck edge, read off d2's main deck plan (5.97 px/m):
     the rounded stern, the full midbody and the long fine entry            */
  var HW = [[-63.7, 2.9], [-63.45, 3.7], [-63.0, 4.2], [-62.2, 4.55], [-61.0, 4.72],
            [-59.0, 4.9], [-56.0, 5.4], [-52.0, 5.75], [-47.0, 6.0], [-42.0, 6.3],
            [-36.0, 6.5], [-30.0, 6.62], [-23.0, 6.75], [-15.0, 6.83], [-7.0, 6.86],
            [10.0, 6.86], [17.0, 6.62], [24.0, 6.27], [30.0, 6.0], [36.0, 5.64],
            [41.0, 5.24], [46.0, 4.8], [50.0, 4.35], [53.5, 3.95], [56.5, 3.45],
            [58.5, 3.0], [60.0, 2.6], [60.6, 2.4], [61.0, 2.25], [61.8, 1.92],
            [62.6, 1.5], [63.2, 1.05], [63.7, 0.3]];
  /* the deck at the side: d2's profile less the camber, waterline at 4.2 m
     above the keel (p1 and p2 give 3.4-3.8 m of freeboard amidships). From
     amidships forward the sheer is d2's taken to 0.76 of its rise: DD-931
     in p1 and p2 lifts her stem about 3.2 m over her midship deck, where
     Turner Joy, built with the SCB 85A "modified hurricane bow", lifts 4.3 */
  var DK = [[-63.7, 3.75], [-57.0, 3.65], [-54.0, 3.5], [-50.0, 3.3], [-40.0, 3.2],
            [-25.0, 3.18], [-10.0, 3.3], [0.0, 3.45], [10.0, 3.68], [20.0, 3.98],
            [30.0, 4.33], [38.0, 4.74], [46.0, 5.2], [50.0, 5.5], [54.0, 5.85],
            [58.0, 6.12], [61.0, 6.46], [62.6, 6.65], [63.7, 6.75]];
  /* the bottom on the centreline: the flat keel, the run rising to the
     transom (immersed 0.6 m), the rounded forefoot and the raked stem      */
  var KZ = [[-63.7, -0.6], [-63.0, -0.7], [-62.0, -0.9], [-60.0, -1.1], [-57.0, -1.6],
            [-54.0, -2.1], [-50.0, -2.9], [-45.0, -4.0], [-40.0, -4.2], [56.0, -4.2],
            [58.5, -4.05], [60.0, -3.3], [60.6, -1.6], [61.0, 0.5], [61.8, 2.6],
            [62.6, 4.5], [63.2, 5.75], [63.7, 6.68]];
  /* which of d4's sections a station wears: 0 the stern (fr 199.5), 1 the
     run with its deadrise (fr 153), 2 the full midship U (fr 65-113), 3 the
     flared entry (fr 34), 4 the fine concave bow V (fr 4)                  */
  var SH = [[-63.7, 0], [-60.0, 0], [-56.0, 0.3], [-52.0, 0.55], [-47.0, 0.8],
            [-42.0, 0.95], [-36.0, 1.0], [-30.0, 1.05], [-23.0, 1.45], [-15.0, 1.85],
            [-7.0, 2.0], [21.0, 2.0], [26.0, 2.2], [30.0, 2.4], [36.0, 2.72],
            [40.2, 3.0], [46.0, 3.3], [50.0, 3.5], [54.0, 3.72], [58.5, 4.0], [63.7, 4.0]];
  /* half breadth fractions at these fractions of the depth, deck edge first */
  var ZF = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.12, 0.06, 0.02, 0.0];
  var SEC = [
    [1.0, 0.99, 0.98, 0.97, 0.958, 0.94, 0.91, 0.87, 0.78, 0.66, 0.40, 0.14, 0.0],
    [1.0, 1.0, 1.0, 0.985, 0.94, 0.86, 0.78, 0.65, 0.49, 0.30, 0.15, 0.05, 0.0],
    [0.99, 1.0, 1.0, 1.0, 0.99, 0.97, 0.935, 0.885, 0.80, 0.68, 0.53, 0.22, 0.0],
    [1.0, 0.96, 0.92, 0.88, 0.83, 0.79, 0.74, 0.66, 0.55, 0.43, 0.29, 0.12, 0.03],
    [1.0, 0.87, 0.72, 0.60, 0.47, 0.38, 0.28, 0.21, 0.13, 0.09, 0.06, 0.03, 0.0]];
  var CAMB = 0.15;

  function hullHW(x) { return tbl(HW, x); }
  function deckZ(x) { return tbl(DK, x); }
  function keelZ(x) { return tbl(KZ, x); }
  function secOf(x) {
    var s = tbl(SH, x), a = Math.min(3, Math.floor(s)), f = s - a, i, out = [];
    for (i = 0; i < ZF.length; i++) out.push(SEC[a][i] + (SEC[Math.min(4, a + 1)][i] - SEC[a][i]) * f);
    return out;
  }
  function ringOf(x) {
    var f = secOf(x), w = hullHW(x), dz = deckZ(x), kz = keelZ(x), dep = dz - kz, r = [], i;
    r.push([w * f[0], dz]);
    r.push([w * 0.56, dz + CAMB * 0.69]); r.push([0, dz + CAMB]); r.push([-w * 0.56, dz + CAMB * 0.69]);
    for (i = 0; i < ZF.length; i++) r.push([-w * f[i], kz + dep * ZF[i]]);
    for (i = ZF.length - 2; i >= 1; i--) r.push([w * f[i], kz + dep * ZF[i]]);
    return r;
  }
  function hullY(x, z) {
    var f = secOf(x), w = hullHW(x), kz = keelZ(x), dep = deckZ(x) - kz, zf = (z - kz) / dep, i;
    for (i = 0; i < ZF.length - 1; i++) {
      if (zf <= ZF[i] && zf >= ZF[i + 1]) return w * (f[i] + (f[i + 1] - f[i]) * (ZF[i] - zf) / (ZF[i] - ZF[i + 1]));
    }
    return w * f[0];
  }

  /* the stations: close together at both ends, where the lines change */
  var XS = [-63.7, -63.45, -63.0, -62.2, -61.0, -59.0, -56.0, -52.0, -47.0, -42.0,
            -36.0, -30.0, -23.0, -15.0, -7.0, 1.0, 9.0, 17.0, 24.0, 30.0, 36.0,
            41.0, 46.0, 50.0, 53.5, 56.5, 58.5, 60.0, 60.6, 61.0, 61.8, 62.6, 63.2, 63.7];

  /* ================================================================ helpers */
  function cvs(w, h) {
    var c = document.createElement("canvas"); c.width = w; c.height = h; return c;
  }
  function rng(seed) {
    var s = (seed >>> 0) || 11;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function tex(THREE, cv, rep) {
    var t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = rep ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding !== undefined) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  /* ================================================================ textures
     Painted once per page: they depend on nothing but the ship.            */
  var _tx = null;
  function textures(THREE) {
    if (!_tx) _tx = { hull: hullTex(THREE), sup: supTex(THREE), deck: deckTex(THREE) };
    return _tx;
  }

  function hullTex(THREE) {
    var W = 2048, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(93155), i, j, x, z;
    /* uv.y = 0 samples the BOTTOM row of the canvas, so paint bottom-up */
    function Y(zz) { return H - (zz - ZBOT) / (ZTOP - ZBOT) * H; }
    function U(xx) { return (xx + XB) / LOA * W; }
    g.fillStyle = "#6b7177"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 90; i++) {
      g.globalAlpha = 0.018 + R() * 0.030;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * Y(0.9), 50 + R() * 210, 7 + R() * 22);
    }
    g.globalAlpha = 1;
    /* anti-fouling below the waterline and the black boot topping over it */
    g.fillStyle = "#4a2c26"; g.fillRect(0, Y(-0.45), W, H - Y(-0.45));
    g.fillStyle = "#15181b"; g.fillRect(0, Y(0.65), W, Y(-0.45) - Y(0.65));
    g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(0, Y(0.65) - 1, W, 1.5);
    /* strake seams, in real height so they stay level */
    g.lineWidth = 1.2;
    var STR = [1.5, 2.9, 4.3, 5.7, 7.1];
    for (i = 0; i < STR.length; i++) {
      g.strokeStyle = "rgba(0,0,0,0.30)";
      g.beginPath(); g.moveTo(0, Y(STR[i])); g.lineTo(W, Y(STR[i])); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.09)";
      g.beginPath(); g.moveTo(0, Y(STR[i]) + 1.4); g.lineTo(W, Y(STR[i]) + 1.4); g.stroke();
    }
    g.lineWidth = 1; g.strokeStyle = "rgba(0,0,0,0.12)";
    for (i = 0; i < STR.length - 1; i++) {
      var st = (i % 2) * 0.5;
      for (j = 0; j < 20; j++) {
        x = ((j + st) / 20) * W;
        g.beginPath(); g.moveTo(x, Y(STR[i])); g.lineTo(x, Y(STR[i + 1])); g.stroke();
      }
    }
    /* freeing ports under the deck edge, weeping rust, following the sheer */
    for (i = 0; i < 38; i++) {
      x = -XB + 3 + (i / 37) * (LOA - 10);
      z = deckZ(x) - 0.7;
      g.globalAlpha = 0.34; g.fillStyle = "#20262a";
      g.fillRect(U(x) - 4, Y(z) - 2, 8, 5);
      if (R() < 0.55) continue;
      g.globalAlpha = 0.05 + R() * 0.05; g.fillStyle = "#6d4526";
      g.fillRect(U(x) - 2, Y(z) + 3, 4, (0.8 + R() * 2.0) * (H / (ZTOP - ZBOT)));
    }
    /* soot trailing aft from both stacks */
    var FUN = [8.6, -8.8];
    for (i = 0; i < FUN.length; i++) {
      for (j = 0; j < 130; j++) {
        var f = R();
        x = FUN[i] - f * 22 - 2;
        z = deckZ(x) - 0.3 - R() * 2.4;
        g.globalAlpha = 0.034 * (1 - f) + 0.008; g.fillStyle = "#2a2d30";
        g.fillRect(U(x), Y(z), 8 + R() * 30, 4 + R() * 12);
      }
    }
    /* rust weeping from the hawse under each anchor */
    g.globalAlpha = 0.14; g.fillStyle = "#6d4526";
    g.fillRect(U(56.6) - 5, Y(deckZ(56.6) - 2.6), 10, 2.8 * (H / (ZTOP - ZBOT)));
    g.globalAlpha = 1;
    /* draught marks fore and aft */
    g.fillStyle = "#dfe3e5";
    for (i = 0; i < 2; i++) {
      x = i ? 59.0 : -60.5;
      for (j = 0; j <= 9; j++) g.fillRect(U(x) - 6, Y(-0.3 + j * 0.55), j % 2 ? 7 : 12, 2);
    }
    /* the shadow line under the deck edge */
    g.globalAlpha = 0.28; g.fillStyle = "#0d1013";
    for (i = 0; i < W; i += 4) {
      x = -XB + (i / W) * LOA;
      g.fillRect(i, Y(deckZ(x)) - 1, 4, 6);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, false);
  }

  /* deckhouse plating: 4 m of steel per tile */
  function supTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(30931), i;
    g.fillStyle = "#747a80"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 18; i++) {
      g.globalAlpha = 0.016 + R() * 0.024;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 40 + R() * 100, 30 + R() * 70);
    }
    g.globalAlpha = 1; g.lineWidth = 1.2;
    for (i = 1; i < 4; i++) {
      g.strokeStyle = "rgba(0,0,0,0.24)";
      g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke();
      g.beginPath(); g.moveTo(i * W / 4, 0); g.lineTo(i * W / 4, H); g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.08)";
      g.beginPath(); g.moveTo(0, i * H / 4 + 1.5); g.lineTo(W, i * H / 4 + 1.5); g.stroke();
    }
    g.fillStyle = "#6d4526";
    for (i = 0; i < 20; i++) {
      g.globalAlpha = 0.025 + R() * 0.035;
      g.fillRect(R() * W, R() * H, 2 + R() * 3, 10 + R() * 40);
    }
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* weather decks: the dark deck grey of the period with its plate joints */
  function deckTex(THREE) {
    var W = 256, H = 256, cv = cvs(W, H), g = cv.getContext("2d");
    var R = rng(1955), i;
    g.fillStyle = "#474c51"; g.fillRect(0, 0, W, H);
    for (i = 0; i < 16; i++) {
      g.globalAlpha = 0.02 + R() * 0.03;
      g.fillStyle = R() < 0.5 ? "#ffffff" : "#000000";
      g.fillRect(R() * W, R() * H, 30 + R() * 90, 20 + R() * 60);
    }
    g.globalAlpha = 0.26; g.strokeStyle = "#000000"; g.lineWidth = 1.5;
    for (i = 1; i < 4; i++) {
      g.beginPath(); g.moveTo(0, i * H / 4); g.lineTo(W, i * H / 4); g.stroke();
      g.beginPath(); g.moveTo(i * W / 4, 0); g.lineTo(i * W / 4, H); g.stroke();
    }
    g.globalAlpha = 0.30; g.fillStyle = "#000000";
    for (i = 0; i < 900; i++) g.fillRect(R() * W, R() * H, 2, 2);
    g.globalAlpha = 1;
    return tex(THREE, cv, true);
  }

  /* ============================================================== materials */
  function makeMats(THREE, team) {
    var T = textures(THREE), M = {};
    function S(o) { return new THREE.MeshStandardMaterial(o); }
    M.hull  = S({ map: T.hull, roughness: 0.87, metalness: 0.07 });
    M.sup   = S({ map: T.sup, roughness: 0.88, metalness: 0.06 });
    /* the surfaces that lie on another surface are pulled toward the camera
       a couple of depth steps, or they shimmer at the zoom-out limit        */
    M.deck  = S({ map: T.deck, roughness: 0.95, metalness: 0.04,
                  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
    M.dark  = S({ color: 0x24272b, roughness: 0.88, metalness: 0.06 });
    M.metal = S({ color: 0x80878d, roughness: 0.55, metalness: 0.50 });
    M.team  = S({ color: new THREE.Color(team), roughness: 0.62, metalness: 0.08,
                  polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
    M.glass = S({ color: 0x2b3a44, roughness: 0.12, metalness: 0.25,
                  transparent: true, opacity: 0.86 });
    return M;
  }

  /* ================================================================ batching
     Parts are plain triangles appended to one Batch per material. A stamp
     (position and yaw) moves everything built while it is set, so a mount
     is drawn once about its own origin and set down where it stands.      */
  function Batch() { this.p = []; this.n = []; this.u = []; }
  Batch.xf = null;
  Batch.prototype.vert = function (x, y, z, nx, ny, nz, u, v) {
    var t = Batch.xf;
    if (t) {
      var px = x * t.c - y * t.s + t.x, py = x * t.s + y * t.c + t.y;
      var qx = nx * t.c - ny * t.s, qy = nx * t.s + ny * t.c;
      x = px; y = py; z += t.z; nx = qx; ny = qy;
    }
    this.p.push(x, y, z); this.n.push(nx, ny, nz); this.u.push(u, v);
  };
  Batch.prototype.add = function (geo) {
    var g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.getAttribute("normal")) g.computeVertexNormals();
    var P = g.getAttribute("position"), N = g.getAttribute("normal"), U = g.getAttribute("uv");
    for (var i = 0; i < P.count; i++)
      this.vert(P.getX(i), P.getY(i), P.getZ(i), N.getX(i), N.getY(i), N.getZ(i),
                U ? U.getX(i) : 0, U ? U.getY(i) : 0);
    return this;
  };
  Batch.prototype.tri = function (a, b, c) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    nx /= l; ny /= l; nz /= l;
    this.vert(a[0], a[1], a[2], nx, ny, nz, a[3], a[4]);
    this.vert(b[0], b[1], b[2], nx, ny, nz, b[3], b[4]);
    this.vert(c[0], c[1], c[2], nx, ny, nz, c[3], c[4]);
  };
  Batch.prototype.triOut = function (a, b, c, C) {
    var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    var vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    var mx = (a[0] + b[0] + c[0]) / 3 - C[0], my = (a[1] + b[1] + c[1]) / 3 - C[1];
    var mz = (a[2] + b[2] + c[2]) / 3 - C[2];
    if (nx * mx + ny * my + nz * mz < 0) this.tri(a, c, b); else this.tri(a, b, c);
  };
  Batch.prototype.mesh = function (THREE, mtl) {
    if (!this.p.length) return null;
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(this.u, 2));
    return new THREE.Mesh(g, mtl);
  };

  var _o = null, _v0 = null, _v1 = null;
  function place(THREE, geo, x, y, z, rx, ry, rz) {
    if (!_o) _o = new THREE.Object3D();
    _o.position.set(x || 0, y || 0, z || 0);
    _o.rotation.set(rx || 0, ry || 0, rz || 0);
    _o.scale.set(1, 1, 1);
    _o.updateMatrix();
    geo.applyMatrix4(_o.matrix);
    return geo;
  }

  /* ---- plan polygons: counter-clockwise, star-shaped about the bbox centre */
  function bboxOf(poly) {
    var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9, i;
    for (i = 0; i < poly.length; i++) {
      x0 = Math.min(x0, poly[i][0]); x1 = Math.max(x1, poly[i][0]);
      y0 = Math.min(y0, poly[i][1]); y1 = Math.max(y1, poly[i][1]);
    }
    return { cx: (x0 + x1) * 0.5, cy: (y0 + y1) * 0.5, w: x1 - x0, h: y1 - y0 };
  }
  function rounded(a, b, p, n, dx) {
    var out = [], k;
    for (k = 0; k < n; k++) {
      var an = 2 * PI * k / n, c = Math.cos(an), s = Math.sin(an);
      out.push([(dx || 0) + a * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p),
                b * (s < 0 ? -1 : 1) * Math.pow(Math.abs(s), p)]);
    }
    return out;
  }
  function mv(poly, dx, dy) {
    return poly.map(function (p) { return [p[0] + dx, p[1] + dy]; });
  }
  function roofOf(poly, ins, more) {
    var bb = bboxOf(poly), e = ins + (more || 0);
    var sx = (bb.w - 2 * e) / bb.w, sy = (bb.h - 2 * e) / bb.h;
    return poly.map(function (p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; });
  }
  function rectPts(s0, r0, s1, r1) { return [[s0, r0], [s1, r0], [s1, r1], [s0, r1]]; }
  /* a plan with a rounded front: straight sides from x0, the front an arc
     of half-width hw reaching xf, counter-clockwise                       */
  function roundFront(x0, xs, xf, hw, n) {
    var out = [[x0, -hw]], k;
    for (k = 0; k <= n; k++) {
      var a = -PI / 2 + PI * k / n;
      out.push([xs + (xf - xs) * Math.cos(a), hw * Math.sin(a)]);
    }
    out.push([x0, hw]);
    return out;
  }

  /* ================================================================ the hull */
  function hullMesh(THREE, mtl) {
    var pos = [], uv = [], idx = [], i, j, R = 0;
    for (i = 0; i < XS.length; i++) {
      var x0 = XS[i], r = ringOf(x0), t = tOf(x0);
      for (j = 0; j < r.length; j++) {
        pos.push(x0, r[j][0], r[j][1]);
        uv.push(t, (r[j][1] - ZBOT) / (ZTOP - ZBOT));
      }
      R = r.length;
    }
    for (i = 0; i < XS.length - 1; i++) {
      for (j = 0; j < R; j++) {
        var a = i * R + j, b = i * R + (j + 1) % R, c = a + R, d = b + R;
        idx.push(a, b, d, a, d, c);
      }
    }
    function cap(sIdx, flip) {
      var base = sIdx * R, k, cx = 0, cy = 0, cz = 0;
      for (k = 0; k < R; k++) {
        cx += pos[(base + k) * 3]; cy += pos[(base + k) * 3 + 1]; cz += pos[(base + k) * 3 + 2];
      }
      cx /= R; cy /= R; cz /= R;
      var ci = pos.length / 3;
      pos.push(cx, cy, cz); uv.push(sIdx ? 1 : 0, (cz - ZBOT) / (ZTOP - ZBOT));
      for (k = 0; k < R; k++) {
        var p = base + k, q = base + (k + 1) % R;
        if (flip) idx.push(ci, q, p); else idx.push(ci, p, q);
      }
    }
    cap(0, false); cap(XS.length - 1, true);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* the weather deck: a cambered ribbon on the hull top, sheer and all */
  function deckRibbon(THREE, mtl) {
    var KY = [-0.985, -0.94, -0.56, 0, 0.56, 0.94, 0.985];
    var XR = [-63.5, -63.0, -62.2, -61.0, -59.0, -56.0, -52.0, -47.0, -42.0, -36.0,
              -30.0, -23.0, -15.0, -7.0, 1.0, 9.0, 17.0, 24.0, 30.0, 36.0, 41.0, 46.0,
              50.0, 53.5, 56.5, 58.5, 60.0, 61.0, 61.8, 62.6, 63.2];
    var pos = [], uv = [], idx = [], i, j, R = KY.length;
    for (i = 0; i < XR.length; i++) {
      var x = XR[i], w = hullHW(x) * secOf(x)[0], dz = deckZ(x);
      for (j = 0; j < R; j++) {
        var ky = KY[j], ak = Math.abs(ky);
        pos.push(x, w * ky, dz + CAMB * (1 - ak * ak) + 0.1);
        uv.push(x / 5.5, ky * w / 5.5);
      }
    }
    for (i = 0; i < XR.length - 1; i++) for (j = 0; j < R - 1; j++) {
      var a = i * R + j, b = a + 1, c = a + R, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, mtl);
  }

  /* =============================================================== assembly */
  function build(THREE, MOD, C) {
    var team = (C && C.team !== undefined) ? C.team : "#4b8fe0";
    var M = makeMats(THREE, team);
    var G = new THREE.Group();
    var KEYS = ["sup", "deck", "dark", "metal", "team", "glass"];
    var Bt = {}, cur;
    KEYS.forEach(function (k) { Bt[k] = new Batch(); });
    cur = Bt;
    var i, j, s;

    /* ---- primitives, all into cur[key] ------------------------------- */
    function bx(k, lx, ly, lz, x, y, z, rx, ry, rz) {
      cur[k].add(place(THREE, new THREE.BoxGeometry(lx, ly, lz), x, y, z, rx, ry, rz));
    }
    function cz(k, rt, rb, h, seg, x, y, z0) {
      var g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, false);
      g.rotateX(PI / 2);
      cur[k].add(place(THREE, g, x, y, z0 + h * 0.5));
    }
    function cx(k, r0, r1, L, seg, x0, y, z) {
      var g = new THREE.CylinderGeometry(r1, r0, L, seg, 1, false);
      g.rotateZ(-PI / 2);
      cur[k].add(place(THREE, g, x0 + L * 0.5, y, z));
    }
    function hemi(k, r, ws, hs, x, y, z, sz) {
      var g = new THREE.SphereGeometry(r, ws, hs, 0, 2 * PI, 0, PI / 2);
      g.rotateX(PI / 2);
      if (sz) g.scale(1, 1, sz);
      cur[k].add(place(THREE, g, x, y, z));
    }
    function tube(k, ax, ay, az, bx2, by, bz, r0, r1, seg) {
      if (!_v0) { _v0 = new THREE.Vector3(0, 1, 0); _v1 = new THREE.Vector3(); }
      var dx = bx2 - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (L < 1e-4) return;
      var g = new THREE.CylinderGeometry(r1, r0, L, seg || 6, 1, true);
      _v1.set(dx, dy, dz).normalize();
      g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(_v0, _v1));
      g.translate((ax + bx2) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5);
      cur[k].add(g);
    }
    /* a thin three-sided bar between two points: rails, struts, braces */
    function bar(k, ax, ay, az, bx2, by, bz, r) {
      var dx = bx2 - ax, dy = by - ay, dz = bz - az;
      var L = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (L < 1e-4) return;
      dx /= L; dy /= L; dz /= L;
      var px, py, pz;
      if (Math.abs(dz) < 0.95) { px = -dy; py = dx; pz = 0; } else { px = 1; py = 0; pz = 0; }
      var pd = px * dx + py * dy + pz * dz;
      px -= pd * dx; py -= pd * dy; pz -= pd * dz;
      var pl = Math.sqrt(px * px + py * py + pz * pz); px /= pl; py /= pl; pz /= pl;
      var qx = dy * pz - dz * py, qy = dz * px - dx * pz, qz = dx * py - dy * px;
      var o = [], q, B = cur[k];
      for (q = 0; q < 3; q++) {
        var an = PI / 2 + q * 2 * PI / 3, c = Math.cos(an) * r, sn = Math.sin(an) * r;
        o.push([px * c + qx * sn, py * c + qy * sn, pz * c + qz * sn]);
      }
      var Cm = [(ax + bx2) * 0.5, (ay + by) * 0.5, (az + bz) * 0.5];
      for (q = 0; q < 3; q++) {
        var a = o[q], b = o[(q + 1) % 3];
        var A0 = [ax + a[0], ay + a[1], az + a[2], 0, 0], A1 = [ax + b[0], ay + b[1], az + b[2], 0, 0];
        var B0 = [bx2 + a[0], by + a[1], bz + a[2], 0, 1], B1 = [bx2 + b[0], by + b[1], bz + b[2], 0, 1];
        B.triOut(A0, A1, B1, Cm); B.triOut(A0, B1, B0, Cm);
      }
    }
    /* a faceted block: plan polygon extruded z0 .. the top, the top inset by
       `ins` metres all round so every wall leans in. The top is flat at z1,
       or follows the sheer as z1 + sl * x when sl is given; its roof goes
       in kRoof (the weather-deck grey) unless noCap.                       */
    function prism(k, poly, z0, z1, ins, sl, noCap, kRoof) {
      var bb = bboxOf(poly), n = poly.length, B = cur[k], q, per = 0, US = 4.0;
      var sx = (bb.w - 2 * ins) / bb.w, sy = (bb.h - 2 * ins) / bb.h;
      sl = sl || 0;
      function top(p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; }
      function zt(x) { return z1 + sl * x; }
      for (q = 0; q < n; q++) {
        var a = poly[q], b = poly[(q + 1) % n], at = top(a), bt = top(b);
        var L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        var u0 = per / US, u1 = (per + L) / US;
        per += L;
        var A0 = [a[0], a[1], z0, u0, z0 / US], B0 = [b[0], b[1], z0, u1, z0 / US];
        var B1 = [bt[0], bt[1], zt(bt[0]), u1, zt(bt[0]) / US], A1 = [at[0], at[1], zt(at[0]), u0, zt(at[0]) / US];
        B.tri(A0, B0, B1); B.tri(A0, B1, A1);
      }
      if (!noCap) {
        var Br = cur[kRoof || "deck"];
        for (q = 0; q < n; q++) {
          var p = top(poly[q]), r = top(poly[(q + 1) % n]);
          Br.tri([bb.cx, bb.cy, zt(bb.cx), bb.cx / US, bb.cy / US], [p[0], p[1], zt(p[0]), p[0] / US, p[1] / US],
                 [r[0], r[1], zt(r[0]), r[0] / US, r[1] / US]);
        }
      }
    }
    /* a frame on wall `ei` of a prism(poly, z0, z1, ins) with a flat top */
    function face(poly, ei, z0, z1, ins, u, zc) {
      var bb = bboxOf(poly), n = poly.length;
      var sx = (bb.w - 2 * ins) / bb.w, sy = (bb.h - 2 * ins) / bb.h;
      function top(p) { return [bb.cx + (p[0] - bb.cx) * sx, bb.cy + (p[1] - bb.cy) * sy]; }
      var a = poly[ei], b = poly[(ei + 1) % n], at = top(a), bt = top(b);
      var p0 = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, z0];
      var p1 = [at[0] + (bt[0] - at[0]) * u, at[1] + (bt[1] - at[1]) * u, z1];
      var f = (zc - z0) / (z1 - z0);
      var o = [p0[0] + (p1[0] - p0[0]) * f, p0[1] + (p1[1] - p0[1]) * f, zc];
      var tx = b[0] - a[0], ty = b[1] - a[1], tl = Math.sqrt(tx * tx + ty * ty);
      tx /= tl; ty /= tl;
      var wx = p1[0] - p0[0], wy = p1[1] - p0[1], wz = p1[2] - p0[2];
      var nx = ty * wz, ny = -tx * wz, nz = tx * wy - ty * wx;
      var nl = Math.sqrt(nx * nx + ny * ny + nz * nz); nx /= nl; ny /= nl; nz /= nl;
      return { o: o, t: [tx, ty, 0], w: [-nz * ty, nz * tx, nx * ty - ny * tx], n: [nx, ny, nz], len: tl };
    }
    function frameN(x, y, z, nx, ny) {
      var l = Math.sqrt(nx * nx + ny * ny); nx /= l; ny /= l;
      return { o: [x, y, z], t: [-ny, nx, 0], w: [0, 0, 1], n: [nx, ny, 0] };
    }
    function fp(F, s1, r1, d) {
      return [F.o[0] + F.t[0] * s1 + F.w[0] * r1 + F.n[0] * d,
              F.o[1] + F.t[1] * s1 + F.w[1] * r1 + F.n[1] * d,
              F.o[2] + F.t[2] * s1 + F.w[2] * r1 + F.n[2] * d];
    }
    function plate(k, F, pts, d0, d1) {
      var B = cur[k], n = pts.length, q;
      function P(p, d) { var w = fp(F, p[0], p[1], d); return [w[0], w[1], w[2], p[0] * 0.25, p[1] * 0.25]; }
      for (q = 1; q < n - 1; q++) B.tri(P(pts[0], d1), P(pts[q], d1), P(pts[q + 1], d1));
      for (q = 0; q < n; q++) {
        var a = pts[q], b = pts[(q + 1) % n];
        B.tri(P(a, d0), P(b, d0), P(b, d1)); B.tri(P(a, d0), P(b, d1), P(a, d1));
      }
    }
    function port(F, s1, r1, rad) {   /* a round port light, 8-sided */
      var pts = [], q;
      for (q = 0; q < 8; q++) pts.push([s1 + rad * Math.cos(q * PI / 4), r1 + rad * Math.sin(q * PI / 4)]);
      plate("glass", F, pts, -0.02, 0.03);
    }
    /* a loft along x of rounded sections [x, half width, bottom, top] */
    function loftX(k, secs, n, p) {
      var rings = [], q, m, B = cur[k], sxs = 0, szs = 0;
      for (q = 0; q < secs.length; q++) {
        var S = secs[q], zc = (S[2] + S[3]) * 0.5, hh = (S[3] - S[2]) * 0.5, ring = [];
        for (m = 0; m < n; m++) {
          var an = 2 * PI * m / n, c = Math.cos(an), sn = Math.sin(an);
          ring.push([S[0], S[1] * (c < 0 ? -1 : 1) * Math.pow(Math.abs(c), p),
                     zc + hh * (sn < 0 ? -1 : 1) * Math.pow(Math.abs(sn), p), m / n, S[0] * 0.25]);
        }
        rings.push(ring); sxs += S[0]; szs += zc;
      }
      var Cs = [sxs / secs.length, 0, szs / secs.length];
      for (q = 0; q < rings.length - 1; q++) {
        var A = rings[q], Bq = rings[q + 1];
        var Cq = [(secs[q][0] + secs[q + 1][0]) * 0.5, 0,
                  (secs[q][2] + secs[q][3] + secs[q + 1][2] + secs[q + 1][3]) * 0.25];
        for (m = 0; m < n; m++) {
          var m2 = (m + 1) % n;
          B.triOut(A[m], A[m2], Bq[m2], Cq); B.triOut(A[m], Bq[m2], Bq[m], Cq);
        }
      }
      [0, rings.length - 1].forEach(function (e) {
        var Rg = rings[e], S = secs[e], cc = [S[0], 0, (S[2] + S[3]) * 0.5, 0.5, 0.5];
        if (S[1] < 0.02) return;
        for (m = 0; m < n; m++) B.triOut(cc, Rg[m], Rg[(m + 1) % n], Cs);
      });
    }
    function flat(k, x0, y0, x1, y1, z, u0, v0, u1, v1) {
      cur[k].tri([x0, y0, z, u0, v0], [x1, y0, z, u1, v0], [x1, y1, z, u1, v1]);
      cur[k].tri([x0, y0, z, u0, v0], [x1, y1, z, u1, v1], [x0, y1, z, u0, v1]);
    }
    /* a thin wall seen from both sides: bulwarks and windscreens */
    function wall2(k, a, b, za, zb, h) {
      var nx = -(b[1] - a[1]), ny = b[0] - a[0], nl = Math.sqrt(nx * nx + ny * ny) || 1;
      nx /= nl; ny /= nl;
      var mx = (a[0] + b[0]) * 0.5, my = (a[1] + b[1]) * 0.5, mz = (za + zb) * 0.5 + h * 0.5, T = 0.05;
      [1, -1].forEach(function (sg) {
        var ox = sg * nx * T, oy = sg * ny * T, C = [mx - sg * nx, my - sg * ny, mz];
        var A = [a[0] + ox, a[1] + oy, za, 0, 0], B = [b[0] + ox, b[1] + oy, zb, 1, 0];
        var A1 = [a[0] + ox, a[1] + oy, za + h, 0, 1], B1 = [b[0] + ox, b[1] + oy, zb + h, 1, 1];
        cur[k].triOut(A, B, B1, C); cur[k].triOut(A, B1, A1, C);
      });
      cur[k].triOut([a[0] + nx * T, a[1] + ny * T, za + h, 0, 0], [b[0] + nx * T, b[1] + ny * T, zb + h, 1, 0],
                    [b[0] - nx * T, b[1] - ny * T, zb + h, 1, 1], [mx, my, mz - 5]);
      cur[k].triOut([a[0] + nx * T, a[1] + ny * T, za + h, 0, 0], [b[0] - nx * T, b[1] - ny * T, zb + h, 1, 1],
                    [a[0] - nx * T, a[1] - ny * T, za + h, 0, 1], [mx, my, mz - 5]);
    }
    function stamp(x, y, z, yaw, fn) {
      Batch.xf = { x: x, y: y, z: z, c: Math.cos(yaw), s: Math.sin(yaw) };
      fn();
      Batch.xf = null;
    }
    function railRun(k, pts, h, step) {
      var q, jj;
      for (q = 0; q < pts.length - 1; q++) {
        var a = pts[q], b = pts[q + 1];
        bar(k, a[0], a[1], a[2] + h, b[0], b[1], b[2] + h, 0.045);
        var L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
        var n = Math.max(1, Math.round(L / step));
        for (jj = (q === 0 ? 0 : 1); jj <= n; jj++) {
          var f = jj / n, x = a[0] + (b[0] - a[0]) * f, y = a[1] + (b[1] - a[1]) * f;
          var z = a[2] + (b[2] - a[2]) * f;
          bar(k, x, y, z, x, y, z + h, 0.035);
        }
      }
    }
    function railRoof(poly, z, skip, step, sl) {
      var q, n = poly.length;
      sl = sl || 0;
      for (q = 0; q < n; q++) {
        if (skip && skip.indexOf(q) >= 0) continue;
        var a = poly[q], b = poly[(q + 1) % n];
        railRun("metal", [[a[0], a[1], z + sl * a[0]], [b[0], b[1], z + sl * b[0]]], 1.0, Math.max(step || 0, 3.0));
      }
    }
    function topZ(x, y) {
      var ak = Math.min(1, Math.abs(y) / hullHW(x));
      return deckZ(x) + CAMB * (1 - ak * ak) + 0.1;
    }

    /* ----------------------------------------------------------- hull ---- */
    var hull = hullMesh(THREE, M.hull); hull.name = "hull"; G.add(hull);
    var dk = deckRibbon(THREE, M.deck); dk.name = "deck"; G.add(dk);

    /* the SQS-4 dome under the forefoot, its bottom at the 20 ft draught of
       her record; a skeg and the rudder under the counter (d4 fr 199.5)    */
    var dome = new THREE.SphereGeometry(1, 14, 8);
    dome.scale(4.2, 1.15, 1.6);
    cur.dark.add(place(THREE, dome, 49.5, 0, -4.35));
    bx("dark", 6.5, 0.35, 2.6, -59.6, 0, -2.1, 0, -0.25, 0);
    for (s = -1; s <= 1; s += 2) {
      tube("metal", -38.0, s * 2.4, -3.3, -55.5, s * 2.4, -2.6, 0.22, 0.22, 6);
      cz("metal", 0.5, 0.5, 0.25, 10, -55.8, s * 2.4, -3.1);
    }

    /* two anchors in hawses on the bows, chain led back to the windlass */
    for (s = -1; s <= 1; s += 2) {
      var AX = 56.6, AZ = deckZ(56.6) - 1.9, ay0 = hullY(AX + 0.6, AZ);
      var slope = (hullY(AX + 1.6, AZ) - hullY(AX - 0.4, AZ)) / 2.0;
      var FA = frameN(AX, s * (ay0 + 0.05), AZ, -slope, s);
      plate("dark", FA, rectPts(-0.7, -1.7, 0.7, 0.5), 0, 0.05);
      plate("metal", FA, rectPts(-0.13, -1.3, 0.13, 0.3), 0.05, 0.33);
      plate("metal", FA, rectPts(-0.38, -1.58, 0.38, -1.28), 0.05, 0.36);
      plate("metal", FA, [[-0.38, -1.58], [-0.38, -1.28], [-0.8, -1.0]], 0.05, 0.3);
      plate("metal", FA, [[0.38, -1.58], [0.8, -1.0], [0.38, -1.28]], 0.05, 0.3);
      cz("dark", 0.38, 0.38, 0.08, 10, 56.2, s * 2.2, topZ(56.2, 2.2) - 0.03);
      var cxa = 56.2, cya = s * 2.2, cxb = 51.6, cyb = s * 0.95;
      bx("dark", Math.sqrt((cxa - cxb) * (cxa - cxb) + (cya - cyb) * (cya - cyb)), 0.3, 0.12,
         (cxa + cxb) * 0.5, (cya + cyb) * 0.5, topZ(53.9, 1.6) + 0.03, 0, 0, Math.atan2(cya - cyb, cxa - cxb));
      cz("metal", 0.5, 0.56, 0.7, 12, 51.6, s * 0.95, topZ(51.6, 0.95) - 0.02);
    }
    cz("metal", 0.4, 0.5, 0.8, 10, 49.8, 0, topZ(49.8, 0) - 0.02);

    /* ------------------------------------------------- the main deckhouse -- */
    /* the long house on the main deck, its roof the 01 deck: from abaft
       mount 52 (its after end tapered, d2's 01 plan) to the 3-inch tub
       before the bridge, flat aft and rising with the sheer forward (d2
       profile). Walkways outboard of it the length of the ship (p4).      */
    var Z01 = 5.95, SL01 = 0.024;
    function z01(x) { return x > 0 ? Z01 + SL01 * x : Z01; }
    var H1A = [[-38.8, -2.6], [-30.0, -4.65], [0.0, -4.75], [0.0, 4.75], [-30.0, 4.65], [-38.8, 2.6]];
    prism("sup", H1A, 2.6, Z01, 0.04);
    var H1B = [[0.0, -4.75], [14.0, -4.75], [16.0, -5.1], [27.4, -5.1], [31.2, -3.6],
               [32.6, -1.7], [32.9, 0.0], [32.6, 1.7], [31.2, 3.6], [27.4, 5.1], [16.0, 5.1],
               [14.0, 4.75], [0.0, 4.75]];
    prism("sup", H1B, 2.9, Z01, 0.04, SL01);
    railRoof(roofOf(H1A, 0.04, 0.06), Z01, [2], 2.0);
    railRun("metal", [[0, -4.65, Z01], [14.0, -4.65, z01(14.0)], [16.0, -5.0, z01(16.0)], [27.4, -5.0, z01(27.4)]], 1.0, 2.2);
    railRun("metal", [[0, 4.65, Z01], [14.0, 4.65, z01(14.0)], [16.0, 5.0, z01(16.0)], [27.4, 5.0, z01(27.4)]], 1.0, 2.2);
    /* the 3-inch tub: a waist-high rounded bulwark at the fore end (p7) */
    (function () {
      var n = 12, q, r0 = [], hw = 3.55;
      for (q = 0; q <= n; q++) {
        var a = -PI / 2 + PI * q / n;
        r0.push([29.0 + 3.75 * Math.cos(a), hw * Math.sin(a)]);
      }
      for (q = 0; q < n; q++) {
        var a0 = r0[q], b0 = r0[q + 1];
        wall2("sup", a0, b0, z01(a0[0]) - 0.05, z01(b0[0]) - 0.05, 1.1);
      }
    })();
    /* doors and ports along the house sides */
    [[1, 0.12], [1, 0.38], [1, 0.62], [1, 0.86], [3, 0.14], [3, 0.4], [3, 0.64], [3, 0.88]].forEach(function (d) {
      plate("dark", face(H1A, d[0], 2.6, Z01, 0.04, d[1], 3.3), rectPts(-0.42, 0.05, 0.42, 1.95), -0.02, 0.06);
    });
    [[0, 0.3], [0, 0.75], [12, 0.25], [12, 0.7]].forEach(function (d) {
      var F = face(H1B, d[0], 2.9, Z01, 0.04, d[1], 3.6);
      plate("dark", F, rectPts(-0.42, 0.05, 0.42, 1.95), -0.02, 0.06);
      port(F, 1.4, 1.35, 0.17); port(F, -1.4, 1.35, 0.17);
    });

    /* -------------------------------------------------- the bridge block -- */
    /* two levels with rounded fronts on the 01 deck (p6, p9, p10: its front
       at 24.7 m), the pilot house with its row of round ports, the open
       bridge on its roof with a windscreen and the forward director        */
    var Z02 = 8.4, Z03 = 10.35, Z04 = 12.25;
    var BR2 = roundFront(12.6, 23.4, 26.1, 4.45, 8);
    prism("sup", BR2, z01(12.6) - 0.1, Z02, 0.06);
    railRoof(roofOf(BR2, 0.06, 0.05), Z02, [0], 1.8);
    var BR3 = roundFront(13.9, 23.1, 25.75, 4.3, 8);
    prism("sup", BR3, Z02 - 0.05, Z03, 0.07);
    railRoof(roofOf(BR3, 0.07, 0.05), Z03, [0], 1.8);
    /* the pilot house: the top level, its round ports across the front */
    var BR4 = roundFront(15.6, 22.6, 25.0, 3.85, 8);
    prism("sup", BR4, Z03 - 0.05, Z04, 0.08);
    (function () {
      var q;
      for (q = 1; q < 9; q++) {
        var F = face(BR4, q, Z03 - 0.05, Z04, 0.08, 0.5, 11.55);
        port(F, -0.3, 0, 0.2); port(F, 0.35, 0, 0.2);
        port(face(BR3, q, Z02 - 0.05, Z03, 0.07, 0.5, 9.6), 0, 0, 0.18);
      }
      [0, 9].forEach(function (e) {
        for (var u = 0.55; u < 0.95; u += 0.13) port(face(BR4, e, Z03 - 0.05, Z04, 0.08, e ? 1 - u : u, 11.55), 0, 0, 0.2);
      });
      /* the deck edge of the open bridge overhanging the ports (p6) */
      for (q = 1; q < 9; q++) plate("sup", face(BR4, q, Z03 - 0.05, Z04, 0.08, 0.5, Z04 - 0.12), rectPts(-0.75, -0.08, 0.75, 0.08), 0, 0.45);
      /* ports along the lower level and its doors */
      for (q = 2; q < 8; q++) port(face(BR2, q, z01(12.6) - 0.1, Z02, 0.06, 0.5, 7.6), 0, 0, 0.18);
      plate("dark", face(BR2, 0, z01(12.6) - 0.1, Z02, 0.06, 0.3, 6.35), rectPts(-0.42, 0.05, 0.42, 1.9), -0.02, 0.06);
      plate("dark", face(BR2, 9, z01(12.6) - 0.1, Z02, 0.06, 0.7, 6.35), rectPts(-0.42, 0.05, 0.42, 1.9), -0.02, 0.06);
    })();
    /* the windscreen round the open bridge, the brow under it */
    (function () {
      var w = roofOf(BR4, 0.08, 0.04), q;
      for (q = 1; q < w.length - 1; q++) {
        var a = w[q], b = w[q + 1];
        if (a[0] < 18.0 && b[0] < 18.0) continue;
        wall2("sup", a, b, Z04 - 0.02, Z04 - 0.02, 1.12);
      }
    })();
    /* bridge wings with the signal lamps on their ends (p5) */
    for (s = -1; s <= 1; s += 2) {
      bx("sup", 2.4, 2.0, 0.18, 21.0, s * 4.4, Z04 - 0.09);
      railRun("metal", [[19.8, s * 3.4, Z04], [19.8, s * 5.4, Z04], [22.2, s * 5.4, Z04], [22.2, s * 3.45, Z04]], 1.0, 1.2);
      bar("sup", 21.0, s * 4.1, Z03 + 0.05, 21.0, s * 5.2, Z04 - 0.2, 0.08);
      cz("sup", 0.12, 0.12, 0.9, 6, 21.6, s * 5.1, Z04);
      cx("dark", 0.28, 0.28, 0.5, 10, 21.4, s * 5.1, Z04 + 1.15);
    }
    /* the target designation room and the forward director over the bridge
       (p6, p9): a box on a column with its round radar dish, looking ahead */
    var DT = rectPts(14.3, -2.4, 16.9, 2.4);
    prism("sup", DT, Z03 - 0.05, Z04 + 0.4, 0.06);
    function director(x, y, z, yaw) {
      stamp(x, y, z, yaw, function () {
        cz("sup", 0.55, 0.62, 0.7, 12, 0, 0, 0);
        loftX("sup", [[-1.2, 0.85, 0.7, 1.75], [-1.05, 1.0, 0.7, 2.0], [0.7, 1.0, 0.7, 2.0],
                      [1.05, 0.8, 0.7, 1.7]], 12, 0.4);
        bx("sup", 0.5, 2.5, 0.42, -0.2, 0, 1.55);
        cx("dark", 0.2, 0.2, 0.3, 8, -0.4, 1.25, 1.55);
        cx("dark", 0.2, 0.2, 0.3, 8, -0.4, -1.25, 1.55);
        var g = new THREE.CylinderGeometry(0.95, 0.32, 0.42, 16, 1, false);
        g.rotateZ(-PI / 2); g.translate(0.85, 0, 2.6);
        cur.metal.add(g);
        cx("dark", 0.9, 0.9, 0.04, 16, 1.06, 0, 2.6);
        bx("sup", 0.4, 0.4, 0.6, 0.2, 0, 2.15);
      });
    }
    director(18.6, 0, Z04 - 0.1, 0);

    /* ------------------------------------------------ the forward stack -- */
    /* oval casings, raked aft, the black cap with its domed lid (p1, p8, p9;
       d2 profile gives the rake and both tops)                            */
    function stack(xb, xt, z0, z1, a, b) {
      /* five grey courses and a short black one at the top: the cap is a
         metre deep under its lid in p8 and p9                            */
      var n = 16, NL = 6, rings = [], q, m, FZ = [0, 0.2, 0.4, 0.6, 0.8, 0.92, 1.0];
      for (q = 0; q <= NL; q++) {
        var f = FZ[q], z = z0 + (z1 - z0) * f, xc = xb + (xt - xb) * f;
        var sa = a * (1 - 0.07 * f), sb = b * (1 - 0.07 * f);
        rings.push(mv(rounded(sa, sb, 0.62, n), xc, 0).map(function (p) { return [p[0], p[1], z]; }));
      }
      for (q = 0; q < NL; q++) {
        var fm = (FZ[q] + FZ[q + 1]) * 0.5;
        var k = q === NL - 1 ? "dark" : "sup", Cc = [xb + (xt - xb) * fm, 0, z0 + (z1 - z0) * fm];
        for (m = 0; m < n; m++) {
          var A = rings[q][m], B = rings[q][(m + 1) % n], A1 = rings[q + 1][m], B1 = rings[q + 1][(m + 1) % n];
          var uA = m / n * 3, uB = (m + 1) / n * 3;
          cur[k].triOut([A[0], A[1], A[2], uA, A[2] / 4], [B[0], B[1], B[2], uB, B[2] / 4],
                        [B1[0], B1[1], B1[2], uB, B1[2] / 4], Cc);
          cur[k].triOut([A[0], A[1], A[2], uA, A[2] / 4], [B1[0], B1[1], B1[2], uB, B1[2] / 4],
                        [A1[0], A1[1], A1[2], uA, A1[2] / 4], Cc);
        }
      }
      /* the cap: a lip and a low dome raked aft, black */
      var tc = rings[NL], lid = new THREE.SphereGeometry(1, 16, 5, 0, 2 * PI, 0, PI / 2);
      lid.rotateX(PI / 2); lid.scale(a * 0.92, b * 0.92, 0.75);
      lid.rotateY(-0.12);
      cur.dark.add(place(THREE, lid, xt, 0, z1));
      var lip = new THREE.CylinderGeometry(1, 1, 0.3, 16, 1, false);
      lip.rotateX(PI / 2); lip.scale(a * 0.95, b * 0.95, 1);
      cur.dark.add(place(THREE, lip, xt, 0, z1 - 0.15));
      /* a band of clinker plating round the casing's upper third */
      var bd = new THREE.CylinderGeometry(1, 1, 0.16, 16, 1, true);
      bd.rotateX(PI / 2); bd.scale(a * 0.96, b * 0.96, 1);
      cur.sup.add(place(THREE, bd, xb + (xt - xb) * 0.62, 0, z0 + (z1 - z0) * 0.62));
      return tc;
    }
    stack(10.3, 8.6, z01(10.3) - 0.1, 16.5, 2.25, 1.62);
    /* the small house abaft it between the stacks, a ladder up it */
    var HS = rectPts(0.9, -2.3, 5.4, 2.3);
    prism("sup", HS, Z01 - 0.05, 8.0, 0.06);
    railRoof(roofOf(HS, 0.06, 0.04), 8.0, null, 1.6);
    plate("dark", face(HS, 2, Z01 - 0.05, 8.0, 0.06, 0.5, 6.0), rectPts(-0.42, 0.05, 0.42, 1.9), -0.02, 0.06);

    /* ---------------------------------------------------- the foremast -- */
    /* a tripod: the pole just abaft the pilot house, two legs raked aft to
       the 01 deck either side of the forward stack (p8, p9; d2's 02 plan
       shows the legs straddling the uptake), a broad yard with lamps at
       its arms (p5), the SPS-6 bedspring on a platform before the pole and
       the SPS-10 on the masthead platform, a topmast over it (p3, p6, p9) */
    var FX = 13.4, FY = 22.6;
    tube("sup", FX, 0, Z02, FX, 0, 26.3, 0.38, 0.26, 8);
    tube("sup", FX, 0, 26.3, FX, 0, 29.6, 0.12, 0.07, 6);
    for (s = -1; s <= 1; s += 2) {
      tube("sup", FX - 0.15, s * 0.15, 21.2, 4.9, s * 4.05, Z01, 0.22, 0.28, 6);
      bar("sup", FX - 1.6, s * 0.95, 18.4, FX - 0.1, 0, 18.4, 0.07);
      bar("sup", FX - 4.6, s * 2.25, 12.9, FX - 0.1, 0, 14.0, 0.07);
    }
    /* the yard and its lamps and halyard blocks */
    bar("sup", FX, -6.1, FY, FX, 6.1, FY, 0.11);
    for (s = -1; s <= 1; s += 2) {
      bar("sup", FX, s * 3.2, FY, FX, s * 0.3, FY - 1.9, 0.06);
      cz("dark", 0.14, 0.14, 0.35, 6, FX, s * 5.8, FY + 0.08);
      bar("dark", FX, s * 5.95, FY, FX, s * 5.95, FY + 1.2, 0.03);
    }
    /* SPS-6: the platform before the pole, the open-mesh paraboloid 4.6 m
       wide on its pedestal, turned a little off the bow                   */
    bx("dark", 2.6, 2.4, 0.16, FX + 1.0, 0, FY + 0.35);
    railRun("metal", [[FX - 0.3, -1.2, FY + 0.43], [FX + 2.3, -1.2, FY + 0.43], [FX + 2.3, 1.2, FY + 0.43], [FX - 0.3, 1.2, FY + 0.43]], 0.85, 1.2);
    bar("sup", FX + 2.2, 1.1, FY + 0.3, FX + 0.1, 0.5, FY - 1.4, 0.06);
    bar("sup", FX + 2.2, -1.1, FY + 0.3, FX + 0.1, -0.5, FY - 1.4, 0.06);
    cz("dark", 0.25, 0.32, 0.55, 8, FX + 1.2, 0, FY + 0.43);
    function bedspring(x, y, z, yaw, AW, AH, NSL, depth) {
      stamp(x, y, z, yaw, function () {
        var q, Bm = cur.dark;
        function rx(yy) { return depth * 0.5 - depth * (yy / AW) * (yy / AW); }
        for (q = 0; q < NSL; q++) {
          var ya = -AW + 2 * AW * q / NSL, yb = -AW + 2 * AW * (q + 1) / NSL;
          var ym = (ya + yb) * 0.5, hw = (yb - ya) * 0.36;
          var a0 = [rx(ym - hw), ym - hw, 0, 0, 0], b0 = [rx(ym + hw), ym + hw, 0, 1, 0];
          var a1 = [rx(ym - hw), ym - hw, AH, 0, 1], b1 = [rx(ym + hw), ym + hw, AH, 1, 1];
          Bm.triOut(a0, b0, b1, [6, 0, AH * 0.5]); Bm.triOut(a0, b1, a1, [6, 0, AH * 0.5]);
          Bm.triOut(a0, b0, b1, [-6, 0, AH * 0.5]); Bm.triOut(a0, b1, a1, [-6, 0, AH * 0.5]);
        }
        bar("dark", rx(-AW), -AW, 0, depth * 0.5, 0, 0, 0.05);
        bar("dark", depth * 0.5, 0, 0, rx(AW), AW, 0, 0.05);
        bar("dark", rx(-AW), -AW, AH, depth * 0.5, 0, AH, 0.05);
        bar("dark", depth * 0.5, 0, AH, rx(AW), AW, AH, 0.05);
        bar("dark", depth * 0.5, 0, AH * 0.5, depth * 0.5 + 1.3, 0, AH * 0.45, 0.05);
        bx("dark", 0.3, 0.42, 0.36, depth * 0.5 + 1.35, 0, AH * 0.45);
      });
    }
    bedspring(FX + 1.2, 0, FY + 0.98, 0.3, 2.3, 2.1, 9, 0.7);
    /* the lattice topmast section, its platform and the SPS-10 on it */
    for (s = -1; s <= 1; s += 2) {
      bar("sup", FX + 0.45, s * 0.45, FY, FX + 0.3, s * 0.3, 26.2, 0.06);
      bar("sup", FX - 0.45, s * 0.45, FY, FX - 0.3, s * 0.3, 26.2, 0.06);
    }
    for (j = 0; j < 3; j++) {
      var zl = FY + 0.4 + j * 1.2;
      bar("sup", FX - 0.42, -0.42, zl, FX + 0.4, 0.4, zl + 1.1, 0.04);
      bar("sup", FX + 0.42, -0.42, zl, FX - 0.4, 0.4, zl + 1.1, 0.04);
    }
    bx("dark", 1.9, 1.9, 0.14, FX + 0.2, 0, 26.25);
    railRun("metal", [[FX - 0.7, -0.9, 26.32], [FX + 1.1, -0.9, 26.32], [FX + 1.1, 0.9, 26.32], [FX - 0.7, 0.9, 26.32]], 0.7, 0.9);
    cz("dark", 0.16, 0.2, 0.35, 6, FX + 0.35, 0, 26.32);
    bedspring(FX + 0.35, 0, 26.75, 0, 1.65, 0.75, 7, 0.45);
    bar("sup", FX, -1.1, 28.4, FX, 1.1, 28.4, 0.04);
    bar("dark", FX, 0, 29.6, FX, 0, 30.4, 0.03);

    /* ----------------------------------------------------- amidships ---- */
    /* the four single 21-inch tubes "amidships as built" (her record): two
       a side on the 01 deck between the stacks, where d2 sites the later
       Mk 32 tubes, laid on cradles and trained outboard. How they lay is
       not shown by any of these photographs; the place is d2's.            */
    for (s = -1; s <= 1; s += 2) {
      [-0.6, 2.4].forEach(function (x0) {
        stamp(x0, s * 3.4, Z01, s * 0.62, function () {
          cx("sup", 0.36, 0.36, 5.0, 10, -2.0, 0, 0.75);
          cx("dark", 0.4, 0.4, 0.25, 10, 2.95, 0, 0.75);
          cx("sup", 0.42, 0.42, 0.9, 10, -2.4, 0, 0.75);
          bx("sup", 0.4, 0.9, 0.45, -1.2, 0, 0.22);
          bx("sup", 0.4, 0.9, 0.45, 1.8, 0, 0.22);
        });
      });
    }

    /* ---------------------------------------------------- the aftermast -- */
    /* the shorter tripod forward of the after stack, its legs either side of
       it, two yards, the small radome can and whips at its head (p8, p9)  */
    var AXM = -4.8, AT = 19.6;
    tube("sup", AXM, 0, Z01, AXM, 0, AT, 0.28, 0.2, 8);
    tube("sup", AXM, 0, AT, AXM, 0, AT + 2.2, 0.1, 0.07, 6);
    for (s = -1; s <= 1; s += 2) {
      tube("sup", AXM - 0.1, s * 0.12, 16.6, -12.1, s * 3.75, Z01, 0.18, 0.22, 6);
      bar("sup", AXM - 2.6, s * 1.3, 13.2, AXM - 0.1, 0, 13.6, 0.06);
    }
    bar("sup", AXM, -5.4, 17.4, AXM, 5.4, 17.4, 0.09);
    bar("sup", AXM, -4.4, AT - 0.1, AXM, 4.4, AT - 0.1, 0.1);
    for (s = -1; s <= 1; s += 2) {
      bar("sup", AXM, s * 2.6, 17.4, AXM, s * 0.25, 16.1, 0.05);
      bar("sup", AXM, s * 2.4, AT - 0.1, AXM, s * 0.25, AT - 1.6, 0.05);
      bx("dark", 0.5, 0.5, 0.5, AXM, s * 4.15, AT + 0.2);
      bar("dark", AXM, s * 5.2, 17.4, AXM, s * 5.2, 18.6, 0.03);
    }
    bx("dark", 1.3, 1.3, 0.12, AXM, 0, AT);
    cz("dark", 0.32, 0.32, 0.25, 10, AXM, 0, AT + 0.06);
    cz("sup", 0.36, 0.36, 0.85, 12, AXM, 0, AT + 0.3);
    hemi("sup", 0.36, 12, 4, AXM, 0, AT + 1.15, 0.6);

    /* ---------------------------------------------------- the after stack */
    stack(-7.6, -8.8, Z01 - 0.1, 14.5, 2.15, 1.55);
    /* searchlights on a platform on the stack's forward face (p9) */
    bx("sup", 1.3, 3.6, 0.16, -5.4, 0, 11.2);
    railRun("metal", [[-5.0, -1.75, 11.28], [-4.75, -1.75, 11.28], [-4.75, 1.75, 11.28], [-5.0, 1.75, 11.28]], 0.9, 1.2);
    for (s = -1; s <= 1; s += 2) {
      cz("sup", 0.12, 0.18, 0.5, 6, -5.3, s * 1.15, 11.28);
      cx("dark", 0.38, 0.38, 0.65, 12, -5.7, s * 1.15, 12.15);
      cx("glass", 0.3, 0.3, 0.04, 10, -5.07, s * 1.15, 12.15);
    }

    /* ----------------------------------------------- the after director -- */
    /* on its own house abaft the after stack, the 01 deck, a column and the
       director with its dish (p6, p8; d2's "director control room")       */
    var DH = rectPts(-17.6, -2.3, -12.4, 2.3);
    prism("sup", DH, Z01 - 0.05, 8.15, 0.06);
    railRoof(roofOf(DH, 0.06, 0.04), 8.15, null, 1.6);
    plate("dark", face(DH, 0, Z01 - 0.05, 8.15, 0.06, 0.5, 6.05), rectPts(-0.42, 0.05, 0.42, 1.9), -0.02, 0.06);
    cz("sup", 0.75, 0.85, 1.2, 12, -15.2, 0, 8.15);
    director(-15.2, 0, 9.35, PI);

    /* boats: a 26-ft motor whaleboat in davits each side abaft the after
       stack (p6, p8, p10; d2), canopied forward, on two radial davits    */
    function boat(xc, yc, zk) {
      stamp(xc, yc, zk, 0, function () {
        var L = 3.95, B = 1.12;
        loftX("sup", [[-L, B * 0.55, 0.42, 1.05], [-L + 0.4, B * 0.86, 0.12, 1.08],
                      [-L * 0.35, B, 0.0, 1.08], [L * 0.3, B * 0.97, 0.02, 1.1],
                      [L * 0.7, B * 0.66, 0.2, 1.16], [L * 0.93, B * 0.24, 0.55, 1.2],
                      [L, 0.01, 0.85, 1.2]], 12, 0.55);
        var cg = new THREE.CylinderGeometry(0.82, 0.82, 2.2, 10, 1, false, 0, PI);
        cg.rotateZ(PI / 2); cg.rotateX(PI / 2);
        cur.sup.add(place(THREE, cg, 0.9, 0, 1.08));
        bx("dark", 0.5, 0.4, 0.22, -2.6, 0, 1.2);
      });
    }
    for (s = -1; s <= 1; s += 2) {
      var BY = s * 5.15;
      boat(-13.9, BY, Z01 + 0.55);
      for (j = -1; j <= 1; j += 2) {
        var DX = -13.9 + j * 2.7;
        tube("sup", DX, s * 4.45, Z01, DX, s * 4.65, Z01 + 2.4, 0.12, 0.1, 6);
        bar("sup", DX, s * 4.65, Z01 + 2.4, DX, s * 5.05, Z01 + 3.1, 0.09);
        bar("sup", DX, s * 5.05, Z01 + 3.1, DX, BY, Z01 + 3.2, 0.08);
        bar("metal", DX, BY, Z01 + 3.15, DX, BY, Z01 + 1.6, 0.02);
      }
    }

    /* ------------------------------------------------------- the 3-inch -- */
    /* twin 3-inch/50 Mk 33: pedestal, carriage, the curved front shield and
       two barrels (p2, p6, p8)                                            */
    function threeInch() {
      cz("sup", 0.95, 1.05, 0.55, 14, 0, 0, 0);
      bx("sup", 1.5, 1.7, 0.75, -0.1, 0, 0.9);
      var sh = new THREE.CylinderGeometry(1.25, 1.25, 1.35, 12, 1, true, -1.05, 2.1);
      sh.rotateX(PI / 2);
      cur.sup.add(place(THREE, sh, -0.3, 0, 1.3));
      bx("sup", 0.7, 2.25, 0.08, 0.3, 0, 1.95);
      for (var q = -1; q <= 1; q += 2) {
        cx("dark", 0.17, 0.15, 0.6, 8, 0.75, q * 0.34, 1.32);
        cx("metal", 0.075, 0.06, 3.15, 6, 1.3, q * 0.34, 1.32);
        cx("sup", 0.16, 0.16, 0.85, 8, -1.2, q * 0.34, 1.32);
      }
      bx("dark", 0.45, 0.1, 0.6, -0.2, 0.95, 1.2);
      bx("dark", 0.45, 0.1, 0.6, -0.2, -0.95, 1.2);
    }
    stamp(29.0, 0, z01(29.0), 0, threeInch);
    stamp(-22.6, 0, Z01, PI, threeInch);
    railRun("metal", [[-24.6, -2.0, Z01], [-24.6, 2.0, Z01]], 1.0, 1.4);

    /* ------------------------------------------------------ the Hedgehogs */
    /* Mk 10/11 on the 01 deck either side of the forward 3-inch (d2): a
       cradle with four rows of six spigots raked forward                  */
    function hedgehog() {
      bx("sup", 2.0, 1.55, 0.35, 0, 0, 0.18);
      bx("sup", 1.6, 1.4, 0.35, 0.05, 0, 0.5, 0, -0.32, 0);
      for (var r = 0; r < 4; r++) for (var c = 0; c < 6; c++) {
        var xr = -0.55 + r * 0.38, yc = -0.55 + c * 0.22, zr = 0.62 + r * 0.12;
        bar("dark", xr, yc, zr, xr + 0.42, yc, zr + 0.42, 0.045);
      }
    }
    stamp(26.1, 3.35, z01(26.1), 0, hedgehog);
    stamp(26.1, -3.35, z01(26.1), 0, hedgehog);

    /* --------------------------------------------- the 5-inch Mk 42 mounts */
    /* the boxy gunhouse of the period: a flat roof, the sloped face, two
       round sight hoods on its fore corners, the 5-inch/54 out of a slot */
    function gun() {
      cz("sup", 2.05, 2.15, 0.25, 22, 0, 0, 0);
      loftX("sup", [[-2.95, 1.55, 0.25, 2.8], [-2.75, 1.85, 0.25, 3.12], [-1.4, 1.95, 0.25, 3.25],
                    [0.9, 1.95, 0.25, 3.25], [1.8, 1.86, 0.25, 2.95], [2.5, 1.62, 0.25, 2.2],
                    [2.78, 1.32, 0.25, 1.45]], 16, 0.26);
      for (var q = -1; q <= 1; q += 2) {
        cz("sup", 0.5, 0.52, 0.75, 12, 1.0, q * 1.3, 3.05);
        hemi("sup", 0.5, 12, 4, 1.0, q * 1.3, 3.8, 0.75);
        bx("dark", 0.06, 0.5, 0.18, 1.52, q * 1.3, 3.55);
      }
      bx("dark", 0.5, 0.62, 1.2, 2.58, 0, 1.55, 0, 0.5, 0);
      cx("dark", 0.36, 0.2, 0.7, 12, 2.45, 0, 1.55);
      cx("metal", 0.14, 0.11, 5.3, 10, 3.05, 0, 1.55);
      cx("dark", 0.13, 0.13, 0.1, 10, 8.3, 0, 1.55);
      bx("dark", 0.06, 0.9, 1.5, -2.97, 0, 1.4);
      bx("sup", 1.1, 1.1, 0.14, -1.4, 0, 3.28);
    }
    /* mount 51 trains: it is the node the renderer aims, origin on its
       ring centre, the barrel along +X                                   */
    var X51 = 39.6, tw = new THREE.Group();
    tw.name = "turret";
    tw.position.set(X51, 0, topZ(X51, 0));
    var TB = { sup: new Batch(), metal: new Batch(), dark: new Batch() };
    cur = TB; gun(); cur = Bt;
    ["sup", "metal", "dark"].forEach(function (k) {
      var tm = TB[k].mesh(THREE, M[k]); if (tm) tw.add(tm);
    });
    G.add(tw);
    /* mount 52 superfiring on the 01 deck aft, mount 53 on the main deck at
       the stern, both trained aft (p2, p6, p8, p10)                      */
    stamp(-32.6, 0, Z01, PI, gun);
    stamp(-46.0, 0, topZ(-46.0, 0), PI, gun);

    /* ------------------------------------------------- weather deck gear -- */
    /* lifelines along the deck edge, the forecastle included (p5, p8) */
    for (s = -1; s <= 1; s += 2) {
      var ep = [], ex = -63.2;
      while (ex < 61.0) {
        ep.push([ex, s * (hullHW(ex) * secOf(ex)[0] - 0.12), deckZ(ex) + 0.05]);
        ex += (ex > -40 && ex < 30) ? 6.0 : 3.0;
      }
      ep.push([62.4, s * (hullHW(62.4) - 0.12), deckZ(62.4) + 0.05]);
      railRun("metal", ep, 1.0, 3.2);
    }
    railRun("metal", [[-63.3, -hullHW(-63.3) + 0.25, deckZ(-63.3) + 0.05],
                      [-63.3, hullHW(-63.3) - 0.25, deckZ(-63.3) + 0.05]], 1.0, 1.8);
    function bitts(x, y) {
      var z0 = topZ(x, y) - 0.02;
      bx("sup", 1.4, 0.55, 0.1, x, y, z0 + 0.05);
      cz("metal", 0.18, 0.2, 0.55, 8, x - 0.42, y, z0);
      cz("metal", 0.18, 0.2, 0.55, 8, x + 0.42, y, z0);
    }
    for (s = -1; s <= 1; s += 2) {
      bitts(58.4, s * 1.8); bitts(44.5, s * 4.6); bitts(-42.0, s * 5.7); bitts(-58.0, s * 4.4);
      bitts(12.0, s * 6.2); bitts(-28.0, s * 6.2);
    }
    /* the depth-charge track at the stern under its canvas cover (p8; d2
       "depth charge rack (removed)")                                       */
    bx("dark", 6.4, 1.3, 0.85, -59.6, -0.9, topZ(-59.6, 0.9) + 0.4);
    bx("dark", 6.6, 1.5, 0.12, -59.6, -0.9, topZ(-59.6, 0.9) + 0.84);
    /* whip antennas on the 01 deck edges by the bridge and aft (p10) */
    [[11.0, 4.6], [11.0, -4.6], [-27.0, 4.55], [-27.0, -4.55]].forEach(function (w) {
      cz("sup", 0.14, 0.18, 0.5, 6, w[0], w[1], Z01);
      bar("metal", w[0], w[1], Z01 + 0.5, w[0], w[1] * 1.02, Z01 + 9.5, 0.035);
    });
    /* ensign staff and jackstaff, both inside the ends of the hull */
    bar("metal", -63.0, 0, deckZ(-63.0), -63.0, 0, deckZ(-63.0) + 4.6, 0.06);
    bar("metal", 62.9, 0, deckZ(62.9) + 0.05, 62.9, 0, deckZ(62.9) + 3.0, 0.05);
    /* the team colour, lying on the forecastle and the fantail */
    flat("team", 58.6, -0.85, 60.8, 0.85, topZ(59.7, 0) + 0.04, 0, 0, 1, 1);
    flat("team", -62.0, -1.0, -61.0, 1.0, topZ(-61.5, 0) + 0.04, 0, 0, 1, 1);

    KEYS.forEach(function (k) {
      var m = Bt[k].mesh(THREE, M[k]); if (m) { m.name = k; G.add(m); }
    });
    G.userData.len = LOA;
    return G;
  }

  return { build: build, len: LOA };
})();

UNIT_MODELS["nato_e50_destroyer"] = {
  len: 127.4,
  build: function (THREE, M, C) { return HeroForrestShermanDD.build(THREE, M, C); }
};
