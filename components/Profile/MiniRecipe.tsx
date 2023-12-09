import { StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native"
import { CustomIcon, Text, View } from "../themedCustom";
import { Image, useTheme } from "@rneui/themed";
import { useState } from "react";
import { router } from "expo-router";

export default function MiniRecipe(props: {
  name: string;
  photo: string;
  vegan: boolean;
  id: string;
  onPress: () => void;
}) {
  const deviceWidth = useWindowDimensions().width;
  const halfSize = deviceWidth / 2;
  const dimensions = {
    height: halfSize,
    width: halfSize
  }
  const bgColor = useTheme().theme.colors.background;
  const [title, setTitle] = useState(() => {
    if (props.name.length > 17) {
      return `${props.name.slice(0, 17)}...`
    }
    return props.name;
  })
  return (
    <>
    <View style={styles.container}>
      <View style={[styles.info, {width: halfSize - 10, backgroundColor: `${bgColor}cc`}]}>
        <TouchableOpacity onPress={props.onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <View style={styles.icon}>
          <CustomIcon 
            color={props.vegan ? "green" : "gray"}
            name="leaf"
            size={18}
          />
        </View>
      </View>
      <Image style={dimensions} source={{uri: props.photo}} />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "PlaypenMedium",
    marginLeft: 11,
    textAlign: "left",
    fontSize: 16,
  },
  info: {
    position: "absolute",
    borderRadius: 99,
    paddingVertical: 7,
    top: 9,
    zIndex: 1,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: 11,
    backgroundColor: "transparent"
  }
})