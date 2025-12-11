import { useQuestionsList } from "@hooks/api/useQuestionsList";
import { useLoadFonts } from "@hooks/useFonts";
import { colors } from "@utils/constants";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

const Navigation = () => {
  const { loaded: fontsLoaded, error: fontsError } = useLoadFonts();
  const { isLoading: questionsLoading, error: questionsError } =
    useQuestionsList();

  useEffect(() => {
    const ready = fontsLoaded && !questionsLoading;
    const hasError = fontsError || questionsError;

    if (ready || hasError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, questionsLoading, fontsError, questionsError]);

  if (!fontsLoaded || questionsLoading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.black, padding: 20 },
      }}
    >
      <Stack.Screen name="(screens)/index" />
      <Stack.Screen name="(screens)/quiz/[id]" />
      <Stack.Screen name="(screens)/quiz/summary" />
    </Stack>
  );
};

export default Navigation;
