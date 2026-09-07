/* ============ sprites.js — procedural sprite atlas ============
   SPRITE_DRAW entries (see spriteart.js) draw each platform top-down at 1x
   game scale, facing +X.  This module rasterises them once per (key, team)
   into supersampled offscreen canvases and hands the renderer ready bitmaps.
   Anything without an entry falls back to the old vector drawing.            */
var SPRITE_DRAW = {};        // filled by spriteart.js
var BLD_DETAIL = {};         // roof detail painters, filled by spriteart.js

var Sprites = (function () {
  const SS = 3;              // supersample factor
  const PAD = 8;             // px padding around each sprite (guns overhang)
  const cache = {};

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, Math.min(255, (n >> 16) + amt));
    const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
    const b = Math.max(0, Math.min(255, (n & 255) + amt));
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  function pal(team) {
    return {
      main: team.main, dark: team.dark, light: team.light,
      steel: "#7a8087", dk: "#23262a", trk: "#191919",
      sh: shade,
    };
  }

  function raster(drawFn, l, w, C, pivotBack) {
    /* pivotBack: fraction of l that lies BEHIND the pivot (turrets) */
    const cv = document.createElement("canvas");
    cv.width = Math.ceil((l + PAD * 2) * SS);
    cv.height = Math.ceil((w + PAD * 2) * SS);
    const c = cv.getContext("2d");
    const ax = pivotBack !== undefined ? (PAD + l * pivotBack) * SS : cv.width / 2;
    c.translate(ax, cv.height / 2);
    c.scale(SS, SS);
    c.lineJoin = "round";
    try { drawFn(c, C); } catch (e) { return null; }
    return { cv, ax: ax / SS, ay: cv.height / SS / 2, w: cv.width / SS, h: cv.height / SS };
  }

  /* sprite lookup key for a unit def */
  function keyFor(def) {
    if (def.cat === "infantry") {
      const role = def.role === "medic" ? "medic" : def.role === "engineer" ? "engineer" : def.role;
      return "inf_" + role;
    }
    return def.id;
  }

  function get(def, team) {
    const key = keyFor(def);
    const spec = SPRITE_DRAW[key];
    if (!spec) return null;
    const ck = key + "|" + team.main;
    if (cache[ck] !== undefined) return cache[ck];

    const C = pal(team);
    const hull = raster(spec.draw, spec.l, spec.w, C);
    if (!hull) { cache[ck] = null; return null; }
    const out = { hull, l: spec.l, w: spec.w, rotor: spec.rotor || null, turret: null, tx: 0 };
    if (spec.turret && spec.turret.draw) {
      out.turret = raster(spec.turret.draw, spec.turret.l, spec.turret.w, C, 0.35);
      out.tx = spec.turret.x || 0;
    }
    cache[ck] = out;
    return out;
  }

  function getDef(id, team) {         // defence mounts: "def_atpost" etc
    const spec = SPRITE_DRAW[id];
    if (!spec || !spec.turret) return null;
    const ck = id + "|" + team.main;
    if (cache[ck] !== undefined) return cache[ck];
    const out = { turret: raster(spec.turret.draw, spec.turret.l, spec.turret.w, pal(team), 0.35) };
    cache[ck] = out;
    return out;
  }

  return { get, getDef, pal, shade };
})();
