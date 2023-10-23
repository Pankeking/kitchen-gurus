import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { selectUser, setUser, updateUser } from '../../redux/slices/authSlice';

import { CustomIcon, Text, ToggleMode, View } from '../../components/themedCustom';
import { Button, useTheme } from '@rneui/themed';

import { launchImageLibraryAsync } from 'expo-image-picker';
import ImageViewer from '../../components/ImageViewer';
import { updateProfile } from 'firebase/auth';
import { FBauth } from '../../firebase-config';
import { useDispatch } from 'react-redux';


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
    <View background style={styles.container}>
      <View background style={styles.innerContainer}>
        <View background style={styles.innerDeepContainer}>
          <ImageViewer currentImage={user?.photoURL} newImage={imageUri} />
            <Button onPress={PickImageAsync} 
              buttonStyle={[styles.buttonContainer, {backgroundColor: themeColors.background}]}
              icon={<CustomIcon
                  name="camera"
                  size={18}
                  style={{color: themeColors.primary}}
                />}
              size="lg"
              title=""  
            />
        </View>
        <View background style={styles.innerDeepContainer}>
        {/* <Button onPress={changeName} 
              buttonStyle={[styles.buttonContainer]}
              size="lg"
              title="Edit Profile"  
            /> */}
          <Text lightColor style={styles.title}> {user?.displayName} </Text>
        </View>
        
      </View>
      <View background style={styles.innerContainer}>
        <View background>
          <Text lightColor style={styles.title}>Profile</Text>
          <Text lightColor style={styles.text} > Email: {user?.email} </Text>
          <Text lightColor style={styles.text} > Status: {user?.isAnonymous ? "Chef" : "Guest"} </Text>
          <Text lightColor style={styles.text} > Username: {user?.displayName} </Text>
          <Text lightColor style={styles.text} > Phone: {user?.phoneNumber} </Text>
          <Text lightColor style={styles.text} > {user?.emailVerified ? "Verified" : "Not Verified"} </Text>
        </View>
      </View>
      <View background style={styles.innerContainer}>
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
  buttonContainer: {
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    // height: "30%",
    // width: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  innerDeepContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 7,
    fontFamily: "SpaceMono"
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
