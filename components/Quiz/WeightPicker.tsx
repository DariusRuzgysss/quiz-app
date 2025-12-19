import WheelPicker, {
  type PickerItem,
  useOnPickerValueChangedEffect,
  usePickerControl,
  withPickerControl,
} from "@quidone/react-native-wheel-picker";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Button, PickerOverlay } from "..";
import { colors, FONTS, PICKER_ITEM_HEIGHT } from "../../utils/constants";
import { generatePickerData } from "../../utils/helper";

type Props = {
  onChange: (value: string[]) => void;
  selected?: string[];
  onPressNext?: () => void;
};

const data = generatePickerData(300);

const weightLabel = [
  {
    value: "lb",
    label: "Lb",
  },
];

const ControlPicker = withPickerControl(WheelPicker);

type ControlPickersMap = {
  value1: { item: PickerItem<string> };
  value3: { item: PickerItem<string> };
  value4: { item: PickerItem<string> };
};

export default memo(({ onChange, selected, onPressNext }: Props) => {
  const pickerControl = usePickerControl<ControlPickersMap>();

  useOnPickerValueChangedEffect(pickerControl, (event) => {
    onChange([
      event.pickers.value1.item.value.toString(),
      event.pickers.value3.item.value.toString(),
      event.pickers.value4.item.value,
    ]);
  });
  return (
    <View style={styles.base}>
      <View style={styles.pickerContainer}>
        <PickerOverlay
          colorsValue={[colors.darkPurple, colors.lightBlue, colors.aqua]}
          style={styles.overlay}
        />
        <ControlPicker
          control={pickerControl}
          pickerName={"value1"}
          data={data}
          value={selected ? selected[0] : "0"}
          enableScrollByTapOnItem={true}
          itemTextStyle={styles.text}
          itemHeight={PICKER_ITEM_HEIGHT}
        />
        <ControlPicker
          control={pickerControl}
          pickerName={"value2"}
          data={[{ value: ",", label: "," }]}
          value={","}
          enableScrollByTapOnItem={false}
          itemTextStyle={styles.text}
          itemHeight={PICKER_ITEM_HEIGHT}
        />
        <ControlPicker
          control={pickerControl}
          pickerName={"value3"}
          data={data}
          value={selected ? selected[1] : "0"}
          enableScrollByTapOnItem={true}
          itemTextStyle={styles.text}
          itemHeight={PICKER_ITEM_HEIGHT}
        />
        <ControlPicker
          control={pickerControl}
          pickerName={"value4"}
          data={weightLabel}
          value={selected ? selected[2] : "lb"}
          enableScrollByTapOnItem={false}
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
  base: {
    flex: 1,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30, // Note: if width is set for each ControlPicker it breaks after come back thats why need a gap
    position: "relative",
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
  },
});
