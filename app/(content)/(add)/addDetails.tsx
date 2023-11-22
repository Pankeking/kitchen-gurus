import { router } from "expo-router";
import { Text, View } from "../../../components/themedCustom";
import { FlatList, StyleSheet } from "react-native";
import WideButton from "../../../components/WideButton";
import Ingredients from "../../../components/AddContent/Ingredients";
import { useState } from "react";

export default function addDetailsScreen() {

  const [ingredientList, setIngredientList] = useState(
    [
      {
        name: "Cherry",
        type: "fruit",
        quantity: 2,
        measureType: "kilogram"
      }
    ]
  )

  const handleSubmitDetails = () => {
    router.replace('/(content)/(add)/')
  }

  // SPLICE(INDEX, 1) WOULD BE USEFUL FOR LISTS
  const addIngredient = () => {

  }


  return (
    <View style={styles.container}>
      <Text>Add additional details to your recipe</Text>
      <Ingredients 
        name="Cherry"
        type="fruit"
        quantity={2}
        measureType="kilogram"
      />
      <FlatList 
        data={ingredientList}
        renderItem={({ item, index }) => (
          <View>
            <Ingredients 
              name={item.name}
              type={item.type}
              quantity={item.quantity}
              measureType={item.measureType}
            />
          </View>
        )}
      />
      <WideButton
        title="Save & Continue"
        iconName="check-circle"
        onPress={handleSubmitDetails}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  null: {},
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  
})