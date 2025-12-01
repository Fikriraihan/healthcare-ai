"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { UIDataTypes, UIMessage, UITools } from "ai";

type ChatMessageProps = {
  message: UIMessage<unknown, UIDataTypes, UITools>;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex items-end gap-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      {isAssistant && (
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Heart className="w-4 h-4 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl shadow-sm",
          isAssistant
            ? "bg-secondary text-secondary-foreground rounded-bl-md"
            : "bg-primary text-primary-foreground rounded-br-md"
        )}
      >
        {message.parts.map((part, i) => {
          switch (part.type) {
            case "text":
              return <div key={`${message.id}-${i}`}>{part.text}</div>;
          }
        })}
        {/* <span
          className={cn("text-xs mt-1 block", isAssistant ? "text-muted-foreground" : "text-primary-foreground/70")}
        >
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span> */}
      </div>
    </div>
  );
}
