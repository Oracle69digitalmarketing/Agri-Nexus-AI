import React from 'react';
import { MessageSquare, Phone, Voicemail } from 'lucide-react';

const Multichannel = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Multichannel Support</h2>
      <p className="text-gray-600 mb-6">
        Our chatbot is available on multiple platforms. Reach out to us via WhatsApp, SMS, or Voice.
      </p>
      <div className="space-y-4">
        {/* WhatsApp Channel */}
        <div className="flex items-center p-4 bg-green-50 rounded-lg">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
            <p className="text-gray-600">
              Send a message to <span className="font-medium text-green-700">+123-456-7890</span> to start a conversation.
            </p>
          </div>
        </div>
        {/* SMS Channel */}
        <div className="flex items-center p-4 bg-blue-50 rounded-lg">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Voicemail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">SMS</h3>
            <p className="text-gray-600">
              Text us at <span className="font-medium text-blue-700">555-0123</span> for quick assistance.
            </p>
          </div>
        </div>
        {/* Voice Channel */}
        <div className="flex items-center p-4 bg-purple-50 rounded-lg">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <Phone className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Voice</h3>
            <p className="text-gray-600">
              Call <span className="font-medium text-purple-700">+123-456-7891</span> to interact with our voice assistant.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-sm text-gray-500">
        <p>
          Please note that standard messaging and call rates may apply.
          The voice interface is currently in beta.
        </p>
      </div>
    </div>
  );
};

export default Multichannel;
