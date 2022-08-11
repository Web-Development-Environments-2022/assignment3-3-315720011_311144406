<template>

  <div class="card">
    <img 
      v-if="image_load" 
      :src="recipe.image" 
      class="card-img-top" 
      style="cursor: pointer;" 
      @click="showRecipe()"/>
    <div class="card-body">
      <h5 class="card-title">{{ recipe.title }}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Cooking Time: {{recipe.readyInMinutes}}</li>
      <li class="list-group-item">Popularity: {{recipe.popularity}}</li>
      <li class="list-group-item">
       <p >Vegan: {{recipe.vegan | boolToYesNo}}</p>  
       <p >Vegetarian: {{recipe.vegetarian | boolToYesNo}}</p>
       <p >Gluten Free: {{recipe.glutenFree | boolToYesNo}}</p>
      </li>
    </ul>
    <div class="card-footer" style="bottom=0">
      <b-button 
        class="card-link" 
        @click="showRecipe()" 
        type="submit"
        style="background-color="
        :style="{'background-color':seenColor}"
      >Show Recipe
      </b-button>
      <ToggleFavorite 
        id="favo"
        v-if="this.showFavorite"
        @toggle="(favorited) => addToFavorites(favorited)" 
        :favorited="recipe.favorited"/>
    </div>
  </div>

</template>

<script>
import ToggleFavorite from "./ToggleFavorite";
export default {
  components: {
    ToggleFavorite
  },
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    showFavorite: {
      type: Boolean,
    }

  },
  methods: {
    async addToFavorites(favorited) {
      try {
        console.log("here");
        if(favorited){
          const response = await this.axios.post(
            this.$root.store.server_domain + "/users/favorites",
            {
              recipeId: this.recipe.id,
            },
            {withCredentials: true}
          );
          
        } else{
          const response = await this.axios.post(
            this.$root.store.server_domain + "/users/favorites/remove",
            {
              recipeId: this.recipe.id,
            },
            {withCredentials: true}
          );

          // this.$router.push("/users/favorites");
        }

      } catch (err) {
        console.log(err.response);
      }      
    },

    showRecipe(){
      this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.id } });
    }
  },
  filters:{
    boolToYesNo: function(bool){
      return bool ? "Yes" : "No"
    },


  },
  computed: {
    seenColor(){
      return this.recipe.watched ? "DarkGray" : "DarkCyan"
    }
  }
};
</script>

<style scoped>

#favo{
  margin-left: 120px;
  background: none;
  border: none;
  padding: 0;
  outline: inherit;
  cursor: pointer;
}

</style>
