import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreState } from "@utils/types/store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      questions: [],
      setQuestions: (data) => set({ questions: data }),
    }),
    {
      name: "quiz-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
