import { Button, CredentialsForm, NameForm, OptionsList } from "@components";
import useStore from "@hooks/useStore";
import { colors, FONTS } from "@utils/constants";
import { isCredentialsValue, isNameValue, isStringArray } from "@utils/helper";
import {
  CredentialsFormType,
  NameFormType,
  QuestionTypeToValueMap,
} from "@utils/types/answer";
import { QuestionType } from "@utils/types/question";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

const QuizScreen = () => {
  const {
    filteredQuestions,
    answers,
    questionsCount,
    setCurrentQuizPage,
    setAnswer,
  } = useStore();
  const { id } = useLocalSearchParams();
  const currentQuestion = filteredQuestions[+id];
  const answerByKey = answers?.[currentQuestion?.key];

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

  const goToNextQuestion = useCallback(() => {
    if (
      currentQuestion.type === "single" ||
      currentQuestion.type === "name" ||
      currentQuestion.type === "credentials"
    ) {
      setTimeout(() => onPressNext(), 300);
    }
  }, [currentQuestion.type, onPressNext]);

  const handleSelect = useCallback(
    <T extends QuestionType>(
      key: string,
      value: QuestionTypeToValueMap[T],
      type: T
    ) => {
      setAnswer(key, { value, type });
      goToNextQuestion();
    },
    [goToNextQuestion, setAnswer]
  );

  const renderContent = useCallback(() => {
    switch (currentQuestion?.type) {
      case "single":
      case "multiple":
        return (
          <OptionsList
            question={currentQuestion}
            selected={
              isStringArray(answerByKey?.value) ? answerByKey?.value : []
            }
            onPress={(key, value) =>
              handleSelect(key, value, currentQuestion.type)
            }
            onPressNext={
              currentQuestion.type !== "single" ? onPressNext : undefined
            }
          />
        );
      case "name":
        return (
          <NameForm
            value={
              isNameValue(answerByKey?.value) ? answerByKey?.value.name : ""
            }
            onSubmit={(data: NameFormType) =>
              handleSelect(currentQuestion.key, data, currentQuestion.type)
            }
          />
        );
      case "credentials":
        return (
          <CredentialsForm
            value={
              isCredentialsValue(answerByKey?.value)
                ? answerByKey?.value
                : undefined
            }
            onSubmit={(data: CredentialsFormType) =>
              handleSelect(currentQuestion.key, data, currentQuestion.type)
            }
          />
        );
      default:
        return null;
    }
  }, [answerByKey, currentQuestion, handleSelect, onPressNext]);

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
