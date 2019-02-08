<template>
  <div>
    <div class="photoContainer">
      <div class="photoRaw">
        <div
          v-for="colNum in columnsNumber"
          :key="colNum"
          class="photoColumn"
        >
          <photo
            v-for="photo in photoColumn(colNum)"
            :key="photo.id"
            :photo="photo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import photo from './components/photo/index.vue';
import flickr from '../../api/flickr';
import helpers from '../../helpers/helpers';

export default {
  name: 'PhotoContainer',
  components: {
    photo,
  },
  data() {
    return {
      photos: [],
      columnsNumber: 5,
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
    photoColumn(column) {
      return helpers.arrayColumn(this.photos, column, this.columnsNumber);
    },
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

<style scoped>
.photoRaw {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

.photoColumn {
  flex: 20%;
  max-width: 20%;
  padding: 0 4px;
}


@media screen and (max-width: 800px) {
  .photoColumn {
    flex: 50%;
    max-width: 50%;
  }
}

@media screen and (max-width: 600px) {
  .photoColumn {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
