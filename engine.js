// Planning and costing. Game rules: knowledge/ (pointers by each section).
(function (root) {
  const TIER = { m: 10000, gm: 100000, mm: 1000000 };

  // player = { level, ak, items: {name: count}, mmCount }
  function towerPlan(player, tower, maxLevels = 30) {
    const items = player.items || {};
    const mmCount = player.mmCount != null ? player.mmCount
      : Object.values(items).filter(v => v >= TIER.mm).length;
    const levels = [];
    let firstWall = null;

    for (let L = player.level + 1; L <= player.level + maxLevels; L++) {
      const unmet = [];
      const any = tower.anyMM;
      if (L >= any.from && L <= any.to) {
        const need = Math.ceil((L - 100) / any.levelsPerMM);
        if (mmCount < need) unmet.push({ kind: "mmCount", need, have: mmCount, left: need - mmCount });
      }
      const req = tower.levels[L];
      if (req) {
        for (const tier of ["gm", "mm"]) {
          for (const item of req[tier] || []) {
            const have = items[item] || 0;
            if (have < TIER[tier]) unmet.push({ kind: "item", item, tier, have, target: TIER[tier], left: TIER[tier] - have, known: item in items });
          }
        }
      }
      if (!req && L > (any.to || 0) && !Object.keys(tower.levels).some(k => +k >= L)) break; // past the known table
      const lv = { level: L, ak: tower.akPerLevel, unmet };
      levels.push(lv);
      if (unmet.length && !firstWall) firstWall = lv;
    }

    // Levels you can climb with AK alone before the first wall
    const freeLevels = firstWall ? firstWall.level - player.level - 1 : levels.length;
    const akToClearFree = Math.max(0, freeLevels * tower.akPerLevel - (player.ak || 0));
    const walls = levels.filter(l => l.unmet.length);
    return { levels, walls, firstWall, freeLevels, akToClearFree, mmCount };
  }

  // Silver to reach a level (knowledge/mechanics/tower.md)
  function towerSilver(tower, L) {
    const s = tower.silverPerLevel;
    if (!s) return 0;
    const band = s.bands.find(([to]) => L <= to);
    return band ? L * band[1] : 0;
  }

  // Where each item shows up in the tower above the player's level: item -> [{level, tier}]
  function towerUses(tower, fromLevel) {
    const uses = {};
    for (const [L, req] of Object.entries(tower.levels)) {
      if (+L <= fromLevel) continue;
      for (const tier of ["gm", "mm"]) for (const item of req[tier] || []) (uses[item] = uses[item] || []).push({ level: +L, tier });
    }
    return uses;
  }

  const AK = { m: 10, gm: 100 };
  const SKILL_NAMES = ["Farming", "Fishing", "Crafting", "Exploring", "Cooking", "Mining"];

  // Cheapest AK: each item's next AK-paying tier (knowledge/mechanics/mastery.md)
  // opts = { akTarget, fromLevel, tower, skills, limit, drops, perks, where, hidden }
  function akPlan(items, opts = {}) {
    const uses = opts.tower ? towerUses(opts.tower, opts.fromLevel || 0) : {};
    const cands = [], hiddenList = [], seasonal = [], slow = [];
    const hidden = new Set(opts.hidden || []);
    for (const [item, have] of Object.entries(items)) {
      const tier = have < TIER.m ? "m" : have < TIER.gm ? "gm" : null;
      if (!tier) continue;
      const left = TIER[tier] - have;
      const base = { item, tier, have, left, ak: AK[tier], tower: uses[item] || [] };
      if (hidden.has(item)) { hiddenList.push(base); continue; }
      const months = opts.where ? seasonNote(item, opts.drops, opts.where) : null;
      if (months) { seasonal.push({ ...base, months }); continue; }
      let effort = opts.coster ? opts.coster.effort(item, left) : opts.drops ? bestEffort(item, left, opts.drops, opts.perks, opts.where) : null;
      if (effort && opts.adjust) effort = opts.adjust(effort);          // e.g. gather what daily production can't cover in time
      // Too slow on daily production (e.g. 1,000 days of grapes): kept off the quick list
      const hours = effort && opts.timeOf ? opts.timeOf(effort) : 0;
      if (opts.slowHours != null && hours > opts.slowHours) { slow.push({ ...base, effort, hours }); continue; }
      const cost = effort && effort.unit !== "explores" ? effort.amount : null;
      const waits = opts.quickHours != null && hours > opts.quickHours;   // more than about a day of waiting: after the quick ones
      cands.push({ item, tier, have, left, ak: AK[tier], perAK: left / AK[tier], effort, hours, waits, costPerAK: cost == null ? null : cost / AK[tier], tower: uses[item] || [] });
    }
    // Items with a known AC/AP/net cost rank by that; the rest (crafted, farmed) follow, by count
    cands.sort((a, b) => (a.costPerAK == null) - (b.costPerAK == null) || (a.waits === true) - (b.waits === true) || (a.costPerAK ?? a.perAK) - (b.costPerAK ?? b.perAK) || a.left - b.left);

    // Cheapest picks that cover the target
    const picks = [];
    let got = 0;
    for (const c of cands) {
      if (opts.akTarget != null && got >= opts.akTarget) break;
      picks.push(c);
      got += c.ak;
      if (opts.akTarget == null && picks.length >= (opts.limit || 10)) break;
    }

    const other = [];
    for (const s of SKILL_NAMES) {
      const lv = opts.skills && opts.skills[s];
      if (lv != null && lv < 99) other.push({ source: `${s} to 99`, ak: 100, note: `level ${lv} now` });
    }
    other.push({ source: "Daily chores", ak: 80, note: "up to ~80 a month if you collect every goal" });
    return { picks, akFromPicks: got, ranked: cands, hidden: hiddenList, seasonal, slow: slow.sort((a, b) => a.hours / a.ak - b.hours / b.ak), known: cands.filter(c => c.costPerAK != null), unknown: cands.filter(c => c.costPerAK == null), other };
  }

  // ---------- Effort: how many AC / AP / Large Nets to gather `left` more of an item ----------
  // knowledge/mechanics/effort-units.md
  const DEFAULT_PERKS = { ironDepot: true, runecube: true, lemonSqueezer: true, cinnamonSticks: true, reinforcedNetting: true, fishingTrawl: true, wanderer: 33, resourceSaver: 45, orchardNoon: 10, antlerNoon: 10, sellBonus: 70, craftSilverCut: 80, friendBonus: 0, autoBuyIronNails: true, slowDays: 7, tripDiscount: 50,
    plots: 20, grapeJuice: 14, harvestsPerHour: 4, cropGrowthCut: 0, cornGrowthCut: 0, doublePrizes: 0, boostRounds: 250, ovens: 1, cookFaster: 0, stirs: 0, wwTosses: 0, vjMode: "none", vjCount: 3, vjTarget: 60, abjNotDone: false, apPerMin: 100, waitWorth: 20 };

  // Every way to get the item, cheapest first: [{loc, unit, amount}]
  function effortOptions(item, left, drops, perks = DEFAULT_PERKS, where = null) {
    const it = drops && drops.items[item];
    if (!it || left <= 0) return [];
    const exVar = (perks.ironDepot ? "D" : "") + (perks.runecube ? "R" : "") || "-";
    const perCider = (perks.cinnamonSticks ? 1250 : 1000) * 0.4;
    const perPalmer = perks.lemonSqueezer ? 500 : 200;
    const perNet = 250 + (perks.reinforcedNetting ? 150 : 0) + (perks.fishingTrawl ? 100 : 0);
    const opts = [];
    for (const [loc, vars] of Object.entries(it.drops)) {
      const L = drops.locs[loc];
      if (!L || (where && !locOpen(loc, where))) continue;
      if (L.type === "fishing") {
        const rate = (perks.runecube ? vars.netR : null) ?? vars.net;
        if (it.manualOnly || rate == null) continue;
        opts.push({ loc, unit: "LN", amount: left * rate / perNet });
      } else {
        const rate = vars[exVar] ?? vars["-"];
        if (rate == null) continue;
        if (L.base) {
          opts.push({ loc, unit: "AP", amount: left * rate / ((1 / L.base) * perPalmer) });
          opts.push({ loc, unit: "AC", amount: left * rate / (perCider / L.base) });
        } else opts.push({ loc, unit: "explores", amount: left * rate });
      }
    }
    // Places you're exploring anyway cost less (where.discount = { loc: factor })
    const disc = where && where.discount;
    if (disc) for (const o of opts) if (disc[o.loc] != null) { o.amount *= disc[o.loc]; o.discounted = true; }
    // Plain explores can't be compared with AC/AP/nets, so they sort last
    return opts.sort((a, b) => (a.unit === "explores") - (b.unit === "explores") || a.amount - b.amount);
  }
  const bestEffort = (item, left, drops, perks, where) => effortOptions(item, left, drops, perks, where)[0] || null;

  // ---------- Gather or craft: the cheapest way to get ONE of an item ----------
  // Effort per unit; crafts cost their ingredients / Resource Saver (not cooking); null = no known way.
  // Passive items (buildings, orchard) are free here. knowledge/mechanics/effort-units.md
  const DEFAULT_PASSIVE = ["Wood", "Board", "Stone", "Coal", "Iron", "Nails", "Steel", "Steel Wire", "Straw",
    "Antler", "Apple", "Orange", "Lemon", "Grapes", "Milk", "Feathers", "Eggs"];
  function makeCoster(drops, recipes, perks = DEFAULT_PERKS, where = null, passive = DEFAULT_PASSIVE) {
    const memo = new Map();
    const free = new Set(passive);
    const saver = 1 + (perks.resourceSaver ?? 0) / 100;
    const scale = (byUnit, k) => Object.fromEntries(Object.entries(byUnit).map(([u, v]) => [u, v * k]));
    // `active` = cost it by gathering or crafting even if it's on the daily-production list (for "skip the wait" and
    // top-ups: Steel from Carbon Sphere + Glass Orb + Iron). Its ingredients can still come from production.
    const memoActive = new Map();
    function unit(item, stack = new Set(), active = false) {
      const m = active ? memoActive : memo;
      if (m.has(item)) return m.get(item);
      if (stack.has(item)) return null;                              // recipe loop
      if (!active && free.has(item)) { const z = { per: 0, byUnit: {}, byPlace: {}, forWhat: {}, passive: { [item]: 1 }, how: "passive" }; memo.set(item, z); return z; }
      stack.add(item);
      let best = null;
      const d = bestEffort(item, 1, drops, perks, where);
      // forWhat["AP|Highland Hills"] = { "Fern Leaf": qty } — what each place is visited for
      if (d && d.unit !== "explores") best = { per: d.amount, byUnit: { [d.unit]: d.amount }, byPlace: { [d.unit + "|" + d.loc]: d.amount }, forWhat: { [d.unit + "|" + d.loc]: { [item]: 1 } }, passive: {}, how: "drop", loc: d.loc, unit: d.unit };
      const r = recipes && recipes.items[item];
      if (r && r.recipe && (!where || !seasonNote(item, drops, where))) {
        const out = r.craft ? saver : 1;
        let per = 0, ok = true;
        const byUnit = {}, byPlace = {}, forWhat = {}, passive = {}, parts = [];
        for (const [ing, qty] of r.recipe) {
          const c = unit(ing, stack);
          if (!c) { ok = false; parts.push({ item: ing, qty, cost: null }); continue; }
          per += c.per * qty / out;
          for (const [u, v] of Object.entries(c.byUnit)) byUnit[u] = (byUnit[u] || 0) + v * qty / out;
          for (const [p, v] of Object.entries(c.passive)) passive[p] = (passive[p] || 0) + v * qty / out;
          for (const [k, v] of Object.entries(c.byPlace)) byPlace[k] = (byPlace[k] || 0) + v * qty / out;
          for (const [k, its] of Object.entries(c.forWhat || {})) for (const [n, v] of Object.entries(its)) ((forWhat[k] ||= {})[n] = (forWhat[k][n] || 0) + v * qty / out);
          parts.push({ item: ing, qty, cost: c });
        }
        const craft = { per, byUnit, byPlace, forWhat, passive, how: r.craft ? "craft" : "cook", parts, missing: parts.filter(p => !p.cost).map(p => p.item) };
        if (ok && (!best || per < best.per)) { if (best) craft.alt = best; best = craft; }
        else if (best && ok) best.alt = craft;
        else if (!best && !ok) best = { ...craft, per: null };      // can't cost it: remember why
      }
      stack.delete(item);
      if (best && best.per == null) { m.set(item, null); if (!active) unknownWhy.set(item, best.missing); return null; }
      m.set(item, best);
      return best;
    }
    const unknownWhy = new Map();
    const scaleWhat = (fw, k) => Object.fromEntries(Object.entries(fw || {}).map(([p, its]) => [p, scale(its, k)]));
    // Effort for `left` more of an item, shaped like bestEffort's result plus the route
    function shape(c, left) {
      if (!c) return null;
      return { ...c, amount: c.per * left, byUnit: scale(c.byUnit, left), byPlace: scale(c.byPlace, left), forWhat: scaleWhat(c.forWhat, left),
        passive: scale(c.passive, left), alt: c.alt ? { ...c.alt, amount: c.alt.per * left } : null };
    }
    const effort = (item, left) => shape(unit(item), left);
    const activeEffort = (item, left) => shape(unit(item, new Set(), true), left);
    return { unit, effort, activeEffort, active: item => unit(item, new Set(), true), why: item => unknownWhy.get(item) || null };
  }

  // ---------- Trips: "I'm exploring here anyway" ----------
  // Cost of ONE item at one place in one unit (no discount), or null if it doesn't drop there that way
  function unitCostAt(item, loc, unit, drops, perks) {
    const o = effortOptions(item, 1, drops, perks, null).find(x => x.loc === loc && x.unit === unit);
    return o ? o.amount : null;
  }
  // Everything a trip brings home: spending `amount` of `unit` at `loc` -> { item: qty }
  function tripYield(loc, unit, amount, drops, perks = DEFAULT_PERKS) {
    const out = {};
    for (const name of Object.keys(drops.items)) {
      if (!drops.items[name].drops[loc]) continue;
      const c = unitCostAt(name, loc, unit, drops, perks);
      if (c) out[name] = amount / c;
    }
    return out;
  }
  // Budget needed at `loc` to gather `qty` of `item`
  const tripBudgetFor = (item, qty, loc, unit, drops, perks) => { const c = unitCostAt(item, loc, unit, drops, perks); return c ? c * qty : null; };

  // ---------- Outlets: where extra items go, so nothing is lost to the inventory cap ----------
  // A pile about to void goes into a recipe that uses it, two steps deep, then gift or sell (knowledge/planner/rules.md).
  // ctx = { recipes, coster, adjust?, counts: mastery counts, onHand: {item: count}, cap, perks, towerUse, drops?, where?,
  //         maxCost?: skip outlets whose extra ingredients cost more than this (e.g. the job's own cost) }
  function outletPlan(item, qty, ctx, depth = 0) {
    const { recipes, coster, adjust, counts = {}, onHand = {}, cap = Infinity, perks = DEFAULT_PERKS, towerUse = {} } = ctx;
    const over = Math.max(0, (onHand[item] || 0) + qty - cap);
    const r = recipes.items[item] || {};
    const plan = { item, qty, over };
    if (!over) return plan;
    const saver = 1 + (perks.resourceSaver ?? 0) / 100;
    const opts = [];
    for (const [p, per] of r.uses || []) {
      const pr = recipes.items[p];
      if (!pr || !pr.recipe) continue;
      if (ctx.where && ctx.drops && seasonNote(p, ctx.drops, ctx.where)) continue;     // event-only recipe
      const crafts = Math.ceil(over / per);
      // Cooking is one meal per oven per round (hours each), so it can't soak up a pile: only when one round of ovens does it
      if (!pr.craft && crafts > (perks.ovens || 1)) continue;
      const extra = [];
      let ok = true;
      for (const [n, q] of pr.recipe) {
        if (n === item) continue;
        let e = coster.effort(n, q * crafts);
        if (e && adjust) e = adjust(e);
        if (!e) { ok = false; break; }
        extra.push({ item: n, qty: q * crafts, effort: e });
      }
      if (!ok) continue;
      opts.push({
        product: p, per, crafts, made: crafts * (pr.craft ? saver : 1), extra,
        cost: extra.reduce((s, x) => s + x.effort.amount, 0),
        goal: (counts[p] || 0) < TIER.mm, mail: !!pr.mail,
        tower: (towerUse[p] || []).some(u => (counts[p] || 0) < TIER[u.tier])      // only if that Tower need isn't met yet
      });
    }
    // Outlets that earn progress are always offered (knowledge/planner/rules.md)
    const allowed = o => ctx.maxCost == null || o.goal || o.tower || o.cost <= ctx.maxCost;
    const skipped = opts.filter(o => !allowed(o)).length;
    if (skipped) opts.splice(0, opts.length, ...opts.filter(allowed));
    plan.skipped = skipped;
    opts.sort((a, b) => (b.tower - a.tower) || (b.goal - a.goal) || a.cost - b.cost);
    plan.outlet = opts[0] || null;
    plan.others = opts.slice(1, 3);
    if (plan.outlet && depth < 2) plan.next = outletPlan(plan.outlet.product, plan.outlet.made, ctx, depth + 1);
    if (!plan.outlet) plan.end = r.mail ? "give" : "sell";
    return plan;
  }

  // ---------- Seasons and places ----------
  const itemMonths = (item, seasons) => {
    for (const r of (seasons && seasons.items) || []) if (r.name === item || (r.match && new RegExp(r.match).test(item))) return r.months;
    return null;
  };
  // where = { month (1-12), seasons, places: {loc: false} for places the player can't use }
  function locOpen(loc, where) {
    if (where.places && where.places[loc] === false) return false;
    const m = where.seasons && where.seasons.locs[loc];
    return !m || m.includes(where.month);
  }
  // Months an item comes back, if it can't be gathered right now because of the season; else null
  function seasonNote(item, drops, where) {
    const own = itemMonths(item, where.seasons);
    if (own) return own.includes(where.month) ? null : own;
    const it = drops && drops.items[item];
    if (!it) return null;
    const locs = Object.keys(it.drops);
    if (locs.some(l => locOpen(l, where) || !(where.seasons.locs[l]))) return null;
    return [...new Set(locs.flatMap(l => where.seasons.locs[l] || []))].sort((a, b) => a - b);
  }
  // Unlocked = gathered at least half the items found only there (knowledge/mechanics/locked-places.md).
  // Explore places are only judged with inventory counts (opts.exploreEvidence).
  function placesUnlocked(items, drops, seasons, opts = {}) {
    const own = {};
    for (const [name, it] of Object.entries(drops.items)) {
      const locs = Object.keys(it.drops);
      if (locs.length === 1 && !itemMonths(name, seasons)) (own[locs[0]] ||= []).push(name);
    }
    const out = {};
    for (const loc of Object.keys(drops.locs)) {
      const mine = own[loc] || [];
      out[loc] = !mine.length || (drops.locs[loc].type === "explore" && !opts.exploreEvidence) || mine.filter(n => (items[n] || 0) > 0).length * 2 >= mine.length;
    }
    return out;
  }

  // ---------- Daily production (pure, so it can be tested and re-run with what-if numbers) ----------
  // Hours between drops; the rest drop hourly (knowledge/mechanics/production.md)
  const DROP_HOURS = { Eggs: 24, Feathers: 24, Milk: 24, Antler: 24, "Steak Kabob": 24, Trout: 24, Grapes: 24,
    Straw: 1 / 6, Stone: 1 / 6, Sandstone: 1 / 6, Iron: 1 / 20, Nails: 1 / 20 };
  // Stored production carries its own unit, as the game states it: { Antler: { n: 54210, per: "day" }, Wood: { n: 18002, per: "hour" } }.
  // The math below works per hour; these are the only conversions. (Older saves stored a bare number per hour.)
  const PER_HOURS = { day: 24, hour: 1 };
  const unitOf = item => (DROP_HOURS[item] || 1) >= 24 ? "day" : "hour";
  const perHourOf = e => typeof e === "number" ? e : e && e.n != null ? e.n / (PER_HOURS[e.per] || 1) : null;
  const entryOf = (item, perHour, per = unitOf(item)) => ({ n: perHour * PER_HOURS[per], per });
  const ratesPerHour = prod => Object.fromEntries(Object.entries(prod || {}).map(([k, e]) => [k, perHourOf(e)]).filter(([, v]) => v != null));
  const storeRates = perHour => Object.fromEntries(Object.entries(perHour || {}).filter(([, v]) => typeof v === "number").map(([k, v]) => [k, entryOf(k, v)]));
  // Old saves: bare numbers (per hour) become entries; entries stay as they are
  const migrateRates = prod => Object.fromEntries(Object.entries(prod || {}).map(([k, e]) => [k, typeof e === "number" ? entryOf(k, e) : e]));
  // env = { production: {item: per hour}, orchard: {fruit: {production}}, cap, gap (hours between your checks),
  //         antlerNoon, orchardNoon (%) }. Each drop is capped at the inventory cap.
  function productionMath(env) {
    const cap = env.cap > 0 ? env.cap : Infinity, gap = env.gap || 1;
    // Noon bonus = % of full production, capped apart from midnight's drop when checked between (production.md)
    const noonDay = (P, pct) => {
      const bonus = P * pct / 100;
      if (gap < 12) return Math.min(P, cap) + Math.min(bonus, cap);
      return Math.min(P + bonus, cap) * 24 / Math.max(24, gap);
    };
    const usableRate = (n, perHour) => {
      if (n === "Antler") return noonDay(perHour * 24, env.antlerNoon ?? 10) / 24;
      const g = Math.max(DROP_HOURS[n] || 1, gap);
      return Math.min(perHour * g, cap) / g;
    };
    const fruitPerDay = n => {
      const o = env.orchard && env.orchard[n];
      return o && o.production ? noonDay(o.production, env.orchardNoon ?? 10) : 0;
    };
    // Usable amount per day of everything the buildings and orchard make
    const perDay = () => {
      const out = {};
      for (const [n, v] of Object.entries(env.production || {})) if (v > 0) out[n] = usableRate(n, v) * 24;
      for (const n of Object.keys(env.orchard || {})) { const f = fruitPerDay(n); if (f > 0) out[n] = f; }
      return out;
    };
    // Usable amount a day of one item (buildings and orchard)
    const usableDay = n => env.orchard && env.orchard[n] ? fruitPerDay(n) : (env.production || {})[n] > 0 ? usableRate(n, env.production[n]) * 24 : 0;
    return { noonDay, usableRate, fruitPerDay, perDay, usableDay };
  }
  // Days to collect `need` while the cap grows by capPerDay a day (knowledge/mechanics/inventory-cap.md);
  // cumulative totals cached per item in `cache`.
  function daysWithGrowingCap(env, capPerDay, item, need, cache = {}) {
    const pm = cap => productionMath({ ...env, cap }).usableDay(item);
    const max = pm(Infinity);
    if (!(max > 0)) return Infinity;
    if (!(capPerDay > 0) || !(env.cap > 0)) return need / pm(env.cap);
    const c = cache[item] ||= { cum: [0], steady: null };
    while (c.cum[c.cum.length - 1] < need && c.steady == null) {
      const d = c.cum.length - 1, r = pm(env.cap + capPerDay * d);
      if (r >= max * 0.9999) { c.steady = d; break; }                   // the cap no longer limits it
      c.cum.push(c.cum[d] + r);
      if (d > 36500) return Infinity;
    }
    const cum = c.cum, last = cum.length - 1;
    if (cum[last] >= need) {                                            // within the counted days: find the day
      let lo = 0, hi = last;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (cum[m] >= need) hi = m; else lo = m; }
      return lo + (need - cum[lo]) / (cum[hi] - cum[lo]);
    }
    return last + (need - cum[last]) / max;
  }

  // What if: the same production env with some numbers changed. w = { cap, days (project the cap: + capPerDay a day),
  // capPerDay, prod: {item: per hour}, fruit: {Apple: fruit at midnight} }. Blank fields keep the current value.
  function whatIfEnv(env, w = {}) {
    const grow = w.capPerDay > 0 ? w.capPerDay : env.capPerDay || 0;
    const base = w.cap > 0 ? w.cap : env.cap;
    const cap = w.days > 0 && base > 0 ? base + grow * w.days : base;
    const production = { ...(env.production || {}) };
    for (const [n, v] of Object.entries(w.prod || {})) if (v > 0) production[n] = v;
    const orchard = { ...(env.orchard || {}) };
    for (const [n, v] of Object.entries(w.fruit || {})) if (v > 0) orchard[n] = { ...(orchard[n] || {}), production: v };
    return { ...env, cap, production, orchard };
  }

  // ---------- Slow grinds: how long a GM or MM takes, and what holds it back ----------
  // Made a day from production alone (the scarcest passive input); null if it needs hand-gathered parts,
  // unless ignoreHand (drinks: Glass and Tea Leaves assumed on hand).
  function makesPerDay(item, coster, perDay, ignoreHand = false) {
    const u = coster.unit(item);
    if (!u || (!ignoreHand && Object.keys(u.byUnit).length) || !Object.keys(u.passive).length) return null;
    return Math.min(...Object.entries(u.passive).map(([p, q]) => (perDay[p] || 0) / q));
  }
  // ctx = { coster, perDay: {item: usable per day}, budget: {AP, AC, LN: spent per day} }. Production and hand work run
  // side by side, so the slowest part sets the time. Parts with no budget (e.g. AP not set) can't be timed: listed in `untimed`.
  function grindTime(item, left, ctx) {
    const e = ctx.coster.effort(item, left);
    if (!e) return null;
    const parts = [], untimed = [];
    for (const [p, q] of Object.entries(e.passive || {})) {
      const r = ctx.perDay[p] || 0;
      // Growing cap counted day by day (ctx.growth = { env, capPerDay, extra }); items with typed extras stay flat
      const g = ctx.growth, grows = g && g.capPerDay > 0 && r !== Infinity && !(g.extra && g.extra[p]) && productionMath(g.env).usableDay(p) > 0;
      const days = grows ? daysWithGrowingCap(g.env, g.capPerDay, p, q, (g.cache ||= {})) : r > 0 ? q / r : Infinity;
      parts.push({ item: p, kind: "prod", need: q, days });
    }
    for (const [u, v] of Object.entries(e.byUnit || {})) {
      const b = (ctx.budget || {})[u];
      if (b > 0) parts.push({ item: u, kind: u, need: v, days: v / b }); else untimed.push({ unit: u, need: v });
    }
    const bottleneck = parts.reduce((a, x) => (!a || x.days > a.days ? x : a), null);
    return { days: bottleneck ? bottleneck.days : null, bottleneck, parts, untimed, how: e.how };
  }
  // Which grinds to show: every unfinished mastery slower than minDays, plus the `always` list until it's MM'd.
  // Target = the next GM, then the MM. Longest first; ones that can't be timed go last.
  function grindList(counts, ctx, opts = {}) {
    const minDays = opts.minDays ?? 180, always = opts.always || [];
    const names = new Set([...Object.keys(counts || {}), ...always]);
    const rows = [];
    for (const item of names) {
      const have = (counts || {})[item] || 0;
      if (have >= TIER.mm) continue;
      const pinned = always.includes(item);
      // opts.targetFor(item, have) -> "gm" | "mm" | null (e.g. only what the Tower needs); pinned ones always count
      let tier = opts.targetFor ? opts.targetFor(item, have) : have < TIER.gm ? "gm" : "mm";
      if (!tier && pinned) tier = have < TIER.gm ? "gm" : "mm";
      if (!tier) continue;
      const left = TIER[tier] - have;
      const t = grindTime(item, left, ctx);
      if (!pinned && !(t && t.days >= minDays)) continue;
      rows.push({ item, have, tier, target: TIER[tier], left, pinned, ...(t || { days: null, bottleneck: null, parts: [], untimed: [] }) });
    }
    return rows.sort((a, b) => (b.days ?? -1) - (a.days ?? -1));
  }

  // ---------- Silver goal: ways to earn silver, best first ----------
  // ctx = { coster, perDay, recipes, price: item -> your sell price (null if unknown), craftLevel, budget: {LN, AP, AC},
  //         fishing: [{ loc, perNet }] (unlocked places, silver per Large Net after perks) }.
  function silverWays(ctx) {
    const rows = [], budget = ctx.budget || {};
    for (const [item, r] of Object.entries(ctx.recipes.items)) {
      if (!r.craft || !r.recipe || (r.level || 1) > (ctx.craftLevel || 1)) continue;
      const price = ctx.price(item);
      if (!(price > 0)) continue;
      if (ctx.keep && ctx.keep(item)) continue;           // better used than sold (index.html keepFor)
      const u = ctx.coster.unit(item);
      if (!u) continue;
      // Crafts a day: each passive input and each budget is a limit; the tightest wins
      const lim = [];
      for (const [p, q] of Object.entries(u.passive)) lim.push({ by: p, kind: "prod", n: (ctx.perDay[p] || 0) / q });
      for (const [k, v] of Object.entries(u.byUnit)) lim.push({ by: k, kind: k, n: budget[k] > 0 ? budget[k] / v : null });
      const timed = lim.filter(x => x.n != null), worst = timed.reduce((a, x) => (!a || x.n < a.n ? x : a), null);
      const perUnit = Object.fromEntries(Object.entries(u.byUnit).map(([k, v]) => [k, price / v]));
      const untimed = lim.some(x => x.n == null);
      const perDay = worst && !untimed ? worst.n : null;
      rows.push({ kind: "craft", item, price, perDay, silverDay: perDay != null ? perDay * price : null, limit: worst, perUnit,
        uses: u.passive, units: u.byUnit, level: r.level || 1 });
    }
    for (const f of ctx.fishing || []) rows.push({ kind: "fish", loc: f.loc, perUnit: { LN: f.perNet }, silverDay: budget.LN > 0 ? budget.LN * f.perNet : null });
    return rows.filter(x => x.silverDay == null || x.silverDay > 0).sort((a, b) => (b.silverDay ?? -1) - (a.silverDay ?? -1));
  }

  const api = { DROP_HOURS, unitOf, perHourOf, entryOf, ratesPerHour, storeRates, migrateRates, productionMath, daysWithGrowingCap, whatIfEnv, silverWays, makesPerDay, grindTime, grindList, DEFAULT_PASSIVE, outletPlan, tripYield, tripBudgetFor, unitCostAt, towerPlan, towerSilver, akPlan, towerUses, effortOptions, bestEffort, makeCoster, seasonNote, placesUnlocked, itemMonths, DEFAULT_PERKS, TIER };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.FRP = Object.assign(root.FRP || {}, api);
})(typeof window !== "undefined" ? window : globalThis);
