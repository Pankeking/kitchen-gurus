import { StyleSheet, useColorScheme } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication"
import { Text, View } from "../../components/Themed";
import { Link } from "expo-router";

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
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
      <Link href="/login">
        <Text>Already have an account? Sign In</Text>
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