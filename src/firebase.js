// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCBSRYcoWdp6pArrXUKL1vJjIiizrm5J0s",
    authDomain: "instagram-clone-react-88e8c.firebaseapp.com",
    projectId: "instagram-clone-react-88e8c",
    storageBucket: "instagram-clone-react-88e8c.appspot.com",
    messagingSenderId: "991273903100",
    appId: "1:991273903100:web:34711d7649041213344879",
    measurementId: "G-0DG8NTB12F"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage, firebase }