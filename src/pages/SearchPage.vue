<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="onSearch">
      <b-form-group
        id="input-group"
        label-cols-sm="3"
        label="Query:"
        label-for="formQuery"
      >
        <b-form-input
          v-model="form.query"
          type="text"
          placeholder="Search for a recipe"
        ></b-form-input>
        <b-form-invalid-feedback>
          Query is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Result number:"
        label-for="input-result-number"
      >
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="resultNumber" v-model="form.resultNumber" value="5" >
        <label class="form-check-label" for="exampleRadios1"> 5 </label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="resultNumber" v-model="form.resultNumber" value="10">
        <label class="form-check-label" for="exampleRadios2"> 10 </label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="resultNumber" v-model="form.resultNumber" value="15">
        <label class="form-check-label" for="exampleRadios2"> 15 </label>
      </div>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Cuisine:"
        label-for="cuisine"
      >
        <b-form-select
          id="input-cuisine"
          v-model="form.cuisine"
          :options="cuisines"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Diet:"
        label-for="diet"
      > 
      <b-form-select
          id="input-diet"
          v-model="form.diet"
          :options="diets"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Intolerance:"
        label-for="intolerance"
      >
        <b-form-select
          id="input-intolerance"
          v-model="form.intolerance"
          :options="intolerances"
        ></b-form-select>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Search</b-button>
    </b-form>
    
    <SearchResultsComponent
      ref="searchResults"/>


  </div>
</template>

<script>
import cuisines from "../assets/cuisines";
import diets from "../assets/diets";
import intolerances from "../assets/intolerances";
import required from "vuelidate/lib/validators";
import SearchResultsComponent from "../components/SearchResultsComponent";
export default {
  name: "SearchPage",
  components: {
    SearchResultsComponent
  },
  data() {
    return {
      form: {
        query: "",
        resultNumber: "5",
        cuisine: null,
        diet: null,
        intolerance: null
      },
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
      resultNumbersOptions: [],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      query: {
        required
      }
    }
  },

  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    this.resultNumbersOptions.push(...["5", "10", "15"]);
  },

  methods: {

    onSearch() {
      if(this.form.query === ""){
        return
      }
      else{
        const params = {
          query: this.form.query,
          resultNumber: this.form.resultNumber,
          cuisine: this.form.cuisine,
          diet: this.form.diet,
          intolerance: this.form.intolerance
        }
        this.$refs.searchResults.search(params);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>