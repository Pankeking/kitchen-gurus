import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native"
import { Link, router } from "expo-router";

import { Button, Input, Text } from "@rneui/themed";
import { useThemeMode } from '@rneui/themed';

import ToggleMode from "../../components/ToggleMode";

import * as AppleAuthentication from "expo-apple-authentication";

import { View } from "../../components/Themed"
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

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
  const colorScheme = useColorScheme();

  const dispatch = useDispatch();

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
    } catch (error) {
      console.log(error)
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    // iOS Authentication availability
  }, [])
  const appleIcon = () => {
    return (
      <AntDesign
        name="login"
        size={18}
        color={Colors[colorScheme ?? 'light'].text}
        style={{ paddingHorizontal: 8}}
      />
    )
  }

  return (
    <>
      <View lightColor="orange" style={styles.container}>
        <Text>{}</Text>
        <ToggleMode />
        <View style={styles.separator}></View>
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
        <Button
          iconPosition='right' 
          radius={5} 
          size="lg" 
          title="Sign In" 
          onPress={handleSubmit}
          icon={<AntDesign
            name="login"
            size={18}
            // color={Colors[colorScheme ?? 'light'].text}
            style={{ marginHorizontal: 8}}
            />} 
        />
        <View style={styles.separator}></View>
        <View style={styles.inputContainer} lightColor="orange">
          <Input
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor={"white"}
          />
          <Input
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={"white"}
          />
        </View>
        <View style={styles.separator}></View>

          <Link href="/register" asChild>
            <Button 
              icon={appleIcon()} 
              iconPosition='right'
              radius={5} 
              size="lg" 
              title="No account? Register"  
              titleStyle={styles.buttonTitle}
              containerStyle={styles.buttonContainer}
            />
          </Link>
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
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  appleButton: {
    height: 50,
    width: "60%"
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  buttonTitle: {
    fontSize: 22,
  },
  buttonContainer: {
    marginHorizontal: 8,
    width: "60%",
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
  }
})