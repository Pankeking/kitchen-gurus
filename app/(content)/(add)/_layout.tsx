import { useTheme } from '@rneui/themed';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { CustomIcon, Text } from '../../../components/themedCustom';

export default function AddLayout() {
  const themeColors = useTheme().theme.colors;
  return (
      <Stack
        screenOptions={{
          headerStyle: {backgroundColor: themeColors.surface},
          headerTitleStyle: {fontSize: 14},
          headerTintColor: themeColors.lightText,
          navigationBarColor:"red",
          headerRight: () => (
            <Link href={'/cancelModal'} asChild >
              <Pressable
                >
                {({ pressed }) => (
                  <Text>CANCEL</Text>
                  )}
              </Pressable>
            </Link>
          ),
        }}
      >
        <Stack.Screen name="index" options={{
          headerBackVisible: true,
          headerTitle: "New Recipe",
          
        }}/>
        <Stack.Screen name="cancelModal" options={{
          headerShown: false,
          presentation: "modal",
          headerRight: () => null
        }} />
        <Stack.Screen name="CameraScreen" options={{
          headerShown: false,
          headerRight: () => (<Text>asdasdsa</Text>)
        }} />
        <Stack.Screen name="addPhotoName" options={{
          headerBackVisible: true,
          headerTitle: "Add Photos",
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