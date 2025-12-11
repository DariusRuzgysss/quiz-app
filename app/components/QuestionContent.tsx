import { Question } from "@utils/types/question";
import React, { memo } from "react";
import { Text, View } from "react-native";

type Props = {
  question: Question;
};

export default memo(({ question }: Props) => {
  return (
    <View>
      <Text style={{ color: "#fff" }}>{question.key}</Text>
    </View>
  );
});
