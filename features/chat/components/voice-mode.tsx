"use client";

import { Heart, MessageSquare, Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, configureAssistant } from "@/lib/utils";
import type { VoiceStatus } from "./riley-chat";
import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}
type VoiceModeProps = {
  voiceStatus: VoiceStatus;
  setVoiceStatus: (status: VoiceStatus) => void;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onSwitchToChat: () => void;
};

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export function VoiceMode({
  voiceStatus,
  setVoiceStatus,
  // messages,
  onSwitchToChat,
}: VoiceModeProps) {
  const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  console.log("FR: messages", messages);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessages = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessages, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.error(error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const lastAssistantMessage = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user");

  const getStatusText = () => {
    switch (voiceStatus) {
      case "listening":
        return "Listening...";
      case "processing":
        return "Processing...";
      case "speaking":
        return "Riley is speaking...";
      default:
        return "Tap to speak";
    }
  };

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    vapi.start(configureAssistant());
  };

  const handleDisconnect = () => {
    vapi.stop();
    setCallStatus(CallStatus.FINISHED);
  };

  return (
    <div className="flex flex-col h-full items-center justify-between py-8 px-4">
      {/* Riley Avatar */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          {voiceStatus === "speaking" && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Speaking
            </span>
          )}
        </div>
        <h2 className="text-xl font-semibold text-foreground">Riley</h2>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Your friendly medical appointment assistant
        </p>
      </div>

      {/* Mic Button */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={toggleMicrophone}
          disabled={callStatus !== CallStatus.ACTIVE}
          className={cn(
            "relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300",
            voiceStatus === "listening"
              ? "bg-primary text-primary-foreground scale-110"
              : voiceStatus === "processing"
              ? "bg-accent text-accent-foreground"
              : voiceStatus === "speaking"
              ? "bg-primary/20 text-primary"
              : "bg-primary text-primary-foreground hover:scale-105"
          )}
        >
          {/* Pulse rings for listening state
          {voiceStatus === "listening" && (
            <>
              <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
              <span
                className="absolute inset-0 rounded-full bg-primary animate-pulse-ring"
                style={{ animationDelay: "0.5s" }}
              />
            </>
          )}

          {voiceStatus === "processing" ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : voiceStatus === "speaking" ? (
            <Waveform />
          ) : voiceStatus === "listening" ? (
            <MicOff className="w-10 h-10" />
          ) : (
            <Mic className="w-10 h-10" />
          )} */}
          {isMuted ? (
            <MicOff className="w-10 h-10" />
          ) : (
            <Mic className="w-10 h-10" />
          )}
        </button>
        <p className="text-sm font-medium text-muted-foreground">
          {getStatusText()}
        </p>
      </div>
      <Button
        onClick={
          callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
        }
      >
        {callStatus === CallStatus.CONNECTING
          ? "Connecting..."
          : callStatus === CallStatus.ACTIVE
          ? "End Call"
          : "Start Call"}
      </Button>

      {/* Transcript */}
      <div className="w-full max-w-sm space-y-3">
        {/* <div className="bg-card border border-border rounded-xl p-4 min-h-[120px]">
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
            Live Transcript
          </p>
          <div className="space-y-2 text-sm">
            {lastUserMessage && (
              <p className="text-foreground">
                <span className="font-medium text-muted-foreground">You:</span>{" "}
                {lastUserMessage.content}
              </p>
            )}
            {lastAssistantMessage && (
              <p className="text-foreground">
                <span className="font-medium text-primary">Riley:</span>{" "}
                {lastAssistantMessage.content}
              </p>
            )}
          </div>
        </div> */}
        <section className="transcript">
          <div className="transcript-message no-scrollbar">
            {messages.map((message, index) => {
              if (message.role === "assistant") {
                return (
                  <p key={index} className="max-sm:text-sm">
                    Dr:
                    {message.content}
                  </p>
                );
              } else {
                return (
                  <p key={index} className="text-primary max-sm:text-sm">
                    fikri: {message.content}
                  </p>
                );
              }
            })}
          </div>
          <div className="transcript-fade" />
        </section>

        <Button
          variant="outline"
          onClick={onSwitchToChat}
          className="w-full bg-transparent"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Switch to Text Mode
        </Button>
      </div>
    </div>
  );
}

function Waveform() {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="w-1.5 bg-primary rounded-full animate-waveform"
          style={{
            animationDelay: `${i * 0.1}s`,
            height: "8px",
          }}
        />
      ))}
    </div>
  );
}
