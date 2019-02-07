<template>
  <div class="photo">
    <div>{{ photo.title }}</div>
    <img
      :src="src"
      :alt="photo.title"
    >
  </div>
</template>

<script>
export default {
  name: 'Photo',
  props: {
    photo: {
      required: true,
      type: Object,
    },
  },
  computed: {
    src() {
      const {
        farm, server, id, secret,
      } = this.photo;
      return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    },
  },
};
</script>

<style >
</style>
