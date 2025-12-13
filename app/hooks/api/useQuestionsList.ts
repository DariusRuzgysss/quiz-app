import useStore from "@hooks/useStore";
import { useQuery } from "@tanstack/react-query";
import { QuestionResponse } from "@utils/types/question";
import { useEffect } from "react";
import { getQuizList } from "../../services/api";

export const useQuestionsList = () => {
  const { setQuestions, setFilteredQuestions, setQuestionsCount } = useStore();

  const query = useQuery<QuestionResponse>({
    queryKey: ["questions-list"],
    queryFn: getQuizList,
    staleTime: 1000 * 60,
  });

  const { data, isSuccess } = query;

  useEffect(() => {
    if (isSuccess) {
      setQuestions(data.questions);
      setFilteredQuestions(data.questions);
      setQuestionsCount(data.questions.length - 1);
    }
  }, [isSuccess, data, setQuestions, setQuestionsCount, setFilteredQuestions]);

  return query;
};
