<template>
  <div class="photo">
    <div>{{ photoId }}</div>
    <div>{{ title }}</div>
    <a :href="`${urlOriginal ? urlOriginal : ''}`">
      <img
        :src="`https://farm${farm}.staticflickr.com/${server}/${photoId}_${secret}.jpg`"
        :alt="title"
      >
    </a>
  </div>
</template>

<script>
export default {
  name: 'Photo',
  props: {
    photoId: { type: String, default: '' },
    farm: { type: String, default: '' },
    server: { type: String, default: '' },
    secret: { type: String, default: '' },
    title: { type: String, default: '' },
    urlOriginal: { type: String, default: '' },
  },
};
</script>

<style >
</style>
