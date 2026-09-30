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
