"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type AnimationDirection = "up" | "down" | "left" | "right" | "fade";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: AnimationDirection;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
}

const AnimateOnScroll = ({
  children,
  animation = "up",
  duration = 700,
  delay = 0,
  threshold = 0.1,
  className = "",
}: AnimateOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Determine animation classes based on direction
  const getInitialStyles = (): string => {
    switch (animation) {
      case "up":
        return "opacity-0 translate-y-10";
      case "down":
        return "opacity-0 -translate-y-10";
      case "left":
        return "opacity-0 translate-x-10";
      case "right":
        return "opacity-0 -translate-x-10";
      case "fade":
        return "opacity-0";
      default:
        return "opacity-0";
    }
  };

  const getAnimatedStyles = (): string => {
    return "opacity-100 translate-x-0 translate-y-0";
  };

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
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      data-animate-on-scroll={animation}
      data-visible={isVisible}
    >
      <div
        className={`${isVisible ? getAnimatedStyles() : getInitialStyles()}`}
        style={{
          transitionProperty: "opacity, transform",
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimateOnScroll;
