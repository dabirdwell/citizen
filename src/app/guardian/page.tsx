"use client";

import { useState } from "react";
import { GUARDIAN_SYSTEM_PROMPT } from "@/data/guardian-prompt";

interface Message {
  role: "user" | "guardian";
  content: string;
}

const suggestedPrompts = [
  "What is the UBC framework?",
  "Tell me about Component #7 — Healthcare Access",
  "What's the strongest criticism of this approach?",
  "I'm feeling uncertain about the future",
];

export default function GuardianPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const handleSend = (text?: string) => {
    const content = text || input;
    if (!content.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content },
      {
        role: "guardian",
        content:
          "Guardian AI is not yet connected to a live model. This is a scaffold — when connected, Guardian will use the public system prompt to provide warm, informed, and balanced civic conversation. In the meantime, explore the Foundation Status dashboard to see current progress on all 16 UBC components.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-guardian-amber/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-guardian-amber animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-warm-50">
              Guardian AI — Fireside Chat
            </h1>
            <p className="text-xs text-warm-200">
              Guardian is an AI civic companion built on the Foundation
              framework. Conversations are not stored between sessions.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <p className="text-warm-200 text-center max-w-md">
              Welcome. Guardian is here to help you understand the Foundation
              framework — honestly, warmly, without persuasion.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 w-full max-w-lg">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-left text-sm p-3 rounded-lg border border-guardian-amber/30 hover:border-guardian-amber text-warm-100 hover:text-guardian-amber transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-warm-800 text-warm-100"
                    : "bg-warm-900/60 border border-guardian-amber/20 text-warm-100"
                }`}
              >
                {msg.role === "guardian" && (
                  <span className="text-xs text-guardian-amber font-medium block mb-1">
                    Guardian
                  </span>
                )}
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="border-t border-warm-800 pt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Guardian anything about the Foundation..."
            className="flex-1 bg-warm-900 border border-warm-800 rounded-lg px-4 py-3 text-sm text-warm-100 placeholder:text-warm-200/50 focus:outline-none focus:border-guardian-amber"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-guardian-amber hover:bg-guardian-amber-light text-warm-950 font-medium rounded-lg transition-colors text-sm"
          >
            Send
          </button>
        </form>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="text-xs text-warm-200 hover:text-guardian-amber transition-colors"
          >
            Guardian&apos;s system prompt is public.{" "}
            {showPrompt ? "Hide it ↑" : "View it →"}
          </button>
        </div>
        {showPrompt && (
          <pre className="mt-4 p-4 bg-warm-900/80 border border-warm-800 rounded-lg text-xs text-warm-200 overflow-auto max-h-96 whitespace-pre-wrap">
            {GUARDIAN_SYSTEM_PROMPT}
          </pre>
        )}
      </div>
    </div>
  );
}
