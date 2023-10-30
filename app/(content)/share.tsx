import { StyleSheet } from "react-native";
import { Text, View } from "../../components/themedCustom";
import { Input } from "@rneui/themed";

export default function ShareContentScreen() {
  return (
    <View style={styles.container}>
      <Text> Share Your Content </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor:"blue",borderWidth:1,
  }
})