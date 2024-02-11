import { StyleSheet } from "react-native";

import { View } from "../themedCustom";

import SmallButton from "../SmallButton";

import { Image } from 'expo-image';
import { router } from "expo-router";
import { CameraCapturedPicture } from "expo-camera";

import { addPhoto } from "../../redux/slices/contentSlice";
import { useDispatch } from "react-redux";

export default function PhotoEditor(props: {
  newImage: CameraCapturedPicture;
}) {

  const dispatch = useDispatch();
  const ICON_SIZE = 40;
  const confirm_status = 0;
  const retry_status = 1;
  const cancel_status = 2;

  const handleFinish = (status: number) => {
    if (status === 2) {
      router.replace('/addPhotoName')
      return;
    }
    if (status === 1) {
      router.replace('/CameraScreen');
      return;
    }
    dispatch(addPhoto(props.newImage));
    router.replace('/addPhotoName')
  }


  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image 
          contentFit="contain"
          style={styles.image}
          source={props.newImage}
        />
      </View>
      <View style={styles.topButtons} >
        <SmallButton 
          onPress={() => handleFinish(confirm_status)}
          title="Confirm"
          iconName={"checkbox-marked-circle"}
          size={ICON_SIZE}
          Color="green"
        />
        <SmallButton 
          onPress={() => handleFinish(retry_status)}
          title="Try Again"
          iconName={"restore"}
          size={ICON_SIZE}
          Color="blue"
        />
        <SmallButton 
          onPress={() => handleFinish(cancel_status)}
          title="Cancel"
          iconName={"close-circle"}
          size={ICON_SIZE}
          Color="red"
        />
      </View>
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
  },
  topButtons: {
    width: "80%",
    justifyContent:"space-around",
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "blue", borderWidth: 3
  },
  link: {
    fontSize: 30,
    color: "black",
  },
  imageContainer: {
    // flex: 1,
    // borderWidth: 4, borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
  image: {
    // flex: 1,
    // borderWidth: 4, borderColor: "orange",
    width: "100%",
    height: "60%",
    backgroundColor: "black",
  }
})