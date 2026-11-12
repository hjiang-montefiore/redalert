/* ================== js/hero/mbt_c.js ==================================
   HERO model - mbt_c "Type 99A" (ZTZ-99A MBT), PLA, era e20.

   The same vehicle as pla_e00_mbt ("ZTZ-99 (2001) and ZTZ-99A (2011)"), which is drawn as
   the ZTZ-99A: js/hero/pla_e00_mbt.js.  So this key calls that builder (POLICY 5) instead
   of keeping a second full copy.  The first version of this file was its own hand-built
   99A of 227 separate meshes (227 draw calls) in a digital camouflage; it is replaced by
   the shared build, which is merged per material (12 draw calls), measured from
   photographs, in plain PLA green, with six "roadwheel" groups and the "turret" node.
   References, measurements and the NOT CONFIRMED list: see that file's header.

   Load order: index.html loads this file BEFORE js/hero/pla_e00_mbt.js.  Nothing here runs
   at load time; HeroPlaE00Mbt is looked up only when the model is built.
   ASCII only.
   ====================================================================== */
if (typeof UNIT_MODELS === "undefined") { var UNIT_MODELS = {}; }

var HeroMbtC = (function () {
  "use strict";
  function build(THREE, M, C) {
    var root = HeroPlaE00Mbt.build(THREE, M, C);
    root.name = "mbt_c";
    return root;
  }
  return { build: build };
})();

/* len: the measured X extent of the build (pla_e00_mbt's) */
UNIT_MODELS["mbt_c"] = {
  len: 11.1,
  build: function (THREE, M, C) { return HeroMbtC.build(THREE, M, C); }
};
