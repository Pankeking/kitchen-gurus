import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../../components/themedCustom";
import { Input } from "@rneui/themed";
import { router } from "expo-router";

export default function AddContentScreen() {
  return (
    <View style={styles.container}>
      <Text> Add Some Content </Text>
      <Input 
        autoCapitalize="none"
        placeholder="First add water..."
        multiline
      />
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
    borderColor:"blue",borderWidth:1,
  }
})