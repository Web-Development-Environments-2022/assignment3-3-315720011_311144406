<template>
  <b-container fluid>
    <h1 class="title">The Family Recipes</h1>
    <b-card-group class="card-deck">
      <div class="col mb-4" v-for="r in recipes" :key="r.id">
          <RecipePreview
            class="recipePreview" 
            :recipe="r" 
            isPersonal
          />
      </div>
    </b-card-group>
</b-container>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import PadThai from "../assets/Pad-Thai.jpg"
import Seviche from "../assets/Seviche.jpg"
import Salmon from "../assets/Salmon.jpg"
export default {
  components: {
    RecipePreview,
  },
  data() {
    return {
      recipes: []
    };
  },

  mounted() {
    const recipe1 = {
      title: "Pad-Thai",
      readyInMinutes: 30,
      popularity: "Our Favorite",
      vegan: false,
      vegetarian: true,
      gluten_free: false,
      instructions:  
        "1. mix the sugar, fish sauce and rice viniger in a bowl and set aside. \n" + 
        "2. add the noodles to a pot of boiling water for 5 minutes. \n" +
        "3. stir fry the onion garlic and tofu. \n" +
        "4. add the eggs for a minute to take form and then add the cooked noodels and sauce. \n" +
        "5. serve with beansproutes above the dish.",
              
      servings: 3,
      ingredientsNameAmount: [
          {name: "rice noodles", amount: "300 grams"},
          {name: "rice viniger", amount: "1 tbsp"},
          {name: "brown sugar", amount: "3 tbsp"},
          {name: "fish sauce", amount: "2 tbsp"},
          {name: "vegetable or canola oil", amount: "2 – 3 tbsp"},
          {name: "onion", amount: "half"},
          {name: "garlic cloves", amount: "2"},
          {name: "tofu", amount: "300 grams"},
          {name: "eggs", amount: "2"},
          {name: "beansprouts", amount: "1 1/2 cups"},
      ],
      image: PadThai,
    }
    this.recipes.push(recipe1);

    const recipe2 = {
      title: "sviche ",
      readyInMinutes: 30,
      popularity: 0,
      vegan: false,
      vegetarian: false,
      gluten_free: true,
      instructions:  
        "1. chop dice all ingrediants. \n" + 
        "2. mix all but jthe avocado and add salt and lemon juice. \n" + 
        "3. once acidity and saltiness matches the desired taste add avocado and serve.",
      servings: 4,
      ingredientsNameAmount: [
          {name: "white fish", amount: "200 grams"},
          {name: "salmon", amount: "100 grams"},
          {name: "onion", amount: "half"},
          {name: "pineapple", amount: "half"},
          {name: "tomato", amount: "half"},
          {name: "red chilly pepper", amount: "1"},
          {name: "an avocado", amount: "half"},
          {name: "cilantro", amount: "a handfull"},
          {name: "nana-mint", amount: "a handfull"},
          {name: "olive oil", amount: "1 spoons"},
          {name: "lemon juice", amount: "2 spoons"},
      ],
      image: Seviche,
    }
    this.recipes.push(recipe2);

    const recipe3 = {
      title: "Lemon Honey Salmon",
      readyInMinutes: 30,
      popularity: 0,
      vegan: false,
      vegetarian: false,
      gluten_free: true,
      instructions:  
        "1. Arrange oven shelf to the middle of your oven. Preheat oven to broil/grill settings on medium heat. \n" + 
        "2. Season salmon with salt, pepper and paprika. Set aside. \n" + 
        "3. Heat the butter in a skillet or pan over medium-high heat until melted. Add the garlic and sauté for about a minute, until fragrant. Pour in the honey, water and soy sauce; allow the flavours to heat through and combine. Add in the lemon juice, stir well to combine all of the flavours together. \n" + 
        "4. Add the salmon steaks to the sauce in the pan; cook each fillet (skin-side down if there's any skin) for 3-4 minutes or until golden, while basting the tops with the pan juices. Season with salt and pepper, to taste (if desired). \n" + 
        "5. Baste salmon one more time then transfer the pan to your oven to broil / grill for a further 5-6 minutes, or until the tops of the salmon are nicely charred, and the salmon is cooked to your liking. \n" + 
        "6. To serve, drizzle with the sauce and a squeeze of lemon juice. Serve with steamed vegetables over rice or with a salad",

      servings: 3,
      ingredientsNameAmount: [
          {name: "salmon", amount: "600 grams"},
          {name: "butter", amount: "2 tablespoons "},
          {name: "garlic", amount: "4 cloves"},
          {name: "honey", amount: "4 tablespoons"},
          {name: "water", amount: "1 tablespoon"},
          {name: "soy sauce", amount: "2 teaspoons"},
          {name: "lemon juice", amount: "1 tablespoon"},
          {name: "nana-mint", amount: "a handfull"},
          {name: "olive oil", amount: "1 spoons"},
          {name: "lemon juice", amount: "2 spoons"},
      ],
      image: Salmon,
    }
    this.recipes.push(recipe3);
  },
};

</script>

<style lang="scss" scoped>
.title{
  line-height: 20vh;
  text-align: center;
}
</style>
