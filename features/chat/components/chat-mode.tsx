"use client";

import { useRef, useEffect, useState, FormEvent } from "react";
import type { Appointment } from "./riley-chat";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { QuickActions } from "./quick-actions";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

type ChatModeProps = {
  appointment: Appointment | null;
  onSendMessage: (content: string) => void;
  onQuickAction: (action: string) => void;
  onSwitchToVoice: () => void;
};

export function ChatMode({
  appointment,
  onSendMessage,
  onQuickAction,
  onSwitchToVoice,
}: ChatModeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(() =>
    crypto.randomUUID()
  );
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        conversationId,
      },
    }),
    onFinish: async (message) => {
      console.log("FR: message finished", message);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input, conversationId });
    setInput("");
  };
  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, appointment]);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* {lastMessageIsUser && <TypingIndicator />}
        {appointment && <AppointmentCard appointment={appointment} />} */}
      </div>

      <div className="sticky bottom-0 bg-card border-t border-border px-4 py-3 space-y-3">
        <QuickActions onAction={onQuickAction} />
        <ChatInput
          handleSubmit={handleSubmit}
          input={input}
          setInput={setInput}
          onSend={onSendMessage}
          onMicClick={onSwitchToVoice}
        />
      </div>
    </div>
  );
}
