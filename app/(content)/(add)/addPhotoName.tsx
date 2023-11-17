import { router } from "expo-router";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import { addPhoto } from "../../../redux/slices/contentSlice";
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from "react-redux";
import { Image } from "react-native";
import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import SmallButton from "../../../components/SmallButton";
import WideButton from "../../../components/WideButton";


export default function addPhotoNameScreen() {

  const dispatch = useDispatch();
  const themeColors = useTheme().theme.colors;
  
  const isName = useSelector((state:any) => state.content.isName);
  const recipeName = useSelector((state:any) => state.content.recipe.name);
  
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const deviceWidth = useWindowDimensions().width;
  
  const ICON_SIZE = 40;

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

  const backToMenu = () => {
      router.push('/(content)/(add)')
  }

  const RenderImg = ({ item } : any) => {
    return (
        <>
          <View style={[styles.imageContainer, {width: deviceWidth, height: deviceWidth}]}>
            <Image 
              source={item}
              resizeMode="contain"
              style={[styles.image, {width: deviceWidth, height: deviceWidth ,aspectRatio: 1}]}
            />
          </View>
        </>
      )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomIcon 
          name="chef-hat"
          style={[styles.null, { color: themeColors.lightText}]}
          size={100}
        />
        <Text style={styles.headerText}>
          {isName ? recipeName : "New Recipe"}
        </Text>
      </View>

      <View style={[styles.flatListContainer, {backgroundColor: themeColors.lightText}]}>
        
        {photoUri != null &&
          <FlatList
            ref={flatListRef}
              data={photoList}
              renderItem={({ item }) => <RenderImg item={item} /> }
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
          />
        }
      </View>
      <View style={styles.topButtons}>
        <SmallButton
          size={ICON_SIZE}
          iconName={"camera"}
          title="Photo"
          onPress={() => router.push('/CameraScreen')}
        />
        <SmallButton
          size={ICON_SIZE}
          iconName={"image"}
          title="Gallery"
          onPress={handleImagePick}
        />
      </View>
      <View style={styles.buttonContainer}>
        <WideButton 
          iconName={"check-circle"}
          title="Continue"
          onPress={backToMenu}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  null: {},
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "black", borderWidth: 4,
  },
  header: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // height: "10%",
    width: "100%",
  },
  headerText: {
    fontFamily: "PlaypenBold",
    fontSize: 28,
  },
  flatListContainer: {
    // flex: 1,
    height: "50%",
    width: "100%",
    // borderColor: "red", borderWidth: 4,
  },
  flatList: {
    height: 324,
    // borderColor: "blue", borderWidth: 4,
  },
  imageContainer: {
    alignItems: "center",
    flex:1,
    // marginHorizontal: 20,
    // borderColor: "green", borderWidth: 4,
  },
  image: {
    flex: 1,
    backgroundColor: "black",
    // borderColor: "orange", borderWidth: 4,
  },
  topButtons: {
    paddingHorizontal: "10%",
    // paddingVertical: "10%",
    width: "100%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "orange", borderWidth: 4,
  },
  buttonContainer: {
    width: "100%",
    marginHorizontal:"auto",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10%"
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