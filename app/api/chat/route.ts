import { streamText, UIMessage, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import { createSupabaseClient } from "@/lib/supabase";

export async function POST(req: Request) {
  const {
    messages,
    conversationId,
  }: { messages: UIMessage[]; conversationId: string } = await req.json();
  const supabase = createSupabaseClient();

  if (!conversationId) {
    return new Response("Conversation ID is required", { status: 400 });
  }
  console.log("FR: INI MESSAGES", messages);
  const last = messages[messages.length - 1];
  if (last?.role === "user") {
    const { data, error } = await supabase.from("messages").insert({
      id: last.id,
      conversation_id: conversationId,
      role: last.role,
      content: last.parts?.[0]?.type === "text" ? last.parts?.[0]?.text : "",
    });
    if (error) console.error("FR: Supabase insert error:", error);
    console.log("FR: data", data);
  }
  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToModelMessages(messages),
    onFinish: async (message) => {
      await supabase.from("messages").insert({
        id: crypto.randomUUID(),
        conversation_id: conversationId,
        role: "assistant",
        content: message.text,
      });
    },
  });

  return result.toUIMessageStreamResponse({});
}
