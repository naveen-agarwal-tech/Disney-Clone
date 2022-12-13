import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDNVkRY6BMYCPWfEt6rzLa1adddV20B7j8",
  authDomain: "disney-clone-3089d.firebaseapp.com",
  projectId: "disney-clone-3089d",
  storageBucket: "disney-clone-3089d.appspot.com",
  messagingSenderId: "793529415252",
  appId: "1:793529415252:web:d427bce91542c01c911fc1",
  measurementId: "G-FVKLN2ZSP7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
