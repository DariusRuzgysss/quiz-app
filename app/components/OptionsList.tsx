import { OptionButton } from "@components";
import useStore from "@hooks/useStore";
import { OptionItem, Question } from "@utils/types/question";
import React, { memo, useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";

type Props = {
  question: Question;
  onPress: (key: string, value: string) => void;
};

export default memo(({ question, onPress }: Props) => {
  const { answers } = useStore();

  const handlePress = useCallback(
    (item: OptionItem) => {
      onPress(question.key, item.value);
    },
    [onPress, question.key]
  );

  const renderItem = useCallback<ListRenderItem<OptionItem>>(
    ({ item }) => {
      const isSelected = item.value === answers?.[question.key];

      return (
        <OptionButton
          selected={isSelected}
          title={item.title}
          isMultiple={question.type === "multiple"}
          onPress={() => handlePress(item)}
        />
      );
    },
    [answers, handlePress, question.key, question.type]
  );

  return (
    <FlatList
      data={question.options}
      renderItem={renderItem}
      keyExtractor={(item) => item.value}
      contentContainerStyle={{ gap: 12 }}
    />
  );
});
