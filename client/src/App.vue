<template>
  <div id="app">
    <mainPage/>
  </div>
</template>

<script>
import mainPage from './pages/mainPage/index.vue';
// TODO: може перейменувати?
export default {
  name: 'App',
  components: {
    mainPage, // TODO: може перейменувати?
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
