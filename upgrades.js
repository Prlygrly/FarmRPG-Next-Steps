// Building upgrade prices, from the player's samples (2026-10-05): the price of each new unit of production is a fixed rate
// x the new amount (Vineyard 11,000 -> 11,001 costs 2,000 x 11,001 = 22,002,000). So going from A to B costs
// rate x (A+1 + ... + B) = rate x (B(B+1) - A(A+1)) / 2. Amounts are in each building's own unit (see `per`).
// See knowledge/mechanics/building-upgrades.md.
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
    Minnows: { rate: 5000, per: "hour" }
  };
  // Silver to go from `from` to `to` units (in the building's own unit)
  const upgradeCost = (item, from, to) => {
    const u = UPGRADES[item];
    if (!u || !(to > from)) return u ? 0 : null;
    return u.rate * (to * (to + 1) - from * (from + 1)) / 2;
  };
  const api = { UPGRADES, upgradeCost };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.UPGRADES = api;
})(typeof window !== "undefined" ? window : globalThis);
