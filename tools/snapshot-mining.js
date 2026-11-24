// Snapshot mining zones into mining.js: buddy.farm's vein drop rates per floor band, plus the facts buddy.farm doesn't have,
// copied from the in-game Library (Mining, Mining Drops, Mining Floor Rewards; pasted 2026-11-23). knowledge/mechanics/mining.md
// Run: node tools/snapshot-mining.js   (6 requests)
// Rates are buddy.farm's "hits per drop" for manual mining, per floor band (a band applies from its floor up to the next one).
const fs = require("fs"), path = require("path");
const BASE = "https://buddy.farm/page-data";
const slug = name => name.toLowerCase().replace(/[.]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const get = async url => { const r = await fetch(url); if (!r.ok) throw new Error(`${r.status} ${url}`); return r.json(); };

// Library facts. deposits: single white tiles, [min, max] each, not changed by floor, perks or charms.
// rewards: floor -> [[item, qty], ...], claimed on the zone's info page.
const r = s => s.split(", ").map(x => { const m = x.match(/^(\d+)x (.+)$/); return [m[2], +m[1]]; });
const LATE = (charm, bag) => ({
  600: r(`1x ${charm}, 50x Arnold Palmer, 50x Apple Cider`), 1000: r(`4x ${charm}, 500x ${bag}, 15x Bomb`),
});
const ZONES = {
  "Spring Cave": { level: 1, pickaxe: "Pickaxe", lantern: "Lantern", charm: "Spring Cave Charm",
    deposits: { "Ancient Coin": [1, 100], "Aquamarine": [1, 250], "Bone Pickaxe": [1, 50], "Coal": [1, 250] },
    rewards: { 10: r("50x Mushroom Paste, 25x Briomine, 25x Calcifite"), 25: r("50x Bone Fragments, 50x Unpolished Aquacite, 50x Cave Mushroom"),
      50: r("1x Maverick Chip, 50x Aquacite, 50x Esperium"), 100: r("1x Spring Cave Charm, 25x Mining Bag 01, 5x Bomb"),
      150: r("50x Bird Skull 01, 50x Green Halite, 50x Briomine"), 200: r("1x Spring Cave Charm, 50x Mining Bag 01, 50x Fossilized Print"),
      250: r("25x Void Bag 01, 1x Buddy Doll Bag 01, 1x Buddy Doll Bag 02"), 300: r("1x Spring Cave Charm, 1x Drink Bundle, 1x Tackle Box"),
      400: r("1x Spring Cave Charm, 100x Bird Skull 01, 100x Briomine"), 500: r("3x Spring Cave Charm, 100x Mining Bag 01, 100x Fossilized Print"),
      700: r("1x Spring Cave Charm, 250x Mining Bag 01, 250x Orange Juice"), 800: r("1x Spring Cave Charm, 500x Mining Bag 01, 250x Aquacite"),
      900: r("1x Spring Cave Charm, 500x Mining Bag 01, 250x Esperium"), ...LATE("Spring Cave Charm", "Mining Bag 01") } },
  "Highland Hollow": { level: 10, pickaxe: "Bone Pickaxe", lantern: "Lantern", charm: "Highland Hollow Charm",
    deposits: { "Amethyst": [1, 10], "Carbon Sphere": [1, 100], "Crystal Pickaxe": [1, 50], "Magicite": [1, 10], "Mining Bag 01": [1, 15], "Monster Skull": [1, 1] },
    rewards: { 10: r("50x Bone, 25x Fairy Crystal, 25x Plum Ore"), 25: r("50x Lapis Lazuli, 50x Bone 02, 50x Purple Mushroom"),
      50: r("1x Maverick Chip, 50x Oceanite, 50x Fossilized Frog"), 100: r("1x Highland Hollow Charm, 25x Mining Bag 02, 5x Bomb"),
      150: r("50x Ram Skull 01, 50x Bone 02, 50x Bone 03"), 200: r("1x Highland Hollow Charm, 50x Mining Bag 02, 50x Purple Mushroom"),
      250: r("25x Void Bag 01, 50x Grab Bag 01, 50x Grab Bag 02"), 300: r("1x Highland Hollow Charm, 50x Plum Ore, 100x Bone Pickaxe"),
      400: r("1x Highland Hollow Charm, 100x Ram Skull 01, 100x Oceanite"), 500: r("3x Highland Hollow Charm, 100x Mining Bag 02, 100x Fossilized Frog"),
      700: r("1x Highland Hollow Charm, 250x Mining Bag 02, 250x Lapis Lazuli"), 800: r("1x Highland Hollow Charm, 500x Mining Bag 02, 250x Fairy Crystal"),
      900: r("1x Highland Hollow Charm, 500x Mining Bag 02, 250x Bone 03"), ...LATE("Highland Hollow Charm", "Mining Bag 02") } },
  "Sol Grotto": { level: 20, pickaxe: "Crystal Pickaxe", lantern: "Lantern", charm: "Sol Grotto Charm",
    deposits: { "Amber": [1, 2], "Lapis Lazuli": [1, 25], "Magna Quartz": [1, 25], "Mining Bag 02": [1, 15], "Moonstone": [1, 10], "Sturdy Pickaxe": [1, 50], "Unpolished Jade": [1, 10] },
    rewards: { 10: r("50x Pickaxe, 25x Orange Calcite, 25x Sunstone"), 25: r("50x Stone Shell, 50x Red Mushrooms, 50x Purple Mushroom"),
      50: r("1x Maverick Chip, 50x Fire Crystal, 50x Fossilized Frog"), 100: r("1x Sol Grotto Charm, 25x Mining Bag 03, 5x Bomb"),
      150: r("50x Sunstone, 50x Sol Orb, 50x Stone Shell"), 200: r("1x Sol Grotto Charm, 50x Mining Bag 03, 50x Red Mushrooms"),
      250: r("50x Grab Bag 01, 50x Grab Bag 02, 50x Grab Bag 03"), 300: r("1x Sol Grotto Charm, 50x Sunstone, 100x Bone Pickaxe"),
      400: r("1x Sol Grotto Charm, 100x Fossilized Leaf, 100x Fire Crystal"), 500: r("3x Sol Grotto Charm, 100x Mining Bag 03, 100x Fossilized Frog"),
      700: r("1x Sol Grotto Charm, 250x Mining Bag 03, 250x Stone Shell"), 800: r("1x Sol Grotto Charm, 500x Mining Bag 03, 250x Orange Calcite"),
      900: r("1x Sol Grotto Charm, 500x Mining Bag 03, 250x Bone 04"), ...LATE("Sol Grotto Charm", "Mining Bag 03") } },
  "Ember Caverns": { level: 30, pickaxe: "Sturdy Pickaxe", lantern: "Linked Lantern", charm: "Ember Caverns Charm",
    deposits: { "Diamond": [1, 1], "Egg of Shadow": [1, 1], "Emberstone": [1, 50], "Grab Bag 03": [1, 5], "Mining Bag 03": [1, 15], "Salt Rock": [1, 25], "Steel Pickaxe": [1, 50], "Stone Shell": [1, 25], "Treasure Key": [1, 1] },
    rewards: { 10: r("50x Pickaxe, 25x Unpolished Flarite, 25x Embershard"), 25: r("50x Magmastone, 50x Bone 05, 50x Pitviper Tail"),
      50: r("1x Maverick Chip, 50x Unpolished Flarite, 50x Fossilized Shell"), 100: r("1x Ember Caverns Charm, 25x Mining Bag 04, 5x Bomb"),
      150: r("50x Embershard, 50x Bone 05, 50x Brain Fungus"), 200: r("1x Ember Caverns Charm, 50x Mining Bag 04, 50x Pitviper Tail"),
      250: r("2x Fish Flakes, 50x Grab Bag 01, 50x Grab Bag 02"), 300: r("1x Ember Caverns Charm, 50x Embershard, 100x Steel Pickaxe"),
      400: r("1x Ember Caverns Charm, 100x Magmastone, 100x Unpolished Flarite"), 500: r("3x Ember Caverns Charm, 100x Mining Bag 04, 100x Fossilized Shell"),
      700: r("1x Ember Caverns Charm, 250x Mining Bag 04, 250x Magmastone"), 800: r("1x Ember Caverns Charm, 500x Mining Bag 04, 250x Unpolished Flarite"),
      900: r("1x Ember Caverns Charm, 500x Mining Bag 04, 250x Brain Fungus"), ...LATE("Ember Caverns Charm", "Mining Bag 04") } },
  "Fenrir's Den": { level: 40, pickaxe: "Steel Pickaxe", lantern: "Linked Lantern", charm: "Fenrir's Den Charm",
    deposits: { "Bone Fragments": [1, 25], "Flarite": [1, 25], "Heavy Pickaxe": [1, 50], "Mining Bag 04": [1, 6], "Orange Gecko": [1, 3] },
    rewards: { 10: r("50x Pickaxe, 25x Mossy Stone, 25x Blood Crystal"), 25: r("50x Unpolished Pyrite, 50x Bone 06, 50x Nightshade Cap"),
      50: r("1x Maverick Chip, 50x Mossy Stone, 50x Rune Shard"), 100: r("1x Fenrir's Den Charm, 25x Mining Bag 05, 5x Bomb"),
      150: r("50x Unpolished Pyrite, 50x Bone 06, 50x Jadeite"), 200: r("1x Fenrir's Den Charm, 50x Mining Bag 05, 50x Nightshade Cap"),
      250: r("2x Fish Flakes, 50x Grab Bag 01, 50x Grab Bag 02"), 300: r("1x Fenrir's Den Charm, 50x Blood Crystal, 100x Heavy Pickaxe"),
      400: r("1x Fenrir's Den Charm, 100x Unpolished Pyrite, 100x Unpolished Flarite"), 500: r("3x Fenrir's Den Charm, 100x Mining Bag 05, 100x Rune Shard"),
      700: r("1x Fenrir's Den Charm, 250x Mining Bag 05, 250x Unpolished Pyrite"), 800: r("1x Fenrir's Den Charm, 500x Mining Bag 05, 250x Broken Bangle"),
      900: r("1x Fenrir's Den Charm, 500x Mining Bag 05, 250x Fenrir's Coin"), ...LATE("Fenrir's Den Charm", "Mining Bag 05") } },
  "Mossrock Mine": { level: 50, pickaxe: "Heavy Pickaxe", lantern: "Glowing Lantern", charm: "Mossrock Mine Charm",
    deposits: { "Ancient Pickaxe": [1, 50], "Lobster": [1, 1], "Mining Bag 05": [1, 6], "Model Ship": [1, 1], "Mossy Stone": [1, 25], "Pyrite": [1, 25] },
    rewards: { 10: r("50x Pickaxe, 25x Gravicite, 25x Veinshard"), 25: r("50x Unpolished Peridot, 50x Mossy Bone, 50x Mossroom"),
      50: r("1x Maverick Chip, 50x Gravicite, 50x Ancient Rune"), 100: r("1x Mossrock Mine Charm, 25x Mining Bag 06, 5x Bomb"),
      150: r("50x Unpolished Peridot, 50x Mossy Bone, 50x Green Gel"), 200: r("1x Mossrock Mine Charm, 50x Mining Bag 06, 50x Mossroom"),
      250: r("1x Protein Bar, 50x Grab Bag 03, 50x Grab Bag 08"), 300: r("1x Mossrock Mine Charm, 50x Veinshard, 100x Ancient Pickaxe"),
      400: r("1x Mossrock Mine Charm, 100x Unpolished Peridot, 100x Gravity Orb"), 500: r("3x Mossrock Mine Charm, 100x Mining Bag 06, 100x Ancient Rune"),
      700: r("1x Mossrock Mine Charm, 250x Mining Bag 06, 250x Unpolished Peridot"), 800: r("1x Mossrock Mine Charm, 500x Mining Bag 06, 250x Fossilized Viper"),
      900: r("1x Mossrock Mine Charm, 500x Mining Bag 06, 250x Mossy Cog"), ...LATE("Mossrock Mine Charm", "Mining Bag 06") } },
};
// Items per vein by floor before perks and charms: [from floor, min, max]. Effective Mining I and II and each zone charm add +1.
const VEIN = [[1, 1, 5], [10, 1, 7], [100, 1, 9], [1000, 1, 11], [10000, 1, 13]];
// Mining skill level rewards (Library: Skill Level Rewards): level -> { silver, items }
const SKILL = { 10: { silver: 15000, items: r("100x Bone Pickaxe, 10x Bomb") }, 20: { silver: 75000, items: r("50x Crystal Pickaxe, 10x Bomb") },
  30: { silver: 125000, items: r("50x Sturdy Pickaxe, 10x Bomb") }, 40: { silver: 500000, items: r("25x Steel Pickaxe, 10x Bomb") },
  50: { silver: 2500000, items: r("5x Spring Cave Charm, 5x Highland Hollow Charm, 5x Sol Grotto Charm") },
  60: { silver: 10000000, items: r("5x Ember Caverns Charm, 5x Fenrir's Den Charm, 5x Mossrock Mine Charm") } };

(async () => {
  const zones = {};
  for (const [name, z] of Object.entries(ZONES)) {
    const l = (await get(`${BASE}/l/${slug(name)}/page-data.json`)).result.data.farmrpg.locations[0];
    const bands = l.dropRates.filter(v => v.miningFloor != null).sort((a, b) => a.miningFloor - b.miningFloor).map(v => ({
      floor: v.miningFloor, silver: Math.round(v.silverPerHit), xp: Math.round(v.xpPerHit),
      items: Object.fromEntries(v.items.map(d => [d.item.name, +d.rate.toPrecision(4)]).sort((a, b) => a[1] - b[1])),
    }));
    zones[name] = { ...z, bands };
    console.log(name, bands.map(b => `${b.floor}:${Object.keys(b.items).length}`).join(" "));
  }
  const out = path.join(__dirname, "..", "mining.js");
  fs.writeFileSync(out, `// Generated by tools/snapshot-mining.js on ${new Date().toISOString().slice(0, 10)} (buddy.farm rates + the in-game Library). Do not edit by hand.\n` +
    `// MINING.zones[name] = { level, pickaxe, lantern, charm, deposits, rewards, bands: [{ floor, silver, xp, items: { name: hits per drop } }] }\n` +
    `(function (root) {\n  const MINING = ${JSON.stringify({ zones, vein: VEIN, skill: SKILL })};\n` +
    `  if (typeof module !== "undefined" && module.exports) module.exports = MINING;\n  else root.MINING = MINING;\n` +
    `})(typeof window !== "undefined" ? window : globalThis);\n`);
  console.log(`wrote mining.js: ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
})();
