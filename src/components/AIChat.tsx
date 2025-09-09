import React, { useState } from 'react';
import { Send, Bot, User, Mic, MicOff, Volume2 } from 'lucide-react';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm Agri-Nexus AI, your offline agricultural and health assistant. I'm running locally on this Raspberry Pi 5 with access to extensive knowledge about farming, livestock, and basic healthcare. How can I help you today?",
      timestamp: '10:30 AM',
      confidence: 0.95
    },
    {
      id: 2,
      type: 'user',
      content: "My maize plants have yellow spots on the leaves. What could be wrong?",
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      type: 'ai',
      content: "Based on your description, the yellow spots on maize leaves could indicate several conditions:\n\n1. **Maize Streak Virus** - Most likely if spots are parallel to leaf veins\n2. **Northern Corn Leaf Blight** - If spots are elongated and tan-colored\n3. **Nutrient deficiency** - Particularly nitrogen or potassium\n\n**Immediate actions:**\n- Remove affected leaves and burn them\n- Apply organic fungicide if available\n- Ensure proper spacing for air circulation\n- Check soil moisture levels\n\nWould you like specific treatment recommendations for any of these conditions?",
      timestamp: '10:33 AM',
      confidence: 0.89
    }
  ]);

  const quickQuestions = [
    "How to treat cassava mosaic disease?",
    "What fertilizer for tomatoes?",
    "Snake bite first aid",
    "Chicken vaccination schedule",
    "Soil pH testing methods",
    "Malaria prevention tips"
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
      
      // Simulate AI processing
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai' as const,
          content: "I'm analyzing your question using my local knowledge base. Let me search through agricultural and health data stored on this device...",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          confidence: 0.92
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  const speakResponse = (text: string) => {
    // Simulate text-to-speech
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
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${
                      msg.type === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </span>
                    {msg.type === 'ai' && (
                      <div className="flex items-center space-x-2">
                        {msg.confidence && (
                          <span className="text-xs text-gray-500">
                            {Math.round(msg.confidence * 100)}% confidence
                          </span>
                        )}
                        <button
                          onClick={() => speakResponse(msg.content)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Volume2 className="h-3 w-3 text-gray-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="p-4 border-t border-gray-200">
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
              className={`p-2 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about farming, health, or livestock..."
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

export default AIChat;