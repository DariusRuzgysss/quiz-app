import React, { memo } from "react";
import { StatusBar } from "react-native";

export default memo(() => {
  return (
    <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle="light-content"
    />
  );
});