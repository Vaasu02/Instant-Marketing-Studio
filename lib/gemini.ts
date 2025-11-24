import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("⚠ Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(apiKey!);

export async function generateMarketingCopy(productName: string, description: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      You are a world-class marketing expert. 
      Product: "${productName}"
      Description: "${description}"

      Generate the following 3 assets in JSON format:
      1. "slogan": A catchy, punchy slogan (max 10 words).
      2. "socialPost": An engaging social media post with hashtags (max 280 chars).
      3. "imagePrompt": A highly detailed photorealistic AI image prompt.

      Return ONLY raw JSON. No markdown, no backticks.
    `;

        const response = await model.generateContent(prompt);

        // Extract raw text
        const text = response.response.text();
        if (!text) throw new Error("Empty response from Gemini");

        // Clean ```json … ``` wrapping
        const cleanText = text.replace(/```json|```/g, "").trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to generate marketing copy");
    }
}
