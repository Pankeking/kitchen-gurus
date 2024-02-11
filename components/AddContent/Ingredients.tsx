import { StyleSheet } from "react-native";
import { CustomIcon, Text, View } from "../themedCustom";
import { useTheme } from "@rneui/themed";

export default function Ingredients(props: {
  name?: string;
  type?: string;
  measureType?: string;
  quantity?: number;
  highlighted?: boolean;
}) {
  const ICON_SIZE = 24;
  const ICON_SMALL = 14;
  const themeColors = useTheme().theme.colors;

  const { name, quantity } = props;

  const bgColor = props.highlighted ? themeColors.secondary : themeColors.surface;
  const contrasted = props.highlighted ? themeColors.darkText : themeColors.lightText;

  let mainIcon;
  let mainColor;
  let measureIcon;

  switch (props.type) {
    case "Fruit":
      mainIcon = "fruit-cherries";
      mainColor = "#e74c3c"; // Alizarin
      break;
    case "Vegetable":
      mainIcon = "carrot";
      mainColor = "#2ecc71"; // Emerald
      break;
    case "Meat":
      mainIcon = "food-turkey";
      mainColor = "#8B4513"; // Saddle Brown
      break;
    case "Beverage":
      mainIcon = "bottle-soda";
      mainColor = "#3498db"; // Dodger Blue
      break;
    case "Grain":
      mainIcon = "corn";
      mainColor = "#DAA520"; // Goldenrod
      break;
    case "Other":
      mainIcon = "dots-hexagon";
      mainColor = themeColors.lightText;
      break;
  }

  switch (props.measureType) {
    case "Kilogram":
      measureIcon = "weight-kilogram";
      break;
    case "Gram":
      measureIcon = "weight-gram";
      break;
    case "Liter":
      measureIcon = "cup";
      break;
    case "Mililiter":
      measureIcon = "cup-water"
      break;
    case "Unit":
      measureIcon = "numeric";
      break;
  }
        

  return (
    <View style={[
      styles.container, {
        backgroundColor: bgColor,
        shadowColor: themeColors.lightText
      }
      ]}>
      <View style={[styles.side, styles.left, {backgroundColor: bgColor}]}>
        <View style={[styles.leftIcon, {backgroundColor: bgColor}]}>
          <CustomIcon 
            color={mainColor}
            name={mainIcon}
            size={ICON_SIZE}
          />
        </View>
        <Text style={[styles.title, {color: contrasted}]}>{name}</Text>
      </View>
      <View style={[styles.side, styles.right, {backgroundColor: bgColor}]}>
        <Text style={[styles.info, {color: contrasted}]}>{quantity}</Text>
        <View style={[styles.rightIcon, {backgroundColor: bgColor}]}>
          <CustomIcon
            color={contrasted}
            name={measureIcon}
            size={ICON_SMALL}
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
  },
  side: {
    flexDirection: "row",
  },
  left: {
    width: "65%",
  },
  leftIcon: {
    paddingHorizontal: 3,
    justifyContent: "center",
  },
  right: {
    width: "25%",
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