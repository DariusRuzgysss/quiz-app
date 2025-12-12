import { Button } from "@components";
import useStore from "@hooks/useStore";
import { colors, FONTS } from "@utils/constants";
import { getAnswerTitles } from "@utils/helper";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

const SummaryScreen = () => {
  const { answers, questions } = useStore();
  const onPressStart = () => {};
  const answerGoal = answers["goal"];
  const answerOtherGoals = answers["other_goals"];
  const goalKey: string[] = Array.isArray(answerGoal) ? answerGoal : answerGoal;
  const otherGoalKeys: string[] = Array.isArray(answerOtherGoals)
    ? answerOtherGoals
    : answerOtherGoals;

  const goalTitle = useCallback(() => {
    const goal = questions.find((q) => q.key === "goal");
    const titles = getAnswerTitles(goalKey, goal);
    return titles?.map((t) => (
      <Text
        key={t.value}
        style={[styles.subTitle, { fontFamily: FONTS.MerriweatherBold }]}
      >
        {t.title}
      </Text>
    ));
  }, [goalKey, questions]);

  const otherGoalTitles = useCallback(() => {
    const otherGoal = questions.find((q) => q.key === "other_goals");
    return getAnswerTitles(otherGoalKeys, otherGoal);
  }, [otherGoalKeys, questions]);

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
              {goalTitle()}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Complementary goal:</Text>
            <Text style={styles.subComplimentary}>
              Feel more in control of my life
            </Text>
            <Text style={styles.subComplimentary}>Feel less anxious</Text>
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
