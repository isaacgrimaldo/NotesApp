import  firebase from 'firebase/app';
import 'firebase/firestore'
import  'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCyhrSxhAXteMuo2qhrsi49-0DENfOuFgw",
    authDomain: "fir-react-37382.firebaseapp.com",
    databaseURL: "https://fir-react-37382-default-rtdb.firebaseio.com",
    projectId: "fir-react-37382",
    storageBucket: "fir-react-37382.appspot.com",
    messagingSenderId: "1085112619360",
    appId: "1:1085112619360:web:817208f1d4228c02c84e05",
    measurementId: "G-GB441M2R9W"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 //para grabar informacion 
 const db = firebase.firestore();
 //para la untentificacion con googel
 const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


 //para usarlos en la app
 export {
     db,
     googleAuthProvider,
     firebase,
 }


