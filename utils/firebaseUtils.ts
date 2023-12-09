import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FBauth, FBstorage, FBstore } from "../firebase-config";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, increment, setDoc, updateDoc, writeBatch } from "firebase/firestore";
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
  // Get User data --> picture & name
  const userDocSnap = await getDoc(doc(FBstore, "users", uid))
  if (!userDocSnap.exists()) {
    alert("Error uploading, please try again")
    console.error("Error fetching user profile picture")
    return
  }
  const userProfilePicture = userDocSnap.data().profilePicture;
  const username = userDocSnap.data().username;
  // Remove falsys from recipe
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
    userID: uid,
    username: username,
    profilePicture: userProfilePicture
  }, {merge: true})
  
  const photosArray:Photo[] = recipe.photo;
  // Add to user -> userRecipes collection (firebase de-normalization)
  const userRecipesCollection = collection(FBstore, "users", uid, "userRecipes");
  const userRecipesDoc = doc(userRecipesCollection, recipeID);
  const userRecipeData = {
    recipeName: cleanedRecipe.name,
    recipeID: recipeID,
    vegan: cleanedRecipe.extra.hasOwnProperty("Vegan") && cleanedRecipe.extra["Vegan"].selected
  }
  await setDoc(userRecipesDoc, userRecipeData)
  
  // Upload every picture to FB storage
  for (let i = 0; i < photosArray.length; i++) {
    const storageRef = ref(FBstorage, `recipes/${recipeID}/photo-${i}.jpg`);
    const response = await fetch(photosArray[i].uri)
    const imageBlob = await response.blob();
    pictureUploadHelper(storageRef, imageBlob, async (downloadURL) => {
      if (!downloadURL) {
        console.error("Error uploading image");
        alert("Photo upload failed");
        return
      }
      if (i == 0) {
        await updateDoc(userRecipesDoc, {
          mainPhoto: downloadURL
        })
      }
      // Update on the spot the Recipe.Photos array
      await updateDoc(doc(FBstore, "recipes", recipeID), {
        photo: arrayUnion(downloadURL)
      })
    });
  }
 
  return recipeID;
}


///////
///////
/////// userFunction router.push(`/(content)/(user)/${item.username}?uid=${item.uid}`)
///////


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
    instructions: recipe.instructions.slice(1),
    photo: []
  }
  return filteredRecipe;
}

// HELPER FETCHING RECIPES <<< HOME
// HELPER FETCHING RECIPES <<< HOME
// HELPER FETCHING RECIPES <<< HOME
export const fetchAllRecipes = async (currentUser:string) => {
  try {
      const recipesQuerySnap = await getDocs(collection(FBstore, "recipes"))
      let Recipes = [{
        uid: "",
        recipeName: "",
        recipeID: "",
        likes: 0,
        username: "",
        profilePic: "",
        photo: [""],
        liked: false,
      }]
      recipesQuerySnap.forEach(async (docu) => {
        const uid = docu.data().userID;
        const recipeName = docu.data().name;
        const likes = docu.data().likes;  
        const recipeID = docu.data().recipeID;
        const username = docu.data().username;

        // DEV <<<
        // const profilePic = docu.data().profilePicture; 
        const profilePic = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.imgur.com%2F4pigoji.jpg&f=1&nofb=1&ipt=0ca9831f18d43132974d0574f6931d9810136cdf5c615d1c025bd23bb2654cbe&ipo=images"
        // DEV <<<
        // const mainPhoto = docu.data().photo;
        const mainPhoto = ["https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.plannthat.com%2Fwp-content%2Fuploads%2F2018%2F07%2F25-Stock-Photo-Sites.jpeg&f=1&nofb=1&ipt=825acb3b9caa343c74ee234ab2826dcee6ee660dc52eabcc222524d44cec8d2b&ipo=images","https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.ikozmik.com%2FContent%2FImages%2Fuploaded%2Fits-free-featured.jpg&f=1&nofb=1&ipt=0b3505ecb8a4dab33ec69e8656cb8e83c25dc0b7d9da9aeded5d1d058446feb6&ipo=images"]
        // DEV <<<
        const likedBy = await recipeLikedBy(currentUser, recipeID);
        
        const recipes = {
          uid:uid,
          recipeName: recipeName,
          recipeID: recipeID,
          likes: likes,
          username: username,
          profilePic: profilePic,
          photo: mainPhoto,
          liked: likedBy
        }
        Recipes.push(recipes)
      })
      Recipes.shift()
      return Recipes;
  } catch (e) {
      console.error(e)
      return [{
        uid: "",
        recipeName: "",
        recipeID: "",
        likes: 0,
        username: "",
        profilePic: "",
        photo: [""],
        liked: false,
      }]
  }
}


// HELPER LIKED BY 
export const recipeLikedBy = async (uid: string, recipeID: string) => {
  const likedByRef = collection(FBstore, "recipes", recipeID, "likedBy");
  const likedSnap = await getDoc(doc(likedByRef, uid));
  if (!likedSnap.exists()) {
    return false;
  }
  return likedSnap.data().liked;
}

// HELPER FETCHING FRIENDS <<< HOME

export const fetchFriends = async (uid: string) => {
  try {
      const userFollowingSnap = await getDocs(collection(FBstore, "users", uid, "following"))
      let users = [{
        uid: "",
        username: "",
        pic: "",
      }]
      userFollowingSnap.forEach(async (docu) => {
        const uid = docu.data().userID;
        const username = docu.data().username;
        const pic = docu.data().picture;
        const user = {
          uid: uid,
          username: username,
          pic: pic,
        }
        users.push(user)
      })
      users = users.slice(1)
      return [...users, ...users,...users,...users];
  } catch (e) {
      console.error(e)
      return [{
        uid: "",
        username: "",
        pic: "",
      }]
  }
}

export const likeRecipe = async (uid: string, recipeID: string, username: string) => {
  // This could use a Shard/distributed counter || FIREBASE
  // return 0 = false
  // return 1 = true
  // return -1 = error
  try {
    const likesDoc = doc(FBstore, "recipes", recipeID);
    const likedByRef = collection(FBstore, "recipes", recipeID, "likedBy")
    const likedByDoc = doc(likedByRef, uid);
    const docuSnap = await getDoc(likedByDoc);
    // Set liked by user and default to true
    if (!docuSnap.exists()) {
      const userLikeData = {
        liked: true,
        uid: uid,
        username: username
      }
      await setDoc(likedByDoc, userLikeData)
      // Add 1 like to counter
      await updateDoc(likesDoc, {
        likes: increment(1)
      })
      return 1;
    }
    const likeStatus:boolean = docuSnap.data().liked;
    await setDoc(likedByDoc, {
      liked: !likeStatus
    }, {merge: true})
    // Add or remove 1 like to counter
    await updateDoc(likesDoc, {
      likes: increment(!likeStatus ? 1 : -1)
    })
    return !likeStatus ? 1 : 0;
    
  } catch (e) {
    console.error(e);
    return -1;
  }
}

export const queryUserRecipes = async (queryUserID: string) => {
  try {
    const userQSnap = await getDocs(collection(FBstore, "users", queryUserID, "userRecipes"));
    let minimizedRecipes = [{
      mainPhoto: "",
      recipeID: "",
      recipeName: "",
      vegan: false,
    }]
    userQSnap.forEach((docu) => {
      // DEV PHOTO -- NO API USAGE
      // const mainPhoto = docu.data().mainPhoto;
      const mainPhoto = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.ikozmik.com%2FContent%2FImages%2Fuploaded%2Fits-free-featured.jpg&f=1&nofb=1&ipt=0b3505ecb8a4dab33ec69e8656cb8e83c25dc0b7d9da9aeded5d1d058446feb6&ipo=images"
      // DEV PHOTO -- NO API USAGE
      
      const recipeName = docu.data().recipeName;
      const recipeID = docu.data().recipeID;
      const vegan = docu.data().vegan;
      const minRecipe = {
        recipeName: recipeName,
        recipeID: recipeID,
        vegan: vegan,
        mainPhoto: mainPhoto,
      }
      minimizedRecipes.push(minRecipe)
    })
    return minimizedRecipes.slice(1);

  } catch (e) {
    console.error(e)
    return;
  }
}


export const fetchRecipeById = async (queryId: string) => {
  try {
    const docRef = doc(FBstore, "recipes", queryId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null
    }
    const { profilePicture, recipeID, userID, username, photo, name, likes, ingredients, instructions, extra, 
    }  = docSnap.data();
    return {
      recipeID: recipeID,
      userID: userID,
      username: username,
      profilePicture: profilePicture,
      photo: photo,
      name: name,
      likes: likes,
      ingredients: ingredients,
      instructions: instructions,
      extra: extra,
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export const fetchUserById = async (queryId: string) => {
  const docRef = doc(FBstore, "users", queryId);
  const docSnap = await getDoc(docRef);
  const userRecipes = await queryUserRecipes(queryId);
  if (!docSnap.exists()) {
    return null;
  }
  return {
    username: docSnap.data().username, 
    userID: docSnap.data().userID, 
    profilePic: docSnap.data().profilePicture, 
    backPic: docSnap.data().profileBackground, 
    bioText: docSnap.data().bio, 
    userRecipes: userRecipes
  }

}
