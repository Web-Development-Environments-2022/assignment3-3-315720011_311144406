<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>
    <div class="row row-cols-1 row-cols-md-2 myRecipes" v-if="recipesExist">
      <div class="col mb-4" v-for="r in recipes" :key="r.id">
          <RecipePreview 
            class="recipePreview" 
            :recipe="r" 
            isPersonal
          />
      </div>
    </div>
    <div v-else>
        <h2 class="title">You haven't liked any recipes yet, look around and find some</h2>
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
        recipesExist: false,
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
          this.$root.store.server_domain + "/users/myrecipes",
          {withCredentials: true},
        );

        const myRecipes = response.data;
        if(myRecipes && myRecipes.length > 0){
            this.recipes.push(...myRecipes);
            this.recipesExist = true;
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
.title{
  line-height: 20vh;
  text-align: center;
  font-weight: bold;
}
.MyRecipes {
  position: relative;
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
