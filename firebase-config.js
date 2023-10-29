import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
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
const FBapp = initializeApp(firebaseConfig);
const FBauth = initializeAuth(FBapp, {
  persistence: getReactNativePersistence(AsyncStorage)
}); 
const FBstore = getFirestore(FBapp)
const FBstorage = getStorage(FBapp)
export { FBauth, FBapp, FBstore, FBstorage };