// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU4gXCO1B_MtFuyu7Ti9UX-1RM1G1cDns",
  authDomain: "projeto-ihc-792db.firebaseapp.com",
  projectId: "projeto-ihc-792db",
  storageBucket: "projeto-ihc-792db.firebasestorage.app",
  messagingSenderId: "443565127305",
  appId: "1:443565127305:web:30907dd1c8a63c0e13f858",
  measurementId: "G-TRS49LVGQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
