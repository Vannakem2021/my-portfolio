"use client";

import { useRef, useState, useEffect } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

type TimelineItemProps = {
  year: string;
  title: string;
  company: string;
  description: string;
  delay?: number;
};

const TimelineItem = ({
  year,
  title,
  company,
  description,
  delay = 0,
}: TimelineItemProps) => {
  return (
    <AnimateOnScroll animation="left" delay={delay}>
      <div className="timeline-item">
        <div className="timeline-dot" />
        <div>
          <span className="text-sm text-blue-400 mb-1 block font-medium">
            {year}
          </span>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-200 font-medium mb-2">{company}</p>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </AnimateOnScroll>
  );
};

const Journey = () => {
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

  const timeline = [
    {
      id: "cs-student-2024",
      year: "2020 - Present",
      title: "Computer Science Student",
      company: "AEU University, Phnom Penh",
      description:
        "4th year Computer Science student focusing on web development technologies and software engineering principles.",
    },
    {
      id: "web-projects-2022",
      year: "2022 - Present",
      title: "Web Development Projects",
      company: "Freelance & Academic Projects",
      description:
        "Building modern web applications using Next.js, Express.js, Prisma, and MongoDB.",
    },
    {
      id: "programming-journey-2020",
      year: "2020",
      title: "Programming Journey Begins",
      company: "Self-learning & University",
      description:
        "Started learning programming fundamentals and web development basics.",
    },
    {
      id: "high-school-2019",
      year: "2019",
      title: "High School Graduate",
      company: "Kampot Province, Cambodia",
      description:
        "Completed high school education in Kampot before moving to Phnom Penh for university studies.",
    },
  ];

  return (
    <section id="journey" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="up">
          <h2 className="text-3xl font-bold mb-12 text-center text-white hero-text">
            Journey
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade" delay={200}>
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl">
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.id}
                year={item.year}
                title={item.title}
                company={item.company}
                description={item.description}
                delay={index * 150 + 100}
              />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Journey;
