import React, { useState } from 'react';
import { ArrowRight, Zap, Shield, Gauge } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://john57845738478.app.n8n.cloud/webhook-test/87476124-4418-43c2-933d-24347b484016', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          action: 'start_dashboard',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Webhook response:', data);
        onStart(); // Open dashboard only if webhook responds successfully
      } else {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }
    } catch (err) {
      console.error('Webhook error:', err);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Unable to connect to webhook service. Please check your internet connection or try again later.');
      } else {
        setError('Failed to connect. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">MICROSAAS</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your
              <span className="text-blue-600 block">Business Today</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Streamline your workflow with our powerful MicroSaaS platform. 
              Upload, manage, and optimize your content with enterprise-grade tools.
            </p>
            
            {/* Start Button */}
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleStartClick}
                disabled={isLoading}
                className={`group px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg flex items-center space-x-3 mx-auto ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                <span>{isLoading ? 'Connecting...' : 'Start'}</span>
                {!isLoading && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                )}
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
              </button>
              
              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Process and upload your files in seconds with our optimized infrastructure.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is protected with enterprise-grade security and encryption.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <Gauge className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor your performance with detailed insights and statistics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 py-6 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 MicroSaaS. Built with precision and care.
        </p>
      </footer>
    </div>
  );
}