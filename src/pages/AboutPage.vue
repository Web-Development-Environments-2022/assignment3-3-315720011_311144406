<template>
    <b-container fluid>
      <b-jumbotron class="about" header="About Us" bg-variant="info" text-variant="white" border-variant="dark">
        <p></p>
        <template #lead>
          We are Omer Maimon and Tomer Witzman
        </template>

        <hr class="my-4">
        <h2>Links To our previous rojects: </h2>
        <br>
        <b-row>
          <b-col>
            <h4>Pacman Game</h4>
            <b-button variant="primary" href="https://web-development-environments-2022.github.io/assignment2-311144406_315720011/"></b-button>
          </b-col>
          <b-col>
            <h4>Herald the living legend</h4>
            <b-button variant="primary" href="https://web-development-environments-2022.github.io/311144406/"></b-button>
          </b-col>
          <b-col>
            <h4>Gregg Charles Popovich</h4>
            <b-button size="lg" variant="primary" href="https://web-development-environments-2022.github.io/315720011/"></b-button>
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>
</template>

<script>
export default {
};

</script>

<style lang="scss" scoped>
.about{
  margin: 5%;
  line-height: 5vh;
  text-align: center;
  font-weight: bold;
}
</style>
