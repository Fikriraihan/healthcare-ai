import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

export function RileyHeader() {
  return (
    <header className="glass border-b border-border/50 sticky top-0 z-10">
      <div className="max-w-4xl px-4 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-xl">
          <Link href="/">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L12 22M2 12L22 12" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Riley</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Online
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
