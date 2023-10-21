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
  setLoading } from "../../redux/slices/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FBauth } from "../../services/firebase";
import { useSelector } from "react-redux";


// AppleAuthentication.isAvailableAsync();

export default function LoginScreen() {
  const themeColors = useTheme().theme.colors;
  const mode = useThemeMode();

  const dispatch = useDispatch();
  const errorObj = useSelector((state: any) => state.auth.error)
  const userState = useSelector((state: any) => state.auth.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function LogInNav() {
      if (userState) {
        router.replace('/(tabs)');
      }
    LogInNav();
    }
  },[userState])

  const handleSubmit = async () => {
    dispatch(setLoading(true));

    try {
      const { user } = await signInWithEmailAndPassword(FBauth, email, password);
      dispatch(setLoading(false))
      console.log("success")
      dispatch(signIn({id: user.displayName, email: user.email})) 
      router.replace('/(tabs)')
    } catch (error: any) {
      const errorDispatched = {
        name: error.name,
        code: error.code
      }
      console.log(error)
    } finally {
      dispatch(setLoading(false));
    }
  }



  return (
    <>
      <BackgroundView style={styles.container}>
        {errorObj &&
          <>
            <Text>Name: {errorObj?.name}</Text>
            <Text>Code: {errorObj?.code}</Text>
          </> 
        }
        {userState && <Text>{userState.id}</Text>}
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

        <BackgroundView style={styles.innerContainer}>
          
          <BackgroundView style={styles.innerDeepContainer}>
            <Input
              autoCapitalize="none"
              placeholder="Email"
              // placeholderTextColor={themeColors.grey2}
              style={styles.input}
              onChangeText={setEmail}
            />
          </BackgroundView>

          <BackgroundView style={styles.innerDeepContainer}>
            <Input
              placeholder="Password"
              // placeholderTextColor={themeColors.grey2}
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
            />
          </BackgroundView>

          <BackgroundView style={styles.innerDeepContainer}>
            <Button
              buttonStyle={styles.buttonContainer}
              icon={<CustomIcon
                name="login"
                size={18}
                />} 
              size="lg" 
              title="Sign In" 
              onPress={handleSubmit}
            />
          </BackgroundView>
          <View style={styles.smallSpacer} />
          <BackgroundView style={styles.innerDeepContainer}>
            <Link href="/register" asChild>
              <Button 
                buttonStyle={styles.buttonContainer}
                icon={<CustomIcon
                  name="form-select"
                  size={18}
                  />} 
                size="lg" 
                title="Create new account"  
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