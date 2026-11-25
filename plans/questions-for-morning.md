# Open questions for the player (updated 2026-11-24)

Answered questions are removed; their answers live in knowledge/.

## Questions

### Mining (built 2026-11-24, pushed 2026-11-25)
1. **How does auto-excavation split its items?** buddy.farm only has manual "hits per drop" rates per floor band. The Mining tab
   assumes AEX gives the same mix (each item weighted by 1 / rate), e.g. Spring Cave floor 100: Esperium 43%, Briomine 17% ...
   Fossilized Print 3%. If you watch your AEX haul for a day, compare it with the tab's "Drops at your floors" list.
   **Answered 2026-11-25:** keep the estimate; the tab now warns that drop rates are estimates.
2. **Lanterns:** the tab shows pickaxes a day with and without lanterns (a lantern = 50% chance not to use pickaxes, read as
   "half"). Does the Mine/zone page show loaded lanterns anywhere? If so, paste it and the tab can use your real number.
   **Answered 2026-11-25:** the zone page shows Loaded and Save Chance (1% per 10 loaded, max 50%), but a copy doesn't include them.
   The tab now states the real rule and shows pickaxes a day at 0% and 50%.
3. **Floor 100 to 109:** the tab takes AEX as floor / 10 rounded down (floor 105 = 10 items a run). Right?
4. **Charms:** only the zone's own page shows "Charms Active"; otherwise the tab counts charms in your inventory. Paste each
   zone's page once (or your inventory) for the right numbers. Fine, or should Setup ask for them?
5. **Save code / QR:** the Mine paste isn't in the save code yet (other devices won't have it). Add it?
6. **Tab bar:** with Mining added, the tab row wraps to two lines on narrow screens (Setup and Reference drop down). OK, or
   shorten some names?
7. **Mining in Next steps:** quest items that can't be costed now say "mine it: <zone> ..." on the Quests tab and in
   Next steps. Mining isn't in the effort maths (AP/AC/LN), so those quests still rank as "can't cost". Want mining time
   counted as effort somehow?

## Waiting on data

### Animal building prices
Chicken Coop, Pasture and other animal buildings have no prices in the planner (the Raptor Pen has none to buy). The
player will paste the Pig Pen after the next slaughter (pig prices, an example with pricing) plus the Coop and Pasture
pages, so we can work out what a priced page looks like. Then Slow grinds' Maxed line can price them.

### Page copies for the local page tests
Paste each page twice, once from the browser and once from the Steam app (say which). Saved copies live in
test/pages/ (local only; usernames, farm name and farm id replaced) and are checked by test/pages.test.js.

Done: Mine page (browser) and a zone page (Steam), Craftworks (browser, Nov 2026 layout), Pig Pen, Bank, Temple of Reward, Town (opened from another page), My Farm with all buildings done, My Inventory, Orchard, All Pet Items, Steak Market, mastery page, My Farm with buildings still to do, Town with places still to do, Farm Supply upgrades (browser + Steam each).

Still to paste:
- [ ] My Inventory: a filtered copy from Steam, and a plain copy (no links)
- [ ] A building page (Storehouse, Farmhouse, Sawmill…)
- [ ] Exploring info (the "stamina every time you continue exploring" page)
- [ ] Perks page (Farm Supply in Town, the perks list)
- [ ] Friendship / Townsfolk levels, and your profile page
- [ ] Quests / Help Needed
- [ ] One Personal Help Request page
- [ ] Home (tower, Ancient Knowledge, skills)

### Shelved
- Base sell prices for locked items: the Farmer's Market shows values only for unlocked items, so the 455 locked ones
  without a price in prices.js stay unpriced. Selling is a last resort; the important prices are stored. Players are no
  longer asked to paste the Market (a pasted one is still read).

### Page tests (local only, gitignored)
test/pages/*.txt are the player's real copies with usernames, farm name and farm id swapped by test/pages/scrub.js;
test/pages.test.js checks detection and key values for each and runs with the other tests. Extracting a paste from the
session log (C:/Users/prlyg/.claude/projects/D--Claude/<session>.jsonl) and scrubbing it: node test/pages/extract.js <session .jsonl> "<marker>|<marker2>" raw.txt (extract-all.js saves every pasted block of one message), then
node test/pages/scrub.js raw.txt test/pages/<page>.<browser|steam>[.variant].txt <farm name> [pig name].
