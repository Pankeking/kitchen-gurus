import { router } from "expo-router";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import WideButton from "../../../components/WideButton";
import Ingredients from "../../../components/AddContent/Ingredients";
import { useRef, useState } from "react";
import { Input } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import SmallButton from "../../../components/SmallButton";

export default function addDetailsScreen() {

  type Ingredient = {
    name: string;
    type: string;
    quantity: number;
    measureType: string;
  }

  const nameInputRef:any = useRef(null)

  const [TypeIndex, setTypeIndex] = useState(0);
  const [MeasureIndex, setMeasureIndex] = useState(0);

  const [TypesExtended, setTypesExtended] = useState(false);
  const [MeasureExtended, setMeasureExtended] = useState(false);

  const [Name, setName] = useState('');
  const [Amount, setAmount] = useState('0');


  // CONSTANTS
  const ICON_GIGA = 100;
  const ICON_BIG = 32;
  const ICON_MEDIUM = 22;
  const ICON_SMALL = 16;
  const themeColors = useTheme().theme.colors;

  // Animation

  const Types = [
    {type: "Fruit",     iconName: "fruit-cherries", color: "#e74c3c"}, // Alizarin
    {type: "Vegetable", iconName: "carrot",         color: "#2ecc71"}, // Emerald
    {type: "Meat",      iconName: "food-turkey",    color: "#8B4513"}, // Saddle Brown
    {type: "Beverage",  iconName: "bottle-soda",    color: "#3498db"}, // Dodger Blue
    {type: "Grain",     iconName: "corn",           color: "#DAA520"}, // Goldenrod
    {type: "Other",     iconName: "dots-hexagon",   color: themeColors.darkText}
  ]
  
  const Measures = [
    {type: "Kilogram", iconName: "weight-kilogram", info: "Kg"},
    {type: "Gram", iconName: "weight-gram", info: "g"},
    {type: "Liter", iconName: "cup", info: "L"},
    {type: "Mililiter", iconName: "cup-water", info: "ml"},
    {type: "Unit", iconName: "numeric", info: "u/n"},
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

  const addIngredient = () => {
    if (Name == '') {
      nameInputRef.current.focus()
      nameInputRef.current.shake()
      return;
    }
    let numericValue = parseFloat(Amount)
    if (isNaN(numericValue)) {
      numericValue = 0;
    }
    const IngredientObject = {
      name: Name,
      type: Types[TypeIndex].type,
      quantity: numericValue,
      measureType: Measures[MeasureIndex].type
    }
    setIngredientList(current => [...current, IngredientObject])
    // CLEAR
    setTypeIndex(0);
    setMeasureIndex(0);
    setName('');
    setAmount('0');

  }

  const editIngredient = (item: Ingredient, index: number) => {
    console.log(`Item: ${item.name} is on Index: ${index}`)
  }

  const removeIngredient = (index: number) => {
    setIngredientList(current => current.slice(0,index).concat(current.slice(index + 1)))
  }

  const changeType = ( index: number ) => {
    setTypesExtended(current => !current)
    setMeasureExtended(false);
    setTypeIndex(index)
  }

  const changeMeasure = (index: number) => {
    setMeasureExtended(current => !current)
    setTypesExtended(false);
    setMeasureIndex(index)
  }

  const addAmount = () => {
    const numericValue = parseFloat(Amount)
    if(!isNaN(numericValue)) {
      setAmount(`${numericValue + 1}`)
      return
    }
    setAmount('0')
  }
  const lessAmount = () => {
    const numericValue = parseFloat(Amount)
    if (isNaN(numericValue)) {
      setAmount('0');
      return;
    }
    if (numericValue > 0) {
      setAmount(`${numericValue - 1}`)
    }
  }

  const RenderTypes = (props: {
    color: string;
    iconName: string;
    type: string;
    flatList: boolean;
    index: number;
    highlighted: boolean;
  }) => {
    const bgColor = props.highlighted ? themeColors.secondary : themeColors.surface;
    const contrasted = props.type === "Other" ? props.highlighted ? themeColors.darkText : themeColors.lightText : props.color;
    return (
    <View style={[styles.formRotation, {backgroundColor: bgColor, shadowColor: themeColors.lightText}]}
    >
      <TouchableOpacity
        style={styles.formButton}
        onPress={() => changeType(props.index)}
      >
        <View style={[styles.rotateItem, {backgroundColor: bgColor}]}>
          <CustomIcon 
            color={contrasted}
            name={props.iconName}
            size={ICON_BIG}
          />
          <Text style={[styles.rotateText, {color: contrasted}]}>
            {props.type}
          </Text>
        </View>
        <View style={[styles.null, {backgroundColor: bgColor}]}>
          {!props.flatList ? (
              <CustomIcon
                color={themeColors.surface}
                name="arrow-down-thin"
                size={ICON_MEDIUM}
              />
            ) : (
              <CustomIcon 
                color={contrasted}
                name="circle"
                size={ICON_SMALL}
              />
            )
          }
        </View>
      </TouchableOpacity>
    </View>
  )}

  const RenderMeasure = (props: {
    type: string;
    iconName: string;
    info: string;
    flatList: boolean;
    index: number;
    highlighted: boolean;
  }) => {
    const bgColor = props.highlighted ? themeColors.secondary : themeColors.surface;
    const contrasted = props.highlighted ? themeColors.surface : themeColors.lightText;
    return (
    <View style={[styles.formRotation, {backgroundColor: bgColor, shadowColor: themeColors.lightText}]}
    >
      <TouchableOpacity
        style={styles.formButton}
        onPress={() => changeMeasure(props.index)}
      >
        <View style={[styles.rotateItem, {backgroundColor: bgColor}]}>
          <CustomIcon
            color={contrasted}
            name={props.iconName}
            size={ICON_BIG}
          />
          <Text style={[styles.rotateText, {color: contrasted}]}>
            {props.type}
          </Text>
        </View>

      <View style={[styles.null, {backgroundColor: bgColor}]}>
        {!props.flatList ? (
            <CustomIcon
              color={contrasted}
              name="arrow-down-thin"
              size={ICON_MEDIUM}
            />
          ) : (
            <View style={{backgroundColor: bgColor, marginLeft: 7}}>
              <Text style={{fontSize: 16, fontFamily: "PlaypenBold", color: contrasted}}>
                {props.info}
              </Text>
            </View>
          )
        }
      </View>
      </TouchableOpacity>
    </View>
  )}


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomIcon 
          name="chef-hat"
          size={ICON_GIGA}
          style={{color: themeColors.lightText}}
        />
      </View>
      <View style={styles.formContainer}>

        <View style={styles.nameTitle}>
          <Input 
            ref={nameInputRef}
            placeholder="Garlic Head"
            spellCheck={false}
            keyboardType="ascii-capable"
            enterKeyHint="enter"
            returnKeyType="done"
            textAlign="center"
            onChangeText={setName}
            // onSubmitEditing={handlerFunction}
            inputStyle={[styles.inputText, {color: themeColors.lightText}]}
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
                highlighted={true}
              />
            ) : (
              <FlatList 
                contentContainerStyle={{paddingBottom: 70}}
                data={Types}
                renderItem={({ item, index }) => (
                    <RenderTypes 
                      color={item.color} 
                      type={item.type} 
                      iconName={item.iconName} 
                      index={index} 
                      flatList={true}
                      highlighted={index == TypeIndex}
                    />
                )}
              />
            )
          }
        </View>
        
        <View>
          {!MeasureExtended ? (
            <RenderMeasure
              type={Measures[MeasureIndex].type}
              iconName={Measures[MeasureIndex].iconName}
              index={MeasureIndex}
              info={Measures[MeasureIndex].info}
              flatList={false}
              highlighted={true}
            />
          ) : (
            <FlatList 
            contentContainerStyle={{paddingBottom: 140}}
              data={Measures}
              renderItem={({ item, index }) => (
                <RenderMeasure 
                  type={item.type}
                  iconName={item.iconName}
                  info={item.info}
                  flatList={true}
                  index={index}
                  highlighted={index == MeasureIndex}
                />
              )}
            />
          )}
          
        </View>
          <View style={styles.amountContainer}>
            <View style={styles.amounterButtons}>
              <TouchableOpacity 
                style={styles.amountButton}
                onPress={addAmount}>
                <CustomIcon 
                  name="arrow-up-drop-circle"
                  color={themeColors.lightText}
                  size={ICON_MEDIUM}
                  />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.amountButton}
                onPress={lessAmount}>
                <CustomIcon 
                  name="arrow-down-drop-circle"
                  color={themeColors.lightText}
                  size={ICON_MEDIUM}
                />
              </TouchableOpacity>    
            </View>
            
            <View style={{width: "30%", marginRight: "auto"}}>
              <Input 
                // ref={stepInputRef}
                spellCheck={false}
                keyboardType="numeric"
                enterKeyHint="enter"
                returnKeyType="done"
                value={Amount}
                onChangeText={setAmount}
                textAlign="center"
                maxLength={6}
                // onSubmitEditing={handlerFunction}
                inputStyle={[styles.null, {color: themeColors.lightText}]}
                inputContainerStyle={[styles.amountInputContainer, {backgroundColor: themeColors.surface}]}
              />
            </View>
            <View style={styles.amounterButtons}>
              <SmallButton 
                onPress={addIngredient} 
                title="confirm" 
                size={32} 
                Color={themeColors.gradOrange} 
                iconName={"check-circle"}
              />
            </View>
            
          </View>
        
        
      </View>
      <View style={styles.ingredientContainer}>
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
                  size={ICON_MEDIUM}
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
    alignItems: "center",
    // borderWidth: 4, borderColor: "black",
  },
  header: {
    marginTop: 15,
    // borderWidth: 4, borderColor: "black",
  },
  ingredientContainer: {
    width: "80%",
    height: "25%",
    marginVertical: 20,
    // borderWidth: 4, borderColor: "black",
  },
  formContainer: {
    overflow: "hidden",
    width: "80%",
    height: "40%",
    // borderWidth: 4, borderColor: "black",
  },
  
  nameTitle: {
    marginVertical: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  formRotation: {
    marginHorizontal: 11,
    marginVertical: 9,
    padding: 9,
    paddingHorizontal: 17,
    borderRadius: 16,
    shadowOffset: {width: 2, height: 3},
    shadowRadius: 5,
    shadowOpacity: 0.4,
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

  //
  
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

  // AMOUNT
  amountText: {
    fontSize: 24,
    fontFamily: "PlaypenSemiBold",
  },
  amountContainer: {
    marginVertical: 11,
    flexDirection: "row",
  },
  amounterButtons: {
    justifyContent: "space-evenly",
  },
  amountButton: {
    marginHorizontal: 11,
  },
  amountInputText: {

  },
  amountInputContainer: {
    marginTop: 15,
    width: "100%",
    borderWidth: 2,
    borderRadius: 12,
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