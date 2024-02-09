import { useState } from "react";
import { StyleSheet } from "react-native";

import { Input } from "@rneui/themed";

import { Text, View } from "../../../components/themedCustom";
import SmallButton from "../../../components/SmallButton";

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function SearchScreen() {

  const [query, setQuery] = useState('');

  const top = useSharedValue(0);

  const handleToggle = (up: boolean) => {
    if (up && query.length > 0) {
      top.value = withSpring(-220);
      return
    }
    top.value = withSpring(0);
  }

  const handleSearch = () => {
    handleToggle(true)
    return;
  }


  const handleCancel = () => {
    handleToggle(false)
    return;
  }


  const search_icon = <SmallButton  size={40} title="" onPress={handleSearch} iconName="magnify" />
  const drop_icon = <SmallButton size={40} title="" onPress={handleCancel} iconName={"close"}/>
  return (
      <View style={styles.container}>
        {/* <Animated.View style={{transform: [{translateY}]}}> */}
        <Animated.View style={{top}}>
          <View style={styles.titleContainer}>
            {/* <Text style={styles.title}>Search</Text> */}
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
            maxLength={25}
            onChangeText={setQuery}
          />
        </Animated.View>
        {/* <Button onPress={() => handleToggle(true)} title={"UP!"} />
        <Button onPress={() => handleToggle(false)} title={"DOWN!"} /> */}
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
    zIndex: 2,
    marginBottom: 12,
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