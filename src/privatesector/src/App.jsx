import { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { CompanyProfile } from './components/CompanyProfile.jsx';
import { JobBoard } from './components/JobBoard.jsx';
import { Internships } from './components/Internships.jsx';
import { IndustryInsights } from './components/IndustryInsights.jsx';
import { Contributions } from './components/Contributions.jsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('company-profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'company-profile':
        return <CompanyProfile />;
      case 'job-board':
        return <JobBoard />;
      case 'internships':
        return <Internships />;
      case 'industry-insights':
        return <IndustryInsights />;
      case 'contributions':
        return <Contributions />;
      default:
        return <CompanyProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}