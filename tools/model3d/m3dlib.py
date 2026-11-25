#!/usr/bin/env python3
"""Shared helpers for the model3d tools: a dump's triangles, which part they belong
to, and the geometry checks gate.py runs on them (gaps between parts, landmarks).

Nothing here draws. outline.py, overlay.py and gate.py import it; it needs numpy
only (no scipy).

Selections on a dump (used by "hide", "free_parts" and a landmark's "model_at"):
  dump.js writes "meshes": [{path, t0, t1}] - tris[t0:t1] came from the mesh at
  that path, the names of its ancestors below the root joined by "/". A NAME
  matches a triangle when it equals one segment of the path ("gear" hides every
  mesh under a group called gear); a name with a "/" or "*" in it is a path
  substring / glob.
"""
import fnmatch, math
import numpy as np


# ------------------------------------------------------------------ the dump
def tri_array(dump):
    """-> (T (n,3,3) float64, mi (n,) material index)."""
    tris = dump["tris"]
    if not tris:
        return np.zeros((0, 3, 3)), np.zeros(0, dtype=np.int32)
    T = np.array([t[:9] for t in tris], dtype=np.float64).reshape(-1, 3, 3)
    mi = np.array([t[9] for t in tris], dtype=np.int32)
    return T, mi


def tri_paths(dump):
    """-> list of the mesh path of every triangle ('' when the dump has no mesh table)."""
    n = len(dump["tris"])
    out = [""] * n
    for m in dump.get("meshes") or []:
        for i in range(m["t0"], min(n, m["t1"])):
            out[i] = m["path"]
    return out


def _name_match(path, name):
    if "/" in name or "*" in name or "?" in name:
        return fnmatch.fnmatch(path, "*" + name.strip("*") + "*") if "*" not in name else fnmatch.fnmatch(path, name)
    return name in path.split("/")


def select_names(dump, names):
    """bool (n,): triangles under any of the named groups / paths."""
    n = len(dump["tris"])
    sel = np.zeros(n, dtype=bool)
    if not names:
        return sel
    if not dump.get("meshes"):
        raise ValueError("this dump has no mesh table: re-run tools/model3d/dump.js (it writes 'meshes' since the pilot round)")
    for m in dump["meshes"]:
        if any(_name_match(m["path"], nm) for nm in names):
            sel[m["t0"]:m["t1"]] = True
    return sel


def pitch_tris(T, deg, about=(0.0, 0.0)):
    """Turn triangles NOSE UP by deg about the axis through (x, z) = about, parallel to Y."""
    if not deg:
        return T
    p = math.radians(deg)
    c, s = math.cos(p), math.sin(p)
    X = T[..., 0] - about[0]
    Z = T[..., 2] - about[1]
    out = T.copy()
    out[..., 0] = X * c - Z * s + about[0]
    out[..., 2] = X * s + Z * c + about[1]
    return out


# ------------------------------------------------------------------ parts
def components(T, weld=1e-3):
    """Separate parts: triangles joined through shared vertices (welded at `weld` m).
    -> (label per triangle (n,), number of parts)."""
    if not len(T):
        return np.zeros(0, dtype=np.int64), 0
    V = np.round(T.reshape(-1, 3) / weld).astype(np.int64)
    _, vid = np.unique(V, axis=0, return_inverse=True)
    vid = vid.ravel().reshape(-1, 3)
    nv = int(vid.max()) + 1
    par = np.arange(nv)
    # vectorised union-find: hook roots until nothing changes
    a = np.concatenate([vid[:, 0], vid[:, 1]])
    b = np.concatenate([vid[:, 1], vid[:, 2]])
    while True:
        ra, rb = par[a], par[b]
        lo = np.minimum(ra, rb)
        changed = False
        # point both roots at the smaller
        m = ra != lo
        if m.any():
            np.minimum.at(par, ra[m], lo[m]); changed = True
        m = rb != lo
        if m.any():
            np.minimum.at(par, rb[m], lo[m]); changed = True
        # path compression
        while True:
            nxt = par[par]
            if np.array_equal(nxt, par):
                break
            par = nxt
        if not changed:
            break
    lab = par[vid[:, 0]]
    _, lab = np.unique(lab, return_inverse=True)
    return lab.ravel(), int(lab.max()) + 1


# ------------------------------------------------------------------ distances
def point_tri_dist(P, A, B, C):
    """Distance from points P (k,3) to triangles (A,B,C each (k,3)), pairwise row by row (Ericson 5.1.5)."""
    ab, ac, ap = B - A, C - A, P - A
    d1 = (ab * ap).sum(1); d2 = (ac * ap).sum(1)
    bp = P - B
    d3 = (ab * bp).sum(1); d4 = (ac * bp).sum(1)
    cp = P - C
    d5 = (ab * cp).sum(1); d6 = (ac * cp).sum(1)
    vc = d1 * d4 - d3 * d2
    vb = d5 * d2 - d1 * d6
    va = d3 * d6 - d5 * d4
    Q = np.empty_like(P)
    done = np.zeros(len(P), dtype=bool)

    def put(mask, val):
        nonlocal done
        m = mask & ~done
        if m.any():
            Q[m] = val[m] if val.ndim == 2 else val
            done |= m
    put((d1 <= 0) & (d2 <= 0), A)
    put((d3 >= 0) & (d4 <= d3), B)
    with np.errstate(divide="ignore", invalid="ignore"):
        v = d1 / (d1 - d3)
        put((vc <= 0) & (d1 >= 0) & (d3 <= 0), A + v[:, None] * ab)
        put((d6 >= 0) & (d5 <= d6), C)
        w = d2 / (d2 - d6)
        put((vb <= 0) & (d2 >= 0) & (d6 <= 0), A + w[:, None] * ac)
        w2 = (d4 - d3) / ((d4 - d3) + (d5 - d6))
        put((va <= 0) & ((d4 - d3) >= 0) & ((d5 - d6) >= 0), B + w2[:, None] * (C - B))
        den = 1.0 / (va + vb + vc)
        v3 = vb * den; w3 = vc * den
        put(np.ones(len(P), dtype=bool), A + ab * v3[:, None] + ac * w3[:, None])
    Q = np.where(np.isfinite(Q), Q, A)
    return np.sqrt(((P - Q) ** 2).sum(1))


def seg_hits_tri(P0, P1, A, B, C):
    """bool (k,): segment P0-P1 crosses triangle ABC (row by row, Moller-Trumbore)."""
    e1, e2 = B - A, C - A
    d = P1 - P0
    h = np.cross(d, e2)
    a = (e1 * h).sum(1)
    ok = np.abs(a) > 1e-12
    with np.errstate(divide="ignore", invalid="ignore"):
        f = 1.0 / a
        s = P0 - A
        u = f * (s * h).sum(1)
        q = np.cross(s, e1)
        v = f * (d * q).sum(1)
        t = f * (e2 * q).sum(1)
        return ok & (u >= 0) & (u <= 1) & (v >= 0) & (u + v <= 1) & (t >= 0) & (t <= 1)


def _pairwise(fn, X, Y, limit=1500000):
    """fn over every (x in X, y in Y) pair, chunked; X, Y index arrays. -> (len(X), len(Y))."""
    out = np.empty((len(X), len(Y)))
    step = max(1, limit // max(1, len(Y)))
    for i in range(0, len(X), step):
        xi = X[i:i + step]
        I = np.repeat(xi, len(Y)); J = np.tile(Y, len(xi))
        out[i:i + len(xi)] = fn(I, J).reshape(len(xi), len(Y))
    return out


def set_distance(TA, TB, cap=np.inf):
    """Near-exact distance between two triangle sets (k,3,3): the least of every vertex to every
    triangle of the other set, both ways (edge midpoints included), and 0 if an edge of one set
    crosses a triangle of the other. Edge-to-edge closest points between two vertices are not
    searched, so a gap can be over-stated by up to a quarter of an edge length. Triangles further
    than `cap` from the other set's box are not looked at."""
    best = np.inf
    for S, O in ((TA, TB), (TB, TA)):
        lo, hi = O.reshape(-1, 3).min(0) - min(cap, 1e3), O.reshape(-1, 3).max(0) + min(cap, 1e3)
        pts = np.concatenate([S.reshape(-1, 3), ((S + np.roll(S, 1, axis=1)) / 2).reshape(-1, 3)])
        pts = np.unique(np.round(pts, 5), axis=0)
        keep = np.all((pts >= lo) & (pts <= hi), axis=1)
        pts = pts[keep]
        if not len(pts):
            continue
        A, B, C = O[:, 0], O[:, 1], O[:, 2]
        D = _pairwise(lambda I, J: point_tri_dist(pts[I], A[J], B[J], C[J]), np.arange(len(pts)), np.arange(len(O)))
        best = min(best, float(D.min()))
    if best > 0:
        for S, O in ((TA, TB), (TB, TA)):
            E0 = S.reshape(-1, 3); E1 = np.roll(S, -1, axis=1).reshape(-1, 3)
            lo, hi = O.reshape(-1, 3).min(0), O.reshape(-1, 3).max(0)
            keep = ~(np.any((np.minimum(E0, E1) > hi) | (np.maximum(E0, E1) < lo), axis=1))
            if not keep.any():
                continue
            E0, E1 = E0[keep], E1[keep]
            A, B, C = O[:, 0], O[:, 1], O[:, 2]
            H = _pairwise(lambda I, J: seg_hits_tri(E0[I], E1[I], A[J], B[J], C[J]), np.arange(len(E0)), np.arange(len(O)))
            if H.any():
                return 0.0
    return best


def inside(p, T):
    """Is point p inside the triangle set T (ray parity along +Z, tilted a little)?"""
    d = np.array([0.0123, 0.0071, 1.0])
    far = p + d * 1e4
    hits = seg_hits_tri(np.repeat(p[None], len(T), 0), np.repeat(far[None], len(T), 0), T[:, 0], T[:, 1], T[:, 2])
    return bool(hits.sum() % 2)


def gap_check(T, free=None, near=0.25, report=0.005):
    """Floating parts. T: (n,3,3); free: bool (n,) triangles of parts that may float (rotor discs).
    Connected parts (welded at 1 mm) are joined into ASSEMBLIES wherever two touch (gap <= `report`)
    or one lies inside the other; the assembly with the most surface is the airframe / hull, and every
    other assembly floats. -> dict with
      parts, assemblies, floating: [{gap_m, size_m, bbox, tris, nearest: {bbox, size_m}, free}],
      gaps: every part whose own nearest neighbour is further than `report` (bbox, size, gap, nearest)."""
    lab, n = components(T)
    if n == 0:
        return {"parts": 0, "assemblies": 0, "floating": [], "gaps": []}
    area = np.linalg.norm(np.cross(T[:, 1] - T[:, 0], T[:, 2] - T[:, 0]), axis=1) / 2
    order = np.argsort(lab, kind="stable")
    starts = np.searchsorted(lab[order], np.arange(n + 1))
    idx = [order[starts[k]:starts[k + 1]] for k in range(n)]
    P = T.reshape(-1, 9)
    lo = np.stack([T[idx[k]].reshape(-1, 3).min(0) for k in range(n)])
    hi = np.stack([T[idx[k]].reshape(-1, 3).max(0) for k in range(n)])
    size = np.linalg.norm(hi - lo, axis=1)
    carea = np.bincount(lab, weights=area, minlength=n)
    isfree = np.zeros(n, dtype=bool)
    if free is not None and free.any():
        isfree[np.unique(lab[free])] = True
    # candidate pairs: boxes within `near` of each other (sweep along x)
    ox = np.argsort(lo[:, 0])
    pairs = []
    for a_i, a in enumerate(ox):
        for b in ox[a_i + 1:]:
            if lo[b, 0] > hi[a, 0] + near:
                break
            if np.all(lo[b] <= hi[a] + near) and np.all(lo[a] <= hi[b] + near):
                pairs.append((a, b))
    dist = {}
    nearest = np.full(n, np.inf)
    nn = np.full(n, -1)
    for a, b in pairs:
        # only the triangles of each part that lie near the other part's box
        def near_tris(k, other):
            t = T[idx[k]]
            tl, th = t.min(1), t.max(1)
            m = np.all((tl <= hi[other] + near) & (th >= lo[other] - near), axis=1)
            return t[m]
        ta, tb = near_tris(a, b), near_tris(b, a)
        if not len(ta) or not len(tb):
            continue
        d = set_distance(ta, tb, cap=near)
        if d > report:
            # one inside the other (an internal block, a part sunk in a closed hull)
            small, big = (a, b) if size[a] < size[b] else (b, a)
            if np.all(lo[small] >= lo[big]) and np.all(hi[small] <= hi[big]) and inside(T[idx[small]][0, 0], T[idx[big]]):
                d = 0.0
        dist[(a, b)] = d
        for x, y in ((a, b), (b, a)):
            if d < nearest[x]:
                nearest[x], nn[x] = d, y
    # assemblies: union of parts that touch
    par = list(range(n))

    def f(x):
        while par[x] != x:
            par[x] = par[par[x]]; x = par[x]
        return x
    for (a, b), d in dist.items():
        if d <= report:
            ra, rb = f(a), f(b)
            if ra != rb:
                par[ra] = rb
    root = np.array([f(k) for k in range(n)])
    groups = {}
    for k in range(n):
        groups.setdefault(root[k], []).append(k)
    gid = max(groups, key=lambda g: carea[groups[g]].sum())
    floating = []
    for g, mem in groups.items():
        if g == gid:
            continue
        mem = np.array(mem)
        inset = set(mem.tolist())
        gap, other = np.inf, -1
        for (a, b), d in dist.items():
            if (a in inset) != (b in inset):
                if d < gap:
                    gap, other = d, (b if a in inset else a)
        glo, ghi = lo[mem].min(0), hi[mem].max(0)
        if not np.isfinite(gap):
            # nothing within `near`: measure to the nearest vertex of anything else (an upper bound)
            mine = np.concatenate([T[idx[k]].reshape(-1, 3) for k in mem])
            rest = T[~np.isin(lab, mem)].reshape(-1, 3)
            rest = rest[:: max(1, len(rest) // 20000)]
            best = np.inf
            for i in range(0, len(mine), 200):
                dd = np.sqrt(((mine[i:i + 200, None, :] - rest[None]) ** 2).sum(-1))
                j = dd.argmin()
                if dd.flat[j] < best:
                    best = float(dd.flat[j])
            gap = best
        rec = {"gap_m": round(float(gap), 4), "size_m": round(float(np.linalg.norm(ghi - glo)), 3),
               "bbox": [[round(float(v), 3) for v in glo], [round(float(v), 3) for v in ghi]],
               "parts": int(len(mem)), "tris": int(sum(len(idx[k]) for k in mem)),
               "free": bool(isfree[mem].all())}
        if other >= 0:
            rec["nearest"] = {"bbox": [[round(float(v), 3) for v in lo[other]], [round(float(v), 3) for v in hi[other]]],
                              "size_m": round(float(size[other]), 3), "tris": int(len(idx[other]))}
        floating.append(rec)
    floating.sort(key=lambda r: -r["gap_m"])
    gaps = []
    for k in range(n):
        if nearest[k] > report and n > 1:
            rec = {"gap_m": None if not np.isfinite(nearest[k]) else round(float(nearest[k]), 4), "size_m": round(float(size[k]), 3),
                   "bbox": [[round(float(v), 3) for v in lo[k]], [round(float(v), 3) for v in hi[k]]], "tris": int(len(idx[k])),
                   "free": bool(isfree[k])}
            if nn[k] >= 0:
                rec["nearest"] = {"bbox": [[round(float(v), 3) for v in lo[nn[k]]], [round(float(v), 3) for v in hi[nn[k]]]],
                                  "size_m": round(float(size[nn[k]]), 3)}
            gaps.append(rec)
    gaps.sort(key=lambda r: -(r["gap_m"] if r["gap_m"] is not None else 1e9))
    return {"parts": int(n), "assemblies": len(groups), "pairs_checked": len(pairs), "floating": floating, "gaps": gaps}


# ------------------------------------------------------------------ landmarks
VIEW_AXES = {"side": (0, 2), "top": (0, 1), "front": (1, 2)}


def edge_at(T, ah, av, h, upper=True):
    """The silhouette's upper (or lower) edge at horizontal coordinate h: the highest (lowest)
    vertical coordinate of any triangle crossing the line h = const in this view. None if none."""
    H, V = T[:, :, ah], T[:, :, av]
    best = None
    for i, j in ((0, 1), (1, 2), (2, 0)):
        h0, h1, v0, v1 = H[:, i], H[:, j], V[:, i], V[:, j]
        m = (np.minimum(h0, h1) <= h) & (np.maximum(h0, h1) >= h)
        if not m.any():
            continue
        dh = h1[m] - h0[m]
        with np.errstate(divide="ignore", invalid="ignore"):
            t = np.where(np.abs(dh) > 1e-12, (h - h0[m]) / dh, 0.0)
        v = v0[m] + t * (v1[m] - v0[m])
        v = np.concatenate([v, np.where(np.abs(dh) <= 1e-12, np.maximum(v0[m], v1[m]) if upper else np.minimum(v0[m], v1[m]), v)])
        x = float(v.max() if upper else v.min())
        best = x if best is None else (max(best, x) if upper else min(best, x))
    return best


def select_tris(dump, T, mi, sel):
    """bool (n,) for a model_at selector {node|path|material|in_m}."""
    n = len(T)
    m = np.ones(n, dtype=bool)
    names = [x for x in (sel.get("path"), sel.get("part")) if x]
    if names:
        m &= select_names(dump, names)
    if sel.get("material"):
        want = sel["material"]
        mats = dump["materials"]
        ok = np.array([(want.lower() == (mt.get("color") or "").lower()) if want.startswith("#") else (want.lower() in (mt.get("name") or "").lower())
                       for mt in mats])
        m &= ok[mi]
    if sel.get("in_m"):
        x0, y0, z0, x1, y1, z1 = sel["in_m"]
        c = T.mean(axis=1)
        lo = np.array([min(x0, x1), min(y0, y1), min(z0, z1)]); hi = np.array([max(x0, x1), max(y0, y1), max(z0, z1)])
        if sel.get("whole"):
            m &= np.all((T.min(1) >= lo) & (T.max(1) <= hi), axis=1)
        else:
            m &= np.all((c >= lo) & (c <= hi), axis=1)
    return m
