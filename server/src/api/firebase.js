const firebase = require('firebase');
const faceAnalyzer = require('./facepp.js');
const config = require('../config').firebase;

firebase.initializeApp(config);

// faceAnalyzer.getPhotosInfo();

const database = firebase.database();
