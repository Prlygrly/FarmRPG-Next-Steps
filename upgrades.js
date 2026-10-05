// Building upgrade prices: each new unit costs rate x the new amount, so A -> B costs rate x (B(B+1) - A(A+1)) / 2.
// Amounts in each building's own unit (`per`). knowledge/mechanics/building-upgrades.md
(function (root) {
  const UPGRADES = {
    Grapes: { rate: 2000, per: "day" },          // Vineyard
    Worms: { rate: 250, per: "hour" },           // Worm Habitat
    "Gummy Worms": { rate: 25000, per: "hour" },
    Mealworms: { rate: 10000, per: "hour" },
    Board: { rate: 1500, per: "hour" },          // Sawmill
    Wood: { rate: 1000, per: "hour" },
    Straw: { rate: 10000, per: "10 minutes" },   // Hay Field
    Steel: { rate: 300000, per: "hour" },        // Steelworks (Steel Wire = Steel / 3, rounded)
    Trout: { rate: 150, per: "day" },            // Trout / Bait Farm
    Grubs: { rate: 1000, per: "hour" },
    Minnows: { rate: 5000, per: "hour" },
    Stone: { rate: 15000, per: "10 minutes" },   // Quarry (Sandstone follows Stone)
    Coal: { rate: 25000, per: "hour" },
    Iron: { rate: 10000, per: "3 minutes" }      // Ironworks: each step is +1 Iron and +3 Nails
  };
  // Hours in each unit, for converting a per-hour rate into the building's own unit
  const PER_HOURS = { day: 24, hour: 1, "10 minutes": 1 / 6, "3 minutes": 1 / 20 };
  // Silver to go from `from` to `to` units (in the building's own unit)
  const upgradeCost = (item, from, to) => {
    const u = UPGRADES[item];
    if (!u || !(to > from)) return u ? 0 : null;
    return u.rate * (to * (to + 1) - from * (from + 1)) / 2;
  };
  const api = { UPGRADES, PER_HOURS, upgradeCost };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.UPGRADES = api;
})(typeof window !== "undefined" ? window : globalThis);
