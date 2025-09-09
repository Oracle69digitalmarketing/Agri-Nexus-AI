import React, { useState, useEffect } from 'react';
import { Database, Search, Download, RefreshCw, HardDrive, AlertCircle } from 'lucide-react';

interface KnowledgeBaseStats {
  total_entries: number;
  categories: { name: string; count: number }[];
}

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stats, setStats] = useState<KnowledgeBaseStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/knowledge-base-stats');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: KnowledgeBaseStats = await response.json();
        setStats(data);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(`Failed to fetch knowledge base stats. ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Dummy data for parts not yet in the backend API
  const knowledgeStats = {
    lastUpdate: '2024-01-15',
    storageUsed: '2.3 GB',
  };

  const recentEntries = [
    {
      title: "Cassava Mosaic Disease Management",
      category: "Crop Diseases",
      confidence: 0.94,
      sources: ["FAO Guidelines", "IITA Research"],
      lastAccessed: "2 hours ago"
    },
    {
      title: "Chicken Newcastle Disease Prevention",
      category: "Livestock Care", 
      confidence: 0.91,
      sources: ["WHO Animal Health", "Local Vet Manual"],
      lastAccessed: "4 hours ago"
    },
    {
      title: "Malaria Prevention and Treatment",
      category: "Basic Healthcare",
      confidence: 0.96,
      sources: ["WHO Guidelines", "CDC Recommendations"],
      lastAccessed: "6 hours ago"
    },
    {
      title: "Maize Nitrogen Deficiency",
      category: "Soil Management",
      confidence: 0.88,
      sources: ["Agricultural Extension", "Research Papers"],
      lastAccessed: "1 day ago"
    }
  ];

  const datasetSources = [
    { name: "FAO Agricultural Guidelines", entries: 4200, status: "active" },
    { name: "WHO Health Manuals", entries: 3800, status: "active" },
    { name: "CGIAR Research Database", entries: 2900, status: "active" },
    { name: "Local Extension Services", entries: 2100, status: "active" },
    { name: "Veterinary Handbooks", entries: 1420, status: "active" },
    { name: "Traditional Knowledge", entries: 1000, status: "active" }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Base</h2>
        <p className="text-gray-600">Local FAISS vector store with agricultural and health intelligence</p>
      </div>

      {/* Stats Overview */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Entries</h3>
            <Database className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {isLoading ? '...' : stats?.total_entries.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Vector embeddings</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
             <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {isLoading ? '...' : stats?.categories.length}
          </div>
          <div className="text-sm text-gray-500">Domain categories</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Last Updated</h3>
             <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {knowledgeStats.lastUpdate}
          </div>
          <div className="text-sm text-gray-500">Last sync</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Storage</h3>
            <HardDrive className="h-6 w-6 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {knowledgeStats.storageUsed}
          </div>
          <div className="text-sm text-gray-500">Local storage used</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search and Categories */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search knowledge base..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                Search
              </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories ({stats?.total_entries || 0})
              </button>
              {stats?.categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Recent Entries */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Accessed</h3>
            <div className="space-y-4">
              {recentEntries.map((entry, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{entry.title}</h4>
                    <span className="text-sm text-green-600 font-medium">
                      {Math.round(entry.confidence * 100)}% match
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{entry.category}</span>
                    <span>{entry.lastAccessed}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Sources: {entry.sources.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dataset Sources */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Data Sources</h3>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {datasetSources.map((source, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900 text-sm">{source.name}</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <div className="text-xs text-gray-500">
                  {source.entries.toLocaleString()} entries
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Offline Capability</h4>
            <p className="text-sm text-blue-700">
              All knowledge is stored locally using FAISS vector embeddings. No internet required for queries.
            </p>
          </div>

          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Last Update</h4>
            <p className="text-sm text-green-700">
              Knowledge base updated: {knowledgeStats.lastUpdate}
            </p>
            <button className="mt-2 flex items-center space-x-2 text-sm text-green-600 hover:text-green-700">
              <Download className="h-4 w-4" />
              <span>Check for updates</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;