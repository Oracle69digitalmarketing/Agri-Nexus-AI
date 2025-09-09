import React from 'react';
import { Leaf, Wifi, WifiOff, Battery, Cpu } from 'lucide-react';

const Header = () => {
  const isOffline = true; // Simulating offline mode
  const batteryLevel = 85;
  const cpuUsage = 23;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Agri-Nexus AI</h1>
              <p className="text-xs text-gray-500">Offline AI Agent • Raspberry Pi 5</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
              {isOffline ? (
                <WifiOff className="h-4 w-4 text-gray-600" />
              ) : (
                <Wifi className="h-4 w-4 text-green-600" />
              )}
              <span className="text-xs text-gray-600">
                {isOffline ? 'Offline Mode' : 'Connected'}
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
              <Battery className="h-4 w-4 text-green-600" />
              <span className="text-xs text-gray-600">{batteryLevel}%</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
              <Cpu className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-gray-600">CPU {cpuUsage}%</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;