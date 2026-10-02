// Run: node test/savecode.test.js
// Compact QR save: round trip, rounding rules, and size. Made-up player numbers.
const assert = require("assert"), zlib = require("zlib");
const R = require("../recipes.js");
const { pack, unpack, round } = require("../savecode.js");
const Q = require("../quests.js");

// Rounding: under 100 exact, 2 significant figures above, never up across a mastery line or the cap
assert.strictEqual(round(87), 87);
assert.strictEqual(round(748375), 750000);
assert.strictEqual(round(105), 110);
assert.strictEqual(round(996000, [1e6]), 990000);           // would be 1.0M: floored instead
assert.strictEqual(round(99600, [1e5]), 99000);
assert.strictEqual(round(9849, [9850]), 9800);              // never above the cap
assert.strictEqual(round(1e6, [1e6]), 1e6);                 // already over the line: plain rounding

// Round trip
const S = {
  mastery: { items: { "Large Net": 9876543, "Board": 996000, "Apple Cider": 87, "Puffer": 748375 }, tower: { level: 120, ak: 6 },
    skills: { Farming: 99, Fishing: 80 }, totals: { m: 20, gm: 10, mm: 2 }, at: 1 },
  inventory: { items: { "Large Net": { count: 9850, id: 500, atMax: true, mastery: "gm" }, "Board": { count: 1234, id: 21, atMax: false, mastery: null },
    "Iron": { count: 7, id: 1, atMax: false, mastery: null } }, cap: 9850, at: 1 },
  perks: { sellBonus: 70, plots: 40 }, silver: 123456789, silverAt: 1, hidden: ["Wood"], changes: [{ big: "undo list" }], nextDetail: "wordy"
};
S.quests = [{ name: "Fake Fishing I", section: "active", npc: null, kind: null, ready: true, dates: null },
  { name: "A Made-up Special", section: "special", npc: null, kind: null, ready: false, dates: "Oct 1 - Oct 9" }];
const { a, b } = pack(S, R, 1000, Q);
assert.ok(!("changes" in a.s) && !("nextDetail" in a.s) && !("silverAt" in a.s), "UI state and times stay behind");
const A = unpack(JSON.parse(JSON.stringify(a)), R, Q), B = unpack(JSON.parse(JSON.stringify(b)), R);
assert.deepStrictEqual(A.mastery.items, { "Large Net": 9900000, "Board": 990000, "Apple Cider": 87, "Puffer": 750000 });
assert.deepStrictEqual(A.mastery.tower, S.mastery.tower);
assert.strictEqual(A.silver, 123456789);
assert.deepStrictEqual(A.quests.map(q => [q.name, q.ready]).sort(), [["A Made-up Special", false], ["Fake Fishing I", true]]);
assert.strictEqual(A.silverAt, 1000);
assert.deepStrictEqual(A.perks, S.perks);
assert.strictEqual(B.inventory.items["Large Net"].count, 9850);
assert.strictEqual(B.inventory.items["Large Net"].atMax, true);
assert.strictEqual(B.inventory.items["Board"].count, 1200);
assert.strictEqual(B.inventory.items["Iron"].count, 7);
assert.strictEqual(B.inventory.cap, 9850);
// A name with no buddy.farm ID still travels, by name
const odd = unpack(pack({ inventory: { items: { "Not A Real Item": { count: 5 } }, cap: 100 } }, R).b, R);
assert.strictEqual(odd.inventory.items["Not A Real Item"].count, 5);
assert.throws(() => unpack({ v: 9 }, R));

// Size: a made-up late-game player (500 masteries, 600 items) plus 60 quests, must fit one QR code each (~2,900 chars)
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const logu = (lo, hi) => Math.round(Math.exp(Math.log(lo) + rnd() * (Math.log(hi) - Math.log(lo))));
const names = Object.keys(R.items);
const pick = n => names.slice().sort(() => rnd() - 0.5).slice(0, n);
const big = { mastery: { items: {}, tower: { level: 220, ak: 6 }, skills: {}, totals: {} }, inventory: { items: {}, cap: 9850 }, perks: { sellBonus: 70 } };
for (const n of pick(500)) big.mastery.items[n] = logu(50, 2e6);
for (const n of pick(600)) big.inventory.items[n] = { count: rnd() < 0.3 ? 9850 : logu(1, 9849) };
big.quests = Object.keys(Q.quests).slice(100, 160).map((name, i) => ({ name, section: i < 10 ? "main" : "active", npc: null, kind: null, ready: false, dates: null }));
const chars = o => Math.ceil(zlib.deflateRawSync(Buffer.from(JSON.stringify(o))).length * 4 / 3);
const p = pack(big, R, Date.now(), Q);
console.log(`late-game sizes: a ${chars(p.a)} chars, b ${chars(p.b)} chars`);
assert.ok(chars(p.a) < 2400 && chars(p.b) < 2000);

console.log("savecode tests passed");
