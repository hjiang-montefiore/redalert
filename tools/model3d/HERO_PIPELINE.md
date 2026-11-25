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
(the identifying features) and `not_confirmed`. Format: `specs/README.md`.
Pictures go in `specs/ref/<key>/`.

## 2. BUILD

`js/hero/<file>.js` registers `UNIT_MODELS[key] = { len, build(THREE, M, C) }`
on the shared kit. While it is not in `index.html` yet, every tool takes it
with `--extra js/hero/<file>.js`.

## 3. GATE

```sh
python3 tools/model3d/gate.py KEY [--spec tools/model3d/specs/KEY.json] [--before DIR]
                                  [--extra FILE.js] [--out DIR] [--team T] [--no-render]
```

Runs the dump, the outline comparison and the true render, prints PASS / FAIL
/ WARN / INFO per rule with the number and the limit, writes
`DIR/gate_KEY.json`, and exits 1 on any FAIL. About 5 s a model, 10 s with
`--before`. The limits are one table at the top of `gate.py`, a column each
for ship / air / veh:

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
| outline IoU, `exact` references | 0.88 | the silhouette does not lie on the drawing |
| game-view detail vs before (`--before`) | ratio >= 1.00, WARN under 1.10 | the rebuild shows LESS at the game camera |

Reported, not gated: width and height against published, advisory outlines
with their worst stations, the plain-paint scan (canvas `fillText` /
`strokeText`, names like insignia / roundel / star in the model's source
file), other named nodes lost against the before, the renderer's own counts.

The pieces run alone too:

```sh
node tools/model3d/jscnode.js tools/model3d/dump.js -- unit KEY TEAM OUT.json [--extra F] [--root DIR]
python3 tools/model3d/outline.py OUT.json tools/model3d/specs/KEY.json --out DIR
```

`outline.py` writes `DIR/outline_KEY_<n>_<view>.png`: reference outline blue,
model outline red, blue fill where the model is missing or thinner, red fill
where it is fatter or has something extra, and the worst upper-edge,
lower-edge and thickness deviations by station (20 bins along the view),
in metres. (`jscnode.js` runs the JavaScriptCore script under Node; with a
real `jsc`, set `JSC=/path/to/jsc`.)

## 4. RENDER

```sh
node tools/model3d/render.js KEY TEAM OUT.png [--extra FILE.js] [--root DIR]
                             [--views side,top,front,game] [--size 900x520] [--gear up|down]
node tools/model3d/render.js KEY TEAM OUT.png --before DIR      # before | after
```

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
The reviewer opens, side by side:

1. the reference pictures in `specs/ref/<key>/` (all of them, the "quarter"
   ones too),
2. `render_KEY.png` from the gate (with `--before`: the compare sheet),
3. every `outline_KEY_*.png`,
4. `gate_KEY.json` (a FAIL is not reviewed: it goes back).

and scores each line 1-5:

| line | 5 means | 1 means |
|---|---|---|
| **Silhouette / proportion** | the outline lies on the references in every view; no station off by more than the drawing's own error | a different vehicle's proportions |
| **Class-identifying features** | every `must_show` item is present AND in the right place (tick them one by one, naming the view it was checked in) | the type could not be named from the model |
| **Surface detail at the game camera** | at the "as played" inset the major masses, panel breaks and fittings still read; nothing is noise | a plain shape; or detail that only exists at 900 px |
| **Paint / finish** | believable plain service paint, weathering and panel lines on the texture, team colour in small strips | flat single colour, or a texture that reads as noise or camouflage that was not asked for |
| **Cleanliness** | nothing floats, nothing pokes through, no z-fighting, wheels upright, no national markings, numerals or text | parts in mid-air, hatches inside other parts, a star or a hull number |

Rules
- Any line under 4 sends the model back, with a CONCRETE list: the feature,
  the view, the station in metres, what the reference shows and what the
  model shows ("aft mast: reference top at z 32 m at x -41, model 28.5 m").
  "Looks crude" is not a finding.
- Items in the spec's `not_confirmed` are not marked down.
- The reviewer may not edit the model. The reviewer may correct the SPEC (a
  wrong scale or origin on a reference) and must say so.
- The review is written to `review_KEY.md` next to the gate output: the five
  scores, the `must_show` ticks, the list, and the files looked at.

## What the gate cannot see

- Wrong features in the right silhouette: a radar on the wrong mast, the
  wrong number of road wheels, a hatch under the sail. Only `must_show` and
  the reviewer catch those.
- Anything inside the outline in a view nobody supplied a reference for.
  One side reference says nothing about the plan.
- Whether detail is GOOD. The detail numbers count contrast: camouflage
  blotches, texture noise and big team-colour squares all raise them. They
  catch a rebuild that shows less; they cannot tell rivets from noise.
- Hidden or intersecting geometry, floating parts, z-fighting (not measured).
- Markings drawn as shapes rather than text; the paint scan is a grep over
  the whole source file, not only this key's builder.
- Animation: that a `turret` or `rotor` node exists, not that it sits on its
  pivot or turns the right way (tools/jsc has checks for those).
- Boxiness and plan fill are calibrated on two models; treat a near miss as
  a prompt to look, and tighten the table as more models pass through.
