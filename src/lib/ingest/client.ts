import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "InterviewX", // unique app ID
  name: "InterviewX",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});