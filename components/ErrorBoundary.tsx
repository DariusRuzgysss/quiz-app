import { type ErrorBoundaryProps } from "expo-router";
import { memo } from "react";
import { Text, View } from "react-native";
import { colors } from "../utils/constants";

export default memo(({ error, retry }: ErrorBoundaryProps) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.error }}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
});
