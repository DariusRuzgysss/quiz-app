export type Answer = {
  [key: string]: string[] | AnswerObject;
};

export type AnswerItem = string | AnswerObject;
export type AnswerObject = { email?: string; password?: string; name?: string };
