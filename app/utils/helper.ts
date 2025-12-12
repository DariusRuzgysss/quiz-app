import { Question } from "./types/question";

export const getAnswerTitles = (value: string[], question?: Question) => {
  return question?.options?.filter((op) => value.includes(op.value));
};
