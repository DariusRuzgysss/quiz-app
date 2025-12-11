import React, { memo } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  component: React.ReactNode;
  onBackPress: () => void;
  style?: ViewStyle;
};

export default memo(({ onBackPress, style, component }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity hitSlop={20} onPress={onBackPress}>
        <Image
          source={require("../../assets/images/arrow back.png")}
          style={styles.image}
        />
      </TouchableOpacity>
      {component}
      <View style={styles.image} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 24,
    height: 24,
  },
});
