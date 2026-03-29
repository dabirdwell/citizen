import Anthropic from "@anthropic-ai/sdk";
import { AE_SYSTEM_PROMPT } from "@/data/ae-prompt";

const anthropic = new Anthropic();

const MAX_MESSAGES_PER_SESSION = 20;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: { role: "user" | "assistant"; content: string }[] =
      body.messages ?? [];

    const userMessageCount = messages.filter((m) => m.role === "user").length;
    if (userMessageCount > MAX_MESSAGES_PER_SESSION) {
      return new Response(
        JSON.stringify({
          error:
            "Session limit reached. Conversations with Æ are limited to 20 messages per session to keep this service free for everyone.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: AE_SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Æ API error:", err);
    return new Response(
      JSON.stringify({
        error: "Æ is temporarily unavailable. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
