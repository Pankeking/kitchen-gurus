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
import { useEffect, useRef, useState } from "react";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function addPhotoNameScreen() {

  const dispatch = useDispatch();
  const themeColors = useTheme().theme.colors;

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  const photoList = useSelector((state:any) => state.content.recipe.photo)
  const photoUri = useSelector((state:any) => state.content.recipe.photo[0]);

  const handleImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      })
      if (!result.canceled) {
        dispatch(addPhoto(result.assets[0]));
      } else {
        alert("Photo upload canceled");
      }
    } catch (e) {
      console.error("Error selecting photo: ", e);
    }
  }

  const handleEndReached = () => {
    // When reaching the end, cycle back to the first item
    const nextIndex = (currentIndex + 1) % photoList.length;
    setCurrentIndex(nextIndex);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: nextIndex });
    }
  };

  const RenderImg = ({ item } : any) => {
    return (
        <>
          <View style={styles.imageContainer}>
            <Image 
              source={item}
              resizeMode="contain"
              style={[styles.image, {aspectRatio: 1}]}
            />
          </View>
        </>
      )
  }

  return (
    <View style={styles.container}>
      <WideButton 
        iconName="image"
        title="From Gallery"
        onPress={handleImagePick}
      />
        {/* <View style={[styles.imageContainer, {backgroundColor: themeColors.surface}]}>
        </View> */}
      {photoUri != null &&
          <FlatList
          ref={flatListRef}
            data={photoList}
            renderItem={({ item }) => <RenderImg item={item} /> }
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={styles.flatListContainer}
          />
      }
      <WideButton 
        iconName="camera"
        title="With Camera"
        onPress={() => router.push('/CameraScreen')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    height: "90%",
    marginHorizontal: "2.5%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black", borderWidth: 4,
  },
  imageContainer: {
    alignItems: "center",
    flex:1,
    width: 300,
    height: 300,
    marginHorizontal: 20,
    borderColor: "green", borderWidth: 4,
  },
  flatListContainer: {
    // flex: 1,
    height: "100%",
    // width: windowWidth,
    // alignItems: "center",
    // justifyContent: "center",
    borderColor: "blue", borderWidth: 4,
  },
  image: {
    flex: 1,
    width: 300,
    height: 300,
    // aspectRatio: 1952/4224,
    // resizeMode: "cover",
    backgroundColor: "black",
    borderColor: "orange", borderWidth: 4,
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