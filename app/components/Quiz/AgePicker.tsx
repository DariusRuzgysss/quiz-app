import WheelPicker from "@quidone/react-native-wheel-picker";
import { colors, FONTS } from "@utils/constants";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  onChange: (value: number) => void;
  selected: number;
};

const data = [...Array(100).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}));

export default memo(({ onChange, selected }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <WheelPicker
        data={data}
        value={selected}
        onValueChanged={({ item: { value } }) => onChange(value)}
        enableScrollByTapOnItem={true}
        itemTextStyle={styles.text}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    color: "#ffffff",
    fontFamily: FONTS.RedditSansSemiBold,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: 56,
    zIndex: -1,
    backgroundColor: colors.blueSemiTransparent,
    borderRadius: 20,
  },
});
