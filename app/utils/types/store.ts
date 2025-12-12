import { Answer, AnswerItem } from "./answer";
import { Question, QuestionType } from "./question";

export type StoreState = {
  questions: Question[];
  questionsCount: number;
  currentQuizPage: number;
  setCurrentQuizPage: (val: number) => void;
  setQuestionsCount: (val: number) => void;
  setQuestions: (data: Question[]) => void;
  answers: Answer;
  setAnswer: (key: string, value: AnswerItem, type: QuestionType) => void;
};
