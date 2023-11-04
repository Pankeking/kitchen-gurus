import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { Button, Input, useTheme } from "@rneui/themed";
import { Link, router } from "expo-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { nullifyRecipe } from "../../../redux/slices/contentSlice";
import { LinearGradient } from "expo-linear-gradient";
import { FBauth } from "../../../firebase-config";
import CheckList from "../../../components/AddContent/CheckList";

export default function AddContentScreen() {

  const isPhotoName    = useSelector((state:any) => state.content.isPhotoName);
  const isInstructions = useSelector((state:any) => state.content.isInstructions);
  const isDetails      = useSelector((state:any) => state.content.isDetails);
  const isExtra        = useSelector((state:any) => state.content.isExtra);

  const themeColors = useTheme().theme.colors;
  const dispatch = useDispatch();

  const [TempTest, setTempTest] = useState(false);
  
  const userPhoto = FBauth.currentUser?.photoURL;


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer} >
        <View style={styles.photoContainer}>
        {userPhoto &&
          <Image 
            source={{uri: userPhoto}} 
            style={[styles.photo, {borderColor: themeColors.surface}]}
            resizeMode="stretch"

          />
        }
        </View>
        {/* <ScrollView> */}
          <Input 
            // style={styles.input}
            autoCapitalize="sentences"
            placeholder="Fruity juicy cherry..."
            // multiline
            keyboardType="ascii-capable"
            returnKeyType="done"
            containerStyle={styles.input}
            
            
          />
        {/* </ScrollView> */}
      </View>

      <View style={styles.linksContainer}>
        <View style={{width: 150, height: 30}}>
          <TouchableOpacity onPress={() => setTempTest((prev) => !prev)}>
            {TempTest ? <Text>DONE</Text> : <Text>NOT DONE</Text>}
            
          </TouchableOpacity>
        </View>

        <View style={[styles.line, {backgroundColor: themeColors.lightText}]} />

        <CheckList 
          iconName={"camera"}
          title="Add a Dash of Flavor with Pictures!"
          done={isPhotoName}
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
        
        <View style={styles.buttonContainer}>
            <LinearGradient
                colors={[themeColors.primary, themeColors.accent]}
                style={styles.gradient}
              >
              <Button 
                buttonStyle={styles.button}
                icon={<CustomIcon
                  name="form-select"
                  size={22}
                  style={{color: themeColors.background}}
                  />} 
                iconPosition="right"
                size="lg" 
                title="Finish uploading"  
                onPress={() => alert("uploaded")}
              />
            </LinearGradient>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    // borderColor:"blue",borderWidth:1,
    // justifyContent: "center",
    alignItems: "center",
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
  inputContainer: {
    flexDirection: "row",
    height: 140,
    width: "100%",
    marginBottom: 30,
    // borderColor:"green",borderWidth:1,
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

  buttonContainer: {
    width: "80%",
    height: 50,
  },
  gradient: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "transparent",
    width: "100%",
  },
})