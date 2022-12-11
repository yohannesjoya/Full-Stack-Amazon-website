// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth , onAuthStateChanged} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBBya4stDmLsD5Bq5qKCIhu1OWYOzIDqs8",
  authDomain: "clone-44b3b.firebaseapp.com",
  projectId: "clone-44b3b",
  storageBucket: "clone-44b3b.appspot.com",
  messagingSenderId: "578263007988",
  appId: "1:578263007988:web:70c2b18d2fb712665a94a1",
  measurementId: "G-F0QHHWRWDM",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);
 
export {auth,db,analytics }