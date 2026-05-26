import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [flashcards, setFlashcards] = useState("");
  const [quiz, setQuiz] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [flashcardsLoading, setFlashcardsLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);

  const handleSummarize = async () => {
    if (!notes.trim()) {
      setSummary("Please enter notes before summarizing.");
      return;
    }

    setSummaryLoading(true);

    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      const data = await response.json();

      setSummary(data.summary);
    } catch (error) {
      console.error(error);
      setSummary("Something went wrong.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleFlashcards = async () => {
    if (!notes.trim()) {
      setFlashcards("Please enter notes before generating flashcards.");
      return;
    }

    setFlashcardsLoading(true);

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

      setFlashcards(data.flashcards);

    } catch (error) {
      console.error(error);

      setFlashcards("Something went wrong.");
    } finally {
      setFlashcardsLoading(false);
    }
  };

  const handleQuiz = async () => {
    if (!notes.trim()) {
      setQuiz("Please enter notes before generating a quiz.");
      return;
    }

    setQuizLoading(true);

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

      setQuiz(data.quiz);

    } catch (error) {
      console.error(error);

      setQuiz("Something went wrong.");
    } finally {
      setQuizLoading(false);
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
          <button onClick={handleSummarize} disabled={summaryLoading}>
            {summaryLoading ? "Generating..." : "Summarize"}
          </button>

          <button onClick={handleFlashcards} disabled={flashcardsLoading}>
            {flashcardsLoading ? "Generating..." : "Generate Flashcards"}
          </button>

          <button onClick={handleQuiz} disabled={quizLoading}>
            {quizLoading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>

        <section className="output">
          <h2>Summary</h2>
          <p>{summary}</p>

          <h2>Flashcards</h2>
          <p>{flashcards}</p>

          <h2>Quiz</h2>
          <p>{quiz}</p>
        </section>
      </section>
    </main>
  );
}

export default App;