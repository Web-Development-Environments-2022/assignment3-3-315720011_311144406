<template>
  <b-container fluid>
  <b-row>
    <b-col cols=7>

      <RecipePreviewList 
        title="Random Recipes" 
        :showFavorite ="$root.store.username != null"
        class="RandomRecipes center" 
        ref="recipesList" />

      <b-button 
        pill variant="primary"
        class="changeCard" 
        @click="updateRecipes()" 
        type="submit"
        > Change Recipes
      </b-button>
    </b-col>
    <b-col cols=4>
      <LoginComponent
        v-if="!$root.store.username"
        class="login"
      ></LoginComponent>
      <RecipePreviewList 
        v-if="$root.store.username"
        title="Your Last Viewed Recipes"
        isOnLastViewd
        :class="{
          RandomRecipes: true,
          blur: !$root.store.username,
          center: true
        }"
        ref="lastViewed" 
        disabled
      ></RecipePreviewList>


    </b-col>
  </b-row>
</b-container>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginComponent from "../components/LoginComponent";
export default {
  components: {
    RecipePreviewList,
    LoginComponent
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        let response = await this.axios.get(
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
        if(this.$root.store.username && this.$root.viewed && this.$root.viewed.length > 0){
          const ViewedRecipesIds = await JSON.parse(JSON.stringify(this.$root.viewed));
          const lastThreeRecipesIds = ViewedRecipesIds.splice(-3);

          response = await this.axios.post(
            this.$root.store.server_domain + "/users/viewed",
            {lastThreeRecipesIds: lastThreeRecipesIds},
            {withCredentials: true},
          );
          let veiwedRecipes = response.data;
          recipes = [];
          recipes.push(...veiwedRecipes);
          this.$nextTick(() => {
              this.$refs.lastViewed.updateRecipes(recipes);
          });
        }

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
.changeCard{
  position: relative;
  padding: 2%;
  margin: 2%;
  left: 38%;
}
.login{
  position: relative;
  top: 10vh;
}
</style>
