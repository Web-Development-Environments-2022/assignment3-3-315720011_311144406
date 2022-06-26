<template>

  <div class="card">
    <img v-if="image_load" :src="recipe.image" class="card-img-top" />
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
      <router-link  class="card-link" :to="{ name: 'recipe', params: { recipeId: recipe.id } }" >Show Recipe</router-link>
      <router-link  class="card-link" :to="{ name: 'login' }">Add To Favorites</router-link>
    </div>
  </div>

</template>

<script>
export default {
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

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
      // }
    // }
  },
  methods: {
    async addToFavorites() {

      
    }
  },
  filters:{
    boolToYesNo: function(bool){
      return bool ? "Yes" : "No"
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
