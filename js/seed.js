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
  { key: "trending", label: "Trending", emoji: "🔥" },
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

const FIRST_STARTERS = [
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

// Added later (batch 2). Families who already use the starter menu get these
// once, automatically; anything they've deleted stays deleted.
const MORE_STARTERS = [
  // ---- More Korean home cooking ----
  d("tteokguk", "Rice Cake Soup (Tteokguk)", "떡국", "🥣", ["dinner", "breakfast"], ["korean", "soup"], 4, 20, 25, 0,
    ["1 1/2 lb sliced rice cakes (tteokguk tteok)", "8 oz beef brisket or stew beef, thinly sliced", "8 cups water or beef broth", "2 tbsp soup soy sauce (guk-ganjang)", "3 cloves garlic, minced", "1 tbsp sesame oil", "2 eggs", "2 green onions, sliced", "1 sheet roasted seaweed (gim), cut into thin strips", "Salt to taste"],
    ["Soak the rice cakes in cold water for 20 minutes.", "Heat the sesame oil in a pot. Cook the beef and garlic with 1 tbsp of the soup soy sauce for 3 minutes.", "Add the water. Bring to a boil, then simmer for 15 minutes. Skim off any foam.", "Drain the rice cakes and add them. Cook for 5 minutes until soft and floating.", "Beat the eggs and slowly pour them in while stirring gently.", "Season with the rest of the soup soy sauce and salt. Top with green onions and seaweed strips."],
    "Eaten on New Year's Day for good luck. Korean kids say each bowl makes you one year older!"),

  d("manduguk", "Dumpling Soup (Manduguk)", "만둣국", "🥟", ["dinner", "lunch"], ["korean", "soup", "quick", "kid-favorite"], 4, 5, 15, 0,
    ["20 frozen Korean dumplings (mandu)", "8 cups chicken or beef broth", "1 tbsp soup soy sauce", "2 cloves garlic, minced", "2 eggs, beaten", "2 green onions, sliced", "1 sheet roasted seaweed (gim), crumbled", "Salt to taste"],
    ["Bring the broth, garlic and soup soy sauce to a boil.", "Add the frozen dumplings. Cook for 6 to 8 minutes, until they float and are hot inside.", "Slowly pour in the beaten eggs and stir gently.", "Taste and add salt.", "Top with green onions and crumbled seaweed."],
    "Add a handful of rice cakes to make tteok-manduguk."),

  d("janchi-guksu", "Warm Noodle Soup (Janchi Guksu)", "잔치국수", "🍜", ["lunch", "dinner"], ["korean", "noodles", "soup", "quick"], 4, 10, 20, 0,
    ["12 oz thin wheat noodles (somyeon)", "8 cups anchovy broth", "2 tbsp soup soy sauce", "1 small zucchini, cut into matchsticks", "1 carrot, cut into matchsticks", "2 eggs", "1 tbsp vegetable oil", "2 green onions, sliced", "1 sheet roasted seaweed (gim), cut into strips", "1 tsp toasted sesame seeds"],
    ["Heat the broth with the soup soy sauce and keep it hot.", "Beat the eggs, cook them as a thin omelet in the oil, and cut into strips.", "Stir-fry the zucchini and carrot with a pinch of salt for 2 minutes.", "Cook the noodles in boiling water for 3 minutes. Drain and rinse with cold water.", "Put noodles in each bowl and pour the hot broth over them.", "Top with the vegetables, egg strips, seaweed, green onions and sesame seeds."],
    "Called 'party noodles' because they're served at weddings and birthdays."),

  d("jjajangmyeon", "Black Bean Noodles (Jjajangmyeon)", "짜장면", "🍜", ["dinner"], ["korean", "noodles", "kid-favorite"], 4, 15, 25, 0,
    ["1 lb wheat noodles (fresh or frozen jjajang or udon noodles)", "8 oz pork shoulder or pork belly, cut into small cubes", "1 onion, diced", "1 potato, diced", "1 zucchini, diced", "1 cup diced cabbage", "4 tbsp Korean black bean paste (chunjang)", "3 tbsp vegetable oil", "1 tbsp sugar", "2 cups water", "2 tbsp potato starch, mixed with 4 tbsp water", "1/2 cucumber, cut into thin strips"],
    ["Fry the black bean paste in 2 tbsp of the oil over medium-low heat for 3 minutes, stirring all the time. Set it aside.", "In a big pan, cook the pork in the rest of the oil for 4 minutes.", "Add the onion, potato, zucchini and cabbage. Cook for 5 minutes.", "Stir in the fried black bean paste and sugar, then add the water. Simmer for 10 minutes until the potato is soft.", "Stir in the starch water and cook 1 minute until the sauce is thick and glossy.", "Cook the noodles as the package says, drain, and pour the sauce on top. Add cucumber strips and mix it all up!"],
    "Korean kids love this for birthdays, moving day, and after a long week."),

  d("gungjung-tteokbokki", "Soy Rice Cakes (Gungjung Tteokbokki)", "궁중떡볶이", "🍢", ["lunch", "dinner", "snack"], ["korean", "kid-favorite"], 4, 15, 15, 0,
    ["1 lb rice cake sticks (garae tteok)", "6 oz beef sirloin, cut into thin strips", "4 shiitake mushrooms, sliced", "1/2 onion, sliced", "1/2 carrot, cut into strips", "1/2 red bell pepper, cut into strips", "2 green onions, cut into 2-inch pieces", "3 tbsp soy sauce", "1 tbsp sugar", "1 tbsp honey", "1 clove garlic, minced", "1/2 cup water", "1 tbsp sesame oil", "1 tbsp vegetable oil", "1 tsp toasted sesame seeds"],
    ["Soak the rice cakes in warm water for 10 minutes. If they are very hard, boil them for 1 minute instead.", "Mix the soy sauce, sugar, honey, garlic and half the sesame oil. Toss the beef in half of it.", "Heat the vegetable oil in a big pan and cook the beef for 2 minutes.", "Add the onion, carrot, mushrooms and pepper. Cook for 3 minutes.", "Add the rice cakes, the rest of the sauce and the water. Cook for 4 minutes, stirring, until the rice cakes are soft and shiny.", "Add the green onions, the rest of the sesame oil and the sesame seeds."],
    "The not-spicy 'royal court' tteokbokki. Perfect for kids who aren't ready for the red kind."),

  d("la-galbi", "LA Galbi (Korean BBQ Short Ribs)", "LA갈비", "🍖", ["dinner"], ["korean", "meat", "kid-favorite"], 4, 20, 10, 0,
    ["3 lb flanken-cut beef short ribs (LA galbi)", "1/2 cup soy sauce", "1/2 cup water", "3 tbsp brown sugar", "2 tbsp honey", "1/2 Asian pear, grated", "1/2 onion, grated", "6 cloves garlic, minced", "1 tsp grated ginger", "2 tbsp mirin", "2 tbsp sesame oil", "1/4 tsp black pepper", "2 green onions, chopped"],
    ["Rinse the ribs in cold water to wash off bone bits, then pat dry.", "Mix everything else except the green onions in a big bowl.", "Add the ribs and turn to coat. Cover and marinate in the fridge for at least 4 hours, or overnight.", "Heat a grill or a large pan over medium-high heat.", "Cook the ribs for 3 to 4 minutes per side until browned and a little charred.", "Cut between the bones with kitchen scissors. Sprinkle with green onions and serve with rice and lettuce."],
    "Marinate it the night before, and dinner takes 10 minutes."),

  d("ganjang-jeyuk", "Soy Pork Stir-Fry (Ganjang Jeyuk)", "간장제육볶음", "🐷", ["dinner"], ["korean", "meat", "quick"], 4, 15, 12, 0,
    ["1 1/2 lb thinly sliced pork shoulder", "1 onion, sliced", "1/2 carrot, sliced", "2 green onions, cut into 2-inch pieces", "4 tbsp soy sauce", "2 tbsp sugar", "1 tbsp mirin", "4 cloves garlic, minced", "1 tsp grated ginger", "1 tbsp sesame oil", "1/4 tsp black pepper", "1 tbsp vegetable oil", "1 tsp toasted sesame seeds"],
    ["Mix the soy sauce, sugar, mirin, garlic, ginger, sesame oil and pepper.", "Toss the pork in the sauce and let it sit for 10 minutes.", "Heat the oil in a big pan over high heat. Cook the pork for 5 minutes.", "Add the onion and carrot and cook 4 more minutes, until the pork is cooked through.", "Add the green onions and cook 1 minute. Sprinkle with sesame seeds."],
    "The mild cousin of spicy jeyuk. Grown-ups can stir gochujang into their own portion."),

  d("samgyetang", "Ginseng Chicken Soup (Samgyetang)", "삼계탕", "🐔", ["dinner"], ["korean", "soup", "healthy"], 4, 20, 70, 0,
    ["2 Cornish hens (about 1 1/2 lb each)", "1/2 cup sweet rice (glutinous rice), soaked 1 hour", "12 cloves garlic, peeled", "4 dried jujubes (Korean dates)", "2 small fresh ginseng roots (optional)", "1 inch ginger, sliced", "12 cups water", "2 green onions, chopped", "Salt and black pepper, for the table"],
    ["Rinse the hens inside and out and pat dry.", "Stuff each hen with soaked rice, 3 garlic cloves and 2 jujubes. Cross the legs and tie them with kitchen string.", "Put the hens in a big pot with the ginseng, ginger, the rest of the garlic and the water.", "Bring to a boil, then cover and simmer for 1 hour, until the chicken is very tender.", "Give each person chicken, some of the rice from inside, and lots of broth.", "Everyone adds salt, pepper and green onions at the table."],
    "Koreans eat this on the hottest summer days, but it's cozy all year."),

  d("gyeran-guk", "Egg Drop Soup (Gyeran Guk)", "계란국", "🥚", ["breakfast", "dinner"], ["korean", "soup", "quick", "kid-favorite"], 4, 5, 10, 0,
    ["6 cups anchovy broth or chicken broth", "1 tbsp soup soy sauce", "1/2 onion, thinly sliced", "3 eggs, beaten with a pinch of salt", "2 green onions, sliced", "1/2 tsp sesame oil", "Salt to taste"],
    ["Bring the broth, soup soy sauce and onion to a boil. Simmer for 5 minutes.", "Turn the heat down. Slowly pour in the eggs in a thin stream while stirring gently.", "Cook 1 minute without stirring so the egg makes soft ribbons.", "Add the green onions and sesame oil. Taste and add salt."]),

  d("sigeumchi-doenjang-guk", "Spinach Soybean Paste Soup", "시금치된장국", "🥬", ["dinner", "breakfast"], ["korean", "soup", "healthy", "quick"], 4, 5, 15, 0,
    ["6 cups anchovy broth or water", "2 tbsp doenjang (Korean soybean paste)", "8 oz spinach", "1/2 onion, sliced", "7 oz soft tofu, cubed (optional)", "2 cloves garlic, minced", "1 green onion, sliced"],
    ["Bring the broth to a boil. Stir in the doenjang until it melts.", "Add the onion and garlic. Simmer for 5 minutes.", "Add the spinach and tofu. Cook for 2 to 3 minutes until the spinach is soft.", "Top with green onion."],
    "Mild, gentle and full of vitamins. A great everyday soup."),

  d("eomuk-bokkeum", "Fish Cake Stir-Fry (Eomuk Bokkeum)", "어묵볶음", "🍢", ["dinner", "lunch"], ["korean", "side", "lunchbox", "quick"], 4, 5, 8, 0,
    ["8 oz Korean fish cakes (eomuk), cut into strips", "1/2 onion, sliced", "1/2 carrot, cut into thin strips", "1 green onion, cut into 2-inch pieces", "2 tbsp soy sauce", "1 tbsp sugar or rice syrup", "1 clove garlic, minced", "2 tbsp water", "1 tbsp vegetable oil", "1 tsp sesame oil", "1 tsp toasted sesame seeds"],
    ["Pour hot water over the fish cakes in a strainer to rinse off the oil.", "Heat the oil in a pan. Cook the onion and carrot for 2 minutes.", "Add the fish cakes and cook for 2 minutes.", "Add the soy sauce, sugar, garlic and water. Stir-fry for 2 minutes until the sauce is soaked up.", "Add the green onion, sesame oil and sesame seeds."]),

  d("myeolchi-bokkeum", "Sweet Anchovy Stir-Fry (Myeolchi Bokkeum)", "멸치볶음", "🐟", ["dinner", "lunch"], ["korean", "side", "lunchbox", "healthy"], 6, 2, 8, 0,
    ["2 cups small dried anchovies (jiri myeolchi)", "1 tbsp vegetable oil", "1 tbsp soy sauce", "1 tbsp sugar", "2 tbsp rice syrup or honey", "1 tbsp water", "1 clove garlic, minced", "1/4 cup sliced almonds or walnuts (optional)", "1 tsp sesame oil", "1 tsp toasted sesame seeds"],
    ["Toast the anchovies in a dry pan over medium heat for 2 minutes. Shake them in a sieve to remove the dust.", "Add the oil and nuts and stir for 1 minute.", "Push everything aside. Add the soy sauce, sugar, water and garlic to the pan and let it bubble for 30 seconds.", "Stir everything together, turn off the heat and stir in the rice syrup.", "Add the sesame oil and sesame seeds. Spread out to cool so it stays crunchy."],
    "Full of calcium. Keeps in the fridge for a week."),

  d("oi-muchim", "Cucumber Salad (Oi Muchim)", "오이무침", "🥒", ["dinner"], ["korean", "side", "veggie", "healthy", "quick"], 4, 15, 0, 0,
    ["2 small cucumbers (Korean or Persian), thinly sliced", "1/2 tsp salt", "1 tbsp rice vinegar", "1 tsp sugar", "1 clove garlic, minced", "1 green onion, chopped", "1 tsp sesame oil", "1 tsp toasted sesame seeds", "1/2 tsp gochugaru (optional, for grown-ups)"],
    ["Toss the cucumber with the salt and let it sit for 10 minutes.", "Pour off the water and pat the cucumber dry gently.", "Add the vinegar, sugar, garlic, green onion, sesame oil and seeds. Mix.", "Grown-ups can sprinkle gochugaru on their own bowl."]),

  d("yubu-chobap", "Tofu Pocket Rice (Yubu Chobap)", "유부초밥", "🍱", ["lunch", "snack"], ["korean", "rice", "lunchbox", "kid-favorite", "quick"], 4, 20, 0, 0,
    ["1 package seasoned fried tofu pockets (yubu, about 14 pockets, with its sauce and topping packets)", "3 cups cooked short-grain rice, warm", "1 tsp sesame oil", "1 tbsp toasted sesame seeds", "2 tbsp finely chopped carrot (optional)"],
    ["Open the package. Gently squeeze extra liquid from the tofu pockets.", "Mix the warm rice with the sauce and topping packets, sesame oil, sesame seeds and carrot.", "Wet your hands. Take a small ball of rice and gently stuff it into a pocket.", "Press the rice down so the pocket is full. Repeat!"],
    "Kids can stuff these all by themselves. Great for picnics."),

  d("tuna-mayo-bowl", "Tuna Mayo Rice Bowl (Chamchi Mayo Deopbap)", "참치마요덮밥", "🍚", ["lunch", "dinner"], ["korean", "rice", "quick", "kid-favorite", "trending"], 2, 5, 10, 0,
    ["2 cups cooked rice, warm", "1 can (5 oz) tuna, drained", "2 tbsp mayonnaise", "2 eggs", "1 tbsp vegetable oil", "1/4 onion, finely chopped", "1 tbsp soy sauce", "1 tsp sugar", "1 sheet roasted seaweed snack (gim), crumbled", "1 tsp toasted sesame seeds"],
    ["Cook the onion in half the oil for 2 minutes. Add the soy sauce and sugar and cook 1 minute.", "Scramble the eggs in the rest of the oil until soft.", "Mix the tuna with the mayonnaise.", "Put rice in bowls. Top with the onion, egg, tuna mayo and crumbled seaweed.", "Sprinkle sesame seeds and mix before eating."],
    "The kid-friendly cousin of the spicy Korean tuna bowl that went viral after Cardi B showed it on Instagram Live. Grown-ups can use canned spicy tuna."),

  d("corn-cheese", "Corn Cheese", "콘치즈", "🌽", ["snack", "dinner"], ["korean", "side", "kid-favorite", "quick"], 4, 5, 10, 0,
    ["1 can (15 oz) sweet corn, drained", "2 tbsp mayonnaise", "1 tbsp sugar", "1 tbsp butter", "1 cup shredded mozzarella", "1 tbsp chopped green onion or parsley (optional)"],
    ["Mix the corn, mayonnaise and sugar.", "Melt the butter in an oven-safe skillet over medium heat. Add the corn and cook for 3 minutes.", "Sprinkle the mozzarella over the top.", "Cover with a lid for 3 minutes until melted, or put the skillet under the broiler for 2 minutes until bubbly.", "Top with green onion and eat while it's hot and stretchy!"],
    "A favorite side at Korean BBQ restaurants."),

  d("hotteok", "Sweet Pancakes (Hotteok)", "호떡", "🥞", ["snack"], ["korean", "treat"], 8, 75, 15, 0,
    ["2 cups all-purpose flour", "1 tsp instant yeast", "1 tbsp sugar", "1/2 tsp salt", "3/4 cup warm milk", "2 tbsp vegetable oil, plus more for frying", "For the filling:", "1/2 cup brown sugar", "1 tsp cinnamon", "3 tbsp chopped walnuts or peanuts"],
    ["Mix the flour, yeast, sugar and salt. Stir in the warm milk and 2 tbsp oil to make a soft, sticky dough.", "Cover and let it rise in a warm place for 1 hour, until doubled.", "Mix the brown sugar, cinnamon and nuts.", "Oil your hands. Flatten a piece of dough, put 1 tbsp filling in the middle and pinch it closed.", "Fry in a little oil over medium heat for 1 minute, then flip and press flat with a spatula.", "Cook 2 to 3 minutes per side until golden. Careful, the filling is very hot!"],
    "A winter street-food treat. Let them cool a minute before biting!"),

  // ---- More American family dinners ----
  d("turkey-chili", "Mild Turkey Chili", "", "🫘", ["dinner"], ["meat", "soup", "healthy"], 6, 10, 35, 0,
    ["1 tbsp olive oil", "1 lb ground turkey", "1 onion, diced", "1 red bell pepper, diced", "3 cloves garlic, minced", "1 tbsp mild chili powder", "2 tsp ground cumin", "1 tsp dried oregano", "1 tsp salt", "1 can (28 oz) crushed tomatoes", "2 cans (15 oz each) kidney beans, drained and rinsed", "1 cup frozen corn", "1 cup chicken broth", "1/2 cup shredded cheddar, for topping", "Sour cream, for topping"],
    ["Heat the oil in a big pot. Cook the onion and pepper for 5 minutes.", "Add the turkey and garlic. Cook for 6 minutes, breaking it up, until no longer pink.", "Stir in the chili powder, cumin, oregano and salt for 1 minute.", "Add the tomatoes, beans, corn and broth. Bring to a boil.", "Lower the heat and simmer for 20 minutes, stirring now and then.", "Serve with cheese and sour cream on top."],
    "Freezes well. Grown-ups can add hot sauce."),

  d("chicken-tenders", "Baked Chicken Tenders", "", "🍗", ["dinner", "lunch"], ["meat", "kid-favorite"], 4, 15, 20, 0,
    ["1 1/2 lb chicken tenders", "1/2 cup flour", "2 eggs, beaten", "1 1/2 cups panko breadcrumbs", "1/2 cup grated parmesan", "1 tsp garlic powder", "1 tsp paprika", "1/2 tsp salt", "2 tbsp olive oil"],
    ["Heat the oven to 425°F. Line a baking sheet with parchment.", "Toast the panko with the olive oil in a dry pan over medium heat for 3 minutes until golden. Let it cool, then mix in the parmesan, garlic powder, paprika and salt.", "Set out three bowls: flour, beaten eggs, and the crumb mix.", "Dip each tender in flour, then egg, then press it into the crumbs.", "Lay them on the baking sheet and bake for 15 to 18 minutes until cooked through.", "Serve with honey mustard or ketchup for dipping."],
    "Toasting the crumbs first makes them golden and crunchy without frying."),

  d("mac-and-cheese", "Stovetop Mac & Cheese", "", "🧀", ["dinner", "lunch"], ["noodles", "kid-favorite", "quick"], 4, 5, 15, 0,
    ["12 oz elbow macaroni", "2 tbsp butter", "2 tbsp flour", "2 cups milk", "2 cups shredded cheddar", "1/2 tsp salt", "1/4 tsp garlic powder", "1 cup frozen peas or chopped broccoli (optional)"],
    ["Cook the macaroni in salted boiling water as the package says. Add the peas for the last 2 minutes. Drain.", "In the same pot, melt the butter. Stir in the flour for 1 minute.", "Slowly whisk in the milk. Cook, stirring, for 4 minutes until it thickens.", "Turn off the heat. Stir in the cheese, salt and garlic powder until smooth.", "Stir in the pasta and peas."]),

  d("sloppy-joes", "Sloppy Joes", "", "🍔", ["dinner"], ["meat", "kid-favorite", "quick"], 4, 10, 20, 0,
    ["1 lb lean ground beef or turkey", "1 onion, finely chopped", "1 green bell pepper, finely chopped", "2 cloves garlic, minced", "1 can (8 oz) tomato sauce", "2 tbsp tomato paste", "1 tbsp brown sugar", "1 tbsp Worcestershire sauce", "1 tsp yellow mustard", "1/2 tsp salt", "4 hamburger buns"],
    ["Cook the beef, onion and pepper in a big pan for 8 minutes, breaking up the meat.", "Add the garlic and cook 1 minute.", "Stir in the tomato sauce, tomato paste, brown sugar, Worcestershire, mustard and salt.", "Simmer for 10 minutes until thick.", "Toast the buns and spoon the filling on. Have napkins ready!"]),

  d("chicken-fajitas", "Sheet-Pan Chicken Fajitas", "", "🫑", ["dinner"], ["meat", "healthy"], 4, 15, 25, 0,
    ["1 1/2 lb chicken breast, cut into strips", "3 bell peppers, sliced", "1 onion, sliced", "2 tbsp olive oil", "2 tsp chili powder", "1 tsp ground cumin", "1 tsp paprika", "1/2 tsp garlic powder", "1 tsp salt", "1 lime", "8 small flour tortillas", "1 avocado, sliced", "1/2 cup sour cream or plain yogurt"],
    ["Heat the oven to 425°F.", "Toss the chicken, peppers and onion with the oil and spices on a big baking sheet. Spread them out.", "Roast for 20 to 25 minutes, stirring once, until the chicken is cooked and the veggies are soft.", "Squeeze lime juice over everything.", "Warm the tortillas and let everyone fill their own."]),

  d("mini-meatloaves", "Mini Meatloaves", "", "🍖", ["dinner"], ["meat", "kid-favorite"], 4, 15, 20, 0,
    ["1 1/2 lb ground beef", "1 egg", "1/2 cup breadcrumbs", "1/4 cup milk", "1/2 onion, grated", "1 carrot, finely grated", "1 tsp salt", "1/2 tsp garlic powder", "1/4 tsp black pepper", "For the glaze:", "1/3 cup ketchup", "1 tbsp brown sugar", "1 tsp yellow mustard"],
    ["Heat the oven to 400°F. Grease a 12-cup muffin tin.", "Mix the beef, egg, breadcrumbs, milk, onion, carrot, salt, garlic powder and pepper with clean hands. Don't squeeze too hard!", "Press the mixture into the muffin cups.", "Stir the glaze together and spoon it on top.", "Bake for 18 to 20 minutes until cooked through."],
    "Little loaves cook in a third of the time of a big one."),

  d("teriyaki-chicken", "Teriyaki Chicken & Broccoli", "", "🥦", ["dinner"], ["meat", "healthy", "quick"], 4, 10, 15, 0,
    ["1 1/2 lb boneless chicken thighs, cut into bite-size pieces", "1 lb broccoli florets", "1 tbsp vegetable oil", "For the sauce:", "1/3 cup soy sauce", "1/4 cup water", "2 tbsp honey", "1 tbsp brown sugar", "1 tbsp rice vinegar", "2 cloves garlic, minced", "1 tsp grated ginger", "1 tbsp cornstarch", "1 tsp toasted sesame seeds"],
    ["Whisk the sauce ingredients together.", "Steam or microwave the broccoli for 3 minutes until bright green.", "Heat the oil in a big pan over medium-high heat. Cook the chicken for 7 minutes until browned and cooked through.", "Pour in the sauce and stir for 2 minutes until thick and shiny.", "Add the broccoli and toss. Sprinkle sesame seeds and serve over rice."]),

  d("beef-stew", "Beef Stew", "", "🍲", ["dinner"], ["meat", "soup"], 6, 20, 120, 0,
    ["2 lb beef chuck, cut into 1 1/2-inch cubes", "1 tsp salt", "1/2 tsp black pepper", "2 tbsp flour", "2 tbsp olive oil", "1 onion, chopped", "3 cloves garlic, minced", "2 tbsp tomato paste", "4 cups beef broth", "1 tsp dried thyme", "2 bay leaves", "4 carrots, cut into chunks", "1 1/2 lb potatoes, cut into chunks", "1 cup frozen peas"],
    ["Season the beef with salt and pepper and toss with the flour.", "Brown the beef in the oil in a big pot, in batches, about 4 minutes per batch. Set aside.", "Cook the onion for 4 minutes, then the garlic and tomato paste for 1 minute.", "Put the beef back. Add the broth, thyme and bay leaves. Bring to a boil, then cover and simmer for 1 hour.", "Add the carrots and potatoes. Simmer 40 more minutes until everything is tender.", "Stir in the peas for the last 5 minutes. Take out the bay leaves."],
    "Even better the next day. Slow cooker: 8 hours on low."),

  d("fish-sticks", "Homemade Fish Sticks", "", "🐟", ["dinner"], ["seafood", "healthy", "kid-favorite"], 4, 15, 12, 0,
    ["1 1/2 lb cod or other white fish, cut into strips", "1/2 cup flour", "2 eggs, beaten", "1 1/2 cups panko breadcrumbs", "1/4 cup grated parmesan", "1/2 tsp salt", "1/2 tsp paprika", "2 tbsp olive oil", "1 lemon, cut into wedges"],
    ["Heat the oven to 450°F. Line a baking sheet with parchment and brush it with a little oil.", "Mix the panko, parmesan, salt and paprika with the rest of the oil.", "Pat the fish dry. Dip each strip in flour, then egg, then the crumbs.", "Lay them on the baking sheet.", "Bake for 10 to 12 minutes until golden and the fish flakes easily.", "Serve with lemon wedges and tartar sauce or ketchup."],
    "A mild white fish is an easy way to start kids on seafood."),

  d("cheeseburgers", "Family Cheeseburgers", "", "🍔", ["dinner"], ["meat", "kid-favorite", "quick"], 4, 10, 10, 0,
    ["1 1/2 lb ground beef (80/20)", "1 tsp salt", "1/2 tsp black pepper", "4 slices cheddar cheese", "4 hamburger buns", "4 lettuce leaves", "1 tomato, sliced", "Ketchup, for serving", "Mustard, for serving"],
    ["Divide the beef into 4 balls and flatten into patties a little wider than the buns. Press a dent in the middle of each.", "Sprinkle both sides with salt and pepper.", "Cook in a hot pan or on the grill for 4 minutes. Flip.", "Add a slice of cheese and cook 3 more minutes.", "Toast the buns and build your burgers with lettuce, tomato and sauce."],
    "The dent in the middle keeps burgers flat instead of puffy."),

  d("baked-potato-bar", "Baked Potato Bar", "", "🥔", ["dinner", "lunch"], ["veggie", "kid-favorite"], 4, 10, 60, 0,
    ["4 large russet potatoes", "1 tbsp olive oil", "1/2 tsp salt", "2 cups broccoli florets, steamed", "1 cup shredded cheddar", "1/2 cup sour cream or plain yogurt", "4 slices bacon, cooked and crumbled (optional)", "2 green onions, sliced", "2 tbsp butter"],
    ["Heat the oven to 425°F.", "Scrub the potatoes, poke them with a fork, rub with oil and sprinkle with salt.", "Bake right on the oven rack for 50 to 60 minutes until a fork slides in easily.", "Set out all the toppings in little bowls.", "Split each potato open, fluff with a fork, and let everyone build their own."]),

  d("quesadillas", "Cheese & Bean Quesadillas", "", "🫓", ["lunch", "dinner", "snack"], ["veggie", "quick", "kid-favorite"], 4, 5, 10, 0,
    ["8 small flour tortillas", "2 cups shredded cheddar or Monterey Jack", "1 can (15 oz) black beans, drained and rinsed", "1 cup frozen corn, thawed", "1 tsp vegetable oil", "Salsa, for dipping", "Sour cream, for dipping"],
    ["Sprinkle cheese, beans and corn over half of each tortilla. Fold in half.", "Heat a little oil in a pan over medium heat.", "Cook the quesadillas for 2 to 3 minutes per side until golden and the cheese melts.", "Cut into triangles and serve with salsa and sour cream."]),

  d("breakfast-burritos", "Make-Ahead Breakfast Burritos", "", "🌯", ["breakfast"], ["lunchbox"], 6, 15, 15, 0,
    ["8 eggs", "1/4 cup milk", "1/2 tsp salt", "1 tbsp butter", "1 cup cooked diced potatoes or hash browns", "1 cup shredded cheddar", "6 slices ham, chopped (optional)", "6 large flour tortillas", "Salsa, for serving"],
    ["Whisk the eggs, milk and salt. Scramble in the butter until just set.", "Warm the potatoes in the same pan.", "Lay out the tortillas. Add eggs, potatoes, ham and cheese down the middle.", "Fold in the sides and roll up tightly.", "Eat now, or wrap each one in foil and freeze. Reheat a frozen burrito (foil off!) in the microwave for about 2 minutes."],
    "Make a batch on Sunday for quick school mornings."),

  d("french-toast", "French Toast", "", "🍞", ["breakfast"], ["kid-favorite", "treat"], 4, 5, 15, 0,
    ["4 eggs", "1 cup milk", "1 tbsp sugar", "1 tsp vanilla extract", "1/2 tsp cinnamon", "1 pinch salt", "8 slices thick bread (day-old is best)", "2 tbsp butter", "1 cup berries, for serving", "Maple syrup, for serving"],
    ["Whisk the eggs, milk, sugar, vanilla, cinnamon and salt in a shallow dish.", "Melt a little butter in a pan over medium heat.", "Dip each slice of bread in the egg mix for a few seconds per side.", "Cook for 2 to 3 minutes per side until golden.", "Serve with berries and maple syrup."]),

  d("banana-oat-muffins", "Banana Oat Muffins", "", "🧁", ["breakfast", "snack"], ["healthy", "kid-favorite", "lunchbox"], 12, 10, 20, 0,
    ["3 ripe bananas, mashed", "2 eggs", "1/3 cup honey or maple syrup", "1/3 cup melted coconut oil or vegetable oil", "1/2 cup plain yogurt", "1 tsp vanilla extract", "1 1/2 cups whole wheat flour", "1 cup rolled oats", "1 tsp baking soda", "1 tsp cinnamon", "1/4 tsp salt", "1/2 cup blueberries or chocolate chips (optional)"],
    ["Heat the oven to 350°F. Line a 12-cup muffin tin with paper liners.", "Mix the bananas, eggs, honey, oil, yogurt and vanilla in a big bowl.", "In another bowl, mix the flour, oats, baking soda, cinnamon and salt.", "Stir the dry into the wet until just combined. Fold in the blueberries.", "Fill the muffin cups and bake for 18 to 22 minutes, until a toothpick comes out clean."],
    "Freeze extras and pop one in a lunchbox in the morning."),

  d("veggie-egg-muffins", "Veggie Egg Muffins", "", "🥚", ["breakfast", "snack"], ["healthy", "lunchbox"], 6, 10, 20, 0,
    ["10 eggs", "1/4 cup milk", "1/2 tsp salt", "1/4 tsp black pepper", "1 cup baby spinach, chopped", "1/2 red bell pepper, finely diced", "1/2 cup diced ham (optional)", "3/4 cup shredded cheddar"],
    ["Heat the oven to 350°F. Grease a 12-cup muffin tin well.", "Whisk the eggs, milk, salt and pepper.", "Divide the spinach, pepper, ham and cheese among the cups.", "Pour the egg mix over the top, filling each cup about 3/4 full.", "Bake for 18 to 22 minutes until set in the middle."],
    "They keep in the fridge for 4 days. Warm one for 30 seconds in the microwave."),

  d("ants-on-a-log", "Ants on a Log", "", "🐜", ["snack"], ["healthy", "quick", "kid-favorite"], 4, 10, 0, 0,
    ["4 celery stalks", "1/4 cup peanut butter or cream cheese", "2 tbsp raisins"],
    ["Wash the celery and cut each stalk into 3 pieces.", "Spread peanut butter in the groove of each piece.", "Line up raisins on top like ants marching along a log!"]),

  // ---- Trending on TikTok and Instagram, and liked by people who made them ----
  d("salmon-rice-bowl", "Salmon Rice Bowl", "", "🍣", ["lunch", "dinner"], ["seafood", "rice", "healthy", "quick", "trending"], 2, 5, 15, 0,
    ["2 salmon fillets (about 5 oz each)", "1/2 tsp salt", "2 cups cooked short-grain rice", "2 tbsp soy sauce", "2 tbsp mayonnaise (Kewpie if you have it)", "1 tsp sriracha (optional, for grown-ups)", "1 avocado, sliced", "1 cucumber, sliced", "1 pack roasted seaweed snacks (gim)", "1 tsp toasted sesame seeds"],
    ["Heat the oven to 400°F. Sprinkle the salmon with salt and bake for 12 to 15 minutes until it flakes.", "Flake the salmon into a bowl with a fork and add the rice.", "Drizzle with soy sauce and mayo (and sriracha for grown-ups), then mix it all up.", "Top with avocado, cucumber and sesame seeds.", "Scoop bites onto seaweed squares and eat them like little tacos!"],
    "Went viral on TikTok from Emily Mariko. Good Morning America, Food52 and the Daily Dot made it and said it lives up to the hype, and it's still her most popular recipe years later. Her leftover trick: warm the rice with an ice cube on top under parchment."),

  d("rice-paper-dumplings", "Crispy Rice Paper Dumplings", "", "🥟", ["lunch", "dinner", "snack"], ["veggie", "trending", "kid-favorite"], 4, 25, 15, 0,
    ["12 sheets round rice paper", "7 oz firm tofu, crumbled", "2 cups shredded cabbage", "4 shiitake mushrooms, finely chopped", "1 carrot, shredded", "2 green onions, chopped", "1 clove garlic, minced", "2 tbsp soy sauce", "1 tsp sesame oil", "2 tbsp vegetable oil", "For dipping:", "2 tbsp soy sauce", "1 tbsp rice vinegar"],
    ["Cook the cabbage, mushrooms, carrot and garlic in 1 tbsp of the oil for 4 minutes. Stir in the tofu, soy sauce, sesame oil and green onions. Let it cool a little.", "Dip one rice paper sheet in warm water for 2 seconds and lay it on a board. Dip a second sheet and lay it on top.", "Put 2 spoonfuls of filling in the middle. Fold in the sides like a little package.", "Heat the rest of the oil in a nonstick pan over medium heat.", "Cook the dumplings seam side down for 3 to 4 minutes per side until golden and crispy.", "Mix the soy sauce and vinegar for dipping."],
    "Viral from Okonomi Kitchen (over 10 million views). Testers who made them more than once say two layers of rice paper make the outside crispy and the inside chewy."),

  d("dumpling-lasagna", "Dumpling Lasagna", "", "🥘", ["dinner"], ["meat", "trending"], 4, 20, 15, 0,
    ["1 lb ground pork or chicken", "2 green onions, finely chopped", "1 tbsp grated ginger", "2 cloves garlic, minced", "2 tbsp soy sauce", "1 tsp sesame oil", "1 tsp sugar", "1/4 tsp black pepper", "1 package (about 40) round dumpling wrappers", "1 cup chicken broth", "1 tbsp vegetable oil", "For drizzling:", "2 tbsp soy sauce", "1 tbsp rice vinegar", "1 tsp chili crisp (optional, for grown-ups)"],
    ["Mix the pork, green onions, ginger, garlic, soy sauce, sesame oil, sugar and pepper.", "Oil a 10-inch nonstick skillet. Cover the bottom with dumpling wrappers, overlapping them.", "Spread a thin layer of filling on top. Repeat 3 more times, ending with wrappers.", "Pour the broth around the edges.", "Cover and cook over medium-low heat for 15 minutes, until the filling is cooked through.", "Mix the drizzle, spoon it over the top, and cut into squares."],
    "A 2026 TikTok hit: all the flavor of dumplings without folding a single one. People who made it loved it, though so far the reviews are from food bloggers, not independent testers."),

  d("gochujang-butter-noodles", "Gochujang Butter Noodles", "", "🍝", ["lunch", "dinner"], ["korean", "noodles", "quick", "trending"], 4, 5, 12, 1,
    ["12 oz spaghetti or thick rice noodles", "3 tbsp butter", "2 cloves garlic, minced", "1 to 2 tbsp gochujang (less for kids)", "1 tbsp honey", "1 tbsp soy sauce", "1/4 cup grated parmesan", "1 green onion, sliced", "1 tsp toasted sesame seeds"],
    ["Cook the noodles as the package says. Save 1/2 cup of the cooking water, then drain.", "Melt the butter in the pot over medium-low heat. Add the garlic and cook for 1 minute.", "Stir in the gochujang, honey and soy sauce.", "Add the noodles, parmesan and a splash of the pasta water. Toss until glossy, adding more water if it's thick.", "Top with green onion and sesame seeds."],
    "Spread on TikTok in 2026, and a Korean convenience-store chain even sold a version. Home cooks describe it as spicy, savory and a little sweet. Start with 1 tbsp gochujang for kids."),

  d("marry-me-chicken", "Marry Me Chicken", "", "💍", ["dinner"], ["meat", "trending"], 4, 10, 25, 0,
    ["1 1/2 lb boneless chicken breasts, sliced in half into thin cutlets", "1/2 tsp salt", "1/4 tsp black pepper", "2 tbsp flour", "2 tbsp olive oil", "3 cloves garlic, minced", "1/2 cup chicken broth", "3/4 cup half-and-half or heavy cream", "1/2 cup grated parmesan", "1/3 cup sun-dried tomatoes, chopped", "1 tsp dried Italian herbs", "2 cups baby spinach", "Fresh basil, for serving"],
    ["Season the chicken with salt and pepper and dust it with flour.", "Brown it in the oil over medium-high heat, 4 to 5 minutes per side. Set aside.", "Lower the heat. Cook the garlic for 30 seconds, then add the broth, cream, parmesan, sun-dried tomatoes and herbs.", "Simmer for 3 minutes until a little thick. Stir in the spinach until it wilts.", "Put the chicken back and spoon the sauce over it. Simmer 5 minutes until cooked through.", "Top with basil. Serve with pasta, rice or crusty bread."],
    "Started at Delish and has had more than 90 million TikTok views. Reviews are glowing but mostly from food bloggers. It's rich, so serve it with lots of veggies."),

  d("cottage-cheese-flatbread", "Cottage Cheese Flatbread", "", "🫓", ["breakfast", "lunch", "snack"], ["healthy", "lunchbox", "trending"], 2, 5, 35, 0,
    ["1 cup cottage cheese", "2 eggs", "1/2 tsp Italian seasoning or everything bagel seasoning", "1/4 cup shredded mozzarella (optional)"],
    ["Heat the oven to 350°F. Line a baking sheet with parchment paper (not foil).", "Blend the cottage cheese and eggs until smooth.", "Pour onto the parchment and spread into a thin rectangle, about 1/4 inch thick. Sprinkle with seasoning and cheese.", "Bake for 30 to 40 minutes until golden and dry on top. Don't take it out early or it will crumble.", "Cool for 10 minutes, then peel it off the paper.", "Fill it like a wrap (turkey, cheese, lettuce) or top it like a pizza and bake 5 more minutes."],
    "A high-protein TikTok favorite. Parents who make it say their kids like it as a wrap or a pizza base."),

  d("baked-feta-pasta", "Baked Feta Pasta", "", "🍅", ["dinner"], ["veggie", "noodles", "trending", "kid-favorite"], 4, 5, 35, 0,
    ["2 pints cherry tomatoes", "1 block (8 oz) feta cheese", "1/3 cup olive oil", "3 cloves garlic, smashed", "1/2 tsp salt", "1/4 tsp black pepper", "1/2 tsp dried oregano", "12 oz short pasta (like rotini or penne)", "1 handful fresh basil", "2 cups baby spinach (optional)"],
    ["Heat the oven to 400°F.", "Put the tomatoes and garlic in a baking dish. Toss with half the olive oil, the salt, pepper and oregano.", "Set the feta block in the middle and drizzle the rest of the oil over it.", "Bake for 30 to 35 minutes until the tomatoes burst and the feta is soft and golden.", "Meanwhile, cook the pasta. Save 1/2 cup of the cooking water, then drain.", "Mash the feta and tomatoes into a creamy sauce. Stir in the pasta, spinach and basil, adding pasta water if needed."],
    "The original 'TikTok pasta'. The Kitchn, Time Out and student taste-testers made it and said it lives up to the hype."),
];

// The creators' own videos for the trending dishes (our recipes are home versions of theirs).
const STARTER_VIDEOS = {
  "salmon-rice-bowl": "https://www.tiktok.com/@emilymariko/video/7010506729012219141",
  "rice-paper-dumplings": "https://www.tiktok.com/@okonomikitchen/video/7395975931912883461",
  "dumpling-lasagna": "https://www.tiktok.com/@myhealthydish/video/7600576064703728951",
  "gochujang-butter-noodles": "https://www.tiktok.com/@misojenkitchen/video/7221624675728903470",
  "marry-me-chicken": "https://www.tiktok.com/@delish/video/7063524229110566191",
  "cottage-cheese-flatbread": "https://www.tiktok.com/@kalejunkie/video/7371570213797563691",
  "baked-feta-pasta": "https://www.tiktok.com/@grilledcheesesocial/video/6922946148760030469",
};

// batch: when a starter was added to the app. Families who use the starter menu
// get each new batch once (see startersToAdd).
export const STARTER_DISHES = [
  ...FIRST_STARTERS.map((dish) => ({ ...dish, batch: 1 })),
  ...MORE_STARTERS.map((dish) => ({ ...dish, batch: 2 })),
].map((dish) => ({ ...dish, videoUrl: STARTER_VIDEOS[dish.seedKey] || "" }));
export const LATEST_STARTER_BATCH = 2;

/**
 * The starters a family hasn't been given yet. starterBatch is the newest batch
 * they've had; before batches existed it wasn't saved, so a family with any
 * starter dish had batch 1, and one without any said no to starters.
 * Dishes they already have (or deleted from an earlier batch) aren't returned.
 */
export function startersToAdd({ starterBatch, haveSeedKeys }) {
  const seen = starterBatch ?? (haveSeedKeys.size ? 1 : LATEST_STARTER_BATCH);
  return STARTER_DISHES.filter((dish) => dish.batch > seen && !haveSeedKeys.has(dish.seedKey));
}

// Recipes by well-known cooks. Tapping "Add" has Claude read the page.
// cuisine picks the Discover tab; note is what people who made it said.
const korean = (by, list) => list.map(([name, nameKo, emoji, url, meal]) => ({ name, nameKo, emoji, by, url, meal, cuisine: "korean" }));
const american = (by, list) => list.map(([name, emoji, url, meal]) => ({ name, nameKo: "", emoji, by, url, meal, cuisine: "american" }));

export const DISCOVER = [
  // ---- 🔥 Trending: viral on TikTok and Instagram, and liked by people who made them ----
  { cuisine: "trending", name: "Salmon Rice Bowl", nameKo: "", emoji: "🍣", by: "Emily Mariko", url: "https://www.tiktok.com/@emilymariko/video/7010506729012219141", meal: "lunch",
    note: "Good Morning America, Food52 and the Daily Dot made it: worth the hype." },
  { cuisine: "trending", name: "Crispy Rice Paper Dumplings", nameKo: "", emoji: "🥟", by: "Okonomi Kitchen", url: "https://www.tiktok.com/@okonomikitchen/video/7395975931912883461", meal: "dinner",
    note: "Over 10 million views. Testers: crispy outside, chewy inside." },
  { cuisine: "trending", name: "Dumpling Lasagna", nameKo: "", emoji: "🥘", by: "The Modern Nonna", url: "https://themodernnonna.com/viral-pork-dumpling-lasagna/", meal: "dinner",
    note: "Dumpling flavor with no folding. Bloggers loved it." },
  { cuisine: "trending", name: "Gochujang Butter Noodles", nameKo: "", emoji: "🍝", by: "Nomadette", url: "https://nomadette.com/gochujang-buttered-noodles/", meal: "dinner",
    note: "Spicy, savory and a little sweet. Use less gochujang for kids." },
  { cuisine: "trending", name: "Marry Me Chicken", nameKo: "", emoji: "💍", by: "40 Aprons", url: "https://40aprons.com/marry-me-chicken-recipe/", meal: "dinner",
    note: "90+ million TikTok views. Rich and creamy." },
  { cuisine: "trending", name: "Cottage Cheese Flatbread", nameKo: "", emoji: "🫓", by: "Kalejunkie", url: "https://www.tiktok.com/@kalejunkie/video/7371570213797563691", meal: "lunch",
    note: "High protein and sturdy. Parents say kids like it as a wrap or pizza." },
  { cuisine: "trending", name: "Baked Feta Pasta", nameKo: "", emoji: "🍅", by: "Grilled Cheese Social", url: "https://www.tiktok.com/@grilledcheesesocial/video/6922946148760030469", meal: "dinner",
    note: "The original TikTok pasta. The Kitchn and Time Out said it lives up to the hype." },
  { cuisine: "trending", name: "Korean Spicy Tuna Rice", nameKo: "참치마요", emoji: "🍚", by: "My Korean Kitchen", url: "https://mykoreankitchen.com/korean-spicy-tuna/", meal: "lunch",
    note: "Went viral after Cardi B showed it on Instagram Live." },

  // ---- 🇰🇷 Korean ----
  ...korean("Seonkyoung Longest", [
    ["Beef Bulgogi", "불고기", "🥩", "https://seonkyounglongest.com/bulgogi/", "dinner"],
    ["Japchae", "잡채", "🍜", "https://seonkyounglongest.com/japchae/", "dinner"],
    ["Kimchi Jjigae", "김치찌개", "🌶️", "https://seonkyounglongest.com/best-kimchi-jjigae/", "dinner"],
    ["Gyeran Jjim (Steamed Egg)", "계란찜", "🥚", "https://seonkyounglongest.com/gyeran-jjim-korean-steamed-egg/", "dinner"],
    ["Gyeran Mari (Egg Roll)", "계란말이", "🍳", "https://seonkyounglongest.com/gyeran-mari-korean-egg-roll/", "breakfast"],
    ["Kimbap", "김밥", "🍙", "https://seonkyounglongest.com/kimbap/", "lunch"],
    ["Sausage Kimbap", "소세지김밥", "🌭", "https://seonkyounglongest.com/sausage-kimbap/", "lunch"],
    ["Korean Spinach Banchan", "시금치나물", "🥬", "https://seonkyounglongest.com/korean-spinach/", "dinner"],
    ["Gamja Jorim (Soy Potatoes)", "감자조림", "🥔", "https://seonkyounglongest.com/korean-potato/", "dinner"],
    ["Dakgalbi", "닭갈비", "🍗", "https://seonkyounglongest.com/dakgalbi/", "dinner"],
    ["Easy Kimchi Fried Rice", "김치볶음밥", "🍳", "https://seonkyounglongest.com/easy-kimchi-fried-rice/", "dinner"],
    ["Soondubu Jjigae", "순두부찌개", "🍲", "https://seonkyounglongest.com/silken-tofu-soup-soondubu-jjigae/", "dinner"],
    ["Healthy Kongguksu", "콩국수", "🥛", "https://seonkyounglongest.com/kongguksu/", "lunch"],
    ["Spicy Pork Bulgogi", "제육볶음", "🐷", "https://seonkyounglongest.com/pork-bulgogi/", "dinner"],
    ["Galbi (Korean BBQ Ribs)", "갈비", "🍖", "https://seonkyounglongest.com/galbi-korean-bbq/", "dinner"],
    ["Best Galbi", "갈비", "🍖", "https://seonkyounglongest.com/best-galbi/", "dinner"],
    ["Galbitang (Short Rib Soup)", "갈비탕", "🍲", "https://seonkyounglongest.com/galbitang/", "dinner"],
    ["Manduguk (Dumpling Soup)", "만둣국", "🥟", "https://seonkyounglongest.com/manduguk/", "dinner"],
    ["Jjajangmyeon", "짜장면", "🍜", "https://seonkyounglongest.com/jjajangmyeon/", "dinner"],
    ["Tteokbokki", "떡볶이", "🍢", "https://seonkyounglongest.com/tteokbokki/", "snack"],
    ["Hotteok (Sweet Pancakes)", "호떡", "🥞", "https://seonkyounglongest.com/hotteok-korean-street-food/", "snack"],
    ["Egg Drop Soup", "", "🥣", "https://seonkyounglongest.com/egg-drop-soup/", "lunch"],
    ["Myeolchi Bokkeum (Anchovy)", "멸치볶음", "🐟", "https://seonkyounglongest.com/korean-anchovy/", "dinner"],
  ]),
  ...korean("Korean Bapsang", [
    ["Bibimbap", "비빔밥", "🥗", "https://www.koreanbapsang.com/bibimbap/", "dinner"],
    ["Doenjang Jjigae", "된장찌개", "🍲", "https://www.koreanbapsang.com/doenjang-jjigae-korean-soy-bean-paste/", "dinner"],
    ["Kongnamul Guk (Sprout Soup)", "콩나물국", "🥣", "https://www.koreanbapsang.com/kongnamul-guk-soybean-sprout-soup/", "dinner"],
    ["Kongnamul Muchim", "콩나물무침", "🌱", "https://www.koreanbapsang.com/kongnamul-muchim-seasoned-soybean/", "dinner"],
    ["Hobak Jeon (Zucchini)", "호박전", "🥒", "https://www.koreanbapsang.com/hobak-jeon-pan-fried-zucchini-in-egg-batter/", "dinner"],
    ["Tteokguk (Rice Cake Soup)", "떡국", "🥣", "https://www.koreanbapsang.com/tteokguk-korean-rice-cake-soup/", "dinner"],
    ["Janchi Guksu (Warm Noodles)", "잔치국수", "🍜", "https://www.koreanbapsang.com/janchi-guksu-somyeon/", "lunch"],
    ["Eomuk Bokkeum (Fish Cake)", "어묵볶음", "🍢", "https://www.koreanbapsang.com/eomuk-bokkem-stir-fried-fish-cake/", "dinner"],
    ["Myulchi Bokkeum (Anchovy)", "멸치볶음", "🐟", "https://www.koreanbapsang.com/myulchi-bokkeum-stir-fried-anchovies/", "dinner"],
    ["Oi Muchim (Cucumber Salad)", "오이무침", "🥒", "https://www.koreanbapsang.com/oi-muchim-korean-style-cucumber-salad/", "dinner"],
    ["LA Galbi", "LA갈비", "🍖", "https://www.koreanbapsang.com/la-galbi-gui-grilled-la-style-short-ribs/", "dinner"],
    ["Galbijjim (Braised Short Ribs)", "갈비찜", "🍖", "https://www.koreanbapsang.com/galbijjim-korean-braised-beef-short/", "dinner"],
    ["Sundubu Gyeran Guk (Tofu Egg Soup)", "순두부계란국", "🥚", "https://www.koreanbapsang.com/sundubu-gyeran-guk-soft-tofu-and-egg-soup/", "breakfast"],
  ]),
  ...korean("Maangchi", [
    ["Ttukbaegi Gyeranjjim", "뚝배기계란찜", "🥚", "https://www.maangchi.com/recipe/ttukbaegi-gyeranjjim", "dinner"],
    ["Kongnamulguk", "콩나물국", "🥣", "https://www.maangchi.com/recipe/kongnamulguk", "breakfast"],
    ["Doenjang-jjigae", "된장찌개", "🍲", "https://www.maangchi.com/recipe/doenjang-jjigae", "dinner"],
    ["Gungjung Tteokbokki (Not Spicy)", "궁중떡볶이", "🍢", "https://www.maangchi.com/recipe/gungjung-tteokbokki", "dinner"],
    ["Jjajangmyeon", "짜장면", "🍜", "https://www.maangchi.com/recipe/jjajangmyeon", "dinner"],
    ["Samgyetang (Ginseng Chicken Soup)", "삼계탕", "🐔", "https://www.maangchi.com/recipe/samgyetang", "dinner"],
    ["Yubuchobap (Tofu Pockets)", "유부초밥", "🍱", "https://www.maangchi.com/recipe/yubuchobap", "lunch"],
    ["Kimchi Bokkeumbap", "김치볶음밥", "🍳", "https://www.maangchi.com/recipe/kimchi-bokkeumbap", "lunch"],
    ["Gyeranbap (Egg Rice)", "계란밥", "🍚", "https://www.maangchi.com/recipe/gyeranbap", "breakfast"],
    ["Gyeranjjim (Steamed Egg)", "계란찜", "🥚", "https://www.maangchi.com/recipe/gyeranjjim", "dinner"],
  ]),
  ...korean("My Korean Kitchen", [
    ["Tuna Mayo Rice Bowl", "참치마요덮밥", "🍚", "https://mykoreankitchen.com/tuna-mayo-rice-bowl/", "lunch"],
    ["Tuna Kimbap", "참치김밥", "🍙", "https://mykoreankitchen.com/tuna-kimbap/", "lunch"],
    ["Tuna Pancakes", "참치전", "🥞", "https://mykoreankitchen.com/tuna-pancakes-chamchijeon/", "dinner"],
    ["Kimchi Tuna Fried Rice", "참치김치볶음밥", "🍳", "https://mykoreankitchen.com/kimchi-tuna-fried-rice/", "lunch"],
  ]),

  // ---- 🇺🇸 American ----
  ...american("Natasha's Kitchen", [
    ["Turkey Chili", "🫘", "https://natashaskitchen.com/turkey-chili-recipe/", "dinner"],
    ["Chicken Pot Pie", "🥧", "https://natashaskitchen.com/chicken-pot-pie-recipe/", "dinner"],
    ["Beef Stew", "🍲", "https://natashaskitchen.com/beef-stew-recipe/", "dinner"],
    ["Chicken Pot Pie Soup", "🥣", "https://natashaskitchen.com/chicken-pot-pie-soup/", "dinner"],
  ]),
  ...american("Once Upon a Chef", [
    ["Sloppy Joes", "🍔", "https://www.onceuponachef.com/recipes/sloppy-joes.html", "dinner"],
    ["Mac and Cheese", "🧀", "https://www.onceuponachef.com/recipes/mac-and-cheese.html", "dinner"],
    ["Chili Mac", "🍝", "https://www.onceuponachef.com/recipes/chili-mac.html", "dinner"],
  ]),
  ...american("Budget Bytes", [
    ["Oven Fajitas", "🫑", "https://www.budgetbytes.com/oven-fajitas/", "dinner"],
    ["Sheet Pan Tacos", "🌮", "https://www.budgetbytes.com/sheet-pan-tacos/", "dinner"],
    ["BBQ Chicken Burrito Bowls", "🌯", "https://www.budgetbytes.com/bbq-chicken-burrito-bowls/", "dinner"],
    ["Sheet Pan Sweet and Sour Chicken", "🍗", "https://www.budgetbytes.com/sheet-pan-sweet-sour-chicken/", "dinner"],
  ]),
  ...american("Sally's Baking Addiction", [
    ["Banana Muffins", "🧁", "https://sallysbakingaddiction.com/banana-muffins/", "breakfast"],
    ["Blueberry Banana Muffins", "🫐", "https://sallysbakingaddiction.com/blueberry-banana-muffins/", "breakfast"],
    ["Peanut Butter Banana Muffins", "🥜", "https://sallysbakingaddiction.com/peanut-butter-banana-muffins/", "snack"],
  ]),
  ...american("Super Healthy Kids", [
    ["Homemade Fish Sticks", "🐟", "https://www.superhealthykids.com/homemade-fish-sticks/", "dinner"],
  ]),
];
