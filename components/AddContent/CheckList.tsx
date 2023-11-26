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
    const ICON_SIZE = 28;
    
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
      const iconName = props.done ? "checkbox-marked-circle" : "close-circle"; 
      const iconColor = props.done ? "green" : "red"; 
      return <CustomIcon size={ICON_SIZE} style={{ color: iconColor }} name={iconName} {...props} />
    }
    
    return (
      <>
      
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.container, {backgroundColor: themeColors.surface, shadowColor: themeColors.lightText}]}>
            <View style={[styles.leftContainer, {backgroundColor: themeColors.surface}]}>
              <LeftLinkIcon name={iconName} />
              <Text style={styles.text}> {title} </Text>
            </View>
            <View style={[styles.leftContainer, {backgroundColor: themeColors.surface}]}>
              <RightLinkIcon done={props.done} />
            </View>
          </View>
        </TouchableOpacity>
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    marginHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    borderRadius: 12,
    // borderColor: "black", borderWidth: 1,
    shadowOffset: {width: 2, height: 3},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  leftContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
  },
})