import { Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

export default function SearchLayout() {
  const { recipe } = useGlobalSearchParams<{recipe: string}>();
  return (
    <Stack
      screenOptions={{
        headerBackVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
        headerShown: true,
        headerTitle: recipe,
        headerTitleStyle: {fontFamily: "PlaypenBold", fontSize: 22}
        }}
        name="[recipe]" 
      />

      {/* <Stack.Screen name="[user]"/> */}
    </Stack>
  )
}