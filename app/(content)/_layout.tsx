import { Stack } from 'expo-router';

export default function ContentLayout() {
  
  return (
      <Stack>
        <Stack.Screen name="(add)" options={{
          headerBackVisible: true,
          headerTitle: "New Recipe",
        }}/>
        <Stack.Screen name="edit"/>
        <Stack.Screen name="share"/>
      </Stack>
        
    )
}