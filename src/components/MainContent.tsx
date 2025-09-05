import React from 'react';
import { Upload } from 'lucide-react';
import UploadArea from './UploadArea';

interface MainContentProps {
  activeSection: string;
}

export default function MainContent({ activeSection }: MainContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 'statistics':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistics</h2>
            <p className="text-gray-500">Statistics content would go here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-500">Settings content would go here.</p>
          </div>
        );
      case 'logout':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Logout</h2>
            <p className="text-gray-500">You have been logged out.</p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <UploadArea />
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>
          
          {activeSection === 'dashboard' && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 shadow-sm">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
          )}
        </div>
      </header>
      
      <main className="p-8">
        {renderContent()}
      </main>
    </div>
  );
}