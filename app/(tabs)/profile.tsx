import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';

import { CustomIcon, Text, View } from '../../components/themedCustom';
import { Button, useTheme } from '@rneui/themed';

import { launchImageLibraryAsync } from 'expo-image-picker';

import ProfilePicViewer from '../../components/Profile/ProfilePicViewer';
import ProfileCard from '../../components/Profile/ProfileCard';

import { updateProfile } from 'firebase/auth';
import { FBauth, FBstore } from '../../firebase-config';
import { LinearGradient } from 'expo-linear-gradient';
import { updateProfileBackground, updateProfilePicture } from '../../utils/firebaseUtils';
import { doc, onSnapshot } from 'firebase/firestore';


export default function ProfileScreen() {
  const user = useSelector(selectUser);
  const themeColors = useTheme().theme.colors;
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState('');
  const [backgroundPic, setBackgroundPic] = useState('');
  const [count, setCount] = useState(0);
  
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
      } else {
        console.error('User ID is undefined.');
      }
    } else {
      alert("You did not select any image");
    }
  }


  useEffect(() => {
    const fbUser = FBauth.currentUser;
    if (fbUser) {
        const userDocRef = doc(FBstore, "users", fbUser?.uid);
        const unsub = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const profilePic = userData.profilePicture;
            const backgroundPic = userData.profileBackground;
            setProfilePic(profilePic);
            setBackgroundPic(backgroundPic);
            updateProfile(fbUser, { photoURL: profilePic} )
          }
        })
        console.log("Activated useEffect");
        return () => { unsub() };
      }
  }, [FBauth.currentUser?.uid])

  {/* <ToggleMode /> */}

  const changeName = () => {
    const fbUser = FBauth.currentUser;
    if (fbUser) {
      const displayName = "Javier"
      updateProfile(fbUser, {displayName})
    }
  }

  const backgroundImage = require('../../assets/images/fondoLindo.jpg')

  return (
    <View style={styles.container}>
      <View style={styles.bgMainImgContainer}>
        {backgroundPic != '' &&
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
          {profilePic != '' &&
            <ProfilePicViewer currentImage={user?.photoURL} newImage={profilePic} />
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

      <View style={styles.networkContainer}>
        <View style={styles.netInfoContainer}>
          <Text style={styles.networkText}>Likes</Text>
          <Text style={styles.networkText}>{count}</Text>
        </View>

        <View style={styles.netInfoContainer}>
          <Text style={styles.networkText}>Followers</Text>
          <Text style={styles.networkText}>{count}</Text>
        </View>

        <View style={styles.netInfoContainer}>
          <Text style={styles.networkText}>Recipes</Text>
          <Text style={styles.networkText}>{count}</Text>
        </View>
      </View>


      <View style={styles.buttonContainer}>
        <LinearGradient
          colors={[themeColors.primary, themeColors.accent]}
          style={styles.gradient}
        >
          <Button 
            buttonStyle={styles.button}
            onPress={() => setCount(count+1)}
            // onPress={PickBackgroundImageAsync}
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
    // justifyContent: "center",
    // alignContent: "center",
    // flex: 1,
    height: 50,
    // width: "80%",
    paddingHorizontal: "10%",
    // borderColor: "black", borderWidth: 5,
  },
  button: {
    backgroundColor: "transparent",
    // alignItems: "center",
    // marginHorizontal: "10%",
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
    // borderColor: "black",borderWidth: 1,
  },
  
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: "black",
  },
});
