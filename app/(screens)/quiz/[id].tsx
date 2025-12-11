import { Button, OptionsList } from "@components";
import useStore from "@hooks/useStore";
import { colors, FONTS } from "@utils/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

const QuizScreen = () => {
  const { questions, questionsCount, setCurrentQuizPage, setAnswer } =
    useStore();
  const { id } = useLocalSearchParams();
  const currentQuestion = questions[+id];

  const onPressNext = useCallback(() => {
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
  }, [id, questionsCount, setCurrentQuizPage]);

  const onSelect = useCallback(
    (key: string, value: string) => {
      setAnswer(key, value);
      if (currentQuestion.type === "single") {
        onPressNext();
      }
    },
    [currentQuestion.type, onPressNext, setAnswer]
  );

  const renderContent = useCallback(() => {
    switch (currentQuestion.type) {
      case "single":
      case "multiple":
        return <OptionsList question={currentQuestion} onPress={onSelect} />;
      default:
    }
  }, [currentQuestion, onSelect]);
  console.log(currentQuestion);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>{currentQuestion.subtitle}</Text>
        <Text style={styles.title}>{currentQuestion.title}</Text>
      </View>
      {renderContent()}
      {currentQuestion.type !== "single" && (
        <Button
          title="Next"
          gradientColors={[colors.darkPurple, colors.lightBlue, colors.aqua]}
          onPress={onPressNext}
        />
      )}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    gap: 10,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    color: colors.white,
    fontFamily: FONTS.MerriweatherRegular,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: FONTS.RedditSansRegular,
    color: colors.purple,
  },
});
