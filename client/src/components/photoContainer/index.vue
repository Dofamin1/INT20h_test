<template>
  <div>
    <div>photo container</div>
    <div class="photos">
      <photo
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
      />
    </div>
  </div>
</template>

<script>
import photo from './components/photo/index.vue';
import flickr from '../../api/flickr';

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
    flickr
      .getAllPhotos()
      .then(response => (response instanceof Error
        ? this.handleError(response)
        : this.handleData(response)))
      .catch(e => this.handleError(e));
  },
  methods: {
    handleError(e) {
      // TODO: global error handler
      window.alert(e);
    },
    handleData(data) {
      this.photos = data;
    },
  },
};
</script>

<style >
</style>
