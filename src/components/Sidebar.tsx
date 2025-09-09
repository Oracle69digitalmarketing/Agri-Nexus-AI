import React, { useState } from 'react';
import { 
  MessageSquare,
  Mic,
  Database,
  Stethoscope,
  Sprout,
  Users,
  Settings,
  HardDrive
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'chat', label: 'AI Chat', icon: MessageSquare },
    { id: 'voice', label: 'Voice Interface', icon: Mic },
    { id: 'agriculture', label: 'Agriculture KB', icon: Sprout },
    { id: 'health', label: 'Health KB', icon: Stethoscope },
    { id: 'community', label: 'Community Hub', icon: Users },
    { id: 'knowledge', label: 'Knowledge Base', icon: Database },
    { id: 'system', label: 'System Status', icon: HardDrive },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-white w-64 h-full border-r border-gray-200 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;