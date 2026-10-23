// Pets: every pet's items (four from level 1, four more from level 3, four more from level 6), the game's My Pets order,
// and how many of each item a pet brings a day. Hand-kept from the Library (knowledge/mechanics/pets.md, data/pets.md).
(function (root) {
  const ORDER = ["Cat", "Dog", "Squirrel", "Owl", "Swine", "Snake", "Lemur", "Baboon", "Frog", "Hedgehog", "Fox", "Armadillo", "Spider",
    "Pet Rock", "Bird", "Penguin", "Green Dragon", "Red Dragon", "Blue Dragon", "Bear", "Capybara", "Strange Onion", "Seal", "Critter", "Miner",
    "Polar Bear", "Hummingbird", "Shark", "Wolf"];
  // Seasonal pets gather only part of the year: not counted as daily production
  const SEASONAL = ["Polar Bear", "Hummingbird", "Shark", "Wolf"];
  // The Miner's items aren't in the Library's list yet
  const ITEMS = {
    "Cat": [["Drum", "Crappie", "Feathers", "Carp"], ["Blue Catfish", "Blue Shell", "Bluegill", "Blue Feathers"], ["Pearl", "Gold Feather", "Globber", "Shinefish"]],
    "Dog": [["Wood", "Stone", "Fish Bones", "Bone"], ["Unpolished Shimmer Stone", "Horn", "Antler", "Rope"], ["Amethyst", "Cogwheel", "Small Spring", "Large Clam Shell"]],
    "Squirrel": [["Mushroom", "Fern Leaf", "Purple Flower", "Acorn"], ["Arrowhead", "Leather", "Coin Purse", "Ancient Coin"], ["4-leaf Clover", "Dice", "Runestone 20", "Gold Crab"]],
    "Owl": [["Apple", "Orange", "Lemon", "Hide"], ["Eggs", "Bird Egg", "Grapes", "Honey"], ["Prism Shard", "Gold Cucumber", "Runestone 11", "Goldfish"]],
    "Swine": [["Coal", "Carbon Sphere", "3-leaf Clover", "Green Dye"], ["Hammer", "Axe", "Shovel", "Ladder"], ["Steak", "Steel", "Moonstone", "Jade"]],
    "Snake": [["Iron", "Hops", "Glass Orb", "Horseshoe"], ["Bucket", "Shimmer Quartz", "Steel", "Wizard Hat"], ["Wine", "Gold Carrot", "Runestone 15", "Skull Coin"]],
    "Lemur": [["Snail", "Caterpillar", "Fire Ant", "Giant Centipede"], ["Shiny Beetle", "Horned Beetle", "Spider", "Ruby Scorpion"], ["Amber", "Dragonfly", "Cyclops Spider", "Grasshopper"]],
    "Baboon": [["Corn", "Glass Bottle", "Sturdy Shield", "Shimmer Topaz"], ["Lemonade", "Bone Fish", "Cotton", "Gold Eggplant"], ["Grape Juice", "Runestone 03", "Gold Peppers", "Redgill"]],
    "Frog": [["Peas", "Cucumber", "Hops", "Cabbage"], ["Green Chromis", "Puffer", "Green Jellyfish", "Skipjack"], ["Runestone 05", "Gold Feather", "Runestone 19", "Gold Leaf"]],
    "Hedgehog": [["Cabbage", "Explosive", "Straw", "Cheese"], ["Orange Juice", "Twine", "Gold Cucumber", "Broccoli"], ["Runestone 07", "Gold Peas", "Green Shield", "Torch Fish"]],
    "Armadillo": [["Board", "Feathers", "Iron Ring", "Iron Cup"], ["Mushroom Paste", "Leather", "Steel", "Magna Quartz"], ["Small Spring", "Small Screw", "Small Gear", "Steel Wire"]],
    "Spider": [["Eggplant", "Amethyst", "Emberstone", "Giant Centipede"], ["Ruby Ring", "Emerald Ring", "Mystic Ring", "Shimmer Ring"], ["Runestone 05", "Runestone 10", "Runestone 15", "Runestone 20"]],
    "Bird": [["Clownfish", "Fishing Net", "Eye Patch", "Plumbfish"], ["Pirate Flag", "Pirate Bandana", "Large Chest 02", "Blue Dye"], ["Skeleton Key", "Crab Claw", "Large Net", "Anglerfish"]],
    "Penguin": [["Marlin", "Skipjack", "Seahorse", "Octopus"], ["Giant Squid", "Blue Tiger Fish", "Fluorifish", "Barracuda"], ["Swordfish", "Sea Catfish", "Serpent Eel", "Ruby Coral"]],
    "Green Dragon": [["Runestone 01", "Runestone 02", "Runestone 03", "Runestone 04"], ["Runestone 05", "Runestone 06", "Runestone 07", "Runestone 08"], ["Runestone 09", "Runestone 10", "Runestone 11", "Runestone 12"]],
    "Red Dragon": [["Runestone 13", "Slimestone", "Unpolished Garnet", "Sour Root"], ["Runestone 14", "Runestone 16", "Green Cloak", "Lantern"], ["Runestone 17", "Runestone 18", "Salt", "Herbs"]],
    "Blue Dragon": [["Runestone 01", "Runestone 02", "Runestone 04", "Runestone 06"], ["Runestone 08", "Runestone 09", "Runestone 13", "Runestone 14"], ["Lava Sphere", "Runestone 16", "Runestone 18", "Runestone 19"]],
    "Bear": [["Crappie", "Trout", "Honey", "Small Key"], ["Square Key", "Medium Chest 02", "Sunflower", "Grab Bag 04"], ["Inferno Sphere", "Treasure Key", "Large Chest 01", "Grab Bag 05"]],
    "Capybara": [["Cabbage", "Gold Peas", "Broccoli", "Beet"], ["Orange Juice", "Lemonade", "Water Lily", "Apple Cider"], ["Herbs", "Grab Bag 04", "Grab Bag 05", "Grab Bag 07"]],
    "Strange Onion": [["Tomato", "Onion", "Hops", "Potato"], ["Leek", "Watermelon", "Corn", "Cabbage"], ["Pumpkin", "Broccoli", "Mega Sunflower Seeds", "Mega Beet Seeds"]],
    "Fox": [["Lemon Quartz", "Leather", "Cotton", "Green Cloak"], ["Runestone 12", "Pine Tree", "Peach", "Canoe"], ["Diamond", "Runestone 17", "Treasure Key", "Skeleton Key"]],
    "Seal": [["Runestone 06", "Moonstone", "Snowball", "Blue Purse"], ["Iced Tea", "Seaweed", "Mittens", "Rice"], ["Blue Gel", "Gold Sea Crest", "Frost Snapper Shell", "Glacierstone"]],
    "Critter": [["Onion", "Leek", "Herbs", "Cooking Pot"], ["Sweet Root", "Flour", "Salt", "Pie Pan"], ["Peach", "Corn Oil", "Bone Broth", "Butter"]],
    "Polar Bear": [["Frozen Peas", "Frozen Catfish", "Frozen Bones", "Frozen Radish"], ["Frozen Squid", "Frozen Sheepshead", "Frozen Boot", "Frozen Tomato"], ["Frozen Pine", "Frozen Crab Claw", "Frozen Corn", "Cooked Fish"]],
    "Hummingbird": [["Purple Flower", "3-leaf Clover", "Yellow Flowers", "Orange Flowers"], ["4-leaf Clover", "Spring Seeds", "Blue Flowers", "White Flowers"], ["Oak", "Red Flowers", "Potted Flower", "Honeysuckle"]],
    "Shark": [["Starfish", "Shrimp", "Red Starfish", "Barnacle Shell"], ["Puffer", "Ruby Coral", "Purple Butterfly Fish", "Sea Urchin"], ["Marlin", "Large Clam Shell", "Large Net", "Ghost Jelly"]],
    "Wolf": [["Feathers", "Pumpkin", "Bone", "Bitten Apple"], ["Acorn", "Straw", "Blue Feathers", "Fall Leaves"], ["Gold Leaf", "Striped Feather", "Green Rubee", "Raw Meat"]]
  };
  // Average of each unlocked item per day by level (Library: Pet Shop); past 10, +2 a level is a guess
  const EACH = [0, 6, 12, 9, 12, 15, 12, 14, 16, 18, 20];
  const each = level => level <= 10 ? EACH[level] || 0 : 20 + 2 * (level - 10);
  const groups = level => level >= 6 ? 3 : level >= 3 ? 2 : level >= 1 ? 1 : 0;
  // Items a day from your pets' levels ({ pet: level } -> { item: per day }); the Owl's Honey doubles from level 6.
  // Seasonal pets and pets without a known item list are left out.
  function perDay(levels) {
    const out = {};
    for (const [pet, level] of Object.entries(levels || {})) {
      const g = ITEMS[pet];
      if (!g || !(level > 0) || SEASONAL.includes(pet)) continue;
      for (const item of g.slice(0, groups(level)).flat()) {
        const n = each(level) * (pet === "Owl" && item === "Honey" && level >= 6 ? 2 : 1);
        out[item] = (out[item] || 0) + n;
      }
    }
    return out;
  }
  const PETS = { ORDER, SEASONAL, ITEMS, perDay };
  if (typeof module !== "undefined" && module.exports) module.exports = PETS;
  else root.PETS = PETS;
})(typeof window !== "undefined" ? window : globalThis);
