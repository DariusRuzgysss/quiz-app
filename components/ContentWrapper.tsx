import { usePathname } from "expo-router";
import React, { memo, useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from ".";
import BgNoAlcohol from "../assets/images/BG Screen no alcohol.png";
import BgRegular from "../assets/images/BG-Screen.png";
import useStore from "../hooks/useStore";
import { isProgramQuitAlcohol } from "../utils/helper";

export default memo(({ children }: { children: React.ReactNode }) => {
  const { answers } = useStore();
  const pathname = usePathname();

  const showNoAlcoholBg = useMemo(() => {
    return (
      isProgramQuitAlcohol(answers["program"]) &&
      pathname.includes("/quiz/summary")
    );
  }, [answers, pathname]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Image
          source={showNoAlcoholBg ? BgNoAlcohol : BgRegular}
          style={styles.background}
        />
        <View style={styles.content}>{children}</View>
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
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
});
