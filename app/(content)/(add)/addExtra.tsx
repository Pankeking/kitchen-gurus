import { View } from "../../../components/themedCustom";
import { FlatList, StyleSheet } from "react-native";
import WideButton from "../../../components/WideButton";
import RenderChips from "../../../components/AddContent/RenderChips";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setExtra } from "../../../redux/slices/contentSlice";

export default function addDetailScreen() {
  type dietOptions = {
    [key: string] : {label: string; icon: string; selected: boolean};
  }
  const dietOptions:dietOptions = useSelector((state:any) => state.content.recipe.extra)
  const [Selected, setSelected] = useState(dietOptions);

  const dispatch = useDispatch();

  const updateItem = (item:string) => {
    setSelected((current) => {
      const updatedOptions = {...current};
      updatedOptions[item] = {
        ...updatedOptions[item],
        selected: !updatedOptions[item].selected
      }
      return updatedOptions;
    })
  }

  const changeAll = (trueness:boolean) => {
    
  }
  

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 30}}></View>
      <View style={styles.example}>
        <RenderChips 
          label={"Select All"}
          icon={"check-circle"}
          selected={true}
          onPress={() => null}
        />
        <RenderChips 
          label={"Unselect All"}
          icon={"circle-off-outline"}
          selected={false}
          color="red"
          onPress={() => null}
        />
      </View>
      <FlatList
        data={Object.values(Selected)}
        renderItem={({ item, index}) => (
            <RenderChips
              label={item.label}
              icon={item.icon}
              selected={item.selected}
              onPress={() => updateItem(item.label)}
            />
          )}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        numColumns={2} // Display three items per row
        contentContainerStyle={styles.flatlistContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
      <View style={{marginBottom: 30}}></View>
      <WideButton 
        iconName={"check-circle"}
        title="Save & Continue"
        onPress={() => dispatch(setExtra(Selected))}
      />
      <View style={{marginBottom: 50}}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  null: {},
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  example: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
  },
  flatlistContainer: {
    width: "100%",
    marginBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Adjust as needed
    marginBottom: 8, // Adjust the separation between rows
  },
  
})