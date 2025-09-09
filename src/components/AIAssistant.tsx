import React, { useState } from 'react';
import { Send, Bot, User, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your agricultural AI assistant. I can help you with crop management, pest control, weather analysis, and farming best practices. What would you like to know?",
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'user',
      content: "What's the best time to plant tomatoes in my region?",
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      type: 'ai',
      content: "Based on your location and current soil temperature data, the optimal planting time for tomatoes is between March 15-30. The soil temperature has reached 16°C consistently, and the forecast shows minimal frost risk. I recommend preparing your soil with organic compost now and starting with seedlings rather than direct sowing for better results.",
      timestamp: '10:33 AM'
    }
  ]);

  const suggestions = [
    { icon: Lightbulb, text: "Optimize irrigation schedule", category: "irrigation" },
    { icon: AlertTriangle, text: "Pest prevention strategies", category: "pest" },
    { icon: CheckCircle, text: "Soil health improvement", category: "soil" },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user' as const,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai' as const,
          content: "I understand your question. Let me analyze your farm data and provide you with personalized recommendations based on current conditions and best practices.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Assistant</h2>
        <p className="text-gray-600">Get personalized agricultural advice powered by AI</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-3xl ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${msg.type === 'user' ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {msg.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`p-4 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <span className={`text-xs mt-2 block ${
                    msg.type === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestions */}
        <div className="p-4 border-t border-gray-200">
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-700">Quick suggestions:</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  <Icon className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{suggestion.text}</span>
                </button>
              );
            })}
          </div>

          {/* Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about farming..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;