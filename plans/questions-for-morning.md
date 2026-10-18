# Open questions for the player (updated 2026-10-17)

Answered questions are removed; their answers live in knowledge/.

## Questions
- **Go for "read everything a paste carries"?** Proposed (rule agreed, code not started): before the pasted page's own
  reader, quietly read any carried Town list (Town ticks, Daily Chores from Home/sidebar), farm list (production,
  "today" marks, Storehouse growth, pigs sent off), Pig Pen and Temple; the pasted page then has the last word. Message
  names only the pasted page; remove the "Read the Town list too" note added 2026-10-17. Tests: each saved copy also
  checks its carried lists. Covers the earlier asks (Steak Market paste ticking Town, farm paste ticking Chores).
- Pet names are still in the local All Pet Items copies (not usernames, never pushed): replace them too?
- 17 local commits not pushed (Vault/Chores ticks, title-based detection, "Not Started" fix, Market dropped from the
  paste list, Blue Diary price, plans): push when ready (bump-version first).

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

### Page tests (local only, gitignored)
test/pages/*.txt are the player's real copies with usernames, farm name and farm id swapped by test/pages/scrub.js;
test/pages.test.js checks detection and key values for each and runs with the other tests. Extracting a paste from the
session log and scrubbing it: node <scratch>/extract.js <log> "<marker>|<marker2>" raw.txt, then
node test/pages/scrub.js raw.txt test/pages/<page>.<browser|steam>[.variant].txt <farm name> [pig name].
