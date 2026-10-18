# Open questions for the player (updated 2026-10-17)

Answered questions are removed; their answers live in knowledge/.

## Questions
(none open)

## Waiting on data

### Page copies for the local page tests
Paste each page twice, once from the browser and once from the Steam app (say which). Saved copies live in
test/pages/ (local only; usernames, farm name and farm id replaced) and are checked by test/pages.test.js.

Done: Pig Pen, Bank, Temple of Reward, Town (opened from another page), My Farm with all buildings done, My Inventory, Orchard, All Pet Items, Steak Market, mastery page, My Farm with buildings still to do, Town with places still to do, Farm Supply upgrades (browser + Steam each).

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
