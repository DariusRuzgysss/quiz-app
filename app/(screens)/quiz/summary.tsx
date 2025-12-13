import { Button } from "@components";
import useStore from "@hooks/useStore";
import { colors, FONTS } from "@utils/constants";
import { getQuestionsByKey } from "@utils/helper";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

const SummaryScreen = () => {
  const { answers, filteredQuestions } = useStore();
  const onPressStart = () => {};
  const answerGoal = answers["goal"];
  const answerOtherGoals = answers["other_goals"];

  const otherGoalTitles = useMemo(() => {
    const otherGoalsQuestion = getQuestionsByKey(
      filteredQuestions,
      answerOtherGoals,
      "other_goals"
    );
    return (
      otherGoalsQuestion?.map((op) => (
        <Text key={op.value} style={styles.subComplimentary}>
          {op.title}
        </Text>
      )) || ""
    );
  }, [answerOtherGoals, filteredQuestions]);

  const goalTitle = useMemo(() => {
    const goalQuestion = getQuestionsByKey(
      filteredQuestions,
      answerGoal,
      "goal"
    );
    return goalQuestion?.[0]?.title || "";
  }, [answerGoal, filteredQuestions]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Summary</Text>
          <Text
            style={[styles.subTitle, { fontFamily: FONTS.MerriweatherRegular }]}
          >
            Welcome to this journey
          </Text>
        </View>
        <View style={styles.goal}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Your goal:</Text>
            <Text
              style={[styles.subTitle, { fontFamily: FONTS.MerriweatherBold }]}
            >
              {goalTitle}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Complementary goal:</Text>
            {otherGoalTitles}
          </View>
        </View>
      </View>
      <Button title="Start my journey" onPress={onPressStart} />
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 68,
  },
  textContainer: {
    gap: 10,
  },
  goal: {
    gap: 20,
  },
  title: {
    fontFamily: FONTS.RedditSansRegular,
    fontSize: 15,
    color: colors.purple,
  },
  subTitle: {
    color: colors.white,
    fontSize: 22,
  },
  subComplimentary: {
    color: colors.white,
    fontSize: 15,
    fontFamily: FONTS.RedditSansBold,
  },
});
