# Open questions for the player (updated 2026-10-21)

Answered questions are removed; their answers live in knowledge/.

## Questions
- Pet names are still in the local All Pet Items copies (not usernames, never pushed): replace them too?
- Overnight work (2026-10-21, local, not pushed): see plans/overnight-2026-10-21.md for what was done.
- **"If you maxed this building"**: buildings have no maximum (you buy production in any amount; only the Orchard's trees
  cap out), and Slow grinds' "What if" box already takes a target per building and shows the time saved. What did you
  have in mind? (a) a ready-made what-if per slow grind ("at double the output: 40 days instead of 80"), (b) the Orchard
  at its tree limit, (c) something else, or (d) drop it.
- **Tower "hide only-AK levels"**: hidden runs fold into one line ("228–234: only AK") instead of vanishing, so the
  AK and silver totals on the next row still add up. OK, or remove them entirely?
- **Quest "Show one" card**: shows the picked quest's first step with ✓ Done, and the later steps under "more" (the same
  card as Monotask). Want all its steps listed open instead?
- **Spend my… crafted parts**: quests 3-5 steps ahead now list many crafted items ("33% of the parts for 6,302 Essence of
  Slime, …"), which gets long. Count crafted items only for the current quest and the next one?

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
session log (C:/Users/prlyg/.claude/projects/D--Claude/<session>.jsonl) and scrubbing it: node test/pages/extract.js <session .jsonl> "<marker>|<marker2>" raw.txt (extract-all.js saves every pasted block of one message), then
node test/pages/scrub.js raw.txt test/pages/<page>.<browser|steam>[.variant].txt <farm name> [pig name].
