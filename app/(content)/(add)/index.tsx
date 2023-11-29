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

  

  const testRecipe = {
    "name": "Cherry pie",
    "instructions": [
      {"subtitle": "", "steps": ["Step 1", "Step 2"]},
      {"subtitle": "Prepare", "steps": ["Step 3", "Step 4"]},
      {"subtitle": "Eat", "steps": ["Step 5", "Step 6"]}
    ],
    "photo": [
      {
        "uri": "file:///var/mobile/Containers/Data/Application/FF65DBA6-5D86-44CD-A111-BCABB76A505A/Library/Caches/ExponentExperienceData/%2540anonymous%252Fhulala-yarn-6b243c9f-e041-4521-ab68-7b358cba9d12/ImagePicker/5923826B-FE9C-4E1F-83D3-1F18CEA8BEFB.jpg",
        "type": "image",
        "width": 1904,
        "height": 1904,
        "fileSize": 1885197
      },
      {
        "uri": "file:///var/mobile/Containers/Data/Application/FF65DBA6-5D86-44CD-A111-BCABB76A505A/Library/Caches/ExponentExperienceData/%2540anonymous%252Fhulala-yarn-6b243c9f-e041-4521-ab68-7b358cba9d12/ImagePicker/5F89B3C0-747D-491E-B0F8-E9A588B9B2F8.jpg",
        "type": "image",
        "width": 1440,
        "height": 1440,
        "fileSize": 4185530
      }
    ],
    "ingredients": [
      {"name": "", "type": "", "quantity": 0, "measureType": ""},
      {"name": "Jajaaj", "type": "Fruit", "quantity": 3, "measureType": "Kilogram"}
    ],
    "extra": {
      "Allergen-Free": {"label": "Allergen-Free", "selected": false},
      "Dairy-Free": {"label": "Dairy-Free", "selected": false},
      "Vegetarian": {"label": "Vegetarian", "selected": false},
      "Whole30": {"label": "Whole30", "selected": false}
    }
  }
  


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
    // MASKED FOR TESTING
    // if (!isPhoto) {
    //   alert('First Add a Photo')
    //   router.push('/(content)/(add)/addPhotoName')
    // }
    // if (!isName) {
    //   alert("Name your recipe")
    // }
    // if (!isInstructions) {
    //   alert("Add Instructions")
    //   router.push('/(content)/(add)/addInstructions')
    // }
    // if (!isIngredients) {
    //   alert("Add Ingredients")
    //   router.push('/(content)/(add)/addIngredients')
    // }
    // if (!isExtra) {
    //   alert("Add Extra details")
    //   router.push('/(content)/(add)/addExtra')
    // }
    // MASKED FOR TESTING
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
    console.log(response);
    return
    router.replace('/(tabs)/profile');
    dispatch(nullifyRecipe);
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