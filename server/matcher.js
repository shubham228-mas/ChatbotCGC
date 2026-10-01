import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const faqs = JSON.parse(
  readFileSync(path.join(__dirname, "data", "faqs.json"), "utf-8")
);

const FALLBACK =
  "Sorry, I don't have information on that yet. You can ask me about admissions, fees, courses, exams, hostel, placements or contact details.";

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9.\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

// Day 1: simple keyword scoring. On Day 3 we replace this with an LLM + RAG.
export function findAnswer(message) {
  const text = message.toLowerCase();
  const tokens = new Set(tokenize(message));

  let best = null;
  let bestScore = 0;

  for (const faq of faqs) {
    let score = 0;
    for (const kw of faq.keywords) {
      if (kw.includes(" ") ? text.includes(kw) : tokens.has(kw)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }

  if (!best) return { answer: FALLBACK, topic: null, matched: false };
  return { answer: best.answer, topic: best.topic, matched: true };
}
