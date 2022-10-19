import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRNPAW4pBItads01Qv4pvaSz8Ox7Bn3Fk",
  authDomain: "store-delivery-bro.firebaseapp.com",
  databaseURL: "https://store-delivery-bro-default-rtdb.firebaseio.com",
  projectId: "store-delivery-bro",
  storageBucket: "store-delivery-bro.appspot.com",
  messagingSenderId: "276006404396",
  appId: "1:276006404396:web:96d49723693ff63bd5ac89",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

//const app = firebase.initializeApp(firebaseConfig);
//export const db = getFirestore(app);
