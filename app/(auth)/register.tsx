import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

import { CustomIcon, View, ToggleMode, Text} from "../../components/themedCustom";
import { Button, Input, useTheme } from "@rneui/themed";

import { 
  createUserWithEmailAndPassword, 
  updateProfile
} from "firebase/auth"
import { FBauth } from "../../firebase-config"

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";


export default function RegisterScreen() {

  const dispatch = useDispatch();
  const themeColors = useTheme().theme.colors;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [matchMessage, setMatchMessage] = useState('')

  const userState = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (password != confirmPassword) {
      setMatchMessage('Passwords do not match');
    } else if (password == confirmPassword && password != '') {
      setMatchMessage('Passwords match');
    } else {
      setMatchMessage('')
    }
  },[password, confirmPassword])

  const appSignUp = async (email: string, password: string, displayName: string) => {
    try {
      // This will trigger onAuthStateChange to update the store
      const resp = await createUserWithEmailAndPassword(FBauth, email, password);
      // Add display name
      await updateProfile(resp?.user, {displayName});
      const userObject = {
        uid: resp?.user.uid,
        email: resp?.user.email,
        emailVerified: resp?.user.emailVerified,
        displayName: displayName,
        photoURL: resp?.user.photoURL,
        phoneNumber: resp?.user.phoneNumber,
        isAnonymous: resp?.user.isAnonymous,
      }
      dispatch(setUser(userObject));
      return { user: FBauth.currentUser };
    } catch (e) {
      console.error(e);
      return { error: e};
    }
  }

  const handleRegister = async () => {
      // create new User
      const resp = await appSignUp(email, password, displayName);
      if (resp?.user) {
        router.replace('/(tabs)')
      } else {
        console.error(resp.error)
      }
    }
  



  return (
    <>
    <View background style={styles.container}>
      {/* <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
            buttonStyle={colorScheme === "light" ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
            cornerRadius={5}
            style={styles.button}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });
                
                // signed in
              } catch (e : any) {
                if (e.code === 'ERR_REQUEST_CANCELED') {
                  // handle that the user canceled the sign-in flow
                } else {
                  // handle other errors
                }
              }
            }}
          /> */}
      <ToggleMode />
      <View style={styles.separator}></View>
      <View background style={styles.innerContainer}>

        <View background style={styles.innerDeepContainer}>
          <Input
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View background style={styles.innerDeepContainer}>
          <Input
            style={styles.input}
            placeholder="Username"
            onChangeText={setDisplayName}
          />
        </View>

        <View background style={styles.innerDeepContainer}>
          <Input
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View background style={styles.innerDeepContainer}>
          <Input
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {matchMessage && 
          <View background style={styles.innerDeepContainer}>
            <Text style={[styles.matchMessage, {color: themeColors.secondary}]}>{matchMessage}</Text>
          </View>
        }

        <View background style={styles.innerDeepContainer}>
          <Button 
            buttonStyle={styles.buttonContainer}
            icon={<CustomIcon
              name="key"
              size={18}
              />} 
            size="lg" 
            title="Register"
            onPress={handleRegister}
          />
        </View>

        <View style={styles.smallSpacer} />

        <View background style={styles.innerDeepContainer}>
          <Button 
            buttonStyle={styles.buttonContainer}
            icon={<CustomIcon
              name="login"
              size={18}
              />} 
            size="lg"
            title="Have an account? Sign-In" 
            onPress={() => router.push('/login')}
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
  buttonContainer: {
    width: "100%",
  },
  input: {
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
  matchMessage: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
  },
  smallSpacer: {
    height: 0,
    marginVertical: 7,
    width: "80%"
  },
  separator: {
    height: 0,
    marginVertical: "10%",
    width: "80%",
  },
})