import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBWgQ7m6GE1AF6DvFKEY5VNprtxP7m6I7U",
  authDomain: "house-guru-b1e57.firebaseapp.com",
  projectId: "house-guru-b1e57",
  storageBucket: "house-guru-b1e57.appspot.com",
  messagingSenderId: "785553569160",
  appId: "1:785553569160:web:4a569a19b1d09e6440b63d",
  measurementId: "G-M9YBWMB9G9"
};


const myApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export { myApp };
export const storage = getStorage(myApp);
export const firestore = getFirestore(myApp);
