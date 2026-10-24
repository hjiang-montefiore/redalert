/* ============ ru_il78.js -- ILYUSHIN Il-78 / Il-78M MIDAS (HERO MODEL) ============

   The Soviet and Russian flight-refuelling tanker on the Il-76MD airframe, for
   the one row that flies it:
     tanker_p  "Il-78 Midas", "Ilyushin Il-78M Midas" (era e80, present day):
               Russian star, light grey finish.
   No other row in js/rules.js, js/air_specs.js or js/facts.js borrows tanker_p.

   THE AIRFRAME IS SHARED: this file draws nothing itself. It calls the one
   Il-76 builder, HeroIl76 in js/hero/ru_a50.js (index.html loads both; the
   call happens when the model is built, after every script has loaded), with
   kind "il78". That builder's header lists the drawing and the photographs every
   airframe table rests on (Commons "Ilyushin Il-76.svg" three-view).

   WHAT THE Il-78 ADDS, AND WHAT IT RESTS ON
     Drawing: Commons "Ilyushin Il-78 Midas two-view silhouette.png" (plan and
       front): the glazed navigator's nose, the engine pods in the Il-76 places,
       the hose-drum (UPAZ) pods under the wings about 17 m from the centreline,
       the third hose-drum pod on the PORT side of the rear fuselage about 3 m
       off the centreline.
     Photograph, Commons "Ilyushin IL-78 Midas, Russia - Air Force
       JP7607201.jpg" (Il-78M from below and the side, nose right, port side
       seen): light grey over a slightly darker grey belly, grey wings with
       red-orange tips, the dark red Russian star with a white and a dark
       border on the fin; the third pod low on the port rear fuselage on a short
       pylon, about 33.5-38.5 m aft of the nose (measured along the photograph),
       trailing its hose; the navigator's window grid in the nose over the big
       chin radome; at the tail end the gunner's station with its side window
       and a small rounded fairing low on the end, no guns.
     Photograph, Commons "Ilyushin Il-78, Russia - Air Force AN1706624.jpg"
       (from below, both wing pods trailing hoses and drogues, two Su-24 and Su-25
       around it): the wing pods outboard of the outer engines, the third pod on
       the fuselage side.
   NOT CONFIRMED and so not drawn: the pod sizes (a 6.2 m long, 1.06 m drum pod
     under each wing and a 5.2 m pod on the fuselage are measured off the
     photographs, not published), the ram-air turbine on each pod's nose (not
     resolved in these photographs), the hose and drogue (stowed), the
     wing-underside stars, the antenna fairings, the bort number, "RF-"
     registration and "VVS Rossii" titles (never drawn).
   Team colour: one small strip on each wing's upper skin near the tip (the
   shared builder). Markings: the star on each side of the fin only.
   ========================================================================= */

if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroIl78 = {
  build: function (THREE, M, C, spec) {
    /* HeroIl76 comes from js/hero/ru_a50.js, loaded with this file */
    return HeroIl76.build(THREE, M, C, spec);
  }
};

(function () {
  var ROWS = {
    tanker_p: { kind: "il78", star: "russian", paint: "il78" }
  };
  function reg(key) {
    UNIT_MODELS[key] = {
      len: 46.6,
      build: function (THREE, M, C) { return HeroIl78.build(THREE, M, C, ROWS[key]); }
    };
  }
  for (var k in ROWS) reg(k);
})();
