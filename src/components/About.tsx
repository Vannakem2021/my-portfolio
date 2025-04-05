"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
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

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div
            className={`md:w-1/3 flex-shrink-0 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative h-80 w-80 mx-auto rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
              <Image
                src="/images/me.png"
                alt="Pixel art portrait"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          <div
            className={`md:w-2/3 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6 text-white hero-text">
                About Me
              </h2>

              <p className="text-gray-100 mb-6 text-lg leading-relaxed">
                I'm Kem Vanna, a passionate 4th year Computer Science student at
                AEU university in Phnom Penh, Cambodia. Originally from Kampot
                province, I moved to Phnom Penh to pursue my education in
                technology. With a focus on web development, I enjoy creating
                elegant solutions using modern frameworks and tools.
              </p>

              <div>
                <h3 className="text-xl font-bold mb-3 text-white hero-text">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "Express.js",
                    "Prisma",
                    "Git",
                    "MongoDB",
                    "TypeScript",
                    "React",
                    "Node.js",
                    "TailwindCSS",
                  ].map((tech, index) => (
                    <span
                      key={tech}
                      className={`tech-badge transition-all duration-500 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${index * 50 + 500}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
