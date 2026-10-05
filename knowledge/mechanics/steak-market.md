---
type: Game Mechanic
title: "Steak Market (Steaks, Steak Kabobs, Truffles)"
description: "Prices that change daily (Steaks, Truffles) or hourly (Steak Kabobs), and when to buy or sell."
tags: [silver, market, truffles]
sources:
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

- Records seen: Black around 618M, White 190M+. 90 days to 2026-10-05: White 69M-196M, Black 153M-619M.[^player]
- Players with Sinking Swamp have Truffles, which beat any gathering for silver ([silver](/mechanics/silver.md)).

# Steaks and Kabobs

- 90 days of Steaks (to 2026-10-05): median ~50,100; 10th-90th percentile 46,300-55,400; range 28,545-74,951; the wide
  swings come on Risky and Wild days. Planner default: buy at 46,000 or less, sell at 55,000 or more.[^player]
- 24 hours of Kabobs: median ~9,900; 10th-90th percentile 9,600-10,300. Planner default: buy at 9,600 or less, sell at
  10,300 or more; advice lasts until the top of the next hour.[^player]
- With a pasted history of 10+ rows, the planner uses that history's 10th / 90th percentile instead.
- Reset is assumed to be midnight US Central time (unconfirmed); prices pasted before it are shown as stale.

[^player]: Player confirmation
