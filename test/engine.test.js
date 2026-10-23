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

// Quarry and Ironworks upgrade prices (the player's samples): rate x the new amount
{
  const { upgradeCost } = require("../upgrades.js");
  assert.strictEqual(upgradeCost("Stone", 2000, 2001), 30015000);
  assert.strictEqual(upgradeCost("Coal", 1501, 1502), 37550000);
  assert.strictEqual(upgradeCost("Iron", 500, 501), 5010000);
}

// Produced items with a crafting route (Steel): the budget's crafts a day add to the building's rate
{
  const { grindTime } = require("../engine.js");
  const units = { Crossbow: { byUnit: {}, passive: { Steel: 2 } } };
  const coster = { effort: (n, left) => ({ byUnit: {}, passive: { Steel: 2 * left }, how: "craft" }), unit: n => units[n],
    active: n => n === "Steel" ? { byUnit: { AP: 5 }, passive: { Iron: 10 } } : null };
  const ctx = { coster, perDay: { Steel: 100, Iron: Infinity }, budget: { AP: 500 } };
  assert.strictEqual(grindTime("Crossbow", 1000, ctx).days, 2000 / 100);                          // Steelworks only
  // Steel is the slowest part: craft x so Steelworks (2,000 - x at 100 a day) and the AP (5x at 500 a day) finish together:
  // (2000 - x) / 100 = 5x / 500 -> x = 1000, 10 days; the AP spent shows up as the job's own AP part
  const t = grindTime("Crossbow", 1000, { ...ctx, craftToo: ["Steel"] });
  assert.ok(Math.abs(t.days - 10) < 0.01 && Math.abs(t.parts[0].crafted - 1000) < 1);
  assert.ok(Math.abs(t.parts.find(x => x.kind === "AP").need - 5000) < 5);
}

// Bacon from pigs: 25 at level 5, 35 at level 6; 1,850 XP a day reaches level 5 on day 7, level 6 on day 10
{
  const { baconPlan, baconEach } = require("../engine.js");
  const { total } = require("../levels.js");
  assert.deepStrictEqual([4, 5, 6, 20].map(baconEach), [0, 25, 35, 175]);
  const a = baconPlan(500, { batch: 20, xpPerDay: 1850, levelXp: total });
  assert.deepStrictEqual([a.pigs, a.rounds, a.regrow, a.days], [20, 1, 7, 1]);
  const b = baconPlan(1200, { batch: 20, xpPerDay: 1850, levelXp: total });   // 48 pigs: 3 rounds, two regrows
  assert.deepStrictEqual([b.pigs, b.perRound, b.rounds, b.days], [48, 20, 3, 15]);
  const c = baconPlan(1200, { batch: 20, xpPerDay: 1000, levelXp: total, at: 6 });   // no XP perks: level 6 on day 18
  assert.deepStrictEqual([c.pigs, c.rounds, c.regrow, c.days], [35, 2, 18, 19]);
  assert.strictEqual(baconPlan(500, { batch: 0, levelXp: total }), null);
}

// Exploring drinks, the player's Forest check: EE 104, Cinnamon Sticks, Lemon Squeezer, Wanderer 33%; 6 / 40 / 10 gold per 1,000
{
  const { drinkValue } = require("../engine.js");
  const rows = drinkValue({ base: 1 / 3, ee: 104, cinnamon: true, lemon: true, wanderer: 33, price: { AP: 0.04, AC: 0.01, OJ: 0.006 } });
  const by = Object.fromEntries(rows.map(r => [r.kind, r]));
  assert.deepStrictEqual(rows.map(r => r.kind), ["AP", "AC", "OJ"]);
  assert.strictEqual(by.AC.explores, 2550);
  assert.ok(Math.abs(by.AC.ojPerAC - 17.085) < 0.01 && Math.abs(by.AC.items - 1020) < 1e-9);
  assert.ok(Math.abs(by.AP.perGold - 12500) < 1e-6 && Math.round(by.AC.perGold) === 9066 && Math.round(by.OJ.perGold) === 8292);
  const n = drinkValue({ base: 1 / 3, ee: 104, cinnamon: true, lemon: true, wanderer: 33, neigh: true, price: { AP: 0.04, AC: 0.01, OJ: 0.006 } });
  assert.ok(Math.abs(n.find(r => r.kind === "AC").ojPerAC - 13.668) < 0.01);   // Neigh: 20% less stamina
}

// Cider at a place uses its EE (1 when not pasted): EE 104 with Cinnamon Sticks explores 2,550 times, the minimum 1,263
{
  const { ciderExplores } = require("../engine.js");
  assert.strictEqual(ciderExplores("Forest", { cinnamonSticks: true, ee: { Forest: 104 } }), 2550);
  assert.strictEqual(ciderExplores("Small Cave", { cinnamonSticks: true, ee: { Forest: 104 } }), 1263);
  assert.strictEqual(ciderExplores("Forest", { cinnamonSticks: false }), 1010);
}

// Bacon never past your space: 300 room = 12 pigs at level 5; under 25 room = full
{
  const { baconPlan } = require("../engine.js");
  const { total } = require("../levels.js");
  const a = baconPlan(1000, { batch: 20, xpPerDay: 1850, levelXp: total, room: 300 });
  assert.deepStrictEqual([a.pigs, a.short, a.rounds], [12, 700, 1]);
  assert.strictEqual(baconPlan(1000, { batch: 20, xpPerDay: 1850, levelXp: total, room: 20 }).full, true);
  assert.strictEqual(baconPlan(100, { batch: 20, xpPerDay: 1850, levelXp: total, room: 5000 }).pigs, 4);
}

// Pig pen model: 16 lowest pigs at the start of level 4 reach level 6 after ceil((17750 - 7250) / 1850) = 6 days
{
  const { pigPen } = require("../engine.js");
  const { total } = require("../levels.js");
  const model = { day: 100, xp: [...Array(16).fill(total[3]), ...Array(10).fill(total[21])] };
  const o = { xpPerDay: 1850, levelXp: total, batch: 16, at: 6 };
  assert.strictEqual(pigPen(model, { ...o, today: 100 }).inDays, 6);
  assert.strictEqual(pigPen(model, { ...o, today: 105 }).slaughter, 0);
  const d = pigPen(model, { ...o, today: 106 });
  assert.deepStrictEqual([d.slaughter, d.bacon], [16, 560]);                       // the big pigs never count
  assert.strictEqual(pigPen(model, { ...o, today: 106, room: 200 }).slaughter, 5);  // only what the Bacon space holds
}

// Craftworks day: Coal -> Black Powder (3:1) -> Explosive (2 Black Powder + others), cap 1,000, visits spread over 16 hours
{
  const { craftworksDay, craftworksMax } = require("../engine.js");
  const list = [{ item: "Black Powder", recipe: [["Coal", 3]], makes: 1 }, { item: "Explosive", recipe: [["Black Powder", 2], ["Feathers", 1]], makes: 1 }];
  const o = { raw: "Coal", dropHours: 1, cap: 1000, target: "Explosive", list };
  // Little Coal: everything is crafted, nothing voids; 6 Coal per Explosive
  const low = craftworksDay({ ...o, perHour: 60, checks: 4 });
  assert.strictEqual(Math.round(low.voided), 0);
  assert.strictEqual(Math.round(low.used), 1440);
  assert.strictEqual(Math.round(low.made), 240);
  // One visit a day: at most one inventory of Explosives (and of Feathers) a day, so ~6,000 Coal is all a day can use
  const one = craftworksMax({ ...o, checks: 1 });
  assert.ok(one.made <= 1000.5 && one.made > 950, `one visit: ${one.made}`);
  assert.ok(one.used <= 6003 && one.used > 5700, `one visit coal: ${one.used}`);
  // More visits use more, up to one full drop of Coal an hour
  const four = craftworksMax({ ...o, checks: 4 });
  assert.ok(four.used > one.used * 3, `four visits: ${four.used}`);
  assert.ok(four.perHour <= 1000.5, "never more than a cap per drop");
  // No recipe uses it: each visit uses what's on hand, so a day uses at most one cap per visit
  const hand = craftworksMax({ ...o, list: [], checks: 4 });
  assert.ok(hand.used <= 4000.5 && hand.used > 3800, `by hand: ${hand.used}`);
}
