import { Button, OptionButton } from "@components";
import { colors } from "@utils/constants";
import { OptionItem, Question } from "@utils/types/question";
import React, { memo, useCallback } from "react";
import { FlatList, ListRenderItem, View } from "react-native";

type Props = {
  question: Question;
  onPress: (key: string, value: string[]) => void;
  selected?: string[];
  onPressNext?: () => void;
};

export default memo(
  ({ question, onPress, selected = [], onPressNext }: Props) => {
    const handlePress = useCallback(
      (item: OptionItem) => {
        if (question.type === "single") {
          onPress(question.key, [item.value]);
          return;
        }
        const exists = selected.includes(item.value);
        const newValue = exists
          ? selected.filter((v) => v !== item.value)
          : [...selected, item.value];
        onPress(question.key, newValue);
      },
      [onPress, question.key, question.type, selected]
    );

    const renderItem = useCallback<ListRenderItem<OptionItem>>(
      ({ item }) => {
        const isSelected = selected?.includes(item.value);

        return (
          <OptionButton
            selected={isSelected}
            title={item.title}
            isMultiple={question.type === "multiple"}
            onPress={() => handlePress(item)}
          />
        );
      },
      [handlePress, question.type, selected]
    );

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={question.options}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.value}-${index}`}
          contentContainerStyle={{ flex: 1, gap: 12 }}
        />
        {onPressNext && (
          <Button
            title="Next"
            gradientColors={[colors.darkPurple, colors.lightBlue, colors.aqua]}
            onPress={onPressNext}
          />
        )}
      </View>
    );
  }
);
