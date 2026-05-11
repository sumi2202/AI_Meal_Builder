import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';

interface ChatWindowProps {
  messages: Message[];
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-ivory-mist-50 rounded-lg shadow-lg">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-vintage-grape-600 text-ivory-mist-50'
                  : 'bg-ivory-mist-50 text-vintage-grape-900 border border-powder-petal-200'
              }`}
            >
              {message.role === 'assistant' ? (
                <div className="whitespace-pre-wrap text-gray-800">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-ivory-mist-50 text-vintage-grape-900 px-4 py-2 rounded-lg border border-powder-petal-200">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-vintage-grape-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-vintage-grape-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-vintage-grape-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-vintage-grape-900">Assistant is typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-powder-petal-200 p-4 bg-ivory-mist-50 rounded-b-lg text-vintage-grape-400">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about PCOS-friendly meals..."
            className="flex-1 px-4 py-2 border border-vintage-grape-300 rounded-md focus:outline-none focus:ring-2 focus:ring-vintage-grape-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-vintage-grape-600 text-ivory-mist-50 rounded-md hover:bg-vintage-grape-700 focus:outline-none focus:ring-2 focus:ring-vintage-grape-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;