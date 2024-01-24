import { Button, useTheme } from "@rneui/themed";
import { CustomIcon, Text, View } from "./themedCustom";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export default function BlankButton(props: {
  iconName: React.ComponentProps<typeof CustomIcon>['name'];
  title: string;
  big?: boolean;
  onPress: () => void;
}) {
  const themeColors = useTheme().theme.colors;
  const { iconName, title } = props;
  const iconSize = 22;
  
  const onPress = () => props.onPress();
  return (
    <>
      <View style={[styles.container, 
          {width: props.big ? "80%" : "65%", backgroundColor: themeColors.lightText}
        ]
      }>
        <TouchableOpacity style={styles.button}
          onPress={props.onPress}
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
        
          
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    borderColor: "black",
    borderWidth: 2
  },
  button: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
  }

})