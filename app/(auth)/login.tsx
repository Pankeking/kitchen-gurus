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
import { LinearGradient } from "expo-linear-gradient";
import { doc, getDoc, updateDoc } from "firebase/firestore";


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
        {/* {userState && <Text>{userState.uid}</Text>} */}
        <ToggleMode />
        {/* <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={mode.mode === "light" ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          // style={styles.appleButton}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              // signed in
              router.replace('/(tabs)')
            } catch (e : any) {
              if (e.code === 'ERR_REQUEST_CANCELED') {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        /> */}
        <View style={styles.separator} />

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Input
              autoCapitalize="none"
              placeholder="Email"
              style={styles.input}
              onChangeText={setEmail}
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
          
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={[themeColors.primary, themeColors.accent]}
              style={styles.gradient}
              >
              <Button
                buttonStyle={styles.button}
                icon={<CustomIcon
                  name="login"
                  size={22}
                  style={{color: themeColors.background}}
                  />} 
                iconPosition="right"
                size="lg" 
                title="Sign In" 
                onPress={handleSignIn}
              />
            </LinearGradient>
          </View>

          <View style={styles.smallSpacer} />

          <View style={styles.buttonContainer}>
            <LinearGradient
                colors={[themeColors.primary, themeColors.accent]}
                style={styles.gradient}
              >
              <Button 
                buttonStyle={styles.button}
                icon={<CustomIcon
                  name="form-select"
                  size={22}
                  style={{color: themeColors.background}}
                  />} 
                iconPosition="right"
                size="lg" 
                title="Create new account"  
                onPress={() => router.push('/register')}
              />
            </LinearGradient>
            
          </View>

        </View>

        <View style={styles.separator}></View>
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

   // BUTTONS 
  // BUTTONS 
  buttonContainer: {
    width: "80%",
    height: 50,
  },
  gradient: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "transparent",
    width: "100%",
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