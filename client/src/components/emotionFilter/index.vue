<template>
  <div class="d-flex justify-content-center mt-4 mb-4">
    <div class="col-8">
      <b-form-select v-model="emotion" :options="emotionsList" class="selectFilter" size="xl"/>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex';
export default {
  name: 'EmotionFilter',
  computed: {
    ...mapGetters(['emotionsList']),
    ...mapState({selectedEmotion: state => state.selectedEmotion}),
    emotion: {
      get() {
        return this.selectedEmotion;
      },
      set(emotion) {
        this.changeEmotion(emotion);
      },
    },
  },
  methods: {
    ...mapMutations(['changeEmotion']),
  },
};
</script>

<style scoped>
.selectFilter:focus,
.selectFilter:active {
  outline: 0px !important;
  -webkit-appearance: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  /* border: 1px solid black */
}
</style>
