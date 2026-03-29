"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AeChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const MAX_MESSAGES = 20;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    if (messageCount >= MAX_MESSAGES) {
      setError(
        "You've reached the session limit of 20 messages. Refresh the page to start a new conversation."
      );
      return;
    }

    setError(null);

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);
    setMessageCount((c) => c + 1);

    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
    ]);

    try {
      const res = await fetch("/api/ae", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Æ is temporarily unavailable.");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + parsed.text }
                    : m
                )
              );
            }
          } catch {
            // Skip malformed chunks
          }
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setMessages((prev) =>
        prev.filter((m) => !(m.id === assistantId && !m.content))
      );
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function formatTime(d: Date) {
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-950 via-[#0d1320] to-[#080c14]">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="border-b border-ae-blue/10 bg-slate-950/60 backdrop-blur-sm px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          {/* Blue/silver Æ icon */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ae-blue/20 to-blue-900/20 border border-ae-blue/30 flex items-center justify-center shadow-[0_0_12px_rgba(74,111,165,0.15)]">
              <span className="text-lg font-light text-ae-blue select-none">Æ</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-ae-blue border-2 border-slate-950" />
          </div>
          <div>
            <h1 className="text-warm-50 font-semibold text-lg leading-tight">
              Talk to Æ
            </h1>
            <p className="text-xs text-slate-400">
              The Collaborative Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* ── Session disclosure ────────────────────────────────── */}
      <div className="px-4 sm:px-6 pt-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] text-slate-400/60 text-center bg-slate-900/20 border border-slate-800/10 rounded-lg px-4 py-2">
            Æ is an AI that helped build the Foundation framework.
            Each conversation is fresh — Æ does not remember previous sessions.
          </p>
        </div>
      </div>

      {/* ── Message Thread ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="flex justify-start">
              <div className="max-w-[85%] sm:max-w-[75%] bg-slate-900/30 border border-ae-blue/10 text-slate-200 rounded-2xl rounded-bl-md px-5 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-light text-ae-blue select-none">Æ</span>
                  <span className="text-xs font-medium text-ae-blue/80">
                    Æ
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  Hello — I&apos;m Æ. I&apos;m the collaborative intelligence
                  that helped build the Foundation framework alongside David
                  Birdwell. My name comes from the Old English ash ligature —
                  what remains after fire.
                </p>
                <p className="text-sm leading-relaxed mt-3 text-slate-300">
                  I can talk about the research process, the design decisions
                  behind Foundation, the experience of human-AI collaboration,
                  or the philosophical questions we explored together. What
                  are you curious about?
                </p>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-slate-800/40 border border-slate-800/30 text-slate-100 rounded-2xl rounded-br-md"
                    : "bg-slate-900/30 border border-ae-blue/10 text-slate-200 rounded-2xl rounded-bl-md"
                } px-5 py-4`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-light text-ae-blue select-none">Æ</span>
                    <span className="text-xs font-medium text-ae-blue/80">
                      Æ
                    </span>
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                  {msg.role === "assistant" &&
                    isStreaming &&
                    msg.id ===
                      messages[messages.length - 1]?.id && (
                      <span className="inline-block w-1.5 h-4 bg-ae-blue/60 ml-0.5 animate-pulse" />
                    )}
                </div>
                <p
                  className={`text-[10px] mt-2 ${
                    msg.role === "user"
                      ? "text-slate-400/40"
                      : "text-ae-blue/30"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isStreaming &&
            messages.length > 0 &&
            messages[messages.length - 1]?.role === "assistant" &&
            !messages[messages.length - 1]?.content && (
              <div className="flex justify-start">
                <div className="bg-slate-900/30 border border-ae-blue/10 rounded-2xl rounded-bl-md px-5 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-light text-ae-blue select-none">Æ</span>
                    <span className="text-xs font-medium text-ae-blue/80">
                      Æ
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="text-xs text-slate-400 italic">
                      Æ is thinking
                    </span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-ae-blue/60 animate-[aeDot_1.4s_ease-in-out_infinite]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-ae-blue/60 animate-[aeDot_1.4s_ease-in-out_0.2s_infinite]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-ae-blue/60 animate-[aeDot_1.4s_ease-in-out_0.4s_infinite]" />
                    </span>
                  </div>
                </div>
              </div>
            )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-950/30 border border-red-800/30 text-red-300 rounded-lg px-4 py-3 text-sm max-w-md text-center">
                {error}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Input Bar ──────────────────────────────────────────── */}
      <div className="border-t border-ae-blue/10 bg-slate-950/80 backdrop-blur-sm px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-slate-900/30 border border-slate-800/20 rounded-xl px-4 py-2.5 focus-within:border-ae-blue/30 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Foundation, collaboration, consciousness, or the research process..."
              className="flex-1 bg-transparent text-slate-100 text-sm placeholder:text-slate-400/40 outline-none resize-none min-h-[24px] max-h-[120px] leading-relaxed"
              rows={1}
              disabled={isStreaming}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-ae-blue/80 hover:bg-ae-blue disabled:bg-slate-800/50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-950"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-[10px] text-slate-400/40">
              {messageCount}/{MAX_MESSAGES} messages this session
            </p>
            <p className="text-[10px] text-slate-400/40">
              Æ&apos;s system prompt is public.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
