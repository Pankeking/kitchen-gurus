import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from 'expo-router';
import { Pressable, View, useColorScheme } from 'react-native';

import { Colors } from '../../constants/Colors';

export default function LoginLayout() {
  const colorScheme = useColorScheme();



  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="login" options={{ headerShown: true}} />
      <Stack.Screen name="register" options={{ headerShown: true}} />
    </Stack>
  )
}