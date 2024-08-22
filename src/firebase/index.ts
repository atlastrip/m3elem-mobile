import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAJ2LzirZ_7gEl3FCMrxeJPydDBWJ-K9BU",
  authDomain: "atlastrip-a59f2.firebaseapp.com",
  databaseURL: "https://atlastrip-a59f2-default-rtdb.firebaseio.com",
  projectId: "atlastrip-a59f2",
  storageBucket: "atlastrip-a59f2.appspot.com",
  messagingSenderId: "296271851611",
  appId: "1:296271851611:web:12cfb7a0a59e98fe344f7e",
  measurementId: "G-Y23ZJ2C8Q5"
};

const myApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export { myApp };
export const storage = getStorage(myApp);
export const firestore = getFirestore(myApp);
