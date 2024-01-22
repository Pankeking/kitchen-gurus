import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet } from "react-native"
import { CustomIcon, View } from "./themedCustom"
import { Button, useTheme } from "@rneui/themed"

export default function WideButton(props: { 
  iconName: React.ComponentProps<typeof CustomIcon>['name']; 
  title: string;
  onPress: () => void;
}) {
  
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
          <Button 
            buttonStyle={styles.button}
            icon={<CustomIcon
              name={iconName}
              size={22}
              style={{ color: themeColors.background }}
              />}
            iconPosition="right"
            size="lg"
            title={title}
            onPress={onPress}
          />
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
    backgroundColor: "transparent",
    wdith: "100%",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
    
  }
})