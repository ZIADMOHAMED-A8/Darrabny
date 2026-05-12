"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const history = useMemo<ChatHistoryItem[]>(() => {
    return messages.map((message) => ({
      role: message.sender === "user" ? "user" : "model",
      parts: [{ text: message.text }],
    }));
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

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
    <div className="flex w-full flex-col items-end gap-3">
      {isOpen && (
        <Card className="w-full max-w-xl rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-end pb-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg ring-2 ring-white transition hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </CardHeader>
          <CardContent className="flex h-[520px] flex-col gap-4">
            <div className="flex-1 space-y-4 overflow-y-auto rounded-xl border border-border bg-white/60 p-4">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">Start the conversation...</p>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.sender === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        message.sender === "user"
                          ? "max-w-[75%] rounded-2xl bg-blue-600 px-4 py-2 text-sm text-white"
                          : "max-w-[75%] rounded-2xl bg-gray-100 px-4 py-2 text-sm text-gray-800"
                      }
                    >
                      {message.text}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-gray-100 px-4 py-2 text-sm text-gray-600">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {errorMessage && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                aria-label="Chat message"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg ring-2 ring-white transition hover:bg-slate-800"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
