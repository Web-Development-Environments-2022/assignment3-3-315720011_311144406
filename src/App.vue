<template>
  <div id="app">

    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Eat Well</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav >
        <b-navbar-nav >
          <b-nav-item :to="{ name: 'main' }"> View Recipes </b-nav-item>
          <b-nav-item :to="{ name: 'search' }"> Search </b-nav-item>
          <!-- Whene Logged In -->
          <b-nav-item v-if="$root.store.username" :to="{ name: 'createRecipe' }">Create Recipe</b-nav-item>
        </b-navbar-nav> 


        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input v-model="query" size="sm" class="mr-sm-2" placeholder="Quick Search"></b-form-input>
            <b-button  @click="search()" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>

        <!-- Whene Logged Out -->
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-navbar-brand >Guest</b-navbar-brand>
          <b-nav-item  :to="{ name: 'register' }"> Register </b-nav-item>
          <b-nav-item :to="{ name: 'login' }"> Login </b-nav-item>
        </b-navbar-nav>

        <!-- Whene Logged In -->
        <b-navbar-nav class="ml-auto" v-if="$root.store.username" right>
          <b-nav-item-dropdown right>
            <template #button-content>
              <em><b> {{ $root.store.username }}</b></em>
            </template>
            <b-dropdown-item :to="{ name: 'myRecipes' }">My Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'familyRecipes' }">Family Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'favorites' }">My Favorites</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="Logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav right v-if="$root.store.username">
          <b-nav-item  :to="{ name: 'about' } "> About </b-nav-item>
        </b-navbar-nav>


      </b-collapse>
    </b-navbar>

    <router-view ref="link"/>

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      query: ""
    }
  },
  methods: {
    search() {
      if(this.query.length){
        if(this.$router.currentRoute.name === 'searchResults'){
          this.$refs.link.query = this.query;
          this.$refs.link.search(); 
        }
        else{
            this.$router.push({
            name: 'searchResults',
            params: {
              query: this.query,
              resultNumber: 5 
            },
            replace: true
            });
        }
        this.query = "";
      }
    },

    async Logout() {
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/Logout",
          {
          },
          {withCredentials: true}
        );
      } catch (error) {
        console.log(error);
      }
      finally{
        this.$root.store.logout();
        this.$root.toast("Logout", "User logged out successfully", "success");
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #021425;
  min-height: 100vh;
}



// .navGroup{
//   padding-left: 5vw;
//   padding-right: 10vw;
// }

// .dropNav{
//   // position: absolute;
//   right: 4vh;
//   padding: 1vh;
// }
</style>
