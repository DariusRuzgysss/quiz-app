import useStore from "@hooks/useStore";
import { useQuery } from "@tanstack/react-query";
import { QuestionResponse } from "@utils/types/question";
import { useEffect } from "react";
import { getQuizList } from "../../services/api";

const useQuestionList = () => {
  return useQuery<QuestionResponse>({
    queryKey: ["quiz-list"],
    queryFn: getQuizList,
  });
};

export const useSyncQuestions = () => {
  const { data, isSuccess } = useQuestionList();
  const { setQuestions } = useStore();

  useEffect(() => {
    if (isSuccess && data?.questions) {
      setQuestions(data.questions);
    }
  }, [data?.questions, isSuccess, setQuestions]);
};
