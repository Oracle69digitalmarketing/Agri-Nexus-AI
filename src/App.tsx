import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AIChat from './components/AIChat';
import VoiceInterface from './components/VoiceInterface';
import KnowledgeBase from './components/KnowledgeBase';
import SystemStatus from './components/SystemStatus';

function App() {
  const [activeSection, setActiveSection] = useState('chat');

  const renderContent = () => {
    switch (activeSection) {
      case 'chat':
        return <AIChat />;
      case 'voice':
        return <VoiceInterface />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'system':
        return <SystemStatus />;
      default:
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Module
                </h3>
                <p className="text-gray-600 mb-4">This feature is under development</p>
                <div className="text-sm text-gray-500">
                  Available modules: AI Chat, Voice Interface, Knowledge Base, System Status
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;