import React, { useState, useEffect } from 'react';
import { Search, Download } from 'lucide-react';
import { searchModels, getModels } from '../utils/storage';
import { Model3D } from '../types/model';
import ModelImage from './ModelImage';

export default function SearchModels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Model3D[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const allModels = getModels();
      setSearchResults(Array.isArray(allModels) ? allModels : []);
    } catch (error) {
      console.error('Error loading models:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = searchQuery.trim() 
        ? searchModels(searchQuery)
        : getModels();
      setSearchResults(Array.isArray(results) ? results : []);
    } catch (error) {
      console.error('Error searching models:', error);
      setSearchResults([]);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <div className="animate-pulse">Loading models...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search models..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      {searchResults.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          {searchQuery.trim() 
            ? "No results found" 
            : "No models uploaded yet. Upload some models to get started!"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((model) => (
            <div key={model.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <ModelImage
                src={model.previewImageFile || model.previewImage}
                alt={model.title}
                className="w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{model.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{model.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Author: {model.author}</p>
                  <p>Upload Date: {new Date(model.uploadDate).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 space-y-2">
                  {Array.isArray(model.files) && model.files.map((file) => (
                    <a
                      key={file.id}
                      href={file.url}
                      download={file.name}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <Download className="h-5 w-5" />
                      Download {file.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}