const firebase = require('firebase');
const config = require('../config').firebase;

firebase.initializeApp(config);

// faceAnalyzer.getPhotosInfo();

const database = firebase.database();
