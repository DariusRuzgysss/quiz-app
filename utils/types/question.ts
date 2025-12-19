import { CredentialsFormType, NameFormType } from "./answer";

export type QuestionResponse = {
  name: string;
  questions: Question[];
};

export type Question = {
  key: string;
  subtitle: string;
  title: string;
  type: QuestionType;
  visibleIf?: VisibleIf;
  options?: OptionItem[];
};

export type OptionItem = {
  title: string;
  value: string;
};

export enum QuestionType {
  Single = "single",
  Multiple = "multiple",
  Weight = "weight",
  Name = "name",
  Age = "age",
  Credentials = "credentials",
}

export type QuestionTypeToValueMap = {
  [QuestionType.Age]: string[];
  [QuestionType.Credentials]: CredentialsFormType;
  [QuestionType.Multiple]: string[];
  [QuestionType.Name]: NameFormType;
  [QuestionType.Single]: string[];
  [QuestionType.Weight]: string[];
};

type VisibleIf = {
  question: string;
  value: string;
};
