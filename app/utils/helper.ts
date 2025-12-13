import { AnswerItem, CredentialsFormType, NameFormType } from "./types/answer";
import { Question, QuestionType } from "./types/question";

export const isStringArray = (v: unknown): v is string[] => Array.isArray(v);
export const isNameValue = (v: unknown): v is NameFormType =>
  v != null && typeof v === "object" && "name" in v;
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
