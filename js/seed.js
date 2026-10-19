// Starter menu and the "Discover" list. The starter recipes are written for
// this app (home-style versions of classic dishes) so the family has a full
// menu on day one. Discover links to recipes by well-known cooks; tapping one
// asks Claude to read that page and add it to the menu on this device.
import { FUSION_STARTERS } from "./seed-fusion.js";

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

// Kinds of food, for the Menu's filter. The flags read well for kids.
export const CUISINES = [
  { key: "korean", label: "Korean", emoji: "🇰🇷" },
  { key: "fusion", label: "Korean fusion", emoji: "🌮" },
  { key: "american", label: "American", emoji: "🇺🇸" },
  { key: "italian", label: "Italian", emoji: "🇮🇹" },
  { key: "mexican", label: "Mexican", emoji: "🇲🇽" },
  { key: "chinese", label: "Chinese", emoji: "🇨🇳" },
  { key: "japanese", label: "Japanese", emoji: "🇯🇵" },
  { key: "indian", label: "Indian", emoji: "🇮🇳" },
  { key: "thai", label: "Thai", emoji: "🇹🇭" },
  { key: "mediterranean", label: "Mediterranean", emoji: "🫒" },
  { key: "other", label: "Other", emoji: "🌍" },
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
    ["1 package (about 14) seasoned fried tofu pockets (yubu), with its sauce packets", "3 cups cooked short-grain rice, warm", "1 tsp sesame oil", "1 tbsp toasted sesame seeds", "2 tbsp finely chopped carrot (optional)"],
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
    ["2 salmon fillets (about 5 oz each)", "1/2 tsp salt", "2 cups cooked short-grain rice", "2 tbsp soy sauce", "2 tbsp mayonnaise (Kewpie if you have it)", "1 tsp sriracha (optional, for grown-ups)", "1 avocado, sliced", "1 cucumber, sliced", "1 package roasted seaweed snacks (gim)", "1 tsp toasted sesame seeds"],
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

// Added later (batch 3): family favorites from more kinds of food.
const world = (cuisine, dishes) => dishes.map((dish) => ({ ...dish, cuisine }));
const WORLD_STARTERS = [
  ...world("italian", [
    d("meatballs-marinara", "Baked Meatballs in Marinara", "", "🍝", ["dinner"], ["meat", "noodles", "kid-favorite"], 4, 20, 30, 0,
      ["1/2 cup breadcrumbs", "1/3 cup milk", "1 lb ground beef", "1 egg", "1/3 cup grated parmesan", "2 cloves garlic, minced", "2 tbsp chopped parsley", "1 tsp salt", "1/4 tsp black pepper", "1 jar (24 oz) marinara sauce", "12 oz spaghetti"],
      ["Heat the oven to 400°F. Line a baking sheet with parchment.", "Mix the breadcrumbs and milk in a big bowl and let them soak for 5 minutes.", "Add the beef, egg, parmesan, garlic, parsley, salt and pepper. Mix gently with clean hands.", "Roll into balls about the size of a ping-pong ball. You'll get about 20.", "Bake for 15 minutes.", "Warm the marinara in a big pot. Add the meatballs and simmer for 10 minutes.", "Cook the spaghetti as the package says. Serve the meatballs and sauce on top."],
      "Kids love rolling the meatballs. Freeze extra cooked meatballs for a quick dinner."),

    d("chicken-parmesan", "Baked Chicken Parmesan", "", "🍗", ["dinner"], ["meat", "kid-favorite"], 4, 15, 25, 0,
      ["2 large chicken breasts, sliced in half into 4 thin cutlets", "1/2 tsp salt", "1/2 cup flour", "2 eggs, beaten", "1 cup panko breadcrumbs", "1/2 cup grated parmesan", "1 tsp Italian seasoning", "2 tbsp olive oil", "1 1/2 cups marinara sauce", "1 cup shredded mozzarella", "Fresh basil, for serving"],
      ["Heat the oven to 425°F. Line a baking sheet with parchment.", "Toast the panko in the olive oil in a pan over medium heat for 3 minutes until golden. Let it cool, then mix in the parmesan and Italian seasoning.", "Sprinkle the chicken with salt. Dip each piece in flour, then egg, then press it into the crumbs.", "Bake for 15 minutes.", "Spoon marinara over each piece and top with mozzarella.", "Bake for 8 to 10 minutes more, until the cheese bubbles and the chicken is cooked through.", "Top with basil. Serve with pasta or a salad."]),

    d("minestrone", "Minestrone Soup", "", "🥣", ["dinner", "lunch"], ["soup", "veggie", "healthy"], 6, 15, 35, 0,
      ["2 tbsp olive oil", "1 onion, diced", "2 carrots, diced", "2 celery stalks, diced", "2 cloves garlic, minced", "1 zucchini, diced", "1 tsp dried Italian herbs", "1 can (14 oz) diced tomatoes", "6 cups vegetable broth", "1 tsp salt", "1 can (15 oz) cannellini beans, drained and rinsed", "1 cup small pasta (like ditalini or small shells)", "2 cups baby spinach", "Grated parmesan, for serving"],
      ["Heat the oil in a big pot. Cook the onion, carrots and celery for 6 minutes.", "Add the garlic, zucchini and herbs. Cook for 2 minutes.", "Add the tomatoes, broth and salt. Bring to a boil, then simmer for 15 minutes.", "Add the beans and pasta. Cook for 10 minutes until the pasta is soft.", "Stir in the spinach for 1 minute. Serve with parmesan on top."],
      "The pasta keeps soaking up the broth, so add a splash of water when you reheat it."),

    d("pesto-pasta", "Pesto Pasta with Peas", "", "🍝", ["lunch", "dinner"], ["noodles", "veggie", "quick", "kid-favorite"], 4, 10, 12, 0,
      ["12 oz short pasta (like fusilli)", "1 cup frozen peas", "For the pesto:", "2 cups fresh basil leaves", "1/3 cup grated parmesan", "1/4 cup pine nuts or walnuts", "1 clove garlic", "1/3 cup olive oil", "1 tbsp lemon juice", "1/4 tsp salt"],
      ["Cook the pasta as the package says. Add the peas for the last 2 minutes. Save 1/2 cup of the cooking water, then drain.", "Blend the basil, parmesan, nuts, garlic, oil, lemon juice and salt until smooth.", "Toss the pasta and peas with the pesto. Add a splash of the pasta water until it's creamy."],
      "Nut-free? Use sunflower seeds. A jar of store-bought pesto works on busy nights."),

    d("lasagna", "Classic Lasagna", "", "🍝", ["dinner"], ["meat", "noodles", "kid-favorite"], 8, 30, 60, 0,
      ["1 lb ground beef", "1 onion, diced", "2 cloves garlic, minced", "1 jar (24 oz) marinara sauce", "1 can (15 oz) tomato sauce", "1 tsp dried Italian herbs", "12 lasagna noodles (no-boil, or boiled as the package says)", "15 oz ricotta cheese", "1 egg", "1/2 cup grated parmesan", "3 cups shredded mozzarella", "1/2 tsp salt"],
      ["Heat the oven to 375°F.", "Cook the beef and onion in a big pan for 8 minutes, breaking up the meat. Add the garlic for 1 minute.", "Stir in the marinara, tomato sauce and herbs. Simmer for 10 minutes.", "Mix the ricotta, egg, half the parmesan and the salt.", "Spread 1 cup of sauce in a 9x13 baking dish.", "Layer noodles, ricotta, mozzarella and sauce. Repeat 3 times, ending with sauce, mozzarella and the rest of the parmesan.", "Cover with foil and bake for 40 minutes. Take off the foil and bake for 15 minutes more, until bubbly.", "Let it rest for 15 minutes before cutting."],
      "Make it the day before and bake it when you're ready. It freezes well too."),

    d("chicken-broccoli-alfredo", "Chicken & Broccoli Alfredo", "", "🍝", ["dinner"], ["noodles", "meat", "kid-favorite"], 4, 10, 20, 0,
      ["12 oz fettuccine", "3 cups broccoli florets", "1 lb chicken breast, cut into bite-size pieces", "1/2 tsp salt", "1 tbsp olive oil", "2 tbsp butter", "2 cloves garlic, minced", "2 tbsp flour", "2 cups milk", "1 cup grated parmesan", "1/4 tsp black pepper"],
      ["Cook the fettuccine as the package says. Add the broccoli for the last 3 minutes. Drain.", "Sprinkle the chicken with salt. Cook it in the olive oil for 6 to 7 minutes until cooked through. Set aside.", "Melt the butter in the same pan. Cook the garlic for 30 seconds, then stir in the flour for 1 minute.", "Slowly whisk in the milk. Simmer for 4 minutes, stirring, until it thickens.", "Turn off the heat. Stir in the parmesan and pepper.", "Toss the pasta, broccoli and chicken in the sauce."],
      "Lighter than restaurant Alfredo: it's made with milk instead of heavy cream."),
  ]),

  ...world("mexican", [
    d("chicken-enchiladas", "Mild Chicken Enchiladas", "", "🌯", ["dinner"], ["meat", "kid-favorite"], 4, 20, 25, 0,
      ["3 cups cooked shredded chicken (a rotisserie chicken works)", "1 can (15 oz) black beans, drained and rinsed", "1/2 tsp ground cumin", "2 cups shredded Mexican-blend cheese", "2 1/2 cups mild red enchilada sauce", "8 small flour tortillas", "Chopped cilantro, for serving", "Sour cream, for serving"],
      ["Heat the oven to 375°F.", "Mix the chicken, beans, cumin, 1 cup of the cheese and 1/2 cup of the sauce.", "Spread 1/2 cup of sauce in a 9x13 baking dish.", "Fill each tortilla with about 1/2 cup of filling, roll it up and lay it seam side down in the dish.", "Pour the rest of the sauce over the top and sprinkle with the rest of the cheese.", "Cover with foil and bake for 20 minutes. Uncover and bake 5 minutes more until bubbly.", "Top with cilantro and serve with sour cream."]),

    d("burrito-bowls", "Chicken Burrito Bowls", "", "🍚", ["lunch", "dinner"], ["meat", "rice", "healthy", "kid-favorite"], 4, 15, 25, 0,
      ["1 1/2 lb boneless chicken thighs", "1 tbsp olive oil", "1 tsp mild chili powder", "1 tsp ground cumin", "1/2 tsp garlic powder", "1/2 tsp salt", "1 lime", "3 cups cooked rice", "1 can (15 oz) black beans, warmed", "1 cup corn kernels", "1 cup cherry tomatoes, halved", "1 avocado, sliced", "1/2 cup shredded cheddar", "Salsa, for serving"],
      ["Rub the chicken with the oil, chili powder, cumin, garlic powder and salt.", "Cook it in a pan over medium-high heat for 5 to 6 minutes per side until cooked through.", "Let it rest for 5 minutes, then slice.", "Squeeze half the lime over the rice and stir.", "Build the bowls: rice, beans, corn, chicken, tomatoes, avocado and cheese.", "Squeeze the rest of the lime on top and add salsa."],
      "A build-your-own bowl night: set everything out and let the kids choose."),

    d("tortilla-soup", "Chicken Tortilla Soup", "", "🥣", ["dinner"], ["soup", "meat", "healthy"], 6, 15, 30, 0,
      ["1 tbsp olive oil", "1 onion, diced", "1 red bell pepper, diced", "3 cloves garlic, minced", "1 tsp ground cumin", "1 tsp mild chili powder", "6 cups chicken broth", "1 can (14 oz) diced tomatoes", "1 1/2 lb chicken breasts", "1 can (15 oz) black beans, drained and rinsed", "1 cup frozen corn", "1 lime", "1 avocado, diced", "1/2 cup shredded cheddar, for topping", "Tortilla chips, for topping"],
      ["Heat the oil in a big pot. Cook the onion and pepper for 5 minutes.", "Add the garlic, cumin and chili powder for 1 minute.", "Add the broth, tomatoes and whole chicken breasts. Bring to a boil, then simmer for 20 minutes until the chicken is cooked.", "Take out the chicken, shred it with two forks and put it back.", "Add the beans and corn. Cook for 5 minutes.", "Squeeze in the lime. Top each bowl with avocado, cheese and crushed chips."]),

    d("mexican-rice", "Mexican Red Rice (Arroz Rojo)", "", "🍚", ["dinner"], ["rice", "side"], 6, 5, 25, 0,
      ["1 1/2 cups long-grain white rice", "2 tbsp vegetable oil", "1/2 onion, finely chopped", "2 cloves garlic, minced", "1 can (8 oz) tomato sauce", "2 cups chicken broth", "1 tsp salt", "1/2 tsp ground cumin", "1/2 cup frozen peas and carrots"],
      ["Rinse the rice and drain it well.", "Heat the oil in a pot. Toast the rice, stirring, for 5 minutes until golden.", "Add the onion and garlic. Cook for 2 minutes.", "Stir in the tomato sauce, broth, salt and cumin. Bring to a boil.", "Add the peas and carrots. Cover and cook on low for 18 to 20 minutes.", "Let it sit, covered, for 5 minutes. Fluff with a fork."],
      "Don't lift the lid while it cooks; the steam does the work."),

    d("guacamole", "Kid-Friendly Guacamole", "", "🥑", ["snack"], ["veggie", "healthy", "quick", "kid-favorite"], 4, 10, 0, 0,
      ["3 ripe avocados", "1 lime", "1/2 tsp salt", "1 small tomato, diced", "2 tbsp chopped cilantro", "1/4 cup finely chopped red onion (optional)", "Tortilla chips, for dipping"],
      ["A grown-up cuts the avocados in half and takes out the pits. Scoop them into a bowl.", "Mash with a fork. Kids can do this part!", "Squeeze in the lime juice, add the salt and mix.", "Stir in the tomato, cilantro and onion.", "Taste and add more salt or lime if you like."],
      "Press plastic wrap right on top of leftovers so they stay green."),

    d("esquites", "Street Corn Cups (Esquites)", "", "🌽", ["snack", "dinner"], ["side", "veggie", "quick", "kid-favorite"], 4, 5, 10, 0,
      ["4 cups corn kernels (frozen and thawed, or from 5 cobs)", "1 tbsp butter", "2 tbsp mayonnaise", "2 tbsp sour cream", "1/2 cup crumbled cotija cheese (or feta)", "1 lime", "2 tbsp chopped cilantro", "1/4 tsp chili powder (optional, for grown-ups)"],
      ["Melt the butter in a big pan over medium-high heat.", "Add the corn and cook without stirring for 3 minutes so it browns a little. Then stir and cook 5 minutes more.", "Turn off the heat. Stir in the mayonnaise, sour cream, half the cheese and the lime juice.", "Spoon into cups. Top with the rest of the cheese and the cilantro. Grown-ups can add chili powder."]),
  ]),

  ...world("chinese", [
    d("egg-fried-rice", "Egg Fried Rice", "", "🍳", ["lunch", "dinner"], ["rice", "quick", "kid-favorite"], 4, 10, 10, 0,
      ["4 cups cooked rice, cold (day-old is best)", "3 eggs, beaten", "2 tbsp vegetable oil", "1 cup frozen peas and carrots", "3 green onions, sliced", "2 tbsp soy sauce", "1 tsp sesame oil"],
      ["Break up any clumps of cold rice with your hands.", "Heat 1 tbsp of the oil in a wok or big pan over high heat. Scramble the eggs until just set, then take them out.", "Add the rest of the oil and the peas and carrots. Cook for 2 minutes.", "Add the rice and stir-fry for 4 minutes until hot and a little crispy.", "Add the soy sauce, eggs and green onions. Toss for 1 minute.", "Drizzle with sesame oil."],
      "Fresh rice gets mushy. Cook it the day before, or spread it on a tray to cool and dry first."),

    d("beef-broccoli", "Beef & Broccoli", "", "🥦", ["dinner"], ["meat", "healthy", "quick"], 4, 15, 10, 0,
      ["1 lb flank steak, thinly sliced against the grain", "1 tbsp cornstarch", "1 tbsp soy sauce", "4 cups broccoli florets", "2 tbsp vegetable oil", "2 cloves garlic, minced", "1 tsp grated ginger", "For the sauce:", "3 tbsp soy sauce", "2 tbsp oyster sauce", "1 tbsp brown sugar", "2 tsp cornstarch", "1/2 cup water", "1 tsp sesame oil"],
      ["Toss the beef with the cornstarch and soy sauce. Let it sit for 10 minutes.", "Stir the sauce ingredients together.", "Steam or microwave the broccoli for 2 to 3 minutes until bright green.", "Heat 1 tbsp of the oil in a big pan over high heat. Sear the beef in one layer, 1 to 2 minutes per side. Take it out.", "Add the rest of the oil, the garlic and the ginger. Cook for 30 seconds.", "Stir the sauce and pour it in. Simmer for 1 minute until glossy.", "Add the beef and broccoli and toss. Serve with rice."]),

    d("sweet-sour-chicken", "Baked Sweet & Sour Chicken", "", "🍍", ["dinner"], ["meat", "kid-favorite"], 4, 15, 30, 0,
      ["1 1/2 lb chicken breast, cut into 1-inch pieces", "1/2 tsp salt", "1/2 cup cornstarch", "2 eggs, beaten", "3 tbsp vegetable oil", "1 red bell pepper, chopped", "1 green bell pepper, chopped", "1 cup pineapple chunks", "For the sauce:", "1/2 cup sugar", "1/3 cup ketchup", "1/3 cup rice vinegar", "2 tbsp soy sauce", "1 tsp garlic powder"],
      ["Heat the oven to 325°F.", "Sprinkle the chicken with salt. Toss it in the cornstarch, then in the egg.", "Brown the chicken in the oil in a big pan, 2 minutes per side. It doesn't need to cook through. Put it in a 9x13 baking dish.", "Whisk the sauce ingredients and pour over the chicken. Add the peppers and pineapple.", "Bake for 25 to 30 minutes, stirring halfway, until the chicken is cooked and the sauce is thick.", "Serve with rice."]),

    d("potstickers", "Pork & Cabbage Potstickers", "", "🥟", ["dinner", "lunch"], ["meat", "kid-favorite"], 4, 40, 15, 0,
      ["2 cups napa cabbage, finely chopped", "1/2 tsp salt", "1/2 lb ground pork", "2 green onions, finely chopped", "1 tsp grated ginger", "1 tbsp soy sauce", "1 tsp sesame oil", "30 round dumpling wrappers", "2 tbsp vegetable oil", "1/2 cup water", "For dipping:", "2 tbsp soy sauce", "1 tbsp rice vinegar"],
      ["Toss the cabbage with the salt and let it sit for 10 minutes. Squeeze out the water.", "Mix the pork, cabbage, green onions, ginger, soy sauce and sesame oil.", "Put 1 tsp of filling in the middle of a wrapper. Wet the edge, fold it in half and pinch it closed. Pleats are optional!", "Heat 1 tbsp of oil in a nonstick pan over medium heat. Set the dumplings in flat side down and cook for 2 minutes until the bottoms are golden.", "Add 1/4 cup of water, cover and steam for 6 minutes, until the water is gone and the filling is cooked.", "Cook the rest the same way. Mix the soy sauce and vinegar for dipping."],
      "Freeze uncooked dumplings on a tray, then bag them. Cook from frozen and steam 2 minutes longer."),

    d("tomato-egg", "Tomato & Egg Stir-Fry", "", "🍅", ["dinner", "lunch"], ["veggie", "healthy", "quick", "kid-favorite"], 4, 10, 8, 0,
      ["5 eggs", "1/2 tsp salt", "3 ripe tomatoes, cut into wedges", "2 tbsp vegetable oil", "1 tbsp ketchup", "1 tsp sugar", "2 tbsp water", "1 green onion, sliced"],
      ["Beat the eggs with half the salt.", "Heat 1 tbsp of the oil over medium-high heat. Pour in the eggs and stir gently until just set but still soft. Take them out.", "Add the rest of the oil and the tomatoes. Cook for 3 minutes until soft and juicy.", "Stir in the ketchup, sugar, the rest of the salt and the water. Cook for 1 minute.", "Put the eggs back and fold everything together for 30 seconds.", "Top with green onion and serve over rice."],
      "One of China's best-loved home dishes, and a great first dish for kids to help cook."),

    d("lo-mein", "Vegetable Lo Mein", "", "🍜", ["dinner", "lunch"], ["noodles", "veggie", "quick"], 4, 15, 10, 0,
      ["8 oz lo mein noodles or spaghetti", "2 tbsp vegetable oil", "2 cloves garlic, minced", "1 carrot, cut into thin strips", "1 red bell pepper, sliced", "2 cups shredded cabbage", "1 cup snow peas", "3 green onions, cut into 2-inch pieces", "For the sauce:", "3 tbsp soy sauce", "1 tbsp oyster sauce", "1 tsp sugar", "1 tsp sesame oil"],
      ["Cook the noodles as the package says. Drain and rinse with warm water.", "Stir the sauce ingredients together.", "Heat the oil in a wok or big pan over high heat. Cook the garlic for 30 seconds.", "Add the carrot and pepper for 2 minutes, then the cabbage and snow peas for 2 minutes.", "Add the noodles and sauce. Toss for 2 minutes.", "Add the green onions and toss for 30 seconds."],
      "Add leftover chicken or shrimp to make it a full meal."),
  ]),

  ...world("japanese", [
    d("chicken-katsu", "Chicken Katsu", "", "🍱", ["dinner"], ["meat", "kid-favorite"], 4, 15, 20, 0,
      ["2 large chicken breasts, sliced in half into 4 thin cutlets", "1/2 tsp salt", "1/2 cup flour", "2 eggs, beaten", "1 1/2 cups panko breadcrumbs", "3 tbsp vegetable oil", "2 cups finely shredded cabbage", "For the katsu sauce:", "3 tbsp ketchup", "2 tbsp Worcestershire sauce", "1 tbsp oyster sauce", "1 tsp sugar"],
      ["Pound the cutlets to an even 1/2 inch thick. Sprinkle with salt.", "Dip each one in flour, then egg, then press it into the panko.", "Heat the oil in a big pan over medium heat.", "Cook for 4 to 5 minutes per side until golden and cooked through.", "Let them rest for 2 minutes, then slice into strips.", "Stir the sauce together. Serve with the cabbage and rice."]),

    d("oyakodon", "Chicken & Egg Rice Bowl (Oyakodon)", "", "🍚", ["dinner", "lunch"], ["rice", "meat", "quick", "kid-favorite"], 2, 10, 12, 0,
      ["3/4 cup dashi or chicken broth", "2 tbsp soy sauce", "2 tbsp mirin", "1 tbsp sugar", "1/2 onion, thinly sliced", "2 boneless chicken thighs, cut into bite-size pieces", "3 eggs", "2 cups cooked short-grain rice", "1 green onion, sliced"],
      ["Bring the dashi, soy sauce, mirin and sugar to a simmer in a small pan.", "Add the onion and cook for 3 minutes.", "Add the chicken. Cover and simmer for 5 to 6 minutes until cooked.", "Beat the eggs lightly and pour them over the chicken in a circle.", "Cover and cook for 1 to 2 minutes until the eggs are set.", "Slide it over bowls of rice and top with green onion."],
      "Oyako means \"parent and child\": the chicken and the egg! For little kids, cook until the egg is fully set."),

    d("miso-soup", "Miso Soup", "", "🥣", ["breakfast", "dinner"], ["soup", "healthy", "quick"], 4, 5, 10, 0,
      ["1 tbsp dried wakame seaweed", "4 cups dashi", "3 tbsp white miso paste", "7 oz silken or soft tofu, cubed", "2 green onions, sliced"],
      ["Soak the wakame in water for 5 minutes, then drain.", "Heat the dashi until it's steaming. Don't let it boil.", "Put the miso in a ladle, dip it into the dashi and stir until it melts in.", "Add the tofu and wakame. Warm for 2 minutes.", "Top with green onions."],
      "Boiling miso dulls its flavor, so keep it just below a boil."),

    d("japanese-curry", "Japanese Curry Rice", "", "🍛", ["dinner"], ["meat", "kid-favorite"], 6, 15, 35, 0,
      ["1 tbsp vegetable oil", "1 onion, cut into wedges", "1 lb boneless chicken thighs, cut into bite-size pieces", "2 carrots, cut into chunks", "2 potatoes, cut into chunks", "3 cups water", "1 box (3.5 oz) mild Japanese curry roux", "1 small apple, grated (optional)", "6 cups cooked short-grain rice"],
      ["Heat the oil in a big pot. Cook the onion for 5 minutes until soft.", "Add the chicken and cook for 3 minutes.", "Add the carrots, potatoes and water. Bring to a boil, skim off the foam, then simmer for 15 minutes until the vegetables are soft.", "Turn off the heat. Break in the curry roux and stir until it melts.", "Add the apple and simmer for 5 minutes, stirring, until thick.", "Serve over rice."],
      "A favorite of Japanese kids. The boxed roux comes mild, medium or hot."),

    d("yaki-udon", "Stir-Fried Udon (Yaki Udon)", "", "🍜", ["lunch", "dinner"], ["noodles", "quick"], 4, 10, 10, 0,
      ["4 packages (7 oz each) frozen udon noodles", "8 oz thinly sliced pork or chicken", "2 tbsp vegetable oil", "2 cups shredded cabbage", "1 carrot, cut into thin strips", "4 shiitake mushrooms, sliced", "2 green onions, cut into 2-inch pieces", "For the sauce:", "3 tbsp soy sauce", "1 tbsp oyster sauce", "1 tbsp mirin", "1 tsp sugar"],
      ["Boil the udon for 1 minute to loosen it, then drain.", "Stir the sauce ingredients together.", "Heat the oil in a big pan over high heat. Cook the pork for 3 minutes.", "Add the cabbage, carrot and mushrooms. Cook for 3 minutes.", "Add the udon and sauce. Toss for 2 to 3 minutes.", "Add the green onions and toss."]),

    d("gyudon", "Beef Rice Bowl (Gyudon)", "", "🍚", ["dinner"], ["meat", "rice", "quick"], 4, 10, 12, 0,
      ["1 cup dashi or water", "3 tbsp soy sauce", "2 tbsp mirin", "1 tbsp sugar", "1 tsp grated ginger", "1 onion, thinly sliced", "1 lb beef, sliced paper-thin (shabu-shabu beef or ribeye)", "4 cups cooked short-grain rice", "2 green onions, sliced"],
      ["Bring the dashi, soy sauce, mirin, sugar and ginger to a simmer.", "Add the onion and cook for 5 minutes until soft.", "Add the beef, pulling the slices apart. Cook for 2 to 3 minutes until no longer pink. Skim off any foam.", "Spoon the beef, onion and some sauce over bowls of rice.", "Top with green onions."],
      "Asian markets sell beef sliced paper-thin for this."),
  ]),

  ...world("indian", [
    d("butter-chicken", "Mild Butter Chicken", "", "🍛", ["dinner"], ["meat", "kid-favorite"], 4, 15, 30, 0,
      ["1 1/2 lb boneless chicken thighs, cut into bite-size pieces", "1/2 cup plain yogurt", "1 tsp salt", "2 tsp garam masala", "2 tbsp butter", "1 onion, finely chopped", "3 cloves garlic, minced", "1 tbsp grated ginger", "1 tsp ground cumin", "1/2 tsp ground turmeric", "1 can (15 oz) tomato sauce", "3/4 cup heavy cream or half-and-half", "1 tbsp honey", "Chopped cilantro, for serving"],
      ["Mix the chicken with the yogurt, half the salt and 1 tsp of the garam masala. Let it sit for 30 minutes, or overnight in the fridge.", "Melt the butter in a big pan over medium heat. Cook the onion for 6 minutes until soft.", "Add the garlic, ginger, cumin, turmeric and the rest of the garam masala. Cook for 1 minute.", "Add the tomato sauce and simmer for 10 minutes.", "Add the chicken and its marinade. Cover and simmer for 12 to 15 minutes until cooked through.", "Stir in the cream, honey and the rest of the salt. Simmer for 3 minutes.", "Top with cilantro. Serve with rice or naan."],
      "Garam masala is warm, not hot. Grown-ups can add chili flakes to their own plate."),

    d("chana-masala", "Mild Chickpea Curry (Chana Masala)", "", "🫘", ["dinner", "lunch"], ["veggie", "healthy", "quick"], 4, 10, 25, 0,
      ["2 tbsp vegetable oil", "1 onion, finely chopped", "3 cloves garlic, minced", "1 tbsp grated ginger", "1 tsp ground cumin", "1 tsp ground coriander", "1 tsp garam masala", "1/2 tsp ground turmeric", "1 can (14 oz) crushed tomatoes", "2 cans (15 oz each) chickpeas, drained and rinsed", "1/2 cup water", "1 tsp salt", "1 lemon", "Chopped cilantro, for serving"],
      ["Heat the oil and cook the onion for 8 minutes until golden.", "Add the garlic, ginger and spices. Cook for 1 minute.", "Add the tomatoes and cook for 5 minutes.", "Add the chickpeas, water and salt. Simmer for 15 minutes, mashing a few chickpeas to thicken it.", "Squeeze in the lemon, top with cilantro, and serve with rice or flatbread."]),

    d("dal", "Yellow Lentil Dal", "", "🥣", ["dinner", "lunch"], ["soup", "veggie", "healthy"], 4, 5, 30, 0,
      ["1 cup yellow split lentils (moong dal or toor dal), rinsed", "4 cups water", "1/2 tsp ground turmeric", "1 tsp salt", "2 tbsp ghee or butter", "1 tsp cumin seeds", "1/2 onion, finely chopped", "2 cloves garlic, minced", "1 tomato, chopped", "Chopped cilantro, for serving"],
      ["Simmer the lentils, water and turmeric for 25 minutes, stirring now and then, until very soft. Whisk them smooth and add the salt.", "Melt the ghee in a small pan. Add the cumin seeds and cook for 30 seconds until they sizzle.", "Add the onion and cook for 5 minutes, then the garlic and tomato for 3 minutes.", "Pour it over the dal (it will sizzle!) and stir.", "Top with cilantro and serve with rice."],
      "The sizzling butter and spices on top is called a tadka."),

    d("veg-pulao", "Vegetable Pulao", "", "🍚", ["dinner"], ["rice", "veggie", "side"], 4, 10, 25, 0,
      ["1 1/2 cups basmati rice", "2 tbsp ghee or butter", "1 tsp cumin seeds", "1 bay leaf", "4 green cardamom pods (optional)", "1 cinnamon stick", "1 onion, thinly sliced", "1 1/2 cups frozen mixed vegetables", "1 tsp salt", "2 1/2 cups water"],
      ["Rinse the rice until the water runs clear. Soak it for 20 minutes, then drain.", "Melt the ghee in a pot. Add the cumin seeds, bay leaf, cardamom and cinnamon for 30 seconds.", "Add the onion and cook for 6 minutes until golden.", "Add the vegetables for 2 minutes, then the rice. Stir gently for 1 minute.", "Add the water and salt. Bring to a boil, then cover and cook on low for 15 minutes.", "Let it sit, covered, for 5 minutes. Fluff it and take out the whole spices."],
      "Take out the whole spices before serving to little ones."),

    d("mango-lassi", "Mango Lassi", "", "🥭", ["snack", "breakfast"], ["healthy", "quick", "kid-favorite"], 2, 5, 0, 0,
      ["1 cup chopped ripe mango (or canned mango pulp)", "1 cup plain yogurt", "1/2 cup milk", "1 tbsp honey", "1 pinch ground cardamom (optional)", "4 ice cubes"],
      ["Put everything in a blender.", "Blend until smooth and frothy.", "Pour into glasses and drink!"]),
  ]),

  ...world("thai", [
    d("pad-thai", "Chicken Pad Thai", "", "🍜", ["dinner"], ["noodles", "meat", "kid-favorite"], 4, 20, 15, 0,
      ["8 oz flat rice noodles (pad thai noodles)", "2 tbsp vegetable oil", "1 lb chicken breast, thinly sliced", "2 cloves garlic, minced", "2 eggs", "2 cups bean sprouts", "3 green onions, cut into 2-inch pieces", "1/3 cup roasted peanuts, chopped", "1 lime, cut into wedges", "For the sauce:", "3 tbsp tamarind paste (or 2 tbsp lime juice)", "3 tbsp fish sauce", "3 tbsp brown sugar", "1 tbsp soy sauce"],
      ["Soak the noodles in warm water for 30 minutes until bendy, then drain.", "Stir the sauce ingredients until the sugar dissolves.", "Heat the oil in a wok or big pan over high heat. Cook the chicken for 4 to 5 minutes until cooked, then push it to the side.", "Add the garlic and eggs and scramble until set.", "Add the noodles and sauce. Toss for 2 to 3 minutes until the noodles are soft. Add a splash of water if they stick.", "Add the bean sprouts and green onions and toss for 1 minute.", "Top with peanuts and serve with lime wedges."],
      "Not spicy as written. Grown-ups can add chili flakes at the table, the Thai way."),

    d("chicken-satay", "Chicken Satay with Peanut Sauce", "", "🍢", ["dinner", "snack"], ["meat", "kid-favorite"], 4, 20, 10, 0,
      ["1 1/2 lb boneless chicken thighs, cut into strips", "1 cup coconut milk", "2 tbsp soy sauce", "1 tsp mild curry powder", "1/2 tsp ground turmeric", "1 tbsp brown sugar", "12 wooden skewers, soaked in water", "For the peanut sauce:", "1/2 cup creamy peanut butter", "1 tbsp lime juice", "1 tbsp honey", "2 tbsp warm water"],
      ["Mix half the coconut milk with 1 tbsp of the soy sauce, the curry powder, turmeric and brown sugar. Toss the chicken in it and let it sit for 30 minutes, or overnight in the fridge.", "Thread the chicken onto the skewers.", "Cook on a hot grill pan or under the broiler for 4 to 5 minutes per side until cooked and a little charred.", "Whisk the peanut butter, the rest of the coconut milk and soy sauce, the lime juice, honey and water until smooth.", "Serve the skewers with the peanut sauce, rice and cucumber slices."],
      "Kids love dipping. Grown-ups can stir chili sauce into their own peanut sauce."),

    d("yellow-curry", "Thai Yellow Curry with Chicken", "", "🍛", ["dinner"], ["meat", "kid-favorite"], 4, 15, 25, 1,
      ["1 tbsp vegetable oil", "2 tbsp Thai yellow curry paste (1 tbsp for little kids)", "1 can (13.5 oz) coconut milk", "1 lb boneless chicken thighs, cut into bite-size pieces", "2 potatoes, cut into 1-inch chunks", "1 onion, cut into wedges", "1 cup chicken broth", "1 cup green beans, cut in half", "1 tbsp fish sauce", "1 tbsp brown sugar", "Cooked jasmine rice, for serving"],
      ["Heat the oil over medium heat. Cook the curry paste for 1 minute until it smells good.", "Stir in half the coconut milk and simmer for 2 minutes.", "Add the chicken and stir for 3 minutes.", "Add the potatoes, onion, the rest of the coconut milk and the broth. Simmer for 15 minutes until the potatoes are soft.", "Add the green beans, fish sauce and sugar. Cook for 4 minutes.", "Serve over jasmine rice."],
      "Yellow curry is the mildest Thai curry. Use less paste for kids, or more for grown-ups."),

    d("pad-kra-pao", "Thai Basil Chicken (Pad Kra Pao)", "", "🍗", ["dinner"], ["meat", "quick"], 4, 10, 10, 0,
      ["1 lb ground chicken", "2 tbsp vegetable oil", "4 cloves garlic, minced", "1 small onion, sliced", "1 red bell pepper, sliced", "1 Thai chili, sliced (optional, for grown-ups)", "1 cup Thai basil leaves (or regular basil)", "4 eggs (optional, fried, for the top)", "For the sauce:", "1 tbsp oyster sauce", "1 tbsp soy sauce", "1 tsp fish sauce", "1 tsp sugar", "2 tbsp water"],
      ["Stir the sauce ingredients together.", "Heat the oil in a big pan over high heat. Cook the garlic (and chili, if using) for 30 seconds.", "Add the chicken and cook for 4 minutes, breaking it up, until cooked through.", "Add the onion and pepper for 2 minutes.", "Pour in the sauce and cook for 1 minute.", "Turn off the heat and stir in the basil until it wilts.", "Serve over rice, with a fried egg on top if you like."],
      "In Thailand it's very spicy. This version is mild, with the chili just for grown-ups."),

    d("mango-sticky-rice", "Mango Sticky Rice", "", "🥭", ["snack"], ["treat", "kid-favorite"], 4, 10, 25, 0,
      ["1 cup Thai sweet rice (glutinous rice)", "1 can (13.5 oz) coconut milk", "1/3 cup sugar", "1/2 tsp salt", "2 ripe mangoes, sliced", "1 tbsp toasted sesame seeds (optional)"],
      ["Soak the rice in water for 4 hours, or overnight. Drain.", "Steam the rice in a steamer basket lined with a damp cloth for 20 to 25 minutes until shiny and chewy.", "Warm the coconut milk with the sugar and salt until dissolved. Don't let it boil.", "Stir 3/4 of the warm coconut milk into the hot rice. Cover and let it sit for 15 minutes.", "Serve the rice with mango slices, drizzle with the rest of the coconut milk, and sprinkle with sesame seeds."],
      "Plain sushi rice won't work here: look for \"sweet\" or \"glutinous\" rice at an Asian market."),
  ]),

  ...world("mediterranean", [
    d("chicken-souvlaki", "Chicken Souvlaki with Tzatziki", "", "🍢", ["dinner"], ["meat", "healthy", "kid-favorite"], 4, 20, 12, 0,
      ["1 1/2 lb boneless chicken breast, cut into 1-inch cubes", "3 tbsp olive oil", "1 lemon, juiced", "3 cloves garlic, minced", "1 tsp dried oregano", "1/2 tsp salt", "8 wooden skewers, soaked in water", "4 pita breads", "For the tzatziki:", "1 cup plain Greek yogurt", "1/2 cucumber, grated and squeezed dry", "1 clove garlic, grated", "1 tbsp lemon juice", "1 tbsp chopped dill", "1/4 tsp salt"],
      ["Mix the oil, lemon juice, garlic, oregano and salt. Toss the chicken in it and let it sit for 30 minutes, or up to overnight in the fridge.", "Thread the chicken onto the skewers.", "Grill or broil for 10 to 12 minutes, turning a few times, until cooked through.", "Stir the tzatziki ingredients together.", "Warm the pitas. Serve the chicken with tzatziki, tomatoes and cucumber."]),

    d("greek-salad", "Greek Salad", "", "🥗", ["lunch", "dinner"], ["veggie", "side", "healthy", "quick"], 4, 15, 0, 0,
      ["3 tomatoes, cut into chunks", "1 cucumber, sliced", "1/2 red onion, thinly sliced", "1 green bell pepper, sliced", "1/2 cup Kalamata olives", "4 oz feta cheese", "3 tbsp olive oil", "1 tbsp red wine vinegar", "1 tsp dried oregano", "Salt to taste"],
      ["Put the tomatoes, cucumber, onion, pepper and olives in a big bowl.", "Drizzle with the oil and vinegar. Sprinkle with oregano and salt, and toss gently.", "Top with the feta, in one big piece like in Greece, or crumbled."],
      "Soak the sliced onion in cold water for 10 minutes to make it milder for kids."),

    d("baked-falafel", "Baked Falafel", "", "🧆", ["dinner", "lunch"], ["veggie", "healthy"], 4, 20, 25, 0,
      ["1/2 onion, roughly chopped", "3 cloves garlic", "1 cup fresh parsley", "1/2 cup fresh cilantro", "2 cans (15 oz each) chickpeas, drained, rinsed and patted dry", "1 tsp ground cumin", "1 tsp ground coriander", "1 tsp salt", "1 tsp baking powder", "3 tbsp flour", "3 tbsp olive oil", "Pita bread, for serving", "Hummus, for serving"],
      ["Heat the oven to 400°F. Brush a baking sheet with 1 tbsp of the oil.", "Pulse the onion, garlic, parsley and cilantro in a food processor until finely chopped.", "Add the chickpeas, spices, salt and baking powder. Pulse until it looks like coarse sand, not a paste.", "Stir in the flour. Roll into 16 balls and flatten them a little.", "Put them on the baking sheet and brush with the rest of the oil.", "Bake for 12 minutes, flip, and bake 10 to 12 minutes more until golden.", "Serve in pita with hummus, cucumber and tomato."]),

    d("shakshuka", "Shakshuka (Eggs in Tomato Sauce)", "", "🍳", ["breakfast", "dinner"], ["veggie", "healthy"], 4, 10, 25, 0,
      ["2 tbsp olive oil", "1 onion, diced", "1 red bell pepper, diced", "3 cloves garlic, minced", "1 tsp ground cumin", "1 tsp sweet paprika", "1 can (28 oz) crushed tomatoes", "1/2 tsp salt", "1 tsp sugar", "6 eggs", "1/4 cup crumbled feta (optional)", "2 tbsp chopped parsley", "Crusty bread, for serving"],
      ["Heat the oil in a big skillet. Cook the onion and pepper for 6 minutes.", "Add the garlic, cumin and paprika for 1 minute.", "Add the tomatoes, salt and sugar. Simmer for 10 minutes until thick.", "Make 6 little wells in the sauce and crack an egg into each.", "Cover and cook on low for 6 to 8 minutes until the whites are set.", "Top with feta and parsley. Serve with bread for dipping."],
      "For kids, cook a few minutes longer so the yolks are firm."),

    d("lentil-soup", "Red Lentil Soup", "", "🥣", ["lunch", "dinner"], ["soup", "veggie", "healthy"], 6, 10, 30, 0,
      ["2 tbsp olive oil", "1 onion, diced", "1 carrot, diced", "2 cloves garlic, minced", "1 tsp ground cumin", "1 tsp paprika", "1 tbsp tomato paste", "1 1/2 cups red lentils, rinsed", "6 cups vegetable broth", "1 tsp salt", "1 lemon", "Pita bread, for serving"],
      ["Heat the oil in a big pot. Cook the onion and carrot for 6 minutes.", "Add the garlic, cumin, paprika and tomato paste for 1 minute.", "Add the lentils, broth and salt. Bring to a boil, then simmer for 20 minutes until the lentils fall apart.", "Blend until smooth, or leave it chunky.", "Squeeze in the lemon and serve with warm pita."],
      "In Turkey, families often eat this for breakfast on cold mornings."),
  ]),
];

// A video for each starter: the creator's own TikTok for the trending dishes, and a
// YouTube video from a well-known cook for the rest (their version of the dish).
const STARTER_VIDEOS = {
  "sheet-pan-salmon": "https://www.youtube.com/watch?v=pHzsIOmO2GA",
  "chicken-noodle-soup": "https://www.youtube.com/watch?v=06Vrqqo1SaU",
  "grilled-cheese-soup": "https://www.youtube.com/watch?v=3bs-fFz5wQo",
  "pinwheels": "https://www.youtube.com/watch?v=RQa7VtxNf2A",
  "pancakes": "https://www.youtube.com/watch?v=7ys0sQ7CkD0",
  "oatmeal": "https://www.youtube.com/watch?v=TbpsFaTSQOU",
  "scrambled-eggs": "https://www.youtube.com/watch?v=ZgpqLEZKVGw",
  "smoothie": "https://www.youtube.com/watch?v=ZWnVS7JI_pE",
  "parfait": "https://www.youtube.com/watch?v=o827swrnk44",
  "turkey-chili": "https://www.youtube.com/watch?v=SRV89xGUmaA",
  "chicken-tenders": "https://www.youtube.com/watch?v=ldD8Pu-MySY",
  "mac-and-cheese": "https://www.youtube.com/watch?v=LEcflVF2Qr8",
  "sloppy-joes": "https://www.youtube.com/watch?v=t2RRV6IFPDw",
  "mini-meatloaves": "https://www.youtube.com/watch?v=0NmHtvXMpWM",
  "beef-stew": "https://www.youtube.com/watch?v=S1B5nr5r3tk",
  "fish-sticks": "https://www.youtube.com/watch?v=dbHNwYXmRBU",
  "cheeseburgers": "https://www.youtube.com/watch?v=TNI0TZ7sLYQ",
  "baked-potato-bar": "https://www.youtube.com/watch?v=BFX9QJzd2ms",
  "french-toast": "https://www.youtube.com/watch?v=Km7KRbKVu88",
  "banana-oat-muffins": "https://www.youtube.com/watch?v=uPY2xF47uSg",
  "veggie-egg-muffins": "https://www.youtube.com/watch?v=J26ixgWpTEg",
  "tteokguk": "https://www.youtube.com/watch?v=P_PI1p3bnQU",
  "manduguk": "https://www.youtube.com/watch?v=a4nrLCNlsy8",
  "janchi-guksu": "https://www.youtube.com/watch?v=aH5RumwqYCg",
  "jjajangmyeon": "https://www.youtube.com/watch?v=F4Cm75Qvk4A",
  "gungjung-tteokbokki": "https://www.youtube.com/watch?v=w_GBd5YJtFU",
  "la-galbi": "https://www.youtube.com/watch?v=JAF3Bpy-AsY",
  "ganjang-jeyuk": "https://www.youtube.com/watch?v=SYNqIOHjiJE",
  "samgyetang": "https://www.youtube.com/watch?v=JUmFtHqwrnk",
  "gyeran-guk": "https://www.youtube.com/watch?v=4q6Ob5vpH68",
  "sigeumchi-doenjang-guk": "https://www.youtube.com/watch?v=5u8PA08c-_k",
  "eomuk-bokkeum": "https://www.youtube.com/watch?v=DT3eOimZzz4",
  "myeolchi-bokkeum": "https://www.youtube.com/watch?v=_bu2n6D0yiM",
  "oi-muchim": "https://www.youtube.com/watch?v=zau-F0L_hrY",
  "yubu-chobap": "https://www.youtube.com/watch?v=PVOUSVuOO8A",
  "bulgogi": "https://www.youtube.com/watch?v=3qBjL_HGvco",
  "japchae": "https://www.youtube.com/watch?v=i1djfV9uigc",
  "kimchi-fried-rice": "https://www.youtube.com/watch?v=Lf44Fk7H24s",
  "bibimbap": "https://www.youtube.com/watch?v=6KCWzRfFyr4",
  "doenjang-jjigae": "https://www.youtube.com/watch?v=WO6NEeCj660",
  "kimchi-jjigae": "https://www.youtube.com/watch?v=rJgb92JWMCE",
  "miyeok-guk": "https://www.youtube.com/watch?v=PmVvZeA4myo",
  "ganjang-chicken": "https://www.youtube.com/watch?v=BjBRtGUDfzY",
  "galbi-jjim": "https://www.youtube.com/watch?v=vtGzj6cUn7Q",
  "mackerel": "https://www.youtube.com/watch?v=ZMYtYwjLQCE",
  "dubu-jorim": "https://www.youtube.com/watch?v=ob2CYmTx9PM",
  "kongnamul-guk": "https://www.youtube.com/watch?v=iXCHOEPKqOs",
  "dakjuk": "https://www.youtube.com/watch?v=tUtlhEz4Was",
  "gyeran-jjim": "https://www.youtube.com/watch?v=WuNrLgh2Vw0",
  "sigeumchi-namul": "https://www.youtube.com/watch?v=P4JgJec4QQI",
  "kongnamul-muchim": "https://www.youtube.com/watch?v=NWfhIq_MiiU",
  "kimbap": "https://www.youtube.com/watch?v=syXr9kVTwO8",
  "spaghetti": "https://www.youtube.com/watch?v=GBEk8OCjQZA",
  "flatbread-pizza": "https://www.youtube.com/watch?v=WVLLvwcUqRY",
  "meatballs-marinara": "https://www.youtube.com/watch?v=Suu0jZtr_jM",
  "chicken-parmesan": "https://www.youtube.com/watch?v=Ml6GGWqRlSA",
  "minestrone": "https://www.youtube.com/watch?v=2bQdqBq8Ac8",
  "pesto-pasta": "https://www.youtube.com/watch?v=c2BkrkYx3_4",
  "lasagna": "https://www.youtube.com/watch?v=fVDsTP-pTXs",
  "chicken-broccoli-alfredo": "https://www.youtube.com/watch?v=CV7RZkUDHFE",
  "chicken-tacos": "https://www.youtube.com/watch?v=2641uVz9E6w",
  "chicken-fajitas": "https://www.youtube.com/watch?v=JeL5HwTChQE",
  "quesadillas": "https://www.youtube.com/watch?v=1dAACUeacZU",
  "breakfast-burritos": "https://www.youtube.com/watch?v=f0AQD5fBXOU",
  "chicken-enchiladas": "https://www.youtube.com/watch?v=76bJglYQhqw",
  "burrito-bowls": "https://www.youtube.com/watch?v=RMBti8WALKQ",
  "tortilla-soup": "https://www.youtube.com/watch?v=QBVuoaRUEko",
  "mexican-rice": "https://www.youtube.com/watch?v=Dce8LipEL30",
  "guacamole": "https://www.youtube.com/watch?v=VUz3wG0Wzws",
  "esquites": "https://www.youtube.com/watch?v=yqrz77u_F9Y",
  "teriyaki-chicken": "https://www.youtube.com/watch?v=LZ6rXyFRJjk",
  "egg-fried-rice": "https://www.youtube.com/watch?v=tn0YTv4S9vI",
  "beef-broccoli": "https://www.youtube.com/watch?v=n_0JYAQzYAg",
  "sweet-sour-chicken": "https://www.youtube.com/watch?v=UT3qngmEpU4",
  "potstickers": "https://www.youtube.com/watch?v=tFhdiIWyxZI",
  "tomato-egg": "https://www.youtube.com/watch?v=Wn8ox93Qhus",
  "lo-mein": "https://www.youtube.com/watch?v=LrjNFtgSXks",
  "chicken-katsu": "https://www.youtube.com/watch?v=0g9hC2xyY50",
  "oyakodon": "https://www.youtube.com/watch?v=Vlp6ufKYDzk",
  "miso-soup": "https://www.youtube.com/watch?v=m4zWYvSWyR8",
  "japanese-curry": "https://www.youtube.com/watch?v=s57Yi10AB08",
  "yaki-udon": "https://www.youtube.com/watch?v=QogTbx3loow",
  "gyudon": "https://www.youtube.com/watch?v=gCQGDWlVN50",
  "butter-chicken": "https://www.youtube.com/watch?v=aKV1BiLoo3Q",
  "chana-masala": "https://www.youtube.com/watch?v=EL9X-P98m2Q",
  "dal": "https://www.youtube.com/watch?v=3L0MZrLvyS0",
  "veg-pulao": "https://www.youtube.com/watch?v=xMCHFpJsZ_c",
  "mango-lassi": "https://www.youtube.com/watch?v=AMKoec4Ueo0",
  "pad-thai": "https://www.youtube.com/watch?v=vDHlwnUEalQ",
  "chicken-satay": "https://www.youtube.com/watch?v=9JzPXvV5c-I",
  "yellow-curry": "https://www.youtube.com/watch?v=zJiNkOQ_vAM",
  "pad-kra-pao": "https://www.youtube.com/watch?v=fYhTo_gb1G8",
  "mango-sticky-rice": "https://www.youtube.com/watch?v=HoB9Uj1cdts",
  "chicken-souvlaki": "https://www.youtube.com/watch?v=vmSnCeOeRO8",
  "greek-salad": "https://www.youtube.com/watch?v=dxy_1DPcNdM",
  "baked-falafel": "https://www.youtube.com/watch?v=ZzqJXWQjBW4",
  "shakshuka": "https://www.youtube.com/watch?v=nVoOz0_zf-Q",
  "lentil-soup": "https://www.youtube.com/watch?v=srnFEHpq184",

  "salmon-rice-bowl": "https://www.tiktok.com/@emilymariko/video/7010506729012219141",
  "rice-paper-dumplings": "https://www.tiktok.com/@okonomikitchen/video/7395975931912883461",
  "dumpling-lasagna": "https://www.tiktok.com/@myhealthydish/video/7600576064703728951",
  "gochujang-butter-noodles": "https://www.tiktok.com/@misojenkitchen/video/7221624675728903470",
  "marry-me-chicken": "https://www.tiktok.com/@delish/video/7063524229110566191",
  "cottage-cheese-flatbread": "https://www.tiktok.com/@kalejunkie/video/7371570213797563691",
  "baked-feta-pasta": "https://www.tiktok.com/@grilledcheesesocial/video/6922946148760030469",
  // Batch 4 and the Korean starters that didn't have one yet.
  "bulgogi-tacos": "https://www.youtube.com/watch?v=rAxAzHaowyA",
  "kimchi-quesadilla": "https://www.youtube.com/watch?v=-RldQgx6V9w",
  "bulgogi-cheesesteak": "https://www.youtube.com/watch?v=xLn8rMO5qkQ",
  "korean-corn-dogs": "https://www.youtube.com/watch?v=5XcNqkijrzs",
  "kimchi-mac-and-cheese": "https://www.youtube.com/watch?v=j1qo2KDaTho",
  "kimchi-grilled-cheese": "https://www.youtube.com/watch?v=PauB8JW_s9E",
  "gilgeori-toast": "https://www.youtube.com/watch?v=qzZY7oDpdwU",
  "egg-drop-sandwich": "https://www.youtube.com/watch?v=e4jYOnzr8eU",
  "bulgogi-burgers": "https://www.youtube.com/watch?v=huysMNDwV7k",
  "bulgogi-pizza": "https://www.youtube.com/watch?v=Wc4zuP_YXuQ",
  "gochujang-meatballs": "https://www.youtube.com/watch?v=rvYvkfpwIUM",
  "gochujang-salmon": "https://www.youtube.com/watch?v=nUs2PGNBLHc",
  "dakgangjeong": "https://www.youtube.com/watch?v=jSh6VJYRV-g",
  "gochujang-wings": "https://www.youtube.com/watch?v=BwKQLHPErpo",
  "budae-jjigae": "https://www.youtube.com/watch?v=euVyBKNfxkk",
  "rabokki": "https://www.youtube.com/watch?v=1oCGL_HPODQ",
  "rose-tteokbokki": "https://www.youtube.com/watch?v=fX7D5F0bjX0",
  "cheese-ramyeon": "https://www.youtube.com/watch?v=QUG6AxFLOz8",
  "jeyuk-bokkeum": "https://www.youtube.com/watch?v=Ih0YtdaXofA",
  "dak-bulgogi": "https://www.youtube.com/watch?v=OKqnWg4JtwA",
  "jjimdak": "https://www.youtube.com/watch?v=UQ0inU9LE4I",
  "dakdoritang": "https://www.youtube.com/watch?v=T7icxr899qc",
  "gamja-jeon": "https://www.youtube.com/watch?v=4HPsl36bbIY",
  "kimchi-jeon": "https://www.youtube.com/watch?v=05SSlcjIsWM",
  "homemade-mandu": "https://www.youtube.com/watch?v=OGmVfCHszp0",
  "soegogi-muguk": "https://www.youtube.com/watch?v=NefPocSaeDU",
  "ssam-night": "https://www.youtube.com/watch?v=HNhIylpsmmA",
  "bibim-guksu": "https://www.youtube.com/watch?v=8l9_OE9c6vg",
  "dubu-gangjeong": "https://www.youtube.com/watch?v=rJooANabXpE",
  "sotteok-sotteok": "https://www.youtube.com/watch?v=KApoL-IBd4k",
  "goguma-mattang": "https://www.youtube.com/watch?v=-IBGhTSOsJg",
  "dak-kalguksu": "https://www.youtube.com/watch?v=5Ceg1QN56p0",
  "beef-bulgogi-bowl": "https://www.youtube.com/watch?v=5YMJqshTBMI",
  "gamja-jorim": "https://www.youtube.com/watch?v=GZ5ST5XbiIo",
  "hobak-jeon": "https://www.youtube.com/watch?v=xTiqBDd1eZE",
  "gyeran-mari": "https://www.youtube.com/watch?v=kN89ewZjOR8",
  "jumeokbap": "https://www.youtube.com/watch?v=q02C-WeeRss",
  "gyeran-bap": "https://www.youtube.com/watch?v=VGxhL1iS5kk",
  "yachae-jeon": "https://www.youtube.com/watch?v=knxgR5esJu4",
  "goguma": "https://www.youtube.com/watch?v=eaFRLAXnaPc",
  "tuna-mayo-bowl": "https://www.youtube.com/watch?v=leBxyqUnZbw",
  "corn-cheese": "https://www.youtube.com/watch?v=iuG2AXehmzw",
  "hotteok": "https://www.youtube.com/watch?v=R_MPEq53QFs",
};

// The earlier starters that aren't Korean or American.
const STARTER_CUISINES = {
  spaghetti: "italian", "flatbread-pizza": "italian", "baked-feta-pasta": "italian",
  "chicken-tacos": "mexican", "chicken-fajitas": "mexican", quesadillas: "mexican", "breakfast-burritos": "mexican",
  "teriyaki-chicken": "japanese", "salmon-rice-bowl": "japanese",
  "dumpling-lasagna": "chinese", "rice-paper-dumplings": "chinese",
  "veggies-hummus": "mediterranean",
};

// batch: when a starter was added to the app. Families who use the starter menu
// get each new batch once (see startersToAdd).
export const STARTER_DISHES = [
  ...FIRST_STARTERS.map((dish) => ({ ...dish, batch: 1 })),
  ...MORE_STARTERS.map((dish) => ({ ...dish, batch: 2 })),
  ...WORLD_STARTERS.map((dish) => ({ ...dish, batch: 3 })),
  ...FUSION_STARTERS.map((dish) => ({ ...dish, batch: 4 })),
].map((dish) => ({
  ...dish,
  cuisine: dish.cuisine || STARTER_CUISINES[dish.seedKey] || (dish.categories.includes("korean") ? "korean" : "american"),
  videoUrl: STARTER_VIDEOS[dish.seedKey] || "",
}));
export const LATEST_STARTER_BATCH = 4;

const CUISINE_KEYS = new Set(CUISINES.map((c) => c.key));
const SEED_CUISINE = new Map(STARTER_DISHES.map((dish) => [dish.seedKey, dish.cuisine]));

/**
 * A dish's kind of food. Dishes saved before kinds existed get their starter
 * recipe's kind, or Korean if they're tagged Korean.
 */
export function cuisineOf(dish) {
  if (CUISINE_KEYS.has(dish?.cuisine)) return dish.cuisine;
  return SEED_CUISINE.get(dish?.seedKey) || (dish?.categories?.includes("korean") ? "korean" : "other");
}

/**
 * The starters a family hasn't been given yet. starterBatch is the newest batch
 * they've had; before batches existed it wasn't saved, so a family with any
 * starter dish had batch 1, and one without any said no to starters.
 * Dishes they already have (or deleted from an earlier batch) aren't returned.
 */
export function startersToAdd({ starterBatch, haveSeedKeys }) {
  // No starter dishes at all: they said no to them (or removed every one).
  if (!haveSeedKeys.size) return [];
  const seen = starterBatch ?? 1;
  return STARTER_DISHES.filter((dish) => dish.batch > seen && !haveSeedKeys.has(dish.seedKey));
}

/**
 * Starter dishes a family already has that can now get a video: ones with no
 * video that nobody took a video off. Returns [{ id, videoUrl }].
 */
export function starterVideoFills(dishes) {
  const bySeed = new Map(STARTER_DISHES.map((dish) => [dish.seedKey, dish]));
  return dishes
    .filter((dish) => dish.seedKey && !dish.videoUrl && !dish.videoRemoved && bySeed.get(dish.seedKey)?.videoUrl)
    .map((dish) => ({ id: dish.id, videoUrl: bySeed.get(dish.seedKey).videoUrl }));
}

// Recipes by well-known cooks. Tapping "Add" has Claude read the page.
// cuisine picks the Discover tab; note is what people who made it said.
const korean = (by, list) => list.map(([name, nameKo, emoji, url, meal]) => ({ name, nameKo, emoji, by, url, meal, cuisine: "korean" }));
const kind = (cuisine) => (by, list) => list.map(([name, emoji, url, meal]) => ({ name, nameKo: "", emoji, by, url, meal, cuisine }));
const american = kind("american");
const italian = kind("italian");
const mexican = kind("mexican");
const chinese = kind("chinese");
const japanese = kind("japanese");
const indian = kind("indian");
const thai = kind("thai");
const mediterranean = kind("mediterranean");

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
  { cuisine: "trending", name: "Korean Spicy Tuna Rice", nameKo: "", emoji: "🍚", by: "My Korean Kitchen", url: "https://mykoreankitchen.com/korean-spicy-tuna/", meal: "lunch",
    note: "Went viral after Cardi B showed it on Instagram Live." },

  // ---- 🇰🇷 Korean ----

  // ---- 🌮 Korean fusion and 🇰🇷 more Korean family favorites ----
  { cuisine: "fusion", name: "Bulgogi Taco Bar", nameKo: "", emoji: "🌮", by: "My Korean Kitchen", url: "https://mykoreankitchen.com/bulgogi-taco-bar/", meal: "dinner" },
  { cuisine: "fusion", name: "Easy Kimchi Quesadillas", nameKo: "", emoji: "🧀", by: "Kimchimari", url: "https://kimchimari.com/easy-kimchi-quesadillas/", meal: "lunch" },
  { cuisine: "fusion", name: "Korean Cheese Corn Dogs", nameKo: "", emoji: "🌭", by: "Beyond Kimchee", url: "https://www.beyondkimchee.com/korean-corn-dog/", meal: "snack" },
  { cuisine: "fusion", name: "Kimchi Mac and Cheese", nameKo: "", emoji: "🧀", by: "Judy Joo", url: "https://www.judyjoo.com/recipes/kimchi-mac-and-cheese-42/", meal: "dinner" },
  { cuisine: "fusion", name: "Korean Tofu Burritos with Kimchi Fried Rice", nameKo: "", emoji: "🌯", by: "Judy Joo", url: "https://www.judyjoo.com/recipes/korean-marinated-tofu-burritos-52/", meal: "lunch" },
  { cuisine: "fusion", name: "Baked Gochujang Chicken Wings", nameKo: "", emoji: "🍗", by: "Korean Bapsang", url: "https://www.koreanbapsang.com/chicken-wings/", meal: "dinner" },
  { cuisine: "fusion", name: "Gochujang Salmon with Multigrain Rice", nameKo: "", emoji: "🐟", by: "Judy Joo", url: "https://www.judyjoo.com/recipes/gochujang-salmon-with-multi-grain-rice-84/", meal: "dinner" },
  { cuisine: "fusion", name: "Bulgogi Rice Burger", nameKo: "", emoji: "🍔", by: "My Korean Kitchen", url: "https://mykoreankitchen.com/bulgogi-rice-burger/", meal: "lunch" },
  { cuisine: "fusion", name: "Spam Kimbap", nameKo: "", emoji: "🍙", by: "Seonkyoung Longest", url: "https://seonkyounglongest.com/spam-kimbap/", meal: "lunch" },
  { cuisine: "fusion", name: "Philly-Style Bulgogi Cheesesteak", nameKo: "", emoji: "🥖", by: "Beyond Kimchee", url: "https://www.beyondkimchee.com/bulgogi-cheesesteak/", meal: "dinner" },
  { cuisine: "fusion", name: "Bulgogi Pizza", nameKo: "", emoji: "🍕", by: "My Korean Kitchen", url: "https://mykoreankitchen.com/bulgogi-pizza/", meal: "dinner" },
  { cuisine: "fusion", name: "Kimchi Grilled Cheese", nameKo: "", emoji: "🥪", by: "Aaron and Claire", url: "https://aaronandclaire.com/kimchi-grilled-cheese/", meal: "lunch" },
  { cuisine: "fusion", name: "Korean Fried Chicken Sandwich", nameKo: "", emoji: "🍔", by: "Aaron and Claire", url: "https://aaronandclaire.com/best-korean-fried-chicken-sandwich-recipe/", meal: "dinner" },
  { cuisine: "korean", name: "Dakgangjeong (Soy Garlic Fried Chicken)", nameKo: "", emoji: "🍗", by: "My Korean Kitchen", url: "https://mykoreankitchen.com/dakgangjeong-soy-garlic-fried-chicken/", meal: "dinner" },
  { cuisine: "korean", name: "Rosé Tteokbokki", nameKo: "", emoji: "🌸", by: "Aaron and Claire", url: "https://aaronandclaire.com/rose-tteokbokki/", meal: "lunch" },
  { cuisine: "korean", name: "Easy Rabokki", nameKo: "", emoji: "🍜", by: "Chef Chris Cho", url: "https://chefchrischo.com/rabokki/", meal: "snack" },
  { cuisine: "korean", name: "Budae Jjigae (Army Base Stew)", nameKo: "", emoji: "🍲", by: "Maangchi", url: "https://www.maangchi.com/recipe/budae-jjigae", meal: "dinner" },
  { cuisine: "korean", name: "Jjimdak (Braised Chicken)", nameKo: "", emoji: "🍗", by: "Korean Bapsang", url: "https://www.koreanbapsang.com/jjimdakdakjjim-korean-style-braised/", meal: "dinner" },
  { cuisine: "korean", name: "Gamja Jeon (Crispy Potato Pancakes)", nameKo: "", emoji: "🥔", by: "Kimchimari", url: "https://kimchimari.com/korean-potato-pancakes-gamjajeon/", meal: "snack" },
  { cuisine: "korean", name: "Classic Mandu (Dumplings)", nameKo: "", emoji: "🥟", by: "Maangchi", url: "https://www.maangchi.com/recipe/classic-mandu", meal: "lunch" },
  { cuisine: "korean", name: "Sotteok Sotteok (Rice Cake & Sausage Skewers)", nameKo: "", emoji: "🍢", by: "My Korean Kitchen", url: "https://mykoreankitchen.com/sotteok-sotteok/", meal: "snack" },
  { cuisine: "korean", name: "Goguma Mattang (Candied Sweet Potato)", nameKo: "", emoji: "🍠", by: "Maangchi", url: "https://www.maangchi.com/recipe/mattang", meal: "snack" },
  { cuisine: "korean", name: "Dak Kalguksu (Chicken Noodle Soup)", nameKo: "", emoji: "🍜", by: "Korean Bapsang", url: "https://www.koreanbapsang.com/dak-kalguksu-chicken-noodle-soup/", meal: "lunch" },
  { cuisine: "korean", name: "Gyeran Ppang (Egg Bread)", nameKo: "", emoji: "🍞", by: "Beyond Kimchee", url: "https://www.beyondkimchee.com/korean-egg-bread/", meal: "breakfast" },
  { cuisine: "korean", name: "Gilgeori Toast (Street Toast)", nameKo: "", emoji: "🍞", by: "Korean Bapsang", url: "https://www.koreanbapsang.com/gilgeori-toast-korean-street-toast/", meal: "breakfast" },
  { cuisine: "korean", name: "Soegogi Muguk (Beef & Radish Soup)", nameKo: "", emoji: "🍲", by: "Maangchi", url: "https://www.maangchi.com/recipe/soegogi-muguk", meal: "breakfast" },
  { cuisine: "korean", name: "Easy Ground Beef Bibimbap", nameKo: "", emoji: "🥗", by: "Beyond Kimchee", url: "https://www.beyondkimchee.com/bibimbap/", meal: "dinner" },
  { cuisine: "korean", name: "Dubu Ganjang Jorim (Soy Tofu)", nameKo: "", emoji: "🥢", by: "Maangchi", url: "https://www.maangchi.com/recipe/dubu-ganjangjorim", meal: "dinner" },
  { cuisine: "korean", name: "Japgokbap (Multigrain Rice)", nameKo: "", emoji: "🍚", by: "Chef Chris Cho", url: "https://chefchrischo.com/korean-multigrain-rice/", meal: "dinner" },
  { cuisine: "korean", name: "Godeungeo Gui (Grilled Mackerel)", nameKo: "", emoji: "🐟", by: "Futuredish", url: "https://futuredish.com/korean-grilled-mackerel-everyday-korean-breakfast/", meal: "breakfast" },
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

  ...american("Sally's Baking Addiction", [
    ["Banana Muffins", "🧁", "https://sallysbakingaddiction.com/banana-muffins/", "breakfast"],
    ["Blueberry Banana Muffins", "🫐", "https://sallysbakingaddiction.com/blueberry-banana-muffins/", "breakfast"],
    ["Peanut Butter Banana Muffins", "🥜", "https://sallysbakingaddiction.com/peanut-butter-banana-muffins/", "snack"],
  ]),
  ...american("Super Healthy Kids", [
    ["Homemade Fish Sticks", "🐟", "https://www.superhealthykids.com/homemade-fish-sticks/", "dinner"],
  ]),

  // ---- 🇮🇹 Italian ----
  ...italian("Inspired Taste", [
    ["Flatbread Pizza", "🍕", "https://www.inspiredtaste.net/46230/flatbread-pizza/", "dinner"],
  ]),

  // ---- 🇲🇽 Mexican ----
  ...mexican("Rick Bayless", [
    ["Simple Guacamole for Tacos", "🥑", "https://www.rickbayless.com/recipe/simple-guacamole-for-tacos/", "snack"],
  ]),
  ...mexican("Budget Bytes", [
    ["Oven Fajitas", "🫑", "https://www.budgetbytes.com/oven-fajitas/", "dinner"],
    ["Sheet Pan Tacos", "🌮", "https://www.budgetbytes.com/sheet-pan-tacos/", "dinner"],
    ["BBQ Chicken Burrito Bowls", "🌯", "https://www.budgetbytes.com/bbq-chicken-burrito-bowls/", "dinner"],
  ]),

  // ---- 🇨🇳 Chinese ----
  ...chinese("Budget Bytes", [
    ["Sheet Pan Sweet and Sour Chicken", "🍍", "https://www.budgetbytes.com/sheet-pan-sweet-sour-chicken/", "dinner"],
  ]),

  // ---- 🇯🇵 Japanese ----
  ...japanese("Just One Cookbook", [
    ["Chicken Teriyaki", "🍗", "https://www.justonecookbook.com/chicken-teriyaki/", "dinner"],
    ["Oyakodon (Chicken & Egg Bowl)", "🍚", "https://www.justonecookbook.com/oyakodon/", "dinner"],
    ["Gyudon (Beef Bowl)", "🍚", "https://www.justonecookbook.com/gyudon/", "dinner"],
    ["Yaki Udon", "🍜", "https://www.justonecookbook.com/yaki-udon/", "lunch"],
  ]),
  ...japanese("RecipeTin Japan", [
    ["Katsu Curry", "🍛", "https://japan.recipetineats.com/katsu-curry-japanese-curry-rice-with-chicken-cutlet/", "dinner"],
  ]),

  // ---- 🇮🇳 Indian ----
  ...indian("Hebbars Kitchen", [
    ["Dal Tadka (Yellow Dal)", "🥣", "https://hebbarskitchen.com/dal-tadka-recipe-yellow-dal-tadka/", "dinner"],
    ["Chana Masala", "🫘", "https://hebbarskitchen.com/chana-masala-recipe-chickpea-masala/", "dinner"],
    ["Veg Pulao", "🍚", "https://hebbarskitchen.com/veg-pulao-recipe-vegetable-pulao/", "lunch"],
    ["Mango Lassi", "🥭", "https://hebbarskitchen.com/mango-lassi-recipe-aam-ki-lassi/", "snack"],
  ]),

  // ---- 🇹🇭 Thai ----
  ...thai("Hot Thai Kitchen", [
    ["Best Pad Thai", "🍜", "https://hot-thai-kitchen.com/best-pad-thai", "dinner"],
    ["Yellow Curry Chicken", "🍛", "https://hot-thai-kitchen.com/yellow-curry-chicken/", "dinner"],
    ["Pad Kra Pao (Basil Stir-Fry)", "🌿", "https://hot-thai-kitchen.com/pad-kra-pao-anything", "dinner"],
    ["Mango Sticky Rice", "🥭", "https://hot-thai-kitchen.com/mango-sticky-rice/", "snack"],
  ]),
  ...thai("Marion's Kitchen", [
    ["Chicken Pad Thai", "🍜", "https://www.marionskitchen.com/chicken-pad-thai", "dinner"],
  ]),

  // ---- 🫒 Mediterranean ----
  ...mediterranean("The Mediterranean Dish", [
    ["Shakshuka", "🍳", "https://www.themediterraneandish.com/shakshuka-recipe/", "breakfast"],
    ["Turkish Red Lentil Soup", "🥣", "https://www.themediterraneandish.com/turkish-lentil-soup/", "lunch"],
  ]),
];
