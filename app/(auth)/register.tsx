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
import { LinearGradient } from "expo-linear-gradient";
import { appSignUp, registerUserDB } from "../../utils/firebaseUtils";


export default function RegisterScreen() {

  const themeColors = useTheme().theme.colors;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [matchMessage, setMatchMessage] = useState('')


  useEffect(() => {
    if (password != confirmPassword) {
      setMatchMessage('Passwords do not match');
    } else if (password == confirmPassword && password != '') {
      setMatchMessage('Passwords match');
    } else {
      setMatchMessage('')
    }
  },[password, confirmPassword])

  

  const handleRegister = async () => {
      // create new User
      const resp = await appSignUp(email, password, displayName);
      if (resp?.user) {
        const docID = await registerUserDB(resp.user.uid, displayName, email);
        router.replace('/(tabs)')
      } else {
        console.error(resp.error)
      }
    }
  



  return (
    <>
    <View style={styles.container}>
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
      <View style={styles.innerContainer}>

        <View style={styles.innerDeepContainer}>
          <Input
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.innerDeepContainer}>
          <Input
            style={styles.input}
            placeholder="Username"
            onChangeText={setDisplayName}
          />
        </View>

        <View style={styles.innerDeepContainer}>
          <Input
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.innerDeepContainer}>
          <Input
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {matchMessage && 
          <View style={styles.innerDeepContainer}>
            <Text style={[styles.matchMessage, {color: themeColors.secondary}]}>{matchMessage}</Text>
          </View>
        }

        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={[themeColors.primary, themeColors.accent]}
            style={styles.gradient}
          >
            <Button 
              buttonStyle={styles.button}
              icon={<CustomIcon
                name="key"
                size={22}
                style={{color: themeColors.background}}
                />} 
              iconRight  
              size="lg" 
              title="Register"
              onPress={handleRegister}
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
              name="login"
              size={22}
              style={{color: themeColors.background}}
              />} 
            iconRight
            size="lg"
            title="Have an account? Sign-In" 
            onPress={() => router.push('/login')}
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

  // SPACERS
  // SPACERS
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

  // BUTTONS
  // BUTTONS
  buttonContainer: {
    width: "80%",
    height: 50,
  },
  button: {
    backgroundColor: "transparent",
    width: "100%",
  },
  gradient: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
})