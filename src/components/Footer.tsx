"use client";

import Link from "next/link";
import { Github, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 backdrop-blur-md bg-black/70 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © {currentYear} Vanna Kem. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <Link
              href="https://github.com/Vannakem2021"
              target="_blank"
              aria-label="GitHub Profile"
              className="social-icon"
            >
              <Github size={18} />
            </Link>
            <Link
              href="https://www.facebook.com/kem.vanna.16"
              target="_blank"
              aria-label="LinkedIn Profile"
              className="social-icon"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter Profile"
              className="social-icon"
            >
              <Twitter size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
