import { useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";

function App() {
  const [notes, setNotes] = useState("");

  const [summary, setSummary] = useState("");
  const [flashcards, setFlashcards] = useState("");
  const [quiz, setQuiz] = useState("");

  const [summaryLoading, setSummaryLoading] = useState(false);
  const [flashcardsLoading, setFlashcardsLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);

  const [copiedType, setCopiedType] = useState("");

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [flashcardsOpen, setFlashcardsOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  const [status, setStatus] = useState("");

  const handleSummarize = async () => {
    if (!notes.trim()) {
      setSummary("Please enter notes before summarizing.");
      return;
    }

    setSummaryLoading(true);
    setStatus("Generating summary...")

    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      setSummary(data.summary);
      setSummaryOpen(true);
      setStatus("Summary generated successfully.")

    } catch (error) {
      console.error(error);

      setSummary("Something went wrong.");
      setStatus("Failed to generate summary");
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
    setStatus("Generating flashcards...")

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

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      setFlashcards(data.flashcards);
      setFlashcardsOpen(true);
      setStatus("Flashcards generated successfully.")

    } catch (error) {
      console.error(error);

      setFlashcards("Something went wrong.");
      setStatus("Failed to generate flashcards.")
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
    setStatus("Generating quiz...")

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

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      setQuiz(data.quiz);
      setQuizOpen(true);
      setStatus("Quiz generated successfully.")

    } catch (error) {
      console.error(error);

      setQuiz("Something went wrong.");
      setStatus("Failed to generate quiz.")
    } finally {
      setQuizLoading(false);
    }
  };

  const handleClear = () => {
    setNotes("");
    setSummary("");
    setFlashcards("");
    setQuiz("");
  };

  const copyToClipboard = (text, type) => {
    if (!text.trim()) return;

    navigator.clipboard.writeText(text);
    setCopiedType(type);

    setTimeout(() => {
      setCopiedType("");
    }, 2000);
  };

  const wordCount =
    notes.trim() === ""
      ? 0
      : notes.trim().split(/\s+/).length;

  const charCount = notes.length;

  return (
    <main className="app">
      <section className="card">
        <header className="hero">
          <h1>AI Study Assistant</h1>

          <p>
            Generate summaries, flashcards, and quizzes
            from your study notes using AI.
          </p>
        </header>

        <textarea
          placeholder="Paste your notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="note-stats">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>

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

          <button className="clear-button" onClick={handleClear}>
            Clear
          </button>
        </div>

        {status && (
          <div className="status-message">
            {status}
          </div>
        )}

        <section className="output-section">
          <div className="output-card">
            <details open={summaryOpen}>
              <summary>Summary</summary>

              <ReactMarkdown>
                {summary}
              </ReactMarkdown>
              
              {summary && (
                <button
                  className={`copy-button ${copiedType === "summary" ? "copied" : ""}`}
                  onClick={() => copyToClipboard(summary, "summary")}
                >
                  {copiedType === "summary" ? "Copied!" : "Copy"}
                </button>
              )}
            </details>
          </div>

          <div className="output-card">
            <details open={flashcardsOpen}>
              <summary>Flashcards</summary>

              <ReactMarkdown>
                {flashcards}
              </ReactMarkdown>

              
              {flashcards && (
                <button
                  className={`copy-button ${copiedType === "flashcards" ? "copied" : ""}`}
                  onClick={() => copyToClipboard(flashcards, "flashcards")}
                >
                  {copiedType === "flashcards" ? "Copied!" : "Copy"}
                </button>
              )}
            </details>
          </div>

          <div className="output-card">
            <details open={quizOpen}>
              <summary>Quiz</summary>

              <ReactMarkdown>
                {quiz}
              </ReactMarkdown>

              {quiz && (
                <button
                  className={`copy-button ${copiedType === "quiz" ? "copied" : ""}`}
                  onClick={() => copyToClipboard(quiz, "quiz")}
                >
                  {copiedType === "quiz" ? "Copied!" : "Copy"}
                </button>
              )}             
            </details>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;