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
  "must_show": ["twin fins standing wide apart ...", "..."],
                                        // the identifying features. The REVIEWER ticks each one:
                                        // present, and in the right place. Write them so that a
                                        // person who knows the type would name it from the list.
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
  "rotate": 90,                         // optional: 0/90/180/270 clockwise, applied after crop
  "flip": true,                         // optional: mirror left-right, applied after rotate
  "px_per_m": 57.08,                    // scale of the picture
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

## limits (per-model exceptions)

A gate threshold can be overridden for one model when the rule's assumption does not hold for it,
for example the plan-fill ceiling on a catamaran that really is rectangular. Each override needs a
reason, and the gate prints it as an OVERRIDE line so a reviewer sees it:

    "limits": { "plan_fill_max": { "value": 0.95, "reason": "why this model is an exception" } }

The name must be a key of the LIMITS table in gate.py. Never use an override to pass a model whose
shape is wrong; that is what the rule is for.
