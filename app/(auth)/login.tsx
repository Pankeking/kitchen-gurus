import { useState } from "react";
import { StyleSheet } from "react-native"

import { router } from "expo-router";

import { Button, Input, useTheme } from "@rneui/themed";
import { View, CustomIcon, ToggleMode }  from "../../components/themedCustom";

// import * as AppleAuthentication from "expo-apple-authentication";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FBauth, FBstore } from "../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import WideButton from "../../components/WideButton";
import BlankButton from "../../components/BlankButton";


export default function LoginScreen() {
  const dispatch = useDispatch();
  const themeColors = useTheme().theme.colors;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <ToggleMode />
        
        <View style={styles.separator} />

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              style={styles.input}
              onChangeText={setEmail}
              spellCheck={false}
            />
          </View>
          <View style={styles.form}>
            <Input
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
            />
          </View>
        
          <WideButton 
            title="Sign In"
            iconName="login"
            onPress={handleSignIn}
          />

          <View style={styles.separator}></View>

          
          <BlankButton
            title="Create new Account"
            iconName="form-select"
            onPress={() => router.push('/register')}
          />
        </View>

        <View style={styles.smallSpacer} />
        <View style={styles.separator}></View>
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

  // FORMS  
  // FORMS  
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    width: "90%",
  },
  form: {
    width: "80%",
    marginVertical: 8,
  },
  input: {
    // height: 40,
    marginVertical: 3,
    fontSize: 22,
  },    
  
  //SPACERS
  //SPACERS
  separator: {
    height: 0,
    marginVertical: "10%",
    width: '80%',
  },
  smallSpacer: {
    height: 0,
    marginVertical: 7,
    width: "80%"
  },
})