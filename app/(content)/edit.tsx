import { StyleSheet } from "react-native";
import { Text, View } from "../../components/themedCustom";
import { Input } from "@rneui/themed";

export default function EditContentScreen() {
  return (
    <View style={styles.container}>
      <Text> Edit your Content </Text>
      <Input 
        autoCapitalize="none"
        placeholder="First add water..."
        multiline
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor:"blue",borderWidth:1,
  }
})