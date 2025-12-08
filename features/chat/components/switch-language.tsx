"use client";

import * as React from "react";
import { Check, ChevronDown, Globe, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type language =
  | "en-US"
  | "id-ID"
  | "en-GB"
  | "es-ES"
  | "fr-FR"
  | "de-DE"
  | "it-IT"
  | "pt-BR"
  | "ja-JP"
  | "ko-KR"
  | "zh-CN"
  | "zh-TW"
  | "ar-SA"
  | "hi-IN"
  | "ru-RU"
  | "pt-PT"
  | "nl-NL";

export interface VoiceLanguage {
  code: language;
  name: string;
  nativeName: string;
  flag: string;
}

const defaultLanguages: VoiceLanguage[] = [
  { code: "en-US", name: "English (US)", nativeName: "English", flag: "🇺🇸" },
  {
    code: "id-ID",
    name: "Bahasa Indonesia",
    nativeName: "Bahasa",
    flag: "🇮🇩",
  },
  { code: "en-GB", name: "English (UK)", nativeName: "English", flag: "🇬🇧" },
  { code: "es-ES", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr-FR", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de-DE", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it-IT", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  {
    code: "pt-BR",
    name: "Portuguese (Brazil)",
    nativeName: "Português",
    flag: "🇧🇷",
  },
  { code: "ja-JP", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko-KR", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  {
    code: "zh-CN",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    flag: "🇨🇳",
  },
  { code: "ar-SA", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "hi-IN", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
];

interface VoiceLanguageSwitchProps {
  languages?: VoiceLanguage[];
  defaultLanguage?: string;
  onLanguageChange?: (language: VoiceLanguage) => void;
  showNativeName?: boolean;
  className?: string;
}

export function VoiceLanguageSwitch({
  languages = defaultLanguages,
  defaultLanguage = "en-US",
  onLanguageChange,
  showNativeName = true,
  className,
}: VoiceLanguageSwitchProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState<VoiceLanguage>(
    languages.find((lang) => lang.code === defaultLanguage) || languages[0]
  );
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const handleLanguageSelect = (language: VoiceLanguage) => {
    setSelectedLanguage(language);
    onLanguageChange?.(language);
  };

  const handlePreviewVoice = (e: React.MouseEvent, language: VoiceLanguage) => {
    e.stopPropagation();

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        language.nativeName === "English"
          ? "Hello, how are you?"
          : language.nativeName
      );
      utterance.lang = language.code;

      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("min-w-[200px] justify-between gap-2", className)}
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">
              {showNativeName
                ? selectedLanguage.nativeName
                : selectedLanguage.name}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px]">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Volume2 className="h-4 w-4" />
          Select Voice Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{language.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{language.name}</span>
                  {showNativeName && language.nativeName !== language.name && (
                    <span className="text-xs text-muted-foreground">
                      {language.nativeName}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handlePreviewVoice(e, language)}
                  className="p-1 rounded-md hover:bg-accent transition-colors"
                  aria-label={`Preview ${language.name} voice`}
                >
                  <Volume2
                    className={cn(
                      "h-4 w-4",
                      isSpeaking
                        ? "text-primary animate-pulse"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
                {selectedLanguage.code === language.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
