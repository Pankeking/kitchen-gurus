import { Stack } from 'expo-router';

export default function ContentLayout() {
  
  return (
      <Stack>
        <Stack.Screen name="(add)" options={{
          headerBackVisible: true,
          headerShown: false,
        }}/>
        <Stack.Screen name="(view)" options={{
          headerBackVisible: true,
          headerShown: false,
        }}/>
        <Stack.Screen name="edit"/>
        <Stack.Screen name="share"/>
      </Stack>
        
    )
}