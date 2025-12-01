import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";

const doctors = [
  {
    name: "Dr. Shaun Murphy",
    specialty: "Internal Medicine",
    experience: "18 years",
    image: "/dr-shaun.jpg",
  },
  {
    name: "Dr. Neil Melendez",
    specialty: "Cardiology",
    experience: "15 years",
    image: "/dr-melendez.webp",
  },
  {
    name: "Dr. Jared Kalu",
    specialty: "Pediatrics",
    experience: "12 years",
    image: "/dr-kalu.jpg",
  },
  {
    name: "Dr. Claire Browne",
    specialty: "Orthopedics",
    experience: "20 years",
    image: "/dr-brown.jpg",
  },
];

export function DoctorsSection() {
  return (
    <section id="doctors" className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
            Our Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Meet Our Expert Physicians
          </h2>
          <p className="text-muted-foreground text-lg">
            Our team of board-certified specialists brings decades of combined
            experience and a passion for patient-centered care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-5 text-center">
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-1">
                  {doctor.specialty}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {doctor.experience} experience
                </p>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors bg-transparent"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="sr-only">LinkedIn profile</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors bg-transparent"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="sr-only">Email doctor</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 bg-transparent"
          >
            View All Doctors
          </Button>
        </div>
      </div>
    </section>
  );
}
