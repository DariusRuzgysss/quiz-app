import React, { memo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { GradientBorder } from "..";
import { colors, FONTS } from "../../utils/constants";

interface RHFTextInputProps extends TextInputProps {
  name: string;
}

export default memo<RHFTextInputProps>(({ name, ...inputProps }) => {
  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <GradientBorder
            colors={
              isFocused
                ? [colors.darkPurple, colors.lightBlue, colors.aqua]
                : [colors.border, colors.border]
            }
            style={{ borderRadius: 24 }}
          >
            <TextInput
              style={[styles.input, isFocused && styles.inputFocused]}
              value={value}
              placeholderTextColor={colors.inputText}
              onChangeText={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...inputProps}
            />
          </GradientBorder>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 23,
    margin: 1,
    paddingHorizontal: 20,
    paddingVertical: 26,
    fontSize: 15,
    fontFamily: FONTS.RedditSansRegular,
    color: colors.inputText,
    backgroundColor: colors.dark,
  },
  inputFocused: {
    backgroundColor: colors.blueSemiTransparent,
  },
  errorText: { color: colors.error, marginTop: 4 },
});
