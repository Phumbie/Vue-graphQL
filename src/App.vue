<template>
  <div id="app">
    <Alert />
    <router-view />
    <Loader />
  </div>
</template>

<script>
  import Loader from "./components/partials/loader";
  import Alert from "@/components/partials/Alert.vue";
  export default {
    components: {
      Loader,
      Alert,
    },
  };
</script>
<style lang="scss">
  * {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
