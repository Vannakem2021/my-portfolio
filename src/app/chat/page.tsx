import { Metadata } from "next";
import Chat from "@/components/Chat";

// Force dynamic rendering to prevent caching issues
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chat | AI Assistant",
  description: "Chat with my AI assistant",
};

export default function ChatPage() {
  return <Chat />;
}
