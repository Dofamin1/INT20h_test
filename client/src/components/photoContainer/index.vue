<template>
      <div  horizontal-order="true" class="centerAlign" fit-width="true"  v-masonry transition-duration="0.3s" item-selector=".item">
        <div v-masonry-tile class="item" v-for="photo in photos">
          <photo
              :key="photo.id"
              :photo="photo"
            />
        </div>
      </div>
</template>

<script>
import photo from './components/photo/index.vue';
import photoService from "../../api/photoService.js"

export default {
  name: 'PhotoContainer',
  components: {
    photo,
  },
  data() {
    return {
      photos: [],
    };
  },
  created() {
    photoService.getPhotos()
     .then(this.handleData)
     .catch(this.handleError);
  },
  methods: {
    handleError(e) {
      window.alert(e);
    },
    handleData({data}) {
      this.photos = data;
    },
  },
};
</script>

<style >
.centerAlign{
  margin: auto
} 
</style>
