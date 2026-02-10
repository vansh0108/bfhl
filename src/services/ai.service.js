const axios = require("axios");

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

exports.getAIResponse = async (question) => {
  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.AI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
          {
            text: `Answer the following question in ONE WORD ONLY. No explanation.\n\nQuestion: ${question}`
          }
        ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty AI response");
    }

    // Return SINGLE WORD only (requirement)
    return text.trim().split(/\s+/)[0];
  } catch (err) {
    console.error(
      "Gemini error:",
      err.response?.data || err.message
    );
    throw new Error("AI service unavailable");
  }
};
