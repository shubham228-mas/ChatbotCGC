import express from "express";
import cors from "cors";
import { findAnswer } from "./matcher.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "cgc-chatbot-server" });
});

app.post("/api/chat", (req, res) => {
  const { message } = req.body ?? {};

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }
  if (message.length > 500) {
    return res.status(400).json({ error: "message is too long (max 500 chars)" });
  }

  const { answer, topic, matched } = findAnswer(message);
  res.json({ reply: answer, topic, matched });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
