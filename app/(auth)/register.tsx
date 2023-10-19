import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

import * as AppleAuthentication from "expo-apple-authentication"
import { Link, router } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { Button, Input } from "@rneui/base";

import { 
  signUp, 
  signIn, 
  signOut, 
  setError, 
  clearError, 
  setLoading } from "../../redux/slices/authSlice";

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword } from "firebase/auth"
import { FBauth } from "../../services/firebase"

export default function RegisterScreen() {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchMessage, setMatchMessage] = useState('')

  // const loading = useSelector(state => state.auth.loading);  
  // const error = useSelector(state => state.auth.error);

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (password != confirmPassword) {
      setMatchMessage('Passwords do not match');
    } else if (password == confirmPassword && password != '') {
      setMatchMessage('Match');
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
      dispatch(signUp(user.email))
    }
    catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      dispatch(setError(error));
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
      <View style={styles.separator}></View>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Text>{matchMessage}</Text>
      </View>
      <View style={styles.separator}></View>
        <Button radius={5} size="lg" title="Register"
          onPress={handleRegister}
          icon={<AntDesign
          name="key"
          size={18}
          color={Colors[colorScheme ?? 'light'].text}
          style={{ marginHorizontal: 8}}
            />} 
        />
      <View style={styles.separator}></View>
      <Link href="/login" asChild>
        <Button radius={5} size="lg" title="Already have an account? sign-in" 
          icon={<AntDesign
          name="login"
          size={18}
          color={Colors[colorScheme ?? 'light'].text}
          style={{ marginHorizontal: 8}}
            />} 
        />
      </Link>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  separator: {
    height: 1,
    width: "80%",
    marginVertical: 30
  },
  button: {
    height: 50,
    width: "60%"
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: Colors.dark.background, // Light orange color
    color: Colors.dark.text, // Black text color
    fontSize: 22,
    // paddingLeft: 12,
    // paddingRight: 12,
  },    
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  }
})