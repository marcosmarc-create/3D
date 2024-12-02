import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FileUp, Search } from 'lucide-react';
import UploadForm from './components/UploadForm';
import SearchModels from './components/SearchModels';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
                >
                  <FileUp className="h-5 w-5 mr-2" />
                  Upload
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="py-10">
          <Routes>
            <Route path="/" element={<UploadForm />} />
            <Route path="/search" element={<SearchModels />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;