import { Question } from "./question";

export type StoreState = {
  questions: Question[];
  setQuestions: (data: Question[]) => void;
};
