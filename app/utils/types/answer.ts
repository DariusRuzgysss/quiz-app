import { QuestionType, QuestionTypeToValueMap } from "./question";

export type Answer = {
  [key: string]: AnswerItem;
};

export type AnswerItem<T extends QuestionType = QuestionType> = {
  value: QuestionTypeToValueMap[T];
  type: T;
};

export type CredentialsFormType = {
  email: string;
  password: string;
};

export type NameFormType = {
  name: string;
};
