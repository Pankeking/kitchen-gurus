import { View } from "../../../components/themedCustom";
import { FlatList, StyleSheet } from "react-native";
import WideButton from "../../../components/WideButton";
import RenderChips from "../../../components/AddContent/RenderChips";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setExtra } from "../../../redux/slices/contentSlice";
import { router } from "expo-router";

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

  const toggleAll = (trueness:boolean) => {
    setSelected((current) => {
      const updatedOptions = {...current};
      for (const key in updatedOptions) {
        if (updatedOptions.hasOwnProperty(key)) {
          updatedOptions[key] = {
            ...updatedOptions[key],
            selected: trueness
          }
        }
      }
      return updatedOptions;
    })
  }

  const handleSubmitExtra = () => {
    dispatch(setExtra(Selected));
    router.replace('/(content)/(add)/');
  }
  

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 30}}></View>
      <View style={styles.example}>
        <RenderChips 
          label={"Select All"}
          icon={"check-circle"}
          selected={true}
          onPress={() => toggleAll(true)}
        />
        <RenderChips 
          label={"Unselect All"}
          icon={"circle-off-outline"}
          selected={false}
          color="red"
          onPress={() => toggleAll(false)}
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
        showsVerticalScrollIndicator={false}
      />
      <View style={{marginBottom: 30}}></View>
      <WideButton 
        iconName={"check-circle"}
        title="Save & Continue"
        onPress={handleSubmitExtra}
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
    justifyContent: "space-around",
    width: "100%"
  },
  flatlistContainer: {
    width: "100%",
    marginBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-around',
    marginBottom: 8,
  },
})