import React, { useState, useEffect } from 'react';
import { FiTrash2, FiPlus, FiExternalLink } from 'react-icons/fi';

type Job = {
  id: string;
  name: string;
  type: string;
  skillsRequired: string[];
  qualifications: string[];
  level: string;
  link: string;
  period: string;
  positions: number;
};

const JobBoard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCompanies = async () => {
      setLoading(true);
      try {
      const response = await fetch("http://localhost:5000/api/jobsData", {
        method: "GET", // Changed from GET to POST
        headers: { "Content-Type": "application/json" }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setJobs([]); // Set empty array to prevent map error
    }finally{
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<Omit<Job, 'id'>>({
    name: '',
    type: '',
    skillsRequired: [],
    qualifications: [],
    level: '',
    link: '',
    period: '',
    positions: 1
  });

  const [newSkill, setNewSkill] = useState('');
  const [newQualification, setNewQualification] = useState('');

  const openDialog = (job: Job | null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        name: job.name,
        type: job.type,
        skillsRequired: job.skillsRequired,
        qualifications: job.qualifications,
        level: job.level,
        link: job.link,
        period: job.period,
        positions: job.positions
      });
    } else {
      setEditingJob(null);
      setFormData({
        name: '',
        type: '',
        skillsRequired: [],
        qualifications: [],
        level: '',
        link: '',
        period: '',
        positions: 1
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingJob(null);
    setNewSkill('');
    setNewQualification('');
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };
  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((_, i) => i !== index)
    }));
  };

  const addQualification = () => {
    if (newQualification.trim()) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification.trim()]
      }));
      setNewQualification('');
    }
  };

  const removeQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const saveJob = () => {
    if (editingJob) {
      setJobs(prev => prev.map(job => 
        job.id === editingJob.id ? { ...formData, id: editingJob.id } : job
      ));
    } else {
      const newJob: Job = {
        ...formData,
        id: Date.now().toString(),
      };
      setJobs(prev => [...prev, newJob]);
    }
    closeDialog();
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };
console.log(jobs);
  return (
    <div className="min-h-screen dark:bg-slate-900 p-6 bg-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-2xl mb-2">Job Board</h1>
            <p className="text-slate-400">Manage job postings and opportunities</p>
          </div>
          <button 
            onClick={() => openDialog(null)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Job
          </button>
        </div>

        {/* Job Cards */}
        <div className="grid gap-4">
          {loading ? (
  <div>Loading jobs...</div>
) : (
  (jobs || []).map((job) => (
            <div key={job.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg> <h3 className="text-white text-lg mb-2">{job.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">{job.type}</span>
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">{job.level}</span>
                    <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs">
                      {job.positions} position{job.positions > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openDialog(job)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 p-2 rounded transition-colors"
                    title="Edit Job"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded transition-colors"
                    title="Delete Job"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => window.open(job.link, '_blank')}
                    className="text-green-400 hover:text-green-300 hover:bg-green-400/10 p-2 rounded transition-colors"
                    title="Open Application Link"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-slate-300 mb-2">Skills Required</h4>
                  <div className="flex flex-wrap gap-1">
                    {(job.skillsrequired || ["no Skills"]).map((skill, index) => (
                      <span key={index} className="border border-slate-600 text-slate-300 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-slate-300 mb-2">Period</h4>
                  <p className="text-white">{job.period}</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-slate-300 mb-2">Qualifications</h4>
                <ul className="text-slate-400 text-sm space-y-1">
                  {job.qualifications.map((qualification, index) => (
                    <li key={index}>• {qualification}</li>
                  ))}
                </ul>
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
                  {editingJob ? 'Edit Job' : 'Add New Job'}
                </h2>
                <button
                  onClick={closeDialog}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Job Name and Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Job Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Type</label>
                    <select
                      value={formData.type || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    >
                      <option value="">Select job type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                </div>

                {/* Level and Positions */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Level</label>
                    <select
                      value={formData.level || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    >
                      <option value="">Select level</option>
                      <option value="Entry">Entry Level</option>
                      <option value="Mid">Mid Level</option>
                      <option value="Senior">Senior Level</option>
                      <option value="Lead">Lead</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Positions Available</label>
                    <input
                      type="number"
                      value={formData.positions || 1}
                      onChange={(e) => setFormData(prev => ({ ...prev, positions: Number(e.target.value) }))}
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                      min="1"
                    />
                  </div>
                </div>

                {/* Period and Link */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Period</label>
                    <input
                      type="text"
                      value={formData.period || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                      placeholder="e.g., 6 months, Permanent"
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Application Link</label>
                    <input
                      type="text"
                      value={formData.link || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="https://..."
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                    />
                  </div>
                </div>

                {/* Skills Required */}
                <div>
                  <label className="block text-slate-300 mb-1">Skills Required</label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-2">
                    {formData.skillsRequired?.map((skill, index) => (
                      <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        {skill}
                        <button
                          onClick={() => removeSkill(index)}
                          className="hover:bg-blue-700 p-0.5 rounded"
                        >
                          <FiTrash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add skill..."
                      className="flex-1 bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <button 
                      onClick={addSkill}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Qualifications */}
                <div>
                  <label className="block text-slate-300 mb-1">Qualifications</label>
                  <div className="space-y-2 mt-2 mb-2">
                    {formData.qualifications?.map((qualification, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                        <span className="text-white text-sm">{qualification}</span>
                        <button
                          onClick={() => removeQualification(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1 rounded"
                        >
                          <FiTrash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newQualification}
                      onChange={(e) => setNewQualification(e.target.value)}
                      placeholder="Add qualification..."
                      className="flex-1 bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                      onKeyPress={(e) => e.key === 'Enter' && addQualification()}
                    />
                    <button 
                      onClick={addQualification}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                    >
                      <FiPlus className="w-4 h-4" />
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
                    onClick={saveJob}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    {editingJob ? 'Update Job' : 'Add Job'}
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

export default JobBoard;