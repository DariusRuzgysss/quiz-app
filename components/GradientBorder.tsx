import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { ColorValue, StyleProp, StyleSheet, ViewStyle } from "react-native";

type Props = {
  colors: [ColorValue, ColorValue, ...ColorValue[]];
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default memo(({ colors, children, style }: Props) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.3 }}
      style={[styles.linearGradient, style]}
    >
      {children}
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 20,
  },
});
