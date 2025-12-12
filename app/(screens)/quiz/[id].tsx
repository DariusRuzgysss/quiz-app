import { Button, CredentialsForm, NameForm, OptionsList } from "@components";
import useStore from "@hooks/useStore";
import { colors, FONTS } from "@utils/constants";
import { AnswerItem } from "@utils/types/answer";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

const QuizScreen = () => {
  const { questions, answers, questionsCount, setCurrentQuizPage, setAnswer } =
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
    (key: string, value: AnswerItem) => {
      setAnswer(key, value, currentQuestion.type);
      if (
        currentQuestion.type === "single" ||
        currentQuestion.type === "name" ||
        currentQuestion.type === "credentials"
      ) {
        setTimeout(() => onPressNext(), 700);
      }
    },
    [currentQuestion.type, onPressNext, setAnswer]
  );

  const renderContent = useCallback(() => {
    switch (currentQuestion.type) {
      case "single":
      case "multiple":
        return (
          <OptionsList
            question={currentQuestion}
            selected={answers?.[currentQuestion.key]}
            onPress={onSelect}
            onPressNext={onPressNext}
          />
        );
      case "name":
        return (
          <NameForm
            value={answers[currentQuestion.key]?.name}
            onSubmit={(data: FieldValues) =>
              onSelect(currentQuestion.key, data)
            }
          />
        );
      case "credentials":
        return (
          <CredentialsForm
            value={answers[currentQuestion.key]}
            onSubmit={(data: FieldValues) =>
              onSelect(currentQuestion.key, data)
            }
          />
        );
      default:
    }
  }, [answers, currentQuestion, onPressNext, onSelect]);

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
  content: {
    flex: 1,
  },
  textContainer: {
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
