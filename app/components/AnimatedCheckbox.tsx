import { colors } from "@utils/constants";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface AnimatedCheckboxProps {
  selected: boolean;
  onPress?: () => void;
  size?: number;
  colorActivity?: {
    active: string;
    inactive: string;
  };
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  selected,
  onPress,
  size = 24,
  colorActivity = { active: colors.aqua, inactive: colors.blueSemiTransparent },
}) => {
  const progress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0, { duration: 300 });
  }, [selected, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colorActivity.inactive, colorActivity.active]
    );
    return {
      backgroundColor,
      transform: [{ scale: withTiming(progress.value ? 1.1 : 1) }],
    };
  });

  const checkStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value, { duration: 200 }),
    transform: [
      {
        scale: withTiming(progress.value, { duration: 200 }),
      },
    ],
  }));

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          styles.checkbox,
          { width: size, height: size, borderRadius: size / 2.4 },
          animatedStyle,
        ]}
      >
        <Animated.Image
          style={checkStyle}
          source={require("../../assets/images/Checkbox.png")}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedCheckbox;

const styles = StyleSheet.create({
  checkbox: {
    justifyContent: "center",
    alignItems: "center",
  },
});
