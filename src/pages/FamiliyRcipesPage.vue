<template>
  <b-container fluid>
    <h1 class="title">The Family Recipes</h1>
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col mb-4" v-for="r in recipes" :key="r.id">
          <RecipePreview 
            class="recipePreview" 
            :recipe="r" 
            :showFavorite ="$root.store.username != null"
          />
      </div>
    </div>
</b-container>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
// import image1 from "../assets/image1"
// import image2 from "../assets/image2"
// import image3 from "../assets/image3"
export default {
  components: {
    RecipePreview,
  },
  mounted() {
    let recipe1 = {
      title: "recipe 1",
      readyInMinutes: 30,
      image: image1,
      popularity: 0,
      vegan: false,
      vegetarian: false,
      gluten_free: false,
      instructions: "",
      servings: 4,
      ingredientsNameAmount: {

      },
    }

  },
};

</script>

<style lang="scss" scoped>
.title{
  line-height: 20vh;
  text-align: center;
}
</style>
