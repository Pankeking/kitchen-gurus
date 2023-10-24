import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUser } from '../../redux/slices/authSlice';

import { CustomIcon, Text, View } from '../../components/themedCustom';
import { Button, useTheme } from '@rneui/themed';

import { launchImageLibraryAsync } from 'expo-image-picker';

import ImageViewer from '../../components/Profile/ImageViewer';
import ProfileCard from '../../components/Profile/ProfileCard';

import { updateProfile } from 'firebase/auth';
import { FBauth } from '../../firebase-config';


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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomIcon 
          name="circle" 
          size={14}
          style={[styles.titleIcon, {
            color: user?.emailVerified ? "green" : "red",
            shadowColor: user?.emailVerified ? "green" : "red",
          }]}
        />
        <Text style={styles.titleText}> {user?.displayName} Fernandez</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.profilePicContainer}>
          <ImageViewer currentImage={user?.photoURL} newImage={imageUri} />
          <TouchableOpacity 
            onPress={PickImageAsync} 
            style={[styles.profilePicButton]}
          >
            <CustomIcon
              name="camera"
              size={24}
              style={{color: themeColors.lightText}}
            />
          </TouchableOpacity>
        </View>
        <ProfileCard />
      </View>

      <View style={styles.innerContainer}>
        <View>
          <View style={styles.itemsContainer}>
            <Text style={styles.itemsText}>Likes</Text>
            <Text style={styles.itemsText}>Followers</Text>
            <Text style={styles.itemsText}>Recipes</Text>
          </View>
          <Text style={[styles.text, {opacity: 0}]} > UID: {user?.uid} </Text>
          <Text style={styles.text} > Email: {user?.email} </Text>
          <Text style={styles.text} > Status: {user?.isAnonymous ? "Chef" : "Guest"} </Text>
          <Text style={styles.text} > Username: {user?.displayName} </Text>
          <Text style={styles.text} > Phone: {user?.phoneNumber} </Text>
          <Text style={styles.text} > {user?.emailVerified ? "Verified" : "Not Verified"} </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text>Bottom Container</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: "black",
    // borderWidth: 1,
  },
  
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    // borderColor: "blue",
    // borderWidth: 1,
  },

  // TITLE
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    marginHorizontal: 10,
    marginVertical: "5%",
    // borderColor: "red",
    // borderWidth: 1,
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

  // CARD
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "5%",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  // PROFILE PICTURE (CARD)
  profilePicContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    // borderColor: "red",
    // borderWidth: 1,
  },
  profilePicButton: {
    position: "absolute",
    backgroundColor: 'rgba(0,0,0,0)',
    opacity: 1,
    borderRadius: 5,
    // borderColor: "black",
    // borderWidth: 1,
    bottom: 0,
    // left: 0,
  },
  
  innerDeepContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  bottomContainer: {
    // width: "100%",
    // height: "20%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "black",
    // borderWidth: 1,
  },
  

  // ITEMS
  itemsContainer: {
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  itemsText: {
    fontSize: 22,
    fontFamily: "SpaceMono",
    marginHorizontal: 5,
  },


  text: {
    marginBottom: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: "black",
  },
});
