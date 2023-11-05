import { router } from "expo-router";
import { Text, View } from "../../../components/themedCustom";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addPhoto } from "../../../redux/slices/contentSlice";
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from "react-redux";
import { Image } from "react-native";
import { useTheme } from "@rneui/themed";
import WideButton from "../../../components/WideButton";
import { useEffect, useState } from "react";

export default function addPhotoNameScreen() {

  const dispatch = useDispatch();
  const themeColors = useTheme().theme.colors;

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const photoList = useSelector((state:any) => state.content.recipe.photo)
  const photoUri = useSelector((state:any) => state.content.recipe.photo[0])
  const defaultPhoto = require('../../../assets/images/fondoLindo.jpg');
  const [ImageSource, setImageSource] = useState(defaultPhoto);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      dispatch(addPhoto(result.assets[0].uri));
    } else {
      alert("Photo upload canceled")
    }
  }
  useEffect(() => {
    if (photoUri) {
      setImageSource(photoUri)
    } else {
      setImageSource(defaultPhoto)
    }
  }, [photoUri])

  const renderImg = (item:string, props: typeof Image) => {
    return (
      <Image 
        source={{uri:item}}
        resizeMode="contain"
      />
      )
  }

  return (
    <View style={styles.container}>
      
      <View style={[styles.imageContainer, {height: windowWidth, width: windowWidth,backgroundColor: themeColors.surface}]}>
        <FlatList
          data={photoList}
          renderItem={({ item }) => 
            (
              <>
                <View>
                  <Image 
                    source={{uri:item}}
                    resizeMode="cover"
                    style={{marginHorizontal: 7, borderColor: "black", borderWidth: 2,height: windowWidth, width: windowWidth,}}
                  />
                </View>
              </>
            )
          }
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
        {/* <Image 
          source={{uri:ImageSource}}
          resizeMode="contain"
          style={styles.image}
        /> */}
      </View>
      
      <View style={styles.separator} />
      
      <WideButton 
        iconName="image"
        title="Gallery"
        onPress={handleImagePick}
      />
      
      <View style={styles.separator} />

      <WideButton 
        iconName="camera"
        title="Camera"
        onPress={() => router.push('/CameraScreen')}
      />
      
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
    // borderColor: "black", borderWidth: 3,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
    // borderColor: "black", borderWidth: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  separator: {
    width: "100%",
    marginVertical: 30,
  },
  line: {
    width: "97%",
    height: 1,
    borderColor: "black",
    borderWidth:1,
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