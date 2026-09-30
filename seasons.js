// Time-locked places and items. Months are 1-12. There's no complete official list, so this stays small
// and the page's Hide button covers the rest. Add to it as players report things.
(function (root) {
  const SEASONS = {
    locs: {
      "Apple Bobbing": [9],
      "Haunted House": [10],
      "Santa's Workshop": [12]
    },
    items: [
      { match: "^Frozen ", months: [12, 1] },          // frozen fish and crops: while the ponds are frozen
      { name: "Snowball", months: [12, 1] },
      { name: "Snowman", months: [12, 1] },
      { name: "Valentines Card", months: [2] },
      { name: "Heart Necklace", months: [2] },
      { name: "Green Top Hat", months: [3] },
      { name: "Shamrock Milk", months: [3] },
      { match: "^Egg \\d+$", months: [4] },           // hand painted Easter eggs
      { name: "Crunchy Omelette", months: [4] },
      { name: "Glass Eyes", months: [4] },
      { name: "Piñata Whop Stick", months: [5] },     // FarmRPG birthday event
      { name: "Blue Milk", months: [5] },
      { name: "Milk Carton", months: [5, 8] },         // birthday event and back to school
      { name: "Toilet Paper", months: [8, 10] },
      { name: "QED Cell", months: [10] },              // Halloween
      { name: "Witch's Broom", months: [10] },
      { name: "Witch's Brew", months: [10] },
      { name: "Pumpkin Spiced Milk", months: [10] },
      { name: "Spooky Scarecrow", months: [10] },
      { name: "11th Leaf Centerpiece", months: [11] }, // Thanksgiving
      { name: "Christmas Tree", months: [12] },
      { name: "Holiday Wreath", months: [12] },
      { name: "Snow Globe", months: [12, 1] },
      { name: "Yule Goat", months: [12] },
      { name: "Ugly Buddy Sweater", months: [12] },
      { name: "Festive Eggnog", months: [12, 1] },
      { name: "Red Velvet Cake", months: [5] }
    ]
  };
  if (typeof module !== "undefined" && module.exports) module.exports = SEASONS;
  else root.SEASONS = SEASONS;
})(typeof window !== "undefined" ? window : globalThis);
