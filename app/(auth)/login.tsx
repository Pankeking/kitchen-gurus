import { useState } from "react";
import { StyleSheet } from "react-native"

import { router } from "expo-router";
import { Image } from 'expo-image';

import { Input, useTheme } from "@rneui/themed";
import { View, Text }  from "../../components/themedCustom";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

import { signInWithEmailAndPassword } from "firebase/auth";
import { FBauth, FBstore } from "../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import WideButton from "../../components/WideButton";
import BlankButton from "../../components/BlankButton";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const themeColors = useTheme().theme.colors;

  // SIGN IN LOGIC
  const appSignIn = async (email: string, password: string) => {
    try {
      const resp = await signInWithEmailAndPassword(FBauth, email, password);
      return { user: resp.user };
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }
  // SIGN IN BUTTON HANDLER
  const handleSignIn = async () => {
    const resp = await appSignIn(email, password);
    if (resp?.user) {
      const userId = resp.user.uid;
      const userDocRef = doc(FBstore, "users", userId);
      const docSnap = await getDoc(userDocRef);
      await updateDoc(userDocRef, {
        lastLogin: new Date()
      });
      let userData = {};
      if (docSnap.exists()) {
        const userDataSnap = docSnap.data();
        const profilePic = userDataSnap.profilePicture;
        const backgroundPic = userDataSnap.profileBackground;
        userData = {
          uid: userId,
          displayName: resp.user.displayName,
          profilePhoto: profilePic,
          backgroundPhoto: backgroundPic
        }
      } else {
        userData = {
          uid: userId,
          displayName: resp.user.displayName,
        }   
      }
      dispatch(setUser(userData));
      router.replace('/(tabs)')
    } else {
      console.error(resp.error)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: themeColors.primary}]}>Welcome</Text>
            <Image 
              source={require('../../assets/images/brandTransparent.png')} 
              style={{width: 100, height: 100,
                top: 10, justifyContent: "center", 
                zIndex: 1, backgroundColor: "transparent"
              }}
              // placeholder={blurhash}
              contentFit="cover"
              // transition={1000}
            />
          <View style={styles.separator}>
            <View style={[styles.lineStyle, {borderColor: themeColors.lightText}]}></View>
            <View style={[styles.dotStyle, {borderColor: themeColors.lightText}]} />
            <View style={[styles.lineStyle, {borderColor: themeColors.lightText}]}></View>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>Login</Text>
          <Input
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            placeholder="Email"
            onChangeText={setEmail}
            autoCapitalize="none"
            spellCheck={false}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            onChangeText={setPassword}
          />
        </View>

        <WideButton 
          title="Enter Account"
          iconName="login"
          onPress={handleSignIn}
        />
        <View style={styles.smallSpacer}></View>
        <BlankButton
          title="New Account?"
          iconName="form-select"
          onPress={() => router.push('/register')}
        />
        
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    width: "75%",
    alignItems: "center"
  },
  title: {
    fontSize: 50,
    textAlign: "center",
    fontFamily: "PlaypenBold",
  },
  subtitle: {
    fontSize:30,
    textAlign: "left",
    fontFamily: "PlaypenRegular",
    marginBottom: 22,
    marginLeft: 5,
  },
  // FORMS  
  // FORMS  
  formContainer: {
    justifyContent: "center",
    height: "30%",
    width: "85%",
    marginVertical: 11,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 22,
    marginVertical: 2,
  },
  inputStyle: {
    height: 50,
    padding: 7,
    fontFamily: "PlaypenRegular",
  },
  inputContainer: {
    borderBottomWidth: 0,
    margin: -7
  },
  //SPACERS
  //SPACERS
  separator: {
    height: 0,
    marginVertical: "5%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  lineStyle: {
    borderWidth: 1,
    width: "20%",
    opacity: 0.3
  },
  dotStyle: {
    borderWidth: 5,
    borderRadius: 5,
    marginHorizontal: 5
  },
  smallSpacer: {
    height: 0,
    marginVertical: 11,
  },
})