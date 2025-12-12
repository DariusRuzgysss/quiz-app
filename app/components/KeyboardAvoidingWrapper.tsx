import React, { memo, ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface KeyboardAvoidingWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollEnabled?: boolean;
}

export default memo(
  ({
    children,
    style,
    contentContainerStyle,
    scrollEnabled = true,
  }: KeyboardAvoidingWrapperProps) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, style]}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // adjust if you have a header
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.content, contentContainerStyle]}
          scrollEnabled={scrollEnabled}
          nestedScrollEnabled
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
