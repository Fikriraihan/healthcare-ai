import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Microscope, Heart } from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "Multi-Specialty Doctors",
    description:
      "Access to specialists across 15+ medical disciplines under one roof.",
  },
  {
    icon: Award,
    title: "Certified Professionals",
    description:
      "Board-certified physicians with proven track records of excellence.",
  },
  {
    icon: Microscope,
    title: "Modern Equipment",
    description:
      "State-of-the-art diagnostic tools for accurate and timely results.",
  },
  {
    icon: Heart,
    title: "Holistic Patient Care",
    description:
      "Comprehensive wellness programs focusing on mind, body, and spirit.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/about.jpg"
                alt="Wellness Partners medical team in modern clinic"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
              <p className="text-4xl font-bold">15+</p>
              <p className="text-sm opacity-90">
                Years of
                <br />
                Excellence
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Why Wellness Partners?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              At Wellness Partners, we believe healthcare should be accessible,
              compassionate, and comprehensive. Our team of dedicated
              specialists works together to provide you with integrated care
              that addresses your unique health needs. From preventive wellness
              to specialized treatments, we&apos;re committed to being your
              lifelong health partner.
            </p>

            {/* Highlight Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <Card
                  key={index}
                  className="border-border/50 bg-card hover:shadow-lg transition-shadow duration-300 group"
                >
                  <CardContent className="p-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
