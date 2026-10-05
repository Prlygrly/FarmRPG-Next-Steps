// Base sell prices (before sell perks and mastery bonuses), the same for every player. Worked out from a player's
// Farmer's Market page (stack value / count, whole numbers only) plus a few from item pages; see knowledge/mechanics/silver.md.
// A Market paste can still add items missing here. Which items are worth selling is decided in index.html (keepFor).
(function (root) {
  const PRICES = { sell: {
    "Acorn Butter": 6000, "Amethyst Necklace": 800, "Anglerfish": 350000, "Aquamarine Ring": 750, "Arrowhead": 150,
    "Awl": 500, "Barbed Wire": 20000, "Barracuda": 5000, "Blue Catfish": 75, "Blue Milk": 25000, "Blue Purse": 110000,
    "Blue Sea Bass": 300, "Blue Shell": 75, "Blue Tiger Fish": 1500, "Bluegill": 75, "Bone Fish": 50, "Bottle Rocket": 150,
    "Broom": 300, "Bucket": 90, "Bullfish": 10890, "Butter": 60000, "Butter Churn": 500, "Cannon": 110000, "Canoe": 200000,
    "Carp": 75, "Catfish": 75, "Clam Shell": 100, "Clownfish": 150, "Coin Purse": 250, "Conch Shell": 100,
    "Concord Grape Pie": 25000000, "Crab": 8500, "Crappie": 15, "Crossbow": 125000, "Crowfish": 10285, "Drum": 12,
    "Emerald Ring": 2500, "Fancy Clock": 250000, "Fancy Drum": 100000, "Fancy Guitar": 65000, "Fancy Pan Flute": 125000,
    "Fancy Pipe": 5000, "Fancy Sword": 200000, "Fancy Table": 1250000, "Fancy Violin": 1500000, "Fish Bones": 2,
    "Flamejack": 3250, "Flarefin": 6500, "Flier": 250, "Fluorifish": 2500, "Flying Machine": 1500000, "Frosteye": 9075,
    "Garnet Ring": 30000, "Gazebo": 210000, "Giant Squid": 5000, "Glassback": 11495, "Globber": 1000,
    "Grand Piano": 2000000, "Green Barracuda": 9000, "Green Chromis": 25, "Green Cloak": 125000, "Green Diary": 150,
    "Green Halite Ring": 12000, "Green Jellyfish": 800, "Green Top Hat": 125000, "Horseshoe": 1000, "Hourglass": 25000,
    "Ice Shark": 14300, "Iron Cup": 165, "Jade Charm": 15000, "Jellyfish": 400, "Jumbo Fish": 10000, "Ladder": 500,
    "Lantern": 40000, "Large Clam Shell": 250000, "Largemouth Bass": 14, "Leather Helmet": 15000, "Lemon Quartz Ring": 1500,
    "Linked Lantern": 100000, "Mackerel": 500, "Magicite": 25000, "Marlin": 800, "MIAB": 2000, "Milk Carton": 5000,
    "Mulberry Snapper": 9500, "Mussel": 400, "Nailed Board": 10, "Oak Table": 28000, "Octopus": 3000, "Orcafish": 11000,
    "Pair of Boots": 210000, "Pearl": 300, "Pearl Necklace": 1000, "Plumbfish": 4000, "Puffer": 400, "Purple Bag": 105000,
    "Purple Butterfly Fish": 7500, "Purple Diary": 150, "Red Berry Pie": 20000000, "Red Brick": 53500, "Red Shield": 100000,
    "Red Starfish": 500, "Red Trunk": 200000, "Redgill": 5500, "Reinforced Helmet": 95000, "Ruby Coral": 15000,
    "Ruby Fish": 1000, "Ruby Ring": 2000, "Rucksack": 227000, "Salt": 50000, "Sand": 500, "Scissors": 1750,
    "Sea Catfish": 4500, "Sea Crest": 12100, "Seahorse": 2500, "Seeker": 13310, "Serpent Eel": 10000, "Shimmer Ring": 5000,
    "Shinefish": 250000, "Skipjack": 500, "Small Prawn": 20, "Speckled Grouper": 10500, "Spiral Shell": 3000, "Spoon": 7500,
    "Starfish": 110, "Step Ladder": 30000, "Stingray": 400, "Stone Jelly": 12705, "Sturdy Bow": 80000, "Sturdy Box": 275,
    "Sturdy Shield": 4000, "Sunfish": 50, "Swordfish": 5500, "Toilet Paper": 3000, "Torch Fish": 2500,
    "Treasure Chest": 7500, "Trout": 35, "Wagon Wheel": 1750, "Witch's Broom": 12500, "Wizard Hat": 3300,
    "Wooden Barrel": 315, "Wooden Bow": 2500, "Wooden Box": 165, "Wooden Button": 550, "Wooden Shield": 500,
    "Wooden Spear": 1800, "Wooden Table": 250, "Yellow Perch": 12
  } };
  if (typeof module !== "undefined" && module.exports) module.exports = PRICES;
  else root.PRICES = PRICES;
})(typeof window !== "undefined" ? window : globalThis);
