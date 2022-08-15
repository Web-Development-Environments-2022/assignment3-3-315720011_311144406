<template>
  <div class="card" style="padding=0px" >
    <img 
      v-if="image_load" 
      :src="recipe.image" 
      class="card-img-top" 
      style="cursor: pointer;" 
      @click="showRecipe()"/>

    <div
      class="myCard"
      >
      <h5 class="myTitle text-center ">{{ recipe.title }}</h5>
      <div v-if="!isOnLastViewd">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cooking Time: {{recipe.readyInMinutes}}</li>
          <li class="list-group-item"  v-if="!isPersonal" >Popularity: {{recipe.popularity}}</li>
          <li class="list-group-item">
            <p >Vegan: {{recipe.vegan | boolToYesNo}}</p>  
            <p >Vegetarian: {{recipe.vegetarian | boolToYesNo}}</p>
            <p >Gluten Free: {{recipe.glutenFree | boolToYesNo}}</p>
          </li>
          <div class="list-group list-group-flush" v-if="isPersonal">
            <li class="list-group-item">
              <p >Servings:
                {{recipe.servings}}
              </p>  
            </li>
            <li class="list-group-item" >
              <h5 >Ingredients:</h5>
                <p v-for="(r, index) in recipe.ingredientsNameAmount" :key="index + '_' + r.id">
                  {{ r.amount }} {{ r.name}}
                </p>
            </li>
            <li class="list-group-item" >
              <h5 >Instructions: </h5>
              <p v-for="(r, index) in recipe.instructions.split('\n')" :key="index + '_' + r.id">
                {{r}}
              </p>  
            </li>
          </div>
        </ul>
        <div class="card-footer" style="bottom=0" v-if="!isPersonal">
          <b-button 
            
            class="card-link" 
            @click="showRecipe()" 
            type="submit"
            :style="{'background-color': seenColor}"
          >Show Recipe
          </b-button>
          <ToggleFavorite 
            id="favo"
            v-if="this.showFavorite"
            @toggle="(favorited) => addToFavorites(favorited)" 
            :favorited="recipe.favorited"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ToggleFavorite from "./ToggleFavorite";
export default {
  components: {
    ToggleFavorite
  },

  data() {
    return {
      image_load: false,
    };

  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    showFavorite: {
      type: Boolean,
    },
    isOnLastViewd: {
      type: Boolean
    },
    isPersonal: {
      type: Boolean
    }
  },

  async mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },

  methods: {
    async addToFavorites(favorited) {
      try {
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
      if(!this.isPersonal){
        this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.id } });
      }

    }
  },
  filters:{
    boolToYesNo: function(bool){
      return bool ? "Yes" : "No"
    },
  },

  computed: {
    seenColor(){
      const viewed = JSON.parse(JSON.stringify(this.$root.viewed));
      return viewed.includes(parseInt(this.recipe.id)) ? "DarkGray" : "DarkCyan"
    },
  }
  
};
</script>

<style scoped>

.myCard{
  padding: 0px;
  margin-left: 0px;
  margin-right: 0px;
  color: black;
  background-color:aliceblue
}

.myTitle{
  height: 10vh;
  padding: 2vh;
  padding-left: 1vh ;
  padding-right: 1vh ;
  font-weight: bold;
}

#favo{
  position: absolute;
  right: 2vw;
  background: none;
  border: none;
  padding: 0;
  outline: inherit;
  cursor: pointer;
}

</style>
