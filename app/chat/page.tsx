export const dynamic = "force-dynamic";

import { createChat } from "@/lib/chat-store";
import { redirect } from "next/navigation";

const Chat = async () => {
  const id = await createChat();
  redirect(`/chat/${id}`);
};

export default Chat;
