<template>
  <div id="app">

    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'main' }"> Vue Recipes </b-nav-item>
          <b-nav-item :to="{ name: 'search' }"> Search </b-nav-item>
        </b-navbar-nav> 


        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Quick Search"></b-form-input>
            <b-button @click="search" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>

        <!-- Whene Logged Out -->
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-navbar-brand >Guest</b-navbar-brand>
          <b-nav-item :to="{ name: 'register' }"> Register </b-nav-item>
          <b-nav-item :to="{ name: 'login' }"> Login </b-nav-item>
        </b-navbar-nav>

        <!-- Whene Logged In -->
        <b-navbar-nav class="ml-auto" v-if="$root.store.username">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em><b> {{ $root.store.username }}</b></em>
            </template>
            <b-dropdown-item href="#">My Recipes</b-dropdown-item>
            <b-dropdown-item href="#">My Favorites</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view />

  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    search(){

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

#nav {
  padding: 30px;
  
  color: #92c9ff;
}

#nav a {
  font-weight: bold;
  color: #92c9ff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
