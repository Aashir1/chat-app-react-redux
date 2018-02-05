import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBwhbwxdZcVJKl9THOutpX-hwEhgmENAG4",
  authDomain: "chatapp-975a7.firebaseapp.com",
  databaseURL: "https://chatapp-975a7.firebaseio.com",
  projectId: "chatapp-975a7",
  storageBucket: "chatapp-975a7.appspot.com",
  messagingSenderId: "554486925814"
};
  let dbConfig = firebase.initializeApp(config);

export default dbConfig;