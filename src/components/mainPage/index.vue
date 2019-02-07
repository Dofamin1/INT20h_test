<template>
  <div>
    <div>Whole page</div>
    <emotionFilter></emotionFilter>
    <photo></photo>
  </div>
</template>

<script>
import emotionFilter from "../emotionFilter/index.vue";
import flickrService from "../../api-services/flickrService.js";
import photo from "../photo/index.vue";
export default {
  name: "mainPage",
  data() {
    return {};
  },
  created() {
    (async () => {
      const data = await flickrService.getPhotos();
      console.log(data);
    })();
  },
  components: {
    emotionFilter,
    photo
  }
};
</script>

<style >
</style>
