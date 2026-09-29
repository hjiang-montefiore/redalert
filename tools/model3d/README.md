# tools/model3d - look at a model without a browser

Every model in the game is procedural three.js geometry, and the browser is off
limits for testing. These two tools build a model with the real `three.min.js`
and the real model scripts under JavaScriptCore, then draw it with PIL.

```sh
JSC=/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc

$JSC tools/model3d/dump.js -- unit nato_e60_mbt nato /tmp/m60.json
python3 tools/model3d/shot.py /tmp/m60.json /tmp/m60.png
```

A dump takes under a second and a sheet a few seconds. Both run from any
working directory: `dump.js` finds the repo from its own path.

## dump.js

```
jsc tools/model3d/dump.js -- unit|bld KEY [TEAM] OUT.json [--extra FILE.js]... [--root DIR]
jsc tools/model3d/dump.js -- list  [unit|bld] [SUBSTRING]
jsc tools/model3d/dump.js -- check [unit|bld] [SUBSTRING]
```

- `unit` / `bld` build `UNIT_MODELS[KEY]` / `BLD_MODELS[KEY]`. TEAM is a
  faction (`nato`, `pact`, `pla`, `kpa`, `roc`, ...) or a hex colour.
- `list` prints the keys. `check` builds every matching key and prints one
  line each, flagging NaN vertices and hidden geometry that changes the
  in-game scale. The whole roster takes about 5 s.
- `--extra FILE.js` loads a model file that is not in `index.html` yet,
  after the index scripts. That is where a new hero file goes.
- `--root DIR` loads `index.html` and its scripts from another tree, for
  example the untouched repo, so you can dump the "before" of a change.

The JSON holds every triangle in model space (+X nose, +Y left, +Z up,
metres) with its painted colour. A texture counts as its mean colour, because
the canvas stub keeps a coarse raster of every painted texture. The JSON also
lists the named nodes (`turret`, `roadwheel`, `rotor` and the other parts the
engine animates) and the stats: triangle, mesh, draw-call and material counts,
the bounding box, and NaN and zero-area triangles. It shows the raw model, as
the builder returns it. The engine's era kit and faction restyling of
buildings are applied later, in `render3d.js`.

## shot.py

```
python3 tools/model3d/shot.py A.json OUT.png                  # one model, 2x2 sheet
python3 tools/model3d/shot.py BEFORE.json AFTER.json OUT.png  # side by side, one row per view
```

The views are side (from starboard, nose right), top (nose right, port up),
front, and the 3/4 at the game camera's own pitch. Each panel has a metre grid
and a scale bar, and a line marks z = 0. Before and after share a scale and a
centre, so the two columns line up pixel for pixel.

Faces are culled the way their materials cull them in the game. So a hole in
the sheet is a hole in the game. `--backfaces` paints the culled faces
magenta, which shows up a panel wound the wrong way.

Other options: `--views side,top`, `--panel 960x360` (long hulls), `--fit
common` (one scale for all panels), `--az/--el` (the 3/4 camera), `--no-parts`
and `--title TEXT`.

## Before / after for a change to an existing model

```sh
$JSC tools/model3d/dump.js -- unit pact_e80_mbt pact /tmp/before.json --root /Users/hjiang/Desktop/redalert
$JSC tools/model3d/dump.js -- unit pact_e80_mbt pact /tmp/after.json          # your tree
python3 tools/model3d/shot.py /tmp/before.json /tmp/after.json /tmp/t80.png
```
