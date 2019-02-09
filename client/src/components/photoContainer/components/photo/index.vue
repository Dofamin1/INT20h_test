<template>
  <div class="photo">
    <img
      :src="photo.url"
      :alt="'Фото не завантажилось'"
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
};
</script>

<style>
 .photo{
   margin: 10px;
  }
</style>
