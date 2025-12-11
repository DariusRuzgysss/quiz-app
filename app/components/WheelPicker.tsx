import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const ITEM_HEIGHT = 50;

interface ScrollPickerProps {
  values: number[];
  selectedValue: number;
  onSelect?: (value: number) => void;
}

export default function ScrollPicker({
  values,
  onSelect,
  selectedValue,
}: ScrollPickerProps) {
  const translateY = useSharedValue(selectedValue * ITEM_HEIGHT);
  console.log("translateY.value", translateY.value);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateY.value = event.contentOffset.y;
    },
    onEndDrag: () => {
      const index = Math.round(translateY.value / ITEM_HEIGHT);
      console.log(values[index]);
      //   onSelect && onSelect(values[index]);
    },
    // onMomentumEnd: () => {
    //   const index = Math.round(translateY.value / ITEM_HEIGHT);
    //   console.log(values[index]);
    //   onSelect && onSelect(values[index]);
    // },
  });

  //   useEffect(() => {
  //     translateY.value = selectedValue * ITEM_HEIGHT;
  //   }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {values.map((item, index) => {
          return (
            <AnimatedItem
              key={index}
              index={index}
              label={String(item)}
              translateY={translateY}
            />
          );
        })}
      </Animated.ScrollView>

      <View style={styles.highlight} />
    </View>
  );
}

interface AnimatedItemProps {
  label: string;
  index: number;
  translateY: SharedValue<number>;
}

function AnimatedItem({ label, index, translateY }: AnimatedItemProps) {
  const rStyle = useAnimatedStyle(() => {
    const pos = index * ITEM_HEIGHT;
    const diff = Math.abs(translateY.value - pos);

    return {
      opacity: interpolate(
        diff,
        [0, ITEM_HEIGHT],
        [1, 0.4],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            diff,
            [0, ITEM_HEIGHT],
            [1, 0.85],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.item, rStyle]}>
      <Text style={styles.text}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * 5,
    overflow: "hidden",
    justifyContent: "center",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 22,
  },
  highlight: {
    position: "absolute",
    height: ITEM_HEIGHT,
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#888",
  },
});
