---
type: Game Mechanic
title: "Levels and XP"
description: "XP needed for each level (skills, townsfolk friendship and livestock share one table), and how each skill earns XP."
tags: [xp, levels, skills, progression]
sources:
  - id: wiki-level
    resource: https://farmrpg.com/wiki.php?page=Level%20XP
    title: "FarmRPG wiki: Level XP"
  - id: wiki-xp
    resource: https://farmrpg.com/wiki.php?page=XP%20Mechanics
    title: "FarmRPG wiki: XP Mechanics"
  - id: buddy-loc
    resource: https://buddy.farm/page-data/l/<place>/page-data.json (xpPerHit)
    title: "buddy.farm place pages"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T20:00:00Z }
---
# Rules

- One XP table covers skills (Farming, Fishing, Crafting, Exploring, Cooking, Mining), townsfolk friendship and livestock.[^wiki-level]
- Level 99 needs 2,000,000,000 total XP. (The wiki's table has a couple of odd steps, e.g. levels 10-12 and 33-34; copied as given.)[^wiki-level]
- Most items have an XP value on their item page: you get it when you farm, craft or fish that item.[^wiki-xp]
- Items opened at the locksmith give no XP.[^wiki-xp]

# How each skill earns XP

- **Farming**: a flat 15 XP per crop planted, plus the item's XP on harvest. Grape Juice gives the same XP as growing normally. Extra crops from Double Prizes, the Scythe of Dewstar, cookies, Mega seeds or mushroom harvests give no extra XP. First purchase of a building, crop row or kitchen gives 1 XP per silver spent (upgrades don't).[^wiki-xp]
- **Exploring**: 125 base XP per explore (manual or with stamina items), +125 per point of Exploring Effectiveness, plus the XP of items found. Exploring with Lemonade or Arnold Palmers gives the items' XP plus 250 base per item (XP-primer perks don't apply; event XP bonuses do). Expeditions give XP. buddy.farm lists average XP per explore for each place (`xpPerHit`).[^wiki-xp][^buddy-loc]
- **Fishing**: a flat 75 XP per fish (bait or nets) plus the item's XP. Extra fish from perks, Crazy/Double Hooks or events give no XP; bonus fish from net perks do. Charters give XP.[^wiki-xp]
- **Crafting**: Craftworks crafts give no XP; Resource Saver extras give no XP.[^wiki-xp]
- **Cooking**: longer base cook times give more XP from actions (see Lunarific's community guide); one meal gives x20 XP on the next 32 cooking actions.[^wiki-xp]
- **Livestock** (same table): Chicken/Cow 350 XP per pet/feed, Pig 1000, Raptor 1350; Animal Lover +350, Animal Charmer (T40 artifact) +500.[^wiki-xp]
- Exploring is usually the hardest main skill to level.[^wiki-xp]

# Schema

| Level | Total XP | XP to next |
|---|---|---|
| 1 | 0 | 1,250 |
| 2 | 1,250 | 2,500 |
| 3 | 3,750 | 3,500 |
| 4 | 7,250 | 4,500 |
| 5 | 11,750 | 6,000 |
| 6 | 17,750 | 7,500 |
| 7 | 25,250 | 9,000 |
| 8 | 34,250 | 11,000 |
| 9 | 45,250 | 13,000 |
| 10 | 58,250 | 13,149 |
| 11 | 71,399 | 27,584 |
| 12 | 98,983 | 16,376 |
| 13 | 115,359 | 18,275 |
| 14 | 133,634 | 20,394 |
| 15 | 154,028 | 22,759 |
| 16 | 176,787 | 25,399 |
| 17 | 202,186 | 28,345 |
| 18 | 230,531 | 31,633 |
| 19 | 262,164 | 35,302 |
| 20 | 297,466 | 39,397 |
| 21 | 336,863 | 43,967 |
| 22 | 380,830 | 49,067 |
| 23 | 429,897 | 54,758 |
| 24 | 484,655 | 61,109 |
| 25 | 545,764 | 68,197 |
| 26 | 613,961 | 76,107 |
| 27 | 690,068 | 84,935 |
| 28 | 775,003 | 94,787 |
| 29 | 869,790 | 105,782 |
| 30 | 975,572 | 118,052 |
| 31 | 1,093,624 | 131,746 |
| 32 | 1,225,370 | 147,028 |
| 33 | 1,372,398 | 164,083 |
| 34 | 1,536,481 | 164,083 |
| 35 | 1,700,564 | 183,116 |
| 36 | 1,883,680 | 204,357 |
| 37 | 2,088,037 | 228,062 |
| 38 | 2,316,099 | 254,517 |
| 39 | 2,570,616 | 284,040 |
| 40 | 2,854,656 | 316,988 |
| 41 | 3,171,644 | 353,758 |
| 42 | 3,525,402 | 394,793 |
| 43 | 3,920,195 | 440,588 |
| 44 | 4,360,783 | 491,696 |
| 45 | 4,852,479 | 548,732 |
| 46 | 5,401,211 | 612,384 |
| 47 | 6,013,595 | 683,420 |
| 48 | 6,697,015 | 762,696 |
| 49 | 7,459,711 | 851,168 |
| 50 | 8,310,879 | 949,903 |
| 51 | 9,260,782 | 1,060,091 |
| 52 | 10,320,873 | 1,183,061 |
| 53 | 11,503,934 | 1,320,296 |
| 54 | 12,824,230 | 1,473,450 |
| 55 | 14,297,680 | 1,644,370 |
| 56 | 15,942,050 | 1,835,116 |
| 57 | 17,777,166 | 2,047,989 |
| 58 | 19,825,155 | 2,285,555 |
| 59 | 22,110,710 | 2,550,679 |
| 60 | 24,661,389 | 2,846,557 |
| 61 | 27,507,946 | 3,176,757 |
| 62 | 30,684,703 | 3,545,260 |
| 63 | 34,229,963 | 3,956,510 |
| 64 | 38,186,473 | 4,415,465 |
| 65 | 42,601,938 | 4,927,658 |
| 66 | 47,529,596 | 6,137,180 |
| 67 | 53,666,776 | 6,849,092 |
| 68 | 60,515,868 | 7,643,586 |
| 69 | 68,159,454 | 8,530,241 |
| 70 | 76,689,695 | 9,519,748 |
| 71 | 86,209,443 | 10,624,038 |
| 72 | 96,833,481 | 11,856,426 |
| 73 | 108,689,907 | 13,231,771 |
| 74 | 121,921,678 | 14,766,656 |
| 75 | 136,688,334 | 16,479,588 |
| 76 | 153,167,922 | 18,391,220 |
| 77 | 171,559,142 | 20,524,601 |
| 78 | 192,083,743 | 22,905,454 |
| 79 | 214,989,197 | 25,562,486 |
| 80 | 240,551,683 | 28,527,734 |
| 81 | 269,079,417 | 31,836,951 |
| 82 | 300,916,368 | 35,530,037 |
| 83 | 336,446,405 | 39,651,521 |
| 84 | 376,097,926 | 44,251,097 |
| 85 | 420,349,023 | 49,384,224 |
| 86 | 469,733,247 | 55,112,793 |
| 87 | 524,846,040 | 61,505,876 |
| 88 | 586,351,916 | 68,640,557 |
| 89 | 654,992,473 | 76,602,861 |
| 90 | 731,595,334 | 85,488,792 |
| 91 | 817,084,126 | 97,405,491 |
| 92 | 914,489,617 | 104,472,527 |
| 93 | 1,018,962,144 | 118,823,340 |
| 94 | 1,137,785,484 | 132,606,847 |
| 95 | 1,270,392,331 | 147,989,241 |
| 96 | 1,418,381,572 | 165,155,992 |
| 97 | 1,583,537,564 | 184,314,087 |
| 98 | 1,767,851,651 | 232,148,349 |
| 99 | 2,000,000,000 | - |

[^wiki-level]: FarmRPG wiki: Level XP
[^wiki-xp]: FarmRPG wiki: XP Mechanics
[^buddy-loc]: buddy.farm place pages
