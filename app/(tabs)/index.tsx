import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';

import { router } from 'expo-router';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';

import { signOut } from 'firebase/auth';
import { FBauth} from '../../firebase-config';

import { View, Text, CustomIcon } from '../../components/themedCustom';
import { useEffect,useState } from 'react';
import { Image, useTheme } from '@rneui/themed';
import StoryProfile from '../../components/Home/StoryProfiles';
import { fetchFriends, fetchAllRecipes, likeRecipe } from '../../utils/firebaseUtils';


export default function HomeScreen() {

  const dispatch = useDispatch();
  const ICON_MEDIUM = 26;
  const ICON_BIG = 32;
  const themeColors = useTheme().theme.colors;

  const [loaded, setLoaded] = useState(false);

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
        if (!currentUser) {
          router.replace('/(auth)/')
          return
        }
        const users = await fetchFriends(currentUser);
        setUsers(users)
        const recipes = await fetchAllRecipes(currentUser);
        setRecipes(recipes);
        setLoaded(true);
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

  const RenderImg = (item: {item: string}) => {
    return (
        <Image 
          style={[containerDimensions, {aspectRatio: 1}]} 
          source={{uri: item.item}} 
          resizeMode='cover'
        />
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
    const size = props.liked ? ICON_BIG : ICON_MEDIUM;
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
        {loaded ? (
          <FlatList 
            data={Recipes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                {loaded && (
                  <>
                  <View style={styles.card}>
                    <TouchableOpacity onPress={() => console.log(item.uid)}>
                      <StoryProfile small picture={item.profilePic} />
                    </TouchableOpacity>
                    <View style={{paddingHorizontal: 7}}>
                      <TouchableOpacity onPress={() => router.push(`/(content)/(view)/${item.recipeName}?recipeID=${item.recipeID}`)}>
                        <Text style={styles.recipe}>{item.recipeName}</Text>
                      </TouchableOpacity>
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
                        size={ICON_MEDIUM - 2}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => alert("Share")}>
                      <CustomIcon 
                        name="share-all-outline"
                        size={ICON_MEDIUM}
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
        ) : (
          <ActivityIndicator size='large' />
        )
        }
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
