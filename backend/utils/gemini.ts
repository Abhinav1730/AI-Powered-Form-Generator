import axios from "axios";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

export async function callGemini(prompt: string): Promise<any> {
  const systemPrompt =
    "You are an AI that generates JSON schemas for forms. Given a prompt, always return a JSON object with a fields array, each field having type, label, and name.";

  const data = {
    contents: [
      { role: "system", parts: [{ text: systemPrompt }] },
      { role: "user", parts: [{ text: prompt }] },
    ],
  };

  const res = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, data);

  const text =
    res.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON from Gemini");
  }
}