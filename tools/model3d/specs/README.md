# tools/model3d/specs - one spec per hero model

`specs/<key>.json` is stage 1 of the hero pipeline (`../HERO_PIPELINE.md`). It
is written BEFORE the model, from the references, and it is what the gate and
the reviewer hold the model to. Reference pictures live in `specs/ref/<key>/`
so a spec still works after the scratchpad is gone.

```json
{
  "key": "nato_e80_fighter",            // UNIT_MODELS key
  "team": "nato",                       // faction the gate builds it for
  "name": "McDonnell Douglas F-15C Eagle",
  "category": "air",                    // ship | air | veh  - picks the gate's limits
  "published": { "len": 19.43, "span": 13.05, "height": 5.63, "source": "..." },
                                        // ships: len, beam (, draught). Length is gated (1.5%);
                                        // span/beam and height are printed, not gated
  "len": 19.43,                         // what UNIT_MODELS[key].len must be, and the measured
                                        // X extent to within 1.5%
  "nodes": ["gear", "aar_recept"],      // named Object3Ds the engine looks for; all must exist
  "references": [ ... ],                // below
  "must_show": ["twin fins standing wide apart, tips at y +-2.9 m ...", "..."],
                                        // the identifying features. The REVIEWER ticks each one:
                                        // present, and in the right place. Write them so that a
                                        // person who knows the type would name it from the list.
                                        // EVERY item carries its station or position ("x -4.3 ..
                                        // -1.4", "z 3.45", "at 8 per cent of the length"): the gate
                                        // WARNs on an item with none, and a reviewer cannot tick
                                        // "in the right place" against nothing.
  "landmarks": [ ... ],                 // below: points measured on the references, gated in metres
  "free_parts": ["rotordisc"],          // optional: node names whose parts may float (rotordisc and
                                        // flame always may)
  "overlay_crops": [{"name": "cab", "ref": 0, "box_m": [4.4, 1.6, 7.8, 3.3], "zoom": 4}],
                                        // optional: zoomed crops for overlay.py (default: one round
                                        // each landmark of the reference)
  "not_confirmed": ["gear leg lengths ..."]
                                        // what no reference showed. The reviewer does not mark
                                        // these down; the next builder knows where the guesses are.
}
```

## A reference

```json
{
  "name": "[P1] F-15 3-view, plan",     // how reports call it
  "image": "ref/nato_e80_fighter/f15_3v.png",   // relative to the spec file
  "source": "Wikimedia Commons '...'",
  "view": "top",                        // side | top | front  (anything else, e.g. "quarter":
                                        // kept for the reviewer, skipped by outline.py)
  "crop": [0, 0, 800, 1145],            // optional: x0, y0, x1, y1 in the ORIGINAL picture -
                                        // one view out of a three-view sheet
  "rotate": 90,                         // optional: degrees clockwise, any angle (a photo that leans
                                        // 1.5 deg takes 1.5), applied after crop
  "flip": true,                         // optional: mirror left-right, applied after rotate
  "px_per_m": 57.08,                    // scale of the picture (not needed with outline_m alone)
  "origin_px": [x, y],                  // where model (0, 0) of this view falls, in ORIGINAL
                                        // picture pixels (before crop/rotate/flip) ... or:
  "anchor_px": [392.5, 14],             // any pixel you can identify ...
  "anchor_m": [9.72, 0],                // ... and the model point (horizontal, vertical) it is
  "mask": "dark",                       // how the silhouette is taken from the picture:
                                        //   dark   darker than mask_opts.threshold (line drawings)
                                        //   light  lighter than it
                                        //   alpha  the picture's alpha channel
                                        //   bg     differs from the backdrop by more than
                                        //          mask_opts.tolerance; the backdrop is taken per
                                        //          ROW from the row's two ends (a graded sky)
  "mask_opts": { "threshold": 128, "tolerance": 28, "edge_px": 12,
                 "fill": true,          // fill everything the outline encloses (default true)
                 "close_px": 0,         // bridge gaps this wide in a broken line first
                 "open_px": 0 },        // drop specks this small (default 1 for bg)
  "outline_m": [[x, z], ...],           // INSTEAD of image+mask: a hand-traced outline in metres
                                        // (one polygon, or a list of polygons)
  "window_m": [h0, v0, h1, v1],         // optional: compare only inside this box (view metres) -
                                        // keeps out the sea, the undercarriage, a caption
  "ignore_m": [[h0, v0, h1, v1]],       // optional: boxes left out (stores the drawing lacks)
  "align_m": 0.3,                       // optional: the model may slide this far to its best fit
                                        // (reported). Default 0: nothing is fitted.
  "hide": ["gear"],                     // optional: node names left out of the model first (a
                                        // gear-up drawing, stores the drawing lacks)
  "pitch_deg": -3.98,                   // optional: turn the model this far NOSE UP before it is
  "pitch_about_m": [0, 0],              //   compared, about the Y axis through [x, z]: a model sat
                                        //   4 deg nose-up against a drawing in its datum takes -4
  "overlay": { "view": "side", "px_per_m": 14.2, "anchor_px": [250, 646], "anchor_m": [30.21, 0],
               "flip": true },          // optional: fields that override this reference's own for
                                        // overlay.py only - a photograph kept as "quarter" (skipped
                                        // by outline.py) can still have the render laid on it
  "exact": true,                        // true: orthographic and trustworthy - IoU is GATED (0.88)
                                        // false: a photograph with perspective, a painted or
                                        // stylised profile - reported, never gated
  "note": "..."                         // what was measured on it, and what is wrong with it
}
```

The view's axes (model space +X nose, +Y left, +Z up, metres):

| view  | picture must show                  | horizontal | vertical |
|-------|------------------------------------|------------|----------|
| side  | from starboard, nose to the right  | +X         | +Z       |
| top   | from above, nose right, port up    | +X         | +Y       |
| front | from dead ahead                    | +Y         | +Z       |

`crop`, `rotate` and `flip` exist to bring a picture to that orientation: a
plan drawn nose-up takes `"rotate": 90`; a port-side photograph (nose left)
takes `"flip": true`.

Rules of thumb
- Scale a picture on a PUBLISHED dimension and say which in `note`. Check a
  second dimension: if span and length disagree by more than 1.5% the drawing
  is off and belongs in `"exact": false` or needs the caveat written down.
- A long-lens level broadside of a ship is orthographic enough to be exact; a
  photograph taken from close, from above or off the beam is not.
- A line drawing whose outline is closed needs only `"mask": "dark"`. If the
  overlay shows the fill leaking out, raise `close_px`.
- Markings, codes and camouflage on a reference are NOT part of the spec.
- Run `python3 tools/model3d/outline.py DUMP.json specs/<key>.json --out DIR`
  and LOOK at the overlay before trusting the number: a wrong origin or scale
  shows at once as a uniform offset or a uniform blue/red rim.

## landmarks

A landmark is a point a person measured on a reference, and where the model
must have it. The gate reports each one's error in metres and FAILs any beyond
its tolerance; one it cannot evaluate (no triangles selected, no such node) is
a FAIL marked "spec error". 5-8 per model, from the features an outline cannot
see: axle stations, a box's ends, a window's sill, a block's stepped top, a
wheel track.

```json
{ "name": "raised box aft end",       // how reports call it
  "ref": 0,                           // the reference it was measured on (index into references)
  "view": "side",                     // optional: the axes, when the reference is a "quarter"
  "expect_m": [2.49, 2.95],           // [h, v] in the view's axes (side x,z; top x,y; front y,z),
                                      // or [x, y, z]; null = not checked. Or instead:
  "at_px": [714, 354],                //   a pixel of the reference's ORIGINAL picture, turned into
                                      //   metres with its scale, origin and crop/rotate/flip
  "tol_m": 0.15,                      // default per category: 0.15 ship, 0.05 air, 0.08 veh
  "model_at": { ... },                // where the model's point is: below
  "note": "[T2] review 1: box from x +2.49" }
```

`model_at` (the triangles are selected first, then a point taken from them):

| key | meaning |
|---|---|
| `node: "turret", index: 0` | the world position of a named node (the n-th of that name) |
| `path: "gear"` | triangles under a named group (a name equals one segment of the mesh path; with `/` or `*` a path pattern) |
| `material: "hk_glass"` or `"#16242b"` | triangles of a material, by name substring or colour |
| `in_m: [x0, y0, z0, x1, y1, z1]` | triangles whose centroid lies in this box (`"whole": true`: entirely inside) |
| `point: ["max", null]` | per expected axis: `min`, `max` or `mid` of the selection's vertices (default `mid`) |
| `edge: "upper"` / `"lower"` | the selection's silhouette edge at h = expect's h (a crown height, a sill, a deck at a station) |
| `cross: 2.95, from_h: 1.5, to_h: 4.0` | the first h, scanning from_h -> to_h, where the upper edge rises past 2.95 (a box end, a step, a raked front); only h is compared |

A merged kit model has few named nodes, so most selectors are a material and
a box: keep the box tight to the feature (one side of the hull, `y < -4`) or
a rail or a lug standing on it will be what the edge finds. Write the reading
into `note`; a reviewer who re-measures and disagrees corrects the spec, says
so, and never loosens a tolerance to pass a model.

## limits (per-model exceptions)

A gate threshold can be overridden for one model when the rule's assumption does not hold for it,
for example the plan-fill ceiling on a catamaran that really is rectangular. Each override needs a
reason, and the gate prints it as an OVERRIDE line so a reviewer sees it:

    "limits": { "plan_fill_max": { "value": 0.95, "reason": "why this model is an exception" } }

The name must be a key of the LIMITS table in gate.py. Never use an override to pass a model whose
shape is wrong; that is what the rule is for.
