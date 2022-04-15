import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCylKxD3istHAlsI0UGnoOBkB30fe4Jn0c",
    authDomain: "netflix-clone-9be39.firebaseapp.com",
    projectId: "netflix-clone-9be39",
    storageBucket: "netflix-clone-9be39.appspot.com",
    messagingSenderId: "293482267251",
    appId: "1:293482267251:web:dee676503b19159388a006",
    measurementId: "G-YYE118XK79"
};

const app = !firebase.apps.length
? firebase.initializeApp(firebaseConfig)
: firebase.app();

const db = app.firestore();
const auth = firebase.auth();

export { auth };
export default db;