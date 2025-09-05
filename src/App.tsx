import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import LandingPage from './components/LandingPage';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showDashboard, setShowDashboard] = useState(false);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleStart = () => {
    setShowDashboard(true);
  };

  if (!showDashboard) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeItem={activeSection} onItemClick={handleSectionChange} />
      <MainContent activeSection={activeSection} />
    </div>
  );
}

export default App;