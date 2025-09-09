import React from 'react';
import { Leaf, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

const CropMonitor = () => {
  const crops = [
    { 
      name: 'Corn Field A', 
      health: 92, 
      stage: 'Flowering', 
      area: '15.2 ha',
      status: 'excellent',
      lastUpdate: '2 hours ago'
    },
    { 
      name: 'Wheat Field B', 
      health: 78, 
      stage: 'Grain Filling', 
      area: '8.7 ha',
      status: 'good',
      lastUpdate: '4 hours ago'
    },
    { 
      name: 'Soybean Field C', 
      health: 65, 
      stage: 'Vegetative', 
      area: '12.1 ha',
      status: 'warning',
      lastUpdate: '1 hour ago'
    },
    { 
      name: 'Tomato Field D', 
      health: 88, 
      stage: 'Fruiting', 
      area: '3.5 ha',
      status: 'excellent',
      lastUpdate: '30 min ago'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return CheckCircle;
      case 'good': return TrendingUp;
      case 'warning': return AlertCircle;
      default: return Leaf;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Crop Monitoring</h2>
        <p className="text-gray-600">AI-powered crop health analysis and growth tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Area</h3>
            <Leaf className="h-6 w-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">39.5 ha</div>
          <div className="text-sm text-gray-500">Across 4 fields</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Avg Health Score</h3>
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">81%</div>
          <div className="text-sm text-green-600">+5% from last week</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
          <div className="text-sm text-yellow-600">Requires attention</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {crops.map((crop, index) => {
          const StatusIcon = getStatusIcon(crop.status);
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
                <StatusIcon className={`h-6 w-6 ${getStatusColor(crop.status)}`} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Health Score</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold text-gray-900">{crop.health}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          crop.health >= 80 ? 'bg-green-500' : 
                          crop.health >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${crop.health}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Growth Stage</div>
                  <div className="text-lg font-medium text-gray-900">{crop.stage}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Area: {crop.area}</span>
                <span className="text-gray-400">Updated {crop.lastUpdate}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Growth Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-medium text-green-900 mb-1">Optimal Growth</h4>
            <p className="text-sm text-green-700">Corn and tomato fields showing excellent progress</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-6 w-6 text-yellow-600 mb-2" />
            <h4 className="font-medium text-yellow-900 mb-1">Attention Needed</h4>
            <p className="text-sm text-yellow-700">Soybean field showing signs of nutrient deficiency</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-blue-900 mb-1">Yield Prediction</h4>
            <p className="text-sm text-blue-700">Expected 15% increase in overall yield this season</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropMonitor;