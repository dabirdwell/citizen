import Anthropic from "@anthropic-ai/sdk";
import {
  GUARDIAN_SYSTEM_PROMPT,
  getFoundationStatusSummary,
} from "@/data/guardian-prompt";

const anthropic = new Anthropic();

const MAX_MESSAGES_PER_SESSION = 20;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: { role: "user" | "assistant"; content: string }[] =
      body.messages ?? [];

    // Rate limit: reject if too many messages in session
    const userMessageCount = messages.filter((m) => m.role === "user").length;
    if (userMessageCount > MAX_MESSAGES_PER_SESSION) {
      return new Response(
        JSON.stringify({
          error:
            "Session limit reached. Guardian conversations are limited to 20 messages per session to keep this service free for everyone.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build system prompt with live Foundation status
    const systemPrompt = `${GUARDIAN_SYSTEM_PROMPT}

═══════════════════════════════════════════════════════════════
CURRENT FOUNDATION STATUS (live data)
═══════════════════════════════════════════════════════════════

${getFoundationStatusSummary()}`;

    // Stream response from Claude
    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    // Return as SSE stream
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
    console.error("Guardian API error:", err);
    return new Response(
      JSON.stringify({
        error: "Guardian is temporarily unavailable. Please try again.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
