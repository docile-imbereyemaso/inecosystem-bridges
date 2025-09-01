import React, { useState } from 'react';
import { 
  FaSearch, 

  FaCalendarAlt, 
  FaClock, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaUsers,
  FaExternalLinkAlt,
  FaBook,
  FaBullseye
} from 'react-icons/fa';

// Mock data for available internships and training programs
const availableInternships = [
  {
    id: 1,
    name: 'Software Development Internship',
    company: 'TechCorp Solutions',
    type: 'Internship',
    sector: 'Technology',
    level: 'Intermediate',
    duration: '6 months',
    stipend: '$800/month',
    location: 'Remote',
    deadline: '2024-04-30',
    description: 'Work with our development team on real-world projects using React, Node.js, and cloud technologies.',
    requirements: ['JavaScript', 'React', 'Git'],
    status: 'open'
  },
  {
    id: 2,
    name: 'Digital Marketing Training Program',
    company: 'Marketing Hub',
    type: 'Training',
    sector: 'Marketing',
    level: 'Beginner',
    duration: '3 months',
    stipend: 'Unpaid',
    location: 'New York, NY',
    deadline: '2024-05-15',
    description: 'Comprehensive training in digital marketing strategies, SEO, and social media management.',
    requirements: ['Basic Computer Skills', 'Communication'],
    status: 'open'
  },
  {
    id: 3,
    name: 'Healthcare Assistant Training',
    company: 'HealthCare Plus',
    type: 'Training',
    sector: 'Healthcare',
    level: 'Entry',
    duration: '4 months',
    stipend: '$600/month',
    location: 'Boston, MA',
    deadline: '2024-04-20',
    description: 'Learn essential healthcare assistance skills including patient care and medical record management.',
    requirements: ['High School Diploma', 'CPR Certification'],
    status: 'open'
  }
];

const myApplications = [
  {
    id: 1,
    programId: 1,
    name: 'Software Development Internship',
    company: 'TechCorp Solutions',
    appliedDate: '2024-03-15',
    status: 'under_review',
    nextStep: 'Technical Interview'
  },
  {
    id: 2,
    programId: 2,
    name: 'Digital Marketing Training Program',
    company: 'Marketing Hub',
    appliedDate: '2024-03-10',
    status: 'accepted',
    nextStep: 'Orientation - March 25'
  }
];

const completedPrograms = [
  {
    id: 1,
    name: 'Web Development Bootcamp',
    company: 'CodeAcademy',
    type: 'Training',
    duration: '12 weeks',
    completedDate: '2024-02-15',
    grade: 'A',
    certificate: 'Available'
  }
];

const Training = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('available');

  const filteredPrograms = availableInternships.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'all' || program.sector === sectorFilter;
    const matchesType = typeFilter === 'all' || program.type === typeFilter;
    const matchesLevel = levelFilter === 'all' || program.level === levelFilter;
    
    return matchesSearch && matchesSector && matchesType && matchesLevel;
  });

  const getStatusColor = (status:string) => {
    switch (status) {
      case 'accepted': return 'bg-green-600 text-white';
      case 'under_review': return 'bg-yellow-600 text-white';
      case 'rejected': return 'bg-red-600 text-white';
      case 'pending': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getLevelColor = (level:string) => {
    switch (level) {
      case 'Entry': return 'bg-green-100 text-green-800 border-green-200';
      case 'Beginner': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Intermediate': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Advanced': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 min-h-screen text-gray-900 dark:text-white space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">Internship & Training</h1>
        <p className="text-gray-600 dark:text-slate-400">Discover and apply for internships and training programs</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400">Available Programs</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{availableInternships.length}</p>
            </div>
            <FaBook className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400">My Applications</p>
              <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">{myApplications.length}</p>
            </div>
            <FaBullseye className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400">Completed</p>
              <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{completedPrograms.length}</p>
            </div>
            <FaUsers className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400">Success Rate</p>
              <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">75%</p>
            </div>
            <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="space-y-4">
        {/* Tab Navigation */}
        <div className="flex bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-1">
          <button 
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'available' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Available Programs
          </button>
          <button 
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'applications' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
            onClick={() => setActiveTab('applications')}
          >
            My Applications
          </button>
          <button 
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'completed' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>

        {/* Available Programs Tab */}
        {activeTab === 'available' && (
          <div className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Available Programs</h3>
                <p className="text-gray-600 dark:text-slate-400">
                  Browse and apply for internships and training opportunities
                </p>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-64">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-400 h-4 w-4" />
                  <input
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <select 
                  className="px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-40"
                  value={sectorFilter} 
                  onChange={(e) => setSectorFilter(e.target.value)}
                >
                  <option value="all">All Sectors</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
                
                <select 
                  className="px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-40"
                  value={typeFilter} 
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="Internship">Internship</option>
                  <option value="Training">Training</option>
                </select>
                
                <select 
                  className="px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-40"
                  value={levelFilter} 
                  onChange={(e) => setLevelFilter(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="Entry">Entry</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredPrograms.map((program) => (
                <div key={program.id} className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{program.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-slate-300 mb-2 text-sm">
                        <div className="flex items-center gap-1">
                          <FaBuilding className="h-4 w-4" />
                          <span>{program.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="h-4 w-4" />
                          <span>{program.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock className="h-4 w-4" />
                          <span>{program.duration}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">
                          {program.type}
                        </span>
                        <span className={`px-2 py-1 border rounded text-xs font-medium ${getLevelColor(program.level)}`}>
                          {program.level}
                        </span>
                        <span className="px-2 py-1 border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-300 rounded text-xs font-medium">
                          {program.sector}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-green-600 dark:text-green-400 font-semibold">{program.stipend}</p>
                      <p className="text-gray-500 dark:text-slate-400 text-sm">Deadline: {program.deadline}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">{program.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-gray-700 dark:text-slate-300 font-medium mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.requirements.map((req, index) => (
                        <span key={index} className="px-2 py-1 border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-300 rounded text-xs">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 text-sm">
                      <FaCalendarAlt className="h-4 w-4" />
                      <span>Apply by {program.deadline}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-md hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                        <FaExternalLinkAlt className="h-4 w-4" />
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">My Applications</h3>
              <p className="text-gray-600 dark:text-slate-400">
                Track the status of your applications
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 dark:border-slate-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Program</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Company</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Applied Date</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Next Step</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myApplications.map((application) => (
                    <tr key={application.id} className="border-b border-gray-200 dark:border-slate-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{application.name}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{application.company}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{application.appliedDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{application.nextStep}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Completed Programs Tab */}
        {activeTab === 'completed' && (
          <div className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Completed Programs</h3>
              <p className="text-gray-600 dark:text-slate-400">
                Your completed internships and training programs
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 dark:border-slate-700">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Program</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Company</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Completed</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Grade</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Certificate</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {completedPrograms.map((program) => (
                    <tr key={program.id} className="border-b border-gray-200 dark:border-slate-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{program.name}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{program.company}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{program.type}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{program.duration}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-slate-300">{program.completedDate}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-600 text-white rounded text-xs font-medium">
                          {program.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-300">{program.certificate}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                          Download Certificate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Training;