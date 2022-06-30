<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList 
    title="Random Recipes" 
    showFavorite
    class="RandomRecipes center" 
    ref="recipesList" />
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
    <RecipePreviewList
      title="Your Last Viewed Recipes"
      showFavorite
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      ref="lastViewed" 
      disabled
    ></RecipePreviewList>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
          {withCredentials: true},
        );
        const three_recipes = response.data;
        let recipes = [];
        recipes.push(...three_recipes);
        this.$nextTick(() => {
            this.$refs.recipesList.updateRecipes(recipes);
        });

        //last viewed
        response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
          {withCredentials: true},
        );
        three_recipes = response.data;
        recipes = [];
        recipes.push(...three_recipes);
        this.$nextTick(() => {
            this.$refs.lastViewed.updateRecipes(recipes);
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
