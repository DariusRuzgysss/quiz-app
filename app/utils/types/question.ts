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

type VisibleIf = {
  question: string;
  value: string;
};
