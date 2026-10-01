# CGC University Chatbot

A full-stack chatbot for CGC University, Mohali. Students ask questions about admissions, fees, courses, exams, hostel, placements and contact details.

**Stack:** React (Vite) + Node.js/Express. Later: MongoDB, LLM API with RAG, admin panel.

## Run locally

Open two terminals.

```bash
# Terminal 1: backend (http://localhost:5000)
cd server
npm install
npm run dev

# Terminal 2: frontend (http://localhost:5173)
cd client
npm install
npm run dev
```

Open http://localhost:5173 and ask a question.

## API

| Method | Route | Body | Response |
|---|---|---|---|
| GET | `/api/health` | - | `{ status: "ok" }` |
| POST | `/api/chat` | `{ "message": "fees?" }` | `{ reply, topic, matched }` |

## Project structure

```
cgc-chatbot/
  server/
    index.js         Express app and routes
    matcher.js       keyword FAQ matcher (Day 1)
    data/faqs.json   university Q&A data
  client/
    src/App.jsx      chat UI
    src/index.css    styles
```

## Roadmap

- [x] Day 1: server, chat API, keyword matcher, React chat UI
- [ ] Day 2: replace TODO answers in `faqs.json` with real CGC data
- [ ] Day 3: LLM integration
- [ ] MongoDB knowledge base, RAG, admin panel, chat history, deployment
