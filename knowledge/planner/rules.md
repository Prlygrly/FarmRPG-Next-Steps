---
type: Reference
title: "Planner design rules"
description: "How the planner ranks, costs and words things, as agreed with the player."
tags: [planner]
sources:
  - id: player
    resource: confirmed by the player in planning chats
    title: "Player confirmation"
  - id: readme
    resource: ../../README.md
    title: "farmrpg-planner README"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# Rules

- Metric: finishing things (tower levels, GMs, MMs, quests). Works for any player; nothing player-specific is hardcoded.[^player]
- Effort in AP (see [effort units](/mechanics/effort-units.md)) plus time waiting on [daily production](/mechanics/production.md); waiting leads the wording.[^player]
- Daily production covers at most 7 days of a job; the rest is gathered or crafted.[^player]
- Masteries and quests weighted equally; quickest done first; main quests always shown.[^player]
- No plan relies on voiding; leftovers past the cap: say how soon the cap fills, use or sell as you go.[^player]
- Never recommend cookies or paid wishing well tosses; wishing well shows today only.[^player]
- Never say "keep it for its mastery" ([mastery](/mechanics/mastery.md) is counted on gain).[^player]
- "Do these next" blends by effort in minutes of play: AP ÷ your AP-per-minute (default 100) + waiting hours × "an hour of waiting = N minutes" (default 20, since you can do other things while waiting). A "By type" view groups them instead.[^player]
- Players without the Tower see no Tower talk; masteries show their silver/gold/perk-point rewards instead of AK; a Leveling up card helps toward 4x90/4x99 (see [levels and XP](/mechanics/levels-and-xp.md), [progression](/mechanics/progression.md)).[^player]
- New visitors start with no paid perks; only items with a known production rate count as daily production.[^player]
- Places need their skill level as well as item evidence (see [locked places](/mechanics/locked-places.md)).
- Pastes: chat is stripped before anything is read; headings match in any case (the Steam app copies in capitals); the Steam Orchard page also carries the farm list, and both are read.[^player]
- A page pasted into the site arrives as **plain text**: no links and no "* " bullets (a paste into a chat keeps them). Readers
  must find names by position (the line above "You have N", above "− +", after "Silver"), never by bullets or links;
  test every reader with a bullet-free, link-free copy. Links (quest ids) are a bonus when present.[^player]
- Veggie Juice on crops is a setting (none / as much as helps / N each / down to X min), 10% per juice or 20% after "A Better Juice" ([Veggie Juice](/mechanics/veggie-juice.md)).[^player]
- Kitchen is a pantry list (quest needs, then lowest stock); cook time = perks + your usual stirs, never perfect ([cooking](/mechanics/cooking.md)).[^player]
- Keep on-screen text short and formal; no superlatives ("the most useful…").[^player]
- **Monotask** (a Detail setting): one thing per section, an action before any waiting. Do this next = the top action;
  Tower = the next named GM/MM not yet done; AK = the quickest mastery; Spend my = the best place for nets and for drinks;
  Slow grinds = nearest Tower level, shortest, longest (no repeats); Veggie Juice = one step (waiting on Twine etc. only once
  every crop is full); Quests = ready to turn in, else a special ending within 7 days, else the fewest AP; Silver goal = one
  fishing place and one craft. "more" opens only that one item.[^player]
- Monotask items are concrete steps ("Fish ~50 LN at Vast Ocean for 259 Aquamarine"): gather, grow, craft, wait, then finish
  or turn in. ✓ Done adds what the step brings to your counts until the next paste (undo under the tabs); Do this next skips
  to the next target while the top one only waits. Masteries and quests have Skip (hides them; show again from the AK table
  or the Quests tab).[^player]
- Next steps layout: Grid = tiles side by side on wide screens (default); List = one column.[^player]
- "I do personal requests every day" (General settings): personal requests count as ending today, so they go first in Do
  these next and the quest picks. A 7-day window marks a special as ending soon. Kitchen never uses meal prices (meals aren't
  sold).[^player]
- Steak Market in Monotask: hold / sell (buy for Steaks and Kabobs) only. Every view shows a good-bad bar of today's price
  against the lines: red to green for Truffles; blue (buy) to green (sell) for Steaks and Kabobs.[^player]
- Slow grinds name where to gather the limiting part (Feathers for White Parchment at its explore place). When Grapes are
  the limit and below the cap, times assume Grapes raised to the cap now and kept there as the cap grows, with the silver
  that costs (see [building upgrades](/mechanics/building-upgrades.md)).[^player]
- **Expanded** is labelled points (Why, Cost, Needs, Where), never paragraphs.[^player]
- App settings (theme, detail, layout, Best use order, folded cards) are kept apart from game data: not in save codes, not
  cleared by Forget my pastes. The last 3 pastes (and save-code loads) can be undone.[^player]
- A My Inventory paste always replaces the old one, however small: an item missing from it is 0 now.[^player]
- **Slow grinds** shows only masteries the Tower still needs (its tier), plus Orange Juice, Lemonade, Large Net, White Parchment
  and Beet until MM'd; "Slower than" (default 180 days) filters the rest. Each row assumes it gets the whole production or
  budget.[^player]
- Grind times count the cap growing every day (cap + daily growth x day), not today's cap forever.[^player]
- Steel and Steel Wire are produced and craftable: when one is the slowest part of a grind, enough is crafted (Carbon Sphere +
  Glass Orb + Iron; Carbon Sphere + Iron + Stone) that the Steelworks and the crafting finish together; the crafting's
  drinks and parts count in that grind's totals.[^player]
- Drinks and nets (Arnold Palmers, Apple Ciders, Lemonade, Large Nets) default from fruit / Antlers only: the hand-gathered parts
  (Glass, Tea Leaves) are easy and assumed on hand; show the exploring they take as a side note.[^player]
- Always state the **total** Arnold Palmers / Apple Ciders / Large Nets a mastery takes, not just the time: they can be bought
  or gifted, so a small total can be done in a day.[^player]
- Crops: players plant one crop in every plot (Plant All), then the next crop. Show crop needs as harvests and growth time before
  Veggie Juice; the Veggie Juice setting then decides the days. Breakfast Boost for very short crops, Grape Juice likely (not
  certain) for the longest. Ignore the rare, expensive mixed-planting item entirely.[^player]
- Each view spends the whole budget its own way (all Large Nets on fishing in Silver goal, all on masteries in Slow grinds):
  it's math for the player, not an allocation, so budgets aren't split between views.[^player]
- Silver goal: blank goal = the next Tower level; ways = crafting from production, per drink/net, and Large Nets at the best
  unlocked fishing place; the next better locked place says what unlocks it.[^player]
- Sell end products, not their parts: an item is never suggested for sale while anything made from it isn't Mega Mastered
  (sell the Butter, not the Butter Churn; tables, boxes and shields, not Wood, Boards or Planks). Items used exploring or
  fishing (Explosive, nets, drinks) aren't sold either; Chum is better gifted to a townsperson. Cooking uses count like
  crafting. 1:1 recipes with the crafting bonus (Leather Helmet -> Reinforced Helmet): MM the top item first, then the lower
  one; only then is selling the lower one sensible.[^player]
- Exceptions, case by case: Lantern and Red Shield sell well and Linked Lantern's / Frost Shield's parts are slow or costly,
  so selling them is fine short term (say the next step pays more). An item at the cap that can't be made into anything
  right now (another part is missing) may be sold.[^player]
- A single request's page (quest.php: special and personal requests, e.g. "Items Wanted", "Lost Items") lists "Items Requested"
  (item, "You have N", "Nx") and "Rewards" (Silver amount, items "Nx").[^player]
- Every personal request is generated fresh, even with the same name and townsperson: requests are keyed by their own id
  (quest_id) for Hide, Done and clean-up; a Help Needed paste drops any request whose id it no longer links; a new request
  with the same name and townsperson replaces the old one.[^player]
- Optional pastes are never prompted for, with one exception: players with Truffles in their inventory are reminded each day
  (until they paste it after reset) to paste the Steak Market for the sell check. Players without Truffles can't see the
  Truffle market (it appears after "The Smell of a Fun Guy"), so they get no reminder. If shared Truffle prices are built,
  the same prompt becomes the way to share, and its wording must say the two Truffle prices are shared.[^player]
- Saved production carries its own unit, as the game states it: `{ n: 54210, per: "day" }` for daily drops (Antler,
  Eggs, Milk, Trout…), `{ n: 18002, per: "hour" }` for the rest. The math converts to per hour in one place
  (`ratesPerHour` in engine.js); never store or quote a daily drop as an hourly rate.[^player]
- Home, Farm and building pastes update only the items they show and keep the rest (a copy can miss a building); clearing a
  box in Setup removes an item.[^player]
- Quest value = max(craft/gather cost, trade price), x2 if it helps the plan, x0.1 otherwise; silver and gold not counted;
  chests = contents - key cost. Ready isn't free (stock used is shown and costed). Chain look-ahead x0.7 a step, main x1.5.[^player]
- Outlets (where a pile goes): one that earns a mastery or Tower need is always offered with its cost; others only if cheaper
  than the job. Items with other uses (OTHER_USES: bait, Veggie Juice, pickaxes) say "keep for ..." instead of "sell".[^player]
- What to plant: crops that aren't gatherable and are in season, ranked by what they feed (own tier, quest needs current + 5
  ahead, AK-plan masteries; Tower and main x1.5), score = sum of weights / (1 + hours / 24). Crops officially <= 5 min are done
  together under Breakfast Boost, counted in harvests.[^player]
- Wishing well: only today's free tosses, each with what it brings and why; no totals or later days; items whose usual route is
  covered by exploring done anyway don't need tosses. Spare tosses stock up for later steps of active chains (the biggest
  single step past 5 ahead, never above the cap).[^player]
- Daily overflow is framed as a goal (the product's next tier or Tower tier: "Mega Mastery in N days, X is the slowest").[^player]
- Trips: places you explore anyway are discounted (default 50%); the main item's chain claims side drops first.[^player]
- Done ticks: a quest leaves the list (needs out, rewards in, next quests appear); a mastery moves up a tier (+AK); a Tower level
  goes +1 (AK -100). Undo via snapshots; any fresh Mastery, Inventory or Help Needed paste clears ticks.[^player]
- Tabs and files: the README.[^readme]

[^player]: Player confirmation
[^readme]: farmrpg-planner README
