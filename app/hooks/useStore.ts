import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreState } from "@utils/types/store";
import { create } from "zustand";
import { createJSONStorage } from "zustand/middleware";

const useStore = create<StoreState<T>>()(
  (set, get) => ({
    questions: [],
    questionsCount: 0,
    currentQuizPage: 1,
    setCurrentQuizPage: (pageNumber: number) =>
      set({ currentQuizPage: pageNumber }),
    setQuestionsCount: (val: number) => set({ questionsCount: val }),
    answers: {},
    setQuestions: (data) => set({ questions: data }),
    setAnswer: (key: string, value: T) =>
      set({
        answers: {
          ...get().answers,
          [key]: value,
        },
      }),
    removeAnswer: (key: string) => {
      const updated = { ...get().answers };
      delete updated[key];
      set({ answers: updated });
    },
  }),
  {
    name: "quiz-storage",
    storage: createJSONStorage(() => AsyncStorage),
  }
);

export default useStore;
