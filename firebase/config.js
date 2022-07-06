
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBc-FiTzSpf2MIWfx4XQ14jY4hImK5dfzU",
    authDomain: "react-native-social-57085.firebaseapp.com",
    projectId: "react-native-social-57085",
    storageBucket: "react-native-social-57085.appspot.com",
    messagingSenderId: "9338173869",
    appId: "1:9338173869:web:2a8af53ea6991e12184924",
    measurementId: "G-1FW7C4SZW2"
  };


  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const storage = getStorage(app);
  export const firestore = getFirestore(app);
