/* ============ eras.js — historical rosters, 1950s to the present ============
   GENERATED from researched per-faction era rosters. Names, designations,
   in-service dates and notes are the real platforms; game statistics are
   derived from the present-day unit for the same faction and role, scaled
   by period, so each era is internally consistent with the rest of the game.
   Edit the generator rather than this file.                                 */
Object.assign(WEAPONS, {
 "w_e50_pla_rifle": {
  "name": "Type 56 7.62x39mm assault rifle (licence A",
  "dmg": 5,
  "warhead": "bullet",
  "range": 3.7,
  "reload": 1.41,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.52,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pla_at": {
  "name": "Type 56 40mm rocket-propelled grenade",
  "dmg": 55,
  "warhead": "heat",
  "range": 5.3,
  "minRange": 0.9,
  "reload": 6.66,
  "burst": 1,
  "acc": 0.62,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_pla_mbt": {
  "name": "85mm ZiS-S-53",
  "dmg": 69,
  "warhead": "cannon",
  "range": 6.1,
  "reload": 6.4,
  "burst": 1,
  "acc": 0.59,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pla_heavy": {
  "name": "122mm D-25T",
  "dmg": 69,
  "warhead": "cannon",
  "range": 6.1,
  "reload": 6.4,
  "burst": 1,
  "acc": 0.59,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pla_ifv": {
  "name": "7.62mm or 12.7mm pintle machine gun",
  "dmg": 9,
  "warhead": "bullet",
  "range": 4.7,
  "reload": 2.82,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.5,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pla_spg": {
  "name": "76.2mm ZiS-3",
  "dmg": 63,
  "warhead": "frag",
  "range": 11.5,
  "minRange": 3,
  "reload": 10.88,
  "burst": 1,
  "acc": 0.24,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pla_mlrs": {
  "name": "16 x 132mm M-13 rockets",
  "dmg": 29,
  "warhead": "frag",
  "range": 10.4,
  "minRange": 2.6,
  "reload": 17.92,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.16,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pla_aa": {
  "name": "37mm automatic AA gun",
  "dmg": 46,
  "warhead": "flak",
  "range": 5.8,
  "reload": 5.89,
  "burst": 1,
  "acc": 0.58,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_pla_recon": {
  "name": "7.62mm machine gun",
  "dmg": 5,
  "warhead": "bullet",
  "range": 4,
  "reload": 2.05,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.48,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pla_fighter": {
  "name": "1 x 37mm N-37",
  "dmg": 84,
  "warhead": "flak",
  "range": 7,
  "reload": 3.84,
  "burst": 1,
  "acc": 0.63,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e50_pla_cas": {
  "name": "2 x 23mm NS-23 cannon",
  "dmg": 139,
  "warhead": "he",
  "range": 1.9,
  "reload": 1.28,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.66,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pla_corvette": {
  "name": "3 x 100mm",
  "dmg": 22,
  "warhead": "he",
  "range": 5.9,
  "reload": 1.54,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.53,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e50_pla_destroyer": {
  "name": "4 x 130mm",
  "dmg": 55,
  "warhead": "he",
  "range": 8.3,
  "reload": 4.86,
  "burst": 2,
  "burstDelay": 0.42,
  "acc": 0.56,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e50_pla_sub": {
  "name": "6 x 533mm torpedo tubes",
  "dmg": 149,
  "warhead": "he",
  "range": 7.1,
  "minRange": 0.7,
  "reload": 15.36,
  "burst": 2,
  "burstDelay": 1.3,
  "acc": 0.6,
  "proj": "torpedo",
  "speed": 8,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e50_pla_missileboat": {
  "name": "YJ-18 SSM",
  "dmg": 126,
  "warhead": "he",
  "range": 12.6,
  "minRange": 1.5,
  "reload": 19.2,
  "burst": 2,
  "burstDelay": 0.8,
  "acc": 0.61,
  "proj": "missile",
  "speed": 300,
  "aoe": 1.6,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "loft",
  "intercept": 0.55
 },
 "w_e60_pla_rifle": {
  "name": "5.56mm rifle",
  "dmg": 6,
  "warhead": "bullet",
  "range": 4.1,
  "reload": 1.32,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.58,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pla_at": {
  "name": "Type 69 40mm RPG",
  "dmg": 73,
  "warhead": "heat",
  "range": 5.9,
  "minRange": 1,
  "reload": 6.24,
  "burst": 1,
  "acc": 0.69,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_pla_mbt": {
  "name": "125mm smoothbore",
  "dmg": 92,
  "warhead": "cannon",
  "range": 6.7,
  "reload": 6,
  "burst": 1,
  "acc": 0.66,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pla_lighttank": {
  "name": "85mm Type 62-85TC rifled gun",
  "dmg": 34,
  "warhead": "cannon",
  "range": 5.4,
  "reload": 3.72,
  "burst": 1,
  "acc": 0.62,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pla_ifv": {
  "name": "12.7mm Type 54 heavy machine gun",
  "dmg": 12,
  "warhead": "bullet",
  "range": 5.2,
  "reload": 2.64,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.56,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pla_spg": {
  "name": "122mm Type 54-1 howitzer",
  "dmg": 84,
  "warhead": "frag",
  "range": 12.7,
  "minRange": 3.3,
  "reload": 10.2,
  "burst": 1,
  "acc": 0.27,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pla_mlrs": {
  "name": "12 x 107mm rockets",
  "dmg": 39,
  "warhead": "frag",
  "range": 11.5,
  "minRange": 2.9,
  "reload": 16.8,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.18,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pla_spaag": {
  "name": "2 x 37mm Type 65",
  "dmg": 15,
  "warhead": "flak",
  "range": 5.7,
  "reload": 2.04,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.5,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e60_pla_aa": {
  "name": "HQ-2 command-guided SAM",
  "dmg": 62,
  "warhead": "flak",
  "range": 6.4,
  "reload": 5.52,
  "burst": 1,
  "acc": 0.64,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_pla_recon": {
  "name": "machine gun or none",
  "dmg": 7,
  "warhead": "bullet",
  "range": 4.4,
  "reload": 1.92,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.53,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pla_fighter": {
  "name": "3 x 30mm NR-30",
  "dmg": 112,
  "warhead": "flak",
  "range": 7.8,
  "reload": 3.6,
  "burst": 1,
  "acc": 0.7,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e60_pla_cas": {
  "name": "2 x 23mm cannon",
  "dmg": 185,
  "warhead": "he",
  "range": 2.1,
  "reload": 1.2,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.74,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pla_gunship": {
  "name": "AGM-114 Hellfire",
  "dmg": 81,
  "warhead": "heat",
  "range": 5.4,
  "reload": 2.88,
  "burst": 1,
  "acc": 0.72,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_pla_corvette": {
  "name": "3 x 100mm",
  "dmg": 29,
  "warhead": "he",
  "range": 6.6,
  "reload": 1.44,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.59,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e60_pla_destroyer": {
  "name": "4 x 130mm",
  "dmg": 74,
  "warhead": "he",
  "range": 9.2,
  "reload": 4.56,
  "burst": 2,
  "burstDelay": 0.42,
  "acc": 0.62,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e60_pla_missileboat": {
  "name": "4 x SY-1 anti-ship missiles",
  "dmg": 168,
  "warhead": "he",
  "range": 13.9,
  "minRange": 1.6,
  "reload": 18,
  "burst": 2,
  "burstDelay": 0.8,
  "acc": 0.68,
  "proj": "missile",
  "speed": 300,
  "aoe": 1.6,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "loft",
  "intercept": 0.55
 },
 "w_e60_pla_sub": {
  "name": "8 x 533mm torpedo tubes",
  "dmg": 199,
  "warhead": "he",
  "range": 7.9,
  "minRange": 0.8,
  "reload": 14.4,
  "burst": 2,
  "burstDelay": 1.3,
  "acc": 0.67,
  "proj": "torpedo",
  "speed": 8,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e80_pla_rifle": {
  "name": "Type 81 7.62x39mm rifle",
  "dmg": 8,
  "warhead": "bullet",
  "range": 4.6,
  "reload": 1.22,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.64,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pla_at": {
  "name": "HJ-8 SACLOS wire-guided missile",
  "dmg": 96,
  "warhead": "heat",
  "range": 6.6,
  "minRange": 1.1,
  "reload": 5.77,
  "burst": 1,
  "acc": 0.77,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_pla_mbt": {
  "name": "105mm rifled gun (licence L7 derivative)",
  "dmg": 122,
  "warhead": "cannon",
  "range": 7.5,
  "reload": 5.55,
  "burst": 1,
  "acc": 0.73,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pla_lighttank": {
  "name": "76mm rifled gun",
  "dmg": 44,
  "warhead": "cannon",
  "range": 6,
  "reload": 3.44,
  "burst": 1,
  "acc": 0.69,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pla_ifv": {
  "name": "73mm 2A28 low-pressure gun",
  "dmg": 16,
  "warhead": "bullet",
  "range": 5.8,
  "reload": 2.44,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.62,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pla_spg": {
  "name": "152mm Type 66 howitzer",
  "dmg": 111,
  "warhead": "frag",
  "range": 14.1,
  "minRange": 3.6,
  "reload": 9.43,
  "burst": 1,
  "acc": 0.3,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pla_mlrs": {
  "name": "40 x 122mm rockets",
  "dmg": 52,
  "warhead": "frag",
  "range": 12.7,
  "minRange": 3.2,
  "reload": 15.54,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.2,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pla_spaag": {
  "name": "2 x 37mm",
  "dmg": 19,
  "warhead": "flak",
  "range": 6.4,
  "reload": 1.89,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.55,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e80_pla_aa": {
  "name": "HN-5 IR-homing missile",
  "dmg": 81,
  "warhead": "flak",
  "range": 7.1,
  "reload": 5.11,
  "burst": 1,
  "acc": 0.71,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_pla_fighter": {
  "name": "23mm cannon",
  "dmg": 148,
  "warhead": "flak",
  "range": 8.6,
  "reload": 3.33,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e80_pla_cas": {
  "name": "500lb guided bomb",
  "dmg": 244,
  "warhead": "he",
  "range": 2.4,
  "reload": 1.11,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.82,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pla_gunship": {
  "name": "4 x HOT anti-tank missiles",
  "dmg": 107,
  "warhead": "heat",
  "range": 6,
  "reload": 2.66,
  "burst": 1,
  "acc": 0.8,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_pla_corvette": {
  "name": "2 x twin 100mm",
  "dmg": 38,
  "warhead": "he",
  "range": 7.3,
  "reload": 1.33,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.66,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e80_pla_destroyer": {
  "name": "H/PJ-38 130mm",
  "dmg": 98,
  "warhead": "he",
  "range": 10.2,
  "reload": 4.22,
  "burst": 2,
  "burstDelay": 0.42,
  "acc": 0.69,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e80_pla_sub": {
  "name": "8 x 533mm torpedo tubes",
  "dmg": 263,
  "warhead": "he",
  "range": 8.7,
  "minRange": 0.9,
  "reload": 13.32,
  "burst": 2,
  "burstDelay": 1.3,
  "acc": 0.75,
  "proj": "torpedo",
  "speed": 8,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e80_pla_sead": {
  "name": "YJ-91 ARM",
  "dmg": 163,
  "warhead": "he",
  "range": 9.8,
  "minRange": 1.4,
  "reload": 6.88,
  "burst": 1,
  "acc": 0.77,
  "proj": "missile",
  "speed": 540,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.75
 },
 "w_e90_pla_rifle": {
  "name": "QBZ-95 5.8x42mm bullpup rifle",
  "dmg": 9,
  "warhead": "bullet",
  "range": 4.8,
  "reload": 1.17,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.68,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pla_at": {
  "name": "HJ-8 SACLOS missile",
  "dmg": 112,
  "warhead": "heat",
  "range": 6.9,
  "minRange": 1.2,
  "reload": 5.51,
  "burst": 1,
  "acc": 0.81,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_pla_mbt": {
  "name": "125mm smoothbore with carousel autoloader",
  "dmg": 142,
  "warhead": "cannon",
  "range": 7.9,
  "reload": 5.3,
  "burst": 1,
  "acc": 0.77,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pla_lighttank": {
  "name": "105mm rifled gun",
  "dmg": 52,
  "warhead": "cannon",
  "range": 6.3,
  "reload": 3.29,
  "burst": 1,
  "acc": 0.73,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pla_ifv": {
  "name": "25mm autocannon",
  "dmg": 19,
  "warhead": "bullet",
  "range": 6.1,
  "reload": 2.33,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.66,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pla_spg": {
  "name": "122mm howitzer",
  "dmg": 129,
  "warhead": "frag",
  "range": 14.9,
  "minRange": 3.8,
  "reload": 9.01,
  "burst": 1,
  "acc": 0.32,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pla_mlrs": {
  "name": "40 x 122mm rockets",
  "dmg": 60,
  "warhead": "frag",
  "range": 13.4,
  "minRange": 3.4,
  "reload": 14.84,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.21,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pla_spaag": {
  "name": "4 x 25mm cannon plus 4 x QW-2 SAMs",
  "dmg": 22,
  "warhead": "flak",
  "range": 6.7,
  "reload": 1.8,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.58,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e90_pla_aa": {
  "name": "5V55 / 48N6 SAMs",
  "dmg": 95,
  "warhead": "flak",
  "range": 7.5,
  "reload": 4.88,
  "burst": 1,
  "acc": 0.75,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_pla_recon": {
  "name": "12.7mm HMG",
  "dmg": 11,
  "warhead": "bullet",
  "range": 5.2,
  "reload": 1.7,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.62,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pla_fighter": {
  "name": "30mm GSh-30-1",
  "dmg": 172,
  "warhead": "flak",
  "range": 9.1,
  "reload": 3.18,
  "burst": 1,
  "acc": 0.83,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e90_pla_cas": {
  "name": "YJ-8K anti-ship missiles",
  "dmg": 284,
  "warhead": "he",
  "range": 2.5,
  "reload": 1.06,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.86,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pla_gunship": {
  "name": "8 x HJ-8 ATGM",
  "dmg": 125,
  "warhead": "heat",
  "range": 6.3,
  "reload": 2.54,
  "burst": 1,
  "acc": 0.85,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_pla_corvette": {
  "name": "100mm gun",
  "dmg": 45,
  "warhead": "he",
  "range": 7.7,
  "reload": 1.27,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.7,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e90_pla_destroyer": {
  "name": "100mm twin gun",
  "dmg": 114,
  "warhead": "he",
  "range": 10.8,
  "reload": 4.03,
  "burst": 2,
  "burstDelay": 0.42,
  "acc": 0.73,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e90_pla_sub": {
  "name": "6 x 533mm tubes",
  "dmg": 305,
  "warhead": "he",
  "range": 9.2,
  "minRange": 1,
  "reload": 12.72,
  "burst": 2,
  "burstDelay": 1.3,
  "acc": 0.79,
  "proj": "torpedo",
  "speed": 8,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e90_pla_carrier": {
  "name": "H/PJ-11 CIWS",
  "dmg": 50,
  "warhead": "flak",
  "range": 2.9,
  "reload": 1.01,
  "burst": 9,
  "burstDelay": 0.05,
  "acc": 0.72,
  "proj": "tracer",
  "speed": 930,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e00_pla_rifle": {
  "name": "5.56mm rifle",
  "dmg": 10,
  "warhead": "bullet",
  "range": 5,
  "reload": 1.12,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.71,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pla_at": {
  "name": "HJ-12 imaging-infrared fire-and-forget ATG",
  "dmg": 124,
  "warhead": "heat",
  "range": 7.1,
  "minRange": 1.2,
  "reload": 5.3,
  "burst": 1,
  "acc": 0.84,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_pla_mbt": {
  "name": "125mm smoothbore with autoloader",
  "dmg": 157,
  "warhead": "cannon",
  "range": 8.1,
  "reload": 5.1,
  "burst": 1,
  "acc": 0.8,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pla_lighttank": {
  "name": "ZTD-05: 105mm",
  "dmg": 57,
  "warhead": "cannon",
  "range": 6.5,
  "reload": 3.16,
  "burst": 1,
  "acc": 0.76,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pla_ifv": {
  "name": "100mm gun-launcher",
  "dmg": 21,
  "warhead": "bullet",
  "range": 6.3,
  "reload": 2.24,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.69,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pla_spg": {
  "name": "155mm/52 calibre with autoloader",
  "dmg": 143,
  "warhead": "frag",
  "range": 15.3,
  "minRange": 4,
  "reload": 8.67,
  "burst": 1,
  "acc": 0.33,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pla_mlrs": {
  "name": "12 x 300mm rockets",
  "dmg": 67,
  "warhead": "frag",
  "range": 13.9,
  "minRange": 3.5,
  "reload": 14.28,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.22,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pla_spaag": {
  "name": "2 x 35mm Oerlikon-derived cannon",
  "dmg": 25,
  "warhead": "flak",
  "range": 6.9,
  "reload": 1.73,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.61,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e00_pla_aa": {
  "name": "HQ-9 active-radar-homing SAM",
  "dmg": 105,
  "warhead": "flak",
  "range": 7.7,
  "reload": 4.69,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_pla_recon": {
  "name": "remote weapon station",
  "dmg": 12,
  "warhead": "bullet",
  "range": 5.3,
  "reload": 1.63,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.65,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pla_fighter": {
  "name": "23mm cannon",
  "dmg": 190,
  "warhead": "flak",
  "range": 9.4,
  "reload": 3.06,
  "burst": 1,
  "acc": 0.86,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e00_pla_cas": {
  "name": "laser-guided and satellite-guided bombs",
  "dmg": 314,
  "warhead": "he",
  "range": 2.6,
  "reload": 1.02,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.9,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pla_gunship": {
  "name": "23mm chin cannon",
  "dmg": 138,
  "warhead": "heat",
  "range": 6.5,
  "reload": 2.45,
  "burst": 1,
  "acc": 0.88,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_pla_stealthfighter": {
  "name": "PL-15 long-range and PL-10 short-range AAM",
  "dmg": 219,
  "warhead": "flak",
  "range": 10.9,
  "reload": 2.86,
  "burst": 1,
  "acc": 0.9,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e00_pla_ewair": {
  "name": "none (jamming and SIGINT payloads)",
  "dmg": 209,
  "warhead": "he",
  "range": 10.7,
  "minRange": 1.5,
  "reload": 6.32,
  "burst": 1,
  "acc": 0.85,
  "proj": "missile",
  "speed": 540,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.75
 },
 "w_e00_pla_sead": {
  "name": "YJ-91 anti-radiation missile",
  "dmg": 209,
  "warhead": "he",
  "range": 10.7,
  "minRange": 1.5,
  "reload": 6.32,
  "burst": 1,
  "acc": 0.85,
  "proj": "missile",
  "speed": 540,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.75
 },
 "w_e00_pla_carrier": {
  "name": "HQ-10 point defence",
  "dmg": 55,
  "warhead": "flak",
  "range": 3,
  "reload": 0.97,
  "burst": 9,
  "burstDelay": 0.05,
  "acc": 0.75,
  "proj": "tracer",
  "speed": 930,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e00_pla_destroyer": {
  "name": "H/PJ-38 130mm",
  "dmg": 125,
  "warhead": "he",
  "range": 11.1,
  "reload": 3.88,
  "burst": 2,
  "burstDelay": 0.42,
  "acc": 0.76,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e00_pla_corvette": {
  "name": "76mm H/PJ-26",
  "dmg": 49,
  "warhead": "he",
  "range": 7.9,
  "reload": 1.22,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.73,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e00_pla_missileboat": {
  "name": "8 x YJ-83 anti-ship missiles",
  "dmg": 285,
  "warhead": "he",
  "range": 16.8,
  "minRange": 2,
  "reload": 15.3,
  "burst": 2,
  "burstDelay": 0.8,
  "acc": 0.83,
  "proj": "missile",
  "speed": 300,
  "aoe": 1.6,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "loft",
  "intercept": 0.55
 },
 "w_e00_pla_sub": {
  "name": "6 x 533mm tubes",
  "dmg": 337,
  "warhead": "he",
  "range": 9.5,
  "minRange": 1,
  "reload": 12.24,
  "burst": 2,
  "burstDelay": 1.3,
  "acc": 0.82,
  "proj": "torpedo",
  "speed": 8,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e50_roc_rifle": {
  "name": "M1 Garand",
  "dmg": 5,
  "warhead": "bullet",
  "range": 3.7,
  "reload": 1.41,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.52,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_roc_at": {
  "name": "M20 3.5in rocket launcher",
  "dmg": 55,
  "warhead": "heat",
  "range": 5.3,
  "minRange": 0.9,
  "reload": 6.66,
  "burst": 1,
  "acc": 0.62,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_roc_mbt": {
  "name": "76mm M1A1 gun",
  "dmg": 44,
  "warhead": "cannon",
  "range": 5.5,
  "reload": 5.12,
  "burst": 1,
  "acc": 0.58,
  "proj": "shell",
  "speed": 780,
  "aoe": 0.7,
  "suppress": 18,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_roc_lighttank": {
  "name": "76mm M32 gun",
  "dmg": 44,
  "warhead": "cannon",
  "range": 5.5,
  "reload": 5.12,
  "burst": 1,
  "acc": 0.58,
  "proj": "shell",
  "speed": 780,
  "aoe": 0.7,
  "suppress": 18,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_roc_ifv": {
  "name": "ring-mounted .50cal M2HB",
  "dmg": 9,
  "warhead": "bullet",
  "range": 4.7,
  "reload": 2.82,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.5,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_roc_spg": {
  "name": "105mm M2A1 howitzer",
  "dmg": 63,
  "warhead": "frag",
  "range": 11.5,
  "minRange": 3,
  "reload": 10.88,
  "burst": 1,
  "acc": 0.24,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_roc_spaag": {
  "name": "4x .50cal M2HB in Maxson turret",
  "dmg": 63,
  "warhead": "flak",
  "range": 8.1,
  "reload": 7.04,
  "burst": 2,
  "burstDelay": 0.5,
  "acc": 0.6,
  "proj": "missile",
  "speed": 600,
  "aoe": 0.9,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.75
 },
 "w_e50_roc_aa": {
  "name": "40mm L/60 automatic",
  "dmg": 46,
  "warhead": "flak",
  "range": 5.8,
  "reload": 5.89,
  "burst": 1,
  "acc": 0.58,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_roc_recon": {
  "name": "37mm M6 gun",
  "dmg": 5,
  "warhead": "bullet",
  "range": 4,
  "reload": 2.05,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.48,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_roc_fighter": {
  "name": "6x .50cal M3",
  "dmg": 97,
  "warhead": "flak",
  "range": 8.1,
  "reload": 3.58,
  "burst": 1,
  "acc": 0.66,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e50_roc_cas": {
  "name": "6x .50cal M3",
  "dmg": 139,
  "warhead": "he",
  "range": 1.9,
  "reload": 1.28,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.66,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_roc_corvette": {
  "name": "1x 3in/50",
  "dmg": 22,
  "warhead": "he",
  "range": 5.9,
  "reload": 1.54,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.53,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e50_roc_destroyer": {
  "name": "US 5in/38 and 3in/50 refit",
  "dmg": 53,
  "warhead": "he",
  "range": 8.5,
  "reload": 4.61,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.58,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e60_roc_rifle": {
  "name": "Type 57 (licence M14) 7.62mm",
  "dmg": 6,
  "warhead": "bullet",
  "range": 4.1,
  "reload": 1.32,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.58,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_roc_at": {
  "name": "M40A1 106mm RCL",
  "dmg": 73,
  "warhead": "heat",
  "range": 5.9,
  "minRange": 1,
  "reload": 6.24,
  "burst": 1,
  "acc": 0.69,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_roc_mbt": {
  "name": "90mm M41 gun",
  "dmg": 59,
  "warhead": "cannon",
  "range": 6.1,
  "reload": 4.8,
  "burst": 1,
  "acc": 0.64,
  "proj": "shell",
  "speed": 780,
  "aoe": 0.7,
  "suppress": 18,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_roc_lighttank": {
  "name": "76mm M32 gun",
  "dmg": 59,
  "warhead": "cannon",
  "range": 6.1,
  "reload": 4.8,
  "burst": 1,
  "acc": 0.64,
  "proj": "shell",
  "speed": 780,
  "aoe": 0.7,
  "suppress": 18,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_roc_ifv": {
  "name": "ring-mounted .50cal M2HB",
  "dmg": 12,
  "warhead": "bullet",
  "range": 5.2,
  "reload": 2.64,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.56,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_roc_spg": {
  "name": "M110: 203mm M2A2 howitzer. M108: 105mm M10",
  "dmg": 84,
  "warhead": "frag",
  "range": 12.7,
  "minRange": 3.3,
  "reload": 10.2,
  "burst": 1,
  "acc": 0.27,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_roc_mlrs": {
  "name": "126mm unguided rockets",
  "dmg": 39,
  "warhead": "frag",
  "range": 11.5,
  "minRange": 2.9,
  "reload": 16.8,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.18,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_roc_spaag": {
  "name": "2x 40mm Bofors L/60",
  "dmg": 84,
  "warhead": "flak",
  "range": 9,
  "reload": 6.6,
  "burst": 2,
  "burstDelay": 0.5,
  "acc": 0.67,
  "proj": "missile",
  "speed": 600,
  "aoe": 0.9,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.75
 },
 "w_e60_roc_aa": {
  "name": "MIM-23 semi-active radar homing SAM",
  "dmg": 62,
  "warhead": "flak",
  "range": 6.4,
  "reload": 5.52,
  "burst": 1,
  "acc": 0.64,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_roc_recon": {
  "name": "76mm M32 gun",
  "dmg": 7,
  "warhead": "bullet",
  "range": 4.4,
  "reload": 1.92,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.53,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_roc_fighter": {
  "name": "20mm M61A1 Vulcan",
  "dmg": 129,
  "warhead": "flak",
  "range": 9,
  "reload": 3.36,
  "burst": 1,
  "acc": 0.74,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e60_roc_cas": {
  "name": "4x 20mm M39",
  "dmg": 185,
  "warhead": "he",
  "range": 2.1,
  "reload": 1.2,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.74,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_roc_gunship": {
  "name": "n/a",
  "dmg": 81,
  "warhead": "heat",
  "range": 5.4,
  "reload": 2.88,
  "burst": 1,
  "acc": 0.72,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_roc_corvette": {
  "name": "3in/50",
  "dmg": 29,
  "warhead": "he",
  "range": 6.6,
  "reload": 1.44,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.59,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e60_roc_destroyer": {
  "name": "2x2 5in/38 Mk38",
  "dmg": 70,
  "warhead": "he",
  "range": 9.4,
  "reload": 4.32,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.64,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e60_roc_sub": {
  "name": "533mm torpedo tubes (training loadout only",
  "dmg": 168,
  "warhead": "he",
  "range": 6.1,
  "minRange": 0.8,
  "reload": 18,
  "burst": 1,
  "acc": 0.58,
  "proj": "torpedo",
  "speed": 6.8,
  "aoe": 1.1,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e60_roc_missileboat": {
  "name": "2x Hsiung Feng I anti-ship missile",
  "dmg": 160,
  "warhead": "he",
  "range": 12.3,
  "minRange": 1.6,
  "reload": 18,
  "burst": 2,
  "burstDelay": 0.9,
  "acc": 0.67,
  "proj": "missile",
  "speed": 310,
  "aoe": 1.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "loft",
  "intercept": 0.6
 },
 "w_e80_roc_rifle": {
  "name": "Type 65K1 5.56mm rifle",
  "dmg": 8,
  "warhead": "bullet",
  "range": 4.6,
  "reload": 1.22,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.64,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_roc_at": {
  "name": "BGM-71A/C TOW ATGM",
  "dmg": 96,
  "warhead": "heat",
  "range": 6.6,
  "minRange": 1.1,
  "reload": 5.77,
  "burst": 1,
  "acc": 0.77,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_roc_mbt": {
  "name": "105mm M68 gun",
  "dmg": 78,
  "warhead": "cannon",
  "range": 6.7,
  "reload": 4.44,
  "burst": 1,
  "acc": 0.71,
  "proj": "shell",
  "speed": 780,
  "aoe": 0.7,
  "suppress": 18,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_roc_lighttank": {
  "name": "76mm M32 gun",
  "dmg": 78,
  "warhead": "cannon",
  "range": 6.7,
  "reload": 4.44,
  "burst": 1,
  "acc": 0.71,
  "proj": "shell",
  "speed": 780,
  "aoe": 0.7,
  "suppress": 18,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_roc_ifv": {
  "name": "12.7mm or 20mm remote/pintle mount",
  "dmg": 16,
  "warhead": "bullet",
  "range": 5.8,
  "reload": 2.44,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.62,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_roc_spg": {
  "name": "155mm M185 howitzer",
  "dmg": 111,
  "warhead": "frag",
  "range": 14.1,
  "minRange": 3.6,
  "reload": 9.43,
  "burst": 1,
  "acc": 0.3,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_roc_mlrs": {
  "name": "45x 117mm Mk15 rockets (steel-ball fragmen",
  "dmg": 52,
  "warhead": "frag",
  "range": 12.7,
  "minRange": 3.2,
  "reload": 15.54,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.2,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_roc_spaag": {
  "name": "4x MIM-72 (Sidewinder-derived) IR SAM",
  "dmg": 111,
  "warhead": "flak",
  "range": 10,
  "reload": 6.11,
  "burst": 2,
  "burstDelay": 0.5,
  "acc": 0.75,
  "proj": "missile",
  "speed": 600,
  "aoe": 0.9,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.75
 },
 "w_e80_roc_aa": {
  "name": "MIM-23B SARH SAM",
  "dmg": 81,
  "warhead": "flak",
  "range": 7.1,
  "reload": 5.11,
  "burst": 1,
  "acc": 0.71,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_roc_recon": {
  "name": "20mm cannon or 12.7mm turret",
  "dmg": 10,
  "warhead": "bullet",
  "range": 4.9,
  "reload": 1.78,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.59,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_roc_fighter": {
  "name": "2x 20mm M39",
  "dmg": 170,
  "warhead": "flak",
  "range": 10,
  "reload": 3.11,
  "burst": 1,
  "acc": 0.82,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e80_roc_cas": {
  "name": "20mm gun pod",
  "dmg": 244,
  "warhead": "he",
  "range": 2.4,
  "reload": 1.11,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.82,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_roc_gunship": {
  "name": "4x BGM-71 TOW ATGM",
  "dmg": 107,
  "warhead": "heat",
  "range": 6,
  "reload": 2.66,
  "burst": 1,
  "acc": 0.8,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_roc_corvette": {
  "name": "1x 76mm OTO Melara",
  "dmg": 38,
  "warhead": "he",
  "range": 7.3,
  "reload": 1.33,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.66,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e80_roc_destroyer": {
  "name": "Twin 5in/38 Mk 38",
  "dmg": 93,
  "warhead": "he",
  "range": 10.5,
  "reload": 4,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.71,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e80_roc_sub": {
  "name": "533mm torpedo tubes",
  "dmg": 222,
  "warhead": "he",
  "range": 6.8,
  "minRange": 0.9,
  "reload": 16.65,
  "burst": 1,
  "acc": 0.64,
  "proj": "torpedo",
  "speed": 6.8,
  "aoe": 1.1,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e80_roc_missileboat": {
  "name": "2x Hsiung Feng I",
  "dmg": 211,
  "warhead": "he",
  "range": 13.7,
  "minRange": 1.8,
  "reload": 16.65,
  "burst": 2,
  "burstDelay": 0.9,
  "acc": 0.75,
  "proj": "missile",
  "speed": 310,
  "aoe": 1.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "loft",
  "intercept": 0.6
 },
 "w_e90_roc_rifle": {
  "name": "T86 5.56mm carbine",
  "dmg": 9,
  "warhead": "bullet",
  "range": 4.8,
  "reload": 1.17,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.68,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_roc_at": {
  "name": "BGM-71E tandem-warhead ATGM",
  "dmg": 112,
  "warhead": "heat",
  "range": 6.9,
  "minRange": 1.2,
  "reload": 5.51,
  "burst": 1,
  "acc": 0.81,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_roc_mbt": {
  "name": "105mm M68 gun",
  "dmg": 90,
  "warhead": "cannon",
  "range": 7.1,
  "reload": 4.24,
  "burst": 1,
  "acc": 0.75,
  "proj": "shell",
  "speed": 780,
  "aoe": 0.7,
  "suppress": 18,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_roc_lighttank": {
  "name": "105mm M68 gun",
  "dmg": 90,
  "warhead": "cannon",
  "range": 7.1,
  "reload": 4.24,
  "burst": 1,
  "acc": 0.75,
  "proj": "shell",
  "speed": 780,
  "aoe": 0.7,
  "suppress": 18,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_roc_ifv": {
  "name": "12.7mm / 20mm mount",
  "dmg": 19,
  "warhead": "bullet",
  "range": 6.1,
  "reload": 2.33,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.66,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_roc_spg": {
  "name": "155mm M284 howitzer (A5)",
  "dmg": 129,
  "warhead": "frag",
  "range": 14.9,
  "minRange": 3.8,
  "reload": 9.01,
  "burst": 1,
  "acc": 0.32,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_roc_mlrs": {
  "name": "45x 117mm rockets",
  "dmg": 60,
  "warhead": "frag",
  "range": 13.4,
  "minRange": 3.4,
  "reload": 14.84,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.21,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_roc_spaag": {
  "name": "8x FIM-92 Stinger",
  "dmg": 129,
  "warhead": "flak",
  "range": 10.6,
  "reload": 5.83,
  "burst": 2,
  "burstDelay": 0.5,
  "acc": 0.79,
  "proj": "missile",
  "speed": 600,
  "aoe": 0.9,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.75
 },
 "w_e90_roc_aa": {
  "name": "MIM-104C PAC-2 SAM",
  "dmg": 95,
  "warhead": "flak",
  "range": 7.5,
  "reload": 4.88,
  "burst": 1,
  "acc": 0.75,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_roc_recon": {
  "name": "20mm or 12.7mm turret",
  "dmg": 11,
  "warhead": "bullet",
  "range": 5.2,
  "reload": 1.7,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.62,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_roc_fighter": {
  "name": "20mm M61A1",
  "dmg": 198,
  "warhead": "flak",
  "range": 10.6,
  "reload": 2.97,
  "burst": 1,
  "acc": 0.86,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e90_roc_cas": {
  "name": "20mm M61A1",
  "dmg": 284,
  "warhead": "he",
  "range": 2.5,
  "reload": 1.06,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.86,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_roc_gunship": {
  "name": "20mm M197",
  "dmg": 125,
  "warhead": "heat",
  "range": 6.3,
  "reload": 2.54,
  "burst": 1,
  "acc": 0.85,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_roc_corvette": {
  "name": "1x 40mm",
  "dmg": 45,
  "warhead": "he",
  "range": 7.7,
  "reload": 1.27,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.7,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e90_roc_destroyer": {
  "name": "OTO Melara 76mm Compact",
  "dmg": 108,
  "warhead": "he",
  "range": 11,
  "reload": 3.82,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.75,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e90_roc_sub": {
  "name": "533mm tubes",
  "dmg": 258,
  "warhead": "he",
  "range": 7.2,
  "minRange": 1,
  "reload": 15.9,
  "burst": 1,
  "acc": 0.68,
  "proj": "torpedo",
  "speed": 6.8,
  "aoe": 1.1,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e90_roc_missileboat": {
  "name": "2x Hsiung Feng I",
  "dmg": 245,
  "warhead": "he",
  "range": 14.4,
  "minRange": 1.9,
  "reload": 15.9,
  "burst": 2,
  "burstDelay": 0.9,
  "acc": 0.79,
  "proj": "missile",
  "speed": 310,
  "aoe": 1.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "loft",
  "intercept": 0.6
 },
 "w_e00_roc_rifle": {
  "name": "T91 5.56mm carbine",
  "dmg": 10,
  "warhead": "bullet",
  "range": 5,
  "reload": 1.12,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.71,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_roc_at": {
  "name": "FGM-148 fire-and-forget top-attack ATGM",
  "dmg": 124,
  "warhead": "heat",
  "range": 7.1,
  "minRange": 1.2,
  "reload": 5.3,
  "burst": 1,
  "acc": 0.84,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_roc_mbt": {
  "name": "105mm M68",
  "dmg": 100,
  "warhead": "cannon",
  "range": 7.3,
  "reload": 4.08,
  "burst": 1,
  "acc": 0.78,
  "proj": "shell",
  "speed": 780,
  "aoe": 0.7,
  "suppress": 18,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_roc_lighttank": {
  "name": "76mm M32A1 with new fire control",
  "dmg": 100,
  "warhead": "cannon",
  "range": 7.3,
  "reload": 4.08,
  "burst": 1,
  "acc": 0.78,
  "proj": "shell",
  "speed": 780,
  "aoe": 0.7,
  "suppress": 18,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_roc_ifv": {
  "name": "Mk44 Bushmaster II 30mm chain gun",
  "dmg": 21,
  "warhead": "bullet",
  "range": 6.3,
  "reload": 2.24,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.69,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_roc_spg": {
  "name": "155mm M284",
  "dmg": 143,
  "warhead": "frag",
  "range": 15.3,
  "minRange": 4,
  "reload": 8.67,
  "burst": 1,
  "acc": 0.33,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_roc_mlrs": {
  "name": "Mk15 117mm (60 tubes)",
  "dmg": 67,
  "warhead": "frag",
  "range": 13.9,
  "minRange": 3.5,
  "reload": 14.28,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.22,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_roc_spaag": {
  "name": "4x TC-1L (ground-launched Sky Sword I) IR ",
  "dmg": 143,
  "warhead": "flak",
  "range": 10.9,
  "reload": 5.61,
  "burst": 2,
  "burstDelay": 0.5,
  "acc": 0.82,
  "proj": "missile",
  "speed": 600,
  "aoe": 0.9,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.75
 },
 "w_e00_roc_aa": {
  "name": "PAC-3 hit-to-kill interceptor",
  "dmg": 105,
  "warhead": "flak",
  "range": 7.7,
  "reload": 4.69,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_roc_recon": {
  "name": "remote weapon station",
  "dmg": 12,
  "warhead": "bullet",
  "range": 5.3,
  "reload": 1.63,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.65,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_roc_fighter": {
  "name": "AN/APG-83 SABR AESA",
  "dmg": 219,
  "warhead": "flak",
  "range": 10.9,
  "reload": 2.86,
  "burst": 1,
  "acc": 0.9,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e00_roc_cas": {
  "name": "Tien Chien II",
  "dmg": 314,
  "warhead": "he",
  "range": 2.6,
  "reload": 1.02,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.9,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_roc_gunship": {
  "name": "30mm M230",
  "dmg": 138,
  "warhead": "heat",
  "range": 6.5,
  "reload": 2.45,
  "burst": 1,
  "acc": 0.88,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_roc_aswhelo": {
  "name": "Mk46 torpedoes",
  "dmg": 204,
  "warhead": "he",
  "range": 6.4,
  "reload": 7.14,
  "burst": 1,
  "acc": 0.86,
  "proj": "torpedo",
  "speed": 9,
  "aoe": 0.8,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 0,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e00_roc_corvette": {
  "name": "Hsiung Feng II and III anti-ship missiles",
  "dmg": 49,
  "warhead": "he",
  "range": 7.9,
  "reload": 1.22,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.73,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e00_roc_destroyer": {
  "name": "Two 127mm/54 Mk 45",
  "dmg": 119,
  "warhead": "he",
  "range": 11.4,
  "reload": 3.67,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.78,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e00_roc_sub": {
  "name": "533mm tubes",
  "dmg": 285,
  "warhead": "he",
  "range": 7.4,
  "minRange": 1,
  "reload": 15.3,
  "burst": 1,
  "acc": 0.71,
  "proj": "torpedo",
  "speed": 6.8,
  "aoe": 1.1,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e00_roc_missileboat": {
  "name": "4x Hsiung Feng II anti-ship missile",
  "dmg": 271,
  "warhead": "he",
  "range": 14.9,
  "minRange": 2,
  "reload": 15.3,
  "burst": 2,
  "burstDelay": 0.9,
  "acc": 0.82,
  "proj": "missile",
  "speed": 310,
  "aoe": 1.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "loft",
  "intercept": 0.6
 },
 "w_e50_kpa_rifle": {
  "name": "7.62x25mm PPSh-41 SMG",
  "dmg": 5,
  "warhead": "bullet",
  "range": 3.7,
  "reload": 1.41,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.52,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_kpa_at": {
  "name": "45mm M-42 towed gun",
  "dmg": 55,
  "warhead": "heat",
  "range": 5.3,
  "minRange": 0.9,
  "reload": 6.66,
  "burst": 1,
  "acc": 0.62,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_kpa_mbt": {
  "name": "85mm ZiS-S-53",
  "dmg": 69,
  "warhead": "cannon",
  "range": 6.1,
  "reload": 6.4,
  "burst": 1,
  "acc": 0.59,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_kpa_spg": {
  "name": "76.2mm ZiS-3 in an open-topped fighting co",
  "dmg": 84,
  "warhead": "frag",
  "range": 14.8,
  "minRange": 4.4,
  "reload": 16.64,
  "burst": 1,
  "acc": 0.17,
  "proj": "arc",
  "speed": 230,
  "aoe": 2.8,
  "suppress": 75,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_kpa_mlrs": {
  "name": "16x 132mm M-13 rockets on a truck chassis",
  "dmg": 26,
  "warhead": "frag",
  "range": 9.3,
  "minRange": 2.2,
  "reload": 19.2,
  "burst": 16,
  "burstDelay": 0.13,
  "acc": 0.12,
  "proj": "arc",
  "speed": 240,
  "aoe": 2.2,
  "suppress": 45,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_kpa_aa": {
  "name": "37mm 61-K",
  "dmg": 46,
  "warhead": "flak",
  "range": 5.8,
  "reload": 5.89,
  "burst": 1,
  "acc": 0.58,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_kpa_recon": {
  "name": "1x 7.62mm DT machine gun",
  "dmg": 5,
  "warhead": "bullet",
  "range": 4,
  "reload": 2.05,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.48,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_kpa_fighter": {
  "name": "1x 20mm ShVAK through the hub",
  "dmg": 84,
  "warhead": "flak",
  "range": 7,
  "reload": 3.84,
  "burst": 1,
  "acc": 0.63,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e50_kpa_cas": {
  "name": "2x 23mm NS-23 wing cannon",
  "dmg": 139,
  "warhead": "he",
  "range": 1.9,
  "reload": 1.28,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.66,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_kpa_corvette": {
  "name": "12.7mm DShK; 2x 533mm stern-trough torpedoes",
  "dmg": 22,
  "warhead": "he",
  "range": 5.9,
  "reload": 1.54,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.53,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e60_kpa_rifle": {
  "name": "7.62x39mm Type 58",
  "dmg": 6,
  "warhead": "bullet",
  "range": 4.1,
  "reload": 1.32,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.58,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_kpa_at": {
  "name": "40mm PG-7 series HEAT rocket",
  "dmg": 73,
  "warhead": "heat",
  "range": 5.9,
  "minRange": 1,
  "reload": 6.24,
  "burst": 1,
  "acc": 0.69,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_kpa_mbt": {
  "name": "100mm D-10T rifled gun",
  "dmg": 92,
  "warhead": "cannon",
  "range": 6.7,
  "reload": 6,
  "burst": 1,
  "acc": 0.66,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_kpa_lighttank": {
  "name": "76.2mm D-56T",
  "dmg": 34,
  "warhead": "cannon",
  "range": 5.4,
  "reload": 3.72,
  "burst": 1,
  "acc": 0.62,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_kpa_ifv": {
  "name": "1x 14.5mm KPVT",
  "dmg": 7,
  "warhead": "bullet",
  "range": 4.4,
  "reload": 1.92,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.53,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_kpa_spg": {
  "name": "122mm D-74 or M-1931/37 gun on a locally b",
  "dmg": 112,
  "warhead": "frag",
  "range": 16.4,
  "minRange": 4.9,
  "reload": 15.6,
  "burst": 1,
  "acc": 0.19,
  "proj": "arc",
  "speed": 230,
  "aoe": 2.8,
  "suppress": 75,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_kpa_mlrs": {
  "name": "40x 122mm rockets",
  "dmg": 35,
  "warhead": "frag",
  "range": 10.3,
  "minRange": 2.5,
  "reload": 18,
  "burst": 16,
  "burstDelay": 0.13,
  "acc": 0.13,
  "proj": "arc",
  "speed": 240,
  "aoe": 2.2,
  "suppress": 45,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_kpa_spaag": {
  "name": "2x 57mm S-68 in an open-topped turret",
  "dmg": 15,
  "warhead": "flak",
  "range": 5.7,
  "reload": 2.04,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.5,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e60_kpa_aa": {
  "name": "V-750 command-guided SAM",
  "dmg": 62,
  "warhead": "flak",
  "range": 6.4,
  "reload": 5.52,
  "burst": 1,
  "acc": 0.64,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_kpa_recon": {
  "name": "1x 14.5mm KPVT",
  "dmg": 7,
  "warhead": "bullet",
  "range": 4.4,
  "reload": 1.92,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.53,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_kpa_fighter": {
  "name": "2x K-13 (AA-2 Atoll) IR missiles",
  "dmg": 112,
  "warhead": "flak",
  "range": 7.8,
  "reload": 3.6,
  "burst": 1,
  "acc": 0.7,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e60_kpa_cas": {
  "name": "2x 30mm NR-30",
  "dmg": 185,
  "warhead": "he",
  "range": 2.1,
  "reload": 1.2,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.74,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_kpa_corvette": {
  "name": "2x 100mm",
  "dmg": 29,
  "warhead": "he",
  "range": 6.6,
  "reload": 1.44,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.59,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e60_kpa_missileboat": {
  "name": "P-15 Termit (SS-N-2 Styx) anti-ship missil",
  "dmg": 112,
  "warhead": "he",
  "range": 7.8,
  "minRange": 1.2,
  "reload": 20.4,
  "burst": 1,
  "acc": 0.46,
  "proj": "missile",
  "speed": 100,
  "aoe": 1.2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "skim",
  "intercept": 1.45
 },
 "w_e60_kpa_sub": {
  "name": "533mm torpedoes",
  "dmg": 140,
  "warhead": "he",
  "range": 4.5,
  "minRange": 0.7,
  "reload": 22.8,
  "burst": 1,
  "acc": 0.42,
  "proj": "torpedo",
  "speed": 6,
  "aoe": 1,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e80_kpa_rifle": {
  "name": "5.45x39mm Type 88",
  "dmg": 8,
  "warhead": "bullet",
  "range": 4.6,
  "reload": 1.22,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.64,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_kpa_at": {
  "name": "9M111 SACLOS wire-guided HEAT missile",
  "dmg": 96,
  "warhead": "heat",
  "range": 6.6,
  "minRange": 1.1,
  "reload": 5.77,
  "burst": 1,
  "acc": 0.77,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_kpa_mbt": {
  "name": "115mm U-5TS on early marks",
  "dmg": 122,
  "warhead": "cannon",
  "range": 7.5,
  "reload": 5.55,
  "burst": 1,
  "acc": 0.73,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_kpa_lighttank": {
  "name": "85mm gun",
  "dmg": 44,
  "warhead": "cannon",
  "range": 6,
  "reload": 3.44,
  "burst": 1,
  "acc": 0.69,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_kpa_ifv": {
  "name": "1x 14.5mm KPVT",
  "dmg": 10,
  "warhead": "bullet",
  "range": 4.9,
  "reload": 1.78,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.59,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_kpa_spg": {
  "name": "170mm gun",
  "dmg": 148,
  "warhead": "frag",
  "range": 18.2,
  "minRange": 5.5,
  "reload": 14.43,
  "burst": 1,
  "acc": 0.21,
  "proj": "arc",
  "speed": 230,
  "aoe": 2.8,
  "suppress": 75,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_kpa_mlrs": {
  "name": "12x 240mm rockets",
  "dmg": 46,
  "warhead": "frag",
  "range": 11.4,
  "minRange": 2.7,
  "reload": 16.65,
  "burst": 16,
  "burstDelay": 0.13,
  "acc": 0.14,
  "proj": "arc",
  "speed": 240,
  "aoe": 2.2,
  "suppress": 45,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_kpa_spaag": {
  "name": "2x 37mm on a locally built tracked chassis",
  "dmg": 19,
  "warhead": "flak",
  "range": 6.4,
  "reload": 1.89,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.55,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e80_kpa_aa": {
  "name": "V-880 semi-active radar homing missile",
  "dmg": 81,
  "warhead": "flak",
  "range": 7.1,
  "reload": 5.11,
  "burst": 1,
  "acc": 0.71,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_kpa_recon": {
  "name": "1x 14.5mm KPVT",
  "dmg": 10,
  "warhead": "bullet",
  "range": 4.9,
  "reload": 1.78,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.59,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_kpa_fighter": {
  "name": "R-23/R-24 semi-active radar missiles",
  "dmg": 148,
  "warhead": "flak",
  "range": 8.6,
  "reload": 3.33,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e80_kpa_cas": {
  "name": "30mm GSh-30-2",
  "dmg": 244,
  "warhead": "he",
  "range": 2.4,
  "reload": 1.11,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.82,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_kpa_gunship": {
  "name": "12.7mm YakB gatling",
  "dmg": 107,
  "warhead": "heat",
  "range": 6,
  "reload": 2.66,
  "burst": 1,
  "acc": 0.8,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_kpa_corvette": {
  "name": "1x 100mm",
  "dmg": 38,
  "warhead": "he",
  "range": 7.3,
  "reload": 1.33,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.66,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e80_kpa_missileboat": {
  "name": "4x P-15 Termit (SS-N-2 Styx) anti-ship mis",
  "dmg": 148,
  "warhead": "he",
  "range": 8.6,
  "minRange": 1.4,
  "reload": 18.87,
  "burst": 1,
  "acc": 0.52,
  "proj": "missile",
  "speed": 100,
  "aoe": 1.2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "skim",
  "intercept": 1.45
 },
 "w_e80_kpa_sub": {
  "name": "8x 533mm tubes",
  "dmg": 185,
  "warhead": "he",
  "range": 5,
  "minRange": 0.7,
  "reload": 21.09,
  "burst": 1,
  "acc": 0.46,
  "proj": "torpedo",
  "speed": 6,
  "aoe": 1,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e90_kpa_rifle": {
  "name": "5.45x39mm Type 88",
  "dmg": 9,
  "warhead": "bullet",
  "range": 4.8,
  "reload": 1.17,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.68,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_kpa_at": {
  "name": "9M111 SACLOS missile",
  "dmg": 112,
  "warhead": "heat",
  "range": 6.9,
  "minRange": 1.2,
  "reload": 5.51,
  "burst": 1,
  "acc": 0.81,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_kpa_mbt": {
  "name": "125mm smoothbore on later marks",
  "dmg": 142,
  "warhead": "cannon",
  "range": 7.9,
  "reload": 5.3,
  "burst": 1,
  "acc": 0.77,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_kpa_lighttank": {
  "name": "85mm gun",
  "dmg": 52,
  "warhead": "cannon",
  "range": 6.3,
  "reload": 3.29,
  "burst": 1,
  "acc": 0.73,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_kpa_ifv": {
  "name": "1x 14.5mm KPVT",
  "dmg": 11,
  "warhead": "bullet",
  "range": 5.2,
  "reload": 1.7,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.62,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_kpa_spg": {
  "name": "170mm gun on a redesigned chassis with onb",
  "dmg": 172,
  "warhead": "frag",
  "range": 19.2,
  "minRange": 5.8,
  "reload": 13.78,
  "burst": 1,
  "acc": 0.23,
  "proj": "arc",
  "speed": 230,
  "aoe": 2.8,
  "suppress": 75,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_kpa_mlrs": {
  "name": "22x 240mm rockets",
  "dmg": 53,
  "warhead": "frag",
  "range": 12,
  "minRange": 2.9,
  "reload": 15.9,
  "burst": 16,
  "burstDelay": 0.13,
  "acc": 0.15,
  "proj": "arc",
  "speed": 240,
  "aoe": 2.2,
  "suppress": 45,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_kpa_spaag": {
  "name": "2x 30mm on a tracked chassis",
  "dmg": 22,
  "warhead": "flak",
  "range": 6.7,
  "reload": 1.8,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.58,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e90_kpa_aa": {
  "name": "Command and semi-active radar homing SAMs",
  "dmg": 95,
  "warhead": "flak",
  "range": 7.5,
  "reload": 4.88,
  "burst": 1,
  "acc": 0.75,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_kpa_recon": {
  "name": "14.5mm or 12.7mm heavy machine gun",
  "dmg": 11,
  "warhead": "bullet",
  "range": 5.2,
  "reload": 1.7,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.62,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_kpa_fighter": {
  "name": "R-60 and R-13 IR missiles",
  "dmg": 172,
  "warhead": "flak",
  "range": 9.1,
  "reload": 3.18,
  "burst": 1,
  "acc": 0.83,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e90_kpa_cas": {
  "name": "30mm GSh-30-2",
  "dmg": 284,
  "warhead": "he",
  "range": 2.5,
  "reload": 1.06,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.86,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_kpa_gunship": {
  "name": "12.7mm gatling",
  "dmg": 125,
  "warhead": "heat",
  "range": 6.3,
  "reload": 2.54,
  "burst": 1,
  "acc": 0.85,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_kpa_corvette": {
  "name": "2x 100mm",
  "dmg": 45,
  "warhead": "he",
  "range": 7.7,
  "reload": 1.27,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.7,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e90_kpa_sub": {
  "name": "2x 533mm torpedo tubes or mines",
  "dmg": 215,
  "warhead": "he",
  "range": 5.3,
  "minRange": 0.8,
  "reload": 20.14,
  "burst": 1,
  "acc": 0.49,
  "proj": "torpedo",
  "speed": 6,
  "aoe": 1,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e90_kpa_missileboat": {
  "name": "4x SS-N-2 Styx derivatives",
  "dmg": 172,
  "warhead": "he",
  "range": 9.1,
  "minRange": 1.4,
  "reload": 18.02,
  "burst": 1,
  "acc": 0.55,
  "proj": "missile",
  "speed": 100,
  "aoe": 1.2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "skim",
  "intercept": 1.45
 },
 "w_e00_kpa_rifle": {
  "name": "5.45x39mm",
  "dmg": 10,
  "warhead": "bullet",
  "range": 5,
  "reload": 1.12,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.71,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_kpa_at": {
  "name": "Laser beam-riding tandem-HEAT missile",
  "dmg": 124,
  "warhead": "heat",
  "range": 7.1,
  "minRange": 1.2,
  "reload": 5.3,
  "burst": 1,
  "acc": 0.84,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_kpa_mbt": {
  "name": "125mm 2A46 pattern smoothbore",
  "dmg": 157,
  "warhead": "cannon",
  "range": 8.1,
  "reload": 5.1,
  "burst": 1,
  "acc": 0.8,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_kpa_heavy": {
  "name": "125mm smoothbore",
  "dmg": 157,
  "warhead": "cannon",
  "range": 8.1,
  "reload": 5.1,
  "burst": 1,
  "acc": 0.8,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_kpa_lighttank": {
  "name": "85mm gun",
  "dmg": 57,
  "warhead": "cannon",
  "range": 6.5,
  "reload": 3.16,
  "burst": 1,
  "acc": 0.76,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_kpa_ifv": {
  "name": "Machine gun",
  "dmg": 12,
  "warhead": "bullet",
  "range": 5.3,
  "reload": 1.63,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.65,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_kpa_spg": {
  "name": "170mm gun",
  "dmg": 190,
  "warhead": "frag",
  "range": 19.8,
  "minRange": 5.9,
  "reload": 13.26,
  "burst": 1,
  "acc": 0.24,
  "proj": "arc",
  "speed": 230,
  "aoe": 2.8,
  "suppress": 75,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_kpa_mlrs": {
  "name": "8x 300mm rockets",
  "dmg": 59,
  "warhead": "frag",
  "range": 12.4,
  "minRange": 3,
  "reload": 15.3,
  "burst": 16,
  "burstDelay": 0.13,
  "acc": 0.16,
  "proj": "arc",
  "speed": 240,
  "aoe": 2.2,
  "suppress": 45,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_kpa_spaag": {
  "name": "2x 37mm",
  "dmg": 25,
  "warhead": "flak",
  "range": 6.9,
  "reload": 1.73,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.61,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e00_kpa_aa": {
  "name": "Vertically launched SAM",
  "dmg": 105,
  "warhead": "flak",
  "range": 7.7,
  "reload": 4.69,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_kpa_recon": {
  "name": "Heavy machine gun",
  "dmg": 12,
  "warhead": "bullet",
  "range": 5.3,
  "reload": 1.63,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.65,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_kpa_fighter": {
  "name": "R-27R",
  "dmg": 190,
  "warhead": "flak",
  "range": 9.4,
  "reload": 3.06,
  "burst": 1,
  "acc": 0.86,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e00_kpa_cas": {
  "name": "30mm GSh-30-2",
  "dmg": 314,
  "warhead": "he",
  "range": 2.6,
  "reload": 1.02,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.9,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_kpa_gunship": {
  "name": "12.7mm gatling",
  "dmg": 138,
  "warhead": "heat",
  "range": 6.5,
  "reload": 2.45,
  "burst": 1,
  "acc": 0.88,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_kpa_missileboat": {
  "name": "Kumsong-3 (Kh-35 derivative) anti-ship mis",
  "dmg": 190,
  "warhead": "he",
  "range": 9.4,
  "minRange": 1.5,
  "reload": 17.34,
  "burst": 1,
  "acc": 0.57,
  "proj": "missile",
  "speed": 100,
  "aoe": 1.2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "skim",
  "intercept": 1.45
 },
 "w_e00_kpa_sub": {
  "name": "1x vertical launch tube for Pukguksong-1 S",
  "dmg": 238,
  "warhead": "he",
  "range": 5.4,
  "minRange": 0.8,
  "reload": 19.38,
  "burst": 1,
  "acc": 0.51,
  "proj": "torpedo",
  "speed": 6,
  "aoe": 1,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e50_nato_rifle": {
  "name": "M1 Garand .30-06 semi-automatic rifle",
  "dmg": 5,
  "warhead": "bullet",
  "range": 3.7,
  "reload": 1.41,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.52,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_nato_at": {
  "name": "88.9mm shaped-charge rocket",
  "dmg": 55,
  "warhead": "heat",
  "range": 5.3,
  "minRange": 0.9,
  "reload": 6.66,
  "burst": 1,
  "acc": 0.62,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_nato_mbt": {
  "name": "90mm M41 gun",
  "dmg": 66,
  "warhead": "cannon",
  "range": 5.9,
  "reload": 5.5,
  "burst": 1,
  "acc": 0.6,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_nato_lighttank": {
  "name": "76mm M32 gun",
  "dmg": 25,
  "warhead": "cannon",
  "range": 4.9,
  "reload": 3.97,
  "burst": 1,
  "acc": 0.56,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_nato_ifv": {
  "name": ".50 cal M2HB on an open pintle mount - not",
  "dmg": 9,
  "warhead": "bullet",
  "range": 4.7,
  "reload": 2.82,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.5,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_nato_spg": {
  "name": "155mm M45 howitzer",
  "dmg": 63,
  "warhead": "frag",
  "range": 11.5,
  "minRange": 3,
  "reload": 10.88,
  "burst": 1,
  "acc": 0.24,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_nato_mlrs": {
  "name": "762mm unguided artillery rocket",
  "dmg": 29,
  "warhead": "frag",
  "range": 10.4,
  "minRange": 2.6,
  "reload": 17.92,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.16,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_nato_spaag": {
  "name": "Twin 40mm Bofors M2A1",
  "dmg": 11,
  "warhead": "flak",
  "range": 5.2,
  "reload": 2.18,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.45,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e50_nato_aa": {
  "name": "Four .50 cal M2HB machine guns",
  "dmg": 46,
  "warhead": "flak",
  "range": 5.8,
  "reload": 5.89,
  "burst": 1,
  "acc": 0.58,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_nato_recon": {
  "name": ".30 cal Browning in a small manual turret",
  "dmg": 5,
  "warhead": "bullet",
  "range": 4,
  "reload": 2.05,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.48,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_nato_fighter": {
  "name": "Six .50 cal M3 machine guns",
  "dmg": 84,
  "warhead": "flak",
  "range": 7,
  "reload": 3.84,
  "burst": 1,
  "acc": 0.63,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e50_nato_cas": {
  "name": "Four 20mm cannon",
  "dmg": 139,
  "warhead": "he",
  "range": 1.9,
  "reload": 1.28,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.66,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_nato_gunship": {
  "name": "Nord AS.11 (SS.11) MCLOS wire-guided missi",
  "dmg": 61,
  "warhead": "heat",
  "range": 4.9,
  "reload": 3.07,
  "burst": 1,
  "acc": 0.65,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_nato_corvette": {
  "name": "Two twin 76mm/50 Mk 33",
  "dmg": 22,
  "warhead": "he",
  "range": 5.9,
  "reload": 1.54,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.53,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e50_nato_destroyer": {
  "name": "Three 127mm/54 Mk 42 single mounts",
  "dmg": 53,
  "warhead": "he",
  "range": 8.5,
  "reload": 4.61,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.58,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e50_nato_sub": {
  "name": "Six 533mm bow torpedo tubes",
  "dmg": 160,
  "warhead": "he",
  "range": 7.8,
  "minRange": 0.7,
  "reload": 14.08,
  "burst": 2,
  "burstDelay": 1.2,
  "acc": 0.65,
  "proj": "torpedo",
  "speed": 8,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e50_nato_cruiser": {
  "name": "Nine 203mm/55 Mk 16 rapid-fire guns in thr",
  "dmg": 53,
  "warhead": "he",
  "range": 8.5,
  "reload": 4.61,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.58,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e50_nato_carrier": {
  "name": "Air wing of ~90 aircraft",
  "dmg": 25,
  "warhead": "flak",
  "range": 2.4,
  "reload": 1.15,
  "burst": 8,
  "burstDelay": 0.05,
  "acc": 0.58,
  "proj": "tracer",
  "speed": 940,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e50_nato_ewair": {
  "name": "Jammer pods and chaff dispensers",
  "dmg": 88,
  "warhead": "he",
  "range": 7.8,
  "minRange": 1.1,
  "reload": 7.68,
  "burst": 1,
  "acc": 0.63,
  "proj": "missile",
  "speed": 520,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.7
 },
 "w_e60_nato_rifle": {
  "name": "5.56mm M16A1 rifle",
  "dmg": 6,
  "warhead": "bullet",
  "range": 4.1,
  "reload": 1.32,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.58,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_nato_at": {
  "name": "66mm disposable shaped-charge rocket",
  "dmg": 73,
  "warhead": "heat",
  "range": 5.9,
  "minRange": 1,
  "reload": 6.24,
  "burst": 1,
  "acc": 0.69,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_nato_mbt": {
  "name": "105mm M68 gun (licensed Royal Ordnance L7)",
  "dmg": 88,
  "warhead": "cannon",
  "range": 6.6,
  "reload": 5.16,
  "burst": 1,
  "acc": 0.66,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_nato_lighttank": {
  "name": "152mm M81 gun/launcher firing conventional",
  "dmg": 34,
  "warhead": "cannon",
  "range": 5.4,
  "reload": 3.72,
  "burst": 1,
  "acc": 0.62,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_nato_ifv": {
  "name": "20mm Rh 202 autocannon",
  "dmg": 12,
  "warhead": "bullet",
  "range": 5.2,
  "reload": 2.64,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.56,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_nato_spg": {
  "name": "155mm M126 howitzer in a fully rotating en",
  "dmg": 84,
  "warhead": "frag",
  "range": 12.7,
  "minRange": 3.3,
  "reload": 10.2,
  "burst": 1,
  "acc": 0.27,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_nato_mlrs": {
  "name": "36 x 110mm unguided rockets on a MAN 6x6 t",
  "dmg": 39,
  "warhead": "frag",
  "range": 11.5,
  "minRange": 2.9,
  "reload": 16.8,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.18,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_nato_spaag": {
  "name": "20mm M168 rotary cannon (M61 Vulcan deriva",
  "dmg": 15,
  "warhead": "flak",
  "range": 5.7,
  "reload": 2.04,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.5,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e60_nato_aa": {
  "name": "70mm uncooled lead-sulphide IR homing miss",
  "dmg": 62,
  "warhead": "flak",
  "range": 6.4,
  "reload": 5.52,
  "burst": 1,
  "acc": 0.64,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_nato_recon": {
  "name": "M60 GPMG",
  "dmg": 7,
  "warhead": "bullet",
  "range": 4.4,
  "reload": 1.92,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.53,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_nato_fighter": {
  "name": "AIM-7 Sparrow radar-guided and AIM-9 Sidew",
  "dmg": 112,
  "warhead": "flak",
  "range": 7.8,
  "reload": 3.6,
  "burst": 1,
  "acc": 0.7,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e60_nato_cas": {
  "name": "20mm M61A1",
  "dmg": 185,
  "warhead": "he",
  "range": 2.1,
  "reload": 1.2,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.74,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_nato_gunship": {
  "name": "7.62mm miniguns and 40mm grenade launcher ",
  "dmg": 81,
  "warhead": "heat",
  "range": 5.4,
  "reload": 2.88,
  "burst": 1,
  "acc": 0.72,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_nato_corvette": {
  "name": "One 127mm/54 Mk 42",
  "dmg": 29,
  "warhead": "he",
  "range": 6.6,
  "reload": 1.44,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.59,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e60_nato_destroyer": {
  "name": "Two 127mm/54 Mk 42",
  "dmg": 70,
  "warhead": "he",
  "range": 9.4,
  "reload": 4.32,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.64,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e60_nato_sub": {
  "name": "Four 533mm amidships tubes",
  "dmg": 213,
  "warhead": "he",
  "range": 8.6,
  "minRange": 0.8,
  "reload": 13.2,
  "burst": 2,
  "burstDelay": 1.2,
  "acc": 0.72,
  "proj": "torpedo",
  "speed": 8,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e60_nato_cruiser": {
  "name": "Terrier and Talos SAM launchers",
  "dmg": 70,
  "warhead": "he",
  "range": 9.4,
  "reload": 4.32,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.64,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e60_nato_carrier": {
  "name": "Air wing of ~90 aircraft",
  "dmg": 34,
  "warhead": "flak",
  "range": 2.6,
  "reload": 1.08,
  "burst": 8,
  "burstDelay": 0.05,
  "acc": 0.64,
  "proj": "tracer",
  "speed": 940,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e60_nato_missileboat": {
  "name": "Two MM38 Exocet anti-ship missiles",
  "dmg": 148,
  "warhead": "he",
  "range": 11.5,
  "minRange": 1.6,
  "reload": 15.6,
  "burst": 2,
  "burstDelay": 0.9,
  "acc": 0.69,
  "proj": "missile",
  "speed": 120,
  "aoe": 1.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "skim",
  "intercept": 1
 },
 "w_e60_nato_ewair": {
  "name": "ALQ-99 tactical jamming pods",
  "dmg": 118,
  "warhead": "he",
  "range": 8.6,
  "minRange": 1.2,
  "reload": 7.2,
  "burst": 1,
  "acc": 0.7,
  "proj": "missile",
  "speed": 520,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.7
 },
 "w_e60_nato_sead": {
  "name": "AGM-45 Shrike and AGM-78 Standard ARM anti",
  "dmg": 118,
  "warhead": "he",
  "range": 8.6,
  "minRange": 1.2,
  "reload": 7.2,
  "burst": 1,
  "acc": 0.7,
  "proj": "missile",
  "speed": 520,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.7
 },
 "w_e80_nato_rifle": {
  "name": "5.56mm M16A2 rifle",
  "dmg": 8,
  "warhead": "bullet",
  "range": 4.6,
  "reload": 1.22,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.64,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_nato_at": {
  "name": "84mm disposable shaped-charge rocket",
  "dmg": 96,
  "warhead": "heat",
  "range": 6.6,
  "minRange": 1.1,
  "reload": 5.77,
  "burst": 1,
  "acc": 0.77,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_nato_mbt": {
  "name": "120mm M256 smoothbore (licensed Rheinmetal",
  "dmg": 117,
  "warhead": "cannon",
  "range": 7.3,
  "reload": 4.77,
  "burst": 1,
  "acc": 0.74,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_nato_lighttank": {
  "name": "76mm rifled gun",
  "dmg": 44,
  "warhead": "cannon",
  "range": 6,
  "reload": 3.44,
  "burst": 1,
  "acc": 0.69,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_nato_ifv": {
  "name": "25mm M242 Bushmaster chain gun",
  "dmg": 16,
  "warhead": "bullet",
  "range": 5.8,
  "reload": 2.44,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.62,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_nato_spg": {
  "name": "155mm howitzer",
  "dmg": 111,
  "warhead": "frag",
  "range": 14.1,
  "minRange": 3.6,
  "reload": 9.43,
  "burst": 1,
  "acc": 0.3,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_nato_mlrs": {
  "name": "12 x 227mm rockets",
  "dmg": 52,
  "warhead": "frag",
  "range": 12.7,
  "minRange": 3.2,
  "reload": 15.54,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.2,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_nato_spaag": {
  "name": "35mm twin AA",
  "dmg": 19,
  "warhead": "flak",
  "range": 6.4,
  "reload": 1.89,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.55,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e80_nato_aa": {
  "name": "70mm cooled IR/UV dual-band homing missile",
  "dmg": 81,
  "warhead": "flak",
  "range": 7.1,
  "reload": 5.11,
  "burst": 1,
  "acc": 0.71,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_nato_recon": {
  "name": "M2 .50 cal",
  "dmg": 10,
  "warhead": "bullet",
  "range": 4.9,
  "reload": 1.78,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.59,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_nato_fighter": {
  "name": "AIM-7 Sparrow",
  "dmg": 148,
  "warhead": "flak",
  "range": 8.6,
  "reload": 3.33,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e80_nato_cas": {
  "name": "500lb guided bomb",
  "dmg": 244,
  "warhead": "he",
  "range": 2.4,
  "reload": 1.11,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.82,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_nato_gunship": {
  "name": "30mm M230 chain gun",
  "dmg": 107,
  "warhead": "heat",
  "range": 6,
  "reload": 2.66,
  "burst": 1,
  "acc": 0.8,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_nato_corvette": {
  "name": "OTO 76mm Mk 75",
  "dmg": 38,
  "warhead": "he",
  "range": 7.3,
  "reload": 1.33,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.66,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e80_nato_destroyer": {
  "name": "Two 127mm/54 Mk 45",
  "dmg": 93,
  "warhead": "he",
  "range": 10.5,
  "reload": 4,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.71,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e80_nato_sub": {
  "name": "Mk 48 ADCAP",
  "dmg": 281,
  "warhead": "he",
  "range": 9.6,
  "minRange": 0.9,
  "reload": 12.21,
  "burst": 2,
  "burstDelay": 1.2,
  "acc": 0.8,
  "proj": "torpedo",
  "speed": 8,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e80_nato_cruiser": {
  "name": "Two 127mm/54 Mk 45",
  "dmg": 93,
  "warhead": "he",
  "range": 10.5,
  "reload": 4,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.71,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e80_nato_carrier": {
  "name": "Mk 15 Phalanx CIWS",
  "dmg": 44,
  "warhead": "flak",
  "range": 2.9,
  "reload": 1,
  "burst": 8,
  "burstDelay": 0.05,
  "acc": 0.71,
  "proj": "tracer",
  "speed": 940,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e80_nato_missileboat": {
  "name": "Eight RGM-84 Harpoon",
  "dmg": 196,
  "warhead": "he",
  "range": 12.7,
  "minRange": 1.8,
  "reload": 14.43,
  "burst": 2,
  "burstDelay": 0.9,
  "acc": 0.77,
  "proj": "missile",
  "speed": 120,
  "aoe": 1.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "skim",
  "intercept": 1
 },
 "w_e80_nato_ewair": {
  "name": "ALQ-99E jamming suite",
  "dmg": 155,
  "warhead": "he",
  "range": 9.6,
  "minRange": 1.4,
  "reload": 6.66,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 520,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.7
 },
 "w_e80_nato_sead": {
  "name": "AGM-88 HARM",
  "dmg": 155,
  "warhead": "he",
  "range": 9.6,
  "minRange": 1.4,
  "reload": 6.66,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 520,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.7
 },
 "w_e80_nato_stealthfighter": {
  "name": "Two 900 kg laser-guided bombs (GBU-10/GBU-",
  "dmg": 170,
  "warhead": "flak",
  "range": 10,
  "reload": 3.11,
  "burst": 1,
  "acc": 0.82,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e90_nato_rifle": {
  "name": "5.56mm M4 carbine",
  "dmg": 9,
  "warhead": "bullet",
  "range": 4.8,
  "reload": 1.17,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.68,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_nato_at": {
  "name": "127mm imaging-infrared fire-and-forget mis",
  "dmg": 112,
  "warhead": "heat",
  "range": 6.9,
  "minRange": 1.2,
  "reload": 5.51,
  "burst": 1,
  "acc": 0.81,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_nato_mbt": {
  "name": "120mm M256 smoothbore",
  "dmg": 136,
  "warhead": "cannon",
  "range": 7.7,
  "reload": 4.56,
  "burst": 1,
  "acc": 0.78,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_nato_lighttank": {
  "name": "76mm rifled gun",
  "dmg": 52,
  "warhead": "cannon",
  "range": 6.3,
  "reload": 3.29,
  "burst": 1,
  "acc": 0.73,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_nato_ifv": {
  "name": "25mm M242",
  "dmg": 19,
  "warhead": "bullet",
  "range": 6.1,
  "reload": 2.33,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.66,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_nato_spg": {
  "name": "155mm M284 39-calibre howitzer",
  "dmg": 129,
  "warhead": "frag",
  "range": 14.9,
  "minRange": 3.8,
  "reload": 9.01,
  "burst": 1,
  "acc": 0.32,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_nato_mlrs": {
  "name": "12 x 227mm rockets",
  "dmg": 60,
  "warhead": "frag",
  "range": 13.4,
  "minRange": 3.4,
  "reload": 14.84,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.21,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_nato_spaag": {
  "name": "Eight FIM-92 Stinger in two pods",
  "dmg": 22,
  "warhead": "flak",
  "range": 6.7,
  "reload": 1.8,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.58,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e90_nato_aa": {
  "name": "PAC-2 adds a blast-fragmentation warhead o",
  "dmg": 95,
  "warhead": "flak",
  "range": 7.5,
  "reload": 4.88,
  "burst": 1,
  "acc": 0.75,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_nato_recon": {
  "name": "12.7mm HMG",
  "dmg": 11,
  "warhead": "bullet",
  "range": 5.2,
  "reload": 1.7,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.62,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_nato_fighter": {
  "name": "AIM-120 AMRAAM",
  "dmg": 172,
  "warhead": "flak",
  "range": 9.1,
  "reload": 3.18,
  "burst": 1,
  "acc": 0.83,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e90_nato_cas": {
  "name": "LANTIRN navigation and targeting pods",
  "dmg": 284,
  "warhead": "he",
  "range": 2.5,
  "reload": 1.06,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.86,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_nato_gunship": {
  "name": "30mm M230",
  "dmg": 125,
  "warhead": "heat",
  "range": 6.3,
  "reload": 2.54,
  "burst": 1,
  "acc": 0.85,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_nato_corvette": {
  "name": "OTO 76mm Super Rapid",
  "dmg": 45,
  "warhead": "he",
  "range": 7.7,
  "reload": 1.27,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.7,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e90_nato_destroyer": {
  "name": "90-96 cell Mk 41 VLS with SM-2/ESSM/Tomaha",
  "dmg": 108,
  "warhead": "he",
  "range": 11,
  "reload": 3.82,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.75,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e90_nato_sub": {
  "name": "Eight 660mm torpedo tubes",
  "dmg": 327,
  "warhead": "he",
  "range": 10.1,
  "minRange": 1,
  "reload": 11.66,
  "burst": 2,
  "burstDelay": 1.2,
  "acc": 0.85,
  "proj": "torpedo",
  "speed": 8,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e90_nato_cruiser": {
  "name": "Mk 45 Mod 4 127mm",
  "dmg": 108,
  "warhead": "he",
  "range": 11,
  "reload": 3.82,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.75,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e90_nato_carrier": {
  "name": "Mk 15 Phalanx CIWS",
  "dmg": 52,
  "warhead": "flak",
  "range": 3.1,
  "reload": 0.95,
  "burst": 8,
  "burstDelay": 0.05,
  "acc": 0.75,
  "proj": "tracer",
  "speed": 940,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e90_nato_missileboat": {
  "name": "RGM-84 Harpoon",
  "dmg": 228,
  "warhead": "he",
  "range": 13.4,
  "minRange": 1.9,
  "reload": 13.78,
  "burst": 2,
  "burstDelay": 0.9,
  "acc": 0.81,
  "proj": "missile",
  "speed": 120,
  "aoe": 1.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "skim",
  "intercept": 1
 },
 "w_e90_nato_ewair": {
  "name": "AGM-88 HARM",
  "dmg": 181,
  "warhead": "he",
  "range": 10.1,
  "minRange": 1.4,
  "reload": 6.36,
  "burst": 1,
  "acc": 0.83,
  "proj": "missile",
  "speed": 520,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.7
 },
 "w_e90_nato_sead": {
  "name": "AGM-88 HARM",
  "dmg": 181,
  "warhead": "he",
  "range": 10.1,
  "minRange": 1.4,
  "reload": 6.36,
  "burst": 1,
  "acc": 0.83,
  "proj": "missile",
  "speed": 520,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.7
 },
 "w_e90_nato_stealthbomber": {
  "name": "Up to 18",
  "dmg": 447,
  "warhead": "he",
  "range": 2.9,
  "reload": 1.27,
  "burst": 2,
  "burstDelay": 0.4,
  "acc": 0.88,
  "proj": "bomb",
  "speed": 0,
  "aoe": 3.4,
  "suppress": 110,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_nato_stealthfighter": {
  "name": "AIM-260 (LO)",
  "dmg": 198,
  "warhead": "flak",
  "range": 10.6,
  "reload": 2.97,
  "burst": 1,
  "acc": 0.86,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e00_nato_rifle": {
  "name": "5.56mm rifle",
  "dmg": 10,
  "warhead": "bullet",
  "range": 5,
  "reload": 1.12,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.71,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_nato_at": {
  "name": "Javelin ATGM",
  "dmg": 124,
  "warhead": "heat",
  "range": 7.1,
  "minRange": 1.2,
  "reload": 5.3,
  "burst": 1,
  "acc": 0.84,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_nato_mbt": {
  "name": "120mm M256",
  "dmg": 150,
  "warhead": "cannon",
  "range": 7.9,
  "reload": 4.39,
  "burst": 1,
  "acc": 0.81,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_nato_lighttank": {
  "name": "105mm M68A2 in a low-profile autoloading t",
  "dmg": 57,
  "warhead": "cannon",
  "range": 6.5,
  "reload": 3.16,
  "burst": 1,
  "acc": 0.76,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_nato_ifv": {
  "name": "25mm M242 Bushmaster",
  "dmg": 21,
  "warhead": "bullet",
  "range": 6.3,
  "reload": 2.24,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.69,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_nato_spg": {
  "name": "155mm M284 39-calibre howitzer",
  "dmg": 143,
  "warhead": "frag",
  "range": 15.3,
  "minRange": 4,
  "reload": 8.67,
  "burst": 1,
  "acc": 0.33,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_nato_mlrs": {
  "name": "One six-round 227mm pod",
  "dmg": 67,
  "warhead": "frag",
  "range": 13.9,
  "minRange": 3.5,
  "reload": 14.28,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.22,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_nato_spaag": {
  "name": "35mm twin AA",
  "dmg": 25,
  "warhead": "flak",
  "range": 6.9,
  "reload": 1.73,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.61,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e00_nato_aa": {
  "name": "Hit-to-kill interceptor - no warhead",
  "dmg": 105,
  "warhead": "flak",
  "range": 7.7,
  "reload": 4.69,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_nato_recon": {
  "name": "M2 .50 cal",
  "dmg": 12,
  "warhead": "bullet",
  "range": 5.3,
  "reload": 1.63,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.65,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_nato_fighter": {
  "name": "AIM-120 AMRAAM and AIM-9 internally",
  "dmg": 190,
  "warhead": "flak",
  "range": 9.4,
  "reload": 3.06,
  "burst": 1,
  "acc": 0.86,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e00_nato_cas": {
  "name": "30mm GAU-8/A",
  "dmg": 314,
  "warhead": "he",
  "range": 2.6,
  "reload": 1.02,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.9,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_nato_gunship": {
  "name": "30mm M230",
  "dmg": 138,
  "warhead": "heat",
  "range": 6.5,
  "reload": 2.45,
  "burst": 1,
  "acc": 0.88,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_nato_corvette": {
  "name": "One 57mm Mk 110",
  "dmg": 49,
  "warhead": "he",
  "range": 7.9,
  "reload": 1.22,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.73,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e00_nato_destroyer": {
  "name": "Mk 45 Mod 4 127mm",
  "dmg": 119,
  "warhead": "he",
  "range": 11.4,
  "reload": 3.67,
  "burst": 2,
  "burstDelay": 0.45,
  "acc": 0.78,
  "proj": "shell",
  "speed": 720,
  "aoe": 0.9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e00_nato_sub": {
  "name": "Four 533mm tubes",
  "dmg": 361,
  "warhead": "he",
  "range": 10.4,
  "minRange": 1,
  "reload": 11.22,
  "burst": 2,
  "burstDelay": 1.2,
  "acc": 0.88,
  "proj": "torpedo",
  "speed": 8,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e00_nato_carrier": {
  "name": "Air wing of 75+ aircraft",
  "dmg": 57,
  "warhead": "flak",
  "range": 3.2,
  "reload": 0.92,
  "burst": 8,
  "burstDelay": 0.05,
  "acc": 0.78,
  "proj": "tracer",
  "speed": 940,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e00_nato_ewair": {
  "name": "ALQ-99",
  "dmg": 200,
  "warhead": "he",
  "range": 10.4,
  "minRange": 1.5,
  "reload": 6.12,
  "burst": 1,
  "acc": 0.86,
  "proj": "missile",
  "speed": 520,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.7
 },
 "w_e00_nato_sead": {
  "name": "AGM-88 HARM",
  "dmg": 200,
  "warhead": "he",
  "range": 10.4,
  "minRange": 1.5,
  "reload": 6.12,
  "burst": 1,
  "acc": 0.86,
  "proj": "missile",
  "speed": 520,
  "aoe": 1.4,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.7
 },
 "w_e00_nato_stealthfighter": {
  "name": "AIM-120",
  "dmg": 219,
  "warhead": "flak",
  "range": 10.9,
  "reload": 2.86,
  "burst": 1,
  "acc": 0.9,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e00_nato_aswhelo": {
  "name": "AN/AQS-22 ALFS dipping sonar",
  "dmg": 204,
  "warhead": "he",
  "range": 6.4,
  "reload": 7.14,
  "burst": 1,
  "acc": 0.86,
  "proj": "torpedo",
  "speed": 9,
  "aoe": 0.8,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 0,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e50_pact_rifle": {
  "name": "7.62x39mm AK-47",
  "dmg": 5,
  "warhead": "bullet",
  "range": 3.7,
  "reload": 1.41,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.52,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pact_at": {
  "name": "RPG-2 82mm shaped-charge launcher",
  "dmg": 55,
  "warhead": "heat",
  "range": 5.3,
  "minRange": 0.9,
  "reload": 6.66,
  "burst": 1,
  "acc": 0.62,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_pact_mbt": {
  "name": "100mm D-10TG rifled gun",
  "dmg": 69,
  "warhead": "cannon",
  "range": 6.1,
  "reload": 6.4,
  "burst": 1,
  "acc": 0.59,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pact_heavy": {
  "name": "122mm M-62-T2 rifled gun",
  "dmg": 69,
  "warhead": "cannon",
  "range": 6.1,
  "reload": 6.4,
  "burst": 1,
  "acc": 0.59,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pact_lighttank": {
  "name": "76.2mm D-56T gun",
  "dmg": 25,
  "warhead": "cannon",
  "range": 4.9,
  "reload": 3.97,
  "burst": 1,
  "acc": 0.56,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pact_ifv": {
  "name": "7.62mm SGMB or 12.7mm DShK pintle mount",
  "dmg": 9,
  "warhead": "bullet",
  "range": 4.7,
  "reload": 2.82,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.5,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pact_spg": {
  "name": "100mm D-10S in a fixed casemate",
  "dmg": 63,
  "warhead": "frag",
  "range": 11.5,
  "minRange": 3,
  "reload": 10.88,
  "burst": 1,
  "acc": 0.24,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pact_mlrs": {
  "name": "16 x 140mm M-14 spin-stabilised rockets",
  "dmg": 29,
  "warhead": "frag",
  "range": 10.4,
  "minRange": 2.6,
  "reload": 17.92,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.16,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pact_spaag": {
  "name": "Twin 57mm S-68 autocannon",
  "dmg": 11,
  "warhead": "flak",
  "range": 5.2,
  "reload": 2.18,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.45,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e50_pact_aa": {
  "name": "Quad 14.5mm KPV on towed carriage",
  "dmg": 46,
  "warhead": "flak",
  "range": 5.8,
  "reload": 5.89,
  "burst": 1,
  "acc": 0.58,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e50_pact_recon": {
  "name": "7.62mm SGMB or 12.7mm DShKM",
  "dmg": 5,
  "warhead": "bullet",
  "range": 4,
  "reload": 2.05,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.48,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pact_fighter": {
  "name": "1 x 37mm N-37",
  "dmg": 84,
  "warhead": "flak",
  "range": 7,
  "reload": 3.84,
  "burst": 1,
  "acc": 0.63,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e50_pact_cas": {
  "name": "4 x 23mm NR-23",
  "dmg": 139,
  "warhead": "he",
  "range": 1.9,
  "reload": 1.28,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.66,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e50_pact_corvette": {
  "name": "3 x 100mm B-34",
  "dmg": 22,
  "warhead": "he",
  "range": 5.9,
  "reload": 1.54,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.53,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e50_pact_destroyer": {
  "name": "4 x 130mm SM-2-1 in twin mounts",
  "dmg": 63,
  "warhead": "he",
  "range": 7.5,
  "reload": 5.89,
  "burst": 4,
  "burstDelay": 0.3,
  "acc": 0.49,
  "proj": "shell",
  "speed": 700,
  "aoe": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e50_pact_cruiser": {
  "name": "12 x 152mm B-38 in four triple turrets",
  "dmg": 63,
  "warhead": "he",
  "range": 7.5,
  "reload": 5.89,
  "burst": 4,
  "burstDelay": 0.3,
  "acc": 0.49,
  "proj": "shell",
  "speed": 700,
  "aoe": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e50_pact_sub": {
  "name": "6 x 533mm torpedo tubes",
  "dmg": 147,
  "warhead": "he",
  "range": 6.7,
  "minRange": 0.7,
  "reload": 16.64,
  "burst": 2,
  "burstDelay": 1.4,
  "acc": 0.56,
  "proj": "torpedo",
  "speed": 7.5,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e60_pact_rifle": {
  "name": "7.62x39mm AKM",
  "dmg": 6,
  "warhead": "bullet",
  "range": 4.1,
  "reload": 1.32,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.58,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pact_at": {
  "name": "9M14 MCLOS wire-guided ATGM",
  "dmg": 73,
  "warhead": "heat",
  "range": 5.9,
  "minRange": 1,
  "reload": 6.24,
  "burst": 1,
  "acc": 0.69,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_pact_mbt": {
  "name": "115mm U-5TS smoothbore firing APFSDS",
  "dmg": 92,
  "warhead": "cannon",
  "range": 6.7,
  "reload": 6,
  "burst": 1,
  "acc": 0.66,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pact_lighttank": {
  "name": "76.2mm D-56TS stabilised gun",
  "dmg": 34,
  "warhead": "cannon",
  "range": 5.4,
  "reload": 3.72,
  "burst": 1,
  "acc": 0.62,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pact_ifv": {
  "name": "73mm 2A28 Grom low-pressure gun",
  "dmg": 12,
  "warhead": "bullet",
  "range": 5.2,
  "reload": 2.64,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.56,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pact_spg": {
  "name": "152mm 2A33 (D-22) howitzer",
  "dmg": 84,
  "warhead": "frag",
  "range": 12.7,
  "minRange": 3.3,
  "reload": 10.2,
  "burst": 1,
  "acc": 0.27,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pact_mlrs": {
  "name": "40 x 122mm rockets",
  "dmg": 39,
  "warhead": "frag",
  "range": 11.5,
  "minRange": 2.9,
  "reload": 16.8,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.18,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pact_spaag": {
  "name": "Quad 23mm AZP-23 with RPK-2 Tobol gun-layi",
  "dmg": 15,
  "warhead": "flak",
  "range": 5.7,
  "reload": 2.04,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.5,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e60_pact_aa": {
  "name": "9M32 uncooled IR-homing SAM",
  "dmg": 62,
  "warhead": "flak",
  "range": 6.4,
  "reload": 5.52,
  "burst": 1,
  "acc": 0.64,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_pact_recon": {
  "name": "14.5mm KPVT and 7.62mm PKT in a small turr",
  "dmg": 7,
  "warhead": "bullet",
  "range": 4.4,
  "reload": 1.92,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.53,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pact_fighter": {
  "name": "23mm GSh-23 and 2-4 x R-3S/R-60 IR missile",
  "dmg": 112,
  "warhead": "flak",
  "range": 7.8,
  "reload": 3.6,
  "burst": 1,
  "acc": 0.7,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e60_pact_cas": {
  "name": "2 x 30mm NR-30",
  "dmg": 185,
  "warhead": "he",
  "range": 2.1,
  "reload": 1.2,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.74,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e60_pact_gunship": {
  "name": "12.7mm YakB-12.7 gatling",
  "dmg": 81,
  "warhead": "heat",
  "range": 5.4,
  "reload": 2.88,
  "burst": 1,
  "acc": 0.72,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e60_pact_corvette": {
  "name": "2 x twin 57mm AK-725",
  "dmg": 29,
  "warhead": "he",
  "range": 6.6,
  "reload": 1.44,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.59,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e60_pact_destroyer": {
  "name": "2 x twin 76mm AK-726",
  "dmg": 84,
  "warhead": "he",
  "range": 8.4,
  "reload": 5.52,
  "burst": 4,
  "burstDelay": 0.3,
  "acc": 0.54,
  "proj": "shell",
  "speed": 700,
  "aoe": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e60_pact_cruiser": {
  "name": "8 x P-35 anti-ship missiles in two quad la",
  "dmg": 84,
  "warhead": "he",
  "range": 8.4,
  "reload": 5.52,
  "burst": 4,
  "burstDelay": 0.3,
  "acc": 0.54,
  "proj": "shell",
  "speed": 700,
  "aoe": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e60_pact_missileboat": {
  "name": "4 x P-15 Termit SSM",
  "dmg": 179,
  "warhead": "he",
  "range": 12.3,
  "minRange": 2.1,
  "reload": 22.8,
  "burst": 1,
  "acc": 0.59,
  "proj": "missile",
  "speed": 330,
  "aoe": 1.7,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "loft",
  "intercept": 0.45
 },
 "w_e60_pact_sub": {
  "name": "10 x 533mm torpedo tubes",
  "dmg": 196,
  "warhead": "he",
  "range": 7.4,
  "minRange": 0.8,
  "reload": 15.6,
  "burst": 2,
  "burstDelay": 1.4,
  "acc": 0.62,
  "proj": "torpedo",
  "speed": 7.5,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e60_pact_carrier": {
  "name": "14 x Ka-25 ASW helicopters",
  "dmg": 92,
  "warhead": "he",
  "range": 9,
  "reload": 6,
  "burst": 1,
  "acc": 0.58,
  "proj": "missile",
  "speed": 520,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile",
  "profile": "pop",
  "intercept": 0.85
 },
 "w_e60_pact_sead": {
  "name": "Kh-28 anti-radiation missile",
  "dmg": 129,
  "warhead": "he",
  "range": 8.2,
  "minRange": 1.2,
  "reload": 7.92,
  "burst": 1,
  "acc": 0.67,
  "proj": "missile",
  "speed": 560,
  "aoe": 1.5,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.8
 },
 "w_e80_pact_rifle": {
  "name": "5.45x39mm AK-74 / AKS-74",
  "dmg": 8,
  "warhead": "bullet",
  "range": 4.6,
  "reload": 1.22,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.64,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pact_at": {
  "name": "9M113 SACLOS wire-guided ATGM",
  "dmg": 96,
  "warhead": "heat",
  "range": 6.6,
  "minRange": 1.1,
  "reload": 5.77,
  "burst": 1,
  "acc": 0.77,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_pact_mbt": {
  "name": "125mm 2A46M-1 with 9K119 Refleks gun-launc",
  "dmg": 122,
  "warhead": "cannon",
  "range": 7.5,
  "reload": 5.55,
  "burst": 1,
  "acc": 0.73,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pact_lighttank": {
  "name": "30mm 2A42 autocannon",
  "dmg": 44,
  "warhead": "cannon",
  "range": 6,
  "reload": 3.44,
  "burst": 1,
  "acc": 0.69,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pact_ifv": {
  "name": "30mm 2A42 autocannon",
  "dmg": 16,
  "warhead": "bullet",
  "range": 5.8,
  "reload": 2.44,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.62,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pact_spg": {
  "name": "152mm 2A64",
  "dmg": 111,
  "warhead": "frag",
  "range": 14.1,
  "minRange": 3.6,
  "reload": 9.43,
  "burst": 1,
  "acc": 0.3,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pact_mlrs": {
  "name": "12 x 300mm 9M55 rockets",
  "dmg": 52,
  "warhead": "frag",
  "range": 12.7,
  "minRange": 3.2,
  "reload": 15.54,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.2,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pact_spaag": {
  "name": "Twin 30mm 2A38 plus 8 x 9M311 SACLOS SAM",
  "dmg": 19,
  "warhead": "flak",
  "range": 6.4,
  "reload": 1.89,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.55,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e80_pact_aa": {
  "name": "9M39 cooled dual-band IR-homing SAM",
  "dmg": 81,
  "warhead": "flak",
  "range": 7.1,
  "reload": 5.11,
  "burst": 1,
  "acc": 0.71,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_pact_recon": {
  "name": "14.5mm KPVT and 7.62mm PKT",
  "dmg": 10,
  "warhead": "bullet",
  "range": 4.9,
  "reload": 1.78,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.59,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pact_fighter": {
  "name": "30mm GSh-30-1",
  "dmg": 148,
  "warhead": "flak",
  "range": 8.6,
  "reload": 3.33,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e80_pact_cas": {
  "name": "30mm GSh-30-2",
  "dmg": 244,
  "warhead": "he",
  "range": 2.4,
  "reload": 1.11,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.82,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pact_gunship": {
  "name": "12.7mm YakB-12.7",
  "dmg": 107,
  "warhead": "heat",
  "range": 6,
  "reload": 2.66,
  "burst": 1,
  "acc": 0.8,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e80_pact_corvette": {
  "name": "6 x P-120 Malakhit SSM",
  "dmg": 38,
  "warhead": "he",
  "range": 7.3,
  "reload": 1.33,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.66,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e80_pact_missileboat": {
  "name": "4 x P-15 or P-270 Moskit SSM",
  "dmg": 237,
  "warhead": "he",
  "range": 13.7,
  "minRange": 2.3,
  "reload": 21.09,
  "burst": 1,
  "acc": 0.66,
  "proj": "missile",
  "speed": 330,
  "aoe": 1.7,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "loft",
  "intercept": 0.45
 },
 "w_e80_pact_destroyer": {
  "name": "8 x P-270 Moskit SSM",
  "dmg": 111,
  "warhead": "he",
  "range": 9.3,
  "reload": 5.11,
  "burst": 4,
  "burstDelay": 0.3,
  "acc": 0.61,
  "proj": "shell",
  "speed": 700,
  "aoe": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e80_pact_cruiser": {
  "name": "16 x P-500 Bazalt SSM in fixed deck pairs",
  "dmg": 111,
  "warhead": "he",
  "range": 9.3,
  "reload": 5.11,
  "burst": 4,
  "burstDelay": 0.3,
  "acc": 0.61,
  "proj": "shell",
  "speed": 700,
  "aoe": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e80_pact_sub": {
  "name": "6 x 533mm torpedo tubes",
  "dmg": 259,
  "warhead": "he",
  "range": 8.2,
  "minRange": 0.9,
  "reload": 14.43,
  "burst": 2,
  "burstDelay": 1.4,
  "acc": 0.69,
  "proj": "torpedo",
  "speed": 7.5,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e80_pact_aswhelo": {
  "name": "Dipping sonar",
  "dmg": 126,
  "warhead": "he",
  "range": 3.3,
  "reload": 6.66,
  "burst": 6,
  "burstDelay": 0.18,
  "acc": 0.41,
  "proj": "arc",
  "speed": 12,
  "aoe": 1.4,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 0,
   "sub": 1
  },
  "sfx": "cannon"
 },
 "w_e80_pact_sead": {
  "name": "4 x Kh-58 anti-radiation missiles",
  "dmg": 170,
  "warhead": "he",
  "range": 9.1,
  "minRange": 1.4,
  "reload": 7.33,
  "burst": 1,
  "acc": 0.75,
  "proj": "missile",
  "speed": 560,
  "aoe": 1.5,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.8
 },
 "w_e80_pact_stealthbomber": {
  "name": "12 x Kh-55 cruise missiles in two rotary l",
  "dmg": 385,
  "warhead": "he",
  "range": 2.7,
  "reload": 1.33,
  "burst": 2,
  "burstDelay": 0.4,
  "acc": 0.84,
  "proj": "bomb",
  "speed": 0,
  "aoe": 3.4,
  "suppress": 110,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e80_pact_stealthfighter": {
  "name": "n/a",
  "dmg": 170,
  "warhead": "flak",
  "range": 10,
  "reload": 3.11,
  "burst": 1,
  "acc": 0.82,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e90_pact_rifle": {
  "name": "5.45x39mm AK-74M",
  "dmg": 9,
  "warhead": "bullet",
  "range": 4.8,
  "reload": 1.17,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.68,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pact_at": {
  "name": "9M133 laser beam-riding ATGM",
  "dmg": 112,
  "warhead": "heat",
  "range": 6.9,
  "minRange": 1.2,
  "reload": 5.51,
  "burst": 1,
  "acc": 0.81,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_pact_mbt": {
  "name": "125mm 2A46M",
  "dmg": 142,
  "warhead": "cannon",
  "range": 7.9,
  "reload": 5.3,
  "burst": 1,
  "acc": 0.77,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pact_lighttank": {
  "name": "30mm 2A42",
  "dmg": 52,
  "warhead": "cannon",
  "range": 6.3,
  "reload": 3.29,
  "burst": 1,
  "acc": 0.73,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pact_ifv": {
  "name": "100mm 2A70",
  "dmg": 19,
  "warhead": "bullet",
  "range": 6.1,
  "reload": 2.33,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.66,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pact_spg": {
  "name": "152mm 2A64",
  "dmg": 129,
  "warhead": "frag",
  "range": 14.9,
  "minRange": 3.8,
  "reload": 9.01,
  "burst": 1,
  "acc": 0.32,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pact_mlrs": {
  "name": "12 x 300mm 9M55 rockets",
  "dmg": 60,
  "warhead": "frag",
  "range": 13.4,
  "minRange": 3.4,
  "reload": 14.84,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.21,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pact_spaag": {
  "name": "Twin 30mm 2A38M",
  "dmg": 22,
  "warhead": "flak",
  "range": 6.7,
  "reload": 1.8,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.58,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e90_pact_aa": {
  "name": "9M39 cooled IR-homing SAM",
  "dmg": 95,
  "warhead": "flak",
  "range": 7.5,
  "reload": 4.88,
  "burst": 1,
  "acc": 0.75,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_pact_recon": {
  "name": "14.5mm KPVT and 7.62mm PKT",
  "dmg": 11,
  "warhead": "bullet",
  "range": 5.2,
  "reload": 1.7,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.62,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pact_fighter": {
  "name": "30mm GSh-30-1",
  "dmg": 172,
  "warhead": "flak",
  "range": 9.1,
  "reload": 3.18,
  "burst": 1,
  "acc": 0.83,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e90_pact_cas": {
  "name": "30mm GSh-30-2",
  "dmg": 284,
  "warhead": "he",
  "range": 2.5,
  "reload": 1.06,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.86,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e90_pact_gunship": {
  "name": "30mm 2A42",
  "dmg": 125,
  "warhead": "heat",
  "range": 6.3,
  "reload": 2.54,
  "burst": 1,
  "acc": 0.85,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e90_pact_corvette": {
  "name": "76mm AK-176",
  "dmg": 45,
  "warhead": "he",
  "range": 7.7,
  "reload": 1.27,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.7,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e90_pact_destroyer": {
  "name": "8 x P-270 Moskit",
  "dmg": 129,
  "warhead": "he",
  "range": 9.8,
  "reload": 4.88,
  "burst": 4,
  "burstDelay": 0.3,
  "acc": 0.64,
  "proj": "shell",
  "speed": 700,
  "aoe": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e90_pact_cruiser": {
  "name": "20 x P-700 Granit",
  "dmg": 129,
  "warhead": "he",
  "range": 9.8,
  "reload": 4.88,
  "burst": 4,
  "burstDelay": 0.3,
  "acc": 0.64,
  "proj": "shell",
  "speed": 700,
  "aoe": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e90_pact_sub": {
  "name": "6 x 533mm torpedo tubes",
  "dmg": 301,
  "warhead": "he",
  "range": 8.6,
  "minRange": 1,
  "reload": 13.78,
  "burst": 2,
  "burstDelay": 1.4,
  "acc": 0.73,
  "proj": "torpedo",
  "speed": 7.5,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
  /* ---- the systems the inverted masks had been standing in for ----
     Each of these hulls carried exactly ONE weapon, and that weapon's target
     mask was doing a job it was never named for: Granit was the Kuznetsov's
     "air defence", an ASW air group was the Moskva's, and a rocket mortar was
     the Grisha's gun. Correcting the masks leaves a real hole in each ship, so
     the system that actually filled it goes in beside it. */
  "sam_kinzhal": { "name": "3K95 Kinzhal (SA-N-9)", "dmg": 96, "warhead": "flak",
    "range": 8.2, "reload": 2.6, "burst": 2, "burstDelay": 0.4, "acc": 0.74,
    "proj": "missile", "speed": 640, "profile": "pop", "intercept": 0.9,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },
  "sam_shtorm": { "name": "M-11 Shtorm (SA-N-3)", "dmg": 104, "warhead": "flak",
    "range": 7.4, "reload": 6.2, "burst": 1, "acc": 0.55,
    "proj": "missile", "speed": 600, "profile": "pop", "intercept": 0.72,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },
  "sam_volna": { "name": "2 x M-1 Volna (SA-N-1)", "dmg": 88, "warhead": "flak",
    "range": 7.0, "reload": 6.8, "burst": 1, "acc": 0.50,
    "proj": "missile", "speed": 600, "profile": "pop", "intercept": 0.66,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* ---- AREA AIR DEFENCE AT SEA, THE WESTERN AND ASIAN HALF ----
     combat.js areaSam() counts a weapon only when tgt.air && proj === "missile".
     MEASURED before this block: of 140 era-roster surface hulls from e50 to e00,
     exactly FIVE passed - four of them the Soviet rows corrected above, and the
     fifth only because the Kiev's anti-ship missile was itself masked as a SAM,
     which is the bug fixed in the same pass. Every other hull carried one
     weapon and every one of those was proj "shell", including four whose weapon
     was NAMED after its missile launcher and still could not shoot up. These
     are the systems those names had been standing in for. */

  /* Sea Dart GWS.30: twin-arm Mk 30, 22 rounds on a Type 42, semi-active
     homing on a ramjet sustainer, about 40 nmi and 60,000 ft. HMS Sheffield
     took it to sea in February 1975 and HMS Edinburgh paid it off on 6 June
     2013 - thirty-eight years. It scored the largest share of the British
     missile kills of 1982 and was poor low and inshore, which is how Coventry
     was lost on 25 May; that weakness lives in acc and intercept, not in a
     shorter range. */
  "sam_seadart": { "name": "Sea Dart GWS.30", "dmg": 175, "warhead": "flak",
    "range": 11.6, "reload": 6.0, "burst": 1, "acc": 0.80,
    "proj": "missile", "speed": 700, "profile": "pop", "intercept": 0.74,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* RIM-66 SM-2MR: the Aegis round, distinct from the e20 sam_sm2 which is an
     SM-2/SM-6 stand-in. USS Ticonderoga commissioned 22 January 1983 with two
     Mk 26 twin arms and 68 rounds; CG-52 Bunker Hill took 122 Mk 41 cells in
     1986; DDG-51 took 90 on 4 July 1991. Block IIIA reaches about 90 nmi at
     Mach 3.5. The mid-course inertial update is the whole Aegis argument: one
     illuminator can service many missiles, so burst is 2 rather than 1. */
  "sam_sm2mr": { "name": "RIM-66 SM-2MR Block III", "dmg": 178, "warhead": "flak",
    "range": 13.2, "reload": 3.8, "burst": 2, "burstDelay": 0.5, "acc": 0.86,
    "proj": "missile", "speed": 1000, "profile": "pop", "intercept": 0.80,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* RIM-7M NATO Sea Sparrow, about 19 km: the most widely fitted Western
     shipboard SAM there has ever been, and self-defence rather than area
     cover - it protects the ship it is on and very little else, which is why
     its range sits between RAM and SM-1 rather than near them. */
  "sam_seasparrow": { "name": "RIM-7M NATO Sea Sparrow", "dmg": 140, "warhead": "flak",
    "range": 6.4, "reload": 3.0, "burst": 2, "burstDelay": 0.4, "acc": 0.80,
    "proj": "missile", "speed": 850, "profile": "pop", "intercept": 0.78,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* MM38 Exocet, in service 1974, about 42 km on a solid rocket. ssm_exocet is
     the MM40 Block 3 of 2008 at 180 km on a turbojet, and putting that id on a
     1990s hull would repeat the exact defect this pass exists to remove. Same
     family, same launcher, four times the reach - they are not interchangeable. */
  "ssm_exocet38": { "name": "MM38 Exocet", "dmg": 235, "warhead": "he",
    "range": 9.6, "reload": 14.0, "burst": 1, "acc": 0.80,
    "proj": "missile", "speed": 315, "aoe": 1.4, "sfx": "missile",
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } , "profile": "skim", "intercept": 0.95 },

  /* 100mm Mle 1968 CADAM: 78 rounds a minute out of a single automatic turret,
     17.5 km surface and genuinely dual-purpose, on every French escort from the
     T 47 conversions to the La Fayette. The NAVGUN loop in generations.js has
     no fra row on purpose, so a French hull that needs this gun must name it. */
  "navgun_100_fr": { "name": "100mm Mle 1968 CADAM", "dmg": 74, "warhead": "he",
    "range": 8.6, "reload": 1.35, "burst": 3, "burstDelay": 0.24, "acc": 0.76,
    "proj": "shell", "speed": 870, "aoe": 0.6, "sfx": "cannon",
    /* genuinely dual-purpose, and tgt.air was 1 here for that reason - but the
       warhead is "he" and CFG.DMG.he.air is 0.00, so the mount acquired
       aircraft it could not scratch and stopped shooting at ships it could.
       The AA half of a dual-purpose gun is a separate flak row in this engine;
       every French hull carrying this gun has one. */
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* ============================================================
     SHIPBOARD AIR DEFENCE: THE REMAINING THIRTY-FOUR HULLS
     ============================================================
     The pass above corrected the six hulls its audit files named. Sweeping
     every surface combatant afterwards showed the defect is far wider: of 58
     hulls whose ROLE is destroyer, cruiser, frigate or air-defence ship,
     THIRTY-FOUR could not engage an aircraft at all - among them a Slava with
     her S-300F, a Sovremenny with her SA-N-7, and the Pyotr Velikiy, which
     carries the heaviest air-defence battery ever put to sea. Each of those
     hulls held exactly one weapon row and that row was its anti-ship mount.

     TWO MECHANISMS, AND THE CHOICE BETWEEN THEM IS NOT COSMETIC.

     First, combat.js areaSam() counts a weapon only when tgt.air and
     proj === "missile". So a MISSILE row makes the ship an umbrella over the
     force around her - which is what a Tartar, Masurca or Fort ship was - and
     a GUN row lets her defend only herself, which is what a Bofors crew
     actually did. Every hull below gets whichever one it really had.

     Second, and this is the trap: CFG.DMG scores the "air" armour class at
     0.00 against "he", "frag", "cannon" and "nuclear". A gun row masked
     tgt.air with an HE warhead does not model a dual-purpose gun - it models
     a gun that acquires aircraft, fires, and cannot scratch them, while
     ignoring the surface threat it could actually hit. entities.js:449
     records the same trap being sprung once before. So every air-capable row
     here carries warhead "flak", exactly as rules.js `spaag` and `aa_battery`
     do, and the dual-purpose main guns keep "he" with tgt.air 0. */

  /* ---- MISSILE SYSTEMS: these ships screen the force ---- */

  /* RIM-24 Tartar on the Mk 11 twin and Mk 13 single arm, about 16 km, and
     notoriously unreliable until the 1970s Tartar Reliability Improvement
     Program - which is where acc and intercept sit. USS Charles F. Adams
     (DDG-2) commissioned 10 September 1960; the German Lutjens (D185) on
     22 March 1969 to the same design, so one row serving both is the fact
     and not a shortcut. */
  "sam_tartar": { "name": "RIM-24 Tartar", "dmg": 96, "warhead": "flak",
    "range": 6.2, "reload": 6.4, "burst": 1, "acc": 0.55,
    "proj": "missile", "speed": 620, "profile": "pop", "intercept": 0.64,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* RIM-2 Terrier on two Mk 10 twin arms and RIM-8 Talos on one Mk 12: the
     fit USS Long Beach (CGN-9) commissioned with on 9 September 1961. Talos
     reached about 180 km and Terrier about 40; the pair is modelled at the
     reach a force would plan around, because a ship with two rails of a
     180 km round is not a 180 km umbrella. Long Beach was built with no gun
     battery at all - two 5in/38 were added in 1962 after Kennedy reportedly
     objected - so this row and that gun are the entire ship. */
  "sam_terrier": { "name": "RIM-2 Terrier and RIM-8 Talos", "dmg": 134, "warhead": "flak",
    "range": 9.8, "reload": 7.2, "burst": 1, "acc": 0.62,
    "proj": "missile", "speed": 700, "profile": "pop", "intercept": 0.60,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* Sea Slug GWS.1 on the County class, HMS Devonshire (D02), 2 November
     1962. A beam rider with four wrap-round boosters, about 27 km, built
     against high-level bombers and unable to work a low target - the weakness
     lives in acc and intercept, not in a shorter range. */
  "sam_seaslug": { "name": "Sea Slug GWS.1", "dmg": 104, "warhead": "flak",
    "range": 7.2, "reload": 7.6, "burst": 1, "acc": 0.42,
    "proj": "missile", "speed": 540, "profile": "pop", "intercept": 0.48,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* Masurca Mk 2 Mod 3, semi-active, about 40 km, 48 rounds. Suffren (D602)
     commissioned 20 July 1967 as France's first purpose-built AAW escort, and
     Colbert took the same system aft in her 1970-72 rebuild. */
  "sam_masurca": { "name": "Masurca Mk 2 Mod 3", "dmg": 126, "warhead": "flak",
    "range": 8.4, "reload": 6.2, "burst": 1, "acc": 0.66,
    "proj": "missile", "speed": 660, "profile": "pop", "intercept": 0.66,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* 3S90 M-22 Uragan, SA-N-7 Gadfly: two single-rail launchers and 44 rounds
     on a Project 956, about 25 km. The naval Buk, and the reason a Sovremenny
     screens the force rather than only herself. */
  "sam_uragan": { "name": "3S90 M-22 Uragan (SA-N-7)", "dmg": 118, "warhead": "flak",
    "range": 7.2, "reload": 4.6, "burst": 1, "acc": 0.70,
    "proj": "missile", "speed": 830, "profile": "pop", "intercept": 0.72,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* S-300F Fort, SA-N-6 Grumble: eight B-204 revolver launchers under the
     deck, 64 rounds, about 75 km - the first vertically launched naval SAM
     anywhere, six years before Mk 41 went to sea. Without it a Slava is a
     missile barge; with it she is the centre of a Soviet surface action
     group, which is the entire design of the class. */
  "sam_fort": { "name": "S-300F Fort (SA-N-6)", "dmg": 168, "warhead": "flak",
    "range": 11.6, "reload": 4.4, "burst": 1, "acc": 0.78,
    "proj": "missile", "speed": 950, "profile": "pop", "intercept": 0.76,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* S-300FM Fort-M, SA-N-20: the Pyotr Velikiy's forward battery, about
     150 km, with 48 rounds of the older Fort aft and 128 Kinzhal besides. She
     carries more air defence than any other ship afloat and could not reach
     an aircraft at any range at all. */
  "sam_fortm": { "name": "S-300FM Fort-M (SA-N-20)", "dmg": 196, "warhead": "flak",
    "range": 13.0, "reload": 4.0, "burst": 1, "acc": 0.82,
    "proj": "missile", "speed": 1100, "profile": "pop", "intercept": 0.80,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* Crotale EDIR navalised, about 13 km, on Tourville from 1979. Point
     defence: it covers the ship and a little water around her. */
  "sam_crotale_n": { "name": "Crotale EDIR naval", "dmg": 92, "warhead": "flak",
    "range": 5.4, "reload": 3.4, "burst": 2, "burstDelay": 0.4, "acc": 0.72,
    "proj": "missile", "speed": 750, "profile": "pop", "intercept": 0.80,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* HQ-7 on the octuple launcher, the Chinese Crotale, about 13 km. Type 052
     Luhu (DDG-112 Harbin, 1994) was the first Chinese destroyer with any
     surface-to-air missile whatsoever - the game was right about the Ludas
     having none and wrong about the Luhu. */
  "sam_hq7": { "name": "HQ-7 octuple launcher", "dmg": 88, "warhead": "flak",
    "range": 5.4, "reload": 3.6, "burst": 2, "burstDelay": 0.4, "acc": 0.68,
    "proj": "missile", "speed": 730, "profile": "pop", "intercept": 0.76,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* ---- GUN AIR DEFENCE: proj "shell", so areaSam() never counts these and
     the ship defends herself alone. That is the correct answer - a Bofors
     crew protected their own quarterdeck and nobody else's. Each row is the
     ship's REAL anti-aircraft battery, which on these hulls is a different
     set of barrels from the main armament the surface row already names. ---- */

  /* The USN/RN/ROC pattern of the period: five-inch thirty-eights on VT-fuzed
     rounds with 3in/50 alongside. Des Moines carried twelve and twenty; the
     Gearings, Tan Yang and the ex-USS Anthony that became the German Z-1 all
     carried the same guns in smaller numbers. */
  "aagun_5in38": { "name": "5in/38 and 3in/50 on VT fuzes", "dmg": 40, "warhead": "flak",
    "range": 5.6, "reload": 1.6, "burst": 4, "burstDelay": 0.1, "acc": 0.58,
    "proj": "shell", "speed": 820, "aoe": 0.5, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* 127mm/54 Mk 42: 40 rounds a minute to 85 degrees, the standard American
     destroyer gun from the Forrest Shermans onward, and a real AA mount as
     well as a surface one. The surface row keeps the HE; this is the same
     barrels firing proximity-fuzed. */
  "aagun_dp127": { "name": "127mm/54 Mk 42, proximity-fuzed", "dmg": 44, "warhead": "flak",
    "range": 5.8, "reload": 1.5, "burst": 4, "burstDelay": 0.1, "acc": 0.60,
    "proj": "shell", "speed": 840, "aoe": 0.5, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* Twin 4.5in Mk 6 with 40mm Bofors: the Daring class of 1952 and the County
     class that carried Sea Slug a decade later. */
  "aagun_rn45": { "name": "Twin 4.5in Mk 6 and 40mm Bofors", "dmg": 38, "warhead": "flak",
    "range": 5.0, "reload": 1.6, "burst": 4, "burstDelay": 0.1, "acc": 0.55,
    "proj": "shell", "speed": 820, "aoe": 0.45, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* HMS Swiftsure, completed 1944: the triple 6in Mk XXIII stop at 45 degrees,
     so her air battery is the twin 4in Mk XVI and the Bofors. Wartime kit
     against 1950s jets, and rated accordingly. */
  "aagun_bofors": { "name": "40mm Bofors and twin 4in Mk XVI", "dmg": 30, "warhead": "flak",
    "range": 3.6, "reload": 1.4, "burst": 5, "burstDelay": 0.09, "acc": 0.44,
    "proj": "shell", "speed": 880, "aoe": 0.4, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* Three twin 3in/70 Mk 6 on HMS Tiger: fully automatic, radar-directed, and
     the best medium anti-aircraft gun the Royal Navy ever fielded - when it
     worked, which her own description in this file is candid about. */
  "aagun_rn3in70": { "name": "Twin 3in/70 Mk 6, radar-directed", "dmg": 42, "warhead": "flak",
    "range": 5.2, "reload": 1.3, "burst": 5, "burstDelay": 0.09, "acc": 0.64,
    "proj": "shell", "speed": 900, "aoe": 0.45, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* De Grasse and Colbert as built are ANTI-AIRCRAFT CRUISERS - sixteen
     127mm/54 Mle 1948 in eight twin turrets and twenty 57mm Mle 1951, and the
     whole ship is this battery. De Grasse's own description in this file says
     so. Both were carrying an American 8in row. */
  "aagun_fr57": { "name": "Sixteen 127mm/54 and twenty 57mm Mle 1951", "dmg": 46, "warhead": "flak",
    "range": 5.8, "reload": 1.3, "burst": 5, "burstDelay": 0.09, "acc": 0.62,
    "proj": "shell", "speed": 870, "aoe": 0.5, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* Soviet post-war close-in AA: 37mm V-11M by the dozen, 45mm SM-20-ZIF on
     the Kotlins, 100mm SM-5-1 on a Sverdlov. Numerous, and optically directed
     for most of its life. The 152mm B-38 and the 130mm B-13 that the surface
     rows name both stop near 45 degrees and are not part of this. */
  "aagun_v11": { "name": "37mm V-11M and 45mm SM-20 automatic", "dmg": 34, "warhead": "flak",
    "range": 4.2, "reload": 1.5, "burst": 5, "burstDelay": 0.09, "acc": 0.48,
    "proj": "shell", "speed": 850, "aoe": 0.45, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* The Luda's close-in battery: 57mm Type 66 and 37mm Type 76 twins, which
     is what a Type 051 had instead of a surface-to-air missile for its whole
     career. */
  "aagun_pla57": { "name": "57mm Type 66 and 37mm Type 76", "dmg": 32, "warhead": "flak",
    "range": 3.8, "reload": 1.5, "burst": 5, "burstDelay": 0.09, "acc": 0.50,
    "proj": "shell", "speed": 850, "aoe": 0.4, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* ---- CORVETTE AND LIGHT-CRAFT AIR DEFENCE ----
     Twenty-four corvette gun rows were masked tgt.air with an HE warhead,
     which CFG.DMG scores at 0.00 against an aircraft: they fired and could
     not scratch anything, while ignoring the ship they could have hit. The
     mask came off in the same pass that found it, which cost nothing that
     worked - but most of these ships really did carry a point-defence
     missile or a proper anti-aircraft gun, and this is that fit. A corvette
     is the hull most likely to be caught alone by aircraft, so getting this
     wrong in the other direction matters too. */

  /* 4K33 Osa-M, SA-N-4 Gecko: a twin launcher on a retractable trainable
     mount that rises out of a well in the deck, 20 rounds, about 15 km. The
     standard Soviet point-defence missile from the late 1960s on, and what a
     Nanuchka carried beside her Malakhits. */
  "sam_osa": { "name": "4K33 Osa-M (SA-N-4)", "dmg": 98, "warhead": "flak",
    "range": 6.0, "reload": 5.2, "burst": 1, "acc": 0.62,
    "proj": "missile", "speed": 600, "profile": "pop", "intercept": 0.70,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* HQ-10 / FL-3000N: a 24-cell box of small IR/passive-RF rounds, about
     9 km, the Chinese answer to RAM. Type 056 carries one aft. */
  "sam_hq10": { "name": "HQ-10 (FL-3000N)", "dmg": 104, "warhead": "flak",
    "range": 4.2, "reload": 1.9, "burst": 2, "burstDelay": 0.3, "acc": 0.84,
    "proj": "missile", "speed": 660, "profile": "pop", "intercept": 0.74,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* 57mm AK-725 twin: a dedicated water-cooled anti-aircraft mount, radar
     directed, on everything Soviet from a Petya to a Kashin. The corvette row
     that names it was masked as an HE surface gun. */
  "aagun_ak725": { "name": "Twin 57mm AK-725, radar-directed", "dmg": 36, "warhead": "flak",
    "range": 4.4, "reload": 1.3, "burst": 5, "burstDelay": 0.09, "acc": 0.56,
    "proj": "shell", "speed": 870, "aoe": 0.4, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* 3in/50 Mk 33: the twin American dual-purpose mount of the 1950s, on the
     escorts and on everything the United States transferred to Taiwan. */
  "aagun_3in50": { "name": "Twin 3in/50 Mk 33", "dmg": 34, "warhead": "flak",
    "range": 4.6, "reload": 1.4, "burst": 4, "burstDelay": 0.1, "acc": 0.54,
    "proj": "shell", "speed": 840, "aoe": 0.4, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* What a small craft actually shoots back with: a 40mm Bofors, a 20mm
     Oerlikon or a 14.5mm twin on a pintle, aimed by eye. Short, inaccurate,
     and better than nothing - which is the point, because a missile boat
     caught by aircraft has no second layer. */
  "aagun_lt": { "name": "40mm Bofors and 20mm on pintle mounts", "dmg": 24, "warhead": "flak",
    "range": 2.9, "reload": 1.2, "burst": 5, "burstDelay": 0.08, "acc": 0.40,
    "proj": "shell", "speed": 880, "aoe": 0.3, "sfx": "cannon",
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 } },

  /* ============================================================
     WHAT A DECK FIGHTER COULD DO TO THE BEACH
     ============================================================
     Measured before this pass: of 70 carrier-capable airframes, 44 could not
     attack a ground target and every single row with role "cfighter" was
     masked air-only. A carrier could put a full air group up and not one
     aeroplane on it could touch anything ashore, which is the one thing the
     type exists for.

     For most of these aircraft that was simply wrong. For three of them it is
     RIGHT, and those three are why this is a hand-written table and not a loop
     over the role:

       nato_e80_cfighter  F-14A Tomcat. Fleet air defence and nothing else for
         the whole of the decade this row covers. The airframe was bomb-capable
         from the 1973 trials and the Navy declined to use it - no cleared
         stores and no air-to-ground syllabus, because the tasking belonged to
         the A-6 and the A-7. The Bombcat is a LANTIRN fit and the pods did not
         reach VF-103 and VF-14 until 1996. SEE THE NOTE IN STATUS.md: this is
         historically right for the airframe and leaves the 1980s American
         carrier with no strike aircraft at all, because the A-6E Intruder that
         really did that job is not in this roster.
       fra_e60_cfighter   F-8E(FN) Crusader. Forty-two aircraft bought in 1964
         and flown by the Aeronavale as pure interceptors to 1999. The American
         F-8E's Y-pylon strike role was never part of the French one.
       cfighter_p         Su-33, in rules.js. An air defence Flanker. The only
         time the type bombed anything was FAB-500s over Syria from Kuznetsov
         in November 2016 with the SVP-24 sight, and that row runs from e90,
         so arming it would back-date 2016 by eighteen years. The Russian
         carrier not being able to hit the beach is the fact, not a gap.

     Where a nation already has an honest ground round for the period it is
     REUSED rather than duplicated - the Sea Hawk FGA.6's Hispano and RP-3
     rockets really are w_e50_gbr_cas, the SEM's GBU-12 under PDLCT really is
     w_e90_fra_cas, and the Rafale M's AASM really is w_e00_fra_cas.
     w_e50_fra_cas is deliberately NOT reused for the Aquilon: it is a
     proj "missile" row at range 4.6, which is a standoff weapon, and a 1955
     Sea Venom dropping bombs is not that. */

  /* F9F-8 Cougar. First flight 18 December 1953 and in the squadrons through
     1954-55, so it is the second half of this era and not the first. Swept
     wings on the straight-wing Panther that had carried bombs over Korea, and
     the ground-attack job came with it - HVAR rockets and a pair of thousand-
     pounders. Under nato_e50_cas, the Skyraider, which hauls four times as
     much and loiters while it does it. */
  "w_e50_nato_cstrike": { "name": "HVAR rockets and two 1,000 lb bombs", "dmg": 112,
    "warhead": "he", "range": 1.8, "reload": 1.35, "burst": 2, "burstDelay": 0.35,
    "acc": 0.58, "proj": "bomb", "speed": 0, "aoe": 2.2, "suppress": 65, "ammo": 2,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* F-4B Phantom II, 1961. Eight thousand pounds on five stations, and Navy
     F-4Bs flew strike over North Vietnam from 1965 alongside the intercept
     tasking. No gun on the B model, which is what its own unit row says.
     Unguided iron bombs aimed by a radar interceptor, so accuracy sits well
     under nato_e60_cas at 0.74 - that row is the A-7. */
  "w_e60_nato_cstrike": { "name": "Mk 82 and Mk 83 iron bombs on five stations",
    "dmg": 156, "warhead": "he", "range": 2.0, "reload": 1.28, "burst": 2,
    "burstDelay": 0.35, "acc": 0.62, "proj": "bomb", "speed": 0, "aoe": 2.4,
    "suppress": 75, "ammo": 2, "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* F/A-18C Hornet, 1987. The slash in the designation is the whole point: on
     17 January 1991 two VFA-81 Hornets shot down MiG-21s and went on to bomb
     the airfield in the same sortie, still carrying their Mk 84s. The pod is
     the AAS-38 NITE Hawk, not the Air Force's LANTIRN. Just under
     nato_e90_cas at 284, which is the F-15E and carries more of it further. */
  "w_e90_nato_cstrike": { "name": "Mk 83 and GBU-16 Paveway II, NITE Hawk FLIR",
    "dmg": 262, "warhead": "he", "range": 2.4, "reload": 1.10, "burst": 2,
    "burstDelay": 0.35, "acc": 0.84, "proj": "bomb", "speed": 0, "aoe": 2.4,
    "suppress": 78, "ammo": 2, "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* Phantom FG.1, 1969. FG is Fighter/Ground-attack and the Royal Navy meant
     it: sixteen thousand pounds of stores against the Harrier GR.1's five, so
     the damage is deliberately ABOVE w_e60_gbr_cas at 170 - and the accuracy
     deliberately below its 0.72, because a big radar interceptor tossing iron
     bombs is not a dedicated attack aeroplane. */
  "w_e60_gbr_cstrike": { "name": "1,000 lb bombs and SNEB rocket pods", "dmg": 192,
    "warhead": "he", "range": 2.0, "reload": 1.26, "burst": 2, "burstDelay": 0.35,
    "acc": 0.60, "proj": "bomb", "speed": 0, "aoe": 2.4, "suppress": 75, "ammo": 2,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* Sea Harrier FRS.1 - the S in the designation is Strike. Over the Falklands
     in 1982 the SHARs flew bombing sorties with 1,000 lb retarded bombs and
     BL755 cluster against Stanley and Goose Green, tossed or laid down by eye.
     Deliberately NOT w_e80_gbr_cas, which is Paveway II: a laser-guided bomb
     is a claim this aircraft cannot support in 1982. */
  "w_e80_gbr_cstrike": { "name": "1,000 lb retarded bombs and BL755 cluster",
    "dmg": 176, "warhead": "he", "range": 1.8, "reload": 1.30, "burst": 2,
    "burstDelay": 0.35, "acc": 0.58, "proj": "bomb", "speed": 0, "aoe": 2.4,
    "suppress": 72, "ammo": 2, "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* Sea Harrier FA2 - Fighter/Attack. Blue Vixen made it a first-rank
     interceptor and it kept the bomb and rocket fit throughout, working
     air-to-ground over Bosnia and again over Sierra Leone. Still unguided
     stores, so it stays under w_e90_gbr_cas at 268, the Harrier GR7. */
  "w_e90_gbr_cstrike": { "name": "1,000 lb bombs and CRV-7 rockets", "dmg": 198,
    "warhead": "he", "range": 2.0, "reload": 1.22, "burst": 2, "burstDelay": 0.35,
    "acc": 0.68, "proj": "bomb", "speed": 0, "aoe": 2.4, "suppress": 74, "ammo": 2,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* Aquilon - the de Havilland Sea Venom built under licence by SNCASE and
     flown by the Aeronavale from 1955, including over Suez in 1956. Cannon and
     rockets off a subsonic straight-wing aeroplane. */
  "w_e50_fra_cstrike": { "name": "4 x 20mm and T-10 rockets", "dmg": 104,
    "warhead": "he", "range": 1.9, "reload": 1.40, "burst": 2, "burstDelay": 0.35,
    "acc": 0.55, "proj": "bomb", "speed": 0, "aoe": 2.2, "suppress": 62, "ammo": 2,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* Super Etendard, 1978. France's carrier strike aeroplane: 250 kg bombs and
     68 mm rocket pods conventionally, Exocet against ships, the AN 52 free-fall
     atomic bomb and ASMP from 1989 - the nuclear round is not modelled here
     and is not meant to be. Deliberately NOT w_e80_fra_cas, which is the
     Jaguar's AS.30L under an ATLIS II pod; the Super Etendard had no laser
     designator until the SEM rebuild of the 1990s. */
  "w_e80_fra_cstrike": { "name": "250 kg bombs and 68 mm rocket pods", "dmg": 186,
    "warhead": "he", "range": 2.0, "reload": 1.24, "burst": 2, "burstDelay": 0.35,
    "acc": 0.62, "proj": "bomb", "speed": 0, "aoe": 2.4, "suppress": 76, "ammo": 2,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* Yak-38 Forger, 1976. A shturmovik before it was anything else - it has no
     radar, so ground attack is most of what it could honestly do - and the
     payload is the whole story: about a tonne, two hardpoints a side, and on a
     hot day it came off the deck with fuel OR with weapons. w_e60_pact_cas,
     the Su-17M, is 185 for roughly two and a half tonnes; this is deliberately
     under half of that. */
  /* Release range 1.8, the same as every other unguided fit here, and NOT
     shorter: measured at 1.6 the Forger loitered at the reach of its own
     air-to-air round and only sometimes closed far enough to drop at all.
     What encodes "about a tonne of bombs" is the damage - 76, the lowest in
     the game - not an artificially short release. */
  "w_e60_pact_cstrike": { "name": "UB-32 pods or a pair of FAB-250 - a tonne, all told",
    "dmg": 76, "warhead": "he", "range": 1.8, "reload": 1.55, "burst": 2,
    "burstDelay": 0.35, "acc": 0.52, "proj": "bomb", "speed": 0, "aoe": 2.0,
    "suppress": 48, "ammo": 2, "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* ---- THE AIRCRAFT THAT ACTUALLY BOMBED FROM AN AMERICAN DECK ----
     The F-14A is correctly denied ground attack above, and that left a real
     hole the block above could only record: withhold it and the 1980s American
     carrier has NO strike aircraft at all, which is a bigger falsehood than
     the one being avoided. The answer is not to arm the Tomcat. It is the
     aeroplane whose absence created the hole.

     The A-6 Intruder flew from American decks from 1963 to 1997 and was the
     Navy's only all-weather, night, low-level attack aircraft for most of it.
     Subsonic, ugly, no gun, no radar for air-to-air, and it could put eighteen
     thousand pounds on a target in weather that kept everything else aboard -
     which is why the Tomcat crews did not need to bomb and were not asked to.
     Three rows, because it is three genuinely different aeroplanes: the A-6A
     of Vietnam with unguided iron, the A-6E TRAM of 1979 with a turret under
     the nose that could see and laser-designate at night, and the SWIP of 1990
     that added Harpoon and SLAM before the type was retired in 1997. */
  "w_e60_nato_intruder": { "name": "Twenty-eight Mk 82 on five stations", "dmg": 236,
    "warhead": "he", "range": 2.2, "reload": 1.15, "burst": 2, "burstDelay": 0.35,
    "acc": 0.70, "proj": "bomb", "speed": 0, "aoe": 2.8, "suppress": 96, "ammo": 2,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },
  "w_e80_nato_intruder": { "name": "TRAM turret, Mk 82s and Paveway II", "dmg": 288,
    "warhead": "he", "range": 2.5, "reload": 1.10, "burst": 2, "burstDelay": 0.35,
    "acc": 0.86, "proj": "bomb", "speed": 0, "aoe": 2.8, "suppress": 100, "ammo": 2,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },
  "w_e90_nato_intruder": { "name": "SWIP: Paveway, Harpoon and SLAM", "dmg": 312,
    "warhead": "he", "range": 2.7, "reload": 1.08, "burst": 2, "burstDelay": 0.35,
    "acc": 0.88, "proj": "bomb", "speed": 0, "aoe": 2.8, "suppress": 100, "ammo": 2,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* Yak-38M, 1985. The uprated R-28V-300 and the short rolling takeoff bought
     back part of what vertical launch had cost, so the load goes up by about
     half and no further. Still no radar, still a combat radius nearer a
     hundred kilometres than six hundred. */
  "w_e80_pact_cstrike": { "name": "FAB-250 and UB-32 after a rolling takeoff",
    "dmg": 104, "warhead": "he", "range": 1.9, "reload": 1.45, "burst": 2,
    "burstDelay": 0.35, "acc": 0.56, "proj": "bomb", "speed": 0, "aoe": 2.1,
    "suppress": 54, "ammo": 2, "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* ---- MAIN BATTERIES THAT REPLACE A SHARED ROW NAMING A GUN THE SHIP
     NEVER CARRIED. HE, and tgt.air 0: the anti-aircraft half of these ships
     is the flak row above, not this one. ---- */

  /* HMS Tiger (C20), 1959: two twin 6in/50 Mk 26, every barrel fully
     automatic. She was carrying "Terrier and Talos SAM launchers" - USS Long
     Beach's fit, and never within a thousand miles of a British cruiser. */
  "navgun_rn6in": { "name": "Twin 6in/50 Mk 26 automatic", "dmg": 82, "warhead": "he",
    "range": 8.8, "reload": 1.9, "burst": 3, "burstDelay": 0.22, "acc": 0.70,
    "proj": "shell", "speed": 880, "aoe": 0.7, "sfx": "cannon",
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* HMS Swiftsure's surface battery: triple 6in/50 Mk XXIII, 1944, and not
     dual-purpose at 45 degrees of elevation. */
  "navgun_rn6_50": { "name": "Triple 6in/50 Mk XXIII", "dmg": 78, "warhead": "he",
    "range": 8.4, "reload": 2.6, "burst": 3, "burstDelay": 0.26, "acc": 0.62,
    "proj": "shell", "speed": 840, "aoe": 0.7, "sfx": "cannon",
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },

  /* The French anti-aircraft cruisers firing surface: the same 127mm turrets
     as aagun_fr57, laid flat. */
  "navgun_fr127": { "name": "Sixteen 127mm/54 Mle 1948", "dmg": 76, "warhead": "he",
    "range": 8.2, "reload": 1.7, "burst": 4, "burstDelay": 0.2, "acc": 0.72,
    "proj": "shell", "speed": 860, "aoe": 0.6, "sfx": "cannon",
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 } },
 "w_e90_pact_carrier": {
  "name": "12 x P-700 Granit under the deck",
  "dmg": 142,
  "warhead": "he",
  "range": 10.6,
  "reload": 5.3,
  "burst": 1,
  "acc": 0.68,
  "proj": "missile",
  "speed": 520,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "pop",
  "intercept": 0.85
 },
 "w_e90_pact_sead": {
  "name": "Kh-31P ramjet anti-radiation missile",
  "dmg": 198,
  "warhead": "he",
  "range": 9.6,
  "minRange": 1.4,
  "reload": 7,
  "burst": 1,
  "acc": 0.79,
  "proj": "missile",
  "speed": 560,
  "aoe": 1.5,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.8
 },
 "w_e90_pact_stealthfighter": {
  "name": "n/a",
  "dmg": 198,
  "warhead": "flak",
  "range": 10.6,
  "reload": 2.97,
  "burst": 1,
  "acc": 0.86,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 },
 "w_e00_pact_rifle": {
  "name": "5.45x39mm AK-74M",
  "dmg": 10,
  "warhead": "bullet",
  "range": 5,
  "reload": 1.12,
  "burst": 3,
  "burstDelay": 0.07,
  "acc": 0.71,
  "proj": "bullet",
  "speed": 0,
  "suppress": 5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pact_at": {
  "name": "9M133 laser beam-riding ATGM",
  "dmg": 124,
  "warhead": "heat",
  "range": 7.1,
  "minRange": 1.2,
  "reload": 5.3,
  "burst": 1,
  "acc": 0.84,
  "proj": "missile",
  "speed": 340,
  "aoe": 0.7,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_pact_mbt": {
  "name": "125mm 2A46M-5",
  "dmg": 157,
  "warhead": "cannon",
  "range": 8.1,
  "reload": 5.1,
  "burst": 1,
  "acc": 0.8,
  "proj": "shell",
  "speed": 860,
  "aoe": 0.9,
  "suppress": 24,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pact_lighttank": {
  "name": "125mm 2A75 with autoloader and Refleks ATG",
  "dmg": 57,
  "warhead": "cannon",
  "range": 6.5,
  "reload": 3.16,
  "burst": 1,
  "acc": 0.76,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "suppress": 14,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pact_ifv": {
  "name": "100mm 2A70",
  "dmg": 21,
  "warhead": "bullet",
  "range": 6.3,
  "reload": 2.24,
  "burst": 5,
  "burstDelay": 0.1,
  "acc": 0.69,
  "proj": "shell",
  "speed": 620,
  "suppress": 12,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pact_spg": {
  "name": "152mm 2A64 with automated laying and fire ",
  "dmg": 143,
  "warhead": "frag",
  "range": 15.3,
  "minRange": 4,
  "reload": 8.67,
  "burst": 1,
  "acc": 0.33,
  "proj": "arc",
  "speed": 210,
  "aoe": 2.6,
  "suppress": 60,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pact_mlrs": {
  "name": "12 x 300mm rockets",
  "dmg": 67,
  "warhead": "frag",
  "range": 13.9,
  "minRange": 3.5,
  "reload": 14.28,
  "burst": 12,
  "burstDelay": 0.16,
  "acc": 0.22,
  "proj": "arc",
  "speed": 260,
  "aoe": 2,
  "suppress": 40,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pact_spaag": {
  "name": "Twin 30mm 2A38M plus 12 x 57E6 SAM",
  "dmg": 25,
  "warhead": "flak",
  "range": 6.9,
  "reload": 1.73,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.61,
  "proj": "shell",
  "speed": 900,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 1,
   "sea": 0,
   "sub": 0
  }
 },
 "w_e00_pact_aa": {
  "name": "9M342 IR-homing SAM with proximity fuse",
  "dmg": 105,
  "warhead": "flak",
  "range": 7.7,
  "reload": 4.69,
  "burst": 1,
  "acc": 0.78,
  "proj": "missile",
  "speed": 520,
  "aoe": 0.6,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_pact_recon": {
  "name": "14.5mm KPVT and 7.62mm PKT",
  "dmg": 12,
  "warhead": "bullet",
  "range": 5.3,
  "reload": 1.63,
  "burst": 6,
  "burstDelay": 0.07,
  "acc": 0.65,
  "proj": "bullet",
  "speed": 0,
  "suppress": 9,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pact_fighter": {
  "name": "30mm GSh-30-1",
  "dmg": 190,
  "warhead": "flak",
  "range": 9.4,
  "reload": 3.06,
  "burst": 1,
  "acc": 0.86,
  "proj": "missile",
  "speed": 700,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.55
 },
 "w_e00_pact_cas": {
  "name": "30mm GSh-30-2",
  "dmg": 314,
  "warhead": "he",
  "range": 2.6,
  "reload": 1.02,
  "burst": 2,
  "burstDelay": 0.35,
  "acc": 0.9,
  "proj": "bomb",
  "speed": 0,
  "aoe": 2.4,
  "suppress": 80,
  "ammo": 2,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  }
 },
 "w_e00_pact_gunship": {
  "name": "30mm 2A42",
  "dmg": 138,
  "warhead": "heat",
  "range": 6.5,
  "reload": 2.45,
  "burst": 1,
  "acc": 0.88,
  "proj": "missile",
  "speed": 400,
  "aoe": 1,
  "ammo": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 1
 },
 "w_e00_pact_corvette": {
  "name": "8 x Kh-35 SSM",
  "dmg": 49,
  "warhead": "he",
  "range": 7.9,
  "reload": 1.22,
  "burst": 4,
  "burstDelay": 0.16,
  "acc": 0.73,
  "proj": "shell",
  "speed": 700,
  "aoe": 0.5,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "shot"
 },
 "w_e00_pact_missileboat": {
  "name": "8 x Kalibr or Oniks in VLS",
  "dmg": 304,
  "warhead": "he",
  "range": 14.9,
  "minRange": 2.5,
  "reload": 19.38,
  "burst": 1,
  "acc": 0.73,
  "proj": "missile",
  "speed": 330,
  "aoe": 1.7,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "loft",
  "intercept": 0.45
 },
 "w_e00_pact_destroyer": {
  "name": "n/a",
  "dmg": 143,
  "warhead": "he",
  "range": 10.1,
  "reload": 4.69,
  "burst": 4,
  "burstDelay": 0.3,
  "acc": 0.67,
  "proj": "shell",
  "speed": 700,
  "aoe": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e00_pact_sub": {
  "name": "6 x 533mm tubes",
  "dmg": 333,
  "warhead": "he",
  "range": 8.9,
  "minRange": 1,
  "reload": 13.26,
  "burst": 2,
  "burstDelay": 1.4,
  "acc": 0.76,
  "proj": "torpedo",
  "speed": 7.5,
  "aoe": 1.2,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 1
  },
  "sfx": "missile"
 },
 "w_e00_pact_cruiser": {
  "name": "16 x P-1000 Vulkan SSM",
  "dmg": 143,
  "warhead": "he",
  "range": 10.1,
  "reload": 4.69,
  "burst": 4,
  "burstDelay": 0.3,
  "acc": 0.67,
  "proj": "shell",
  "speed": 700,
  "aoe": 1,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "cannon"
 },
 "w_e00_pact_carrier": {
  "name": "P-700 Granit",
  "dmg": 157,
  "warhead": "he",
  "range": 10.9,
  "reload": 5.1,
  "burst": 1,
  "acc": 0.71,
  "proj": "missile",
  "speed": 520,
  "tgt": {
   "ground": 0,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "sfx": "missile",
  "profile": "pop",
  "intercept": 0.85
 },
 "w_e00_pact_sead": {
  "name": "Kh-31P and Kh-58 anti-radiation missiles",
  "dmg": 219,
  "warhead": "he",
  "range": 9.9,
  "minRange": 1.5,
  "reload": 6.73,
  "burst": 1,
  "acc": 0.82,
  "proj": "missile",
  "speed": 560,
  "aoe": 1.5,
  "ammo": 1,
  "antiRadiation": true,
  "tgt": {
   "ground": 1,
   "air": 0,
   "sea": 1,
   "sub": 0
  },
  "profile": "loft",
  "intercept": 0.8
 },
 "w_e00_pact_stealthfighter": {
  "name": "n/a",
  "dmg": 219,
  "warhead": "flak",
  "range": 10.9,
  "reload": 2.86,
  "burst": 1,
  "acc": 0.9,
  "proj": "missile",
  "speed": 760,
  "aoe": 0.8,
  "ammo": 1,
  "tgt": {
   "ground": 0,
   "air": 1,
   "sea": 0,
   "sub": 0
  },
  "profile": "pop",
  "intercept": 0.45
 }
});

Object.assign(UNITS, {
  pla_e50_rifle: {"fac":"pla","role":"rifle","cat":"infantry","layer":"ground","name":"Type 56 Squad","full":"Rifle Squad, Type 56 assault rifle","cost":65,"oil":0,"time":4,"hp":60,"armor":"infantry","speed":0.92,"turn":7,"sight":3.5,"r":6,"mass":0.1,"weapons":["w_e50_pla_rifle"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1956","confidence":"high","desc":"A straight AK-47 copy produced at Factory 626 from 1956. Before it the squad carried the Type 53 carbine (Mosin M44 copy) and a magpie's nest of captured Japanese, US lend-lease and Nationalist weapons - Korean-War PLA squads had no common cartridge, which is a real and crippling logistics fact worth reflecting in a 19"},
  pla_e50_at: {"fac":"pla","role":"at","cat":"infantry","layer":"ground","name":"Type 56 RPG Team","full":"AT Team, Type 56 40mm rocket launcher (RPG-2)","cost":175,"oil":0,"time":7,"hp":55,"armor":"infantry","speed":0.76,"turn":6,"sight":4.3,"r":6,"mass":0.1,"weapons":["w_e50_pla_at"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1956","confidence":"high","desc":"Licence RPG-2. Effective range against a moving tank is barely 100-150m and the warhead struggles past 180mm of steel. This is an ambush weapon for close country only. The earlier Type 51 90mm launcher (a copy of the US M20 super bazooka, 1951) served alongside it."},
  pla_e50_mbt: {"fac":"pla","role":"mbt","cat":"vehicle","layer":"ground","name":"T-34-85","full":"T-34-85 medium tank (Soviet-supplied)","cost":665,"oil":10,"time":16,"hp":935,"armor":"heavy","speed":1.38,"turn":1.55,"sight":4.7,"r":16,"mass":58,"weapons":["w_e50_pla_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1950","confidence":"high","desc":"The actual backbone of the PLA armoured force for most of the decade - roughly 1,800 delivered from 1950. Wartime-generation armour with no night sights and no stabiliser. If you are modelling 1950-1958 China, this is the tank, not the Type 59.","turret":true,"tturn":1.4,"crush":true},
  pla_e50_heavy: {"fac":"pla","role":"heavy","cat":"vehicle","layer":"ground","name":"IS-2","full":"IS-2 heavy tank (Soviet-supplied)","cost":1080,"oil":17,"time":24,"hp":1300,"armor":"heavy","speed":1.25,"turn":1.4,"sight":4.9,"r":18,"mass":60,"weapons":["w_e50_pla_heavy"],"prereq":["factory","lab"],"tech":3,"from":"e50","to":"e50","service":"1950","confidence":"medium","desc":"A small number - on the order of 60 - were transferred with the Korean War aid packages, along with ISU-122/ISU-152 assault guns. Slow-firing with separate-loading ammunition, roughly three rounds a minute. Used as a breakthrough gun, never in quantity.","turret":true,"tturn":1.45,"crush":true},
  pla_e50_ifv: {"fac":"pla","role":"ifv","cat":"vehicle","layer":"ground","name":"Type 56 APC","full":"Type 56 armoured personnel carrier (BTR-152)","cost":400,"oil":5,"time":11,"hp":440,"armor":"light","speed":1.53,"turn":2,"sight":4.3,"r":14,"mass":24,"weapons":["w_e50_pla_ifv"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1958","confidence":"medium","desc":"A copy of the Soviet BTR-152: an open-topped armoured truck on a ZIS-151 chassis, not an IFV in any sense. It carries infantry to the edge of the battle and offers splinter protection and nothing else. Exact Chinese production start dates are thinly sourced.","turret":true,"tturn":1.8,"cargo":6},
  pla_e50_spg: {"fac":"pla","role":"spg","cat":"vehicle","layer":"ground","name":"SU-76M","full":"SU-76M self-propelled gun (Soviet-supplied)","cost":675,"oil":9,"time":17,"hp":415,"armor":"light","speed":1.16,"turn":1.5,"sight":3.3,"r":15,"mass":35,"weapons":["w_e50_pla_spg"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1950","confidence":"high","desc":"Open-topped, thinly armoured, hated by its crews wherever it served. Used heavily in Korea as direct-fire infantry support. Chinese self-propelled artillery does not appear as an indigenous product until 1970.","turret":true,"tturn":0.9},
  pla_e50_mlrs: {"fac":"pla","role":"mlrs","cat":"vehicle","layer":"ground","name":"BM-13 Katyusha","full":"BM-13-16 132mm multiple rocket launcher","cost":990,"oil":15,"time":23,"hp":370,"armor":"light","speed":1.12,"turn":1.3,"sight":3.3,"r":15,"mass":43,"weapons":["w_e50_pla_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e50","to":"e50","service":"1951","confidence":"high","desc":"Soviet-supplied and used by dedicated PLA rocket artillery divisions in Korea from 1951. Wildly inaccurate individually, devastating by the battalion. Chinese-built tube rocket artillery arrives with the Type 63 in 1963.","turret":true,"tturn":0.8},
  pla_e50_aa: {"fac":"pla","role":"aa","cat":"infantry","layer":"ground","name":"Type 55 37mm AA","full":"Type 55 37mm anti-aircraft gun (61-K)","cost":155,"oil":0,"time":6,"hp":55,"armor":"infantry","speed":0.77,"turn":6,"sight":4.7,"r":6,"mass":0.1,"weapons":["w_e50_pla_aa"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1955","confidence":"high","desc":"Licence M1939 61-K, towed, optically directed. The heavier layer was the Type 56 85mm (KS-12 copy). Against jets these are already marginal by 1955 - they put up a barrage rather than aim."},
  pla_e50_recon: {"fac":"pla","role":"recon","cat":"vehicle","layer":"ground","name":"Type 55 Scout Car","full":"Type 55 armoured car (BTR-40)","cost":175,"oil":2,"time":5,"hp":185,"armor":"light","speed":2.41,"turn":3.1,"sight":5.5,"r":11,"mass":6,"weapons":["w_e50_pla_recon"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1958","confidence":"medium","desc":"BTR-40 copy used for reconnaissance and command. Most PLA reconnaissance in this decade was done on foot, on horseback or in GAZ-69 light trucks; the army was overwhelmingly a leg-infantry force.","turret":true,"tturn":2.3},
  pla_e50_fighter: {"fac":"pla","role":"fighter","cat":"aircraft","layer":"air","name":"J-5","full":"Shenyang J-5 (licence MiG-17F)","cost":635,"oil":13,"time":15,"hp":225,"armor":"air","speed":7.48,"turn":1.95,"sight":6.5,"r":15,"mass":0,"weapons":["w_e50_pla_fighter"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1956","confidence":"high","desc":"First flew at Shenyang in July 1956, the first jet aircraft China ever built. Guns only - no air-to-air missile of any kind until the PL-2 (AA-2 copy) in the 1960s. The MiG-15bis supplied from 1950 (Chinese designation J-2) fought the Korean air war and remained in service alongside it.","jet":true,"ammo":2,"radar":4.2,"radius":37,"rcs":0.6},
  pla_e50_cas: {"fac":"pla","role":"cas","cat":"aircraft","layer":"air","name":"Il-10","full":"Ilyushin Il-10 attack aircraft (Soviet-supplied)","cost":895,"oil":18,"time":22,"hp":405,"armor":"air","speed":4.9,"turn":1.5,"sight":5.3,"r":17,"mass":0,"weapons":["w_e50_pla_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e50","to":"e50","service":"1950","confidence":"high","desc":"Piston-engined armoured ground-attack aircraft, the Sturmovik's successor. Used in the amphibious assault on Yijiangshan in January 1955, one of the very few genuine joint operations the PLA conducted in this era. The Tu-2 light bomber served alongside it in the same campaign.","jet":true,"ammo":3,"radius":37,"rcs":1.2},
  pla_e50_transport: {"fac":"pla","role":"transport","cat":"aircraft","layer":"air","name":"Mi-4","full":"Mil Mi-4 Hound (Soviet-supplied)","cost":405,"oil":6,"time":11,"hp":285,"armor":"air","speed":3.53,"turn":2.4,"sight":4.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1956","confidence":"high","desc":"China's first military helicopter of any consequence. Licence production as the Harbin Z-5 begins at the end of the decade. No armed helicopter role exists yet - the PLA would not field a purpose-built attack helicopter for another fifty-six years.","ammo":0,"hover":true,"cargo":9,"radius":30,"rcs":0.95},
  pla_e50_corvette: {"fac":"pla","role":"corvette","cat":"naval","layer":"sea","name":"Chengdu class","full":"Type 6601/6604 frigate (Project 50 Riga-class)","cost":540,"oil":7,"time":12,"hp":620,"armor":"light","speed":2.45,"turn":1.7,"sight":5.5,"r":17,"mass":0,"weapons":["w_e50_pla_corvette","aagun_pla57"],"prereq":["navalyard"],"tech":1,"from":"e50","to":"e50","service":"1958","confidence":"high","desc":"Four hulls assembled at Hudong from Soviet Project 50 kits, commissioned 1957-58. These are the first significant warships built in China. Gun and torpedo armed - no naval missile of any kind in the PLAN in this decade.","turret":true,"tturn":2,"sonar":3.7,"ciws":0.32,"rcs":0.75},
  pla_e50_destroyer: {"fac":"pla","role":"destroyer","cat":"naval","layer":"sea","name":"Anshan class","full":"Anshan class destroyer (ex-Soviet Project 7 Gnevny)","cost":1005,"oil":15,"time":22,"hp":1135,"armor":"heavy","speed":2.02,"turn":1.2,"sight":6.5,"r":20,"mass":0,"weapons":["w_e50_pla_destroyer","aagun_v11"],"prereq":["navalyard","radar"],"tech":2,"from":"e50","to":"e50","service":"1955","confidence":"high","desc":"Four 1930s-vintage Soviet destroyers transferred 1954-55, the largest surface combatants the PLAN owned for the next fifteen years. They were rebuilt in the 1970s with SY-1 anti-ship missiles, which is the more interesting form. Genuinely obsolete on delivery.","turret":true,"tturn":1.4,"sonar":5.3,"radar":11.4,"ciws":0.48,"rcs":0.85},
  pla_e50_sub: {"fac":"pla","role":"sub","cat":"naval","layer":"sub","name":"Type 03 Whiskey","full":"Type 03 submarine (Project 613 Whiskey-class)","cost":1060,"oil":17,"time":23,"hp":630,"armor":"light","speed":1.63,"turn":1.1,"sight":4.9,"r":17,"mass":0,"weapons":["w_e50_pla_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e50","to":"e50","service":"1954","confidence":"high","desc":"Soviet boats transferred from 1954, then assembled from Soviet components at Jiangnan and Wuhan from 1957. Conventional diesel-electric with WWII-generation sonar. The Whiskey hull is also what China later stretched into the Type 033 Romeo fleet.","sonar":4.8,"quiet":0.5},
  pla_e50_missileboat: {"fac":"pla","role":"missileboat","cat":"naval","layer":"sea","name":"NONE","full":"no missile-armed combatant in PLAN service","cost":675,"oil":10,"time":15,"hp":480,"armor":"light","speed":2.75,"turn":1.85,"sight":5.3,"r":16,"mass":0,"weapons":["w_e50_pla_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e50","to":"e50","service":"n/a","confidence":"high","desc":"China had no anti-ship missile and no missile boat in the 1950s. The light-forces role was filled by Project 183 and P-4 torpedo boats (Chinese Type 025/026), which attack with torpedoes at knife range. The first Chinese missile boats - the Type 024 Houku - do not appear until 1966.","sonar":0,"rcs":0.6},
  pla_e60_rifle: {"fac":"pla","role":"rifle","cat":"infantry","layer":"ground","name":"Type 56 Squad","full":"Rifle Squad, Type 56 / Type 63","cost":80,"oil":0,"time":4,"hp":75,"armor":"infantry","speed":0.96,"turn":7,"sight":4.1,"r":6,"mass":0.1,"weapons":["w_e60_pla_rifle"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1956","confidence":"high","desc":"Unchanged from the previous era in bulk. The indigenous Type 63 rifle (1963) tried to merge the SKS and the AK and was a poor weapon - it was withdrawn and the PLA reverted to the Type 56."},
  pla_e60_at: {"fac":"pla","role":"at","cat":"infantry","layer":"ground","name":"Type 69 RPG Team","full":"AT Team, Type 69 40mm rocket launcher (RPG-7)","cost":220,"oil":0,"time":7,"hp":70,"armor":"infantry","speed":0.79,"turn":6,"sight":5,"r":6,"mass":0.1,"weapons":["w_e60_pla_at"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1969","confidence":"high","desc":"Licence RPG-7. A genuine improvement over the Type 56 - more range, far better penetration - and produced in enormous numbers. Still an unguided line-of-sight weapon."},
  pla_e60_mbt: {"fac":"pla","role":"mbt","cat":"vehicle","layer":"ground","name":"Type 59","full":"ZTZ-59 (WZ-120)","cost":825,"oil":12,"time":17,"hp":1150,"armor":"heavy","speed":1.44,"turn":1.55,"sight":5.5,"r":16,"mass":58,"weapons":["w_e60_pla_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1959","confidence":"high","desc":"Still the mass tank, built in thousands through this entire era. Progressively fitted with a laser rangefinder and IR searchlight on later runs, but the fundamental T-54A is unchanged.","turret":true,"tturn":1.4,"crush":true},
  pla_e60_lighttank: {"fac":"pla","role":"lighttank","cat":"vehicle","layer":"ground","name":"Type 62","full":"ZTQ-62 (WZ-131) light tank","cost":420,"oil":5,"time":10,"hp":485,"armor":"light","speed":1.85,"turn":2.4,"sight":5.2,"r":13,"mass":35,"weapons":["w_e60_pla_lighttank"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"A scaled-down Type 59 at 21 tonnes, built specifically for southern China and the mountain south-west where a medium tank cannot cross the bridges. Armour is 35mm at best - it is killed by heavy machine guns from the flank. It fought in Vietnam in 1979 and took heavy losses to RPGs in close country.","turret":true,"tturn":1.6},
  pla_e60_ifv: {"fac":"pla","role":"ifv","cat":"vehicle","layer":"ground","name":"Type 63 APC","full":"Type 63 (YW531 / K63) armoured personnel carrier","cost":495,"oil":6,"time":11,"hp":545,"armor":"light","speed":1.6,"turn":2,"sight":5,"r":14,"mass":24,"weapons":["w_e60_pla_ifv"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"China's first indigenous tracked APC and one of the genuinely successful designs of the period - simple, cheap, reliable, and built in tens of thousands. It is a battle taxi, not an IFV: no autocannon, no firing ports worth using, no thermal anything. The chassis becomes the base for Chinese SPGs, mortar carriers and c","turret":true,"tturn":1.8,"cargo":6},
  pla_e60_spg: {"fac":"pla","role":"spg","cat":"vehicle","layer":"ground","name":"Type 70 122mm","full":"Type 70 (WZ-302) 122mm self-propelled howitzer","cost":840,"oil":11,"time":18,"hp":510,"armor":"light","speed":1.22,"turn":1.5,"sight":3.9,"r":15,"mass":35,"weapons":["w_e60_pla_spg"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1970","confidence":"medium","desc":"A Type 54 towed howitzer bolted into an open-topped YW531 hull. Crude, open to overhead burst and counter-battery, no fire-control computer. China's first self-propelled artillery of its own design.","turret":true,"tturn":0.9},
  pla_e60_mlrs: {"fac":"pla","role":"mlrs","cat":"vehicle","layer":"ground","name":"Type 63 107mm","full":"Type 63 107mm 12-tube multiple rocket launcher","cost":1225,"oil":19,"time":24,"hp":455,"armor":"light","speed":1.17,"turn":1.3,"sight":3.9,"r":15,"mass":43,"weapons":["w_e60_pla_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"One of the most widely proliferated weapons ever built. Light enough to be broken down and carried by men or mules, which is precisely why it spread to every insurgency on earth. Short-ranged at about 8km but genuinely useful, and still fired in wars today.","turret":true,"tturn":0.8},
  pla_e60_spaag: {"fac":"pla","role":"spaag","cat":"vehicle","layer":"ground","name":"Type 63 37mm SPAAG","full":"Type 63 twin 37mm self-propelled AA gun","cost":580,"oil":8,"time":12,"hp":525,"armor":"light","speed":1.46,"turn":1.9,"sight":6.7,"r":14,"mass":35,"weapons":["w_e60_pla_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1965","confidence":"medium","desc":"Twin 37mm on a T-34 chassis with optical sights only - no radar, no director. Against a fast jet it is a hope rather than a system. Built in modest numbers. Radar-directed Chinese SPAAG does not arrive until the late 1980s.","turret":true,"tturn":2.6,"radar":5.6},
  pla_e60_aa: {"fac":"pla","role":"aa","cat":"infantry","layer":"ground","name":"HQ-2","full":"HQ-2 (Hongqi-2) surface-to-air missile","cost":190,"oil":0,"time":6,"hp":65,"armor":"infantry","speed":0.81,"turn":6,"sight":5.5,"r":6,"mass":0.1,"weapons":["w_e60_pla_aa"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1967","confidence":"high","desc":"The Chinese-developed S-75 derivative, and the PLA's principal air defence missile for the next thirty years. Its combat record is real: HQ-2 and its HQ-1 predecessor downed several US and Taiwanese reconnaissance drones and five ROCAF U-2s over the mainland during the 1960s. Fixed sites, long emplacement times, and co"},
  pla_e60_recon: {"fac":"pla","role":"recon","cat":"vehicle","layer":"ground","name":"BJ212 / Type 62","full":"Beijing BJ212 command car; Type 62 in the armoured recce role","cost":220,"oil":3,"time":5,"hp":230,"armor":"light","speed":2.52,"turn":3.1,"sight":6.4,"r":11,"mass":6,"weapons":["w_e60_pla_recon"],"prereq":["factory"],"tech":1,"from":"e60","to":"e80","service":"1965","confidence":"medium","desc":"There was no dedicated PLA reconnaissance vehicle in this era. Divisional reconnaissance rode in unarmoured jeeps or used Type 62 light tanks. Reconnaissance doctrine was dismounted and slow.","turret":true,"tturn":2.3},
  pla_e60_fighter: {"fac":"pla","role":"fighter","cat":"aircraft","layer":"air","name":"J-6","full":"Shenyang J-6 (licence MiG-19S)","cost":785,"oil":17,"time":16,"hp":275,"armor":"air","speed":7.83,"turn":1.95,"sight":7.6,"r":15,"mass":0,"weapons":["w_e60_pla_fighter"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1964","confidence":"high","desc":"The PLAAF's numerical mainstay for over twenty years and built in roughly 4,500 examples - more than the Soviets built MiG-19s. First Chinese flight was 1958 but the early aircraft were unairworthy; reliable production only from 1963. Short-legged, no useful radar in most variants, and by the 1970s hopelessly outclasse","jet":true,"ammo":2,"radar":4.9,"radius":38,"rcs":0.6},
  pla_e60_cas: {"fac":"pla","role":"cas","cat":"aircraft","layer":"air","name":"Q-5","full":"Nanchang Q-5 Fantan","cost":1110,"oil":22,"time":23,"hp":500,"armor":"air","speed":5.13,"turn":1.5,"sight":6.2,"r":17,"mass":0,"weapons":["w_e60_pla_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e60","service":"1970","confidence":"high","desc":"A MiG-19 airframe rebuilt with a solid nose and an internal bomb bay - China's first indigenous attack aircraft. No radar, no guided weapons, visual bombing only. It fought in the 1979 Vietnam border war and stayed in service until around 2017, which is a very long life for an aircraft this limited.","jet":true,"ammo":3,"radius":38,"rcs":1.2},
  pla_e60_gunship: {"fac":"pla","role":"gunship","cat":"aircraft","layer":"air","name":"NONE","full":"no attack helicopter in PLA service","cost":895,"oil":14,"time":18,"hp":410,"armor":"air","speed":3.2,"turn":2.2,"sight":6.4,"r":16,"mass":0,"weapons":["w_e60_pla_gunship"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"n/a","confidence":"high","desc":"China had no armed helicopter capability in this era and would not have a real one for another forty years. Armed Z-5s were improvised and negligible. This is one of the largest single capability gaps in the whole PLA history - the US fielded the AH-1 Cobra in 1967.","ammo":5,"hover":true,"radius":22,"rcs":0.8},
  pla_e60_transport: {"fac":"pla","role":"transport","cat":"aircraft","layer":"air","name":"Z-5","full":"Harbin Z-5 (licence Mi-4)","cost":500,"oil":8,"time":11,"hp":350,"armor":"air","speed":3.69,"turn":2.4,"sight":5.6,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"Licence Mi-4, series production from 1963, around 550 built. Piston-engined, underpowered at altitude, which mattered greatly on the Tibetan plateau and the Indian border. PLA helicopter lift in this era was tiny by any Western standard.","ammo":0,"hover":true,"cargo":9,"radius":31,"rcs":0.95},
  pla_e60_corvette: {"fac":"pla","role":"corvette","cat":"naval","layer":"sea","name":"Jiangnan class","full":"Type 065 Jiangnan-class frigate","cost":670,"oil":9,"time":13,"hp":760,"armor":"light","speed":2.57,"turn":1.7,"sight":6.4,"r":17,"mass":0,"weapons":["w_e60_pla_corvette","aagun_pla57"],"prereq":["navalyard"],"tech":1,"from":"e60","to":"e60","service":"1966","confidence":"medium","desc":"Five ships, the first frigates designed in China rather than assembled from Soviet kits. Gun-armed only, no SAM, no missile. Designed for coastal escort against a Nationalist navy, not for anything further out.","turret":true,"tturn":2,"sonar":4.3,"ciws":0.35,"rcs":0.75},
  pla_e60_destroyer: {"fac":"pla","role":"destroyer","cat":"naval","layer":"sea","name":"Type 051 Luda","full":"Type 051 Luda-class destroyer","cost":1245,"oil":19,"time":23,"hp":1395,"armor":"heavy","speed":2.12,"turn":1.2,"sight":7.6,"r":20,"mass":0,"weapons":["w_e60_pla_destroyer","aagun_pla57"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1971","confidence":"high","desc":"Lead ship Jinan commissioned 1971. China's first indigenous destroyer and a substantial step - but its air defence was 37mm and 57mm guns for its entire early life, which made it essentially defenceless against aircraft. Seventeen were built over twenty years and they served into the 2010s.","turret":true,"tturn":1.4,"sonar":6.2,"radar":13.3,"ciws":0.53,"rcs":1},
  pla_e60_missileboat: {"fac":"pla","role":"missileboat","cat":"naval","layer":"sea","name":"Type 021 Huangfeng","full":"Type 021 missile boat (Osa-I derivative)","cost":840,"oil":12,"time":15,"hp":590,"armor":"light","speed":2.88,"turn":1.85,"sight":6.2,"r":16,"mass":0,"weapons":["w_e60_pla_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e80","service":"1965","confidence":"medium","desc":"With the smaller Type 024 Houku (Komar copy, 1966), these gave the PLAN its first anti-ship missile capability. Doctrine was swarm attack from island cover in the littoral - a lot of small cheap hulls each carrying a heavy punch. That doctrine survives directly into the Type 022 of the 2000s.","sonar":0,"rcs":0.52},
  pla_e60_sub: {"fac":"pla","role":"sub","cat":"naval","layer":"sub","name":"Type 033 Romeo","full":"Type 033 submarine (Project 633 Romeo-class)","cost":1310,"oil":22,"time":24,"hp":775,"armor":"light","speed":1.71,"turn":1.1,"sight":5.7,"r":17,"mass":0,"weapons":["w_e60_pla_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1962","confidence":"high","desc":"Built in China from 1962 in very large numbers - on the order of 84 hulls, more than the Soviets built. Loud, short-endurance and by the 1970s already easy prey for Western ASW, but they gave the PLAN a submarine force in being. Some remained in service into the 2000s.","sonar":5.6,"quiet":0.41},
  pla_e60_awacs: {"fac":"pla","role":"awacs","cat":"aircraft","layer":"air","name":"NONE","full":"KJ-1 testbed only, never operational","cost":1880,"oil":39,"time":27,"hp":385,"armor":"air","speed":3.6,"turn":0.9,"sight":10.5,"r":25,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e60","to":"e60","service":"n/a","confidence":"high","desc":"The KJ-1 programme fitted a rotodome to a Tu-4 in 1971. It flew, it did not work well over land clutter, and it was cancelled in 1979. No operational Chinese AEW aircraft exists until 2007. Worth including precisely because the failure is the historical fact.","jet":true,"ammo":0,"radar":22.4,"radius":61,"rcs":3.4},
  pla_e80_rifle: {"fac":"pla","role":"rifle","cat":"infantry","layer":"ground","name":"Type 81 Squad","full":"Rifle Squad, Type 81 assault rifle","cost":100,"oil":0,"time":4,"hp":95,"armor":"infantry","speed":1.02,"turn":7,"sight":4.9,"r":6,"mass":0.1,"weapons":["w_e80_pla_rifle"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1983","confidence":"high","desc":"A genuine Chinese design rather than a copy, though clearly AK-derived, and the first PLA rifle that soldiers actually liked. Short-recoil-corrected and accurate. It was the standard rifle through the 1980s and 1990s and is still carried by reserve and militia units."},
  pla_e80_at: {"fac":"pla","role":"at","cat":"infantry","layer":"ground","name":"HJ-8 Red Arrow","full":"HJ-8 ATGM (Red Arrow 8)","cost":280,"oil":0,"time":8,"hp":85,"armor":"infantry","speed":0.84,"turn":6,"sight":6,"r":6,"mass":0.1,"weapons":["w_e80_pla_at"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1984","confidence":"high","desc":"The first competent Chinese ATGM - semi-automatic command guidance, so the gunner only has to keep the crosshair on the target. Broadly in the TOW and Milan class and about a decade behind them. Fielded on tripods, on Type 63 APCs and later on Z-9W helicopters. It saw real combat in Afghanistan and Bosnia via exports."},
  pla_e80_mbt: {"fac":"pla","role":"mbt","cat":"vehicle","layer":"ground","name":"Type 79","full":"ZTZ-79 main battle tank","cost":1060,"oil":15,"time":19,"hp":1420,"armor":"heavy","speed":1.52,"turn":1.55,"sight":6.6,"r":16,"mass":58,"weapons":["w_e80_pla_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1984","confidence":"medium","desc":"A Type 69-II fitted with the Western 105mm gun, a laser rangefinder and a rudimentary fire-control computer. The gun is the point: the licensed L7 with Western ammunition finally gave Chinese tanks a round that could hurt a modern target. Built in small numbers - a few hundred.","turret":true,"tturn":1.4,"crush":true},
  pla_e80_lighttank: {"fac":"pla","role":"lighttank","cat":"vehicle","layer":"ground","name":"Type 62","full":"ZTQ-62 (WZ-131)","cost":535,"oil":7,"time":10,"hp":600,"armor":"light","speed":1.95,"turn":2.4,"sight":6.2,"r":13,"mass":35,"weapons":["w_e80_pla_lighttank"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1963","confidence":"high","desc":"Carried over largely unchanged. The Type 62-I upgrade after the 1979 Vietnam war added stand-off screens and deleted some of the vulnerabilities the RPG ambushes had exposed.","turret":true,"tturn":1.6},
  pla_e80_ifv: {"fac":"pla","role":"ifv","cat":"vehicle","layer":"ground","name":"Type 86","full":"WZ-501 / Type 86 infantry fighting vehicle","cost":635,"oil":7,"time":12,"hp":575,"armor":"light","speed":1.62,"turn":2,"sight":6,"r":14,"mass":24,"weapons":["w_e80_pla_ifv"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1986","confidence":"high","desc":"A reverse-engineered BMP-1, sample vehicles obtained from Egypt. This is the PLA's first vehicle that can actually fight alongside its dismounts rather than just deliver them. Every criticism of the BMP-1 applies - the 73mm gun is inaccurate past 500m and the vehicle is a firetrap - but it was a genuine generational st","turret":true,"tturn":1.8,"cargo":6},
  pla_e80_spg: {"fac":"pla","role":"spg","cat":"vehicle","layer":"ground","name":"PLZ-83","full":"Type 83 (PLZ-83) 152mm self-propelled howitzer","cost":1075,"oil":15,"time":19,"hp":630,"armor":"light","speed":1.28,"turn":1.5,"sight":4.6,"r":15,"mass":35,"weapons":["w_e80_pla_spg"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1984","confidence":"medium","desc":"China's first enclosed-turret self-propelled gun. Around 30km with rocket-assisted rounds. Fire control remained manual and battery coordination was poor by NATO standards of the same decade, which is a doctrine gap as much as a hardware one.","turret":true,"tturn":0.9},
  pla_e80_mlrs: {"fac":"pla","role":"mlrs","cat":"vehicle","layer":"ground","name":"Type 81 122mm","full":"Type 81 (PHL-81) 122mm 40-tube rocket launcher","cost":1570,"oil":24,"time":26,"hp":560,"armor":"light","speed":1.23,"turn":1.3,"sight":4.6,"r":15,"mass":43,"weapons":["w_e80_pla_mlrs","scat_cn122"],"dispenser":8,"prereq":["factory","lab"],"tech":3,"from":"e80","to":"e80","service":"1982","confidence":"high","desc":"A BM-21 Grad equivalent on a Yan'an SX250 truck. Reliable, cheap, mass-produced, and the standard divisional rocket artillery for the next twenty years. The Type 63 107mm remains alongside it in light and mountain formations.","turret":true,"tturn":0.8},
  pla_e80_spaag: {"fac":"pla","role":"spaag","cat":"vehicle","layer":"ground","name":"PGZ-88","full":"Type 88 (PGZ-88) twin 37mm self-propelled AA gun","cost":745,"oil":10,"time":13,"hp":650,"armor":"light","speed":1.54,"turn":1.9,"sight":8,"r":14,"mass":35,"weapons":["w_e80_pla_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1988","confidence":"medium","desc":"The first Chinese SPAAG with a real radar director rather than an optical sight, on a Type 80 tank chassis. Built in small numbers and never entirely satisfactory. Genuinely capable Chinese mobile AA is a 1999-and-later story with the PGZ-95.","turret":true,"tturn":2.6,"radar":6.7},
  pla_e80_aa: {"fac":"pla","role":"aa","cat":"infantry","layer":"ground","name":"HN-5","full":"HN-5 man-portable SAM (SA-7 derivative)","cost":245,"oil":0,"time":7,"hp":80,"armor":"infantry","speed":0.86,"turn":6,"sight":6.6,"r":6,"mass":0.1,"weapons":["w_e80_pla_aa"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1980","confidence":"medium","desc":"A Strela-2 copy. First-generation IR seeker - tail-chase only, easily decoyed by flares, and useless against a jet approaching head-on. Fielded in quantity because it was cheap."},
  pla_e80_fighter: {"fac":"pla","role":"fighter","cat":"aircraft","layer":"air","name":"J-8II","full":"Shenyang J-8II Finback-B","cost":1005,"oil":21,"time":17,"hp":340,"armor":"air","speed":8.26,"turn":1.95,"sight":9.1,"r":15,"mass":0,"weapons":["w_e80_pla_fighter"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1988","confidence":"high","desc":"Twin-engine, side-intake interceptor - the first Chinese fighter with room for a real radar in the nose. It never got one in this era: the Peace Pearl programme to install the US AN/APG-66 was cancelled after Tiananmen in 1989 and the aircraft were returned unfinished. So the J-8II entered the 1990s as a fast intercept","jet":true,"ammo":3,"radar":5.9,"radius":39,"rcs":0.6},
  pla_e80_cas: {"fac":"pla","role":"cas","cat":"aircraft","layer":"air","name":"Q-5C","full":"Nanchang Q-5C Fantan","cost":1425,"oil":28,"time":25,"hp":615,"armor":"air","speed":5.42,"turn":1.5,"sight":7.4,"r":17,"mass":0,"weapons":["w_e80_pla_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1983","confidence":"high","desc":"Improved Q-5 with better range and countermeasures, still unguided iron bombs and rockets. The H-6 remains the heavy element.","jet":true,"ammo":4,"radius":39,"rcs":1.2},
  pla_e80_gunship: {"fac":"pla","role":"gunship","cat":"aircraft","layer":"air","name":"SA 342L Gazelle","full":"Aerospatiale SA 342L Gazelle with HOT","cost":1145,"oil":18,"time":19,"hp":505,"armor":"air","speed":3.37,"turn":2.2,"sight":7.7,"r":16,"mass":0,"weapons":["w_e80_pla_gunship"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1988","confidence":"medium","desc":"Twenty-four bought from France just before the arms embargo. This is genuinely the PLA's first purpose-built anti-tank helicopter, and there were twenty-four of them for a country of a billion people. A rounding error in capability, but historically the correct entry for this slot - the alternative is to leave it empty","ammo":6,"hover":true,"radius":22,"rcs":0.8},
  pla_e80_transport: {"fac":"pla","role":"transport","cat":"aircraft","layer":"air","name":"S-70C Black Hawk","full":"Sikorsky S-70C-2 Black Hawk","cost":640,"oil":10,"time":12,"hp":430,"armor":"air","speed":3.89,"turn":2.4,"sight":6.7,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1984","confidence":"high","desc":"Twenty-four civil-standard Black Hawks bought in 1984, and by far the best helicopters China owned. They were sent to Tibet and the western plateau because nothing else in the inventory could hover usefully at 4,000m. The embargo after 1989 meant no spares, and keeping them flying for thirty years became a minor Chines","ammo":0,"hover":true,"cargo":9,"radius":32,"rcs":0.95},
  pla_e80_corvette: {"fac":"pla","role":"corvette","cat":"naval","layer":"sea","name":"Type 053H2 Jianghu-III","full":"Type 053H2 Jianghu-III class frigate","cost":860,"oil":12,"time":14,"hp":940,"armor":"light","speed":2.71,"turn":1.7,"sight":7.7,"r":17,"mass":0,"weapons":["w_e80_pla_corvette","aagun_pla57"],"prereq":["navalyard"],"tech":1,"from":"e80","to":"e80","service":"1986","confidence":"high","desc":"The Jianghu family was built in large numbers from 1975 onward. Still no area air-defence missile - the type's air defence is 37mm guns, which by the mid-1980s means it cannot defend itself against an aircraft carrying a standoff missile. A coastal navy's ship.","turret":true,"tturn":2,"sonar":5.2,"ciws":0.39,"rcs":0.85},
  pla_e80_destroyer: {"fac":"pla","role":"destroyer","cat":"naval","layer":"sea","name":"Type 051 Luda","full":"Type 051 Luda-class destroyer","cost":1590,"oil":24,"time":25,"hp":1720,"armor":"heavy","speed":2.23,"turn":1.2,"sight":9.1,"r":20,"mass":0,"weapons":["w_e80_pla_destroyer","aagun_pla57"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1971","confidence":"high","desc":"Still the only destroyer class. Later hulls and refits added HQ-7 point-defence SAMs and helicopter decks, which finally gave the class some air defence after fifteen years without any.","turret":true,"tturn":1.4,"sonar":7.4,"radar":16,"ciws":0.59,"rcs":1},
  pla_e80_sub: {"fac":"pla","role":"sub","cat":"naval","layer":"sub","name":"Type 035 Ming","full":"Type 035 Ming-class submarine","cost":1680,"oil":28,"time":26,"hp":955,"armor":"light","speed":1.81,"turn":1.1,"sight":6.9,"r":17,"mass":0,"weapons":["w_e80_pla_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1974","confidence":"medium","desc":"An indigenously improved Romeo. Series production runs through the 1980s and 1990s. Still a 1950s Soviet hull form with 1970s Chinese electronics - loud, and by then well behind Western and Soviet diesel boats.","sonar":6.7,"quiet":0.33},
  pla_e80_awacs: {"fac":"pla","role":"awacs","cat":"aircraft","layer":"air","name":"NONE","full":"no airborne early warning capability","cost":2410,"oil":50,"time":29,"hp":475,"armor":"air","speed":3.8,"turn":0.9,"sight":12.6,"r":25,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e80","to":"e80","service":"n/a","confidence":"high","desc":"Still nothing. Chinese air defence in the 1980s is entirely ground-radar-based, which means it cannot see low and cannot see over the horizon at sea.","jet":true,"ammo":0,"radar":26.9,"radius":63,"rcs":3.4},
  pla_e80_sead: {"fac":"pla","role":"sead","cat":"aircraft","layer":"air","name":"NONE","full":"no defence-suppression capability","cost":1425,"oil":26,"time":22,"hp":370,"armor":"air","speed":7.79,"turn":1.9,"sight":9.2,"r":16,"mass":0,"weapons":["w_e80_pla_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e80","to":"e80","service":"n/a","confidence":"high","desc":"The PLAAF had no anti-radiation missile and no dedicated SEAD aircraft in this era. Against a defended airspace it had no answer other than mass and losses.","jet":true,"ammo":3,"radar":5.9,"radius":39,"rcs":0.65},
  pla_e90_rifle: {"fac":"pla","role":"rifle","cat":"infantry","layer":"ground","name":"QBZ-95 Squad","full":"Rifle Squad, QBZ-95 (Type 95) bullpup","cost":120,"oil":0,"time":4,"hp":105,"armor":"infantry","speed":1.05,"turn":7,"sight":5.3,"r":6,"mass":0.1,"weapons":["w_e90_pla_rifle"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1997","confidence":"high","desc":"A clean-sheet Chinese bullpup in a Chinese-developed 5.8mm cartridge - a deliberate statement of independence from both NATO and Soviet ammunition. First shown publicly with the Hong Kong garrison in 1997. Ergonomically criticised for years, but genuinely indigenous. The Type 81 remained the bulk-issue rifle well into "},
  pla_e90_at: {"fac":"pla","role":"at","cat":"infantry","layer":"ground","name":"HJ-8 / PF-89","full":"HJ-8 ATGM; PF-89 80mm disposable rocket launcher","cost":330,"oil":0,"time":8,"hp":95,"armor":"infantry","speed":0.86,"turn":6,"sight":6.5,"r":6,"mass":0.1,"weapons":["w_e90_pla_at"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1993","confidence":"high","desc":"The PF-89 replaced the Type 69 RPG at squad level - a light, disposable, one-shot launcher in the AT4 class. HJ-8 carries over as the platoon and company anti-tank missile."},
  pla_e90_mbt: {"fac":"pla","role":"mbt","cat":"vehicle","layer":"ground","name":"Type 96","full":"ZTZ-96 main battle tank","cost":1245,"oil":18,"time":20,"hp":1600,"armor":"heavy","speed":1.57,"turn":1.55,"sight":7.2,"r":16,"mass":58,"weapons":["w_e90_pla_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1997","confidence":"high","desc":"The first mass-produced Chinese tank with a 125mm smoothbore and autoloader, on a developed Type 88 hull. This is the tank that made Chinese armour numerically credible - thousands were built and it remains the most numerous PLA tank. Modest armour, mediocre fire control by 1997 Western standards, but a genuine 1980s-S","turret":true,"tturn":1.4,"crush":true},
  pla_e90_lighttank: {"fac":"pla","role":"lighttank","cat":"vehicle","layer":"ground","name":"Type 63A","full":"ZTS-63A amphibious light tank","cost":630,"oil":8,"time":11,"hp":675,"armor":"light","speed":2.01,"turn":2.4,"sight":6.8,"r":13,"mass":35,"weapons":["w_e90_pla_lighttank"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1997","confidence":"high","desc":"The old Type 63 amphibious hull rebuilt with a 105mm gun, stabilisation and a modern fire-control system, plus a large trim vane for open-water swimming. Built explicitly for an amphibious assault on Taiwan - it is meant to swim off a landing ship and fight ashore immediately.","turret":true,"tturn":1.6},
  pla_e90_ifv: {"fac":"pla","role":"ifv","cat":"vehicle","layer":"ground","name":"WZ-551 / Type 92","full":"WZ-551 (ZSL-92) 6x6 wheeled IFV","cost":750,"oil":9,"time":13,"hp":755,"armor":"light","speed":1.74,"turn":2,"sight":6.6,"r":14,"mass":24,"weapons":["w_e90_pla_ifv"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1995","confidence":"medium","desc":"China's first modern wheeled armoured fighting vehicle family and the ancestor of the ZBL-08 8x8s. Road-mobile and cheap to run - important for a country with enormous internal distances. The tracked Type 86 remains in the mechanised divisions.","turret":true,"tturn":1.8,"cargo":6},
  pla_e90_spg: {"fac":"pla","role":"spg","cat":"vehicle","layer":"ground","name":"PLZ-89","full":"Type 89 (PLZ-89) 122mm self-propelled howitzer","cost":1265,"oil":17,"time":20,"hp":710,"armor":"light","speed":1.32,"turn":1.5,"sight":5.1,"r":15,"mass":35,"weapons":["w_e90_pla_spg"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1990","confidence":"medium","desc":"Turreted 122mm on a tracked chassis, replacing the open-topped Type 70. Meanwhile the PLZ-45 155mm was developed largely for export - Kuwait bought it in 1997 - and the PLA itself did not adopt a modern 155mm until the PLZ-05 in the following era.","turret":true,"tturn":0.9},
  pla_e90_mlrs: {"fac":"pla","role":"mlrs","cat":"vehicle","layer":"ground","name":"Type 90 122mm","full":"Type 90/90B 122mm 40-tube rocket launcher","cost":1850,"oil":28,"time":28,"hp":630,"armor":"light","speed":1.27,"turn":1.3,"sight":5.1,"r":15,"mass":43,"weapons":["w_e90_pla_mlrs","scat_cn122"],"dispenser":8,"prereq":["factory","lab"],"tech":3,"from":"e90","to":"e90","service":"1994","confidence":"medium","desc":"Improved Type 81 with an automatic reload pack and a fire-control computer. The Russian-derived A-100 300mm system, which is where real long-range Chinese rocket artillery starts, arrives right at the end of the era.","turret":true,"tturn":0.8},
  pla_e90_spaag: {"fac":"pla","role":"spaag","cat":"vehicle","layer":"ground","name":"PGZ-95","full":"Type 95 (PGZ-95) self-propelled AA system","cost":875,"oil":12,"time":14,"hp":730,"armor":"light","speed":1.59,"turn":1.9,"sight":8.7,"r":14,"mass":35,"weapons":["w_e90_pla_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1999","confidence":"medium","desc":"The first Chinese mobile AA system that is genuinely a system: search and tracking radar, four 25mm guns and four IR missiles on one tracked chassis, netted to a command vehicle. This is the direct answer to what Desert Storm did to Iraqi columns.","turret":true,"tturn":2.6,"radar":7.4},
  pla_e90_aa: {"fac":"pla","role":"aa","cat":"infantry","layer":"ground","name":"S-300PMU / HQ-7","full":"S-300PMU and PMU-1 (Russian purchase); HQ-7 (Crotale derivative)","cost":290,"oil":0,"time":7,"hp":90,"armor":"infantry","speed":0.88,"turn":6,"sight":7.3,"r":6,"mass":0.1,"weapons":["w_e90_pla_aa"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1993","confidence":"high","desc":"The S-300 purchase from 1993 is the single largest jump in Chinese air defence capability in fifty years - a genuine modern long-range, multi-target, mobile SAM system in a force that had been flying HQ-2s since 1967. The HQ-7 is a Chinese Crotale, obtained via the French relationship of the previous decade, covering t"},
  pla_e90_recon: {"fac":"pla","role":"recon","cat":"vehicle","layer":"ground","name":"WZ-551 Recon","full":"WZ-551 reconnaissance variants","cost":330,"oil":4,"time":6,"hp":320,"armor":"light","speed":2.74,"turn":3.1,"sight":8.5,"r":11,"mass":6,"weapons":["w_e90_pla_recon"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1995","confidence":"medium","desc":"Reconnaissance was still weak: no thermal imagers in quantity, no UAVs of consequence, no datalink to pass what was seen. Finding the target remained the PLA's worst problem throughout this era.","turret":true,"tturn":2.3},

  /* The Su-27SK is the Flanker airframe described at pact_e00_fighter below -
     34 tonnes, 1,340 km of combat radius - and this row had it at 385 hp and
     40 tiles, which is a J-10's size. The desc calls it "the moment the PLAAF
     acquires a genuinely modern fighter: long range, a real radar", and the
     numbers now let a player feel the long range rather than read about it.
     Twenty-six aircraft at roughly 35 million dollars each is also why the
     cost is 1750 and not 1185: the PLAAF bought a squadron, not a fleet.
     ONE CONSEQUENCE IS DELIBERATE AND WORTH READING BEFORE ANYONE CHANGES IT.
     A PLA commander who advances e90 -> e00 now trades this 33-tonne Flanker
     for a 9.75-tonne J-10 and loses a fifth of the hit points and six tiles
     of radius doing it. That is the hi-lo mix again, the same shape as the
     F-15C standing above the F-16C in the NATO line, and it is a gap in the
     ROSTER rather than in the numbers: this row's own desc says "Licence
     assembly as the J-11 begins at Shenyang in 1998", and the PLAAF of 2005
     flew J-11s and J-10s side by side. There is no e00 Flanker row to carry
     these figures forward. Adding one is a roster change, not a number
     change, and is left to the owner. */
  pla_e90_fighter: {"fac":"pla","role":"fighter","cat":"aircraft","layer":"air","name":"Su-27SK","full":"Sukhoi Su-27SK Flanker (Russian purchase)","cost":1750,"oil":37,"time":27,"hp":520,"armor":"air","speed":8.9,"turn":1.95,"sight":9.9,"r":15,"mass":0,"weapons":["w_e90_pla_fighter"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1992","confidence":"high","desc":"Twenty-six aircraft delivered in 1992 and more after. This is the moment the PLAAF acquires a genuinely modern fighter: long range, a real radar, and beyond-visual-range missiles, all of which it had never had. Licence assembly as the J-11 begins at Shenyang in 1998. Note the honest caveat - the initial Su-27SK batch h","jet":true,"ammo":3,"radar":6.4,"radius":44,"rcs":1},
  pla_e90_cas: {"fac":"pla","role":"cas","cat":"aircraft","layer":"air","name":"JH-7","full":"Xian JH-7 Flying Leopard","cost":1675,"oil":34,"time":26,"hp":695,"armor":"air","speed":5.59,"turn":1.5,"sight":8.1,"r":17,"mass":0,"weapons":["w_e90_pla_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1994","confidence":"medium","desc":"China's first indigenous purpose-built strike fighter, entering Naval Aviation service in very small numbers from around 1994 after a long and troubled development. Early aircraft had persistent engine and structural problems. Its designed mission was maritime strike against a carrier group, which tells you what the 19","jet":true,"ammo":5,"radius":40,"rcs":1.2},
  pla_e90_gunship: {"fac":"pla","role":"gunship","cat":"aircraft","layer":"air","name":"Z-9W","full":"Harbin Z-9W armed helicopter","cost":1350,"oil":22,"time":20,"hp":570,"armor":"air","speed":3.48,"turn":2.2,"sight":8.5,"r":16,"mass":0,"weapons":["w_e90_pla_gunship"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1995","confidence":"medium","desc":"A licence-built Dauphin utility helicopter with missile racks bolted on - not an attack helicopter. No armour, no crashworthy tandem cockpit, no mast-mounted sight. The honest reading is that the PLA still had no attack helicopter capability in the 1990s and knew it.","ammo":7,"hover":true,"radius":23,"rcs":0.8},
  pla_e90_transport: {"fac":"pla","role":"transport","cat":"aircraft","layer":"air","name":"Mi-17 / Mi-171","full":"Mil Mi-17 and Mi-171 (Russian purchase)","cost":755,"oil":12,"time":13,"hp":485,"armor":"air","speed":4.02,"turn":2.4,"sight":7.4,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"Bought in large numbers from 1991 onward and the true workhorse of PLA army aviation for the next thirty years - hundreds of airframes. Cheap, rugged, and available when Western helicopters were embargoed. The domestically built Z-8 continued in small numbers alongside.","ammo":0,"hover":true,"cargo":9,"radius":33,"rcs":0.95},
  pla_e90_corvette: {"fac":"pla","role":"corvette","cat":"naval","layer":"sea","name":"Type 053H2G / H3 Jiangwei","full":"Type 053H2G Jiangwei-I and Type 053H3 Jiangwei-II frigates","cost":1010,"oil":14,"time":15,"hp":1060,"armor":"light","speed":2.79,"turn":1.7,"sight":8.5,"r":17,"mass":0,"weapons":["w_e90_pla_corvette","aagun_pla57"],"prereq":["navalyard"],"tech":1,"from":"e90","to":"e90","service":"1992","confidence":"high","desc":"The first Chinese frigates carrying an area SAM launcher rather than only guns. The Jiangwei-I's HQ-61 was poor; the Jiangwei-II swapped it for the HQ-7, which worked. Also the first Chinese frigates designed around a helicopter hangar.","turret":true,"tturn":2,"sonar":5.7,"ciws":0.41,"rcs":0.88},
  pla_e90_destroyer: {"fac":"pla","role":"destroyer","cat":"naval","layer":"sea","name":"Type 052 Luhu","full":"Type 052 Luhu-class destroyer","cost":1875,"oil":28,"time":26,"hp":1940,"armor":"heavy","speed":2.3,"turn":1.2,"sight":9.9,"r":20,"mass":0,"weapons":["w_e90_pla_destroyer","sam_hq7"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1994","confidence":"high","desc":"Two ships, Harbin and Qingdao. Their significance is the machinery: American LM2500 gas turbines bought before the embargo, which is why only two were built - the spares ran out. A demonstration of what China could design and could not yet supply itself.","turret":true,"tturn":1.4,"sonar":8.1,"radar":17.5,"ciws":0.62,"rcs":0.95},
  pla_e90_sub: {"fac":"pla","role":"sub","cat":"naval","layer":"sub","name":"Kilo class","full":"Project 877EKM and 636 Kilo-class submarine (Russian purchase)","cost":1980,"oil":33,"time":27,"hp":1075,"armor":"light","speed":1.86,"turn":1.1,"sight":7.5,"r":17,"mass":0,"weapons":["w_e90_pla_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1995","confidence":"high","desc":"First two delivered 1995. Quiet by a margin that made every Chinese-built boat look obsolete overnight, and the acoustic lessons learned from them fed directly into the Song and Yuan programmes. Twelve eventually acquired.","sonar":7.4,"quiet":0.29},
  pla_e90_awacs: {"fac":"pla","role":"awacs","cat":"aircraft","layer":"air","name":"NONE","full":"no AEW aircraft; A-50I Phalcon cancelled 2000","cost":2840,"oil":58,"time":31,"hp":535,"armor":"air","speed":3.92,"turn":0.9,"sight":13.8,"r":25,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e90","to":"e90","service":"n/a","confidence":"high","desc":"China contracted with Israel for the A-50I fitted with the Phalcon phased-array radar. The United States forced cancellation in July 2000 with the airframe already delivered to Israel and partly fitted. The direct consequence was the crash indigenous KJ-2000 programme, which succeeded - so the cancellation arguably acc","jet":true,"ammo":0,"radar":29.4,"radius":64,"rcs":3.4},
  pla_e90_carrier: {"fac":"pla","role":"carrier","cat":"naval","layer":"sea","name":"NONE","full":"no aircraft carrier","cost":4215,"oil":93,"time":56,"hp":3825,"armor":"heavy","speed":1.57,"turn":0.6,"sight":12.4,"r":30,"mass":0,"weapons":["w_e90_pla_carrier"],"prereq":["navalyard","lab","airbase"],"tech":3,"from":"e90","to":"e90","service":"n/a","confidence":"high","desc":"China bought the incomplete hull of the Soviet Varyag in 1998 through a Macau shell company nominally to make a floating casino. It sat at Dalian for years before reconstruction began. No Chinese carrier aviation existed in this era in any form.","carrier":4,"sonar":4.1,"radar":15.6,"ciws":0.56,"rcs":2.6},
  pla_e00_rifle: {"fac":"pla","role":"rifle","cat":"infantry","layer":"ground","name":"QBZ-95-1 Squad","full":"Rifle Squad, QBZ-95-1","cost":135,"oil":0,"time":4,"hp":115,"armor":"infantry","speed":1.06,"turn":7,"sight":5.6,"r":6,"mass":0.1,"weapons":["w_e00_pla_rifle"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2010","confidence":"high","desc":"Revised bullpup fixing the ergonomic complaints of the original. Universal issue across the regular force by the 2010s."},
  pla_e00_at: {"fac":"pla","role":"at","cat":"infantry","layer":"ground","name":"HJ-12 Red Arrow Team","full":"AT Team, HJ-12 (Red Arrow 12)","cost":365,"oil":0,"time":9,"hp":105,"armor":"infantry","speed":0.87,"turn":6,"sight":6.9,"r":6,"mass":0.1,"weapons":["w_e00_pla_at"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2016","confidence":"medium","desc":"China's Javelin equivalent, publicly revealed in 2014 and fielded from roughly 2016. Fire-and-forget with an imaging IR seeker and a top-attack profile, which finally lets the gunner shoot and move rather than track the missile to impact. The exact scale and date of PLA fielding is not well documented in open sources -"},
  pla_e00_mbt: {"fac":"pla","role":"mbt","cat":"vehicle","layer":"ground","name":"Type 99 / 99A","full":"ZTZ-99 (2001) and ZTZ-99A (2011)","cost":1380,"oil":20,"time":21,"hp":1730,"armor":"heavy","speed":1.58,"turn":1.55,"sight":7.6,"r":16,"mass":58,"weapons":["w_e00_pla_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2001","confidence":"high","desc":"The Type 99 in 2001 and the substantially redesigned 99A in 2011 are China's first genuinely first-rate tanks: composite and ERA armour, a thermal sight that works, a stabilised gun with a modern fire-control solution, and a laser dazzler on the turret roof. Fielded in the heavy brigades facing India and Russia, while ","turret":true,"tturn":1.4,"crush":true},
  pla_e00_lighttank: {"fac":"pla","role":"lighttank","cat":"vehicle","layer":"ground","name":"ZTD-05 / ZTQ-15","full":"ZTD-05 amphibious assault vehicle (2006); ZTQ-15 light tank (2018)","cost":700,"oil":9,"time":11,"hp":730,"armor":"light","speed":2.03,"turn":2.4,"sight":7.2,"r":13,"mass":35,"weapons":["w_e00_pla_lighttank"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2006","confidence":"high","desc":"Two different answers to two different problems. The ZTD-05 planes across water at high speed for an amphibious assault. The ZTQ-15 is a 33-tonne mountain tank for Tibet and the Indian border, where a 55-tonne Type 99 cannot go and where its diesel would not make power at altitude.","turret":true,"tturn":1.6},
  pla_e00_ifv: {"fac":"pla","role":"ifv","cat":"vehicle","layer":"ground","name":"ZBD-04 / ZBD-04A","full":"ZBD-04 (2006), ZBD-04A (2014) infantry fighting vehicle","cost":825,"oil":10,"time":13,"hp":815,"armor":"light","speed":1.76,"turn":2,"sight":7,"r":14,"mass":24,"weapons":["w_e00_pla_ifv"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2006","confidence":"high","desc":"A BMP-3-inspired weapons fit on a Chinese hull. The 100mm/30mm combination is unusual and gives the vehicle a genuine indirect-fire and missile capability that no Western IFV has. The 04A added heavier armour and better sights. The wheeled ZBL-08 8x8 family (2009) equips the medium brigades in parallel.","turret":true,"tturn":1.8,"cargo":6},
  pla_e00_spg: {"fac":"pla","role":"spg","cat":"vehicle","layer":"ground","name":"PLZ-05","full":"PLZ-05 155mm self-propelled howitzer","cost":1395,"oil":19,"time":21,"hp":770,"armor":"light","speed":1.34,"turn":1.5,"sight":5.3,"r":15,"mass":35,"weapons":["w_e00_pla_spg"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2007","confidence":"high","desc":"The PLA's first modern 155mm SPH - long tube, autoloader, digital fire control, netted to counter-battery radar. This is where Chinese artillery becomes competitive with NATO rather than merely numerous. The truck-mounted PCL-181 155mm follows in 2019 and is now the more widely deployed system.","turret":true,"tturn":0.9},
  pla_e00_mlrs: {"fac":"pla","role":"mlrs","cat":"vehicle","layer":"ground","name":"PHL-03","full":"PHL-03 300mm multiple rocket launcher","cost":2045,"oil":31,"time":29,"hp":680,"armor":"light","speed":1.29,"turn":1.3,"sight":5.3,"r":15,"mass":43,"weapons":["w_e00_pla_mlrs","scat_cn300"],"dispenser":6,"prereq":["factory","lab"],"tech":3,"from":"e00","to":"e00","service":"2005","confidence":"high","desc":"Reverse-engineered from the Russian BM-30 Smerch via the A-100 programme. Twelve 300mm rockets with guided variants available - at these ranges it is operational fires, not battlefield artillery. The PHL-16/PCL-191 modular system (2019) with 370mm and 750mm rounds supersedes it.","turret":true,"tturn":0.8},
  pla_e00_spaag: {"fac":"pla","role":"spaag","cat":"vehicle","layer":"ground","name":"PGZ-09","full":"PGZ-09 self-propelled anti-aircraft gun","cost":970,"oil":13,"time":15,"hp":785,"armor":"light","speed":1.6,"turn":1.9,"sight":9.2,"r":14,"mass":35,"weapons":["w_e00_pla_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2011","confidence":"high","desc":"Twin 35mm on a tracked chassis with its own search and tracking radars - the Gepard concept, arriving in Chinese service about thirty-five years after the German original. Effective against helicopters, drones and low-flying aircraft; it is now most often paired with the HQ-17 SAM system in the same battalion.","turret":true,"tturn":2.6,"radar":7.8},
  pla_e00_aa: {"fac":"pla","role":"aa","cat":"infantry","layer":"ground","name":"HQ-9 / HQ-16 / S-400","full":"HQ-9 long-range SAM (2003), HQ-16 medium-range (2011), S-400 (2018)","cost":320,"oil":0,"time":8,"hp":100,"armor":"infantry","speed":0.89,"turn":6,"sight":7.7,"r":6,"mass":0.1,"weapons":["w_e00_pla_aa"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2003","confidence":"high","desc":"HQ-9 is China's own long-range SAM, drawing on S-300 experience and reportedly on Patriot technology acquired indirectly. Layered with the HQ-16 at medium range and the HQ-17 and PGZ-09 at short range, this is a genuine integrated air defence system rather than a collection of batteries. S-400s bought from Russia from "},
  pla_e00_recon: {"fac":"pla","role":"recon","cat":"vehicle","layer":"ground","name":"CSK-131 Mengshi","full":"CSK-131 Mengshi protected 4x4","cost":365,"oil":5,"time":6,"hp":345,"armor":"light","speed":2.77,"turn":3.1,"sight":8.9,"r":11,"mass":6,"weapons":["w_e00_pla_recon"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2013","confidence":"high","desc":"Protected wheeled scout vehicle with a remote weapon station. The larger reconnaissance change in this era is not the vehicle: it is UAVs. The PLA fielded tactical drones in quantity from the 2010s onward and finally solved the find-the-target problem that had crippled it since the 1980s.","turret":true,"tturn":2.3},
  pla_e00_fighter: {"fac":"pla","role":"fighter","cat":"aircraft","layer":"air","name":"J-10 / J-10B","full":"Chengdu J-10 (2004), J-10B (2014)","cost":1310,"oil":28,"time":19,"hp":415,"armor":"air","speed":8.61,"turn":1.95,"sight":10.5,"r":15,"mass":0,"weapons":["w_e00_pla_fighter"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2004","confidence":"high","desc":"China's first indigenous fourth-generation fighter - canard delta, fly-by-wire, and designed in China rather than reverse-engineered. Early aircraft flew on Russian AL-31F engines, which is the standing caveat on Chinese aviation for this whole period. The J-10B added an infrared search and track set and a passive phas","jet":true,"ammo":4,"radar":6.8,"radius":40,"rcs":0.6},
  pla_e00_cas: {"fac":"pla","role":"cas","cat":"aircraft","layer":"air","name":"JH-7A","full":"Xian JH-7A Flying Leopard","cost":1855,"oil":37,"time":27,"hp":750,"armor":"air","speed":5.64,"turn":1.5,"sight":8.5,"r":17,"mass":0,"weapons":["w_e00_pla_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"2004","confidence":"high","desc":"The fixed JH-7 - stronger wing, more hardpoints, and crucially the ability to carry precision-guided weapons, which the original could not. This is the aircraft the game fields as the PLA CAS platform. It is now being progressively replaced by the J-16 in the same role.","jet":true,"ammo":6,"radius":40,"rcs":1.2},
  pla_e00_gunship: {"fac":"pla","role":"gunship","cat":"aircraft","layer":"air","name":"Z-10","full":"CAIC Z-10 attack helicopter","cost":1490,"oil":24,"time":21,"hp":615,"armor":"air","speed":3.51,"turn":2.2,"sight":8.9,"r":16,"mass":0,"weapons":["w_e00_pla_gunship"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2012","confidence":"high","desc":"First flight 2003, service 2012. A purpose-built attack helicopter at last - tandem stepped cockpit, narrow fuselage, mast sight, dedicated anti-armour missile. It is persistently underpowered because the intended engine could not be obtained and the domestic WZ-9 was not ready, which is why the Z-10 carries less armou","ammo":8,"hover":true,"radius":23,"rcs":0.8},
  pla_e00_transport: {"fac":"pla","role":"transport","cat":"aircraft","layer":"air","name":"Z-8 / Mi-171 / Z-20","full":"Changhe Z-8 series; Mi-171; Harbin Z-20 from 2019","cost":835,"oil":13,"time":13,"hp":525,"armor":"air","speed":4.06,"turn":2.4,"sight":7.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2001","confidence":"high","desc":"Mi-171s remained the numerical backbone through this era while the Z-8/Z-18 covered heavy lift. The Z-20 - a Black Hawk-class medium helicopter, first flown 2013 - begins entering service around 2019 and finally gives the PLA a modern, high-altitude-capable medium helicopter of its own.","ammo":0,"hover":true,"cargo":9,"radius":33,"rcs":0.95},
  pla_e00_stealthfighter: {"fac":"pla","role":"stealthfighter","cat":"aircraft","layer":"air","name":"J-20","full":"Chengdu J-20 Mighty Dragon","cost":2375,"oil":45,"time":31,"hp":520,"armor":"air","speed":9.4,"turn":2.3,"sight":11.6,"r":16,"mass":0,"weapons":["w_e00_pla_stealthfighter"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"2017","confidence":"high","desc":"First flight January 2011, operational service announced March 2017 - the second operational stealth fighter in the world after the F-22 and F-35. Large, long-ranged and clearly optimised for reaching distant high-value targets like tankers and AEW aircraft rather than for close-in dogfighting. Early aircraft flew on i","jet":true,"ammo":5,"radar":10.7,"radius":52,"rcs":0.01},
  pla_e00_awacs: {"fac":"pla","role":"awacs","cat":"aircraft","layer":"air","name":"KJ-2000 / KJ-500","full":"KJ-2000 (Il-76 airframe, 2007); KJ-200; KJ-500 (2015)","cost":3135,"oil":65,"time":32,"hp":575,"armor":"air","speed":3.96,"turn":0.9,"sight":14.6,"r":25,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"2007","confidence":"high","desc":"The KJ-2000 puts three fixed AESA arrays in a non-rotating dorsal disc - electronically scanned rather than mechanically rotated, which was genuinely ahead of the E-3 concept. Only four were built because Russia would not supply more Il-76 airframes. The KJ-500 on the domestic Y-9 turboprop, from 2015, is the one built","jet":true,"ammo":0,"radar":31,"radius":65,"rcs":3.4},
  pla_e00_ewair: {"fac":"pla","role":"ewair","cat":"aircraft","layer":"air","name":"Y-8G / Y-9 Gaoxin series","full":"Shaanxi Y-8G and Y-9 'Gaoxin' electronic warfare aircraft","cost":2565,"oil":40,"time":30,"hp":540,"armor":"air","speed":7.72,"turn":1.9,"sight":11.6,"r":16,"mass":0,"weapons":["w_e00_pla_ewair"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"2005","confidence":"low","desc":"A family of special-mission turboprops for standoff jamming, communications intelligence and electronic surveillance. Individual variant designations and in-service dates are poorly documented in open sources - most of what is published is inference from photographs of antenna fits.","jet":true,"ammo":4,"radar":14.6,"radius":40,"rcs":0.7},
  pla_e00_sead: {"fac":"pla","role":"sead","cat":"aircraft","layer":"air","name":"JH-7A / J-16 with YJ-91","full":"YJ-91 anti-radiation missile (Kh-31P derivative) on JH-7A and later J-16","cost":1855,"oil":33,"time":25,"hp":450,"armor":"air","speed":8.12,"turn":1.9,"sight":10.7,"r":16,"mass":0,"weapons":["w_e00_pla_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e00","to":"e00","service":"2005","confidence":"medium","desc":"China acquired the Kh-31P and developed the YJ-91 from it, giving the PLAAF a defence-suppression weapon for the first time. Whether the PLAAF has a Wild Weasel doctrine to go with the missile - dedicated crews, emitter libraries, the tactical culture - is much less clear than whether it has the hardware.","jet":true,"ammo":4,"radar":6.8,"radius":40,"rcs":0.65},
  pla_e00_carrier: {"fac":"pla","role":"carrier","cat":"naval","layer":"sea","name":"Liaoning / Shandong","full":"Type 001 Liaoning (2012), Type 002 Shandong (2019)","cost":4655,"oil":103,"time":58,"hp":4130,"armor":"heavy","speed":1.58,"turn":0.6,"sight":13.1,"r":30,"mass":0,"weapons":["w_e00_pla_carrier"],"prereq":["navalyard","lab","airbase"],"tech":3,"from":"e00","to":"e00","service":"2012","confidence":"high","desc":"Liaoning is the rebuilt Soviet Varyag, commissioned September 2012, and was always as much a training ship as a warship. Shandong (2019) is the first Chinese-built carrier, essentially an improved Liaoning. Both use a ski jump, which limits the J-15's fuel and weapon load on launch - a serious operational constraint th","carrier":4,"sonar":4.4,"radar":16.5,"ciws":0.59,"rcs":2.6},
  pla_e00_destroyer: {"fac":"pla","role":"destroyer","cat":"naval","layer":"sea","name":"Type 052C / 052D","full":"Type 052C Luyang II (2004), Type 052D Luyang III (2014)","cost":2070,"oil":31,"time":27,"hp":2095,"armor":"heavy","speed":2.33,"turn":1.2,"sight":10.5,"r":20,"mass":0,"weapons":["w_e00_pla_destroyer","sam_hhq9"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2004","confidence":"high","desc":"The Type 052C in 2004 gave the PLAN an active phased-array radar and vertical launch, putting it in the same conceptual class as Aegis. The 052D refined it with a universal VLS that can launch SAMs, anti-ship missiles, land-attack cruise missiles and ASW rockets from the same cell - and has been built in numbers that n","turret":true,"tturn":1.4,"sonar":8.5,"radar":18.4,"ciws":0.65,"rcs":0.5},
  pla_e00_corvette: {"fac":"pla","role":"corvette","cat":"naval","layer":"sea","name":"Type 056 Jiangdao","full":"Type 056 / 056A Jiangdao-class corvette","cost":1115,"oil":15,"time":15,"hp":1140,"armor":"light","speed":2.82,"turn":1.7,"sight":8.9,"r":17,"mass":0,"weapons":["w_e00_pla_corvette","sam_hq10"],"prereq":["navalyard"],"tech":1,"from":"e00","to":"e00","service":"2013","confidence":"high","desc":"Built at extraordinary speed - over seventy hulls between 2013 and 2021, which is more warships than most navies own in total. The 056A variant adds a towed array for ASW. Production ended in 2021 and around twenty-two hulls were transferred to the Coast Guard, which says something about the type's intended role.","turret":true,"tturn":2,"sonar":6,"ciws":0.43,"rcs":0.4},
  pla_e00_missileboat: {"fac":"pla","role":"missileboat","cat":"naval","layer":"sea","name":"Type 022 Houbei","full":"Type 022 Houbei-class missile catamaran","cost":1395,"oil":20,"time":18,"hp":885,"armor":"light","speed":3.17,"turn":1.85,"sight":8.5,"r":16,"mass":0,"weapons":["w_e00_pla_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2004","confidence":"high","desc":"A wave-piercing catamaran with a low-observable superstructure carrying eight heavy anti-ship missiles, about 83 built. Pure littoral swarm doctrine, unchanged in concept since the Osa boats of 1965 - lots of small cheap hulls each able to kill something far larger, operating under land-based air cover and never far fr","sonar":0,"rcs":0.16},
  pla_e00_sub: {"fac":"pla","role":"sub","cat":"naval","layer":"sub","name":"Type 039A/B Yuan","full":"Type 039A / 039B Yuan-class submarine","cost":2185,"oil":36,"time":28,"hp":1160,"armor":"light","speed":1.88,"turn":1.1,"sight":8,"r":17,"mass":0,"weapons":["w_e00_pla_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2006","confidence":"high","desc":"Air-independent propulsion using a Stirling engine, which lets the boat stay submerged for weeks instead of days. Combines Song hull experience with acoustic lessons from the Kilos. Widely regarded as the most capable conventional submarine China has built and the one that genuinely complicates ASW in the near seas.","sonar":7.8,"quiet":0.27},
  roc_e50_rifle: {"fac":"roc","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Squad","full":"Rifle Squad, M1 Garand / BAR","cost":85,"oil":0,"time":5,"hp":60,"armor":"infantry","speed":0.9,"turn":7,"sight":4,"r":6,"mass":0.1,"weapons":["w_e50_roc_rifle"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1950","confidence":"high","desc":"Standard US 1944-pattern infantry squad, MAP-supplied. Numerous and cheap by ROC standards, since manpower was the one thing the government had brought across in quantity. No night sights, no radios below company."},
  roc_e50_at: {"fac":"roc","role":"at","cat":"infantry","layer":"ground","name":"Bazooka Team","full":"AT Team, M20 3.5in Super Bazooka","cost":220,"oil":0,"time":8,"hp":55,"armor":"infantry","speed":0.76,"turn":6,"sight":4.7,"r":6,"mass":0.1,"weapons":["w_e50_roc_at"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1952","confidence":"medium","desc":"Short-ranged and single-shot. Adequate against the PLA's own captured/Soviet WWII armour, useless past 200m. The 75mm recoilless on a jeep was the real defensive AT weapon of the era."},
  roc_e50_mbt: {"fac":"roc","role":"mbt","cat":"vehicle","layer":"ground","name":"M4 Sherman","full":"M4A3(76) Sherman","cost":760,"oil":10,"time":19,"hp":875,"armor":"heavy","speed":1.29,"turn":1.5,"sight":5.2,"r":16,"mass":50,"weapons":["w_e50_roc_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"~1950","confidence":"medium","desc":"The heaviest thing the ROC Army had. Exact subtypes on Taiwan are poorly documented in open sources -- M4A1, M4A3 and lend-lease M4A4 hulls are all reported. Treat as a mediocre MBT: thin, slow-traversing, no stabilisation.","turret":true,"tturn":1.6,"crush":true},
  roc_e50_lighttank: {"fac":"roc","role":"lighttank","cat":"vehicle","layer":"ground","name":"M41 Walker Bulldog","full":"M41A3 Walker Bulldog","cost":375,"oil":5,"time":10,"hp":470,"armor":"heavy","speed":1.25,"turn":1.6,"sight":4.8,"r":14,"mass":52,"weapons":["w_e50_roc_lighttank"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1958","confidence":"high","desc":"Delivered in time for the 1958 Kinmen crisis and used there. Fast, well-liked, and absurdly long-lived -- the ROC was still running rebuilt M41Ds into the 2000s. If you want one platform to show longevity across five eras, this is it.","turret":true,"tturn":1.4,"crush":true},
  roc_e50_ifv: {"fac":"roc","role":"ifv","cat":"vehicle","layer":"ground","name":"M3 Half-track","full":"M3A1 Half-track Personnel Carrier","cost":515,"oil":5,"time":13,"hp":425,"armor":"light","speed":1.63,"turn":2.1,"sight":4.9,"r":14,"mass":24,"weapons":["w_e50_roc_ifv"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"~1951","confidence":"medium","desc":"Not an IFV in any meaningful sense -- an open-topped truck with armour on the front. No overhead cover, no firing ports, no cannon. The ROC had no infantry fighting vehicle until 2019; be honest about that in the tooltip.","turret":true,"tturn":1.9,"cargo":6},
  roc_e50_spg: {"fac":"roc","role":"spg","cat":"vehicle","layer":"ground","name":"M7 Priest","full":"M7B1 105mm Howitzer Motor Carriage","cost":830,"oil":10,"time":20,"hp":405,"armor":"light","speed":1.16,"turn":1.5,"sight":3.7,"r":15,"mass":29,"weapons":["w_e50_roc_spg"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"~1952","confidence":"low","desc":"Present but marginal. ROC divisional fires in the 1950s were overwhelmingly towed -- M101 105mm, M114 155mm, and the 8-inch M115 battery famously shipped to Kinmen in September 1958 to answer PLA counter-battery. Sources on ROC M7 holdings are thin.","turret":true,"tturn":0.9},
  roc_e50_spaag: {"fac":"roc","role":"spaag","cat":"vehicle","layer":"ground","name":"M16 Quad .50","full":"M16 Multiple Gun Motor Carriage","cost":600,"oil":7,"time":13,"hp":385,"armor":"light","speed":1.59,"turn":2,"sight":6.3,"r":14,"mass":14,"weapons":["w_e50_roc_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"~1952","confidence":"medium","desc":"Half-track with a quad fifty. Effective against propeller aircraft and devastating against infantry in the open; against a jet it is a noise-maker. Optically laid, no radar.","turret":true,"tturn":2.6,"radar":6},
  roc_e50_aa: {"fac":"roc","role":"aa","cat":"infantry","layer":"ground","name":"Bofors AA Gun","full":"40mm Bofors M1 / 90mm M2 AA gun","cost":185,"oil":0,"time":7,"hp":55,"armor":"infantry","speed":0.77,"turn":6,"sight":5,"r":6,"mass":0.1,"weapons":["w_e50_roc_aa"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1951","confidence":"medium","desc":"Gun-only air defence. The 90mm batteries with radar-slaved directors were the serious layer around Taipei and the airfields. No surface-to-air missile of any kind until HAWK and Nike-Hercules arrive around 1960."},
  roc_e50_recon: {"fac":"roc","role":"recon","cat":"vehicle","layer":"ground","name":"M8 Greyhound","full":"M8 Light Armored Car","cost":240,"oil":3,"time":7,"hp":220,"armor":"light","speed":2.36,"turn":3,"sight":6.1,"r":12,"mass":22,"weapons":["w_e50_roc_recon"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"~1950","confidence":"low","desc":"6x6 armoured car. Fast on Taiwan's coastal roads, hopeless off them, and paper-thin. ROC holdings are not well documented; treat the exact fleet size as uncertain.","turret":true,"tturn":2.4},
  roc_e50_fighter: {"fac":"roc","role":"fighter","cat":"aircraft","layer":"air","name":"F-86F Sabre","full":"North American F-86F-30 Sabre","cost":895,"oil":15,"time":20,"hp":230,"armor":"air","speed":7.31,"turn":2,"sight":7.5,"r":15,"mass":0,"weapons":["w_e50_roc_fighter"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1954","confidence":"high","desc":"Around 320 delivered from 1954. The platform that scored the first guided-missile air-to-air kills in history over the Strait on 24 September 1958. Genuinely competitive with the MiG-17 in ROC hands, which is not something you can say about most ROC aircraft in most eras.","jet":true,"ammo":2,"radar":4.2,"radius":32,"rcs":0.6},
  roc_e50_cas: {"fac":"roc","role":"cas","cat":"aircraft","layer":"air","name":"F-84G Thunderjet","full":"Republic F-84G Thunderjet","cost":965,"oil":17,"time":23,"hp":290,"armor":"air","speed":6.19,"turn":1.8,"sight":5.8,"r":16,"mass":0,"weapons":["w_e50_roc_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e50","to":"e50","service":"1953","confidence":"medium","desc":"Straight-wing fighter-bomber, the ROCAF's first jet strike aircraft. Slow and a poor dogfighter, so it was pushed into the ground-attack role. Piston P-47D Thunderbolts were still flying alongside it in the early 1950s.","jet":true,"ammo":3,"radius":28,"rcs":0.7},
  roc_e50_transport: {"fac":"roc","role":"transport","cat":"aircraft","layer":"air","name":"C-46 Commando","full":"Curtiss C-46D Commando","cost":485,"oil":7,"time":13,"hp":280,"armor":"air","speed":3.61,"turn":2.4,"sight":5,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"~1949","confidence":"medium","desc":"Fixed-wing, not a helicopter. Worth flagging: the ROC had no air-assault or helicopter transport capability whatsoever in this era. Airborne movement meant a paradrop or a landing strip. C-47s served alongside.","ammo":0,"hover":true,"cargo":8,"radius":31,"rcs":0.9},
  roc_e50_corvette: {"fac":"roc","role":"corvette","cat":"naval","layer":"sea","name":"Patrol Escort","full":"PCE-842-class patrol craft escort / PC-461-class submarine chaser","cost":665,"oil":8,"time":15,"hp":510,"armor":"light","speed":2.92,"turn":1.9,"sight":4.7,"r":17,"mass":0,"weapons":["w_e50_roc_corvette","aagun_3in50"],"prereq":["navalyard"],"tech":1,"from":"e50","to":"e50","service":"~1948","confidence":"medium","desc":"Ex-USN small combatants, transferred in bulk. These plus landing ships did most of the ROCN's actual work -- offshore island resupply runs under fire.","turret":true,"tturn":2.1,"sonar":1.9,"radar":5.4,"ciws":0.22,"rcs":0.68},
  roc_e50_destroyer: {"fac":"roc","role":"destroyer","cat":"naval","layer":"sea","name":"Tan Yang","full":"Tan Yang (ex-IJN Yukikaze, Kagero-class)","cost":1150,"oil":17,"time":25,"hp":960,"armor":"heavy","speed":1.98,"turn":1.2,"sight":5.2,"r":20,"mass":0,"weapons":["w_e50_roc_destroyer","aagun_5in38"],"prereq":["navalyard","radar"],"tech":2,"from":"e50","to":"e50","service":"1947","confidence":"high","desc":"The most famous ship in ROC service: the luckiest destroyer of the Imperial Japanese Navy, handed over as war reparations and serving as the ROCN flagship until 1966. Rearmed with American guns. Alongside her, ex-USN Cannon- and Rudderow-class destroyer escorts (the Tai-class) were the fleet's backbone.","turret":true,"tturn":1.4,"sonar":4.2,"radar":9,"ciws":0.42,"rcs":0.9},
  roc_e60_rifle: {"fac":"roc","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Squad","full":"Rifle Squad, Type 57 / Type 65","cost":110,"oil":0,"time":5,"hp":75,"armor":"infantry","speed":0.95,"turn":7,"sight":4.6,"r":6,"mass":0.1,"weapons":["w_e60_roc_rifle"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1968","confidence":"medium","desc":"The Type 57 was Taiwan's first mass-produced small arm, a licence M14 built at Hsing Hua. The Type 65 that followed married an M16 receiver to a locally designed gas system -- the beginning of the ROC habit of building rather than buying."},
  roc_e60_at: {"fac":"roc","role":"at","cat":"infantry","layer":"ground","name":"Recoilless Rifle Team","full":"M40A1 106mm recoilless rifle; BGM-71 TOW from late 1970s","cost":275,"oil":0,"time":8,"hp":70,"armor":"infantry","speed":0.79,"turn":6,"sight":5.5,"r":6,"mass":0.1,"weapons":["w_e60_roc_at"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"~1962","confidence":"medium","desc":"The 106mm on a jeep was the ROC's standard beach-defence AT weapon for two decades. TOW arriving at the end of the 1970s is the real generational jump -- the first ROC weapon that could kill a tank at 3km."},
  roc_e60_mbt: {"fac":"roc","role":"mbt","cat":"vehicle","layer":"ground","name":"M48 Patton","full":"M48A3 Patton","cost":940,"oil":13,"time":20,"hp":1075,"armor":"heavy","speed":1.35,"turn":1.5,"sight":6,"r":16,"mass":50,"weapons":["w_e60_roc_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1970s","confidence":"low","desc":"Transfer dates for ROC M48s are genuinely muddy in open sources -- M48A1, M48A3 and later locally converted M48A5 all appear. What is clear is that the M41 remained numerically dominant well past the point the Patton was supposed to replace it.","turret":true,"tturn":1.6,"crush":true},
  roc_e60_lighttank: {"fac":"roc","role":"lighttank","cat":"vehicle","layer":"ground","name":"M41 Walker Bulldog","full":"M41A3 Walker Bulldog","cost":465,"oil":6,"time":11,"hp":575,"armor":"heavy","speed":1.31,"turn":1.6,"sight":5.6,"r":14,"mass":52,"weapons":["w_e60_roc_lighttank"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1958","confidence":"high","desc":"Unchanged and still the most numerous tracked gun vehicle in the force.","turret":true,"tturn":1.4,"crush":true},
  roc_e60_ifv: {"fac":"roc","role":"ifv","cat":"vehicle","layer":"ground","name":"M113 APC","full":"M113A1 Armored Personnel Carrier","cost":640,"oil":6,"time":13,"hp":525,"armor":"light","speed":1.71,"turn":2.1,"sight":5.7,"r":14,"mass":24,"weapons":["w_e60_roc_ifv"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"~1968","confidence":"medium","desc":"Still an APC, not an IFV -- a box that carries eleven men and a machine gun. It matters mainly as the hull the ROC would later copy wholesale as the CM-21.","turret":true,"tturn":1.9,"cargo":6},
  roc_e60_spg: {"fac":"roc","role":"spg","cat":"vehicle","layer":"ground","name":"M110 8-inch","full":"M110 203mm Self-Propelled Howitzer / M108 105mm SPH","cost":1025,"oil":13,"time":22,"hp":500,"armor":"light","speed":1.22,"turn":1.5,"sight":4.3,"r":15,"mass":29,"weapons":["w_e60_roc_spg"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1970s","confidence":"medium","desc":"The ROC's first real self-propelled artillery. Roughly 100 M108 hulls and 70 M110A2 were acquired as ex-US Army stock, and remarkably both were still in the inventory fifty years later.","turret":true,"tturn":0.9},
  roc_e60_mlrs: {"fac":"roc","role":"mlrs","cat":"vehicle","layer":"ground","name":"Kung Feng IV","full":"Kung Feng IV 126mm multiple rocket launcher","cost":1395,"oil":19,"time":26,"hp":450,"armor":"light","speed":1.22,"turn":1.35,"sight":4.2,"r":15,"mass":22,"weapons":["w_e60_roc_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e60","service":"~1976","confidence":"low","desc":"First indigenous rocket artillery, developed by CSIST because nobody would sell the ROC an MLRS. Inaccurate area-saturation weapon aimed squarely at landing beaches. Exact fielding year is not firmly established in open sources.","turret":true,"tturn":0.85},
  roc_e60_spaag: {"fac":"roc","role":"spaag","cat":"vehicle","layer":"ground","name":"M42 Duster","full":"M42A1 Duster","cost":740,"oil":9,"time":14,"hp":475,"armor":"light","speed":1.67,"turn":2,"sight":7.4,"r":14,"mass":14,"weapons":["w_e60_roc_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1960s","confidence":"medium","desc":"Twin Bofors on an M41 chassis -- same hull, same parts bin, which is exactly why the ROC took it. Optically aimed only. By the 1970s it was more useful shooting at boats and bunkers than aircraft.","turret":true,"tturn":2.6,"radar":7},
  roc_e60_aa: {"fac":"roc","role":"aa","cat":"infantry","layer":"ground","name":"HAWK SAM","full":"MIM-23 HAWK; MIM-14 Nike-Hercules","cost":230,"oil":0,"time":7,"hp":65,"armor":"infantry","speed":0.81,"turn":6,"sight":5.9,"r":6,"mass":0.1,"weapons":["w_e60_roc_aa"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"~1960","confidence":"medium","desc":"The ROC's first surface-to-air missiles and the foundation of an air defence network that has been continuously layered ever since. Nike-Hercules also gave Taiwan a latent surface-to-surface option, which is where the later Tien Kung programme traces from."},
  roc_e60_recon: {"fac":"roc","role":"recon","cat":"vehicle","layer":"ground","name":"M41 Recon Element","full":"M41A3 Walker Bulldog in the reconnaissance role","cost":295,"oil":3,"time":7,"hp":270,"armor":"light","speed":2.48,"turn":3,"sight":7.1,"r":12,"mass":22,"weapons":["w_e60_roc_recon"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1958","confidence":"low","desc":"Be candid: the ROC fielded no purpose-built armoured reconnaissance vehicle in this era. Cavalry work was done by M41s and M151 jeeps. A dedicated scout car does not appear until the V-150 in the 1980s.","turret":true,"tturn":2.4},
  roc_e60_fighter: {"fac":"roc","role":"fighter","cat":"aircraft","layer":"air","name":"F-104G Starfighter","full":"Lockheed F-104G Starfighter","cost":1110,"oil":19,"time":22,"hp":280,"armor":"air","speed":7.74,"turn":2,"sight":8.8,"r":15,"mass":0,"weapons":["w_e60_roc_fighter"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1960","confidence":"high","desc":"An initial batch of 24 ex-USAF F-104A and 5 F-104B arrived 1960-61, with F-104G following. Blisteringly fast, murderous to fly, and the ROCAF lost a great many of them. It served an extraordinary 38 years, retiring only in 1998.","jet":true,"ammo":3,"radar":4.9,"radius":40,"rcs":0.6},
  roc_e60_cas: {"fac":"roc","role":"cas","cat":"aircraft","layer":"air","name":"F-100 Super Sabre","full":"North American F-100A Super Sabre","cost":1195,"oil":21,"time":24,"hp":360,"armor":"air","speed":6.48,"turn":1.8,"sight":6.7,"r":16,"mass":0,"weapons":["w_e60_roc_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e60","service":"1960","confidence":"medium","desc":"Six F-100Fs were rushed to the ROCAF under MAP during the August 1958 crisis with more following; F-100As equipped ROCAF units from around 1960. Used mainly as a fighter-bomber.","jet":true,"ammo":3,"radius":28,"rcs":0.7},
  roc_e60_gunship: {"fac":"roc","role":"gunship","cat":"aircraft","layer":"air","name":"none","full":"no attack helicopter in ROC service","cost":1055,"oil":16,"time":21,"hp":395,"armor":"air","speed":3.24,"turn":2.2,"sight":7.1,"r":16,"mass":0,"weapons":["w_e60_roc_gunship"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"n/a","confidence":"high","desc":"The ROC Army had no armed helicopter of any kind in this era. The first TOW-armed helicopters (Hughes 500MD Defenders) do not arrive until around 1980, and a purpose-built attack helicopter not until the AH-1W in 1993. Skip this role.","ammo":5,"hover":true,"radius":23,"rcs":0.75},
  roc_e60_transport: {"fac":"roc","role":"transport","cat":"aircraft","layer":"air","name":"UH-1H Iroquois","full":"Bell UH-1H Iroquois (AIDC licence-built)","cost":600,"oil":9,"time":13,"hp":345,"armor":"air","speed":3.78,"turn":2.4,"sight":5.9,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1970","confidence":"medium","desc":"AIDC assembled 118 airframes on Taiwan. The ROC's first real helicopter lift, and the platform that gave the Army the ability to shift infantry along the coast faster than a landing could develop -- the doctrinal idea that still drives the modern UH-60M fleet.","ammo":0,"hover":true,"cargo":8,"radius":32,"rcs":0.9},
  roc_e60_corvette: {"fac":"roc","role":"corvette","cat":"naval","layer":"sea","name":"Patrol Escort","full":"PCE-842-class / Auk-class conversions","cost":825,"oil":10,"time":16,"hp":625,"armor":"light","speed":3.06,"turn":1.9,"sight":5.5,"r":17,"mass":0,"weapons":["w_e60_roc_corvette","aagun_3in50"],"prereq":["navalyard"],"tech":1,"from":"e60","to":"e60","service":"~1948","confidence":"medium","desc":"Same WWII hulls, now twenty-five years old, still doing offshore-island escort work.","turret":true,"tturn":2.1,"sonar":2.2,"radar":6.3,"ciws":0.24,"rcs":0.68},
  roc_e60_destroyer: {"fac":"roc","role":"destroyer","cat":"naval","layer":"sea","name":"Gearing DD","full":"Chao Yang-class (ex-USN Gearing-class); also Fletcher- and Allen M. Sumner-class transfers","cost":1425,"oil":21,"time":26,"hp":1185,"armor":"heavy","speed":2.07,"turn":1.2,"sight":6,"r":20,"mass":0,"weapons":["w_e60_roc_destroyer","aagun_5in38"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"~1971","confidence":"medium","desc":"Bulk transfers of WWII US destroyers ran from the late 1960s through 1980 and gave the ROCN its first genuine fleet destroyers since Tan Yang. Individual transfer dates vary ship by ship and open sources disagree on several.","turret":true,"tturn":1.4,"sonar":4.9,"radar":10.5,"ciws":0.46,"rcs":1},
  roc_e60_sub: {"fac":"roc","role":"sub","cat":"naval","layer":"sub","name":"Hai Shih SSK","full":"Hai Shih (ex-USS Cutlass) and Hai Pao (ex-USS Tusk), Tench-class GUPPY II","cost":1455,"oil":22,"time":26,"hp":735,"armor":"light","speed":1.62,"turn":1.05,"sight":5.9,"r":17,"mass":0,"weapons":["w_e60_roc_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1973","confidence":"high","desc":"Arrived April and October 1973. Preceded by two Italian COS.MO.S SX-404 midget submarines commissioned 8 October 1969 -- the first ROC submarines ever, retired in 1973. Hai Shih went on to become the oldest submarine in commission anywhere in the world.","sonar":4.2,"quiet":0.69},
  roc_e60_missileboat: {"fac":"roc","role":"missileboat","cat":"naval","layer":"sea","name":"Hai Ou","full":"Hai Ou-class fast attack craft (Dvora derivative)","cost":1055,"oil":14,"time":18,"hp":565,"armor":"light","speed":2.88,"turn":1.9,"sight":6.7,"r":16,"mass":0,"weapons":["w_e60_roc_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1978","confidence":"medium","desc":"The ROC's first missile-armed vessel, an Israeli Dvora hull built locally and paired with the indigenous Hsiung Feng I (itself a reverse-engineered Gabriel). Fifty were built. Fielding dates by hull are not precisely documented.","sonar":0,"radar":6.3,"rcs":0.35},
  roc_e80_rifle: {"fac":"roc","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Squad","full":"Rifle Squad, Type 65K1","cost":140,"oil":0,"time":5,"hp":95,"armor":"infantry","speed":1,"turn":7,"sight":5.5,"r":6,"mass":0.1,"weapons":["w_e80_roc_rifle"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1980s","confidence":"medium","desc":"Indigenous rifle of mixed reputation -- early Type 65s had reliability problems that the K1 and K2 revisions chased. The T74 general-purpose machine gun from this era is still in the game's e20 roster as mg_r."},
  roc_e80_at: {"fac":"roc","role":"at","cat":"infantry","layer":"ground","name":"TOW Team","full":"BGM-71 TOW; CM-25 TOW carrier","cost":350,"oil":0,"time":9,"hp":85,"armor":"infantry","speed":0.84,"turn":6,"sight":6.6,"r":6,"mass":0.1,"weapons":["w_e80_roc_at"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"~1980","confidence":"medium","desc":"Tube-launched, wire-guided, and the gunner has to sit still and track the target all the way to impact -- which on an open beach is a short career. Mounted version built on the CM-21 hull as the CM-25."},
  roc_e80_mbt: {"fac":"roc","role":"mbt","cat":"vehicle","layer":"ground","name":"M48A5 Patton","full":"M48A5 Patton","cost":1205,"oil":16,"time":21,"hp":1325,"armor":"heavy","speed":1.42,"turn":1.5,"sight":7.2,"r":16,"mass":50,"weapons":["w_e80_roc_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"~1984","confidence":"medium","desc":"Locally converted older M48 hulls up-gunned to 105mm. Still a 1950s tank with a better gun -- no thermal sight, no composite armour, no stabilisation worth the name. The ROC would not have a genuinely modern tank until the M1A2T arrived in 2024.","turret":true,"tturn":1.6,"crush":true},
  roc_e80_lighttank: {"fac":"roc","role":"lighttank","cat":"vehicle","layer":"ground","name":"M41 Walker Bulldog","full":"M41A3 Walker Bulldog","cost":600,"oil":7,"time":12,"hp":710,"armor":"heavy","speed":1.38,"turn":1.6,"sight":6.7,"r":14,"mass":52,"weapons":["w_e80_roc_lighttank"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1958","confidence":"high","desc":"Thirty years old and still in front-line service.","turret":true,"tturn":1.4,"crush":true},
  roc_e80_ifv: {"fac":"roc","role":"ifv","cat":"vehicle","layer":"ground","name":"CM-21","full":"CM-21 Armoured Personnel Carrier","cost":820,"oil":8,"time":14,"hp":650,"armor":"light","speed":1.81,"turn":2.1,"sight":6.9,"r":14,"mass":24,"weapons":["w_e80_roc_ifv"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"early 1980s","confidence":"low","desc":"Indigenous M113 derivative, the ROC's first mass-produced armoured vehicle. Open sources disagree on when it entered service -- 1982 and 1987 are both cited. Still an APC: it carries infantry, it does not fight alongside them.","turret":true,"tturn":1.9,"cargo":6},
  roc_e80_spg: {"fac":"roc","role":"spg","cat":"vehicle","layer":"ground","name":"M109A2","full":"M109A1B / M109A2 155mm Self-Propelled Howitzer","cost":1315,"oil":16,"time":23,"hp":615,"armor":"light","speed":1.28,"turn":1.5,"sight":5.2,"r":15,"mass":29,"weapons":["w_e80_roc_spg"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1981","confidence":"medium","desc":"Taiwan's first M109 purchase was in 1981 (M109A1B, then M109A2). M110A2 8-inch stayed alongside for heavy counter-battery. Manually laid -- the digitised autonomous-laying capability the game's spg_r advertises does not exist yet.","turret":true,"tturn":0.9},
  roc_e80_mlrs: {"fac":"roc","role":"mlrs","cat":"vehicle","layer":"ground","name":"Kung Feng VI","full":"Kung Feng VI 117mm multiple rocket launcher","cost":1790,"oil":25,"time":29,"hp":555,"armor":"light","speed":1.28,"turn":1.35,"sight":5,"r":15,"mass":22,"weapons":["w_e80_roc_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e80","to":"e80","service":"1981","confidence":"medium","desc":"CSIST's 45-tube truck-mounted MRL, the mainstay of ROC rocket artillery for thirty years and explicitly a beach-saturation weapon. The Mk15 rocket carries roughly 6,400 steel balls -- anti-personnel, not anti-armour. Replaced by the RT-2000.","turret":true,"tturn":0.85},
  roc_e80_spaag: {"fac":"roc","role":"spaag","cat":"vehicle","layer":"ground","name":"Chaparral","full":"MIM-72 Chaparral","cost":950,"oil":11,"time":15,"hp":585,"armor":"light","speed":1.76,"turn":2,"sight":8.8,"r":14,"mass":14,"weapons":["w_e80_roc_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1980s","confidence":"medium","desc":"A short-range IR SAM vehicle rather than a gun system -- the direct ancestor of the game's Antelope. Tail-chase only in its early forms, so it defends what is behind it, not what is in front. M42 Dusters soldiered on beside it.","turret":true,"tturn":2.6,"radar":8.4},
  roc_e80_aa: {"fac":"roc","role":"aa","cat":"infantry","layer":"ground","name":"Improved HAWK","full":"MIM-23B Improved HAWK","cost":290,"oil":0,"time":8,"hp":80,"armor":"infantry","speed":0.86,"turn":6,"sight":7.1,"r":6,"mass":0.1,"weapons":["w_e80_roc_aa"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1980s","confidence":"medium","desc":"Upgraded HAWK batteries plus surviving Nike-Hercules sites. Tien Kung (Sky Bow) development runs through this decade but does not field until the 1990s."},
  roc_e80_recon: {"fac":"roc","role":"recon","cat":"vehicle","layer":"ground","name":"V-150 Commando","full":"Cadillac Gage V-150 Commando","cost":380,"oil":4,"time":8,"hp":330,"armor":"light","speed":2.61,"turn":3,"sight":8.6,"r":12,"mass":22,"weapons":["w_e80_roc_recon"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1980s","confidence":"medium","desc":"The ROC's first dedicated wheeled scout vehicle. Amphibious, fast on road, negligible protection. Widely used by the Military Police as well as the Army.","turret":true,"tturn":2.4},
  roc_e80_fighter: {"fac":"roc","role":"fighter","cat":"aircraft","layer":"air","name":"F-5E Tiger II","full":"Northrop F-5E/F Tiger II (AIDC-built)","cost":1425,"oil":24,"time":23,"hp":350,"armor":"air","speed":8.17,"turn":2,"sight":10.5,"r":15,"mass":0,"weapons":["w_e80_roc_fighter"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1974","confidence":"high","desc":"This is the era's headline capability gap. For the whole of the 1980s the ROCAF's best fighter was a lightweight day fighter with no beyond-visual-range missile, because the 1982 communique blocked the F-16 and the F-20. F-104Gs made up the rest.","jet":true,"ammo":4,"radar":5.9,"radius":41,"rcs":0.6},
  roc_e80_cas: {"fac":"roc","role":"cas","cat":"aircraft","layer":"air","name":"AT-3 Tzu Chung","full":"AIDC AT-3A/B Tzu Chung","cost":1535,"oil":26,"time":26,"hp":440,"armor":"air","speed":6.84,"turn":1.8,"sight":8.1,"r":16,"mass":0,"weapons":["w_e80_roc_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1984","confidence":"medium","desc":"Indigenous twin-engine jet trainer pressed into light attack. Modest payload and no self-protection, but it was designed and built entirely on Taiwan, which was the point.","jet":true,"ammo":4,"radius":29,"rcs":0.7},
  roc_e80_gunship: {"fac":"roc","role":"gunship","cat":"aircraft","layer":"air","name":"500MD Defender","full":"Hughes 500MD/TOW Defender","cost":1350,"oil":20,"time":22,"hp":490,"armor":"air","speed":3.42,"turn":2.2,"sight":8.6,"r":16,"mass":0,"weapons":["w_e80_roc_gunship"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"~1980","confidence":"low","desc":"The ROC's first armed helicopter -- roughly 26 acquired, some in an ASW configuration. Tiny, unarmoured and easily shot down, but it put a guided anti-tank missile in the air for the first time. Exact delivery year is not firmly established.","ammo":6,"hover":true,"radius":23,"rcs":0.75},
  roc_e80_transport: {"fac":"roc","role":"transport","cat":"aircraft","layer":"air","name":"UH-1H Iroquois","full":"Bell UH-1H Iroquois","cost":765,"oil":11,"time":14,"hp":425,"armor":"air","speed":3.99,"turn":2.4,"sight":7.1,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1970","confidence":"medium","desc":"Unchanged.","ammo":0,"hover":true,"cargo":8,"radius":33,"rcs":0.9},
  roc_e80_corvette: {"fac":"roc","role":"corvette","cat":"naval","layer":"sea","name":"Lung Chiang PGG","full":"Lung Chiang-class patrol gunboat, guided missile","cost":1060,"oil":13,"time":17,"hp":775,"armor":"light","speed":3.23,"turn":1.9,"sight":6.6,"r":17,"mass":0,"weapons":["w_e80_roc_corvette","aagun_lt"],"prereq":["navalyard"],"tech":1,"from":"e80","to":"e80","service":"1978","confidence":"medium","desc":"Only two hulls were built -- an ambitious design that proved expensive and was not repeated. Worth including precisely because it shows how thin ROC surface procurement was between 1979 and 1993.","turret":true,"tturn":2.1,"sonar":2.7,"radar":7.6,"ciws":0.27,"rcs":0.52},
  roc_e80_destroyer: {"fac":"roc","role":"destroyer","cat":"naval","layer":"sea","name":"Wu Chin III DDG","full":"Chao Yang-class Gearing, Wu Chin III conversion","cost":1825,"oil":26,"time":29,"hp":1460,"armor":"heavy","speed":2.18,"turn":1.2,"sight":7.2,"r":20,"mass":0,"weapons":["w_e80_roc_destroyer","sam_sm1"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1983","confidence":"medium","desc":"Four WWII Gearing-class destroyers rebuilt 1983-1986 into missile ships with local combat systems -- one of the more remarkable engineering efforts of the era, and a direct consequence of nobody being willing to sell Taiwan new hulls. Forty-year-old ships firing modern missiles.","turret":true,"tturn":1.4,"sonar":5.9,"radar":12.6,"ciws":0.52,"rcs":1.05},
  roc_e80_sub: {"fac":"roc","role":"sub","cat":"naval","layer":"sub","name":"Hai Lung SSK","full":"Hai Lung-class (Zwaardvis-derived) diesel-electric submarine","cost":1860,"oil":28,"time":28,"hp":910,"armor":"light","speed":1.71,"turn":1.05,"sight":7.1,"r":17,"mass":0,"weapons":["w_e80_roc_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1987","confidence":"high","desc":"Two boats, Hai Lung and Hai Hu, delivered 1987-88. The Netherlands refused all follow-on orders under PRC pressure. These two, plus the two 1940s GUPPY boats, are the entire ROC submarine force for the next four decades -- the deepest single capability hole in this roster.","sonar":5,"quiet":0.56},
  roc_e80_missileboat: {"fac":"roc","role":"missileboat","cat":"naval","layer":"sea","name":"Hai Ou","full":"Hai Ou-class fast attack craft","cost":1350,"oil":18,"time":20,"hp":695,"armor":"light","speed":3.04,"turn":1.9,"sight":8.1,"r":16,"mass":0,"weapons":["w_e80_roc_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1978","confidence":"medium","desc":"Unchanged; roughly fifty in service by the mid-1980s.","sonar":0,"radar":7.6,"rcs":0.35},
  roc_e90_rifle: {"fac":"roc","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Squad","full":"Rifle Squad, T86","cost":165,"oil":0,"time":6,"hp":105,"armor":"infantry","speed":1.03,"turn":7,"sight":6.1,"r":6,"mass":0.1,"weapons":["w_e90_roc_rifle"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"~1999","confidence":"medium","desc":"Shortened, lighter replacement for the Type 65 family, developed for a force expected to fight in built-up coastal terrain. Type 65K2 remained in bulk service alongside it well past 2000."},
  roc_e90_at: {"fac":"roc","role":"at","cat":"infantry","layer":"ground","name":"TOW-2A Team","full":"BGM-71E TOW-2A","cost":415,"oil":0,"time":9,"hp":100,"armor":"infantry","speed":0.86,"turn":6,"sight":7.2,"r":6,"mass":0.1,"weapons":["w_e90_roc_at"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1990s","confidence":"medium","desc":"Tandem warhead to defeat reactive armour. Still wire-guided and still requires the gunner to stay exposed through flight -- the top-attack Javelin that fixes this does not arrive until the 2000s."},
  roc_e90_mbt: {"fac":"roc","role":"mbt","cat":"vehicle","layer":"ground","name":"CM-11 Brave Tiger","full":"CM-11 (M48H) Brave Tiger","cost":1420,"oil":19,"time":23,"hp":1495,"armor":"heavy","speed":1.47,"turn":1.5,"sight":7.9,"r":16,"mass":50,"weapons":["w_e90_roc_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1990","confidence":"high","desc":"Publicly unveiled 14 April 1990. An M60 hull carrying a modified M48-pattern turret fitted with the M1 Abrams' fire control and stabilisation -- exactly what the game's mbt_r describes. Mediocre protection, genuinely good first-round hit probability. The CM-12 applied the same fire control to older M48A3 hulls.","turret":true,"tturn":1.6,"crush":true},
  roc_e90_lighttank: {"fac":"roc","role":"lighttank","cat":"vehicle","layer":"ground","name":"M60A3 TTS","full":"M60A3 TTS","cost":705,"oil":9,"time":12,"hp":800,"armor":"heavy","speed":1.42,"turn":1.6,"sight":7.4,"r":14,"mass":52,"weapons":["w_e90_roc_lighttank"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1994","confidence":"medium","desc":"About 160 delivered 1994-96. The thermal sight is the important part -- it is the first ROC vehicle that can fight properly at night. The game correctly treats this as heavy armour available early.","turret":true,"tturn":1.4,"crush":true},
  roc_e90_ifv: {"fac":"roc","role":"ifv","cat":"vehicle","layer":"ground","name":"CM-21","full":"CM-21 Armoured Personnel Carrier","cost":965,"oil":9,"time":15,"hp":730,"armor":"light","speed":1.86,"turn":2.1,"sight":7.5,"r":14,"mass":24,"weapons":["w_e90_roc_ifv"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"early 1980s","confidence":"low","desc":"Unchanged. Still no true IFV in ROC service.","turret":true,"tturn":1.9,"cargo":6},
  roc_e90_spg: {"fac":"roc","role":"spg","cat":"vehicle","layer":"ground","name":"M109A5","full":"M109A2 / M109A5 155mm Self-Propelled Howitzer","cost":1550,"oil":19,"time":25,"hp":695,"armor":"light","speed":1.32,"turn":1.5,"sight":5.7,"r":15,"mass":29,"weapons":["w_e90_roc_spg"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1998","confidence":"medium","desc":"Purchased during the fallout from the 1995-96 crisis and delivered in 1998; over 200 M109A2/A5 in service. This -- not the M109A6 the game currently fields -- is the ROC's actual modern self-propelled gun. See notes.","turret":true,"tturn":0.9},
  roc_e90_mlrs: {"fac":"roc","role":"mlrs","cat":"vehicle","layer":"ground","name":"Kung Feng VI","full":"Kung Feng VI 117mm MRL","cost":2105,"oil":29,"time":30,"hp":625,"armor":"light","speed":1.32,"turn":1.35,"sight":5.5,"r":15,"mass":22,"weapons":["w_e90_roc_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e90","to":"e90","service":"1981","confidence":"medium","desc":"Unchanged and still the only rocket artillery in service.","turret":true,"tturn":0.85},
  roc_e90_spaag: {"fac":"roc","role":"spaag","cat":"vehicle","layer":"ground","name":"Avenger","full":"AN/TWQ-1 Avenger","cost":1120,"oil":13,"time":16,"hp":660,"armor":"light","speed":1.81,"turn":2,"sight":9.7,"r":14,"mass":14,"weapons":["w_e90_roc_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1997","confidence":"medium","desc":"Humvee-mounted Stinger turret, around 74 acquired. Chaparral continued in service. Short-ranged point defence only -- the area SAM job belongs to Patriot and Sky Bow.","turret":true,"tturn":2.6,"radar":9.2},
  roc_e90_aa: {"fac":"roc","role":"aa","cat":"infantry","layer":"ground","name":"Patriot PAC-2","full":"MIM-104 Patriot / Modified Air Defense System (MADS)","cost":345,"oil":0,"time":8,"hp":95,"armor":"infantry","speed":0.88,"turn":6,"sight":7.7,"r":6,"mass":0.1,"weapons":["w_e90_roc_aa"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1998","confidence":"medium","desc":"Bought explicitly as ballistic missile defence after the PLA fired M-9s into the water off Keelung and Kaohsiung in 1996. Alongside it the indigenous Tien Kung I/II (Sky Bow) entered service around 1993 -- Taiwan's first home-built area SAM."},
  roc_e90_recon: {"fac":"roc","role":"recon","cat":"vehicle","layer":"ground","name":"V-150 Commando","full":"Cadillac Gage V-150 Commando","cost":445,"oil":5,"time":8,"hp":375,"armor":"light","speed":2.7,"turn":3,"sight":9.4,"r":12,"mass":22,"weapons":["w_e90_roc_recon"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1980s","confidence":"medium","desc":"Unchanged.","turret":true,"tturn":2.4},
  roc_e90_fighter: {"fac":"roc","role":"fighter","cat":"aircraft","layer":"air","name":"F-16A/B Block 20","full":"General Dynamics F-16A/B Block 20 MLU","cost":1675,"oil":28,"time":25,"hp":390,"armor":"air","speed":8.43,"turn":2,"sight":11.5,"r":15,"mass":0,"weapons":["w_e90_roc_fighter"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1997","confidence":"high","desc":"150 aircraft, approved 1992 and delivered from 1997. The ROCAF's first genuinely modern fighter and still, upgraded, the backbone of the force thirty years on.","jet":true,"ammo":4,"radar":6.4,"radius":41,"rcs":0.5},
  roc_e90_cas: {"fac":"roc","role":"cas","cat":"aircraft","layer":"air","name":"F-CK-1 Ching-kuo","full":"AIDC F-CK-1A/B Ching-kuo (Indigenous Defence Fighter)","cost":1805,"oil":31,"time":27,"hp":500,"armor":"air","speed":7.06,"turn":1.8,"sight":8.8,"r":16,"mass":0,"weapons":["w_e90_roc_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1994","confidence":"high","desc":"Built because the US refused to sell F-16s in the 1980s, with substantial quiet American design assistance. 130 produced. Short-legged and light on payload, but it is a fourth-generation fighter designed and built on an island of 20 million people.","jet":true,"ammo":5,"radius":30,"rcs":0.7},
  roc_e90_gunship: {"fac":"roc","role":"gunship","cat":"aircraft","layer":"air","name":"AH-1W SuperCobra","full":"Bell AH-1W SuperCobra","cost":1590,"oil":24,"time":24,"hp":550,"armor":"air","speed":3.53,"turn":2.2,"sight":9.4,"r":16,"mass":0,"weapons":["w_e90_roc_gunship"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1993","confidence":"high","desc":"63 aircraft. The ROC's first purpose-built attack helicopter, and a large fleet for the size of the island. Still in service today alongside the AH-64E.","ammo":7,"hover":true,"radius":24,"rcs":0.75},
  roc_e90_transport: {"fac":"roc","role":"transport","cat":"aircraft","layer":"air","name":"UH-1H Iroquois","full":"Bell UH-1H Iroquois","cost":905,"oil":13,"time":15,"hp":480,"armor":"air","speed":4.12,"turn":2.4,"sight":7.7,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1970","confidence":"medium","desc":"Still the lift helicopter. CH-47SD Chinooks follow in 2002.","ammo":0,"hover":true,"cargo":8,"radius":34,"rcs":0.9},
  roc_e90_awacs: {"fac":"roc","role":"awacs","cat":"aircraft","layer":"air","name":"E-2T Hawkeye","full":"Northrop Grumman E-2T Hawkeye","cost":2580,"oil":52,"time":29,"hp":465,"armor":"air","speed":4.31,"turn":1,"sight":12.9,"r":22,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e90","to":"e90","service":"1995","confidence":"high","desc":"Four aircraft delivered 1995 -- the ROC's first airborne early warning capability and the keystone of its air defence. Taiwan's ground radars are fixed, known and targetable; the E-2 is the part of the sensor network that can move.","jet":true,"ammo":0,"radar":25.8,"radius":54,"rcs":2.6},
  roc_e90_corvette: {"fac":"roc","role":"corvette","cat":"naval","layer":"sea","name":"Chin Chiang PGG","full":"Chin Chiang-class patrol gunboat","cost":1245,"oil":15,"time":18,"hp":870,"armor":"light","speed":3.33,"turn":1.9,"sight":7.2,"r":17,"mass":0,"weapons":["w_e90_roc_corvette","aagun_lt"],"prereq":["navalyard"],"tech":1,"from":"e90","to":"e90","service":"1994","confidence":"medium","desc":"Twelve locally built hulls. Later upgraded under a Wu Chin III-branded programme with HF-2/HF-3 missiles and W-160 fire control from 2004.","turret":true,"tturn":2.1,"sonar":2.9,"radar":8.3,"ciws":0.28,"rcs":0.62},
  roc_e90_destroyer: {"fac":"roc","role":"destroyer","cat":"naval","layer":"sea","name":"Cheng Kung FFG","full":"Cheng Kung-class (Oliver Hazard Perry-class, licence-built)","cost":2150,"oil":31,"time":30,"hp":1645,"armor":"heavy","speed":2.25,"turn":1.2,"sight":7.9,"r":20,"mass":0,"weapons":["w_e90_roc_destroyer","sam_sm1"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1993","confidence":"high","desc":"Eight built at CSBC on Taiwan. Alongside them the Chi Yang-class (ex-USN Knox-class, from 1993) and the French Kang Ding-class (La Fayette, from 1996) -- three new frigate classes in four years, which is the whole 1990s procurement story in one line.","turret":true,"tturn":1.4,"sonar":6.4,"radar":13.8,"ciws":0.55,"rcs":1.1},
  roc_e90_sub: {"fac":"roc","role":"sub","cat":"naval","layer":"sub","name":"Hai Lung SSK","full":"Hai Lung-class diesel-electric submarine","cost":2195,"oil":33,"time":29,"hp":1025,"armor":"light","speed":1.76,"turn":1.05,"sight":7.7,"r":17,"mass":0,"weapons":["w_e90_roc_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1987","confidence":"high","desc":"Unchanged, and no replacements available at any price.","sonar":5.5,"quiet":0.5},
  roc_e90_missileboat: {"fac":"roc","role":"missileboat","cat":"naval","layer":"sea","name":"Hai Ou","full":"Hai Ou-class fast attack craft","cost":1590,"oil":21,"time":21,"hp":785,"armor":"light","speed":3.14,"turn":1.9,"sight":8.8,"r":16,"mass":0,"weapons":["w_e90_roc_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1978","confidence":"medium","desc":"Ageing but still numerous.","sonar":0,"radar":8.3,"rcs":0.35},
  roc_e00_rifle: {"fac":"roc","role":"rifle","cat":"infantry","layer":"ground","name":"Infantry Squad","full":"Rifle Squad, T91","cost":180,"oil":0,"time":6,"hp":115,"armor":"infantry","speed":1.04,"turn":7,"sight":6.4,"r":6,"mass":0.1,"weapons":["w_e00_roc_rifle"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2003","confidence":"high","desc":"The current ROC service rifle, an evolution of the T86 with a flat-top rail for optics. This is the game's existing rifle_r."},
  roc_e00_at: {"fac":"roc","role":"at","cat":"infantry","layer":"ground","name":"Javelin Team","full":"FGM-148 Javelin","cost":455,"oil":0,"time":10,"hp":105,"armor":"infantry","speed":0.87,"turn":6,"sight":7.6,"r":6,"mass":0.1,"weapons":["w_e00_roc_at"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2000s","confidence":"medium","desc":"Ordered in 2002 and delivered through the decade. Fire-and-forget top-attack changes ROC beach defence completely: the gunner shoots and moves instead of tracking to impact. The indigenous Kestrel (Hung Chien) light rocket from 2012 supplements it at short range."},
  roc_e00_mbt: {"fac":"roc","role":"mbt","cat":"vehicle","layer":"ground","name":"CM-11 Brave Tiger","full":"CM-11 (M48H) Brave Tiger","cost":1570,"oil":21,"time":24,"hp":1615,"armor":"heavy","speed":1.49,"turn":1.5,"sight":8.3,"r":16,"mass":50,"weapons":["w_e00_roc_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"1990","confidence":"high","desc":"Unchanged and increasingly outclassed -- by 2010 it is a 105mm gun on a 1950s hull facing Type 96 and Type 99 tanks.","turret":true,"tturn":1.6,"crush":true},
  roc_e00_lighttank: {"fac":"roc","role":"lighttank","cat":"vehicle","layer":"ground","name":"M41D","full":"M41D (M41 Walker Bulldog rebuild)","cost":780,"oil":10,"time":13,"hp":865,"armor":"heavy","speed":1.44,"turn":1.6,"sight":7.8,"r":14,"mass":52,"weapons":["w_e00_roc_lighttank"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"~2001","confidence":"medium","desc":"A 1958 tank given a diesel engine, a new fire control system and add-on armour to keep it running into the 21st century. That the ROC did this rather than buy a new light tank tells you everything about the procurement environment.","turret":true,"tturn":1.4,"crush":true},
  roc_e00_ifv: {"fac":"roc","role":"ifv","cat":"vehicle","layer":"ground","name":"CM-32 Yunpao","full":"CM-32 Yunpao (Clouded Leopard) 8x8","cost":1065,"oil":10,"time":16,"hp":785,"armor":"light","speed":1.88,"turn":2.1,"sight":8,"r":14,"mass":24,"weapons":["w_e00_roc_ifv"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2007","confidence":"high","desc":"Taiwan's first indigenous 8x8, armed with a 40mm grenade launcher or a .50 in a remote mount. The 30mm CM-34 that replaces it does not arrive until 2019.","turret":true,"tturn":1.9,"cargo":6},
  roc_e00_spg: {"fac":"roc","role":"spg","cat":"vehicle","layer":"ground","name":"M109A5","full":"M109A2 / M109A5 155mm SPH","cost":1710,"oil":21,"time":25,"hp":750,"armor":"light","speed":1.34,"turn":1.5,"sight":6,"r":15,"mass":29,"weapons":["w_e00_roc_spg"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"1998","confidence":"medium","desc":"Unchanged. Attempts to replace it with the M109A6 Paladin collapsed (see notes).","turret":true,"tturn":0.9},
  roc_e00_mlrs: {"fac":"roc","role":"mlrs","cat":"vehicle","layer":"ground","name":"Thunderbolt-2000","full":"NCSIST RT-2000 Thunderbolt-2000","cost":2330,"oil":32,"time":31,"hp":670,"armor":"light","speed":1.34,"turn":1.35,"sight":5.8,"r":15,"mass":22,"weapons":["w_e00_roc_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e00","to":"e00","service":"2012","confidence":"high","desc":"Entered service in LATE 2012, not the early 2000s -- worth correcting if your e00 gating assumes otherwise. Purpose-built to break up landing craft at the waterline, replacing the Kung Feng VI. The game's mlrs_r.","turret":true,"tturn":0.85},
  roc_e00_spaag: {"fac":"roc","role":"spaag","cat":"vehicle","layer":"ground","name":"Antelope AD","full":"Antelope Air Defence System (TC-1L)","cost":1235,"oil":14,"time":17,"hp":710,"armor":"light","speed":1.83,"turn":2,"sight":10.2,"r":14,"mass":14,"weapons":["w_e00_roc_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2005","confidence":"medium","desc":"Development began 1995, publicly shown in 1997 exercises, entered service in 2005. A Chaparral successor firing the ground-launched version of Taiwan's indigenous Sky Sword I. The game's spaag_r, correctly described as a SAM vehicle rather than a gun system.","turret":true,"tturn":2.6,"radar":9.7},
  roc_e00_aa: {"fac":"roc","role":"aa","cat":"infantry","layer":"ground","name":"Patriot PAC-3","full":"MIM-104F Patriot PAC-3; Tien Kung III (Sky Bow III)","cost":380,"oil":0,"time":8,"hp":100,"armor":"infantry","speed":0.89,"turn":6,"sight":8.1,"r":6,"mass":0.1,"weapons":["w_e00_roc_aa"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2015","confidence":"medium","desc":"Both are as much ballistic missile defence as air defence. Sky Bow III entered service around 2015 and gives Taiwan an indigenous ABM capability -- unusual for a country this size, and driven entirely by the PLA Rocket Force's missile inventory."},
  roc_e00_recon: {"fac":"roc","role":"recon","cat":"vehicle","layer":"ground","name":"CM-32 Yunpao","full":"CM-32 Clouded Leopard 8x8","cost":495,"oil":6,"time":9,"hp":405,"armor":"light","speed":2.72,"turn":3,"sight":9.9,"r":12,"mass":22,"weapons":["w_e00_roc_recon"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2011","confidence":"medium","desc":"Indigenous 8x8 wheeled family. Production began 2010; fleet delivery ran through 2019 after various problems. Fast on Taiwan's dense road network, which is the whole design rationale. The game's recon_r.","turret":true,"tturn":2.4},
  roc_e00_fighter: {"fac":"roc","role":"fighter","cat":"aircraft","layer":"air","name":"F-16A/B MLU","full":"F-16A/B Block 20 mid-life upgrade toward F-16V standard","cost":1855,"oil":31,"time":25,"hp":420,"armor":"air","speed":8.51,"turn":2,"sight":12.1,"r":15,"mass":0,"weapons":["w_e00_roc_fighter"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2016","confidence":"high","desc":"With no new fighters available, Taiwan rebuilt what it had: 141 F-16A/B upgraded to F-16V standard, programme completed November 2023. The AESA radar is the single most significant ROCAF capability gain of the century so far.","jet":true,"ammo":5,"radar":6.8,"radius":42,"rcs":0.5},
  roc_e00_cas: {"fac":"roc","role":"cas","cat":"aircraft","layer":"air","name":"F-CK-1C Ching-kuo","full":"AIDC F-CK-1C/D Hsiang Sheng upgrade","cost":1995,"oil":34,"time":28,"hp":540,"armor":"air","speed":7.13,"turn":1.8,"sight":9.3,"r":16,"mass":0,"weapons":["w_e00_roc_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"2011","confidence":"medium","desc":"Mid-life upgrade of the IDF fleet with new avionics and the Wan Chien glide dispenser for cratering airfields. The game's bomber_r.","jet":true,"ammo":6,"radius":30,"rcs":0.7},
  roc_e00_gunship: {"fac":"roc","role":"gunship","cat":"aircraft","layer":"air","name":"AH-64E Apache Guardian","full":"Boeing AH-64E Apache Guardian","cost":1760,"oil":27,"time":25,"hp":595,"armor":"air","speed":3.56,"turn":2.2,"sight":9.9,"r":16,"mass":0,"weapons":["w_e00_roc_gunship"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2014","confidence":"high","desc":"29 delivered 2013-14 (one lost in a 2014 training crash). Taiwan was the first export customer for the E model. The Longbow radar is what the game's helo_r is charging for.","ammo":8,"hover":true,"radius":24,"rcs":0.75},
  roc_e00_transport: {"fac":"roc","role":"transport","cat":"aircraft","layer":"air","name":"UH-60M Black Hawk","full":"Sikorsky UH-60M Black Hawk","cost":1000,"oil":14,"time":16,"hp":520,"armor":"air","speed":4.16,"turn":2.4,"sight":8.1,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2014","confidence":"high","desc":"60 aircraft delivered from 2014, replacing the UH-1H after forty-four years. CH-47SD Chinooks (2002) provide heavy lift.","ammo":0,"hover":true,"cargo":8,"radius":34,"rcs":0.9},
  roc_e00_awacs: {"fac":"roc","role":"awacs","cat":"aircraft","layer":"air","name":"E-2K Hawkeye","full":"Northrop Grumman E-2K (Hawkeye 2000 standard)","cost":2850,"oil":57,"time":30,"hp":500,"armor":"air","speed":4.36,"turn":1,"sight":13.6,"r":22,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"2013","confidence":"medium","desc":"Two additional Hawkeye 2000 aircraft acquired in the mid-2000s and the original E-2Ts brought up to the same standard, all designated E-2K by around 2013. Six aircraft total. The game's awacs_r.","jet":true,"ammo":0,"radar":27.2,"radius":55,"rcs":2.6},
  roc_e00_aswhelo: {"fac":"roc","role":"aswhelo","cat":"aircraft","layer":"air","name":"S-70C(M) Thunderhawk","full":"Sikorsky S-70C(M)-1/2 Thunderhawk","cost":1285,"oil":24,"time":16,"hp":345,"armor":"air","speed":3.27,"turn":2.3,"sight":7.8,"r":13,"mass":0,"weapons":["w_e00_roc_aswhelo"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"1990s","confidence":"medium","desc":"Taiwan's Seahawk derivative, flown from the Cheng Kung-class frigates. The game's asw_helo_r. Supplemented from 2013-17 by twelve refurbished P-3C Orions for long-range ASW.","ammo":3,"sonar":8.3,"radius":22,"rcs":0.78},
  roc_e00_corvette: {"fac":"roc","role":"corvette","cat":"naval","layer":"sea","name":"Tuo Chiang","full":"Tuo Chiang-class stealth catamaran corvette","cost":1380,"oil":17,"time":19,"hp":940,"armor":"light","speed":3.37,"turn":1.9,"sight":7.6,"r":17,"mass":0,"weapons":["w_e00_roc_corvette","aagun_lt"],"prereq":["navalyard"],"tech":1,"from":"e00","to":"e00","service":"2015","confidence":"high","desc":"Lead ship commissioned November 2015; the improved Ta Chiang variant with Sea Sword II SAM followed from 2021. Nicknamed the 'carrier killer' in Taiwanese press. Fast, low-observable, and very thin-skinned -- exactly as the game's corvette_r describes.","turret":true,"tturn":2.1,"sonar":3.1,"radar":8.7,"ciws":0.29,"rcs":0.12},
  roc_e00_destroyer: {"fac":"roc","role":"destroyer","cat":"naval","layer":"sea","name":"Kee Lung DDG","full":"Kee Lung-class (ex-USN Kidd-class) destroyer","cost":2375,"oil":34,"time":31,"hp":1775,"armor":"heavy","speed":2.28,"turn":1.2,"sight":8.3,"r":20,"mass":0,"weapons":["w_e00_roc_destroyer","sam_sm2mr"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2005","confidence":"high","desc":"Four ships transferred 2005-06. Taiwan's only true area air defence ships and the reason the rest of the surface fleet can operate at all. Hulls laid down in the 1970s -- capable systems on an old platform. The game's destroyer_r.","turret":true,"tturn":1.4,"sonar":6.8,"radar":14.6,"ciws":0.57,"rcs":1.15},
  roc_e00_sub: {"fac":"roc","role":"sub","cat":"naval","layer":"sub","name":"Hai Lung SSK","full":"Hai Lung-class diesel-electric submarine","cost":2425,"oil":36,"time":30,"hp":1105,"armor":"light","speed":1.78,"turn":1.05,"sight":8.1,"r":17,"mass":0,"weapons":["w_e00_roc_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"1987","confidence":"high","desc":"Still two boats. The two 1940s GUPPY-conversion Tench boats remained in commission alongside them into the 2010s-2020s as training hulls -- Hai Shih being the oldest commissioned submarine in the world.","sonar":5.8,"quiet":0.46},
  roc_e00_missileboat: {"fac":"roc","role":"missileboat","cat":"naval","layer":"sea","name":"Kuang Hua VI","full":"Kuang Hua VI-class missile boat","cost":1760,"oil":23,"time":22,"hp":845,"armor":"light","speed":3.17,"turn":1.9,"sight":9.3,"r":16,"mass":0,"weapons":["w_e00_roc_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2010","confidence":"high","desc":"31 small stealth-shaped boats designed to sortie from dispersed and hardened shelters, fire, and run. The purest expression of ROC asymmetric doctrine afloat. The game's boat_r.","sonar":0,"radar":8.7,"rcs":0.26},
  kpa_e50_rifle: {"fac":"kpa","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Squad","full":"Rifle Squad, PPSh-41 / Mosin-Nagant M1891-30","cost":60,"oil":0,"time":4,"hp":60,"armor":"infantry","speed":0.93,"turn":7,"sight":3,"r":6,"mass":0.1,"weapons":["w_e50_kpa_rifle"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1948","confidence":"high","desc":"Straight Soviet WWII issue, handed over when the KPA was founded in February 1948. Unusually heavy on submachine guns for the period, which suited the close, hilly ground. Well trained by 1950 standards - many NCOs were combat veterans of the Chinese civil war."},
  kpa_e50_at: {"fac":"kpa","role":"at","cat":"infantry","layer":"ground","name":"45mm AT Gun","full":"45mm anti-tank gun M1942 (M-42)","cost":125,"oil":0,"time":5,"hp":55,"armor":"infantry","speed":0.74,"turn":6,"sight":3.8,"r":6,"mass":0.1,"weapons":["w_e50_kpa_at"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1949","confidence":"high","desc":"Obsolete against anything but a half-track even in 1950, which did not matter much because the ROK Army had almost no armour. The KPA's real anti-tank weapon in this era was its own T-34s. Man-portable rocket AT (Type 50 / RPG-2) only arrives via China from about 1952."},
  kpa_e50_mbt: {"fac":"kpa","role":"mbt","cat":"vehicle","layer":"ground","name":"T-34-85","full":"T-34-85 medium tank","cost":390,"oil":6,"time":10,"hp":685,"armor":"heavy","speed":1.33,"turn":1.5,"sight":3.7,"r":15,"mass":40,"weapons":["w_e50_kpa_mbt"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1949","confidence":"high","desc":"The single most important vehicle in KPA history. Around 258 delivered 1949-50, concentrated in the 105th Armoured Brigade. Immune to the ROK's 2.36in bazookas and 57mm guns, which is why the first month went the way it did. By 1951 attrition and US air power had reduced KPA armour to a supporting arm and it never rega","turret":true,"tturn":1.15,"crush":true},
  kpa_e50_spg: {"fac":"kpa","role":"spg","cat":"vehicle","layer":"ground","name":"SU-76M","full":"SU-76M self-propelled gun","cost":575,"oil":7,"time":14,"hp":335,"armor":"light","speed":0.99,"turn":1.3,"sight":2.9,"r":15,"mass":40,"weapons":["w_e50_kpa_spg"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1950","confidence":"high","desc":"Roughly 176 fielded in June 1950 as the infantry divisions' organic gun. Open-topped, thinly armoured, crewed with no overhead protection - the direct ancestor of the KPA's lasting habit of putting big guns on unprotected mounts, which is exactly what the M-1978 Koksan still is seventy years later.","turret":true,"tturn":0.7},
  kpa_e50_mlrs: {"fac":"kpa","role":"mlrs","cat":"vehicle","layer":"ground","name":"BM-13 Katyusha","full":"BM-13N 132mm rocket launcher","cost":665,"oil":9,"time":16,"hp":310,"armor":"light","speed":1.12,"turn":1.3,"sight":3,"r":15,"mass":30,"weapons":["w_e50_kpa_mlrs"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1951","confidence":"medium","desc":"Soviet-supplied and used by both KPA and Chinese forces from 1951. This is where the KPA's institutional love of massed rocket artillery begins - a lineage running unbroken to the M1991 240mm and the KN-25. Exact KPA-owned quantities are poorly attested versus Chinese People's Volunteer Army holdings.","turret":true,"tturn":0.8},
  kpa_e50_aa: {"fac":"kpa","role":"aa","cat":"infantry","layer":"ground","name":"37mm AA Gun","full":"61-K 37mm automatic AA gun M1939","cost":115,"oil":0,"time":4,"hp":50,"armor":"infantry","speed":0.77,"turn":6,"sight":4.2,"r":6,"mass":0.1,"weapons":["w_e50_kpa_aa"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1949","confidence":"high","desc":"Towed, optically laid, and the only air defence the KPA had. Near useless against high-altitude B-29s and merely costly for low-flying F-51s and F-80s. No radar direction, no SAMs - the first S-75 battalions do not arrive until the early 1960s. Being outright helpless against air attack is the defining KPA experience o"},
  kpa_e50_recon: {"fac":"kpa","role":"recon","cat":"vehicle","layer":"ground","name":"BA-64","full":"BA-64B light armoured car","cost":115,"oil":2,"time":4,"hp":155,"armor":"light","speed":2.24,"turn":3,"sight":4.7,"r":11,"mass":6,"weapons":["w_e50_kpa_recon"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1949","confidence":"low","desc":"A handful accompanied the 105th Armoured Brigade. Most KPA reconnaissance was actually done on motorcycles and on foot. Open-source detail on KPA armoured car holdings in 1950 is thin, so treat the quantity as unknown rather than small.","turret":true,"tturn":2},

  /* ---- THE KPAF: FOUR AEROPLANES, AND THE LINE RUNS BACKWARDS ------------
     This chain is the roster's clearest case of a later row not being a
     better aeroplane, and the ramp had flattened it into one:
       Yak-9P 1949, MiG-21PFM 1966, MiG-23ML 1985, MiG-21bis 1999, MiG-29 in
       the e00 band on a 1988 service date, and fighter_k in rules.js - the
       present day - back to a MiG-21bis.
     The Yak-9P is a PISTON fighter, 700 km/h flat out, and it was written at
     speed 6.88 with "jet": true - faster than three quarters of a MiG-29 and
     eligible for air-to-air refuelling through generations.js. An A-10, at
     706 km/h, is 5.6 in this game's own table; a Yak-9 is not quicker than an
     A-10. The 1999 MiG-21bis is the SAME aeroplane as fighter_k, which stands
     at 300 hp and speed 8.0, and was written 35 hp and 0.16 slower for no
     reason but its decade. And the MiG-29 - the last real fighter North Korea
     ever bought, sixteen to thirty-five airframes - was 290 hp, ten above a
     MiG-21bis, when a Fulcrum is twice a Fishbed's weight.
     So the line now rises to the MiG-29 in e00 and FALLS to the MiG-21bis in
     e20, because that is what happened: the Fulcrums cannot be sustained and
     the mass of the force is still Fishbeds. Serviceability, fuel and
     training are not hit points; they are the optics and datalink figures the
     faction already carries (datalink 0.10, the lowest in the game). */
  kpa_e50_fighter: {"fac":"kpa","role":"fighter","cat":"aircraft","layer":"air","name":"Yak-9P","full":"Yakovlev Yak-9P","cost":320,"oil":8,"time":9,"hp":155,"armor":"air","speed":5.2,"turn":2.2,"sight":3.7,"r":15,"mass":0,"weapons":["w_e50_kpa_fighter"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1949","confidence":"high","desc":"The KPAF's founding fighter, roughly 79 aircraft. A competent late-war piston fighter that was completely outclassed the moment F-80 Shooting Stars appeared, and the type was effectively wiped out within weeks of June 1950.","jet":false,"ammo":1,"radar":0.9,"radius":18,"rcs":1},
  kpa_e50_cas: {"fac":"kpa","role":"cas","cat":"aircraft","layer":"air","name":"Il-10","full":"Ilyushin Il-10 Sturmovik","cost":690,"oil":15,"time":17,"hp":395,"armor":"air","speed":4.82,"turn":1.5,"sight":4.7,"r":17,"mass":0,"weapons":["w_e50_kpa_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e50","to":"e50","service":"1950","confidence":"high","desc":"About 93 aircraft in the invasion force and the only ground-attack capability the KPA had. Armoured against ground fire and helpless against fighters; destroyed almost entirely in the first two months. The Su-25 the KPA flies today occupies exactly the same doctrinal slot.","jet":true,"ammo":3,"radius":26,"rcs":1.5},
  kpa_e50_transport: {"fac":"kpa","role":"transport","cat":"aircraft","layer":"air","name":"Po-2","full":"Polikarpov Po-2 / Yakovlev Yak-18","cost":240,"oil":4,"time":6,"hp":220,"armor":"air","speed":2.92,"turn":2.6,"sight":4.2,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1950","confidence":"medium","desc":"The Bedcheck Charlie night nuisance raiders - fabric biplanes so slow and low-signature that jet interceptors could barely engage them, and one did real damage to a fuel dump at Inchon in 1951. Direct doctrinal ancestor of the An-2 the KPA still uses for special-forces insertion: a genuinely asymmetric mechanic, not an","ammo":0,"hover":true,"cargo":10,"radius":24,"rcs":1.3},
  kpa_e50_corvette: {"fac":"kpa","role":"corvette","cat":"naval","layer":"sea","name":"G-5 Torpedo Boat","full":"Project G-5 motor torpedo boat","cost":285,"oil":6,"time":9,"hp":365,"armor":"light","speed":2.32,"turn":1.7,"sight":3.1,"r":17,"mass":0,"weapons":["w_e50_kpa_corvette","aagun_lt"],"prereq":["navalyard"],"tech":1,"from":"e50","to":"e50","service":"1949","confidence":"medium","desc":"Listed here only because it is the largest thing the KPN had - it is a 17-tonne motor torpedo boat, not a corvette, and the 1950 navy was roughly 45 small craft in total. Four attacked the cruiser USS Juneau off Chumunjin on 2 July 1950 and three were sunk in minutes. Treat the e50 KPA as having no navy worth the name.","turret":true,"tturn":1.9,"sonar":1.4,"ciws":0,"rcs":0.3},
  kpa_e60_rifle: {"fac":"kpa","role":"rifle","cat":"infantry","layer":"ground","name":"Type 58 / Type 68 Squad","full":"Rifle Squad, Type 58 (AK-47 copy) and Type 68 (AKM copy)","cost":60,"oil":0,"time":4,"hp":70,"armor":"infantry","speed":0.97,"turn":7,"sight":3.5,"r":6,"mass":0.1,"weapons":["w_e60_kpa_rifle"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1958","confidence":"high","desc":"The Type 58 was North Korea's first mass-produced small arm and one of the earliest AK-47 copies made outside the USSR. The Type 68 followed the AKM. Domestic small-arms production is one of the few things the KPA has done well and continuously ever since."},
  kpa_e60_at: {"fac":"kpa","role":"at","cat":"infantry","layer":"ground","name":"RPG-7 Team","full":"Type 69 (RPG-7 copy) rocket team","cost":155,"oil":0,"time":5,"hp":65,"armor":"infantry","speed":0.77,"turn":6,"sight":4.5,"r":6,"mass":0.1,"weapons":["w_e60_kpa_at"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1970","confidence":"medium","desc":"Chinese-pattern RPG-7, issued extremely widely - the KPA's anti-armour answer has always been density rather than quality. Recoilless rifles (B-10 82mm, B-11 107mm) served alongside it at battalion level."},
  kpa_e60_mbt: {"fac":"kpa","role":"mbt","cat":"vehicle","layer":"ground","name":"T-55","full":"T-54A / T-55 medium tank","cost":485,"oil":8,"time":11,"hp":845,"armor":"heavy","speed":1.4,"turn":1.5,"sight":4.3,"r":15,"mass":40,"weapons":["w_e60_kpa_mbt"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1963","confidence":"medium","desc":"Delivered from the USSR and later assembled locally. Several hundred remain in KPA service in the 2020s in second-line and reserve formations, making this a genuine five-era platform for this faction.","turret":true,"tturn":1.15,"crush":true},
  kpa_e60_lighttank: {"fac":"kpa","role":"lighttank","cat":"vehicle","layer":"ground","name":"PT-76","full":"PT-76B amphibious light tank","cost":275,"oil":3,"time":7,"hp":360,"armor":"light","speed":1.98,"turn":2.5,"sight":4.5,"r":13,"mass":20,"weapons":["w_e60_kpa_lighttank"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1965","confidence":"medium","desc":"Amphibious without preparation, which matters enormously on a peninsula full of rivers and paddy. Paper-thin armour. Its hull and role are the direct template for the later domestic PT-85. Delivery dates are approximate.","turret":true,"tturn":1.5},
  kpa_e60_ifv: {"fac":"kpa","role":"ifv","cat":"vehicle","layer":"ground","name":"BTR-60PB","full":"BTR-60PB armoured personnel carrier","cost":320,"oil":5,"time":7,"hp":450,"armor":"light","speed":1.53,"turn":2,"sight":4.2,"r":14,"mass":13,"weapons":["w_e60_kpa_ifv"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1970","confidence":"medium","desc":"Wheeled 8x8 APC, amphibious, carrying eight. With the older BTR-40 and BTR-152 this is the first time KPA infantry rode under armour at all. Still a battle taxi, not an infantry fighting vehicle - no autocannon, no useful firing ports.","turret":true,"tturn":1.7,"cargo":8},
  kpa_e60_spg: {"fac":"kpa","role":"spg","cat":"vehicle","layer":"ground","name":"M1974 122mm SPG","full":"M1974 122mm self-propelled gun","cost":710,"oil":9,"time":15,"hp":410,"armor":"light","speed":1.03,"turn":1.3,"sight":3.4,"r":15,"mass":40,"weapons":["w_e60_kpa_spg"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1974","confidence":"medium","desc":"The start of the KPA's enormous self-propelled artillery programme - take an existing towed gun, bolt it to a domestic tracked hull, accept an open or lightly enclosed mount. The M1975 130mm and M1977 152mm follow the same recipe. All M-19xx designations are Western labels assigned by year of first observation, so thes","turret":true,"tturn":0.7},
  kpa_e60_mlrs: {"fac":"kpa","role":"mlrs","cat":"vehicle","layer":"ground","name":"Type 75 122mm MRL","full":"BM-21 Grad pattern 122mm rocket launcher","cost":825,"oil":11,"time":17,"hp":385,"armor":"light","speed":1.17,"turn":1.3,"sight":3.5,"r":15,"mass":30,"weapons":["w_e60_kpa_mlrs"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1975","confidence":"medium","desc":"Locally produced Grad copies in very large numbers, alongside older BM-14 140mm systems. The KPA has consistently bought rocket artillery in preference to tube artillery quality, and this is where that becomes a fleet-scale decision rather than a few batteries.","turret":true,"tturn":0.8},
  kpa_e60_spaag: {"fac":"kpa","role":"spaag","cat":"vehicle","layer":"ground","name":"ZSU-57-2","full":"ZSU-57-2 self-propelled AA gun","cost":365,"oil":5,"time":8,"hp":420,"armor":"light","speed":1.44,"turn":1.9,"sight":5.3,"r":14,"mass":26,"weapons":["w_e60_kpa_spaag"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1968","confidence":"medium","desc":"The KPA's first self-propelled AA. Optically laid only, open-topped, low rate of fire for the calibre - obsolete as an AA system almost on arrival, though 57mm rounds are devastating against light vehicles and infantry. Whether the KPA ever received meaningful numbers of the radar-directed ZSU-23-4 Shilka is genuinely ","turret":true,"tturn":2.4},
  kpa_e60_aa: {"fac":"kpa","role":"aa","cat":"infantry","layer":"ground","name":"S-75 Dvina (SA-2)","full":"S-75 Dvina surface-to-air missile system","cost":140,"oil":0,"time":5,"hp":65,"armor":"infantry","speed":0.81,"turn":6,"sight":4.9,"r":6,"mass":0.1,"weapons":["w_e60_kpa_aa"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1962","confidence":"medium","desc":"The most consequential air-defence acquisition in KPA history and still the numerical backbone in the 2020s. Command guidance from a big, loud, easily located radar - beatable by anyone with a HARM and a jammer, which is precisely why the game gives the KPA ecm/eccm of 0.55. Density is its only real defence."},
  kpa_e60_recon: {"fac":"kpa","role":"recon","cat":"vehicle","layer":"ground","name":"BRDM-2","full":"BRDM-2 amphibious scout car","cost":145,"oil":2,"time":4,"hp":190,"armor":"light","speed":2.34,"turn":3,"sight":5.5,"r":11,"mass":6,"weapons":["w_e60_kpa_recon"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1972","confidence":"medium","desc":"Standard Soviet-pattern 4x4 scout car with belly wheels for trench crossing. Optical vision blocks only; no thermal or image-intensification of any kind, which is a fair reflection of the game's 0.15 thermal rating for the faction.","turret":true,"tturn":2},
  kpa_e60_fighter: {"fac":"kpa","role":"fighter","cat":"aircraft","layer":"air","name":"MiG-21PFM","full":"Mikoyan-Gurevich MiG-21PFM / F-13","cost":400,"oil":10,"time":9,"hp":215,"armor":"air","speed":7.9,"turn":2,"sight":4.3,"r":15,"mass":0,"weapons":["w_e60_kpa_fighter"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1966","confidence":"medium","desc":"The KPAF's mainstay for the rest of the Cold War and, astonishingly, still flying in the 2020s. Short-legged, short-ranged radar, one or two missiles, no beyond-visual-range capability. Around 30-40 additional MiG-21bis were acquired from Kazakhstan in 1999 - the last meaningful fighter acquisition in North Korean hist","jet":true,"ammo":1,"radar":1,"radius":21,"rcs":1},
  kpa_e60_cas: {"fac":"kpa","role":"cas","cat":"aircraft","layer":"air","name":"Su-7BMK","full":"Sukhoi Su-7BMK Fitter-A","cost":855,"oil":18,"time":18,"hp":485,"armor":"air","speed":5.04,"turn":1.5,"sight":5.5,"r":17,"mass":0,"weapons":["w_e60_kpa_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e60","service":"1971","confidence":"medium","desc":"Fast, thirsty, and with a genuinely poor bomb load for its size. No guided air-to-ground weapons at all. Delivery numbers and dates are only approximately attested.","jet":true,"ammo":3,"radius":26,"rcs":1.5},
  kpa_e60_transport: {"fac":"kpa","role":"transport","cat":"aircraft","layer":"air","name":"An-2 Colt","full":"Antonov An-2 / Nanchang Y-5","cost":295,"oil":5,"time":7,"hp":270,"armor":"air","speed":3.06,"turn":2.6,"sight":4.9,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1965","confidence":"high","desc":"Produced locally in large numbers and the signature KPA special-forces aircraft. Fabric-and-wood construction over a steel frame gives it a genuinely small radar cross-section, and it operates from roads and unprepared strips at very low speed. Estimates of 200-300 airframes are common but unverifiable. This is the gam","ammo":0,"hover":true,"cargo":10,"radius":25,"rcs":1.3},
  kpa_e60_corvette: {"fac":"kpa","role":"corvette","cat":"naval","layer":"sea","name":"Najin-class Frigate","full":"Najin-class frigate","cost":355,"oil":7,"time":10,"hp":450,"armor":"light","speed":2.43,"turn":1.7,"sight":3.6,"r":17,"mass":0,"weapons":["w_e60_kpa_corvette","aagun_v11"],"prereq":["navalyard"],"tech":1,"from":"e60","to":"e60","service":"1973","confidence":"high","desc":"About 1,500 tonnes and, until 2025, the largest warship North Korea had ever built. Two hulls. No area air defence, no meaningful ASW suite, no helicopter. It is a coastal gun frigate in an era when everyone else's frigates carried SAMs.","turret":true,"tturn":1.9,"sonar":1.7,"ciws":0,"rcs":0.85},
  kpa_e60_missileboat: {"fac":"kpa","role":"missileboat","cat":"naval","layer":"sea","name":"Osa-I / Komar","full":"Project 205 Osa-I and Project 183R Komar missile boats","cost":435,"oil":9,"time":12,"hp":360,"armor":"light","speed":2.88,"turn":1.85,"sight":3.5,"r":16,"mass":0,"weapons":["w_e60_kpa_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1968","confidence":"medium","desc":"The KPN's genuine teeth and the model for everything since: put a large anti-ship missile on the smallest possible hull, hide it in coastal inlets, shoot first. No air defence beyond gun mounts, so a single ASW helicopter with a Sea Skua ruins the whole concept - but there were dozens of them.","sonar":0,"rcs":0.52},
  kpa_e60_sub: {"fac":"kpa","role":"sub","cat":"naval","layer":"sub","name":"Whiskey-class SSK","full":"Project 613 Whiskey-class submarine","cost":515,"oil":15,"time":17,"hp":450,"armor":"light","speed":1.44,"turn":1,"sight":4.6,"r":16,"mass":0,"weapons":["w_e60_kpa_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1965","confidence":"medium","desc":"Four boats transferred from the USSR, the KPN's first submarines. A 1950s design already noisy and short-ranged when transferred. Withdrawn once Romeos were available locally.","sonar":1.8,"quiet":1.56},
  kpa_e80_rifle: {"fac":"kpa","role":"rifle","cat":"infantry","layer":"ground","name":"Type 88 Squad","full":"Rifle Squad, Type 88 (AK-74 copy)","cost":70,"oil":0,"time":4,"hp":90,"armor":"infantry","speed":1.03,"turn":7,"sight":4.2,"r":6,"mass":0.1,"weapons":["w_e80_kpa_rifle"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1988","confidence":"medium","desc":"North Korea's switch to the small-calibre AK-74 pattern. The distinctive helical 150-round magazines seen in parades appear later and are probably a special-forces and parade item rather than general issue - the game's rifle_k description leans on them, which is fine flavour but not universal fact."},
  kpa_e80_at: {"fac":"kpa","role":"at","cat":"infantry","layer":"ground","name":"Bulsae-2 Team","full":"AT Team, Bulsae-2 (9M111 Fagot copy)","cost":200,"oil":0,"time":6,"hp":80,"armor":"infantry","speed":0.82,"turn":6,"sight":5.4,"r":6,"mass":0.1,"weapons":["w_e80_kpa_at"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1988","confidence":"low","desc":"A real generational jump over Susong-po: semi-automatic command-to-line-of-sight means the gunner only has to keep the crosshair on the target. Still wire-guided, still defeated by explosive reactive armour on a modern MBT. Introduction date is not established and 1988 is an approximation."},
  kpa_e80_mbt: {"fac":"kpa","role":"mbt","cat":"vehicle","layer":"ground","name":"Chonma-ho","full":"Chonma-ho (Ch'onma-ho) main battle tank","cost":620,"oil":10,"time":12,"hp":1045,"armor":"heavy","speed":1.47,"turn":1.5,"sight":5.2,"r":15,"mass":40,"weapons":["w_e80_kpa_mbt"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1980","confidence":"medium","desc":"North Korea's indigenous tank, evolved out of the licence T-62 line at Sinhung. Successive marks add a laser rangefinder, side skirts, add-on and reactive armour, and eventually a 125mm gun and ATGM launcher. Western mark numbering (I to VII) is an outside-observer construct and its mapping to Korean designations is no","turret":true,"tturn":1.15,"crush":true},
  kpa_e80_lighttank: {"fac":"kpa","role":"lighttank","cat":"vehicle","layer":"ground","name":"PT-85 Shin'heung","full":"PT-85 (M1985) amphibious light tank","cost":350,"oil":4,"time":7,"hp":440,"armor":"light","speed":2.09,"turn":2.5,"sight":5.4,"r":13,"mass":20,"weapons":["w_e80_kpa_lighttank"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1985","confidence":"medium","desc":"An 85mm turret on a lengthened VTT-323 hull - the PT-76 replaced by a locally producible equivalent. Amphibious and fast, which is what a river-crossing doctrine wants, but the armour will not stop a 25mm autocannon and the gun cannot hurt a modern MBT frontally. The game's lt_k.","turret":true,"tturn":1.5},
  kpa_e80_ifv: {"fac":"kpa","role":"ifv","cat":"vehicle","layer":"ground","name":"VTT-323","full":"VTT-323 (M1973) tracked APC","cost":410,"oil":6,"time":8,"hp":555,"armor":"light","speed":1.62,"turn":2,"sight":5,"r":14,"mass":13,"weapons":["w_e80_kpa_ifv"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1973","confidence":"high","desc":"Unchanged platform, now in mass service and spawning variants.","turret":true,"tturn":1.7,"cargo":8},
  kpa_e80_spg: {"fac":"kpa","role":"spg","cat":"vehicle","layer":"ground","name":"M-1978 Koksan","full":"M-1978 Koksan 170mm self-propelled gun","cost":915,"oil":12,"time":16,"hp":505,"armor":"light","speed":1.09,"turn":1.3,"sight":4,"r":15,"mass":40,"weapons":["w_e80_kpa_spg"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1978","confidence":"medium","desc":"The KPA's genuine trump card and the reason the Seoul metropolitan area is a hostage. A very long 170mm barrel on a Chonma-ho-derived hull with an entirely open, unprotected mount and only a few ready rounds - it needs a separate ammunition vehicle. Extremely slow to lay, poor accuracy, and one counter-battery round an","turret":true,"tturn":0.7},
  kpa_e80_mlrs: {"fac":"kpa","role":"mlrs","cat":"vehicle","layer":"ground","name":"M1985 240mm MRL","full":"M1985 240mm multiple rocket launcher","cost":1060,"oil":15,"time":18,"hp":475,"armor":"light","speed":1.23,"turn":1.3,"sight":4.2,"r":15,"mass":30,"weapons":["w_e80_kpa_mlrs"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1985","confidence":"medium","desc":"The 12-tube predecessor of the 22-tube M1991 the game fields. Deployed in dedicated corps-level artillery brigades in hardened positions near the DMZ. Designation is a Western observation label.","turret":true,"tturn":0.8},
  kpa_e80_spaag: {"fac":"kpa","role":"spaag","cat":"vehicle","layer":"ground","name":"M-1989 Flak","full":"M-1989 twin 37mm self-propelled AA gun","cost":465,"oil":7,"time":9,"hp":520,"armor":"light","speed":1.52,"turn":1.9,"sight":6.4,"r":14,"mass":26,"weapons":["w_e80_kpa_spaag"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1989","confidence":"medium","desc":"Optically laid, no fire-control radar - its accuracy against a jet is a fraction of a Gepard's and the game's design already reflects that. Cheap and available in numbers, which is the only argument for it. The game's spaag_k.","turret":true,"tturn":2.4},
  kpa_e80_aa: {"fac":"kpa","role":"aa","cat":"infantry","layer":"ground","name":"S-200 (SA-5 Gammon)","full":"S-200 Angara/Vega long-range surface-to-air missile system","cost":180,"oil":0,"time":5,"hp":80,"armor":"infantry","speed":0.86,"turn":6,"sight":5.9,"r":6,"mass":0.1,"weapons":["w_e80_kpa_aa"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1987","confidence":"medium","desc":"The longest-reaching SAM the KPA has ever fielded and a genuine threat to high-value slow movers like tankers and AWACS if they stray close. Enormous, entirely fixed-site, dependent on a huge Square Pair radar that cannot hide. Against a fighter with a jammer and a HARM it is a target, not a threat."},
  kpa_e80_recon: {"fac":"kpa","role":"recon","cat":"vehicle","layer":"ground","name":"BRDM-2","full":"BRDM-2 amphibious scout car","cost":185,"oil":3,"time":4,"hp":235,"armor":"light","speed":2.47,"turn":3,"sight":6.6,"r":11,"mass":6,"weapons":["w_e80_kpa_recon"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1972","confidence":"medium","desc":"Unchanged; still the standard divisional scout vehicle.","turret":true,"tturn":2},
  kpa_e80_fighter: {"fac":"kpa","role":"fighter","cat":"aircraft","layer":"air","name":"MiG-23ML","full":"Mikoyan-Gurevich MiG-23ML / MiG-23P Flogger-G","cost":510,"oil":13,"time":10,"hp":300,"armor":"air","speed":8.4,"turn":1.7,"sight":5.2,"r":15,"mass":0,"weapons":["w_e80_kpa_fighter"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1985","confidence":"medium","desc":"About 46 aircraft. The KPA's first fighter with a usable radar-guided missile and therefore its first beyond-visual-range capability of any kind. Swing-wing, fast in a straight line, poor turning fight, and a radar that is easily jammed. Serviceability of the surviving fleet in the 2020s is questionable.","jet":true,"ammo":1,"radar":1.3,"radius":25,"rcs":1},
  kpa_e80_cas: {"fac":"kpa","role":"cas","cat":"aircraft","layer":"air","name":"Su-25 Frogfoot","full":"Sukhoi Su-25K / Su-25UBK","cost":1095,"oil":23,"time":20,"hp":600,"armor":"air","speed":5.32,"turn":1.5,"sight":6.6,"r":17,"mass":0,"weapons":["w_e80_kpa_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1987","confidence":"high","desc":"Roughly 32-36 delivered. A heavily armoured, slow close-air-support aircraft designed to take hits from small arms and light AA. Note the game's bomber_k wires it to a jdam weapon while the description correctly says unguided ordnance - the KPA has no GPS-guided bomb capability, so that is worth reconciling.","jet":true,"ammo":4,"radius":27,"rcs":1.5},
  kpa_e80_gunship: {"fac":"kpa","role":"gunship","cat":"aircraft","layer":"air","name":"Mi-24 Hind","full":"Mil Mi-24D Hind-D","cost":840,"oil":15,"time":14,"hp":555,"armor":"air","speed":3.14,"turn":2,"sight":6.4,"r":17,"mass":0,"weapons":["w_e80_kpa_gunship"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1986","confidence":"medium","desc":"The KPA's first and only true attack helicopter, around 20 aircraft. Heavily armoured and able to carry eight troops in the cabin, which is unusual. The game arms helo_k with a hellfire weapon id - the real Hind-D carries Falanga or Shturm, both radio-command guided and considerably less capable, so that id is a conven","ammo":5,"hover":true,"radius":19,"rcs":0.9},
  kpa_e80_transport: {"fac":"kpa","role":"transport","cat":"aircraft","layer":"air","name":"An-2 Colt","full":"Antonov An-2 / Y-5","cost":380,"oil":6,"time":7,"hp":330,"armor":"air","speed":3.23,"turn":2.6,"sight":5.9,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1965","confidence":"high","desc":"Unchanged and now produced domestically in volume.","ammo":0,"hover":true,"cargo":10,"radius":25,"rcs":1.3},
  kpa_e80_corvette: {"fac":"kpa","role":"corvette","cat":"naval","layer":"sea","name":"Soho-class Frigate","full":"Soho-class catamaran frigate","cost":455,"oil":9,"time":11,"hp":555,"armor":"light","speed":2.57,"turn":1.7,"sight":4.4,"r":17,"mass":0,"weapons":["w_e80_kpa_corvette","aagun_v11"],"prereq":["navalyard"],"tech":1,"from":"e80","to":"e80","service":"1982","confidence":"medium","desc":"A single hull, and genuinely strange - a catamaran frigate with a helicopter platform, the only KPN ship ever to have one. Apparently discarded around 2015. The more numerous gun corvettes are the two Sariwon-class, themselves derived from Soviet Tral-class minesweepers.","turret":true,"tturn":1.9,"sonar":2,"ciws":0,"rcs":0.85},
  kpa_e80_missileboat: {"fac":"kpa","role":"missileboat","cat":"naval","layer":"sea","name":"Soju-class","full":"Soju-class missile boat (domestic Osa derivative)","cost":555,"oil":12,"time":12,"hp":440,"armor":"light","speed":3.04,"turn":1.85,"sight":4.2,"r":16,"mass":0,"weapons":["w_e80_kpa_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1981","confidence":"medium","desc":"North Korea's own enlarged Osa. With the Chinese-supplied Huangfeng (Type 021) and the Sohung (Komar derivative) this is the backbone of the missile-boat force. The game's missileboat_k is wired with ssm_kn01 - the KN-01 is the later coastal-defence missile evolved from this same Styx lineage, so the family is right ev","sonar":0,"rcs":0.55},
  kpa_e80_sub: {"fac":"kpa","role":"sub","cat":"naval","layer":"sub","name":"Romeo-class SSK","full":"Project 633 Romeo-class submarine","cost":655,"oil":19,"time":18,"hp":555,"armor":"light","speed":1.52,"turn":1,"sight":5.5,"r":16,"mass":0,"weapons":["w_e80_kpa_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1973","confidence":"high","desc":"Local production continues through this decade to roughly twenty boats.","sonar":2.2,"quiet":1.26},
  kpa_e90_rifle: {"fac":"kpa","role":"rifle","cat":"infantry","layer":"ground","name":"Type 88 Squad","full":"Rifle Squad, Type 88","cost":80,"oil":0,"time":4,"hp":100,"armor":"infantry","speed":1.06,"turn":7,"sight":4.6,"r":6,"mass":0.1,"weapons":["w_e90_kpa_rifle"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1988","confidence":"medium","desc":"Unchanged. Ammunition and training-round shortages during the famine years are widely reported and readiness across the conscript army fell sharply."},
  kpa_e90_at: {"fac":"kpa","role":"at","cat":"infantry","layer":"ground","name":"Bulsae-2 Team","full":"AT Team, Bulsae-2 (9M111 copy)","cost":235,"oil":0,"time":6,"hp":95,"armor":"infantry","speed":0.84,"turn":6,"sight":5.9,"r":6,"mass":0.1,"weapons":["w_e90_kpa_at"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1988","confidence":"low","desc":"Unchanged."},
  kpa_e90_mbt: {"fac":"kpa","role":"mbt","cat":"vehicle","layer":"ground","name":"Chonma-ho IV/V","full":"Chonma-ho later production marks","cost":730,"oil":12,"time":12,"hp":1175,"armor":"heavy","speed":1.52,"turn":1.5,"sight":5.7,"r":15,"mass":40,"weapons":["w_e90_kpa_mbt"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1992","confidence":"medium","desc":"Incremental improvement of a 1961 Soviet design, which is all the industrial base could sustain. The 125mm gun is a real capability increase; the fire control behind it is not, and no KPA tank has a thermal sight in this era. Mark-to-year mapping is not reliably documented. The game's mbt_k sits here.","turret":true,"tturn":1.15,"crush":true},
  kpa_e90_lighttank: {"fac":"kpa","role":"lighttank","cat":"vehicle","layer":"ground","name":"PT-85 Shin'heung","full":"PT-85 (M1985) amphibious light tank","cost":415,"oil":5,"time":8,"hp":500,"armor":"light","speed":2.16,"turn":2.5,"sight":5.9,"r":13,"mass":20,"weapons":["w_e90_kpa_lighttank"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1985","confidence":"medium","desc":"Unchanged; production continues.","turret":true,"tturn":1.5},
  kpa_e90_ifv: {"fac":"kpa","role":"ifv","cat":"vehicle","layer":"ground","name":"VTT-323","full":"VTT-323 (M1973) tracked APC","cost":480,"oil":7,"time":8,"hp":625,"armor":"light","speed":1.67,"turn":2,"sight":5.5,"r":14,"mass":13,"weapons":["w_e90_kpa_ifv"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1973","confidence":"high","desc":"Unchanged. Now over twenty years old and still the standard carrier.","turret":true,"tturn":1.7,"cargo":8},
  kpa_e90_spg: {"fac":"kpa","role":"spg","cat":"vehicle","layer":"ground","name":"M-1989 Koksan","full":"M-1989 170mm self-propelled gun","cost":1075,"oil":14,"time":17,"hp":570,"armor":"light","speed":1.13,"turn":1.3,"sight":4.4,"r":15,"mass":40,"weapons":["w_e90_kpa_spg"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1989","confidence":"medium","desc":"The improved Koksan - same gun, a purpose-built hull that finally carries its own ready rounds instead of depending entirely on an accompanying ammunition vehicle. Still an open mount with no crew protection.","turret":true,"tturn":0.7},
  kpa_e90_mlrs: {"fac":"kpa","role":"mlrs","cat":"vehicle","layer":"ground","name":"M1991 240mm MRL","full":"M1991 240mm multiple rocket launcher","cost":1245,"oil":17,"time":19,"hp":535,"armor":"light","speed":1.27,"turn":1.3,"sight":4.6,"r":15,"mass":30,"weapons":["w_e90_kpa_mlrs"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1991","confidence":"medium","desc":"The 22-tube development of the M1985 and the game's mlrs_k. Dug into hardened positions along the DMZ in numbers usually estimated in the hundreds. Massive area saturation, very poor accuracy, and a reload cycle measured in tens of minutes - the game's 15s reload and 0.16 accuracy captures the shape of it well.","turret":true,"tturn":0.8},
  kpa_e90_spaag: {"fac":"kpa","role":"spaag","cat":"vehicle","layer":"ground","name":"M1992 30mm SPAAG","full":"M1992 self-propelled twin 30mm AA gun","cost":550,"oil":8,"time":9,"hp":585,"armor":"light","speed":1.57,"turn":1.9,"sight":7,"r":14,"mass":26,"weapons":["w_e90_kpa_spaag"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1992","confidence":"low","desc":"A lighter, faster-firing companion to the M1989 37mm. Still optically directed. Designation is an observation label.","turret":true,"tturn":2.4},
  kpa_e90_aa: {"fac":"kpa","role":"aa","cat":"infantry","layer":"ground","name":"S-75 / S-125 / S-200 network","full":"S-75 Dvina, S-125 Neva, S-200 Vega","cost":210,"oil":0,"time":5,"hp":90,"armor":"infantry","speed":0.88,"turn":6,"sight":6.4,"r":6,"mass":0.1,"weapons":["w_e90_kpa_aa"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1962","confidence":"medium","desc":"No new SAM system enters service in the entire decade. The KPA instead thickens what it has and hardens the sites. By the late 1990s this is one of the densest air-defence networks on earth and simultaneously one of the most technically obsolete - a genuinely interesting combination to model."},
  kpa_e90_recon: {"fac":"kpa","role":"recon","cat":"vehicle","layer":"ground","name":"M-1992 Armoured Car","full":"M-1992 4x4 armoured reconnaissance car","cost":215,"oil":3,"time":4,"hp":265,"armor":"light","speed":2.55,"turn":3,"sight":7.2,"r":11,"mass":6,"weapons":["w_e90_kpa_recon"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1992","confidence":"low","desc":"Domestic wheeled scout car. Open-source detail is genuinely thin - the M-1992 label covers more than one vehicle in Western reporting, and the designation is applied by observers, not by the KPA. The game's recon_k.","turret":true,"tturn":2},
  kpa_e90_fighter: {"fac":"kpa","role":"fighter","cat":"aircraft","layer":"air","name":"MiG-21bis","full":"Mikoyan-Gurevich MiG-21bis (ex-Kazakhstan)","cost":600,"oil":15,"time":10,"hp":295,"armor":"air","speed":8.0,"turn":2,"sight":5.7,"r":15,"mass":0,"weapons":["w_e90_kpa_fighter"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1999","confidence":"medium","desc":"Roughly 30-40 airframes bought second-hand from Kazakhstan in 1999; a further shipment was intercepted in Azerbaijan and the affair became a public scandal. This is the last meaningful combat aircraft acquisition North Korea has made. A player should feel that the KPAF air-to-air tree simply terminates here.","jet":true,"ammo":2,"radar":1.4,"radius":22,"rcs":1},
  kpa_e90_cas: {"fac":"kpa","role":"cas","cat":"aircraft","layer":"air","name":"Su-25 Frogfoot","full":"Sukhoi Su-25K","cost":1290,"oil":28,"time":21,"hp":675,"armor":"air","speed":5.49,"turn":1.5,"sight":7.2,"r":17,"mass":0,"weapons":["w_e90_kpa_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1987","confidence":"high","desc":"Unchanged. Fuel shortages in this decade reduced KPAF flying hours to a level that made pilot proficiency a serious problem, and it never fully recovered.","jet":true,"ammo":5,"radius":28,"rcs":1.5},
  kpa_e90_gunship: {"fac":"kpa","role":"gunship","cat":"aircraft","layer":"air","name":"Mi-24 Hind","full":"Mil Mi-24D","cost":990,"oil":17,"time":15,"hp":625,"armor":"air","speed":3.23,"turn":2,"sight":7,"r":17,"mass":0,"weapons":["w_e90_kpa_gunship"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1986","confidence":"medium","desc":"Unchanged; no replacement or supplement ever acquired.","ammo":6,"hover":true,"radius":20,"rcs":0.9},
  kpa_e90_transport: {"fac":"kpa","role":"transport","cat":"aircraft","layer":"air","name":"Il-76TD","full":"Ilyushin Il-76TD","cost":445,"oil":7,"time":8,"hp":375,"armor":"air","speed":3.33,"turn":2.6,"sight":6.4,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1993","confidence":"medium","desc":"Three aircraft, operated under Air Koryo civil registration but state-controlled and used for strategic lift. This is the only genuinely new fixed-wing acquisition of the decade and the KPA's only heavy airlift.","ammo":0,"hover":true,"cargo":10,"radius":26,"rcs":1.3},
  kpa_e90_corvette: {"fac":"kpa","role":"corvette","cat":"naval","layer":"sea","name":"Najin-class Frigate","full":"Najin-class frigate","cost":535,"oil":10,"time":11,"hp":625,"armor":"light","speed":2.65,"turn":1.7,"sight":4.8,"r":17,"mass":0,"weapons":["w_e90_kpa_corvette","aagun_v11"],"prereq":["navalyard"],"tech":1,"from":"e90","to":"e90","service":"1973","confidence":"high","desc":"Unchanged. No new surface combatant larger than a fast attack craft is built in the entire decade.","turret":true,"tturn":1.9,"sonar":2.2,"ciws":0,"rcs":0.85},
  kpa_e90_sub: {"fac":"kpa","role":"sub","cat":"naval","layer":"sub","name":"Sang-o-class","full":"Sang-o-class coastal submarine","cost":775,"oil":22,"time":19,"hp":625,"armor":"light","speed":1.57,"turn":1,"sight":6.1,"r":16,"mass":0,"weapons":["w_e90_kpa_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1996","confidence":"medium","desc":"About 300 tonnes, roughly forty built - small, short-ranged, and designed for exactly one job: putting special forces ashore. One grounded off Gangneung in September 1996 and its crew's flight and deaths triggered a nationwide South Korean manhunt. This is the era's real KPA capability and it is asymmetric, not convent","sonar":2.4,"quiet":1.13},
  kpa_e90_missileboat: {"fac":"kpa","role":"missileboat","cat":"naval","layer":"sea","name":"Soju-class","full":"Soju-class missile boat","cost":655,"oil":14,"time":13,"hp":500,"armor":"light","speed":3.14,"turn":1.85,"sight":4.6,"r":16,"mass":0,"weapons":["w_e90_kpa_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1981","confidence":"medium","desc":"Unchanged.","sonar":0,"rcs":0.55},
  kpa_e00_rifle: {"fac":"kpa","role":"rifle","cat":"infantry","layer":"ground","name":"Type 88 Squad","full":"Rifle Squad, Type 88 / Type 88-2","cost":90,"oil":0,"time":4,"hp":110,"armor":"infantry","speed":1.07,"turn":7,"sight":4.9,"r":6,"mass":0.1,"weapons":["w_e00_kpa_rifle"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"1988","confidence":"medium","desc":"Unchanged. Optical sights only; no night-vision issue at squad level worth speaking of, which is what the game's 0.15 thermal rating encodes."},
  kpa_e00_at: {"fac":"kpa","role":"at","cat":"infantry","layer":"ground","name":"Bulsae-3 Team","full":"AT Team, Bulsae-3 (9M133 Kornet derivative)","cost":260,"oil":0,"time":6,"hp":100,"armor":"infantry","speed":0.85,"turn":6,"sight":6.2,"r":6,"mass":0.1,"weapons":["w_e00_kpa_at"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2013","confidence":"medium","desc":"The one modern-standard weapon in the KPA infantry inventory and the biggest single conventional capability gain of the period. Tandem warhead defeats explosive reactive armour; beam-riding guidance is far harder to jam than SACLOS wire. Fitted to vehicles as well as tripods. The game's at_k."},
  kpa_e00_mbt: {"fac":"kpa","role":"mbt","cat":"vehicle","layer":"ground","name":"Pokpung-ho","full":"Pokpung-ho (Chonma-215/216) main battle tank","cost":810,"oil":13,"time":13,"hp":1265,"armor":"heavy","speed":1.53,"turn":1.5,"sight":6,"r":15,"mass":40,"weapons":["w_e00_kpa_mbt"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2002","confidence":"medium","desc":"First observed 2002. A lengthened Chonma-ho hull with an extra roadwheel, better armour and improved fire control. Reportedly incorporates elements studied from the T-72 and possibly the T-90; how much is genuine and how much is display is not established.","turret":true,"tturn":1.15,"crush":true},
  kpa_e00_heavy: {"fac":"kpa","role":"heavy","cat":"vehicle","layer":"ground","name":"Songun-ho","full":"Songun-915 main battle tank","cost":1425,"oil":23,"time":21,"hp":1870,"armor":"heavy","speed":1.49,"turn":1.4,"sight":6.6,"r":17,"mass":50,"weapons":["w_e00_kpa_heavy"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2010","confidence":"medium","desc":"Revealed in the October 2010 parade and the best tank the KPA fielded before 2020. Reactive armour, an ATGM box on the turret and a laser rangefinder. Whether it has a true thermal sight and a working two-plane stabiliser is unverified and probably varies by build. The game's hvy_k.","turret":true,"tturn":1.25,"crush":true},
  kpa_e00_lighttank: {"fac":"kpa","role":"lighttank","cat":"vehicle","layer":"ground","name":"PT-85 Shin'heung","full":"PT-85 (M1985) amphibious light tank","cost":455,"oil":6,"time":8,"hp":540,"armor":"light","speed":2.18,"turn":2.5,"sight":6.2,"r":13,"mass":20,"weapons":["w_e00_kpa_lighttank"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"1985","confidence":"medium","desc":"Unchanged after twenty-five years.","turret":true,"tturn":1.5},
  kpa_e00_ifv: {"fac":"kpa","role":"ifv","cat":"vehicle","layer":"ground","name":"M2010 Chunma-D","full":"M2010 6x6/8x8 wheeled armoured personnel carrier","cost":530,"oil":8,"time":9,"hp":670,"armor":"light","speed":1.68,"turn":2,"sight":5.8,"r":14,"mass":13,"weapons":["w_e00_kpa_ifv"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2010","confidence":"low","desc":"Shown in the 2010 parade, visually influenced by the Russian BTR-80 and the South African Ratel. A real attempt at a modern wheeled carrier, but numbers appear small and it has not displaced the VTT-323.","turret":true,"tturn":1.7,"cargo":8},
  kpa_e00_spg: {"fac":"kpa","role":"spg","cat":"vehicle","layer":"ground","name":"M-1989 Koksan","full":"M-1989 170mm self-propelled gun","cost":1190,"oil":15,"time":18,"hp":615,"armor":"light","speed":1.14,"turn":1.3,"sight":4.7,"r":15,"mass":40,"weapons":["w_e00_kpa_spg"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"1989","confidence":"medium","desc":"Unchanged and still the longest-ranged tube artillery in the region.","turret":true,"tturn":0.7},
  kpa_e00_mlrs: {"fac":"kpa","role":"mlrs","cat":"vehicle","layer":"ground","name":"KN-09","full":"KN-09 (M2010) 300mm guided multiple rocket launcher","cost":1380,"oil":19,"time":20,"hp":575,"armor":"light","speed":1.29,"turn":1.3,"sight":4.9,"r":15,"mass":30,"weapons":["w_e00_kpa_mlrs"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2014","confidence":"medium","desc":"A significant break from unguided saturation fire - 300mm rockets with claimed inertial or satellite guidance, putting most of South Korea in range from behind the DMZ. Accuracy claims come from North Korean state media and are unverified.","turret":true,"tturn":0.8},
  kpa_e00_spaag: {"fac":"kpa","role":"spaag","cat":"vehicle","layer":"ground","name":"M-1989 Flak","full":"M-1989 twin 37mm SPAAG","cost":610,"oil":9,"time":10,"hp":635,"armor":"light","speed":1.58,"turn":1.9,"sight":7.4,"r":14,"mass":26,"weapons":["w_e00_kpa_spaag"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"1989","confidence":"medium","desc":"Unchanged. Twenty years on it is still optically laid, which by this era is genuinely remarkable.","turret":true,"tturn":2.4},
  kpa_e00_aa: {"fac":"kpa","role":"aa","cat":"infantry","layer":"ground","name":"KN-06 Pongae-5","full":"KN-06 / Pongae-5 surface-to-air missile system","cost":235,"oil":0,"time":5,"hp":95,"armor":"infantry","speed":0.89,"turn":6,"sight":6.8,"r":6,"mass":0.1,"weapons":["w_e00_kpa_aa"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2017","confidence":"low","desc":"North Korea's first attempt at an S-300-class long-range SAM, tested from 2010 and declared ready around 2017. Externally it looks the part. Whether the seeker, the radar and the fire-control software actually deliver S-300-class performance is entirely unverified, and deployed battery numbers appear small."},
  kpa_e00_recon: {"fac":"kpa","role":"recon","cat":"vehicle","layer":"ground","name":"M-1992 Armoured Car","full":"M-1992 4x4 armoured reconnaissance car","cost":240,"oil":4,"time":5,"hp":290,"armor":"light","speed":2.57,"turn":3,"sight":7.6,"r":11,"mass":6,"weapons":["w_e00_kpa_recon"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"1992","confidence":"low","desc":"Unchanged.","turret":true,"tturn":2},
  kpa_e00_fighter: {"fac":"kpa","role":"fighter","cat":"aircraft","layer":"air","name":"MiG-29 Fulcrum","full":"Mikoyan MiG-29 (9-12/9-13)","cost":1050,"oil":27,"time":17,"hp":380,"armor":"air","speed":8.6,"turn":2,"sight":6,"r":15,"mass":0,"weapons":["w_e00_kpa_fighter"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"1988","confidence":"medium","desc":"No new fighter type enters KPAF service in this entire period - not one. The MiG-29 fleet is small, unmodernised, and flying limited hours. Reported airframe counts vary between about 16 and 35 and serviceability is unknown.","jet":true,"ammo":2,"radar":1.5,"radius":26,"rcs":1},
  kpa_e00_cas: {"fac":"kpa","role":"cas","cat":"aircraft","layer":"air","name":"Su-25 Frogfoot","full":"Sukhoi Su-25K","cost":1425,"oil":30,"time":22,"hp":730,"armor":"air","speed":5.54,"turn":1.5,"sight":7.6,"r":17,"mass":0,"weapons":["w_e00_kpa_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"1987","confidence":"high","desc":"Unchanged.","jet":true,"ammo":6,"radius":28,"rcs":1.5},
  kpa_e00_gunship: {"fac":"kpa","role":"gunship","cat":"aircraft","layer":"air","name":"Mi-24 Hind","full":"Mil Mi-24D","cost":1095,"oil":19,"time":16,"hp":670,"armor":"air","speed":3.27,"turn":2,"sight":7.4,"r":17,"mass":0,"weapons":["w_e00_kpa_gunship"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"1986","confidence":"medium","desc":"Unchanged. The MD-500 fleet is progressively armed with Bulsae missiles in this period and paraded as an attack helicopter.","ammo":7,"hover":true,"radius":20,"rcs":0.9},
  kpa_e00_transport: {"fac":"kpa","role":"transport","cat":"aircraft","layer":"air","name":"An-2 Colt","full":"Antonov An-2 / Y-5","cost":495,"oil":8,"time":8,"hp":405,"armor":"air","speed":3.37,"turn":2.6,"sight":6.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"1965","confidence":"high","desc":"Unchanged. Still the doctrinal special-forces insertion aircraft after fifty years.","ammo":0,"hover":true,"cargo":10,"radius":26,"rcs":1.3},
  kpa_e00_missileboat: {"fac":"kpa","role":"missileboat","cat":"naval","layer":"sea","name":"Nongo-class","full":"Nongo-class fast attack craft","cost":720,"oil":15,"time":14,"hp":540,"armor":"light","speed":3.17,"turn":1.85,"sight":4.9,"r":16,"mass":0,"weapons":["w_e00_kpa_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2014","confidence":"medium","desc":"The most modern KPN surface unit before 2025. The Kh-35-derived missile is sea-skimming and turbojet-powered - a real generational jump over Styx. Several distinct variants exist under this label and open-source identification is inconsistent.","sonar":0,"rcs":0.6},
  kpa_e00_sub: {"fac":"kpa","role":"sub","cat":"naval","layer":"sub","name":"Sinpo-class (Gorae)","full":"Sinpo-class / Gorae-class experimental ballistic missile submarine","cost":855,"oil":25,"time":20,"hp":670,"armor":"light","speed":1.58,"turn":1,"sight":6.4,"r":16,"mass":0,"weapons":["w_e00_kpa_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2016","confidence":"medium","desc":"Roughly 2,000 tonnes, one hull, essentially a test platform rather than an operational deterrent - a single tube on a diesel boat with limited endurance. Ejection and flight tests ran from 2015-2016. Strategically significant, militarily marginal.","sonar":2.5,"quiet":1.04},
  nato_e50_rifle: {"fac":"nato","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Squad","full":"US Army Rifle Squad, M1 Garand","cost":70,"oil":0,"time":4,"hp":60,"armor":"infantry","speed":0.9,"turn":7,"sight":3.6,"r":6,"mass":0.1,"weapons":["w_e50_nato_rifle"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1936","confidence":"high","desc":"Semi-automatic, eight-round en-bloc clip, no true squad automatic weapon beyond the BAR. Heavy (4.3 kg) and slow to reload, but it was the only general-issue self-loading rifle of WWII and it stayed the standard through Korea. Replaced by the M14 from 1959. West German and British squads of this decade carry the FN FAL"},
  nato_e50_at: {"fac":"nato","role":"at","cat":"infantry","layer":"ground","name":"Super Bazooka","full":"M20A1 3.5in Rocket Launcher","cost":185,"oil":0,"time":7,"hp":55,"armor":"infantry","speed":0.76,"turn":6,"sight":4.3,"r":6,"mass":0.1,"weapons":["w_e50_nato_at"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1950","confidence":"high","desc":"Rushed to Korea in July 1950 specifically because the 2.36in bazooka bounced off T-34s. It works, but it is a two-man shoulder tube with roughly 100m practical range against a moving tank - the gunner must let armour get very close. The heavier answer is the M40 106mm recoilless rifle (1955), jeep- or tripod-mounted, w"},
  nato_e50_mbt: {"fac":"nato","role":"mbt","cat":"vehicle","layer":"ground","name":"M48 Patton","full":"M48A2 Patton","cost":690,"oil":10,"time":17,"hp":910,"armor":"heavy","speed":1.33,"turn":1.5,"sight":4.8,"r":16,"mass":62,"weapons":["w_e50_nato_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"Cast hemispherical turret, gasoline engine (a serious fire risk, fixed only with the diesel M48A3 from 1963), stereoscopic rangefinder that demanded a trained eye. Roughly comparable to the T-54 it was built to fight. Note the British Centurion Mk 3 (1948) is the better tank of this decade - its 20-pounder and stabilis","turret":true,"tturn":1.5,"crush":true},
  nato_e50_lighttank: {"fac":"nato","role":"lighttank","cat":"vehicle","layer":"ground","name":"Walker Bulldog","full":"M41A1 Walker Bulldog","cost":345,"oil":4,"time":9,"hp":365,"armor":"light","speed":1.81,"turn":2.4,"sight":4.5,"r":13,"mass":20,"weapons":["w_e50_nato_lighttank"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"Air-transportable reconnaissance tank replacing the M24 Chaffee. Fast and reliable, but 76mm was already marginal against contemporary armour and the crew of four had no protection worth the name. Passed to allies (ROC, South Vietnam, Brazil) as the US moved to the Sheridan.","turret":true,"tturn":1.6},
  nato_e50_ifv: {"fac":"nato","role":"ifv","cat":"vehicle","layer":"ground","name":"M59 APC","full":"M59 Armored Personnel Carrier","cost":415,"oil":5,"time":11,"hp":425,"armor":"light","speed":1.51,"turn":2,"sight":4.5,"r":14,"mass":30,"weapons":["w_e50_nato_ifv"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1954","confidence":"high","desc":"Be honest in the game text: this is not an IFV and NATO had none in the 1950s. The M59 is a boxy steel taxi that carries ten men to the edge of the fight and puts them out on foot. No autocannon, no firing ports, no thermal anything, twin commercial petrol engines that were underpowered from day one. The first Western ","turret":true,"tturn":1.8,"cargo":5},
  nato_e50_spg: {"fac":"nato","role":"spg","cat":"vehicle","layer":"ground","name":"M44","full":"M44 155mm Self-Propelled Howitzer","cost":690,"oil":9,"time":17,"hp":405,"armor":"light","speed":1.16,"turn":1.5,"sight":3.3,"r":15,"mass":39,"weapons":["w_e50_nato_spg"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1953","confidence":"medium","desc":"Open-topped superstructure on an M41 chassis - the crew are exposed to counter-battery fragments and weather. Manual loading, no on-board fire control worth the name; targeting is a map, a plotting board and a telephone to a forward observer. Its 105mm stablemate is the M52.","turret":true,"tturn":0.9},
  nato_e50_mlrs: {"fac":"nato","role":"mlrs","cat":"vehicle","layer":"ground","name":"Honest John","full":"MGR-1A Honest John free-flight rocket","cost":1010,"oil":16,"time":24,"hp":365,"armor":"light","speed":1.12,"turn":1.3,"sight":3.3,"r":15,"mass":25,"weapons":["w_e50_nato_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"The closest thing the 1950s US Army has to rocket artillery, and it is not a saturation weapon - it is one large spin-stabilised unguided rocket per launcher, reloaded by crane, with accuracy so poor that the intended payload was nuclear. Deployed to Europe from 1954. The US had abandoned WWII-style barrage rocket laun","turret":true,"tturn":0.8},
  nato_e50_spaag: {"fac":"nato","role":"spaag","cat":"vehicle","layer":"ground","name":"M42 Duster","full":"M42A1 Duster","cost":460,"oil":6,"time":12,"hp":415,"armor":"light","speed":1.42,"turn":1.9,"sight":5.7,"r":14,"mass":47,"weapons":["w_e50_nato_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"Optically aimed only - no fire-control radar, so it is effectively useless against the jets it was built to shoot at. Its actual combat career was in Vietnam firing horizontally at infantry, which it did devastatingly well. A good example of a unit whose real value diverged completely from its designed role.","turret":true,"tturn":2.6,"radar":4.8},
  nato_e50_aa: {"fac":"nato","role":"aa","cat":"infantry","layer":"ground","name":"Quad .50","full":"M55 Quadmount trailer (M45 turret)","cost":160,"oil":0,"time":6,"hp":50,"armor":"infantry","speed":0.77,"turn":6,"sight":4.8,"r":6,"mass":0.1,"weapons":["w_e50_nato_aa"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1950","confidence":"medium","desc":"There is no MANPADS in this era - the shoulder-launched SAM does not exist until Redeye in 1968. Battalion air defence is a towed quad .50 aimed by a reflector sight, effective to maybe 1,000m against propeller aircraft and essentially decorative against a jet. Strategic air defence is separate and static: MIM-3 Nike A"},
  nato_e50_recon: {"fac":"nato","role":"recon","cat":"vehicle","layer":"ground","name":"M8 Greyhound","full":"M8 Greyhound 6x6 armoured car","cost":185,"oil":2,"time":5,"hp":175,"armor":"light","speed":2.45,"turn":3.2,"sight":5.7,"r":11,"mass":5,"weapons":["w_e50_nato_recon"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1943","confidence":"high","desc":"Six-wheeled armoured car with a 37mm gun, built in enormous numbers for the last war and still doing the scouting in the first years of this one. Thin-skinned and famously vulnerable to mines, which is why crews lined the floor with sandbags.","turret":true,"tturn":2.4},

  /* ---- THE USAF FIGHTER LINE: FIVE AEROPLANES OF FOUR DIFFERENT SIZES ----
     Sabre, Phantom, Eagle, Viper, Raptor - and the generated figures had them
     climbing 220, 270, 330, 375, 405 hit points in order of date, which puts
     a 30-tonne twin-engined F-15C BELOW a 12-tonne single-engined F-16C and
     both of them below the present-day F-16 at 420. Two of those comparisons
     are the wrong way round and the third contradicts this game's own roster:
     rules.js carries the F-22 at 520 hp, speed 9.6, turn 2.4 and a 48-tile
     radius as stealth_n, while this row - the SAME aeroplane - had 405, 8.41,
     1.9 and 40. That is the fault [53] records for the Raptor's radar cross
     section, in the airframe fields.
     What these aeroplanes are:
       F-86F, 1953 - and the date is part of the correction: 1949 is the
       F-86A. The F-model flew in March 1952 and reached the wings in Korea in
       the spring of 1953, which is the aeroplane this row is named for.
       Its SPEED is one of the few figures the generator got right and is left
       alone: 7.31 against the MiG-17F's 7.57 in the same band is 1,106 km/h
       against 1,145 - the Korea duel to within half a per cent, and the one
       air-to-air comparison in this file that a player fights head-on. What
       was wrong is the reach and the bookkeeping. A Sabre on two 200-gallon
       tanks has a combat radius near 500 km, the shortest in this line and
       nowhere near an F-16's, and the SAME aeroplane was carrying three
       different radii in three air forces - 37 here, 32 in the hand-written
       Luftwaffe row, 39 in the ROC's. All three read 32 now.
       F-4C, 1963 - 13.8 tonnes empty, twin J79s, Mach 2.2. The German F-4F in
       this same file is hand-written at 340 hp and the Phantom is the same
       aeroplane. It is also the one aeroplane here that genuinely could not
       turn: the whole Vietnam air-combat story, and the gun pod, and Top Gun,
       come out of an energy fighter being dragged into a knife fight by a
       MiG-17. Hence turn 1.7, the lowest of the five, against the MiG-21's
       2.0 - the row's own desc has said so all along.
       F-15C, 1979 - 30.8 tonnes gross, two F100s, Mach 2.5, and over a
       hundred air-to-air kills for no losses. The heaviest fighter in this
       line until the Raptor, the fastest until it too, and the dearest of its
       own day by a distance: the whole reason the F-16 exists is
       that the USAF could not afford an all-Eagle force. The cost figures now
       say that - 1350 against the Viper's 1205 - which is the hi-lo mix.
       F-16C Block 50, 1991 - 9.2 tonnes empty, one engine, Mach 2.0 and the
       shortest legs of the three modern marks. Not a better F-15; a cheaper
       one, bought by the hundred.
       F-22A, 2005 - brought to rules.js's own Raptor figures, less the margin
       the present-day row has earned in twenty years of blocks. Cost 2100
       against 2600 for the same reason, and because 1330 for a Raptor is not
       a price anyone ever paid: 187 were built instead of 750 on exactly that
       argument, which the row's desc already tells the player.
     A PRICE IS THREE NUMBERS IN THIS GAME, NOT ONE. ai.js forceBook() sums
     def.oil per unit into a ground/air/sea book and oilBudget() sets the arm
     shares from it, and player.js refuses a build for want of barrels, not
     credits - so a row whose cost rises and whose `oil` does not is invisible
     to the machinery that decides how much air force to own, and is the
     cheapest fuel in the roster besides. Every row here that got dearer got
     proportionally thirstier and slower to build, at its own faction's
     credits-per-barrel (NATO about 46, the PLA 47, the KPA 39) and its own
     band's credits-per-second. Those two ratios are constants of this file
     and are left exactly where they were. The Raptor's speed is 9.55 rather
     than 9.3 for a duller reason: at 9.3 it was slower than the subsonic
     F-117A two slots away, which is a separate fault in a chain this work
     does not own. */
  nato_e50_fighter: {"fac":"nato","role":"fighter","cat":"aircraft","layer":"air","name":"F-86 Sabre","full":"North American F-86F Sabre","cost":645,"oil":14,"time":16,"hp":220,"armor":"air","speed":7.31,"turn":1.9,"sight":6.6,"r":15,"mass":0,"weapons":["w_e50_nato_fighter"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"Swept-wing day fighter, gun-armed, gunsight-ranging radar only - no radar missile, no beyond-visual-range capability, and a combat radius of a few hundred kilometres. Its Korea kill ratio is genuinely disputed in open sources; the long-claimed 10:1 has been revised sharply downward by later research using Soviet record","jet":true,"ammo":2,"radar":3.6,"radius":32,"rcs":0.6},
  nato_e50_cas: {"fac":"nato","role":"cas","cat":"aircraft","layer":"air","name":"A-1 Skyraider","full":"Douglas AD-4 Skyraider","cost":920,"oil":18,"time":22,"hp":395,"armor":"air","speed":4.82,"turn":1.5,"sight":5.4,"r":17,"mass":0,"weapons":["w_e50_nato_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e50","to":"e50","service":"1946","confidence":"high","desc":"A piston-engined single-seater that outlasted three generations of jets in the CAS role because loiter time and payload matter more than speed when you are supporting troops in contact. Still flying combat in 1972. If any 1950s aircraft should carry into e60 unchanged, it is this one.","jet":true,"ammo":3,"radius":31,"rcs":1.4},
  nato_e50_gunship: {"fac":"nato","role":"gunship","cat":"aircraft","layer":"air","name":"(none)","full":"No such American equipment in this period","cost":735,"oil":12,"time":17,"hp":320,"armor":"air","speed":3.1,"turn":2.2,"sight":5.7,"r":16,"mass":0,"weapons":["w_e50_nato_gunship"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1958","confidence":"low","desc":"No armed American helicopter existed until the UH-1B gunship kit of 1962.","ammo":4,"hover":true,"radius":22,"rcs":0.75},
  nato_e50_transport: {"fac":"nato","role":"transport","cat":"aircraft","layer":"air","name":"H-19 Chickasaw","full":"Sikorsky H-19D Chickasaw (S-55)","cost":415,"oil":6,"time":11,"hp":270,"armor":"air","speed":3.61,"turn":2.4,"sight":4.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1950","confidence":"high","desc":"First US helicopter capable of moving a useful squad-sized load, engine mounted in the nose ahead of the cockpit. Ten troops in theory, far fewer in Korean summer heat and altitude. Established casualty evacuation and vertical resupply as normal practice. Followed by the H-21 Shawnee (1952) and H-34 Choctaw (1955).","ammo":0,"hover":true,"cargo":8,"radius":31,"rcs":0.9},
  nato_e50_corvette: {"fac":"nato","role":"corvette","cat":"naval","layer":"sea","name":"Dealey DE","full":"USS Dealey (DE-1006), Dealey-class destroyer escort","cost":550,"oil":7,"time":13,"hp":600,"armor":"light","speed":2.49,"turn":1.7,"sight":5.7,"r":17,"mass":0,"weapons":["w_e50_nato_corvette","aagun_3in50"],"prereq":["navalyard"],"tech":1,"from":"e50","to":"e50","service":"1954","confidence":"high","desc":"The US Navy has no ship it calls a corvette; the small escort of this era is the destroyer escort, a cheap single-screw hull built to shepherd convoys against submarines. Dealey was the first postwar new-build DE. Thin, slow (25 knots), and specialised almost entirely for ASW.","turret":true,"tturn":2,"sonar":3.6,"ciws":0.32,"rcs":0.85},
  nato_e50_destroyer: {"fac":"nato","role":"destroyer","cat":"naval","layer":"sea","name":"Forrest Sherman DD","full":"USS Forrest Sherman (DD-931), Forrest Sherman-class","cost":1010,"oil":16,"time":22,"hp":1090,"armor":"heavy","speed":2.06,"turn":1.2,"sight":6.6,"r":20,"mass":0,"weapons":["w_e50_nato_destroyer","aagun_dp127"],"prereq":["navalyard","radar"],"tech":2,"from":"e50","to":"e50","service":"1955","confidence":"high","desc":"The last all-gun destroyers the US ever built - no missiles at all as commissioned. Everything after this carries SAMs. Note that most of the destroyer force in 1955 is not new construction at all but WWII Gearing and Sumner hulls, later rebuilt under the FRAM programme from 1960 to add ASW helicopters and ASROC.","turret":true,"tturn":1.4,"sonar":5.7,"radar":12,"ciws":0.52,"rcs":1.05},
  nato_e50_sub: {"fac":"nato","role":"sub","cat":"naval","layer":"sub","name":"Nautilus SSN","full":"USS Nautilus (SSN-571)","cost":1105,"oil":18,"time":24,"hp":650,"armor":"light","speed":2.15,"turn":1.1,"sight":5.1,"r":17,"mass":0,"weapons":["w_e50_nato_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e50","to":"e50","service":"1954","confidence":"high","desc":"The first nuclear-powered vessel of any kind, and the single most important warship of the decade - it made the submarine a true submersible rather than a submersible torpedo boat, able to stay down indefinitely and outrun surface escorts underwater. Underway on nuclear power January 1955; under the North Pole 1958. Th","sonar":6.6,"quiet":0.58,"nuclear":true},
  nato_e50_cruiser: {"fac":"nato","role":"cruiser","cat":"naval","layer":"sea","name":"Des Moines CA","full":"USS Des Moines (CA-134), Des Moines-class heavy cruiser","cost":1565,"oil":28,"time":33,"hp":1510,"armor":"heavy","speed":1.72,"turn":0.9,"sight":7.2,"r":23,"mass":0,"weapons":["w_e50_nato_cruiser","aagun_5in38"],"prereq":["navalyard","lab"],"tech":3,"from":"e50","to":"e50","service":"1948","confidence":"high","desc":"This is the ship the game's 203mm main battery actually describes. The Des Moines class carried the only fully automatic 8in guns ever built - roughly 10 rounds per minute per barrel against three or four for older cruisers - and remained the heaviest conventional naval gunfire support in the world until decommissionin","turret":true,"tturn":1,"sonar":5.4,"radar":13.2,"ciws":0.56,"rcs":1.9},
  nato_e50_carrier: {"fac":"nato","role":"carrier","cat":"naval","layer":"sea","name":"Forrestal CVA","full":"USS Forrestal (CVA-59)","cost":2300,"oil":51,"time":47,"hp":2185,"armor":"heavy","speed":1.38,"turn":0.6,"sight":8.4,"r":30,"mass":0,"weapons":["w_e50_nato_carrier"],"prereq":["navalyard","lab","airbase"],"tech":3,"from":"e50","to":"e50","service":"1955","confidence":"high","desc":"The first supercarrier: angled flight deck, steam catapults, deck-edge lifts, sized from the start for heavy jets and nuclear strike aircraft. Every US carrier since is a variation on this layout. The WWII Essex hulls remain the numerical backbone through the decade, modernised under SCB-27 and SCB-125 to take the angl","carrier":4,"sonar":3,"radar":10.8,"ciws":0.47,"rcs":2.6},

  /* ---- NATO AIRBORNE EARLY WARNING: THREE AEROPLANES, NOT ONE ----------
     This slot is not one machine getting better every decade. It is a
     65-tonne piston airliner, then a 24-tonne carrier turboprop, then a
     148-tonne four-jet 707 - and the five rows were given one smooth climb
     regardless, because each figure is the e20 anchor (awacs_n, the E-3G, at
     620 hp / 4.2 / 70 tiles) multiplied by the same per-era factor this file
     applies to every other role: 0.52, 0.64, 0.79, 0.89, 0.96. Measured, that
     put the E-2A of 1964 at 395 hp with a 66-tile combat radius - six per
     cent short of an E-3's reach, on an aeroplane with two turboprops and a
     fifth of the fuel.
     What the marks actually are:
       EC-121D WARNING STAR, 1954 - a Lockheed Super Constellation with four
       Wright R-3350 PISTON engines, about 230 kt in the cruise, orbiting the
       seaward approaches for the best part of a day. Big and slow, and it has
       to be both: it is a radar picket, not an interceptor controller.
       Its `jet` flag was set and is now false - the same flag the C-130 and
       the Shackleton AEW.2 already carry - which also stops generations.js
       marking a 1954 Constellation as air-to-air refuellable.
       E-2A HAWKEYE, 1964 - 24 tonnes, two Allison T56 turboprops, and much
       the shortest legs in this line. The game already holds this airframe
       five times on the carrier side, nato_e50..e00_cawacs, at r 22 and radii
       of 30 to 55 tiles; the land-based row was the only E-2 in the game
       wearing a 707's size and reach. It now matches its own sister row, the
       E-2B of 1969, which is the same aeroplane sent back to Grumman.
       E-3B, 1977, and E-8C, 1996 - both are Boeing 707-320s, the same
       airframe as the E-3G that already sits in the e00 band and in rules.js.
       Three 707s cannot differ by seventeen per cent in hit points merely for
       being stamped with different decades, so the two early rows come UP to
       the E-3G rather than the E-3G coming down to them.
     The chain therefore falls from 1954 to 1964 and climbs again in 1977.
     That is the honest shape - a carrier turboprop replaced a land-based
     airliner in this slot and is a far smaller aeroplane - and it is the same
     argument heavyair.js makes when the B-52G carries fewer cruise missiles
     than the H. Detection quality is NOT here: radar, radarQ and jam are the
     sensor tables' business. This is the airframe only. */
  nato_e50_awacs: {"fac":"nato","role":"awacs","cat":"aircraft","layer":"air","name":"EC-121 Warning Star","full":"Lockheed EC-121D Warning Star (Navy WV-2)","cost":1700,"oil":32,"time":27,"hp":470,"armor":"air","speed":2.9,"turn":0.9,"sight":9.0,"r":24,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e50","to":"e50","service":"1954","confidence":"medium","desc":"Airborne early warning genuinely exists in the 1950s. A Super Constellation airliner with an APS-20 belly radome and an APS-45 height-finder on top, orbiting the seaward approaches as a flying radar picket. It has no overland look-down capability whatsoever - ground clutter defeats it - so it is an ocean and coastal sensor and blind over land. Four Wright R-3350 piston engines and about 230 knots in the cruise: the slowest aeroplane in the NATO air roster, and by a long way the most patient. Sixty-five tonnes, so it is a much larger machine than the carrier turboprop that replaces it in this slot ten years later.","jet":false,"ammo":0,"radar":20.4,"radius":58,"rcs":3.2},
  nato_e50_ewair: {"fac":"nato","role":"ewair","cat":"aircraft","layer":"air","name":"AD-5Q Skyraider","full":"Douglas AD-5Q (redesignated EA-1F in 1962)","cost":1290,"oil":20,"time":25,"hp":270,"armor":"air","speed":6.54,"turn":1.9,"sight":7.5,"r":16,"mass":0,"weapons":["w_e50_nato_ewair"],"prereq":["airbase","lab"],"tech":3,"from":"e50","to":"e50","service":"1956","confidence":"low","desc":"Include with caution - 1950s electronic warfare is mostly chaff, noise jammers carried inside bombers, and dedicated ferret aircraft (RB-47H, RB-50) flying peripheral intelligence missions rather than escorting strikes. The AD-5Q is the first carrier-based dedicated EW aircraft, four crew in a widened Skyraider fuselag","jet":true,"ammo":2,"radar":9.6,"radius":35,"rcs":0.6},
  nato_e60_rifle: {"fac":"nato","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Squad","full":"US Rifle Squad, M16A1","cost":85,"oil":0,"time":4,"hp":75,"armor":"infantry","speed":0.95,"turn":7,"sight":4.2,"r":6,"mass":0.1,"weapons":["w_e60_nato_rifle"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1967","confidence":"high","desc":"General issue 1967 after the XM16E1 debacle of 1964-66, in which unchromed chambers and a propellant change caused fatal jamming in Vietnam. Once fixed, it halved the weight of the rifleman's ammunition load and made full-automatic fire practical from a shoulder weapon. The M14 (1959) it replaced lasted barely eight ye"},
  nato_e60_at: {"fac":"nato","role":"at","cat":"infantry","layer":"ground","name":"LAW","full":"M72 LAW 66mm light anti-armour weapon","cost":230,"oil":0,"time":7,"hp":65,"armor":"infantry","speed":0.79,"turn":6,"sight":5,"r":6,"mass":0.1,"weapons":["w_e60_nato_at"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"Single-shot throwaway tube weighing 2.5 kg - every rifleman can carry one. Effective against BTRs and bunkers, marginal against a T-62 from the front even in 1963 and hopeless after reactive armour. The platoon's guided answer is the M47 Dragon (1975), which is accurate but requires the gunner to sit still tracking the"},
  nato_e60_mbt: {"fac":"nato","role":"mbt","cat":"vehicle","layer":"ground","name":"M60A1 Patton","full":"M60A1 Patton","cost":855,"oil":13,"time":18,"hp":1120,"armor":"heavy","speed":1.4,"turn":1.5,"sight":5.6,"r":16,"mass":62,"weapons":["w_e60_nato_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1962","confidence":"high","desc":"Tall, diesel, well-armed and slow, with the best-selling tank gun of the century. The M60A2 'Starship' variant with a 152mm gun/missile launcher (1974) was a costly failure withdrawn within five years. Upgraded to M60A3 with a laser rangefinder and thermal sight in 1979, which is what fought in the Gulf with the USMC.","turret":true,"tturn":1.5,"crush":true},
  nato_e60_lighttank: {"fac":"nato","role":"lighttank","cat":"vehicle","layer":"ground","name":"Sheridan","full":"M551 Sheridan Armored Reconnaissance / Airborne Assault Vehicle","cost":425,"oil":5,"time":10,"hp":450,"armor":"light","speed":1.89,"turn":2.4,"sight":5.3,"r":13,"mass":20,"weapons":["w_e60_nato_lighttank"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1967","confidence":"high","desc":"Be blunt about this one. Aluminium hull, air-droppable, and a combustible-case main gun whose recoil could knock out the missile guidance electronics. The caseless ammunition absorbed moisture and the crew compartment was catastrophically vulnerable to mines. The Shillelagh missile was rarely if ever fired in Vietnam. ","turret":true,"tturn":1.6},
  nato_e60_ifv: {"fac":"nato","role":"ifv","cat":"vehicle","layer":"ground","name":"M113 ACAV","full":"M113 with the Armored Cavalry Assault Vehicle gun shields","cost":515,"oil":6,"time":12,"hp":525,"armor":"light","speed":1.58,"turn":2,"sight":5.3,"r":14,"mass":30,"weapons":["w_e60_nato_ifv"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1960","confidence":"high","desc":"An aluminium box that carries a squad and, with the ACAV kit, fights from the hatches behind gun shields. It is not a fighting vehicle in the later sense - no turret, no cannon - but it is the vehicle that put American infantry on tracks and it went everywhere.","turret":true,"tturn":1.8,"cargo":5},
  nato_e60_spg: {"fac":"nato","role":"spg","cat":"vehicle","layer":"ground","name":"M109","full":"M109 155mm Self-Propelled Howitzer","cost":855,"oil":11,"time":18,"hp":500,"armor":"light","speed":1.22,"turn":1.5,"sight":3.9,"r":15,"mass":39,"weapons":["w_e60_nato_spg"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"The most successful Western SPG ever built and still in the game sixty years later. The enclosed 360-degree turret was the real advance over the M44 - crew protection and the ability to shift fires without repositioning the vehicle. Every subsequent variant through A6 Paladin and A7 is the same basic vehicle re-engined","turret":true,"tturn":0.9},
  nato_e60_mlrs: {"fac":"nato","role":"mlrs","cat":"vehicle","layer":"ground","name":"(none)","full":"No such American equipment in this period","cost":1255,"oil":19,"time":25,"hp":450,"armor":"light","speed":1.17,"turn":1.3,"sight":3.9,"r":15,"mass":25,"weapons":["w_e60_nato_mlrs","scat_at2_lars"],"dispenser":8,"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e60","service":"1969","confidence":"medium","desc":"The US fielded no multiple rocket launcher until the M270 of 1983.","turret":true,"tturn":0.8},
  nato_e60_spaag: {"fac":"nato","role":"spaag","cat":"vehicle","layer":"ground","name":"M163 VADS","full":"M163 Vulcan Air Defense System","cost":570,"oil":8,"time":12,"hp":510,"armor":"light","speed":1.49,"turn":1.9,"sight":6.7,"r":14,"mass":47,"weapons":["w_e60_nato_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1968","confidence":"high","desc":"A range-only radar and a lead-computing sight, not a tracking radar - it is a much less capable system than the Gepard and it knows it. 3,000 rounds per minute, but the 20mm shell is too light to reliably kill a hardened attack aircraft, and effective slant range is under 1,600 m. Like the Duster before it, its most-us","turret":true,"tturn":2.6,"radar":5.6},
  nato_e60_aa: {"fac":"nato","role":"aa","cat":"infantry","layer":"ground","name":"Redeye","full":"FIM-43C Redeye MANPADS","cost":200,"oil":0,"time":7,"hp":65,"armor":"infantry","speed":0.81,"turn":6,"sight":5.6,"r":6,"mass":0.1,"weapons":["w_e60_nato_aa"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1968","confidence":"high","desc":"The first Western shoulder-fired SAM, and a limited one: the uncooled seeker can only see a hot jet exhaust, so it can engage aircraft only after they have already attacked and are flying away. No head-on capability at all. Its replacement, Stinger, fixes precisely this. Divisional cover in this era comes from MIM-23 H"},
  nato_e60_recon: {"fac":"nato","role":"recon","cat":"vehicle","layer":"ground","name":"M151 MUTT","full":"M151A1 Military Utility Tactical Truck","cost":230,"oil":3,"time":6,"hp":220,"armor":"light","speed":2.57,"turn":3.2,"sight":6.7,"r":11,"mass":5,"weapons":["w_e60_nato_recon"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1960","confidence":"high","desc":"The quarter-ton jeep with independent rear suspension that made it notoriously prone to rollover. Unarmoured - reconnaissance in this doctrine means seeing first and leaving, not fighting. From 1970 it became the first TOW carrier. West Germany's proper answer is the 8x8 SpPz 2 Luchs (1975), amphibious, 20mm-armed, wit","turret":true,"tturn":2.4},
  nato_e60_fighter: {"fac":"nato","role":"fighter","cat":"aircraft","layer":"air","name":"F-4 Phantom II","full":"McDonnell Douglas F-4C Phantom II","cost":900,"oil":17,"time":17,"hp":340,"armor":"air","speed":8.2,"turn":1.7,"sight":7.7,"r":15,"mass":0,"weapons":["w_e60_nato_fighter"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"The defining Western fighter of the era, flown by the USAF, Navy, Marines, RAF, Luftwaffe and others. Two crew, huge radar, tremendous thrust, and originally no gun at all - a doctrinal bet on missiles that Vietnam disproved, since early Sparrow and Sidewinder reliability was dreadful and rules of engagement often forc","jet":true,"ammo":2,"radar":4.2,"radius":40,"rcs":0.6},
  nato_e60_cas: {"fac":"nato","role":"cas","cat":"aircraft","layer":"air","name":"A-7 Corsair II","full":"LTV A-7D Corsair II","cost":1140,"oil":23,"time":23,"hp":485,"armor":"air","speed":5.04,"turn":1.5,"sight":6.3,"r":17,"mass":0,"weapons":["w_e60_nato_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e60","service":"1968","confidence":"high","desc":"Subsonic light attack aircraft with, for its day, a genuinely advanced bombing computer and head-up display - the first US aircraft that could put unguided bombs on target with real accuracy. Navy A-7A from 1967.","jet":true,"ammo":3,"radius":32,"rcs":1.4},
  nato_e60_gunship: {"fac":"nato","role":"gunship","cat":"aircraft","layer":"air","name":"AH-1G HueyCobra","full":"Bell AH-1G HueyCobra","cost":910,"oil":15,"time":18,"hp":395,"armor":"air","speed":3.24,"turn":2.2,"sight":6.7,"r":16,"mass":0,"weapons":["w_e60_nato_gunship"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1967","confidence":"high","desc":"The first purpose-built attack helicopter in the world. Huey dynamics in a 96 cm-wide fuselage with tandem seating, which cut the frontal target area enormously. The predecessors were armed transports - UH-1Bs with M6 quad machine gun kits from 1962 - and they were slow, overloaded and vulnerable. The Cobra was fast en","ammo":5,"hover":true,"radius":23,"rcs":0.75},
  nato_e60_transport: {"fac":"nato","role":"transport","cat":"aircraft","layer":"air","name":"UH-1 Huey","full":"Bell UH-1D Iroquois","cost":515,"oil":8,"time":12,"hp":335,"armor":"air","speed":3.78,"turn":2.4,"sight":5.6,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"Turbine power is what made air assault possible - the UH-1D carries eleven or twelve troops where the piston H-19 managed a nominal ten in ideal conditions. Over 7,000 served in Vietnam. Heavy lift comes from the CH-47A Chinook (1962), tandem-rotor, which is still in frontline service today in F-model form and is argua","ammo":0,"hover":true,"cargo":8,"radius":32,"rcs":0.9},
  nato_e60_corvette: {"fac":"nato","role":"corvette","cat":"naval","layer":"sea","name":"Knox FF","full":"USS Knox (FF-1052), Knox-class frigate","cost":685,"oil":9,"time":13,"hp":735,"armor":"light","speed":2.61,"turn":1.7,"sight":6.7,"r":17,"mass":0,"weapons":["w_e60_nato_corvette","aagun_dp127"],"prereq":["navalyard"],"tech":1,"from":"e60","to":"e60","service":"1969","confidence":"high","desc":"46 hulls of cheap single-screw ASW escort - the numerical filler of the Cold War Atlantic. Single screw meant poor manoeuvrability and a single-point propulsion failure. Its predecessors, the Garcia (1964) and Brooke (1966) classes, added the first frigate SAMs.","turret":true,"tturn":2,"sonar":4.2,"ciws":0.36,"rcs":1.05},
  nato_e60_destroyer: {"fac":"nato","role":"destroyer","cat":"naval","layer":"sea","name":"Charles F. Adams DDG","full":"USS Charles F. Adams (DDG-2)","cost":1255,"oil":19,"time":23,"hp":1345,"armor":"heavy","speed":2.16,"turn":1.2,"sight":7.7,"r":20,"mass":0,"weapons":["w_e60_nato_destroyer","sam_tartar"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1960","confidence":"high","desc":"The first US destroyers designed from the keel up around a surface-to-air missile. Three were built for West Germany as the Luetjens class and three for Australia. Superseded conceptually by the Spruance class (1975), which was gas-turbine powered, deliberately under-armed on commissioning to leave growth margin, and d","turret":true,"tturn":1.4,"sonar":6.7,"radar":14,"ciws":0.58,"rcs":1.05},
  nato_e60_sub: {"fac":"nato","role":"sub","cat":"naval","layer":"sub","name":"Sturgeon SSN","full":"USS Sturgeon (SSN-637)","cost":1370,"oil":23,"time":25,"hp":800,"armor":"light","speed":2.25,"turn":1.1,"sight":5.9,"r":17,"mass":0,"weapons":["w_e60_nato_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1967","confidence":"high","desc":"37 boats, the workhorse Cold War attack submarine, quieter than the Permit class before it and fitted for under-ice and special operations. The dangerous predecessor is USS Thresher, lost with all 129 aboard in 1963, which produced the SUBSAFE programme - no SUBSAFE-certified submarine has been lost since.","sonar":7.7,"quiet":0.47,"nuclear":true},
  nato_e60_cruiser: {"fac":"nato","role":"cruiser","cat":"naval","layer":"sea","name":"Long Beach CGN","full":"USS Long Beach (CGN-9)","cost":1940,"oil":34,"time":35,"hp":1855,"armor":"heavy","speed":1.8,"turn":0.9,"sight":8.4,"r":23,"mass":0,"weapons":["navgun_127","sam_terrier"],"prereq":["navalyard","lab"],"tech":3,"from":"e60","to":"e60","service":"1961","confidence":"high","desc":"The first nuclear-powered surface warship and the first all-missile cruiser - built with no guns at all until Kennedy reportedly objected. Its enormous flat-sided SCANFAR phased array superstructure was a technological dead end that consumed power and needed constant maintenance, but the ambition points directly at Aeg","turret":true,"tturn":1,"sonar":6.3,"radar":15.4,"ciws":0.62,"rcs":1.8},
  nato_e60_carrier: {"fac":"nato","role":"carrier","cat":"naval","layer":"sea","name":"Enterprise CVN","full":"USS Enterprise (CVN-65)","cost":2850,"oil":63,"time":50,"hp":2690,"armor":"heavy","speed":1.44,"turn":0.6,"sight":9.8,"r":30,"mass":0,"weapons":["w_e60_nato_carrier"],"prereq":["navalyard","lab","airbase"],"tech":3,"from":"e60","to":"e60","service":"1961","confidence":"high","desc":"Eight reactors, the only ship of her class, and the longest warship ever built. Proved nuclear propulsion for carriers but was ruinously expensive, which is why the follow-on took fourteen years and used two reactors instead of eight.","carrier":4,"sonar":3.5,"radar":12.6,"ciws":0.52,"rcs":2.6},
  deu_e60_missileboat: {"fac":"deu","role":"missileboat","cat":"naval","layer":"sea","name":"Type 148 Tiger","full":"Type 148 Tiger-class fast attack craft (West Germany)","cost":855,"oil":13,"time":16,"hp":575,"armor":"light","speed":2.7,"turn":1.8,"sight":6.3,"r":16,"mass":0,"weapons":["w_e60_nato_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1972","confidence":"high","desc":"NATO's genuine missile boat, and a Baltic weapon specifically - twenty craft built in France to a German requirement, intended to swarm out of the Danish straits and Kiel Bight against a Warsaw Pact amphibious force. The US Navy never wanted anything like this; the Bundesmarine's entire concept of operations depended o","sonar":0,"rcs":0.52},
  nato_e60_awacs: {"fac":"nato","role":"awacs","cat":"aircraft","layer":"air","name":"E-2 Hawkeye","full":"Grumman E-2A Hawkeye","cost":1850,"oil":40,"time":28,"hp":375,"armor":"air","speed":3.9,"turn":0.9,"sight":10.2,"r":22,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e60","to":"e60","service":"1964","confidence":"high","desc":"Carrier-capable airborne early warning with a rotodome, which is what the EC-121 could not do. Early E-2A/B avionics were unreliable; the E-2C of 1973 is where the type became genuinely effective. Its UHF-band radar was chosen for overwater detection of small targets and turned out, decades later, to be one of the better answers to a low-observable one. Note the size, because this row used to hide it: twenty-four tonnes and two turboprops against the E-3's hundred and forty-eight and four jets. Same airframe as nato_e60_cawacs, the E-2B, and it now carries the same numbers.","jet":true,"ammo":0,"radar":23.8,"radius":42,"rcs":3.2},
  nato_e60_ewair: {"fac":"nato","role":"ewair","cat":"aircraft","layer":"air","name":"EA-6B Prowler","full":"Grumman EA-6B Prowler","cost":1595,"oil":25,"time":26,"hp":335,"armor":"air","speed":6.84,"turn":1.9,"sight":8.8,"r":16,"mass":0,"weapons":["w_e60_nato_ewair"],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e60","service":"1971","confidence":"high","desc":"Four crew - one pilot, three electronic countermeasures officers - because jamming in this era is a manual craft, not an automated one. For nearly twenty years after the EF-111 retired, this was the only dedicated tactical jammer in the entire US inventory, flown by Navy and Marine squadrons on behalf of the Air Force ","jet":true,"ammo":2,"radar":11.2,"radius":36,"rcs":0.6},
  nato_e60_sead: {"fac":"nato","role":"sead","cat":"aircraft","layer":"air","name":"F-105G Wild Weasel","full":"Republic F-105G Thunderchief Wild Weasel III","cost":1085,"oil":19,"time":20,"hp":275,"armor":"air","speed":7.74,"turn":2,"sight":8,"r":15,"mass":0,"weapons":["w_e60_nato_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e60","to":"e60","service":"1968","confidence":"medium","desc":"SEAD as a mission is invented here, in response to the SA-2. The unofficial motto - 'YGBSM', You Gotta Be Shitting Me - is what the first volunteer electronic warfare officer said when told the job was to fly ahead of the strike package and get shot at deliberately. The F-100F Wild Weasel I (1965) came first and suffer","jet":true,"ammo":2,"radar":4.9,"radius":36,"rcs":0.6},
  nato_e80_rifle: {"fac":"nato","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Squad","full":"US Rifle Squad, M16A2","cost":110,"oil":0,"time":4,"hp":90,"armor":"infantry","speed":1,"turn":7,"sight":5,"r":6,"mass":0.1,"weapons":["w_e80_nato_rifle"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1983","confidence":"high","desc":"USMC adoption 1983, Army from 1986. Heavier barrel, three-round burst replacing full automatic on the grounds that conscript-era troops emptied magazines uselessly, and the heavier SS109/M855 round for better penetration at range. The genuinely important change in the squad is the M249 SAW (1984), which finally gave th"},
  nato_e80_at: {"fac":"nato","role":"at","cat":"infantry","layer":"ground","name":"AT4","full":"M136 AT4 84mm light anti-armour weapon","cost":290,"oil":0,"time":8,"hp":85,"armor":"infantry","speed":0.84,"turn":6,"sight":6,"r":6,"mass":0.1,"weapons":["w_e80_nato_at"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1987","confidence":"high","desc":"Swedish Carl Gustaf-derived disposable launcher replacing the M72 LAW - significantly more penetration, still single-shot and still short-ranged. The guided weapons remain the M47 Dragon (poor, and disliked by its gunners) and the Franco-German MILAN (1972), which was the far better system and equipped most European ar"},
  nato_e80_mbt: {"fac":"nato","role":"mbt","cat":"vehicle","layer":"ground","name":"M1A1 Abrams","full":"M1A1 Abrams","cost":1095,"oil":16,"time":20,"hp":1385,"armor":"heavy","speed":1.47,"turn":1.5,"sight":6.7,"r":16,"mass":62,"weapons":["w_e80_nato_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1985","confidence":"high","desc":"The base M1 arrived in 1980 with a 105mm gun; the M1A1 brought the German 120mm and, from 1988, depleted-uranium armour packages. Gas turbine engine - enormous fuel consumption is its real weakness and the reason a supply role exists in this game. Thermal sights and a stabilised hunter-killer fire control are what actu","turret":true,"tturn":1.5,"crush":true},
  nato_e80_lighttank: {"fac":"nato","role":"lighttank","cat":"vehicle","layer":"ground","name":"Sheridan","full":"M551A1 Sheridan (TTS)","cost":550,"oil":7,"time":11,"hp":555,"armor":"light","speed":2,"turn":2.4,"sight":6.3,"r":13,"mass":20,"weapons":["w_e80_nato_lighttank"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1967","confidence":"high","desc":"Still the only US light tank, now with a thermal sight added, and held by only the 82nd Airborne. Every replacement attempt failed - the M8 Armored Gun System was developed, type-classified and then cancelled in 1996 without entering service. This gap is real and it persists in one form or another to the present day.","turret":true,"tturn":1.6},
  nato_e80_ifv: {"fac":"nato","role":"ifv","cat":"vehicle","layer":"ground","name":"M2 Bradley","full":"M2 Bradley Infantry Fighting Vehicle","cost":655,"oil":7,"time":12,"hp":650,"armor":"light","speed":1.66,"turn":2,"sight":6.3,"r":14,"mass":30,"weapons":["w_e80_nato_ifv"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1981","confidence":"high","desc":"NATO's answer to the BMP and the vehicle still in the game today as the M2A3. Carries six or seven dismounts rather than a full squad, which soldiers complained about for forty years. Its development was savaged in public - the aluminium hull's behaviour under fire was the subject of the Burton live-fire controversy an","turret":true,"tturn":1.8,"cargo":5},
  nato_e80_spg: {"fac":"nato","role":"spg","cat":"vehicle","layer":"ground","name":"M109A2","full":"M109A2/A3 155mm Self-Propelled Howitzer","cost":1095,"oil":15,"time":20,"hp":615,"armor":"light","speed":1.28,"turn":1.5,"sight":4.6,"r":15,"mass":39,"weapons":["w_e80_nato_spg","scat_raams"],"dispenser":8,"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1979","confidence":"medium","desc":"Longer 39-calibre tube and a rammer, taking range to about 18 km with standard ammunition and 24 km with rocket-assisted. Same vehicle as 1963 underneath. The step change of the era is not the gun but the ammunition: M712 Copperhead laser-guided artillery shells (1982) and M718/M741 scatterable mines.","turret":true,"tturn":0.9},
  nato_e80_mlrs: {"fac":"nato","role":"mlrs","cat":"vehicle","layer":"ground","name":"M270 MLRS","full":"M270 Multiple Launch Rocket System","cost":1605,"oil":25,"time":27,"hp":555,"armor":"light","speed":1.23,"turn":1.3,"sight":4.6,"r":15,"mass":25,"weapons":["w_e80_nato_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e80","to":"e80","service":"1983","confidence":"high","desc":"Still in the game as the M270A2. A single launcher firing a full twelve-rocket ripple scattered roughly 8,000 bomblets over an area the size of several football pitches - Iraqi soldiers in 1991 called it 'steel rain'. Built by a multinational European consortium and adopted by the UK, West Germany, France and Italy as ","turret":true,"tturn":0.8},
  nato_e80_spaag: {"fac":"nato","role":"spaag","cat":"vehicle","layer":"ground","name":"M163 VADS","full":"M163 Vulcan Air Defense System","cost":730,"oil":10,"time":13,"hp":630,"armor":"light","speed":1.57,"turn":1.9,"sight":8,"r":14,"mass":47,"weapons":["w_e80_nato_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1968","confidence":"high","desc":"A six-barrel 20mm rotary cannon on an M113, with a ranging radar that measures distance and nothing else - it cannot search, so the crew still finds the target by eye. Short-legged and outclassed by the gun systems its allies fielded, which is why the US Army leaned on Chaparral and Stinger instead.","turret":true,"tturn":2.6,"radar":6.7},
  nato_e80_aa: {"fac":"nato","role":"aa","cat":"infantry","layer":"ground","name":"Stinger","full":"FIM-92A Stinger MANPADS","cost":255,"oil":0,"time":7,"hp":80,"armor":"infantry","speed":0.86,"turn":6,"sight":6.7,"r":6,"mass":0.1,"weapons":["w_e80_nato_aa"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1981","confidence":"high","desc":"Still the game's infantry AA weapon. The cooled seeker and the added ultraviolet channel let it engage head-on and reject flares - the two things Redeye could not do. Fire and forget, one man, 15 kg. Its use by the mujahideen in Afghanistan from 1986 is the most consequential MANPADS deployment in history."},
  nato_e80_recon: {"fac":"nato","role":"recon","cat":"vehicle","layer":"ground","name":"HMMWV","full":"M998 High Mobility Multipurpose Wheeled Vehicle","cost":290,"oil":4,"time":6,"hp":270,"armor":"light","speed":2.71,"turn":3.2,"sight":8,"r":11,"mass":5,"weapons":["w_e80_nato_recon"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1985","confidence":"high","desc":"The game's Humvee, forty years old. Replaced the jeep, the M561 Gama Goat and several truck types with one chassis. Crucially, it was designed with no armour whatsoever - it is a light utility truck, and the up-armoured versions of the 2000s were a panicked retrofit that ruined its mobility and its suspension.","turret":true,"tturn":2.4},
  nato_e80_fighter: {"fac":"nato","role":"fighter","cat":"aircraft","layer":"air","name":"F-15C Eagle","full":"McDonnell Douglas F-15C Eagle","cost":1350,"oil":29,"time":24,"hp":480,"armor":"air","speed":8.9,"turn":1.9,"sight":9.2,"r":15,"mass":0,"weapons":["w_e80_nato_fighter"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1979","confidence":"high","desc":"Built to a single-minded specification - not a pound for air-to-ground - after analysis of Vietnam and of the MiG-25. Thrust-to-weight above one and an enormous radar. Its air-to-air record across all operators is over 100 kills for no losses in air combat, which is genuinely without parallel and is the strongest argum","jet":true,"ammo":3,"radar":5,"radius":46,"rcs":0.6},
  nato_e80_cas: {"fac":"nato","role":"cas","cat":"aircraft","layer":"air","name":"A-10 Thunderbolt II","full":"Fairchild Republic A-10A","cost":1460,"oil":29,"time":25,"hp":600,"armor":"air","speed":5.32,"turn":1.5,"sight":7.6,"r":17,"mass":0,"weapons":["w_e80_nato_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1977","confidence":"high","desc":"Unchanged airframe, now with Maverick missiles and, from the late 1980s, LASTE low-altitude safety and targeting enhancements. The USAF tried repeatedly to hand it to the Army or retire it during this decade. The Marine equivalent is the AV-8B Harrier II (1985), which trades payload and range for the ability to operate","jet":true,"ammo":4,"radius":33,"rcs":1.4},
  nato_e80_gunship: {"fac":"nato","role":"gunship","cat":"aircraft","layer":"air","name":"AH-64 Apache","full":"Hughes/McDonnell Douglas AH-64A Apache","cost":1170,"oil":19,"time":20,"hp":490,"armor":"air","speed":3.42,"turn":2.2,"sight":8,"r":16,"mass":0,"weapons":["w_e80_nato_gunship"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1986","confidence":"high","desc":"The game's gunship. Two crew, armoured, twin-engined, with a nose-mounted TADS/PNVS thermal sight that lets it fight at night from behind terrain. Hellfire is laser-guided and can be fired at a target designated by someone else, which changed attack helicopter tactics completely - the shooter never has to expose itself","ammo":6,"hover":true,"radius":23,"rcs":0.75},
  nato_e80_transport: {"fac":"nato","role":"transport","cat":"aircraft","layer":"air","name":"UH-60 Black Hawk","full":"Sikorsky UH-60A Black Hawk","cost":655,"oil":10,"time":12,"hp":410,"armor":"air","speed":3.99,"turn":2.4,"sight":6.7,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1979","confidence":"high","desc":"The game's transport helicopter. Designed explicitly around Vietnam lessons - crashworthy seats and fuel system, redundant hydraulics, and enough power to lift eleven troops out of a hot landing zone. Replaced the Huey.","ammo":0,"hover":true,"cargo":8,"radius":33,"rcs":0.9},
  nato_e80_corvette: {"fac":"nato","role":"corvette","cat":"naval","layer":"sea","name":"Oliver Hazard Perry FFG","full":"USS Oliver Hazard Perry (FFG-7)","cost":875,"oil":12,"time":14,"hp":910,"armor":"light","speed":2.76,"turn":1.7,"sight":8,"r":17,"mass":0,"weapons":["w_e80_nato_corvette","sam_sm1"],"prereq":["navalyard"],"tech":1,"from":"e80","to":"e80","service":"1977","confidence":"high","desc":"51 built for the US plus foreign construction - the cheap, numerous escort of the 1980s, deliberately designed to a cost limit. Single screw and single main gun mounted far aft with poor arcs. Two of them, Stark (1987, hit by Iraqi Exocets) and Samuel B. Roberts (1988, mined), survived damage that arguably should have ","turret":true,"tturn":2,"sonar":5,"ciws":0.4,"rcs":1.1},
  nato_e80_destroyer: {"fac":"nato","role":"destroyer","cat":"naval","layer":"sea","name":"Spruance DD","full":"USS Spruance (DD-963)","cost":1605,"oil":25,"time":25,"hp":1660,"armor":"heavy","speed":2.28,"turn":1.2,"sight":9.2,"r":20,"mass":0,"weapons":["w_e80_nato_destroyer","sam_seasparrow"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1975","confidence":"high","desc":"Gas-turbine propulsion, quiet hull, and enormous internal volume left deliberately empty. Criticised on commissioning as under-armed for its size; the empty space then absorbed vertical launch cells and Tomahawk, making it the most heavily armed destroyer afloat by the end of the decade. Every one was scrapped or sunk ","turret":true,"tturn":1.4,"sonar":8,"radar":16.8,"ciws":0.64,"rcs":1.15},
  nato_e80_sub: {"fac":"nato","role":"sub","cat":"naval","layer":"sub","name":"Los Angeles SSN","full":"USS Los Angeles (SSN-688) class","cost":1750,"oil":29,"time":27,"hp":990,"armor":"light","speed":2.38,"turn":1.1,"sight":7.1,"r":17,"mass":0,"weapons":["w_e80_nato_sub","tlam_n_vls"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1976","confidence":"high","desc":"From SSN-719 (USS Providence, 1985) the hull carried twelve vertical Tomahawk tubes forward, and from SSN-751 (1988) the 688i proper added under-ice capability and a significantly quieter plant. Before the vertical tubes the missile went to sea in the torpedo room, from 1983. The Soviet Union's own quieting leap in the mid-1980s, aided by the Toshiba-Kongsberg milling machine export scandal and the Walker spy ring, closed part of the acoustic gap that W","sonar":9.2,"quiet":0.38,"nuclear":true},
  nato_e80_cruiser: {"fac":"nato","role":"cruiser","cat":"naval","layer":"sea","name":"Ticonderoga CG","full":"USS Ticonderoga (CG-47)","cost":2480,"oil":44,"time":37,"hp":2290,"armor":"heavy","speed":1.9,"turn":0.9,"sight":10.1,"r":23,"mass":0,"weapons":["w_e80_nato_cruiser","sam_sm2mr","ssm_harpoon"],"prereq":["navalyard","lab"],"tech":3,"from":"e80","to":"e80","service":"1983","confidence":"high","desc":"Still the game's cruiser. The Aegis combat system with four fixed SPY-1 phased arrays was the answer to saturation anti-ship missile attack: it can track hundreds of contacts and guide many missiles at once without a rotating radar. Built on a Spruance hull to save money, which left it top-heavy. Note for the game - a ","turret":true,"tturn":1,"sonar":7.6,"radar":18.5,"ciws":0.69,"rcs":1.25},
  nato_e80_carrier: {"fac":"nato","role":"carrier","cat":"naval","layer":"sea","name":"Nimitz CVN","full":"CVN-68 Nimitz class","cost":3650,"oil":80,"time":54,"hp":3320,"armor":"heavy","speed":1.52,"turn":0.6,"sight":11.8,"r":30,"mass":0,"weapons":["w_e80_nato_carrier"],"prereq":["navalyard","lab","airbase"],"tech":3,"from":"e80","to":"e80","service":"1975","confidence":"high","desc":"Unchanged platform; the air wing changes around it - F-14 Tomcat with Phoenix for fleet defence, A-6E Intruder for all-weather strike, S-3 Viking for ASW, EA-6B for jamming, E-2C for early warning. That composition is a strike group designed to fight its way into the Norwegian Sea, and it is more specialised than the w","carrier":4,"sonar":4.2,"radar":15.1,"ciws":0.58,"rcs":2.6},
  nato_e80_missileboat: {"fac":"nato","role":"missileboat","cat":"naval","layer":"sea","name":"Pegasus PHM","full":"USS Pegasus (PHM-1), Pegasus-class patrol hydrofoil missile craft","cost":1095,"oil":16,"time":17,"hp":710,"armor":"light","speed":2.85,"turn":1.8,"sight":7.6,"r":16,"mass":0,"weapons":["w_e80_nato_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1977","confidence":"high","desc":"The only missile boats the US Navy has ever operated, and the honest historical basis for the game's Harpoon Missile Boat. Six built out of a planned 30 - a NATO consortium design with Italy and West Germany that both partners abandoned. Foilborne at 48 knots, eight Harpoons, and hopeless in heavy sea states or at long","sonar":0,"rcs":0.45},
  nato_e80_awacs: {"fac":"nato","role":"awacs","cat":"aircraft","layer":"air","name":"E-3 Sentry","full":"Boeing E-3B/C Sentry","cost":2900,"oil":51,"time":30,"hp":575,"armor":"air","speed":4.15,"turn":0.9,"sight":13.4,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e80","to":"e80","service":"1977","confidence":"high","desc":"Same aircraft, upgraded computers and maritime detection. In this era it is the node that makes NATO's air battle work - a single orbit can control the entire Central Front air picture. The airframe is a Boeing 707-320B, identical to the E-3G in the e00 band and to awacs_n in the present-day roster, which is why the hull figures here are the E-3G's rather than a fraction of them. What separates the marks is the computing, and that is not a hit-point number.","jet":true,"ammo":0,"radar":28.6,"radius":68,"rcs":3.2},
  nato_e80_ewair: {"fac":"nato","role":"ewair","cat":"aircraft","layer":"air","name":"EF-111A Raven","full":"General Dynamics/Grumman EF-111A Raven","cost":2045,"oil":32,"time":29,"hp":410,"armor":"air","speed":7.22,"turn":1.9,"sight":10.5,"r":16,"mass":0,"weapons":["w_e80_nato_ewair"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1983","confidence":"medium","desc":"The 'Spark Vark' - an F-111 with the whole EA-6B jamming suite automated down to two crew instead of four, fast enough to keep up with a strike package rather than trailing behind it. Carried no missiles of any kind, so it could not shoot back. One is credited with a kill in 1991 by manoeuvring an Iraqi Mirage F1 into ","jet":true,"ammo":3,"radar":13.4,"radius":37,"rcs":0.6},
  nato_e80_sead: {"fac":"nato","role":"sead","cat":"aircraft","layer":"air","name":"F-4G Wild Weasel V","full":"McDonnell Douglas F-4G Advanced Wild Weasel","cost":1385,"oil":25,"time":21,"hp":340,"armor":"air","speed":8.17,"turn":2,"sight":9.7,"r":15,"mass":0,"weapons":["w_e80_nato_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e80","to":"e80","service":"1978","confidence":"high","desc":"The definitive Cold War SEAD aircraft, and the platform for AGM-88 HARM (1985) - a Mach 2 missile that homes on a radar's emissions and is fast enough that switching the radar off after launch may not save the operator. The F-4G's 52-antenna APR-47 could locate and classify emitters precisely enough to hand off targets","jet":true,"ammo":3,"radar":5.9,"radius":37,"rcs":0.6},
  nato_e80_stealthfighter: {"fac":"nato","role":"stealthfighter","cat":"aircraft","layer":"air","name":"F-117 Nighthawk","full":"Lockheed F-117A Nighthawk","cost":1900,"oil":35,"time":30,"hp":410,"armor":"air","speed":9.12,"turn":2.4,"sight":10.5,"r":16,"mass":0,"weapons":["w_e80_nato_stealthfighter"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1983","confidence":"high","desc":"Operational from October 1983 and not publicly acknowledged until November 1988. Faceted shaping computed by the Echo 1 code derived from a 1962 Soviet paper by Pyotr Ufimtsev, which is a genuinely good story. Be candid about what it is not: despite the F designation it is a subsonic, unarmed-for-air-combat night attac","jet":true,"ammo":4,"radar":9.2,"radius":47,"rcs":0.005},
  nato_e90_rifle: {"fac":"nato","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Squad","full":"US Rifle Squad, M4 Carbine","cost":130,"oil":0,"time":5,"hp":100,"armor":"infantry","speed":1.03,"turn":7,"sight":5.5,"r":6,"mass":0.1,"weapons":["w_e90_nato_rifle"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1994","confidence":"high","desc":"The M4 is the direct ancestor of the game's current rifle squad. A 14.5in barrel and collapsible stock - shorter and handier than the M16A2 for vehicle crews and urban work, at the cost of muzzle velocity and barrel life. Adopted for special operations and airborne first, then spread across the whole Army because every"},
  nato_e90_at: {"fac":"nato","role":"at","cat":"infantry","layer":"ground","name":"Javelin","full":"FGM-148 Javelin","cost":345,"oil":0,"time":8,"hp":95,"armor":"infantry","speed":0.86,"turn":6,"sight":6.6,"r":6,"mass":0.1,"weapons":["w_e90_nato_at"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1996","confidence":"high","desc":"The game's current AT team, thirty years old. It is a genuine generational break from Dragon and TOW: the gunner locks the seeker onto the target, fires, and moves - no wire, no beam to hold, no exposure while the missile flies. Soft launch lets it be fired from inside a building. The top-attack profile hits the thin r"},
  nato_e90_mbt: {"fac":"nato","role":"mbt","cat":"vehicle","layer":"ground","name":"M1A2 Abrams","full":"M1A2 Abrams","cost":1290,"oil":19,"time":21,"hp":1560,"armor":"heavy","speed":1.52,"turn":1.5,"sight":7.4,"r":16,"mass":62,"weapons":["w_e90_nato_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1992","confidence":"high","desc":"The game's current MBT in an earlier form. The A2's addition is the Commander's Independent Thermal Viewer and an inter-vehicle information system - true hunter-killer, where the commander searches for the next target while the gunner engages the current one, which roughly doubles the engagement rate. Britain's Challen","turret":true,"tturn":1.5,"crush":true},
  nato_e90_lighttank: {"fac":"nato","role":"lighttank","cat":"vehicle","layer":"ground","name":"(none)","full":"No US light tank in service after 1996","cost":645,"oil":8,"time":11,"hp":625,"armor":"light","speed":2.06,"turn":2.4,"sight":6.9,"r":13,"mass":20,"weapons":["w_e90_nato_lighttank"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"n/a","confidence":"high","desc":"State this gap plainly. The M551 Sheridan retired in 1996. Its designated replacement, the M8 Armored Gun System, completed development, was type-classified, and was cancelled in 1996 in the post-Cold-War budget cuts without a single unit fielded. From 1996 until the Stryker MGS in the 2000s the US Army has no light ar","turret":true,"tturn":1.6},
  nato_e90_ifv: {"fac":"nato","role":"ifv","cat":"vehicle","layer":"ground","name":"M2A2 ODS Bradley","full":"M2A2 Operation Desert Storm Bradley","cost":775,"oil":9,"time":13,"hp":730,"armor":"light","speed":1.72,"turn":2,"sight":6.9,"r":14,"mass":30,"weapons":["w_e90_nato_ifv"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1993","confidence":"medium","desc":"The Desert Storm upgrade added an eye-safe laser rangefinder, a GPS-driven position navigation system and a tactical display - which sounds minor and was not. The 1991 experience was that crews with no idea where they were in featureless desert produced the war's worst fratricide problem. Digital position reporting is ","turret":true,"tturn":1.8,"cargo":5},
  nato_e90_spg: {"fac":"nato","role":"spg","cat":"vehicle","layer":"ground","name":"M109A6 Paladin","full":"M109A6 Paladin","cost":1290,"oil":17,"time":21,"hp":695,"armor":"light","speed":1.32,"turn":1.5,"sight":5.1,"r":15,"mass":39,"weapons":["w_e90_nato_spg","scat_raams"],"dispenser":8,"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1992","confidence":"medium","desc":"New turret with an on-board fire control computer, inertial navigation and an automatic gun-laying system - the first M109 that can shoot-and-scoot without external survey or a fire direction centre telephone call. Emplace, fire and displace in under a minute, which is what makes it survivable against counter-battery r","turret":true,"tturn":0.9},
  nato_e90_mlrs: {"fac":"nato","role":"mlrs","cat":"vehicle","layer":"ground","name":"M270 MLRS / ATACMS","full":"M270 with MGM-140 Army Tactical Missile System","cost":1890,"oil":29,"time":28,"hp":625,"armor":"light","speed":1.27,"turn":1.3,"sight":5.1,"r":15,"mass":25,"weapons":["w_e90_nato_mlrs","scat_at2"],"dispenser":6,"prereq":["factory","lab"],"tech":3,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"The launcher is unchanged; the payload becomes strategic. ATACMS is a 300 km inertially guided ballistic missile that fits two-to-a-pod in the same box as six rockets, letting a divisional artillery unit strike targets previously reserved for aircraft. First combat use in Desert Storm, 1991.","turret":true,"tturn":0.8},
  nato_e90_spaag: {"fac":"nato","role":"spaag","cat":"vehicle","layer":"ground","name":"Avenger","full":"M1097 Avenger Pedestal Mounted Stinger","cost":860,"oil":12,"time":14,"hp":710,"armor":"light","speed":1.62,"turn":1.9,"sight":8.7,"r":14,"mass":47,"weapons":["w_e90_nato_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1990","confidence":"high","desc":"A turret with eight Stingers and a FLIR bolted to a Humvee. This is what US short-range air defence was reduced to for twenty-five years after the Vulcan retired in 1994 and Sergeant York was cancelled. No gun capable of engaging aircraft, no radar of its own, and helpless against anything the Stinger's IR seeker canno","turret":true,"tturn":2.6,"radar":7.4},
  nato_e90_aa: {"fac":"nato","role":"aa","cat":"infantry","layer":"ground","name":"Stinger / Patriot PAC-2","full":"FIM-92 Stinger; MIM-104 Patriot PAC-2","cost":300,"oil":0,"time":8,"hp":90,"armor":"infantry","speed":0.88,"turn":6,"sight":7.4,"r":6,"mass":0.1,"weapons":["w_e90_nato_aa"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1990","confidence":"high","desc":"PAC-2 was rushed into service for the 1991 Scud campaign. Its performance is the most disputed statistic in modern air defence - contemporary claims of near-total success were revised by the Army itself and by independent analysts to something between a handful and none confirmed. The genuine anti-missile capability ar"},
  nato_e90_recon: {"fac":"nato","role":"recon","cat":"vehicle","layer":"ground","name":"HMMWV","full":"M1025/M1026 Armament Carrier HMMWV","cost":345,"oil":4,"time":7,"hp":305,"armor":"light","speed":2.79,"turn":3.2,"sight":8.7,"r":11,"mass":5,"weapons":["w_e90_nato_recon"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1985","confidence":"high","desc":"Unchanged. The scout platoon's other vehicle is the M3 Bradley Cavalry Fighting Vehicle - the same hull with scouts and extra TOW rounds instead of a rifle squad, which in 1991 proved that reconnaissance-by-fighting worked better than reconnaissance-by-stealth against a poorly trained enemy.","turret":true,"tturn":2.4},
  nato_e90_fighter: {"fac":"nato","role":"fighter","cat":"aircraft","layer":"air","name":"F-16C Block 50","full":"General Dynamics/Lockheed Martin F-16C Block 50/52","cost":1205,"oil":26,"time":19,"hp":400,"armor":"air","speed":8.5,"turn":1.9,"sight":10.1,"r":15,"mass":0,"weapons":["w_e90_nato_fighter"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"This is the game's current F-16, effectively. Block 50 has the F110 engine, Block 52 the F100 - the difference is the manufacturer, not the capability. AMRAAM (1991) is the important change: an active radar seeker means the launching aircraft can turn away instead of holding the target illuminated all the way to impact","jet":true,"ammo":3,"radar":5.5,"radius":38,"rcs":0.55},
  nato_e90_cas: {"fac":"nato","role":"cas","cat":"aircraft","layer":"air","name":"F-15E Strike Eagle","full":"McDonnell Douglas F-15E Strike Eagle","cost":1720,"oil":34,"time":26,"hp":675,"armor":"air","speed":5.49,"turn":1.5,"sight":8.3,"r":17,"mass":0,"weapons":["w_e90_nato_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1989","confidence":"high","desc":"Two-seat, terrain-following, all-weather deep strike with the F-15's air-to-air capability intact. It is the aircraft that hunted Scud launchers at night in 1991. Alongside it, the A-10A soldiers on - the USAF planned to retire the whole A-10 fleet in the early 1990s and reversed the decision after its Gulf War perform","jet":true,"ammo":5,"radius":34,"rcs":1.4},
  nato_e90_gunship: {"fac":"nato","role":"gunship","cat":"aircraft","layer":"air","name":"AH-64D Longbow Apache","full":"Boeing AH-64D Longbow Apache","cost":1375,"oil":22,"time":21,"hp":550,"armor":"air","speed":3.53,"turn":2.2,"sight":8.7,"r":16,"mass":0,"weapons":["w_e90_nato_gunship"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1998","confidence":"high","desc":"The mast-mounted radar above the rotor lets the helicopter hover entirely behind a treeline, scan, classify up to 128 targets, and pass them over a datalink to other aircraft that never expose themselves. The AGM-114L Longbow Hellfire is fire-and-forget in fog and smoke, unlike the laser version. This is the single big","ammo":7,"hover":true,"radius":24,"rcs":0.75},
  nato_e90_transport: {"fac":"nato","role":"transport","cat":"aircraft","layer":"air","name":"UH-60L Black Hawk","full":"Sikorsky UH-60L","cost":775,"oil":12,"time":13,"hp":465,"armor":"air","speed":4.12,"turn":2.4,"sight":7.4,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1989","confidence":"high","desc":"More powerful engines and an improved gearbox. Same airframe. The era's hard lesson about helicopters in cities is Mogadishu, 1993, where two UH-60s were downed by RPGs fired from below and behind - rotorcraft over urban terrain have no good answer to cheap unguided rockets, and the game should reflect that helicopters","ammo":0,"hover":true,"cargo":8,"radius":34,"rcs":0.9},
  nato_e90_corvette: {"fac":"nato","role":"corvette","cat":"naval","layer":"sea","name":"Oliver Hazard Perry FFG","full":"FFG-7 Perry class","cost":1030,"oil":14,"time":15,"hp":1025,"armor":"light","speed":2.84,"turn":1.7,"sight":8.7,"r":17,"mass":0,"weapons":["w_e90_nato_corvette","sam_sm1","ciws_phalanx"],"prereq":["navalyard"],"tech":1,"from":"e90","to":"e90","service":"1977","confidence":"high","desc":"Unchanged, but in 2003 the entire class had its Mk 13 missile launcher removed rather than pay to keep SM-1 in service, leaving frigates with no area air defence whatsoever for the last decade of their careers. A good example of a warship being downgraded in place for budget reasons.","turret":true,"tturn":2,"sonar":5.5,"ciws":0.42,"rcs":1.1},
  nato_e90_destroyer: {"fac":"nato","role":"destroyer","cat":"naval","layer":"sea","name":"Arleigh Burke DDG","full":"USS Arleigh Burke (DDG-51)","cost":1890,"oil":29,"time":26,"hp":1870,"armor":"heavy","speed":2.35,"turn":1.2,"sight":10.1,"r":20,"mass":0,"weapons":["navgun_mk45","sam_sm2mr","ssm_harpoon"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"The game's current destroyer and the most-built major surface warship class in the West since WWII, still in production after thirty-five years. All-steel superstructure (unlike the aluminium Ticonderoga, a direct response to the 1975 Belknap fire), reduced radar cross-section, and enough VLS cells that a destroyer now","turret":true,"tturn":1.4,"sonar":8.7,"radar":18.4,"ciws":0.68,"rcs":0.55},
  nato_e90_sub: {"fac":"nato","role":"sub","cat":"naval","layer":"sub","name":"Seawolf SSN","full":"USS Seawolf (SSN-21)","cost":2065,"oil":34,"time":28,"hp":1115,"armor":"light","speed":2.45,"turn":1.1,"sight":7.8,"r":17,"mass":0,"weapons":["w_e90_nato_sub","tlam_n_tube"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1997","confidence":"high","desc":"Built with no cost ceiling to hunt Soviet boats under the ice, and the quietest submarine ever put to sea - quieter tied alongside than a Los Angeles at full speed. The Cold War ended before the class did: three were built out of twenty-nine planned, and the Virginia was designed to be affordable instead.","sonar":10.1,"quiet":0.28,"nuclear":true},
  nato_e90_cruiser: {"fac":"nato","role":"cruiser","cat":"naval","layer":"sea","name":"Ticonderoga CG","full":"CG-47 Ticonderoga class","cost":2925,"oil":52,"time":40,"hp":2580,"armor":"heavy","speed":1.96,"turn":0.9,"sight":11,"r":23,"mass":0,"weapons":["w_e90_nato_cruiser","sam_sm2mr","ssm_harpoon"],"prereq":["navalyard","lab"],"tech":3,"from":"e90","to":"e90","service":"1983","confidence":"high","desc":"Unchanged hull, now all VLS-equipped from CG-52 onward. The first five ships with the twin-arm launchers were decommissioned early, in 2004-2005, while barely twenty years old, because backfitting VLS was not worth the money.","turret":true,"tturn":1,"sonar":8.3,"radar":20.2,"ciws":0.73,"rcs":1.25},
  nato_e90_carrier: {"fac":"nato","role":"carrier","cat":"naval","layer":"sea","name":"Nimitz CVN","full":"CVN-68 Nimitz class","cost":4300,"oil":95,"time":57,"hp":3740,"armor":"heavy","speed":1.57,"turn":0.6,"sight":12.9,"r":30,"mass":0,"weapons":["w_e90_nato_carrier"],"prereq":["navalyard","lab","airbase"],"tech":3,"from":"e90","to":"e90","service":"1975","confidence":"high","desc":"Unchanged. The air wing shrinks: the F-14 leaves from 2006, the A-6 retires in 1997, the S-3 in 2009. The 1990s decision to consolidate on one airframe, the F/A-18E/F, trades reach and specialisation for affordability, and the loss of the long-range A-6 strike aircraft is a capability the US Navy has still not replaced","carrier":4,"sonar":4.6,"radar":16.6,"ciws":0.61,"rcs":2.6},
  nato_e90_missileboat: {"fac":"nato","role":"missileboat","cat":"naval","layer":"sea","name":"(none)","full":"No US Navy missile craft after 1993","cost":1290,"oil":19,"time":18,"hp":800,"armor":"light","speed":2.94,"turn":1.8,"sight":8.3,"r":16,"mass":0,"weapons":["w_e90_nato_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"n/a","confidence":"high","desc":"Worth flagging for the game. The Pegasus hydrofoils decommissioned in 1993 and the US Navy chose deliberately never to operate missile boats again - its doctrine puts anti-surface missiles on destroyers, aircraft and submarines, not on small craft. Within NATO the missile boat lives on in Norway (Hauk and later Skjold ","sonar":0,"rcs":0.28},
  nato_e90_awacs: {"fac":"nato","role":"awacs","cat":"aircraft","layer":"air","name":"E-8C JSTARS","full":"Northrop Grumman E-8C Joint STARS","cost":3000,"oil":60,"time":32,"hp":580,"armor":"air","speed":4.15,"turn":0.9,"sight":14.7,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e90","to":"e90","service":"1996","confidence":"medium","desc":"The ground-surveillance counterpart to AWACS - a side-looking phased array under a 707 that detects and tracks moving vehicles across 50,000 square kilometres and feeds ground station modules with the picture. Two prototypes were deployed to Desert Storm in 1991 before the aircraft had even finished testing, and they flew 49 sorties tracking Iraqi movement, which is what bought the programme. The airframe is a rebuilt second-hand 707-320C - the same hull as the E-3 rows either side of it, and carrying the same numbers.","jet":true,"ammo":0,"radar":31.3,"radius":69,"rcs":3.2},
  nato_e90_ewair: {"fac":"nato","role":"ewair","cat":"aircraft","layer":"air","name":"EA-6B Prowler","full":"Grumman EA-6B ICAP III Prowler","cost":2410,"oil":38,"time":30,"hp":465,"armor":"air","speed":7.45,"turn":1.9,"sight":11.5,"r":16,"mass":0,"weapons":["w_e90_nato_ewair"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1971","confidence":"high","desc":"After the EF-111A retired in 1998 this was the only tactical jammer in the entire US inventory, and Navy and Marine squadrons flew Air Force missions in it for a decade. An airframe designed in the 1960s carrying the whole joint force's electronic attack burden is a real and frequently criticised gap.","jet":true,"ammo":3,"radar":14.7,"radius":38,"rcs":0.6},
  nato_e90_sead: {"fac":"nato","role":"sead","cat":"aircraft","layer":"air","name":"F-16CJ Wild Weasel","full":"Lockheed Martin F-16CJ Block 50D with HARM Targeting System","cost":1635,"oil":29,"time":23,"hp":385,"armor":"air","speed":8.43,"turn":2,"sight":10.6,"r":15,"mass":0,"weapons":["w_e90_nato_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e90","to":"e90","service":"1993","confidence":"medium","desc":"The game's current SEAD aircraft. When the F-4G retired, SEAD passed to a single-seat F-16 with a targeting pod instead of a dedicated 52-antenna receiver suite and a second crewman - a deliberate acceptance of less capability for far lower cost. Pilots who flew both are on record that the F-4G was the better Weasel. E","jet":true,"ammo":3,"radar":6.4,"radius":38,"rcs":0.55},
  nato_e90_stealthbomber: {"fac":"nato","role":"stealthbomber","cat":"aircraft","layer":"air","name":"B-2 Spirit","full":"Northrop Grumman B-2A Spirit","cost":3610,"oil":77,"time":49,"hp":800,"armor":"air","speed":5.1,"turn":1.2,"sight":10.1,"r":22,"mass":0,"weapons":["w_e90_nato_stealthbomber"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1997","confidence":"high","desc":"The game's stealth bomber. Flying wing, no vertical surfaces at all, radar cross-section reportedly comparable to a bird. Planned at 132 aircraft, cut to 21 when the Cold War ended, at which point the programme unit cost reached roughly two billion dollars each - the most expensive aircraft ever built. First combat ove","jet":true,"ammo":3,"radius":94,"rcs":0.003},
  nato_e90_stealthfighter: {"fac":"nato","role":"stealthfighter","cat":"aircraft","layer":"air","name":"F-117 Nighthawk","full":"Lockheed F-117A","cost":2235,"oil":41,"time":32,"hp":465,"armor":"air","speed":9.41,"turn":2.4,"sight":11.5,"r":16,"mass":0,"weapons":["w_e90_nato_stealthfighter"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1983","confidence":"high","desc":"Publicly revealed in 1988 and flown hard over Iraq in 1991, where 36 aircraft struck a disproportionate share of the heavily defended Baghdad targets. The 1999 loss over Serbia showed the limits: predictable routing, no jamming support that night, and a low-frequency acquisition radar. Retired 2008.","jet":true,"ammo":4,"radar":10.1,"radius":47,"rcs":0.005},
  nato_e00_rifle: {"fac":"nato","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Squad","full":"US Rifle Squad, M4A1","cost":145,"oil":0,"time":5,"hp":110,"armor":"infantry","speed":1.04,"turn":7,"sight":5.8,"r":6,"mass":0.1,"weapons":["w_e00_nato_rifle"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2014","confidence":"high","desc":"The game's current rifle squad. The M4A1 - full automatic instead of three-round burst, heavier barrel - became the Army standard from 2014 after years of special-operations use. The visible change of the era is not the rifle but everything hung on it: optics on every weapon, night vision on every soldier, and radios d"},
  nato_e00_at: {"fac":"nato","role":"at","cat":"infantry","layer":"ground","name":"Javelin","full":"FGM-148 Javelin","cost":380,"oil":0,"time":9,"hp":100,"armor":"infantry","speed":0.87,"turn":6,"sight":7,"r":6,"mass":0.1,"weapons":["w_e00_nato_at"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"1996","confidence":"high","desc":"Unchanged in concept, with lighter command launch units and improved missiles. It is the game's current AT team."},
  nato_e00_mbt: {"fac":"nato","role":"mbt","cat":"vehicle","layer":"ground","name":"M1A2 SEP","full":"M1A2 SEP / SEP v2 Abrams","cost":1425,"oil":21,"time":22,"hp":1680,"armor":"heavy","speed":1.53,"turn":1.5,"sight":7.8,"r":16,"mass":62,"weapons":["w_e00_nato_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2001","confidence":"medium","desc":"The System Enhancement Package brought second-generation thermal sights, colour displays and a full digital backbone. SEPv2 (2008) added a common remotely operated weapon station and the TUSK urban survival kit - reactive armour tiles, belly armour and a loader's shield, all lessons from Iraq. The game's M1A2 SEP v3 is","turret":true,"tturn":1.5,"crush":true},
  nato_e00_lighttank: {"fac":"nato","role":"lighttank","cat":"vehicle","layer":"ground","name":"Stryker MGS","full":"M1128 Stryker Mobile Gun System","cost":715,"oil":9,"time":12,"hp":670,"armor":"light","speed":2.08,"turn":2.4,"sight":7.3,"r":13,"mass":20,"weapons":["w_e00_nato_lighttank"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2007","confidence":"medium","desc":"The game's light tank. An eight-wheeled 105mm assault gun for the Stryker brigades - not a tank, and explicitly doctrinally an infantry support gun. It was troubled throughout: an autoloader that jammed, an overloaded chassis, ammunition storage concerns, and only 142 built against a much larger plan. The Stryker famil","turret":true,"tturn":1.6},
  nato_e00_ifv: {"fac":"nato","role":"ifv","cat":"vehicle","layer":"ground","name":"M2A3 Bradley","full":"M2A3 Bradley","cost":855,"oil":10,"time":14,"hp":785,"armor":"light","speed":1.73,"turn":2,"sight":7.3,"r":14,"mass":30,"weapons":["w_e00_nato_ifv"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2000","confidence":"high","desc":"The game's current IFV. A3 adds full digitisation and an independent commander's thermal sight, giving the Bradley the same hunter-killer capability as the M1A2. Its dismount capacity remains six, which the Army has complained about since 1981 and which the cancelled Ground Combat Vehicle and the current XM30 programme","turret":true,"tturn":1.8,"cargo":5},
  nato_e00_spg: {"fac":"nato","role":"spg","cat":"vehicle","layer":"ground","name":"M109A7 Paladin","full":"M109A7 Paladin Integrated Management","cost":1425,"oil":19,"time":22,"hp":750,"armor":"light","speed":1.34,"turn":1.5,"sight":5.3,"r":15,"mass":39,"weapons":["w_e00_nato_spg","scat_raams"],"dispenser":8,"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2017","confidence":"medium","desc":"The game's current SPG. Effectively a new vehicle wearing the old turret: Bradley chassis, engine and suspension for commonality, an electric gun drive and rammer replacing hydraulics, and 600 volts of electrical growth margin. Low-rate production from 2015, full rate 2017. It still has a 39-calibre barrel, which means","turret":true,"tturn":0.9},
  nato_e00_mlrs: {"fac":"nato","role":"mlrs","cat":"vehicle","layer":"ground","name":"HIMARS","full":"M142 High Mobility Artillery Rocket System","cost":2090,"oil":32,"time":29,"hp":670,"armor":"light","speed":1.29,"turn":1.3,"sight":5.3,"r":15,"mass":25,"weapons":["w_e00_nato_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e00","to":"e00","service":"2005","confidence":"high","desc":"Half an M270's launcher on a wheeled truck light enough to fit in a C-130. Half the salvo, but it can be flown into theatre, driven fast on roads, and hidden - and with GPS-guided GMLRS rockets (2005), one rocket does what a twelve-rocket ripple of M26 used to do, with a fraction of the collateral effect. GMLRS is the ","turret":true,"tturn":0.8},
  nato_e00_spaag: {"fac":"nato","role":"spaag","cat":"vehicle","layer":"ground","name":"(effectively none)","full":"US Army short-range air defence gap, roughly 1994-2021","cost":950,"oil":13,"time":15,"hp":770,"armor":"light","speed":1.63,"turn":1.9,"sight":9.2,"r":14,"mass":47,"weapons":["w_e00_nato_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"n/a","confidence":"high","desc":"Say this plainly - it is one of the most striking capability holes in modern Western forces. After the Vulcan retired the US Army had only the Stinger-armed Avenger, and even most of those units were converted to other missions during the Iraq and Afghanistan wars because there was no air threat. Germany retired the Ge","turret":true,"tturn":2.6,"radar":7.8},
  nato_e00_aa: {"fac":"nato","role":"aa","cat":"infantry","layer":"ground","name":"Patriot PAC-3","full":"MIM-104F Patriot PAC-3 / PAC-3 MSE","cost":335,"oil":0,"time":8,"hp":95,"armor":"infantry","speed":0.89,"turn":6,"sight":7.8,"r":6,"mass":0.1,"weapons":["w_e00_nato_aa"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2001","confidence":"high","desc":"A genuinely different missile from PAC-2, not an upgrade: smaller, quicker, and with its own active radar seeker, destroying a ballistic missile by physically hitting it. Sixteen fit in the space of four PAC-2s. This is the first Western SAM with a credible demonstrated record against ballistic missiles."},
  nato_e00_recon: {"fac":"nato","role":"recon","cat":"vehicle","layer":"ground","name":"Humvee (armed)","full":"M1151 HMMWV Expanded Capacity Armament Carrier","cost":380,"oil":5,"time":7,"hp":325,"armor":"light","speed":2.82,"turn":3.2,"sight":9.2,"r":11,"mass":5,"weapons":["w_e00_nato_recon"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2005","confidence":"medium","desc":"The game's scout vehicle. The M1151 is the factory-armoured Humvee that replaced the field-improvised 'hillbilly armour' of 2003-2004. It is heavier than the chassis was designed for, and its poor performance against buried IEDs is precisely why the MRAP programme and then the JLTV exist.","turret":true,"tturn":2.4},
  nato_e00_fighter: {"fac":"nato","role":"fighter","cat":"aircraft","layer":"air","name":"F-22 Raptor","full":"Lockheed Martin F-22A Raptor","cost":2100,"oil":46,"time":31,"hp":500,"armor":"air","speed":9.55,"turn":2.4,"sight":11.6,"r":15,"mass":0,"weapons":["w_e00_nato_fighter"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2005","confidence":"high","desc":"The game's stealth fighter. All-aspect low observability, supercruise above Mach 1.5 without afterburner, thrust vectoring, and an AN/APG-77 AESA radar. Planned at 750 aircraft, capped at 187 in 2009 on the argument that no peer air force existed - a decision widely regretted since. Production tooling was destroyed, so","jet":true,"ammo":4,"radar":5.8,"radius":46,"rcs":0.005},
  nato_e00_cas: {"fac":"nato","role":"cas","cat":"aircraft","layer":"air","name":"A-10C Thunderbolt II","full":"Fairchild Republic A-10C Thunderbolt II","cost":1900,"oil":38,"time":27,"hp":730,"armor":"air","speed":5.54,"turn":1.5,"sight":8.7,"r":17,"mass":0,"weapons":["w_e00_nato_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"2007","confidence":"high","desc":"The game's CAS aircraft. The C upgrade finally gave a 1970s airframe glass cockpit, precision weapons, a targeting pod and a datalink - it can now do from 15,000 feet what it was designed to do from 100. Which also removes most of the argument for the titanium bathtub and the gun.","jet":true,"ammo":6,"radius":34,"rcs":1.4},
  nato_e00_gunship: {"fac":"nato","role":"gunship","cat":"aircraft","layer":"air","name":"AH-64E Apache Guardian","full":"Boeing AH-64E Apache Guardian","cost":1520,"oil":25,"time":22,"hp":595,"armor":"air","speed":3.56,"turn":2.2,"sight":9.2,"r":16,"mass":0,"weapons":["w_e00_nato_gunship"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2013","confidence":"high","desc":"The game's gunship. More powerful engines, composite rotor blades, and Manned-Unmanned Teaming: the crew can take control of a nearby drone's sensors and, at Level 4, the drone itself - so the helicopter can look over the ridge without going near it.","ammo":8,"hover":true,"radius":24,"rcs":0.75},
  nato_e00_transport: {"fac":"nato","role":"transport","cat":"aircraft","layer":"air","name":"UH-60M Black Hawk","full":"Sikorsky UH-60M","cost":855,"oil":13,"time":14,"hp":500,"armor":"air","speed":4.16,"turn":2.4,"sight":7.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2007","confidence":"high","desc":"The game's transport. New wide-chord rotor blades, stronger airframe, full digital cockpit and autopilot. The era's other rotary-wing story is the MV-22B Osprey (2007), which after a two-decade development with fatal crashes finally gave the Marines a tiltrotor with three times the range and twice the speed of a helico","ammo":0,"hover":true,"cargo":8,"radius":34,"rcs":0.9},
  nato_e00_corvette: {"fac":"nato","role":"corvette","cat":"naval","layer":"sea","name":"Littoral Combat Ship","full":"USS Freedom (LCS-1) and USS Independence (LCS-2)","cost":1140,"oil":15,"time":16,"hp":1105,"armor":"light","speed":2.87,"turn":1.7,"sight":9.2,"r":17,"mass":0,"weapons":["w_e00_nato_corvette","sam_ram"],"prereq":["navalyard"],"tech":1,"from":"e00","to":"e00","service":"2008","confidence":"high","desc":"The game's corvette, and it deserves a candid note. Two entirely different, non-interchangeable hull designs were built simultaneously; the mission modules for mine warfare and ASW were delayed by a decade or cancelled; the Freedom class suffered a class-wide combining gear defect; and several ships were decommissioned","turret":true,"tturn":2,"sonar":5.8,"ciws":0.44,"rcs":0.14},
  nato_e00_destroyer: {"fac":"nato","role":"destroyer","cat":"naval","layer":"sea","name":"Arleigh Burke Flight IIA","full":"DDG-51 Flight IIA","cost":2090,"oil":32,"time":27,"hp":2015,"armor":"heavy","speed":2.38,"turn":1.2,"sight":10.7,"r":20,"mass":0,"weapons":["w_e00_nato_destroyer","sam_sm2"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2000","confidence":"high","desc":"The game's destroyer. Flight IIA added twin helicopter hangars for MH-60R operations and deleted the Harpoon launchers, which meant that for over a decade the standard US destroyer had no dedicated anti-ship missile at all - a doctrinal assumption that aircraft would handle surface warfare. Naval Strike Missile and Mar","turret":true,"tturn":1.4,"sonar":9.2,"radar":19.4,"ciws":0.71,"rcs":0.55},
  nato_e00_sub: {"fac":"nato","role":"sub","cat":"naval","layer":"sub","name":"Virginia SSN","full":"USS Virginia (SSN-774)","cost":2280,"oil":38,"time":29,"hp":1200,"armor":"light","speed":2.48,"turn":1.1,"sight":8.2,"r":17,"mass":0,"weapons":["w_e00_nato_sub","tlam_n_vls"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2004","confidence":"high","desc":"The affordable successor to Seawolf, and the boat that has actually replaced the Los Angeles class. Photonics masts instead of an optical periscope, so the control room no longer has to sit directly under the sail. Block V hulls add an 25 m payload module taking Tomahawk capacity to 40. Production has consistently run ","sonar":10.7,"quiet":0.31,"nuclear":true,"layNet":4},
  nato_e00_carrier: {"fac":"nato","role":"carrier","cat":"naval","layer":"sea","name":"Ronald Reagan CVN","full":"USS Ronald Reagan (CVN-76), Nimitz class","cost":4750,"oil":105,"time":59,"hp":4030,"armor":"heavy","speed":1.58,"turn":0.6,"sight":13.6,"r":30,"mass":0,"weapons":["w_e00_nato_carrier"],"prereq":["navalyard","lab","airbase"],"tech":3,"from":"e00","to":"e00","service":"2003","confidence":"high","desc":"The ninth Nimitz and the one that carried the class into this century, with the bulbous bow and island rework that mark the later ships. The Gerald R. Ford does not exist yet in this period - she was not commissioned until 2017.","carrier":4,"sonar":4.9,"radar":17.5,"ciws":0.64,"rcs":2.6},
  nato_e00_awacs: {"fac":"nato","role":"awacs","cat":"aircraft","layer":"air","name":"E-3G Sentry","full":"Boeing E-3G Sentry Block 40/45","cost":3230,"oil":67,"time":33,"hp":595,"armor":"air","speed":4.16,"turn":0.9,"sight":15.5,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"2015","confidence":"medium","desc":"The game's AWACS. Block 40/45 replaced 1970s computing with modern open-architecture processing, which is the difference between operators reading raw radar and operators managing a fused, datalinked track picture. The airframe is still a 707 first flown in the 1950s, and spare parts and engine availability are the rea","jet":true,"ammo":0,"radar":33,"radius":70,"rcs":3.2},
  nato_e00_ewair: {"fac":"nato","role":"ewair","cat":"aircraft","layer":"air","name":"EA-18G Growler","full":"Boeing EA-18G Growler","cost":2660,"oil":42,"time":31,"hp":500,"armor":"air","speed":7.52,"turn":1.9,"sight":12.1,"r":16,"mass":0,"weapons":["w_e00_nato_ewair"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"2009","confidence":"high","desc":"The game's electronic attack aircraft, and the first US jammer that can defend itself - it retains the Super Hornet's radar and carries AMRAAM, unlike the unarmed EF-111A. Two crew instead of the Prowler's four, because the processing is automated. Only about 160 exist and they cover the entire US joint force's tactica","jet":true,"ammo":4,"radar":15.5,"radius":38,"rcs":0.6},
  nato_e00_sead: {"fac":"nato","role":"sead","cat":"aircraft","layer":"air","name":"F-16CJ Wild Weasel","full":"F-16CM Block 50 with HTS/AARGM","cost":1805,"oil":32,"time":24,"hp":415,"armor":"air","speed":8.51,"turn":2,"sight":11.2,"r":15,"mass":0,"weapons":["w_e00_nato_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e00","to":"e00","service":"1993","confidence":"high","desc":"Unchanged in concept; the missile improves. AGM-88E AARGM adds a millimetre-wave terminal seeker so the missile can still find the emitter after the radar shuts down, which defeats the standard emissions-discipline countermeasure that made plain HARM much less effective in Kosovo and Iraq.","jet":true,"ammo":4,"radar":6.8,"radius":38,"rcs":0.55},
  nato_e00_stealthfighter: {"fac":"nato","role":"stealthfighter","cat":"aircraft","layer":"air","name":"F-35 Lightning II","full":"Lockheed Martin F-35A (2016), F-35B (2015), F-35C (2019)","cost":2470,"oil":46,"time":33,"hp":500,"armor":"air","speed":9.5,"turn":2.4,"sight":12.1,"r":16,"mass":0,"weapons":["w_e00_nato_stealthfighter"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"2015","confidence":"high","desc":"The game's carrier stealth fighter is the F-35C, the largest-winged variant for slow approach speeds. Three variants for three services from one airframe was the programme's founding bet and it drove cost and schedule badly - the B model's lift fan constrained the fuselage cross-section of all three. What the aircraft ","jet":true,"ammo":5,"radar":10.7,"radius":48,"rcs":0.009},
  nato_e00_aswhelo: {"fac":"nato","role":"aswhelo","cat":"aircraft","layer":"air","name":"MH-60R Seahawk","full":"Sikorsky MH-60R","cost":1330,"oil":25,"time":16,"hp":365,"armor":"air","speed":3.37,"turn":2.4,"sight":8.2,"r":13,"mass":0,"weapons":["w_e00_nato_aswhelo"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2006","confidence":"high","desc":"The game's ASW helicopter, and the reason a modern surface group can find a quiet diesel submarine at all. A dipping sonar can be placed below the thermal layer that hides a submarine from hull-mounted sonar. Combines the previous SH-60B surface-surveillance and SH-60F ASW roles in one airframe.","ammo":4,"sonar":9.2,"radius":24,"rcs":0.75},
  nato_e00_radarv: {"fac":"nato","role":"radarv","cat":"vehicle","layer":"ground","name":"TPQ-53 Radar","full":"AN/TPQ-53 Quick Reaction Capability Radar","cost":1140,"oil":11,"time":16,"hp":500,"armor":"light","speed":1.68,"turn":1.8,"sight":8.7,"r":14,"mass":16,"weapons":[],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2013","confidence":"medium","desc":"The game's radar vehicle. Truck-mounted AESA that locates mortar, rocket and artillery firing positions from the projectile's trajectory in seconds, either across a 90-degree sector or full 360. Replaced the AN/TPQ-36 and TPQ-37. Increasingly used against small drones, a mission nobody specified when it was designed.","turret":true,"tturn":0.9,"radar":14.6},
  pact_e50_rifle: {"fac":"pact","role":"rifle","cat":"infantry","layer":"ground","name":"Motor Rifle Squad","full":"Motor Rifle Squad, AK-47 / SKS-45","cost":60,"oil":0,"time":4,"hp":65,"armor":"infantry","speed":0.9,"turn":7,"sight":3.4,"r":6,"mass":0.1,"weapons":["w_e50_pact_rifle"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1949","confidence":"high","desc":"The AK enters service in 1949 but only saturates the force through the mid-50s; many squads carry SKS carbines and Mosin rifles alongside it. Short-ranged by design — doctrine assumes the squad fights out of an armoured lorry within a few hundred metres."},
  pact_e50_at: {"fac":"pact","role":"at","cat":"infantry","layer":"ground","name":"RPG-2 Team","full":"AT Team, RPG-2","cost":170,"oil":0,"time":7,"hp":55,"armor":"infantry","speed":0.76,"turn":6,"sight":4.2,"r":6,"mass":0.1,"weapons":["w_e50_pact_at"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1949","confidence":"high","desc":"Unguided, effective to maybe 150m against a moving tank. There is no Soviet guided ATGM this decade at all — 3M6 Shmel does not arrive until 1960 — so the real anti-tank work is done by towed BS-3 100mm and ZiS-2 57mm guns sited in depth."},
  pact_e50_mbt: {"fac":"pact","role":"mbt","cat":"vehicle","layer":"ground","name":"T-54A","full":"T-54A Medium Tank","cost":645,"oil":9,"time":16,"hp":945,"armor":"heavy","speed":1.38,"turn":1.6,"sight":4.4,"r":15,"mass":47,"weapons":["w_e50_pact_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1955","confidence":"high","desc":"Base T-54 dates from 1948; the A model adds vertical gun stabilisation. Armour basis that Western 1950s guns struggled with — this is the tank that made NATO produce the Centurion Mk 7 and the M60. Crew ergonomics are miserable and it has no rangefinder worth the name.","turret":true,"tturn":1.3,"crush":true},
  pact_e50_heavy: {"fac":"pact","role":"heavy","cat":"vehicle","layer":"ground","name":"T-10","full":"T-10 (Object 730) Heavy Tank","cost":1060,"oil":17,"time":24,"hp":1325,"armor":"heavy","speed":1.29,"turn":1.4,"sight":4.8,"r":18,"mass":55,"weapons":["w_e50_pact_heavy"],"prereq":["factory","lab"],"tech":3,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"The last Soviet heavy tank, descended from the IS-3. Slow, two-piece ammunition, about three rounds a minute. Kept in reserve until 1993 but conceptually dead by 1960 once the T-62's smoothbore made heavy tanks pointless.","turret":true,"tturn":1.4,"crush":true},
  pact_e50_lighttank: {"fac":"pact","role":"lighttank","cat":"vehicle","layer":"ground","name":"PT-76","full":"PT-76 Amphibious Light Tank","cost":330,"oil":4,"time":9,"hp":385,"armor":"light","speed":1.72,"turn":2.4,"sight":4.3,"r":13,"mass":18,"weapons":["w_e50_pact_lighttank"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1951","confidence":"high","desc":"Water-jet propulsion and armour a heavy machine gun will go through. Not meant to fight tanks — meant to be first across a river so the pontoon engineers can follow. Enormous export career.","turret":true,"tturn":1.6},

  /* ---- BTR-152, BMP-1, BMP-2, BMP-3: WHERE THE REAL STEP IS ---------------
     The ramp put 460, 565, 695, 785, 845 across these four vehicles, which
     reads as steady improvement and hides both of the things that actually
     happened. The BTR-152 is a lorry: a ZiS-151 chassis with an open
     armoured body, 4 to 13.5 mm of it, and the row's own desc says "Honestly
     not an IFV ... Expect it to die to overhead artillery bursts" - yet it
     was written eight per cent TOUGHER than the enclosed, tracked, 16 mm M59
     the Americans field in the same band. And the BMP-2 is a BMP-1 with a
     different turret: same hull, same plate, one tonne heavier. The 23 per
     cent step the table gave it belongs five rows later, to the BMP-3, which
     is a genuinely different vehicle - 18.7 tonnes against 13.2, aluminium
     armour, a 100 mm gun - and keeps its place at the top of the chain.
     TWO MORE ROWS COME WITH IT. pla_e80_ifv is the WZ-501/Type 86, and its
     own desc calls it "a reverse-engineered BMP-1, sample vehicles obtained
     from Egypt" - so the paragraph above applies to it word for word, and
     leaving it on the ramp would have stood a Chinese BMP-1 copy 12 per cent
     ABOVE the Soviet BMP-2 that outclasses it. And the two BMP-3 rows, e90
     and e00, are one 1987 vehicle written twice, so they now read alike down
     to the barrels and the build time instead of 785/730/9/12 against
     800/810/10/13. */
  pact_e50_ifv: {"fac":"pact","role":"ifv","cat":"vehicle","layer":"ground","name":"BTR-152","full":"BTR-152 Armoured Personnel Carrier","cost":390,"oil":5,"time":10,"hp":385,"armor":"light","speed":1.55,"turn":2,"sight":4.2,"r":14,"mass":19,"weapons":["w_e50_pact_ifv"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1950","confidence":"high","desc":"Honestly not an IFV. A ZiS-151 truck with an open armoured body — the squad rides in, dismounts, and fights on foot. BTR-50P (1954) adds tracks and amphibious capability but the same open top. Expect it to die to overhead artillery bursts.","turret":true,"tturn":1.8,"cargo":6},
  pact_e50_spg: {"fac":"pact","role":"spg","cat":"vehicle","layer":"ground","name":"SU-100","full":"SU-100 Self-Propelled Gun","cost":665,"oil":9,"time":16,"hp":425,"armor":"light","speed":1.16,"turn":1.5,"sight":3.3,"r":15,"mass":42,"weapons":["w_e50_pact_spg"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1944","confidence":"high","desc":"A wartime casemate assault gun still in the order of battle through the 1950s. Its presence is a gap, not a choice: the Soviets cancelled their SP artillery programmes mid-decade, so from roughly 1955 to 1971 divisional guns are towed D-30s and M-46s hooked to trucks. No SP howitzer exists to model.","turret":true,"tturn":0.9},
  pact_e50_mlrs: {"fac":"pact","role":"mlrs","cat":"vehicle","layer":"ground","name":"BM-14","full":"BM-14 140mm Multiple Rocket Launcher","cost":965,"oil":15,"time":23,"hp":375,"armor":"light","speed":1.12,"turn":1.3,"sight":3.3,"r":15,"mass":44,"weapons":["w_e50_pact_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e50","to":"e50","service":"1952","confidence":"high","desc":"Direct descendant of the wartime Katyusha and used the same way — a battalion salvo to break up an assembly area. BM-24 (240mm, 1951) does the same job with fewer, heavier rockets.","turret":true,"tturn":0.8},
  pact_e50_spaag: {"fac":"pact","role":"spaag","cat":"vehicle","layer":"ground","name":"ZSU-57-2","full":"ZSU-57-2 Sparka","cost":485,"oil":7,"time":12,"hp":440,"armor":"light","speed":1.38,"turn":1.9,"sight":5.7,"r":14,"mass":34,"weapons":["w_e50_pact_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1955","confidence":"high","desc":"No radar at all, and a rate of fire far too low for jets — obsolete against its intended targets almost immediately. Ended its life as a devastating direct-fire weapon against buildings and infantry.","turret":true,"tturn":2.6,"radar":4.8},
  pact_e50_aa: {"fac":"pact","role":"aa","cat":"infantry","layer":"ground","name":"ZPU-4 Team","full":"AA Section, ZPU-4 14.5mm","cost":150,"oil":0,"time":6,"hp":55,"armor":"infantry","speed":0.77,"turn":6,"sight":4.7,"r":6,"mass":0.1,"weapons":["w_e50_pact_aa"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1949","confidence":"high","desc":"There is no Soviet MANPADS this decade — infantry air defence means dragging a heavy mount into position and hoping the aircraft flies low. The strategic answer arrives separately as the S-75 Dvina SAM (1957), which downs Powers' U-2 in 1960."},
  pact_e50_recon: {"fac":"pact","role":"recon","cat":"vehicle","layer":"ground","name":"BRDM-1","full":"BRDM-1 Scout Car","cost":170,"oil":2,"time":5,"hp":200,"armor":"light","speed":2.32,"turn":3,"sight":5.4,"r":11,"mass":7,"weapons":["w_e50_pact_recon"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1957","confidence":"high","desc":"Amphibious 4x4 with retractable belly wheels for trench crossing. BTR-40 (1950) fills the slot earlier and less capably. Purely a reconnaissance vehicle — it reports and runs.","turret":true,"tturn":2.2},
  pact_e50_fighter: {"fac":"pact","role":"fighter","cat":"aircraft","layer":"air","name":"MiG-17F","full":"MiG-17F Fresco-C","cost":620,"oil":13,"time":15,"hp":230,"armor":"air","speed":7.57,"turn":2,"sight":6.3,"r":15,"mass":0,"weapons":["w_e50_pact_fighter"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1952","confidence":"high","desc":"Transonic day fighter, cannon only, no radar in the base variant. Extremely agile at low speed, which is why it kept killing supersonic aircraft over Vietnam fifteen years later.","jet":true,"ammo":2,"radar":2.4,"radius":28,"rcs":0.85},
  pact_e50_cas: {"fac":"pact","role":"cas","cat":"aircraft","layer":"air","name":"Il-10M","full":"Ilyushin Il-10M Shturmovik","cost":875,"oil":17,"time":21,"hp":415,"armor":"air","speed":4.99,"turn":1.5,"sight":5.1,"r":17,"mass":0,"weapons":["w_e50_pact_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e50","to":"e50","service":"1951","confidence":"medium","desc":"Piston-engined armoured ground-attack aircraft, the Il-2's successor. Be candid about what happens next: Soviet ground-attack aviation was formally abolished in 1956 and the mission handed to fighter-bombers. There is no purpose-built Soviet CAS aircraft again until the Su-25 in 1981 — a 25-year hole.","jet":true,"ammo":3,"radius":26,"rcs":1.5},
  pact_e50_transport: {"fac":"pact","role":"transport","cat":"aircraft","layer":"air","name":"Mi-4","full":"Mil Mi-4 Hound","cost":390,"oil":6,"time":10,"hp":300,"armor":"air","speed":3.44,"turn":2.4,"sight":4.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"Piston-engined assault transport carrying around 14 troops. The gun-and-rocket Mi-4AV conversion is a 1967 idea. There is no attack helicopter in the 1950s Soviet inventory to pair it with.","ammo":0,"hover":true,"cargo":10,"radius":28,"rcs":1.1},
  pact_e50_corvette: {"fac":"pact","role":"corvette","cat":"naval","layer":"sea","name":"Project 50 Riga","full":"Project 50 Riga-class patrol escort","cost":485,"oil":7,"time":12,"hp":560,"armor":"light","speed":2.32,"turn":1.7,"sight":4.4,"r":17,"mass":0,"weapons":["w_e50_pact_corvette","aagun_v11"],"prereq":["navalyard"],"tech":1,"from":"e50","to":"e50","service":"1954","confidence":"high","desc":"Small gun-and-depth-charge escort built in quantity and exported everywhere. Its job is coastal ASW and convoy escort, not surface action.","turret":true,"tturn":2,"sonar":2.8,"ciws":0.24,"rcs":0.75},
  pact_e50_destroyer: {"fac":"pact","role":"destroyer","cat":"naval","layer":"sea","name":"Project 56 Kotlin","full":"Project 56 Kotlin-class destroyer","cost":920,"oil":15,"time":21,"hp":1065,"armor":"heavy","speed":1.94,"turn":1.2,"sight":5,"r":20,"mass":0,"weapons":["w_e50_pact_destroyer","aagun_v11"],"prereq":["navalyard","radar"],"tech":2,"from":"e50","to":"e50","service":"1955","confidence":"high","desc":"Fast, handsome, heavily gunned — and already conceptually obsolete on commissioning, because the future was missiles. Project 30bis Skoryy (1949) is the numerically dominant destroyer for most of the decade.","turret":true,"tturn":1.4,"sonar":3.8,"radar":6.6,"ciws":0.3,"rcs":1.05},
  pact_e50_cruiser: {"fac":"pact","role":"cruiser","cat":"naval","layer":"sea","name":"Project 68bis Sverdlov","full":"Project 68bis Sverdlov-class cruiser","cost":1425,"oil":27,"time":32,"hp":1510,"armor":"heavy","speed":1.63,"turn":0.9,"sight":5.4,"r":23,"mass":0,"weapons":["w_e50_pact_cruiser","aagun_v11"],"prereq":["navalyard","lab"],"tech":3,"from":"e50","to":"e50","service":"1952","confidence":"high","desc":"All-gun, no missiles, no aviation. The Royal Navy took these seriously enough to design a weapon specifically to kill them. Fourteen completed before Khrushchev stopped the programme in favour of missile ships and submarines.","turret":true,"tturn":1,"sonar":3.6,"radar":8.4,"ciws":0.33,"rcs":1.8},
  pact_e50_sub: {"fac":"pact","role":"sub","cat":"naval","layer":"sub","name":"Project 613 Whiskey","full":"Project 613 Whiskey-class attack submarine","cost":1035,"oil":17,"time":22,"hp":615,"armor":"light","speed":1.55,"turn":1.1,"sight":4.8,"r":17,"mass":0,"weapons":["w_e50_pact_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e50","to":"e50","service":"1951","confidence":"high","desc":"Around 215 built — the largest postwar submarine programme by any navy, with heavy German Type XXI influence. Project 611 Zulu (1952) is the long-range companion and later carries the first submarine-launched ballistic missiles.","sonar":4.3,"quiet":0.46},
  pact_e60_rifle: {"fac":"pact","role":"rifle","cat":"infantry","layer":"ground","name":"Motor Rifle Squad","full":"Motor Rifle Squad, AKM","cost":75,"oil":0,"time":4,"hp":80,"armor":"infantry","speed":0.95,"turn":7,"sight":3.9,"r":6,"mass":0.1,"weapons":["w_e60_pact_rifle"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1959","confidence":"high","desc":"Stamped-receiver AKM, lighter and cheaper than the AK-47. From 1966 the squad rides a BMP-1 and can fire through hull ports, which is the whole point of the vehicle."},
  pact_e60_at: {"fac":"pact","role":"at","cat":"infantry","layer":"ground","name":"Malyutka Team","full":"AT Team, 9M14 Malyutka (AT-3 Sagger)","cost":210,"oil":0,"time":7,"hp":70,"armor":"infantry","speed":0.79,"turn":6,"sight":4.9,"r":6,"mass":0.1,"weapons":["w_e60_pact_at"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"The first Soviet ATGM fielded in quantity, and the reason this era matters. MCLOS guidance — the gunner flies it onto the target with a thumb joystick for the whole 20-plus second flight, so the hit rate collapses if he is being shot at. Devastating at Suez in 1973, much less so once tanks replied with suppressive coax"},
  pact_e60_mbt: {"fac":"pact","role":"mbt","cat":"vehicle","layer":"ground","name":"T-62","full":"T-62 Main Battle Tank","cost":800,"oil":11,"time":17,"hp":1165,"armor":"heavy","speed":1.44,"turn":1.6,"sight":5.2,"r":15,"mass":47,"weapons":["w_e60_pact_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1961","confidence":"high","desc":"First smoothbore tank gun in any service, and the first fin-stabilised APFSDS. Bought a real overmatch advantage for about six years. Downsides are ugly: an automatic shell-ejection port that vents fumes into the fighting compartment, and around four rounds a minute.","turret":true,"tturn":1.3,"crush":true},
  pact_e60_lighttank: {"fac":"pact","role":"lighttank","cat":"vehicle","layer":"ground","name":"PT-76B","full":"PT-76B Amphibious Light Tank","cost":410,"oil":5,"time":10,"hp":475,"armor":"light","speed":1.8,"turn":2.4,"sight":5,"r":13,"mass":18,"weapons":["w_e60_pact_lighttank"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1959","confidence":"high","desc":"Stabilised gun and NBC kit added; otherwise unchanged. Same role, same paper armour.","turret":true,"tturn":1.6},
  pact_e60_ifv: {"fac":"pact","role":"ifv","cat":"vehicle","layer":"ground","name":"BMP-1","full":"BMP-1 Infantry Fighting Vehicle","cost":485,"oil":6,"time":11,"hp":565,"armor":"light","speed":1.62,"turn":2,"sight":4.9,"r":14,"mass":19,"weapons":["w_e60_pact_ifv"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1966","confidence":"high","desc":"The world's first true IFV and a genuine Soviet first: amphibious, designed to fight across a nuclear battlefield without opening a hatch. The gun is inaccurate past 800m, the hull is aluminium-thin, and the fuel is stored in the rear doors — but conceptually it set the template every Western IFV followed.","turret":true,"tturn":1.8,"cargo":6},
  pact_e60_spg: {"fac":"pact","role":"spg","cat":"vehicle","layer":"ground","name":"2S3 Akatsiya","full":"2S3 Akatsiya 152mm Self-Propelled Howitzer","cost":825,"oil":11,"time":17,"hp":525,"armor":"light","speed":1.22,"turn":1.5,"sight":3.9,"r":15,"mass":42,"weapons":["w_e60_pact_spg"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1971","confidence":"high","desc":"Ends the sixteen-year Soviet SP artillery drought. Paired with 2S1 Gvozdika (122mm, 1971) at regimental level. Neither has anything like a modern fire-control computer — accuracy comes from mass, not precision.","turret":true,"tturn":0.9},
  pact_e60_mlrs: {"fac":"pact","role":"mlrs","cat":"vehicle","layer":"ground","name":"BM-21 Grad","full":"BM-21 Grad 122mm Multiple Rocket Launcher","cost":1195,"oil":18,"time":24,"hp":460,"armor":"light","speed":1.17,"turn":1.3,"sight":3.9,"r":15,"mass":44,"weapons":["w_e60_pact_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"Forty rockets in about twenty seconds from a Ural truck. Cheap, inaccurate, and one of the most widely fielded weapons on earth — still in Russian and dozens of other inventories in the 2020s as Tornado-G. The archetype for how the game's `mlrs` weapon should feel: huge beaten zone, long reload, useless against a point","turret":true,"tturn":0.8},
  pact_e60_spaag: {"fac":"pact","role":"spaag","cat":"vehicle","layer":"ground","name":"ZSU-23-4 Shilka","full":"ZSU-23-4 Shilka","cost":600,"oil":9,"time":12,"hp":545,"armor":"light","speed":1.44,"turn":1.9,"sight":6.7,"r":14,"mass":34,"weapons":["w_e60_pact_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1965","confidence":"medium","desc":"The first Soviet radar-directed SPAAG, and a serious problem for low-flying aircraft over Sinai in 1973. Short ranged and the radar is easy to jam or out-range, but inside its envelope it is lethal.","turret":true,"tturn":2.6,"radar":5.6},
  pact_e60_aa: {"fac":"pact","role":"aa","cat":"infantry","layer":"ground","name":"Strela-2 Team","full":"MANPADS Team, 9K32 Strela-2 (SA-7 Grail)","cost":185,"oil":0,"time":6,"hp":65,"armor":"infantry","speed":0.81,"turn":6,"sight":5.5,"r":6,"mass":0.1,"weapons":["w_e60_pact_aa"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1968","confidence":"high","desc":"First Soviet shoulder-launched SAM. Uncooled seeker means it can only chase a hot exhaust from behind, and early flares defeated it easily — kill rates in Vietnam and Sinai were poor. Its real effect was forcing aircraft up into the SAM belt. 9K34 Strela-3 (1974) adds a cooled seeker."},

  /* ---- THE SAME SCOUT CAR, FOUR TIMES ------------------------------------
     pact_e60_recon through pact_e00_recon are one vehicle: the BRDM-2 of
     1962, and every row says so - "this is the same vehicle as the game's
     present-day recon_p, sixty years later", "Unchanged and still in
     universal service", "Thirty years old and still the standard scout car".
     The numbers disagreed with all three, running 245, 300, 340, 365 hit
     points and 2.43, 2.57, 2.65, 2.67 speed, so a 1962 armoured car gained
     49 per cent of its structure and 10 per cent of its road speed by
     standing still for forty years. One vehicle, one hull figure, one speed,
     one price - and one fuel bill and one build time, four barrels and six
     seconds, where the rows had run 3/5, 4/6, 4/6 and 5/6. `oil` is not
     decoration: ai.js forceBook() adds it up to decide how much of a force
     is ground. What DOES change across those four decades is what the crew
     can see, and that is the sight field and the optics multiplier in
     generations.js - left exactly as it was. */
  pact_e60_recon: {"fac":"pact","role":"recon","cat":"vehicle","layer":"ground","name":"BRDM-2","full":"BRDM-2 Scout Car","cost":300,"oil":4,"time":6,"hp":355,"armor":"light","speed":2.65,"turn":3,"sight":6.3,"r":11,"mass":7,"weapons":["w_e60_pact_recon"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1962","confidence":"high","desc":"Amphibious, belly wheels retained. Note the longevity: this is the same vehicle as the game's present-day `recon_p`, sixty years later. Also the base for the 9P133 Malyutka and 9P148 Konkurs tank-destroyer variants.","turret":true,"tturn":2.2},
  pact_e60_fighter: {"fac":"pact","role":"fighter","cat":"aircraft","layer":"air","name":"MiG-21","full":"MiG-21F-13 / MiG-21bis Fishbed","cost":770,"oil":17,"time":16,"hp":280,"armor":"air","speed":7.92,"turn":2,"sight":7.4,"r":15,"mass":0,"weapons":["w_e60_pact_fighter"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1959","confidence":"high","desc":"Around 11,000 built, the most-produced supersonic aircraft ever. Tiny radar and roughly forty-five minutes of fuel — it is a ground-controlled interceptor that gets vectored, makes one pass, and lands. Superb energy fighter, near-blind on its own.","jet":true,"ammo":2,"radar":2.8,"radius":28,"rcs":0.85},
  pact_e60_cas: {"fac":"pact","role":"cas","cat":"aircraft","layer":"air","name":"Su-17 Fitter","full":"Sukhoi Su-17M Fitter-C","cost":1085,"oil":22,"time":22,"hp":510,"armor":"air","speed":5.22,"turn":1.5,"sight":5.9,"r":17,"mass":0,"weapons":["w_e60_pact_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e60","service":"1970","confidence":"high","desc":"Swing-wing fighter-bomber, the mainstay of frontal aviation's ground-attack force. Not an armoured CAS aircraft — it delivers ordnance in a fast pass and leaves. The Su-7B (1961) is the earlier, less capable version of the same idea.","jet":true,"ammo":3,"radius":26,"rcs":1.5},
  pact_e60_gunship: {"fac":"pact","role":"gunship","cat":"aircraft","layer":"air","name":"Mi-24 Hind","full":"Mil Mi-24A / Mi-24D Hind","cost":885,"oil":14,"time":17,"hp":435,"armor":"air","speed":3.15,"turn":2.2,"sight":6.3,"r":16,"mass":0,"weapons":["w_e60_pact_gunship"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1972","confidence":"high","desc":"Not an attack helicopter in the AH-1 sense — it carries eight troops as well as guns, a flying IFV that the Soviets thought would deliver assault infantry onto an objective. Heavily armoured, very fast for a helicopter, clumsy in a turn. Mi-4AV (1967) is the crude armed conversion that preceded it.","ammo":5,"hover":true,"radius":21,"rcs":0.85},

  /* ---- ONE HIP, FOUR DECADES ---------------------------------------------
     This row, pact_e80_transport, pact_e90_transport, pact_e00_transport and
     trans_p in rules.js are all the same 12-tonne Mil Mi-8, and the file says
     so in its own descs - "a 1967 airframe still in first-line service
     in the 2020s", "otherwise the same aircraft", "Unchanged." - while the
     numbers ran 370, 460, 515, 555 hit points up to trans_p's 580. A
     helicopter does not gain half its structure by being looked at in a later
     decade. Two real steps survive, and only two: the TV3-117 engines of the
     Mi-8MT, in series from 1977 and sold abroad as the Mi-17 from 1981,
     which is why the e80 row is quicker and a little heavier than the Mi-8T,
     and the armour and armament of the Mi-8AMTSh of 2009, which is why the
     e00 row - left untouched at 555 - still stands above the rest. The two
     Mi-8MT rows are dated 1977 rather than 1967 for that reason: 1967 is the
     Mi-8T above them. And the e90 row, whose desc is the single word
     "Unchanged", now carries the same figures AND the same price and fuel as
     the e80 row it says it is unchanged from - 620 credits and 9 barrels,
     not 730 and 11, because `oil` is what ai.js forceBook() counts. */
  pact_e60_transport: {"fac":"pact","role":"transport","cat":"aircraft","layer":"air","name":"Mi-8 Hip","full":"Mil Mi-8T Hip","cost":560,"oil":7,"time":11,"hp":470,"armor":"air","speed":3.7,"turn":2.4,"sight":5.6,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1967","confidence":"high","desc":"Turbine assault transport carrying 24 troops, and the most-produced helicopter in history. Same platform as the game's `trans_p` — a 1967 airframe still in first-line service in the 2020s, the best longevity example in the Eastern roster. Mi-6 (1959) is the heavy-lift companion.","ammo":0,"hover":true,"cargo":10,"radius":28,"rcs":1.1},
  pact_e60_corvette: {"fac":"pact","role":"corvette","cat":"naval","layer":"sea","name":"Project 1124 Grisha","full":"Project 1124 Grisha-class small ASW ship","cost":600,"oil":9,"time":12,"hp":690,"armor":"light","speed":2.43,"turn":1.7,"sight":5.2,"r":17,"mass":0,"weapons":["w_e60_pact_corvette","asw_rbu","aagun_ak725"],"prereq":["navalyard"],"tech":1,"from":"e60","to":"e60","service":"1970","confidence":"high","desc":"Coastal ASW corvette built to hold the approaches to the Soviet bastions against NATO submarines. Project 159 Petya (1961) is the earlier and simpler equivalent.","turret":true,"tturn":2,"sonar":3.2,"ciws":0.27,"rcs":0.7},
  pact_e60_destroyer: {"fac":"pact","role":"destroyer","cat":"naval","layer":"sea","name":"Project 61 Kashin","full":"Project 61 Kashin-class destroyer","cost":1140,"oil":19,"time":22,"hp":1310,"armor":"heavy","speed":2.03,"turn":1.2,"sight":5.9,"r":20,"mass":0,"weapons":["w_e60_pact_destroyer","sam_volna"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1962","confidence":"high","desc":"The world's first major warship with all-gas-turbine propulsion — four engines, distinctive twin funnel pairs. No meaningful anti-ship missile in the original fit. The first Soviet destroyer designed around missiles rather than guns.","turret":true,"tturn":1.4,"sonar":4.5,"radar":7.7,"ciws":0.34,"rcs":1.15},
  pact_e60_cruiser: {"fac":"pact","role":"cruiser","cat":"naval","layer":"sea","name":"Project 58 Kynda","full":"Project 58 Grozny-class missile cruiser","cost":1765,"oil":33,"time":34,"hp":1855,"armor":"heavy","speed":1.71,"turn":0.9,"sight":6.3,"r":23,"mass":0,"weapons":["w_e60_pact_cruiser","sam_volna"],"prereq":["navalyard","lab"],"tech":3,"from":"e60","to":"e60","service":"1962","confidence":"high","desc":"First Soviet missile cruiser, with a genuinely enormous salvo for 1962. No practical reload at sea and very little air defence depth. Project 1134A Kresta II (1969) rebalances toward ASW.","turret":true,"tturn":1,"sonar":4.2,"radar":9.8,"ciws":0.37,"rcs":1.4},
  pact_e60_missileboat: {"fac":"pact","role":"missileboat","cat":"naval","layer":"sea","name":"Project 205 Osa","full":"Project 205 Osa-class missile boat","cost":825,"oil":12,"time":15,"hp":610,"armor":"light","speed":2.79,"turn":1.8,"sight":5.9,"r":16,"mass":0,"weapons":["w_e60_pact_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1961","confidence":"high","desc":"Four missiles on a 200-tonne hull; roughly 400 built and exported to everyone. The predecessor Project 183R Komar sank the Israeli destroyer Eilat in October 1967 — the first sinking of a warship by a guided anti-ship missile — and reorganised every navy's thinking about small combatants overnight.","sonar":0,"rcs":0.52},
  pact_e60_sub: {"fac":"pact","role":"sub","cat":"naval","layer":"sub","name":"Project 641 Foxtrot","full":"Project 641 Foxtrot-class attack submarine","cost":1285,"oil":21,"time":23,"hp":755,"armor":"light","speed":1.62,"turn":1.1,"sight":5.6,"r":17,"mass":0,"weapons":["w_e60_pact_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e60","to":"e60","service":"1958","confidence":"high","desc":"Long-range diesel-electric boat, three shafts. Four of these were the boats hunted during the Cuban Missile Crisis, one carrying a nuclear torpedo. Noisy by later standards but very long-legged.","sonar":5,"quiet":0.37},
  pact_e60_carrier: {"fac":"pact","role":"carrier","cat":"naval","layer":"sea","name":"Project 1123 Moskva","full":"Project 1123 Moskva-class helicopter cruiser","cost":2620,"oil":60,"time":48,"hp":2625,"armor":"heavy","speed":1.35,"turn":0.6,"sight":8,"r":30,"mass":0,"weapons":["w_e60_pact_carrier","sam_shtorm"],"prereq":["navalyard","lab","airbase"],"tech":3,"from":"e60","to":"e60","service":"1967","confidence":"high","desc":"Half cruiser, half flight deck, built to hunt Polaris submarines rather than project air power — and it handled badly in a sea. The Soviets never built a catapult carrier; Project 1143 Kiev (1975) with Yak-38 Forger VTOL is the next step, and the Yak-38 was short-ranged, could barely lift a useful load, and killed a nu","carrier":3,"sonar":2.8,"radar":9.1,"ciws":0.35,"rcs":2.2},
  pact_e60_awacs: {"fac":"pact","role":"awacs","cat":"aircraft","layer":"air","name":"Tu-126 Moss","full":"Tupolev Tu-126","cost":1825,"oil":41,"time":28,"hp":385,"armor":"air","speed":3.51,"turn":0.8,"sight":9.1,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e60","to":"e60","service":"1965","confidence":"high","desc":"Real, but be candid: almost no look-down capability over land because the radar could not separate a target from ground clutter, so it was useful over water and the Arctic and close to worthless over Europe. Only nine built.","jet":true,"ammo":0,"radar":16.8,"radius":57,"rcs":3.6},
  pact_e60_sead: {"fac":"pact","role":"sead","cat":"aircraft","layer":"air","name":"Su-17M (Kh-28)","full":"Sukhoi Su-17M carrying Kh-28 (AS-9 Kyle)","cost":1055,"oil":21,"time":21,"hp":320,"armor":"air","speed":6.66,"turn":1.6,"sight":7,"r":16,"mass":0,"weapons":["w_e60_pact_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e60","to":"e60","service":"1973","confidence":"medium","desc":"First Soviet air-launched anti-radiation capability. Liquid-fuelled with a storable but toxic propellant that made ground handling genuinely hazardous, and the seeker had to be tuned to a specific radar band before takeoff. A crude Wild Weasel by American standards. Exact in-service year is not firmly documented in ope","jet":true,"ammo":2,"radius":30,"rcs":1.1},
  pact_e80_rifle: {"fac":"pact","role":"rifle","cat":"infantry","layer":"ground","name":"Motor Rifle Squad","full":"Motor Rifle Squad, AK-74","cost":100,"oil":0,"time":4,"hp":100,"armor":"infantry","speed":1,"turn":7,"sight":4.7,"r":6,"mass":0.1,"weapons":["w_e80_pact_rifle"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1974","confidence":"high","desc":"Small-calibre high-velocity round adopted after the Soviets studied the M16. Lighter ammunition load, flatter trajectory, notorious wounding behaviour. The squad now rides a BMP-2."},
  pact_e80_at: {"fac":"pact","role":"at","cat":"infantry","layer":"ground","name":"Konkurs Team","full":"AT Team, 9K113 Konkurs (AT-5 Spandrel)","cost":270,"oil":0,"time":8,"hp":85,"armor":"infantry","speed":0.84,"turn":6,"sight":5.9,"r":6,"mass":0.1,"weapons":["w_e80_pact_at"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1974","confidence":"high","desc":"Fired from a ground tripod or from BMP-2 and BRDM-2 launchers; the workhorse Soviet ATGM of the decade. 9K115 Metis (1979) is the lighter platoon weapon and RPG-29 Vampir (1989) the tandem-warhead rocket that could actually defeat reactive armour."},
  pact_e80_mbt: {"fac":"pact","role":"mbt","cat":"vehicle","layer":"ground","name":"T-80U","full":"T-80U Main Battle Tank","cost":1020,"oil":15,"time":18,"hp":1440,"armor":"heavy","speed":1.52,"turn":1.6,"sight":6.2,"r":15,"mass":47,"weapons":["w_e80_pact_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1985","confidence":"high","desc":"Gas turbine, Kontakt-5 explosive reactive armour, and a 5km missile shot. The best tank the USSR fielded and roughly a match for an M1A1 on paper. Two real problems: the turbine drinks fuel at a rate that broke the logistics assumption, and it keeps the T-72's carousel.","turret":true,"tturn":1.3,"crush":true},
  pact_e80_lighttank: {"fac":"pact","role":"lighttank","cat":"vehicle","layer":"ground","name":"BMD-2","full":"BMD-2 Airborne Combat Vehicle","cost":525,"oil":7,"time":10,"hp":585,"armor":"light","speed":1.9,"turn":2.4,"sight":6,"r":13,"mass":18,"weapons":["w_e80_pact_lighttank"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1985","confidence":"high","desc":"30mm turret replacing the 73mm gun. Still air-droppable with the crew aboard, still made of aluminium. The Soviets had no other light tank programme in this era; PT-76 is aging out and 2S25 Sprut-SD is twenty years away.","turret":true,"tturn":1.6},
  pact_e80_ifv: {"fac":"pact","role":"ifv","cat":"vehicle","layer":"ground","name":"BMP-2","full":"BMP-2 Infantry Fighting Vehicle","cost":620,"oil":7,"time":12,"hp":600,"armor":"light","speed":1.71,"turn":2,"sight":5.9,"r":14,"mass":19,"weapons":["w_e80_pact_ifv"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1980","confidence":"high","desc":"A direct response to Afghanistan and to the fact that the BMP-1's gun could not elevate or hit anything. Two-man turret. Still very thinly armoured.","turret":true,"tturn":1.8,"cargo":6},
  pact_e80_spg: {"fac":"pact","role":"spg","cat":"vehicle","layer":"ground","name":"2S19 Msta-S","full":"2S19 Msta-S 152mm Self-Propelled Howitzer","cost":1060,"oil":15,"time":19,"hp":650,"armor":"light","speed":1.28,"turn":1.5,"sight":4.6,"r":15,"mass":42,"weapons":["w_e80_pact_spg"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1989","confidence":"high","desc":"The game's `spg_p`, and a 1989 design still in the current force. Genuinely competitive artillery — this is one area where the Soviets were not behind. 2S5 Giatsint-S (1976) and 2S7 Pion (203mm, 1975) fill the corps and army roles.","turret":true,"tturn":0.9},
  pact_e80_mlrs: {"fac":"pact","role":"mlrs","cat":"vehicle","layer":"ground","name":"BM-30 Smerch","full":"9A52 Smerch 300mm Multiple Rocket Launcher","cost":1535,"oil":23,"time":26,"hp":570,"armor":"light","speed":1.23,"turn":1.3,"sight":4.6,"r":15,"mass":44,"weapons":["w_e80_pact_mlrs","scat_ptm3"],"dispenser":6,"prereq":["factory","lab"],"tech":3,"from":"e80","to":"e80","service":"1987","confidence":"medium","desc":"The game's `mlrs_p`. Rockets are individually corrected in flight, and the beaten zone can cover several dozen hectares in one salvo. Nothing NATO fielded matched the area effect. BM-27 Uragan (220mm, 1975) is the earlier divisional system.","turret":true,"tturn":0.8},
  pact_e80_spaag: {"fac":"pact","role":"spaag","cat":"vehicle","layer":"ground","name":"2S6 Tunguska","full":"2S6 Tunguska","cost":765,"oil":11,"time":13,"hp":670,"armor":"light","speed":1.52,"turn":1.9,"sight":8,"r":14,"mass":34,"weapons":["w_e80_pact_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1982","confidence":"medium","desc":"The game's `spaag_p`. Guns for the close fight, missiles out to 8km, designed specifically to kill the AH-64 hovering behind a treeline. Adoption is variously given as 1982 or 1984; the 2S6M seen most often dates from 1990.","turret":true,"tturn":2.6,"radar":6.7},
  pact_e80_aa: {"fac":"pact","role":"aa","cat":"infantry","layer":"ground","name":"Igla Team","full":"MANPADS Team, 9K38 Igla (SA-18 Grouse)","cost":235,"oil":0,"time":7,"hp":85,"armor":"infantry","speed":0.86,"turn":6,"sight":6.6,"r":6,"mass":0.1,"weapons":["w_e80_pact_aa"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1983","confidence":"high","desc":"Real flare rejection and an offset aim point so the warhead hits the fuselage rather than the tailpipe. A serious weapon, unlike Strela-2. The layers above it are 9K330 Tor (1986), 9K37 Buk (1980) and S-300PS (1982)."},
  pact_e80_recon: {"fac":"pact","role":"recon","cat":"vehicle","layer":"ground","name":"BRDM-2","full":"BRDM-2 Scout Car","cost":300,"oil":4,"time":6,"hp":355,"armor":"light","speed":2.65,"turn":3,"sight":7.6,"r":11,"mass":7,"weapons":["w_e80_pact_recon"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1962","confidence":"high","desc":"Unchanged and still in universal service. BRM-1K (1972), a BMP-1 hull with a Tall Mike surveillance radar and a laser rangefinder, is the specialised reconnaissance variant.","turret":true,"tturn":2.2},

  /* ---- FULCRUM AND FLANKER ARE NOT THE SAME AEROPLANE --------------------
     A MiG-29 is 20 tonnes gross with about forty minutes of internal fuel; an
     Su-27/Su-35 is 34 tonnes and was designed to fly 1,600 km out and fight.
     The ramp gave the Su-35S 420 hp and a 30-tile radius, one notch above the
     MiG-29S it follows and BELOW the game's own present-day Flanker figures
     (Su-33 at 520, Su-57 at 600). The Fulcrum's short legs are the more
     interesting correction of the two, because they are the reason it lost
     the export competitions it should have won: the hand-written German
     MiG-29G in this same file already carries radius 24, and the Soviet rows
     were sitting at 29 and 30 - a Flanker's reach on a point interceptor.
     The two marks are also the same airframe, so they now hold the same
     speed; the S is a better radar and an R-77, not a faster aeroplane.
     The Flanker's reach stops at 46 tiles, level with stealth_p - the Su-57 -
     in rules.js, with the PLA's Su-27SK at 44 below it. Reality says a Su-35
     flies further than a Raptor does; rules.js says stealth_n reaches 48 and
     stealth_p 46, and rules.js is this game's scale. An era row does not get
     to overtake the present-day aeroplane it grows into. */
  pact_e80_fighter: {"fac":"pact","role":"fighter","cat":"aircraft","layer":"air","name":"MiG-29","full":"MiG-29 (9.12) Fulcrum-A","cost":985,"oil":21,"time":17,"hp":400,"armor":"air","speed":8.7,"turn":2,"sight":8.8,"r":15,"mass":0,"weapons":["w_e80_pact_fighter"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1983","confidence":"high","desc":"Ancestor of the game's `fighter_p`. Superb instantaneous turn and R-73 off-boresight shots — a combination that shocked NATO pilots after 1990, because within visual range it genuinely won. Outside that it is badly outclassed: crude radar, poor cockpit, roughly 40 minutes of internal fuel. A point-defence interceptor s","jet":true,"ammo":3,"radar":3.4,"radius":26,"rcs":0.85},
  pact_e80_cas: {"fac":"pact","role":"cas","cat":"aircraft","layer":"air","name":"Su-25 Frogfoot","full":"Sukhoi Su-25 Frogfoot","cost":1385,"oil":28,"time":24,"hp":630,"armor":"air","speed":5.51,"turn":1.5,"sight":7.1,"r":17,"mass":0,"weapons":["w_e80_pact_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1981","confidence":"high","desc":"The game's `bomber_p` lineage. Titanium bathtub around the cockpit and enough redundancy that aircraft came back from Afghanistan with tens of hits. Subsonic, unsophisticated avionics, must get close. First purpose-built Soviet ground-attack aircraft in a quarter century. Formal state acceptance is dated 1987 in some s","jet":true,"ammo":4,"radius":27,"rcs":1.5},
  pact_e80_gunship: {"fac":"pact","role":"gunship","cat":"aircraft","layer":"air","name":"Mi-24V Hind-E","full":"Mil Mi-24V Hind-E","cost":1130,"oil":18,"time":19,"hp":535,"armor":"air","speed":3.33,"turn":2.2,"sight":7.6,"r":16,"mass":0,"weapons":["w_e80_pact_gunship"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1976","confidence":"high","desc":"The Afghan war aircraft. Both the Mi-28 and the Ka-50 first flew in 1982 but neither entered service in the Soviet period — Ka-50 in 1995 and Mi-28N not until the late 2000s — so the Hind carries this role alone for over thirty years.","ammo":6,"hover":true,"radius":21,"rcs":0.85},
  pact_e80_transport: {"fac":"pact","role":"transport","cat":"aircraft","layer":"air","name":"Mi-8 Hip","full":"Mil Mi-8MT / Mi-17 Hip-H","cost":620,"oil":9,"time":12,"hp":500,"armor":"air","speed":3.85,"turn":2.4,"sight":6.7,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1977","confidence":"high","desc":"Mi-8MT (1977) upgrades the engines to the TV3-117 for hot-and-high work in Afghanistan; otherwise the same aircraft, and the export designation Mi-17 appears in 1981. Mi-26 Halo (1983) is the heaviest production helicopter ever built and lifts 20 tonnes.","ammo":0,"hover":true,"cargo":10,"radius":29,"rcs":1.1},
  pact_e80_corvette: {"fac":"pact","role":"corvette","cat":"naval","layer":"sea","name":"Project 1234 Nanuchka","full":"Project 1234 Nanuchka-class missile corvette","cost":765,"oil":12,"time":13,"hp":855,"armor":"light","speed":2.57,"turn":1.7,"sight":6.2,"r":17,"mass":0,"weapons":["w_e80_pact_corvette","sam_osa","ciws_ak630"],"prereq":["navalyard"],"tech":1,"from":"e80","to":"e80","service":"1970","confidence":"high","desc":"An absurd weight of anti-ship armament on a 700-tonne hull, at the cost of endurance and sea-keeping. Grisha (1970) continues in the ASW role alongside it.","turret":true,"tturn":2,"sonar":3.9,"ciws":0.3,"rcs":0.65},
  pact_e80_missileboat: {"fac":"pact","role":"missileboat","cat":"naval","layer":"sea","name":"Project 1241 Molniya","full":"Project 1241 Tarantul-class missile boat","cost":1060,"oil":15,"time":16,"hp":750,"armor":"light","speed":2.95,"turn":1.8,"sight":7.1,"r":16,"mass":0,"weapons":["w_e80_pact_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1979","confidence":"medium","desc":"The game's `missileboat_p`, still in Russian service in the 2020s. Fast, short-legged, and with no defence worth the name against air attack — a genuine glass cannon. Some sources date first commissioning to 1981.","sonar":0,"rcs":0.55},
  pact_e80_destroyer: {"fac":"pact","role":"destroyer","cat":"naval","layer":"sea","name":"Project 956 Sovremenny","full":"Project 956 Sovremenny-class destroyer","cost":1460,"oil":24,"time":24,"hp":1620,"armor":"heavy","speed":2.14,"turn":1.2,"sight":7.1,"r":20,"mass":0,"weapons":["w_e80_pact_destroyer","sam_uragan"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1980","confidence":"high","desc":"The game's `destroyer_p`. Built explicitly to fight surface groups and support amphibious landings, with Udaloy (1980) built alongside it to do ASW. Steam turbines rather than gas turbines, and the boilers proved chronically unreliable — which is why so few remain operational.","turret":true,"tturn":1.4,"sonar":5.4,"radar":9.2,"ciws":0.37,"rcs":1.3},
  pact_e80_cruiser: {"fac":"pact","role":"cruiser","cat":"naval","layer":"sea","name":"Project 1164 Slava","full":"Project 1164 Atlant / Slava-class missile cruiser","cost":2265,"oil":42,"time":37,"hp":2290,"armor":"heavy","speed":1.81,"turn":0.9,"sight":7.6,"r":23,"mass":0,"weapons":["w_e80_pact_cruiser","sam_fort"],"prereq":["navalyard","lab"],"tech":3,"from":"e80","to":"e80","service":"1982","confidence":"high","desc":"The game's `cruiser_p`. The distinctive angled missile tubes along both sides give it an enormous radar cross section from topside clutter, which the game's ship RCS table already reflects.","turret":true,"tturn":1,"sonar":5,"radar":11.8,"ciws":0.41,"rcs":1.7},
  pact_e80_sub: {"fac":"pact","role":"sub","cat":"naval","layer":"sub","name":"Project 877 Kilo","full":"Project 877 Paltus / Kilo-class attack submarine","cost":1645,"oil":27,"time":25,"hp":930,"armor":"light","speed":1.71,"turn":1.1,"sight":6.7,"r":17,"mass":0,"weapons":["w_e80_pact_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e80","to":"e80","service":"1982","confidence":"medium","desc":"Ancestor of the game's `sub_p`. Anechoic-tiled diesel-electric boat, extremely quiet on batteries — NATO's 'black hole' nickname is genuine. Cheap enough to export widely. Its limits are the limits of any diesel boat: low submerged endurance and slow transit.","sonar":6,"quiet":0.3},
  pact_e80_aswhelo: {"fac":"pact","role":"aswhelo","cat":"aircraft","layer":"air","name":"Ka-27PL Helix","full":"Kamov Ka-27PL","cost":875,"oil":19,"time":13,"hp":285,"armor":"air","speed":2.95,"turn":2.2,"sight":5.7,"r":12,"mass":0,"weapons":["w_e80_pact_aswhelo"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1982","confidence":"medium","desc":"The game's `asw_helo_p`. Coaxial rotors, no tail rotor, and a compact enough footprint to fit small Soviet flight decks. Still the only Russian shipborne ASW helicopter in the 2020s because no replacement was ever funded.","ammo":2,"sonar":5.2,"radius":19,"rcs":0.85},
  pact_e80_awacs: {"fac":"pact","role":"awacs","cat":"aircraft","layer":"air","name":"A-50 Mainstay","full":"Beriev A-50 Mainstay","cost":2335,"oil":53,"time":30,"hp":475,"armor":"air","speed":3.7,"turn":0.8,"sight":10.9,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e80","to":"e80","service":"1985","confidence":"medium","desc":"Ancestor of the game's `awacs_p`. Il-76 airframe with a real look-down capability, unlike the Tu-126. Still weak against ground clutter and, critically, the datalink to fighters was limited enough that in practice controllers passed vectors by voice radio.","jet":true,"ammo":0,"radar":20.2,"radius":58,"rcs":3.6},
  pact_e80_sead: {"fac":"pact","role":"sead","cat":"aircraft","layer":"air","name":"MiG-25BM","full":"MiG-25BM Foxbat-F","cost":1350,"oil":26,"time":22,"hp":395,"armor":"air","speed":7.03,"turn":1.6,"sight":8.4,"r":16,"mass":0,"weapons":["w_e80_pact_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e80","to":"e80","service":"1988","confidence":"medium","desc":"Dedicated defence-suppression Foxbat using speed and altitude to launch from outside the SAM envelope. Around forty built. The Su-24M with Kh-58 covers the same mission in larger numbers.","jet":true,"ammo":2,"radius":31,"rcs":1.1},
  pact_e80_stealthbomber: {"fac":"pact","role":"heavybomber","cat":"aircraft","layer":"air","name":"Tu-160 Blackjack","full":"Tupolev Tu-160","cost":2775,"oil":69,"time":45,"hp":910,"armor":"air","speed":9.31,"turn":0.85,"sight":8.8,"r":24,"mass":0,"weapons":["w_e80_pact_stealthbomber"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e00","service":"1987","confidence":"high","desc":"Ancestor of the game's `sbomber_p`. The heaviest and fastest combat aircraft ever built — 275 tonnes, Mach 2, variable geometry. Not stealthy in any respect; its survivability argument is speed and standoff cruise missiles. The game's description of exactly this tradeoff is historically correct.","jet":true,"ammo":4,"radius":88,"rcs":2.5},
  pact_e80_stealthfighter: {"fac":"pact","role":"stealthfighter","cat":"aircraft","layer":"air","name":"none","full":"No Soviet low-observable aircraft existed","cost":1790,"oil":34,"time":29,"hp":475,"armor":"air","speed":8.93,"turn":2.7,"sight":9.7,"r":16,"mass":0,"weapons":["w_e80_pact_stealthfighter"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"—","confidence":"high","desc":"State this plainly: the USSR never fielded a stealth aircraft. Soviet institutes produced the diffraction theory (Ufimtsev) that Lockheed used for Have Blue, but no Soviet stealth programme reached service in this era or the next two.","jet":true,"ammo":4,"radar":6.7,"radius":45,"rcs":0.6},
  pact_e90_rifle: {"fac":"pact","role":"rifle","cat":"infantry","layer":"ground","name":"Motor Rifle Squad","full":"Motor Rifle Squad, AK-74M","cost":115,"oil":0,"time":4,"hp":110,"armor":"infantry","speed":1.03,"turn":7,"sight":5.2,"r":6,"mass":0.1,"weapons":["w_e90_pact_rifle"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"The game's `rifle_p` exactly. Polymer furniture, side rail for optics, one rifle for all roles replacing the earlier variant spread. Adopted the year the USSR ended and still the standard rifle thirty years later."},
  pact_e90_at: {"fac":"pact","role":"at","cat":"infantry","layer":"ground","name":"Kornet Team","full":"AT Team, 9M133 Kornet","cost":320,"oil":0,"time":8,"hp":100,"armor":"infantry","speed":0.86,"turn":6,"sight":6.4,"r":6,"mass":0.1,"weapons":["w_e90_pact_at"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1998","confidence":"high","desc":"The game's `at_p`. Beam-riding rather than wire-guided, so no wire to break and better jam resistance — but the gunner must hold the beam on target for the whole flight. No fire-and-forget, unlike Javelin. 9K115-2 Metis-M (1992) is the lighter companion."},
  pact_e90_mbt: {"fac":"pact","role":"mbt","cat":"vehicle","layer":"ground","name":"T-90","full":"T-90 (Object 188) Main Battle Tank","cost":1205,"oil":17,"time":19,"hp":1620,"armor":"heavy","speed":1.57,"turn":1.6,"sight":6.8,"r":15,"mass":47,"weapons":["w_e90_pact_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1992","confidence":"medium","desc":"Originally designated T-72BU and renamed for political and export reasons. Genuinely improved, but only around 120 were delivered to the Russian Army through the entire decade because there was no budget. T-80U remains the premium tank on paper and increasingly a museum piece in practice.","turret":true,"tturn":1.3,"crush":true},
  pact_e90_lighttank: {"fac":"pact","role":"lighttank","cat":"vehicle","layer":"ground","name":"BMD-3","full":"BMD-3 Airborne Combat Vehicle","cost":620,"oil":8,"time":11,"hp":660,"armor":"light","speed":1.96,"turn":2.4,"sight":6.6,"r":13,"mass":18,"weapons":["w_e90_pact_lighttank"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1990","confidence":"medium","desc":"Only around 130 built before funding stopped. PT-76 is withdrawn from Russian units during this decade. Russia effectively has no light tank in the 1990s — the role is a hole until the Sprut-SD in 2005.","turret":true,"tturn":1.6},
  pact_e90_ifv: {"fac":"pact","role":"ifv","cat":"vehicle","layer":"ground","name":"BMP-3","full":"BMP-3 IFV","cost":810,"oil":10,"time":13,"hp":800,"armor":"light","speed":1.78,"turn":2,"sight":6.4,"r":14,"mass":19,"weapons":["w_e90_pact_ifv"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1987","confidence":"medium","desc":"Production continues almost entirely for export — the UAE order kept the line alive. Russian Army deliveries in the 1990s are minimal. BTR-80A (1994) adds a 30mm turret to the wheeled carrier and is the more common new vehicle.","turret":true,"tturn":1.8,"cargo":6},
  pact_e90_spg: {"fac":"pact","role":"spg","cat":"vehicle","layer":"ground","name":"2S19 Msta-S","full":"2S19 Msta-S 152mm SPH","cost":1245,"oil":17,"time":20,"hp":730,"armor":"light","speed":1.32,"turn":1.5,"sight":5.1,"r":15,"mass":42,"weapons":["w_e90_pact_spg"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1989","confidence":"high","desc":"Unchanged, and barely produced. Artillery remains the strongest arm of the Russian ground force through this decade precisely because it needs no new technology to be effective.","turret":true,"tturn":0.9},
  pact_e90_mlrs: {"fac":"pact","role":"mlrs","cat":"vehicle","layer":"ground","name":"BM-30 Smerch","full":"9A52 Smerch 300mm MRL","cost":1805,"oil":28,"time":27,"hp":640,"armor":"light","speed":1.27,"turn":1.3,"sight":5.1,"r":15,"mass":44,"weapons":["w_e90_pact_mlrs","scat_ptm3"],"dispenser":6,"prereq":["factory","lab"],"tech":3,"from":"e90","to":"e90","service":"1987","confidence":"high","desc":"Unchanged. BM-21 Grad, thirty years old by now, remains the numerically dominant rocket system.","turret":true,"tturn":0.8},
  pact_e90_spaag: {"fac":"pact","role":"spaag","cat":"vehicle","layer":"ground","name":"2S6M Tunguska-M","full":"2S6M Tunguska-M","cost":905,"oil":13,"time":14,"hp":755,"armor":"light","speed":1.57,"turn":1.9,"sight":8.7,"r":14,"mass":34,"weapons":["w_e90_pact_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1990","confidence":"medium","desc":"The variant designation the game already uses for `spaag_p`. Improved missile and a datalink to a battery command post. No further Russian SPAAG until Pantsir-S1 a full twenty years later.","turret":true,"tturn":2.6,"radar":7.4},
  pact_e90_aa: {"fac":"pact","role":"aa","cat":"infantry","layer":"ground","name":"Igla Team","full":"MANPADS Team, 9K38 Igla","cost":280,"oil":0,"time":7,"hp":95,"armor":"infantry","speed":0.88,"turn":6,"sight":7.2,"r":6,"mass":0.1,"weapons":["w_e90_pact_aa"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1983","confidence":"high","desc":"Unchanged at squad level. The layer above gets one real improvement: Tor-M1 (1991) and S-300PMU-1 (1993), both largely funded by export sales to China and India rather than by the Russian budget."},
  pact_e90_recon: {"fac":"pact","role":"recon","cat":"vehicle","layer":"ground","name":"BRDM-2","full":"BRDM-2 Scout Car","cost":300,"oil":4,"time":6,"hp":355,"armor":"light","speed":2.65,"turn":3,"sight":8.3,"r":11,"mass":7,"weapons":["w_e90_pact_recon"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1962","confidence":"high","desc":"Thirty years old and still the standard scout car. No replacement programme survives the decade.","turret":true,"tturn":2.2},
  pact_e90_fighter: {"fac":"pact","role":"fighter","cat":"aircraft","layer":"air","name":"MiG-29S","full":"MiG-29S Fulcrum-C","cost":1160,"oil":25,"time":18,"hp":415,"armor":"air","speed":8.7,"turn":2,"sight":9.7,"r":15,"mass":0,"weapons":["w_e90_pact_fighter"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1991","confidence":"medium","desc":"The game's `fighter_p` exactly. Be candid: no genuinely new fighter entered Russian service in the 1990s. Su-35 (the first, 1990s version) and Su-37 stayed prototypes; the air force flew what it had, and flight hours collapsed to a level where pilot proficiency itself became a capability gap.","jet":true,"ammo":3,"radar":3.7,"radius":27,"rcs":0.85},
  pact_e90_cas: {"fac":"pact","role":"cas","cat":"aircraft","layer":"air","name":"Su-25 Frogfoot","full":"Sukhoi Su-25 Frogfoot","cost":1635,"oil":33,"time":25,"hp":710,"armor":"air","speed":5.68,"turn":1.5,"sight":7.8,"r":17,"mass":0,"weapons":["w_e90_pact_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1981","confidence":"high","desc":"Unchanged and heavily used in Chechnya. Su-25T / Su-39, the version with a real targeting system, was built in single figures.","jet":true,"ammo":5,"radius":28,"rcs":1.5},
  pact_e90_gunship: {"fac":"pact","role":"gunship","cat":"aircraft","layer":"air","name":"Ka-50 Black Shark","full":"Kamov Ka-50","cost":1335,"oil":22,"time":20,"hp":605,"armor":"air","speed":3.43,"turn":2.2,"sight":8.3,"r":16,"mass":0,"weapons":["w_e90_pact_gunship"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1995","confidence":"medium","desc":"Single-seat coaxial attack helicopter with an ejection seat — no other production helicopter has one. Formally adopted in 1995, but roughly a dozen were built and the single-crew workload concept was judged a failure, which is why the two-seat Ka-52 replaced it. Mi-24 remains the actual gunship in service.","ammo":7,"hover":true,"radius":22,"rcs":0.85},
  pact_e90_transport: {"fac":"pact","role":"transport","cat":"aircraft","layer":"air","name":"Mi-8 Hip","full":"Mil Mi-8MT / Mi-17","cost":620,"oil":9,"time":12,"hp":500,"armor":"air","speed":3.85,"turn":2.4,"sight":7.4,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1977","confidence":"high","desc":"Unchanged - the same Mi-8MT of 1977, at the same price and the same fuel bill. Mi-26 continues in the heavy-lift role.","ammo":0,"hover":true,"cargo":10,"radius":30,"rcs":1.1},
  pact_e90_corvette: {"fac":"pact","role":"corvette","cat":"naval","layer":"sea","name":"Project 1124 Grisha","full":"Project 1124 Grisha-class small ASW ship","cost":905,"oil":14,"time":14,"hp":960,"armor":"light","speed":2.65,"turn":1.7,"sight":6.8,"r":17,"mass":0,"weapons":["w_e90_pact_corvette","asw_rbu","ciws_ak630"],"prereq":["navalyard"],"tech":1,"from":"e90","to":"e90","service":"1970","confidence":"high","desc":"No new Russian corvette class enters service in the 1990s at all. Project 20380 Steregushchiy is not laid down until 2001. The light forces simply age.","turret":true,"tturn":2,"sonar":4.2,"ciws":0.32,"rcs":0.7},
  pact_e90_destroyer: {"fac":"pact","role":"destroyer","cat":"naval","layer":"sea","name":"Project 956 Sovremenny","full":"Project 956 Sovremenny-class destroyer","cost":1720,"oil":28,"time":25,"hp":1825,"armor":"heavy","speed":2.21,"turn":1.2,"sight":7.7,"r":20,"mass":0,"weapons":["w_e90_pact_destroyer","sam_uragan"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1980","confidence":"high","desc":"The last Russian hull commissioned in 1994; two more were completed for China. This is the last destroyer-sized surface combatant Russia has commissioned to this day — the type is never replaced in any subsequent era, a real and permanent gap.","turret":true,"tturn":1.4,"sonar":5.9,"radar":10.1,"ciws":0.39,"rcs":1.3},
  pact_e90_cruiser: {"fac":"pact","role":"cruiser","cat":"naval","layer":"sea","name":"Pyotr Velikiy","full":"Project 11442 Pyotr Velikiy (Kirov-class)","cost":2665,"oil":50,"time":39,"hp":2580,"armor":"heavy","speed":1.86,"turn":0.9,"sight":8.3,"r":23,"mass":0,"weapons":["w_e90_pact_cruiser","sam_fortm","sam_kinzhal"],"prereq":["navalyard","lab"],"tech":3,"from":"e90","to":"e90","service":"1998","confidence":"high","desc":"Fourth and final Kirov, laid down in 1986 and finished twelve years later only because the hull was too far advanced to scrap. Slava-class cruisers continue in service alongside.","turret":true,"tturn":1,"sonar":5.5,"radar":12.9,"ciws":0.43,"rcs":1.95},
  pact_e90_sub: {"fac":"pact","role":"sub","cat":"naval","layer":"sub","name":"Project 636 Kilo","full":"Project 636 Improved Kilo-class","cost":1935,"oil":32,"time":26,"hp":1050,"armor":"light","speed":1.76,"turn":1.1,"sight":7.4,"r":17,"mass":0,"weapons":["w_e90_pact_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1997","confidence":"medium","desc":"The game's `sub_p` designation. Quieter machinery and improved combat system over Project 877. Important caveat: Project 636 boats in the 1990s were export builds — the Russian Navy's own Project 636.3 boats do not commission until 2014. Project 971U Akula-II (Vepr, 1996) is the one genuinely modern nuclear boat of the","sonar":6.6,"quiet":0.27},
  pact_e90_carrier: {"fac":"pact","role":"carrier","cat":"naval","layer":"sea","name":"Admiral Kuznetsov","full":"Project 1143.5 Admiral Kuznetsov","cost":3955,"oil":90,"time":55,"hp":3650,"armor":"heavy","speed":1.47,"turn":0.6,"sight":10.6,"r":30,"mass":0,"weapons":["w_e90_pact_carrier","sam_kinzhal"],"prereq":["navalyard","lab","airbase"],"tech":3,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"The game's `carrier_p`. Ski-jump, no catapults, and a heavy anti-ship missile battery under the deck that eats hangar volume — a hybrid 'heavy aviation cruiser' rather than a carrier, partly so it could legally transit the Turkish Straits. Chronically unreliable boilers from the start.","carrier":3,"sonar":3.7,"radar":12,"ciws":0.41,"rcs":2.9},
  pact_e90_sead: {"fac":"pact","role":"sead","cat":"aircraft","layer":"air","name":"Su-24M SEAD","full":"Sukhoi Su-24M carrying Kh-31P","cost":1590,"oil":31,"time":24,"hp":445,"armor":"air","speed":7.25,"turn":1.6,"sight":9.2,"r":16,"mass":0,"weapons":["w_e90_pact_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e90","to":"e90","service":"1991","confidence":"medium","desc":"The game's `sead_p`. The Kh-31P is fast enough (around Mach 3) that a SAM crew has very little warning — the US bought derivatives as supersonic target drones because nothing Western matched the profile. Fewer shots and shorter range than an F-16CJ with HARM.","jet":true,"ammo":3,"radius":32,"rcs":1.1},
  pact_e90_awacs: {"fac":"pact","role":"awacs","cat":"aircraft","layer":"air","name":"A-50 Mainstay","full":"Beriev A-50 Mainstay","cost":2750,"oil":62,"time":32,"hp":535,"armor":"air","speed":3.82,"turn":0.8,"sight":12,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e90","to":"e90","service":"1985","confidence":"high","desc":"Unchanged, and the fleet shrinks steadily through the decade as airframes go unserviced.","jet":true,"ammo":0,"radar":22.1,"radius":59,"rcs":3.6},
  pact_e90_stealthfighter: {"fac":"pact","role":"stealthfighter","cat":"aircraft","layer":"air","name":"none","full":"MiG 1.44 and Su-47 were prototypes only","cost":2105,"oil":40,"time":30,"hp":535,"armor":"air","speed":9.21,"turn":2.7,"sight":10.6,"r":16,"mass":0,"weapons":["w_e90_pact_stealthfighter"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"—","confidence":"high","desc":"Neither aircraft entered service or came close. MiG 1.44 flew twice in 2000 and the programme died; Su-47 Berkut was a forward-swept-wing technology demonstrator, one airframe. Any roster that gives 1990s Russia a stealth aircraft is inventing it.","jet":true,"ammo":4,"radar":7.4,"radius":45,"rcs":0.13},
  pact_e00_rifle: {"fac":"pact","role":"rifle","cat":"infantry","layer":"ground","name":"Motor Rifle Squad","full":"Motor Rifle Squad, AK-74M","cost":130,"oil":0,"time":4,"hp":120,"armor":"infantry","speed":1.04,"turn":7,"sight":5.4,"r":6,"mass":0.1,"weapons":["w_e00_pact_rifle"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"1991","confidence":"high","desc":"AK-74M remains standard; AK-12 (2018) begins replacing it slowly. The bigger change is body armour, optics and radios reaching the squad — Ratnik from 2015 — which is where most of the actual improvement lives."},
  pact_e00_at: {"fac":"pact","role":"at","cat":"infantry","layer":"ground","name":"Kornet Team","full":"AT Team, 9M133 Kornet / Kornet-EM","cost":350,"oil":0,"time":8,"hp":105,"armor":"infantry","speed":0.87,"turn":6,"sight":6.8,"r":6,"mass":0.1,"weapons":["w_e00_pact_at"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"1998","confidence":"high","desc":"Kornet-EM (2012) extends range and adds an automatic tracker that removes most of the gunner's beam-holding burden. Still not fire-and-forget."},
  pact_e00_mbt: {"fac":"pact","role":"mbt","cat":"vehicle","layer":"ground","name":"T-90A","full":"T-90A Main Battle Tank","cost":1330,"oil":19,"time":20,"hp":1745,"armor":"heavy","speed":1.58,"turn":1.6,"sight":7.2,"r":15,"mass":47,"weapons":["w_e00_pact_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2004","confidence":"high","desc":"The game's `mbt_p`. Welded turret replacing the cast one, and the first Russian tank with a genuinely usable thermal — and even then it is a French Catherine-FC module built under licence, which tells you exactly where the gap was. Production ended around 2011 in favour of the cheaper T-72B3.","turret":true,"tturn":1.3,"crush":true},
  pact_e00_lighttank: {"fac":"pact","role":"lighttank","cat":"vehicle","layer":"ground","name":"Sprut-SD","full":"2S25 Sprut-SD","cost":685,"oil":9,"time":11,"hp":710,"armor":"light","speed":1.98,"turn":2.4,"sight":7,"r":13,"mass":18,"weapons":["w_e00_pact_lighttank"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2005","confidence":"medium","desc":"The game's `lt_p`. A full 125mm gun on an 18-tonne air-droppable amphibious hull — it can be parachuted from an Il-76 and it can swim. Armour stops rifle fire and nothing more. Fewer than 40 built; adoption year is given as 2005 or 2006 depending on source.","turret":true,"tturn":1.6},
  pact_e00_ifv: {"fac":"pact","role":"ifv","cat":"vehicle","layer":"ground","name":"BMP-3","full":"BMP-3 IFV","cost":810,"oil":10,"time":13,"hp":800,"armor":"light","speed":1.78,"turn":2,"sight":6.8,"r":14,"mass":19,"weapons":["w_e00_pact_ifv"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"1987","confidence":"high","desc":"The game's `ifv_p`, with Russian Army deliveries finally resuming in quantity from around 2005. BTR-82A (2013) and BMD-4M (2016) fill out the wheeled and airborne slots.","turret":true,"tturn":1.8,"cargo":6},
  pact_e00_spg: {"fac":"pact","role":"spg","cat":"vehicle","layer":"ground","name":"2S19 Msta-S","full":"2S19M2 Msta-S 152mm SPH","cost":1380,"oil":19,"time":21,"hp":785,"armor":"light","speed":1.34,"turn":1.5,"sight":5.3,"r":15,"mass":42,"weapons":["w_e00_pact_spg"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"1989","confidence":"high","desc":"The game's `spg_p`. The M2 update (2013) cuts the time from halt to first round substantially. 2S35 Koalitsiya-SV, the intended replacement, remains in very limited service.","turret":true,"tturn":0.9},
  pact_e00_mlrs: {"fac":"pact","role":"mlrs","cat":"vehicle","layer":"ground","name":"BM-30 Smerch","full":"9A52 Smerch / 9A53 Tornado-S","cost":1995,"oil":30,"time":28,"hp":690,"armor":"light","speed":1.29,"turn":1.3,"sight":5.3,"r":15,"mass":44,"weapons":["w_e00_pact_mlrs","scat_ptm3"],"dispenser":6,"prereq":["factory","lab"],"tech":3,"from":"e00","to":"e00","service":"1987","confidence":"high","desc":"The game's `mlrs_p`, joined by Tornado-G (2013, guided 122mm) and TOS-1A Solntsepyok (2001) — a 24-tube thermobaric launcher on a T-72 chassis with only about 6km of range, so it must be brought right up behind the assault, and its effect on troops in buildings and trenches is extreme.","turret":true,"tturn":0.8},
  pact_e00_spaag: {"fac":"pact","role":"spaag","cat":"vehicle","layer":"ground","name":"Pantsir-S1","full":"96K6 Pantsir-S1","cost":1000,"oil":14,"time":15,"hp":815,"armor":"light","speed":1.58,"turn":1.9,"sight":9.2,"r":14,"mass":34,"weapons":["w_e00_pact_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2012","confidence":"medium","desc":"The intended Tunguska successor and the point-defence layer under S-400. Its record against small drones has been mixed in practice — good against aircraft, inconsistent against slow low-signature targets.","turret":true,"tturn":2.6,"radar":7.8},
  pact_e00_aa: {"fac":"pact","role":"aa","cat":"infantry","layer":"ground","name":"Igla-S Team","full":"MANPADS Team, 9K338 Igla-S","cost":310,"oil":0,"time":7,"hp":100,"armor":"infantry","speed":0.89,"turn":6,"sight":7.6,"r":6,"mass":0.1,"weapons":["w_e00_pact_aa"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2004","confidence":"medium","desc":"The game's `aa_p`. Heavier warhead, better seeker discrimination, and enough sensitivity to engage cruise missiles and UAVs. Verba (9K333, 2015) is the newer three-band-seeker weapon above it. S-400 (2007) is the strategic layer."},
  pact_e00_recon: {"fac":"pact","role":"recon","cat":"vehicle","layer":"ground","name":"BRDM-2","full":"BRDM-2 Scout Car","cost":300,"oil":4,"time":6,"hp":355,"armor":"light","speed":2.65,"turn":3,"sight":8.7,"r":11,"mass":7,"weapons":["w_e00_pact_recon"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"1962","confidence":"high","desc":"Still the game's `recon_p` and still in service — a sixty-year-old design. GAZ-2330 Tigr (2006) is the modern protected patrol vehicle that does much of the practical scouting, but it is not an armoured car in the BRDM sense.","turret":true,"tturn":2.2},
  pact_e00_radarv: {"fac":"pact","role":"radarv","cat":"vehicle","layer":"ground","name":"Zoopark-1","full":"1L219 Zoopark-1","cost":1095,"oil":11,"time":15,"hp":540,"armor":"light","speed":1.63,"turn":1.8,"sight":8.7,"r":14,"mass":15,"weapons":[],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"1993","confidence":"medium","desc":"The game's `radarv_p`. Backtracks incoming shells to their firing point. Real capability, and the counter-battery duel is one thing the Russian artillery arm is organised around.","turret":true,"tturn":0.9,"radar":14.1},
  pact_e00_fighter: {"fac":"pact","role":"fighter","cat":"aircraft","layer":"air","name":"Su-35S","full":"Sukhoi Su-35S Flanker-E","cost":1900,"oil":41,"time":28,"hp":560,"armor":"air","speed":9.0,"turn":2,"sight":10.2,"r":15,"mass":0,"weapons":["w_e00_pact_fighter"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2014","confidence":"medium","desc":"The most capable Russian fighter actually in squadron service. Genuine detection range, thrust-vectoring nozzles, and no stealth whatsoever. Su-30SM (2012) is the twin-seat multirole workhorse and MiG-29SMT (2009) the modernised light fighter.","jet":true,"ammo":4,"radar":3.9,"radius":46,"rcs":0.85},
  pact_e00_cas: {"fac":"pact","role":"cas","cat":"aircraft","layer":"air","name":"Su-25SM","full":"Sukhoi Su-25SM","cost":1805,"oil":36,"time":26,"hp":770,"armor":"air","speed":5.74,"turn":1.5,"sight":8.2,"r":17,"mass":0,"weapons":["w_e00_pact_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"2006","confidence":"medium","desc":"Ancestor of the game's `bomber_p` (which is the SM3 standard). Adds a real navigation-attack system, HUD and precision weapon capability to a 1981 airframe. Su-34 (2014) is the new-build strike aircraft that takes over deeper interdiction.","jet":true,"ammo":6,"radius":28,"rcs":1.5},
  pact_e00_gunship: {"fac":"pact","role":"gunship","cat":"aircraft","layer":"air","name":"Mi-28N Night Hunter","full":"Mil Mi-28N","cost":1475,"oil":24,"time":21,"hp":655,"armor":"air","speed":3.47,"turn":2.2,"sight":8.7,"r":16,"mass":0,"weapons":["w_e00_pact_gunship"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2009","confidence":"medium","desc":"The game's `helo_p`. Heavily armoured two-seat gunship. Twenty-seven years from first flight (1982) to service, and the 'Night Hunter' name outran the reality for years — the night targeting system was the part that lagged. Formal state adoption is sometimes dated 2013 rather than 2009.","ammo":8,"hover":true,"radius":22,"rcs":0.85},
  pact_e00_transport: {"fac":"pact","role":"transport","cat":"aircraft","layer":"air","name":"Mi-8AMTSh","full":"Mil Mi-8AMTSh Terminator","cost":810,"oil":12,"time":13,"hp":555,"armor":"air","speed":3.96,"turn":2.4,"sight":7.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2009","confidence":"medium","desc":"The game's `trans_p`. Armed and armoured assault variant of a 1967 airframe. Fifty-plus years of continuous production on the same basic design.","ammo":0,"hover":true,"cargo":10,"radius":30,"rcs":1.1},
  pact_e00_corvette: {"fac":"pact","role":"corvette","cat":"naval","layer":"sea","name":"Project 20380 Steregushchiy","full":"Project 20380 Steregushchiy-class corvette","cost":1000,"oil":15,"time":15,"hp":1035,"armor":"light","speed":2.67,"turn":1.7,"sight":7.2,"r":17,"mass":0,"weapons":["w_e00_pact_corvette","ciws_ak630"],"prereq":["navalyard"],"tech":1,"from":"e00","to":"e00","service":"2008","confidence":"high","desc":"The first genuinely post-Soviet Russian surface warship: composite superstructure, some signature shaping, and a helicopter hangar. Slow to build but competent. This is where Russian naval construction actually works.","turret":true,"tturn":2,"sonar":4.5,"ciws":0.33,"rcs":0.5},
  pact_e00_missileboat: {"fac":"pact","role":"missileboat","cat":"naval","layer":"sea","name":"Project 21631 Buyan-M","full":"Project 21631 Buyan-M corvette","cost":1380,"oil":20,"time":18,"hp":910,"armor":"light","speed":3.07,"turn":1.8,"sight":8.2,"r":16,"mass":0,"weapons":["w_e00_pact_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2014","confidence":"high","desc":"A 950-tonne river-and-coastal ship with eight cruise missile cells. Its 2015 Kalibr strikes from the Caspian into Syria were a deliberate demonstration that Russia could hold targets at risk from small hulls in inland waters. Project 21630 Buyan (2006) is the gun-only original — the game's `boat_p`.","sonar":0,"rcs":0.62},
  pact_e00_destroyer: {"fac":"pact","role":"destroyer","cat":"naval","layer":"sea","name":"none new","full":"No new Russian destroyer class since 1994","cost":1900,"oil":31,"time":26,"hp":1970,"armor":"heavy","speed":2.23,"turn":1.2,"sight":8.1,"r":20,"mass":0,"weapons":["w_e00_pact_destroyer"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"—","confidence":"high","desc":"State this plainly. The frigate programmes — Project 11356R Admiral Grigorovich (2016) and Project 22350 Admiral Gorshkov (2018) — are the real modern surface combatants, and Gorshkov is a good ship. But the Lider destroyer programme was never funded and the Sovremenny and Udaloy hulls are what remain. The game's `dest","turret":true,"tturn":1.4,"sonar":6.2,"radar":10.7,"ciws":0.41,"rcs":1.3},
  pact_e00_sub: {"fac":"pact","role":"sub","cat":"naval","layer":"sub","name":"Project 636.3 Improved Kilo","full":"Project 636.3 Varshavyanka","cost":2140,"oil":35,"time":27,"hp":1135,"armor":"light","speed":1.78,"turn":1.1,"sight":7.8,"r":17,"mass":0,"weapons":["w_e00_pact_sub"],"prereq":["navalyard","radar"],"tech":2,"from":"e00","to":"e00","service":"2014","confidence":"medium","desc":"The game's `sub_p`. Very quiet, cheap by submarine standards, and built quickly — six for the Black Sea Fleet in four years. Project 885 Yasen (Severodvinsk, 2013) is the modern nuclear boat: twenty years on the slipway, and by Western accounts genuinely quiet.","sonar":7,"quiet":0.25},
  pact_e00_cruiser: {"fac":"pact","role":"cruiser","cat":"naval","layer":"sea","name":"Project 1164 Slava","full":"Project 1164 Atlant / Slava-class","cost":2945,"oil":55,"time":40,"hp":2785,"armor":"heavy","speed":1.88,"turn":0.9,"sight":8.7,"r":23,"mass":0,"weapons":["w_e00_pact_cruiser","sam_fort"],"prereq":["navalyard","lab"],"tech":3,"from":"e00","to":"e00","service":"1982","confidence":"high","desc":"Unchanged apart from partial refits. Pyotr Velikiy likewise; Admiral Nakhimov entered a modernisation in 1999 that is still not complete.","turret":true,"tturn":1,"sonar":5.8,"radar":13.6,"ciws":0.45,"rcs":1.7},
  pact_e00_carrier: {"fac":"pact","role":"carrier","cat":"naval","layer":"sea","name":"Admiral Kuznetsov","full":"Project 1143.5 Admiral Kuznetsov","cost":4370,"oil":100,"time":57,"hp":3935,"armor":"heavy","speed":1.49,"turn":0.6,"sight":11.2,"r":30,"mass":0,"weapons":["w_e00_pact_carrier","sam_kinzhal"],"prereq":["navalyard","lab","airbase"],"tech":3,"from":"e00","to":"e00","service":"1991","confidence":"high","desc":"Deployed to Syria in 2016 — the only combat deployment. Two aircraft, a MiG-29K and a Su-33, were lost to arresting-gear failures, after which the air group operated from a land base. MiG-29K (2013) supplements the Su-33 on the deck.","carrier":3,"sonar":3.9,"radar":12.6,"ciws":0.43,"rcs":2.9},
  pact_e00_awacs: {"fac":"pact","role":"awacs","cat":"aircraft","layer":"air","name":"A-50U Mainstay","full":"Beriev A-50U","cost":3040,"oil":68,"time":33,"hp":575,"armor":"air","speed":3.86,"turn":0.8,"sight":12.6,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"2011","confidence":"high","desc":"The game's `awacs_p`. Digital processing replacing the analogue set, better crew stations, longer endurance. Fewer than ten converted. A-100 Premier, the AESA successor, has been in development since 2004 and is not in service.","jet":true,"ammo":0,"radar":23.3,"radius":60,"rcs":3.6},
  pact_e00_sead: {"fac":"pact","role":"sead","cat":"aircraft","layer":"air","name":"Su-24M SEAD","full":"Sukhoi Su-24M (Kh-31P)","cost":1760,"oil":34,"time":25,"hp":480,"armor":"air","speed":7.33,"turn":1.6,"sight":9.7,"r":16,"mass":0,"weapons":["w_e00_pact_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e00","to":"e00","service":"1991","confidence":"medium","desc":"Still the game's `sead_p`. The Su-34 progressively takes over the mission with the same missile family from the mid-2010s.","jet":true,"ammo":3,"radius":32,"rcs":1.1},
  pact_e00_stealthfighter: {"fac":"pact","role":"stealthfighter","cat":"aircraft","layer":"air","name":"none in service","full":"Su-57 flying but not yet delivered","cost":2330,"oil":44,"time":31,"hp":575,"armor":"air","speed":9.31,"turn":2.7,"sight":11.2,"r":16,"mass":0,"weapons":["w_e00_pact_stealthfighter"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"—","confidence":"high","desc":"The T-50 prototype first flew in January 2010 and the type was widely publicised, but no serial aircraft reached a Russian regiment in this era — the first production airframe crashed in December 2019 before delivery. Do not field a Su-57 before 2020.","jet":true,"ammo":5,"radar":7.8,"radius":46,"rcs":0.6},
});

/* ===================== BUNDESWEHR — era weapons, e50 to e00 =====================
   The ids follow the w_<era>_<fac>_<role> pattern, which means the era-range
   normaliser at the foot of generations.js rewrites `range` for the at,
   tankdestroyer, gunship, aa, spaag, mlrs and spg roles to a per-era constant
   shared by every army. That is deliberate and correct: those are the roles
   where the period, not the nation, sets the reach. The two German guns whose
   reach IS the point of them — the PzH 2000 L/52 and the Jaguar's HOT — are
   named outside the pattern in rules.js so they survive that pass.        */
Object.assign(WEAPONS, {
 "w_e50_deu_rifle": {"name":"7,62mm Gewehr G1 (FN FAL)","dmg":5,"warhead":"bullet","range":3.8,"reload":1.45,"burst":3,"burstDelay":0.07,"acc":0.54,"proj":"bullet","speed":0,"suppress":5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_deu_at": {"name":"3,5-Zoll Panzerabwehrrohr (M20 super bazooka)","dmg":54,"warhead":"heat","range":5.2,"minRange":0.9,"reload":6.8,"burst":1,"acc":0.60,"proj":"missile","speed":330,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e50_deu_aa": {"name":"4 cm Flak L/70 Bofors, towed","dmg":44,"warhead":"flak","range":5.6,"reload":5.9,"burst":1,"acc":0.56,"proj":"missile","speed":520,"aoe":0.6,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":1},
 "w_e50_deu_recon": {"name":"20 mm HS 820 in the SPz 11-2 turret","dmg":6,"warhead":"bullet","range":4.1,"reload":2.0,"burst":6,"burstDelay":0.07,"acc":0.50,"proj":"bullet","speed":0,"suppress":9,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_deu_ifv": {"name":"20 mm HS 820 in the SPz 12-3 lang turret","dmg":11,"warhead":"bullet","range":4.9,"reload":2.7,"burst":5,"burstDelay":0.1,"acc":0.52,"proj":"shell","speed":620,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_deu_lighttank": {"name":"76 mm M32 gun (M41 Walker Bulldog)","dmg":26,"warhead":"cannon","range":5.0,"reload":3.9,"burst":1,"acc":0.57,"proj":"shell","speed":700,"aoe":0.5,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_deu_mbt": {"name":"90 mm M36 gun (M47 Patton)","dmg":66,"warhead":"cannon","range":5.9,"reload":5.5,"burst":1,"acc":0.60,"proj":"shell","speed":860,"aoe":0.9,"suppress":24,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_deu_spg": {"name":"155 mm M45 howitzer (M44)","dmg":63,"warhead":"frag","range":11.5,"minRange":3.0,"reload":10.9,"burst":1,"acc":0.24,"proj":"arc","speed":210,"aoe":2.6,"suppress":60,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_deu_spaag": {"name":"twin 40 mm Bofors (Flakpanzer M42)","dmg":11,"warhead":"flak","range":5.2,"reload":2.18,"burst":6,"burstDelay":0.07,"acc":0.45,"proj":"shell","speed":900,"aoe":0.5,"tgt":{"ground":1,"air":1,"sea":0,"sub":0}},
 "w_e50_deu_fighter": {"name":"6 x 12,7 mm M3 (Canadair Sabre Mk 6)","dmg":84,"warhead":"flak","range":7.0,"reload":3.84,"burst":1,"acc":0.62,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e50_deu_cas": {"name":"6 x 12,7 mm M3 and HVAR rockets (F-84F)","dmg":137,"warhead":"he","range":1.9,"reload":1.3,"burst":2,"burstDelay":0.35,"acc":0.64,"proj":"bomb","speed":0,"aoe":2.4,"suppress":80,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},

 "w_e60_deu_rifle": {"name":"7,62mm Gewehr G3A3","dmg":6,"warhead":"bullet","range":4.2,"reload":1.35,"burst":3,"burstDelay":0.07,"acc":0.60,"proj":"bullet","speed":0,"suppress":6,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_deu_at": {"name":"Panzerfaust 44 Lanze and Bolkow Cobra 2000","dmg":72,"warhead":"heat","range":5.8,"minRange":0.9,"reload":6.4,"burst":1,"acc":0.66,"proj":"missile","speed":330,"aoe":0.8,"suppress":16,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e60_deu_aa": {"name":"2 cm Zwillingsflak Rh 202, towed","dmg":60,"warhead":"flak","range":6.2,"reload":5.4,"burst":1,"acc":0.62,"proj":"missile","speed":520,"aoe":0.6,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":1},
 "w_e60_deu_recon": {"name":"20 mm Rh 202 in the Luchs turret","dmg":8,"warhead":"bullet","range":4.6,"reload":1.9,"burst":6,"burstDelay":0.07,"acc":0.56,"proj":"bullet","speed":0,"suppress":9,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_deu_ifv": {"name":"20 mm Rh 202 in the Marder turret","dmg":13,"warhead":"bullet","range":5.3,"reload":2.6,"burst":5,"burstDelay":0.1,"acc":0.58,"proj":"shell","speed":620,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_deu_mbt": {"name":"105 mm L7A3 (Leopard 1)","dmg":90,"warhead":"cannon","range":6.6,"reload":5.1,"burst":1,"acc":0.68,"proj":"shell","speed":860,"aoe":0.9,"suppress":24,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_deu_tankdestroyer": {"name":"SS.11 on the Raketenjagdpanzer 2","dmg":78,"warhead":"heat","range":6.4,"minRange":1.0,"reload":6.8,"burst":1,"acc":0.62,"proj":"missile","speed":300,"aoe":0.8,"suppress":16,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e60_deu_spg": {"name":"155 mm M126 (M109G, wedge breech)","dmg":85,"warhead":"frag","range":12.7,"minRange":3.3,"reload":10.0,"burst":1,"acc":0.28,"proj":"arc","speed":210,"aoe":2.6,"suppress":60,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_deu_spaag": {"name":"twin 35 mm Oerlikon KDA (Gepard)","dmg":21,"warhead":"flak","range":6.6,"reload":1.86,"burst":6,"burstDelay":0.07,"acc":0.60,"proj":"shell","speed":900,"aoe":0.5,"tgt":{"ground":1,"air":1,"sea":0,"sub":0}},
 "w_e60_deu_mlrs": {"name":"36 x 110 mm LARS 1 rockets, HE and smoke","dmg":38,"warhead":"frag","range":11.5,"minRange":2.9,"reload":16.8,"burst":12,"burstDelay":0.16,"acc":0.18,"proj":"arc","speed":260,"aoe":2.0,"suppress":40,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_deu_fighter": {"name":"AIM-9B Sidewinder and 20 mm M61 (F-104G)","dmg":110,"warhead":"flak","range":7.8,"reload":3.6,"burst":1,"acc":0.68,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e60_deu_cas": {"name":"2 x 30 mm DEFA 552 and rocket pods (G.91R/3)","dmg":178,"warhead":"he","range":2.1,"reload":1.22,"burst":2,"burstDelay":0.35,"acc":0.72,"proj":"bomb","speed":0,"aoe":2.4,"suppress":80,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},

 "w_e80_deu_at": {"name":"MILAN SACLOS wire-guided ATGM","dmg":98,"warhead":"heat","range":6.6,"minRange":1.1,"reload":5.8,"burst":1,"acc":0.76,"proj":"missile","speed":210,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e80_deu_aa": {"name":"Fliegerfaust 1 (FIM-43 Redeye)","dmg":76,"warhead":"flak","range":6.8,"reload":5.2,"burst":1,"acc":0.66,"proj":"missile","speed":520,"aoe":0.6,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":1},
 "w_e80_deu_ifv": {"name":"20 mm Rh 202 with a MILAN on the roof (Marder 1A2)","dmg":17,"warhead":"bullet","range":5.9,"reload":2.42,"burst":5,"burstDelay":0.1,"acc":0.64,"proj":"shell","speed":620,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_deu_mbt": {"name":"120 mm Rheinmetall Rh-120 L/44 (Leopard 2)","dmg":119,"warhead":"cannon","range":7.3,"reload":4.7,"burst":1,"acc":0.76,"proj":"shell","speed":860,"aoe":0.9,"suppress":24,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_deu_spg": {"name":"155 mm M185 (M109A3G)","dmg":112,"warhead":"frag","range":14.1,"minRange":3.6,"reload":9.4,"burst":1,"acc":0.31,"proj":"arc","speed":210,"aoe":2.6,"suppress":60,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_deu_mlrs": {"name":"36 x 110 mm LARS 2, HE and AT-2 mine rockets","dmg":51,"warhead":"frag","range":12.7,"minRange":3.2,"reload":15.5,"burst":12,"burstDelay":0.16,"acc":0.20,"proj":"arc","speed":260,"aoe":2.0,"suppress":40,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_deu_gunship": {"name":"6 x HOT on the BO 105 PAH-1","dmg":105,"warhead":"heat","range":6.0,"reload":2.7,"burst":1,"acc":0.78,"proj":"missile","speed":400,"aoe":1.0,"ammo":1,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e80_deu_fighter": {"name":"AIM-9L Sidewinder and 20 mm M61 (F-4F)","dmg":146,"warhead":"flak","range":8.6,"reload":3.36,"burst":1,"acc":0.76,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e80_deu_cas": {"name":"2 x 27 mm Mauser BK-27 and BL755 (Alpha Jet A)","dmg":232,"warhead":"he","range":2.3,"reload":1.14,"burst":2,"burstDelay":0.35,"acc":0.79,"proj":"bomb","speed":0,"aoe":2.4,"suppress":80,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},

 "w_e90_deu_rifle": {"name":"5,56mm Gewehr G36","dmg":9,"warhead":"bullet","range":4.8,"reload":1.16,"burst":3,"burstDelay":0.07,"acc":0.68,"proj":"bullet","speed":0,"suppress":5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_deu_at": {"name":"Panzerfaust 3 and MILAN 2","dmg":110,"warhead":"heat","range":6.9,"minRange":1.1,"reload":5.5,"burst":1,"acc":0.79,"proj":"missile","speed":210,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e90_deu_sniper": {"name":"8,6 mm Scharfschuetzengewehr G22","dmg":88,"warhead":"bullet","range":9.2,"reload":3.4,"burst":1,"acc":0.90,"proj":"bullet","speed":0,"suppress":22,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_deu_ifv": {"name":"20 mm Rh 202 (Marder 1A3)","dmg":19,"warhead":"bullet","range":6.1,"reload":2.33,"burst":5,"burstDelay":0.1,"acc":0.67,"proj":"shell","speed":620,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_deu_mbt": {"name":"120 mm Rh-120 L/44 (Leopard 2A5)","dmg":138,"warhead":"cannon","range":7.7,"reload":4.5,"burst":1,"acc":0.80,"proj":"shell","speed":860,"aoe":0.9,"suppress":24,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_deu_mlrs": {"name":"12 x 227 mm MARS (M270)","dmg":60,"warhead":"frag","range":13.4,"minRange":3.4,"reload":14.84,"burst":12,"burstDelay":0.16,"acc":0.21,"proj":"arc","speed":260,"aoe":2.0,"suppress":40,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_deu_fighter": {"name":"AIM-120 AMRAAM (F-4F ICE)","dmg":170,"warhead":"flak","range":9.1,"reload":3.2,"burst":1,"acc":0.81,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e90_deu_mig": {"name":"R-73 Archer and the helmet-mounted sight","dmg":164,"warhead":"flak","range":8.2,"reload":3.1,"burst":1,"acc":0.84,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e90_deu_cas": {"name":"MW-1 submunition dispenser (Tornado IDS)","dmg":278,"warhead":"he","range":2.5,"reload":1.06,"burst":2,"burstDelay":0.35,"acc":0.85,"proj":"bomb","speed":0,"aoe":2.4,"suppress":80,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},

 "w_e00_deu_rifle": {"name":"5,56mm Gewehr G36A2","dmg":10,"warhead":"bullet","range":5.0,"reload":1.12,"burst":3,"burstDelay":0.07,"acc":0.71,"proj":"bullet","speed":0,"suppress":5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_deu_at": {"name":"Panzerfaust 3-T600 and MELLS","dmg":124,"warhead":"heat","range":7.1,"minRange":1.2,"reload":5.3,"burst":1,"acc":0.84,"proj":"missile","speed":210,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e00_deu_ifv": {"name":"30 mm MK 30-2/ABM airburst (Schuetzenpanzer Puma)","dmg":24,"warhead":"bullet","range":6.5,"reload":2.2,"burst":5,"burstDelay":0.1,"acc":0.72,"proj":"shell","speed":620,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
});

/* ===================== BUNDESWEHR — era units, e50 to e00 =====================
   The empty slots are the roster. In 1955 the Bundeswehr owned almost nothing
   and bought American: no rocket artillery until LARS in 1969, no purpose-built
   Jagdpanzer until the RakJPz 1 in 1961, no mobile SAM until HAWK in 1965, no
   armed helicopter until the PAH-1 in 1979, no counter-battery radar until
   COBRA in 2007, no aerial tanker until 2004, and no sniper rifle or sniper
   school until 1998. The light tank goes with the M41 in the mid-1970s and
   nothing has replaced it in fifty years. The ballistic line runs Honest John,
   Sergeant, Lance in the Heer with Pershing 1a in the Luftwaffe, all on
   American warheads under dual key, and it ENDS in 1992 — from e90 onward
   unitFor("deu","tel", era) returns null and that is permanent.          */
Object.assign(UNITS, {
  deu_e50_rifle: {"fac":"deu","role":"rifle","cat":"infantry","layer":"ground","name":"G1 Gruppe","full":"Rifle Section, Gewehr G1 (FN FAL)","cost":78,"oil":0,"time":4,"hp":62,"armor":"infantry","speed":0.90,"turn":7,"sight":4.2,"r":6,"mass":0.1,"weapons":["w_e50_deu_rifle"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1956","confidence":"high","desc":"The Bundeswehr was founded on 12 November 1955 and its first service rifle was a Belgian one: the FN FAL, bought as the G1 while FN refused a production licence. That refusal is why Germany went to CETME and Heckler and Koch instead and ended up with the G3, which it then sold to eighty countries."},
  deu_e50_at: {"fac":"deu","role":"at","cat":"infantry","layer":"ground","name":"Panzerabwehrrohr","full":"AT Team, 3.5-inch M20 rocket launcher","cost":190,"oil":0,"time":7,"hp":56,"armor":"infantry","speed":0.76,"turn":6,"sight":6.2,"r":6,"mass":0.1,"weapons":["w_e50_deu_at"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1956","confidence":"medium","desc":"An American super bazooka and a 106 mm recoilless rifle behind it. There is no German shoulder-launched anti-armour design in this decade at all - the Bolkow Cobra guided missile appears around 1960 and the Panzerfaust 44 Lanze in 1963."},
  deu_e50_aa: {"fac":"deu","role":"aa","cat":"infantry","layer":"ground","name":"4 cm Flak L/70","full":"AA Section, 40mm Bofors L/70","cost":165,"oil":0,"time":6,"hp":52,"armor":"infantry","speed":0.75,"turn":6,"sight":7.6,"r":6,"mass":0.1,"weapons":["w_e50_deu_aa"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1956","confidence":"high","desc":"Towed 40 mm, optically laid, and against a jet it puts up a barrage rather than aims. The fixed Nike Ajax sites that covered the Federal Republic from 1959 were concrete emplacements, not a mobile system, which is why this army has no SAM in the field until HAWK in 1965."},
  deu_e50_recon: {"fac":"deu","role":"recon","cat":"vehicle","layer":"ground","name":"SPz 11-2 Kurz","full":"Schuetzenpanzer kurz 11-2 (Hotchkiss)","cost":190,"oil":2,"time":5,"hp":175,"armor":"light","speed":2.45,"turn":3.2,"sight":5.7,"r":11,"mass":8,"weapons":["w_e50_deu_recon"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1958","confidence":"high","desc":"A small French-built tracked scout with a 20 mm turret, bought because German industry was not yet allowed to build tracked fighting vehicles. It is the first armoured vehicle the new army fielded in numbers and it is not a German design.","turret":true,"tturn":2.4},
  deu_e50_ifv: {"fac":"deu","role":"ifv","cat":"vehicle","layer":"ground","name":"SPz 12-3 lang","full":"Schuetzenpanzer lang HS.30","cost":430,"oil":5,"time":11,"hp":430,"armor":"light","speed":1.50,"turn":2.0,"sight":5.1,"r":14,"mass":15,"weapons":["w_e50_deu_ifv"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1958","confidence":"high","desc":"Arguably the first true infantry fighting vehicle anywhere: a tracked, fully enclosed carrier with a stabilised 20 mm cannon in a powered turret, ordered in 1956 off a wooden mock-up. It was also the Federal Republic's first procurement scandal - 10,680 ordered, 2,176 delivered, and the engine was never adequate.","turret":true,"tturn":1.8,"cargo":5},
  deu_e50_lighttank: {"fac":"deu","role":"lighttank","cat":"vehicle","layer":"ground","name":"M41 Walker Bulldog","full":"M41 Walker Bulldog","cost":355,"oil":4,"time":9,"hp":370,"armor":"light","speed":1.81,"turn":2.4,"sight":5.3,"r":13,"mass":23,"weapons":["w_e50_deu_lighttank"],"prereq":["factory"],"tech":1,"from":"e50","to":"e60","service":"1956","confidence":"high","desc":"American light tank used for armoured reconnaissance. When the last of them went in the mid-1970s nothing replaced it, and the Bundeswehr has fielded no light tank since - fifty years and counting, which is why the slot is empty from the 1980s on.","turret":true,"tturn":1.6},
  deu_e50_mbt: {"fac":"deu","role":"mbt","cat":"vehicle","layer":"ground","name":"M47 Patton","full":"M47 Patton","cost":700,"oil":10,"time":17,"hp":915,"armor":"heavy","speed":1.33,"turn":1.5,"sight":6.3,"r":16,"mass":46,"weapons":["w_e50_deu_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1956","confidence":"high","desc":"Roughly 1,100 M47s from American stocks, followed by the M48. Germany built no tank of its own until the Leopard in 1965, and the reason is simple: tank production was prohibited until 1955 and the design teams had been dispersed for a decade.","turret":true,"tturn":1.5,"crush":true},
  deu_e50_spg: {"fac":"deu","role":"spg","cat":"vehicle","layer":"ground","name":"M44","full":"M44 155mm self-propelled howitzer","cost":700,"oil":9,"time":17,"hp":405,"armor":"light","speed":1.16,"turn":1.5,"sight":3.3,"r":15,"mass":29,"weapons":["w_e50_deu_spg"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1958","confidence":"medium","desc":"Open-topped American 155 mm on an M41 chassis, supplied under military aid and replaced by the M109 from 1966. The crew fight in the open behind a gun shield and nothing else.","turret":true,"tturn":0.9},
  deu_e50_spaag: {"fac":"deu","role":"spaag","cat":"vehicle","layer":"ground","name":"Flakpanzer M42","full":"M42 Duster, twin 40mm","cost":470,"oil":6,"time":12,"hp":420,"armor":"light","speed":1.42,"turn":1.9,"sight":7.6,"r":14,"mass":23,"weapons":["w_e50_deu_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1956","confidence":"medium","desc":"Twin Bofors in an open turret on an M41 hull, laid by eye. No radar of any kind - the German answer to that problem is twenty years away and when it arrives it is the Gepard, with two of them.","turret":true,"tturn":2.6},
  deu_e50_transport: {"fac":"deu","role":"transport","cat":"aircraft","layer":"air","name":"H-34G","full":"Sikorsky H-34G Choctaw","cost":420,"oil":6,"time":11,"hp":275,"armor":"air","speed":3.55,"turn":2.4,"sight":4.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1957","confidence":"high","desc":"Piston-engined American helicopter, the Heeresflieger's first. It carries infantry and nothing else - there is no armed German helicopter of any kind until 1979.","hover":true,"cargo":8,"ammo":0,"radius":26,"rcs":0.95},
  deu_e50_fighter: {"fac":"deu","role":"fighter","cat":"aircraft","layer":"air","name":"Sabre Mk 6","full":"Canadair Sabre Mk 6","cost":650,"oil":14,"time":16,"hp":220,"armor":"air","speed":7.31,"turn":2.0,"sight":7.2,"r":15,"mass":0,"weapons":["w_e50_deu_fighter"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1957","confidence":"high","desc":"Canadian-built Sabres with the Orenda engine, widely held to be the best Sabre variant flown by anyone. Guns only, no air-to-air missile, and the Luftwaffe that flew them had been re-founded in 1956 from nothing.","jet":true,"ammo":5,"radius":32,"rcs":0.6,"radar":3.2},
  deu_e50_cas: {"fac":"deu","role":"cas","cat":"aircraft","layer":"air","name":"F-84F Thunderstreak","full":"Republic F-84F Thunderstreak","cost":900,"oil":18,"time":22,"hp":390,"armor":"air","speed":4.90,"turn":1.5,"sight":5.4,"r":17,"mass":0,"weapons":["w_e50_deu_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e50","to":"e50","service":"1956","confidence":"high","desc":"Swept-wing fighter-bomber, the first jet the new Luftwaffe operated, delivered under the Mutual Defense Assistance Program. Underpowered, long on the runway, and it took the strike role until the Starfighter.","jet":true,"ammo":8,"radius":34,"rcs":1.4},
  deu_e50_airlift: {"fac":"deu","role":"airlift","cat":"aircraft","layer":"air","name":"Noratlas","full":"Nord N.2501D Noratlas","cost":1150,"oil":38,"time":20,"hp":540,"armor":"air","speed":2.90,"turn":1.4,"sight":8,"r":20,"mass":0,"weapons":[],"prereq":["airbase"],"tech":1,"from":"e50","to":"e50","service":"1958","confidence":"high","desc":"Twin-boom French transport, 186 of them, some licence-built at Weser and Flugzeugbau Nord. It is the aircraft that put the Luftwaffe back in the airlift business and it flew until the Transall replaced it.","jet":false,"ammo":0,"radius":48,"cargo":5,"rcs":3.6,"gen":2,"radarQ":0},

  deu_e60_rifle: {"fac":"deu","role":"rifle","cat":"infantry","layer":"ground","name":"G3 Gruppe","full":"Rifle Section, Gewehr G3A3","cost":92,"oil":0,"time":4,"hp":78,"armor":"infantry","speed":0.95,"turn":7,"sight":4.4,"r":6,"mass":0.1,"weapons":["w_e60_deu_rifle"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e80","service":"1959","confidence":"high","desc":"Roller-delayed blowback in 7.62 NATO, adopted in 1959 and standard for thirty-eight years. Heavy, hard-recoiling and accurate at ranges the 5.56 rifles that replaced it cannot reach. Licence-built in Iran, Pakistan, Turkey, Sweden, Portugal, Mexico and Norway among others."},
  deu_e60_at: {"fac":"deu","role":"at","cat":"infantry","layer":"ground","name":"Lanze / Cobra","full":"AT Team, Panzerfaust 44 Lanze and Cobra 2000","cost":240,"oil":0,"time":7,"hp":66,"armor":"infantry","speed":0.79,"turn":6,"sight":8.2,"r":6,"mass":0.1,"weapons":["w_e60_deu_at"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"The Bolkow Cobra, in Bundeswehr hands from around 1960, is a genuinely German guided anti-tank missile - a small wire-guided round the operator flies with a thumb stick from a tripod on the ground. The PzF 44 Lanze of 1963 is the first German shoulder-launched anti-armour weapon of the post-war army."},
  deu_e60_aa: {"fac":"deu","role":"aa","cat":"infantry","layer":"ground","name":"Zwillingsflak 20","full":"AA Section, 20mm Rh 202 twin mount","cost":205,"oil":0,"time":7,"hp":66,"armor":"infantry","speed":0.80,"turn":6,"sight":8.8,"r":6,"mass":0.1,"weapons":["w_e60_deu_aa"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1968","confidence":"high","desc":"Rheinmetall 20 mm on a towed twin carriage. Germany has no man-portable surface-to-air missile at all until the Redeye arrives in the 1970s, so this and the Bofors are the whole low-level answer."},
  deu_e60_recon: {"fac":"deu","role":"recon","cat":"vehicle","layer":"ground","name":"Spaehpanzer Luchs","full":"Spaehpanzer 2 Luchs (8x8)","cost":300,"oil":4,"time":7,"hp":265,"armor":"light","speed":2.75,"turn":3.2,"sight":7.2,"r":11,"mass":19,"weapons":["w_e60_deu_recon"],"prereq":["factory"],"tech":1,"from":"e60","to":"e90","service":"1975","confidence":"high","desc":"Eight-wheel-drive, amphibious, and quiet enough at 90 dB that a crew could work close to an enemy line. It has a second driver facing aft: the Luchs reverses at full road speed, which is the single feature that made it the reconnaissance vehicle of the Cold War central front.","turret":true,"tturn":2.4},
  deu_e60_ifv: {"fac":"deu","role":"ifv","cat":"vehicle","layer":"ground","name":"Marder 1","full":"Schuetzenpanzer Marder 1","cost":540,"oil":6,"time":12,"hp":545,"armor":"light","speed":1.58,"turn":2.0,"sight":5.4,"r":14,"mass":29,"weapons":["w_e60_deu_ifv"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1971","confidence":"high","desc":"The vehicle everyone else copied. Stabilised 20 mm in a two-man turret, a remote 7.62 mount at the rear, and firing ports down both sides so the section could fight from inside - the ports were plated over in the 1A3 rebuild from 1988 once it was clear nobody could hit anything through them. Nearly 2,100 built and still in service.","turret":true,"tturn":1.8,"cargo":6},
  deu_e60_mbt: {"fac":"deu","role":"mbt","cat":"vehicle","layer":"ground","name":"Leopard 1","full":"Kampfpanzer Leopard 1","cost":870,"oil":13,"time":18,"hp":1080,"armor":"heavy","speed":1.52,"turn":1.6,"sight":7.2,"r":16,"mass":40,"weapons":["w_e60_deu_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1965","confidence":"high","desc":"Germany bet on mobility and firepower and deliberately gave up protection: 40 tonnes, thin plate, and the British L7 105 mm built under licence. The reasoning was that shaped charges had made armour thickness pointless, which turned out to be wrong within a decade - and the Leopard 2 of 1979 reverses the bet completely.","turret":true,"tturn":1.6,"crush":true},
  deu_e60_tankdestroyer: {"fac":"deu","role":"tankdestroyer","cat":"vehicle","layer":"ground","name":"Raketenjagdpanzer 2","full":"Raketenjagdpanzer 2 (SS.11)","cost":690,"oil":8,"time":13,"hp":520,"armor":"light","speed":1.70,"turn":2.0,"sight":6.8,"r":14,"mass":23,"weapons":["w_e60_deu_tankdestroyer"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1967","confidence":"high","desc":"A low tracked hull with two SS.11 rails and no turret, built to fight from a hull-down position on the North German Plain and reverse out. Its sister the Kanonenjagdpanzer of 1965 carried a 90 mm gun instead. The RakJPz 1 of 1961 was the first purpose-built Jagdpanzer the Bundeswehr ever had.","turret":true,"tturn":1.2},
  deu_e60_spg: {"fac":"deu","role":"spg","cat":"vehicle","layer":"ground","name":"M109G","full":"M109G 155mm self-propelled howitzer","cost":870,"oil":11,"time":18,"hp":505,"armor":"light","speed":1.22,"turn":1.5,"sight":3.9,"r":15,"mass":25,"weapons":["w_e60_deu_spg"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1966","confidence":"high","desc":"American-built and then rebuilt in Germany: a Rheinmetall wedge breech, a new muzzle brake and German optics, which raised the rate of fire well above the American original. Not a licence-assembled vehicle - a bought one, taken apart and improved.","turret":true,"tturn":0.9},
  deu_e60_spaag: {"fac":"deu","role":"spaag","cat":"vehicle","layer":"ground","name":"Flakpanzer Gepard","full":"Flakpanzer Gepard 1A1/1A2","cost":620,"oil":9,"time":13,"hp":545,"armor":"light","speed":1.50,"turn":1.9,"sight":9.4,"r":14,"mass":47,"weapons":["w_e60_deu_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e00","service":"1976","confidence":"high","desc":"The finest gun-based air defence system ever fielded, and it is German: twin 35 mm Oerlikon KDA on a Leopard 1 hull with SEPARATE search and tracking radars, engaging while moving, in service from 1976. Germany retired the vehicle in 2010 and disbanded the army air defence branch in 2012, then in 2022 refurbished KMW-held stock for Ukraine, where the hard problem turned out to be 35 mm ammunition after Switzerland refused re-export.","turret":true,"tturn":2.6,"radar":6.0},
  deu_e60_mlrs: {"fac":"deu","role":"mlrs","cat":"vehicle","layer":"ground","name":"LARS 1","full":"110mm Leichtes Artillerieraketensystem 1","cost":1200,"oil":18,"time":24,"hp":440,"armor":"light","speed":1.20,"turn":1.35,"sight":3.9,"r":15,"mass":15,"weapons":["w_e60_deu_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e60","service":"1969","confidence":"high","desc":"Thirty-six 110 mm rails on a Magirus-Deutz Jupiter truck, firing high explosive and smoke and nothing else - the AT-2 scatterable mine rocket and the MAN chassis both belong to LARS 2 in 1980. It is the first rocket artillery the Bundeswehr ever had.","turret":true,"tturn":0.8},
  deu_e60_sam: {"fac":"deu","role":"sam","cat":"vehicle","layer":"ground","name":"HAWK","full":"MIM-23 HAWK battery","cost":1900,"oil":26,"time":24,"hp":540,"armor":"light","speed":1.35,"turn":1.3,"sight":11.0,"r":15,"mass":18,"weapons":["sam_area1"],"prereq":["factory","radar"],"tech":3,"from":"e60","to":"e60","service":"1965","confidence":"high","desc":"The first mobile surface-to-air missile the Bundeswehr fielded. Before it, German air defence above gun height meant fixed Nike Ajax and Nike Hercules sites in concrete, some of them carrying American nuclear warheads under dual key - which the Federal Republic operated and never owned.","turret":true,"tturn":0.7,"radar":9,"deploy":true,"rounds":3},
  deu_e60_tel: {"fac":"deu","role":"tel","cat":"vehicle","layer":"ground","name":"MGM-29 Sergeant","full":"MGM-29A Sergeant, dual key","cost":2900,"oil":50,"time":37,"hp":500,"armor":"light","speed":1.10,"turn":1.0,"sight":27.4,"r":17,"mass":20,"weapons":["srbm_early"],"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e60","service":"1964","confidence":"medium","desc":"Solid-fuel replacement for the Corporal, operated by the Heer from 1964 to about 1976 with American warheads under a two-key arrangement. Germany renounced atomic, biological and chemical weapons in 1954 and ratified the Non-Proliferation Treaty in 1975: it has operated nuclear weapons for four decades and never owned one.","turret":false,"deploy":true,"deploySec":5.0,"rounds":1},
  deu_e60_transport: {"fac":"deu","role":"transport","cat":"aircraft","layer":"air","name":"UH-1D","full":"Bell UH-1D Iroquois (Dornier-built)","cost":530,"oil":8,"time":12,"hp":340,"armor":"air","speed":3.80,"turn":2.4,"sight":5.6,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e60","to":"e90","service":"1967","confidence":"high","desc":"Licence-built by Dornier and flown by the Heeresflieger and the Luftwaffe for fifty-four years, to 2021. The CH-53G from 1972 did the heavy lifting alongside it. Neither was ever armed in German service.","hover":true,"cargo":8,"ammo":0,"radius":28,"rcs":0.9},
  deu_e60_fighter: {"fac":"deu","role":"fighter","cat":"aircraft","layer":"air","name":"F-104G Starfighter","full":"Lockheed F-104G Starfighter","cost":830,"oil":18,"time":17,"hp":265,"armor":"air","speed":8.10,"turn":1.7,"sight":8.0,"r":15,"mass":0,"weapons":["w_e60_deu_fighter"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1961","confidence":"high","desc":"916 aircraft, most of them licence-built in Europe, flying a low-level strike mission the airframe was never designed for. 292 were lost and 116 pilots with them, and the type was called the Widowmaker in Germany for the rest of its life. It is also the aircraft that rebuilt the German aerospace industry.","jet":true,"ammo":5,"radius":34,"rcs":0.55,"radar":4.2},
  deu_e60_cas: {"fac":"deu","role":"cas","cat":"aircraft","layer":"air","name":"Fiat G.91","full":"Fiat G.91R/3","cost":1050,"oil":20,"time":21,"hp":430,"armor":"air","speed":5.10,"turn":1.7,"sight":6.0,"r":17,"mass":0,"weapons":["w_e60_deu_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e60","service":"1961","confidence":"high","desc":"Winner of the 1954 NATO light strike competition and built under licence by Dornier. Small, simple and designed to fly from a stretch of autobahn after the airfields had been cratered, which was an entirely serious plan for the central front.","jet":true,"ammo":8,"radius":26,"rcs":1.1},
  deu_e60_airlift: {"fac":"deu","role":"airlift","cat":"aircraft","layer":"air","name":"Transall C-160","full":"Transall C-160D","cost":1350,"oil":41,"time":21,"hp":600,"armor":"air","speed":3.05,"turn":1.4,"sight":8,"r":20,"mass":0,"weapons":[],"prereq":["airbase"],"tech":1,"from":"e60","to":"e00","service":"1968","confidence":"high","desc":"A Franco-German transport built because neither country wanted to buy the Hercules, and it stayed in Luftwaffe service for fifty-three years, to 2021. Rough-field capable, two turboprops, and the aircraft that flew every German evacuation and relief mission of the Cold War.","jet":false,"ammo":0,"radius":58,"cargo":6,"rcs":3.6,"gen":2,"radarQ":0},

  deu_e80_at: {"fac":"deu","role":"at","cat":"infantry","layer":"ground","name":"MILAN","full":"AT Team, MILAN","cost":300,"oil":0,"time":8,"hp":86,"armor":"infantry","speed":0.84,"turn":6,"sight":9.3,"r":6,"mass":0.1,"weapons":["w_e80_deu_at"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1974","confidence":"high","desc":"Euromissile - Aerospatiale and MBB together - and the one place where a shared Franco-German weapon row is right rather than lazy. SACLOS: the gunner holds the sight on the target for the whole flight, exposed, and the launcher's own beacon is what the guidance tracks."},
  deu_e80_aa: {"fac":"deu","role":"aa","cat":"infantry","layer":"ground","name":"Fliegerfaust 1","full":"MANPADS Team, Fliegerfaust 1 (Redeye)","cost":260,"oil":0,"time":7,"hp":80,"armor":"infantry","speed":0.86,"turn":6,"sight":9.2,"r":6,"mass":0.1,"weapons":["w_e80_deu_aa"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1974","confidence":"medium","desc":"An uncooled lead-sulphide seeker that can only chase a jet from behind, on the tail pipe. Germany did not get the all-aspect Stinger until 1992, eleven years after the US Army - so through the 1980s the German rifle company has the worst air defence of the four Western armies here, under the best gun system in the world."},
  deu_e80_ifv: {"fac":"deu","role":"ifv","cat":"vehicle","layer":"ground","name":"Marder 1A2","full":"Schuetzenpanzer Marder 1A2","cost":680,"oil":7,"time":12,"hp":665,"armor":"light","speed":1.66,"turn":2.0,"sight":6.4,"r":14,"mass":33,"weapons":["w_e80_deu_ifv"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1979","confidence":"high","desc":"Rebuilt with a thermal sight, better suspension and a MILAN launcher on the turret roof, which gives a 20 mm vehicle a weapon that can kill a T-72. The Fuchs wheeled carrier arrived alongside it in 1979 and is one of the two most numerous armoured vehicles the Bundeswehr owns - the game has no role for an unturreted wheeled APC, so it is named here rather than forced into this slot.","turret":true,"tturn":1.8,"cargo":6},
  deu_e80_mbt: {"fac":"deu","role":"mbt","cat":"vehicle","layer":"ground","name":"Leopard 2","full":"Kampfpanzer Leopard 2 A0-A4","cost":1150,"oil":17,"time":21,"hp":1440,"armor":"heavy","speed":1.50,"turn":1.5,"sight":8.0,"r":16,"mass":55,"weapons":["w_e80_deu_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1979","confidence":"high","desc":"The Leopard 1 bet reversed: composite armour, 55 tonnes, and the Rheinmetall Rh-120 L/44 smoothbore that the United States adopted as the M256 in 1985. Hunter-killer from the start - EMES-15 gunner sight and a commander panoramic sight - although the thermal channel was late and early batches made do with a PZB 200 low-light television until the mid-1980s.","turret":true,"tturn":1.7,"crush":true},
  deu_e80_tankdestroyer: {"fac":"deu","role":"tankdestroyer","cat":"vehicle","layer":"ground","name":"Jaguar 1","full":"Jagdpanzer Jaguar 1 (HOT)","cost":980,"oil":10,"time":15,"hp":590,"armor":"light","speed":1.70,"turn":2.0,"sight":7.6,"r":14,"mass":25,"weapons":["hot_jaguar"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e90","service":"1978","confidence":"high","desc":"The Raketenjagdpanzer 2 rebuilt with the HOT missile in 1978, which more than doubled its reach. Jaguar 2 is a different vehicle - the gun-armed Kanonenjagdpanzer rebuilt with TOW in 1983. Its weapon is named outside the era pattern so the HOT keeps the reach that is the whole reason for the rebuild.","turret":true,"tturn":1.2},
  deu_e80_spg: {"fac":"deu","role":"spg","cat":"vehicle","layer":"ground","name":"M109A3G","full":"M109A3G 155mm self-propelled howitzer","cost":1120,"oil":15,"time":20,"hp":625,"armor":"light","speed":1.28,"turn":1.5,"sight":4.6,"r":15,"mass":25,"weapons":["w_e80_deu_spg"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1985","confidence":"high","desc":"The German M109 line brought up to the long-barrelled standard. It is competent and utterly conventional, and it is the last conventional German gun - the PzH 2000 that follows it in 1998 is a different kind of machine altogether.","turret":true,"tturn":0.9},
  deu_e80_mlrs: {"fac":"deu","role":"mlrs","cat":"vehicle","layer":"ground","name":"LARS 2","full":"110mm LARS 2 on MAN 7t chassis","cost":1620,"oil":25,"time":27,"hp":560,"armor":"light","speed":1.23,"turn":1.3,"sight":4.6,"r":15,"mass":17,"weapons":["w_e80_deu_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e80","to":"e80","service":"1980","confidence":"high","desc":"LARS on a MAN chassis with a fire-control computer and, for the first time, the AT-2 scatterable anti-tank mine rocket - a divisional commander could close a road with rockets in under a minute. Germany destroyed its AT-2 stocks under the Ottawa Convention and has had no mine-laying rocket since.","turret":true,"tturn":0.8},
  deu_e80_sam: {"fac":"deu","role":"sam","cat":"vehicle","layer":"ground","name":"Improved HAWK","full":"MIM-23B Improved HAWK","cost":2200,"oil":30,"time":28,"hp":570,"armor":"light","speed":1.10,"turn":1.1,"sight":12.2,"r":16,"mass":30,"weapons":["sam_area1"],"prereq":["factory","radar","lab"],"tech":3,"from":"e80","to":"e80","service":"1978","confidence":"high","desc":"The Luftwaffe ran six HAWK wings covering the Federal Republic, alongside Nike Hercules until 1988. Roland, the Franco-German short-range system on a Marder chassis, sits underneath it from 1978 and is the other half of the belt.","turret":true,"tturn":0.6,"radar":11,"deploy":true,"rounds":4},
  deu_e80_tel: {"fac":"deu","role":"tel","cat":"vehicle","layer":"ground","name":"MGM-52 Lance","full":"MGM-52C Lance, dual key","cost":3100,"oil":55,"time":38,"hp":510,"armor":"light","speed":1.35,"turn":1.1,"sight":29.0,"r":17,"mass":16,"weapons":["srbm_short"],"prereq":["factory","lab","radar"],"tech":3,"from":"e80","to":"e80","service":"1976","confidence":"high","desc":"About twenty-six launchers in the Heer from 1976, American warheads under dual key, alongside the Luftwaffe seventy-two Pershing 1a. This is the high-water mark of German ballistic capability and it is the end of it: Pershing 1a went in 1991 and the Lance in 1992, and Germany has fielded no operational-range ballistic missile and no ground-launched cruise missile since. Thirty-four years, three of the six eras in this game.","turret":false,"deploy":true,"deploySec":4.5,"rounds":1},
  deu_e80_gunship: {"fac":"deu","role":"gunship","cat":"aircraft","layer":"air","name":"PAH-1","full":"MBB Bo 105 PAH-1 (HOT)","cost":900,"oil":14,"time":17,"hp":340,"armor":"air","speed":3.70,"turn":2.6,"sight":9.6,"r":16,"mass":0,"weapons":["w_e80_deu_gunship"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e90","service":"1979","confidence":"high","desc":"A 2.5-tonne light helicopter with six HOT missiles bolted to it and no gun, no armour and no night capability. It is the first armed helicopter the Bundeswehr ever had, twenty-four years after the army was founded, and its whole tactic was to pop up from behind a treeline, fire and drop. The rigid rotor head lets it fly a genuine aerobatic loop, which no other attack helicopter can.","hover":true,"ammo":6,"radius":18,"rcs":0.6},
  deu_e80_fighter: {"fac":"deu","role":"fighter","cat":"aircraft","layer":"air","name":"F-4F Phantom","full":"McDonnell Douglas F-4F Phantom II","cost":1080,"oil":24,"time":19,"hp":350,"armor":"air","speed":8.00,"turn":1.8,"sight":9.0,"r":15,"mass":0,"weapons":["w_e80_deu_fighter"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1974","confidence":"high","desc":"A simplified Phantom built for Germany: Sparrow capability deleted, the number seven fuel cell deleted, no slotted stabilator. It kept its refuelling receptacle. 175 aircraft, plus the RF-4E reconnaissance version, and they were the backbone of the air defence of the Federal Republic for two decades.","jet":true,"ammo":5,"radius":36,"rcs":0.75,"radar":5.0},
  deu_e80_cas: {"fac":"deu","role":"cas","cat":"aircraft","layer":"air","name":"Alpha Jet A","full":"Dassault-Dornier Alpha Jet A","cost":1150,"oil":22,"time":21,"hp":420,"armor":"air","speed":5.40,"turn":1.9,"sight":6.6,"r":17,"mass":0,"weapons":["w_e80_deu_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1979","confidence":"high","desc":"175 aircraft in the close support role from 1979 to 1993 - this is what actually replaced the G.91, not the Tornado. The French bought the same airframe as a trainer; Germany bought it as a light attack aircraft and gave it a 27 mm Mauser in a belly pod.","jet":true,"ammo":8,"radius":22,"rcs":0.9},

  deu_e90_rifle: {"fac":"deu","role":"rifle","cat":"infantry","layer":"ground","name":"G36 Gruppe","full":"Rifle Section, Gewehr G36","cost":138,"oil":0,"time":5,"hp":102,"armor":"infantry","speed":1.03,"turn":7,"sight":5.6,"r":6,"mass":0.1,"weapons":["w_e90_deu_rifle"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1997","confidence":"high","desc":"Polymer receiver, carrying handle optic, and 3.6 kg - a deliberate break from the G3 in every dimension. Adopted in 1997. The accuracy problems when the barrel gets hot, which became a public scandal in 2015, belong to the next decade."},
  deu_e90_at: {"fac":"deu","role":"at","cat":"infantry","layer":"ground","name":"Panzerfaust 3","full":"AT Team, Panzerfaust 3 and MILAN 2","cost":355,"oil":0,"time":8,"hp":96,"armor":"infantry","speed":0.86,"turn":6,"sight":10.2,"r":6,"mass":0.1,"weapons":["w_e90_deu_at"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1992","confidence":"high","desc":"The Panzerfaust 3 as introduced in 1992 is a single shaped charge; the tandem warhead that defeats reactive armour is the PzF 3-T of about 1998. It is a recoilless countermass launcher, so it can be fired from inside a building, which MILAN cannot."},
  deu_e90_sniper: {"fac":"deu","role":"sniper","cat":"infantry","layer":"ground","name":"G22 Scharfschuetze","full":"Sniper Team, G22 (Accuracy International AWM)","cost":720,"oil":0,"time":15,"hp":90,"armor":"infantry","speed":0.78,"turn":6,"sight":10.4,"r":6,"mass":0.1,"weapons":["w_e90_deu_sniper"],"prereq":["barracks","radar"],"tech":2,"from":"e90","to":"e00","service":"1998","confidence":"high","desc":"A British rifle in .300 Winchester Magnum, adopted in 1998 - the first dedicated sniper rifle the Bundeswehr ever issued, forty-three years after the army was founded. The trade had been politically unwelcome since 1945 and there was no school for it until the Balkans made the omission impossible to defend.","stealthMove":true},
  deu_e90_ifv: {"fac":"deu","role":"ifv","cat":"vehicle","layer":"ground","name":"Marder 1A3","full":"Schuetzenpanzer Marder 1A3","cost":800,"oil":9,"time":13,"hp":745,"armor":"light","speed":1.70,"turn":2.0,"sight":7.0,"r":14,"mass":35,"weapons":["w_e90_deu_ifv"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1988","confidence":"high","desc":"Spaced applique armour all round and the firing ports plated over for good. It went to Kosovo and Afghanistan and was still the standard German IFV in 2015, forty-four years after the first one was delivered, because the Puma took twenty years to arrive.","turret":true,"tturn":1.8,"cargo":6},
  deu_e90_mbt: {"fac":"deu","role":"mbt","cat":"vehicle","layer":"ground","name":"Leopard 2A5","full":"Kampfpanzer Leopard 2A5","cost":1350,"oil":19,"time":22,"hp":1620,"armor":"heavy","speed":1.52,"turn":1.5,"sight":8.4,"r":16,"mass":60,"weapons":["w_e90_deu_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1995","confidence":"high","desc":"The arrowhead wedge bolted onto the turret face in 1995 is the most recognisable silhouette in modern armour, and it exists because the flat turret front of the early Leopard 2 was its weak spot. Same L/44 gun as the Abrams, which is to say the same gun the Abrams borrowed.","turret":true,"tturn":1.6,"crush":true},
  deu_e90_mlrs: {"fac":"deu","role":"mlrs","cat":"vehicle","layer":"ground","name":"MARS","full":"Mittleres Artillerieraketensystem (M270)","cost":1900,"oil":29,"time":28,"hp":630,"armor":"light","speed":1.27,"turn":1.3,"sight":5.1,"r":15,"mass":25,"weapons":["w_e90_deu_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e90","to":"e90","service":"1990","confidence":"high","desc":"The American M270 built in Europe, replacing LARS from 1990. With the Lance gone in 1992 this becomes the longest-reaching weapon the German army owns, and it has stayed that way ever since.","turret":true,"tturn":0.8},
  deu_e90_sam: {"fac":"deu","role":"sam","cat":"vehicle","layer":"ground","name":"Patriot PAC-2","full":"MIM-104 Patriot PAC-2","cost":2480,"oil":34,"time":31,"hp":580,"armor":"light","speed":1.05,"turn":1.0,"sight":12.9,"r":16,"mass":34,"weapons":["sam_area2"],"prereq":["factory","radar","lab"],"tech":3,"from":"e90","to":"e00","service":"1989","confidence":"high","desc":"Germany bought Patriot in 1989 and ended up with one of the largest fleets outside the United States, deploying batteries to Israel in 1991 and to Turkey in 1991, 2013 and 2024. Roland stayed underneath it until 2005.","turret":true,"tturn":0.5,"radar":12,"deploy":true,"rounds":4},
  deu_e90_fighter: {"fac":"deu","role":"fighter","cat":"aircraft","layer":"air","name":"F-4F ICE","full":"F-4F Phantom II ICE (AMRAAM)","cost":1250,"oil":27,"time":20,"hp":380,"armor":"air","speed":8.10,"turn":1.8,"sight":10.0,"r":15,"mass":0,"weapons":["w_e90_deu_fighter"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1992","confidence":"high","desc":"Improved Combat Efficiency: a new pulse-Doppler radar and AMRAAM on a 1974 airframe that had been delivered without even Sparrow capability. It held the German air defence mission until the Eurofighter arrived in 2004 and the last one flew in 2013.","jet":true,"ammo":5,"radius":36,"rcs":0.75,"radar":5.6},
  deu_e90_mig29: {"fac":"deu","role":"fighter","cat":"aircraft","layer":"air","name":"MiG-29G","full":"Mikoyan MiG-29G (ex-NVA)","cost":1150,"oil":25,"time":18,"hp":370,"armor":"air","speed":8.50,"turn":2.3,"sight":8.6,"r":15,"mass":0,"weapons":["w_e90_deu_mig"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1990","confidence":"high","desc":"Twenty-four aircraft inherited from the East German air force on reunification and flown by JG 73 at Laage until 2003 - the only Soviet frontline fighters ever to serve in NATO front-line air defence, and the only East German equipment the unified Bundeswehr actually kept. Western pilots who flew against them found the helmet-mounted sight and the R-73 a genuine shock. Twenty-two were sold to Poland in 2003 for one euro each.","jet":true,"ammo":4,"radius":24,"rcs":0.85,"radar":4.4},
  deu_e90_cas: {"fac":"deu","role":"cas","cat":"aircraft","layer":"air","name":"Tornado IDS","full":"Panavia Tornado IDS","cost":1780,"oil":35,"time":26,"hp":610,"armor":"air","speed":7.40,"turn":1.6,"sight":8.4,"r":17,"mass":0,"weapons":["w_e90_deu_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1981","confidence":"high","desc":"Interdictor/Strike: swing wings, terrain-following radar and a two-man crew, built to cross the border at 60 metres in weather that grounded everyone else. Germany bought 324 IDS and 35 ECR. The MW-1 dispenser it carried in this decade scattered submunitions across an airfield in one pass, and was withdrawn with the cluster munition ban.","jet":true,"ammo":8,"radius":34,"rcs":1.3},

  deu_e00_rifle: {"fac":"deu","role":"rifle","cat":"infantry","layer":"ground","name":"G36A2 Gruppe","full":"Rifle Section, Gewehr G36A2","cost":152,"oil":0,"time":5,"hp":112,"armor":"infantry","speed":1.04,"turn":7,"sight":5.9,"r":6,"mass":0.1,"weapons":["w_e00_deu_rifle"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2005","confidence":"high","desc":"The G36 with a new optic and rail interface, carried through Kunduz and Chahar Darreh. In 2015 an official investigation found the rifle lost accuracy when hot and the defence ministry announced its replacement; it then stayed in service for another decade while the successor competition was run, cancelled and rerun."},
  deu_e00_at: {"fac":"deu","role":"at","cat":"infantry","layer":"ground","name":"MELLS","full":"AT Team, MELLS and Panzerfaust 3-T600","cost":390,"oil":0,"time":9,"hp":102,"armor":"infantry","speed":0.87,"turn":6,"sight":10.4,"r":6,"mass":0.1,"weapons":["w_e00_deu_at"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2012","confidence":"high","desc":"Germany spent thirty years on MILAN, watched Javelin arrive elsewhere, and then bought Israeli: Spike LR as MELLS from 2012. The PARS 3 LR that flies on the Tiger is the German fire-and-forget missile of the same generation, and it never went to the infantry."},
  deu_e00_ifv: {"fac":"deu","role":"ifv","cat":"vehicle","layer":"ground","name":"Puma","full":"Schuetzenpanzer Puma","cost":1100,"oil":11,"time":15,"hp":830,"armor":"light","speed":1.80,"turn":2.05,"sight":8.0,"r":14,"mass":43,"weapons":["w_e00_deu_ifv"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2015","confidence":"high","desc":"Twenty years from concept to a delivered vehicle, and the first years in service were bad enough that in December 2022 the army reported all eighteen Pumas on a NATO exercise had failed. Underneath the programme is a genuinely outstanding machine: an unmanned turret, a decoupled crew capsule and the best protection on any IFV anywhere.","turret":true,"tturn":2.0,"cargo":6},
  deu_e00_mbt: {"fac":"deu","role":"mbt","cat":"vehicle","layer":"ground","name":"Leopard 2A6","full":"Kampfpanzer Leopard 2A6 (L/55)","cost":1500,"oil":22,"time":23,"hp":1700,"armor":"heavy","speed":1.53,"turn":1.5,"sight":8.6,"r":16,"mass":62,"weapons":["gun_120_l55"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2001","confidence":"high","desc":"225 hulls converted to the longer L/55 barrel from 2001, which is where the German gun pulls ahead of the American one again. A2 and A5 hulls stayed on the L/44. The Leopard 2 has been sold to nineteen countries and is the standard Western tank everywhere except the United States and Britain.","turret":true,"tturn":1.6,"crush":true},
  deu_e00_tanker: {"fac":"deu","role":"tanker","cat":"aircraft","layer":"air","name":"A310 MRTT","full":"Airbus A310-304 MRTT","cost":2900,"oil":64,"time":37,"hp":700,"armor":"air","speed":4.20,"turn":0.9,"sight":9,"r":22,"mass":0,"weapons":[],"prereq":["airbase","radar"],"tech":2,"from":"e00","to":"e00","service":"2004","confidence":"high","desc":"Four ex-Lufthansa and ex-Interflug airliners converted with hose-and-drogue pods - the first aerial tanker Germany ever owned, in 2004, half a century after the Luftwaffe was re-founded. Until then German fast jets flew on somebody else's tanker or did not fly far.","jet":true,"ammo":0,"radius":120,"tanker":340,"refuelRate":13,"rcs":4.8},
});

/* ===================== BRITISH ARMED FORCES — era weapons, e50 to e00 =====================
   Ids follow the w_<era>_<fac>_<role> pattern, so the era-range normaliser at
   the foot of generations.js rewrites `range` for the at, tankdestroyer,
   gunship, aa, spaag, mlrs and spg roles to a per-era constant shared by every
   army. That is correct for those roles: the period sets the reach, not the
   nation. Where Britain bought the American article outright the entry is
   omitted on purpose and the unit points at the existing US key — Honest
   John, the M109A2 and the M270 are the same equipment, not a British one.
   The British deltas elsewhere are deliberate and small: rifled guns buy
   accuracy and pay in rate of fire, the Rarden buys accuracy and pays in
   burst, and Blowpipe carries the poor accuracy figure it earned.        */
Object.assign(WEAPONS, {
 "w_e50_gbr_rifle": {"name":"7.62mm L1A1 SLR, semi-automatic only","dmg":6,"warhead":"bullet","range":4,"reload":1.38,"burst":3,"burstDelay":0.07,"acc":0.56,"proj":"bullet","speed":0,"suppress":5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_gbr_at": {"name":"120mm BAT recoilless rifle, HESH","dmg":62,"warhead":"heat","range":6.4,"minRange":1,"reload":8.4,"burst":1,"acc":0.6,"proj":"missile","speed":300,"aoe":0.8,"suppress":16,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e50_gbr_mbt": {"name":"20-pounder (83.4mm) gun, gyro-stabilised","dmg":70,"warhead":"cannon","range":6.2,"reload":5.2,"burst":1,"acc":0.66,"proj":"shell","speed":860,"aoe":0.9,"suppress":24,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_gbr_heavy": {"name":"120mm L1A1 rifled gun, separate-loading","dmg":78,"warhead":"cannon","range":6.8,"reload":7.2,"burst":1,"acc":0.62,"proj":"shell","speed":880,"aoe":0.9,"suppress":26,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_gbr_lighttank": {"name":"76mm L5A1 gun","dmg":26,"warhead":"cannon","range":5,"reload":3.9,"burst":1,"acc":0.58,"proj":"shell","speed":700,"aoe":0.5,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_gbr_ifv": {"name":".30 Browning in a small manual turret","dmg":8,"warhead":"bullet","range":4.5,"reload":2.6,"burst":5,"burstDelay":0.1,"acc":0.5,"proj":"bullet","speed":0,"suppress":11,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_gbr_spg": {"name":"25-pounder (87.6mm) gun-howitzer","dmg":48,"warhead":"frag","range":14.5,"minRange":4.5,"reload":8.6,"burst":1,"acc":0.26,"proj":"arc","speed":210,"aoe":2.1,"suppress":50,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_gbr_aa": {"name":"40mm Bofors L/70","dmg":12,"warhead":"flak","range":7.6,"reload":2.1,"burst":6,"burstDelay":0.07,"acc":0.46,"proj":"shell","speed":900,"aoe":0.5,"tgt":{"ground":1,"air":1,"sea":0,"sub":0}},
 "w_e50_gbr_recon": {"name":".30 Browning in a one-man turret","dmg":5,"warhead":"bullet","range":4,"reload":2.05,"burst":6,"burstDelay":0.07,"acc":0.48,"proj":"bullet","speed":0,"suppress":9,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_gbr_tankdestroyer": {"name":"Malkara MCLOS wire-guided missile, 26kg HESH","dmg":88,"warhead":"heat","range":7.4,"minRange":1.4,"reload":9.5,"burst":1,"acc":0.5,"proj":"missile","speed":230,"aoe":1.2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e50_gbr_fighter": {"name":"Four 30mm ADEN cannon","dmg":96,"warhead":"flak","range":6.6,"reload":3.7,"burst":1,"acc":0.62,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e50_gbr_cas": {"name":"Four 20mm Hispano cannon and RP-3 rockets","dmg":132,"warhead":"he","range":1.9,"reload":1.28,"burst":2,"burstDelay":0.35,"acc":0.64,"proj":"bomb","speed":0,"aoe":2.4,"suppress":80,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_gbr_rifle": {"name":"7.62mm L1A1 SLR with L7A1 GPMG","dmg":8,"warhead":"bullet","range":4.3,"reload":1.34,"burst":3,"burstDelay":0.07,"acc":0.6,"proj":"bullet","speed":0,"suppress":6,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_gbr_at": {"name":"84mm Carl Gustav L14A1 recoilless","dmg":78,"warhead":"heat","range":7.4,"minRange":1,"reload":7,"burst":1,"acc":0.66,"proj":"missile","speed":310,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e60_gbr_mbt": {"name":"120mm L11A5 rifled gun, bagged charges","dmg":99,"warhead":"cannon","range":7.2,"reload":6,"burst":1,"acc":0.74,"proj":"shell","speed":880,"aoe":0.9,"suppress":26,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_gbr_lighttank": {"name":"76mm L23A1 gun","dmg":30,"warhead":"cannon","range":5.4,"reload":3.6,"burst":1,"acc":0.64,"proj":"shell","speed":700,"aoe":0.5,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_gbr_ifv": {"name":"7.62mm GPMG in a manual cupola","dmg":8,"warhead":"bullet","range":4.6,"reload":2.5,"burst":6,"burstDelay":0.09,"acc":0.54,"proj":"bullet","speed":0,"suppress":11,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_gbr_spg": {"name":"105mm L13A1 howitzer","dmg":62,"warhead":"frag","range":15.5,"minRange":4.5,"reload":8,"burst":1,"acc":0.28,"proj":"arc","speed":210,"aoe":2.2,"suppress":52,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_gbr_aa": {"name":"Blowpipe CLOS thumb-guided missile","dmg":52,"warhead":"flak","range":7.4,"reload":3,"burst":1,"acc":0.42,"proj":"missile","speed":500,"aoe":0.6,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":1},
 "w_e60_gbr_recon": {"name":"30mm L21A1 Rarden, single aimed shots","dmg":22,"warhead":"bullet","range":5.6,"reload":2.7,"burst":3,"burstDelay":0.13,"acc":0.66,"proj":"shell","speed":620,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_gbr_tankdestroyer": {"name":"Swingfire SACLOS ATGM, separated sight","dmg":140,"warhead":"heat","range":9.4,"minRange":1.5,"reload":7.5,"burst":1,"acc":0.72,"proj":"missile","speed":300,"aoe":0.8,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e60_gbr_gunship": {"name":"Nord SS.11 wire-guided missile","dmg":61,"warhead":"heat","range":7.4,"reload":3.07,"burst":1,"acc":0.62,"proj":"missile","speed":400,"aoe":1,"ammo":1,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e60_gbr_fighter": {"name":"Red Top IR missile and two 30mm ADEN","dmg":104,"warhead":"flak","range":7,"reload":3.6,"burst":1,"acc":0.64,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e60_gbr_cas": {"name":"Two 30mm ADEN pods and 68mm SNEB rockets","dmg":170,"warhead":"he","range":2.1,"reload":1.2,"burst":2,"burstDelay":0.35,"acc":0.72,"proj":"bomb","speed":0,"aoe":2.4,"suppress":80,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_gbr_rifle": {"name":"5.56mm L85A1 with SUSAT optic, L86A1 LSW","dmg":9,"warhead":"bullet","range":4.8,"reload":1.22,"burst":3,"burstDelay":0.07,"acc":0.66,"proj":"bullet","speed":0,"suppress":5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_gbr_at": {"name":"94mm LAW 80 with 9mm spotting rifle","dmg":100,"warhead":"heat","range":9,"minRange":1.1,"reload":5.8,"burst":1,"acc":0.78,"proj":"missile","speed":340,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e80_gbr_mbt": {"name":"120mm L11A5 rifled gun, APFSDS and HESH","dmg":122,"warhead":"cannon","range":7.6,"reload":5.4,"burst":1,"acc":0.78,"proj":"shell","speed":880,"aoe":0.9,"suppress":26,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_gbr_ifv": {"name":"30mm L21A1 Rarden cannon","dmg":18,"warhead":"bullet","range":5.9,"reload":2.5,"burst":3,"burstDelay":0.13,"acc":0.68,"proj":"shell","speed":620,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_gbr_recon": {"name":"30mm L21A1 Rarden cannon","dmg":18,"warhead":"bullet","range":5.9,"reload":2.5,"burst":3,"burstDelay":0.13,"acc":0.68,"proj":"shell","speed":620,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_gbr_aa": {"name":"Javelin SACLOS-guided missile","dmg":74,"warhead":"flak","range":8.6,"reload":2.8,"burst":1,"acc":0.62,"proj":"missile","speed":520,"aoe":0.6,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":1},
 "w_e80_gbr_fighter": {"name":"Skyflash semi-active radar missile","dmg":152,"warhead":"flak","range":8.8,"reload":3.33,"burst":1,"acc":0.78,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e80_gbr_cas": {"name":"Paveway II laser-guided bomb","dmg":240,"warhead":"he","range":2.4,"reload":1.11,"burst":2,"burstDelay":0.35,"acc":0.82,"proj":"bomb","speed":0,"aoe":2.4,"suppress":80,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_gbr_gunship": {"name":"BGM-71 TOW from a roof-mounted sight","dmg":112,"warhead":"heat","range":9.6,"reload":3.2,"burst":1,"acc":0.8,"proj":"missile","speed":330,"aoe":0.9,"ammo":1,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e80_gbr_cfighter": {"name":"AIM-9L Sidewinder","dmg":140,"warhead":"flak","range":7.6,"reload":3.2,"burst":1,"acc":0.8,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e90_gbr_rifle": {"name":"5.56mm L85A1 with SUSAT","dmg":9,"warhead":"bullet","range":5.0,"reload":1.20,"burst":3,"burstDelay":0.07,"acc":0.70,"proj":"bullet","speed":0,"suppress":5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_gbr_at": {"name":"Milan 2 wire-guided ATGM","dmg":104,"warhead":"heat","range":6.0,"minRange":0.9,"reload":6.60,"burst":1,"acc":0.73,"proj":"missile","speed":200,"aoe":0.6,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1.15},
 "w_e90_gbr_aa": {"name":"Starstreak HVM - three tungsten darts","dmg":118,"warhead":"flak","range":6.4,"reload":4.20,"burst":3,"burstDelay":0.05,"acc":0.86,"proj":"missile","speed":1300,"aoe":0,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.15},
 "w_e90_gbr_recon": {"name":"7.62mm GPMG and 40mm GMG on a WMIK","dmg":10,"warhead":"bullet","range":5.0,"reload":1.60,"burst":6,"burstDelay":0.07,"acc":0.60,"proj":"bullet","speed":0,"suppress":10,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_gbr_ifv": {"name":"30mm L21A1 Rarden, three-round clips","dmg":26,"warhead":"bullet","range":6.4,"reload":3.60,"burst":3,"burstDelay":0.18,"acc":0.74,"proj":"shell","speed":640,"suppress":11,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_gbr_lighttank": {"name":"30mm L21A1 Rarden","dmg":26,"warhead":"bullet","range":6.2,"reload":3.60,"burst":3,"burstDelay":0.18,"acc":0.74,"proj":"shell","speed":640,"suppress":11,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_gbr_tankdestroyer": {"name":"Swingfire, fired from a separated sight","dmg":142,"warhead":"heat","range":8.0,"minRange":1.3,"reload":6.80,"burst":1,"acc":0.80,"proj":"missile","speed":185,"aoe":0.8,"suppress":16,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1.15},
 "w_e90_gbr_mbt": {"name":"120mm L11A5 rifled, HESH and APFSDS","dmg":132,"warhead":"cannon","range":8.0,"reload":5.10,"burst":1,"acc":0.82,"proj":"shell","speed":830,"aoe":1.2,"suppress":26,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_gbr_heavy": {"name":"120mm L30A1 rifled with CHARM 3","dmg":152,"warhead":"cannon","range":8.2,"reload":4.90,"burst":1,"acc":0.85,"proj":"shell","speed":840,"aoe":1.2,"suppress":27,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_gbr_spg": {"name":"155mm L31 39-calibre howitzer","dmg":129,"warhead":"frag","range":14.9,"minRange":3.8,"reload":8.60,"burst":1,"acc":0.32,"proj":"arc","speed":210,"aoe":2.6,"suppress":60,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_gbr_mlrs": {"name":"12 x 227mm M26 rockets","dmg":60,"warhead":"frag","range":13.4,"minRange":3.4,"reload":14.84,"burst":12,"burstDelay":0.16,"acc":0.21,"proj":"arc","speed":260,"aoe":2.0,"suppress":40,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"rocket":true},
 "w_e90_gbr_spaag": {"name":"Eight Starstreak HVM on a Stormer hull","dmg":118,"warhead":"flak","range":6.4,"reload":2.60,"burst":3,"burstDelay":0.05,"acc":0.84,"proj":"missile","speed":1300,"aoe":0,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.15},
 "w_e90_gbr_fighter": {"name":"Skyflash and AIM-9L","dmg":150,"warhead":"flak","range":8.2,"reload":3.60,"burst":1,"acc":0.72,"proj":"missile","speed":660,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.60},
 "w_e90_gbr_cas": {"name":"1000lb Paveway II and CRV-7 rockets","dmg":268,"warhead":"he","range":2.4,"reload":1.10,"burst":2,"burstDelay":0.35,"acc":0.82,"proj":"bomb","speed":0,"aoe":2.4,"suppress":80,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_gbr_sead": {"name":"ALARM - loiters under a parachute","dmg":176,"warhead":"he","range":13.5,"minRange":1.4,"reload":7.20,"burst":1,"acc":0.84,"proj":"missile","speed":480,"aoe":1.4,"ammo":1,"antiRadiation":true,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"loft","intercept":0.70},
 "w_e90_gbr_gunship": {"name":"TOW-2 from a Lynx AH7","dmg":118,"warhead":"heat","range":6.0,"reload":3.20,"burst":1,"acc":0.80,"proj":"missile","speed":330,"aoe":0.8,"ammo":1,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1.10},
 "w_e00_gbr_rifle": {"name":"5.56mm L85A2","dmg":10,"warhead":"bullet","range":5.1,"reload":1.10,"burst":3,"burstDelay":0.07,"acc":0.73,"proj":"bullet","speed":0,"suppress":5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_gbr_at": {"name":"Javelin and NLAW","dmg":124,"warhead":"heat","range":7.1,"minRange":0.8,"reload":5.30,"burst":1,"acc":0.84,"proj":"missile","speed":340,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e00_gbr_aa": {"name":"Starstreak HVM on a lightweight launcher","dmg":126,"warhead":"flak","range":6.6,"reload":4.00,"burst":3,"burstDelay":0.05,"acc":0.88,"proj":"missile","speed":1300,"aoe":0,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.15},
 "w_e00_gbr_recon": {"name":"12.7mm HMG and 40mm GMG on a Jackal","dmg":12,"warhead":"bullet","range":5.3,"reload":1.60,"burst":6,"burstDelay":0.07,"acc":0.65,"proj":"bullet","speed":0,"suppress":10,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_gbr_ifv": {"name":"30mm L21A1 Rarden - unchanged since 1988","dmg":27,"warhead":"bullet","range":6.4,"reload":3.55,"burst":3,"burstDelay":0.18,"acc":0.75,"proj":"shell","speed":640,"suppress":11,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_gbr_lighttank": {"name":"30mm L21A1 Rarden","dmg":27,"warhead":"bullet","range":6.3,"reload":3.55,"burst":3,"burstDelay":0.18,"acc":0.75,"proj":"shell","speed":640,"suppress":11,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_gbr_mbt": {"name":"120mm L30A1 rifled with CHARM 3","dmg":152,"warhead":"cannon","range":8.2,"reload":4.90,"burst":1,"acc":0.85,"proj":"shell","speed":840,"aoe":1.2,"suppress":27,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_gbr_heavy": {"name":"120mm L30A1 rifled, TES fit","dmg":158,"warhead":"cannon","range":8.2,"reload":4.85,"burst":1,"acc":0.86,"proj":"shell","speed":840,"aoe":1.2,"suppress":27,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_gbr_spg": {"name":"155mm L31 39-calibre howitzer","dmg":140,"warhead":"frag","range":15.0,"minRange":3.9,"reload":8.40,"burst":1,"acc":0.33,"proj":"arc","speed":210,"aoe":2.6,"suppress":60,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_gbr_mlrs": {"name":"GMLRS - one rocket, one target","dmg":190,"warhead":"frag","range":15.4,"minRange":3.5,"reload":9.60,"burst":2,"burstDelay":0.6,"acc":0.88,"proj":"arc","speed":280,"aoe":1.8,"suppress":45,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"rocket":true},
 "w_e00_gbr_spaag": {"name":"Eight Starstreak HVM, passive IR cueing","dmg":126,"warhead":"flak","range":6.6,"reload":2.50,"burst":3,"burstDelay":0.05,"acc":0.86,"proj":"missile","speed":1300,"aoe":0,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.15},
 "w_e00_gbr_fighter": {"name":"AMRAAM, ASRAAM and later Meteor","dmg":186,"warhead":"flak","range":9.6,"reload":3.00,"burst":1,"acc":0.85,"proj":"missile","speed":720,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.50},
 "w_e00_gbr_cas": {"name":"Brimstone and Paveway IV","dmg":296,"warhead":"he","range":2.8,"reload":1.05,"burst":2,"burstDelay":0.30,"acc":0.93,"proj":"bomb","speed":0,"aoe":1.8,"suppress":70,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_gbr_sead": {"name":"ALARM, withdrawn 2013 with no successor","dmg":190,"warhead":"he","range":14.0,"minRange":1.4,"reload":7.00,"burst":1,"acc":0.86,"proj":"missile","speed":480,"aoe":1.4,"ammo":1,"antiRadiation":true,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"loft","intercept":0.70},
 "w_e00_gbr_gunship": {"name":"Hellfire II and 30mm M230","dmg":138,"warhead":"heat","range":6.5,"reload":2.45,"burst":1,"acc":0.88,"proj":"missile","speed":400,"aoe":1.0,"ammo":1,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e00_gbr_cfighter": {"name":"AIM-9L Sidewinder, cued by eye alone","dmg":152,"warhead":"flak","range":7.8,"reload":3.20,"burst":1,"acc":0.78,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55}, "w_e00_gbr_stealthfighter": {"name":"AMRAAM and ASRAAM in the bays","dmg":214,"warhead":"flak","range":10.7,"reload":2.90,"burst":1,"acc":0.89,"proj":"missile","speed":760,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.45},
});

/* ===================== BRITISH ARMED FORCES — era units, e50 to e00 =====================
   Small, expensive, and gunnery-first. The empty slots are as much of the
   roster as the filled ones and none of them is an oversight:

     spaag, every era — Britain never fielded a self-propelled anti-aircraft
       gun. Falcon stayed a trials vehicle and Marksman got no British order;
       low-level defence is the towed Bofors, then Rapier, then Starstreak.
     sead, e50 / e60 / e80 — no anti-radiation missile of any kind existed in
       British service until ALARM in the Gulf in 1991. That is a hard
       three-era gap and the single biggest capability difference from the
       United States in this band.
     awacs, e50 — no airborne early warning aircraft at all until the
       Shackleton AEW.2 in 1972, which is why the e60 entry is a 1950s
       piston airframe carrying radars taken out of retired Gannets.
     gunship, e50 — no armed helicopter. Britain never built a purpose-made
       attack helicopter in the whole Cold War: the answer was always a
       utility airframe with missiles bolted to it, until Apache in 2004.
     stealthfighter / stealthbomber / gunshipair, e50 to e90 — none, ever.
     heavybomber — SETTLED, and no longer empty. The owner lifted the
       American-only rule by name, so the V-force is in heavyair.js beside the
       B-52: gbr_e50 Valiant B.1 with Blue Danube, gbr_e60 Vulcan B.2 with
       Blue Steel and Yellow Sun Mk.2, gbr_e80 Vulcan B.2 in the Black Buck
       conventional fit. e90 onward is EMPTY and always will be - 44 Squadron
       disbanded on 21 December 1982, 50 Squadron's Vulcan K.2 tankers went on
       31 March 1984, and the deterrent had already gone to sea with Polaris
       on 30 June 1969, which is gbr_e60_ssbn. The Victor gets no bomber row:
       its whole bomber career, November 1957 to 31 December 1968, sits inside
       two bands already held by an aircraft that arrived first and left later,
       and gbr_e60_tanker already carries it in the role it actually ended in.
     mlrs, e50 — nothing between Land Mattress in 1945 and Honest John in
       1960, and nothing again from 1976 until MLRS was bought in 1989.
     tel, e90 onward — Lance left in 1993 and nothing replaced it. Britain
       bought M270 without ATACMS, so from e00 the Royal Artillery's longest
       reach is a rocket and unitFor("gbr","tel", era) returns null.
     tankdestroyer, e00 — Striker/Swingfire withdrew in 2005 and the Ajax
       Overwatch ATGM variant was never fielded.                          */
Object.assign(UNITS, {
  gbr_e50_rifle: {"fac":"gbr","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Section","full":"British Rifle Section, L1A1 SLR","cost":70,"oil":0,"time":4,"hp":62,"armor":"infantry","speed":0.9,"turn":7,"sight":3.6,"r":6,"mass":0.1,"weapons":["w_e50_gbr_rifle"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1957","confidence":"high","desc":"The inch-pattern FN FAL, built at Enfield and deliberately restricted to semi-automatic because the Army did not trust automatic fire from a full-power cartridge. Section automatic weapon is the Bren, rebarrelled to 7.62mm as the L4. Korea was fought with the bolt-action No.4 Lee-Enfield.","turret":false},
  gbr_e50_at: {"fac":"gbr","role":"at","cat":"infantry","layer":"ground","name":"BAT 120mm","full":"L1 BAT 120mm Battalion Anti-Tank recoilless rifle","cost":195,"oil":0,"time":7,"hp":55,"armor":"infantry","speed":0.74,"turn":6,"sight":4.3,"r":6,"mass":0.1,"weapons":["w_e50_gbr_at"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1954","confidence":"medium","desc":"A 1,000kg wheeled recoilless gun firing HESH - a British speciality that cracks armour by shock rather than penetration. It is a battalion weapon, not a section one: at platoon level Britain still had the ENERGA rifle grenade and the last of the PIATs. MOBAT lightened it in 1962."},
  gbr_e50_mbt: {"fac":"gbr","role":"mbt","cat":"vehicle","layer":"ground","name":"Centurion Mk 3","full":"FV4007 Centurion Mk 3","cost":720,"oil":11,"time":18,"hp":980,"armor":"heavy","speed":1.2,"turn":1.4,"sight":5,"r":16,"mass":51,"weapons":["w_e50_gbr_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1948","confidence":"high","desc":"The best tank of the decade in any army. The 20-pounder is fully stabilised, which means it can shoot accurately on the move when the M48 cannot. Thirsty and short-legged - about 100km on internal fuel - which is why it always tows a monowheel fuel trailer. Rearmed with the 105mm L7 from 1959.","turret":true,"tturn":1.6,"crush":true},
  gbr_e50_heavy: {"fac":"gbr","role":"heavy","cat":"vehicle","layer":"ground","name":"Conqueror","full":"FV214 Conqueror Heavy Gun Tank","cost":1120,"oil":19,"time":25,"hp":1420,"armor":"heavy","speed":1,"turn":1.2,"sight":5.2,"r":18,"mass":66,"weapons":["w_e50_gbr_heavy"],"prereq":["factory","lab"],"tech":3,"from":"e50","to":"e60","service":"1955","confidence":"high","desc":"Built for one job: to out-range the IS-3 at 1,800m while the Centurions closed. 185 built, issued nine per regiment in Germany, gone by 1966. Two-piece ammunition and a hydraulic loading system that broke often. Its ranging gear and optics were excellent; everything mechanical about it was not.","turret":true,"tturn":1.2,"crush":true},
  gbr_e50_lighttank: {"fac":"gbr","role":"lighttank","cat":"vehicle","layer":"ground","name":"Saladin","full":"FV601 Alvis Saladin armoured car","cost":340,"oil":4,"time":9,"hp":300,"armor":"light","speed":2.2,"turn":2.6,"sight":4.8,"r":13,"mass":11,"weapons":["w_e50_gbr_lighttank"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1958","confidence":"high","desc":"Britain answered the light tank question with a six-wheeled armoured car carrying a 76mm gun, because wheels suited colonial policing and long road moves. It has no tracks and no pretence of holding ground - it is a gun that arrives quickly. Served with a dozen armies into the 1990s.","turret":true,"tturn":1.8},
  gbr_e50_ifv: {"fac":"gbr","role":"ifv","cat":"vehicle","layer":"ground","name":"Saracen","full":"FV603 Alvis Saracen APC","cost":400,"oil":5,"time":10,"hp":380,"armor":"light","speed":1.7,"turn":2.2,"sight":4.5,"r":14,"mass":11,"weapons":["w_e50_gbr_ifv"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"Rushed into production ahead of the Saladin it shares a chassis with, because Malaya needed a protected troop carrier immediately. Ten men, wheeled, no firing ports, no autocannon - a battlefield taxi. Still in Ulster streets thirty years later.","turret":true,"tturn":2,"cargo":6},
  gbr_e50_spg: {"fac":"gbr","role":"spg","cat":"vehicle","layer":"ground","name":"Sexton","full":"Sexton 25-pdr Self-Propelled, Ram chassis","cost":610,"oil":8,"time":15,"hp":360,"armor":"light","speed":1.2,"turn":1.5,"sight":3.3,"r":15,"mass":26,"weapons":["w_e50_gbr_spg"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1943","confidence":"high","desc":"A wartime holdover kept in service to 1956 because nothing replaced it: the FV3805 self-propelled 5.5in was cancelled and Britain fielded no new SP gun until the Abbot in 1965. Open-topped, 25-pounder, fast to lay by hand. Divisional artillery in this decade is mostly towed.","turret":false},
  gbr_e50_aa: {"fac":"gbr","role":"aa","cat":"infantry","layer":"ground","name":"Bofors L/70","full":"40mm Bofors L/70 light AA gun","cost":175,"oil":0,"time":6,"hp":50,"armor":"infantry","speed":0.7,"turn":6,"sight":5,"r":6,"mass":0.1,"weapons":["w_e50_gbr_aa"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1953","confidence":"medium","desc":"Towed, optically laid, with a Yellow Fever predictor if the battery is lucky. Britain's entire low-level air defence is this gun until Rapier arrives in 1971 - there is no self-propelled AA vehicle in the inventory at any point in this period."},
  gbr_e50_recon: {"fac":"gbr","role":"recon","cat":"vehicle","layer":"ground","name":"Ferret","full":"Daimler FV701 Ferret Scout Car Mk 2","cost":185,"oil":2,"time":5,"hp":175,"armor":"light","speed":2.45,"turn":3.2,"sight":5.7,"r":11,"mass":5,"weapons":["w_e50_gbr_recon"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1952","confidence":"high","desc":"Two men, four wheels, 4.4 tonnes, and a machine gun - the definition of reconnaissance by stealth rather than by fighting. Over 4,400 built and exported everywhere. Britain built the scout car America did not have; the US equivalent was a jeep with a radio.","turret":true,"tturn":2.4},
  gbr_e50_tankdestroyer: {"fac":"gbr","role":"tankdestroyer","cat":"vehicle","layer":"ground","name":"Hornet Malkara","full":"FV1620 Humber Hornet with Malkara ATGM","cost":620,"oil":7,"time":13,"hp":260,"armor":"light","speed":2.3,"turn":2.6,"sight":6.5,"r":13,"mass":6,"weapons":["w_e50_gbr_tankdestroyer"],"prereq":["factory","lab"],"tech":3,"from":"e50","to":"e50","service":"1958","confidence":"medium","desc":"An air-portable missile carrier for the Parachute Squadron RAC, and one of the first guided anti-tank vehicles in any Western army - the US had nothing comparable in service. The Australian-designed Malkara is enormous, slow and steered by joystick to the target; hitting a moving tank with it is unlikely.","turret":false},
  gbr_e50_sam: {"fac":"gbr","role":"sam","cat":"vehicle","layer":"ground","name":"Bloodhound Mk 1","full":"Bristol Bloodhound Mk 1 SAM site","cost":1750,"oil":24,"time":26,"hp":480,"armor":"light","speed":0.35,"turn":0.6,"sight":11,"r":16,"mass":8,"weapons":["sam_area1"],"prereq":["factory","radar","lab"],"tech":3,"from":"e50","to":"e50","service":"1958","confidence":"medium","desc":"Ramjet-powered, semi-active radar homing, sited in rings around the V-bomber airfields rather than moved with an army. Treat the mobility figure as fiction: this is a fixed installation that takes a working party and lorries to shift. Mk 2 of 1964 doubled the range and served until 1991.","turret":true,"tturn":0.5,"deploy":true,"deploySec":14,"radar":9,"radarQ":10,"rounds":2},
  gbr_e50_tel: {"fac":"gbr","role":"tel","cat":"vehicle","layer":"ground","name":"Corporal","full":"MGM-5 Corporal, 27 Guided Weapons Regiment RA","cost":2600,"oil":46,"time":36,"hp":430,"armor":"light","speed":0.82,"turn":0.8,"sight":24.4,"r":16,"mass":12,"weapons":["srbm_early"],"prereq":["factory","lab"],"tech":3,"from":"e50","to":"e50","service":"1957","confidence":"high","desc":"American missile, American warhead, British crew, two keys. It took hours to fuel and erect and was wildly inaccurate. Britain's own replacement, Blue Water, was cancelled in 1962 - after which the Army's battlefield nuclear rockets were all bought from the United States.","turret":false,"deploy":true,"deploySec":10,"rounds":1,"noAuto":true},
  gbr_e50_fighter: {"fac":"gbr","role":"fighter","cat":"aircraft","layer":"air","name":"Hunter F.6","full":"Hawker Hunter F.6","cost":620,"oil":13,"time":15,"hp":230,"armor":"air","speed":7.2,"turn":2.1,"sight":6.3,"r":15,"mass":0,"weapons":["w_e50_gbr_fighter"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1956","confidence":"high","desc":"Beautiful, and a better gun platform than the Sabre - four 30mm ADEN in a removable pack changed in minutes. Day fighter only, no radar missile. All-weather interception in this decade belongs to the Gloster Javelin (1956), the first delta-wing fighter in squadron service anywhere.","jet":true,"ammo":2,"radar":2.6,"radius":30,"rcs":0.6},
  gbr_e50_cas: {"fac":"gbr","role":"cas","cat":"aircraft","layer":"air","name":"Venom FB.4","full":"de Havilland Venom FB.4","cost":780,"oil":15,"time":19,"hp":300,"armor":"air","speed":5.6,"turn":1.7,"sight":5.2,"r":17,"mass":0,"weapons":["w_e50_gbr_cas"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1955","confidence":"medium","desc":"Wooden-winged descendant of the Vampire, flown in Malaya, Oman and over Suez. Cannon and rockets, no armour worth the name, and a reputation for shedding wings in a hard pull-out. The Hunter FGA.9 took the job over from 1960 and did it far better.","jet":true,"ammo":2,"radius":26,"rcs":0.7},
  gbr_e50_transport: {"fac":"gbr","role":"transport","cat":"aircraft","layer":"air","name":"Whirlwind HC.2","full":"Westland Whirlwind HAR.3/HC.2 (licensed S-55)","cost":400,"oil":6,"time":11,"hp":260,"armor":"air","speed":3.4,"turn":2.4,"sight":4.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"An American airframe built under licence at Yeovil, and Britain's first genuinely useful troop-lifting helicopter. Malaya is where the British Army learned air mobility - jungle clearings, casualty evacuation, resupply - a decade before Vietnam made the idea famous.","ammo":0,"hover":true,"cargo":6,"radius":20,"rcs":0.9},
  gbr_e50_airlift: {"fac":"gbr","role":"airlift","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":false,"turn":1.4,"sight":8,"r":20,"weapons":[],"prereq":["airbase"],"tech":1,"rcs":4.2,"radarQ":0,"gen":2,"name":"Beverley C.1","full":"Blackburn Beverley C.1","cost":1150,"oil":38,"time":20,"hp":600,"speed":2.6,"ammo":0,"radius":44,"cargo":6,"from":"e50","to":"e60","service":"1956","confidence":"high","desc":"Vast, slow, ugly, and able to put a 20-tonne load onto a short desert strip - which is exactly what an expeditionary air force needs. Boom-mounted tail with seats inside it. Retired 1967 when the Hercules arrived."},
  gbr_e50_tanker: {"fac":"gbr","role":"tanker","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":true,"turn":0.9,"sight":9,"r":22,"weapons":[],"prereq":["airbase","radar"],"tech":2,"rcs":4.4,"radarQ":0,"gen":2,"name":"Valiant BK.1","full":"Vickers Valiant BK.1 tanker","cost":2600,"oil":60,"time":34,"hp":620,"speed":4.2,"ammo":0,"radius":110,"tanker":300,"refuelRate":12,"from":"e50","to":"e50","service":"1958","confidence":"medium","desc":"The first of the V-bombers converted to the tanking role, 214 Squadron. Britain took air-to-air refuelling seriously earlier and more completely than most, because reinforcing Singapore or Cyprus by air demanded it. Grounded in 1965 with fatigue cracks in the wing spars."},
  gbr_e60_rifle: {"fac":"gbr","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Section","full":"British Rifle Section, L1A1 SLR and L7A1 GPMG","cost":88,"oil":0,"time":4,"hp":76,"armor":"infantry","speed":0.95,"turn":7,"sight":4.2,"r":6,"mass":0.1,"weapons":["w_e60_gbr_rifle"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1961","confidence":"high","desc":"The rifle does not change for twenty-eight years, but the section does: the belt-fed L7A1 GPMG replaces the Bren in 1961 and doubles its firepower. While America switched to the 5.56mm M16, Britain stayed with a heavy semi-automatic 7.62mm and argued it shot straighter. It did.","turret":false},
  gbr_e60_at: {"fac":"gbr","role":"at","cat":"infantry","layer":"ground","name":"Carl Gustav","full":"84mm L14A1 Carl Gustav medium anti-armour weapon","cost":240,"oil":0,"time":7,"hp":66,"armor":"infantry","speed":0.78,"turn":6,"sight":5,"r":6,"mass":0.1,"weapons":["w_e60_gbr_at"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1962","confidence":"high","desc":"Swedish, reloadable, two-man, 16kg - the platoon anti-tank weapon for thirty years. Behind it sits WOMBAT (1966), a 120mm recoilless rifle light enough for a Land Rover. MILAN, the wire-guided missile that finally gave the infantry a real chance against a T-72, arrives in 1978."},
  gbr_e60_mbt: {"fac":"gbr","role":"mbt","cat":"vehicle","layer":"ground","name":"Chieftain","full":"FV4201 Chieftain Mk 2","cost":940,"oil":15,"time":20,"hp":1290,"armor":"heavy","speed":1.1,"turn":1.35,"sight":5.8,"r":16,"mass":55,"weapons":["w_e60_gbr_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1967","confidence":"high","desc":"The best-protected and best-armed tank in NATO, and the slowest. The driver lies almost flat to cut the hull height. The 120mm L11 is rifled with separate bagged charges, so the ammunition will not cook off as one mass. The L60 engine was chronically unreliable for its whole life.","turret":true,"tturn":1.4,"crush":true},
  gbr_e60_lighttank: {"fac":"gbr","role":"lighttank","cat":"vehicle","layer":"ground","name":"Scorpion","full":"FV101 Scorpion CVR(T)","cost":400,"oil":4,"time":9,"hp":400,"armor":"light","speed":2.35,"turn":2.8,"sight":5.4,"r":13,"mass":8,"weapons":["w_e60_gbr_lighttank"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1972","confidence":"high","desc":"Eight tonnes of welded aluminium with a Jaguar car engine, a 76mm gun, and ground pressure lower than a walking man - it crosses ground no other tracked vehicle will. Two fit in a Hercules. Aluminium burns and gives no protection above heavy machine-gun fire; that was the accepted price.","turret":true,"tturn":1.8},
  gbr_e60_ifv: {"fac":"gbr","role":"ifv","cat":"vehicle","layer":"ground","name":"FV432","full":"FV432 Trojan armoured personnel carrier","cost":470,"oil":6,"time":11,"hp":500,"armor":"light","speed":1.5,"turn":2,"sight":4.9,"r":14,"mass":15,"weapons":["w_e60_gbr_ifv"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1963","confidence":"high","desc":"Britain's M113 - steel rather than aluminium, ten dismounts, and armed with nothing heavier than a pintle GPMG. It is explicitly a carrier, not a fighting vehicle: doctrine said the infantry get out to fight. The Marder and the BMP had already made that argument look dated.","turret":true,"tturn":2.2,"cargo":8},
  gbr_e60_spg: {"fac":"gbr","role":"spg","cat":"vehicle","layer":"ground","name":"Abbot","full":"FV433 Abbot 105mm Self-Propelled Gun","cost":760,"oil":10,"time":16,"hp":470,"armor":"light","speed":1.35,"turn":1.6,"sight":3.9,"r":15,"mass":17,"weapons":["w_e60_gbr_spg"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1965","confidence":"high","desc":"Fully enclosed turret, amphibious with a flotation screen, and a light 105mm firing a British round nobody else used. Chosen for a rate of fire of twelve rounds a minute rather than weight of shell - the divisional heavy work was done by American M109s bought alongside it.","turret":true,"tturn":1.1},
  gbr_e60_mlrs: {"fac":"gbr","role":"mlrs","cat":"vehicle","layer":"ground","name":"Honest John","full":"MGR-1 Honest John, 24 Missile Regiment RA","cost":1010,"oil":16,"time":24,"hp":365,"armor":"light","speed":1.12,"turn":1.3,"sight":3.3,"r":15,"mass":25,"weapons":["w_e50_nato_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e60","service":"1960","confidence":"medium","desc":"The same American rocket the US Army fired, held by the Royal Artillery under dual-key with US custody of the warheads. Britain had no rocket artillery of its own design at all: Honest John went in 1976 and nothing replaced it until MLRS was bought in 1989.","turret":true,"tturn":0.8},
  gbr_e60_aa: {"fac":"gbr","role":"aa","cat":"infantry","layer":"ground","name":"Blowpipe","full":"Shorts Blowpipe man-portable SAM","cost":210,"oil":0,"time":7,"hp":66,"armor":"infantry","speed":0.8,"turn":6,"sight":5.2,"r":6,"mass":0.1,"weapons":["w_e60_gbr_aa"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1975","confidence":"high","desc":"Command-guided by thumb joystick, which means the operator must fly the missile onto a jet while it flies at him. It could in theory engage head-on where an infrared Redeye could not; in the Falklands it achieved almost nothing. Replaced by SACLOS Javelin in 1984."},
  gbr_e60_recon: {"fac":"gbr","role":"recon","cat":"vehicle","layer":"ground","name":"Fox","full":"FV721 Fox CVR(W)","cost":290,"oil":3,"time":6,"hp":250,"armor":"light","speed":2.75,"turn":3.2,"sight":6.4,"r":11,"mass":6,"weapons":["w_e60_gbr_recon"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1973","confidence":"high","desc":"The Ferret's replacement: aluminium hull, air-portable, and armed with the 30mm Rarden - a gun designed to fire single aimed shots at 1,000m rather than spray, with the breech inside the turret so no fumes reach the crew. Very British, very accurate, very slow-firing.","turret":true,"tturn":2.2},
  gbr_e60_tankdestroyer: {"fac":"gbr","role":"tankdestroyer","cat":"vehicle","layer":"ground","name":"FV438 Swingfire","full":"FV438 Swingfire, twin launcher on FV432","cost":1020,"oil":12,"time":15,"hp":560,"armor":"light","speed":1.5,"turn":2,"sight":8.2,"r":13,"mass":16,"weapons":["w_e60_gbr_tankdestroyer"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1969","confidence":"high","desc":"Swingfire's trick is a separated sight: the missile can be launched from behind cover and gathered onto the line of sight afterwards, and the controller can sit up to 100m away from the vehicle on a cable. Four kilometres of range, and the vehicle need never show itself.","turret":false},
  gbr_e60_sam: {"fac":"gbr","role":"sam","cat":"vehicle","layer":"ground","name":"Rapier","full":"Rapier FSA towed launcher","cost":1450,"oil":18,"time":20,"hp":420,"armor":"light","speed":0.9,"turn":1.2,"sight":8.4,"r":15,"mass":1.2,"weapons":["sam_area1"],"prereq":["factory","radar"],"tech":3,"from":"e60","to":"e60","service":"1971","confidence":"high","desc":"'Hittile' - no proximity fuze, it is meant to strike the aircraft. Optically tracked by default with Blindfire radar added from 1979. Short-ranged point defence, not area cover; the long-range layer stays Bloodhound Mk 2 at fixed sites. The Army's Thunderbird went in 1977 with no successor.","turret":true,"tturn":1.4,"deploy":true,"deploySec":8,"radar":6,"radarQ":8,"rounds":4},
  gbr_e60_tel: {"fac":"gbr","role":"tel","cat":"vehicle","layer":"ground","name":"Lance","full":"MGM-52 Lance, 50 Missile Regiment RA","cost":2700,"oil":46,"time":35,"hp":470,"armor":"light","speed":1.5,"turn":1.1,"sight":22,"r":17,"mass":16,"weapons":["srbm_early"],"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e80","service":"1976","confidence":"high","desc":"American missile, American warheads, dual-key, tracked and genuinely mobile - a great improvement on Corporal. Britain designed no battlefield ballistic missile after Blue Water was cancelled in 1962; the national deterrent went to sea in Polaris instead. Lance withdrawn 1992.","turret":false,"deploy":true,"deploySec":5,"rounds":1,"noAuto":true},
  gbr_e60_radarv: {"fac":"gbr","role":"radarv","cat":"vehicle","layer":"ground","name":"Cymbeline","full":"FV436 with Cymbeline mortar-locating radar","cost":900,"oil":9,"time":14,"hp":470,"armor":"light","speed":1.5,"turn":1.8,"sight":7,"r":14,"mass":15,"weapons":[],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e90","service":"1975","confidence":"medium","desc":"A mortar-locating radar on an FV432 hull, and for twenty years the Royal Artillery's whole counter-battery sensor. It tracks a mortar bomb in flight and back-plots the baseplate. Against guns rather than mortars it is much weaker - that is a job Britain did not properly answer until MAMBA.","turret":true,"tturn":0.9,"radar":9,"radarQ":12},
  gbr_e60_fighter: {"fac":"gbr","role":"fighter","cat":"aircraft","layer":"air","name":"Lightning F.6","full":"English Electric Lightning F.6","cost":830,"oil":20,"time":17,"hp":250,"armor":"air","speed":8.6,"turn":2,"sight":7,"r":15,"mass":0,"weapons":["w_e60_gbr_fighter"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1965","confidence":"high","desc":"Two stacked Avons and a climb rate nothing else in NATO could match - it was built to reach a Soviet bomber over the North Sea in minutes and nothing else. Notice the radius: fuel is measured in minutes, not hours. Long-range work went to Phantom FGR.2s with Spey engines from 1969.","jet":true,"ammo":2,"radar":4,"radius":20,"rcs":0.6},
  gbr_e60_cas: {"fac":"gbr","role":"cas","cat":"aircraft","layer":"air","name":"Harrier GR.1","full":"Hawker Siddeley Harrier GR.1","cost":1080,"oil":20,"time":21,"hp":420,"armor":"air","speed":4.7,"turn":1.8,"sight":6,"r":17,"mass":0,"weapons":["w_e60_gbr_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e60","service":"1969","confidence":"high","desc":"The only vertical-takeoff combat aircraft any air force ever made work. It exists because NATO expected its runways to be cratered in the first hour: the Harrier hides in a German wood under camouflage nets and flies from a strip of matting. Small payload, short radius, unique.","jet":true,"ammo":4,"radius":22,"rcs":0.9},
  gbr_e60_gunship: {"fac":"gbr","role":"gunship","cat":"aircraft","layer":"air","name":"Scout AH.1","full":"Westland Scout AH.1 with SS.11 missiles","cost":700,"oil":11,"time":15,"hp":300,"armor":"air","speed":3,"turn":2.3,"sight":6.2,"r":16,"mass":0,"weapons":["w_e60_gbr_gunship"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1963","confidence":"medium","desc":"A four-seat liaison helicopter with four French wire-guided missiles bolted on and an observer aiming them through a roof sight. Britain never built a dedicated attack helicopter in the whole Cold War - the answer was always a utility airframe with missiles added.","ammo":4,"hover":true,"radius":20,"rcs":0.7},
  gbr_e60_transport: {"fac":"gbr","role":"transport","cat":"aircraft","layer":"air","name":"Wessex HU.5","full":"Westland Wessex HU.5","cost":500,"oil":8,"time":12,"hp":330,"armor":"air","speed":3.5,"turn":2.4,"sight":5.4,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1964","confidence":"high","desc":"Twin-Gnome development of the Sikorsky S-58, sixteen troops, flown hard by the Commando squadrons from Borneo to Belfast. Heavy lift came from the French-British Puma HC.1 in 1971 and, later, from the Chinook.","ammo":0,"hover":true,"cargo":8,"radius":24,"rcs":0.9},
  gbr_e60_airlift: {"fac":"gbr","role":"airlift","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":false,"turn":1.4,"sight":8,"r":20,"weapons":[],"prereq":["airbase"],"tech":1,"rcs":3.6,"radarQ":0,"gen":2,"name":"Hercules C.1","full":"Lockheed C-130K Hercules C.1","cost":1300,"oil":40,"time":21,"hp":590,"speed":3,"ammo":0,"radius":60,"cargo":6,"from":"e60","to":"e80","service":"1967","confidence":"high","desc":"Bought American after the Armstrong Whitworth AW.681 was cancelled in 1965, and re-engineered with British avionics at Cambridge. Sixty-six aircraft carried every British expeditionary operation for the next forty years."},
  gbr_e60_awacs: {"fac":"gbr","role":"awacs","cat":"aircraft","layer":"air","name":"Shackleton AEW.2","full":"Avro Shackleton AEW.2, 8 Squadron","cost":1450,"oil":34,"time":26,"hp":380,"armor":"air","speed":2.5,"turn":0.9,"sight":8.8,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e60","to":"e80","service":"1972","confidence":"high","desc":"Twelve piston-engined 1950s maritime aircraft fitted with AN/APS-20 radars taken out of retired Fairey Gannets - equipment already twenty years old on the day it entered service. It was meant to last five years and lasted nineteen, because Nimrod AEW.3 failed and was cancelled in 1986.","jet":false,"ammo":0,"radar":14,"radius":70,"rcs":4,"awacs":true},
  gbr_e80_ewair: {"fac":"gbr","role":"ewair","cat":"aircraft","layer":"air","name":"Nimrod R.1","full":"Hawker Siddeley Nimrod R.1, 51 Squadron","cost":2150,"oil":38,"time":29,"hp":480,"armor":"air","speed":4.20,"turn":1.0,"sight":11.5,"r":20,"mass":0,"weapons":[],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e00","service":"1974","confidence":"medium","desc":"Three aircraft, and they LISTEN rather than jam - the same distinction every French Gabriel entry in this file makes, and the reason this row belongs in ewair beside them. Aerials down a Comet fuselage, a crew of twenty-nine, no MAD boom on the tail to give it away as a maritime aircraft, and a collection fit still classified. Britain's electronic ATTACK capability ended with the Canberra T.17 and 360 Squadron on 31 October 1994 and has never come back. Retired 28 June 2011; the RC-135W took over in 2014.","jet":true,"ammo":0,"radar":13,"radarQ":18,"radius":62,"rcs":3.6,"noAuto":true},
  gbr_e60_ewair: {"fac":"gbr","role":"ewair","cat":"aircraft","layer":"air","name":"Canberra T.17","full":"BAC Canberra T.17, 360 Squadron","cost":1250,"oil":20,"time":22,"hp":300,"armor":"air","speed":5.6,"turn":1.8,"sight":8,"r":16,"mass":0,"weapons":[],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e80","service":"1966","confidence":"medium","desc":"Be honest about what this is: a jamming and chaff aircraft whose job was to train British air defences and ships, not to escort strike packages into a defended target. Britain had no equivalent of the Prowler or the Raven, and no anti-radiation missile at all until ALARM in 1991.","jet":true,"ammo":0,"radar":6,"radius":30,"rcs":1,"jam":6,"jamPower":0.7,"noAuto":true},
  gbr_e90_tanker: {"fac":"gbr","role":"tanker","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":true,"turn":0.9,"sight":9,"r":22,"weapons":[],"prereq":["airbase","radar"],"tech":2,"rcs":5,"radarQ":0,"gen":3.5,"name":"VC10 K.3","full":"Vickers VC10 K.2 and K.3, 101 Squadron","cost":3200,"oil":72,"time":38,"hp":720,"speed":4.60,"ammo":0,"radius":150,"tanker":430,"refuelRate":16,"from":"e90","to":"e90","service":"1984","confidence":"high","desc":"This band was empty, and the Victor row below it already says what filled it: five VC10 K.2 from 1984 and four K.3 from 1985, retired airliners rebuilt with three hose drums each. Probe and drogue only - no boom - so a British tanker cannot refuel an American fighter and an American tanker cannot refuel a Tornado without a pod. That coalition constraint has never gone away and is still true of the Voyager. Flown until 20 September 2013."},

  gbr_e00_tanker: {"fac":"gbr","role":"tanker","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":true,"turn":0.9,"sight":9,"r":22,"weapons":[],"prereq":["airbase","radar"],"tech":2,"rcs":5.2,"radarQ":0,"gen":3.8,"name":"TriStar KC.1","full":"Lockheed TriStar K.1 / KC.1, 216 Squadron","cost":3500,"oil":80,"time":40,"hp":820,"speed":4.50,"ammo":0,"radius":180,"tanker":620,"refuelRate":18,"from":"e00","to":"e00","service":"1986","confidence":"high","desc":"Nine wide-bodies bought second-hand from British Airways and Pan Am because the Falklands had shown how thin the tanker force was, and for twenty-five years the only British aircraft that could carry a squadron and its fuel to the same place. This is the air bridge to Basra and Kandahar. Withdrawn 24 March 2014; Voyager had already begun taking over in 2012."},
  gbr_e60_tanker: {"fac":"gbr","role":"tanker","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":true,"turn":0.9,"sight":9,"r":22,"weapons":[],"prereq":["airbase","radar"],"tech":2,"rcs":5,"radarQ":0,"gen":3,"name":"Victor K.1/K.2","full":"Handley Page Victor K.1 (1965) and K.2 (1974)","cost":3000,"oil":68,"time":38,"hp":700,"speed":4.6,"ammo":0,"radius":140,"tanker":400,"refuelRate":15,"from":"e60","to":"e80","service":"1965","confidence":"high","desc":"The third V-bomber, and the one the game keeps only as a tanker - its bomber career, November 1957 to 31 December 1968, falls entirely inside bands the Valiant and the Vulcan already hold. Converted to K.1 from 1965 because the Valiant tankers had just been grounded, and rebuilt as the K.2 from May 1974. Eleven Victors flew for every one Vulcan that bombed Port Stanley in 1982 - a 12,800km round trip that only existed because Britain kept a large tanker force. VC10 and TriStar tankers followed in the mid-1980s."},
  gbr_e80_rifle: {"fac":"gbr","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Section","full":"British Rifle Section, L85A1 and L86A1 LSW","cost":112,"oil":0,"time":4,"hp":90,"armor":"infantry","speed":1,"turn":7,"sight":5,"r":6,"mass":0.1,"weapons":["w_e80_gbr_rifle"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1987","confidence":"high","desc":"Bullpup, 5.56mm, and issued with a four-power SUSAT optical sight on every rifle when other armies still had iron sights - genuinely ahead. The weapon itself was not: magazines fell out, parts broke, and it took the 1997 L85A2 rebuild by Heckler & Koch to make it reliable.","turret":false},
  gbr_e80_at: {"fac":"gbr","role":"at","cat":"infantry","layer":"ground","name":"LAW 80","full":"94mm LAW 80 disposable anti-armour weapon","cost":295,"oil":0,"time":8,"hp":85,"armor":"infantry","speed":0.83,"turn":6,"sight":9.2,"r":6,"mass":0.1,"weapons":["w_e80_gbr_at"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1987","confidence":"high","desc":"Heavier than an AT4 at 10kg, and cleverer: a five-round 9mm spotting rifle is built in, so the firer confirms the range with a tracer strike before committing the rocket. The platoon's real tank-killer is MILAN, in service since 1978 and used to kill bunkers in the Falklands.","turret":false},
  gbr_e80_mbt: {"fac":"gbr","role":"mbt","cat":"vehicle","layer":"ground","name":"Challenger 1","full":"FV4030/4 Challenger 1","cost":1180,"oil":18,"time":22,"hp":1520,"armor":"heavy","speed":1.32,"turn":1.4,"sight":6.4,"r":16,"mass":62,"weapons":["w_e80_gbr_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1983","confidence":"high","desc":"Chobham composite armour, invented at Chertsey and licensed to the Americans and Germans. Britain kept the rifled 120mm when everyone else went smoothbore, because HESH is useful against buildings and the rifling gives accuracy. It won the Gulf tank-gunnery record at 5,100m.","turret":true,"tturn":1.4,"crush":true},
  gbr_e80_lighttank: {"fac":"gbr","role":"lighttank","cat":"vehicle","layer":"ground","name":"Scorpion","full":"FV101 Scorpion CVR(T)","cost":430,"oil":5,"time":9,"hp":420,"armor":"light","speed":2.35,"turn":2.8,"sight":5.6,"r":13,"mass":8,"weapons":["w_e60_gbr_lighttank"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1972","confidence":"high","desc":"Unchanged and still doing the job: it walked across East Falkland peat in 1982 where every wheeled vehicle bogged. No replacement was designed - the 76mm hulls were rebuilt as Sabre with a Rarden turret in the 1990s and the family soldiered on.","turret":true,"tturn":1.8},
  gbr_e80_ifv: {"fac":"gbr","role":"ifv","cat":"vehicle","layer":"ground","name":"Warrior","full":"FV510 Warrior MCV-80","cost":700,"oil":8,"time":13,"hp":690,"armor":"light","speed":1.75,"turn":2,"sight":6.3,"r":14,"mass":25,"weapons":["w_e80_gbr_ifv"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1988","confidence":"high","desc":"Twenty-five years after the FV432 the infantry finally get a fighting vehicle: aluminium hull, 30mm Rarden turret, seven dismounts, and fast enough to keep up with Challenger. No firing ports and no anti-tank missile - the section still dismounts to fight.","turret":true,"tturn":1.8,"cargo":7},
  gbr_e80_spg: {"fac":"gbr","role":"spg","cat":"vehicle","layer":"ground","name":"M109A2","full":"M109A2 155mm SPH in British service","cost":1095,"oil":15,"time":20,"hp":615,"armor":"light","speed":1.28,"turn":1.5,"sight":4.6,"r":15,"mass":39,"weapons":["w_e80_nato_spg"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1965","confidence":"medium","desc":"An honest gap: Britain's heavy self-propelled artillery in the 1980s is American. The M109 was bought in 1965 and the M110 203mm alongside it; the SP70 collaboration with Germany and Italy collapsed in 1986, and no British 155mm SP gun existed until AS-90 in 1993.","turret":true,"tturn":0.9},
  gbr_e80_mlrs: {"fac":"gbr","role":"mlrs","cat":"vehicle","layer":"ground","name":"M270 MLRS","full":"M270 MLRS, 39 Regiment Royal Artillery","cost":1605,"oil":25,"time":27,"hp":555,"armor":"light","speed":1.23,"turn":1.3,"sight":4.6,"r":15,"mass":25,"weapons":["w_e80_nato_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e80","to":"e80","service":"1989","confidence":"medium","desc":"Bought off the shelf and in service just in time for the Gulf. It ends a thirteen-year period in which the Royal Artillery had no rocket artillery whatsoever, from the retirement of Honest John in 1976.","turret":true,"tturn":0.8},
  gbr_e80_aa: {"fac":"gbr","role":"aa","cat":"infantry","layer":"ground","name":"Javelin","full":"Shorts Javelin S15 man-portable SAM","cost":250,"oil":0,"time":7,"hp":78,"armor":"infantry","speed":0.85,"turn":6,"sight":8.2,"r":6,"mass":0.1,"weapons":["w_e80_gbr_aa"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1984","confidence":"high","desc":"Blowpipe's flaw fixed: the operator now keeps the sight on the target and the missile flies itself onto the line, SACLOS instead of thumb-flying. Still not fire-and-forget - the firer must stand and track while under attack, which no infrared Stinger operator has to do.","turret":false},
  gbr_e80_recon: {"fac":"gbr","role":"recon","cat":"vehicle","layer":"ground","name":"Scimitar","full":"FV107 Scimitar CVR(T)","cost":330,"oil":4,"time":7,"hp":300,"armor":"light","speed":2.3,"turn":2.8,"sight":6.6,"r":11,"mass":8,"weapons":["w_e80_gbr_recon"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1974","confidence":"high","desc":"The Scorpion hull with the 30mm Rarden instead of the 76mm - the standard armoured reconnaissance vehicle of the British Army of the Rhine and still in use in Afghanistan thirty-five years later. Fast, quiet, tiny, and almost unarmoured.","turret":true,"tturn":2.2},
  gbr_e80_tankdestroyer: {"fac":"gbr","role":"tankdestroyer","cat":"vehicle","layer":"ground","name":"Striker","full":"FV102 Striker, five-round Swingfire launcher","cost":1080,"oil":13,"time":16,"hp":580,"armor":"light","speed":2.2,"turn":2.4,"sight":8.6,"r":13,"mass":8,"weapons":["w_e60_gbr_tankdestroyer"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1976","confidence":"medium","desc":"The same Swingfire missile on the CVR(T) hull: five ready rounds in a box that elevates from the rear deck, five reloads inside, and the ability to shoot from behind a ridge with the controller dismounted. Served until 2005.","turret":false},
  gbr_e80_sam: {"fac":"gbr","role":"sam","cat":"vehicle","layer":"ground","name":"Tracked Rapier","full":"Tracked Rapier on M548 chassis","cost":1680,"oil":21,"time":22,"hp":520,"armor":"light","speed":1.45,"turn":1.5,"sight":9.2,"r":15,"mass":14,"weapons":["sam_area1"],"prereq":["factory","radar"],"tech":3,"from":"e80","to":"e80","service":"1981","confidence":"medium","desc":"Rapier on tracks with eight ready rounds, built originally for an Iranian order that the revolution cancelled, and taken into British service to cover the armoured divisions. Blindfire radar gives it night and bad-weather capability. Still a point-defence weapon, not an area SAM.","turret":true,"tturn":1.6,"deploy":true,"deploySec":3,"radar":7,"radarQ":11,"rounds":8},
  gbr_e80_fighter: {"fac":"gbr","role":"fighter","cat":"aircraft","layer":"air","name":"Tornado F.3","full":"Panavia Tornado F.3 ADV","cost":1150,"oil":24,"time":20,"hp":340,"armor":"air","speed":8.2,"turn":1.7,"sight":9.6,"r":15,"mass":0,"weapons":["w_e80_gbr_fighter"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1987","confidence":"high","desc":"A long-range interceptor built for one problem - meeting Soviet maritime bombers far out over the North Atlantic - and poor at anything that turns. Swing wings, four Skyflash under the belly, huge endurance. The Foxhunter radar was so late that early aircraft flew with ballast in the nose.","jet":true,"ammo":5,"radar":6,"radius":60,"rcs":0.8,"refuelable":true},
  gbr_e80_cas: {"fac":"gbr","role":"cas","cat":"aircraft","layer":"air","name":"Harrier GR.5","full":"BAe Harrier GR.5 (AV-8B derivative)","cost":1380,"oil":25,"time":23,"hp":480,"armor":"air","speed":5,"turn":1.8,"sight":7.2,"r":17,"mass":0,"weapons":["w_e80_gbr_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1988","confidence":"high","desc":"Bigger composite wing, nearly double the payload of the GR.3, developed jointly with McDonnell Douglas. Deep strike in this decade belongs to the Tornado GR.1 (1982) with JP233 runway-cratering dispensers, and battlefield interdiction to the Jaguar GR.1 (1974).","jet":true,"ammo":7,"radius":28,"rcs":0.9,"refuelable":true},
  gbr_e80_gunship: {"fac":"gbr","role":"gunship","cat":"aircraft","layer":"air","name":"Lynx AH.1 (TOW)","full":"Westland Lynx AH.1 with eight TOW missiles","cost":1000,"oil":16,"time":17,"hp":420,"armor":"air","speed":4,"turn":2.5,"sight":9.6,"r":16,"mass":0,"weapons":["w_e80_gbr_gunship"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1981","confidence":"high","desc":"The fastest helicopter in the world when it was new, and the anti-tank arm of the Army Air Corps: eight American TOW missiles and a roof sight on a utility airframe. Britain still has no purpose-built attack helicopter - the Apache AH.1 does not arrive until 2004.","ammo":8,"hover":true,"radius":22,"rcs":0.7},
  gbr_e80_transport: {"fac":"gbr","role":"transport","cat":"aircraft","layer":"air","name":"Chinook HC.1","full":"Boeing Vertol Chinook HC.1","cost":900,"oil":15,"time":16,"hp":520,"armor":"air","speed":3.9,"turn":2.1,"sight":6.7,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1981","confidence":"high","desc":"Tandem rotors, forty troops or ten tonnes underslung. Three of the four sent south in 1982 went down with the Atlantic Conveyor; the survivor, Bravo November, carried the Falklands campaign on its own and is still flying.","ammo":0,"hover":true,"cargo":14,"radius":38,"rcs":1.6},
  gbr_e80_airlift: {"fac":"gbr","role":"airlift","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":false,"turn":1.4,"sight":8,"r":20,"weapons":[],"prereq":["airbase"],"tech":1,"rcs":3.8,"radarQ":0,"gen":2,"name":"Hercules C.3","full":"Lockheed C-130K Hercules C.3 (stretched)","cost":1400,"oil":42,"time":22,"hp":620,"speed":3.1,"ammo":0,"radius":62,"cargo":7,"from":"e80","to":"e80","service":"1980","confidence":"high","desc":"Thirty of the fleet stretched by 4.6m at Cambridge, and many fitted with refuelling probes during the Falklands emergency. Strategic outsize lift did not exist: Britain had no C-5 or C-17 equivalent and chartered Antonovs when it needed one."},
  gbr_e80_cfighter: {"fac":"gbr","role":"cfighter","cat":"aircraft","layer":"air","name":"Sea Harrier FRS.1","full":"BAe Sea Harrier FRS.1","cost":1250,"oil":24,"time":19,"hp":380,"armor":"air","speed":5.4,"turn":2.2,"sight":7.8,"r":16,"mass":0,"weapons":["w_e80_gbr_cfighter","w_e80_gbr_cstrike"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1980","confidence":"high","desc":"Twenty-eight aircraft flying from ski-jump decks with no airborne early warning behind them, and they lost none in air combat: around twenty-three Argentine aircraft shot down, mostly with AIM-9L. Subsonic, tiny radar, and Blue Fox was poor - the pilots and the missile made the difference.","jet":true,"ammo":4,"gen":3,"radar":4,"radarQ":6,"radius":22,"rcs":0.8,"carrierOnly":false,"carrierCapable":true,"refuelable":true},
  gbr_e90_rifle: {"fac":"gbr","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Section","full":"British Rifle Section, L85A1 SA80","cost":128,"oil":0,"time":5,"hp":100,"armor":"infantry","speed":1.02,"turn":7,"sight":5.6,"r":6,"mass":0.1,"weapons":["w_e90_gbr_rifle"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1987","confidence":"high","desc":"A bullpup with a 4x SUSAT optic on every rifle, which in 1991 put a British section ahead of armies still using iron sights. The rifle itself was the problem: magazines that shed rounds, furniture that broke, and jams in sand. Heckler & Koch rebuilt the whole fleet as the A2 from 2000."},
  gbr_e90_at: {"fac":"gbr","role":"at","cat":"infantry","layer":"ground","name":"Milan","full":"Milan 2 ATGM, with LAW 80 at section level","cost":290,"oil":0,"time":8,"hp":95,"armor":"infantry","speed":0.85,"turn":6,"sight":6.2,"r":6,"mass":0.1,"weapons":["w_e90_gbr_at"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1984","confidence":"high","desc":"Wire-guided SACLOS. The gunner holds the sight on the target for the whole flight and cannot move while the missile flies, which is the exact opposite of Javelin's shoot-and-scoot. Britain had no fire-and-forget infantry ATGM until 2005 - through the Gulf and the Balkans the anti-tank weapon was a wire."},
  gbr_e90_aa: {"fac":"gbr","role":"aa","cat":"infantry","layer":"ground","name":"Starstreak HVM","full":"Starstreak High Velocity Missile","cost":355,"oil":0,"time":9,"hp":95,"armor":"infantry","speed":0.86,"turn":6,"sight":7.0,"r":6,"mass":0.1,"weapons":["w_e90_gbr_aa"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1997","confidence":"high","desc":"The fastest surface-to-air missile in the world - above Mach 4 - and a genuine British signature. It splits into three tungsten darts that ride a laser beam, so there is no seeker to decoy and nothing to jam. The price is that it has no proximity fuse and must physically hit, and it cannot reach past line of sight."},
  gbr_e90_recon: {"fac":"gbr","role":"recon","cat":"vehicle","layer":"ground","name":"Land Rover WMIK","full":"Land Rover Defender 110 Weapons Mount Installation Kit","cost":300,"oil":4,"time":6,"hp":250,"armor":"light","speed":2.75,"turn":3.2,"sight":8.4,"r":11,"mass":4,"weapons":["w_e90_gbr_recon"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1998","confidence":"medium","desc":"A stripped Land Rover with a roll cage and two machine guns and no armour at all. When the Fox armoured car left service in 1994 the British Army stopped having a wheeled armoured reconnaissance vehicle entirely; formation recce rode in tracked Scimitars and everyone else drove this."},
  gbr_e90_ifv: {"fac":"gbr","role":"ifv","cat":"vehicle","layer":"ground","name":"Warrior","full":"FV510 Warrior MICV","cost":790,"oil":9,"time":13,"hp":750,"armor":"light","speed":1.70,"turn":2.0,"sight":6.8,"r":14,"mass":28,"weapons":["w_e90_gbr_ifv"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1988","confidence":"high","desc":"Aluminium hull, seven dismounts, and a 30mm Rarden fed by three-round clips - a deliberately slow, accurate cannon rather than a belt-fed autocannon. Note what is missing: Warrior carries no anti-tank missile of any kind, unlike Bradley or BMP, so it cannot fight armour and must be paired with Challenger.","turret":true,"tturn":1.8,"cargo":7},
  gbr_e90_lighttank: {"fac":"gbr","role":"lighttank","cat":"vehicle","layer":"ground","name":"Scimitar","full":"FV107 Scimitar CVR(T)","cost":560,"oil":7,"time":10,"hp":520,"armor":"light","speed":2.35,"turn":2.8,"sight":6.6,"r":12,"mass":8,"weapons":["w_e90_gbr_lighttank"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1971","confidence":"high","desc":"Eight tonnes of aluminium doing 80 km/h with ground pressure lower than a walking man's, built small enough that two fit in a Hercules. Where the US Army had no light armour at all after the Sheridan retired, Britain kept a whole tracked reconnaissance family in service - and it is thin enough that a heavy machine gun is a threat.","turret":true,"tturn":1.8},
  gbr_e90_tankdestroyer: {"fac":"gbr","role":"tankdestroyer","cat":"vehicle","layer":"ground","name":"Striker","full":"FV102 Striker with Swingfire","cost":1050,"oil":13,"time":15,"hp":560,"armor":"light","speed":2.10,"turn":2.3,"sight":8.2,"r":13,"mass":8,"weapons":["w_e90_gbr_tankdestroyer"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1975","confidence":"high","desc":"Five Swingfire missiles in a box that elevates over the hull. Its trick is a separated sight: the commander can dismount and guide the missile from up to a hundred metres away from the vehicle, so the launcher stays hidden behind the crest and only a periscope shows. Withdrawn in 2005 with nothing to replace it.","turret":false},
  gbr_e90_mbt: {"fac":"gbr","role":"mbt","cat":"vehicle","layer":"ground","name":"Challenger 1","full":"FV4030/4 Challenger 1","cost":1265,"oil":19,"time":21,"hp":1620,"armor":"heavy","speed":1.32,"turn":1.35,"sight":7.0,"r":16,"mass":62,"weapons":["w_e90_gbr_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1983","confidence":"high","desc":"Chobham armour and a 120mm L11A5 that is rifled, not smoothbore, because the British Army will not give up HESH. Under-powered and slow, and it lost the 1987 Canadian Army Trophy gunnery competition embarrassingly - then in 1991 Challenger 1s destroyed some 300 Iraqi vehicles for no losses, including the longest-range tank kill on record at about 5,100 metres.","turret":true,"tturn":1.3,"crush":true},
  gbr_e90_heavy: {"fac":"gbr","role":"heavy","cat":"vehicle","layer":"ground","name":"Challenger 2","full":"Challenger 2 (CR2)","cost":1560,"oil":24,"time":25,"hp":1900,"armor":"heavy","speed":1.35,"turn":1.35,"sight":7.6,"r":17,"mass":63,"weapons":["w_e90_gbr_heavy"],"prereq":["factory","lab"],"tech":3,"from":"e90","to":"e90","service":"1998","confidence":"high","desc":"A new tank behind a familiar silhouette: Dorchester armour, a proper thermal sight, and the L30A1 firing CHARM 3 depleted-uranium rod. Still rifled - the last rifled tank gun in NATO, which by the 2000s meant a shrinking ammunition industrial base of exactly one country. No Challenger 2 has ever been lost to enemy fire from the front.","turret":true,"tturn":1.35,"crush":true},
  gbr_e90_spg: {"fac":"gbr","role":"spg","cat":"vehicle","layer":"ground","name":"AS-90","full":"AS-90 Braveheart 155mm SPG","cost":1270,"oil":17,"time":21,"hp":700,"armor":"light","speed":1.30,"turn":1.5,"sight":5.0,"r":15,"mass":45,"weapons":["w_e90_gbr_spg"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1993","confidence":"high","desc":"Bought as a private venture after the collapse of the international SP70 programme, which is a rare case of the cheap fallback being the better outcome. Three rounds in ten seconds from an autoloaded 39-calibre gun, and it replaced both the Abbot and the towed FH-70 in one move.","turret":true,"tturn":0.9},
  gbr_e90_mlrs: {"fac":"gbr","role":"mlrs","cat":"vehicle","layer":"ground","name":"M270 MLRS","full":"M270 MLRS, Royal Artillery","cost":1830,"oil":28,"time":27,"hp":625,"armor":"light","speed":1.27,"turn":1.3,"sight":5.1,"r":15,"mass":25,"weapons":["w_e90_gbr_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e90","to":"e90","service":"1989","confidence":"high","desc":"The same American launcher, bought off the shelf and used hard: in 1991 the Iraqi army called the twelve-rocket ripple the Grid Square Removal Service. Britain never bought ATACMS with it, so unlike the US Army the launcher is a rocket system only - there is no deep-strike missile behind it.","turret":true,"tturn":0.8},
  gbr_e90_spaag: {"fac":"gbr","role":"spaag","cat":"vehicle","layer":"ground","name":"Stormer HVM","full":"FV4333 Stormer with Starstreak HVM","cost":880,"oil":12,"time":14,"hp":620,"armor":"light","speed":1.85,"turn":2.1,"sight":8.4,"r":13,"mass":13,"weapons":["w_e90_gbr_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1997","confidence":"high","desc":"Eight Starstreak ready to fire on a tracked hull, cued by a passive infrared alerting device rather than a radar - it never emits, so an anti-radiation missile has nothing to home on. Two honest weaknesses: it cannot engage a ground target at all, and its 7km reach is a third of a Tunguska's. Britain has fielded no anti-aircraft gun since the 1970s.","turret":true,"tturn":2.8,"radar":0},
  gbr_e90_fighter: {"fac":"gbr","role":"fighter","cat":"aircraft","layer":"air","name":"Tornado F3","full":"Panavia Tornado F.3 ADV","cost":1150,"oil":25,"time":19,"hp":400,"armor":"air","speed":7.90,"turn":1.5,"sight":8.6,"r":15,"mass":0,"weapons":["w_e90_gbr_fighter"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1986","confidence":"high","desc":"Built for one job - loitering for hours over the North Sea shooting down Soviet bombers - and poor at anything else. Its Foxhunter radar arrived so late that the first aircraft flew with concrete ballast in the nose instead. Long legs and four Skyflash; do not expect it to turn with a Fulcrum.","jet":true,"ammo":4,"radar":4.6,"radius":44,"rcs":0.8},
  gbr_e90_cas: {"fac":"gbr","role":"cas","cat":"aircraft","layer":"air","name":"Harrier GR7","full":"BAe/McDonnell Douglas Harrier GR.7","cost":1490,"oil":30,"time":24,"hp":560,"armor":"air","speed":5.00,"turn":1.7,"sight":7.8,"r":16,"mass":0,"weapons":["w_e90_gbr_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1990","confidence":"high","desc":"Vertical landing bought at the cost of range and payload: the Harrier's radius is roughly half a Tornado's, and that is the trade. Night-capable from the GR7 with FLIR and NVG compatibility. Its real value is basing - it flies from a strip, a clearing or a deck that no other fast jet can use.","jet":true,"ammo":4,"radius":22,"rcs":0.9},
  gbr_e90_sead: {"fac":"gbr","role":"sead","cat":"aircraft","layer":"air","name":"Tornado GR1 / ALARM","full":"Tornado GR.1 with Air Launched Anti-Radiation Missile","cost":1580,"oil":30,"time":23,"hp":480,"armor":"air","speed":8.00,"turn":1.7,"sight":9.6,"r":16,"mass":0,"weapons":["w_e90_gbr_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"ALARM is a different idea from HARM and a properly British one: if the radar shuts down, the missile climbs, deploys a parachute and hangs at altitude for minutes waiting for it to switch back on. First fired in the Gulf in January 1991. Britain has no dedicated Weasel airframe - it is an ordinary strike Tornado carrying a clever missile.","jet":true,"ammo":3,"radar":4.4,"radius":40,"rcs":0.85},
  gbr_e90_gunship: {"fac":"gbr","role":"gunship","cat":"aircraft","layer":"air","name":"Lynx AH7 / TOW","full":"Westland Lynx AH.7 with 8x BGM-71 TOW","cost":950,"oil":15,"time":16,"hp":380,"armor":"air","speed":3.90,"turn":2.6,"sight":7.4,"r":14,"mass":0,"weapons":["w_e90_gbr_gunship"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1985","confidence":"high","desc":"Britain had no purpose-built attack helicopter in this era at all. The anti-tank job went to a utility Lynx with eight TOW on outriggers - unarmoured, no turreted gun, no mast sight, and the gunner must hold the crosshair on the target through the whole missile flight. It is also the fastest helicopter in the world, which is the one thing in its favour.","ammo":8,"hover":true,"radius":20,"rcs":0.7},
  gbr_e90_transport: {"fac":"gbr","role":"transport","cat":"aircraft","layer":"air","name":"Chinook HC2","full":"Boeing Chinook HC.2","cost":1120,"oil":18,"time":17,"hp":620,"armor":"air","speed":4.10,"turn":1.9,"sight":7.0,"r":17,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1993","confidence":"high","desc":"Britain's battlefield lift is a tandem-rotor heavy, not a Black Hawk - it carries roughly twice a Puma's load and has been the single most demanded aircraft in every British operation since the Falklands. There have never been enough of them.","ammo":0,"hover":true,"cargo":14,"radius":40,"rcs":1.6},
  gbr_e90_awacs: {"fac":"gbr","role":"awacs","cat":"aircraft","layer":"air","name":"E-3D Sentry AEW1","full":"Boeing E-3D Sentry AEW.1","cost":2870,"oil":58,"time":32,"hp":540,"armor":"air","speed":4.10,"turn":0.9,"sight":14.2,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"Seven aircraft, bought after the Nimrod AEW3 programme was cancelled in 1986 having spent a billion pounds on a radar that could not be made to work. The E-3D is the same rotodome as the American Sentry with British engines and a refuelling probe.","jet":true,"ammo":0,"radar":30,"radius":68,"rcs":3.2},
  gbr_e90_airlift: {"fac":"gbr","role":"airlift","cat":"aircraft","layer":"air","name":"Hercules C3","full":"Lockheed C-130K Hercules C.1/C.3","cost":1400,"oil":36,"time":21,"hp":640,"armor":"air","speed":3.20,"turn":1.4,"sight":8,"r":20,"mass":0,"weapons":[],"prereq":["airbase"],"tech":1,"from":"e90","to":"e90","service":"1967","confidence":"high","desc":"The C.3 is the stretched British mark, cut and re-joined with two extra fuselage plugs. Until 2001 this was the whole of British airlift - anything that would not fit in a Hercules went by ship or was chartered from a Ukrainian Antonov operator.","cargo":8,"radius":54,"rcs":3.6},
  gbr_e90_sam: {"fac":"gbr","role":"sam","cat":"vehicle","layer":"ground","name":"Rapier FSC","full":"Rapier Field Standard C, Royal Artillery","cost":1350,"oil":18,"time":20,"hp":420,"armor":"light","speed":1.15,"turn":1.2,"sight":8.6,"r":14,"mass":14,"weapons":["sam_veh"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1996","confidence":"high","desc":"Eight missiles, a Dagger surveillance radar and a Blindfire tracker, and a hit-to-kill round with no proximity fuse. State the gap plainly: when Bloodhound Mk2 retired in 1991 Britain gave up long-range surface-to-air missiles entirely. From that year to this there has been no British equivalent of Patriot or S-300 - only point defence, and no ballistic-missile defence of any kind.","turret":true,"tturn":1.4,"deploy":true,"deploySec":5.0,"radar":8,"radarQ":12,"rounds":8},
  gbr_e90_tel: {"fac":"gbr","role":"tel","cat":"vehicle","layer":"ground","name":"Lance","full":"MGM-52C Lance, 50 Missile Regiment RA","cost":2100,"oil":40,"time":28,"hp":560,"armor":"light","speed":1.50,"turn":1.4,"sight":5.0,"r":15,"mass":16,"weapons":["srbm_short"],"prereq":["factory","lab","radar"],"tech":3,"from":"e90","to":"e90","service":"1976","confidence":"medium","desc":"The last British Army surface-to-surface missile. 50 Missile Regiment Royal Artillery held Lance until 1993 with American W70 warheads under dual-key control, and when it disbanded Britain's entire land-based deep strike went with it. Nothing has replaced it - the Royal Artillery's longest reach since 1993 is a GMLRS rocket.","deploy":true,"deploySec":4.0,"rounds":1,"turret":false},
  gbr_e00_rifle: {"fac":"gbr","role":"rifle","cat":"infantry","layer":"ground","name":"Rifle Section","full":"British Rifle Section, L85A2","cost":142,"oil":0,"time":5,"hp":110,"armor":"infantry","speed":1.03,"turn":7,"sight":5.9,"r":6,"mass":0.1,"weapons":["w_e00_gbr_rifle"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2002","confidence":"high","desc":"Heckler & Koch rebuilt roughly 200,000 rifles between 2000 and 2002 - new bolt, extractor, magazine and gas parts - and turned the most criticised rifle in NATO into one of the most reliable. The L85A3 of 2018 adds a flat-top rail and a lighter upper receiver."},
  gbr_e00_at: {"fac":"gbr","role":"at","cat":"infantry","layer":"ground","name":"Javelin / NLAW","full":"FGM-148 Javelin (2005) and NLAW (2009)","cost":372,"oil":0,"time":9,"hp":100,"armor":"infantry","speed":0.87,"turn":6,"sight":7.0,"r":6,"mass":0.1,"weapons":["w_e00_gbr_at"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2005","confidence":"high","desc":"Britain finally gets fire-and-forget, nine years after the US Army. NLAW alongside it is the more interesting weapon: a 12.5kg disposable tube that the gunner aims by tracking the target for a few seconds before firing, then flies a metre above the tank and fires downward through the roof, with no seeker at all to jam."},
  gbr_e00_aa: {"fac":"gbr","role":"aa","cat":"infantry","layer":"ground","name":"Starstreak HVM","full":"Starstreak HVM, lightweight multiple launcher","cost":390,"oil":0,"time":9,"hp":100,"armor":"infantry","speed":0.87,"turn":6,"sight":7.4,"r":6,"mass":0.1,"weapons":["w_e00_gbr_aa"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"1997","confidence":"high","desc":"Unchanged and still the fastest SAM anywhere. Its laser beam-riding guidance makes it effectively immune to flares, DIRCM and jamming, which is why it was one of the few Western air-defence systems sent to Ukraine that worked immediately against helicopters and cruise missiles."},
  gbr_e00_recon: {"fac":"gbr","role":"recon","cat":"vehicle","layer":"ground","name":"Jackal","full":"Jackal 2 MWMIK (Supacat HMT400)","cost":372,"oil":5,"time":7,"hp":300,"armor":"light","speed":2.85,"turn":3.2,"sight":9.0,"r":11,"mass":7,"weapons":["w_e00_gbr_recon"],"prehmm":[],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2008","confidence":"high","desc":"An air-suspension patrol vehicle bought urgently for Afghanistan, deliberately open-topped so the crew can see and hear - the argument being that spotting the ambush beats surviving it. Foxhound (2012) is the opposite bet: a fully protected 4x4 pod for the same job. Britain fielded both and never resolved the argument.","turret":true,"tturn":2.4},
  gbr_e00_ifv: {"fac":"gbr","role":"ifv","cat":"vehicle","layer":"ground","name":"Warrior","full":"FV510 Warrior, TES fit","cost":830,"oil":10,"time":14,"hp":800,"armor":"light","speed":1.71,"turn":2.0,"sight":7.0,"r":14,"mass":32,"weapons":["w_e00_gbr_ifv"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"1988","confidence":"high","desc":"The same vehicle with bar armour and applique bolted on for Iraq and Afghanistan. The Warrior Capability Sustainment Programme, which would have given it a stabilised 40mm turret that could fire on the move, ran for a decade and was cancelled in March 2021 after about 430 million pounds. So the gun is still a manually stabilised 1980s Rarden.","turret":true,"tturn":1.7,"cargo":6},
  gbr_e00_lighttank: {"fac":"gbr","role":"lighttank","cat":"vehicle","layer":"ground","name":"Scimitar Mk2","full":"FV107 Scimitar Mk2 (CVR(T) rebuild)","cost":600,"oil":8,"time":10,"hp":560,"armor":"light","speed":2.30,"turn":2.8,"sight":6.9,"r":12,"mass":11,"weapons":["w_e00_gbr_lighttank"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2010","confidence":"medium","desc":"Forty-year-old hulls rebuilt for Afghanistan with a Spartan chassis, a mine-blast floor and a diesel engine. The Rarden gun is unchanged. Its replacement, Ajax, was ordered in 2014 and did not reach initial operating capability until 2025 after vibration and noise defects injured crews and stopped trials twice.","turret":true,"tturn":1.8},
  gbr_e00_mbt: {"fac":"gbr","role":"mbt","cat":"vehicle","layer":"ground","name":"Challenger 2","full":"Challenger 2","cost":1420,"oil":21,"time":22,"hp":1780,"armor":"heavy","speed":1.36,"turn":1.4,"sight":7.8,"r":16,"mass":63,"weapons":["w_e00_gbr_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"1998","confidence":"high","desc":"The fleet standard from 2000 and the tank of Basra in 2003. One Challenger 2 there took roughly seventy RPG hits and a MILAN and drove out; the only total loss in British service was to another Challenger 2. Against that, the fleet shrank from 386 to 227 to 148, and the gun and engine have not changed since 1998.","turret":true,"tturn":1.4,"crush":true},
  gbr_e00_heavy: {"fac":"gbr","role":"heavy","cat":"vehicle","layer":"ground","name":"Challenger 2 TES","full":"Challenger 2 Theatre Entry Standard (Megatron)","cost":1720,"oil":27,"time":27,"hp":2080,"armor":"heavy","speed":1.24,"turn":1.25,"sight":7.9,"r":17,"mass":75,"weapons":["w_e00_gbr_heavy"],"prereq":["factory","lab"],"tech":3,"from":"e00","to":"e00","service":"2009","confidence":"medium","desc":"The urban survivability fit the crews nicknamed Megatron: Chobham side armour, bar armour, a remote weapon station and mine protection, which pushes it past 75 tonnes and costs it most of its mobility. The same trade as the American TUSK kit, and the same lesson from the same two wars.","turret":true,"tturn":1.4,"crush":true},
  gbr_e00_spg: {"fac":"gbr","role":"spg","cat":"vehicle","layer":"ground","name":"AS-90","full":"AS-90 155mm SPG","cost":1390,"oil":19,"time":22,"hp":740,"armor":"light","speed":1.31,"turn":1.5,"sight":5.2,"r":15,"mass":45,"weapons":["w_e00_gbr_spg"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"1993","confidence":"high","desc":"Unchanged, and that is the point. The Braveheart upgrade that would have given it a 52-calibre barrel and modular charges was cancelled in 2002 after the charge system failed, so British 155mm range stayed at roughly 25km while other armies moved to 40. No British self-propelled gun entered service between 1993 and 2024.","turret":true,"tturn":0.9},
  gbr_e00_mlrs: {"fac":"gbr","role":"mlrs","cat":"vehicle","layer":"ground","name":"M270B1 GMLRS","full":"M270B1 with Guided MLRS","cost":2020,"oil":31,"time":28,"hp":670,"armor":"light","speed":1.29,"turn":1.3,"sight":5.3,"r":15,"mass":25,"weapons":["w_e00_gbr_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e00","to":"e00","service":"2007","confidence":"high","desc":"British gunners fired the first GMLRS rockets in anger in Afghanistan in 2007 and called it the 70km sniper: one GPS-guided rocket onto one compound, where the unguided M26 would have covered a grid square. The same launcher, an entirely different weapon.","turret":true,"tturn":0.8},
  gbr_e00_spaag: {"fac":"gbr","role":"spaag","cat":"vehicle","layer":"ground","name":"Stormer HVM","full":"Stormer HVM with ADAD passive sight","cost":950,"oil":13,"time":15,"hp":660,"armor":"light","speed":1.86,"turn":2.1,"sight":8.8,"r":13,"mass":13,"weapons":["w_e00_gbr_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"1997","confidence":"high","desc":"Still the only tracked air-defence vehicle in the British Army and still gunless. Where the US Army's short-range air defence collapsed to a Humvee with Stingers, Britain at least kept an armoured tracked launcher in an armoured brigade - but with a 7km ceiling, no radar and no ability to shoot back at anything on the ground.","turret":true,"tturn":2.8,"radar":0},
  gbr_e00_radarv: {"fac":"gbr","role":"radarv","cat":"vehicle","layer":"ground","name":"MAMBA","full":"MAMBA (Saab ARTHUR) weapon locating radar","cost":1090,"oil":11,"time":16,"hp":470,"armor":"light","speed":1.70,"turn":1.8,"sight":8.4,"r":14,"mass":15,"weapons":[],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e20","service":"2003","confidence":"medium","desc":"A Swedish ARTHUR on a Bv206 tracked carrier, bought as an urgent requirement for Iraq and kept. It back-plots mortar and rocket trajectories to the firing point in seconds, which is what makes counter-battery fire possible - and in Basra and Helmand it spent most of its life warning of incoming rather than directing return fire.","turret":true,"tturn":0.9,"radar":13.8},
  gbr_e00_fighter: {"fac":"gbr","role":"fighter","cat":"aircraft","layer":"air","name":"Typhoon FGR4","full":"Eurofighter Typhoon FGR.4","cost":1310,"oil":28,"time":20,"hp":420,"armor":"air","speed":8.60,"turn":2.1,"sight":10.2,"r":15,"mass":0,"weapons":["w_e00_gbr_fighter"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2003","confidence":"high","desc":"Canard-delta, supercruise, and the best instantaneous turn of any Western fourth-generation fighter. Air-to-air only until the 2007 multirole clearance, and it kept a mechanically scanned Captor-M radar long after the F-16 and Rafale went active-array - the ECRS Mk2 AESA is still not in service. Meteor from 2018 gives it the longest-reaching air-to-air missile in NATO.","jet":true,"ammo":4,"radar":5.6,"radius":38,"rcs":0.6},
  gbr_e00_cas: {"fac":"gbr","role":"cas","cat":"aircraft","layer":"air","name":"Tornado GR4","full":"Panavia Tornado GR.4","cost":1750,"oil":34,"time":25,"hp":600,"armor":"air","speed":6.20,"turn":1.6,"sight":8.6,"r":17,"mass":0,"weapons":["w_e00_gbr_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"1998","confidence":"high","desc":"Two crew, terrain-following at 200 feet, and the aircraft that carried Brimstone and Paveway IV over Iraq, Afghanistan and Libya. Brimstone is the notable weapon: a millimetre-wave seeker accurate enough to hit one moving vehicle in a convoy, and repeatedly the only Western weapon cleared for targets that close to civilians. Retired in March 2019.","jet":true,"ammo":5,"radius":36,"rcs":1.1},
  gbr_e00_sead: {"fac":"gbr","role":"sead","cat":"aircraft","layer":"air","name":"Tornado GR4 / ALARM","full":"Tornado GR.4 with ALARM","cost":1690,"oil":31,"time":24,"hp":600,"armor":"air","speed":6.20,"turn":1.6,"sight":9.8,"r":16,"mass":0,"weapons":["w_e00_gbr_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e00","to":"e00","service":"1998","confidence":"high","desc":"The last British SEAD capability. ALARM was withdrawn from service in 2013 and nothing replaced it - no anti-radiation missile has been in British service since, and the RAF now relies on allied Growlers and Wild Weasels to open defended airspace. Place this entry knowing it ends mid-era.","jet":true,"ammo":3,"radar":5.0,"radius":36,"rcs":1.1},
  gbr_e00_stealthfighter: {"fac":"gbr","role":"stealthfighter","cat":"aircraft","layer":"air","name":"(none)","full":"No British stealth fighter in this period","cost":2470,"oil":46,"time":33,"hp":490,"armor":"air","speed":9.10,"turn":2.3,"sight":12.0,"r":16,"mass":0,"weapons":["w_e00_gbr_stealthfighter"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"2018","confidence":"high","desc":"Britain flew the Harrier GR7 and GR9 through the 2000s. The F-35B did not reach British initial operating capability until 2018.","jet":true,"ammo":4,"radius":40,"rcs":0.6},
  gbr_e00_gunship: {"fac":"gbr","role":"gunship","cat":"aircraft","layer":"air","name":"Apache AH1","full":"Westland WAH-64D Apache AH.1","cost":1480,"oil":24,"time":22,"hp":580,"armor":"air","speed":3.50,"turn":2.2,"sight":9.0,"r":16,"mass":0,"weapons":["w_e00_gbr_gunship"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2004","confidence":"high","desc":"Britain's first real attack helicopter, licence-built at Yeovil with Rolls-Royce engines and a folding rotor for shipboard use. It went straight from a troubled introduction - more airframes than trained crews for years - to Helmand, where in 2007 four Marines rode strapped to the stub wings to recover a body under fire.","ammo":8,"hover":true,"radius":24,"rcs":0.75},
  gbr_e00_transport: {"fac":"gbr","role":"transport","cat":"aircraft","layer":"air","name":"Chinook HC4","full":"Boeing Chinook HC.4","cost":1230,"oil":19,"time":18,"hp":660,"armor":"air","speed":4.15,"turn":1.9,"sight":7.4,"r":17,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2011","confidence":"medium","desc":"Digital cockpit and Afghanistan fit. The Chinook HC.3 story is worth the entry on its own: eight special-forces aircraft bought in 1995 for 259 million pounds and grounded for a decade because the Ministry of Defence had no access to the flight-control software source code, then rebuilt to HC.5 standard in 2010.","ammo":0,"hover":true,"cargo":14,"radius":40,"rcs":1.6},
  gbr_e00_awacs: {"fac":"gbr","role":"awacs","cat":"aircraft","layer":"air","name":"E-3D Sentry AEW1","full":"Boeing E-3D Sentry AEW.1 (retired 2021)","cost":3150,"oil":64,"time":33,"hp":580,"armor":"air","speed":4.15,"turn":0.9,"sight":14.8,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"1991","confidence":"high","desc":"Never given the American Block 40/45 upgrade, run down to three flyable aircraft, and withdrawn in 2021 with the Wedgetail replacement years away - so Britain had no airborne early warning aircraft of its own at all between 2021 and 2025.","jet":true,"ammo":0,"radar":30,"radius":66,"rcs":3.2},
  gbr_e00_airlift: {"fac":"gbr","role":"airlift","cat":"aircraft","layer":"air","name":"C-17 Globemaster III","full":"Boeing C-17A Globemaster III","cost":2450,"oil":58,"time":30,"hp":820,"armor":"air","speed":4.30,"turn":1.0,"sight":8.5,"r":24,"mass":0,"weapons":[],"prereq":["airbase","radar"],"tech":2,"from":"e00","to":"e00","service":"2001","confidence":"high","desc":"Four leased in 2001 because the A400M was late, then bought outright and grown to eight. One C-17 lifts a Challenger 2; nothing else in British service can. Eight aircraft is a very small strategic fleet, and every British deployment since Iraq has been shaped by that number.","jet":true,"ammo":0,"cargo":20,"radius":120,"rcs":5.0},
  gbr_e00_sam: {"fac":"gbr","role":"sam","cat":"vehicle","layer":"ground","name":"Rapier FSC","full":"Rapier FSC (in service to 2021)","cost":1420,"oil":19,"time":20,"hp":450,"armor":"light","speed":1.16,"turn":1.2,"sight":8.8,"r":14,"mass":14,"weapons":["sam_veh"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"1996","confidence":"high","desc":"Still Rapier, twenty-five years on, and still the outer edge of British ground-based air defence - about 8km. It defended the London Olympics in 2012 from a tower block roof. The long-range and anti-ballistic layer that the US, Russia, China and now several NATO states all field simply does not exist in the British inventory.","turret":true,"tturn":1.4,"deploy":true,"deploySec":5.0,"radar":8.4,"radarQ":13,"rounds":8},
});

/* ===================== FRENCH ARMED FORCES — era weapons, e50 to e00 =====================
   Ids follow the w_<era>_<fac>_<role> pattern, so the era-range normaliser at
   the foot of generations.js rewrites `range` for the at, tankdestroyer,
   gunship, aa, spaag, mlrs and spg roles to a per-era constant every army
   shares. That is right for those roles — the decade sets the reach, not the
   nation — and it is why the AuF1's and CAESAR's real tube advantages live in
   the unit cards rather than in a range number that would be flattened.
   Where France bought the article outright the row is omitted on purpose and
   the unit points at an existing key: Pluton and Hades ride srbm_short and a
   bespoke ballistic row, the Hawk battery rides sam_area2 and SAMP/T
   sam_area3, exactly as the American and British launchers do.
   The French deltas elsewhere are deliberate: an oscillating-turret revolver
   autoloader fires two rounds fast and then reloads for a very long time, a
   low-pressure 90 mm buys shaped-charge lethality and pays in muzzle
   velocity, and the DEFA 30 mm is a heavier, slower-firing gun than an
   American M39 or a Soviet NR-30.                                        */
Object.assign(WEAPONS, {
 "w_e50_fra_rifle": {"name":"MAS 49/56 7.5x54mm semi-automatic rifle","dmg":6,"warhead":"bullet","range":3.9,"reload":1.55,"burst":2,"burstDelay":0.09,"acc":0.55,"proj":"bullet","speed":0,"suppress":5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_fra_at": {"name":"LRAC 73mm Mle 50 rocket launcher","dmg":52,"warhead":"heat","range":4.8,"minRange":0.8,"reload":7.1,"burst":1,"acc":0.6,"proj":"missile","speed":330,"aoe":0.7,"suppress":13,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_fra_mbt": {"name":"90mm M36 gun (M47 Patton)","dmg":56,"warhead":"cannon","range":5.6,"reload":5.2,"burst":1,"acc":0.6,"proj":"shell","speed":810,"aoe":0.7,"suppress":18,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_fra_lighttank": {"name":"75mm CN 75-50 in a 12-round revolver autoloader","dmg":34,"warhead":"cannon","range":5.1,"reload":9.4,"burst":2,"burstDelay":0.55,"acc":0.58,"proj":"shell","speed":1000,"aoe":0.5,"suppress":16,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_fra_ifv": {"name":"7.5mm AA-52 in an open ring mount","dmg":6,"warhead":"bullet","range":3.8,"reload":2.1,"burst":6,"burstDelay":0.07,"acc":0.46,"proj":"bullet","speed":0,"suppress":9,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_fra_spg": {"name":"105mm Mle 50 howitzer, limited traverse","dmg":62,"warhead":"frag","range":10.4,"minRange":2.9,"reload":11.8,"burst":1,"acc":0.24,"proj":"arc","speed":200,"aoe":2.2,"suppress":48,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_fra_aa": {"name":"40mm Bofors L/60 on a towed carriage","dmg":16,"warhead":"flak","range":4.6,"reload":1.7,"burst":4,"burstDelay":0.12,"acc":0.42,"proj":"shell","speed":880,"aoe":0.5,"tgt":{"ground":1,"air":1,"sea":0,"sub":0}},
 "w_e50_fra_recon": {"name":"75mm SA 49 in the FL-11 oscillating turret","dmg":30,"warhead":"cannon","range":4.8,"reload":5.4,"burst":1,"acc":0.54,"proj":"shell","speed":600,"aoe":0.5,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e50_fra_fighter": {"name":"2x30mm DEFA 552 and Matra R.511 beam-riding missile","dmg":52,"warhead":"flak","range":5.4,"reload":3.9,"burst":1,"acc":0.48,"proj":"missile","speed":600,"aoe":0.6,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.8},
 "w_e50_fra_cas": {"name":"4x20mm HS.404 and T-10 rocket pods","dmg":58,"warhead":"he","range":4.6,"reload":4.4,"burst":2,"burstDelay":0.3,"acc":0.55,"proj":"missile","speed":420,"aoe":1.4,"ammo":1,"suppress":26,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e50_fra_gunship": {"name":"Nord AS.11 (SS.11) MCLOS wire-guided missile","dmg":61,"warhead":"heat","range":4.9,"reload":3.07,"burst":1,"acc":0.65,"proj":"missile","speed":400,"aoe":1,"ammo":1,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e60_fra_rifle": {"name":"MAS 49/56 7.5x54mm semi-automatic rifle","dmg":6,"warhead":"bullet","range":4,"reload":1.5,"burst":2,"burstDelay":0.09,"acc":0.57,"proj":"bullet","speed":0,"suppress":6,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_fra_at": {"name":"LRAC F1 89mm rocket launcher","dmg":74,"warhead":"heat","range":5.4,"minRange":0.8,"reload":6.6,"burst":1,"acc":0.64,"proj":"missile","speed":300,"aoe":0.8,"suppress":16,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_fra_mbt": {"name":"105mm CN-105-F1 with the OCC 105 F1 HEAT round","dmg":92,"warhead":"heat","range":6.6,"reload":4.9,"burst":1,"acc":0.69,"proj":"shell","speed":1000,"aoe":0.8,"suppress":21,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_fra_lighttank": {"name":"90mm CN 90 F3 in the FL-10 autoloader turret","dmg":56,"warhead":"heat","range":5.5,"reload":8.6,"burst":2,"burstDelay":0.55,"acc":0.62,"proj":"shell","speed":750,"aoe":0.6,"suppress":18,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_fra_ifv": {"name":"20mm M693 F1 in the Toucan turret","dmg":21,"warhead":"cannon","range":4.9,"reload":2.1,"burst":5,"burstDelay":0.1,"acc":0.6,"proj":"shell","speed":1050,"aoe":0.4,"suppress":20,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_fra_spg": {"name":"155mm Mle 50 in the open Mk F3 mount","dmg":84,"warhead":"frag","range":12.6,"minRange":3.3,"reload":13.5,"burst":1,"acc":0.26,"proj":"arc","speed":210,"aoe":2.6,"suppress":58,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_fra_spaag": {"name":"twin 30mm HSS 831A under Oeil Noir radar","dmg":17,"warhead":"flak","range":5.5,"reload":1.95,"burst":6,"burstDelay":0.07,"acc":0.52,"proj":"shell","speed":1080,"aoe":0.45,"tgt":{"ground":1,"air":1,"sea":0,"sub":0}},
 "w_e60_fra_aa": {"name":"20mm 53 T2 towed anti-aircraft cannon","dmg":14,"warhead":"flak","range":4.4,"reload":1.6,"burst":5,"burstDelay":0.1,"acc":0.44,"proj":"shell","speed":1050,"aoe":0.35,"tgt":{"ground":1,"air":1,"sea":0,"sub":0}},
 "w_e60_fra_recon": {"name":"90mm D921 F1 low-pressure gun (AML H-90)","dmg":48,"warhead":"heat","range":5,"reload":5.6,"burst":1,"acc":0.57,"proj":"shell","speed":640,"aoe":0.6,"suppress":16,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e60_fra_fighter": {"name":"Matra R.530 and 2x30mm DEFA 552A","dmg":132,"warhead":"flak","range":7.6,"reload":3.7,"burst":1,"acc":0.62,"proj":"missile","speed":660,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.62},
 "w_e60_fra_cas": {"name":"2x30mm DEFA 553 and 68mm SNEB rocket pods","dmg":76,"warhead":"he","range":5.4,"reload":4,"burst":2,"burstDelay":0.28,"acc":0.62,"proj":"missile","speed":430,"aoe":1.6,"ammo":1,"suppress":32,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e60_fra_gunship": {"name":"4x Nord AS.11 on a Gazelle","dmg":66,"warhead":"heat","range":5,"reload":3,"burst":1,"acc":0.67,"proj":"missile","speed":400,"aoe":1,"ammo":1,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e60_fra_ewair": {"name":"Gabriel ELINT suite with communications jamming","dmg":74,"warhead":"he","range":7.4,"minRange":1.2,"reload":8.6,"burst":1,"acc":0.58,"proj":"missile","speed":480,"aoe":1.2,"ammo":1,"antiRadiation":true,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"loft","intercept":0.7},
 "w_e80_fra_rifle": {"name":"FAMAS F1 5.56x45mm bullpup","dmg":7,"warhead":"bullet","range":4.1,"reload":1.28,"burst":3,"burstDelay":0.05,"acc":0.6,"proj":"bullet","speed":0,"suppress":7,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_fra_at": {"name":"APILAS 112mm one-shot rocket launcher","dmg":126,"warhead":"heat","range":5.7,"minRange":0.9,"reload":8.4,"burst":1,"acc":0.68,"proj":"missile","speed":290,"aoe":0.8,"suppress":18,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_fra_mbt": {"name":"105mm CN-105-F1 with OFL 105 F1 APFSDS","dmg":104,"warhead":"cannon","range":7,"reload":4.7,"burst":1,"acc":0.72,"proj":"shell","speed":1500,"aoe":0.7,"suppress":22,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_fra_lighttank": {"name":"105mm CN-105-57 on the AMX-10RC","dmg":88,"warhead":"cannon","range":6.5,"reload":5.4,"burst":1,"acc":0.7,"proj":"shell","speed":1120,"aoe":0.6,"suppress":20,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_fra_ifv": {"name":"20mm M693 F1 in the Toucan II turret","dmg":23,"warhead":"cannon","range":5.1,"reload":2,"burst":5,"burstDelay":0.1,"acc":0.63,"proj":"shell","speed":1050,"aoe":0.4,"suppress":21,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_fra_spg": {"name":"155mm 40-calibre GCT with an 8-round automatic loader","dmg":98,"warhead":"frag","range":13.4,"minRange":3.3,"reload":8.4,"burst":2,"burstDelay":0.9,"acc":0.3,"proj":"arc","speed":215,"aoe":2.7,"suppress":64,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_fra_aa": {"name":"Mistral 1 cooled-IR fire-and-forget missile","dmg":78,"warhead":"flak","range":6.4,"reload":5.4,"burst":1,"acc":0.72,"proj":"missile","speed":800,"aoe":0.5,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":1},
 "w_e80_fra_recon": {"name":"90mm F4 gun on the ERC-90 Sagaie","dmg":54,"warhead":"heat","range":5.4,"reload":5,"burst":1,"acc":0.62,"proj":"shell","speed":750,"aoe":0.6,"suppress":17,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_fra_sam": {"name":"Roland 2 all-weather point-defence missile","dmg":160,"warhead":"flak","range":7,"reload":8.5,"burst":1,"acc":0.78,"proj":"missile","speed":570,"aoe":0.9,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.9},
 "w_e80_fra_fighter": {"name":"Matra Super 530D and Magic II, 2x30mm DEFA 554","dmg":168,"warhead":"flak","range":9,"reload":3.2,"burst":1,"acc":0.8,"proj":"missile","speed":760,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.52},
 "w_e80_fra_cas": {"name":"AS.30L laser-guided missile under ATLIS II designation","dmg":168,"warhead":"heat","range":7.6,"reload":4.6,"burst":1,"acc":0.86,"proj":"missile","speed":450,"aoe":1.6,"ammo":1,"suppress":34,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":0.95},
 "w_e80_fra_gunship": {"name":"4x Euromissile HOT 2 SACLOS missile","dmg":142,"warhead":"heat","range":6.4,"reload":3.6,"burst":1,"acc":0.82,"proj":"missile","speed":280,"aoe":1,"ammo":1,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e80_fra_ewair": {"name":"C-160G Gabriel ELINT/COMINT with jamming transmitters","dmg":112,"warhead":"he","range":8.2,"minRange":1.2,"reload":7.6,"burst":1,"acc":0.66,"proj":"missile","speed":500,"aoe":1.3,"ammo":1,"antiRadiation":true,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"loft","intercept":0.7},
 "w_e90_fra_rifle": {"name":"5.56mm FAMAS F1 bullpup","dmg":9,"warhead":"bullet","range":4.6,"reload":1.09,"burst":3,"burstDelay":0.06,"acc":0.65,"proj":"bullet","speed":0,"suppress":5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_fra_at": {"name":"MILAN 3 SACLOS wire-guided ATGM","dmg":104,"warhead":"heat","range":8.7,"minRange":0.9,"reload":6.2,"burst":1,"acc":0.7,"proj":"missile","speed":200,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"intercept":1},
 "w_e90_fra_mbt": {"name":"120mm CN120-26 with 22-round autoloader","dmg":134,"warhead":"cannon","range":7.7,"reload":3.4,"burst":1,"acc":0.77,"proj":"shell","speed":860,"aoe":0.9,"suppress":24,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_fra_lighttank": {"name":"105mm F2 rifled gun","dmg":62,"warhead":"cannon","range":6.6,"reload":3.4,"burst":1,"acc":0.72,"proj":"shell","speed":700,"aoe":0.5,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_fra_ifv": {"name":"20mm M693 F2","dmg":15,"warhead":"bullet","range":5.6,"reload":2.4,"burst":5,"burstDelay":0.1,"acc":0.63,"proj":"shell","speed":620,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e80_fra_tankdestroyer": {"name":"Four HOT-2 in a Mephisto elevating launcher","dmg":118,"warhead":"heat","range":9.5,"minRange":1.1,"reload":5.9,"burst":1,"acc":0.72,"proj":"missile","speed":260,"aoe":0.8,"suppress":16,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"intercept":1},
 "w_e90_fra_spg": {"name":"155mm 40-calibre AUF1, autoloaded","dmg":129,"warhead":"frag","range":21,"minRange":5,"reload":7.5,"burst":1,"acc":0.32,"proj":"arc","speed":210,"aoe":2.6,"suppress":60,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_fra_mlrs": {"name":"12 x 227mm M26","dmg":60,"warhead":"frag","range":21.9,"minRange":5,"reload":14.84,"burst":12,"burstDelay":0.16,"acc":0.21,"proj":"arc","speed":260,"aoe":2,"suppress":40,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"rocket":true},
 "w_e90_fra_spaag": {"name":"Roland 2 command-guided SHORAD missile","dmg":62,"warhead":"flak","range":8.5,"reload":3.2,"burst":1,"acc":0.7,"proj":"missile","speed":560,"aoe":0.6,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":1},
 "w_e90_fra_aa": {"name":"Mistral 1 IR MANPADS","dmg":30,"warhead":"flak","range":7.9,"reload":2.8,"burst":1,"acc":0.72,"proj":"missile","speed":500,"aoe":0.5,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":1},
 "w_e90_fra_recon": {"name":"12.7mm M2 on a VBL ring mount","dmg":11,"warhead":"bullet","range":5.2,"reload":1.7,"burst":6,"burstDelay":0.07,"acc":0.62,"proj":"bullet","speed":0,"suppress":9,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_fra_tel": {"name":"Hades short-range ballistic missile","dmg":430,"warhead":"he","range":26,"minRange":8,"reload":62,"burst":1,"acc":0.85,"proj":"missile","speed":700,"aoe":2.4,"suppress":80,"indirect":true,"manual":true,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"sfx":"missile","profile":"ballistic","intercept":0.42},
 "w_e90_fra_fighter": {"name":"MICA EM active-radar AAM","dmg":168,"warhead":"flak","range":8.7,"reload":3.2,"burst":1,"acc":0.81,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e90_fra_cas": {"name":"GBU-12 with ATLIS II / PDLCT designation","dmg":268,"warhead":"he","range":2.4,"reload":1.1,"burst":2,"burstDelay":0.35,"acc":0.83,"proj":"bomb","speed":0,"aoe":2.4,"suppress":80,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e90_fra_gunship": {"name":"HOT-2, SACLOS, gunner holds the sight","dmg":108,"warhead":"heat","range":9.5,"reload":6,"burst":1,"acc":0.7,"proj":"missile","speed":260,"aoe":0.9,"ammo":1,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"intercept":1},
 "w_e60_fra_sead": {"name":"AS.37 Martel anti-radar missile","dmg":132,"warhead":"he","range":9.6,"minRange":1.2,"reload":7.60,"burst":1,"acc":0.62,"proj":"missile","speed":460,"aoe":1.3,"ammo":1,"antiRadiation":true,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"loft","intercept":0.70},
 "w_e80_fra_sead": {"name":"ARMAT - a Martel with a new seeker","dmg":164,"warhead":"he","range":14.5,"minRange":1.4,"reload":7.00,"burst":1,"acc":0.72,"proj":"missile","speed":480,"aoe":1.4,"ammo":1,"antiRadiation":true,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"loft","intercept":0.70},
 "w_e50_fra_tankdestroyer": {"name":"SS.10 MCLOS wire-guided missile","dmg":72,"warhead":"heat","range":4.4,"minRange":0.9,"reload":11.00,"burst":1,"acc":0.38,"proj":"missile","speed":180,"aoe":0.6,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e60_fra_tankdestroyer": {"name":"Four SS.11 over an FL-10 turret","dmg":98,"warhead":"heat","range":7.0,"minRange":1.2,"reload":8.40,"burst":1,"acc":0.52,"proj":"missile","speed":190,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1}, "w_e90_fra_sead": {"name":"ARMAT anti-radiation missile","dmg":170,"warhead":"he","range":13.5,"minRange":1.4,"reload":6.9,"burst":1,"acc":0.76,"proj":"missile","speed":480,"aoe":1.4,"ammo":1,"antiRadiation":true,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"loft","intercept":0.7},
 "w_e00_fra_rifle": {"name":"5.56mm FAMAS F1 with FELIN sight and datalink","dmg":10,"warhead":"bullet","range":4.9,"reload":1.06,"burst":3,"burstDelay":0.06,"acc":0.7,"proj":"bullet","speed":0,"suppress":5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_fra_at": {"name":"MMP / Akeron MP fire-and-forget ATGM","dmg":126,"warhead":"heat","range":10.4,"minRange":1.2,"reload":5.4,"burst":1,"acc":0.85,"proj":"missile","speed":300,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 "w_e00_fra_mbt": {"name":"120mm CN120-26/52 autoloaded","dmg":148,"warhead":"cannon","range":7.9,"reload":3.3,"burst":1,"acc":0.8,"proj":"shell","speed":860,"aoe":0.9,"suppress":24,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_fra_lighttank": {"name":"105mm F2, renovated fire control","dmg":64,"warhead":"cannon","range":6.7,"reload":3.3,"burst":1,"acc":0.75,"proj":"shell","speed":700,"aoe":0.5,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_fra_ifv": {"name":"25mm M811 in a Dragar turret","dmg":21,"warhead":"bullet","range":6.2,"reload":2.26,"burst":5,"burstDelay":0.1,"acc":0.68,"proj":"shell","speed":620,"suppress":12,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_fra_spg": {"name":"155mm 52-calibre CAESAR","dmg":152,"warhead":"frag","range":24.5,"minRange":5,"reload":8.4,"burst":1,"acc":0.34,"proj":"arc","speed":210,"aoe":2.6,"suppress":60,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_fra_mlrs": {"name":"6 x 227mm GMLRS unitary (LRU)","dmg":96,"warhead":"frag","range":24.5,"minRange":5,"reload":15.5,"burst":6,"burstDelay":0.2,"acc":0.44,"proj":"arc","speed":260,"aoe":1.6,"suppress":40,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"rocket":true},
 "w_e00_fra_spaag": {"name":"Crotale NG VT-1","dmg":72,"warhead":"flak","range":9.2,"reload":2.9,"burst":1,"acc":0.76,"proj":"missile","speed":760,"aoe":0.6,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":1},
 "w_e00_fra_aa": {"name":"Mistral 2 IR MANPADS","dmg":34,"warhead":"flak","range":8.2,"reload":2.7,"burst":1,"acc":0.76,"proj":"missile","speed":520,"aoe":0.5,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":1},
 "w_e00_fra_recon": {"name":"12.7mm M2 on a VBL ring mount","dmg":12,"warhead":"bullet","range":5.3,"reload":1.63,"burst":6,"burstDelay":0.07,"acc":0.65,"proj":"bullet","speed":0,"suppress":9,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_fra_fighter": {"name":"MICA EM / MICA IR, RBE2 AESA","dmg":186,"warhead":"flak","range":9.2,"reload":3.06,"burst":1,"acc":0.85,"proj":"missile","speed":700,"aoe":0.8,"ammo":1,"tgt":{"ground":0,"air":1,"sea":0,"sub":0},"profile":"pop","intercept":0.55},
 "w_e00_fra_cas": {"name":"AASM Hammer, INS/GPS plus IR terminal","dmg":296,"warhead":"he","range":4.2,"reload":1.15,"burst":2,"burstDelay":0.35,"acc":0.9,"proj":"bomb","speed":0,"aoe":2.4,"suppress":80,"ammo":2,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 "w_e00_fra_gunship": {"name":"AGM-114 Hellfire II from the Tigre HAD","dmg":136,"warhead":"heat","range":12,"reload":2.6,"burst":1,"acc":0.86,"proj":"missile","speed":400,"aoe":1,"ammo":1,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
});

/* ===================== FRENCH ARMED FORCES — era units, e50 to e00 =====================
   Light, fast and sovereign, and the empty slots are as much of this roster
   as the filled ones. None of them is an oversight:

     mlrs, e50 / e60 / e80 — France fielded no rocket artillery at all until
       the M270 was licence-built at Roanne and the LRM regiments stood up in
       1992. Three eras of nothing, and the RAP-14 was an export product that
       never entered French service.
     sam, e50 / e60 — no surface-to-air missile of any kind. PARCA was
       cancelled in 1960 and France pointedly did not buy the Hawk that
       Germany, Italy, Belgium and the Netherlands all bought, so the Armée
       de Terre had no missile air defence until Roland in 1977.
     spaag, e50 — no self-propelled anti-aircraft vehicle. Divisional air
       defence was towed 40 mm Bofors; the AMX-13 DCA is 1968.
     spaag, e90 / e00 — the entries are Roland and Crotale, i.e. missiles.
       France never built a Gepard-class gun vehicle and after Roland went in
       the late 2000s the Armée de Terre had no manoeuvre SHORAD vehicle at
       all, which is why the e00 entry belongs to the air force.
     sead, EVERY era — no defence-suppression AIRCRAFT and no dedicated crew,
       ever. What France has instead is an anti-radiation MISSILE hung on an
       ordinary strike aircraft, and that is a different claim with different
       dates: AS.37 Martel adopted 1969 and in service in the early 1970s,
       ARMAT in service 1984. The e80 band was empty on the strength of the
       first claim while the e90 row beside it carried 1984 in its own
       service field - right in the prose, wrong in the mechanism. e50 is
       correctly empty, and so are e00 and e20: the Jaguar went in 2005 and
       France has had no anti-radiation missile of any kind since. Rafale
       does SEAD with SCALP and AASM and neither of those is an ARM.
     awacs, e50 / e60 / e80 — none. Four E-3F were ordered in 1987 and the
       first arrived in 1991.
     ewair, e50 — none. Gabriel begins with the Noratlas conversions of the
       mid-1960s, and every French ewair entry is a LISTENING aircraft. France
       has never operated an electronic-attack aircraft in any era.
     tel, e50 — no ballistic missile of any kind; the first French warhead was
       tested in 1960 and the first delivery system was an air-dropped bomb in
       1964. Pluton is 1974, Hades was accepted in 1992, stored in 1993 and
       dismantled by 1997 — so the tel slot runs e60 to e90 and is EMPTY from
       e00 onward. That is French policy, not an omission: since 1997 the
       deterrent has been air-launched and submarine-launched only, and France
       never bought ATACMS with its M270s.
     radarv, e50 to e90 — RATAC and RASIT watched for moving vehicles and
       could not back-plot a trajectory. COBRA arrives in 2008.
     tankdestroyer, e50 / e60 / e80 / e00 — the SS.11 and ENTAC jeep mounts of
       the early period are already covered by the recon and lighttank
       entries, and VAB Méphisto withdrew in the 2010s with no replacement.
     heavybomber — SETTLED, and no longer empty for e60 to e90. The owner
       lifted the American-only rule, so the Mirage IVA of 1 October 1964 with
       the AN-11/AN-22 bomb and the Mirage IVP of 1 May 1986 with ASMP are in
       heavyair.js beside the B-52 and the V-force. e50 is EMPTY because there
       was no French warhead until 13 February 1960 and the jet bomber of that
       decade, the Vautour IIB, was tactical. e00 and e20 are EMPTY because the
       strike role left this aeroplane on 1 July 1996 for the two-seat Mirage
       2000N and later the Rafale B, and the eighteen survivors flew strategic
       RECONNAISSANCE only until 23 June 2005. Note that neither successor is
       on this roster as a nuclear aircraft: fra_e90_cas is the CONVENTIONAL
       Mirage 2000D and fra_e00_fighter is the Rafale, and hbomber_f - the
       Rafale B with ASMP-A - is still deliberately absent, because a two-seat
       fighter carrying one missile is a fighter. The Mirage IV is the only
       French aircraft that was built for nothing else.
     stealthfighter / stealthbomber / gunshipair — none, ever, in any era.
     heavy — no French tank heavier than the Leclerc, and no hard-kill active
       protection on any French vehicle: Galix is smoke and decoys.
     minelaying — France signed Ottawa in 1997 and Oslo in 2008 and has no
       artillery or rocket scatterable-mine round, so no French gun or
       launcher here carries a dispenser.                                 */
Object.assign(UNITS, {
  fra_e50_rifle: {"fac":"fra","role":"rifle","cat":"infantry","layer":"ground","name":"Groupe de Combat","full":"Groupe de combat, fusil MAS 49/56","cost":70,"oil":0,"time":4,"hp":60,"armor":"infantry","speed":0.9,"turn":7,"sight":3.6,"r":6,"mass":0.1,"weapons":["w_e50_fra_rifle"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1957","confidence":"high","desc":"France skipped the assault rifle entirely in this period. The MAS 49/56 is a semi-automatic full-power rifle with a grenade launcher built into the muzzle - accurate, robust, and one aimed shot at a time while the other side is going automatic."},
  fra_e50_at: {"fac":"fra","role":"at","cat":"infantry","layer":"ground","name":"LRAC 73mm","full":"Lance-roquettes antichar de 73 mm Modele 50","cost":175,"oil":0,"time":7,"hp":55,"armor":"infantry","speed":0.76,"turn":6,"sight":4.3,"r":6,"mass":0.1,"weapons":["w_e50_fra_at"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1950","confidence":"high","desc":"A French-built 73mm shoulder rocket in the bazooka idiom, carried through Indochina and Algeria. Short reach and a visible back-blast; it works because tanks in the fifties were still thin on the flanks."},
  fra_e50_mbt: {"fac":"fra","role":"mbt","cat":"vehicle","layer":"ground","name":"M47 Patton","full":"M47 Patton (MDAP deliveries to the Armee de Terre)","cost":665,"oil":10,"time":17,"hp":880,"armor":"heavy","speed":1.3,"turn":1.5,"sight":4.6,"r":16,"mass":46,"weapons":["w_e50_fra_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"The honest entry: France had no native heavy tank in the fifties. The AMX-50 was cancelled and around eight hundred American M47s filled the gap from 1953. Sovereign French armour begins only with the AMX-30 in 1966.","turret":true,"tturn":1.4,"crush":true},
  fra_e50_lighttank: {"fac":"fra","role":"lighttank","cat":"vehicle","layer":"ground","name":"AMX-13","full":"AMX-13 Modele 51 with the FL-10 oscillating turret","cost":330,"oil":4,"time":9,"hp":300,"armor":"light","speed":1.95,"turn":2.6,"sight":4.5,"r":12,"mass":15,"weapons":["w_e50_fra_lighttank"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1952","confidence":"high","desc":"The oscillating turret: the whole upper half pivots with the gun, so a revolver autoloader can feed it. Twelve rounds go out fast, then the crew must dismount to reload the magazines from outside. Fifteen tonnes of paper armour built to shoot first and leave.","turret":true,"tturn":1.4},
  fra_e50_ifv: {"fac":"fra","role":"ifv","cat":"vehicle","layer":"ground","name":"AMX-13 VTT","full":"AMX-VTT Modele 56 (Vehicule Transport de Troupe)","cost":390,"oil":5,"time":10,"hp":380,"armor":"light","speed":1.55,"turn":2,"sight":4.5,"r":14,"mass":15,"weapons":["w_e50_fra_ifv"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1957","confidence":"high","desc":"The AMX-13 chassis with the turret removed and a box for ten men welded on. An open ring mount and a machine gun; the squad fights dismounted or not at all. France's first tracked carrier of its own design.","turret":true,"tturn":1.8,"cargo":5},
  fra_e50_spg: {"fac":"fra","role":"spg","cat":"vehicle","layer":"ground","name":"AMX-13 105 Auto","full":"Obusier de 105 mm automoteur Modele 50 sur chassis AMX-13","cost":655,"oil":9,"time":16,"hp":380,"armor":"light","speed":1.2,"turn":1.5,"sight":3.3,"r":15,"mass":17,"weapons":["w_e50_fra_spg"],"prereq":["factory","radar"],"tech":2,"from":"e50","to":"e50","service":"1958","confidence":"medium","desc":"A 105mm howitzer in a limited-traverse casemate on the AMX-13 hull. Divisional fire that keeps up with the tanks, at the price of a gun that cannot swing far without moving the whole vehicle.","turret":true,"tturn":0.9},
  fra_e50_aa: {"fac":"fra","role":"aa","cat":"infantry","layer":"ground","name":"Bofors 40","full":"Canon de 40 mm CA Bofors L/60 sur affut tracte","cost":165,"oil":0,"time":6,"hp":50,"armor":"infantry","speed":0.7,"turn":6,"sight":4.8,"r":6,"mass":0.1,"weapons":["w_e50_fra_aa"],"prereq":["barracks"],"tech":1,"from":"e50","to":"e50","service":"1950","confidence":"medium","desc":"Optically laid 40mm on a towed carriage. Against a jet at five hundred knots it is a barrage weapon and nothing more - you fill a volume of sky and hope. France fielded no missile air defence at all in this decade.","turret":false},
  fra_e50_recon: {"fac":"fra","role":"recon","cat":"vehicle","layer":"ground","name":"Panhard EBR","full":"Panhard EBR-75 Modele 1951, tourelle FL-11","cost":210,"oil":2,"time":6,"hp":200,"armor":"light","speed":2.6,"turn":3,"sight":5.7,"r":12,"mass":13,"weapons":["w_e50_fra_recon"],"prereq":["factory"],"tech":1,"from":"e50","to":"e50","service":"1951","confidence":"high","desc":"Eight wheels, four of them steel and raised clear of the road until needed, a driver at each end and a 75mm oscillating turret in the middle. Reverses at full speed because it never has to turn round. Nothing else on any roster looks like it.","turret":true,"tturn":2.2},
  fra_e50_fighter: {"fac":"fra","role":"fighter","cat":"aircraft","layer":"air","name":"Super Mystere B.2","full":"Dassault Super Mystere B.2","cost":640,"oil":14,"time":16,"hp":215,"armor":"air","speed":7.5,"turn":2,"sight":6.4,"r":15,"mass":0,"weapons":["w_e50_fra_fighter"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1958","confidence":"high","desc":"The first Western European aircraft to go supersonic in level flight in squadron service, and the end of the Ouragan-Mystere line that put Dassault in business. Very short legs: it defends French airspace and not much beyond it.","jet":true,"ammo":2,"radar":3.4,"radius":26,"rcs":0.6},
  fra_e50_cas: {"fac":"fra","role":"cas","cat":"aircraft","layer":"air","name":"MD.450 Ouragan","full":"Dassault MD.450 Ouragan","cost":780,"oil":15,"time":19,"hp":330,"armor":"air","speed":5.2,"turn":1.6,"sight":5.2,"r":17,"mass":0,"weapons":["w_e50_fra_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e50","to":"e50","service":"1952","confidence":"high","desc":"France's first indigenous jet, and by the mid-fifties a ground-attack aircraft in Algeria. Four 20mm cannon and rockets, delivered in a shallow dive over the target because nothing else existed yet.","jet":true,"ammo":3,"radius":24,"rcs":1},
  fra_e50_gunship: {"fac":"fra","role":"gunship","cat":"aircraft","layer":"air","name":"Alouette II (SS.11)","full":"Sud Aviation SE.3130 Alouette II with AS.11 wire-guided missiles","cost":735,"oil":12,"time":17,"hp":320,"armor":"air","speed":3.1,"turn":2.2,"sight":5.7,"r":16,"mass":0,"weapons":["w_e50_fra_gunship"],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1958","confidence":"high","desc":"The first armed helicopter anywhere: a light turbine machine with wire-guided missiles bolted to the skids, flown against Algerian positions from 1958. The gunner steers the missile by joystick all the way in and the helicopter must sit still while he does it.","ammo":4,"hover":true,"radius":22,"rcs":0.5},
  fra_e50_transport: {"fac":"fra","role":"transport","cat":"aircraft","layer":"air","name":"H-21C Banane","full":"Vertol H-21C Shawnee, la Banane Volante","cost":430,"oil":7,"time":11,"hp":285,"armor":"air","speed":3.3,"turn":2.3,"sight":4.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e50","to":"e50","service":"1956","confidence":"high","desc":"The bent tandem-rotor fuselage that gave it its French nickname. In Algeria the ALAT used it to invent air assault - lifting a section onto a ridge instead of walking it there - several years before anyone did it at scale in Vietnam.","ammo":0,"hover":true,"cargo":9,"radius":26,"rcs":1},
  fra_e50_airlift: {"fac":"fra","role":"airlift","cat":"aircraft","layer":"air","name":"Noratlas","full":"Nord N.2501 Noratlas","cost":950,"oil":32,"time":18,"hp":480,"armor":"air","speed":2.8,"turn":1.4,"sight":8,"r":20,"mass":0,"weapons":[],"prereq":["airbase"],"tech":1,"from":"e50","to":"e50","service":"1953","confidence":"high","desc":"Twin booms, two piston engines and clamshell doors at the back. It dropped the paratroops at Dien Bien Phu and over Suez, and it lifted the Algerian war. Slower and much shorter-legged than a Hercules.","jet":false,"ammo":0,"cargo":4,"radius":40,"rcs":3.2,"radarQ":0,"gen":2},
  fra_e60_rifle: {"fac":"fra","role":"rifle","cat":"infantry","layer":"ground","name":"Groupe de Combat","full":"Groupe de combat, MAS 49/56 et FM 24/29","cost":85,"oil":0,"time":4,"hp":72,"armor":"infantry","speed":0.93,"turn":7,"sight":4.2,"r":6,"mass":0.1,"weapons":["w_e60_fra_rifle"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1957","confidence":"high","desc":"Still the MAS 49/56. While NATO went to the M16 and the Warsaw Pact to the AK, French infantry carried a semi-automatic rifle into the 1970s; the FAMAS did not reach the ranks until 1979. This is a genuine two-decade lag, not an oversight."},
  fra_e60_at: {"fac":"fra","role":"at","cat":"infantry","layer":"ground","name":"LRAC F1 89mm","full":"LRAC 89 mm Modele F1","cost":225,"oil":0,"time":7,"hp":65,"armor":"infantry","speed":0.79,"turn":6,"sight":5,"r":6,"mass":0.1,"weapons":["w_e60_fra_at"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1971","confidence":"high","desc":"A reloadable 89mm launcher with a disposable rocket container, the standard section anti-tank weapon for thirty years. Heavier and longer-ranged than the American LAW, and unlike the LAW you keep the tube."},
  fra_e60_mbt: {"fac":"fra","role":"mbt","cat":"vehicle","layer":"ground","name":"AMX-30","full":"AMX-30 char de bataille","cost":790,"oil":12,"time":17,"hp":900,"armor":"heavy","speed":1.62,"turn":1.7,"sight":5.4,"r":16,"mass":36,"weapons":["w_e60_fra_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1966","confidence":"high","desc":"A deliberate doctrinal bet: France decided shaped-charge warheads had made thick armour pointless, so the AMX-30 weighs 36 tonnes against the M60's 50 and runs at 65 km/h. Fast, light, and thin-skinned by design. On this roster it is the fastest main battle tank and the softest.","turret":true,"tturn":1.6,"crush":true},
  fra_e60_lighttank: {"fac":"fra","role":"lighttank","cat":"vehicle","layer":"ground","name":"AMX-13/90","full":"AMX-13/90 with the 90mm CN 90 F3 in the FL-10 turret","cost":405,"oil":5,"time":10,"hp":340,"armor":"light","speed":1.98,"turn":2.6,"sight":5.1,"r":12,"mass":15,"weapons":["w_e60_fra_lighttank"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1966","confidence":"high","desc":"The 75mm swapped for a low-pressure 90mm firing a shaped-charge round, which restores the AMX-13's ability to kill a modern tank. The oscillating turret and its twelve-round autoloader are unchanged, and so is the crew's problem of reloading in the open.","turret":true,"tturn":1.4},
  fra_e60_ifv: {"fac":"fra","role":"ifv","cat":"vehicle","layer":"ground","name":"AMX-10P","full":"AMX-10P vehicule de combat d'infanterie","cost":495,"oil":6,"time":11,"hp":470,"armor":"light","speed":1.72,"turn":2.1,"sight":5.3,"r":14,"mass":14,"weapons":["w_e60_fra_ifv"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1973","confidence":"high","desc":"An aluminium-hulled, fully amphibious IFV with a two-man 20mm turret - it swims on its tracks with a trim vane up. Lighter than the Marder and far lighter than the Bradley, and correspondingly easy to hurt.","turret":true,"tturn":1.9,"cargo":5},
  fra_e60_spg: {"fac":"fra","role":"spg","cat":"vehicle","layer":"ground","name":"155 Mk F3","full":"Canon de 155 mm automoteur Mk F3 sur chassis AMX-13","cost":720,"oil":9,"time":15,"hp":310,"armor":"light","speed":1.35,"turn":1.5,"sight":3.9,"r":15,"mass":17,"weapons":["w_e60_fra_spg"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1962","confidence":"high","desc":"The smallest 155mm self-propelled gun ever fielded: an open mount on a shortened AMX-13 hull with room for two of the eight-man crew. The other six and all the ammunition follow in a separate vehicle. Cheap, air-portable and completely exposed to counter-battery fire.","turret":true,"tturn":0.6},
  fra_e60_spaag: {"fac":"fra","role":"spaag","cat":"vehicle","layer":"ground","name":"AMX-13 DCA","full":"AMX-13 DCA, bitube de 30 mm, radar Oeil Noir","cost":545,"oil":7,"time":12,"hp":430,"armor":"light","speed":1.6,"turn":1.9,"sight":6.2,"r":14,"mass":17,"weapons":["w_e60_fra_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e60","to":"e60","service":"1968","confidence":"high","desc":"Twin 30mm in a powered turret with the Oeil Noir search-and-track radar. It arrived a decade before the Gepard and is a much lighter machine - shorter reach, thinner armour, and only sixty built, which is why France never had a real gun air-defence belt.","turret":true,"tturn":2.6,"radar":5.2},
  fra_e60_aa: {"fac":"fra","role":"aa","cat":"infantry","layer":"ground","name":"20mm 53 T2","full":"Canon de 20 mm anti-aerien 53 T2 sur affut tracte","cost":190,"oil":0,"time":7,"hp":62,"armor":"infantry","speed":0.76,"turn":6,"sight":5.4,"r":6,"mass":0.1,"weapons":["w_e60_fra_aa"],"prereq":["barracks"],"tech":1,"from":"e60","to":"e60","service":"1972","confidence":"medium","desc":"A towed 20mm on a light mount, optically laid. France had no shoulder-fired missile at all in this period - no Redeye, no Strela equivalent - so the infantry's answer to an aircraft was still a gun.","turret":false},
  fra_e60_recon: {"fac":"fra","role":"recon","cat":"vehicle","layer":"ground","name":"AML-90","full":"Panhard AML H-90 (Auto Mitrailleuse Legere)","cost":235,"oil":3,"time":6,"hp":215,"armor":"light","speed":2.5,"turn":3.2,"sight":6.4,"r":11,"mass":5.5,"weapons":["w_e60_fra_recon"],"prereq":["factory"],"tech":1,"from":"e60","to":"e60","service":"1961","confidence":"high","desc":"Five and a half tonnes, four wheels, and a 90mm gun that will kill a tank at a kilometre. The most exported armoured car of the century. Absolutely no protection: it survives by seeing first and reversing.","turret":true,"tturn":2.3},
  fra_e60_tel: {"fac":"fra","role":"tel","cat":"vehicle","layer":"ground","name":"Pluton","full":"Pluton, missile nucleaire tactique sur chassis AMX-30","cost":2900,"oil":50,"time":36,"hp":500,"armor":"light","speed":1.55,"turn":1.2,"sight":5,"r":16,"mass":30,"weapons":["srbm_short"],"prereq":["factory","lab"],"tech":3,"from":"e60","to":"e60","service":"1974","confidence":"high","desc":"A 15 or 25 kilotonne AN-51 warhead on an AMX-30 chassis, range 120 km, in service 1974 to 1993. Five regiments, forty-two launchers. This is the asymmetry: the United States kept its tactical nuclear launchers, but France built one that drives with the tank divisions and answers to Paris alone.","turret":false,"deploy":true,"deploySec":7,"rounds":1},
  fra_e60_fighter: {"fac":"fra","role":"fighter","cat":"aircraft","layer":"air","name":"Mirage IIIE","full":"Dassault Mirage IIIE","cost":795,"oil":17,"time":17,"hp":250,"armor":"air","speed":7.8,"turn":2,"sight":7.2,"r":15,"mass":0,"weapons":["w_e60_fra_fighter"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1964","confidence":"high","desc":"The tailless delta that defined French airpower. The IIIC interceptor arrived in 1961 and the longer-ranged IIIE strike version in 1964, able to carry the AN-52 tactical nuclear bomb. Superb acceleration, poor slow-speed handling, and a landing run to match - the price of a delta with no tailplane.","jet":true,"ammo":2,"radar":3.8,"radius":28,"rcs":0.6},
  fra_e60_cas: {"fac":"fra","role":"cas","cat":"aircraft","layer":"air","name":"Jaguar A","full":"SEPECAT Jaguar A","cost":1120,"oil":22,"time":22,"hp":440,"armor":"air","speed":5.6,"turn":1.6,"sight":6.2,"r":17,"mass":0,"weapons":["w_e60_fra_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e60","service":"1973","confidence":"high","desc":"The one major Anglo-French aircraft that reached service. Built to go in low and fast under the radar with a nuclear or conventional load, from rough strips. Underpowered on a hot day with a full load - a complaint every Jaguar pilot made.","jet":true,"ammo":3,"radius":34,"rcs":1.2},
  fra_e60_gunship: {"fac":"fra","role":"gunship","cat":"aircraft","layer":"air","name":"Gazelle (SS.11)","full":"Aerospatiale SA 341F Gazelle with AS.11 missiles","cost":850,"oil":13,"time":17,"hp":330,"armor":"air","speed":3.6,"turn":2.4,"sight":6.5,"r":15,"mass":0,"weapons":["w_e60_fra_gunship"],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1973","confidence":"high","desc":"The fenestron - a shrouded fan in the tail fin instead of an exposed rotor - and a fast, tiny airframe. Nothing like the Cobra: no armour, no gun turret, no room. It hides behind a treeline and shoots wire-guided missiles, and one rifle burst will bring it down.","ammo":4,"hover":true,"radius":22,"rcs":0.45},
  fra_e60_transport: {"fac":"fra","role":"transport","cat":"aircraft","layer":"air","name":"SA 330 Puma","full":"Aerospatiale SA 330B Puma","cost":545,"oil":9,"time":12,"hp":360,"armor":"air","speed":3.7,"turn":2.3,"sight":5.6,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e60","to":"e60","service":"1970","confidence":"high","desc":"Sixteen troops, retractable gear and genuine all-weather capability - the first French helicopter cleared to fly in icing. The ALAT's workhorse for forty years and the aircraft that made French air-mobile doctrine possible.","ammo":0,"hover":true,"cargo":9,"radius":30,"rcs":0.95},
  fra_e60_ewair: {"fac":"fra","role":"ewair","cat":"aircraft","layer":"air","name":"Nord 2501 Gabriel","full":"Nord N.2501 Noratlas Gabriel, ELINT conversion","cost":1350,"oil":22,"time":24,"hp":290,"armor":"air","speed":2.8,"turn":1.1,"sight":8.4,"r":18,"mass":0,"weapons":["w_e60_fra_ewair"],"prereq":["airbase","lab"],"tech":3,"from":"e60","to":"e60","service":"1966","confidence":"low","desc":"A twin-boom transport stuffed with receivers, flown along the border to write down what the other side's radars sound like. This is a listening aircraft, not a Prowler: no high-power jamming pods and no anti-radiation missiles. Slow enough that it only works outside the threat ring.","jet":false,"ammo":1,"radar":9,"radius":40,"rcs":3.2},
  fra_e60_airlift: {"fac":"fra","role":"airlift","cat":"aircraft","layer":"air","name":"C-160 Transall","full":"Transall C-160F","cost":1250,"oil":40,"time":21,"hp":570,"armor":"air","speed":3,"turn":1.4,"sight":8,"r":20,"mass":0,"weapons":[],"prereq":["airbase"],"tech":1,"from":"e60","to":"e60","service":"1967","confidence":"high","desc":"Franco-German, two Tyne turboprops, high wing and a ramp - a Hercules-class lifter built because neither country wanted to buy American. Two engines rather than four, so a smaller load over a shorter leg, and rough-strip capability that is genuinely better.","jet":false,"ammo":0,"cargo":5,"radius":56,"rcs":3.6,"radarQ":0,"gen":2},
  fra_e80_rifle: {"fac":"fra","role":"rifle","cat":"infantry","layer":"ground","name":"Groupe de Combat","full":"Groupe de combat, FAMAS F1","cost":110,"oil":0,"time":4,"hp":88,"armor":"infantry","speed":1,"turn":7,"sight":5,"r":6,"mass":0.1,"weapons":["w_e80_fra_rifle"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1979","confidence":"high","desc":"Le Clairon, the bugle. A 5.56mm bullpup with a cyclic rate near 1000 rounds a minute and a three-round burst limiter, twenty years after everyone else went automatic. France jumped from a semi-automatic battle rifle straight to one of the most modern rifles in Europe."},
  fra_e80_at: {"fac":"fra","role":"at","cat":"infantry","layer":"ground","name":"APILAS","full":"APILAS 112 mm one-shot anti-armour launcher","cost":290,"oil":0,"time":8,"hp":85,"armor":"infantry","speed":0.84,"turn":6,"sight":6,"r":6,"mass":0.1,"weapons":["w_e80_fra_at"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1984","confidence":"high","desc":"112mm, nine kilograms, and a shaped charge that will punch through 700mm of steel - the heaviest disposable anti-tank rocket any army issued. One shot, then throw the tube away. Brutal recoil signature and a back-blast that rules out firing from inside a room."},
  fra_e80_mbt: {"fac":"fra","role":"mbt","cat":"vehicle","layer":"ground","name":"AMX-30 B2","full":"AMX-30 B2","cost":940,"oil":13,"time":18,"hp":1010,"armor":"heavy","speed":1.6,"turn":1.7,"sight":6.3,"r":16,"mass":37,"weapons":["w_e80_fra_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1982","confidence":"high","desc":"A rebuild, not a new tank: laser rangefinder, low-light channel, integrated fire control and a new gearbox on the same 1966 hull. The armour is still 1966 armour. Against an M1 or a T-80 in this era the AMX-30 B2 is outclassed and France knew it - the Leclerc answer did not arrive until 1992.","turret":true,"tturn":1.6,"crush":true},
  fra_e80_lighttank: {"fac":"fra","role":"lighttank","cat":"vehicle","layer":"ground","name":"AMX-10RC","full":"AMX-10RC engin blinde a roues canon","cost":580,"oil":7,"time":11,"hp":480,"armor":"light","speed":2.05,"turn":2.4,"sight":6.5,"r":13,"mass":16,"weapons":["w_e80_fra_lighttank"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1981","confidence":"high","desc":"Six wheels, hydropneumatic suspension it can kneel and lean on, skid steering like a tracked vehicle, and a 105mm gun with a computerised sight. Heavy cavalry firepower on sixteen tonnes of aluminium - it will kill a tank and it will not survive being shot at once.","turret":true,"tturn":1.7},
  fra_e80_ifv: {"fac":"fra","role":"ifv","cat":"vehicle","layer":"ground","name":"AMX-10P","full":"AMX-10P vehicule de combat d'infanterie","cost":620,"oil":7,"time":12,"hp":560,"armor":"light","speed":1.72,"turn":2.1,"sight":6.1,"r":14,"mass":14,"weapons":["w_e80_fra_ifv"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1973","confidence":"high","desc":"Still the AMX-10P, a decade on and unreplaced. Against a Bradley or a BMP-2 it is the thinnest-skinned of the three, and the wheeled VBCI that finally replaced it did not arrive until 2008. Amphibious, which the Bradley effectively is not.","turret":true,"tturn":1.9,"cargo":5},
  fra_e80_spg: {"fac":"fra","role":"spg","cat":"vehicle","layer":"ground","name":"AMX-30 AuF1","full":"AuF1, 155 mm GCT sur chassis AMX-30","cost":1160,"oil":16,"time":21,"hp":640,"armor":"light","speed":1.42,"turn":1.5,"sight":4.6,"r":15,"mass":42,"weapons":["w_e80_fra_spg"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1979","confidence":"high","desc":"The first Western 155mm self-propelled gun with a fully automatic loader: forty-two rounds, eight in a minute, at any elevation, with a sealed NBC-proof turret. The M109 of the same year was still loading by hand. This is the one land system where France was genuinely ahead.","turret":true,"tturn":0.9},
  fra_e80_spaag: {"fac":"fra","role":"spaag","cat":"vehicle","layer":"ground","name":"AMX-13 DCA","full":"AMX-13 DCA, bitube de 30 mm, radar Oeil Noir","cost":600,"oil":8,"time":12,"hp":470,"armor":"light","speed":1.6,"turn":1.9,"sight":6.4,"r":14,"mass":17,"weapons":["w_e60_fra_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e80","service":"1968","confidence":"high","desc":"Unchanged since 1968 and still the only tracked gun air-defence vehicle France had. There was no Gepard-class replacement: the French answer to this problem was to buy missiles instead, which is why Roland exists and a modern SPAAG does not.","turret":true,"tturn":2.6,"radar":5.2},
  fra_e80_aa: {"fac":"fra","role":"aa","cat":"infantry","layer":"ground","name":"Mistral","full":"Matra Mistral 1 MANPADS","cost":255,"oil":0,"time":7,"hp":80,"armor":"infantry","speed":0.84,"turn":6,"sight":6.4,"r":6,"mass":0.1,"weapons":["w_e80_fra_aa"],"prereq":["barracks"],"tech":1,"from":"e80","to":"e80","service":"1988","confidence":"high","desc":"France's first shoulder-launched surface-to-air missile, thirty years after the Redeye. Fires from a tripod rather than the shoulder because the missile is heavy, and the cooled seeker gives it a genuine head-on shot the early Stinger did not have."},
  fra_e80_recon: {"fac":"fra","role":"recon","cat":"vehicle","layer":"ground","name":"ERC-90 Sagaie","full":"Panhard ERC-90 F4 Sagaie","cost":330,"oil":4,"time":7,"hp":300,"armor":"light","speed":2.68,"turn":3.2,"sight":7.4,"r":11,"mass":8.3,"weapons":["w_e80_fra_recon"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1984","confidence":"high","desc":"Six wheels, eight tonnes, amphibious, air-portable in a Transall, and a 90mm gun. Built for the rapid-deployment division and used exactly that way in Chad and the Gulf. It is a gun on wheels - there is no armour worth the name.","turret":true,"tturn":2.3},
  fra_e80_sam: {"fac":"fra","role":"sam","cat":"vehicle","layer":"ground","name":"Roland 2","full":"Roland 2 all-weather SAM on the AMX-30R chassis","cost":1250,"oil":18,"time":20,"hp":540,"armor":"light","speed":1.5,"turn":1.3,"sight":7.4,"r":15,"mass":33,"weapons":["w_e80_fra_sam"],"prereq":["factory","radar"],"tech":3,"from":"e80","to":"e80","service":"1981","confidence":"high","desc":"Franco-German, on a French tank chassis: search radar, tracking radar, two ready rounds and eight in the magazine. Note what it is not - Roland reaches about 6 km and 5,500 m. France fielded no Patriot-class area SAM at all in this era; the SAMP/T did not arrive until 2008.","turret":true,"tturn":1.1,"deploy":true,"deploySec":5,"radar":6.8,"radarQ":8,"rounds":2},
  fra_e80_tel: {"fac":"fra","role":"tel","cat":"vehicle","layer":"ground","name":"Pluton","full":"Pluton, missile nucleaire tactique sur chassis AMX-30","cost":3000,"oil":52,"time":36,"hp":520,"armor":"light","speed":1.55,"turn":1.2,"sight":5,"r":16,"mass":30,"weapons":["srbm_short"],"prereq":["factory","lab"],"tech":3,"from":"e80","to":"e80","service":"1974","confidence":"high","desc":"Still Pluton through the whole decade - it served 1974 to 1993 without replacement. Its 120 km reach was the standing embarrassment of French deterrence: every target it could hit was in West Germany. The 480 km Hades built to fix that was fielded in 1991, never deployed, and dismantled in 1997.","turret":false,"deploy":true,"deploySec":7,"rounds":1},
  fra_e80_fighter: {"fac":"fra","role":"fighter","cat":"aircraft","layer":"air","name":"Mirage 2000C","full":"Dassault Mirage 2000C","cost":1010,"oil":22,"time":18,"hp":320,"armor":"air","speed":8.1,"turn":2.1,"sight":8.8,"r":15,"mass":0,"weapons":["w_e80_fra_fighter"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1984","confidence":"high","desc":"The delta returns, this time with relaxed static stability and fly-by-wire to fix everything that was wrong with the Mirage III. Single engine and a single radar against the F-15's two of each: shorter legs, lighter missile load, and a much cheaper aeroplane.","jet":true,"ammo":3,"radar":4.6,"radius":33,"rcs":0.6},
  fra_e80_cas: {"fac":"fra","role":"cas","cat":"aircraft","layer":"air","name":"Jaguar A (AS.30L)","full":"SEPECAT Jaguar A with ATLIS II pod and AS.30 Laser","cost":1400,"oil":27,"time":24,"hp":520,"armor":"air","speed":5.7,"turn":1.6,"sight":7.2,"r":17,"mass":0,"weapons":["w_e80_fra_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1973","confidence":"high","desc":"The same 1973 airframe with a laser designator pod and a laser-guided missile, from about 1985. It is not an A-10 - no gun built round the aeroplane, no titanium bathtub - it is a fast strike aircraft that now hits what it aims at from a few kilometres out instead of overflying it.","jet":true,"ammo":3,"radius":34,"rcs":1.2},
  fra_e80_gunship: {"fac":"fra","role":"gunship","cat":"aircraft","layer":"air","name":"Gazelle HOT","full":"Aerospatiale SA 342M Gazelle with 4x HOT missiles","cost":1000,"oil":16,"time":18,"hp":390,"armor":"air","speed":3.7,"turn":2.4,"sight":7.4,"r":15,"mass":0,"weapons":["w_e80_fra_gunship"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1980","confidence":"high","desc":"Four HOT missiles and a roof-mounted stabilised sight on a two-tonne helicopter. France's anti-tank helicopter fleet in the 1980s was this - no armour, no cannon, no all-weather sensor. The Apache-class answer, the Tigre, did not enter French service until 2005.","ammo":4,"hover":true,"radius":22,"rcs":0.45},
  fra_e80_transport: {"fac":"fra","role":"transport","cat":"aircraft","layer":"air","name":"SA 330 Puma","full":"Aerospatiale SA 330Ba Puma","cost":620,"oil":10,"time":12,"hp":400,"armor":"air","speed":3.7,"turn":2.3,"sight":6.4,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1970","confidence":"high","desc":"Still the Puma. The uprated AS 332 Super Puma flew in 1978 but the military AS 532 Cougar only reached French units in 1990, so through the whole of this era the ALAT lifts its troops in a 1970 airframe.","ammo":0,"hover":true,"cargo":9,"radius":30,"rcs":0.95},
  fra_e80_ewair: {"fac":"fra","role":"ewair","cat":"aircraft","layer":"air","name":"C-160G Gabriel","full":"Transall C-160G Gabriel, ELINT and COMINT","cost":1900,"oil":30,"time":27,"hp":400,"armor":"air","speed":3.1,"turn":1.2,"sight":10,"r":18,"mass":0,"weapons":["w_e80_fra_ewair"],"prereq":["airbase","lab"],"tech":3,"from":"e80","to":"e80","service":"1989","confidence":"medium","desc":"Two aircraft, total. Antennas down each side of a Transall, a radome under the nose, and an operators' console fit for collection and communications jamming. Compare the EF-111A: this is a slow turboprop that works from a standoff orbit and cannot escort a strike package anywhere.","jet":false,"ammo":2,"radar":11,"radius":48,"rcs":3.4},
  fra_e80_airlift: {"fac":"fra","role":"airlift","cat":"aircraft","layer":"air","name":"C-160NG Transall","full":"Transall C-160NG (Nouvelle Generation)","cost":1450,"oil":42,"time":23,"hp":620,"armor":"air","speed":3.1,"turn":1.4,"sight":8,"r":20,"mass":0,"weapons":[],"prereq":["airbase"],"tech":1,"from":"e80","to":"e80","service":"1981","confidence":"high","desc":"The second production run: extra centre-section fuel, a refuelling probe, and on some airframes a hose drum so a Transall can refuel another Transall. Built specifically so France could deploy to Africa without asking anyone for basing or tankers.","jet":false,"ammo":0,"cargo":6,"radius":70,"rcs":3.4,"radarQ":0,"gen":2},
  fra_e90_rifle: {"fac":"fra","role":"rifle","cat":"infantry","layer":"ground","name":"Groupe de combat FAMAS","full":"Groupe de combat, FAMAS F1","cost":128,"oil":0,"time":5,"hp":100,"armor":"infantry","speed":1.03,"turn":7,"sight":5.4,"r":6,"mass":0.1,"weapons":["w_e90_fra_rifle"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1980","confidence":"high","desc":"The Clairon: a 3.6 kg bullpup with a 1,000 rpm cyclic rate, issued army-wide from 1980 and still standard through the whole decade. It fires steel-cased ammunition from a proprietary 25-round magazine that fits nothing else in NATO, which became a supply problem the moment French units deployed alongside allies."},
  fra_e90_at: {"fac":"fra","role":"at","cat":"infantry","layer":"ground","name":"MILAN 3","full":"MILAN 3 / ERYX","cost":300,"oil":0,"time":8,"hp":95,"armor":"infantry","speed":0.86,"turn":6,"sight":6.2,"r":6,"mass":0.1,"weapons":["w_e90_fra_at"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1996","confidence":"high","desc":"Franco-German SACLOS wire-guided missile: the gunner must hold the sight on the target for the whole 12-second flight, exposed, while the launcher's own xenon beacon is what the guidance tracks. MILAN 3 (1996) added a modulated beacon to beat Russian jammers. There is no French fire-and-forget top-attack missile in this era at all - the answer to Javelin does not arrive until MMP in 2017. ERYX (1994) covers 50-600 m and nothing beyond it."},
  fra_e90_aa: {"fac":"fra","role":"aa","cat":"infantry","layer":"ground","name":"Mistral","full":"SATCP Mistral","cost":290,"oil":0,"time":8,"hp":90,"armor":"infantry","speed":0.88,"turn":6,"sight":7.2,"r":6,"mass":0.1,"weapons":["w_e90_fra_aa"],"prereq":["barracks"],"tech":1,"from":"e90","to":"e90","service":"1988","confidence":"high","desc":"Fired from a tripod rather than the shoulder, because the 24 kg missile is nearly twice a Stinger's and carries a 3 kg warhead against Stinger's one. The trade is real: heavier hit, far less mobile team. Cooled IR seeker, all-aspect."},
  fra_e90_mbt: {"fac":"fra","role":"mbt","cat":"vehicle","layer":"ground","name":"Leclerc","full":"AMX Leclerc, serie 1","cost":1340,"oil":20,"time":22,"hp":1490,"armor":"heavy","speed":1.72,"turn":1.7,"sight":7.4,"r":16,"mass":55,"weapons":["w_e90_fra_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1992","confidence":"high","desc":"The only Western tank of its generation with a bustle autoloader, and the whole design follows from that: three crew instead of four, a 22-round magazine feeding 6 rounds a minute, and a hull seven tonnes lighter than an Abrams on a 1,500 hp hyperbar diesel. Faster and quicker to reload than an M1A2, thinner-skinned, and dependent on a machine that cannot be replaced by a tired loader when it jams.","turret":true,"tturn":1.7,"crush":true},
  fra_e90_lighttank: {"fac":"fra","role":"lighttank","cat":"vehicle","layer":"ground","name":"AMX-10 RC","full":"AMX-10 RC 6x6 heavy armoured car","cost":660,"oil":8,"time":11,"hp":600,"armor":"light","speed":2.24,"turn":2.5,"sight":7.1,"r":13,"mass":16,"weapons":["w_e90_fra_lighttank"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1981","confidence":"high","desc":"France never accepted the American conclusion that light armour was pointless. A 105mm gun on six wheels with hydropneumatic suspension and skid steering, built for colonial-distance mobility rather than a Fulda Gap tank fight. Where the US Army had nothing at all in this slot from 1996, France had these in regimental strength, and used them in Chad, the Gulf, the Balkans and Mali.","turret":true,"tturn":1.7},
  fra_e90_ifv: {"fac":"fra","role":"ifv","cat":"vehicle","layer":"ground","name":"AMX-10P","full":"AMX-10P with Toucan II 20mm turret","cost":700,"oil":8,"time":12,"hp":610,"armor":"light","speed":1.78,"turn":2.1,"sight":6.5,"r":14,"mass":14,"weapons":["w_e90_fra_ifv"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1973","confidence":"high","desc":"Tracked, amphibious, 20mm, eight dismounts, and 14 tonnes - less than half a Bradley. It is a 1970s vehicle that was never uparmoured, and by the 1990s its aluminium hull stopped rifle fire and very little else. Alongside it the wheeled VAB carried most of the infantry with no turret at all. The proper IFV, VBCI, is fifteen years away.","turret":true,"tturn":1.8,"cargo":8},
  fra_e80_tankdestroyer: {"fac":"fra","role":"tankdestroyer","cat":"vehicle","layer":"ground","name":"VAB Mephisto","full":"VAB HOT / Mephisto","cost":1000,"oil":12,"time":15,"hp":540,"armor":"light","speed":2,"turn":2.2,"sight":8,"r":13,"mass":13,"weapons":["w_e80_fra_tankdestroyer"],"prereq":["factory","radar"],"tech":2,"from":"e80","to":"e00","service":"1984","confidence":"medium","desc":"Four HOT-2 in an armoured box that rises out of the VAB's roof, fires, and drops back under cover to reload from inside - a genuinely good idea that no other NATO army copied. Wire-guided, so it must sit still through the flight. Withdrawn in the 2010s and never replaced by a dedicated vehicle.","turret":true,"tturn":1.4},
  fra_e90_spg: {"fac":"fra","role":"spg","cat":"vehicle","layer":"ground","name":"AMX-30 AuF1","full":"155mm GCT AuF1 on AMX-30 chassis","cost":1240,"oil":16,"time":20,"hp":650,"armor":"light","speed":1.34,"turn":1.5,"sight":5.1,"r":15,"mass":42,"weapons":["w_e90_fra_spg"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1979","confidence":"high","desc":"A fully automatic 42-round loader in a very large turret: 8 rounds a minute sustained, against the M109A6's 4, and the crew never handles a shell. The price is a 42-tonne vehicle on a 1960s chassis with an underpowered engine. AuF1 fired in Bosnia in 1995. There is no French scatterable-mine shell in service, so this gun cannot sow a minefield.","turret":true,"tturn":0.9},
  fra_e90_mlrs: {"fac":"fra","role":"mlrs","cat":"vehicle","layer":"ground","name":"LRM","full":"M270 Lance-Roquettes Multiple","cost":1830,"oil":28,"time":27,"hp":625,"armor":"light","speed":1.27,"turn":1.3,"sight":5.1,"r":15,"mass":25,"weapons":["w_e90_fra_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e90","to":"e90","service":"1990","confidence":"high","desc":"The same M270 America fires, built under licence at Roanne, 55 launchers total. France bought the launcher and the M26 rocket and pointedly did not buy ATACMS - the deep-strike missile stayed American, and French rocket artillery has never had a ballistic round. Fired in Bosnia and Kosovo.","turret":true,"tturn":0.8},
  fra_e90_spaag: {"fac":"fra","role":"spaag","cat":"vehicle","layer":"ground","name":"AMX-30 Roland","full":"Roland 2 on AMX-30 chassis","cost":900,"oil":12,"time":15,"hp":720,"armor":"light","speed":1.5,"turn":1.8,"sight":8.7,"r":14,"mass":33,"weapons":["w_e90_fra_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1981","confidence":"high","desc":"A tracked all-weather SHORAD vehicle with its own search and tracking radars and ten missiles aboard - a much more capable thing than the Stinger-on-a-Humvee the US Army was reduced to in the same years. Roland 2 is the clear-and-bad-weather version. Command-guided, so one target at a time, and no gun: it cannot touch anything on the ground.","turret":true,"tturn":2.2,"radar":8},
  fra_e90_recon: {"fac":"fra","role":"recon","cat":"vehicle","layer":"ground","name":"VBL","full":"Panhard Vehicule Blinde Leger","cost":330,"oil":4,"time":7,"hp":290,"armor":"light","speed":2.86,"turn":3.3,"sight":8.7,"r":11,"mass":4,"weapons":["w_e90_fra_recon"],"prereq":["factory"],"tech":1,"from":"e90","to":"e90","service":"1990","confidence":"high","desc":"Four tonnes, amphibious, air-portable inside a Transall, and armoured against 7.62mm - deliberately the smallest useful armoured scout anyone built. Over 1,500 delivered from 1990. It is the French answer to the Humvee and it is a foot shorter, half the weight, and actually armoured, which the early Humvee was not.","turret":true,"tturn":2.4},
  /* fra_e90_sam WAS "Hawk PIP" in the roster document and is DROPPED as a
     factual error. France is one of the very few NATO members that never
     bought the MIM-23 Hawk — Belgium, Denmark, Germany, Greece, Italy, the
     Netherlands, Norway and Spain did; France left the integrated command in
     1966 and built Roland and Crotale instead. The dropped entry's own
     description contradicted itself, admitting a twenty-year gap until
     SAMP/T while filling the slot. France therefore has NO area SAM in the
     1990s: Roland is present as fra_e90_spaag, and the sam role stays empty
     until SAMP/T in fra_e00_sam. */
  fra_e90_tel: {"fac":"fra","role":"tel","cat":"vehicle","layer":"ground","name":"Hades","full":"Hades short-range nuclear missile system","cost":2700,"oil":48,"time":33,"hp":560,"armor":"light","speed":1.3,"turn":1.3,"sight":26,"r":16,"mass":29,"weapons":["w_e90_fra_tel"],"prereq":["factory","lab","radar"],"tech":3,"from":"e90","to":"e90","service":"1992","confidence":"high","desc":"The last land-based French nuclear launcher and the shortest-lived: 15 launchers and 30 missiles accepted from 1992, put into storage in 1993 without ever standing operational alert, and dismantled by 1997 on Chirac's order. Its predecessor Pluton (1974) went the same way. After 1997 France has no mobile ballistic launcher of any kind, nuclear or conventional - the slot is empty from e00 onward, and that is the correct reading of French policy, not an omission.","turret":true,"tturn":0.8,"deploy":true,"deploySec":4,"rounds":1,"noAuto":true},
  fra_e90_fighter: {"fac":"fra","role":"fighter","cat":"aircraft","layer":"air","name":"Mirage 2000-5","full":"Dassault Mirage 2000-5F","cost":1180,"oil":25,"time":19,"hp":360,"armor":"air","speed":8.5,"turn":2.1,"sight":9.8,"r":15,"mass":0,"weapons":["w_e90_fra_fighter"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1997","confidence":"high","desc":"Tailless delta, RDY multi-target radar, and MICA - a missile France built specifically so that it would not have to buy AMRAAM. Thirty-seven Mirage 2000Cs were rebuilt to this standard. The delta gives superb acceleration and a poor sustained turn, and no French fighter of this era has any low-observable shaping whatsoever.","jet":true,"ammo":3,"radar":5.2,"radius":36,"rcs":0.6},
  fra_e90_cas: {"fac":"fra","role":"cas","cat":"aircraft","layer":"air","name":"Mirage 2000D","full":"Dassault Mirage 2000D","cost":1580,"oil":31,"time":24,"hp":540,"armor":"air","speed":6.4,"turn":1.7,"sight":8,"r":17,"mass":0,"weapons":["w_e90_fra_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1993","confidence":"high","desc":"Two-seat conventional strike derivative of the nuclear 2000N, with terrain-following radar and a laser designator pod. Eighty-six built. It has no gun, no air-to-air radar worth the name and no titanium bathtub - it is a night precision bomber, not an A-10, and France has never fielded a dedicated close-support aircraft that can absorb ground fire.","jet":true,"ammo":4,"radius":32,"rcs":1.1},
  fra_e90_gunship: {"fac":"fra","role":"gunship","cat":"aircraft","layer":"air","name":"Gazelle HOT","full":"Aerospatiale SA 342M Gazelle with Viviane sight","cost":760,"oil":13,"time":13,"hp":300,"armor":"air","speed":3.7,"turn":2.7,"sight":8.4,"r":14,"mass":0,"weapons":["w_e90_fra_gunship"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1984","confidence":"high","desc":"Two tonnes of unarmoured light helicopter carrying four wire-guided HOT and a roof-mounted thermal sight. Nimble, cheap, and it must hover in the open for the whole missile flight. France had no armoured attack helicopter at all in this decade - nothing in the Apache or Havoc class - and the Gazelle is what the Alat took to the Gulf in 1991 and to the Balkans instead.","ammo":4,"hover":true,"radius":18,"rcs":0.45},
  fra_e90_transport: {"fac":"fra","role":"transport","cat":"aircraft","layer":"air","name":"AS 532 Cougar","full":"Eurocopter AS 532UL Cougar","cost":740,"oil":12,"time":13,"hp":440,"armor":"air","speed":3.9,"turn":2.4,"sight":7.2,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1990","confidence":"high","desc":"The stretched, better-engined Puma. Twenty-nine troops or two tonnes underslung. Alongside it the SA 330 Puma of 1970 does most of the actual work and keeps doing it into the 2020s, because the NH90 that was supposed to replace it in the 1990s arrives in 2011.","ammo":0,"hover":true,"cargo":9,"radius":30,"rcs":0.9},
  fra_e90_awacs: {"fac":"fra","role":"awacs","cat":"aircraft","layer":"air","name":"E-3F Sentry","full":"Boeing E-3F SDA (Systeme de Detection Aeroportee)","cost":3100,"oil":64,"time":33,"hp":560,"armor":"air","speed":4.12,"turn":0.9,"sight":15,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"Four aircraft, bought outright and flown by the Armee de l'Air rather than through the NATO pool - the point of the purchase was that France could see the air picture without asking anyone. CFM56 engines instead of the USAF's TF33. Four airframes means at most one or two orbits at a time, and that is the entire national capability.","jet":true,"ammo":0,"radar":30,"radius":66,"rcs":3.2,"refuelable":true,"awacs":true},
  fra_e90_ewair: {"fac":"fra","role":"ewair","cat":"aircraft","layer":"air","name":"C-160G Gabriel","full":"Transall C-160G Gabriel ELINT/COMINT","cost":1900,"oil":34,"time":26,"hp":520,"armor":"air","speed":3,"turn":1.3,"sight":13.5,"r":20,"mass":0,"weapons":[],"prereq":["airbase","lab"],"tech":3,"from":"e90","to":"e90","service":"1989","confidence":"high","desc":"State this plainly: France has never operated an electronic-attack aircraft. Gabriel is a listening platform - two airframes, bristling with antennas, which find and fingerprint hostile emitters and pass them on. It jams nothing and it kills nothing. There is no French Prowler, no French Growler, and no plan for one; French packages entering a defended area have always relied on American jamming.","jet":false,"ammo":0,"radar":24,"radarQ":26,"radius":52,"rcs":3.4,"gen":3,"noAuto":true},
  fra_e60_sead: {"fac":"fra","role":"sead","cat":"aircraft","layer":"air","name":"Mirage IIIE / AS.37","full":"Dassault Mirage IIIE with AS.37 Martel","cost":1180,"oil":24,"time":20,"hp":360,"armor":"air","speed":7.0,"turn":1.9,"sight":9.4,"r":16,"mass":0,"weapons":["w_e60_fra_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e60","to":"e60","service":"1972","confidence":"low","desc":"Martel was an Anglo-French programme and the two countries bought opposite halves of it: France took AS.37, the anti-radar round, and Britain took AJ.168, the television-guided one, and bought no anti-radar missile at all until ALARM. A passive seeker with no memory mode, so a battery that shuts down defeats it. One seat, no receiver operator, no second crewman - a strike aircraft carrying an anti-radar round, which is not the same thing as a Wild Weasel. Confidence is low: the missile and the decade are solid, the squadron detail is not.","jet":true,"ammo":2,"radar":4,"radius":28,"rcs":1.3,"noAuto":true},

  fra_e80_sead: {"fac":"fra","role":"sead","cat":"aircraft","layer":"air","name":"Jaguar A / ARMAT","full":"SEPECAT Jaguar A with Matra ARMAT","cost":1380,"oil":26,"time":21,"hp":410,"armor":"air","speed":7.1,"turn":1.7,"sight":10.6,"r":16,"mass":0,"weapons":["w_e80_fra_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e80","to":"e80","service":"1984","confidence":"medium","desc":"This band was empty and should not have been. ARMAT entered French service in 1984, and the e90 row beside this one carries that same 1984 in its own service field while claiming e90 in its from: tag - the date was right in the prose and wrong in the mechanism. A Martel airframe with a new broadband seeker and a 160kg warhead, hung on ordinary Jaguar A and later on the Mirage F1CT and the 2000. Still no dedicated crew and still no memory mode worth the name.","jet":true,"ammo":2,"radar":4,"radius":30,"rcs":1.2,"noAuto":true},
  fra_e90_sead: {"fac":"fra","role":"sead","cat":"aircraft","layer":"air","name":"Jaguar A / ARMAT","full":"SEPECAT Jaguar A with Martel ARMAT","cost":1420,"oil":27,"time":22,"hp":420,"armor":"air","speed":7.2,"turn":1.7,"sight":11,"r":16,"mass":0,"weapons":["w_e90_fra_sead"],"prereq":["airbase","radar"],"tech":2,"from":"e90","to":"e90","service":"1984","confidence":"medium","desc":"Not a Wild Weasel. France never built a dedicated defence-suppression aircraft with a receiver suite and a second crewman; it built an anti-radiation missile, ARMAT, and hung it on ordinary strike aircraft - Jaguar A, and Mirage F1CT. The missile is a 1980s Martel derivative with no memory mode worth the name, so a radar that shuts down defeats it. ARMAT left service in the 2000s with the Jaguar and was never replaced: from then on France has no anti-radiation missile at all.","jet":true,"ammo":2,"radar":4,"radius":30,"rcs":1.2,"noAuto":true},
  fra_e90_airlift: {"fac":"fra","role":"airlift","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":false,"turn":1.4,"sight":8,"r":20,"prereq":["airbase"],"tech":1,"rcs":3.4,"radarQ":0,"gen":2,"name":"C-160NG Transall","full":"Transall C-160NG","cost":1350,"oil":40,"time":21,"hp":600,"speed":3,"ammo":0,"radius":58,"cargo":6,"weapons":[],"from":"e90","to":"e00","service":"1981","confidence":"high","desc":"Franco-German twin-turboprop, 16 tonnes of payload, built because neither country wanted to buy Hercules. The NG added a refuelling probe and a hose. It is the aircraft that flew every French African intervention for forty years, and by the 1990s it was already worn out - the A400M meant to replace it in 1999 does not arrive until 2013."},
  fra_e00_rifle: {"fac":"fra","role":"rifle","cat":"infantry","layer":"ground","name":"Groupe FELIN","full":"Groupe de combat FELIN, FAMAS F1","cost":150,"oil":0,"time":5,"hp":110,"armor":"infantry","speed":1.02,"turn":7,"sight":6.1,"r":6,"mass":0.1,"weapons":["w_e00_fra_rifle"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2010","confidence":"high","desc":"FELIN is the one soldier-modernisation programme of its generation that was actually fielded in quantity - about 22,000 sets from 2010 - where the American Land Warrior was cancelled. Thermal sight on the rifle, helmet display, squad radio. It also weighs 25 kg and eats batteries, and soldiers in Mali stripped parts of it off."},
  fra_e00_at: {"fac":"fra","role":"at","cat":"infantry","layer":"ground","name":"MMP","full":"MBDA MMP / Akeron MP","cost":390,"oil":0,"time":9,"hp":100,"armor":"infantry","speed":0.87,"turn":6,"sight":10.2,"r":6,"mass":0.1,"weapons":["w_e00_fra_at"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2017","confidence":"high","desc":"Twenty-one years after Javelin, France finally has a fire-and-forget top-attack missile. MMP goes further than Javelin in one respect - a fibre-optic link lets the gunner watch the seeker picture and re-aim or wave off in flight, which Javelin cannot do - and it replaced MILAN, which was still in front-line service until then. First combat use in Mali, 2018."},
  fra_e00_aa: {"fac":"fra","role":"aa","cat":"infantry","layer":"ground","name":"Mistral 2","full":"SATCP Mistral 2","cost":325,"oil":0,"time":8,"hp":95,"armor":"infantry","speed":0.89,"turn":6,"sight":7.6,"r":6,"mass":0.1,"weapons":["w_e00_fra_aa"],"prereq":["barracks"],"tech":1,"from":"e00","to":"e00","service":"2000","confidence":"high","desc":"Improved seeker and countermeasure rejection on the same heavy tripod-launched missile. Widely exported, and the only air-defence weapon most French manoeuvre units actually have once Roland is gone."},
  fra_e00_mbt: {"fac":"fra","role":"mbt","cat":"vehicle","layer":"ground","name":"Leclerc S2","full":"Leclerc serie 2 / SXXI","cost":1470,"oil":22,"time":23,"hp":1610,"armor":"heavy","speed":1.73,"turn":1.7,"sight":7.8,"r":16,"mass":57,"weapons":["w_e00_fra_mbt"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"1998","confidence":"medium","desc":"Series 2 brought the ICONE battlefield management system and titanium-reinforced armour blocks; the SXXI standard added air conditioning and hardware for deployment out of Europe. Only 406 Leclercs were ever built and production stopped in 2008, so France has fewer than half the tanks Britain or Germany fielded and no line to build more.","turret":true,"tturn":1.7,"crush":true},
  fra_e00_lighttank: {"fac":"fra","role":"lighttank","cat":"vehicle","layer":"ground","name":"AMX-10 RC renove","full":"AMX-10 RCR (renove)","cost":690,"oil":9,"time":11,"hp":640,"armor":"light","speed":2.2,"turn":2.5,"sight":7.4,"r":13,"mass":18,"weapons":["w_e00_fra_lighttank"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2005","confidence":"medium","desc":"New fire control, add-on armour kits and a diesel rework to keep a 1981 vehicle running to 2030. It fought in Afghanistan and Mali, where the 105mm direct-fire gun on wheels turned out to be exactly the right weapon and the aluminium hull turned out to be exactly the wrong one against IEDs. Replaced by the EBRC Jaguar from 2022.","turret":true,"tturn":1.6},
  fra_e00_ifv: {"fac":"fra","role":"ifv","cat":"vehicle","layer":"ground","name":"VBCI","full":"Nexter VBCI, Dragar 25mm turret","cost":880,"oil":10,"time":14,"hp":810,"armor":"light","speed":1.92,"turn":2.2,"sight":7.3,"r":14,"mass":32,"weapons":["w_e00_fra_ifv"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"2008","confidence":"high","desc":"Thirty-two tonnes on eight wheels doing 100 km/h on a road - France chose wheels for an IFV where America and Germany chose tracks, on the argument that its wars are 3,000 km away and self-deployment matters more than cross-country speed. Titanium and modular armour, 25mm, nine dismounts. It replaced the AMX-10P thirty-five years late and is the equal of any tracked IFV of its generation.","turret":true,"tturn":1.8,"cargo":9},
  fra_e00_spg: {"fac":"fra","role":"spg","cat":"vehicle","layer":"ground","name":"CAESAR","full":"CAESAR 155mm 52-cal on Sherpa 6x6","cost":1180,"oil":13,"time":17,"hp":420,"armor":"light","speed":2.35,"turn":2.6,"sight":5.3,"r":14,"mass":18,"weapons":["w_e00_fra_spg"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2008","confidence":"high","desc":"A genuinely different idea from a tracked SPG: bolt a 52-calibre 155 onto an 18-tonne lorry, accept an unarmoured cab, and buy mobility instead of protection. One minute to emplace, one to leave, 40 km with rocket-assisted shell, and it fits in an A400M - none of which an M109 or an AuF1 can claim. It cannot take a single artillery fragment, and Ukraine has proved both halves of that bargain. No French cargo shell sows mines, so it cannot lay a minefield.","turret":true,"tturn":0.7,"deploy":true,"deploySec":4},
  fra_e00_mlrs: {"fac":"fra","role":"mlrs","cat":"vehicle","layer":"ground","name":"LRU","full":"Lance-Roquettes Unitaire (M270 with GMLRS)","cost":2020,"oil":31,"time":28,"hp":650,"armor":"light","speed":1.29,"turn":1.3,"sight":5.3,"r":15,"mass":25,"weapons":["w_e00_fra_mlrs"],"prereq":["factory","lab"],"tech":3,"from":"e00","to":"e00","service":"2014","confidence":"high","desc":"Thirteen launchers. That is the number - France cut its 55 M270s to 13 rebuilt to fire the GPS-guided unitary rocket, scrapped the cluster stock under the 2008 Oslo convention, and left itself with a rocket artillery park smaller than most brigades'. Accurate to a few metres at 70 km and there is almost none of it.","turret":true,"tturn":0.8},
  fra_e00_spaag: {"fac":"fra","role":"spaag","cat":"vehicle","layer":"ground","name":"Crotale NG","full":"Crotale NG (Armee de l'Air base defence)","cost":980,"oil":13,"time":15,"hp":600,"armor":"light","speed":1.2,"turn":1.4,"sight":9.6,"r":14,"mass":15,"weapons":["w_e00_fra_spaag"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2008","confidence":"medium","desc":"Pulse-Doppler search, TWT tracker, IR and TV channels and eight VT-1 missiles - a good all-weather SHORAD system, and it belongs to the air force and sits on airfields. The Armee de Terre gave up Roland in the late 2000s and replaced it with nothing but Mistral teams and towed 20mm guns, so French manoeuvre brigades spent roughly the same fifteen years as the US Army with no vehicle-mounted short-range air defence at all.","turret":true,"tturn":2.2,"radar":9},
  fra_e00_recon: {"fac":"fra","role":"recon","cat":"vehicle","layer":"ground","name":"VBL","full":"Panhard VBL, mid-life upgrade","cost":370,"oil":5,"time":7,"hp":310,"armor":"light","speed":2.84,"turn":3.3,"sight":9,"r":11,"mass":5,"weapons":["w_e00_fra_recon"],"prereq":["factory"],"tech":1,"from":"e00","to":"e00","service":"1990","confidence":"medium","desc":"Still the VBL, twenty years on, with a heavier engine and add-on plates that took it from 3.5 to over 5 tonnes and used up its margin. Its replacement, the VBAE, has slipped repeatedly into the 2030s; the interim answer is the Scorpion programme's Serval, which is a protected troop carrier rather than a scout. The little armoured car is doing a job nothing was built to take over.","turret":true,"tturn":2.4},
  fra_e00_sam: {"fac":"fra","role":"sam","cat":"vehicle","layer":"ground","name":"SAMP/T Mamba","full":"SAMP/T with Aster 30 Block 1","cost":2700,"oil":38,"time":33,"hp":580,"armor":"light","speed":1.2,"turn":1.1,"sight":13.6,"r":16,"mass":34,"weapons":["sam_area3"],"prereq":["factory","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"2011","confidence":"high","desc":"France's answer to Patriot, and the only European-designed long-range SAM in service. Eight Aster 30 in vertical cells on a lorry, an Arabel or GF300 radar, and a terminal dart stage that pulls 60 g - the missile steers on side thrusters at the last instant instead of on fins alone. Genuinely competitive with PAC-3 against aircraft and shorter-ranged ballistic missiles, and there are only about eight batteries.","turret":false,"deploy":true,"deploySec":5,"radar":13,"radarQ":19,"rounds":8},
  fra_e00_fighter: {"fac":"fra","role":"fighter","cat":"aircraft","layer":"air","name":"Rafale","full":"Dassault Rafale C / B, standard F3","cost":1420,"oil":30,"time":21,"hp":420,"armor":"air","speed":8.7,"turn":2.2,"sight":10.8,"r":15,"mass":0,"weapons":["w_e00_fra_fighter"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2006","confidence":"high","desc":"Close-coupled canard delta, RBE2 radar - passive array first, AESA from 2013 - and the SPECTRA self-protection suite, which is the aircraft's real distinction: it locates and jams threats itself rather than relying on an escort. Omnirole by design, so one airframe does what the F-15E, F-16 and F/A-18 do separately. It is not stealthy and was never meant to be; France skipped the fifth generation entirely.","jet":true,"ammo":5,"radar":7.2,"radius":42,"rcs":0.7,"refuelable":true},
  fra_e00_cas: {"fac":"fra","role":"cas","cat":"aircraft","layer":"air","name":"Rafale / AASM","full":"Rafale F3 with AASM Hammer","cost":1780,"oil":35,"time":25,"hp":460,"armor":"air","speed":7.6,"turn":1.9,"sight":9.2,"r":17,"mass":0,"weapons":["w_e00_fra_cas"],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"2008","confidence":"high","desc":"AASM bolts a rocket motor and a guidance kit to a plain 250 kg bomb, so it can be released 50 km out and 15 km off-axis - a glide bomb with a boost stage, which is not something the US inventory had at the time. First used over Afghanistan in 2008 and heavily in Libya and the Sahel. The airframe is a fast jet, though: no gun run, no armour, and France has no aircraft that can survive loitering low over a contested position.","jet":true,"ammo":6,"radius":38,"rcs":0.7,"refuelable":true},
  fra_e00_gunship: {"fac":"fra","role":"gunship","cat":"aircraft","layer":"air","name":"Tigre HAD","full":"Airbus Helicopters Tigre HAD","cost":1480,"oil":24,"time":21,"hp":540,"armor":"air","speed":3.6,"turn":2.5,"sight":9.4,"r":15,"mass":0,"weapons":["w_e00_fra_gunship"],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2013","confidence":"high","desc":"France's first real attack helicopter, forty years after the Cobra. Composite airframe, twin 30mm-tolerant, a roof sight and Hellfire II on the HAD standard, replacing the Trigat missile that was cancelled. Six tonnes against the Apache's ten: quieter, more agile, shorter-legged, and no mast-mounted radar - the Tigre has to expose itself to see, where a Longbow Apache does not.","ammo":8,"hover":true,"radius":22,"rcs":0.55},
  fra_e00_transport: {"fac":"fra","role":"transport","cat":"aircraft","layer":"air","name":"NH90 Caiman","full":"NHIndustries NH90 TTH Caiman","cost":900,"oil":14,"time":15,"hp":490,"armor":"air","speed":4.1,"turn":2.4,"sight":7.8,"r":15,"mass":0,"weapons":[],"prereq":["airbase"],"tech":2,"from":"e00","to":"e00","service":"2011","confidence":"high","desc":"Composite airframe, fly-by-wire, and the first production helicopter with no mechanical backup to the flight controls. Fourteen to twenty troops. It arrived roughly fifteen years late and cost enough that France bought too few, so the Puma of 1970 flew alongside it for another decade.","ammo":0,"hover":true,"cargo":12,"radius":32,"rcs":0.85},
  fra_e00_awacs: {"fac":"fra","role":"awacs","cat":"aircraft","layer":"air","name":"E-3F (MLU)","full":"Boeing E-3F SDA, mid-life upgrade","cost":3230,"oil":67,"time":33,"hp":595,"armor":"air","speed":4.16,"turn":0.9,"sight":15.5,"r":26,"mass":0,"weapons":[],"prereq":["airbase","radar","lab"],"tech":3,"from":"e00","to":"e00","service":"2006","confidence":"medium","desc":"New mission computers, colour consoles, Link 16 and a glass cockpit on the same 1970s APY-2 antenna. Still four aircraft. France flew them over Libya in 2011 and over the Sahel, and a fleet of four means the national air picture goes dark whenever two are in depot.","jet":true,"ammo":0,"radar":32,"radius":68,"rcs":3.2,"refuelable":true,"awacs":true},
  fra_e00_ewair: {"fac":"fra","role":"ewair","cat":"aircraft","layer":"air","name":"C-160G Gabriel","full":"Transall C-160G Gabriel, to 2022","cost":1950,"oil":34,"time":26,"hp":530,"armor":"air","speed":3,"turn":1.3,"sight":14,"r":20,"mass":0,"weapons":[],"prereq":["airbase","lab"],"tech":3,"from":"e00","to":"e00","service":"1989","confidence":"high","desc":"Unchanged, and still the only French airborne electronic-warfare aircraft: two Transalls that listen. It flew over Libya, Mali and the Levant locating emitters that French aircraft then had no anti-radiation missile to shoot. Retired 2022; the replacement, Archange, is also a listening aircraft.","jet":false,"ammo":0,"radar":25,"radarQ":28,"radius":52,"rcs":3.4,"gen":3,"noAuto":true},
  fra_e00_radarv: {"fac":"fra","role":"radarv","cat":"vehicle","layer":"ground","name":"COBRA","full":"COBRA counter-battery radar","cost":1180,"oil":11,"time":16,"hp":490,"armor":"light","speed":1.6,"turn":1.7,"sight":8.7,"r":14,"mass":18,"weapons":[],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"2008","confidence":"medium","desc":"Franco-German-British phased array that back-plots mortar, gun and rocket trajectories to their firing point. France took ten. Before it arrived the French army had battlefield surveillance radars - RATAC, RASIT - and no counter-battery radar at all, which is why the AuF1 batteries in Bosnia were shooting largely blind.","turret":true,"tturn":0.9,"radar":13,"radarQ":19},
  fra_e00_airlift: {"fac":"fra","role":"airlift","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":false,"turn":1.3,"sight":8.5,"r":22,"prereq":["airbase"],"tech":2,"rcs":4.2,"radarQ":0,"gen":4,"name":"A400M Atlas","full":"Airbus A400M Atlas","cost":2100,"oil":52,"time":28,"hp":760,"speed":3.9,"ammo":0,"radius":90,"cargo":14,"weapons":[],"from":"e00","to":"e00","service":"2013","confidence":"high","desc":"Thirty-seven tonnes of payload on eight-bladed scimitar propellers, fast enough to keep station in a jet stream and slow enough to land on a dirt strip - the aircraft that sits in the gap between a Hercules and a C-17, which nothing else fills. Fourteen years late, ruinously expensive, and it is the only reason France can put an armoured vehicle in the Sahel without asking Washington for a lift."},
  fra_e60_tanker: {"fac":"fra","role":"tanker","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":true,"turn":0.9,"sight":9,"r":22,"prereq":["airbase","radar"],"tech":2,"rcs":5,"radarQ":0,"gen":2,"name":"C-135F","full":"Boeing C-135F Stratotanker, 93e Escadre de Ravitaillement en Vol","cost":2500,"oil":60,"time":36,"hp":640,"speed":4.20,"ammo":0,"radius":120,"tanker":300,"refuelRate":11,"weapons":[],"from":"e60","to":"e60","service":"1964","confidence":"high","desc":"Twelve aircraft delivered in 1964 - the e00 row further down this block already says so in its own description, which is how the three empty bands above it were found. France has had strategic air-to-air refuelling since the year the Mirage IV went on alert, because a Mirage IV could not reach a Soviet target without one. Bought from the United States by a country that was about to walk out of NATO's integrated command, which is the paradox of the force de frappe in a single airframe. Boom-equipped, unlike every British tanker of the period."},

  fra_e80_tanker: {"fac":"fra","role":"tanker","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":true,"turn":0.9,"sight":9,"r":22,"prereq":["airbase","radar"],"tech":2,"rcs":5,"radarQ":0,"gen":2.2,"name":"C-135FR","full":"Boeing C-135FR, re-engined with CFM56","cost":2650,"oil":63,"time":37,"hp":670,"speed":4.25,"ammo":0,"radius":132,"tanker":340,"refuelRate":13,"weapons":[],"from":"e80","to":"e80","service":"1985","confidence":"high","desc":"The same surviving airframes with CFM56 turbofans in place of the original water-injected J57s: quieter, far more efficient, and with appreciably more fuel left to give away. A re-engine is the cheapest way to buy a new tanker and France did it thirty years before it bought a real one."},

  fra_e90_tanker: {"fac":"fra","role":"tanker","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":true,"turn":0.9,"sight":9,"r":22,"prereq":["airbase","radar"],"tech":2,"rcs":5,"radarQ":0,"gen":2.4,"name":"C-135FR","full":"Boeing C-135FR Stratotanker","cost":2720,"oil":64,"time":37,"hp":685,"speed":4.28,"ammo":0,"radius":136,"tanker":350,"refuelRate":13,"weapons":[],"from":"e90","to":"e90","service":"1985","confidence":"high","desc":"Unchanged and unreplaced through the whole decade, and flown over Bosnia and Kosovo. Eleven tankers is the entire national capability, the airborne leg of the deterrent sits on top of them, and France did not order a replacement until the A330 MRTT contract of 2014."},
  fra_e00_tanker: {"fac":"fra","role":"tanker","cat":"aircraft","armor":"air","layer":"air","mass":0,"jet":true,"turn":0.9,"sight":9,"r":22,"prereq":["airbase","radar"],"tech":2,"rcs":5,"radarQ":0,"gen":2.5,"name":"C-135FR","full":"Boeing C-135FR Stratotanker","cost":2800,"oil":66,"time":38,"hp":700,"speed":4.3,"ammo":0,"radius":140,"tanker":360,"refuelRate":14,"weapons":[],"from":"e00","to":"e00","service":"1985","confidence":"high","desc":"Eleven aircraft, bought in 1964 and re-engined with CFM56 in the 1980s, and for fifty years the single point of failure in the French deterrent - a Mirage IV or a Mirage 2000N could not reach a target without one. Replaced from 2018 by the A330 MRTT Phenix. A nuclear power whose airborne leg depends on eleven sixty-year-old tankers is a real strategic fact, not a game abstraction."},
});


/* ===================== FOUR NAVIES - Britain, France and Germany =====================
   The American era fleet is already in this file, above. These are the other
   three, and they are meant to be told apart on the ship list without reading
   a word of the prose: Britain has a carrier in every era and they are small,
   plus the best sonar figures in the game; France has one carrier that goes
   nuclear and the only European deck with a fixed-wing early-warning aircraft;
   Germany has no carrier row at all in any era, no cruiser, no ballistic-missile
   boat, and instead the only submarines here that carry mines.

   WEAPONS: every hull points at the same-era `w_e**_nato_<role>` id, or at a
   shared era-neutral id (hmg, torpedo, asw_mk54). That is a hard requirement,
   not a shortcut - the w_<era>_<fac>_<role> rows are literal, not generated,
   and entities.js dereferences w.tgt with no guard, so an invented id throws
   on the first target evaluation. generations.js privateWeapon() clones a
   shared weapon per unit before every stamping pass, so a British frigate
   sharing w_e50_nato_corvette cannot alter the American one. */
Object.assign(UNITS, {
/* ============ ROYAL NAVY - era units, e50 to e00 ============
   Every hull here points at the same-era `w_e**_nato_<role>` weapon, and that
   is deliberate rather than lazy: those ids are 784 LITERAL rows at the head of
   this file, not generated, so a British corvette invented with a
   `w_e50_gbr_corvette` would dereference undefined on its first target
   evaluation and throw. generations.js privateWeapon() clones a shared weapon
   per unit before every stamping pass, so nothing here can contaminate the
   American original. Where the ordnance is the identity - the 4.5in Mk 8,
   Spearfish, Sting Ray, Trident - the weapon is authored in rules.js outside
   the w_<era>_<fac>_<role> pattern and carried by the present-day hull.

   Deliberately empty and NOT gaps to be filled: `missileboat` in every era,
   because the Royal Navy has never operated an anti-ship missile fast attack
   craft; `cruiser` from e80, because HMS Blake paid off in 1979 and nothing
   replaced her - an Invincible is a carrier whatever the Treasury called it,
   and a Type 45 is a destroyer; `ssgn`, because British land-attack missiles
   are fired from the torpedo tubes of an attack boat; `cawacs`, because a
   ski-jump deck cannot launch a fixed-wing early-warning aircraft, which is
   `cawacs` WAS listed here as deliberately empty, on the ground that a
   ski-jump deck cannot launch a fixed-wing early-warning aircraft. That is
   true of an Invincible and of a Queen Elizabeth and it is NOT true of the
   two decks above them in this same block: Eagle and Ark Royal had steam
   catapults and flew the Skyraider AEW.1 from 1952 and the Gannet AEW.3
   from 1960. It is also beside the point after 1982, because the answer to
   a ski-jump is not a fixed-wing aircraft at all - it is a radar in a bag
   on the side of a helicopter, and Britain has flown one continuously,
   Sea King AEW.2 to AEW.2A to ASaC.7 to Crowsnest on a Merlin. Four
   airframes, two radar families, one job: the same shape as the E-2A to
   E-2D chain, and the reason the role now has all six bands filled. */
  gbr_e50_patrol: { fac:"gbr", role:"patrol", cat:"naval", layer:"sea", name:"Ford-class SDB", full:"Ford-class seaward defence boat", cost:235, oil:3, time:6, hp:260, armor:"light", speed:2.3, turn:2.2, sight:5.2, r:13, mass:0, weapons:["hmg"], prereq:["navalyard"], tech:1, from:"e50", to:"e50", service:"1954", confidence:"high", turret:true, tturn:2.4, sonar:1.4, rcs:0.4, desc:"Twenty small wooden-hulled boats for harbour and estuary defence, the least glamorous ships in the fleet and the only cheap hull it had. The fast attack craft of the decade were wartime MTB survivors and the Gay class of 1952. The Royal Navy never built the missile boat that half of Europe did, and never has." },
  gbr_e50_corvette: { fac:"gbr", role:"corvette", cat:"naval", layer:"sea", name:"Type 12 Whitby FF", full:"HMS Whitby (F36), Type 12 first-rate anti-submarine frigate", cost:560, oil:7, time:13, hp:600, armor:"light", speed:2.55, turn:1.7, sight:5.8, r:17, mass:0, weapons:["w_e50_nato_corvette"], prereq:["navalyard"], tech:1, from:"e50", to:"e50", service:"1956", confidence:"high", turret:true, tturn:2.0, sonar:4.2, radar:8.6, ciws:0.3, rcs:0.9, desc:"Built around one question - can it keep up with a fast submarine in an Atlantic sea state - and the answer was a very fine raised bow and thirty knots. The line runs Whitby to Rothesay to Leander and stops there: the Type 21, Type 22 and Type 23 are separate designs and the Type 23 owes the Whitby hull nothing." },
  gbr_e50_destroyer: { fac:"gbr", role:"destroyer", cat:"naval", layer:"sea", name:"Daring DD", full:"HMS Daring (D05), Daring-class", cost:1030, oil:16, time:22, hp:1080, armor:"heavy", speed:2.1, turn:1.2, sight:6.6, r:20, mass:0, weapons:["w_e50_nato_destroyer","aagun_rn45"], prereq:["navalyard","radar"], tech:2, from:"e50", to:"e50", service:"1952", confidence:"high", turret:true, tturn:1.4, sonar:5.4, radar:11.5, ciws:0.5, rcs:1, desc:"Eight ships, three twin 4.5in Mk 6 turrets, and officially not destroyers at all for a while - they were rated Daring-class ships because they were too large for the word. The last all-gun destroyer design Britain built. Everything after this carries a missile, and the missile in question, Sea Slug, took ten years to arrive." },
  gbr_e50_cruiser: { fac:"gbr", role:"cruiser", cat:"naval", layer:"sea", name:"Swiftsure CL", full:"HMS Swiftsure (08), Swiftsure/Minotaur-class light cruiser", cost:1580, oil:28, time:33, hp:1490, armor:"heavy", speed:1.75, turn:0.9, sight:7.0, r:23, mass:0, weapons:["navgun_rn6_50","aagun_bofors"], prereq:["navalyard","lab"], tech:3, from:"e50", to:"e50", service:"1944", confidence:"high", turret:true, tturn:1.0, sonar:4.2, radar:11.8, ciws:0.44, rcs:1.6, desc:"The 1950s British cruiser force is wartime stock: the Fiji or Colony class of 1940-43 (Crown Colony is the same class, not a separate one), the three Ceylon sub-group, and Swiftsure and Minotaur. Triple 6in turrets and enough armour to matter, and every one of them a ship the Treasury was already trying to pay off. Tiger, the first new-build, does not commission until 1959." },
  gbr_e50_sub: { fac:"gbr", role:"sub", cat:"naval", layer:"sub", name:"Porpoise SSK", full:"HMS Porpoise (S01), Porpoise-class", cost:1120, oil:18, time:24, hp:640, armor:"light", speed:2.05, turn:1.1, sight:5.0, r:17, mass:0, weapons:["w_e50_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e50", to:"e50", service:"1958", confidence:"high", sonar:5.4, quiet:0.42, radarQ:2, desc:"The first British submarines designed from a clean sheet after 1945, and among the quietest diesel boats in the world when they appeared - deep-diving, heavily silenced, and built for the long Atlantic patrol. Britain has no nuclear boat yet: Dreadnought is five years away and her reactor will be American." },
  gbr_e50_carrier: { fac:"gbr", role:"carrier", cat:"naval", layer:"sea", name:"Audacious CV", full:"HMS Ark Royal (R09) and HMS Eagle (R05), Audacious-class", cost:1980, oil:44, time:44, hp:1840, armor:"heavy", speed:1.4, turn:0.6, sight:8.0, r:30, mass:0, weapons:["w_e50_nato_carrier"], prereq:["navalyard","lab","airbase"], tech:3, from:"e50", to:"e50", service:"1951", confidence:"high", carrier:3, sonar:2.4, radar:9.8, ciws:0.4, rcs:2.5, desc:"Fifty thousand tonnes, and the ships on which the three inventions that made the jet carrier possible were tried out: the steam catapult, the angled deck and the mirror landing sight, all British, all handed to the United States Navy, and all in American service within five years. Britain also still had the light fleet carriers - Centaur, Hermes, Albion, Bulwark - which is a genuinely large carrier force for the last time." },
  gbr_e50_cfighter: { fac:"gbr", role:"cfighter", cat:"aircraft", layer:"air", name:"Sea Hawk FGA.6", full:"Hawker Sea Hawk FGA.6", cost:700, oil:16, time:14, hp:300, armor:"air", speed:4.6, turn:2.3, sight:5.6, r:16, mass:0, weapons:["w_e50_nato_fighter","w_e50_gbr_cas"], prereq:["airbase"], tech:2, from:"e50", to:"e50", service:"1953", confidence:"high", jet:true, ammo:4, gen:1.5, radar:0, radarQ:0, radius:16, rcs:1.0, carrierCapable:true, desc:"Four 20 mm Hispano cannon, no radar, and a bifurcated jet pipe either side of the wing root so the fuselage could hold fuel. Flown hard over Suez in 1956. The all-weather half of the air group was the Sea Venom, and the strike half was still the piston-engined Wyvern - a turboprop torpedo aircraft that killed a great many of its own pilots." },

  gbr_e60_patrol: { fac:"gbr", role:"patrol", cat:"naval", layer:"sea", name:"Brave-class FPB", full:"HMS Brave Borderer (P1011), Brave-class fast patrol boat", cost:290, oil:4, time:7, hp:280, armor:"light", speed:3.5, turn:2.4, sight:5.6, r:13, mass:0, weapons:["hmg","torpedo"], prereq:["navalyard"], tech:1, from:"e60", to:"e60", service:"1960", confidence:"high", turret:true, tturn:2.4, sonar:0, rcs:0.4, desc:"Two boats, launched in 1958, on three Bristol Siddeley Proteus gas turbines - well over fifty knots, a 40 mm forward and two 21in torpedoes, and the fastest thing the Royal Navy has ever put on the water. Both were gone by 1970 and nothing replaced them: the coastal forces branch was wound up, and the fast attack craft that dominated the Baltic and the Mediterranean became somebody else's weapon." },
  gbr_e60_corvette: { fac:"gbr", role:"corvette", cat:"naval", layer:"sea", name:"Leander FF", full:"HMS Leander (F109), Leander-class frigate", cost:700, oil:9, time:13, hp:740, armor:"light", speed:2.65, turn:1.7, sight:6.8, r:17, mass:0, weapons:["w_e60_nato_corvette"], prereq:["navalyard"], tech:1, from:"e60", to:"e60", service:"1963", confidence:"high", turret:true, tturn:2.0, sonar:5.0, radar:9.8, ciws:0.34, rcs:0.95, desc:"Twenty-six built for Britain and dozens more abroad - the frigate that defined the Royal Navy for a generation and the last of the Whitby line. A twin 4.5in forward, a hangar and a Wasp aft, and a hull that was rebuilt three separate ways in the 1970s to carry Exocet, Ikara or Sea Wolf as the money allowed." },
  gbr_e60_destroyer: { fac:"gbr", role:"destroyer", cat:"naval", layer:"sea", name:"County DLG", full:"HMS Devonshire (D02), County-class guided missile destroyer", cost:1290, oil:20, time:23, hp:1330, armor:"heavy", speed:2.15, turn:1.2, sight:7.6, r:20, mass:0, weapons:["w_e60_nato_destroyer","sam_seaslug"], prereq:["navalyard","radar"], tech:2, from:"e60", to:"e60", service:"1962", confidence:"high", turret:true, tturn:1.4, sonar:6.2, radar:13.4, ciws:0.5, rcs:1.2, desc:"Six thousand tonnes to carry one Sea Slug launcher - a beam-riding missile so large the ship was built around a magazine running most of its length, and so limited that the class also kept two twin 4.5in guns. Handsome, roomy, and obsolete on arrival. HMS Glamorgan took an Exocet off Stanley in 1982 and survived it." },
  gbr_e60_cruiser: { fac:"gbr", role:"cruiser", cat:"naval", layer:"sea", name:"Tiger CL", full:"HMS Tiger (C20), Tiger-class light cruiser", cost:1960, oil:34, time:35, hp:1830, armor:"heavy", speed:1.82, turn:0.9, sight:8.2, r:23, mass:0, weapons:["navgun_rn6in","aagun_rn3in70"], prereq:["navalyard","lab"], tech:3, from:"e60", to:"e60", service:"1959", confidence:"high", turret:true, tturn:1.0, sonar:5.0, radar:13.6, ciws:0.5, rcs:1.6, desc:"Three ships laid down in the war and finished fourteen years later with fully automatic twin 6in and 3in mountings that were superb and endlessly unreliable. Converted between 1965 and 1972 into helicopter cruisers by cutting off the after turret and building a hangar for four Sea Kings. HMS Blake paid off in 1979 and the Royal Navy has not operated a cruiser since - which is why this slot is empty from e80 onward and stays empty." },
  gbr_e60_sub: { fac:"gbr", role:"sub", cat:"naval", layer:"sub", name:"Valiant SSN", full:"HMS Valiant (S102), Valiant-class; HMS Dreadnought (S101) 1963", cost:1400, oil:23, time:25, hp:790, armor:"light", speed:2.25, turn:1.1, sight:5.8, r:17, mass:0, weapons:["w_e60_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e60", to:"e60", service:"1966", confidence:"high", sonar:7.4, quiet:0.50, radarQ:3, nuclear:true, desc:"Britain is the third navy in the world with a nuclear submarine, after Nautilus in 1954 and K-3 in 1958, and the second in the West. Dreadnought, the first, ran an American S5W reactor supplied under the 1958 Mutual Defence Agreement; Valiant is the first with a British plant end to end. Thirteen Oberon-class diesel boats are commissioning alongside them and will still be the numerical backbone of the submarine service twenty years later." },
  nato_e60_ssbn: { fac:"nato", role:"ssbn", cat:"naval", layer:"sub", name:"Lafayette SSBN", full:"SSBN-616 Lafayette class", cost:3500, oil:80, time:48, hp:1540, armor:"heavy", speed:1.9, turn:0.5, sight:5.0, r:26, mass:0, weapons:["slbm_polaris"], prereq:["navalyard","lab","radar"], tech:3, from:"e60", to:"e80", service:"1963", confidence:"high", sonar:7.2, quiet:0.40, radarQ:4, nuclear:true, ssbn:true, desc:"Thirty-one boats of the 41 for Freedom, carrying sixteen Polaris and later Poseidon tubes. The Ohio that replaces them is not commissioned until 1981, so this is the American deterrent at sea for two decades." },
  gbr_e60_ssbn: { fac:"gbr", role:"ssbn", cat:"naval", layer:"sub", name:"Resolution SSBN", full:"HMS Resolution (S22), Resolution-class", cost:3450, oil:78, time:48, hp:1520, armor:"heavy", speed:1.9, turn:0.5, sight:5.0, r:26, mass:0, weapons:["slbm_polaris"], prereq:["navalyard","lab","radar"], tech:3, from:"e60", to:"e80", service:"1967", confidence:"high", sonar:7.0, quiet:0.36, radarQ:4, nuclear:true, ssbn:true, desc:"Commissioned 2 October 1967 with sixteen Polaris A3 tubes; first patrol February 1968; and from 30 June 1969 at least one of the four has been at sea with the deterrent every single day since, which is the longest unbroken continuous-at-sea deterrence of any nuclear power. Chevaline, the British-designed penetration aid fitted from 1982, cost roughly a billion pounds and was kept secret from most of the Cabinet that paid for it." },
  gbr_e60_carrier: { fac:"gbr", role:"carrier", cat:"naval", layer:"sea", name:"Ark Royal CVA", full:"HMS Ark Royal (R09), after the 1967-70 Phantom refit", cost:2400, oil:53, time:47, hp:2150, armor:"heavy", speed:1.44, turn:0.6, sight:9.4, r:30, mass:0, weapons:["w_e60_nato_carrier"], prereq:["navalyard","lab","airbase"], tech:3, from:"e60", to:"e60", service:"1970", confidence:"high", carrier:3, sonar:2.8, radar:11.6, ciws:0.46, rcs:2.5, desc:"Phantom FG.1, Buccaneer S.2, Gannet AEW.3 - a genuine strike carrier air group with its own fixed-wing early warning, and the last one Britain would have for fifty years. The 1966 Defence Review killed the CVA-01 replacement outright; Ark Royal paid off in 1978, the Gannets went with her, and Britain lost carrier-borne airborne early warning until 1982 - a lesson it learned in the South Atlantic at cost." },
  gbr_e60_cfighter: { fac:"gbr", role:"cfighter", cat:"aircraft", layer:"air", name:"Phantom FG.1", full:"McDonnell Douglas Phantom FG.1 (F-4K)", cost:980, oil:22, time:17, hp:350, armor:"air", speed:6.6, turn:2.0, sight:7.0, r:16, mass:0, weapons:["w_e60_nato_fighter","w_e60_gbr_cstrike"], prereq:["airbase"], tech:2, from:"e60", to:"e60", service:"1969", confidence:"high", jet:true, ammo:4, gen:3, radar:6, radarQ:8, radius:26, rcs:1.4, carrierCapable:true, refuelable:true, desc:"An American airframe re-engined with Rolls-Royce Speys that made it fatter, slower at altitude and far more expensive, fitted with an extending nose leg so it could get off a British deck a hundred feet shorter than an American one. The Sea Vixen it replaced was a subsonic all-weather fighter with the pilot offset to port and the observer sealed in a windowless hole beside him." },
  gbr_e50_aswhelo: { fac:"gbr", role:"aswhelo", cat:"aircraft", layer:"air", name:"Whirlwind HAS.7", full:"Westland Whirlwind HAS.7, 845 NAS", cost:560, oil:12, time:11, hp:210, armor:"air", speed:2.3, turn:2.0, sight:4.6, r:12, mass:0, weapons:["asw_mk54"], prereq:["airbase"], tech:2, from:"e50", to:"e50", service:"1957", confidence:"medium", ammo:1, radius:10, sonar:3.0, rcs:1.0, radarQ:0, gen:1.5, desc:"The first British helicopter built to hunt submarines rather than to carry people, and so short of power that it could take the dipping sonar OR the homing torpedo and not both. Squadrons therefore flew in hunter-killer pairs: one aircraft in the hover holding contact, the other circling with the weapon. The Alvis Leonides Major was a piston engine and an unreliable one - the turbine Whirlwind is 1966, by which time the Wessex above had the job." },
  gbr_e60_aswhelo: { fac:"gbr", role:"aswhelo", cat:"aircraft", layer:"air", name:"Wessex HAS.1", full:"Westland Wessex HAS.1", cost:720, oil:15, time:12, hp:250, armor:"air", speed:2.8, turn:2.2, sight:5.4, r:12, mass:0, weapons:["asw_mk54"], prereq:["airbase"], tech:2, from:"e60", to:"e60", service:"1961", confidence:"high", ammo:2, radius:14, sonar:4.4, rcs:1.0, radarQ:2, gen:2, desc:"A licence-built Sikorsky S-58 with a Napier Gazelle turbine in the nose instead of a radial piston engine - the first turbine-powered anti-submarine helicopter in service anywhere, and the aircraft that made a dipping sonar a routine part of a frigate's kit. One dunking sonar, two homing torpedoes, and a crew who had to hover on instruments over a black sea at night." },

  gbr_e80_patrol: { fac:"gbr", role:"patrol", cat:"naval", layer:"sea", name:"Island-class OPV", full:"HMS Jersey (P295), Island-class offshore patrol vessel", cost:370, oil:5, time:8, hp:400, armor:"light", speed:2.0, turn:1.8, sight:6.8, r:13, mass:0, weapons:["hmg"], prereq:["navalyard"], tech:1, from:"e80", to:"e80", service:"1977", confidence:"high", turret:true, tturn:2.4, sonar:0.8, rcs:0.72, desc:"A trawler hull with a 40 mm on the bow, built to sit in the North Sea in weather that would stop a warship and protect the new oil fields and the fishery limits. Nothing about it is fast or dangerous and that was the point - after the Brave boats went, Britain's small combatant is a constabulary vessel and has been ever since." },
  gbr_e80_corvette: { fac:"gbr", role:"corvette", cat:"naval", layer:"sea", name:"Type 22 Broadsword", full:"HMS Broadsword (F88), Type 22 Batch 1 frigate", cost:900, oil:12, time:14, hp:930, armor:"light", speed:2.78, turn:1.7, sight:8.2, r:17, mass:0, weapons:["w_e80_nato_corvette"], prereq:["navalyard"], tech:1, from:"e80", to:"e80", service:"1979", confidence:"high", turret:true, tturn:2.0, sonar:6.4, radar:13.5, ciws:0.44, rcs:1.05, desc:"The first Royal Navy escort designed with no medium gun at all - two Sea Wolf launchers, four Exocet and two Lynx, and an anti-submarine suite that was the best in NATO outside the American fleet. Sea Wolf's Falklands kills were aircraft, A-4s and a Dagger from Broadsword and Brilliant, and on one crossing raid the system refused to fire; its sea-skimmer credential is a trials intercept of a 4.5in shell in flight, which is a real achievement and a different claim." },
  gbr_e80_destroyer: { fac:"gbr", role:"destroyer", cat:"naval", layer:"sea", name:"Type 42 Sheffield", full:"HMS Sheffield (D80), Type 42 Batch 1 destroyer", cost:1640, oil:25, time:25, hp:1610, armor:"heavy", speed:2.3, turn:1.2, sight:9.0, r:20, mass:0, weapons:["navgun_76","sam_seadart"], prereq:["navalyard","radar"], tech:2, from:"e80", to:"e80", service:"1975", confidence:"high", turret:true, tturn:1.4, sonar:6.6, radar:16.0, ciws:0.5, rcs:1.1, desc:"Sea Dart on a hull cut short to a price, and it shows: no close-in weapon system, a poor low-level radar picture and an aluminium-alloy superstructure. Sheffield was hit by an Exocet on 4 May 1982 and burned for six days; Coventry was bombed and capsized on 25 May. Sea Dart also shot down more aircraft than anything else in the British inventory that year, which is the whole argument about this class in one sentence." },
  gbr_e80_sub: { fac:"gbr", role:"sub", cat:"naval", layer:"sub", name:"Swiftsure SSN", full:"HMS Swiftsure (S126), Swiftsure-class", cost:1790, oil:29, time:27, hp:970, armor:"light", speed:2.4, turn:1.1, sight:7.0, r:17, mass:0, weapons:["w_e80_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e80", to:"e80", service:"1973", confidence:"high", sonar:8.6, quiet:0.40, radarQ:4, nuclear:true, desc:"Six boats, a fuller hull form than the Valiants, deeper diving and much quieter - the missing generation between Valiant and Trafalgar. HMS Conqueror, a Churchill-class half-sister, sank the General Belgrano on 2 May 1982, still the only nuclear submarine to have sunk a ship in war. By hull count the British submarine of this decade is not nuclear at all: it is the Oberon, thirteen diesel boats that served from 1961 to 1993." },
  gbr_e80_carrier: { fac:"gbr", role:"carrier", cat:"naval", layer:"sea", name:"Invincible CVS", full:"HMS Invincible (R05), Invincible-class", cost:2120, oil:46, time:44, hp:1760, armor:"heavy", speed:1.5, turn:0.6, sight:10.4, r:30, mass:0, weapons:["w_e80_nato_carrier"], prereq:["navalyard","lab","airbase"], tech:3, from:"e80", to:"e80", service:"1980", confidence:"high", carrier:2, sonar:3.2, radar:13.6, ciws:0.5, rcs:2.2, desc:"Twenty thousand tonnes and called a through-deck cruiser for years so the Treasury would pay for it. Three ships - Invincible 1980, Illustrious 1982, Ark Royal 1985 - a ski-jump instead of a catapult, and five Sea Harriers and nine Sea Kings rather than an air group. The sale of Invincible to Australia was agreed in February 1982 and withdrawn that July. Airborne early warning was not absent for long: the Sea King AEW.2 was improvised in eleven weeks in 1982 and embarked from that August." },
  gbr_e80_aswhelo: { fac:"gbr", role:"aswhelo", cat:"aircraft", layer:"air", name:"Sea King HAS.5", full:"Westland Sea King HAS.5", cost:1020, oil:20, time:14, hp:305, armor:"air", speed:2.9, turn:2.1, sight:6.8, r:12, mass:0, weapons:["asw_mk54"], prereq:["airbase"], tech:2, from:"e80", to:"e80", service:"1980", confidence:"high", ammo:3, radius:20, sonar:7.2, rcs:0.95, radarQ:5, gen:3, desc:"The heavy end of British ASW: a boat hull, four hours on task, dipping sonar and sonobuoys, and the Sea Searcher radar. The light end is the Lynx, and the dates matter - HAS.2 is 1976, HAS.3 is 1982, Sea Skua is 1982 and Sting Ray 1983, so the 1976 aircraft carried none of them. A civil-registered Lynx, G-LYNX, set the absolute helicopter speed record at 400.87 km/h on 11 August 1986 and still holds it." },

  gbr_e90_patrol: { fac:"gbr", role:"patrol", cat:"naval", layer:"sea", name:"Castle-class OPV", full:"HMS Leeds Castle (P258), Castle-class offshore patrol vessel", cost:440, oil:5, time:8, hp:470, armor:"light", speed:2.2, turn:1.8, sight:7.4, r:13, mass:0, weapons:["hmg"], prereq:["navalyard"], tech:1, from:"e90", to:"e90", service:"1981", confidence:"high", turret:true, tturn:2.4, sonar:0.8, rcs:0.75, desc:"Two ships, larger than an Island and with a flight deck aft that could take a Sea King - which is why both went south in 1982 and spent the war running stores and minesweeping equipment. Fishery protection for twenty years afterwards. Britain's small combatant remains a police boat with a helipad." },
  gbr_e90_corvette: { fac:"gbr", role:"corvette", cat:"naval", layer:"sea", name:"Type 23 Duke", full:"HMS Norfolk (F230), Type 23 Duke-class frigate", cost:1060, oil:14, time:15, hp:1040, armor:"light", speed:2.86, turn:1.7, sight:8.9, r:17, mass:0, weapons:["w_e90_nato_corvette"], prereq:["navalyard"], tech:1, from:"e90", to:"e90", service:"1990", confidence:"high", turret:true, tturn:2.0, sonar:8.4, radar:16.4, ciws:0.46, rcs:0.45, desc:"Designed as a cheap towed-array hull to sit in the Greenland-Iceland-UK gap and listen for Soviet boats, and it turned out to be the best general-purpose frigate the Royal Navy has ever had. Diesel-electric drive for silent running, a 4.5in Mk 8, Sea Wolf, Harpoon and a Lynx. Sixteen were built; the Cold War ended before the first was in service and the design outlived the threat it was drawn for by thirty-five years." },
  gbr_e90_destroyer: { fac:"gbr", role:"destroyer", cat:"naval", layer:"sea", name:"Type 42 Batch 3", full:"HMS Manchester (D95), Type 42 Batch 3 destroyer", cost:1930, oil:29, time:26, hp:1840, armor:"heavy", speed:2.36, turn:1.2, sight:9.8, r:20, mass:0, weapons:["navgun_76","sam_seadart"], prereq:["navalyard","radar"], tech:2, from:"e90", to:"e90", service:"1982", confidence:"high", turret:true, tturn:1.4, sonar:7.0, radar:17.4, ciws:0.56, rcs:1.12, desc:"Four ships stretched by about sixteen metres over a Batch 1 to fix the seakeeping and the freeboard, and given the Phalanx the earlier hulls went to war without. Sea Dart stayed in service until HMS Edinburgh paid off in June 2013 - thirty-eight years of a missile designed in the 1960s, because the Type 45 that was meant to replace it was two decades late." },
  gbr_e90_sub: { fac:"gbr", role:"sub", cat:"naval", layer:"sub", name:"Trafalgar SSN", full:"HMS Trafalgar (S107), Trafalgar-class", cost:2100, oil:34, time:28, hp:1100, armor:"light", speed:2.45, turn:1.1, sight:7.8, r:17, mass:0, weapons:["w_e90_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e90", to:"e90", service:"1983", confidence:"high", sonar:9.8, quiet:0.32, radarQ:5, nuclear:true, layNet:4, desc:"Seven boats, anechoic tiles, a pump-jet propulsor instead of a screw, and the acoustic generation that let a British boat trail a Soviet one. Britain's first Tomahawk was fired over Kosovo in March 1999 by HMS Splendid, which was a Swiftsure rather than a Trafalgar. Four Upholder-class diesel boats commissioned between 1990 and 1994 and were sold to Canada almost immediately - the last conventional submarines the Royal Navy has owned." },
  gbr_e90_carrier: { fac:"gbr", role:"carrier", cat:"naval", layer:"sea", name:"Invincible (FA2)", full:"HMS Illustrious (R06) with Sea Harrier FA2", cost:2380, oil:52, time:46, hp:1900, armor:"heavy", speed:1.52, turn:0.6, sight:11.2, r:30, mass:0, weapons:["w_e90_nato_carrier"], prereq:["navalyard","lab","airbase"], tech:3, from:"e90", to:"e90", service:"1993", confidence:"high", carrier:2, sonar:3.4, radar:14.6, ciws:0.54, rcs:2.2, desc:"The same three small hulls with a far better aeroplane on them: Blue Vixen radar and AMRAAM turned the Sea Harrier from a gun-and-Sidewinder day fighter into the best beyond-visual-range interceptor in Europe for a few years. Airborne early warning is the Sea King AEW.7, later ASaC7, which flew until 2018. The ski-jump remains, so the deck can never launch a fixed-wing early-warning aircraft." },

  gbr_e00_cfighter: { fac:"gbr", role:"cfighter", cat:"aircraft", layer:"air", name:"Harrier GR9", full:"BAE Systems Harrier GR.9, Joint Force Harrier", cost:1420, oil:27, time:19, hp:410, armor:"air", speed:5.5, turn:2.2, sight:8.0, r:16, mass:0, weapons:["w_e00_gbr_cfighter","w_e00_gbr_cas"], prereq:["airbase"], tech:2, from:"e00", to:"e00", service:"2006", confidence:"high", jet:true, ammo:4, gen:3.5, radar:0, radarQ:2, radius:20, rcs:0.85, carrierCapable:true, refuelable:true, desc:"This band was empty, and an empty cfighter band is not cosmetic: G.deckAircraftFor asks unitFor(fac,\"cfighter\") and then unitFor(fac,\"cstealth\"), and with both returning null a British carrier put to sea in the 2000s as a helicopter ship. What actually flew off her was this. The Sea Harrier FA2 went on 28 March 2006 and Joint Force Harrier put the RAF's GR7 and GR9 on the deck in its place - a bomber with Sidewinders and NO air-intercept radar at all, so the fleet had strike and no organic air defence of its own. The to: tag stops at e00 on purpose: the 2010 SDSR retired the whole Harrier force that November, and from 2010 to 2018 Britain had no carrier fixed-wing aircraft of any kind." },

  /* ---- carrier airborne early warning, 1952 to the present ----
     The owner's E-2 question in British form. Four airframes carrying two
     radar families: AN/APS-20 moved bodily from the Skyraider into the
     Gannet, then Searchwater off a Nimrod into a bag on a Sea King, then
     Searchwater 2000, then the same aerial again on a Merlin. Every row
     carries a real `from`, and that is a mechanical input rather than a
     label: genContest() reads it, so the 1952 APS-20 below takes 1.7^3 =
     4.91x from a 1980s jammer and the Crowsnest fit takes 1.00x. That is
     the correct answer and it is the whole argument for dating a row
     honestly instead of stamping it. Both real gaps are visible in the
     `to` tags: Ark Royal paid off in December 1978 and the Sea King did
     not fly until August 1982, and the ASaC.7 went in September 2018
     three years before Crowsnest reached initial operating capability. */
  gbr_e50_cawacs: { fac:"gbr", role:"cawacs", cat:"aircraft", layer:"air", name:"Skyraider AEW.1", full:"Douglas Skyraider AEW.1, 849 NAS", cost:880, oil:18, time:15, hp:260, armor:"air", speed:2.4, turn:1.1, sight:8.2, r:16, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e50", to:"e50", service:"1952", confidence:"medium", jet:false, ammo:0, radar:9, radarQ:4, radius:26, rcs:3.0, awacs:true, carrierCapable:true, desc:"Fifty ex-US Navy AD-4W handed over under the Mutual Defense Assistance Programme and flown by 849 Naval Air Squadron from July 1952: one piston engine, three men, and an AN/APS-20 in a bathtub radome under the belly. Britain had carrier-borne early warning eight years before it had a land-based aircraft that could do the job at all - the reverse of the usual order, and a straight consequence of owning catapult decks." },

  gbr_e60_cawacs: { fac:"gbr", role:"cawacs", cat:"aircraft", layer:"air", name:"Gannet AEW.3", full:"Fairey Gannet AEW.3, 849 NAS", cost:1080, oil:21, time:17, hp:280, armor:"air", speed:2.6, turn:1.1, sight:9.0, r:16, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e60", to:"e60", service:"1960", confidence:"medium", jet:false, ammo:0, radar:12, radarQ:5, radius:30, rcs:3.2, awacs:true, carrierCapable:true, desc:"New airframe, same radar: the APS-20 sets were lifted out of the retiring Skyraiders and hung under a Gannet. That is what an era chain is for - the aeroplane changed and the antenna did not - and it is the E-2A-to-E-2D argument in British form. Flew until HMS Ark Royal paid off on 4 December 1978, and when she went the Fleet Air Arm lost airborne early warning altogether. Three and a half years later the bill for that arrived off the Falklands." },

  gbr_e80_cawacs: { fac:"gbr", role:"cawacs", cat:"aircraft", layer:"air", name:"Sea King AEW.2", full:"Westland Sea King AEW.2, 849 NAS", cost:1240, oil:24, time:16, hp:300, armor:"air", speed:2.9, turn:2.1, sight:9.6, r:13, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e80", to:"e80", service:"1982", confidence:"high", jet:false, ammo:0, radar:16, radarQ:9, radius:20, rcs:2.2, awacs:true, hover:true, carrierCapable:true, desc:"Ordered in the middle of the Falklands campaign and flying eleven weeks later: a Searchwater radar taken off a Nimrod and hung on the side of a Sea King in an inflatable bag that swivels up out of the rotor wash to fly and down to look. An ugly answer to a lesson learned at the cost of ships, and the reason a ski-jump deck is not blind. A helicopter at ten thousand feet sees far less than an E-2C at twenty-five, and the radar figure here says so rather than pretending otherwise." },

  gbr_e90_cawacs: { fac:"gbr", role:"cawacs", cat:"aircraft", layer:"air", name:"Sea King AEW.2A", full:"Westland Sea King AEW.2A, 849 NAS", cost:1340, oil:26, time:16, hp:310, armor:"air", speed:2.9, turn:2.1, sight:10.2, r:13, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e90", to:"e90", service:"1985", confidence:"medium", jet:false, ammo:0, radar:18, radarQ:11, radius:20, rcs:2.2, awacs:true, hover:true, carrierCapable:true, desc:"The production conversions that followed the two Falklands lash-ups, with the processing the crash programme had no time to fit. Same airframe, same bag, better picture. This is the middle link of a chain and the easiest one to leave out - which is exactly why leaving it out is what makes a roster look like it has one machine per role for forty years." },

  gbr_e00_cawacs: { fac:"gbr", role:"cawacs", cat:"aircraft", layer:"air", name:"Sea King ASaC.7", full:"Westland Sea King ASaC.7, 849 NAS", cost:1520, oil:28, time:17, hp:330, armor:"air", speed:3.0, turn:2.1, sight:11.4, r:13, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e00", to:"e00", service:"2002", confidence:"high", jet:false, ammo:0, radar:21, radarQ:15, radius:22, rcs:2.2, awacs:true, hover:true, carrierCapable:true, desc:"Airborne Surveillance and Area Control - a change of job as much as of radar. Searchwater 2000 tracks vehicles and small boats over land as well as aircraft over water, and the crew control the fight instead of merely reporting it, which is why they flew over Iraq and Afghanistan from an airfield rather than a deck. Retired on 26 September 2018, three years before Crowsnest could take over." },
  gbr_e90_cfighter: { fac:"gbr", role:"cfighter", cat:"aircraft", layer:"air", name:"Sea Harrier FA2", full:"BAe Sea Harrier FA2", cost:1380, oil:26, time:19, hp:395, armor:"air", speed:5.5, turn:2.3, sight:8.6, r:16, mass:0, weapons:["w_e90_nato_fighter","w_e90_gbr_cstrike"], prereq:["airbase"], tech:2, from:"e90", to:"e90", service:"1993", confidence:"high", jet:true, ammo:4, gen:3.5, radar:7, radarQ:11, radius:22, rcs:0.8, carrierCapable:true, refuelable:true, desc:"Blue Vixen was a small pulse-Doppler radar of genuinely first rank, and with AMRAAM this subsonic aircraft could kill a supersonic one before it was seen. Retired in 2006 on cost grounds with no replacement, which left the Royal Navy with no fixed-wing fighter of its own for twelve years." },
  gbr_e90_aswhelo: { fac:"gbr", role:"aswhelo", cat:"aircraft", layer:"air", name:"Lynx HMA.8", full:"Westland Lynx HMA.8", cost:1150, oil:22, time:14, hp:320, armor:"air", speed:3.6, turn:2.5, sight:7.4, r:12, mass:0, weapons:["asw_stingray"], prereq:["airbase"], tech:2, from:"e90", to:"e90", service:"1994", confidence:"high", ammo:3, radius:18, sonar:6.0, rcs:0.8, radarQ:7, gen:3.5, desc:"The frigate helicopter: a 360-degree Sea Owl thermal imager in the nose, Sea Skua for small craft and Sting Ray for submarines, and the agility that came from a rigid titanium rotor head. It hunts with the ship's towed array rather than a dipping sonar of its own, which is the trade a small deck forces." },

  gbr_e00_patrol: { fac:"gbr", role:"patrol", cat:"naval", layer:"sea", name:"River Batch 1 OPV", full:"HMS Tyne (P281), River-class Batch 1", cost:490, oil:6, time:9, hp:530, armor:"light", speed:2.4, turn:1.9, sight:8.0, r:13, mass:0, weapons:["hmg"], prereq:["navalyard"], tech:1, from:"e00", to:"e00", service:"2003", confidence:"high", turret:true, tturn:2.4, sonar:0.9, rcs:0.78, desc:"Leased rather than bought, at first, because the fishery protection squadron could not be afforded outright. A 20 mm gun and a very long endurance. The Royal Navy of the 2000s has no small combatant that can fight anything: the cheapest hull that can is a frigate costing twenty times as much, which is the shape of the whole fleet in one line." },
  gbr_e00_corvette: { fac:"gbr", role:"corvette", cat:"naval", layer:"sea", name:"Type 23 (Sonar 2087)", full:"Type 23 frigate with Sonar 2087 low-frequency active towed array", cost:1180, oil:15, time:16, hp:1090, armor:"light", speed:2.87, turn:1.7, sight:9.4, r:17, mass:0, weapons:["w_e00_nato_corvette"], prereq:["navalyard"], tech:1, from:"e00", to:"e00", service:"2006", confidence:"high", turret:true, tturn:2.0, sonar:10.6, radar:17.2, ciws:0.46, rcs:0.45, desc:"Eight of the sixteen hulls were fitted with Sonar 2087, a low-frequency active and passive towed array that can find a modern diesel boat below the layer at ranges a hull-mounted set cannot approach - the single best anti-submarine sensor in this game. This is the British specialisation stated plainly: a small navy that cannot be everywhere decided to be unmatched at one thing." },
  gbr_e00_destroyer: { fac:"gbr", role:"destroyer", cat:"naval", layer:"sea", name:"Type 45 Daring", full:"HMS Daring (D32), Type 45 destroyer", cost:2150, oil:33, time:27, hp:1960, armor:"heavy", speed:2.42, turn:1.2, sight:11.2, r:20, mass:0, weapons:["navgun_76","sam_aster30","sam_aster15"], prereq:["navalyard","radar"], tech:2, from:"e00", to:"e00", service:"2009", confidence:"high", turret:true, tturn:1.4, sonar:6.2, radar:19.6, ciws:0.56, rcs:0.3, desc:"Twelve were planned, eight ordered, six built. SAMPSON at the masthead and Aster beneath it give an air-defence capability at the top of the world; the WR-21 propulsion plant tripped repeatedly in warm water and every ship went through a power-improvement refit. It went to sea with no anti-ship missile of any kind and had none for fourteen years - the Harpoon fit was a Type 22 and Type 23 thing, never a Type 45 one." },
  gbr_e00_sub: { fac:"gbr", role:"sub", cat:"naval", layer:"sub", name:"Astute SSN", full:"HMS Astute (S119), Astute-class", cost:2320, oil:39, time:29, hp:1190, armor:"light", speed:2.4, turn:1.1, sight:8.2, r:17, mass:0, weapons:["w_e00_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e00", to:"e00", service:"2010", confidence:"high", sonar:11.0, quiet:0.26, radarQ:6, nuclear:true, layNet:5, desc:"The first boat was five years late and a billion pounds over, because Britain let the skills to design a submarine lapse between Trafalgar and Astute and had to buy American help to get them back. What came out is superb: a core good for the life of the boat, Spearfish, Tomahawk, and the Sonar 2076 array. Seven boats." },
  gbr_e00_carrier: { fac:"gbr", role:"carrier", cat:"naval", layer:"sea", name:"Queen Elizabeth CV", full:"HMS Queen Elizabeth (R08)", cost:3900, oil:84, time:52, hp:3120, armor:"heavy", speed:1.58, turn:0.6, sight:12.8, r:30, mass:0, weapons:["w_e00_nato_carrier"], prereq:["navalyard","lab","airbase"], tech:3, from:"e00", to:"e00", service:"2017", confidence:"high", carrier:3, sonar:3.8, radar:16.2, ciws:0.5, rcs:2.45, desc:"Sixty-five thousand tonnes and three times the displacement of an Invincible, with two islands, integrated electric propulsion and no catapult. The decision to build for F-35B rather than fit catapults was reversed and then reversed back in 2012 at considerable cost. Op Fortis in 2021 took the ship to the Pacific with a mixed British and American F-35B air group and proved the concept; the escorts to screen it are the thing Britain still does not have enough of." },
  gbr_e00_cstealth: { fac:"gbr", role:"cstealth", cat:"aircraft", layer:"air", name:"F-35B Lightning", full:"Lockheed Martin F-35B Lightning II", cost:1720, oil:33, time:22, hp:430, armor:"air", speed:7.8, turn:2.1, sight:10.8, r:16, mass:0, weapons:["w_e00_nato_stealthfighter"], prereq:["airbase"], tech:3, from:"e00", to:"e00", service:"2018", confidence:"high", jet:true, ammo:4, gen:5, radar:8, radarQ:16, radius:32, rcs:0.16, carrierCapable:true, refuelable:true, desc:"Britain is a Tier 1 partner in the programme and builds around fifteen per cent of every airframe, including the rear fuselage. The B model exists at all because Britain and the United States Marine Corps both needed to fly a fifth-generation fighter off a deck with no catapult - the lift fan is the direct descendant of the Harrier, and it is the only stealth aircraft in the world that can do it." ,"name":"(none)","full":"No British carrier stealth fighter in this period","desc":"The Sea Harrier FA2 left service in 2006 and the Queen Elizabeth class did not commission until 2017, so there is a genuine decade with no British carrier fast jet at all."},
  gbr_e00_aswhelo: { fac:"gbr", role:"aswhelo", cat:"aircraft", layer:"air", name:"Merlin HM1", full:"EH101 Merlin HM1", cost:1400, oil:26, time:16, hp:400, armor:"air", speed:3.1, turn:2.2, sight:8.4, r:13, mass:0, weapons:["w_e00_nato_aswhelo"], prereq:["airbase"], tech:2, from:"e00", to:"e00", service:"2000", confidence:"high", ammo:4, radius:24, sonar:9.8, rcs:0.9, radarQ:9, gen:4, desc:"Three engines and fourteen tonnes: the largest and most capable shipborne anti-submarine helicopter in the West, designed alongside the Type 23 as one system and sharing its acoustic processing. An Anglo-Italian programme, built at Yeovil. Paired with Sonar 2087 it is why a British group finds boats that other navies do not." },


/* ============ MARINE NATIONALE - era units, e50 to e00 ============
   Same weapon rule as the Royal Navy block above: era hulls point at the
   same-era American weapon id because those rows are literal and a French one
   would not exist. The ordnance that IS the identity - Exocet, the F21, Aster,
   the M51 - is authored in rules.js outside the normaliser's pattern.

   Deliberately empty: `missileboat` in every era, because France built La
   Combattante by the dozen for export and never bought one for itself;
   `cruiser` from e90, because Colbert decommissioned on 24 May 1991 and was
   the last cruiser any European navy in this game will operate; `ssgn`,
   because MdCN is fired from a Suffren's torpedo tubes, not from a dedicated
   missile boat. What France has that nobody else here does: a nuclear
   carrier, and a fixed-wing early-warning aircraft to fly off it. */
  fra_e50_patrol: { fac:"fra", role:"patrol", cat:"naval", layer:"sea", name:"Le Fougueux P640", full:"Le Fougueux-class patrouilleur (submarine chaser)", cost:245, oil:3, time:6, hp:280, armor:"light", speed:2.2, turn:2.1, sight:5.4, r:13, mass:0, weapons:["hmg"], prereq:["navalyard"], tech:1, from:"e50", to:"e50", service:"1954", confidence:"high", turret:true, tturn:2.4, sonar:2.2, rcs:0.55, desc:"Fourteen small submarine chasers paid for by the United States under offshore procurement and built in French yards - the arrangement that rebuilt the French shipbuilding industry after the war and is the reason so much of the 1950s fleet is American-funded rather than American-built. A 40 mm forward, depth charges aft, and a hull small enough that it could be turned out quickly." },
  fra_e50_corvette: { fac:"fra", role:"corvette", cat:"naval", layer:"sea", name:"Le Corse E50", full:"Le Corse (F761), E50 Le Corse-class escorteur rapide", cost:545, oil:7, time:13, hp:580, armor:"light", speed:2.6, turn:1.7, sight:5.8, r:17, mass:0, weapons:["w_e50_nato_corvette"], prereq:["navalyard"], tech:1, from:"e50", to:"e50", service:"1955", confidence:"high", turret:true, tturn:2.0, sonar:3.8, radar:8.2, ciws:0.3, rcs:0.82, desc:"Four fast escorts of French design, with a raked bow and 57 mm mountings, followed by the fourteen Le Normand class. France is rebuilding a navy from almost nothing here - the fleet of 1945 had been sunk at Toulon, seized, or worn out - and the E50 programme is the first postwar class drawn and built entirely in France." },
  fra_e50_destroyer: { fac:"fra", role:"destroyer", cat:"naval", layer:"sea", name:"T 47 Surcouf", full:"Surcouf (D621), T 47-class escorteur d'escadre", cost:1000, oil:16, time:22, hp:1050, armor:"heavy", speed:2.15, turn:1.2, sight:6.4, r:20, mass:0, weapons:["w_e50_nato_destroyer","aagun_dp127"], prereq:["navalyard","radar"], tech:2, from:"e50", to:"e50", service:"1955", confidence:"high", turret:true, tturn:1.4, sonar:5.0, radar:11.0, ciws:0.46, rcs:1.02, desc:"Twelve ships, French-designed, with six 127 mm in three twin turrets and a very high freeboard for the Mediterranean. Four were later rebuilt as Tartar missile ships with an American launcher, which is the honest shape of the period: France designs and builds its own hulls, and buys the missile it cannot yet make. That changes in the next decade and never changes back." },
  fra_e50_cruiser: { fac:"fra", role:"cruiser", cat:"naval", layer:"sea", name:"De Grasse CL", full:"De Grasse (C610), light cruiser", cost:1540, oil:27, time:33, hp:1470, armor:"heavy", speed:1.74, turn:0.9, sight:7.0, r:23, mass:0, weapons:["navgun_fr127","aagun_fr57"], prereq:["navalyard","lab"], tech:3, from:"e50", to:"e50", service:"1956", confidence:"high", turret:true, tturn:1.0, sonar:4.0, radar:11.4, ciws:0.42, rcs:1.55, desc:"Laid down in 1938, captured incomplete, and finished in 1956 to an entirely different design as an anti-aircraft cruiser with sixteen 127 mm - eighteen years on the slip. She ended her career as the command ship for the Pacific nuclear test centre, which is a very French second act for a warship." },
  fra_e50_sub: { fac:"fra", role:"sub", cat:"naval", layer:"sub", name:"Narval SSK", full:"Narval (S631), Narval-class", cost:1090, oil:18, time:24, hp:630, armor:"light", speed:2.0, turn:1.1, sight:4.9, r:17, mass:0, weapons:["w_e50_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e50", to:"e50", service:"1957", confidence:"high", sonar:5.0, quiet:0.46, radarQ:2, desc:"Six boats, the first French submarines designed after the war, drawing openly on the German Type XXI. France's first nuclear-powered submarine is fourteen years away - Le Redoutable in 1971, and she is a ballistic missile boat; the first French nuclear ATTACK submarine, Rubis, is 1983, which is twenty-six years after this hull and later than any other nuclear power managed." },
  fra_e50_carrier: { fac:"fra", role:"carrier", cat:"naval", layer:"sea", name:"Arromanches CVL", full:"Arromanches (R95), ex-HMS Colossus", cost:1520, oil:34, time:40, hp:1330, armor:"heavy", speed:1.42, turn:0.6, sight:7.4, r:30, mass:0, weapons:["w_e50_nato_carrier"], prereq:["navalyard","lab","airbase"], tech:3, from:"e50", to:"e50", service:"1951", confidence:"high", carrier:2, sonar:2.0, radar:9.0, ciws:0.36, rcs:2, desc:"A British light fleet carrier bought outright in 1951, and not the only French deck of the decade: La Fayette (ex-USS Langley) was on loan from 1951 to 1963 and Bois Belleau (ex-USS Belleau Wood) from 1953 to 1960, both American Independence-class hulls, and all three flew combat missions over Indochina. France operates three carriers in the 1950s and did not build any of them." },
  fra_e50_cfighter: { fac:"fra", role:"cfighter", cat:"aircraft", layer:"air", name:"Aquilon", full:"SNCASE SE.203 Aquilon (licence Sea Venom)", cost:690, oil:16, time:14, hp:295, armor:"air", speed:4.4, turn:2.2, sight:5.4, r:16, mass:0, weapons:["w_e50_nato_fighter","w_e50_fra_cstrike"], prereq:["airbase"], tech:2, from:"e50", to:"e50", service:"1955", confidence:"high", jet:true, ammo:4, gen:1.5, radar:3, radarQ:3, radius:15, rcs:1.0, carrierCapable:true, desc:"A licence-built de Havilland Sea Venom with a French radar and an ejection seat the British version did not have, flying alongside American F4U-7 Corsairs bought for the same decks. France has flown fixed-wing aircraft off carriers continuously ever since and is the only country besides the United States still doing catapult-and-arrestor-wire operations today." },

  fra_e60_patrol: { fac:"fra", role:"patrol", cat:"naval", layer:"sea", name:"La Combattante", full:"La Combattante (P730), fast patrol boat", cost:295, oil:4, time:7, hp:290, armor:"light", speed:3.0, turn:2.3, sight:5.8, r:13, mass:0, weapons:["hmg","torpedo"], prereq:["navalyard"], tech:1, from:"e60", to:"e60", service:"1964", confidence:"high", turret:true, tturn:2.4, sonar:0, rcs:0.48, desc:"One boat, and the name matters more than the ship: the La Combattante II and III designs that grew out of it were sold to Greece, Germany, Iran, Libya, Malaysia, Nigeria and Qatar by the dozen, and the German Type 148 Tiger is one of them. France armed half the world's missile boat fleets with Exocet and never commissioned a missile boat of its own." },
  fra_e60_corvette: { fac:"fra", role:"corvette", cat:"naval", layer:"sea", name:"Cdt Riviere", full:"Commandant Riviere (F733), aviso-escorteur", cost:690, oil:9, time:13, hp:730, armor:"light", speed:2.5, turn:1.7, sight:6.6, r:17, mass:0, weapons:["w_e60_nato_corvette"], prereq:["navalyard"], tech:1, from:"e60", to:"e60", service:"1962", confidence:"high", turret:true, tturn:2.0, sonar:4.6, radar:9.4, ciws:0.32, rcs:0.88, desc:"Nine ships built for colonial and overseas work as much as for the Atlantic - three 100 mm, a 305 mm ASW mortar, and space for eighty troops and two landing craft. A frigate designed for a navy that expected to police a great deal of ocean a long way from home, which is still what the Marine Nationale is for." },
  fra_e60_destroyer: { fac:"fra", role:"destroyer", cat:"naval", layer:"sea", name:"Suffren DDG", full:"Suffren (D602), Suffren-class fregate lance-missiles", cost:1270, oil:20, time:23, hp:1310, armor:"heavy", speed:2.2, turn:1.2, sight:7.8, r:20, mass:0, weapons:["w_e60_nato_destroyer","sam_masurca"], prereq:["navalyard","radar"], tech:2, from:"e60", to:"e60", service:"1967", confidence:"high", turret:true, tturn:1.4, sonar:6.6, radar:13.8, ciws:0.5, rcs:1.22, desc:"Two ships built around Masurca, a French area air-defence missile, under an enormous glass-fibre radome that made them unmistakable. The first French warships designed from the keel up around a SAM of French design rather than an American one bought in. Suffren paid off in 2001 and Duquesne in 2007-08, after forty years." },
  fra_e60_cruiser: { fac:"fra", role:"cruiser", cat:"naval", layer:"sea", name:"Colbert CL", full:"Colbert (C611), anti-aircraft cruiser", cost:1930, oil:34, time:35, hp:1810, armor:"heavy", speed:1.8, turn:0.9, sight:8.2, r:23, mass:0, weapons:["navgun_fr127","aagun_fr57"], prereq:["navalyard","lab"], tech:3, from:"e60", to:"e60", service:"1959", confidence:"high", turret:true, tturn:1.0, sonar:4.8, radar:13.2, ciws:0.48, rcs:1.55, desc:"Eleven thousand tonnes and sixteen 127 mm guns as built, converted between 1970 and 1972 into a missile cruiser with Masurca aft. The last cruiser France would ever build, and the flagship of the fleet for most of her life - a role that in this game's terms means one hull carrying the whole heavy gun battery of a navy." },
  fra_e60_sub: { fac:"fra", role:"sub", cat:"naval", layer:"sub", name:"Daphne SSK", full:"Daphne (S641), Daphne-class", cost:1350, oil:22, time:25, hp:770, armor:"light", speed:2.1, turn:1.1, sight:5.4, r:17, mass:0, weapons:["w_e60_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e60", to:"e60", service:"1964", confidence:"high", sonar:5.6, quiet:0.40, radarQ:2, desc:"Eleven boats for France and many more for export - small, cheap, heavily armed with twelve tubes and no reloads, and built for the Mediterranean. Two were lost with all hands, both French: Minerve on 27 January 1968 and Eurydice on 4 March 1970, in the same stretch of sea off Toulon. Minerve was not found until 2019." },
  fra_e60_ssbn: { fac:"fra", role:"ssbn", cat:"naval", layer:"sub", name:"Le Redoutable SSBN", full:"Le Redoutable (S611), Redoutable-class", cost:3500, oil:80, time:49, hp:1540, armor:"heavy", speed:1.9, turn:0.5, sight:5.0, r:26, mass:0, weapons:["slbm_m20"], prereq:["navalyard","lab","radar"], tech:3, from:"e60", to:"e80", service:"1971", confidence:"high", sonar:6.6, quiet:0.42, radarQ:3, nuclear:true, ssbn:true, desc:"Commissioned 1 December 1971 with sixteen M1 tubes, later M20 - the first French nuclear-powered vessel of any kind, and the whole chain was French: the reactor, the missile, the warhead and the boat. Six were built to 1985. France left NATO's integrated military command in 1966 and built this so that the deterrent would answer to Paris and to nobody else, which remains the single most important fact about the French armed forces." },
  fra_e60_carrier: { fac:"fra", role:"carrier", cat:"naval", layer:"sea", name:"Clemenceau CV", full:"Clemenceau (R98), Clemenceau-class", cost:2260, oil:50, time:46, hp:1980, armor:"heavy", speed:1.44, turn:0.6, sight:9.2, r:30, mass:0, weapons:["w_e60_nato_carrier"], prereq:["navalyard","lab","airbase"], tech:3, from:"e60", to:"e60", service:"1961", confidence:"high", carrier:3, sonar:2.6, radar:11.2, ciws:0.44, rcs:2.35, desc:"Clemenceau in 1961 and Foch in 1963, thirty-two thousand tonnes, steam catapults and an angled deck - the entire French-BUILT carrier force until 2001, and the ships that made France the only European navy operating conventional catapult carriers. The air group is Etendard IV, F-8E(FN) Crusader and the Alize turboprop for anti-submarine work." },
  fra_e60_cfighter: { fac:"fra", role:"cfighter", cat:"aircraft", layer:"air", name:"F-8E(FN) Crusader", full:"Vought F-8E(FN) Crusader", cost:960, oil:22, time:17, hp:345, armor:"air", speed:6.8, turn:2.1, sight:6.6, r:16, mass:0, weapons:["w_e60_nato_fighter"], prereq:["airbase"], tech:2, from:"e60", to:"e60", service:"1964", confidence:"high", jet:true, ammo:4, gen:3, radar:5, radarQ:6, radius:24, rcs:1.4, carrierCapable:true, refuelable:true, desc:"Forty-two aircraft bought in 1964 with a modified wing so that a Crusader could be flown off a deck a hundred and fifty feet shorter than the American one it was designed for. They served until 1999 - thirty-five years, long after the type had left every other air arm in the world. The strike aircraft beside it, the Etendard IV of 1962, is entirely French." },

  fra_e80_patrol: { fac:"fra", role:"patrol", cat:"naval", layer:"sea", name:"P400", full:"L'Audacieuse (P682), P400-class patrouilleur", cost:375, oil:5, time:8, hp:390, armor:"light", speed:2.7, turn:2.0, sight:6.8, r:13, mass:0, weapons:["hmg"], prereq:["navalyard"], tech:1, from:"e80", to:"e80", service:"1986", confidence:"high", turret:true, tturn:2.4, sonar:0.6, rcs:0.56, desc:"Ten boats of four hundred tonnes with a 40 mm forward, built for the overseas departments - the Antilles, Reunion, New Caledonia, French Guiana. France has the second largest exclusive economic zone in the world and almost none of it is in Europe, so the cheap hull in this navy is a colonial patrol vessel rather than a Baltic missile boat." },
  fra_e80_corvette: { fac:"fra", role:"corvette", cat:"naval", layer:"sea", name:"A69 aviso", full:"D'Estienne d'Orves (F781), Type A69 aviso", cost:860, oil:11, time:13, hp:880, armor:"light", speed:2.55, turn:1.7, sight:7.6, r:17, mass:0, weapons:["w_e80_nato_corvette"], prereq:["navalyard"], tech:1, from:"e80", to:"e80", service:"1976", confidence:"high", turret:true, tturn:2.0, sonar:5.4, radar:12.4, ciws:0.4, rcs:0.75, desc:"Seventeen ships of twelve hundred tonnes, a 100 mm forward, four MM38 Exocet and a hull-mounted sonar - a coastal escort built to a price and produced in numbers, which is unusual for this navy. Cheap enough to sell: Argentina bought three, and two of them were at sea during the Falklands. Two Lynx-equipped hulls it never had; the aviso is too small for a hangar and the helicopter comes from the larger escorts." },
  fra_e80_destroyer: { fac:"fra", role:"destroyer", cat:"naval", layer:"sea", name:"Tourville F67", full:"Tourville (D610), F67 Tourville-class", cost:1620, oil:25, time:25, hp:1630, armor:"heavy", speed:2.3, turn:1.2, sight:8.8, r:20, mass:0, weapons:["w_e80_nato_destroyer","sam_crotale_n"], prereq:["navalyard","radar"], tech:2, from:"e80", to:"e80", service:"1974", confidence:"high", turret:true, tturn:1.4, sonar:7.8, radar:15.4, ciws:0.5, rcs:1.18, desc:"Three large anti-submarine escorts with two Lynx in a hangar aft, a towed array and Malafon - the real heavy ASW hulls of the French fleet in this decade, together with the one-off Aconit of 1973. The Georges Leygues class that follows them from 1979 is the ship most people think of, and these are what came first." },
  fra_e80_cruiser: { fac:"fra", role:"cruiser", cat:"naval", layer:"sea", name:"Colbert (Exocet)", full:"Colbert (C611) after the Exocet fit", cost:2450, oil:43, time:37, hp:2260, armor:"heavy", speed:1.88, turn:0.9, sight:9.8, r:23, mass:0, weapons:["navgun_100_fr","sam_masurca","ssm_exocet38"], prereq:["navalyard","lab"], tech:3, from:"e80", to:"e80", service:"1980", confidence:"high", turret:true, tturn:1.0, sonar:5.4, radar:17.2, ciws:0.56, rcs:1.55, desc:"Masurca aft from the 1970-72 conversion and four MM38 Exocet added around 1980 - the last cruiser any European navy in this game will operate. She decommissioned on 24 May 1991, was a museum ship at Bordeaux from 1993 to 2007, and was finally scrapped in 2016-17. Britain gave up the type in 1979 and Germany never had one; the United States commissioned twenty-seven Ticonderogas between 1983 and 1994 and still has some in commission." },
  fra_e80_sub: { fac:"fra", role:"sub", cat:"naval", layer:"sub", name:"Agosta SSK", full:"Agosta (S620), Agosta-class", cost:1730, oil:28, time:27, hp:950, armor:"light", speed:2.2, turn:1.1, sight:6.4, r:17, mass:0, weapons:["w_e80_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e80", to:"e80", service:"1977", confidence:"high", sonar:6.4, quiet:0.34, radarQ:3, desc:"Four boats, and the most capable conventional submarines France ever built - very quiet, with a rapid-reload tube system that let them fire and fire again. They served until 2001, overlapping the Rubis class by eighteen years, which is the point worth making: no Western navy in this period was operating nothing but nuclear boats, and France, Britain and the United States all still had diesel submarines in the water." },
  fra_e80_carrier: { fac:"fra", role:"carrier", cat:"naval", layer:"sea", name:"Clemenceau (ASMP)", full:"Foch (R99) with Super Etendard and ASMP", cost:2800, oil:61, time:48, hp:2320, armor:"heavy", speed:1.48, turn:0.6, sight:10.6, r:30, mass:0, weapons:["w_e80_nato_carrier"], prereq:["navalyard","lab","airbase"], tech:3, from:"e80", to:"e80", service:"1986", confidence:"high", carrier:3, sonar:3.0, radar:13.2, ciws:0.5, rcs:2.35, desc:"The same two hulls, with the AN 52 free-fall nuclear bomb from 1978 and the ASMP stand-off missile from 1986 - which makes France the only navy in the world besides the United States with a nuclear strike capability flown off a carrier deck, and it still is. Britain's naval nuclear weapons in this period are the WE.177 free-fall bomb, gone with Ark Royal in 1978, and the WE.177A depth bomb, withdrawn in 1992." ,"name":"Clemenceau CV","full":"Clemenceau (R98) with Super Etendard and ASMP","service":"1961","desc":"The name ship, and from 1978 the platform for the Super Etendard carrying the ASMP nuclear missile - a seaborne leg of the deterrent that no other European navy had. She decommissioned in 1997; her sister Foch carried on to 2000."},
  fra_e80_cfighter: { fac:"fra", role:"cfighter", cat:"aircraft", layer:"air", name:"Super Etendard", full:"Dassault-Breguet Super Etendard", cost:1240, oil:24, time:19, hp:375, armor:"air", speed:5.6, turn:2.1, sight:7.4, r:16, mass:0, weapons:["w_e80_nato_fighter","w_e80_fra_cstrike"], prereq:["airbase"], tech:2, from:"e80", to:"e80", service:"1978", confidence:"high", jet:true, ammo:4, gen:3, radar:5, radarQ:7, radius:24, rcs:1.0, carrierCapable:true, refuelable:true, desc:"Subsonic, single-engined and unremarkable to look at, and it changed naval warfare: five Argentine aircraft with five Exocets sank HMS Sheffield and the Atlantic Conveyor in 1982 and taught every navy in the world that a cheap aeroplane with a sea-skimming missile can kill a modern warship. The French ones also carried the ASMP nuclear round." },
  fra_e80_aswhelo: { fac:"fra", role:"aswhelo", cat:"aircraft", layer:"air", name:"Lynx Mk4", full:"Westland Lynx HAS Mk4 (FN)", cost:1000, oil:20, time:14, hp:300, armor:"air", speed:3.5, turn:2.5, sight:6.8, r:12, mass:0, weapons:["asw_mk54"], prereq:["airbase"], tech:2, from:"e80", to:"e80", service:"1979", confidence:"high", ammo:2, radius:16, sonar:6.4, rcs:0.82, radarQ:5, gen:3, desc:"Twenty-six British-built Lynx flown from French decks, with a dipping sonar the Royal Navy's own Lynx never carried - the Marine Nationale specified the HAS version and the RN did not. They served until 2020. Anglo-French helicopter co-operation under the 1967 agreement also gave France the Gazelle and the Puma, and gave Britain the engines." },

  fra_e90_patrol: { fac:"fra", role:"patrol", cat:"naval", layer:"sea", name:"Flamant OPV 54", full:"Flamant (P676), OPV 54 class", cost:445, oil:5, time:8, hp:460, armor:"light", speed:2.4, turn:1.9, sight:7.4, r:13, mass:0, weapons:["hmg"], prereq:["navalyard"], tech:1, from:"e90", to:"e90", service:"1997", confidence:"high", turret:true, tturn:2.4, sonar:0.6, rcs:0.54, desc:"Three ships for the Channel and the Atlantic approaches, doing fishery protection, pollution control and search and rescue under the Maritime Prefect rather than the fleet. The French small combatant is a public-service hull; the fighting navy starts at a frigate, and that has been true since the 1960s." },
  fra_e90_corvette: { fac:"fra", role:"corvette", cat:"naval", layer:"sea", name:"La Fayette FS", full:"La Fayette (F710), La Fayette-class fregate furtive", cost:1080, oil:14, time:15, hp:1010, armor:"light", speed:2.8, turn:1.7, sight:8.6, r:17, mass:0, weapons:["w_e90_nato_corvette"], prereq:["navalyard"], tech:1, from:"e90", to:"e90", service:"1996", confidence:"high", turret:true, tturn:2.0, sonar:3.2, radar:15.8, ciws:0.44, rcs:0.14, desc:"The first warship in the world designed from the outset for a low radar signature: flat inclined surfaces, no exposed clutter, composite superstructure, and a measured cross-section a fraction of a conventional hull of the same size. Every stealth warship since is a descendant. It is also lightly armed and has no towed array at all - France bought the signature and left the sonar out, and the ships are called fregates furtives for a reason." },
  fra_e90_destroyer: { fac:"fra", role:"destroyer", cat:"naval", layer:"sea", name:"Cassard F70 AA", full:"Cassard (D614), Cassard-class anti-air frigate", cost:1900, oil:29, time:26, hp:1820, armor:"heavy", speed:2.34, turn:1.2, sight:9.6, r:20, mass:0, weapons:["navgun_100_fr","sam_sm1","ssm_exocet38"], prereq:["navalyard","radar"], tech:2, from:"e90", to:"e90", service:"1988", confidence:"high", turret:true, tturn:1.4, sonar:6.0, radar:17.0, ciws:0.52, rcs:1.1, desc:"Two ships carrying the American SM-1MR on a French hull with a French radar, because the European area-defence missile France wanted did not exist yet - Aster is a decade away. A Panther sits in the hangar aft. The anti-submarine half of the F70 programme, the seven Georges Leygues, is the more numerous and more useful ship and carries two Lynx." },
  fra_e90_sub: { fac:"fra", role:"sub", cat:"naval", layer:"sub", name:"Rubis SSN", full:"Rubis (S601), Rubis-class", cost:2040, oil:33, time:28, hp:1080, armor:"light", speed:2.4, turn:1.1, sight:7.4, r:17, mass:0, weapons:["w_e90_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e90", to:"e90", service:"1983", confidence:"high", sonar:8.4, quiet:0.40, radarQ:4, nuclear:true, desc:"Twenty-six hundred tonnes: the smallest nuclear attack submarine ever built, made possible by an integrated reactor design that fits a plant into a hull the size of a large diesel boat. The first two were noisy and everybody said so; the Amethyste refit from 1989 lengthened the hull, rebuilt the bow sonar and fixed most of it. France is the fourth country to build a nuclear attack submarine and the last of the Cold War five to manage it." },
  fra_e90_carrier: { fac:"fra", role:"carrier", cat:"naval", layer:"sea", name:"Foch CV", full:"Foch (R99), Clemenceau-class", cost:3180, oil:69, time:50, hp:2560, armor:"heavy", speed:1.5, turn:0.6, sight:11.4, r:30, mass:0, weapons:["w_e90_nato_carrier"], prereq:["navalyard","lab","airbase"], tech:3, from:"e90", to:"e90", service:"1963", confidence:"high", carrier:3, sonar:3.2, radar:14.2, ciws:0.52, rcs:2.35, desc:"Clemenceau paid off in 1997 and Foch carried the whole French carrier capability alone until 2000, when she was sold to Brazil as the Sao Paulo and Charles de Gaulle was still two years from working. For part of this decade France has one deck and no spare, which is the recurring structural problem of a one-carrier navy and the reason a second hull has been argued about ever since." },
  fra_e90_cfighter: { fac:"fra", role:"cfighter", cat:"aircraft", layer:"air", name:"Super Etendard Modernise", full:"Dassault Super Etendard Modernise (SEM)", cost:1330, oil:25, time:19, hp:385, armor:"air", speed:5.7, turn:2.1, sight:8.0, r:16, mass:0, weapons:["w_e90_nato_fighter","w_e90_fra_cas"], prereq:["airbase"], tech:2, from:"e90", to:"e90", service:"1993", confidence:"high", jet:true, ammo:4, gen:3.5, radar:6, radarQ:9, radius:24, rcs:1.0, carrierCapable:true, refuelable:true, desc:"The same airframe with the Anemone radar, a new cockpit and laser-guided weapons, flying strike missions over Bosnia and Kosovo from a French deck. It carried ASMP throughout, so France's carrier-borne nuclear leg never lapsed between the Etendard and the Rafale - the only such continuity outside the United States Navy." },
  fra_e90_aswhelo: { fac:"fra", role:"aswhelo", cat:"aircraft", layer:"air", name:"Lynx Mk4 (upgraded)", full:"Westland Lynx HAS Mk4 (FN), mid-life update", cost:1130, oil:21, time:14, hp:315, armor:"air", speed:3.55, turn:2.5, sight:7.2, r:12, mass:0, weapons:["asw_mk54"], prereq:["airbase"], tech:2, from:"e90", to:"e90", service:"1994", confidence:"high", ammo:3, radius:17, sonar:6.8, rcs:0.8, radarQ:6, gen:3.5, desc:"Still the only French shipborne anti-submarine helicopter, twenty years after it arrived, with a rebuilt acoustic processor and a new dipping sonar. The Panther that flies from the smaller decks is an armed utility helicopter and has no submarine sensors at all - so an escort without a Lynx aboard is an escort that cannot prosecute its own contact." },

  fra_e00_patrol: { fac:"fra", role:"patrol", cat:"naval", layer:"sea", name:"Confiance PLG", full:"La Confiance (P733), patrouilleur leger guyanais", cost:485, oil:6, time:9, hp:520, armor:"light", speed:2.6, turn:2.0, sight:7.8, r:13, mass:0, weapons:["hmg"], prereq:["navalyard"], tech:1, from:"e00", to:"e00", service:"2017", confidence:"high", turret:true, tturn:2.4, sonar:0.6, rcs:0.62, desc:"Sixty metres for French Guiana, where the job is illegal gold mining and illegal fishing and the protection of the Kourou space centre. France's patrol force is scattered across three oceans, and the pattern that begins with the P400 in 1986 continues - the cheap French hull is a constabulary ship a very long way from home." },
  fra_e00_corvette: { fac:"fra", role:"corvette", cat:"naval", layer:"sea", name:"FREMM Aquitaine", full:"Aquitaine (D650), FREMM multi-mission frigate", cost:1210, oil:16, time:16, hp:1140, armor:"light", speed:2.88, turn:1.7, sight:9.6, r:17, mass:0, weapons:["w_e00_nato_corvette"], prereq:["navalyard"], tech:1, from:"e00", to:"e00", service:"2012", confidence:"high", turret:true, tturn:2.0, sonar:9.0, radar:18.2, ciws:0.44, rcs:0.18, desc:"Six thousand tonnes, a shaped hull, Aster 15 in Sylver cells, Exocet, an NH90 and a variable-depth sonar - and on eight of them the MdCN naval cruise missile, which no other European escort carries and which gives a French frigate a thousand-kilometre land-attack reach. The ASW hulls have a towed array that is genuinely good, though not a Sonar 2087." },
  fra_e00_destroyer: { fac:"fra", role:"destroyer", cat:"naval", layer:"sea", name:"Horizon DDG", full:"Forbin (D620), Horizon-class", cost:2110, oil:32, time:27, hp:2000, armor:"heavy", speed:2.4, turn:1.2, sight:11.0, r:20, mass:0, weapons:["navgun_76","sam_aster30","sam_aster15","ssm_exocet"], prereq:["navalyard","radar"], tech:2, from:"e00", to:"e00", service:"2010", confidence:"high", turret:true, tturn:1.4, sonar:6.8, radar:19.2, ciws:0.56, rcs:0.26, desc:"Britain, France and Italy set out to build one air-defence ship together; Britain left in 1999 and built the Type 45 alone, and France and Italy built this. Same PAAMS system and same Aster missiles, a rotating EMPAR radar instead of SAMPSON, and two ships instead of six. Unlike the Type 45 it carries Exocet from the first day, because a French warship without an anti-ship missile is not a thing that gets built." },
  fra_e00_sub: { fac:"fra", role:"sub", cat:"naval", layer:"sub", name:"Rubis (Amethyste)", full:"Amethyste (S605), Rubis-class after the Amethyste refit", cost:2260, oil:37, time:29, hp:1170, armor:"light", speed:2.42, turn:1.1, sight:8.0, r:17, mass:0, weapons:["w_e00_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e00", to:"e00", service:"2000", confidence:"high", sonar:9.2, quiet:0.34, radarQ:4, nuclear:true, desc:"The whole class brought up to the Amethyste standard - a longer hull, a rebuilt bow sonar and a much better acoustic signature. Six boats, still the smallest nuclear attack submarines in the world, kept going well past their planned life because Barracuda was late. Saphir exercised against an American carrier group in 2015 and the French navy was happy for everyone to hear about it." },
  fra_e00_carrier: { fac:"fra", role:"carrier", cat:"naval", layer:"sea", name:"Charles de Gaulle CVN", full:"Charles de Gaulle (R91)", cost:4200, oil:92, time:54, hp:3220, armor:"heavy", speed:1.54, turn:0.6, sight:13.2, r:30, mass:0, weapons:["w_e00_nato_carrier"], prereq:["navalyard","lab","airbase"], tech:3, from:"e00", to:"e00", service:"2001", confidence:"high", carrier:3, nuclear:true, sonar:3.8, radar:16.0, ciws:0.5, rcs:2.1, desc:"The only nuclear-powered aircraft carrier in the world outside the United States Navy, and the only carrier anywhere besides an American one with catapults, arrestor wires and a fixed-wing early-warning aircraft. Two K15 reactors taken from the submarine programme, a flight deck lengthened before the E-2C could safely use it, and a propeller that broke on the first Atlantic crossing. One ship: when she is in refit, France has no carrier at all." },
  fra_e00_cfighter: { fac:"fra", role:"cfighter", cat:"aircraft", layer:"air", name:"Rafale M", full:"Dassault Rafale M", cost:1500, oil:31, time:20, hp:440, armor:"air", speed:8.5, turn:2.2, sight:10.2, r:16, mass:0, weapons:["w_e00_nato_fighter","w_e00_fra_cas"], prereq:["airbase"], tech:2, from:"e00", to:"e00", service:"2001", confidence:"high", jet:true, ammo:5, gen:4.5, radar:7, radarQ:14, radius:36, rcs:0.7, carrierCapable:true, refuelable:true, desc:"In service on the carrier in 2001, four years before the air force got one, because the deck could not wait. A reinforced undercarriage, a jump strut on the nose leg and an arrestor hook on an airframe that is otherwise the same aeroplane - France is the only country outside the United States operating catapult-launched conventional carrier fighters, and after the Super Etendard left in 2016 this is the only fixed-wing type the ship flies." },
  fra_e00_cawacs: { fac:"fra", role:"cawacs", cat:"aircraft", layer:"air", name:"E-2C Hawkeye", full:"Northrop Grumman E-2C Hawkeye 2000", cost:2750, oil:55, time:29, hp:480, armor:"air", speed:4.2, turn:1.0, sight:12.6, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e00", to:"e00", service:"2000", confidence:"high", jet:true, ammo:0, radar:25, radarQ:26, rcs:2.6, gen:4, radius:50, awacs:true, carrierCapable:true, desc:"Three aircraft, delivered from 1998, and France is the ONLY operator of carrier-based fixed-wing airborne early warning anywhere outside the United States Navy - a capability Britain lost with the Gannet in 1978 and cannot regain, because a ski-jump deck cannot launch one. It is also bought, not built: nothing European does this job and France did not pretend otherwise." },
  fra_e00_aswhelo: { fac:"fra", role:"aswhelo", cat:"aircraft", layer:"air", name:"NH90 NFH Caiman", full:"NHIndustries NH90 NFH Caiman Marine", cost:1380, oil:25, time:16, hp:390, armor:"air", speed:3.3, turn:2.3, sight:8.2, r:13, mass:0, weapons:["w_e00_nato_aswhelo"], prereq:["airbase"], tech:2, from:"e00", to:"e00", service:"2011", confidence:"high", ammo:4, radius:23, sonar:9.4, rcs:0.82, radarQ:9, gen:4.5, desc:"Fly-by-wire, a composite airframe, a folding tail for a frigate hangar, and the FLASH dipping sonar - the first genuinely modern anti-submarine helicopter France has operated, thirty years after the Lynx. Shared with Germany, Italy and the Netherlands, late and expensive, and the aircraft that finally let a French escort hunt on its own sensors." },


/* ============ BUNDESMARINE / DEUTSCHE MARINE - era units, e50 to e00 ============
   The empty slots ARE the roster and none of them is an oversight:

     carrier, cfighter, cstealth, cawacs - empty in all six eras, permanently.
       Graf Zeppelin was launched on 8 December 1938, never completed, scuttled
       at Stettin in April 1945, raised by the Soviets in 1946 and expended as
       a weapons target in the Baltic on 16 August 1947. No deck, therefore no
       air wing, therefore four roles that can never be filled.
     ssbn, ssgn, cruiser - empty in all six eras. Germany renounced nuclear
       weapons in 1954 and ratified the NPT in 1975; it has never owned a
       cruiser.
     corvette - filled at e60 by the Koln class and then EMPTY at e80 and e90.
       The Koln paid off and the Type 122 Bremen that replaced it is a full-size
       escort: there is no German small combatant of any kind between 1989 and
       the K130 in 2008.
     patrol - filled at e50 and e60 by the torpedo boats and empty from e80
       onward. From there every German small combatant is a missile-armed fast
       attack craft, so the cheap scouting hull does not exist in this navy,
       and after the last Gepard paid off in 2016 nothing at all does.
     missileboat - filled e60 to e00 and empty at e20. Thirty missile craft
       through the Cold War and none since 2016.
     aswhelo - empty before e80. No shipborne anti-submarine helicopter until
       the Sea Lynx Mk88 in 1981.

   The submarines carry `layMines` and `mineSea`, which no other boat in this
   game does. That is the Baltic: a Type 206 could carry twenty-four mines in
   external belts and lay them in water a nuclear submarine cannot enter, and
   mining the straits was the German navy's actual wartime task. */
  deu_e50_patrol: { fac:"deu", role:"patrol", cat:"naval", layer:"sea", name:"Jaguar Schnellboot", full:"Jaguar-class (Type 140) fast attack craft (torpedo)", cost:255, oil:4, time:6, hp:275, armor:"light", speed:3.2, turn:2.4, sight:5.4, r:13, mass:0, weapons:["hmg","torpedo"], prereq:["navalyard"], tech:1, from:"e50", to:"e50", service:"1957", confidence:"high", turret:true, tturn:2.4, sonar:0, rcs:0.45, desc:"Forty boats on a wooden-planked hull over a light metal frame, two 40 mm and four torpedo tubes, built by Lurssen to a line of descent running straight back to the wartime S-boot. The Bundesmarine was founded in 1956 with almost nothing and this is the one thing it had in numbers immediately, because the yards and the design had never stopped existing." },
  deu_e50_destroyer: { fac:"deu", role:"destroyer", cat:"naval", layer:"sea", name:"Z-1 Fletcher", full:"Z-1 (D170), ex-USS Anthony (DD-515), Fletcher-class", cost:960, oil:15, time:22, hp:1020, armor:"heavy", speed:2.08, turn:1.2, sight:6.2, r:20, mass:0, weapons:["w_e50_nato_destroyer","aagun_5in38"], prereq:["navalyard","radar"], tech:2, from:"e50", to:"e50", service:"1958", confidence:"high", turret:true, tturn:1.4, sonar:4.8, radar:10.4, ciws:0.44, rcs:0.95, desc:"Six wartime American Fletchers transferred between 1958 and 1960 - Z-1 and Z-2 in 1958, Z-3 in 1959, Z-4, Z-5 and Z-6 in 1960 - and they were the entire German destroyer force. A navy allowed to exist again in 1955 under a treaty that capped its tonnage and forbade it submarines over 350 tonnes, starting from second-hand hulls that were already fifteen years old." },
  deu_e50_sub: { fac:"deu", role:"sub", cat:"naval", layer:"sub", name:"Hai (Type XXIII)", full:"U-Hai (S170), raised and rebuilt Type XXIII", cost:900, oil:14, time:20, hp:480, armor:"light", speed:1.7, turn:1.3, sight:3.8, r:15, mass:0, weapons:["w_e50_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e50", to:"e50", service:"1957", confidence:"medium", sonar:2.6, quiet:0.52, radarQ:1, layMines:4, mineSea:true, desc:"Two wartime Type XXIII coastal boats scuttled in 1945, raised from the Baltic mud and recommissioned in 1957 as training submarines, because the Western European Union treaty capped new German boats at 350 tonnes and there was nothing else to learn on. U-Hai foundered in a storm in 1966 with nineteen dead. This is what the start of the best conventional submarine force in the world looks like." },

  deu_e60_patrol: { fac:"deu", role:"patrol", cat:"naval", layer:"sea", name:"Zobel Schnellboot", full:"Zobel-class (Type 142) fast attack craft (torpedo)", cost:300, oil:4, time:7, hp:300, armor:"light", speed:3.3, turn:2.4, sight:5.8, r:13, mass:0, weapons:["hmg","torpedo"], prereq:["navalyard"], tech:1, from:"e60", to:"e60", service:"1962", confidence:"high", turret:true, tturn:2.4, sonar:0, rcs:0.45, desc:"Ten improved Jaguars with wire-guided torpedoes and a better fire control system. Still torpedo boats: the Bundesmarine has no anti-ship missile of any kind until Exocet arrives on the Type 148 in 1972, and until then the plan for stopping a Warsaw Pact amphibious force in the Baltic approaches is forty small boats making a torpedo attack at night." },
  deu_e60_corvette: { fac:"deu", role:"corvette", cat:"naval", layer:"sea", name:"Koln Type 120", full:"Koln (F220), Type 120 Koln-class frigate", cost:670, oil:9, time:13, hp:720, armor:"light", speed:2.6, turn:1.7, sight:6.4, r:17, mass:0, weapons:["w_e60_nato_corvette"], prereq:["navalyard"], tech:1, from:"e60", to:"e60", service:"1961", confidence:"high", turret:true, tturn:2.0, sonar:4.0, radar:9.0, ciws:0.32, rcs:0.9, desc:"Six ships, and the first warships designed and built in Germany after the war - a combined diesel and gas turbine plant that was ahead of its time, two 100 mm French mountings and two 375 mm Bofors anti-submarine rocket launchers. They paid off between 1982 and 1989 and nothing small replaced them: from then until the K130 in 2008 the German navy has no corvette at all." },
  deu_e60_destroyer: { fac:"deu", role:"destroyer", cat:"naval", layer:"sea", name:"Lutjens Type 103", full:"Lutjens (D185), Type 103 Lutjens-class", cost:1230, oil:19, time:23, hp:1300, armor:"heavy", speed:2.16, turn:1.2, sight:7.4, r:20, mass:0, weapons:["w_e60_nato_destroyer","sam_tartar"], prereq:["navalyard","radar"], tech:2, from:"e60", to:"e60", service:"1969", confidence:"high", turret:true, tturn:1.4, sonar:6.0, radar:13.0, ciws:0.5, rcs:1.05, desc:"Three ships built in the United States to the Charles F. Adams design with German modifications - Tartar, ASROC and two 127 mm - and the first real air-defence ships Germany ever had. The Bundesmarine buys American where the technology does not exist at home and builds at home where it does, which is a pattern that holds for fifty years." },
  deu_e60_sub: { fac:"deu", role:"sub", cat:"naval", layer:"sub", name:"Type 205", full:"U-1 (S180), Type 205; Type 201 boats from 1962", cost:1150, oil:18, time:22, hp:590, armor:"light", speed:1.85, turn:1.3, sight:4.6, r:16, mass:0, weapons:["w_e60_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e60", to:"e60", service:"1962", confidence:"high", sonar:4.4, quiet:0.36, radarQ:2, layMines:6, mineSea:true, desc:"Three hundred and fifty tonnes, because that was the treaty limit, and built of a non-magnetic steel so that a mine would not sense them - which then corroded so badly that U-1, U-2 and U-3 had to be rebuilt almost from scratch. The mistake was worth making: an amagnetic hull is a real Baltic advantage and Germany kept pursuing it, and the Type 212A is still built that way sixty years later." },

  deu_e80_destroyer: { fac:"deu", role:"destroyer", cat:"naval", layer:"sea", name:"Bremen F122", full:"Bremen (F207), Type 122 Bremen-class frigate", cost:1580, oil:24, time:25, hp:1600, armor:"heavy", speed:2.26, turn:1.2, sight:8.8, r:20, mass:0, weapons:["w_e80_nato_destroyer","sam_seasparrow"], prereq:["navalyard","radar"], tech:2, from:"e80", to:"e80", service:"1982", confidence:"high", turret:true, tturn:1.4, sonar:7.4, radar:15.0, ciws:0.5, rcs:1, desc:"Eight ships on a Dutch Kortenaer hull with German systems - Harpoon, Sea Sparrow, two Sea Lynx and a 76 mm - and the class that turned the Bundesmarine from a coastal force into one that could escort in the North Atlantic. RAM was NOT aboard in 1982: the launcher positions were built in and left empty, because RIM-116 did not become operational until 1992." },
  deu_e80_missileboat: { fac:"deu", role:"missileboat", cat:"naval", layer:"sea", name:"Type 143 Albatros", full:"Albatros (P6111), Type 143 and Type 143A Gepard fast attack craft", cost:1080, oil:16, time:17, hp:690, armor:"light", speed:3.0, turn:1.9, sight:7.4, r:16, mass:0, weapons:["w_e80_nato_missileboat"], prereq:["navalyard","radar"], tech:2, from:"e80", to:"e80", service:"1976", confidence:"high", sonar:0, rcs:0.55, desc:"Ten Type 143 and ten Type 143A, four MM38 Exocet each, on top of the twenty Type 148 already in service - thirty missile craft, which for two decades is the largest missile boat force in NATO and the whole German answer to a Warsaw Pact landing in the Baltic approaches. The 143A traded the after 76 mm gun for a RAM launcher position that stayed empty until the 1990s." },
  deu_e80_sub: { fac:"deu", role:"sub", cat:"naval", layer:"sub", name:"Type 206", full:"U-13 (S192), Type 206", cost:1620, oil:25, time:25, hp:800, armor:"light", speed:1.9, turn:1.3, sight:6.0, r:16, mass:0, weapons:["w_e80_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e80", to:"e80", service:"1973", confidence:"high", sonar:5.6, quiet:0.28, radarQ:2, layMines:8, mineSea:true, desc:"Eighteen boats of four hundred and fifty tonnes, amagnetic hulls, eight tubes, and twenty-four mines carried in external belts along the casing - a submarine designed to lay a minefield across a strait and then leave. Small enough to work in water the Baltic and the Danish approaches offer and nothing larger can use. This is the point in the timeline where German conventional submarines become the best in the world and stay there." },
  deu_e80_aswhelo: { fac:"deu", role:"aswhelo", cat:"aircraft", layer:"air", name:"Sea Lynx Mk88", full:"Westland Sea Lynx Mk88", cost:990, oil:20, time:14, hp:295, armor:"air", speed:3.5, turn:2.5, sight:6.6, r:12, mass:0, weapons:["asw_mk54"], prereq:["airbase"], tech:2, from:"e80", to:"e80", service:"1981", confidence:"high", ammo:2, radius:16, sonar:6.0, rcs:0.82, radarQ:5, gen:3, desc:"Nineteen British Lynx bought for the Bremen-class hangars, and the first shipborne anti-submarine helicopter the German navy ever had - before 1981 a German escort had no organic air asset at all and prosecuted contacts with rocket launchers and its own sonar. The Sea King Mk41 alongside it is a search-and-rescue aircraft, not an ASW one." },

  deu_e90_destroyer: { fac:"deu", role:"destroyer", cat:"naval", layer:"sea", name:"Brandenburg F123", full:"Brandenburg (F215), Type 123 Brandenburg-class frigate", cost:1870, oil:28, time:26, hp:1830, armor:"heavy", speed:2.32, turn:1.2, sight:9.4, r:20, mass:0, weapons:["navgun_76","sam_seasparrow","sam_ram","ssm_exocet38","asw_mu90"], prereq:["navalyard","radar"], tech:2, from:"e90", to:"e90", service:"1994", confidence:"high", turret:true, tturn:1.4, sonar:8.0, radar:16.4, ciws:0.54, rcs:0.8, desc:"Four ships, designed as anti-submarine escorts with a towed array, two Sea Lynx, Sea Sparrow in a vertical launcher and two RAM mounts - the first German class designed with RAM from the drawing board. The East German navy that vanished in 1990 left sixteen Parchim corvettes, fourteen Frosch landing ships and nine Kondor minesweepers, which were sold to Indonesia in 1992-93; the Koni frigates, Tarantuls and Osas were scrapped or expended as targets." },
  deu_e90_missileboat: { fac:"deu", role:"missileboat", cat:"naval", layer:"sea", name:"Type 143A Gepard", full:"Gepard (P6121), Type 143A with RIM-116 RAM", cost:1270, oil:19, time:18, hp:780, armor:"light", speed:3.05, turn:1.9, sight:8.0, r:16, mass:0, weapons:["w_e90_nato_missileboat"], prereq:["navalyard","radar"], tech:2, from:"e90", to:"e90", service:"1992", confidence:"medium", sonar:0, rcs:0.5, desc:"The empty launcher position on the Gepard class was finally filled when RIM-116 became operational in 1992, and these were among the first ships in the world to carry it - a twenty-one-cell box of infrared and anti-radiation-homing rounds designed jointly by Germany and the United States specifically to stop a sea-skimmer at the last moment. A German requirement, because a four-hundred-tonne boat has no room for anything larger." },
  deu_e90_sub: { fac:"deu", role:"sub", cat:"naval", layer:"sub", name:"Type 206A", full:"U-15 (S194), Type 206A", cost:1920, oil:30, time:26, hp:870, armor:"light", speed:1.92, turn:1.3, sight:6.6, r:16, mass:0, weapons:["w_e90_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e90", to:"e90", service:"1991", confidence:"high", sonar:6.4, quiet:0.26, radarQ:3, layMines:8, mineSea:true, desc:"Twelve of the eighteen boats rebuilt with a new sonar, new fire control and the DM2A3 torpedo. Quieter than anything the Soviet Union had in the Baltic and small enough to sit motionless on a shoal with the plant shut down, listening. Germany's submarine arm has never had a nuclear boat and has never wanted one: a reactor makes noise, needs deep water, and cannot hide in fifty metres of the Kattegat." },
  deu_e90_aswhelo: { fac:"deu", role:"aswhelo", cat:"aircraft", layer:"air", name:"Sea Lynx Mk88A", full:"Westland Sea Lynx Mk88A", cost:1120, oil:21, time:14, hp:312, armor:"air", speed:3.55, turn:2.5, sight:7.0, r:12, mass:0, weapons:["asw_mk54"], prereq:["airbase"], tech:2, from:"e90", to:"e90", service:"1998", confidence:"high", ammo:3, radius:17, sonar:6.6, rcs:0.74, radarQ:6, gen:3.5, desc:"The Mk88 fleet rebuilt with a new radar, a data link and Sea Skua, and seven more airframes bought - twenty-two aircraft that are still the only shipborne anti-submarine helicopter Germany operates twenty-five years later. Ordering a replacement took until 2020." },

  deu_e00_corvette: { fac:"deu", role:"corvette", cat:"naval", layer:"sea", name:"K130 Braunschweig", full:"Braunschweig (F260), Type 130 corvette", cost:1120, oil:15, time:16, hp:960, armor:"light", speed:2.95, turn:1.9, sight:8.8, r:17, mass:0, weapons:["w_e00_nato_corvette"], prereq:["navalyard"], tech:1, from:"e00", to:"e00", service:"2008", confidence:"high", turret:true, tturn:2.0, sonar:2.2, radar:14.6, ciws:0.5, rcs:0.16, desc:"Eighteen hundred tonnes, a shaped topside, a 76 mm, two RAM launchers and four RBS15 - and no sonar of consequence, because it is a Baltic ship built to fight from the coast rather than hunt submarines in the Atlantic. The first German small combatant in nineteen years, and it is nearly twice the size of the fast attack craft it replaced, which is why Germany can no longer scout water cheaply." },
  deu_e00_destroyer: { fac:"deu", role:"destroyer", cat:"naval", layer:"sea", name:"Sachsen F124", full:"Sachsen (F219), Type 124 air-defence frigate", cost:2080, oil:32, time:27, hp:2040, armor:"heavy", speed:2.35, turn:1.2, sight:10.8, r:20, mass:0, weapons:["navgun_76","sam_sm2mr","sam_ram","ssm_harpoon","asw_mu90"], prereq:["navalyard","radar"], tech:2, from:"e00", to:"e00", service:"2004", confidence:"high", turret:true, tturn:1.4, sonar:7.6, radar:19.0, ciws:0.54, rcs:0.34, desc:"APAR - four fixed active phased-array faces, one of very few radars in the world in the class of SPY-1 and SAMPSON - with SM-2, ESSM, RAM and Harpoon beneath it. Three ships, and they are the only air-defence hulls Germany has. The Type 125 that follows in 2019 is a stabilisation frigate with a 127 mm gun, no towed array and no anti-submarine torpedoes, and cannot do this job at all." },
  deu_e00_missileboat: { fac:"deu", role:"missileboat", cat:"naval", layer:"sea", name:"Gepard 143A (late)", full:"Type 143A Gepard-class, final commission", cost:1360, oil:20, time:18, hp:810, armor:"light", speed:3.05, turn:1.9, sight:8.2, r:16, mass:0, weapons:["ssm_exocet"], prereq:["navalyard","radar"], tech:2, from:"e00", to:"e00", service:"2008", confidence:"high", sonar:0, rcs:0.5, desc:"The last German missile boats, and the last German warships small enough to be called cheap. The final three paid off in November 2016 and the type ended with them - thirty craft in 1990, none in 2017. Everything the German navy owns from that point displaces at least eighteen hundred tonnes, which is a structural change to what the fleet can afford to risk." },
  deu_e00_sub: { fac:"deu", role:"sub", cat:"naval", layer:"sub", name:"Type 212A", full:"U-31 (S181), Type 212A", cost:2110, oil:33, time:28, hp:800, armor:"light", speed:1.9, turn:1.3, sight:7.2, r:15, mass:0, weapons:["w_e00_nato_sub"], prereq:["navalyard","radar"], tech:2, from:"e00", to:"e00", service:"2005", confidence:"high", sonar:8.4, quiet:0.21, radarQ:3, aip:true, layMines:8, mineSea:true, desc:"Nine hydrogen fuel cells and a metal-hydride store, so the boat makes its own electricity without air and can stay down for weeks rather than days - air-independent propulsion, in service, on a hull that is also amagnetic and acoustically isolated. It is the quietest submarine in this game and it is not nuclear. U-32 crossed the Atlantic submerged on fuel cells alone in 2013 and set a record no conventional boat had approached." },
  deu_e00_aswhelo: { fac:"deu", role:"aswhelo", cat:"aircraft", layer:"air", name:"Sea Lynx Mk88A", full:"Westland Sea Lynx Mk88A, mid-life", cost:1230, oil:23, time:15, hp:330, armor:"air", speed:3.55, turn:2.5, sight:7.4, r:12, mass:0, weapons:["w_e00_nato_aswhelo"], prereq:["airbase"], tech:2, from:"e00", to:"e00", service:"2010", confidence:"high", ammo:3, radius:19, sonar:7.2, rcs:0.74, radarQ:7, gen:4, desc:"Still the Lynx, thirty years on, now with MU90 and a data link, flying from the F123 and F124 hangars. The NH90 NFH Sea Tiger was ordered in 2020 to replace it and deliveries have barely begun - the same aircraft France has flown since 2011. Germany buys well and buys late, and this airframe is the clearest single illustration of it in the fleet." },

});

/* ==================================================================
   SUBMARINES: ERA HULLS AND THE SOVIET AND FRENCH BOOMER CHAINS

   Placed here, at the foot of the file and BEFORE reindexRoles() below, for
   two reasons. The units have to exist before the roster is re-indexed or
   they can never be built; and every row this block touches is a generated
   one with a quoted key, so editing the loadouts through a table keeps the
   whole change in one place and lets any single navy be dropped by deleting
   its lines rather than by unpicking a 400-character literal.

   Every weapon id referenced here is authored in rules.js, which has already
   run. Nothing below invents an id.
   ================================================================== */

/* ==================================================================
   THE SOVIET AND RUSSIAN NUCLEAR ATTACK SUBMARINE

   Recorded as missing and it was. Every pact boat in this file is
   diesel-electric - Whiskey, Foxtrot, Kilo, Improved Kilo, Varshavyanka -
   and the present-day roster's sub_p is a Kilo as well, so the navy that
   built more nuclear attack submarines than the rest of the world put
   together had not one of them in any period. The hole was invisible
   because NATO's own `sub` role IS its SSN line - Nautilus, Sturgeon, Los
   Angeles, Seawolf, Virginia - so both navies had one submarine slot and
   the pact correctly spent its on the boat it had most of.

   THIS IS A SECOND ROLE, NOT A REPLACEMENT, because the Soviet Navy ran
   both lines side by side and the contrast is the point of having them:
   the Kilo is slow, short-legged and extremely quiet; the nuclear boat is
   fast, long-legged and - until 1984 - extremely loud. No faction without
   an `ssn` row loses anything, and none is given one to keep the sheet
   symmetrical: NATO's nuclear boats are already its `sub` role, and the
   PLA, the KPA and Taiwan are not handed a line they did not have.

   WHY THESE FIVE.
     e50  Project 627 November. K-3 Leninsky Komsomol commissioned 4 July
          1958, to the North Pole submerged in July 1962, thirteen hulls.
     e60  Project 671 Victor I. K-38 commissioned 5 November 1967, the
          a teardrop hull, one shaft, thirty-two knots.
     e80  Project 971 Shchuka-B, Akula I. K-284 commissioned 30 December
          1984 - the boat that ended the free ride. Project 945 Sierra
          commissioned the same year in titanium and only four were built,
          so the Akula is the class that belongs in the slot.
     e90  Project 971U Akula II. K-157 Vepr, 1996 - and pact_e90_sub's own
          desc already names it "the one genuinely modern nuclear boat"
          while the game had no such boat to build.
     e00  Project 885 Yasen. K-560 Severodvinsk, accepted 30 December 2013
          and in service 17 June 2014.
   The 2020s boat is ssn_p in rules.js, with the rest of the present day.

   THEY ARE LOUD AND THAT IS NOT A PENALTY. `quiet` is a signature and
   lower is harder to find. A November at 0.90 sits beside the Romeo's 1.00
   because the class was tracked across oceans; the Akula's 0.44 is the
   mid-1980s quieting leap, helped by the propeller milling machines sold
   through Toshiba and Kongsberg and by what the Walker ring handed over -
   a story nato_e80_sub's own desc already tells from the other side.

   NO LAND ATTACK BEFORE e00, which is the line the Kilo refit below draws
   and for the same reason: the S-10 Granat that Project 671RTM and the
   Akula could fire from 1984 was a nuclear-armed strategic round,
   withdrawn under the 1991 unilateral initiatives, and the conventional
   weapon is the Kalibr. So the Yasen carries tlam_p and the four boats
   before it carry torpedoes only.

   WEAPONS ARE THE SAME-ERA PACT TORPEDO and not a new id: one navy's
   nuclear and diesel boats in one decade fired the same 533 mm weapon, and
   generations.js clones a private per-unit copy of it regardless.
   ================================================================== */
Object.assign(UNITS, {
  pact_e50_ssn: { fac:"pact", role:"ssn", cat:"naval", layer:"sub", name:"Project 627 November", full:"Project 627 Kit (K-3 Leninsky Komsomol)", cost:1250, oil:21, time:26, hp:700, armor:"light", speed:2.25, turn:1.1, sight:4.8, r:17, mass:0, weapons:["w_e50_pact_sub"], prereq:["navalyard","radar"], tech:2, from:"e50", to:"e50", service:"1958", confidence:"high", sonar:4.6, quiet:0.90, nuclear:true, desc:"The Soviet Union's first nuclear submarine and the second in the world, four years behind Nautilus. Two shafts and thirty knots submerged - faster than the escorts hunting her - on a long fine hull with a rounded limousine bow. She was also dangerous to her own crew, with repeated steam generator failures, and loud enough that the Americans tracked the class across oceans." },
  pact_e60_ssn: { fac:"pact", role:"ssn", cat:"naval", layer:"sub", name:"Project 671 Victor I", full:"Project 671 Yorsh (K-38)", cost:1520, oil:26, time:26, hp:860, armor:"light", speed:2.40, turn:1.1, sight:5.6, r:17, mass:0, weapons:["w_e60_pact_sub"], prereq:["navalyard","radar"], tech:2, from:"e60", to:"e60", service:"1967", confidence:"high", sonar:5.6, quiet:0.70, nuclear:true, desc:"A teardrop hull and the boat that made the Northern Fleet's attack force modern: one shaft, thirty-two knots, and a serious quieting effort that narrowed the gap without closing it. Fifteen built, then Project 671RT and 671RTM carried the line to 1992 - and the RTM of 1979 is where anechoic tiles and a real acoustic improvement arrive." },
  pact_e80_ssn: { fac:"pact", role:"ssn", cat:"naval", layer:"sub", name:"Project 971 Akula", full:"Project 971 Shchuka-B, Akula I (K-284)", cost:1980, oil:33, time:28, hp:1080, armor:"light", speed:2.42, turn:1.1, sight:6.7, r:17, mass:0, weapons:["w_e80_pact_sub"], prereq:["navalyard","radar"], tech:2, from:"e80", to:"e80", service:"1984", confidence:"high", sonar:6.6, quiet:0.44, nuclear:true, desc:"The boat that ended the free ride. K-284 commissioned on 30 December 1984 and the US Navy found her far quieter than anything this industry had put to sea, which is the mid-1980s quieting leap the Los Angeles entry describes from the other side. Fifteen hulls, a long faired fin and a seven-bladed skewed screw. Project 945 Sierra commissioned the same year with a titanium hull and four were ever built, so the Akula is the class that matters here." },
  pact_e90_ssn: { fac:"pact", role:"ssn", cat:"naval", layer:"sub", name:"Project 971U Akula II", full:"Project 971U (K-157 Vepr)", cost:2230, oil:37, time:29, hp:1160, armor:"light", speed:2.44, turn:1.1, sight:7.4, r:17, mass:0, weapons:["w_e90_pact_sub"], prereq:["navalyard","radar"], tech:2, from:"e90", to:"e90", service:"1996", confidence:"high", sonar:7.2, quiet:0.33, nuclear:true, desc:"Three metres of extra hull to hold a raft carrying the machinery, and by American testimony quieter at patrol speed than an improved Los Angeles. The decade's diesel boat in this game says as much itself: Project 636 in the 1990s was an export build, while this was the one genuinely modern boat the Russian Navy commissioned in ten years of having no money at all." },
  pact_e00_ssn: { fac:"pact", role:"ssn", cat:"naval", layer:"sub", name:"Project 885 Yasen", full:"Project 885 Yasen (K-560 Severodvinsk)", cost:2560, oil:42, time:30, hp:1280, armor:"light", speed:2.45, turn:1.1, sight:7.8, r:17, mass:0, weapons:["w_e00_pact_sub","tlam_p"], prereq:["navalyard","radar"], tech:2, from:"e00", to:"e00", service:"2014", confidence:"high", sonar:8.2, quiet:0.30, nuclear:true, desc:"Twenty years on the slipway: laid down 21 December 1993, floated out 15 June 2010, accepted 30 December 2013 and in service 17 June 2014. A pumpjet, and the first Russian boat with a spherical bow array - which is why the torpedo tubes moved aft of it and angled out - plus vertical launch modules for the Kalibr. That missile is why this hull reaches a target ashore and the four before it do not: the S-10 Granat an Akula could fire from 1987 was nuclear-armed and was withdrawn, and the conventional round arrives with this boat." },
});

/* ---- era hulls that were carrying the wrong loadout ---- */
(function () {
  var REFIT = {
    /* pact. Project 636.3 Varshavyanka, in service 2014, and the class that
       fired the first Russian submarine Kalibr in anger on 8 December 2015.
       js/facts.js says this hull carries "Kalibr cruise missiles on Project
       636.3" and js/sub_specs.js says "Kalibr fires from the torpedo tubes";
       the weapon list said one torpedo with tgt.ground 0. e00 is the first
       era in which any submarine of this navy can strike a target ashore,
       and that is the correct date - e50, e60, e80 and e90 stay empty. */
    pact_e00_sub: { add: ["tlam_p"] },

    /* gbr. HMS Astute commissioned 27 August 2010 with Tomahawk Block IV as a
       primary weapon; her own desc says "Spearfish, Tomahawk, and the Sonar
       2076 array". The e90 Trafalgar is deliberately NOT given one: Britain's
       first Tomahawk was fired on 9 November 1998, fourteen months from the
       end of a decade the row represents from 1990, and from a Swiftsure
       rather than a Trafalgar. The desc says so. */
    gbr_e00_sub: { add: ["tlam_b"] },

    /* kpa. The unit is called an experimental ballistic missile submarine,
       sub_specs.js gives it missileDeck:true with the note that "the single
       SLBM tube rides in the sail itself", and its one weapon was NAMED
       "1x vertical launch tube for Pukguksong-1 S" while being a torpedo that
       could not reach land and COULD engage a submerged submarine, which a
       vertical missile tube cannot. Appended rather than made primary: this
       row also fills the KPA's only attack-submarine slot in e00 and still
       has to behave like a submarine. One tube and no reload at sea, so the
       magazine holds exactly one round - the boat shoots once and has to go
       home to a naval yard for another. */
    kpa_e00_sub: { add: ["slbm_pk1"], set: { magazine: { slbm_pk1: 1 } } },

    /* pla. The desc opens "Air-independent propulsion using a Stirling
       engine, which lets the boat stay submerged for weeks instead of days"
       and the row had no aip flag, so game.js multiplied its signature by 2.2
       whenever it had to snorkel and ui.js printed DIESEL-ELECTRIC on the
       card. Its own e20 successor sub_c already carries the flag, and so does
       deu_e00_sub, so there is nothing new here but the token. */
    pla_e00_sub: { set: { aip: true } },
  };
  for (var rid in REFIT) {
    var ru = UNITS[rid]; if (!ru) continue;
    var spec = REFIT[rid];
    if (spec.add) {
      ru.weapons = (ru.weapons || []).slice();
      for (var ra = 0; ra < spec.add.length; ra++)
        if (ru.weapons.indexOf(spec.add[ra]) < 0 && WEAPONS[spec.add[ra]])
          ru.weapons.push(spec.add[ra]);
    }
    if (spec.set) for (var rk in spec.set) ru[rk] = spec.set[rk];
  }

  /* Two weapon NAMES that were cut off mid-word at the generator's
     forty-two-character ceiling, both on rows no other unit shares. The
     Sinpo's said "1x vertical launch tube for Pukguksong-1 S" while being a
     torpedo; it is a torpedo, so it now says so, and the missile above is the
     launch tube. The GUPPY's ended on an unbalanced parenthesis. */
  if (WEAPONS.w_e00_kpa_sub) WEAPONS.w_e00_kpa_sub.name = "533mm bow tubes, Romeo-derived hull";
  if (WEAPONS.w_e60_roc_sub) WEAPONS.w_e60_roc_sub.name = "533mm tubes, training loadout only";
})();

/* ---- the boomer chains that were standing on one hull ---- */
Object.assign(UNITS, {

  /* ============ SOVIET STRATEGIC SUBMARINES, 1967 to 2013 ============
     ssbn_p is a Project 955A Borei-A firing a Bulava, so rules.js moves it to
     e00 where it belongs: K-535 Yuriy Dolgorukiy commissioned 10 January 2013,
     the 955A the name claims is Knyaz Vladimir of 12 June 2020, and the Bulava
     was not accepted into service until 2018 after losing roughly half of its
     first fourteen test launches. js/facts.js already records service 2013 for
     that id. Without these three rows that correction would leave the navy
     with the largest ballistic-missile submarine force ever built holding
     nothing at sea in e60, e80 and e90, which is the worse error.

     Windows do not overlap: Yankee e60 only, Typhoon e80 only, Delta IV e90
     only, ssbn_p from e00. unitFor() picks by highest from-index and would
     otherwise make a to:"e00" on the Delta dead data nobody can build.

     No torpedoes, matching nato_e60_ssbn, gbr_e60_ssbn and fra_e60_ssbn,
     none of which carries one either. No 3D rows: modelKeyFor() borrows the
     Ohio hull, which is what those three already do. */
  pact_e60_ssbn: { fac:"pact", role:"ssbn", cat:"naval", layer:"sub", name:"Yankee I SSBN", full:"Project 667A Navaga (K-137)", cost:3400, oil:78, time:48, hp:1560, armor:"heavy", speed:1.95, turn:0.5, sight:5.0, r:26, mass:0, weapons:["slbm_r27"], prereq:["navalyard","lab","radar"], tech:3, from:"e60", to:"e60", service:"1967", confidence:"high", sonar:5.4, quiet:0.58, radarQ:3, nuclear:true, ssbn:true, desc:"K-137 commissioned 5 November 1967: the first Soviet boat laid out like a Polaris submarine, sixteen tubes in the hull abaft the fin instead of three standing inside it. Thirty-four built. The R-27 reaches 2,400 km against Polaris A3's 4,600, so a Yankee had to patrol close off the American coast to hold anything worth holding, and she was loud enough that the US Navy trailed her out of the Barents as routine. Both facts are the argument for the Delta that replaced her and for the Arctic bastion that followed: if the missile reaches far enough, the boat never has to leave water your own navy controls." },
  pact_e80_ssbn: { fac:"pact", role:"ssbn", cat:"naval", layer:"sub", name:"Typhoon SSBN", full:"Project 941 Akula (TK-208)", cost:4400, oil:105, time:58, hp:2400, armor:"heavy", speed:1.85, turn:0.42, sight:5.2, r:28, mass:0, weapons:["slbm_r39"], prereq:["navalyard","lab","radar"], tech:3, from:"e80", to:"e80", service:"1981", confidence:"high", sonar:6.2, quiet:0.46, radarQ:3, nuclear:true, ssbn:true, desc:"Commissioned 12 December 1981 and still the largest submarine ever built: forty-eight thousand tonnes submerged, two pressure hulls side by side inside one outer casing with the twenty R-39 tubes between them forward of the fin. Built to sit under the Arctic ice where the Northern Fleet could defend her, break up through it and shoot, which is why the sail and casing are reinforced and no Western boomer's are. Six built. The R-39 line was at Yuzhmash in Ukraine, so when the Union ended the missile ended, and the class went with it." },
  pact_e90_ssbn: { fac:"pact", role:"ssbn", cat:"naval", layer:"sub", name:"Delta IV SSBN", full:"Project 667BDRM Delfin (K-51)", cost:3900, oil:95, time:54, hp:1900, armor:"heavy", speed:1.9, turn:0.5, sight:5.1, r:26, mass:0, weapons:["slbm_sineva"], prereq:["navalyard","lab","radar"], tech:3, from:"e90", to:"e90", service:"1984", confidence:"high", sonar:6.6, quiet:0.40, radarQ:3, nuclear:true, ssbn:true, desc:"Seven boats commissioned 1984 to 1992, and the deterrent that actually went to sea through the 1990s while the Typhoons lay alongside for want of missiles and the Borei was still a drawing. The hump abaft the fin is the sixteen tubes. The R-29RM is liquid-fuelled, which the West gave up on at sea, and it is also the most accurate missile the Soviet Union ever put in a submarine - astro-inertial, CEP around 500 m; the Sineva reworking flew 11,547 km on test in 2008. Six are still on patrol." },

  /* ============ THE FRENCH DETERRENT IN THE 1990s ============
     ssbn_f carries the M51 and rules.js moves it to e00 for the same reason:
     M51 first flew on 9 November 2006 and did not go on patrol until Le
     Terrible in 2010, while Le Triomphant commissioned on 21 March 1997 with
     sixteen M45. This row is the same boat one missile generation earlier,
     which is what makes that correction a fix rather than an amputation. The
     name is distinguished from ssbn_f's the way fra_e90_sub and fra_e00_sub
     distinguish Rubis from Amethyste. */
  fra_e90_ssbn: { fac:"fra", role:"ssbn", cat:"naval", layer:"sub", name:"Le Triomphant (M45)", full:"Le Triomphant (S616), Triomphant-class with M45", cost:5900, oil:136, time:68, hp:2480, armor:"heavy", speed:1.95, turn:0.5, sight:5.8, r:26, mass:0, weapons:["slbm_m45"], prereq:["navalyard","lab","radar"], tech:3, from:"e90", to:"e90", service:"1997", confidence:"high", sonar:9.0, quiet:0.26, radarQ:5, nuclear:true, ssbn:true, desc:"Commissioned 21 March 1997 and on patrol the same year with sixteen M45 - the M4 airframe under the hardened TN 75 warhead, six thousand kilometres, six bodies. M51 does not exist yet: it first flew in 2006, went on patrol aboard Le Terrible in 2010, and Le Triomphant herself was not converted until the 2016-18 refit, so a 1990s French boomer firing M51 was ten years ahead of the missile's first test. The Redoutable class did not all leave at once either - L'Inflexible stayed on patrol until 2008." },
});

/* ==================================================================
   UNITED STATES - the six roles that were standing on one machine
   ==================================================================
   SIX American roles had exactly ONE row covering all six periods, and five
   of them carried a modern machine stamped with a date it never earned - the
   E-2D at 1950, the KC-46 at 1950, the Super Hornet at 1980, Prophet at 1980
   and the Stryker ATGM at 1960. That is not a cosmetic problem.
   G.genContest() in js/game.js reads `from` as a real
   service date when it decides how much jamming a radar eats, and the
   DOMAIN_BITE table in js/generations.js scales a unit's ordnance by the same
   field. A 2014 aeroplane dated 1950 is scored as a 1950s aeroplane.

   Each chain below is real equipment with a checked in-service date. Where a
   band is missing it is missing on purpose and the reason is written down.
   The rules.js rows for the six were rebased to their true dates in the same
   pass, so nothing here overlaps them: unitFor() picks the highest `from`
   still in era, and every window below closes before the next one opens.

   No 3D rows and no js/air_specs.js rows are needed. modelKeyFor() in
   render3d.js falls through to a same-role peer of the same category, which
   is what the Soviet boomers above already do - and for the E-2 family in
   particular the peer IS the same airframe. */
Object.assign(WEAPONS, {

  /* ---- the deck fighter's own armament, where it differs from the
     land fighter of the same decade ----
     e60 and e90 are deliberately absent: the F-4B's fit really was the
     AIM-7/AIM-9 pair already written as w_e60_nato_fighter (the B model had
     no gun at all), and the F/A-18C's really was the AMRAAM already written
     as w_e90_nato_fighter. Naming a duplicate would be dishonest padding.
     The two that ARE here are the two the Navy did differently. */
  w_e50_nato_cfighter: { name:"Four 20mm Colt Mk 12 cannon", dmg:78, warhead:"flak", range:6.6, reload:3.9, burst:1, acc:0.60, proj:"missile", speed:700, aoe:0.8, ammo:1, tgt:{ground:0,air:1,sea:0,sub:0}, profile:"pop", intercept:0.55 },
  /* The Tomcat is the one carrier fighter that out-ranged everything ashore.
     AIM-54A Phoenix, six carried, guided by the AWG-9 which could track
     twenty-four targets and shoot at six - in 1974. It is given more reach
     than the land-based w_e80_nato_fighter (8.6) and less hit probability,
     because the long shots mostly missed: of the handful ever fired in anger
     the record is poor, and the missile's real value was that a formation
     broke up rather than close. */
  w_e80_nato_cfighter: { name:"AIM-54A Phoenix and AIM-7F Sparrow", dmg:150, warhead:"flak", range:10.4, reload:4.1, burst:1, acc:0.68, proj:"missile", speed:700, aoe:0.8, ammo:1, tgt:{ground:0,air:1,sea:0,sub:0}, profile:"pop", intercept:0.55 },

  /* ---- the tank destroyer's gun, then its three missiles ----
     The pen figure is NOT written here. generations.js keys penetration off
     the unit's role and era (ROLE_GUN.tankdestroyer = 1.05) and clones the
     weapon per unit to do it, so a hand-written pen would be overwritten for
     the gun and ignored for the missiles. Damage, reach and reload are the
     honest part and they are what is set. */
  w_e50_nato_tankdestroyer: { name:"90mm M54 gun on an open mount", dmg:64, warhead:"cannon", range:5.8, reload:6.2, burst:1, acc:0.55, proj:"shell", speed:860, aoe:0.9, suppress:22, tgt:{ground:1,air:0,sea:1,sub:0} },
  /* BGM-71 TOW: optically tracked, wire-guided, and the gunner must hold the
     crosshair on the target for the whole flight. That is the weakness the
     reload and the accuracy are standing in for - a first-generation SACLOS
     launcher cannot move and cannot be suppressed while it shoots. */
  w_e60_nato_tankdestroyer: { name:"BGM-71A TOW, roof mount, gunner exposed", dmg:132, warhead:"heat", range:8.6, minRange:1.5, reload:7.6, burst:1, acc:0.70, proj:"missile", speed:330, aoe:0.8, suppress:16, tgt:{ground:1,air:0,sea:1,sub:0}, profile:"pop", intercept:1 },
  /* The ITV's hammerhead puts two ready rounds and the sight on the end of a
     mast, so the hull stays behind the crest. Faster into action than the
     roof mount it replaced, hence the shorter reload. */
  w_e80_nato_tankdestroyer: { name:"Two TOW-2 in an erectable hammerhead launcher", dmg:152, warhead:"heat", range:9.0, minRange:1.5, reload:6.4, burst:1, acc:0.80, proj:"missile", speed:330, aoe:0.8, suppress:16, tgt:{ground:1,air:0,sea:1,sub:0}, profile:"pop", intercept:1 },
  w_e90_nato_tankdestroyer: { name:"TOW-2A with the AN/TAS-4 thermal sight", dmg:158, warhead:"heat", range:9.3, minRange:1.5, reload:6.1, burst:1, acc:0.85, proj:"missile", speed:330, aoe:0.8, suppress:16, tgt:{ground:1,air:0,sea:1,sub:0}, profile:"pop", intercept:1 },

  /* ---- the heavy tank's gun ----
     120mm M58, separate-loading: a projectile and a brass powder case handled
     by TWO loaders. Five rounds a minute from a fresh crew and fewer after
     that, which is the whole argument the 105mm M68 won in 1960 - the reload
     below is the slowest tank gun the American army ever fielded. */
  w_e50_nato_heavy: { name:"120mm M58 gun, separate-loading, two loaders", dmg:80, warhead:"cannon", range:6.9, reload:7.4, burst:1, acc:0.61, proj:"shell", speed:880, aoe:0.9, suppress:26, tgt:{ground:1,air:0,sea:1,sub:0} },
  w_e60_nato_heavy: { name:"120mm M58 with the M103A2 fire-control update", dmg:84, warhead:"cannon", range:7.1, reload:7.0, burst:1, acc:0.64, proj:"shell", speed:880, aoe:0.9, suppress:26, tgt:{ground:1,air:0,sea:1,sub:0} },
});

Object.assign(UNITS, {

  /* ============ CARRIER AIRBORNE EARLY WARNING, 1958 to 2015 ============
     The owner's own example, and the clearest case in the game for why one
     row cannot be six decades: E-2A of 1964 and E-2D of 2014 are the same
     airframe family and completely different aeroplanes. The radar runs
     AN/APS-82 -> APS-96 -> APS-125 -> APS-145 -> APY-9, valve analogue to UHF
     active array, and the last of those was built specifically to find things
     the ones before it could not.

     `radar` here is the coverage radius in tiles and these rows keep their
     own, because RADAR_COVERAGE in rules.js only overrides the ids listed in
     it. `jam` is NOT set: the pass that derives an AEW aircraft's jamming
     from its radar fit runs in rules.js, which loads before this file, so era
     AEW rows are pure receivers - exactly as fra_e00_cawacs already is.
     carrierCapable is what lets a hull embark them. */
  nato_e50_cawacs: { fac:"nato", role:"cawacs", cat:"aircraft", layer:"air", name:"E-1B Tracer", full:"Grumman WF-2 / E-1B Tracer", cost:1450, oil:30, time:26, hp:300, armor:"air", speed:3.3, turn:1.0, sight:8.4, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e50", to:"e50", service:"1958", confidence:"high", jet:true, ammo:0, radar:14.5, radarQ:4, rcs:3.4, gen:2, radius:30, awacs:true, carrierCapable:true, desc:"Eighty-eight built on the S-2 Tracker's wing and tail, with the AN/APS-82 slung in a fixed teardrop above the fuselage and the fin split into three to clear it. Piston-engined, two men in the back, and no overland look-down at all - ground clutter beats the set, so it is a picket for the seaward approaches and nothing else. It is still the first time a fleet could see past its own horizon from its own deck, which is the capability the whole line below inherits. Retired 1977." },
  nato_e60_cawacs: { fac:"nato", role:"cawacs", cat:"aircraft", layer:"air", name:"E-2B Hawkeye", full:"Grumman E-2B Hawkeye", cost:1950, oil:40, time:27, hp:380, armor:"air", speed:3.9, turn:1.0, sight:10.6, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e60", to:"e60", service:"1969", confidence:"high", jet:true, ammo:0, radar:20.5, radarQ:8, rcs:2.6, gen:3, radius:42, awacs:true, carrierCapable:true, desc:"Forty-nine E-2As sent back to Grumman from 1969 and rebuilt around the Litton L-304 general-purpose computer, because the A model's analogue kit was unreliable enough that squadrons did not trust it. The airframe with the rotodome is the one the Navy still flies today; this is the aeroplane becoming the system. The E-2A itself of 1964 stands one role over, as nato_e60_awacs." },
  nato_e80_cawacs: { fac:"nato", role:"cawacs", cat:"aircraft", layer:"air", name:"E-2C Hawkeye", full:"Grumman E-2C Hawkeye (AN/APS-125)", cost:2350, oil:48, time:28, hp:440, armor:"air", speed:4.1, turn:1.0, sight:11.6, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e80", to:"e80", service:"1973", confidence:"high", jet:true, ammo:0, radar:24.0, radarQ:13, rcs:2.6, gen:3.5, radius:46, awacs:true, carrierCapable:true, desc:"In service with VAW-123 in November 1973 and the variant that made the type matter: APS-120, then the APS-125 Advanced Radar Processing System from 1976 and APS-138 from 1983, each one a better answer to the same problem of picking a low aircraft out of sea return. This is the aeroplane that ran the Gulf of Sidra intercepts in 1981 and 1989 - the fighters shot, the Hawkeye decided." },
  nato_e90_cawacs: { fac:"nato", role:"cawacs", cat:"aircraft", layer:"air", name:"E-2C Group II", full:"Grumman E-2C Group II (AN/APS-145)", cost:2550, oil:52, time:29, hp:465, armor:"air", speed:4.2, turn:1.0, sight:12.0, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e90", to:"e90", service:"1992", confidence:"high", jet:true, ammo:0, radar:26.0, radarQ:18, rcs:2.6, gen:3.8, radius:48, awacs:true, carrierCapable:true, desc:"APS-145 from 1992: the same aerial, far better clutter rejection and enough processing to hold a track overland rather than only over water. Group II Hawkeyes controlled strike packages over Iraq and the Adriatic from decks that were the only airfields anyone would give the coalition. The France beside it bought this aeroplane and nothing else in Europe can do the job - see fra_e00_cawacs." },
  nato_e00_cawacs: { fac:"nato", role:"cawacs", cat:"aircraft", layer:"air", name:"E-2C Hawkeye 2000", full:"Northrop Grumman E-2C Hawkeye 2000", cost:2800, oil:56, time:30, hp:490, armor:"air", speed:4.3, turn:1.0, sight:12.6, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:3, from:"e00", to:"e00", service:"2001", confidence:"high", jet:true, ammo:0, radar:27.5, radarQ:24, rcs:2.6, gen:4.2, radius:52, awacs:true, carrierCapable:true, desc:"Delivered from 2001 and first deployed by VAW-117 in 2004. The radar is still the APS-145; what is new is the Mission Computer Upgrade and Cooperative Engagement Capability, which lets a ship fire on a track the aeroplane is holding and the ship cannot see. That is the change worth marking - the Hawkeye stops being a radar that talks and becomes part of the fleet's fire-control loop. Eight-bladed NP2000 propellers came with the same programme." },

  /* ============ THE TANKER FORCE, 1953 to 2019 ============
     The single most consequential support aircraft in the game had one row.
     Every band below is filled because there is no period since 1948 in which
     the United States lacked a tanker force - the question was only what it
     flew. Note e00: no NEW tanker. The KC-X replacement ran aground twice, on
     the 2003 lease scandal and on the overturned 2008 award, so the fleet
     that fought the 2000s was the same KC-135R and KC-10A it had in 1991.
     That is why the e90 row carries to:"e00" - a deliberate sixteen-year hole
     in American tanker procurement, recorded rather than papered over. */
  nato_e50_tanker: { fac:"nato", role:"tanker", cat:"aircraft", layer:"air", name:"KC-97G Stratofreighter", full:"Boeing KC-97G Stratofreighter", cost:2300, oil:55, time:33, hp:640, armor:"air", speed:3.2, turn:0.85, sight:8.4, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:2, from:"e50", to:"e50", service:"1953", confidence:"high", jet:true, ammo:0, radius:95, tanker:300, refuelRate:9, rcs:5.4, gen:1.5, desc:"Eight hundred and sixteen built, and the aeroplane that made the Strategic Air Command's reach real before the jet tanker existed. Piston-engined and too slow for its own customers: to pass fuel to a B-47 the tanker had to push over into a shallow dive so the bomber could stay above stalling speed, both aircraft trading altitude for the whole transfer. It works, and it is the reason the KC-135 was ordered." },
  nato_e60_tanker: { fac:"nato", role:"tanker", cat:"aircraft", layer:"air", name:"KC-135A Stratotanker", full:"Boeing KC-135A Stratotanker", cost:2900, oil:64, time:37, hp:720, armor:"air", speed:4.3, turn:0.88, sight:8.8, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:2, from:"e60", to:"e60", service:"1957", confidence:"high", jet:true, ammo:0, radius:135, tanker:380, refuelRate:13, rcs:5.6, gen:2.5, desc:"Seven hundred and thirty-two built from 1957, and the aircraft that turned tactical aviation into something with global range. Over Vietnam the Young Tiger tracks were flown continuously and crews credit them with saving hundreds of aircraft that would otherwise have flamed out short of a runway. Underpowered on water-injected J57s, which is the single thing the 1980s re-engining fixes." },
  nato_e80_tanker: { fac:"nato", role:"tanker", cat:"aircraft", layer:"air", name:"KC-10A Extender", full:"McDonnell Douglas KC-10A Extender", cost:3400, oil:76, time:42, hp:820, armor:"air", speed:4.3, turn:0.85, sight:9.0, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:2, from:"e80", to:"e80", service:"1981", confidence:"high", jet:true, ammo:0, radius:165, tanker:500, refuelRate:17, rcs:6.2, gen:3, desc:"Sixty aircraft on the DC-10 airframe, in service 1981 and retired in September 2024. It carries close to twice a KC-135's fuel, has a boom AND a hose for Navy receivers, can be refuelled itself, and hauls the squadron's ground crew and spares in the same trip - which is what actually let fighter wings self-deploy across an ocean. The largest single offload in this game belongs to the 1980s, and that is correct." },
  nato_e90_tanker: { fac:"nato", role:"tanker", cat:"aircraft", layer:"air", name:"KC-135R Stratotanker", full:"Boeing KC-135R (CFM56)", cost:3000, oil:66, time:38, hp:740, armor:"air", speed:4.4, turn:0.88, sight:9.0, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:2, from:"e90", to:"e00", service:"1984", confidence:"high", jet:true, ammo:0, radius:150, tanker:400, refuelRate:14, rcs:5.6, gen:3.2, desc:"The same airframe re-engined with CFM56 from 1984: roughly a quarter more fuel to give away, half the takeoff roll, and the noise and the smoke gone. This row runs to e00 on purpose. Nothing replaced it for thirty-five years - the KC-X competition collapsed in the 2003 lease scandal and again when the 2008 award was overturned - so the tanker that fought Desert Storm is also the tanker that fought the 2000s." },

  /* ============ THE CARRIER AIR WING'S FIGHTER, 1952 to 2001 ============
     rules.js used to say in so many words that e50 and e60 were a roster gap
     and that Forrestal and Enterprise fell back on helicopters. They did not
     in life: the United States Navy has flown fixed-wing fighters off decks
     continuously since 1922, and the two hulls in question are IN this game.

     The weapons are shared with the land-based fighter of the same decade
     where the fit really was the same, which is also what fra_e50_cfighter
     and gbr_e60_cfighter already do. */
  nato_e50_cfighter: { fac:"nato", role:"cfighter", cat:"aircraft", layer:"air", name:"F9F-8 Cougar", full:"Grumman F9F-8 Cougar", cost:760, oil:17, time:14, hp:300, armor:"air", speed:4.6, turn:2.3, sight:7.2, r:16, mass:0, weapons:["w_e50_nato_cfighter","w_e50_nato_cstrike"], prereq:["airbase"], tech:2, from:"e50", to:"e50", service:"1952", confidence:"high", jet:true, ammo:5, gen:1.5, radar:3, radarQ:3, radius:17, rcs:1.1, carrierCapable:true, desc:"The Panther with a swept wing, which is the Navy catching up with the Sabre eighteen months late and from a moving runway. Four 20mm cannon, no radar worth the name, and a landing speed the straight-wing Panther pilots hated. It is on Forrestal's deck because the alternative - a carrier with no fighters - is the thing that was actually wrong here." },
  nato_e60_cfighter: { fac:"nato", role:"cfighter", cat:"aircraft", layer:"air", name:"F-4B Phantom II", full:"McDonnell F-4B Phantom II", cost:1150, oil:26, time:18, hp:430, armor:"air", speed:7.4, turn:1.9, sight:8.6, r:16, mass:0, weapons:["w_e60_nato_fighter","w_e60_nato_cstrike"], prereq:["airbase"], tech:2, from:"e60", to:"e60", service:"1961", confidence:"high", jet:true, ammo:5, gen:3, radar:6, radarQ:7, radius:27, rcs:1.6, carrierCapable:true, desc:"A Navy aeroplane first and an Air Force one afterwards - the fleet had it in 1961 and Tactical Air Command had to be argued into it. Two engines, two crew, a big APQ-72 and eight missiles, and NO gun, which is the design decision Vietnam spent five years disproving. It shares its armament row with nato_e60_fighter because the fit genuinely was the same Sparrow and Sidewinder pair." },
  /* The A-6 gets its own role rather than competing with the fighter for the
     "cfighter" slot: unitFor() answers ONE unit per faction-role-era, so an
     Intruder written as a cfighter would simply shadow the Tomcat, and a
     carrier would sail with no fighters at all. "cstrike" is a second deck
     role beside "cfighter" and "cstealth", and G.deckAircraftFor gives it a
     share of the deck the way the ASW helicopter already gets the last spot.
     A real air wing is fighters AND attack aircraft; this is the first time
     the game has been able to say so. */
  nato_e60_cstrike: { fac:"nato", role:"cstrike", cat:"aircraft", layer:"air", name:"A-6A Intruder", full:"Grumman A-6A Intruder", cost:1420, oil:30, time:20, hp:470, armor:"air", speed:6.4, turn:1.7, sight:8.6, r:16, mass:0, weapons:["w_e60_nato_intruder"], prereq:["airbase"], tech:2, from:"e60", to:"e60", service:"1963", confidence:"high", jet:true, ammo:5, carrierCapable:true, refuelable:true, radius:30, rcs:1.3, gen:2, desc:"The Navy's first all-weather attack aircraft and, for thirty years, the only one that could find a target at night in bad weather and hit it. Side-by-side seating so the bombardier-navigator could work the radar with the pilot's head in the same picture. Subsonic, no gun, and no air-to-air capability whatsoever - it exists to carry eighteen thousand pounds somewhere unpleasant and come back. This is why the Tomcat crews were never asked to bomb." },
  nato_e80_cstrike: { fac:"nato", role:"cstrike", cat:"aircraft", layer:"air", name:"A-6E TRAM", full:"Grumman A-6E TRAM Intruder", cost:1560, oil:32, time:21, hp:500, armor:"air", speed:6.5, turn:1.7, sight:9.4, r:16, mass:0, weapons:["w_e80_nato_intruder"], prereq:["airbase"], tech:2, from:"e80", to:"e80", service:"1979", confidence:"high", jet:true, ammo:5, carrierCapable:true, refuelable:true, radius:31, rcs:1.3, gen:3, desc:"TRAM is the little turret under the nose: infrared, laser designator and laser receiver, so one aeroplane could find its own target in the dark and guide its own bomb onto it. That is the whole reason the 1980s American carrier had a strike capability at all, and it is not the Tomcat - the F-14 had no cleared air-to-ground stores until LANTIRN reached the squadrons in 1996." },
  nato_e90_cstrike: { fac:"nato", role:"cstrike", cat:"aircraft", layer:"air", name:"A-6E SWIP", full:"Grumman A-6E SWIP Intruder", cost:1680, oil:34, time:22, hp:520, armor:"air", speed:6.5, turn:1.7, sight:9.8, r:16, mass:0, weapons:["w_e90_nato_intruder"], prereq:["airbase"], tech:2, from:"e90", to:"e90", service:"1990", confidence:"high", jet:true, ammo:5, carrierCapable:true, refuelable:true, radius:31, rcs:1.3, gen:3, desc:"The Systems/Weapons Improvement Program added Harpoon, SLAM and HARM to an airframe designed in 1957, and then the wings started cracking. Retired in 1997 with nothing to replace it: the Navy handed all-weather deep strike to the F/A-18, which cannot carry as much as far, and has been arguing about that decision ever since." },

  nato_e80_cfighter: { fac:"nato", role:"cfighter", cat:"aircraft", layer:"air", name:"F-14A Tomcat", full:"Grumman F-14A Tomcat", cost:1600, oil:34, time:21, hp:500, armor:"air", speed:7.8, turn:1.9, sight:10.4, r:16, mass:0, weapons:["w_e80_nato_cfighter"], prereq:["airbase"], tech:2, from:"e80", to:"e80", service:"1974", confidence:"high", jet:true, ammo:6, gen:3.5, radar:8, radarQ:10, radius:38, rcs:1.4, carrierCapable:true, desc:"Deck-qualified in 1974 and built around one question: how does a carrier group stop a regiment of Backfires before they release. The answer was the AWG-9, which could track twenty-four contacts and shoot at six, and six AIM-54 Phoenix - the longest-ranged air-to-air weapon anyone fielded for twenty years. It out-reaches every land-based fighter of its decade in this roster, which is the historically correct and slightly uncomfortable answer." },
  nato_e90_cfighter: { fac:"nato", role:"cfighter", cat:"aircraft", layer:"air", name:"F/A-18C Hornet", full:"McDonnell Douglas F/A-18C Hornet", cost:1480, oil:31, time:19, hp:455, armor:"air", speed:7.9, turn:2.1, sight:9.4, r:16, mass:0, weapons:["w_e90_nato_fighter","w_e90_nato_cstrike"], prereq:["airbase"], tech:2, from:"e90", to:"e90", service:"1987", confidence:"high", jet:true, ammo:5, gen:4, radar:6, radarQ:11, radius:30, rcs:0.9, carrierCapable:true, desc:"Shorter-legged than the Tomcat it flew beside and far more useful, because it is a fighter and a bomber in the same sortie and the deck only has so many spots. Two Hornets shot down MiG-21s on the first morning of Desert Storm while still carrying the bombs they went on to drop. Its AMRAAM row is shared with nato_e90_fighter: the missile is the same missile." },

  /* ============ THE TANK DESTROYER, 1957 to 2003 ============
     A Stryker dated 1960 was the sharpest anachronism in the American roster.
     What the army actually fielded is a gun that ran away from tanks, then
     thirty years of TOW on a tracked box, then TOW on a wheeled one.

     Armour is NOT set by role here - generations.js keys protection off the
     armour CLASS, which is why every one of these is armor:"light" no matter
     how large the gun is. The M56 in particular has no armour of any kind;
     its low hp is the whole design. */
  nato_e50_tankdestroyer: { fac:"nato", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"M56 Scorpion", full:"M56 Scorpion, 90mm self-propelled anti-tank gun", cost:560, oil:7, time:11, hp:200, armor:"light", speed:2.5, turn:2.8, sight:6.4, r:13, mass:7, weapons:["w_e50_nato_tankdestroyer"], prereq:["factory"], tech:1, from:"e50", to:"e50", service:"1957", confidence:"high", turret:false, desc:"A 90mm M54 gun, a seven-tonne tracked chassis, four men sitting in the open behind a shield, and nothing else - no roof, no sides, no turret. It exists because an airborne division had to have something that could kill a tank and could also come out of a C-130. The gun is a real gun and the vehicle is a target: anything that sees it first wins. The 173rd Airborne took them to Vietnam." },
  nato_e60_tankdestroyer: { fac:"nato", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"M113A1 TOW", full:"M113A1 with the M220 TOW launcher", cost:980, oil:12, time:14, hp:540, armor:"light", speed:1.7, turn:2.1, sight:8.0, r:13, mass:12, weapons:["w_e60_nato_tankdestroyer"], prereq:["factory","radar"], tech:2, from:"e60", to:"e60", service:"1973", confidence:"medium", turret:false, desc:"TOW entered service in 1970 and went straight onto the aluminium box the army already had ten thousand of. The launcher is bolted to the roof and the gunner stands in the hatch behind it, which is the problem: the missile flies for fifteen seconds on a wire and he has to hold the crosshair on the target for every one of them, in the open, while the tank shoots back. The M901 below is the answer to precisely that." },
  nato_e80_tankdestroyer: { fac:"nato", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"M901 ITV", full:"M901 Improved TOW Vehicle", cost:1060, oil:13, time:15, hp:600, armor:"light", speed:1.8, turn:2.1, sight:8.4, r:13, mass:12, weapons:["w_e80_nato_tankdestroyer"], prereq:["factory","radar"], tech:2, from:"e80", to:"e80", service:"1979", confidence:"high", turret:true, tturn:1.2, desc:"The hammerhead. Two ready missiles and the sight ride on the end of a mast that swings up over the hull, so the vehicle stays entirely behind the crest and only the launcher head shows - and the crew stay inside. About two and a half thousand built from 1979, and the standard anti-armour company of the Central Front. Erecting the mast takes time, which is the price of not standing in the hatch." },
  nato_e90_tankdestroyer: { fac:"nato", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"M901A1 ITV", full:"M901A1 ITV with TOW-2 and AN/TAS-4", cost:1090, oil:13, time:15, hp:610, armor:"light", speed:1.8, turn:2.1, sight:10.4, r:13, mass:12, weapons:["w_e90_nato_tankdestroyer"], prereq:["factory","radar"], tech:2, from:"e90", to:"e90", service:"1991", confidence:"medium", turret:true, tturn:1.2, desc:"The same hammerhead with TOW-2 and the AN/TAS-4 thermal sight, which is the upgrade that mattered: in the smoke and the burning oil of February 1991 it could see and the thing shooting at it could not. Its long sight range here is that thermal, not a better missile. Retired through the 1990s as the Bradley took the job over, and the Stryker ATGM of 2003 is what eventually replaced the dedicated vehicle." },

  /* ============ THE HEAVY TANK, 1957 to 1974, AND THEN NOTHING ============
     e80, e90 and e00 are EMPTY and that is the finding, not a gap to fill.
     The United States abolished the heavy tank as a class: the M103 was the
     last one, the 1960 decision to standardise on a single main battle tank
     ended the line, and there has been no American heavy tank since. The
     M1A2C in rules.js holds e20 as the modern super-heavy, which is a
     different argument about active protection rather than a continuation of
     this one. Britain has exactly the same shape - gbr_e50_heavy Conqueror,
     then nothing until gbr_e90_heavy - for exactly the same reason.

     armorMM is not written here either: generations.js derives it from
     ARM_FRONT.nato and the hull's hp for anything armor:"heavy". */
  nato_e50_heavy: { fac:"nato", role:"heavy", cat:"vehicle", layer:"ground", name:"M103", full:"M103 Heavy Tank (120mm Gun Tank M103)", cost:1150, oil:19, time:25, hp:1450, armor:"heavy", speed:1.0, turn:1.2, sight:6.8, r:18, mass:58, weapons:["w_e50_nato_heavy"], prereq:["factory","lab"], tech:3, from:"e50", to:"e50", service:"1957", confidence:"high", turret:true, tturn:1.2, crush:true, desc:"Three hundred built to answer the IS-3 at a range the Pattons could not reach, and accepted by the Army in 1957 already half obsolete. Separate-loading 120mm ammunition and two loaders to handle it, a fifty-eight-tonne hull on an engine meant for a forty-five-tonne one, and a road range that made moving it a logistics operation. The Army was glad to be rid of it; the Marine Corps kept it because a landing force wanted the gun." },
  nato_e60_heavy: { fac:"nato", role:"heavy", cat:"vehicle", layer:"ground", name:"M103A2", full:"M103A2 Heavy Tank (USMC)", cost:1230, oil:20, time:25, hp:1500, armor:"heavy", speed:1.08, turn:1.25, sight:7.2, r:18, mass:58, weapons:["w_e60_nato_heavy"], prereq:["factory","lab"], tech:3, from:"e60", to:"e60", service:"1964", confidence:"high", turret:true, tturn:1.25, crush:true, desc:"The Marine Corps' rebuild: the M60's diesel in place of the petrol engine, which fixes the range, and better fire control, which fixes the hit probability. It served in Marine tank battalions until 1973-74 and was the last heavy tank in American service. Nothing replaced it, because the 1960 decision to field one main battle tank instead of a light-medium-heavy family had already ended the class." },

  /* ============ GROUND ELECTRONIC WARFARE, 1985 to now ============
     e50 and e60 are EMPTY. The United States Army had no divisional jamming
     vehicle before its Combat Electronic Warfare Intelligence battalions were
     formed in 1977-78; until then ground electronic warfare was a corps-level
     signals intelligence activity and the jamming mission belonged to the Air
     Force and the Navy. This roster already says so from the other side - the
     e50 and e60 ewair rows are an AD-5Q Skyraider and an EA-6B Prowler.

     Both rows below are COMMUNICATIONS jammers, not radar jammers, so their
     jamPower is well under the Prophet's and far under a Growler's. What they
     do to an opponent is break his ability to co-ordinate, which is a real
     effect and a different one. */
  nato_e80_ewveh: { fac:"nato", role:"ewveh", cat:"vehicle", layer:"ground", name:"TACJAM", full:"AN/MLQ-34 TACJAM on the M1015 carrier", cost:1250, oil:12, time:17, hp:540, armor:"light", speed:1.5, turn:1.7, sight:7.4, r:14, mass:12, weapons:[], prereq:["factory","radar"], tech:2, from:"e80", to:"e80", service:"1985", confidence:"medium", jam:5.6, jamPower:0.62, radar:6, turret:true, tturn:0.7, desc:"A tracked shelter full of receivers and transmitters, issued to the divisional CEWI battalion, whose job is to sit behind the covering force and take the other side's command net off the air. It cannot touch a fire-control radar - that is the Air Force's problem and the Prowler's - and against a Soviet regiment relying on voice on the move it is genuinely disruptive. Conspicuous the moment it transmits, like every jammer here." },
  nato_e90_ewveh: { fac:"nato", role:"ewveh", cat:"vehicle", layer:"ground", name:"TRAFFIC JAM", full:"AN/TLQ-17A TRAFFIC JAM on the HMMWV", cost:1180, oil:11, time:15, hp:420, armor:"light", speed:2.2, turn:2.3, sight:8.0, r:14, mass:5, weapons:[], prereq:["factory","radar"], tech:2, from:"e90", to:"e90", service:"1991", confidence:"medium", jam:6.0, jamPower:0.66, radar:6, turret:true, tturn:0.8, desc:"The same trade on a Humvee: a lighter, faster and completely unarmoured jammer that can keep up with a brigade instead of a division. Used through Desert Storm against Iraqi command nets. Nothing about it survives being found - five tonnes, canvas doors - so it lives or dies on shooting and moving, which is the way every emitter in this game should be handled." },
});

/* ==================================================================
   THE SOVIET AND RUSSIAN ERA CHAINS

   Placed here, at the foot of the file and BEFORE reindexRoles() below, for
   the same reason the boomer chains above are: the units have to exist before
   the roster is re-indexed or they can never be built.

   WHAT WAS MEASURED. Eleven pact roles were standing on ONE row covering all
   six periods, and four of those rows are machines that did not exist for most
   of the span they were being fielded in - 9P157-2 Khrizantema-S (2005) dated
   e60, 1RL257 Krasukha-4 (2014) dated e60, Ka-27PL (1981) dated e60. That date
   is not a label. js/game.js genContest() reads `from` to decide who wins the
   jamming duel, and js/generations.js DOMAIN_BITE scales every weapon a unit
   carries by it: pact guided accuracy is multiplied by 0.968 at e60 and by
   0.712 at e00, so a 2005 missile dated 1965 was firing 36% more accurately
   than the same missile dated honestly.

   Every weapon id below is authored below. Nothing here invents an id, and
   nothing here needs a 3D row: render3d.js modelKeyFor() borrows a same-role,
   same-category peer, which is what the ssbn chain above already relies on.
   ================================================================== */

Object.assign(WEAPONS, {

  /* ---- ANTI-TANK MISSILE CARRIERS ----
     e50 has no row and must not have one. The Soviet Army had no anti-tank
     guided missile of any kind until the 3M6 Shmel of 1960; the 9K11 Malyutka
     was accepted on 16 September 1963. Before that the anti-tank weapon was a
     towed gun or an assault gun, and this game already gives the pact both
     (pact_e50_spg is an SU-100). An empty band is the correct answer. */

  /* 9M14 off a 9P110: six rails on a BRDM-1, MCLOS, and the operator flies
     the missile the whole way with a thumb joystick while the target shoots
     back. Accuracy is deliberately the worst of any guided round in the game:
     Egyptian and Syrian crews in October 1973 were the best-trained Malyutka
     operators ever fielded and still scored somewhere near a quarter of shots,
     and untrained crews scored almost nothing. Its 500 m arming distance is
     the minRange, and it is why a Malyutka carrier is helpless the moment
     anything closes. */
  "w_e60_pact_tankdestroyer": {
    "name": "6 x 9M14 MCLOS from a pop-up rack", "dmg": 78, "warhead": "heat",
    "range": 6.2, "minRange": 1.2, "reload": 6.5, "burst": 1, "acc": 0.52,
    "proj": "missile", "speed": 340, "aoe": 0.7, "suppress": 14,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 },
    "profile": "pop", "intercept": 1
  },
  /* 9M114 Kokon off a 9P149: radio-command SACLOS instead of a wire, which is
     what lets it fly at 345-400 m/s instead of 120, and twelve rounds in an
     automatic loader instead of six on rails. 5 km against the Konkurs team's
     4, so it sits between w_e80_pact_at (6.6) and the Western atgm_veh (8.4).
     The radio link is the weakness and the reason Rtut-class jamming matters
     in both directions. */
  "w_e80_pact_tankdestroyer": {
    "name": "9M114 supersonic radio-command ATGM", "dmg": 120, "warhead": "heat",
    "range": 7.4, "minRange": 1.3, "reload": 5.4, "burst": 1, "acc": 0.74,
    "proj": "missile", "speed": 400, "aoe": 0.8, "suppress": 16,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 },
    "profile": "pop", "intercept": 1
  },

  /* ---- THE FORGER'S ARMAMENT ----
     The Yak-38 had no radar at all, only a ranging set, so it could not carry
     a radar-guided missile and never did. Two R-60 on the outer pylons and a
     GSh-23L in a pod on an inner one, and the pods and the missiles compete
     for the same four hardpoints as the bombs. Deliberately far below
     w_e60_pact_fighter (a MiG-21 at 7.8 tiles): a land-based fighter of the
     same decade beats this aircraft in every column. */
  "w_e60_pact_cfighter": {
    "name": "2 x R-60 IR and a GSh-23L pod", "dmg": 88, "warhead": "flak",
    "range": 5.2, "reload": 4.2, "burst": 1, "acc": 0.58, "proj": "missile",
    "speed": 700, "aoe": 0.8, "ammo": 1,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 },
    "profile": "pop", "intercept": 0.55
  },
  /* Yak-38M: new R-28V-300 and RD-38 engines, which bought back some of the
     payload the Forger lost to hot-day vertical takeoffs, and the R-60M. Still
     no radar. The literal reads 0.68 rather than the 0.63 the hardware would
     suggest because DOMAIN_BITE is measured, not guessed: at 0.63 this 1985
     aircraft resolved to 0.540 against the 1976 aircraft's 0.556 - the upgrade
     came out worse than the thing it replaced. 0.68 resolves to 0.583. */
  "w_e80_pact_cfighter": {
    "name": "2 x R-60M IR and a GSh-23L pod", "dmg": 100, "warhead": "flak",
    "range": 5.8, "reload": 4.0, "burst": 1, "acc": 0.68, "proj": "missile",
    "speed": 700, "aoe": 0.8, "ammo": 1,
    "tgt": { "ground": 0, "air": 1, "sea": 0, "sub": 0 },
    "profile": "pop", "intercept": 0.55
  },

  /* ---- KIEV'S OWN BATTERY ----
     Follows w_e60_pact_carrier and w_e90_pact_carrier: the carrier's weapon
     row in this game is its self-defence, tgt.air only, and the air group is
     modelled by carrier:3 rather than by this. Four twin P-500 Bazalt
     launchers forward of the island with a reload magazine below, plus two
     SA-N-3 Goblet - the Kiev was a cruiser that happened to have a deck, and
     it spent the hangar volume to be one. */
  "w_e80_pact_carrier": {
    "name": "8 x P-500 Bazalt and SA-N-3 Goblet", "dmg": 118, "warhead": "he",
    "range": 9.8, "reload": 5.6, "burst": 1, "acc": 0.62, "proj": "missile",
    "speed": 520, "tgt": { "ground": 0, "air": 0, "sea": 1, "sub": 0 },
    "sfx": "missile", "profile": "pop", "intercept": 0.85
  },

  /* ---- THE HORMONE'S SONAR ----
     Same shape as w_e80_pact_aswhelo, weaker in every column. A Ka-25PL dips
     an OKA-2 sonar and carries ONE AT-1 torpedo or a pair of depth charges in
     a shallow internal bay - the airframe was sized to fit a cruiser's lift,
     and the weapons bay is what paid for it. */
  "w_e60_pact_aswhelo": {
    "name": "Dipping sonar and one AT-1 torpedo", "dmg": 96, "warhead": "he",
    "range": 2.6, "reload": 7.4, "burst": 5, "burstDelay": 0.2, "acc": 0.32,
    "proj": "arc", "speed": 12, "aoe": 1.2,
    "tgt": { "ground": 0, "air": 0, "sea": 0, "sub": 1 }, "sfx": "cannon"
  },

  /* ---- THE LAST SOVIET HEAVY GUN ----
     The same 122 mm as the T-10, but the M-62-T2S has a bore evacuator and a
     two-plane stabiliser, which is the difference between a gun that can only
     be fired from a halt and one that can be laid on the move. It is still
     two-piece ammunition into a 1950s breech: about three rounds a minute,
     and that number is the whole argument against the heavy tank. */
  "w_e60_pact_heavy": {
    "name": "122mm M-62-T2S stabilised gun", "dmg": 78, "warhead": "cannon",
    "range": 6.4, "reload": 6.2, "burst": 1, "acc": 0.62, "proj": "shell",
    "speed": 860, "aoe": 0.9, "suppress": 26,
    "tgt": { "ground": 1, "air": 0, "sea": 1, "sub": 0 }
  },
});

Object.assign(UNITS, {

  /* ============ TANK DESTROYERS, 1963 to the present ============
     atgmv_p is a 9P157-2 Khrizantema-S, which js/facts.js already dates to
     2005, so rules.js moves it to e00 where it belongs. These two rows are
     what the Soviet Army actually had in the meantime. The IT-1 "Drakon" of
     1968 - a T-62 hull with the gun deleted and a 3M7 launcher in its place -
     is the road not taken here: about 220 built, in service barely two years,
     and withdrawn because a tank destroyer that cannot also fight a tank with
     a gun turned out to be a bad trade. The BRDM carriers are what the army
     was issued in quantity, and they are what these rows are.

     Windows do not overlap. unitFor() picks by highest from-index and breaks a
     tie by ROLES index order, which is insertion order and not something to
     rely on, so every row here closes before the next one opens. */
  pact_e60_tankdestroyer: { fac:"pact", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"9P110 Malyutka", full:"9P110, six 9M14 Malyutka on a BRDM-1", cost:620, oil:8, time:12, hp:330, armor:"light", speed:2.30, turn:2.6, sight:7.0, r:13, mass:6, weapons:["w_e60_pact_tankdestroyer"], prereq:["factory","radar"], tech:2, turret:false, from:"e60", to:"e60", service:"1963", confidence:"high", desc:"A BRDM-1 scout car with the roof cut out and a six-rail launcher that rises through it, produced from 1963. The missile is flown to the target by hand on a joystick and takes most of half a minute to get there at 120 m/s, during which the operator cannot move, cannot take cover and cannot look at anything else - and inside 500 m the missile has not armed. That is the whole character of the first ATGM generation: enormous reach for 1963, and almost useless against anything that is already close. The 9P122 on a BRDM-2 followed in 1969 and the 9P133 in 1971." },
  pact_e80_tankdestroyer: { fac:"pact", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"9P149 Shturm-S", full:"9P149 Shturm-S on the MT-LB", cost:980, oil:12, time:15, hp:520, armor:"light", speed:1.90, turn:2.2, sight:8.0, r:13, mass:12, weapons:["w_e80_pact_tankdestroyer"], prereq:["factory","radar"], tech:2, turret:true, tturn:1.3, from:"e80", to:"e90", service:"1979", confidence:"high", desc:"In service 1979: an MT-LB carrying a single retractable pedestal launcher fed by an automatic loader with twelve 9M114 below deck. The missile is radio-commanded rather than wire-guided, which is what lets it fly supersonic and reach 5 km, and the launcher drops back under armour to reload. It cannot fire on the move. The window runs to e90 on purpose - the Russian Army of the 1990s bought no new tank destroyer at all, and the Shturm-S simply stayed in the inventory, which is where the Ataka-armed 9P149M found it." },

  /* ============ AERIAL REFUELLING, 1955 to the present ============
     tanker_p is an Il-78M and its from:"e80" is already right: the Il-78
     entered service in 1984. What was missing is that the Soviet Union had
     been refuelling in the air for thirty years by then. The Council of
     Ministers decree of 26 May 1954 ordered refuelling systems for the Tu-16
     and the M-4, the first air-to-air fuel transfer was made on 11 July 1955,
     and a 3MS-2 tanker regiment was still flying in 1994.

     Both rows are deliberately WORSE than a Western tanker of the same decade
     and not by a token amount. Soviet tanking was built to extend a strategic
     bomber force a few hundred kilometres, not to hold a fighter screen up all
     day, and the fleet was small. Read the refuelRate figures against
     gbr_e50_tanker's 12 and tanker_n's 16. */
  pact_e50_tanker: { fac:"pact", role:"tanker", cat:"aircraft", layer:"air", name:"Tu-16Z", full:"Tupolev Tu-16Z wing-to-wing tanker", cost:2400, oil:56, time:33, hp:560, armor:"air", speed:4.60, turn:0.9, sight:8.5, r:22, mass:0, weapons:[], prereq:["airbase","radar"], tech:2, jet:true, ammo:0, radius:90, tanker:240, refuelRate:9, rcs:4.2, gen:2, from:"e50", to:"e50", service:"1957", confidence:"medium", desc:"The first Soviet tanker, and the strangest refuelling method any air force has used: not a boom and not a drogue behind the tail but a hose streamed from the tanker's RIGHT wingtip, which the receiver caught with its LEFT one and drew into its own wing. Two large jets flying formation close enough to hand each other a cable. It worked, it was dangerous, and it would only ever refuel another Tu-16 or a MiG-19 - so the low tanker and refuelRate figures here are the aircraft, not a handicap. Probe-and-drogue Tu-16N followed for the Tu-22." },
  pact_e60_tanker: { fac:"pact", role:"tanker", cat:"aircraft", layer:"air", name:"3MS-2 Bison", full:"Myasishchev 3MS-2, M-4 converted to tanker", cost:2900, oil:66, time:37, hp:700, armor:"air", speed:4.30, turn:0.85, sight:8.5, r:23, mass:0, weapons:[], prereq:["airbase","radar"], tech:2, jet:true, ammo:0, radius:130, tanker:360, refuelRate:12, rcs:5.4, gen:2.5, from:"e60", to:"e60", service:"1958", confidence:"medium", desc:"A strategic bomber that could not reach America converted into the tanker that let the rest of the fleet try. The refuelling unit and an extra 3,600 litres go in the bomb bay and it streams a hose and drogue, transferring up to forty tonnes at 4,000 km from base. Long-Range Aviation flew these until 1994 - which means the Soviet heavy tanker force was, for thirty-six years, a bomber nobody wanted with a hose in its bomb bay." },

  /* ============ CARRIER FIGHTERS, 1976 to the present ============
     e50 is EMPTY and that is the correct answer. No Soviet ship ever operated
     a fixed-wing aircraft before the Kiev in 1976; the e60 row above it,
     Project 1123 Moskva, is a helicopter cruiser and its own desc says so.

     cfighter_p is a Su-33 and its from:"e90" is right - accepted into service
     in 1998, which js/facts.js records. These two rows are the Forger, and the
     Forger is the point: for twenty-two years Soviet naval fixed-wing aviation
     was a VTOL light attack aircraft with no radar that could barely lift a
     useful load off a hot deck, and the game should say so rather than put a
     Flanker on a 1976 deck. */
  pact_e60_cfighter: { fac:"pact", role:"cfighter", cat:"aircraft", layer:"air", name:"Yak-38 Forger", full:"Yakovlev Yak-38 (Yak-36M)", cost:820, oil:20, time:15, hp:300, armor:"air", speed:5.40, turn:1.7, sight:5.6, r:15, mass:0, weapons:["w_e60_pact_cfighter","w_e60_pact_cstrike"], prereq:["airbase"], tech:2, jet:true, ammo:2, gen:2.5, rcs:1.20, radarQ:0, radius:14, carrierCapable:true, from:"e60", to:"e60", service:"1976", confidence:"high", desc:"Accepted 11 August 1976 and at sea aboard Kiev the same year. Three engines, two of them lift jets that are dead weight in cruise, no radar, and a combat radius nearer a hundred kilometres than the Su-33's six hundred - on a hot day in the Indian Ocean a Forger came off the deck with fuel or with weapons and not with both. The automatic ejection system fired the seat for the pilot if the aircraft departed in the hover, which tells you how the type was regarded. A hundred and forty-three built." },
  pact_e80_cfighter: { fac:"pact", role:"cfighter", cat:"aircraft", layer:"air", name:"Yak-38M", full:"Yakovlev Yak-38M", cost:880, oil:21, time:15, hp:320, armor:"air", speed:5.60, turn:1.75, sight:5.8, r:15, mass:0, weapons:["w_e80_pact_cfighter","w_e80_pact_cstrike"], prereq:["airbase"], tech:2, jet:true, ammo:2, gen:2.8, rcs:1.20, radarQ:0, radius:16, carrierCapable:true, from:"e80", to:"e80", service:"1985", confidence:"high", desc:"State tests completed in 1985 and fifty built. New R-28V-300 and RD-38 engines recovered some of the payload the Forger lost to vertical takeoff, and the short rolling takeoff recovered more - but there is still no radar, so there is still no radar-guided missile, and in 1985 that is a fighter which cannot engage anything it has not seen with its own eyes. The Su-27K that would fix all of this first touched a deck in November 1989." },

  /* ============ THE 1980s DECK ============
     Measured: the pact carrier line ran Moskva (e60), nothing at all (e80),
     Kuznetsov (e90) - and the 1980s hole is the decade the Soviet Navy had
     FOUR of these in commission. Without it the two Forger rows above have
     nowhere to fly from in the period they were built for.

     Kiev 28 December 1975, Minsk 1978, Novorossiysk 1982, Baku 1987. The row
     is dated to Novorossiysk because 1982 is unambiguously e80 and because she
     commissioned with sixteen Yak-38M and eighteen Ka-27 aboard. */
  pact_e80_carrier: { fac:"pact", role:"carrier", cat:"naval", layer:"sea", name:"Project 1143 Kiev", full:"Project 1143 Krechyet (Novorossiysk)", cost:3400, oil:78, time:52, hp:3150, armor:"heavy", speed:1.42, turn:0.6, sight:9.4, r:30, mass:0, weapons:["w_e80_pact_carrier","sam_shtorm"], prereq:["navalyard","lab","airbase"], tech:3, carrier:3, sonar:3.2, radar:10.5, ciws:0.38, rcs:2.8, from:"e80", to:"e80", service:"1982", confidence:"high", desc:"A heavy aviation cruiser: an angled flight deck down the port side and a cruiser's missile battery on the forecastle, because Soviet doctrine would not spend forty thousand tonnes on aviation alone and the Montreux Convention would not let a ship called an aircraft carrier through the Turkish Straits. Both halves suffer for it - the Bazalt launchers eat the hangar, and the air group is a VTOL that cannot use the deck's length. Four built; all four were gone by 1993, two of them sold to China and one to India." },

  /* ============ SHIPBORNE ASW HELICOPTERS, 1968 to the present ============
     asw_helo_p is a Ka-27PL, which js/facts.js dates to 1981, and it was
     nonetheless dated from:"e60" - so a 1981 helicopter was flying in the
     1960s, AND it collided with pact_e80_aswhelo, the same aircraft, in e80.
     Measured before this change: unitFor("pact","aswhelo","e80") had two
     candidates at the same from-index and resolved on ROLES insertion order.
     rules.js now starts asw_helo_p at e90, where pact_e80_aswhelo's window
     closes, and this row is what the navy actually flew before either.

     No hover or carrierCapable field: reindexRoles() derives both from the
     aswhelo role, and its comment says that is the point. */
  pact_e60_aswhelo: { fac:"pact", role:"aswhelo", cat:"aircraft", layer:"air", name:"Ka-25PL Hormone-A", full:"Kamov Ka-25PL", cost:720, oil:16, time:12, hp:245, armor:"air", speed:2.75, turn:2.2, sight:4.8, r:11, mass:0, weapons:["w_e60_pact_aswhelo"], prereq:["airbase"], tech:2, ammo:1, sonar:3.6, radius:14, rcs:0.90, gen:2.5, from:"e60", to:"e60", service:"1968", confidence:"high", desc:"The helicopter the Moskva above was built to carry fourteen of, and the first Soviet shipborne ASW aircraft worth the name. Coaxial rotors so it needs no tail rotor and folds into a cruiser's lift; an OKA-2 dipping sonar, a search radar under the nose, and a bay deep enough for exactly one AT-1 torpedo. Endurance was short and the sonar had to be dipped, listened on and hauled up again for every sample, so localising a submarine took a pair of aircraft and a long time. Replaced by the Ka-27 from 1981." },

  /* ============ THE LAST SOVIET HEAVY TANK ============
     e80, e90 and e00 are EMPTY on purpose and this is the clearest
     realism-over-symmetry case in the whole pact roster. The Soviet Army did
     not replace the heavy tank; it abolished the category. Heavy tanks were
     out of front-line service by 1967, the T-64 and the T-72 made the
     distinction meaningless, and nothing stood in this slot again until the
     T-14 of the 2010s that hvy_p already is. The gap between pact_e50_heavy
     and hvy_p is not a hole in the data. It is sixty years of Soviet and
     Russian armour policy, and the only row missing from it is this one.

     THE NOTE THAT USED TO STAND HERE IS NOW CLOSED. It read: pact_e50_heavy
     carries aps:0.40 and pla_e50_heavy carries aps:0.42, which js/combat.js
     reads as a chance to defeat an incoming missile, so a T-10 of 1953 and an
     IS-2 of 1944 had an active protection system because the generator copied
     the field down from hvy_p and hvy_c. pla_e50_heavy was cleared at some
     point after that was written; pact_e50_heavy was not, and its 0.40 was
     still byte-identical to hvy_p's - the T-14 Armata's Afganit - which is
     what a copied field looks like. It is gone.

     The date settles it without a balance argument. Drozd, the first active
     protection system anywhere, went to sea on a handful of Naval Infantry
     T-55AD in 1983; Arena followed in the 1990s and Afganit in the 2010s. In
     1953 the category did not exist. A 122 mm heavy tank that shrugs off two
     missiles in five is not a heavy tank, and it was the only era row in all
     of eras.js carrying the field - the exception proving it was never meant.
     This row still does not take it, and now neither does its predecessor. */
  pact_e60_heavy: { fac:"pact", role:"heavy", cat:"vehicle", layer:"ground", name:"T-10M", full:"T-10M (Object 272) Heavy Tank", cost:1140, oil:18, time:25, hp:1420, armor:"heavy", speed:1.32, turn:1.4, sight:5.2, r:18, mass:50, weapons:["w_e60_pact_heavy"], prereq:["factory","lab"], tech:3, turret:true, tturn:1.35, crush:true, from:"e60", to:"e60", service:"1957", confidence:"high", desc:"Accepted 26 September 1957 and built at Kirov until 1966: a stabilised 122 mm, two 14.5 mm KPVT, infrared night sights and fifty tonnes of cast armour. It is a genuinely better tank than the T-10 beside it and it is also the end of the line - by the time the last one left the factory the category had no job left, because a T-62's smoothbore firing APFSDS did to armour what a heavy tank's gun did, from a hull half the weight that could keep up with the advance. Held in reserve until 1993 and never replaced." },
});

/* ================= PLA — THE CHAINS THAT WERE STANDING ON ONE ROW =================
   Five Chinese roles were being fought in six decades by a single machine, and
   in three of them that machine post-dates the eras it was covering. Measured
   with unitFor("pla", role, era) before this block was written:

     tankdestroyer  AFT-10 from e80. The HJ-10 fibre-optic missile it carries
       first appeared in public in 2014, so a 1985 battle was fought with a
       2014 weapon - and because DOMAIN_BITE in generations.js scales ordnance
       by the unit's `from`, that 2014 missile was also being handed 1980s
       ordnance quality. The date is a mechanical input, not a label.
     tanker         YY-20 from e00. The Y-20U entered service in 2021.
     missileboat    a hole at e80 and e90, between the Huangfeng of 1965 and
       the Houbei of 2004 - and e80 is the decade the PLAN had a hundred and
       twenty Huangfeng in commission.
     aswhelo        nothing at all before e00, in a navy that bought thirteen
       Super Frelons in 1977-78 and had the Z-8 in PLANAF service in 1989.
     recon          a hole at e80 alone, because the BJ212 / Type 62 row was
       closed at e60 while the WZ-551 recce vehicle that follows it is a
       1990s machine. Nothing new was procured; the jeeps stayed.

   WHAT STAYS EMPTY, and why the emptiness is the answer rather than a gap:

     tankdestroyer, e50 / e60 - the PLA had no vehicle-mounted anti-tank
       MISSILE of any kind until the HJ-73, a Malyutka copy adopted in 1979.
       Anti-tank work before that was the towed Type 56 85mm and Type 73
       100mm guns and the recoilless rifle, which are the `at` and `spg`
       roles in this game and not this one. Two empty eras.
     tanker, e50 / e60 / e80 - China could not refuel in the air at all. The
       H-6U first flew in 1990 and made its first successful transfer in 1993.
       Three empty eras, and they are the largest single fact about the reach
       of the PLAAF for its first forty years: every combat radius in the
       e50, e60 and e80 Chinese roster is the aircraft's own and nothing else.
     aswhelo, e50 / e60 - no anti-submarine helicopter, and until the Luda
       conversions of the late 1980s no flight deck to fly one from.
     heavybomber - built, but in heavyair.js beside the B-52, because the H-6
       tells the same story with the same airframe: what changed over sixty
       years is not how hard it hits but from how far away.

   WEAPONS. The ids follow the w_<era>_<fac>_<role> pattern, which means the
   era-range pass at the foot of generations.js REWRITES `range` on the three
   tankdestroyer rounds to AT_ERA_M for their era - 9.1 tiles at e80, 10.1 at
   e90 and at e00. The literals are written at those values so the file says
   what the game will actually do; the naval and ASW rounds are not in that
   pass and stand as written. Every id used below is authored here or already
   in rules.js. None is invented: entities.js dereferences w.tgt with no
   guard, so a dangling id throws on the first target evaluation.        */
Object.assign(WEAPONS, {
 /* HJ-73 is a 9M14 Malyutka copy and the accuracy figure is the point of the
    entry. It is MCLOS: the gunner flies the missile onto the target with a
    thumb stick for the whole thirty-second flight, and it cruises at about
    115 m/s, so a moving tank at long range is very nearly unhittable. The
    SACLOS HJ-73B that fixed this is a 1980s rebuild and is not this row. */
 "w_e80_pla_tankdestroyer": {"name":"HJ-73 MCLOS wire-guided missile","dmg":112,"warhead":"heat","range":9.1,"minRange":1.5,"reload":9.2,"burst":1,"acc":0.48,"proj":"missile","speed":180,"aoe":0.7,"suppress":14,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 /* The PTZ-89's gun is NOT stabilised, which is why a 120mm smoothbore that
    out-penetrates every Chinese tank gun of its decade carries a lower
    accuracy than the missiles either side of it: the vehicle has to stop to
    shoot. Being a gun round it is also the one entry in this role that
    cannot be shot down, so it has no intercept field. */
 "w_e90_pla_tankdestroyer": {"name":"120mm smoothbore, unstabilised","dmg":152,"warhead":"cannon","range":10.1,"reload":7.4,"burst":1,"acc":0.70,"proj":"shell","speed":860,"aoe":0.9,"suppress":26,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 /* HJ-9 rides a laser beam rather than a wire, so the launcher is free of the
    spool and the missile flies at roughly twice the Malyutka's speed. */
 "w_e00_pla_tankdestroyer": {"name":"HJ-9 laser beam-riding ATGM","dmg":150,"warhead":"heat","range":10.1,"minRange":1.4,"reload":7.2,"burst":1,"acc":0.80,"proj":"missile","speed":300,"aoe":0.8,"suppress":16,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1.15},
 /* Six C-801 in three twin box launchers. A solid-fuel sea-skimmer replacing
    the liquid-fuelled SY-1 of the e60 boat: half the reach on paper, but it
    flies at five metres instead of a hundred and fifty and it is the first
    Chinese anti-ship missile a ship's radar has real trouble seeing. */
 "w_e90_pla_missileboat": {"name":"6 x YJ-8 anti-ship missiles","dmg":228,"warhead":"he","range":15.2,"minRange":1.8,"reload":16.5,"burst":2,"burstDelay":0.8,"acc":0.72,"proj":"missile","speed":300,"aoe":1.6,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"sfx":"missile","profile":"loft","intercept":0.55},
 /* Depth charges, and that is not an economy: China had no air-dropped
    homing ASW torpedo until the Yu-7 of the mid-1990s, so a 1980s PLAN
    helicopter had to fly over the contact and drop on it. Short reach, poor
    accuracy, and a submarine that hears it coming has time to move. */
 "w_e80_pla_aswhelo": {"name":"Depth charges","dmg":150,"warhead":"he","range":2.6,"reload":8.4,"burst":2,"burstDelay":0.5,"acc":0.40,"proj":"arc","speed":60,"aoe":1.6,"tgt":{"ground":0,"air":0,"sea":0,"sub":1},"sfx":"cannon"},
});
Object.assign(UNITS, {
  /* ---- the anti-tank chain, 1979 to the present ----
     Four machines and four different answers to the same problem, which is
     why this is a chain rather than one row with a moved date. */
  pla_e80_tankdestroyer: {"fac":"pla","role":"tankdestroyer","cat":"vehicle","layer":"ground","name":"Type 63 (HJ-73)","full":"Type 63 / YW531 carrier with the HJ-73 launcher","cost":760,"oil":9,"time":13,"hp":505,"armor":"light","speed":1.58,"turn":2.0,"sight":6.2,"r":13,"mass":13,"weapons":["w_e80_pla_tankdestroyer"],"prereq":["factory"],"tech":1,"from":"e80","to":"e80","service":"1979","confidence":"medium","desc":"The PLA's first vehicle-mounted anti-tank missile: a Malyutka copy adopted in 1979 and bolted to the roof of the Type 63 carrier that was already in every mechanised regiment. The missile is the firm date here and the mounting is the common one; Chinese practice was to fit HJ-73 to whatever hull was to hand, and open sources are not consistent about which carrier got which. Manual command guidance means the gunner has to keep the target and the missile in the same eyepiece for half a minute, so it is a weapon for a prepared position rather than a moving fight.","turret":false},
  pla_e90_tankdestroyer: {"fac":"pla","role":"tankdestroyer","cat":"vehicle","layer":"ground","name":"PTZ-89","full":"PTZ-89 (Type 89) 120mm self-propelled anti-tank gun","cost":1120,"oil":14,"time":17,"hp":740,"armor":"light","speed":1.75,"turn":1.9,"sight":7.2,"r":15,"mass":31,"weapons":["w_e90_pla_tankdestroyer"],"prereq":["factory","radar"],"tech":2,"from":"e90","to":"e90","service":"1989","confidence":"high","desc":"Designed by Factory 447 in the early 1980s, in service from 1989, about a hundred built to 1995 and formally retired on 3 November 2015. It exists because the PLA spent the 1970s and 1980s unable to kill a modern Soviet tank with a tank: the answer was to put a 120mm smoothbore that out-penetrated every Chinese tank gun of the decade on a light tracked hull and accept that the hull could be opened by autocannon. The gun is not stabilised, so it stops to shoot.","turret":true,"tturn":1.2},
  pla_e00_tankdestroyer: {"fac":"pla","role":"tankdestroyer","cat":"vehicle","layer":"ground","name":"AFT-9","full":"AFT-9 (HJ-9 Red Arrow 9) missile carrier on the WZ-550","cost":1040,"oil":12,"time":15,"hp":610,"armor":"light","speed":2.2,"turn":2.4,"sight":8.2,"r":13,"mass":11,"weapons":["w_e00_pla_tankdestroyer"],"prereq":["factory","radar"],"tech":2,"from":"e00","to":"e00","service":"1999","confidence":"high","desc":"A retractable four-round launcher on a WZ-550 wheeled hull, first deployed in the late 1990s and shown publicly in 1999. Laser beam-riding rather than wire-guided, so the missile is twice as fast as the HJ-73 and the vehicle can reverse off the crest the moment the round hits. This is the vehicle the AFT-10 replaced, not the vehicle the AFT-10 was.","turret":true,"tturn":1.3},

  /* ---- the tanker that made the PLAAF a long-range air force ----
     One row for one aircraft, and three empty eras in front of it. */
  pla_e90_tanker: {"fac":"pla","role":"tanker","cat":"aircraft","layer":"air","name":"H-6U","full":"Xian H-6U / HY-6 probe-and-drogue tanker","cost":2400,"oil":55,"time":32,"hp":700,"armor":"air","speed":4.4,"turn":0.85,"sight":8.0,"r":22,"mass":0,"weapons":[],"prereq":["airbase","radar"],"tech":2,"from":"e90","to":"e00","service":"1997","confidence":"medium","desc":"A bomber with the bomb bay full of fuel and a hose pod under each wing. First flight 1990, first successful transfer 1993, and a pair flew over Tiananmen escorted by four J-8D on 1 October 1999. Around twenty exist. It is small - a Tu-16 gives away perhaps a third of what a Y-20U carries - and it is probe-and-drogue only, so it can refuel a J-8D or a J-10 and nothing else in the inventory. Before it, no Chinese aircraft had ever taken fuel in the air.","jet":true,"ammo":0,"radius":100,"tanker":260,"refuelRate":11,"rcs":5.0,"gen":2.5},

  /* ---- the missile boats: a hull that stayed, then a hull that replaced it ----
     The e60 Huangfeng row is extended to e80 rather than duplicated, because
     nothing new arrived: by 1985 the PLAN had a hundred and twenty of them. */
  pla_e90_missileboat: {"fac":"pla","role":"missileboat","cat":"naval","layer":"sea","name":"Type 037-II Houjian","full":"Type 037-II Houjian-class missile boat","cost":1180,"oil":17,"time":17,"hp":780,"armor":"light","speed":2.72,"turn":1.75,"sight":6.8,"r":16,"mass":0,"weapons":["w_e90_pla_missileboat"],"prereq":["navalyard","radar"],"tech":2,"from":"e90","to":"e90","service":"1991","confidence":"high","desc":"Six boats delivered from 1991, all of them to the Hong Kong squadron. Twice the displacement of a Huangfeng and slower for it, but it carries six C-801 sea-skimmers instead of four SY-1 - a solid-fuel missile that flies at five metres against a liquid-fuelled one that flies at a hundred and fifty, which is the difference between a contact a ship can engage and one it finds out about when it hits.","sonar":0,"rcs":0.58},

  /* ---- anti-submarine helicopters: French airframe, Chinese weapon ----
     e50 and e60 stay empty. The PLAN had no ASW helicopter and no deck. */
  pla_e80_aswhelo: {"fac":"pla","role":"aswhelo","cat":"aircraft","layer":"air","name":"SA 321Ja Super Frelon","full":"Aerospatiale SA 321Ja Super Frelon, PLA Navy","cost":960,"oil":20,"time":14,"hp":330,"armor":"air","speed":2.7,"turn":1.9,"sight":6.0,"r":12,"mass":0,"weapons":["w_e80_pla_aswhelo"],"prereq":["airbase"],"tech":2,"from":"e80","to":"e80","service":"1977","confidence":"medium","desc":"Thirteen aircraft bought from France in 1977-78, and for a decade the whole of Chinese anti-submarine aviation. It has the airframe for the job - three engines, a boat hull, hours on task - and almost none of the equipment: a search radar, no dipping sonar worth the name, and depth charges rather than a homing torpedo, because China had no air-dropped ASW torpedo until the 1990s. It also had nowhere to land at sea until the Luda conversions of the late 1980s.","ammo":2,"radius":22,"sonar":4.4,"rcs":1.05,"radarQ":4,"gen":2.5},
  pla_e90_aswhelo: {"fac":"pla","role":"aswhelo","cat":"aircraft","layer":"air","name":"Z-8","full":"Changhe Z-8, licence-built Super Frelon","cost":1080,"oil":21,"time":14,"hp":345,"armor":"air","speed":2.8,"turn":2.0,"sight":6.4,"r":12,"mass":0,"weapons":["asw_yu7"],"prereq":["airbase"],"tech":2,"from":"e90","to":"e90","service":"1989","confidence":"high","desc":"The same aircraft built in China: first flight 11 December 1985, PLANAF service in August 1989, formally certified on 12 November 1994, and only fifteen to twenty made because the gearbox and the rotor head were harder to copy than the shape. What it adds over the imported Frelon is the Yu-7, a licensed Mk 46 pattern and the first homing torpedo a Chinese aircraft could drop.","ammo":2,"radius":22,"sonar":5.6,"rcs":1.0,"radarQ":5,"gen":3},
});

/* ==================================================================
   THREE ERA CHAINS THAT WERE STANDING ON ONE MACHINE
   Germany, North Korea and Taiwan, authored here for the same reason the
   submarine block above is here: the rows have to exist before
   reindexRoles() runs or unitFor() can never see them, and every weapon id
   below is either authored in this block or already live in rules.js /
   eras.js. Nothing here invents an id and nothing here invents a machine.

   Why it matters mechanically and not only cosmetically: DOMAIN_BITE in
   js/generations.js scales every weapon a unit carries by the unit's own
   `from` era (0.00 in e50 through 1.00 in e20), and G.genContest in
   js/game.js reads `from` when a radar meets a jammer. A back-dated row is
   therefore fighting with the wrong decade's ordnance, and a back-dated
   sensor is contested as if it were that old.
   ================================================================== */
Object.assign(WEAPONS, {
 /* 40 mm Bofors L/70, the single mount a German coastal minesweeper carried.
    It is self-defence against aircraft and nothing else - these hulls exist
    to sweep, and the sweep is the mineClear field, not this gun. */
 "w_e80_deu_minesweeper": {"name":"40 mm Bofors L/70","dmg":22,"warhead":"he","range":6.2,"reload":1.7,"burst":4,"burstDelay":0.2,"acc":0.58,"proj":"shell","speed":700,"aoe":0.5,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"sfx":"shot"},
 /* SU-100: the 100 mm D-10S in a fixed casemate. Same barrel as the D-10T of
    the T-55 above, one generation earlier and with no turret to traverse, so
    it hits as hard and lays far more slowly. */
 "w_e50_kpa_tankdestroyer": {"name":"100 mm D-10S in a fixed casemate","dmg":88,"warhead":"cannon","range":6.5,"reload":7.2,"burst":1,"acc":0.58,"proj":"shell","speed":860,"aoe":0.9,"suppress":24,"tgt":{"ground":1,"air":0,"sea":1,"sub":0}},
 /* Susong-po, the North Korean 9M14 Malyutka. MCLOS: the gunner flies the
    missile onto the target with a thumb stick for the whole 20-odd seconds of
    flight, which is why the accuracy is the worst of any anti-tank missile in
    this game and why the Bulsae-2 that replaced it was worth having. */
 "w_e60_kpa_tankdestroyer": {"name":"Susong-po (9M14 Malyutka), MCLOS","dmg":78,"warhead":"heat","range":8.0,"minRange":1.4,"reload":7.6,"burst":1,"acc":0.50,"proj":"missile","speed":260,"aoe":0.8,"suppress":16,"tgt":{"ground":1,"air":0,"sea":1,"sub":0},"profile":"pop","intercept":1},
 /* Mk 44 and early Mk 46 off a 500MD's stub pylons - one torpedo, sometimes
    two, and a towed magnetic anomaly detector to find something to drop it
    on. Speed is written at its final value: the sweep at the foot of this
    file multiplies any torpedo under 60 by twenty, and 180 is already there. */
 "w_e80_roc_aswhelo": {"name":"Mk 44 / Mk 46 lightweight torpedo","dmg":168,"warhead":"he","range":5.4,"reload":8.4,"burst":1,"acc":0.74,"proj":"torpedo","speed":180,"aoe":0.8,"tgt":{"ground":0,"air":0,"sea":0,"sub":1},"sfx":"missile"},
});

Object.assign(UNITS, {

  /* ============ BUNDESWEHR ARTILLERY RADAR, 1968 to 2004 ============
     radarv_g said COBRA was "the first counter-battery radar Germany ever
     had - the Bundeswehr fought the whole Cold War without one", and that is
     simply not what happened. Three machines came before it, and the honest
     part of the story is that none of them did COBRA's job: Green Archer
     watches a mortar bomb arc over and works back, RATAC watches things move
     on the ground. A radar that back-plots a gun shell to its battery is
     genuinely new in 2004 - the Cold War claim is not.

     e50 is left EMPTY on purpose. The Bundeswehr was founded on 12 November
     1955 and Green Archer was procured in 1968; there was nothing in between. */
  deu_e60_radarv: { fac:"deu", role:"radarv", cat:"vehicle", layer:"ground", name:"Green Archer", full:"M113 A1 G Green Archer (FA No. 8 Mk 2)", cost:620, oil:7, time:11, hp:430, armor:"light", speed:1.60, turn:1.8, sight:6.0, r:13, mass:12, weapons:[], prereq:["factory","radar"], tech:2, from:"e60", to:"e60", service:"1968", confidence:"high", radar:9.5, radarQ:8, turret:true, tturn:0.9, desc:"A British EMI mortar-locating radar on a rebuilt M113 - the exhaust was re-routed so it would not sit in the beam. Procured in 1968 for the divisional observation battalions and not retired until the 1990s. It watches a bomb come over the top of its arc and works backwards to the tube, which is why it is good against mortars and poor against a flat-trajectory gun, and why the Bundeswehr still had no answer to a Soviet artillery group.", },
  deu_e80_radarv: { fac:"deu", role:"radarv", cat:"vehicle", layer:"ground", name:"ABRA / RATAC", full:"M113 ABRA, Artillerie-Beobachtungsradar RATAC", cost:820, oil:8, time:13, hp:450, armor:"light", speed:1.60, turn:1.8, sight:7.2, r:13, mass:13, weapons:[], prereq:["factory","radar"], tech:2, from:"e80", to:"e80", service:"1976", confidence:"high", radar:12, radarQ:12, turret:true, tturn:0.9, desc:"Sixty-two M113 hulls fitted between 1976 and 1978 with RATAC, a Franco-German battlefield radar on a six-metre telescopic mast. Be clear about what it is: it finds and tracks things that MOVE - vehicles, troops, a river crossing - and walks the divisional artillery onto them. It does not locate a firing battery. Germany's artillery in this decade sees the enemy coming and still cannot see who is shelling it.", },
  deu_e90_radarv: { fac:"deu", role:"radarv", cat:"vehicle", layer:"ground", name:"RATAC-S", full:"M113 ABRA with RATAC-S", cost:980, oil:9, time:15, hp:470, armor:"light", speed:1.60, turn:1.75, sight:8.0, r:13, mass:13, weapons:[], prereq:["factory","radar"], tech:2, from:"e90", to:"e90", service:"1990s", confidence:"medium", radar:14, radarQ:16, turret:true, tturn:0.9, desc:"Thirty-five new vehicles from the 1990s with a solid-state RATAC-S: further reach, better resolution and into action in a fraction of the time, which on a battlefield where the counter-battery clock is running is most of the value. Still a surveillance radar rather than a shell tracker. ABRA stayed in service until it was finally replaced in 2022-24, nearly fifty years after the first one.", },

  /* ============ GERMAN MINE WARFARE, 1957 to 1993 ============
     minesweeper_g's own text says "the one branch of naval warfare where
     Germany genuinely leads, and it has for fifty years" and then dates the
     first hull to the 1990s, and cites the Troika of 1981 as a fact about a
     ship the roster did not contain. Fifty years of leadership needs the
     fifty years in it. Only the 1980s row is authored here, and the
     1950s and 1960s bands are deliberately NOT filled: rules.js holds a
     faction-agnostic `minesweeper` at from:"e50" that every navy can build,
     so a Lindau row dated e50 would tie with it on eraIndex 0 and lose the
     tie on insertion order - dead data nobody could ever build. The Lindau is
     in this row regardless, because the Type 351 IS six converted Lindau
     hulls. */
  deu_e80_minesweeper: { fac:"deu", role:"minesweeper", cat:"naval", layer:"sea", name:"Troika (Type 351)", full:"Type 351 Ulm-class Troika control ship and Seehund drones", cost:1120, oil:13, time:17, hp:600, armor:"light", speed:2.1, turn:1.6, sight:7.2, r:15, mass:0, weapons:["w_e80_deu_minesweeper"], prereq:["navalyard"], tech:1, from:"e80", to:"e80", service:"1979", confidence:"high", mineDetect:4.0, mineClear:3.0, mineClearRate:1.9, sonar:1.6, desc:"Six Lindau hulls converted from 1979 into control ships, each steering three unmanned Seehund drones by radio ahead of itself. The drones carry the magnetic and acoustic gear and take the explosion; the crew stays in clear water astern. It is the first operational unmanned minesweeping anywhere in the world, it is German, and it is 1979 - a good twenty-five years before unmanned surface vessels became a thing anyone talked about. The clearance rate is the drones', not the ship's.", },

  /* ============ KPA ANTI-ARMOUR VEHICLES, 1954 to 2018 ============
     atgmv_k was the Bulsae-4, an eight-tube fibre-optic launcher first
     paraded in 2018, carrying from:"e80". Rebased to e20 in rules.js; these
     two rows are what the KPA actually had before it, and they are both
     Soviet designs because that is the honest answer for this army. There is
     no Bulsae-2 or Bulsae-3 CARRIER row: both are shoulder and tripod weapons
     in this roster already (kpa_e80_at, kpa_e00_at), the vehicle mountings
     are thinly sourced, and inventing one to fill e00 is exactly the mistake
     the Bulsae-4's old date was. The BRDM-2 simply stays in service, which is
     what an army with no money does. */
  kpa_e50_tankdestroyer: { fac:"kpa", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"SU-100", full:"SU-100 tank destroyer", cost:480, oil:7, time:11, hp:520, armor:"light", speed:1.30, turn:1.5, sight:3.9, r:15, mass:32, weapons:["w_e50_kpa_tankdestroyer"], prereq:["factory"], tech:1, from:"e50", to:"e50", service:"1954", confidence:"medium", turret:true, tturn:0.8, desc:"A 100 mm gun in a fixed casemate on a T-34 hull, delivered with the post-war Soviet rearmament after the KPA armoured force had been destroyed. No turret: the whole vehicle turns to lay the gun, so it fights from an ambush position and nowhere else. Still in North Korean hands seventy years later, playing the enemy in exercise footage, which says as much about this army as any figure in the table.", },
  kpa_e60_tankdestroyer: { fac:"kpa", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"Susong-po BRDM-2", full:"9P133 BRDM-2 with Susong-po (9M14 Malyutka)", cost:560, oil:8, time:10, hp:430, armor:"light", speed:2.05, turn:2.3, sight:5.2, r:13, mass:7, weapons:["w_e60_kpa_tankdestroyer"], prereq:["factory"], tech:1, from:"e60", to:"e00", service:"1970s", confidence:"low", turret:true, tturn:1.3, desc:"Six Malyutka rails that rise out of the roof of an amphibious scout car, built in North Korea as the Susong-po. The missile is flown by hand for its whole flight, so a moving target at long range is close to unhittable and the crew has to sit still and exposed while it flies. It spans four eras here not because anything improved but because nothing replaced it: the KPA's next purpose-built missile carrier is the Bulsae-4 of 2018. Numbers are an outside estimate and the introduction date is not documented.", },

  /* ============ ROC ANTI-ARMOUR VEHICLES, 1952 to the present ============
     atgmv_r was a "CM-32 TOW" dated e80. No such vehicle exists - the Yunpao
     family is CM-32 / CM-33 / CM-34 and none of them is a TOW carrier - and
     the CM-32 itself is a 2000s design, so the row was an invented machine on
     an impossible date. rules.js now holds the real present-day carrier, the
     M1167 HMMWV with ITAS, at e20. These three rows are the sixty years
     before it, and every one of them is a real vehicle in ROC service. */
  roc_e50_tankdestroyer: { fac:"roc", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"M18 Hellcat", full:"M18 GMC Hellcat tank destroyer", cost:430, oil:5, time:10, hp:330, armor:"light", speed:2.35, turn:2.6, sight:4.6, r:14, mass:18, weapons:["w_e50_roc_mbt"], prereq:["factory"], tech:1, from:"e50", to:"e60", service:"1952", confidence:"high", turret:true, tturn:1.9, desc:"Two hundred and forty-three arrived in the first US military aid batch in 1952 and became the backbone of the armoured force. It is the fastest tracked fighting vehicle of its generation and it is open-topped with armour a rifle round can trouble - the doctrine is to arrive somewhere before the enemy expects it, shoot, and be gone. Withdrawn through the 1970s; survivors were dug in on the offshore islands as fixed coastal guns, which is where several still sit.", },
  roc_e80_tankdestroyer: { fac:"roc", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"M113A1 TOW", full:"M113A1 with BGM-71 TOW launcher", cost:820, oil:9, time:13, hp:520, armor:"light", speed:1.85, turn:2.2, sight:7.2, r:13, mass:12, weapons:["w_e80_roc_at"], prereq:["factory","radar"], tech:2, from:"e80", to:"e80", service:"1980s", confidence:"medium", turret:true, tturn:1.4, desc:"A TOW launcher bolted through the roof hatch of an M113 - the ROC Army's anti-armour carrier and still in service today. Wire-guided and manually tracked: the gunner has to hold the crosshair on the target for the whole flight, standing up in an open hatch, which on an open beach is a short career. The Marine Corps fielded the same missile properly enclosed on the CM-25, an amphibious CM-21 with buoyancy foam in the spaced armour.", },
  roc_e90_tankdestroyer: { fac:"roc", role:"tankdestroyer", cat:"vehicle", layer:"ground", name:"CM-25 TOW", full:"CM-25 (CM-21 hull) with BGM-71E TOW-2A", cost:1020, oil:11, time:15, hp:580, armor:"light", speed:1.90, turn:2.2, sight:8.4, r:13, mass:14, weapons:["w_e90_roc_at"], prereq:["factory","radar"], tech:2, from:"e90", to:"e00", service:"1990s", confidence:"medium", turret:true, tturn:1.4, desc:"The Marine Corps vehicle, a CM-21 hull with the spaced armour filled with polystyrene so it will swim ashore, carrying TOW-2A with a tandem warhead that defeats the reactive armour the PLA started bolting to its tanks in this decade. Twenty years of ROC anti-armour is one missile getting a better warhead on the same wire, which is the whole procurement story of an island buying from one supplier.", },

  /* ============ ROC ANTI-SUBMARINE HELICOPTERS, 1980 to the present ============
     asw_helo_r is the S-70C(M) Thunderhawk, ordered in 1983 and delivered
     around 1990, and it carried from:"e80". It is rebased to e90 in rules.js.
     This row is what actually flew the ASW mission in the 1980s, and it is a
     genuinely different machine - a two-tonne light helicopter with a towed
     magnetic detector and no dipping sonar at all, hunting from the deck of a
     1940s destroyer. */
  roc_e80_aswhelo: { fac:"roc", role:"aswhelo", cat:"aircraft", layer:"air", name:"500MD/ASW Defender", full:"Hughes 500MD/ASW Defender", cost:640, oil:11, time:10, hp:205, armor:"air", speed:3.05, turn:2.8, sight:5.6, r:12, mass:0, weapons:["w_e80_roc_aswhelo"], prereq:["airbase"], tech:2, from:"e80", to:"e80", service:"1980", confidence:"high", ammo:1, radius:12, sonar:3.4, rcs:0.5, radarQ:4, gen:3, desc:"Twelve ordered in 1977, landed in Taiwan on 4 March 1980 and worked up to operational by the end of 1983, flying off Gearing and Sumner-class destroyers that were already forty years old. A Bendix RDR-1300 in an offset nose radome, a towed ASQ-81 magnetic anomaly detector and one Mk 44 or Mk 46 under the belly. No dipping sonar and no sonobuoys: it is a weapon carrier that has to be told where to look, so the ship is still doing the hunting. Five were lost in accidents. The survivors were pushed aside into a light squadron in 1991 when the Thunderhawks arrived.", },
});


/* The era rosters are merged after rules.js has already indexed the roster,
   so the index has to be rebuilt or none of these units can be found. Every
   era unit is also tagged so nothing here leaks into a present-day battle. */
if (typeof reindexRoles === "function") reindexRoles();

/* ---- torpedo run speed ----
   All twenty-five era tubes were generated from the per-nation table in
   rules.js while that table was still authored in tiles/sec, so they came out
   at 6-9 where combat.js advances a round in pixels per second: a quarter of
   a tile a second, and no era submarine ever landed one. Twenty pixels per
   tile-second reproduces the corrected present-day figures (6 -> 120,
   9 -> 180). This lives here rather than in rules.js because rules.js loads
   first, and its own repair sweep only ever looked at missiles. Fold the
   factor into the generator when this file is next regenerated. */
for (var _tw in WEAPONS) {
  var _tz = WEAPONS[_tw];
  if (_tz.proj === "torpedo" && _tz.speed < 60) _tz.speed = Math.round(_tz.speed * 20);
}

/* ---- which lobbed rounds are rockets ----
   Everything indirect in this game is proj:"arc" - a mortar bomb, a 155mm
   shell and a 227mm rocket all fly the same lobbed path - so nothing could
   tell a rocket from a gun round, and an air defence system had no way to
   engage the one kind of indirect fire it really can stop. A C-RAM or an Iron
   Dome battery engages rockets; nobody shoots down a 155mm shell.

   The distinction is drawn from the unit that fires it rather than from a
   hand-written list, so era rosters and any future roster are covered
   automatically: a weapon belonging to a rocket-artillery unit is a rocket.
   Run here because eras.js is merged after rules.js has finished indexing. */
(function () {
  var ROCKET_ROLES = { mlrs: 1 };
  for (var _u in UNITS) {
    var _ud = UNITS[_u];
    if (!ROCKET_ROLES[_ud.role]) continue;
    var ws = _ud.weapons || [];
    for (var _i = 0; _i < ws.length; _i++) {
      var _w = WEAPONS[ws[_i]];
      if (_w && _w.proj === "arc") _w.rocket = true;
    }
  }
  /* the two hand-written rocket mortars that are not on an mlrs unit */
  if (WEAPONS.mrl240) WEAPONS.mrl240.rocket = true;
  if (WEAPONS.asw_rbu) WEAPONS.asw_rbu.rocket = true;
})();

/* ---- an anti-radiation missile has to outrange the battery it hunts ----
   Measured before this pass, every ARM in the game was outranged by the worst
   SAM of its own decade: Shrike 8.6 against SP-HAWK 10.6, HARM 9.6 against
   Patriot PAC-2 12.5, HARM 10.5 against the 14.0 of a Patriot site. A Wild
   Weasel therefore had to fly INSIDE the envelope to take its shot, which is
   the exact opposite of what the weapon is for, and the measured result was a
   dead Growler at 6.7 tiles.

   The floor is applied from e80 and NOT before, because the history is the
   point. The AGM-45 Shrike of 1965 reached about 40 km against an SA-2 that
   reached 45; Wild Weasel crews really did have to go in under the missile and
   really did take the losses. The AGM-88 HARM of 1985 reaches about 150 km,
   comfortably past the tactical SAMs of its day, and the AARGM-ER of the 2010s
   about 300. So the 1960s remain a knife fight and the modern era is a standoff
   duel, which is what actually happened.

   Applied as a FLOOR rather than an assignment so an already-longer round is
   left alone, and only to rounds that do damage - a jamming pod keeps its own
   reach. */
(function () {
  var ARM_FLOOR = { e80: 14.5, e90: 14.5, e00: 15.5, e20: 16.0 };
  var seen = {};
  for (var _au in UNITS) {
    var _u = UNITS[_au];
    if (!_u || (_u.role !== "sead" && _u.role !== "ewair")) continue;
    var floor = ARM_FLOOR[_u.from || "e20"];
    if (!floor) continue;                       /* e50/e60 stay outranged */
    var ws = _u.weapons || [];
    for (var _i = 0; _i < ws.length; _i++) {
      var _w = WEAPONS[ws[_i]];
      if (!_w || !_w.antiRadiation || !(_w.dmg > 0)) continue;
      if (_w.range < floor) { _w.range = floor; seen[ws[_i]] = floor; }
    }
  }
  /* the three hand-written present-day rounds, which no era unit carries */
  if (WEAPONS.harm   && WEAPONS.harm.range   < 16.0) WEAPONS.harm.range   = 16.0;
  if (WEAPONS.arm_yj && WEAPONS.arm_yj.range < 15.8) WEAPONS.arm_yj.range = 15.8;
  if (WEAPONS.arm_kh && WEAPONS.arm_kh.range < 15.6) WEAPONS.arm_kh.range = 15.6;
})();


/* ==================================================================
   THE SET EACH MARK ACTUALLY CARRIED
   (owner) "it is worth to have the version stat for the unit with long
   history like B52, H6, and E2"

   heavyair.js already does this for the bomber: four B-52s and four H-6s
   with four different weapon fits, because what changed across sixty years
   of one airframe is the thing bolted to it. The E-2 had the per-mark NAMES
   and none of the per-mark NUMBERS, and neither did the rest of the
   generated roster - 200 era rows carried a `radar` coverage radius and no
   `radarQ` at all. 177 of them are named below, together with four Soviet
   Weasels that carry no `radar` either and so had no figure of any kind; the
   other 23 are one role that is held out on purpose and said so further
   down. 181 radarQ figures and 42 radarGen figures in all.

   THE TWO FIELDS ARE NOT THE SAME THING and the difference is the whole
   reason this table exists:
     radar  - the fog-of-war coverage radius, in tiles. What this platform
              reveals of the map, and how loudly it announces itself to an
              ESM receiver (game.js esmPlot, ai.js esmSweep).
     radarQ - how far this set holds an AIR TRACK on an rcs 1.0 target, in
              tiles. G.radarReach is radarQ * rcs^0.25 and G.airTrack is the
              only thing that lets a shooter fire at an aeroplane.
   AND radarQ IS READ IN A THIRD PLACE, which is not visible from the field
   name and is the largest thing this table moves that nobody asked for.
   sonarnet.js:291 takes radarQ as the ESM RECEIVER's quality -
   `esm = radarQ ? min(9, 0.45 * radarQ) : 0` - which is how far a hull or an
   aeroplane reads the radio downlink of an enemy sonar barrier node. There is
   no `radar * 1.6` fallback there, so before this table NO era warship could
   find a barrier at all - 0 of 136 sea rows had a non-zero ESM radius, and 89
   do now, 16 of them at the nine-tile ceiling. Across sea and air together it
   is 56 rows before and 226 after.
   Historical anti-submarine and barrier play changes accordingly, and check 7
   of [55] pins one hull's radius so the coupling cannot drift unnoticed.

   With radarQ absent, game.js:255 falls back to `radar * 1.6`. That fallback
   is not a radar; it is a coverage radius multiplied by a constant, and on a
   generated per-era ramp it produced nonsense. Measured on HEAD, before this
   table: the E-2A Hawkeye of 1964 held a track at 23.8 * 1.6 = 38.1 tiles
   against the E-2D Advanced Hawkeye's 33, and the E-3G Sentry era row at
   52.8 against the identical present-day aeroplane's 40. Eight era AEW
   aircraft out-detected every present-day AEW aircraft in the game.

   EVERY FIGURE BELOW IS THE NAMED SET, calibrated against the present-day
   rows in rules.js, which stay the anchor: E-3G APY-2 = 40, KJ-500 = 41,
   E-7 Wedgetail MESA = 42, A-50U Shmel-M = 27, E-2D APY-9 = 33, Crowsnest
   Searchwater 2000 = 18; DDG-51 SPY-1D = 34, Ticonderoga SPY-1B = 40,
   Type 055 Type 346B = 41, Slava MR-800 = 21, Ford = 20, Kuznetsov = 14.

   radarGen is the honest date of the EQUIPMENT where it is a different
   decade from the airframe, and game.js genContest uses it instead of the
   platform's own era in the jamming contest - the pattern rules.js already
   sets on cawacs_b Crowsnest and cawacs_f. A Shackleton AEW.2 of 1972 with
   an APS-20 lifted out of a scrapped Gannet is the clearest case in the
   game: 1972 aeroplane, 1945 radar, and it is jammed like a 1945 radar.

   TWO ROLES ARE DELIBERATELY ABSENT and are not oversights:
     spaag  - 23 era rows, and every present-day spaag row in rules.js has
              no radarQ either. That role is on the fallback by the roster's
              own choice; giving the historical half a researched number
              while the modern half keeps radar * 1.6 would make the scale
              WORSE, not better. It is one decision for one role and it
              belongs with the modern rows, not here.
     buildings and the era heavy bombers - already carry their own.

   WHERE A NUMBER IS ZERO IT MEANS ZERO. The F-117A carried no radar of any
   kind - that was the point of it - and the E-8C's AN/APY-7 has no air-search
   mode at all. A zero costs the unit its organic air picture and leaves it on
   the datalink, which is exactly right. Where a force had NO such equipment
   the roster does better than a zero: the row is named NONE and rules.js
   deletes it outright, so nothing here needs a figure for it.             */
var ERA_RADAR_SETS = {

  /* ---- AIRBORNE EARLY WARNING: the owner's own example ----
     The E-2 line, mark by mark, is already written out across the cawacs
     rows above (E-1B APS-82 = 4, E-2B APS-96 = 8, E-2C APS-125 = 13,
     Group II APS-145 = 18, Hawkeye 2000 = 24, E-2D APY-9 = 33 in rules.js).
     What was missing is the SAME aircraft standing in the land-based awacs
     role, plus every rotodome that is not a Hawkeye. */
  nato_e50_awacs:  { radarQ: 7 },   /* EC-121D: AN/APS-20 in the belly, AN/APS-45 height-finder on top. A 1945 set in a Constellation: no overland look-down at all, and its whole value is that it is high. */
  nato_e60_awacs:  { radarQ: 7 },   /* E-2A: AN/APS-96, the first rotodome, and the SAME aerial the E-2B carries at 8 in the cawacs row beside it - what the B rebuild replaced was the Litton L-304 computer and the track-handling behind the antenna, not the antenna. 7 rather than 8 for that, and not lower: a UHF rotodome finds a fighter several times further out than the APQ-100 in the F-4C below, and although this scale compresses the whole 1960s into 4 to 8, the order has to be the right way round or the aeroplane the owner asked about is worse than the fighter it exists to cue. */
  nato_e80_awacs:  { radarQ: 38 },  /* E-3B/C: AN/APY-1, APY-2 with the maritime scan from the B. The antenna that is still flying. */
  nato_e90_awacs:  { radarQ: 0 },   /* E-8C JSTARS: AN/APY-7 is a side-looking SAR and ground-moving-target radar with NO air-to-air mode. It cannot hold an air track and this says so. Its 31.3 tiles of `radar` coverage are kept and are correct - JSTARS gives you the ground picture and no air picture at all.
                                       KNOW WHAT THE ZERO COSTS, because it is a roster shape and not a number. The aeroplane in NATO's 1990s "airborne early warning" slot is a ground-surveillance aircraft, so in that band NATO's air picture comes from nato_e90_cawacs, the E-2C Group II at 18 - which a human builds from prereq ["airbase","radar"], no carrier and no lab. An AI commander does not: ai.js's AEW gate counts `fielded("aircraft", d => d.awacs) < 1`, generations.js stamps awacs:true on every awacs and cawacs row, and ai.js has no "cawacs" string anywhere - so the commander buys one E-8C, the gate closes, and it flies the 1990s with no airborne air picture of its own. It still holds tracks at 26 tiles off its own radar dome. The honest repair is to run the E-3B/C row to e90 and give JSTARS a ground-surveillance role of its own; that is a roster restructure, not a sensor figure, so the zero stands and check 5 of [55] names this one step as the only place an early-warning slot is allowed to go backwards. */
  nato_e00_awacs:  { radarQ: 40, radarGen: "e90" },  /* E-3G Block 40/45: the same 1977 APY-2, so the same 40 as the present-day awacs_n - identical aeroplane, identical number. radarGen e90 and not e80 because the Radar System Improvement Program re-did the pulse compression and the ECCM from 1999; Block 40/45 itself replaced the mission computers, not the aerial. */
  pact_e60_awacs:  { radarQ: 8 },   /* Tu-126: the Liana set. Nine aircraft, and almost no look-down over land - useful over water and the Arctic, close to worthless over Europe, which is what the row's own desc says. */
  pact_e80_awacs:  { radarQ: 20 },  /* A-50: Shmel. A real look-down capability, unlike the Tu-126, and still poor against ground clutter. */
  pact_e90_awacs:  { radarQ: 20, radarGen: "e80" },  /* A-50: the same Shmel, unchanged, on a fleet going unserviced. The number does not move because the radar did not. */
  pact_e00_awacs:  { radarQ: 27 },  /* A-50U: Shmel-M, the digital re-processing. Equal to the present-day awacs_p because it IS the present-day awacs_p. */
  /* China's e60, e80 and e90 awacs rows are NOT here and must not be. The KJ-1
     rotodome on a Tu-4 flew, could not beat land clutter and was cancelled in
     1979; there was nothing at all in the 1980s; and the A-50I Phalcon was
     cancelled under American pressure in July 2000 with the airframe already
     in Israel. All three rows are named NONE, so rules.js isPhantomUnit()
     deletes them before this table runs and unitFor() correctly returns
     nothing. A radarQ on them would be a number attached to an aeroplane the
     roster has already, deliberately, refused to sell. */
  pla_e00_awacs:   { radarQ: 36 },  /* KJ-2000: three fixed AESA faces in a non-rotating disc, 2007 - electronically scanned where the E-3 still rotates. Under the present-day KJ-500's 41 because only four KJ-2000 were ever built, Russia having refused more Il-76s. */
  roc_e90_awacs:   { radarQ: 16, radarGen: "e80" },  /* E-2T: four aircraft delivered 1995, built to Group II standard around the AN/APS-138 of 1983 rather than the APS-145. Taiwan's first airborne early warning of any kind. */
  roc_e00_awacs:   { radarQ: 26 },  /* E-2K: the E-2Ts brought up to Hawkeye 2000 standard with the APS-145, plus two new aircraft. The same aerial as the American and French Hawkeye 2000s and the same band of number. */
  gbr_e60_awacs:   { radarQ: 5, radarGen: "e50" },   /* Shackleton AEW.2: AN/APS-20 sets unbolted from retiring Gannets and hung in a 1950s maritime aeroplane. Identical to the Gannet's 5 because it is literally the same radar, and radarGen e50 because it is a 1945 design being jammed in 1972. */
  gbr_e90_awacs:   { radarQ: 38, radarGen: "e80" },  /* E-3D Sentry AEW.1: the American rotodome with British engines. Seven aircraft, bought after Nimrod AEW.3 failed. Pre-RSIP, so the set is a 1977 one. */
  gbr_e00_awacs:   { radarQ: 38, radarGen: "e90" },  /* E-3D with RSIP and never with Block 40/45. Same antenna, same 38, run down to three flyable aircraft and gone in 2021 - the shortfall is the fleet, not the radar, and the roster says so in `cost` and in the desc. */
  fra_e90_awacs:   { radarQ: 38, radarGen: "e80" },  /* E-3F: four aircraft bought outright in 1991 so France need not ask the NATO pool. The antenna is the USAF's. */
  fra_e00_awacs:   { radarQ: 38, radarGen: "e90" },  /* E-3F mid-life upgrade: new consoles, Link 16, a glass cockpit and RSIP on the same 1977 APY-2. Equal to the present-day awacs_f, which is this aeroplane. */

  /* ---- and the two carrier rows whose aerial is older than their airframe ---- */
  gbr_e60_cawacs:  { radarGen: "e50" },  /* Gannet AEW.3: the APS-20 out of the Skyraiders. New aeroplane, 1945 antenna - its own desc makes the point. */
  gbr_e90_cawacs:  { radarGen: "e80" },  /* Sea King AEW.2A: Searchwater, the 1979 Nimrod set, in a 1985 production conversion. */

  /* ---- ELECTRONIC WARFARE AIRCRAFT ----
     radarQ on an `ewair` row is what this airframe HEARS, not what it
     paints: rules.js sets ew_f Archange to 22 with jam:0 for exactly that
     reason, and sonarnet.js reads radarQ as the ESM receiver's quality.
     A dedicated ELINT collector therefore scores high and a jamming
     conversion with a weather radar in the nose scores low. */
  nato_e50_ewair:  { radarQ: 3 },   /* AD-5Q / EA-1F: a Skyraider with ALT-2 noise jammers and three men in the back. It is a jammer, not a listener. */
  nato_e60_ewair:  { radarQ: 6 },   /* EA-6B Prowler: ALQ-99 on an A-6 airframe, four crew, and the first aircraft built around the pods rather than fitted with them. */
  nato_e80_ewair:  { radarQ: 8 },   /* EF-111A Raven: ALQ-99E in the bomb bay and the APQ-160 attack radar kept. Two crew doing the work of four. */
  nato_e90_ewair:  { radarQ: 10, radarGen: "e80" },  /* EA-6B ICAP II: the receiver suite of the 1980s fighting through the 1990s, which is what the Navy actually had after the Raven went. */
  nato_e00_ewair:  { radarQ: 15 },  /* EA-18G Growler: ALQ-218 wideband receivers on the wingtips and an APG-79 AESA in the nose. Just under the present-day ew_n, which is the same aeroplane a decade on. */
  fra_e60_ewair:   { radarQ: 12 },  /* Noratlas Gabriel: a transport full of receivers and French operators. It carries no search radar worth the name and it is not meant to - it is an ear. */
  fra_e80_ewair:   { radarQ: 24 },  /* C-160G Gabriel: two Transalls of ELINT and COMINT in service from 1989, the fit that becomes the 26 and 28 already on the e90 and e00 rows. France's whole electronic intelligence capability, and it has never jammed anything. */
  gbr_e60_ewair:   { radarQ: 6 },   /* Canberra T.17, 360 Squadron: transmitters and a training role, no collection suite. Britain's last jamming aircraft; 360 Squadron disbanded 31 October 1994 and nothing replaced it. */
  pla_e00_ewair:   { radarQ: 14 },  /* Y-8G / Y-9 'Gaoxin': the first Chinese purpose-built electronic warfare aircraft, a whole family of them on one transport airframe. Just under the present-day J-16D. */

  /* ---- ELECTRONIC WARFARE VEHICLES ---- */
  nato_e80_ewveh:  { radarQ: 7 },   /* AN/MLQ-34 TACJAM on an M1015: a communications jammer, and its receiver is tuned to radios rather than to radars. */
  nato_e90_ewveh:  { radarQ: 8 },   /* AN/TLQ-17A TRAFFIC JAM on a HMMWV: the same job, small enough to go with the brigade. */

  /* ---- SUPPRESSION OF ENEMY AIR DEFENCES ----
     What a Weasel needs is a RECEIVER, and the roster's own history is that
     Britain and France never built one at all and China arrived thirty years
     late. The four Soviet rows are in this table although they carry no
     `radar` and so fall outside the sweep below: their present-day row
     sead_p is radarQ 7 and the two later era rows say in their own descs
     that they ARE sead_p, so leaving them undefined left the same aeroplane
     holding a 7-tile track under one id and none at all under another. */
  nato_e60_sead:   { radarQ: 5 },   /* F-105G Wild Weasel III: APR-35/APR-36 homing and warning gear and an APQ-105 attack radar. The bear-hunting decade, and the Shrike is outranged by the SA-2 it hunts. */
  nato_e80_sead:   { radarQ: 9 },   /* F-4G Advanced Wild Weasel: the AN/APR-47 with 52 antennas around the airframe, the best emitter locator of its generation and the reason the F-4G outlived every other Phantom in USAF service. */
  nato_e90_sead:   { radarQ: 12 },  /* F-16CJ Block 50D with the AN/ASQ-213 HARM Targeting System on the intake. One seat, one pod, and a step DOWN in locating quality from the F-4G it replaced - which the Air Force argued about at the time. */
  nato_e00_sead:   { radarQ: 13 },  /* F-16CM with HTS R7 and AGM-88E. Equal to the present-day sead_n: the same aeroplane and the same pod. */
  fra_e60_sead:    { radarQ: 4 },   /* Mirage IIIE with AS.37 Martel: a Cyrano II attack radar and no receiver suite at all. The missile finds the emitter; the aeroplane does not. */
  fra_e80_sead:    { radarQ: 2 },   /* Jaguar A with ARMAT. Read this one plainly: the Jaguar A carries NO radar - a laser rangefinder and a marked-target seeker - so the 2 is the crew's eyes and the missile's own seeker. France never built a Wild Weasel and the row's desc says so. */
  fra_e90_sead:    { radarQ: 2, radarGen: "e80" },  /* The same Jaguar and the same 1984 ARMAT, ten years later. ARMAT left service in the 2000s and was never replaced. */
  gbr_e90_sead:    { radarQ: 4 },   /* Tornado GR.1 with ALARM: a terrain-following and ground-mapping radar, not an air-search set, and no dedicated receiver operator. ALARM's loiter mode is the clever part and it is in the weapon, not the aeroplane. */
  gbr_e00_sead:    { radarQ: 5 },   /* Tornado GR.4 with ALARM. Britain's whole defence-suppression capability, and it retired with the GR4 in 2019. */
  pla_e00_sead:    { radarQ: 11 },  /* JH-7A and later J-16 with the YJ-91, a Kh-31P derivative. A real capability arriving in the mid-2000s and still short of the American pod. */
  pact_e60_sead:   { radarQ: 3 },   /* Su-17M with the Kh-28: the first Soviet anti-radiation capability, and the aeroplane is not the sensor - the seeker had to be tuned to one radar band on the ground before takeoff and the Fitter's own nose carries a rangefinder. Under the F-105G of the same decade, which had a receiver suite and a crewman to read it. */
  pact_e80_sead:   { radarQ: 5 },   /* MiG-25BM: the Yaguar fit for the Kh-58, about forty aircraft, flying the mission on speed and altitude rather than on locating quality. */
  pact_e90_sead:   { radarQ: 7 },   /* Su-24M with the Fantasmagoria pod and the Kh-31P. The row's desc says it is the game's sead_p; this is sead_p's figure. */
  pact_e00_sead:   { radarQ: 7 },   /* Still the same aeroplane and still sead_p's 7. The Su-34 takes the mission over with the same missile family from the mid-2010s. */

  /* ---- COUNTER-BATTERY RADAR VEHICLES ---- */
  gbr_e00_radarv:  { radarQ: 18 },  /* MAMBA: the Swedish ARTHUR, bought off the shelf in 2002 for Iraq. Shorter-legged than COBRA at 22 and in the field in months. THIS ROW IS PRESENT-DAY: it carries to:"e20" and rules.js has no radarv_b, so unitFor("gbr","radarv","e20") lands here and this is the counter-battery radar a British player builds today. It goes 13.8*1.6 = 22.1 down to 18 - the one figure in this table that changes a unit outside the historical rosters, and it changes it because ARTHUR really is shorter-ranged than COBRA. */
  nato_e00_radarv: { radarQ: 22 },  /* AN/TPQ-53: the active array that replaced the TPQ-36/37 pair with one vehicle. Equal to the present-day radarv_n, which is this radar. */
  pact_e00_radarv: { radarQ: 15 },  /* 1L219 Zoopark-1: a tracked phased array of 1993, and equal to the present-day radarv_p for the same reason - it is still the same vehicle. */

  /* ---- SURFACE-TO-AIR MISSILE BATTERIES, the three German rows ----
     The rest of the SAM rows already carry their own acquisition figures;
     these are the marks that fell through. */
  deu_e60_sam:     { radarQ: 10 },  /* Basic HAWK, in Bundeswehr service from 1965: the AN/MPQ-35 pulse acquisition radar, the AN/MPQ-34 continuous-wave acquisition set and an AN/MPQ-33 illuminator, all towed. The MPQ-50 and MPQ-46 belong to Improved HAWK on the row below and are not this battery. Under the 12 of the American SP-HAWK, which is the same missile on a tracked hull four years later. */
  deu_e80_sam:     { radarQ: 13 },  /* Improved HAWK: AN/MPQ-50 and the AN/MPQ-55 continuous-wave acquisition radar, and a battery that can finally engage two targets. */
  deu_e90_sam:     { radarQ: 18 },  /* Patriot PAC-2 with the AN/MPQ-53 phased array - one radar doing search, track and illumination, which is the whole generational argument for Patriot. The same 18 as the American PAC-2 row. */

  /* ---- FIGHTER NOSE RADARS ----
     The present-day anchor is the AIR table in rules.js: F-16C APG-68 = 12,
     Rafale RBE2-AA = 15, F-16V APG-83 = 15, Typhoon CAPTOR-M = 11,
     MiG-29S N019M = 9, MiG-21bis RP-22 = 5, F-22 APG-77 = 22.

     The 1950s fighters are the interesting end. A gunsight ranging radar is
     not a search radar: it measures the distance to a target the pilot is
     already looking at. Three of the seven day fighters here have no radar
     of any kind. They therefore fight at knife range and need an AEW
     aircraft to be told about anything else - which is what actually
     happened, and is why the EC-121 orbits exist at all. */
  nato_e50_fighter: { radarQ: 3 },    /* F-86F: AN/APG-30 gunsight ranging only - the row's own desc says so. */
  nato_e60_fighter: { radarQ: 5 },    /* F-4C: AN/APQ-100, a 32-inch dish that finds a fighter at something under thirty miles where the present-day APG-68 at 12 makes eighty. The best nose radar of its decade by a clear margin - it illuminates for the Sparrow, which nothing else here does - and still under the E-2A above it, which is the whole argument for buying an early-warning aeroplane. */
  nato_e80_fighter: { radarQ: 13 },   /* F-15C: AN/APG-63, the first Western pulse-Doppler that really could look down and shoot down. Above the present-day F-16C on purpose - it is a much larger antenna and the F-15 is still flying. */
  nato_e90_fighter: { radarQ: 11 },   /* F-16C Block 50/52: AN/APG-68, a smaller dish doing the same job for a third of the money. */
  nato_e00_fighter: { radarQ: 20 },   /* F-22A: AN/APG-77, the first fighter AESA in service. Just under the present-day stealth_n, which is this aeroplane. */
  pact_e50_fighter: { radarQ: 2 },    /* MiG-17F: no radar. The radar-equipped MiG-17PF is a different sub-type and is not this row. */
  pact_e60_fighter: { radarQ: 4 },    /* MiG-21PF and PFM: the RP-21 Sapfir, a short-ranged set in a very small nose. The F-13 before it had only an SRD-5M ranging set and the bis after it the RP-22, so the 4 covers a decade in which the nose barely changed - which is the row's own point that this is an aeroplane that gets vectored. */
  pact_e80_fighter: { radarQ: 8 },    /* MiG-29 (9.12): N019 Rubin, and a helmet sight that made up for a lot of it. */
  pact_e90_fighter: { radarQ: 9, radarGen: "e80" },   /* MiG-29S: N019M. Equal to the present-day fighter_p because it is the present-day fighter_p, and the set is a 1983 one. */
  pact_e00_fighter: { radarQ: 17 },   /* Su-35S: Irbis-E, a passive array with more transmitter power behind it than anything else on this list. */
  pla_e50_fighter:  { radarQ: 2 },    /* J-5: guns only, no radar, no missile of any kind until the PL-2 in the 1960s. */
  pla_e60_fighter:  { radarQ: 2 },    /* J-6: a MiG-19S clear-weather day fighter. The radar-nosed J-6A was built in tiny numbers and is not this row. */
  pla_e80_fighter:  { radarQ: 6 },    /* J-8II: the Type 208A, a monopulse set that is the reason the J-8II has a nose intake at all - and the aircraft the American Peace Pearl programme was meant to fix before 1989 ended it. */
  pla_e90_fighter:  { radarQ: 12, radarGen: "e80" },  /* Su-27SK: N001 Myech, bought from Russia in 1992. A 1985 set, and an enormous jump over anything China could build. */
  pla_e00_fighter:  { radarQ: 13 },   /* J-10 with the Type 1473, then the J-10B's passive array from 2014. Just under the present-day J-10C. */
  roc_e50_fighter:  { radarQ: 3 },    /* F-86F: the same APG-30 ranging set, and the aircraft that fought the 1958 Taiwan Strait crisis with the first Sidewinders ever fired in anger. */
  roc_e60_fighter:  { radarQ: 4 },    /* F-104G: NASARR F-15A - a multi-mode navigation and attack set with an air-search mode bolted on, in a very fast aeroplane with very short legs. In the same band as the Lightning's AI.23 and the Mirage's Cyrano II, because all three are about twenty miles against a fighter. */
  roc_e80_fighter:  { radarQ: 4 },    /* F-5E: AN/APQ-159, a small ranging and search radar. Taiwan built 242 of these under licence and they are the backbone of the force, not a first-rate interceptor. */
  roc_e90_fighter:  { radarQ: 10 },   /* F-16A/B Block 20 MLU: AN/APG-66(V)3. */
  roc_e00_fighter:  { radarQ: 14 },   /* The same airframes toward F-16V standard with the AN/APG-83 active array from 2016 - the single biggest capability step Taiwan bought in the period. */
  gbr_e50_fighter:  { radarQ: 2 },    /* Hunter F.6: day fighter, no radar. All-weather interception in this decade belongs to the Javelin, which this roster does not carry. */
  gbr_e60_fighter:  { radarQ: 4 },    /* Lightning F.6: Ferranti AI.23 AIRPASS, the first British airborne interception radar with a collision-course computer behind it - and a small dish with no look-down, built to run a stern chase onto a bomber somebody on the ground had already found. Under the Shackleton's APS-20 at 5, because that is the order the two really stood in. */
  gbr_e80_fighter:  { radarQ: 4 },    /* Tornado F.3: AI.24 Foxhunter Stage 1 - specified for over a hundred miles, delivered three years late and so far short that early aircraft flew with concrete ballast where the radar should have been. Deliberately EQUAL to the 1965 Lightning's AI.23 and no better, which is what the scandal amounted to, and under the Shackleton beside it. */
  gbr_e90_fighter:  { radarQ: 9, radarGen: "e80" },   /* The same Foxhunter after Stage 2 and the AMSU rebuild finally made it work. This corrects a generated ramp that had the 1990s aircraft SHORTER-sighted than the 1980s one. */
  gbr_e00_fighter:  { radarQ: 11 },   /* Typhoon FGR.4: CAPTOR-M, mechanically scanned, and the same 11 as the present-day fighter_b - the ECRS Mk2 active array is funded and not in service. */
  fra_e50_fighter:  { radarQ: 2 },    /* Super Mystere B.2: a ranging set in the intake bullet and nothing else. */
  fra_e60_fighter:  { radarQ: 4 },    /* Mirage IIIE: Cyrano II, and the same 4 as the fra_e60_sead row above, which is the same aeroplane with the same radar carrying a Martel instead of a Matra. One set, one number. */
  fra_e80_fighter:  { radarQ: 8 },    /* Mirage 2000C: the RDM, and the RDI from 1987 with the Super 530D behind it. */
  fra_e90_fighter:  { radarQ: 11 },   /* Mirage 2000-5F: RDY, multi-target and the reason the -5 exists. */
  fra_e00_fighter:  { radarQ: 13 },   /* Rafale F3: RBE2, a PASSIVE electronically scanned array. The active RBE2-AA of 2013 is the present-day fighter_f at 15 and this row is deliberately below it. */
  deu_e50_fighter:  { radarQ: 3 },    /* Canadair Sabre Mk 6: the same APG-30 ranging set as the American Sabre, in the best-performing Sabre anyone built. */
  deu_e60_fighter:  { radarQ: 4 },    /* F-104G: NASARR F-15A, the same set as the Taiwanese Starfighter and the same number. 916 of them, and the loss rate that gave the type its German nickname. */
  deu_e80_fighter:  { radarQ: 7 },    /* F-4F: AN/APQ-120, and delivered deliberately WITHOUT Sparrow capability to keep the price down - a restriction the ICE programme below spent the 1990s undoing. */
  deu_e90_fighter:  { radarQ: 12, radarGen: "e80" },  /* F-4F ICE: the AN/APG-65 out of the F/A-18 fitted to a 1974 Phantom, with AMRAAM. The largest single jump on this list, and the set is a 1980s one. */
  deu_e90_mig29:    { radarQ: 8, radarGen: "e80" },   /* MiG-29G: the N019 the NVA left behind, flown by the Luftwaffe and used to teach NATO what it was up against. */
  kpa_e50_fighter:  { radarQ: 2 },    /* Yak-9P: a piston fighter. There is nothing to put a number on. */
  kpa_e60_fighter:  { radarQ: 4 },    /* MiG-21PFM: RP-21, the same set as the Soviet row. */
  kpa_e80_fighter:  { radarQ: 6 },    /* MiG-23ML: Sapfir-23ML, the first radar in KPAF service that could fire a radar-guided missile at all - and passed three years later by the N019 in the Fulcrums below, so it is the best the air force had until 1988 and not the best it has ever had. */
  kpa_e90_fighter:  { radarQ: 5, radarGen: "e60" },   /* MiG-21bis bought second-hand from Kazakhstan in 1999: an RP-22 of 1971. This goes BACKWARDS from the 1980s row above and that is the history - the air force bought what it could get. Equal to the present-day fighter_k, which is the same aeroplane still flying. */
  kpa_e00_fighter:  { radarQ: 8, radarGen: "e80" },   /* MiG-29 (9-12/9-13): the only modern fighter in the inventory and an N019 of 1983. Reported airframe counts run between about sixteen and thirty-five, which is the figure the row's own desc gives. */

  /* ---- LOW-OBSERVABLE AIRCRAFT ---- */
  nato_e80_stealthfighter: { radarQ: 0 },  /* F-117A: it holds no air track of its own, because it carried no radar of any kind. An aeroplane built not to be seen does not transmit; it navigates and aims with a downward-looking infrared turret and a laser. Note what the zero does NOT reach: the row keeps `radar` 9.2, which game.js esmPlot reads as emitter loudness and G.radarCovers as a fog radius, so the aeroplane this comment says never transmits still lights nine tiles of map and still radiates to enemy ESM. `radar` is nobody's field in this pass and a zero there changes what the unit reveals, so it is left alone and written down instead. */
  nato_e90_stealthfighter: { radarQ: 0 },  /* The same aeroplane, and the same reason. */
  nato_e00_stealthfighter: { radarQ: 20 }, /* F-35A/B/C: AN/APG-81, an active array with the sensor fusion that is the actual product. */
  pla_e00_stealthfighter:  { radarQ: 20 }, /* J-20: the Type 1475 active array, and just under the present-day stealth_c. */

  /* ============ THE FLEET ============
     A warship's air-search radar is the one number that decides whether its
     missiles are worth anything, and it is the clearest generational story
     in the game: a 1950s hull sweeps with a metre-wave antenna that cannot
     tell height, a 1960s one gets a separate height-finder, a 1980s one gets
     a fixed phased array that does the whole job at once, and the gap
     between the last two is the largest step on this list. */

  /* ---- destroyers ---- */
  nato_e50_destroyer: { radarQ: 10 },  /* Forrest Sherman: AN/SPS-6 air search with an AN/SPS-8 height-finder beside it. Two antennas to do what one later does. */
  nato_e60_destroyer: { radarQ: 16 },  /* Charles F. Adams: AN/SPS-39 three-dimensional frequency-scan and AN/SPS-40, feeding Tartar through SPG-51 illuminators. */
  nato_e80_destroyer: { radarQ: 15 },  /* Spruance: AN/SPS-40B and nothing more, because this is an anti-submarine hull with no area missile at all - the class was famously "under-armed" and the radar fit is why. */
  nato_e90_destroyer: { radarQ: 32 },  /* Arleigh Burke Flight I: SPY-1D, four fixed faces, and the number jumps by seventeen tiles in one class. */
  nato_e00_destroyer: { radarQ: 33 },  /* Flight IIA: SPY-1D(V) with the littoral processing. Just under the present-day destroyer_n. */
  pact_e50_destroyer: { radarQ: 7 },   /* Kotlin: Fut-N, NATO 'Slim Net'. */
  pact_e60_destroyer: { radarQ: 12 },  /* Kashin: MR-500 Kliver 'Big Net' and MR-300 Angara. The first all-gas-turbine warship anywhere, and a serious air-search fit for 1962. */
  pact_e80_destroyer: { radarQ: 17 },  /* Sovremenny: MR-700 Fregat-M2, NATO 'Top Plate'. */
  pact_e90_destroyer: { radarQ: 18, radarGen: "e80" },  /* The same ship and the same 1980 set - equal to the present-day destroyer_p, which is also this ship. */
  pla_e50_destroyer:  { radarQ: 5 },   /* Anshan: an ex-Soviet Project 7 of 1940 with Soviet wartime sets, the first four destroyers the PLAN ever had. */
  pla_e60_destroyer:  { radarQ: 9 },   /* Type 051 Luda: Type 515 'Knife Rest' long-range air search and the Type 354 'Eye Shield'. Chinese copies of 1950s Soviet antennas. */
  pla_e80_destroyer:  { radarQ: 10, radarGen: "e60" },  /* The same Luda into the 1980s. The hull is new; the radar is a 1960s design and is jammed like one. */
  pla_e90_destroyer:  { radarQ: 14 },  /* Type 052 Luhu: the Type 518 'Hai Ying' long-range set with a Western-built Sea Tiger beside it - two ships only, and the last before the embargo bit. */
  pla_e00_destroyer:  { radarQ: 28 },  /* Type 052C with the Type 346 'Dragon Eye' active array from 2004, then the Type 346A on the 052D. China's Aegis, twenty years after Aegis, and it works. */
  roc_e50_destroyer:  { radarQ: 7 },   /* Tan Yang: the ex-IJN Yukikaze, re-radared with American sets after transfer. */
  roc_e60_destroyer:  { radarQ: 9, radarGen: "e50" },   /* Gearing, Fletcher and Sumner transfers carrying their wartime AN/SPS-6 and SPS-10. A 1970s Taiwanese destroyer is a 1945 American destroyer. */
  roc_e80_destroyer:  { radarQ: 12 },  /* Wu Chin III: the Gearing hull rebuilt around the AN/SPS-58 and the H930 combat system with Sea Chaparral. The most extensive destroyer modernisation any small navy attempted. */
  roc_e90_destroyer:  { radarQ: 20 },  /* Cheng Kung: an Oliver Hazard Perry built in Kaohsiung, with the AN/SPS-49(V)5. */
  roc_e00_destroyer:  { radarQ: 25, radarGen: "e80" },  /* Kee Lung: the four ex-USN Kidds, AN/SPS-48E and SPS-49, bought in 2005. A 1981 air-defence ship and still by far the best radar in the fleet. */
  gbr_e50_destroyer:  { radarQ: 9 },   /* Daring: Type 291 air warning and Type 293Q target indication. */
  gbr_e60_destroyer:  { radarQ: 15 },  /* County: the Type 965 'double bedstead' AKE-2 with Type 992Q, and Type 901 to guide Sea Slug. Long-ranged and famously poor at telling two aircraft apart. */
  gbr_e80_destroyer:  { radarQ: 15, radarGen: "e60" },  /* Type 42 Batch 1: still the Type 965 with Type 992Q. The set is a 1960s one and Sheffield took it to the South Atlantic. */
  gbr_e90_destroyer:  { radarQ: 20 },  /* Type 42 Batch 3: the Type 1022 D-band air warning and the Type 996 - the fit the earlier batches should have had. */
  gbr_e00_destroyer:  { radarQ: 33 },  /* Type 45: SAMPSON, two active faces spinning on a mast, over an S1850M volume search. The best air-defence radar in Europe and the only part of the class nobody complains about. */
  fra_e50_destroyer:  { radarQ: 9 },   /* T 47 Surcouf: DRBV-20A air warning, entirely French-built, which for 1955 is the point. */
  fra_e60_destroyer:  { radarQ: 16 },  /* Suffren: the DRBI-23 three-dimensional set under that enormous glass-fibre dome, with DRBV-50. */
  fra_e80_destroyer:  { radarQ: 14 },  /* Tourville F67: DRBV-26 Jupiter - a long-range air-search set on an anti-submarine hull with only Crotale for self-defence. */
  fra_e90_destroyer:  { radarQ: 19 },  /* Cassard: DRBJ-11B three-dimensional with an American SPS-49 beside it, and Standard SM-1 to use them. */
  fra_e00_destroyer:  { radarQ: 30 },  /* Horizon: EMPAR, a single rotating active face, over S1850M. Aster 30 and a genuinely first-rate picture. */
  deu_e50_destroyer:  { radarQ: 8 },   /* Z-1: an ex-USS Fletcher of 1943, handed over in 1958 with its wartime sets. */
  deu_e60_destroyer:  { radarQ: 14 },  /* Lutjens Type 103: a Charles F. Adams built in Bath, with the AN/SPS-40 and SPS-52. American ship, German flag. */
  deu_e80_destroyer:  { radarQ: 12 },  /* Bremen F122: DA-08. An escort frigate with Sea Sparrow, not an air-defence ship, and the number says which. */
  deu_e90_destroyer:  { radarQ: 14 },  /* Brandenburg F123: LW-08 with the SMART-S three-dimensional set. */
  deu_e00_destroyer:  { radarQ: 28 },  /* Sachsen F124: APAR, four fixed active faces, over SMART-L. The first genuine German air-defence ship since 1945 and a match for anything in Europe. */

  /* ---- cruisers ---- */
  nato_e50_cruiser: { radarQ: 12 },  /* Des Moines: AN/SPS-8 height-finder and SPS-12 air search over eight-inch automatic guns. */
  nato_e60_cruiser: { radarQ: 22 },  /* Long Beach: SCANFAR, the AN/SPS-32 and SPS-33 fixed planar arrays in that slab-sided bridge. The first phased array to go to sea, in 1961, and it saw further than anything afloat - when it worked, which the maintenance crews will tell you was not always. */
  nato_e80_cruiser: { radarQ: 36 },  /* Ticonderoga: SPY-1A. */
  nato_e90_cruiser: { radarQ: 38, radarGen: "e80" },  /* SPY-1B on the later hulls: lighter, better sidelobes, same idea, and just under the present-day cruiser_n. */
  pact_e50_cruiser: { radarQ: 8 },   /* Sverdlov: 'Big Net' and 'Knife Rest' over a 1938 gun cruiser design. Fourteen completed of twenty-one laid down, as the row's own desc says, and the Royal Navy built a weapon specifically to kill them. */
  pact_e60_cruiser: { radarQ: 12 },  /* Grozny, Project 58: MR-300 Angara, NATO 'Head Net-A'. Rated a destroyer until the West called it a cruiser and the Navy agreed. */
  pact_e80_cruiser: { radarQ: 20 },  /* Slava: MR-800 Voskhod 'Top Pair' on the mainmast over MR-700 'Top Steer'. */
  pact_e90_cruiser: { radarQ: 21, radarGen: "e80" },  /* Pyotr Velikiy: a far bigger ship carrying the same MR-800. The hull grew; the antenna did not, and the number does not either. */
  pact_e00_cruiser: { radarQ: 21, radarGen: "e80" },  /* Slava again, and equal to the present-day cruiser_p because it is the same ship with the same 1982 set. */
  gbr_e50_cruiser:  { radarQ: 9 },   /* Swiftsure: Type 281B air warning and Type 277Q height-finding, a 1944 cruiser with 1944 radar. */
  gbr_e60_cruiser:  { radarQ: 12, radarGen: "e50" },  /* Tiger: Type 960 and Type 277Q. Completed in 1959 to a 1941 design, with wartime-lineage antennas on top. */
  fra_e50_cruiser:  { radarQ: 10 },  /* De Grasse: DRBV-20A with DRBV-11, a hull laid down in 1939 and finished as an anti-aircraft cruiser in 1956. */
  fra_e60_cruiser:  { radarQ: 12 },  /* Colbert: DRBV-23 air search and DRBV-11. */
  fra_e80_cruiser:  { radarQ: 13, radarGen: "e60" },  /* Colbert after the 1970-72 Exocet and Masurca refit: new missiles, the same DRBV-23C antenna from 1959. */

  /* ---- carriers ----
     A carrier's own radar is deliberately modest next to a cruiser's: the
     ship's air search is a picket for the deck, and the real sensor is the
     aeroplane it launches. rules.js sets the present-day Ford to 20 and the
     Ticonderoga beside it to 40 for exactly that reason. */
  nato_e50_carrier: { radarQ: 11 },  /* Forrestal: AN/SPS-8, SPS-12 and SPS-37. */
  nato_e60_carrier: { radarQ: 18 },  /* Enterprise: SCANFAR again, the SPS-32/33 arrays in that square island. Enterprise and Long Beach are the only two ships ever fitted with it. */
  nato_e80_carrier: { radarQ: 17 },  /* Nimitz: AN/SPS-48C three-dimensional with SPS-49 two-dimensional - conventional antennas, and a deliberate step back from SCANFAR's maintenance bill. */
  nato_e90_carrier: { radarQ: 18, radarGen: "e80" },  /* SPS-48E and SPS-49(V)5, both 1980s sets. */
  nato_e00_carrier: { radarQ: 19 },  /* Reagan: SPS-48E with the SPQ-9B added for sea-skimmers, and just under the present-day Ford. */
  pact_e60_carrier: { radarQ: 13 },  /* Moskva: MR-600 Voskhod 'Top Sail' over MR-310 Angara. A helicopter cruiser, and the largest Soviet air-search antenna afloat in 1967. */
  pact_e80_carrier: { radarQ: 13, radarGen: "e60" },  /* Kiev and Novorossiysk: the same 'Top Sail' with MR-310U. */
  pact_e90_carrier: { radarQ: 14 },  /* Kuznetsov: MR-710 Fregat-MA 'Top Plate' and the Podkat low-altitude set. */
  pact_e00_carrier: { radarQ: 14, radarGen: "e80" },  /* The same ship, the same 1988 fit, equal to the present-day carrier_p. */
  pla_e00_carrier:  { radarQ: 16 },  /* Liaoning and Shandong: the Type 382 'Sea Eagle' three-dimensional set on the island. Under the present-day Fujian, which is a different ship in every way that matters. */
  gbr_e50_carrier:  { radarQ: 9 },   /* Audacious class: Type 960 air warning with Type 982 and 983 for fighter direction - the fit that invented carrier-controlled interception. */
  gbr_e60_carrier:  { radarQ: 12 },  /* Ark Royal after the 1967-70 Phantom refit: the Type 965 AKE-2 double bedstead. */
  gbr_e80_carrier:  { radarQ: 12 },  /* Invincible: Type 1022 and Type 992R. A through-deck cruiser that was not allowed to be called a carrier, with a carrier's radar fit. */
  gbr_e90_carrier:  { radarQ: 13, radarGen: "e80" },  /* Illustrious with the Type 1022 and Type 996 - both 1980s sets, ten years on. */
  gbr_e00_carrier:  { radarQ: 15 },  /* Queen Elizabeth: S1850M long-range volume search and the Type 997 Artisan. A good fit, and the ship still has no fixed-wing airborne early warning to put above it - which is what the Crowsnest row is about. */
  fra_e50_carrier:  { radarQ: 7, radarGen: "e50" },   /* Arromanches: an ex-HMS Colossus of 1944 with British wartime sets, on loan and then bought. */
  fra_e60_carrier:  { radarQ: 11 },  /* Clemenceau: DRBV-23B air search with DRBV-50. The first carriers France designed and built herself. */
  fra_e80_carrier:  { radarQ: 11, radarGen: "e60" },  /* The same Clemenceau, now flying Super Etendard with ASMP. New aeroplanes, new weapon, 1961 antenna. */
  fra_e90_carrier:  { radarQ: 11, radarGen: "e60" },  /* Foch, her sister, and the same answer. */
  fra_e00_carrier:  { radarQ: 18 },  /* Charles de Gaulle: DRBJ-11B three-dimensional and DRBV-26D Jupiter II. The only nuclear carrier outside the United States Navy, and the only deck outside it that launches a fixed-wing AEW aircraft. */

  /* ---- frigates and corvettes ---- */
  gbr_e50_corvette: { radarQ: 6 },   /* Type 12 Whitby: Type 293Q. An anti-submarine frigate; air search is not its job. */
  gbr_e60_corvette: { radarQ: 9 },   /* Leander: the Type 965 AKE-1 single bedstead. */
  gbr_e80_corvette: { radarQ: 10 },  /* Type 22 Broadsword: Type 967 and 968 feeding Sea Wolf, which is a point-defence system and is aimed at the missile rather than the aeroplane. */
  gbr_e90_corvette: { radarQ: 13 },  /* Type 23 Duke: Type 996 three-dimensional. */
  gbr_e00_corvette: { radarQ: 13, radarGen: "e90" },  /* The same Type 23 with Sonar 2087 towed array - an enormous gain UNDER the water and the same Type 996 above it. The upgrade was to the half of the ship this number does not measure. */
  fra_e50_corvette: { radarQ: 6 },   /* Le Corse, escorteur rapide: DRBV-22A. */
  fra_e60_corvette: { radarQ: 7, radarGen: "e50" },   /* Commandant Riviere: the same DRBV-22A, a colonial aviso built for long endurance rather than for a fleet action. */
  fra_e80_corvette: { radarQ: 8 },   /* A69 aviso: DRBV-51A. */
  fra_e90_corvette: { radarQ: 11 },  /* La Fayette: DRBV-15C Sea Tiger. The first warship anywhere designed around radar cross-section, and its air-search set is ordinary - the stealth is in the hull, which is why the roster gives it rcs 0.14. */
  fra_e00_corvette: { radarQ: 20 },  /* FREMM Aquitaine: Herakles, one multifunction array doing search and Aster fire control together. */
  deu_e60_corvette: { radarQ: 7 },   /* Koln Type 120: DA-02 with SGR-103. The first warships built in Germany after the war. */
  deu_e00_corvette: { radarQ: 11 },  /* K130 Braunschweig: TRS-3D. A 1,800-tonne corvette with no area air defence at all, built for the Baltic. */
  roc_e50_corvette: { radarQ: 5, radarGen: "e50" },   /* PCE-842 and PC-461 hulls: an SU-2 surface-search set and no air-search radar of any kind. The 5 is NOT an air-search figure - it is the Mk 51 director and the men on the bridge wings, and it is set just over the twin 3-inch mount's 4.6 tiles on purpose. entities.js needsTrack is true for anything carrying `radar`, and its visual-range escape covers only roles aa and sam, so a ship given a smaller number than its own gun may not fire at an aeroplane the crew can plainly see. Lowest naval figure in this table, and the reason it is not lower is an engine limit rather than a radar. */
  roc_e60_corvette: { radarQ: 5, radarGen: "e50" },   /* The same American wartime escorts, still, and the same answer. */
  roc_e80_corvette: { radarQ: 5 },   /* Lung Chiang: a Signaal WM-28 fire-control set on a missile gunboat. */
  roc_e90_corvette: { radarQ: 5, radarGen: "e80" },   /* Chin Chiang: the same class of fit a decade on, twelve small gunboats built at Kaohsiung. */
  roc_e00_corvette: { radarQ: 11 },  /* Tuo Chiang: a stealth catamaran with a modern search and fire-control fit, and just under the present-day corvette_r, which is the improved batch. */

  /* ---- missile boats ----
     A fast attack craft's radar is a surface-search set. It hunts ships and
     it is not an air-defence platform, and the numbers refuse to pretend. */
  roc_e60_missileboat: { radarQ: 2 },  /* Hai Ou: a Dvora hull with a surface-search radar and two Hsiung Feng I. */
  roc_e80_missileboat: { radarQ: 2 },  /* The same fifty boats. */
  roc_e90_missileboat: { radarQ: 2, radarGen: "e80" },  /* And still the same boats, into the 1990s. */
  roc_e00_missileboat: { radarQ: 5 },  /* Kuang Hua VI: thirty-one new boats from 2010 with a proper surface-search and fire-control fit, and still under the present-day row. */
};

/* Applied here rather than written into each row because eras.js is
   GENERATED: a regeneration rewrites the rows and would carry away anything
   edited into them, exactly as the SOFTKILL and ROUNDS tables in rules.js
   record. Fills only what is missing, so the hand-written cawacs chain above
   keeps its own researched figures and this table adds radarGen to two of
   them. Any row it names that no longer exists is skipped in silence; the
   gap list below is what a test reads. */
var ERA_RADAR_GAPS = [];
(function () {
  var qn = 0, gn = 0;
  for (var _rid in ERA_RADAR_SETS) {
    var _ru = UNITS[_rid];
    if (!_ru) continue;
    var _rs = ERA_RADAR_SETS[_rid];
    if (_rs.radarQ !== undefined && _ru.radarQ === undefined) { _ru.radarQ = _rs.radarQ; qn++; }
    if (_rs.radarGen && !_ru.radarGen) { _ru.radarGen = _rs.radarGen; gn++; }
  }
  /* Every era row that carries a coverage radius must now carry a track
     quality too, or it is back on the radar * 1.6 fallback. spaag is the one
     role held out on purpose - see the header. */
  for (var _cid in UNITS) {
    var _cu = UNITS[_cid];
    if (!_cu || !/_e(50|60|80|90|00)_/.test(_cid)) continue;
    if (!_cu.radar || _cu.role === "spaag") continue;
    if (_cu.radarQ === undefined) ERA_RADAR_GAPS.push(_cid + " radar=" + _cu.radar);
  }
})();
