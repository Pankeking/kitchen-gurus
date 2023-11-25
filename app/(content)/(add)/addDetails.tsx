import { router } from "expo-router";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { Animated, Easing, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import WideButton from "../../../components/WideButton";
import Ingredients from "../../../components/AddContent/Ingredients";
import { useState } from "react";
import { Input } from "@rneui/base";
import { useTheme } from "@rneui/themed";

export default function addDetailsScreen() {

  type Ingredient = {
    name: string;
    type: string;
    quantity: number;
    measureType: string;
  }

  const [TypeIndex, setTypeIndex] = useState(0);
  const [MeasureIndex, setMeasureIndex] = useState(0);

  const [TypesExtended, setTypesExtended] = useState(false);

  const [Name, setName] = useState('');
  const [Amount, setAmount] = useState(0);

  // CONSTANTS
  const ICON_SIZE = 32;
  const themeColors = useTheme().theme.colors;

  // Animation

  
  const Types = [
    {type: "Fruit",     iconName: "fruit-cherries", color: "#e74c3c"}, // Alizarin
    {type: "Vegetable", iconName: "carrot",         color: "#2ecc71"}, // Emerald
    {type: "Meat",      iconName: "food-turkey",    color: "#8B4513"}, // Saddle Brown
    {type: "Beverage",  iconName: "bottle-soda",    color: "#3498db"}, // Dodger Blue
    {type: "Grain",     iconName: "corn",           color: "#DAA520"}, // Goldenrod
    {type: "Other",     iconName: "dots-hexagon",   color: themeColors.lightText}
  ]

  const Measures = [
    ["Kilogram","weight-kilogram"],
    ["Liter","cup-water"],
    ["Unit","numeric"],
  ]

  

  const sampleArray = [
    { name: "Apple", type: "Fruit", quantity: 1, measureType: "Unit" },
    { name: "Banana", type: "Fruit", quantity: 3, measureType: "Unit" },
    { name: "Carrots straight from garden", type: "Vegetable", quantity: 0.5, measureType: "Kilogram" },
    { name: "Spinach", type: "Vegetable", quantity: 0.5, measureType: "Kilogram" },
    { name: "Chicken", type: "Meat", quantity: 2, measureType: "Unit" },
    { name: "Rice", type: "Grain", quantity: 1, measureType: "Kilogram" },
    { name: "Milk takenwandering mountain goat", type: "Beverage", quantity: 350, measureType: "Liter" }
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

  const removeIngredient = (index: number) => {
    setIngredientList(current => current.slice(0,index).concat(current.slice(index + 1)))
  }

  const changeType = ( index: number ) => {
    setTypesExtended(current => !current)
    setTypeIndex(index)
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

  const RenderTypes = (props: {
    color: string;
    iconName: string;
    type: string;
    flatList: boolean;
    index: number;
  }) => (
    <View style={[styles.formRotation, {backgroundColor: themeColors.surface}]}>
      <TouchableOpacity
        style={styles.formButton}
        onPress={() => changeType(props.index)}
      >
        <View style={[styles.rotateItem, {backgroundColor: themeColors.surface}]}>
          <CustomIcon 
            color={props.color}
            name={props.iconName}
            size={ICON_SIZE}
          />
          <Text style={[styles.rotateText, {color: props.color}]}>{props.type}</Text>
        </View>
        
        <View style={[styles.null, {backgroundColor: themeColors.surface}]}>
          {!props.flatList ? (
            <CustomIcon
            color={themeColors.lightText}
            name="arrow-down-thin"
            size={ICON_SIZE * 0.7}
          />
          ) : (
            <></>

          )

          }
        </View>
      </TouchableOpacity>
    </View>
  )


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomIcon 
          name="chef-hat"
          size={100}
          style={{color: themeColors.lightText}}
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
        
        <View>
          {!TypesExtended ? (
              <RenderTypes 
                color={Types[TypeIndex].color} 
                type={Types[TypeIndex].type}
                iconName={Types[TypeIndex].iconName}
                index={TypeIndex}
                flatList={false}
              />
          ) : (
            <FlatList 
            contentContainerStyle={{paddingBottom: 30}}
              data={Types}
              renderItem={({ item, index }) => (
                  <RenderTypes 
                    color={item.color} 
                    type={item.type} 
                    iconName={item.iconName} 
                    index={index} 
                    flatList={true}
                  />
              )}
            />
          )

          }
        </View>
        

        
        <View style={styles.formItem}>
          <Text style={styles.formText}>Quantity: </Text>
          <View style={styles.amountContainer}>
            <TouchableOpacity 
              style={styles.amountButton}
              onPress={lessAmount}>
              <CustomIcon 
                name="arrow-down-drop-circle"
                color={themeColors.lightText}
                size={ICON_SIZE}
              />
            </TouchableOpacity>
            <Text style={styles.amountText}>{Amount}</Text>
            <TouchableOpacity 
              style={styles.amountButton}
              onPress={addAmount}>
              <CustomIcon 
                name="arrow-up-drop-circle"
                color={themeColors.lightText}
                size={ICON_SIZE}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={[styles.formRotation, {backgroundColor: themeColors.surface}]}>
          <TouchableOpacity
            style={styles.formButton}
            onPress={rotateMeasure}
          >
            <View style={[styles.rotateItem, {backgroundColor: themeColors.surface}]}>
              <CustomIcon
                color={themeColors.lightText}
                name={Measures[MeasureIndex][1]}
                size={ICON_SIZE}
              />
              <Text style={[styles.rotateText, {color: themeColors.lightText}]}>
                {Measures[MeasureIndex][0]}
              </Text>
            </View>

          <View style={[styles.null, {backgroundColor: themeColors.surface}]}>
            {true ? (
              <CustomIcon
              color={themeColors.lightText}
              name="arrow-down-thin"
              size={ICON_SIZE * 0.7}
            />
            ) : (
              <></>

            )

            }
          </View>
          </TouchableOpacity>
        </View>
        
        
        
        
      </View>
      <View style={[styles.ingredientContainer, {height: ingredientList.length < 3 ? `${ingredientList.length * 10}%` : "30%"}]}>
        <FlatList 
          data={ingredientList}
          renderItem={({ item, index }) => (
            <View style={styles.flContainer}>
              <TouchableOpacity
                style={styles.flItem}
                onPress={() => editIngredient(item, index)}
              >
                <Ingredients 
                  name={item.name}
                  type={item.type}
                  quantity={item.quantity}
                  measureType={item.measureType}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.flRemove}
                onPress={() => removeIngredient(index)}
              >
                <CustomIcon 
                  name="minus-circle"
                  color="red"
                  size={ICON_SIZE}
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
    marginTop: 15,
  },
  ingredientContainer: {
    width: "80%",
    // height: "30%",
    marginVertical: 30,
  },
  formContainer: {
    width: "80%",
    height: "30%",
  },
  formItem: {
    marginVertical: 11,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formRotation: {
    marginVertical: 0,
    marginBottom: 11,
    padding: 11,
    borderRadius: 16,
  },
  formButton: {
    width: "100%",
    
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  rotateItem: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  rotateText: {
    textAlign: "left",
    marginLeft: 11,
    fontSize: 18,
    fontFamily: "PlaypenExtraBold",
  },
  
  formText: {
    textAlign: "left",
    fontSize: 18,
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
  },
  
  // FLATLIST RENDER ITEM
  flContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flItem: {
    width: "85%",
  },
  flRemove: {
    justifyContent:"center",
    marginRight: 3,
  },
})