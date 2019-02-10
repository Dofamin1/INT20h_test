import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex); // TODO: name

const store = new Vuex.Store({
  state: {
    photos: [],
    emotions: [],
    selectedEmotion: null,
  },
  mutations: {},
  getters: {},
  actions: {},
});

export default store;
