// Starter batch 4: Korean, Korean-American and Korean fusion dishes kids love,
// some of them spicy (for the kids who like it hot; the Mild switch on each
// recipe tones them down). healthyTip is what the Healthy switch adds.
// Home-style versions written for this app, like the other starters.

const d = (key, name, nameKo, emoji, meals, categories, servings, prepMinutes, cookMinutes, spicy, ingredients, steps, notes = "", healthyTip = "") => ({
  seedKey: key, name, nameKo, emoji, meals, categories, servings, prepMinutes, cookMinutes, spicy, ingredients, steps, notes, healthyTip,
});

const as = (cuisine, dishes) => dishes.map((dish) => ({ ...dish, cuisine }));

export const FUSION_STARTERS = [
  ...as("fusion", [
    d("bulgogi-tacos", "Bulgogi Tacos", "불고기 타코", "🌮", ["dinner"], ["meat", "kid-favorite", "trending"], 4, 40, 10, 1,
      ["1 1/2 lb thinly sliced beef (ribeye or sirloin)", "4 tbsp soy sauce", "2 tbsp brown sugar", "1/2 Asian pear or apple, grated", "3 cloves garlic, minced", "1 tbsp sesame oil", "1 tbsp vegetable oil", "12 small flour tortillas", "2 cups shredded cabbage", "1 carrot, shredded", "1 tbsp rice vinegar", "1 tsp sugar", "3 tbsp mayonnaise", "1 tbsp gochujang", "2 green onions, sliced", "1 lime, cut into wedges"],
      ["Mix the soy sauce, brown sugar, grated pear, garlic and sesame oil in a bowl. Add the beef and marinate for 30 minutes.", "Toss the cabbage and carrot with the rice vinegar and sugar to make a quick slaw.", "Stir the mayonnaise and gochujang together for the sauce.", "Heat the oil in a big pan over high heat. Cook the beef in batches for 3 to 4 minutes until browned.", "Warm the tortillas in a dry pan for 20 seconds a side.", "Fill each tortilla with beef and slaw. Drizzle with the sauce and top with green onions and a squeeze of lime."],
      "Taco night, Korean style. Kids can build their own; keep plain mayo for anyone who wants it mild.",
      "Use corn tortillas and pile on extra slaw. Lettuce cups work too."),

    d("kimchi-quesadilla", "Kimchi Quesadillas", "김치 퀘사디아", "🧀", ["lunch", "dinner"], ["quick", "kid-favorite"], 4, 10, 10, 1,
      ["1 cup well-fermented kimchi, chopped and squeezed dry", "1 tbsp butter", "1 tsp sugar", "8 flour tortillas", "2 cups shredded mozzarella", "1 cup shredded cheddar", "4 oz cooked chicken or ham, chopped (optional)", "2 green onions, sliced", "Sour cream, for dipping"],
      ["Melt the butter in a pan. Cook the kimchi and sugar for 3 minutes, until it smells sweet and toasty.", "Lay out 4 tortillas. Sprinkle half the cheese on them.", "Add the kimchi, chicken or ham, and green onions. Top with the rest of the cheese and the other tortillas.", "Cook each quesadilla in a dry pan over medium heat for 2 to 3 minutes a side, until golden and melty.", "Cut into triangles and serve with sour cream."],
      "Cooking the kimchi in butter makes it sweeter and less sharp, so even picky eaters like it.",
      "Use whole-wheat tortillas, half the cheese, and add a handful of spinach."),

    d("kimchi-mac-and-cheese", "Kimchi Mac & Cheese", "김치 맥앤치즈", "🧀", ["dinner"], ["noodles", "kid-favorite"], 4, 10, 20, 1,
      ["12 oz elbow macaroni", "1 cup well-fermented kimchi, chopped and squeezed dry", "3 tbsp butter", "3 tbsp all-purpose flour", "2 1/2 cups milk", "2 cups shredded cheddar", "1 cup shredded mozzarella", "1/2 tsp salt", "1 tsp gochujang (optional)", "1/2 cup panko breadcrumbs", "1 green onion, sliced"],
      ["Cook the macaroni as the package says. Drain.", "Melt 1 tbsp butter in a big pot. Cook the kimchi for 3 minutes, then scoop it out.", "Melt the rest of the butter in the pot. Stir in the flour for 1 minute.", "Slowly whisk in the milk. Cook, stirring, for 4 to 5 minutes until thick.", "Turn off the heat. Stir in the cheeses, salt and gochujang until smooth.", "Mix in the macaroni and kimchi. Top with panko toasted in a dry pan and the green onion."],
      "Tangy kimchi cuts through the rich cheese. Leave the kimchi out of one bowl for anyone not ready yet.",
      "Use whole-wheat pasta, half the cheese, and stir in steamed broccoli."),

    d("kimchi-grilled-cheese", "Kimchi Grilled Cheese", "김치 그릴드 치즈", "🥪", ["lunch"], ["quick", "kid-favorite"], 2, 5, 10, 1,
      ["4 slices sourdough or white bread", "2 tbsp butter, softened", "1/2 cup well-fermented kimchi, chopped and squeezed dry", "1 tsp sugar", "1 cup shredded mozzarella", "2 slices cheddar or American cheese", "1 tbsp mayonnaise"],
      ["Cook the kimchi with the sugar and a little of the butter for 3 minutes.", "Spread the mayonnaise and the rest of the butter on the outside of the bread.", "Build each sandwich: cheddar, kimchi, mozzarella.", "Cook in a pan over medium-low heat for 3 to 4 minutes a side, pressing gently, until golden and melty."],
      "Crispy outside, gooey inside, with a little kimchi kick.",
      "Use whole-wheat bread, less cheese, and serve with tomato soup or apple slices."),

    d("bulgogi-cheesesteak", "Bulgogi Cheesesteaks", "불고기 치즈스테이크", "🥖", ["dinner"], ["meat", "kid-favorite"], 4, 35, 15, 0,
      ["1 1/2 lb thinly sliced ribeye", "4 tbsp soy sauce", "2 tbsp brown sugar", "1/2 Asian pear or apple, grated", "3 cloves garlic, minced", "1 tbsp sesame oil", "1 tbsp vegetable oil", "1 onion, thinly sliced", "1 green bell pepper, thinly sliced", "8 slices provolone cheese", "4 hoagie rolls, split"],
      ["Mix the soy sauce, brown sugar, pear, garlic and sesame oil. Add the beef and marinate for 30 minutes.", "Heat the oil in a big pan. Cook the onion and pepper for 5 minutes until soft. Push them to the side.", "Add the beef and cook for 4 minutes, chopping it up with the spatula as it browns. Mix in the onions and peppers.", "Divide into 4 piles in the pan and lay 2 slices of cheese on each. Cover for 1 minute to melt.", "Scoop each cheesy pile into a toasted roll."],
      "Philly meets Seoul. The sweet bulgogi marinade is what makes it.",
      "Use whole-wheat rolls, add mushrooms to the peppers, and serve with a crunchy salad."),

    d("bulgogi-burgers", "Bulgogi Burgers", "불고기 버거", "🍔", ["dinner"], ["meat", "kid-favorite"], 4, 15, 12, 0,
      ["1 lb ground beef", "3 tbsp soy sauce", "1 tbsp brown sugar", "2 cloves garlic, minced", "1 tsp sesame oil", "2 green onions, finely chopped", "1/4 tsp black pepper", "4 hamburger buns", "4 slices cheddar or American cheese", "Lettuce leaves", "1 tomato, sliced", "3 tbsp mayonnaise", "1 tbsp honey"],
      ["Mix the beef, 2 tbsp of the soy sauce, the brown sugar, garlic, sesame oil, green onions and pepper with clean hands.", "Shape into 4 patties, a little wider than the buns. Press a dimple in the middle of each.", "Cook in a hot pan for 4 minutes a side.", "Mix the rest of the soy sauce with the honey and brush it on the patties for the last minute. Add the cheese and cover to melt.", "Spread mayonnaise on the toasted buns. Build with lettuce, tomato and the patties."],
      "Freeze extra raw patties between squares of parchment for a fast dinner.",
      "Use lean ground beef or ground turkey, whole-wheat buns, and lots of lettuce."),

    d("bulgogi-pizza", "Bulgogi Pizza", "불고기 피자", "🍕", ["dinner"], ["meat", "kid-favorite"], 4, 20, 15, 0,
      ["1 lb pizza dough", "8 oz thinly sliced beef, chopped", "2 tbsp soy sauce", "1 tbsp brown sugar", "2 cloves garlic, minced", "1 tsp sesame oil", "1/2 cup pizza sauce", "2 cups shredded mozzarella", "1/2 onion, thinly sliced", "1/2 green bell pepper, sliced", "4 mushrooms, sliced", "1 green onion, sliced"],
      ["Heat the oven to 475°F. Let the dough sit out for 15 minutes so it stretches easily.", "Mix the beef with the soy sauce, brown sugar, garlic and sesame oil. Cook in a hot pan for 3 minutes.", "Stretch the dough on an oiled baking sheet.", "Spread the sauce, then add the cheese, beef, onion, pepper and mushrooms.", "Bake for 12 to 15 minutes until the crust is golden.", "Top with green onion and cut into squares."],
      "Korean pizza places sell this everywhere. Kids love sprinkling the toppings.",
      "Use whole-wheat dough, less cheese, and add extra veggies."),

    d("gochujang-meatballs", "Sticky Gochujang Meatballs", "고추장 미트볼", "🍡", ["dinner"], ["meat", "kid-favorite"], 4, 20, 20, 1,
      ["1 lb ground pork or beef", "1/2 cup panko breadcrumbs", "1 egg", "2 green onions, finely chopped", "2 cloves garlic, minced", "1 tbsp soy sauce", "1 tsp sesame oil", "2 tbsp gochujang", "3 tbsp honey", "2 tbsp soy sauce", "1 tbsp rice vinegar", "1 tsp sesame seeds", "Cooked rice, for serving"],
      ["Heat the oven to 400°F. Line a baking sheet with parchment.", "Mix the meat, panko, egg, green onions, garlic, 1 tbsp soy sauce and sesame oil. Roll into 20 balls.", "Bake for 15 to 18 minutes until cooked through.", "In a pan, simmer the gochujang, honey, 2 tbsp soy sauce and rice vinegar for 2 minutes until glossy.", "Toss the meatballs in the sauce and sprinkle with sesame seeds. Serve over rice."],
      "Kids can roll the meatballs. Make a mild batch with honey and soy only.",
      "Use ground turkey and serve with brown rice and steamed broccoli."),

    d("gochujang-salmon", "Honey Gochujang Salmon", "고추장 연어구이", "🐟", ["dinner"], ["seafood", "healthy", "quick"], 4, 10, 12, 1,
      ["4 salmon fillets (about 6 oz each)", "1/2 tsp salt", "2 tbsp gochujang", "2 tbsp honey", "1 tbsp soy sauce", "1 tsp sesame oil", "1 clove garlic, minced", "1 tsp sesame seeds", "2 green onions, sliced", "Cooked rice, for serving", "1 cucumber, sliced"],
      ["Heat the oven to 425°F. Line a baking sheet with foil.", "Pat the salmon dry and sprinkle with salt.", "Mix the gochujang, honey, soy sauce, sesame oil and garlic.", "Brush most of the glaze on the salmon.", "Bake for 10 to 12 minutes, until it flakes easily. Brush on the rest of the glaze.", "Top with sesame seeds and green onions. Serve with rice and cucumber."],
      "Sweet first, then a little warm. Use 1 tbsp gochujang for a milder glaze.",
      "Serve over multigrain rice with a big side of spinach or broccoli."),

    d("gochujang-wings", "Baked Gochujang Wings", "고추장 치킨윙", "🍗", ["dinner", "snack"], ["meat", "kid-favorite"], 4, 10, 45, 1,
      ["2 1/2 lb chicken wings", "1 tbsp baking powder", "1 tsp salt", "2 tbsp gochujang", "3 tbsp honey", "2 tbsp soy sauce", "1 tbsp butter", "2 cloves garlic, minced", "1 tsp rice vinegar", "1 tsp sesame seeds"],
      ["Heat the oven to 425°F. Put a rack on a foil-lined baking sheet.", "Pat the wings very dry. Toss them with the baking powder and salt.", "Bake on the rack for 40 to 45 minutes, turning once, until crispy.", "In a small pot, melt the butter. Add the garlic, gochujang, honey, soy sauce and vinegar. Simmer for 2 minutes.", "Toss the hot wings in the sauce and sprinkle with sesame seeds."],
      "Baking powder (not baking soda!) is the trick for crispy wings without frying.",
      "Serve with carrot and celery sticks, and use half the honey."),
  ]),

  ...as("korean", [
    d("korean-corn-dogs", "Korean Cheese Corn Dogs", "치즈 핫도그", "🌭", ["snack", "lunch"], ["kid-favorite", "treat"], 6, 30, 20, 0,
      ["3 hot dogs, cut in half", "6 sticks mozzarella string cheese", "12 wooden skewers", "1 1/2 cups all-purpose flour", "2 tbsp sugar", "1 tsp instant yeast", "1/2 tsp salt", "1 egg", "3/4 cup warm milk", "2 cups panko breadcrumbs", "4 cups vegetable oil, for frying", "Sugar, ketchup and mustard, for topping"],
      ["Thread half a hot dog and half a cheese stick onto each skewer, end to end.", "Mix the flour, sugar, yeast and salt. Stir in the egg and warm milk to make a thick, sticky batter. Rest it for 20 minutes.", "Pour the batter into a tall glass. Dip each skewer in, twisting to coat, then roll it in panko.", "A grown-up heats the oil to 350°F in a deep pot and fries 2 or 3 at a time for 3 to 4 minutes, turning, until golden.", "Roll in a little sugar if you like, then drizzle with ketchup and mustard."],
      "The famous street-food corn dog with a cheese pull. Grown-ups do the frying.",
      "Air-fry at 380°F for 10 to 12 minutes instead of deep-frying (spray them with oil first)."),

    d("gilgeori-toast", "Korean Street Toast", "길거리 토스트", "🍞", ["breakfast"], ["quick", "kid-favorite"], 2, 10, 10, 0,
      ["4 slices bread", "2 tbsp butter", "3 eggs", "1 cup shredded cabbage", "1/2 carrot, shredded", "1 green onion, chopped", "1 pinch salt", "2 slices ham", "2 slices American cheese", "2 tsp sugar", "Ketchup, for drizzling"],
      ["Beat the eggs with the cabbage, carrot, green onion and salt.", "Melt half the butter in a pan. Toast the bread on both sides and set it aside.", "Melt the rest of the butter. Pour in the egg mix in two bread-sized squares. Cook for 2 minutes a side.", "Warm the ham in the pan for 30 seconds.", "Build each sandwich: toast, egg, ham, cheese, a sprinkle of sugar and a squiggle of ketchup, then toast.", "Cut in half and eat while it's warm."],
      "Sweet, salty and crunchy, like the toast stands in Seoul.",
      "Use whole-wheat bread, skip the sugar, and add extra cabbage."),

    d("egg-drop-sandwich", "Egg Drop Sandwich", "에그 샌드위치", "🥪", ["breakfast", "lunch"], ["kid-favorite"], 4, 10, 10, 0,
      ["6 eggs", "1/4 cup milk", "1/4 tsp salt", "1 tbsp butter", "4 brioche buns or thick milk bread rolls", "4 slices American cheese", "4 slices ham (optional)", "3 tbsp mayonnaise", "1 tbsp honey", "1 tbsp sweetened condensed milk (optional)", "2 tsp chopped parsley"],
      ["Whisk the eggs, milk and salt.", "Melt the butter in a pan over low heat. Stir the eggs slowly for 4 to 5 minutes until soft, fluffy and just set.", "Mix the mayonnaise, honey and condensed milk for the sauce.", "Toast the buns. Add a slice of cheese and ham to each.", "Pile the soft eggs on top and drizzle with the sauce. Sprinkle with parsley."],
      "Low heat is the secret to the soft, fluffy eggs from the famous Seoul shop.",
      "Use whole-wheat buns, skip the condensed milk, and add sliced avocado."),

    d("dakgangjeong", "Sweet Crispy Chicken (Dakgangjeong)", "닭강정", "🍗", ["dinner"], ["korean", "meat", "kid-favorite"], 4, 20, 25, 0,
      ["1 1/2 lb boneless chicken thighs, cut into bite-size pieces", "1/2 tsp salt", "1/4 tsp black pepper", "1 tsp grated ginger", "3/4 cup potato starch or cornstarch", "4 cups vegetable oil, for frying", "3 tbsp soy sauce", "3 tbsp brown sugar", "2 tbsp honey", "4 cloves garlic, minced", "1 tbsp water", "1 tbsp gochujang (optional)", "1 tbsp chopped peanuts", "1 tsp sesame seeds"],
      ["Season the chicken with salt, pepper and ginger. Toss it in the starch until every piece is coated.", "A grown-up heats the oil to 340°F and fries the chicken in batches for 5 minutes. Rest it for 2 minutes.", "Fry everything again for 2 minutes until extra crunchy. Drain on a rack.", "In a big pan, simmer the soy sauce, brown sugar, honey, garlic, water and gochujang for 2 minutes until it bubbles.", "Toss the chicken in the sauce. Top with peanuts and sesame seeds."],
      "Frying twice keeps it crunchy even with the sticky glaze.",
      "Air-fry the coated chicken at 400°F for 18 to 20 minutes, shaking twice, instead of frying."),

    d("tteokbokki", "Spicy Rice Cakes (Tteokbokki)", "떡볶이", "🌶️", ["lunch", "snack"], ["korean", "kid-favorite"], 3, 10, 15, 2,
      ["1 lb cylinder rice cakes (tteok)", "3 cups water", "4 dried anchovies and a 4-inch piece of kelp (or 3 cups broth)", "3 tbsp gochujang", "1 tbsp gochugaru", "1 tbsp soy sauce", "2 tbsp sugar", "1 tbsp corn syrup or honey", "2 sheets fish cakes (eomuk), cut into triangles", "1/4 cabbage, cut into pieces", "2 green onions, cut into 2-inch pieces", "2 hard-boiled eggs"],
      ["Soak hard rice cakes in warm water for 10 minutes.", "Simmer the water with the anchovies and kelp for 10 minutes, then take them out.", "Stir in the gochujang, gochugaru, soy sauce, sugar and corn syrup.", "Add the rice cakes and cabbage. Simmer for 6 to 8 minutes, stirring, until the rice cakes are soft and the sauce is thick.", "Add the fish cakes, green onions and eggs for the last 2 minutes."],
      "The classic red, sweet and spicy street snack. For a milder pot, use 1 tbsp gochujang and skip the gochugaru.",
      "Add lots of cabbage and an extra egg, and use half the sugar."),

    d("rabokki", "Rabokki (Ramen Tteokbokki)", "라볶이", "🍜", ["lunch", "snack"], ["korean", "noodles", "kid-favorite"], 3, 5, 15, 2,
      ["10 oz rice cakes (tteok)", "1 package instant ramen (noodles only)", "3 cups water", "3 tbsp gochujang", "1 tsp gochugaru", "1 tbsp soy sauce", "2 tbsp sugar", "2 sheets fish cakes, sliced", "2 green onions, chopped", "2 hard-boiled eggs", "1 slice American cheese"],
      ["Bring the water to a boil. Stir in the gochujang, gochugaru, soy sauce and sugar.", "Add the rice cakes and fish cakes. Simmer for 5 minutes.", "Add the ramen noodles and cook for 3 minutes, stirring, until the noodles are soft and the sauce clings.", "Add the green onions and eggs.", "Lay the cheese on top and let it melt before serving."],
      "Tteokbokki plus ramen noodles: a Korean snack-shop favorite. The cheese cools the spice.",
      "Add cabbage and carrots, and use half the sugar."),

    d("rose-tteokbokki", "Rosé Tteokbokki", "로제 떡볶이", "🌸", ["lunch", "dinner"], ["korean", "kid-favorite", "trending"], 3, 5, 15, 1,
      ["1 lb rice cakes (tteok)", "1 tbsp butter", "1/2 onion, sliced", "4 slices bacon or 4 oz sausage, chopped", "1 1/2 tbsp gochujang", "1 tsp gochugaru", "1 1/2 cups milk", "1/2 cup heavy cream", "1 tbsp sugar", "1/2 tsp soy sauce", "1/2 cup shredded mozzarella", "1 tbsp chopped parsley"],
      ["Soak hard rice cakes in warm water for 10 minutes.", "Melt the butter in a pan. Cook the onion and bacon for 4 minutes.", "Stir in the gochujang and gochugaru for 30 seconds.", "Pour in the milk and cream with the sugar and soy sauce. Bring to a gentle simmer (don't let it boil hard).", "Add the rice cakes and simmer for 6 to 8 minutes until soft and creamy.", "Top with mozzarella, cover to melt, and sprinkle with parsley."],
      "Creamy, pink and only a little spicy: the gentle way into tteokbokki.",
      "Use milk instead of cream, skip the bacon, and add broccoli or spinach."),

    d("cheese-ramyeon", "Cheesy Egg Ramyeon", "치즈 라면", "🍜", ["lunch"], ["korean", "noodles", "quick", "kid-favorite"], 2, 2, 8, 1,
      ["2 packages Korean instant ramen", "4 1/2 cups water", "2 eggs", "2 slices American cheese", "2 green onions, sliced", "1/2 cup frozen mixed vegetables", "1 tsp sesame seeds"],
      ["Bring the water to a boil. Add the frozen vegetables and the ramen soup packets (use half for less spice).", "Add the noodles and cook for 2 minutes.", "Crack in the eggs and cook for 1 to 2 minutes more without stirring.", "Divide into bowls. Lay a slice of cheese on each and let it melt.", "Top with green onions and sesame seeds."],
      "The cheese makes the broth creamy and much less spicy.",
      "Use half the soup packet, add spinach and bean sprouts, and add tofu."),

    d("budae-jjigae", "Army Base Stew (Budae Jjigae)", "부대찌개", "🍲", ["dinner"], ["korean", "soup", "noodles", "kid-favorite"], 4, 15, 15, 2,
      ["4 cups chicken broth", "1/2 can Spam, sliced", "3 hot dogs, sliced", "1 cup kimchi, chopped", "1/2 onion, sliced", "1/2 block tofu, sliced", "1 cup baked beans (optional)", "1 package instant ramen (noodles only)", "2 slices American cheese", "2 green onions, chopped", "2 tbsp gochugaru", "1 tbsp gochujang", "1 tbsp soy sauce", "1 tbsp sugar", "3 cloves garlic, minced"],
      ["Mix the gochugaru, gochujang, soy sauce, sugar and garlic into a sauce.", "Arrange the Spam, hot dogs, kimchi, onion, tofu and beans in a wide, shallow pot.", "Spoon the sauce in the middle and pour in the broth.", "Bring to a boil, then simmer for 8 minutes.", "Add the ramen noodles and cook for 3 minutes.", "Top with the cheese and green onions, and eat from the pot at the table."],
      "Born in Korea after the war, with American Spam and hot dogs. A family pot everyone shares.",
      "Use Spam Lite and chicken hot dogs, more tofu, and add mushrooms and zucchini."),

    d("jeyuk-bokkeum", "Spicy Pork Stir-Fry (Jeyuk Bokkeum)", "제육볶음", "🐷", ["dinner"], ["korean", "meat"], 4, 30, 12, 2,
      ["1 1/2 lb thinly sliced pork shoulder or belly", "3 tbsp gochujang", "1 tbsp gochugaru", "2 tbsp soy sauce", "2 tbsp sugar", "1 tbsp honey", "4 cloves garlic, minced", "1 tsp grated ginger", "1 tbsp sesame oil", "1/2 onion, sliced", "1/2 carrot, sliced", "2 green onions, cut into 2-inch pieces", "1 tbsp vegetable oil", "1 tsp sesame seeds", "Lettuce leaves and cooked rice, for serving"],
      ["Mix the gochujang, gochugaru, soy sauce, sugar, honey, garlic, ginger and sesame oil.", "Coat the pork in the sauce and marinate for 20 minutes.", "Heat the oil in a big pan over high heat. Cook the pork for 6 minutes, stirring.", "Add the onion and carrot and cook for 4 minutes until the pork is cooked and a little charred.", "Add the green onions for the last minute and sprinkle with sesame seeds.", "Wrap in lettuce with rice."],
      "A Korean lunch classic. Before adding the sauce, set aside some plain pork for anyone who wants it mild, and cook it with soy sauce and sugar.",
      "Use pork loin instead of belly, half the sugar, and add cabbage."),

    d("dak-bulgogi", "Spicy Chicken Bulgogi", "닭불고기", "🍗", ["dinner"], ["korean", "meat", "kid-favorite"], 4, 30, 15, 1,
      ["1 1/2 lb boneless chicken thighs, cut into strips", "2 tbsp gochujang", "2 tbsp soy sauce", "2 tbsp honey", "1/2 Asian pear or apple, grated", "3 cloves garlic, minced", "1 tsp grated ginger", "1 tbsp sesame oil", "1/2 onion, sliced", "1 tbsp vegetable oil", "1 tsp sesame seeds", "Cooked rice, for serving"],
      ["Mix the gochujang, soy sauce, honey, pear, garlic, ginger and sesame oil.", "Add the chicken and onion and marinate for 20 minutes.", "Heat the oil in a big pan over medium-high heat.", "Cook the chicken for 10 to 12 minutes, turning, until cooked through and sticky.", "Sprinkle with sesame seeds and serve with rice."],
      "Sweet with a gentle warmth. Great in lettuce wraps or rice bowls.",
      "Use chicken breast, half the honey, and serve with brown rice and cucumbers."),

    d("jjimdak", "Soy Braised Chicken (Jjimdak)", "찜닭", "🍗", ["dinner"], ["korean", "meat", "noodles", "kid-favorite"], 4, 20, 35, 0,
      ["2 lb bone-in chicken thighs or drumsticks", "3 oz sweet potato glass noodles (dangmyeon)", "2 potatoes, cut into chunks", "1 carrot, cut into chunks", "1 onion, cut into chunks", "6 tbsp soy sauce", "3 tbsp brown sugar", "2 tbsp honey", "6 cloves garlic, minced", "1 tsp grated ginger", "2 cups water", "2 dried red chilies (optional)", "1 tbsp sesame oil", "2 green onions, sliced"],
      ["Soak the glass noodles in warm water for 30 minutes.", "Boil the chicken in water for 3 minutes, then drain and rinse (this makes the sauce clean).", "Put the chicken in a pot with the soy sauce, brown sugar, honey, garlic, ginger, water and chilies. Bring to a boil.", "Cover and simmer for 15 minutes.", "Add the potatoes, carrot and onion. Simmer for 15 minutes until the potatoes are soft.", "Add the noodles and cook for 3 to 4 minutes until they soak up the sauce. Stir in the sesame oil and top with green onions."],
      "A big pot of sweet soy chicken, potatoes and slurpy noodles. The dried chilies add just a hint of heat.",
      "Use skinless chicken, half the sugar, and add extra carrots and cabbage."),

    d("dakdoritang", "Spicy Chicken & Potato Stew (Dakdoritang)", "닭도리탕", "🍲", ["dinner"], ["korean", "meat", "soup"], 4, 15, 40, 2,
      ["2 lb bone-in chicken pieces", "3 potatoes, cut into big chunks", "1 carrot, cut into chunks", "1 onion, cut into chunks", "2 green onions, cut into 2-inch pieces", "3 tbsp gochugaru", "2 tbsp gochujang", "4 tbsp soy sauce", "2 tbsp sugar", "6 cloves garlic, minced", "1 tsp grated ginger", "3 cups water", "1 tbsp sesame oil"],
      ["Boil the chicken in water for 3 minutes, then drain and rinse.", "Mix the gochugaru, gochujang, soy sauce, sugar, garlic and ginger.", "Put the chicken, sauce and water in a pot. Bring to a boil, then simmer for 15 minutes.", "Add the potatoes, carrot and onion. Simmer for 20 minutes until the potatoes are soft and the sauce is thick.", "Add the green onions and sesame oil. Serve with rice."],
      "Red and hearty: a cozy dinner for kids who like it hot. The potatoes soak up the sauce.",
      "Use skinless chicken, half the sugar, and add zucchini and mushrooms."),

    d("gamja-jeon", "Crispy Potato Pancakes (Gamja Jeon)", "감자전", "🥔", ["snack", "lunch"], ["korean", "veggie", "kid-favorite"], 3, 15, 15, 0,
      ["3 medium potatoes, peeled", "1/2 tsp salt", "1 tbsp potato starch or cornstarch", "1/2 green onion, finely chopped", "3 tbsp vegetable oil", "2 tbsp soy sauce", "1 tbsp rice vinegar"],
      ["Grate the potatoes finely (a grown-up helps). Put them in a sieve over a bowl and press out the liquid.", "Let the liquid sit for 5 minutes, then pour off the water and keep the white starch at the bottom.", "Mix the potato, starch, salt and green onion.", "Heat the oil in a pan over medium heat. Spread spoonfuls into thin pancakes.", "Cook for 3 to 4 minutes a side until crispy and golden.", "Mix the soy sauce and vinegar for dipping."],
      "Just potatoes, and so crispy. A perfect after-school snack.",
      "Add grated zucchini and carrot, and use less oil in a nonstick pan."),

    d("kimchi-jeon", "Kimchi Pancake (Kimchi Jeon)", "김치전", "🥞", ["snack", "lunch"], ["korean", "quick"], 3, 10, 15, 1,
      ["1 cup well-fermented kimchi, chopped", "2 tbsp kimchi juice", "1 cup all-purpose flour", "1/2 cup cold water", "1 tsp sugar", "2 green onions, chopped", "4 oz pork or bacon, chopped (optional)", "3 tbsp vegetable oil", "2 tbsp soy sauce", "1 tbsp rice vinegar"],
      ["Mix the flour, water, kimchi juice and sugar into a batter.", "Stir in the kimchi, green onions and pork.", "Heat the oil in a big pan over medium-high heat. Spread the batter thin.", "Cook for 4 minutes until crispy, flip, and cook 3 minutes more.", "Cut into squares and dip in soy sauce mixed with vinegar."],
      "Rainy-day food in Korea. The older the kimchi, the better the pancake.",
      "Use half whole-wheat flour, skip the pork, and add sliced onion and zucchini."),

    d("homemade-mandu", "Homemade Dumplings (Mandu)", "만두", "🥟", ["lunch", "dinner"], ["korean", "meat", "lunchbox", "kid-favorite"], 6, 50, 15, 0,
      ["8 oz ground pork", "1/2 block firm tofu, crumbled and squeezed dry", "2 oz sweet potato glass noodles, cooked and chopped", "1 cup chopped cabbage or kimchi, squeezed dry", "2 green onions, chopped", "1 egg", "2 cloves garlic, minced", "1 tbsp soy sauce", "1 tsp sesame oil", "1/2 tsp salt", "1/4 tsp black pepper", "40 round dumpling wrappers", "2 tbsp vegetable oil", "Soy sauce and rice vinegar, for dipping"],
      ["Mix the pork, tofu, noodles, cabbage, green onions, egg, garlic, soy sauce, sesame oil, salt and pepper.", "Put a spoonful of filling in the middle of a wrapper. Wet the edge, fold it in half and pinch it shut.", "Kids can fold too: any shape works!", "To pan-fry: cook in hot oil for 2 minutes, add 1/4 cup water, cover and steam for 5 minutes until the water is gone.", "Or boil for 5 minutes until they float, or steam for 10 minutes.", "Dip in soy sauce mixed with vinegar."],
      "Make a big batch together and freeze them on a tray, then in a bag. Cook from frozen for an extra 2 minutes.",
      "Use lean pork or chicken, more tofu and cabbage, and steam them instead of frying."),

    d("soegogi-muguk", "Beef & Radish Soup (Soegogi Muguk)", "소고기무국", "🍲", ["dinner", "breakfast"], ["korean", "soup", "healthy"], 4, 10, 30, 0,
      ["8 oz beef brisket or stew meat, thinly sliced", "1 lb Korean radish (mu), cut into thin squares", "1 tbsp sesame oil", "3 cloves garlic, minced", "2 tbsp soup soy sauce", "8 cups water", "1 tsp salt", "2 green onions, chopped", "1/4 tsp black pepper"],
      ["Heat the sesame oil in a pot. Cook the beef for 3 minutes until browned.", "Add the radish and garlic and cook for 2 minutes.", "Add the soup soy sauce and water. Bring to a boil.", "Simmer for 20 to 25 minutes until the radish is soft and see-through.", "Season with salt and pepper and add the green onions. Serve with rice."],
      "Clean, gentle and warming. Many Korean kids grow up eating this for breakfast.",
      "Skim the fat off the top and add tofu and extra radish."),

    d("ssam-night", "Lettuce Wrap Night (Ssam)", "쌈밥", "🥬", ["dinner"], ["korean", "meat", "healthy", "kid-favorite"], 4, 20, 15, 1,
      ["1 1/2 lb pork belly or thinly sliced pork shoulder", "1/2 tsp salt", "1/4 tsp black pepper", "2 heads green or red leaf lettuce, leaves separated", "1 cucumber, cut into sticks", "1 carrot, cut into sticks", "4 cloves garlic, sliced", "2 tbsp doenjang", "1 tbsp gochujang", "1 tsp honey", "1 tsp sesame oil", "1 green onion, chopped", "Cooked rice, for serving", "Kimchi, for serving"],
      ["Mix the doenjang, gochujang, honey, sesame oil and green onion to make ssamjang.", "Wash and dry the lettuce. Put out the veggie sticks, rice and kimchi.", "Sprinkle the pork with salt and pepper. Cook in a hot pan for 4 minutes a side until golden.", "Cut the pork into bite-size pieces.", "Everyone builds their own: lettuce, a little rice, pork, a dab of sauce, then wrap and eat in one bite!"],
      "A fun, hands-on dinner where everyone makes their own wraps. Plain doenjang (no gochujang) for mild eaters.",
      "Use pork shoulder or chicken instead of belly, and add lots of veggies."),

    d("bibim-guksu", "Spicy Cold Mixed Noodles (Bibim Guksu)", "비빔국수", "🍜", ["lunch"], ["korean", "noodles", "quick"], 3, 10, 5, 2,
      ["10 oz somyeon (thin wheat noodles)", "3 tbsp gochujang", "1 tbsp gochugaru", "2 tbsp sugar", "2 tbsp rice vinegar", "1 tbsp soy sauce", "1 tbsp sesame oil", "1 clove garlic, minced", "1 cup well-fermented kimchi, chopped", "1 cucumber, cut into matchsticks", "2 hard-boiled eggs, halved", "1 tsp sesame seeds"],
      ["Mix the gochujang, gochugaru, sugar, vinegar, soy sauce, sesame oil and garlic into a sauce.", "Cook the noodles as the package says (about 3 minutes). Rinse in cold water until cold and drain well.", "Toss the noodles with the sauce and kimchi.", "Top with cucumber, eggs and sesame seeds."],
      "Sweet, sour and spicy: the perfect hot-day lunch for spice lovers.",
      "Use buckwheat noodles and add shredded lettuce and carrots."),

    d("dubu-gangjeong", "Sweet Crispy Tofu (Dubu Gangjeong)", "두부강정", "🥢", ["dinner"], ["korean", "veggie", "kid-favorite"], 4, 15, 20, 0,
      ["1 block firm tofu (16 oz), cut into cubes", "1/2 tsp salt", "1/2 cup potato starch or cornstarch", "1/4 cup vegetable oil", "2 tbsp soy sauce", "2 tbsp brown sugar", "2 tbsp honey", "2 cloves garlic, minced", "1 tbsp water", "1 tsp sesame seeds", "1 tbsp chopped peanuts"],
      ["Pat the tofu very dry with paper towels. Sprinkle with salt.", "Toss the tofu cubes in the starch.", "Heat the oil in a pan over medium-high heat. Fry the tofu for 8 to 10 minutes, turning, until crispy on all sides.", "In another pan, simmer the soy sauce, brown sugar, honey, garlic and water for 2 minutes.", "Toss the tofu in the sauce and top with sesame seeds and peanuts."],
      "Like sweet crispy chicken, but tofu. Even tofu doubters ask for more.",
      "Bake the coated tofu at 425°F for 25 minutes instead of frying, and use half the sugar."),

    d("sotteok-sotteok", "Rice Cake & Sausage Skewers (Sotteok Sotteok)", "소떡소떡", "🍢", ["snack"], ["korean", "kid-favorite", "treat"], 4, 10, 10, 1,
      ["16 cylinder rice cakes (tteok)", "16 mini sausages (cocktail sausages)", "8 wooden skewers", "1 tbsp vegetable oil", "2 tbsp ketchup", "1 tbsp gochujang", "1 tbsp honey", "1 tsp soy sauce", "1 tsp sesame seeds"],
      ["Boil the rice cakes for 1 minute to soften. Drain.", "Thread rice cakes and sausages onto the skewers, taking turns.", "Mix the ketchup, gochujang, honey and soy sauce.", "Cook the skewers in the oil over medium heat for 3 to 4 minutes a side until golden.", "Brush with the sauce and sprinkle with sesame seeds."],
      "A Korean rest-stop favorite. Use only ketchup and honey for a sweet, mild version.",
      "Use chicken sausages and serve with fruit."),

    d("goguma-mattang", "Candied Sweet Potatoes (Mattang)", "고구마 맛탕", "🍠", ["snack"], ["korean", "treat", "kid-favorite"], 4, 10, 25, 0,
      ["2 sweet potatoes (about 1 1/2 lb), cut into chunks", "2 tbsp vegetable oil", "3 tbsp sugar", "2 tbsp honey", "1 tbsp water", "1 tsp black sesame seeds"],
      ["Heat the oven to 425°F. Toss the sweet potatoes with the oil.", "Roast for 20 to 25 minutes, turning once, until soft inside and golden.", "In a pan, heat the sugar, honey and water until it bubbles and turns light gold, about 2 minutes. Grown-ups only: it's very hot.", "Toss the hot sweet potatoes in the syrup.", "Sprinkle with sesame seeds and spread on parchment to cool a little."],
      "Crunchy candy outside, soft inside. Roasting means no deep-frying.",
      "Skip the syrup and roast them with a drizzle of honey and cinnamon."),

    d("dak-kalguksu", "Chicken Noodle Soup (Dak Kalguksu)", "닭칼국수", "🍜", ["dinner", "lunch"], ["korean", "soup", "noodles", "healthy"], 4, 10, 40, 0,
      ["1 1/2 lb bone-in chicken thighs", "10 cups water", "1 onion, halved", "6 cloves garlic", "1 inch ginger, sliced", "1 lb fresh kalguksu or udon noodles", "1 zucchini, cut into matchsticks", "1 carrot, cut into matchsticks", "2 tbsp soup soy sauce", "1 tsp salt", "2 green onions, chopped", "1 tsp sesame oil"],
      ["Simmer the chicken, water, onion, garlic and ginger for 30 minutes.", "Take out the chicken. Shred the meat and throw away the skin and bones. Strain the broth.", "Bring the broth back to a boil with the soup soy sauce and salt.", "Add the noodles and cook for 4 minutes. Add the zucchini and carrot for the last 2 minutes.", "Add the chicken, green onions and sesame oil."],
      "Korea's chicken noodle soup: chewy hand-cut noodles in a clear, cozy broth.",
      "Use chicken breast, skim the fat, and add extra veggies."),

    d("beef-bulgogi-bowl", "15-Minute Ground Beef Bulgogi Bowls", "소고기 덮밥", "🍚", ["dinner", "lunch"], ["korean", "rice", "meat", "quick", "kid-favorite"], 4, 5, 12, 0,
      ["1 lb ground beef", "1 tbsp sesame oil", "3 cloves garlic, minced", "1 tsp grated ginger", "1/4 cup soy sauce", "3 tbsp brown sugar", "1/4 tsp black pepper", "2 green onions, sliced", "4 cups cooked rice", "1 cucumber, sliced", "1 carrot, shredded", "4 eggs, fried", "1 tsp sesame seeds"],
      ["Heat the sesame oil in a big pan. Cook the beef for 5 minutes, breaking it up, until browned.", "Add the garlic and ginger and cook for 1 minute.", "Stir in the soy sauce, brown sugar and pepper. Simmer for 2 minutes until glossy.", "Spoon the beef over bowls of rice.", "Add cucumber, carrot, a fried egg and green onions. Sprinkle with sesame seeds."],
      "All the bulgogi flavor with no marinating. A busy-night lifesaver.",
      "Use lean ground beef or turkey and brown rice, and add steamed spinach."),
  ]),
];
