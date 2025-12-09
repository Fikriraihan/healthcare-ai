"use client";

import { useRef, useEffect, useState, FormEvent } from "react";
import type { Appointment } from "./riley-chat";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { QuickActions } from "./quick-actions";
import { useChat } from "@ai-sdk/react";
import { createIdGenerator, DefaultChatTransport, UIMessage } from "ai";

type ChatModeProps = {
  appointment: Appointment | null;
  onSendMessage: (content: string) => void;
  onQuickAction: (action: string) => void;
  onSwitchToVoice: () => void;
  id?: string;
  initialMessages?: UIMessage[];
};

export function ChatMode({
  appointment,
  onSendMessage,
  onQuickAction,
  onSwitchToVoice,
  id,
  initialMessages = [],
}: ChatModeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat({
    id: id,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest({ messages, id }) {
        return {
          body: {
            message: messages[messages.length - 1],
            id: id,
          },
        };
      },
    }),
    generateId: createIdGenerator({
      prefix: id,
      size: 16,
      separator: "-",
    }),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({
      role: "user",
      parts: [{ type: "text", text: input }],
    });
    setInput("");
  };

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
        {messages.map((message) => {
          return <ChatMessage key={message.id} message={message} />;
        })}

        {/* {lastMessageIsUser && <TypingIndicator />}
        {appointment && <AppointmentCard appointment={appointment} />} */}
      </div>

      <div className="border rounded-lg border-border px-4 py-3 space-y-3">
        {/* <QuickActions onAction={onQuickAction} /> */}
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
