import React from 'react';
import { Cpu, HardDrive, Thermometer, Zap, Wifi, Database, Brain, Mic } from 'lucide-react';

const SystemStatus = () => {
  const systemMetrics = {
    cpu: { usage: 23, temperature: 45, cores: 4 },
    memory: { used: 2.1, total: 8, percentage: 26 },
    storage: { used: 28, total: 64, percentage: 44 },
    temperature: 45,
    power: { voltage: 5.1, current: 2.3, status: 'stable' },
    uptime: '2 days, 14 hours'
  };

  const aiServices = [
    { name: 'GPT-OSS-20B Model', status: 'running', cpu: 15, memory: 1.2 },
    { name: 'FAISS Vector Store', status: 'running', cpu: 3, memory: 0.8 },
    { name: 'Speech Recognition', status: 'running', cpu: 5, memory: 0.3 },
    { name: 'Text-to-Speech', status: 'running', cpu: 2, memory: 0.2 },
    { name: 'FastAPI Server', status: 'running', cpu: 1, memory: 0.1 }
  ];

  const networkStatus = {
    offline: true,
    lastSync: '3 days ago',
    pendingUpdates: 2,
    localQueries: 1247
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100';
      case 'warning': return 'bg-yellow-100';
      case 'error': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Status</h2>
        <p className="text-gray-600">Raspberry Pi 5 hardware monitoring and AI service status</p>
      </div>

      {/* Hardware Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">CPU Usage</h3>
            <Cpu className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{systemMetrics.cpu.usage}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${systemMetrics.cpu.usage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500">
            {systemMetrics.cpu.cores} cores • {systemMetrics.cpu.temperature}°C
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Memory</h3>
            <HardDrive className="h-6 w-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{systemMetrics.memory.percentage}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${systemMetrics.memory.percentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500">
            {systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Storage</h3>
            <Database className="h-6 w-6 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{systemMetrics.storage.percentage}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-purple-500 h-2 rounded-full" 
              style={{ width: `${systemMetrics.storage.percentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500">
            {systemMetrics.storage.used}GB / {systemMetrics.storage.total}GB
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Temperature</h3>
            <Thermometer className="h-6 w-6 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{systemMetrics.temperature}°C</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-orange-500 h-2 rounded-full" 
              style={{ width: `${(systemMetrics.temperature / 80) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500">Normal operating range</div>
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