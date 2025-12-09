import { HeroSection } from "@/features/home/components/hero-section";
import { AboutSection } from "@/features/home/components/about-section";
import { ServicesSection } from "@/features/home/components/services-section";
import { DoctorsSection } from "@/features/home/components/doctors-section";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { CTASection } from "@/features/home/components/cta-section";
import { Footer } from "@/features/home/components/footer";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <DoctorsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
