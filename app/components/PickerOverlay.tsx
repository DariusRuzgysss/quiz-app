import { GradientBorder } from "@components";
import { colors } from "@utils/constants";
import React, { memo } from "react";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  colorsValue: [ColorValue, ColorValue, ...ColorValue[]];
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
};

export default memo(
  ({
    colorsValue,
    backgroundColor = colors.blueSemiTransparent,
    style,
  }: Props) => {
    return (
      <GradientBorder colors={colorsValue} style={style}>
        <View style={[styles.overlayInner, { backgroundColor }]} />
      </GradientBorder>
    );
  }
);

const styles = StyleSheet.create({
  overlayInner: {
    borderRadius: 19,
    margin: 1,
    width: "100%",
    height: "100%",
  },
});
