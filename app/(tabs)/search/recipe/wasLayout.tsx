import { Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

import { useTheme } from "@rneui/themed";
import { ToggleMode } from "../../../../components/themedCustom";

export default function SearchLayout() {
  const { recipe } = useGlobalSearchParams<{recipe: string}>();
  const themeColors = useTheme().theme.colors;
  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
        headerShown: true,
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
    </Stack>
  )
}