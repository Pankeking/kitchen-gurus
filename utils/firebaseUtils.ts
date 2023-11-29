import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FBauth, FBstorage, FBstore } from "../firebase-config";
import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import { StorageReference, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Ingredient, Photo, Recipe, dietOptions } from "../redux/slices/contentSlice";


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
  // Get default picture for anonymous from cloud storage
  const storageRef = ref(FBstorage, 'user-profiles/anonymous-user.png');
  const defaultPic = await getDownloadURL(storageRef)
  // Declare userData type and values  
  const userData: {
    userID: string;
    username: string;
    email: string;
    bio: string;
    lastLogin: Date;
    profilePicture?: string; // Make it optional
    profileBackground?: string; // Make it optional
  } = {
    userID: uid,
    username: username,
    email: email,
    bio: "Write bio...",
    lastLogin: new Date()
  };
  if (defaultPic != null) {
    userData.profilePicture = defaultPic;
    userData.profileBackground = defaultPic;
  }
  // Get users collection ref
  const usersCollectionRef = collection(FBstore, "users")
  try {
    // Create a new user document with docID as uid -- "users" reference
    const userDocRef = doc(usersCollectionRef, uid);
    // Set data in referenced doc
    await setDoc(userDocRef, userData)
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

// SEND RECIPE
// SEND RECIPE
// SEND RECIPE
export const uploadRecipe = async (uid: string, recipe:Recipe) => {

  const cleanedRecipe = cleanRecipe(recipe);
  // Get recipes collection add cleaned Recipe
  const recipesRef = collection(FBstore, "recipes");
  const recipeDocResp = await addDoc(recipesRef, cleanedRecipe);
  // Get added recipe ID and update itself with reference for future use
  const recipeID = recipeDocResp.id;
  const updateRef = doc(recipesRef, recipeID);
  await setDoc(updateRef, {
    recipeID: recipeID,
    likes: 0,
    userID: uid
  }, {merge: true})
  
  const photosArray:Photo[] = cleanedRecipe.photo;
  
  // Upload every picture to FB storage
  for (let i = 0; i < photosArray.length; i++) {
    const storageRef = ref(FBstorage, `recipes/${recipeID}/photo-${i}.jpg`);
    const response = await fetch(photosArray[i].uri)
    const imageBlob = await response.blob();
    pictureUploadHelper(storageRef, imageBlob, async (downloadURL) => {
      if (!downloadURL) {
        console.error("Error uploading image");
        alert("Photo upload failed");
      }
      // Update on the spot the Recipe.Photos array
      await updateDoc(doc(FBstore, "recipes", recipeID), {
        photosRef: arrayUnion(downloadURL)
      })
    });
  }
  
  const usersCollectionRef = doc(FBstore, "users", uid);
  await updateDoc(usersCollectionRef, {
    userRecipes: arrayUnion(recipeID)
  })
  
  // 
  // GET USER REFERENCE AFTER recipe and add to users recipes

  // UPLOAD IMAGES
  return recipeID;
}


// HELPERS RECIPE
// HELPERS RECIPE
// HELPERS RECIPE


const cleanRecipe = (recipe:Recipe) => {
  // const filteredIngredients: Ingredient
  const filteredRecipe: Recipe = {
    ...recipe,
    ingredients: recipe.ingredients.slice(1).filter(
      (ingredient) => ingredient.quantity != 0
    ),
    extra: Object.fromEntries(
      Object.entries(recipe.extra).filter(([key,value])=> value.selected)
    ),
    instructions: recipe.instructions.slice(1)
  }
  return filteredRecipe;
}
