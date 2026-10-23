---
type: Game Mechanic
title: "Craftworks"
description: "Automatic crafting: every few seconds, in list order, as far as ingredients and the output cap allow; slots cost Gold."
tags: [crafting, inventory, automation]
sources:
  - id: player
    resource: confirmed by the player in planning chats (2026-10-22)
    title: "Player confirmation"
  - id: page
    resource: the player's Craftworks page (Workshop › Craftworks), 2026-10-22
    title: "Craftworks page"
generated: { by: claude-code/opus-5.5, at: 2026-10-22T09:00:00Z }
---
# How it runs

- Items added to the Craftworks are crafted automatically whenever the resources are there, in the order of the list.[^page]
- It runs every 2-5 seconds or so and crafts everything it can, top of the list first.[^player]
- Order matters: if Boards come before a craft that also needs Wood, every Wood becomes Boards first, so the later craft gets
  none until Boards are at the cap and the Craftworks can't make more.[^player]
- It stops at the cap: it can't craft into a full item (see [inventory cap](/mechanics/inventory-cap.md)). An item at the cap shows
  its inventory in red; one missing an ingredient says "Out of: Lemon".[^page]
- Crafts made by the Craftworks give no Crafting XP.[^player]
- Chains work on their own: with Black Powder and Explosive both listed, Coal becomes Black Powder, then Explosives, until one
  of them is full or an ingredient runs out. So more than one inventory of a raw item can be used between visits.[^player]

# Slots

- One recipe per slot; a player starts with 0 and buys each slot with Gold, and they get expensive (the 14th costs 650 Gold).
  Patreon subscribers get extra slots.[^page][^player]
- The planner never recommends buying more slots.[^player]
- Setups can be saved as named sets and shared by code.[^page]

[^player]: Player confirmation
[^page]: Craftworks page
