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
  options?: Option[];
};

type Option = {
  title: string;
  value: string;
};

type QuestionType =
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
