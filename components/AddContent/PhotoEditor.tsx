import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../themedCustom";

import { Image } from 'expo-image';
import { router } from "expo-router";
import { CameraCapturedPicture } from "expo-camera";

import { addPhoto } from "../../redux/slices/contentSlice";
import { useDispatch } from "react-redux";

export default function PhotoEditor(props: {
  newImage: CameraCapturedPicture;
}) {

  const dispatch = useDispatch()

  const handleFinishEdit = () => {
    dispatch(addPhoto(props.newImage));
    router.replace('/addPhotoName')
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