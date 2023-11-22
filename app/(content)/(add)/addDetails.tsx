import { router } from "expo-router";
import { Text, View } from "../../../components/themedCustom";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import WideButton from "../../../components/WideButton";
import Ingredients from "../../../components/AddContent/Ingredients";
import { useState } from "react";

export default function addDetailsScreen() {

  type Ingredient = {
    name: string;
    type: string;
    quantity: number;
    measureType: string;
  }

  const sampleArray = [
    { name: "Apple", type: "fruit", quantity: 1, measureType: "unit" },
    { name: "Banana", type: "fruit", quantity: 3, measureType: "unit" },
    { name: "Carrot", type: "vegetable", quantity: 0.5, measureType: "kilogram" },
    { name: "Spinach", type: "vegetable", quantity: 0.5, measureType: "kilogram" },
    { name: "Chicken", type: "meat", quantity: 2, measureType: "unit" },
    { name: "Rice", type: "other", quantity: 1, measureType: "kilogram" },
    { name: "Milk", type: "beverage", quantity: 1, measureType: "liter" }
  ];
  

  const [ingredientList, setIngredientList] = useState(
    sampleArray
  )

  const handleSubmitDetails = () => {
    router.replace('/(content)/(add)/')
  }

  // SPLICE(INDEX, 1) WOULD BE USEFUL FOR LISTS
  const addIngredient = () => {
    // push to bottom
  }

  const editIngredient = (item: Ingredient, index: number) => {
    console.log(`Item: ${item.name} is on Index: ${index}`)
  }

  const removeIngredient = () => {
    // splice index
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>

      </View>
      <View style={styles.popup}>
        <Text style={styles.addText}>Type: </Text>
        <Text style={styles.addText}>Name: </Text>
        <Text style={styles.addText}>Quantity: </Text>
        <Text style={styles.addText}>Measure: </Text>
      </View>
      <View style={styles.ingredientContainer}>
        <FlatList 
          data={ingredientList}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                onPress={() => editIngredient(item, index)}
              >
                <Ingredients 
                  name={item.name}
                  type={item.type}
                  quantity={item.quantity}
                  measureType={item.measureType}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      
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
    // justifyContent: "center",
    alignItems: "center",
    borderWidth: 4, borderColor: "black",
  },
  header: {
    height: "15%",
    borderWidth: 4, borderColor: "black",
  },
  ingredientContainer: {
    width: "80%",
    height: "30%",
    marginVertical: 30,
    // borderWidth: 4, borderColor: "black",
  },
  popup: {
    width: "100%",
    height: "30%",
    borderColor: "black", borderWidth: 5,
  },
  addText: {
    fontFamily: "PlaypenSemiBold",
  },
})