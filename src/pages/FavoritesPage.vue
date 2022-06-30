<template>
  <div class="container">
    <h1 class="title">My Favorites</h1>
    <div v-if="recipesExist">
        <RecipePreviewList 
        showFavorite
        title="My Favorites" 
        class="MyFavorites center" 
        ref="recipesList"/>
    </div>
    <div v-else>
        <h2 class="title">You haven't liked any recipes yet, look around and find some</h2>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
        recipesExist: false
    }
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites",
          {withCredentials: true},
        );

        const favoriteRecipes = response.data;
        if(favoriteRecipes && favoriteRecipes.length > 0){
            this.recipesExist = true;
            let recipes = [];
            recipes.push(...favoriteRecipes);
            this.$nextTick(() => {
                this.$refs.recipesList.updateRecipes(recipes);
            });
        }
        else{
            this.recipesExist = false;
        }

      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.MyFavorites {
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
