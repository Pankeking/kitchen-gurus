import { Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { ToggleMode } from "../../../components/themedCustom";
import { useTheme } from "@rneui/themed";

export default function SearchLayout() {
  const { recipe } = useGlobalSearchParams<{recipe: string}>();
  const themeColors = useTheme().theme.colors;
  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
        headerShown: false,
        headerStyle: {backgroundColor: themeColors.surface},
        headerTitleStyle: {fontSize: 14, fontFamily: "PlaypenMedium"},
        headerTintColor: themeColors.lightText,
        headerRight: () => <ToggleMode />
      }}
    >
      <Stack.Screen
        options={{
        headerShown: true,
        headerTitle: "What?",
        headerTitleStyle: {fontFamily: "PlaypenBold", fontSize: 22}
        }}
        name="[recipe]" 
      />

      {/* <Stack.Screen name="[user]"/> */}
    </Stack>
  )
}