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
    case "Liter":
      measureIcon = "cup-water";
      break;
    case "Unit":
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
            color={mainColor}
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
    
    // borderColor: "green", borderWidth: 5,
  },
  side: {
    flexDirection: "row",
    // borderColor: "blue", borderWidth: 5,
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
    // borderColor: "red", borderWidth: 5,
  },
  info: {
    paddingHorizontal: "5%",
    fontFamily: "PlaypenSemiBold",
    fontSize: 18,
  },
})