// Starter batch 5: more Korean and Korean-American family dishes: stews and
// soups, banchan, street snacks and lunchbox favorites, a few spicy ones (the
// Mild switch tones them down). healthyTip is what the Healthy switch adds.
// Home-style versions written for this app, like the other starters.

const d = (key, name, nameKo, emoji, meals, categories, servings, prepMinutes, cookMinutes, spicy, ingredients, steps, notes = "", healthyTip = "") => ({
  seedKey: key, name, nameKo, emoji, meals, categories, servings, prepMinutes, cookMinutes, spicy, ingredients, steps, notes, healthyTip,
});

const as = (cuisine, dishes) => dishes.map((dish) => ({ ...dish, cuisine }));

export const MORE_KOREAN_STARTERS = [
  ...as("korean", [
    d("sundubu-jjigae", "Soft Tofu Stew (Sundubu Jjigae)", "순두부찌개", "🍲", ["dinner"], ["korean", "soup", "kid-favorite"], 4, 10, 15, 2,
      ["2 tubes (11 oz each) extra-soft tofu (sundubu)", "4 oz pork belly or ground pork", "1/2 onion, chopped", "1/2 cup kimchi, chopped", "2 tbsp gochugaru", "1 tbsp vegetable oil", "2 cloves garlic, minced", "2 tbsp soy sauce", "2 cups anchovy broth or water", "4 eggs", "2 green onions, sliced"],
      ["Heat the oil in a pot. Cook the pork for 3 minutes until no longer pink.", "Add the onion, kimchi and garlic and cook for 2 minutes.", "Stir in the gochugaru for 30 seconds, then add the broth and soy sauce. Bring to a boil.", "Squeeze in the soft tofu in big spoonfuls. Simmer gently for 5 minutes.", "Crack the eggs on top, cover and cook for 2 minutes until the whites are just set.", "Top with green onions and serve bubbling, with rice."],
      "Kids love cracking their own egg into the hot stew. Careful, the bowl stays very hot.",
      "Use lean pork or shrimp instead of pork belly, and add zucchini and mushrooms."),

    d("dak-galbi", "Cheesy Stir-Fried Chicken (Dak Galbi)", "치즈 닭갈비", "🍗", ["dinner"], ["korean", "meat", "kid-favorite"], 4, 30, 20, 2,
      ["1 1/2 lb boneless chicken thighs, cut into bite-size pieces", "3 tbsp gochujang", "1 tbsp gochugaru", "2 tbsp soy sauce", "2 tbsp honey", "3 cloves garlic, minced", "1 tsp grated ginger", "1 tbsp vegetable oil", "1/4 cabbage, cut into pieces", "1 sweet potato, sliced thin", "1/2 onion, sliced", "1 cup rice cakes (tteok)", "1 cup shredded mozzarella", "4 perilla or lettuce leaves, for wrapping (optional)"],
      ["Mix the gochujang, gochugaru, soy sauce, honey, garlic and ginger. Toss with the chicken and marinate for 20 minutes.", "Heat the oil in a big pan. Add the cabbage, sweet potato and onion and cook for 3 minutes.", "Add the chicken and rice cakes. Cook, stirring, for 10 to 12 minutes until the chicken is cooked through and the sweet potato is soft.", "Push everything to the sides, pile the mozzarella in the middle, cover and cook for 2 minutes until melted.", "Scoop chicken through the cheese and eat with rice or wrapped in a leaf."],
      "Cheese in the middle cools the heat, so even mild eaters dip in.",
      "Use chicken breast, double the cabbage, and go light on the cheese."),

    d("bossam", "Boiled Pork Wraps (Bossam)", "보쌈", "🥬", ["dinner"], ["korean", "meat", "healthy"], 4, 10, 60, 0,
      ["2 lb pork belly or pork shoulder, in one piece", "1 onion, cut in half", "4 cloves garlic", "1 inch ginger, sliced", "2 tbsp doenjang", "1 tbsp instant coffee or 1 cup brewed coffee", "8 cups water", "1 head napa cabbage or lettuce, leaves separated", "Ssamjang, for dipping", "Kimchi, for serving"],
      ["Put the pork, onion, garlic, ginger, doenjang and coffee in a big pot with the water.", "Bring to a boil, then simmer covered for 50 to 60 minutes until a chopstick goes in easily.", "Let the pork rest for 10 minutes, then slice it thin.", "Wrap a slice of pork in a cabbage or lettuce leaf with a little ssamjang and kimchi."],
      "The doenjang and coffee take away the porky smell; you won't taste the coffee.",
      "Use pork shoulder (leaner) and lots of leafy wraps and sliced cucumber."),

    d("kongguksu", "Cold Soy Milk Noodles (Kongguksu)", "콩국수", "🍜", ["lunch"], ["korean", "noodles", "quick", "healthy"], 4, 10, 10, 0,
      ["1 lb thin wheat noodles (somyeon)", "4 cups unsweetened soy milk, cold", "1/4 cup toasted sesame seeds", "1/4 cup unsalted roasted peanuts or pine nuts", "1 tsp salt", "1 cucumber, cut into matchsticks", "1 tomato, sliced", "Ice cubes, to serve"],
      ["Blend the soy milk, sesame seeds, peanuts and salt until very smooth. Chill.", "Cook the noodles as the package says, about 4 minutes. Rinse in cold water until cold.", "Put the noodles in bowls and pour the cold soy milk over them.", "Top with cucumber, tomato and a few ice cubes."],
      "A cool, creamy summer lunch. Kids add a pinch of sugar, grown-ups more salt.",
      "Use whole-wheat noodles and add extra cucumber."),

    d("haemul-pajeon", "Seafood Green Onion Pancake (Haemul Pajeon)", "해물파전", "🥞", ["lunch", "dinner", "snack"], ["korean", "seafood", "kid-favorite"], 4, 15, 15, 0,
      ["1 cup all-purpose flour", "2 tbsp potato starch or cornstarch", "1 cup cold water", "1 egg", "1/2 tsp salt", "1 bunch green onions, cut into 4-inch pieces", "1 cup mixed seafood (shrimp, squid), chopped", "3 tbsp vegetable oil", "Dipping sauce:", "2 tbsp soy sauce", "1 tbsp rice vinegar", "1 tsp sesame seeds"],
      ["Whisk the flour, starch, water, egg and salt into a thin batter.", "Heat half the oil in a big pan over medium-high heat. Lay half the green onions in the pan.", "Scatter half the seafood on top and pour half the batter over to cover.", "Cook for 3 to 4 minutes until crispy underneath, flip, and cook 3 minutes more. Repeat.", "Mix the soy sauce, vinegar and sesame seeds for dipping. Cut the pancakes into squares."],
      "A rainy-day favorite. Cut into small squares so little hands can dip them.",
      "Use half whole-wheat flour, less oil, and add sliced zucchini."),

    d("galbitang", "Beef Short Rib Soup (Galbitang)", "갈비탕", "🍲", ["dinner"], ["korean", "soup", "meat"], 4, 15, 90, 0,
      ["2 lb beef short ribs", "1 Korean radish (mu), about 1 lb, cut into chunks", "1 onion, cut in half", "6 cloves garlic", "1 inch ginger, sliced", "10 cups water", "2 tbsp soup soy sauce or soy sauce", "1 tsp salt", "4 oz sweet potato glass noodles (dangmyeon), soaked", "2 green onions, sliced", "2 eggs, beaten into a thin omelet and sliced (optional)"],
      ["Soak the ribs in cold water for 30 minutes, then rinse.", "Boil the ribs in fresh water for 5 minutes, drain and rinse, so the soup stays clear.", "Put the ribs, radish, onion, garlic, ginger and 10 cups water in a pot. Simmer covered for 1 hour 15 minutes.", "Take out the onion, garlic and ginger. Skim off the fat. Season with soy sauce and salt.", "Add the glass noodles for the last 5 minutes. Top with green onions and the egg strips."],
      "A clear, gentle soup most kids love. Cut the meat off the bone for little ones.",
      "Chill the broth so the fat hardens on top and lift it off, and add more radish."),

    d("jangjorim", "Soy-Braised Beef and Eggs (Jangjorim)", "장조림", "🥚", ["dinner", "lunch"], ["korean", "side", "meat", "lunchbox", "kid-favorite"], 6, 15, 60, 0,
      ["1 lb beef brisket or eye of round, cut into 3 pieces", "6 cups water", "1/2 onion", "4 cloves garlic", "1/2 cup soy sauce", "3 tbsp sugar", "1 tbsp rice syrup or honey", "6 hard-boiled eggs, peeled", "10 shishito peppers (optional)"],
      ["Simmer the beef with the water, onion and garlic for 40 minutes, skimming the foam.", "Take out the onion and garlic. Add the soy sauce, sugar and rice syrup.", "Add the eggs and simmer for 15 minutes, turning the eggs now and then so they color evenly.", "Add the peppers for the last 3 minutes. Let it cool.", "Shred the beef along the grain and keep everything in the sauce in the fridge."],
      "A make-ahead banchan for busy weeks: a spoonful of beef, half an egg and some sauce over rice.",
      "Use half the sugar and a lean cut like eye of round."),

    d("gyeranppang", "Egg Bread (Gyeranppang)", "계란빵", "🍞", ["breakfast", "snack"], ["korean", "kid-favorite", "treat"], 6, 10, 15, 0,
      ["1 cup pancake mix", "1/2 cup milk", "1 egg, plus 6 eggs for the tops", "1 tbsp sugar", "1 tbsp melted butter", "2 slices ham, chopped (optional)", "1/4 cup shredded mozzarella", "Salt and black pepper"],
      ["Heat the oven to 375°F. Grease 6 cups of a muffin tin.", "Mix the pancake mix, milk, 1 egg, sugar and butter into a batter.", "Fill each cup halfway with batter. Sprinkle in a little ham and cheese.", "Crack an egg on top of each one. Sprinkle with a pinch of salt and pepper.", "Bake for 15 to 18 minutes until the egg is set and the bread is golden."],
      "The famous Korean street snack, made in a muffin tin. Kids crack the eggs.",
      "Use whole-wheat pancake mix, skip the ham, and add chopped spinach."),

    d("tteok-kkochi", "Rice Cake Skewers (Tteok Kkochi)", "떡꼬치", "🍢", ["snack"], ["korean", "kid-favorite", "treat"], 4, 10, 10, 1,
      ["1 lb cylinder rice cakes (tteok)", "2 tbsp vegetable oil", "Sauce:", "2 tbsp ketchup", "1 tbsp gochujang", "1 tbsp honey", "1 tbsp soy sauce", "1 tbsp water", "1 tsp sesame seeds", "8 wooden skewers"],
      ["If the rice cakes are hard, soak them in warm water for 10 minutes. Pat dry.", "Thread 4 or 5 rice cakes onto each skewer.", "Mix the ketchup, gochujang, honey, soy sauce and water in a small pan. Simmer for 1 minute.", "Heat the oil in a pan and fry the skewers for 2 to 3 minutes a side until crispy.", "Brush with the sauce and sprinkle with sesame seeds."],
      "Sweet, a little spicy, crunchy outside and chewy inside: the after-school snack in Korea.",
      "Pan-fry with just a brush of oil and use half the honey."),

    d("musaengchae", "Sweet and Tangy Radish Salad (Musaengchae)", "무생채", "🥕", ["dinner"], ["korean", "side", "veggie", "quick", "healthy"], 6, 15, 0, 1,
      ["1 lb Korean radish (mu), cut into thin matchsticks", "1 tsp salt", "1 tbsp gochugaru", "1 tbsp sugar", "1 tbsp rice vinegar", "1 clove garlic, minced", "1 green onion, sliced", "1 tsp sesame seeds"],
      ["Toss the radish with the salt and leave for 10 minutes. Squeeze out the water.", "Rub the gochugaru into the radish first so it turns red.", "Add the sugar, vinegar, garlic and green onion and mix well.", "Sprinkle with sesame seeds. It keeps a few days in the fridge."],
      "Crunchy and bright. For a mild version, skip the gochugaru and add a little more sugar and vinegar.",
      "Use half the sugar."),

    d("dubu-buchim", "Pan-Fried Tofu with Soy Sauce (Dubu Buchim)", "두부부침", "⬜", ["dinner", "lunch"], ["korean", "side", "veggie", "quick", "healthy"], 4, 5, 15, 0,
      ["14 oz firm tofu", "1/2 tsp salt", "2 tbsp vegetable oil", "Sauce:", "2 tbsp soy sauce", "1 tbsp water", "1 tsp sugar", "1 tsp sesame oil", "1 green onion, sliced", "1 tsp sesame seeds"],
      ["Slice the tofu into 1/2-inch-thick squares. Sprinkle with salt and pat dry.", "Heat the oil in a pan over medium heat. Fry the tofu for 4 minutes a side until golden.", "Mix the soy sauce, water, sugar, sesame oil and green onion.", "Spoon the sauce over the hot tofu and sprinkle with sesame seeds."],
      "Crispy outside, soft inside. A great first tofu dish for kids.",
      "Use low-sodium soy sauce and a nonstick pan with less oil."),

    d("kongnamul-bap", "Soybean Sprout Rice (Kongnamul Bap)", "콩나물밥", "🍚", ["dinner", "lunch"], ["korean", "rice", "healthy"], 4, 10, 30, 0,
      ["2 cups short-grain rice, rinsed", "2 cups water", "8 oz soybean sprouts, rinsed", "4 oz ground beef or pork (optional)", "1 tbsp soy sauce", "1 tsp sesame oil", "Sauce:", "3 tbsp soy sauce", "1 tsp gochugaru (optional)", "1 green onion, chopped", "1 tsp sesame oil", "1 tsp sesame seeds"],
      ["Mix the meat with 1 tbsp soy sauce and 1 tsp sesame oil.", "Put the rice and water in a pot. Spread the meat and then the sprouts on top.", "Bring to a boil, cover, turn the heat to low and cook for 15 minutes. Turn off the heat and let it steam for 10 minutes.", "Mix the sauce ingredients. Stir the rice and sprouts together and serve with the sauce."],
      "Cook the sprouts with the lid on the whole time so they don't smell grassy.",
      "Use brown rice (cook it longer) and skip the meat or use lean beef."),

    d("eomuk-tang", "Fish Cake Soup (Eomuk Tang)", "어묵탕", "🍢", ["dinner", "lunch"], ["korean", "soup", "seafood", "quick", "kid-favorite"], 4, 10, 20, 0,
      ["8 oz Korean fish cakes (eomuk), cut into pieces or threaded on skewers", "6 cups anchovy broth or water", "1/2 Korean radish (mu), sliced", "1/2 onion, sliced", "2 tbsp soup soy sauce or soy sauce", "1/2 tsp salt", "2 green onions, sliced", "1 green chili, sliced (optional)"],
      ["Simmer the radish and onion in the broth for 10 minutes until the radish is soft.", "Add the fish cakes and soy sauce and simmer for 5 minutes.", "Season with salt. Top with green onions, and chili for grown-ups."],
      "The warm street-cart soup kids love to eat off skewers. Blanch the fish cakes in hot water first to take off some oil.",
      "Use more radish and fewer fish cakes, and low-sodium soy sauce."),

    d("hobak-juk", "Sweet Pumpkin Porridge (Hobak Juk)", "호박죽", "🎃", ["breakfast", "snack"], ["korean", "veggie", "healthy"], 4, 15, 30, 0,
      ["1 kabocha squash (about 2 lb), peeled, seeded and cut into chunks", "4 cups water", "1/3 cup sweet rice flour (glutinous rice flour)", "1/2 cup water, for the flour", "2 tbsp sugar", "1/2 tsp salt", "1/4 cup canned red beans (optional)"],
      ["Simmer the squash in 4 cups water for 15 minutes until very soft.", "Mash or blend it until smooth, right in the pot.", "Mix the sweet rice flour with 1/2 cup water and stir it in.", "Simmer, stirring, for 8 to 10 minutes until thick. Add the sugar, salt and red beans."],
      "Sunny orange and naturally sweet. Kids like it warm for breakfast on a cold day.",
      "Use half the sugar; the squash is sweet enough."),
  ]),
  ...as("fusion", [
    d("spam-musubi", "Spam Musubi", "스팸 무스비", "🍙", ["lunch", "snack"], ["rice", "lunchbox", "kid-favorite"], 8, 15, 10, 0,
      ["1 can (12 oz) Spam, sliced into 8 slices", "3 cups cooked short-grain rice", "2 tbsp soy sauce", "2 tbsp sugar", "1 tbsp mirin or water", "4 sheets roasted seaweed (gim), cut in half", "1 tsp sesame seeds", "Furikake, for sprinkling (optional)"],
      ["Fry the Spam slices in a dry pan for 2 minutes a side until browned.", "Add the soy sauce, sugar and mirin and cook for 1 minute until sticky.", "Lay a seaweed strip shiny side down. Press a block of rice the size of the Spam in the middle (the empty can makes a good mold).", "Top with a slice of Spam and a sprinkle of sesame seeds or furikake.", "Wrap the seaweed around and press. Serve right away or wrap in plastic for lunch."],
      "Hawaii's Korean-Japanese lunchbox favorite. Kids can press their own.",
      "Use Spam Lite, half the sugar, and a mix of white and brown rice."),

    d("soy-garlic-drumsticks", "Soy Garlic Drumsticks", "간장마늘 닭다리", "🍗", ["dinner"], ["meat", "kid-favorite", "healthy"], 4, 10, 40, 0,
      ["8 chicken drumsticks", "1/2 tsp salt", "1/2 tsp black pepper", "Glaze:", "4 tbsp soy sauce", "3 tbsp honey", "6 cloves garlic, minced", "1 tsp grated ginger", "1 tbsp rice vinegar", "1 tsp sesame oil", "1 tsp sesame seeds", "1 green onion, sliced"],
      ["Heat the oven to 425°F. Line a baking sheet with foil and set a rack on it.", "Pat the drumsticks dry and season with salt and pepper. Bake on the rack for 30 minutes.", "Simmer the soy sauce, honey, garlic, ginger and vinegar for 3 minutes until syrupy. Stir in the sesame oil.", "Brush the glaze over the drumsticks and bake 10 minutes more, until sticky and cooked through (165°F inside).", "Sprinkle with sesame seeds and green onion."],
      "Korean fried chicken flavor without the frying. Wrap the bone ends in foil for little hands.",
      "Take the skin off before glazing and use low-sodium soy sauce."),

    d("kimbap-bake", "Kimbap Bake", "김밥 베이크", "🍱", ["dinner", "lunch"], ["rice", "seafood", "kid-favorite"], 6, 15, 15, 0,
      ["4 cups cooked short-grain rice", "1 tbsp rice vinegar", "1 tsp sugar", "1 tsp sesame oil", "2 cans (5 oz each) tuna, drained", "1/3 cup mayonnaise", "1 tbsp sriracha (optional)", "1 cup imitation crab, shredded", "1 carrot, shredded", "1/2 cup shredded mozzarella", "1 tbsp sesame seeds", "Roasted seaweed snacks (gim), for scooping", "1 cucumber, cut into sticks"],
      ["Heat the oven to 400°F.", "Mix the rice with the vinegar, sugar and sesame oil. Press it into a baking dish.", "Mix the tuna, crab, mayonnaise and sriracha. Spread it over the rice.", "Top with the carrot, mozzarella and sesame seeds. Bake for 12 to 15 minutes until the cheese melts.", "Scoop onto seaweed snacks with a cucumber stick, like a little kimbap."],
      "Like the viral sushi bake, with kimbap fillings. Everyone builds their own bites.",
      "Use light mayo, half brown rice, and add lots of cucumber and avocado."),

    d("bulgogi-fried-rice", "Bulgogi Fried Rice", "불고기 볶음밥", "🍳", ["dinner", "lunch"], ["rice", "meat", "quick", "kid-favorite"], 4, 10, 15, 0,
      ["8 oz thinly sliced beef or ground beef", "2 tbsp soy sauce", "1 tbsp brown sugar", "2 cloves garlic, minced", "1 tsp sesame oil", "1 tbsp vegetable oil", "1/2 onion, chopped", "1 carrot, diced small", "4 cups cooked rice (day-old is best)", "1 cup frozen peas", "4 eggs", "2 green onions, sliced"],
      ["Mix the beef with 1 tbsp soy sauce, the brown sugar, garlic and sesame oil.", "Heat the oil in a big pan. Cook the beef for 3 minutes, then add the onion and carrot for 3 minutes.", "Add the rice, peas and the rest of the soy sauce. Stir-fry for 4 minutes until hot.", "Fry the eggs in another pan. Serve each bowl with an egg on top and green onions."],
      "Leftover rice plus a little bulgogi makes dinner in 20 minutes.",
      "Use brown rice, lean beef and double the vegetables."),

    d("korean-chicken-sandwich", "Korean Chicken Sandwiches", "코리안 치킨 샌드위치", "🍔", ["dinner", "lunch"], ["meat", "kid-favorite"], 4, 15, 20, 1,
      ["4 boneless chicken thighs", "1/2 cup potato starch or cornstarch", "1/2 tsp salt", "Oil spray", "Sauce:", "2 tbsp gochujang", "2 tbsp honey", "1 tbsp soy sauce", "1 tbsp ketchup", "1 clove garlic, minced", "4 brioche buns", "1 cup shredded cabbage", "1 tbsp mayonnaise", "1 tsp rice vinegar", "Pickles, for topping"],
      ["Heat the oven or air fryer to 400°F.", "Season the chicken with salt and toss in the starch. Spray with oil.", "Air-fry or bake for 18 to 20 minutes, turning once, until crispy and cooked through (165°F inside).", "Simmer the gochujang, honey, soy sauce, ketchup and garlic for 1 minute. Toss the chicken in it.", "Mix the cabbage with the mayonnaise and vinegar. Build the sandwiches with chicken, slaw and pickles."],
      "Sweet-spicy and crunchy, like Korean fried chicken in a bun. Use honey-soy sauce for mild eaters.",
      "Use whole-wheat buns and chicken breast, and pile on more slaw."),

    d("kimchi-omurice", "Kimchi Omurice", "김치 오므라이스", "🍳", ["dinner", "lunch"], ["rice", "kid-favorite"], 2, 10, 15, 1,
      ["2 cups cooked rice", "1/2 cup kimchi, chopped", "2 oz ham or Spam, diced", "1/4 onion, chopped", "1 tbsp butter", "2 tbsp ketchup, plus more for drawing", "4 eggs", "2 tbsp milk", "Pinch of salt"],
      ["Melt the butter in a pan. Cook the onion, kimchi and ham for 3 minutes.", "Add the rice and ketchup and stir-fry for 3 minutes. Shape into two mounds on plates.", "Beat 2 eggs with 1 tbsp milk and a pinch of salt. Cook in a lightly oiled pan over low heat until just set, about 2 minutes.", "Slide the omelet over a mound of rice. Repeat with the other eggs.", "Let the kids draw on top with ketchup."],
      "A blanket of egg over kimchi fried rice. Kids love drawing faces with ketchup.",
      "Use brown rice, skip the ham, and add peas and carrots."),
  ]),
];
