const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/summarize", (req, res) => {
  const { notes } = req.body;

  if (!notes || notes.trim() === "") {
    return res.status(400).json({ error: "Notes are required." });
  }

  const summary = `Summary: ${notes.slice(0, 150)}...`;

  res.json({ summary });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});