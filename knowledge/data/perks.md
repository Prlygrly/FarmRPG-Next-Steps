---
type: Game Data
title: "Perks and Farm Supply upgrades"
description: "Every perk on the Perks page (skill points) and the Farm Supply page (gold), with its wording, cost and what reads it; plus how the pages copy in Chrome and Steam."
tags: [perks, farm-supply, parser, sell-price]
sources:
  - id: paste-chrome
    resource: Perks and Farm Supply pages copied from Chrome by the player, 2026-09-30 (player's own unlocks left out)
    title: "Chrome copies of the Perks and Farm Supply pages"
  - id: paste-steam
    resource: Perks and Farm Supply pages copied from the Steam app by the player, 2026-09-30
    title: "Steam copies of the Perks and Farm Supply pages"
  - id: player
    resource: confirmed by the player in planning chats
    title: "Player confirmation"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T22:00:00Z }
---

# How perks work

- Perks of the same kind **stack by adding**: Negotiator I-IV (5 + 10 + 15 + 20) is 50% more silver, not 20%.[^paste-chrome]
- Perks page: bought with skill points (one per skill level, plus one per item Mastered). Resetting costs gold, more each time.[^paste-chrome]
- Farm Supply: bought with gold, permanent. Supply Vouchers give a discount. One upgrade is on sale each week ("Upgrades on Sale (Changes on Mondays)"), and that list repeats perks from the sections below.[^paste-chrome]
- Artifacts unlock with Tower levels (listed with "Requires Tower Level N" on the Perks page, "Tower N Artifact" on Farm Supply).[^paste-chrome]
- The costs below are what the page showed; perks the player already had show "Unlocked" instead of a cost, so those are "?".

# Totals the planner uses

| Setting | From | Max seen |
|---|---|---|
| Sell bonus % (`sellBonus`) | Negotiator I-IV (5/10/15/20), Fertilizer I (10), Gift of Persuasion (10, Tower 20) | 70 |
| Crafting silver cut % (`craftSilverCut`) | Artisan I-IV (5/10/15/20), Toolbox I (10), Steady Hands (10, Tower 30) | 80 |
| Crop growth cut % (`cropGrowthCut`) | Quicker Farming I-IV (5/10/15/20), Irrigation System I-II (10/20), Enriched Soil (10, Tower 10) | 90 |
| Corn growth cut % | Quicker Corn I-II (10/10) | 20 |
| Double Prizes % | Double Prizes I-II (15/25) | 40 |
| Wanderer % | Wanderer I-IV (4/7/9/13) | 33 |
| Resource Saver % | Resource Saver I (10, Perks), II (15, Supply), III (20, Tower 90) | 45 |
| Cook faster % | Quicker Cooking I-II (5/10), Hotter Ovens I (10) | 25 |
| Grape Juice a day | 1 + Pitcher (1) + Fountain (2) + Waterfall (3), x2 with Grape Juice Spring (Tower 150) | 14 |
| Wishing well tosses | 3 + Extra Wish (1) + Extra Wishes I-III (5/10/10) | 29 |
| Orchard / Antler noon % | Tree Shaker (Tower 170) / Antler Snare (Tower 160) | 10 each |
| Yes/no | Reinforced Netting, Fishing Trawl (Tower 70), Lemon Squeezer, Cinnamon Sticks, Iron Depot | |

Sell price = base x (1 + sell bonus) x mastery bonus; see [[silver]].

# Perks page (skill points)

## Farming Perks
| Perk | Effect | Cost |
|---|---|---|
| Farming Primer / II | Earn 10% more XP when farming | 10 / 25 Points |
| Quicker Farming I-IV | Crops grow 5% / 10% / 15% / 20% faster | ? |
| Double Prizes I / II | 15% / 25% chance a crop will yield 2 of the crop | ? |
| Quicker Corn I / II | Corn grows 10% faster (each) | ? |

## Fishing Perks
| Perk | Effect | Cost |
|---|---|---|
| Fishing Primer / II | Earn 10% more XP when fishing | 10 / 25 Points |
| Bait Saver I-IV | 5% / 10% / 15% / 20% chance you won't lose your bait fishing | IV: 20 Points |
| Double Hooks | 20% chance you will catch 2 fish (manual fishing only, affects streak) | ? |
| Crazy Hooks I | 1% chance you will catch a large amount of the fish when fishing manually, affects streak | ? |
| Stamina Lure I / II | +5 stamina per fish manually fished at the Farm Pond | 5 / 10 Points |

## Crafting Perks
| Perk | Effect | Cost |
|---|---|---|
| Crafting Primer / II | Earn 10% more XP when crafting | 10 / 25 Points |
| Artisan I-IV | Crafting costs 5% / 10% / 15% / 20% less Silver | III: 30, IV: 50 Points |
| Resource Saver I | 10% chance item is duplicated during crafting or resources are returned if max inventory | ? |

## Exploring Perks
| Perk | Effect | Cost |
|---|---|---|
| Exploring Primer / II | Earn 10% more XP when exploring | ? |
| Wanderer I-IV | 4% / 7% / 9% / 13% chance exploring won't use Stamina | ? |
| Energy Drink | +20 stamina refill every 10 minutes | ? |

## Cooking Perks
| Perk | Effect | Cost |
|---|---|---|
| Cooking Primer / II | Earn 10% more XP when cooking | ? |
| Quicker Cooking I / II | Cooking is 5% / 10% faster | ? |
| Please Recycle III | 10% chance Cooking Pot isn't consumed when cooking a meal | 10 Points |
| Induction Burner I | Cooking uses 10% less coal | ? |

## Mining Perks
| Perk | Effect | Cost |
|---|---|---|
| Mining Primer / II | Earn 10% more XP when mining | 10 / 25 Points |
| Pickaxe Saver I | 10% chance Pickaxe isn't consumed when mining a section | 10 Points |
| Effective Mining I | When fully mining an item get +1 more of that item | 25 Points |
| Deposit Detector I | Increased chance you will find deposits when mining with pickaxes | ? |

## Profit Perks
| Perk | Effect | Cost |
|---|---|---|
| Negotiator I-IV | Items sold earn 5% / 10% / 15% / 20% more Silver | ? |

## Miscellaneous Perks
| Perk | Effect | Cost |
|---|---|---|
| Animal Lover | Chickens/Cows/Pigs/Raptors level up faster | ? |
| Please Recycle I | 10% chance Glass bottle isn't consumed when drinking a drink | 10 Points |
| Forester I / II | Trees produce 5% / 10% more fruit daily | ? |
| Bottle Warmer | 3% chance a wine bottle placed into cellar starts 20 days old | ? |
| Vault Plans | 20% chance Vault prize is doubled | ? |
| Raptor Sofa | Raptors in RFC recover faster | ? |
| Millions of Peaches | Personal Help Requests give 5 Peaches | ? |
| Friendship Primer | Earn 10% more XP making friendships | ? |
| O.M.G I | 5% chance liked or loved items given to townsfolk have huge XP bonus | ? |
| Double Rewards I / II | 5% / 10% chance claiming a temple reward will result in double the reward | ? |
| Well-Earned Break | Adds 1 Day Off Voucher to the final Monthly Chore Reward | 15 Points |
| Free Spin I | 10% Chance a wheel spin will be free | ? |
| Keymaster I | 10% Chance key is not used when opening at the Locksmith | 10 Points |

## Artifact Perks (Tower)
| Perk | Effect | Tower |
|---|---|---|
| Enriched Soil | Crops grow 10% faster | 10 |
| Gift of Persuasion | Items sold earn 10% more Silver | 20 |
| Steady Hands | Crafting costs 10% less Silver | 30 |
| Animal Charmer | Chickens/Cows/Pigs/Raptors level up faster | 40 |
| Eagle Eye | Find rare items more easily | 50 |
| Fishing Trawl | Large Nets are more effective (+100 fish per Large Net, see [[tower]]) | 70 |
| Charming Personality | Townsfolk give you nice items hourly | 80 |

# Farm Supply page (gold)

## Cap Upgrades (repeatable)
| Upgrade | Effect | Cost |
|---|---|---|
| +50 Inventory Cap | shows "Current Cap is N" | 285 Gold (rises) |
| +25 Max Stamina | shows "Current Max is N" | 15 Gold (rises) |
| +5 Max Mailbox | shows "Current Max is N" | 300 Gold (rises) |
| +1 Active Meal Effect | shows "Current Max is N" | 500 Gold (rises) |

## Farming Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Irrigation System I / II | Crops grow 10% / 20% faster | ? |
| Fertilizer I | Items sold earn 10% more Silver | ? |
| Farming Almanac | Earn 10% more XP when farming | ? |
| Distributor I | Adds option to sell all unlocked crops at once | 50 Gold |
| Grape Juice Pitcher / Fountain / Waterfall | +1 / +2 / +3 Extra Grape Juice uses per day | ? |
| Grape Juice Vat | Bulk use Grape Juice | 500 Gold |
| Flour Power | Flour processes twice as fast | 75 Gold |
| Pine Boost | Pine processes twice as fast | ? |
| Sugar Boost I / II | Unrefined Sugar processes twice as fast / doubles Unrefined Sugar production for same inputs | 75 / 250 Gold |
| Oak Boost I / II | Doubles Oak production at the Sawmill (needs Sturdy Saw) | 125 / 250 Gold |

## Fishing Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Fishing Almanac | Earn 10% more XP when fishing | 30 Gold |
| Fish Supplier | Sell all unlocked fish while fishing (all zones); locking options | ? |
| Crazy Hooks II | 1% chance of a large amount of the fish when fishing manually | 50 Gold |
| Reinforced Netting | Fishing Nets catch 15 things | ? |
| Stamina Lure III | +5 stamina per fish manually fished at the Farm Pond | 30 Gold |
| Large Net Launcher / Blaster | Use 10-50 / up to 100 Large Nets at a time | ? |

## Crafting Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Toolbox I | Crafting costs 10% less Silver | 30 Gold |
| Crafting Almanac | Earn 10% more XP when crafting | ? |
| Resource Saver II | 15% chance item is duplicated during crafting or resources are returned if max inventory | ? |

## Exploring Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Exploring Almanac | Earn 10% more XP when exploring | 30 Gold |
| Lemon Squeezer | Drinking Lemonade gives 20 Items | ? |
| Sprint Shoes I-III | Doubles Stamina Effectiveness, Stamina is used faster | ? |
| Cinnamon Sticks | Apple Cider is 25% more effective | ? |

## Cooking Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Cooking Almanac / II | Earn 10% more XP when cooking | ? |
| Hotter Ovens I | Cooking is 10% faster | ? |
| Meal Collector, Power Mixer, Giant Spoon, Dash and Pinch, Bulk Ovens, Fruit Puncher | Collect / stir / taste / season / cook / drink Fruit Punch in all ovens at once | ? |
| Induction Burner II | Cooking uses 10% less coal | 50 Gold |

## Mining Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Mining Almanac | Earn 10% more XP when mining | 50 Gold |
| Pickaxe Saver II | 10% chance Pickaxe isn't consumed when mining a section | 50 Gold |
| Deposit Detector II | Increased chance you will find deposits | 100 Gold |
| Effective Mining II | When fully mining an item get +1 more of that item | 100 Gold |
| Auto-Explosives | Automatically use Explosives when starting a new mining floor | 50 Gold |

## Quality of Life Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Collect-o-Matic / II | Collect all Pet Items at once / individual items | ? / 500 Gold |
| Pet Whistle | Collect pet items from Home | 30 Gold |
| Inventory Monitor | Grays out items when inventory is full; shows counts on location details | ? |
| Bulletin Board | Displays Help Needed Progress; highlights items in Market | 30 Gold |
| Yes I'm Sure | Removes confirmations (Lemonades, Fishing Nets, Mailboxes, Quarry, Ironworks, Wine Cellar, Worm Habitat, Crafting) | ? |
| Iron Depot | Keeps inventory full of iron and nails by auto-buying with Silver | ? |
| Mastery Tracker, Farm Dashboard, Quick Sell / Craft / Store / Give / Meals | Interface helpers | ? |

## Bank Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Banker I / II / III | Bank interest +1% / +2% / +4% | 30 / 50 / 100 Gold |
| Savings Account I-V | Bank Interest Cap +2M / +10M / +20M / +40M / +80M Silver | 50 / 250 / 500 / 500 / 500 Gold |

## Orchard Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Forester III / IV | Trees produce 5% / 10% more fruit daily | ? |
| Orchard Land I-VII | +100 / 250 / 500 / 750 / 1000 / 1000 / 1000 trees | ? |

## Wine Cellar Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Fancy / Designer / Couturier Bottle | Wine Value Cap +2M / +5M / +8M Silver | 50 / 125 / 200 Gold |
| Cellar Insulation I-III | Wine increases in value faster | ? |
| Cellar Expansion I-VIII | +50 Bottles each | 50, 150, 250, 350, 450, 50, 50, 50 Gold |
| Wine-o-Matic | Bulk options in the Wine Cellar | ? |

## Livestock Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Pet-o-Matic I / II, Feed-o-Matic I | Pet all chickens / cows, feed all pigs | ? |
| Feed Boost | Feed processes twice as fast | 75 Gold |
| Send-o-Matic I / II | Bulk slaughter for cows / pigs | 30 / 30 Gold |
| Expanded Coop I-V | +50 chickens each | 30, 50, 75, 100, 125 Gold |
| Expanded Pig Pen I-V | +50 pigs each | ? |
| Expanded Pasture I-V | +50 cows each | 75, 100, 125, 150, 175 Gold |
| Animal Show I-III | +4 featured animals on profile | 30 / 60 / 90 Gold |

## Wheel of Borgen Upgrades
Wheel Boost (bigger rewards), Wheel Credit (lower AC cost), Wheel Bonus (15% chance of much bigger rewards), Wheel Grease (faster), Wheel Motor (Spin 10x). Costs ?.

## Miscellaneous Upgrades
| Upgrade | Effect | Cost |
|---|---|---|
| Mattress Pad | +1 Max Stamina daily in Farmhouse | ? |
| Forklift / II | +2 Max Inventory Growth in Storehouse | ? |
| Apple Pie Enthusiast I | Farmhouse stamina cap +500k | 500 Gold |
| Memory Boost I / II, Memory Expansion I | Lost+Found: +1 miss / +1 daily game | 100 Gold each |
| Please Recycle II | 10% chance Glass bottle isn't consumed when drinking | 30 Gold |
| O.M.G II | 5% chance liked/loved gifts give huge friendship XP | 50 Gold |
| Extra Wish | An extra toss into the Well daily | ? |
| Extra Wishes I-III | +5 / +10 / +10 tosses into the Well daily | ? |
| Star Map | Charters/Expeditions are significantly more effective | ? |
| Conversation Skills I-III | XP conversion +100,000,000 (Exchange Center) | 150 Gold each |
| Codebreaker | 1 extra Vault guess daily | ? |
| Keymaster II | 10% Chance key is not used at the Locksmith | 75 Gold |
| Raptor Rescue / Refresher | Heal all Raptors / auto-heal every minute with Grape Juice | 30 / 100 Gold |
| Raptor Recruit I | +1 Raptor fighting in RFC | ? |
| Ace Up the Sleeve I-III, Know When To Hold 'Em, Dealer's Choice, High Roller I | Buddyjack / House of Cards helpers | Hold 'Em 75, Dealer's Choice 250 Gold |

## Artifact Upgrades (Tower)
| Upgrade | Effect | Tower |
|---|---|---|
| Orchard Annex I | +400 trees | 60 |
| Resource Saver III | 20% chance item is duplicated during crafting | 90 |
| Inventory Boost | Inventory Cap +2500 | 100 |
| Orchard Annex II | +1500 trees | 110 |
| Magic Coals | Cooking takes fewer resources | 120 |
| Personal Bonus | Doubles rewards from Personal Help Requests | 130 |
| Reflecting Pool | Doubles rewards from Wishing Well | 140 |
| Grape Juice Spring | Doubles Grape Juice use allowed daily | 150 |
| Antler Snare | 10% of Antler Production drops at Noon daily | 160 |
| Tree Shaker | 10% of Orchard Production drops at Noon daily | 170 |
| Inferno Forge | 10% more when crafting Inferno Spheres | 180 |
| Lava Forge | 10% more when crafting Lava Spheres | 190 |
| Inventory Boost II | Inventory Cap +2500 | 200 |

# How the pages copy

## Chrome
- Chat panel first (stripped by `stripChat`), then Navigation, then the page. The Perks page also carries the Home page's blocks ("Where do you want to go?", "My skills") before the perks.
- Perks page markers: "N / Points Left / N / Points Used / N / Perks Avail / N / Times Reset". Sections start at "Farming Perks" and end at "Consume a meal".
- Farm Supply markers: "Cap Upgrades", "Farming Upgrades"; the Town page's districts come first. "Hide Unlocked Perks:" and a Supply Voucher note sit before the first section.
- Each perk: "* Name", then one to five lines of description (wrapped mid-sentence), then an optional "Requires ... Perk" / "Requires Tower Level N" / "Tower N Artifact" line, then either "Unlocked" or a cost ("N Points" / "N Gold"). A sale shows "   SALE! Normally N Gold   " before the cost.
- Headings are in title case ("Profit Perks", "Bank Upgrades").

## Steam
- Farm Supply (confirmed): the same lines as Chrome, but every heading is in capitals ("CAP UPGRADES", "UPGRADES ON SALE (CHANGES ON MONDAYS)", "ARTIFACT UPGRADES", and the Town districts above them). Perk names, descriptions, costs and "Unlocked" keep their case. The parser matches headings in any case.
- Chat messages carry an extra "flag_fill" line after the sender (stripped with the chat).[^paste-steam]
- After the last section, before "Consume a meal", Steam adds the top bar: "[silver](…/bank.php)   [gold](…/gold.php)   [N](…/town.php)", a bar of tracked masteries ("[84,384/100K   ](…/item.php?id=378)…"), a "[Mastery Progress]" link, then the silver bar again. These have no "Unlocked" line, so the perk reader ignores them; `parseSilver` reads the first silver link.
- Perks page (confirmed): the same lines as Chrome with capital headings ("FARMING PERKS" … "ARTIFACT PERKS", and the Home blocks "MY SKILLS", "PERKS, MASTERY & MORE"). The "Supporters get free Perk resets" note is missing, and the top bar and tracked-mastery strip come at the end, as on Farm Supply.[^paste-steam]
- The Town page's "Bank … 300.2B" is silver deposited in the Bank, not silver on hand.

[^paste-chrome]: Chrome copies of the Perks and Farm Supply pages
[^paste-steam]: Steam copies of the Perks and Farm Supply pages
[^player]: Player confirmation
