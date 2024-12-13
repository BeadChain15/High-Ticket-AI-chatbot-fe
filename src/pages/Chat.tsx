"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { getHistory } from "../services/chat";
import { Message } from "../types";

// export interface Message {
//   content: string;
//   role: 'user' | 'assistant' | 'system' | 'function';
// }

interface ChatProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatInterface = ({ messages, setMessages }: ChatProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: inputMessage, role: 'user' },
      ]);
      handleSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        message: message
      });
      setMessages(prevMessages => [
        ...prevMessages,
        { content: response.data.response, role: 'assistant' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const getChatHistory = async () => {
      try {
        const history = await getHistory();
        setMessages(history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    getChatHistory();
  }, [setMessages]);

  return (
    <div className="flex flex-col h-screen w-screen bg-white pt-20 text-black">
      {/* Chat Area */}
      {messages.length ? (
        <div className="w-full flex-1 self-center overflow-y-auto max-w-3xl p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === 'user' ? "bg-gray-100" : "bg-white border border-gray-200"}`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-3xl text-black pt-20">
          What can I help you with?
        </div>
      )}

      {/* Footer */}
      <div className={`w-full p-4 self-center max-w-3xl ${messages.length ? "border-t" : "pt-48 "}`}>
        <form onSubmit={handleSubmit} className="relative flex">
          <textarea
            placeholder={messages.length ? "Ask a follow-up question..." : "Ask a question about any High Ticket topic..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="w-full p-4 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 bg-gray-50"
            rows={4}
            style={{ resize: "none" }}
            aria-label="Chat message input"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
            aria-label="Send message"
          >
            <ArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
