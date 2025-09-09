import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';

const WeatherSection = () => {
  const currentWeather = {
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    precipitation: 15
  };

  const forecast = [
    { day: 'Today', high: 30, low: 22, condition: 'Sunny', icon: Sun, rain: 0 },
    { day: 'Tomorrow', high: 28, low: 20, condition: 'Cloudy', icon: Cloud, rain: 20 },
    { day: 'Wed', high: 25, low: 18, condition: 'Rainy', icon: CloudRain, rain: 85 },
    { day: 'Thu', high: 27, low: 19, condition: 'Partly Cloudy', icon: Cloud, rain: 10 },
    { day: 'Fri', high: 29, low: 21, condition: 'Sunny', icon: Sun, rain: 0 },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Weather & Climate</h2>
        <p className="text-gray-600">AI-powered weather insights for optimal farming decisions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">Current Weather</h3>
              <p className="text-blue-100">Real-time conditions</p>
            </div>
            <Cloud className="h-12 w-12 text-blue-200" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-4xl font-bold mb-2">{currentWeather.temperature}°C</div>
              <div className="text-blue-100">{currentWeather.condition}</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4" />
                <span className="text-sm">Humidity: {currentWeather.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="h-4 w-4" />
                <span className="text-sm">Wind: {currentWeather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center space-x-2">
                <CloudRain className="h-4 w-4" />
                <span className="text-sm">Rain: {currentWeather.precipitation}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Soil Temperature</h3>
          <div className="flex items-center justify-center mb-4">
            <Thermometer className="h-8 w-8 text-orange-500" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">22°C</div>
            <div className="text-sm text-gray-500">Optimal for planting</div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">5-Day Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => {
            const Icon = day.icon;
            return (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900 mb-2">{day.day}</div>
                <Icon className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                <div className="space-y-1">
                  <div className="text-lg font-bold text-gray-900">{day.high}°</div>
                  <div className="text-sm text-gray-500">{day.low}°</div>
                  <div className="text-xs text-blue-600">{day.rain}% rain</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherSection;