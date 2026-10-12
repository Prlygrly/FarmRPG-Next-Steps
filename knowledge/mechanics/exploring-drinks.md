---
type: Game Mechanic
title: "Exploring drinks: Apple Cider, Arnold Palmer, Orange Juice"
description: "How many explores, how much stamina and how many items each exploring drink gives, and how Exploring Effectiveness changes Apple Cider; for comparing items per gold."
tags: [exploring, apple-cider, arnold-palmer, orange-juice, exploring-effectiveness]
sources:
  - id: wiki-ee
    resource: https://farmrpg.com/wiki.php?page=Exploring%20Effectiveness
    title: "FarmRPG Library: Exploring Effectiveness"
  - id: wiki-cider
    resource: https://farmrpg.com/wiki.php?page=Apple%20Cider
    title: "FarmRPG Library: Apple Cider"
generated: { by: claude-code/opus-5.5, at: 2026-10-11T22:00:00Z }
---
# Rules

- **Exploring Effectiveness (EE)** is per place (bought from that place's townsfolk on its Info page; each upgrade
  costs 10x the last). Each point means one more explore per tap; the item find chance per explore stays the same.
  The Info page states it as "You are currently using N stamina every time you continue exploring this location": N = EE.[^wiki-ee][^player]
- Protein Bars add EE without raising the next upgrade's price: 3 per place free (plus the bar), then 25, 50, 75... Gold each.[^wiki-ee]
- Sprint Shoes I-III double the EE gained from upgrades (x2, x4, x8); an EE of 1 isn't affected.[^wiki-ee]
- **Apple Cider** explores 1,000 + 10 x EE times (1,010 with no upgrades). Cinnamon Sticks x1.25 (12.5 per EE point,
  1,263 minimum). Needs at least that much stamina to use.[^wiki-cider]
- Cider sets the place's find rate to 0.40 items per explore everywhere (manual rates are 0.25-0.40), so it gains most at
  low-rate places (Highland Hills, Whispering Creek, Jundland).[^wiki-cider]
- Cider stamina: explores x (1 - Wanderer, up to 33%) x 0.8 with Neigh (46.4% off at most together).[^wiki-cider]
- buddy.farm's cider rates assume 1,000 explores (1,250 with Cinnamon Sticks) and ignore EE: scale by your explores / 1,250.[^wiki-cider]
- **Arnold Palmer** finds a fixed number of items (200; 500 with Lemon Squeezer), uses no stamina, and EE has no effect on it.[^wiki-ee]
- **Orange Juice** gives 100 stamina. Explored by hand, that is 100 / (1 - Wanderer) explores at the place's own find rate.[^player]
- Items you're maxed on are lost from every drink alike.[^player]

# Check (player, Forest, EE 104, Cinnamon Sticks, Lemon Squeezer, Wanderer 33%, no Neigh)

- Cider: (1,000 + 1,040) x 1.25 = 2,550 explores, as measured; stamina 1,694-1,721 (2,550 x 0.67 = 1,709); 753-832 items.
- Arnold Palmer: 392 items. Both are about 78% of the formula (1,020 and 500): Arrowheads and Straw were maxed.[^player]

# Items per gold

- AP: items / AP price. Cider: items / (AC price + stamina / 100 x OJ price). OJ by hand: items per OJ / OJ price.
- Forest, 6g/k OJ, 40g/k AP, 10g/k AC, nothing maxed: AP 12,500; cider ~9,100 (17 OJ per cider is most of its cost);
  OJ by hand ~8,300.[^player]

[^player]: Player measurements and prices (2026-10-11)
