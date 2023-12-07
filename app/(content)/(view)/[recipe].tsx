import { Link, router, useLocalSearchParams } from "expo-router";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import WideButton from "../../../components/WideButton";
import { Image, useTheme } from "@rneui/themed";
import { fetchRecipeById, likeRecipe, recipeLikedBy } from "../../../utils/firebaseUtils";
import StoryProfile from "../../../components/Home/StoryProfiles";
import { FBauth } from "../../../firebase-config";
import { LinearGradient } from "expo-linear-gradient";
import Ingredients from "../../../components/AddContent/Ingredients";

export default function Recipe() {

  const { recipe, recipeID } = useLocalSearchParams<{recipe: string, recipeID: string}>();

  const windowWidth = Math.round(useWindowDimensions().width);
  const height = windowWidth * 0.7;
  const squareDimensions = {width:windowWidth, height: windowWidth};
  
  const ICON_BIG = 50;
  const ICON_MEDIUM = 30;

  const [loaded, setLoaded] = useState(false);

  type IngredientType = {
    measureType: string;
    name: string;
    quantity: number;
    type: string;
  }
  type InstructionType = {
    steps: string[];
    subtitle: string;
  }
  type dietOptions = {
    [key: string] : {label: string; icon: string; selected: boolean};
  }
  type UserRecipeType = {
    recipeID: string;
    userID: string;
    username: string;
    profilePicture: string;
    photo: string[];
    name: string;
    likes: number;
    ingredients: IngredientType[];
    instructions: InstructionType[];
    extra: dietOptions;
  }

  const [FullRecipe, setFullRecipe] = useState<UserRecipeType>();
  const [LikedStatus, setLikedStatus] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  const themeColors = useTheme().theme.colors;

  

  useEffect(() => {
    const Start = async () => {
      try {
        const uid = FBauth.currentUser?.uid;
        const resp = await fetchRecipeById(recipeID);
        if (resp === null || !uid) {
          alert("Recipe not found");
          handleBackRoute();
          return;
        }
        const likeStatus = await recipeLikedBy(uid, recipeID);
        setLikedStatus(likeStatus);
        setTotalLikes(resp.likes);
        setFullRecipe(resp);
        setLoaded(true);
      } catch (e) {
        console.error(e);
        handleBackRoute();
        return
      }
    }
    Start()
  },[])

  const handleBackRoute = () => {
    if (router.canGoBack()) {
      router.back()
      return
    }
    router.replace('/(tabs)/')
    return
  }

  const handleLike = async (recipeID:string) => {
    const uid = FBauth.currentUser?.uid;
    const username = FBauth.currentUser?.displayName;
    if (!uid || !username) {
      alert("You must login first");
      router.replace('/(auth)');
      return;
    }
    const likeResp = await likeRecipe(uid, recipeID, username);
    if (likeResp === -1) {
      console.error("Error through Firebase");
      return -1
    }
    setLikedStatus(likeResp === 1 ? true : false);
    setTotalLikes(current => current + (likeResp === 1 ? 1 : -1))
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
        size={ICON_MEDIUM}
        color={color}
      />
    )
  }

  if (loaded) {
    return (
      <View style={styles.container}>
        <View style={[styles.picContainer, {width:windowWidth, height: height, borderBottomColor: themeColors.secondary}]}>
          <FlatList 
            data={[FullRecipe?.photo[0], FullRecipe?.photo[0]]}
            pagingEnabled
            horizontal
            renderItem={({ item, index}) => (
              <>
              <LinearGradient
                locations={[0.3, 0.9, 1.0]}
                colors={[`${themeColors.darkText}00`, `${themeColors.darkText}bb`, `${themeColors.darkText}99`]}
                style={styles.linearGradient}
              />
              <Image style={{width:windowWidth, height: height}} resizeMode="cover" source={{uri: item}}/>
              </>
            )}
          />
          <View style={styles.heartContainer}>
            <TouchableOpacity 
              onPress={() => handleLike(recipeID)}
            >
              <HeartIcon liked={LikedStatus} />
            </TouchableOpacity>
          </View>
          <View style={styles.recipeName}>
            <Text style={[styles.recipeNameText,{color: themeColors.lightText}]}> 
              {FullRecipe?.name}
            </Text>
            <View style={styles.likesContainer}>
              <CustomIcon style={{marginRight: 10}}  name="heart"/>
              <Text style={styles.likes}> 
                {totalLikes} 
              </Text>
            </View>
          </View>
          
          <View style={styles.profilePic}>
            <TouchableOpacity 
              onPress={() => console.log(`Go to user: ${FullRecipe?.userID}`)}
              style={styles.userNameButton}
            >
              <Text style={[styles.userName, {color: themeColors.lightText}]}> {FullRecipe?.username}</Text>
            </TouchableOpacity>
            <StoryProfile picture={FullRecipe?.profilePicture ?? ""} />
          </View>
        </View>

        <View style={styles.lowContainer}>
          <View style={styles.topInfo}>
            
            <FlatList 
              data={FullRecipe?.ingredients}
              horizontal
              renderItem={({ item, index}) => (
                    <Ingredients 
                      quantity={item.quantity}
                      measureType={item.measureType}
                      type={item.type}
                      name={item.name}
                    />
              )}
            />
            
          </View>
          
          
        <TouchableOpacity style={{margin: 40}} onPress={() => router.replace('/(tabs)/profile')}>
          <Text>BACK</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  } else {
    return (
      <ActivityIndicator size={'large'} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picContainer: {
    marginBottom: "7%",
    justifyContent: "flex-start",
    alignItems: "center",
    
    borderBottomWidth: 1,
    zIndex: 1
  },
  heartContainer: {
    position: "absolute",
    top: "10%",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
    width: "11%",
    height: "15%",
    borderRadius: 999,
  },

  userNameButton: {
    position: "relative",
    top: "40%",
    right: "100%",
  },
  userName: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 18,
    fontFamily: "PlaypenRegular",
  },
  likesContainer: {
    backgroundColor: "transparent", 
    marginTop: 10, 
    alignItems: "center", 
    flexDirection: "row",
  },
  likes: {
    position: "relative",
    top: "0%",
    right: "0%",
    fontSize: 18,
    fontFamily: "PlaypenMedium"
  },
  recipeName: {
    position: "absolute",
    left: "3%", 
    bottom: "3%",
    width: "30%",
    backgroundColor: "transparent",
  },
  recipeNameText: {
    fontSize: 16,
    fontFamily: "PlaypenBold",
  },
  profilePic: {
    position: "absolute",
    backgroundColor: "transparent",
    bottom: "-10%",
    right: "5%"
  },
  linearGradient: {
    // flex: 1,
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
    bottom: 0,
  },
  lowContainer: {
    flex: 1,
    paddingHorizontal: "5%",
    borderColor: "green", borderWidth: 4,
  },
  topInfo: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 5,
  },
})