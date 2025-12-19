import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AgePicker,
  CredentialsForm,
  NameForm,
  OptionsList,
  WeightPicker,
} from "../../../components";
import useStore from "../../../hooks/useStore";
import { colors, FONTS } from "../../../utils/constants";
import {
  isCredentialsValue,
  isNameValue,
  isStringArray,
} from "../../../utils/helper";
import { CredentialsFormType, NameFormType } from "../../../utils/types/answer";
import {
  QuestionType,
  QuestionTypeToValueMap,
} from "../../../utils/types/question";

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
  const selectedStringArray = useMemo(
    () => (isStringArray(answerByKey?.value) ? answerByKey?.value : []),
    [answerByKey?.value]
  );

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
      currentQuestion.type === QuestionType.Single ||
      currentQuestion.type === QuestionType.Name ||
      currentQuestion.type === QuestionType.Credentials
    ) {
      setTimeout(() => onPressNext(), 250);
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
    switch (currentQuestion.type) {
      case QuestionType.Single:
      case QuestionType.Multiple:
        return (
          <OptionsList
            question={currentQuestion}
            selected={selectedStringArray}
            onPress={(key, value) =>
              handleSelect(key, value, currentQuestion.type)
            }
            onPressNext={
              currentQuestion.type !== QuestionType.Single
                ? onPressNext
                : undefined
            }
          />
        );
      case QuestionType.Name:
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
      case QuestionType.Credentials:
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
      case QuestionType.Age:
        return (
          <AgePicker
            onChange={(value) =>
              handleSelect(currentQuestion.key, [value], currentQuestion.type)
            }
            selected={selectedStringArray[0]}
            onPressNext={onPressNext}
          />
        );
      case QuestionType.Weight:
        return (
          <WeightPicker
            onChange={(value) =>
              handleSelect(currentQuestion.key, value, currentQuestion.type)
            }
            selected={selectedStringArray}
            onPressNext={onPressNext}
          />
        );
      default:
        return null;
    }
  }, [
    answerByKey?.value,
    currentQuestion,
    handleSelect,
    onPressNext,
    selectedStringArray,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>{currentQuestion.subtitle}</Text>
        <Text style={styles.title}>{currentQuestion.title}</Text>
      </View>
      {renderContent()}
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
