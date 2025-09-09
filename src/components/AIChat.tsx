import React, { useState, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
  confidence?: number;
}

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial message from the AI
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm Agri-Nexus AI. How can I assist you with farming, livestock, or health questions today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, []);

  const quickQuestions = [
    "How to treat cassava mosaic disease?",
    "What fertilizer for tomatoes?",
    "Snake bite first aid",
    "Chicken vaccination schedule",
    "Soil pH testing methods",
    "Malaria prevention tips"
  ];

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user' as const,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai' as const,
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: data.confidence,
      };
      
      setMessages(prev => [...prev, aiResponse]);

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get response from the AI service. ${errorMessage}`);
      const errorResponse: Message = {
        id: messages.length + 2,
        type: 'ai' as const,
        content: "Sorry, I'm having trouble connecting to my knowledge base. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoice = () => {
    // Voice functionality is not implemented in this version.
    setIsListening(!isListening);
  };

  const speakResponse = (text: string) => {
    // Text-to-speech functionality is not implemented in this version.
    console.log('Speaking:', text);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Chat Interface</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>🟢 GPT-OSS-20B Model Active</span>
          <span>📊 FAISS Vector Store Ready</span>
          <span>🔄 Processing Locally</span>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-3 max-w-4xl ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-full ${msg.type === 'user' ? 'bg-green-500' : 'bg-blue-500'}`}>
                    {msg.type === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                  </div>
                  <div className={`p-4 rounded-lg ${msg.type === 'user' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${msg.type === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                        {msg.timestamp}
                      </span>
                      {msg.type === 'ai' && (
                        <div className="flex items-center space-x-2">
                          {msg.confidence && (
                            <span className="text-xs text-gray-500">
                              {Math.round(msg.confidence * 100)}% confidence
                            </span>
                          )}
                          <button onClick={() => speakResponse(msg.content)} className="p-1 hover:bg-gray-200 rounded">
                            <Volume2 className="h-3 w-3 text-gray-500" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-4xl">
                  <div className="p-2 rounded-full bg-blue-500">
                    <Bot className="h-4 w-4 text-white animate-pulse" />
                  </div>
                  <div className="p-4 rounded-lg bg-gray-100 text-gray-900">
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-t border-gray-200">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Quick questions:</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(question)}
                  className="p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors text-gray-700"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleVoice}
                className={`p-2 rounded-lg transition-colors ${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about farming, health, or livestock..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:bg-green-300"
                disabled={isLoading}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default AIChat;