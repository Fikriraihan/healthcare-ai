"use client";

import { MessageSquare, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

type ModeToggleProps = {
  mode: "chat" | "voice";
  onModeChange: (mode: "chat" | "voice") => void;
};

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex items-center justify-center py-3 px-4">
      <div className="flex items-center bg-muted rounded-full p-1">
        <button
          onClick={() => onModeChange("chat")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            mode === "chat"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat Mode</span>
        </button>
        <button
          onClick={() => onModeChange("voice")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            mode === "voice"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Mic className="w-4 h-4" />
          <span>Voice Mode</span>
        </button>
      </div>
    </div>
  );
}
