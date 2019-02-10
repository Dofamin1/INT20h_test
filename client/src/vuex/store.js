import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex); // TODO: name

const store = new Vuex.Store({
  state: {
    photos: [],
    emotions: [],
    selectedEmotion: null,
  },
  mutations: {
    changeEmotion(state, emotion) {
      state.selectedEmotion = emotion;
      this._vm.$nextTick(() => setTimeout(this._vm.$redrawVueMasonry, 500));
    },
  },
  getters: {},
  actions: {},
});

export default store;
