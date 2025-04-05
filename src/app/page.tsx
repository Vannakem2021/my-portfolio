"use client";

import { useLayoutEffect, useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Journey from "@/components/Journey";
import Chat from "@/components/Chat";
import Contact from "@/components/Contact";

export default function Home() {
  const [contentVisible, setContentVisible] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Perform scroll reset before showing content
  useLayoutEffect(() => {
    // Set position to top immediately
    window.scrollTo(0, 0);

    // Wait for browser to process the scroll to top
    setTimeout(() => {
      // Make content visible
      setContentVisible(true);
    }, 50);
  }, []);

  // Add page loaded animation
  useEffect(() => {
    // Small delay to ensure initial animations have time to start
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  return (
    <div
      className={`content-wrapper transition-all duration-1000 ease-in-out ${
        pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        opacity: contentVisible ? 1 : 0,
        transition: "opacity 300ms ease-in, transform 800ms ease-out",
      }}
    >
      <div className={`page-transition-wrapper`}>
        <Hero />
        <About />
        <Projects />
        <Testimonials />
        <Journey />
        <Chat />
        <Contact />
      </div>
    </div>
  );
}
