# The hero-model pipeline

Five stages. Each leaves a file on disk that the next one reads, and the last
two are done by tools and by an agent that did not build the model.

```
SPEC   tools/model3d/specs/<key>.json      what it must be, from the references
BUILD  js/hero/<file>.js                   procedural three.js on the shared kit (js/hero_kit.js)
GATE   tools/model3d/gate.py               numbers against limits, exit code
RENDER tools/model3d/render.js             true WebGL picture, before | after
REVIEW a second agent, the rubric below    1-5 on five lines, in writing
```

Why: shape errors nobody measured (box hulls, towers 3 m low), detail judged
from sheets that cannot show it (shot.py paints a texture as its mean
colour), "more triangles" passed off as quality, budgets found broken by
accident, and builders grading their own work.

## 1. SPEC

Write `tools/model3d/specs/<key>.json` first: published dimensions, the nodes
the engine needs, the references with their scale and origin, `must_show`
(the identifying features, each with its station or position in metres),
`landmarks` (5-8 points measured on the references that the gate holds the
model to, in metres) and `not_confirmed`. Format: `specs/README.md`.
Pictures go in `specs/ref/<key>/`.

## 2. BUILD

`js/hero/<file>.js` registers `UNIT_MODELS[key] = { len, build(THREE, M, C) }`
on the shared kit. While it is not in `index.html` yet, every tool takes it
with `--extra js/hero/<file>.js`.

## 3. GATE

```sh
python3 tools/model3d/gate.py KEY [--spec tools/model3d/specs/KEY.json] [--before DIR [--before-align]]
                                  [--extra FILE.js] [--out DIR] [--team T] [--no-render]
```

Runs the dump, the floating-part check, the outline comparison, the
landmarks and the true render, prints PASS / FAIL / WARN / INFO per rule with
the number and the limit, writes `DIR/gate_KEY.json`, and exits 1 on any
FAIL. 8-15 s a model, 10-25 s with `--before` (the pilot: tel_c 13.5 s,
roc_e00_corvette 9.5 s, gbr_e50_cfighter 22 s with `--before --before-align`).
A `--before DIR` is a tree with the old `index.html` and `js/`, e.g.
`git archive <commit> index.html js | tar -x -C DIR`. The limits are one
table at the top of `gate.py`, a column each for ship / air / veh:

| rule | limit (ship / air / veh) | fails when |
|---|---|---|
| dump issues | 0 | a script fails to load, NaN, geometry that changes the in-game scale |
| draw calls | 16 | |
| triangles | 8-20k / 6-12k / 8-20k, 6% grace | too few is a FAIL as well |
| zero-area triangles, NaN | 0 | |
| length vs spec `len`, vs published | 1.5% | |
| required nodes | all of the spec's `nodes` | |
| engine nodes kept (`--before`) | none lost | a `turret`, `rotor`, `gear`... the old model had is gone |
| textured share of opaque area | 55% / 55% / 45% | plain paint over most of the surface (glass and rotor discs left out) |
| largest flat untextured face | 6% / 6% / 8% of area | one big plain slab |
| boxiness | 62% / 50% / - | too much area on axis-aligned faces |
| plan fill | 93% / - / - | the top silhouette fills its rectangle: a hull with no bow |
| fittings | 40 / 25 / 30 | too few small separate parts |
| floating parts | gap <= max(2 cm, 1/8 of the part's size, 0.0037 x length) | an assembly of touching parts stands off the body (below) |
| outline IoU, `exact` references | 0.88 | the silhouette does not lie on the drawing |
| landmarks | each within its `tol_m` (default 0.15 / 0.05 / 0.08 m) | a measured point of the reference is not where the model has it; a landmark the gate cannot evaluate is a FAIL marked "spec error" |
| game-view detail vs before (`--before`) | ratio >= 1.00, WARN under 1.10 | the rebuild shows LESS at the game camera |

Reported, not gated: width and height against published, advisory outlines
with their worst stations, the plain-paint scan (canvas `fillText` /
`strokeText` anywhere in the model's source file, and material names like
insignia / roundel / star in the dump; identifiers such as the kit's
`deckMarkings` option are not scanned), other named nodes lost against the
before, the renderer's own counts, every part standing off by more than 5 mm
(WARN, with its box and nearest neighbour; all of them in `gate_KEY.json`
under `gaps`), `must_show` items that name no station or position (WARN),
and with `--before` each outline's IoU before -> after.

**Floating parts.** Parts are the triangles joined through shared vertices
(welded at 1 mm). For every pair whose boxes come within 0.25 m the gate
takes the near-exact distance (every vertex and edge midpoint to every
triangle of the other, both ways; 0 when an edge of one pierces a face of the
other, or one lies inside the other's closed surface). Parts closer than
5 mm are joined into assemblies; the assembly with the most surface is the
body, and every other assembly floats by its distance to the rest. Parts
under nodes named `rotordisc` or `flame`, or in the spec's `free_parts`, may
float. Edge-to-edge closest points are not searched, so a gap can read high
by up to a quarter of an edge; a part that touches at one end and hangs free
at the other (a door 60 per cent off the skin) is not caught.

**Before outlines.** An old model often has another origin (sat below z 0,
nose at another x), so its unaligned IoU says nothing. `--before-align`
slides the OLD model to its own best fit (from the centroid match, +-5 per
cent of its length) before comparing; the new model is never slid beyond its
reference's own `align_m`. Read the before -> after line from an aligned run
only.

The pieces run alone too:

```sh
node tools/model3d/jscnode.js tools/model3d/dump.js -- unit KEY TEAM OUT.json [--extra F] [--root DIR]
python3 tools/model3d/outline.py OUT.json tools/model3d/specs/KEY.json --out DIR
```

`outline.py` writes `DIR/outline_KEY_<n>_<view>.png`: the reference picture
in colour at full resolution (enlarged to at least 1800 px), reference
outline blue, model outline red, blue fill where the model is missing or
thinner, red fill where it is fatter or has something extra, a metre ruler on
both axes, and the worst upper-edge, lower-edge and thickness deviations by
station (20 bins along the view, marked under the ruler), in metres. A
reference may hide groups (`"hide": ["gear"]`) and turn the model
(`"pitch_deg"`) before it is rasterised: a model stood nose-up on its wheels
against a level, gear-up drawing. (`jscnode.js` runs the JavaScriptCore
script under Node; with a real `jsc`, set `JSC=/path/to/jsc`.)

```sh
python3 tools/model3d/overlay.py KEY [--ref N]... [--out DIR] [--zoom K] [--alpha 0.5]
                                     [--extra FILE.js] [--pitch DEG] [--flip|--no-flip] [--gear up|down]
```

`overlay.py` is the check the pilot's reviewers did by hand: render.js draws
the model with its real materials at the reference's px_per_m, with model
(0, 0) on the reference's origin pixel, after the same crop / rotate / flip
and the reference's `pitch_deg` and `hide`, and lays it over the PICTURE:
`overlay_KEY_n_blend.png` (50 per cent), `overlay_KEY_n_edges.png` (the
model's silhouette red and its creases yellow on the picture), both at full
resolution with a metre ruler and the spec's landmarks drawn in blue, and
`overlay_KEY_n_crop_<name>.png`, zoomed crops (the spec's `overlay_crops`, or
one round each landmark). 4-7 s a reference. A picture that outline.py must
skip (a photograph kept as "quarter") can still be overlaid with an
`"overlay"` block in its reference (`specs/README.md`). The overlay shows
the model's underwater hull too: no sea is drawn.

## 4. RENDER

```sh
node tools/model3d/render.js KEY TEAM OUT.png [--extra FILE.js] [--root DIR]
                             [--views side,top,front,game,rear,under,quarter,rquarter,az:A/el:E]
                             [--view A,E]... [--size 900x520] [--gear up|down] [--focus x0,y0,z0,x1,y1,z1]
                             [--pitch DEG] [--hide NAME,...] [--ground Z|none|per] [--as UNITKEY]
node tools/model3d/render.js KEY TEAM OUT.png --before DIR      # before | after
```

A view is named or free: `rear` (from astern), `under` (from below, nose
right, starboard up; the sun is turned underneath), `quarter` (starboard bow,
az -45 el 12), `rquarter` (starboard stern, az -135 el 15), or any
`az:A/el:E`, azimuth from the bow round toward port (0 ahead, 90 port beam,
180 astern, -90 starboard beam), elevation above the horizon. `--focus`
frames every view on a box in model metres: a zoom on one part. The model's
own root transform is kept (the stand-up turn goes on a wrapping group), so a
reviewer never needs a wrapper to turn a model; a model registered under
another key finds its unit row (category, as-played size) by `--as` or by
the unit key its key contains. In compare mode each side stands on its own
ground at its own lowest point (labelled in the caption), so an old model
built below z 0 does not make the new one look as if it floats; ships keep
the waterline.

Headless Chromium with the real three.js, materials and canvas textures;
lighting, tone mapping and colour handling as `js/render3d.js` (the header of
`render.js` lists exactly what matches and what does not). 3.5 s a model,
6.5 s for a compare. `OUT.json` has, per view, the triangle and draw-call
counts from `renderer.info` and the detail numbers: mean Sobel gradient over
the model's interior pixels, share of edge pixels, count of distinct colour
regions. The GAME panel carries an inset of the model at the size it has on
screen at the game's opening zoom - that is the picture the player gets.

`shot.py` remains the tool for geometry (grid in metres, back faces, pivots).
It is NOT evidence of paint or finish; `render.js` is.

## 5. REVIEW

By a second agent - never the builder, and not from the builder's summary.

First the reviewer RE-CHECKS THE SPEC against its references: the scale of
each picture on a second dimension, its origin on the overlay, every
`must_show` station and every landmark's `expect_m`, and each `not_confirmed`
claim (is it really not shown?). The builder usually wrote the spec, the
trace and the stations; a wrong reading there makes the model wrong by
construction (the pilot found three: a box 0.6 m short, a wheel track the
"unconfirmed" list said no view showed, an exhaust station).

Then the reviewer opens, side by side:

1. the reference pictures in `specs/ref/<key>/` (all of them, the "quarter"
   ones too),
2. `render_KEY.png` from the gate (with `--before`: the compare sheet),
3. the REQUIRED extra views, from one render.js call:
   `--views rear,under,quarter,az:A/el:E` with one free view matching each
   quarter photograph's angle (read it off the photo; say which),
4. every `outline_KEY_*.png` and every `overlay_KEY_*` (blend, edges, crops):
   `python3 tools/model3d/overlay.py KEY --out DIR`,
5. `gate_KEY.json` (a FAIL is not reviewed: it goes back), including the
   landmark errors and the `gaps` list.

and scores each line 1-5:

| line | 5 means | 1 means |
|---|---|---|
| **Silhouette / proportion** | the outline lies on the references in every view; no station off by more than the drawing's own error | a different vehicle's proportions |
| **Class-identifying features** | every `must_show` item is present AND in the right place (tick them one by one, naming the view it was checked in and the station) | the type could not be named from the model |
| **Surface detail at the game camera** | at the "as played" inset the major masses, panel breaks and fittings still read; nothing is noise | a plain shape; or detail that only exists at 900 px |
| **Paint / finish** | believable plain service paint, weathering and panel lines on the texture, team colour in small strips | flat single colour, or a texture that reads as noise or camouflage that was not asked for |
| **Cleanliness** | nothing floats (the gate's `gaps` list checked in the under and rear views), nothing pokes through, no z-fighting, wheels upright, no national markings, numerals or text | parts in mid-air, hatches inside other parts, a star or a hull number |

Rules
- Any line under 4 sends the model back, with a CONCRETE list: the feature,
  the view, the station in metres, what the reference shows and what the
  model shows ("aft mast: reference top at z 32 m at x -41, model 28.5 m").
  "Looks crude" is not a finding. A finding that can be measured on a
  reference is proposed as a new landmark.
- Items in the spec's `not_confirmed` are not marked down.
- The reviewer may not edit the model. The reviewer may correct the SPEC (a
  wrong scale or origin, a wrong station, a false `not_confirmed` claim) and
  must say so; a model that follows a wrong spec is not marked down for it.
- The review is written to `review_KEY.md` next to the gate output: the five
  scores, the `must_show` ticks, the list, the files looked at, and one line

      Spec errors: none | <the item, what the reference shows, what the spec said, corrected or not>

  which is never left out.

## What the gate cannot see

- Wrong features in the right silhouette: a radar on the wrong mast, the
  wrong number of road wheels, a hatch under the sail. Only `must_show` and
  the reviewer catch those.
- Anything inside the outline in a view nobody supplied a reference for.
  One side reference says nothing about the plan. Landmarks check only the
  points someone measured; IoU is area-weighted and cannot see a feature
  that is out of place inside the silhouette.
- Whether detail is GOOD. The detail numbers count contrast: camouflage
  blotches, texture noise and big team-colour squares all raise them. They
  catch a rebuild that shows less; they cannot tell rivets from noise.
- Hidden or intersecting geometry, z-fighting (not measured). Floating
  parts are measured by their nearest point only: a part touching at one
  corner and hanging free elsewhere passes.
- Markings drawn as shapes rather than text; the canvas-text scan is a grep
  over the whole source file, not only this key's builder.
- Perspective in a photograph: overlay.py lays an orthographic render on it;
  a photo taken from 30 m tapers by a few per cent, which is the error to
  allow it (say so in the reference's note and the landmark's `tol_m`).
- Animation: that a `turret` or `rotor` node exists, not that it sits on its
  pivot or turns the right way (tools/jsc has checks for those).
- Boxiness and plan fill are calibrated on two models; treat a near miss as
  a prompt to look, and tighten the table as more models pass through.
