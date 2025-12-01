"use client";

import { Calendar, MapPin, Phone, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Appointment } from "./riley-chat";

type AppointmentCardProps = {
  appointment: Appointment;
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <Card className="animate-in slide-in-from-bottom-4 fade-in-0 duration-500 border-primary/20 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-foreground">
          <Calendar className="w-5 h-5 text-primary" />
          Appointment Confirmed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Date</p>
            <p className="font-medium text-foreground">{appointment.date}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Time</p>
            <p className="font-medium text-foreground">{appointment.time}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Doctor</p>
            <p className="font-medium text-foreground">{appointment.doctor}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Department</p>
            <p className="font-medium text-foreground">
              {appointment.department}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-3 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 min-w-[120px] bg-transparent gap-2"
          >
            <Calendar className="w-4 h-4" />
            Add to Calendar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 min-w-[120px] bg-transparent gap-2"
          >
            <MapPin className="w-4 h-4" />
            Directions
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 min-w-[120px] bg-transparent gap-2"
          >
            <Phone className="w-4 h-4" />
            Call Clinic
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 min-w-[120px] bg-transparent gap-2"
          >
            <Pencil className="w-4 h-4" />
            Modify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
