import { useEffect, useState } from "react";
import { Linking, StyleSheet, useColorScheme } from "react-native"
import { Link, router } from "expo-router";

import { Button } from "@rneui/base";

import * as AppleAuthentication from "expo-apple-authentication";

import { Text, View } from "../../components/Themed"
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";




// AppleAuthentication.isAvailableAsync();

export default function LoginScreen() {
  const colorScheme = useColorScheme();

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
      <View darkColor="brown" lightColor="orange" style={styles.container}>
        <AppleAuthentication.AppleAuthenticationButton
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
        />
        <View style={styles.separator}></View>

          <Link href="/register" asChild>
            <Button 
              color={"#000"} 
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
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonTitle: {
    fontSize: 22,
  },
  buttonContainer: {
    marginHorizontal: 8,
    width: "60%",
    
  }
})