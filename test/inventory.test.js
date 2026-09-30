// Run: node test/inventory.test.js
const fs = require("fs"), path = require("path"), assert = require("assert");
const { parseInventory, detectPage } = require("../parse.js");

const text = fs.readFileSync(path.join(__dirname, "fixtures", "inventory-trimmed.txt"), "utf8");
const inv = parseInventory(text);

assert.strictEqual(inv.cap, 9850);
assert.strictEqual(Object.keys(inv.items).length, 8);
assert.deepStrictEqual(inv.items["Board"], { count: 9850, id: 21, atMax: true, mastery: "mm" });
assert.deepStrictEqual(inv.items["Apple Cider"], { count: 2745, id: 379, atMax: false, mastery: "m" });
assert.deepStrictEqual(inv.items["Mushroom Stew"], { count: 111, id: 634, atMax: false, mastery: null });
assert.strictEqual(inv.items["Use a Heart-shaped Gem"], undefined);   // not an item.php link

// Plain-text copy (links stripped) gives the same counts, without ids
const plain = parseInventory(text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1"));
assert.strictEqual(plain.cap, 9850);
assert.strictEqual(Object.keys(plain.items).length, 8);
assert.deepStrictEqual(plain.items["Large Net"], { count: 9850, id: null, atMax: true, mastery: "gm" });
assert.strictEqual(plain.items["Shimmer Stone"].count, 4);

// Page detection
assert.strictEqual(detectPage(text), "inventory");
assert.strictEqual(detectPage(fs.readFileSync(path.join(__dirname, "fixtures", "mastery-trimmed.txt"), "utf8")), "mastery");
assert.strictEqual(detectPage("Active Requests (16)\nA Way Back XXVII"), "quests");
assert.strictEqual(detectPage("hello"), null);

// Orchard page
const { parseOrchard } = require("../parse.js");
const orch = "About the orchard\nTrees (16,830)\n\n5,600\nApple Trees\n\n7,300\n Production\n(With Perks)\n\n Apples\nin Inventory:\n9,850\n\n5,610\nOrange Trees\n\n7,310\n Production\n(With Perks)\n\n5,620\nLemon Trees\n\n7,320\n Production\n(With Perks)";
assert.deepStrictEqual(parseOrchard(orch), { Apple: { trees: 5600, production: 7300 }, Orange: { trees: 5610, production: 7310 }, Lemon: { trees: 5620, production: 7320 } });
assert.strictEqual(detectPage(orch), "orchard");

// Farm page: every building's output as an hourly rate
const { parseFarm } = require("../parse.js");
const farmText = fs.readFileSync(path.join(__dirname, "fixtures", "farm-trimmed.txt"), "utf8");
assert.strictEqual(detectPage(farmText), "farm");
const farm = parseFarm(farmText);
assert.strictEqual(farm.Iron, 10000);             // 500 every 3 minutes
assert.strictEqual(farm.Nails, 30000);
assert.strictEqual(farm.Straw, 52800);            // the "Hourly" figure, not the 10-minute one
assert.strictEqual(farm.Stone, 9600);
assert.strictEqual(farm.Coal, 1200);
assert.strictEqual(farm.Board, 14400);
assert.strictEqual(farm["Steel Wire"], 333);
assert.strictEqual(farm.Grapes, 8800 / 24);
assert.strictEqual(farm.Antler, 40800 / 24);
assert.strictEqual(farm.Apple, 7300 / 24);
assert.strictEqual(farm["Gummy Worms"], 800);
// (plots need the crop area of the page, which the trimmed fixture leaves out)
assert.strictEqual(parseFarm(["Harvest All", "CropsPlant All", "Selected", "Leek (36)", "Around Your Farm"].join(String.fromCharCode(10))).plots, 36);
// Plain-text copy works the same
assert.deepStrictEqual(parseFarm(farmText.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")), farm);

// Help Needed page
const { parseQuests } = require("../parse.js");
const qText = fs.readFileSync(path.join(__dirname, "fixtures", "quests-trimmed.txt"), "utf8");
assert.strictEqual(detectPage(qText), "quests");
const qs = parseQuests(qText);
assert.strictEqual(qs.length, 11);
assert.deepStrictEqual(qs[0], { name: "Zap of the Sting V", section: "special", npc: null, kind: null, ready: false, dates: "Sep 21 - Sep 30" });
assert.deepStrictEqual(qs.find(q => q.name.startsWith("Pleasantly")).name, "Pleasantly Arbitrating Misconstrued Relational Affronts, Troubles Skirted I");
assert.strictEqual(qs.find(q => q.name === "Spirit of the Cards I").ready, true);
assert.strictEqual(qs.find(q => q.name === "Look, A Secret Temple").kind, "main");
assert.strictEqual(qs.find(q => q.name === "Chickens Come Home To Roost III").kind, "side");
assert.strictEqual(qs.find(q => q.name === "Items Wanted").section, "personal");
// Other dash characters still mark main/side quests
const dash = parseQuests(["Active Requests (2)", "Look, A Secret Temple", "Request from Lorn – Main Quest", "Chickens Come Home To Roost III", "Request from ROOMBA — Side Request"].join(String.fromCharCode(10)));
assert.deepStrictEqual(dash.map(q => [q.npc, q.kind]), [["Lorn", "main"], ["ROOMBA", "side"]]);
// Every non-personal quest name matches the quest data
const QD = require("../quests.js").quests;
assert.deepStrictEqual(qs.filter(q => q.section !== "personal" && !QD[q.name]).map(q => q.name), []);
// Plain-text copy too
assert.deepStrictEqual(parseQuests(qText.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")), qs);

// Perks and Farm Supply pages -> settings
const { parsePerks, perkSettings } = require("../parse.js");
const perksText = fs.readFileSync(path.join(__dirname, "fixtures", "perks-trimmed.txt"), "utf8");
const supplyText = fs.readFileSync(path.join(__dirname, "fixtures", "supply-trimmed.txt"), "utf8");
assert.strictEqual(detectPage(perksText), "perks");
assert.strictEqual(detectPage(supplyText), "supply");
const ps = perkSettings(parsePerks(perksText));
assert.deepStrictEqual(ps, { cropGrowthCut: 60, cornGrowthCut: 20, resourceSaver: 10, cookFaster: 0, doublePrizes: 40, wanderer: 33, fishingTrawl: true });
const ss = perkSettings(parsePerks(supplyText));
assert.strictEqual(ss.cropGrowthCut, 30);
assert.strictEqual(ss.resourceSaver, 35);
assert.strictEqual(ss.grapeJuice, 14);        // (1 + 1 + 2 + 3) x 2; the "on sale" copy of the Fountain isn't counted twice
assert.strictEqual(parsePerks(supplyText).unlocked.filter(u => u.name === "Grape Juice Fountain").length, 1);
assert.ok(!parsePerks(supplyText).unlocked.some(u => /Upgrades on Sale/.test(u.name)));
assert.strictEqual(ss.orchardNoon, 10);
assert.ok(ss.reinforcedNetting && ss.lemonSqueezer && ss.cinnamonSticks && ss.autoBuyIronNails);

assert.strictEqual(perkSettings({ page: "supply", unlocked: [{ name: "Hotter Ovens I", desc: "Cooking is 10% faster" }] }).cookFaster, 10);
assert.strictEqual(perkSettings({ page: "supply", unlocked: [{ name: "Extra Wish", desc: "An extra toss into the Well daily" },
  { name: "Extra Wishes", desc: "+5 tosses into the Well daily" }, { name: "Extra Wishes II", desc: "+10 tosses into the Well daily" },
  { name: "Extra Wishes III", desc: "+10 tosses into the Well daily" }] }).wwTosses, 29);
assert.strictEqual(ss.wwTosses >= 3, true);

console.log("inventory tests passed");
