<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <div class="card-deck">
        <RecipePreview v-for="r in recipes" :key="r.id" 
        class="recipePreview"
        :showFavorite="showFavorite"
        :recipe="r" />
    </div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    showFavorite: Boolean
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {

  },
  methods: {
    updateRecipes(recipes) {
      this.recipes = recipes;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
