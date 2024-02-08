import { Input } from "@rneui/themed";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Search</Text>
        </View>
        <Input 
          placeholder="Search for users or recipes" 
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
  titleContainer: {
    marginBottom: 12
  },
  title: {
    fontSize: 40,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 14,
    width: "90%" 
  },
  input: {
    fontFamily: "PlaypenBold",
    top: 12,
    left: 6
  },
  topFix: {
    top: 18
  },
})