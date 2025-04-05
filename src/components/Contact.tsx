"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "./AnimateOnScroll";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto URL with form data
    const subject = `Contact from ${formData.name}`;
    const body = `Message from ${formData.name} (${formData.email}):\n\n${formData.message}`;
    const mailtoUrl = `mailto:vannakem2021@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open default mail client
    window.open(mailtoUrl, "_blank");

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="up">
          <h2 className="text-3xl font-bold mb-12 text-center text-white hero-text">
            Get in Touch
          </h2>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll animation="up" delay={300}>
            <div className="glass-card p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimateOnScroll animation="right" delay={400}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white mb-2 font-medium"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 text-white backdrop-blur-sm"
                      placeholder="Your name"
                    />
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="right" delay={550}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white mb-2 font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 text-white backdrop-blur-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="right" delay={700}>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-white mb-2 font-medium"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500/50 text-white backdrop-blur-sm resize-none"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll animation="up" delay={850}>
                  <div>
                    <Button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                    >
                      Send Message
                    </Button>
                  </div>
                </AnimateOnScroll>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Contact;
