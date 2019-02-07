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
      .catch(e => console.error(e));
  },
  methods: {
    removeDuplicates({ array, prop }) {
      // TODO: move to helpers folder
      return array.filter(
        (obj, pos, arr) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos,
      );
    },
    handleError(e) {
      // TODO: global error handler
      window.alert(e);
    },
    handleData(data) {
      const reducer = (accumulator, currentValue) => [
        ...accumulator,
        ...currentValue.photos.photo,
      ];
      const allPhotos = data.reduce(reducer, []);
      const photosWithoutDublicates = this.removeDuplicates({
        array: allPhotos,
        prop: 'id',
      });
      this.photos = photosWithoutDublicates;
    },
  },
};
</script>

<style >
</style>
