import { Input } from "@rneui/themed";
import { CustomIcon, View } from "../../../components/themedCustom";
import { StyleSheet } from "react-native";
import SmallButton from "../../../components/SmallButton";

export default function SearchScreen() {

  const handleSearch = () => {
    console.log("search")
    return;
  }

  const handleCancel = () => {
    console.log("cancelled")
    return;
  }

  const search_icon = <SmallButton  size={40} title="" onPress={handleSearch} iconName="magnify" />
  const drop_icon = <SmallButton size={40} title="" onPress={handleCancel} iconName={"close"}/>
  return (
      <View style={styles.container}>
        <Input 
          placeholder="Search" 
          containerStyle={styles.inputContainer}
          inputContainerStyle={{borderBottomWidth: 0}}
          inputStyle={styles.input}
          leftIcon={search_icon}
          leftIconContainerStyle={styles.topFix}
          rightIcon={drop_icon}
          rightIconContainerStyle={styles.topFix}
        />
      </View>
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
    backgroundColor: "white",
    borderRadius: 14,
    width: "90%" 
  },
  input: {
    top: 12,
    left: 6
  },
  topFix: {
    top: 18
  },
})