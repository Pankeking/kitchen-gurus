import { useTheme } from "@rneui/themed";
import { CustomIcon, Text, View } from "./themedCustom";
import { StyleSheet, TouchableOpacity } from "react-native";
export default function BlankButton(props: {
  iconName: React.ComponentProps<typeof CustomIcon>['name'];
  title: string;
  big?: boolean;
  onPress: () => void;
}) {
  const themeColors = useTheme().theme.colors;
  const { iconName, title, onPress } = props;
  const iconSize = 22;
  
  return (
    <>
      <View style={[styles.container, 
          {width: props.big ? "80%" : "65%", backgroundColor: themeColors.lightText, borderColor: themeColors.surface}
        ]
      }>
        <TouchableOpacity style={styles.button}
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
        
          
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    borderRadius: 12,
    // borderWidth: 2
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