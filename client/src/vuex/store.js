import Vuex from 'vuex';
import Vue from 'vue';
import photoService from '../api/photoService.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    photos: [],
    selectedEmotion: null,
    pageNumber: 0,
    photosPerPage: 10,
  },
  mutations: {
    changeEmotion(state, emotion) {
      state.pageNumber = 0;
      state.selectedEmotion = emotion;
      this._vm.$nextTick(() => setTimeout(this._vm.$redrawVueMasonry, 500));
    },
    setPhotos(state, photos) {
      state.photos = photos;
    },
    nextPage(state) {
      state.pageNumber++;
    },
    prevPage(state) {
      state.pageNumber--;
    },
  },
  getters: {
    emotionsList(state) {
      const emotionsList = [{ value: null, text: 'All photos' }];
      state.photos.forEach(({ faces }) => {
        faces.forEach(({ emotion }) => {
          const emotionNotExist = emotion && !emotionsList.find(e => e.value == emotion);
          if (emotionNotExist) emotionsList.push({ value: emotion, text: emotion });
        });
      });
      return emotionsList;
    },
  },
  actions: {
    getPhotos(store) {
      photoService
        .getPhotos()
        .then(({ data }) => store.commit('setPhotos', data))
        .catch(console.error);
    },
  },
});

export default store;
