import { Input } from "@rneui/themed";
import { Text, View } from "../../../components/themedCustom";
import { StyleSheet } from "react-native";

export default function SearchScreen() {
  
  return (
      <View style={styles.container}>
        <Text>Buscar cualqueir wea</Text>
        <Input placeholder="Search..."></Input>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})