import { Button } from "@components";
import useStore from "@hooks/useStore";
import { colors, FONTS } from "@utils/constants";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  const { currentQuizPage, questionsCount } = useStore();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          First & formost, congratulations on this first step.
        </Text>
        <Text style={styles.subTitle}>Be ready to amaze yourself.</Text>
      </View>
      <Button
        title="Next"
        gradientColors={[colors.darkPurple, colors.lightBlue, colors.aqua]}
        onPress={() => {
          if (currentQuizPage >= questionsCount) {
            router.push("/quiz/summary");
            return;
          }
          router.push({
            pathname: "/quiz/[id]",
            params: { id: currentQuizPage },
          });
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    gap: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontFamily: FONTS.MerriweatherRegular,
    textAlign: "center",
  },
  subTitle: {
    color: colors.purple,
    fontSize: 15,
    fontFamily: FONTS.RedditSansRegular,
  },
});
