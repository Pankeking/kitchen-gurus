import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../../components/themedCustom";
import { Input, useTheme } from "@rneui/themed";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { nullifyRecipe, setName } from "../../../redux/slices/contentSlice";
import { FBauth } from "../../../firebase-config";
import CheckList from "../../../components/AddContent/CheckList";
import WideButton from "../../../components/WideButton";

export default function AddContentScreen() {

  const isPhoto        = useSelector((state:any) => state.content.isPhoto);
  const isName         = useSelector((state:any) => state.content.isName);
  const isInstructions = useSelector((state:any) => state.content.isInstructions);
  const isDetails      = useSelector((state:any) => state.content.isDetails);
  const isExtra        = useSelector((state:any) => state.content.isExtra);

  const themeColors = useTheme().theme.colors;
  const dispatch = useDispatch();

  const [TempTest, setTempTest] = useState(false);
  
  const userPhoto = FBauth.currentUser?.photoURL;
  const [InputDisabled, setInputDisabled] = useState(true);
  const [ButtonTitle, setButtonTitle] = useState("");
  const [RecipeName, setRecipeName] = useState("");
  
  const inputRef:any = useRef(null);
  const handleNameChange = () => {
    if (inputRef.current) {
      setInputDisabled(false)
    }
  }
  const handleConfirmName = () => {
    setInputDisabled(true)
    dispatch(setName(RecipeName))
  };

  useEffect(() => {
    if (!InputDisabled) {
      inputRef.current.focus()
      setButtonTitle("Confirm Your Creation's Name");
    } else {
      inputRef.current.blur()
      setButtonTitle("Name Your Culinary Creation");
    }
  }, [InputDisabled])


  return (
    <View style={styles.container}>
      <View style={{marginVertical: 10}} />
      <View style={styles.inputContainer} >
        <View style={styles.photoContainer}>
        {userPhoto ?
          <Image 
            source={{uri: userPhoto}} 
            style={[styles.photo, {borderColor: themeColors.surface}]}
            resizeMode="stretch"
          />
          : <Text> Loading... </Text>
        }
        </View>

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
            disabled={InputDisabled}
          />
      </View>

      <View style={styles.linksContainer}>
        <View style={{width: 150, height: 30}}>
          <TouchableOpacity onPress={() => setTempTest((prev) => !prev)}>
            {TempTest ? <Text>DONE</Text> : <Text>NOT DONE</Text>}
          </TouchableOpacity>
        </View>

        <View style={[styles.line, {backgroundColor: themeColors.lightText}]} />

        <CheckList
          iconName="abacus"
          title={ButtonTitle}
          done={isName}
          onPress={handleNameChange}
        />

        <View style={[styles.line, {backgroundColor: themeColors.lightText}]} />

        <CheckList 
          iconName={"camera"}
          title="Add a Dash of Flavor with Pictures!"
          done={isPhoto}
          onPress={() => router.push('/addPhotoName')} 
        />

        <View style={[styles.line, {backgroundColor: themeColors.lightText}]} />

        <CheckList 
          iconName={"file-document-multiple"}
          title="Craft a Culinary Tale..."
          done={TempTest}
          onPress={() => router.push('/addInstructions')} 
        />

        <View style={[styles.line, {backgroundColor: themeColors.lightText}]} />

        <CheckList 
          iconName={"information"}
          title="Serve with a Side of Information"
          done={TempTest}
          onPress={() => router.push('/addOther')} 
        />

          
        <View style={[styles.line, {backgroundColor: themeColors.lightText}]} />

        <CheckList 
          iconName={"clock-edit"}
          title="List the Stars of Your Dish"
          done={TempTest}
          onPress={() => router.push('/addDetails')} 
        />

      </View>

      <View style={[styles.line, {backgroundColor: themeColors.lightText}]} />

      <View style={styles.separator} />

        <TouchableOpacity
          onPress={() => {
            dispatch(nullifyRecipe())
            router.replace('/(tabs)/');
          }}
        >
          <Text style={{color: "blue"}}>Go Home</Text>
        </TouchableOpacity>
        
        <View style={styles.separator} />
        
        <WideButton 
          title="Finish Uploading"
          iconName="form-select"
          onPress={() => alert("Uploaded")}
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
    flexDirection: "row",
    height: 140,
    width: "100%",
    marginBottom: 30,
    // borderColor:"green",borderWidth:1,
  },
  photoContainer: {
    width: 90,
    height: 120,
    // borderColor:"#f00f00",borderWidth:4,
    marginHorizontal: 5,
  },
  photo: {
    width: 90,
    height: 120,
    borderWidth: 3,
  },
  
  input: {
    // height: "30%",
    width: "60%",
    // maxWidth: "50%",
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