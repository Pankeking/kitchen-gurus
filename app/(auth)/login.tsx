import { useState } from "react";
import { StyleSheet } from "react-native"

import { router } from "expo-router";

import { Button, Input } from "@rneui/themed";
import { View, CustomIcon, ToggleMode }  from "../../components/themedCustom";

// import * as AppleAuthentication from "expo-apple-authentication";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FBauth } from "../../firebase-config";


export default function LoginScreen() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // SIGN IN LOGIC
  const appSignIn = async (email: string, password: string) => {
    try {
      const resp = await signInWithEmailAndPassword(FBauth, email, password);
      const userObject = {
        uid: resp?.user.uid,
        email: resp?.user.email,
        emailVerified: resp?.user.emailVerified,
        displayName: resp?.user.displayName,
        photoURL: resp?.user.photoURL,
        phoneNumber: resp?.user.phoneNumber,
        isAnonymous: resp?.user.isAnonymous,
        socialMedia: null
      }
      dispatch(setUser(userObject));
      return { user: FBauth.currentUser };
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }
  // SIGN IN BUTTON HANDLER
  const handleSignIn = async () => {
    const resp = await appSignIn(email, password);
    if (resp?.user) {
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

        <View style={styles.innerContainer}>
          <View style={styles.innerDeepContainer}>
            <Input
              autoCapitalize="none"
              placeholder="Email"
              style={styles.input}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.innerDeepContainer}>
            <Input
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.innerDeepContainer}>
            <Button
              buttonStyle={styles.buttonContainer}
              icon={<CustomIcon
                name="login"
                size={18}
                />} 
              size="lg" 
              title="Sign In" 
              onPress={handleSignIn}
            />
          </View>
          <View style={styles.smallSpacer} />
          <View style={styles.innerDeepContainer}>
            <Button 
              buttonStyle={styles.buttonContainer}
              icon={<CustomIcon
                name="form-select"
                size={18}
                />} 
              size="lg" 
              title="Create new account"  
              onPress={() => router.push('/register')}
            />
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
  buttonTitle: {
    fontSize: 22,
  },
  buttonContainer: {
    width: "100%",
  },
  input: {
    // height: 40,
    marginVertical: 3,
    fontSize: 22,
  },    
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    width: "90%",
  },
  innerDeepContainer: {
    width: "80%",
    marginVertical: 8,
  },
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
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
})