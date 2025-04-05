"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Throttle function to limit how often the scroll handler runs
  const throttle = (callback: Function, delay: number) => {
    let lastCall = 0;
    return function (...args: any) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  };

  // Using useCallback to memoize the scroll handler
  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      // When the mobile menu is open, don't hide the header
      if (isMenuOpen) {
        setVisible(true);
      }
      // Hide on scroll down (after scrolling down a bit), show on scroll up
      else if (isScrollingDown && currentScrollPos > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    }, 100), // Throttle to 100ms
    [prevScrollPos, isMenuOpen]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Always show header when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      setVisible(true);
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false); // Close menu after clicking
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] p-4 bg-white shadow-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="px-3 py-1.5 bg-white text-black text-sm font-bold border-2 border-black shadow-sm hover:bg-gray-100 transition-colors hover:shadow-md animate-pulse-slow"
        >
          DEV
        </Link>

        <div className="flex items-center">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 mr-6">
            <a
              href="#about"
              onClick={(e) => scrollToSection("about", e)}
              className={`text-gray-800 font-medium hover:text-gray-600 transition-all duration-300 hover:-translate-y-1 ${
                activeSection === "about"
                  ? "font-bold border-b-2 border-gray-800"
                  : ""
              }`}
            >
              About
            </a>
            <a
              href="#chat"
              onClick={(e) => scrollToSection("chat", e)}
              className={`text-gray-800 font-medium hover:text-gray-600 transition-all duration-300 hover:-translate-y-1 ${
                activeSection === "chat"
                  ? "font-bold border-b-2 border-gray-800"
                  : ""
              }`}
            >
              Chat
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection("contact", e)}
              className={`text-gray-800 font-medium hover:text-gray-600 transition-all duration-300 hover:-translate-y-1 ${
                activeSection === "contact"
                  ? "font-bold border-b-2 border-gray-800"
                  : ""
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 rounded-full p-2 transition-all z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 z-40 flex items-start justify-center pt-20 animate-fadeIn">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={toggleMenu}
          ></div>
          <div className="bg-white rounded-xl overflow-hidden w-[85%] max-w-sm relative z-10 shadow-lg">
            <div className="pt-2 pb-1 px-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Menu</h3>
              <button
                onClick={toggleMenu}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <X size={18} className="text-gray-800" />
              </button>
            </div>
            <nav className="flex flex-col">
              <a
                href="#about"
                onClick={(e) => scrollToSection("about", e)}
                className={`text-gray-800 font-medium py-4 px-6 hover:bg-gray-100 transition-colors border-b border-gray-200 menu-item-animation ${
                  activeSection === "about" ? "bg-gray-100 font-bold" : ""
                }`}
              >
                About
              </a>
              <a
                href="#chat"
                onClick={(e) => scrollToSection("chat", e)}
                className={`text-gray-800 font-medium py-4 px-6 hover:bg-gray-100 transition-colors border-b border-gray-200 menu-item-animation ${
                  activeSection === "chat" ? "bg-gray-100 font-bold" : ""
                }`}
              >
                Chat
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection("contact", e)}
                className={`text-gray-800 font-medium py-4 px-6 hover:bg-gray-100 transition-colors menu-item-animation ${
                  activeSection === "contact" ? "bg-gray-100 font-bold" : ""
                }`}
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
