import { isLoaded, useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontLoaded, error] = useFonts({
    "Roboto-Bold": require('../assets/fonts/Roboto-Bold.ttf'),
    "Roboto-BoldItalic": require('../assets/fonts/Roboto-BoldItalic.ttf'),
    "Roboto-Medium": require('../assets/fonts/Roboto-Medium.ttf'),
    "Roboto-MediumItalic": require('../assets/fonts/Roboto-MediumItalic.ttf'),
    "Roboto-Regular": require('../assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Light": require('../assets/fonts/Roboto-Light.ttf'),
  });

  useEffect(() => {
    if(fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded]);

  if (!fontLoaded) return null;

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      </Stack>
  );
}
