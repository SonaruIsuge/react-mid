import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZBDvlIcx0wXS6rG9xWbcKn_hCeONh-Jo",
    authDomain: "react-mid-d3767.firebaseapp.com",
    databaseURL: "https://react-mid-d3767-default-rtdb.firebaseio.com/",
    projectId: "react-mid-d3767",
    storageBucket: "react-mid-d3767.appspot.com",
    messagingSenderId: "484613337259",
    appId: "1:484613337259:web:3b4808fdbb7067f2e587ee",
    measurementId: "G-TK68LTQ3DW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const storeData = (imgData) => {
    let db = firebase.database();
    db.ref("uploadImage").set(imgData);
}

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};