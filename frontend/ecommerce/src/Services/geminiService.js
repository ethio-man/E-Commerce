import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GOOGLE_API_KEY });
// this should be inplementd on the backend to privent the api_key exposure on the browser
export const generateProductDescription = async (name, brand, category) => {
  try {
    const prompt = `Write a compelling, professional, and short e-commerce product description (max 2 sentences) for a product named "${name}" by the brand "${brand}" in the "${category}" category. Focus on benefits and appeal.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Failed to generate description via Gemini.");
  }
};
