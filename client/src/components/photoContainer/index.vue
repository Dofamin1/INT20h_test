<template>
  <div
    horizontal-order="true"
    class="centerAlign"
    fit-width="true"
    v-masonry
    transition-duration="0.3s"
    item-selector=".item"
  >
    <div v-masonry-tile class="item" v-for="photo in photosToDisplay">
      <photo :key="photo.id" :photo="photo"/>
    </div>
  </div>
</template>

<script>
import photo from './components/photo/index.vue';
import photoService from '../../api/photoService.js';
export default {
  name: 'PhotoContainer',
  components: {
    photo,
  },
  data() {
    return {
      photos: [],
      selectedEmotion: null,
    };
  },
  created() {
    photoService
      .getPhotos()
      .then(this.handleData)
      .catch(this.handleError);
    this.$vueEventBus.$on('change_emotion', this.changeEmotion);
  },
  computed: {
    photosByEmotion() {
      const filterByEmotion = photo =>
        photo.faces.some(face => face.emotion == this.selectedEmotion);
      return this.photos.filter(filterByEmotion);
    },
    photosToDisplay() {
      return this.selectedEmotion ? this.photosByEmotion : this.photos;
    },
  },
  methods: {
    changeEmotion(emotion) {
      this.selectedEmotion = emotion;
      this.$nextTick(() => setTimeout(this.$redrawVueMasonry, 500));
    },
    handleError(e) {
      //TODO:
      window.alert(e);
    },
    handleData({data}) {
      this.photos = data;
    },
  },
};
</script>

<style >
.centerAlign {
  margin: auto;
}
</style>
