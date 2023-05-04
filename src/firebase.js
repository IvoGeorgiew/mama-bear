import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrCpo5n_QXdDnTXe6dpNBOW5Y0EPGHERw",
  authDomain: "mama-bear-f2653.firebaseapp.com",
  projectId: "mama-bear-f2653",
  storageBucket: "mama-bear-f2653.appspot.com",
  messagingSenderId: "684837688363",
  appId: "1:684837688363:web:1b445bdb7e06bfbeb0c66e",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
export { firebase, db, storage };
