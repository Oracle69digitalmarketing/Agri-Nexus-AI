import React, { useState, useEffect } from 'react';
import { Leaf, Wifi, WifiOff, Battery, Cpu } from 'lucide-react';

interface SystemStatus {
  cpu_usage: number;
  is_online: boolean;
}

const Header = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/system-status');
        if (response.ok) {
          const data: SystemStatus = await response.json();
          setStatus(data);
        }
      } catch (error) {
        console.error("Failed to fetch system status for header:", error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const isOnline = status?.is_online ?? false;
  const cpuUsage = status?.cpu_usage ?? '...';
  const batteryLevel = 85; // This remains a placeholder for now

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
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-gray-600" />
              )}
              <span className="text-xs text-gray-600">
                {isOnline ? 'Online' : 'Offline'}
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