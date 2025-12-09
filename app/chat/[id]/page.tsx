import { RileyChat } from "@/features/chat/components/riley-chat";
import { getMessages } from "@/lib/actions/chat.actions";
import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { UIMessage } from "ai";
import { redirect } from "next/navigation";

const AIChat = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const { userId } = await auth();

  const messagesFromDb = await getMessages(id);

  const messages: UIMessage[] = (messagesFromDb || []).map((msg) => {
    return {
      id: msg.ai_message_id || msg.id,
      role: msg.role as "user" | "assistant" | "system",
      parts: msg.parts || [],
    };
  });

  return (
    <section>
      <RileyChat id={id} initialMessages={messages} />
    </section>
  );
};

export default AIChat;
