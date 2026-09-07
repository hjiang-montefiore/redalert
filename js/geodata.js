/* ============ geodata.js — real-world theatres ============
   Coastlines, ridge lines and rivers are hand-digitised approximations of the
   real geography (roughly 3-6 km fidelity), stored as [lon, lat] in decimal
   degrees and rasterised onto the tile grid at load time.  They are accurate
   enough to be recognisable and to reproduce the real chokepoints; they are
   NOT survey data and should not be used for navigation.

   bbox   : [lonMin, latMin, lonMax, latMax]  -> mapped onto the 96x96 grid
   land   : array of polygons; a tile inside any polygon is land
   ridges : polylines that raise elevation, {pts, w (deg), h (levels)}
   rivers : polylines carved as water, {pts, w (deg)}
   ore    : credited resource sites [lon, lat, richness]
   oil    : surveyed oil nodes [lon, lat]
   starts : deployment zones [lon, lat] — index 0 is the human player
*/
var THEATRES = {

/* ------------------------------------------------------------------ */
taiwan: {
  name: "TAIWAN STRAIT",
  brief: "The Strait is 130 km of open water. Whoever owns it owns the war: " +
         "the island is mountainous and roadless down its spine, so every push " +
         "moves along the western coastal plain — and every reinforcement crosses by sea or air.",
  bbox: [117.80, 21.80, 122.20, 26.40],
  seaLevel: true,
  land: [
    /* Taiwan */
    [[121.55,25.30],[121.38,25.28],[121.20,25.20],[121.02,25.13],[120.92,24.95],
     [120.83,24.78],[120.66,24.58],[120.50,24.40],[120.35,24.22],[120.22,24.02],
     [120.14,23.84],[120.08,23.62],[120.03,23.40],[120.02,23.20],[120.06,23.00],
     [120.14,22.85],[120.24,22.70],[120.36,22.52],[120.50,22.35],[120.64,22.15],
     [120.75,21.98],[120.86,21.90],[120.94,21.98],[121.00,22.12],[121.08,22.28],
     [121.17,22.45],[121.26,22.66],[121.34,22.86],[121.41,23.08],[121.47,23.30],
     [121.52,23.52],[121.57,23.76],[121.61,24.00],[121.68,24.20],[121.76,24.40],
     [121.83,24.62],[121.86,24.80],[121.92,24.94],[122.00,25.02],[121.94,25.14],
     [121.80,25.22],[121.66,25.28]],
    /* Fujian mainland — the map's western edge is the Chinese coastal plain */
    [[117.80,26.40],[117.80,23.60],[118.05,23.72],[118.22,23.92],[118.34,24.14],
     [118.10,24.42],[118.40,24.50],[118.66,24.60],[118.90,24.82],[119.06,25.00],
     [119.22,25.16],[119.34,25.36],[119.52,25.50],[119.62,25.72],[119.74,25.94],
     [119.86,26.12],[120.02,26.28],[120.14,26.40]],
    /* Penghu (Pescadores) */
    [[119.50,23.62],[119.62,23.66],[119.70,23.58],[119.64,23.48],[119.52,23.46],[119.44,23.54]],
    /* Kinmen */
    [[118.28,24.38],[118.42,24.42],[118.46,24.48],[118.32,24.50],[118.24,24.44]],
    /* Matsu */
    [[119.92,26.14],[120.00,26.18],[119.98,26.24],[119.90,26.20]],
  ],
  ridges: [
    /* Central Mountain Range — the spine that splits the island */
    { pts:[[121.32,25.00],[121.30,24.60],[121.20,24.20],[121.10,23.80],
           [120.95,23.45],[120.85,23.10],[120.80,22.75],[120.78,22.40]], w:0.19, h:3 },
    /* Alishan / western foothills */
    { pts:[[120.90,24.10],[120.75,23.70],[120.65,23.35],[120.60,23.05]], w:0.11, h:2 },
    /* Coastal range, east */
    { pts:[[121.55,23.90],[121.45,23.40],[121.35,22.95]], w:0.07, h:1 },
    /* Fujian hills */
    { pts:[[117.95,25.90],[118.20,25.40],[118.50,24.95],[118.80,24.55]], w:0.14, h:2 },
  ],
  rivers: [ { pts:[[120.90,23.95],[120.55,23.90],[120.20,23.86],[120.06,23.84]], w:0.026 } ],
  cities: [
    [121.56, 25.03, 6.5],   // Taipei
    [120.30, 22.63, 5.5],   // Kaohsiung
    [120.68, 24.15, 4.5],   // Taichung
    [120.20, 23.00, 4.0],   // Tainan
    [120.97, 24.80, 3.0],   // Hsinchu
    [118.09, 24.48, 4.5],   // Xiamen, on the mainland shore
    [119.30, 26.08, 4.0],   // Fuzhou
  ],
  ore: [[120.30,24.15,1.2],[120.20,23.35,1.0],[120.55,22.62,1.1],[121.62,24.05,0.8],
        [118.70,24.70,1.2],[119.30,25.25,1.0],[119.80,25.95,0.9],[121.30,25.10,0.8]],
  oil: [[119.55,24.30],[120.70,22.20],[118.90,25.60],[121.20,25.22],[119.65,23.56]],
  starts: [[121.05,25.05],[118.55,24.62]],
  startNames: ["TAIPEI BASIN", "FUJIAN COAST"],
},

/* ------------------------------------------------------------------ */
kuwait: {
  name: "KUWAIT \u2014 SOUTHERN IRAQ",
  brief: "Flat, open desert with almost no cover \u2014 the ground that decided 1991. " +
         "Whoever sees first shoots first here, so thermal sights and radar matter more " +
         "than armour. The oil is the richest on any map, the Mutla escarpment is the " +
         "only high ground worth holding, and the sabkha salt flats will bog tracks down.",
  bbox: [46.40, 28.50, 48.80, 30.70],
  seaLevel: true,
  arid: true,
  land: [
    /* The Arabian landmass. Coast traced from Al-Faw down the Shatt al-Arab
       west bank, around Khawr Abd Allah and Khawr as-Sabiyah, through Kuwait
       Bay, then south along the Gulf shore past Mina al-Ahmadi and Khafji. */
    [[46.40,30.70],[46.90,30.70],[47.30,30.68],[47.60,30.64],[47.72,30.58],
     [47.85,30.45],[47.99,30.32],[48.15,30.20],[48.32,30.10],[48.50,30.00],
     [48.62,29.94],
     [48.44,29.90],[48.24,29.86],[48.08,29.88],[47.98,29.92],
     [47.94,29.82],[47.92,29.70],[47.98,29.58],[48.06,29.50],
     [47.94,29.47],[47.80,29.44],[47.70,29.40],
     [47.78,29.36],[47.90,29.35],[48.02,29.34],[48.12,29.31],[48.17,29.28],
     [48.18,29.18],[48.20,29.05],[48.24,28.92],[48.30,28.78],[48.40,28.62],
     [48.50,28.50],
     [46.40,28.50]],
    /* Bubiyan \u2014 large, flat and almost entirely tidal mudflat */
    [[48.02,29.90],[48.16,29.93],[48.28,29.86],[48.32,29.74],[48.28,29.64],
     [48.16,29.60],[48.06,29.66],[48.00,29.78]],
    /* Warbah */
    [[47.97,29.99],[48.09,30.01],[48.11,29.96],[47.99,29.94]],
    /* Faylaka \u2014 sits square in the mouth of Kuwait Bay */
    [[48.28,29.42],[48.38,29.45],[48.43,29.42],[48.36,29.38],[48.29,29.39]],
  ],
  ridges: [
    /* Jal az-Zor / Mutla Ridge \u2014 the escarpment above Kuwait Bay's north
       shore, and the only commanding ground in the whole theatre */
    { pts:[[47.62,29.42],[47.78,29.46],[47.94,29.50],[48.06,29.52]], w:0.055, h:2 },
    /* Ahmadi Ridge, the low rise behind the refineries */
    { pts:[[48.02,29.14],[48.08,29.04],[48.12,28.94]], w:0.035, h:1 },
    /* Western desert escarpments toward the Wadi al-Batin */
    { pts:[[46.70,29.90],[46.95,29.60],[47.10,29.25],[47.20,28.90]], w:0.06, h:1 },
  ],
  rivers: [
    /* Shatt al-Arab \u2014 navigable, and the border itself */
    { pts:[[47.86,30.58],[47.98,30.42],[48.14,30.26],[48.36,30.09],[48.58,29.96]], w:0.024 },
  ],
  /* dry watercourses: driveable low ground, not water */
  wadis: [
    /* Wadi al-Batin \u2014 the axis the coalition's left hook actually used */
    { pts:[[46.55,30.10],[46.85,29.70],[47.10,29.35],[47.30,29.02],[47.45,28.70]], w:0.030 },
    /* Wadi al-Awja, running down toward the Gulf coast */
    { pts:[[47.20,28.62],[47.60,28.66],[47.95,28.74],[48.25,28.84]], w:0.020 },
  ],
  /* built-up areas: [lon, lat, radius in tiles] */
  cities: [
    [47.97, 29.32, 6.5],   // Kuwait City
    [47.66, 29.33, 4.5],   // Al Jahra
    [48.08, 29.08, 4.5],   // Al Ahmadi / Mina al-Ahmadi refinery complex
    [47.74, 30.48, 6.0],   // Basra
    [47.66, 30.38, 4.0],   // Az Zubayr
    [48.48, 29.98, 3.0],   // Al-Faw
    [48.44, 28.60, 3.5],   // Ras al-Khafji
    [48.13, 29.28, 3.0],   // Salmiya / Ras al-Ardh
  ],
  /* sabkha salt flats and the Mesopotamian marshes */
  marsh: [
    [48.14, 29.78, 7.0],   // Bubiyan mudflats
    [47.55, 30.60, 8.0],   // Hawr al-Hammar fringe
    [48.30, 30.02, 5.0],   // Khawr Abd Allah flats
    [47.90, 28.72, 5.0],   // inland sabkha
  ],
  ore: [[47.40,30.20,1.2],[47.85,29.95,1.1],[47.70,29.10,1.2],[48.05,28.80,1.0],
        [46.80,29.55,1.0],[47.15,28.75,0.9],[48.20,30.30,0.9],[47.30,29.60,1.1],
        [46.70,30.35,1.0],[48.05,29.60,0.8]],
  /* The real fields. Burgan alone held roughly a tenth of world reserves. */
  oil: [[47.95,29.05],[48.08,29.10],[47.25,30.35],[47.45,30.15],[47.95,28.62],
        [47.75,29.85],[47.86,29.70],[47.55,30.05],[46.95,29.95],[47.10,29.15],
        [48.02,28.88],[47.62,29.62]],
  starts: [[46.95,28.85],[47.66,30.62],[47.52,29.16],[48.20,29.72]],
  startNames: ["TAPLINE STAGING", "BASRA", "BURGAN FIELD", "BUBIYAN"],
},

/* ------------------------------------------------------------------ */
korea: {
  name: "KOREAN PENINSULA",
  brief: "A 250 km front across the waist of the peninsula. The Taebaek range " +
         "walls off the east, so armour is funnelled into the western corridor " +
         "toward Seoul — while the Yellow Sea flank stays wide open to landings.",
  bbox: [124.90, 36.00, 130.20, 39.80],
  seaLevel: true,
  land: [
    [[124.90,39.80],[125.30,39.72],[125.60,39.60],[125.42,39.30],[125.10,39.15],
     [125.35,38.95],[125.05,38.72],[124.98,38.50],[125.30,38.40],[125.60,38.30],
     [125.90,38.10],[126.20,37.95],[126.42,37.80],[126.25,37.60],[126.40,37.40],
     [126.60,37.28],[126.52,37.05],[126.68,36.90],[126.50,36.72],[126.30,36.60],
     [126.45,36.40],[126.62,36.22],[126.80,36.05],[127.10,36.00],[127.60,36.00],
     [128.20,36.02],[128.80,36.05],[129.30,36.10],[129.42,36.40],[129.45,36.80],
     [129.40,37.20],[129.28,37.60],[129.15,38.00],[128.90,38.35],[128.60,38.60],
     [128.35,38.90],[128.10,39.20],[127.90,39.45],[127.60,39.62],[127.20,39.75],
     [126.70,39.80]],
    /* Ganghwa / western islands */
    [[126.28,37.72],[126.44,37.76],[126.46,37.62],[126.30,37.58]],
    [[126.10,37.32],[126.24,37.36],[126.22,37.24],[126.08,37.22]],
    [[125.95,37.05],[126.06,37.08],[126.04,36.98],[125.92,36.96]],
    /* Ulleung-do */
    [[130.82,37.50],[130.92,37.52],[130.90,37.44],[130.80,37.44]],
  ],
  ridges: [
    /* Taebaek range — the eastern wall */
    { pts:[[128.30,38.60],[128.45,38.20],[128.55,37.80],[128.70,37.40],
           [128.85,37.00],[129.00,36.60],[129.10,36.20]], w:0.20, h:3 },
    /* Nangnim / northern highlands */
    { pts:[[126.80,39.70],[127.20,39.40],[127.50,39.10],[127.80,38.80]], w:0.22, h:3 },
    /* Sobaek spur */
    { pts:[[128.20,36.90],[127.90,36.60],[127.60,36.30]], w:0.15, h:2 },
    /* DMZ ridge belt */
    { pts:[[126.90,38.10],[127.40,38.20],[127.90,38.25]], w:0.10, h:1 },
  ],
  rivers: [
    /* Han */
    { pts:[[127.60,37.55],[127.20,37.58],[126.90,37.62],[126.70,37.72],[126.45,37.78]], w:0.030 },
    /* Imjin */
    { pts:[[127.20,38.30],[126.95,38.05],[126.72,37.88]], w:0.022 },
    /* Taedong */
    { pts:[[126.20,39.05],[125.80,38.95],[125.50,38.90],[125.20,38.86]], w:0.026 },
  ],
  cities: [
    [126.98, 37.57, 7.0],   // Seoul
    [126.70, 37.46, 4.0],   // Incheon
    [125.75, 39.03, 6.0],   // Pyongyang
    [127.42, 36.35, 3.5],   // Daejeon
    [129.08, 35.18, 4.5],   // Busan
    [126.55, 37.97, 3.0],   // Kaesong
    [127.45, 39.15, 3.0],   // Wonsan
    [128.60, 35.87, 3.5],   // Daegu
  ],
  ore: [[126.90,37.50,1.2],[127.40,37.20,1.0],[126.60,36.60,1.1],[128.60,36.60,0.9],
        [125.70,38.95,1.2],[127.10,39.30,1.0],[128.90,38.30,0.8],[127.80,36.40,1.0]],
  oil: [[126.75,37.35],[125.95,38.70],[128.95,37.10],[127.05,38.55],[126.35,36.85]],
  starts: [[127.00,37.35],[126.10,39.10]],
  startNames: ["SEOUL CORRIDOR", "PYONGYANG PLAIN"],
},

/* ------------------------------------------------------------------ */
hormuz: {
  name: "STRAIT OF HORMUZ",
  brief: "A 50 km bottleneck with an oil field on every headland. The Musandam " +
         "peninsula splits the shipping lane in two; open desert on the southern " +
         "shore means armour moves fast and dies in the open.",
  bbox: [54.20, 24.00, 58.60, 27.60],
  seaLevel: true,
  land: [
    /* Iranian coast, north */
    [[54.20,27.60],[54.60,27.40],[55.00,27.20],[55.40,27.00],[55.75,26.90],
     [56.10,26.92],[56.35,27.00],[56.55,26.85],[56.75,26.70],[57.00,26.60],
     [57.30,26.52],[57.70,26.45],[58.10,26.40],[58.60,26.36],[58.60,27.60]],
    /* Qeshm island */
    [[55.35,26.78],[55.70,26.80],[56.00,26.74],[56.24,26.62],[56.05,26.52],
     [55.70,26.56],[55.45,26.66]],
    /* Hormuz island */
    [[56.44,27.06],[56.52,27.08],[56.52,27.00],[56.44,27.00]],
    /* Musandam peninsula + Oman/UAE coast */
    [[56.38,26.40],[56.28,26.20],[56.36,26.00],[56.28,25.80],[56.10,25.66],
     [55.90,25.60],[55.60,25.52],[55.30,25.42],[55.00,25.30],[54.70,25.10],
     [54.40,24.90],[54.20,24.70],[54.20,24.00],[58.60,24.00],[58.60,25.20],
     [58.10,25.30],[57.60,25.45],[57.20,25.70],[56.90,25.95],[56.70,26.20],
     [56.56,26.36]],
    /* Sir Bani Yas / Gulf islands */
    [[54.55,25.62],[54.70,25.66],[54.68,25.54],[54.54,25.52]],
  ],
  ridges: [
    /* Zagros foothills, Iranian side */
    { pts:[[54.60,27.55],[55.20,27.40],[55.90,27.25],[56.60,27.10],[57.40,26.90],[58.30,26.75]], w:0.22, h:3 },
    /* Hajar mountains, Musandam + Oman */
    { pts:[[56.30,26.30],[56.20,25.95],[56.05,25.72],[56.60,25.60],[57.20,25.35]], w:0.16, h:3 },
    { pts:[[57.60,25.10],[58.20,24.80],[58.55,24.55]], w:0.14, h:2 },
  ],
  rivers: [],
  cities: [
    [56.28, 27.19, 4.5],    // Bandar Abbas
    [55.27, 25.20, 5.5],    // Dubai
    [54.37, 24.45, 4.5],    // Abu Dhabi
    [56.34, 25.30, 3.0],    // Khasab / Musandam
    [55.39, 25.35, 3.0],    // Sharjah
  ],
  ore: [[55.20,26.10,1.3],[54.80,24.90,1.1],[57.40,24.60,1.2],[56.90,25.55,1.0],
        [55.60,27.20,1.2],[57.20,26.60,1.0],[54.60,27.30,0.9]],
  /* the Gulf's real reason for existing */
  oil: [[55.05,25.55],[54.60,25.05],[56.60,24.45],[57.90,24.90],
        [55.90,27.10],[56.90,26.65],[57.90,26.30],[55.55,26.68]],
  starts: [[54.95,25.05],[55.40,27.28]],
  startNames: ["ARABIAN SHORE", "IRANIAN COAST"],
},

/* ------------------------------------------------------------------ */
normandy: {
  name: "NORMANDY COAST",
  brief: "The classic amphibious problem. The Cotentin peninsula shelters the " +
         "Baie de Seine; the bocage inland is a maze of hedgerow that strangles " +
         "armour, so the beaches and the two river mouths decide everything.",
  bbox: [-2.30, 48.55, 0.70, 50.15],
  seaLevel: true,
  land: [
    /* Cotentin + Normandy coast */
    [[-2.30,48.55],[0.70,48.55],[0.70,49.42],[0.40,49.44],[0.20,49.42],
     [0.08,49.49],[-0.10,49.34],[-0.30,49.32],[-0.55,49.34],[-0.85,49.34],
     [-1.10,49.36],[-1.25,49.42],[-1.15,49.55],[-1.25,49.68],[-1.40,49.70],
     [-1.62,49.68],[-1.82,49.66],[-1.94,49.72],[-1.85,49.58],[-1.80,49.42],
     [-1.72,49.26],[-1.60,49.10],[-1.55,48.94],[-1.62,48.78],[-1.82,48.66],
     [-2.05,48.62],[-2.30,48.60]],
    /* Îles Saint-Marcouf / offshore rocks */
    [[-1.14,49.50],[-1.09,49.51],[-1.10,49.47],[-1.15,49.47]],
  ],
  ridges: [
    /* Cotentin massif */
    { pts:[[-1.60,49.55],[-1.50,49.35],[-1.42,49.15],[-1.38,48.95]], w:0.10, h:2 },
    /* Suisse Normande */
    { pts:[[-0.60,48.95],[-0.30,48.88],[0.00,48.85],[0.30,48.88]], w:0.13, h:2 },
    /* Bocage ridges behind the beaches */
    { pts:[[-0.90,49.20],[-0.55,49.18],[-0.20,49.16]], w:0.07, h:1 },
  ],
  rivers: [
    /* Seine estuary */
    { pts:[[0.70,49.36],[0.40,49.42],[0.18,49.44],[0.06,49.46]], w:0.020 },
    /* Orne */
    { pts:[[-0.36,49.00],[-0.30,49.15],[-0.26,49.28]], w:0.012 },
    /* Vire */
    { pts:[[-0.95,49.00],[-1.02,49.18],[-1.06,49.30]], w:0.012 },
  ],
  cities: [
    [-0.37, 49.18, 4.5],    // Caen
    [-1.62, 49.63, 3.5],    // Cherbourg
    [-0.70, 49.28, 2.5],    // Bayeux
    [ 0.11, 49.49, 4.0],    // Le Havre
    [-1.09, 49.33, 2.5],    // Carentan
  ],
  ore: [[-0.45,49.18,1.2],[-1.05,49.15,1.0],[-1.45,49.45,1.1],[0.15,49.30,1.0],
        [-0.75,48.85,1.0],[-1.70,48.85,0.9],[0.35,48.80,1.0]],
  oil: [[0.05,49.42],[-1.30,49.60],[-0.65,49.05],[-1.90,48.75],[-0.20,48.72]],
  starts: [[-1.55,49.50],[0.20,49.05]],
  startNames: ["COTENTIN", "PAYS DE CAUX"],
},

};

/* order shown in the menu */
var THEATRE_LIST = ["kuwait", "taiwan", "korea", "hormuz", "normandy"];
