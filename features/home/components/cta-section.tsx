import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Clock, MapPin } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
              Ready to Schedule Your First Visit?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Take the first step towards better health. Our friendly team is
              ready to help you book an appointment with the right specialist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full px-8 gap-2 text-base"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 gap-2 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
              >
                <Phone className="w-4 h-4" />
                Call Us Now
              </Button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid gap-4">
            <div className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-5">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground/70 text-sm">Call Us</p>
                <p className="text-primary-foreground font-semibold text-lg">
                  (555) 123-4567
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-5">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground/70 text-sm">Hours</p>
                <p className="text-primary-foreground font-semibold text-lg">
                  Mon – Sat: 8AM – 7PM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-5">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground/70 text-sm">Location</p>
                <p className="text-primary-foreground font-semibold text-lg">
                  123 Wellness Ave, Suite 100
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
