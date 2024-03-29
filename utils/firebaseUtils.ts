import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FBauth, FBstorage, FBstore } from "../firebase-config";
import { 
  addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc,
  increment, limit, where, query, orderBy
   } from "firebase/firestore";
import { StorageReference, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Photo, Recipe, queryRecipe } from "../redux/slices/contentSlice";

const STORAGE_DIRECTORY = 'gs://' + process.env.EXPO_PUBLIC_STORAGE_BUCKET;

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
  const storageRef = ref(FBstorage, `${STORAGE_DIRECTORY}/user-profiles/anonymous-user.png`);
  const defaultPic = await getDownloadURL(storageRef)
  // Declare userData type and values  
  const userData: {
    userID: string;
    username: string;
    email: string;
    bio: string;
    lastLogin: Date;
    profilePicture?: string; 
    profileBackground?: string; 
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
    const storageRef = ref(FBstorage, `${STORAGE_DIRECTORY}/user-profiles/${userId}-profile.jpg`);
    // Fetch image -> convert to binary
    const response = await fetch(localUri)
    const imageBlob = await response.blob();
    // See callback function
    const downloadURL = await pictureUploadHelper(storageRef, imageBlob);
    if (!downloadURL) {
      alert("Error uploading new profile image to firebase");
      throw new Error("Error uploading new profile image to firebase");
    }
    // Update user profilePicture
    const userDocRef = doc(FBstore, "users", userId);
    await updateDoc(userDocRef, {
        profilePicture: downloadURL
    });
  } catch (e) {
    throw new Error(`Error uploading image and updating Firestore: ${e}`);
  }
} 

// PROFILE PICTURES
// PROFILE PICTURES
// PROFILE PICTURES
export const updateProfileBackground = async (userId: string, localUri: string) => {
  try {
    // Create reference to storage location
    const storageRef = ref(FBstorage, `${STORAGE_DIRECTORY}/user-profiles/${userId}-background.jpg`);
    // Fetch image -> convert to binary
    const response = await fetch(localUri)
    const imageBlob = await response.blob();
    // See callback function
    const downloadURL = await pictureUploadHelper(storageRef, imageBlob);
    if (!downloadURL) {
      alert("Error uploading new profile background image to firebase");
      throw new Error("Error uploading new profile background image to firebase");
    }
    // Update user profileBackground
    const userDocRef = doc(FBstore, "users", userId);
    await updateDoc(userDocRef, {
      profileBackground: downloadURL
    });
  } catch (e) {
    throw new Error(`Error uploading image and updating Firestore: ${e}`);
  }
} 
/// PICTURE UPLOAD UTIL
/// PICTURE UPLOAD UTIL
/// PICTURE UPLOAD UTIL
function pictureUploadHelper(ref: StorageReference, blob: Blob): Promise<string> {
  // Upload Image Blob
  return new Promise<string>((resolve, reject) => {
    const uploadTask = uploadBytesResumable(ref, blob);
    uploadTask.on("state_changed", 
      (snapshot) => {
      const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(1);
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    }, 
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
             reject(error.message);
             throw new Error("User doesn't have permission to access the object");
          case "storage/canceled":
             reject(error.message);
             throw new Error("User canceled the upload");
          case "storage/unknown":
             reject(error.message);
             throw new Error("Unknown error occurred, inspect error.serverResponse");
          default:
             reject(error.message);
             throw new Error(`Unknown error during upload: ${error.message}`);
        }
    },  
      async () => {
      // Get downloadURL for reference
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      } catch (error) {
        reject(error);
      }
    });
  })
}

// SEND RECIPE
// SEND RECIPE
// SEND RECIPE
export const uploadRecipe = async (uid: string, recipe:Recipe) => {
  try {
    // Get User data --> picture & name
    const userDocSnap = await getDoc(doc(FBstore, "users", uid))
    if (!userDocSnap.exists()) {
      alert("Error uploading, please try again")
      console.error("Error fetching user profile picture")
      return
    }
    const { profilePicture, username } = userDocSnap.data();
    // Remove falsys from recipe
    const cleanedRecipe = cleanRecipe(recipe);
    // Get recipes collection add cleaned Recipe
    const recipesRef = collection(FBstore, "recipes");
    const recipeDocResp = await addDoc(recipesRef, cleanedRecipe);
    // Get added recipe ID and update itself with reference for future use
    const recipeID = recipeDocResp.id;
    const updateRef = doc(recipesRef, recipeID);
    const timestamp = new Date();
    await setDoc(updateRef, {
      recipeID: recipeID,
      likes: 0,
      userID: uid,
      timestamp: timestamp,
      username: username,
      profilePicture: profilePicture,
      keywords: generateKeywords(recipe.name)
    }, {merge: true})
    // Add to user -> userRecipes collection (firebase de-normalization)
    const userRecipesCollection = collection(FBstore, "users", uid, "userRecipes");
    const userRecipesDoc = doc(userRecipesCollection, recipeID);
    const userRecipeData = {
      recipeName: cleanedRecipe.name,
      recipeID: recipeID,
      vegan: cleanedRecipe.extra.hasOwnProperty("Vegan") && cleanedRecipe.extra["Vegan"].selected,
      timestamp: timestamp
    }
    await setDoc(userRecipesDoc, userRecipeData);
    // Upload every picture to FB storage
    const photosArray:Photo[] = recipe.photo;
    let downloadURLS:{[key: number]: Promise<string>} = {};
    for (let i = 0; i < photosArray.length; i++) {
      const storageRef = ref(FBstorage, `/recipes/${recipeID}/photo-${i}.jpg`);
      try {
        const resp = await fetch(photosArray[i].uri);
        if (!resp.ok) {
          throw new Error(`Failed to fetch image: ${resp.status} ${resp.statusText}`);
        }
        const imageBlob = await resp.blob();
        const downloadURL = pictureUploadHelper(storageRef, imageBlob)
        downloadURLS[i] = downloadURL;
      } catch (error) {
        alert("Photo upload failed");
        console.error(`Uploading photo-${i} to firebase: ${error}`);
        throw error;
      }
    }
    /* 
    transform async indexed object into ordered array
    resolves promises
    update Main/first photo
    update entire array into firebase
    */
    const URLpromises = Object.values(downloadURLS);
    try {
      const resolvedURLS = await Promise.all(URLpromises);
      await updateDoc(userRecipesDoc, {
        mainPhoto: resolvedURLS[0]
      })
      await updateDoc(doc(FBstore, "recipes", recipeID), {
        photo: resolvedURLS
      })
    } catch (error) {
      console.error("During Promise.all execution: ", error);
      throw error;
    }
    return recipeID;
  } catch (error) {
    console.error('During recipe upload', error);
    throw error;
  }
}

// HELPERS RECIPE
// HELPERS RECIPE
// HELPERS RECIPE
const cleanRecipe = (recipe:Recipe) => {
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

// FIREBASE DOES NOT HAVE SUBSTRING MATCHING
const createKeywords = (name: string) => {
  const arrName:string[] = [];
  let currName = '';
  name.split('').forEach((letter) => {
    currName += letter.toLowerCase();
    arrName.push(currName);
  })
  return arrName;
};
// https://medium.com/@ken11zer01/firebase-firestore-text-search-and-pagination-91a0df8131ef
const generateKeywords = (name: string) => {
  let result = [''];
  const namesArr = name.split(' ');
  for (let i = 0; i < namesArr.length; i++) {
    let currName = '';
    result.push(...createKeywords(namesArr[i]))
    for (let j = 0; j < namesArr.length; j++) {
      currName += namesArr[j] + ' ';
      result.push(...createKeywords(currName));
      if (j === i) continue;
      result.push(...createKeywords(namesArr[j]+ " " + namesArr[i]))
    }
  }

  return [
    ...new Set([
      '',
      ...result
    ])
  ];
};

// HELPER FETCHING RECIPES <<< HOME
// HELPER FETCHING RECIPES <<< HOME
// HELPER FETCHING RECIPES <<< HOME
export const fetchAllRecipes = async (currentUser:string) => {
  try {
      const recipeRef        =       collection(FBstore, 'recipes');
      const q                =       query(recipeRef, orderBy('timestamp'));
      const recipesQuerySnap = await getDocs(q);
      const promises = recipesQuerySnap.docs.map(async (docu) => {
        const { userID, 
            username,
            name,
            recipeID,
            likes,
            profilePicture,
            photo,
          } = docu.data();
        const likedBy = await recipeLikedBy(currentUser, recipeID);
        return {
          uid:userID,
          recipeName: name,
          recipeID: recipeID,
          likes: likes,
          username: username,
          profilePic: profilePicture,
          photo: photo,
          liked: likedBy
        }
      })
      return await Promise.all(promises);
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
        const uid = docu.data().uid;
        const username = docu.data().username;
        const pic = docu.data().picture;
        const followStatus = docu.data().followed;
        const user = {
          uid: uid,
          username: username,
          pic: pic,
        }
        if (followStatus) {
          users.push(user)
        }
      })
      users = users.slice(1)
      return users;
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
      const mainPhoto = docu.data().mainPhoto;
      // const mainPhoto = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.ikozmik.com%2FContent%2FImages%2Fuploaded%2Fits-free-featured.jpg&f=1&nofb=1&ipt=0b3505ecb8a4dab33ec69e8656cb8e83c25dc0b7d9da9aeded5d1d058446feb6&ipo=images"
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
    uid: docSnap.data().uid, 
    profilePic: docSnap.data().profilePicture, 
    backPic: docSnap.data().profileBackground, 
    bioText: docSnap.data().bio, 
    userRecipes: userRecipes
  }
}

// HELPER FOLLOWER STATUS ID
export const followedById = async (uid: string, queryId: string) => {
  const followedByRef = doc(FBstore, "users", uid, "following", queryId);
  const followSnap = await getDoc(followedByRef);
  if (!followSnap.exists()) {
    return 0;
  }
  return followSnap.data().followed === true ? 1 : 0;
}

// FOLLOW ID
export const followUserById = async (uid: string, queryId: string) => {
  try {
    const querySnap = await fetchUserById(queryId);
    const docRef = doc(FBstore, "users", uid, "following", queryId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const userData = {
        followed: true,
        uid: queryId,
        picture: querySnap?.profilePic,
        username: querySnap?.username
      }
      await setDoc(docRef, userData);
      return 1;
    } else {
      const followStatus:boolean = docSnap.data().followed;
      await setDoc(docRef, {
        followed: !followStatus
      }, {merge: true})
      return !followStatus ? 1 : 0;
    }
  } catch (e) {
    console.error("Can't access firestore API");
    return -1;
  }
}

/*
export const hotFixer = async () => {
  try {
    const recipesRef = collection(FBstore, "recipes");
    const recipeSnap = await getDocs(recipesRef)
    recipeSnap.forEach(async (ele) => {
      const id = ele.data().recipeID;
      const updateRef = doc(recipesRef, id)
      await setDoc(updateRef, {
        keywords: generateKeywords(ele.data().name)
      }, {merge: true})
    })

    const usersRef = collection(FBstore, "users");
    const usersSnap = await getDocs(usersRef)
    usersSnap.forEach(async (ele) => {
      const id = ele.data().userID;
      const updateRef = doc(usersRef, id)
      await setDoc(updateRef, {
        keywords: generateKeywords(ele.data().username)
      }, {merge: true})
    })
  } catch (e) {
    return;
  }
}

*/
    
///// SEARCH QUERY /////
///// SEARCH QUERY /////
///// SEARCH QUERY /////
///// SEARCH QUERY /////
export const searchQuery = async (queryString: string) => {
  try {
    const recipesRef = collection(FBstore, "recipes");
    const recipesQuery = query(recipesRef, 
      where("keywords", "array-contains", queryString.toLowerCase()),
      limit(5),
    );
    let recipes: queryRecipe[] = [];
    const querySnap = await getDocs(recipesQuery);
    querySnap.forEach((doc) => {
      const data = doc.data();
      const recipe:queryRecipe = {
        recipeID: data.recipeID,
        name: data.name,
        photo: data.photo[0],
        userID: data.userID,
        username: data.username,
        profilePicture: data.profilePicture
      }
      recipes.push(recipe)
    })
    return recipes;
  } catch (e) {
    return null;
  }
}
