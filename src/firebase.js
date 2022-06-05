// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyABdta8k2TmoJoRJqZJJ1G6EtyVkmAueEg",
    authDomain: "goal-3ce57.firebaseapp.com",
    databaseURL: "https://goal-3ce57-default-rtdb.firebaseio.com",
    projectId: "goal-3ce57",
    storageBucket: "goal-3ce57.appspot.com",
    messagingSenderId: "27282659208",
    appId: "1:27282659208:web:403c0eae42290cf94a4c3d",
    measurementId: "G-TVT4J1YQ1J"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage};