import { StyleSheet } from "react-native"
import { Link } from "expo-router"
import { Button } from "@rneui/themed"
import { CustomIcon, BackgroundView } from "../../components/themedCustom"

export default function IndexScreen() {
  return (
    <>
      <BackgroundView style={styles.container}>
        <BackgroundView style={styles.inputContainer}>
          <BackgroundView style={styles.innerInputContainer}>
            <Link href="/register" asChild>
              <Button 
                buttonStyle={styles.buttonContainer}
                icon={<CustomIcon
                  name="account-alert"
                  size={18}
                  />} 
                size="lg" 
                title="Proceed to Sign In"  
              />
            </Link>
          </BackgroundView>
        </BackgroundView>
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