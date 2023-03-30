// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZqoFTRNaq0JCLfD9bNrAG_R6NdY7rFqA",
  authDomain: "e-zakat-89380.firebaseapp.com",
  projectId: "e-zakat-89380",
  storageBucket: "e-zakat-89380.appspot.com",
  messagingSenderId: "749401339026",
  appId: "1:749401339026:web:096bf18b283dbfc2c4624b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
