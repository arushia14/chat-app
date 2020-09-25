// import firebase from "firebase/app";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBAbqYc5R0LzQ3Gts20h6e0ydyWcE4imW0",
  authDomain: "fb-messenger-clone-98.firebaseapp.com",
  databaseURL: "https://fb-messenger-clone-98.firebaseio.com",
  projectId: "fb-messenger-clone-98",
  storageBucket: "fb-messenger-clone-98.appspot.com",
  messagingSenderId: "1051892680804",
  appId: "1:1051892680804:web:8e931aea277a174eaaf771",
  measurementId: "G-4J0GTZMCKH",
});

const db = firebaseApp.firestore();

export default db;
