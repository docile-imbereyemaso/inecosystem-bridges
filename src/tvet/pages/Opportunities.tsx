import { useState } from 'react';
import { FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface Opportunity {
  id: string;
  name: string;
  company: string;
  sector: string;
  level: string;
  location: string;
  salary: string;
  positions: number;
  description: string;
  requirements: string[];
  period: {
    startDate: string;
    endDate: string;
    duration: string;
  };
  status: string;
  applicants: number;
}

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    name: 'React Developer',
    company: 'TechCorp Solutions',
    sector: 'Technology',
    level: 'Mid',
    location: 'Remote',
    salary: '$60,000 - $80,000',
    positions: 3,
    description: 'We are looking for a skilled React developer.',
    requirements: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
    period: {
      startDate: '2024-03-01',
      endDate: '2024-04-30',
      duration: '60 days',
    },
    status: 'Active',
    applicants: 24,
  },
  {
    id: '2',
    name: 'Construction Manager',
    company: 'BuildRight Construction',
    sector: 'Construction',
    level: 'Senior',
    location: 'New York, NY',
    salary: '$75,000 - $95,000',
    positions: 1,
    description: 'Experienced construction manager needed.',
    requirements: ['Project Management', 'Team Leadership'],
    period: {
      startDate: '2024-02-15',
      endDate: '2024-05-15',
      duration: '90 days',
    },
    status: 'Active',
    applicants: 18,
  },
];

const Opportunities = () => {
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOpportunities = opportunities.filter(
    (opp) =>
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  


  return (
  <div className="space-y-6 p-4 bg-white dark:bg-slate-900">
      <div>
  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Opportunities</h2>
  <p className="text-gray-600 dark:text-slate-400">Explore various opportunities available for you.</p>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-400" />
        <input
          type="text"
          placeholder="Search opportunities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 rounded bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white w-full border border-gray-300 dark:border-slate-600"
        />
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opp) => (
          <div key={opp.id} className="bg-gray-50 dark:bg-slate-800 p-4 rounded border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">{opp.name}</p>
                <p className="text-gray-600 dark:text-slate-400 text-sm">{opp.company}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-500 dark:text-blue-400 hover:text-blue-400"><FaEye /></button>
                <button className="text-yellow-500 dark:text-yellow-400 hover:text-yellow-400"><FaEdit /></button>
                <button className="text-red-500 dark:text-red-400 hover:text-red-400"><FaTrash /></button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-700 dark:text-slate-300 text-sm">
              <span>Sector: {opp.sector}</span>
              <span>Level: {opp.level}</span>
              <span>Positions: {opp.positions}</span>
              <span>Location: {opp.location}</span>
              <span>Salary: {opp.salary}</span>
              <span>Duration: {opp.period.duration}</span>
              <span>Status: {opp.status}</span>
              <span>Applicants: {opp.applicants}</span>
            </div>
            <p className="text-gray-700 dark:text-slate-300 mt-2">{opp.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {opp.requirements.map((req, idx) => (
                <span key={idx} className="text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded border border-gray-300 dark:border-slate-600 text-xs">
                  {req}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;

