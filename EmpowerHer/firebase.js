import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAm73Z7bcmhYHQN0OOqC7BHZYAi_GbNuUM",
  authDomain: "empowerher-239f6.firebaseapp.com",
  projectId: "empowerher-239f6",
  storageBucket: "empowerher-239f6.appspot.com",
  messagingSenderId: "469916600273",
  appId: "1:469916600273:web:e2ad16fbd2bd0fd15242f0",
  measurementId: "G-1W3XY0VE4Y"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const db = firebase.firestore();
  export { db };