import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Crop Health Score', 
      value: '87%', 
      change: '+5%', 
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    { 
      title: 'Soil Moisture', 
      value: '62%', 
      change: '-3%', 
      trend: 'down',
      icon: TrendingDown,
      color: 'blue'
    },
    { 
      title: 'Pest Risk Level', 
      value: 'Medium', 
      change: 'Stable', 
      trend: 'stable',
      icon: AlertTriangle,
      color: 'yellow'
    },
    { 
      title: 'Expected Yield', 
      value: '8.2 tons/ha', 
      change: '+12%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Farm Overview</h2>
        <p className="text-gray-600">AI-powered insights for your agricultural operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Weather Forecast</h3>
          <div className="space-y-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="flex items-center justify-between py-2">
                <span className="font-medium text-gray-700">{day}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {Math.floor(Math.random() * 10) + 20}°C - {Math.floor(Math.random() * 10) + 30}°C
                  </span>
                  <div className="w-16 bg-blue-100 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Optimal Irrigation Time</p>
                <p className="text-sm text-green-700">Water your crops between 6-8 AM for best results</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Pest Prevention</p>
                <p className="text-sm text-yellow-700">Apply organic pesticide in the next 2-3 days</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Market Opportunity</p>
                <p className="text-sm text-blue-700">Corn prices expected to rise by 8% next week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;