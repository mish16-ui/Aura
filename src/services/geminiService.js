import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log("API KEY:", API_KEY);

if (!API_KEY) {
  console.error("Gemini API Key not found. Check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const getGeminiResponse = async (
  prompt,
  history = [],
  taskContext = ""
) => {
  try {
    // Build previous conversation
    const formattedHistory = history
      .filter((msg) => msg.text)
      .map((msg) => ({
        role: msg.isAI ? "model" : "user",
        parts: [{ text: msg.text }],
      }));

    // Gemini requires first history message to be from user
    while (
      formattedHistory.length > 0 &&
      formattedHistory[0].role === "model"
    ) {
      formattedHistory.shift();
    }

    const chat = model.startChat({
      history: formattedHistory,
    });

    const fullPrompt = `
You are Aura, an AI Productivity Coach.

Current User Tasks:
${taskContext}

Instructions:
- Use the task list whenever relevant.
- Help the user prioritize work.
- Be concise.
- Be motivating.
- Speak in a premium AI assistant tone.

User:
${prompt}
`;

    const result = await chat.sendMessage(fullPrompt);

    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error(
      error.message || "Unable to contact Gemini."
    );
  }
};