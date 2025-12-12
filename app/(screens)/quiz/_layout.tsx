import { AnimatedSteppe, CustomHeader } from "@components";
import useStore from "@hooks/useStore";
import { Slot, useRouter } from "expo-router";
import React from "react";

const QuizLayout = () => {
  const { questionsCount, currentQuizPage, setCurrentQuizPage } = useStore();
  const router = useRouter();

  const onBackPress = () => {
    setCurrentQuizPage(
      currentQuizPage === 0 ? currentQuizPage : currentQuizPage - 1
    );
    router.push(
      currentQuizPage === 0
        ? "/(screens)"
        : {
            pathname: "/quiz/[id]",
            params: { id: String(currentQuizPage - 1) },
          }
    );
  };

  return (
    <>
      <CustomHeader
        onBackPress={onBackPress}
        style={{ paddingBottom: 50 }}
        component={
          <AnimatedSteppe
            totalPage={questionsCount + 1} // + 1 because of summary screen
            currentPage={currentQuizPage}
          />
        }
      />
      <Slot />
    </>
  );
};

export default QuizLayout;
