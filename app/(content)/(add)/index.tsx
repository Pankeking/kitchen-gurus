import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../../components/themedCustom";
import { Input } from "@rneui/themed";
import { Link, router } from "expo-router";

export default function AddContentScreen() {
  return (
    <View style={styles.container}>
      <Text> Add Some Content </Text>
      <Input 
        style={styles.input}
        autoCapitalize="none"
        placeholder="First add water..."
        multiline
      />
      <Link href={'/addPhotoName'}>
        <Text style={{ color: "green"}}>Add a photo and a name</Text>
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
    height: "100%",
    width: "100%",
    // borderColor:"blue",borderWidth:1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: "20%",
  },
  separator: {
    width: "100%",
    marginVertical: 30,
  }
})