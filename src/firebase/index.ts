// import * as firebase from "firebase/app";
import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyBx2UtmVxKWHhLzJ3NyBLR4azfgViu48vs",
  authDomain: "nails-fed39.firebaseapp.com",
  databaseURL: "https://nails-fed39-default-rtdb.firebaseio.com",
  projectId: "nails-fed39",
  storageBucket: "nails-fed39.appspot.com",
  messagingSenderId: "395625672032",
  appId: "1:395625672032:web:aff8d8ce4ef4913caf4205"
};



const Myapp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export { Myapp }
export const storage = getStorage(Myapp);





