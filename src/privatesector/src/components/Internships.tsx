import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';

interface Internship {
  id: string;
  name: string;
  type: string;
  level: string;
  sponsorship: boolean;
  sector: string;
  period: string;
  applicationOpen: boolean;
  deadline: string;
}

export function Internships() {
  const [internships, setInternships] = useState<Internship[]>([
    {
      id: '1',
      name: 'Software Development Internship',
      type: 'Summer',
      level: 'Undergraduate',
      sponsorship: true,
      sector: 'Technology',
      period: '3 months',
      applicationOpen: true,
      deadline: '2024-03-15'
    },
    {
      id: '2',
      name: 'Marketing Research Internship',
      type: 'Part-time',
      level: 'Graduate',
      sponsorship: false,
      sector: 'Marketing',
      period: '6 months',
      applicationOpen: false,
      deadline: '2024-02-28'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [formData, setFormData] = useState<Partial<Internship>>({
    name: '',
    type: '',
    level: '',
    sponsorship: false,
    sector: '',
    period: '',
    applicationOpen: true,
    deadline: ''
  });

  const openDialog = (internship?: Internship) => {
    if (internship) {
      setEditingInternship(internship);
      setFormData(internship);
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

  const saveInternship = () => {
    if (editingInternship) {
      setInternships(prev => prev.map(internship => 
        internship.id === editingInternship.id ? { ...formData, id: editingInternship.id } as Internship : internship
      ));
    } else {
      const newInternship: Internship = {
        ...formData,
        id: Date.now().toString()
      } as Internship;
      setInternships(prev => [...prev, newInternship]);
    }
    closeDialog();
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl mb-2">Internships</h1>
          <p className="text-slate-400">Manage internship programs and applications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Internship
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingInternship ? 'Edit Internship' : 'Add New Internship'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Internship Name</Label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Type</Label>
                  <Select
                    value={formData.type || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Summer">Summer</SelectItem>
                      <SelectItem value="Winter">Winter</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Sector</Label>
                  <Select
                    value={formData.sector || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Period</Label>
                  <Input
                    value={formData.period || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                    placeholder="e.g., 3 months, 6 months"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Application Deadline</Label>
                <Input
                  type="date"
                  value={formData.deadline || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Sponsorship Available</Label>
                    <p className="text-slate-400 text-sm">Does this internship offer sponsorship?</p>
                  </div>
                  <Switch
                    checked={formData.sponsorship || false}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sponsorship: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Applications Open</Label>
                    <p className="text-slate-400 text-sm">Are applications currently being accepted?</p>
                  </div>
                  <Switch
                    checked={formData.applicationOpen || false}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, applicationOpen: checked }))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={closeDialog} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Cancel
                </Button>
                <Button onClick={saveInternship} className="bg-blue-600 hover:bg-blue-700">
                  {editingInternship ? 'Update Internship' : 'Add Internship'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {internships.map((internship) => (
          <Card key={internship.id} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white text-lg mb-2">{internship.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-blue-600">{internship.type}</Badge>
                    <Badge className="bg-purple-600">{internship.level}</Badge>
                    <Badge className="bg-green-600">{internship.sector}</Badge>
                    {internship.sponsorship && (
                      <Badge className="bg-yellow-600">Sponsored</Badge>
                    )}
                    <Badge className={internship.applicationOpen ? "bg-green-600" : "bg-red-600"}>
                      {internship.applicationOpen ? "Applications Open" : "Applications Closed"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleApplicationStatus(internship.id)}
                    className={`${
                      internship.applicationOpen 
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-400/10' 
                        : 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
                    }`}
                  >
                    {internship.applicationOpen ? 'Close' : 'Open'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openDialog(internship)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteInternship(internship.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
                    <Calendar className="w-4 h-4" />
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}