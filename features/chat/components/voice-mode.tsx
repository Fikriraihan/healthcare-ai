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
  onSwitchToChat,
}: VoiceModeProps) {
  const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

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
    <div className="flex flex-col h-full py-8 px-4 gap-6">
      {/* Grid layout for voice section and messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-hidden">
        {/* Voice Section - Left */}
        <div className="flex flex-col items-center justify-center gap-8 p-6 rounded-2xl border-2 border-border bg-card/50">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center ring-4 ring-primary/10">
                <Heart className="w-16 h-16 text-primary" />
              </div>
              {voiceStatus === "speaking" && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  Speaking
                </span>
              )}
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Riley</h2>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Your friendly medical appointment assistant
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
              className={cn(
                "relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                voiceStatus === "listening"
                  ? "bg-primary text-primary-foreground scale-110 shadow-primary/50"
                  : voiceStatus === "processing"
                  ? "bg-accent text-accent-foreground"
                  : voiceStatus === "speaking"
                  ? "bg-primary/20 text-primary ring-4 ring-primary/20"
                  : "bg-primary text-primary-foreground hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isMuted ? (
                <MicOff className="w-12 h-12" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
            </button>
            <p className="text-base font-medium text-muted-foreground">
              {getStatusText()}
            </p>
          </div>
        </div>

        {/* Message Section - Right */}
        <div className="flex flex-col h-full rounded-2xl border-2 border-border bg-card/50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <h3 className="text-sm font-semibold text-foreground">
              Conversation Transcript
            </h3>
          </div>
          <div className="flex-1 overflow-hidden p-4">
            <div className="h-full overflow-y-auto space-y-3 no-scrollbar">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Start the call to see the conversation transcript here...
                </p>
              ) : (
                [...messages].reverse().map((message, index) => {
                  if (message.role === "assistant") {
                    return (
                      <div key={index} className="flex gap-2">
                        <span className="text-sm font-semibold text-primary">
                          Dr:
                        </span>
                        <p className="text-sm text-foreground flex-1">
                          {message.content}
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="flex gap-2">
                        <span className="text-sm font-semibold text-primary">
                          You:
                        </span>
                        <p className="text-sm text-foreground flex-1">
                          {message.content}
                        </p>
                      </div>
                    );
                  }
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Section - Bottom */}
      <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
        <Button
          className="w-full"
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
