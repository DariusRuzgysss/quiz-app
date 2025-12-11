import { AnimatedCheckbox } from "@components";
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
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default memo(
  ({ style, selected, isMultiple, onPress, textStyle, title }: Props) => {
    const progress = useSharedValue(0);

    useEffect(() => {
      progress.value = withTiming(selected ? 1 : 0, { duration: 250 });
    }, [progress, selected]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          progress.value,
          [0, 1],
          ["transparent", colors.blueSemiTransparent]
        ),
        borderColor: interpolateColor(
          progress.value,
          [0, 1],
          [colors.border, "#fff"]
        ),
      };
    });
    return (
      <AnimatedTouchable
        onPress={onPress}
        style={[styles.base, animatedStyle, style]}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
          {isMultiple && <AnimatedCheckbox selected={selected ?? false} />}
        </View>
      </AnimatedTouchable>
    );
  }
);

const styles = StyleSheet.create({
  base: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 1,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 25,
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
});
