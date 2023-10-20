import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { View } from "../../components/Themed";

import { Link } from "expo-router";
import { CustomIcon, BackgroundView} from "../../components/themedCustom";

import { Button, Input, Text, useTheme } from "@rneui/themed";

import authSlice, { 
  signUp, 
  signIn, 
  signOut,
  setLoading, 
  clearError,
  setError,  } from "../../redux/slices/authSlice";

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword } from "firebase/auth"
import { FBauth } from "../../services/firebase"
import ToggleMode from "../../components/ToggleMode";
import { ActionCreator, PayloadAction } from "@reduxjs/toolkit";


export default function RegisterScreen() {

  const dispatch = useDispatch();
  const themeColors = useTheme().theme.colors;

  
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    dispatch(clearError());
    
    try {
      dispatch(setLoading(true));
      // check if user exists
      // LOGIC HERE
      // create new User
      const { user } = await createUserWithEmailAndPassword(FBauth, email, password);
      dispatch(setLoading(false));
      await signInWithEmailAndPassword(FBauth, email, password);
      dispatch(signUp({id: user.displayName, email: user.email}))
    }
    catch (error : unknown) {
      dispatch(setLoading(false));
      console.log(error);
      // dispatch(setError(error));
    }
  }

  return (
    <>
    <BackgroundView style={styles.container}>
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
      <BackgroundView style={styles.inputContainer}>

        <BackgroundView style={styles.innerInputContainer}>
          <Input
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </BackgroundView>

        <BackgroundView style={styles.innerInputContainer}>
          <Input
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
          />
        </BackgroundView>

        <BackgroundView style={styles.innerInputContainer}>
          <Input
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </BackgroundView>
        {matchMessage && 
        <BackgroundView style={styles.innerInputContainer}>
          <Text style={[styles.matchMessage, {color: themeColors.text}]}>{matchMessage}</Text>
        </BackgroundView>
        }

        <BackgroundView style={styles.innerInputContainer}>
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
        </BackgroundView>

        <View style={styles.smallSpacer} />

        <BackgroundView style={styles.innerInputContainer}>
          <Link href="/login" asChild>
            <Button 
              buttonStyle={styles.buttonContainer}
              icon={<CustomIcon
                name="login"
                size={18}
                />} 
              size="lg"
              title="Have an account? Sign-In" 
            />
          </Link>
        </BackgroundView>
        
        
      </BackgroundView>
      <View style={styles.separator}></View>
      <View style={styles.separator}></View>
    </BackgroundView>
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
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    width: "90%",
  },
  innerInputContainer: {
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