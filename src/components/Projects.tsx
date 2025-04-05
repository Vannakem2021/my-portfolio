"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useState, useEffect, TouchEvent, useRef } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const Projects = () => {
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

  const projects = [
    {
      id: "code-assistant",
      title: "AI-Powered Code Assistant",
      description:
        "A machine learning-based code completion tool that helps developers write better code faster.",
      image:
        "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=800&h=600&auto=format&fit=crop",
      link: "https://github.com/username/code-assistant",
      technologies: ["Python", "TensorFlow", "React"],
    },
    {
      id: "ecommerce",
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with real-time inventory management and payment processing.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&h=600&auto=format&fit=crop",
      link: "https://github.com/username/ecommerce",
      technologies: ["Next.js", "Node.js", "MongoDB"],
    },
    {
      id: "smart-home",
      title: "Smart Home Dashboard",
      description:
        "IoT dashboard for monitoring and controlling connected home devices in real-time.",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&h=600&auto=format&fit=crop",
      link: "https://github.com/username/smart-home",
      technologies: ["React", "Firebase", "Arduino"],
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

  // Hide swipe hint after first interaction
  useEffect(() => {
    if (showSwipeHint) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSwipeHint]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

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

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="up">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Projects
          </h2>
        </AnimateOnScroll>

        {isSmallScreen ? (
          <AnimateOnScroll animation="fade" delay={300}>
            <div className="relative">
              <div
                className="carousel-container h-[500px] relative mb-12"
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

                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    className={`absolute inset-0 transition-opacity duration-500 flex justify-center ${
                      index === currentSlide
                        ? "opacity-100 z-10 carousel-item-enter"
                        : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <div className="glass-card p-6 rounded-2xl w-full max-w-lg">
                      <h3 className="text-xl font-bold mb-2 text-white hero-text">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-200 mb-4">
                        {project.description}
                      </p>
                      <Link
                        href={project.link}
                        target="_blank"
                        className="project-link"
                      >
                        <ExternalLink size={16} className="mr-1" />
                        View Project
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Navigation */}
              <div className="flex items-center justify-center mt-6 space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors carousel-dot ${
                      currentSlide === index ? "bg-white active" : "bg-white/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <AnimateOnScroll
                key={project.id}
                animation="up"
                delay={idx * 100 + 200}
              >
                <div className="glass-card overflow-hidden rounded-lg transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white hero-text">
                      {project.title}
                    </h3>
                    <p className="text-gray-200 mb-4">{project.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={project.link}
                      target="_blank"
                      className="project-link"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      View Project
                    </Link>
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

export default Projects;
