// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSHONhwKSaYZLz1ks26qxhneig7BkyD0M",
  authDomain: "uploadingfile-1e96a.firebaseapp.com",
  projectId: "uploadingfile-1e96a",
  storageBucket: "uploadingfile-1e96a.appspot.com",
  messagingSenderId: "174066669566",
  appId: "1:174066669566:web:d109b55c964be5d4fc12af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
