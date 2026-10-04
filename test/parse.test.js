// Run: node test/parse.test.js
const fs = require("fs"), path = require("path"), assert = require("assert");
const { parseMastery } = require("../parse.js");

const text = fs.readFileSync(path.join(__dirname, "fixtures", "mastery-trimmed.txt"), "utf8");
const r = parseMastery(text);

assert.deepStrictEqual(r.tower, { ak: 42, level: 220 });
assert.deepStrictEqual(r.totals, { m: 231, gm: 159, mm: 64 });
assert.deepStrictEqual(r.skills, { Farming: 99, Fishing: 99, Crafting: 99, Exploring: 99, Cooking: 57, Mining: 31 });
assert.strictEqual(r.items["Apple Cider"], 82194);
assert.strictEqual(r.items["Shimmer Stone"], 733048);
assert.strictEqual(r.items["Board"], 64800208);
assert.strictEqual(r.items["Sol Orb"], 7);
assert.strictEqual(Object.keys(r.items).length, 49);
assert.deepStrictEqual(r.collapsed, []);
assert.ok(r.looksLikeMastery);

// Single-line paste (phone browsers) still finds items via pass 2
const flat = parseMastery(text.replace(/\s+/g, " "));
assert.strictEqual(flat.items["Apple Cider"], 82194);
assert.strictEqual(flat.items["Frozen Catfish"], undefined);
assert.deepStrictEqual(flat.tower, { ak: 42, level: 220 });

// Collapsed tier is flagged
const col = parseMastery("Tier III (M) chevron_right\nTier IV (GM) chevron_down\nApple Cider\n1 / 100,000 Progress");
assert.deepStrictEqual(col.collapsed, ["Tier III (M)"]);

// Crop plots: from the next row's price, else the Plant All button; never from the seed list (made-up numbers)
{
  const { parseFarm } = require("../parse.js");
  const home = ["Nothing Selected Beet (9906)Broccoli (777)Gold Pepper (412)", "CropsPlant All", "Selected[GJ (6.6K)](x)",
    "[14 Left Today](x)", "Corn (40)", "Around Your Farm", "* [Sawmill](x)", "[Produces Boards/Wood hourly](x)", "[1,000 Boards](x)"];
  assert.strictEqual(parseFarm(home.join("\n")).plots, 40);
  assert.strictEqual(parseFarm(home.concat(["* [Grow more crops](x)", "[Adds another row of crops](x)", "[100.0T  Silver](x)"]).join("\n")).plots, 52);
  assert.strictEqual(parseFarm("Plant All Selected Leek (36) Drink Veg Juice").plots, 36);
  assert.strictEqual(parseFarm("Plant All Selected Nothing Selected Gold Pepper (412)").plots, undefined);
}

console.log("parse tests passed");
