import { StyleSheet } from "react-native"
import { router } from "expo-router"
import { Button } from "@rneui/themed"
import { CustomIcon, View } from "../../components/themedCustom"

export default function IndexScreen() {

  const onPress = () => {
    router.push('/login');
  }

  return (
    <>
      <View background style={styles.container}>
        <View background style={styles.inputContainer}>
          <View background style={styles.innerInputContainer}>
            <Button 
              buttonStyle={styles.buttonContainer}
              icon={<CustomIcon
                name="account-alert"
                size={18}
                />} 
              size="lg" 
              title="Proceed to Sign In"  
              onPress={onPress}
            />
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
    title: {
        fontSize: 40,
        fontWeight: "bold",
    },
    inputContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: "40%",
      width: "90%",
    },
    innerInputContainer: {
      width: "80%",
      marginVertical: 8,
    },
    buttonContainer: {
      width: "100%",
    },
})