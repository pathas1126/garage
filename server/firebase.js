const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyD4H44vbGtFX-4PK3vRLsO7lN446GYapDA",
  authDomain: "garage-bca8e.firebaseapp.com",
  databaseURL: "https://garage-bca8e.firebaseio.com",
  projectId: "garage-bca8e",
  storageBucket: "garage-bca8e.appspot.com",
  messagingSenderId: "388354998581",
  appId: "1:388354998581:web:4d2f737c735569868a0c7c",
  measurementId: "G-8M4YHM1D2V",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

module.exports = firestore;
