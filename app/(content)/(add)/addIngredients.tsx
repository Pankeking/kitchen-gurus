import { router } from "expo-router";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { FlatList, Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import WideButton from "../../../components/WideButton";
import Ingredients from "../../../components/AddContent/Ingredients";
import { useRef, useState } from "react";
import { Input } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import SmallButton from "../../../components/SmallButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIngredients } from "../../../redux/slices/contentSlice";

export default function addDetailsScreen() {

  type Ingredient = {
    name: string;
    type: string;
    quantity: number;
    measureType: string;
  }

  const dispatch = useDispatch();

  const nameInputRef:any = useRef(null);
  const amountInputRef:any = useRef(null);

  const [TypeIndex, setTypeIndex] = useState('Fruit');
  const [MeasureIndex, setMeasureIndex] = useState('Kilogram');

  const [TypesExtended, setTypesExtended] = useState(false);
  const [MeasureExtended, setMeasureExtended] = useState(false);

  const [Name, setName] = useState('');
  const [Amount, setAmount] = useState('0');

  const [EditedIndex, setEditedIndex] = useState(0);


  // CONSTANTS
  const ICON_GIGA = 100;
  const ICON_BIG = 32;
  const ICON_MEDIUM = 22;
  const ICON_SMALL = 16;
  const themeColors = useTheme().theme.colors;

  type ItemTypeObj = {
    [key: string]: { type: string; iconName: string; color: string}
  }
  const newTypes:ItemTypeObj = {
    'Fruit': {
      type: "Fruit",     
      iconName: "fruit-cherries", 
      color: "#e74c3c"
    },
    'Vegetable': {
      type: "Vegetable", 
      iconName: "carrot",         
      color: "#2ecc71"
    },
    'Meat': {
      type: "Meat",      
      iconName: "food-turkey",    
      color: "#8B4513"
    },
    'Beverage': {
      type: "Beverage",  
      iconName: "bottle-soda",    
      color: "#3498db"  
    },
    'Grain': {
      type: "Grain",     
      iconName: "corn",           
      color: "#DAA520"  
    },
    'Other': {
      type: "Other",     
      iconName: "dots-hexagon",   
      color: themeColors.darkText  
    },
  }
  type MeasureObj = {
    [key: string]: {type: string; iconName: string; info: string}
  }
  const newMeasure:MeasureObj = {
    "Kilogram": {
      type: "Kilogram", 
      iconName: "weight-kilogram", 
      info: "Kg"},
    "Gram": {
      type: "Gram", 
      iconName: "weight-gram", 
      info: "g"},
    "Liter": {
      type: "Liter", 
      iconName: "cup", 
      info: "L"},
    "Mililiter": {
      type: "Mililiter", 
      iconName: "cup-water", 
      info: "ml"},
    "Unit": {
      type: "Unit", 
      iconName: "numeric", 
      info: "u/n"},
  }

  const isIngredients:boolean = useSelector((state:any) => state.content.isIngredients)
  const storeIngredients:Ingredient[] = useSelector((state:any) => state.content.recipe.ingredients)
  const nullIngredient = [{ name: "", type: "", quantity: 0, measureType: "" },];

  const [ingredientList, setIngredientList] = useState(() => {
    if (isIngredients) {
      return storeIngredients
    } else {
      return nullIngredient
    }
  });

  const handleSubmitDetails = () => {
    dispatch(setIngredients(ingredientList))
    router.replace('/(content)/(add)/')
  }

  const addIngredient = () => {
    if (Name == '') {
      nameInputRef.current.focus()
      nameInputRef.current.shake()
      return;
    }
    let numericValue = parseFloat(Amount)
    if (isNaN(numericValue) || numericValue <= 0) {
      amountInputRef.current.focus();
      amountInputRef.current.shake();
      return;
    }
    const IngredientObject = {
      name: Name,
      type: newTypes[TypeIndex].type,
      quantity: numericValue,
      measureType: newMeasure[MeasureIndex].type
    }
    setIngredientList(current => [...current, IngredientObject])
    // CLEAR
    setName('');
    setAmount('0');
    Keyboard.dismiss();
  }

  const editIngredient = (item: Ingredient, index: number) => {
    setEditedIndex(index);
    setName(item.name);
    setAmount(`${item.quantity}`);
    setTypeIndex(item.type);
    setMeasureIndex(item.measureType);
  }
  const confirmEdit = () => {
    const numericValue = parseFloat(Amount)
    if (isNaN(numericValue) || numericValue <= 0) {
      amountInputRef.current.focus();
      amountInputRef.current.shake();
      return;
    }
    const editedObject = {
      name: Name,
      quantity: numericValue,
      type: TypeIndex,
      measureType: MeasureIndex
    }
    setIngredientList(current => current.slice(0, EditedIndex).concat(editedObject).concat(current.slice(EditedIndex + 1)))
    // CLEAR
    setName('');
    setAmount('0');
    setEditedIndex(0)
    Keyboard.dismiss();
  }

  const removeIngredient = (index: number) => {
    setIngredientList(current => current.slice(0,index).concat(current.slice(index + 1)))
  }

  const changeType = ( type: string ) => {
    setTypesExtended(current => !current)
    setMeasureExtended(false);
    setTypeIndex(type)
  }

  const changeMeasure = ( type: string ) => {
    setMeasureExtended(current => !current)
    setTypesExtended(false);
    setMeasureIndex(type)
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
    // index: number;
    highlighted: boolean;
  }) => {
    const bgColor = props.highlighted ? themeColors.secondary : themeColors.surface;
    const contrasted = props.type === "Other" ? props.highlighted ? themeColors.darkText : themeColors.lightText : props.color;
    return (
    <View style={[styles.formRotation, {backgroundColor: bgColor, shadowColor: themeColors.lightText}]}
    >
      <TouchableOpacity
        style={styles.formButton}
        onPress={() => changeType(props.type)}
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
    highlighted: boolean;
  }) => {
    const bgColor = props.highlighted ? themeColors.secondary : themeColors.surface;
    const contrasted = props.highlighted ? themeColors.surface : themeColors.lightText;
    return (
    <View style={[styles.formRotation, {backgroundColor: bgColor, shadowColor: themeColors.lightText}]}
    >
      <TouchableOpacity
        style={styles.formButton}
        onPress={() => changeMeasure(props.type)}
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
            value={Name}
            onChangeText={setName}
            // onSubmitEditing={handlerFunction}
            inputStyle={[styles.inputText, {color: themeColors.lightText}]}
            inputContainerStyle={styles.inputContainer}
          />
        </View>
        
        <View>
          {!TypesExtended ? (
              <RenderTypes 
                color={newTypes[TypeIndex].color} 
                type={newTypes[TypeIndex].type}
                iconName={newTypes[TypeIndex].iconName}
                // index={TypeIndex}
                flatList={false}
                highlighted={true}
              />
            ) : (
              <FlatList 
                contentContainerStyle={{paddingBottom: 70}}
                data={Object.values(newTypes)}
                keyExtractor={(item) => item.type}
                renderItem={({ item, index }) => (
                    <RenderTypes 
                      color={item.color} 
                      type={item.type} 
                      iconName={item.iconName} 
                      // index={index} 
                      flatList={true}
                      highlighted={item.type === newTypes[TypeIndex].type}
                    />
                )}
              />
            )
          }
        </View>
        
        <View>
          {!MeasureExtended ? (
            <RenderMeasure
              type={newMeasure[MeasureIndex].type}
              iconName={newMeasure[MeasureIndex].iconName}
              info={newMeasure[MeasureIndex].info}
              flatList={false}
              highlighted={true}
            />
          ) : (
            <FlatList 
            contentContainerStyle={{paddingBottom: 140}}
              data={Object.values(newMeasure)}
              renderItem={({ item, index }) => (
                <RenderMeasure 
                  type={item.type}
                  iconName={item.iconName}
                  info={item.info}
                  flatList={true}
                  highlighted={item.type === MeasureIndex}
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
                ref={amountInputRef}
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
                onPress={EditedIndex === 0 ? addIngredient : confirmEdit} 
                title={EditedIndex === 0 ? "Add New" : "Confirm Edit"} 
                size={ICON_BIG} 
                Color={themeColors.primary} 
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
              {index != 0 && (
                <>
                <TouchableOpacity
                  style={styles.flItem}
                  onPress={() => editIngredient(item, index)} // +1 Phase for filtered null
                >
                  <Ingredients 
                    name={item.name}
                    type={item.type}
                    quantity={item.quantity}
                    measureType={item.measureType}
                    highlighted={index === EditedIndex}
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
                </>
              )}
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
  },
  header: {
    marginTop: 15,
  },
  ingredientContainer: {
    width: "80%",
    height: "25%",
    marginVertical: 20,
  },
  formContainer: {
    overflow: "hidden",
    width: "80%",
    height: "40%",
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