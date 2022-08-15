<template>
  <div class="container">
    <h1 class="title">My Favorites</h1>
    <div class="row row-cols-1 row-cols-md-2 myRecipes" v-if="!recipesNotExist">
      <div class="col mb-4" v-for="r in recipes" :key="r.id">
          <RecipePreview 
            class="recipePreview" 
            :recipe="r" 
            showFavorite
          />
      </div>
    </div>
    <div v-else>
        <h2 class="title" v-if="recipesNotExist">You haven't liked any recipes yet, look around and find some</h2>
    </div>


  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
export default {
  components: {
    RecipePreview
  },
  data() {
    return {
        recipesNotExist: false,
        recipes: []
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
            this.recipesNotExist = false;
            this.recipes.push(...favoriteRecipes);
        }
        else{
            this.recipesNotExist = true;
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
