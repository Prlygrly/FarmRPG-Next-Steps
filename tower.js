// Tower requirements. Source of truth for FarmRPG tower levels; loads via <script> so file:// works.
(function (root) {
  const TOWER = {
    "_source": "FarmRPG Library 'Tower Masteries' (2026-09-19). levels[L] = what you need to advance TO level L. Item names match the Mastery Progress page.",
    "akPerLevel": 100,
    "silverPerLevel": {
      "_rule": "advancing TO level L costs L x rate; FarmRPG wiki. The 301+ rate still needs testing.",
      "bands": [[100, 50000000], [199, 100000000], [300, 300000000], [100000, 500000000]]
    },
    "anyMM": {
      "from": 101,
      "to": 200,
      "levelsPerMM": 4,
      "_rule": "need ceil((L-100)/4) Mega Masteries of any kind"
    },
    "levels": {
      "201": {
        "mm": [
          "Board"
        ]
      },
      "202": {
        "mm": [
          "Twine"
        ]
      },
      "203": {
        "mm": [
          "Iron Ring"
        ]
      },
      "204": {
        "mm": [
          "Skipjack"
        ]
      },
      "205": {
        "mm": [
          "Purple Butterfly Fish"
        ]
      },
      "206": {
        "mm": [
          "Rope"
        ]
      },
      "207": {
        "mm": [
          "Crab"
        ]
      },
      "208": {
        "mm": [
          "Mushroom"
        ]
      },
      "209": {
        "mm": [
          "Clam Shell"
        ]
      },
      "210": {
        "mm": [
          "Conch Shell"
        ]
      },
      "211": {
        "mm": [
          "Fishing Net"
        ]
      },
      "212": {
        "mm": [
          "Sand"
        ]
      },
      "213": {
        "mm": [
          "Frosteye"
        ]
      },
      "214": {
        "mm": [
          "Crowfish"
        ]
      },
      "215": {
        "mm": [
          "Torch Fish"
        ]
      },
      "216": {
        "mm": [
          "Mackerel"
        ]
      },
      "217": {
        "mm": [
          "Green Barracuda"
        ]
      },
      "218": {
        "mm": [
          "Bullfish"
        ]
      },
      "219": {
        "mm": [
          "Drum"
        ]
      },
      "220": {
        "mm": [
          "Mushroom Paste"
        ]
      },
      "221": {
        "mm": [
          "Starfish",
          "Green Jellyfish"
        ]
      },
      "222": {
        "mm": [
          "Swordfish",
          "Steel Wire"
        ]
      },
      "223": {
        "mm": [
          "Bone Fish",
          "Sunfish"
        ]
      },
      "224": {
        "mm": [
          "Flamejack",
          "Blue Sea Bass"
        ]
      },
      "225": {
        "mm": [
          "Barracuda",
          "Clownfish"
        ]
      },
      "226": {
        "mm": [
          "Red Starfish",
          "Stingray"
        ]
      },
      "227": {
        "mm": [
          "Shimmer Stone",
          "Iron Cup"
        ]
      },
      "228": {
        "mm": [
          "Green Chromis",
          "Pearl"
        ]
      },
      "229": {
        "mm": [
          "Blue Crab",
          "Sea Catfish"
        ]
      },
      "230": {
        "mm": [
          "Plumbfish",
          "Bluegill"
        ]
      },
      "231": {
        "mm": [
          "Leather",
          "Jellyfish"
        ]
      },
      "232": {
        "mm": [
          "Blue Tiger Fish",
          "Spiral Shell"
        ]
      },
      "233": {
        "mm": [
          "Horseshoe",
          "Serpent Eel"
        ]
      },
      "234": {
        "mm": [
          "Crappie",
          "Ruby Coral"
        ]
      },
      "235": {
        "mm": [
          "Blue Shell",
          "White Parchment"
        ]
      },
      "236": {
        "mm": [
          "Redgill",
          "Yarn"
        ]
      },
      "237": {
        "mm": [
          "Puffer",
          "Seahorse"
        ]
      },
      "238": {
        "mm": [
          "Emerald",
          "Fluorifish"
        ]
      },
      "239": {
        "mm": [
          "Sturdy Shield",
          "Orange Juice"
        ]
      },
      "240": {
        "mm": [
          "Marlin",
          "Ruby Fish"
        ]
      },
      "241": {
        "mm": [
          "Nailed Board",
          "Fancy Pipe"
        ]
      },
      "242": {
        "mm": [
          "Lemonade",
          "Ruby"
        ]
      },
      "243": {
        "mm": [
          "Black Powder",
          "Bucket"
        ]
      },
      "244": {
        "mm": [
          "Globber",
          "Broom"
        ]
      },
      "245": {
        "mm": [
          "Blue Catfish",
          "Carp"
        ]
      },
      "246": {
        "mm": [
          "Shimmer Topaz",
          "Flarefin"
        ]
      },
      "247": {
        "mm": [
          "Jade",
          "Garnet"
        ]
      },
      "248": {
        "mm": [
          "Wooden Box",
          "Wooden Shield"
        ]
      },
      "249": {
        "mm": [
          "Awl",
          "Chum"
        ]
      },
      "250": {
        "mm": [
          "Ladder",
          "Wooden Button",
          "Large Net"
        ]
      },
      "251": {
        "mm": [
          "Steel"
        ]
      },
      "252": {
        "mm": [
          "Seeker"
        ]
      },
      "253": {
        "mm": [
          "Shrimp"
        ]
      },
      "254": {
        "mm": [
          "Largemouth Bass"
        ]
      },
      "255": {
        "mm": [
          "Glassback"
        ]
      },
      "256": {
        "mm": [
          "Small Prawn"
        ]
      },
      "257": {
        "mm": [
          "Garnet Ring"
        ]
      },
      "258": {
        "mm": [
          "Sea Crest"
        ]
      },
      "259": {
        "mm": [
          "Unpolished Shimmer Stone"
        ]
      },
      "260": {
        "mm": [
          "Sturdy Box"
        ]
      },
      "261": {
        "mm": [
          "Yellow Perch"
        ]
      },
      "262": {
        "mm": [
          "Stone Jelly"
        ]
      },
      "263": {
        "mm": [
          "Ice Shark"
        ]
      },
      "264": {
        "mm": [
          "Jumbo Fish"
        ]
      },
      "265": {
        "mm": [
          "Glass Orb"
        ]
      },
      "266": {
        "mm": [
          "Orcafish"
        ]
      },
      "267": {
        "mm": [
          "Wooden Plank"
        ]
      },
      "268": {
        "mm": [
          "Speckled Grouper"
        ]
      },
      "269": {
        "mm": [
          "Glass Bottle"
        ]
      },
      "270": {
        "mm": [
          "Fish Bones"
        ]
      },
      "271": {
        "mm": [
          "Treasure Chest"
        ]
      },
      "272": {
        "mm": [
          "Mussel"
        ]
      },
      "273": {
        "mm": [
          "Wooden Barrel"
        ]
      },
      "274": {
        "mm": [
          "Trout"
        ]
      },
      "275": {
        "mm": [
          "Wooden Table",
          "Peppers"
        ]
      },
      "276": {
        "mm": [
          "Catfish",
          "Peas"
        ]
      },
      "277": {
        "mm": [
          "Butter Churn",
          "Crossbow"
        ]
      },
      "278": {
        "mm": [
          "Mulberry Snapper",
          "Looking Glass"
        ]
      },
      "279": {
        "mm": [
          "MIAB",
          "Bottle Rocket"
        ]
      },
      "280": {
        "mm": [
          "Green Dye",
          "Lantern"
        ]
      },
      "281": {
        "mm": [
          "Flier",
          "Blue Dye"
        ]
      },
      "282": {
        "mm": [
          "Wagon Wheel",
          "Wooden Sword"
        ]
      },
      "283": {
        "mm": [
          "Carrot",
          "Emerald Ring"
        ]
      },
      "284": {
        "mm": [
          "Lemon Quartz Ring",
          "Pearl Necklace"
        ]
      },
      "285": {
        "mm": [
          "Amethyst Necklace",
          "Magnifying Glass"
        ]
      },
      "286": {
        "mm": [
          "Wooden Spear",
          "Aquamarine Ring"
        ]
      },
      "287": {
        "mm": [
          "Ruby Ring",
          "Glass Jar"
        ]
      },
      "288": {
        "mm": [
          "Giant Squid",
          "Magicite"
        ]
      },
      "289": {
        "mm": [
          "Hammer",
          "Axe",
          "Shovel"
        ]
      },
      "290": {
        "mm": [
          "Scissors",
          "Potato",
          "Pitchfork"
        ]
      },
      "291": {
        "mm": [
          "Octopus",
          "Green Shield",
          "Wooden Bow"
        ]
      },
      "292": {
        "mm": [
          "Explosive",
          "Leather Diary",
          "Green Twine"
        ]
      },
      "293": {
        "mm": [
          "Coin Purse",
          "Blue Purse",
          "Green Scarf"
        ]
      },
      "294": {
        "mm": [
          "Shimmer Ring",
          "Salt",
          "Pickaxe"
        ]
      },
      "295": {
        "mm": [
          "Fancy Guitar",
          "Fancy Pan Flute",
          "Fancy Drum"
        ]
      },
      "296": {
        "mm": [
          "Red Dye",
          "Beet",
          "Leather Bag"
        ]
      },
      "297": {
        "mm": [
          "Horn Canteen",
          "Mystic Ring",
          "Green Parchment"
        ]
      },
      "298": {
        "mm": [
          "Hourglass",
          "Essence of Slime",
          "Wrench"
        ]
      },
      "299": {
        "mm": [
          "Jade Charm",
          "Sturdy Sword",
          "Red Trunk"
        ]
      },
      "300": {
        "mm": [
          "Wizard Hat",
          "Sewing Needle",
          "Water Lily"
        ]
      },
      "301": {
        "gm": [
          "Corn Oil",
          "Cotton",
          "Basic Pillow"
        ]
      },
      "302": {
        "mm": [
          "Slimeback",
          "Splatfish",
          "Magenta Growth"
        ]
      },
      "303": {
        "mm": [
          "Boghead Snapper",
          "Bog Barnacle",
          "Slime Egg Shell"
        ]
      },
      "304": {
        "gm": [
          "Leather Belt",
          "Brown Dye",
          "Oak Table"
        ]
      },
      "305": {
        "gm": [
          "Yellow Dye",
          "Canoe",
          "Gold Ruby Ring"
        ]
      },
      "306": {
        "gm": [
          "Crown of Clover",
          "Cloth",
          "Yellow Shirt"
        ]
      },
      "307": {
        "gm": [
          "Orange Scarf",
          "Crab Claw",
          "White Dye"
        ]
      },
      "308": {
        "gm": [
          "Veggie Juice",
          "Bamboo Rope"
        ],
        "mm": [
          "Glass Eye Urchin"
        ]
      },
      "309": {
        "gm": [
          "Tin Scraps",
          "Bamboo Trellis",
          "Silk"
        ]
      },
      "310": {
        "gm": [
          "Tie Dye Scarf",
          "Gazebo",
          "Gold Garnet Ring"
        ]
      },
      "311": {
        "gm": [
          "Bamboo Chair",
          "Barbed Wire"
        ]
      },
      "312": {
        "gm": [
          "Yellow Scarf",
          "Fire Ant Farm"
        ]
      },
      "313": {
        "gm": [
          "Step Ladder",
          "Orange Shirt"
        ]
      },
      "314": {
        "gm": [
          "Energy Coil",
          "Black Dye"
        ]
      },
      "315": {
        "gm": [
          "Reinforced Helmet",
          "Gold Lemon Quartz Ring",
          "Steel Vise"
        ]
      },
      "316": {
        "gm": [
          "Yellow Bag",
          "Leather Helmet"
        ]
      },
      "317": {
        "gm": [
          "Gold Aquamarine Ring",
          "Handsaw"
        ]
      },
      "318": {
        "gm": [
          "Yellow Butterfly",
          "Acorn Butter"
        ]
      },
      "319": {
        "gm": [
          "Strong Paste"
        ],
        "mm": [
          "Spoon"
        ]
      },
      "320": {
        "gm": [
          "Corn Husk Doll"
        ],
        "mm": [
          "Blubberfish",
          "Reaver Claw"
        ]
      },
      "321": {
        "mm": [
          "Green Diary",
          "Sturdy Bow"
        ]
      },
      "322": {
        "gm": [
          "Power Monitor",
          "Bamboo Fence"
        ]
      },
      "323": {
        "gm": [
          "Spiked Shell",
          "Black Scarf"
        ]
      },
      "324": {
        "gm": [
          "Spool of Copper"
        ],
        "mm": [
          "Red Twine"
        ]
      },
      "325": {
        "mm": [
          "Cloth",
          "Gold Ring",
          "Tin Scraps"
        ]
      },
      "326": {
        "gm": [
          "Red Shirt",
          "Black Shirt"
        ]
      },
      "327": {
        "gm": [
          "Propeller Hat"
        ],
        "mm": [
          "Blue Twine"
        ]
      },
      "328": {
        "gm": [
          "Wine"
        ],
        "mm": [
          "Sunflower"
        ]
      },
      "329": {
        "gm": [
          "Pair of Boots",
          "Black Twine"
        ]
      },
      "330": {
        "gm": [
          "Red Diary",
          "White Twine",
          "Magus Hat"
        ]
      },
      "331": {
        "gm": [
          "Runestone 04",
          "Orange Twine"
        ]
      },
      "332": {
        "gm": [
          "Kill Switch"
        ],
        "mm": [
          "Linked Lantern"
        ]
      },
      "333": {
        "gm": [
          "Brown Cloak",
          "Glowing Lantern"
        ]
      },
      "334": {
        "gm": [
          "Grand Piano"
        ],
        "mm": [
          "Oak Table"
        ]
      },
      "335": {
        "gm": [
          "Red Brick"
        ],
        "mm": [
          "Iced Tea",
          "Leather Belt"
        ]
      },
      "336": {
        "gm": [
          "Yellow Twine",
          "Black Bag"
        ],
        "mm": [
          "Seaweed"
        ]
      },
      "337": {
        "gm": [
          "White Scarf",
          "Orange Dye"
        ],
        "mm": [
          "Purple Twine"
        ]
      },
      "338": {
        "gm": [
          "Frost Shield",
          "Mayonnaise"
        ],
        "mm": [
          "Orange Scarf"
        ]
      },
      "339": {
        "gm": [
          "Black Purse",
          "Fancy Violin",
          "Brown Bag"
        ]
      },
      "340": {
        "gm": [
          "White Purse"
        ],
        "mm": [
          "Yellow Dye",
          "Purple Diary"
        ]
      },
      "341": {
        "gm": [
          "Butter",
          "Joyful Ring",
          "Purple Butterfly"
        ]
      },
      "342": {
        "gm": [
          "Pinecone Bird Feeder",
          "Sail Cloth"
        ],
        "mm": [
          "Bamboo Chair"
        ]
      },
      "343": {
        "gm": [
          "Gold Emerald Ring",
          "Fancy Chair",
          "Acid Extract"
        ]
      },
      "344": {
        "gm": [
          "Mushroom Stew"
        ],
        "mm": [
          "Red Diary",
          "Barbed Wire"
        ]
      },
      "345": {
        "gm": [
          "Gold Carrot",
          "Fancy Table"
        ],
        "mm": [
          "Bamboo Trellis"
        ]
      },
      "346": {
        "gm": [
          "Re'taw Pail",
          "Black Shield"
        ],
        "mm": [
          "Canoe"
        ]
      },
      "347": {
        "gm": [
          "Gold Peas"
        ],
        "mm": [
          "Corn",
          "White Dye"
        ]
      },
      "348": {
        "gm": [
          "Engine",
          "Ship Mast"
        ],
        "mm": [
          "Brown Bag"
        ]
      },
      "349": {
        "gm": [
          "Sunflower Oil"
        ],
        "mm": [
          "Propeller Hat",
          "Watermelon"
        ]
      },
      "350": {
        "mm": [
          "Tie Dye Scarf",
          "Crown of Clover",
          "Steel Plate"
        ]
      }
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = TOWER;
  else root.TOWER = TOWER;
})(typeof window !== "undefined" ? window : globalThis);
