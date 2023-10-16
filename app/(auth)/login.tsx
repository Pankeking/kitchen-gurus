import { Button, Pressable, StyleSheet, useColorScheme } from "react-native"
import { Text, View } from "../../components/Themed"
import * as AppleAuthentication from "expo-apple-authentication";
import { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";



// AppleAuthentication.isAvailableAsync();

export default function LoginScreen() {
  const [apple, setApple] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    // iOS Authentication availability
    async function isAvailable() {
      const appleSupported =  await AppleAuthentication.isAvailableAsync(); 
      setApple(appleSupported);
    }
  }, [])

  return (
    <>
      <View style={styles.container}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
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
        <Link href="/register">
          <Text>No account yet? Sign Up</Text>
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
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    height: 50,
    width: "60%"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})