import { Stack } from "expo-router";
import React from "react";

const Navigation = () => {
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
