// Run: node test/engine.test.js
const fs = require("fs"), path = require("path"), assert = require("assert");
const { parseMastery } = require("../parse.js");
const { towerPlan } = require("../engine.js");
const TOWER = require("../tower.js");

const r = parseMastery(fs.readFileSync(path.join(__dirname, "fixtures", "mastery-trimmed.txt"), "utf8"));
const p = towerPlan({ level: r.tower.level, ak: r.tower.ak, items: r.items, mmCount: r.totals.mm }, TOWER, 20);

assert.strictEqual(p.freeLevels, 6);                 // 221-226 need AK only
assert.strictEqual(p.akToClearFree, 558);            // 600 - 42 banked
assert.strictEqual(p.firstWall.level, 227);
assert.deepStrictEqual(p.firstWall.unmet.map(u => [u.item, u.left]), [["Shimmer Stone", 266952]]);
const w = p.walls.map(l => l.level);
assert.strictEqual(w[1], 235);                       // White Parchment
assert.ok(p.walls[1].unmet.some(u => u.item === "White Parchment"));
assert.deepStrictEqual(w.slice(0, 5), [227, 235, 236, 237, 238]);

// Early player: tower 120 with 3 MMs. L121 needs 6 MMs.
const e = towerPlan({ level: 120, ak: 250, items: {}, mmCount: 3 }, TOWER, 10);
assert.strictEqual(e.firstWall.level, 121);
assert.deepStrictEqual(e.firstWall.unmet[0], { kind: "mmCount", need: 6, have: 3, left: 3 });
assert.strictEqual(e.freeLevels, 0);

// Level 50: nothing but AK
const low = towerPlan({ level: 50, ak: 0, items: {}, mmCount: 0 }, TOWER, 20);
assert.strictEqual(low.firstWall, null);
assert.strictEqual(low.freeLevels, 20);
assert.strictEqual(low.akToClearFree, 2000);

// Stops at the end of the known table
assert.strictEqual(towerPlan({ level: 345, ak: 0, items: {}, mmCount: 0 }, TOWER, 30).levels.length, 5);
// AK planner: cover the 558 AK needed for the free levels
const { akPlan } = require("../engine.js");
const a = akPlan(r.items, { akTarget: p.akToClearFree, tower: TOWER, fromLevel: 220, skills: r.skills });
assert.deepStrictEqual(a.ranked.slice(0, 3).map(c => c.item), ["Cooking Pot", "Rucksack", "Apple Cider"]);
assert.strictEqual(a.akFromPicks, 560);             // trimmed fixture only has 560 AK of candidates in total
const lily = a.ranked.find(c => c.item === "Water Lily");
assert.deepStrictEqual(lily.tower, [{ level: 300, tier: "mm" }]);
assert.strictEqual(a.ranked.find(c => c.item === "Linked Lantern").tower[0].level, 332);
assert.ok(!a.ranked.some(c => c.item === "Shimmer Stone"));     // already past GM
assert.deepStrictEqual(a.other.map(o => o.source), ["Cooking to 99", "Mining to 99", "Daily chores"]);

// Effort (all perks on): fish in Large Nets, explore items in AP/AC
const { effortOptions, bestEffort } = require("../engine.js");
const DROPS = require("../drops.js");
const puffer = bestEffort("Puffer", 118825, DROPS);
assert.strictEqual(puffer.unit, "LN");
assert.strictEqual(puffer.loc, "Emerald Beach");
assert.ok(Math.abs(puffer.amount - 118825 * DROPS.items.Puffer.drops["Emerald Beach"].netR / 500) < 1e-6);
const usp = effortOptions("Unpolished Shimmer Stone", 1000, DROPS);
assert.strictEqual(usp[0].loc, "Mount Banon");
assert.ok(["AP", "AC"].includes(usp[0].unit));
assert.ok(Math.abs(usp[0].amount - 1000 * DROPS.items["Unpolished Shimmer Stone"].drops["Mount Banon"].DR / 1500) < 1e-6);
// Without perks it costs more
assert.ok(effortOptions("Unpolished Shimmer Stone", 1000, DROPS, {})[0].amount > usp[0].amount);
assert.strictEqual(bestEffort("Apple Cider", 3019, DROPS), null);                 // crafted: no drops
// Ranking with effort: known costs first, crafted items after
const a2 = akPlan(r.items, { tower: TOWER, fromLevel: 220, drops: DROPS, limit: 20 });
assert.strictEqual(a2.known[0].item, "Water Lily");
assert.ok(a2.unknown.some(c => c.item === "Cooking Pot"));

// Seasons and places (September)
const { seasonNote, placesUnlocked } = require("../engine.js");
const SEASONS = require("../seasons.js");
const sep = { month: 9, seasons: SEASONS };
assert.deepStrictEqual(seasonNote("Frozen Spyfish", DROPS, sep), [12, 1]);
assert.strictEqual(seasonNote("Frozen Spyfish", DROPS, { ...sep, month: 1 }), null);
assert.strictEqual(seasonNote("King Apple", DROPS, sep), null);                          // Apple Bobbing is open in September
assert.deepStrictEqual(seasonNote("King Apple", DROPS, { ...sep, month: 10 }), [9]);
assert.strictEqual(seasonNote("Puffer", DROPS, sep), null);
assert.strictEqual(seasonNote("Egg 05", DROPS, sep) === null, false);
// A closed place drops out of the options
assert.strictEqual(bestEffort("Puffer", 1000, DROPS, undefined, { ...sep, places: { "Emerald Beach": false } }), null);
// akPlan splits hidden and out-of-season items out of the ranking
const a3 = akPlan(r.items, { tower: TOWER, fromLevel: 220, drops: DROPS, where: sep, hidden: ["Water Lily"] });
assert.ok(a3.hidden.some(c => c.item === "Water Lily") && !a3.ranked.some(c => c.item === "Water Lily"));
// A brand-new player has no fishing spots beyond the ones with no items of their own
const fresh = placesUnlocked({}, DROPS, SEASONS);
assert.strictEqual(fresh["Emerald Beach"], false);
assert.strictEqual(placesUnlocked(r.items, DROPS, SEASONS)["Emerald Beach"], true);

// Recipe snapshot has the pieces batch 8 needs
const RECIPES = require("../recipes.js").items;
assert.deepStrictEqual(RECIPES["Apple Cider"].recipe, [["Apple", 40], ["Orange", 1], ["Glass Bottle", 1]]);
assert.ok(RECIPES["Small Bolt"].uses.some(([n]) => n === "Steel Plate"));

// Gather or craft (September, event places closed)
const { makeCoster } = require("../engine.js");
const C = makeCoster(DROPS, require("../recipes.js"), undefined, { month: 9, seasons: SEASONS, places: { "Apple Bobbing": false } });
const bolt = C.unit("Small Bolt");
assert.strictEqual(bolt.how, "craft");
assert.ok(bolt.alt && bolt.alt.how === "drop" && bolt.per < bolt.alt.per);          // crafting beats Jundland drops
assert.strictEqual(C.unit("Board").how, "passive");
assert.strictEqual(C.unit("Shimmer Stone").parts[0].item, "Unpolished Shimmer Stone");
// Resource Saver: 45% makes a craft cost 1/1.45 of its ingredients
const noSaver = makeCoster(DROPS, require("../recipes.js"), { resourceSaver: 0, ironDepot: true, runecube: true, lemonSqueezer: true, cinnamonSticks: true, reinforcedNetting: true, fishingTrawl: true }, { month: 9, seasons: SEASONS, places: {} });
assert.ok(Math.abs(noSaver.unit("Shimmer Stone").per / C.unit("Shimmer Stone").per - 1.45) < 1e-9);
assert.strictEqual(C.effort("Shimmer Stone", 1000).amount, C.unit("Shimmer Stone").per * 1000);

// Too slow on daily production: kept off the quick list
const a4 = akPlan(r.items, { tower: TOWER, fromLevel: 220, coster: C, where: sep, timeOf: e => e.item === undefined && e.passive && e.passive.Apple ? 999 : 0, slowHours: 168 });
assert.ok(a4.slow.some(c => c.item === "Apple Cider") && !a4.ranked.some(c => c.item === "Apple Cider"));

// Outlets: 44k Small Bolts overflow an 11,374 cap, so they go into a Tower item that uses them
const { outletPlan, towerUses } = require("../engine.js");
const oc = { recipes: require("../recipes.js"), coster: C, counts: {}, onHand: { "Small Bolt": 150 }, cap: 11374, towerUse: towerUses(TOWER, 220) };
const op = outletPlan("Small Bolt", 44544, oc);
assert.strictEqual(op.over, 150 + 44544 - 11374);
assert.ok(op.outlet && op.outlet.tower && op.outlet.crafts === Math.ceil(op.over / op.outlet.per));
assert.strictEqual(outletPlan("Wooden Bow", 45423, oc).end, "sell");               // nothing uses it, can't be mailed
assert.strictEqual(outletPlan("Small Bolt", 100, oc).over, 0);                     // fits: no plan needed

// Trips: 1,000 AP at Mount Banon brings home Unpolished Shimmer Stone in line with its drop rate
const { tripYield, tripBudgetFor } = require("../engine.js");
const trip = tripYield("Mount Banon", "AP", 1000, DROPS);
const uspPer = effortOptions("Unpolished Shimmer Stone", 1, DROPS).find(o => o.loc === "Mount Banon" && o.unit === "AP").amount;
assert.ok(Math.abs(trip["Unpolished Shimmer Stone"] - 1000 / uspPer) < 1e-6);
assert.ok(Math.abs(tripBudgetFor("Unpolished Shimmer Stone", 5000, "Mount Banon", "AP", DROPS) - 5000 * uspPer) < 1e-6);
// A 50% discount at a trip place halves that place's costs
const full = bestEffort("Unpolished Shimmer Stone", 1000, DROPS, undefined, { month: 9, seasons: SEASONS, places: {} });
const half = bestEffort("Unpolished Shimmer Stone", 1000, DROPS, undefined, { month: 9, seasons: SEASONS, places: {}, discount: { "Mount Banon": 0.5 } });
assert.ok(Math.abs(half.amount - full.amount / 2) < 1e-9 && half.discounted);

// Quest snapshot: chains link both ways, names are clean
const Q = require("../quests.js").quests;
assert.deepStrictEqual(Q["A Way Back XXVII"].next, ["A Way Back XXVIII"]);
assert.strictEqual(Q["A Way Back XXVIII"].pred, "A Way Back XXVII");
assert.ok(!Object.keys(Q).some(n => /<br/i.test(n)));

// Tower silver: level x 50M (1-100), 100M (101-199), 300M (200-300), 500M (301+)
const { towerSilver } = require("../engine.js");
assert.strictEqual(towerSilver(TOWER, 60), 3e9);
assert.strictEqual(towerSilver(TOWER, 101), 10.1e9);
assert.strictEqual(towerSilver(TOWER, 221), 66.3e9);
assert.strictEqual(towerSilver(TOWER, 301), 150.5e9);

console.log("engine tests passed");

// Daily production (made-up numbers): each drop is capped at the inventory cap; noon bonuses capped on their own
{
  const { productionMath, DROP_HOURS } = require("../engine.js");
  assert.strictEqual(DROP_HOURS.Coal, undefined);                       // coal is hourly
  const pm = productionMath({ production: { Wood: 600, Straw: 600, Eggs: 50 }, orchard: { Apple: { production: 900 } }, cap: 500, gap: 1 / 6, antlerNoon: 10, orchardNoon: 10 });
  assert.strictEqual(pm.usableRate("Wood", 600), 500);                   // hourly drop of 600, only 500 fit
  assert.strictEqual(pm.usableRate("Straw", 600), 600);                  // 100 every 10 minutes: all fit
  assert.strictEqual(pm.usableRate("Eggs", 50), 500 / 24);               // daily drop of 1,200, only 500 fit
  assert.strictEqual(pm.fruitPerDay("Apple"), 500 + 90);                 // midnight 900 -> 500, noon bonus 90
  assert.strictEqual(pm.usableRate("Antler", 100), (500 + 240) / 24);    // 2,400 a day -> 500, noon bonus 240
  const d = pm.perDay();
  assert.strictEqual(d.Wood, 500 * 24);
  assert.strictEqual(d.Apple, 590);
  // Checking only once a day: one cap for the drop and the noon bonus together
  assert.strictEqual(productionMath({ cap: 500, gap: 24 }).noonDay(900, 10), 500);
  // No cap known: nothing is lost
  assert.strictEqual(productionMath({ gap: 1 }).usableRate("Wood", 600), 600);
}

// Slow grinds (made-up coster and numbers): the slowest part sets the time
{
  const { grindTime, grindList, makesPerDay } = require("../engine.js");
  // Chum-like: 1 each of Worms, Grubs, Minnows per craft; Lure-like: AP only; Net-like: 25 Antlers each
  const units = {
    Chum: { per: 0, byUnit: {}, passive: { Worms: 1, Grubs: 1, Minnows: 1 }, how: "craft" },
    Lure: { per: 2, byUnit: { AP: 2 }, passive: {}, how: "drop" },
    Net: { per: 0, byUnit: {}, passive: { Antler: 25 }, how: "craft" },
    Mix: { per: 1, byUnit: { AP: 1 }, passive: { Wood: 10 }, how: "craft" }
  };
  const coster = { unit: n => units[n] || null,
    effort: (n, left) => units[n] ? { ...units[n], byUnit: Object.fromEntries(Object.entries(units[n].byUnit).map(([u, v]) => [u, v * left])),
      passive: Object.fromEntries(Object.entries(units[n].passive).map(([p, q]) => [p, q * left])) } : null };
  const perDay = { Worms: 1000, Grubs: 100, Minnows: 500, Antler: 2500, Wood: 1000 };
  const t = grindTime("Chum", 10000, { coster, perDay });
  assert.strictEqual(t.days, 100);                                       // Grubs: 10,000 / 100 a day
  assert.strictEqual(t.bottleneck.item, "Grubs");
  // AP with no budget: can't be timed, but still listed
  const l = grindTime("Lure", 1000, { coster, perDay });
  assert.strictEqual(l.days, null);
  assert.deepStrictEqual(l.untimed, [{ unit: "AP", need: 2000 }]);
  assert.strictEqual(grindTime("Lure", 1000, { coster, perDay, budget: { AP: 500 } }).days, 4);
  // Mixed: production 10 days, AP 1,000 / 50 = 20 days -> AP is the bottleneck
  const m = grindTime("Mix", 1000, { coster, perDay, budget: { AP: 50 } });
  assert.strictEqual(m.days, 20);
  assert.strictEqual(m.bottleneck.kind, "AP");
  assert.strictEqual(makesPerDay("Net", coster, perDay), 100);           // 2,500 Antlers / 25
  assert.strictEqual(makesPerDay("Lure", coster, perDay), null);
  // The list: Chum at 0 -> GM (100k) = 1,000 days, kept; Net at 990k -> MM, 10k left = 100 days, dropped unless pinned
  const rows = grindList({ Chum: 0, Net: 990000, Done: 1000000 }, { coster, perDay }, { minDays: 180, always: ["Net"] });
  assert.deepStrictEqual(rows.map(r => [r.item, r.tier, r.left, r.days, r.pinned]), [["Chum", "gm", 100000, 1000, false], ["Net", "mm", 10000, 100, true]]);
  assert.strictEqual(grindList({ Net: 990000 }, { coster, perDay }).length, 0);   // fast and not pinned
}

// What if: changed numbers flow into the usable amounts (made-up numbers)
{
  const { whatIfEnv, productionMath } = require("../engine.js");
  const env = { production: { Wood: 600 }, orchard: { Apple: { production: 900, trees: 100 } }, cap: 500, capPerDay: 10, gap: 1 };
  assert.strictEqual(whatIfEnv(env, {}).cap, 500);
  assert.strictEqual(whatIfEnv(env, { days: 30 }).cap, 800);             // 500 + 10 a day x 30
  assert.strictEqual(whatIfEnv(env, { days: 30, capPerDay: 20 }).cap, 1100);
  assert.strictEqual(whatIfEnv(env, { cap: 1000 }).cap, 1000);
  const w = whatIfEnv(env, { cap: 1000, prod: { Wood: 2000 }, fruit: { Apple: 1500 } });
  const pm = productionMath(w);
  assert.strictEqual(pm.usableRate("Wood", 2000), 1000);
  assert.strictEqual(pm.fruitPerDay("Apple"), 1000 + 150);
  assert.strictEqual(env.production.Wood, 600);                          // the original is untouched
}

// Silver ways (made-up recipes, prices and production): crafts limited by the scarcest input; fishing = per net x nets a day
{
  const { silverWays } = require("../engine.js");
  const recipes = { items: { Shield: { craft: true, level: 20, recipe: [["Plank", 2]] }, Pipe: { craft: true, level: 46, recipe: [["Wood", 1]] },
    Charm: { craft: true, level: 1, recipe: [["Gem", 1]] }, Soup: { cook: true, craft: false, level: 1, recipe: [["Wood", 1]] } } };
  const units = { Shield: { byUnit: {}, passive: { Board: 6 } }, Pipe: { byUnit: {}, passive: { Wood: 10, Stone: 2 } }, Charm: { byUnit: { AP: 4 }, passive: {} } };
  const coster = { unit: n => units[n] || null };
  const price = n => ({ Shield: 6800, Pipe: 8500, Charm: 1000, Soup: 50 })[n];
  const ctx = { coster, recipes, price, craftLevel: 30, perDay: { Board: 6000, Wood: 1000, Stone: 1000 }, budget: { LN: 100 }, fishing: [{ loc: "Lake", perNet: 300 }] };
  const rows = silverWays(ctx);
  // Shield: 6,000 Boards / 6 = 1,000 a day x 6,800; Pipe is level 46 (too high); Charm needs AP (no budget): untimed, last
  assert.deepStrictEqual(rows.map(r => [r.kind, r.item || r.loc, r.silverDay]), [["craft", "Shield", 6800000], ["fish", "Lake", 30000], ["craft", "Charm", null]]);
  assert.strictEqual(rows[2].perUnit.AP, 250);
  const rows2 = silverWays({ ...ctx, craftLevel: 50, budget: { LN: 100, AP: 40 } });
  assert.strictEqual(rows2.find(r => r.item === "Pipe").silverDay, 100 * 8500);   // Wood: 1,000 / 10 = 100 a day
  assert.strictEqual(rows2.find(r => r.item === "Pipe").limit.by, "Wood");
  assert.strictEqual(rows2.find(r => r.item === "Charm").silverDay, 10 * 1000);   // 40 AP / 4
  // keep: items better used than sold are left out (e.g. an ingredient of an unfinished mastery)
  const rows3 = silverWays({ ...ctx, keep: n => n === "Shield" });
  assert.deepStrictEqual(rows3.map(r => r.item || r.loc), ["Lake", "Charm"]);
}

// Upgrade prices: each new unit costs rate x the new amount (the player's samples)
{
  const { upgradeCost } = require("../upgrades.js");
  assert.strictEqual(upgradeCost("Grapes", 11000, 11001), 22002000);
  assert.strictEqual(upgradeCost("Grapes", 11000, 11004), 22002000 + 22004000 + 22006000 + 22008000);
  assert.strictEqual(upgradeCost("Steel", 1250, 1251), 375300000);
  assert.strictEqual(upgradeCost("Wood", 18000, 18000), 0);
  assert.strictEqual(upgradeCost("Antler", 1, 2), null);
}

// Growing cap: day d's cap = cap + capPerDay x d (made-up numbers)
{
  const { daysWithGrowingCap, grindTime } = require("../engine.js");
  const env = { production: { Eggs: 1000 / 24 }, cap: 500, gap: 1 };   // 1,000 Eggs a day in one drop; cap 500
  assert.strictEqual(daysWithGrowingCap(env, 0, "Eggs", 5000), 10);     // 500 a day, no growth
  // +100 a day: 500, 600, 700, 800, 900 (= 3,500 in 5 days), then 1,000 a day from day 5: 5,000 needs 1.5 more days
  assert.strictEqual(daysWithGrowingCap(env, 100, "Eggs", 5000), 6.5);
  assert.strictEqual(daysWithGrowingCap(env, 100, "Eggs", 1100), 2);    // 500 + 600
  // Through grindTime: the slowest part uses the growing cap
  const units = { Nog: { per: 0, byUnit: {}, passive: { Eggs: 1 }, how: "craft" } };
  const coster = { unit: n => units[n], effort: (n, left) => ({ ...units[n], passive: { Eggs: left } }) };
  const t = grindTime("Nog", 5000, { coster, perDay: { Eggs: 500 }, growth: { env, capPerDay: 100 } });
  assert.strictEqual(t.days, 6.5);
}

// Slow grinds: only Tower targets (targetFor); hand parts ignored for drink budgets
{
  const { grindList, makesPerDay } = require("../engine.js");
  const units = { Chum: { per: 0, byUnit: {}, passive: { Grubs: 1 }, how: "craft" }, Cider: { per: 1, byUnit: { AP: 0.1 }, passive: { Apple: 10 }, how: "craft" } };
  const coster = { unit: n => units[n] || null, effort: (n, left) => units[n] ? { ...units[n], byUnit: {}, passive: Object.fromEntries(Object.entries(units[n].passive).map(([p, q]) => [p, q * left])) } : null };
  const perDay = { Grubs: 10, Apple: 1000 };
  // Chum needs only a GM for the Tower; it's already past the GM -> left out. Cider pinned -> kept.
  const rows = grindList({ Chum: 200000, Cider: 0 }, { coster, perDay }, { minDays: 1, always: ["Cider"], targetFor: (n, have) => n === "Chum" && have < 100000 ? "gm" : null });
  assert.deepStrictEqual(rows.map(r => r.item), ["Cider"]);
  assert.strictEqual(makesPerDay("Cider", coster, perDay), null);       // needs AP for Glass
  assert.strictEqual(makesPerDay("Cider", coster, perDay, true), 100);  // fruit only: 1,000 Apples / 10
}

// Production units: stored as the game states it ({ n, per }); the math reads per hour through one conversion
{
  const { ratesPerHour, storeRates, migrateRates, perHourOf, unitOf } = require("../engine.js");
  assert.strictEqual(unitOf("Antler"), "day"); assert.strictEqual(unitOf("Wood"), "hour");
  const stored = storeRates({ Antler: 1000, Wood: 500 });                 // per hour in -> natural units out
  assert.deepStrictEqual(stored, { Antler: { n: 24000, per: "day" }, Wood: { n: 500, per: "hour" } });
  assert.deepStrictEqual(ratesPerHour(stored), { Antler: 1000, Wood: 500 });
  assert.deepStrictEqual(migrateRates({ Antler: 1000, Wood: { n: 500, per: "hour" } }), stored);   // old saves: bare numbers per hour
  assert.strictEqual(perHourOf({ n: 54210, per: "day" }), 2258.75);       // a daily drop is never read as hourly
}
