import { AnimatedCheckbox, GradientBorder } from "@components";
import { colors, FONTS } from "@utils/constants";
import React, { memo, useEffect } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  title: string;
  onPress: () => void;
  selected?: boolean;
  isMultiple?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  disabled?: boolean;
};

const AnimatedInnerView = Animated.createAnimatedComponent(View);

export default memo(
  ({ style, selected, isMultiple, onPress, textStyle, title }: Props) => {
    const progress = useSharedValue(0);

    useEffect(() => {
      progress.value = withTiming(selected ? 1 : 0, { duration: 350 });
    }, [progress, selected]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          progress.value,
          [0, 1],
          [colors.black, colors.blueSemiTransparent]
        ),
      };
    });
    return (
      <TouchableOpacity onPress={onPress} style={[styles.base, style]}>
        <GradientBorder
          colors={
            selected
              ? [colors.darkPurple, colors.lightBlue, colors.aqua]
              : [colors.border, colors.border]
          }
        >
          <AnimatedInnerView style={[styles.innerContainer, animatedStyle]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
            {isMultiple && <AnimatedCheckbox selected={selected ?? false} />}
          </AnimatedInnerView>
        </GradientBorder>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  base: {
    width: "100%",
    borderRadius: 20,
  },
  text: {
    flexShrink: 1,
    fontSize: 15,
    color: colors.white,
    fontFamily: FONTS.RedditSansBold,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 10,
  },
  innerContainer: {
    borderRadius: 19,
    margin: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
});
