"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlinePaperAirplane, HiOutlineRefresh } from "react-icons/hi";
import api from "@/lib/api";
import { friendlyAiError } from "@/lib/aiErrors";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import { Loader } from "@/components/ui/Feedback";

const GREETING = {
  id: 1,
  role: "ai",
  content:
    "Ask me about destinations, when to go, how to get around, what things cost, or local customs. I can’t book anything or see live prices, so treat numbers as estimates.",
};

const STARTERS = [
  "Is late March a good time for Kyoto?",
  "How much should I budget per day in Lisbon?",
  "Getting from Rome to the Amalfi Coast by train",
  "Tipping customs in Morocco",
];

export default function AIChatPage() {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const nextId = useRef(2);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || isTyping) return;

    const userMessage = { id: nextId.current++, role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // History includes the new message and skips the opening greeting.
      const all = [...messages, userMessage];
      const firstUser = all.findIndex((m) => m.role === "user");
      const history = all.slice(firstUser).map((m) => ({ role: m.role === "ai" ? "model" : "user", content: m.content }));
      const res = await api.post("/ai/chat", { message: content, history });
      setMessages((prev) => [...prev, { id: nextId.current++, role: "ai", content: res.data.data.reply }]);
    } catch (err) {
      toast.error(friendlyAiError(err, "No answer came back. Try again."));
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
      setInput(content);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const fresh = messages.length === 1;

  return (
    <div className="flex h-[calc(100dvh-14rem)] min-h-[480px] flex-col lg:h-[calc(100dvh-5rem)]">
      <header className="flex items-end justify-between gap-4 border-b-[3px] border-ink pb-4">
        <div>
          <h1 className="display text-[2.6rem] sm:text-[3.25rem]">Ask AI</h1>
          <p className="mt-1 text-ink-soft">Travel questions, answered in plain language.</p>
        </div>
        {!fresh && (
          <Button variant="ghost" size="sm" onClick={() => setMessages([GREETING])} disabled={isTyping}>
            <HiOutlineRefresh className="h-4 w-4" aria-hidden="true" /> New conversation
          </Button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto py-6" aria-live="polite" aria-relevant="additions">
        <ul className="mx-auto max-w-3xl space-y-6">
          {messages.map((m) =>
            m.role === "user" ? (
              <li key={m.id} className="flex justify-end">
                <p className="max-w-[85%] whitespace-pre-wrap bg-ink px-4 py-2.5 text-board">{m.content}</p>
              </li>
            ) : (
              <li key={m.id} className="max-w-[92%]">
                <p className="caps mb-1.5 flex items-center gap-2 text-[0.72rem] text-crimson">
                  <span aria-hidden="true" className="flex h-3">
                    <span className="w-1.5 bg-crimson" />
                    <span className="w-1.5 bg-gold" />
                    <span className="w-1.5 bg-emerald" />
                  </span>
                  VoyageAI
                </p>
                <p className="whitespace-pre-wrap text-[1.02rem] leading-relaxed">{m.content}</p>
              </li>
            )
          )}
          {isTyping && (
            <li>
              <Loader label="Thinking" />
            </li>
          )}
          <li ref={endRef} aria-hidden="true" />
        </ul>

        {fresh && (
          <div className="mx-auto mt-8 max-w-3xl">
            <p className="caps text-[0.75rem] text-muted">Try asking</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="border-[1.5px] border-ink/25 bg-field px-4 py-3 text-left transition-colors hover:border-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="mx-auto w-full max-w-3xl border-t-[3px] border-ink pt-4"
      >
        <label htmlFor="chat-input" className="sr-only">
          Your question
        </label>
        <div className="flex items-end gap-2">
          <textarea
            id="chat-input"
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about a place, a budget, a route…"
            className="max-h-40 min-h-11 flex-1 resize-none border-[1.5px] border-ink/30 bg-field px-3 py-2.5 placeholder:text-placeholder focus:border-ink focus:shadow-[0_0_0_3px_var(--color-gold-wash)] focus:outline-none [field-sizing:content]"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping} aria-label="Send question">
            <HiOutlinePaperAirplane className="h-5 w-5 rotate-90" aria-hidden="true" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted">Enter to send, Shift + Enter for a new line. Answers can be wrong; check what matters.</p>
      </form>
    </div>
  );
}
