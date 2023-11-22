import { router } from "expo-router";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import WideButton from "../../../components/WideButton";
import Ingredients from "../../../components/AddContent/Ingredients";
import { useState } from "react";
import { Input } from "@rneui/base";

export default function addDetailsScreen() {

  const [TypeIndex, setTypeIndex] = useState(0);
  const [MeasureIndex, setMeasureIndex] = useState(0);

  const [Name, setName] = useState('');
  const [Amount, setAmount] = useState(0);

  const ICON_SIZE = 32;


  const Types = [
    ["Fruit","fruit-cherries"],
    ["Vegetable","carrot"],
    ["Meat","food-turkey"],
    ["Beverage","bottle-soda"],
    ["Other","dots-hexagon"],
  ]
  const Measures = [
    ["Kilogram","weight-kilogram"],
    ["Liter","cup-water"],
    ["Unit","numeric"],
  ]

  type Ingredient = {
    name: string;
    type: string;
    quantity: number;
    measureType: string;
  }

  const sampleArray = [
    { name: "Apple", type: "Fruit", quantity: 1, measureType: "Unit" },
    { name: "Banana", type: "Fruit", quantity: 3, measureType: "Unit" },
    { name: "Carrot", type: "Vegetable", quantity: 0.5, measureType: "Kilogram" },
    { name: "Spinach", type: "Vegetable", quantity: 0.5, measureType: "Kilogram" },
    { name: "Chicken", type: "Meat", quantity: 2, measureType: "Unit" },
    { name: "Rice", type: "Other", quantity: 1, measureType: "Kilogram" },
    { name: "Milk", type: "Beverage", quantity: 1, measureType: "Liter" }
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

  const rotateType = () => {
    if (TypeIndex < Types.length - 1) {
      setTypeIndex(current => current + 1)
    } else if (TypeIndex == Types.length - 1) {
      setTypeIndex(0)
    } else {
      console.error("Index out of bounds")
    }
  }

  const rotateMeasure = () => {
    if (MeasureIndex < Measures.length - 1) {
      setMeasureIndex(current => current + 1)
    } else if( MeasureIndex == Measures.length - 1) {
      setMeasureIndex(0)
    } else {
      console.error("Index out of bounds")
    }
  }

  const addAmount = () => {
    setAmount(current => current + 1)
  }
  const lessAmount = () => {
    if (Amount > 0) {
      setAmount(current => current - 1)
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomIcon 
          name="chef-hat"
          size={100}
        />
      </View>
      <View style={styles.formContainer}>

        <View style={[styles.formItem, {marginBottom: -10, marginTop: 30}]}>
          <Text style={styles.formText}>Ingredient: </Text>
          <Input 
            // ref={stepInputRef}
            placeholder="Garlic Head"
            spellCheck={false}
            keyboardType="ascii-capable"
            enterKeyHint="enter"
            returnKeyType="done"
            onChangeText={setName}
            // onSubmitEditing={handleAddStep}
            inputStyle={styles.inputText}
            inputContainerStyle={styles.inputContainer}
          />
        </View>

        <View style={[styles.formItem, {marginBottom: 10}]}>
          <TouchableOpacity
            style={styles.formButton}
            onPress={rotateType}
          >
            <Text style={styles.formText}>
              {Types[TypeIndex][0]}
            </Text>
            <CustomIcon 
              name={Types[TypeIndex][1]}
              size={ICON_SIZE}
            />
          </TouchableOpacity>
        </View>

        
        <View style={styles.formItem}>
          <Text style={styles.formText}>Quantity: </Text>
          <View style={styles.amountContainer}>
            <TouchableOpacity 
              style={styles.amountButton}
              onPress={addAmount}>
              <CustomIcon 
                name="plus-circle"
                size={ICON_SIZE}
              />
            </TouchableOpacity>
            <Text style={styles.amountText}>{Amount}</Text>
            <TouchableOpacity 
              style={styles.amountButton}
              onPress={lessAmount}>
              <CustomIcon 
                name="minus-circle"
                size={ICON_SIZE}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formItem}>
          <TouchableOpacity
            style={styles.formButton}
            onPress={rotateMeasure}
          >
            <Text style={styles.formText}>
              {Measures[MeasureIndex][0]}
            </Text>
            <CustomIcon
              name={Measures[MeasureIndex][1]}
              size={ICON_SIZE}
            />
          </TouchableOpacity>
        </View>
        
        
        
        
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
  },
  header: {
    // height: "15%",
    // borderWidth: 4, borderColor: "black",
  },
  ingredientContainer: {
    width: "80%",
    height: "30%",
    marginVertical: 30,
    // borderWidth: 4, borderColor: "black",
  },
  formContainer: {
    width: "80%",
    height: "30%",
    // borderColor: "black", borderWidth: 5,
  },
  formItem: {
    marginVertical: 11,
    flexDirection: "row",
    // borderColor: "black", borderWidth: 5,
  },
  formButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  formText: {
    textAlign: "left",
    fontSize: 24,
    fontFamily: "PlaypenSemiBold",
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    paddingTop: 10,
    marginVertical: -10,
    fontSize: 32,
  },
  amountText: {
    fontSize: 24,
    fontFamily: "PlaypenSemiBold",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  amountButton: {
    marginHorizontal: 11,
  }
})