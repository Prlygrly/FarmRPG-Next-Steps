// Base sell prices (before sell perks and mastery bonuses), the same for every player. Worked out from a player's
// Farmer's Market page (stack value / count, whole numbers only) plus a few from item pages; see knowledge/mechanics/silver.md.
// A Market paste can still add items missing here. Which items are worth selling is decided in index.html (keepFor).
(function (root) {
  const PRICES = { sell: {
    "Acorn Butter": 6000, "Amethyst Necklace": 800, "Anglerfish": 350000, "Aquamarine Ring": 750, "Arrowhead": 150,
    "Awl": 500, "Barbed Wire": 20000, "Blue Milk": 25000, "Blue Purse": 110000, "Bottle Rocket": 150, "Broom": 300,
    "Bucket": 90, "Butter": 60000, "Butter Churn": 500, "Cannon": 110000, "Canoe": 200000, "Coin Purse": 250,
    "Concord Grape Pie": 25000000, "Crossbow": 125000, "Emerald Ring": 2500, "Fancy Clock": 250000, "Fancy Drum": 100000,
    "Fancy Guitar": 65000, "Fancy Pan Flute": 125000, "Fancy Pipe": 5000, "Fancy Sword": 200000, "Fancy Table": 1250000,
    "Fancy Violin": 1500000, "Flying Machine": 1500000, "Garnet Ring": 30000, "Gazebo": 210000, "Grand Piano": 2000000,
    "Green Cloak": 125000, "Green Diary": 150, "Green Halite Ring": 12000, "Green Top Hat": 125000, "Horseshoe": 1000,
    "Hourglass": 25000, "Iron Cup": 165, "Jade Charm": 15000, "Ladder": 500, "Lantern": 40000, "Large Clam Shell": 250000,
    "Leather Helmet": 15000, "Lemon Quartz Ring": 1500, "Linked Lantern": 100000, "Magicite": 25000, "MIAB": 2000,
    "Milk Carton": 5000, "Nailed Board": 10, "Oak Table": 28000, "Pair of Boots": 210000, "Pearl Necklace": 1000,
    "Purple Bag": 105000, "Purple Diary": 150, "Red Berry Pie": 20000000, "Red Brick": 53500, "Red Shield": 100000,
    "Red Trunk": 200000, "Reinforced Helmet": 95000, "Ruby Ring": 2000, "Rucksack": 227000, "Salt": 50000, "Sand": 500,
    "Scissors": 1750, "Shimmer Ring": 5000, "Shinefish": 250000, "Spoon": 7500, "Step Ladder": 30000, "Sturdy Bow": 80000,
    "Sturdy Box": 275, "Sturdy Shield": 4000, "Toilet Paper": 3000, "Treasure Chest": 7500, "Wagon Wheel": 1750,
    "Witch's Broom": 12500, "Wizard Hat": 3300, "Wooden Barrel": 315, "Wooden Bow": 2500, "Wooden Box": 165,
    "Wooden Button": 550, "Wooden Shield": 500, "Wooden Spear": 1800, "Wooden Table": 250
  } };
  if (typeof module !== "undefined" && module.exports) module.exports = PRICES;
  else root.PRICES = PRICES;
})(typeof window !== "undefined" ? window : globalThis);
