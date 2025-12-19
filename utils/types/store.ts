import { Answer, AnswerItem } from "./answer";
import { Question } from "./question";

export type StoreState = {
  questions: Question[];
  filteredQuestions: Question[];
  questionsCount: number;
  currentQuizPage: number;
  setCurrentQuizPage: (val: number) => void;
  setQuestionsCount: (val: number) => void;
  setFilteredQuestions: (data: Question[]) => void;
  setQuestions: (data: Question[]) => void;
  answers: Answer;
  setAnswer: (key: string, value: AnswerItem) => void;
};
