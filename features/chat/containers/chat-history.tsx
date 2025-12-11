import { getHistoryList } from "@/lib/actions/chat.actions";
import { ChatHistoryList } from "../components/chat-history-list";

const ChatHistory = async () => {
  const conversationHistory = await getHistoryList();

  return <ChatHistoryList historyList={conversationHistory ?? []} />;
};

export default ChatHistory;
