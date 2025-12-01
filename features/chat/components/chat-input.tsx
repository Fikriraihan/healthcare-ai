"use client";

import { useState, type FormEvent } from "react";
import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatInputProps = {
  onSend: (content: string) => void;
  onMicClick: () => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function ChatInput({
  handleSubmit,
  input,
  onSend,
  onMicClick,
  setInput,
}: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          className="w-full px-4 py-3 rounded-full bg-input text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onMicClick}
        className="rounded-full w-11 h-11 hover:bg-accent"
      >
        <Mic className="w-5 h-5 text-muted-foreground" />
        <span className="sr-only">Switch to voice mode</span>
      </Button>
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim()}
        className="rounded-full w-11 h-11 bg-primary hover:bg-primary/90"
      >
        <Send className="w-5 h-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
