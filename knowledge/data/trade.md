---
type: Dataset
title: "Trade prices"
description: "Median trade-chat prices in AP (unofficial snapshot)."
resource: ../../trade.js
tags: [data]
sources:
  - id: origin
    resource: https://farmrpg-trade.live/
    title: "farmrpg-trade.live"
generated: { by: claude-code/opus-5.5, at: 2026-09-30T12:00:00Z }
---

# Fetching

`https://farmrpg-trade.live/api/trpc/items.list?input={"json":{"limit":1000,"sort":"liquidity"}}` (unofficial; snapshot only).

# About

Median trade-chat prices in AP (unofficial snapshot). Loaded by the planner page as a plain script (works from file://).[^origin]

# Refresh

Regenerate with `node tools/snapshot-trade.js`.

[^origin]: farmrpg-trade.live
