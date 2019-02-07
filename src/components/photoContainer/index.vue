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
  data() {
    return {
      photos: [],
      photosCount: null
    };
  },
  created() {
    flickrService.getAllPhotos(); //TODO: дописати обробку помилок + сортування повторів фоток
    // .then(response => {
    //   response instanceof Error
    //     ? handleError(response)
    //     : this.setData(response);
    // })
    // .catch(e => e);
  },
  methods: {
    handleError(e) {
      //TODO: зробити функцыю глобальною
      alert(e); // TODO: написати обробку помилок
    },
    setData({ photos }) {
      this.photos = photos.photo;
      this.photosCount = photos.total;
    }
  }
};
</script>

<style >
</style>