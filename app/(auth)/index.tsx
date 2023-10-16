import { StyleSheet } from "react-native"
import { Text, View } from "../../components/Themed"
import { Link } from "expo-router"

export default function IndexScreen() {
  return (
    <>
      <View style={styles.container}>
        <Link href="/login" style={styles.link}>
          <Text style={styles.linkText}>Log In</Text>
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
        fontSize: 20,
        fontWeight: "bold",
    },
    link: {
      fontStyle: "italic" 
    },
    linkText: {
      fontSize: 14,
      color: "#a923fc"
    }
})