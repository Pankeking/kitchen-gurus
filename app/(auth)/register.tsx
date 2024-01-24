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
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: themeColors.primary}]}>Welcome</Text>
        <View style={styles.separator}>
          <View style={[styles.lineStyle, {borderColor: themeColors.lightText}]}></View>
          <View style={[styles.dotStyle, {borderColor: themeColors.lightText}]} />
          <View style={[styles.lineStyle, {borderColor: themeColors.lightText}]}></View>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Register</Text>
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
          <View style={styles.matchContainer}>
            <Text style={[styles.matchMessage, {color: themeColors.secondary}]}>{matchMessage}</Text>
          </View>
        }
        
      </View>
      <View style={styles.buttonContainer}>
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
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
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
    margin: 11
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 22,
    padding: 7
    
  },
  inputStyle: {
    height: 50
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  formContainer: {
    justifyContent: "center",
    height: "30%",
    width: "85%",
    marginVertical: 11
  },
  matchContainer: {
    width: "80%",
    marginVertical: 8,
  },
  matchMessage: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
  },

  buttonContainer: {
    width: "100%", 
    justifyContent: "center", 
    alignItems: "center",
    marginTop: "20%",
  },
  // SPACERS
  // SPACERS
  smallSpacer: {
    height: 0,
    marginVertical: 11,
  },
  separator: {
    height: 0,
    marginVertical: "5%",
    width: "100%",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
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