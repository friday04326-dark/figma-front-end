// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKhX-HeDirFhURHOAf3k-QjZMTHZjcbNU",
  authDomain: "cctv-mvp.firebaseapp.com",
  projectId: "cctv-mvp",
  storageBucket: "cctv-mvp.firebasestorage.app",
  messagingSenderId: "1031785979718",
  appId: "1:1031785979718:web:1ad8e30ce1f6872a16cf47",
  measurementId: "G-9VF0Q6HEHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
