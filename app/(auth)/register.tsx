import { StyleSheet, useColorScheme } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication"
import { Text, View } from "../../components/Themed";
import { Link, router } from "expo-router";
import { Button } from "@rneui/base";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

import { useDispatch, useSelector } from "react-redux";
import { signUp, signIn, signOut, setError, clearError, setLoading } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";

import { FBauth } from "../../services/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

export default function RegisterScreen() {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchMessage, setMatchMessage] = useState('')

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (password == confirmPassword) {
      setMatchMessage('Match');
    } else {
      setMatchMessage('Passwords do not match');
    }
  },[password, confirmPassword])

  const handleRegister = async () => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      // check if user exists
      // LOGIC HERE
      // create new User
      const { user } = await createUserWithEmailAndPassword(FBauth, email, password);
    }
    catch (e) {
      dispatch(setError(e));
    }
  }

  return (
    <>
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
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
          />
      <View style={styles.separator}></View>
      <Link href="/login" asChild>
            <Button radius={5} size="lg" title="Already have an account? " 
              icon={<FontAwesome
                name="apple"
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
  }
})