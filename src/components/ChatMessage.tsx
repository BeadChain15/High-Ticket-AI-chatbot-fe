import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70">
          {/* {new Date(message.timestamp).toLocaleTimeString()} */}
        </span>
      </div>
    </div>
  );
};