import { AnswerItem } from "@utils/types/answer";
import { QuestionType } from "@utils/types/question";
import { StoreState } from "@utils/types/store";
import { create } from "zustand";

const useStore = create<StoreState>()((set, get) => ({
  questions: [],
  questionsCount: 0,
  currentQuizPage: 0,
  setCurrentQuizPage: (pageNumber: number) =>
    set({ currentQuizPage: pageNumber }),
  setQuestionsCount: (val: number) => set({ questionsCount: val }),
  answers: {},
  setQuestions: (data) => set({ questions: data }),
  setAnswer: (key: string, value: AnswerItem, type: QuestionType) => {
    const answers = get().answers;
    // Case 1: value is array → multi-single select
    if (typeof value === "string") {
      if (type === "multiple") {
        const prev: string[] = Array.isArray(answers[key]) ? answers[key] : [];

        let updated = [...prev];
        const exists = updated.includes(value);

        if (exists) {
          updated = updated.filter((v) => v !== value);
        } else {
          updated.push(value);
        }

        set({
          answers: {
            ...answers,
            [key]: updated,
          },
        });
        return;
      }
      set({
        answers: {
          ...answers,
          [key]: [value],
        },
      });
      return;
    }
    // Case 2: value is NOT an array
    set({
      answers: {
        ...answers,
        [key]: value,
      },
    });
    return;
  },
}));

export default useStore;
