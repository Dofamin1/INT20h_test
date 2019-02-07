<template>
  <div>
    <div>photo container</div>
    <div class="photos">
      <photo
        v-for="{id, farm, server, secret, title, url_o} in photos"
        :key="id"
        :photo-id="id.toString()"
        :farm="farm.toString()"
        :server="server.toString()"
        :secret="secret.toString()"
        :title="title.toString()"
        :url-original="url_o ? url_o.toString(): ''"
      />
      <!-- propery.toString() - because Flicr could return the same `property` with different types
      in different objects. -->
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
      photos: [], // TODO: should be renamed in `photoObjects` ?
    };
  },
  created() {
    flickr.getAllPhotos()
      .then(response => (response instanceof Error
        ? this.handleError(response)
        : this.handleData(response)))
      .catch(e => e);
  },
  methods: {
    removeDuplicates(array, prop) {
      return array.filter((obj, pos, arr) => (
        arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos));
    },
    handleError(e) {
      // TODO: global error handler
      window.alert(e);
    },
    handleData(data) {
      console.log(data);
      const [galleryData, tagData] = [data[0].photos, data[1].photos];
      const rawPhotos = [...galleryData.photo, ...tagData.photo];
      const filteredPhotos = this.removeDuplicates(rawPhotos, 'id');
      this.setData(filteredPhotos);
    },
    setData(photos) {
      console.log(photos);
      this.photos = photos;
    },
  },
};
</script>

<style >
</style>
