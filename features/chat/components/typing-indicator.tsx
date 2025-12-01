import { Heart } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-in fade-in-0 duration-300">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
        <Heart className="w-4 h-4 text-primary" />
      </div>
      <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Riley is typing</span>
          <span className="flex gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
