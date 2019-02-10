<template>
  <div
    horizontal-order="true"
    class="centerAlign"
    fit-width="true"
    v-masonry
    transition-duration="0.3s"
    item-selector=".item"
  >
    <div v-masonry-tile class="item" v-for="photo in paginatedPhotos">
      <photo :key="photo.id" :photo="photo"/>
    </div>
    <div v-if="pageCount > 1">
      <button class="leftFixed" :disabled="pageNumber === 0" @click="prevPage">Previous</button>
      <button class="rigthFixed" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
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
      pageNumber: 0,
      photosPerPage: 10,
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
    paginatedPhotos() {
      const start = this.pageNumber * this.photosPerPage,
        end = start + this.photosPerPage;
      return this.photosToDisplay.slice(start, end);
    },
    pageCount() {
      const photosCount = this.photosToDisplay.length;
      return Math.floor(photosCount / this.photosPerPage);
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
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
};
</script>

<style >
.centerAlign {
  margin: auto;
}
.rigthFixed {
  position: fixed;
  top: 50%;
  right: 30px;
}
.leftFixed {
  position: fixed;
  top: 50%;
  left: 30px;
}
</style>
