import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createIdGenerator,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, id }: { message: UIMessage; id: string } = body;

    const { userId } = await auth();
    const supabase = createSupabaseClient();

    const { data: existingConversation } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", id)
      .single();

    if (!existingConversation) {
      const { error } = await supabase
        .from("conversations")
        .insert({
          id: id,
          user_id: userId,
          title: "New Conversation",
        })
        .select();

      if (error) console.error("Supabase insert error:", error);
    }

    const { data: previousMessages } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });

    const historyMessages: UIMessage[] = (previousMessages || []).map(
      (msg) => ({
        id: msg.id,
        role: msg.role,
        parts: msg.parts || [],
      })
    );

    const allMessages = [...historyMessages, message];

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: convertToModelMessages(allMessages),
      system:
        "Hi there! 👋 I'm Riley, your medical appointment assistant. How can I help you today?",
    });

    return result.toUIMessageStreamResponse({
      originalMessages: allMessages,
      generateMessageId: createIdGenerator({
        prefix: "msg",
        size: 16,
      }),
      onFinish: async ({ messages }: { messages: UIMessage[] }) => {
        const newMessages = messages.slice(-2);

        const messagesToInsert = newMessages.map((msg) => ({
          id: msg.id,
          conversation_id: id,
          role: msg.role,
          parts: msg.parts,
          created_at: new Date().toISOString(),
        }));

        const { error } = await supabase
          .from("messages")
          .insert(messagesToInsert);

        if (error) {
          console.error("Error saving messages:", error);
        }
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
