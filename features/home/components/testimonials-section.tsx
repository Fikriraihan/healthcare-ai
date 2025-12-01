"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amanda Foster",
    role: "Patient since 2019",
    image: "/friendly-woman-smiling-portrait-headshot.jpg",
    quote:
      "The care I received at Wellness Partners was exceptional. Dr. Mitchell took the time to listen and created a personalized treatment plan that changed my life. I couldn't be more grateful.",
    rating: 5,
  },
  {
    name: "Robert Kim",
    role: "Patient since 2021",
    image: "/friendly-asian-man-smiling-portrait-headshot.jpg",
    quote:
      "After years of chronic back pain, the team here finally helped me find relief. The combination of chiropractic care and physiotherapy was exactly what I needed. Highly recommended!",
    rating: 5,
  },
  {
    name: "Maria Santos",
    role: "Patient since 2020",
    image: "/friendly-latina-woman-smiling-portrait-headshot.jpg",
    quote:
      "As a mother of three, I needed a clinic that could care for my whole family. Wellness Partners has been wonderful – from pediatric checkups to my own wellness visits. They treat us like family.",
    rating: 5,
  },
  {
    name: "David Johnson",
    role: "Patient since 2018",
    image: "/friendly-older-man-smiling-portrait-headshot.jpg",
    quote:
      "The cardiology team here saved my life with early detection of a heart condition. Their modern equipment and expertise gave me peace of mind and a second chance at living fully.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from real patients who have experienced the Wellness
            Partners difference.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="border-border/50 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-12 h-12 text-primary/20 mb-6" />
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                {testimonials[currentIndex].quote}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
