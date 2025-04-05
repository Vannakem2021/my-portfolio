"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

// OpenRouter API configuration
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
// You should replace this with your actual API key
const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Use the properly prefixed environment variable

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  error?: boolean;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm Kem Vanna's AI assistant. Feel free to ask me anything about Kem, his skills in Next.js, Express.js, Prisma, and more, or his education at AEU university!",
      isUser: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(
    API_KEY ? null : "No API key available. Using fallback responses."
  );
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [usingFallback, setUsingFallback] = useState(!API_KEY);

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

  // Only scroll within the chat container, not the entire page
  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-messages-container");
    if (chatContainer) {
      // Scroll the container directly instead of using scrollIntoView
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll message container when messages change
    scrollToBottom();
  }, [messages]);

  // Function to call OpenRouter API
  const callOpenRouterAPI = async (prompt: string): Promise<string> => {
    // If we don't have an API key, don't even try to call the API
    if (!API_KEY) {
      throw new Error("No API key available");
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Portfolio Chat Demo",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            {
              role: "system",
              content: `You are a helpful AI assistant on Kem Vanna's portfolio website. 
              
Information about Kem Vanna:
- Name: Kem Vanna
- From: Kampot province, Cambodia
- Currently lives in Phnom Penh for study purposes
- Education: 4th year computer science student at AEU university
- Technical skills: Next.js, Express.js, Prisma, Git, MongoDB

When answering questions about Kem Vanna, use this information and respond as if you are representing him on his portfolio website. Be professional, friendly, and highlight his skills and background when relevant.`,
            },
            ...messages
              .filter((m) => !m.error)
              .map((m) => ({
                role: m.isUser ? "user" : "assistant",
                content: m.text,
              })),
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to get response from AI"
        );
      }

      const data = await response.json();
      return (
        data.choices[0]?.message.content ||
        "I couldn't generate a response. Please try again."
      );
    } catch (err: any) {
      console.error("API Error:", err);
      setError(err.message || "Failed to connect to AI service");
      setUsingFallback(true);
      throw err;
    }
  };

  // Fallback response generator when API fails
  const getFallbackResponse = (prompt: string): string => {
    const promptLower = prompt.toLowerCase();

    // Check for greetings
    if (promptLower.match(/^(hi|hello|hey|greetings|sup|what's up).{0,3}$/i)) {
      return "Hello! I'm Kem Vanna's AI assistant. How can I help you today?";
    }

    // Check for questions about name
    if (
      promptLower.includes("who are you") ||
      promptLower.includes("your name") ||
      promptLower.includes("who is kem")
    ) {
      return "I'm Kem Vanna, a 4th year computer science student at AEU university in Phnom Penh, Cambodia. Originally from Kampot province, I moved to Phnom Penh to pursue my education.";
    }

    // Check for questions about skills
    if (
      promptLower.includes("skill") ||
      promptLower.includes("technolog") ||
      promptLower.includes("stack") ||
      promptLower.includes("programming") ||
      promptLower.includes("code") ||
      promptLower.includes("develop")
    ) {
      return "Kem Vanna is skilled in several technologies including Next.js, Express.js, Prisma, Git, and MongoDB. He focuses on full-stack web development and continues to expand his technical knowledge during his studies.";
    }

    // Check for questions about education
    if (
      promptLower.includes("study") ||
      promptLower.includes("education") ||
      promptLower.includes("university") ||
      promptLower.includes("school") ||
      promptLower.includes("aeu") ||
      promptLower.includes("degree")
    ) {
      return "Kem Vanna is currently in his 4th year studying Computer Science at AEU (Asia Euro University) in Phnom Penh, Cambodia.";
    }

    // Check for questions about location
    if (
      promptLower.includes("live") ||
      promptLower.includes("location") ||
      promptLower.includes("from") ||
      promptLower.includes("cambodia") ||
      promptLower.includes("kampot") ||
      promptLower.includes("phnom penh")
    ) {
      return "Kem Vanna is originally from Kampot province in Cambodia. He currently lives in Phnom Penh, where he moved to pursue his studies at AEU university.";
    }

    // Check for project related questions
    if (
      promptLower.includes("project") ||
      promptLower.includes("portfolio") ||
      promptLower.includes("work") ||
      promptLower.includes("experience")
    ) {
      return "Kem Vanna has been working on several web development projects using Next.js, Express.js, and MongoDB. His portfolio showcases these projects with a focus on clean code, responsive design, and modern web development practices.";
    }

    // Check for contact or hire related questions
    if (
      promptLower.includes("contact") ||
      promptLower.includes("hire") ||
      promptLower.includes("email") ||
      promptLower.includes("reach") ||
      promptLower.includes("get in touch")
    ) {
      return "You can contact Kem Vanna through the contact form on this website, or check the footer for social media links. He's currently open to job opportunities and project collaborations in web development.";
    }

    // Check for hobbies or personal questions
    if (
      promptLower.includes("hobby") ||
      promptLower.includes("free time") ||
      promptLower.includes("interest") ||
      promptLower.includes("like to do")
    ) {
      return "Besides coding, Kem Vanna enjoys learning about new technologies, contributing to open-source projects, and exploring web development trends. He also values spending time with friends and family when not studying or working on projects.";
    }

    // Check for future goals/plans
    if (
      promptLower.includes("future") ||
      promptLower.includes("goal") ||
      promptLower.includes("plan") ||
      promptLower.includes("career") ||
      promptLower.includes("aspire")
    ) {
      return "Kem Vanna aspires to become a full-stack developer after graduating. He's focused on continuously improving his skills in modern web technologies like Next.js and expanding his knowledge in cloud services and DevOps practices.";
    }

    // Default response for other queries
    return "I'm Kem Vanna's AI assistant. I can tell you about Kem's background in computer science, his skills in web development technologies like Next.js and Express.js, or his education at AEU university. What would you like to know?";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    // Critical fix for scroll issues - prevent default behavior
    e.preventDefault();
    e.stopPropagation();

    if (!message.trim()) return;

    setError(null);

    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, text: message, isUser: true },
    ]);
    const userQuery = message;
    setMessage("");

    setIsTyping(true);

    try {
      // Try to get response from API if we have a key, otherwise use fallback
      let aiResponse = "";

      if (API_KEY && !usingFallback) {
        try {
          aiResponse = await callOpenRouterAPI(userQuery);
        } catch (apiErr) {
          console.error("API Error:", apiErr);
          // If API fails, use our fallback response system
          aiResponse = getFallbackResponse(userQuery);
        }
      } else {
        // No API key or previously set to use fallback
        aiResponse = getFallbackResponse(userQuery);

        // Only show the error once
        if (!usingFallback) {
          setError("Using local responses only. No AI service connected.");
          setUsingFallback(true);
        }
      }

      const aiMsgId = `ai-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: aiMsgId, text: aiResponse, isUser: false },
      ]);
    } catch (err: any) {
      console.error("Error handling message:", err);
      const errorMsgId = `error-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: errorMsgId,
          text: "Sorry, I encountered an error. Switching to local responses for future messages.",
          isUser: false,
          error: true,
        },
      ]);
      setUsingFallback(true);
    } finally {
      setIsTyping(false);

      // Use requestAnimationFrame to ensure DOM has updated before scrolling
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  };

  return (
    // Add a class to isolate the chat section's scrolling behavior
    <section
      id="chat"
      ref={sectionRef}
      className="py-20 relative isolate-scroll"
    >
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="up">
          <h2 className="text-3xl font-bold mb-12 text-center text-white hero-text">
            Chat with AI Assistant
          </h2>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll animation="up" delay={300}>
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/30">
              {/* Chat Header */}
              <div className="border-b border-white/10 p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                  <Bot className="text-white h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">AI Assistant</h3>
                  <p className="text-xs text-blue-300 flex items-center">
                    <Sparkles className="mr-1 h-3 w-3" />
                    {usingFallback
                      ? "Using local responses about Kem Vanna"
                      : "Powered by DeepSeek via OpenRouter"}
                  </p>
                </div>
                {usingFallback && (
                  <div className="bg-amber-600/60 text-white text-xs px-2 py-1 rounded-md">
                    Local Mode
                  </div>
                )}
              </div>

              {/* Error Banner */}
              {error && (
                <div
                  className={`${
                    usingFallback
                      ? "bg-amber-600/40 border-amber-500"
                      : "bg-red-600/40 border-red-500"
                  } p-2 text-white text-sm flex items-center border`}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}

              {/* Chat Messages */}
              <div
                className="p-6 h-96 overflow-y-auto flex flex-col space-y-4 chat-messages-container"
                id="chat-messages-container"
                onScroll={(e) => {
                  // Prevent scroll propagation to the main page
                  e.stopPropagation();
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!msg.isUser && (
                      <div
                        className={`w-8 h-8 rounded-full ${
                          msg.error ? "bg-red-600" : "bg-blue-600"
                        } flex-shrink-0 flex items-center justify-center mr-2`}
                      >
                        <Bot className="text-white h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`p-4 rounded-2xl max-w-[80%] chat-message ${
                        msg.isUser
                          ? "bg-blue-600/90 text-white backdrop-blur-sm border border-blue-500/30 rounded-tr-none"
                          : msg.error
                          ? "bg-red-900/50 text-gray-100 backdrop-blur-sm border border-red-500/30 rounded-tl-none"
                          : "bg-gray-800/70 text-gray-100 backdrop-blur-sm border border-white/10 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.isUser && (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center ml-2">
                        <User className="text-white h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center mr-2">
                      <Bot className="text-white h-4 w-4" />
                    </div>
                    <div className="p-4 rounded-2xl max-w-[80%] bg-gray-800/70 text-gray-100 backdrop-blur-sm border border-white/10 rounded-tl-none">
                      <div className="flex space-x-1 typing-indicator">
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input - use onSubmit={handleSendMessage} with preventDefault */}
              <form
                onSubmit={handleSendMessage}
                className="border-t border-white/10 p-4 flex items-center chat-form"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 chat-input"
                  placeholder="Type your message..."
                />
                <Button
                  type="submit"
                  className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 chat-send-button flex items-center justify-center"
                  disabled={isTyping}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Chat;
