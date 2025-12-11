import { AnimatedCheckbox } from "@components";
import { colors, FONTS } from "@utils/constants";
import React, { memo } from "react";
import {
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
  selected?: boolean;
  isMultiple?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
};

export default memo(
  ({ style, selected, isMultiple, onPress, textStyle, title }: Props) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={StyleSheet.flatten([
          styles.base,
          {
            backgroundColor: selected
              ? colors.blueSemiTransparent
              : "transparent",
            borderColor: selected ? colors.white : colors.border,
          },
          style,
        ])}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
          {isMultiple && <AnimatedCheckbox selected={selected ?? false} />}
        </View>
      </TouchableOpacity>
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
