import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import { Text, View } from "../../../../components/themedCustom";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Image, useTheme } from "@rneui/themed";
import { fetchUserById } from "../../../../utils/firebaseUtils";
import MiniRecipe from "../../../../components/Profile/MiniRecipe";
import StoryProfile from "../../../../components/Home/StoryProfiles";

export default function User() {

  const { user, uid } = useLocalSearchParams<{user:string, uid: string}>();

  const windowWidth = useWindowDimensions().width;
  const height = windowWidth * 0.7;
  const themeColors = useTheme().theme.colors;
  
  type UserDataType = {
    username: string;
    userID: string;
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

  const ICON_BIG = 50;
  const ICON_MEDIUM = 30;
  const ICON_SMALL = 20;


  const FakefetchUserById = (uid: string) => {
    const returndata = {
      username: "defaultUser", 
      userID: "user14raID", 
      profilePic: ">>>profilePic<<<", 
      backPic: ">>>backPic<<<", 
      bioText: "bioText with a lot of words", 
      userRecipes: {
        recipeName: "cake and chocolate",
        recipeID: ">>recipeID<<",
        mainPhoto: ">>>mainPhoto<<<",
        vegan: true,
      } 
    }
    return returndata;
  }

  useEffect(() => {
    const Start = async () => {
      try {
        const resp = await fetchUserById(uid);
        if (!resp || resp === null || !uid) {
          alert("User Not found");
          handleBackRoute();
          return;
        }
        const respData:any =  { 
          username: resp.username, 
          userID: resp.userID, 
          profilePic: resp.profilePic, 
          backPic: resp.backPic, 
          bioText: resp.bioText, 
          userRecipes: resp.userRecipes 
        };
        setUserData(respData)
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

  return (
    <View style={styles.container}>
      {loaded && (
        <>
        <View style={styles.picContainer}>
          <Image source={{uri: userData?.backPic}} resizeMode="cover" style={[styles.backPic,{width: windowWidth, height: height}]} />
          <View style={[styles.profilePicContainer]}>
            <StoryProfile picture={userData?.profilePic ?? ""} big />
          </View>
          
        </View>
        <View style={styles.info}>
          
          <View style={styles.bio}>
            <Text style={styles.bioText}> 
              asadsdasdasdasdasdasdassasa{userData?.bioText}asdasdasdadassas asdasdasasdasdasdasdasdasdasd
              {userData?.bioText}
              {userData?.bioText}
              {userData?.bioText}
              {userData?.bioText}
              {userData?.bioText}
              {userData?.bioText}
              {userData?.bioText}
            </Text>
          </View>
          <View style={styles.userName}>
            <TouchableOpacity onPress={() => router.replace('/(tabs)')}>

              <Text style={styles.userNameText}>{userData?.username}</Text>
            </TouchableOpacity>
          </View>
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
  info: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: "18%",
  },
  bio: {
    width: "35%",
  },
  bioText: {
    fontFamily: "PlaypenRegular",
    fontSize: 14,
  },
  userName: {
    width: "35%",
  },
  userNameText: {
    fontFamily: "PlaypenBold",
    fontSize: 24,
  }
})