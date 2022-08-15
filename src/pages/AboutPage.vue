<template>
    <b-container fluid>
      <b-jumbotron class="about" header="About Us" bg-variant="info" text-variant="white" border-variant="dark">
        <p>We are Omer Maimon and Tomer Witzman</p>




        <b-button variant="primary" href="#">Github</b-button>
      </b-jumbotron>
    </b-container>
</template>

<script>
export default {
  mounted() {
    this.updateRecipes();
  },
  methods: {

  },
};

</script>

<style lang="scss" scoped>
.about{
  margin: 5%;
  line-height: 20vh;
  text-align: center;
  font-weight: bold;
}
</style>
