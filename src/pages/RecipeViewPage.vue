<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cooking Time: {{recipe.readyInMinutes}}</li>
                <li class="list-group-item">Servings: {{recipe.servings}}</li>
                <li class="list-group-item">Popularity: {{recipe.popularity}}</li>
                <li class="list-group-item">
                  <p >Vegan: {{recipe.vegan | boolToYesNo}}</p>  
                  <p >Vegetarian: {{recipe.vegetarian | boolToYesNo}}</p>
                  <p >Gluten Free: {{recipe.glutenFree | boolToYesNo}}</p>
                </li>
              </ul>
            </div>
              Ingredients:
              <ul>
                <li
                  v-for="(r, index) in recipe.extendedIngredients"
                  :key="index + '_' + r.id"
                >
                  {{ r.original }}
                </li>
              </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="instruction in recipe.analyzedInstructions" :key="instruction.number">
                  {{instruction.step}}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/information/" + this.$route.params.recipeId,
          {withCredentials: true},
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        id,
        analyzedInstructions,
        instructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        vegan,
        vegetarian,
        glutenFree,
        image,
        title,
        servings
      } = response.data;

      analyzedInstructions = analyzedInstructions.steps;

      let _recipe = {
        id,
        instructions,
        analyzedInstructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        vegan,
        vegetarian,
        glutenFree,
        image,
        title,
        servings
      };

      this.recipe = _recipe;
      this.$root.viewed.push(this.recipe.id);
    } catch (error) {
      console.log(error);
    }
  },
  filters:{
    boolToYesNo: function(bool){
      return bool ? "Yes" : "No"
    },
  },
};
</script>

<style scoped>
.list-group{
  color: black;
}

.wrapper {
  display: flex;
  background-color: aliceblue;
  color: black;
  border-radius: 5%;
}

.wrapped {
  width: 50%;
  padding: 3%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
