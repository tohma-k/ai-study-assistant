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
              "You are a helpful study assistant.",
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});