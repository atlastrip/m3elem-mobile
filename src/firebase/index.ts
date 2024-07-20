import { initializeApp } from "firebase/app";
import  * as firebase from "firebase/app";
import { getAuth, GoogleAuthProvider  , signInWithPopup,



} from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDUbj9cox4PaR85IU4BqWTM4-kRbG34B5w",
  appId: "1:595961874472:android:4c11e2aea41e2e876bcd1d",
  messagingSenderId: "595961874472",
  authDomain: "pantofit-4d0f9.firebaseapp.com",
  projectId: "pantofit-4d0f9",
  storageBucket: "pantofit-4d0f9.appspot.com",
  measurementId: "G-GW6WESW19X"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// const appleProvider = new firebase.auth.OAuthProvider('apple.com');
export const SignInWithPopup = signInWithPopup(auth , provider);
// export const Firebase = firebase