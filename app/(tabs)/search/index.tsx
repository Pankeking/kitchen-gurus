import { useRef, useState } from "react";
import { StyleSheet } from "react-native";

import { Input, useTheme } from "@rneui/themed";

import { Text, View } from "../../../components/themedCustom";
import SmallButton from "../../../components/SmallButton";

import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { searchQuery } from "../../../utils/firebaseUtils";
import QueryChip from "../../../components/Search/QueryChip";
import { queryRecipe } from "../../../redux/slices/contentSlice";

export default function SearchScreen() {

  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState<queryRecipe[]>();

  const themeColors = useTheme().theme.colors;

  const inputRef:any = useRef(null);

  const top = useSharedValue(240);

  
  

  const handleSearch = async () => {
    const resp = await searchQuery(query);
    if (!resp) {
      return;
    }
    if (inputRef.current.isFocused()) {
      top.value = withSpring(40);
    }
    setQueryResult(resp);
    return;
  }


  const handleCancel = () => {
    if (inputRef.current) {
      inputRef.current.clear();
      inputRef.current.shake();
    }
    top.value = withSpring(200);
    setQueryResult([]);
    return;
  }


  const search_icon = <SmallButton  size={40} title="" Color={"black"} onPress={handleSearch} iconName="magnify" />
  const drop_icon = <SmallButton size={40} title="" Color={"black"} onPress={handleCancel} iconName={"close"}/>
  return (
      <View style={styles.container}>
        <Animated.View style={{top}}>
          
          <Input 
            ref={inputRef}
            placeholder="Search for users or recipes" 
            containerStyle={styles.inputContainer}
            inputContainerStyle={{borderBottomWidth: 0}}
            inputStyle={styles.input}
            leftIcon={search_icon}
            leftIconContainerStyle={styles.topFix}
            rightIcon={drop_icon}
            rightIconContainerStyle={styles.topFix}
            maxLength={25}
            onChangeText={setQuery}
            onChange={handleSearch}
          />
          <View style={styles.queryContainer}>
            {/* <QueryChip recipe={queryResult[0]} /> */}
            {queryResult && queryResult.length > 0 && queryResult.map((ele) => 
            <>
              <QueryChip key={ele.recipeID} recipe={ele} />
            </>
            ) }
          </View>

          
          
        </Animated.View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 14,
    width: "90%" 
  },
  input: {
    fontFamily: "PlaypenBold",
    color: "black",
    top: 12,
    left: 6
  },
  topFix: {
    top: 18
  },
  queryContainer: {
    marginTop: 10,
  }
})