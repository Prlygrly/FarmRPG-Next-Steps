# FarmRPG Next Steps

**Use it here: https://prlygrly.github.io/FarmRPG-Next-Steps/**

A free planner for [FarmRPG](https://farmrpg.com) players. Paste (or upload) a few pages from the game and it tells you what to do
next: the quickest masteries, quests and Tower levels to finish, where to spend your Arnold Palmers, Apple Ciders and Large Nets,
what to plant, what your farm will soon overflow with, what to cook, and what to toss in the wishing well today.

**How to use it**
1. Open the page and go to **Setup**.
2. In FarmRPG, open **Mastery Progress** (open every tier first), press Ctrl+A then Ctrl+C, and paste it into the box.
   On a phone, where copying doesn't work, save the page instead (Chrome: ⋮ → Download) and use **Upload a saved page**.
3. Add **My Inventory** and **Help Needed** the same way. Optional: **Perks**, **Farm Supply**, your **farm page** and the **Orchard**.
4. Look at **Next steps**, **Quests**, **Best use** and the other tabs.

Everything stays in your own browser: nothing you paste is uploaded or sent anywhere. Hover (or tap) the ⓘ marks for explanations.

**Data** comes from [buddy.farm](https://buddy.farm), the [FarmRPG wiki](https://farmrpg.com/wiki.php) and
[farmrpg-trade.live](https://farmrpg-trade.live) (trade prices, unofficial). This is a fan-made tool, not affiliated with FarmRPG.
Game knowledge used by the planner is written up in [`knowledge/`](knowledge/index.md) (Google's Open Knowledge Format).

---

## For developers

Plain static site: `index.html` + JS files, no build step. Everything is costed in **AP** (1 Apple Cider = 1 Large Net = 1 AP) plus
**time waiting on daily production**. Nothing player-specific is hardcoded; all player data comes from pastes or typed fields.
GitHub Pages serves `main` from the root. Ask the owner before pushing (see D:\Claude\CLAUDE.md on the owner's machine).

## Run / test
- Preview: `farmrpg-planner` entry in `D:\Claude\.claude\launch.json` → `node test/serve.js` → http://localhost:5174
- Tests: `for t in test/*.test.js; do node $t; done` (parse, inventory/pages, engine).
- Fixtures (`test/fixtures/*-trimmed.txt`) use made-up numbers and no chat/usernames — keep it that way (the repo is public-bound).
- Debug in the page: `__planner.state()`, `__planner.last()` (latest tower + AK plan), `__planner.render()`.
- Tooling note: backslashes inside `node - <<'EOF'` edits get stripped by the shell tool here — use the Edit tool for regexes / `\n`.

## Files
- `knowledge/` — **game knowledge bundle** in Google's [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
  v0.2: one Markdown concept per mechanic (mastery, cap, tower, effort, production, crops, Breakfast Boost, cookies, Veggie Juice, cooking,
  wishing well, locked places, rare drops, seasons), one per data file, and the planner's rules; `index.md` lists them, `log.md` records
  changes. **Read the relevant concept before changing game rules in code**, and add new mechanics there (with a source). Concepts have
  no `verified` yet: add `verified: { by: human:player, at: … }` once the player has checked one.
- `index.html` — the whole UI (tabs, rendering, costing glue, quests, trips, saves, themes).
- `parse.js` — page parsers: Mastery Progress, My Inventory, Help Needed, Orchard, farm page, Perks, Farm Supply; `detectPage()`.
- `engine.js` — `towerPlan`, `akPlan`, `makeCoster` (gather vs craft, passive items, `forWhat`, `activeEffort`), effort/perk math,
  seasons/places, trips (`tripYield`), outlets (`outletPlan`).
- Data snapshots (regenerate with `tools/snapshot-*.js`): `tower.js` (wiki Tower Masteries), `drops.js` (buddy.farm explore/fish rates),
  `recipes.js` (craft/cook recipes + uses), `recipes-extra.js` (hand-kept recipes buddy.farm lacks, e.g. seasonal Spooky Scarecrow), `seeds.js` (crop growth), `meals.js` (cooking level, cook time, effect), `levels.js` (XP per level), `ww.js` (wishing well, hand-kept from the wiki), `prices.js` (base sell prices, hand-kept from the player), `npcs.js` (townsfolk loves/likes/hates, tools/snapshot-npcs.js), `quests.js` (1,235 open quests, chains both ways),
  `loot.js` (chest/bag contents), `trade.js` (farmrpg-trade.live median AP prices), `seasons.js` (hand-kept month rules).

## Tabs (current)
- **Next steps** — "Do these next" with a **Blended by effort | By type** toggle. Effort = minutes of play: AP ÷ "I spend about N AP a
  minute" (default 100) + waiting hours × "an hour of waiting feels like N minutes of play" (default 20; waiting is cheap, you can do other
  things). Blended: one list quickest first, tagged Quest/Mastery/Tower/main, "about N min of play"; By type: Ready / Quests / Masteries /
  Tower headings. 8 shown (4 per group) + Show more; next Tower level and main quests always shown; "start early" wall at the end. Tower levels table, AK table (Quick / waits >1 day /
  can't cost / limited by production / out of season / hidden), supplies.
- **Quests** — cards: still needs + cost (places "for X"), then stock used, verdict (reward ÷ cost in AP, chain look-ahead ×0.7/step,
  main ×1.5, "mostly waiting" when ~no AP), rewards (Tower item / mastery / supplies tags; chests valued by contents; trade prices),
  next 3 in chain, ✓ Done, Hide.
  **Wishing well** card (ww.js, from the wiki "WW Wants" table the player pasted; buddy.farm's wishingWellOutputItems has the same):
  quest items you're short of (current + 5 ahead, adding up down chains) that the well gives, only when the item has no other source or
  tossing (tossed items at their own value; production-made ones in time) beats the usual cost; best toss = cheapest, then what you have
  enough of; "about N tosses" = short ÷ chance; the rest listed as "cheaper the usual way". Tosses are a DAILY free allowance
  (Free wishing well tosses a day, setting, max 29 from perks unless beta/alpha): paid (gold) tosses are NEVER suggested; card asks
  for the number if unset. STRICT: shows ONLY today's free tosses (quickest-to-finish first, only items you already have), each with
  what it should bring and why (which quests, no other source / cheaper than usual) — no totals, later days or day counts, so nothing
  tempts buying gold tosses. Picks needing > 30 days of free tosses are silently left out.
  Exploring done anyway (quest needs' places for current + 5 ahead, plus Trips) counts first: its drops of the item, and crafted items
  whose usual route's places are all covered by that exploring (Spool of Copper = Metal Spool + Copper Wire via Jundland for Langstaff
  Crests) — only what's left needs tosses.
  Free tosses read from the Farm Supply paste: 3 + Extra Wish (+1) + Extra Wishes I–III (+5/+10/+10) = 29 max (beta +1, type it).
  Spare tosses after that → "stocking up": well items needed later in ACTIVE chains (past 5 ahead, to the chain's end; finished
  questlines never appear since Help Needed only lists current ones), same rules (owned inputs, not what exploring brings, today only).
  "No other way" = no recipe and no drop anywhere (not merely "can't cost it"); another way that can't be costed → not suggested.
  Stock-up target = the biggest single step's need past 5 ahead (never above the cap), not the chain added up — quests take items
  step by step and you keep gathering (Gold Leaf: 6,000 a step vs 18.8k total; player already voids it). "Why" names that step.
- **Best use** — "Spend my…": Large Nets / AP / AC + amount (blank = all you have, from My Inventory; any number allowed). Every usable
  place ranked by things finished, then total part-done progress; each shows **Masteries** (finished tiers quickest first, +AK, Tower
  levels, "where the extra goes"; then "N% closer to …", Tower items tagged) and **Quests** (active + up to 5 ahead per chain, needs add up
  down the chain; finished first, then "% of what it still needs"). Out-of-season drops left out (Trips too).
  **What to plant now**: crops (not gatherable, in season, best seed incl. Mega if owned) ranked by what they feed — own next tier, quest
  needs (active + 5 ahead, adding up down chains), AK-plan masteries whose daily-production part needs the crop (Tower items ×1.5, main
  quests ×1.5); score = Σ weight ÷ (1 + hours/24), top 6. Compact rows ("Corn ready in 13 min — Corn of Interest Part 07 [2 ahead]
  2 h · +11 more"), tap to fold open the rest. Boost crops go LAST, folded (not passive), unless no slower crop has a job or Veggie
  Juice < 10% of the cap (then first and open).
  **Breakfast Boost batch**: crops that *officially* grow in ≤ 5 min (Carrot, Peas, Cucumber, Eggplant, Peppers + Gold versions) are done
  together under Breakfast Boost (instant growth, 2 min) — counted in harvests (1 harvest = plant all + harvest all = plots × (1 + Double
  Prizes) ÷ seeds per crop), "Your next Boost can finish…" fills Harvests per Boost (setting, default 250) with the smallest jobs first.
  Boosts treated as free (player has plenty).
  **Crops never planned to void** (crops can void, unlike crafts): own-mastery jobs past the cap get "where the extra goes (more than
  you can hold)" via the outlet logic — Veggie Juice comes up for the boost crops; Veggie Juice itself is kept (OTHER_USES: speeds crops).
  Leftovers bigger than the cap: "keep up to <cap>: fills in X of this job, then each <cap> more takes Y, use or sell as you go" (X/Y in
  Boosts for boost crops, else hours/days); sell/give lines say "as you go".
  **Daily overflow**: grouped by building (BUILDING map, soonest-full building first, folded); each item → best outlet (outletPlan as if
  full) framed as a GOAL: the product's next tier or the Tower tier it still needs → "Mega Mastery in N days (X is the slowest)" using the
  slowest farm-made ingredient, plus "extras ~N AP" so pricey ones show (Mayonnaise: Corn Oil). Baits kept (OTHER_USES). Iron/Nails skipped
  when auto-bought. "Set and forget" (folded, last): Antler → Fishing Net → Large Net, Orange → Orange Juice, Lemon → Lemonade (the
  year-long Tower MMs the player expects to be blocked by), Apple → Apple Cider — per day, days to MM, what else the chain uses a day.
  **Kitchen** (pantry): meals you can cook — quest needs first with exact targets (active + 5 ahead; a chain adds up down its steps,
  chains add together), then lowest stock first (no "full" target; player: enough for self + giving away). Mastery NOT chased (Tower tag
  only). Each: have, "N more" (quest shortfall, else one round of ovens), rounds, time; ingredients costed. Cook time (wiki "Cooking"):
  base × (1 − Cooking faster %) [perk pages: "Cooking is N% faster"], then Stirs per meal (setting, default 0; never assume perfect):
  first stir at 1 min, then every 15 min, each −10% of the time left — matches the wiki's full-perk table to the second. Taste = bonus
  mastery (+1, +1 per 30 min base), Season = random XP: not modelled. Cooking level +
  "Recipes I don't have" filter. One meal per oven (wiki).
- **Veggie Juice** — cycle card: juice on hand, how many you can craft now + limiting item, "Next:" step of the player's loop (grow
  Tomato + Watermelon until full → Breakfast Boost the five quick crops until full → Grape Juice the Beets and craft until Tomato/
  Watermelon run out), "also top up" for Twine/Horn/Glass Bottle that would run out first, full-cycle size (cap ÷ 2, set by Tomato +
  Watermelon) with Boosts and Grape Juices it takes, ingredient table (each, have, makes, to fill up: Boost rounds / Grape Juices /
  farming time / usual costing; Beet also shows seeds planted = Grape Juices × plots, flagged if more than you have). Calculator: crop + minutes left (defaults to its grow time with perks) + target → juices needed;
  each juice = 20% off the time LEFT, floor 1 min → use all right after planting; "more than N is wasted".
- **Trips** — "I'm exploring here anyway": budget or "until N of X", main item's chain claims side drops first, the rest → outlets; trip
  places discounted (Trip discount %, default 50).
- **Veggie Juice on crops** (Your perks): No / As much as helps (down to the 1-minute floor) / A set
  number each planting / Down to X minutes. Applies to every crop except Breakfast Boost ones; changes crop timing everywhere
  (cropInfo) and shows "about N Veggie Juice" per plant-list job. Cut per juice: 10%, or 20% when "A Better Juice" is done — assumed
  done when Tower 100 + Farming/Fishing/Crafting/Exploring 99 and no part of it in Help Needed, with an "isn't done yet" override.
- **Setup** — paste box (Hide/Show) + **Upload a saved page** (phones can't copy: save the page, e.g. Chrome ⋮ → Download, and upload;
  savedPageToText() decodes .mht quoted-printable and turns the HTML back into lines for the same parsers; read on-device only, 30 MB cap;
  never commit a sample, it holds the username and chat — NOT yet tested with a real saved page) with typed tower/AK/MM; "Your settings" card: Your perks (game perks: plots, Grape Juice, tosses,
  ovens, cooking speed, growth…), General settings (how you play, each with a hover ⓘ — tap it on a phone for a bubble: AP a minute, an hour of waiting = N minutes of play, Too slow after, Trip discount, "I check the game
  N times per hour/day/week" → harvests per hour, Veggie Juice on crops + "A Better Juice isn't done yet", Stirs per meal, Harvests per
  Breakfast Boost), Places I can use, Daily production; Save and load (FRP1. codes).
- Under the tabs on every tab: week-old paste reminder (Mastery/Inventory/Help Needed) and the "ticked since your last paste" list.

## Roadmap (next batches, in order; numbers go to whatever is done next)
- **To do: shorter on-screen text.** Make the app's explanations less wordy (intros, tips, card descriptions).
- **To do: paste a special request.** Special requests (the "Special Requests" section of Help Needed) are unique and often not
  in buddy.farm's quest data, so the planner can't see what they need. Let a player optionally paste a single quest's own page
  (quest.php) to read its needs and rewards, and include it like any other quest. Low priority: they're usually quick (about
  20 minutes), but it should be possible for anyone who wants it.
- **To do: "Long hauls" (working name; was "common walls and blockers").** A view of the GMs and MMs that take the longest
  (Large Net, Orange Juice, Lemonade, Chum, Tower walls…): how long each takes at the player's current production, and at projected
  production (e.g. a building upgraded, more trees, a bigger inventory), so players see where an upgrade pays off. Builds on Daily
  overflow's "Mega Mastery in N days" and the "if you maxed this building" idea.
- **Then: silver goal.** A setting "I'm saving up N silver" that values crafted-and-sold / fished-and-sold items by silver while the
  goal is open (mainly before Truffles). Base sell prices now in prices.js (15 items, from the player's Market page); sell price
  = base x (1 + sell perks) x mastery. Making silver card, quest and Tower silver checks are done.
- **Friendship (started):** npcs.js has every townsperson's loves/likes. Done: items only another quest gives point to it with its
  friendship need and the 2 cheapest gifts (Cursed Effigy Hair -> "Effigy of Friendship", Buddy 90); leftovers nothing is crafted
  from are gifted to someone who loves/likes them before selling. Still to do: read the Friendship Levels page (current levels, gifts
  to the next level); Cursed Effigy Head and Body sources unknown.
- **Small follow-ups:** Tower silver only checks the next level (add up several levels); fishing silver per net can't leave out
  rare fish yet (needs per-fish prices); Daily overflow "full in X" means little for once-a-day drops (Antlers arrive at midnight).
- **Parked (player thinking it over) — Veggie Juice rounds:** show Grape Juices in days of the daily limit (the Grape Juice perk, 14);
  Beets in cap-sized chunks per Grape Juice round (+ Craftworks tip). Cookies: NEVER recommend (personal strategy); maybe an optional
  "Cookies I use (0–3)" setting (default 0; ×3 per cookie, applies to every crop incl. Boost crops). Player's own routine: cookies → Grape
  Juice crop → Boost crops until full → a crop or two with Veggie Juice down to 1 min, until the 5 min are up.
- **Proposed (from the player's wiki notes, not built):** Compass → Magna Core is 100% in the well, so with Resource Saver a Compass need is a crafting loop, not tosses.
  Reference for later: locked places and their unlocks (Ember Lagoon: Inferno Sphere + Exploring 60; Lake Minerva: Lava Sphere +
  Fishing 60; Large Island: Tribal Mask + Fishing 70; Whispering Creek: Compass + Exploring 70; Pirate's Cove: Mapping Compass + Fishing
  80; Jundland: Exploring 80, Y73841 Detector for AP/AC; Glacier Lake: Water Orb + Fishing 90; Gary's Crushroom: key + Exploring 90;
  Sinking Swamp: puzzle) could explain "place not unlocked"; super rares (~1 in 50k: Langstaff Crest, Diamond, Amber…) have
  secondary sources (level 6 pets, Borgen Wednesdays); runestones have no official rates (nets/lemonade can find them, crop runestones by
  harvesting; Double Prizes doesn't raise the rate).
- Later / ideas: Daily overflow "…or about N days if you maxed this building" on building-limited goals (Chum: 858 → ~22 days with
  Worms/Grubs/Minnows at cap per hour) to show where upgrades pay off; Spend my… could count crafted quest items (Rope from Wood + Straw) — today it only counts raw drops; What to plant
  now treats each quest chain's stock separately (two chains needing Corn both count the same Corn on hand); other tabs still cost boost
  crops at their normal timer ("days of farming Carrot") — could switch them to Boost rounds; "Plan by place" view; mining costs (player not ready yet); a "value this reward at…" list for unvaluable rewards;
  OTHER_USES (items used outside crafting, e.g. pickaxes for mining) to grow as the player learns more.

## Decisions & rules (confirmed with the player)
- Pre-Tower players (no Tower on the Mastery page, none typed): planned as level 0, **no Tower talk at all** (no note, Tower and AK
  tables hidden), masteries show their reward ("1M silver, 5 gold and a perk point" / "250M silver and 25 gold") instead of AK.
- **Leveling up** card (Next steps) whenever a main skill is below 99: XP to next level / 90 / 99 from `levels.js` (counted from the
  start of the current level — the paste has levels only); Fishing and Exploring get "about N fish/explores at <best open place>
  (XP each), or N Large Nets / Apple Ciders" from buddy.farm's `xpPerHit` (drops.js `locs[].xp`, items only) + the wiki's flat 75 per
  fish / 125 per explore (assumed not included); Farming gets the XP rules; Crafting the Crafting Advice pick for the level.
- Places need their skill level too (PLACE_LEVEL: Ember Lagoon E60, Whispering Creek E70, Jundland E80, Gary's Crushroom E90, Lake
  Minerva F60, Large Island F70, Pirate's Cove F80, Glacier Lake F90): auto-detection closes them below it.
- drops.js `locs[].silver` = buddy.farm's silver per explore/fish (by variant) — ready for the silver goal.
- Only items with a known production rate count as daily production; new visitors start with no paid perks (START_PERKS in the page;
  the engine's DEFAULT_PERKS still assume all perks, for the tests).
- Stock wording: "uses all of your X" when a quest takes everything you have.
- Chat is stripped before any page reading (parse.js `stripChat`, wrapped around detectPage and every parser): the panel from
  the channel tabs to "View Chat Log", plus any stray "HH:MM:SS AM" + sender + message block. Headings match in any case (the
  Steam app copies in capitals): Help Needed, farm, orchard, plots, inventory sections, Perks, Farm Supply.
- Mastery counts an item the moment it's gained. Using, tossing, selling or crafting away what you have NEVER costs mastery —
  never cite "keep it for its mastery" as a reason (only other uses or value matter).
- Tower: 100 AK/level; L101–200 need ceil((L−100)/4) MMs of any kind; L201–300 named MMs; L301–350 named GMs + MMs.
- AK: Mastery (10k) = 10, GM = 100, merit badge = 300, each skill at 99 = 100, chores ≈ 80/month (player skips chores).
- Effort: 1 AP = 1 AC = 1 Large Net. Waiting time leads the wording ("about 8 hours of your Wood production …, plus 335 AP at
  Highland Hills for Fern Leaf"); crops "of farming X"; hours if < 12, else days; orchard fruit always days.
- Daily production covers at most "Too slow after" days (7) of a job; the rest is gathered or crafted (`activeEffort`). Items that can't
  be topped up (Grapes) go to "Limited by daily production". Waiting > 1 day ranks after quick things.
- Crops that drop somewhere you can go (only Mushroom) are gathered, not farmed. Places a job visits count their side drops against its
  production needs ("also brings 31.3k Wood from Highland Hills").
- Outlets: an outlet that earns a mastery / Tower need is always offered with its cost; others skipped if pricier than the job;
  items in OTHER_USES say "keep for …" instead of "sell". MAX ON HAND carries no intent (only: can't craft into a full item).
- Quests: reward value = max(craft/gather cost, trade price), ×2 if it helps the plan, ×0.1 otherwise; silver/gold not counted;
  chests = contents − key cost; chest-only parts get a rough value from what they're used in. Ready ≠ free (stock used is shown and
  costed). Main quests: priority bump and always listed.
- Perks read from Perks + Farm Supply pages: crop growth % sum taken off growth time (capped 95% — unconfirmed how the game combines),
  Corn extra, Double Prizes, Resource Saver (both pages add), Wanderer, Grape Juice ((1 + extras) × 2), netting/trawl/squeezer/cinnamon,
  Iron Depot (Iron & Nails unlimited), Tree Shaker noon 10%. Plots default 20 (the farm page sets it).
- Seasons (`seasons.js`): Frozen items/Snowball/Snowman/Snow Globe/Eggnog Dec–Jan, Valentines Feb, St Paddy Mar, Easter Apr, Birthday May,
  Back to School Aug, Halloween Oct, Thanksgiving Nov, Christmas Dec. Event places (Apple Bobbing, Haunted House, Santa's Workshop)
  start unticked. Player adds items as they find them.
- "Done" ticks: quest → out of list, needs out / rewards in, next quest(s) if level/Tower/date allow; mastery → tier + AK; tower →
  level +1, AK −100. Undo via snapshots; any fresh Mastery/Inventory/Help Needed paste clears ticks.

## Formulas (buddy.farm `src/utils/format.tsx`)
- Explore `rate` = explores/drop. AC/drop = rate ÷ (explPerCider × 0.4 ÷ base), explPerCider 1000 (1250 Cinnamon Sticks).
  AP/drop = rate ÷ ((1/base) × itemsPerPalmer), itemsPerPalmer 200 (500 Lemon Squeezer). `base` null (Sinking Swamp) → explores only.
- Fishing `rate` = fishes/drop. Large Nets/drop = rate ÷ (250 + 150 Reinforced Netting + 100 Fishing Trawl). Frozen-pond variants skipped.
- Crops: per hour = plots ÷ seedsPerCrop × (1 + Double Prizes) × (min(60 / growth′, harvests per hour) + Grape Juice ÷ 24).
- Hickory Omelette: Sawmill ×2.2 while active (20% of hourly every 10 min, 1 hour each).
- Resource Saver: crafts give (1 + %) items per craft on average (cooking doesn't).

## Data sources
- buddy.farm Gatsby JSON: `/page-data/{exploring,fishing,quests}/page-data.json`, `/page-data/l/<slug>/`, `/page-data/i/<slug>/`,
  `/page-data/q/<slug>/`. Item/location slug: lowercase, non-alnum → `-` (apostrophe too: `santa-s-workshop`). Quest slugs keep a
  trailing `-` for trailing punctuation and drop `<br/>`.
- farmrpg-trade.live: `/api/trpc/items.list?input={"json":{"limit":1000,"sort":"liquidity"}}` (unofficial; snapshot only).
- FarmRPG wiki "Tower Masteries" (tower.js), "Event Craftables" (season hints).

## Batch log (short)
0 setup · 1 tower data · 2 mastery parser · 3 tower engine · 4 AK planner · 4b inventory parser · 5 page · 6 drops + effort, perks,
seasons/places, hide · 7 recipes · 8 gather vs craft · 9 outlets · 10 orchard/farm production, 7-day cutoff, Hickory, top-ups, per-place
effort, quick vs waits · 11 quests data/parser/cards · 12 trips (+ chain feeding) · 13 crops · 14–16 quest ranking, loot, stock use ·
17 trade prices · 18 perks pages · 19 save codes · feedback fixes (wording, Mushroom gathering, gather-now option, "for X", side drops,
Steel crafting, outlets always offered, pickaxes keep, quest wording, AP units, trade max, themes, paste Hide/Show, combined
"Do these next", main quests) · 20 tabs · 21 Done ticks · 22 Spend my… (+ season filter on trip yields) · 23 What to plant now (+ Breakfast Boost batch) · 24 crops never planned to void · 25 Veggie Juice tab · 26 Daily overflow · 27 Kitchen (pantry, stir-based cook times) · 28 Wishing well. · then: Veggie Juice on crops setting (A Better Juice
10%/20%), settings split (General settings, hover/tap tips, "I check the game N times per…"), Blended by effort / By type, knowledge/
(OKF), public release on GitHub Pages (fresh history), welcome card, made-up fixtures, new-player batch (no Tower talk, mastery
rewards, Leveling up card, place skill levels, starting perks), saved-page upload, Steam app copies + chat stripping.
2026-09-30/10-01: production capped at one inventory per drop (noon bonuses: Tree Shaker, Antler Snare), waits in whole drops,
crafting uses ingredients in stock; silver (read from Steam top bar or typed; quests and Tower levels check it; Making silver card;
prices.js; sell bonus/crafting silver cut from perks); data/perks.md (every perk, Chrome+Steam formats); ovens from Cooking level;
perk tips (page › section › perk); shorter text everywhere with Condensed/Expanded views and a card grid on Next steps; quests one
column; Veggie Juice calculator in h + min; no cooking as an outlet for piles; townsfolk (npcs.js, cheap gifts ❤️/👍, gift leftovers,
quest-only items point to their quest, optional friendship paste, friendship gift bonus); recipes-extra.js (Spooky Scarecrow).
