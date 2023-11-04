import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { CustomIcon, Text, View } from '../../components/themedCustom';
import { Button, useTheme } from '@rneui/themed';

import { launchImageLibraryAsync } from 'expo-image-picker';

import ProfilePicViewer from '../../components/Profile/ProfilePicViewer';
import ProfileBackGroundViewer from '../../components/Profile/ProfileBackGroundViewer';
import ProfileCard from '../../components/Profile/ProfileCard';

import { updateProfile } from 'firebase/auth';
import { FBauth, FBstore } from '../../firebase-config';
import { LinearGradient } from 'expo-linear-gradient';
import { updateProfileBackground, updateProfilePicture } from '../../utils/firebaseUtils';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { AuthState, selectBackgroundPhoto, selectProfilePhoto, selectUser } from '../../redux/slices/authSlice';
import WideButton from '../../components/WideButton';


export default function ProfileScreen() {

  const themeColors = useTheme().theme.colors;
  
  const readyProfilePic = useSelector((state:any) => state.auth.user.profilePhoto);
  const readyBackgroundPic = useSelector((state:any) => state.auth.user.backgroundPhoto);
  
  const [profilePic, setProfilePic] = useState(() => readyProfilePic);
  const [backgroundPic, setBackgroundPic] = useState(() => readyBackgroundPic);
  

  const PickProfileImageAsync = async () => {
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })
    if (!result.canceled) {
      const userId = FBauth.currentUser?.uid;
      if (userId) {
        const imageUri = result.assets[0].uri;
        await updateProfilePicture(userId, imageUri);
        setProfilePic(imageUri);
      } else {
        console.error('User ID is undefined.');
      }
    } else {
      alert("You did not select any image");
    }
  }

  const PickBackgroundImageAsync = async () => {
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })
    if (!result.canceled) {
      const userId = FBauth.currentUser?.uid;
      if (userId) {
        const imageUri = result.assets[0].uri;
        await updateProfileBackground(userId, imageUri);
        setBackgroundPic(imageUri);
      } else {
        console.error('User ID is undefined.');
      }
    } else {
      alert("You did not select any image");
    }
  }


  const changeName = () => {
    const fbUser = FBauth.currentUser;
    if (fbUser) {
      const displayName = "Javier"
      updateProfile(fbUser, {displayName})
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.bgMainImgContainer}>
        {backgroundPic &&
          <Image source={{uri:backgroundPic}} style={styles.bgImage}/>
        } 
        <View style={styles.profileBackgroundButtonContainer}>
          <TouchableOpacity 
            onPress={PickBackgroundImageAsync} 
            style={[styles.profileBackgroundButton, {borderColor: themeColors.background, backgroundColor: themeColors.background}]}
          >
            <CustomIcon
              name="camera"
              size={22}
              style={{color: themeColors.lightText}}
            />
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.cardContainer}>
        <View style={styles.profilePicContainer}>
          {profilePic != '' &&
            <ProfilePicViewer newImage={profilePic} />
          }
          <View style={styles.profilePicButtonContainer}>
            <TouchableOpacity 
              onPress={PickProfileImageAsync} 
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


    <View style={[styles.separator, {backgroundColor: "transparent"}]}>
      <LinearGradient
        colors={[
          `${themeColors.background}00`, // Start with 0 opacity
          `${themeColors.background}FF`, // End with 1 opacity
        ]}
        style={ {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >

      </LinearGradient>
    </View>

      <View style={styles.networkContainer}>
        <View style={styles.netInfoContainer}>
          <Text style={styles.networkText}>Likes</Text>
          <Text style={styles.networkText}>5</Text>
        </View>

        <View style={styles.netInfoContainer}>
          <Text style={styles.networkText}>Followers</Text>
          <Text style={styles.networkText}>10</Text>
        </View>

        <View style={styles.netInfoContainer}>
          <Text style={styles.networkText}>Recipes</Text>
          <Text style={styles.networkText}>2</Text>
        </View>
      </View>


        <View style={styles.buttonContainer}>
          <WideButton 
            title="New Dish"
            iconName="bowl-mix"
            onPress={() => router.push('/(content)/(add)/')}
          />
        </View>

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
  bgMainImgContainer: {
    // flex: 1,
    height: "25%",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "transparent",
    // borderColor: "blue",borderWidth: 1,
  },
  bgImage: {
    backgroundColor: "transparent",
    width: "99%",
    borderRadius: 3,
    height: "100%",
    // borderColor: "blue",borderWidth: 1,
  },
  profileBackgroundButtonContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    // height: "15%",
    // width: 100,
    // borderColor: "blue",borderWidth: 1,
  },
  profileBackgroundButton: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 5,
    top: -150,
    right: "10%",
  },

  // CARD
  cardContainer: {
    flex: 1,
    top: "-10%",
    backgroundColor: "transparent",
    // borderColor: "blue",borderWidth: 1,
  },
  // PROFILE PICTURE (CARD)
  profilePicContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    // borderColor: "red",borderWidth: 1,
  },
  profilePicButtonContainer: {
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "blue",borderWidth: 3,
  },
  profilePicButton: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 5,
    // borderColor: "black",borderWidth: 1,
    bottom: 10,
    left: "5%",
  },
  

  // NETWORK
  networkContainer: {
    flexDirection: "row", 
    justifyContent: "space-evenly",
    alignItems: "center",
    // borderColor: "black",borderWidth: 1,
    paddingVertical: "5%",
    width: "100%",
    height: "10%",
  },
  netInfoContainer: {
    // borderColor: "black",borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  networkText: {
    fontSize: 22,
    fontFamily: "SpaceMono",
    marginHorizontal: 5,
    // borderColor: "black",borderWidth: 1,
  },

  
  
  // BUTTON
  buttonContainer: {
    height: 50,
    marginLeft: "10%",
    width: "100%",
  },

  // ITEMS
  itemsContainer: {
    flex: 1,
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "black",borderWidth: 1,
  },
  
  separator: {
    width: '100%',
    height: 20,
  },
});
