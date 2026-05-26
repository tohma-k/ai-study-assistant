require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();
const PORT = 5000;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post("/summarize", async (req, res) => {
  try {
    const { notes } = req.body;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              `You are a study assistant. 
              Create concise, well-structured summaries. 
              Use bullet points when helpful. 
              Focus on key concepts and definitions.`,
          },
          {
            role: "user",
            content: `Summarize these notes:\n${notes}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    const summary =
      completion.choices[0].message.content;

    res.json({ summary });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error",
    });
  }
});

app.post("/flashcards", async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || notes.trim() === "") {
      return res.status(400).json({
        error: "Notes are required.",
      });
    }

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              `You are a study assistant.
              Generate 5 high-quality flashcards.

              Format:
              Q: ...
              A: ...

              Keep answers concise and educational.`,
          },
          {
            role: "user",
            content: `Create 5 flashcards from these notes:\n\n${notes}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    const flashcards =
      completion.choices[0].message.content;

    res.json({ flashcards });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

app.post("/quiz", async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || notes.trim() === "") {
      return res.status(400).json({
        error: "Notes are required.",
      });
    }

    const completion = 
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
            `You are a study assistant.
            Generate 5 short-answer quiz questions.

            Format:
            1.
            2.
            3.

            Focus on important concepts from the notes.`,
          },
          {
            role: "user",
            content: `Create a quiz from these notes:\n\n${notes}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

      const quiz = 
        completion.choices[0].message.content;

      res.json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});