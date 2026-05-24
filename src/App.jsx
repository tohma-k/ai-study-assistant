import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");

  const handleSummarize = async () => {
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
          <button onClick={handleSummarize}>
            Summarize
          </button>

          <button>
            Generate Flashcards
          </button>

          <button>
            Generate Quiz
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