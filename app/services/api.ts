import { QuestionResponse } from "@utils/types/question";
import axios from "axios";

export const getQuizList = async (): Promise<QuestionResponse> => {
  const res = await axios.get(process.env.EXPO_PUBLIC_API_URL!);
  if (res.status !== 200) {
    throw new Error("Failed to fetch questions");
  }
  return res.data.data;
};
