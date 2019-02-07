<template>
  <div>
    <div>Whole page</div>
    <emotionFilter />
    <photoContainer />
  </div>
</template>

<script>
import emotionFilter from '../../components/emotionFilter/index.vue';
import photoContainer from '../../components/photoContainer/index.vue';

export default {
  name: 'MainPage',
  components: {
    emotionFilter,
    photoContainer,
  },
};
</script>

<style >
</style>
