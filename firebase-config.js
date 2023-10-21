import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCjYfUvdKnDtcj5M-kjmqjJgXPeaT69HI8",
  authDomain: "hulala-831d2.firebaseapp.com",
  projectId: "hulala-831d2",
  storageBucket: "hulala-831d2.appspot.com",
  messagingSenderId: "706698214032",
  appId: "1:706698214032:web:76d57936c3dd1b5a3bb615"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FBauth = getAuth(app); 
FBauth.setPersistence(
  getReactNativePersistence(AsyncStorage)
);

export { FBauth };