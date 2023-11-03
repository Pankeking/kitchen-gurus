import { StyleSheet, TouchableOpacity } from "react-native";
import { CustomIcon, Text, View } from "../../../components/themedCustom";
import { Input } from "@rneui/themed";
import { Link, router } from "expo-router";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function AddContentScreen() {

  const isPhotoName    = useSelector((state:any) => state.content.isPhotoName);
  const isInstructions = useSelector((state:any) => state.content.isInstructions);
  const isDetails      = useSelector((state:any) => state.content.isDetails);
  const isExtra        = useSelector((state:any) => state.content.isExtra);

  const [TempTest, setTempTest] = useState(false);
  
  const ICON_SIZE = 24;

  return (
    <View style={styles.container}>
      <Text style={{ color: "green"}}>Select a photo to showcase your recipe</Text>
      <Input 
        style={styles.input}
        autoCapitalize="none"
        placeholder="First add water..."
        multiline
      />
      <View style={styles.linksContainer}>

        <View style={{width: 150, height: 30}}>
          <TouchableOpacity onPress={() => setTempTest((prev) => !prev)}>
            {TempTest ? <Text>DONE</Text> : <Text>NOT DONE</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.linkBigContainer}>
          <Link style={styles.null} href={'/addPhotoName'}>
            <CustomIcon size={ICON_SIZE} name="camera" />
            <Text style={styles.linkText}> Add pictures of your recipe! </Text>
          </Link>
            {isPhotoName ? <CustomIcon size={ICON_SIZE} name="checkbox-marked-circle" style={{color: "green"}} />
              : <CustomIcon size={ICON_SIZE} name="close-box" style={{color: "red"}} />
            }
        </View>

        <View style={styles.linkBigContainer}>
          <Link href={'/addInstructions'}>
            <CustomIcon size={ICON_SIZE} name="file-document" />
            <Text> Add Recipe Instructions </Text>
          </Link>
            {TempTest ? <CustomIcon size={ICON_SIZE} name="checkbox-marked-circle" style={{color: "green"}} />
              : <CustomIcon size={ICON_SIZE} name="close-box" style={{color: "red"}} />
            }
        </View>

        <View style={styles.linkBigContainer}>
          <Link href={'/addOther'}>
            <CustomIcon size={ICON_SIZE} name="camera" />
            <Text> Add other relevant info  </Text>
          </Link>
            {TempTest ? <CustomIcon size={ICON_SIZE} name="checkbox-marked-circle" style={{color: "green"}} />
              : <CustomIcon size={ICON_SIZE} name="close-box" style={{color: "red"}} />
            }
        </View>
          
        <View style={styles.linkBigContainer}>
          <Link href={'/addDetails'}>
            <CustomIcon size={ICON_SIZE} name="camera" />
            <Text> Add Ingredients and details </Text>
          </Link>
          {TempTest ? <CustomIcon size={ICON_SIZE} name="checkbox-marked-circle" style={{color: "green"}} />
            : <CustomIcon size={ICON_SIZE} name="close-box" style={{color: "red"}} />
          }
        </View>
      </View>
      <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)/')}
        >
          <Text style={{color: "blue"}}>Go Home</Text>
        </TouchableOpacity>
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
  linksContainer: {
    width: "100%",
    paddingHorizontal: "1%",
    borderColor: "black", borderWidth: 1,

  },
  linkBigContainer: {
    marginVertical: 5,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    borderColor: "blue", borderWidth: 2,
  },
  linkText: {
    // alignItems: "center",
    // justifyContent: "center",
    borderColor: "green", borderWidth: 2,
    color: "red",
    textAlignVertical: "top",
  },
  input: {
    height: "20%",
  },
  separator: {
    width: "100%",
    marginVertical: 30,
  },
  null: {},
})