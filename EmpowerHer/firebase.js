// Import the functions you need from the Firebase SDKs
import firebase from 'firebase/compat/app'; // Import firebase from compat/app
import 'firebase/compat/firestore'; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgEPwaAbqHK6jQaBmpqZMnbxwd1tyRBFc",
  authDomain: "chat-empowerher.firebaseapp.com",
  projectId: "chat-empowerher",
  storageBucket: "chat-empowerher.appspot.com",
  messagingSenderId: "756856534803",
  appId: "1:756856534803:web:c867f3f61dd93e2cd88ce6"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// Export firebase instance
export const db = firebase.firestore();

export default firebase;
