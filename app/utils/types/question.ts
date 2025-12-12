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

export type QuestionType =
  | "single"
  | "multiple"
  | "weight"
  | "name"
  | "age"
  | "credentials";

type VisibleIf = {
  question: string;
  value: string;
};
