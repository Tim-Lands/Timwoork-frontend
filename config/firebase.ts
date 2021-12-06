// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig: any = {
  apiKey: "AIzaSyC1omJjeXKXIjpWqamWXiOmYJL0z8PzUV4",
  authDomain: "verify-number-c1859.firebaseapp.com",
  projectId: "verify-number-c1859",
  storageBucket: "verify-number-c1859.appspot.com",
  messagingSenderId: "128349608951",
  appId: "1:128349608951:web:5e551358841e20f26eecf2"
};

// Initialize Firebase
export default function initFirebase() {
  if (!firebase.getApps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}