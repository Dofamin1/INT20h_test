<template>
  <div id="app">
    <mainPage/>
  </div>
</template>

<script>
import mainPage from './pages/mainPage/index.vue';
export default {
  name: 'App',
  components: {
    mainPage,
  },
};
</script>

<style>
@media screen and (max-width: 500px) {
  #app {
    width: max-content;
  }
}
</style>
