import { StyleSheet } from "react-native";
import { CustomIcon, Text, View } from "../themedCustom";

export default function Ingredients(props: {
  name?: string;
  type?: string;
  measureType?: string;
  quantity?: number;
}) {
  const ICON_SIZE = 32;

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
      measureIcon = "kilogram";
      break;
    case "liter":
      measureIcon = "cup-water";
      break;
    case "unit":
      measureIcon = "numeric";
      break;
  }
        

  return (
    <View style={styles.container}>
      <View style={styles.null}>
        <CustomIcon 
          name={mainIcon}
          size={ICON_SIZE}
        />
        <Text>{name}</Text>
        <CustomIcon
          name={measureIcon}
          size={ICON_SIZE}
        />
        <Text>{quantity}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  null: {},
  container: {
    flexDirection: "row",
  },

})