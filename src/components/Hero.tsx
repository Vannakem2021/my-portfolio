"use client";

import Link from "next/link";
import { Github, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 pb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white hero-text animate-fadeIn">
            Software Engineer
          </h1>
          <p className="text-xl mb-8 text-blue-100 animate-slideInUp animate-delay-200">
            Building digital experiences with pixel-perfect precision
          </p>
          <div className="flex flex-wrap gap-4 animate-slideInUp animate-delay-400">
            <Link
              href="https://github.com/Vannakem2021"
              passHref
              target="_blank"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full transition-transform hover:scale-110 hover:bg-white/20"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub Profile</span>
              </Button>
            </Link>
            <Link
              href="https://www.facebook.com/kem.vanna.16"
              passHref
              target="_blank"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full transition-transform hover:scale-110 hover:bg-white/20"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">LinkedIn Profile</span>
              </Button>
            </Link>
            <Link href="https://twitter.com" passHref target="_blank">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full transition-transform hover:scale-110 hover:bg-white/20"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter Profile</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
