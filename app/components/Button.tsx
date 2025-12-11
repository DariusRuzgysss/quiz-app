import { colors, FONTS } from "@utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  textStyle?: TextStyle;
  gradientColors?: [ColorValue, ColorValue, ...ColorValue[]];
};

export default memo(
  ({
    style,
    onPress,
    loading,
    disabled = false,
    textStyle,
    title,
    gradientColors,
  }: Props) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={StyleSheet.flatten([
          styles.base,
          (loading || disabled) && styles.disabled,
          style,
        ])}
      >
        {!disabled && gradientColors && (
          <LinearGradient
            colors={gradientColors}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  base: {
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  textContainer: {
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  disabled: {
    backgroundColor: colors.darkBlue,
  },
  text: {
    fontSize: 15,
    color: colors.white,
    fontFamily: FONTS.RedditSansBold,
  },
});
