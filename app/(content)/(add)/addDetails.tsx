import { Link, router } from "expo-router";
import { Text, View } from "../../../components/themedCustom";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function addDetailssScreen() {
  return (
    <View style={styles.container}>
      <Text>Add additional details to your recipe</Text>
      <View style={styles.separator} />
      <Link href={'/addOther'}>
        <Text style={{ color: "green" }}>Add Other Information</Text>
      </Link>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => router.back()}
      >
        <Text style={{color: "blue"}}>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    width: "100%",
    marginVertical: 30,
  }
})