"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Conversation, Message } from "../types";
import { chatStoreService } from "../services/chatStoreService";
import { sendMessage } from "../services/chat";
import Thinking from "../components/Thinking";
import MarkdownRenderer from "../components/Markdown";

// export interface Message {
//   content: string;
//   role: 'user' | 'assistant' | 'system' | 'function';
// }

const ChatInterface = () => {
  const [conversation, setConversation] = useState<Conversation>(
    chatStoreService.getCurrentConversation()
  );
  const [inputMessage, setInputMessage] = useState("");
  const [threadId, setThreadId] = useState<string>(chatStoreService.getCurrentThreadId());
  const [thinking, setThinking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setThinking(true);
    e.preventDefault();
    if (inputMessage.trim()) {
      const userMessage: Message = {
        content: inputMessage,
        role: "user",
      };
      chatStoreService.addMessage(userMessage);
      setConversation(chatStoreService.getCurrentConversation());
      console.log("conversation:", conversation, userMessage);
      console.log("threadId:", threadId);

      const response = await sendMessage(inputMessage, threadId);
      console.log(response);
      const botMessage: Message = {
        content: response.response,
        role: "assistant",
      };
      chatStoreService.addMessage(botMessage);
      setConversation(chatStoreService.getCurrentConversation());
      setInputMessage("");
      setThinking(false);
    }
  };

  const handleNewThread = async () => {
    await chatStoreService.startNewThread(
      chatStoreService.getCurrentThreadId()
    );
    setConversation(chatStoreService.getCurrentConversation());
    setInputMessage("");
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [inputMessage, thinking]);

  useEffect(() => {
    setThreadId(chatStoreService.getCurrentThreadId())
  }, [])

  console.log("Render", sessionStorage.getItem('currentThreadId'), chatStoreService.getCurrentThreadId(), "||" , threadId);

  return (
    <div className="flex flex-col h-screen w-screen bg-white pt-20 text-black">
      <button
        onClick={handleNewThread}
        className="absolute w-fit rounded-lg bg-gray-500 px-4 py-2 mx-4 text-white hover:bg-gray-600"
      >
        New Chat
      </button>
      {/* Chat Area */}
      {conversation.messages.length ? (
        <div
          id="chat-container"
          className="w-full flex-1 self-center overflow-y-auto max-w-3xl p-4 space-y-4"
        >
          {conversation.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-gray-100"
                    : "bg-white border border-gray-200"
                }`}
              >
                {/* <ReactMarkdown remarkPlugins={[remarkGfm]} >
                  {message.content}
                </ReactMarkdown> */}
                <MarkdownRenderer markdown={message.content}/>
              </div>
            </div>
          ))}
          {thinking && <Thinking />}
        </div>
      ) : (
        <div className="text-center text-3xl text-black pt-20">
          What can I help you with?
        </div>
      )}

      {/* Footer */}
      <div
        className={`w-full p-4 self-center max-w-3xl ${
          conversation.messages.length ? "border-t" : ""
        }`}
      >
        <form onSubmit={handleSubmit} className="relative flex">
          <textarea
            // disabled={thinking}
            placeholder={
              conversation.messages.length
                ? "Ask a follow-up question..."
                : "Ask a question about any High Ticket topic..."
            }
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
