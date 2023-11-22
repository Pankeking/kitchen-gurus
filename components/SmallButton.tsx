import { StyleSheet, TouchableOpacity } from "react-native";
import { CustomIcon, Text, View } from "./themedCustom";
import { useTheme } from "@rneui/themed";

export default function SmallButton(props: {
  iconName: React.ComponentProps<typeof CustomIcon>['name']; 
  title: string;
  Color?: string;
  size: number;
  onPress: () => void;
}) {
  const themeColors = useTheme().theme.colors;
  const { onPress, title, size, iconName, Color } = props;

  const finalColor = Color ?? themeColors.lightText;
  
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <CustomIcon 
          name={iconName}
          size={size}
          style={{ color: finalColor}}
        />
        <Text style={{ color: finalColor, fontSize: size/2}}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
})