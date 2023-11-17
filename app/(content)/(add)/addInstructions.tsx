import { Link, router } from "expo-router";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Steps from "../../../components/AddContent/Steps";

export default function addInstructionsScreen() {

  const isPhoto = useSelector((state:any) => state.content.isPhoto)
  const mainPhoto = useSelector((state:any) => state.content.recipe.photo[0])

  return (
    <View style={styles.container}>
        <ImageBackground 
          source={isPhoto ? mainPhoto : null} 
          resizeMode="cover"
          style={styles.ImageBackground}
        >
          <View style={styles.steps}>
            <Steps 
              title="Masas" 
              steps={["Add Instructions to do your recipe"]}
            />
            <Steps 
              title="Preparacion" 
              steps={[
                "and this",
                "and maybe this tooand maybe this tooand maybe this tooand maybe this too",
                "cocinar la masa",
                "otro paso"
              ]}
            />
            <Steps 
              title="Servir" 
              steps={[
                "otro paso",
                "paso a pasito",
              ]}
            />
            
            <Steps 
              title="ultimo" 
              steps={[
                "{index}.{index}.{index}.{index}.{index}.",
                "paso a pasito",
                "paso a pasito",
                "paso a pasito",
              ]}
            />
            <Steps 
              title="prasdasjda" 
              steps={[
                "otro paso",
                "otro paso",
                "paso a paotro pasosito",
                "paso a paotro pasopaso a paotro pasopaso a paotro pasopaso a paotro pasosito",
              ]}
            />
          </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  null: {},
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  ImageBackground: {
    flex: 1,
    justifyContent: "center",
    opacity: 1,
  },
  steps: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
})