// Parsing for pasted FarmRPG pages. Works in the browser (window.FRP.parse) and in node (require).
(function (root) {
  const toInt = s => parseInt(String(s).replace(/,/g, ""), 10);
  // Strip list bullets and markdown links that some browsers add when copying
  const clean = s => s.trim().replace(/^[*•-]\s+/, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").trim();
  const SKILLS = ["Farming", "Fishing", "Crafting", "Exploring", "Cooking", "Mining"];

  function parseMastery(text) {
    const items = {};
    const put = (name, val) => {
      if (!name || !isFinite(val) || name.length > 60) return;
      items[name] = Math.max(items[name] || 0, val);
    };
    // Pass 1: name on its own line, "X / Y Progress" on a later line
    const lines = text.split(/\r?\n/).map(clean);
    const progRe = /^([\d,]+)\s*\/\s*([\d,]+|∞)\s*Progress/i;
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(progRe);
      if (!m) continue;
      let j = i - 1;
      while (j >= 0 && !lines[j]) j--;
      if (j >= 0) put(lines[j], toInt(m[1]));
    }
    // Pass 2: everything squashed onto one line (some phone browsers). Only used if pass 1 found little,
    // because without a known-item list it can't tell names from surrounding junk as well.
    const flat = text.replace(/\s+/g, " ");
    if (Object.keys(items).length < 5) {
      const re = /(?:^|\bStop|\bTrack|Complete!|chevron_down|chevron_right|chevron_up)\s+([^\/%]+?)\s+([\d,]+)\s*\/\s*([\d,]+|∞)\s*Progress/g;
      let m;
      while ((m = re.exec(flat))) {
        put(m[1].replace(/^.*chevron_\w+\s+/, "").replace(/^(Mega Mastered|Ready to Claim|Nothing ready yet|Mastery In-Progress|Stop Tracking All)\s+/i, "").replace(/^[*•-]\s+/, "").trim(), toInt(m[2]));
      }
    }
    // A tier only counts as collapsed if it never appears expanded anywhere in the paste
    const closed = new Set(), open = new Set();
    const cre = /(Tier\s+[IVX]+(?:\s*\([A-Z]+\))?|No Tier|Mega Mastered)\s*chevron_(right|down|up)/g;
    let m;
    while ((m = cre.exec(text))) (m[2] === "right" ? closed : open).add(m[1].replace(/\s+/g, " "));
    const collapsed = [...closed].filter(t => !open.has(t));

    // Home block: "The Tower / Unused Points: N / Level N" (Unused Points here = AK, single points)
    const plain = lines.join("\n").replace(/\s+/g, " ");
    let tower = null;
    const tm = plain.match(/The Tower\b.{0,120}?Unused Points:\s*([\d,]+).{0,120}?Level\s+([\d,]+)/);
    if (tm) tower = { ak: toInt(tm[1]), level: toInt(tm[2]) };

    const skills = {};
    for (const s of SKILLS) {
      const sm = plain.match(new RegExp("\\b" + s + " Level (\\d+)"));
      if (sm) skills[s] = toInt(sm[1]);
    }

    // "So far, you have 246 items Mastered, 168 items Grand Mastered and 69 items Mega Mastered"
    let totals = null;
    const cm = plain.match(/([\d,]+) items Mastered, ([\d,]+) items Grand Mastered and ([\d,]+) items Mega Mastered/);
    if (cm) totals = { m: toInt(cm[1]), gm: toInt(cm[2]), mm: toInt(cm[3]) };

    const looksLikeMastery = /Progress/.test(text) && /(Mastery In-Progress|Tier\s+[IVX]+|Mastered)/i.test(text);
    return { items, tower, skills, totals, collapsed, looksLikeMastery };
  }

  // Inventory page. Each item is a run of lines that all link item.php?id=N:
  // name first, then description, optional "MAX ON HAND" and mastery tag, count last.
  // MAX ON HAND only means "at the cap": crafting into that item is blocked until some is used or sold.
  const MASTERY_TAGS = { "Mastered": "m", "Grand Mastered": "gm", "Mega Mastered": "mm" };
  function parseInventory(text) {
    const items = {};
    const lines = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    const linkRe = /^(?:[*•-]\s+)?\[([^\]]*)\]\(https?:\/\/[^)]*item\.php\?id=(\d+)\)$/;
    let cur = null;
    const flush = () => {
      if (!cur) return;
      const last = cur.parts[cur.parts.length - 1];
      if (cur.parts.length >= 2 && /^[\d,]+$/.test(last)) {
        const mid = cur.parts.slice(1, -1);
        const tag = mid.map(p => MASTERY_TAGS[p]).find(Boolean) || null;
        items[cur.parts[0]] = { count: toInt(last), id: +cur.id, atMax: mid.includes("MAX ON HAND"), mastery: tag };
      }
      cur = null;
    };
    for (const line of lines) {
      const m = line.match(linkRe);
      if (!m) { flush(); continue; }
      if (!cur || cur.id !== m[2]) { flush(); cur = { id: m[2], parts: [] }; }
      cur.parts.push(m[1].trim());
    }
    flush();

    // Plain-text copy (no links): name line, description lines, count line, inside the item sections
    if (!Object.keys(items).length) {
      const start = lines.findIndex(l => /chevron_down$/.test(l) && /^(?:[*•-]\s+)?(Meals|Items|Fish & Bait|Crops|Seeds)\b/i.test(l));   // any case (Steam app)
      let block = [];
      for (const raw of start < 0 ? [] : lines.slice(start)) {
        const l = raw.replace(/^[*•-]\s+/, "");
        if (/chevron_\w+$/.test(l)) { block = []; continue; }
        if (/^Inventory Stats/i.test(l)) break;
        if (/^[\d,]+$/.test(l) && block.length) {
          const mid = block.slice(1);
          items[block[0]] = { count: toInt(l), id: null, atMax: mid.includes("MAX ON HAND"), mastery: mid.map(p => MASTERY_TAGS[p]).find(Boolean) || null };
          block = [];
        } else block.push(l);
      }
    }

    const cm = text.match(/cannot have more than ([\d,]+) of any single thing/);
    return { items, cap: cm ? toInt(cm[1]) : null };
  }

  // Orchard page: "7,018 Apple Trees 9,123 Production (With Perks)" for each fruit. Production is the midnight drop.
  function parseOrchard(text) {
    const flat = text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\s+/g, " ");
    const out = {};
    const re = /([\d,]+) (Apple|Orange|Lemon) Trees ([\d,]+) Production/gi;          // any case (the Steam app copies in capitals)
    let m;
    while ((m = re.exec(flat))) out[m[2][0].toUpperCase() + m[2].slice(1).toLowerCase()] = { trees: toInt(m[1]), production: toInt(m[3]) };
    return out;
  }

  // Farm page ("Around Your Farm"): what each building makes. Returns { item: amount per HOUR }.
  // Each building's numbers are per its own period, stated on the page (daily, hourly, every 3 or 10 minutes).
  const FARM = [
    { at: "Chicken Coop", per: 24 * 60, items: [["Eggs", "Eggs"], ["Feathers", "Feathers"]] },
    { at: "Cow Pasture", per: 24 * 60, items: [["Milk", "Milk"]] },
    { at: "Raise Raptors to hunt daily", per: 24 * 60, items: [["Antlers", "Antler"], ["Kabobs", "Steak Kabob"]] },
    { at: "Worm Habitat", per: 60, items: [["Worms", "Worms"], ["Gummies", "Gummy Worms"], ["Mealworms", "Mealworms"]] },
    { at: "Plant trees to produce fruit daily", per: 24 * 60, items: [["Apples", "Apple"], ["Oranges", "Orange"], ["Lemons", "Lemon"]] },
    { at: "Produces Trout & Bait daily", per: 24 * 60, items: [["Trout", "Trout"]] },
    { at: "Produces Trout & Bait daily", per: 60, items: [["Grubs", "Grubs"], ["Minnows", "Minnows"]] },   // grubs and minnows drop hourly
    { at: "Grow grapes for wine making", per: 24 * 60, items: [["Grapes", "Grapes"]] },
    { at: "Produces Boards/Wood hourly", per: 60, items: [["Boards", "Board"], ["Wood", "Wood"]] },
    { at: "Produces Iron/Nails every 3 mins", per: 3, items: [["Iron", "Iron"], ["Nails", "Nails"]] },
    { at: "Produces Steel/Wire hourly", per: 60, items: [["Steel", "Steel"], ["Wire", "Steel Wire"]] },
    { at: "Produces Straw every 10 mins", per: 60, items: [["Hourly", "Straw"]] },
    { at: "Stone/Gems every 10 mins", per: 60, items: [["Stone Hourly", "Stone"], ["Stone Hourly", "Sandstone"], ["Coal Hourly", "Coal"]] }   // sandstone drops with stone
  ];
  function parseFarm(text) {
    const flat = text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\s+/g, " ");
    const lower = flat.toLowerCase();                                   // match in any case (the Steam app copies in capitals)
    const out = {};
    for (const b of FARM) {
      const i = lower.indexOf(b.at.toLowerCase());
      if (i < 0) continue;
      const seg = flat.slice(i, i + 220).split(" * ")[0];              // stop at the next building
      for (const [label, item] of b.items) {
        const m = seg.match(new RegExp("([\\d,]+) " + label + "\\b", "i"));
        if (m) out[item] = toInt(m[1]) * 60 / b.per;
      }
    }
    // Crop plots. Best source: the price of the next row under Expand Farm ("Grow more crops … 10.0T Silver"): rows of 4,
    // each 10x the last, and the row reaching 52 plots costs 10T. Only trusted from 1T up (the 10x rule is confirmed there).
    // Else the Plant All button ("Plant All Selected [GJ (6.6K) 14 Left Today] Leek (48)"): crop names are 1-2 words, so the
    // seed list ("Nothing Selected Beet (9906)…") can't be misread as plots.
    let plots = null;
    const row = flat.match(/Grow more crops Adds another row of crops ([\d.,]+)\s*([KMBTQ]?)\s*Silver/i);
    if (row) {
      const cost = parseFloat(row[1].replace(/,/g, "")) * ({ K: 1e3, M: 1e6, B: 1e9, T: 1e12, Q: 1e15 }[row[2].toUpperCase()] || 1);
      const n = 48 + 4 * Math.round(Math.log10(cost / 1e13));
      if (cost >= 1e12 && n >= 44) plots = n;
    }
    if (plots == null) {
      const pl = flat.match(/Plant All Selected ?(?:GJ \([^)]*\) ?)?(?:\d+ Left Today ?)?[A-Z][A-Za-z'-]*(?: [A-Z][A-Za-z'-]*)? \((\d+)\)/i);
      if (pl) plots = +pl[1];
    }
    if (plots != null) Object.defineProperty(out, "plots", { value: plots, enumerable: false });
    return out;
  }

  // Help Needed page: [{ name, section: "special"|"active"|"personal", npc, kind: "main"|"side"|null, ready, dates }].
  // Each quest is its name (sometimes split over two lines), then "Request from NPC[ - Main Quest]" or
  // "Available Sep 21 - Sep 30", then an optional "READY!".
  function parseQuests(text) {
    const lines = text.split(/\r?\n/).map(clean).filter(Boolean);
    const out = [];
    let section = null, name = [], last = null;
    for (const l of lines) {
      const h = l.match(/^(Special|Active|Personal) Requests\s*\(\d+\)/i);   // any case: the Steam app copies headings in capitals
      if (h) { section = h[1].toLowerCase(); name = []; last = null; continue; }
      if (!section) continue;
      if (/^(Request Totals|Use a PHR Voucher|Community Center)\b/i.test(l)) { section = null; continue; }
      if (l === "READY!") { if (last) last.ready = true; continue; }
      // Any dash (-, –, —) and any spacing before "Main Quest" / "Side Request", since copies differ
      const req = l.match(/^Request from (.+?)(?:\s*[-–—]\s*(Main Quest|Side Request))?\s*$/i);
      const avail = l.match(/^Available (.+)$/);
      if ((req || avail) && name.length) {
        last = { name: name.join(" "), section, npc: req ? req[1] : null, kind: req && req[2] ? (/main/i.test(req[2]) ? "main" : "side") : null, ready: false, dates: avail ? avail[1] : null };
        out.push(last);
        name = [];
        continue;
      }
      name.push(l);
    }
    return out;
  }

  // Perks page and Farm Supply page: each perk is its name, one or more description lines, then "Unlocked"
  // (or a price: "10 Points", "285 Gold", "Requires …"). Returns { page, unlocked: [{ name, desc }] }.
  function parsePerks(text) {
    const lines = text.split(/\r?\n/).map(clean).filter(Boolean);
    const page = /Points Left/i.test(text) && /Perks Avail/i.test(text) ? "perks" : "supply";
    const startAt = lines.findIndex(l => page === "perks" ? /^Farming Perks$/i.test(l) : /^Cap Upgrades$/i.test(l));   // headings in any case (Steam app)
    const unlocked = [];
    let block = [];
    for (const l of startAt < 0 ? [] : lines.slice(startAt)) {
      if (/^Consume a meal$/i.test(l)) break;
      // A perk can be listed twice (the weekly "Upgrades on Sale" repeats one): keep the first
      if (/^Unlocked$/i.test(l)) { if (block.length && !unlocked.some(u => u.name === block[0])) unlocked.push({ name: block[0], desc: block.slice(1).join(" ") }); block = []; continue; }
      if (/^[\d,]+ (Points|Gold)$/.test(l) || /^SALE!/.test(l)) { block = []; continue; }
      if (/ (Perks|Upgrades)(\s*\(.*\))?$/i.test(l) && !/[.%]/.test(l) || /^Upgrades on Sale/i.test(l)) { block = []; continue; }   // section headings
      block.push(l);
    }
    return { page, unlocked };
  }

  // What the unlocked perks mean for the planner's settings. Only returns settings that page can tell us.
  function perkSettings({ page, unlocked }) {
    const has = n => unlocked.some(u => u.name === n);
    const sum = re => unlocked.reduce((s, u) => { const m = u.desc.match(re); return s + (m ? +m[1] : 0); }, 0);
    const out = {
      cropGrowthCut: sum(/^Crops grow (\d+)% faster/),
      cornGrowthCut: sum(/^Corn grows (\d+)% faster/),
      resourceSaver: sum(/^(\d+)% chance item is duplicated/),
      cookFaster: sum(/Cooking is (\d+)% faster/i),
      // Negotiator I-IV, Fertilizer I, Gift of Persuasion; Artisan I-IV, Toolbox I, Steady Hands (both pages add up)
      sellBonus: sum(/Items sold earn (\d+)% more Silver/i),
      craftSilverCut: sum(/Crafting costs (\d+)% less Silver/i),
      // Friendship: Friendship Primer (+10%) and O.M.G I/II (each a 5% chance of x7-x10 on liked/loved gifts, about +37% on average)
      friendPrimer: sum(/Earn (\d+)% more XP making friendships/i),
      omg: unlocked.filter(u => /^O\.M\.G/i.test(u.name)).length
    };
    if (page === "perks") {
      out.doublePrizes = sum(/^(\d+)% chance a crop will yield 2/);
      out.wanderer = sum(/^(\d+)% chance exploring won't use Stamina/);
    } else {
      out.grapeJuice = (1 + sum(/^\+(\d+) Extra Grape Juice uses/)) * (unlocked.some(u => /Doubles Grape Juice use/.test(u.desc)) ? 2 : 1);
      out.reinforcedNetting = has("Reinforced Netting");
      out.lemonSqueezer = has("Lemon Squeezer");
      out.cinnamonSticks = has("Cinnamon Sticks");
      out.autoBuyIronNails = has("Iron Depot");
      out.orchardNoon = unlocked.some(u => /10% of Orchard Production/i.test(u.desc)) ? 10 : 0;   // Tree Shaker (Tower 170)
      out.antlerNoon = unlocked.some(u => /10% of Antler Production/i.test(u.desc)) ? 10 : 0;     // Antler Snare (Tower 160)
      // Wishing well: 3 free tosses a day, plus Extra Wish (+1) and Extra Wishes I-III (+5, +10, +10) = 29 at most (beta testers +1)
      out.wwTosses = 3 + (unlocked.some(u => /An extra toss into the Well/i.test(u.desc)) ? 1 : 0) + sum(/^\+(\d+) tosses into the Well/i);
    }
    if (page === "perks") out.fishingTrawl = has("Fishing Trawl");
    return out;
  }

  // Friendship levels, from the Friendship Levels page or a profile page: "Name / Level N" pairs. The profile uses short
  // names (Star, Charles, CptThomas, Gary), mapped to the full ones. Also reads the Townsfolk of the Day (2x friendship XP).
  const FRIEND_ALIAS = { "Star": "Star Meerif", "Charles": "Charles Horsington III", "CptThomas": "Captain Thomas", "Cpt Thomas": "Captain Thomas", "Gary": "Gary Bearson V" };
  function parseFriends(text) {
    const lines = text.split(/\r?\n/).map(clean).filter(Boolean);
    let at = lines.findIndex(l => /^Current Levels$/i.test(l));
    if (at < 0) { const i = lines.map(l => /^Friendship Levels$/i.test(l)).lastIndexOf(true); at = i; }
    const levels = {};
    if (at >= 0) for (let i = at + 1; i < lines.length - 1; i++) {
      if (/^(Game Stats|Drink Baba Cola|Consume a meal)$/i.test(lines[i])) break;
      const m = lines[i + 1].match(/^Level (\d+)$/i);
      if (m && !/^Level /i.test(lines[i])) levels[FRIEND_ALIAS[lines[i]] || lines[i]] = +m[1];
    }
    const t = text.match(/(.+?) is the Townsfolk of the Day/i);
    return { levels, totd: t ? (FRIEND_ALIAS[clean(t[1])] || clean(t[1])) : null };
  }

  // Which page was pasted? Checked most specific first.
  // One production building's own page (for players whose home page doesn't list output). Each page ends with its own
  // sentence; amounts are stored per hour like parseFarm (daily ones / 24). [building, regex, [[item, group, perDay?]]]
  const BUILDING_PAGES = [
    ["Chicken Coop", /chicken coop is producing ([\d,]+) eggs and ([\d,]+) feathers per day/i, [["Eggs", 1, 1], ["Feathers", 2, 1]]],
    ["Cow Pasture", /cow pasture is producing ([\d,]+) milk per day/i, [["Milk", 1, 1]]],
    ["Raptor Pen", /Raptor Pen is producing ([\d,]+) antlers and ([\d,]+) steak kabobs per day/i, [["Antler", 1, 1], ["Steak Kabob", 2, 1]]],
    ["Worm Habitat", /generate fishing bait every hour\. Currently generating ([\d,]+) per hour/i, [["Worms", 1]]],
    ["Worm Habitat", /generate gummy worms every hour\. Currently generating ([\d,]+) per hour/i, [["Gummy Worms", 1]]],
    ["Worm Habitat", /generate Mealworms every hour\. Currently generating ([\d,]+) per hour/i, [["Mealworms", 1]]],
    ["Trout / Bait Farm", /generate trout every day\. Currently generating ([\d,]+) per day/i, [["Trout", 1, 1]]],
    ["Trout / Bait Farm", /produces grubs every hour[^.]*\. Currently generating ([\d,]+) per hour/i, [["Grubs", 1]]],
    ["Trout / Bait Farm", /produces minnows every hour[^.]*\. Currently generating ([\d,]+) per hour/i, [["Minnows", 1]]],
    ["Vineyard", /generate grapes every day\. Currently generating ([\d,]+) per day/i, [["Grapes", 1, 1]]],
    ["Sawmill", /generate boards every hour\. Currently generating ([\d,]+) per hour/i, [["Board", 1]]],
    ["Sawmill", /generate wood every hour\. Currently generating ([\d,]+) per hour/i, [["Wood", 1]]],
    ["Ironworks", /\(([\d,]+) Iron and ([\d,]+) Nails hourly\)/i, [["Iron", 1], ["Nails", 2]]],
    ["Steelworks", /Currently generating ([\d,]+) Steel and ([\d,]+) Steel Wire every 60 minutes/i, [["Steel", 1], ["Steel Wire", 2]]],
    ["Hay Field", /\(([\d,]+) Straw hourly\)/i, [["Straw", 1]]],
    ["Quarry", /stone and sandstone every 10 minutes\. Currently generating [\d,]+ every 10 minutes\. \(([\d,]+) hourly\)/i, [["Stone", 1], ["Sandstone", 1]]],
    ["Quarry", /generate coal every hour\. Currently generating ([\d,]+) per hour/i, [["Coal", 1]]]
  ];
  const flatText = text => String(text || "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\s+/g, " ");
  function parseBuilding(text) {
    const flat = flatText(text), rates = {}, buildings = [];
    for (const [b, re, items] of BUILDING_PAGES) {
      const m = flat.match(re);
      if (!m) continue;
      if (!buildings.includes(b)) buildings.push(b);
      for (const [item, g, daily] of items) rates[item] = toInt(m[g]) / (daily ? 24 : 1);
    }
    const cap = flat.match(/Currently your MAX Inventory is ([\d,]+)/i);   // the Storehouse page
    return { buildings, rates, cap: cap ? toInt(cap[1]) : null };
  }

  function detectPage(text) {
    if (/Points Left/i.test(text) && /Perks Avail/i.test(text)) return "perks";
    if (/^\s*Current Levels\s*$/im.test(text) && /Townsfolk/i.test(text)) return "friends";
    if (/^\s*Friendship Levels\s*$/im.test(text) && /^\s*Game Stats\s*$/im.test(text)) return "friends";      // a profile page
    if (/Cap Upgrades/i.test(text) && /Farming Upgrades/i.test(text)) return "supply";
    // The orchard first: in the Steam app the Orchard page also lists the whole farm ("Around Your Farm")
    if (/About the orchard/i.test(text)) return "orchard";
    // A building's own page also carries the farm sidebar, so check for its sentence first
    { const b = parseBuilding(text); if (b.buildings.length || b.cap) return "building"; }
    if (/Around Your Farm/i.test(text)) return "farm";
    if (/cannot have more than [\d,]+ of any single thing|Inventory Stats/.test(text)) return "inventory";
    if (/[\d,]+\s*\/\s*([\d,]+|∞)\s*Progress/.test(text)) return "mastery";
    if (/Active Requests|Special Requests/i.test(text)) return "quests";
    return null;
  }

  // Silver and gold from the top bar: "[122,730,994,151](https://farmrpg.com/bank.php)   [513](https://farmrpg.com/gold.php)".
  // Only pages copied with that bar (the Steam app) have it; null when it isn't there.
  function parseSilver(text) {
    const s = String(text || "").match(/\[([\d,]+)\]\([^)]*\/bank\.php\)/i);
    if (!s) return null;
    const g = String(text).match(/\[([\d,]+)\]\([^)]*\/(?:steam_)?gold\.php\)/i);
    return { silver: toInt(s[1]), gold: g ? toInt(g[1]) : null };
  }

  // Chat: every copied page carries the chat panel. Cut it out before anything else looks at the text, so a message like
  // "Active Requests (5)" or "Chicken Coop" can't fool page detection or a parser (and other players' names go nowhere).
  // 1. The whole panel: from the channel tabs ("HELP GLOBAL SPOILERS…" or "Help / Global / Spoilers") or the first
  //    message time to the "View Chat Log" link.
  // 2. Any message left over: a "03:56:17 PM" line, the sender's line (a profile link, or a plain name when links are
  //    stripped), an optional "flag_fill", then the message line.
  function stripChat(text) {
    let t = String(text || "");
    const end = t.search(/\[?View Chat Log\]?/i);
    if (end >= 0) {
      const head = t.slice(0, end);
      const tabs = head.search(/HELP\s*GLOBAL\s*SPOILERS|^\s*Help\s*\r?\n\s*Global\s*\r?\n/im);
      const firstMsg = head.search(/^\s*\d{1,2}:\d{2}:\d{2}\s?[AP]M\s*$/m);
      const start = tabs >= 0 ? tabs : firstMsg;
      if (start >= 0) {
        const after = t.indexOf("\n", end);
        t = t.slice(0, start) + (after >= 0 ? t.slice(after + 1) : "");
      }
    }
    return t.replace(/^[ \t]*\d{1,2}:\d{2}:\d{2}\s?[AP]M[ \t]*\r?\n[^\n]*\r?\n(?:[ \t]*flag_fill[ \t]*\r?\n)?[^\n]*(?:\r?\n|$)/gm, "");
  }
  // Every page reader strips chat first
  const noChat = f => (text, ...rest) => f(stripChat(text), ...rest);

  const api = { parseMastery: noChat(parseMastery), parseInventory: noChat(parseInventory), parseOrchard: noChat(parseOrchard),
    parseFarm: noChat(parseFarm), parseQuests: noChat(parseQuests), parsePerks: noChat(parsePerks), parseBuilding: noChat(parseBuilding), parseFriends: noChat(parseFriends), perkSettings,
    detectPage: noChat(detectPage), parseSilver: noChat(parseSilver), stripChat, toInt };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.FRP = Object.assign(root.FRP || {}, api);
})(typeof window !== "undefined" ? window : globalThis);
