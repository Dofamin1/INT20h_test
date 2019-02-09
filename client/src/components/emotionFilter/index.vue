<template>
  <div class="emotionFilterWrapper d-flex justify-content-center">
    <div class="row  col-10">
      <b-form-select
        v-model="selectedEmotion"
        :options="emotions"
        class="mb-3 selectFilter "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmotionFilter',
  data() {
    return {
      selectedEmotion: null,
      emotions: [
        { value: 'anger', text: 'anger' },
        { value: 'disgust', text: 'disgust' },
        { value: 'fear', text: 'fear' },
        { value: 'happiness', text: 'happiness' },
        { value: 'neutral', text: 'neutral' },
        { value: 'sadness', text: 'sadness' },
        { value: 'surprise', text: 'surprise' },
      ],
    };
  },
};
</script>

<style scoped>
.selectFilter:focus, .selectFilter:active{
    outline:0px !important;
    -webkit-appearance:none;
    -webkit-box-shadow: none;
    box-shadow: none;
    /* border: 1px solid black */
}
</style>
