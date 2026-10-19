// Starter menu and the "Discover" list. The starter recipes are written for
// this app (home-style versions of classic dishes) so the family has a full
// menu on day one. Discover links to recipes by well-known cooks; tapping one
// asks Claude to read that page and add it to the menu on this device.

export const MEALS = [
  { key: "breakfast", label: "Breakfast", emoji: "🌅", color: "#FFE7A3" },
  { key: "lunch", label: "Lunch", emoji: "🥪", color: "#CDEFC9" },
  { key: "dinner", label: "Dinner", emoji: "🍽️", color: "#FFD3C4" },
  { key: "snack", label: "Snack", emoji: "🍎", color: "#E5D8FF" },
];

export const CATEGORIES = [
  { key: "korean", label: "Korean", emoji: "🇰🇷" },
  { key: "soup", label: "Soups", emoji: "🍲" },
  { key: "noodles", label: "Noodles", emoji: "🍜" },
  { key: "rice", label: "Rice", emoji: "🍚" },
  { key: "meat", label: "Meat", emoji: "🍗" },
  { key: "seafood", label: "Fish", emoji: "🐟" },
  { key: "veggie", label: "Veggie", emoji: "🥦" },
  { key: "side", label: "Sides", emoji: "🥢" },
  { key: "lunchbox", label: "Lunchbox", emoji: "🍱" },
  { key: "quick", label: "Quick", emoji: "⚡" },
  { key: "healthy", label: "Healthy", emoji: "💪" },
  { key: "kid-favorite", label: "Kids love it", emoji: "🧒" },
  { key: "treat", label: "Treats", emoji: "🧁" },
];

export const SPICE = ["Not spicy", "A little spicy", "Spicy"];

export const FACES = [
  { score: 4, emoji: "😍", label: "Love it!" },
  { score: 3, emoji: "😋", label: "Yummy" },
  { score: 2, emoji: "😐", label: "Okay" },
  { score: 1, emoji: "😖", label: "No thanks" },
];

export const AVATARS = ["👩", "👨", "👧", "👦", "🧒", "👶", "👵", "👴", "🧑", "🐶", "🐱", "🦄", "🐻", "🐰", "🦖", "🐼"];

const d = (key, name, nameKo, emoji, meals, categories, servings, prepMinutes, cookMinutes, spicy, ingredients, steps, notes = "") => ({
  seedKey: key, name, nameKo, emoji, meals, categories, servings, prepMinutes, cookMinutes, spicy, ingredients, steps, notes,
});

export const STARTER_DISHES = [
  d("bulgogi", "Beef Bulgogi", "불고기", "🥩", ["dinner"], ["korean", "meat", "kid-favorite"], 4, 45, 10, 0,
    ["1 1/2 lb ribeye or sirloin, very thinly sliced", "1/2 Asian pear, grated (or 1/2 apple)", "1/2 onion, thinly sliced", "2 green onions, cut into 2-inch pieces", "5 tbsp soy sauce", "2 tbsp brown sugar", "1 tbsp honey", "4 cloves garlic, minced", "1 tsp grated ginger", "1 tbsp sesame oil", "1/4 tsp black pepper", "1 tbsp toasted sesame seeds", "1 tbsp vegetable oil"],
    ["In a big bowl, stir together the soy sauce, brown sugar, honey, grated pear, garlic, ginger, sesame oil and black pepper.", "Add the beef and onion. Mix with clean hands until every piece is coated.", "Cover and marinate in the fridge for 30 minutes (or overnight).", "Heat the oil in a large pan over high heat.", "Cook the beef in a single layer, in batches, for 3 to 4 minutes until browned.", "Add the green onions for the last minute.", "Sprinkle with sesame seeds. Serve with rice and lettuce leaves for wrapping."],
    "Freeze extra marinated beef flat in a bag for a super quick dinner later."),

  d("japchae", "Japchae", "잡채", "🍜", ["dinner", "lunch"], ["korean", "noodles", "veggie", "lunchbox"], 4, 20, 20, 0,
    ["8 oz sweet potato glass noodles (dangmyeon)", "6 oz beef, cut into thin strips (optional)", "4 oz spinach", "1 carrot, cut into matchsticks", "1/2 onion, thinly sliced", "4 shiitake mushrooms, sliced", "1/2 red bell pepper, thinly sliced", "2 green onions, cut into 2-inch pieces", "2 cloves garlic, minced", "4 tbsp soy sauce", "2 tbsp sugar", "2 tbsp sesame oil", "1 tbsp toasted sesame seeds", "1 tbsp vegetable oil"],
    ["Cook the noodles in boiling water for 6 to 7 minutes until soft and chewy. Drain, rinse with cold water, and snip them a few times with kitchen scissors.", "Blanch the spinach in boiling water for 30 seconds. Rinse in cold water, squeeze dry and add a pinch of salt.", "Mix the soy sauce, sugar and 1 tbsp of the sesame oil in a small bowl.", "Heat the oil in a big pan. Cook the onion, carrot, bell pepper and mushrooms for 3 minutes.", "Push the veggies aside. Add the beef and garlic and cook for 3 minutes.", "Add the noodles, spinach, green onions and sauce. Toss for 2 minutes until shiny.", "Turn off the heat. Stir in the rest of the sesame oil and the sesame seeds."],
    "Great warm or at room temperature, so it's perfect for lunchboxes."),

  d("kimchi-fried-rice", "Kimchi Fried Rice", "김치볶음밥", "🍳", ["dinner", "lunch"], ["korean", "rice", "quick"], 4, 10, 15, 1,
    ["4 cups cooked rice (day-old is best)", "1 1/2 cups well-fermented kimchi, chopped", "3 tbsp kimchi juice", "6 oz ham or bacon, diced (optional)", "1/2 onion, diced", "1 tbsp gochujang (skip for little ones)", "1 tbsp soy sauce", "1 tsp sugar", "1 tbsp sesame oil", "2 green onions, chopped", "4 eggs", "2 tbsp vegetable oil", "1 sheet roasted seaweed (gim), crumbled"],
    ["Heat 1 tbsp oil in a big pan over medium-high heat. Cook the ham and onion for 3 minutes.", "Add the kimchi and sugar. Stir-fry for 4 minutes.", "Add the rice, kimchi juice, gochujang and soy sauce. Stir and press until the rice is all red, about 5 minutes.", "Turn off the heat. Stir in the sesame oil and green onions.", "In another pan, fry the eggs sunny-side up in the rest of the oil.", "Top each bowl with a fried egg and crumbled seaweed."],
    "For kids who don't like spice, leave out the gochujang and add a little more soy sauce."),

  d("bibimbap", "Bibimbap", "비빔밥", "🥗", ["dinner"], ["korean", "rice", "veggie", "healthy"], 4, 30, 20, 1,
    ["4 cups cooked rice", "1/2 lb ground beef", "2 tbsp soy sauce, divided", "1 tsp sugar", "2 cloves garlic, minced", "4 oz spinach", "2 cups bean sprouts", "1 carrot, cut into matchsticks", "1 zucchini, cut into matchsticks", "4 eggs", "2 tbsp sesame oil, divided", "1 tbsp vegetable oil", "Salt to taste", "1 tbsp toasted sesame seeds", "For the sauce:", "3 tbsp gochujang", "1 tbsp sesame oil", "1 tbsp sugar", "1 tbsp water", "1 tsp rice vinegar"],
    ["Mix the beef with 1 tbsp soy sauce, the sugar and garlic. Cook in a pan for 5 minutes until browned.", "Blanch the spinach for 30 seconds and the bean sprouts for 3 minutes. Rinse, squeeze dry, and season each with a little sesame oil and salt.", "Stir-fry the carrot for 2 minutes, then the zucchini for 2 minutes, each with a pinch of salt.", "Mix the sauce ingredients in a small bowl.", "Fry the eggs sunny-side up.", "Put rice in each bowl. Arrange the veggies and beef on top like a rainbow, with an egg in the middle.", "Sprinkle with sesame seeds. Everyone adds as much sauce as they like and mixes it all up!"],
    "Kids love building their own bowls. Set everything out like a buffet."),

  d("doenjang-jjigae", "Doenjang Jjigae", "된장찌개", "🍲", ["dinner"], ["korean", "soup", "healthy"], 4, 15, 20, 0,
    ["3 cups water or anchovy broth", "3 tbsp doenjang (Korean soybean paste)", "1 tsp gochujang (optional)", "4 oz pork belly or beef, cut small (optional)", "1 small potato, cubed", "1/2 onion, cubed", "1/2 zucchini, cubed", "4 oz mushrooms, sliced", "14 oz soft or medium tofu, cubed", "2 cloves garlic, minced", "1 green onion, sliced", "1 green chili, sliced (optional)"],
    ["In a pot, cook the meat over medium heat for 3 minutes.", "Add the water. Stir in the doenjang and gochujang until they melt in.", "Add the potato and onion. Bring to a boil and cook for 5 minutes.", "Add the zucchini, mushrooms and garlic. Cook for 5 minutes.", "Gently add the tofu and simmer for 3 more minutes.", "Top with green onion (and chili for grown-ups). Serve bubbling hot with rice."]),

  d("kimchi-jjigae", "Kimchi Jjigae", "김치찌개", "🌶️", ["dinner"], ["korean", "soup"], 4, 10, 30, 2,
    ["2 cups well-fermented kimchi, chopped", "1/4 cup kimchi juice", "8 oz pork belly or pork shoulder, sliced", "1/2 onion, sliced", "1 tbsp gochugaru", "1 tbsp gochujang", "1 tsp sugar", "2 cloves garlic, minced", "3 cups water or anchovy broth", "14 oz firm tofu, sliced", "2 green onions, sliced", "1 tbsp sesame oil"],
    ["Heat the sesame oil in a pot. Cook the pork for 4 minutes.", "Add the kimchi, onion, garlic and sugar. Stir-fry for 5 minutes.", "Stir in the gochugaru and gochujang.", "Pour in the water and kimchi juice. Bring to a boil, then simmer for 15 minutes.", "Lay the tofu on top and simmer 5 more minutes.", "Add the green onions and serve with rice."],
    "Sour, older kimchi makes the best jjigae."),

  d("miyeok-guk", "Seaweed Soup (Miyeok Guk)", "미역국", "🥣", ["dinner", "breakfast"], ["korean", "soup", "healthy"], 4, 20, 30, 0,
    ["1 oz dried seaweed (miyeok)", "8 oz beef brisket or stew beef, cut small", "1 tbsp sesame oil", "2 cloves garlic, minced", "2 tbsp soup soy sauce (guk-ganjang)", "8 cups water", "1 tsp fish sauce (optional)", "Salt to taste"],
    ["Soak the seaweed in a big bowl of cold water for 20 minutes. Watch it grow!", "Drain, rinse, squeeze out the water and cut it into bite-size pieces.", "Heat the sesame oil in a pot. Cook the beef and garlic for 3 minutes.", "Add the seaweed and 1 tbsp soup soy sauce. Stir for 2 minutes.", "Add the water. Bring to a boil, then simmer for 25 minutes.", "Season with the rest of the soup soy sauce, the fish sauce and salt."],
    "The traditional Korean birthday soup. Healthy and gentle."),

  d("ganjang-chicken", "Soy Garlic Chicken", "간장치킨", "🍗", ["dinner"], ["korean", "meat", "kid-favorite"], 4, 10, 35, 0,
    ["3 lb chicken drumsticks or thighs (about 8 pieces)", "1/2 tsp salt", "1/4 tsp black pepper", "4 tbsp soy sauce", "3 tbsp honey", "1 tbsp brown sugar", "1 tbsp rice vinegar", "5 cloves garlic, minced", "1 tsp grated ginger", "1 tsp sesame oil", "1 tsp toasted sesame seeds", "1 green onion, sliced"],
    ["Heat the oven to 425°F. Line a baking sheet with foil.", "Pat the chicken dry and sprinkle with salt and pepper.", "Bake for 25 minutes.", "Meanwhile, simmer the soy sauce, honey, brown sugar, vinegar, garlic and ginger in a small pot for 3 minutes until a little thick. Stir in the sesame oil.", "Brush the sauce all over the chicken. Bake 10 more minutes until sticky and cooked through.", "Sprinkle with sesame seeds and green onion."]),

  d("galbi-jjim", "Braised Short Ribs (Galbi Jjim)", "갈비찜", "🍖", ["dinner"], ["korean", "meat"], 4, 30, 90, 0,
    ["3 lb beef short ribs, cut into 2-inch pieces", "1/2 cup soy sauce", "3 tbsp brown sugar", "2 tbsp honey", "1/2 Asian pear, grated", "1/2 onion, grated", "6 cloves garlic, minced", "1 tsp grated ginger", "2 tbsp mirin", "1 tbsp sesame oil", "1/4 tsp black pepper", "3 cups water", "1 lb Korean radish, cut into big chunks (or 2 potatoes)", "2 carrots, cut into big chunks", "6 dried shiitake mushrooms, soaked", "6 chestnuts (optional)", "2 green onions, sliced"],
    ["Soak the ribs in cold water for 20 minutes, then drain.", "Put the ribs in a pot, cover with water and boil for 5 minutes. Drain and rinse.", "Mix the soy sauce, brown sugar, honey, pear, onion, garlic, ginger, mirin, sesame oil and pepper.", "Put the ribs back in the pot with the sauce and 3 cups water. Bring to a boil, then cover and simmer for 45 minutes.", "Add the radish, carrots, mushrooms and chestnuts. Simmer partly covered for 30 minutes until tender.", "Uncover and cook 5 minutes more so the sauce gets glossy. Top with green onions."],
    "A celebration dish for holidays and birthdays."),

  d("mackerel", "Pan-Fried Mackerel", "고등어구이", "🐟", ["dinner"], ["korean", "seafood", "healthy", "quick"], 4, 15, 12, 0,
    ["2 mackerel fillets (about 1 lb), cut in half", "1/2 tsp salt", "2 tbsp flour or potato starch", "1 tbsp vegetable oil", "1/2 lemon"],
    ["Pat the fish dry with paper towels and sprinkle both sides with salt. Let it sit for 10 minutes.", "Pat dry again and lightly dust both sides with flour.", "Heat the oil in a nonstick pan over medium heat.", "Cook skin side down for 5 minutes until crispy.", "Flip and cook 4 more minutes.", "Serve with lemon, rice and kimchi."],
    "Mackerel is full of healthy omega-3s. Check for bones before serving to kids."),

  d("dubu-jorim", "Braised Tofu (Dubu Jorim)", "두부조림", "🥢", ["dinner"], ["korean", "side", "veggie"], 4, 5, 15, 1,
    ["14 oz firm tofu", "1/4 tsp salt", "2 tbsp vegetable oil", "3 tbsp soy sauce", "1 tbsp sugar or honey", "1/2 cup water", "2 cloves garlic, minced", "1 tsp gochugaru (optional)", "1 green onion, chopped", "1 tsp sesame oil", "1 tsp toasted sesame seeds"],
    ["Pat the tofu dry and cut it into 1/2-inch slices. Sprinkle with salt.", "Pan-fry in the oil over medium heat for 3 minutes on each side until golden.", "Mix the soy sauce, sugar, water, garlic, gochugaru and green onion.", "Pour the sauce over the tofu. Simmer for 5 minutes, spooning sauce over the top.", "Drizzle with sesame oil and sprinkle with sesame seeds."]),

  d("kongnamul-guk", "Bean Sprout Soup (Kongnamul Guk)", "콩나물국", "🥣", ["dinner", "breakfast"], ["korean", "soup", "healthy", "quick"], 4, 5, 15, 0,
    ["8 oz soybean sprouts, rinsed", "6 cups anchovy broth or water", "2 cloves garlic, minced", "1 tbsp soup soy sauce", "1 tsp salt (or to taste)", "2 green onions, sliced", "1/2 tsp gochugaru (optional)"],
    ["Put the sprouts and broth in a pot, cover, and bring to a boil.", "Keep the lid on and boil for 7 minutes.", "Add the garlic, soup soy sauce and salt. Simmer for 3 more minutes.", "Add the green onions. Taste and add more salt if needed."],
    "A light, clean soup that's great when someone has a cold."),

  d("dakjuk", "Chicken Rice Porridge (Dakjuk)", "닭죽", "🍲", ["breakfast", "dinner"], ["korean", "rice", "soup", "healthy"], 4, 40, 50, 0,
    ["1 lb boneless chicken thighs or breast", "1 cup short-grain rice, soaked 30 minutes", "8 cups water", "4 cloves garlic, whole", "1 inch ginger, sliced", "1/2 onion", "1 carrot, finely diced", "1/2 zucchini, finely diced", "1 tbsp sesame oil", "1 tsp salt (or to taste)", "1 green onion, chopped"],
    ["Simmer the chicken, garlic, ginger and onion in the water for 25 minutes.", "Take out the chicken and shred it. Strain and keep the broth.", "In a pot, stir the soaked rice in the sesame oil for 2 minutes.", "Add 6 cups of the broth. Bring to a boil, then simmer for 20 minutes, stirring often so it doesn't stick.", "Add the chicken, carrot and zucchini. Cook 5 more minutes until thick and creamy.", "Season with salt and top with green onion."],
    "Cozy, gentle porridge for sick days and chilly mornings."),

  d("gyeran-jjim", "Steamed Egg (Gyeran Jjim)", "계란찜", "🥚", ["dinner", "breakfast"], ["korean", "side", "quick", "kid-favorite"], 4, 5, 10, 0,
    ["4 eggs", "1 cup water or chicken broth", "1/2 tsp salt", "1 tsp fish sauce or soy sauce (optional)", "1 green onion, finely chopped", "1/2 tsp sesame oil", "1 tsp toasted sesame seeds"],
    ["Whisk the eggs, water, salt and fish sauce until smooth.", "Pour into a small pot (a Korean earthenware ttukbaegi is perfect) over medium heat.", "Stir gently from the bottom for 2 minutes until it starts to thicken.", "Sprinkle in most of the green onion. Turn the heat to low and cover with a lid.", "Cook for 6 minutes until puffed up and set.", "Drizzle with sesame oil. Top with the rest of the green onion and the sesame seeds."]),

  d("sigeumchi-namul", "Seasoned Spinach", "시금치나물", "🥬", ["dinner"], ["korean", "side", "veggie", "healthy", "quick"], 4, 5, 2, 0,
    ["1 lb spinach", "1 clove garlic, minced", "1 green onion, finely chopped", "1 tsp soup soy sauce (or 1/2 tsp salt)", "1 tbsp sesame oil", "1 tsp toasted sesame seeds"],
    ["Bring a pot of salted water to a boil.", "Blanch the spinach for 30 seconds, then move it to cold water.", "Squeeze the spinach with your hands to get all the water out.", "Cut it into 2 or 3 pieces and loosen it up in a bowl.", "Add everything else and mix with your fingers."],
    "Squeezing and mixing is a great job for little hands!"),

  d("kongnamul-muchim", "Seasoned Bean Sprouts", "콩나물무침", "🌱", ["dinner"], ["korean", "side", "veggie", "healthy", "quick"], 4, 5, 6, 0,
    ["12 oz soybean sprouts", "1/2 tsp salt", "1 clove garlic, minced", "1 green onion, finely chopped", "1 tbsp sesame oil", "1 tsp toasted sesame seeds", "1/2 tsp gochugaru (optional)"],
    ["Rinse the sprouts and pick out any brown ones.", "Put them in a pot with 1/2 cup water and a pinch of salt. Cover and steam over medium-high heat for 6 minutes. No peeking under the lid!", "Drain and spread out to cool for a few minutes.", "Add the salt, garlic, green onion, sesame oil and seeds. Mix gently."]),

  d("gamja-jorim", "Sweet Soy Potatoes (Gamja Jorim)", "감자조림", "🥔", ["dinner", "lunch"], ["korean", "side", "kid-favorite", "lunchbox"], 4, 10, 20, 0,
    ["1 1/2 lb baby potatoes", "1 tbsp vegetable oil", "4 tbsp soy sauce", "2 tbsp sugar", "2 tbsp honey or rice syrup", "1 cup water", "1 clove garlic, minced", "1 tbsp sesame oil", "1 tsp toasted sesame seeds"],
    ["Wash the potatoes. Cut any big ones in half.", "Heat the oil in a pan and cook the potatoes for 4 minutes, stirring.", "Add the water, soy sauce, sugar and garlic. Bring to a boil.", "Cover and simmer for 12 minutes, until a chopstick slides in easily.", "Uncover, add the honey, and cook for 4 minutes until the sauce is sticky and shiny.", "Turn off the heat. Stir in the sesame oil and seeds."]),

  d("hobak-jeon", "Zucchini Pancakes (Hobak Jeon)", "호박전", "🥒", ["dinner", "lunch"], ["korean", "side", "veggie"], 4, 15, 15, 0,
    ["1 large zucchini, cut into 1/4-inch rounds", "1/2 tsp salt", "1/4 cup flour", "2 eggs, beaten with a pinch of salt", "2 tbsp vegetable oil", "2 tbsp soy sauce, for dipping", "1 tsp rice vinegar, for dipping"],
    ["Sprinkle the zucchini with salt and let it sit for 10 minutes. Pat dry.", "Dust each slice in flour, then dip it in the egg.", "Heat the oil in a pan over medium heat.", "Cook the slices for 2 minutes on each side until golden.", "Mix the soy sauce and vinegar for dipping."]),

  d("gyeran-mari", "Rolled Omelet (Gyeran Mari)", "계란말이", "🍳", ["breakfast", "lunch", "dinner"], ["korean", "side", "kid-favorite", "lunchbox", "quick"], 4, 5, 10, 0,
    ["6 eggs", "1/4 tsp salt", "2 tbsp finely chopped carrot", "2 tbsp finely chopped green onion", "1 tbsp vegetable oil", "1 slice cheese (optional)"],
    ["Beat the eggs with the salt. Stir in the carrot and green onion.", "Heat a little oil in a nonstick pan over medium-low heat.", "Pour in a thin layer of egg. When it's almost set, roll it up from one side to the other.", "Push the roll to one side. Pour in more egg and let it flow under the roll.", "When the new layer is almost set, roll again. Repeat until the egg is used up.", "Let it rest for 2 minutes, then slice into rounds."]),

  d("kimbap", "Kimbap", "김밥", "🍙", ["lunch", "dinner"], ["korean", "rice", "lunchbox", "kid-favorite"], 4, 40, 15, 0,
    ["5 sheets roasted seaweed for kimbap (gim)", "5 cups cooked short-grain rice, warm", "1 1/2 tbsp sesame oil", "1/2 tsp salt", "1 tbsp toasted sesame seeds", "3 eggs, beaten with a pinch of salt", "1 carrot, cut into thin matchsticks", "8 oz spinach", "5 strips pickled radish (danmuji)", "5 strips imitation crab or ham", "1 cucumber, cut into long spears (optional)"],
    ["Mix the warm rice with the sesame oil, salt and sesame seeds.", "Cook the beaten egg as a thin omelet, then cut it into long strips.", "Stir-fry the carrot with a pinch of salt for 2 minutes.", "Blanch the spinach for 30 seconds. Squeeze dry and season with a little salt and sesame oil.", "Lay a seaweed sheet shiny side down on a bamboo mat. Spread a thin layer of rice over it, leaving a 1-inch strip bare at the top.", "Line up one of each filling across the middle of the rice.", "Roll it up tightly away from you, pressing as you go. Brush the roll with a little sesame oil.", "Slice into rounds with a sharp, wet knife."],
    "Let kids pick their own fillings. Leftover slices can be dipped in egg and pan-fried the next day."),

  d("jumeokbap", "Rice Balls (Jumeokbap)", "주먹밥", "🍙", ["lunch", "snack"], ["korean", "rice", "lunchbox", "kid-favorite", "quick"], 4, 15, 0, 0,
    ["4 cups cooked short-grain rice, warm", "1 tbsp sesame oil", "1/2 tsp salt", "1 tbsp toasted sesame seeds", "1 cup crushed roasted seaweed snack (gim)", "1 can (5 oz) tuna, drained (optional)", "2 tbsp mayonnaise (optional)"],
    ["Mix the warm rice with the sesame oil, salt and sesame seeds.", "Mix the tuna with the mayonnaise.", "Wet your hands with water. Take a small handful of rice and press it flat.", "Put a spoonful of tuna in the middle and close the rice around it.", "Squeeze it into a ball and roll it in the crushed seaweed."],
    "Kids can make these all by themselves!"),

  d("gyeran-bap", "Egg Rice (Gyeran Bap)", "계란밥", "🍚", ["breakfast", "lunch"], ["korean", "rice", "quick", "kid-favorite"], 2, 2, 5, 0,
    ["2 cups hot cooked rice", "2 eggs", "1 tbsp butter or vegetable oil", "2 tsp soy sauce", "1 tsp sesame oil", "1 sheet roasted seaweed snack (gim), crumbled", "1 tsp toasted sesame seeds"],
    ["Fry the eggs in butter until the edges are crispy.", "Put the hot rice in bowls and top each with an egg.", "Drizzle with soy sauce and sesame oil.", "Sprinkle with crumbled seaweed and sesame seeds, then mix it all up!"]),

  d("yachae-jeon", "Veggie Pancake (Yachae Jeon)", "야채전", "🥞", ["lunch", "dinner", "snack"], ["korean", "veggie", "kid-favorite"], 4, 15, 20, 0,
    ["1 cup all-purpose flour (or Korean pancake mix)", "1 cup cold water", "1 egg", "1/2 tsp salt", "1 small zucchini, cut into matchsticks", "1 carrot, cut into matchsticks", "1/2 onion, thinly sliced", "3 green onions, cut into 2-inch pieces", "4 tbsp vegetable oil", "For dipping:", "2 tbsp soy sauce", "1 tbsp rice vinegar", "1 tsp sugar"],
    ["Whisk the flour, cold water, egg and salt until smooth.", "Stir in all the vegetables.", "Heat 2 tbsp oil in a big nonstick pan over medium-high heat.", "Spread half the batter in a thin, even circle. Cook for 4 minutes until golden underneath.", "Flip and cook 3 minutes more, pressing down. Repeat with the rest.", "Mix the dipping sauce. Cut the pancakes into squares and dip!"]),

  d("goguma", "Roasted Sweet Potatoes (Goguma)", "군고구마", "🍠", ["snack"], ["korean", "healthy", "kid-favorite"], 4, 2, 50, 0,
    ["4 Korean sweet potatoes (goguma) or any sweet potatoes"],
    ["Heat the oven to 400°F. Line a baking sheet with foil.", "Scrub the sweet potatoes and poke each one a few times with a fork.", "Roast for 45 to 60 minutes, turning once, until very soft and the sweet juice bubbles out.", "Let them cool for 5 minutes, then peel and eat!"],
    "Air fryer: 380°F for 35 to 40 minutes."),

  d("spaghetti", "Spaghetti with Meat Sauce", "", "🍝", ["dinner"], ["noodles", "meat", "kid-favorite"], 4, 10, 30, 0,
    ["12 oz spaghetti", "1 lb ground beef or turkey", "1 onion, finely chopped", "1 carrot, finely grated", "3 cloves garlic, minced", "1 jar (24 oz) marinara sauce", "1 tsp dried oregano", "1/2 tsp salt", "1/4 tsp black pepper", "1 tbsp olive oil", "Grated parmesan, for serving"],
    ["Heat the olive oil in a big pan. Cook the onion and carrot for 5 minutes.", "Add the beef and garlic. Cook for 7 minutes, breaking it up, until browned.", "Stir in the marinara, oregano, salt and pepper. Simmer for 15 minutes.", "Meanwhile, cook the spaghetti in salted boiling water as the package says, about 10 minutes. Drain.", "Toss the spaghetti with the sauce and top with parmesan."],
    "The grated carrot hides a veggie in the sauce."),

  d("chicken-tacos", "Chicken Tacos", "", "🌮", ["dinner"], ["meat", "kid-favorite"], 4, 15, 15, 0,
    ["1 1/2 lb boneless chicken thighs", "1 tbsp olive oil", "1 tsp chili powder", "1 tsp ground cumin", "1/2 tsp garlic powder", "1/2 tsp salt", "1 lime", "8 small tortillas", "1 cup shredded lettuce", "1 tomato, diced", "1 avocado, sliced", "1/2 cup shredded cheese", "1/4 cup sour cream (optional)"],
    ["Rub the chicken with the oil, chili powder, cumin, garlic powder and salt.", "Cook in a pan over medium-high heat for 5 to 6 minutes per side until cooked through.", "Rest for 5 minutes, then slice it. Squeeze lime juice over the top.", "Warm the tortillas in a dry pan for 30 seconds per side.", "Set out all the toppings and let everyone build their own tacos."]),

  d("sheet-pan-salmon", "Sheet-Pan Salmon & Veggies", "", "🐟", ["dinner"], ["seafood", "healthy"], 4, 10, 30, 0,
    ["4 salmon fillets (about 6 oz each)", "1 lb baby potatoes, halved", "1 lb broccoli florets", "3 tbsp olive oil, divided", "1 tsp salt, divided", "1/4 tsp black pepper", "2 tbsp honey", "2 tbsp soy sauce", "1 clove garlic, minced", "1 lemon, sliced"],
    ["Heat the oven to 425°F.", "Toss the potatoes with 1 tbsp oil and 1/2 tsp salt. Roast on a baking sheet for 15 minutes.", "Toss the broccoli with 1 tbsp oil and the rest of the salt.", "Mix the honey, soy sauce, garlic and the last 1 tbsp oil.", "Push the potatoes aside. Add the salmon and broccoli. Brush the salmon with the honey sauce and top with lemon slices.", "Roast for 12 minutes until the salmon flakes easily."]),

  d("chicken-noodle-soup", "Chicken Noodle Soup", "", "🍜", ["dinner", "lunch"], ["soup", "noodles", "healthy"], 4, 15, 35, 0,
    ["1 tbsp olive oil", "1 onion, diced", "2 carrots, sliced", "2 celery stalks, sliced", "2 cloves garlic, minced", "8 cups chicken broth", "1 lb boneless chicken breast", "1 tsp dried thyme", "1 bay leaf", "2 cups egg noodles", "1/2 tsp salt", "1/4 tsp black pepper", "2 tbsp chopped parsley"],
    ["Heat the oil in a big pot. Cook the onion, carrots and celery for 6 minutes.", "Add the garlic and cook 1 minute.", "Add the broth, chicken, thyme and bay leaf. Bring to a boil, then simmer for 20 minutes.", "Take out the chicken, shred it with two forks, and put it back.", "Add the noodles and cook for 7 minutes until tender.", "Take out the bay leaf. Season with salt and pepper and sprinkle with parsley."]),

  d("flatbread-pizza", "Flatbread Pizzas", "", "🍕", ["dinner", "lunch"], ["kid-favorite", "quick"], 4, 10, 10, 0,
    ["4 naan or flatbreads", "1 cup pizza or marinara sauce", "2 cups shredded mozzarella", "20 slices pepperoni (optional)", "1/2 bell pepper, diced", "1/2 cup sliced mushrooms", "1 cup baby spinach", "1 tsp dried oregano"],
    ["Heat the oven to 425°F.", "Put the flatbreads on a baking sheet.", "Everyone spreads sauce on their own flatbread and adds cheese.", "Add your favorite toppings. Make a face!", "Bake for 8 to 10 minutes until the cheese is bubbly.", "Sprinkle with oregano. Cool for 2 minutes and slice."]),

  d("grilled-cheese-soup", "Grilled Cheese & Tomato Soup", "", "🥪", ["lunch", "dinner"], ["soup", "kid-favorite"], 4, 5, 25, 0,
    ["8 slices bread", "8 slices cheddar cheese", "3 tbsp butter, softened", "1 tbsp olive oil", "1 onion, chopped", "2 cloves garlic, minced", "1 can (28 oz) crushed tomatoes", "2 cups chicken or vegetable broth", "1 tsp sugar", "1/2 tsp salt", "1/2 cup milk or cream"],
    ["Heat the oil in a pot. Cook the onion for 5 minutes, then the garlic for 1 minute.", "Add the tomatoes, broth, sugar and salt. Simmer for 10 minutes.", "Blend until smooth (careful, it's hot!), then stir in the milk.", "Butter one side of each bread slice. Make sandwiches with cheese inside and butter outside.", "Cook in a pan over medium-low heat for 3 minutes per side until golden and melty.", "Cut into strips for dipping into the soup."]),

  d("pinwheels", "Turkey & Cheese Pinwheels", "", "🌯", ["lunch"], ["lunchbox", "quick"], 4, 10, 0, 0,
    ["4 large flour tortillas", "4 tbsp cream cheese, softened", "8 slices turkey", "4 slices cheese", "1 cup baby spinach", "1/2 cucumber, cut into thin strips"],
    ["Spread 1 tbsp cream cheese all over each tortilla.", "Layer the turkey, cheese, spinach and cucumber on top.", "Roll each one up tightly.", "Cut each roll into 6 pinwheels. Use toothpicks to hold them if needed."]),

  d("pancakes", "Fluffy Pancakes", "", "🥞", ["breakfast"], ["kid-favorite", "treat"], 4, 5, 15, 0,
    ["1 1/2 cups all-purpose flour", "2 tbsp sugar", "2 tsp baking powder", "1/2 tsp salt", "1 1/4 cups milk", "1 egg", "3 tbsp butter, melted", "1 tsp vanilla extract", "1 cup berries, for serving", "Maple syrup, for serving"],
    ["Whisk the flour, sugar, baking powder and salt in a big bowl.", "In another bowl, whisk the milk, egg, melted butter and vanilla.", "Pour the wet into the dry and stir gently. A few lumps are okay!", "Heat a lightly buttered pan over medium heat.", "Pour 1/4 cup batter for each pancake. Flip when you see bubbles, after about 2 minutes.", "Cook 1 more minute. Serve with berries and syrup."]),

  d("oatmeal", "Oatmeal with Fruit", "", "🥣", ["breakfast"], ["healthy", "quick"], 4, 2, 8, 0,
    ["2 cups rolled oats", "3 1/2 cups milk or water", "1/4 tsp salt", "1/2 tsp cinnamon", "2 tbsp honey or maple syrup", "1 banana, sliced", "1 cup berries", "2 tbsp peanut butter or chopped nuts (optional)"],
    ["Bring the milk and salt to a gentle boil in a pot.", "Stir in the oats and cinnamon. Cook for 5 minutes, stirring, until creamy.", "Spoon into bowls.", "Top with banana, berries, a drizzle of honey and peanut butter."]),

  d("scrambled-eggs", "Scrambled Eggs & Toast", "", "🍳", ["breakfast"], ["quick", "kid-favorite"], 4, 2, 5, 0,
    ["8 eggs", "1/4 cup milk", "1/4 tsp salt", "1 tbsp butter", "4 slices bread", "1 tbsp chopped chives (optional)", "1 cup cherry tomatoes or fruit, on the side"],
    ["Whisk the eggs, milk and salt.", "Melt the butter in a nonstick pan over medium-low heat.", "Pour in the eggs. Gently push them around with a spatula until soft and just set, about 3 minutes.", "Toast the bread.", "Serve the eggs on toast with chives, and fruit on the side."]),

  d("smoothie", "Banana Berry Smoothie", "", "🍌", ["breakfast", "snack"], ["healthy", "quick", "kid-favorite"], 2, 5, 0, 0,
    ["1 banana (frozen is extra creamy)", "1 cup frozen berries", "1 cup milk", "1/2 cup plain yogurt", "1 tbsp honey (optional)", "1 handful spinach (optional, you won't taste it!)"],
    ["Put everything in the blender.", "Put the lid on tight and blend for 1 minute until smooth.", "Pour into cups and enjoy!"]),

  d("parfait", "Yogurt Parfait", "", "🍓", ["breakfast", "snack"], ["healthy", "quick", "kid-favorite"], 4, 5, 0, 0,
    ["2 cups plain or vanilla yogurt", "1 cup granola", "2 cups strawberries and blueberries", "2 tbsp honey"],
    ["Wash the fruit. Cut big strawberries into pieces.", "Spoon a layer of yogurt into clear cups.", "Add a layer of fruit, then a layer of granola.", "Repeat, then drizzle honey on top."]),

  d("apple-pb", "Apple Slices & Peanut Butter", "", "🍎", ["snack"], ["healthy", "quick", "kid-favorite"], 4, 5, 0, 0,
    ["2 apples", "4 tbsp peanut butter (or sunflower butter)", "2 tbsp raisins or granola (optional)", "1 tsp lemon juice"],
    ["Wash and core the apples, then cut them into thin slices.", "Toss with lemon juice so they don't turn brown.", "Spread on peanut butter and sprinkle raisins or granola on top."]),

  d("veggies-hummus", "Rainbow Veggies & Hummus", "", "🥕", ["snack"], ["veggie", "healthy", "quick"], 4, 10, 0, 0,
    ["2 carrots, cut into sticks", "1 cucumber, cut into sticks", "1 red bell pepper, cut into strips", "1 cup cherry tomatoes", "1 cup snap peas", "1 cup hummus"],
    ["Wash all the vegetables.", "Cut the carrots, cucumber and pepper into sticks.", "Arrange them like a rainbow around a bowl of hummus.", "Dip and crunch!"]),
];

// Recipes by well-known cooks. Tapping "Add" has Claude read the page.
export const DISCOVER = [
  { name: "Beef Bulgogi", nameKo: "불고기", emoji: "🥩", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/bulgogi/", meal: "dinner" },
  { name: "Japchae", nameKo: "잡채", emoji: "🍜", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/japchae/", meal: "dinner" },
  { name: "Kimchi Jjigae", nameKo: "김치찌개", emoji: "🌶️", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/best-kimchi-jjigae/", meal: "dinner" },
  { name: "Gyeran Jjim (Steamed Egg)", nameKo: "계란찜", emoji: "🥚", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/gyeran-jjim-korean-steamed-egg/", meal: "dinner" },
  { name: "Kimbap", nameKo: "김밥", emoji: "🍙", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/kimbap/", meal: "lunch" },
  { name: "Sausage Kimbap", nameKo: "소세지김밥", emoji: "🌭", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/sausage-kimbap/", meal: "lunch" },
  { name: "Korean Spinach Banchan", nameKo: "시금치나물", emoji: "🥬", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/korean-spinach/", meal: "dinner" },
  { name: "Gamja Jorim (Soy Potatoes)", nameKo: "감자조림", emoji: "🥔", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/korean-potato/", meal: "dinner" },
  { name: "Dakgalbi", nameKo: "닭갈비", emoji: "🍗", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/dakgalbi/", meal: "dinner" },
  { name: "Easy Kimchi Fried Rice", nameKo: "김치볶음밥", emoji: "🍳", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/easy-kimchi-fried-rice/", meal: "dinner" },
  { name: "Soondubu Jjigae", nameKo: "순두부찌개", emoji: "🍲", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/silken-tofu-soup-soondubu-jjigae/", meal: "dinner" },
  { name: "Healthy Kongguksu", nameKo: "콩국수", emoji: "🥛", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/kongguksu/", meal: "lunch" },
  { name: "Spicy Pork Bulgogi", nameKo: "제육볶음", emoji: "🐷", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/pork-bulgogi/", meal: "dinner" },
  { name: "Galbi (Korean BBQ Ribs)", nameKo: "갈비", emoji: "🍖", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/galbi-korean-bbq/", meal: "dinner" },
  { name: "Egg Drop Soup", nameKo: "", emoji: "🥣", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/egg-drop-soup/", meal: "lunch" },
  { name: "Myeolchi Bokkeum (Anchovy)", nameKo: "멸치볶음", emoji: "🐟", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/korean-anchovy/", meal: "dinner" },
  { name: "Bibimbap", nameKo: "비빔밥", emoji: "🥗", by: "Korean Bapsang", url: "https://www.koreanbapsang.com/bibimbap/", meal: "dinner" },
  { name: "Doenjang Jjigae", nameKo: "된장찌개", emoji: "🍲", by: "Korean Bapsang", url: "https://www.koreanbapsang.com/doenjang-jjigae-korean-soy-bean-paste/", meal: "dinner" },
  { name: "Kongnamul Guk (Sprout Soup)", nameKo: "콩나물국", emoji: "🥣", by: "Korean Bapsang", url: "https://www.koreanbapsang.com/kongnamul-guk-soybean-sprout-soup/", meal: "dinner" },
  { name: "Kongnamul Muchim", nameKo: "콩나물무침", emoji: "🌱", by: "Korean Bapsang", url: "https://www.koreanbapsang.com/kongnamul-muchim-seasoned-soybean/", meal: "dinner" },
  { name: "Hobak Jeon (Zucchini)", nameKo: "호박전", emoji: "🥒", by: "Korean Bapsang", url: "https://www.koreanbapsang.com/hobak-jeon-pan-fried-zucchini-in-egg-batter/", meal: "dinner" },
  { name: "Ttukbaegi Gyeranjjim", nameKo: "뚝배기계란찜", emoji: "🥚", by: "Maangchi", url: "https://www.maangchi.com/recipe/ttukbaegi-gyeranjjim", meal: "dinner" },
  { name: "Kongnamulguk", nameKo: "콩나물국", emoji: "🥣", by: "Maangchi", url: "https://www.maangchi.com/recipe/kongnamulguk", meal: "breakfast" },
  { name: "Doenjang-jjigae", nameKo: "된장찌개", emoji: "🍲", by: "Maangchi", url: "https://www.maangchi.com/recipe/doenjang-jjigae", meal: "dinner" },
];
