import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FBauth, FBstorage, FBstore } from "../firebase-config";
import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { StorageReference, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Ingredient, Recipe, dietOptions } from "../redux/slices/contentSlice";


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
  // CREATE RECIPE REFERENCE
  const recipeResponse = await recipeUploader(cleanedRecipe, uid);
  if (recipeResponse.error) {
    console.log("Error")
    return recipeResponse
  }
  // GET USER REFERENCE AFTER recipe and add to users recipes
  const userRecipeResponse = await updateUserRecipes(uid, recipeResponse);

  // UPLOAD IMAGES
  const storageRef = ref(FBstorage, 'recipe-id/imageID[index].png') // <<< RECIPE-ID
  // RETURN RESPOMNSE
  const response = userRecipeResponse;
  return response
}


// HELPERS RECIPE
// HELPERS RECIPE
// HELPERS RECIPE
const recipeUploader = async (recipe:Recipe, uid:string) => {
  const recipesRef = collection(FBstore, "recipes");
  try {
    const docResponse = await addDoc(recipesRef, recipe);
    const recipeID = docResponse.id;

    const updateRef = doc(recipesRef, recipeID);
    await setDoc(updateRef, {
      recipeID: recipeID,
      likes: 0,
      userID: uid,
    }, {merge: true})

    return recipeID;

  } catch (e: any) {
    console.error(e);
    return e;
  }
}

const updateUserRecipes = async (uid:string, recipeID:string) => {
  const usersCollectionRef = doc(FBstore, "users", uid);
  try {
    const userDocSnapshot = await updateDoc(usersCollectionRef, {
      userRecipes: arrayUnion(recipeID)
    });
    console.log(userDocSnapshot);
  } catch (e:any) {
    console.error(e);
    return e
  }
  return null
}


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
