/* ============ infantry_specs.js -- infantry kit, one row per squad ============
   Generated from a per-era spec pass with an adversarial historical audit.
   Consumed by infantry3d.js, which turns each row into a figure: the helmet
   outline, the bulk the webbing adds through the chest, the weapon carried
   across the body and the kit hung off the belt and back. Field meanings are
   documented at the top of that file.

     helmet   steel | para | kevlar | modern | cap
     webbing  belt | vest | plate      (bulk through the chest, in that order)
     weapon   smg assault modernassault battlerifle boltrifle sniper mg
              bazooka recoilless rpg manpads atgm mortar
     gear     entrench backpack canteen bandolier radio greatcoat goggles
              nvg kneepads
     camo     olive | green | grey | woodland | digital | desert
                                                                            */
var INFKIT = {

  /* ---------------------------------------------------------------- e50 */
  /* Combat Engineer: Sleeves rolled, entrenching tool and satchel charge slung across the back instead of ammo pouches. */
  engineer: {era:"e50", fac:"both", role:"engineer", designation:"Combat Engineer", helmet:"steel", webbing:"belt", weapon:"smg", camo:"olive", gear:["entrench", "backpack", "canteen"]},
  /* 37mm AA Gun: Gun crew dug in around a four-wheel carriage, barrel elevated steeply skyward. */
  kpa_e50_aa: {era:"e50", fac:"kpa", role:"aa", designation:"37mm AA Gun", helmet:"steel", webbing:"belt", weapon:"mg", camo:"grey", gear:["canteen", "entrench"]},
  /* 45mm AT Gun: Crew crouched low behind a small sloped gun shield, barrel nearly flat to the ground. */
  kpa_e50_at: {era:"e50", fac:"kpa", role:"at", designation:"45mm AT Gun", helmet:"steel", webbing:"belt", weapon:"recoilless", camo:"grey", gear:["entrench", "greatcoat", "canteen"]},
  /* Rifle Squad: SSh-40 helmet over a quilted grey-brown padded jacket, short Mosin carbine with the bayonet permanently folded alongside. */
  kpa_e50_rifle: {era:"e50", fac:"kpa", role:"rifle", designation:"Rifle Squad", helmet:"steel", webbing:"belt", weapon:"boltrifle", camo:"grey", gear:["bandolier", "greatcoat", "canteen"]},
  /* Quad .50: Single gunner strapped into a powered turret seat between four stubby heavy-barrel guns and two big ammo chests. */
  nato_e50_aa: {era:"e50", fac:"nato", role:"aa", designation:"Quad .50", helmet:"steel", webbing:"belt", weapon:"mg", camo:"olive", gear:["radio", "canteen"]},
  /* Super Bazooka: Fat 3.5-inch tube with a flared blast shield at the muzzle, carried broken in two halves on the march. */
  nato_e50_at: {era:"e50", fac:"nato", role:"at", designation:"Super Bazooka", helmet:"steel", webbing:"belt", weapon:"bazooka", camo:"olive", gear:["backpack", "canteen", "radio"]},
  /* Rifle Squad: Olive drab fatigues, M1 steel pot with the netting cover, wood-stocked semi-auto rifle held at the hip. */
  nato_e50_rifle: {era:"e50", fac:"nato", role:"rifle", designation:"Rifle Squad", helmet:"steel", webbing:"belt", weapon:"battlerifle", camo:"olive", gear:["backpack", "bandolier", "canteen"]},
  /* ZPU-4 Team: four long heavy machine gun barrels in a square block on a four-wheel towed carriage (wheels jacked clear when emplaced), gunner behind an open web sight. */
  pact_e50_aa: {era:"e50", fac:"pact", role:"aa", designation:"ZPU-4 Team", helmet:"steel", webbing:"belt", weapon:"mg", camo:"green", gear:["canteen", "radio", "entrench"]},
  /* RPG-2 Team: Plain wood-gripped launcher tube with an oversized bulb warhead, spare grenades in a two-pocket carry bag. */
  pact_e50_at: {era:"e50", fac:"pact", role:"at", designation:"RPG-2 Team", helmet:"steel", webbing:"belt", weapon:"bazooka", camo:"green", gear:["bandolier", "entrench", "canteen"]},
  /* Motor Rifle Squad: SSh-40 helmet and khaki tunic, curved-magazine AK slung muzzle-down, rolled greatcoat horseshoe over one shoulder. */
  pact_e50_rifle: {era:"e50", fac:"pact", role:"rifle", designation:"Motor Rifle Squad", helmet:"steel", webbing:"belt", weapon:"assault", camo:"green", gear:["backpack", "bandolier", "canteen"]},
  /* Type 55 37mm AA: Standing gun crew clustered around a wheeled towed mount, clip loader poised above the breech. */
  pla_e50_aa: {era:"e50", fac:"pla", role:"aa", designation:"Type 55 37mm AA", helmet:"cap", webbing:"belt", weapon:"mg", camo:"green", gear:["canteen", "entrench"]},
  /* Type 56 RPG Team: Two-man team: short shoulder tube with a fat pear-shaped grenade on the muzzle, loader carrying a canvas warhead bag. */
  pla_e50_at: {era:"e50", fac:"pla", role:"at", designation:"Type 56 RPG Team", helmet:"cap", webbing:"belt", weapon:"bazooka", camo:"green", gear:["bandolier", "canteen"]},
  /* Type 56 Squad: Chest bandolier of three stick-magazine pockets over a faded green tunic, Type 56 with folding spike bayonet. */
  pla_e50_rifle: {era:"e50", fac:"pla", role:"rifle", designation:"Type 56 Squad", helmet:"cap", webbing:"belt", weapon:"assault", camo:"green", gear:["bandolier", "canteen"]},
  /* Bofors AA Gun: Crew seated in the two open ring sights either side of a tall single autocannon barrel. */
  roc_e50_aa: {era:"e50", fac:"roc", role:"aa", designation:"Bofors AA Gun", helmet:"steel", webbing:"belt", weapon:"mg", camo:"olive", gear:["canteen", "radio"]},
  /* Bazooka Team: Long thin stovepipe on the gunner's shoulder, loader kneeling behind with a rocket in both hands. */
  roc_e50_at: {era:"e50", fac:"roc", role:"at", designation:"Bazooka Team", helmet:"steel", webbing:"belt", weapon:"bazooka", camo:"olive", gear:["backpack", "canteen"]},
  /* Rifle Squad: US hand-me-down kit: M1 pot helmet, cartridge belt and Garand clip bandolier over the chest. */
  roc_e50_rifle: {era:"e50", fac:"roc", role:"rifle", designation:"Rifle Squad", helmet:"steel", webbing:"belt", weapon:"battlerifle", camo:"olive", gear:["bandolier", "backpack", "canteen"]},

  /* ---------------------------------------------------------------- e60 */
  /* KPA S-75 launch crew: Peaked field caps and simple belts on a revetted site, servicing a single long rail with a two-stage finned SA-2. */
  kpa_e60_aa: {era:"e60", fac:"kpa", role:"aa", designation:"KPA S-75 launch crew", helmet:"cap", webbing:"belt", weapon:"assault", camo:"olive", gear:["radio", "canteen"]},
  /* KPA RPG-7 gunner: Steel-helmeted gunner with the optic-sighted RPG-7 on his shoulder; the loader's pack bristles with finned PG-7 rounds. */
  kpa_e60_at: {era:"e60", fac:"kpa", role:"at", designation:"KPA RPG-7 gunner", helmet:"steel", webbing:"belt", weapon:"rpg", camo:"olive", gear:["backpack", "canteen", "bandolier"]},
  /* KPA rifleman, Soviet-pattern kit: Soviet-style rounded steel helmet over a khaki tunic, AK clone with a three-cell canvas pouch riding on the waist belt. */
  kpa_e60_rifle: {era:"e60", fac:"kpa", role:"rifle", designation:"KPA rifleman, Soviet-pattern kit", helmet:"steel", webbing:"belt", weapon:"assault", camo:"olive", gear:["canteen", "entrench", "bandolier"]},
  /* NATO Redeye gunner: Steel-helmeted gunner tracking skyward with a stubby shoulder tube and boxy gripstock, waiting on the IR tone. */
  nato_e60_aa: {era:"e60", fac:"nato", role:"aa", designation:"NATO Redeye gunner", helmet:"steel", webbing:"belt", weapon:"manpads", camo:"green", gear:["backpack", "canteen"]},
  /* NATO LAW gunner: Slim disposable M72 tube telescoped open on the shoulder with the pop-up sight raised; spare tubes strapped to the pack. */
  nato_e60_at: {era:"e60", fac:"nato", role:"at", designation:"NATO LAW gunner", helmet:"steel", webbing:"belt", weapon:"bazooka", camo:"green", gear:["backpack", "canteen", "bandolier"]},
  /* NATO rifleman, OG fatigues: Deep steel pot with camouflage band and web belt kit, carrying a long black-and-wood FAL/G3 battle rifle, not an AK. */
  nato_e60_rifle: {era:"e60", fac:"nato", role:"rifle", designation:"NATO rifleman, OG fatigues", helmet:"steel", webbing:"belt", weapon:"assault", camo:"green", gear:["backpack", "radio", "canteen", "entrench"]},
  /* Soviet Strela-2 gunner: Standing gunner with a long green tube and bulbous nose cap on his shoulder; the loader carries a second tube slung. */
  pact_e60_aa: {era:"e60", fac:"pact", role:"aa", designation:"Soviet Strela-2 gunner", helmet:"steel", webbing:"belt", weapon:"manpads", camo:"olive", gear:["backpack", "canteen"]},
  /* Soviet Malyutka gunner: Prone gunner steering with a joystick from an open suitcase launcher, the missile trailing wire off a low rail metres away. */
  pact_e60_at: {era:"e60", fac:"pact", role:"at", designation:"Soviet Malyutka gunner", helmet:"steel", webbing:"belt", weapon:"atgm", camo:"olive", gear:["backpack", "radio", "canteen"]},
  /* Soviet motor rifleman: SSh-68 steel helmet, rolled rain cape and entrenching tool on the belt, AKM held low as he dismounts from the carrier. */
  pact_e60_rifle: {era:"e60", fac:"pact", role:"rifle", designation:"Soviet motor rifleman", helmet:"steel", webbing:"belt", weapon:"assault", camo:"olive", gear:["canteen", "entrench", "bandolier", "greatcoat"]},
  /* PLA HQ-2 launch crew: Static-site crew in soft caps with rifles slung, working a towed rail carrying a huge two-stage finned SA-2 copy. */
  pla_e60_aa: {era:"e60", fac:"pla", role:"aa", designation:"PLA HQ-2 launch crew", helmet:"cap", webbing:"belt", weapon:"assault", camo:"olive", gear:["radio", "canteen"]},
  /* PLA RPG gunner, Type 69: Capped gunner shoulders the bulbous Type 69 warhead while the loader's chest carrier is stuffed with finned spare rockets. */
  pla_e60_at: {era:"e60", fac:"pla", role:"at", designation:"PLA RPG gunner, Type 69", helmet:"cap", webbing:"vest", weapon:"rpg", camo:"olive", gear:["backpack", "canteen", "bandolier"]},
  /* PLA rifleman, Type 65 uniform: No helmet at all: soft peaked cap with a red star, and a three-pocket canvas chest rig over a mustard-olive tunic. */
  pla_e60_rifle: {era:"e60", fac:"pla", role:"rifle", designation:"PLA rifleman, Type 65 uniform", helmet:"cap", webbing:"vest", weapon:"assault", camo:"olive", gear:["bandolier", "canteen", "entrench"]},
  /* ROC HAWK battery crew: Bare-headed technicians in ball caps and fatigues around a three-rail HAWK launcher, rifles left slung on the shoulder. */
  roc_e60_aa: {era:"e60", fac:"roc", role:"aa", designation:"ROC HAWK battery crew", helmet:"cap", webbing:"belt", weapon:"battlerifle", camo:"green", gear:["radio", "canteen"]},
  /* ROC recoilless rifle crew: crew-served m40a1 106mm on its tripod (or jeep pintle), a .50-cal spotting rifle clamped along the top of the barrel; the number two carries a fat 106mm heat round to the breech. */
  roc_e60_at: {era:"e60", fac:"roc", role:"at", designation:"ROC recoilless rifle crew", helmet:"steel", webbing:"belt", weapon:"recoilless", camo:"green", gear:["backpack", "canteen"]},
  /* ROC rifleman, US-pattern kit: American M1 steel pot with foliage band and M1956 belt kit, carrying a long wood-stocked M14-type Type 57 rifle. */
  roc_e60_rifle: {era:"e60", fac:"roc", role:"rifle", designation:"ROC rifleman, US-pattern kit", helmet:"steel", webbing:"belt", weapon:"battlerifle", camo:"green", gear:["backpack", "canteen", "bandolier"]},

  /* ---------------------------------------------------------------- e80 */
  /* S-200 (SA-5 Gammon): Fixed-site guidance crew in peaked soft caps and long greatcoats, carbines slung on the back, dragging heavy cabling - no launcher anywhere on the man. */
  kpa_e80_aa: {era:"e80", fac:"kpa", role:"aa", designation:"S-200 (SA-5 Gammon)", helmet:"cap", webbing:"belt", weapon:"assault", camo:"olive", gear:["radio", "greatcoat"]},
  /* Bulsae-2 Team: gunner lying in behind a 9p135-pattern tripod launcher, a cylindrical missile container clamped on top and a drum-shaped optical tracker on its left side; loader beside him with a second tube. */
  kpa_e80_at: {era:"e80", fac:"kpa", role:"at", designation:"Bulsae-2 Team", helmet:"steel", webbing:"belt", weapon:"atgm", camo:"olive", gear:["backpack", "canteen"]},
  /* Type 88 Squad: Deep-skirted steel helmet and khaki-olive tunic, with AK-74-pattern Type 88 folded wire stock and flat khaki chest pouches worn over the chest. */
  kpa_e80_rifle: {era:"e80", fac:"kpa", role:"rifle", designation:"Type 88 Squad", helmet:"steel", webbing:"vest", weapon:"assault", camo:"olive", gear:["canteen", "bandolier", "entrench"]},
  /* Stinger: Fat tapered launch tube on the shoulder with the pistol-grip gripstock and the square lattice IFF antenna unfolded ahead of the gunner's face. */
  nato_e80_aa: {era:"e80", fac:"nato", role:"aa", designation:"Stinger", helmet:"kevlar", webbing:"vest", weapon:"manpads", camo:"woodland", gear:["backpack", "goggles"]},
  /* AT4: Single man, no crew and no tripod: a smooth olive disposable tube on the shoulder with the flip-up plastic sights and red firing lever on top. */
  nato_e80_at: {era:"e80", fac:"nato", role:"at", designation:"AT4", helmet:"kevlar", webbing:"vest", weapon:"recoilless", camo:"woodland", gear:["backpack", "canteen"]},
  /* Rifle Squad: The definitive 1980s silhouette: PASGT Fritz helmet under a woodland cloth cover with the elastic camo band, flak vest over M81 woodland BDUs, M16A2 at the ready. */
  nato_e80_rifle: {era:"e80", fac:"nato", role:"rifle", designation:"Rifle Squad", helmet:"kevlar", webbing:"vest", weapon:"assault", camo:"woodland", gear:["backpack", "canteen", "entrench", "bandolier"]},
  /* Igla Team: Standing gunner with a slender tube angled steeply skyward, conical needle nose-spike on the front and a boxy battery-coolant unit clipped under the grip. */
  pact_e80_aa: {era:"e80", fac:"pact", role:"aa", designation:"Igla Team", helmet:"steel", webbing:"vest", weapon:"manpads", camo:"green", gear:["backpack", "canteen"]},
  /* Konkurs Team: Squat tripod with a cylindrical missile container clamped on top and the drum-shaped thermal/optical sight bolted to its side, loader kneeling with a second tube. */
  pact_e80_at: {era:"e80", fac:"pact", role:"at", designation:"Konkurs Team", helmet:"steel", webbing:"vest", weapon:"atgm", camo:"green", gear:["backpack", "canteen"]},
  /* Motor Rifle Squad: Round-domed SSh-68 steel helmet over a khaki-green field blouse, bulky quilted flak vest, AK-74 with the slotted muzzle brake and orange plastic magazine. */
  pact_e80_rifle: {era:"e80", fac:"pact", role:"rifle", designation:"Motor Rifle Squad", helmet:"steel", webbing:"vest", weapon:"assault", camo:"green", gear:["canteen", "entrench", "backpack"]},
  /* HN-5: Slim Strela-pattern tube shouldered nose-high with the ball-nosed seeker cap still on, gunner in the same steel pot and chest rig as the rifle squad. */
  pla_e80_aa: {era:"e80", fac:"pla", role:"aa", designation:"HN-5", helmet:"steel", webbing:"vest", weapon:"manpads", camo:"green", gear:["backpack", "canteen"]},
  /* HJ-8 Red Arrow: Two-man crew crouched behind a squat tripod launcher with a long square-section missile tube and a boxy sight offset to the left; the second man hugs a spare canister. */
  pla_e80_at: {era:"e80", fac:"pla", role:"at", designation:"HJ-8 Red Arrow", helmet:"steel", webbing:"vest", weapon:"atgm", camo:"green", gear:["backpack", "canteen"]},
  /* Type 81 Squad: Bare GK80 steel pot over a plain grass-green tunic, with the three-cell canvas chest rig riding high on the ribs and a wood-furniture Type 81 held across it. */
  pla_e80_rifle: {era:"e80", fac:"pla", role:"rifle", designation:"Type 81 Squad", helmet:"steel", webbing:"vest", weapon:"assault", camo:"green", gear:["canteen", "entrench", "backpack"]},
  /* Improved HAWK: Battery crew rather than shooters: soft caps, sleeves rolled, rifles slung muzzle-down while they walk a cable reel out toward the radar - nothing on the shoulder. */
  roc_e80_aa: {era:"e80", fac:"roc", role:"aa", designation:"Improved HAWK", helmet:"cap", webbing:"belt", weapon:"assault", camo:"olive", gear:["radio", "canteen"]},
  /* TOW Team: Tall splayed tripod with the fat drum-shaped optical tracker slung under the launch tube, gunner seated behind it on the ground. */
  roc_e80_at: {era:"e80", fac:"roc", role:"at", designation:"TOW Team", helmet:"steel", webbing:"belt", weapon:"atgm", camo:"olive", gear:["backpack", "radio", "canteen"]},
  /* Rifle Squad: Looks a decade behind everyone else: US-pattern M1 steel pot, olive fatigues and web belt with suspenders, but carrying a stubby 5.56mm Type 65 assault rifle. */
  roc_e80_rifle: {era:"e80", fac:"roc", role:"rifle", designation:"Rifle Squad", helmet:"steel", webbing:"belt", weapon:"assault", camo:"olive", gear:["canteen", "bandolier", "entrench"]},

  /* ---------------------------------------------------------------- e90 */
  /* KPA SAM Battery Crew: rear-area manpads pair with an ht-16pgj (sa-7/strela-2 copy) tube shouldered, soft cap and belt kit, no body armour. */
  kpa_e90_aa: {era:"e90", fac:"kpa", role:"aa", designation:"KPA SAM Battery Crew", helmet:"cap", webbing:"belt", weapon:"manpads", camo:"olive", gear:["radio", "greatcoat", "canteen"]},
  /* KPA Bulsae-2 Team: Steel-helmeted pair prone behind a squat wire-guided launcher, control box on a lanyard and no body armour anywhere. */
  kpa_e90_at: {era:"e90", fac:"kpa", role:"at", designation:"KPA Bulsae-2 Team", helmet:"steel", webbing:"belt", weapon:"atgm", camo:"olive", gear:["radio", "canteen", "bandolier"]},
  /* KPA Rifleman: a type 88 with a plain curved 30-round magazine (the standard ak-74-pattern box) */
  kpa_e90_rifle: {era:"e90", fac:"kpa", role:"rifle", designation:"KPA Rifleman", helmet:"steel", webbing:"belt", weapon:"assault", camo:"olive", gear:["backpack", "canteen", "entrench", "bandolier"]},
  /* NATO Stinger Team: Standing gunner with the Stinger's pistol gripstock under the tube and a boxy IFF interrogator hanging at the hip. */
  nato_e90_aa: {era:"e90", fac:"nato", role:"aa", designation:"NATO Stinger Team", helmet:"kevlar", webbing:"vest", weapon:"manpads", camo:"woodland", gear:["radio", "nvg", "canteen", "goggles"]},
  /* NATO Javelin Team: gunner prone behind a tripod-mounted tow-2a/dragon launcher, optical tracker on the left of the tube and the wire spool running out ahead. */
  nato_e90_at: {era:"e90", fac:"nato", role:"at", designation:"NATO Javelin Team", helmet:"kevlar", webbing:"vest", weapon:"atgm", camo:"woodland", gear:["backpack", "radio", "nvg", "canteen"]},
  /* NATO Rifleman: Fritz-shell kevlar with a woodland cover and cat-eye band, PASGT flak vest, and night-vision goggles flipped up on the helmet mount. */
  nato_e90_rifle: {era:"e90", fac:"nato", role:"rifle", designation:"NATO Rifleman", helmet:"kevlar", webbing:"vest", weapon:"assault", camo:"woodland", gear:["backpack", "canteen", "entrench", "nvg"]},
  /* Igla Team: Igla tube with the distinctive pointed conical nose cap on the muzzle and a drum-shaped battery unit clipped under the gripstock. */
  pact_e90_aa: {era:"e90", fac:"pact", role:"aa", designation:"Igla Team", helmet:"kevlar", webbing:"vest", weapon:"manpads", camo:"green", gear:["radio", "canteen", "goggles"]},
  /* Kornet Team: Very low tripod with a large slab-sided thermal sight bolted to the left of the tube, gunner lying almost flat behind it. */
  pact_e90_at: {era:"e90", fac:"pact", role:"at", designation:"Kornet Team", helmet:"kevlar", webbing:"vest", weapon:"atgm", camo:"green", gear:["backpack", "radio", "canteen"]},
  /* Motor Rifleman: Segmented flak vest with horizontal quilted rows over blotchy green field dress, AK-74 with a plum-brown magazine and slotted muzzle brake. */
  pact_e90_rifle: {era:"e90", fac:"pact", role:"rifle", designation:"Motor Rifleman", helmet:"steel", webbing:"vest", weapon:"assault", camo:"green", gear:["backpack", "canteen", "entrench", "bandolier"]},
  /* PLA Air Defence Crew: Battery crewman with dust goggles pushed up on the helmet, radio handset in one hand and a shoulder SAM tube braced in the other. */
  pla_e90_aa: {era:"e90", fac:"pla", role:"aa", designation:"PLA Air Defence Crew", helmet:"kevlar", webbing:"vest", weapon:"manpads", camo:"olive", gear:["radio", "goggles", "canteen"]},
  /* PLA Anti-Tank Team: Two men crouched over a low HJ-8 tripod, wire spool and boxy sight between them, spare stubby PF-89 tube slung on the loader's back. */
  pla_e90_at: {era:"e90", fac:"pla", role:"at", designation:"PLA Anti-Tank Team", helmet:"kevlar", webbing:"vest", weapon:"atgm", camo:"olive", gear:["backpack", "radio", "canteen"]},
  /* PLA Rifleman, late 1990s: Bullpup QBZ-95 with the magazine behind the grip, carried over a flat Type 95 chest rig of stacked pouches. */
  pla_e90_rifle: {era:"e90", fac:"pla", role:"rifle", designation:"PLA Rifleman, late 1990s", helmet:"kevlar", webbing:"vest", weapon:"modernassault", camo:"olive", gear:["backpack", "canteen", "entrench", "bandolier"]},
  /* ROC Air Defence Crew: stinger gunner in woodland, tube shouldered at a steep angle skyward, iff interrogator box at the hip and the spotter beside him. */
  roc_e90_aa: {era:"e90", fac:"roc", role:"aa", designation:"ROC Air Defence Crew", helmet:"kevlar", webbing:"vest", weapon:"manpads", camo:"woodland", gear:["radio", "goggles", "canteen"]},
  /* ROC TOW-2A Team: Tall TOW tripod with the big square optical sight box at eye height and the gunner seated behind it, legs splayed wide. */
  roc_e90_at: {era:"e90", fac:"roc", role:"at", designation:"ROC TOW-2A Team", helmet:"kevlar", webbing:"vest", weapon:"atgm", camo:"woodland", gear:["backpack", "radio", "canteen"]},
  /* ROC Rifleman: American-cut PASGT shell and flak vest over woodland fatigues, carrying a stubby T65 rifle with a fixed carry handle. */
  roc_e90_rifle: {era:"e90", fac:"roc", role:"rifle", designation:"ROC Rifleman", helmet:"kevlar", webbing:"vest", weapon:"assault", camo:"woodland", gear:["backpack", "canteen", "entrench", "bandolier"]},

  /* ---------------------------------------------------------------- e00 */
  /* KN-06 Pongae-5: Peaked olive service cap instead of a helmet, tube on the shoulder, cable running to the KN-06 launcher. */
  kpa_e00_aa: {era:"e00", fac:"kpa", role:"aa", designation:"KN-06 Pongae-5", helmet:"cap", webbing:"vest", weapon:"manpads", camo:"olive", gear:["radio", "canteen"]},
  /* Bulsae-3 Team: Prone behind a low Bulsae-3 tripod with a blocky laser sight; chest rig only, no plate carrier. */
  kpa_e00_at: {era:"e00", fac:"kpa", role:"at", designation:"Bulsae-3 Team", helmet:"steel", webbing:"vest", weapon:"atgm", camo:"olive", gear:["backpack", "radio", "canteen"]},
  /* Type 88 Squad: Deliberately a generation behind: rounded steel helmet, olive AK chest rig, Type 88 with the coiled helical magazine. */
  kpa_e00_rifle: {era:"e00", fac:"kpa", role:"rifle", designation:"Type 88 Squad", helmet:"steel", webbing:"vest", weapon:"assault", camo:"olive", gear:["bandolier", "canteen", "entrench"]},
  /* Patriot PAC-3: PAC-3 crewman with a headset over the helmet and a whip antenna off his back, tube angled high. */
  nato_e00_aa: {era:"e00", fac:"nato", role:"aa", designation:"Patriot PAC-3", helmet:"modern", webbing:"plate", weapon:"manpads", camo:"desert", gear:["radio", "goggles", "canteen"]},
  /* Javelin: Javelin gunner kneeling, CLU block on a wide green tube carried over a tan plate carrier, NVG mount flipped up. */
  nato_e00_at: {era:"e00", fac:"nato", role:"at", designation:"Javelin", helmet:"modern", webbing:"plate", weapon:"atgm", camo:"desert", gear:["backpack", "nvg", "kneepads"]},
  /* Rifle Squad: single-tube an/pvs-14 monocular on the helmet mount, railed m4 carbine, tan carrier bristling with pouches. */
  nato_e00_rifle: {era:"e00", fac:"nato", role:"rifle", designation:"Rifle Squad", helmet:"modern", webbing:"plate", weapon:"modernassault", camo:"desert", gear:["backpack", "nvg", "kneepads", "radio"]},
  /* Igla-S Team: Slim Igla-S tube with a bulbous nose cap and blocky gripstock, spare round strapped across the back. */
  pact_e00_aa: {era:"e00", fac:"pact", role:"aa", designation:"Igla-S Team", helmet:"modern", webbing:"plate", weapon:"manpads", camo:"green", gear:["backpack", "radio", "goggles"]},
  /* Kornet Team: Long slab-sided Kornet on a low tripod, thermal sight box bolted to the left, gunner flat behind it. */
  pact_e00_at: {era:"e00", fac:"pact", role:"at", designation:"Kornet Team", helmet:"modern", webbing:"plate", weapon:"atgm", camo:"green", gear:["backpack", "radio", "kneepads"]},
  /* Motor Rifle Squad: Ratnik silhouette: round railed 6B47 helmet, bulky green plate rig, AK-74M with a side-rail optic. */
  pact_e00_rifle: {era:"e00", fac:"pact", role:"rifle", designation:"Motor Rifle Squad", helmet:"modern", webbing:"plate", weapon:"modernassault", camo:"green", gear:["backpack", "nvg", "kneepads", "canteen"]},
  /* HQ-9 / HQ-16 / S-400: Battery crewman under a headset, tube skyward, thick cable trailing back to the HQ-9 erector. */
  pla_e00_aa: {era:"e00", fac:"pla", role:"aa", designation:"HQ-9 / HQ-16 / S-400", helmet:"modern", webbing:"plate", weapon:"manpads", camo:"digital", gear:["radio", "goggles", "canteen"]},
  /* HJ-12 Red Arrow Team: Fat HJ-12 tube up on the shoulder with a squared sight block; loader behind him hauling a second canister. */
  pla_e00_at: {era:"e00", fac:"pla", role:"at", designation:"HJ-12 Red Arrow Team", helmet:"modern", webbing:"plate", weapon:"atgm", camo:"digital", gear:["backpack", "radio", "kneepads"]},
  /* QBZ-95-1 Squad: Bullpup QBZ-95-1 held with the magazine behind the grip, over a blue-green pixel plate carrier. */
  pla_e00_rifle: {era:"e00", fac:"pla", role:"rifle", designation:"QBZ-95-1 Squad", helmet:"modern", webbing:"plate", weapon:"modernassault", camo:"digital", gear:["backpack", "kneepads", "canteen", "radio"]},
  /* Patriot PAC-3: PAC-3 crewman in a woodland helmet cover, tube raised beside the pale canister pack of the launch station. */
  roc_e00_aa: {era:"e00", fac:"roc", role:"aa", designation:"Patriot PAC-3", helmet:"modern", webbing:"plate", weapon:"manpads", camo:"woodland", gear:["radio", "goggles", "canteen"]},
  /* Javelin Team: Kneeling gunner with the boxy CLU sight clamped under a pale launch tube, spotter crouched at his shoulder. */
  roc_e00_at: {era:"e00", fac:"roc", role:"at", designation:"Javelin Team", helmet:"modern", webbing:"plate", weapon:"atgm", camo:"woodland", gear:["backpack", "radio", "kneepads"]},
  /* Infantry Squad: Short railed T91 carbine and a woodland helmet cover, plate carrier worn high and cinched tight. */
  roc_e00_rifle: {era:"e00", fac:"roc", role:"rifle", designation:"Infantry Squad", helmet:"modern", webbing:"plate", weapon:"modernassault", camo:"woodland", gear:["backpack", "kneepads", "canteen", "nvg"]},

  /* ---------------------------------------------------------------- e20 */
  /* Combat medic, 2020s: Oversized aid bag slung across the back, red-cross armband, carbine hanging muzzle-down on the sling. */
  medic: {era:"e20", fac:"both", role:"medic", designation:"Combat medic, 2020s", helmet:"modern", webbing:"plate", weapon:"modernassault", camo:"olive", gear:["backpack", "radio", "kneepads", "canteen"]},
  /* KPA HT-16PGJ team, 2020s: Short Igla-clone tube on the shoulder with a thick shoulder pad and no IFF antenna. */
  aa_k: {era:"e20", fac:"kpa", role:"aa", designation:"KPA HT-16PGJ team, 2020s", helmet:"steel", webbing:"vest", weapon:"manpads", camo:"olive", gear:["backpack", "canteen"]},
  /* KPA Bulsae team, 2020s: Bulsae tripod launcher, bare olive tube and a stubby unpainted sight box -- a plain Kornet copy. */
  at_k: {era:"e20", fac:"kpa", role:"at", designation:"KPA Bulsae team, 2020s", helmet:"steel", webbing:"vest", weapon:"atgm", camo:"olive", gear:["backpack", "canteen", "entrench"]},
  /* KPA Type 73 team, 2020s: Type 73 with a curved box magazine standing up out of the top of the receiver, bipod down. */
  mg_k: {era:"e20", fac:"kpa", role:"mg", designation:"KPA Type 73 team, 2020s", helmet:"steel", webbing:"vest", weapon:"mg", camo:"olive", gear:["backpack", "bandolier", "canteen"]},
  /* KPA 82mm mortar team, 2020s: 82mm tube hand-carried on the shoulder, rounds in canvas three-round chest bags. */
  mortar_k: {era:"e20", fac:"kpa", role:"mortar", designation:"KPA 82mm mortar team, 2020s", helmet:"steel", webbing:"vest", weapon:"mortar", camo:"olive", gear:["backpack", "entrench", "bandolier", "canteen"]},
  /* KPA rifleman, 2020s: Type 88 AK with the spiral helical magazine wrapped over the handguard, iron sights only. */
  rifle_k: {era:"e20", fac:"kpa", role:"rifle", designation:"KPA rifleman, 2020s", helmet:"steel", webbing:"vest", weapon:"assault", camo:"olive", gear:["backpack", "canteen", "entrench", "bandolier"]},
  /* KPA designated marksman, 2020s: SVD clone with a wooden thumbhole stock and long PSO scope, no ghillie or spotter. */
  sniper_k: {era:"e20", fac:"kpa", role:"sniper", designation:"KPA designated marksman, 2020s", helmet:"steel", webbing:"vest", weapon:"sniper", camo:"olive", gear:["backpack", "canteen"]},
  /* NATO Stinger team, 2020s: Standing with the Stinger shouldered, gripstock gripped underhand and the IFF antenna folded out. */
  aa_n: {era:"e20", fac:"nato", role:"aa", designation:"NATO Stinger team, 2020s", helmet:"modern", webbing:"plate", weapon:"manpads", camo:"woodland", gear:["backpack", "radio", "nvg"]},
  /* NATO Javelin team, 2020s: Gunner kneeling with the fat blocky command unit on his shoulder, tube canted up at twenty degrees. */
  at_n: {era:"e20", fac:"nato", role:"at", designation:"NATO Javelin team, 2020s", helmet:"modern", webbing:"plate", weapon:"atgm", camo:"woodland", gear:["backpack", "radio", "nvg", "kneepads"]},
  /* NATO medium MG team, 2020s: Gunner hunched behind a tripod-mounted 7.62 while the assistant feeds a linked belt off his shoulder. */
  mg_n: {era:"e20", fac:"nato", role:"mg", designation:"NATO medium MG team, 2020s", helmet:"modern", webbing:"plate", weapon:"mg", camo:"woodland", gear:["backpack", "bandolier", "kneepads", "nvg"]},
  /* NATO 81mm mortar team, 2020s: 81mm tube and bipod split across three men, loader holding a finned round over the muzzle. */
  mortar_n: {era:"e20", fac:"nato", role:"mortar", designation:"NATO 81mm mortar team, 2020s", helmet:"modern", webbing:"plate", weapon:"mortar", camo:"woodland", gear:["backpack", "radio", "kneepads", "bandolier"]},
  /* NATO rifleman, 2020s: Quad-tube NVG flipped up on the helmet rail above a slick squared plate carrier. */
  rifle_n: {era:"e20", fac:"nato", role:"rifle", designation:"NATO rifleman, 2020s", helmet:"modern", webbing:"plate", weapon:"modernassault", camo:"woodland", gear:["backpack", "radio", "nvg", "kneepads"]},
  /* NATO sniper pair, 2020s: Ghillie drape over boonie hat and rifle, spotter's scope on a short tripod beside him. */
  sniper_n: {era:"e20", fac:"nato", role:"sniper", designation:"NATO sniper pair, 2020s", helmet:"cap", webbing:"plate", weapon:"sniper", camo:"woodland", gear:["backpack", "radio", "nvg"]},
  /* Pact Igla team, 2020s: Igla tube shouldered with the pointed nose cone cap still on and the thin ranging antenna up. */
  aa_p: {era:"e20", fac:"pact", role:"aa", designation:"Pact Igla team, 2020s", helmet:"modern", webbing:"plate", weapon:"manpads", camo:"digital", gear:["backpack", "radio", "canteen"]},
  /* Pact Kornet team, 2020s: Kornet low on its tripod, gunner prone behind the boxy thermal sight with a spare tube laid alongside. */
  at_p: {era:"e20", fac:"pact", role:"at", designation:"Pact Kornet team, 2020s", helmet:"modern", webbing:"plate", weapon:"atgm", camo:"digital", gear:["backpack", "radio", "canteen"]},
  /* Pact PK machine-gun team, 2020s: PKP on a bipod with the green 100-round belt drum clipped under the receiver. */
  mg_p: {era:"e20", fac:"pact", role:"mg", designation:"Pact PK machine-gun team, 2020s", helmet:"modern", webbing:"plate", weapon:"mg", camo:"digital", gear:["backpack", "bandolier", "canteen"]},
  /* Pact 2B14 Podnos team, 2020s: Podnos baseplate bedded into a scraped pit, crewman hanging the round over the muzzle two-handed. */
  mortar_p: {era:"e20", fac:"pact", role:"mortar", designation:"Pact 2B14 Podnos team, 2020s", helmet:"modern", webbing:"plate", weapon:"mortar", camo:"digital", gear:["backpack", "canteen", "entrench", "bandolier"]},
  /* Pact motor rifleman, 2020s: ak-12 with a side-rail red dot and black polymer magazine */
  rifle_p: {era:"e20", fac:"pact", role:"rifle", designation:"Pact motor rifleman, 2020s", helmet:"modern", webbing:"plate", weapon:"modernassault", camo:"digital", gear:["backpack", "kneepads", "canteen", "radio"]},
  /* Pact SVD marksman, 2020s: SVD-pattern rifle, long scope offset to the left of the receiver over a wood-toned handguard. */
  sniper_p: {era:"e20", fac:"pact", role:"sniper", designation:"Pact SVD marksman, 2020s", helmet:"modern", webbing:"plate", weapon:"sniper", camo:"digital", gear:["backpack", "canteen", "radio"]},
  /* PLA FN-6 team, 2020s: FN-6 shouldered, its blunt pyramid four-window seeker nose unmistakable head-on. */
  aa_c: {era:"e20", fac:"pla", role:"aa", designation:"PLA FN-6 team, 2020s", helmet:"modern", webbing:"plate", weapon:"manpads", camo:"green", gear:["backpack", "radio"]},
  /* PLA Red Arrow team, 2020s: Red Arrow launcher on a squat tripod, boxy sighting unit offset to the left of the tube. */
  at_c: {era:"e20", fac:"pla", role:"at", designation:"PLA Red Arrow team, 2020s", helmet:"modern", webbing:"plate", weapon:"atgm", camo:"green", gear:["backpack", "radio", "goggles"]},
  /* PLA QJY weapons team, 2020s: QJY-88 on its bipod with the belt box hung off the left side of the receiver. */
  mg_c: {era:"e20", fac:"pla", role:"mg", designation:"PLA QJY weapons team, 2020s", helmet:"modern", webbing:"plate", weapon:"mg", camo:"green", gear:["backpack", "bandolier", "kneepads"]},
  /* PLA PP-87 mortar team, 2020s: 82mm tube over a round olive baseplate, rounds carried in three-round tube racks. */
  mortar_c: {era:"e20", fac:"pla", role:"mortar", designation:"PLA PP-87 mortar team, 2020s", helmet:"modern", webbing:"plate", weapon:"mortar", camo:"green", gear:["backpack", "bandolier", "entrench"]},
  /* PLA rifleman, 2020s: QBZ-191 carried conventionally with a rail optic -- no bullpup hump -- over green pixel fatigues. */
  rifle_c: {era:"e20", fac:"pla", role:"rifle", designation:"PLA rifleman, 2020s", helmet:"modern", webbing:"plate", weapon:"modernassault", camo:"green", gear:["backpack", "radio", "nvg", "kneepads"]},
  /* PLA QBU marksman, 2020s: QBU-88 bullpup -- magazine behind the trigger, scope pushed well forward over the barrel. */
  sniper_c: {era:"e20", fac:"pla", role:"sniper", designation:"PLA QBU marksman, 2020s", helmet:"modern", webbing:"plate", weapon:"sniper", camo:"green", gear:["backpack", "radio", "nvg"]},
  /* ROC Stinger team, 2020s: Stinger up on the shoulder while the number two hugs a spare round in its green fibreglass tube. */
  aa_r: {era:"e20", fac:"roc", role:"aa", designation:"ROC Stinger team, 2020s", helmet:"modern", webbing:"plate", weapon:"manpads", camo:"grey", gear:["backpack", "radio"]},
  /* ROC Javelin team, 2020s: Same blocky Javelin unit as NATO, but shouldered by a crewman in blue-grey with a T91 slung on his back. */
  at_r: {era:"e20", fac:"roc", role:"at", designation:"ROC Javelin team, 2020s", helmet:"modern", webbing:"plate", weapon:"atgm", camo:"grey", gear:["backpack", "radio", "nvg"]},
  /* ROC T74 weapons team, 2020s: T74 MAG-pattern gun, slotted barrel jacket and carry handle, second man setting the tripod. */
  mg_r: {era:"e20", fac:"roc", role:"mg", designation:"ROC T74 weapons team, 2020s", helmet:"modern", webbing:"plate", weapon:"mg", camo:"grey", gear:["backpack", "bandolier", "kneepads"]},
  /* ROC T75 60mm mortar team, 2020s: Short 60mm tube fired handheld off a spade baseplate, no bipod on the mount. */
  mortar_r: {era:"e20", fac:"roc", role:"mortar", designation:"ROC T75 60mm mortar team, 2020s", helmet:"modern", webbing:"plate", weapon:"mortar", camo:"grey", gear:["backpack", "radio", "kneepads", "bandolier"]},
  /* ROC rifleman, 2020s: T91 carbine with folding stock and top rail, blue-grey pixel uniform under the carrier. */
  rifle_r: {era:"e20", fac:"roc", role:"rifle", designation:"ROC rifleman, 2020s", helmet:"modern", webbing:"plate", weapon:"modernassault", camo:"grey", gear:["backpack", "radio", "nvg", "kneepads"]},
  /* ROC sniper pair, 2020s: Boonie hat instead of a helmet, scoped bolt gun on a bipod with the spotter glassing beside him. */
  sniper_r: {era:"e20", fac:"roc", role:"sniper", designation:"ROC sniper pair, 2020s", helmet:"cap", webbing:"plate", weapon:"sniper", camo:"grey", gear:["backpack", "radio", "nvg"]},
};
if (typeof Infantry3D !== "undefined" && Infantry3D.registerAll) Infantry3D.registerAll();
