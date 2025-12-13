import { colors } from "@utils/constants";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type StepperProps = {
  currentPage: number;
  totalPage: number;
  barHeight?: number;
  activeColor?: string;
  inactiveColor?: string;
  duration?: number;
};

const AnimatedStepper: React.FC<StepperProps> = ({
  currentPage,
  totalPage,
  barHeight = 4,
  activeColor = colors.purple,
  inactiveColor = colors.border,
  duration = 300,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(currentPage / totalPage, { duration });
  }, [currentPage, duration, progress, totalPage]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.track,
          { backgroundColor: inactiveColor, height: barHeight },
        ]}
      >
        <Animated.View
          style={[
            styles.progress,
            animatedStyle,
            { backgroundColor: activeColor },
          ]}
        />
      </View>
    </View>
  );
};

export default AnimatedStepper;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  track: {
    width: "100%",
    borderRadius: 999,
  },
  progress: {
    height: "100%",
    borderRadius: 999,
  },
});
