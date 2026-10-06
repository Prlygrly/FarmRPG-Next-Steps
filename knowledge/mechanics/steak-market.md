---
type: Game Mechanic
title: "Steak Market (Steaks, Steak Kabobs, Truffles)"
description: "Prices that change daily (Steaks, Truffles) or hourly (Steak Kabobs), and when to buy or sell."
tags: [silver, market, truffles]
sources:
  - id: wiki
    resource: https://farmrpg.com/wiki.php?page=Beef+Tips
    title: "FarmRPG wiki: Steak market, Beef Tips (2026-02-15) and Truffles (2026-05-02), pasted by the player"
  - id: player
    resource: confirmed by the player in planning chats (Steak Market and history pages pasted 2026-10-05)
    title: "Player confirmation"
generated: { by: claude-code/opus-5.5, at: 2026-10-05T23:30:00Z }
---

# The page

- Town > Steak Market shows three markets: Steaks (price changes each day; "Stable", "Unstable", "Risky" or "Wild"; a cap on
  how many more you can buy), Steak Kabobs (price changes each hour) and Truffles (White and Black, price changes each day,
  with a "price increase chance at Reset" from Very Low upward). History pages: Truffles and Steaks for the last 90 days,
  Kabobs for the last 24 hours.[^player]
- There's no public source for these prices: the game's pages need a login. The planner reads a pasted Steak Market page
  (or history page) and keeps the history in the player's browser.[^player]

# When to sell Truffles (community lines)

| | High day | Sell | Only if you need the silver | Hold |
|---|---|---|---|---|
| White | 190M+ | 185M+ | 175M+ | under 175M |
| Black | 610M+ | 600M+ | 580M+ | under 580M |

- The wiki's community lines: 185M is a good price for White, 600M for Black; the Black record is 619,936,310.[^wiki]
- Records seen: Black around 618M, White 190M+. 90 days to 2026-10-05: White 69M-196M, Black 153M-619M.[^player]
- Players with Sinking Swamp have Truffles, which beat any gathering for silver ([silver](/mechanics/silver.md)).

# Getting Truffles

- Pigs find White and Black Truffles once they have a Pig Collar, from "The Smell of a Fun Guy" questline (needs 4x99 and
  Tower level 1). They're found at reset, only if the pigs were fed that day.[^wiki]
- More pigs and higher pig levels mean more Truffles; slaughter only the pigs you need for Bacon.[^wiki]
- The more players sell on a day, the higher the chance the price rises at the next reset (not guaranteed); hoarding keeps
  it low longer. Truffles (like steaks, kabobs and wine) get no event or meal bonuses.[^wiki]

# Steaks and Kabobs

- 90 days of Steaks (to 2026-10-05): median ~50,100; 10th-90th percentile 46,300-55,400; range 28,545-74,951; the wide
  swings come on Risky and Wild days. Planner default: buy at 46,000 or less, sell at 55,000 or more.[^player]
- 24 hours of Kabobs: median ~9,900; 10th-90th percentile 9,600-10,300. Planner default: buy at 9,600 or less, sell at
  10,300 or more; advice lasts until the top of the next hour. The player prefers these wider lines to the wiki's
  10,000 rule (bigger margin per trade).[^player]
- Kabobs usually run 9,500-10,500 and never go below 9,500; now and then 11,000-12,000. The wiki's rule of thumb: buy
  under 10,000, sell over 10,000.[^wiki]
- Steak price moves at reset, by how stable the market is: Stable usually 49-51k, Unstable 47.5-52.5k, Risky 40-60k,
  Wild 25-75k. The history page shows how long each state lasted.[^wiki]
- With a pasted history of 10+ rows, the planner uses that history's 10th / 90th percentile instead.
- Players with Truffles are reminded each day to paste the Steak Market (see [planner rules](/planner/rules.md)).
- Shared prices (not built): a Cloudflare Worker + KV (free) would let one player's paste give everyone today's Truffle
  prices; only the two prices and the date are sent; two exact matching reports confirm a day; plausible ranges and a
  per-device limit guard against lies. r/FarmRPG gets ~1 Truffle post a week, mostly "% of best value" titles, so a
  Reddit reader would only catch notable days.[^player]
- Reset is midnight server time (US Central); the market closes shortly before and reopens shortly after. Prices pasted
  before the latest reset are shown as stale.[^wiki]

[^wiki]: FarmRPG wiki: Steak market, Beef Tips, Truffles
[^player]: Player confirmation
