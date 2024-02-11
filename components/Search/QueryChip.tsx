import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../themedCustom";
import { Image } from "expo-image";
import StoryProfile from "../Home/StoryProfiles";
import { useTheme } from "@rneui/themed";
import { router } from "expo-router";

export default function QueryChip(props: {
  recipe: {
    recipeID: string;
    name: string;
    username: string;
    userID: string;
    photo: string;
    profilePicture: string;
  }
}) {
  const { 
    recipeID, 
    name, 
    username,
    userID,
    photo,
    profilePicture
  } = props.recipe;
  const themeColors = useTheme().theme.colors;

  

  return (
    <>
    <View style={[styles.container, {backgroundColor: themeColors.surface, shadowColor: themeColors.lightText}]}>
      <TouchableOpacity onPress={() => router.push(`/(tabs)/search/user/${username}?uid=${userID}`)}>
        <Image style={styles.image} source={profilePicture} />
      </TouchableOpacity>
      <View style={[styles.textContainer, {backgroundColor: themeColors.surface}]}>
        <TouchableOpacity onPress={() => router.push(`/(tabs)/search/user/${username}?uid=${userID}`)}>
          <Text style={styles.username}>{username}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/(tabs)/search/recipe/${name}?recipeID=${recipeID}`)}>
          <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.push(`/(tabs)/search/recipe/${name}?recipeID=${recipeID}`)}>
        <Image style={styles.image} source={photo} />
      </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    borderRadius: 12,
    shadowOffset: {width: 2, height: 3},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  textContainer: {
    // alignItems: "center",
    justifyContent: "space-evenly",
    // borderColor: "green", borderWidth: 2,
    width: "60%"
  },
  username: {
    textAlign: "left",
    fontFamily: "PlaypenRegular",
    fontSize: 14,
    // borderColor: "blue", borderWidth: 2,
  },
  name: {
    textAlign: "right",
    fontFamily: "PlaypenExtraBold",
    fontSize: 16,
    // borderColor: "blue", borderWidth: 2,
  },
  recipePhoto: {},
  image: {
    width: 50,
    height: 50,
    borderRadius: 12
  },
})

