import { Link, router } from "expo-router";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { nullifyRecipe, setPhoto } from "../../../redux/slices/contentSlice";

export default function addPhotoNameScreen() {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>
        add a photo and a name for your recipe
      </Text>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => {
            console.log("dispatched photo name")
            dispatch(setPhoto({photo: "photography"}));
            router.back();
          }
        }
      >
        <Text style={{color: "green"}}>Set the name and photo</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity
        onPress={() => {
            console.log("Nullify")
            dispatch(nullifyRecipe())
          }
        }
      >
        <Text style={{color: "green"}}>Nullify</Text>
      </TouchableOpacity>

      <View style={styles.separator} />
      
        <TouchableOpacity 
          onPress={() => router.back()}
          >
          <View style={styles.goBackContainer}>
            <Text style={styles.goBackText}>Go back</Text>
            <CustomIcon name="arrow-u-left-top" size={24}/>
          </View>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    width: "100%",
    marginVertical: 30,
  },
  goBackContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  goBackText: {
    fontSize: 20,
    color: "blue",
  },
})