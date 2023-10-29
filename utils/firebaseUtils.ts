import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FBauth, FBstorage, FBstore } from "../firebase-config";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { StorageReference, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";


// Register
// Register
// Register
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
// Register
// Register
// Register
export const registerUserDB = async (uid: string, username: string, email: string) => {
  // Get users collection ref
  const usersCollectionRef = collection(FBstore, "users")
  try {
    // Create a new user document with docID as uid -- "users" reference
    const userDocRef = doc(usersCollectionRef, uid);
    // Set data in referenced doc
    await setDoc(userDocRef, {
      userID: uid,
      username: username,
      email: email,
      bio: "Write bio...",
    })
  } catch (e:any) {
    const code = e?.code;
    const name = e?.name;
    return { code:code, name:name };
  }
  return uid;
}

// PROFILE PICTURES
// PROFILE PICTURES
// PROFILE PICTURES
export const updateProfilePicture = async (userId: string, localUri: string) => {
  try {
    // Create reference to storage location
    const storageRef = ref(FBstorage, `user-profiles/${userId}-profile.jpg`);
    // Fetch image -> convert to binary
    const response = await fetch(localUri)
    const imageBlob = await response.blob();
    // See callback function
    pictureUploadHelper(storageRef, imageBlob, (downloadURL) => {
      if (downloadURL) {
        // Update user profilePicture
        const userDocRef = doc(FBstore, "users", userId)
        updateDoc(userDocRef, {
            profilePicture: downloadURL
        })
      } else {
        console.error('Error uploading image and updating Firestore:');
      }
    });
  } catch (e) {
    console.error('Error uploading image and updating Firestore:', e);
  }
} 

// PROFILE PICTURES
// PROFILE PICTURES
// PROFILE PICTURES
export const updateProfileBackground = async (userId: string, localUri: string) => {
  try {
    // Create reference to storage location
    const storageRef = ref(FBstorage, `user-profiles/${userId}-background.jpg`);
    // Fetch image -> convert to binary
    const response = await fetch(localUri)
    const imageBlob = await response.blob();
    // See callback function
    pictureUploadHelper(storageRef, imageBlob, (downloadURL) => {
      if (downloadURL) {
        // Update user profileBackground
        const userDocRef = doc(FBstore, "users", userId)
        updateDoc(userDocRef, {
          profileBackground: downloadURL
        })
      } else {
        console.error('Error uploading image and updating Firestore:');
      }
    });
  } catch (e) {
    console.error('Error uploading image and updating Firestore:', e);
  }
} 
/// PICTURE UPLOAD UTIL
/// PICTURE UPLOAD UTIL
/// PICTURE UPLOAD UTIL
const pictureUploadHelper = async (ref: StorageReference, blob: Blob, callback: (downloadURL: string | null) => void) => {
  // Upload Image Blob
  const uploadTask = uploadBytesResumable(ref, blob);
  uploadTask.on("state_changed", (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
    switch (snapshot.state) {
      case "paused":
        console.log("Upload is paused");
        break;
      case "running":
        console.log("Upload is running");
        break;
    }
  }, (error) => {
    switch (error.code) {
      case "storage/unauthroized":
        console.log("User doesn't have permission to access the object");
        callback(null); // return null in case of error
        break;
      case "storage/canceled":
        console.log("User canceled the upload");
        callback(null); // return null in case of error
        break;
      case "storage/unknown":
        console.log("Unknown error occurred, inspect error.serverResponse");
        callback(null); // return null in case of error
        break;
    }
  }, async () => {
    // Get downloadURL for reference
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    callback(downloadURL);
  })
}