// Compact save for QR codes: two small codes instead of one long one.
//   "a" = masteries + everything else worth carrying (perks, production, quests, settings that matter)
//   "b" = inventory
// Each loads on its own, so a player can rescan just their inventory. Items are written by buddy.farm item ID (not name),
// as the gap from the previous ID, so "Large Net 9850" costs a few characters. Counts are rounded to 2 significant figures
// (under 100 stay exact; worst case ~5% off), "m" means "at the inventory cap", and rounding never crosses a mastery line
// or the cap (996,000 stays under 1M). The JSON this makes is then squeezed and written as text by the page.
(function (root) {
  const TIERS = [10000, 100000, 1000000];
  const DROP = ["inventory", "mastery", "changes", "ui", "nextView", "nextDetail", "bitesAll", "noRecipe"];  // not carried in "a"

  // 2 significant figures; floor instead when rounding up would cross a line the true count is under
  function round(v, lines = []) {
    if (!(v >= 100)) return v;
    const step = 10 ** (Math.floor(Math.log10(v)) - 1);
    const r = Math.round(v / step) * step;
    return lines.some(t => v < t && r >= t) ? Math.floor(v / step) * step : r;
  }
  function ids(R) {
    const byName = {}, byId = {};
    for (const [n, x] of Object.entries(R.items)) if (x.id != null) { byName[n] = x.id; byId[x.id] = n; }
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

  // Quests by buddy.farm quest ID: "id.section[.r]" (r = ready); specials and anything with extra details stay as written
  function packQuests(list, Q) {
    const secs = [], short = [], full = [];
    for (const q of list) {
      const x = Q && Q.quests[q.name];
      if (!x || x.id == null || q.npc || q.kind || q.dates) { full.push(q); continue; }
      if (!secs.includes(q.section)) secs.push(q.section);
      short.push(x.id.toString(36) + "." + secs.indexOf(q.section) + (q.ready ? ".r" : ""));
    }
    return { s: secs, i: short.join(","), f: full };
  }
  function unpackQuests(o, Q) {
    const byId = {};
    for (const [n, x] of Object.entries((Q && Q.quests) || {})) byId[x.id] = n;
    const out = o.f.slice();
    if (o.i) for (const e of o.i.split(",")) {
      const [id, sec, r] = e.split(".");
      const name = byId[parseInt(id, 36)];
      if (name) out.push({ name, section: o.s[+sec], npc: null, kind: null, ready: r === "r", dates: null });
    }
    return out;
  }

  // S -> { a, b } plain objects (either may be null when there's nothing to carry)
  function pack(S, R, now = Date.now(), Q = root.QUESTS) {
    const map = ids(R);
    let a = null, b = null;
    const rest = Object.fromEntries(Object.entries(S).filter(([k, v]) => !DROP.includes(k) && v != null && !/At$/.test(k)));
    if (S.mastery || Object.keys(rest).length) {
      a = { v: 1, k: "a", at: now, s: rest };
      if (Array.isArray(rest.quests)) { a.q = packQuests(rest.quests, Q); delete rest.quests; }
      if (S.mastery) {
        const { items, at, ...m } = S.mastery;
        a.m = { ...m, i: packItems(items || {}, map, c => round(c, TIERS)) };
      }
    }
    if (S.inventory) {
      const cap = S.inventory.cap;
      const counts = Object.fromEntries(Object.entries(S.inventory.items).map(([n, it]) => [n, it.count]));
      b = { v: 1, k: "b", at: now, cap, i: packItems(counts, map, c => (cap && c >= cap ? "m" : round(c, cap ? [cap] : []))) };
    }
    return { a, b };
  }

  // One code's object -> the parts of S it carries (merge into S; "a" replaces settings + mastery, "b" replaces inventory)
  function unpack(o, R, Q = root.QUESTS) {
    if (!o || o.v !== 1) throw new Error("That QR code is from a different version of this page.");
    const map = ids(R);
    if (o.k === "b") {
      const cap = o.cap;
      const counts = unpackItems(o.i, map, c => (c === "m" ? cap : +c));
      const items = Object.fromEntries(Object.entries(counts).map(([n, c]) => [n, { count: c, id: map.byName[n] ?? null, atMax: !!cap && c >= cap, mastery: null }]));
      return { inventory: { items, cap, at: o.at }, changes: [] };
    }
    const out = { ...o.s };
    if (o.q) out.quests = unpackQuests(o.q, Q);
    for (const k of ["production", "orchard", "silver", "friends", "quests"]) if (out[k] != null) out[k + "At"] = o.at;
    if (out.perkPages) out.perkAt = out.perkPagesAt = o.at;
    if (o.m) {
      const { i, ...m } = o.m;
      out.mastery = { ...m, items: unpackItems(i, map, c => +c), at: o.at };
    }
    return out;
  }

  const api = { pack, unpack, round, TIERS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SAVECODE = api;
})(typeof window !== "undefined" ? window : globalThis);
