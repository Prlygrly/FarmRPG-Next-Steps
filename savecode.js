// Compact save for QR codes: three small codes instead of one long one.
//   "a" = masteries + quests     "b" = inventory     "c" = perks, production, silver and other settings that matter
// Each loads on its own, so a player can rescan just their inventory. Items are written by buddy.farm item ID (not name),
// as the gap from the previous ID, so "Large Net 9850" costs a few characters. Counts are rounded to 2 significant figures
// (under 100 stay exact; worst case ~5% off), "m" means "at the inventory cap", and rounding never crosses a mastery line
// or the cap (996,000 stays under 1M). The JSON this makes is then squeezed and written as text by the page.
(function (root) {
  const TIERS = [10000, 100000, 1000000];
  const V = 2;
  const DROP = ["inventory", "mastery", "quests", "changes", "ui", "nextView", "nextDetail", "bitesAll", "noRecipe"];  // not in "c"

  // 2 significant figures; floor instead when rounding up would cross a line the true count is under
  function round(v, lines = []) {
    if (!(v >= 100)) return v;
    const step = 10 ** (Math.floor(Math.log10(v)) - 1);
    const r = Math.round(v / step) * step;
    return lines.some(t => v < t && r >= t) ? Math.floor(v / step) * step : r;
  }
  // name <-> ID from items.js (every buddy.farm item) plus recipes.js
  function ids(R, I = root.ITEMS || {}) {
    const byName = { ...I }, byId = {};
    for (const [n, x] of Object.entries(R.items)) if (x.id != null) byName[n] = x.id;
    for (const [n, id] of Object.entries(byName)) byId[id] = n;
    return { byName, byId };
  }
  // { name: count } -> "gap.count,gap.count" (gap in base 36); names without an ID go in a side list
  function packItems(counts, map, val) {
    const known = [], other = {};
    for (const [n, c] of Object.entries(counts)) (map.byName[n] != null ? known.push([map.byName[n], c]) : other[n] = val(c));
    known.sort((a, b) => a[0] - b[0]);
    let prev = 0;
    const s = known.map(([id, c]) => { const g = id - prev; prev = id; return g.toString(36) + "." + val(c); }).join(",");
    return Object.keys(other).length ? [s, other] : [s];
  }
  function unpackItems([s, other], map, val) {
    const out = {};
    let id = 0;
    if (s) for (const e of s.split(",")) {
      const [g, c] = e.split(".");
      id += parseInt(g, 36);
      const n = map.byId[id];
      if (n) out[n] = val(c);
    }
    for (const [n, c] of Object.entries(other || {})) out[n] = val(c);
    return out;
  }

  // Quests by buddy.farm quest ID: "id.section[.r]" (r = ready). Details that differ from buddy.farm's (townsperson, kind,
  // special-request dates) go in a side list by position; quests buddy.farm doesn't know stay as written.
  function packQuests(list, Q) {
    const secs = [], short = [], extra = {}, full = [];
    for (const q of list) {
      const x = Q && Q.quests[q.name];
      if (!x || x.id == null) { full.push(q); continue; }
      if (!secs.includes(q.section)) secs.push(q.section);
      const e = {};
      if ((q.npc || null) !== (x.npc || null)) e.n = q.npc;
      if (q.kind) e.k = q.kind;
      if (q.dates) e.d = q.dates;
      if (Object.keys(e).length) extra[short.length] = e;
      short.push(x.id.toString(36) + "." + secs.indexOf(q.section) + (q.ready ? ".r" : ""));
    }
    return { s: secs, i: short.join(","), e: extra, f: full };
  }
  function unpackQuests(o, Q) {
    const byId = {};
    for (const [n, x] of Object.entries((Q && Q.quests) || {})) byId[x.id] = n;
    const out = o.f.slice();
    if (o.i) o.i.split(",").forEach((e, j) => {
      const [id, sec, r] = e.split(".");
      const name = byId[parseInt(id, 36)];
      if (!name) return;
      const x = (o.e || {})[j] || {};
      out.push({ name, section: o.s[+sec], npc: "n" in x ? x.n : Q.quests[name].npc || null, kind: x.k || null, ready: r === "r", dates: x.d || null });
    });
    return out;
  }

  // S -> { a, b, c } plain objects (any may be null when there's nothing to carry)
  function pack(S, R, now = Date.now(), Q = root.QUESTS, defaults = {}, I) {
    const map = ids(R, I), head = k => ({ v: V, k, at: now });
    let a = null, b = null, c = null;
    if (S.mastery || (S.quests && S.quests.length)) {
      a = head("a");
      if (S.mastery) { const { items, at, ...m } = S.mastery; a.m = { ...m, i: packItems(items || {}, map, x => round(x, TIERS)) }; }
      if (Array.isArray(S.quests)) a.q = packQuests(S.quests, Q);
    }
    if (S.inventory) {
      const cap = S.inventory.cap;
      const counts = Object.fromEntries(Object.entries(S.inventory.items).map(([n, it]) => [n, it.count]));
      b = { ...head("b"), cap, i: packItems(counts, map, x => (cap && x >= cap ? "m" : round(x, cap ? [cap] : []))) };
    }
    const rest = Object.fromEntries(Object.entries(S).filter(([k, v]) => !DROP.includes(k) && v != null && !/At$/.test(k)));
    if (rest.perks) rest.perks = Object.fromEntries(Object.entries(rest.perks).filter(([k, v]) => v !== defaults[k]));  // page fills the rest
    if (Object.keys(rest).length) c = { ...head("c"), s: rest };
    return { a, b, c };
  }

  // One code's object -> the parts of S it carries, to merge into S
  function unpack(o, R, Q = root.QUESTS, I) {
    if (!o || o.v !== V) throw new Error("That QR code is from a different version of this page. Make a new one.");
    const map = ids(R, I);
    if (o.k === "b") {
      const cap = o.cap;
      const counts = unpackItems(o.i, map, x => (x === "m" ? cap : +x));
      const items = Object.fromEntries(Object.entries(counts).map(([n, x]) => [n, { count: x, id: map.byName[n] ?? null, atMax: !!cap && x >= cap, mastery: null }]));
      return { inventory: { items, cap, at: o.at }, changes: [] };
    }
    if (o.k === "a") {
      const out = {};
      if (o.m) { const { i, ...m } = o.m; out.mastery = { ...m, items: unpackItems(i, map, x => +x), at: o.at }; }
      if (o.q) { out.quests = unpackQuests(o.q, Q); out.questsAt = o.at; }
      return out;
    }
    const out = { ...o.s };
    for (const k of ["production", "orchard", "silver", "friends"]) if (out[k] != null) out[k + "At"] = o.at;
    if (out.perkPages) { out.perkPagesAt = o.at; out.perkAt = Object.fromEntries(Object.keys(out.perkPages).map(k => [k, o.at])); }
    return out;
  }

  const api = { pack, unpack, round, TIERS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SAVECODE = api;
})(typeof window !== "undefined" ? window : globalThis);
