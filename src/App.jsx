import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState("");

  return (
    <main className="app">
      <section className="card">
        <h1>AI Study Assistant</h1>
        <p>Paste your notes to generate summaries, flashcards, and quizzes.</p>

        <textarea
          placeholder="Paste your class notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="buttons">
          <button>Summarize</button>
          <button>Generate Flashcards</button>
          <button>Generate Quiz</button>
        </div>

        <section className="output">
          <h2>Output</h2>
          <p>Your generated study materials will appear here.</p>
        </section>
      </section>
    </main>
  );
}

export default App;