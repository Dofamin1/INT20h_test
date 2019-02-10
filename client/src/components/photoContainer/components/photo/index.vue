<template>
  <div class="photo">
    <img v-img :src="url" :alt="'Фото не завантажилось'">
  </div>
</template>

<script>
export default {
  name: 'Photo',
  props: {
    url: {
      required: true,
      type: String,
    },
  },
};
</script>

<style>
.photo {
  margin: 10px;
}
</style>
