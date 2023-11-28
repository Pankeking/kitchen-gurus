import { useTheme } from '@rneui/themed';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { CustomIcon, ToggleMode } from '../../../components/themedCustom';
import { useSelector } from 'react-redux';

export default function AddLayout() {
  const themeColors = useTheme().theme.colors;

  const isName = useSelector((state:any) => state.content.isName);
  const recipeName = useSelector((state:any) => state.content.recipe.name);
  const instructionsAmount = useSelector((state:any) => state.content.recipe.instructions.length) - 1 // Account for null[0]

  return (
      <Stack
        screenOptions={{
          headerBackVisible: false,
          headerStyle: {backgroundColor: themeColors.surface},
          headerTitleStyle: {fontSize: 14, fontFamily: "PlaypenMedium"},
          headerTintColor: themeColors.lightText,
          navigationBarColor:"red",
          headerRight: () => (
            <>
            <Link href={'/cancelModal'} asChild >
              <Pressable
                >
                {({ pressed }) => (
                  <CustomIcon name="cancel" style={{color: themeColors.lightText}} size={32} />
                  )}
              </Pressable>
            </Link>
            <ToggleMode />
            </>
          ),
          headerLeft: () => (
            <Link href={'/(content)/(add)/'} asChild >
              <Pressable
                >
                {({ pressed }) => (
                  <CustomIcon name="arrow-u-left-top" style={{color: themeColors.lightText}} size={32} />
                  )}
              </Pressable>
            </Link>
          ),
        }}
      >
        <Stack.Screen name="index" options={{
          headerTitle: isName ? recipeName : "New Recipe",
          headerLeft: () => null
        }}/>
        <Stack.Screen name="cancelModal" options={{
          headerShown: false,
          presentation: "modal",
        }} />
        <Stack.Screen name="CameraScreen" options={{
          headerShown: false,
        }} />
        <Stack.Screen name="addPhotoName" options={{
          headerTitle: "Add Photos",
        }}/>
        <Stack.Screen name="addInstructions" options={{
          headerTitle: `${instructionsAmount} Instructions`,
        }}/>
        <Stack.Screen name="addExtra" options={{
          headerTitle: "Extra",
        }}/>
        <Stack.Screen name="addIngredients" options={{
          headerTitle: "Ingredients",
        }}/>
      </Stack>
        
    )
}