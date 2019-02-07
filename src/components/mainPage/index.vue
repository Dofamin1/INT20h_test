<template>
  <div>
    <div>Whole page</div>
    <emotionFilter></emotionFilter>
    <photo></photo>
  </div>
</template>

<script>
import emotionFilter from "../emotionFilter/index.vue";
import photo from "../photo/index.vue";
export default {
  name: "mainPage",
  components: {
    emotionFilter,
    photo
  }
};
</script>

<style >
</style>
