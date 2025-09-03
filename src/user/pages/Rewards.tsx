import { useState } from 'react';
import {
  FaAward,
  FaTrophy,
  FaStar,
  FaPlus,
  FaSearch,
  FaEye,
  FaDownload,
  FaShare,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaTimes
} from 'react-icons/fa';

// Mock data for certificates
const certificates = [
  {
    id: 1,
    name: 'Full Stack Web Development',
    issuer: 'TechCorp Academy',
    issueDate: '2024-02-15',
    expiryDate: '2027-02-15',
    type: 'Professional Certificate',
    status: 'active',
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    credentialId: 'FSW-2024-0215-001',
    verificationUrl: 'https://verify.techcorp.com/FSW-2024-0215-001',
    description: 'Comprehensive full-stack web development program covering modern technologies and best practices.'
  },
  {
    id: 2,
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issueDate: '2024-01-10',
    expiryDate: '2027-01-10',
    type: 'Industry Certification',
    status: 'active',
    skills: ['AWS', 'Cloud Computing', 'Infrastructure'],
    credentialId: 'AWC-2024-0110-002',
    verificationUrl: 'https://aws.amazon.com/verification/AWC-2024-0110-002',
    description: 'Foundational knowledge of AWS cloud services and architecture.'
  },
  {
    id: 3,
    name: 'Digital Marketing Fundamentals',
    issuer: 'Marketing Institute',
    issueDate: '2023-11-20',
    expiryDate: '2025-11-20',
    type: 'Course Certificate',
    status: 'expiring_soon',
    skills: ['SEO', 'Social Media Marketing', 'Analytics'],
    credentialId: 'DMF-2023-1120-003',
    verificationUrl: 'https://verify.marketinginst.com/DMF-2023-1120-003',
    description: 'Essential digital marketing strategies and tools for modern businesses.'
  }
];

// Mock data for rewards and achievements
const rewards = [
  {
    id: 1,
    name: 'Top Performer Award',
    type: 'Achievement',
    awardedBy: 'TechCorp Solutions',
    date: '2024-03-01',
    description: 'Recognized for outstanding performance during Software Development Internship',
    icon: 'trophy',
    category: 'Performance'
  },
  {
    id: 2,
    name: 'Innovation Excellence',
    type: 'Recognition',
    awardedBy: 'Innovation Hub',
    date: '2024-02-15',
    description: 'Awarded for developing an innovative solution during the hackathon',
    icon: 'star',
    category: 'Innovation'
  },
  {
    id: 3,
    name: 'Community Contributor',
    type: 'Badge',
    awardedBy: 'TVET Platform',
    date: '2024-01-30',
    description: 'Active participation in community forums and helping fellow learners',
    icon: 'award',
    category: 'Community'
  }
];

const Rewards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('certificates');
  const [isAddCertificateOpen, setIsAddCertificateOpen] = useState(false);
  type Certificate = typeof certificates[number];
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [newCertificate, setNewCertificate] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    type: 'Course Certificate',
    credentialId: '',
    verificationUrl: '',
    description: '',
    skills: ''
  });

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || cert.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white';
      case 'expiring_soon': return 'bg-yellow-600 text-white';
      case 'expired': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getRewardIcon = (iconType: string) => {
    const iconClass = "text-3xl";
    switch (iconType) {
      case 'trophy': return <span className={`text-yellow-500 ${iconClass}`}>🏆</span>;
      case 'star': return <span className={`text-blue-500 ${iconClass}`}>⭐</span>;
      case 'award': return <span className={`text-purple-500 ${iconClass}`}>🏅</span>;
      default: return <span className={`text-gray-500 ${iconClass}`}>🏅</span>;
    }
  };

  const handleAddCertificate = () => {
    console.log('Adding certificate:', newCertificate);
    setIsAddCertificateOpen(false);
    setNewCertificate({
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      type: 'Course Certificate',
      credentialId: '',
      verificationUrl: '',
      description: '',
      skills: ''
    });
  };

  const viewCertificate = (certificate: typeof certificates[number]) => {
    setSelectedCertificate(certificate);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-semibold text-white mb-2">Certificates & Rewards</h2>
          <p className="text-slate-400">Manage your achievements, certifications, and recognition</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Certificates</p>
                <p className="text-2xl font-semibold text-white">{certificates.length}</p>
              </div>
              <FaAward className="text-blue-500 text-2xl" />
            </div>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Certifications</p>
                <p className="text-2xl font-semibold text-green-400">
                  {certificates.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">✓</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Rewards Earned</p>
                <p className="text-2xl font-semibold text-yellow-400">{rewards.length}</p>
              </div>
              <FaTrophy className="text-yellow-500 text-2xl" />
            </div>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Skills Verified</p>
                <p className="text-2xl font-semibold text-purple-400">12</p>
              </div>
              <FaStar className="text-purple-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-zinc-900 border border-slate-700 rounded-lg">
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'certificates'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Certificates
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'rewards'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rewards & Achievements
            </button>
          </div>

          {/* Certificates Tab Content */}
          {activeTab === 'certificates' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">My Certificates</h3>
                  <p className="text-slate-400">View and manage your certifications and credentials</p>
                </div>
                
                <button
                  onClick={() => setIsAddCertificateOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <FaPlus />
                  <span>Add Certificate</span>
                </button>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="relative flex-1 min-w-64">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search certificates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="Course Certificate">Course Certificate</option>
                  <option value="Professional Certificate">Professional Certificate</option>
                  <option value="Industry Certification">Industry Certification</option>
                </select>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expiring_soon">Expiring Soon</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              
              {/* Certificates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((certificate) => (
                  <div key={certificate.id} className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(certificate.status)}`}>
                        {certificate.status.replace('_', ' ')}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => viewCertificate(certificate)}
                          className="text-blue-400 hover:text-blue-300 p-1"
                        >
                          <FaEye />
                        </button>
                        <button className="text-slate-400 hover:text-slate-300 p-1">
                          <FaDownload />
                        </button>
                        <button className="text-slate-400 hover:text-slate-300 p-1">
                          <FaShare />
                        </button>
                      </div>
                    </div>
                    
                    <h4 className="text-white text-lg font-semibold mb-1">{certificate.name}</h4>
                    <p className="text-slate-400 mb-4">{certificate.issuer}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Issue Date:</span>
                        <span className="text-slate-300">{certificate.issueDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Expires:</span>
                        <span className="text-slate-300">{certificate.expiryDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded border border-slate-500"
                        >
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded border border-slate-500">
                          +{certificate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => window.open(certificate.verificationUrl, '_blank')}
                      className="w-full py-2 border border-slate-600 text-slate-300 hover:bg-slate-600 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <FaExternalLinkAlt />
                      <span>Verify Certificate</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rewards Tab Content */}
          {activeTab === 'rewards' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white">Rewards & Achievements</h3>
                <p className="text-slate-400">Recognition and awards for your accomplishments</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <div key={reward.id} className="bg-slate-700 border border-slate-600 rounded-lg p-6 text-center">
                    <div className="mb-4">
                      {getRewardIcon(reward.icon)}
                    </div>
                    <h4 className="text-white text-lg font-semibold mb-1">{reward.name}</h4>
                    <p className="text-slate-400 mb-4">{reward.awardedBy}</p>
                    
                    <div className="space-y-2 mb-4">
                      <span className="inline-block px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded border border-slate-500">
                        {reward.category}
                      </span>
                      <div className="flex items-center justify-center space-x-1 text-slate-400">
                        <FaCalendarAlt className="text-xs" />
                        <span className="text-sm">{reward.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-sm">{reward.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add Certificate Modal */}
        {isAddCertificateOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Add New Certificate</h3>
                    <p className="text-slate-400">Add a new certificate or credential to your profile</p>
                  </div>
                  <button
                    onClick={() => setIsAddCertificateOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-1">Certificate Name</label>
                      <input
                        type="text"
                        value={newCertificate.name}
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., AWS Cloud Practitioner"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-1">Issuing Organization</label>
                      <input
                        type="text"
                        value={newCertificate.issuer}
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, issuer: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Amazon Web Services"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-1">Certificate Type</label>
                      <select
                        value={newCertificate.type}
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Course Certificate">Course Certificate</option>
                        <option value="Professional Certificate">Professional Certificate</option>
                        <option value="Industry Certification">Industry Certification</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-1">Issue Date</label>
                      <input
                        type="date"
                        value={newCertificate.issueDate}
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, issueDate: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-1">Expiry Date</label>
                      <input
                        type="date"
                        value={newCertificate.expiryDate}
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, expiryDate: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-1">Credential ID</label>
                      <input
                        type="text"
                        value={newCertificate.credentialId}
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, credentialId: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., AWC-2024-001"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-1">Verification URL</label>
                      <input
                        type="url"
                        value={newCertificate.verificationUrl}
                        onChange={(e) => setNewCertificate(prev => ({ ...prev, verificationUrl: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://verify.example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={newCertificate.description}
                      onChange={(e) => setNewCertificate(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe what this certificate covers..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1">Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={newCertificate.skills}
                      onChange={(e) => setNewCertificate(prev => ({ ...prev, skills: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., AWS, Cloud Computing, Infrastructure"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setIsAddCertificateOpen(false)}
                    className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCertificate}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Add Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certificate View Modal */}
  {isViewDialogOpen && selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedCertificate?.name}</h3>
                    <p className="text-slate-400">{selectedCertificate?.issuer} • {selectedCertificate?.type}</p>
                  </div>
                  <button
                    onClick={() => setIsViewDialogOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-sm">Issue Date</p>
                      <p className="text-white">{selectedCertificate?.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Expiry Date</p>
                      <p className="text-white">{selectedCertificate?.expiryDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Credential ID</p>
                      <p className="text-white">{selectedCertificate?.credentialId}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Status</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedCertificate?.status ?? '')}`}>
                        {selectedCertificate?.status?.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Description</p>
                    <p className="text-slate-300">{selectedCertificate?.description}</p>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Skills Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate?.skills?.map((skill: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-slate-600 text-slate-300 text-xs rounded border border-slate-500">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => selectedCertificate?.verificationUrl && window.open(selectedCertificate.verificationUrl, '_blank')}
                    className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 flex items-center space-x-2"
                  >
                    <FaExternalLinkAlt />
                    <span>Verify Online</span>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2">
                    <FaDownload />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rewards;