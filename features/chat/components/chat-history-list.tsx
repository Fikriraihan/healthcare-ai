"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import { useDeleteConversation } from "../hooks/useDeleteConversation";
import { toast } from "sonner";

type ChatHistoryItem = {
  id: string;
  title: string;
  date: string;
  preview: string;
};

export function ChatHistoryList({
  className,
  historyList,
}: {
  className?: string;
  historyList?: ChatHistoryItem[];
}) {
  const [activeId, setActiveId] = useState<string>("1");
  const router = useRouter();
  const { id: conversationId } = useParams();
  const deleteMutate = useDeleteConversation();

  const handleDeleteConversation = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteMutate.mutate(id, {
      onSuccess: () => {
        if (conversationId === id) {
          setActiveId("");
          router.push("/chat");
        }
        router.refresh();
        toast.success("Conversation deleted successfully");
      },
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-muted/30 border-r border-border/50",
        className
      )}
    >
      <div className="flex-1 overflow-y-auto px-2 py-4 custom-scrollbar">
        <div className="space-y-4">
          <div className="px-2 py-1.5">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Recent
            </h2>
          </div>
          <div className="space-y-1">
            {historyList?.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all hover:bg-accent cursor-pointer relative",
                  conversationId === chat.id
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground"
                )}
                onClick={() => {
                  setActiveId(chat.id);
                  router.push(`/chat/${chat.id}`);
                }}
              >
                <MessageSquare
                  className={cn(
                    "w-4 h-4 shrink-0",
                    activeId === chat.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                />
                <div className="flex-1 overflow-hidden">
                  <p
                    className={cn(
                      "truncate font-medium",
                      activeId === chat.id
                        ? "text-foreground"
                        : "text-foreground/80"
                    )}
                  >
                    {chat.title}
                  </p>
                  <p className="truncate text-xs opacity-70">{chat.preview}</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 bg-background/50 backdrop-blur-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="w-3 h-3" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => handleDeleteConversation(e, chat.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 w-4 h-4 text-destructive" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border/50">
        <div className="px-2 py-2 rounded-lg cursor-pointer">
          <Link href="/chat">
            <Button className="w-full justify-center gap-2 shadow-sm" size="lg">
              <Plus className="w-4 h-4" />
              New Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
