# OPERATION IRONFRONT

A real-time strategy skirmish game in the spirit of *Red Alert 2* and *Empire Earth*,
set strictly in the modern era with real-world military hardware. Human vs. computer,
full combined arms: army, air force, and navy.

## Running it

No install, no dependencies, no server.

- **Ubuntu / Linux:** open `index.html` in Firefox or Chrome (double-click, or `xdg-open index.html`)
- **Windows:** double-click `index.html` (any modern browser)

Everything is plain HTML5/Canvas — the same files run identically on both platforms.

## What's in the box

- **3 factions** with authentic rosters: NATO Expeditionary Force (M1A2, AH-64E, Arleigh Burke, F-16C…),
  Eastern Coalition (T-90A, Mi-28N, Kilo, MiG-29…), People's Liberation Army (Type 99A, Z-10, Type 052D, J-10C…) —
  88 units in total across infantry, armour, aviation and warships.
- **4 real-geography theatres**, rasterised from hand-digitised coastlines:
  Taiwan Strait, Korean Peninsula, Strait of Hormuz, Normandy Coast. Real chokepoints, real mountain
  ranges, real amphibious problems.
- **A realistic combat model:** warhead-vs-armour damage matrix (APFSDS, HEAT, HE, frag, flak…),
  accuracy rolls modified by veterancy, elevation, movement and suppression; misses land in a
  scatter and still explode; guided missiles can be shot down by CIWS and hard-kill APS;
  artillery is blind past its own sights and needs spotters.
- **Logistics:** vehicles burn fuel, aircraft carry finite ordnance and must return to an airbase
  pad or carrier deck; supply trucks and fleet oilers extend operational range; oil derricks feed
  the war machine; power brownouts cripple production and shut down radar and SAMs.
- **A combined-arms AI** that manages its economy, climbs the tech tree, and attacks by land —
  or mounts escorted amphibious landings when the map is split by water (Taiwan!).
  Four difficulty levels from Recruit to Elite.
- **Fog of war** with radar, sonar vs. submarines, veterancy ranks, unit crushing, engineers
  that capture buildings, medics, repair vehicles, MCV expansion, sell/repair, control groups,
  attack-move, rally points, 4 map seeds per theatre via the seed box.

## Controls

| Input | Action |
|---|---|
| LMB / drag | select / box-select |
| **double-click** | select every unit of that type on screen (shift adds) |
| RMB | move · attack · set rally |
| **Ctrl + RMB** | force fire — shell a map point with artillery, MLRS or a launcher |
| **A** + click | attack-move |
| **S** / **G** / **F** | stop / guard / hold fire |
| **D** | deploy MCV |
| **U** | unload transport |
| **Ctrl+0–9** / **0–9** | set / recall control group |
| **Tab** | cycle build tabs |
| **Space** | jump to last event |
| **H** | jump to base |
| **Del** | sell structure |
| **M** | repair mode |
| wheel / MMB / edges / arrows | zoom / pan |

## Files

- `js/rules.js` — every weapon, unit, structure and upgrade (all balance lives here)
- `js/geodata.js` — theatre coastlines/ridges/rivers as lon-lat polygons
- `js/combat.js`, `js/entities.js` — the simulation
- `js/ai.js` — the opponent
- `js/render.js` — the 2.5D isometric renderer (procedural, zero asset files)

The full illustrated unit roster is generated from the live rules data.
