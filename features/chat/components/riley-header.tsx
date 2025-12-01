import { Heart } from "lucide-react";

export function RileyHeader() {
  return (
    <header className="flex items-center gap-3 px-4 py-4 border-b border-border">
      <div className="">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Heart className="w-6 h-6 text-primary" />
        </div>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
      </div>
      <div>
        <h1 className="font-semibold text-foreground text-lg">Riley</h1>
        <p className="text-sm text-muted-foreground">
          Medical Appointment Assistant
        </p>
      </div>
    </header>
  );
}
