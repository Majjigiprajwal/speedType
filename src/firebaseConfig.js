import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBSRFMxEBZNOe2aZjOH_pyo9xuUO54XtwI",
    authDomain: "typing-test-65ac9.firebaseapp.com",
    projectId: "typing-test-65ac9",
    storageBucket: "typing-test-65ac9.appspot.com",
    messagingSenderId: "216948010993",
    appId: "1:216948010993:web:a506c372f6dc5e7cb7de50",
    measurementId: "G-ERG0XGW3SD"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebaseApp.firestore();

export {auth, db};