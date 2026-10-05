# Questions for the player (overnight work, 2026-10-05; updated after the player's first answers)

Everything below was built locally and committed, not pushed. Each question notes the call I made so you can just say
"fine" or correct it.

## Slow grinds
1. **Grubs in your save** are still the old daily number (5,000 a day instead of 5,000 an hour). Re-paste the farm page or the
   Trout Farm page; Chum will drop from ~2.3 years.
2. **Crops** (Cabbage Stew, Shrimp-a-Plenty, Beet…) are timed as if all plots grow that crop. OK, or should crops get a share?
3. **Arnold Palmers / Apple Ciders a day** can't default from production (their recipes need hand-gathered items), so explore
   masteries stay untimed until typed. Fine, or should they default to something?
4. **What if, fruit:** I used "fruit at midnight" as the target, not tree counts, because the farm page has no tree counts
   (the Orchard page does). OK, or would you rather type trees?
5. **Building upgrade prices / "Max" preset:** skipped (no price data). If you sample a building's single-unit prices a dozen
   times, I can fit the curve and show "this upgrade costs ~X silver" next to the days saved.
6. (Answered: voiding Antlers is fine; the aim is a noon drop as big as the cap. Rows now say what that takes.)

## Silver goal (Best use tab)
7. **Fishing per net looks huge:** Glacier Lake comes out ~10M silver a net for you (buddy.farm ~11.7k average per fish x 500
   fish per net with Reinforced Netting + Fishing Trawl x 1.7 sell perks). Does ~10M a net match what you see? If a Large Net
   catches fewer fish than 250/400/500, tell me the real number and I'll fix the formula.
8. **Prices:** only 15 crafts have prices (292 at your level don't). Please paste your **Farmer's Market** page once more
   (with a fresh My Inventory paste right before or after): the planner now works out every listed item's base price itself.
9. **Fishing vs. masteries:** the fishing line uses all your Large Nets a day; those nets also feed Slow grinds (Frost Shield,
   Runestones…). I left that as a note rather than splitting the budget. OK?
10. The old "Making silver" card (Next steps, only before Fun Guy) is still there; the new card is on Best use for everyone.
    Remove the old one, or keep both?
11. **Next fishing place** says Sinking Swamp (~11.2M a net vs Glacier Lake ~10.0M), unlock "the swamp puzzle". If you already
    fish there, the planner doesn't know it yet: it decides which places you have from your mastery/inventory evidence.
    Setup → Places can mark it unlocked.

## Small follow-ups (done)
- Tower table: new column "Silver still needed (total)" per level, counting from your silver.
- Daily overflow: once-a-day drops say "full at the next drop" / "full in 3 days" instead of "full in 2.4 days".

## Not done (needs you)
- Rare fish in per-net silver: needs per-fish prices (a Market paste with fish in it would give them).
- Building upgrade price curve (Slow grinds batch 5).
- "Paste a special request": needs one example quest page.

## Overnight commits (all local, nothing pushed)
Slow grinds batches 1-4, Silver goal batches 1-3 + next fishing place, Tower silver column, daily-drop wording.
Run `git log --oneline -12` to see them. Say "push" when you're happy.


## Answered 2026-10-05 (to build next)
- **Arnold Palmers / Apple Ciders / Lemonade (Q3):** assume the hand-gathered parts (Glass, Tea Leaves) are always on hand;
  the limit is the fruit. Default the budgets from fruit only, and add a small line: AP a day needed in Ember Lagoon for the
  Glass, and in Tea Leaves' explore place for the Tea Leaves.
- **Scope:** only masteries **required for the Tower** (plus the always-on five until MM'd). The 31 rows included non-Tower ones
  (Cabbage Stew, Shrimp-a-Plenty, Pink Jelly, Grape Juice, Runestones…): drop those. The "Slower than" setting stays.
- **Antlers (Q6):** voiding at midnight is fine. The goal is a noon bonus (10%) as big as the cap, i.e. two full drops a day:
  production >= cap / 10%. Reframe the What if / Large Net row around "noon bonus fills the cap" instead of "raise the cap".
- **Sinking Swamp (Q11):** not unlocked (expensive puzzle quest), so the next-place hint is right.
- **Upgrade prices (Q5):** the player will sample prices and send them.
- **Personal requests:** example pastes received ("Items Wanted" from Vincent, "Lost Items" from Rosalie, quest.php pages).
  Format: "Items Requested" then per item "[Name]" / "You have N" / "Nx"; "Rewards" then "Silver" / amount and items "Nx".
  This is the page the "paste a special request" to-do needs; build a parser for it (works for special requests too).

## Still open
1, 2, 4, 7, 8, 9, 10 above.

## Answered and built 2026-10-05 (second round)
- **Crops (Q2):** everyone plants one crop in every plot (Plant All), so a crop need is shown as harvests and growth time before
  Veggie Juice; the days still follow the Veggie Juice / Grape Juice settings. Crop rows only come up for Tower needs now.
- **Fruit at midnight (Q4):** kept.
- **Upgrade prices (Q5):** each new unit costs a fixed rate x the new amount (all your samples fit exactly). upgrades.js +
  knowledge/mechanics/building-upgrades.md; What if shows the silver for each building target (Wood 18k -> 25k ~151B).
  Steel Wire = Steel / 3 rounded, so a Steel target moves the wire too. Hay Field: your "11,020,000" must be 110,020,000.
- **Growing cap (Q6):** grinds now count day by day with the cap growing by your daily cap growth (11,464, +18, +36...), until
  the cap stops limiting the drop. **Paste your Storehouse page** so the planner knows your +18 (it isn't in your save yet).
- **Tower only:** 57 Tower grinds on your save (the non-Tower ones are gone). Arnold Palmers (~176 a day) and Apple Ciders
  (~364) now default from fruit, with the Glass / Tea Leaves exploring shown; many explore masteries are timed by Arnold Palmers
  now, each assuming all ~176 go to it.
- **Noon:** Antler rows say what two full drops a day take (~114k a day for your cap; you make 53.7k); fruit rows note fruit
  tops out ~9,100 a day; players without the noon artifact see that it adds a 10% drop at noon.

## New questions
12. **Which Tower level** gives the Antler Snare and Tree Shaker? I say "artifact perk" without a level for now.
13. **Max trees:** you said ~7,000 trees and ~9,100 fruit. Your orchard shows 7,018-7,023 trees; is 7,000 the base cap with a
    few from special items? (Only used in a note.)
14. Many explore masteries now say "Limited by: Arnold Palmers" (each assuming all your Arnold Palmers). Useful, or would you
    rather leave explore masteries off this tab?
