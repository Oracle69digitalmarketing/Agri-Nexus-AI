import React, { useState, useEffect } from 'react';
import { Stethoscope, AlertCircle } from 'lucide-react';

interface KnowledgeEntry {
  question: string;
  answer: string;
  category: string;
}

const HealthKB = () => {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/knowledge-base/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category: 'Basic Healthcare' }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: KnowledgeEntry[] = await response.json();
        setEntries(data);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(`Failed to fetch health knowledge base. ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Stethoscope className="h-8 w-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">Health Knowledge Base</h2>
        </div>
        <p className="text-gray-600">Information on basic healthcare, first aid, and preventive care.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {isLoading ? (
        <p>Loading health knowledge base...</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">{entry.question}</h4>
              <p className="text-sm text-gray-700">{entry.answer}</p>
              <div className="mt-2 text-xs text-gray-500">
                Category: <span className="font-medium text-red-600">{entry.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthKB;
