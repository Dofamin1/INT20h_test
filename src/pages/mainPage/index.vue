<template>
  <div>
    <div>Whole page</div>
    <emotionFilter></emotionFilter>
    <photoContainer></photoContainer>
  </div>
</template>

<script>
import emotionFilter from "../../components/emotionFilter/index.vue";
import photoContainer from "../../components/photoContainer/index.vue";

export default {
  name: "mainPage",
  components: {
    emotionFilter,
    photoContainer
  }
};
</script>

<style >
</style>
