import React, { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Play, Square } from 'lucide-react';

const VoiceInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentQuery, setCurrentQuery] = useState('');
  const [lastResponse, setLastResponse] = useState('');

  const recentQueries = [
    { query: "How to prevent cassava mosaic disease?", timestamp: "2 min ago", language: "English" },
    { query: "Dawa ya malaria ni nini?", timestamp: "5 min ago", language: "Swahili" },
    { query: "Comment traiter la rouille du maïs?", timestamp: "8 min ago", language: "French" },
  ];

  const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  ];

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setCurrentQuery("Listening...");
      // Simulate speech recognition
      setTimeout(() => {
        setCurrentQuery("How do I treat sick chickens?");
        setIsListening(false);
      }, 3000);
    } else {
      setCurrentQuery('');
    }
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    if (!isSpeaking) {
      setLastResponse("For sick chickens, first isolate them from healthy birds. Check for symptoms like lethargy, loss of appetite, or unusual discharge. Provide clean water and consider basic antibiotics if available. Contact a veterinarian if symptoms persist.");
      // Simulate text-to-speech duration
      setTimeout(() => {
        setIsSpeaking(false);
      }, 8000);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Voice Interface</h2>
        <p className="text-gray-600">Speak naturally in your local language - no internet required</p>
      </div>

      {/* Main Voice Control */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6">
        <div className="text-center">
          <div className="mb-6">
            <button
              onClick={toggleListening}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg scale-110' 
                  : 'bg-green-500 hover:bg-green-600 shadow-md'
              }`}
            >
              {isListening ? (
                <MicOff className="h-12 w-12 text-white" />
              ) : (
                <Mic className="h-12 w-12 text-white" />
              )}
            </button>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isListening ? 'Listening...' : 'Tap to speak'}
          </h3>
          
          {currentQuery && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 italic">"{currentQuery}"</p>
            </div>
          )}

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`p-3 rounded-lg transition-colors ${
                audioEnabled 
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {audioEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
            </button>
            
            <button
              onClick={toggleSpeaking}
              className={`px-6 py-3 rounded-lg transition-colors ${
                isSpeaking 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isSpeaking ? (
                <>
                  <Square className="h-5 w-5 inline mr-2" />
                  Stop Speaking
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 inline mr-2" />
                  Test Response
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Support */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Languages</h3>
          <div className="space-y-3">
            {supportedLanguages.map((lang) => (
              <div key={lang.code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium text-gray-900">{lang.name}</span>
                </div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Offline Speech Recognition:</strong> All voice processing happens locally on this device using Whisper.cpp
            </p>
          </div>
        </div>

        {/* Recent Queries */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Voice Queries</h3>
          <div className="space-y-3">
            {recentQueries.map((item, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-900 mb-1">"{item.query}"</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{item.timestamp}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{item.language}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Response */}
      {lastResponse && (
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Response</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{lastResponse}</p>
            {isSpeaking && (
              <div className="mt-3 flex items-center space-x-2 text-blue-600">
                <Volume2 className="h-4 w-4 animate-pulse" />
                <span className="text-sm">Speaking response...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceInterface;