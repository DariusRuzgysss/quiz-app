import { Button, PickerOverlay } from "@components";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { colors, FONTS, PICKER_ITEM_HEIGHT } from "@utils/constants";
import { generatePickerData } from "@utils/helper";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  onChange: (value: string) => void;
  selected?: string;
  onPressNext?: () => void;
};

const data = generatePickerData(100);

export default memo(({ onChange, selected, onPressNext }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <PickerOverlay
          colorsValue={[colors.darkPurple, colors.lightBlue, colors.aqua]}
          style={styles.overlay}
        />
        <WheelPicker
          data={data}
          value={selected ? selected : "0"}
          onValueChanged={({ item: { value } }) => onChange(value)}
          enableScrollByTapOnItem={true}
          itemTextStyle={styles.text}
          itemHeight={PICKER_ITEM_HEIGHT}
        />
      </View>
      {onPressNext && (
        <Button
          title="Next"
          gradientColors={[colors.darkPurple, colors.lightBlue, colors.aqua]}
          onPress={onPressNext}
        />
      )}
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
  pickerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: 56,
  },
});
