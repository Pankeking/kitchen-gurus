import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { View } from "../../components/Themed";

import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

import { Button, Input, Text, useTheme } from "@rneui/themed";

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
import ToggleMode from "../../components/ToggleMode";

export default function RegisterScreen() {

  const dispatch = useDispatch();
  const theme = useTheme();
  

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
      dispatch(signUp(user.email))
    }
    catch (error : unknown) {
      dispatch(setLoading(false));
      console.log(error);
      // dispatch(setError(error));
    }
  }

  return (
    <>
    <View style={styles.container} lightColor="orange">
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
      <View style={styles.inputContainer} lightColor="orange">
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
        <Text style={styles.matchMessage}>{matchMessage}</Text>
      </View>
      <View style={styles.separator}></View>
          <Button radius={5} size="lg" title="Register"
            onPress={handleRegister}
            icon={<AntDesign
              name="key"
              size={18}
              style={{ marginHorizontal: 8, color: theme.theme.colors.secondary}}
              />} 
          />
      <View style={styles.separator}></View>
      <Link href="/login" asChild>
        <Button radius={5} size="lg" title="Already have an account? sign-in" 
          icon={<AntDesign
            name="login"
            size={18}
            // color={Colors[colorScheme ?? 'light'].text}
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
    justifyContent: "center",
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: "80%",
  },
  button: {
    height: 50,
    width: "60%"
  },
  input: {
    height: 40,
    marginBottom: 8,
    fontSize: 22,
  },    
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  matchMessage: {
    color: "white"
  }
})