import { Button, QuestionContent } from "@components";
import useStore from "@hooks/useStore";
import { colors } from "@utils/constants";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const QuizScreen = () => {
  const { questions, questionsCount, setCurrentQuizPage } = useStore();
  const { id } = useLocalSearchParams();

  const onPressNext = () => {
    const nextId = Number(id) + 1;
    const isLastQuestion = +id === questionsCount;
    setCurrentQuizPage(nextId);
    router.push(
      isLastQuestion
        ? "/(screens)/quiz/summary"
        : {
            pathname: "/(screens)/quiz/[id]",
            params: { id: String(nextId) },
          }
    );
  };

  return (
    <View style={styles.container}>
      <QuestionContent question={questions[+id]} />
      <Button
        title="Next"
        gradientColors={[colors.darkPurple, colors.lightBlue, colors.aqua]}
        onPress={onPressNext}
      />
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
