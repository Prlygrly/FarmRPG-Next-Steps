# Slow grinds: plan (draft, 2026-10-05)

Written by a read-only planning agent; not yet reviewed with the player. Open questions at the end.

## 1. The view
- **New tab "Slow grinds"** (`data-go="grinds"`); Best use already has four cards. Daily overflow's "Set and forget" fold (STANDING)
  moves here; Daily overflow keeps a one-line link.
- **Candidates** (one target each: next GM/MM, or Tower tier if lower and needed): Tower needs above the player's level
  (`towerUses`, walls from `towerPlan().walls`), the STANDING chain ends (Large Net, Orange Juice, Lemonade, Apple Cider), and
  `akPlan().slow`. Kept only if > "Too slow after" (`S.perks.slowDays`, default 7) at current production. Pre-Tower: no tags.
- **Sort:** longest first; toggle Longest | Most saved (only with a what-if set). 12 rows then Show more; untimeable items as one
  muted line.
- **Condensed row:** `Orange Juice MM · ~2.1 years` + progress bar + `Limited by: Orange (Orchard)` + Tower tag; with a what-if
  `→ ~1.6 years (−6 mo)`. **Expanded** adds how the daily amount is made, co-ingredients, cap voiding, Tower level blocked.
- Wording: "~", days < 60 → months → years (`yearsText` helper).

## 2. Time to GM/MM (new pure function in engine.js)
- `grindTime(item, left, ctx)` → `{ days, perDay, bottleneck, parts }` from `makeCoster(...).effort(item, left)`: passive inputs
  ÷ per-day rate, AP ÷ AP/day, LN ÷ nets/day; days = max (run in parallel), bottleneck = the max. No `adjust`/`activeEffort`.
- Buildings: `usableRate` (cap per drop), Antlers `noonDay`; orchard `fruitPerDay`; crops `cropInfo().perHour × 24`; crafted:
  slowest farm-made ingredient via the recipe tree; fish/explore: two new optional General settings ("Large Nets I use a day",
  default = own net output; "AP I spend a day", blank → show AP only). Never prompted.
- Prerequisite refactor: `dailyRates(env)` in engine.js (move noonDay/usableRate/fruitPerDay), index.html wrappers delegate.

## 3. What-ifs
- "What if" card, `S.whatIf`, Reset. 1) inventory cap, 2) trees per fruit (scale by (trees+N)/trees from the orchard paste),
  3) building output per drop (typed). Later: plots, Grape Juice. Each row runs twice, shows days saved, sortable.

## 4. Data gaps
- Building upgrade tables (output per level, max) not in repo → typed output for now; later knowledge/mechanics/buildings.md +
  buildings.js for a "Max" preset. Cap growth per day unknown → typed. Large Net MM chain math stays as in STANDING.

## 5. Batches (tests in test/engine.test.js, made-up numbers)
1. `dailyRates(env)` + wrappers + tests (cap per drop, 10-min drops, noon bonus, trees).
2. `grindTime` + `grindList` + tests (Chum bottleneck, AP/LN days, threshold, pre-Tower).
3. The tab (Condensed/Expanded, progress bar, two settings, STANDING moved; savecode packs new settings; README, rules.md).
4. What-if card (`S.whatIf`, two-scenario runs, Most saved sort) + tests.
5. (When data exists) buildings.md + buildings.js, Max preset, "or ~N days if maxed" in Daily overflow.

## 6. Open questions for the player
1. Building upgrade tables (output per level, max)? Or is typing the output enough?
2. "Large Nets a day" default = nets you make? Want an "AP I spend a day" setting?
3. Scope: everything over "Too slow after", or only Tower needs + STANDING chains? Include crop GMs?
4. Does the inventory cap grow by a fixed amount per day?
5. New tab, with "Set and forget" moving into it?
