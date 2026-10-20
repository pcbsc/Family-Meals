// The food storage guide: how long each food lasts in the fridge, freezer and
// pantry, and the best way to keep it. Generated from research notes; see
// tests/unit/storage.test.mjs for the checks every number passes.
//
// How it was checked: two researchers looked up most foods separately, from
// USDA FoodKeeper and FSIS (FoodSafety.gov), the FDA, and university extension
// services (Korean foods also from makers' storage instructions and Korean
// cooking references). Their answers were compared number by number; where
// they disagreed, the more cautious time was used. "checked" says whether a
// food was looked up twice or once. The unit tests pin the key food-safety
// numbers to the USDA FSIS cold storage chart.
//
// Fridge times assume 40°F (4°C) or colder; freezer times are for best quality
// at 0°F (-18°C), where food stays safe indefinitely.
export const GROUPS = [
  {
    "key": "produce",
    "label": "Fruits & veggies",
    "emoji": "🥬"
  },
  {
    "key": "protein",
    "label": "Meat, fish, eggs & dairy",
    "emoji": "🥩"
  },
  {
    "key": "pantry",
    "label": "Rice, noodles & Korean pantry",
    "emoji": "🍚"
  },
  {
    "key": "cooked",
    "label": "Leftovers & banchan",
    "emoji": "🍱"
  }
];

export const FOODS = [
  {
    "key": "apples",
    "name": "Apples",
    "emoji": "🍎",
    "group": "produce",
    "fridge": {
      "min": 4,
      "max": 6,
      "unit": "weeks"
    },
    "freezer": {
      "min": 8,
      "max": 8,
      "unit": "months"
    },
    "pantry": {
      "min": 3,
      "max": 3,
      "unit": "weeks"
    },
    "variants": [],
    "best": "fridge",
    "how": "Keep whole, unwashed apples in a perforated plastic bag in the fridge crisper drawer, away from other produce, because apples give off ethylene gas. Wash just before eating; firm varieties (Fuji, Pink Lady) keep longer than soft ones (Gala, Golden Delicious).",
    "freeze": "Don't freeze raw whole apples. FoodKeeper's 8-month freezer time is for cooked apples (for example applesauce or cooked slices), packed in airtight freezer containers or bags.",
    "why": "Apples keep ripening after they are picked and breathe out a gas called ethylene that makes them, and the fruits and vegetables near them, ripen and go soft faster; cold slows this down.",
    "spoiled": "Large soft or mushy spots, very wrinkled skin, brown rot spreading from a bruise, mold, oozing juice, or a fermented, alcohol-like smell.",
    "sources": [
      {
        "name": "FDA, How to Cut Food Waste and Maintain Food Safety (summarizing USDA FoodKeeper)",
        "url": "https://www.fda.gov/food/consumers/how-cut-food-waste-and-maintain-food-safety"
      },
      {
        "name": "Colorado State University Extension, Colorado Apples",
        "url": "https://extension.colostate.edu/resource/colorado-apples-2/"
      },
      {
        "name": "Nebraska Extension (food.unl.edu), Apples",
        "url": "https://food.unl.edu/article/apples/"
      },
      {
        "name": "Clemson HGIC, Storing Apples",
        "url": "https://hgic.clemson.edu/storing-apples/"
      },
      {
        "name": "University of Illinois Extension, Make way for apple season",
        "url": "https://extension.illinois.edu/blogs/simply-nutritious-quick-and-delicious/2021-09-10-make-way-apple-season"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Clemson HGIC, Basics of Safe Food Handling",
        "url": "https://hgic.clemson.edu/factsheet/basics-of-safe-food-handling/"
      }
    ],
    "checked": "two"
  },
  {
    "key": "asian-pear",
    "name": "Asian pears (bae)",
    "emoji": "🍐",
    "group": "produce",
    "fridge": {
      "min": 1,
      "max": 3,
      "unit": "months"
    },
    "freezer": null,
    "pantry": {
      "min": 1,
      "max": 1,
      "unit": "weeks"
    },
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate Asian pears in a plastic or paper bag in the crisper drawer, cushioned so they don't get bumped and bruised. Wash just before eating.",
    "freeze": "No freezer time for fresh Asian pears turned up in this research. They are best eaten fresh and crisp; for preserving, follow an extension preserving guide such as Oregon State's 'Preserving Asian pears'.",
    "why": "Cold air slows down the pear's breathing and ripening, so it stays crisp and juicy much longer than it would on the counter.",
    "spoiled": "Soft or spongy flesh, brown or water-soaked spots, browning around the core, spreading skin browning, mold, or a fermented smell.",
    "sources": [
      {
        "name": "Oregon State University Extension, Preserving Asian pears (SP 50-694)",
        "url": "https://extension.oregonstate.edu/food/preservation/preserving-asian-pears-sp-50-694"
      },
      {
        "name": "UC Davis / UC ANR, Asian Pears Postharvest Quality Maintenance Guidelines (Crisosto)",
        "url": "https://ucanr.edu/?legacy-file=123821.pdf&legacy-file-path=sites%2Fkac%2Ffiles%2F"
      },
      {
        "name": "Oregon State University Extension, Preserving Asian Pears (SP 50-694)",
        "url": "https://extension.oregonstate.edu/catalog/sp-50-694-preserving-asian-pears"
      },
      {
        "name": "Iowa State University Extension, How to Harvest, Ripen, and Store Pears",
        "url": "https://yardandgarden.extension.iastate.edu/how-to/how-harvest-ripen-and-store-pears"
      },
      {
        "name": "UC Small Farm Program, Asian Pears brochure",
        "url": "https://sfp.ucanr.edu/pubs/brochures/Asianpears/"
      },
      {
        "name": "Oregon State University Extension, Preserving Pears",
        "url": "https://extension.oregonstate.edu/food/preservation/preserving-pears"
      }
    ],
    "checked": "two"
  },
  {
    "key": "bananas",
    "name": "Bananas",
    "emoji": "🍌",
    "group": "produce",
    "fridge": {
      "min": 3,
      "max": 3,
      "unit": "days"
    },
    "freezer": {
      "min": 2,
      "max": 3,
      "unit": "months"
    },
    "pantry": {
      "min": 1,
      "max": 1,
      "unit": "weeks"
    },
    "variants": [],
    "best": "counter-then-fridge",
    "how": "Keep bananas on the counter, out of plastic bags, until ripe, and away from apples and avocados; wrapping the stems in plastic wrap or foil slows ripening. Once ripe, the fridge buys a few extra days; the peel turns dark but the fruit inside is fine.",
    "freeze": "Freeze ripe bananas peeled, either sliced on a lined tray and then bagged, or mashed with about 1/2 teaspoon of ascorbic acid per cup to limit browning. They can also be frozen whole in the peel. Best for smoothies and baking.",
    "why": "Bananas make a ripening gas called ethylene that turns them sweet and spotty; cold slows the ripening but also turns the peel dark brown.",
    "spoiled": "Mold (often at the stem), leaking liquid, a sour or fermented smell, or flesh that is mushy and brown all the way through. Brown spots or a dark peel on their own just mean very ripe.",
    "sources": [
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "Nebraska Extension, Prolonging the Life of Bananas",
        "url": "https://food.unl.edu/article/prolonging-life-bananas/"
      },
      {
        "name": "Utah State University Extension, Fruit and Vegetable Guide: Bananas",
        "url": "https://extension.usu.edu/nutrition/research/bananas"
      },
      {
        "name": "Colorado State Extension (Food Smart Colorado), Bananas",
        "url": "https://foodsmartcolorado.colostate.edu/food/foods-and-beverages/bananas/"
      },
      {
        "name": "University of Illinois Extension, Going Bananas for Bananas!",
        "url": "https://extension.illinois.edu/blogs/simply-nutritious-quick-and-delicious/2019-02-01-going-bananas-bananas"
      },
      {
        "name": "Oregon State University Extension, Freezing fruits and vegetables (PNW 214)",
        "url": "https://extension.oregonstate.edu/catalog/pnw-214-freezing-fruits-vegetables"
      },
      {
        "name": "The Food Keeper (USDA/Cornell/FMI, 2015 edition, IFDA-hosted PDF)",
        "url": "https://ifdaonline.org/wp-content/uploads/2024/02/food-keeper-2015-pdf.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "berries",
    "name": "Berries",
    "emoji": "🍓",
    "group": "produce",
    "fridge": {
      "min": 1,
      "max": 3,
      "unit": "days"
    },
    "freezer": {
      "min": 8,
      "max": 12,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "blueberries",
        "fridge": {
          "min": 1,
          "max": 2,
          "unit": "weeks"
        },
        "freezer": {
          "min": 8,
          "max": 12,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Refrigerate berries unwashed in their container, or loosely covered (raspberries on a paper towel), in the coldest part of the fridge or the produce drawer. Remove moldy or mushy berries, and rinse gently under cool running water only right before eating.",
    "freeze": "Spread dry berries in a single layer on a tray, freeze for a few hours until firm, then move them to a freezer bag or container. Clemson advises freezing blueberries unwashed and completely dry (rinse before using); USDA WIC suggests washing first, then drying.",
    "why": "Berries have thin skins and lots of juice, so mold grows on them fast, and washing them before storing adds extra water that helps the mold grow even faster.",
    "spoiled": "Fuzzy white, gray or green mold, mushy or leaking berries, shriveling, or a sour or fermented smell. Take out moldy berries right away and throw out any that look rotten.",
    "sources": [
      {
        "name": "USDA WIC Works, What Do I Do With Berries?",
        "url": "https://wicworks.fns.usda.gov/topic/what-do-i-do-with/berries"
      },
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "University of Illinois Extension, Strawberries: Selection and Care",
        "url": "https://web.extension.illinois.edu/strawberries/selection.cfm"
      },
      {
        "name": "Clemson HGIC, Strawberry Basics",
        "url": "https://hgic.clemson.edu/factsheet/strawberry-basics/"
      },
      {
        "name": "Utah State University Extension, Berry Good Preservation Tips",
        "url": "https://extension.usu.edu/archive/berry-good-preservation-tips"
      },
      {
        "name": "USDA SNAP-Ed Seasonal Produce Guide, Blueberries",
        "url": "https://snaped.fna.usda.gov/resources/nutrition-education-materials/seasonal-produce-guide/blueberries"
      },
      {
        "name": "Clemson HGIC, Blueberry Basics",
        "url": "https://hgic.clemson.edu/factsheet/blueberry-basics/"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Utah State University Extension, How to Preserve Berries",
        "url": "https://extension.usu.edu/preserve-the-harvest/dev/berries-1"
      },
      {
        "name": "University of Illinois Extension, Small Fruits: Handling Care",
        "url": "https://extension.illinois.edu/small-fruits/handling-care"
      }
    ],
    "checked": "two"
  },
  {
    "key": "grapes",
    "name": "Grapes",
    "emoji": "🍇",
    "group": "produce",
    "fridge": {
      "min": 3,
      "max": 7,
      "unit": "days"
    },
    "freezer": {
      "min": 1,
      "max": 1,
      "unit": "months"
    },
    "pantry": {
      "min": 1,
      "max": 1,
      "unit": "days"
    },
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate grapes unwashed in a perforated plastic bag in the coldest part of the fridge. Pick out soft or moldy grapes, and rinse under cool running water just before eating.",
    "freeze": "Stem, wash and dry the grapes, freeze them in a single layer on a tray, then pack them in freezer bags; frozen grapes make a cold snack.",
    "why": "Grapes are small, juicy fruits that lose water and grow mold quickly when warm, so the cold keeps them plump and fresh longer.",
    "spoiled": "Soft, wrinkled or leaking grapes, brown spots, fuzzy mold (often near the stem), or a fermented, vinegary smell.",
    "sources": [
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "Clemson HGIC, Selecting & Storing Fruits & Vegetables",
        "url": "https://hgic.clemson.edu/factsheet/selecting-storing-fruits-vegetables/"
      },
      {
        "name": "Utah State University Extension, How to Preserve Grapes",
        "url": "https://extension.usu.edu/preserve-the-harvest/dev/grapes-1"
      },
      {
        "name": "Penn State Extension, Let's Preserve: Freezing Fruits",
        "url": "https://extension.psu.edu/lets-preserve-freezing-fruits"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      }
    ],
    "checked": "two"
  },
  {
    "key": "citrus",
    "name": "Lemons, limes & oranges",
    "emoji": "🍋",
    "group": "produce",
    "fridge": {
      "min": 10,
      "max": 21,
      "unit": "days"
    },
    "freezer": {
      "min": 4,
      "max": 6,
      "unit": "months"
    },
    "pantry": {
      "min": 7,
      "max": 10,
      "unit": "days"
    },
    "variants": [
      {
        "label": "lemons and limes (in a plastic bag)",
        "fridge": {
          "min": 4,
          "max": 4,
          "unit": "weeks"
        },
        "freezer": null,
        "pantry": {
          "min": 1,
          "max": 1,
          "unit": "weeks"
        }
      }
    ],
    "best": "fridge",
    "how": "Keep citrus dry and refrigerate it loose or in a plastic bag in the crisper drawer, turning it now and then; a week or so on the counter, out of the sun, is fine if you'll eat it soon. Wash just before cutting, peeling or zesting.",
    "freeze": "Nebraska Extension lists 4-6 months frozen. Whole citrus loses texture when frozen; it's more practical to freeze juice (in ice-cube trays), grated zest, or peeled segments in airtight containers.",
    "why": "Citrus has a thick, waxy peel that holds water in, so it keeps a long time, and cold slows drying out and mold even more.",
    "spoiled": "Soft, sunken or water-soaked spots, white or blue-green mold, a hard, shriveled, dried-out peel, or a fermented smell.",
    "sources": [
      {
        "name": "USDA SNAP-Ed Seasonal Produce Guide, Oranges",
        "url": "https://snaped.fna.usda.gov/resources/nutrition-education-materials/seasonal-produce-guide/oranges"
      },
      {
        "name": "USDA SNAP-Ed Seasonal Produce Guide, Limes",
        "url": "https://snaped.fna.usda.gov/resources/nutrition-education-materials/seasonal-produce-guide/limes"
      },
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "Utah State University Extension, Fruit and Vegetable Guide: Lemons",
        "url": "https://extension.usu.edu/nutrition/research/lemons"
      },
      {
        "name": "UC Master Food Preserver Program of Orange County, Oranges",
        "url": "https://ucanr.edu/site/uc-master-food-preserver-program-orange-county/oranges"
      },
      {
        "name": "UC Master Food Preserver Program, Your Citrus FAQs",
        "url": "https://ucanr.edu/program/uc-master-food-preserver/article/your-citrus-faqs-answered-february-2025"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Clemson HGIC, Basics of Safe Food Handling",
        "url": "https://hgic.clemson.edu/factsheet/basics-of-safe-food-handling/"
      }
    ],
    "checked": "two"
  },
  {
    "key": "mango",
    "name": "Mangoes",
    "emoji": "🥭",
    "group": "produce",
    "fridge": {
      "min": 2,
      "max": 3,
      "unit": "days"
    },
    "freezer": {
      "min": 6,
      "max": 6,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "counter-then-fridge",
    "how": "Ripen hard mangoes on the counter (a paper bag with an apple speeds this up). Once ripe, refrigerate them whole and eat within about 5 days; wash the skin before cutting.",
    "freeze": "No freezer time for mango turned up in this research.",
    "why": "Mangoes grow in hot places, so fridge cold can hurt an unripe mango and stop it from ever getting sweet; let it ripen in the warm first, then chill it.",
    "spoiled": "Large black or sunken spots, mushy or watery flesh, leaking juice, mold, or a sour or alcohol-like smell.",
    "sources": [
      {
        "name": "Nebraska Extension, Fruits that Continue to Ripen after Picking",
        "url": "https://food.unl.edu/article/fruits-continue-ripen-after-picking/"
      },
      {
        "name": "University of Illinois Extension, Mad for Mango!",
        "url": "https://extension.illinois.edu/blogs/simply-nutritious-quick-and-delicious/2015-05-08-mad-mango"
      },
      {
        "name": "University of Illinois Extension, Learn how to preserve your produce like a pro",
        "url": "https://extension.illinois.edu/blogs/simply-nutritious-quick-and-delicious/2023-09-01-learn-how-preserve-your-produce-pro"
      },
      {
        "name": "UC Statewide IPM Program, Chilling Injury",
        "url": "https://ipm.ucanr.edu/home-and-landscape/chilling-injury/"
      },
      {
        "name": "UF/IFAS Extension, Mango Growing in the Florida Home Landscape (MG216) and related UF mango pages",
        "url": "https://ask.ifas.ufl.edu/publication/MG216"
      },
      {
        "name": "Ohio State University Extension, SNAP-Ed newsletter: Mangoes",
        "url": "https://fcs.osu.edu/sites/fcs/files/imce/PDFs/SNAP_Ed_newsletter_mangoes.pdf"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (2025 version)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2025-09/fn579.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "avocado",
    "name": "Avocados",
    "emoji": "🥑",
    "group": "produce",
    "fridge": {
      "min": 1,
      "max": 3,
      "unit": "days"
    },
    "freezer": {
      "min": 4,
      "max": 6,
      "unit": "months"
    },
    "pantry": {
      "min": 7,
      "max": 10,
      "unit": "days"
    },
    "variants": [
      {
        "label": "unripe (hard), to ripen",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 7,
          "max": 10,
          "unit": "days"
        }
      },
      {
        "label": "ripe, whole",
        "fridge": {
          "min": 1,
          "max": 3,
          "unit": "days"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "cut",
        "fridge": {
          "min": 1,
          "max": 2,
          "unit": "days"
        },
        "freezer": null,
        "pantry": null
      }
    ],
    "best": "counter-then-fridge",
    "how": "Ripen hard avocados on the counter in a loosely closed paper bag (adding an apple or banana speeds it up), then refrigerate ripe ones whole. For a cut half, brush the flesh with lemon or lime juice, wrap it tightly or seal it in an airtight container, refrigerate within 2 hours, and use within a day or two.",
    "freeze": "Clemson lists 4-12 months frozen depending on the fact sheet. Whole avocados freeze poorly; mashing or puréeing the flesh with a little lemon or lime juice and freezing it airtight works for guacamole, dips or smoothies.",
    "why": "Avocados only turn soft and creamy after they are picked, helped by a ripening gas called ethylene; cold slows ripe ones down, and lemon juice keeps the cut green flesh from turning brown in the air.",
    "spoiled": "Brown or black streaks through the flesh, a stringy texture, mold, a sour or rancid smell, or very mushy flesh under dented skin. A thin brown layer on a cut surface can be scraped off if the rest looks and smells normal.",
    "sources": [
      {
        "name": "Colorado State Extension (Food Smart Colorado), Avocado",
        "url": "https://foodsmartcolorado.colostate.edu/food/foods-and-beverages/avocado/"
      },
      {
        "name": "University of Illinois Extension, Green as avocado, smooth as a smoothie!",
        "url": "https://extension.illinois.edu/blogs/simply-nutritious-quick-and-delicious/2021-09-03-green-avocado-smooth-smoothie"
      },
      {
        "name": "UC Master Gardener, Avocado: A Unique Fruit",
        "url": "https://ucanr.edu/sites/default/files/2019-08/308950.pdf"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "Clemson HGIC, Food Selection & Storage",
        "url": "https://hgic.clemson.edu/factsheet/food-selection-storage/"
      },
      {
        "name": "Nebraska Extension, Prolonging the Life of Bananas",
        "url": "https://food.unl.edu/article/prolonging-life-bananas/"
      },
      {
        "name": "UNL Food (Nebraska Extension), Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC, Selecting & Storing Fruits & Vegetables",
        "url": "https://hgic.clemson.edu/factsheet/selecting-storing-fruits-vegetables/"
      },
      {
        "name": "University of Illinois Extension, Hidden Inside: An Avocado (blog)",
        "url": "https://extension.illinois.edu/blogs/healthy-eats-and-repeat/2016-08-10-hidden-inside-avocado"
      },
      {
        "name": "UF/IFAS Extension Alachua County, Avocado Selection, Storage and Preparation",
        "url": "https://blogs.ifas.ufl.edu/alachuaco/2020/05/12/avocado-selection-storage-and-preparation/"
      }
    ],
    "checked": "two"
  },
  {
    "key": "pineapple",
    "name": "Pineapple",
    "emoji": "🍍",
    "group": "produce",
    "fridge": {
      "min": 3,
      "max": 5,
      "unit": "days"
    },
    "freezer": null,
    "pantry": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "variants": [
      {
        "label": "cut",
        "fridge": {
          "min": 2,
          "max": 3,
          "unit": "days"
        },
        "freezer": {
          "min": 4,
          "max": 6,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "counter-then-fridge",
    "how": "Keep a whole pineapple on the counter and cut it within 1-2 days of buying, since it won't get sweeter after picking. Rinse the outside, cut it up, and refrigerate the pieces in a covered container.",
    "freeze": "Freeze peeled, cored chunks in a single layer on a tray, then pack them into freezer bags or containers.",
    "why": "A pineapple stops getting sweeter once it's picked, and once it's cut its juicy inside is open to germs, so the pieces need the fridge.",
    "spoiled": "Mushy, dark or water-soaked flesh, mold on the base or leaves, leaking juice, or a sour, vinegary or fermented smell.",
    "sources": [
      {
        "name": "USDA SNAP-Ed Seasonal Produce Guide, Pineapples",
        "url": "https://snaped.fna.usda.gov/resources/nutrition-education-materials/seasonal-produce-guide/pineapples"
      },
      {
        "name": "Nebraska Extension, Fruits that Continue to Ripen after Picking",
        "url": "https://food.unl.edu/article/fruits-continue-ripen-after-picking/"
      },
      {
        "name": "University of Illinois Extension, Learn how to preserve your produce like a pro",
        "url": "https://extension.illinois.edu/blogs/simply-nutritious-quick-and-delicious/2023-09-01-learn-how-preserve-your-produce-pro"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "University of Illinois Extension, Freezer Storage",
        "url": "https://extension.illinois.edu/food-safety/freezer-storage"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Ohio State University Extension, SNAP-Ed newsletter: Pineapples",
        "url": "https://fcs.osu.edu/sites/fcs/files/imce/PDFs/SNAP_Ed_newsletter_pineapples.pdf"
      },
      {
        "name": "NDSU Extension, Focus on Whole Fruits: How to Select and Store Fruit",
        "url": "https://www.ndsu.edu/agriculture/extension/publications/focus-whole-fruits-how-select-and-store-fruit"
      }
    ],
    "checked": "two"
  },
  {
    "key": "melon",
    "name": "Melons",
    "emoji": "🍉",
    "group": "produce",
    "fridge": {
      "min": 5,
      "max": 7,
      "unit": "days"
    },
    "freezer": null,
    "pantry": {
      "min": 7,
      "max": 10,
      "unit": "days"
    },
    "variants": [
      {
        "label": "cut",
        "fridge": {
          "min": 2,
          "max": 3,
          "unit": "days"
        },
        "freezer": {
          "min": 1,
          "max": 1,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "counter-then-fridge",
    "how": "Keep a whole watermelon in a cool spot or on the counter until you're ready to chill and eat it; a ripe cantaloupe goes in the crisper drawer. Scrub the rind under running water before cutting, then refrigerate cut melon in a clean airtight container within 2 hours.",
    "freeze": "Freeze melon balls or cubes in airtight containers; they go soft when thawed, so eat them partly frozen or blend them into smoothies.",
    "why": "Melon rinds can carry germs from the field, and a knife can drag them into the sweet, wet inside, where they grow fast unless it's kept cold.",
    "spoiled": "Whole: soft sunken spots, mold, leaking, or a sour smell. Cut: slimy surface, mushy or water-soaked flesh, mold, or a sour or fermented smell.",
    "sources": [
      {
        "name": "University of Georgia Extension, Home Garden Watermelon (C1035)",
        "url": "https://extension.uga.edu/publications/detail.html?amp=&number=C1035&title=Home+Garden+Watermelon"
      },
      {
        "name": "University of Illinois Extension, Watermelon",
        "url": "https://extension.illinois.edu/gardening/watermelon"
      },
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Colorado State Extension (Food Smart Colorado), Keeping Food Safe: Cantaloupe",
        "url": "https://foodsmartcolorado.colostate.edu/food-safety/safe-preparation-handling-and-storage/keeping-food-safe-cantaloupe/"
      },
      {
        "name": "Michigan State University Extension, Using, Storing and Preserving Melons (E3250)",
        "url": "https://ucanr.edu/sites/default/files/2025-07/Using,%20Storing,%20and%20Preserving%20Melons-%20Michigan%20State%202023.pdf"
      },
      {
        "name": "Penn State Extension, Cantaloupe in the Garden and the Kitchen",
        "url": "https://extension.psu.edu/cantaloupe-in-the-garden-and-the-kitchen"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "UNL Food, Melons",
        "url": "https://food.unl.edu/article/melons/"
      },
      {
        "name": "Michigan State University Extension, Using, Storing, and Preserving Melons (E3250)",
        "url": "https://ucanr.edu/sites/default/files/2020-10/337744.pdf"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "tomatoes",
    "name": "Tomatoes",
    "emoji": "🍅",
    "group": "produce",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 2,
      "max": 2,
      "unit": "months"
    },
    "pantry": {
      "min": 2,
      "max": 3,
      "unit": "days"
    },
    "variants": [],
    "best": "counter",
    "how": "Keep tomatoes on the counter out of direct sun and eat ripe ones within a few days. Refrigerate only very ripe ones you can't use in time, and always refrigerate cut tomatoes, covered; never refrigerate green tomatoes. Wash just before using.",
    "freeze": "Freeze whole or chopped tomatoes in freezer bags; thawed tomatoes are soft and the skins slip off easily, so use them in sauces, soups and stews.",
    "why": "Fridge cold (below about 54°F) breaks down what gives tomatoes their flavor and makes them mealy, so they taste best on the counter.",
    "spoiled": "Mold, cracked or leaking skin, mushy or sunken dark spots, or a sour or fermented smell.",
    "sources": [
      {
        "name": "Nebraska Extension, How to Store Tomatoes",
        "url": "https://food.unl.edu/how-store-tomatoes-0/"
      },
      {
        "name": "UC Master Food Preserver Program of Orange County, Tomatoes",
        "url": "https://ucanr.edu/site/uc-master-food-preserver-program-orange-county/tomatoes"
      },
      {
        "name": "Clemson HGIC, Basics of Safe Food Handling",
        "url": "https://hgic.clemson.edu/factsheet/basics-of-safe-food-handling/"
      },
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "NDSU Extension, Food Safety Basics: A Reference Guide for Foodservice Operators",
        "url": "https://www.ndsu.edu/agriculture/extension/publications/food-safety-basics-reference-guide-foodservice-operators"
      },
      {
        "name": "Virginia Cooperative Extension, How to Store Food Safely at Home: A Guide (FST-510)",
        "url": "https://www.pubs.ext.vt.edu/content/dam/pubs_ext_vt_edu/348/348-960/FST-510.pdf"
      },
      {
        "name": "UNL Food, Freezing Produce",
        "url": "https://food.unl.edu/freezing-vegetables"
      }
    ],
    "checked": "two"
  },
  {
    "key": "cucumber",
    "name": "Cucumbers",
    "emoji": "🥒",
    "group": "produce",
    "fridge": {
      "min": 4,
      "max": 6,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate whole, dry, unwashed cucumbers in a plastic bag in the crisper drawer and use within about a week. Keep them away from ethylene-producing fruit such as apples, bananas and tomatoes.",
    "freeze": "Fresh cucumbers don't freeze well; they turn limp and watery. Pickling is the better way to preserve them.",
    "why": "Cucumbers are summer vegetables full of water, so too much cold gives them soft, watery pits, and ethylene gas from fruit turns them yellow.",
    "spoiled": "Soft, mushy or slimy skin, water-soaked or sunken spots, yellowing, mold, or a sour smell.",
    "sources": [
      {
        "name": "USDA SNAP-Ed Seasonal Produce Guide, Cucumbers",
        "url": "https://snaped.fna.usda.gov/resources/nutrition-education-materials/seasonal-produce-guide/cucumbers"
      },
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC, Cucumber",
        "url": "https://hgic.clemson.edu/factsheet/cucumber/"
      },
      {
        "name": "University of Minnesota Extension, Harvesting and storing home garden vegetables",
        "url": "https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/harvesting-and-storing-home-garden-vegetables"
      },
      {
        "name": "Utah State University Extension, Utah Vegetable Production & Pest Management Guide 2016",
        "url": "https://extension.usu.edu/vegetableguide/files/UT-veg-guide-2016.pdf"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "zucchini",
    "name": "Zucchini & squash",
    "emoji": "🥒",
    "group": "produce",
    "fridge": {
      "min": 2,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 8,
      "max": 12,
      "unit": "months"
    },
    "pantry": {
      "min": 1,
      "max": 5,
      "unit": "days"
    },
    "variants": [],
    "best": "fridge",
    "how": "Keep zucchini and summer squash dry and unwashed in a plastic bag in the crisper drawer, and use within a few days. Wash just before cooking.",
    "freeze": "Wash, slice, blanch in boiling water about 3 minutes, chill in ice water, drain, and pack into freezer bags. Thawed squash is soft, so use it in soups, stews and baking.",
    "why": "Zucchini has thin skin and lots of water, so it dries out or molds fast when warm, but long, cold storage damages it too, so eat it soon.",
    "spoiled": "Soft, wrinkled or slimy skin, pits or water-soaked spots, mold, or a sour smell.",
    "sources": [
      {
        "name": "Utah State University Extension, How to Preserve Summer Squash",
        "url": "https://extension.usu.edu/preserve-the-harvest/research/summer-squash"
      },
      {
        "name": "Clemson HGIC, Using & Storing Summer Squash",
        "url": "https://hgic.clemson.edu/factsheet/using-storing-summer-squash/"
      },
      {
        "name": "University of Minnesota Extension, Growing summer squash and zucchini",
        "url": "https://extension.umn.edu/vegetables/growing-summer-squash-and-zucchini"
      },
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC, Basics of Safe Food Handling",
        "url": "https://hgic.clemson.edu/factsheet/basics-of-safe-food-handling/"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Oregon State University Extension, Freezing Fruits and Vegetables (PNW 214)",
        "url": "https://extension.oregonstate.edu/catalog/pnw-214-freezing-fruits-vegetables"
      }
    ],
    "checked": "two"
  },
  {
    "key": "peppers",
    "name": "Peppers & chilies",
    "emoji": "🫑",
    "group": "produce",
    "fridge": {
      "min": 3,
      "max": 5,
      "unit": "days"
    },
    "freezer": {
      "min": 8,
      "max": 12,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep whole bell and chili peppers dry and unwashed in a plastic bag in the crisper drawer. Wash just before cutting, and wash your hands after handling hot chilies.",
    "freeze": "Peppers don't need blanching: wash, seed, slice or dice, freeze on a tray, then bag with the air pressed out. Unblanched peppers stay crisper; blanched ones take up less space.",
    "why": "Peppers grow in warm weather, so too long in a cold fridge gives them soft pits and spots, and keeping them dry stops mold.",
    "spoiled": "Wrinkled soft skin, slimy or water-soaked spots, sunken pits, mold (often inside near the stem), or an off smell.",
    "sources": [
      {
        "name": "Penn State Extension, Preserving Those Colorful Garden Peppers",
        "url": "https://extension.psu.edu/preserving-those-colorful-garden-peppers"
      },
      {
        "name": "Nebraska Extension, Bell Peppers",
        "url": "https://food.unl.edu/article/bell-peppers/"
      },
      {
        "name": "UC Master Gardener Program, Harvesting and Storing",
        "url": "https://ucanr.edu/program/uc-master-gardener-program/harvesting-and-storing"
      },
      {
        "name": "University of Minnesota Extension, Harvesting and storing home garden vegetables",
        "url": "https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/harvesting-and-storing-home-garden-vegetables"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "UNL Food, Freezing Produce",
        "url": "https://food.unl.edu/freezing-vegetables"
      },
      {
        "name": "Oregon State University Extension, Freezing Fruits and Vegetables (PNW 214)",
        "url": "https://extension.oregonstate.edu/catalog/pnw-214-freezing-fruits-vegetables"
      }
    ],
    "checked": "two"
  },
  {
    "key": "carrots",
    "name": "Carrots",
    "emoji": "🥕",
    "group": "produce",
    "fridge": {
      "min": 2,
      "max": 3,
      "unit": "weeks"
    },
    "freezer": {
      "min": 10,
      "max": 12,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Cut off any green tops, then refrigerate carrots in a perforated plastic bag in the crisper drawer; keep bagged baby carrots sealed in their bag and go by the package date. Scrub or wash just before using.",
    "freeze": "Blanch first: small whole carrots 5 minutes; slices, dice or strips 2 minutes. Cool quickly in cold water, drain, freeze on a tray, then pack in freezer bags or containers.",
    "why": "Leafy tops keep pulling water out of the root, so cutting them off and keeping carrots cold and humid keeps them crunchy instead of bendy.",
    "spoiled": "Slimy surface, mold, black or mushy spots, or a sour smell. Bendy carrots are just dried out; a dry white film on baby carrots (white blush) is drying, not spoilage.",
    "sources": [
      {
        "name": "Clemson HGIC, Using & Storing Carrots",
        "url": "https://hgic.clemson.edu/factsheet/using-storing-carrots/"
      },
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Utah State University Extension, Fruit and Vegetable Guide: Carrots",
        "url": "https://extension.usu.edu/nutrition/research/carrots.pdf"
      },
      {
        "name": "National Center for Home Food Preservation, Freezing Carrots",
        "url": "https://nchfp.uga.edu/how/freeze/carrot.html"
      },
      {
        "name": "USDA AMS Commercial Item Description, Carrots, Fresh, Ready-to-Eat or Ready-to-Use",
        "url": "https://www.ams.usda.gov/sites/default/files/media/CID_AA_20191E_Carrots_Fresh_ReadytoEat_or_ReadytoUse.pdf"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      }
    ],
    "checked": "two"
  },
  {
    "key": "celery",
    "name": "Celery",
    "emoji": "🥬",
    "group": "produce",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "weeks"
    },
    "freezer": {
      "min": 8,
      "max": 12,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate celery dry and unwashed, wrapped or in a plastic bag in the crisper drawer, away from fruit. To revive limp stalks, trim the base and stand them in water.",
    "freeze": "Celery can be frozen for cooked dishes (soups, stews, stir-fries), but it loses its crunch, so don't freeze it for raw snacks.",
    "why": "Celery is mostly water, so it goes limp as it dries out, and ethylene gas from fruit makes it age faster.",
    "spoiled": "Very limp, rubbery or hollow stalks, slimy or brown-black areas, mold, or a sour smell.",
    "sources": [
      {
        "name": "USDA SNAP-Ed Seasonal Produce Guide, Celery",
        "url": "https://snaped.fna.usda.gov/resources/nutrition-education-materials/seasonal-produce-guide/celery"
      },
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "Utah State University Extension, Fruit and Vegetable Guide: Celery",
        "url": "https://extension.usu.edu/nutrition/research/celery"
      },
      {
        "name": "University of Illinois Extension, Add celery as a supporting player in recipes",
        "url": "https://extension.illinois.edu/blogs/live-well-eat-well/2022-03-09-add-celery-supporting-player-recipes"
      },
      {
        "name": "Cornell Cooperative Extension Monroe County, Food Preservation Blog 2020",
        "url": "https://monroe.cce.cornell.edu/nutrition/food-preservation-blog-2020"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "broccoli",
    "name": "Broccoli & cauliflower",
    "emoji": "🥦",
    "group": "produce",
    "fridge": {
      "min": 3,
      "max": 5,
      "unit": "days"
    },
    "freezer": {
      "min": 10,
      "max": 12,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate unwashed broccoli and cauliflower in a loose or perforated plastic bag in the crisper drawer, away from ethylene-producing fruit. Wash just before cooking.",
    "freeze": "Blanch florets in boiling water before freezing (this stops the enzymes that ruin color, flavor and texture), cool them in ice water, drain well, freeze on a tray, then bag.",
    "why": "A broccoli head is a bunch of tiny flower buds that keep using up their stored energy after picking, and ethylene gas from fruit makes them turn yellow fast; cold slows this down.",
    "spoiled": "Yellowing or opening buds (quality loss), slimy or mushy spots, black or fuzzy mold, spreading brown spots on cauliflower, or a strong sour or rotten smell.",
    "sources": [
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "Cornell Vegetable Program, Cold Storage Chart & Reference Guide (commercial)",
        "url": "https://rvpadmin.cce.cornell.edu/uploads/doc_500.pdf"
      },
      {
        "name": "Utah State University Extension, Utah Vegetable Production & Pest Management Guide 2016",
        "url": "https://extension.usu.edu/vegetableguide/files/UT-veg-guide-2016.pdf"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      },
      {
        "name": "Clemson HGIC, Basics of Safe Food Handling",
        "url": "https://hgic.clemson.edu/factsheet/basics-of-safe-food-handling/"
      }
    ],
    "checked": "two"
  },
  {
    "key": "cabbage",
    "name": "Cabbage & napa cabbage",
    "emoji": "🥬",
    "group": "produce",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "weeks"
    },
    "freezer": {
      "min": 8,
      "max": 12,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate the whole head unwashed in a plastic bag in the crisper drawer; peel off damaged outer leaves before using and wrap cut heads tightly. Napa cabbage is more tender, so plan on the short end of the range.",
    "freeze": "Cabbage goes limp and watery when frozen, so only freeze it for cooked dishes such as soups, stir-fries or dumpling filling.",
    "why": "A cabbage head is tightly packed leaves that hold on to their water, so it keeps longer than lettuce, and cold, humid air keeps it crisp.",
    "spoiled": "Slimy, black or mushy leaves, lots of yellowing, mold, or a strong sour or rotten smell. A few wilted outer leaves are normal; peel them off.",
    "sources": [
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "Cornell Vegetable Program, Cold Storage Chart & Reference Guide (commercial)",
        "url": "https://rvpadmin.cce.cornell.edu/uploads/doc_500.pdf"
      },
      {
        "name": "Nebraska Extension, Refrigerator and Freezer Storage",
        "url": "https://food.unl.edu/article/refrigerator-and-freezer-storage/"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      }
    ],
    "checked": "two"
  },
  {
    "key": "bok-choy",
    "name": "Bok choy",
    "emoji": "🥬",
    "group": "produce",
    "fridge": {
      "min": 2,
      "max": 3,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep it unwashed in a loose or perforated plastic bag in the crisper drawer, and rinse it just before cooking.",
    "freeze": "Blanch it for a minute first if you want to freeze it for soups; it goes soft, so it's best cooked.",
    "why": "Bok choy's leaves are thin and full of water, so they wilt fast once the plant stops drinking.",
    "spoiled": "Slimy or yellow leaves, dark soft spots, or a sour smell.",
    "sources": [
      {
        "name": "UT Extension W857: Storing Produce for the Short Term",
        "url": "https://rutherford.tennessee.edu/wp-content/uploads/sites/200/2022/05/W857-Storing-Produce-for-the-short-term.pdf"
      }
    ],
    "checked": "one"
  },
  {
    "key": "lettuce",
    "name": "Lettuce & salad greens",
    "emoji": "🥗",
    "group": "produce",
    "fridge": {
      "min": 3,
      "max": 5,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate lettuce heads unwashed in a plastic bag or container in the crisper drawer, away from fruit, and wash leaves just before eating. Keep bagged greens sealed in the fridge and use by the package date; bags labeled pre-washed or ready-to-eat don't need rewashing.",
    "freeze": "Lettuce doesn't freeze: ice crystals break the thin leaves and they thaw into mush.",
    "why": "Lettuce leaves are thin and mostly water, so they wilt fast when warm or dry, and ethylene gas from fruit gives them brown spots.",
    "spoiled": "Slimy, dark or see-through leaves, brown or rust-colored spots that spread, a bad smell, or liquid pooling in the bag; throw out bagged greens that are slimy.",
    "sources": [
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "FDA, Selecting and Serving Produce Safely",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely?linkId=100000002660538"
      },
      {
        "name": "Utah State University Extension, Utah Vegetable Production & Pest Management Guide 2016",
        "url": "https://extension.usu.edu/vegetableguide/files/UT-veg-guide-2016.pdf"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      }
    ],
    "checked": "two"
  },
  {
    "key": "spinach",
    "name": "Spinach",
    "emoji": "🥬",
    "group": "produce",
    "fridge": {
      "min": 3,
      "max": 5,
      "unit": "days"
    },
    "freezer": {
      "min": 8,
      "max": 12,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate bunch spinach unwashed, and bagged spinach sealed in its bag, in the crisper drawer. Wash bunch spinach very well just before using, since grit hides in the leaves; bagged spinach labeled pre-washed doesn't need rewashing.",
    "freeze": "No freezer time for spinach turned up in this research. Fresh spinach is normally blanched before freezing and then used only in cooked dishes.",
    "why": "Spinach leaves are thin and full of water, so they wilt and turn slimy quickly unless they're kept cold.",
    "spoiled": "Slimy, dark or mushy leaves, yellowing, a sour or rotten smell, or liquid in the bag.",
    "sources": [
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "FDA, Selecting and Serving Produce Safely",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely?linkId=100000002660538"
      },
      {
        "name": "NDSU Extension, Food Safety Basics: A Reference Guide for Foodservice Operators",
        "url": "https://www.ndsu.edu/agriculture/extension/publications/food-safety-basics-reference-guide-foodservice-operators"
      },
      {
        "name": "Clemson HGIC, Basics of Safe Food Handling",
        "url": "https://hgic.clemson.edu/factsheet/basics-of-safe-food-handling/"
      },
      {
        "name": "Oregon State University Extension, Freezing Fruits and Vegetables (PNW 214)",
        "url": "https://extension.oregonstate.edu/catalog/pnw-214-freezing-fruits-vegetables"
      }
    ],
    "checked": "two"
  },
  {
    "key": "green-onions",
    "name": "Green onions",
    "emoji": "🌿",
    "group": "produce",
    "fridge": {
      "min": 1,
      "max": 1,
      "unit": "weeks"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep them in the fridge in a bag, or stand the roots in a jar with a little water. Snip what you need from the top.",
    "freeze": "Slice and freeze them flat in a bag; use straight from frozen in soups and fried rice.",
    "why": "Green onions keep about a week in a home fridge, and much longer right at freezing, because cold slows their breathing.",
    "spoiled": "Slimy, mushy or yellow-brown tops.",
    "sources": [
      {
        "name": "Cornell Cooperative Extension: Cold Storage Chart & Reference Guide",
        "url": "https://rvpadmin.cce.cornell.edu/uploads/doc_500.pdf"
      },
      {
        "name": "UT Extension W857: Storing Produce for the Short Term",
        "url": "https://rutherford.tennessee.edu/wp-content/uploads/sites/200/2022/05/W857-Storing-Produce-for-the-short-term.pdf"
      }
    ],
    "checked": "one"
  },
  {
    "key": "onions",
    "name": "Onions",
    "emoji": "🧅",
    "group": "produce",
    "fridge": {
      "min": 2,
      "max": 2,
      "unit": "months"
    },
    "freezer": {
      "min": 10,
      "max": 12,
      "unit": "months"
    },
    "pantry": {
      "min": 1,
      "max": 1,
      "unit": "months"
    },
    "variants": [],
    "best": "pantry",
    "how": "Keep whole dry onions in a cool, dry, dark, well-ventilated spot, such as a mesh bag or basket rather than a sealed plastic bag. Refrigerate cut or peeled onions tightly wrapped or in a sealed container.",
    "freeze": "Chop, then freeze in tightly sealed freezer bags or containers (double-bag to hold in the smell). Thawed onions are soft, so use them for cooking.",
    "why": "Dry onions have papery skins that protect them, but dampness makes them sprout or rot, so a cool, dry, airy place works best.",
    "spoiled": "Soft or mushy spots, black powdery or fuzzy mold, oozing liquid, or a sour, rotten smell. Long green sprouts mean the onion is past its best.",
    "sources": [
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "USDA WIC Works, What Do I Do With the CVB (Fruits and Vegetables)?",
        "url": "https://wicworks.fna.usda.gov/topic/what-do-i-do-with/the-cvb"
      },
      {
        "name": "FDA, Selecting and Serving Produce Safely",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely?linkId=100000002660538"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      },
      {
        "name": "UNL Food, Freezing Produce",
        "url": "https://food.unl.edu/freezing-vegetables"
      }
    ],
    "checked": "two"
  },
  {
    "key": "garlic",
    "name": "Garlic",
    "emoji": "🧄",
    "group": "produce",
    "fridge": null,
    "freezer": null,
    "pantry": {
      "min": 3,
      "max": 6,
      "unit": "months"
    },
    "variants": [],
    "best": "pantry",
    "how": "Keep whole bulbs in a cool, dry, dark place with air around them, like a mesh bag or open basket, not in the fridge. Peeled or chopped garlic goes in the fridge.",
    "freeze": "Peeled cloves or minced garlic freeze well in a small sealed bag.",
    "why": "Fridge cold and damp make whole garlic sprout and go soft; a dry, airy spot keeps it sleeping.",
    "spoiled": "Soft, shriveled or hollow cloves, brown spots or mold. Green sprouts are safe but taste bitter.",
    "sources": [
      {
        "name": "UT Extension W857: Storing Produce for the Short Term",
        "url": "https://rutherford.tennessee.edu/wp-content/uploads/sites/200/2022/05/W857-Storing-Produce-for-the-short-term.pdf"
      }
    ],
    "checked": "one",
    "caution": "Homemade garlic in oil must go in the fridge and be used within a few days, or frozen: left warm it can grow botulism."
  },
  {
    "key": "ginger",
    "name": "Ginger",
    "emoji": "🫚",
    "group": "produce",
    "fridge": {
      "min": 2,
      "max": 3,
      "unit": "weeks"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep unpeeled ginger in a bag in the crisper drawer.",
    "freeze": "Freeze it whole; frozen ginger grates easily without peeling and keeps much longer.",
    "why": "The skin keeps ginger from drying out, so leave it on until you use it.",
    "spoiled": "Soft, wrinkly or moldy, or gray-blue and mushy inside.",
    "sources": [
      {
        "name": "UT Extension W857: Storing Produce for the Short Term",
        "url": "https://rutherford.tennessee.edu/wp-content/uploads/sites/200/2022/05/W857-Storing-Produce-for-the-short-term.pdf"
      }
    ],
    "checked": "one"
  },
  {
    "key": "potatoes",
    "name": "Potatoes",
    "emoji": "🥔",
    "group": "produce",
    "fridge": null,
    "freezer": {
      "min": 10,
      "max": 12,
      "unit": "months"
    },
    "pantry": {
      "min": 1,
      "max": 2,
      "unit": "weeks"
    },
    "variants": [],
    "best": "pantry",
    "how": "Store potatoes unwashed in a cool, dry, dark, ventilated place (a paper bag, basket or box), not in the fridge, and keep them out of the light so they don't turn green. Scrub just before cooking.",
    "freeze": "Raw potatoes freeze poorly; freeze them cooked or partly cooked (for example mashed potatoes or blanched fries) in airtight containers.",
    "why": "Potatoes like cool darkness: light turns them green and bitter, and fridge cold turns some of their starch into sugar.",
    "spoiled": "Soft, wrinkled or mushy potatoes, mold, leaking, or a musty or rotten smell. Cut away small sprouts and green patches; throw out potatoes that are very green, heavily sprouted or shriveled.",
    "sources": [
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "USDA WIC Works, What Do I Do With the CVB (Fruits and Vegetables)?",
        "url": "https://wicworks.fna.usda.gov/topic/what-do-i-do-with/the-cvb"
      },
      {
        "name": "Nebraska Extension, Handling Produce Safely from the Garden",
        "url": "https://food.unl.edu/handling-produce-safely-garden/"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      }
    ],
    "checked": "two"
  },
  {
    "key": "sweet-potatoes",
    "name": "Sweet potatoes (goguma)",
    "emoji": "🍠",
    "group": "produce",
    "fridge": null,
    "freezer": {
      "min": 8,
      "max": 12,
      "unit": "months"
    },
    "pantry": {
      "min": 2,
      "max": 3,
      "unit": "weeks"
    },
    "variants": [],
    "best": "pantry",
    "how": "Keep sweet potatoes, including goguma, in a cool, dry, dark, well-ventilated place, not in the fridge, and handle them gently so they don't bruise.",
    "freeze": "Don't freeze raw. Bake, steam or boil until tender, cool, then freeze whole, sliced or mashed in airtight containers.",
    "why": "Sweet potatoes come from warm places, and fridge cold injures them, making the inside hard, discolored and off-tasting even after cooking.",
    "spoiled": "Soft, mushy or wet spots, wrinkled skin, dark sunken areas, mold, oozing, or a sour smell.",
    "sources": [
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      },
      {
        "name": "Oregon State University Extension, Freezing Fruits and Vegetables (PNW 214)",
        "url": "https://extension.oregonstate.edu/catalog/pnw-214-freezing-fruits-vegetables"
      }
    ],
    "checked": "one"
  },
  {
    "key": "mushrooms",
    "name": "Mushrooms",
    "emoji": "🍄",
    "group": "produce",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 8,
      "max": 12,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate mushrooms unwashed, in their original package or a paper bag, at 40°F or below. Wipe them or rinse them briefly just before cooking, and cook enoki thoroughly.",
    "freeze": "Mushrooms freeze best cooked (sautéed or steamed) first; pack them in airtight containers and use them in cooked dishes.",
    "why": "Mushrooms are spongy and full of water, so they turn slimy quickly unless they're kept cold and not too wet.",
    "spoiled": "Slimy or sticky surface, dark wet spots, a shriveled look, mold, or a sour or fishy smell.",
    "sources": [
      {
        "name": "Clemson HGIC, Basics of Safe Food Handling",
        "url": "https://hgic.clemson.edu/factsheet/basics-of-safe-food-handling/"
      },
      {
        "name": "FDA, Selecting and Serving Produce Safely",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely?linkId=100000002660538"
      },
      {
        "name": "NDSU Extension, Food Safety Basics: A Reference Guide for Foodservice Operators",
        "url": "https://www.ndsu.edu/agriculture/extension/publications/food-safety-basics-reference-guide-foodservice-operators"
      },
      {
        "name": "NDSU Extension, Vary Your Veggies: How to Select and Store Vegetables",
        "url": "https://www.ag.ndsu.edu/publications/food-nutrition/vary-your-veggies-how-to-select-and-store-vegetables"
      },
      {
        "name": "Oregon State University Extension, Freezing Fruits and Vegetables (PNW 214)",
        "url": "https://extension.oregonstate.edu/catalog/pnw-214-freezing-fruits-vegetables"
      }
    ],
    "checked": "two"
  },
  {
    "key": "bean-sprouts",
    "name": "Bean sprouts (kongnamul)",
    "emoji": "🌱",
    "group": "produce",
    "fridge": {
      "min": 3,
      "max": 5,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep them cold in their bag or in a container of water (change it daily), and use them within a few days.",
    "freeze": "They don't freeze well: they turn limp and watery.",
    "why": "Sprouts are baby plants still growing, so they use up their energy and spoil fast.",
    "spoiled": "Brown, slimy or mushy sprouts, or a musty smell.",
    "sources": [
      {
        "name": "Shimada & Shimizu, keeping quality of bean sprouts at 5°C (Yasuda Women's University)",
        "url": "https://yasuda-u.repo.nii.ac.jp/record/525/files/24323772025008.pdf"
      }
    ],
    "checked": "one",
    "caution": "Cook sprouts before kids eat them: raw sprouts can carry germs from the warm, wet way they grow (FDA advice for young children)."
  },
  {
    "key": "corn",
    "name": "Corn on the cob",
    "emoji": "🌽",
    "group": "produce",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 8,
      "max": 8,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate corn in its husk, or wrapped if husked, and cook it as soon as possible, ideally the day you buy it.",
    "freeze": "Husk, blanch the ears or cut kernels in boiling water, cool them quickly in ice water, cut the kernels off if you like, and freeze in airtight bags.",
    "why": "After picking, the sugar in corn starts turning into starch, so it gets a little less sweet every day; cold slows that down.",
    "spoiled": "Slimy or moldy kernels or silk, dried-out dented kernels, a sour smell, or insect damage.",
    "sources": [
      {
        "name": "Nebraska Extension, Home Food Storage chart",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      },
      {
        "name": "Oregon State University Extension, Freezing Fruits and Vegetables (PNW 214)",
        "url": "https://extension.oregonstate.edu/catalog/pnw-214-freezing-fruits-vegetables"
      }
    ],
    "checked": "two"
  },
  {
    "key": "green-beans",
    "name": "Green beans & snap peas",
    "emoji": "🫛",
    "group": "produce",
    "fridge": {
      "min": 3,
      "max": 5,
      "unit": "days"
    },
    "freezer": {
      "min": 8,
      "max": 12,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate unwashed beans and pea pods in a plastic bag or container in the crisper drawer. Wash just before cooking, because washing first makes them mold faster.",
    "freeze": "Wash, trim and blanch in boiling water, chill in ice water, drain, freeze on a tray, then pack in freezer bags.",
    "why": "Beans and pea pods keep breathing after picking and slowly use up their sweetness and crunch; cold slows this down, and staying dry stops mold.",
    "spoiled": "Limp, rubbery or shriveled pods, slimy or brown-black spots, white or gray mold, or a sour smell.",
    "sources": [
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "Clemson HGIC, Selecting & Storing Fruits & Vegetables",
        "url": "https://hgic.clemson.edu/factsheet/selecting-storing-fruits-vegetables/"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Clemson HGIC, Basics of Safe Food Handling",
        "url": "https://hgic.clemson.edu/factsheet/basics-of-safe-food-handling/"
      },
      {
        "name": "Oregon State University Extension, Freezing Fruits and Vegetables (PNW 214)",
        "url": "https://extension.oregonstate.edu/catalog/pnw-214-freezing-fruits-vegetables"
      }
    ],
    "checked": "two"
  },
  {
    "key": "eggplant",
    "name": "Eggplant",
    "emoji": "🍆",
    "group": "produce",
    "fridge": {
      "min": 3,
      "max": 7,
      "unit": "days"
    },
    "freezer": {
      "min": 8,
      "max": 12,
      "unit": "months"
    },
    "pantry": {
      "min": 1,
      "max": 1,
      "unit": "days"
    },
    "variants": [],
    "best": "fridge",
    "how": "Eggplant likes cool, not cold (about 50-55°F). Keep it whole and unwashed in a perforated plastic bag in the crisper and use within a few days, since longer fridge time causes pitting and browning.",
    "freeze": "No freezer time turned up in this research.",
    "why": "Eggplant comes from warm summer gardens, and too much cold gives it sunken pits and brown insides.",
    "spoiled": "Soft, wrinkled or dull skin, sunken pits, large brown spots, mushy or brown seedy flesh, mold, or a sour smell.",
    "sources": [
      {
        "name": "Utah State University Extension, Harvest and Handling (tomato, pepper, eggplant)",
        "url": "https://extension.usu.edu/vegetableguide/tomato-pepper-eggplant/harvest-handling"
      },
      {
        "name": "Clemson HGIC, Eggplant",
        "url": "https://hgic.clemson.edu/factsheet/eggplant/"
      },
      {
        "name": "University of Minnesota Extension, Harvesting and storing home garden vegetables",
        "url": "https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/harvesting-and-storing-home-garden-vegetables"
      },
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      },
      {
        "name": "Oregon State University Extension, Freezing Fruits and Vegetables (PNW 214)",
        "url": "https://extension.oregonstate.edu/catalog/pnw-214-freezing-fruits-vegetables"
      }
    ],
    "checked": "two"
  },
  {
    "key": "korean-radish",
    "name": "Korean radish (mu)",
    "emoji": "🥕",
    "group": "produce",
    "fridge": {
      "min": 10,
      "max": 14,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Cut off any leafy tops, wrap the radish in a plastic bag and keep it in the crisper drawer; wrap cut pieces tightly in plastic.",
    "freeze": "Raw radish turns soft and watery when frozen; if you freeze it, cut it into chunks to use in soups and stews. No source with a freezer time was found.",
    "why": "Leafy tops keep pulling water out of the root, so cutting them off and keeping the radish cold and wrapped keeps it crisp and juicy.",
    "spoiled": "Soft, rubbery or wrinkled radish, a hollow or spongy center, slimy or moldy spots, or a sour smell.",
    "sources": [
      {
        "name": "NDSU Extension FN579 Food Storage Guide (reviewed Jan. 2023)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "Virginia Cooperative Extension, Food Storage Guidelines for Consumers (348-960)",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      }
    ],
    "checked": "one"
  },
  {
    "key": "herbs",
    "name": "Fresh herbs",
    "emoji": "🌿",
    "group": "produce",
    "fridge": {
      "min": 7,
      "max": 10,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Trim the stems and stand cilantro, parsley or dill in a glass of water with a loose bag over the top, in the fridge. Basil and mint do better in water on the counter.",
    "freeze": "Chop and freeze them in an ice-cube tray with a little water or oil.",
    "why": "Herbs are like tiny flower bouquets: standing in water keeps them drinking and crisp.",
    "spoiled": "Black, slimy or mushy leaves.",
    "sources": [
      {
        "name": "UT Extension W857: Storing Produce for the Short Term",
        "url": "https://rutherford.tennessee.edu/wp-content/uploads/sites/200/2022/05/W857-Storing-Produce-for-the-short-term.pdf"
      }
    ],
    "checked": "one"
  },
  {
    "key": "cut-produce",
    "name": "Cut fruit & veggies",
    "emoji": "🔪",
    "group": "produce",
    "fridge": null,
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "cut melon",
        "fridge": {
          "min": 2,
          "max": 3,
          "unit": "days"
        },
        "freezer": {
          "min": 1,
          "max": 1,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "cut pineapple",
        "fridge": {
          "min": 2,
          "max": 3,
          "unit": "days"
        },
        "freezer": {
          "min": 4,
          "max": 6,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "cut apples (pretreated, e.g. with lemon juice)",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "cut avocado",
        "fridge": {
          "min": 1,
          "max": 2,
          "unit": "days"
        },
        "freezer": null,
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Refrigerate cut or peeled fruits and vegetables at 40°F or below in a clean, covered or airtight container, and don't leave them at room temperature for more than 2 hours. Wash whole produce before cutting so the knife doesn't carry dirt and germs inside.",
    "freeze": "Many cut fruits freeze well spread on a tray and then bagged (best quality 8-12 months for most fruits); most vegetables should be blanched first (12-18 months). Lettuce and cucumbers don't freeze well.",
    "why": "Cutting breaks the protective skin, so germs can get into the sweet, wet inside and grow fast unless it's kept cold.",
    "spoiled": "Slimy surface, mushy or water-soaked pieces, mold, liquid pooling in the container, or a sour or fermented smell.",
    "sources": [
      {
        "name": "Cornell Cooperative Extension Westchester County, Food Safety and Storage",
        "url": "https://westchester.cce.cornell.edu/nutrition-consumer-sciences/food-safety-and-storage"
      },
      {
        "name": "FDA, Selecting and Serving Produce Safely",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely?linkId=100000002660538"
      },
      {
        "name": "Colorado State Extension (Food Smart Colorado), Keeping Food Safe: Cantaloupe",
        "url": "https://foodsmartcolorado.colostate.edu/food-safety/safe-preparation-handling-and-storage/keeping-food-safe-cantaloupe/"
      },
      {
        "name": "University of Illinois Extension, Watermelon",
        "url": "https://extension.illinois.edu/gardening/watermelon"
      },
      {
        "name": "Clemson HGIC 3522, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "University of Illinois Extension, How do I stop my apples from turning brown?",
        "url": "https://extension.illinois.edu/blogs/live-well-eat-well/2020-07-09-how-do-i-stop-my-apples-turning-brown"
      },
      {
        "name": "University of Illinois Extension, Green as avocado, smooth as a smoothie!",
        "url": "https://extension.illinois.edu/blogs/simply-nutritious-quick-and-delicious/2021-09-03-green-avocado-smooth-smoothie"
      },
      {
        "name": "Clemson HGIC, Freezing Fruits & Vegetables",
        "url": "https://hgic.clemson.edu/factsheet/freezing-fruits-vegetables/"
      },
      {
        "name": "Clemson HGIC, Safe Handling of Fresh Fruits & Vegetables",
        "url": "https://hgic.clemson.edu/factsheet/safe-handling-of-fresh-fruits-vegetables/"
      },
      {
        "name": "FDA, Selecting and Serving Produce Safely",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely"
      },
      {
        "name": "USDA FNS, Best Practices for Handling Fresh Produce in Schools",
        "url": "https://www.fna.usda.gov/fs/produce-safety/best-practices-schools"
      }
    ],
    "checked": "two"
  },
  {
    "key": "ground-meat",
    "name": "Ground meat",
    "emoji": "🥩",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 3,
      "max": 4,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep it in its sealed store package on a plate or tray on the bottom shelf of the fridge, so raw juices can't drip onto other food. Cook or freeze it within 1 to 2 days.",
    "freeze": "Freeze it in the store package with foil or a freezer bag wrapped over it, or press it flat in a freezer bag with the air squeezed out. Thaw it in the fridge (then cook within 1 to 2 days), in cold water in a leak-proof bag with the water changed every 30 minutes, or in the microwave. Cook it right away after cold-water or microwave thawing, and never thaw it on the counter.",
    "why": "Grinding mixes germs from the outside of the meat all through it, so bacteria have lots of places to grow, even in the cold fridge.",
    "spoiled": "Sour or rotten smell, a slimy or tacky feel, or a gray-green color all the way through. Brown or gray inside on its own can just mean no air reached it. Harmful bacteria often don't change how meat looks or smells, so go by the days, not the sniff test.",
    "sources": [
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS: The Big Thaw, Safe Defrosting Methods",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/big-thaw-safe-defrosting-methods"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Storing Meats & Seafood",
        "url": "https://hgic.clemson.edu/factsheet/storing-meats-seafood/"
      },
      {
        "name": "USDA FSIS: Refrigeration & Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/refrigeration"
      },
      {
        "name": "USDA FSIS: Ground Beef and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat/ground-beef-and-food-safety"
      },
      {
        "name": "USDA FSIS: Ground Poultry and Food Safety",
        "url": "https://www.fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets/poultry-preparation/ground-poultry-and-food-safety/ct_index"
      }
    ],
    "checked": "two"
  },
  {
    "key": "steaks-roasts",
    "name": "Steaks, chops & roasts",
    "emoji": "🥩",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 5,
      "unit": "days"
    },
    "freezer": {
      "min": 4,
      "max": 12,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "beef cuts (steaks, roasts, short ribs)",
        "fridge": {
          "min": 3,
          "max": 5,
          "unit": "days"
        },
        "freezer": {
          "min": 4,
          "max": 12,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "pork cuts (chops, roasts, ribs, pork belly)",
        "fridge": {
          "min": 3,
          "max": 5,
          "unit": "days"
        },
        "freezer": {
          "min": 4,
          "max": 6,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep it in the store package on a plate or tray on the bottom shelf of the fridge, so raw juices can't drip onto other food. Cook or freeze it within 3 to 5 days.",
    "freeze": "It's safe to freeze it in the store package. For longer storage, put foil, freezer paper or a freezer bag over it, because store wrap lets air in. Thaw it in the fridge (thawed steaks, chops and roasts keep 3 to 5 more days and can be refrozen), in cold water in a sealed bag, or in the microwave. Cook it right away after cold-water or microwave thawing.",
    "why": "On a solid piece of meat the germs are mostly on the outside surface, and the cold slows them down, so a whole cut lasts a few days longer than ground meat.",
    "spoiled": "Slimy or sticky surface, a sour or ammonia-like smell, or a gray-green, dull color. When in doubt, throw it out.",
    "sources": [
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS: Fresh Pork From Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/fresh-pork-farm-table"
      },
      {
        "name": "USDA FSIS: Beef From Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/beef-farm-table"
      },
      {
        "name": "USDA FSIS: The Big Thaw, Safe Defrosting Methods",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/big-thaw-safe-defrosting-methods"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Storing Meats & Seafood",
        "url": "https://hgic.clemson.edu/factsheet/storing-meats-seafood/"
      },
      {
        "name": "USDA FSIS: Keep Food Safe! Food Safety Basics",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe"
      }
    ],
    "checked": "two"
  },
  {
    "key": "sliced-meat",
    "name": "Sliced & marinated meat",
    "emoji": "🥩",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 3,
      "max": 4,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "sitting in a marinade (bulgogi, galbi, dak-galbi)",
        "fridge": {
          "min": 1,
          "max": 2,
          "unit": "days"
        },
        "freezer": null,
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep thin-sliced meat (and meat in marinade) in a sealed container or zip bag on the bottom shelf of the fridge. Always marinate in the fridge, never on the counter, and cook within 1 to 2 days.",
    "freeze": "If you won't cook it within 1 to 2 days, freeze it in meal-sized portions, flat in freezer bags with the air pressed out. Thin slices dry out and get freezer burn faster than big cuts. Thaw it in the fridge, in cold water in a sealed bag, or in the microwave. Thin slices thaw fast, and you should cook them right away after cold-water or microwave thawing.",
    "why": "Slicing meat thin makes lots of new surface where germs can land and grow, so it spoils faster than one big piece.",
    "spoiled": "Sour or rotten smell (beyond the marinade smell), a slimy or sticky feel, or gray-green color. Meat left in marinade too long can also turn mushy.",
    "sources": [
      {
        "name": "USDA FSIS: Grilling and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/grilling-and-food-safety"
      },
      {
        "name": "USDA FSIS: Poultry: Basting, Brining, and Marinating",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/poultry-basting-brining-and-marinating"
      },
      {
        "name": "USDA FSIS: The Big Thaw, Safe Defrosting Methods",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/big-thaw-safe-defrosting-methods"
      },
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Storing Meats & Seafood",
        "url": "https://hgic.clemson.edu/factsheet/storing-meats-seafood/"
      },
      {
        "name": "USDA FSIS: Refrigeration & Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/refrigeration"
      },
      {
        "name": "FDA Refrigerator & Freezer Storage Chart",
        "url": "https://www.fda.gov/media/74435/download"
      },
      {
        "name": "USDA FSIS: Beef From Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/beef-farm-table"
      },
      {
        "name": "USDA FSIS: Lamb From Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/lamb-farm-table"
      },
      {
        "name": "USDA FSIS: Veal From Farm to Table",
        "url": "https://fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets/meat-preparation/veal-from-farm-to-table/CT_Index"
      }
    ],
    "checked": "two"
  },
  {
    "key": "chicken",
    "name": "Chicken & turkey",
    "emoji": "🍗",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 9,
      "max": 9,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "whole chicken or turkey",
        "fridge": {
          "min": 1,
          "max": 2,
          "unit": "days"
        },
        "freezer": {
          "min": 1,
          "max": 1,
          "unit": "years"
        },
        "pantry": null
      },
      {
        "label": "pieces (thighs, breasts, wings, drumsticks)",
        "fridge": {
          "min": 1,
          "max": 2,
          "unit": "days"
        },
        "freezer": {
          "min": 9,
          "max": 9,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep raw chicken in its sealed package inside a plastic bag or on a plate, on the bottom shelf of the fridge, so its juices can't drip on anything. Cook or freeze it within 1 to 2 days.",
    "freeze": "Freeze it in the store package wrapped again in foil or a freezer bag, or split it into meal-sized portions. Thaw it in the fridge: a whole turkey needs about 1 day per 5 pounds, and thawed poultry keeps 1 to 2 more days. You can also thaw it in cold water in a leak-proof bag (change the water every 30 minutes) or in the microwave, then cook it right away.",
    "why": "Raw chicken often carries germs like Salmonella that can still grow slowly in the fridge, so it has to be cooked or frozen quickly.",
    "spoiled": "Sour or rotten smell, a slimy or sticky surface, or a gray or greenish color. Germs that make people sick may give no sign at all, so stick to 1 to 2 days.",
    "sources": [
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS: Chicken from Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/chicken-farm-table"
      },
      {
        "name": "USDA FSIS: The Big Thaw, Safe Defrosting Methods",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/big-thaw-safe-defrosting-methods"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Storing Meats & Seafood",
        "url": "https://hgic.clemson.edu/factsheet/storing-meats-seafood/"
      }
    ],
    "checked": "two"
  },
  {
    "key": "bacon",
    "name": "Bacon",
    "emoji": "🥓",
    "group": "protein",
    "fridge": {
      "min": 7,
      "max": 7,
      "unit": "days"
    },
    "freezer": {
      "min": 1,
      "max": 1,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep bacon in its package in the fridge. Once opened, wrap it tightly or put it in a zip bag, and keep it below ready-to-eat foods because it is raw meat. Use it within 7 days.",
    "freeze": "Freeze it in its package wrapped in foil or a freezer bag, or roll small portions of slices in parchment so you can take out just what you need. Use it within about 1 month for best flavor, because salty, fatty meat goes stale in the freezer sooner. Thaw it in the fridge, or in the microwave if you're cooking it right away.",
    "why": "Bacon is cured with salt, which slows germs down a little, but it's still raw meat, so it only lasts about a week in the fridge.",
    "spoiled": "Sour or off smell, a slimy or sticky feel, or the pink color turning gray, brown or green.",
    "sources": [
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS: Bacon and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/bacon-and-food-safety"
      },
      {
        "name": "USDA FSIS: Keep Food Safe! Food Safety Basics",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe"
      },
      {
        "name": "USDA FSIS: Refrigeration & Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/refrigeration"
      }
    ],
    "checked": "two"
  },
  {
    "key": "sausage-raw",
    "name": "Fresh sausage",
    "emoji": "🌭",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 1,
      "max": 2,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep raw sausage in its sealed package on a plate on the bottom shelf of the fridge, and cook or freeze it within 1 to 2 days, opened or not. Always cook it all the way through before eating.",
    "freeze": "Freeze it in the package wrapped in foil or a freezer bag, or in meal-sized portions, and use it within 1 to 2 months for best quality. Thaw it in the fridge, in cold water in a sealed bag, or in the microwave, and cook it right away after cold-water or microwave thawing.",
    "why": "Fresh sausage is ground meat, so germs get mixed all through it, just like ground beef, and it spoils fast.",
    "spoiled": "Sour or rotten smell, a slimy casing or meat, or gray-green color.",
    "sources": [
      {
        "name": "USDA FSIS: Sausages and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/sausages-and-food-safety"
      },
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      }
    ],
    "checked": "two"
  },
  {
    "key": "hot-dogs",
    "name": "Hot dogs",
    "emoji": "🌭",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 1,
      "unit": "weeks"
    },
    "freezer": {
      "min": 1,
      "max": 2,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "unopened package",
        "fridge": {
          "min": 2,
          "max": 2,
          "unit": "weeks"
        },
        "freezer": {
          "min": 1,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "opened package",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "weeks"
        },
        "freezer": {
          "min": 1,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep hot dogs in the fridge, unopened up to 2 weeks (or until the package date). Once opened, reseal them in a zip bag or container and eat them within 1 week.",
    "freeze": "Hot dogs freeze well in their package, or in a freezer bag once opened. Use them within 1 to 2 months for best quality. Thaw them in the fridge, or cook them straight from frozen.",
    "why": "Hot dogs are already cooked, but a germ called Listeria can still grow slowly in a cold fridge once the package is open.",
    "spoiled": "Slimy surface, a sour smell, or dull, gray color, or liquid in the package that looks cloudy. Listeria gives no warning signs, so stick to the time limits.",
    "sources": [
      {
        "name": "USDA FSIS: Hot Dogs and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/hot-dogs-food-safety"
      },
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS: Keep Food Safe! Food Safety Basics",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe"
      },
      {
        "name": "USDA FSIS: Sausages and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/sausages-and-food-safety"
      }
    ],
    "checked": "two"
  },
  {
    "key": "deli-ham",
    "name": "Ham & lunch meat",
    "emoji": "🥪",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 1,
      "max": 2,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "unopened factory-sealed package",
        "fridge": {
          "min": 2,
          "max": 2,
          "unit": "weeks"
        },
        "freezer": {
          "min": 1,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "opened package or sliced at the deli counter",
        "fridge": {
          "min": 3,
          "max": 5,
          "unit": "days"
        },
        "freezer": {
          "min": 1,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "fully cooked ham slices",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 1,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep opened or deli-sliced meat in a sealed zip bag or airtight container on a shelf above raw meat. Eat it within 3 to 5 days (3 to 4 days for cooked ham slices).",
    "freeze": "Freezes for 1 to 2 months. Freeze it in small, flat portions in freezer bags. Thawed slices may be a bit watery, so they work best in cooked dishes like fried rice, kimbap or sandwiches. Thaw them in the fridge.",
    "why": "Sliced meat is ready to eat, so germs like Listeria that land on it during slicing can slowly grow even in the cold, and there's no cooking step to kill them.",
    "spoiled": "Slimy or sticky film, a sour smell, or gray, green or dull color. Listeria gives no warning signs, so go by the days.",
    "sources": [
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS: Hams and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/hams-and-food-safety"
      },
      {
        "name": "USDA FSIS: Keep Food Safe! Food Safety Basics",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe"
      },
      {
        "name": "USDA FSIS: Kitchen Companion",
        "url": "https://www.fsis.usda.gov/sites/default/files/media_file/2020-12/Kitchen-Companion.pdf"
      },
      {
        "name": "USDA FSIS: Chicken from Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/chicken-farm-table"
      }
    ],
    "checked": "two"
  },
  {
    "key": "spam",
    "name": "Spam",
    "emoji": "🥫",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 1,
      "max": 2,
      "unit": "months"
    },
    "pantry": {
      "min": 2,
      "max": 5,
      "unit": "years"
    },
    "variants": [
      {
        "label": "unopened can",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 2,
          "max": 5,
          "unit": "years"
        }
      },
      {
        "label": "after opening (moved to a container)",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 1,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "pantry",
    "how": "Keep unopened cans in a cool, dry cupboard. After opening, move leftover meat into a covered glass or plastic container, refrigerate it, and eat it within 3 to 4 days.",
    "freeze": "Don't freeze the unopened can. Leftover opened Spam can be sliced, wrapped and frozen for 1 to 2 months. It may get a bit crumbly or watery, but it's fine pan-fried or in kimchi-jjigae or budae-jjigae.",
    "why": "The can is sealed and then heated so hot that the germs inside are killed and no new ones can get in. Once you open it, germs from the air can get in again.",
    "spoiled": "Throw out cans that are bulging, leaking, rusty or badly dented, or that spurt when opened. Opened meat with a sour smell, slime or mold should also go.",
    "sources": [
      {
        "name": "USDA FSIS: Shelf-Stable Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/shelf-stable-food"
      },
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS: Hams and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/hams-and-food-safety"
      },
      {
        "name": "CJ CheilJedang (makes SPAM in Korea under license) FAQ: storing leftover SPAM",
        "url": "https://www.cj.co.kr/kr/support/faq/1087"
      }
    ],
    "checked": "two"
  },
  {
    "key": "fish-lean",
    "name": "White fish (cod, pollock)",
    "emoji": "🐟",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 4,
      "max": 8,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "If you'll cook it within 1 to 2 days, keep it wrapped in a sealed container or bag on the bottom shelf, the coldest part of the fridge. Otherwise freeze it right away.",
    "freeze": "Wrap it tightly in moisture-proof freezer wrap or a freezer bag with the air pressed out. Repackage store trays first. Thaw it in the fridge overnight, in cold water in a sealed bag, or in the microwave, and cook it right away after cold-water or microwave thawing.",
    "why": "Fish live in cold water, so the germs and natural enzymes on them are used to the cold and keep working even in your fridge.",
    "spoiled": "A sour, very fishy or ammonia-like smell, flesh that is slimy, mushy or discolored, or edges that are dark or dried out. If cooked fish smells of ammonia, don't eat it.",
    "sources": [
      {
        "name": "FDA Refrigerator & Freezer Storage Chart",
        "url": "https://www.fda.gov/media/74435/download"
      },
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS: Keep Food Safe! Food Safety Basics",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe"
      },
      {
        "name": "FDA: Selecting and Serving Fresh and Frozen Seafood Safely",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely"
      }
    ],
    "checked": "two"
  },
  {
    "key": "fish-fatty",
    "name": "Salmon & mackerel",
    "emoji": "🐟",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 2,
      "max": 3,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "If you'll cook it within 1 to 2 days, keep it wrapped in a sealed container or bag on the bottom shelf, the coldest part of the fridge. Otherwise freeze it right away.",
    "freeze": "Wrap it tightly with no air pockets (freezer bag with air pressed out, or plastic wrap plus foil), because air makes the fish oil taste stale. Use it within 2 to 3 months. Thaw it in the fridge overnight, in cold water in a sealed bag, or in the microwave, and cook it right away after the last two.",
    "why": "The healthy oils in salmon and mackerel slowly react with air and start to smell stale, even in the freezer, so fatty fish doesn't keep as long frozen as lean fish.",
    "spoiled": "A sour, strong fishy or ammonia smell, slimy or mushy flesh, dull or brownish color, or dried-out edges. If it smells rancid or of ammonia after cooking, don't eat it.",
    "sources": [
      {
        "name": "FDA Refrigerator & Freezer Storage Chart",
        "url": "https://www.fda.gov/media/74435/download"
      },
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "FDA: Selecting and Serving Fresh and Frozen Seafood Safely",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely"
      }
    ],
    "checked": "two"
  },
  {
    "key": "shrimp",
    "name": "Shrimp & shellfish",
    "emoji": "🦐",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 3,
      "max": 6,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "raw shrimp and squid",
        "fridge": {
          "min": 1,
          "max": 2,
          "unit": "days"
        },
        "freezer": {
          "min": 3,
          "max": 6,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "live clams and mussels (in the shell)",
        "fridge": {
          "min": 2,
          "max": 3,
          "unit": "days"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "shucked clams and mussels",
        "fridge": {
          "min": 1,
          "max": 2,
          "unit": "days"
        },
        "freezer": {
          "min": 3,
          "max": 4,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep raw shrimp and squid sealed in a container or bag on the bottom shelf, the coldest part of the fridge, and cook them within 1 to 2 days. Keep live clams and mussels in an open bowl covered with a damp cloth, not in a sealed bag or in water.",
    "freeze": "Raw shrimp and squid freeze well tightly wrapped in freezer bags with the air pressed out. Thaw them in the fridge, in cold water in a sealed bag, or in the microwave, and cook them right away after the last two. Don't freeze live clams or mussels; shucked ones can be frozen for 3 to 4 months.",
    "why": "Shrimp and shellfish have soft meat and natural enzymes that break it down fast, and germs from the sea grow quickly on it, so they spoil faster than most meat.",
    "spoiled": "A sour, strong fishy or ammonia smell, or slimy or mushy flesh. Throw out clams or mussels with cracked shells, and live ones that don't close when tapped. If cooked shellfish smells of ammonia, don't eat it.",
    "sources": [
      {
        "name": "FDA Refrigerator & Freezer Storage Chart",
        "url": "https://www.fda.gov/media/74435/download"
      },
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "FDA: Selecting and Serving Fresh and Frozen Seafood Safely",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely"
      },
      {
        "name": "Cornell seafood handling and storage guide (hosted by Oregon State Seafood Network)",
        "url": "https://seafood.oregonstate.edu/sites/agscid7/files/snic/seafood-handling-and-storage-cornell.pdf"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Storing Meats & Seafood",
        "url": "https://hgic.clemson.edu/factsheet/storing-meats-seafood/"
      },
      {
        "name": "NOAA Fisheries: Best Practices for Storing and Handling Seafood",
        "url": "https://www.fisheries.noaa.gov/national/sustainable-seafood/how-store-and-handle-seafood"
      },
      {
        "name": "FoodSafety.gov blog: Safe Selection and Handling of Fish and Shellfish",
        "url": "https://www.foodsafety.gov/blog/safe-selection-and-handling-fish-and-shellfish"
      }
    ],
    "checked": "two"
  },
  {
    "key": "fish-cakes",
    "name": "Fish cakes (eomuk)",
    "emoji": "🍢",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 3,
      "max": 3,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "unopened package",
        "fridge": null,
        "freezer": {
          "min": 3,
          "max": 3,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "opened package",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 3,
          "max": 3,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep unopened packs in the fridge and use them by the date on the package. After opening, put leftovers in an airtight container or zip bag and use them within 3 to 4 days, or freeze them.",
    "freeze": "Freeze fish cakes you won't use soon in a zip bag in meal-sized portions, for up to 3 months (Maangchi). Thaw them overnight in the fridge for the best chewy texture, or drop them frozen straight into soup or stir-fry.",
    "why": "Fish cakes are cooked fish paste, but once the package is open, mold and germs from the air can start growing on their moist, oily surface.",
    "spoiled": "Sticky or slimy surface, a sour or off smell, mold spots, or a puffed-up package.",
    "sources": [
      {
        "name": "FoodKeeper reference brochure (Food Marketing Institute with USDA/Cornell), surimi seafood",
        "url": "https://communityfoodshare.org/wp-content/uploads/2016/11/FoodKeeper-Reference-Brochure.pdf"
      },
      {
        "name": "Korea Ministry of Food and Drug Safety (MFDS), reference consumption dates (Korean government source)",
        "url": "https://www.mfds.go.kr/brd/m_827/view.do?seq=3616&srchFr=&srchTo=&srchWord=&srchTp=&itm_seq_1=0&itm_seq_2=0&multi_itm_seq=0&company_cd=&company_nm=&page=1"
      },
      {
        "name": "Maangchi, Fish cakes (Eomuk) recipe and ingredient page (Korean cooking reference)",
        "url": "https://www.maangchi.com/ingredient/fish-cakes"
      },
      {
        "name": "식자재왕몰 blog (Korean food-service retailer)",
        "url": "https://www.ewangmart.com/blog/food/%EA%BC%AC%EC%B9%98%EC%96%B4%EB%AC%B5vs%EC%82%AC%EA%B0%81%EC%96%B4%EB%AC%B5-%EC%97%85%EC%86%8C%EC%9A%A9-%EC%96%B4%EB%AC%B5-%EC%A2%85%EB%A5%98%EB%B3%84-%ED%99%9C%EC%9A%A9%EB%B2%95%EB%B6%80%ED%84%B0/"
      },
      {
        "name": "Hyosung Eomuk (Korean fish cake manufacturer) FAQ",
        "url": "https://hsfood.kr/article/%EC%9E%90%EC%A3%BC%ED%95%98%EB%8A%94%EC%A7%88%EB%AC%B8/3/22/"
      },
      {
        "name": "CJ Samho Eomuk product page (Korean manufacturer)",
        "url": "https://www.cjthemarket.com/the/product/product-main?prdCd=40219815"
      },
      {
        "name": "Maangchi (Korean cooking reference): Fish cakes recipe",
        "url": "https://www.maangchi.com/recipe/eomuk"
      },
      {
        "name": "FDA Refrigerator & Freezer Storage Chart",
        "url": "https://www.fda.gov/media/74435/download"
      }
    ],
    "checked": "two"
  },
  {
    "key": "imitation-crab",
    "name": "Imitation crab",
    "emoji": "🦀",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 9,
      "max": 9,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep it in the fridge in its sealed package and use it by the package date. Once opened, wrap leftovers tightly or put them in an airtight container, and eat them within 3 to 4 days.",
    "freeze": "It can be frozen tightly wrapped for up to 9 months. After thawing it may be softer and more watery, so use it in cooked dishes like soups, fried rice or pancakes rather than kimbap. Thaw it in the fridge.",
    "why": "Imitation crab is cooked, ready-to-eat fish paste. Germs that get in after the package is opened can grow without any cooking to stop them.",
    "spoiled": "Sour or off smell, a slimy or sticky surface, color fading or turning gray, or a puffed-up package.",
    "sources": [
      {
        "name": "FoodKeeper reference brochure (Food Marketing Institute with USDA/Cornell)",
        "url": "https://communityfoodshare.org/wp-content/uploads/2016/11/FoodKeeper-Reference-Brochure.pdf"
      },
      {
        "name": "Wyoming Department of Health food storage chart (from USDA FoodKeeper)",
        "url": "https://health.wyo.gov/wp-content/uploads/2018/06/FOOD-STORAGE-TIMES-.pdf"
      },
      {
        "name": "University of Kentucky Cooperative Extension FCS3595",
        "url": "https://publications.mgcafe.uky.edu/sites/publications.ca.uky.edu/files/FCS3595.pdf"
      },
      {
        "name": "Purdue Extension (NDSU) Food Storage Guide",
        "url": "https://www.extension.purdue.edu/extmedia/HHS/HHS-785-W.pdf"
      },
      {
        "name": "NDSU Extension: Food Storage Guide (FN579)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2025-09/fn579.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "canned-tuna",
    "name": "Canned tuna",
    "emoji": "🥫",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 2,
      "max": 2,
      "unit": "months"
    },
    "pantry": {
      "min": 2,
      "max": 5,
      "unit": "years"
    },
    "variants": [
      {
        "label": "unopened can",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 2,
          "max": 5,
          "unit": "years"
        }
      },
      {
        "label": "opened (moved to a container)",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 2,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "pantry",
    "how": "Keep unopened cans in a cool, dry cupboard. After opening, move leftover tuna into a covered glass or plastic container in the fridge and eat it within 3 to 4 days.",
    "freeze": "Don't freeze the can. Leftover tuna taken out of the can can be frozen in a sealed container for about 2 months, but it gets drier and mushier, so it's best mixed into cooked dishes.",
    "why": "The tuna is sealed in the can and then cooked very hot, which kills the germs inside and keeps new ones out until you open it.",
    "spoiled": "Throw out cans that are bulging, leaking, rusty or badly dented, or that spurt when opened. Opened tuna with a sour smell, slime or mold should also go.",
    "sources": [
      {
        "name": "USDA FSIS: Shelf-Stable Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/shelf-stable-food"
      },
      {
        "name": "FDA Refrigerator & Freezer Storage Chart",
        "url": "https://www.fda.gov/media/74435/download"
      }
    ],
    "checked": "one"
  },
  {
    "key": "eggs",
    "name": "Eggs",
    "emoji": "🥚",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 5,
      "unit": "weeks"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep eggs in their original carton on an inside shelf of the fridge, not in the door, where the temperature goes up and down. Don't leave them out of the fridge for more than 2 hours.",
    "freeze": "Don't freeze eggs in the shell, because the inside expands and cracks the shell. To freeze them, crack them into a container and beat the yolks and whites together first.",
    "why": "Germs like Salmonella can be on or inside eggs, and keeping them cold stops those germs from multiplying.",
    "spoiled": "A bad, sulfur-like smell when you crack it open, or a slimy, powdery or moldy shell. Throw out eggs that are cracked or dirty. The float test only shows age, not whether an egg is safe.",
    "sources": [
      {
        "name": "USDA FSIS: Shell Eggs from Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/eggs/shell-eggs-farm-table"
      },
      {
        "name": "FDA: What You Need to Know About Egg Safety",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"
      },
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      }
    ],
    "checked": "one"
  },
  {
    "key": "hard-boiled-eggs",
    "name": "Hard-boiled eggs",
    "emoji": "🥚",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 1,
      "unit": "weeks"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "in shell",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "weeks"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "peeled",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "weeks"
        },
        "freezer": null,
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Refrigerate them within 2 hours of cooking, in a covered container, and eat them within a week of the day you cooked them, peeled or not.",
    "freeze": "Don't freeze hard-boiled eggs: USDA advises against it, and cooked whites turn tough and watery.",
    "why": "Boiling leaves a thin layer of water under the shell, and germs love warm, wet places, so cooked eggs spoil faster than raw ones in the carton.",
    "spoiled": "A strong rotten-egg smell (stronger than the normal mild cooked-egg smell), a slimy or sticky surface, or mold.",
    "sources": [
      {
        "name": "USDA FSIS: Shell Eggs from Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/eggs/shell-eggs-farm-table"
      },
      {
        "name": "FDA: What You Need to Know About Egg Safety",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"
      },
      {
        "name": "USDA ARS: Egg Safety, Egg-citing Facts About Eating Eggs",
        "url": "https://www.ars.usda.gov/ARSUserFiles/oc/aglab/learnexplore/eggsafety/eggsafety_eatingeggs.pdf"
      }
    ],
    "checked": "one"
  },
  {
    "key": "milk",
    "name": "Milk",
    "emoji": "🥛",
    "group": "protein",
    "fridge": {
      "min": 7,
      "max": 7,
      "unit": "days"
    },
    "freezer": {
      "min": 3,
      "max": 3,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep the cap on tight and store milk on an inside shelf, not in the door, where it's warmer. Put it back in the fridge right after pouring, and use an opened jug within about 7 days.",
    "freeze": "Milk can be frozen for up to 3 months; leave a little room in the container because it expands. Thaw it in the fridge and shake it well. It may separate or turn a little grainy, so thawed milk is best for cooking or baking. Use it within 2 to 3 days of thawing.",
    "why": "Pasteurizing kills most germs in milk, but once the jug is open new ones get in, and milk is such a good food for them that they slowly turn it sour, even in the cold.",
    "spoiled": "Sour smell, lumps or curdled texture, a sour or soapy-bitter taste, or mold.",
    "sources": [
      {
        "name": "Wyoming Department of Health food storage chart (from USDA FoodKeeper)",
        "url": "https://health.wyo.gov/wp-content/uploads/2018/06/FOOD-STORAGE-TIMES-.pdf"
      },
      {
        "name": "FoodKeeper reference brochure (Food Marketing Institute with USDA/Cornell)",
        "url": "https://www.augusta.edu/student-affairs/documents/foodkeeperbrochure.pdf"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Safe Handling of Milk & Dairy Products",
        "url": "https://hgic.clemson.edu/factsheet/safe-handling-of-milk-dairy-products/"
      },
      {
        "name": "University of Nevada, Reno: How do I keep milk products safe and fresh?",
        "url": "https://www.unr.edu/nevada-today/news/2021/atp-milk-tips"
      },
      {
        "name": "Virginia Cooperative Extension: Food Storage Guidelines for Consumers",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      },
      {
        "name": "Texas A&M AgriLife Dinner Tonight: Milk",
        "url": "https://dinnertonight.tamu.edu/milk/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "butter",
    "name": "Butter",
    "emoji": "🧈",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "months"
    },
    "freezer": {
      "min": 6,
      "max": 9,
      "unit": "months"
    },
    "pantry": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "variants": [],
    "best": "fridge",
    "how": "Keep butter wrapped or in a covered butter dish in the fridge, away from strong-smelling foods like kimchi, because fat soaks up smells. To keep some soft, leave out only what you'll use in a day or two, covered, in a cool spot. Salted butter handles this better than unsalted.",
    "freeze": "Butter freezes very well for 6 to 9 months in its original wrapper inside a freezer bag. Thaw it in the fridge.",
    "why": "Butter is mostly fat with very little water, so germs have a hard time growing in it, but air, light and warmth slowly make the fat taste stale and sour (rancid).",
    "spoiled": "A sour, cheesy or paint-like rancid smell or taste, a darker yellow or discolored surface, a changed texture, or mold.",
    "sources": [
      {
        "name": "Wyoming Department of Health food storage chart (from USDA FoodKeeper)",
        "url": "https://health.wyo.gov/wp-content/uploads/2018/06/FOOD-STORAGE-TIMES-.pdf"
      },
      {
        "name": "University of Nebraska-Lincoln Extension: Home Food Storage",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Virginia Cooperative Extension: Food Storage Guidelines for Consumers",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      },
      {
        "name": "University of Maine Cooperative Extension: Is It Actually Safe to Leave Butter on the Counter?",
        "url": "https://extension.umaine.edu/food-health/2026/05/21/butter/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "hard-cheese",
    "name": "Hard cheese",
    "emoji": "🧀",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "weeks"
    },
    "freezer": {
      "min": 6,
      "max": 6,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "unopened",
        "fridge": {
          "min": 6,
          "max": 6,
          "unit": "months"
        },
        "freezer": {
          "min": 6,
          "max": 6,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "opened",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "weeks"
        },
        "freezer": {
          "min": 6,
          "max": 6,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep it in its sealed package until opening. After that, wrap it tightly in wax paper, parchment or plastic wrap, or put it in a zip bag, and keep it in the cheese or deli drawer.",
    "freeze": "Hard cheese can be frozen for up to 6 months. It turns crumbly after thawing, so grate or shred it first and use it in cooking (pasta, casseroles, cheese on ramyeon). Thaw it in the fridge.",
    "why": "Hard cheese has very little water and lots of salt, so germs struggle to grow inside it, and mold mostly stays near the surface, which is why you can cut it off.",
    "spoiled": "Small mold spots on a block of hard cheese can be cut off: remove at least 1 inch around and below the spot, keep the knife out of the mold, and rewrap the cheese in fresh wrap. Throw the cheese out if it is covered in mold, smells sour or of ammonia, or feels slimy.",
    "sources": [
      {
        "name": "FoodKeeper reference brochure (Food Marketing Institute with USDA/Cornell)",
        "url": "https://communityfoodshare.org/wp-content/uploads/2016/11/FoodKeeper-Reference-Brochure.pdf"
      },
      {
        "name": "USDA FSIS: Molds on Food: Are They Dangerous?",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/molds-food-are-they-dangerous"
      },
      {
        "name": "Ohio State University Extension: Refrigerator Storage (HYG-5403)",
        "url": "https://ohioline.osu.edu/factsheet/HYG-5403"
      }
    ],
    "checked": "one"
  },
  {
    "key": "soft-cheese",
    "name": "Soft & shredded cheese",
    "emoji": "🧀",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "weeks"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "fresh mozzarella (in water or brine)",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "weeks"
        },
        "freezer": {
          "min": 1,
          "max": 1,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "shredded cheese (cheddar, mozzarella)",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "months"
        },
        "freezer": {
          "min": 3,
          "max": 4,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "cream cheese",
        "fridge": {
          "min": 2,
          "max": 2,
          "unit": "weeks"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "ricotta and cottage cheese, unopened",
        "fridge": {
          "min": 2,
          "max": 2,
          "unit": "weeks"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "ricotta and cottage cheese, opened",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "weeks"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "feta, opened",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "weeks"
        },
        "freezer": null,
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep soft cheeses sealed in their tub or a zip bag in the fridge, and keep feta covered in its brine. Scoop cream cheese, ricotta and cottage cheese with a clean spoon, and use string cheese by the date on the package.",
    "freeze": "Cream cheese, cottage cheese, ricotta and feta don't freeze well; they turn watery and crumbly. Shredded cheese freezes well for 3 to 4 months (shake the bag to break up clumps), and fresh mozzarella for up to 1 month. Use thawed cheese in cooked dishes like pizza or cheese tteokbokki.",
    "why": "Soft cheeses hold a lot of water, so germs and mold grow faster in them and can spread deep inside instead of staying on the surface.",
    "spoiled": "Any mold on soft, shredded, sliced or crumbled cheese means throw out the whole package, because mold spreads below the surface where you can't see it. Also throw it out if it smells sour or of ammonia, turns slimy, or changes color.",
    "sources": [
      {
        "name": "FoodKeeper reference brochure (Food Marketing Institute with USDA/Cornell)",
        "url": "https://communityfoodshare.org/wp-content/uploads/2016/11/FoodKeeper-Reference-Brochure.pdf"
      },
      {
        "name": "USDA FSIS: Molds on Food: Are They Dangerous?",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/molds-food-are-they-dangerous"
      },
      {
        "name": "University of Alaska Fairbanks Cooperative Extension: Making Fresh Mozzarella",
        "url": "https://www.uaf.edu/ces/publications/database/food/making-fresh-mozzarella.php"
      },
      {
        "name": "Virginia Cooperative Extension: Food Storage Guidelines for Consumers",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Safety of Stored Foods",
        "url": "https://hgic.clemson.edu/factsheet/safety-of-stored-foods/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "yogurt",
    "name": "Yogurt",
    "emoji": "🥣",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "weeks"
    },
    "freezer": {
      "min": 1,
      "max": 2,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep yogurt sealed on a fridge shelf, not in the door. Use a clean spoon each time and close the tub after scooping.",
    "freeze": "Yogurt can be frozen for 1 to 2 months, but it turns thinner and grainier after thawing, so use it in smoothies, marinades or baking rather than eating it plain. Thaw it in the fridge.",
    "why": "Yogurt is made by friendly bacteria that make it sour, which keeps many bad germs away, but molds and yeasts can still grow on it over time.",
    "spoiled": "Mold of any color, a puffed-up container, a yeasty or unusually sour smell, or a slimy or chunky texture. A little clear liquid (whey) on top is normal; just stir it back in.",
    "sources": [
      {
        "name": "Wyoming Department of Health food storage chart (from USDA FoodKeeper)",
        "url": "https://health.wyo.gov/wp-content/uploads/2018/06/FOOD-STORAGE-TIMES-.pdf"
      },
      {
        "name": "Virginia Cooperative Extension: Food Storage Guidelines for Consumers",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Safe Handling of Milk & Dairy Products",
        "url": "https://hgic.clemson.edu/factsheet/safe-handling-of-milk-dairy-products/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "sour-cream",
    "name": "Sour cream",
    "emoji": "🥣",
    "group": "protein",
    "fridge": {
      "min": 1,
      "max": 3,
      "unit": "weeks"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep it tightly covered on a fridge shelf, and scoop with a clean spoon so you don't add food bits or germs. Follow the package date for unopened tubs.",
    "freeze": "Sour cream doesn't freeze well: it separates and turns grainy. If you do freeze it, use it only in cooked dishes like soups or baking.",
    "why": "Sour cream is soured on purpose by friendly bacteria, which slows down bad germs, but mold and yeast can still grow on it once it's open.",
    "spoiled": "Mold (including pink, green or black spots), a yellowish color, a bitter or very sour off smell, or watery separation that doesn't stir back in.",
    "sources": [
      {
        "name": "Wyoming Department of Health food storage chart (from USDA FoodKeeper)",
        "url": "https://health.wyo.gov/wp-content/uploads/2018/06/FOOD-STORAGE-TIMES-.pdf"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Safe Handling of Milk & Dairy Products",
        "url": "https://hgic.clemson.edu/factsheet/safe-handling-of-milk-dairy-products/"
      },
      {
        "name": "University of Nebraska-Lincoln Extension: Home Food Storage",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "cream",
    "name": "Cream",
    "emoji": "🥛",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 7,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "heavy cream, unopened (ultra-pasteurized)",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "months"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "heavy cream, opened",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "weeks"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "half-and-half",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 4,
          "max": 4,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep cartons tightly closed on an inside fridge shelf, not in the door. After opening, use heavy cream within about a week and half-and-half within 3 to 4 days.",
    "freeze": "USDA FoodKeeper says not to freeze ultra-pasteurized heavy cream: it separates and won't whip well after thawing, though whipped cream freezes better. Half-and-half can be frozen for up to 4 months for cooking; thaw it in the fridge and shake well.",
    "why": "Cream is full of fat and milk sugar that bacteria love, so once the carton is open, germs from the air start growing and turn it sour.",
    "spoiled": "Sour smell, thick lumps or clumps, a yellowish color, or a sour taste.",
    "sources": [
      {
        "name": "Wyoming Department of Health food storage chart (from USDA FoodKeeper)",
        "url": "https://health.wyo.gov/wp-content/uploads/2018/06/FOOD-STORAGE-TIMES-.pdf"
      },
      {
        "name": "Oregon State University Extension: Storing Food for Safety and Quality (PNW 612)",
        "url": "https://extension.oregonstate.edu/sites/extd8/files/2023-08/pnw612.pdf"
      },
      {
        "name": "Virginia Cooperative Extension: Food Storage Guidelines for Consumers",
        "url": "https://www.pubs.ext.vt.edu/348/348-960/348-960.html"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Safe Handling of Milk & Dairy Products",
        "url": "https://hgic.clemson.edu/factsheet/safe-handling-of-milk-dairy-products/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "tofu",
    "name": "Tofu",
    "emoji": "⬜",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 5,
      "unit": "days"
    },
    "freezer": {
      "min": 3,
      "max": 3,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "unopened package (refrigerated, in water)",
        "fridge": null,
        "freezer": {
          "min": 3,
          "max": 3,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "opened or leftover tofu kept in water",
        "fridge": {
          "min": 3,
          "max": 5,
          "unit": "days"
        },
        "freezer": {
          "min": 3,
          "max": 3,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Use unopened tofu by the package date. After opening, put leftover tofu in a container, cover it completely with fresh cold water, close the lid, change the water every day, and use it within 3 to 5 days.",
    "freeze": "Drain and pat it dry, cut it into pieces, and freeze them in an airtight container or bag for up to 3 months. Frozen firm tofu turns spongy, chewy and a little darker, which is great for jjigae and braised dishes because it soaks up broth. Silken or soft tofu doesn't freeze well. Thaw it in the fridge overnight.",
    "why": "Tofu is soft, wet and full of protein, which bacteria love. Changing the water every day rinses away the germs that start to grow.",
    "spoiled": "A sour smell, a slimy surface, cloudy or bad-smelling water, a yellowish color, a puffed-up package, or mold.",
    "sources": [
      {
        "name": "Rutgers NJAES Cooperative Extension FS792: Tofu Made Easy",
        "url": "https://njaes.rutgers.edu/FS792/"
      },
      {
        "name": "USDA FNS WIC Works: What Do I Do With Tofu",
        "url": "https://wicworks.fns.usda.gov/topic/what-do-i-do-with-my/tofu"
      },
      {
        "name": "Oregon State University Extension: Does tofu expire?",
        "url": "https://extension.oregonstate.edu/ask-extension/featured/does-tofu-expire"
      }
    ],
    "checked": "one"
  },
  {
    "key": "cooked-meat",
    "name": "Cooked meat & fish",
    "emoji": "🍖",
    "group": "protein",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 2,
      "max": 3,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "cooked meat or poultry (bulgogi, galbi, fried or roast chicken)",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 2,
          "max": 6,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "cooked fish and seafood",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 3,
          "max": 3,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "soups and stews with meat or seafood (jjigae, guk, galbi-jjim)",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 2,
          "max": 3,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Refrigerate leftovers within 2 hours of cooking (1 hour if it's above 90°F). Divide big batches into shallow, covered containers so they cool quickly, and eat them within 3 to 4 days. Reheat to 165°F, and bring soups and stews to a rolling boil.",
    "freeze": "Freeze leftovers you won't eat within 3 to 4 days in airtight shallow containers or freezer bags, labeled with the date. They stay safe frozen but lose moisture and flavor after about 3 to 4 months. Thaw them in the fridge, in cold water, or in the microwave, then reheat to 165°F.",
    "why": "Cooking kills most germs, but new ones land on food as it cools and sits, and some can keep growing even in the fridge, so leftovers only keep a few days.",
    "spoiled": "Sour or off smell, a slimy texture, or mold. Many food-poisoning germs don't change how food smells or looks, so throw leftovers out after 4 days even if they seem fine.",
    "sources": [
      {
        "name": "USDA FSIS: Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "FoodSafety.gov Cold Food Storage Chart (USDA FSIS)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS: Keep Food Safe! Food Safety Basics",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe"
      },
      {
        "name": "FDA Refrigerator & Freezer Storage Chart",
        "url": "https://www.fda.gov/media/74435/download"
      },
      {
        "name": "USDA FSIS: Ground Poultry and Food Safety",
        "url": "https://www.fsis.usda.gov/wps/portal/fsis/topics/food-safety-education/get-answers/food-safety-fact-sheets/poultry-preparation/ground-poultry-and-food-safety/ct_index"
      }
    ],
    "checked": "two"
  },
  {
    "key": "white-rice",
    "name": "Rice (uncooked)",
    "emoji": "🍚",
    "group": "pantry",
    "fridge": null,
    "freezer": null,
    "pantry": {
      "min": 1,
      "max": 2,
      "unit": "years"
    },
    "variants": [],
    "best": "pantry",
    "how": "Keep it in the sealed bag or an airtight glass, metal or heavy plastic container in a cool, dry, dark cupboard away from the stove and sink; the airtight container also keeps out moisture, smells and pantry bugs.",
    "freeze": "Not needed: white rice keeps 1 to 2 years in the cupboard. No official fridge or freezer time was found for uncooked white rice.",
    "why": "White rice has had its oily outer layer polished off and is very dry, so germs and mold have almost no water to grow in and there is little fat to go stale.",
    "spoiled": "Bugs or webbing, a musty or sour smell, mold, damp clumps or discoloration: throw it out.",
    "sources": [
      {
        "name": "USDA FSIS: Shelf-Stable Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/shelf-stable-food"
      },
      {
        "name": "Utah State University Extension: Storing White Rice",
        "url": "https://extension.usu.edu/preserve-the-harvest/research/storing-white-rice.pdf"
      },
      {
        "name": "Oregon State University Extension, Rice storage suggestions",
        "url": "https://extension.oregonstate.edu/ask-extension/featured/rice-storage-suggestions"
      },
      {
        "name": "University of Nebraska-Lincoln Extension, Home Food Storage",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Utah State University Extension, Storing White Rice",
        "url": "https://extension.usu.edu/preserve-the-harvest/research/storing-white-rice"
      },
      {
        "name": "Oregon State University Extension, Bugs in my pantry",
        "url": "https://extension.oregonstate.edu/food/safety-storage/my-rice-crawling-bad"
      }
    ],
    "checked": "two"
  },
  {
    "key": "brown-rice",
    "name": "Brown rice (uncooked)",
    "emoji": "🍚",
    "group": "pantry",
    "fridge": {
      "min": 6,
      "max": 12,
      "unit": "months"
    },
    "freezer": {
      "min": 12,
      "max": 18,
      "unit": "months"
    },
    "pantry": {
      "min": 3,
      "max": 6,
      "unit": "months"
    },
    "variants": [],
    "best": "fridge",
    "how": "Keep it in an airtight container. A cool, dark cupboard is fine if you'll finish it in about 3 months; otherwise keep it in the fridge, or the freezer for the longest life.",
    "freeze": "Freeze uncooked brown rice in an airtight freezer bag or container with the air pressed out and the date on the label; it keeps best quality for 12-18 months.",
    "why": "Brown rice keeps its outer bran layer, which has natural oil, and oil slowly goes stale and smelly (rancid) when it's warm; cold slows that down.",
    "spoiled": "A rancid, oily or paint-like smell, an oily feel, bugs, mold or a musty odor.",
    "sources": [
      {
        "name": "Iowa State University Extension (Spend Smart Eat Smart): Brown Rice",
        "url": "https://spendsmart.extension.iastate.edu/pantry-picks/brown-rice/"
      },
      {
        "name": "Oregon State University Extension (Ask an Expert): brown rice and lentils",
        "url": "https://extension.oregonstate.edu/ask-expert/featured/pantry-problems-do-brown-rice-lentils-store-well-years"
      },
      {
        "name": "USDA Farm Service Agency, Commodity Requirements RP4 Rice Products (procurement spec)",
        "url": "https://www.fsa.usda.gov/Internet/FSA_File/rp4_071106.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "cooked-rice",
    "name": "Cooked rice",
    "emoji": "🍚",
    "group": "pantry",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 1,
      "max": 2,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Cool it fast. Don't leave rice to cool in the rice cooker or pot: within 1 hour, spread it into shallow covered containers (no more than 3 inches deep) or small portions and put them straight into the fridge. US rules say never leave it out more than 2 hours, or 1 hour above 90°F.",
    "freeze": "Pack portions in flat freezer bags or containers and get them into the freezer within about an hour of cooking; Nebraska Extension suggests spreading the rice on a baking sheet or in shallow containers to cool for about 20 minutes first. Best within 2 months; reheat until steaming hot (165°F).",
    "why": "Rice can carry tiny sleeping germ 'seeds' (Bacillus cereus spores) that survive cooking; if warm rice sits out, they wake up, grow and make a poison that reheating can't destroy, so we cool rice quickly.",
    "spoiled": "A sour or off smell, slimy or wet-sticky texture, or mold. Also throw out any rice left at room temperature for more than 2 hours: the toxin can be there even if the rice looks and smells fine.",
    "sources": [
      {
        "name": "University of Maine Cooperative Extension, 2026 (citing the USDA FoodKeeper App)",
        "url": "https://extension.umaine.edu/food-health/2026/03/05/rice/"
      },
      {
        "name": "USDA FSIS: Shelf-Stable Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/shelf-stable-food"
      },
      {
        "name": "UK Food Standards Agency: Home food fact checker",
        "url": "https://www.food.gov.uk/safety-hygiene/home-food-fact-checker"
      },
      {
        "name": "UK Food Standards Agency: Student guide to food safety and hygiene",
        "url": "https://www.food.gov.uk/safety-hygiene/student-guide-to-food-safety-and-hygiene?navref=main"
      },
      {
        "name": "UC Cooperative Extension, Placer County: Food Safety Update",
        "url": "https://www.ccfruitandnuts.ucanr.edu/sites/default/files/2020-09/Food_Safety_Update86444.pdf"
      },
      {
        "name": "University of Nebraska-Lincoln Extension: Freezing Rice and Pasta",
        "url": "https://food.unl.edu/article/freezing-rice-and-pasta/"
      },
      {
        "name": "Iowa State University Extension (Spend Smart Eat Smart): Brown Rice",
        "url": "https://spendsmart.extension.iastate.edu/pantry-picks/brown-rice/"
      },
      {
        "name": "FoodSafety.gov: Game Day Food Safety Tips",
        "url": "https://www.foodsafety.gov/blog/game-day-food-safety-tips"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "NC State Extension (Brunswick County), Safety of Leftover Rice",
        "url": "https://brunswick.ces.ncsu.edu/news/safety-of-leftover-rice/"
      },
      {
        "name": "Iowa State University Extension, Spend Smart Eat Smart: Extra Rice?",
        "url": "https://spendsmart.extension.iastate.edu/spendsmart/2023/04/10/extra-rice/"
      }
    ],
    "checked": "two",
    "caution": "Cool rice fast: spread it in a shallow container and get it in the fridge within an hour if you can, 2 hours at most. Rice can carry Bacillus cereus spores that survive cooking and make a toxin that reheating won't destroy."
  },
  {
    "key": "dry-noodles",
    "name": "Dry pasta & noodles",
    "emoji": "🍝",
    "group": "pantry",
    "fridge": null,
    "freezer": null,
    "pantry": {
      "min": 1,
      "max": 2,
      "unit": "years"
    },
    "variants": [
      {
        "label": "instant ramen (fried noodles with seasoning packets)",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 6,
          "max": 12,
          "unit": "months"
        }
      }
    ],
    "best": "pantry",
    "how": "Keep in the original package or, once opened, a tightly resealed bag or airtight container in a cool, dry cupboard away from the stove, sink and sunlight.",
    "freeze": "No need to freeze dry noodles; heat and humidity hurt them more than time does.",
    "why": "Dry noodles have almost no water left in them, and germs and mold need water to grow, so they last a long time if kept dry; instant ramen is fried in oil, and oil slowly goes stale.",
    "spoiled": "Bugs or webbing, a musty or sour smell, mold or damp spots. For instant ramen, a rancid (old crayon or paint-like) smell from the noodles or seasoning oil.",
    "sources": [
      {
        "name": "USDA FSIS: Shelf-Stable Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/shelf-stable-food"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Food Storage: Pantry",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-pantry/"
      },
      {
        "name": "University of Nebraska-Lincoln Extension: Home Food Storage",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Nongshim (manufacturer), global site: ramyun explainer",
        "url": "https://eng.nongshim.com/pr/pedia/detail"
      },
      {
        "name": "Nongshim USA (manufacturer), World of Shin: Shin Ramyun Noodle Soup",
        "url": "https://www.worldofshin.com/shin-ramyun-products/shin-ramyun-noodle-soup/"
      },
      {
        "name": "Nongshim USA (manufacturer), World of Shin: FAQ",
        "url": "https://www.worldofshin.com/support/faq/"
      },
      {
        "name": "Ohio State University Extension, Pantry Food Storage (HYG-5401)",
        "url": "https://ohioline.osu.edu/factsheet/HYG-5401"
      },
      {
        "name": "University of Georgia Extension, Food Storage for Safety and Quality (FDNS-E-119)",
        "url": "https://www.fcs.uga.edu/docs/FDNS-E-119.pdf"
      },
      {
        "name": "USDA blog, Before You Toss Food, Wait. Check It Out!",
        "url": "https://www.usda.gov/about-usda/news/blog/you-toss-food-wait-check-it-out"
      }
    ],
    "checked": "two"
  },
  {
    "key": "cooked-noodles",
    "name": "Cooked pasta & noodles",
    "emoji": "🍜",
    "group": "pantry",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 1,
      "max": 2,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate within 2 hours in a shallow, covered container; tossing plain noodles with a little oil stops them sticking together.",
    "freeze": "Freeze pasta that was cooked al dente, tossed with a little oil and cooled, in portion-size freezer bags (Nebraska Extension). Thin, soft noodles such as somyeon, ramen and dangmyeon may turn mushy after thawing.",
    "why": "Cooked noodles are soft, wet and starchy, which is a perfect home for germs, so they need the cold fridge to slow the germs down.",
    "spoiled": "A slimy or sticky film, a sour or off smell, mold or discoloration. Throw out noodles left at room temperature for more than 2 hours.",
    "sources": [
      {
        "name": "USDA FSIS: Shelf-Stable Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/shelf-stable-food"
      },
      {
        "name": "University of Nebraska-Lincoln Extension: Freezing Rice and Pasta",
        "url": "https://food.unl.edu/article/freezing-rice-and-pasta/"
      },
      {
        "name": "FoodSafety.gov: Food Safety During Power Outage",
        "url": "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"
      },
      {
        "name": "StillTasty and other consumer guides (secondary; search summary)",
        "url": "https://www.stilltasty.com/fooditems/index/17887"
      },
      {
        "name": "University of Maine Cooperative Extension (leftover rice article)",
        "url": "https://extension.umaine.edu/food-health/2026/03/05/rice/"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      }
    ],
    "checked": "two"
  },
  {
    "key": "fresh-noodles",
    "name": "Fresh noodles (udon)",
    "emoji": "🍜",
    "group": "pantry",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 1,
      "max": 2,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "homemade fresh noodles (kalguksu, homemade egg pasta)",
        "fridge": {
          "min": 1,
          "max": 2,
          "unit": "days"
        },
        "freezer": {
          "min": 1,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep unopened store-bought packs in the fridge and use them by the date on the package. After opening, rewrap tightly or put them in an airtight container and use within 2-3 days. Dust homemade noodles with flour so they don't stick.",
    "freeze": "Freeze in portion-size freezer bags with the air squeezed out; thaw in the fridge before use or follow the package directions. Best within 1-2 months.",
    "why": "Fresh noodles still hold lots of water, so germs and mold can grow on them much faster than on dry noodles.",
    "spoiled": "A sour smell, slimy feel, mold spots, or dark gray discoloration. A slight greenish-gray tint on fresh egg pasta after a day can be harmless oxidation, but throw it out if it's slimy or smells off.",
    "sources": [
      {
        "name": "Pantry Professor (consumer guide citing USDA FoodKeeper; secondary, attribution per search summary)",
        "url": "https://pantryprofessor.com/food-storage/fresh-pasta/"
      },
      {
        "name": "ok2eat and LineupCook (consumer guides; secondary, search summary)",
        "url": "https://ok2eat.com/shelf-life/udon-noodles"
      },
      {
        "name": "LineupCook: Udon noodles (consumer guide; secondary)",
        "url": "https://www.lineupcook.com/ingredients/udon-noodles"
      },
      {
        "name": "The Food Keeper brochure (Food Marketing Institute, with Cornell; hosted by Food Bank of Central New York)",
        "url": "https://foodbankcny.org/wp-content/uploads/2025/08/Food-Keeper-Brochure.pdf"
      },
      {
        "name": "Iowa State University Extension AnswerLine, Homemade Egg Noodles Made Safe",
        "url": "https://blogs.extension.iastate.edu/answerline/2019/03/14/making-homemade-noodles-safely/"
      },
      {
        "name": "FoodSafety.gov, Food Safety During Power Outage",
        "url": "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"
      }
    ],
    "checked": "two"
  },
  {
    "key": "tteok",
    "name": "Rice cakes (tteok)",
    "emoji": "🍡",
    "group": "pantry",
    "fridge": null,
    "freezer": {
      "min": 1,
      "max": 1,
      "unit": "months"
    },
    "pantry": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "variants": [
      {
        "label": "refrigerated packaged tteok (tteokbokki or tteokguk slices), opened",
        "fridge": {
          "min": 3,
          "max": 5,
          "unit": "days"
        },
        "freezer": {
          "min": 1,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "freezer",
    "how": "Eat fresh rice cakes within a day or so, kept at room temperature and tightly wrapped so they don't dry out. For anything longer, freeze them: Korea's food safety ministry and Maangchi both say freezer, not fridge, because the fridge makes tteok hard. Opened refrigerated packs go back in the fridge in a sealed bag.",
    "freeze": "Slice or portion first, wrap in plastic and seal flat in zip bags with the air pressed out; eat within about 2 months. Thaw overnight in the fridge (Maangchi) or soak briefly in cold water (as on Bibigo frozen tteokbokki packs) before cooking.",
    "why": "The rice starch in tteok slowly squeezes together and pushes out water when it's chilly, and it happens fastest at fridge temperature, so tteok turns hard in the fridge; freezing stops that, so it softens again when cooked.",
    "spoiled": "Mold spots (pink, green, black or white fuzz), a sour or fermented smell, or a slimy or sticky surface. Hard tteok isn't spoiled; it softens again when cooked or steamed.",
    "sources": [
      {
        "name": "Herald Business (Korean news) citing Korea's Ministry of Food and Drug Safety (MFDS)",
        "url": "https://biz.heraldcorp.com/article/3379879"
      },
      {
        "name": "Nate News (Korean news) citing MFDS",
        "url": "https://m.news.nate.com/view/20260101n08508"
      },
      {
        "name": "The Asia Business Daily (Korean news) citing MFDS",
        "url": "https://view.asiae.co.kr/en/article/2023012116585351199"
      },
      {
        "name": "Maangchi (Korean cooking reference): Garaetteok recipe comments",
        "url": "https://www.maangchi.com/recipe/garaetteok/comment-page-2"
      },
      {
        "name": "Maangchi (Korean cooking reference): Sliced rice cake",
        "url": "https://www.maangchi.com/ingredient/sliced-rice-cake"
      },
      {
        "name": "KOL Daily: Tteok",
        "url": "https://koldaily.com/en/ingredients/tteok/"
      },
      {
        "name": "My Korean Kitchen (Korean cooking reference): Garaetteok",
        "url": "https://mykoreankitchen.com/garaetteok-rice-cake-recipe/"
      },
      {
        "name": "Maangchi (Korean cooking reference), Tube-shaped rice cake (Garaetteok) ingredient page",
        "url": "https://www.maangchi.com/ingredient/garaetteok-rice-cake/comment-page-1"
      },
      {
        "name": "My Korean Kitchen (Korean cooking reference), Butter Tteok",
        "url": "https://mykoreankitchen.com/butter-tteok/"
      },
      {
        "name": "Maangchi (Korean cooking reference), White steamed rice cake (Baekseolgi-tteok)",
        "url": "https://www.maangchi.com/recipe/baekseolgi-tteok"
      }
    ],
    "checked": "two"
  },
  {
    "key": "bread",
    "name": "Bread",
    "emoji": "🍞",
    "group": "pantry",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "weeks"
    },
    "freezer": {
      "min": 2,
      "max": 3,
      "unit": "months"
    },
    "pantry": {
      "min": 3,
      "max": 7,
      "unit": "days"
    },
    "variants": [
      {
        "label": "homemade bread (no preservatives)",
        "fridge": {
          "min": 2,
          "max": 3,
          "unit": "weeks"
        },
        "freezer": {
          "min": 2,
          "max": 3,
          "unit": "months"
        },
        "pantry": {
          "min": 3,
          "max": 5,
          "unit": "days"
        }
      }
    ],
    "best": "pantry",
    "how": "Keep bread in its bag, tightly closed, or in a bread box at room temperature away from the stove and sunlight. Freeze what you won't eat within a few days instead of refrigerating it, because the fridge makes bread go stale faster.",
    "freeze": "Wrap tightly in moisture- and vapor-proof freezer wrap or a freezer bag; slice it first so you can take out only what you need and toast it straight from frozen.",
    "why": "Bread is a bit moist and full of food that mold loves; the fridge slows mold down, but the cold makes the starch harden, so the bread goes stale.",
    "spoiled": "Any mold (fuzzy spots of green, white, black or pink): throw the whole loaf away, because mold roots spread through soft bread. A sour or off smell is another sign. Stale, dry bread is still safe.",
    "sources": [
      {
        "name": "Clemson Cooperative Extension HGIC: Food Storage: Pantry",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-pantry/"
      },
      {
        "name": "Oregon State University Extension: Storing Food for Safety and Quality (PNW 612)",
        "url": "https://extension.oregonstate.edu/sites/extd8/files/2023-08/pnw612.pdf"
      },
      {
        "name": "USDA FSIS: Molds on Food: Are They Dangerous?",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/molds-food-are-they-dangerous"
      },
      {
        "name": "Clemson Cooperative Extension HGIC, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "University of Nebraska-Lincoln Extension, Home Food Storage",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Colorado State University Extension, Food Storage for Safety and Quality (9.310)",
        "url": "https://extension.colostate.edu/topic-areas/nutrition-food-safety-health/food-storage-for-safety-and-quality-9-310/"
      },
      {
        "name": "University of Georgia Extension, Food Storage for Safety and Quality (FDNS-E-119)",
        "url": "https://www.fcs.uga.edu/docs/FDNS-E-119.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "tortillas",
    "name": "Tortillas",
    "emoji": "🫓",
    "group": "pantry",
    "fridge": {
      "min": 1,
      "max": 4,
      "unit": "weeks"
    },
    "freezer": {
      "min": 2,
      "max": 2,
      "unit": "months"
    },
    "pantry": {
      "min": 2,
      "max": 4,
      "unit": "days"
    },
    "variants": [
      {
        "label": "homemade tortillas",
        "fridge": {
          "min": 4,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 3,
          "max": 4,
          "unit": "months"
        },
        "pantry": {
          "min": 2,
          "max": 3,
          "unit": "days"
        }
      }
    ],
    "best": "fridge",
    "how": "Keep unopened store-bought packs in a cool cupboard until the date on the bag. After opening, squeeze out the air, seal the bag tightly and refrigerate.",
    "freeze": "Wrap tightly (the original bag inside a freezer bag) to prevent freezer burn; for best quality use within about 2 months, and thaw in the fridge for 1-2 days before warming (Iowa State).",
    "why": "Tortillas are soft and a little moist, so mold can grow on them; cold slows mold down, and store-bought ones contain mold-fighting preservatives, so they last longer than homemade.",
    "spoiled": "Mold spots (fuzzy green, white, black or pink) mean the whole pack goes in the trash; so do a sour or off smell or a slimy feel. Hard, dry tortillas are only stale.",
    "sources": [
      {
        "name": "Oregon State University Extension: Storing Food for Safety and Quality (PNW 612)",
        "url": "https://extension.oregonstate.edu/sites/extd8/files/2023-08/pnw612.pdf"
      },
      {
        "name": "University of Nebraska-Lincoln Extension: Home Food Storage",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Iowa State University Extension (Spend Smart Eat Smart): Whole Wheat Tortillas",
        "url": "https://spendsmart.extension.iastate.edu/pantry-picks/whole-wheat-tortillas/"
      },
      {
        "name": "University of Maine Cooperative Extension: 100% Whole Grain Tortilla recipe",
        "url": "https://extension.umaine.edu/food-health/recipes/100-whole-grain-tortilla/"
      },
      {
        "name": "Will It Expire? (consumer guide; secondary)",
        "url": "https://willitexpire.org/foods/tortillas-flour-opened/"
      },
      {
        "name": "New Mexico State University Extension, E-118: Storing Food Safely",
        "url": "https://pubs.nmsu.edu/_e/E118/"
      },
      {
        "name": "USDA Agricultural Research Service, A Tortilla's Freshness Is Wrapped Up in Its Wheat",
        "url": "https://www.ars.usda.gov/news-events/news/research-news/2004/a-tortillas-freshness-is-wrapped-up-in-its-wheat/"
      },
      {
        "name": "Food Bank of Central New York, Shelf Life of Common Food Bank Products",
        "url": "https://foodbankcny.org/wp-content/uploads/2025/08/Shelf-Life-of-Common-FB-Products.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "flour",
    "name": "Flour",
    "emoji": "🌾",
    "group": "pantry",
    "fridge": {
      "min": 1,
      "max": 1,
      "unit": "years"
    },
    "freezer": {
      "min": 2,
      "max": 2,
      "unit": "years"
    },
    "pantry": {
      "min": 6,
      "max": 8,
      "unit": "months"
    },
    "variants": [],
    "best": "pantry",
    "how": "Move flour from its paper bag into an airtight container and keep it in a cool, dry cupboard. In hot, humid weather, buy smaller amounts or keep it in the fridge.",
    "freeze": "Freezes very well in an airtight, moisture-proof container: Missouri Extension says it keeps well for several years at 0°F, and Penn State says indefinitely. Let cold flour warm to room temperature before baking so it doesn't slow the baking powder or yeast.",
    "why": "Flour is so dry that germs can't grow in it, but warm, damp air makes it clump and lets bugs hatch; raw flour can also carry germs like E. coli that only cooking kills, so never eat raw dough.",
    "spoiled": "A sour, musty or rancid smell, damp clumps, mold, or bugs or webbing (pantry moths, weevils).",
    "sources": [
      {
        "name": "University of Missouri Extension: Using and Storing All-Purpose Flour (GH1116)",
        "url": "https://extension.missouri.edu/publications/gh1116"
      },
      {
        "name": "Penn State Extension: Storing Staple Ingredients in the Kitchen",
        "url": "https://extension.psu.edu/storing-staple-ingredients-in-the-kitchen"
      },
      {
        "name": "FDA: Raw/undercooked wheat flour consumption associated with multiple outbreaks",
        "url": "https://fda.gov/media/172844/download?attachment="
      },
      {
        "name": "Clemson Cooperative Extension HGIC, Selecting & Storing Cereals & Grains",
        "url": "https://hgic.clemson.edu/factsheet/selecting-storing-cereals-grains/"
      },
      {
        "name": "University of Nebraska-Lincoln Extension, Home Food Storage",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "UGA Cooperative Extension (Field Report), Check your cooking staples",
        "url": "https://fieldreport.caes.uga.edu/news/check-your-cooking-staples-2/"
      }
    ],
    "checked": "two",
    "caution": "Don't eat raw dough or batter, even a lick: raw flour can carry E. coli, which only cooking kills (FDA)."
  },
  {
    "key": "kimchi",
    "name": "Kimchi",
    "emoji": "🥬",
    "group": "pantry",
    "fridge": {
      "min": 1,
      "max": 6,
      "unit": "months"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep kimchi in a tightly closed container in the coldest part of the fridge (at or below 39-40°F), pressed down under its brine. Lay plastic wrap right on the surface to keep air out, and always use clean utensils.",
    "freeze": "The sources found don't recommend freezing; it turns the cabbage soft and watery. When kimchi gets too sour, cook it into kimchi-jjigae or kimchi fried rice instead.",
    "why": "Kimchi is full of friendly bacteria that keep eating sugars and making sour acid even in the fridge; the acid helps keep bad germs out, but over the months the kimchi gets more sour and softer.",
    "spoiled": "Past its best but safe: very sour or vinegary taste, softer cabbage (great for stew). Unsafe, throw it out: fuzzy mold (blue, green, black or white threads), a soft and slimy texture, or a rotten smell. A flat white film (golmaji) is a yeast that Korea's World Institute of Kimchi found is not toxic, and Korean guidance says to skim it off, rinse and cook the kimchi. US extension advice is to discard kimchi with surface mold, so if you're unsure, throw it out.",
    "sources": [
      {
        "name": "Oregon State University Extension (Ask Extension): Is my kimchi safe to eat?",
        "url": "https://extension.oregonstate.edu/ask-extension/featured/my-kimchi-safe-eat"
      },
      {
        "name": "Oregon State University Extension: Kimchi Basics (SP 50-1007)",
        "url": "https://extension.oregonstate.edu/catalog/sp50-1007-kimchi-basics"
      },
      {
        "name": "Clemson Cooperative Extension HGIC: Kimchi Basics and How to Make Homemade Kimchi",
        "url": "https://hgic.clemson.edu/kimchi-basics-and-how-to-make-homemade-kimchi/"
      },
      {
        "name": "Colorado State University Extension: Understanding and Making Kimchi",
        "url": "https://extension.colostate.edu/resource/understanding-and-making-kimchi/"
      },
      {
        "name": "Foodnews (Korean food-industry news) reporting World Institute of Kimchi (WIKIM) research",
        "url": "https://www.foodnews.co.kr/news/articleView.html?idxno=68394"
      },
      {
        "name": "Realfoods (Korean news) on white film vs mold in kimchi",
        "url": "https://www.realfoods.co.kr/article/10632385"
      },
      {
        "name": "Consumer storage guides, e.g. Yahoo Lifestyle (secondary; search summary of several sites)",
        "url": "https://www.yahoo.com/lifestyle/long-does-kimchi-last-opening-141509574.html"
      },
      {
        "name": "USDA NIFA, Safely Fermenting Food at Home",
        "url": "https://www.nifa.usda.gov/sites/default/files/resource/Safely%20Fermenting%20Food%20at%20Home%20508.pdf"
      },
      {
        "name": "World Institute of Kimchi (Korean government research institute), FAQ on preventing kimchi softening",
        "url": "https://www.wikim.re.kr/board.es?act=view&bid=0018&list_no=1766&mid=a40702000000"
      }
    ],
    "checked": "two"
  },
  {
    "key": "gochujang",
    "name": "Gochujang",
    "emoji": "🌶️",
    "group": "pantry",
    "fridge": {
      "min": 3,
      "max": 3,
      "unit": "months"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "After opening, keep the tub tightly closed in the fridge, press the inner film or plastic wrap back onto the surface, and always scoop with a clean, dry spoon.",
    "freeze": "Not needed: it keeps for months in the fridge.",
    "why": "Gochujang is a fermented paste with lots of salt and sugar and very little free water, which makes it hard for germs to grow, but air and time slowly darken it and change its flavor.",
    "spoiled": "Fuzzy mold or colored spots, or a sour or off smell: throw it out. Darkening over time is normal aging, not spoilage.",
    "sources": [
      {
        "name": "Consumer storage guides (secondary; search summary of TasteKoreanFood, ShelfLifeGuide, ForkLiftKitchen and others)",
        "url": "https://www.tastekoreanfood.com/ktrend/keeping-gochujang-fresh-storage"
      },
      {
        "name": "On Better Living: Does Gochujang Go Bad? (consumer guide; secondary)",
        "url": "https://onbetterliving.com/does-gochujang-go-bad/"
      },
      {
        "name": "Maangchi (Korean cooking reference), Hot pepper paste (Gochujang)",
        "url": "https://www.maangchi.com/ingredient/hot-pepper-paste-gochujang/comment-page-2"
      },
      {
        "name": "Korean Bapsang (Korean cooking reference), Korean Pantry Staples: Seasoning Ingredients",
        "url": "https://www.koreanbapsang.com/korean-pantry-seasoning-ingredients/"
      },
      {
        "name": "CJ CheilJedang (Haechandle maker) FAQ: must gochujang and doenjang be refrigerated after opening?",
        "url": "https://www.cj.co.kr/kr/support/faq/456"
      },
      {
        "name": "Chung Jung One / Daesang (manufacturer), Sunchang Taeyangcho Chal Gochujang product page",
        "url": "https://www.chungjungone.com/%EC%B2%AD%EC%A0%95%EC%9B%90-%EC%88%9C%EC%B0%BD-%ED%83%9C%EC%96%91%EC%B4%88-%EC%B0%B0%EA%B3%A0%EC%B6%94%EC%9E%A5/"
      }
    ],
    "checked": "two"
  },
  {
    "key": "doenjang",
    "name": "Doenjang",
    "emoji": "🫘",
    "group": "pantry",
    "fridge": {
      "min": 3,
      "max": 3,
      "unit": "months"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "After opening, keep the container tightly closed in the fridge, smooth the surface flat and press the inner film or plastic wrap onto it, and use a clean, dry spoon.",
    "freeze": "Not needed; keep it in the fridge.",
    "why": "Doenjang is soybeans fermented with lots of salt; the salt keeps most germs away, but the paste keeps slowly fermenting and darkening, and the cold fridge slows that down.",
    "spoiled": "Fuzzy or colored mold (green, black, pink) or a rotten, off smell: throw it out. A thin white film may just be fermentation yeast (one Korean retailer says skim it off), but sources disagree, so when in doubt, throw it out. Darkening with age is common for fermented soybean pastes and isn't spoilage by itself.",
    "sources": [
      {
        "name": "Kim'C Market blog (Korean food retailer; secondary)",
        "url": "https://kimcmarket.com/blogs/korean-food-blog/the-jar-that-breathes-why-traditional-doenjang-never-really-stops-fermenting"
      },
      {
        "name": "FreshSnap storage calculator (app website; secondary)",
        "url": "https://selalink.net/en/apps/freshsnap/doenjang/"
      },
      {
        "name": "Maangchi (Korean cooking reference), Fermented soybean paste (Doenjang)",
        "url": "https://www.maangchi.com/ingredient/soybean-paste"
      },
      {
        "name": "Korean Bapsang (Korean cooking reference), Korean Pantry Staples: Seasoning Ingredients",
        "url": "https://www.koreanbapsang.com/korean-pantry-seasoning-ingredients/"
      },
      {
        "name": "Sempio (manufacturer) customer FAQ",
        "url": "https://www.sempio.com/customer-center/faq/product/4"
      },
      {
        "name": "CJ CheilJedang (Haechandle maker) FAQ: must gochujang and doenjang be refrigerated after opening?",
        "url": "https://www.cj.co.kr/kr/support/faq/456"
      },
      {
        "name": "Chung Jung One / Daesang (manufacturer), Sunchang traditional aged doenjang product page",
        "url": "https://www.chungjungone.com/%EC%B2%AD%EC%A0%95%EC%9B%90-%EC%88%9C%EC%B0%BD-%EC%9E%AC%EB%9E%98%EC%8B%9D-%EC%88%99%EC%84%B1%EB%90%9C%EC%9E%A5/"
      }
    ],
    "checked": "two"
  },
  {
    "key": "soy-sauce",
    "name": "Soy sauce",
    "emoji": "🍶",
    "group": "pantry",
    "fridge": {
      "min": 1,
      "max": 1,
      "unit": "months"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "unopened bottle",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 2,
          "max": 2,
          "unit": "years"
        }
      }
    ],
    "best": "fridge",
    "how": "Keep unopened bottles in a cool, dark cupboard. Once opened, close the cap tightly and keep it in the fridge for the best flavor, and never add water or other ingredients back into the bottle.",
    "freeze": "No need to freeze it; soy sauce is too salty to spoil easily.",
    "why": "Soy sauce is so salty that germs can't grow in it, but after opening, air slowly changes its color and flavor, and cold slows that down.",
    "spoiled": "An unusual smell or taste, or mold. Getting darker over time is a quality change, not spoilage.",
    "sources": [
      {
        "name": "Kikkoman USA (manufacturer), Product FAQs",
        "url": "https://kikkomanusa.com/homecooks/faqs-page/"
      },
      {
        "name": "Food Bank of Central New York, Shelf Life of Common Food Bank Products",
        "url": "https://foodbankcny.org/wp-content/uploads/2025/08/Shelf-Life-of-Common-FB-Products.pdf"
      }
    ],
    "checked": "one"
  },
  {
    "key": "gochugaru",
    "name": "Gochugaru & spices",
    "emoji": "🌶️",
    "group": "pantry",
    "fridge": null,
    "freezer": {
      "min": 6,
      "max": 6,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "other ground spices (chili powder, paprika, etc.)",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 2,
          "max": 3,
          "unit": "years"
        }
      }
    ],
    "best": "freezer",
    "how": "After opening, seal gochugaru in a zip bag with the air pressed out and keep it in the freezer, with a small jar in the fridge for everyday cooking. Keep other ground spices tightly capped in a cool, dark cupboard away from the stove.",
    "freeze": "Freeze gochugaru in a well-sealed zip bag or airtight container; it doesn't clump, so you can scoop it straight from the freezer.",
    "why": "Chili flakes lose their bright red color and spicy flavor when air, light and warmth get to them, and if they get damp they can mold; the cold, dry freezer keeps them fresh.",
    "spoiled": "Mold, clumping from moisture, an off or musty smell, or color fading to orange or yellowish (it has lost its quality). Old ground spices are usually safe but taste weak.",
    "sources": [
      {
        "name": "Maangchi (Korean cooking reference), Hot pepper flakes (Gochugaru)",
        "url": "https://www.maangchi.com/ingredient/gochugaru"
      },
      {
        "name": "My Korean Kitchen (Korean cooking reference), Gochugaru",
        "url": "https://mykoreankitchen.com/gochugaru-korean-chili-powder/"
      },
      {
        "name": "Korean Bapsang (Korean cooking reference), Korean Pantry Staples: Seasoning Ingredients",
        "url": "https://www.koreanbapsang.com/korean-pantry-seasoning-ingredients/"
      },
      {
        "name": "The Food Keeper brochure (Food Marketing Institute with Cornell; hosted by Food Bank of Central New York)",
        "url": "https://foodbankcny.org/wp-content/uploads/2025/08/Food-Keeper-Brochure.pdf"
      },
      {
        "name": "UGA Cooperative Extension (Field Report), Check your cooking staples",
        "url": "https://fieldreport.caes.uga.edu/news/check-your-cooking-staples-2/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "sesame-seeds",
    "name": "Sesame seeds",
    "emoji": "⚪",
    "group": "pantry",
    "fridge": {
      "min": 1,
      "max": 1,
      "unit": "years"
    },
    "freezer": {
      "min": 1,
      "max": 1,
      "unit": "years"
    },
    "pantry": {
      "min": 6,
      "max": 12,
      "unit": "months"
    },
    "variants": [
      {
        "label": "roasted (toasted) seeds",
        "fridge": {
          "min": 1,
          "max": 3,
          "unit": "years"
        },
        "freezer": {
          "min": 1,
          "max": 3,
          "unit": "years"
        },
        "pantry": {
          "min": 1,
          "max": 3,
          "unit": "years"
        }
      }
    ],
    "best": "pantry",
    "how": "Keep them in a tightly closed jar in a cool, dark cupboard, or in the fridge or freezer to keep them longer. Buy or pack about a month's worth at a time.",
    "freeze": "Freeze them in a sealed bag or jar; use them straight from the freezer.",
    "why": "Sesame seeds are full of oil, and oil slowly goes stale (rancid) when it meets air, light and warmth.",
    "spoiled": "A bitter, paint-like or stale smell or taste means the oil has gone rancid.",
    "sources": [
      {
        "name": "Oregon State University Extension (Ask Extension)",
        "url": "https://ask.extension.org/kb/faq.php?id=289037"
      }
    ],
    "checked": "one"
  },
  {
    "key": "fish-sauce",
    "name": "Fish & oyster sauce",
    "emoji": "🫙",
    "group": "pantry",
    "fridge": null,
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "oyster sauce, opened",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "months"
        },
        "freezer": null,
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "After opening, close the cap tightly and keep fish sauce and oyster sauce in the fridge. Wipe the bottle neck so sauce doesn't dry and crust around the cap.",
    "freeze": "Don't freeze oyster sauce; Lee Kum Kee says freezing changes its thickness. Fish sauce doesn't need freezing.",
    "why": "These sauces are very salty, which keeps most germs out, but after opening, air slowly changes their flavor, and oyster sauce is thick and sweet enough that mold could grow if it's left warm.",
    "spoiled": "Mold on the sauce or around the cap, a sour or rotten smell (beyond the normal strong fishy smell), or bubbling. Salt crystals at the bottom of cold fish sauce are harmless.",
    "sources": [
      {
        "name": "Lee Kum Kee USA (manufacturer), FAQ",
        "url": "https://usa.lkk.com/faq"
      },
      {
        "name": "Kikkoman Food Services (manufacturer), Oyster Flavored Sauce - Green Label",
        "url": "https://kikkomanusa.com/foodservice/products/oyster-flavored-sauce-green-label/"
      },
      {
        "name": "FoodSafety.gov, Food Safety During Power Outage",
        "url": "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"
      }
    ],
    "checked": "one"
  },
  {
    "key": "vinegar",
    "name": "Vinegar",
    "emoji": "🫙",
    "group": "pantry",
    "fridge": null,
    "freezer": null,
    "pantry": {
      "min": 12,
      "max": 12,
      "unit": "months"
    },
    "variants": [
      {
        "label": "unopened bottle",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 2,
          "max": 2,
          "unit": "years"
        }
      }
    ],
    "best": "pantry",
    "how": "Keep vinegar tightly capped in a cool, dark cupboard; it doesn't need the fridge.",
    "freeze": "No need to freeze vinegar.",
    "why": "Vinegar is so sour (acidic) that germs can't live in it, so it keeps at room temperature; over a long time it can just get cloudy or change flavor a little.",
    "spoiled": "Vinegar rarely spoils. Cloudiness or a jelly-like blob (a harmless 'mother') can form in older bottles; throw it out only if it smells or tastes off.",
    "sources": [
      {
        "name": "The Food Keeper brochure (Food Marketing Institute with Cornell; hosted by Food Bank of Central New York)",
        "url": "https://foodbankcny.org/wp-content/uploads/2025/08/Food-Keeper-Brochure.pdf"
      }
    ],
    "checked": "one"
  },
  {
    "key": "gim",
    "name": "Roasted seaweed (gim)",
    "emoji": "🍙",
    "group": "pantry",
    "fridge": null,
    "freezer": {
      "min": 6,
      "max": 6,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "roasted/seasoned gim, homemade or opened snack packs",
        "fridge": null,
        "freezer": {
          "min": 1,
          "max": 1,
          "unit": "months"
        },
        "pantry": {
          "min": 3,
          "max": 4,
          "unit": "days"
        }
      }
    ],
    "best": "freezer",
    "how": "Keep unopened packs in a cool, dry cupboard by the package date. After opening, seal the sheets tightly in a zip bag with the air pressed out (or in an airtight container) so they stay crisp, and freeze what you won't use within a few days.",
    "freeze": "Divide sheets into small portions in zip bags, put those inside a bigger freezer bag and freeze; take out only what you need. It crisps up again at room temperature, or after a quick toast in a dry pan.",
    "why": "Gim is paper-thin and dry, so it soaks up moisture from the air and turns chewy and stale, and seasoned gim's oil can go stale too; sealing it and freezing it keeps it dry and crisp.",
    "spoiled": "A stale, fishy or rancid oily smell, soft or chewy sheets that won't crisp up again, or any mold or damp spots.",
    "sources": [
      {
        "name": "Maangchi (Korean cooking reference), Seaweed paper (gim)",
        "url": "https://www.maangchi.com/ingredient/gim"
      },
      {
        "name": "Maangchi (Korean cooking reference), Roasted seaweed sheets (Gim-gui)",
        "url": "https://www.maangchi.com/recipe/gim-gui"
      },
      {
        "name": "My Korean Kitchen (Korean cooking reference), Easy Roasted Seaweed",
        "url": "https://mykoreankitchen.com/roasted-seaweed-recipe/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "dried-anchovies",
    "name": "Dried anchovies (myeolchi)",
    "emoji": "🐟",
    "group": "pantry",
    "fridge": null,
    "freezer": {
      "min": 1,
      "max": 1,
      "unit": "years"
    },
    "pantry": null,
    "variants": [],
    "best": "freezer",
    "how": "Keep dried anchovies in an airtight bag or container in the freezer; take out only what you need and reseal right away.",
    "freeze": "Freeze in a well-sealed zip bag or airtight container; they don't stick together, so you can grab a handful straight from the freezer for broth or stir-fry.",
    "why": "Dried anchovies are small oily fish, and their oil goes stale and they can grow mold if left warm and humid; the freezer keeps them dry and slows the oil from going rancid.",
    "spoiled": "Mold, a sour or rancid smell (stronger and nastier than the normal fishy smell), a damp or sticky feel, or a yellow-brown oily color.",
    "sources": [
      {
        "name": "Maangchi (Korean cooking reference), Dried anchovies (Mareun-myeolchi)",
        "url": "https://www.maangchi.com/ingredient/myeolchi"
      },
      {
        "name": "Beyond Kimchee (Korean cooking reference), Dried Anchovies (Myeolchi)",
        "url": "https://www.beyondkimchee.com/pantry/korean-dried-anchovies/"
      },
      {
        "name": "Korean Bapsang (Korean cooking reference), Anchovy Broth for Korean Cooking",
        "url": "https://www.koreanbapsang.com/how-to-make-anchovy-broth-for-korean/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "syrups",
    "name": "Honey & syrups",
    "emoji": "🍯",
    "group": "pantry",
    "fridge": null,
    "freezer": null,
    "pantry": {
      "min": 1,
      "max": 1,
      "unit": "years"
    },
    "variants": [
      {
        "label": "pure maple syrup, opened",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "years"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "pure maple syrup, unopened",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 2,
          "max": 2,
          "unit": "years"
        }
      },
      {
        "label": "corn syrup (and other syrups, unopened)",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 2,
          "max": 2,
          "unit": "years"
        }
      }
    ],
    "best": "pantry",
    "how": "Keep honey, corn syrup and rice syrup tightly closed in a cool cupboard (honey crystallizes faster in the fridge). Pure maple syrup goes in the fridge once opened, because it can grow mold.",
    "freeze": "Not needed. If honey crystallizes, set the open jar in a pan of hot water to melt it.",
    "why": "Syrups are so full of sugar that germs can't get the water they need to grow, but runnier syrups like maple have enough water that mold can grow after opening, so they need the fridge.",
    "spoiled": "Mold on the surface or under the lid, a sour, fermented or alcohol smell, or foaming. Cloudy or crystallized honey is normal and fine.",
    "sources": [
      {
        "name": "USDA FSIS, Mail Order Food Safety (storage chart)",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/mail-order-food-safety"
      },
      {
        "name": "Penn State Extension, Storing Staple Ingredients in the Kitchen",
        "url": "https://extension.psu.edu/storing-staple-ingredients-in-the-kitchen"
      },
      {
        "name": "FDA, Evaluation and Definition of Potentially Hazardous Foods",
        "url": "https://www.fda.gov/files/food/published/Evaluation-and-Definition-of-Potentially-Hazardous-Foods.pdf"
      },
      {
        "name": "Food Bank of Central New York, Shelf Life of Common Food Bank Products",
        "url": "https://foodbankcny.org/wp-content/uploads/2025/08/Shelf-Life-of-Common-FB-Products.pdf"
      }
    ],
    "checked": "one",
    "caution": "Never give honey to a baby under 1 year old (infant botulism)."
  },
  {
    "key": "peanut-butter",
    "name": "Peanut butter",
    "emoji": "🥜",
    "group": "pantry",
    "fridge": null,
    "freezer": null,
    "pantry": {
      "min": 2,
      "max": 3,
      "unit": "months"
    },
    "variants": [
      {
        "label": "unopened jar",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 6,
          "max": 9,
          "unit": "months"
        }
      }
    ],
    "best": "pantry",
    "how": "Keep it tightly closed in a cool cupboard; once opened it keeps 2-3 months there, and longer in the fridge. Natural (oil-on-top) peanut butter is usually labeled 'refrigerate after opening'; follow the label.",
    "freeze": "Not needed; no source gave a freezer time.",
    "why": "Peanut butter has very little water, so germs can't grow easily, but its peanut oil slowly goes stale (rancid) at room temperature, and the fridge slows that down.",
    "spoiled": "A sharp, bitter, paint-like or soapy smell or taste (rancid), mold, or a dark, dry, hard texture. A layer of oil on top is normal, especially in natural peanut butter.",
    "sources": [
      {
        "name": "Ohio State University Extension, Pantry Food Storage (HYG-5401)",
        "url": "https://ohioline.osu.edu/factsheet/HYG-5401"
      },
      {
        "name": "FoodSafety.gov, Food Safety During Power Outage",
        "url": "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"
      }
    ],
    "checked": "one"
  },
  {
    "key": "condiments",
    "name": "Mayo & ketchup",
    "emoji": "🍅",
    "group": "pantry",
    "fridge": {
      "min": 2,
      "max": 2,
      "unit": "months"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "ketchup, opened",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 1,
          "max": 1,
          "unit": "months"
        }
      }
    ],
    "best": "fridge",
    "how": "Refrigerate mayonnaise right after opening and use a clean spoon each time. Ketchup can stay in the cupboard for about a month after opening, but keep it in the fridge if it will take longer to finish.",
    "freeze": "Don't freeze mayonnaise; it separates and turns oily and grainy when thawed. Ketchup doesn't need freezing.",
    "why": "Mayonnaise is made from eggs and oil, and once it's open, germs from the air and spoons can get in, so the fridge keeps them from growing; ketchup is sour and sugary, which slows germs, but it still loses flavor and can mold at room temperature.",
    "spoiled": "Mayonnaise: a sour or off smell, yellowing or brown color, separation into oil and liquid, or mold. Ketchup: mold, darkening, a fermented or sour smell, or bubbling.",
    "sources": [
      {
        "name": "FoodSafety.gov, Cold Food Storage Chart",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "Ohio State University Extension, Refrigerator Storage (HYG-5403)",
        "url": "https://ohioline.osu.edu/factsheet/HYG-5403"
      },
      {
        "name": "Ohio State University Extension, Pantry Food Storage (HYG-5401)",
        "url": "https://ohioline.osu.edu/factsheet/HYG-5401"
      },
      {
        "name": "Food Bank of Central New York, Shelf Life of Common Food Bank Products",
        "url": "https://foodbankcny.org/wp-content/uploads/2025/08/Shelf-Life-of-Common-FB-Products.pdf"
      }
    ],
    "checked": "one"
  },
  {
    "key": "cooking-oil",
    "name": "Cooking oil",
    "emoji": "🫒",
    "group": "pantry",
    "fridge": null,
    "freezer": null,
    "pantry": {
      "min": 1,
      "max": 5,
      "unit": "months"
    },
    "variants": [
      {
        "label": "unopened",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 6,
          "max": 12,
          "unit": "months"
        }
      }
    ],
    "best": "pantry",
    "how": "Keep bottles tightly capped in a cool, dark cupboard away from the stove, and buy sizes you'll use within a few months.",
    "freeze": "Not needed. Olive oil turns cloudy and thick in the fridge, which is harmless and clears at room temperature.",
    "why": "Oil slowly reacts with oxygen in the air, and with light and heat, which makes it go rancid (stale and bitter).",
    "spoiled": "A rancid smell (old crayons, paint or stale nuts), a bitter or sour taste, or a sticky residue.",
    "sources": [
      {
        "name": "University of Nebraska-Lincoln Extension: Home Food Storage (as quoted in search results)",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "USDA FSIS: Food Product Dating",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-product-dating"
      },
      {
        "name": "Penn State Extension, Storing Staple Ingredients in the Kitchen",
        "url": "https://extension.psu.edu/storing-staple-ingredients-in-the-kitchen"
      },
      {
        "name": "The Food Keeper brochure (Food Marketing Institute with Cornell; hosted by Food Bank of Central New York)",
        "url": "https://foodbankcny.org/wp-content/uploads/2025/08/Food-Keeper-Brochure.pdf"
      },
      {
        "name": "Food Bank of Central New York, Shelf Life of Common Food Bank Products",
        "url": "https://foodbankcny.org/wp-content/uploads/2025/08/Shelf-Life-of-Common-FB-Products.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "nuts",
    "name": "Nuts",
    "emoji": "🌰",
    "group": "pantry",
    "fridge": {
      "min": 1,
      "max": 1,
      "unit": "years"
    },
    "freezer": {
      "min": 2,
      "max": 2,
      "unit": "years"
    },
    "pantry": {
      "min": 2,
      "max": 2,
      "unit": "weeks"
    },
    "variants": [
      {
        "label": "unopened bag (not vacuum-packed), room temperature",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 3,
          "max": 3,
          "unit": "months"
        }
      },
      {
        "label": "unopened vacuum-packed can or jar",
        "fridge": null,
        "freezer": null,
        "pantry": {
          "min": 1,
          "max": 1,
          "unit": "years"
        }
      },
      {
        "label": "in-shell nuts",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "years"
        },
        "freezer": {
          "min": 2,
          "max": 2,
          "unit": "years"
        },
        "pantry": {
          "min": 4,
          "max": 4,
          "unit": "months"
        }
      }
    ],
    "best": "fridge",
    "how": "Once a bag is opened, move shelled nuts into an airtight glass jar or sealed bag and keep them in the fridge (or the freezer for longer), away from strong smells like onion and garlic.",
    "freeze": "Freeze nuts in an airtight freezer bag or jar; they don't freeze solid, so you can use them straight from the freezer. Let them come to room temperature or toast them to bring back the flavor.",
    "why": "Nuts are full of oil, and that oil reacts with air and warmth and turns rancid (stale and bitter); cold slows that way down.",
    "spoiled": "A bitter, sharp, paint-like smell or taste (rancid), a shriveled or oily-looking surface, mold, or bugs. Throw out moldy nuts.",
    "sources": [
      {
        "name": "UC Davis / UC Agriculture and Natural Resources, nut storage table",
        "url": "https://ucfoodsafety.ucdavis.edu/sites/g/files/dgvnsk7366/files/inline-files/44384.pdf"
      },
      {
        "name": "UC Davis Postharvest Center, How do I store nuts so they don't go rancid?",
        "url": "https://postharvest.ucdavis.edu/ask-produce-docs/how-do-i-store-nuts-so-they-dont-go-rancid"
      },
      {
        "name": "UC ANR, Harvesting and Storing Your Home Orchard's Nut Crop",
        "url": "https://ucanr.edu/sites/default/files/2020-09/335707.pdf"
      },
      {
        "name": "Ohio State University Extension, Pantry Food Storage (HYG-5401)",
        "url": "https://ohioline.osu.edu/factsheet/HYG-5401"
      }
    ],
    "checked": "one"
  },
  {
    "key": "canned-goods",
    "name": "Canned food",
    "emoji": "🥫",
    "group": "pantry",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": null,
    "pantry": {
      "min": 2,
      "max": 5,
      "unit": "years"
    },
    "variants": [
      {
        "label": "high-acid (tomatoes, fruit, juices, pickles, sauerkraut)",
        "fridge": {
          "min": 5,
          "max": 7,
          "unit": "days"
        },
        "freezer": null,
        "pantry": {
          "min": 12,
          "max": 18,
          "unit": "months"
        }
      }
    ],
    "best": "pantry",
    "how": "Keep unopened cans in a cool, dry cupboard (not above the stove or in a damp basement) and use older cans first. After opening, move leftovers into a covered glass or plastic container and refrigerate: 3-4 days for low-acid foods like beans, corn and soups, 5-7 days for tomatoes and fruit.",
    "freeze": "Don't freeze unopened cans. Leftovers from an opened can can be moved to a freezer container and frozen if you can't use them in time (no source gave a freezer time).",
    "why": "Canning cooks the food and seals out air and germs, so it keeps for years; once you open the can, germs can get in again, so it needs the fridge like fresh leftovers.",
    "spoiled": "Throw out cans that are bulging, leaking, rusty, deeply dented, or dented on the top or side seam, and anything that spurts liquid when opened or smells off or looks moldy. Never taste food from a suspicious can: it could carry botulism.",
    "sources": [
      {
        "name": "USDA FSIS, Shelf-Stable Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/shelf-stable-food"
      },
      {
        "name": "Clemson Cooperative Extension HGIC, Food Storage: Pantry",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-pantry/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "danmuji",
    "name": "Pickles & danmuji",
    "emoji": "🥒",
    "group": "pantry",
    "fridge": {
      "min": 2,
      "max": 3,
      "unit": "weeks"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "other store-bought shelf-stable jarred or canned pickles, opened",
        "fridge": {
          "min": 5,
          "max": 7,
          "unit": "days"
        },
        "freezer": null,
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "After opening, keep danmuji in its pickling liquid in a tightly sealed container in the fridge, with the pieces fully covered, and use clean chopsticks or tongs to take pieces out.",
    "freeze": "Don't freeze pickles; freezing ruins the crunch. Keep them in the fridge instead.",
    "why": "Pickles sit in salty, sour, sweet brine that keeps most germs out, but once opened, air and dirty utensils can let mold in, and pieces poking out of the brine dry out and lose their crunch.",
    "spoiled": "Mold, a slimy or very soft texture, cloudy or bubbling brine with a bad smell, or an off smell beyond the normal pickled smell.",
    "sources": [
      {
        "name": "Maangchi (Korean cooking reference), Yellow pickled radish (Danmuji)",
        "url": "https://www.maangchi.com/ingredient/dan-moo-ji"
      },
      {
        "name": "USDA FSIS, Shelf-Stable Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/shelf-stable-food"
      }
    ],
    "checked": "one"
  },
  {
    "key": "leftovers",
    "name": "Leftovers",
    "emoji": "🍱",
    "group": "cooked",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 2,
      "max": 3,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate within 2 hours of cooking (1 hour if it is above 90°F) in shallow, airtight containers so the food cools fast, and write the date on the container. Split big batches into several smaller containers.",
    "freeze": "Freeze anything you won't eat within the 3-4 day fridge window, in airtight portion-size containers or freezer bags with the air pressed out. Frozen leftovers stay safe but slowly lose moisture and flavor, and you can reheat them straight from frozen to 165°F.",
    "why": "Tiny germs called bacteria keep growing slowly in cooked food even in the cold fridge, and the ones that make people sick usually can't be seen or smelled, so we count days instead of sniffing.",
    "spoiled": "Sour or off smell, slimy texture, mold, or a fizzy taste. Throw out leftovers older than 4 days even if they look and smell fine, because germs that cause illness usually don't change how food looks or smells.",
    "sources": [
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "USDA FSIS, Keep Food Safe! Food Safety Basics (storage chart)",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe"
      },
      {
        "name": "USDA/FDA Cold Food Storage Chart (FoodSafety.gov)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS, Freezing and Food Safety (freezer chart)",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/freezing-and-food-safety"
      }
    ],
    "checked": "two"
  },
  {
    "key": "soups-stews",
    "name": "Soups & stews (jjigae, guk)",
    "emoji": "🍲",
    "group": "cooked",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 2,
      "max": 3,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Don't leave the pot on the stove to cool: within 2 hours, ladle the soup into shallow containers (or chill the pot in a sink of ice water first) and refrigerate. When reheating, bring it to a rolling boil.",
    "freeze": "Freeze in portion-size airtight containers or flat freezer bags, leaving some headspace because liquid expands as it freezes. Noodles, rice and potatoes can turn mushy after thawing, so add them fresh when you reheat if you can.",
    "why": "Soup is warm, wet and full of food, which makes a perfect home for bacteria, and a big pot stays warm in the middle for a long time, so it has to be cooled fast and kept cold.",
    "spoiled": "Sour smell, bubbles or fizzing in cold soup, broth that turned cloudy or slimy, or mold on the surface.",
    "sources": [
      {
        "name": "USDA/FDA Cold Food Storage Chart (FoodSafety.gov)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "FDA Refrigerator & Freezer Storage Chart",
        "url": "https://www.fda.gov/media/74435/download"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "FoodSafety.gov, Food Safety During Power Outage",
        "url": "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"
      },
      {
        "name": "USDA FSIS, Freezing and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/freezing-and-food-safety"
      },
      {
        "name": "University of Minnesota Extension, Storage times for food in the refrigerator and freezer",
        "url": "https://extension.umn.edu/preserving-and-preparing/storage-times-food-refrigerator-and-freezer"
      },
      {
        "name": "USDA FSIS, Refrigeration & Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/refrigeration"
      },
      {
        "name": "FDA, Cooling Cooked TCS Food (Food Code guidance)",
        "url": "https://www.fda.gov/media/181882/download"
      }
    ],
    "checked": "two"
  },
  {
    "key": "namul",
    "name": "Namul (seasoned veggies)",
    "emoji": "🥗",
    "group": "cooked",
    "fridge": {
      "min": 2,
      "max": 3,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "bean sprout namul (kongnamul or sukju namul)",
        "fridge": {
          "min": 2,
          "max": 3,
          "unit": "days"
        },
        "freezer": null,
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep in a covered container in the fridge and take out only what you'll eat, using clean chopsticks. Put the container back within 2 hours instead of leaving banchan on the table all day.",
    "freeze": "Seasoned namul doesn't freeze well: it turns watery, and soybean sprouts can get stringy or tough. To prep ahead, freeze blanched, squeezed, unseasoned spinach in portions and season it after thawing.",
    "why": "Blanched vegetables are soft and wet, and germs can feed on them and on the garlic and sesame oil, so namul only lasts a few days even in the cold.",
    "spoiled": "Sour or off smell, slimy or sticky feel, cloudy liquid pooling in the container, a fizzy or sour taste, or mold.",
    "sources": [
      {
        "name": "Korean Bapsang, Sigeumchi Namul (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/sigeumchi-namul-korean-spinach-side/"
      },
      {
        "name": "Korean Bapsang, Watercress Namul (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/watercress-namul/"
      },
      {
        "name": "Maangchi, Sukjunamul-muchim (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/sukjunamul-muchim"
      },
      {
        "name": "Maangchi, Kongnamul-muchim reader comments (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/kongnamul-muchim/comment-page-1"
      },
      {
        "name": "Korean Bapsang, Kimchi Kongnamul Guk (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/kimchi-kongnamul-guk-soybean-sprout/"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "Korean Bapsang (Korean cooking reference), 15 Vegetable Side Dishes",
        "url": "https://www.koreanbapsang.com/15-korean-vegetable-side-dishes/"
      }
    ],
    "checked": "two"
  },
  {
    "key": "jorim-bokkeum",
    "name": "Braised & stir-fried banchan",
    "emoji": "🥢",
    "group": "cooked",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "dry stir-fried anchovies (myeolchi bokkeum) and similar dried-fish bokkeum",
        "fridge": {
          "min": 1,
          "max": 2,
          "unit": "weeks"
        },
        "freezer": null,
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Let it cool, then store in an airtight container in the fridge. Take out a portion with clean utensils instead of putting the whole container on the table.",
    "freeze": "None of our sources give a freezer time for these banchan, and Korean cooks usually keep them in the fridge instead. Make smaller batches rather than freezing; braised potatoes and tofu can change texture if frozen.",
    "why": "Dry, salty, sweet stir-fries like anchovies have very little water for germs to use, so they last longer; soft, saucy braised potatoes have lots of water, so they spoil sooner.",
    "spoiled": "Sour or off smell, slimy sauce, or mold. For anchovies, a rancid (old-oil or paint-like) smell or a soft, damp texture.",
    "sources": [
      {
        "name": "Maangchi, Algamja-jorim (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/algamja-jorim"
      },
      {
        "name": "Maangchi, Maeun-gamja-jorim (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/maeun-gamja-jorim"
      },
      {
        "name": "Korean Bapsang, Myeolchi Bokkeum (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/myulchi-bokkeum-stir-fried-anchovies/"
      },
      {
        "name": "Maangchi, Myeolchi-bokkeum (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/myeolchi-bokkeum"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "Maangchi (Korean cooking reference), Myeolchi-bokkeum photo page",
        "url": "https://www.maangchi.com/photo/myeolchibokkeum"
      },
      {
        "name": "Maangchi (Korean cooking reference), Jangjorim",
        "url": "https://www.maangchi.com/recipe/jangjorim"
      },
      {
        "name": "Korean Bapsang (Korean cooking reference), Jangjorim",
        "url": "https://www.koreanbapsang.com/jangjorim-soy-braised-beef/"
      },
      {
        "name": "FoodSafety.gov Cold Food Storage Chart",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      }
    ],
    "checked": "two"
  },
  {
    "key": "jangajji",
    "name": "Jangajji (pickled banchan)",
    "emoji": "🫙",
    "group": "cooked",
    "fridge": {
      "min": 2,
      "max": 4,
      "unit": "weeks"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Keep the vegetables fully under the brine in a clean, covered glass jar in the fridge, and always take some out with a clean, dry utensil. Recipes let the jar stand at room temperature for a day or two to start pickling; after that, keep it refrigerated.",
    "freeze": "Not recommended: jangajji is kept for its crunch, and freezing makes pickled vegetables soft. Keep it in the fridge instead; reboiling and cooling the brine after a few days helps it keep longer.",
    "why": "Salty soy sauce, vinegar and sugar make it hard for germs to grow, and the cold slows them even more, so pickles last weeks instead of days. Mold can still sneak in, though.",
    "spoiled": "White fuzzy mold or a film on top, slimy or mushy vegetables, cloudy or foamy brine, or a bad smell. If you see mold, throw it out.",
    "sources": [
      {
        "name": "Korean Bapsang, Jangajji (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/jangajji-vegetable-pickles/"
      },
      {
        "name": "Maangchi, L.A. Jangajji (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/la-jangajji"
      },
      {
        "name": "Maangchi, Gochu-jangajji (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/gochu-jangajji"
      },
      {
        "name": "Korean Bapsang, Maneul Jangajji (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/maneul-jangajji-korean-pickled-garlic/"
      },
      {
        "name": "University of Wisconsin Extension B2267, Homemade Pickles & Relishes (hosted by UC ANR)",
        "url": "https://ucanr.edu/sites/default/files/2020-12/341217.pdf"
      },
      {
        "name": "University of Illinois Extension, Make Your Own Pickles",
        "url": "https://extension.illinois.edu/blogs/simply-nutritious-quick-and-delicious/2018-07-27-make-your-own-pickles"
      },
      {
        "name": "Oregon State University Extension, Refrigerator Pickled Cucumbers",
        "url": "https://extension.oregonstate.edu/imported-publication/refrigerator-pickled-cucumbers"
      }
    ],
    "checked": "two"
  },
  {
    "key": "kimbap",
    "name": "Kimbap",
    "emoji": "🍙",
    "group": "cooked",
    "fridge": {
      "min": 1,
      "max": 1,
      "unit": "days"
    },
    "freezer": null,
    "pantry": {
      "min": 2,
      "max": 2,
      "unit": "hours"
    },
    "variants": [],
    "best": "fridge",
    "how": "Kimbap is best eaten within a couple of hours of rolling. To keep it longer, put the slices in an airtight container and refrigerate; for picnics and lunchboxes, carry it in a cooler or insulated bag with ice packs. Cold kimbap softens if you microwave it briefly, or dip slices in beaten egg and pan-fry them.",
    "freeze": "None of our sources give a freezer time for homemade kimbap or rice balls, and cold makes the rice hard, so freezing isn't a good fit. For store-bought frozen kimbap, follow the package directions.",
    "why": "Rice and fillings like egg, ham and spinach are moist and get touched by hands during rolling, so germs (Korea's food agency names Staph as the usual culprit in kimbap) can grow when it's warm. The fridge stops them, but cold also makes the rice hard.",
    "spoiled": "Sour or off smell, sticky or slimy rice, or wet, sour-smelling fillings. Throw out kimbap left out more than 2 hours (1 hour above 90°F) even if it seems fine, because some germ poisons don't change the smell.",
    "sources": [
      {
        "name": "Korea Policy Briefing (korea.kr), MFDS guidance on lunchboxes and kimbap (Korean government)",
        "url": "https://www.korea.kr/multi/visualNewsView.do?newsId=148891083"
      },
      {
        "name": "Korea Policy Briefing (korea.kr), MFDS convenience-store ready-to-eat food check (Korean government)",
        "url": "https://www.korea.kr/news/issueQAView.do?newsId=148811295"
      },
      {
        "name": "Korean Bapsang, Kimbap (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/gimbapkimbap-korean-dried-seaweed-rolls/"
      },
      {
        "name": "Maangchi, Tuna gimbap reader comments (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/chamchi-gimbap/comment-page-3"
      },
      {
        "name": "FoodSafety.gov, Food Safety During Power Outage",
        "url": "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"
      }
    ],
    "checked": "one"
  },
  {
    "key": "mandu",
    "name": "Mandu (dumplings)",
    "emoji": "🥟",
    "group": "cooked",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 3,
      "max": 3,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "store-bought frozen mandu (e.g., Bibigo)",
        "fridge": null,
        "freezer": {
          "min": 3,
          "max": 4,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "freezer",
    "how": "Freeze homemade mandu the day you make them. If you'll cook them within a day or two instead, keep them covered on the bottom shelf of the fridge. Keep store-bought mandu frozen and cook from frozen as the package says.",
    "freeze": "Lay the dumplings on a parchment-lined tray so they don't touch, freeze until solid (a few hours or overnight), then move them to zipper bags with the air squeezed out and write the date. Cook from frozen, which takes a few minutes longer, and don't refreeze packaged mandu once thawed.",
    "why": "The filling has raw meat with germs that only cooking kills. Freezing puts the germs to sleep but doesn't kill them, so dumplings must be cooked all the way through.",
    "spoiled": "Freezer burn (dry, white or gray leathery spots), lots of ice crystals or dumplings frozen together in a clump (a sign they thawed and refroze), cracked wrappers, or a sour or off smell from the filling.",
    "sources": [
      {
        "name": "USDA/FDA Cold Food Storage Chart (FoodSafety.gov)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "Maangchi, Mandu (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/mandu"
      },
      {
        "name": "Maangchi, Dakgogi mandu (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/dakgogi-mandu"
      },
      {
        "name": "Korean Bapsang, Mandu (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/mandu-korean-dumplings_20/"
      },
      {
        "name": "bibigo USA product page, Steamed Dumplings Pork & Vegetable (manufacturer, related product)",
        "url": "https://www.bibigousa.com/products/shop-steamed-soup-dumplings-pork-vegetable-6-6-oz"
      },
      {
        "name": "Longdan (UK retailer) listing for CJ Bibigo Mini Mandu",
        "url": "https://longdan.co.uk/products/cj-bibigo-mini-mandu-pork-vegetable-dumplings-400g-frozen"
      }
    ],
    "checked": "one"
  },
  {
    "key": "pizza",
    "name": "Pizza",
    "emoji": "🍕",
    "group": "cooked",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 1,
      "max": 2,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate within 2 hours of serving (1 hour above 90°F). Wrap the slices tightly or put them in an airtight container rather than leaving them in the delivery box.",
    "freeze": "Wrap slices individually in plastic wrap and then foil, or put them in a freezer bag with the air pressed out. Reheat straight from frozen in the oven, air fryer or a skillet until steaming hot (165°F).",
    "why": "Cheese, meat and sauce are foods germs love, and they grow fast at room temperature, so pizza left out overnight isn't safe even though it looks fine.",
    "spoiled": "Mold on the crust or toppings, a sour smell, or slimy or wet toppings.",
    "sources": [
      {
        "name": "USDA/FDA Cold Food Storage Chart (FoodSafety.gov)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "USDA FSIS, Safe Handling of Take-Out Foods",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-handling-take-out-foods"
      }
    ],
    "checked": "two"
  },
  {
    "key": "egg-dishes",
    "name": "Cooked egg dishes",
    "emoji": "🍳",
    "group": "cooked",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "baked egg casserole",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 2,
          "max": 3,
          "unit": "months"
        },
        "pantry": null
      },
      {
        "label": "quiche",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 1,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Refrigerate within 2 hours (1 hour above 90°F) in a covered container. Pack rolled omelet (gyeran-mari) for lunch with an ice pack, and reheat leftovers to 165°F.",
    "freeze": "Baked egg casseroles and quiche freeze well after baking if wrapped tightly. Plain scrambled eggs and rolled omelets have no official freezer time and tend to turn watery and rubbery, so make them fresh.",
    "why": "Eggs can carry Salmonella germs, and cooked egg is soft, moist and full of protein that germs love, so it needs the cold fridge and should be eaten within a few days.",
    "spoiled": "A sour or strong sulfur smell, slimy surface, watery weeping with an off smell, or mold.",
    "sources": [
      {
        "name": "FDA, What You Need to Know About Egg Safety",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"
      },
      {
        "name": "USDA FSIS, Shell Eggs from Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/eggs/shell-eggs-farm-table"
      },
      {
        "name": "USDA/FDA Cold Food Storage Chart (FoodSafety.gov)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "University of Delaware Extension, Keep Food Safe Guide to Refrigerator Storage Periods (reproduces FoodSafety.gov chart)",
        "url": "https://www.udel.edu/content/dam/udelImages/canr/pdfs/extension/factsheets/Keep-Food-Safe-Guide-to-Refrigerator-Storage-Periods.pdf"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      }
    ],
    "checked": "two"
  },
  {
    "key": "mayo-salads",
    "name": "Potato, egg & tuna salads",
    "emoji": "🥗",
    "group": "cooked",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate in a covered container right after making it and right after serving. At picnics and potlucks, set the bowl in ice and put it back in the cooler within 2 hours (1 hour above 90°F).",
    "freeze": "Doesn't freeze well: mayonnaise separates, and egg, potato and celery go watery after thawing. Freeze plain cooked chicken or pasta instead and mix in the mayo after thawing.",
    "why": "Chopped egg, chicken, tuna, potato and pasta are moist foods that germs grow in quickly once they're warm, and mixing with spoons and hands spreads any germs through the whole bowl.",
    "spoiled": "Sour or off smell, a watery or separated layer, slimy texture, discoloration, or mold.",
    "sources": [
      {
        "name": "USDA/FDA Cold Food Storage Chart (FoodSafety.gov)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS, Keep Food Safe! Food Safety Basics (storage chart)",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe"
      },
      {
        "name": "FDA Refrigerator & Freezer Storage Chart",
        "url": "https://www.fda.gov/media/74435/download"
      }
    ],
    "checked": "one"
  },
  {
    "key": "cooked-veg",
    "name": "Cooked veggies",
    "emoji": "🥦",
    "group": "cooked",
    "fridge": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "freezer": {
      "min": 2,
      "max": 3,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Refrigerate within 2 hours in shallow, covered containers. Cooked potatoes, like cooked rice, shouldn't sit out more than 2 hours.",
    "freeze": "Freeze within the 3-4 day fridge window in airtight containers or flat freezer bags. Thawed cooked vegetables are softer, so they work best stirred into soups, stews, jjigae or fried rice.",
    "why": "Cooking makes vegetables soft and moist, and once they cool, any germs that land on them find an easy meal, so they last only a few days.",
    "spoiled": "Slimy surface, sour or off smell, mold, or liquid that's cloudy or bubbly.",
    "sources": [
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "USDA/FDA Cold Food Storage Chart (FoodSafety.gov)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "FoodSafety.gov, Food Safety During Power Outage",
        "url": "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"
      },
      {
        "name": "University of Nebraska-Lincoln Extension, Home Food Storage",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "University of Illinois Extension, How long do holiday leftovers really last? (2025)",
        "url": "https://extension.illinois.edu/blogs/live-well-eat-well/2025-11-21-how-long-do-holiday-leftovers-really-last"
      },
      {
        "name": "NDSU Extension food storage guide (hosted by UC ANR)",
        "url": "https://ucanr.edu/sites/default/files/2020-12/341094.pdf"
      }
    ],
    "checked": "two"
  },
  {
    "key": "broth",
    "name": "Broth & stock",
    "emoji": "🍲",
    "group": "cooked",
    "fridge": {
      "min": 1,
      "max": 2,
      "unit": "days"
    },
    "freezer": {
      "min": 2,
      "max": 3,
      "unit": "months"
    },
    "pantry": null,
    "variants": [],
    "best": "fridge",
    "how": "Cool it fast: strain it, divide it into shallow containers (or chill the pot in an ice-water bath) and refrigerate within 2 hours, then skim off the fat once it firms up. Use refrigerated broth within 1-2 days, bringing it to a boil before use, or freeze it.",
    "freeze": "Freeze in portions you'll actually use (ice-cube trays for small amounts, 1-2 cup containers or flat zipper bags), leave room for expansion, and label with the date. Thaw in the fridge or heat straight from frozen.",
    "why": "Broth is wet and full of nutrients from meat or fish, so germs grow in it quickly, which is why it has to be chilled fast and used soon or frozen.",
    "spoiled": "Sour smell, broth that has turned cloudy or slimy, bubbles or fizz, or mold on the fat layer.",
    "sources": [
      {
        "name": "FDA Refrigerator & Freezer Storage Chart",
        "url": "https://www.fda.gov/media/74435/download"
      },
      {
        "name": "University of Minnesota Extension, Storage times for food in the refrigerator and freezer",
        "url": "https://extension.umn.edu/preserving-and-preparing/storage-times-food-refrigerator-and-freezer"
      },
      {
        "name": "Clemson HGIC, Food Storage: Refrigerator & Freezer",
        "url": "https://hgic.clemson.edu/factsheet/food-storage-refrigerator-freezer/"
      },
      {
        "name": "Colorado State University Extension, Food Storage and Quality",
        "url": "https://elpaso.extension.colostate.edu/wp-content/uploads/sites/44/2020/03/Food-Storage-and-Quality.pdf"
      },
      {
        "name": "USDA FSIS, Chicken from Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/chicken-farm-table"
      },
      {
        "name": "Maangchi, Myeolchi-dasima-yuksu (Korean cooking reference)",
        "url": "https://www.maangchi.com/recipe/myeolchi-dasima-yuksu"
      },
      {
        "name": "Korean Bapsang, Anchovy Broth (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/how-to-make-anchovy-broth-for-korean/"
      }
    ],
    "checked": "one"
  },
  {
    "key": "frozen-veg-fruit",
    "name": "Frozen veggies & fruit",
    "emoji": "🧊",
    "group": "cooked",
    "fridge": null,
    "freezer": {
      "min": 6,
      "max": 8,
      "unit": "months"
    },
    "pantry": null,
    "variants": [
      {
        "label": "store-bought frozen fruit",
        "fridge": null,
        "freezer": {
          "min": 8,
          "max": 12,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "freezer",
    "how": "Keep at 0°F in the main freezer compartment, not the door. Reseal opened bags tightly with the air pressed out (or move the contents to a freezer bag), and cook frozen vegetables as the package directs.",
    "freeze": "These are already frozen at their best, so the key is to keep them from thawing and refreezing. A bag frozen into one solid block or full of frost has partly thawed and will be lower quality, and a bag left out on the counter more than 2 hours should be thrown out.",
    "why": "Freezing turns the water in food to ice so germs can't grow, but over many months the cold, dry air slowly dries the food out (freezer burn) and fades its flavor, so these times are about taste, not safety.",
    "spoiled": "Freezer burn (dry, grayish-white leathery spots), heavy frost inside the bag, a solid clumped block, faded color or stale flavors; these are quality problems. Throw out anything that smells off after cooking.",
    "sources": [
      {
        "name": "Ohio State University Extension, Freezer Storage (HYG-5402)",
        "url": "https://ohioline.osu.edu/factsheet/HYG-5402"
      },
      {
        "name": "Kansas State Research and Extension, Safe Food Storage: The Refrigerator and Freezer (MF3130)",
        "url": "https://bookstore.ksre.ksu.edu/pubs/safe-food-storage-the-refrigerator-and-freezer_MF3130.pdf"
      },
      {
        "name": "National Center for Home Food Preservation (UGA), How Long Can I Store Frozen Foods",
        "url": "https://nchfp.uga.edu/how/freeze/freeze-general-information/how-long-can-i-store-frozen-foods/"
      },
      {
        "name": "University of Nebraska-Lincoln Extension, Home Food Storage",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Clemson HGIC, Freezing Basics",
        "url": "https://hgic.clemson.edu/factsheet/freezing-basics/"
      },
      {
        "name": "NDSU Extension, Food Storage Guide (FN579)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2023-01/fn579.pdf"
      },
      {
        "name": "USDA FSIS, Freezing and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/freezing-and-food-safety"
      },
      {
        "name": "Clemson Cooperative Extension HGIC, Safety of Stored Foods",
        "url": "https://hgic.clemson.edu/factsheet/safety-of-stored-foods/"
      },
      {
        "name": "Colorado State University Extension, Freezing Vegetables",
        "url": "https://extension.colostate.edu/resource/freezing-vegetables/"
      }
    ],
    "checked": "two"
  },
  {
    "key": "baked-goods",
    "name": "Muffins & cookies",
    "emoji": "🧁",
    "group": "cooked",
    "fridge": {
      "min": 1,
      "max": 1,
      "unit": "weeks"
    },
    "freezer": {
      "min": 2,
      "max": 3,
      "unit": "months"
    },
    "pantry": {
      "min": 3,
      "max": 4,
      "unit": "days"
    },
    "variants": [
      {
        "label": "homemade baked cookies",
        "fridge": null,
        "freezer": {
          "min": 3,
          "max": 6,
          "unit": "months"
        },
        "pantry": {
          "min": 2,
          "max": 3,
          "unit": "weeks"
        }
      }
    ],
    "best": "pantry",
    "how": "Cool completely, then keep in an airtight container or bag at room temperature. The fridge makes muffins and quick breads go stale faster, so freeze what you won't eat in a few days. Refrigerate custard-type bars and anything with a cream-cheese or custard filling.",
    "freeze": "Cool completely first so no condensation forms, wrap each item well (or use freezer bags with the air pressed out), and label with the date. Thaw at room temperature in the wrapping.",
    "why": "Baked goods are fairly dry, so germs grow slowly, but mold spores floating in the air eventually land and grow; the fridge doesn't help much because cold makes bread starch go stale faster.",
    "spoiled": "Fuzzy mold spots (throw the whole muffin or loaf away), a sour or off smell, or a sticky or slimy feel. Hard, dry and stale is a quality issue, not a safety one.",
    "sources": [
      {
        "name": "Iowa State University Extension, AnswerLine",
        "url": "https://blogs.extension.iastate.edu/answerline/?cat=-1"
      },
      {
        "name": "University of Kentucky Cooperative Extension, Recommended Food Storage Times",
        "url": "https://kenton.mgcafe.uky.edu/sites/kenton.ca.uky.edu/files/fcs_food_safety_-_food_storage_times_0_Food%20Safety.pdf"
      },
      {
        "name": "University of Maine Cooperative Extension, Pumpkin Muffins",
        "url": "https://extension.umaine.edu/food-health/recipes/pumpkin-muffins/"
      },
      {
        "name": "Cornell Cooperative Extension Herkimer County, Tips for Storing Bread",
        "url": "https://blogs.cornell.edu/cceherkimer/2020/05/04/tips-for-storing-bread/"
      },
      {
        "name": "NDSU Extension, Food Storage Guide (FN579)",
        "url": "https://www.ndsu.edu/agriculture/sites/default/files/2022-08/fn579.pdf"
      },
      {
        "name": "Michigan State University Extension, Freezing great cookies",
        "url": "https://www.canr.msu.edu/news/freezing_great_cookies"
      },
      {
        "name": "Kansas State Research and Extension, Freezing Baked Goods",
        "url": "https://www.midway.k-state.edu/family-consumer-science/docs/Freezing_Baked_Goods.pdf"
      }
    ],
    "checked": "one"
  },
  {
    "key": "dips",
    "name": "Hummus & salsa",
    "emoji": "🫙",
    "group": "cooked",
    "fridge": {
      "min": 7,
      "max": 7,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "jarred shelf-stable salsa, opened",
        "fridge": {
          "min": 1,
          "max": 1,
          "unit": "months"
        },
        "freezer": null,
        "pantry": null
      },
      {
        "label": "fresh refrigerated or homemade salsa",
        "fridge": {
          "min": 4,
          "max": 7,
          "unit": "days"
        },
        "freezer": {
          "min": 1,
          "max": 2,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep the lid on and refrigerate right after serving. Scoop a portion into a bowl with a clean spoon instead of dipping chips into the container, and don't leave it out more than 2 hours. If the label says 'use within X days of opening' and that's shorter, follow the label.",
    "freeze": "Opened hummus and jarred salsa have no official freezer time, and freezing can make hummus grainy and salsa watery. Fresh homemade salsa can be frozen 1-2 months, but it will be watery after thawing, so use it in cooking.",
    "why": "Once a container is opened, germs from the air, spoons and chips get in. Hummus is moist and not very sour, so germs and mold grow faster in it than in vinegary jarred salsa.",
    "spoiled": "Mold of any color, a sour or fermented smell, a fizzy or bubbly look or taste, a swollen lid, or a watery layer that smells off.",
    "sources": [
      {
        "name": "University of Nebraska-Lincoln Extension, Home Food Storage",
        "url": "https://food.unl.edu/free-resource/food-storage/"
      },
      {
        "name": "Kansas State Research and Extension, Safe Food Storage: The Cupboard (MF3131)",
        "url": "https://bookstore.ksre.ksu.edu/pubs/safe-food-storage-the-cupboard_MF3131.pdf"
      },
      {
        "name": "New Mexico State University Extension, E-118 Storing Food Safely",
        "url": "https://pubs.nmsu.edu/_e/E118/"
      },
      {
        "name": "University of Nebraska-Lincoln Extension, Fresh Salsa recipe",
        "url": "https://food.unl.edu/recipe/fresh-salsa/"
      },
      {
        "name": "Michigan State University Extension, Preserving safe salsa",
        "url": "https://www.canr.msu.edu/news/preserving_safe_salsa"
      }
    ],
    "checked": "one"
  },
  {
    "key": "sauces",
    "name": "Sauces & marinades",
    "emoji": "🥣",
    "group": "cooked",
    "fridge": {
      "min": 2,
      "max": 3,
      "unit": "days"
    },
    "freezer": null,
    "pantry": null,
    "variants": [
      {
        "label": "cooked (simmered) homemade sauce",
        "fridge": {
          "min": 3,
          "max": 4,
          "unit": "days"
        },
        "freezer": {
          "min": 2,
          "max": 3,
          "unit": "months"
        },
        "pantry": null
      }
    ],
    "best": "fridge",
    "how": "Keep in a clean, covered glass jar or container in the fridge and make only what you'll use in a few days. If you want some marinade as a dipping sauce, set it aside before the raw meat goes in. Marinade that has touched raw meat must be thrown out or boiled before reuse.",
    "freeze": "Uncooked marinade can be frozen in small bags or ice-cube trays; Korean Bapsang suggests leaving out the sesame oil and adding it after thawing. No source gives an exact freezer time, and flavor fades the longer it's frozen.",
    "why": "Raw garlic, onion and pear bring their own germs and sugar into the sauce. The cold slows those germs down, and raw garlic sitting in oil must stay cold so a dangerous germ called botulism can't grow.",
    "spoiled": "Bubbles or fizzing, a sour or alcohol-like smell (the sugars fermenting), mold, or a cloudy, slimy look.",
    "sources": [
      {
        "name": "Korean Bapsang, Spicy Chicken Bulgogi (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/spicy-grilled-korean-chicken/"
      },
      {
        "name": "Korean Bapsang, LA Galbi (Korean cooking reference)",
        "url": "https://www.koreanbapsang.com/la-galbi-gui-grilled-la-style-short-ribs/"
      },
      {
        "name": "Michigan State University Extension, Stinking facts about garlic",
        "url": "https://www.canr.msu.edu/news/stinking_facts_about_garlic"
      },
      {
        "name": "Oregon State University Extension, Preserving garlic",
        "url": "https://extension.oregonstate.edu/food/preservation/preserving-garlic"
      },
      {
        "name": "USDA FSIS, Grilling and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/grilling-and-food-safety"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      }
    ],
    "checked": "one"
  }
];

export const RULES = [
  {
    "key": "two-hour-rule",
    "rule": "Never leave perishable food out of the refrigerator for more than 2 hours, or more than 1 hour when the temperature is above 90°F.",
    "detail": "Bacteria grow fastest between 40°F and 140°F, the 'Danger Zone', where their numbers can double in as little as 20 minutes. The clock counts all the time food spends at room temperature: on the table during a long meal or party, in a lunchbox or picnic basket, or in a hot car. Once the limit passes, throw the food out. This covers cooked rice, kimbap, banchan, soups and stews, cut fruit, meat, eggs and all leftovers.",
    "sources": [
      {
        "name": "USDA FSIS, \"Danger Zone\" (40°F - 140°F)",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/danger-zone-40f-140f"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "FDA, What You Need to Know About Egg Safety",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"
      },
      {
        "name": "FoodSafety.gov, Food Safety During Power Outage",
        "url": "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"
      },
      {
        "name": "Colorado State University Extension, Food Safety in Your Kitchen",
        "url": "https://extension.colostate.edu/resource/food-safety-in-your-kitchen/"
      }
    ]
  },
  {
    "key": "fridge-freezer-temperatures",
    "rule": "Keep the refrigerator at 40°F (4°C) or below and the freezer at 0°F (-18°C), and check both with an appliance thermometer.",
    "detail": "Cold slows bacteria but doesn't stop them, which is why fridge foods have day limits. Food kept at a steady 0°F stays safe indefinitely, so freezer times are for best quality (flavor and texture) only. Freezing doesn't kill germs; it puts them to sleep, and they wake up when food thaws. In a power outage, keep the doors closed: the fridge keeps food safe for about 4 hours, and a full freezer holds its temperature about 48 hours (24 hours if half full).",
    "sources": [
      {
        "name": "FDA, Refrigerator Thermometers: Cold Facts about Food Safety",
        "url": "https://www.fda.gov/food/buy-store-serve-safe-food/refrigerator-thermometers-cold-facts-about-food-safety"
      },
      {
        "name": "USDA FSIS, Freezing and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/freezing-and-food-safety"
      },
      {
        "name": "USDA/FDA Cold Food Storage Chart (FoodSafety.gov)",
        "url": "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
      },
      {
        "name": "USDA FSIS, Keeping Food Safe During an Emergency",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/keeping-food-safe-during"
      }
    ]
  },
  {
    "key": "cool-hot-food-fast",
    "rule": "Get cooked food into the fridge within 2 hours, and divide big batches into small, shallow containers so they cool quickly.",
    "detail": "A big pot of soup, broth, rice or stew stays warm in the middle for hours, which gives bacteria time to grow. Divide large amounts into shallow containers, cut large pieces of meat into smaller portions, and refrigerate. Hot food doesn't have to cool on the counter first: it can go straight into the fridge, or be chilled quickly in an ice or cold-water bath before refrigerating.",
    "sources": [
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "Colorado State University Extension, Food Storage and Quality",
        "url": "https://elpaso.extension.colostate.edu/wp-content/uploads/sites/44/2020/03/Food-Storage-and-Quality.pdf"
      },
      {
        "name": "USDA FSIS, Refrigeration & Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/refrigeration"
      },
      {
        "name": "FDA, Cooling Cooked Time/Temperature Control for Safety Foods",
        "url": "https://www.fda.gov/media/181882/download"
      }
    ]
  },
  {
    "key": "reheat-to-165",
    "rule": "Reheat leftovers to 165°F, checked with a food thermometer, and bring soups, sauces and gravies to a rolling boil.",
    "detail": "In the microwave, cover the food and stir or rotate it so it heats evenly, because cold spots can let bacteria survive; check the temperature in a few places. Frozen leftovers can be reheated without thawing first, in a saucepan, microwave or oven. Cooked egg dishes should also be reheated to 165°F.",
    "sources": [
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      },
      {
        "name": "USDA FSIS, Shell Eggs from Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/eggs/shell-eggs-farm-table"
      }
    ]
  },
  {
    "key": "safe-thawing",
    "rule": "Thaw food in only three ways: in the refrigerator, in cold water, or in the microwave. Never thaw on the counter.",
    "detail": "Refrigerator: the slowest and safest way, so plan ahead. Food thawed in the fridge can wait before cooking (USDA: raw pork 3-5 days after thawing). Cold water: seal the food in a leak-proof bag, submerge it in cold tap water, change the water every 30 minutes, and cook it right away. Microwave: cook it right after thawing, because parts of the food may start to cook. You can also cook food straight from frozen; it takes about 50% longer. Frozen leftovers can be reheated without thawing.",
    "sources": [
      {
        "name": "USDA FSIS, Freezing and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/freezing-and-food-safety"
      },
      {
        "name": "USDA FSIS, Fresh Pork from Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/fresh-pork-farm-table"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      }
    ]
  },
  {
    "key": "refreezing",
    "rule": "Food thawed in the refrigerator can be refrozen without cooking; food thawed in cold water or the microwave must be cooked before it is refrozen.",
    "detail": "Refreezing food that thawed in the fridge is safe, though it loses some quality from moisture lost during thawing. Raw food that was frozen and then cooked can be frozen again as cooked food. Never refreeze food that sat out more than 2 hours (1 hour above 90°F). After a power outage, food that still has ice crystals or stayed at 40°F or below can be refrozen; throw out food that was above 40°F for more than 2 hours. If a package says 'do not refreeze', follow the label.",
    "sources": [
      {
        "name": "USDA FSIS, Freezing and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/freezing-and-food-safety"
      },
      {
        "name": "USDA FSIS, Fresh Pork from Farm to Table",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/meat-catfish/fresh-pork-farm-table"
      },
      {
        "name": "FoodSafety.gov, Food Safety During Power Outage",
        "url": "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"
      }
    ]
  },
  {
    "key": "date-labels",
    "rule": "'Best if used by', 'use by' and 'sell by' dates are about quality, not safety. The one exception is infant formula.",
    "detail": "USDA FSIS definitions: a 'Best if Used By/Before' date tells you when a product will have its best flavor or quality; it isn't a purchase or safety date. A 'Sell-By' date tells the store how long to display the product, for inventory; it isn't a safety date. A 'Use-By' date is the last date recommended for using the product at peak quality; it isn't a safety date, except on infant formula. Federal law requires dates only on infant formula. A food past its date should still be safe if it was stored properly, until it shows signs of spoiling. Once a package is opened, though, follow the opened-package storage times rather than the printed date. On Korean-labeled foods, since January 1, 2023, Korea prints a 소비기한 (use-by or consumption date: the last day the food is safe to eat if stored as directed) instead of the older 유통기한 (sell-by date).",
    "sources": [
      {
        "name": "FDA, How to Cut Food Waste and Maintain Food Safety",
        "url": "https://www.fda.gov/food/consumers/how-cut-food-waste-and-maintain-food-safety"
      },
      {
        "name": "Korea Policy Briefing (korea.kr), Q&A on the use-by date (소비기한) system (Korean government)",
        "url": "https://www.korea.kr/news/policyNewsView.do?newsId=148911130"
      }
    ]
  },
  {
    "key": "raw-meat-bottom-shelf",
    "rule": "Store raw meat, poultry and seafood sealed on the bottom shelf of the fridge, so their juices can't drip onto ready-to-eat food.",
    "detail": "Put raw meat, poultry and seafood in sealed containers or plastic bags (or on a tray) on the lowest shelf. That keeps them below kimchi, banchan, fruit, leftovers and anything else eaten without cooking. Thaw and marinate raw meat in the refrigerator, never on the counter. Marinade that touched raw meat must be brought to a boil before it's used as a sauce, or set some aside before the meat goes in.",
    "sources": [
      {
        "name": "USDA FSIS, Refrigeration & Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/refrigeration"
      },
      {
        "name": "USDA FSIS, Keep Food Safe! Food Safety Basics",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe"
      },
      {
        "name": "USDA FSIS, Grilling and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/grilling-and-food-safety"
      },
      {
        "name": "FDA, Eating Outdoors: Handling Food Safely",
        "url": "https://www.fda.gov/media/79871/download"
      }
    ]
  },
  {
    "key": "when-in-doubt-throw-it-out",
    "rule": "When in doubt, throw it out.",
    "detail": "The bacteria that cause food poisoning usually can't be seen, smelled or tasted, so never taste food to decide whether it's safe. If you don't know how long something has been in the fridge, whether it was left out, or whether it got warm during a power outage, throw it away. A bad smell or mold means food has spoiled, but food can be unsafe without either. Writing the cooking date on containers saves the guesswork.",
    "sources": [
      {
        "name": "FoodSafety.gov, Food Safety During Power Outage",
        "url": "https://www.foodsafety.gov/food-safety-charts/food-safety-during-power-outage"
      },
      {
        "name": "USDA FSIS, Keep Your Food Safe During Emergencies: Power Outages, Floods & Fires",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/emergencies/keep-your-food-safe-during-emergencies"
      },
      {
        "name": "USDA FSIS, Leftovers and Food Safety",
        "url": "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety"
      }
    ]
  }
];
