import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Thermometer, Zap, Wifi, Database, Brain, Mic, AlertCircle, RefreshCw } from 'lucide-react';

interface SystemMetrics {
  cpu_usage: number;
  memory_usage: number;
  storage_usage: number;
  temperature: number;
  is_online: boolean;
}

const SystemStatus = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/system-status');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SystemMetrics = await response.json();
      setMetrics(data);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to fetch system status. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Dummy data for services, as this is not yet in the backend API
  const aiServices = [
    { name: 'GPT-OSS-20B Model', status: 'running', cpu: 15, memory: 1.2 },
    { name: 'FAISS Vector Store', status: 'running', cpu: 3, memory: 0.8 },
    { name: 'Speech Recognition', status: 'running', cpu: 5, memory: 0.3 },
    { name: 'Text-to-Speech', status: 'running', cpu: 2, memory: 0.2 },
    { name: 'FastAPI Server', status: 'running', cpu: 1, memory: 0.1 }
  ];

  // Dummy data for network, as this is not yet in the backend API
  const networkStatus = {
    lastSync: '3 days ago',
    pendingUpdates: 2,
    localQueries: 1247
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Status</h2>
        <p className="text-gray-600">Raspberry Pi 5 hardware monitoring and AI service status</p>
      </div>

      {/* Hardware Metrics */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{error}</p>
          <button onClick={fetchStatus} className="ml-auto p-1 text-red-700 hover:bg-red-100 rounded-full">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">CPU Usage</h3>
            <Cpu className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{metrics ? `${metrics.cpu_usage}%` : '...'}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${metrics?.cpu_usage || 0}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500">
            {isLoading ? 'Loading...' : 'Real-time CPU load'}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Memory</h3>
            <HardDrive className="h-6 w-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{metrics ? `${metrics.memory_usage}%` : '...'}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${metrics?.memory_usage || 0}%` }}
            ></div>
          </div>
           <div className="text-sm text-gray-500">
            {isLoading ? 'Loading...' : 'RAM usage'}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Storage</h3>
            <Database className="h-6 w-6 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{metrics ? `${metrics.storage_usage}%` : '...'}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-purple-500 h-2 rounded-full" 
              style={{ width: `${metrics?.storage_usage || 0}%` }}
            ></div>
          </div>
           <div className="text-sm text-gray-500">
            {isLoading ? 'Loading...' : 'Local storage usage'}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Temperature</h3>
            <Thermometer className="h-6 w-6 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{metrics ? `${metrics.temperature}°C` : '...'}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-orange-500 h-2 rounded-full" 
              style={{ width: `${metrics ? (metrics.temperature / 80) * 100 : 0}%` }}
            ></div>
          </div>
           <div className="text-sm text-gray-500">
            {isLoading ? 'Loading...' : 'Core temperature'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Services Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Services</h3>
          <div className="space-y-4">
            {aiServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'running' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-medium text-gray-900">{service.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">CPU: {service.cpu}%</div>
                  <div className="text-xs text-gray-500">RAM: {service.memory}GB</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">AI Performance</span>
            </div>
            <p className="text-sm text-green-700">
              All AI services running optimally. Average query response time: 1.2 seconds
            </p>
          </div>
        </div>

        {/* Network & Power Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Wifi className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">Internet Connection</span>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  Offline Mode
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Last Sync:</span>
                  <div className="font-medium text-gray-900">{networkStatus.lastSync}</div>
                </div>
                <div>
                  <span className="text-gray-500">Local Queries:</span>
                  <div className="font-medium text-gray-900">{networkStatus.localQueries}</div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  System operating in full offline mode. {networkStatus.pendingUpdates} updates pending for next sync.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Power Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-gray-900">Power Supply</span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                  {systemMetrics.power.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Voltage:</span>
                  <div className="font-medium text-gray-900">{systemMetrics.power.voltage}V</div>
                </div>
                <div>
                  <span className="text-gray-500">Current:</span>
                  <div className="font-medium text-gray-900">{systemMetrics.power.current}A</div>
                </div>
              </div>
              
              <div className="text-sm">
                <span className="text-gray-500">Uptime:</span>
                <div className="font-medium text-gray-900">{systemMetrics.uptime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;