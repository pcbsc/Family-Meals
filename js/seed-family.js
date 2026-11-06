// Starter batch 6, from the family's answers: more of every meal; 5-minute and
// no-cook ideas (bagels and cream cheese, toast, sandwiches), Korean home
// cooking, American classics and other cuisines; nothing off-limits; weeknight
// dinners in about 30 minutes. healthyTip is what the Healthy switch adds.
// Home-style versions written for this app, like the other starters.

const d = (key, name, nameKo, emoji, meals, categories, servings, prepMinutes, cookMinutes, spicy, ingredients, steps, notes = "", healthyTip = "") => ({
  seedKey: key, name, nameKo, emoji, meals, categories, servings, prepMinutes, cookMinutes, spicy, ingredients, steps, notes, healthyTip,
});

const as = (cuisine, dishes) => dishes.map((dish) => ({ ...dish, cuisine }));

export const FAMILY_STARTERS = [
  // ---------- Breakfast ----------
  ...as("american", [
    d("bagels-cream-cheese", "Bagels and Cream Cheese", "", "🥯", ["breakfast", "snack"], ["quick", "kid-favorite"], 4, 5, 2, 0,
      ["4 bagels (plain, everything or cinnamon raisin)", "1/2 cup cream cheese, softened", "Toppings (pick a few):", "1 cucumber, thinly sliced", "1 tomato, thinly sliced", "4 oz smoked salmon (optional)", "1 cup strawberries, sliced", "1 tbsp honey", "Everything bagel seasoning"],
      ["Slice the bagels and toast them until golden, about 2 minutes.", "Spread each half with cream cheese.", "Set out the toppings and let everyone build their own: cucumber and tomato, smoked salmon, or strawberries with a drizzle of honey.", "Sprinkle everything seasoning on top if you like."],
      "A topping bar turns a plain bagel into a breakfast kids look forward to.",
      "Use whole-wheat bagels and whipped or light cream cheese, and pile on the veggies or fruit."),

    d("egg-cheese-bagel", "Egg and Cheese Bagel Sandwiches", "", "🥯", ["breakfast"], ["quick", "kid-favorite"], 4, 5, 10, 0,
      ["4 bagels, sliced", "4 eggs", "1 tbsp butter", "4 slices American or cheddar cheese", "4 slices ham or cooked bacon (optional)", "Salt and black pepper"],
      ["Toast the bagels.", "Melt the butter in a pan over medium heat. Crack in the eggs and cook for 3 minutes, flipping once, or scramble them.", "Lay a slice of cheese on each egg for the last 30 seconds so it melts.", "Stack egg, cheese and ham or bacon in each bagel."],
      "The deli breakfast at home. Wrap in foil to eat on the way to school.",
      "Use whole-wheat bagels, add spinach, and skip the bacon."),

    d("avocado-egg-toast", "Avocado Toast with Eggs", "", "🥑", ["breakfast", "lunch"], ["quick", "healthy"], 4, 5, 5, 0,
      ["4 slices bread", "2 ripe avocados", "1 tbsp lemon juice", "1/4 tsp salt", "4 eggs", "1 tbsp butter", "Everything bagel seasoning or sesame seeds", "Pinch of gochugaru or chili flakes (optional)"],
      ["Toast the bread.", "Mash the avocados with the lemon juice and salt.", "Fry or scramble the eggs in the butter, about 3 minutes.", "Spread the avocado on the toast and top with an egg and a sprinkle of seasoning."],
      "Spice lovers add a pinch of gochugaru on top.",
      "Use whole-grain bread and add sliced tomato."),

    d("pb-banana-toast", "Peanut Butter Banana Toast", "", "🍌", ["breakfast", "snack"], ["quick", "kid-favorite"], 4, 5, 2, 0,
      ["4 slices bread", "4 tbsp peanut butter", "2 bananas, sliced", "1 tbsp honey", "Pinch of cinnamon"],
      ["Toast the bread.", "Spread with peanut butter.", "Line up the banana slices on top, drizzle with honey and sprinkle with cinnamon."],
      "Kids can make this one all by themselves (a grown-up runs the toaster).",
      "Use whole-grain bread, natural peanut butter, and skip the honey."),

    d("overnight-oats", "Overnight Oats", "", "🥣", ["breakfast"], ["quick", "healthy", "lunchbox"], 4, 10, 0, 0,
      ["2 cups rolled oats", "2 cups milk", "1 cup Greek yogurt", "2 tbsp maple syrup or honey", "1 tsp vanilla extract", "Pinch of salt", "1 cup berries", "1 banana, sliced"],
      ["Stir the oats, milk, yogurt, maple syrup, vanilla and salt together.", "Spoon into 4 jars or containers and cover.", "Refrigerate overnight (at least 6 hours).", "In the morning, stir and top with berries and banana."],
      "Make four jars on Sunday night for an easy Monday and Tuesday.",
      "Use plain yogurt and half the syrup; the fruit sweetens it."),

    d("waffles", "Easy Homemade Waffles", "", "🧇", ["breakfast"], ["kid-favorite", "treat"], 4, 10, 20, 0,
      ["2 cups all-purpose flour", "2 tbsp sugar", "1 tbsp baking powder", "1/2 tsp salt", "2 eggs", "1 3/4 cups milk", "1/2 cup melted butter", "1 tsp vanilla extract", "Maple syrup and berries, for serving"],
      ["Heat the waffle iron.", "Whisk the flour, sugar, baking powder and salt in a bowl.", "In another bowl, whisk the eggs, milk, butter and vanilla. Stir into the flour just until mixed (lumps are fine).", "Cook in the waffle iron for 4 to 5 minutes each, until golden and crisp.", "Serve with maple syrup and berries."],
      "A weekend treat. Freeze leftovers and toast them on school mornings.",
      "Use half whole-wheat flour, and top with fruit and yogurt instead of syrup."),
  ]),

  // ---------- Lunch & lunchbox ----------
  ...as("american", [
    d("bagel-pizzas", "Bagel Pizzas", "", "🍕", ["lunch", "snack"], ["quick", "kid-favorite", "lunchbox"], 4, 5, 10, 0,
      ["4 bagels, sliced", "1/2 cup pizza sauce", "1 1/2 cups shredded mozzarella", "1/2 cup pepperoni or diced ham (optional)", "1/2 bell pepper, diced", "1/2 tsp dried oregano"],
      ["Heat the oven to 400°F (or use a toaster oven).", "Lay the bagel halves cut side up on a baking sheet.", "Spread with sauce, then sprinkle with cheese and the toppings.", "Bake for 8 to 10 minutes until the cheese is bubbly. Sprinkle with oregano."],
      "Kids make their own faces with the toppings.",
      "Use whole-wheat bagels, part-skim mozzarella, and lots of veggies."),

    d("tuna-salad-sandwiches", "Tuna Salad Sandwiches", "", "🥪", ["lunch"], ["quick", "lunchbox", "seafood"], 4, 10, 0, 0,
      ["2 cans (5 oz each) tuna, drained", "1/3 cup mayonnaise", "1 celery stalk, finely chopped", "1 tbsp lemon juice", "Salt and black pepper", "8 slices bread", "4 lettuce leaves", "1 tomato, sliced"],
      ["Mix the tuna, mayonnaise, celery and lemon juice. Season with salt and pepper.", "Spread on 4 slices of bread.", "Add lettuce and tomato and top with the other slices."],
      "Pack the tomato separately so the bread doesn't get soggy by lunchtime.",
      "Use half Greek yogurt and half mayo, and whole-grain bread."),

    d("ham-cheese-sliders", "Ham and Cheese Sliders", "", "🍔", ["lunch", "dinner"], ["quick", "kid-favorite"], 6, 10, 20, 0,
      ["12 slider rolls (like Hawaiian rolls)", "12 oz sliced deli ham", "6 slices Swiss or cheddar cheese", "3 tbsp butter, melted", "1 tbsp Dijon mustard", "1 tsp honey", "1 tsp sesame seeds"],
      ["Heat the oven to 350°F.", "Cut the whole slab of rolls in half sideways without separating them. Put the bottoms in a baking dish.", "Layer the ham and cheese on top, then put the tops back on.", "Mix the butter, mustard and honey and brush it over the rolls. Sprinkle with sesame seeds.", "Cover with foil and bake for 15 minutes, then uncover and bake 5 minutes more until golden."],
      "A party favorite that's easy enough for lunch.",
      "Use whole-wheat rolls, lower-sodium ham, and half the butter."),

    d("chicken-caesar-wraps", "Chicken Caesar Wraps", "", "🌯", ["lunch", "dinner"], ["quick", "lunchbox", "meat"], 4, 10, 0, 0,
      ["2 cups cooked chicken (rotisserie is great), shredded", "4 cups chopped romaine lettuce", "1/2 cup Caesar dressing", "1/2 cup grated parmesan", "1 cup croutons, crushed", "4 large flour tortillas"],
      ["Toss the chicken, lettuce, dressing and parmesan together.", "Add the crushed croutons.", "Divide among the tortillas, fold in the sides and roll up tightly.", "Cut in half to serve or pack."],
      "Rotisserie chicken makes this a 10-minute lunch.",
      "Use whole-wheat tortillas and a light dressing."),

    d("blt", "BLT Sandwiches", "", "🥓", ["lunch"], ["quick", "kid-favorite"], 4, 5, 10, 0,
      ["12 slices bacon", "8 slices bread", "4 tbsp mayonnaise", "4 lettuce leaves", "2 tomatoes, sliced"],
      ["Cook the bacon in a pan over medium heat for 8 to 10 minutes until crisp. Drain on paper towels.", "Toast the bread and spread with mayonnaise.", "Layer lettuce, tomato and 3 slices of bacon on 4 slices and top with the rest."],
      "Bake the bacon on a sheet pan at 400°F for 15 minutes if you're making a lot.",
      "Use turkey bacon, whole-grain bread and add avocado."),
  ]),
  ...as("chinese", [
    d("cold-sesame-noodles", "Cold Sesame Noodles", "", "🍜", ["lunch", "dinner"], ["noodles", "quick", "lunchbox"], 4, 10, 10, 0,
      ["12 oz spaghetti or Chinese wheat noodles", "4 tbsp peanut butter or sesame paste", "3 tbsp soy sauce", "1 tbsp rice vinegar", "1 tbsp honey", "1 tbsp sesame oil", "1 clove garlic, grated", "2 to 4 tbsp warm water", "1 cucumber, cut into matchsticks", "1 carrot, shredded", "2 green onions, sliced", "1 tsp sesame seeds", "Chili oil, for spice lovers"],
      ["Cook the noodles as the package says. Rinse in cold water and drain well.", "Whisk the peanut butter, soy sauce, vinegar, honey, sesame oil and garlic, adding warm water until it's like thick cream.", "Toss the noodles with the sauce.", "Top with cucumber, carrot, green onions and sesame seeds. Add chili oil at the table."],
      "Great cold in a lunchbox. Pack the cucumber separately to keep it crunchy.",
      "Use whole-wheat noodles and double the vegetables."),
  ]),

  // ---------- Dinner (about 30 minutes) ----------
  ...as("korean", [
    d("ganjang-salmon", "Soy-Glazed Salmon (Ganjang Yeoneo Gui)", "간장 연어구이", "🐟", ["dinner"], ["korean", "seafood", "quick", "healthy"], 4, 5, 15, 0,
      ["4 salmon fillets (about 6 oz each)", "Salt and black pepper", "1 tbsp vegetable oil", "3 tbsp soy sauce", "2 tbsp honey or rice syrup", "1 tbsp mirin or water", "2 cloves garlic, minced", "1 tsp sesame oil", "1 tsp sesame seeds", "1 green onion, sliced"],
      ["Pat the salmon dry and season lightly with salt and pepper.", "Heat the oil in a pan over medium-high heat. Cook the salmon skin side down for 4 minutes, flip, and cook 3 minutes more.", "Mix the soy sauce, honey, mirin and garlic and pour into the pan. Simmer for 1 to 2 minutes, spooning the glaze over the fish, until sticky.", "Drizzle with sesame oil and top with sesame seeds and green onion. Serve with rice."],
      "Sweet and salty, like teriyaki. Kids love the sticky glaze.",
      "Use low-sodium soy sauce and half the honey, and serve with brown rice and greens."),

    d("hobak-bokkeum", "Stir-Fried Zucchini (Hobak Bokkeum)", "호박볶음", "🥒", ["dinner"], ["korean", "side", "veggie", "quick", "healthy"], 4, 5, 8, 0,
      ["2 zucchini (or Korean aehobak), cut into half-moons", "1/2 onion, sliced", "1 tbsp vegetable oil", "2 cloves garlic, minced", "1 tsp salt or 1 tbsp saeujeot (salted shrimp)", "1 tsp sesame oil", "1 tsp sesame seeds"],
      ["Heat the oil in a pan. Cook the onion and garlic for 1 minute.", "Add the zucchini and salt and stir-fry for 4 to 5 minutes until just tender.", "Turn off the heat. Stir in the sesame oil and sprinkle with sesame seeds."],
      "A gentle, sweet banchan most kids eat happily.",
      "Use half the salt."),

    d("kimchi-udon", "Kimchi Butter Udon", "김치 버터 우동", "🍜", ["dinner", "lunch"], ["korean", "noodles", "quick", "kid-favorite"], 4, 5, 10, 1,
      ["4 packs (7 oz each) frozen udon noodles", "1 cup kimchi, chopped", "4 oz bacon or pork belly, chopped", "2 tbsp butter", "1 tbsp gochujang", "2 tbsp soy sauce", "1 tbsp sugar", "2 green onions, sliced", "4 eggs (optional)", "1 sheet roasted seaweed (gim), crumbled"],
      ["Boil the udon for 1 minute to loosen it. Drain.", "Cook the bacon in a big pan for 3 minutes. Add the kimchi and 1 tbsp butter and cook for 3 minutes.", "Add the udon, gochujang, soy sauce and sugar. Stir-fry for 2 minutes until coated.", "Stir in the rest of the butter. Top with green onions, crumbled seaweed and a fried egg."],
      "Chewy noodles in a buttery kimchi sauce, on the table in 15 minutes.",
      "Use less butter, skip the bacon, and add mushrooms and cabbage."),

    d("ojingeo-bokkeum", "Spicy Stir-Fried Squid (Ojingeo Bokkeum)", "오징어볶음", "🦑", ["dinner"], ["korean", "seafood"], 4, 15, 10, 2,
      ["1 1/2 lb squid, cleaned and cut into strips", "1/2 onion, sliced", "1 carrot, sliced", "1/4 cabbage, cut into pieces", "2 green onions, cut into 2-inch pieces", "1 tbsp vegetable oil", "Sauce:", "2 tbsp gochujang", "1 tbsp gochugaru", "2 tbsp soy sauce", "1 tbsp sugar", "3 cloves garlic, minced", "1 tsp grated ginger", "1 tbsp sesame oil", "1 tsp sesame seeds"],
      ["Mix the sauce ingredients in a bowl.", "Heat the oil in a big pan over high heat. Stir-fry the onion, carrot and cabbage for 3 minutes.", "Add the squid and sauce and stir-fry for 3 to 4 minutes, just until the squid turns white and curls (longer makes it chewy).", "Add the green onions, then the sesame oil and seeds. Serve over rice."],
      "Fast and fiery. Cook the squid quickly so it stays tender.",
      "Add more vegetables and use half the sugar."),

    d("samgyeopsal", "Pork Belly at Home (Samgyeopsal)", "삼겹살", "🥓", ["dinner"], ["korean", "meat", "kid-favorite"], 4, 10, 15, 0,
      ["1 1/2 lb pork belly, sliced 1/4 inch thick", "Salt and black pepper", "1 head lettuce, leaves separated", "Perilla leaves (optional)", "Ssamjang, for dipping", "4 cloves garlic, sliced", "Kimchi, for serving", "Sesame oil with salt and pepper, for dipping"],
      ["Heat a heavy pan or griddle over medium-high heat (no oil needed).", "Cook the pork belly for 3 to 4 minutes a side until golden and crisp. Cook the garlic slices and kimchi in the fat alongside.", "Cut the pork into bite-size pieces with kitchen scissors.", "Wrap a piece in lettuce with ssamjang, garlic and kimchi, or dip it in salted sesame oil."],
      "Korean barbecue night at home. Kids love wrapping their own.",
      "Choose a leaner cut like pork shoulder, drain the fat, and eat lots of lettuce wraps."),
  ]),
  ...as("chinese", [
    d("mapo-tofu", "Mapo Tofu (Korean-Style)", "마파두부", "⬜", ["dinner"], ["veggie", "quick"], 4, 10, 15, 1,
      ["14 oz soft or medium tofu, cut into cubes", "6 oz ground pork or beef", "1 tbsp vegetable oil", "3 cloves garlic, minced", "1 tsp grated ginger", "2 green onions, sliced", "1 tbsp gochujang", "1 tbsp doenjang", "1 tbsp soy sauce", "1 tsp sugar", "1 cup water or chicken broth", "1 tbsp cornstarch mixed with 2 tbsp water", "1 tsp sesame oil"],
      ["Heat the oil in a pan. Cook the meat, garlic, ginger and half the green onions for 3 minutes.", "Stir in the gochujang, doenjang, soy sauce and sugar for 30 seconds.", "Add the water and bring to a simmer. Slide in the tofu and simmer gently for 5 minutes.", "Stir in the cornstarch mixture until glossy and thick. Add the sesame oil and the rest of the green onions. Serve over rice."],
      "A milder Korean take on the Sichuan classic, with gochujang and doenjang.",
      "Use lean ground meat or none at all, and add mushrooms."),
  ]),
  ...as("mexican", [
    d("shrimp-tacos", "Shrimp Tacos with Lime Slaw", "", "🌮", ["dinner"], ["seafood", "quick", "kid-favorite"], 4, 10, 10, 0,
      ["1 lb shrimp, peeled and deveined", "1 tsp chili powder", "1/2 tsp cumin", "1/2 tsp garlic powder", "1/2 tsp salt", "1 tbsp vegetable oil", "8 small corn or flour tortillas", "2 cups shredded cabbage", "2 tbsp mayonnaise", "1 lime", "1 avocado, sliced"],
      ["Toss the shrimp with the chili powder, cumin, garlic powder and salt.", "Mix the cabbage with the mayonnaise and the juice of half the lime.", "Heat the oil in a pan over medium-high heat. Cook the shrimp for 1 to 2 minutes a side until pink.", "Warm the tortillas. Fill with shrimp, slaw and avocado, with lime wedges for squeezing."],
      "Shrimp cooks in 3 minutes, so this is one of the fastest dinners on the menu.",
      "Use corn tortillas and Greek yogurt in the slaw."),
  ]),
  ...as("italian", [
    d("carbonara", "Spaghetti Carbonara", "", "🍝", ["dinner"], ["noodles", "quick", "kid-favorite"], 4, 5, 15, 0,
      ["1 lb spaghetti", "6 slices bacon, chopped", "3 eggs", "1 cup grated parmesan", "1/2 tsp black pepper", "1/2 cup pasta water"],
      ["Cook the spaghetti as the package says. Save 1/2 cup of the pasta water before draining.", "Cook the bacon in a big pan for 6 to 8 minutes until crisp. Turn off the heat.", "Whisk the eggs, parmesan and pepper in a bowl.", "Add the hot spaghetti to the bacon pan off the heat. Pour in the egg mixture and toss fast, adding pasta water a splash at a time, until creamy (the heat of the pasta cooks the eggs).", "Serve right away with more parmesan."],
      "Creamy with no cream. Toss quickly off the heat so the eggs turn silky, not scrambled.",
      "Use whole-wheat spaghetti and turkey bacon, and stir in peas."),
  ]),
  ...as("japanese", [
    d("hambagu", "Japanese Hamburg Steak (Hambagu)", "", "🍔", ["dinner"], ["meat", "kid-favorite"], 4, 10, 20, 0,
      ["1 lb ground beef (or half beef, half pork)", "1/2 onion, finely chopped", "1/2 cup panko breadcrumbs", "3 tbsp milk", "1 egg", "1/2 tsp salt", "1/4 tsp black pepper", "1 tbsp vegetable oil", "Sauce:", "3 tbsp ketchup", "2 tbsp Worcestershire sauce", "1 tbsp soy sauce", "2 tbsp water"],
      ["Soak the panko in the milk for 2 minutes. Mix with the beef, onion, egg, salt and pepper.", "Shape into 4 thick ovals and press a dent in the middle of each.", "Heat the oil in a pan over medium heat. Cook for 4 minutes until browned, flip, cover and cook 8 minutes more (160°F inside).", "Pour the sauce ingredients into the pan and simmer for 1 minute, spooning it over the patties. Serve with rice and vegetables."],
      "Juicy, tender patties in a sweet-savory sauce. A favorite kids' meal in Japan and Korea.",
      "Use lean beef, whole-wheat panko, and serve with lots of vegetables."),
  ]),
  ...as("american", [
    d("cheesy-beef-rice", "Cheesy Beef and Rice Skillet", "", "🍛", ["dinner"], ["meat", "rice", "quick", "kid-favorite"], 4, 5, 25, 0,
      ["1 lb ground beef", "1/2 onion, chopped", "1 tsp chili powder", "1/2 tsp garlic powder", "1/2 tsp salt", "1 cup long-grain rice", "1 can (14 oz) diced tomatoes", "1 1/2 cups chicken broth", "1 cup frozen corn", "1 1/2 cups shredded cheddar"],
      ["Brown the beef and onion in a big pan for 5 minutes. Drain the fat.", "Stir in the chili powder, garlic powder, salt and rice for 1 minute.", "Add the tomatoes and broth. Bring to a boil, cover and simmer on low for 18 minutes until the rice is tender.", "Stir in the corn, top with the cheese, cover and let it melt for 2 minutes."],
      "One pan, no fuss, and the kids ask for seconds.",
      "Use lean beef, brown rice (cook longer) and half the cheese, and add black beans."),

    d("honey-garlic-pork-chops", "Honey Garlic Pork Chops", "", "🍖", ["dinner"], ["meat", "quick"], 4, 5, 15, 0,
      ["4 boneless pork chops (about 3/4 inch thick)", "Salt and black pepper", "1 tbsp vegetable oil", "3 tbsp honey", "2 tbsp soy sauce", "3 cloves garlic, minced", "1 tbsp butter", "1 tsp rice vinegar"],
      ["Season the pork chops with salt and pepper.", "Heat the oil in a pan over medium-high heat. Cook the chops for 4 to 5 minutes a side until golden and 145°F inside. Move to a plate.", "Turn the heat to low. Add the butter and garlic for 30 seconds, then the honey, soy sauce and vinegar. Simmer for 1 minute.", "Put the chops back and spoon the glaze over them. Rest 3 minutes before serving."],
      "Sticky, sweet and garlicky. Serve with rice and steamed broccoli.",
      "Use low-sodium soy sauce and half the honey."),
  ]),

  // ---------- Snacks & treats ----------
  ...as("american", [
    d("cucumber-bites", "Cucumber Cream Cheese Bites", "", "🥒", ["snack"], ["quick", "healthy", "lunchbox"], 4, 10, 0, 0,
      ["2 cucumbers, cut into thick rounds", "1/2 cup cream cheese, softened", "1 tsp everything bagel seasoning", "4 cherry tomatoes, halved (optional)"],
      ["Spread or pipe a little cream cheese on each cucumber round.", "Sprinkle with everything seasoning.", "Top some with a cherry tomato half."],
      "Crunchy, cool and ready in 10 minutes. Kids can do every step.",
      "Use light cream cheese or hummus."),

    d("banana-sushi", "Banana Sushi", "", "🍌", ["snack", "breakfast"], ["quick", "kid-favorite", "lunchbox"], 4, 5, 0, 0,
      ["4 small flour tortillas", "4 tbsp peanut butter or cream cheese", "4 bananas", "1 tbsp honey", "2 tbsp granola or rice cereal"],
      ["Spread each tortilla with peanut butter.", "Lay a banana at one edge and roll it up tightly.", "Drizzle with honey, sprinkle with granola, and slice into rounds like sushi."],
      "Kids love eating it with chopsticks.",
      "Use whole-wheat tortillas and skip the honey."),

    d("fruit-kebabs", "Fruit Kebabs with Yogurt Dip", "", "🍓", ["snack"], ["quick", "healthy", "kid-favorite"], 4, 15, 0, 0,
      ["1 cup strawberries, hulled", "1 cup grapes", "2 cups melon, cut into cubes", "1 cup pineapple chunks", "1 cup Greek yogurt", "1 tbsp honey", "8 wooden skewers"],
      ["Thread the fruit onto the skewers in a rainbow pattern.", "Stir the honey into the yogurt for dipping."],
      "A rainbow on a stick. Use straws or snip the sharp tips off the skewers for little ones.",
      "Use plain yogurt with a little vanilla instead of honey."),

    d("chocolate-chip-cookies", "Chocolate Chip Cookies", "", "🍪", ["snack"], ["treat", "kid-favorite"], 24, 15, 12, 0,
      ["1 cup butter, softened", "3/4 cup brown sugar", "1/2 cup sugar", "2 eggs", "2 tsp vanilla extract", "2 1/4 cups all-purpose flour", "1 tsp baking soda", "1/2 tsp salt", "2 cups chocolate chips"],
      ["Heat the oven to 375°F. Line baking sheets with parchment.", "Beat the butter and both sugars until fluffy. Beat in the eggs and vanilla.", "Stir in the flour, baking soda and salt, then the chocolate chips.", "Scoop tablespoon-size balls onto the sheets, 2 inches apart.", "Bake for 9 to 11 minutes until golden at the edges. Cool on the sheet for 5 minutes."],
      "Freeze scoops of dough and bake a few at a time.",
      "Use half whole-wheat flour and a quarter less sugar."),

    d("honey-butter-popcorn", "Honey Butter Popcorn", "", "🍿", ["snack"], ["quick", "treat", "kid-favorite"], 4, 2, 8, 0,
      ["1/2 cup popcorn kernels", "2 tbsp vegetable oil", "3 tbsp butter", "2 tbsp honey", "1/2 tsp salt"],
      ["Heat the oil and 3 kernels in a big covered pot over medium-high heat. When they pop, add the rest of the kernels.", "Cover and shake the pot now and then. When popping slows to 2 seconds apart, take it off the heat.", "Melt the butter with the honey and salt and drizzle over the popcorn, tossing as you go."],
      "The Korean honey-butter snack craze, made at home for movie night.",
      "Air-pop the popcorn and use half the butter and honey."),
  ]),
  ...as("korean", [
    d("milk-bingsu", "Milk Bingsu (Korean Shaved Ice)", "우유빙수", "🍧", ["snack"], ["korean", "treat", "kid-favorite"], 4, 15, 0, 0,
      ["2 cups milk", "1/4 cup sweetened condensed milk", "2 cups strawberries, mango or other fruit, chopped", "1/2 cup canned sweet red beans (optional)", "1/2 cup small rice cakes or mochi (optional)", "2 tbsp roasted soybean powder (injeolmi powder, optional)"],
      ["Mix the milk and condensed milk. Pour into ice-cube trays and freeze overnight.", "Pulse the milk ice cubes in a blender or food processor until fluffy like snow.", "Pile into bowls and top with fruit, red beans, rice cakes and a sprinkle of soybean powder. Drizzle with more condensed milk."],
      "Korea's favorite summer dessert. Freeze the milk cubes the night before.",
      "Use more fruit and skip the extra condensed milk drizzle."),
  ]),
];
