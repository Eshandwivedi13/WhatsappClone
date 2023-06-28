// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7cZflaVlUN009TLndx-z9fgAo5o-GgxY",
  authDomain: "whatsappclone-e3e4b.firebaseapp.com",
  projectId: "whatsappclone-e3e4b",
  storageBucket: "whatsappclone-e3e4b.appspot.com",
  messagingSenderId: "1027414093254",
  appId: "1:1027414093254:web:8468c05065706bd40296c7",
  measurementId: "G-V09CH20TP6",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
export default db;
