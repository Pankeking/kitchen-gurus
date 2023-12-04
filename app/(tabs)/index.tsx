import { FlatList, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';

import { router } from 'expo-router';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';

import { signOut } from 'firebase/auth';
import { FBauth} from '../../firebase-config';

import { View, Text, CustomIcon } from '../../components/themedCustom';
import { useEffect,useState } from 'react';
import { Image, useTheme } from '@rneui/themed';
import StoryProfile from '../../components/Home/StoryProfiles';
import { fetchFriends, fetchRecipes, likeRecipe } from '../../utils/firebaseUtils';


export default function HomeScreen() {

  const dispatch = useDispatch();
  const ICON_SIZE = 26;
  const themeColors = useTheme().theme.colors;

  const [render, reRender] = useState(2);

  const deviceWidth = useWindowDimensions().width;
  const resizedWidth = deviceWidth * 1;
  const containerDimensions = {
    width: resizedWidth,
    height: resizedWidth
  }

  const [Recipes, setRecipes] = useState([{
    uid: "",
    recipeName: "",
    recipeID: "",
    likes: 0,
    username: "",
    profilePic: "",
    photo: [""],
    liked: false
  }])

  const [Users, setUsers] = useState([{
    uid: "",
    username: "",
    pic: ""
  }])


  useEffect(() => {
    const Start = async () => {
      try {
        const currentUser = FBauth.currentUser?.uid;
        if (currentUser) {
          const users = await fetchFriends(currentUser);
          setUsers(users)
        } else {
          router.replace('/(auth)/')
          return
        }
        const recipes = await fetchRecipes(currentUser);
        setRecipes(recipes);
      } catch (e) {
        console.error(e)
      }
    }
    Start();
  },[])

  

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

  const RenderImg = (item: any) => {
    return (
      // <TouchableOpacity onPress={() => null}>
        <Image 
          style={[containerDimensions, {aspectRatio: 1}]} 
          source={{uri: item.item}} 
          resizeMode='cover'
        />
      // </TouchableOpacity>
  )}

  const goToRecipe = (recipeID: string) => {
    console.log(`Transponded to ${recipeID}`)
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

  const handleLike = async (recipeID:string) => {
    const user = FBauth?.currentUser;
    const username = user?.displayName;
    if (!user || !username) {
      alert("You must login first");
      router.replace('/(auth)/')
      return
    }
    const likeResp = await likeRecipe(user.uid, recipeID, username)
    const updated = await fetchRecipes(user.uid)
    setRecipes((currentRecipes) => {
      return currentRecipes.map((recipe) => {
        if (recipe.recipeID == recipeID) {
          const newLike = likeResp === 1 ? 1 : -1;
          return {...recipe, 
            liked: likeResp === 1 ? true : false, 
            likes: recipe.likes + newLike}
        }
        return recipe;
      })
    });
    console.log(likeResp)
  }

  const HeartIcon = (props: {
    liked: boolean;
  }) => {
    const name = props.liked ? "cards-heart" : "cards-heart-outline";
    const size = props.liked ? ICON_SIZE + 4 : ICON_SIZE;
    const color = props.liked ? "red" : themeColors.secondary;
    return (
      <CustomIcon 
        name={name}
        size={size}
        color={color}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={Users}
        renderItem={({ item, index}) => (
          <View style={styles.stories}>
            <TouchableOpacity onPress={() => console.log(item.uid)}>
              <StoryProfile picture={item.pic} />
            </TouchableOpacity>
            <Text style={{paddingTop: 3, fontFamily:"PlaypenSemiBold"}} >{item.username}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      
      <View style={{
        height: "80%",
        }}
      >
        <FlatList 
          data={Recipes}
          renderItem={({ item, index }) => (
            <View>
              {index != 0 && (
                <>
                <View style={styles.card}>
                  <TouchableOpacity onPress={() => console.log(item.uid)}>
                    <StoryProfile small picture={item.profilePic} />
                  </TouchableOpacity>
                  <View style={{paddingHorizontal: 7}}>
                    <Text style={styles.recipe}>{item.recipeName}</Text>
                    <Text style={styles.user}>{item.username}</Text>
                  </View>
                </View>
                <FlatList 
                  keyExtractor={(item, index) => index.toString()}
                  data={item.photo}
                  renderItem={({ item, index}) => (
                    <RenderImg item={item} />
                  )}
                  pagingEnabled 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
                <View style={styles.icons}>
                  <TouchableOpacity style={styles.iconButton} onPress={() => handleLike(item.recipeID)}>
                   
                    <HeartIcon liked={item.liked} />

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={() => alert("Comment")}>
                    <CustomIcon 
                      name="comment-outline"
                      size={ICON_SIZE - 2}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={() => alert("Share")}>
                    <CustomIcon 
                      name="share-all-outline"
                      size={ICON_SIZE}
                    />
                  </TouchableOpacity>
                  
                </View>
                <Text style={styles.likes}>{item.likes} likes</Text>
                </>
              )
              }
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 11,
    justifyContent: 'center',
  },
  stories: {
    justifyContent:"center",
    alignItems :"center",
    marginHorizontal: 7,
    paddingBottom: 3,
  },
  card: {
    flexDirection: "row",
    alignItems:"center",
    paddingHorizontal: 7,
    marginVertical: 7,
  },
  recipe: {
    fontFamily: "PlaypenBold",
    fontSize: 18
  },
  user: {
    fontFamily: "PlaypenRegular",
    fontSize: 12,
  },
  icons: {
    marginVertical: 7,
    marginLeft: 5,
    flexDirection: "row",
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 9,
  },
  likes: {
    marginLeft: 15,
    marginTop: 7,
    marginBottom: 15,
    fontSize: 18, 
    fontFamily:"PlaypenMedium"
  }
});
