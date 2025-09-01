import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Job {
  id: string;
  name: string;
  type: string;
  skillsRequired: string[];
  qualifications: string[];
  level: string;
  link: string;
  period: string;
  positions: number;
}

export function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      name: 'Senior Frontend Developer',
      type: 'Full-time',
      skillsRequired: ['React', 'TypeScript', 'CSS'],
      qualifications: ['Bachelor\'s in Computer Science', '5+ years experience'],
      level: 'Senior',
      link: 'https://company.com/jobs/frontend',
      period: '3 months',
      positions: 2
    },
    {
      id: '2',
      name: 'Data Analyst',
      type: 'Contract',
      skillsRequired: ['Python', 'SQL', 'Tableau'],
      qualifications: ['Data Science background', '3+ years experience'],
      level: 'Mid',
      link: 'https://company.com/jobs/analyst',
      period: '6 months',
      positions: 1
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<Partial<Job>>({
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

  const openDialog = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setFormData(job);
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
    if (newSkill.trim() && formData.skillsRequired) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...(prev.skillsRequired || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired?.filter((_, i) => i !== index) || []
    }));
  };

  const addQualification = () => {
    if (newQualification.trim() && formData.qualifications) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...(prev.qualifications || []), newQualification.trim()]
      }));
      setNewQualification('');
    }
  };

  const removeQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications?.filter((_, i) => i !== index) || []
    }));
  };

  const saveJob = () => {
    if (editingJob) {
      setJobs(prev => prev.map(job => 
        job.id === editingJob.id ? { ...formData, id: editingJob.id } as Job : job
      ));
    } else {
      const newJob: Job = {
        ...formData,
        id: Date.now().toString(),
        skillsRequired: formData.skillsRequired || [],
        qualifications: formData.qualifications || []
      } as Job;
      setJobs(prev => [...prev, newJob]);
    }
    closeDialog();
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl mb-2">Job Board</h1>
          <p className="text-slate-400">Manage job postings and opportunities</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingJob ? 'Edit Job' : 'Add New Job'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Job Name</Label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Type</Label>
                  <Select
                    value={formData.type || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Level</Label>
                  <Select
                    value={formData.level || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Entry">Entry Level</SelectItem>
                      <SelectItem value="Mid">Mid Level</SelectItem>
                      <SelectItem value="Senior">Senior Level</SelectItem>
                      <SelectItem value="Lead">Lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Positions Available</Label>
                  <Input
                    type="number"
                    value={formData.positions || 1}
                    onChange={(e) => setFormData(prev => ({ ...prev, positions: Number(e.target.value) }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Period</Label>
                  <Input
                    value={formData.period || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                    placeholder="e.g., 6 months, Permanent"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Application Link</Label>
                  <Input
                    value={formData.link || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://..."
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Skills Required</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {formData.skillsRequired?.map((skill, index) => (
                    <Badge key={index} className="bg-blue-600 text-white pr-1">
                      {skill}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeSkill(index)}
                        className="ml-1 h-auto p-0 hover:bg-blue-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill..."
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Qualifications</Label>
                <div className="space-y-2 mt-2 mb-2">
                  {formData.qualifications?.map((qualification, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                      <span className="text-white text-sm">{qualification}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeQualification(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    placeholder="Add qualification..."
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addQualification()}
                  />
                  <Button onClick={addQualification} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={closeDialog} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Cancel
                </Button>
                <Button onClick={saveJob} className="bg-blue-600 hover:bg-blue-700">
                  {editingJob ? 'Update Job' : 'Add Job'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white text-lg mb-2">{job.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-green-600">{job.type}</Badge>
                    <Badge className="bg-purple-600">{job.level}</Badge>
                    <Badge className="bg-orange-600">{job.positions} position{job.positions > 1 ? 's' : ''}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openDialog(job)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteJob(job.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(job.link, '_blank')}
                    className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-slate-300 mb-2">Skills Required</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.skillsRequired.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                        {skill}
                      </Badge>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}