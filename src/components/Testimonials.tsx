"use client";

import { useState, useEffect, TouchEvent, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const testimonials = [
    {
      id: "testimonial-1",
      quote:
        "An exceptional developer who brings both technical excellence and creative problem-solving to every project. Their ability to mentor junior developers while delivering high-quality code is remarkable.",
      author: "Sarah Johnson",
      position: "Senior Developer at TechCorp",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop&crop=faces",
    },
    {
      id: "testimonial-2",
      quote:
        "Working with them was a game-changer for our team. Their deep understanding of modern web technologies and attention to detail helped us deliver our project ahead of schedule.",
      author: "Michael Chen",
      position: "CTO at StartupX",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&h=150&auto=format&fit=crop&crop=faces",
    },
    {
      id: "testimonial-3",
      quote:
        "Not only do they write excellent code, but their communication skills and ability to translate complex technical concepts into simple terms make them an invaluable team member.",
      author: "Emily Rodriguez",
      position: "Product Manager at InnovateLabs",
      avatar:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=150&h=150&auto=format&fit=crop&crop=faces",
    },
  ];

  useEffect(() => {
    // Check if we're on a small/medium screen
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    // Set initial value
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    if (isSmallScreen) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isSmallScreen, currentSlide]);

  // Handle touch events
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go to next slide
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  };

  // Hide swipe hint after first interaction
  useEffect(() => {
    if (showSwipeHint) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSwipeHint]);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="up">
          <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
        </AnimateOnScroll>

        {isSmallScreen ? (
          <AnimateOnScroll animation="fade" delay={300}>
            <div className="relative">
              <div
                className="carousel-container h-[300px] relative mb-12"
                onTouchStart={(e) => {
                  handleTouchStart(e);
                  setShowSwipeHint(false);
                }}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Swipe indicator overlay */}
                {showSwipeHint && (
                  <div className="absolute inset-0 flex justify-center items-center z-20 pointer-events-none">
                    <div className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm">
                      Swipe to navigate
                    </div>
                  </div>
                )}

                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute inset-0 transition-opacity duration-500 flex justify-center ${
                      index === currentSlide
                        ? "opacity-100 z-10 carousel-item-enter"
                        : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <div className="glass-card p-6 rounded-2xl w-full max-w-lg">
                      <div className="mb-4">
                        <Image
                          src="/quote.svg"
                          alt="Quote"
                          width={40}
                          height={40}
                          className="opacity-50"
                        />
                      </div>
                      <p className="mb-4 text-gray-100 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                          <span className="text-purple-600 dark:text-purple-300 font-bold">
                            {testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold">{testimonial.author}</p>
                          <p className="text-sm text-gray-300">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Navigation */}
              <div className="flex items-center justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors carousel-dot ${
                      currentSlide === index ? "bg-white active" : "bg-white/30"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <AnimateOnScroll
                key={testimonial.id}
                animation="up"
                delay={idx * 150 + 200}
              >
                <div className="glass-card p-6 rounded-2xl h-full">
                  <div className="mb-4">
                    <Image
                      src="/quote.svg"
                      alt="Quote"
                      width={40}
                      height={40}
                      className="opacity-50"
                    />
                  </div>
                  <p className="text-gray-100 mb-6">{testimonial.quote}</p>
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
