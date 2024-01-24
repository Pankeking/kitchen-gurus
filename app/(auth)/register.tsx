import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

import { View, ToggleMode, Text} from "../../components/themedCustom";
import { Input, useTheme } from "@rneui/themed";

import { appSignUp, registerUserDB } from "../../utils/firebaseUtils";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import WideButton from "../../components/WideButton";
import BlankButton from "../../components/BlankButton";


export default function RegisterScreen() {

  const themeColors = useTheme().theme.colors;
  const dispatch = useDispatch();

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
        const userData = {
          uid: resp?.user.uid,
          displayName: resp?.user.displayName,
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
      
      <Text style={styles.title}>Register</Text>
      <View style={styles.separator}>
          <View style={[styles.lineStyle, {borderColor: themeColors.lightText}]}></View>
          <View style={[styles.dotStyle, {borderColor: themeColors.lightText}]} />
          <View style={[styles.lineStyle, {borderColor: themeColors.lightText}]}></View>
        </View>
      <View style={styles.separator}></View>
      <View style={styles.innerContainer}>

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
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            placeholder="Username"
            onChangeText={setDisplayName}
            spellCheck={false}
          />
          <Input
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
          />
          <Input
            style={styles.input}
            inputStyle={styles.inputStyle}
            inputContainerStyle={styles.inputContainer}
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

        {matchMessage && 
          <View style={styles.innerDeepContainer}>
            <Text style={[styles.matchMessage, {color: themeColors.secondary}]}>{matchMessage}</Text>
          </View>
        }
        <WideButton 
          title="Create New Account"
          iconName="key"
          onPress={handleRegister}
        />

        <View style={styles.smallSpacer} />

        <BlankButton 
          title="Already Registered?"
          iconName="login"
          onPress={() => router.push('/login')}
        />
        
      </View>

      <View style={styles.separator}></View>
      <ToggleMode />
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
  title: {
    fontSize: 54,
    textAlign: "center",
    fontFamily: "PlaypenRegular",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 22,
    marginVertical: 2,
    padding: 7
    
  },
  inputStyle: {
    height: 50
  },
  inputContainer: {
    borderBottomWidth: 0,
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
  
})