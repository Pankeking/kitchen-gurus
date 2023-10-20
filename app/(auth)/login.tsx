import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native"
import { Link, router } from "expo-router";

import { Button, Input, Text, useTheme } from "@rneui/themed";
import { useThemeMode } from '@rneui/themed';


import * as AppleAuthentication from "expo-apple-authentication";

import { View } from "../../components/Themed"
import { Colors } from "../../constants/Colors";
import { BackgroundView, CustomIcon, SurfaceView, ToggleMode }  from "../../components/themedCustom";

import { useDispatch } from "react-redux";

import { 
  signUp, 
  signIn, 
  signOut, 
  setError, 
  clearError, 
  setLoading } from "../../redux/slices/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FBauth } from "../../services/firebase";
import { useSelector } from "react-redux";


// AppleAuthentication.isAvailableAsync();

export default function LoginScreen() {
  const themeColors = useTheme().theme.colors;

  const dispatch = useDispatch();
  const errorObj = useSelector((state: any) => state.auth.error)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const { user } = await signInWithEmailAndPassword(FBauth, email, password);
      dispatch(setLoading(false))
      console.log("success")
      dispatch(signIn(user.email)) 
    } catch (error: any) {
      const errorDispatched = {
        name: error.name,
        code: error.code
      }
      console.log(error)
      dispatch(setError(errorDispatched));
    } finally {
      dispatch(setLoading(false));
    }
  }


  // >> ICONS <<
  const LogInIcon = () => {
    return (
      <CustomIcon
        name="login"
        size={18}
        style={{ paddingHorizontal: 8}}
      />
    )
  }
  const RegisterIcon = () => {
    return (
      <CustomIcon
        name="form-select"
        size={18}
        style={{ paddingHorizontal: 8}}
      />
    )
  }
  // >> ICONS <<

  return (
    <>
      <BackgroundView style={styles.container}>
        {errorObj &&
          <>
            <Text>Name: {errorObj?.name}</Text>
            <Text>Code: {errorObj?.code}</Text>
          </> 
        }
        <ToggleMode />
        {/* <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={colorScheme === "light" ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.appleButton}
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
        
        {/* <View style={styles.separator}></View> */}
        <BackgroundView style={styles.inputContainer}>
          
          <BackgroundView style={styles.innerInputContainer}>
            <Input
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor={themeColors.grey2}
              style={styles.input}
              onChangeText={setEmail}
            />
          </BackgroundView>

          <BackgroundView style={styles.innerInputContainer}>
            <Input
              placeholder="Password"
              placeholderTextColor={themeColors.grey2}
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
            />
          </BackgroundView>

          <BackgroundView style={styles.innerInputContainer}>
            <Button
              buttonStyle={styles.buttonContainer}
              icon={<LogInIcon />} 
              iconPosition='right'
              radius={5} 
              size="lg" 
              // titleStyle={{color: themeColors.primary}}
              title="Sign In" 
              onPress={handleSubmit}
            />
          </BackgroundView>

          <BackgroundView style={styles.innerInputContainer}>
            <Link href="/register" asChild>
              <Button 
                buttonStyle={[styles.buttonContainer]}
                icon={<RegisterIcon />} 
                iconPosition='right'
                radius={5} 
                size="lg" 
                title="Create new account"  
                // titleStyle={styles.buttonTitle}
              />
            </Link>
          </BackgroundView>

        </BackgroundView>

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
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  separator: {
    height: 0,
    marginVertical: "10%",
    width: '80%',
  },
  buttonTitle: {
    fontSize: 22,
  },
  buttonContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    marginBottom: 4,
    fontSize: 22,
  },    
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "40%"
  },
  innerInputContainer: {
    width: "80%",
    marginVertical: 8,

  }
})