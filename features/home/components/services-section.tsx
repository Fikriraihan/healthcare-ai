import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  Baby,
  Sparkles,
  Bone,
  Activity,
  Brain,
  Eye,
  HeartPulse,
  ArrowRight,
} from "lucide-react";
import ServicesCard from "../../../components/services-card";

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Comprehensive Care for Every Need
          </h2>
          <p className="text-muted-foreground text-lg">
            From routine checkups to specialized treatments, we offer a wide
            range of medical services to keep you and your family healthy.
          </p>
        </div>
        <ServicesCard />
      </div>
    </section>
  );
}
