import { RileyChat } from "@/features/chat/components/riley-chat";
import { getMessages } from "@/lib/actions/chat.actions";
import { UIMessage } from "ai";

const AIChat = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const messagesFromDb = await getMessages(id);

  const messages: UIMessage[] = (messagesFromDb || []).map((msg) => {
    return {
      id: msg.ai_message_id || msg.id,
      role: msg.role as "user" | "assistant" | "system",
      parts: msg.parts || [],
    };
  });

  return (
    <section className="h-full">
      <RileyChat id={id} initialMessages={messages} />
    </section>
  );
};

export default AIChat;
