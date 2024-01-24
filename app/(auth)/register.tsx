import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

import { View, Text} from "../../components/themedCustom";
import { Image, Input, useTheme } from "@rneui/themed";

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
        <Text style={[styles.title, {color: themeColors.primary}]}>Join Us!</Text>
        <Image source={require('../../assets/images/brandTransparent.png')} 
              style={{width: 100, height: 100,
                top: 10, justifyContent: "center", 
                zIndex: 1, backgroundColor: "transparent"
              }}
            />
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
    fontSize: 30,
    textAlign: "left",
    fontFamily: "PlaypenRegular",
    marginBottom: 22,
    marginLeft: 5
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 22,
    marginVertical: 1,
  },
  inputStyle: {
    height: 50,
    padding: 7,
    fontFamily: "PlaypenRegular",

  },
  inputContainer: {
    borderBottomWidth: 0,
    margin: -7,
  },
  formContainer: {
    justifyContent: "center",
    height: "30%",
    width: "85%",
    marginVertical: 11
  },
  matchContainer: {
    width: "85%",
    marginBottom: 11,
    marginHorizontal: "5%",
  },
  matchMessage: {
    color: "white",
    fontSize: 18,
    textAlign: "left"
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