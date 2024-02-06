import { useEffect, useState } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { StyleSheet } from "react-native";

import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";

import { Text, View } from "../../../../components/themedCustom";

import { fetchUserById, followUserById, followedById } from "../../../../utils/firebaseUtils";
import { FBauth } from "../../../../firebase-config";

import MiniRecipe from "../../../../components/Profile/MiniRecipe";
import StoryProfile from "../../../../components/Home/StoryProfiles";
import WideButton from "../../../../components/WideButton";

import { useDispatch } from "react-redux";
import { reloadify } from "../../../../redux/slices/authSlice";

export default function User() {

  const { user, uid } = useLocalSearchParams<{user:string, uid: string}>();
  const dispatch = useDispatch();

  const windowWidth = useWindowDimensions().width;
  const height = windowWidth * 0.7;
  
  type UserDataType = {
    username: string;
    uid: string;
    profilePic: string;
    backPic: string;
    bioText: string;
    userRecipes: {
      recipeName: string;
      recipeID: string;
      mainPhoto: string;
      vegan: boolean;
    }[];
  }

  const [userData, setUserData] = useState<UserDataType>();
  const [loaded, setLoaded] = useState(false);
  const [followed, setFollowed] = useState(false);

  const handleFollow = async (queryId: string) => {
    const user = FBauth.currentUser;
    const username = user?.displayName;
    const userId = user?.uid;
    if (!user || !username || !userId) {
      console.error("Please login first");
      router.replace('/(auth)')
      return;
    }
    const followStatus = await followUserById(userId, queryId);
    if (followStatus === -1) {
      alert("Connection to database failed");
      return;
    } 
    setFollowed(followStatus === 1 ? true : false);
    dispatch(reloadify());
    return;
  }

  useEffect(() => {
    const Start = async () => {
      try {
        const resp = await fetchUserById(uid);
        if (!uid) {
          alert("uid is")
          return;
        }
        if (!resp || resp === null) {
          alert("User Not found XD!");
          handleBackRoute();
          return;
        }
        const respData:any =  { 
          username: resp.username, 
          uid: resp.uid, 
          profilePic: resp.profilePic, 
          backPic: resp.backPic, 
          bioText: resp.bioText, 
          userRecipes: resp.userRecipes 
        };
        setUserData(respData)
        const userId = FBauth.currentUser?.uid;
        if (!userId) {
          alert("Please login First");
          return
        }
        const followResp = await followedById(userId, uid);
        setFollowed(followResp === 1 ? true : false);
        setLoaded(true);
      } catch (e) {
        console.error(e);
        handleBackRoute();
        return;
      }
    }
    Start();
  },[uid]);

  const handleBackRoute = () => {
    if (router.canGoBack()) {
      router.back()
      return
    }
    router.replace('/(tabs)/')
    return
  }

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  return (
    <View style={styles.container}>
      {loaded && (
        <>
        <View style={styles.picContainer}>
          <Image 
            source={userData?.backPic}
            contentFit="cover" 
            style={[styles.backPic,{width: windowWidth, height: height}]} 
            transition={200}
            placeholder={blurhash}
          />
          <View style={[styles.profilePicContainer]}>
            <StoryProfile picture={userData?.profilePic ?? ""} big />
          </View>
        </View>

        <View style={styles.bio}>
          <Text style={styles.bioText}> 
            {userData?.bioText}
          </Text>
        </View>
        
        <View style={styles.wideBtn}>
          <WideButton 
            onPress={() => handleFollow(uid)}
            title={`${!followed ? "Follow" : "Unfollow"} Chef`}
            iconName={"chef-hat"}
          />
        </View>

        <View style={styles.itemsContainer}>
          {userData && userData.userRecipes.length > 0 ? (
            <FlatList 
              data={userData?.userRecipes}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              renderItem={({ item, index}) => (
                <>
                <MiniRecipe 
                  name={item.recipeName}
                  id={item.recipeID}
                  photo={item.mainPhoto}
                  vegan={item.vegan}
                  onPress={() => router.push(`/(tabs)/search/recipe/${item.recipeName}?recipeID=${item.recipeID}`)}
                />
                </>
              )}
            />
          ) : (
            <View style={styles.nullContainer}>
              <Text style={styles.nullText  }>{userData?.username}</Text>
              <Text style={styles.nullText  }>has not uploaded any recipes yet</Text>
            </View>
          )
          }
          
        </View>
        
        
        </>
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  nullContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nullText: {
    fontSize: 20,
    fontFamily: "SpaceMono",
  },
  container: {
    flex: 1,
    zIndex: 2,
  },
  picContainer: {
    zIndex:1,
    marginBottom: "7%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  linearGradient: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
    bottom: 0,
  },
  profilePicContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    bottom: "-20%",
    right: "33%",
    zIndex: 2,
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  backPic: {
    zIndex: 1,
  },
  itemsContainer: {
    flex: 1,
    height: "10%",
    paddingTop: 7,
  },
  bio: {
    height: "18%",
    width: "35%",
    marginHorizontal: 11,
    justifyContent: "center",
    alignItems: "center"
  },
  bioText: {
    fontFamily: "Handlee",
    fontSize: 16,
  },
  wideBtn: {
    alignItems: "center"
  }
})