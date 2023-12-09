import { router, useLocalSearchParams } from "expo-router";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { Image, useTheme } from "@rneui/themed";
import { fetchRecipeById, likeRecipe, recipeLikedBy } from "../../../utils/firebaseUtils";
import StoryProfile from "../../../components/Home/StoryProfiles";
import { FBauth } from "../../../firebase-config";
import { LinearGradient } from "expo-linear-gradient";
import Ingredients from "../../../components/AddContent/Ingredients";
import SmallButton from "../../../components/SmallButton";
import RenderChips from "../../../components/AddContent/RenderChips";

export default function Recipe() {

  const  {recipe, recipeID } =  useLocalSearchParams<{recipe: string, recipeID: string}>();
  const windowWidth = Math.round(useWindowDimensions().width);
  const height = windowWidth * 0.7;
  const squareDimensions = {width:windowWidth, height: windowWidth};
  
  const ICON_BIG = 50;
  const ICON_MEDIUM = 30;
  const ICON_SMALL = 20;

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
    [key: string] : {label: string; selected: boolean};
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

  type flRecipeType = [
    ingredients: IngredientType[],
    instructions: InstructionType[],
    extra: dietOptions
  ]
  

  const [FullRecipe, setFullRecipe] = useState<UserRecipeType>();
  const [LikedStatus, setLikedStatus] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  const themeColors = useTheme().theme.colors;

  const [selectedData, setSelectedData] = useState(0);
  const [flRecipe, setFlRecipe] = useState<flRecipeType>();
  

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
        const extra = resp.extra;
        const ingredients = resp.ingredients;
        const instructions = resp.instructions;
        setFlRecipe([ingredients, instructions, extra]);
        setLoaded(true);
      } catch (e) {
        console.error(e);
        handleBackRoute();
        return;
      }
    }
    Start();
  },[]);

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
    const color = props.liked ? "red" : themeColors.secondary;
    return (
      <CustomIcon 
        name={name}
        size={ICON_MEDIUM}
        color={color}
      />
    )
  }

  const renderTab = ({ item }: any) => {
    switch (selectedData) {
      
    }
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
              onPress={() => router.push(`/(content)/(user)/${FullRecipe?.username}?uid=${FullRecipe?.userID}`)}
              style={styles.userNameButton}
            >
              <Text style={[styles.userName, {color: themeColors.lightText}]}> {FullRecipe?.username}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push(`/(content)/(user)/${FullRecipe?.username}?uid=${FullRecipe?.userID}`)}>
              <StoryProfile picture={FullRecipe?.profilePicture ?? ""} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lowContainer}>
          <View>
            <FlatList 
              contentContainerStyle={styles.selectedContainer}
              horizontal
              scrollEnabled={false}
              data={["ingredients","instructions","extra"]}
              renderItem={({ item, index }) => (
                <View>
                  <SmallButton  
                    Color={index === selectedData ? "green" : "gray"}
                    iconName={"leaf"} 
                    title={`${item}`} 
                    size={ICON_SMALL} 
                    onPress={() => setSelectedData(index)} />
                </View>
              )}
            />
          </View>

            <FlatList 
              data={flRecipe}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                if (index !== selectedData) {
                  return (<></>)
                }
                if (selectedData === 0) {
                  return (
                    <View style={styles.ingredientsContainer}>
                      <FlatList 
                        showsVerticalScrollIndicator={false}
                        data={FullRecipe?.ingredients}
                        renderItem={({ item, index}) => (
                          <View>
                            <Ingredients 
                              quantity={item.quantity}
                              measureType={item.measureType}
                              type={item.type}
                              name={item.name}
                            />
                          </View>
                        )}
                      />
                    </View>
                    )
                }
                if (selectedData === 1) {
                  console.log(item)
                  return (
                      <FlatList 
                        data={FullRecipe?.instructions}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index}) => (
                          <View style={styles.stepsContainer}>
                            <Text style={[styles.titleText, {color: themeColors.secondary}]}>{item.subtitle}</Text>
                            {item.steps.map((steps, index) => 
                              <Text style={[styles.stepText,{color: themeColors.lightText}]} key={index}>{steps}</Text>
                            )}
                          </View>
                        )}
                      />
                    )
                }
                if (selectedData === 2) {
                  return (
                    <View>
                    <FlatList 
                      data={Object.values(FullRecipe?.extra || {label: "Nothing", selected: false})}
                      numColumns={2}
                      columnWrapperStyle={{flex: 1, justifyContent: "space-between"}}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => `${item.label}-${index}`}
                      renderItem={({ item, index}) => (
                          <RenderChips 
                            label={item.label}
                            selected={item.selected}
                            onPress={() => null}
                          />
                      )}
                    />
                    </View>
                    )
                }
                return (<></>)
              }
              } 
            />

        <TouchableOpacity style={{margin: 40}} onPress={() => handleBackRoute()}>
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
    paddingHorizontal: "4%",
    // borderColor: "green", borderWidth: 4,
  },
  selectedContainer: {
    marginVertical: 10,
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingRight: "10%",
    width: "100%"
  },
  ingredientsContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  stepsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleText: {
    fontSize: 22,
    fontFamily: "PlaypenBold",
    marginBottom: 10,
    
    textTransform: 'uppercase', 
  },
  stepText: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "PlaypenRegular",
    fontStyle: 'italic', // customize text style
  },
})