<template>
  <div>
    <div>photo container</div>
    <photo />
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
    flickr.getAllPhotos() // TODO: дописати обробку помилок + сортування повторів фоток
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
      // TODO: зробити функцыю глобальною
      alert(e); // TODO: написати обробку помилок
    },
    handleData(data) {
      const [galleryData, tagData] = [data[0].photos, data[1].photos];
      const rawPhotos = [...galleryData.photo, ...tagData.photo];
      const filteredPhotos = this.removeDuplicates(rawPhotos, 'id');
      this.setData(filteredPhotos);
    },
    setData(photos) {
      this.photos = photos;
    },
  },
};
</script>

<style >
</style>
