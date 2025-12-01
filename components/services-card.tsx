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

const services = [
  {
    icon: Stethoscope,
    title: "General Checkup",
    description:
      "Comprehensive health assessments to monitor and maintain your overall wellness.",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description:
      "Specialized care for infants, children, and adolescents with gentle expertise.",
  },
  {
    icon: Sparkles,
    title: "Dermatology",
    description:
      "Advanced skin care treatments for both medical and cosmetic concerns.",
  },
  {
    icon: Bone,
    title: "Chiropractic Care",
    description:
      "Non-invasive spine and joint adjustments for pain relief and mobility.",
  },
  {
    icon: Activity,
    title: "Physiotherapy",
    description:
      "Rehabilitation programs to restore movement and improve physical function.",
  },
  {
    icon: Brain,
    title: "Neurology",
    description:
      "Expert diagnosis and treatment for brain and nervous system conditions.",
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description:
      "Complete eye care from routine exams to advanced surgical procedures.",
  },
  {
    icon: HeartPulse,
    title: "Cardiology",
    description:
      "Heart health monitoring, diagnostics, and preventive cardiovascular care.",
  },
];

const ServicesCard = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <Card
          key={index}
          className="group border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
        >
          <CardContent className="p-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {service.description}
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-primary hover:text-primary/80 gap-1"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServicesCard;
