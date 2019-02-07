<template>
  <div>
    <div>photo container</div>
    <photo></photo>
  </div>
</template>

<script>
import photo from "./components/photo/index.vue";
import flickrService from "../../api-services/flickrService.js";

export default {
  name: "photoContainer",
  components: {
    photo
  },
  created() {
    (async () => {
      const data = await flickrService.getPhotos();
    })();
  }
};
</script>

<style >
</style>