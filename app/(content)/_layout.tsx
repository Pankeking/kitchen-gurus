import { Stack } from 'expo-router';

export default function ContentLayout() {
  
  return (
      <Stack>
        <Stack.Screen name="(add)" options={{
          headerBackVisible: true,
          headerShown: false,
        }}/>
      </Stack>
        
    )
}