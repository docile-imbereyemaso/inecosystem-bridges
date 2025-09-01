import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Edit, Trash2, Download, Eye, FileText, Calendar, User } from 'lucide-react';

interface Contribution {
  id: string;
  title: string;
  type: 'Research Report' | 'Industry Analysis' | 'Skills Assessment' | 'Market Study' | 'Other';
  description: string;
  author: string;
  dateCreated: string;
  status: 'Draft' | 'Under Review' | 'Published' | 'Archived';
  tags: string[];
  fileUrl?: string;
}

export function Contributions() {
  const [contributions, setContributions] = useState<Contribution[]>([
    {
      id: '1',
      title: 'Q4 2023 Tech Industry Skills Gap Report',
      type: 'Research Report',
      description: 'Comprehensive analysis of skill shortages in the technology sector, including recommendations for training programs and curriculum development.',
      author: 'Dr. Sarah Johnson',
      dateCreated: '2024-01-15',
      status: 'Published',
      tags: ['Technology', 'Skills Gap', 'Training', 'Q4 2023'],
      fileUrl: 'https://example.com/reports/tech-skills-gap-q4-2023.pdf'
    },
    {
      id: '2',
      title: 'Remote Work Impact on Hiring Practices',
      type: 'Industry Analysis',
      description: 'Study on how remote work trends have affected recruitment strategies and skill requirements across various industries.',
      author: 'Mark Thompson',
      dateCreated: '2024-01-08',
      status: 'Under Review',
      tags: ['Remote Work', 'Hiring', 'Recruitment', 'Trends']
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContribution, setEditingContribution] = useState<Contribution | null>(null);
  const [formData, setFormData] = useState<Partial<Contribution>>({
    title: '',
    type: 'Research Report',
    description: '',
    author: '',
    status: 'Draft',
    tags: [],
    fileUrl: ''
  });

  const [newTag, setNewTag] = useState('');

  const openDialog = (contribution?: Contribution) => {
    if (contribution) {
      setEditingContribution(contribution);
      setFormData(contribution);
    } else {
      setEditingContribution(null);
      setFormData({
        title: '',
        type: 'Research Report',
        description: '',
        author: '',
        status: 'Draft',
        tags: [],
        fileUrl: ''
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingContribution(null);
    setNewTag('');
  };

  const addTag = () => {
    if (newTag.trim() && formData.tags) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || []
    }));
  };

  const saveContribution = () => {
    if (editingContribution) {
      setContributions(prev => prev.map(contribution => 
        contribution.id === editingContribution.id 
          ? { ...formData, id: editingContribution.id, dateCreated: editingContribution.dateCreated } as Contribution 
          : contribution
      ));
    } else {
      const newContribution: Contribution = {
        ...formData,
        id: Date.now().toString(),
        dateCreated: new Date().toISOString().split('T')[0],
        tags: formData.tags || []
      } as Contribution;
      setContributions(prev => [...prev, newContribution]);
    }
    closeDialog();
  };

  const deleteContribution = (id: string) => {
    setContributions(prev => prev.filter(contribution => contribution.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-600';
      case 'Under Review':
        return 'bg-yellow-600';
      case 'Published':
        return 'bg-green-600';
      case 'Archived':
        return 'bg-slate-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl mb-2">Contributions</h1>
          <p className="text-slate-400">Manage reports, research, and industry contributions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Contribution
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingContribution ? 'Edit Contribution' : 'Add New Contribution'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Title</Label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter contribution title..."
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Type</Label>
                  <Select
                    value={formData.type || 'Research Report'}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as Contribution['type'] }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Research Report">Research Report</SelectItem>
                      <SelectItem value="Industry Analysis">Industry Analysis</SelectItem>
                      <SelectItem value="Skills Assessment">Skills Assessment</SelectItem>
                      <SelectItem value="Market Study">Market Study</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Status</Label>
                  <Select
                    value={formData.status || 'Draft'}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Contribution['status'] }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Author</Label>
                <Input
                  value={formData.author || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Enter author name..."
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300">Description</Label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the contribution..."
                  className="bg-slate-700 border-slate-600 text-white mt-1 min-h-32"
                />
              </div>

              <div>
                <Label className="text-slate-300">File URL (Optional)</Label>
                <Input
                  value={formData.fileUrl || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, fileUrl: e.target.value }))}
                  placeholder="https://example.com/document.pdf"
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>

              <div>
                <Label className="text-slate-300">Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {formData.tags?.map((tag, index) => (
                    <Badge key={index} className="bg-blue-600 text-white pr-1">
                      {tag}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTag(index)}
                        className="ml-1 h-auto p-0 hover:bg-blue-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={closeDialog} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Cancel
                </Button>
                <Button onClick={saveContribution} className="bg-blue-600 hover:bg-blue-700">
                  {editingContribution ? 'Update Contribution' : 'Add Contribution'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {contributions.map((contribution) => (
          <Card key={contribution.id} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white text-lg">{contribution.title}</h3>
                    <Badge className={`${getStatusColor(contribution.status)} text-white`}>
                      {contribution.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-purple-600 flex items-center gap-1">
                      {getTypeIcon(contribution.type)}
                      {contribution.type}
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-300 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {contribution.author}
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(contribution.dateCreated).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  {contribution.fileUrl && (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(contribution.fileUrl, '_blank')}
                        className="text-green-400 hover:text-green-300 hover:bg-green-400/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(contribution.fileUrl, '_blank')}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openDialog(contribution)}
                    className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteContribution(contribution.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-slate-400 leading-relaxed">{contribution.description}</p>
              </div>

              {contribution.tags.length > 0 && (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {contribution.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {contributions.length === 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-slate-400 text-lg mb-2">No contributions yet</h3>
            <p className="text-slate-500 mb-4">Start adding reports, research papers, and other valuable contributions.</p>
            <Button onClick={() => openDialog()} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add First Contribution
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}