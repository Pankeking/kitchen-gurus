import { Link, router, useLocalSearchParams } from "expo-router";
import { Text, View } from "../../../components/themedCustom";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import WideButton from "../../../components/WideButton";
import { Image, useTheme } from "@rneui/themed";
import { fetchRecipeById } from "../../../utils/firebaseUtils";

export default function Recipe() {

  const { recipe, recipeID } = useLocalSearchParams<{recipe: string, recipeID: string}>();
  
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
  type RecipeType = {
    recipeID: string;
    userID: string;
    username: string;
    photo: string[];
    name: string;
    likes: number;
    ingredients: IngredientType[];
    instructions: InstructionType[];
    extra: dietOptions;
  }

  const [FullRecipe, setFullRecipe] = useState<RecipeType>();
  

  const themeColors = useTheme().theme.colors;

  

  useEffect(() => {
    const Start = async () => {
      try {
        const resp = await fetchRecipeById(recipeID);
        if (resp === null) {
          alert("Recipe not found");
          handleBackRoute();
          return;
        }
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>----{`\n\n`}Name: {recipe} {`\n\n`} ID: {recipeID} {`\n\n`} ----</Text>
      <View style={{width: 300, height: 300, alignItems: "center"}}>
        <FlatList 
          data={[FullRecipe?.photo[0], FullRecipe?.photo[0]]}
          pagingEnabled
          horizontal
          renderItem={({ item, index}) => (
            <Image style={{width: 300, height: 300}} source={{uri: item}}/>
          )}
        />
      </View>
      <Text> User: {FullRecipe?.username} </Text>
      <Text> Name: {FullRecipe?.name} </Text>
      <Text> Likes: {FullRecipe?.likes} </Text>
      <WideButton 
        title="back"
        onPress={() => router.back()}
        iconName={"circle"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginVertical: 5,
  },
})