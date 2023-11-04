import { useTheme } from "@rneui/themed"
import { CustomIcon, Text, View } from "../themedCustom";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function CheckList(props: { 
    iconName: React.ComponentProps<typeof CustomIcon>['name'];
    done?: boolean;
    title: string;
    onPress: () => void;
  }) {
    
    const themeColors = useTheme().theme.colors;
    const ICON_SIZE = 26;
    
    const onPress = () => props.onPress();
    const iconName = props.iconName;
    const title = props.title;
    
    function LeftLinkIcon(props : {
      name: React.ComponentProps<typeof CustomIcon>['name'];
    }) {
      return <CustomIcon size={ICON_SIZE} style={{ color: themeColors.lightText }} {...props} />
    }

    function RightLinkIcon(props : {
      done?: boolean;
    }) {
      const iconName = props.done ? "checkbox-marked-circle" : "close-box"; 
      const iconColor = props.done ? "green" : "red"; 
      return <CustomIcon size={ICON_SIZE} style={{ color: iconColor }} name={iconName} {...props} />
    }
    
    return (
      <>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <View style={styles.leftContainer}>
              <LeftLinkIcon name={iconName} />
              <Text style={styles.text}> {title} </Text>
            </View>
            <RightLinkIcon done={props.done} />
          </View>
        </TouchableOpacity>
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {

  },
})