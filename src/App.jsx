import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!notes.trim()) {
      setOutput("Please enter notes before summarizing.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      const data = await response.json();

      setOutput(data.summary);
    } catch (error) {
      console.error(error);
      setOutput("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleFlashcards = async () => {
    if (!notes.trim()) {
    setOutput("Please enter notes before generating flashcards.");
    return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/flashcards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notes }),
        }
      );

      const data = await response.json();

      setOutput(data.flashcards);

    } catch (error) {
      console.error(error);

      setOutput("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuiz = async () => {
    if (!notes.trim()) {
      setOutput("Please enter notes before generating a quiz.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notes }),
        }
      );

      const data = await response.json();

      setOutput(data.quiz);

    } catch (error) {
      console.error(error);

      setOutput("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <section className="card">
        <h1>AI Study Assistant</h1>

        <textarea
          placeholder="Paste your notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="buttons">
          <button onClick={handleSummarize} disabled={loading}>
            {loading ? "Generating..." : "Summarize"}
          </button>

          <button onClick={handleFlashcards} disabled={loading}>
            {loading ? "Generating..." : "Generate Flashcards"}
          </button>

          <button onClick={handleQuiz}>
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>

        <section className="output">
          <h2>Output</h2>
          <p>{output}</p>
        </section>
      </section>
    </main>
  );
}

export default App;