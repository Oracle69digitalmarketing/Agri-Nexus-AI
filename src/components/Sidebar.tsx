import React from 'react';
import { Bot, Phone, BookOpen, Settings, BarChart, Heart, Leaf, MessageSquare } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'chat', icon: Bot, label: 'AI Chat' },
    { id: 'voice', icon: Phone, label: 'Voice Interface' },
    { id: 'knowledge', icon: BookOpen, label: 'Knowledge Base' },
    { id: 'agriculture', icon: Leaf, label: 'Agriculture KB' },
    { id: 'health', icon: Heart, label: 'Health KB' },
    { id: 'system', icon: BarChart, label: 'System Status' },
    { id: 'multichannel', icon: MessageSquare, label: 'Multichannel' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Agri-Nexus AI</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(item.id);
            }}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              activeSection === item.id
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
