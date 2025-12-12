import { colors, FONTS } from "@utils/constants";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface RHFTextInputProps extends TextInputProps {
  name: string;
}

const RHFTextInput: React.FC<RHFTextInputProps> = ({ name, ...inputProps }) => {
  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              error && styles.errorBorder,
              isFocused && styles.inputFocused,
            ]}
            value={value}
            placeholderTextColor={colors.inputText}
            onChangeText={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...inputProps}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default RHFTextInput;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 26,
    fontSize: 15,
    fontFamily: FONTS.RedditSansRegular,
    color: colors.inputText,
  },
  inputFocused: {
    borderColor: "#6c5ce7",
    backgroundColor: colors.blueSemiTransparent,
  },
  errorText: { color: "red", marginTop: 4 },
  errorBorder: { borderColor: "red" },
});
