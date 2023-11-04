import { useTheme } from '@rneui/themed';
import { Stack } from 'expo-router';

export default function AddLayout() {
  const themeColors = useTheme().theme.colors;
  return (
      <Stack
        screenOptions={{
          headerStyle: {backgroundColor: themeColors.background},
          headerTintColor: themeColors.lightText,
        }}
      >
        <Stack.Screen name="index" options={{
          headerBackVisible: true,
          headerTitle: "Photo",
        }}/>
        <Stack.Screen name="addPhotoName" options={{
          headerBackVisible: true,
          headerTitle: "Name",
        }}/>
        <Stack.Screen name="addInstructions" options={{
          headerBackVisible: true,
          headerTitle: "Instructions",
        }}/>
        <Stack.Screen name="addOther" options={{
          headerBackVisible: true,
          headerTitle: "Other",
        }}/>
        <Stack.Screen name="addDetails" options={{
          headerBackVisible: true,
          headerTitle: "Details",
        }}/>
      </Stack>
        
    )
}