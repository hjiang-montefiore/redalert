/* ============ combat.js — firing, projectiles, damage resolution ============
   Realism model:
   - every shot rolls accuracy: base * veterancy * elevation * movement penalty
   - misses land in a scatter ellipse and still explode (danger-close is real)
   - guided missiles track their target and can be killed by CIWS / APS
   - arcing shells are unjammable but slow: you can walk out from under them
   - suppression: units under fire shoot worse until it decays
   - ammunition: aircraft carry finite ordnance; ground units draw from supply  */
var Combat = (function () {
  let projectiles = [];
  let effects = [];        // muzzle flashes, explosions, tracers, wrecks

  /* hitLog is cleared here too: a fresh battle must not inherit the previous
     one's combat feed, the same way the projectile list does not. */
  function reset() { projectiles = []; effects = []; hitLog.length = 0; }

  function nearCam(x, y) {
    try {
      const c = Render.cam;
      return U.dist(x, y, c.x, c.y) < 900 / Math.max(0.5, c.z);
    } catch (e) { return false; }
  }

  /* --------------------------------------------------------- firing */
  function fire(game, shooter, weapon, target) {
    const w = weapon;
    const fac = FACTIONS[shooter.owner.faction];
    /* stabilised fire control keeps a moving tank accurate; unstabilised does not */
    const fc = fac && fac.fireCtrl ? fac.fireCtrl : 1;
    const movePen = shooter.moving && !shooter.def.hover
      ? 1 - U.clamp(CFG.MOVING_ACC_PENALTY / fc, 0.04, 0.85) : 1;

    /* A unit that has been out of contact with its supply chain is not being
       serviced and is rationing what it has. It shoots worse long before it
       actually runs out. */
    const strain = shooter.supplyStrain ? shooter.supplyStrain() : 0;
    const supplyMul = 1 - 0.30 * strain;

    const accMul = (fac ? fac.accMul : 1) * CFG.VET_ACC[shooter.vet] * movePen * supplyMul *

      (1 - 0.35 * (shooter.suppress / CFG.SUPPRESS_MAX));

    /* elevation advantage for ground shooters */
    let elevBonus = 0;
    if (shooter.layer === "ground" && target.layer === "ground") {
      const se = GameMap.elevAt(game.map, shooter.tx, shooter.ty);
      const te = GameMap.elevAt(game.map, target.tx, target.ty);
      elevBonus = U.clamp(se - te, -2, 2) * CFG.ELEV_ACC_BONUS;
    }
    /* --- sensor quality: firing beyond your own eyes needs radar --- */
    /* you cannot shoot well at what you can barely see */
    let visMul = 1;
    if (game.visionMul) {
      const v = game.visionMul(shooter);
      if (v < 1) {
        const reach = shooter.sightR() * CFG.TILE;
        const d = U.dist(shooter.x, shooter.y, target.x, target.y);
        if (d > reach * 0.6) visMul = U.clamp(v + 0.35, 0.35, 1);
      }
    }

    let sensorMul = 1;
    const rangePx = U.dist(shooter.x, shooter.y, target.x, target.y);
    const organic = (shooter.sightR ? shooter.sightR() : 6) * CFG.TILE;
    if (rangePx > organic) {
      sensorMul = game.radarCovers(shooter.owner, target.x, target.y)
        ? CFG.RADAR_FIRE_ACC : CFG.BLIND_FIRE_ACC;
    }

    /* A low-observable hull is genuinely harder for a missile seeker to lock
       onto - the same fourth-root relationship that governs radar range. */
    let rcsMul = 1;
    if (w.proj === "missile" && target.def && target.def.rcs !== undefined &&
        target.cat === "naval") {
      rcsMul = U.clamp(Math.pow(target.def.rcs, 0.22), 0.55, 1.15);
    }

    /* ---- how much this shot leans on radar ----
       Guns are not exempt from the sensor war. A naval mount is laid by fire
       control radar, a SPAAG tracks its target by radar, and indirect fire
       depends on someone observing the fall of shot. A tank gun is the least
       radar-dependent thing on the field because it ranges with a laser and
       aims through thermal optics - but even it shoots better when its side
       holds a picture of where the enemy is. */
    const rdep = radarDependence(shooter, w);

    /* fire-control quality: holding the target on radar sharpens the
       solution; losing that picture blunts it, even inside visual range */
    let fcMul = 1;
    if (rdep > 0.30) {
      /* A gun with no radar picture still shoots - it is simply much worse at
         it. A naval mount laid by eye, or a SPAAG hosing at a jet it cannot
         track, is close to wasting ammunition; a tank gun with a laser
         rangefinder barely notices. */
      fcMul = game.radarCovers(shooter.owner, target.x, target.y)
        ? 1 + 0.10 * rdep
        : 1 - 0.50 * rdep;
    }

    /* electronic attack: a shot laid by radar and fired from inside a hostile
       jamming bubble struggles to hold a solution at all */
    let jamMul = 1;
    if (rdep > 0.15) {
      const jam = game.jamAt ? game.jamAt(shooter.owner, shooter.x, shooter.y) : 0;
      if (jam > 0.15) jamMul = Math.max(0.30, 1 - jam * 0.62 * rdep);
    }

    const acc = U.clamp(w.acc * accMul * sensorMul * jamMul * visMul * rcsMul * fcMul + elevBonus, 0.03, 0.98);
    let hit = game.rng() < acc;
    if (!hit && jamMul < 0.7 && (target.owner === game.human || shooter.owner === game.human))
      effects.push({ t: "text", x: shooter.x, y: shooter.y - 26, s: "JAMMED",
                     life: 0.9, max: 0.9, c: "#9fd8ff" });

    /* --- low observability defeats radar-guided weapons --- */
    const lo = target.def && target.def.stealth;
    if (hit && lo && (w.proj === "missile" || w.warhead === "flak")) {
      if (game.rng() < lo) {
        hit = false;
        if (target.owner === game.human || shooter.owner === game.human)
          effects.push({ t: "text", x: target.x, y: target.y - 26, s: "LOCK BROKEN",
                         life: 1.0, max: 1.0, c: "#9fd8ff" });
      }
    }

    /* aim point: target now, or scattered miss point */
    let ax = target.x, ay = target.y;
    if (!hit) {
      const miss = 14 + game.rng() * 30;
      const ang = game.rng() * U.PI2;
      ax += Math.cos(ang) * miss; ay += Math.sin(ang) * miss;
    }

    const dmg = w.dmg * CFG.VET_DMG[shooter.vet] *
      (shooter.owner.upgrades.ap && (w.warhead === "cannon" || w.warhead === "bullet") ? 1.18 : 1);

    if (nearCam(shooter.x, shooter.y)) {
      if (w.proj === "bullet") Sfx.play("shot");
      else if (w.proj === "missile" || w.proj === "torpedo") Sfx.play("missile");
      else Sfx.play("cannon");
    }

    if (w.proj === "bullet") {
      /* hitscan with visible tracer */
      effects.push({ t: "tracer", x1: shooter.x, y1: shooter.y - alt(shooter),
                     x2: ax, y2: ay - alt(target, hit), life: 0.06, max: 0.06,
                     heavy: w.dmg >= 20 });
      if (hit) applyDamage(game, target, dmg, w, shooter);
      else splash(game, ax, ay, dmg * 0.25, w, shooter, 0.3);
      if (w.suppress) suppressAt(game, ax, ay, 1.2, w.suppress, shooter.owner);
      return;
    }

    const p = {
      w, shooter, owner: shooter.owner, dmg,
      x: shooter.x, y: shooter.y, z: alt(shooter) + 6,
      hit, target: hit ? target : null,
      tx: ax, ty: ay, tz: hit ? alt(target) : 0,
      speed: w.speed, type: w.proj, dead: false, age: 0,
    };
    /* Launch point and a hard ballistic reach, recorded for every round so a
       shot that never finds its mark still terminates. Guided rounds get a
       generous allowance because they legitimately manoeuvre. */
    p.x0 = p.x; p.y0 = p.y;
    p.maxTravel = this_maxTravel(w);
    const d = U.dist(p.x, p.y, ax, ay);
    p.eta = d / Math.max(60, w.speed);

    if (w.proj === "arc") {
      /* ballistic: fixed flight time, unguided, peak height scales with range */
      p.x0 = p.x; p.y0 = p.y; p.peak = 40 + d * 0.5;
      p.target = null;                             // shells do not track
      p.tx = ax; p.ty = ay;
    } else if (w.proj === "bomb") {
      p.z = 46; p.eta = 0.7;
      p.x0 = p.x; p.y0 = p.y;
    }
    projectiles.push(p);
    /* indirect fire is loud: it leaves a counter-battery contact */
    /* A launcher announces itself the same way a gun battery does - a ballistic
       round leaves a bigger signature than a howitzer, not a smaller one. */
    if ((w.proj === "arc" || w.indirect) && game.reportIndirectFire)
      /* the weapon, not just the shooter: without it every contact is
         untagged, no launch is ever ballistic, and the whole back-plot is
         dead code with nothing to say so. This is the only call site. */
      game.reportIndirectFire(shooter, w);
    effects.push({ t: "flash", x: shooter.x, y: shooter.y - alt(shooter),
                   life: 0.08, max: 0.08, big: w.dmg > 100,
                   ang: shooter.def && shooter.def.turret ? shooter.tang : shooter.ang });
  }

  /* ---- who owns the ground a lobbed round is about to land on ----
     A rocket names no victim, so the defender is whoever has something
     standing at the impact point. Returns null for empty ground, which is
     what stops a barrage into open country from being engaged at all. */
  function coverAt(game, wx, wy, shooterOwner) {
    let best = null, bd = Infinity;
    game.grid.query(wx, wy, CFG.TILE * 3.0, (e) => {
      if (e.dead || !e.owner || e.owner === shooterOwner) return;
      if (game.allied(e.owner, shooterOwner)) return;
      const d = U.dist2(e.x, e.y, wx, wy);
      if (d < bd) { bd = d; best = e; }
    });
    return best;
  }

  /* ---- the best air-defence system covering this target ----
     Walks the defender's own platforms near the round and takes the strongest
     that can actually reach the target: an interceptor has to have the target
     inside ITS engagement envelope, not merely be somewhere on the map. A
     structure has to be finished and powered, because an unpowered SAM site
     is already treated as cold everywhere else in the game. */
  function areaSam(game, prot, p) {
    let score = 0, host = null;
    const rate = (e) => {
      if (!e || e.dead || !e.def) return;
      if (e.kind === "building" && (e.buildProgress < 1 || e.powered === false)) return;
      /* an airframe shut down on its ramp is not defending anything */
      if (e.targetLayer && e.layer === "air" && e.targetLayer() !== "air") return;
      for (const k of (e.def.weapons || [])) {
        const w2 = WEAPONS[k];
        if (!w2 || !w2.tgt || !w2.tgt.air || w2.proj !== "missile") continue;
        /* reach, measured from the interceptor to what it is covering */
        const reach = (w2.range || 0) * CFG.TILE;
        if (U.dist2(e.x, e.y, prot.x, prot.y) > reach * reach) continue;
        /* Against a ballistic body the engagement is a different problem
           entirely, and only a system built for it has any real chance: `abm`
           is that single-shot figure, and a launcher without the field cannot
           take the shot at all. A Krug will happily engage an aeroplane and
           can do nothing whatever about a Scud, which is the historically
           honest answer and the reason the modern batteries cost what they do. */
        const ballistic = p.w && p.w.profile === "ballistic";
        const v = ballistic ? (w2.abm || 0) * 0.75 : (w2.acc || 0.7) * 0.45;
        if (v > score) { score = v; host = e; }
      }
    };
    rate(prot);                                   // it defends itself first
    const owner = prot.owner;
    if (owner) {
      /* Far enough out to catch the longest engagement envelope in the game;
         each candidate is then held to its own range against the target. */
      game.grid.query(prot.x, prot.y, CFG.TILE * 20, (e) => {
        if (e === prot || e.dead || !e.owner) return;
        if (e.owner !== owner && !game.allied(e.owner, owner)) return;
        rate(e);
      });
    }
    return { score, host };
  }

  /* The best gun air-defence system covering this target. Same shape as
     areaSam: a candidate must be alive, on the right side, carry its own
     fire-control radar, and have the thing it is protecting inside its OWN gun
     range - about seven tiles for a 35mm mount, so this is local cover and not
     a map-wide aura. Deliberately modest per engagement; what makes it matter
     is that a rocket salvo arrives as twelve rounds and the battery engages
     each one separately. */
  function closeInGuns(game, prot) {
    if (!prot || !prot.owner) return 0;
    let best = 0;
    game.grid.query(prot.x, prot.y, CFG.TILE * 9, (e) => {
      if (e.dead || !e.owner || e.kind !== "unit") return;
      if (e.owner !== prot.owner && !game.allied(e.owner, prot.owner)) return;
      if (!e.def.radar) return;                  // an unaimed gun cannot do this
      for (const k of (e.def.weapons || [])) {
        const w2 = WEAPONS[k];
        if (!w2 || !w2.tgt || !w2.tgt.air) continue;
        if (w2.proj !== "shell" && w2.proj !== "tracer" && w2.proj !== "bullet") continue;
        const reach = (w2.range || 0) * CFG.TILE;
        if (U.dist2(e.x, e.y, prot.x, prot.y) > reach * reach) continue;
        const v = (w2.acc || 0.6) * 0.35;
        if (v > best) best = v;
      }
    });
    return best;
  }

  function alt(e, flag) {
    if (!e || flag === false) return 0;
    /* the height the shot is aimed at, so a parked airframe is engaged at
       deck level rather than at cruise height. A phantom aim point is a bare
       object with no methods on it, hence the fallback. */
    const L = e.targetLayer ? e.targetLayer() : e.layer;
    return L === "air" ? 40 : 0;
  }

  /* --------------------------------------------------------- update */
  function update(game, dt) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      p.age += dt;

      if ((p.type === "missile" || p.type === "torpedo") &&
          p.target && !p.target.dead) {
        /* guided: home on the live target. A torpedo is a guided weapon too -
           the block below already treated it as one once its target died, but
           nothing ever moved its aim point, so it ran to where the ship had
           been at launch and detonated in her wake. */
        p.tx = p.target.x; p.ty = p.target.y; p.tz = alt(p.target);
      }
      if ((p.type === "missile" || p.type === "torpedo") && p.target && p.target.dead) {
        p.target = null;                          // ballistic to last known point
      }

      /* ---- layered defence against an inbound round ----
         A sea-skimmer has to survive three separate engagements to reach a
         well-found warship: the area SAM at range, soft-kill decoys as it
         commits, and the close-in weapon system in the last few seconds.
         What decides each is the defender's equipment, not a single number.

         Two things were wrong with this for a long time. It only ever ran for
         a guided missile, so a rocket salvo could not be engaged by anything
         at all; and the defender was always the TARGET ITSELF, which meant an
         air-defence battery standing beside a refinery did nothing whatever
         for it. "Area defence" was self-defence wearing its coat. Both are
         fixed below: a rocket is interceptable, and the defence is whatever
         friendly system actually covers the ground being shot at. */
      const arcRocket = p.type === "arc" && p.w && p.w.rocket;
      if ((p.type === "missile" || arcRocket) &&
          (arcRocket || (p.target && !p.target.dead && p.target.owner !== p.owner))) {
        /* Who is being defended. A guided round names its victim; a lobbed
           rocket does not, so the impact point stands in for one. */
        const prot = p.target && !p.target.dead ? p.target
                   : coverAt(game, p.tx, p.ty, p.owner);
        if (!prot) { /* nobody's ground: nothing to defend */ }
        else {
        const d = U.dist(p.x, p.y, p.tx, p.ty);
        const killMsg = (txt, col) => {
          effects.push({ t: "boom", x: p.x, y: p.y - p.z, r: 12, life: 0.3, max: 0.3 });
          effects.push({ t: "text", x: prot.x, y: prot.y - 30, s: txt,
                         life: 1.0, max: 1.0, c: col });
        };

        /* An aircraft shut down on a ramp defends itself with nothing: the
           radar is off, the crew is on the ground and the missiles are still
           on the pylons. Only a flying one gets the area-defence layer.
           Layers 2 and 3 need no such test - no airframe in the roster
           carries softkill, ciws or aps. */
        const shutDown = prot.layer === "air" &&
              !!prot.targetLayer && prot.targetLayer() !== "air";

        /* --- layer 1: area air defence, engaged well out ---
           Whatever friendly system covers the ground being shot at gets the
           engagement, not merely the thing under the warhead. That is the
           whole point of an area system, and until now the code did not
           model it: a Patriot battery watched a missile fly past it into the
           refinery it was parked next to. */
        if (!p.samCheck && !shutDown && d < CFG.TILE * 9 && p.age > 0.2) {
          p.samCheck = true;
          const best = areaSam(game, prot, p);
          let sam = best.score;
          /* deep vertical launch magazines put more rounds in the air */
          if (sam && best.host && best.host.def.vls)
            sam *= 1 + Math.min(0.5, best.host.def.vls / 220);
          /* how hard this particular round is to stop */
          const hard = (p.w && p.w.intercept !== undefined) ? p.w.intercept : 1;
          sam *= hard;
          /* a sea-skimmer hides in the surface clutter until it is close, so
             the area system gets very little time to engage it at all */
          const prof2 = p.w && p.w.profile;
          if (prof2 === "skim") sam *= 0.45;
          /* No blanket ballistic penalty any more: areaSam already scored the
             shot with the interceptor's own `abm` figure, and halving it again
             would mean a PAC-3 - which exists to make exactly this shot - was
             quietly worse at it than the number in the table says. */
          if (sam && game.rng() < sam * 0.62) {
            killMsg("SAM KILL", "#9fd8ff");
            projectiles.splice(i, 1); continue;
          }
        }

        /* --- layer 2: soft kill. Chaff and decoys seduce the seeker away.
               A low-observable hull helps enormously here: there is less
               real return for the missile to prefer over the decoy. --- */
        if (!p.softCheck && d < CFG.TILE * 5 && p.age > 0.2) {
          p.softCheck = true;
          let soft = prot.def.softkill || 0;
          const rcs = prot.def.rcs !== undefined ? prot.def.rcs : 1;
          if (soft) soft *= U.clamp(1.35 - rcs * 0.45, 0.6, 1.6);
          /* a missile with its own low-observable seeker is harder to spoof */
          if (p.w && p.w.stealthy) soft *= 0.6;
          if (soft > 0 && game.rng() < soft) {
            effects.push({ t: "text", x: prot.x, y: prot.y - 30, s: "DECOYED",
                           life: 1.0, max: 1.0, c: "#ffd27a" });
            p.target = null;                      // seduced off to one side
            p.tx += (game.rng() - 0.5) * CFG.TILE * 4;
            p.ty += (game.rng() - 0.5) * CFG.TILE * 4;
          }
        }

        /* --- layer 3: close-in weapon system, the last few seconds ---
           Guns count here, and only here. A radar-laid autocannon is the
           archetypal counter-rocket weapon - the land Phalanx is a 20mm gun,
           and Skyshield and MANTIS are 35mm revolvers descended from the
           Gepard's own Oerlikon - but the eligibility test one layer up asks
           for proj:"missile", so every gun air-defence vehicle in the game was
           excluded from intercepting anything at all. That had it backwards: a
           long-range SAM is the system that struggles against a short-ranged
           rocket, and the gun is the one built for the job. It contributes at
           the CLOSE-IN layer rather than the area layer because that is what
           these systems are - a last-ditch terminal defence with a few seconds
           of engagement, not an umbrella. */
        if (!p.intCheck && d < CFG.TILE * 3.2 && p.age > 0.25) {
          p.intCheck = true;
          const chance = (prot.def.ciws || 0) + (prot.def.aps || 0) +
                         closeInGuns(game, prot);
          const hardC = (p.w && p.w.intercept !== undefined) ? p.w.intercept : 1;
          const profC = p.w && p.w.profile;
          /* a close-in gun system tracks a subsonic sea-skimmer well and a
             ballistic re-entry body essentially not at all */
          const profMul = profC === "ballistic" ? 0.15 : profC === "loft" ? 0.7 : 1;
          if (chance > 0 && game.rng() < chance * hardC * profMul) {
            killMsg("INTERCEPTED", "#8fd0ff");
            projectiles.splice(i, 1); continue;
          }
        }
        }
      } else if (p.type === "missile" && !p.intCheck && p.age > 0.25) {
        /* unguided run-in on a point on the ground: only APS applies */
        const d = U.dist(p.x, p.y, p.tx, p.ty);
        if (d < CFG.TILE * 3.2) {
          p.intCheck = true;
          const prot = p.target;
          if (prot && !prot.dead && prot.owner !== p.owner) {
            const chance = (prot.def.ciws || 0) + (prot.def.aps || 0);
            if (chance > 0 && game.rng() < chance) {
              effects.push({ t: "boom", x: p.x, y: p.y - p.z, r: 12, life: 0.3, max: 0.3 });
              effects.push({ t: "text", x: prot.x, y: prot.y - 30, s: "INTERCEPTED",
                             life: 1.0, max: 1.0, c: "#8fd0ff" });
              projectiles.splice(i, 1); continue;
            }
          }
        }
      }

      let arrived = false;
      if (p.type === "arc" || p.type === "bomb") {
        const t = U.clamp(p.age / p.eta, 0, 1);
        p.x = U.lerp(p.x0, p.tx, t); p.y = U.lerp(p.y0, p.ty, t);
        p.z = p.type === "arc" ? Math.sin(t * Math.PI) * p.peak : (1 - t * t) * 46;
        arrived = t >= 1;
      } else {
        const dx = p.tx - p.x, dy = p.ty - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const step = p.speed * dt;
        if (d <= step) { arrived = true; }
        else {
          p.x += dx / d * step; p.y += dy / d * step;
          /* ---- flight profile ----
             How a missile flies is most of what decides whether it can be
             stopped. A sea-skimmer stays in the surface clutter and gives
             almost no warning; a lofted round is visible for its whole cruise
             but arrives too fast to engage; a ballistic weapon is barely
             engageable at all. This is the visible half of that. */
          const prof = p.w && p.w.profile;
          if (prof) {
            const total = Math.max(1, U.dist(p.x0, p.y0, p.tx, p.ty));
            const done = U.clamp(U.dist(p.x0, p.y0, p.x, p.y) / total, 0, 1);
            if (prof === "skim") {
              p.z = 3 + Math.sin(done * Math.PI) * 2;          // wave-top
            } else if (prof === "cruise") {
              p.z = 30 * Math.min(1, done * 5) * (done > 0.88 ? (1 - done) / 0.12 : 1);
            } else if (prof === "loft") {
              p.z = 86 * Math.sin(done * Math.PI);             // climb, cruise, dive
            } else if (prof === "ballistic") {
              p.z = 240 * Math.sin(done * Math.PI);            // out of the atmosphere and back
            } else {
              p.z = Math.max(0, p.z - 20 * dt);                // pop: direct
            }
          } else {
            p.z = Math.max(0, p.z - 20 * dt);
          }
        }
        if (p.type === "torpedo" || p.type === "missile")
          effects.push({ t: "trail", x: p.x, y: p.y - p.z, life: 0.5, max: 0.5, sub: p.type === "torpedo" });
      }

      /* ---- termination ----
         Every round has to end. Previously only a missile burned out, so a
         shell or a torpedo chasing something it could never reach stayed on
         the map for the rest of the battle - which is why rounds piled up
         along the shoreline where a torpedo runs out of water. Anything that
         exceeds its flight time, outruns its ballistic reach, leaves the map,
         or - for a torpedo - runs aground, detonates where it is. */
      if (!arrived) {
        const life = CFG.PROJ_LIFE[p.type];
        if (life && p.age > life) arrived = true;
        else {
          const travelled = U.dist(p.x, p.y, p.x0, p.y0);
          if (p.maxTravel && travelled > p.maxTravel) arrived = true;
          else {
            const W = game.map.W * CFG.TILE, H = game.map.H * CFG.TILE;
            if (p.x < -CFG.TILE || p.y < -CFG.TILE || p.x > W + CFG.TILE || p.y > H + CFG.TILE) {
              /* off the edge of the world: gone, with no explosion to draw */
              projectiles.splice(i, 1);
              continue;
            }
            if (p.type === "torpedo") {
              const tx = (p.x / CFG.TILE) | 0, ty = (p.y / CFG.TILE) | 0;
              if (tx >= 0 && ty >= 0 && tx < game.map.W && ty < game.map.H &&
                  game.map.terrain[ty * game.map.W + tx] !== 0) arrived = true;
            }
          }
        }
      }

      if (arrived) {
        projectiles.splice(i, 1);
        detonate(game, p);
      }
    }

    for (let i = effects.length - 1; i >= 0; i--) {
      effects[i].life -= dt;
      if (effects[i].life <= 0) effects.splice(i, 1);
    }
  }

  /* How far a round may travel before it self-destructs. */
  function this_maxTravel(w) {
    const r = (w.range || 8) * CFG.TILE;
    /* A torpedo's run is far longer than the range it is sensibly fired at,
       and now that it tracks it needs that water: launched at the limit
       against a fast boat running dead away, 2.2x burned out just short. */
    if (w.proj === "torpedo") return r * 3.2;
    return w.proj === "missile" ? r * 2.2 : r * 1.6;
  }

  /* 0 = aimed entirely by eye, 1 = the weapon is blind without a radar track. */
  function radarDependence(shooter, w) {
    if (w.proj === "missile") return 1.00;          // seeker or command guidance
    if (w.warhead === "flak") return 0.95;          // AA guns and CIWS are radar-laid
    if (shooter.cat === "naval" && w.proj === "shell") return 0.80;
    if (w.proj === "arc") return 0.55;              // needs an observer or CB radar
    if (w.warhead === "cannon") return 0.35;        // laser ranging first, radar second
    if (w.warhead === "heat") return 0.30;
    return 0.10;                                    // small arms
  }

  function detonate(game, p) {
    const w = p.w;
    const aoe = (w.aoe || 0.35) * CFG.TILE;
    if (aoe > 14 && nearCam(p.tx, p.ty)) Sfx.play("explode");
    effects.push({
      t: "boom", x: p.tx, y: p.ty, r: Math.max(10, aoe),
      life: 0.45, max: 0.45, water: isWater(game, p.tx, p.ty) && p.type !== "torpedo",
    });
    /* ---- a cargo round opens instead of exploding ----
       Return here: above the damage block, above suppressAt, and above the
       SonarNet blast below, which would otherwise let a warhead-less carrier
       landing in water blow friendly acoustic nodes. The boom above is kept -
       it is the airburst - and everything else is skipped, because splash()
       has no friendly-fire concept and would stamp lastHitBy on everything
       under the footprint, sending the whole field after a launcher twenty
       tiles away. */
    if (w.scatter) { scatterMines(game, p); return; }
    if (w.suppress) suppressAt(game, p.tx, p.ty, (w.aoe || 1) * 1.6, w.suppress, p.owner);
    /* Anything that goes off in the water breaks what is floating in it. The
       radius is the weapon's OWN aoe rather than a flat number, which makes
       the RBU-6000 - burst 6, aoe 1.4 - the cheapest way in the game to blow a
       hole in an acoustic barrier, and gives the Pact's explicitly inferior
       ASW mount a second job worth having. */
    if (typeof SonarNet !== "undefined" && isWater(game, p.tx, p.ty))
      SonarNet.blast(game, p.tx, p.ty, Math.max(1.0, w.aoe || 0.35));

    if (p.target && !p.target.dead && p.hit) {
      applyDamage(game, p.target, p.dmg, w, p.shooter);
      if (aoe > 12) splash(game, p.tx, p.ty, p.dmg, w, p.shooter, 0.55, p.target);
    } else {
      splash(game, p.tx, p.ty, p.dmg, w, p.shooter, 1.0);
    }
  }

  /* ---- putting a minefield down from the air ----
     A dispensing round ejects its cargo along the terminal leg of the
     trajectory, so the footprint is an ellipse lying ALONG the flight axis and
     not a circle. p.x0,p.y0 is the launch point, recorded for every round in
     fire(), so the azimuth costs nothing.

     The points are a Vogel spiral - the sunflower packing - rather than uniform
     random, because uniform random clumps: at eight points in a 2.2-tile disc
     two land inside a mine's own trigger radius often enough to matter, and the
     second of those is a submunition bought for nothing. A small jitter takes
     the pattern back off looking machined.

     Everything about the field is an ordinary Mines.lay: invisible to the enemy
     until a detector finds it, fires once, never triggers on its owner or an
     ally, and DOES NOT EXPIRE. There is no clock here, and nothing in this file
     or in mines.js removes a mine that has been laid. */
  function scatterMines(game, p) {
    const w = p.w;
    if (typeof Mines === "undefined" || !p.owner || !game.map) return;
    const n = Math.max(1, w.scatter | 0);
    const R = (w.scatterR || 1.8) * CFG.TILE;
    const ang = Math.atan2(p.ty - p.y0, p.tx - p.x0);
    const ca = Math.cos(ang), sa = Math.sin(ang);
    const GOLD = 2.39996323;                       // 137.5 degrees
    let laid = 0, refused = false, lost = 0;
    for (let i = 0; i < n; i++) {
      const rr = Math.sqrt((i + 0.5) / n) * R;
      const th = i * GOLD;
      let lx = Math.cos(th) * rr * 1.6, ly = Math.sin(th) * rr;   // 1.6:1 along the axis
      lx += (game.rng() - 0.5) * CFG.TILE * 0.45;
      ly += (game.rng() - 0.5) * CFG.TILE * 0.45;
      const x = p.tx + lx * ca - ly * sa;
      const y = p.ty + lx * sa + ly * ca;
      const tx = (x / CFG.TILE) | 0, ty = (y / CFG.TILE) | 0;
      if (tx < 0 || ty < 0 || tx >= game.map.W || ty >= game.map.H) { lost++; continue; }
      /* A submunition in water or on ground no tank can drive is a submunition
         lost, which is what dispersion IS. It is not a laid mine being taken
         away - nothing here removes one. */
      if (!GameMap.passable(game.map, tx, ty, "ground")) { lost++; continue; }
      /* Two mines on one tile is one mine spent for nothing, and _behtest [4]
         asserts that invariant across the whole map. tileMined sees the
         submunition laid a moment ago, so a stick cannot double up on itself. */
      if (Mines.tileMined(game, p.owner, x, y, false)) { lost++; continue; }
      if (!Mines.lay(game, p.owner, x, y, false,
                     { dmg: w.mineDmg, r: w.mineR, arm: w.mineArm || 6.0, quiet: true })) {
        refused = true; break;                     // the ceiling: spend nothing more
      }
      laid++;
    }
    /* One line for the whole stick, and it reports the zero case too - a round
       that lands on water, on rock, or on ground already mined is exactly when
       the player most needs to be told why nothing happened. */
    if (p.owner === game.human) {
      const s = refused ? "FIELD FULL" : laid ? laid + " MINES SOWN"
              : lost ? "NO MINEABLE GROUND" : "NOTHING SOWN";
      effects.push({ t: "text", x: p.tx, y: p.ty - 16, s: s,
                     life: 1.2, max: 1.2, c: laid ? "#c8b06a" : "#ffb45c" });
    }
  }

  function isWater(game, px, py) {
    const t = game.map.terrain[U.clamp((py / CFG.TILE) | 0, 0, game.map.H - 1) * game.map.W + U.clamp((px / CFG.TILE) | 0, 0, game.map.W - 1)];
    return t === T.WATER;
  }

  /* area damage with linear falloff; skipEnt already took the direct hit */
  function splash(game, px, py, dmg, w, shooter, mul, skipEnt) {
    const aoe = (w.aoe || 0.35) * CFG.TILE;
    if (aoe < 6) return;
    game.grid.query(px, py, aoe + 24, (e) => {
      if (e.dead || e === skipEnt) return;
      if (!canHurtLayer(w, e)) return;
      const d = U.dist(px, py, e.x, e.y) - (e.r || 8);
      if (d > aoe) return;
      const f = U.clamp(1 - Math.max(0, d) / aoe, 0, 1);
      applyDamage(game, e, dmg * f * mul, w, shooter);
    });
  }

  function canHurtLayer(w, e) {
    const t = w.tgt;
    if (!t) return true;
    const L = e.targetLayer ? e.targetLayer() : e.layer;
    if (L === "air") return !!t.air;
    if (L === "sub") return !!t.sub;
    if (L === "sea") return !!t.sea;
    return !!t.ground;
  }


  /* ================= aspect armour, penetration and hit reporting =========
     Which arc a shot arrives from, whether it gets through, and telling the
     player what happened. Without the last part none of the rest is visible. */

  /* the arc the round came from, and how oblique it was on that plate */
  function impactArc(e, shooter, w) {
    /* A mine goes off UNDER the hull. The belly is the thinnest plate on any
       vehicle - CFG.ARMOR_MM already carries a `top` figure of 55 mm against
       540 mm of glacis on a heavy tank - and there is no obliquity to speak of
       when the blast arrives straight up. Without this a mine was resolved as
       a frontal hit from an imaginary shooter directly ahead, and a 260 kg
       charge took 83 points off an Abrams. */
    if (w && w.belly) return { arc: "top", obliq: 0 };
    if (!shooter) return { arc: "front", obliq: 0 };
    const inc = Math.atan2(shooter.y - e.y, shooter.x - e.x);
    const off = Math.abs(U.angDiff(inc, e.ang || 0)) * 180 / Math.PI;  // 0 = nose on
    /* obliquity is measured off the plate normal, so it carries the plate's
       own slope plus however far round the side the shot came from */
    const sl = CFG.PLATE_SLOPE || { front: 52, side: 14, rear: 10 };
    let arc, az;
    if (off <= CFG.ARC_FRONT)            { arc = "front"; az = off; }
    else if (off >= 180 - CFG.ARC_REAR)  { arc = "rear";  az = 180 - off; }
    else                                 { arc = "side";  az = Math.abs(90 - off); }
    return { arc, obliq: U.clamp(sl[arc] + az * 0.62, 0, 86) };
  }

  /* the plate this unit presents on that arc, in RHA-equivalent millimetres */
  function armorAt(e, arc) {
    /* A vehicle may state its own plate. generations.js does this for every
       tank, because deriving armour from hit points ties frontal protection
       to a number that cannot grow the way real armour did - it grew 1.39x
       across the eras where the real figure grew about fourfold, and it made
       the ratio between gun and armour climb monotonically as an artifact of
       the square root rather than as a fact about tanks. */
    const own = e.def && e.def.armorMM;
    if (own && own[arc] !== undefined) return own[arc];
    const base = CFG.ARMOR_MM[e.armor] || CFG.ARMOR_MM.light;
    const ref  = CFG.ARMOR_HP_REF[e.armor] || 500;
    /* a heavier member of the class is a better protected one */
    const scale = Math.sqrt(U.clamp((e.maxHp || ref) / ref, 0.3, 3.2));
    const mm = (base[arc] !== undefined ? base[arc] : base.side) * scale;
    /* a dug-in or garrisoned target is presenting less of itself */
    return mm;
  }

  /* what the round can defeat. A weapon may declare `pen` outright; otherwise
     it is derived from listed damage so every existing weapon has a value. */
  function penOf(w, shooter) {
    let pen = w.pen, declared = pen !== undefined;
    if (!declared) pen = (w.dmg || 0) * (CFG.PEN_PER_DMG[w.warhead] || 0.5);
    if (shooter) {
      const sf = FACTIONS[shooter.owner && shooter.owner.faction];
      /* depleted uranium against export-grade steel. Half weight here because
         the same factor already moves behind-armour damage. Skipped when the
         weapon states its penetration outright: that figure is already the
         real one for that army in that decade, so applying a faction-wide
         ammunition modifier on top would count the same thing twice. */
      if (!declared && sf && sf.ammoQ && (w.warhead === "cannon" || w.warhead === "heat"))
        pen *= 1 + (sf.ammoQ - 1) * 0.6;
      /* a good crew puts the round where the plate is thin */
      if (shooter.vet) pen *= 1 + 0.045 * shooter.vet;
    }
    return pen;
  }

  /* Resolve one impact against armour. Returns a damage multiplier and the
     verdict to show the player. Front + penetration is 1.0 by construction. */
  function resolveArmor(game, e, w, shooter) {
    if (!CFG.PEN_WARHEADS[w.warhead]) return null;      // blast does not care
    if (e.kind !== "unit" || e.cat !== "vehicle") return null;
    if (e.armor !== "heavy" && e.armor !== "light") return null;

    const { arc, obliq } = impactArc(e, shooter, w);
    const mm  = armorAt(e, arc);
    const pen = penOf(w, shooter);
    const ratio = mm > 0 ? pen / mm : 99;

    /* a long rod arriving very oblique can skip off a sloped plate, unless it
       massively overmatches the armour in the first place */
    if (w.warhead === "cannon" && obliq > CFG.RICO_ANGLE && ratio < 2.2) {
      const p = U.clamp((obliq - CFG.RICO_ANGLE) / 24, 0, 1) * 0.55 / Math.max(0.4, ratio);
      if (game.rng() < p) return { mul: CFG.RICO_MUL, verdict: "RICOCHET", arc, ratio };
    }
    if (ratio < CFG.PEN_NONE)
      return { mul: CFG.PEN_FAIL_MUL, verdict: "NO PENETRATION", arc, ratio };
    if (ratio < CFG.PEN_FULL) {
      /* Marginal: it is through, but barely, and much of the energy is spent.
         This used to square t, which made the whole 0.72-1.00 band nearly
         worthless - a round getting 90% of the way through did 12% damage,
         the same as one that bounced. A gun that is close to defeating the
         plate should hurt roughly in proportion, so the falloff is linear. */
      const t = (ratio - CFG.PEN_NONE) / (CFG.PEN_FULL - CFG.PEN_NONE);
      const mul = (CFG.PEN_FAIL_MUL + (1 - CFG.PEN_FAIL_MUL) * t) * CFG.ASPECT_MUL[arc];
      return { mul, verdict: "PARTIAL PENETRATION", arc, ratio };
    }
    return { mul: CFG.ASPECT_MUL[arc] || 1, verdict: "PENETRATION", arc, ratio };
  }

  /* ---- what the player sees -------------------------------------------
     Floating text at the impact and a line in the combat log. Both are rate
     limited per target so a burst of autocannon does not bury the screen. */
  const LOG_MAX = 7;
  const hitLog = [];
  const VERDICT_STYLE = {
    "NO PENETRATION":      { c: "#9fb0bb", w: 0 },
    "RICOCHET":            { c: "#7fc4e8", w: 0 },
    "PARTIAL PENETRATION": { c: "#e8b84a", w: 1 },
    "PENETRATION":         { c: "#8fe07a", w: 1 },
    "AMMO DETONATION":     { c: "#ff8a3c", w: 2 },
    "TRACKED":             { c: "#e8a33c", w: 1 },
  };

  function report(game, e, verdict, arc, shooter, ratio) {
    const mine  = shooter && shooter.owner === game.human;
    const theirs = e.owner === game.human;
    if (!mine && !theirs) return;                     // AI versus AI is not news
    /* A coaxial machine gun cannot hurt a tank and never could. Saying so on
       every burst buries the verdicts that actually mean something, so a
       hopelessly outclassed round is simply not reported. */
    if (verdict === "NO PENETRATION" && ratio !== undefined && ratio < 0.40) return;
    const now = game.time;
    if (e._lastReport !== undefined && now - e._lastReport < 0.55) return;
    e._lastReport = now;

    const st = VERDICT_STYLE[verdict] || { c: "#ffffff", w: 0 };
    let label = verdict;
    if (verdict === "PENETRATION" && arc && arc !== "front")
      label = arc === "rear" ? "REAR HIT" : "FLANK HIT";
    effects.push({ t: "text", x: e.x, y: e.y, s: label, c: st.c,
                   life: 1.25, max: 1.25, big: st.w });

    hitLog.push({
      t: now, s: label, c: st.c,
      who: (shooter && shooter.def ? shooter.def.name : "?"),
      at:  (e.def ? e.def.name : "?"),
      mine: !!mine,
    });
    if (hitLog.length > LOG_MAX) hitLog.shift();
  }

  function applyDamage(game, e, raw, w, shooter) {
    if (!e || e.dead || raw <= 0 || e.hp === undefined) return;   // phantom aim points
    /* CFG.DMG scores "air" at zero against blast and cannon fire, which is the
       right answer for an aeroplane in flight and the wrong one for one on the
       ramp - without this the ramp would simply be immune to bombs. */
    let dmg = raw * CFG.dmgMult(w.warhead, e.armorClass ? e.armorClass() : e.armor);
    /* penetrator quality: depleted-uranium long rods versus export-grade steel */
    if (shooter && (w.warhead === "cannon" || w.warhead === "heat") &&
        (e.armor === "heavy" || e.armor === "light")) {
      const sf = FACTIONS[shooter.owner.faction];
      if (sf && sf.ammoQ) dmg *= e.armor === "heavy" ? sf.ammoQ : 1 + (sf.ammoQ - 1) * 0.5;
    }
    /* anti-radiation missiles home on emissions: they gut a radar and barely
       scratch anything that is not transmitting */
    if (w.antiRadiation) {
      const emits = (e.def && e.def.radar) || (e.def && e.def.jam) ||
                    (e.kind === "building" && e.def.radar);
      dmg *= emits ? 3.0 : 0.35;
    }
    /* ---- cover, and which way it faces ----
       Cover is not a bubble. A squad behind a wall is protected from the
       direction the wall is on and exposed from every other, so a shot that
       comes in from the flank or the rear gets much less of the benefit.
       The facing used is the direction the unit is looking, which for
       infantry is the way they last engaged. */
    if (e.layer === "ground" && e.cat === "infantry") {
      let cov = GameMap.coverAt(game.map, e.tx, e.ty);
      /* An emplaced obstacle is terrain as far as a rifleman is concerned.
         Sandbags are the reason to put a squad on a particular tile. */
      const ob = game.obstacleAt ? game.obstacleAt(e.tx, e.ty) : null;
      if (ob && ob.def.cover) cov = Math.max(cov, ob.def.cover);
      if (cov > 0 && shooter) {
        const inc = Math.atan2(shooter.y - e.y, shooter.x - e.x);
        const off = Math.abs(U.angDiff(inc, e.ang || 0));
        /* full value head-on, a third of it from directly behind */
        const facing = 1 - 0.66 * U.clamp(off / Math.PI, 0, 1);
        cov *= facing;
      }
      dmg *= 1 - cov;
    }
    /* a garrisoned squad is fighting from inside a structure: it takes very
       little from small arms and a great deal from anything that can burn or
       blast the building itself */
    if (e.garrisonIn && !e.garrisonIn.dead) {
      const wh = w.warhead;
      if (wh === "bullet" || wh === "cannon") dmg *= 0.22;
      else if (wh === "he" || wh === "frag") dmg *= 0.75;
      else if (wh === "flame" || wh === "demolition") dmg *= 1.9;
      else dmg *= 0.5;
    }
    /* a pinned squad is flat on the ground and much harder to hit properly */
    if (e.isPinned && e.isPinned() && e.cat === "infantry") dmg *= 1 - CFG.SUPPRESS_PRONE_DR;

    /* ---- did it actually get through, and from which side? ---- */
    const pen = resolveArmor(game, e, w, shooter);
    if (pen) {
      dmg *= pen.mul;
      e._lastPen = pen;
      report(game, e, pen.verdict, pen.arc, shooter, pen.ratio);
    }
    if (dmg <= 0.5) return;

    e._lastWarhead = w.warhead;
    e.hp -= dmg;
    /* what the player is absorbing drives how tense the mix gets */
    /* the shooter goes with it: the player's own artillery landing short is
       not an enemy attack, and warning about it teaches the player to ignore
       the warning */
    if (typeof Threat !== "undefined" && e.owner === game.human) Threat.reportDamage(dmg, e, shooter);
    e.lastHitAt = game.time;
    e.lastHitBy = shooter || null;

    /* return-fire reflex: idle combat units answer whoever shot them */
    if (shooter && !shooter.dead && e.retaliate) e.retaliate(shooter);

    if (e.hp <= 0) {
      e.hp = 0;
      kill(game, e, shooter);
    } else if (shooter && shooter.owner !== e.owner) {
      shooter.xp = (shooter.xp || 0) + dmg * 0.25;
      checkVet(game, shooter);
    }
  }

  /* what last hit this thing, for deciding how survivable a collapse was */
  function lastWarhead(e) {
    return (e._lastWarhead) || "cannon";
  }

  function kill(game, e, shooter) {
    if (e.dead) return;
    e.dead = true;
    /* ---- the building comes down on whoever was inside it ----
       Not everyone dies. Some of the occupiers are caught in the collapse and
       the rest scramble clear through the back — shaken, wounded, and out in
       the open where they were safe a moment ago. How many get out depends on
       what brought the building down: a shaped charge or a fire leaves far
       fewer survivors than a tank shell punching through a wall. */
    if (e.kind === "building" && e.garrison && e.garrison.length) {
      const wh = lastWarhead(e);
      const lethal = (wh === "flame" || wh === "demolition") ? 0.90
                   : (wh === "he" || wh === "frag" || wh === "nuclear") ? 0.62
                   : 0.42;
      let out = 0, mine = 0;
      for (const g2 of e.garrison.slice()) {
        g2.garrisonIn = null; g2.carried = false;
        if (g2.dead) continue;
        if (game.rng() < lethal) { kill(game, g2, shooter); continue; }
        /* thrown clear: hurt, pinned, and scattered around the wreck */
        g2.hp = Math.max(1, Math.floor(g2.hp * (0.25 + game.rng() * 0.30)));
        g2.suppress = CFG.SUPPRESS_MAX;
        const a = game.rng() * Math.PI * 2;
        const d = (e.def.w + e.def.h) * 0.25 * CFG.TILE + 6 + game.rng() * 10;
        g2.x = e.x + Math.cos(a) * d;
        g2.y = e.y + Math.sin(a) * d;
        g2.order = { type: "idle" };
        out++;
        if (g2.owner === game.human) mine++;
      }
      e.garrison.length = 0;
      /* only our own people spilling into the street is news */
      if (mine) game.alert(mine + " SURVIVOR" + (mine > 1 ? "S" : "") +
                           " THROWN CLEAR OF " + e.def.name.toUpperCase(), "warn");
    }
    if (shooter && shooter.owner !== e.owner) {
      shooter.xp = (shooter.xp || 0) + (e.def.cost || 100) * 0.28;
      checkVet(game, shooter);
      shooter.owner.stats.kills++;
    }
    e.owner.stats.losses++;
    effects.push({
      t: "boom", x: e.x, y: e.y, r: Math.max(14, (e.r || 10) * 1.8),
      life: 0.6, max: 0.6, water: e.layer === "sea" || e.layer === "sub",
    });
    if (e.cat !== "infantry" && e.layer === "ground")
      effects.push({ t: "wreck", x: e.x, y: e.y, r: e.r || 10, life: 45, max: 45, ang: e.ang || 0 });

    /* Soviet-pattern autoloaders stow their rounds in the crew compartment.
       A clean penetration sets the whole carousel off and throws the turret. */
    const ef = FACTIONS[e.owner.faction];
    const cz = e.def.carousel !== undefined ? e.def.carousel : (ef && ef.carousel) || 0;
    if (cz && e.cat === "vehicle" && e.armor === "heavy" && game.rng() < cz) {
      effects.push({ t: "boom", x: e.x, y: e.y, r: Math.max(30, (e.r || 10) * 4.2),
                     life: 1.1, max: 1.1 });
      effects.push({ t: "turrettoss", x: e.x, y: e.y, life: 2.2, max: 2.2,
                     ang: e.ang || 0, r: e.r || 10 });
      e._lastReport = -99;                       /* this one always gets said */
      report(game, e, "AMMO DETONATION", null, shooter);
      /* The blast catches anything standing too close. grid.query is
         callback-style, and the victims are collected first so that the
         recursive applyDamage below cannot mutate the grid mid-traversal. */
      const R = 46, caught = [];
      game.grid.query(e.x, e.y, R, (o) => {
        /* an airframe on the ramp is standing right there in the blast */
        if (o.dead || o === e || o.targetLayer() === "air") return;
        if (U.dist(o.x, o.y, e.x, e.y) > R) return;
        caught.push(o);
      });
      for (const o of caught) {
        if (o.dead) continue;
        const d = U.dist(o.x, o.y, e.x, e.y);
        applyDamage(game, o, 95 * (1 - d / R), { warhead: "he", dmg: 95 }, null);
      }
    }
    game.onDeath(e);
  }

  function checkVet(game, u) {
    if (u.vet === undefined) return;
    while (u.vet < 3 && u.xp >= CFG.VET_XP[u.vet + 1]) {
      u.vet++;
      const mul = CFG.VET_HP[u.vet] / CFG.VET_HP[u.vet - 1];
      u.maxHp *= mul; u.hp = Math.min(u.maxHp, u.hp * mul + u.maxHp * 0.1);
      effects.push({ t: "text", x: u.x, y: u.y - 26, s: CFG.VET_NAME[u.vet], life: 1.6, max: 1.6, c: "#ffd76a" });
    }
  }

  function suppressAt(game, px, py, rTiles, amount, owner) {
    game.grid.query(px, py, rTiles * CFG.TILE, (e) => {
      if (e.dead || e.cat !== "infantry" || e.owner === owner) return;
      e.suppress = Math.min(CFG.SUPPRESS_MAX, (e.suppress || 0) + amount);
    });
  }

  function addEffect(fx) { effects.push(fx); }

  return {
    reset, fire, update, applyDamage, kill, addEffect,
    resolveArmor, impactArc, armorAt, penOf,
    get projectiles() { return projectiles; },
    get effects() { return effects; },
    get hitLog() { return hitLog; },
  };
})();
