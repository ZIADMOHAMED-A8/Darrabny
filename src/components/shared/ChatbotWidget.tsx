"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

export type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

type ChatHistoryItem = {
  role: "user" | "model";
  parts: Array<{ text: string }>;
};

const createId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function ChatbotWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const history = useMemo<ChatHistoryItem[]>(() => {
    return messages.map((message) => ({
      role: message.sender === "user" ? "user" : "model",
      parts: [{ text: message.text }],
    }));
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: createId(),
      text: trimmed,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:5000/chat/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = (await response.json()) as { reply?: string };
      const replyText = data.reply?.trim();

      if (!replyText) {
        throw new Error("Empty reply");
      }

      setMessages((prev) => [
        ...prev,
        { id: createId(), text: replyText, sender: "bot" },
      ]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to reach the server. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-end gap-3 font-sans">
      <style>{`
        @keyframes widget-pop {
          0% { opacity: 0; transform: translateY(16px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bubble-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dot-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes launcher-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.35); }
          50% { box-shadow: 0 0 0 8px rgba(124, 58, 237, 0); }
        }
        .cw-scroll::-webkit-scrollbar { width: 6px; }
        .cw-scroll::-webkit-scrollbar-track { background: transparent; }
        .cw-scroll::-webkit-scrollbar-thumb { background: #d8d2ee; border-radius: 999px; }
      `}</style>

      {isOpen && (
        <div
          className="flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-[#e8e4fb] bg-white shadow-[0_20px_50px_-12px_rgba(76,29,149,0.25)]"
          style={{ animation: "widget-pop 0.25s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {/* Header */}
          <div className="relative flex items-center justify-between bg-gradient-to-br  bg-blue-600 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] text-violet-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Online now
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="cw-scroll flex h-[440px] flex-col gap-3 overflow-y-auto bg-[#fbfaff] px-4 py-4">
            {messages.length === 0 ? (
              <div className="m-auto flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-slate-700">How can I help today?</p>
                <p className="max-w-[220px] text-xs text-slate-400">
                  Ask a question and I'll get back to you right away.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  style={{ animation: "bubble-in 0.2s ease-out" }}
                  className={
                    message.sender === "user" ? "flex justify-end" : "flex justify-start"
                  }
                >
                  <div
                    className={
                      message.sender === "user"
                        ? "max-w-[78%] rounded-2xl rounded-br-md bg-gradient-to-br bg-blue-600 px-4 py-2.5 text-sm text-white shadow-sm"
                        : "max-w-[78%] rounded-2xl rounded-bl-md border border-[#ece8fb] bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm"
                    }
                  >
                    {message.text}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start" style={{ animation: "bubble-in 0.2s ease-out" }}>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-[#ece8fb] bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-violet-400"
                      style={{ animation: `dot-bounce 1s ease-in-out ${i * 0.15}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {errorMessage && (
            <div className="mx-4 mb-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[#f0edfa] bg-white px-3 py-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message…"
              disabled={isLoading}
              aria-label="Chat message"
              className="flex-1 rounded-full border border-[#e6e1f7] bg-[#fbfaff] px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition  focus:bg-white focus:ring-2 "
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br bg-blue-600 text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:shadow-md enabled:hover:brightness-105 active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
          style={{ animation: "launcher-pulse 2.4s ease-in-out infinite" }}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br bg-blue-700 text-white shadow-lg transition hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}