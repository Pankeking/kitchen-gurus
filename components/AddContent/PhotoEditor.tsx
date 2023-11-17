import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../themedCustom";
import { router } from "expo-router";
import { CameraCapturedPicture } from "expo-camera";
import { useDispatch } from "react-redux";
import { addPhoto } from "../../redux/slices/contentSlice";
import { Action, manipulateAsync } from "expo-image-manipulator";

export default function PhotoEditor(props: {
  newImage: CameraCapturedPicture;
}) {

  const dispatch = useDispatch()

  const handleFinishEdit = () => {
    dispatch(addPhoto(props.newImage));
    router.replace('/addPhotoName')
  }

  const autoCrop = async (newPhoto: CameraCapturedPicture) => {
    try {
      let actions :Action[] = []
      if (newPhoto.width > newPhoto.height) {
        actions.push( {crop: {
          originX: newPhoto.width / 4,
          originY: 0,
          width: newPhoto.width / 2,
          height: newPhoto.height
        }} )
      } else {
        actions.push( 
          {crop: {
            originX: 0,
            originY: newPhoto.height / 4,
            width: newPhoto.width,
            height: newPhoto.height / 2
          }} )
        
      }
      actions.push(
        {resize: {
          width: 300,
          height: 300
        }}
      )
      const cropedResult = await manipulateAsync(
        newPhoto.uri,
        actions
      )
    } catch (e) {
      console.error("error: ", e);
    }
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer} >
        <Image 
          style={styles.image}
          source={props.newImage}
        />

      </View>
      <TouchableOpacity
        onPress={handleFinishEdit}
      >
        <Text style={styles.link}>
          Finish Editing
        </Text>
      </TouchableOpacity>
      <Text> Photo Editor </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4, borderColor: "black",
  },
  link: {
    fontSize: 30,
    color: "blue",
  },
  imageContainer: {
    // flex: 1,
    borderWidth: 4, borderColor: "green",
    width: "100%",
    height: "80%",
  },
  image: {
    // flex: 1,
    borderWidth: 4, borderColor: "orange",
    width: "100%",
    height: "60%",
    resizeMode:"contain",
    backgroundColor: "black",
  }
})