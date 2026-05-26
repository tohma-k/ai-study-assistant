# AI Study Assistant

An AI-powered full-stack web application that summarizes notes, generates flashcards, and creates quizzes using LLM APIs.

## Features

- AI-generated summaries
- Flashcard generation
- Quiz generation
- Responsive React frontend
- Express.js backend API
- Groq LLM integration
- Loading states and error handling

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js

### AI
- Groq API
- Llama 3.3 70B

## Installation

### Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-study-assistant.git
cd ai-study-assistant
```

### Frontend setup

```bash
npm install
npm run dev
```

### Backend setup

```bash
cd backend
npm install
node server.js
```

## Environment Variables

Create a `.env` file inside `backend/`

```env
GROQ_API_KEY=your_api_key_here
```

## Future Improvements

- User authentication
- Saved study sessions
- PDF uploads
- Docker support
- Markdown rendering
- Database integration

## License

MIT