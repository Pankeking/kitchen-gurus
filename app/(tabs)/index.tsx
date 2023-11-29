import { FlatList, StyleSheet } from 'react-native';

import { router } from 'expo-router';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';

import { signOut } from 'firebase/auth';
import { FBauth, FBstore } from '../../firebase-config';

import { View, Text } from '../../components/themedCustom';
import { useSelector } from 'react-redux';
import { DocumentData, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import WideButton from '../../components/WideButton';
import { useState } from 'react';
import { Image } from '@rneui/base';

export default function HomeScreen() {

  const dispatch = useDispatch();
  const storeRecipeID = useSelector((state:any) => state.content.recipeID)

  type RecipsType = {
    uid: string;
    recipeName: string;
    likes: number,
    username: string,
    profilePic: string,
    // photo: ""
  }

  const [Recipes, setRecipes] = useState([{
    uid: "",
    recipeName: "",
    likes: 0,
    username: "",
    profilePic: "",
  }])

  const fetchRecipes = async () => {
    const recipesQuerySnap = await getDocs(collection(FBstore, "recipes"))
    let Starting = [{
      uid: "",
      recipeName: "",
      likes: 0,
      username: "",
      profilePic: "",
    }]
    recipesQuerySnap.forEach(async (docu) => {
      const uid = docu.data().userID;
      const recipeName = docu.data().name;
      const likes = docu.data().likes;
      // const mainPhoto = docu.data().photos[0];

      const userRef = doc(FBstore, "users", uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const username = docSnap.data().username;
        const profilePic = docSnap.data().profilePicture;
        const recipes = {
          uid:uid,
          recipeName: recipeName,
          likes: likes,
          username: username,
          profilePic: profilePic,
          // photo: mainPhoto
        }
        Starting.push(recipes)
        // setRecipes(current => [...current,recipes])
      }
      
    })
    setRecipes(Starting)
  }

  const appSignOut = async () => {
    try {
      await signOut(FBauth);
      dispatch(setUser(null));
      return { user: null};
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  const handleSignOut = async () => {
      const resp = await appSignOut();
      router.replace('/(auth)')
    if (!resp?.error) {
      router.replace('/(auth)')
    } else {
      console.error(resp.error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      
      <View>
        <FlatList 
          data={Recipes}
          renderItem={({ item, index }) => (
            <View>
              {index != 0 && (
                <>
                <Text>{item.recipeName}</Text>
                <Text>{item.likes}</Text>
                <Text>{item.username}</Text>
                <Image style={{width: 50,height: 50, borderRadius: 25}} source={{uri: `${item.profilePic}`}} />
                </>
              )
              }
              {/* <Text>{item.photo}</Text> */}
            </View>
          )}
        />
        
      </View>
      <WideButton
        iconName={"check-circle"}
        title="recipe"
        onPress={fetchRecipes}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
  },
});
