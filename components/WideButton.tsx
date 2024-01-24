import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, TouchableOpacity } from "react-native"
import { CustomIcon, Text, View } from "./themedCustom"
import { Button, useTheme } from "@rneui/themed"

export default function WideButton(props: { 
  iconName: React.ComponentProps<typeof CustomIcon>['name']; 
  title: string;
  onPress: () => void;
}) {
  const iconSize = 22;
  const themeColors = useTheme().theme.colors;
  const { iconName, title } = props;
  const onPress = () => props.onPress();
  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={ [themeColors.primary, themeColors.accent] }
          style={styles.gradient}
        >
          <TouchableOpacity 
            style={styles.button}
            onPress={onPress}
          >
            <Text style={[styles.text, {color: themeColors.darkText}]}>
              {title}
            </Text>
            <CustomIcon 
              name={iconName}
              size={iconSize}
              style={{color: themeColors.darkText}}
              />
        </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 50,
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    
  },
  gradient: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    
  },
  text: {
    fontSize: 18
  }
})