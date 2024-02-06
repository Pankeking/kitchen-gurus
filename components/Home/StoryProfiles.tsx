import { StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Image } from 'expo-image';

import { View } from "../themedCustom";
import { useTheme } from "@rneui/themed";

export default function StoryProfile(props: {
  picture: string;
  small?: boolean;
  big?: boolean;
}) {
  const dimension = props.small ? 50 : props.big ? 110 : 90;
  const radius = props.small ? 25 : props.big ? 55 : 45;
  const linear = {width: dimension, height: dimension, borderRadius: radius}
  const outline = {width: dimension-4, height: dimension-4, borderRadius: radius-2}
  const pic = {width: dimension-8, height: dimension-8, borderRadius: radius-5}
  const themeColors = useTheme().theme.colors;
  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.accent]} 
      start={{x: 0, y: 0.5}} end={{x: 1, y: 1}}
      style={[styles.linearGradient, linear]}
    >
      <View style={[styles.outLine, outline, {borderColor: themeColors.surface}]}>
        <Image 
          source={{uri: props.picture}}
          style={pic}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {},
  linearGradient: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  outLine: {
    borderWidth: 2,
    borderColor: "black"
  },
  
})