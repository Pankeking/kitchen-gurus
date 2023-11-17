import { StyleSheet, TouchableOpacity } from "react-native";
import { CustomIcon, Text, View } from "./themedCustom";
import { useTheme } from "@rneui/themed";

export default function SmallButton(props: {
  iconName: React.ComponentProps<typeof CustomIcon>['name']; 
  title: string;
  size: number;
  onPress: () => void;
}) {
  const themeColors = useTheme().theme.colors;
  const { onPress, title, size, iconName } = props;
  
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <CustomIcon 
          name={iconName}
          size={size}
          style={{ color: themeColors.lightText}}
        />
        <Text style={{ color: themeColors.lightText, fontSize: size/2}}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
})