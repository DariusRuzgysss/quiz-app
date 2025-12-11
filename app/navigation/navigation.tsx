import { useSyncQuestions } from "@hooks/api/useQuestiomList";
import { useLoadFonts } from "@hooks/useFonts";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

const Navigation = () => {
  const { loaded, error } = useLoadFonts();
  useSyncQuestions();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(screens)/index" />
      <Stack.Screen name="(screens)/quiz" />
      <Stack.Screen name="(screens)/summary" />
    </Stack>
  );
};

export default Navigation;
