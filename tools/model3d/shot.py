#!/usr/bin/env python3
"""Render a tools/model3d/dump.js JSON to a PNG contact sheet - no browser.

usage:
  python3 tools/model3d/shot.py DUMP.json OUT.png                one model, 2x2 sheet
  python3 tools/model3d/shot.py BEFORE.json AFTER.json OUT.png   before | after, one row per view
options:
  --views side,top,front,game   which panels, in order (default all four)
  --panel 480x360               panel size in pixels
  --fit view|common             view (default): each view fills its own panel, with
                                its own grid and scale bar; common: one scale for
                                every panel. Before and after always share a scale.
  --subdiv F                    split triangles longer than F x the model's size (but
                                not below a dozen pixels) before sorting; default 0.01,
                                0 = off
  --az DEG --el DEG             the 'game' panel's camera (default 35 and 49.3: the
                                port bow at the game camera's own pitch, 0.86 rad)
  --backfaces                   draw the faces the game culls, in magenta - how a panel
                                wound the wrong way shows up
  --no-parts                    leave out the turret/rotor/wheel markers
  --title TEXT                  a line of your own under the header

Orthographic views in model space (+X nose, +Y left, +Z up, metres):
  side   from starboard, nose to the right (a ship's profile drawing)
  top    from above, nose to the right, port side up
  front  from dead ahead, port side on the right
  game   the 3/4 view the RTS camera gives
Flat shading, painter's algorithm, one light fixed to the camera (above and to the
left of the viewer) so every panel is lit the same way. Big triangles are split
before the sort, and a coarse depth test drops the triangles hidden everywhere
they cover, which is what painter's algorithm alone gets wrong (a hull strake
showing through the flight deck above it). Faces are culled exactly as the
game's materials cull them (front, back or double sided), so a missing panel
here is a missing panel in the game. The grid is in metres; the bar in the
corner of each panel gives the scale. Turret, rotor, wheel and gear pivots are
marked in the side and top views: that is where the engine will turn them.
"""
import json, math, os, re, sys, time
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SS = 2                      # supersampling: render at 2x, downsample
BG = (214, 219, 224)
GRID = (196, 202, 208)
GRID_MAJOR = (178, 185, 192)
GROUND = (120, 104, 84)
INK = (28, 32, 36)
MUTED = (84, 92, 100)
BAD = (176, 38, 30)

VIEW_TITLES = {
    "side": "SIDE - from starboard, nose right",
    "top": "TOP - nose right, port up",
    "front": "FRONT - from dead ahead",
    "game": "GAME CAMERA 3/4",
}
ENGINE_PARTS = ("turret", "rotor", "tailrotor", "rotordisc", "roadwheel", "gear", "mountwrap", "prop", "flame", "core")


def font(size, mono=False):
    names = (["Menlo.ttc", "Monaco.ttf", "Courier.ttc"] if mono else
             ["HelveticaNeue.ttc", "Helvetica.ttc", "Geneva.ttf", "Menlo.ttc"])
    for n in names:
        for d in ("/System/Library/Fonts", "/System/Library/Fonts/Supplemental", "/Library/Fonts",
                  "/usr/share/fonts/truetype/dejavu"):
            p = os.path.join(d, n)
            if os.path.exists(p):
                try:
                    return ImageFont.truetype(p, size)
                except Exception:
                    pass
    try:
        return ImageFont.load_default(size=size)
    except TypeError:
        return ImageFont.load_default()


def norm(v):
    l = math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) or 1.0
    return (v[0] / l, v[1] / l, v[2] / l)


def cross(a, b):
    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])


def dot(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]


def basis(view, az, el):
    """(right, up, toward-viewer) unit vectors in model space."""
    if view == "side":
        return (1, 0, 0), (0, 0, 1), (0, -1, 0)
    if view == "top":
        return (1, 0, 0), (0, 1, 0), (0, 0, 1)
    if view == "front":
        return (0, 1, 0), (0, 0, 1), (1, 0, 0)
    a, e = math.radians(az), math.radians(el)
    t = (math.cos(e) * math.cos(a), math.cos(e) * math.sin(a), math.sin(e))
    r = norm(cross((0, 0, 1), t))
    u = cross(t, r)
    return r, u, t


def hex2rgb(h):
    h = (h or "#999999").lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def nice_step(target):
    """1, 2, 5 x 10^n at or above target."""
    if target <= 0:
        return 1.0
    p = 10 ** math.floor(math.log10(target))
    for m in (1, 2, 5, 10):
        if m * p >= target:
            return m * p
    return 10 * p


def fmt_m(v):
    return ("%g" % round(v, 3)) + " m"


class Dump:
    def __init__(self, path):
        t0 = time.time()
        with open(path) as f:
            d = json.load(f)
        self.path = path
        self.d = d
        self.key = d.get("key", "?")
        self.stats = d.get("stats", {})
        self.mats = d.get("materials", [])
        self.nodes = d.get("nodes", [])
        self.tris = d.get("tris", [])
        self.load_s = time.time() - t0
        # per-material colour and cull mode, looked up once
        self.mcol = [hex2rgb(m.get("color")) for m in self.mats]
        self.memi = [hex2rgb(m["emissive"]) if m.get("emissive") else None for m in self.mats]
        self.mop = [int(round(255 * max(0.0, min(1.0, float(m.get("opacity", 1) or 0))))) for m in self.mats]
        self.mside = [m.get("side", "front") for m in self.mats]
        self.raw = len(self.tris)
        self.pieces = 0

    def subdivide(self, frac, min_piece=0.0, budget=40000):
        """Split big triangles down the longest edge until no edge exceeds
        frac of the model's largest dimension. Painter's algorithm sorts whole
        triangles by their centres, and a 300 m flight-deck triangle has its
        centre nowhere near the hull strake it has to cover: with the pieces
        small, the sort is right everywhere but where two surfaces nearly touch.
        No piece is made smaller than min_piece metres (a dozen pixels in the
        coarsest panel: below that the sort cannot go visibly wrong), and the
        piece size grows until the sheet stays inside a triangle budget, so a
        carrier and a rifleman both render in a few seconds."""
        if frac <= 0 or not self.tris:
            return
        bb = self.stats.get("bbox", {}).get("size") or [1, 1, 1]
        s = max(max(bb) * frac, min_piece)
        cap = max(budget, 2 * len(self.tris))
        while True:
            out, s2, over = [], s * s, False
            for t in self.tris:
                stack = [(tuple(t[0:3]), tuple(t[3:6]), tuple(t[6:9]))]
                tail = t[9:]
                while stack:
                    a, b, c = stack.pop()
                    ab = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
                    bc = (b[0] - c[0]) ** 2 + (b[1] - c[1]) ** 2 + (b[2] - c[2]) ** 2
                    ca = (c[0] - a[0]) ** 2 + (c[1] - a[1]) ** 2 + (c[2] - a[2]) ** 2
                    if ab <= s2 and bc <= s2 and ca <= s2:
                        out.append(list(a + b + c) + tail)
                        continue
                    # halves keep the parent's winding, so culling still agrees
                    if ab >= bc and ab >= ca:
                        m = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2)
                        stack.append((a, m, c)); stack.append((m, b, c))
                    elif bc >= ca:
                        m = ((b[0] + c[0]) / 2, (b[1] + c[1]) / 2, (b[2] + c[2]) / 2)
                        stack.append((a, b, m)); stack.append((a, m, c))
                    else:
                        m = ((c[0] + a[0]) / 2, (c[1] + a[1]) / 2, (c[2] + a[2]) / 2)
                        stack.append((a, b, m)); stack.append((m, b, c))
                if len(out) > cap:
                    over = True
                    break
            if not over:
                break
            s *= 1.5
        self.piece = s
        self.pieces = len(out) - len(self.tris)
        self.tris = out

    def extent(self, r, u):
        """projected min/max along screen right and up, in metres."""
        ck = (r, u)
        cache = self.__dict__.setdefault("_ext", {})
        if ck not in cache:
            cache[ck] = self._extent(r, u)
        return cache[ck]

    def _extent(self, r, u):
        x0 = y0 = float("inf")
        x1 = y1 = float("-inf")
        for t in self.tris:
            for k in (0, 3, 6):
                px = t[k] * r[0] + t[k + 1] * r[1] + t[k + 2] * r[2]
                py = t[k] * u[0] + t[k + 1] * u[1] + t[k + 2] * u[2]
                if px < x0: x0 = px
                if px > x1: x1 = px
                if py < y0: y0 = py
                if py > y1: y1 = py
        if x0 == float("inf"):
            return (-1, -1, 1, 1)
        return (x0, y0, x1, y1)


def hidden_cull(polys, wpx, hpx, cell, eps, cell_m):
    """Drop the triangles that are hidden everywhere they cover.

    Painter's algorithm alone lets a strake or a hangar wall two metres under
    a flight deck poke through it wherever the two triangles' centres sort the
    wrong way round. A coarse depth buffer (one sample per `cell` pixels)
    finds every triangle that is behind something at each sample it covers;
    those are not drawn at all, and the rest are painted far to near as before.
    cell_m is one sample's width in metres.
    Glass does not hide what is behind it. A triangle too small to cover a
    sample is always drawn - the sort gets those right."""
    gw, gh = int(math.ceil(wpx / cell)), int(math.ceil(hpx / cell))
    zb = [float("-inf")] * (gw * gh)
    cover = []
    half = cell * 0.5
    for p in polys:
        (x0, y0), (x1, y1), (x2, y2) = p[1]
        d0, d1, d2 = p[4]
        A = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0)
        if abs(A) < 1e-9:
            cover.append(None)
            continue
        inv = 1.0 / A
        cx0 = max(0, int(math.ceil((min(x0, x1, x2) - half) / cell)))
        cx1 = min(gw - 1, int(math.floor((max(x0, x1, x2) - half) / cell)))
        cy0 = max(0, int(math.ceil((min(y0, y1, y2) - half) / cell)))
        cy1 = min(gh - 1, int(math.floor((max(y0, y1, y2) - half) / cell)))
        if cx0 > cx1 or cy0 > cy1:
            cover.append(None)
            continue
        opaque = p[3] >= 255
        cells = []
        for cy in range(cy0, cy1 + 1):
            py = cy * cell + half
            row = cy * gw
            for cx in range(cx0, cx1 + 1):
                px = cx * cell + half
                w0 = ((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py)) * inv
                if w0 < 0:
                    continue
                w1 = ((x2 - px) * (y0 - py) - (x0 - px) * (y2 - py)) * inv
                if w1 < 0 or w0 + w1 > 1:
                    continue
                d = w0 * d0 + w1 * d1 + (1 - w0 - w1) * d2
                i = row + cx
                cells.append((i, d))
                if opaque and d > zb[i]:
                    zb[i] = d
        cover.append(cells or None)
    # Trust a sample only where the surface in front is smooth around it:
    # all eight neighbours covered and no step between them (the second
    # difference of depth is ~0 across a plane, and large where a deck edge
    # overhangs a fender). At a step, a sliver of the lower surface can show
    # between two samples, and dropping it leaves pinholes along every edge.
    # Well inside a surface - the middle of a flight deck - culling is exact.
    INF = float("-inf")
    step_tol = max(eps, cell_m * 0.25)
    solid = bytearray(gw * gh)
    for y in range(1, gh - 1):
        b = y * gw
        for x in range(1, gw - 1):
            i = b + x
            z = zb[i]
            if z == INF:
                continue
            zl, zr, zu, zd = zb[i - 1], zb[i + 1], zb[i - gw], zb[i + gw]
            if zl == INF or zr == INF or zu == INF or zd == INF or zb[i - gw - 1] == INF or \
               zb[i - gw + 1] == INF or zb[i + gw - 1] == INF or zb[i + gw + 1] == INF:
                continue
            if abs(zl + zr - 2 * z) > step_tol or abs(zu + zd - 2 * z) > step_tol:
                continue
            solid[i] = 1
    out = []
    for p, cells in zip(polys, cover):
        if cells is None:
            out.append(p)
            continue
        for i, d in cells:
            if not solid[i] or d >= zb[i] - eps:
                out.append(p)
                break
    return out


def render_panel(dump, view, W, H, scale, centre, az, el, backfaces, parts, fonts):
    """One panel. scale in px per metre (final pixels); centre = (cx, cy) metres."""
    r, u, t = basis(view, az, el)
    S = SS
    img = Image.new("RGB", (W * S, H * S), BG)
    dr = ImageDraw.Draw(img, "RGBA")
    k = scale * S
    ox, oy = W * S / 2 - centre[0] * k, H * S / 2 + centre[1] * k

    def P(x, y):   # screen metres -> pixels
        return (ox + x * k, oy - y * k)

    # metre grid, and the ground line where the view has one
    step = nice_step(26.0 / max(scale, 1e-9))
    major = step * 5
    xm0, xm1 = (0 - ox) / k, (W * S - ox) / k
    ym0, ym1 = (oy - H * S) / k, oy / k
    if view != "game":
        i0, i1 = math.floor(xm0 / step), math.ceil(xm1 / step)
        if i1 - i0 < 400:
            for i in range(i0, i1 + 1):
                x = i * step
                dr.line([P(x, ym0), P(x, ym1)], fill=GRID_MAJOR if abs(x / major - round(x / major)) < 1e-6 else GRID, width=S)
        j0, j1 = math.floor(ym0 / step), math.ceil(ym1 / step)
        if j1 - j0 < 400:
            for j in range(j0, j1 + 1):
                y = j * step
                dr.line([P(xm0, y), P(xm1, y)], fill=GRID_MAJOR if abs(y / major - round(y / major)) < 1e-6 else GRID, width=S)
        if view in ("side", "front"):
            # z = 0 is the ground for a vehicle and the waterline for a hull;
            # an aircraft is modelled about it, so it is only a line, not a floor
            gy = P(0, 0)[1]
            dr.rectangle([0, gy, W * S, H * S], fill=(206, 204, 198))
            dr.line([(0, gy), (W * S, gy)], fill=GROUND, width=S)

    # light fixed to the camera: above and to the left of the viewer, a little in front
    L = norm((-0.42 * r[0] + 0.62 * u[0] + 0.66 * t[0],
              -0.42 * r[1] + 0.62 * u[1] + 0.66 * t[1],
              -0.42 * r[2] + 0.62 * u[2] + 0.66 * t[2]))
    AMB, DIF = 0.36, 0.72
    polys = []
    mside, mcol, memi, mop = dump.mside, dump.mcol, dump.memi, dump.mop
    r0, r1, r2 = r
    u0, u1, u2 = u
    t0_, t1_, t2_ = t
    for tri in dump.tris:
        ax, ay, az_, bx, by, bz, cx, cy, cz = tri[:9]
        mi = tri[9]
        # face normal, un-normalised, and which way it faces the viewer
        ux_, uy_, uz_ = bx - ax, by - ay, bz - az_
        wx_, wy_, wz_ = cx - ax, cy - ay, cz - az_
        nx = uy_ * wz_ - uz_ * wy_
        ny = uz_ * wx_ - ux_ * wz_
        nz = ux_ * wy_ - uy_ * wx_
        facing = nx * t0_ + ny * t1_ + nz * t2_
        side = mside[mi]
        wrong = False
        if side == "front" and facing <= 0:
            if not backfaces:
                continue
            wrong = True
        elif side == "back" and facing >= 0:
            if not backfaces:
                continue
            wrong = True
        nl = math.sqrt(nx * nx + ny * ny + nz * nz) or 1.0
        if facing < 0:
            nl = -nl        # lit as the side we are looking at, as DoubleSide is
        lam = (nx * L[0] + ny * L[1] + nz * L[2]) / nl
        sh = AMB + DIF * (lam if lam > 0 else 0.0)
        if wrong:
            col = (230, 40, 200)
            a = 255
        else:
            base = hex2rgb(tri[10]) if len(tri) > 10 else mcol[mi]
            e = memi[mi] or (0, 0, 0)
            c0, c1, c2 = int(base[0] * sh + e[0]), int(base[1] * sh + e[1]), int(base[2] * sh + e[2])
            col = (c0 if c0 < 255 else 255, c1 if c1 < 255 else 255, c2 if c2 < 255 else 255)
            a = mop[mi]
            if a <= 3:
                continue
        da = ax * t0_ + ay * t1_ + az_ * t2_
        db = bx * t0_ + by * t1_ + bz * t2_
        dc = cx * t0_ + cy * t1_ + cz * t2_
        pts = [(ox + (ax * r0 + ay * r1 + az_ * r2) * k, oy - (ax * u0 + ay * u1 + az_ * u2) * k),
               (ox + (bx * r0 + by * r1 + bz * r2) * k, oy - (bx * u0 + by * u1 + bz * u2) * k),
               (ox + (cx * r0 + cy * r1 + cz * r2) * k, oy - (cx * u0 + cy * u1 + cz * u2) * k)]
        polys.append((da + db + dc, pts, col, a, (da, db, dc)))
    size = max(dump.stats.get("bbox", {}).get("size") or [1.0])
    polys = hidden_cull(polys, W * S, H * S, 3 * S, max(size, 1e-3) * 0.002, 3.0 / max(scale, 1e-9))
    polys.sort(key=lambda p: p[0])

    mask = Image.new("L", img.size, 0)
    md = ImageDraw.Draw(mask)
    for depth, pts, col, a, _ in polys:
        if a >= 255:
            dr.polygon(pts, fill=col, outline=col)
        else:
            dr.polygon(pts, fill=col + (a,))
        md.polygon(pts, fill=255, outline=255)
    # silhouette line: the eye reads a shape by its outline first
    edge = mask.filter(ImageFilter.FIND_EDGES).point(lambda v: 150 if v > 40 else 0)
    img.paste(Image.new("RGB", img.size, (20, 22, 26)), (0, 0), edge)

    img = img.resize((W, H), Image.LANCZOS)
    d2 = ImageDraw.Draw(img, "RGBA")

    if view in ("side", "front"):
        gy = P(0, 0)[1] / S
        if 0 < gy < H:
            d2.text((W - 8, gy - 13), "z = 0", fill=GROUND, font=fonts["small"], anchor="ra")
    # the parts the engine animates, where it will find them: a turret whose
    # pivot is off the ring traverses about the wrong point in the game
    if parts and view in ("side", "top"):
        seen = {}
        for n in dump.nodes:
            if not n.get("engine") or n["name"] not in ENGINE_PARTS:
                continue
            p = n["pos"]
            x, y = P(dot(p, r), dot(p, u))
            x, y = x / S, y / S
            c = (200, 20, 20) if n["name"] == "turret" else (0, 130, 60)
            d2.line([(x - 5, y), (x + 5, y)], fill=c, width=1)
            d2.line([(x, y - 5), (x, y + 5)], fill=c, width=1)
            if n["name"] not in seen:
                seen[n["name"]] = 1
                d2.text((x + 6, y - 14), n["name"], fill=c, font=fonts["small"])

    # labels, the dimensions this view shows, and the scale bar
    title = VIEW_TITLES[view] + ((" (%.0f az, %.1f el)" % (az, el)) if view == "game" else "")
    d2.text((8, 6), title, fill=INK, font=fonts["label"])
    ex = dump.extent(r, u) if view != "game" else None
    if ex:
        names = {"side": ("L", "H"), "top": ("L", "W"), "front": ("W", "H")}[view]
        d2.text((8, 24), "%s %.2f m   %s %.2f m" % (names[0], ex[2] - ex[0], names[1], ex[3] - ex[1]),
                fill=MUTED, font=fonts["small"])
    target = 110.0 / max(scale, 1e-9)
    bar = nice_step(target * 0.6)
    while bar * scale > 170 and bar > 1e-3:
        bar /= 2
    bx0, by0 = 10, H - 16
    seg = 4 if abs(bar / 4 * 1000 - round(bar / 4 * 1000)) < 1e-6 else 2
    for i in range(seg):
        x0 = bx0 + i * bar * scale / seg
        x1 = bx0 + (i + 1) * bar * scale / seg
        d2.rectangle([x0, by0, x1, by0 + 6], fill=(20, 20, 20) if i % 2 == 0 else (250, 250, 250), outline=(20, 20, 20))
    d2.text((bx0 + bar * scale + 6, by0 - 5), fmt_m(bar), fill=INK, font=fonts["small"])
    d2.text((W - 8, H - 16), "grid %s" % fmt_m(step), fill=MUTED, font=fonts["small"], anchor="ra")
    if view == "game":
        # which way the model axes point on screen
        cx0, cy0 = W - 40, 48
        for vec, c, lab in (((1, 0, 0), (200, 40, 40), "X nose"), ((0, 1, 0), (40, 150, 60), "Y port"), ((0, 0, 1), (50, 80, 200), "Z up")):
            dx, dy = dot(vec, r) * 24, -dot(vec, u) * 24
            d2.line([(cx0, cy0), (cx0 + dx, cy0 + dy)], fill=c, width=2)
            d2.text((cx0 + dx * 1.15, cy0 + dy * 1.15), lab, fill=c, font=fonts["small"], anchor="mm")
    d2.rectangle([0, 0, W - 1, H - 1], outline=(150, 156, 162))
    return img


def header(dump, W, fonts, label=None, extra_title=None):
    s = dump.stats
    lines = []
    sz = s.get("bbox", {}).get("size", [0, 0, 0])
    lines.append(("%s%s   %s %s   team %s" % ((label + ": ") if label else "", dump.key, dump.d.get("kind", ""),
                                             ("len %s m" % dump.d["len"]) if dump.d.get("len") else "",
                                             dump.d.get("team", "")), fonts["head"], INK))
    lines.append(("%d tris  %d meshes  %d draw calls  %d materials  %d textures   L %.2f  W %.2f  H %.2f m" % (
        s.get("triangles", 0), s.get("meshes", 0), s.get("drawCalls", 0), s.get("materials", 0),
        s.get("textures", 0), sz[0], sz[1], sz[2]), fonts["mono"], INK))
    ep = s.get("engineParts", {})
    extras = []
    if ep:
        extras.append("parts: " + ", ".join("%s x%d" % (k, v) if v > 1 else k for k, v in sorted(ep.items())))
    extras.append("named nodes %d" % s.get("namedNodes", 0))
    if s.get("hiddenMeshes"):
        extras.append("hidden meshes %d (%d tris)" % (s["hiddenMeshes"], s.get("hiddenTriangles", 0)))
    extras.append("zero-area tris %d" % s.get("degenerate", 0))
    if s.get("mirrored"):
        extras.append("mirrored %d" % s["mirrored"])
    lines.append(("   ".join(extras), fonts["mono"], MUTED))
    issues = list(s.get("issues", []))
    for i in issues[:3]:
        lines.append(("! " + i, fonts["mono"], BAD))
    for n in s.get("notes", [])[:2]:
        lines.append(("note: " + n, fonts["mono"], MUTED))
    src = short_path(dump.d.get("root", ""))
    if dump.d.get("extra"):
        src += "  + " + ", ".join(short_path(x) for x in dump.d["extra"])
    lines.append(("from " + os.path.basename(dump.path) + "   tree " + src, fonts["small"], MUTED))
    if extra_title:
        lines.append((extra_title, fonts["mono"], INK))
    tc = dump.d.get("teamColor")
    x_first = 34 if tc else 10
    rows = []
    for i, (text, f, c) in enumerate(lines):
        for j, piece in enumerate(wrap(text, f, W - (x_first if i == 0 else 10) - 8)):
            rows.append((piece, f, c, x_first if i == 0 and j == 0 else 10 if j == 0 else 22))
    lh = lambda f: (f.size if hasattr(f, "size") else 12) + 6
    img = Image.new("RGB", (W, 10 + sum(lh(f) for _, f, _, _ in rows)), (236, 238, 240))
    d = ImageDraw.Draw(img)
    if tc:   # the team colour the model was built in, as a swatch
        d.rectangle([10, 8, 26, 24], fill=hex2rgb(tc), outline=INK)
    y = 6
    for text, f, c, x in rows:
        d.text((x, y), text, fill=c, font=f)
        y += lh(f)
    return img


def short_path(p):
    """~ for home, and only the last three parts of a long scratch path."""
    home = os.path.expanduser("~")
    if p.startswith(home):
        p = "~" + p[len(home):]
    parts = p.split("/")
    return p if len(p) <= 44 or len(parts) <= 4 else ".../" + "/".join(parts[-3:])


def wrap(text, f, width):
    """Fit a header line to the panel: break between fields (runs of two or
    more spaces) first, then between words, then anywhere - a tree path has
    no spaces at all."""
    fits = lambda t: f.getlength(t) <= width
    lines, cur = [], ""
    for fld in [x for x in re.split(r"\s{2,}", text) if x]:
        trial = fld if not cur else cur + "   " + fld
        if fits(trial):
            cur = trial
            continue
        if cur:
            lines.append(cur)
            cur = ""
        for w in fld.split(" "):
            trial = w if not cur else cur + " " + w
            if fits(trial):
                cur = trial
                continue
            if cur:
                lines.append(cur)
            while not fits(w) and len(w) > 1:
                n = len(w)
                while n > 1 and not fits(w[:n]):
                    n -= 1
                lines.append(w[:n])
                w = w[n:]
            cur = w
    if cur or not lines:
        lines.append(cur)
    return lines


def main():
    args = sys.argv[1:]
    if not args or args[0] in ("-h", "--help"):
        print(__doc__)
        sys.exit(0 if args else 2)

    def opt(name, default=None):
        if name in args:
            i = args.index(name)
            v = args[i + 1]
            del args[i:i + 2]
            return v
        return default

    def flag(name):
        if name in args:
            args.remove(name)
            return True
        return False

    views = opt("--views", "side,top,front,game").split(",")
    for v in views:
        if v not in VIEW_TITLES:
            sys.exit("unknown view %r (side, top, front, game)" % v)
    pw, ph = (int(x) for x in opt("--panel", "480x360").lower().split("x"))
    fit = opt("--fit", "view")
    subdiv = float(opt("--subdiv", "0.01"))
    az = float(opt("--az", "35"))
    el = float(opt("--el", "49.3"))
    title = opt("--title")
    backfaces = flag("--backfaces")
    parts = not flag("--no-parts")
    if len(args) not in (2, 3):
        sys.exit("need DUMP.json [DUMP2.json] OUT.png")
    out = args[-1]
    t0 = time.time()
    dumps = [Dump(p) for p in args[:-1]]
    fonts = {"head": font(17), "label": font(14), "small": font(11), "mono": font(12, mono=True)}

    # one scale and one centre across both dumps, so before and after overlay pixel for pixel
    MARGIN_X, MARGIN_TOP, MARGIN_BOT = 18, 44, 30
    per_view = {}
    for v in views:
        r, u, t = basis(v, az, el)
        ex = [d.extent(r, u) for d in dumps]
        x0 = min(e[0] for e in ex); y0 = min(e[1] for e in ex)
        x1 = max(e[2] for e in ex); y1 = max(e[3] for e in ex)
        w, h = max(x1 - x0, 1e-3), max(y1 - y0, 1e-3)
        s = min((pw - 2 * MARGIN_X) / w, (ph - MARGIN_TOP - MARGIN_BOT) / h)
        # centre a little low of the middle: the title band is at the top
        cy_off = (MARGIN_TOP - MARGIN_BOT) / 2.0
        per_view[v] = [s, ((x0 + x1) / 2, (y0 + y1) / 2), cy_off]
    if fit == "common":
        s = min(pv[0] for pv in per_view.values())
        for v in views:
            per_view[v][0] = s
    coarsest = min(pv[0] for pv in per_view.values())
    for d in dumps:
        d.subdivide(subdiv, 12.0 / max(coarsest, 1e-9))

    def panel(d, v):
        s, c, cy_off = per_view[v]
        return render_panel(d, v, pw, ph, s, (c[0], c[1] + cy_off / s), az, el, backfaces, parts, fonts)

    if len(dumps) == 1:
        d = dumps[0]
        cols = 2 if len(views) > 1 else 1
        rows = (len(views) + cols - 1) // cols
        head = header(d, cols * pw, fonts, extra_title=title)
        sheet = Image.new("RGB", (cols * pw, head.height + rows * ph), BG)
        sheet.paste(head, (0, 0))
        for i, v in enumerate(views):
            sheet.paste(panel(d, v), ((i % cols) * pw, head.height + (i // cols) * ph))
    else:
        heads = [header(d, pw, fonts, label=lab, extra_title=title) for d, lab in zip(dumps, ("BEFORE", "AFTER"))]
        hh = max(h.height for h in heads)
        sheet = Image.new("RGB", (2 * pw + 6, hh + len(views) * ph), (120, 126, 132))
        for i in range(2):
            sheet.paste((236, 238, 240), (i * (pw + 6), 0, i * (pw + 6) + pw, hh))
        for i, h in enumerate(heads):
            sheet.paste(h, (i * (pw + 6), 0))
        for j, v in enumerate(views):
            for i, d in enumerate(dumps):
                sheet.paste(panel(d, v), (i * (pw + 6), hh + j * ph))
    sheet.save(out)
    ntri = sum(d.raw for d in dumps)
    npc = sum(d.pieces for d in dumps)
    print("[shot] %s: %d x %d, %d views, %d triangles (+%d from splitting), %.1fs" % (
        out, sheet.width, sheet.height, len(views), ntri, npc, time.time() - t0))


if __name__ == "__main__":
    main()
