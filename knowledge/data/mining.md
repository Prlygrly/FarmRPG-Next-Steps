---
type: Dataset
title: "Mining zones"
description: "Per zone: level, pickaxe, lantern, charm, vein drop rates by floor band, deposits, floor rewards; vein sizes and Mining skill rewards."
resource: ../../mining.js
tags: [data, mining]
sources:
  - id: origin
    resource: https://buddy.farm/l/spring-cave/ (and the other five zones)
    title: "buddy.farm mining locations"
  - id: library
    resource: in-game Library pages Mining, Mining Drops, Mining Floor Rewards, Skill Level Rewards (pasted 2026-11-23)
    title: "FarmRPG Library"
generated: { by: claude-code/opus-5.5, at: 2026-11-24T06:00:00Z }
---

# Fetching

`node tools/snapshot-mining.js` (6 requests to `/page-data/l/<zone>/`; slugs `spring-cave`, `highland-hollow`, `sol-grotto`,
`ember-caverns`, `fenrir-s-den`, `mossrock-mine`). Each zone's `dropRates` has one entry per floor band (`miningFloor` 1, 10, 100,
1,000, 10,000) with `items[].rate`, `silverPerHit` and `xpPerHit`.[^origin]

The Library facts (level, pickaxe, lantern, charm, deposits, floor rewards, vein sizes, skill rewards) are typed into the script;
buddy.farm doesn't have them. Update the script when the Library changes.[^library]

# Shape

`MINING.zones[name] = { level, pickaxe, lantern, charm, deposits: { item: [min, max] }, rewards: { floor: [[item, qty]] },
bands: [{ floor, silver, xp, items: { item: hitsPerDrop } }] }`; `MINING.vein = [[fromFloor, min, max]]`;
`MINING.skill = { level: { silver, items } }`.

A band applies from its floor up to the next band's floor. Rates are buddy.farm's manual "hits per drop" (lower = more common).
How AEX splits its items isn't known; see [Mining](/mechanics/mining.md).

[^origin]: buddy.farm mining locations.
[^library]: FarmRPG Library mining pages.
