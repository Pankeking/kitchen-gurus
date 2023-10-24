import { StyleSheet } from "react-native"
import { router } from "expo-router"
import { Button, useTheme } from "@rneui/themed"
import { CustomIcon, View } from "../../components/themedCustom"
import { LinearGradient } from "expo-linear-gradient"

export default function IndexScreen() {
  const themeColors = useTheme().theme.colors;
  const onPress = () => {
    router.push('/login');
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={[themeColors.primary, themeColors.accent]}
              style={styles.gradient}
            >
              

            <Button 
              buttonStyle={styles.button}
              icon={<CustomIcon
                name="account-alert"
                size={18}
                />} 
              iconPosition="right"  
              size="lg" 
              title="Proceed to Sign In"  
              onPress={onPress}
                />
            </LinearGradient>
          </View>
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
    inputContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: "40%",
      width: "90%",
    },

    buttonContainer: {
      width: "80%",
      height: 50,
    },
    gradient: {
      flex:1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      overflow: "hidden",
    },
    button: {
      backgroundColor: "transparent",
      width: "100%",
    },
})