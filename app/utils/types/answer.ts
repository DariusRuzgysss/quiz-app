import { QuestionType } from "./question";

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

export type QuestionTypeToValueMap = {
  [QuestionType.Age]: string[];
  [QuestionType.Credentials]: CredentialsFormType;
  [QuestionType.Multiple]: string[];
  [QuestionType.Name]: NameFormType;
  [QuestionType.Single]: string[];
  [QuestionType.Weight]: string[];
};
