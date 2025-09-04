import { useState, useEffect } from 'react';

type Internship = {
  id: string;
  name: string;
  type: string;
  level: string;
  sponsorship: boolean;
  sector: string;
  period: string;
  applicationOpen: boolean;
  deadline: string;
};

const Internships: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [formData, setFormData] = useState<Omit<Internship, 'id'>>({
    name: '',
    type: '',
    level: '',
    sponsorship: false,
    sector: '',
    period: '',
    applicationOpen: true,
    deadline: ''
  });

  const openDialog = (internship: Internship | null) => {
    if (internship) {
      setEditingInternship(internship);
      setFormData({
        name: internship.name,
        type: internship.type,
        level: internship.level,
        sponsorship: internship.sponsorship,
        sector: internship.sector,
        period: internship.period,
        applicationOpen: internship.applicationOpen,
        deadline: internship.deadline
      });
    } else {
      setEditingInternship(null);
      setFormData({
        name: '',
        type: '',
        level: '',
        sponsorship: false,
        sector: '',
        period: '',
        applicationOpen: true,
        deadline: ''
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingInternship(null);
  };

// DISPLAYING INTERNSHIPS

  const [internships, setInternships] = useState<internship[]>([]);

  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchCompanies = async () => {
      setLoading(true);
      try {
      const response = await fetch("http://localhost:5000/api/getInternships", {
        method: "GET", // Changed from GET to POST
        headers: { "Content-Type": "application/json" }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setInternships(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setInternships([]); // Set empty array to prevent map error
    }finally{
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

const saveInternship = async () => {
  // Validate required fields
  if (!formData.name || !formData.type || !formData.level || !formData.deadline) {
    alert("Name, type, level, and deadline are required");
    return;
  }

  try {
    const url = editingInternship 
      ? `http://localhost:5000/api/internships/${editingInternship.id}` 
      : "http://localhost:5000/api/internships";

    const method = editingInternship ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      
      if (editingInternship) {
        setInternships(prev => prev.map(internship => 
          internship.id === editingInternship.id ? result.internship : internship
        ));
      } else {
        setInternships(prev => [...prev, result.internship]);
      }
      
      closeDialog();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save internship");
    }
  } catch (error: any) {
    console.error("Error saving internship:", error);
    alert(error.message || "Failed to save internship");
  }
};

  const deleteInternship = (id: string) => {
    setInternships(prev => prev.filter(internship => internship.id !== id));
  };

  const toggleApplicationStatus = (id: string) => {
    setInternships(prev => prev.map(internship =>
      internship.id === id
        ? { ...internship, applicationOpen: !internship.applicationOpen }
        : internship
    ));
  };

  return (
    <div className="min-h-screen dark:bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-2xl mb-2">Internships</h1>
            <p className="text-slate-400">Manage internship programs and applications</p>
          </div>
          <button 
            onClick={() => openDialog(null)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Internship
          </button>
        </div>

        {/* Internship Cards */}
        <div className="grid gap-4">
          {loading ? (
  <div>Loading internship...</div>
) : (internships.map((internship) => (
            <div key={internship.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white text-lg mb-2">{internship.name}</h3>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">{internship.type}</span>
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">{internship.level}</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">{internship.sector}</span>
                    {internship.sponsorship && (
                      <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">Sponsored</span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs text-white ${
                      internship.applicationOpen ? "bg-green-600" : "bg-red-600"
                    }`}>
                      {internship.applicationOpen ? "Applications Open" : "Applications Closed"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleApplicationStatus(internship.id)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      internship.applicationOpen 
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-400/10' 
                        : 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
                    }`}
                  >
                    {internship.applicationOpen ? 'Close' : 'Open'}
                  </button>
                  <button
                    onClick={() => openDialog(internship)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 p-2 rounded transition-colors"
                    title="Edit Internship"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteInternship(internship.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded transition-colors"
                    title="Delete Internship"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
                <div>
                  <h4 className="mb-1">Duration</h4>
                  <p className="text-white">{internship.period}</p>
                </div>
                <div>
                  <h4 className="mb-1">Deadline</h4>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-white">{new Date(internship.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-1">Status</h4>
                  <p className={`${
                    new Date(internship.deadline) > new Date() 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {new Date(internship.deadline) > new Date() ? 'Active' : 'Expired'}
                  </p>
                </div>
              </div>
            </div>
          )))}
        </div>

        {/* Modal Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 border border-slate-700 text-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {editingInternship ? 'Edit Internship' : 'Add New Internship'}
                </h2>
                <button
                  onClick={closeDialog}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Internship Name */}
                <div>
                  <label className="block text-slate-300 mb-1">Internship Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                  />
                </div>

                {/* Type and Level */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Type</label>
                    <select
                      value={formData.type || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    >
                      <option value="">Select type</option>
                      <option value="Summer">Summer</option>
                      <option value="Winter">Winter</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Full-time">Full-time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Level</label>
                    <select
                      value={formData.level || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    >
                      <option value="">Select level</option>
                      <option value="High School">High School</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                </div>

                {/* Sector and Period */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Sector</label>
                    <select
                      value={formData.sector || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    >
                      <option value="">Select sector</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Research">Research</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Period</label>
                    <input
                      type="text"
                      value={formData.period || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                      placeholder="e.g., 3 months, 6 months"
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    />
                  </div>
                </div>

                {/* Application Deadline */}
                <div>
                  <label className="block text-slate-300 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                  />
                </div>

                {/* Toggle Switches */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-slate-300 block">Sponsorship Available</label>
                      <p className="text-slate-400 text-sm">Does this internship offer sponsorship?</p>
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, sponsorship: !prev.sponsorship }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.sponsorship ? 'bg-blue-600' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.sponsorship ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-slate-300 block">Applications Open</label>
                      <p className="text-slate-400 text-sm">Are applications currently being accepted?</p>
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, applicationOpen: !prev.applicationOpen }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.applicationOpen ? 'bg-blue-600' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.applicationOpen ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={closeDialog}
                    className="border border-slate-600 text-slate-300 hover:bg-slate-700 px-4 py-2 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveInternship}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    {editingInternship ? 'Update Internship' : 'Add Internship'}
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

export default Internships;
