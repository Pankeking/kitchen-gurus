import { Input, useTheme } from "@rneui/themed";
import { Text, ToggleMode, View } from "../../../components/themedCustom";
import { StyleSheet } from "react-native";
import { Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

export default function SearchLayout() {
  const {user, uid, recipeID, recipe} = useGlobalSearchParams<{user:string ,uid: string, recipeID: string, recipe: string}>();
  const themeColors = useTheme().theme.colors;
  return (
      <Stack
        screenOptions={{
          headerBackVisible: false,
          headerShown: true,
          headerStyle: {backgroundColor: themeColors.surface},
          headerTitleStyle: {fontSize: 14, fontFamily: "PlaypenMedium"},
          headerTintColor: themeColors.lightText,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="recipe/[recipe]"
          options={{
            headerTitle: `${recipe}`
          }}
        />
        <Stack.Screen name="user/[user]" 
          options={{
            headerTitle: `${user}`
          }}
        />

      </Stack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})