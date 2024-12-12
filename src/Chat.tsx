"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";

interface Message {
  content: string;
  isUser: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    // { content: "hello", isUser: true },
    // { content: "Hello! How can I assist you today?", isUser: false },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: inputMessage, isUser: true },
      ]);
      console.log("history", messages)
      handleSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        message: message
      });
      console.log("response", response.data.response)
      setMessages(prevMessages => [
        ...prevMessages,
        { content: response.data.response, isUser: false }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };    

  return (
    <div className="flex flex-col h-screen w-screen bg-white pt-20 text-black">
      {/* Chat Area */}
      {messages.length ? (
        <div className="w-full flex-1 self-center overflow-y-auto max-w-3xl p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.isUser
                    ? "bg-gray-100"
                    : "bg-white border border-gray-200"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}

      {/* Footer */}
      <div
        className={`w-full p-4 self-center max-w-3xl ${
          messages.length ? "border-t" : "pt-48 "
        }`}
      >
        {!messages.length && (
          <div className="text-center text-3xl text-black mb-4">
            What can I help you?
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex">
          <textarea
            placeholder={
              messages.length
                ? "Ask a follow up question..."
                : "Ask a question about any High Ticket topic..."
            }
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) {
                  // Allow new line if Shift is pressed with Enter
                  return; // Nothing to do here, just let it go
                } else {
                  // If only Enter is pressed, handle submit
                  e.preventDefault(); // Prevent default behavior of Enter key
                  handleSubmit(e); // Call your submit function
                }
              }
            }}
            className="w-full p-4 pr-24 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400 bg-gray-50"
            rows={4} // Number of rows visible
            style={{resize: "none"}}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
