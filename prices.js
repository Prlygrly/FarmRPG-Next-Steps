// Base sell prices (before sell perks and mastery bonuses). Hand-kept from the player's Market page and item pages;
// see knowledge/mechanics/silver.md. Raw materials (Wood, Board, Wooden Plank, Stone) are left out on purpose:
// they're always crafted into something before selling.
(function (root) {
  const PRICES = { sell: {
    "Iron Cup": 165, "Awl": 500, "Wooden Button": 550, "Sturdy Shield": 4000, "Fancy Pipe": 5000, "Lantern": 40000,
    "Lemon Quartz Ring": 1500, "Emerald Ring": 2500, "Shimmer Ring": 5000, "Barbed Wire": 20000, "MIAB": 2000,
    "Wooden Bow": 2500, "Linked Lantern": 100000, "Blue Purse": 110000, "Crossbow": 125000
  } };
  if (typeof module !== "undefined" && module.exports) module.exports = PRICES;
  else root.PRICES = PRICES;
})(typeof window !== "undefined" ? window : globalThis);
