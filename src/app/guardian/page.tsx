"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function GuardianChatPage() {
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

  // Auto-resize textarea
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

    // Placeholder for streaming assistant message
    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
    ]);

    try {
      const res = await fetch("/api/guardian", {
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
        throw new Error(data.error || "Guardian is temporarily unavailable.");
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
      // Remove empty assistant message on error
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
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-warm-950 via-[#1a130d] to-[#0f0b07]">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="border-b border-guardian-amber/10 bg-warm-950/60 backdrop-blur-sm px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          {/* Warm amber glow icon */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-guardian-amber/20 to-amber-900/20 border border-guardian-amber/30 flex items-center justify-center shadow-[0_0_12px_rgba(212,160,71,0.15)]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-guardian-amber"
              >
                <path d="M12 2L3 7v5c0 7.18 5.17 13.88 9 15 3.83-1.12 9-7.82 9-15V7l-9-5z" />
              </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-guardian-amber border-2 border-warm-950" />
          </div>
          <div>
            <h1 className="text-warm-50 font-semibold text-lg leading-tight">
              Guardian
            </h1>
            <p className="text-xs text-warm-400">
              Civic AI companion
            </p>
          </div>
          <Link
            href="/guardian/constitution"
            className="ml-auto text-xs text-guardian-amber/70 hover:text-guardian-amber transition-colors hidden sm:block"
          >
            View Constitution
          </Link>
        </div>
      </div>

      {/* ── Session disclosure ────────────────────────────────── */}
      <div className="px-4 sm:px-6 pt-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] text-warm-400/60 text-center bg-warm-900/20 border border-warm-800/10 rounded-lg px-4 py-2">
            Guardian is an AI civic companion. Conversations are not stored.
            Each session starts fresh.
          </p>
        </div>
      </div>

      {/* ── Message Thread ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome message (always shown) */}
          {messages.length === 0 && (
            <div className="flex justify-start">
              <div className="max-w-[85%] sm:max-w-[75%] bg-warm-900/30 border border-guardian-amber/10 text-warm-200 rounded-2xl rounded-bl-md px-5 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-guardian-amber"
                  >
                    <path d="M12 2L3 7v5c0 7.18 5.17 13.88 9 15 3.83-1.12 9-7.82 9-15V7l-9-5z" />
                  </svg>
                  <span className="text-xs font-medium text-guardian-amber/80">
                    Guardian
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  Hello — I&apos;m Guardian, a publicly owned AI serving citizens
                  of the Foundation for Humanity and AI. I&apos;m here to help
                  you understand Foundation&apos;s 16 components, discuss civic
                  technology, or simply have an honest conversation about the
                  systems that shape our lives.
                </p>
                <p className="text-sm leading-relaxed mt-3 text-warm-300">
                  What&apos;s on your mind?
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
                    ? "bg-warm-800/40 border border-warm-800/30 text-warm-100 rounded-2xl rounded-br-md"
                    : "bg-warm-900/30 border border-guardian-amber/10 text-warm-200 rounded-2xl rounded-bl-md"
                } px-5 py-4`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-guardian-amber"
                    >
                      <path d="M12 2L3 7v5c0 7.18 5.17 13.88 9 15 3.83-1.12 9-7.82 9-15V7l-9-5z" />
                    </svg>
                    <span className="text-xs font-medium text-guardian-amber/80">
                      Guardian
                    </span>
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                  {msg.role === "assistant" &&
                    isStreaming &&
                    msg.id ===
                      messages[messages.length - 1]?.id && (
                      <span className="inline-block w-1.5 h-4 bg-guardian-amber/60 ml-0.5 animate-pulse" />
                    )}
                </div>
                <p
                  className={`text-[10px] mt-2 ${
                    msg.role === "user"
                      ? "text-warm-400/40"
                      : "text-guardian-amber/30"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator (before first token) */}
          {isStreaming &&
            messages.length > 0 &&
            messages[messages.length - 1]?.role === "assistant" &&
            !messages[messages.length - 1]?.content && (
              <div className="flex justify-start">
                <div className="bg-warm-900/30 border border-guardian-amber/10 rounded-2xl rounded-bl-md px-5 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-guardian-amber"
                    >
                      <path d="M12 2L3 7v5c0 7.18 5.17 13.88 9 15 3.83-1.12 9-7.82 9-15V7l-9-5z" />
                    </svg>
                    <span className="text-xs font-medium text-guardian-amber/80">
                      Guardian
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="text-xs text-warm-400 italic">
                      Guardian is reflecting
                    </span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-guardian-amber/60 animate-[guardianDot_1.4s_ease-in-out_infinite]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-guardian-amber/60 animate-[guardianDot_1.4s_ease-in-out_0.2s_infinite]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-guardian-amber/60 animate-[guardianDot_1.4s_ease-in-out_0.4s_infinite]" />
                    </span>
                  </div>
                </div>
              </div>
            )}

          {/* Error display */}
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
      <div className="border-t border-guardian-amber/10 bg-warm-950/80 backdrop-blur-sm px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-warm-900/30 border border-warm-800/20 rounded-xl px-4 py-2.5 focus-within:border-guardian-amber/30 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about healthcare, education, housing, civic technology..."
              className="flex-1 bg-transparent text-warm-100 text-sm placeholder:text-warm-400/40 outline-none resize-none min-h-[24px] max-h-[120px] leading-relaxed"
              rows={1}
              disabled={isStreaming}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-guardian-amber/80 hover:bg-guardian-amber disabled:bg-warm-800/50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-warm-950"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-[10px] text-warm-400/40">
              {messageCount}/{MAX_MESSAGES} messages this session
            </p>
            <p className="text-[10px] text-warm-400/40">
              Guardian system prompt is public.{" "}
              <Link
                href="/guardian/constitution"
                className="text-guardian-amber/50 hover:text-guardian-amber/80 transition-colors"
              >
                View it →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
