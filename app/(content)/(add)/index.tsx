import { StyleSheet } from "react-native";
import { CustomIcon, View } from "../../../components/themedCustom";
import { Input, useTheme } from "@rneui/themed";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Recipe, nullifyRecipe, setName } from "../../../redux/slices/contentSlice";
import CheckList from "../../../components/AddContent/CheckList";
import WideButton from "../../../components/WideButton";
import { uploadRecipe } from "../../../utils/firebaseUtils";
import { FBauth } from "../../../firebase-config";

export default function AddContentScreen() {

  



  const isPhoto         = useSelector((state:any) => state.content.isPhoto);
  const isName          = useSelector((state:any) => state.content.isName);
  const isInstructions  = useSelector((state:any) => state.content.isInstructions);
  const isIngredients   = useSelector((state:any) => state.content.isIngredients);
  const isExtra         = useSelector((state:any) => state.content.isExtra);

  const storeRecipe = useSelector((state:any) => state.content.recipe)

  const themeColors = useTheme().theme.colors;
  const dispatch = useDispatch();
  
  const [InputDisabled, setInputDisabled] = useState(true);
  const [ButtonTitle, setButtonTitle] = useState("");
  const [RecipeName, setRecipeName] = useState("");
  
  const inputRef:any = useRef(null);

  const handleNameChange = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  const handleConfirmName = () => {
    setInputDisabled(true)
    dispatch(setName(RecipeName))
  };

  useEffect(() => {
    if (!InputDisabled) {
      inputRef.current.focus()
      setButtonTitle("Confirm");
    } else {
      inputRef.current.blur()
      setButtonTitle("Name");
    }
  }, [InputDisabled])

  const handleRouting = (route:any) => {
    if (!isPhoto) {
      alert('First Add a Photo')
      router.push('/(content)/(add)/addPhotoName')
    }
    router.push(route)
  }

  const handleSubmitRecipe = (recipe:Recipe) => {
    if (!isPhoto) {
      alert('First Add a Photo')
      router.push('/(content)/(add)/addPhotoName')
    }
    if (!isName) {
      alert("Name your recipe")
    }
    if (!isInstructions) {
      alert("Add Instructions")
      router.push('/(content)/(add)/addInstructions')
    }
    if (!isIngredients) {
      alert("Add Ingredients")
      router.push('/(content)/(add)/addIngredients')
    }
    if (!isExtra) {
      alert("Add Extra details")
      router.push('/(content)/(add)/addExtra')
    }
    const userId = FBauth.currentUser?.uid;
    if (!userId) {
      console.error('User ID is undefined.');
      return
    }
    alert("Uploading on progress");
    // dispatch(nullifyRecipe())
    const response = uploadRecipe(userId,recipe);
    if (response == null) {
      alert("Recipe Upload Failed, try again");
      return
    }
    router.replace('/(tabs)/');
    dispatch(nullifyRecipe());
  }


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer} >
        <CustomIcon 
          name="chef-hat"
          style={{color: themeColors.lightText}}
          size={100}
        />
          <Input 
            ref={inputRef}
            autoCapitalize="sentences"
            placeholder="Fruity juicy cherry..."
            keyboardType="ascii-capable"
            enterKeyHint="enter"
            returnKeyType="done"
            onChangeText={setRecipeName}
            onSubmitEditing={handleConfirmName}
            containerStyle={styles.input}
            spellCheck={false}
            inputStyle={{fontSize: 28, textAlign:"center", fontFamily: "PlaypenSemiBold"}}
            inputContainerStyle={{borderBottomWidth: 0}}
          />
      </View>

      <View style={styles.linksContainer}>

        <CheckList
          iconName="alpha-a-box"
          title={ButtonTitle}
          done={isName}
          onPress={handleNameChange}
        />

        <CheckList 
          iconName={"camera"}
          title="Photos"
          done={isPhoto}
          onPress={() => router.push('/addPhotoName')} 
        />

        <CheckList 
          iconName={"file-document-multiple"}
          title="Instructions"
          done={isInstructions}
          // onPress={() => router.push('/addInstructions')} 
          onPress={() => handleRouting('/addInstructions')} 
        />

        <CheckList 
          iconName={"clock-edit"}
          title="Ingredients"
          done={isIngredients}
          onPress={() => handleRouting('/addIngredients')} 
        />

        <CheckList 
          iconName={"information"}
          title="Extra"
          done={isExtra}
          onPress={() => handleRouting('/addExtra')} 
        />

      </View>

      <View style={styles.separator} />

        <WideButton 
          title="Finish Uploading"
          iconName="form-select"
          onPress={() => handleSubmitRecipe(storeRecipe)}
          // onPress={() => handleSubmitRecipe(testRecipe)}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: "100%",
    marginVertical: 30,
    // borderColor:"green",borderWidth:1,
  },
  input: {
    // height: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    // borderColor: "blue", borderWidth: 1,
  },
  linksContainer: {
    width: "100%",
    paddingHorizontal: "1%",
    // borderColor: "black", borderWidth: 1,

  },
  linkBigContainer: {
    marginVertical: 5,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    // borderColor: "blue", borderWidth: 2,
  },
  leftLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {

  },
  
  separator: {
    width: "100%",
    marginVertical: 30,
  },
  line: {
    width: "98%",
    height: 1,
    opacity: 0.1,
  },
  null: {},
})