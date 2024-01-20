import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';

import { router } from 'expo-router';


import { FBauth} from '../../firebase-config';

import { View, Text, CustomIcon } from '../../components/themedCustom';
import { useEffect, useState } from 'react';
import { Image, useTheme } from '@rneui/themed';
import StoryProfile from '../../components/Home/StoryProfiles';
import { fetchFriends, fetchAllRecipes, likeRecipe } from '../../utils/firebaseUtils';
import { useSelector } from 'react-redux';
import { reloadify } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';


export default function HomeScreen() {

  const readyProfilePic = useSelector((state:any) => state.auth.user.profilePhoto);
  const [profilePic, setProfilePic] = useState(() => readyProfilePic);
  const reload = useSelector((state:any) => state.auth.reload);

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
    uid: "dummy",
    recipeName: "",
    recipeID: "",
    likes: 0,
    username: "",
    // randomUri
    profilePic: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.lionleaf.com%2Fwp-content%2Fuploads%2F2014%2F11%2F1415275_22821821.jpg&f=1&nofb=1&ipt=4b75db3b6c030a650ba0e7ca45fb05518b9726e49576df08fefbd0d6eead98cc&ipo=images",
    photo: ["https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.lionleaf.com%2Fwp-content%2Fuploads%2F2014%2F11%2F1415275_22821821.jpg&f=1&nofb=1&ipt=4b75db3b6c030a650ba0e7ca45fb05518b9726e49576df08fefbd0d6eead98cc&ipo=images"],
    // randomUri
    liked: false
  }])

  const [Users, setUsers] = useState([{
    uid: "",
    username: "",
    // randomUri
    pic: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.lionleaf.com%2Fwp-content%2Fuploads%2F2014%2F11%2F1415275_22821821.jpg&f=1&nofb=1&ipt=4b75db3b6c030a650ba0e7ca45fb05518b9726e49576df08fefbd0d6eead98cc&ipo=images"
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
        let fetchedRecipes = await fetchAllRecipes(currentUser);
        setRecipes((current) => {
          return fetchedRecipes;
        });
      } catch (e) {
        console.error(e)
      }
    }
    Start();
    setLoaded(true);
  },[reload])

  const RenderImg = (item: {item: string}) => {
    return (
        <Image 
          style={[containerDimensions, {aspectRatio: 1}]} 
          source={{uri: item.item}} 
          resizeMode='cover'
        />
    )}

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
    dispatch(reloadify());
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
      <View style={{flexDirection: "row"}}>
        <View style={{paddingHorizontal: 9}}>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <StoryProfile big picture={profilePic != '' ? profilePic : readyProfilePic} />
          </TouchableOpacity>
        </View>
        <FlatList 
          data={Users}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index}) => (
            <View style={styles.stories}>
              <TouchableOpacity onPress={() => router.push(`/(tabs)/search/user/${item.username}?uid=${item.uid}`)}>
                <StoryProfile picture={item.pic} />
              </TouchableOpacity>
              <Text style={{paddingTop: 3, fontFamily:"PlaypenSemiBold"}} >{item.username}</Text>
            </View>
          )}
        />
      </View>
      
      <View style={{
        height: "85%",
        }}
      > 
        {loaded && (

          <FlatList 
            data={Recipes}
            extraData={Recipes}
            keyExtractor={(Recipes) => Recipes.recipeID}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={3}
            renderItem={({ item, index }) => (
              <View>
                  {item.uid == "dummy" ? (
                    <ActivityIndicator size={"large"}>

                    </ActivityIndicator>
                  ) : (
                    
                    <>
                    <View style={styles.card}>
                      <TouchableOpacity onPress={() => router.push(`/(tabs)/search/user/${item.username}?uid=${item.uid}`)}>
                        <StoryProfile small picture={item.profilePic} />
                      </TouchableOpacity>
                      <View style={{paddingHorizontal: 7}}>
                        <TouchableOpacity onPress={() => router.push(`/(tabs)/search/recipe/${item.recipeName}?recipeID=${item.recipeID}`)}>
                          <Text style={styles.recipe}>{item.recipeName}</Text>
                        </TouchableOpacity>
                        <Text style={styles.user}>{item.username}</Text>
                      </View>
                    </View>
                    <View style={styles.recipePhotoContainer}>
                      <FlatList 
                        keyExtractor={(item, index) => index.toString()}
                        data={item.photo}
                        renderItem={({ item, index}) => (
                          <RenderImg item={item} />
                        )}
                        pagingEnabled 
                        horizontal
                      />
                    </View>
  
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
        )}
       
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
  recipePhotoContainer: {
    width: "100%"
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
