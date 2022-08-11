<template>
  <div class="container">
    <LoginComponent>
    </LoginComponent>
  </div>
</template>

<script>
import LoginComponent from "../components/LoginComponent";
export default {
  components: {
    LoginComponent
  },
  name: "Login",
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  top: 10vh;
}
</style>
