import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CompanyProfile } from './components/CompanyProfile';
import { JobBoard } from './components/JobBoard';
import { Internships } from './components/Internships';
import { IndustryInsights } from './components/IndustryInsights';
import { Contributions } from './components/Contributions';

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