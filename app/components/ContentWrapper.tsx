import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default memo(({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/images/BG Screen.png")}
          style={styles.background}
        />
        {children}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    top: -20,
  },
});
