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

// Building pages: each one's own sentence, read per hour (daily / 24); the farm sidebar on the same page doesn't win
{
  const { parseBuilding, detectPage } = require("../parse.js");
  const side = "Around Your Farm\n* [Sawmill](x)\n[Produces Boards/Wood hourly](x)\n[today](x)\n";
  const pages = {
    "Chicken Coop": ["Currently, your chicken coop is producing 2,400 eggs and 2,400 feathers per day.", { Eggs: 100, Feathers: 100 }],
    "Cow Pasture": ["Currently, your cow pasture is producing 480 milk per day.", { Milk: 20 }],
    "Raptor Pen": ["Currently, your Raptor Pen is producing 4,800 antlers and 2,400 steak kabobs per day.", { Antler: 200, "Steak Kabob": 100 }],
    "Worm Habitat": ["Your worm habitat will generate fishing bait every hour. Currently generating 300 per hour. About gummy worms Your worm habitat will generate gummy worms every hour. Currently generating 20 per hour. About mealworms Your worm habitat will generate Mealworms every hour. Currently generating 10 per hour.", { Worms: 300, "Gummy Worms": 20, Mealworms: 10 }],
    "Trout / Bait Farm": ["Your trout farm will generate trout every day. Currently generating 240 per day. Grub Production In addition, the trout farm produces grubs every hour that can be used in fishing. Currently generating 50 per hour. Minnow Production The trout farm also produces minnows every hour that can be used in fishing. Currently generating 40 per hour.", { Trout: 10, Grubs: 50, Minnows: 40 }],
    "Vineyard": ["Your vineyard will generate grapes every day. Currently generating 720 per day.", { Grapes: 30 }],
    "Sawmill": ["Your sawmill will generate boards every hour. Currently generating 600 per hour. Wood Production Your sawmill will generate wood every hour. Currently generating 700 per hour.", { Board: 600, Wood: 700 }],
    "Ironworks": ["Currently generating 5 Iron and 15 Nails every 3 minutes. (100 Iron and 300 Nails hourly)", { Iron: 100, Nails: 300 }],
    "Steelworks": ["Currently generating 25 Steel and 8 Steel Wire every 60 minutes.", { Steel: 25, "Steel Wire": 8 }],
    "Hay Field": ["Currently generating 100 Straw every 10 minutes. (600 Straw hourly)", { Straw: 600 }],
    "Quarry": ["Your quarry will generate regular stone and sandstone every 10 minutes. Currently generating 50 every 10 minutes. (300 hourly). About coal production Your quarry will generate coal every hour. Currently generating 40 per hour.", { Stone: 300, Sandstone: 300, Coal: 40 }]
  };
  for (const [name, [sentence, want]] of Object.entries(pages)) {
    const t = side + "About the page\n" + sentence;
    assert.strictEqual(detectPage(t), "building", name);
    const r = parseBuilding(t);
    assert.deepStrictEqual(r.buildings, [name]);
    assert.deepStrictEqual(r.rates, want, name);
  }
  const store = side + "Right now, it will increase by 5 each time you work. Currently your MAX Inventory is 1,234.";
  assert.strictEqual(detectPage(store), "building");
  assert.strictEqual(parseBuilding(store).cap, 1234);
}

console.log("parse tests passed");
