import firebase from "firebase";
const config = {
  apiKey: "AIzaSyBrS-5hnPHKAzZhIbjv52j2nNYZLi9HDn4",
  authDomain: "int20h-c53da.firebaseapp.com",
  databaseURL: "https://int20h-c53da.firebaseio.com",
  storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

const database = firebase.database();
