import { AnswerItem, CredentialsFormType, NameFormType } from "./types/answer";
import { Question, QuestionType } from "./types/question";

export const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((item) => typeof item === "string");

export const isNameValue = (v: unknown): v is NameFormType =>
  v != null &&
  typeof v === "object" &&
  "name" in v &&
  typeof v.name === "string";
export const isCredentialsValue = (v: unknown): v is CredentialsFormType =>
  v != null && typeof v === "object" && "email" in v && "password" in v;

export const getQuestionsByKey = (
  questions: Question[],
  answer: AnswerItem<QuestionType>,
  key: string
) => {
  const question = questions.find((q) => q.key === key);
  return question?.options?.filter((op) =>
    (isStringArray(answer.value) ? answer.value : []).includes(op.value)
  );
};

export const generatePickerData = (max: number) => {
  return [...Array(max).keys()].map((index) => ({
    value: index.toString(),
    label: index.toString(),
  }));
};

export const isProgramQuitAlcohol = (answer: AnswerItem<QuestionType>) => {
  const program = isStringArray(answer?.value) ? answer.value : [];
  return program.includes("quit_alcohol");
};
