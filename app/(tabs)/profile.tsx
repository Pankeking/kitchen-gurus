import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUser } from '../../redux/slices/authSlice';

import { CustomIcon, Text, View } from '../../components/themedCustom';
import { Button, useTheme } from '@rneui/themed';

import { launchImageLibraryAsync } from 'expo-image-picker';

import ImageViewer from '../../components/Profile/ImageViewer';
import ProfileCard from '../../components/Profile/ProfileCard';

import { updateProfile } from 'firebase/auth';
import { FBauth } from '../../firebase-config';
import { LinearGradient } from 'expo-linear-gradient';


export default function ProfileScreen() {
  const user = useSelector(selectUser);
  const themeColors = useTheme().theme.colors;
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState('');
  
  const PickImageAsync = async () => {
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })
    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
      console.log("CHANGED URI");
    } else {
      alert("You did not select any image");
    }
  }
  useEffect(() => {
    const fbUser = FBauth.currentUser;
      if (fbUser && imageUri != '') {
        updateProfile(fbUser, { photoURL: imageUri} )
        dispatch(updateUser({...user, photoURL: imageUri}))
      }
      console.log("Activated useEffect");
  }, [imageUri])
  {/* <ToggleMode /> */}
  const changeName = () => {
    const fbUser = FBauth.currentUser;
    if (fbUser) {
      const displayName = "Javier"
      updateProfile(fbUser, {displayName})
      dispatch(updateUser({...user, displayName: displayName}))
    }
  }

  const backgroundImage = require('../../assets/images/fondoLindo.jpg')

  return (
    <View style={styles.container}>
      <View style={styles.bgImgContainer}>
        <Image source={backgroundImage} style={styles.bgImage}/>
      </View>

      {/* <View style={styles.titleContainer}>
        <CustomIcon 
          name="circle" 
          size={14}
          style={[styles.titleIcon, {
            color: user?.emailVerified ? "green" : "red",
            shadowColor: user?.emailVerified ? "green" : "red",
          }]}
        />
        <Text style={styles.titleText}> {user?.displayName}</Text>
      </View> */}

      <View style={styles.cardContainer}>
        <View style={styles.profilePicContainer}>
          <ImageViewer currentImage={user?.photoURL} newImage={imageUri} />
          <View style={styles.profilePicButtonContainer}>
            <TouchableOpacity 
              onPress={PickImageAsync} 
              style={[styles.profilePicButton, {borderColor: themeColors.background, backgroundColor: themeColors.background}]}
            >
              <CustomIcon
                name="camera"
                size={22}
                style={{color: themeColors.lightText}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ProfileCard />
      </View>

      <View style={styles.networkContainer}>
        <Text style={styles.networkText}>Likes</Text>
        <Text style={styles.networkText}>Followers</Text>
        <Text style={styles.networkText}>Recipes</Text>
      </View>

      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={[themeColors.primary, themeColors.accent]}
          style={styles.gradient}
        >
          <Button 
            buttonStyle={styles.button}
            icon={<CustomIcon
              name="heart-outline"
              size={22}
              style={{color: themeColors.background}}
              />}
            iconRight
            size='lg'
            title="Follow" 
          />

        </LinearGradient>
      </View>

      {/* <View style={styles.innerContainer}>
          <Text style={[styles.innerText, {opacity: 0}]} > UID: {user?.uid} </Text>
          <Text style={styles.innerText} > Email: {user?.email} </Text>
          <Text style={styles.innerText} > Status: {user?.isAnonymous ? "Chef" : "Guest"} </Text>
          <Text style={styles.innerText} > Username: {user?.displayName} </Text>
          <Text style={styles.innerText} > Phone: {user?.phoneNumber} </Text>
          <Text style={styles.innerText} > {user?.emailVerified ? "Verified" : "Not Verified"} </Text>
      </View> */}

      <View style={styles.itemsContainer}>
        <Text>imagenes</Text>
        <Text>video</Text>
        <Text>{"<FOTOS/VIDEOS>"}</Text>
        <Text></Text>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // borderColor: "black",borderWidth: 1,
  },
  
  

  // TITLE
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    marginHorizontal: 10,
    marginVertical: "5%",
    // borderColor: "red",borderWidth: 1,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 7,
  },
  titleIcon: {
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 0},
  },
  // TITLE

  // BACKGROUND IMAGE STYLE
  bgImgContainer: {
    // flex: 1,
    height: "25%",
    // borderColor: "orange", borderWidth: 1,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    opacity: 1,
  },

  // CARD
  cardContainer: {
    flex: 1,
    top: "-10%",
    backgroundColor: "transparent",
    // borderColor: "blue",borderWidth: 1,
    // marginBottom: 100,
  },
  // PROFILE PICTURE (CARD)
  profilePicContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    // borderColor: "red",borderWidth: 1,
  },
  profilePicButtonContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // width: 100,
    // borderColor: "blue",borderWidth: 3,
  },
  profilePicButton: {
    position: "absolute",
    // opacity: 1,
    borderRadius: 999,
    borderWidth: 5,
    // borderColor: "black",borderWidth: 1,
    bottom: 10,
    left: "5%",
  },
  

  // NETWORK
  networkContainer: {
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",borderWidth: 1,
    width: "100%",
    height: "10%",
  },
  networkText: {
    fontSize: 22,
    fontFamily: "SpaceMono",
    marginHorizontal: 5,
  },

  
  
  // BUTTON
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
    height: 50,
    width: "80%",
    paddingHorizontal: 20,
    borderColor: "black", borderWidth: 5,
    // height: 50,
  },
  button: {
    backgroundColor: "transparent",
    alignItems: "center",
    marginHorizontal: "10%",
    width: "100%",
  },
  gradient: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
  },

    // ITEMS
  itemsContainer: {
    // width: "100%",
    // height: "20%",
    flex: 1,
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",borderWidth: 1,
  },
  
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderColor: "blue",borderWidth: 1,
  },
  innerText: {
    marginBottom: 5,
  },


  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: "black",
  },
});
