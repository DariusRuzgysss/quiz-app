import { isStringArray } from "@utils/helper";
import { AnswerItem } from "@utils/types/answer";
import { StoreState } from "@utils/types/store";
import { create } from "zustand";

const useStore = create<StoreState>()((set, get) => ({
  questions: [],
  filteredQuestions: [],
  questionsCount: 0,
  currentQuizPage: 0,
  setCurrentQuizPage: (pageNumber: number) =>
    set({ currentQuizPage: pageNumber }),
  setQuestionsCount: (val: number) => set({ questionsCount: val }),
  answers: {},
  setQuestions: (data) => set({ questions: data }),
  setFilteredQuestions: (data) => set({ filteredQuestions: data }),
  setAnswer: (key: string, answer: AnswerItem) => {
    const answers = get().answers;
    if (key === "program") {
      const filtered = get().questions.filter((q) => {
        if (
          (isStringArray(answer.value) ? answer.value : []).includes(
            "quit_alcohol"
          )
        ) {
          return q.key !== "smoke";
        }
        return q.key !== "drink";
      });
      set({ filteredQuestions: filtered });
      set({ questionsCount: filtered.length - 1 });
    }
    set({
      answers: {
        ...answers,
        [key]: answer,
      },
    });
    return;
  },
}));

export default useStore;
