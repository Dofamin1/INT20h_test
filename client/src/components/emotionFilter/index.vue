<template>
  <div class="d-flex justify-content-center mt-4 mb-4">
    <div class="col-8">
      <b-form-select v-model="emotion" :options="emotionsList" class="selectFilter" size="xl"/>
    </div>
  </div>
</template>

<script>
const emotionsList = [
  {value: 'anger', text: 'anger'},
  {value: 'disgust', text: 'disgust'},
  {value: 'fear', text: 'fear'},
  {value: 'happiness', text: 'happiness'},
  {value: 'neutral', text: 'neutral'},
  {value: 'sadness', text: 'sadness'},
  {value: 'surprise', text: 'surprise'},
  {value: null, text: 'all photos'},
];
import {mapState, mapMutations} from 'vuex';
export default {
  name: 'EmotionFilter',
  computed: {
    ...mapState({selectedEmotion: state => state.selectedEmotion}),
    emotionsList: () => emotionsList,
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
