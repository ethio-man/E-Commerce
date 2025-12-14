import { GoogleGenAI } from "@google/genai";
import express from "express";
const route = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

route.post("/", async (req, res) => {
  const { name, brand, category } = req.body;
  try {
    const prompt = `Write a compelling, professional, and short e-commerce product description (max 2 sentences) for a product named "${name}" by the brand "${brand}" in the "${category}" category. Focus on benefits and appeal.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    if (!response) return res.status(404).json("unable to get response");
    const description = response.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json(description);
  } catch (err) {
    console.log("Error generating description:", err);
    res.status(500).json({ message: "Unable to access gemini server." });
  }
});

export default route;
