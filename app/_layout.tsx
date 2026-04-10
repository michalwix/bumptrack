import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import {
  Heebo_400Regular,
  Heebo_600SemiBold,
  Heebo_700Bold,
} from '@expo-google-fonts/heebo';
import * as SplashScreen from 'expo-splash-screen';
import '../src/i18n';
import { usePregnancyStore } from '../src/store/pregnancyStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loadFromStorage = usePregnancyStore((s) => s.loadFromStorage);
  const profile = usePregnancyStore((s) => s.profile);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Heebo_400Regular,
    Heebo_600SemiBold,
    Heebo_700Bold,
  });

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const isRTL = profile.language === 'he';
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTL);
  }, [profile.language]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="#FDF6F0" />
      <Stack screenOptions={{ headerShown: false }}>
        {!profile.hasCompletedOnboarding ? (
          <Stack.Screen name="onboarding/index" />
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>
    </GestureHandlerRootView>
  );
}
