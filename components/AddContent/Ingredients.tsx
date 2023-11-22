import { StyleSheet } from "react-native";
import { CustomIcon, Text, View } from "../themedCustom";
import { useTheme } from "@rneui/themed";

export default function Ingredients(props: {
  name?: string;
  type?: string;
  measureType?: string;
  quantity?: number;
}) {
  const ICON_SIZE = 24;
  const themeColors = useTheme().theme.colors;

  const { name, quantity } = props;

  // weight-kilogram
  // cup-water
  // numeric
  let mainIcon;
  let measureIcon;

  switch (props.type) {
    case "fruit":
      mainIcon = "fruit-cherries";
      break;
    case "vegetable":
      mainIcon = "carrot";
      break;
    case "meat":
      mainIcon = "food-turkey";
      break;
    case "beverage":
      mainIcon = "bottle-soda";
      break;
    case "other":
      mainIcon = "dots-hexagon";
      break;
  }

  switch (props.measureType) {
    case "kilogram":
      measureIcon = "weight-kilogram";
      break;
    case "liter":
      measureIcon = "cup-water";
      break;
    case "unit":
      measureIcon = "numeric";
      break;
  }
        

  return (
    <View style={[
      styles.container, {
        backgroundColor: themeColors.surface,
        shadowColor: themeColors.lightText
      }
      ]}>
      <View style={[styles.side, styles.left, {backgroundColor: themeColors.surface}]}>
        <View style={[styles.leftIcon, {backgroundColor: themeColors.surface}]}>
          <CustomIcon 
            name={mainIcon}
            size={ICON_SIZE}
          />
        </View>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={[styles.side, styles.right, {backgroundColor: themeColors.surface}]}>
        <Text style={styles.info}>{quantity}</Text>
        <View style={[styles.rightIcon, {backgroundColor: themeColors.surface}]}>
          <CustomIcon
            name={measureIcon}
            size={ICON_SIZE * 0.6}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  null: {},
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 11,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 12,
    shadowOffset: {width: 3, height: 1},
    shadowRadius: 6,
    shadowColor: "white",
    shadowOpacity: 0.4,
    
    // borderColor: "blue", borderWidth: 5,
  },
  side: {
    width: "35%",
    flexDirection: "row",
  },
  left: {
    // justifyContent: "space-between",
  },
  leftIcon: {
    paddingHorizontal: 10,
  },
  right: {
    justifyContent: "flex-end",
  },
  rightIcon: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: "PlaypenSemiBold",
    fontSize: 18,
  },
  info: {
    paddingHorizontal: "5%",
    fontFamily: "PlaypenSemiBold",
    fontSize: 18,
  },
})