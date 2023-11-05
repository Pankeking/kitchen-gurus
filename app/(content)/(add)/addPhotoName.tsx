import { Link, router } from "expo-router";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { nullifyRecipe, setPhoto } from "../../../redux/slices/contentSlice";
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from "react-redux";
import { Image } from "react-native";
import { useTheme } from "@rneui/themed";
import WideButton from "../../../components/WideButton";
import { useEffect, useState } from "react";

export default function addPhotoNameScreen() {

  const dispatch = useDispatch();
  const themeColors = useTheme().theme.colors;

  const photoUri = useSelector((state:any) => state.content.recipe.photo)
  const defaultPhoto = require('../../../assets/images/fondoLindo.jpg')
  const [ImageSource, setImageSource] = useState(defaultPhoto);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      dispatch(setPhoto(result.assets[0].uri));
    } else {
      
    }
  }
  useEffect(() => {
    if (photoUri) {
      setImageSource(photoUri)
    }
  }, [photoUri])


  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, {borderColor: themeColors.surface}]}>
          <Image 
            source={ImageSource} 
            resizeMode="stretch"
            style={styles.image}
          />
        </View>
      <Text>
        {photoUri}
      </Text>
      <View style={styles.separator} />
      
      <WideButton 
        iconName="camera"
        title="New Photo"
        onPress={handleImagePick}
      />

      

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
    // justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
    height: 240,
    paddingHorizontal: "1%",
    // borderColor: "green", borderWidth: 1,
  },
  image: {
    width: "100%",
    height: 240,
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