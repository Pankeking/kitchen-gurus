import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FBauth, FBstore } from "../firebase-config";
import { collection } from "firebase/firestore";


export const appSignUp = async (email: string, password: string, displayName: string) => {
  try {
    // This will trigger onAuthStateChange to update the store
    const resp = await createUserWithEmailAndPassword(FBauth, email, password);
    // Add display name
    await updateProfile(resp?.user, {displayName});
    return { user: FBauth.currentUser };
  } catch (e) {
    console.error(e);
    return { error: e};
  }
}

export const registerUserDB = async (uid: string, username: string, email: string) => {
  const usersCollectionRef = collection(FBstore, "users")
  try {
    // Create a new user document in "users" collection
    
  } catch (e) {
    return
  }
}
