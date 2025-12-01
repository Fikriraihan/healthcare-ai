"use client"

import { Calendar, RefreshCw, XCircle, Clock } from "lucide-react"

type QuickActionsProps = {
  onAction: (action: string) => void
}

const actions = [
  { label: "Book Appointment", icon: Calendar, action: "Book Appointment" },
  { label: "Reschedule", icon: RefreshCw, action: "Reschedule" },
  { label: "Cancel Appointment", icon: XCircle, action: "Cancel Appointment" },
  { label: "Clinic Hours", icon: Clock, action: "Clinic Hours" },
]

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {actions.map((item) => (
        <button
          key={item.action}
          onClick={() => onAction(item.action)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium whitespace-nowrap hover:bg-accent/80 transition-colors"
        >
          <item.icon className="w-3.5 h-3.5" />
          {item.label}
        </button>
      ))}
    </div>
  )
}
