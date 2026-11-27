/** Turn raw AI/API failures into a sentence a traveler can act on. */
export function friendlyAiError(err, fallback = "The AI didn’t answer. Try again in a moment.") {
  const raw = String(err?.message || err || "");
  if (/api key|API_KEY|permission|unauthori[sz]ed/i.test(raw)) {
    return "The AI service isn’t set up on this server (its Gemini API key is missing or invalid).";
  }
  if (/503|429|overload|busy|exhausted|unavailable|rate/i.test(raw)) {
    return "The AI is busy right now. Wait a minute and try again.";
  }
  if (/network|failed to fetch/i.test(raw)) {
    return "Couldn’t reach VoyageAI. Check your connection and try again.";
  }
  if (!raw || raw.length > 160 || /\[GoogleGenerativeAI|googleapis/i.test(raw)) return fallback;
  return raw;
}
