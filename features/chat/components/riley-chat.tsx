"use client";

import { useState } from "react";
import { ChatMode } from "./chat-mode";
import { VoiceMode } from "./voice-mode";
import { ModeToggle } from "./mode-toggle";
import { RileyHeader } from "./riley-header";
import { UIMessage } from "ai";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export type VoiceStatus = "idle" | "listening" | "processing" | "speaking";

export type Appointment = {
  date: string;
  time: string;
  day: string;
  doctor: string;
  department: string;
};

export function RileyChat({
  id,
  initialMessages,
}: {
  id?: string;
  initialMessages?: UIMessage[];
}) {
  const [mode, setMode] = useState<"chat" | "voice">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! 👋 I'm Riley, your medical appointment assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>("idle");
  console.log("FR: initialMessages:", initialMessages);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate Riley's response
    setTimeout(() => {
      const responses = getResponse(content.toLowerCase());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (responses.appointment) {
        setAppointment(responses.appointment);
      }
    }, 1200);
  };

  const getResponse = (
    input: string
  ): { message: string; appointment?: Appointment } => {
    if (
      input.includes("book") ||
      input.includes("appointment") ||
      input.includes("schedule")
    ) {
      return {
        message:
          "I'd be happy to help you book an appointment! I've found an available slot for you. Here are the details:",
        appointment: {
          date: "December 15, 2025",
          time: "10:30 AM",
          day: "Monday",
          doctor: "Dr. Sarah Chen",
          department: "General Medicine",
        },
      };
    }
    if (input.includes("reschedule")) {
      return {
        message:
          "Of course! I can help you reschedule your appointment. What date and time would work better for you?",
      };
    }
    if (input.includes("cancel")) {
      return {
        message:
          "I understand you'd like to cancel an appointment. Could you confirm which appointment you'd like to cancel?",
      };
    }
    if (input.includes("hours") || input.includes("clinic")) {
      return {
        message:
          "Our clinic is open Monday to Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 1:00 PM. We're closed on Sundays and public holidays.",
      };
    }
    return {
      message:
        "I'm here to help you with booking, rescheduling, or canceling appointments. You can also ask about our clinic hours. What would you like to do?",
    };
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <RileyHeader />
      <ModeToggle mode={mode} onModeChange={setMode} />

      <div className="flex-1 overflow-hidden">
        {mode === "chat" ? (
          <ChatMode
            initialMessages={initialMessages}
            id={id}
            appointment={appointment}
            onSendMessage={handleSendMessage}
            onQuickAction={handleQuickAction}
            onSwitchToVoice={() => setMode("voice")}
          />
        ) : (
          <VoiceMode
            voiceStatus={voiceStatus}
            setVoiceStatus={setVoiceStatus}
            onSendMessage={handleSendMessage}
            onSwitchToChat={() => setMode("chat")}
          />
        )}
      </div>
    </div>
  );
}
