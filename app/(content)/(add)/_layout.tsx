import { Stack } from 'expo-router';

export default function AddLayout() {
  
  return (
      <Stack>
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