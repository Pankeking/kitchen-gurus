import { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { ThemeProvider, useTheme } from '@rneui/themed';
import theme from "../constants/theme"

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';

import { Provider } from 'react-redux';
import reduxStore from "../redux/store";


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Handlee: require('../assets/fonts/Handlee-Regular.ttf'),
    PlaypenBold: require('../assets/fonts/PlaypenSans-Bold.ttf'),
    PlaypenExtraBold: require('../assets/fonts/PlaypenSans-ExtraBold.ttf'),
    PlaypenExtraLight: require('../assets/fonts/PlaypenSans-ExtraLight.ttf'),
    PlaypenLight: require('../assets/fonts/PlaypenSans-Light.ttf'),
    PlaypenMedium: require('../assets/fonts/PlaypenSans-Medium.ttf'),
    PlaypenRegular: require('../assets/fonts/PlaypenSans-Regular.ttf'),
    PlaypenSemiBold: require('../assets/fonts/PlaypenSans-SemiBold.ttf'),
    PlaypenThin: require('../assets/fonts/PlaypenSans-Thin.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function Navigator() {
  const themeMode = useTheme().theme.mode;
  StatusBar.setBarStyle(themeMode === 'dark' ? 'light-content' : 'dark-content')
  
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(content)" options={{ headerShown: false }} />
    </Stack>
  )
}

function RootLayoutNav() {
  
  return (
    <Provider store={reduxStore}>
      <ThemeProvider theme={theme}>
          <Navigator />
      </ThemeProvider>
    </Provider>
  );
}
