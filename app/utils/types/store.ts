import { Answer } from "./answer";
import { Question } from "./question";

export type StoreState<T> = {
  questions: Question[];
  questionsCount: number;
  currentQuizPage: number;
  setCurrentQuizPage: (val: number) => void;
  setQuestionsCount: (val: number) => void;
  setQuestions: (data: Question[]) => void;
  answers: Answer<T>;
  setAnswer: (key: string, value: T) => void;
  removeAnswer: (key: string) => void;
};
