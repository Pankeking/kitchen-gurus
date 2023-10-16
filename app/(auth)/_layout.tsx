import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { View } from "../../components/Themed";

export default function LoginLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="login" options={{ headerShown: false}} />
      <Stack.Screen name="register" options={{ headerShown: false}} />
    </Stack>
  )
}