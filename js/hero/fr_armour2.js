/* ========== fr_armour2.js - HERO models: the remaining French ground rows ==========
   LOADS AFTER js/hero/fr_tanks.js (HeroFrKit, HeroAMX30), js/hero/eu_sams.js (HeroRoland) and
   js/hero/us_m270_himars.js (HeroUsMlrs).  None of them is edited.

   Rows and builders:
     fra_e50_recon          HeroFrArmour2.ebr     Panhard EBR-75 Mle 1951, FL-11 turret         NEW
     fra_e60_recon          HeroFrArmour2.aml     Panhard AML H-90                              NEW
     fra_e80_recon          HeroFrArmour2.erc     Panhard ERC-90 F4 Sagaie                      NEW
     fra_e90_recon,
     fra_e00_recon          HeroFrArmour2.vbl     Panhard VBL with the 12.7 mm ring mount       NEW (one build:
                                                  the e00 row's add-on plates were not identified in a photo)
     fra_e80_lighttank      HeroFrArmour2.rc80    AMX-10 RC, French olive                       NEW
     fra_e90_lighttank      HeroFrArmour2.rc90    AMX-10 RC, Centre-Europe three-tone           NEW
     fra_e00_lighttank      HeroFrArmour2.rcr     AMX-10 RCR: bow and side add-on armour, sight NEW
     fra_e60_ifv, fra_e80_ifv  HeroFrArmour2.p70  AMX-10P Toucan, olive                         NEW
     fra_e90_ifv            HeroFrArmour2.p90     AMX-10P, three-tone (Toucan II not told apart) NEW
     fra_e00_ifv            HeroFrArmour2.vbci    VBCI with the Dragar turret, three-tone       NEW
     fra_e60_spg            HeroFrArmour2.mkf3    155 Mk F3 on the shortened AMX-13 chassis     NEW (hull drawn
                                                  here: F1 shows it 0.44 m shorter than HeroAMX13's tank hull,
                                                  with four return rollers and a low rear idler)
     fra_e80_spg            HeroFrArmour2.auf1    AuF1: HeroAMX30.build (hull, running gear,    REUSED hull
     fra_e90_spg            HeroFrArmour2.auf1ce    wheels) with its "turret" removed and the GCT turret
                                                  drawn here; e90 re-maps the hull's paint to the three-tone
     fra_e00_spg            HeroFrArmour2.caesar  CAESAR on the Sherpa 5 6x6, on the march      NEW
     fra_e80_tankdestroyer  HeroFrArmour2.vab     VAB 4x4 Mephisto, launcher raised             NEW
     fra_e90_spaag          HeroRoland.build      Roland 2 on the AMX-30R (eu_sams.js), as fra_e80_sam   REUSED
     fra_e90_mlrs           HeroUsMlrs "fra_e90_mlrs"  M270, two M26 pods, nato3 paint          REUSED (row added
     fra_e00_mlrs           HeroUsMlrs "fra_e00_mlrs"  M270, two GMLRS pods, nato3 paint          to the module's
                                                  table as deu_us_pattern.js adds the MARS)
   NOT DONE: fra_e00_spaag (Crotale NG, Armee de l'Air).  K3 shows the air force fire unit as a
     shelter-mounted turret on a two-axle trailer behind a Renault Kerax carrying a container:
     what one unit should show (trailer alone, or truck and trailer) is a design decision, so the
     row keeps its generic model.

   REFERENCES (Wikimedia Commons at width 1280 via thumb.php, cached in scratchpad/q_fra2_ref;
   en.wikipedia raw pages in scratchpad/q_fra2_wiki):
     D1 "AMX-10 RC.svg" - four-view line drawing: THE AMX-10 RC TABLE.  R1 "AMX-10 RC at Musee des
        Blindes, Saumur, France (53336547939).jpg" (Gulf sand, not drawn).  R3 "AMX-10 RCR 14juillet
        Metz profil.jpg" - the RCR from the left: three-tone, the flat side slabs, the bow armour box.
        R4 "AMX-10 RC, nouvelles couleurs Armee de terre (14 juillet 2021) (1).jpg" (2021 earth
        brown: after every row's period, not drawn).
     P1 "AMX-10P in the Musee des Blindes, France, pic-1.JPG" - left side: THE AMX-10P TABLE; the
        three-tone, the side straps, front sprocket, five wheels, high rear idler, no return
        rollers seen, the Toucan turret.  P3 "AMX-10 P of french army, Strasbourg, 2010.jpg" -
        rear left: the ramp, the roof rails, the turret left of centre.
     V1 "VBCI, ... '6094 0048', OURCQ 1918 photo-1.JPG" - DEAD SIDE-ON: THE VBCI TABLE.
        V2 "VBCI in the Musee des Blindes, France.JPG" - head on: the bow band with the lamp
        recesses, the turret left of centre.  V3 "VBCI 14juillet Metz.jpg" - front left.
        V4 "VBCI 06592.JPG" - the rear: ramp on the left, Galix launchers at the corners.
     G1 "GCT 155mm AUF1, ... '6854 0068', St Mihiel 1894, photo-1.JPG" - right side, three-tone.
        G2 "AMX AuF1.JPEG" - IFOR 1996, front right: the roof MG mount, the recoil cylinders.
     F1 "UAE Army Mk F3 155mm at IDEX 2023.jpg" - DEAD SIDE-ON: THE Mk F3 TABLE.  F2 "AMX-13-155mm
        img 2332.jpg" - head on, the spare wheel on the glacis.  F3 "Obus autopropulsado AMX-13
        155mm Ejercito de Venezuela.jpg" - rear right: the spades, the cradle.
     M1 "VAB Mephisto.JPEG" (Gulf, launcher up), M2 / M3 "Renault VAB (HOT) MEPHISTO in the Musee
        des Blindes pic1 / pic3" - three-quarter and head on.
     E1 "EBR cote.JPG" - near side-on: THE EBR TABLE.  E2 "EBR face.JPG" - head on.
     A1 "Panhard AML diagram.PNG" - side elevations: THE AML TABLE.  A2 "Panhard-AML-90-latrun-3.jpg".
     S1 "ERC-90 Sagaie img 2316.jpg" - near side-on, turret trained aft: THE ERC TABLE.
        S2 "ERC 90 Sagaie-1RCA-IMG 5582.jpg", S3 "Panhard ERC 90 ... '6844 0246', photo-1.JPG".
     C1 "French Caesar self-propelled howitzer in Iraq (cropped).jpg": THE CAESAR TABLE.
        C2 "French Army CAESAR self-propelled wheeled howitzer, 2021.jpg".
     B1 "Panhard VBL ... '6924 0057'.JPG" - head on.  B2 "Panhard VBL in the Musee des Blindes,
        France, pic-1.jpg" - front left.
     K1 "Crotale NG P1220851.jpg", K3 "Camion Crotale - Armee de l'air (14 juillet 2021).jpg".
     L1 "M270 LRU sur porte-chars (14 juillet 2021) (1).jpg".
   PUBLISHED (en.wikipedia raw): AMX-10 RC 9.15 m gun forward, 6.24 m hull, 2.78 m wide, 2.56 m;
     AMX-10P 5.778 x 2.78 x 1.87 m (hull), clearance 0.45 m; VBCI 7.6 x 2.98 x 3 m; AuF1 10.25 x
     3.15 x 3.25 m; Mk F3 6.22 x 2.72 x 2.085 m, 155 mm L/33; CAESAR 10 x 2.55 x 3.7 m, L/52; VAB
     5.98 x 2.49 x 2.06 m; EBR 6.15 x 2.42 x 2.24 m, clearance 0.34-0.42; AML 5.11 m (hull 3.79
     on the diagram's own scale) x 1.97 x 2.07 m, wheelbase 2.5 m, track 1.62 m; ERC 7.7 x 2.50 x
     2.25 m; VBL 3.80 x 2.02 x 1.70 m.

   SETTLING DRAWING / PHOTO / PUBLISHED (ratios at one station; evidence):
     AMX-10 RC: D1's side view meets BOTH published lengths at 130 px/m (hull 6.24, gun forward
       9.17 against 9.15); at that scale its front and plan views agree with each other on 2.97 m
       over the hull.  The published 2.78 m is not met: it is the AMX-10P's figure to the cm, and no
       head-on photograph of an RC was fetched to settle it - the drawing is drawn (NOT CONFIRMED).
       Height: D1 puts the turret roof 2.43 m, the sight block 2.53 m (published 2.56), the
       commander's sight head 2.86 m.
     AMX-10P: P1 read at the third wheel's station in wheel diameters D (deck 3.05 D + track, side
       plate's lower edge 0.70 D over the axle, pitch 1.15 D); along the hull through the
       perspective the photo gives 5.50 m at D = 0.59 against the published 5.778 - 5 % apart,
       within what a three-quarter view can be read to.  The published length and hull height are
       drawn (D = 0.60 vertical; the horizontal stations scaled to 5.78), the photo's ratios
       otherwise kept.
     VBCI: V1's hull at the published 7.60 m makes the tyres 1.26 m, the 14.00 R 20's own size:
       two figures agree at one scale.  The turret roof then stands 3.03 m (published 3 m).
     Mk F3: F1's wheel pitch and wheel diameter agree with fr_tanks.js's AMX-13 table (0.70 /
       0.61 m) at one scale (261 px/m); at it the hull is 4.42 m, the cradle top 1.90 m, muzzle to
       folded spades 4.6 m.  The published 6.22 m and 2.085 m are NOT met (the photo puts the muzzle
       BEHIND the nose; 6.22 is taken to be a firing length with the spades out), and the L/33 tube
       measures 4.1 m with its breech (NOT CONFIRMED: either the wheel scale or the tube).
     AuF1: G1 at the AMX-30 wheel pitch (0.93 m) horizontally and the published 3.25 m to the roof
       vertically (the photo's own vertical scale from the wheel diameter read 7-15 % high, a
       three-quarter view): turret rear X -2.59, roof front 0.56, gun axis 2.56 m.
     EBR: E1's 6.15 m (gun forward) and 2.24 m (to the turret roof, not the cupola) agree within 3 %
       at 170 px/m; the mean is drawn.  Tyres 1.28 m, the steel centre wheels 1.24 m.
     AML: A1 at the published 2.50 m wheelbase meets the hull (3.86 / 3.79), the length (5.13 /
       5.11) and the height (2.07 / 2.07).
     ERC: S1 at the published 5.27 m hull (162 px/m) puts the sight head 2.28 m (published 2.25);
       gun forward 7.69 m.
     CAESAR: C1 at the published 395/85 R 20 tyre (1.18 m) puts the truck 9.5 m, the cab roof
       3.38 m, the travel lock's fork top 3.86 m (published 3.7); 10.08 m long as drawn.
     VAB, VBL: no side-on photo found.  VAB: the published 5.98 x 2.49 x 2.06 m and the 3.0 m
       wheelbase (NOT CONFIRMED, from memory of the type) with M1-M3's proportions.  VBL: B1 head
       on at the published 2.02 m width gives every height; lengthwise the published 3.80 m and a
       2.45 m wheelbase (NOT CONFIRMED).
     PARKED STANCE: every row stands on its drawn wheels or tracks at the measured radii; no
       height was fitted by moving the hull.

   RECOGNITION (each drawn; source): RC - three big tyres evenly spaced, the full-width upper hull
     with the vees between the tyres, the trim vane on the glacis, the low wedge turret with the
     long 105 and its double-baffle brake, the two round fan grilles on the rear deck (D1);
     RCR - the bow armour box and the flat side slabs (R3).  AMX-10P - the long glacis, the slab
     sides with the straps, five wheels, front sprocket, high idler, the small Toucan with the
     20 mm carried outside, the round sight and the lamp (P1, P3).  VBCI - eight tyres with the
     long gap mid-way, the boat bow, the dark lower hull, the upper sides leaning in, the small
     Dragar turret left of centre, the Galix at the rear corners (V1-V4).  AuF1 - the huge box
     turret on the AMX-30, the four recoil cylinders round the tube, no brake, the roof MG mount
     (G1, G2).  Mk F3 - the gun on its cradle at the rear of the short AMX-13, the lockers along
     the deck, the double-baffle brake, the folded spades (F1-F3).  VAB - the boat hull, the two
     windscreens with lifted shutters, the Mephisto head with four HOT tubes (M1-M3).  EBR -
     four big tyres at the ends, four steel-grousered wheels between, the arched mudguards, the
     same bow at both ends, the FL-11 with its dome (E1, E2).  AML - two wheels under arched guards,
     the side door and louvred box, the low H-90 turret, the thin long 90 (A1, A2).  ERC - one
     front axle and a close rear pair, the front corner boxes with lamps, the long TS-90 turret
     with the long 90 (S1-S3).  CAESAR - the long armoured crew cab, the shell racks with round
     cells, the gun laid forward into the fork, the folded spade (C1, C2).  VBL - the tiny body
     with the front panel lamps, two windscreens, the engine louvres, the ring-mounted M2 (B1, B2).
   PAINT: French olive (#525230, fr_tanks.js's) on the rows of 1951-1985 and on the VAB; the
     Centre-Europe three-tone (green #3f5634, brown #5e4a37, black #25272a: P1 and R3 sampled,
     about 0.8 of level) on the 1990s and 2000s rows, as P1, R3, V1-V4, G1, C1, C2, B1 show it.
     NOT CONFIRMED: the date the three-tone reached each type (e80 rows are drawn olive; G2 shows
     an AuF1 in the three-tone in 1996).  The Gulf sand (R1, M1), the 2021 earth brown (R4, L1)
     and white UN schemes (B2) are not drawn.  No roundels, numbers, names or tactical signs.
     Team colour (C.team): small strips on a deck or turret roof of each.
   NOT CONFIRMED (proportion or judgement): RC - the turret ring's place (X -0.15), the turret
     section widths at the shoulder, the RCR sight box and slab joints.  AMX-10P - the turret's
     offset to the left (0.25 m) and its size, the trim vane (not drawn: no photo shows it), the
     sprocket and idler radii.  VBCI - the upper sides' lean (roof edge 1.22 m), the turret ring
     (X -0.35, 0.20 left), the sight head size, the stud rows.  AuF1 - the turret's widths (3.10 m
     over the sides), the left crew door (only the right seen), the cupola place.  Mk F3 - the
     scale (above), the idler height, the cradle and pedestal shape, the spades' size.  VAB -
     the axle places, the launcher column's place (X -0.45), the tube boxes' length, the side
     hatch.  EBR - the arch radii, the turret ring (X 0.06), the ends' shape below the deck.  AML -
     the hull widths, the cupola.  ERC - the turret ring (X 0.10, S1 shows the turret trained
     aft), the lower hull.  CAESAR - the gun's travel angle (0.08 rad) and cradle, the rack rows.
     VBL - the length stations, the tail.  Every hub, lamp and handle size.
   ENGINE (js/damage3d.js ENGINE_AT, not edited): fra_e60_recon and fra_e80_recon "rear" (listed:
     the AML and ERC engines are aft, grilles drawn on the rear decks - match); fra_e80/e90_spg
     "rear" (listed, AMX-30 - match); fra_e80_tankdestroyer "front" (listed, the VAB - match);
     the AMX-10 RC rows (lighttank: rear by role - match); the AMX-10P and VBCI (ifv: front by
     role, engines front right - match); the VBL, Mk F3, CAESAR and M270 rows (front by role -
     match); fra_e90_spaag (spaag: rear by role, the AMX-30 - match).  MISMATCHES TO REPORT:
     fra_e50_recon, the EBR, takes the recon default "front" but its flat-twelve lies under the
     fighting compartment in the middle of the hull; fra_e00_spaag (Crotale NG, not drawn) takes
     the spaag default "rear" but the air force fire unit is a trailer behind a front-engined truck.
   NODES: "turret" on every row (origin on the ring at the deck, gun along +X; the Mk F3 and
     CAESAR: the gun mount; the VBL: the M2's ring mount; the VAB: the Mephisto column, with a
     "podelev" group inside it at the tube boxes' trunnion, userData.el 0.06 rad and
     userData.cells the four tube mouths).  "roadwheel": one group per axle (both tyres) on the
     wheeled rows, one per road-wheel station (both sides) on the tracked.  The EBR's centre steel
     wheels are drawn as found in E1, just clear of the ground.
   AS DRAWN (dump.js L x W x H; tris; draw calls) against the published:
     EBR 6.20 x 2.46 x 2.45 m (turret roof 2.26, dome 2.43) / 6.15 x 2.42 x 2.24; 9056; 12.
     AML 5.14 x 2.05 x 2.07 / 5.11 x 1.97 x 2.07; 4892; 10.
     ERC 7.72 x 2.51 x 2.48 (sight 2.28, MG 2.48) / 7.7 x 2.50 x 2.25; 6780; 11.
     VBL 3.82 x 2.28 (mirrors; body 2.02) x 2.14 (MG; roof 1.65, ring 1.71) / 3.80 x 2.02 x 1.70; 4720; 8.
     AMX-10 RC 9.31 x 3.00 x 2.87 (sight head; roof 2.43) / 9.15 x 2.78 x 2.56; 7788; 11.
       RCR 9.31 x 3.12 (side slabs) x 2.87; 7920; 11.
     AMX-10P 6.10 (gun; hull 5.78) x 2.80 x 2.80 (lamp; roof 2.45) / 5.778 x 2.78 x 1.87 hull; 10832; 13.
     VBCI 7.86 (gun and Galix; hull 7.60) x 3.01 x 3.49 (sight head; roof 3.03) / 7.6 x 2.98 x 3; 9424; 12.
     Mk F3 5.03 x 2.58 x 1.95 / 6.22 x 2.72 x 2.085 (above); 11480; 10.
     AuF1 10.36 x 3.20 x 3.77 (MG; roof 3.25) / 10.25 x 3.15 x 3.25; 13196; 12.
     CAESAR 10.08 x 2.83 (mirrors) x 3.87 (fork) / 10 x 2.55 x 3.7; 7664; 10.
     VAB Mephisto 6.22 x 2.74 (mirrors) x 3.16 (launcher up) / 5.98 x 2.49 x 2.06; 5068; 11.
     Roland (reused) 6.94 x 3.12 x 4.37; 14426; 13.  M270 (reused) 7.00 x 3.02 x 2.55; 11264; 16.
   Model space: +X nose, +Y left, +Z up, metres, ground at z = 0.  ASCII only.  */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

/* ======================================================================= shared kit */
var HeroFrArmour2 = (function () {
  "use strict";
  var K = HeroFrKit, TAU = K.TAU, box = K.box, slab = K.slab, cyl = K.cyl, cylX = K.cylX, cylY = K.cylY, cylZ = K.cylZ;
  var prismY = K.prismY, loftN = K.loftN, ring = K.ring, Bin = K.Bin;

  /* ---------------------------------------------------------------- paints */
  /* French olive as fr_tanks.js takes it (A4 there: #666336 indoors -> #525230).  The
     Centre-Europe three-tone (green, brown, black) of the late 1980s on: sampled off the
     Saumur AMX-10P (P1, museum light: green #3c6b3e, brown #7a5f48, black #2a2d33) and the
     Metz AMX-10 RCR (R3, daylight), taken to about 0.8 of level. */
  var OLIVE = { base: "#525230", blots: ["#4a4a2b", "#5a5a37"], seed: 1981 };
  var CE3 = { base: "#3f5634", brown: "#5e4a37", black: "#25272a", seed: 1990 };
  var _camo = {};
  function rng(seed) { var s = seed >>> 0; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  /* the three-tone: big soft-edged blotches of brown and black over the green, the canvas
     wrapping (0.34 UV per metre: one tile is 2.94 m of hull) */
  function camoTex(THREE, P) {
    if (_camo[P.seed] !== undefined) return _camo[P.seed];
    var tx = null;
    try {
      var cv = document.createElement("canvas"), S = 512, q, R = rng(P.seed), i, k, x, y, n, a, r;
      cv.width = cv.height = S; q = cv.getContext("2d");
      q.fillStyle = P.base; q.fillRect(0, 0, S, S);
      function blob(col, cx, cy, rad) {
        q.fillStyle = col; q.beginPath();
        n = 9;
        for (k = 0; k <= n; k++) {
          a = k / n * TAU; r = rad * (0.65 + R() * 0.55);
          var px = cx + Math.cos(a) * r * 1.5, py = cy + Math.sin(a) * r * 0.8;
          if (k === 0) q.moveTo(px, py); else q.lineTo(px, py);
        }
        q.closePath();
        for (var dx = -S; dx <= S; dx += S) for (var dy = -S; dy <= S; dy += S) { q.save(); q.translate(dx, dy); q.fill(); q.restore(); }
      }
      for (i = 0; i < 6; i++) blob(P.brown, R() * S, R() * S, 55 + R() * 45);
      for (i = 0; i < 5; i++) blob(P.black, R() * S, R() * S, 35 + R() * 30);
      for (i = 0; i < 120; i++) {               /* grime and wear */
        q.fillStyle = (i % 3) ? "rgba(20,18,12,0.06)" : "rgba(235,230,205,0.05)";
        q.fillRect(R() * S, R() * S, 3 + R() * 40, 2 + R() * 26);
      }
      tx = new THREE.CanvasTexture(cv);
      tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
      if (THREE.sRGBEncoding !== undefined) tx.encoding = THREE.sRGBEncoding;
      tx.anisotropy = 4;
    } catch (e) { tx = null; }
    _camo[P.seed] = tx;
    return tx;
  }
  /* materials: HeroFrKit's (paint, dark, wheel, team), the paint re-mapped for the three-tone */
  function mats(THREE, C, scheme) {
    var T = K.materials(THREE, C, OLIVE), tx;
    if (scheme === "ce3") {
      tx = camoTex(THREE, CE3);
      T.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.05 });
      if (tx) T.paint.map = tx; else T.paint.color.set(CE3.base);
      T.base = CE3.base;
    }
    return T;
  }
  function bins(T) { var B = K.bins(T); B.vc = new Bin(T.wheel, false, true); return B; }
  function rgb(c, k) { return [parseInt(c.substr(1, 2), 16) / 255 * k, parseInt(c.substr(3, 2), 16) / 255 * k, parseInt(c.substr(5, 2), 16) / 255 * k]; }
  var RUBBER = [0.10, 0.104, 0.10], GLASS = [0.16, 0.20, 0.22], LAMP = [0.85, 0.82, 0.70], RED = [0.55, 0.08, 0.06];

  /* a lugged cross-country tyre on a steel disc wheel, axle along Y, centred on (0, y, 0):
     r radius, w width, s the outer side (+1 left, -1 right), hub the painted disc colour.
     The tread is a ring of alternating chevron lugs (every photo's Michelin XL pattern). */
  function tyre(W, y, r, w, s, hub, lugs) {
    var i, a, ca, sa, hw = w / 2, n = lugs || 22, rim = r * 0.56;
    W.col = RUBBER;
    cylY(W, 0, y - hw, y + hw, 0, r - 0.035, 24);
    /* shoulders rounded off: a narrower band each side */
    cyl(W, [0, y + s * hw, 0], [0, y + s * (hw + 0.025), 0], r - 0.06, rim + 0.03, 24);
    cyl(W, [0, y - s * hw, 0], [0, y - s * (hw + 0.02), 0], r - 0.06, rim + 0.03, 24);
    for (i = 0; i < n; i++) {
      a = (i + 0.5) / n * TAU; ca = Math.cos(a); sa = Math.sin(a);
      var off = (i % 2 ? 1 : -1) * hw * 0.28;
      slab(W, [ca * (r - 0.02), y + off, sa * (r - 0.02)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.03, hw * 0.62, r * 0.075);
    }
    /* the disc: dished, the bolt ring, the hub */
    var yo = y + s * (hw + 0.025);
    W.col = hub;
    cyl(W, [0, yo - s * 0.04, 0], [0, yo, 0], rim, rim * 0.92, 20);
    W.col = [hub[0] * 0.75, hub[1] * 0.75, hub[2] * 0.75];
    cyl(W, [0, yo, 0], [0, yo + s * 0.03, 0], rim * 0.55, rim * 0.45, 16);
    W.col = [0.2, 0.2, 0.19];
    for (i = 0; i < 8; i++) {
      a = i / 8 * TAU;
      cylY(W, Math.cos(a) * rim * 0.70, yo, yo + s * 0.018, Math.sin(a) * rim * 0.70, 0.022, 6);
    }
    W.col = hub;
    cylY(W, 0, yo + s * 0.03, yo + s * 0.05, 0, rim * 0.25, 10);
  }
  /* one "roadwheel" group per axle (both tyres; origin on the axle centre, axle along Y) */
  function axles(THREE, g, T, AX, zw, ty, r, w, hubk, lugs) {
    var i, W, wg, hub = rgb(T.base, hubk || 1.1);
    for (i = 0; i < AX.length; i++) {
      W = new Bin(T.wheel, false, true);
      tyre(W, ty, r, w, 1, hub, lugs);
      tyre(W, -ty, r, w, -1, hub, lugs);
      wg = K.group(THREE, "roadwheel", [AX[i], 0, zw]);
      K.flush(THREE, wg, { wheel: W });
      g.add(wg);
    }
  }
  /* a triangle or convex polygon plate in the XZ plane, from y0 to y1 */
  function plate(b, pts, y0, y1) { prismY(b, pts, Math.min(y0, y1), Math.max(y0, y1)); }
  function side(s, a, b) { return s > 0 ? [a, b] : [-b, -a]; }   /* a y-interval mirrored to side s */
  /* a lamp: a short cylinder along +X (or -X) with its lens */
  function lamp(B, x, y, z, r, dir, col) {
    cyl(B.paint, [x - dir * 0.08, y, z], [x, y, z], r * 1.1, r * 1.15, 10);
    B.vc.col = col || LAMP;
    cyl(B.vc, [x, y, z], [x + dir * 0.012, y, z], r, r, 10);
  }
  function turretGroup(THREE, g, TB, x, y, z) {
    var tg = K.group(THREE, "turret", [x, y, z]);
    K.flush(THREE, tg, TB, [x, y, z]);
    g.add(tg);
    return tg;
  }

  /* ================================================================ AMX-10 RC */
  /* THE AMX-10 RC TABLE (D1, side view: 130 px/m, X = (795 - px) / 130, Z = (429 - py) / 130;
     plan: Y = (py - 630) / 130, +Y the left).  Axles 1.50 / -0.15 / -1.75, tyres 1.32 m. */
  var RC = { AX: [1.50, -0.15, -1.75], ZW: 0.66, R: 0.66, TW: 0.42, TY: 1.20,
             NOSE: 3.09, REAR: -3.12, DECK: 1.71, HW: 1.485, LW: 0.97, BELLY: 0.36, ARCH: 1.43, VEE: 0.99,
             TX: -0.15, TZ: 1.74, GZ: 2.04 };
  function rcHull(B, renove) {
    var P = B.paint, D = B.dark, s, i, x, R = RC;
    /* the lower hull between the tyres: the belly, the lower nose plate raking back under the
       bow (D1 side), the lower rear plate */
    prismY(P, [[R.REAR, 0.72], [-2.30, 0.50], [-1.9, R.BELLY], [2.30, R.BELLY], [2.62, 0.62], [3.05, 1.30], [3.05, R.ARCH], [R.REAR, R.ARCH]], -R.LW, R.LW);
    /* the upper hull over the tyres, full width: from the arch line to the deck, the upper glacis
       running down to the bow from X 1.92 (D1) */
    function sec(x, zt, hw) { return [[x, -hw, R.ARCH], [x, hw, R.ARCH], [x, hw, zt - 0.03], [x, hw - 0.03, zt], [x, -hw + 0.03, zt], [x, -hw, zt - 0.03]]; }
    loftN(P, [sec(R.REAR, R.DECK - 0.02, R.HW - 0.02), sec(R.REAR + 0.06, R.DECK, R.HW), sec(1.92, R.DECK, R.HW), sec(R.NOSE, 1.36 + 0.03, R.HW - 0.06)]);
    for (s = -1; s <= 1; s += 2) {
      var yo = side(s, R.LW + 0.02, R.HW);
      /* the side plates below the arch line: the vees between the tyres (D1), the front and
         rear wedges where the side runs down to the lower nose and the lower rear */
      for (i = 0; i < 2; i++) {
        var xa = R.AX[i] - R.R - 0.08, xb = R.AX[i + 1] + R.R + 0.08, xm = (R.AX[i] + R.AX[i + 1]) / 2;
        plate(P, [[xa, R.ARCH + 0.01], [xb, R.ARCH + 0.01], [xm, R.VEE]], yo[0], yo[1]);
      }
      plate(P, [[R.NOSE, 1.36], [1.93, R.ARCH + 0.01], [2.62, 0.62]], yo[0], yo[1]);
      plate(P, [[R.REAR, R.ARCH + 0.01], [-2.45, R.ARCH + 0.01], [R.REAR, 0.72]], yo[0], yo[1]);
      /* the louvred grille high on the rear of the side (D1) */
      var yg = s > 0 ? [R.HW, R.HW + 0.012] : [-R.HW - 0.012, -R.HW];
      box(D, -2.85, -2.40, yg[0], yg[1], 1.12, 1.38);
      for (i = 0; i < 7; i++) box(P, -2.83 + i * 0.065, -2.80 + i * 0.065, yg[0] - 0.004, yg[1] + 0.004, 1.14, 1.36);
      /* the lamps in their guards at the front corners of the deck, and the rear lamp clusters
         (D1 front and rear views) */
      lamp(B, 2.05, s * 1.23, R.DECK + 0.08, 0.07, 1);
      box(D, 1.93, 2.12, s * 1.23 - 0.11, s * 1.23 + 0.11, R.DECK, R.DECK + 0.02);
      box(D, R.REAR - 0.10, R.REAR, s * 1.15 - 0.14, s * 1.15 + 0.14, 1.30, 1.55);
      B.vc.col = RED; box(B.vc, R.REAR - 0.105, R.REAR - 0.095, s * 1.15 - 0.10, s * 1.15 - 0.02, 1.38, 1.48);
      /* towing eyes, front and rear */
      box(D, 2.70, 2.86, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.78, 0.92);
      box(D, R.REAR - 0.14, R.REAR, s * 0.62 - 0.06, s * 0.62 + 0.06, 0.80, 0.92);
      /* the water-jet outlets low on the rear plate (en.wiki: twin water jets) */
      cylX(D, R.REAR - 0.04, R.REAR, s * 0.45, 0.95, 0.13, 0.13, 12);
    }
    /* glacis: the trim vane folded flat on it (D1 side and plan), the driver's hatch front left */
    var ang = Math.atan2(R.DECK - 1.36, R.NOSE - 1.92), u = [Math.cos(ang), 0, -Math.sin(ang)], w = [Math.sin(ang), 0, Math.cos(ang)];
    function gz(x) { return R.DECK - (x - 1.92) * Math.tan(ang); }
    if (!renove) {
      slab(P, [2.70, 0, gz(2.70) + 0.05], u, [0, 1, 0], w, 0.36, 1.40, 0.025);
      box(D, 3.02, 3.10, -1.38, 1.38, 1.34, 1.42);
    } else {
      /* the RCR's add-on bow armour: a faceted box over the glacis (R3) */
      loftN(D, [[[1.95, -1.30, 1.40], [1.95, 1.30, 1.40], [1.95, 1.30, 1.78], [1.95, -1.30, 1.78]],
                [[3.20, -1.38, 0.95], [3.20, 1.38, 0.95], [3.20, 1.38, 1.40], [3.20, -1.38, 1.40]]]);
      for (s = -1; s <= 1; s += 2) {
        var ya = side(s, R.HW, R.HW + 0.07);
        /* the flat applique slabs on the hull sides, their lower edge level at the tyre tops */
        box(P, -2.95, 1.90, ya[0], ya[1], 1.26, R.DECK - 0.02);
        for (i = 0; i < 4; i++) box(D, -2.30 + i * 1.10, -2.28 + i * 1.10, s > 0 ? ya[1] : ya[0] - 0.005, s > 0 ? ya[1] + 0.005 : ya[0], 1.28, R.DECK - 0.05);
      }
    }
    box(P, 1.45, 1.95, 0.18, 0.68, R.DECK, R.DECK + 0.05);
    for (i = 0; i < 3; i++) box(B.vc, 1.95, 1.97, 0.22 + i * 0.16, 0.34 + i * 0.16, R.DECK + 0.01, R.DECK + 0.045);
    /* the rear deck: the two round fan grilles of the engine (D1 plan), the access panels */
    for (s = -1; s <= 1; s += 2) {
      cylZ(D, -2.62, s * 0.56, R.DECK - 0.01, R.DECK + 0.02, 0.30, 20);
      for (i = 0; i < 5; i++) box(P, -2.86 + i * 0.12, -2.84 + i * 0.12, s * 0.56 - 0.26, s * 0.56 + 0.26, R.DECK + 0.02, R.DECK + 0.035);
      box(P, -2.00, -1.55, s * 0.95 - 0.25, s * 0.95 + 0.25, R.DECK, R.DECK + 0.03);
    }
    box(B.team, -3.00, -2.90, -0.85, 0.85, R.DECK, R.DECK + 0.015);
  }
  /* the turret (D1): a low faceted body, wedge-nosed, widest over the middle axle, the
     sides leaning in hard to a narrow roof, the bustle box at the rear */
  function rcTurret(B, renove) {
    var P = B.paint, D = B.dark, s, i, R = RC, Z0 = R.TZ;
    loftN(P, [ring(1.52, 1.86, 0.30, 2.04, 0.42, 2.24, 0.30),
              ring(1.10, Z0, 0.80, 2.02, 0.95, 2.36, 0.55),
              ring(0.70, Z0, 1.15, 2.05, 1.20, 2.42, 0.68),
              ring(-0.80, Z0, 1.24, 2.05, 1.28, 2.43, 0.70),
              ring(-1.50, Z0, 1.08, 2.05, 1.12, 2.40, 0.68),
              ring(-1.88, 1.80, 0.80, 2.05, 0.82, 2.36, 0.60)]);
    /* the mantlet collar and the 105 mm F2: its thermal sleeve, the bare tube with a joint
       band, the muzzle brake; 9.15 m gun forward puts the muzzle at X 6.05 (D1: 6.05) */
    cylX(P, 1.40, 1.70, 0, R.GZ, 0.20, 0.17, 16);
    cylX(P, 1.70, 2.56, 0, R.GZ, 0.105, 0.10, 14);
    for (i = 0; i < 3; i++) cylX(D, 1.85 + i * 0.25, 1.89 + i * 0.25, 0, R.GZ, 0.108, 0.108, 14);
    cylX(P, 2.56, 5.55, 0, R.GZ, 0.078, 0.072, 12);
    cylX(D, 3.90, 3.96, 0, R.GZ, 0.085, 0.085, 12);
    /* the double-baffle brake (D1 side and plan) */
    cylX(P, 5.55, 5.62, 0, R.GZ, 0.10, 0.10, 12);
    box(P, 5.62, 6.05, -0.15, 0.15, R.GZ - 0.075, R.GZ + 0.075);
    box(D, 5.72, 5.80, -0.155, 0.155, R.GZ - 0.06, R.GZ + 0.06);
    box(D, 5.90, 5.97, -0.155, 0.155, R.GZ - 0.06, R.GZ + 0.06);
    /* the coaxial MG and the sight windows on the turret front (D1 front view) */
    cylX(D, 1.20, 1.55, -0.38, R.GZ + 0.04, 0.03, 0.03, 8);
    box(P, 1.05, 1.32, 0.30, 0.62, 2.05, 2.30);
    B.vc.col = GLASS; box(B.vc, 1.32, 1.335, 0.36, 0.56, 2.10, 2.26);
    /* the commander's sight on its column, the hexagonal cupola on the right, the loader's
       hatch on the left (D1 plan and side) */
    cylZ(P, -0.42, -0.42, 2.40, 2.50, 0.34, 6);
    for (i = 0; i < 6; i++) { var a = (i + 0.5) / 6 * TAU; box(B.vc, -0.42 + Math.cos(a) * 0.30 - 0.04, -0.42 + Math.cos(a) * 0.30 + 0.04, -0.42 + Math.sin(a) * 0.30 - 0.04, -0.42 + Math.sin(a) * 0.30 + 0.04, 2.46, 2.51); }
    box(P, -0.15, 0.10, -0.35, -0.10, 2.40, 2.72);
    box(P, -0.20, 0.15, -0.40, -0.05, 2.72, 2.86);
    B.vc.col = GLASS; box(B.vc, 0.15, 0.16, -0.36, -0.09, 2.74, 2.83);
    cylZ(P, 0.35, 0.55, 2.40, 2.46, 0.27, 16);
    box(D, 0.10, 0.20, 0.45, 0.65, 2.46, 2.50);
    for (s = -1; s <= 1; s += 2) {
      /* smoke dischargers, a pair on each rear cheek, firing forward and out (D1) */
      for (i = 0; i < 2; i++) cyl(D, [-1.30 - i * 0.18, s * 0.92, 2.22], [-1.12 - i * 0.18, s * 1.05, 2.40], 0.06, 0.06, 10);
      /* the stowage rail along the turret side (D1 side) */
      box(D, -1.40, 0.10, s * 1.25 - 0.015, s * 1.25 + 0.015, 2.06, 2.09);
      for (i = 0; i < 5; i++) box(D, -1.30 + i * 0.32, -1.27 + i * 0.32, s * 1.24 - 0.015, s * 1.24 + 0.015, 1.92, 2.08);
    }
    /* the bustle box across the turret rear */
    box(P, -2.02, -1.85, -0.75, 0.75, 1.86, 2.30);
    if (renove) {
      /* the RCR's thermal sight box on the left of the roof (R3) */
      box(P, 0.55, 1.05, 0.55, 0.95, 2.40, 2.66);
      B.vc.col = GLASS; box(B.vc, 1.05, 1.06, 0.62, 0.88, 2.45, 2.60);
    }
    box(B.team, -1.30, -0.80, 0.15, 0.55, 2.43, 2.445);
  }
  function buildRC(THREE, C, scheme, renove) {
    var T = mats(THREE, C, scheme), g = new THREE.Group(), HB = bins(T), TB = bins(T);
    rcHull(HB, renove);
    K.flush(THREE, g, HB);
    axles(THREE, g, T, RC.AX, RC.ZW, RC.TY, RC.R, RC.TW, 1.1, 22);
    rcTurret(TB, renove);
    turretGroup(THREE, g, TB, RC.TX, 0, RC.TZ);
    return g;
  }

  /* ================================================================ AMX-10P */
  /* THE AMX-10P TABLE (P1, Saumur, left side, read through the perspective in road-wheel
     diameters D at the third wheel's station; see the header): front sprocket raised, five road
     wheels at an even pitch of 1.15 D, the idler high at the rear, no return rollers seen. */
  var TP = { NOSE: 2.89, REAR: -2.89, DECK: 1.87, SIDE: 0.78, BELLY: 0.45, HW: 1.39, LW: 0.98, GLX: 1.36, NZ: 1.04,
             TX: 0.05, TY: 0.25 };
  var TPG = { xw: [1.13, 0.42, -0.30, -1.01, -1.72], zw: 0.36, rw: 0.30, ty: 1.19, tw: 0.17,
              spr: { x: 1.91, z: 0.58, r: 0.27 }, idl: { x: -2.34, z: 0.75, r: 0.25 },
              rr: [], rrz: 0.9, rrr: 0.06, teeth: 11, pitch: 0.15 };
  function pHull(B) {
    var P = B.paint, D = B.dark, s, i, x, T = TP;
    /* the lower hull between the tracks: belly, the lower nose plate raking back, the rear */
    prismY(P, [[T.REAR, 0.60], [T.REAR + 0.15, T.BELLY], [2.30, T.BELLY], [T.NOSE, T.NZ], [T.NOSE, T.SIDE + 0.25], [T.REAR, T.SIDE + 0.25]], -T.LW, T.LW);
    /* the upper hull over the tracks: vertical sides from the side's lower edge to the roof, the
       long glacis from the nose up to the roof at X 1.36 (P1) */
    function sec(x, zb, zt, hw) { return [[x, -hw, zb], [x, hw, zb], [x, hw, zt - 0.03], [x, hw - 0.03, zt], [x, -hw + 0.03, zt], [x, -hw, zt - 0.03]]; }
    loftN(P, [sec(T.REAR, T.SIDE, T.DECK - 0.02, T.HW), sec(T.REAR + 0.05, T.SIDE, T.DECK, T.HW), sec(T.GLX, T.SIDE, T.DECK, T.HW),
              sec(T.NOSE - 0.04, T.NZ - 0.10, T.NZ + 0.02, T.HW - 0.05)]);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * T.HW;
      /* the stowage straps down the hull side (P1): thin cream strips */
      B.vc.col = [0.62, 0.60, 0.52];
      for (i = 0; i < 12; i++) {
        x = 1.15 - i * 0.29;
        box(B.vc, x - 0.02, x + 0.02, s > 0 ? yo : yo - 0.012, s > 0 ? yo + 0.012 : yo, 1.18, 1.62);
      }
      /* the lamp on its post at the glacis corners, the lower nose towing eyes */
      cylZ(D, 1.75, s * 1.20, 1.55, 1.72, 0.025, 6);
      box(P, 1.68, 1.86, s * 1.20 - 0.09, s * 1.20 + 0.09, 1.72, 1.86);
      B.vc.col = LAMP; box(B.vc, 1.86, 1.87, s * 1.20 - 0.06, s * 1.20 + 0.06, 1.75, 1.83);
      box(D, T.NOSE - 0.05, T.NOSE + 0.10, s * 0.50 - 0.06, s * 0.50 + 0.06, 0.78, 0.90);
      /* the tube rails along the roof edges over the troop compartment (P3) */
      box(D, -2.70, -0.70, s * 1.30 - 0.02, s * 1.30 + 0.02, T.DECK + 0.14, T.DECK + 0.17);
      for (i = 0; i < 5; i++) { x = -2.65 + i * 0.48; box(D, x - 0.02, x + 0.02, s * 1.30 - 0.02, s * 1.30 + 0.02, T.DECK, T.DECK + 0.15); }
      /* rear lamps */
      box(D, T.REAR - 0.06, T.REAR, s * 1.20 - 0.10, s * 1.20 + 0.10, 1.55, 1.70);
    }
    /* the glacis: the driver's hatch front left, the engine grille front right */
    var ang = Math.atan2(T.DECK - T.NZ, T.GLX - T.NOSE), u = [Math.cos(ang), 0, Math.sin(ang)];
    function gz(x) { return T.NZ + (T.NOSE - x) * (T.DECK - T.NZ) / (T.NOSE - T.GLX); }
    box(P, 0.85, 1.36, 0.25, 0.80, T.DECK, T.DECK + 0.06);
    for (i = 0; i < 3; i++) box(B.vc, 1.36, 1.38, 0.30 + i * 0.17, 0.42 + i * 0.17, T.DECK + 0.01, T.DECK + 0.05);
    for (i = 0; i < 6; i++) { x = 1.50 + i * 0.16; box(D, x, x + 0.08, -1.15, -0.25, gz(x + 0.04) - 0.01, gz(x + 0.04) + 0.02); }
    /* the roof: the two long troop hatches behind the turret, the rear ramp's frame */
    for (s = -1; s <= 1; s += 2) {
      box(P, -2.60, -1.00, s * 0.08, s * 0.62, T.DECK, T.DECK + 0.04);
      box(D, -1.85, -1.75, s * 0.12, s * 0.58, T.DECK + 0.04, T.DECK + 0.06);
    }
    box(P, T.REAR - 0.05, T.REAR, -0.85, 0.80, 0.55, 1.75);
    box(D, T.REAR - 0.07, T.REAR - 0.04, -0.85, 0.80, 0.55, 0.60);
    box(D, T.REAR - 0.08, T.REAR - 0.04, 0.40, 0.55, 1.10, 1.18);
    box(B.team, -0.85, -0.65, -0.90, 0.90, T.DECK, T.DECK + 0.015);
  }
  /* the Toucan turret (P1, P3): low, faceted, the 20 mm M693 carried outside on its front
     with the coaxial 7.62 beside it, the big round sight on the right, the lamp on the roof,
     two pairs of smoke dischargers on the front cheeks */
  function pTurret(B) {
    var P = B.paint, D = B.dark, s, i, Z0 = TP.DECK, cx = TP.TX, cy = TP.TY;
    function r8(x, z0, w0, z1, w1, z2, w2) { var q = ring(x, z0, w0, z1, w1, z2, w2); for (var k = 0; k < q.length; k++) q[k][1] += cy; return q; }
    cylZ(P, cx, cy, Z0, Z0 + 0.08, 0.80, 20);
    loftN(P, [r8(cx + 0.78, Z0 + 0.08, 0.45, 2.20, 0.50, 2.40, 0.36),
              r8(cx + 0.45, Z0 + 0.08, 0.72, 2.20, 0.74, 2.45, 0.52),
              r8(cx - 0.55, Z0 + 0.08, 0.72, 2.20, 0.74, 2.45, 0.52),
              r8(cx - 0.80, Z0 + 0.08, 0.52, 2.20, 0.55, 2.40, 0.40)]);
    /* the gun cradle on the front and the 20 mm barrel, about 2 m beyond it */
    var GZ = 2.22, gy = cy - 0.05;
    box(P, cx + 0.70, cx + 1.05, gy - 0.16, gy + 0.16, GZ - 0.14, GZ + 0.12);
    cylX(D, cx + 1.05, cx + 1.30, gy, GZ, 0.055, 0.05, 10);
    cylX(D, cx + 1.30, cx + 3.05, gy, GZ, 0.028, 0.026, 8);
    cylX(D, cx + 2.90, cx + 3.08, gy, GZ, 0.04, 0.04, 8);
    cylX(D, cx + 0.95, cx + 1.40, gy + 0.22, GZ - 0.05, 0.022, 0.02, 6);
    /* the round sight housing on the right rear of the roof and the lamp on top (P1) */
    cylX(P, cx - 0.40, cx + 0.05, cy - 0.45, 2.62, 0.17, 0.17, 14);
    box(P, cx - 0.35, cx, cy - 0.55, cy - 0.35, 2.42, 2.55);
    B.vc.col = GLASS; cylX(B.vc, cx + 0.05, cx + 0.06, cy - 0.45, 2.62, 0.13, 0.13, 14);
    cylZ(D, cx + 0.10, cy + 0.10, 2.45, 2.62, 0.03, 6);
    cylX(P, cx, cx + 0.22, cy + 0.10, 2.68, 0.10, 0.11, 12);
    B.vc.col = LAMP; cylX(B.vc, cx + 0.22, cx + 0.23, cy + 0.10, 2.68, 0.09, 0.09, 12);
    /* the hatches */
    cylZ(P, cx - 0.35, cy + 0.25, 2.45, 2.50, 0.22, 14);
    for (s = -1; s <= 1; s += 2) {
      /* smoke dischargers, two each side of the front, angled up and out */
      for (i = 0; i < 2; i++) cyl(D, [cx + 0.35 - i * 0.16, cy + s * 0.70, 2.20], [cx + 0.55 - i * 0.16, cy + s * 0.84, 2.38], 0.045, 0.045, 10);
    }
    box(B.team, cx - 0.70, cx - 0.55, cy - 0.30, cy + 0.30, 2.42, 2.435);
  }
  function buildP(THREE, C, scheme) {
    var T = mats(THREE, C, scheme), g = new THREE.Group(), HB = bins(T), TB = bins(T);
    pHull(HB);
    K.addRunning(HB, TPG);
    K.flush(THREE, g, HB);
    K.wheels(THREE, g, T, TPG);
    pTurret(TB);
    turretGroup(THREE, g, TB, TP.TX, TP.TY, TP.DECK);
    return g;
  }

  /* ================================================================ VBCI */
  /* THE VBCI TABLE (V1, dead side-on from the right, 137.6 px/m from the published 7.60 m
     hull, which makes the tyres 1.26 m, the 14.00 R 20 Michelin's own size: two figures agree
     at one scale; X = (px - 662) / 137.6, Z = (819 - py) / 137.6) */
  var VB = { AX: [2.43, 0.86, -0.97, -2.66], ZW: 0.63, R: 0.63, TW: 0.37, TY: 1.22,
             NOSE: 3.80, REAR: -3.80, DECK: 2.36, SIDE: 1.52, HW: 1.49, RW: 1.22, LW: 1.00, NZ: 1.75,
             TX: -0.35, TY2: 0.20, GZ: 2.70 };
  function vbHull(B) {
    var P = B.paint, D = B.dark, s, i, x, V = VB;
    /* the lower hull between the tyres, dark in every photo (V1-V3): belly, the lower nose
       plate raking back to under the bow, the lower rear */
    prismY(D, [[V.REAR, 0.75], [V.REAR + 0.25, 0.52], [2.90, 0.52], [3.29, 1.08], [V.NOSE - 0.02, V.NZ - 0.05], [V.NOSE - 0.02, V.SIDE], [V.REAR, V.SIDE]], -V.LW, V.LW);
    /* the upper hull: the side plates leaning in from the chine at 1.52 m to the roof edge, the
       long glacis down to the bow at 1.75 m (V1), the vertical rear */
    function sec(x, zt, w0, wt, zb) { return [[x, -w0, zb], [x, w0, zb], [x, w0, zb + 0.10], [x, wt, zt], [x, -wt, zt], [x, -w0, zb + 0.10]]; }
    loftN(P, [sec(V.REAR, V.DECK, V.HW, V.RW, V.SIDE), sec(2.09, V.DECK, V.HW, V.RW, V.SIDE), sec(V.NOSE, V.NZ + 0.05, V.HW - 0.04, V.HW - 0.10, V.SIDE)]);
    /* the bow's front band: the lamp recesses either side of the nose plate (V2) */
    for (s = -1; s <= 1; s += 2) {
      box(D, V.NOSE - 0.04, V.NOSE + 0.01, s * 0.85, s * 1.42, 1.52, 1.68);
      if (s < 0) box(D, V.NOSE - 0.04, V.NOSE + 0.01, -1.42, -0.85, 1.52, 1.68);
      lamp(B, V.NOSE - 0.02, s * 1.10, 1.60, 0.055, 1);
      B.vc.col = [0.75, 0.35, 0.08]; box(B.vc, V.NOSE - 0.03, V.NOSE + 0.005, s * 1.30 - 0.04, s * 1.30 + 0.04, 1.56, 1.64);
      /* the towing eyes on the lower nose plate */
      box(D, 3.30, 3.42, s * 0.45 - 0.06, s * 0.45 + 0.06, 1.05, 1.18);
      /* the convoy lamp and mirror posts at the bow corners (V2) */
      box(D, 2.95, 3.10, s * 1.30 - 0.07, s * 1.30 + 0.07, 1.95, 2.10);
      cylZ(D, 2.90, s * 1.38, 1.98, 2.35, 0.02, 6);
      /* the bolt heads of the add-on armour along the side (V1): a row of studs */
      var yo = s * (V.HW + 0.004);
      for (i = 0; i < 14; i++) { x = -3.55 + i * 0.52; box(D, x - 0.025, x + 0.025, s > 0 ? yo - 0.01 : yo - 0.01, s > 0 ? yo + 0.012 : yo + 0.01, 1.68, 1.73); }
      /* the Galix smoke launchers, three tubes at each rear corner of the roof (V4) */
      for (i = 0; i < 3; i++) cyl(D, [V.REAR + 0.25, s * 1.05, V.DECK + 0.05 + i * 0.12], [V.REAR + 0.20, s * 1.35, V.DECK + 0.12 + i * 0.12], 0.06, 0.06, 10);
      box(D, V.REAR + 0.10, V.REAR + 0.40, s * 0.95 - 0.08, s * 0.95 + 0.08, V.DECK, V.DECK + 0.40);
      /* rear lamps */
      B.vc.col = RED; box(B.vc, V.REAR - 0.02, V.REAR, s * 1.15 - 0.08, s * 1.15 + 0.08, 0.95, 1.05);
    }
    /* the rear: the ramp with its door on the left (V4), the stowage box on the right */
    box(P, V.REAR - 0.05, V.REAR, -0.05, 1.05, 0.80, 2.20);
    box(D, V.REAR - 0.07, V.REAR - 0.04, 0.15, 0.85, 1.00, 2.05);
    box(D, V.REAR - 0.25, V.REAR, -1.10, -0.20, 0.75, 1.35);
    /* the roof: the driver's hatch and periscopes front left, the engine grilles front right
       (V2), the troop hatches aft */
    box(P, 1.55, 2.05, 0.25, 0.85, V.DECK, V.DECK + 0.06);
    for (i = 0; i < 3; i++) box(B.vc, 2.05, 2.07, 0.30 + i * 0.18, 0.44 + i * 0.18, V.DECK + 0.01, V.DECK + 0.05);
    box(D, 0.80, 2.00, -1.10, -0.20, V.DECK - 0.01, V.DECK + 0.02);
    for (i = 0; i < 7; i++) box(P, 0.86 + i * 0.17, 0.92 + i * 0.17, -1.08, -0.22, V.DECK + 0.02, V.DECK + 0.035);
    for (s = -1; s <= 1; s += 2) box(P, -3.30, -1.90, s * 0.10, s * 0.75, V.DECK, V.DECK + 0.05);
    box(B.team, -3.55, -3.40, -0.90, 0.90, V.DECK, V.DECK + 0.015);
  }
  /* the Dragar one-man turret (V1, V2): a box with its front chamfered, the 25 mm M811 on the
     front, the coaxial MG, the sight head on the roof, smoke dischargers on the sides */
  function vbTurret(B) {
    var P = B.paint, D = B.dark, s, i, V = VB, cx = V.TX, cy = V.TY2, Z0 = V.DECK;
    cylZ(P, cx, cy, Z0, Z0 + 0.10, 0.85, 20);
    loftN(P, [[[cx + 0.82, cy - 0.45, Z0 + 0.10], [cx + 0.82, cy + 0.45, Z0 + 0.10], [cx + 0.60, cy + 0.55, 3.03], [cx + 0.60, cy - 0.55, 3.03]],
              [[cx + 0.30, cy - 0.70, Z0 + 0.10], [cx + 0.30, cy + 0.70, Z0 + 0.10], [cx + 0.30, cy + 0.66, 3.03], [cx + 0.30, cy - 0.66, 3.03]],
              [[cx - 0.86, cy - 0.70, Z0 + 0.10], [cx - 0.86, cy + 0.70, Z0 + 0.10], [cx - 0.86, cy + 0.66, 3.03], [cx - 0.86, cy - 0.66, 3.03]]]);
    /* the gun: the cradle on the front plate, the 25 mm barrel to X 2.35 (V1) */
    box(P, cx + 0.55, cx + 1.00, cy - 0.17, cy + 0.17, V.GZ - 0.14, V.GZ + 0.14);
    cylX(D, cx + 1.00, cx + 1.35, cy, V.GZ, 0.065, 0.06, 10);
    cylX(D, cx + 1.35, 2.35, cy, V.GZ, 0.035, 0.032, 8);
    cylX(D, 2.20, 2.37, cy, V.GZ, 0.045, 0.045, 8);
    cylX(D, cx + 0.80, cx + 1.25, cy + 0.30, V.GZ - 0.04, 0.025, 0.022, 6);
    /* the sight box and head on the roof (V1, V2), the hatch */
    box(P, cx - 0.40, cx + 0.25, cy - 0.45, cy - 0.10, 3.03, 3.22);
    box(P, cx - 0.10, cx + 0.12, cy - 0.40, cy - 0.15, 3.22, 3.48);
    B.vc.col = GLASS; box(B.vc, cx + 0.12, cx + 0.13, cy - 0.37, cy - 0.18, 3.28, 3.44);
    box(B.vc, cx + 0.25, cx + 0.26, cy - 0.42, cy - 0.13, 3.06, 3.18);
    cylZ(P, cx - 0.40, cy + 0.30, 3.03, 3.08, 0.25, 14);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 3; i++) cyl(D, [cx - 0.10 - i * 0.14, cy + s * 0.66, 2.75], [cx + 0.05 - i * 0.14, cy + s * 0.78, 2.90], 0.045, 0.045, 10);
    }
    box(B.team, cx - 0.80, cx - 0.62, cy - 0.40, cy + 0.40, 3.03, 3.045);
  }
  function buildVBCI(THREE, C) {
    var T = mats(THREE, C, "ce3"), g = new THREE.Group(), HB = bins(T), TB = bins(T);
    vbHull(HB);
    K.flush(THREE, g, HB);
    axles(THREE, g, T, VB.AX, VB.ZW, VB.TY, VB.R, VB.TW, 0.55, 24);
    vbTurret(TB);
    turretGroup(THREE, g, TB, VB.TX, VB.TY2, VB.DECK);
    return g;
  }

  /* ============================================ AuF1 (155 mm GCT on the AMX-30 hull) */
  /* the hull, running gear and wheels are HeroAMX30's (fr_tanks.js), built whole and its
     "turret" group taken off; the GCT turret is drawn here from G1 (side, the AMX-30 wheel pitch
     0.93 m as the horizontal scale, the published 3.25 m as the vertical) and G2. */
  var GC = { TX: -0.55, DECK: 1.52, BASE: 1.72, ROOF: 3.25, RX: -2.59, FX: 0.56, GZ: 2.56, MUZ: 6.96 };
  function named(root, name) { var r = null; root.traverse(function (o) { if (!r && o.name === name) r = o; }); return r; }
  function gctTurret(B) {
    var P = B.paint, D = B.dark, s, i, x, G = GC;
    cylZ(P, G.TX, 0, G.DECK, G.BASE + 0.02, 1.15, 24);
    loftN(P, [ring(G.RX, G.BASE, 1.45, 3.05, 1.55, G.ROOF, 1.38),
              ring(G.FX - 0.10, G.BASE, 1.45, 3.05, 1.55, G.ROOF, 1.38),
              ring(G.FX + 0.25, G.BASE, 1.42, 2.75, 1.50, 2.95, 1.30),
              ring(1.25, G.BASE + 0.08, 1.05, 2.25, 1.10, 2.45, 0.90)]);
    /* the cradle and its round housing at the front, the 155 mm 40-calibre tube with no brake
       (G1, G2): 10.25 m gun forward puts the muzzle at X 6.96 */
    cylY(P, 1.05, -0.42, 0.42, G.GZ, 0.36, 18);
    cylX(P, 1.05, 1.60, 0, G.GZ, 0.24, 0.20, 16);
    cylX(P, 1.60, G.MUZ - 0.25, 0, G.GZ, 0.115, 0.098, 14);
    cylX(P, G.MUZ - 0.25, G.MUZ, 0, G.GZ, 0.11, 0.11, 14);
    cylX(D, G.MUZ - 0.01, G.MUZ + 0.005, 0, G.GZ, 0.08, 0.08, 12);
    /* the four recoil cylinders, two above and two below the tube (G1, G2) */
    for (s = -1; s <= 1; s += 2) for (i = -1; i <= 1; i += 2) cylX(P, 1.30, 2.75, s * 0.17, G.GZ + i * 0.19, 0.065, 0.065, 10);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * 1.55;
      /* the crew door on each side (G1: right side; the left taken as the same) */
      box(D, -1.65, -0.55, s > 0 ? yo : yo - 0.012, s > 0 ? yo + 0.012 : yo, 1.95, 2.95);
      box(P, -1.60, -0.60, s > 0 ? yo + 0.005 : yo - 0.02, s > 0 ? yo + 0.02 : yo - 0.005, 2.00, 2.90);
      box(D, -0.80, -0.70, s > 0 ? yo + 0.02 : yo - 0.05, s > 0 ? yo + 0.05 : yo - 0.02, 2.40, 2.50);
      /* the hinge strips and the grab rails on the rear corners (G1) */
      box(D, G.RX + 0.10, G.RX + 0.14, s * 1.50, s * 1.56, 1.90, 3.10);
      /* smoke dischargers on the front cheeks */
      for (i = 0; i < 2; i++) cyl(D, [0.70 - i * 0.16, s * 1.32, 2.90], [0.88 - i * 0.16, s * 1.44, 3.05], 0.055, 0.055, 10);
    }
    /* the rear face: the two ammunition loading doors (G2) */
    for (s = -1; s <= 1; s += 2) box(D, G.RX - 0.012, G.RX, s * 0.10, s * 1.10, 1.95, 2.95);
    /* the roof: the commander's cupola and its AA machine-gun mount (G2), the hatch */
    cylZ(P, -0.10, 0.65, G.ROOF, G.ROOF + 0.14, 0.38, 18);
    for (i = 0; i < 6; i++) { var a = i / 6 * TAU; box(B.vc, -0.10 + Math.cos(a) * 0.36 - 0.03, -0.10 + Math.cos(a) * 0.36 + 0.03, 0.65 + Math.sin(a) * 0.36 - 0.03, 0.65 + Math.sin(a) * 0.36 + 0.03, G.ROOF + 0.05, G.ROOF + 0.10); }
    box(D, -0.15, -0.05, 0.60, 0.70, G.ROOF + 0.14, G.ROOF + 0.45);
    box(D, -0.35, 0.25, 0.58, 0.72, G.ROOF + 0.42, G.ROOF + 0.52);
    cylX(D, 0.25, 1.05, 0.65, G.ROOF + 0.47, 0.025, 0.022, 8);
    cylZ(P, -1.40, -0.60, G.ROOF, G.ROOF + 0.06, 0.30, 16);
    box(P, -2.30, -1.80, -0.40, 0.40, G.ROOF, G.ROOF + 0.10);
    box(B.team, -2.40, -2.10, -0.90, 0.10, G.ROOF, G.ROOF + 0.015);
  }
  function buildAuF1(THREE, M, C, scheme) {
    var g = HeroAMX30.build(THREE, M, C), old = named(g, "turret"), T = mats(THREE, C, scheme), TB = bins(T);
    if (old && old.parent) old.parent.remove(old);
    /* the hull's own painted material: re-mapped to the three-tone, or handed to the turret */
    var hp = null;
    g.traverse(function (o) { if (o.isMesh && o.material && o.material.map) { if (scheme === "ce3") o.material = T.paint; else hp = hp || o.material; } });
    if (hp) { T.paint = hp; TB = bins(T); }
    gctTurret(TB);
    turretGroup(THREE, g, TB, GC.TX, 0, GC.DECK);
    return g;
  }

  /* ================================================ 155 Mk F3 on the AMX-13 chassis */
  /* THE Mk F3 TABLE (F1, UAE, IDEX 2023, dead side-on from the left: 261 px/m from the AMX-13
     wheel pitch 0.70 m of fr_tanks.js, which the photo's wheel diameter 0.61 m agrees with;
     X = (667 - px) / 261, Z = (735 - py) / 261).  The hull is the AMX-13's shortened: nose at
     X 2.42 (the tank's 2.44), rear at -2.00 (the tank's -2.44); four return rollers. */
  var F3 = { NOSE: 2.42, REAR: -2.00, BELLY: 0.42, FEN: 1.09, DECK: 1.25, BOX: 1.44, HW: 1.255, LW: 0.85,
             TX: -1.58, TZ: 1.70, GZ: 1.63, MUZ: 2.10 };
  var F3G = { xw: [1.41, 0.70, 0.0, -0.71, -1.39], zw: 0.345, rw: 0.305, ty: 1.08, tw: 0.175,
              spr: { x: 2.02, z: 0.77, r: 0.29 }, idl: { x: -1.62, z: 0.52, r: 0.25 },
              rr: [1.02, 0.31, -0.41, -1.05], rrz: 0.90, rrr: 0.075, teeth: 12, pitch: 0.14 };
  function f3Hull(B) {
    var P = B.paint, D = B.dark, s, i, x, F = F3;
    /* lower hull and the rounded lower nose as the AMX-13's (fr_tanks.js M4, D1) */
    prismY(P, [[F.REAR, 0.55], [F.REAR + 0.18, F.BELLY], [1.95, F.BELLY], [2.30, 0.62], [F.NOSE, 0.74], [F.NOSE, F.FEN], [F.REAR, F.FEN]], -F.LW, F.LW);
    cylY(P, 2.10, -F.LW, F.LW, 0.66, 0.26, 18);
    function sec(x, top, hw) { return [[x, -hw, F.FEN], [x, hw, F.FEN], [x, hw, top - 0.03], [x, hw - 0.03, top], [x, -hw + 0.03, top], [x, -hw, top - 0.03]]; }
    loftN(P, [sec(F.REAR, F.DECK, F.HW - 0.02), sec(1.35, F.DECK, F.HW - 0.02), sec(F.NOSE - 0.02, F.FEN + 0.06, 1.00)]);
    for (s = -1; s <= 1; s += 2) {
      var yo = s * F.HW;
      /* the fenders, turned down over the sprocket (F1) */
      box(P, F.REAR, 2.05, Math.min(s * 0.98, yo), Math.max(s * 0.98, yo), F.FEN - 0.03, F.FEN + 0.01);
      prismY(P, [[2.05, F.FEN - 0.03], [F.NOSE, F.FEN - 0.10], [F.NOSE + 0.02, F.FEN - 0.30], [2.30, F.FEN - 0.10], [2.05, F.FEN + 0.01]],
             Math.min(s * 0.98, yo), Math.max(s * 0.98, yo));
      /* the long locker boxes along each side of the deck, X -1.35 to 1.64, with their lids
         and catches (F1, F2); the open gangway between them carries the gun in travel */
      var ya = s > 0 ? [0.55, F.HW] : [-F.HW, -0.55];
      box(P, -1.35, 1.64, ya[0], ya[1], F.DECK - 0.02, F.BOX);
      for (i = 0; i < 4; i++) { x = -1.20 + i * 0.75; box(D, x, x + 0.02, s > 0 ? F.HW : -F.HW - 0.01, s > 0 ? F.HW + 0.01 : -F.HW, F.FEN + 0.05, F.BOX - 0.02); }
      for (i = 0; i < 6; i++) { x = -1.00 + i * 0.48; box(D, x - 0.03, x + 0.03, s > 0 ? F.HW : -F.HW - 0.015, s > 0 ? F.HW + 0.015 : -F.HW, F.BOX - 0.10, F.BOX - 0.06); }
      /* the lamps in guards at the front corners, the towing eyes */
      K.lamps(B, 2.10, s * 0.92, F.DECK - 0.06, 1);
      box(D, F.NOSE - 0.05, F.NOSE + 0.08, s * 0.55 - 0.06, s * 0.55 + 0.06, 0.78, 0.90);
      /* the two spades hinged at the rear, folded up for travel (F1, F2) */
      var ys = s * 0.55;
      slab(P, [-2.22, ys, 1.05], [Math.cos(1.10), 0, -Math.sin(1.10)], [0, 1, 0], [Math.sin(1.10), 0, Math.cos(1.10)], 0.55, 0.36, 0.03);
      box(D, -2.08, -1.98, ys - 0.30, ys + 0.30, 0.50, 0.62);
      cylY(D, -2.03, ys - 0.38, ys + 0.38, 0.56, 0.05, 8);
    }
    /* the engine grille front right and the driver's hatch front left, as the AMX-13 */
    cylZ(D, 1.95, -0.55, F.DECK - 0.01, F.DECK + 0.03, 0.26, 18);
    box(P, 1.75, 2.15, 0.30, 0.80, F.DECK - 0.01, F.DECK + 0.05);
    /* the spare road wheel on the glacis (F2) */
    cylZ(P, 2.25, 0.0, 1.05, 1.13, 0.28, 16);
    box(B.team, -1.30, -1.00, 0.70, 1.10, F.BOX, F.BOX + 0.015);
  }
  /* the gun: the cradle on its pedestal at the hull rear, the 155 mm with recoil cylinders above
     and below, the double-baffle brake (F1), the breech behind the trunnion, the handwheels.
     "turret" origin on the pedestal at the deck, the gun along +X (+-20 deg traverse in life) */
  function f3Gun(B) {
    var P = B.paint, D = B.dark, s, i, F = F3, x0 = F.TX;
    box(P, x0 - 0.35, x0 + 0.35, -0.45, 0.45, F.DECK, F.TZ - 0.18);
    for (s = -1; s <= 1; s += 2) {
      prismY(P, [[x0 - 0.40, F.DECK], [x0 + 0.40, F.DECK], [x0 + 0.20, F.TZ + 0.18], [x0 - 0.25, F.TZ + 0.18]], s * 0.36, s * 0.44);
      cylY(D, x0, s * 0.44, s * 0.50, F.TZ, 0.10, 12);
      /* the elevating and traversing handwheels on the left side (F1) */
      if (s > 0) { cylY(D, x0 + 0.30, 0.52, 0.55, F.TZ - 0.25, 0.16, 14); cylY(P, x0 + 0.30, 0.44, 0.52, F.TZ - 0.25, 0.04, 8); }
    }
    /* the cradle block round the breech end, the breech ring behind the trunnion */
    box(P, x0 - 0.40, x0 + 0.55, -0.30, 0.30, F.GZ - 0.18, F.GZ + 0.25);
    cylX(P, x0 - 0.62, x0 - 0.40, 0, F.GZ, 0.20, 0.20, 14);
    /* the tube, thick at the breech end, to the muzzle at X 2.10 (F1) */
    cylX(P, x0 + 0.55, 1.75, 0, F.GZ, 0.12, 0.095, 14);
    cylX(P, 1.75, 1.80, 0, F.GZ, 0.105, 0.105, 14);
    box(P, 1.80, F.MUZ, -0.13, 0.13, F.GZ - 0.085, F.GZ + 0.085);
    box(D, 1.86, 1.93, -0.135, 0.135, F.GZ - 0.07, F.GZ + 0.07);
    box(D, 1.98, 2.05, -0.135, 0.135, F.GZ - 0.07, F.GZ + 0.07);
    /* the recoil cylinders: two above the tube, one below (F1, F2) */
    for (s = -1; s <= 1; s += 2) cylX(P, x0 + 0.40, 0.70, s * 0.12, F.GZ + 0.20, 0.05, 0.05, 10);
    cylX(P, x0 + 0.40, 0.05, 0, F.GZ - 0.19, 0.06, 0.06, 10);
    /* the sight bracket arch over the cradle (F1) */
    box(D, x0 + 0.70, x0 + 0.74, -0.30, 0.30, F.GZ + 0.25, F.GZ + 0.29);
    for (s = -1; s <= 1; s += 2) box(D, x0 + 0.70, x0 + 0.74, s * 0.28 - 0.02, s * 0.28 + 0.02, F.GZ, F.GZ + 0.29);
  }
  function buildMkF3(THREE, C) {
    var T = mats(THREE, C, "olive"), g = new THREE.Group(), HB = bins(T), TB = bins(T);
    f3Hull(HB);
    K.addRunning(HB, F3G);
    K.flush(THREE, g, HB);
    K.wheels(THREE, g, T, F3G);
    f3Gun(TB);
    turretGroup(THREE, g, TB, F3.TX, 0, F3.DECK);
    return g;
  }

  /* ================================================================ VAB Mephisto */
  /* VAB 4x4 (published 5.98 x 2.49 x 2.06 m): the boat hull with the chine at its widest, the
     lower hull tucked in under it (M1, M2, M3), the cab with the two windscreens and their
     armoured shutters lifted (M3), the troop box behind; the Mephisto launcher raised on its
     column, two boxes of two HOT tubes either side of the sight head (M1, M3). */
  var VA = { AX: [1.69, -1.31], ZW: 0.58, R: 0.58, TW: 0.36, TY: 1.02,
             NOSE: 2.99, REAR: -2.99, CH: 1.10, HW: 1.245, ROOF: 1.95, RW: 0.95, LW: 0.80, BELLY: 0.42,
             TX: -0.45, PX: -0.55, PZ: 2.62 };
  function vaHull(B) {
    var P = B.paint, D = B.dark, s, i, x, V = VA;
    /* the lower hull: from the chine in to the belly, the lower nose plate raking back */
    function lo(x, zt, wt, zb, wb) { return [[x, -wb, zb], [x, wb, zb], [x, wt, zt], [x, -wt, zt]]; }
    loftN(P, [lo(V.REAR, V.CH, V.HW - 0.05, 0.75, V.LW), lo(V.REAR + 0.40, V.CH, V.HW, V.BELLY, V.LW), lo(2.40, V.CH, V.HW, V.BELLY, V.LW),
              lo(V.NOSE, V.CH, V.HW - 0.10, 0.62, V.LW - 0.10)]);
    /* the upper hull: the sides leaning in from the chine to the roof edge; the flat front
       deck, the windscreen face, the cab and box roofs as one */
    function up(x, zt, wt) { return [[x, -V.HW, V.CH], [x, V.HW, V.CH], [x, wt, zt], [x, -wt, zt]]; }
    loftN(P, [up(V.REAR, V.ROOF, V.RW), up(1.85, V.ROOF, V.RW), up(2.20, 1.42, V.RW + 0.12), up(V.NOSE, 1.16, V.HW - 0.12)]);
    for (s = -1; s <= 1; s += 2) {
      /* the windscreens, the armoured shutters lifted above them (M3) */
      var a = Math.atan2(V.ROOF - 1.42, 2.20 - 1.85), u = [Math.cos(a), 0, Math.sin(a)];
      B.vc.col = GLASS;
      slab(B.vc, [2.03 + Math.sin(a) * 0.012, s * 0.46, 1.68 + Math.cos(a) * 0.012], [-Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [Math.sin(a), 0, Math.cos(a)], 0.20, 0.38, 0.008);
      slab(D, [2.02, s * 0.46, 2.00], [1, 0, 0.12], [0, 1, 0], [-0.12, 0, 1], 0.22, 0.42, 0.015);
      /* mirrors on their arms at the cab corners */
      box(D, 1.95, 2.05, s * 1.15 - 0.02, s * 1.15 + 0.02, 1.60, 1.90);
      box(D, 1.97, 2.03, s * 1.30 - 0.12, s * 1.30 + 0.02 * s, 1.70, 1.92);
      /* headlamps in their wire guards low on the nose corners (M2, M3) */
      lamp(B, 2.78, s * 0.98, 0.78, 0.08, 1);
      box(D, 2.75, 2.92, s * 0.98 - 0.13, s * 0.98 + 0.13, 0.66, 0.68);
      /* side lamps at the cab corners, towing shackles on the nose */
      lamp(B, 2.15, s * 1.05, 1.42, 0.06, 1);
      box(D, V.NOSE - 0.12, V.NOSE + 0.04, s * 0.65 - 0.05, s * 0.65 + 0.05, 0.62, 0.78);
      /* the side hatch on the troop box (M2) */
      var yh = s * (V.HW - 0.02);
      box(D, -1.15, -0.55, s > 0 ? yh - 0.06 : yh, s > 0 ? yh : yh + 0.06, 0.60, 1.08);
      /* the water-jet housings under the stern corners (M1) */
      cylX(D, V.REAR - 0.05, V.REAR + 0.55, s * 0.75, 0.80, 0.20, 0.20, 14);
      /* rear lamps */
      B.vc.col = RED; box(B.vc, V.REAR - 0.02, V.REAR, s * 0.95 - 0.06, s * 0.95 + 0.06, 1.55, 1.65);
    }
    /* the front deck: the driver's and commander's hatch plates, the grille between (M3) */
    box(P, 2.25, 2.70, -0.75, -0.10, 1.30, 1.36);
    box(D, 2.25, 2.70, 0.05, 0.55, 1.31, 1.35);
    /* the rear doors */
    box(D, V.REAR - 0.02, V.REAR + 0.01, -0.55, 0.55, 0.85, 1.85);
    box(P, V.REAR - 0.04, V.REAR, -0.50, -0.02, 0.90, 1.80);
    box(P, V.REAR - 0.04, V.REAR, 0.02, 0.50, 0.90, 1.80);
    /* the stowage basket on the rear roof left, the tube rack, the exhaust (M1, M2) */
    box(D, -2.80, -1.70, 0.55, 0.92, V.ROOF, V.ROOF + 0.03);
    for (i = 0; i < 5; i++) { x = -2.78 + i * 0.27; box(D, x, x + 0.02, 0.55, 0.92, V.ROOF, V.ROOF + 0.25); }
    box(D, -2.80, -1.70, 0.90, 0.92, V.ROOF + 0.22, V.ROOF + 0.25);
    box(P, -2.70, -1.85, 0.60, 0.88, V.ROOF + 0.02, V.ROOF + 0.20);
    for (i = 0; i < 4; i++) cyl(D, [-2.95, -0.95 + i * 0.13, V.ROOF - 0.05], [-3.15, -0.95 + i * 0.13, V.ROOF + 0.25], 0.05, 0.05, 8);
    /* the launcher's well and its sliding lid on the roof behind the cab */
    box(D, -1.30, 0.40, -0.80, 0.80, V.ROOF - 0.01, V.ROOF + 0.02);
    box(B.team, -2.85, -2.60, -0.80, 0.30, V.ROOF, V.ROOF + 0.015);
  }
  /* the Mephisto launcher: "turret" the column and head (trains), "podelev" the tube boxes
     on their trunnion at the head (pitches; userData.cells the four tube mouths) */
  function vaColumn(B) {
    var P = B.paint, D = B.dark, V = VA;
    box(P, V.TX - 0.22, V.TX + 0.22, -0.22, 0.22, V.ROOF, V.PZ - 0.10);
    box(D, V.TX - 0.35, V.TX + 0.35, -0.30, 0.30, V.ROOF, V.ROOF + 0.12);
    box(P, V.TX - 0.30, V.TX + 0.30, -0.75, 0.75, V.PZ - 0.10, V.PZ - 0.02);
    /* the sight head between the boxes (M1, M3) */
    box(P, V.TX - 0.10, V.TX + 0.30, -0.13, 0.13, V.PZ - 0.02, V.PZ + 0.38);
    B.vc.col = GLASS;
    cylX(B.vc, V.TX + 0.30, V.TX + 0.31, -0.05, V.PZ + 0.25, 0.05, 0.05, 10);
    cylX(B.vc, V.TX + 0.30, V.TX + 0.31, 0.06, V.PZ + 0.12, 0.035, 0.035, 10);
  }
  function vaPods(B, cells) {
    var P = B.paint, D = B.dark, s, k, V = VA, x0 = V.PX - 0.55, x1 = V.PX + 0.85, zc = V.PZ + 0.20;
    for (s = -1; s <= 1; s += 2) {
      var yc = s * 0.42;
      box(P, x0, x1, yc - 0.21, yc + 0.21, zc - 0.17, zc + 0.17);
      /* the hinged lid over each box (M1, M3) */
      slab(P, [x1 - 0.30, yc, zc + 0.22], [0.96, 0, 0.28], [0, 1, 0], [-0.28, 0, 0.96], 0.35, 0.23, 0.012);
      for (k = -1; k <= 1; k += 2) {
        var y = yc + k * 0.095;
        B.dark && cylX(D, x1 - 0.005, x1 + 0.005, y, zc, 0.075, 0.075, 12);
        cells.push([x1 + 0.01, y, zc, x0]);
      }
    }
  }
  function buildVAB(THREE, C) {
    var T = mats(THREE, C, "olive"), g = new THREE.Group(), HB = bins(T), TB = bins(T), EB = bins(T), cells = [], tg, pg;
    vaHull(HB);
    K.flush(THREE, g, HB);
    axles(THREE, g, T, VA.AX, VA.ZW, VA.TY, VA.R, VA.TW, 1.1, 22);
    vaColumn(TB);
    tg = turretGroup(THREE, g, TB, VA.TX, 0, VA.ROOF);
    vaPods(EB, cells);
    pg = K.group(THREE, "podelev", [VA.PX - VA.TX, 0, VA.PZ - VA.ROOF]);
    K.flush(THREE, pg, EB, [VA.PX, 0, VA.PZ]);
    for (var i = 0; i < cells.length; i++) { cells[i][0] -= VA.PX; cells[i][2] -= VA.PZ; cells[i][3] -= VA.PX; }
    pg.userData.el = 0.06;
    pg.userData.cells = cells;
    tg.add(pg);
    return g;
  }

  /* ================================================================ Panhard EBR */
  /* THE EBR TABLE (E1, near side-on: 170 px/m, the mean of the published 6.15 m gun forward
     (167.5) and 2.24 m to the turret roof (172), which agree within 3 % at one scale;
     X = (602 - px) / 170, Z = (675 - py) / 170).  The hull is the same at both ends (a driver at
     each); the gun end is +X. */
  var EB = { AX: [2.36, 0.78, -0.78, -2.36], ZW: 0.63, R: 0.64, TW: 0.34, TY: 0.98, RI: 0.62,
             END: 2.95, DECK: 1.56, CH: 1.21, BELLY: 0.42, HW: 1.00, FW: 1.21, TX: 0.06, GZ: 1.85, MUZ: 3.12 };
  /* an EBR steel centre wheel: the aluminium disc with the steel grousers between rubber blocks
     round its rim (E1; en.wiki "aluminum rims with steel grousers") */
  function ebrSteel(W, y, r, w, s, col) {
    var i, a, ca, sa, hw = w / 2, n = 18;
    W.col = col;
    cylY(W, 0, y - hw, y + hw, 0, r - 0.05, 24);
    W.col = RUBBER;
    cylY(W, 0, y - hw * 0.9, y + hw * 0.9, 0, r - 0.035, 24);
    W.col = [col[0] * 0.8, col[1] * 0.8, col[2] * 0.8];
    for (i = 0; i < n; i++) {
      a = i / n * TAU; ca = Math.cos(a); sa = Math.sin(a);
      slab(W, [ca * (r - 0.03), y, sa * (r - 0.03)], [ca, 0, sa], [0, 1, 0], [-sa, 0, ca], 0.035, hw * 1.02, 0.035);
    }
    W.col = col;
    var yo = y + s * hw;
    cyl(W, [0, yo, 0], [0, yo + s * 0.03, 0], r - 0.06, r * 0.30, 22);
    W.col = [col[0] * 0.7, col[1] * 0.7, col[2] * 0.7];
    for (i = 0; i < 10; i++) { a = i / 10 * TAU; cylY(W, Math.cos(a) * r * 0.62, yo, yo + s * 0.02, Math.sin(a) * r * 0.62, 0.02, 6); }
    W.col = col;
    cylY(W, 0, yo + s * 0.02, yo + s * 0.08, 0, r * 0.18, 12);
  }
  function ebHull(B) {
    var P = B.paint, D = B.dark, s, i, k, E = EB;
    /* the hull body, the same at both ends: each end a vertical-ridged bow (E2) drawn as a
       narrow end section */
    function sec(x, zb, wb, zt, wt) { return [[x, -wb, zb], [x, wb, zb], [x, wt, zt], [x, -wt, zt]]; }
    loftN(P, [sec(-E.END, 0.80, 0.30, 1.30, 0.05), sec(-2.55, 0.50, 0.70, 1.52, 0.85), sec(-2.20, E.BELLY, 0.75, E.DECK, 0.98),
              sec(2.20, E.BELLY, 0.75, E.DECK, 0.98), sec(2.55, 0.50, 0.70, 1.52, 0.85), sec(E.END, 0.80, 0.30, 1.30, 0.05)]);
    /* the deck plate at fender height, full width between the wheel arches (E1) */
    box(P, -1.55, 1.55, -E.FW, E.FW, E.CH, E.DECK - 0.10);
    for (s = -1; s <= 1; s += 2) {
      for (k = -1; k <= 1; k += 2) {
        /* the big mudguards over the outer wheels: an arched shell and its outer side plate
           down to the lip (E1, E2) */
        var xc = k * 2.36, n = 8, R = E.R + 0.10, ya = s > 0 ? 0.72 : -E.FW, yb = s > 0 ? E.FW : -0.72;
        for (i = 0; i < n; i++) {
          var a0 = (0.10 + i / n * 0.80) * Math.PI, a1 = (0.10 + (i + 1) / n * 0.80) * Math.PI;
          var p0 = [xc + Math.cos(a0) * R, E.ZW + Math.sin(a0) * R], p1 = [xc + Math.cos(a1) * R, E.ZW + Math.sin(a1) * R];
          K.belt(P, p0[0], p0[1], p1[0], p1[1], ya, yb, 0.04);
          plate(P, [[p0[0], p0[1]], [p1[0], p1[1]], [p1[0], E.DECK - 0.05], [p0[0], E.DECK - 0.05]], s * (E.FW - 0.03), s * E.FW);
        }
        /* the round cover on the fender side, the lamp on the end (E1, E2) */
        cylY(D, k * 1.55, s * E.FW, s * (E.FW + 0.02), 1.30, 0.13, 14);
        lamp(B, k * 2.62, s * 0.45, 1.36, 0.075, k);
      }
      /* the side between the arches: the hull's side plate down to the chine, the belly below
         set in (E1) */
      box(P, -1.55, 1.55, s > 0 ? E.HW - 0.02 : -E.HW, s > 0 ? E.HW : -E.HW + 0.02, 0.62, E.CH);
    }
    /* each end: the driver's vision block over the bow (E2) and the lower nose box */
    for (k = -1; k <= 1; k += 2) {
      box(P, k * 2.55 - 0.15, k * 2.55 + 0.15, -0.30, 0.30, 0.55, 0.90);
      box(D, k * 2.30 - 0.10, k * 2.30 + 0.10, -0.25, 0.25, E.DECK - 0.02, E.DECK + 0.06);
    }
    /* the stowage rack on the deck behind the turret (E1) */
    box(D, -1.45, -0.90, -0.70, 0.70, E.DECK + 0.20, E.DECK + 0.23);
    for (i = 0; i < 4; i++) box(D, -1.45 + i * 0.17, -1.43 + i * 0.17, -0.70, 0.70, E.DECK, E.DECK + 0.22);
    box(B.team, 1.40, 1.70, -0.60, 0.60, E.DECK, E.DECK + 0.015);
  }
  /* the FL-11 oscillating turret (E1, E2): the low conical lower turret on the ring, the upper
     turret carrying the gun on its trunnions, the domed cupola; drawn level */
  function ebTurret(B) {
    var P = B.paint, D = B.dark, s, E = EB, x0 = E.TX;
    cyl(P, [x0, 0, E.DECK], [x0, 0, 1.80], 0.95, 0.78, 24);
    loftN(P, [ring(x0 + 0.92, 1.72, 0.24, 1.90, 0.28, 2.00, 0.20),
              ring(x0 + 0.45, 1.74, 0.60, 2.05, 0.62, 2.24, 0.42),
              ring(x0 - 0.45, 1.74, 0.62, 2.05, 0.62, 2.26, 0.45),
              ring(x0 - 0.75, 1.80, 0.45, 2.02, 0.45, 2.18, 0.32)]);
    for (s = -1; s <= 1; s += 2) cylY(P, x0 + 0.10, s * 0.62, s * 0.74, 1.85, 0.14, 12);
    /* the cupola dome (E1, E2) with its vision slits */
    cylZ(P, x0 - 0.05, 0.10, 2.20, 2.30, 0.33, 18);
    cyl(P, [x0 - 0.05, 0.10, 2.30], [x0 - 0.05, 0.10, 2.43], 0.31, 0.15, 18);
    for (s = 0; s < 5; s++) { var a = (s / 5 - 0.4) * Math.PI; box(B.vc, x0 - 0.05 + Math.cos(a) * 0.31 - 0.03, x0 - 0.05 + Math.cos(a) * 0.31 + 0.03, 0.10 + Math.sin(a) * 0.31 - 0.05, 0.10 + Math.sin(a) * 0.31 + 0.05, 2.33, 2.36); }
    /* the 75 mm SA 49: sleeve at the collar, the tube, the muzzle brake (E1) */
    cylX(P, x0 + 0.85, x0 + 1.15, 0, E.GZ, 0.12, 0.10, 14);
    cylX(P, x0 + 1.15, E.MUZ - 0.22, 0, E.GZ, 0.062, 0.058, 12);
    cylX(P, E.MUZ - 0.22, E.MUZ, 0, E.GZ, 0.095, 0.095, 12);
    box(D, E.MUZ - 0.17, E.MUZ - 0.05, -0.10, 0.10, E.GZ - 0.06, E.GZ + 0.06);
    /* smoke dischargers on the upper turret's sides (E1) */
    for (s = -1; s <= 1; s += 2) cyl(D, [x0 + 0.10, s * 0.55, 2.00], [x0 + 0.28, s * 0.68, 2.16], 0.05, 0.05, 10);
    box(B.team, x0 - 0.60, x0 - 0.45, -0.25, 0.25, 2.18, 2.195);
  }
  function buildEBR(THREE, C) {
    var T = mats(THREE, C, "olive"), g = new THREE.Group(), HB = bins(T), TB = bins(T), i, W, wg, hub = rgb(T.base, 1.1);
    ebHull(HB);
    K.flush(THREE, g, HB);
    for (i = 0; i < 4; i++) {
      W = new Bin(T.wheel, false, true);
      if (i === 0 || i === 3) { tyre(W, EB.TY, EB.R, EB.TW, 1, hub, 22); tyre(W, -EB.TY, EB.R, EB.TW, -1, hub, 22); }
      else { ebrSteel(W, EB.TY - 0.02, EB.RI, EB.TW, 1, hub); ebrSteel(W, -EB.TY + 0.02, EB.RI, EB.TW, -1, hub); }
      wg = K.group(THREE, "roadwheel", [EB.AX[i], 0, i === 0 || i === 3 ? EB.ZW : EB.ZW + 0.03]);
      K.flush(THREE, wg, { wheel: W });
      g.add(wg);
    }
    ebTurret(TB);
    turretGroup(THREE, g, TB, EB.TX, 0, EB.DECK);
    return g;
  }

  /* ================================================================ AML-90 */
  /* THE AML TABLE (A1, the side elevation of the AML-90 in "Panhard AML diagram.PNG": the
     published 2.50 m wheelbase = 271 px, 108.4 px/m; that scale gives the hull 3.86 m (published
     3.79), muzzle to tail 5.13 m (5.11) and the sight top 2.07 m (2.07): four figures agree.
     X = (1047.5 - px) / 108.4, Z = (709 - py) / 108.4) */
  var AM = { AX: [1.25, -1.25], ZW: 0.48, R: 0.47, TW: 0.28, TY: 0.81,
             NOSE: 1.82, REAR: -2.03, DECK: 1.44, CH: 1.00, BELLY: 0.41, HW: 0.82, RW: 0.68, FW: 0.97,
             TX: -0.45, ROOF: 1.88, GZ: 1.61, MUZ: 3.09 };
  function amHull(B) {
    var P = B.paint, D = B.dark, s, i, k, A = AM;
    /* the hull: a box with the upper sides leaning in, the glacis from the nose up to the deck,
       the rear plate (A1, A2) */
    function sec(x, zb, wb, zc, wc, zt, wt) { return [[x, -wb, zb], [x, wb, zb], [x, wc, zc], [x, wt, zt], [x, -wt, zt], [x, -wc, zc]]; }
    loftN(P, [sec(A.REAR, 0.70, A.HW - 0.10, A.CH, A.HW, A.DECK - 0.08, A.RW), sec(A.REAR + 0.25, A.BELLY, A.HW - 0.10, A.CH, A.HW, A.DECK, A.RW),
              sec(0.80, A.BELLY, A.HW - 0.10, A.CH, A.HW, A.DECK, A.RW), sec(A.NOSE - 0.15, 0.55, A.HW - 0.20, A.CH, A.HW - 0.05, 1.06, A.HW - 0.10)]);
    for (s = -1; s <= 1; s += 2) {
      for (k = 0; k < 2; k++) {
        /* the curved mudguards over each wheel, out to the tyres' width (A1, A2) */
        var xc = A.AX[k], n = 7, R = A.R + 0.10, ya = s > 0 ? A.HW - 0.02 : -A.FW, yb = s > 0 ? A.FW : -A.HW + 0.02;
        for (i = 0; i < n; i++) {
          var a0 = (0.02 + i / n * 0.96) * Math.PI, a1 = (0.02 + (i + 1) / n * 0.96) * Math.PI;
          K.belt(P, xc + Math.cos(a0) * R, A.ZW + Math.sin(a0) * R, xc + Math.cos(a1) * R, A.ZW + Math.sin(a1) * R, ya, yb, 0.035);
        }
      }
      /* the side door between the wheels with its vision port, the stowage box behind it with
         its louvres (A1, A2) */
      var yo = s * A.HW;
      box(P, -0.15, 0.55, s > 0 ? yo : yo - 0.03, s > 0 ? yo + 0.03 : yo, 0.55, 1.30);
      box(D, 0.05, 0.40, s > 0 ? yo + 0.03 : yo - 0.04, s > 0 ? yo + 0.04 : yo - 0.03, 1.05, 1.20);
      box(P, -0.80, -0.30, s > 0 ? yo : yo - 0.10, s > 0 ? yo + 0.10 : yo, 0.65, 1.25);
      for (i = 0; i < 4; i++) box(D, -0.75, -0.35, s > 0 ? yo + 0.10 : yo - 0.11, s > 0 ? yo + 0.11 : yo - 0.10, 0.75 + i * 0.12, 0.79 + i * 0.12);
      /* headlamps on the glacis corners, the rear lamps */
      lamp(B, 1.45, s * 0.62, 1.22, 0.07, 1);
      B.vc.col = RED; box(B.vc, A.REAR - 0.01, A.REAR + 0.01, s * 0.62 - 0.05, s * 0.62 + 0.05, 1.20, 1.28);
    }
    /* the driver's hatch at the front of the deck (A1) */
    box(P, 0.55, 0.95, -0.30, 0.30, A.DECK, A.DECK + 0.05);
    for (i = 0; i < 3; i++) box(B.vc, 0.95, 0.97, -0.25 + i * 0.18, -0.13 + i * 0.18, A.DECK + 0.01, A.DECK + 0.04);
    /* the engine grille on the rear deck */
    box(D, -1.95, -1.20, -0.50, 0.50, A.DECK - 0.07, A.DECK - 0.04);
    box(B.team, -1.95, -1.80, -0.50, 0.50, A.DECK - 0.04, A.DECK - 0.025);
  }
  /* the H-90 turret (A1, A2): low, slope-fronted, the long thin D921 with its sleeve band and
     the muzzle bulb, two smoke dischargers each side at the rear, the cupola on the left */
  function amTurret(B) {
    var P = B.paint, D = B.dark, s, i, A = AM, x0 = A.TX;
    loftN(P, [ring(x0 + 1.03, A.DECK + 0.05, 0.45, 1.65, 0.55, 1.78, 0.42),
              ring(x0 + 0.60, A.DECK, 0.78, 1.70, 0.80, A.ROOF, 0.62),
              ring(x0 - 0.80, A.DECK, 0.78, 1.70, 0.80, A.ROOF, 0.62),
              ring(x0 - 1.10, A.DECK + 0.05, 0.70, 1.70, 0.72, A.ROOF - 0.04, 0.55)]);
    cylX(P, x0 + 0.95, x0 + 1.25, 0, A.GZ, 0.12, 0.10, 14);
    cylX(P, x0 + 1.25, A.MUZ - 0.20, 0, A.GZ, 0.058, 0.054, 12);
    cylX(B.vc, x0 + 2.25, x0 + 2.40, 0, A.GZ, 0.062, 0.062, 12);
    cylX(P, A.MUZ - 0.20, A.MUZ, 0, A.GZ, 0.08, 0.08, 12);
    cylX(D, A.MUZ, A.MUZ + 0.005, 0, A.GZ, 0.05, 0.05, 10);
    /* the commander's cupola and sight on the left, the gunner's sight on the right (A1) */
    cylZ(P, x0 - 0.20, 0.32, A.ROOF, A.ROOF + 0.08, 0.26, 16);
    box(P, x0 + 0.20, x0 + 0.40, -0.38, -0.20, A.ROOF, 2.07);
    box(B.vc, x0 + 0.40, x0 + 0.41, -0.36, -0.22, 1.96, 2.04);
    cylZ(D, x0 - 0.65, -0.30, A.ROOF, 2.05, 0.03, 6);
    for (s = -1; s <= 1; s += 2) for (i = 0; i < 2; i++) cyl(D, [x0 - 0.70 - i * 0.15, s * 0.68, 1.74], [x0 - 0.55 - i * 0.15, s * 0.80, 1.90], 0.05, 0.05, 10);
    box(B.team, x0 - 0.75, x0 - 0.60, -0.30, 0.10, A.ROOF, A.ROOF + 0.015);
  }
  function buildAML(THREE, C) {
    var T = mats(THREE, C, "olive"), g = new THREE.Group(), HB = bins(T), TB = bins(T);
    amHull(HB);
    K.flush(THREE, g, HB);
    axles(THREE, g, T, AM.AX, AM.ZW, AM.TY, AM.R, AM.TW, 1.1, 18);
    amTurret(TB);
    turretGroup(THREE, g, TB, AM.TX, 0, AM.DECK);
    return g;
  }

  /* ================================================================ ERC-90 Sagaie */
  /* THE ERC TABLE (S1, Saumur, near side-on from the right, the turret trained aft; 162 px/m
     from the published 5.27 m hull, which puts the turret roof at 2.16 m and the sight head at
     2.28 m against the published 2.25 m; X = (px - 797) / 162, Z = (578 - py) / 162).  The
     front axle stands alone, the two rear axles close together (S1). */
  var ER = { AX: [1.75, -0.17, -1.25], ZW: 0.50, R: 0.52, TW: 0.32, TY: 1.02,
             NOSE: 2.64, REAR: -2.64, DECK: 1.50, CH: 1.13, BELLY: 0.55, HW: 1.12, RW: 0.95, FW: 1.25,
             TX: 0.10, ROOF: 2.18, GZ: 1.93, MUZ: 5.05 };
  function erHull(B) {
    var P = B.paint, D = B.dark, s, i, E = ER;
    function sec(x, zb, wb, zc, wc, zt, wt) { return [[x, -wb, zb], [x, wb, zb], [x, wc, zc], [x, wt, zt], [x, -wt, zt], [x, -wc, zc]]; }
    /* the hull: vertical upper sides to the chine, the lower hull raking in below it; the upper
       glacis down to the front mudguard boxes; the rear plate (S1, S2) */
    loftN(P, [sec(E.REAR, 0.75, 0.75, E.CH, E.HW, E.DECK - 0.05, E.HW - 0.05), sec(E.REAR + 0.20, E.BELLY, 0.80, E.CH, E.HW, E.DECK, E.HW - 0.04),
              sec(1.20, E.BELLY, 0.80, E.CH, E.HW, E.DECK, E.HW - 0.04), sec(2.05, E.BELLY + 0.05, 0.78, E.CH, E.HW, E.CH + 0.05, E.HW - 0.10),
              sec(E.NOSE, 0.70, 0.70, 0.95, 0.75, 1.10, 0.70)]);
    for (s = -1; s <= 1; s += 2) {
      /* the front mudguard boxes at the corners with the lamp clusters (S2, S3) */
      var ya = s > 0 ? [0.72, E.FW] : [-E.FW, -0.72];
      prismY(P, [[1.40, E.CH], [1.40, 0.95], [1.60, 0.62], [E.NOSE, 0.62], [E.NOSE, E.CH]].map(function (p) { return p; }), ya[0], ya[1]);
      lamp(B, E.NOSE, s * 0.95, 0.92, 0.07, 1);
      B.vc.col = [0.75, 0.35, 0.08]; box(B.vc, E.NOSE, E.NOSE + 0.01, s * 1.15 - 0.05, s * 1.15 + 0.05, 0.88, 0.96);
      /* the wheel arches over the two rear axles: a guard rail along the chine (S1) */
      box(P, -2.10, 0.70, s > 0 ? E.HW : -E.HW - 0.10, s > 0 ? E.HW + 0.10 : -E.HW, E.CH - 0.05, E.CH + 0.02);
      /* side plates' panel joints (S1) */
      for (i = 0; i < 3; i++) box(D, -1.60 + i * 1.10, -1.58 + i * 1.10, s > 0 ? E.HW : -E.HW - 0.01, s > 0 ? E.HW + 0.01 : -E.HW, E.CH + 0.05, E.DECK - 0.05);
      /* the hydrojets under the stern */
      cylX(D, E.REAR - 0.02, E.REAR + 0.40, s * 0.55, 0.78, 0.15, 0.15, 12);
      B.vc.col = RED; box(B.vc, E.REAR - 0.01, E.REAR + 0.01, s * 0.95 - 0.05, s * 0.95 + 0.05, 1.30, 1.40);
    }
    /* the driver's hatch and periscopes at the front centre of the deck (S2) */
    box(P, 1.30, 1.75, -0.30, 0.30, E.DECK - 0.15, E.DECK + 0.04);
    for (i = 0; i < 3; i++) box(B.vc, 1.75, 1.77, -0.25 + i * 0.18, -0.13 + i * 0.18, E.DECK - 0.10, E.DECK);
    box(D, -2.45, -1.40, -0.60, 0.60, E.DECK - 0.01, E.DECK + 0.02);
    box(B.team, -2.45, -2.30, -0.60, 0.60, E.DECK + 0.02, E.DECK + 0.035);
  }
  /* the TS-90 turret (S1-S3): long and low, wedge front, the bustle, the commander's cupola
     with the ring-mounted 7.62 on the right, the sight heads, the baskets on the sides, two
     smoke dischargers each side; the 90 mm F4 (L/52) with its sleeve and plain muzzle */
  function erTurret(B) {
    var P = B.paint, D = B.dark, s, i, E = ER, x0 = E.TX;
    loftN(P, [ring(x0 + 1.25, 1.58, 0.40, 1.95, 0.50, 2.05, 0.38),
              ring(x0 + 0.85, E.DECK, 0.85, 1.90, 0.95, E.ROOF, 0.75),
              ring(x0 - 0.90, E.DECK, 0.85, 1.90, 0.95, E.ROOF, 0.75),
              ring(x0 - 1.32, 1.62, 0.75, 1.90, 0.78, E.ROOF - 0.04, 0.62)]);
    cylX(P, x0 + 1.15, x0 + 1.45, 0, E.GZ, 0.13, 0.11, 14);
    cylX(P, x0 + 1.45, x0 + 3.00, 0, E.GZ, 0.085, 0.078, 12);
    cylX(P, x0 + 3.00, E.MUZ - 0.20, 0, E.GZ, 0.068, 0.064, 12);
    cylX(P, E.MUZ - 0.20, E.MUZ, 0, E.GZ, 0.085, 0.085, 12);
    cylX(D, E.MUZ, E.MUZ + 0.005, 0, E.GZ, 0.05, 0.05, 10);
    /* the cupola with its MG ring on the right, the gunner's sight and lamp on the left (S2) */
    cylZ(P, x0 - 0.20, -0.40, E.ROOF, E.ROOF + 0.10, 0.30, 16);
    cylZ(D, x0 - 0.20, -0.40, E.ROOF + 0.10, E.ROOF + 0.12, 0.36, 18);
    box(D, x0 - 0.05, x0 + 0.05, -0.75, -0.70, E.ROOF + 0.05, E.ROOF + 0.25);
    cylX(D, x0 + 0.00, x0 + 0.70, -0.72, E.ROOF + 0.25, 0.022, 0.02, 6);
    box(P, x0 + 0.40, x0 + 0.65, 0.25, 0.50, E.ROOF, 2.28);
    B.vc.col = GLASS; box(B.vc, x0 + 0.65, x0 + 0.66, 0.28, 0.47, 2.18, 2.26);
    cylX(P, x0 + 0.60, x0 + 0.80, 0.65, 1.95, 0.10, 0.11, 12);
    B.vc.col = LAMP; cylX(B.vc, x0 + 0.80, x0 + 0.81, 0.65, 1.95, 0.09, 0.09, 12);
    for (s = -1; s <= 1; s += 2) {
      for (i = 0; i < 2; i++) cyl(D, [x0 - 0.85 - i * 0.16, s * 0.80, 1.98], [x0 - 0.65 - i * 0.16, s * 0.92, 2.14], 0.055, 0.055, 10);
      /* the baskets on the turret sides (S2, S3) */
      box(D, x0 - 0.60, x0 + 0.40, s > 0 ? 0.95 : -1.15, s > 0 ? 1.15 : -0.95, 1.65, 1.67);
      box(D, x0 - 0.60, x0 + 0.40, s * 1.14 - 0.01, s * 1.14 + 0.01, 1.65, 1.90);
    }
    box(B.team, x0 - 1.10, x0 - 0.95, -0.35, 0.35, E.ROOF - 0.03, E.ROOF - 0.015);
  }
  function buildERC(THREE, C) {
    var T = mats(THREE, C, "olive"), g = new THREE.Group(), HB = bins(T), TB = bins(T);
    erHull(HB);
    K.flush(THREE, g, HB);
    axles(THREE, g, T, ER.AX, ER.ZW, ER.TY, ER.R, ER.TW, 1.1, 20);
    erTurret(TB);
    turretGroup(THREE, g, TB, ER.TX, 0, ER.DECK);
    return g;
  }

  /* ================================================================ CAESAR */
  /* THE CAESAR TABLE (C1, Iraq 2016, near side-on from the left, firing: 69.5 px/m from the
     Sherpa's 395/85 R 20 tyres (1.18 m); X = (680 - px) / 69.5, Z = (716 - py) / 69.5).  It puts
     the truck 9.5 m from bumper to tail, the cab roof 3.38 m, the travel lock's fork 3.6-3.9 m.
     Drawn on the march (C2: the barrel laid forward over the cab into the fork, the spade
     folded up at the tail). */
  var CA = { AX: [3.06, -1.51, -3.05], ZW: 0.59, R: 0.59, TW: 0.40, TY: 1.00,
             BUMP: 4.10, CABF: 2.81, CABR: -1.05, ROOF: 3.38, BED: 1.25, TAIL: -5.30, HW: 1.25,
             TX: -4.50, TZ: 3.00, EL: 0.08, LEN: 7.70 };
  function caTruck(B) {
    var P = B.paint, D = B.dark, s, i, k, x, C = CA;
    /* the chassis rails and the bed */
    box(D, C.TAIL + 0.10, C.BUMP - 0.20, -0.55, 0.55, 0.80, 1.10);
    box(P, C.TAIL + 0.20, C.CABR, -C.HW + 0.10, C.HW - 0.10, 1.10, C.BED);
    /* the armoured cab: the low front over the engine with the grille, the windscreen raked
       back, the long crew cab with two doors a side (C1, C2) */
    prismY(P, [[C.CABF, 1.00], [C.BUMP - 0.08, 1.00], [C.BUMP, 1.30], [C.BUMP - 0.10, 2.05], [C.CABF, 2.30]], -C.HW + 0.05, C.HW - 0.05);
    prismY(P, [[C.CABR, 1.05], [C.CABF + 0.05, 1.05], [C.CABF + 0.05, 2.30], [C.CABF - 0.20, C.ROOF - 0.05], [C.CABF - 0.40, C.ROOF], [C.CABR, C.ROOF]], -C.HW, C.HW);
    box(D, C.BUMP - 0.04, C.BUMP + 0.02, -0.80, 0.80, 1.35, 1.95);
    for (i = 0; i < 6; i++) box(P, C.BUMP - 0.02, C.BUMP + 0.03, -0.78, 0.78, 1.40 + i * 0.09, 1.44 + i * 0.09);
    box(D, C.BUMP, C.BUMP + 0.12, -C.HW, C.HW, 0.80, 0.98);
    var a = Math.atan2(C.ROOF - 0.05 - 2.30, -0.25);
    B.vc.col = GLASS;
    for (s = -1; s <= 1; s += 2) {
      slab(B.vc, [C.CABF - 0.045, s * 0.55, 2.815], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.36, 0.46, 0.012);
      /* the side windows of both rows of doors, the door seams, the step */
      var yo = s * (C.HW + 0.005);
      box(B.vc, 1.55, 2.45, yo - 0.01, yo + 0.01, 2.45, 2.95);
      box(B.vc, 0.05, 0.95, yo - 0.01, yo + 0.01, 2.45, 2.95);
      box(D, 1.30, 1.33, yo - 0.012, yo + 0.012, 1.15, 3.10);
      box(D, -0.15, -0.12, yo - 0.012, yo + 0.012, 1.15, 3.10);
      box(D, 1.40, 2.40, s * C.HW - 0.20, s * C.HW + 0.02 * s, 0.85, 0.90);
      /* headlamps and mirrors */
      lamp(B, C.BUMP + 0.01, s * 0.95, 1.20, 0.08, 1);
      box(D, C.CABF, C.CABF + 0.05, s > 0 ? 1.27 : -1.38, s > 0 ? 1.38 : -1.27, 2.30, 2.75);
      /* the mudguards over the front wheel and the tandem */
      box(P, 2.35, 3.75, s > 0 ? 0.80 : -C.HW, s > 0 ? C.HW : -0.80, 1.30, 1.36);
      box(P, -3.85, -0.75, s > 0 ? 0.80 : -C.HW, s > 0 ? C.HW : -0.80, 1.30, 1.36);
      /* the ammunition racks either side of the bed behind the cab: boxes of round cells
         (C1, C2) */
      var ya = s > 0 ? [0.65, C.HW] : [-C.HW, -0.65];
      box(P, -3.70, -1.25, ya[0], ya[1], C.BED, 2.35);
      for (k = 0; k < 2; k++) for (i = 0; i < 6; i++) {
        x = -3.45 + i * 0.40;
        cylY(D, x, s * C.HW, s * (C.HW + 0.01), 1.65 + k * 0.40, 0.14, 10);
      }
      /* the fuel tank and the boxes under the bed */
      cylX(P, -1.10, 0.10, s * 0.85, 0.85, 0.25, 0.25, 12);
    }
    /* the travel lock's fork on the cab roof at the rear (C1, C2) */
    box(D, -0.42, -0.18, -0.12, 0.12, C.ROOF, 3.48);
    for (s = -1; s <= 1; s += 2) box(D, -0.40, -0.20, s * 0.14 - 0.04, s * 0.14 + 0.04, 3.40, 3.86);
    box(P, -0.80, 0.80, -0.30, 0.30, C.ROOF, C.ROOF + 0.06);
    /* the spade folded up at the tail and the mount's pedestal (C1, C2) */
    slab(P, [C.TAIL - 0.12, 0, 1.35], [0.25, 0, 0.97], [0, 1, 0], [0.97, 0, -0.25], 0.62, 0.95, 0.05);
    for (s = -1; s <= 1; s += 2) box(D, C.TAIL - 0.05, C.TAIL + 0.35, s * 0.55 - 0.08, s * 0.55 + 0.08, 0.70, 1.20);
    box(P, -5.05, -3.95, -0.75, 0.75, C.BED, 2.10);
    box(B.team, -3.40, -3.10, -0.40, 0.40, 2.10, 2.115);
    B.vc.col = RED; for (s = -1; s <= 1; s += 2) box(B.vc, C.TAIL + 0.15, C.TAIL + 0.17, s * 1.10 - 0.06, s * 1.10 + 0.06, 1.10, 1.18);
  }
  /* the 155 mm 52-calibre on its mount: "turret" origin on the pedestal, the gun along +X,
     laid at the travel lock's angle; the cradle with the recoil cylinders over and under the
     tube, the breech behind the trunnion, the double-baffle brake (C1, C2) */
  function caGun(B) {
    var P = B.paint, D = B.dark, s, i, C = CA, ce = Math.cos(C.EL), se = Math.sin(C.EL);
    function at(d, h) { return [C.TX + d * ce - h * se, 0, C.TZ + d * se + h * ce]; }
    function rod(d0, d1, y, h, r0, r1, bin, seg) { var a = at(d0, h), b = at(d1, h); a[1] = b[1] = y; cyl(bin, a, b, r0, r1, seg); }
    box(P, C.TX - 0.45, C.TX + 0.45, -0.70, 0.70, 2.10, 2.40);
    for (s = -1; s <= 1; s += 2) prismY(P, [[C.TX - 0.50, 2.40], [C.TX + 0.50, 2.40], [C.TX + 0.25, C.TZ + 0.20], [C.TX - 0.30, C.TZ + 0.20]], s * 0.48, s * 0.58);
    cylY(D, C.TX, -0.62, 0.62, C.TZ, 0.12, 12);
    /* cradle and breech */
    var c0 = at(-0.95, 0), c1 = at(1.70, 0);
    slab(P, [(c0[0] + c1[0]) / 2, 0, (c0[2] + c1[2]) / 2], [ce, 0, se], [0, 1, 0], [-se, 0, ce], 1.32, 0.30, 0.26);
    rod(-1.35, -0.95, 0, 0, 0.24, 0.24, P, 14);
    /* the tube, the brake */
    rod(1.70, C.LEN - 0.55, 0, 0, 0.115, 0.095, P, 14);
    rod(C.LEN - 0.55, C.LEN, 0, 0, 0.14, 0.14, P, 12);
    rod(C.LEN - 0.47, C.LEN - 0.38, 0, 0, 0.145, 0.145, D, 12);
    rod(C.LEN - 0.22, C.LEN - 0.13, 0, 0, 0.145, 0.145, D, 12);
    /* recoil cylinders and the rammer tray arm */
    for (s = -1; s <= 1; s += 2) rod(0.0, 2.60, s * 0.20, 0.30, 0.075, 0.075, P, 10);
    rod(-0.30, 2.20, 0, -0.30, 0.09, 0.09, P, 10);
    /* the sight box on the left (C2) */
    var q = at(0.40, 0.45);
    box(P, q[0] - 0.25, q[0] + 0.25, 0.35, 0.65, q[2] - 0.15, q[2] + 0.15);
    B.vc.col = GLASS; box(B.vc, q[0] + 0.25, q[0] + 0.26, 0.40, 0.60, q[2] - 0.08, q[2] + 0.10);
  }
  function buildCAESAR(THREE, C) {
    var T = mats(THREE, C, "ce3"), g = new THREE.Group(), HB = bins(T), TB = bins(T);
    caTruck(HB);
    K.flush(THREE, g, HB);
    axles(THREE, g, T, CA.AX, CA.ZW, CA.TY, CA.R, CA.TW, 0.75, 20);
    caGun(TB);
    turretGroup(THREE, g, TB, CA.TX, 0, CA.BED);
    return g;
  }

  /* ================================================================ VBL */
  /* VBL (published 3.80 x 2.02 x 1.70 m): the head-on photograph B1 at 354 px/m (the published
     2.02 m width over the front panel and tyres) gives the heights: lamp band 0.90-1.12 m, front
     panel top 1.26 m, windscreen base 1.37 m, roof 1.65 m, the nose box down to 0.35 m, the tyre
     centres 0.88 m out.  Lengthwise from B2 (Saumur, front three-quarter) by proportion only. */
  var VL = { AX: [1.12, -1.33], ZW: 0.445, R: 0.445, TW: 0.27, TY: 0.86,
             NOSE: 1.90, REAR: -1.90, BELT: 1.12, HW: 1.00, ROOF: 1.65, RW: 0.78, BELLY: 0.36,
             TX: -0.35, TZ: 1.65 };
  function vlHull(B) {
    var P = B.paint, D = B.dark, s, i, V = VL;
    function sec(x, zb, wb, zm, wm, zt, wt) { return [[x, -wb, zb], [x, wb, zb], [x, wm, zm], [x, wt, zt], [x, -wt, zt], [x, -wm, zm]]; }
    /* the body: the lower hull raking in under the waist, the sides leaning in above it to the
       roof; the short bonnet, the two windscreens, the roof, the sloped tail (B1, B2) */
    loftN(P, [sec(V.REAR, 0.70, 0.60, 1.00, V.HW - 0.12, 1.12, V.RW - 0.10), sec(-1.55, V.BELLY + 0.10, 0.62, V.BELT, V.HW, 1.45, V.RW),
              sec(-0.90, V.BELLY, 0.62, V.BELT, V.HW, V.ROOF, V.RW), sec(0.30, V.BELLY, 0.62, V.BELT, V.HW, V.ROOF, V.RW),
              sec(0.75, V.BELLY, 0.62, V.BELT, V.HW, 1.37, V.HW - 0.08), sec(V.NOSE, 0.35, 0.45, 1.00, V.HW, 1.26, V.HW - 0.04)]);
    for (s = -1; s <= 1; s += 2) {
      /* the wheel-arch flares (B2) */
      for (var k = 0; k < 2; k++) {
        var xc = V.AX[k], n = 6, R = V.R + 0.08, ya = s > 0 ? V.HW - 0.05 : -V.HW - 0.04, yb = s > 0 ? V.HW + 0.04 : -V.HW + 0.05;
        for (i = 0; i < n; i++) {
          var a0 = (0.05 + i / n * 0.90) * Math.PI, a1 = (0.05 + (i + 1) / n * 0.90) * Math.PI;
          K.belt(P, xc + Math.cos(a0) * R, V.ZW + Math.sin(a0) * R, xc + Math.cos(a1) * R, V.ZW + Math.sin(a1) * R, ya, yb, 0.04);
        }
      }
      /* the windscreen on each side, the side window, the door (B1, B2) */
      var a = Math.atan2(V.ROOF - 1.37, 0.30 - 0.75);
      B.vc.col = GLASS;
      slab(B.vc, [0.533, s * 0.42, 1.523], [Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)], 0.22, 0.27, 0.01);
      box(B.vc, -0.30, 0.25, s > 0 ? V.RW + 0.04 : -V.RW - 0.06, s > 0 ? V.RW + 0.06 : -V.RW - 0.04, 1.30, 1.55);
      box(D, -0.40, -0.37, s * (V.HW - 0.01) - 0.01, s * (V.HW - 0.01) + 0.01, 0.55, 1.10);
      /* the louvred engine grille behind the front wheel (B2) */
      for (i = 0; i < 6; i++) box(D, 0.38, 0.72, s > 0 ? V.HW - 0.02 : -V.HW - 0.02, s > 0 ? V.HW + 0.02 : -V.HW + 0.02, 0.70 + i * 0.065, 0.73 + i * 0.065);
      /* the lamps in the front panel (B1): headlamp, side lamp and indicator */
      lamp(B, V.NOSE, s * 0.60, 1.00, 0.065, 1);
      B.vc.col = [0.75, 0.35, 0.08]; box(B.vc, V.NOSE - 0.01, V.NOSE + 0.01, s * 0.88 - 0.05, s * 0.88 + 0.05, 0.96, 1.05);
      box(D, V.NOSE - 0.01, V.NOSE + 0.01, s * 0.75 - 0.04, s * 0.75 + 0.04, 0.97, 1.04);
      /* the mirrors on their arms */
      box(D, 0.80, 0.84, s * 1.02, s * 1.04, 1.10, 1.55);
      box(D, 0.78, 0.86, s > 0 ? 1.04 : -1.14, s > 0 ? 1.14 : -1.04, 1.38, 1.62);
      B.vc.col = RED; box(B.vc, V.REAR - 0.01, V.REAR + 0.01, s * 0.62 - 0.05, s * 0.62 + 0.05, 0.92, 1.00);
    }
    /* the nose box below the front panel (B1), the towing eye */
    box(D, V.NOSE - 0.15, V.NOSE - 0.05, -0.20, 0.20, 0.40, 0.55);
    /* the stowage basket on the tail (B2) */
    box(D, -1.85, -1.40, -0.65, 0.65, 1.30, 1.33);
    for (i = 0; i < 4; i++) box(D, -1.85 + i * 0.15, -1.83 + i * 0.15, -0.65, 0.65, 1.12, 1.55);
    box(D, -1.85, -1.40, -0.66, 0.66, 1.52, 1.55);
    /* the roof hatch ring the mount sits on */
    cylZ(P, V.TX, 0, V.ROOF, V.ROOF + 0.06, 0.45, 18);
    box(B.team, 0.05, 0.25, -0.40, 0.40, V.ROOF, V.ROOF + 0.015);
  }
  /* the 12.7 mm M2 on the ring mount (B1): "turret", origin on the ring, the gun along +X */
  function vlGun(B) {
    var P = B.paint, D = B.dark, V = VL, x0 = V.TX, z = V.TZ + 0.06;
    cylZ(D, x0, 0, z, z + 0.05, 0.47, 20);
    box(D, x0 + 0.30, x0 + 0.40, -0.04, 0.04, z, z + 0.30);
    box(D, x0 + 0.15, x0 + 0.60, -0.07, 0.07, z + 0.28, z + 0.42);
    cylX(D, x0 + 0.60, x0 + 1.70, 0, z + 0.36, 0.028, 0.026, 8);
    cylX(D, x0 + 0.60, x0 + 1.00, 0, z + 0.36, 0.045, 0.045, 8);
    box(P, x0 + 0.30, x0 + 0.55, 0.08, 0.30, z + 0.20, z + 0.36);
  }
  function buildVBL(THREE, C) {
    var T = mats(THREE, C, "ce3"), g = new THREE.Group(), HB = bins(T), TB = bins(T);
    vlHull(HB);
    K.flush(THREE, g, HB);
    axles(THREE, g, T, VL.AX, VL.ZW, VL.TY, VL.R, VL.TW, 0.9, 18);
    vlGun(TB);
    turretGroup(THREE, g, TB, VL.TX, 0, VL.TZ);
    return g;
  }

  return {
    vbl: function (THREE, M, C) { return buildVBL(THREE, C); },
    caesar: function (THREE, M, C) { return buildCAESAR(THREE, C); },
    aml: function (THREE, M, C) { return buildAML(THREE, C); },
    erc: function (THREE, M, C) { return buildERC(THREE, C); },
    ebr: function (THREE, M, C) { return buildEBR(THREE, C); },
    vab: function (THREE, M, C) { return buildVAB(THREE, C); },
    auf1: function (THREE, M, C) { return buildAuF1(THREE, M, C, "olive"); },
    auf1ce: function (THREE, M, C) { return buildAuF1(THREE, M, C, "ce3"); },
    mkf3: function (THREE, M, C) { return buildMkF3(THREE, C); },
    vbci: function (THREE, M, C) { return buildVBCI(THREE, C); },
    p70: function (THREE, M, C) { return buildP(THREE, C, "olive"); },
    p90: function (THREE, M, C) { return buildP(THREE, C, "ce3"); },
    rc80: function (THREE, M, C) { return buildRC(THREE, C, "olive", false); },
    rc90: function (THREE, M, C) { return buildRC(THREE, C, "ce3", false); },
    rcr: function (THREE, M, C) { return buildRC(THREE, C, "ce3", true); }
  };
})();

/* ======================================================================= registration */
UNIT_MODELS["fra_e80_lighttank"] = { len: 9.31, build: HeroFrArmour2.rc80 };
UNIT_MODELS["fra_e90_lighttank"] = { len: 9.31, build: HeroFrArmour2.rc90 };
UNIT_MODELS["fra_e60_ifv"] = { len: 6.10, build: HeroFrArmour2.p70 };
UNIT_MODELS["fra_e80_ifv"] = { len: 6.10, build: HeroFrArmour2.p70 };
UNIT_MODELS["fra_e90_ifv"] = { len: 6.10, build: HeroFrArmour2.p90 };
UNIT_MODELS["fra_e00_ifv"] = { len: 7.86, build: HeroFrArmour2.vbci };
UNIT_MODELS["fra_e60_spg"] = { len: 5.03, build: HeroFrArmour2.mkf3 };
UNIT_MODELS["fra_e80_spg"] = { len: 10.36, build: HeroFrArmour2.auf1 };
UNIT_MODELS["fra_e90_spg"] = { len: 10.36, build: HeroFrArmour2.auf1ce };
UNIT_MODELS["fra_e80_tankdestroyer"] = { len: 6.22, build: HeroFrArmour2.vab };
UNIT_MODELS["fra_e50_recon"] = { len: 6.15, build: HeroFrArmour2.ebr };
UNIT_MODELS["fra_e60_recon"] = { len: 5.13, build: HeroFrArmour2.aml };
UNIT_MODELS["fra_e80_recon"] = { len: 7.69, build: HeroFrArmour2.erc };
UNIT_MODELS["fra_e00_spg"] = { len: 9.70, build: HeroFrArmour2.caesar };
UNIT_MODELS["fra_e90_recon"] = { len: 3.80, build: HeroFrArmour2.vbl };
UNIT_MODELS["fra_e00_recon"] = { len: 3.80, build: HeroFrArmour2.vbl };
UNIT_MODELS["fra_e00_lighttank"] = { len: 9.31, build: HeroFrArmour2.rcr };

/* ---- reused builders (not edited; this file loads after fr_tanks.js, eu_sams.js and
   us_m270_himars.js) ---- */
/* fra_e90_spaag, the AMX-30 Roland: the same vehicle as fra_e80_sam, HeroRoland (eu_sams.js),
   Roland 2 on the AMX-30R chassis, as that module draws it (its own olive and khaki tubes). */
UNIT_MODELS["fra_e90_spaag"] = { len: 6.94, build: HeroRoland.build };
/* fra_e90_mlrs (LRM) and fra_e00_mlrs (LRU): the M270, HeroUsMlrs (us_m270_himars.js), added to
   the module's own row table as deu_us_pattern.js adds the MARS: the 1991 M270 with two
   six-rocket pods.  Paint: the module's NATO three-colour (green, brown, black), the nearest of
   its paints to the French Centre-Europe three-tone of 1990-2020 (NOT CONFIRMED on an LRM / LRU: the
   one LRU photograph fetched, L1 of 14 July 2021, shows the new plain earth-brown of 2021 on);
   the module cannot be handed a new paint without editing it.  ord: the round each weapon is drawn as. */
HeroUsMlrs.rows.fra_e90_mlrs = { veh: "m270", paint: "nato3", pods: "rocket", turret: true, louvre: false, ord: { w_e90_fra_mlrs: "m26" } };
HeroUsMlrs.rows.fra_e00_mlrs = { veh: "m270", paint: "nato3", pods: "rocket", turret: true, louvre: false, ord: { w_e00_fra_mlrs: "gmlrs" } };
UNIT_MODELS["fra_e90_mlrs"] = { len: 7.00, ord: HeroUsMlrs.rows.fra_e90_mlrs.ord,
                                build: function (THREE, M, C) { return HeroUsMlrs.build("fra_e90_mlrs", THREE, M, C); } };
UNIT_MODELS["fra_e00_mlrs"] = { len: 7.00, ord: HeroUsMlrs.rows.fra_e00_mlrs.ord,
                                build: function (THREE, M, C) { return HeroUsMlrs.build("fra_e00_mlrs", THREE, M, C); } };
