import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/50 rounded-bl-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Now accepting new patients
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
              Your Trusted <span className="text-primary">Multi-Specialty</span>{" "}
              Wellness Clinic
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Personalized care, expert specialists, and a patient-first
              experience. We're here to support your health journey every step
              of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 gap-2 text-base">
                Book an Appointment
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 gap-2 text-base bg-transparent"
                >
                  <Play className="w-4 h-4" />
                  Talk to Agent
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  15+
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Years of Excellence
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  50k+
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Happy Patients
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  30+
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Expert Doctors
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="relative animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src="/hero.jpg"
                alt="Doctor consulting with patient in a warm, welcoming clinic environment"
                className="w-full h-full object-cover object-right"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">4.9 Rating</p>
                  <p className="text-sm text-muted-foreground">
                    2,000+ Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
