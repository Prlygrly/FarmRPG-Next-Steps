// Recipes buddy.farm doesn't list (yet): seasonal items whose recipe is hidden outside their event. Hand-kept from the
// player's crafting screen. Loaded after recipes.js; an entry is skipped once buddy.farm's snapshot has its own recipe.
// extra[name] = { craft, cook, level, mail, recipe: [[ingredient, qty]] }
(function (root) {
  const EXTRA = {
    "Spooky Scarecrow": { craft: true, cook: false, level: 80, mail: false,
      recipe: [["Straw", 10], ["White Parchment", 8], ["Nails", 4], ["Board", 2], ["Red Twine", 2], ["Wizard Hat", 1], ["Jack-o-lantern", 1], ["Sewing Needle", 1]] }
  };
  function addTo(R) {
    for (const [name, x] of Object.entries(EXTRA)) {
      const cur = R.items[name];
      if (cur && cur.recipe) continue;                                   // buddy.farm has it now
      R.items[name] = { ...(cur || {}), ...x };
      for (const [ing, qty] of x.recipe) {
        const it = (R.items[ing] ||= {});
        it.uses = (it.uses || []).filter(([p]) => p !== name).concat([[name, qty]]);
      }
    }
    return R;
  }
  if (typeof module !== "undefined" && module.exports) module.exports = { EXTRA, addTo };
  else if (root.RECIPES) addTo(root.RECIPES);
})(typeof window !== "undefined" ? window : globalThis);
