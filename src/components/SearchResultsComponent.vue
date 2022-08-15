<template>
  <div class="container" v-if="query">
    <div v-if="this.recipes.length">
    <select @change="sortBy" v-model="sortParam" class="form-select" aria-label="Default select example">
      <option value=null >Sort By</option>
      <option value=readyInMinutes >Cooking Time</option>
      <option value=popularity >Popularity</option>
    </select>
    <h1 class="title">Search Results</h1>
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col mb-4" v-for="r in recipes" :key="r.id">
          <RecipePreview 
            class="recipePreview" 
            :recipe="r" 
            :showFavorite ="$root.store.username != null"
          />
      </div>
    </div>
    </div>
    <div v-else>
      <h1 class="title">No search results found for "{{this.query}}" </h1>
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
    return{
      recipes: [],
      sortParam: null,
      query: ""
    }
  },
  methods: {
    sortBy() {
      if(this.sortParam != null){
        this.recipes.sort((recipeA, recipeB) => {
          return recipeA[this.sortParam] - recipeB[this.sortParam];
        })
      }
    },
    async search(params) {
      try {
        this.query = params.query;
        let url = this.$root.store.server_domain + "/search?query=" + this.query;
        if(params.resultNumber != 5){
          url += "&number=" + params.resultNumber;
        }
        if(params.cuisine != null){
          url += "&cuisine=" + params.cuisine;
        }
        if(params.diet != null){
          url += "&diets=" + params.diet;
        }
        if(params.intolerance != null){
          url += "&intolerance=" + params.intolerance;
        }
        const response = await this.axios.get(
          url,
          {withCredentials: true},
        );

        const searchResults = response.data;
        this.recipes = [];
        this.recipes.push(...searchResults);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Recipes {
  color: black;
  margin: 10px 0 10px;
}
</style>
